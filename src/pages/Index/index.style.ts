import styled from "@emotion/styled";
import { CARD_COLOR } from "../../contstants/colors";

export const IndexContainer = styled.div`
    display: flex;
    justify-content: center;
    width: 100%;
    margin-top: 50px;
`;

export const CardList = styled.ul`
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    justify-content: center;
    list-style: none;
    padding: 0;
    margin: 0;
    width: 100%;
    max-width: 1200px;
`;

export const CardItem = styled.li`
    background-color: ${CARD_COLOR};
    border-radius: 8px;
    padding: 16px;
    width: 200px;
    cursor: pointer;
    transition: transform 0.2s;

    &:hover {
        transform: translateY(-5px);
    }
`;