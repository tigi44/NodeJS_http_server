# NodeJS_http_server

- [PM2](https://www.npmjs.com/package/pm2)
- [express](https://www.npmjs.com/package/express)

# API Server & WebPage Server
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
  "dev": "pm2-dev start ecosystem.config.js",
  "start": "pm2 startOrRestart ecosystem.config.js --env production",
  "deploy": "npm install && npm run start"
},
...
```
##### - ENV development
- http port  : 13000
```shell
$ npm install
$ npm run dev
```

##### - ENV production
- http port  : 80
```shell
$ npm install
$ npm run start
or
$ npm run deploy
```
