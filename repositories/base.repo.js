export const baseRepo = (Model) => ({
  create: (data) => new Model(data).save(),

  updateById: (id, data) =>
    Model.findByIdAndUpdate(id, data, { returnDocument: "after" }),

  deleteById: (id) => Model.findByIdAndDelete(id),

  findById: (id, select = "") => Model.findById(id, select),

  find: (filter = {}) => Model.find(filter),
});
