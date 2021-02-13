# NodeJS_http_server

- [PM2](https://www.npmjs.com/package/pm2)
- [express](https://www.npmjs.com/package/express)

# JSON API & WebPage Server
### Reqeust Headers
- Content-Type : application/json -> return JSON Result
- The others Content-Type -> return WebPage

# Install & Start
### ecosystem.config.js
```js
module.exports = {
  apps : [{
    name      : 'nodejs_http_server',
    script    : 'app.js',
    env: {
      FORCE_COLOR: 1,
      PORT: 13000,
      NODE_ENV: 'development'
    },
    env_production : {
      FORCE_COLOR: 1,
      PORT: 80,
      NODE_ENV: 'production'
    }
  }]
};
```
### Package script
```js
...
"scripts": {
  "test": "mocha",
  "dev": "pm2-dev start ecosystem.config.js",
  "dev-start": "pm2 startOrRestart ecosystem.config.js --watch --env development && pm2 log nodejs_http_server",
  "start": "pm2 startOrRestart ecosystem.config.js --env production",
  "deploy": "npm install && npm run start"
},
...
```
- Unit Test ([mocha](https://www.npmjs.com/package/mocha))
```shell
$ npm run test
```

- ENV development
```shell
$ npm install
$ npm run dev
or
$ npm run dev-start
```

- ENV production
```shell
$ npm install
$ npm run start
or
$ npm run deploy
```
