describe('Mot Model', () => {
  beforeEach((done) => {
    MODELS
      .SEQUELIZE
      .sync()
      .then(() => done());
  });

  it('should create a Mot with valid properties', (done) => {
    MODELS
      .Mot
      .create({
        content: 'A little text',
      })
      .should.not.be.rejected
      .notify(done);
  });
});
