// 2016-05-01 16:58:47
// TODO: Fix repetitive 'bind' statements
import motController from './../controllers/mot.controller';

export default function (router) {
  router
    .route('/mots')
      .get(motController.index.bind(motController))
      .post(motController.create.bind(motController));

  router
    .route('/mots/:id')
      .get(motController.show.bind(motController))
      .put(motController.update.bind(motController))
      .delete(motController.destroy.bind(motController));
}
