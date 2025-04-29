import { Button } from "antd";
import { LoginContainer, LoginInnerConatiner, RegisterContainer } from "./index.style";
import { useIsInLoginPage } from "../../hooks/useIsInLoginPage";
import RegisterForm from "../../components/RegisterForm";
import LoginForm from "../../components/LoginForm";
import { useNavigate } from "react-router";
import { useCallback } from "react";


function Login() {
    const isLogin = useIsInLoginPage();
    const naviagte = useNavigate();

    const handleBackLogin = useCallback(() => {
        naviagte("/login")
    }, [naviagte]);

    const handleBackRegister = useCallback(() => {
        naviagte("/register")
    }, [naviagte]);
    
    return (
        <LoginContainer>
            <LoginInnerConatiner>
                <h1>{isLogin ? '登陆' : '注册'}</h1>
                {
                    isLogin ? (
                       <LoginForm />
                    ) : (
                        <RegisterForm />
                    )
                }
                <RegisterContainer>
                    {
                        isLogin ? (
                            <>
                                <Button type="link">忘记密码?</Button>
                                <Button type="link" onClick={handleBackRegister}>注册</Button>
                            </>
                        ) : (
                            <Button type="link" onClick={handleBackLogin}>返回登录</Button>
                        )
                    }
                </RegisterContainer>
            </LoginInnerConatiner>
        </LoginContainer>
    );
}

export default Login;