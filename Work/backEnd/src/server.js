const express = require("express");
const cors = require("cors");
const app = express();
const routes = require("./v1/routes");
const bodyParser = require("body-parser");
// { origin: "http://localhost:4200" }
app.use(cors()); // CORS for frontend URL
app.use(bodyParser.json());
app.use("/api/v1", routes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
