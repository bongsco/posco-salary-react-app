import { useEffect, useState } from 'react';
import useSWR, { mutate } from 'swr';
import TimeLine from '#components/TimeLine';
import { useErrorHandlerContext } from '#contexts/ErrorHandlerContext';
import useFetchWithAuth from '#hooks/useFetchWithAuth';
import AppLayout from '#layouts/AppLayout';
import AdjustTable from './AdjustTable';
import FilterSort from './FilterSort';
import NoDataTable from './NoDataTable';
import styles from './main-page.module.css';

/* Filter Option */
const filterOptions = {
  년도: { optionType: 'text', initialValue: '' },
  월: {
    optionType: 'dropdown',
    options: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    currentSelectedValue: '',
  },
  조정유형: {
    optionType: 'dropdown',
    options: ['Base Up', '승진자연봉조정', '정기연봉조정'],
    currentSelectedValue: '',
  },
  상태: {
    optionType: 'dropdown',
    options: ['완료', '진행중'],
    currentSelectedValue: '',
  },
  통합인사반영여부: {
    optionType: 'dropdown',
    options: ['반영', '미반영'],
    currentSelectedValue: '',
  },
  등록자: { optionType: 'text', initialValue: '' },
};

/* Sort Option */
const sortOptions = {
  keys: ['년도', '월', '등록일'],
  values: ['오름차순', '내림차순'],
};

const adjustmentTypeMapping = {
  'Base Up': 'BASEUP',
  승진자연봉조정: 'PROMOTED',
  정기연봉조정: 'ANNUAL',
};

const filterSortMapping = {
  년도: 'year',
  월: 'month',
  조정유형: 'adjType',
  상태: 'state',
  통합인사반영여부: 'isSubmitted',
  등록일: 'baseDate',
  등록자: 'author',
};

