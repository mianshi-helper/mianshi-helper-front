import { message, Input, Button } from "antd";
import { useState, useRef, useCallback, useEffect } from "react";
import { useNavigate } from "react-router";
import { apiGetVerifyCode } from "../../api/request";
import { LoginVerficationContainer, LoginVerficationImageCSS } from "../../pages/Login/index.style";
import { loadAuth } from "../../store/auth";

function LoginForm() {
    const [userName, setUserName] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [verificationCode, setVerificationCode] = useState<string>("");
    const [imageSrc, setImageSrc] = useState<string>();
    const sessionId = useRef<string>(Math.random().toString(36).substr(2));
    const nagivate = useNavigate();

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleUserNameChange = useCallback((e: any) => {
        setUserName(e.target.value);
    }, [])

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handlePasswordChange = useCallback((e: any) => {
        setPassword(e.target.value);
    }, [])

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleVerificationCodeChange = useCallback((e: any) => {
        setVerificationCode(e.target.value);
    }, [])

    const handleSubmit = useCallback(async () => {
        await loadAuth(
            {
                userName,
                password,
                verificationCode,
                sessionId: sessionId.current,
            },
        )
        message.success("登录成功");
        setTimeout(() => {
            nagivate("/");
        }, 1500);
    }, [userName, password, verificationCode, nagivate])

    useEffect(() => {
        async function func() {
            const res = await apiGetVerifyCode({ sessionId: sessionId.current });
            const blobUrl = URL.createObjectURL(res as Blob); // 创建Blob URL
            setImageSrc(blobUrl);
        }
        func();
    }, [sessionId])
    
    return (
        <>
            <Input value={userName} placeholder="请输入用户名" onChange={handleUserNameChange} />
            <Input value={password} placeholder="请输入密码" type="password" onChange={handlePasswordChange} />
            <LoginVerficationContainer>
                <Input value={verificationCode} placeholder="请输入验证码" onChange={handleVerificationCodeChange} />
                <img src={imageSrc} alt="验证码" className={LoginVerficationImageCSS} />
            </LoginVerficationContainer>
            <Button onClick={handleSubmit}>登录</Button>
        </>
    );
}

export default LoginForm;