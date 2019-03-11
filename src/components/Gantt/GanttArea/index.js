import React, {Component} from 'react';
import GanttScaleLine from './GanttScaleLine/index';
import GanttGrid from './GanttGrid/index';
import GanttTasksLayer from './GanttTasksLayer/index';
import GanttLinksLayer from './GanttLinksLayer/index';
import {CELL_DAY_WIDTH, CELL_MONTH_WIDTH} from '../../../constants/gantt'

import './GanttArea.scss';
import '../GanttStyles.scss';

class GanttArea extends Component {

    daysInMonth = (year, month) => {
        switch (this.props.zoom) {
            case('day'):
                let arr = [];
                for (let i = 1; i <= (33 - new Date(year, month, 33).getDate()); i++) {
                    arr.push(i);
                }
                return arr;
            case('month'):
                let arr2 = [];
                for (let i = 1; i <= (33 - new Date(year, month, 33).getDate()); i++) {
                    arr2.push(i);
                }
                return arr = [arr2.length];
            case('quarter'):
                return arr = [];
            default:
                console.error('Zoom not found');
        }

    };

    createInterval = (tasks = this.props.tasks) => {
        let first, last;
        tasks.map((task, i) => {
            first = ((first > task.begin.valueOf()) || (first === undefined)) ? task.begin : first;
            last = ((last < task.end.valueOf()) || (last === undefined)) ? task.end : last;
        });
        return ({first: first, last: last})
    };

    //quantity if cells
    calcMonthsNumber = (first, last) => {
        const firstDate = new Date(first.getFullYear(), (first.getMonth() > 0) ? first.getMonth() - 1 : first.getMonth(), first.getDate());
        const lastDate = last;

        let monthBetween = (lastDate.getFullYear() - firstDate.getFullYear()) * 12;
        monthBetween -= firstDate.getMonth();
        monthBetween += lastDate.getMonth();
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
        const {tasks, scale, zoom, getTaskData} = this.props;
        const interval = this.createInterval();
        let width;
        switch (zoom) {
            case 'day':
                width = CELL_DAY_WIDTH;
                break;
            case 'month':
                width = CELL_MONTH_WIDTH;
                break;
            default:
                throw Error('Width doesn`t exist');
        }
        return (

            <div
                onScroll={this.props.onScroll}
                className='gantt gantt-area__wrapper' style={{width: 0, order: 2, margin: '0 0 0 4px'}}>
                <GanttScaleLine
                    zoom={zoom}
                    scale={scale}
                    width={width * scale}
                    daysInMonth={this.daysInMonth}
                    calcMonthsNumber={this.calcMonthsNumber}
                    interval={interval}
                />
                <GanttGrid
                    zoom={zoom}
                    scale={scale}
                    width={width * scale}
                    tasks={tasks}
                    daysInMonth={this.daysInMonth}
                    calcMonthsNumber={this.calcMonthsNumber}
                    interval={interval}
                />
                {this.props.needUpdate ? null :
                    <GanttTasksLayer
                        left={this.props.left}
                        onMouseDown={this.props.onMouseDown}
                        onMouseUp={this.props.onMouseUp}
                        onMouseLeave={this.props.onMouseLeave}
                        createInterval={this.createInterval}
                        calcMonthsNumber={this.calcMonthsNumber}
                        daysInMonth={this.daysInMonth}
                        scale={scale}
                        zoom={zoom}
                        width={width * scale}
                        tasks={tasks}
                        interval={interval}
                        getTaskData={getTaskData}
                    />}
                <GanttLinksLayer/>

            </div>
        );
    }

}

export default GanttArea;