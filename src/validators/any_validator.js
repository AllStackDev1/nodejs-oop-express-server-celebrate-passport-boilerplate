/**
 *Task Validations. Defining order validations schema using celebrate
 * @author Chinedu Ekene Okpala <allstackdev@gmail.com>
 */
module.exports.name = 'AnyValidations'
module.exports.dependencies = ['celebrate']
module.exports.factory = _celebrate => {
  'use strict'

  const { celebrate, Joi } = _celebrate

  const post = celebrate({
    body: Joi.object()
      .keys({
        name: Joi.string().required(),
      })
      .required()
  })

  const patch = celebrate({
    body: Joi.object()
      .keys({
        name: Joi.string(),
      })
      .required()
  })

  const querySearch = celebrate({
    query: Joi.object().keys({
      name: Joi.string()
    })
  })

  return {
    post,
    patch,
    querySearch
  }
}
