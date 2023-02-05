import { Builder } from '../../runtime/Builder'
import { NpmRunner } from './NpmRunner'

export const BUILDERS = { npmRunner: (settings: any): Builder => new NpmRunner(settings) }
