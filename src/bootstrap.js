/**
 * Module to bootstrap the application and include necessary components
 * @author Chinedu Ekene Okpala <allstackdev@gmail.com>
 */
module.exports.name = 'bootstrap'
module.exports.dependencies = [
  'express',
  'passport',
  'cors',
  'helmet',
  'morgan',
  'body-parser',
  'express-handlebars',
  'celebrate',
  'db',
  'routers',
  'logger',
  'hbsHelpers',
  'miscHelpers',
  'response'
]
module.exports.factory = (
  express,
  passport,
  cors,
  helmet,
  morgan,
  bodyParser,
  hbs,
  celebrate,
  db,
  routers,
  logger,
  hbsHelpers,
  miscHelper,
  response
) => {
  'use strict'

  // database configuration
  const { dbConfig } = db

  // error handler
  const { errors } = celebrate

  // application server
  const app = express()
  const port = process.env.PORT || 3000

  // register necessary middleware
  app.use(cors())
  app.options('*', cors())
  app.use(helmet())
  app.use(bodyParser.urlencoded({ limit: '5mb', extended: true }))
  app.use(bodyParser.json({ limit: '5mb', extended: true }))
  app.use(express.urlencoded({ extended: true }))
  if (app.get('env') === 'DEV') {
    app.use(morgan('combined'))
  }

  // resovle root folder path
  const { appRoot } = miscHelper

  // register views
  app.use(express.static(`${appRoot}/public`))
  app.set('views', './src/views')
  app.engine(
    '.hbs',
    hbs({
      defaultLayout: 'layouts',
      extname: '.hbs',
      layoutsDir: `${appRoot}/views/`,
      helpers: hbsHelpers
    })
  )
  app.set('view engine', 'hbs')

  // server error middleware
  app.use(function (error, req, res, next) {
    if (error instanceof SyntaxError) {
      response.serverError(res, 'Invalid data')
    } else {
      next()
    }
  })

  app.use(passport.initialize())

  // register routes middleware
  app.use('/api/v1', routers)
  app.get('/', (req, res) => res.redirect('/api/v1/api-docs'))

  // register celebrate validation middleware
  app.use(errors())
  console.log('Hell 1')

  // connect to the database and if successful, start the server
  dbConfig(() => {
    console.log('Hel2')
    app.listen(port, () => {
      console.log(`Express server listening on port ${port}`)
      console.log(`You should be able to connect to the api on http://localhost:${port}`)
      logger.debug(`Express server listening on port ${port}`)
      logger.debug(`You should be able to connect to the api on http://localhost:${port}`)
    })
  })

  return app
}
