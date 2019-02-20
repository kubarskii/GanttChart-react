import React, {Component} from 'react';
import './GanttTasks.scss'


export default class GanttTasksLayer extends Component {

    calcBegin = () => {
        const {first} = this.props.interval;
        const begin = Date.parse(new Date(first.getFullYear(),first.getMonth(),1));
        return begin;
    };

    calcMargin = (timestamp) =>{
        const begin = this.calcBegin();
        return Math.floor(((timestamp-begin)/1000/60/60/24));
};
    calcWidth=(begin,end)=>{
        return Math.floor(((end-begin)/1000/60/60/24))+1;
    };

    render() {
        const {tasks, interval, width} = this.props;

        return (
            <div className='gantt-tasks__wrapper'>
                {tasks.map((task, i) => (
                    <div className='gantt-one-task__wrapper' key={i} style={{top: '0'}}>
                        <div className='gantt-one-task__task' data-task-id={task.id}
                             style={{
                                 width: `${width * this.calcWidth(Date.parse(task.begin),Date.parse(task.end))}px`,
                                 position: 'absolute',
                                 height: '32px',
                                 marginTop: '3px',
                                 left: `${width * this.calcMargin(Date.parse(task.begin))}px`
                             }}>
                            <div style={{marginTop: '-3px', textAlign: 'center', maxWidth:'100%', overflow:'hidden', textOverflow:'ellipsis'}}>{`${task.name}`}</div>
                        </div>
                    </div>
                ))}
            </div>
        );
    }

}