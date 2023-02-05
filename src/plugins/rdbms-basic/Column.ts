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

	isNullable: boolean

	isIdentity: boolean

	dataType: string

	valueType: ValueType

	inDomain?: Domain

	characterMaximumLength: number

	ansiTypeDeclaration: string

	foreignKey?: ForeignKey

	constraint?: Constraint

	// eslint-disable-next-line max-params
	constructor(
		schemaName: string,
		tableName: string,
		name: string,
		description: string,
		dataType: string,
		valueType: ValueType,
		characterMaximumLength: number,
		ansiTypeDeclaration: string
	) {
		super('Column', System.fullConstantCase(schemaName, tableName), schemaName, name, SystemComponentType.storage, description)
		this.dataType = dataType
		this._tableName = tableName
		this.valueType = valueType
		this.characterMaximumLength = characterMaximumLength
		this.ansiTypeDeclaration = ansiTypeDeclaration
		this.ordinalPosition = 0
		this.isNullable = true
		this.isIdentity = false
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

	get discriminator(): boolean {
		return (this.storage as any)?.orMapping?.discriminatorColumn == this
	}
}
