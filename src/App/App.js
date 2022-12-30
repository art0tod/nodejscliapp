#!/usr/bin/env node

//------npms-------
import chalk from 'chalk'
import inquirer from 'inquirer'
import gradient from 'gradient-string'
import chalkAnimation from 'chalk-animation'
import figlet from 'figlet'
import { createSpinner } from 'nanospinner'
import clear from 'clear'
import fs from 'fs'
import os, { userInfo } from 'os'
import { exit } from 'process'

//--------myComponents-------
import WordsGame from '../WordsGame/WordsGame.js'

export default function App() {

	const spinner = createSpinner()

	clear();
	// console.log(os.userInfo());
	console.log(chalk.bgWhite.black(' Скрипт работает ✅ '))
	const config = fs.existsSync(`${os.homedir()}/.config/miroka/conf.json`)

	function greeting() {
		clear()
		inquirer
			.prompt([
				{
					type: 'rawlist',
					name: 'firstChoice',
					message: 'Привет! Нужна помощь?',
					choices: [
						'Расскажи что-нибудь про мой комп.',
						'Мне надо выйти.',
						'Как дела?',
						'Давай поиграем.'
					]
				}
			])
			.then(answers => {
				if (answers.firstChoice === 'Расскажи что-нибудь про мой комп') {
					clear()
					console.log(chalk.magenta('Характеристики вашего компьютера:\n'));
					osSpecs()
				}
				if (answers.firstChoice === 'Мне надо выйти') {
					fs.readFile(`${os.homedir()}/.config/miroka/content/bye.txt`, 'utf-8', (error, data) => {
						clear()
						console.log(chalk.magenta(data))
					})
				}
				if (answers.firstChoice === 'Давай поиграем.') {
					clear()
					console.log(chalk.magenta('Играем в слова:\n'));
					WordsGame()
				}
			})
	}

	function osSpecs() {
		console.log(chalk.magenta('Архитектура процессора:'), chalk.yellow(os.arch()))
		console.log(chalk.magenta('Количество ядер процессора:'), chalk.yellow(os.cpus().length));
		// console.log(os.freemem())
		// console.log(os.hostname())
		// console.log(os.machine())
		// console.log(os.networkInterfaces())
		// console.log(os.platform())
		// console.log(os.release())
		// console.log(os.totalmem())
		// console.log(os.type())
		// console.log(os.uptime())
		spinner.start()
		setTimeout(() => {
			spinner.success()
			greeting()
		}, 3000)
	}

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
				greeting()
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
					greeting()
				}
			})
	} else {
		greeting()
	}
}
