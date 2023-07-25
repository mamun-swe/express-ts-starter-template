export type PaginationQueryType = {
  page?: number | 20;
  limit?: number | 0;
};

export type PaginateType = {
  page: number;
  limit: number;
  total_items: number;
};
