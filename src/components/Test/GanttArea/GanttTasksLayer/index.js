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
        /*return begin;*/
    };

    calcMonthBegin = (timestamp) => {
        const date = new Date(timestamp);
        return Date.parse(new Date(date.getFullYear(), date.getMonth(), 1));
    };

    calcMargin = (timestamp) => {
        const begin = this.calcBegin();
        switch (this.props.zoom) {
            case 'day':
                return Math.floor(((timestamp - begin) / 1000 / 60 / 60 / 24));
            case 'month':
                //Month quantity before
                const monthBefore = this.props.calcMonthsNumber(new Date(begin), new Date(timestamp)).length - 1;
                const monthsQ = this.props.daysInMonth(2019, new Date(timestamp).getMonth());
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
                return (length / 1000 / 60 / 60 / 24 / 30.5);
            default:
                return 1;
        }

    };


    render() {
        const {tasks, zoom, scale} = this.props;
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
                             data-task-id={task.id}
                             style={{
                                 width: `${width * scale * this.calcWidth(Date.parse(task.begin), Date.parse(task.end))}px`,
                                 left: `${width * scale * this.calcMargin(Date.parse(task.begin))}px`
                             }}>
                            <div className='gantt-one-task__task-text'>{`${task.name}`}</div>
                        </div>
                    </div>
                ))}
            </div>
        );
    }

}