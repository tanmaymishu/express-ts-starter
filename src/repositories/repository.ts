export interface Criteria {
    [propName: string]: string,
}
export default interface Repository<T> {
    save(body: any): T | Promise<T>;

    findOne(criteria: Criteria): T | Promise<T>;

    findById(id: string | number): T | Promise<T>;
}
