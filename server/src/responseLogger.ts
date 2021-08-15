interface IResponseLogObj {
  message: string;
  verbose?: string;
}

export function responseLog(
  message: string,
  verboseMessage: string,
  parent: string
): IResponseLogObj {
  console.error(
    `Error: \x1b[32m${message}\x1b[0m \t Message: \x1b[32m ${verboseMessage} \x1b[0m\t Route: \x1b[32m ${parent} \x1b[0m`
  );
  let returnObj: IResponseLogObj = { message: message };
  if (process.env.MODE === "dev") {
    returnObj = {
      ...returnObj,
      verbose: verboseMessage,
    };
  }
  return returnObj;
}
