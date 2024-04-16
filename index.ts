#!/usr/bin/env node

import inquirer from "inquirer";
import chalk from "chalk";

let todoData = [];
while (true) {
    const todoApp = await inquirer.prompt([
        {
            name: "todoquestion",
            type: "input",
            message: "What task do you want to add to the todo list?"
        },
        {
            name: "todoadd",
            type: "list",
            message: "Do you want to add more tasks?",
            choices: ["yes", "no"]
        }
    ]);

    todoData.push(todoApp.todoquestion);

    if (todoApp.todoadd === "no") {
        break; // Break the loop if the user doesn't want to add more tasks
    }
}

console.log(chalk.yellow("Your todo list:"));
console.log(todoData);

// Editing and deleting tasks
while (true) {
    const editOrDelete = await inquirer.prompt([
        {
            name: "action",
            type: "list",
            message: "What do you want to do?",
            choices: ["Edit a task", "Delete a task", "Finish"]
        }
    ]);

    if (editOrDelete.action === "Finish") {
        break;
    }

    if (editOrDelete.action === "Edit a task") {
        const editTask = await inquirer.prompt([
            {
                name: "index",
                type: "input",
                message: "Enter the index of the task you want to edit (starting from 1):"
            },
            {
                name: "newTask",
                type: "input",
                message: "Enter the new task:"
            }
        ]);
        const index = parseInt(editTask.index) - 1;
        if (!isNaN(index) && index >= 0 && index < todoData.length) {
            todoData[index] = editTask.newTask;
        } else {
            console.log(chalk.red("Invalid index."));
        }
    } else if (editOrDelete.action === "Delete a task") {
        const deleteTask = await inquirer.prompt([
            {
                name: "index",
                type: "input",
                message: "Enter the index of the task you want to delete (starting from 1):"
            }
        ]);
        const index = parseInt(deleteTask.index) - 1;
        if (!isNaN(index) && index >= 0 && index < todoData.length) {
            todoData.splice(index, 1);
        } else {
            console.log(chalk.red("Invalid index."));
        }
    }

    console.log(chalk.yellow("Updated todo list:"));
    console.log(todoData);
}
