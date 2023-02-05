import { TableType } from './TableType'

export class TableTypeInfo {
	static descriptions: Map<TableType, string> = new Map([
		[TableType.table, 'a structure that contains its own data'],
		[TableType.view, 'a dynamic structure that is based on other tables'],
		[TableType.systemView, 'a dynamic structure that is based internal system data'],
	])

	static hasName(name: string): boolean {
		const typeValues = Object.values(TableType)
		for (const value in Object.values(TableType)) {
			const textValue = typeValues[value]
			if (textValue === name) return true
		}

		return false
	}

	static fromName(name: string): TableType {
		const typeValues = Object.values(TableType)
		for (const value in Object.values(TableType)) {
			const textValue = typeValues[value]
			if (textValue === name) return textValue as TableType
		}

		throw RangeError(`TableType does not have a value of ${name}`)
	}

	static description(type: TableType): string {
		if (TableTypeInfo.descriptions.has(type)) return TableTypeInfo.descriptions.get(type) as string

		throw RangeError(`There is no description for the type ${type}`)
	}
}
