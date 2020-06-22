import React, { Component,Fragment } from 'react'
// import { Button } from 'antd';
import './index.scss';
import { Form, Input, Button,Row, Col, message } from 'antd'
import { UserOutlined,LockOutlined   } from '@ant-design/icons'

import {validate_password} from '../../until/validate'
import {Login,GetCode} from '../../api/account'
// const style = { background: '#0092ff', padding: '8px 0' };

class LoginForm extends Component {
    constructor() {
        super()
        this.state = {
            username:""
        }

        this.onFinish = this.onFinish.bind(this)
    };
 
    onFinish = (values) => {
        Login().then(res=>{
            console.log(res)
        })
          console.log('Received values of form: ', values);
    }
    // register
    toogleForm = () => {
        // 调父级的方法
        this.props.switchFrom("register");
    }
    getCode=()=>{
        const username = this.state.username;
        if(!username) {
            message.warning('用户名不能为空！！', 1);
            return false;
        }
        if(!validate_email(username)){
            message.warning('邮箱格式不正确！！', 1);
            return false;
        }
        const requestData = {
            username:this.state.username,
            module:'login'
        }
        console.log(this.state.username)
        GetCode(requestData).then(res=>{
            console.log(res)
        })
    }
    //改变input的value
    inputChange =(e)=>{
        let value = e.target.value
        this.setState({
            username:value
        })
        console.log(value)
    }

    render() {
        const {username} = this.state
        return (
            <Fragment>
            <div className='form-wrap'>
                <div className='form-header'>
                    <h4>登录</h4>
                    <span onClick={this.toogleForm}>注册</span>
                </div>
                <div className='form-content'>
                    <Form
                        name="normal_login"
                        className="login-form"
                        initialValues={{ remember: true }}
                        onFinish={()=>this.onFinish()}
                    >
                        <Form.Item name="username" rules={
                            [
                                { required: true, message: '邮箱不能为空!' },
                                { type: "email", message: '邮箱格式不正确' }
                            ]} >
                            <Input value = { username } onChange={this.inputChange} prefix={<UserOutlined className="site-form-item-icon" />} placeholder="email"  />
                        </Form.Item>
                        
                        <Form.Item  name="password" rules={
                            [
                                { required: true, message: '密码不能为空!' },
                                { pattern: validate_password, message: '请输入大于6位小于20位数字+字母' },
                                // ({ getFieldValue }) => ({
                                //     validator(rule, value) {
                                //     if(!value){
                                //         return Promise.reject("密码不能为空");
                                //     }else{
                                //       if (value.length <6 || value.length > 16 ) {
                                //         return Promise.reject("密码长度为6-12位");
                                //       }
                                //       return Promise.resolve(); 
                                //     }                              },
                                //   }),
                            ]
                                } >
                            <Input  prefix={<LockOutlined className="site-form-item-icon" />} type="password" placeholder="Password" />
                        </Form.Item>

                        <Form.Item  name="code" rules={
                                [
                                { required: true, message: '验证码不能为空' },
                                { len: 6, message: '请输入长度为6位的验证码' }
                                ]
                            } >
                            <Row gutter={13}>
                                <Col className="gutter-row" span={15}>
                                <Input prefix={<LockOutlined className="site-form-item-icon" />} placeholder="code" />

                                </Col>
                                <Col className="gutter-row" span={9}>
                                    <Button type="primary" onClick={this.getCode} danger className="login-form-button">
                                        获取验证码
                                    </Button>
                                </Col>
                            </Row>
                        </Form.Item>

                        <Form.Item>
                            <Button type="primary" htmlType="submit" className="login-form-button" block>
                                登录
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
            </Fragment>
        )
    }
}
export default LoginForm