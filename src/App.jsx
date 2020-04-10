import React from 'react';
import './App.scss';
import {Route, Switch, withRouter} from "react-router";
import Home from "./components/home/home";
import Login from "./components/auth/login";
import Register from "./components/auth/register";
import {setUser} from "./actions/auth";
import {connect} from "react-redux";
import firebase from "./store/firebase";
import Header from "./components/header/header";
import {Spin} from "antd";
import {LoadingOutlined} from '@ant-design/icons';
import Profile from "./components/profile/profile";
import {getPalette} from "./actions/palette";
import Settings from "./components/settings/settings";
import Intro from "./components/intro/intro";

const antIcon = <LoadingOutlined style={{fontSize: 24}} spin/>;

class App extends React.Component {
    state = {
        loading: true,
        pathname: '/'
    };

    componentDidMount() {
        this.setState({pathname: this.props.location.pathname});
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                console.log("User Found");
                console.log(user);
                this.props.setUser(user);
                if (!this.props.palette.synced) {
                    this.props.getPalette();
                }
                this.props.history.push(this.state.pathname);
            } else {
                console.log("User Not Found");
                this.props.history.push('/intro');
            }
            this.setState({loading: false});
        });
    }

    render() {
        if (this.state.loading) {
            return (
                <div className="App">
                    <Spin className='spinner' size={"large"} indicator={antIcon}/>
                </div>
            );
        }

        return (
            <div className="App">
                <Header/>
                <Switch>
                    <Route path={'/login'}>
                        <Login/>
                    </Route>
                    <Route path={'/register'}>
                        <Register/>
                    </Route>
                    <Route path={'/profile'}>
                        <Profile/>
                    </Route>
                    <Route path={'/settings'}>
                        <Settings/>
                    </Route>
                    <Route path={'/intro'}>
                        <Intro/>
                    </Route>
                    <Route path={'/'}>
                        <Home/>
                    </Route>
                </Switch>
            </div>
        );
    }
}


const mapStateToProps = (state) => {
    return {
        auth: state.auth,
        palette: state.palette,
    };
};

export default connect(mapStateToProps, {
    setUser,
    getPalette
})(withRouter(App));
