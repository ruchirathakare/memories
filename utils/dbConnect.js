import mongoose from "mongoose";

const connection = {};

async function dbConnect() {
  if (connection.isConnected) {
    return;
  }

  const db = await mongoose.connect(
    process.env.MONGO_URI ||
      "mongodb+srv://admin:root@memory.1ruqu.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }
  );
  mongoose.set("useFindAndModify", false);
  connection.isConnected = db.connections[0].readyState;
}

export default dbConnect;
