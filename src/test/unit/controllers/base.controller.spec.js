/*  global
MODELS
CONFIG
EventEmitter
httpMocks:true*/
import BaseController from 'controllers/base.controller';

const TEST_MODEL_NAME = 'Mot';
const TEST_CONTROLLER = new BaseController(TEST_MODEL_NAME);

const MOCK_MOTS = [
  {
    content: 'A simple update',
  },
  {
    content: 'Another update',
  },
];

/**
 * API data definition.
 * This is how the data received from the APi would look like.
 *
 * @example
 * {
   data: [{
     type: 'mots',
     id: 1,
     attributes: {
       content: 'A simple update',
     },
     links: {
       self: `${CONFIG.host}/api/v1/mots/1`,
     },
     relationships: {},
   }, {
     type: 'mots',
     id: 2,
     attributes: {
       content: 'Another update',
     },
     links: {
       self: `${CONFIG.host}/api/v1/mots/1`,
     },
     relationships: {},
   }],
   included: [{}],
 };
 */

let mockRes = null;

describe('Base Controller', () => {
  beforeEach((done) => {
    mockRes = httpMocks.createResponse({
      eventEmitter: EventEmitter,
    });

    MODELS
      .SEQUELIZE
      .sync({ force: true })
      .then(() => {
        MODELS[TEST_MODEL_NAME]
          .bulkCreate(MOCK_MOTS)
          .then(() => done());
      });
  });

  afterEach((done) => {
    MODELS
      .SEQUELIZE
      .sync()
      .then(() => {
        MODELS[TEST_MODEL_NAME]
          .destroy({ where: {} })
          .then(() => done());
      });
  });

  describe('#constructor', () => {
    it('should not be called as a function', () => {
      (BaseController).should.throw(TypeError);
    });
  });

  describe('#index', () => {
    it('should return all instances of the model', (done) => {
      const REQUEST = httpMocks.createRequest();
      TEST_CONTROLLER.index(REQUEST, mockRes);

      mockRes.on('end', () => {
        const queryData = JSON.parse(mockRes._getData());
        queryData.data.should.have.length(2);
        mockRes.statusCode.should.equal(200);
        done();
      });
    });

    it('should return an error no model instances', (done) => {
      const REQUEST = httpMocks.createRequest();

      MODELS[TEST_MODEL_NAME]
        .destroy({ where: {} })
        .then(() => {
          TEST_CONTROLLER.index(REQUEST, mockRes);

          mockRes.on('end', () => {
            mockRes.statusCode.should.equal(500);
            done();
          });
        });
    });
  });

  describe('#show', () => {
    it('should display the Mot with the correct ID', (done) => {
      const REQUEST = httpMocks.createRequest({
        params: {
          id: 1,
        },
      });
      TEST_CONTROLLER.show(REQUEST, mockRes);

      mockRes.on('end', () => {
        const queryData = JSON.parse(mockRes._getData());
        queryData.data.attributes.content.should.equal('A simple update');
        mockRes.statusCode.should.equal(200);
        done();
      });
    });

    it('should return a 404 status for a non-existent ID', (done) => {
      const REQUEST = httpMocks.createRequest({
        params: {
          id: 3,
        },
      });
      TEST_CONTROLLER.show(REQUEST, mockRes);

      mockRes.on('end', () => {
        mockRes.statusCode.should.equal(404);
        done();
      });
    });

    it('should return a 500 status for an invalid ID', (done) => {
      const REQUEST = httpMocks.createRequest({
        params: {
          id: 12345678912,
        },
      });
      TEST_CONTROLLER.show(REQUEST, mockRes);

      mockRes.on('end', () => {
        mockRes.statusCode.should.equal(500);
        done();
      });
    });
  });

  describe('#create', () => {
    it('should create a new Mot with the correct credentials', (done) => {
      const NEW_MOT = {
        content: 'A new mot',
      };

      const REQUEST = httpMocks.createRequest({
        body: NEW_MOT,
      });
      TEST_CONTROLLER.create(REQUEST, mockRes);

      mockRes.on('end', () => {
        const queryData = JSON.parse(mockRes._getData());
        queryData.data.attributes.content.should.equal('A new mot');
        mockRes.statusCode.should.equal(200);
        done();
      });
    });

    it('should not create a new Mot with an invalid request body', (done) => {
      const NEW_MOT = {};

      const REQUEST = httpMocks.createRequest({
        body: NEW_MOT,
      });
      TEST_CONTROLLER.create(REQUEST, mockRes);

      mockRes.on('end', () => {
        mockRes.statusCode.should.equal(500);
        done();
      });
    });
  });

  describe('#update', () => {
    it('should display the Mot with the correct ID', (done) => {
      const NEW_MOT = {
        content: 'A new mot',
      };
      const REQUEST = httpMocks.createRequest({
        body: NEW_MOT,
        params: {
          id: 1,
        },
      });
      TEST_CONTROLLER.update(REQUEST, mockRes);

      mockRes.on('end', () => {
        const queryData = JSON.parse(mockRes._getData());
        queryData.data.attributes.content.should.equal('A new mot');
        mockRes.statusCode.should.equal(200);
        done();
      });
    });

    it('should return a 404 status for a non-existent ID', (done) => {
      const NEW_MOT = {
        content: 'A new mot',
      };
      const REQUEST = httpMocks.createRequest({
        body: NEW_MOT,
        params: {
          id: 3,
        },
      });
      TEST_CONTROLLER.update(REQUEST, mockRes);

      mockRes.on('end', () => {
        mockRes.statusCode.should.equal(404);
        done();
      });
    });

    it('should return a 500 status for an invalid ID', (done) => {
      const NEW_MOT = {
        content: 'A new mot',
      };
      const REQUEST = httpMocks.createRequest({
        body: NEW_MOT,
        params: {
          id: 12345678912,
        },
      });
      TEST_CONTROLLER.update(REQUEST, mockRes);

      mockRes.on('end', () => {
        mockRes.statusCode.should.equal(500);
        done();
      });
    });

    it('should return a 500 status for an invalid request body', (done) => {
      const NEW_MOT = null;
      const REQUEST = httpMocks.createRequest({
        body: NEW_MOT,
        params: {
          id: 1,
        },
      });
      TEST_CONTROLLER.update(REQUEST, mockRes);

      mockRes.on('end', () => {
        mockRes.statusCode.should.equal(500);
        done();
      });
    });
  });

  describe('#destroy', () => {
    it('should display the Mot with the correct ID', (done) => {
      const REQUEST = httpMocks.createRequest({
        params: {
          id: 1,
        },
      });
      TEST_CONTROLLER.destroy(REQUEST, mockRes);

      mockRes.on('end', () => {
        const data = JSON.parse(mockRes._getData());
        data.message.should.equal('item deleted');
        mockRes.statusCode.should.equal(200);
        done();
      });
    });

    it('should return a 404 status for a non-existent ID', (done) => {
      const REQUEST = httpMocks.createRequest({
        params: {
          id: 3,
        },
      });
      TEST_CONTROLLER.destroy(REQUEST, mockRes);

      mockRes.on('end', () => {
        mockRes.statusCode.should.equal(404);
        done();
      });
    });

    it('should return a 500 status for an invalid ID', (done) => {
      const REQUEST = httpMocks.createRequest({
        params: {
          id: 12345678912,
        },
      });
      TEST_CONTROLLER.destroy(REQUEST, mockRes);

      mockRes.on('end', () => {
        mockRes.statusCode.should.equal(500);
        done();
      });
    });
  });
});
