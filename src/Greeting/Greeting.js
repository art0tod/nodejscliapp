import inquirer from "inquirer";
import chalk from "chalk";
import os from 'os';
import clear from "clear";
import fs from 'fs';

import OsSpecs from "../OsSpecs/OsSpecs.js";
import WordsGame from "../WordsGame/WordsGame.js";
import Say from "../Say/Say.js";

export default function Greeting() {
	clear()

	inquirer
		.prompt([
			{
				type: 'list',
				name: 'firstChoice',
				message: 'Привет! Нужна помощь?',
				choices: [
					'Расскажи что-нибудь про мой комп.',
					'Повтори за мной!',
					'Давай поиграем. (в разработке)',
					'Мне надо выйти.'
				]
			}
		])
		.then(answers => {
			switch (answers.firstChoice) {
				case 'Расскажи что-нибудь про мой комп.': {
					clear()
					console.log(chalk.magenta('Характеристики вашего компьютера:\n'));
					OsSpecs()
					break
				}
				case 'Мне надо выйти.': {
					fs.readFile(`${os.homedir()}/.config/miroka/content/bye.txt`, 'utf-8', (error, data) => {
						clear()
						console.log(chalk.magenta(data))
					})

					break
				}
				case 'Давай поиграем. (в разработке)': {
					clear()
					console.log(chalk.magenta('Играем в слова:\n'));
					WordsGame()
					break
				}
				case 'Повтори за мной!': {
					clear()
					console.log(chalk.magenta('Я буду говорить всё что ты напишешь:\n'))
					Say()
					break
				}
				default: {
					Greeting()
					break
				}
			}
		})
}