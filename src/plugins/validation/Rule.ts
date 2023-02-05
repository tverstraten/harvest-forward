import { Describable } from '../../system/Describable'
import { Nameable } from '../../system/Nameable'
import { StringIdentifiable } from '../../system/StringIdentifiable'

export interface Rule extends StringIdentifiable, Nameable, Describable {}
