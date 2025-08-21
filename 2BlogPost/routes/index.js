// 1FoodYoutube/routes/index.js

const testRoutes = require('./testRoutes');
const authRoutes = require('./authRoutes');
const postRoutes=require('./postRoutes')
const commentRoutes=require('./commentRoutes')
module.exports = (app) => {
  app.use("/api/v1/test", testRoutes);
  app.use("/api/v1/auth", authRoutes);
  app.use("/api/v1/post",postRoutes);
  app.use("/api/v1/comment",commentRoutes)
};
