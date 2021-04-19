/**
 * Functional Module for user authentication
 * @author Chinedu Ekene Okpala <allstackdev@gmail.com>
 */
module.exports.name = 'authenticate'
module.exports.dependencies = [
  'jsonwebtoken',
  'redisCluster',
  'envs',
  'response',
  'logger',
  'miscHelper'
]
module.exports.factory = (jwt, getRedisClusterClient, getEnvs, response, logger, helper) => {
  // Connect to Redis
  const client = getRedisClusterClient()

  // Get application configuration based on environment
  const envs = getEnvs(process.env.NODE_ENV)

  /**
   * Reads authentication token from header and checks
   * if any user has been authenticated with such token
   * @param {object} req
   * @param {object} res
   * @param {Function} next
   */
  const auth = async (req, res, next) => {
    try {
      const authHeader = req.headers.authorization
      if (authHeader) {
        const token = authHeader.split(' ')[1]
        const isVerified = await verifyToken(token)
        if (isVerified) {
          client.get(String(token), (err, user) => {
            if (err || user === null) return response.forbidden(res)
            req.user = JSON.parse(user)
            req.token = token
            next()
          })
        } else return response.unauthorized(res)
      } else return response.unauthorized(res)
    } catch (error) {
      return response.serverError(res)
    }
  }

  /**
   * Removes a user from redis cache
   * @param {String} authToken
   */
  const removeCachedUser = authToken => {
    return new Promise((resolve, reject) => {
      client.del(authToken, (err, reply) => {
        if (err) {
          return reject(err)
        }
        return resolve(reply)
      })
    })
  }

  /**
   * Generates an token based on user _id
   * @param {object} payload, the user id object of this token
   */
  const generateToken = (_id, time) => {
    return jwt
      .sign({ _id: _id }, envs.secret, {
        expiresIn: time || envs.expiresIn
      })
      .toString()
  }

  /**
   * Verifies a jwt token based
   * @param {string} token, the owner of this authentication token
   */
  const verifyToken = async token => {
    try {
      return await jwt.verify(token, envs.secret)
    } catch (error) {
      if (error.name === 'TokenExpiredError') {
        const decoded = await jwt.verify(token, envs.secret, { ignoreExpiration: true })
        // Remove token from cache
        if (decoded._id) {
          removeCachedUser(token)
        }
      }
      return 0 // invalid token
    }
  }

  return { auth, removeCachedUser, generateToken, verifyToken }
}
