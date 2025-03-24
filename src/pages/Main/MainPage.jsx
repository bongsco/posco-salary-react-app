import SalaryAdjustmentArea from './SalaryAdjustmentArea';
import AppLayout from '#layouts/AppLayout';

function MainPage() {
  return (
    <AppLayout title="연봉 조정 목록" breadCrumbs={['조정', '조회']}>
      <SalaryAdjustmentArea />
    </AppLayout>
  );
}

export default MainPage;
