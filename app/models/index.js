const dbConfig = require("../config/db.config.js");

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
db.user = require("./user.model");
db.role = require("./role.model");
db.ROLES = ["user", "admin", "moderator"];
db.students = require("./student.model.js")(mongoose);
db.qpapers = require("./qpaper.model.js")(mongoose);
db.publishers = require("./publisher.model.js")(mongoose);
db.cats = require("./cat.model.js")(mongoose);
db.customers = require("./customer.model.js")(mongoose);
db.books = require("./book.model.js")(mongoose);

module.exports = db;
