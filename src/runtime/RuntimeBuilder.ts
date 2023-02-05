import { Artifact } from '../system/Artifact'
import { System } from '../system/System'
import { SystemComponent } from '../system/SystemComponent'
import { LogAsyncMethod } from '@tverstraten/log-annotations'
import { AbstractSingularBuilder } from './AbstractSingularBuilder'
import { BuilderConfiguration } from './BuilderConfiguration'
import { BuilderFactory } from './BuilderFactory'
import { ConfigurationManager } from './ConfigurationManager'

export class RuntimeBuilder extends AbstractSingularBuilder {
	private configuration: BuilderConfiguration

	constructor(system: System, configuration: BuilderConfiguration) {
		super(system.description)
		this.configuration = configuration
	}

	@LogAsyncMethod()
	protected async buildInternal(system: System, __component: SystemComponent): Promise<Artifact[]> {
		await ConfigurationManager.registerPlugins()
		const builder = await BuilderFactory.create(this.configuration)
		const result = await builder.build(system)
		return result
	}
}
