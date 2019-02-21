import React, {Component} from 'react';
import {CELL_DAY_WIDTH, CELL_MONTH_WIDTH} from '../../../../constants/gantt'
import './GanttTasks.scss'


export default class GanttTasksLayer extends Component {

    state = {
        clicked: false,
    };

    calcBegin = () => {
        const {first} = this.props.interval;
        const begin = Date.parse(new Date(first.getFullYear(), first.getMonth(), 1));
        return begin;
    };

    calcMargin = (timestamp) => {
        const begin = this.calcBegin();
        switch (this.props.zoom) {
            case 'day':
                return Math.floor(((timestamp - begin) / 1000 / 60 / 60 / 24));
            case 'month':
                //Month quantity before
                return ((timestamp - begin) / 1000 / 60 / 60 / 24 / 31);
            default: return 1;
        }

    };
    calcWidth = (begin, end) => {
        const length = (end - this.calcBegin()) - (begin - this.calcBegin());
/*
        console.log(length / 1000 / 60 / 60 / 24);
*/
        switch (this.props.zoom) {
            case 'day':
                return length / 1000 / 60 / 60 / 24 + 1;
            case 'month':
                console.log(length / 1000 / 60 / 60 / 24 / 30.5);
                return (length / 1000 / 60 / 60 / 24 / 30.5);
            default: return 1;
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
            default: width = 1;
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