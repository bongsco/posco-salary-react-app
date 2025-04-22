import { useEffect, useRef, useState } from 'react';
import Button from '#components/Button';
import SnackBar from './SnackBar';

export default {
  title: 'UI/SnackBar',
  component: SnackBar,
  tags: ['autodocs'],
};

function Template() {
  const [isSnackBarShowing, setIsSnackBarShowing] = useState(false);
  const [message, setMessage] = useState('');
  const timerRef = useRef(null);

  const handleSnackBar = (msg) => {
    setMessage(msg);
    setIsSnackBarShowing(true);

    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    timerRef.current = setTimeout(() => {
      setIsSnackBarShowing(false);
      timerRef.current = null;
    }, 2000);
  };

  // 컴포넌트 언마운트 시 타이머 정리
  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  return (
    <div>
      <Button
        variant="primary"
        size="small"
        label="시스템 반영"
        onClick={() => {
          handleSnackBar('통합 인사 시스템에 반영이 완료되었습니다.');
        }}
      />
      {isSnackBarShowing && <SnackBar message={message} />}
    </div>
  );
}

export const Default = Template.bind();
