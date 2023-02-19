import { Level } from '@tverstraten/log-annotations'
import ejs from 'ejs'
import fs from 'fs'
import path from 'path'
import * as sh from 'shelljs'
import { AbstractSingularBuilder } from '../../../runtime/AbstractSingularBuilder'
import { Artifact } from '../../../system/Artifact'
import { FileArtifact } from '../../../system/FileArtifact'
import { System } from '../../../system/System'
import { SystemComponent } from '../../../system/SystemComponent'
import { ValueType } from '../../../system/ValueType'

export class EjsGenerator extends AbstractSingularBuilder {
	// eslint-disable-next-line max-lines-per-function
	constructor(configurationValues?: { [key: string]: any }) {
		super(
			'A generator that uses an ejs template and the system definition to produce artifacts',
			{
				templatePath: {
					name: 'Template Path',
					required: true,
					description: 'The url to the template that is to generate',
					valueType: ValueType.string,
				},
				targetPath: {
					name: 'Target Path',
					required: true,
					description: 'The path to where the output is placed',
					valueType: ValueType.string,
				},
				fileNamePattern: {
					name: 'File Name Pattern',
					required: true,
					description:
						'A pattern used to determine the name of the file to write to. The generator will replace an occurrence of %n with the name of the current object',
					valueType: ValueType.string,
					defaultValue: '%n.ts',
				},
				// TODO: need a way other than a function to produce a dynamic name
				fileNameFunction: {
					name: 'File Name Function',
					required: false,
					description:
						'A Javascript function that is given the evaluation object and returns a string representing the name of the file that should be created. If this is present, it takes precedence of FileNamePattern',
					valueType: ValueType.string,
				},
				repeatFor: {
					name: 'Repeat for',
					required: true,
					description:
						'A parsable string of JSON that represents the properties values of the component that should be iterated on, review the documentation for SystemDescendantComponent and derivations for most available for use',
					valueType: ValueType.string,
					defaultValue: ``,
				},
				overwrite: {
					name: 'Over write',
					required: true,
					description: 'Write over any existing file',
					valueType: ValueType.boolean,
					defaultValue: true,
				},
			},
			configurationValues
		)
	}

	protected async _doesConfigurationWork(): Promise<boolean> {
		const templatePath = this.getConfiguredValue('templatePath')
		if (!fs.existsSync(templatePath)) {
			this.logger.error(`_doesConfigurationWork(${templatePath}) does not exist`)
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

	private async performTemplate(template: any, source: any, fullTargetPath: string): Promise<any> {
		try {
			this.logger.isLevelEnabled(Level.debug) ? this.logger.debug(`performTemplate(.., .., ${fullTargetPath}) enter`) : ''
			const newContent = ejs.render(template, source)
			if (fs.existsSync(fullTargetPath)) await fs.promises.unlink(fullTargetPath)
			await fs.promises.writeFile(fullTargetPath, newContent, {
				encoding: 'utf8',
				flag: 'wx',
				mode: 0o666,
			})
			this.logger.isLevelEnabled(Level.debug) ? this.logger.debug(`performTemplate(.., .., ${fullTargetPath}) exit`) : ''
		} catch (problem) {
			this.logger.error(`performTemplate(.., .., ${fullTargetPath})  failed ${problem}`)
			throw problem
		}
	}

	getFileName(targetPath: string, fileNamePattern: string, fileNameFunctionText: string, systemObject: any): string {
		let fileName
		if (fileNameFunctionText != null) {
			try {
				const fileNameFunction = eval(fileNameFunctionText)
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

	protected async buildInternal(__system: System, component: SystemComponent): Promise<Artifact[]> {
		try {
			const templatePath = this.getConfiguredValue('templatePath')
			this.logger.isLevelEnabled(Level.debug) ? this.logger.debug(`buildInternal(${templatePath}) enter`) : ''
			const targetPath = this.getConfiguredValue('targetPath')
			const overwrite = this.getConfiguredValue('overwrite')
			const fileNamePattern = this.getConfiguredValue('fileNamePattern')
			const fileNameFunction = this.getConfiguredValue('fileNameFunction')

			const cwd = await sh.pwd()
			// eslint-disable-next-line spellcheck/spell-checker
			const realPath = fs.realpathSync(`${cwd}/${templatePath}`)
			this.logger.isLevelEnabled(Level.debug) ? this.logger.debug(`buildInternal(${templatePath}) loading ${realPath}`) : ''

			const templateBody = await fs.readFileSync(templatePath, 'utf-8')
			const fileName = this.getFileName(targetPath, fileNamePattern, fileNameFunction, component)
			if (overwrite || !fs.existsSync(fileName)) await this.performTemplate(templateBody, component, fileName)

			this.logger.isLevelEnabled(Level.debug) ? this.logger.debug(`buildInternal(${this.name}) exit`) : ''
			return [new FileArtifact(fileName, targetPath)]
		} catch (problem) {
			this.logger.error(`buildInternal(${this.name}) failed ${problem}`)
			throw problem
		}
	}
}
