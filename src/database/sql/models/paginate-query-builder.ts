import { Model, Page, QueryBuilder } from 'objection';

export default class PaginateQueryBuilder<
  M extends Model,
  R = M[]
> extends QueryBuilder<M, R> {
  ArrayQueryBuilderType!: PaginateQueryBuilder<M, M[]>;
  SingleQueryBuilderType!: PaginateQueryBuilder<M, M>;
  NumberQueryBuilderType!: PaginateQueryBuilder<M, number>;
  PageQueryBuilderType!: PaginateQueryBuilder<M, Page<M>>;

  async paginate(currentPage = 1, perPage = 15) {
    if (currentPage < 1) {
      currentPage = 1;
    }

    const rows = await this.page(currentPage - 1, perPage);
    const lastPage = Math.ceil(rows.total / perPage);

    return {
      total: rows.total,
      perPage,
      prevPage: currentPage > 1 ? currentPage - 1 : null,
      currentPage: Number(currentPage),
      nextPage: currentPage < lastPage ? Number(currentPage) + 1 : null,
      lastPage: lastPage,
      data: rows.results
    };
  }
}
