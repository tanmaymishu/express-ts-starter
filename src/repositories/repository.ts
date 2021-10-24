export interface Criteria {
    field: String,
    value: String,
}
export default interface Repository<T> {
    save(body: any): T | Promise<T>;

    findOne(criteria: Criteria): T | Promise<T>;
}
