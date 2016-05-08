import MODELS from 'models';

/**
 * 2016-05-01 16:52:46
 * Base controller definition for API resources.
 * The 'modelName' determines which schema derived constructors will use
 * to read and write data.
 */
class BaseController {
  constructor(modelName, models = MODELS) {
    this.MODELNAME = modelName;
    this.MODELS = models;
  }

  // Fetch all instances of the specified resource. This is mapped to the
  // 'GET /api/v1/resource' route
  index(request, response) {
    const OPTIONS = {};

    // TODO: Define query options here

    this.MODELS[this.MODELNAME]
      .findAll(OPTIONS)
      .then((items) => response.status(200).json(items))
      .catch((error) => {
        // TODO: Handle error
        response.status(500).json(error);
      });
  }

  // Fetch a single instance of the specified resource.
  // This is mapped to the 'GET /api/v1/resource/:id' route
  show(request, response) {
    const ID = request.params.id;

    this.MODELS[this.MODELNAME]
      .findById(ID)
      .then((item) => {
        if (item) {
          response.status(200).json(item);
        } else {
          response.status(404).json({ message: 'not found' });
        }
      })
      .catch((error) => {
        // TODO: Handle error
        response.status(500).json(error);
      });
  }

  // Create a single instance of the specified resource
  // This is mapped to the 'POST /api/v1/resource' route
  create(request, response) {
    const ITEM = this.MODELS[this.MODELNAME].build(request.body);

    ITEM
      .save()
      .then((item) => response.status(200).json(item))
      .catch((error) => {
        // TODO: Handle error
        response.status(500).json(error);
      });
  }

  // Update a single instance of the specified resource
  // This is mapped to the 'PUT /api/v1/resource/:id' route
  update(request, response) {
    const ID = request.params.id;
    const ATTRIBUTES = request.body;

    this.MODELS[this.MODELNAME]
      .findById(ID)
      .then((item) => {
        if (item) {
          item
            .update(ATTRIBUTES)
            .then((updatedItem) => response.status(200).json(updatedItem))
            .catch((error) => {
              // TODO: Handle error
              response.status(500).json(error);
            });
        } else {
          response.status(404).json({ message: 'not found' });
        }
      })
      .catch((error) => {
        // TODO: Handle error
        response.status(500).json(error);
      });
  }

  // Delete a single instance of the specified resource
  // This is mapped to the 'DELETE /api/v1/resource/:id' route
  destroy(request, response) {
    const ID = request.params.id;

    this.MODELS[this.MODELNAME]
      .findById(ID)
      .then((item) => {
        if (item) {
          item
            .destroy()
            .then(() => response.status(200).json({ message: 'item deleted' }));
        } else {
          response.status(404).json({ message: 'not found' });
        }
      })
      .catch((error) => {
        // TODO: Handle error
        response.status(500).json(error);
      });
  }
}

export default BaseController;
