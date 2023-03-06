/* eslint-disable max-lines-per-function */
import { EnumeratedValue, Enumeration } from '../../../plugins/information-architecture'
import { System } from '../../../system/System'
import { ComponentOrigin } from '../../../system/ComponentOrigin'
import { Permanence } from '../../../system/Permanence'
import { TypeScriptEnumValueHarvester } from '../../../plugins/typescript/TypeScriptEnumValueHarvester'

describe('run', () => {
	it('local classes', async () => {
		const system = new System()

		const builder = new TypeScriptEnumValueHarvester({
			sourcePath: __dirname,
			fileNamePattern: '^[^.]*(?!spec)*[.]ts$',
			classNamePattern: '.*',
		})
		await builder.build(system)
		const children = Object.keys(system.children)
		expect(children.length).toBe(1)
		const informationModel = system.children['/INFORMATION_MODEL']
		const grandChildren = Object.keys(informationModel.children)
		expect(grandChildren.length).toBe(1)

		const identityProviderClass = informationModel.children['INFORMATION_MODEL/IDENTITY_PROVIDER'] as Enumeration

		expect(identityProviderClass.name).toBe('IdentityProvider')
		expect(identityProviderClass.nameSpace).toBe('INFORMATION_MODEL')
		expect(identityProviderClass.objectTypeName).toBe('Enumeration')
		expect(identityProviderClass.origin).toBe(ComponentOrigin.harvested)
		expect(identityProviderClass.primitive).toBe(false)
		expect(identityProviderClass.permanence).toBe(Permanence.constant)

		expect(identityProviderClass.values.length).toBe(3)

		const google = identityProviderClass.findComponents({ name: 'google' })[0] as EnumeratedValue
		const facebook = identityProviderClass.findComponents({ name: 'facebook' })[0] as EnumeratedValue
		const github = identityProviderClass.findComponents({ name: 'github' })[0] as EnumeratedValue

		expect(google.value).toBe('1')
		expect(facebook.value).toBe('2')
		expect(github.value).toBe('3')
	})
})
