module.exports = mongoose => {
  var schema = mongoose.Schema(
    {
      name: String,
      publisher: String,
      price: Number,
      edition: Number,
      author: String,
      active: Boolean
    },
    { timestamps: true }
  );

  schema.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const Book = mongoose.model("book", schema);
  return Book;
};
