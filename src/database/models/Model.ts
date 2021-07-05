import { Model as BaseModel, snakeCaseMappers } from 'objection';

export default class Model extends BaseModel {
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
