import styled from "@emotion/styled";
import { BACKGROUND_COLOR } from "../../contstants/colors";
import { css } from "@emotion/css";

export const LoginContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: ${BACKGROUND_COLOR};
`;

export const LoginInnerConatiner = styled.div`
    background-color: white;
    padding: 20px;
    display: flex;
    flex-direction: column;
    gap: 20px;
    width: 30%;
    border-radius: 10px;
`;

export const LoginVerficationImageCSS = css`
    width: 80px;
    height: 30px;
    background-color: white;
    margin-left: auto;
`;

export const LoginVerficationContainer = styled.div`
    display: flex;
    gap: 10px;
`;

export const RegisterContainer = styled.div`
    display: flex;
`;