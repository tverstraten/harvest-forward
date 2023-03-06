import { ProgrammingLanguage } from '../../system/ProgrammingLanguage'
import { System } from '../../system/System'
import { SystemComponentType } from '../../system/SystemComponentType'
import { ValueType } from '../../system/ValueType'
import { Constraint } from './Constraint'
import { Domain } from './Domain'
import { ForeignKey } from './ForeignKey'
import { RelationalComponent } from './RelationalComponent'
import { Table } from './Table'
import { View } from './View'

export class Column extends RelationalComponent {
	private _tableName: string

	private _storage?: Table | View

	ordinalPosition: number

	columnDefault: any

	autoIncrement: boolean

	valueType: ValueType

	inDomain?: Domain

	characterMaximumLength: number

	precision: number

	scale: number

	foreignKey?: ForeignKey

	constraint?: Constraint

	// eslint-disable-next-line max-params
	constructor(schemaName: string, tableName: string, name: string, description: string, valueType: ValueType, characterMaximumLength: number) {
		super('Column', System.fullConstantCase(schemaName, tableName), schemaName, name, SystemComponentType.storage, description)
		this._tableName = tableName
		this.valueType = valueType
		this.characterMaximumLength = characterMaximumLength
		this.ordinalPosition = 0
		this.autoIncrement = false
		this.precision = 0
		this.scale = 0
	}

	static computeFullName(schemaName: string, tableName: string): string {
		return System.fullConstantCase(schemaName, tableName)
	}

	get tableName(): string {
		return this._tableName
	}

	set tableName(value: string) {
		this._tableName = value
		this.setNames(System.fullConstantCase(this.schemaName, this._tableName), this.name)
	}

	set nameSpace(value: string) {
		super.nameSpace = value
		const lastSlash = value.lastIndexOf('/')
		this._tableName = value.substring(lastSlash + 1)
		this.schemaName = value.substring(0, lastSlash)
	}

	get storage(): Table | View | undefined {
		return this._storage
	}

	set storage(value: Table | View | undefined) {
		this._storage = value
		if (value != null) {
			this.tableName = value.name
			this.schemaName = value.schemaName
		}
	}

	get ansiTypeDeclaration(): string {
		const dataTypeName = this.valueType.toNameInLanguage(ProgrammingLanguage.sql)
		let sqlText

		switch (this.valueType) {
			case ValueType.string:
			case ValueType.string.asOptional:
				sqlText = `${dataTypeName}(${this.characterMaximumLength})`
				break
			case ValueType.decimal:
			case ValueType.decimal.asOptional:
			case ValueType.number:
			case ValueType.number.asOptional:
				sqlText = `${dataTypeName}(${this.precision}, ${this.scale})`
				break
			case ValueType.float:
			case ValueType.float.asOptional:
				sqlText = `${dataTypeName}(${this.precision}, ${this.scale})`
				break
			default:
				sqlText = `${dataTypeName}`
		}

		if (this.columnDefault) sqlText += ` DEFAULT ${this.columnDefault}`
		if (this.autoIncrement) sqlText += ` AUTO_INCREMENT`

		return sqlText
	}

	get discriminator(): boolean {
		return (this.storage as any)?.orMapping?.discriminatorColumn == this
	}
}
