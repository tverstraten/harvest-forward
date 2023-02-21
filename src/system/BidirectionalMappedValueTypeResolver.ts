import { ProgrammingLanguage } from './ProgrammingLanguage'
import { ValueType } from './ValueType'
import { ValueTypeResolver } from './ValueTypeResolver'

export class BidirectionalMappedValueTypeResolver implements ValueTypeResolver {
	readonly language: ProgrammingLanguage

	readonly types: Map<ValueType, string>

	private reverseMap: Map<string, ValueType>

	constructor(language: ProgrammingLanguage, forward: Map<ValueType, string>, reverse: Map<string, ValueType>) {
		this.language = language
		this.types = forward
		this.reverseMap = reverse
	}

	doesSupport(language: ProgrammingLanguage): boolean {
		return this.language === language
	}

	doesMap(typeName: string): boolean {
		return this.reverseMap.has(typeName)
	}

	fromType(type: ValueType): string | undefined {
		return this.types.get(type)
	}

	toType(name: string): ValueType | undefined {
		return this.reverseMap.get(name)
	}

	toTypeName(name: string): string | undefined {
		return this.toType(name)?.name
	}
}
