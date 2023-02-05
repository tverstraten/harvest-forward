import { AbstractSingularBuilder } from '../../../runtime/AbstractSingularBuilder'
import { Artifact } from '../../../system/Artifact'
import { System } from '../../../system/System'
import { SystemComponent } from '../../../system/SystemComponent'
import { ValueType } from '../../../system/ValueType'

export class TestBuilder extends AbstractSingularBuilder {
	constructor(configurationValues?: { [key: string]: any }) {
		super(
			'A builder that returns a string',
			{
				aParameter: {
					name: 'Some string',
					required: true,
					description: 'a string to return',
					valueType: ValueType.string,
				},
			},
			configurationValues
		)
	}

	protected async _doesConfigurationWork(): Promise<boolean> {
		return true
	}

	protected async buildInternal(system: System, __component: SystemComponent): Promise<Artifact[]> {
		const param = this.getConfiguredValue('aParameter')
		const item = `${system.name}-${param}` as unknown as Artifact
		return [item]
	}
}
