/* eslint-disable max-lines-per-function */
import { ok } from 'assert'
import { AbstractSingularBuilder } from '../../runtime/AbstractSingularBuilder'
import { Artifact } from '../../system/Artifact'
import { System } from '../../system/System'
import { SystemComponent } from '../../system/SystemComponent'
import { ValueType } from '../../system/ValueType'

class TestBuilder extends AbstractSingularBuilder {
	protected buildInternal(__system: System, __component: SystemComponent): Promise<Artifact[]> {
		throw new Error('Method not implemented.')
	}
}

class FailingConfigurationBuilder extends AbstractSingularBuilder {
	protected buildInternal(__system: System, __component: SystemComponent): Promise<Artifact[]> {
		throw new Error('Method not implemented.')
	}

	protected async _doesConfigurationWork(): Promise<boolean> {
		return false
	}
}

describe('setConfiguredValue', () => {
	it('config parameter with type that does not exist', async () => {
		// force an error on setting the type
		const builder = new TestBuilder('description', {
			someInterval: {
				name: 'someInterval',
				required: true,
				description: 'description',
				valueType: ValueType.interval,
			},
		})

		const testFunction = (): void => {
			builder.setConfiguredValue('someInterval', {})
		}
		expect(testFunction).toThrow()
	})
})

describe('doesConfigurationWork', () => {
	it('simple yes', async () => {
		// force an error on setting the type
		const builder = new TestBuilder('description', {})

		await expect(await builder.doesConfigurationWork()).toBe(true)
	})

	it('not configured', async () => {
		// force an error on setting the type
		const builder = new TestBuilder('description', {
			someInterval: {
				name: 'someInterval',
				required: true,
				description: 'description',
				valueType: ValueType.interval,
			},
		})

		await expect(await builder.doesConfigurationWork()).toBe(false)
	})
})

describe('build', () => {
	it('fail bad system', async () => {
		// force an error on setting the type
		const builder = new TestBuilder('description', {
			someInterval: {
				name: 'someInterval',
				required: true,
				description: 'description',
				valueType: ValueType.interval,
			},
		})

		try {
			await builder.build(null as any)
			fail()
		} catch (problem) {
			ok(true)
		}
	})

	it('fail not configured', async () => {
		// force an error on setting the type
		const builder = new TestBuilder('description', {
			someInterval: {
				name: 'someInterval',
				required: true,
				description: 'description',
				valueType: ValueType.interval,
			},
		})

		try {
			await builder.build(new System())
			fail()
		} catch (problem) {
			ok(true)
		}
	})

	it('fail configuration bad', async () => {
		// force an error on setting the type
		const builder = new FailingConfigurationBuilder('description', {})

		try {
			await builder.build(new System())
			fail()
		} catch (problem) {
			ok(true)
		}
	})
})
