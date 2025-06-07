import { Button, Form, Input } from "antd";
import { FormInstance } from "antd/es/form/Form";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  loadIsUserNameExist,
  useIsUserNameExist,
} from "../../store/isUserNameExist";
import {
  LoginVerficationContainer,
  LoginVerficationImageCSS,
} from "../../pages/Login/index.style";
import { apiGetVerifyCode } from "../../api/request";

interface Props {
  form: FormInstance;
}

function FormContext({ form }: Props) {
  const isUserNameExist = useIsUserNameExist();
  const [imageSrc, setImageSrc] = useState<string>();

  const handleCheckUserNameExist = useCallback(() => {
    loadIsUserNameExist({
      userName: form.getFieldValue("userName"),
    });
  }, [form]);

  const sessionId = useRef<string>(Math.random().toString(36).substr(2));

  useEffect(() => {
    async function func() {
      const res = await apiGetVerifyCode({ sessionId: sessionId.current });
      const blobUrl = URL.createObjectURL(res as Blob); // 创建Blob URL
      setImageSrc(blobUrl);
    }
    func();
  }, []);

  const handleChangeImgUrl = useCallback(async () => {
    const res = await apiGetVerifyCode({ sessionId: sessionId.current });
    const blobUrl = URL.createObjectURL(res as Blob); // 创建Blob URL
    setImageSrc(blobUrl);
  }, []);

  console.log(isUserNameExist);
  const validateUserNameExist = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (_: any, value: any) => {
      if (!value) {
        return Promise.resolve();
      }
      console.log("isUserNameExist", isUserNameExist);
      if (isUserNameExist) {
        return Promise.reject("用户名已存在!");
      }
      return Promise.resolve();
    },
    [isUserNameExist]
  );

  return (
    <>
      <Form.Item
        label="用户名"
        name="userName"
        rules={[
          { required: true, message: "用户名必填!" },
          { validator: validateUserNameExist },
        ]}
      >
        <Input placeholder="请输入用户名" onBlur={handleCheckUserNameExist} />
      </Form.Item>
      <Form.Item
        label="密码"
        name="password"
        rules={[{ required: true, message: "密码必填!" }]}
      >
        <Input placeholder="请输入密码" />
      </Form.Item>
      <Form.Item
        label="确认密码"
        name="surePassword"
        rules={[{ required: true, message: "确认密码必填!" }]}
      >
        <Input placeholder="请输入确认密码" />
      </Form.Item>
      <Form.Item
        label="电话"
        name="phone"
        rules={[{ required: true, message: "电话必填!" }]}
      >
        <Input placeholder="请输入电话" />
      </Form.Item>
      <Form.Item
        label="邮箱"
        name="email"
        rules={[{ required: true, message: "邮箱必填!" }]}
      >
        <Input placeholder="请输入邮箱" />
      </Form.Item>
      <Form.Item
        label="年龄"
        name="age"
        rules={[{ required: true, message: "年龄必填!" }]}
      >
        <Input placeholder="请输入年龄" />
      </Form.Item>
      <Form.Item label="验证码">
      <LoginVerficationContainer>
        <Input placeholder="请输入验证码" />
        <img
          src={imageSrc}
          alt="验证码"
          onClick={handleChangeImgUrl}
          className={LoginVerficationImageCSS}
        />
      </LoginVerficationContainer>
      </Form.Item>
      <Form.Item>
        <Button htmlType="submit" type="primary">
          注册
        </Button>
      </Form.Item>
    </>
  );
}

export default FormContext;
