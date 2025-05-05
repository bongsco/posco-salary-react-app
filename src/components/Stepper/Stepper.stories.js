import Stepper from './Stepper';

export default {
  title: 'Business/Stepper',
  component: Stepper,
  tags: ['autodocs'],
};

export const Annual = {
  args: {
    stepperData: {
      MAIN: [
        {
          id: 6,
          text: 'Payband 적용',
          state: 'UNDONE',
          date: '2025-03-07 10:15',
          url: 'annual/main/payband',
        },
        {
          id: 7,
          text: '조정 결과 미리보기',
          state: 'UNDONE',
          date: '2025-03-07 10:15',
          url: 'annual/main/result',
        },
      ],
      PREPARATION: [
        {
          id: 4,
          text: '대상자 편성',
          state: 'DONE',
          date: '2025-03-07 10:15',
          url: 'annual/preparation/subject',
        },
        {
          id: 5,
          text: '고성과조직 가산 대상 여부 설정',
          state: 'UNDONE',
          url: 'annual/preparation/high-performance',
        },
      ],
      CRITERIA: [
        {
          id: 1,
          text: '대상자 기준 설정',
          state: 'DONE',
          url: 'annual/criteria/subject',
          date: '2025-03-07 10:15',
        },
        {
          id: 2,
          text: '보상지급률 설정',
          state: 'DONE',
          url: 'annual/criteria/payment-rate',
          date: '2025-03-07 10:15',
        },
        {
          id: 3,
          text: 'Payband 설정',
          state: 'DONE',
          url: 'annual/criteria/payband',
          date: '2025-03-07 10:15',
        },
      ],
    },
  },
};
