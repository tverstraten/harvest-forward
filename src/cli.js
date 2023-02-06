#!/usr/bin/env node
/* eslint-disable @typescript-eslint/explicit-function-return-type */

function outputUsage() {
	console.log(`Usage: node index.js <options>

Options:

-h: show help on usage of the application (this)
-l=<setting>
or -logging=<setting>: a JSON string of settings for logging. Each key is the name of a class and the value is the logging setting it should have. For example '{ "JavaScriptRunner": "debug"}' passed in as a string would set logging to debug for the class JavaScriptBuilder
-c=<setting>
or -config=<setting>: Specific the name of the configuration file to load rather than the defaults. By default the files .hfrc, .hf.json, .hfrc.json are loaded one by one in that order. If this setting is enable none of those files will be loaded`)
}

function setLogLevels(rawSetting) {
	let finalSetting = rawSetting
	if (finalSetting.startsWith('"') && finalSetting.endsWith('"')) finalSetting = finalSetting.substring(1, finalSetting.length - 1)
	else if (finalSetting.startsWith("'") && finalSetting.endsWith("'")) finalSetting = finalSetting.substring(1, finalSetting.length - 1)

	process.env.LOG_LEVELS = finalSetting
}

// eslint-disable-next-line spellcheck/spell-checker
process.argv.forEach((argument) => {
	if (argument === '-h') outputUsage()
	else if (argument.startsWith('-logging=')) setLogLevels(argument.substring(9))
	else if (argument.startsWith('-l=')) setLogLevels(argument.substring(3))
})

import { ConfigurationManager } from './runtime/ConfigurationManager'
import { RuntimeBuilder } from './runtime/RuntimeBuilder'
import { System } from './system/System'
import { Logging } from '@tverstraten/log-annotations'

async function run(cliArguments) {
	var logger = Logging.newLogger('hf')
	var configurationFileName
	cliArguments.forEach((argument) => {
		if (argument.startsWith('-config=')) {
			configurationFileName = argument.substring(8)
			logger.debug(`configurationFileName set to ${configurationFileName}`)
		} else if (argument.startsWith('-c=')) {
			configurationFileName = argument.substring(3)
			logger.debug(`configurationFileName set to ${configurationFileName}`)
		}
	})
	const configuration = configurationFileName
		? await ConfigurationManager.registerConfigurationFile(configurationFileName, `${configurationFileName}`)
		: await ConfigurationManager.register()

	if (configuration) {
		const system = new System(configuration.name)
		const builder = new RuntimeBuilder(system, configuration.configuration)
		logger.info(`Building ${JSON.stringify(system)}`)
		logger.debug(`Build configuration: ${JSON.stringify(configuration.configuration)}`)
		await builder.build(system)
	} else if (configurationFileName) {
		logger.info(`Specified system configuration ${configurationFileName} was not found`)
	} else {
		logger.info('No system configuration specified or found')
	}
}

;(async () => {
	try {
		// eslint-disable-next-line spellcheck/spell-checker
		run(process.argv)
	} catch (problem) {
		console.log(problem)
	}
})()
