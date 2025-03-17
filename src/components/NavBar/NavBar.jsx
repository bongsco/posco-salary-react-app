import styles from './navbar.module.css';

export default function NavBar() {
  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>
        {/* ✅ 아이콘 */}
        <svg
          className={styles.icon}
          width="29"
          height="20"
          viewBox="0 0 29 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M1 1.5H28M1 10H28M1 18.5H28"
            stroke="#404040"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>

        {/* ✅ 로고 */}
        <div className={styles.logo}>
          <div className={styles.logoWrapper}>
            <svg
              className={styles.logoImage}
              width="83"
              height="34"
              viewBox="0 0 83 34"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                y="5.92529"
                width="83"
                height="27.1495"
                fill="url(#pattern0_130_453)"
              />
              <defs>
                <pattern
                  id="pattern0_130_453"
                  patternContentUnits="objectBoundingBox"
                  width="1"
                  height="1"
                >
                  <use
                    xlinkHref="#image0_130_453"
                    transform="matrix(0.00282486 0 0 0.00857143 -0.135593 -0.322857)"
                  />
                </pattern>
                <image
                  id="image0_130_453"
                  width="450"
                  height="192"
                  preserveAspectRatio="none"
                  xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAcIAAADACAYAAACXp2P6AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6QjEzMjJGQjQ3RDQxMTFFRTk4OEM5NjYzM0FBMzFBMTMiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6QjEzMjJGQjU3RDQxMTFFRTk4OEM5NjYzM0FBMzFBMTMiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpCMTMyMkZCMjdENDExMUVFOTg4Qzk2NjMzQUEzMUExMyIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpCMTMyMkZCMzdENDExMUVFOTg4Qzk2NjMzQUEzMUExMyIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PiCiD74AACCUSURBVHja7J0H2FxF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"
                />
              </defs>
            </svg>
          </div>
          <span className={styles.title}>연봉관리시스템</span>
        </div>

        {/* ✅ 네비게이션 링크 */}
        <div className={styles.navLinks}>
          <div className={styles.link}>개요</div>
          <div className={styles.link}>지원</div>
        </div>

        {/* ✅ 버튼 */}
        <div className={styles.ctaContainer}>
          <button type="button" className={styles.ctaButton}>
            로그인
          </button>
          <button type="button" className={styles.ctaButton}>
            계정 등록
          </button>
        </div>
      </div>
    </nav>
  );
}
