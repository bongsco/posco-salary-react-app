import { useState } from 'react';
import PropTypes from 'prop-types';
import CustomTimeLine from './CustonTimeLine';

export default {
  title: 'UI/CustomTimeLine',
  component: CustomTimeLine,
  tags: ['autodocs'],
  argTypes: {
    minDate: { control: 'date' },
    maxDate: { control: 'date' },
  },
};

function Template({ minDate, maxDate }) {
  const normalizedMinDate =
    minDate instanceof Date ? minDate : new Date(minDate);
  const normalizedMaxDate =
    maxDate instanceof Date ? maxDate : new Date(maxDate);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const data = [
    ['2023 BASE_UP 1', new Date(2023, 0, 1), new Date(2023, 11, 31)],
    [
      '2022 PROMOTED_SALARY_ADJUSTMENT 2',
      new Date(2022, 9, 1),
      new Date(2023, 3, 31),
    ],
    [
      '2022 PROMOTED_SALARY_ADJUSTMENT 1',
      new Date(2022, 4, 1),
      new Date(2022, 9, 31),
    ],
    [
      '2022 ANNUAL_SALARY_ADJUSTMENT 2',
      new Date(2022, 2, 1),
      new Date(2022, 11, 31),
    ],
    [
      '2022 ANNUAL_SALARY_ADJUSTMENT 1',
      new Date(2022, 0, 1),
      new Date(2022, 11, 31),
    ],
    [
      '2021 PROMOTED_SALARY_ADJUSTMENT 2',
      new Date(2021, 9, 1),
      new Date(2022, 3, 31),
    ],
    [
      '2021 PROMOTED_SALARY_ADJUSTMENT 1',
      new Date(2021, 4, 1),
      new Date(2021, 9, 31),
    ],
    [
      '2021 ANNUAL_SALARY_ADJUSTMENT 2',
      new Date(2021, 2, 1),
      new Date(2021, 11, 31),
    ],
    [
      '2021 ANNUAL_SALARY_ADJUSTMENT 1',
      new Date(2021, 0, 1),
      new Date(2021, 11, 31),
    ],
    [
      '2020 ANNUAL_SALARY_ADJUSTMENT 1',
      new Date(2020, 0, 1),
      new Date(2020, 11, 31),
    ],
    [
      '2019 ANNUAL_SALARY_ADJUSTMENT 1',
      new Date(2019, 0, 1),
      new Date(2019, 11, 31),
    ],
  ];
  return (
    <CustomTimeLine
      selectedIndex={selectedIndex}
      data={data}
      minDate={normalizedMinDate}
      maxDate={normalizedMaxDate}
      onChange={(i) => {
        setSelectedIndex(i);
      }}
    />
  );
}

Template.propTypes = {
  minDate: PropTypes.instanceOf(Date).isRequired,
  maxDate: PropTypes.instanceOf(Date).isRequired,
};

export const Default = Template.bind();
Default.args = {
  minDate: new Date(2019, 0, 1),
  maxDate: new Date(2023, 11, 31),
};
