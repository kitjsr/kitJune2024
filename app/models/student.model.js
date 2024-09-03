module.exports = mongoose => {
  var schema = mongoose.Schema(
    {
      fullname: String,
      username: String,
      mobile: String,
      email: String,
      address: String,
      course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course' }, // Reference to Branch,,
      branch: { type: mongoose.Schema.Types.ObjectId, ref: 'Branch' }, // Reference to Branch,
      session: String,
      photo: String,
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
