import { ProgrammingLanguage } from './ProgrammingLanguage'
import { ValueType } from './ValueType'
import { ValueTypeResolver } from './ValueTypeResolver'

export class SimpleMappedValueTypeResolver implements ValueTypeResolver {
	readonly language: ProgrammingLanguage

	readonly optionalValueTypes: Record<string, string>

	readonly mandatoryValueTypes: Record<string, string>

	private mandatoryNames: string[]

	constructor(language: ProgrammingLanguage, mandatoryValueTypes: Record<string, string>, optionalValueTypes: Record<string, string>) {
		this.language = language
		this.mandatoryValueTypes = mandatoryValueTypes
		this.optionalValueTypes = optionalValueTypes

		this.mandatoryNames = []
		Object.keys(mandatoryValueTypes).forEach((key) => {
			const entry = mandatoryValueTypes[key]
			this.mandatoryNames.push(entry)
		})
	}

	doesSupport(language: ProgrammingLanguage): boolean {
		if (!language) throw RangeError(`language was not specified`)
		return this.language === language
	}

	doesMap(type: ValueType): boolean {
		if (this.mandatoryValueTypes[type.name] || this.optionalValueTypes[type.name]) return true
		return false
	}

	hasName(name: string): boolean {
		if (!name) throw RangeError(`name was not specified`)
		return this.mandatoryNames.includes(name)
	}

	fromType(originalType: ValueType, optional = false): string {
		let result
		if (!originalType.primitive) return originalType.name

		if (optional) {
			result = this.optionalValueTypes[originalType.name]
			if (result) return result
		} else {
			result = this.mandatoryValueTypes[originalType.name]
			if (result) return result
		}
		throw RangeError(`${originalType.name} is not a supported type`)
	}

	toTypeName(name: string): string | undefined {
		if (!name) throw RangeError(`name was not specified`)
		return this.mandatoryValueTypes[name]
	}

	toType(name: string): ValueType | undefined {
		if (!name) throw RangeError(`name was not specified`)

		const mappedName = this.mandatoryValueTypes[name]
		for (let index = 0; index < ValueType.types.length; index++) {
			const type = ValueType.types[index]
			if (mappedName === type.name) return type
		}

		return undefined
	}
}
