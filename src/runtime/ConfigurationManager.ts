import { Semaphore } from 'await-semaphore'
import fs from 'fs'
import * as applicationArchitecture from '../plugins/application-architecture'
import * as handlebars from '../plugins/handlebars'
import * as javaScriptRunner from '../plugins/javascriptRunner'
import * as javaScriptBase from '../plugins/javascript'
import * as nodeRunner from '../plugins/nodeRunner'
import * as npmRunner from '../plugins/npmRunner'
import * as rdbmsBasic from '../plugins/rdbms-basic'
import * as rest from '../plugins/rest'
import * as typescriptBase from '../plugins/typescript'
import * as typescriptBuilder from '../plugins/typescript-builder'
import * as validation from '../plugins/validation'
import { ProgrammingLanguage } from '../system/ProgrammingLanguage'
import { ValueType } from '../system/ValueType'
import { Level, LogAsyncMethod } from '@tverstraten/log-annotations'
import { LogMethod } from '@tverstraten/log-annotations'
import { BuilderConfiguration } from './BuilderConfiguration'
import { BuilderFactory } from './BuilderFactory'
import { Logging } from '@tverstraten/log-annotations'
import { TemplateFactory } from './TemplateFactory'

export class ConfigurationManager {
	private static plugInsRegistered = false

	// eslint-disable-next-line spellcheck/spell-checker
	private static defaultConfigurationFileNames = ['.hfrc', '.hf.json', '.hfrc.json']

	static logger = Logging.newLogger(ConfigurationManager.name)

	private static registerConfigurationModuleBuilder(pluginName: string, builders: any): void {
		if (builders) {
			Object.keys(builders).forEach((builderName) => {
				const builderFullName = `${pluginName}/${builderName}`
				const factoryMethod = builders[builderName]
				BuilderFactory.registerBuilder(builderFullName, factoryMethod)
			})
		}
	}

	private static registerConfigurationModuleTemplates(pluginName: string, templates: any): void {
		if (templates) {
			Object.keys(templates).forEach((templateName) => {
				const templateDetails = templates[templateName]
				const templateType = templateDetails.type
				const templateContent = templateDetails.contents
				const templateFullName = `${templateType}/${pluginName}/${templateName}`
				TemplateFactory.registerTemplate(templateFullName, templateContent)
			})
		}
	}

	static registerConfigurationModuleTypeResolvers(typeResolvers: any): void {
		if (typeResolvers) {
			Object.keys(typeResolvers).forEach((languageName) => {
				const resolver = typeResolvers[languageName]
				const language = ProgrammingLanguage.fromName(languageName)
				ValueType.install(language, resolver)
			})
		}
	}

	@LogMethod()
	static registerConfigurationByModule(path: string, module: any): void {
		const pluginName = module['name'] ? module['name'] : path
		this.registerConfigurationModuleBuilder(pluginName, module['builders'])
		this.registerConfigurationModuleBuilder(pluginName, module['BUILDERS'])
		this.registerConfigurationModuleTemplates(pluginName, module['templates'])
		this.registerConfigurationModuleTemplates(pluginName, module['TEMPLATES'])
		this.registerConfigurationModuleTypeResolvers(module['typeResolvers'])
		this.registerConfigurationModuleTypeResolvers(module['TYPE_RESOLVERS'])
	}

	@LogAsyncMethod()
	static async registerConfigurationByPath(path: string): Promise<void> {
		if (!path) throw RangeError('path was not provided')
		const module = await import(path)
		ConfigurationManager.registerConfigurationByModule(path, module)
	}

	static async registerPluginList(configurationName: string, pluginList: any[]): Promise<void> {
		const promises = [] as Promise<any>[]
		;(pluginList as string[]).forEach((plugInPath) => {
			this.logger.isLevelEnabled(Level.debug) ? this.logger.debug(`registerConfigurationFile(${configurationName}) found ${plugInPath}`) : ''
			promises.push(ConfigurationManager.registerConfigurationByPath(plugInPath))
		})
		const promiseResults = await Promise.allSettled(promises)
		promiseResults.forEach((promiseResult) => {
			if (promiseResult.status === 'rejected') {
				throw promiseResult.reason
			}
		})
	}

