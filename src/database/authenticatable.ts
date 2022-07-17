export default interface Authenticatable {
  getId(): number | string;
  getPassword(): string;
}
