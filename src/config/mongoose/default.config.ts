export default {
  id: "default",
  url: process.env.DB_URI || "mongodb://localhost:27017/default",
  connectionOptions: { }
};
