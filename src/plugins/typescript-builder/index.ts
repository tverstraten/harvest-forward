import { Builder } from '../../runtime/Builder'
import { TypeScriptBuilder } from './TypescriptBuilder'

export const BUILDERS = { typeScriptBuilder: (settings: any): Builder => new TypeScriptBuilder(settings) }

export * from './TypescriptBuilder'
