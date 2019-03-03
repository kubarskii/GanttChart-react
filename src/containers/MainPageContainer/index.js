import React, {Component} from 'react';
import {withRouter} from "react-router-dom";

import MainPageComponent from '../../components/MainPageComponent/index';

class MainPageContainer extends Component {
    //Contains projects
    render() {
        return (
            <div>
                <MainPageComponent/>
            </div>
        );
    }
}


export default withRouter(MainPageComponent);