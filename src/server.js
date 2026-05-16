const express = require("express");

const app = express();

app.get("/", (req, res) => {

  res.send("KENIOS SHOP ONLINE");

});

const PORT =
  process.env.PORT || 8080;

app.listen(PORT, () => {

  console.log(`✅ WEB ONLINE ${PORT}`);

});
