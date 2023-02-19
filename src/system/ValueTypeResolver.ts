import { ProgrammingLanguage } from './ProgrammingLanguage'
import { ValueType } from './ValueType'

/**
 * Maps type names in a specified language to and from the generic types.
 */
export interface ValueTypeResolver {
	doesSupport(language: ProgrammingLanguage): boolean

	/**
	 * Does this provide a mapping for the given type name in the instances programming language.
	 *
	 * @param typeName - The name of the language specific type to check for.
	 * @returns True if typeName is mapped in this.language.
	 */
	doesMap(typeName: string): boolean

	/**
	 * Get the name of the type in the supported language for the specified generic type.
	 *
	 * @param type - The generic type or the generic type name to be converted to the supported language.
	 * @returns The supported language name for the given generic type. If it is not mapped, undefined will be returned.
	 */
	fromType(type: ValueType | string): string | undefined

	/**
	 * Get the generic type that is used to describe the type reference by the specific name in the supported language.
	 *
	 * @param name - The name of the type in the supported programming language to convert.
	 * @returns The "generic" type that corresponds to the name. If it is not mapped, undefined will be returned.
	 */
	toType(name: string): ValueType | undefined

	/**
	 * Get the name of generic type that is used to describe the type reference by the specific name in the supported language.
	 *
	 * @param name - The name of the type in the supported programming language to convert.
	 * @returns The name of "generic" type that corresponds to the name. If it is not mapped, undefined will be returned.
	 */
	toTypeName(name: string): string | undefined
}
