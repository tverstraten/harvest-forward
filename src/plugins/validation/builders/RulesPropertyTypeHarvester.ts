import { AbstractSingularBuilder } from '../../../runtime/AbstractSingularBuilder'
import { Artifact } from '../../../system/Artifact'
import { System } from '../../../system/System'
import { SystemComponent } from '../../../system/SystemComponent'
import { ValueType } from '../../../system/ValueType'
import { Property } from '../../information-architecture'
import { IsDecimalRule } from '../IsDecimalRule'

export class RulesPropertyTypeHarvester extends AbstractSingularBuilder {
	constructor(configurationValues?: { [key: string]: any }) {
		const nonNullConfigurationValues = configurationValues ? configurationValues : []
		nonNullConfigurationValues['repeatFor'] = JSON.stringify({
			objectTypeName: 'Property',
		})
		super(
			'An transformer that take property rules and adjusts the property type to match the rules',
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

	// eslint-disable-next-line max-lines-per-function
	async buildInternal(__system: System, component: SystemComponent): Promise<Artifact[]> {
		const property = component as Property
		// eslint-disable-next-line max-lines-per-function
		property.rules?.forEach((rule) => {
			switch (rule.objectTypeName) {
				case 'IsInt':
					property.type = ValueType.int
					break
				case 'IsString':
					property.type = ValueType.string
					break
				case 'IsDate':
					property.type = ValueType.date
					break
				case 'IsBoolean':
					property.type = ValueType.boolean
					break

				case 'IsBooleanString':
				case 'IsDateString':
				case 'IsNumberString':
				case 'IsDecimalString':
					property.type = ValueType.string
					break

				case 'IsNumber':
					property.type = ValueType.float
					const numberDigits = (rule as IsDecimalRule).decimalDigits
					property.significantDigits = numberDigits ? numberDigits : 2
					break

				case 'IsDecimal':
					property.type = ValueType.float
					const decimalDigits = (rule as IsDecimalRule).decimalDigits
					property.significantDigits = decimalDigits ? decimalDigits : 2
					break

				case 'IsEnum':
					break

				case 'IsNotEmpty':
					property.optional = false
					if (property.type.isOptional) property.type = property.type.asMandatory
					break

				case 'IsOptional':
					property.optional = true
					if (!property.type.isOptional) property.type = property.type.asOptional
					break

				default:
				// nothing
			}
		})

		return []
	}
}
