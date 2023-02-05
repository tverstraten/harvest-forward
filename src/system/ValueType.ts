import { Logging } from '@tverstraten/log-annotations'
import { LogMethod } from '@tverstraten/log-annotations'
import { ProgrammingLanguage } from './ProgrammingLanguage'
import { SystemComponentType } from './SystemComponentType'
import { SystemDescendantComponent } from './SystemDescendantComponent'
import { ValueTypeResolver } from './ValueTypeResolver'

export class ValueType extends SystemDescendantComponent {
	private static logger = Logging.newLogger(ValueType.name)

	primitive: boolean

	collectedType?: ValueType

	isCollection = false

	private _asCollection?: ValueType

	updateable = false

	static readonly typeResolverMap: Record<string, ValueTypeResolver> = {}

	constructor(objectType: string, nameSpace: string, name: string, desc: string, primitive = true) {
		super(objectType, nameSpace, name, SystemComponentType.informationModel, desc)
		this.primitive = primitive
	}

	static object = new ValueType('ValueType', 'INFORMATION_MODEL', 'object', '', true)

	static string = new ValueType('ValueType', 'INFORMATION_MODEL', 'string', '', true)

	static int = new ValueType('ValueType', 'INFORMATION_MODEL', 'int', '', true)

	static float = new ValueType('ValueType', 'INFORMATION_MODEL', 'float', '', true)

	static boolean = new ValueType('ValueType', 'INFORMATION_MODEL', 'boolean', '', true)

	static dateTime = new ValueType('ValueType', 'INFORMATION_MODEL', 'dateTime', '', true)

	static date = new ValueType('ValueType', 'INFORMATION_MODEL', 'date', '', true)

	static time = new ValueType('ValueType', 'INFORMATION_MODEL', 'time', '', true)

	static interval = new ValueType('ValueType', 'INFORMATION_MODEL', 'interval', '', true)

	static decimal = new ValueType('ValueType', 'INFORMATION_MODEL', 'decimal', '', true)

	static void = new ValueType('ValueType', 'INFORMATION_MODEL', 'void', '', true)

	get asCollection(): ValueType {
		if (this._asCollection == null) {
			this._asCollection = new ValueType(
				'ValueType',
				this.constantCaseNameSpace,
				`${this.name}[]`,
				`A collection of objects described as: ${this.description}`,
				this.primitive
			)
			this._asCollection.collectedType = this
			this._asCollection.isCollection = true
			return this._asCollection
		} else return this._asCollection
	}

	private static types = [
		ValueType.object,
		ValueType.string,
		ValueType.int,
		ValueType.float,
		ValueType.boolean,
		ValueType.dateTime,
		ValueType.date,
		ValueType.time,
		ValueType.interval,
		ValueType.decimal,
		ValueType.void,
	]

	@LogMethod()
	static install(language: ProgrammingLanguage, resolver: ValueTypeResolver): void {
		ValueType.typeResolverMap[language.name] = resolver
	}

	static uninstall(language: ProgrammingLanguage): void {
		delete ValueType.typeResolverMap[language.name]
	}

	static getValues(): ValueType[] {
		return ValueType.types
	}

	static hasNameInType(language: ProgrammingLanguage, name: string): boolean {
		const resolver = ValueType.typeResolverMap[language.name]
		return resolver ? resolver.hasName(name) : false
	}

	static hasName(name: string): boolean {
		if (name == null) throw RangeError(`a value must be provided for name`)
		for (let index = 0; index < ValueType.types.length; index++) {
			const type = ValueType.types[index]
			if (type.name === name) return true
		}
		return false
	}

	static fromNameInType(language: ProgrammingLanguage, name: string): ValueType {
		const resolver = ValueType.typeResolverMap[language.name]
		if (resolver.doesSupport(language)) {
			for (let index = 0; index < ValueType.types.length; index++) {
				const type = ValueType.types[index]
				const optionalName = resolver.fromType(type, false)
				if (optionalName === name) return type
				const mandatoryName = resolver.fromType(type, true)
				if (mandatoryName === name) return type
			}
		}
		throw ReferenceError(`no ValueType for ${name}`)
	}

	static fromName(name: string): ValueType {
		for (let index = 0; index < ValueType.types.length; index++) {
			const type = ValueType.types[index]
			if (type.name === name) return type
		}
		throw ReferenceError(`no ValueType for ${name}`)
	}

	inLanguage(language: ProgrammingLanguage, nullable = false, length = 0): string {
		if (this.isCollection) {
			const componentName = this.collectedType?.inLanguage(language, nullable, length)
			return `${componentName}[]`
		}

		const resolver = ValueType.typeResolverMap[language.name]
		if (!resolver) throw new RangeError(`Cannot map to language ${language}`)
		const definitionSpec = resolver.doesMap(this) ? resolver.fromType(this, nullable) : this.name

		if (definitionSpec != null) {
			let finalForm
			if (length == null) finalForm = definitionSpec.replace(/\%l/, '')
			else finalForm = definitionSpec.replace(/\%l/, length.toString())
			return finalForm
		}

		return this.name
	}

	get isObject(): boolean {
		return false
	}
}
