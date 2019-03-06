import React,{Component} from 'react';
import {MDBFooter, MDBContainer} from "mdbreact";

export default class Footer extends Component{

    render(){
        return(
            <MDBFooter color="grey" className="font-small">
                <div className="footer-copyright text-center py-3">
                    <MDBContainer fluid>
                        &copy; {new Date().getFullYear()} Copyright: <a href="https://vk.com">{'<TiSCo>'}</a>
                    </MDBContainer>
                </div>
            </MDBFooter>
        );
    }

}