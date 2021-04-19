/* eslint-disable no-useless-constructor */
/* eslint-disable space-before-function-paren */
'use strict'
const BaseRepository = require('./base')

/**
 * @author Chinedu Ekene Okpala <allstackdev@gmail.com>
 * @description This class extends the BaseRepository class.
 * This is a dependency for the OrderController class.
 */
module.exports.name = 'AnyRepository'
module.exports.dependencies = ['AnyModel', 'logger']
module.exports.factory = class extends BaseRepository {
  /**
   * @param { object } model mongodb model which provides the db drive methods.
   * @param {{ debug: Function }} logger - Logger object
   */
  constructor(model, logger) {
    super(model, logger)
  }
}
