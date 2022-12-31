import chalk from "chalk";
import { createSpinner } from 'nanospinner'
import os from 'os';

import Greeting from "../Greeting/Greeting.js";

export default function OsSpecs() {

	const spinner = createSpinner()

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
		Greeting()
	}, 3000)
}