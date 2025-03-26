import { useReducer, useState } from 'react';
import Switch from '#components/Switch';
import AdjustEditLayout from '#layouts/AdjustEditLayout';
import CustomTimeLine from '#components/TimeLine';

export default function TestEditPage() {
  const initialState = {
    initialBool: false,
    bool: false,
    message: ``,
    isCommitted: true,
  };
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [data] = useState([
    ['2024 정기연봉조정 1차', new Date(2024, 1, 1), new Date(2024, 5, 1)],
    ['2025 정기연봉조정 2차', new Date(2024, 6, 1), new Date(2025, 1, 1)],
    ['2025 정기연봉조정 3차', new Date(2024, 7, 1), new Date(2025, 1, 6)],
    ['2025 정기연봉조정 4차', new Date(2024, 3, 1), new Date(2024, 4, 1)],
    ['2025 정기연봉조정 5차', new Date(2024, 2, 1), new Date(2024, 10, 1)],
    ['2025 정기연봉조정 6차', new Date(2024, 6, 1), new Date(2025, 1, 1)],
    ['2024 정기연봉조정 7 1차', new Date(2024, 1, 1), new Date(2024, 5, 1)],
    ['2025 정기연봉조정 8차', new Date(2024, 6, 1), new Date(2025, 1, 1)],
    ['2025 정기연봉조정 9차', new Date(2024, 7, 1), new Date(2025, 1, 6)],
    ['2025 정기연봉조정 10차', new Date(2024, 3, 1), new Date(2024, 4, 1)],
    ['2025 정기연봉조정 15차', new Date(2024, 2, 1), new Date(2024, 10, 1)],
    ['2025 정기연봉조정 16차', new Date(2024, 6, 1), new Date(2025, 1, 1)],
  ]);

  const [form, dispatch] = useReducer((state, action) => {
    switch (action) {
      case 'toggle':
        return {
          ...state,
          bool: !state.bool,
          message:
            state.initialBool === !state.bool
              ? `마지막 저장한 값으로 변경: ${!state.bool}`
              : `수정 중: ${!state.bool}`,
          isCommitted: state.initialBool === !state.bool,
        };
      case 'commit':
        return {
          ...state,
          initialBool: state.bool,
          message: `저장됨: ${state.bool}`,
          isCommitted: true,
        };
      case 'rollback':
        return {
          ...state,
          bool: state.initialBool,
          message: `롤백: ${state.initialBool}`,
          isCommitted: true,
        };
      default:
        return { ...state };
    }
  }, initialState);

  return (
    <AdjustEditLayout
      stepPaths={['테스트']}
      onCommit={() => {
        dispatch('commit');
      }}
      onRollback={() => {
        dispatch('rollback');
      }}
      isCommitted={form.isCommitted}
    >
      <CustomTimeLine
        selectedIndex={selectedIndex}
        data={data}
        minDate={new Date(2024, 1, 1)}
        maxDate={new Date(2025, 2, 1)}
        onChange={(i) => {
          setSelectedIndex(i);
          // setData((prev) => prev.filter((_, index) => index !== i));
          // 더 작은 데이터일떄 어떻게 할지 체크하고 싶다면 이걸 쓰세요 (setSelectedIndex(i);는 주석처리)
        }}
      />
      {form.message}
      <Switch
        isOn={form.bool}
        onClick={() => {
          dispatch('toggle');
        }}
      />
    </AdjustEditLayout>
  );
}
