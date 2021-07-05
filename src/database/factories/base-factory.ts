export default class BaseFactory<T> {
  constructor(private model: any) {}
  definition() {}

  make(overrides?: T): T {
    return { ...(this.definition() as any), ...overrides };
  }

  async create(overrides?: T): Promise<T> {
    return (await this.model
      .query()
      .insert({ ...(this.definition() as any), ...overrides })) as any;
  }
}
