import { ProgrammingLanguage } from './ProgrammingLanguage'
import { ValueType } from './ValueType'
import { ValueTypeResolver } from './ValueTypeResolver'

export class DirectlyMappedValueTypeResolver implements ValueTypeResolver {
	readonly language: ProgrammingLanguage

	readonly fromOptionalValueTypes: Record<string, string>

	readonly fromMandatoryValueTypes: Record<string, string>

	readonly toMandatoryValueTypes: Record<string, ValueType>

	constructor(
		language: ProgrammingLanguage,
		fromMandatoryValueTypes: Record<string, string>,
		fromOptionalValueTypes: Record<string, string>,
		toMandatoryValueTypes: Record<string, ValueType>
	) {
		this.language = language
		this.fromMandatoryValueTypes = fromMandatoryValueTypes
		this.fromOptionalValueTypes = fromOptionalValueTypes
		this.toMandatoryValueTypes = toMandatoryValueTypes
	}

	doesSupport(language: ProgrammingLanguage): boolean {
		if (!language) throw RangeError(`language was not specified`)
		return this.language === language
	}

	doesMap(type: ValueType): boolean {
		if (this.fromMandatoryValueTypes[type.name] || this.fromOptionalValueTypes[type.name]) return true
		return false
	}

	hasName(name: string): boolean {
		if (!name) throw RangeError(`name was not specified`)
		const mapped = this.toMandatoryValueTypes[name]
		return mapped != undefined
	}

	fromType(originalType: ValueType, optional = false): string {
		let result
		if (!originalType.primitive) return originalType.name

		if (optional) {
			result = this.fromOptionalValueTypes[originalType.name]
			if (result) return result
		} else {
			result = this.fromMandatoryValueTypes[originalType.name]
			if (result) return result
		}
		throw RangeError(`${originalType.name} is not a supported type`)
	}

	toTypeName(name: string): string | undefined {
		if (!name) throw RangeError(`name was not specified`)
		return this.toMandatoryValueTypes[name] ? this.toMandatoryValueTypes[name].name : undefined
	}

	toType(name: string): ValueType | undefined {
		if (!name) throw RangeError(`name was not specified`)
		return this.toMandatoryValueTypes[name]
	}
}
