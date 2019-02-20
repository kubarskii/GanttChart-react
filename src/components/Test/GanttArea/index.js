import React, {Component} from 'react';
import GanttScaleLine from './GanttScaleLine/index';
import GanttGrid from './GanttGrid/index';
import GanttTasksLayer from './GanttTasksLayer/index';
import GanttLinksLayer from './GanttLinksLayer/index';
import {cellWidth} from '../../../constants/gantt'

import './GanttArea.scss';
import '../GanttStyles.scss';

class GanttArea extends Component {

    daysInMonth = (year, month) => {
        const arr = [];
        for (let i = 1; i <= (33 - new Date(year, month, 33).getDate()); i++) {
            arr.push(i);
        }
        return arr;
    };

    createInterval = () => {
        const {tasks} = this.props;
        let first, last;
        tasks.map((task, i) => {
            first = ((first > task.begin.valueOf()) || (first === undefined)) ? task.begin : first;
            last = ((last < task.end.valueOf()) || (last === undefined)) ? task.end : last;
        });
        return ({first: first, last: last})
    };


    calcMonthsNumber = (first, last) => {
        const firstDate = first;
        const lastDate = last;

        let monthBetween = (lastDate.getFullYear() - firstDate.getFullYear()) * 12;
        monthBetween -= firstDate.getMonth();
        monthBetween += lastDate.getMonth();
        //TODO implement leap year
        const arr = [];

        let month = firstDate.getMonth();
        let year = firstDate.getFullYear();
        for (let i = 0; i <= monthBetween; i++) {
            if (month > 11) {
                month = 0;
                year++;
            }
            arr.push({month: month, year: year});
            month++;
        }
        return arr;
    };

    render() {
        const {tasks, scale} = this.props;
        const interval = this.createInterval();
        return (
            <div className='gantt gantt-area__wrapper' style={{flex: '70%', overflowY: 'hidden', position: 'relative'}}>
                <GanttScaleLine
                    width={cellWidth*scale}
                    daysInMonth={this.daysInMonth}
                    calcMonthsNumber={this.calcMonthsNumber}
                    interval={interval}
                />
                <GanttGrid
                    width={cellWidth*scale}
                    tasks={tasks}
                    daysInMonth={this.daysInMonth}
                    calcMonthsNumber={this.calcMonthsNumber}
                    interval={interval}
                />
                <GanttTasksLayer
                    width={cellWidth*scale}
                    tasks={tasks}
                    interval={interval}
                />
                <GanttLinksLayer/>

            </div>
        );
    }

}

export default GanttArea;