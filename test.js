const mongoose = require("mongoose");

mongoose
  .connect(
    "PASTE_CONNECTION_STRING_DI_SINI"
  )
  .then(() => {
    console.log("Connected");
    process.exit();
  })
  .catch((err) => {
    console.error(err);
    process.exit();
  });