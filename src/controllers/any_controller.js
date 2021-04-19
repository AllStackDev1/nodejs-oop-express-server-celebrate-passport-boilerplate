/* eslint-disable space-before-function-paren */
'use strict'
const BaseController = require('./base')

/**
 * @author Chinedu Ekene Okpala <allstackdev@gmail.com>
 * @summary Controller to handle http request for location model related functions
 * @name AnyController
 * @extends BaseController
 */
module.exports.name = 'AnyController'
module.exports.dependencies = ['AnyRepository', 'miscHelpers', 'logger', 'response', 'mongoose']
module.exports.factory = class extends BaseController {
  /**
   * @param {object} repo The repository which will handle the operations to be
   * performed in this controller
   * @param {object} helper - helper object
   * @param {object} logger - logger object
   * @param {object} response - response handler object
   * @param {object} mongoose mongodb middleware
   */
  constructor(repo, helper, logger, response, mongoose) {
    super(repo, mongoose, helper, logger, response)
    this.name = 'Any'
  }
}
