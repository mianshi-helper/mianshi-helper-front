import { Button, Form, Input } from "antd";
import { useCallback, useEffect } from "react";
import { loadIsUserNameExist, useIsUserNameExist } from "../../store/isUserNameExist"
import { apiPostRegister } from "../../api/request";
import { RegisterParams } from "../../types/Register";
import { useForm } from "antd/es/form/Form";

function RegisterForm() {
    const [form] = useForm();
    const userName = form.getFieldValue("userName");
    const handleSubmit = useCallback(async (value: RegisterParams) => {
        const res = await apiPostRegister(value);
        console.log(res);
    }, []);

    console.log(userName);
    useEffect(() => {
        loadIsUserNameExist({userName});
    },[userName])

    const isRightUser = useIsUserNameExist();

    return (
        <Form
            onFinish={handleSubmit}
        >
            <div>Register</div>
            <Form.Item
                label="用户名"
                name="userName"
                rules={[{ required: true, message: '用户名必填!' }]}
                hasFeedback={isRightUser}
            >
                <Input placeholder="请输入用户名" />
            </Form.Item>
            <Form.Item label="密码" name="password">
                <Input placeholder="请输入密码" />
            </Form.Item>
            <Form.Item label="确认密码" name="surePassword">
                <Input placeholder="请输入确认密码" />
            </Form.Item>
            <Form.Item label="电话" name="phone">
                <Input placeholder="请输入电话" />
            </Form.Item>
            <Form.Item label="邮箱" name="email">
                <Input placeholder="请输入邮箱" />
            </Form.Item>
            <Form.Item label="年龄" name="age">
                <Input placeholder="请输入年龄" />
            </Form.Item>
            <Form.Item label="验证码" name="verificationCode">
                <Input placeholder="请输入验证码" />
            </Form.Item>
            <Form.Item>
                <Button htmlType="submit" type="primary">注册</Button>
            </Form.Item>
        </Form>
    )
}

export default RegisterForm;