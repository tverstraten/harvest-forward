/* eslint-disable @typescript-eslint/naming-convention */
import { Builder } from '../../../runtime/Builder'
import { EjsGenerator } from './EjsGenerator'

export const builders = {
	Generator: (settings: any): Builder => new EjsGenerator(settings),
}
