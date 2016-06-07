/*  global
LIB
httpMocks:true*/
describe('#formatResponse', () => {
  // A single resource
  const SAMPLE_RES = {
    content: 'An update',
  };

  // A compound resources
  const COM_RES = [
    {
      content: 'A single update',
    },
    {
      content: 'Another update',
    },
  ];

  const RES_TYPE = 'resources';

  describe('core method', () => {
    it('should throw error if no resource specified', () => {
      (function () {
        LIB.formatResponse();
      }).should.throw(Error);
      (function () {
        LIB.formatResponse();
      }).should.throw('no resource specified');
    });

    it('should throw error is no type specified', () => {
      (function () {
        LIB.formatResponse(SAMPLE_RES);
      }).should.throw(Error);
      (function () {
        LIB.formatResponse(SAMPLE_RES);
      }).should.throw('no type specified');
    });
  });

  describe('single resource', () => {
    it('should create a data field for a single response', () => {
      LIB.formatResponse(SAMPLE_RES, RES_TYPE).should.have.all.keys(['data']);
    });

    it('should return a resource object with the same attributes', () => {
      (LIB.formatResponse(SAMPLE_RES, RES_TYPE).data.attributes.content)
        .should
        .equal('An update');
    });
  });

  describe('complex resource', () => {
    it('should have a data field that is an Array', () => {
      LIB.formatResponse(COM_RES, RES_TYPE).should.have.all.keys(['data']);
      LIB.formatResponse(COM_RES, RES_TYPE).data.should.be.an.instanceof(Array);
    });

    it('should return a compound object with the correct response', () => {
      (LIB.formatResponse(COM_RES, RES_TYPE).data[0].attributes.content)
        .should
        .equal('A single update');
    });
  });
});
