import BreadCrumbs from './BreadCrumbs';

export default {
  title: 'Layout/BreadCrumbs',
  component: BreadCrumbs,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    items: { control: 'object' },
  },
};

export const Default = {
  args: {
    items: [
      { label: '연봉조정등록' },
      { label: '기준설정' },
      { label: 'Payband설정' },
    ],
  },
};
