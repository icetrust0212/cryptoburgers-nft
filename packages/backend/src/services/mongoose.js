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

async function saveTokenMetadataToDB(burgerData) {
  // Burger.estimatedDocumentCount((err, count) => {
    const burger = await Burger.find({tokenId: burgerData.tokenId}).exec();
    if (!burger || burger.length === 0) {
      try {
        await new Burger(burgerData).save();
        console.log('new burger: ', burgerData);
        return burgerData;
      } catch(err) {
        console.log('new burger err: ', err)
        return null;
      }
    } else {
      console.log('exist burger: ', burger[0]);
      return burger;
    }
  // });
}

function clearTable() {
  Burger.remove({}, (err, burgers) => {
    if (!err) {
      console.log('delete all records:');
    }
  })
}

// clearTable();


module.exports = {
  db,
  saveTokenMetadataToDB
};