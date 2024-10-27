import { css } from "@emotion/css";
import { useDialouge } from "../../store/dialogue";
import DialogueContent from "./DialougeContent";

const dialogueCSS = css`
    overflow: scroll;
    height: 90%;
    width: 100%;
`;

function Dialogue() {
    const dialogue = useDialouge();

    return (
        <div className={dialogueCSS}>
            {
                dialogue?.map((value, index) => (
                    <div key={index} className={
                        css`
                            width: 100%;
                        `
                    }>
                        {
                            index % 2 === 0 ?
                                <DialogueContent name={"user"} value={value} /> :
                                <DialogueContent name={"ai"} value={value} />
                        }
                    </div>
                ))
            }
        </div>
    );
}
export default Dialogue;
