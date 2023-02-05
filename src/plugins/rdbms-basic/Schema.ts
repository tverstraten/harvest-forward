import { SystemComponentType } from '../../system/SystemComponentType'
import { RelationalComponent } from './RelationalComponent'

export class Schema extends RelationalComponent {
	constructor(dbName: string, name: string, description: string) {
		super('Schema', dbName, name, name, SystemComponentType.storage, description)
	}
}
