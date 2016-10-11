module.exports = {
  PROD: {
    main: 80,
    photoProcesser: 81
  },
  DEV: {
    main: 3000,
    photoProcessor: 'http://photo-processor:3001',
    curator: 'http://curator:3002'
  },
  LOCAL: {
    main: 3000,
    photoProcessor: 'http://localhost:3001',
    curator: 'http://localhost:3002'
  }
};