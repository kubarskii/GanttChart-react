import React, {Component} from 'react';
import {
    MDBCollapse,
    MDBDropdown,
    MDBDropdownItem,
    MDBDropdownMenu,
    MDBDropdownToggle,
    MDBNavbar,
    MDBNavbarBrand,
    MDBNavbarNav,
    MDBNavbarToggler,
    MDBNavItem,
    MDBNavLink,
} from "mdbreact";
import Modal from '../../components/Modal/index'
import {Button, ButtonToolbar} from 'react-bootstrap'
import cooker from '../../img/profiles/cooker.svg'
import './HeaderContainer.scss'


export default class HeaderContainer extends Component {

    state = {
        collapseID: "",
        open: false,
        fullWidth: true,
        maxWidth: 'sm',
    };

    handleClickOpen = () => {
        this.setState({open: true});
    };

    handleClose = () => {
        this.setState({open: false});
    };


    toggleCollapse = collapseID => () =>
        this.setState(prevState => ({
            collapseID: prevState.collapseID !== collapseID ? collapseID : ""
        }));

    render() {
        const company = 'Dialog IT';
        return (
            <div>
                <MDBNavbar color="blue" dark expand="md" style={{padding: "0 10px", boxShadow: 'none', height: '40px'}}>
                    <MDBNavbarBrand>
                        <strong className="white-text">{`<APM> | ${company}`}</strong>
                    </MDBNavbarBrand>
                    <MDBNavbarToggler onClick={this.toggleCollapse("navBarCollapse")}/>
                    <MDBCollapse id="navBarCollapse" isOpen={this.state.collapseID}
                                 style={{background: 'inherit', padding: '0 8px', zIndex: '1'}} navbar>
                        <MDBNavbarNav left>
                            <MDBNavItem>
                                <MDBNavLink to="/">Projects</MDBNavLink>
                            </MDBNavItem>
                            <MDBNavItem>
                                <MDBNavLink to="/boards">Boards</MDBNavLink>
                            </MDBNavItem>
                            <MDBNavItem>
                                <MDBNavLink to="/analytics">Analytics</MDBNavLink>
                            </MDBNavItem>

                            <MDBNavItem>
                                <MDBDropdown>
                                    <MDBDropdownToggle nav caret>
                                        <div className="d-none d-md-inline">Projects</div>
                                    </MDBDropdownToggle>
                                    <MDBDropdownMenu className="dropdown-default" right>
                                        <MDBDropdownItem>Last visited projects...</MDBDropdownItem>
                                        <hr/>
                                        <MDBDropdownItem>All projects</MDBDropdownItem>
                                    </MDBDropdownMenu>
                                </MDBDropdown>
                            </MDBNavItem>
                            <MDBNavItem>
                                <MDBDropdown>
                                    <MDBDropdownToggle nav caret>
                                        <div className="d-none d-md-inline">Boards</div>
                                    </MDBDropdownToggle>
                                    <MDBDropdownMenu className="dropdown-default" right>
                                        <MDBDropdownItem>Last visited boards</MDBDropdownItem>
                                        <hr/>
                                        <MDBDropdownItem>All boards</MDBDropdownItem>
                                    </MDBDropdownMenu>
                                </MDBDropdown>
                            </MDBNavItem>
                            <MDBNavItem>
                                <ButtonToolbar>
                                    <Button size="sm" variant="success" onClick={this.handleClickOpen}>Create</Button>
                                </ButtonToolbar>
                            </MDBNavItem>
                        </MDBNavbarNav>
                        <MDBNavbarNav right>
                            <div className="md-form my-0 header-nav-md-form">
                                <input className="form-control header-nav-input" type="text" placeholder="Search"
                                       aria-label="Search"/>
                            </div>
                            <MDBNavItem>
                                <MDBDropdown>
                                    <MDBDropdownToggle className="dopdown-toggle" nav>
                                        <img src={cooker}
                                             style={{height: "35px", padding: 0}} alt=""/>
                                    </MDBDropdownToggle>
                                    <MDBDropdownMenu className="dropdown-default" right>
                                        <MDBDropdownItem href="#!">Profile</MDBDropdownItem>
                                        <MDBDropdownItem href="#!">Exit</MDBDropdownItem>
                                    </MDBDropdownMenu>
                                </MDBDropdown>
                            </MDBNavItem>
                        </MDBNavbarNav>
                    </MDBCollapse>
                </MDBNavbar>
                <Modal open={this.state.open}
                       handleClose={this.handleClose}
                />
            </div>
        );
    }

}

