const path = require('path');

const configSwagger = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'ESTO ES',
      description: '',
      contact: {
        name: 'Emanuel',
        email: 'emanuelarroyodev@gmail.com',
      },
      license: {
        name: 'Apache 2.0',
        url: 'https://www.apache.org/licenses/LICENSE-2.0.html',
      },
      version: '1.0.0',
    },
    servers: [
      {
        url: 'https://esto-es.herokuapp.com',
        description: 'Server Heroku',
      },
      {
        url: 'http://localhost:3000',
        description: 'Server Local',
      },
    ],
  },
  apis: [`${path.join(__dirname, '../documentation/*.yml')}`],
};
module.exports = { configSwagger };
