import React, { Component, Fragment } from 'react';
import { NavLink } from 'reactstrap'
import { connect } from 'react-redux';
import { logout } from '../store/actions/auth';
import { clearEvents } from '../store/actions/events';
import { clearRSOs, clearRSOsAdmin } from '../store/actions/info';

export class Logout extends Component 
{
    
    render() {
        return (
            <Fragment>
                <NavLink onClick={() => this.logOut()} href="#">
                Logout {this.props.auth.user.username}</NavLink>
            </Fragment>
        );
    }

    logOut = () => {
        this.props.logout();
        this.props.clearEvents();
        this.props.clearRSOs();
        this.props.clearRSOsAdmin();
    };
}

const mapStateToProps = state => ({
    // contact = reducer from index.js
    // Stores it to this.props.contact
    contact: state.contact,
    auth: state.auth
});

export default connect(mapStateToProps, { logout, clearEvents, clearRSOsAdmin, clearRSOs }) (Logout);