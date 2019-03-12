import React, {Component} from 'react';
import './GanttControlHead.scss';

export default class GanttControlHead extends Component {
    render() {
        const {getTaskData} = this.props;
        return (
            <div className='gantt-control-head__wrapper'>
                <div>Name</div>
                <div>Beginning</div>
                <div>End</div>
                <div>Duration</div>
                <div>Responsible</div>
                <div className='gantt-control-task button-add-task' onClick={this.props.openModal} data-level="1">+</div>
            </div>
        );
    };
}