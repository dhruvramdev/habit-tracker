import React, {Component, Fragment} from 'react';
import './settings.scss';
import {connect} from "react-redux";
import {withRouter} from "react-router";
import {Input, message, Spin} from "antd";
import {LoadingOutlined, MinusCircleOutlined} from '@ant-design/icons';
import {getPalette, setPalette} from "../../actions/palette";

const antIcon = <LoadingOutlined style={{fontSize: 24}} spin/>;


class Settings extends Component {
    constructor(props) {
        super(props);
        this.state = {
            colors: props.palette.colors || []
        };


        this.saveColors = this.saveColors.bind(this);
    }

    componentDidMount() {
        if (!this.props.auth.loggedIn) {
            this.props.history.push('/login');
        } else {
            if (!this.props.palette.synced) {
                this.props.getPalette();
            }
        }
    }

    UNSAFE_componentWillReceiveProps(nextProps, nextContext) {
        if (this.props.palette.colors !== nextProps.palette.colors) {
            this.setState({colors: nextProps.palette.colors});
        }
    }

    async saveColors() {
        if (this.state.colors.length < 1) {
            message.error("Minimum 1 Color is required");
            return;
        }
        try {
            await this.props.setPalette(this.state.colors);
            message.success("Saved");
        } catch (err) {
            message.error("Unable to Save Name");
        }
    }

    getRandomColor() {
        let letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    render() {
        if (!this.props.auth.loggedIn) {
            return <div/>;
        }
        const {palette} = this.props;
        const colors = this.state.colors;

        return (
            <div className='settings'>
                <div className="page-name">
                    Settings
                </div>
                <div className="fields">
                    {palette.synced ? (
                        <Fragment>
                            <div>Color Palette</div>
                            <table className='color-table'>
                                <tbody>
                                {colors.map((color, index) => (
                                    <tr key={index}>
                                        <td>
                                            <div className="color-box" style={{backgroundColor: color}}/>
                                        </td>
                                        <td>
                                            <div className='form'>
                                                <Input
                                                    placeholder={`Color #${index + 1}`}
                                                    required={true}
                                                    value={colors[index]}
                                                    onChange={(event) => {
                                                        const nColors = [...colors];
                                                        nColors[index] = event.target.value;
                                                        this.setState({colors: nColors});
                                                    }}/>
                                                <div className='remove' onClick={() => {
                                                    const nColors = [...colors];
                                                    nColors.splice(index, 1);
                                                    this.setState({colors: nColors});
                                                }}>
                                                    <MinusCircleOutlined/>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                            <div className='form-footer'>
                                <button onClick={() => {
                                    this.setState({
                                        colors: [
                                            ...colors,
                                            this.getRandomColor()
                                        ]
                                    });
                                }}>
                                    Add Color
                                </button>
                                <button onClick={this.saveColors}>Save</button>
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
        palette: state.palette
    };
};

export default connect(mapStateToProps, {
    getPalette,
    setPalette
})(withRouter(Settings));
