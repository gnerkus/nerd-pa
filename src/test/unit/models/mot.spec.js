import models from './../../../../dist/models';

import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
chai.use(chaiAsPromised);
chai.should();

describe('Mot Model', () => {
  beforeEach((done) => {
    models
      .SEQUELIZE
      .sync()
      .then(() => done());
  });

  it('should create a Mot with valid properties', (done) => {
    models
      .Mot
      .create({
        content: 'A little text',
      })
      .should.not.be.rejected
      .notify(done);
  });
});
