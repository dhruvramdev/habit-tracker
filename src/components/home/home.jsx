import React, {Component} from 'react';
import BrainList from "../brain-list/brain-list";
import './home.scss';
import {connect} from "react-redux";
import {withRouter} from "react-router";
import {getStreak} from "../../actions/streak";
import {Spin} from "antd";
import {LoadingOutlined} from '@ant-design/icons';

const antIcon = <LoadingOutlined style={{fontSize: 24}} spin/>;

class Home extends Component {
    componentDidMount() {
        if (!this.props.auth.loggedIn) {
            this.props.history.push('/login');
        } else {
            if (!this.props.streak.fetched) {
                this.props.getStreak();
            }
        }
    }

    render() {
        const {fetched, streak} = this.props.streak;
        return (
            <div style={{flex:1, display: 'flex'}}>
                {fetched ? (
                    <BrainList startDate={streak && streak.startDate}/>
                ) : (
                    <Spin style={{color: 'white', margin : "auto"}} size={"large"} indicator={antIcon}/>
                )}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.auth,
        streak: state.streak
    };
};

export default connect(mapStateToProps, {
    getStreak
})(withRouter(Home));
