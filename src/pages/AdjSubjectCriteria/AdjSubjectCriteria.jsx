import { useState } from 'react';
import CustomDatePicker from '#components/DatePicker/CustomDatePicker';
import BreadCrumbs from '#components/BreadCrumbs';
import styles from './adj-subject-criteria.module.css';
import Button from '#components/Button';
import LabeledSwitch from '#components/LabeledSwitch';

export default function AdjSubjectCriteria() {
  const items = ['연봉조정', '등록'];
  const gradesAllLeft = {
    P직군전체: false,
    A직군전체: false,
    R직군전체: false,
  };
  const gradesAllRight = {
    O직군전체: false,
    D직군전체: false,
    G직군전체: false,
  };

  const gradesP = {
    P6: false,
    P5: false,
    P4: false,
    P3: false,
    P2: false,
    P1: false,
  };
  const gradesR = {
    R3: false,
    R2: false,
    R1: false,
  };
  const gradesA = {
    A3: false,
    A2: false,
    A1: false,
  };

  const gradesO = {
    O3: false,
    O2: false,
    O1: false,
  };

  const gradesD = {
    D3: false,
    D2: false,
    D1: false,
  };

  const gradesG = {
    G3: false,
    G2: false,
    G1: false,
  };

  const payments = {
    전체: false,
    연봉직: false,
    '비서직(정규)': false,
    '비서직(계약)': false,
    별정직: false,
    계약직: false,
    '임시직(시간)': false,
    '임시직(일)': false,
    임원: false,
  };
  const [isFormCommitted, setIsFormCommitted] = useState(false);

  const handleSwitchChange = (label, isChecked) => {
    payments[label] = isChecked;
  };

  return (
    <div className={styles.contentWrapper}>
      <BreadCrumbs items={items} />
      <div className={styles.title}>대상자 기준 설정</div>
      <div className={styles.content}>
        <div className={styles.selectDay}>
          <div className={styles.subTitle}>기준일자</div>
          <div className={styles.description}>
            다음 날짜부터의 근속일을 기반으로 연봉을 조정합니다.
          </div>
          <CustomDatePicker />
        </div>
        <div className={styles.selectDay}>
          <div className={styles.subTitle}>입사일자 기준 대상제외일자</div>
          <div className={styles.description}>
            다음 기간 내에 입사한 직원은 조정 대상에서 제외합니다.
          </div>
          <div className={styles.inputDays}>
            <CustomDatePicker />
            <div>~</div>
            <CustomDatePicker />
          </div>
        </div>
        <div className={styles.selectSwtich}>
          <div className={styles.subTitle}>급여기준</div>
          <div className={styles.buttons}>
            {Object.keys(payments).map((label) => (
              <LabeledSwitch
                key={label}
                label={label}
                isCommitted={isFormCommitted}
                onClick={handleSwitchChange}
              />
            ))}
          </div>
        </div>
        <div className={styles.selectSwtich}>
          <div className={styles.subTitle}>직급</div>
          <div className={styles.gradeWrapper}>
            <LabeledSwitch
              label="전체"
              isCommitted={isFormCommitted}
              onClick={handleSwitchChange}
            />
            <div className={styles.frame2}>
              <div className={styles.frame2}>
                <div className={styles.frame3}>
                  {Object.keys(gradesAllLeft).map((label) => (
                    <LabeledSwitch
                      key={label}
                      label={label}
                      isCommitted={isFormCommitted}
                      onClick={handleSwitchChange}
                    />
                  ))}
                </div>
                <div className={styles.frame3}>
                  <div className={styles.buttons}>
                    {Object.keys(gradesP).map((label) => (
                      <LabeledSwitch
                        key={label}
                        label={label}
                        isCommitted={isFormCommitted}
                        onClick={handleSwitchChange}
                      />
                    ))}
                  </div>
                  <div className={styles.buttons2}>
                    {Object.keys(gradesR).map((label) => (
                      <LabeledSwitch
                        key={label}
                        label={label}
                        isCommitted={isFormCommitted}
                        onClick={handleSwitchChange}
                      />
                    ))}
                  </div>
                  <div className={styles.buttons2}>
                    {Object.keys(gradesA).map((label) => (
                      <LabeledSwitch
                        key={label}
                        label={label}
                        isCommitted={isFormCommitted}
                        onClick={handleSwitchChange}
                      />
                    ))}
                  </div>
                </div>
              </div>
              <div className={styles.frame2}>
                <div className={styles.frame3}>
                  {Object.keys(gradesAllRight).map((label) => (
                    <LabeledSwitch
                      key={label}
                      label={label}
                      isCommitted={isFormCommitted}
                      onClick={handleSwitchChange}
                    />
                  ))}
                </div>

                <div className={styles.frame3}>
                  <div className={styles.buttons2}>
                    {Object.keys(gradesO).map((label) => (
                      <LabeledSwitch
                        key={label}
                        label={label}
                        isCommitted={isFormCommitted}
                        onClick={handleSwitchChange}
                      />
                    ))}
                  </div>
                  <div className={styles.buttons2}>
                    {Object.keys(gradesD).map((label) => (
                      <LabeledSwitch
                        key={label}
                        label={label}
                        isCommitted={isFormCommitted}
                        onClick={handleSwitchChange}
                      />
                    ))}
                  </div>
                  <div className={styles.buttons2}>
                    {Object.keys(gradesG).map((label) => (
                      <LabeledSwitch
                        key={label}
                        label={label}
                        isCommitted={isFormCommitted}
                        onClick={handleSwitchChange}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.separator} />
      <div className={styles.buttonWrapper}>
        <Button className={styles.button} label="이전 단계" size="small" />
        <Button
          className={styles.button}
          label="다음 단계"
          size="small"
          onClick={() => setIsFormCommitted(true)}
        />
      </div>
    </div>
  );
}
