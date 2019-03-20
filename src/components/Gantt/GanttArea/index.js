import React, {Component} from 'react';
import GanttScaleLine from './GanttScaleLine/index';
import GanttGrid from './GanttGrid/index';
import GanttTasksLayer from './GanttTasksLayer/index';
import GanttLinksLayer from './GanttLinksLayer/index';
import GanttVerticalLine from './GanttVerticalLine/index';
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
        console.log(first, last);
        const firstDate = new Date(first.getFullYear(), (first.getMonth() > -1) ? first.getMonth() - 1 : first.getMonth(), first.getDate());
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


    calcBegin = () => {
        const interval = this.createInterval();
        const first = interval.first;
        return Date.parse(new Date(first.getFullYear(), first.getMonth(), 1));
    };

    calcMonthBegin = (timestamp) => {
        const date = new Date(timestamp);
        return Date.parse(new Date(date.getFullYear(), date.getMonth(), 1));
    };
    calcMonthEnd = (timestamp) => {
        const date = new Date(timestamp);
        return Date.parse(new Date(date.getFullYear(), date.getMonth() + 1, 1)) - 1;
    };


    calcWidth = (begin, end) => {
        const length = (end - this.calcBegin()) - (begin - this.calcBegin());
        switch (this.props.zoom) {
            case 'day':
                return length / 1000 / 60 / 60 / 24 + 1;
            case 'month':
                const convert = 1000 * 60 * 60 * 24;
                const monthLengthB = this.daysInMonth(new Date(begin).getFullYear(), new Date(begin).getMonth())[0];
                const daysBeginning = Math.ceil((begin - this.calcMonthBegin(begin)) / convert);
                const daysEnding = Math.floor((this.calcMonthEnd(end) - end - 1) / convert);

                const interval = this.createInterval(
                    [{
                        begin: new Date(begin),
                        end: new Date(end)
                    }]);
                interval.firstMonth = interval.first.getMonth();
                interval.lastMonth = interval.last.getMonth();
                interval.firstYear = interval.first.getFullYear();
                interval.lastYear = interval.last.getFullYear();
                interval.yearDifference = interval.lastYear - interval.firstYear;
                interval.difference = interval.lastMonth - interval.firstMonth + (interval.yearDifference * 12);

                return (interval.difference + (monthLengthB - daysEnding) / monthLengthB - daysBeginning / monthLengthB);
            default:
                return 1;
        }

    };


    calcMargin = (timestamp) => {
        const begin = this.calcBegin();
        switch (this.props.zoom) {
            case 'day':
                const beginDate = new Date(begin);
                const start = Date.parse(new Date(beginDate.getFullYear(), beginDate.getMonth()-1, beginDate.getDate()));
                return Math.floor(((timestamp - start) / 1000 / 60 / 60 / 24));
            case 'month':
                const monthBefore = this.calcMonthsNumber(new Date(begin), new Date(timestamp)).length - 1;
                const monthsQ = this.daysInMonth(new Date(timestamp).getFullYear(), new Date(timestamp).getMonth())[0];
                return monthBefore + ((timestamp - this.calcMonthBegin(timestamp)) / 1000 / 60 / 60 / 24 / monthsQ);
            default:
                return 1;
        }

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
                        calcMargin={this.calcMargin}
                        calcWidth={this.calcWidth}
                    />}
                <GanttLinksLayer/>
                <GanttVerticalLine
                    title='Today'
                    date={new Date()}
                    createInterval={this.createInterval}
                    calcMargin={this.calcMargin}
                    calcWidth={this.calcWidth}
                    width={width * scale}
                />

            </div>
        );
    }

}

export default GanttArea;