import HighOrganizationArea from './HighOrganizationArea';
import AdjustEditLayout from '#layouts/AdjustEditLayout';

function HighOrganizationPage() {
  return (
    <AdjustEditLayout
      prevStepPath="target"
      nextStepPath="../main/payband"
      stepPaths={['사전 작업', '고성과조직 가산 대상 여부 설정']}
    >
      <h2>대상자 목록</h2>
      <p>
        인사 평가 등급이 부여된 인원의 보상 지급률 적용 여부를 최종 결정합니다.
        <br />각 인원의 최종 평가 차등 연봉 인상률 및 경영 성과금 지급률을
        확인할 수 있습니다.
      </p>
      <HighOrganizationArea />
    </AdjustEditLayout>
  );
}

export default HighOrganizationPage;