function MainPage() {
  /* 페이지 관련 변수들 */
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [totalPage, setTotalPage] = useState(10);
  /* Filter, Sort 조건 저장 */
  const [filters, setFilters] = useState([]);
  const [sorts, setSorts] = useState([]);
  /* Timeline에서 선택한 Index 겸 테이블에서 클릭한 조정 차수 정보 */
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [stepperInfo, setStepperInfo] = useState(null);

  /* Data 불러오기 */
  // filter 단일 파라미터로 직렬화 => 코드 수정 예정
  const serializeFilterOption = (arr) => {
    return arr
      .map(({ key, value }) => {
        const filterKey = filterSortMapping[key];
        let filterValueList = value;

        if (filterKey === 'adjType') {
          filterValueList = value.map((val) => adjustmentTypeMapping[val]);
        } else if (filterKey === 'state') {
          filterValueList = value.map((val) => val === '완료');
        } else if (filterKey === 'isSubmitted') {
          filterValueList = value.map((val) => val === '반영');
        }

        return `${filterKey}=${filterValueList}`;
      })
      .join('&');
  };

  // 정렬 조건 key값 변환
  const convertSort = (arr) => {
    if (!Array.isArray(arr) || arr.length === 0) {
      return null;
    }

    const sortArray = arr.map(({ key, order }) => {
      const sortKey = filterSortMapping[key];
      return { [sortKey]: order };
    });
    return sortArray;
  };

  const { addError } = useErrorHandlerContext();

  // 정렬 조건 변환 및 queryParams 생성
  const sortParam = convertSort(sorts);
  const queryParamsObj = {
    page: currentPage,
    size: rowsPerPage,
  };
  if (sortParam) {
    queryParamsObj.sort = JSON.stringify(sortParam);
  }
  const queryParams = new URLSearchParams(queryParamsObj).toString();

  // 실제 API 요청.
  const fetchWithAuth = useFetchWithAuth();
  const { data: salaryAdjustmentData, isLoading } = useSWR(
    `/adjust/list?${queryParams}${
      !filters || filters.length === 0
        ? ''
        : `&${serializeFilterOption(filters)}`
    }`,
    async (requestUrl) => {
      try {
        const res = await fetchWithAuth(requestUrl);
        if (!res?.ok) {
          addError(
            `Sent Request to not found API and the connection refused.`,
            'error message',
            'CONNECTION_REFUSED',
          );
          return null; // or throw new Error('Bad response')
        }

        const resJson = await res.json();

        const preprocessed = resJson.adjustItems.map(
          ({
            id,
            year,
            month,
            adjustType,
            orderNumber,
            stepName,
            detailStepName,
            isSubmitted,
            baseDate,
            startDate,
            endDate,
            author,
            url,
          }) => ({
            id,
            년도: year,
            월: month,
            조정제목: `${year}년 ${orderNumber}차 ${adjustType}`,
            조정종류: adjustType,
            차수: orderNumber,
            통합인사반영여부: isSubmitted
              ? { status: 'complete', text: '반영' }
              : { status: 'warning', text: '미반영' },
            진행단계: !stepName
              ? {
                  status: 'complete',
                  text: '완료',
                  caption: '완료',
                }
              : {
                  status: 'working',
                  text: '작업중',
                  caption: `${stepName} > ${detailStepName}`,
                },
            등록일: baseDate,
            '연봉 시작일': startDate,
            '연봉 종료일': endDate,
            등록자: author,
            url: url ?? 'annual/main/result',
          }),
        );

        resJson.adjustItems = preprocessed;

        return resJson;
      } catch (error) {
        addError(
          `데이터 로드에 실패했습니다: ${error?.message}`,
          '에러 메시지',
          'FETCH_FAILED',
        );
        return null;
      }
    },
    {
      onSuccess: (response) => {
        if (!response) return;
        const safePage = Math.max(1, Math.min(currentPage, response.totalPage));
        setCurrentPage(safePage);
        setTotalPage(response.totalPage);
      },
      keepPreviousData: true,
    },
  );

  // TableOption에 onSubmit시 동작하는 함수
  const handleFilterSortModal = (data) => {
    const { type, payload } = data;

    if (type === 'filter') {
      setFilters(payload);
    } else if (type === 'sort') {
      setSorts(payload);
    }
  };

  /* 조정 유형 등록 추가시 호출 */
  const handleRegisterModal = async (data) => {
    /* 입력 값에 대해 null 검사 */
    const isEmpty = (value) => !value || value.trim() === '';
    if (isEmpty(data.adjustmentType) || !data.startDate || !data.endDate) {
      addError(
        '등록Data에 빈 값이 존재합니다',
        '등록 데이터에 빈 값 존재',
        'REGISTER_ERROR',
      );
      return;
    }

    /* POST 요청 형식으로 Mapping */
    const formatDate = (dateInput) => {
      const dateObj = new Date(dateInput);
      const year = dateObj.getFullYear();
      const month = String(dateObj.getMonth() + 1).padStart(2, '0');
      const day = String(dateObj.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    };

    /* Request Body 생성 */
    const requestBody = {
      type: adjustmentTypeMapping[data.adjustmentType],
      startDate: formatDate(data.startDate),
      endDate: formatDate(data.endDate),
      author: '한상진',
    };

    /* 변환된 값중에 NULL이나 Undefined가 있으면 요청 취소 */
    if (
      Object.values(requestBody).some(
        (value) => value === null || value === undefined,
      )
    ) {
      addError(
        '유효하지 않은 값이 포함되어 있습니다.',
        `등록값 중 기입되지 않았거나(${requestBody.type === undefined ? '조정 유형 오류, ' : ''}${requestBody.startDate === null ? '시작일 오류, ' : ''}${requestBody.endDate === null ? '종료일 오류' : ''}) 잘못된 값이 있는지 확인해주세요.`,
        'INVALID_REQUEST_BODY_DATA',
      );
      return;
    }

    try {
      const res = await fetchWithAuth('/adjust', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      if (!res.ok) {
        addError(
          `등록 요청 실패 (Status: ${res.status})`,
          '서버 처리 중 오류가 발생했습니다.',
          'REGISTER_SERVER_ERROR',
        );
        return;
      }

      await mutate(`/adjust/list?${queryParams}`);
    } catch (error) {
      addError('등록 중 예외 발생', error.message, 'REGISTER_NETWORK_ERROR');
    }
  };

  useEffect(() => {
    setSelectedIndex(null);
  }, [salaryAdjustmentData, currentPage, rowsPerPage, filters, sorts]);

  /* 테이블이나 Timeline에서 데이터를 클릭하면 setSelectedIndex값 변경 & Stepper 정보 가져오기 */
  const handleSelectedIndex = async (adjustId, index) => {
    setSelectedIndex(selectedIndex === index ? null : index);

    const stepperResponse = await fetchWithAuth(`/stepper/${adjustId}`);
    if (!stepperResponse || !stepperResponse.ok) {
      // 응답이 없거나 응답 상태가 'ok'가 아닐 경우 에러 처리
      addError(
        `Stepper 정보를 가져오는데, 실패했습니다. stepperResponse.status`,
        '서버 처리 중 오류가 발생했습니다.',
        'REGISTER_SERVER_ERROR',
      );
      return;
    }
    const stepperResJson = await stepperResponse.json();

    /* Step Table의 Url 컬럼에는 adjustId가 반영되지 않았으므로, url앞에 adjustId 추가 */
    const modifiedStepsData = Object.fromEntries(
      Object.entries(stepperResJson.steps).map(([categoryKey, stepsArray]) => {
        const currentSteps = Array.isArray(stepsArray) ? stepsArray : [];

        const modifiedStepsArray = currentSteps.map((step) => {
          if (step && typeof step.url !== 'undefined') {
            return {
              ...step,
              url: `adjust/edit/${adjustId}/${step.url}`,
            };
          }
          return step;
        });

        return [categoryKey, modifiedStepsArray];
      }),
    );

    setStepperInfo(modifiedStepsData);
  };

  const handleDeleteClick = async (adjustId) => {
    try {
      const res = await fetchWithAuth(`/adjust/${adjustId}`, {
        method: 'DELETE',
      });

      if (!res.ok) {
        addError(
          `항목 삭제 중 오류 발생 (ID: ${adjustId}, Status: ${res.status})`,
          '서버 응답 없음',
          'DELETE_ERROR',
        );
        return;
      }

      await mutate(`/adjust/list?${queryParams}`);
    } catch (error) {
      addError(
        `항목 삭제 중 예외 발생 (ID: ${adjustId})`,
        error.message || '알 수 없는 네트워크 오류',
        'NETWORK_ERROR',
      );
    }
  };
  /* TimeLine과 관련된 함수들 */
  /* TableData에 속한 데이터들의 start_date, end_date를 Timeline 형식에 맞게 변환하는 함수 */
  function transformTableDataForTimeLine(td) {
    return td?.map((item) => {
      const [startYear, startMonth, startDay] = item['연봉 시작일']
        .split('-')
        .map(Number);
      const [endYear, endMonth, endDay] = item['연봉 종료일']
        .split('-')
        .map(Number);

      return [
        `${item['년도']} ${item['차수']} ${item['조정종류']}`,
        new Date(startYear, startMonth - 1, startDay),
        new Date(endYear, endMonth - 1, endDay),
      ];
    });
  }

  const transformedData = transformTableDataForTimeLine(
    salaryAdjustmentData?.adjustItems,
  );

  /* 페이지 렌더링 관련 함수들 */
  /* 데이터가 없으면 NoDataTable 호출 */
  if (
    (!salaryAdjustmentData?.adjustItems ||
      salaryAdjustmentData?.adjustItems.length === 0) &&
    !isLoading
  ) {
    /* 데이터가 아예 없는 경우 */
    if (!filters || filters.length === 0) {
      return (
        <AppLayout title="연봉 조정 목록" breadCrumbs={['조정', '조회']}>
          <div className={styles['salary-adjustment-area']}>
            <NoDataTable type="complete" onSubmit={handleRegisterModal} />
          </div>
        </AppLayout>
      );
    }
    /* 데이터는 있는데, 필터나 로직으로 인해서 Table에 보여줄 데이터가 없는 경우 */
    return (
      <AppLayout title="연봉 조정 목록" breadCrumbs={['조정', '조회']}>
        <div className={styles['salary-adjustment-area']}>
          <div className={styles['salary-adjustment-list']}>
            <FilterSort
              filterOptions={filterOptions}
              sortOptions={sortOptions}
              filters={filters}
              sortList={sorts}
              onTableOptionSubmit={handleFilterSortModal}
              onRegisterSubmit={handleRegisterModal}
            />
            <NoDataTable type="logic" />
          </div>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout title="연봉 조정 목록" breadCrumbs={['조정', '조회']}>
      <div className={styles['salary-adjustment-area']}>
        {!isLoading && (
          <TimeLine
            selectedIndex={selectedIndex}
            data={transformedData}
            onChange={(idx) => {
              handleSelectedIndex(
                salaryAdjustmentData?.adjustItems?.[idx]?.id,
                idx,
              );
            }}
          />
        )}
        <div className={styles['salary-adjustment-list']}>
          <FilterSort
            filterOptions={filterOptions}
            sortOptions={sortOptions}
            filters={filters}
            sortList={sorts}
            onTableOptionSubmit={handleFilterSortModal}
            onRegisterSubmit={handleRegisterModal}
          />
          <AdjustTable
            data={salaryAdjustmentData?.adjustItems || []}
            currentPage={currentPage}
            rowsPerPage={rowsPerPage}
            selectedIndex={selectedIndex}
            setRowsPerPage={setRowsPerPage}
            setCurrentPage={(page) => {
              if (page >= 1 && page <= totalPage) {
                setCurrentPage(page);
              }
            }}
            handleRowClick={handleSelectedIndex}
            handleDeleteClick={handleDeleteClick}
            stepperInfo={stepperInfo}
            totalPage={totalPage}
          />
        </div>
      </div>
    </AppLayout>
  );
}

export default MainPage;
