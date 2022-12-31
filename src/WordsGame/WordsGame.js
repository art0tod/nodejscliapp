import inquirer from "inquirer"
import fs from 'fs';
import os from 'os';

import Greeting from "../Greeting/Greeting.js";

export default function WordsGame() {
	inquirer
		.prompt([
			{
				type: "input",
				name: 'userWord',
				message: 'Ты первый. Твоё слово:'
			}
		])
		.then(answers => {
			fs.readFile(`${os.homedir()}/.config/miroka/DB/wordsDB_ru.txt`, 'utf-8', (error, data) => {
				console.log(data);
			})
		})
}
