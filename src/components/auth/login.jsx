import React, {Component} from 'react';
import Form from "antd/es/form";
import message from "antd/es/message";
import {Button, Input} from "antd";
import './auth.scss';
import {connect} from "react-redux";
import {loginWithFirebase} from "../../actions/auth";
import {Link} from "react-router-dom";
import {withRouter} from "react-router";

const layout = {
    labelCol: {span: 24},
    wrapperCol: {span: 24},
};

class Login extends Component {
    constructor(props) {
        super(props);
        this.onFinish = this.onFinish.bind(this);
        console.log(props);
    }

    onFinish(values) {
        console.log('Success:', values);
        this.props.loginWithFirebase(values.email, values.password).then(() => {
            console.log("Done");
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
                            Login
                        </Button>
                    </Form.Item>
                    <div className='footer'>
                        Don't Have a Account?
                        <Link to={'/register'}>Register</Link>
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
    loginWithFirebase
})(withRouter(Login));
