import { error } from "itty-router"

// MIDDLEWARE: withAuthenticatedUser - embeds user in Request or returns a 401
const validateUserToken = (request: Request) => {
  const token = request.headers.get('Authorization')
  // const user = getUser(token)

  // return error(401);
  // by returning early here, we cut off all future handlers
  // if (!user) return error(401, 'Invalid user.')
}

export default validateUserToken;
