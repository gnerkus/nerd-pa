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

  it('should create a data field for a single response', () => {
    LIB.formatResponse(SAMPLE_RES).should.have.all.keys(['data']);
  });

  it('should return a resource object with the same attributes', () => {
    (LIB.formatResponse(SAMPLE_RES).data.attributes.content)
      .should
      .equal('An update');
  });

  it('should have a data field that is an Array', () => {
    LIB.formatResponse(COM_RES).should.have.all.keys(['data']);
    LIB.formatResponse(COM_RES).data.should.be.an.instanceof(Array);
  });

  it('should return a compound object with the correct response', () => {
    (LIB.formatResponse(COM_RES).data[0].attributes.content)
      .should
      .equal('A single update');
  });
});
