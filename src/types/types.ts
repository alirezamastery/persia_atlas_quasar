export type QTableRequest = {
  /**
   * Pagination object
   */
  pagination: {
    /**
     * Column name (from column definition)
     */
    sortBy: string;
    /**
     * Is sorting in descending order?
     */
    descending: boolean;
    /**
     * Page number (1-based)
     */
    page: number;
    /**
     * How many rows per page? 0 means Infinite
     */
    rowsPerPage: number;
  };
  /**
   * Filter method (the 'filter-method' prop)
   * @param rows Array of rows
   * @param terms Terms to filter with (is essentially the 'filter' prop value)
   * @param cols Optional column definitions
   * @param getCellValue Optional function to get a cell value
   * @returns Filtered rows
   */
  filter: (
    rows: any[],
    terms: string | any,
    cols?: any[],
    getCellValue?: (col: any, row: any) => any
  ) => any[];
  /**
   * Function to get a cell value
   * @param col Column name from column definitions
   * @param row The row object
   * @returns Parsed/Processed cell value
   */
  getCellValue: (col: any, row: any) => any;
}