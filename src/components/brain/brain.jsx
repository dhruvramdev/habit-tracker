import React, {Component} from 'react';
import PropTypes from 'prop-types';
import './brain.scss';
import brainParts from './parts';
import {Tooltip} from "antd";
import {getPalette} from "../../actions/palette";
import {connect} from "react-redux";

class Brain extends Component {
    blanks = [
        '#F5F5F5',
        '#FAFAFA',
        '#ECECEC',
        '#DEDEDE',
        '#D4D4D4',
    ];

    componentDidMount() {
        if (this.props.auth.loggedIn && !this.props.palette.synced) {
            this.props.getPalette();
        }
    }

    render() {
        const {colors} = this.props.palette;
        const {filled, days, message, animate} = this.props;
        return (
            <div className='brain-container'>
                <svg xmlns="http://www.w3.org/2000/svg" version="1.0" width="2200px" height="2200px"
                     viewBox="0 0 12000 12000">
                    {
                        brainParts.map(brainPart => {
                            let color = this.blanks[brainPart.index % this.blanks.length];
                            if (brainPart.day <= filled) {
                                color = colors[brainPart.day % colors.length];
                            }
                            return (
                                <Tooltip
                                    key={brainPart.index}
                                    placement="top"
                                    title={`Day ${brainPart.day}`}>
                                    <path
                                        className={animate ? `animate-${Math.floor((brainPart.day - 1) / 10)}` : ''}
                                        id={brainPart.index}
                                        d={brainPart.d}
                                        fill={color}
                                        onClick={() => {
                                            // console.log(brainPart.index);
                                            setTimeout(console.log.bind(console, brainPart.day ? `${brainPart.index} -> ${brainPart.day}` : brainPart.index));
                                        }}
                                    />
                                </Tooltip>
                            );
                        })
                    }
                </svg>
                {message && (
                    <div className={`day-count`}>
                        {message}
                    </div>
                )}
                {days && (
                    <div className={`day-count`}>
                        Completed Days : {days}
                    </div>
                )}
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
    getPalette
})(Brain);

Brain.propTypes = {
    filled: PropTypes.number.isRequired,
    animate: PropTypes.bool,
    days: PropTypes.number,
    message: PropTypes.string
};
