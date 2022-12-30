import inquirer from "inquirer"
import fs from 'fs'
import process from "process";
import os from 'os'

export default function WordsGame() {
	// console.log();
	// fs.readFile(`${os.homedir()}/.config/miroka/DB/wordsDB_ru.txt`, 'utf-8', (error, data) => {

	// })
	inquirer
		.prompt([
			{
				type: "input",
				name: 'userWord',
				message: 'Ты первый. Твоё слово:'
			}
		])
		.then(answers => {
			console.log(0)
		})
}
