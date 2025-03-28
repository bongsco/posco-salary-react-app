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
    ['2024 BASE_UP 1', new Date(2024, 0, 1), new Date(2024, 11, 31)],
    [
      '2023 PROMOTED_SALARY_ADJUSTMENT 2',
      new Date(2023, 8, 1),
      new Date(2024, 2, 29),
    ],
    [
      '2023 PROMOTED_SALARY_ADJUSTMENT 1',
      new Date(2023, 3, 1),
      new Date(2023, 7, 31),
    ],
    [
      '2023 ANNUAL_SALARY_ADJUSTMENT',
      new Date(2023, 0, 1),
      new Date(2023, 11, 31),
    ],
    ['2022 BASE_UP 1', new Date(2022, 0, 1), new Date(2022, 11, 31)],
    ['2022 MID_YEAR_ADJUSTMENT', new Date(2022, 5, 1), new Date(2022, 7, 31)],
    [
      '2022 PROMOTED_SALARY_ADJUSTMENT',
      new Date(2022, 2, 1),
      new Date(2022, 4, 30),
    ],
    ['2021 BASE_UP 1', new Date(2021, 0, 1), new Date(2021, 11, 31)],
    ['2021 PROMOTION_EVENT', new Date(2021, 6, 1), new Date(2021, 9, 30)],
    ['2021 SPECIAL_ADJUSTMENT', new Date(2021, 3, 1), new Date(2021, 5, 30)],
    ['2020 BASE_UP 1', new Date(2020, 0, 1), new Date(2020, 11, 31)],
    ['2020 COVID_BONUS', new Date(2020, 5, 1), new Date(2020, 6, 31)],
    ['2019 BASE_UP 1', new Date(2019, 0, 1), new Date(2019, 11, 31)],
    [
      '2019 PERFORMANCE_ADJUSTMENT',
      new Date(2019, 3, 1),
      new Date(2019, 5, 30),
    ],
    ['2018 BASE_UP 1', new Date(2018, 0, 1), new Date(2018, 11, 31)],
    ['2018 EARLY_PROMOTION_EVENT', new Date(2018, 2, 1), new Date(2018, 4, 31)],
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
