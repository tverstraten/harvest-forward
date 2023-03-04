import { Logging, LogMethod } from '@tverstraten/log-annotations'
import { ProgrammingLanguage } from './ProgrammingLanguage'
import { SystemComponentType } from './SystemComponentType'
import { SystemDescendantComponent } from './SystemDescendantComponent'
import { ValueTypeResolver } from './ValueTypeResolver'

export class ValueType extends SystemDescendantComponent {
	private static logger = Logging.newLogger(ValueType.name)

	primitive: boolean

	collectedType?: ValueType

	isOptional = false

	private _asOptional?: ValueType

	private _asMandatory?: ValueType

	isCollection = false

	private _asCollection?: ValueType

	updateable = false

	static readonly typeResolverMap: Record<string, ValueTypeResolver> = {}

	// eslint-disable-next-line max-params
	constructor(objectType: string, nameSpace: string, name: string, desc: string, primitive = true, isOptional = false, isCollection = false) {
		super(objectType, nameSpace, name, SystemComponentType.informationModel, desc)
		this.primitive = primitive
		this.isOptional = isOptional
		this.isCollection = isCollection
	}

	static object = new ValueType('ValueType', 'INFORMATION_MODEL', 'object', '', true)

	static string = new ValueType('ValueType', 'INFORMATION_MODEL', 'string', '', true)

	static int = new ValueType('ValueType', 'INFORMATION_MODEL', 'int', '', true)

	static number = new ValueType('ValueType', 'INFORMATION_MODEL', 'number', '', true)

	static float = new ValueType('ValueType', 'INFORMATION_MODEL', 'float', '', true)

	static boolean = new ValueType('ValueType', 'INFORMATION_MODEL', 'boolean', '', true)

	static dateTime = new ValueType('ValueType', 'INFORMATION_MODEL', 'dateTime', '', true)

	static date = new ValueType('ValueType', 'INFORMATION_MODEL', 'date', '', true)

	static time = new ValueType('ValueType', 'INFORMATION_MODEL', 'time', '', true)

	static interval = new ValueType('ValueType', 'INFORMATION_MODEL', 'interval', '', true)

	static decimal = new ValueType('ValueType', 'INFORMATION_MODEL', 'decimal', '', true)

	static void = new ValueType('ValueType', 'INFORMATION_MODEL', 'void', '', true)

	get asOptional(): ValueType {
		if (this._asOptional) return this._asOptional

		this._asOptional = new ValueType(
			'ValueType',
			this.constantCaseNameSpace,
			`${this.name}?`,
			`An optional version of the object described as: ${this.description}`,
			this.primitive
		)
		this._asOptional.isOptional = true
		this._asOptional._asMandatory = this

		return this._asOptional
	}

	get asMandatory(): ValueType {
		if (this._asMandatory) return this._asMandatory

		this._asMandatory = new ValueType(
			'ValueType',
			this.constantCaseNameSpace,
			`${this.name}?`,
			`An mandatory version of the object described as: ${this.description}`,
			this.primitive
		)
		this._asMandatory.isOptional = false
		this._asMandatory._asOptional = this

		return this._asMandatory
	}

	get asCollection(): ValueType {
		if (this._asCollection) return this._asCollection

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
	}

	static types = [
		ValueType.object,
		ValueType.object.asOptional,
		ValueType.string,
		ValueType.string.asOptional,
		ValueType.int,
		ValueType.int.asOptional,
		ValueType.number,
		ValueType.number.asOptional,
		ValueType.float,
		ValueType.float.asOptional,
		ValueType.boolean,
		ValueType.boolean.asOptional,
		ValueType.dateTime,
		ValueType.dateTime.asOptional,
		ValueType.date,
		ValueType.date.asOptional,
		ValueType.time,
		ValueType.time.asOptional,
		ValueType.interval,
		ValueType.interval.asOptional,
		ValueType.decimal,
		ValueType.decimal.asOptional,
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

	// remove
	static hasNameInLanguage(language: ProgrammingLanguage, name: string): boolean {
		const resolver = ValueType.typeResolverMap[language.name]
		return resolver && resolver.toType(name) ? true : false
	}

	// remove
	static hasName(name: string): boolean {
		const match = this.fromName(name)
		return match ? true : false
	}

	toNameInLanguage(language: ProgrammingLanguage): string | undefined {
		const resolver = ValueType.typeResolverMap[language.name]
		return resolver ? resolver.fromType(this.name) : undefined
	}

	static fromNameInLanguage(language: ProgrammingLanguage, name: string): ValueType | undefined {
		const resolver = ValueType.typeResolverMap[language.name]
		return resolver ? resolver.toType(name) : undefined
	}

	static fromName(name: string): ValueType | undefined {
		return ValueType.types.find((type) => type.name == name)
	}

	get isObject(): boolean {
		return false
	}
}
