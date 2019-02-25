import React, {Component} from 'react';
import {MDBCol, MDBContainer, MDBRow} from "mdbreact";
import Gantt from '../../components/Gantt/index'

export default class MainPageContainer extends Component {

    render() {
        return (
            <MDBContainer className='container-100vh' fluid>
                <MDBRow>
                    <MDBCol>
                        <div>

                            <div className="gantt-container" style={{height: 'auto'}}>
                                <Gantt/>
                            </div>
                        </div>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
        );
    }

}