import { Identifiable } from './Identifiable'
import { User } from './User'

export class Message implements Identifiable {
	id?: string

	forUser?: User

	content?: string

	static someDefault = 'hello'
}
