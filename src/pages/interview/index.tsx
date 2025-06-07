import { Button, Input, message } from 'antd';
import { useCallback, useEffect, useRef, useState } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import Dialogue from '../../components/Dialogue';
import { loadSessionId, useSessionId } from '../../store/session';
import { setDialouge } from '../../store/dialogue';
import { apiPostAnswer, apiUploadFile2 } from '../../api/request';
import {
  AudioOutlined,
  ClockCircleOutlined,
  FileAddOutlined
} from '@ant-design/icons';
import { css } from '@emotion/css';
import { BACKGROUND_COLOR } from '../../contstants/colors';
import { useAuth } from '../../store/auth';

const indexContainerCSS = css`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: ${BACKGROUND_COLOR};
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

function Interview() {
  const [value, setValue] = useState<string>('');
  const sessionId = useSessionId();
  const isReading = useRef<boolean>(false);
  const { transcript, resetTranscript } = useSpeechRecognition();
  const auth = useAuth();
  useEffect(() => {
    if (auth?.token != null) {
      loadSessionId();
    }
  }, [auth])

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
      SpeechRecognition.startListening({ continuous: true, language: 'zh-CN' });
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

  const fileInputRef = useRef<HTMLInputElement>(null);

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleUpFile(file);
    e.target.value = ''; // 重置以允许重复选择同一文件
  };

  const handleUpFile = useCallback(async (file: File) => {
    const allowedTypes = ['text/plain', 'application/pdf'];
    if (!allowedTypes.includes(file.type)) {
      message.error('仅支持上传 .txt 和 .pdf 文件');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('file', file);
      const res = await apiUploadFile2(file);
      message.success(res.message);
      location.reload();
    } catch (error) {
      message.error('文件上传失败');
    }
  }, []);

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
          {/* 上传文件 */}
          <>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept=".txt,.pdf"
              style={{ display: 'none' }}
            />
            <Button icon={<FileAddOutlined />} onClick={triggerFileInput}>
              上传简历
            </Button>
          </>
        </div>
      </div>
    </div>
  )
}

export default Interview;
