/* eslint-disable max-lines-per-function */
import { Class, Interface } from '../../../plugins/information-architecture'
import { TypescriptClassInheritanceHarvester } from '../../../plugins/typescript/TypescriptClassInheritanceHarvester'
import { TypeScriptClassToModelHarvester } from '../../../plugins/typescript/TypeScriptClassToModelHarvester'
import { TypeScriptInterfaceToModelHarvester } from '../../../plugins/typescript/TypeScriptInterfaceToModelHarvester'
import { System } from '../../../system/System'

describe('run', () => {
	it('local classes', async () => {
		const system = new System()
		const classBuilder = new TypeScriptClassToModelHarvester({
			sourcePath: __dirname,
			fileNamePattern: '^[^.]*(?!spec)*[.]ts$',
			classNamePattern: '.*',
		})
		await classBuilder.build(system)
		const interfaceBuilder = new TypeScriptInterfaceToModelHarvester({
			sourcePath: __dirname,
			fileNamePattern: '^[^.]*(?!spec)*[.]ts$',
			classNamePattern: '.*',
		})
		await interfaceBuilder.build(system)
		const inheritanceBuilder = new TypescriptClassInheritanceHarvester({
			sourcePath: __dirname,
			fileNamePattern: '^[^.]*(?!spec)*[.]ts$',
			classNamePattern: '.*',
		})
		await inheritanceBuilder.build(system)

		const children = Object.keys(system.children)
		expect(children.length).toBe(1)
		const informationModel = system.children['/INFORMATION_MODEL']
		const grandChildren = Object.keys(informationModel.children)
		expect(grandChildren.length).toBe(6)

		const userClass = informationModel.children['INFORMATION_MODEL/USER'] as Class
		const messageClass = informationModel.children['INFORMATION_MODEL/MESSAGE'] as Class
		const identityClass = informationModel.children['INFORMATION_MODEL/IDENTITY'] as Class
		const githubIdentityClass = informationModel.children['INFORMATION_MODEL/GITHUB_IDENTITY'] as Class
		const identifiableClass = informationModel.children['INFORMATION_MODEL/IDENTIFIABLE'] as Interface
		const identifiableParentClass = informationModel.children['INFORMATION_MODEL/IDENTIFIABLE_PARENT'] as Interface

		expect(userClass.name).toBe('User')
		expect(messageClass.name).toBe('Message')
		expect(identityClass.name).toBe('Identity')
		expect(githubIdentityClass.name).toBe('GithubIdentity')
		expect(identifiableClass.name).toBe('Identifiable')

		expect(userClass.inheritsFrom.length).toBe(0)
		expect(userClass.implements.length).toBe(0)
		expect(messageClass.inheritsFrom.length).toBe(0)
		expect(messageClass.implements.length).toBe(1)
		expect(identityClass.inheritsFrom.length).toBe(0)
		expect(identityClass.implements.length).toBe(1)
		expect(githubIdentityClass.inheritsFrom.length).toBe(1)
		expect(githubIdentityClass.implements.length).toBe(0)
		expect(identifiableClass.inheritsFrom.length).toBe(1)
		expect(identifiableClass.implements.length).toBe(0)
		expect(identifiableParentClass.inheritsFrom.length).toBe(0)
		expect(identifiableParentClass.implements.length).toBe(0)

		expect(githubIdentityClass.inheritsFrom[0]).toBe(identityClass.fullConstantCaseName)
		expect(identityClass.implements[0]).toBe(identifiableClass.fullConstantCaseName)
		expect(messageClass.implements[0]).toBe(identifiableClass.fullConstantCaseName)
		expect(identifiableClass.inheritsFrom[0]).toBe(identifiableParentClass.fullConstantCaseName)
	})
})
