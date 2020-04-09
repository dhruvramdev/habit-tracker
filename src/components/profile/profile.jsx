import React, {Component, Fragment} from 'react';
import './profile.scss';
import {connect} from "react-redux";
import {getStreak, setStreak} from "../../actions/streak";
import {withRouter} from "react-router";
import {DatePicker, Input, message, Spin} from "antd";
import moment from "moment";
import {LoadingOutlined} from '@ant-design/icons';

const antIcon = <LoadingOutlined style={{fontSize: 24}} spin/>;


class Profile extends Component {
    state = {
        displayName: '',
        startDate: undefined
    };

    constructor(props) {
        super(props);
        this.saveDisplayName = this.saveDisplayName.bind(this);
        this.saveStreakDate = this.saveStreakDate.bind(this);
    }

    componentDidMount() {
        if (!this.props.auth.loggedIn) {
            this.props.history.push('/login');
        } else {
            if (!this.props.streak.fetched) {
                this.props.getStreak();
            }
        }
    }

    async saveDisplayName() {
        console.log(this.state.displayName);
        if (!this.state.displayName) {
            message.error("No Name Entered");
        }
        try {
            const data = await this.props.auth.user.updateProfile({
                displayName: this.state.displayName
            });
            console.log(data);
            message.success("Saved");

        } catch (err) {
            message.error("Unable to Save Name");
        }
    }

    async saveStreakDate() {
        if (this.state.startDate) {
            try {
                await this.props.setStreak(this.state.startDate);
                message.success("Saved");
            } catch (err) {
                message.error("Unable to Save Name");
            }
        } else {
            message.error("No Date Entered");
        }
    }

    disabledDate(current) {
        // Can not select days before today and today
        return current > moment().endOf('day');
    }

    render() {
        if (!this.props.auth.loggedIn) {
            return <div/>
        }

        const {user} = this.props.auth;
        const {streak} = this.props;
        console.log(streak);
        let startDate = undefined;
        if (streak.fetched && streak.streak && streak.streak.startDate) {
            startDate = moment(streak.streak.startDate.seconds * 1000).format('DD/MM/YYYY');
        }

        return (
            <div className='profile'>
                <div className="page-name">
                    Profile
                </div>
                <div className="fields">
                    {user.displayName ? (
                        <div>{user.displayName}</div>
                    ) : (
                        <div className='form'>
                            <Input
                                placeholder={'Set Name'}
                                value={this.state.displayName}
                                onChange={(event) => {
                                    this.setState({displayName: event.target.value});
                                }}/>
                            <button onClick={this.saveDisplayName}>Save</button>
                        </div>
                    )}

                    <div>{user.email}</div>
                </div>
                <div className="page-name">
                    Streak
                </div>
                <div className="fields">
                    {streak.fetched ? (
                        <Fragment>
                            <div>Start Date : {startDate}</div>
                            <div className='form'>
                                <DatePicker
                                    format={'DD/MM/YYYY'}
                                    placeholder={'Set Start Date'}
                                    disabledDate={this.disabledDate}
                                    onChange={(date) => {
                                        this.setState({startDate: date});
                                    }}/>
                                <button onClick={this.saveStreakDate}>Save</button>
                            </div>
                        </Fragment>
                    ) : (
                        <Spin className='spinner' size={"large"} indicator={antIcon}/>
                    )}

                </div>
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
    getStreak,
    setStreak
})(withRouter(Profile));
