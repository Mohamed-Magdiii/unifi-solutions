const { ObjectId } = require('mongoose').Types;
const { generateReferenceForModel } = require('../utils');

class Cruds {
  constructor(Model, Schema = {}) {
    this.Model = Model;
    this.keys = Object.keys(Schema);
    if (this._constructor) this._constructor(...arguments);
}
async create(params, returnOnlyId = false) {
    const recordId = generateReferenceForModel(10, this.Model.modelName);
    const newObj = new this.Model({ ...params, recordId });
    if (!returnOnlyId) {
      return newObj.save();
    }
    const result = await newObj.save();
    return { _id: result.id };
}

async find(params = {}, projection = {}, options = {}) {
    let findRes = this.Model.find(params, projection, { ...options, lean: true });
    if (options.populate) findRes = findRes.populate(options.populate);
    return findRes;
  }

  async count(params = {}) {
    return this.Model.find(params).count();
  }

  async findOne(params = {}, projection = {}, options = {}) {
    return this.Model.findOne(params, projection, { ...options, lean: true });
  }

  async findById(id, projection, lean = true) {
    if (projection) return this.Model.findById(id, projection, { lean });
    return this.Model.findById(id, null, { lean });
  }

  async deleteById(id) {
    return this.Model.deleteOne({ _id: ObjectId(id) });
  }

  async updateById(id, params = {}) {
    return this.Model.findOneAndUpdate({ _id: ObjectId(id) }, { $set: params }, { new: true });
  }

  async findWithPagination(params = {}, options = {}) {
    const limit = process.env.PAGINATION_LIMIT || 10;
    return this.Model.paginate(params, {
      limit, ...options, lean: true, sort: { createdAt: -1 },
    });
  }



}

module.exports = Cruds;