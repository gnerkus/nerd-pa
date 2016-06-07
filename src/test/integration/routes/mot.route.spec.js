import request from 'supertest';
import MODELS from 'models';
const APP = require('config/express').APP;

const MOCK_MOTS = [
  {
    id: 1,
    content: 'A simple update',
  },
  {
    id: 2,
    content: 'Another update',
  },
];

describe('Mots routes', () => {
  beforeEach((done) => {
    MODELS.Mot
      .destroy({ where: {} })
      .then(() => {
        MODELS.Mot
          .bulkCreate(MOCK_MOTS)
          .then(() => done());
      });
  });

  afterEach((done) => {
    MODELS.Mot
      .destroy({ where: {} })
      .then(() => done());
  });

  describe('GET /mots', () => {
    it('should respond with JSON', (done) => {
      request(APP)
        .get('/api/v1/mots')
        .expect('Content-Type', /json/)
        .expect(200, done);
    });

    it('should return all mots', (done) => {
      request(APP)
        .get('/api/v1/mots')
        .expect(200)
        .end((err, res) => {
          if (err) done(err);
          res.body.data.length.should.equal(MOCK_MOTS.length);
          done();
        });
    });
  });

  describe('GET /mots/:id', () => {
    it('should respond with json', (done) => {
      request(APP)
        .get(`/api/v1/mots/${MOCK_MOTS[0].id}`)
        .expect('Content-Type', /json/)
        .expect(200, done);
    });

    it('should respond with correct mot', (done) => {
      request(APP)
        .get(`/api/v1/mots/${MOCK_MOTS[0].id}`)
        .expect(200)
        .end((err, res) => {
          if (err) done(err);
          res.body.data.attributes.content.should.equal(MOCK_MOTS[0].content);
          done();
        });
    });

    it('should respond with 404 for mot not found', (done) => {
      request(APP)
        .get('/api/v1/mots/777')
        .expect('Content-Type', /json/)
        .expect(404, done);
    });
  });

  describe('POST /mots', () => {
    it('should create a mot with valid attributes', (done) => {
      const SAMPLE_MOT = {
        data: {
          attributes: {
            id: 4,
            content: 'A word of advice',
          }
        }
      };

      request(APP)
        .post('/api/v1/mots')
        .set('Content-Type', 'application/vnd.api+json')
        .send(SAMPLE_MOT)
        .expect('Content-Type', /json/)
        .expect(200, () => {
          MODELS.Mot
            .findOne({ where: { id: SAMPLE_MOT.data.attributes.id } })
            .then((mot) => {
              mot.content.should.equal(SAMPLE_MOT.data.attributes.content);
              done();
            });
        });
    });

    it('should return 500 for invalid id', (done) => {
      const SAMPLE_MOT = {
        data: {
          attributes: {
            id: true,
            content: 'A word of advice',
          }
        }
      };

      request(APP)
        .post('/api/v1/mots')
        .set('Content-Type', 'application/vnd.api+json')
        .send(SAMPLE_MOT)
        .expect('Content-Type', /json/)
        .expect(500, done);
    });
  });

  describe('PATCH /mots/:id', () => {
    it('should respond with json', (done) => {
      const SAMPLE_MOT = {
        content: 'A word of advice',
      };

      request(APP)
        .patch(`/api/v1/mots/${MOCK_MOTS[0].id}`)
        .set('Content-Type', 'application/vnd.api+json')
        .send(SAMPLE_MOT)
        .expect('Content-Type', /json/)
        .expect(200, done);
    });

    it('should update mot', (done) => {
      const SAMPLE_MOT = {
        content: 'A word of advice',
      };

      request(APP)
        .patch(`/api/v1/mots/${MOCK_MOTS[0].id}`)
        .set('Content-Type', 'application/vnd.api+json')
        .send(SAMPLE_MOT)
        .expect(200)
        .end((err, res) => {
          if (err) done(err);
          res.body.data.attributes.content.should.equal(SAMPLE_MOT.content);
          done();
        });
    });
  });

  describe('DELETE /mots/:id', () => {
    it('should delete the correct mot', (done) => {
      request(APP)
        .delete(`/api/v1/mots/${MOCK_MOTS[0].id}`)
        .expect(200, () => {
          MODELS.Mot
            .findOne({ where: { id: MOCK_MOTS[0].id } })
            .then((mot) => {
              // TODO: use chai should here
              require('assert').equal(mot, null);
              done();
            });
        });
    });
  })
});
