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
import { ServiceLayer } from '../ServiceLayer'

export class DalToServiceTransformer extends AbstractSingularBuilder {
	constructor(configurationValues?: { [key: string]: any }) {
		const nonNullConfigurationValues = configurationValues ? configurationValues : []
		nonNullConfigurationValues['repeatFor'] = JSON.stringify({
			objectTypeName: 'Class',
			componentType: 'dataAccess',
		})
		super(
			'A transformer that creates a service layer based on the information model and data access layer',
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
		const daClass = component as Class
		const blName = `${daClass.name.replace(/Da$/, '')}Service`
		const blDescription = `A class to performs actions against the model class ${daClass.name}. Many actions expose access to the data itself`
		const blClass = new Class('service', blName, blDescription, SystemComponentType.service)
		blClass.singularName = blName
		blClass.pluralName = Pluralize.plural(daClass.name)
		blClass.operatesOnBehalfOf = daClass.operatesOnBehalfOf
		blClass.permanence = Permanence.constant
		blClass.informational = false
		blClass.functional = true
		blClass.origin = ComponentOrigin.manufactured
		const serviceLayer = ServiceLayer.fromSystem(system)
		serviceLayer.addChild(blClass)

		return [new SystemComponentArtifact(blClass)]
	}
}
