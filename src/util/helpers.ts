import format from "date-fns/format";
export {};

declare global {
  let toTimeStamp: (date: Date) => string;
  namespace NodeJS {
    interface Global {
      toTimeStamp: (date: Date) => string;
    }
  }
}

global.toTimeStamp = (date: Date) => {
  return format(date, "yyyy-MM-dd HH:mm:ss");
};
