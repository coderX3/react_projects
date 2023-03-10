import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input, message } from 'antd';
import './login.css'


export default function Login(props) {
    let account = {};
    const onFinish = (values) => {
        account = {
            userName: values.userName,
            password: values.password
        }
        console.log('Received values of form: ', values);
    };
    console.log(account)
    const login = ()=>{
        let request = new Request('http://localhost:8080/cooking-assistant/login', {
            method: 'POST',
            body: JSON.stringify(account)
        });
        
        fetch(request).then(
            (response)=>{response.json()}
        ).then(
            (res)=>{
                props.getAccountInfo(res);
                message.success('登录成功', 3)
            },
            (error)=>{
                message.error('登录失败', 3);
                console.log(error)
            }
        );
    };
    return (
        <Form
            id='components-form-demo-normal-login'
            name="normal_login"
            className="login-form"
            initialValues={{
                remember: true,
            }}
            onFinish={onFinish}
        >
            <Form.Item
                name="username"
                rules={[
                    {
                        required: true,
                        message: '请输入您的用户名！',
                    },
                ]}
            >
                <Input  prefix={<UserOutlined className="site-form-item-icon" />} placeholder="用户名" />
            </Form.Item>
            <Form.Item
                name="password"
                rules={[
                    {
                        required: true,
                        message: '请输入您的密码！',
                    },
                ]}
            >
                <Input
                    prefix={<LockOutlined className="site-form-item-icon" />}
                    type="password"
                    placeholder="密码"
                />
            </Form.Item>
            <Form.Item>
                <Form.Item name="remember" valuePropName="checked" noStyle>
                    <Checkbox>记住我</Checkbox>
                </Form.Item>

                {/* <a className="login-form-forgot" href="">
                    Forgot password
                </a> */}
            </Form.Item>

            <Form.Item>
                <Button type="primary" htmlType="submit" className="login-form-button" onClick={login}>
                    Log in
                </Button>
                {/* Or <a href="">register now!</a> */}
            </Form.Item>
        </Form>
    );
}


