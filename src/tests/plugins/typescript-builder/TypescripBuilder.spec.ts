/* eslint-disable max-lines-per-function */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable spellcheck/spell-checker */
import * as tsnode from 'ts-node'
import { TypeScriptBuilder } from '../../../plugins/typescript-builder/TypescriptBuilder'
import { Builder } from '../../../runtime/Builder'
import { System } from '../../../system/System'

describe('basic code concept', () => {
	it('run the builder directly', async () => {
		try {
			tsnode.register()
			const classObject = require('./TestBuilder.ts')
			const keys = Object.keys(classObject)
			const className = keys[0]
			const parameterText = 'the parameter'
			const systemName = 'some name'
			const object = new classObject[className]({ aParameter: parameterText }) as Builder
			const system = new System(systemName)
			const result = await object.build(system)
			expect(result.length).toBe(1)
			expect(result[0]).toBe(`${systemName}-${parameterText}`)
		} catch (problem) {
			console.log(problem)
		}
	})

	it('run the builder through the plugin as file', async () => {
		const builder = new TypeScriptBuilder({
			typeScriptPath: `./src/tests/plugins/typescript-builder/TestBuilder2.ts`,
		})
		const systemName = 'some name'
		const system = new System(systemName)
		const result = await builder.build(system)
		expect(result.length).toBe(1)
		expect(result[0]).toBe(`${systemName}`)
	})

	it('run the builder through the plugin as source', async () => {
		const builder = new TypeScriptBuilder({
			typeScriptCode: `
import { AbstractSingularBuilder } from './src/runtime/AbstractSingularBuilder'
import { Artifact } from './src/system/Artifact'
import { System } from './src/system/System'
import { SystemComponent } from './src/system/SystemComponent'

export class TestBuilder extends AbstractSingularBuilder {
	protected async buildInternal(system: System, __component: SystemComponent): Promise<Artifact[]> {
		const item = system.name as unknown as Artifact
		return [item]
	}
}`,
		})
		const systemName = 'some name'
		const system = new System(systemName)
		const result = await builder.build(system)
		expect(result.length).toBe(1)
		expect(result[0]).toBe(`${systemName}`)
	})
})
