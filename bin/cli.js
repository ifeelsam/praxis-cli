#!/usr/bin/env node
import chalk from 'chalk';
import fs from 'fs-extra';
import { fileURLToPath } from 'url';
import path from 'path';
import { program } from 'commander';
import inquirer from 'inquirer';
import replace from 'replace-in-file';
import { execSync } from 'child_process'; // Changed from require

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const templatePath = path.join(__dirname, '..', 'template');

// Add validation
if (!fs.existsSync(templatePath)) {
  console.log(templatePath);
  throw new Error(`Template not found at: ${templatePath}`);
}

program
  .argument('[project-name]', 'name of your project')
  .option('--install', 'install dependencies automatically')
  .action(async (projectName, options) => {
    try {
      const answers = await inquirer.prompt([
        {
          type: 'input',
          name: 'projectName',
          message: 'Project name:',
          default: projectName || 'ivy-app',
          validate: input => !!input.trim() || 'Project name is required'
        },
        {
          type: 'confirm',
          name: 'install',
          message: 'Install dependencies?',
          default: options.install || false
        },
        {
          type: 'confirm',
          name: 'git',
          message: 'Initialize git repository?',
          default: true
        }
      ]);

      const targetPath = path.join(process.cwd(), answers.projectName);

      if (fs.existsSync(targetPath)) {
        const { overwrite } = await inquirer.prompt({
          type: 'confirm',
          name: 'overwrite',
          message: 'Directory exists. Overwrite?',
          default: false
        });
        if (!overwrite) process.exit(1);
        fs.removeSync(targetPath);
      }

      console.log(chalk.blue('Copying template...'));
      fs.copySync(templatePath, targetPath);

      // Replace template variables
      await replace({
        files: path.join(targetPath, '**', '*'),
        from: /{{APP_NAME}}/g,
        to: answers.projectName
      });
      /// In your cli.js replace config
      await replace({
        files: [
          path.join(targetPath, '**', '*.{js,jsx,ts,tsx,html,md,json}'),
          path.join(targetPath, '*.{js,jsx,ts,tsx,html,md,json}')
        ],
        from: /{{\s*APP_NAME\s*}}/g,  // More flexible regex
        to: answers.projectName
      });
      await replace({
        files: [
          path.join(targetPath, '**', '*.{js,jsx,ts,tsx,html,md,json}'),
          path.join(targetPath, '*.{js,jsx,ts,tsx,html,md,json}')
        ],
        from: /{{\s*APP_NAME\s*}}/g,  // More flexible regex
        to: answers.projectName
      });
      // Update package.json name - Changed from require()
      const packageJsonPath = path.join(targetPath, 'package.json');
      const pkg = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));
      pkg.name = answers.projectName;
      fs.writeFileSync(packageJsonPath, JSON.stringify(pkg, null, 2));

      if (answers.git) {
        console.log(chalk.blue('Initializing git repository...'));
        execSync('git init', { cwd: targetPath }); // Changed from require
      }

      if (answers.install) {
        console.log(chalk.blue('Installing dependencies...'));
        execSync('npm install', { // Changed from require
          cwd: targetPath,
          stdio: 'inherit'
        });
      }

      console.log(chalk.green('\nDone! Next steps:'));
      console.log(chalk.cyan(`cd ${answers.projectName}`));
      if (!answers.install) console.log(chalk.cyan('npm install'));
      console.log(chalk.cyan('npm start\n'));
    } catch (error) {
      console.error(chalk.red(error.message));
      process.exit(1);
    }
  });

program.parse();
