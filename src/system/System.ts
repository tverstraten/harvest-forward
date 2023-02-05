import { IsNotEmpty, IsString } from 'class-validator'
import { SystemComponent } from './SystemComponent'
import { SystemComponentType } from './SystemComponentType'
import { ValueType } from './ValueType'

export class System extends SystemComponent {
	@IsString()
	@IsNotEmpty()
	readonly name: string

	@IsString()
	readonly description: string

	constructor(name = '', description = '') {
		super(SystemComponentType.system)
		this.name = name
		this.description = description
	}

	get primitives(): ValueType[] {
		const result = [] as ValueType[]
		Object.values(this.children).forEach((currentComponent) => {
			const currentType = currentComponent as ValueType
			if (currentType.primitive) result.push(currentType)
		})

		return result
	}
}
