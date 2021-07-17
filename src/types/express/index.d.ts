declare namespace Express {
  export interface Request {
    wantsJson: () => boolean;
  }
}
