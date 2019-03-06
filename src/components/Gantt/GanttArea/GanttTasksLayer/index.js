import React, {Component} from 'react';
import {CELL_DAY_WIDTH, CELL_MONTH_WIDTH} from '../../../../constants/gantt'
import './GanttTasks.scss'


export default class GanttTasksLayer extends Component {

    state = {
        clicked: false,
    };

    calcBegin = () => {
        const {first} = this.props.interval;
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

    calcMargin = (timestamp) => {
        const begin = this.calcBegin();
        switch (this.props.zoom) {
            case 'day':
                return Math.floor(((timestamp - begin) / 1000 / 60 / 60 / 24));
            case 'month':
                const monthBefore = this.props.calcMonthsNumber(new Date(begin), new Date(timestamp)).length - 1;
                const monthsQ = this.props.daysInMonth(new Date(timestamp).getFullYear(), new Date(timestamp).getMonth())[0];
                return monthBefore + ((timestamp - this.calcMonthBegin(timestamp)) / 1000 / 60 / 60 / 24 / monthsQ);
            default:
                return 1;
        }

    };

    calcWidth = (begin, end) => {
        const length = (end - this.calcBegin()) - (begin - this.calcBegin());
        switch (this.props.zoom) {
            case 'day':
                return length / 1000 / 60 / 60 / 24 + 1;
            case 'month':
                const convert = 1000 * 60 * 60 * 24;
                const monthLengthB = this.props.daysInMonth(new Date(begin).getFullYear(), new Date(begin).getMonth())[0];
                const daysBeginning = Math.ceil((begin - this.calcMonthBegin(begin)) / convert);
                const daysEnding = Math.floor((this.calcMonthEnd(end) - end - 1) / convert);

                const interval = this.props.createInterval(
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


    render() {
        const {tasks, zoom, scale, getTaskData} = this.props;
        let width;
        switch (zoom) {
            case 'day':
                width = CELL_DAY_WIDTH;
                break;
            case 'month':
                width = CELL_MONTH_WIDTH;
                break;
            default:
                width = 1;
        }
        return (
            <div className='gantt-tasks__wrapper'>
                {tasks.map((task, i) => (
                    <div className='gantt-one-task__wrapper' key={i} style={{top: '0'}}>
                        <div className={'gantt-one-task__task'}
                             onMouseDown={this.props.onMouseDown}
                             onMouseUp={this.props.onMouseUp}
                             onClick={this.props.highlightRow}
                             onDoubleClick={getTaskData}
                             onMouseLeave={this.props.onMouseLeave}
                             data-task-id={task.id}
                             style={{
                                 width: `${width * scale * this.calcWidth(Date.parse(task.begin), Date.parse(task.end))}px`,
                                 left: `${width * scale * this.calcMargin(Date.parse(task.begin))}px`
                             }}>
                            <div className='task__progress' style={{
                                position: 'absolute',
                                color: 'white',
                                fontSize: '11px',
                                lineHeight: '11px',
                                background: 'black',
                                width: `${width * scale * this.calcWidth(Date.parse(task.begin), Date.parse(task.end)) * (task.progress / 100)}px`,
                                height: '4px',
                                top: '0'
                            }}>
                                {/**/}
                            </div>
                            <div className='gantt-one-task__task-text' style={{
                                position: 'absolute',
                                zIndex: 10,
                                width: '100%',
                                height: '100%'
                            }}>{`${task.name} ${task.progress}%`}</div>
                        </div>
                    </div>
                ))}
            </div>
        );
    }

}