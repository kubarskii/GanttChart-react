import React, {Component} from 'react';
import GanttControl from './GanttControl/index'
import GanttArea from './GanttArea/index'
import GanttTools from './GanttTools/index'

class Gantt extends Component {

    constructor({data, options}) {
        super();

    }

    //TODO get tasks from Redux store
    //TODO CRUD CREATE_TASK, UPDATE_TASK, DELETE_TASK, UPDATE_SORT_TASKS
    state = {
        zoom: 'month',
        tasks: [
            {
                id: '1',
                type: 'task',
                name: 'Планирование',
                begin: new Date(2020, 2, 1),
                end: new Date(2020, 2, 16),
                progress: 10,
                links: [],
                level: 1,
            },
            {
                id: '2',
                type: 'task',
                name: 'Что-то',
                begin: new Date(2020, 1, 1),
                end: new Date(2020, 2, 16),
                progress: 10,
                links: [],
                level: 1,
            },
            {
                id: '3',
                type: 'task',
                name: 'Планирование',
                begin: new Date(2020, 0, 1),
                end: new Date(2020, 1, 29),
                progress: 10,
                links: [],
                level: 1,
            },
            {
                id: '4',
                type: 'task',
                name: 'Еще что-то',
                begin: new Date(2020, 1, 1),
                end: new Date(2020, 2, 31),
                progress: 10,
                links: [],
                level: 1,
            },
            {
                id: '5',
                type: 'task',
                name: 'Еще что-то',
                begin: new Date(2020, 0, 1),
                end: new Date(2020, 1, 15),
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
        this.setState({scale: this.state.scale * 1.5})
    };

    zoomOut = () => {
        this.setState({scale: this.state.scale / 1.5})
    };

    toMonth = () => {
        this.setState({zoom: 'month'});

    };

    toDay = () => {
        this.setState({zoom: 'day'});
    };

    render() {
        return (
            <div>
                <div>
                    <GanttTools
                        toDay={this.toDay}
                        toMonth={this.toMonth}
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