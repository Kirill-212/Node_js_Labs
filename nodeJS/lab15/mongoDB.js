const { ObjectId } = require("bson");

const MongoClient = require("mongodb").MongoClient;
const uri = "mongodb+srv://123:123@cluster0.68r23.mongodb.net";

class MongoDB {
  constructor() {
    this.client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    this.client = this.client.connect().then((connection) => {
      return connection.db("BSTU");
    });
    console.log("Connected to MongoDB");
  }

  async GetRecordsByTableName(tableName) {
    return this.client.then((db) => {
      console.log(tableName);
      return db.collection(tableName).find({}).toArray();
    });
  }

  async InsertRecords(tableName, fields) {
    return this.client.then(async (db) => {
      await db.collection(tableName).insertOne(fields, (err, r) => {
        if (err) console.log(err);
        else {
          console.log(r.insertedCount);
        }
      });
      return db.collection(tableName).findOne(fields);
    });
  }

  async UpdateRecords(tableName, id, fields) {
    return this.client.then(async (db) => {
      console.log(id);
      if (!id) {
        throw "Wrong ID";
      }
      delete fields._id;
      await db
        .collection(tableName)
        .updateOne({ _id: ObjectId(id) }, { $set: fields });
      return db.collection(tableName).findOne(fields);
    });
  }

  async DeleteField(tableName, id) {
    return this.client.then(async (db) => {
      if (!id) {
        throw "Wrong ID";
      }
      console.log("DB delete");
      let removedRecord = await db.collection(tableName).findOne({ _id: ObjectId(id) });
      await db.collection(tableName).deleteOne({ _id: ObjectId(id) });
      return removedRecord;
    });
  }
}

module.exports = MongoDB;
