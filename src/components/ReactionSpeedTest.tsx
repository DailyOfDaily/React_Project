import React, { useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';

const ReactionSpeedTest: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // URL 파라미터에서 id를 추출
  const location = useLocation();
  const { game } = location.state || {}; // Link에서 전달한 상태 데이터

  const [status, setStatus] = useState<'waiting' | 'ready' | 'clicked'>('waiting');
  const [message, setMessage] = useState('\n누르면 시작합니다!\n');
  const [startTime, setStartTime] = useState<number | null>(null);
  const [reactionTime, setReactionTime] = useState<number | null>(null);
  const [isDisabled, setIsDisabled] = useState(false); // 클릭 비활성화 상태 추가
  const [delayedMessage, setDelayedMessage] = useState(''); // 비활성화된 상태에서의 메시지 관리

  const startTest = () => {
    if (status !== 'waiting') return;  // 이미 게임이 진행 중이라면 시작하지 않음
    setStatus('ready');
    setMessage('\n준비해 주세요\n');
    setTimeout(() => {
      setStatus('clicked');
      setStartTime(Date.now());
      if (isDisabled) {
        setDelayedMessage('지금 당장 누르세요(비활성화 상태)');
      } else {
        setMessage('\n지금 당장 누르세요.\n');
      }
    }, Math.random() * 500 + 2500);
  };

  const handleClick = () => {
    if (isDisabled) return; // 비활성화 상태면 클릭을 무시

    if (status === 'clicked') {
      const endTime = Date.now();
      setReactionTime(endTime - (startTime || 0));
      setStatus('waiting');
      setMessage('\n누르면 재시작!\n');
    } else {
      setMessage('\n아직 누르면 안 됩니다!\n2초 후 클릭 가능합니다.\n');
      setStatus('waiting');
      setIsDisabled(true); // 클릭을 1초 동안 비활성화
      setTimeout(() => {
        setIsDisabled(false); // 1초 후 다시 활성화
        if (delayedMessage) {
          setMessage('[비활성화 상태] 기다려주세요.');
          setDelayedMessage(''); // 지연된 메시지 초기화
        }
      }, 2000);
    }
  };

  // 메시지에서 \n을 <br />로 바꾸기
  const formatMessage = (msg: string) => {
    return msg.split('\n').map((line, index) => <span key={index}>{line}<br /></span>);
  };

  // 상태에 따라 스타일 변경
  const getStyle = () => {
    if (status === 'waiting') {
      return { backgroundColor: 'white', color: 'black' };
    } else if (status === 'ready') {
      return { backgroundColor: 'black', color: 'white' };
    } else if (status === 'clicked') {
      return { backgroundColor: 'yellow', color: 'red' };
    }
    return {};
  };

  return (
    <div
      className="reaction-speed-test-wrapper"
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <div
        className="reaction-speed-test"
        onClick={status !== 'waiting' ? handleClick : startTest}
        style={{
          ...getStyle(),
          padding: '20px',
          width: '500px',
          height: '500px',
          textAlign: 'center',
          fontSize: '30px',
          border: '1px solid black',
          cursor: isDisabled ? 'not-allowed' : 'pointer', // 비활성화 상태일 때 커서 모양 변경
          pointerEvents: isDisabled ? 'none' : 'auto', // 클릭 방지
        }}
      >
        {typeof message === 'string' ? formatMessage(message) : <p>{message}</p>}
        {reactionTime && <p>누르기까지 걸린 시간: {reactionTime}ms</p>}
        {/* <p>{delayedMessage || message}</p>
        {reactionTime && <p>Reaction time: {reactionTime}ms</p>} */}
      </div>
    </div>
  );
};

export default ReactionSpeedTest;
