import Pluralize from 'pluralize'
import { AbstractSingularBuilder } from '../../../runtime/AbstractSingularBuilder'
import { Artifact } from '../../../system/Artifact'
import { ComponentOrigin } from '../../../system/ComponentOrigin'
import { Permanence } from '../../../system/Permanence'
import { System } from '../../../system/System'
import { SystemComponent } from '../../../system/SystemComponent'
import { SystemComponentArtifact } from '../../../system/SystemComponentArtifact'
import { SystemComponentType } from '../../../system/SystemComponentType'
import { ValueType } from '../../../system/ValueType'
import { Class } from '../../information-architecture'
import { DataAccessLayer } from '../DataAccessLayer'

export class ModelToDalTransformer extends AbstractSingularBuilder {
	constructor(configurationValues?: { [key: string]: any }) {
		const nonNullConfigurationValues = configurationValues ? configurationValues : []
		nonNullConfigurationValues['repeatFor'] = JSON.stringify({
			objectTypeName: 'Class',
			permanence: 'persistent',
			componentType: 'informationModel',
		})
		super(
			'A transformer that creates a data access layer based on the information model',
			{
				repeatFor: {
					name: 'Repeat for',
					required: true,
					description:
						'A parsable string of JSON that represents the properties values of the component that should be iterated on, review the documentation for SystemDescendantComponent and derivations for most available for use',
					valueType: ValueType.string,
					defaultValue: ``,
				},
			},
			nonNullConfigurationValues
		)
	}

	protected async buildInternal(system: System, component: SystemComponent): Promise<Artifact[]> {
		const dal = DataAccessLayer.fromSystem(system)
		const informationClass = component as Class
		// eslint-disable-next-line spellcheck/spell-checker
		const daName = `${informationClass.name}Dac`
		const daDescription = `A class to access and manipulate data saved in a persistent store for the informational class ${informationClass.name}`
		const daClass = new Class(dal.fullConstantCaseName, daName, daDescription, SystemComponentType.dataAccess)
		daClass.singularName = daName
		daClass.pluralName = Pluralize.plural(daName)
		daClass.operatesOnBehalfOf = informationClass
		daClass.permanence = Permanence.constant
		daClass.informational = false
		daClass.functional = true
		daClass.origin = ComponentOrigin.manufactured
		dal.addChild(daClass)

		return [new SystemComponentArtifact(daClass)]
	}
}
