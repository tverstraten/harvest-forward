import * as childProcess from 'child_process'
import { AbstractSingularBuilder } from '../../runtime/AbstractSingularBuilder'
import { Artifact } from '../../system/Artifact'
import { System } from '../../system/System'
import { SystemComponent } from '../../system/SystemComponent'
import { ValueType } from '../../system/ValueType'
import { LogAsyncMethod } from '@tverstraten/log-annotations'

export class NpmRunner extends AbstractSingularBuilder {
	constructor(configurationValues?: Record<string, any>) {
		super(
			'A builder that executes an npm script',
			{
				scriptName: {
					name: 'scriptName',
					required: true,
					description: 'The name of the npm script to run',
					valueType: ValueType.string,
					defaultValue: ``,
				},
			},
			configurationValues ? configurationValues : []
		)
	}

	@LogAsyncMethod()
	protected async buildInternal(__system: System, __component: SystemComponent): Promise<Artifact[]> {
		const scriptName = this.getConfiguredValue('scriptName')

		childProcess.execSync(`npm run ${scriptName}`)
		return []
	}
}
