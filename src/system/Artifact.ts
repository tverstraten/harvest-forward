import { Nameable } from './Nameable'
import { StringIdentifiable } from './StringIdentifiable'

export interface Artifact extends StringIdentifiable, Nameable {
	path: string
}
