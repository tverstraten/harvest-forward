import { AbstractSingularBuilder } from '../../runtime/AbstractSingularBuilder'
import { Builder } from '../../runtime/Builder'
import { ConcurrentAggregateBuilder } from '../../runtime/ConcurrentAggregateBuilder'
import { Artifact } from '../../system/Artifact'
import { FileArtifact } from '../../system/FileArtifact'
import { System } from '../../system/System'
import { SystemComponent } from '../../system/SystemComponent'

class TestBuilder extends AbstractSingularBuilder {
	static buildCount = 1

	buildPosition = 0

	constructor() {
		super('description', {}, [])
	}

	protected async _doesConfigurationWork(): Promise<boolean> {
		return true
	}

	protected async buildInternal(__system: System, __component: SystemComponent): Promise<Artifact[]> {
		this.buildPosition = TestBuilder.buildCount++
		return [new FileArtifact('name', 'path')]
	}
}

class FailingBuilder extends AbstractSingularBuilder {
	static buildCount = 1

	buildPosition = 0

	constructor() {
		super('description', {}, [])
	}

	protected async _doesConfigurationWork(): Promise<boolean> {
		return true
	}

	protected async buildInternal(__system: System, __component: SystemComponent): Promise<Artifact[]> {
		throw new RangeError('intended to fail')
	}
}

class TestAggregate extends ConcurrentAggregateBuilder {
	constructor(builders: Builder[]) {
		super('desc', builders)
	}
}

describe('build', () => {
	it('3 builders', async () => {
		const first = new TestBuilder()
		const second = new TestBuilder()
		const third = new TestBuilder()
		const aggregate = new TestAggregate([first, second, third])
		await aggregate.build(new System())

		expect(first.buildPosition).toBeGreaterThanOrEqual(1)
		expect(second.buildPosition).toBeGreaterThanOrEqual(1)
		expect(third.buildPosition).toBeGreaterThanOrEqual(1)
	})

	it('one that fails', async () => {
		const first = new TestBuilder()
		const second = new TestBuilder()
		const third = new FailingBuilder()
		const aggregate = new TestAggregate([third, first, second])
		try {
			await aggregate.build(new System())
			fail()
		} catch (problem) {
			expect((problem as any).message).toBe('intended to fail')
		}
	})
})
