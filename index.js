/*!
 * express-swagger-ui <https://github.com/AndreasPizsa/express-swagger-ui>
 *
 * Copyright (c) 2016, Andreas Pizsa.
 * Licensed under the MIT License.
 */

'use strict';

const express   = require('express');
const fs        = require('fs');
const swaggerUi = require('swagger-ui/index');
const path      = require('path');

function initializeExpressUi(options)
{
  if(!options.app) throw new TypeError('options.app is required and must be an express app');

  options.swaggerUrl= options.swaggerUrl  || '/swagger.json';
  options.localPath = options.localPath   || '/explorer';

  if(!options.html) {
    options.html = fs
      .readFileSync(path.join(swaggerUi.dist,'index.html'),{encoding:'utf-8'})
      .replace('http://petstore.swagger.io/v2/swagger.json', options.swaggerUrl);
  }

  options.app
    .use(options.localPath,serveSwaggerUi)
    .use(options.localPath,express.static(swaggerUi.dist));

  function serveSwaggerUi(req,res,next)
  {
    return /^\/?$/.test(req.path)
      ? res.status(200).send(options.html)
      : next();
  };
};

module.exports = initializeExpressUi;
