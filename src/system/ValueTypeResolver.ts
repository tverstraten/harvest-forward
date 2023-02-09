import { ProgrammingLanguage } from './ProgrammingLanguage'
import { ValueType } from './ValueType'

export interface ValueTypeResolver {
	doesSupport(language: ProgrammingLanguage): boolean

	doesMap(type: any): boolean

	fromType(originalType: any, optional: boolean): string

	hasName(name: string): boolean

	toTypeName(name: string): string | undefined

	toType(name: string): ValueType | undefined
}
