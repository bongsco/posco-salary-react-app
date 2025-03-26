import React from 'react';
import Chart from 'react-google-charts';
import PropTypes from 'prop-types';
import '#styles/fonts.css';

export default function CustomTimeLine({
  selectedIndex = 0,
  data,
  minDate,
  maxDate,
  onChange,
}) {
  const baseColor = '#757575';
  const highlightColor = '#40afff';

  const chartData = [
    [
      { type: 'string', id: 'Room' },
      { type: 'date', id: 'Start' },
      { type: 'date', id: 'End' },
    ],
    ...data,
  ];

  const colors = data
    .slice(0)
    .map((_, i) => (i === selectedIndex ? highlightColor : baseColor));

  const generateMonthlyTicks = (start, end) => {
    const ticks = [];
    const current = new Date(start.getFullYear(), start.getMonth(), 1);
    while (current <= end) {
      ticks.push(new Date(current));
      current.setMonth(current.getMonth() + 1);
    }
    return ticks;
  };

  const ticks = generateMonthlyTicks(minDate, maxDate);

  return (
    <Chart
      chartType="Timeline"
      data={chartData}
      options={{
        timeline: {
          showRowLabels: false,
          barLabelStyle: {
            fontSize: 5,
          },
        },
        hAxis: {
          minValue: minDate,
          maxValue: maxDate,
          format: 'M월',
          ticks,
        },
        colors,
        alternatingRowStyle: false,
        tooltip: {
          trigger: 'none',
        },
        enableInteractivity: false,
      }}
      chartEvents={[
        {
          eventName: 'select',
          callback: ({ chartWrapper }) => {
            const chart = chartWrapper.getChart();
            const selection = chart.getSelection?.();
            if (selection.length > 0) {
              const index = selection[0].row;
              // const selectedLabel = data[index + 1][0]; // +1: 헤더 제외
              onChange(index);
            }
          },
        },
        {
          eventName: 'ready',
          callback: ({ chartWrapper }) => {
            const container = chartWrapper.getContainer();
            // 1. 기존 스타일 조작들 (수평선, border 제거 등)
            const paths = Array.from(container.getElementsByTagName('path'));
            const rects = Array.from(container.getElementsByTagName('rect'));
            const texts = Array.from(container.getElementsByTagName('text'));

            // 수평선 제거
            paths.forEach((path) => {
              const d = path.getAttribute('d');
              if (!d) return;

              const match = d.match(/M[\d.]+,([\d.]+)L[\d.]+,([\d.]+)/);
              if (match) {
                const y1 = parseFloat(match[1]);
                const y2 = parseFloat(match[2]);
                if (y1 === y2) {
                  path.setAttribute('stroke', 'none');
                }
              }
            });

            // 외곽 border 제거
            rects.forEach((rect) => {
              const stroke = rect.getAttribute('stroke');
              if (stroke && stroke !== 'none') {
                rect.setAttribute('stroke', 'none');
              }
            });

            // 세로선 색상 변경
            paths.forEach((path) => {
              const d = path.getAttribute('d');
              if (!d) return;

              const match = d.match(/M([\d.]+),[\d.]+L\1,[\d.]+/);
              if (match) {
                path.setAttribute('stroke', '#eeeeee');
              }
            });

            // ✅ "1월" 텍스트에만 년도 붙이기 & 폰트 바꾸기
            texts.forEach((textElOrigin, i) => {
              const textEl = textElOrigin;

              // 폰트 바꾸기
              textEl.setAttribute('font-size', '12');
              textEl.setAttribute('fill', '#000000');
              textEl.setAttribute('font-family', 'SUIT, sans-serif');
              textEl.setAttribute('font-weight', 'normal');

              // 년도 붙이기
              const rawText = textEl.textContent?.trim();
              if (!rawText) return;

              if (
                (rawText === '1월' || (i === 0 && rawText !== '12월')) &&
                ticks[i]
              ) {
                const year = String(ticks[i].getFullYear()).slice(-2);
                textEl.textContent = `${year}년 ${rawText}`;
              }
            });

            const svg = container.querySelector('svg');
            const firstG = svg?.querySelector('g');

            if (svg && firstG) {
              const gBox = firstG.getBBox(); // ✅ g의 실제 높이 계산
              const newHeight = gBox.y + gBox.height + 30;
              svg.setAttribute('height', `${newHeight}`);
              // svg 부모 div 스타일 높이도 맞춰줌
              container.parentElement.style.height = `${newHeight}px`;
            }
          },
        },
      ]}
      width="100%"
      height="100%"
    />
  );
}

CustomTimeLine.propTypes = {
  selectedIndex: PropTypes.number,
  data: PropTypes.arrayOf(
    PropTypes.objectOf(
      PropTypes.string,
      PropTypes.instanceOf(Date),
      PropTypes.instanceOf(Date),
    ),
  ).isRequired,
  minDate: PropTypes.instanceOf(Date).isRequired,
  maxDate: PropTypes.instanceOf(Date).isRequired,
  onChange: PropTypes.func.isRequired,
};

CustomTimeLine.defaultProps = {
  selectedIndex: null,
};
