import { Button, Input } from 'antd';
import { useCallback, useEffect, useRef, useState } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import Dialogue from '../../components/Dialogue';
import { loadSessionId, useSessionId } from '../../store/session';
import { setDialouge } from '../../store/dialogue';
import { apiPostAnswer } from '../../api/request';
import {
  AudioOutlined,
  ClockCircleOutlined
} from '@ant-design/icons';
import { css } from '@emotion/css';

const indexContainerCSS = css`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: hsl(205deg 20% 94%);
`;

const indexInnerContainerCSS = css`
  position: relative;
  height: 85vh;
  width: 70vw;
  border: 2px solid black;
`;

const inputInnerContainerCSS = css`
  position: absolute;
  bottom: 10;
  left: 0;
  right: 0;
  padding: 0 10px 10px 10px;
  display: flex;
  gap: 10px;
`;

function Index() {
  const [value, setValue] = useState<string>('');
  const sessionId = useSessionId();
  const isReading = useRef<boolean>(false);

  const { transcript, resetTranscript } = useSpeechRecognition();


  useEffect(() => {
    loadSessionId();
  }, [])

  const handleSend = useCallback(async () => {
    const temp = value;
    setValue('');
    console.log('send');
    setDialouge(v => [...v, value]);
    console.log(temp,sessionId)
    const newDialouge = await apiPostAnswer({
      context: temp,
      sessionId: sessionId?.sessionId as string
    });
    setDialouge(v => [...v, newDialouge?.answer]);
  }, [sessionId, value])

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleChange = useCallback((e: any) => {
    setValue(e.target.value);
  }, [])

  const handleSpeek = useCallback(async () => {
    if (!isReading.current) {
      isReading.current = true;
      SpeechRecognition.startListening({ continuous: true });
    }
    else {
      isReading.current = false;
      SpeechRecognition.stopListening();
      setDialouge(v => [...v, transcript]);
      const newDialouge = await apiPostAnswer({
        context: transcript,
        sessionId: sessionId?.sessionId as string
      });
      setDialouge(v => [...v, newDialouge?.answer]);
      resetTranscript();
    }
  }, [resetTranscript, sessionId?.sessionId, transcript])

  return (
    <div className={indexContainerCSS}>
      <div className={indexInnerContainerCSS}>
        <Dialogue />
        <div className={inputInnerContainerCSS}>
          <Input
            size='large'
            onPressEnter={handleSend}
            value={value}
            onChange={handleChange}
          />
          <Button
            onClick={handleSpeek}
            icon={
              isReading.current ? <ClockCircleOutlined /> :
                <AudioOutlined />
            }
          />
        </div>
      </div>
    </div>
  )
}

export default Index;
