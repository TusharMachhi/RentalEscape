export const baseRepo = (Model) => ({
  create: (data) => new Model(data).save(),

  updateById: (id, data) => Model.findByidAndUpdate(id, data, { new: true }),

  deleteById: (id) => Model.findByIdAndDelete(id),

  findById: (id, select = "") => Model.findById(id, select),

  find: () => Model.find(),
});
