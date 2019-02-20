import React, {Component} from 'react';
import GanttControlHead from './GanttControlHead/index'
import GanttControlTasks from './GanttControlTasks/index'

import './GanttControl.scss';
import '../GanttStyles.scss';

class GanttControl extends Component {

    render() {

        const {tasks, addTask} = this.props;

        return (
            <div className='gantt gantt-control__wrapper' style={{flex: '30%', maxWidth: '536px'}}>
                <GanttControlHead
                    addTask={addTask}
                />
                <GanttControlTasks
                    tasks={tasks}
                    addTask={addTask}
                />
            </div>
        );
    }

}

export default GanttControl;