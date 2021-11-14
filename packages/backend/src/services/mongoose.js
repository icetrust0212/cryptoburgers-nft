const db = require("../model");
const {
  dbConfig
} = require('../config');
const Burger = db.burger;

var bcrypt = require("bcryptjs");

db.mongoose
  .connect(`mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Successfully connect to MongoDB.");
  })
  .catch(err => {
    console.error("Connection error", err);
    process.exit();
  });

function saveTokenMetadataToDB(burgerData) {
  Burger.estimatedDocumentCount((err, count) => {
    new Burger(burgerData).save(err => {
      if (err) {
        console.log("error", err);
        return;
      }

      console.log("Create new metadata admin");
    });
  });
}

module.exports = {
  db,
  saveTokenMetadataToDB
};