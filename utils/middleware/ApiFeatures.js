export class ApiFeatures {
  constructor(query, queryStr, total) {
    this.query = query;
    this.total = total;
    this.queryStr = queryStr;
    this.pagination = {};
    console.log(this.query);
  }
  filter() {
    let queryObj = { ...this.queryStr };

    const excludedFields = ["page", "fields", "limit", "sort"];
    excludedFields.forEach((fields) => delete queryObj[fields]);

    let queryStr = JSON.stringify(queryObj);

    queryStr = queryStr.replace(
      /\b(gt|gte|ne|neq|lt|lte|regex|eq)\b/g,
      (match) => `$${match}`,
    );

    this.query = this.query.find(JSON.parse(queryStr));
    console.log("1", this);
    return this;
  }
  sort() {
    if (this.queryStr.sort) {
      const sortBy = this.queryStr.sort.split(",").join(" ");
      this.query = this.query.sort(sortBy);
    } else {
      this.query = this.query.sort("-createdAt");
    }
    console.log("2", this);
    return this;
  }
  fields() {
    if (this.queryStr.fields) {
      const fields = this.queryStr.fields.split(",").join(" ");

      this.query = this.query.select(fields);
    }
    console.log("3", this);
    return this;
  }
  paginate() {
    const page = parseInt(this.queryStr.page, 10) || 1;
    const limit = parseInt(this.queryStr.limit, 10) || 10;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    console.log("in pagination", this.query.model);
    const total = this.total;

    if (startIndex > 0) {
      this.pagination.prev = {
        page: page - 1,
        limit,
      };
    }
    if (endIndex < total) {
      this.pagination.next = {
        page: page + 1,
        limit,
      };
    }
    const hasNextPage = endIndex < total;
    const hasPrevPage = startIndex > 0;
    ((this.pagination.hasNextPage = hasNextPage),
      (this.pagination.hasPrevPage = hasPrevPage));
    this.query = this.query.skip(startIndex).limit(limit);
    console.log("4", this);
    return this;
  }
}
