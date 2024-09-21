import { Env } from "..";
import DB from "../lib/db";

const dbConnect = (_request: Request, env?: Env) => {
  DB.connect(env!);
  return;
}

export default dbConnect;
