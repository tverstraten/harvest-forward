/* eslint-disable max-lines-per-function */
import { Class, Method, Parameter } from '../../../plugins/information-architecture'
import { TypeScriptClassMethodToModelHarvester, TypeScriptClassToModelHarvester, TYPE_RESOLVERS } from '../../../plugins/typescript'
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

		const methodBuilder = new TypeScriptClassMethodToModelHarvester({
			sourcePath: __dirname,
			fileNamePattern: '.*(?<!_ex)$',
			classNamePattern: '.*',
		})
		await methodBuilder.build(system)

		const children = Object.keys(system.children)
		expect(children.length).toBe(1)
		const informationModel = system.children['/INFORMATION_MODEL']
		const grandChildren = Object.keys(informationModel.children)
		expect(grandChildren.length).toBe(4)

		const userClass = informationModel.children['INFORMATION_MODEL/USER'] as Class

		// sendMessage(__subject: string, __body: string, __cc?: string): void {
		const sendMessageMethod = userClass.children['INFORMATION_MODEL/USER/SEND_MESSAGE'] as Method
		expect(sendMessageMethod.name).toBe('sendMessage')
		expect(sendMessageMethod.nameSpace).toBe('INFORMATION_MODEL/USER')
		expect(sendMessageMethod.returns?.type.name).toBe('void')
		expect(sendMessageMethod.objectTypeName).toBe('Method')
		expect(sendMessageMethod.origin).toBe(ComponentOrigin.harvested)
		expect(sendMessageMethod.permanence).toBe(Permanence.persistent)
		expect(sendMessageMethod.static).toBe(false)

		const parameters = Object.keys(sendMessageMethod.children)
		expect(parameters.length).toBe(4)

		const idParameter = sendMessageMethod.children['INFORMATION_MODEL/USER/SEND_MESSAGE/ID'] as Parameter
		expect(idParameter.name).toBe('__id')
		expect(idParameter.nameSpace).toBe('INFORMATION_MODEL/USER/SEND_MESSAGE')
		expect(idParameter.type.name).toBe('number')
		expect(idParameter.optional).toBe(false)

		const subjectParameter = sendMessageMethod.children['INFORMATION_MODEL/USER/SEND_MESSAGE/SUBJECT'] as Parameter
		expect(subjectParameter.name).toBe('__subject')
		expect(subjectParameter.nameSpace).toBe('INFORMATION_MODEL/USER/SEND_MESSAGE')
		expect(subjectParameter.type.name).toBe('string')
		expect(subjectParameter.optional).toBe(false)

		const bodyParameter = sendMessageMethod.children['INFORMATION_MODEL/USER/SEND_MESSAGE/BODY'] as Parameter
		expect(bodyParameter.name).toBe('__body')
		expect(bodyParameter.nameSpace).toBe('INFORMATION_MODEL/USER/SEND_MESSAGE')
		expect(bodyParameter.type.name).toBe('string')
		expect(bodyParameter.optional).toBe(false)

		const ccParameter = sendMessageMethod.children['INFORMATION_MODEL/USER/SEND_MESSAGE/CC'] as Parameter
		expect(ccParameter.name).toBe('__cc')
		expect(ccParameter.nameSpace).toBe('INFORMATION_MODEL/USER/SEND_MESSAGE')
		expect(ccParameter.type.name).toBe('string')
		expect(ccParameter.optional).toBe(true)
	})
})
