import { Level } from '@tverstraten/log-annotations'
import fs from 'fs'
import * as sh from 'shelljs'
import ts, { createSourceFile, ScriptKind, ScriptTarget } from 'typescript'
import { AbstractSingularBuilder } from '../../runtime/AbstractSingularBuilder'
import { ConfigurationParameter } from '../../runtime/ConfigurationParameter'
import { Artifact } from '../../system/Artifact'
import { System } from '../../system/System'
import { SystemComponent } from '../../system/SystemComponent'
import { ValueType } from '../../system/ValueType'

export abstract class AbstractTypeScriptAstHarvester extends AbstractSingularBuilder {
	protected fileNameRegex: RegExp

	protected classNameRegex: RegExp

	private regexSet = false

	constructor(description: string, configurationParameters: { [key: string]: ConfigurationParameter }, configurationValues?: { [key: string]: any }) {
		super(
			description,
			{
				...configurationParameters,
				sourcePath: {
					name: 'Source Path',
					required: true,
					description: 'The path to where the source files are located',
					valueType: ValueType.string,
				},
				fileNamePattern: {
					name: 'File Name pattern',
					required: true,
					description: 'A regex used against the file name to determine if it should be included in the harvesting',
					valueType: ValueType.string,
					defaultValue: '.*',
				},
				classNamePattern: {
					name: 'Class Name pattern',
					required: true,
					description: 'A regex used against the non-qualified class name to determine if it should be included in the harvesting',
					valueType: ValueType.string,
					defaultValue: '.*',
				},
			},
			configurationValues
		)
		this.fileNameRegex = new RegExp('.*')
		this.classNameRegex = new RegExp('.*')
	}

	protected ensureRegexes(): void {
		if (!this.regexSet) {
			this.fileNameRegex = new RegExp(this.getConfiguredValue('fileNamePattern'))
			this.classNameRegex = new RegExp(this.getConfiguredValue('classNamePattern'))
			this.regexSet = true
		}
	}

	protected validFile(fileName: string): boolean {
		return this.fileNameRegex.test(fileName)
	}

	protected validClass(className: string): boolean {
		return this.classNameRegex.test(className)
	}

	abstract harvestFromAst(system: System, ast: ts.SourceFile): Promise<Artifact[]>

	async harvestFromFile(system: System, filePath: string, fileName: string): Promise<Artifact[]> {
		// parse them out
		try {
			const fileAndPath = `${filePath}/${fileName}`
			let result
			let realPath
			try {
				// eslint-disable-next-line spellcheck/spell-checker
				realPath = fs.realpathSync(fileAndPath)
			} catch (problem) {
				const cwd = await sh.pwd()
				// eslint-disable-next-line spellcheck/spell-checker
				realPath = fs.realpathSync(`${cwd}/${fileAndPath}`)
			}
			this.logger.isLevelEnabled(Level.debug) ? this.logger.debug(`harvestFromFile(${this.name}) loading ${realPath}`) : ''

			const stats = await fs.promises.stat(fileAndPath)
			if (stats.isDirectory()) {
				this.logger.isLevelEnabled(Level.debug) ? this.logger.debug(`harvestFromFile(${fileAndPath}) skipping directory`) : ''
				result = [] as Artifact[]
			} else {
				const sourceText = await fs.promises.readFile(fileAndPath)

				const ast = createSourceFile(fileName, sourceText.toString(), ScriptTarget.Latest, false, ScriptKind.TS)
				result = await this.harvestFromAst(system, ast)
			}
			this.logger.isLevelEnabled(Level.debug) ? this.logger.debug(`harvestFromFile(${fileAndPath}) exit`) : ''
			return result
		} catch (problem) {
			this.logger.error(`harvestFromFile() failed ${problem}`)
			throw problem
		}
	}

	async _doesConfigurationWork(): Promise<boolean> {
		const sourcePath = this.getConfiguredValue('sourcePath')
		const result = fs.existsSync(sourcePath)
		if (!result) this.logger.error(`Configuration does not work, path [${sourcePath}] does not exist`)
		return result
	}

	async buildInternal(system: System, __component: SystemComponent): Promise<Artifact[]> {
		this.logger.isLevelEnabled(Level.debug) ? this.logger.debug(`buildInternal(${system.name}) enter`) : ''
		try {
			this.ensureRegexes()
			const result = [] as Artifact[]
			const sourcePath = this.getConfiguredValue('sourcePath')
			// eslint-disable-next-line spellcheck/spell-checker
			const fileNames = await fs.promises.readdir(sourcePath)
			const _thisThis = this

			const promises = [] as Promise<Artifact[]>[]
			fileNames.forEach((fileName) => {
				if (_thisThis.validFile(fileName)) {
					const promise = this.harvestFromFile(system, sourcePath, fileName)
					promises.push(promise)
				}
			})

			const promiseResults = await Promise.allSettled(promises)
			for (const promiseResultIndex in promiseResults) {
				const promiseResult = promiseResults[promiseResultIndex]
				if (promiseResult.status === 'fulfilled') {
					const artifacts = promiseResult.value
					result.concat(artifacts)
				}
			}

			this.logger.isLevelEnabled(Level.debug) ? this.logger.debug(`buildInternal(${system.name}) exit`) : ''
			return result
		} catch (problem) {
			this.logger.error(`buildInternal(${system.name}) failed ${problem}`)
			throw problem
		}
	}
}
