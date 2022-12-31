import clear from "clear";
import inquirer from "inquirer"
import say from "say";
import { createSpinner } from 'nanospinner'
import os from 'os'

import Greeting from "../Greeting/Greeting.js";

export default function Say() {

	const spinner = createSpinner()

	inquirer
		.prompt([
			{
				type: 'input',
				name: 'userWord',
				message: 'Что мне сказать?:',
				default: '...'
			}
		])
		.then(answers => {
			spinner.start()
			say.speak(answers.userWord)
			spinner.success()
			Greeting()
		})
}
