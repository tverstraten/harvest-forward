import { System } from '../../system/System'
import { SystemComponent } from '../../system/SystemComponent'
import { SystemComponentComparator } from '../../system/SystemComponentComparator'
import { SystemComponentType } from '../../system/SystemComponentType'
import { SystemDescendantComponent } from '../../system/SystemDescendantComponent'
import { Column } from './Column'
import { Constraint } from './Constraint'
import { Domain } from './Domain'
import { ForeignKey } from './ForeignKey'
import { PrimaryKey } from './PrimaryKey'
import { Table } from './Table'
import { View } from './View'

export class RelationalDatabase extends SystemDescendantComponent {
	private _tables: Table[] = []

	private _views: View[] = []

	private _columns: Column[] = []

	private _domains: Domain[] = []

	private _foreignKeys: ForeignKey[] = []

	private _primaryKeys: PrimaryKey[] = []

	private _constraints: Constraint[] = []

	constructor(nameSpace: string, name: string, description: string) {
		super('RelationalDatabase', nameSpace, name, SystemComponentType.storage, description)
	}

	static fromSystem(system: System): RelationalDatabase {
		let model = system.findOneComponent({
			objectTypeName: 'RelationalDatabase',
		}) as RelationalDatabase
		if (model == null) {
			model = new RelationalDatabase(
				'',
				'RelationalDatabase',
				'The data that describes the structure of a relational database providing storage for the system.'
			)
			system.addChild(model)
		}
		return model
	}

	addChild(child: SystemComponent): void {
		super.addChild(child)
		this.addDescendant(child)
	}

	addDescendant(descendant: SystemComponent): void {
		super.addDescendant(descendant)
		if (descendant instanceof Table && !this._tables.includes(descendant)) {
			this._tables.push(descendant)
			this._tables.sort(SystemComponentComparator)
		} else if (descendant instanceof View && !this._views.includes(descendant)) {
			this._views.push(descendant)
			this._views.sort(SystemComponentComparator)
		} else if (descendant instanceof Column && !this._columns.includes(descendant)) {
			this._columns.push(descendant)
			this._columns.sort(SystemComponentComparator)
		} else if (descendant instanceof Domain && !this._domains.includes(descendant)) {
			this._domains.push(descendant)
			this._domains.sort(SystemComponentComparator)
		} else if (descendant instanceof ForeignKey && !this._foreignKeys.includes(descendant)) {
			this._foreignKeys.push(descendant)
			this._foreignKeys.sort(SystemComponentComparator)
		} else if (descendant instanceof PrimaryKey && !this._primaryKeys.includes(descendant)) {
			this._primaryKeys.push(descendant)
			this._primaryKeys.sort(SystemComponentComparator)
		} else if (descendant instanceof Constraint && !this._constraints.includes(descendant)) {
			this._constraints.push(descendant)
			this._constraints.sort(SystemComponentComparator)
		}
	}

	removeChild(child: SystemComponent): boolean {
		this.removeDescendant(child)
		return super.removeChild(child)
	}

	removeDescendant(descendant: SystemComponent): void {
		super.removeDescendant(descendant)
		let index
		if (descendant instanceof Table) {
			index = this._tables.indexOf(descendant, 0)
			if (index > -1) this._tables.splice(index, 1)
		} else if (descendant instanceof View) {
			index = this._views.indexOf(descendant, 0)
			if (index > -1) this._views.splice(index, 1)
		} else if (descendant instanceof Column) {
			index = this._columns.indexOf(descendant, 0)
			if (index > -1) this._columns.splice(index, 1)
		} else if (descendant instanceof Domain) {
			index = this._domains.indexOf(descendant, 0)
			if (index > -1) this._domains.splice(index, 1)
		} else if (descendant instanceof ForeignKey) {
			index = this._foreignKeys.indexOf(descendant, 0)
			if (index > -1) this._foreignKeys.splice(index, 1)
		} else if (descendant instanceof PrimaryKey) {
			index = this._primaryKeys.indexOf(descendant, 0)
			if (index > -1) this._primaryKeys.splice(index, 1)
		} else if (descendant instanceof Constraint) {
			index = this._constraints.indexOf(descendant, 0)
			if (index > -1) this._constraints.splice(index, 1)
		}
	}

	get tables(): Table[] {
		return this._tables
	}

	get views(): View[] {
		return this._views
	}

	get columns(): Column[] {
		return this._columns
	}

	get domains(): Domain[] {
		return this._domains
	}

	get foreignKeys(): ForeignKey[] {
		return this._foreignKeys
	}

	get primaryKeys(): PrimaryKey[] {
		return this._primaryKeys
	}

	get constraints(): Constraint[] {
		return this._constraints
	}
}
