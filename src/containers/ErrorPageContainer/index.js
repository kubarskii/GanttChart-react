import React, {Component} from 'react';
import {MDBCol, MDBContainer, MDBRow} from "mdbreact";
import Gantt from '../../components/Gantt/index'
import Toolbar from '../../components/Gantt/Toolbar/index'
import TestComponent from '../../components/Test/index'

var data = {
    data: [
        {id: 1, text: 'Task #1', start_date: '15-04-2017', duration: 3, progress: 0.6},
        {id: 2, text: 'Task #2', start_date: '18-04-2017', duration: 3, progress: 0.4}
    ],
    links: [
        {id: 1, source: 1, target: 2, type: '0'}
    ]
};

export default class MainPageContainer extends Component {

    state = {
        currentZoom: '',
    };

    handleZoomChange = (zoom) => {
        this.setState({
            currentZoom: zoom
        });
    }

    render() {
        return (
            <MDBContainer className='container-100vh' fluid>
                <MDBRow>
                    <MDBCol>
                        <div>
                            {/*<Toolbar
                                zoom={this.state.currentZoom}
                                onZoomChange={this.handleZoomChange}
                            />*/}
                            <div className="gantt-container" style={{height:'350px'}}>
                               {/* <Gantt tasks={data}
                                       zoom={this.state.currentZoom}
                                />*/}
                                <TestComponent/>
                            </div>
                        </div>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
        );
    }

}