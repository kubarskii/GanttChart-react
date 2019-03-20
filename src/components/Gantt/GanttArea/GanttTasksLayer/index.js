import React, {Component} from 'react';
import {CELL_DAY_WIDTH, CELL_MONTH_WIDTH} from '../../../../constants/gantt';
import './GanttTasks.scss'


export default class GanttTasksLayer extends Component {


    handleUpdate=()=>{
      this.forceUpdate();
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

                        <div>
                            <div className={'gantt-one-task__task task'}
                                 onMouseDown={this.props.onMouseDown}
                                 onMouseUp={this.props.onMouseUp}
                                 onDoubleClick={getTaskData}
                                 onMouseLeave={this.props.onMouseLeave}
                                 data-task-id={task.id}
                                 style={{
                                     width: `${width * scale * this.props.calcWidth(Date.parse(task.begin), Date.parse(task.end))}px`,
                                     left: `${width * scale * this.props.calcMargin(Date.parse(task.begin))}px`
                                 }}>


                                <div className='task__progress' style={{
                                    position: 'absolute',
                                    color: 'white',
                                    fontSize: '11px',
                                    lineHeight: '14px',
                                    background: '#4d1d016a',
                                    width: `${width * scale * this.props.calcWidth(Date.parse(task.begin), Date.parse(task.end)) * (task.progress / 100)}px`,
                                    height: '14px',
                                    top: 'calc(50% - 7px)',
                                    borderRadius:'4px',
                                    textAlign:'right',


                                }}>
                                    {(task.progress >0)?`${task.progress}%`:''}
                                </div>
                                <div className='gantt-one-task__task-text' style={{
                                    position: 'absolute',
                                    zIndex: 1,
                                    width: '100%',
                                    height: '100%'
                                }}>
                                </div>

                                <div className='text' style={{
                                    position: 'absolute',
                                    left: '100%',
                                    color: '#000',
                                    width: 'auto',
                                    whiteSpace: 'nowrap',
                                    marginTop: '-5px',
                                    marginLeft: '8px',
                                }}>{`${task.name}`}</div>
                                <div
                                    className='dot dot-after'
                                    style={{}}/>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        );
    }

}