const supertest = require('supertest');

const ProfileStudioAPI = supertest('http://localhost:8001/api');

module.exports = {
  ProfileStudioAPI
  };