import React, {Component} from 'react';
import GanttControlHead from './GanttControlHead/index'
import GanttControlTasks from './GanttControlTasks/index'
import Modal from './GanttTaskModal'

import './GanttControl.scss';
import '../GanttStyles.scss';

class GanttControl extends Component {

    state = {
        open: false,
    };

    handleClose = () => {
        this.setState({open: false});
    };
    handleOpenModal = () => {
        this.setState({open: true});
    };

    render() {

        const {tasks, addTask, divider} = this.props;
        return (
            <div className='gantt gantt-control__wrapper' style={{width: `${divider - 12}px`, order: 1}}>
                <GanttControlHead
                    addTask={addTask}
                    openModal={this.handleOpenModal}
                />
                <GanttControlTasks
                    tasks={tasks}
                    addTask={addTask}
                    openModal = {this.handleOpenModal}
                />
                <Modal
                    open={this.state.open}
                    handleClose={this.handleClose}
                />
            </div>
        );
    }

}

export default GanttControl;