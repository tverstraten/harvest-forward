import { SystemComponentComparator } from '../../system/SystemComponentComparator'
import { Method } from '../information-architecture'
import { HttpVerb } from './HttpVerb'
import { PathParameter } from './PathParameter'
import { RestParameterLocation } from './RestParameterLocation'

export class Path extends Method {
	urlPath?: string

	httpVerb?: HttpVerb

	get httpVerbText(): string {
		if (this.httpVerb == null) return ''
		return HttpVerb[this.httpVerb]
	}

	get queryParameters(): PathParameter[] {
		const result = [] as PathParameter[]
		Object.values(this.parameters).forEach((parameter) => {
			if (parameter instanceof PathParameter) {
				if (parameter.location == RestParameterLocation.query) {
					result.push(parameter)
				}
			}
		})
		result.sort(SystemComponentComparator)
		return result
	}

	get bodyParameter(): PathParameter | undefined {
		let result
		Object.values(this.parameters).forEach((parameter) => {
			if (parameter instanceof PathParameter) {
				if (parameter.location == RestParameterLocation.body) result = parameter
			}
		})
		return result
	}

	get pathParameters(): PathParameter[] {
		const result = [] as PathParameter[]
		Object.values(this.parameters).forEach((parameter) => {
			if (parameter instanceof PathParameter) {
				if (parameter.location == RestParameterLocation.path) result.push(parameter)
			}
		})
		result.sort(SystemComponentComparator)
		return result
	}
}
