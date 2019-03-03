import React, {Component} from 'react';
import {MDBCol, MDBContainer, MDBRow} from "mdbreact";
import {connect} from "react-redux";
import Gantt from '../../components/Gantt/index'
import {fetchGanttTasks} from "../../actions/ganttTasks/ganttTasksAC";

class MainPageContainer extends Component {

    componentWillMount() {
        //TODO fetchApplication
        this.props.fetchGanttTasks();
    }

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
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(MainPageContainer);