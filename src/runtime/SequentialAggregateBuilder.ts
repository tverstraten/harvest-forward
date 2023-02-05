import { Artifact } from '../system/Artifact'
import { System } from '../system/System'
import { LogAsyncMethod } from '@tverstraten/log-annotations'
import { LogMethod } from '@tverstraten/log-annotations'
import { AbstractAggregateBuilder } from './AbstractAggregateBuilder'
import { Builder } from './Builder'

export class SequentialAggregateBuilder extends AbstractAggregateBuilder {
	@LogMethod()
	protected buildOne(builder: Builder, system: System): Promise<Artifact[]> {
		return builder.build(system)
	}

	@LogAsyncMethod()
	async build(system: System): Promise<Artifact[]> {
		await this.testConfiguration()

		const artifacts = [] as Artifact[]

		for (let index = 0; index < this.builders.length; index++) {
			const builder = this.builders[index]
			const buildersArtifacts = await this.buildOne(builder, system)
			artifacts.concat(buildersArtifacts)
		}

		return artifacts
	}
}
