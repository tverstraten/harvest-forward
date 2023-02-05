import { Artifact } from '../system/Artifact'
import { System } from '../system/System'
import { LogAsyncMethod } from '@tverstraten/log-annotations'
import { AbstractAggregateBuilder } from './AbstractAggregateBuilder'

export class ConcurrentAggregateBuilder extends AbstractAggregateBuilder {
	@LogAsyncMethod()
	async build(system: System): Promise<Artifact[]> {
		await this.testConfiguration()

		const promises = [] as Promise<any>[]
		for (let index = 0; index < this.builders.length; index++) {
			const builder = this.builders[index]
			promises.push(builder.build(system))
		}
		return this.settleArtifactResults(promises)
	}
}
