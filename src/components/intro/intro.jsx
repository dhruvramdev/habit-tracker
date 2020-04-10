import React, {Component} from 'react';
import './intro.scss';
import Brain from "../brain/brain";
import {Button} from "antd";
import {Link} from "react-router-dom";

class Intro extends Component {
    state = {
        filled: 0
    };

    componentDidMount() {
        this.interval  =setInterval(() => {
            this.setState({
                filled: (this.state.filled + 3) % 91
            });
        }, 100);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    render() {
        const message = this.state.filled === 90 ? 'Success!' : `Days : ${this.state.filled}`;
        if(this.state.filled === 90){
            clearInterval(this.interval);
            setTimeout(() => {
                this.setState({filled : 0});
                this.componentDidMount();
            }, 1000);
        }
        return (
            <div className='filler bootstrap-container'>
                <div className='filler-row'>
                    <div className='filler-col' style={{flexDirection: 'column'}}>
                        <div className="heading">Yet Another Progress Tracker</div>
                        <div className="sub-heading">
                            Simplifies the process of tracking your progress for next 90 days.
                        </div>
                        <div className="content">
                            Features
                            <ul>
                                <li>Awesome Desing</li>
                                <li>Cool Animations</li>
                                <li>Choose Custom Palette</li>
                                <li>Sync Progress across devices</li>
                                <li>Sync Progress across devices</li>
                            </ul>
                        </div>
                        <div className="call-to-action">
                            <Link to={'/register'}>
                                <Button>
                                    Try Now
                                </Button>
                            </Link>
                        </div>
                    </div>
                    <div className='filler-col'>
                        <div>
                            <Brain message={message} key={0} filled={this.state.filled}/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Intro;
