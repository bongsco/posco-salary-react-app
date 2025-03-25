import AdjustEditLayout from '#layouts/AdjustEditLayout';
import PaybandApplyArea from './PaybandApplyArea';

function PaybandApplyPage() {
  return (
    <AdjustEditLayout
      prevStepPath="../preparation/high-performance"
      nextStepPath="result"
      stepPaths={['본 연봉조정', 'Payband 적용']}
    >
      <h1>상한 초과자 Payband 적용 여부 설정</h1>
      <PaybandApplyArea type="upper" />

      <h1>하한 초과자 Payband 적용 여부 설정</h1>
      <PaybandApplyArea type="lower" />
    </AdjustEditLayout>
  );
}

export default PaybandApplyPage;
