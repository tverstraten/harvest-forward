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
import { EndpointLayer } from '../EndpointLayer'

export class ServiceToEndpointTransformer extends AbstractSingularBuilder {
	constructor(configurationValues?: { [key: string]: any }) {
		const nonNullConfigurationValues = configurationValues ? configurationValues : []
		nonNullConfigurationValues['repeatFor'] = JSON.stringify({
			objectTypeName: 'Class',
			componentType: 'service',
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
		const serviceClass = component as Class
		const controllerName = `${serviceClass.name.replace(/Service$/, '')}Api`
		const controllerDescription = `A class to performs actions against the model class ${serviceClass.name}. Many actions expose access to the data itself`
		const controllerClass = new Class('service', controllerName, controllerDescription, SystemComponentType.serviceEndpoint)
		controllerClass.singularName = controllerName
		controllerClass.pluralName = Pluralize.plural(serviceClass.name)
		controllerClass.operatesOnBehalfOf = serviceClass.operatesOnBehalfOf
		controllerClass.permanence = Permanence.constant
		controllerClass.informational = false
		controllerClass.functional = true
		controllerClass.origin = ComponentOrigin.manufactured
		const endPointLayer = EndpointLayer.fromSystem(system)
		endPointLayer.addChild(controllerClass)

		return [new SystemComponentArtifact(controllerClass)]
	}
}
