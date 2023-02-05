import { Builder } from '../../runtime/Builder'
import { JavaScriptRunner } from './JavaScriptRunner'

export const BUILDERS = { javaScriptRunner: (settings: any): Builder => new JavaScriptRunner(settings) }
