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
  const [selectedIndex] = useState(null);
  const [data, setData] = useState([
    ['2025 정기연봉조정 1차', new Date(2024, 3, 12), new Date(2024, 6, 5)],
    ['2025 정기연봉조정 2차', new Date(2024, 7, 8), new Date(2025, 1, 14)],
    ['2025 정기연봉조정 3차', new Date(2024, 1, 25), new Date(2024, 9, 2)],
    ['2025 정기연봉조정 4차', new Date(2024, 0, 10), new Date(2024, 3, 19)],
    ['2025 정기연봉조정 5차', new Date(2024, 5, 17), new Date(2025, 0, 25)],
    ['2025 정기연봉조정 6차', new Date(2024, 8, 9), new Date(2025, 2, 3)],
    ['2025 정기연봉조정 7차', new Date(2024, 2, 21), new Date(2024, 7, 12)],
    ['2025 정기연봉조정 8차', new Date(2024, 10, 5), new Date(2025, 1, 18)],
    ['2025 정기연봉조정 9차', new Date(2024, 1, 14), new Date(2024, 4, 10)],
    ['2025 정기연봉조정 10차', new Date(2024, 6, 6), new Date(2024, 11, 20)],
    ['2025 정기연봉조정 11차', new Date(2024, 4, 2), new Date(2024, 10, 9)],
    ['2025 정기연봉조정 12차', new Date(2024, 9, 28), new Date(2025, 3, 6)],
    ['2025 정기연봉조정 13차', new Date(2024, 5, 4), new Date(2025, 0, 29)],
    ['2025 정기연봉조정 14차', new Date(2024, 3, 11), new Date(2024, 8, 25)],
    ['2025 정기연봉조정 15차', new Date(2024, 7, 19), new Date(2025, 1, 3)],
    ['2025 정기연봉조정 16차', new Date(2024, 0, 7), new Date(2024, 5, 13)],
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
          // setSelectedIndex(i);
          setData((prev) => prev.filter((_, index) => index !== i));
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
