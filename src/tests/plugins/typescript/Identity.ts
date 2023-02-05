import { User } from './User'

export class Identity {
	id?: string

	provider?: string

	providerId?: string

	forUser?: User
}
