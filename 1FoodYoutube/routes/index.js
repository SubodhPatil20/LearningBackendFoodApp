// 1FoodYoutube/routes/index.js

const testRoutes = require('./testRoutes');
const authRoutes = require('./authRoutes');
const userRoutes = require('./userRoutes');
const resturantRoutes = require('./resturantRoutes');
const categoryRoutes = require('./categoryRoutes');
const foodRoutes = require('./foodRoutes');

module.exports = (app) => {
  app.use("/api/v1/test", testRoutes);
  app.use("/api/v1/auth", authRoutes);
  app.use("/api/v1/user", userRoutes);
  app.use("/api/v1/resturant", resturantRoutes);
  app.use("/api/v1/category", categoryRoutes);
  app.use("/api/v1/food", foodRoutes);
};
