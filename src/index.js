import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import cors from "cors";
import webpack from 'webpack';
import webpackConfig from '../webpack.client.js';
import React from 'react';
import { renderToString } from 'react-dom/server';
import store from './common/store/index.js';
import { Provider } from 'react-redux';
import Router from './common/route/Route.js';
import { StaticRouter } from "react-router-dom/server";
import apiRoutes from './server/controller/api.js';
import createPostRoutes from './server/controller/CreatePost/index.js';
import publishPostRoutes from './server/controller/PublishPost/index.js';
import editPublishPostRoutes from './server/controller/EditPublsihedPost/index.js';
import savedPostRoutes from './server/controller/SavedPost/index.js';
import markPostRoutes from './server/controller/MarkPost/index.js';
import followRoutes from './server/controller/Follower/index.js';
import mongoose from "mongoose";
import { ServerStyleSheets } from '@material-ui/core/styles';
import theme from './common/breakpoint/index.js';
import { MuiThemeProvider } from "@material-ui/core/styles";

const app = express();

 // (2)
app.use(express.static('public'));
app.use(cookieParser());
// use body parser so we can get info from POST and/or URL parameters
app.use(bodyParser.urlencoded({ limit: '500mb', extended: true })); // only can deal with key/value
app.use(bodyParser.json({ limit: '500mb' }));
// use morgan to log requests to the console
app.use(morgan('dev'));
app.use(cors());

//let compiler = webpack(webpackConfig);
/*app.use(webpackDevMiddleware(compiler, {
    publicPath: webpackConfig.output.publicPath,
}));*/

//app.use(webpackHotMiddleware(compiler));

// Routes middlewares
app.use('/api', apiRoutes); 
app.use('/CreatePost', createPostRoutes); 
app.use('/EditPublishedPost', editPublishPostRoutes);
app.use('/PublishedPost', publishPostRoutes);
app.use('/SavedPost', savedPostRoutes);
app.use('/MarkPost', markPostRoutes);
app.use('/Follower', followRoutes);

 // (3)
app.get('*', (req, res) => {
  mongoose.connect(peocess.env.DATABASE);
  mongoose.Promise = global.Promise;
  let db = mongoose.connection;
  db.on('error', console.error.bind(console, 'MongoDB connection error:'));
    
  const sheets = new ServerStyleSheets();
  const html = renderToString(sheets.collect(
    <Provider store={store}>
      <MuiThemeProvider theme={theme}>
        <StaticRouter location={req.path}>
          <Router />
          </StaticRouter>
      </MuiThemeProvider>
    </Provider>
  ));
  const cssString = sheets.toString();
    
  res.send(renderFullPage(cssString, html));
});

//API ?
app.listen((process.env.PORT || 5000), '0.0.0.0' , (error) => {
    if (error) {
      console.error(error);
    } else {
      console.info(`==> ?  Listening on port ${(process.env.PORT || 5000)}. Open up:${(process.env.PORT || 5000)}/ in your browser.`)
    }
  });

  const renderFullPage = (cssString, html) => (`
    <!doctype html>
    <html>
      <head>
        <meta name="viewport" charset="utf-8" content="width=device-width, minimum-scale=1.0">
        <style id="jss-server-side">${cssString}</style>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
        <script src="https://code.iconify.design/iconify-icon/1.0.1/iconify-icon.min.js"></script>
        </head>
        <title>OpenCook 分享料理的美好時光</title>
          <body style="position: relative; margin: 0;">
          <div id="root" style="position: relative">${html}</div>
        <script src="/bundle.js"></script>       
      </body>
    </html>`
);
