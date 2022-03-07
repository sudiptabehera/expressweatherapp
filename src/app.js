const express = require("express");
const { isAbsolute } = require("path");
const hbs = require("hbs");

const path = require("path");
const app = express();
const port = process.env.PORT || 7890;
const static_path = path.join(__dirname, "../public");
const template_path = path.join(__dirname, "../templates/views");
const partials_path = path.join(__dirname, "../templates/partials");
app.set("view engine", "hbs");
app.set("views", template_path);
hbs.registerPartials(partials_path);
app.use(express.static(static_path));

app.get("", (req, res) => {
  res.render("index");
});
app.get("/about", (req, res) => {
  // res.send("Welcome to ABOUT US page of Sudipta Tech Aminity!");
  res.render("about");
});
app.get("/weather", (req, res) => {
  res.render("weather");
});
app.get("*", (req, res) => {
  res.render("404error",{
    errorMsg:"Page not Found"
  });
});
app.listen(port, () => {
  console.log(`Arrey tu ${port} pe bol, me sunungi teri!`);
});
