import { Level, LogAction, LogAsyncMethod } from '@tverstraten/log-annotations'
import { Semaphore } from 'await-semaphore'
import fs from 'fs'
import Handlebars from 'handlebars'
import path from 'path'
import { AbstractSingularBuilder } from '../../runtime/AbstractSingularBuilder'
import { ConfigurationParameter } from '../../runtime/ConfigurationParameter'
import { TemplateFactory } from '../../runtime/TemplateFactory'
import { Artifact } from '../../system/Artifact'
import { FileArtifact } from '../../system/FileArtifact'
import { System } from '../../system/System'
import { SystemComponent } from '../../system/SystemComponent'
import { ValueType } from '../../system/ValueType'
import { LanguageHelpers } from './LanguageHelpers'
import { MiscHelpers } from './MiscHelpers'
import { StringHelpers } from './StringHelpers'
import { WordHelpers } from './WordHelpers'

/**
 * TODO: insertion into specific points in a file
 * TODO: need a way other than a function to produce a dynamic name
 * TODO: include files.
 */
export class HandlebarsGenerator extends AbstractSingularBuilder {
	private static helpersRegistered = false

	private static templatePathParameterDefinition = {
		name: 'Template Path',
		required: true,
		description: 'The url to the template that is to generate',
		valueType: ValueType.string,
		defaultValue: ``,
	} as ConfigurationParameter

	private static templateNameParameterDefinition = {
		name: 'The name of a template registered with a plugin',
		required: true,
		description:
			'The name of the template to use. This is specified in plugins and the full name is the plugin name, forward slash, template name. For example builtIn/handlebars/SystemAsJson',
		valueType: ValueType.string,
		defaultValue: ``,
	} as ConfigurationParameter

	private static targetPathParameterDefinition = {
		name: 'Target Path',
		required: true,
		description: 'The path to where the output is placed',
		valueType: ValueType.string,
	} as ConfigurationParameter

	private static fileNamePatternParameterDefinition = {
		name: 'File Name Pattern',
		required: true,
		description:
			'A pattern used to determine the name of the file to write to. The generator will replace an occurrence of %n with the name of the current object',
		valueType: ValueType.string,
		defaultValue: '%n.ts',
	} as ConfigurationParameter

	private static fileNameFunctionParameterDefinition = {
		name: 'File Name Function',
		required: false,
		description:
			'A Javascript function that is given the evaluation object and returns a string representing the name of the file that should be created. If this is present, it takes precedence of FileNamePattern',
		valueType: ValueType.string,
	} as ConfigurationParameter

	private static repeatForParameterDefinition = {
		name: 'Repeat for',
		required: true,
		description:
			'A parsable string of JSON that represents the properties values of the component that should be iterated on, review the documentation for SystemDescendantComponent and derivations for most available for use',
		valueType: ValueType.object,
		defaultValue: ``,
	} as ConfigurationParameter

	private static overwriteParameterDefinition = {
		name: 'Over write',
		required: true,
		description: 'Write over any existing file',
		valueType: ValueType.boolean,
		defaultValue: true,
	} as ConfigurationParameter

	constructor(configurationValues?: Record<string, any>) {
		super(
			'A generator that uses a handlebar template and the system definition to produce artifacts',
			{
				templatePath: HandlebarsGenerator.templatePathParameterDefinition,
				templateName: HandlebarsGenerator.templateNameParameterDefinition,
				targetPath: HandlebarsGenerator.targetPathParameterDefinition,
				fileNamePattern: HandlebarsGenerator.fileNamePatternParameterDefinition,
				fileNameFunction: HandlebarsGenerator.fileNameFunctionParameterDefinition,
				repeatFor: HandlebarsGenerator.repeatForParameterDefinition,
				overwrite: HandlebarsGenerator.overwriteParameterDefinition,
			},
			configurationValues
		)
	}

	@LogAsyncMethod()
	protected async getTemplateBody(): Promise<string> {
		const templateName = this.getConfiguredValue('templateName')
		return templateName ? TemplateFactory.getTemplate(templateName) : fs.readFileSync(this.getConfiguredValue('templatePath'), 'utf-8')
	}

