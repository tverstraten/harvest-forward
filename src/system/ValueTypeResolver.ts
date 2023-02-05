import { ProgrammingLanguage } from './ProgrammingLanguage'

export interface ValueTypeResolver {
	doesSupport(language: ProgrammingLanguage): boolean

	doesMap(type: any): boolean

	fromType(originalType: any, optional: boolean): string

	hasName(name: string): boolean

	toType(name: string): string | undefined
}
