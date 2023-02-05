import ts from 'typescript'
// eslint-disable-next-line spellcheck/spell-checker
import * as tsnode from 'ts-node'
import * as fs from 'fs'
import { AbstractSingularBuilder } from '../../runtime/AbstractSingularBuilder'
import { ValueType } from '../../system/ValueType'
import { System } from '../../system/System'
import { SystemComponent } from '../../system/SystemComponent'
import { Artifact } from '../../system/Artifact'
import { LogAsyncMethod } from '@tverstraten/log-annotations'
import { Builder } from '../../runtime/Builder'

export class TypeScriptBuilder extends AbstractSingularBuilder {
	constructor(configurationValues?: { [key: string]: any }) {
		super(
			'A builder that takes typescript code, uses ts-node to transpile it and then run it as a builder',
			{
				typeScriptPath: {
					name: 'A path to the typescript file containing the code to execute',
					required: false,
					description: 'A path to a typescript file that contains source implementing the Builder interface',
					valueType: ValueType.string,
				},
				typeScriptCode: {
					name: 'The typescript code to execute',
					required: false,
					description: 'TypeScript source implementing a builder. It must implement the Builder interface',
					valueType: ValueType.string,
				},
			},
			configurationValues
		)
	}

	protected async _doesConfigurationWork(): Promise<boolean> {
		try {
			const typeScriptPath = this.getConfiguredValue('typeScriptPath')

			if (typeScriptPath) {
				if (fs.existsSync(typeScriptPath)) return true
				this.logger.error(`File ${typeScriptPath} is not accessible`)
				return false
			}

			if (ts.transpile(this.getConfiguredValue('typeScriptCode'))) return true
			else {
				this.logger.error(`typeScriptCode does not compile`)
				return false
			}
		} catch (problem) {
			this.logger.error(`${problem}`)
			return false
		}
	}

	@LogAsyncMethod()
	protected async buildInternal(system: System, __component: SystemComponent): Promise<Artifact[]> {
		const configuredTypeScriptPath = this.getConfiguredValue('typeScriptPath')
		let deleteFile = false
		let typeScriptPath
		if (configuredTypeScriptPath) {
			typeScriptPath = `${process.cwd()}/${configuredTypeScriptPath}`
		} else {
			const tsCode = this.getConfiguredValue('typeScriptCode')
			typeScriptPath = `${process.cwd()}/${this.id}.ts`
			fs.writeFileSync(typeScriptPath, tsCode)
			deleteFile = true
		}

		// eslint-disable-next-line spellcheck/spell-checker
		tsnode.register()
		// eslint-disable-next-line @typescript-eslint/no-var-requires
		const classObject = require(typeScriptPath)
		const keys = Object.keys(classObject)
		const className = keys[0]
		const object = new classObject[className]({}) as Builder
		const result = await object.build(system)

		if (deleteFile) fs.unlinkSync(typeScriptPath)

		return result
	}
}
