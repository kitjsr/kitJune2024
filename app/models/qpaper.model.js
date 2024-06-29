module.exports = mongoose => {
  var schema = mongoose.Schema(
    {
      _id:String,
      qname: String,
      ename: String,
      photo: String,
      // active: Boolean
    },
    { timestamps: true }
  );

  schema.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const Qpaper= mongoose.model("qpaper", schema);
  return Qpaper;
};
