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
    // Pages count is determined as siblingCount + firstPage + lastPage + currentPage + 2*DOTS
    const totalPageNumbers = siblingCount + 5;

    /*
    If the number of pages is less than the page numbers we want to show in our
    paginationComponent, we return the range [1..totalPageCount]
  */
    if (totalPageNumbers >= totalPageCount) {
      return range(1, totalPageCount);
    }

    const leftSiblingIndex = Math.max(page - siblingCount, 1);
    const rightSiblingIndex = Math.min(page + siblingCount, totalPageCount);

    /*
    We do not want to show dots if there is only one position left 
    after/before the left/right page count as that would lead to a change if our Pagination
    component size which we do not want
  */
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
