import { Class } from '../../information-architecture'
import { Path } from './Path'

export class Resource extends Class {
	get paths(): Path[] {
		const result = [] as Path[]
		this.methods.forEach((method) => {
			if (method instanceof Path) result.push(method)
		})

		return result
	}
}
