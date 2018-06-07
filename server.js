const express = require('express');
const next = require('next');

const port = 5060;
const dev = process.env.NODE_ENV || 'production'

const app = next({ dev })
const handler = app.getRequestHandler();


app.prepare()
  .then(() => {
    const server = express();
    server.get('/about', (req, res) => {
      app.render(req, res, '/about');
    })

    server.get('/mystore', (req, res) => {
      app.render(req, res, '/store');
    })
    server.get('*', (req, res) => {
      return handler(req, res);
    })

    server.listen(port, (err) => {
      if (err) {
        throw err;
      }

      console.log(`Ready on http://localhost:${port}`)
    })
  })