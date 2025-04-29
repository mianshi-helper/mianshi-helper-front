import { Avatar } from "antd";
import { useNavigate } from "react-router";

function UserAvatar() {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate("/User");
    };

    return (
        <Avatar
            size={40}
            style={{ backgroundColor: "#1890ff", cursor: "pointer" }}
            onClick={handleClick}
        >
            U
        </Avatar>
    );
}

export default UserAvatar;