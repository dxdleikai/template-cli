#! /usr/bin/env node

const program = require("commander");
const fs = require("fs");
const simpleGit = require("simple-git");

const git = simpleGit();

// 动态导入 inquirer
(async () => {
  const inquirer = await import("inquirer");

  // 版本号
  program
    .version("0.0.1", "-v, --version")
    .command("init <projectName>")
    .action((projectName) => {
      const repositories = [
        {
          name: "React-Vite-TanstackRouter-Kuma-Antd",
          value:
            "https://github.com/dxdleikai/template-react-vite-tanstackRouter-kuma-antd.git",
        }
      ];

      if (fs.existsSync(projectName)) {
        console.error("Project already exists");
        return;
      }

      inquirer.default
        .prompt([
          {
            type: "list",
            name: "repository",
            message: "Select a template to download:",
            choices: repositories,
          },
        ])
        .then((answers) => {
          const repoUrl = answers.repository;
          console.log("Selected repository URL:", repoUrl);
          console.log("Cloning template...");
         
          git
            .clone(repoUrl, projectName, [], (err) => {
              if (err) {
                console.error("Error:", err);
              } else {
                console.log("Repository cloned successfully.");
              }
            }) ;
        });
    });

  program.parse(process.argv);
})();
