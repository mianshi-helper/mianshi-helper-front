import { css } from "@emotion/css";
import { Avatar } from "antd";

interface Props {
    name: string;
    value: string;
}

const dialogueContainerCSS = css`
    display: flex;
    gap: 10px;
    margin-top: 15px;
`;

const dialogueContentCSS = css`
    background-color: white;
    padding: 10px;
    border-radius: 12px;
`;

function DialogueContent({ name,value }: Props) {
    return (
        <div className={dialogueContainerCSS}>
            <div>
                {
                    name === "user" ? <Avatar>我</Avatar> : <Avatar>面试官</Avatar>
                }
            </div>
            <div className={dialogueContentCSS}>
                {value}
            </div>
        </div>
    )
}

export default DialogueContent;