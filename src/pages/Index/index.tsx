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

    console.log(aiList)

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
                            cover={<img alt="avatar" src={item.ImgSrc !== "" ? item.ImgSrc : "https://preview.qiantucdn.com/58pic/0l/yv/Ms/Wk/f9283adzxwhbitq7urly15on6sp4cjek_PIC2018.png!qt_w320"} style={{ height: '120px', objectFit: 'cover' }} />}
                        >
                            <Card.Meta
                                title={item.Name}
                                description={item.Description}
                            />
                        </Card>
                    </List.Item>
                )}
            />
        </IndexContainer>
    )
}

export default Index;