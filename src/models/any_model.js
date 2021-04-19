/**
 * Any Model. Defining Any schema using mongoose
 * @author Chinedu Ekene Okpala <allstackdev@gmail.com>
 * @created Nov 11, 2020
 */

module.exports.name = 'AnyModel'
module.exports.dependencies = ['mongoose']
module.exports.factory = (mongoose, helpers) => {
  'use strict'

  const Schema = mongoose.Schema

  // Define schema for Crop
  const schema = new Schema(
    {
      name: {
        type: String,
        unique: true,
        trim: true,
        required: [true, 'Any name is required']
      },
    },
    {
      versionKey: false,
      timestamps: true,
      writeConcern: {
        w: 'majority',
        j: true,
        wtimeout: 1000
      }
    }
  )

  return mongoose.model('Any', schema)
}
