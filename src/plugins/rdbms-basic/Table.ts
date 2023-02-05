import { SystemComponent } from '../../system/SystemComponent'
import { SystemComponentType } from '../../system/SystemComponentType'
import { Column } from './Column'
import { Constraint } from './Constraint'
import { ForeignKey } from './ForeignKey'
import { RelationalStorage } from './RelationalStorage'
import { Schema } from './Schema'
import { TableType } from './TableType'

export class Table extends RelationalStorage {
	primaryKey?: Column

	_foreignKeys: { [key: string]: ForeignKey }

	_constraints: { [key: string]: Constraint }

	constructor(schema: Schema, tableName: string, description: string, tableType: TableType) {
		super('Table', schema, tableName, description, tableType, SystemComponentType.storage)
		this._constraints = {}
		this._foreignKeys = {}
	}

	get foreignKeys(): { [key: string]: ForeignKey } {
		return this._foreignKeys
	}

	get constraints(): { [key: string]: Constraint } {
		return this._constraints
	}

	addChild(child: SystemComponent): void {
		super.addChild(child)
		this.database.addDescendant(child)
		if (child instanceof ForeignKey) this._foreignKeys[child.constantCaseName] = child
		else if (child instanceof Constraint) this._constraints[child.constantCaseName] = child
	}

	removeChild(child: SystemComponent): boolean {
		this.database.removeDescendant(child)
		if (child instanceof ForeignKey) delete this._foreignKeys[child.constantCaseName]
		else if (child instanceof Constraint) delete this._constraints[child.constantCaseName]
		return super.removeChild(child)
	}
}
