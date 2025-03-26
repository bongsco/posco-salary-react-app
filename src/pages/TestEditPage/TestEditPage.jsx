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
        data={[
          ['2024 정기연봉조정 1차', new Date(2024, 1, 1), new Date(2024, 5, 1)],
          ['2025 정기연봉조정 2차', new Date(2024, 6, 1), new Date(2025, 1, 1)],
          ['2025 정기연봉조정 3차', new Date(2024, 7, 1), new Date(2025, 1, 6)],
          ['2025 정기연봉조정 4차', new Date(2024, 3, 1), new Date(2024, 4, 1)],
          [
            '2025 정기연봉조정 5차',
            new Date(2024, 2, 1),
            new Date(2024, 10, 1),
          ],
          ['2025 정기연봉조정 6차', new Date(2024, 6, 1), new Date(2025, 1, 1)],
        ]}
        minDate={new Date(2024, 1, 1)}
        maxDate={new Date(2025, 2, 1)}
        onChange={(i) => {
          setSelectedIndex(i);
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
