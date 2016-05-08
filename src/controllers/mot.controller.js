import BaseController from 'controllers/base.controller';

const MODELNAME = 'Mot';

class MotController extends BaseController {
  constructor(models) {
    super(MODELNAME, models);
  }
}

export default MotController;
