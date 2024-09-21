import { error } from "itty-router"
import { Env } from "..";

const validateApiKey = (request: Request, env?: Env) => {
  const apiKey: string | null = request.headers.get('x-api-key');

  // Validate API Key
  if (apiKey !== env?.API_KEY) {
    return error(401);
  }
}

export default validateApiKey;
