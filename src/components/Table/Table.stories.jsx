import Table from './Table';

export default {
  title: 'UI/Table',
  component: Table,
  tags: ['autodocs'],
};

function Template() {
  const arr = [
    [
      { id: 1, type: 'checkbox', content: '홍길동', width: 5 },
      { id: 2, type: 'text', content: '김철수' },
      { id: 3, type: 'input', content: 'fgdhh' },
      { id: 4, type: 'button', content: '오브젝트1' },
      { id: 5, type: 'switch', content: '이영희' },
      { id: 6, type: 'bar', content: '오브젝트2' },
    ],
    [
      { id: 1, type: 'checkbox', content: '홍길동', width: 5 },
      { id: 2, type: 'text', content: '김철수' },
      { id: 3, type: 'input', content: 'dghf' },
      { id: 4, type: 'button', content: '오브젝트1' },
      { id: 5, type: 'switch', content: '이영희' },
      { id: 6, type: 'bar', content: '오브젝트2' },
    ],
    [
      { id: 1, type: 'checkbox', content: '홍길동', width: 5 },
      { id: 2, type: 'text', content: '김철수' },
      { id: 3, type: 'input', content: 'gh' },
      { id: 4, type: 'button', content: '오브젝트1' },
      { id: 5, type: 'switch', content: '이영희' },
      { id: 6, type: 'bar', content: '오브젝트2' },
    ],
    [
      { id: 1, type: 'checkbox', content: '홍길동', width: 5 },
      { id: 2, type: 'text', content: '김철수' },
      { id: 3, type: 'input', content: 'dgfh' },
      { id: 4, type: 'button', content: '오브젝트1' },
      { id: 5, type: 'switch', content: '이영희' },
      { id: 6, type: 'bar', content: '오브젝트2' },
    ],
  ];
  return <Table array={arr} />;
}

export const Default = Template.bind({});
