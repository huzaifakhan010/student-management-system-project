#! /usr/bin/env node 
import inquirer from "inquirer";
const randomNumber = Math.floor(10000 + Math.random() * 9000);
let myBalance = 0;
let answer = await inquirer.prompt([
    {
        name: "student",
        type: "input",
        message: "Enter student name:",
        validate: function (value) {
            if (value.trim() !== "") {
                return true;
            }
            return "Please enter a non-empty value.";
        },
    },
    {
        name: "courses",
        type: "list",
        message: "Select the course to enrolled ",
        choices: ["MS.Office", "HTML", "Javascript", "Typescript", "Python"],
    },
]);
const tutionFee = {
    "MS.Office": 2000,
    HTML: 1500,
    Javascript: 5000,
    Typescript: 5500,
    Python: 6000,
};
console.log(`\n tutionFees: ${tutionFee[answer.courses]}/-\n`);
console.log(`Balance:${myBalance}\n`);
let paymentType = await inquirer.prompt([
    {
        name: "payment",
        type: "list",
        message: "Select payment method",
        choices: ["Bank Transfer", "Easypaisa", "Jazzcash"],
    },
    {
        name: "amount",
        type: "input",
        message: "Transfer Money",
        validate: function (value) {
            if (value.trim() !== "") {
                return true;
            }
            return "Please enter a non-empty value.";
        },
    },
]);
console.log(`\nYou select payment method ${paymentType.payment}\n`);
const tutionFees = tutionFee[answer.courses];
const paymentAmount = parseFloat(paymentType.amount);
if (tutionFees === paymentAmount) {
    console.log(`Congratulations,You have successfully enrolled in ${answer.courses}.\n`);
    let ans = await inquirer.prompt([
        {
            name: "select",
            type: "list",
            message: "What would you like to do next?",
            choices: ["View Status", "Exit"],
        },
    ]);
    if (ans.select === "View Status") {
        console.log("\n******Status******\n");
        console.log(`Student Name: ${answer.student}`);
        console.log(`Student ID: ${randomNumber}`);
        console.log(`Course: ${answer.courses}`);
        console.log(`Tution Fees Paid: ${paymentAmount}`);
        console.log(`Balance: ${(myBalance += paymentAmount)}`);
    }
    else {
        console.log("\nExisting Student Management System\n");
    }
}
else {
    console.log("Invalid amount due to course\n");
}
