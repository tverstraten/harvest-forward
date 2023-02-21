/* eslint-disable max-lines-per-function */
import { Class, Property } from '../../../plugins/information-architecture'
import {
	TypeScriptClassPropertyToModelHarvester,
	TypeScriptClassToModelHarvester,
	TypeScriptEnumValueHarvester,
	TYPE_RESOLVERS,
} from '../../../plugins/typescript'
import { System } from '../../../system/System'
import { ComponentOrigin } from '../../../system/ComponentOrigin'
import { Permanence } from '../../../system/Permanence'
import { ConfigurationManager } from '../../../runtime/ConfigurationManager'

describe('run', () => {
	it('local classes', async () => {
		// the classes must be present for the properties to be added.
		ConfigurationManager.registerConfigurationModuleTypeResolvers(TYPE_RESOLVERS)

		const classBuilder = new TypeScriptClassToModelHarvester({
			sourcePath: __dirname,
			fileNamePattern: '^[^.]*(?!spec)*[.]ts$',
			classNamePattern: '.*',
		})
		const system = new System()
		await classBuilder.build(system)

		const enumerationBuilder = new TypeScriptEnumValueHarvester({
			sourcePath: __dirname,
			fileNamePattern: '^[^.]*(?!spec)*[.]ts$',
			classNamePattern: '.*',
		})
		await enumerationBuilder.build(system)

		const propertyBuilder = new TypeScriptClassPropertyToModelHarvester({
			sourcePath: __dirname,
			fileNamePattern: '^[^.]*(?!spec)*[.]ts$',
			classNamePattern: '.*',
		})
		await propertyBuilder.build(system)

		const children = Object.keys(system.children)
		expect(children.length).toBe(1)
		const informationModel = system.children['/INFORMATION_MODEL']
		const grandChildren = Object.keys(informationModel.children)
		expect(grandChildren.length).toBe(5)

		const userClass = informationModel.children['INFORMATION_MODEL/USER'] as Class

		const nameProperty = userClass.children['INFORMATION_MODEL/USER/NAME'] as Property
		expect(nameProperty.name).toBe('name')
		expect(nameProperty.nameSpace).toBe('INFORMATION_MODEL/USER')
		expect(nameProperty.optional).toBe(true)
		expect(nameProperty.type.name).toBe('string')
		expect(nameProperty.type.isCollection).toBe(false)
		expect(nameProperty.objectTypeName).toBe('Property')
		expect(nameProperty.origin).toBe(ComponentOrigin.harvested)
		expect(nameProperty.permanence).toBe(Permanence.persistent)
		expect(nameProperty.static).toBe(false)

		//identities = [] as Identity[]
		const identitiesProperty = userClass.children['INFORMATION_MODEL/USER/IDENTITIES'] as Property
		expect(identitiesProperty.name).toBe('identities')
		expect(identitiesProperty.nameSpace).toBe('INFORMATION_MODEL/USER')
		expect(identitiesProperty.optional).toBe(false)
		expect(identitiesProperty.type.name).toBe('Identity[]')
		expect(identitiesProperty.type.isCollection).toBe(true)
		expect(identitiesProperty.objectTypeName).toBe('Property')
		expect(identitiesProperty.origin).toBe(ComponentOrigin.harvested)
		expect(identitiesProperty.permanence).toBe(Permanence.persistent)
		expect(identitiesProperty.static).toBe(false)

		//messages = [] as Message[]
		const messagesProperty = userClass.children['INFORMATION_MODEL/USER/MESSAGES'] as Property
		expect(messagesProperty.name).toBe('messages')
		expect(messagesProperty.nameSpace).toBe('INFORMATION_MODEL/USER')
		expect(messagesProperty.optional).toBe(false)
		expect(messagesProperty.type.name).toBe('Message[]')
		expect(messagesProperty.type.isCollection).toBe(true)
		expect(messagesProperty.objectTypeName).toBe('Property')
		expect(messagesProperty.origin).toBe(ComponentOrigin.harvested)
		expect(messagesProperty.permanence).toBe(Permanence.persistent)
		expect(messagesProperty.static).toBe(false)

		const messageClass = informationModel.children['INFORMATION_MODEL/MESSAGE'] as Class

		//id?: number
		const idProperty = messageClass.children['INFORMATION_MODEL/MESSAGE/ID'] as Property
		expect(idProperty.name).toBe('id')
		expect(idProperty.nameSpace).toBe('INFORMATION_MODEL/MESSAGE')
		expect(idProperty.optional).toBe(true)
		expect(idProperty.type.name).toBe('string')
		expect(idProperty.type.isCollection).toBe(false)
		expect(idProperty.objectTypeName).toBe('Property')
		expect(idProperty.origin).toBe(ComponentOrigin.harvested)
		expect(idProperty.permanence).toBe(Permanence.persistent)
		expect(idProperty.static).toBe(false)

		//forUser?: User
		const forUserProperty = messageClass.children['INFORMATION_MODEL/MESSAGE/FOR_USER'] as Property
		expect(forUserProperty.name).toBe('forUser')
		expect(forUserProperty.nameSpace).toBe('INFORMATION_MODEL/MESSAGE')
		expect(forUserProperty.optional).toBe(true)
		expect(forUserProperty.type.name).toBe('User')
		expect(forUserProperty.type.isCollection).toBe(false)
		expect(forUserProperty.objectTypeName).toBe('Property')
		expect(forUserProperty.origin).toBe(ComponentOrigin.harvested)
		expect(forUserProperty.permanence).toBe(Permanence.persistent)
		expect(forUserProperty.static).toBe(false)

		//content?: string
		const contentProperty = messageClass.children['INFORMATION_MODEL/MESSAGE/CONTENT'] as Property
		expect(contentProperty.name).toBe('content')
		expect(contentProperty.nameSpace).toBe('INFORMATION_MODEL/MESSAGE')
		expect(contentProperty.optional).toBe(true)
		expect(contentProperty.type.name).toBe('string')
		expect(contentProperty.type.isCollection).toBe(false)
		expect(contentProperty.objectTypeName).toBe('Property')
		expect(contentProperty.origin).toBe(ComponentOrigin.harvested)
		expect(contentProperty.permanence).toBe(Permanence.persistent)
		expect(contentProperty.static).toBe(false)

		const someDefaultProperty = messageClass.children['INFORMATION_MODEL/MESSAGE/SOME_DEFAULT'] as Property
		expect(someDefaultProperty.name).toBe('someDefault')
		expect(someDefaultProperty.nameSpace).toBe('INFORMATION_MODEL/MESSAGE')
		expect(someDefaultProperty.optional).toBe(false)
		expect(someDefaultProperty.type.name).toBe('string')
		expect(someDefaultProperty.type.isCollection).toBe(false)
		expect(someDefaultProperty.objectTypeName).toBe('Property')
		expect(someDefaultProperty.origin).toBe(ComponentOrigin.harvested)
		expect(someDefaultProperty.permanence).toBe(Permanence.persistent)
		expect(someDefaultProperty.static).toBe(true)

		const identityClass = informationModel.children['INFORMATION_MODEL/IDENTITY'] as Class

		//id?: string
		const idProperty2 = identityClass.children['INFORMATION_MODEL/IDENTITY/ID'] as Property
		expect(idProperty2.name).toBe('id')
		expect(idProperty2.nameSpace).toBe('INFORMATION_MODEL/IDENTITY')
		expect(idProperty2.optional).toBe(true)
		expect(idProperty2.type.name).toBe('string')
		expect(idProperty2.type.isCollection).toBe(false)
		expect(idProperty2.objectTypeName).toBe('Property')
		expect(idProperty2.origin).toBe(ComponentOrigin.harvested)
		expect(idProperty2.permanence).toBe(Permanence.persistent)
		expect(idProperty2.static).toBe(false)

		//provider?: string
		const providerProperty = identityClass.children['INFORMATION_MODEL/IDENTITY/PROVIDER'] as Property
		expect(providerProperty.name).toBe('provider')
		expect(providerProperty.nameSpace).toBe('INFORMATION_MODEL/IDENTITY')
		expect(providerProperty.optional).toBe(true)
		expect(providerProperty.type.name).toBe('IdentityProvider')
		expect(providerProperty.type.isCollection).toBe(false)
		expect(providerProperty.objectTypeName).toBe('Property')
		expect(providerProperty.origin).toBe(ComponentOrigin.harvested)
		expect(providerProperty.permanence).toBe(Permanence.persistent)
		expect(providerProperty.static).toBe(false)

		//providerId?: string
		const providerIdProperty = identityClass.children['INFORMATION_MODEL/IDENTITY/PROVIDER_ID'] as Property
		expect(providerIdProperty.name).toBe('providerId')
		expect(providerIdProperty.nameSpace).toBe('INFORMATION_MODEL/IDENTITY')
		expect(providerIdProperty.optional).toBe(true)
		expect(providerIdProperty.type.name).toBe('number')
		expect(providerIdProperty.type.isCollection).toBe(false)
		expect(providerIdProperty.objectTypeName).toBe('Property')
		expect(providerIdProperty.origin).toBe(ComponentOrigin.harvested)
		expect(providerIdProperty.permanence).toBe(Permanence.persistent)
		expect(providerIdProperty.static).toBe(false)

		//forUser?: User
		const forUserProperty2 = identityClass.children['INFORMATION_MODEL/IDENTITY/FOR_USER'] as Property
		expect(forUserProperty2.name).toBe('forUser')
		expect(forUserProperty2.nameSpace).toBe('INFORMATION_MODEL/IDENTITY')
		expect(forUserProperty2.optional).toBe(true)
		expect(forUserProperty2.type.name).toBe('User')
		expect(forUserProperty2.type.isCollection).toBe(false)
		expect(forUserProperty2.objectTypeName).toBe('Property')
		expect(forUserProperty2.origin).toBe(ComponentOrigin.harvested)
		expect(forUserProperty2.permanence).toBe(Permanence.persistent)
		expect(forUserProperty2.static).toBe(false)

		const githubIdentityClass = informationModel.children['INFORMATION_MODEL/GITHUB_IDENTITY'] as Class

		//repoNames = [] as string[]
		const repoNamesProperty = githubIdentityClass.children['INFORMATION_MODEL/GITHUB_IDENTITY/REPO_NAMES'] as Property
		expect(repoNamesProperty.name).toBe('repoNames')
		expect(repoNamesProperty.nameSpace).toBe('INFORMATION_MODEL/GITHUB_IDENTITY')
		expect(repoNamesProperty.optional).toBe(false)
		expect(repoNamesProperty.type.name).toBe('string[]')
		expect(repoNamesProperty.type.isCollection).toBe(true)
		expect(repoNamesProperty.objectTypeName).toBe('Property')
		expect(repoNamesProperty.origin).toBe(ComponentOrigin.harvested)
		expect(repoNamesProperty.permanence).toBe(Permanence.persistent)
		expect(repoNamesProperty.static).toBe(false)
	})
})
