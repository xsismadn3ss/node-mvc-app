require("dotenv").config();
const express = require("express");
const db = require("./config/db");
const homeRoutes = require("./routes/home");
const categoryRoutes = require("./routes/category");
const productRoutes = require("./routes/product");
const dashboardRoutes = require('./routes/dashboard')

const app = express();
const PORT = process.env.PORT;

app.use(express.urlencoded({ extended: true }));
app.set("view engine", "pug");

// usar rutas
app.use("/", homeRoutes);
app.use("/", categoryRoutes);
app.use("/", productRoutes);
app.use('/', dashboardRoutes)

// sincronizar base de datos
db.sync({ force: false })
  .then(() => {
    app.listen(
      PORT,
      console.clear(),
      console.log("\nServidor corriendo en: http://localhost:" + PORT),
      console.log("hot reload activado...\n"),
    );
  })
  .catch((error) => {
    console.clear()
    console.log(error);
    console.log("\nError conectando a la base de datos");
    console.log("Configura correctamente el entorno de desarrollo\n");
  });
