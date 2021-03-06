const inquirer = require("inquirer");
const fs = require("fs").promises;
const generatePage = require("./src/page-template.js");

const promptUser = () => {
  return inquirer.prompt([
    {
      type: "input",
      name: "name",
      message: "What is your name? (required)",
      validate: (nameInput) => {
        if (nameInput) {
          return true;
        } else {
          console.log("Please enter your name!");
          return false;
        }
      },
    },
    {
      type: "input",
      name: "github",
      message: "Enter your GitHub Username (required)",
      validate: (nameInput) => {
        if (nameInput) {
          return true;
        } else {
          console.log("Please enter your github username!");
          return false;
        }
      },
    },
    {
      type: "confirm",
      name: "confirmAbout",
      message:
        'Would you like to enter some information about yourself for an "About" section?',
      default: true,
    },

    {
      type: "input",
      name: "about",
      message: "Provide some information about yourself:",
      when: ({ confirmAbout }) => {
        if (confirmAbout) {
          return true;
        } else {
          return false;
        }
      },
    },
  ]);
};

const promptProject = (portfolioData) => {
  // If there's no 'projects' array property, create one
  if (!portfolioData.projects) {
    portfolioData.projects = [];
  }

  console.log(`
  =================
  Add a New Project
  =================
  `);
  return inquirer
    .prompt([
      {
        type: "input",
        name: "name",
        message: "What is the name of your project? (required)",
        validate: (nameInput) => {
          if (nameInput) {
            return true;
          } else {
            console.log("Please enter your project name!");
            return false;
          }
        },
      },
      {
        type: "input",
        name: "description",
        message: "Provide a description of the project (Required)",
        validate: (nameInput) => {
          if (nameInput) {
            return true;
          } else {
            console.log("Please enter your project description!");
            return false;
          }
        },
      },
      {
        type: "checkbox",
        name: "languages",
        message: "What did you build this project with? (Check all that apply)",
        choices: [
          "JavaScript",
          "HTML",
          "CSS",
          "ES6",
          "jQuery",
          "Bootstrap",
          "Node",
        ],
      },
      {
        type: "input",
        name: "link",
        message: "Enter the GitHub link to your project. (Required)",
        validate: (nameInput) => {
          if (nameInput) {
            return true;
          } else {
            console.log("Please enter your github project link!");
            return false;
          }
        },
      },
      {
        type: "confirm",
        name: "feature",
        message: "Would you like to feature this project?",
        default: false,
      },
      {
        type: "confirm",
        name: "confirmAddProject",
        message: "Would you like to enter another project?",
        default: false,
      },
    ])
    .then((projectData) => {
      portfolioData.projects.push(projectData);
      if (projectData.confirmAddProject) {
        return promptProject(portfolioData);
      } else {
        return portfolioData;
      }
    });
};

promptUser()
  .then(promptProject)
  .then((portfolioData) => {
    const pageHTML = generatePage(portfolioData);

    fs.writeFile("./dist/index.html", pageHTML)
      .then(() => {
        console.log("index.html created");

        fs.copyFile("./src/style.css", "./dist/style.css")
          .then(() => console.log("style sheet copied successfully"))
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  });

/*



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

*/
