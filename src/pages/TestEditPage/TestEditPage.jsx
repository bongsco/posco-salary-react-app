import { useReducer } from 'react';
import Switch from '#components/Switch';
import AdjustEditLayout from '#layouts/AdjustEditLayout';

export default function TestEditPage() {
  const initialState = {
    initialBool: false,
    bool: false,
    message: ``,
    isCommited: true,
  };

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
          isCommited: state.initialBool === !state.bool,
        };
      case 'commit':
        return {
          ...state,
          initialBool: state.bool,
          message: `저장됨: ${state.bool}`,
          isCommited: true,
        };
      case 'rollback':
        return {
          ...state,
          bool: state.initialBool,
          message: `롤백: ${state.initialBool}`,
          isCommited: true,
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
      isCommited={form.isCommited}
    >
      {form.message}
      <Switch
        initialOn={form.bool}
        onClick={() => {
          dispatch('toggle');
        }}
      />
    </AdjustEditLayout>
  );
}
