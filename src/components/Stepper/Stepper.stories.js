import Stepper from './Stepper';

export default {
  title: 'Business/Stepper',
  component: Stepper,
};

export const Primary = {
  args: {
    steps: [
      {
        id: 'step1',
        title: '기준 설정',
        isComplete: true,
        items: [
          {
            id: 'item1-1',
            text: '대상자 기준 설정',
            state: 'complete',
            date: '2023-03-03 00:00:00',
          },
          {
            id: 'item1-2',
            text: '보상지급률 설정',
            state: 'working',
            date: '2023-03-03 00:00:00',
          },
          {
            id: 'item1-3',
            text: 'Payband 설정',
            state: 'undone',
            date: '2023-03-03 00:00:00',
          },
        ],
      },
      {
        id: 'step2',
        title: '사전 작업',
        isComplete: false,
        items: [
          {
            id: 'item2-1',
            text: '대상자 편성',
            state: 'undone',
            date: '2023-03-03 00:00:00',
          },
          {
            id: 'item2-2',
            text: '고성과조직 가산 대상 여부 설정',
            state: 'undone',
            date: '2023-03-03 00:00:00',
          },
        ],
      },
      {
        id: 'step3',
        title: '본 연봉 조정',
        isComplete: false,
        items: [
          {
            id: 'item3-1',
            text: 'Payband 적용',
            state: 'undone',
            date: '2023-03-03 00:00:00',
          },
          {
            id: 'item3-2',
            text: '조정 결과 미리보기',
            state: 'undone',
            date: '2023-03-03 00:00:00',
          },
        ],
      },
    ],
  },
};

export const Secondary = {
  args: {
    steps: [
      {
        id: 'step1',
        title: '기준 설정',
        isComplete: true,
        items: [
          {
            id: 'item1-1',
            text: '대상자 기준 설정',
            state: 'complete',
            date: '2023-03-03 00:00:00',
          },
          {
            id: 'item1-2',
            text: 'Base Up 설정',
            state: 'working',
            date: '2023-03-03 00:00:00',
          },
        ],
      },
      {
        id: 'step2',
        title: '본 연봉 조정',
        isComplete: false,
        items: [
          {
            id: 'item2-1',
            text: '조정 결과 확인',
            state: 'undone',
            date: '2023-03-03 00:00:00',
          },
        ],
      },
    ],
  },
};

export const Third = {
  args: {
    steps: [
      {
        id: 'step1',
        title: '기준 설정',
        isComplete: true,
        items: [
          {
            id: 'item1-1',
            text: '승진 가산금 설정',
            state: 'working',
            date: '2023-03-03 00:00:00',
          },
        ],
      },
      {
        id: 'step2',
        title: '사전 작업',
        isComplete: false,
        items: [
          {
            id: 'item2-1',
            text: '대상자 편성',
            state: 'undone',
            date: '2023-03-03 00:00:00',
          },
        ],
      },
      {
        id: 'step3',
        title: '본 연봉 조정',
        isComplete: false,
        items: [
          {
            id: 'item3-1',
            text: '조정 결과 확인',
            state: 'undone',
            date: '2023-03-03 00:00:00',
          },
        ],
      },
    ],
  },
};
