import React, {Component} from 'react';
import {MDBCol, MDBContainer, MDBRow} from "mdbreact";
import {connect} from "react-redux";
import Gantt from '../../components/Gantt/index'
import {fetchGanttTasks, ganttTasksChange} from "../../actions/ganttTasks/ganttTasksAC";

class MainPageContainer extends Component {

    componentWillMount() {
        //TODO fetchApplication
        this.props.fetchGanttTasks();
    }

    addTask = (task) => {
        const newTask = {
            id: '5',
            type: 'task',
            name: 'Создание связей',
            begin: new Date(2019, 4, 1),
            end: new Date(2019, 5, 1),
            progress: 10,
            links: [],
            level: 1
        };

        const tasks = this.props.ganttTasks.ganttTasks;
        tasks.push(newTask);
        this.props.ganttTasksChange(tasks);

    };

    render() {
        console.log(this.props);
        return (
            <MDBContainer className='container-100vh' fluid>
                <MDBRow>
                    <MDBCol>
                        <div>

                            <div className="gantt-container" style={{height: 'auto'}}>
                                <Gantt tasks={this.props.ganttTasks.ganttTasks}
                                       isLoading={this.props.ganttTasks.isLoading}
                                       addTask={this.addTask}
                                />
                            </div>
                        </div>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
        );
    }
}

function mapStateToProps(state) {
    return {
        ganttTasks: state.ganttTasks,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        fetchGanttTasks: () => dispatch(fetchGanttTasks(1)),
        ganttTasksChange: (ganttTasks) => dispatch(ganttTasksChange(ganttTasks))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(MainPageContainer);