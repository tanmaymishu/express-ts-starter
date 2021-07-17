import format from 'date-fns/format';
export {};
type envFunc = <T>(...args: any) => T;

declare global {
  type NumericQueryString = number | undefined;

  let toTimeStamp: (date: Date) => string;
  let env: envFunc;
  let JSON_REQ: string;
  namespace NodeJS {
    interface Global {
      toTimeStamp: (date: Date) => any;
      env: envFunc;
      JSON_REQ: string;
    }
  }
}

global.JSON_REQ = 'application/json';

global.toTimeStamp = (date: Date) => {
  return format(date, 'yyyy-MM-dd HH:mm:ss');
};

global.env = <T>(...args: any): T => {
  if (args[1] != undefined) {
    process.env[args[0]] = args[1];
  }

  return process.env[args[0]] as any;
};