	protected async _doesConfigurationWork(): Promise<boolean> {
		const templateBody = this.getTemplateBody()
		if (!templateBody) {
			const templateName = this.getConfiguredValue('templateName')
			if (templateName) this.logger.error(`_doesConfigurationWork() could not load registered template ${templateName}`)
			else {
				const templatePath = this.getConfiguredValue('templatePath')
				this.logger.error(`_doesConfigurationWork() could not load template from file ${templatePath}`)
			}
			return false
		}

		// is it for a single file?
		const repeatForString = this.getConfiguredValue('repeatFor')
		const targetPath = this.getConfiguredValue('targetPath')
		if (repeatForString != null && repeatForString != 0) {
			// no, its repetitive, the targetPath is a directory make sure the directory exist
			if (!fs.existsSync(targetPath)) {
				this.logger.error(`_doesConfigurationWork(${targetPath}) does not exist`)
				return false
			}
		} else {
			// its not repetitive so targetPath is a file which may be there but the directory must exist
			const directory = path.dirname(targetPath)
			if (!fs.existsSync(directory)) {
				this.logger.error(`_doesConfigurationWork(${targetPath}) does not exist`)
				return false
			}
		}
		return true
	}

	protected async registerHelpers(): Promise<void> {
		const semaphore = new Semaphore(10)
		const release = await semaphore.acquire()
		try {
			if (HandlebarsGenerator.helpersRegistered) return

			LanguageHelpers.registerAll()
			WordHelpers.registerAll()
			StringHelpers.registerAll()
			MiscHelpers.registerAll()

			// register the helpers from handlebars-helpers
			// eslint-disable-next-line @typescript-eslint/no-var-requires
			const handlebars = require('handlebars-helpers')()
			for (const helperKey in handlebars) {
				const helper = handlebars[helperKey]
				Handlebars.registerHelper(helperKey, helper)
			}

			HandlebarsGenerator.helpersRegistered = true
		} finally {
			release()
		}
	}

	@LogAsyncMethod([LogAction.exception])
	private async performTemplate(template: any, source: any, fullTargetPath: string, options: any): Promise<any> {
		if (this.logger.isLevelEnabled(Level.debug)) {
			const templateName = this.getConfiguredValue('templateName')
			const templatePath = this.getConfiguredValue('templatePath')
			this.logger.debug(`performTemplate(${templateName ? templateName : templatePath}, ${fullTargetPath}) enter`)
		}

		const newContent = template(source, options)
		if (fs.existsSync(fullTargetPath)) await fs.promises.unlink(fullTargetPath)
		await fs.promises.writeFile(fullTargetPath, newContent, {
			encoding: 'utf8',
			flag: 'wx',
			mode: 0o666,
		})
	}

	private getFileName(targetPath: string, fileNamePattern: string, fileNameFunctionAsString: string, systemObject: any): string {
		let fileName
		if (fileNameFunctionAsString != null) {
			try {
				const fileNameFunction = eval(fileNameFunctionAsString)
				const nominalName = fileNameFunction(systemObject)
				if (systemObject instanceof System) fileName = `${targetPath}`
				else fileName = `${targetPath}/${nominalName}`
			} catch (problem) {
				this.logger.error(`buildInternal(${this.name}) could not generate file name ${problem}`)
				throw problem
			}
		} else {
			if (systemObject instanceof System) fileName = `${targetPath.replace('%n', systemObject.name)}`
			else fileName = `${targetPath}/${fileNamePattern.replace('%n', systemObject.name)}`
		}

		return fileName
	}

	protected getIdString(): string {
		const templateName = this.getConfiguredValue('templateName')
		const templatePath = this.getConfiguredValue('templatePath')
		return `${templateName ? templateName : templatePath}`
	}

	@LogAsyncMethod([LogAction.exception])
	protected async buildInternal(__system: System, component: SystemComponent): Promise<Artifact[]> {
		const templateBody = await this.getTemplateBody()
		const targetPath = this.getConfiguredValue('targetPath')
		const overwrite = this.getConfiguredValue('overwrite')
		const fileNamePattern = this.getConfiguredValue('fileNamePattern')
		const fileNameFunction = this.getConfiguredValue('fileNameFunction')

		await this.registerHelpers()
		const template = await Handlebars.compile(templateBody, {
			noEscape: true,
		})

		const options = { allowProtoPropertiesByDefault: true }

		const fileName = this.getFileName(targetPath, fileNamePattern, fileNameFunction, component)
		if (overwrite || !fs.existsSync(fileName)) await this.performTemplate(template, component, fileName, options)

		return [new FileArtifact(fileName, targetPath)]
	}
}
