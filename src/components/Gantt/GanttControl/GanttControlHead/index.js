import React, {Component} from 'react';
import './GanttControlHead.scss';

export default class GanttControlHead extends Component {
    render() {
        const {addTask} = this.props;
        return (
            <div className='gantt-control-head__wrapper'>
                <div>Название</div>
                <div>Начало</div>
                <div>Конец</div>
                <div>Длительнотсь</div>
                <div>Ответственный</div>
                <div className='gantt-control-task button-add-task' onClick={addTask} data-level="1">+</div>
            </div>
        );
    };
}