	@LogAsyncMethod()
	static async registerConfigurationFile(
		configurationName: string,
		configurationFullPath: string
	): Promise<void | { name: string; configuration: BuilderConfiguration }> {
		// eslint-disable-next-line spellcheck/spell-checker
		const realConfigFilePath = fs.realpathSync(configurationFullPath)
		this.logger.isLevelEnabled(Level.info) ? this.logger.info(`registerConfigurationFile() loading ${realConfigFilePath}`) : ''
		const configurationBodyText = fs.readFileSync(realConfigFilePath, 'utf-8')
		const configurationBody = JSON.parse(configurationBodyText)
		const pluginList = configurationBody['plugins']
		if (pluginList) await this.registerPluginList(configurationName, pluginList)

		// system name, system configuration
		const systemName = configurationBody['name']
		const systemConfiguration = configurationBody['configuration']

		if (systemName || systemConfiguration)
			return { name: systemName ? systemName : configurationName, configuration: systemConfiguration ? systemConfiguration : {} }
	}

	private static registerPotentialPluginFile(
		cwd: string,
		configFileName: string
	): Promise<any | { name: string; configuration: BuilderConfiguration }> | undefined {
		const fullFileName = `${cwd}/${configFileName}`
		let exists
		try {
			this.logger.isLevelEnabled(Level.debug) ? this.logger.debug(`registerPlugins() checking for ${fullFileName}`) : ''
			fs.statSync(fullFileName)
			exists = true
		} catch (problem) {
			exists = false
		}

		if (exists) return ConfigurationManager.registerConfigurationFile(configFileName, fullFileName)
	}

	private static registerIncludedPlugins(): void {
		// core functional
		ConfigurationManager.registerConfigurationByModule('builtIn/handlebars', handlebars)
		ConfigurationManager.registerConfigurationByModule('builtIn/nodeRunner', nodeRunner)
		ConfigurationManager.registerConfigurationByModule('builtIn/npmRunner', npmRunner)
		ConfigurationManager.registerConfigurationByModule('builtIn/javascriptRunner', javaScriptRunner)
		ConfigurationManager.registerConfigurationByModule('builtIn/typescriptBuilder', typescriptBuilder)

		// languages
		ConfigurationManager.registerConfigurationByModule('builtIn/javascript', javaScriptBase)
		ConfigurationManager.registerConfigurationByModule('builtIn/typescript', typescriptBase)

		// structural
		ConfigurationManager.registerConfigurationByModule('builtIn/applicationArchitecture', applicationArchitecture)
		ConfigurationManager.registerConfigurationByModule('builtIn/rdbmsBasic', rdbmsBasic)
		ConfigurationManager.registerConfigurationByModule('builtIn/rest', rest)
		ConfigurationManager.registerConfigurationByModule('builtIn/validation', validation)
	}

	@LogAsyncMethod()
	static async registerPlugins(
		configurationFileNames = ConfigurationManager.defaultConfigurationFileNames
	): Promise<void | { name: string; configuration: BuilderConfiguration }> {
		if (ConfigurationManager.plugInsRegistered) return
		const semaphore = new Semaphore(10)
		const release = await semaphore.acquire()
		try {
			ConfigurationManager.registerIncludedPlugins()
			const promises = [] as Promise<any>[]
			for (const entry in configurationFileNames) {
				const promise = ConfigurationManager.registerPotentialPluginFile(process.cwd(), configurationFileNames[entry])
				if (promise) promises.push(promise)
			}
			const promiseResults = await Promise.allSettled(promises)
			let configurationFound
			promiseResults.forEach((promiseResult) => {
				if (promiseResult.status === 'rejected') throw promiseResult.reason
				else configurationFound = promiseResult.value
			})
			ConfigurationManager.plugInsRegistered = true
			return configurationFound
		} finally {
			release()
		}
	}

	static async register(): Promise<void | { name: string; configuration: BuilderConfiguration }> {
		return ConfigurationManager.registerPlugins()
	}
}
