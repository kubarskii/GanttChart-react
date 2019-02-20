import React, {Component} from 'react';
import {MDBCol, MDBContainer, MDBRow} from "mdbreact";
import TestComponent from '../../components/Test/index'

export default class MainPageContainer extends Component {

    render() {
        return (
            <MDBContainer className='container-100vh' fluid>
                <MDBRow>
                    <MDBCol>
                        <div>

                            <div className="gantt-container" style={{height: '350px'}}>
                                <TestComponent/>
                            </div>
                        </div>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
        );
    }

}