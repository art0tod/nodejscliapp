#!/usr/bin/env node

//------npms-------
import chalk from 'chalk'
import inquirer from 'inquirer'
import clear from 'clear'
import fs from 'fs'
import os, { userInfo } from 'os'

//--------myComponents-------
import Greeting from '../Greeting/Greeting.js'

export default function App() {
	clear();

	console.log(chalk.bgWhite.black(' Скрипт работает ✅ '))
	const config = fs.existsSync(`${os.homedir()}/.config/miroka/conf.json`)

	function buildConf() {
		inquirer
			.prompt([
				{
					type: 'text',
					name: 'userName',
					message: 'Как к вам обращаться?',
					default: userInfo().username
				},
				{
					type: 'list',
					name: 'userLevel',
					message: 'Насколько хорошо ты умеешь пользоваться командной строкой?',
					choices: [
						'Пользователь 😵‍💫',
						'Программист 👩‍💻',
						'Линуксоид 😽'
					]
				}
			])
			.then(answers => {
				clear()
				console.log(`Вас зовут ${answers['userName']}\nВы ${answers['userLevel']}!`);
				Greeting()
			})
	}

	if (!config) {
		inquirer
			.prompt([
				{
					type: 'confirm',
					name: 'overwrite',
					message: 'Кажется файла с настроками ещё не существует. Создать его?',
					default: false
				}
			])
			.then(answers => {
				if (answers.overwrite) {
					buildConf()
				} else {
					Greeting()
				}
			})
	} else {
		Greeting()
	}
}
