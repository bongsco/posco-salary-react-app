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
    items: ['연봉조정등록', '기준설정', 'Payband설정'],
  },
};
