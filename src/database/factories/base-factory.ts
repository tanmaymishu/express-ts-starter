export default class BaseFactory<T> {
  constructor(private model: any, protected amount = 0) {}
  definition() {}

  makeOne(overrides?: T): T {
    return { ...(this.definition() as any), ...overrides };
  }

  make(overrides?: T): T[] {
    const collection: T[] = [];
    for (let i = 0; i < this.amount; i++) {
      collection.push({ ...(this.definition() as any), ...overrides });
    }
    return collection;
  }

  async createOne(overrides?: T): Promise<T> {
    return (await this.model
      .query()
      .insert({ ...(this.definition() as any), ...overrides })) as any;
  }

  async create(overrides?: T[]): Promise<T[]> {
    const collection: T[] = [];
    for (let i = 0; i < this.amount; i++) {
      collection.push(
        (await this.model
          .query()
          .insert({ ...(this.definition() as any), ...overrides })) as any
      );
    }
    return collection;
  }
}
