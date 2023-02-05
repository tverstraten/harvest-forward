import { Builder } from '../../runtime/Builder'
import { NodeRunner } from './NodeRunner'

export const BUILDERS = { nodeRunner: (settings: any): Builder => new NodeRunner(settings) }
