import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import GanttControl from './GanttControl/index';
import GanttArea from './GanttArea/index';
import GanttTools from './GanttTools/index';
import GanttDivider from './GanttDivider/index';

class Gantt extends Component {

    constructor({data, options}) {
        super();

    }

    //TODO CRUD CREATE_TASK, UPDATE_TASK, DELETE_TASK, UPDATE_SORT_TASKS
    state = {
        divider: 464,
        zoom: 'month',
        scale: 1,
    };

    //addTask - Mock function

    /*    addTask = (e) => {
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
        };*/

    zoomIn = () => {
        this.setState({scale: this.state.scale * 1.5});
    };

    zoomOut = () => {
        if (this.state.scale > 0.5) {
            this.setState({scale: this.state.scale / 1.5});
        }
    };

    toMonth = () => {
        this.setState({zoom: 'month'});

    };

    toDay = () => {
        this.setState({zoom: 'day'});
    };

    getRef = (node) => {
        return this._GanttDivider = node
    };
    getRefWrapper = (node) => {
        return this._GanttWrapper = node
    };
    getGanttAreaRef = (node) => {
        return this._GanttArea = node
    };

    moveTo = (e, devider) => {
        devider.ondragstart = () => {
            return false;
        };
        devider.style.position = 'absolute';
        if ((e.pageX - devider.offsetWidth / 2 > 13) && (e.pageX - devider.offsetWidth / 2 < document.body.clientWidth - 15)) {
            devider.style.left = e.pageX - devider.offsetWidth / 2 + 'px';
            this.setState({divider: parseInt(devider.style.left)})
        }

    };

    onMouseDown = (e) => {
        const divider = ReactDOM.findDOMNode(this._GanttDivider);
        const moveTo = this.moveTo;
        moveTo(e, divider);
        document.onmousemove = function (e) {
            moveTo(e, divider);
        };
    };

    onMouseUp = (e) => {
        const divider = ReactDOM.findDOMNode(this._GanttDivider);
        document.onmousemove = null;
        document.onmouseup = null;
        divider.onmouseup = null;
    };

    onMouseLeave = (e) => {
        const divider = ReactDOM.findDOMNode(this._GanttDivider);
        const wrapper = ReactDOM.findDOMNode(this._GanttWrapper);
        wrapper.onmouseleave = () =>
            document.onmousemove = null;
        document.onmouseup = null;
        divider.onmousemove = null;
    };


    //TODO Stick mouse drag to dates
    //TODO Update state (tasks)
    //TODO small fixes for dnd

    taskMouseDown = (e) => {
        const task = e.target;
        const ganttArea = ReactDOM.findDOMNode(this._GanttArea);

        task.ondragstart = () => {
            return false;
        };

        const dividerWidth = this.state.divider;
        document.onmousemove = function (e) {
            task.parentNode.style.left = (e.pageX - (dividerWidth + task.offsetWidth / 2 - ganttArea.scrollLeft)) + 'px';
        };
        task.parentNode.style.left = e.pageX - (dividerWidth + task.offsetWidth / 2 - ganttArea.scrollLeft) + 'px';
        /*this.setState({divider: parseInt(task.style.left)})*/
    };
    taskMouseUp = (e) => {
        document.onmousemove = null;
    };

    taskMouseLeave = (e) => {
        document.onmousemove = null;
    };

    render() {
        const {tasks, isLoading} = this.props;

        if (isLoading) {
            console.log('isLoading true', tasks);
        } else {
            console.log('isLoading false', tasks);
        }

        return (
            !isLoading ?
                <div>
                    <div style={{height: '30px'}}>
                        <GanttTools
                            toDay={this.toDay}
                            toMonth={this.toMonth}
                            zoomIn={this.zoomIn}
                            zoomOut={this.zoomOut}
                        />
                    </div>
                    <div style={{display: 'flex'}} ref={this.getRefWrapper} onMouseLeave={this.onMouseLeave}>
                        <GanttControl
                            divider={this.state.divider}
                            tasks={tasks}
                            addTask={this.addTask}
                        />
                        <GanttDivider ref={this.getRef} onMouseDown={this.onMouseDown} onMouseUp={this.onMouseUp}
                                      divider={this.state.divider}/>
                        <GanttArea
                            ref={this.getGanttAreaRef}
                            onMouseDown={this.taskMouseDown}
                            onMouseUp={this.taskMouseUp}
                            onMouseLeave={this.taskMouseLeave}
                            divider={this.state.divider}
                            zoom={this.state.zoom}
                            scale={this.state.scale}
                            tasks={tasks}
                        />
                    </div>
                </div>
                : <div>Loading...</div>
        );
    }


}

export default Gantt;