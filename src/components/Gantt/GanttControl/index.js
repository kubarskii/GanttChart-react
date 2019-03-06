import React, {Component} from 'react';
import GanttControlHead from './GanttControlHead/index'
import GanttControlTasks from './GanttControlTasks/index'
import Modal from './GanttTaskModal'

import './GanttControl.scss';
import '../GanttStyles.scss';

class GanttControl extends Component {


    render() {

        const {tasks, addTask, divider, getTaskData, handleOpenModal, handleClose, modalOpened, modalData} = this.props;
        return (
            <div className='gantt gantt-control__wrapper' style={{width: `${divider - 12}px`, order: 1}}>
                <div style={{width: '1000px', overflowX: 'auto'}}>
                    <GanttControlHead
                        addTask={addTask}
                        openModal={handleOpenModal}
                        getTaskData={getTaskData}
                    />
                    <GanttControlTasks
                        tasks={tasks}
                        addTask={addTask}
                        openModal={handleOpenModal}
                        getTaskData={getTaskData}
                    />
                </div>
                <Modal
                    modalData={modalData}
                    open={modalOpened}
                    handleClose={handleClose}
                    title='Edit task'
                    data={getTaskData}
                />
            </div>
        );
    }

}

export default GanttControl;