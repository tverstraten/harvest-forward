import { Identity } from './Identity'
import { Message } from './Message'

export class User {
	name?: string

	identities = [] as Identity[]

	messages = [] as Message[]

	sendMessage(__id: number, __subject: string, __body: string, __cc?: string): void {
		return
	}
}
