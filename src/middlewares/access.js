/**
 * Functional Module for user authentication
 * @author Chinedu Ekene Okpala <allstackdev@gmail.com>
 */
module.exports.name = 'access'
module.exports.dependencies = ['response', 'miscHelpers']
module.exports.factory = (response, helper) => {
  return function (allowed) {
    return function (req, res, next) {
      if (req.user) {
        if (helper.contains(req.user.roles, allowed)) {
          return next()
        } else return response.unauthorized(res)
      } else return response.unauthorized(res)
    }
  }
}
