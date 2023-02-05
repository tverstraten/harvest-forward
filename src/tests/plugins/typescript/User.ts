import { Identity } from './Identity'
import { Message } from './Message'

export class User {
	name?: string

	identities = [] as Identity[]

	messages = [] as Message[]
}
