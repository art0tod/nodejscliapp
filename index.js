#!/usr/bin/env node

import chalk from 'chalk'
import inquirer from 'inquirer'
import gradient from 'gradient-string'
import chalkAnimation from 'chalk-animation'
import figlet from 'figlet'
import { createSpinner } from 'nanospinner'
import clear from 'clear'
import fs, { existsSync } from 'fs'
import { log } from 'console'
import os, { userInfo } from 'os'
import path from 'path'

clear();
// console.log(os.userInfo());
console.log(chalk.bgWhite.black(' Скрипт работает ✅ '))

const Config = fs.existsSync('conf.json')

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
				type: 'rawlist',
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
		})
}

if (!Config) {
	inquirer
		.prompt([
			{
				type: 'confirm',
				name: 'overwrite',
				message: 'Кажется файла с настроками ещё не существует. Создать его?',
				default: true
			}
		])
		.then(answers => {
			if (answers.overwrite) {
				buildConf()
			} else {
				console.log('Пока 🫡');
			}
		})
} else {
	buildConf()
}
