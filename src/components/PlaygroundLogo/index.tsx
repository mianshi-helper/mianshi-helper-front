import { Avatar } from "antd";
import { useCallback } from "react";
import { useNavigate } from "react-router";
import { BankOutlined } from '@ant-design/icons';
import styled from "@emotion/styled";

const Container = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
    justify-content: space-between;
    padding: 0 10px;
    background-color: #fff;
`;

const LoginHeaderTitle = styled.h1`
    display: flex;
    gap: 10px;
    cursor: pointer;
`;

function PlayGroundLogo() {
    const navigate = useNavigate();
    const handleClick = useCallback(() => {
        navigate("/user");
    }, [navigate]);

    const handleBackHome = useCallback(() => {
        navigate("/");
    }, [navigate]);

    return (
        <Container>
            <LoginHeaderTitle onClick={handleBackHome}>
                智面未来
                <BankOutlined />
            </LoginHeaderTitle>
            <Avatar size={36} style={{ backgroundColor: "#1890ff" }} onClick={handleClick}>U</Avatar>
        </Container>
    );
}

export default PlayGroundLogo;