import React, {Component} from 'react';
import PropTypes from 'prop-types';
import './brain.scss';
import brainParts from './parts';
import {Tooltip} from "antd";

export default class Brain extends Component {
    colors = [
        '#FF9AA2',
        '#FFB7B2',
        '#FFDAC1',
        '#E2F0CB',
        '#B5EAD7',
        '#C7CEEA',
    ];

    blanks = [
        '#F5F5F5',
        '#FAFAFA',
        '#ECECEC',
        '#DEDEDE',
        '#D4D4D4',
    ];

    render() {
        const {filled, days, message} = this.props;
        return (
            <div className='brain-container'>
                <svg xmlns="http://www.w3.org/2000/svg" version="1.0" width="2200px" height="2200px"
                     viewBox="0 0 12000 12000">
                    {
                        brainParts.map(brainPart => {
                            let color = this.blanks[brainPart.index % this.blanks.length];
                            if (brainPart.day <= filled) {
                                color = this.colors[brainPart.day % this.colors.length];
                            }
                            return (
                                <Tooltip placement="top" title={`Day ${brainPart.day}`}>
                                    <path
                                        className={`animate-${brainPart.day}`}
                                        key={brainPart.index}
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
                    <div className='day-count  animate-90'>
                        {message}
                    </div>
                )}
                {days && (
                    <div className='day-count  animate-90'>
                        Completed Days : {days}
                    </div>
                )}
            </div>
        );
    }
}

Brain.propTypes = {
    filled: PropTypes.number.isRequired,
    days: PropTypes.number,
    message: PropTypes.object
};
