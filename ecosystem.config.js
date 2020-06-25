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
