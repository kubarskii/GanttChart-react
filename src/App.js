import React, {Component} from 'react';
import {Route, Switch} from 'react-router-dom'
import MainPageContainer from './containers/MainPageContainer/index'
import ErrorPageContainer from './containers/ErrorPageContainer/index'
import Footer from './containers/Footer/index'
import HeaderContainer from './containers/HeaderContainer/index'

class App extends Component {
    render() {
        return (
            <div className='app'>
                <HeaderContainer/>
                <Switch>
                    <Route exact path='/' component={MainPageContainer}/>
                    <Route path='*' component={ErrorPageContainer}/>
                </Switch>
                <Footer/>
            </div>
        );
    }
}

export default App;
