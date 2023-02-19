import { ValueType } from '../../../system/ValueType'
import { Parameter } from '../../information-architecture'
import { RestParameterLocation } from './RestParameterLocation'

export class PathParameter extends Parameter {
	location: RestParameterLocation

	constructor(nameSpace: string, name: string, description: string, type: ValueType, length: number) {
		super(nameSpace, name, description, type, length)
		this.location = RestParameterLocation.query
	}
}
