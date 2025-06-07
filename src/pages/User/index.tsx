import { useCallback, useEffect } from "react";
import { useNavigate } from "react-router";
import { resetAuth } from "../../store/auth";
import { useUser, loadUser } from "../../store/user";
import { Container, Title, Content } from "./index.style";
import { Button, List } from "antd";

function UserPage() {
    const navigate = useNavigate();
    const handleLogout = useCallback(() => {
        resetAuth();
        navigate('/');
    }, [navigate]);

    const user = useUser();
    console.log(user);
    useEffect(() => {
        loadUser();
    }, [])

    
    return (
        <Container>
            <Title>个人中心</Title>
            <Content>
                <List>
                    <List.Item>用户名: {user?.username}</List.Item>
                    <List.Item>邮箱: {user?.email}</List.Item>
                    <List.Item>手机号: {user?.phone}</List.Item>
                    <List.Item>我的简历：{user?.resumeURL}</List.Item>
                </List>
                <Button danger onClick={handleLogout}>退出登录</Button>
            </Content>
        </Container>
    );
}

export default UserPage;