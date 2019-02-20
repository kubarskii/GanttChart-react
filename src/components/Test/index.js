import React, {Component} from 'react';
import GanttControl from './GanttControl/index'
import GanttArea from './GanttArea/index'
import GanttTools from './GanttTools/index'

class Gantt extends Component {

    constructor({data, options}) {
        super();

    }


    //TODO get tasks from Redux store
    state = {
        zoom: 'day',
        tasks: [
            {
                id: '123',
                name: 'Планирование',
                begin: new Date(2019, 5, 20),
                end: new Date(2019, 6, 1),
                progress: 10,
                links: [],
                level: 1,
            },
            {
                id: '1211',
                name: 'Планирование',
                begin: new Date(2019, 6, 4),
                end: new Date(2019, 6, 12),
                progress: 10,
                links: [],
                level: 1,
            },
        ],
        scale: 1,
    };

    addTask = (e) => {
        const level = Number(e.target.getAttribute('data-level'));
        const newTask = {
            id: '123',
            name: 'Спринт 2',
            begin: new Date(2019, 6, 11),
            end: new Date(2019, 6, 20),
            progress: 10,
            links: [],
            level: level,
        };
        const tasks = this.state.tasks;
        tasks.push(newTask);
        this.setState({tasks: tasks});
    };

    zoomIn = () => {
        this.setState({scale: this.state.scale + 0.05})
    };

    zoomOut = () => {
        this.setState({scale: this.state.scale - 0.05})
    };

    render() {
        return (
            <div>
                <div>
                    <GanttTools
                        zoomIn={this.zoomIn}
                        zoomOut={this.zoomOut}
                    />
                </div>
                <div style={{display: 'flex'}}>
                    <GanttControl
                        tasks={this.state.tasks}
                        addTask={this.addTask}
                    />
                    <GanttArea
                        zoom={this.state.zoom}
                        scale={this.state.scale}
                        tasks={this.state.tasks}
                    />
                </div>
            </div>
        );
    }


}

export default Gantt;