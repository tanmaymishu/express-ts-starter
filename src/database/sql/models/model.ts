import { Model as BaseModel, snakeCaseMappers } from 'objection';
import PaginateQueryBuilder from './paginate-query-builder';

export default class Model extends BaseModel {
  QueryBuilderType!: PaginateQueryBuilder<this>;
  static QueryBuilder = PaginateQueryBuilder;

  createdAt!: string;
  updatedAt!: string;

  $beforeInsert() {
    this.createdAt = toTimeStamp(new Date());
  }

  $beforeUpdate() {
    this.updatedAt = toTimeStamp(new Date());
  }

  static get columnNameMappers() {
    return snakeCaseMappers();
  }
}
