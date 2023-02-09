import { Identifiable } from './Identifiable'
import { IdentityProvider } from './IdentityProvider'
import { User } from './User'

export class Identity implements Identifiable {
	id?: string

	provider?: IdentityProvider

	providerId?: number

	forUser?: User
}
