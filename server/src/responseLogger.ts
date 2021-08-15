import Error from "./models/error";

export interface IResponseLogObj {
  message: string;
  verbose?: string;
  path?: string;
  date?: Date;
}

export async function responseLog(
  message: string,
  verboseMessage: string,
  parent: string
): Promise<IResponseLogObj> {
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

  if(process.env.SAVE_LOGS === "true") {
    await Error.create({
      message: message,
      verbose: verboseMessage,
      path: parent,
      date: new Date()
    })
  }
  return returnObj;
}
