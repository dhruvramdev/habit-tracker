import React, {Component} from 'react';
import Form from "antd/es/form";
import message from "antd/es/message";
import {Button, Input} from "antd";
import './auth.scss';
import {connect} from "react-redux";
import {registerWithFirebase} from "../../actions/auth";
import {Link} from "react-router-dom";
import {withRouter} from "react-router";

const layout = {
    labelCol: {span: 24},
    wrapperCol: {span: 24},
};

class Register extends Component {
    constructor(props) {
        super(props);
        this.onFinish = this.onFinish.bind(this);
    }

    onFinish(values) {
        console.log('Success:', values);
        this.props.registerWithFirebase(values.email, values.password).then(() => {
            console.log("Then");
            this.props.history.push('/');
        }).catch((err) => {
            console.log(err);
            message.error("Some Error Occurred");
        });

    };

    onFinishFailed(errorInfo) {
        console.log('Failed:', errorInfo);
    };

    render() {
        return (
            <div className='auth-form'>
                <Form
                    {...layout}
                    name="login"
                    hideRequiredMark={true}
                    initialValues={{remember: true}}
                    onFinish={this.onFinish}
                    onFinishFailed={this.onFinishFailed}
                >
                    <Form.Item
                        label="E-Mail"
                        name="email"
                        rules={[{required: true, message: 'Please input your email!'}]}
                    >
                        <Input/>
                    </Form.Item>

                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[{required: true, message: 'Please input your password!'}]}
                    >
                        <Input.Password/>
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            Register
                        </Button>
                    </Form.Item>
                    <div className='footer'>
                        Have a Account?
                        <Link to={'/login'}>Login</Link>
                    </div>
                </Form>
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
    registerWithFirebase
})(withRouter(Register));
