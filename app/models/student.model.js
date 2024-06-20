module.exports = mongoose => {
  var schema = mongoose.Schema(
    {
      fullname: String,
      username: String,
      mobile: String,
      email: String,
      dob: String,
      active: Boolean
    },
    { timestamps: true }
  );

  schema.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const Student = mongoose.model("student", schema);
  return Student;
};
