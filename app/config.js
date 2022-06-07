const config = {
  development: {
    port: 3000,
    mongodb: 'mongodb://localhost:2717/test'
  },
  production: {
    port: 3000,
    mongodb: ''
  }
}

export default config;