/* eslint-disable max-lines-per-function */
import { Class } from '../../../plugins/information-architecture'
import { System } from '../../../system/System'
import { ComponentOrigin } from '../../../system/ComponentOrigin'
import { Permanence } from '../../../system/Permanence'
import { TypeScriptClassToModelHarvester } from '../../../plugins/typescript/TypeScriptClassToModelHarvester'

describe('run', () => {
	it('local classes', async () => {
		const builder = new TypeScriptClassToModelHarvester({
			sourcePath: __dirname,
			fileNamePattern: '^[^.]*(?!spec)*[.]ts$',
			classNamePattern: '.*',
		})
		const system = new System()
		await builder.build(system)
		const children = Object.keys(system.children)
		expect(children.length).toBe(1)
		const informationModel = system.children['/INFORMATION_MODEL']
		const grandChildren = Object.keys(informationModel.children)
		expect(grandChildren.length).toBe(4)

		const userClass = informationModel.children['INFORMATION_MODEL/USER'] as Class
		const messageClass = informationModel.children['INFORMATION_MODEL/MESSAGE'] as Class
		const identityClass = informationModel.children['INFORMATION_MODEL/IDENTITY'] as Class
		const githubIdentityClass = informationModel.children['INFORMATION_MODEL/GITHUB_IDENTITY'] as Class

		expect(userClass.name).toBe('User')
		expect(userClass.nameSpace).toBe('INFORMATION_MODEL')
		expect(userClass.isAbstract).toBe(false)
		expect(userClass.isClass).toBe(true)
		expect(userClass.objectTypeName).toBe('Class')
		expect(userClass.origin).toBe(ComponentOrigin.harvested)
		expect(userClass.primitive).toBe(false)
		expect(userClass.permanence).toBe(Permanence.persistent)

		expect(messageClass.name).toBe('Message')
		expect(messageClass.nameSpace).toBe('INFORMATION_MODEL')
		expect(messageClass.isAbstract).toBe(false)
		expect(messageClass.isClass).toBe(true)
		expect(messageClass.objectTypeName).toBe('Class')
		expect(messageClass.origin).toBe(ComponentOrigin.harvested)
		expect(messageClass.primitive).toBe(false)
		expect(messageClass.permanence).toBe(Permanence.persistent)

		expect(identityClass.name).toBe('Identity')
		expect(identityClass.nameSpace).toBe('INFORMATION_MODEL')
		expect(identityClass.isAbstract).toBe(false)
		expect(identityClass.isClass).toBe(true)
		expect(identityClass.objectTypeName).toBe('Class')
		expect(identityClass.origin).toBe(ComponentOrigin.harvested)
		expect(identityClass.primitive).toBe(false)
		expect(identityClass.permanence).toBe(Permanence.persistent)

		expect(githubIdentityClass.name).toBe('GithubIdentity')
		expect(githubIdentityClass.nameSpace).toBe('INFORMATION_MODEL')
		expect(githubIdentityClass.isAbstract).toBe(false)
		expect(githubIdentityClass.isClass).toBe(true)
		expect(githubIdentityClass.objectTypeName).toBe('Class')
		expect(githubIdentityClass.origin).toBe(ComponentOrigin.harvested)
		expect(githubIdentityClass.primitive).toBe(false)
		expect(githubIdentityClass.permanence).toBe(Permanence.persistent)
	})
})
