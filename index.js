const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();

app.use(cors());
app.use(bodyParser.json({ type: "*/*" }));

require("./Routes/ArticleRoutes")(app);

app.listen(1234);