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
                break;
            case 'month':
                //Calculate number of month
                return ((timestamp - begin) / 1000 / 60 / 60 / 24 / 30).toFixed(2);
                break;
        }

    };
    calcWidth = (begin, end) => {
        switch (this.props.zoom) {
            case 'day':
                return Math.floor(((end - begin) / 1000 / 60 / 60 / 24)) + 1;
            case 'month':
                return (((end - begin) / 1000 / 60 / 60 / 24 / 30.5));
                break;
        }

    };


    render() {
        const {tasks, interval, zoom, scale} = this.props;
        let width;
        switch (zoom) {
            case 'day':
                width = CELL_DAY_WIDTH;
                break;
            case 'month':
                width = CELL_MONTH_WIDTH;
                break;
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