const app               = require('../app');
const supertest         = require('supertest');
const should            = require('should');

describe('** TEST API Integration **', function () {
  let request = null

  before(function(){
    request = supertest.agent(app)
  })

  after(function(done){
    app.close(done)
  })

  describe('** Integration test **', function () {
    it('Test url (application/json) : /', function (done) {
      request
        .get('/')
        .set('Content-Type', 'application/json')
        .expect(200)
        .end((err, res) => {
          should.not.exist(err)
          should.exist(res)

          res.body.should.be.an.instanceOf(Object).and.have.property('code', 0)

          should.exist(res.body.data)

          done()
        })
    });

    it('Test url (text/html) : /', function (done) {
      request
        .get('/')
        .set('Content-Type', 'text/html')
        .expect(200)
        .end((err, res) => {
          should.not.exist(err)
          should.exist(res)

          should.exist(res.text);

          done()
        })
    });
  });
});
