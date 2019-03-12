import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import GanttControl from './GanttControl/index';
import GanttArea from './GanttArea/index';
import GanttTools from './GanttTools/index';
import GanttDivider from './GanttDivider/index';
import {CELL_MONTH_WIDTH} from '../../constants/gantt'


/*const zoomTypes = ['hour', 'day', 'week', 'month', 'quarter', 'semester', 'year'];*/

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
        needUpdate: false,
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
    getGanttControlRef = (node) => {
        return this._GanttControl = node
    };

    moveTo = (e, devider) => {
        const ganttControl = ReactDOM.findDOMNode(this._GanttControl);
        devider.ondragstart = () => {
            return false;
        };
        devider.style.position = 'absolute';
        if ((e.pageX - devider.offsetWidth / 2 > 13) && (e.pageX - devider.offsetWidth / 2 < document.body.clientWidth - 13)) {
            devider.style.left = e.pageX - devider.offsetWidth / 2 + 'px';
            ganttControl.style.width = `${parseInt(devider.style.left) - 12}px`;

        }

    };


    onMouseDown = (e) => {
        const divider = ReactDOM.findDOMNode(this._GanttDivider);
        this.moveTo(e, divider);
        document.onmousemove = (e) => {
            this.moveTo(e, divider);
        };
    };

    onMouseUp = (e) => {
        const divider = ReactDOM.findDOMNode(this._GanttDivider);
        this.setState({divider: parseInt(divider.style.left)});
        /*
                console.log('divider updated');
        */

        document.onmousemove = null;
        document.onmouseup = () => {
            this.setState({divider: parseInt(divider.style.left)});
            /*
                        console.log('divider updated');
            */
        };
        divider.onmouseup = () => {
            /* this.setState({divider: parseInt(divider.style.left)});
             console.log('divider updated');*/
        };
    };

    onMouseLeave = (e) => {
        const divider = ReactDOM.findDOMNode(this._GanttDivider);
        const wrapper = ReactDOM.findDOMNode(this._GanttWrapper);
        wrapper.onmouseleave = () => {
            document.onmouseup = () => {
                this.setState({divider: parseInt(divider.style.left)});
                document.onmousemove = null;
                divider.onmousemove = null;
                /*
                                console.log('asdad');
                */
            };
        }
    };

    createInterval = (tasks = this.props.tasks) => {
        let first, last;
        tasks.map((task, i) => {
            first = ((first > task.begin.valueOf()) || (first === undefined)) ? task.begin : first;
            last = ((last < task.end.valueOf()) || (last === undefined)) ? task.end : last;
        });
        return ({first: first, last: last})
    };

    taskMouseDown = (e) => {

        const task = e.target;
        const ganttArea = ReactDOM.findDOMNode(this._GanttArea);

        if (e.button === 0 && (task.classList[0] !== 'dot' && task.classList[0] !== 'text')) {
            ganttArea.ondragstart = () => {
                return false;
            };
            task.ondragstart = () => {
                return false;
            };

            const getCoords = this.getCoords;
            task.ondragstart = () => {
                return false;
            };

            const shiftX = e.pageX - getCoords(task).left + 7; //margin 4 + borders 3

            const dividerWidth = this.state.divider;
            document.onmousemove = (e) => {
                task.parentNode.style.left = e.pageX - (dividerWidth + shiftX - ganttArea.scrollLeft) + 'px';
                this.left = task.parentNode.style.left;
                document.onmouseup = (e) => {
                    this.calcNewStart(e.pageX - (dividerWidth + shiftX - ganttArea.scrollLeft), task.parentNode);
                    document.onmousemove = null;
                }
            };
            //task.parentNode.style.left = e.pageX - (dividerWidth + shiftX - ganttArea.scrollLeft) + 'px';

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

    ganttOnScroll = () => { //Fix scrollable gantt Area with trackPad
        const ganttArea = ReactDOM.findDOMNode(this._GanttArea);
        ganttArea.onscroll = () => {
            ganttArea.scrollTop = 0;
        }
    };

    calcNewStart = (left, task) => {
        const taskId = task.getAttribute('data-task-id');
        const tasks = this.props.tasks;
        const taskDetails = tasks.find(obj => obj.id === taskId);
        const index = tasks.findIndex(obj => obj.id === taskId);


        const calcForMonth = () => {

            const difference = Date.parse(taskDetails.end) - Date.parse(taskDetails.begin);

            const firstMonth = () => this.createInterval().first.getMonth();

            const month = Math.floor(left / (this.state.scale * CELL_MONTH_WIDTH)) + firstMonth() - 1;
            const oneYear = CELL_MONTH_WIDTH * this.state.scale * (12 - firstMonth() + 1);

            const year = (left > oneYear) ? this.createInterval().first.getFullYear() + Math.ceil(left / (this.state.scale * CELL_MONTH_WIDTH * 12) - oneYear / (CELL_MONTH_WIDTH * this.state.scale * 12)) : this.createInterval().first.getFullYear();
            taskDetails.begin = new Date(year, (month >= 12) ? (month - (12 * Math.floor(month / 12))) : month, 1);
            taskDetails.end = new Date(Date.parse(taskDetails.begin) + difference);

            tasks[index] = taskDetails;

            this.props.updateTask(tasks);

        };

        switch (this.state.zoom) {
            case 'month':
                calcForMonth();
                break;
            default:
                break;
        }

        //TODO Rewrite bad code -- really really bad
        this.setState({needUpdate: !this.state.needUpdate});
        this.setState({needUpdate: !this.state.needUpdate})


    };

    highlightRow = (e) => {
        //TODO if clicked on task highlight all the row
    };

    getTaskData = (e) => {
        const task = e.target.parentNode;
        const taskId = task.getAttribute('data-task-id');
        const taskDetails = this.props.tasks.find(obj => obj.id === taskId);
        this.setState({taskData: taskDetails});
        this.handleOpenModal();
    };

    changeTaskData = (e) => {
        this.setState({taskData: e.target.valueOf})
    };

    rerender = () => {
        this.forceUpdate();

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
                            rerender={this.rerender}
                        />
                    </div>
                    <div
                        style={{display: 'flex'}}
                        ref={this.getRefWrapper}
                        onMouseLeave={this.onMouseLeave}>
                        <GanttControl
                            divider={this.state.divider}
                            ref={this.getGanttControlRef}
                            tasks={tasks}
                            addTask={this.props.addTask}
                            getTaskData={this.getTaskData}
                            handleClose={this.handleClose}
                            handleOpenModal={this.handleOpenModal}
                            modalOpened={this.state.open}
                            modalData={this.state.taskData}
                        />
                        <GanttDivider
                            ref={this.getRef}
                            onMouseDown={this.onMouseDown}
                            onMouseUp={this.onMouseUp}
                            onClick={this.dividerOnClick}
                        />
                        <GanttArea
                            needUpdate={this.state.needUpdate}
                            left={this.left}
                            ref={this.getGanttAreaRef}
                            onMouseDown={this.taskMouseDown}
                            onMouseUp={this.taskMouseUp}
                            onMouseLeave={this.taskMouseLeave}
                            onScroll={this.ganttOnScroll}
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