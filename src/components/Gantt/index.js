import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import GanttControl from './GanttControl/index';
import GanttArea from './GanttArea/index';
import GanttTools from './GanttTools/index';
import GanttDivider from './GanttDivider/index';

const zoomTypes = ['hour', 'day', 'week', 'month', 'quarter', 'semester', 'year'];

class Gantt extends Component {

    constructor({data, options}) {
        super();

    }

//TODO make resizing through refs, not to rerender components - force performance
    //TODO CRUD CREATE_TASK, UPDATE_TASK, DELETE_TASK, UPDATE_SORT_TASKS
    state = {
        divider: document.body.offsetWidth / 2,
        zoom: 'month',
        scale: 1,
        open: false,
        taskData: {},
    };

    handleClose = () => {
        this.setState({open: false});
        this.setState({taskData: {}});
    };
    handleOpenModal = () => {
        this.setState({open: true});
    };

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
        if ((e.pageX - devider.offsetWidth / 2 > 13) && (e.pageX - devider.offsetWidth / 2 < document.body.clientWidth - 13)) {
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
        wrapper.onmouseleave = () => {
            document.onmouseup = () => {
                document.onmousemove = null;
                divider.onmousemove = null;

            };
        }
    };


    //TODO Stick mouse drag to dates
    //TODO Update state (tasks)
    //TODO small fixes for dnd

    taskMouseDown = (e) => {
        const task = e.target;
        const ganttArea = ReactDOM.findDOMNode(this._GanttArea);

        if (e.button === 0) {
            ganttArea.ondragstart = () => {
                return false;
            };
            task.ondragstart = () => {
                return false;
            };

            console.log(this.getCoords(task), e.pageX, e.pageX - (this.getCoords(task).left), task.offsetWidth - (e.pageX - (this.getCoords(task).left)));
            const getCoords = this.getCoords;
            task.ondragstart = () => {
                return false;
            };
//TODO Why 3 px
            const shiftX = e.pageX - getCoords(task).left + 3;

            const dividerWidth = this.state.divider;
            document.onmousemove = function (e) {
                task.parentNode.style.left = e.pageX - (dividerWidth + shiftX - ganttArea.scrollLeft) + 'px';
            };
            task.parentNode.style.left = e.pageX - (dividerWidth + shiftX - ganttArea.scrollLeft) + 'px';

        }
    };
    taskMouseUp = (e) => {
        document.onmousemove = null;
    };

    taskMouseLeave = (e) => {
        document.onmouseup = () => {
            document.onmousemove = null;
        };
    };

    getCoords = (e) => {   // except IE8-
        const box = e.getBoundingClientRect();
        return {
            top: box.top,
            left: box.left
        };
    };


    highlightRow = (e) => {
        //TODO if clicked on task highlight all the row
    };

    getTaskData = (e) => {
        const task = e.target.parentNode;
        const taskId = task.getAttribute('data-task-id');
        const taskDetails = this.props.tasks.find(obj => obj.id == taskId);
        this.setState({taskData: taskDetails});
        this.handleOpenModal();
    };

    changeTaskData = (e) => {
        this.setState({taskData: e.target.valueOf})
    };

    render() {
        const {tasks, isLoading} = this.props;

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
                            addTask={this.props.addTask}
                            getTaskData={this.getTaskData}
                            handleClose={this.handleClose}
                            handleOpenModal={this.handleOpenModal}
                            modalOpened={this.state.open}
                            modalData={this.state.taskData}
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
                            getTaskData={this.getTaskData}
                        />
                    </div>
                </div>
                : <div>Loading...</div>
        );
    }


}

export default Gantt;