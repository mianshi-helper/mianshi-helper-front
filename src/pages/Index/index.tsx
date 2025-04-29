import { useCallback, useEffect } from "react";
import { loadAiList, useAiList } from "../../store/aiList";
import { List, Card } from "antd";
import { useNavigate } from "react-router";
import { IndexContainer } from "./index.style";

function Index() {
    const aiList = useAiList();
    const navigate = useNavigate();

    useEffect(() => {
        loadAiList();
    },[]);

    const jumpToAiInterviewer = useCallback((id: string) => {
        navigate({
            pathname: "/interview",
            search: `?id=${id}`
        });
    },[navigate])

    return (
        <IndexContainer>
            <List
                grid={{ gutter: 16, column: 4 }}
                dataSource={aiList}
                renderItem={(item) => (
                    <List.Item>
                        <Card
                            hoverable
                            onClick={() => jumpToAiInterviewer(item.ID)}
                        >
                            {item.Name}
                        </Card>
                    </List.Item>
                )}
            />
        </IndexContainer>
    )
}

export default Index;