import styles from "./styles.module.css";

const range = (start: number, end: number) => {
  let length = end - start + 1;
  return Array.from({ length }, (_, idx) => idx + start);
};
const DOTS = "...";

const Pagination = ({
  totalPages,
  handleClick,
  page,
}: {
  totalPages: number;
  handleClick: any;
  page: number;
}) => {
  const calculatePages = (
    page: number,
    totalPageCount: number,
    siblingCount = 3
  ) => {
    const totalPageNumbers = siblingCount + 5;

    if (totalPageNumbers >= totalPageCount) {
      return range(1, totalPageCount);
    }

    const leftSiblingIndex = Math.max(page - siblingCount, 1);
    const rightSiblingIndex = Math.min(page + siblingCount, totalPageCount);

    const shouldShowLeftDots = leftSiblingIndex > 2;
    const shouldShowRightDots = rightSiblingIndex < totalPageCount - 2;

    const firstPageIndex = 1;
    const lastPageIndex = totalPageCount;

    if (!shouldShowLeftDots && shouldShowRightDots) {
      let leftItemCount = 3 + 2 * siblingCount;
      let leftRange = range(1, leftItemCount);

      return [...leftRange, DOTS, totalPageCount];
    }

    if (shouldShowLeftDots && !shouldShowRightDots) {
      let rightItemCount = 3 + 2 * siblingCount;
      let rightRange = range(
        totalPageCount - rightItemCount + 1,
        totalPageCount
      );
      return [firstPageIndex, DOTS, ...rightRange];
    }

    if (shouldShowLeftDots && shouldShowRightDots) {
      let middleRange = range(leftSiblingIndex, rightSiblingIndex);
      return [firstPageIndex, DOTS, ...middleRange, DOTS, lastPageIndex];
    }
  };

  const pages = calculatePages(page, totalPages) || [];
  return (
    <div className={styles.container}>
      {pages.map((num, index) =>
        num !== "..." ? (
          <button
            key={num}
            className={num === page ? styles.active : ""}
            onClick={() => handleClick(num)}
          >
            {num}
          </button>
        ) : (
          <span className={styles.dots}>&#8230;</span>
        )
      )}
    </div>
  );
};

export default Pagination;
