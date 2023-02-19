import fs from 'fs'
import { Builder } from '../../../runtime/Builder'
import { MySqlColumnHarvester } from './MySqlColumnHarvester'
import { MySqlConstraintHarvester } from './MySqlConstraintHarvester'
import { MySqlDomainHarvester } from './MySqlDomainHarvester'
import { MySqlFkHarvester } from './MySqlFkHarvester'
import { MySqlPkHarvester } from './MySqlPkHarvester'
import { MySqlTableHarvester } from './MySqlTableHarvester'
import { MySqlViewHarvester } from './MySqlViewHarvester'

export const builders = {
	ColumnHarvester: (settings: any): Builder => new MySqlColumnHarvester(settings),
	ConstraintHarvester: (settings: any): Builder => new MySqlConstraintHarvester(settings),
	DomainHarvester: (settings: any): Builder => new MySqlDomainHarvester(settings),
	FkHarvester: (settings: any): Builder => new MySqlFkHarvester(settings),
	PkHarvester: (settings: any): Builder => new MySqlPkHarvester(settings),
	TableHarvester: (settings: any): Builder => new MySqlTableHarvester(settings),
	ViewHarvester: (settings: any): Builder => new MySqlViewHarvester(settings),
}

export const templates = { Schema: { type: 'handlebars', contents: (): string => fs.readFileSync(`${__dirname}/MySqlSchema.handlebars`).toString() } }

export * from './AbstractMySqlSchemaHarvester'
export * from './MySqlColumnHarvester'
export * from './MySqlConstraintHarvester'
export * from './MySqlDomainHarvester'
export * from './MySqlFkHarvester'
export * from './MySqlPkHarvester'
export * from './MySqlTableHarvester'
export * from './MySqlViewHarvester'
