import { ProgrammingLanguage } from './ProgrammingLanguage'
import { ValueType } from './ValueType'
import { ValueTypeResolver } from './ValueTypeResolver'

export class SimpleMappedValueTypeResolver implements ValueTypeResolver {
	readonly language: ProgrammingLanguage

	readonly types: Map<ValueType, string>

	readonly nameMap: Map<string, string>

	private reverseMap: Map<string, ValueType>

	constructor(language: ProgrammingLanguage, types: Map<ValueType, string>) {
		this.language = language
		this.types = types

		this.reverseMap = new Map<string, ValueType>()
		this.nameMap = new Map<string, string>()

		types.forEach((name, type) => {
			this.reverseMap.set(name, type)
			this.nameMap.set(type.name, name)
		})
	}

	doesSupport(language: ProgrammingLanguage): boolean {
		return this.language === language
	}

	doesMap(typeName: string): boolean {
		return this.reverseMap.has(typeName)
	}

	fromType(type: ValueType | string): string | undefined {
		if (typeof type === 'string') return this.nameMap.get(type)
		return this.types.get(type)
	}

	toType(name: string): ValueType | undefined {
		return this.reverseMap.get(name)
	}

	toTypeName(name: string): string | undefined {
		return this.toType(name)?.name
	}
}
