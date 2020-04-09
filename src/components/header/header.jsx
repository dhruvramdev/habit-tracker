import React, {Component, Fragment} from 'react';
import {connect} from "react-redux";
import './header.scss';
import {Link} from "react-router-dom";
import {LogoutOutlined, UserOutlined} from "@ant-design/icons";
import firebase from "../../store/firebase";
import {message} from "antd";
import {resetStore} from "../../actions/common";

class Header extends Component {
    constructor(props) {
        super(props);
        this.logout = this.logout.bind(this);
    }

    async logout() {
        try {
            await firebase.auth().signOut();
            this.props.resetStore();
            message.success("Signed Out Successfully");
        } catch (err) {
            console.log(err);
            message.error("Some Error Occurred");
        }
    }

    render() {
        const {loggedIn, user} = this.props.auth;
        return (
            <div className='header'>
                <div className='left'>
                    <Link to={'/'}>
                        UNFUCK YOURSELF
                    </Link>
                </div>
                <div className="right">
                    {loggedIn ? (
                        <Fragment>
                            <Link to={'/profile'}>
                                <UserOutlined/>
                            </Link>
                            <LogoutOutlined onClick={this.logout} style={{marginLeft: 10}}/>
                        </Fragment>
                    ) : (
                        <Link to={'/login'}>
                            Login
                        </Link>
                    )}
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.auth
    };
};

export default connect(mapStateToProps, {
    resetStore
})(Header);
