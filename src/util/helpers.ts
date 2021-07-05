import format from 'date-fns/format';
export {};
type envFunc = <T>(...args: any) => T;

declare global {
  let toTimeStamp: (date: Date) => string;
  let env: envFunc;
  namespace NodeJS {
    interface Global {
      toTimeStamp: (date: Date) => any;
      env: envFunc;
    }
  }
}

global.toTimeStamp = (date: Date) => {
  return format(date, 'yyyy-MM-dd HH:mm:ss');
};

global.env = <T>(...args: any): T => {
  if (args[1] != undefined) {
    process.env[args[0]] = args[1];
  }

  return process.env[args[0]] as any;
};
