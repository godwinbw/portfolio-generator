const fs = require("fs").promises;
const generatePage = require("./src/page-template.js");

const profileDataArgs = process.argv.slice(2, process.argv.length);

const [name, github] = profileDataArgs;

fs.writeFile("index.html", generatePage(name, github))
  .then(() =>
    console.log("Portolio complete! Check out index.html to see the results")
  )
  .catch((err) => {
    console.log("we had an error");
    console.log(err);
  });
