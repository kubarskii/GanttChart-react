import React, {Component} from 'react';
import moment from 'moment';
import './GanttControlTasks.scss';

export default class GanttControlTasks extends Component {

    toDate = (timestamp)=>{
        const time = moment(timestamp).format("DD.MM.YYYY");
        return time;
    };

    render() {
        const {tasks,addTask} = this.props;
        return (
            <div className='gantt-control-task__wrapper'>
                {tasks.map((task,i)=>(
                    <div className='gantt-control-task__row' data-task-level={`${task.level}`} key={i}>
                        <div>{task.name}</div>
                        <div>{this.toDate(Date.parse(task.begin))}</div>
                        <div>{this.toDate(Date.parse(task.end))} </div>
                        <div>1</div>
                        <div>1</div>
                        <div className='gantt-control-head button-add-task' onClick={addTask} data-level={`${task.level+1}`}>+</div>
                    </div>
                ))}

            </div>
        );
    };
}