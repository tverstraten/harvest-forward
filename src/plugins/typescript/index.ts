import fs from 'fs'
import { Builder } from '../../runtime/Builder'
import { DirectlyMappedValueTypeResolver } from '../../system/DirectlyMappedValueTypeResolver'
import { ProgrammingLanguage } from '../../system/ProgrammingLanguage'
import { ValueType } from '../../system/ValueType'
import { TypescriptClassInheritanceHarvester } from './TypescriptClassInheritanceHarvester'
import { TypeScriptClassMethodToModelHarvester } from './TypeScriptClassMethodToModelHarvester'
import { TypeScriptClassPropertyToModelHarvester } from './TypeScriptClassPropertyToModelHarvester'
import { TypeScriptClassToModelHarvester } from './TypeScriptClassToModelHarvester'
import { TypeScriptEnumValueHarvester } from './TypeScriptEnumValueHarvester'
import { TypeScriptInterfaceToModelHarvester } from './TypeScriptInterfaceToModelHarvester'

const TypeScriptMandatoryValueTypes = {} as { [key: string]: string }
TypeScriptMandatoryValueTypes[ValueType.object.name] = 'any'
TypeScriptMandatoryValueTypes[ValueType.string.name] = 'string'
TypeScriptMandatoryValueTypes[ValueType.int.name] = 'number'
TypeScriptMandatoryValueTypes[ValueType.number.name] = 'number'
TypeScriptMandatoryValueTypes[ValueType.float.name] = 'number'
TypeScriptMandatoryValueTypes[ValueType.boolean.name] = 'boolean'
TypeScriptMandatoryValueTypes[ValueType.dateTime.name] = 'Date'
TypeScriptMandatoryValueTypes[ValueType.date.name] = 'Date'
TypeScriptMandatoryValueTypes[ValueType.time.name] = 'Date'
TypeScriptMandatoryValueTypes[ValueType.interval.name] = 'string'
TypeScriptMandatoryValueTypes[ValueType.decimal.name] = 'number'
TypeScriptMandatoryValueTypes[ValueType.void.name] = 'void'

const TypeScriptOptionalValueTypes = {} as { [key: string]: string }
TypeScriptOptionalValueTypes[ValueType.object.name] = 'any | undefined'
TypeScriptOptionalValueTypes[ValueType.string.name] = 'string | undefined'
TypeScriptOptionalValueTypes[ValueType.int.name] = 'number | undefined'
TypeScriptOptionalValueTypes[ValueType.number.name] = 'number | undefined'
TypeScriptOptionalValueTypes[ValueType.float.name] = 'number | undefined'
TypeScriptOptionalValueTypes[ValueType.boolean.name] = 'boolean | undefined'
TypeScriptOptionalValueTypes[ValueType.dateTime.name] = 'Date | undefined'
TypeScriptOptionalValueTypes[ValueType.date.name] = 'Date | undefined'
TypeScriptOptionalValueTypes[ValueType.time.name] = 'Date | undefined'
TypeScriptOptionalValueTypes[ValueType.interval.name] = 'string | undefined'
TypeScriptOptionalValueTypes[ValueType.decimal.name] = 'number | undefined'
TypeScriptOptionalValueTypes[ValueType.void.name] = 'void'

const ToTypeScriptValueTypes = {} as { [key: string]: ValueType }
ToTypeScriptValueTypes[ValueType.object.name] = ValueType.object
ToTypeScriptValueTypes[ValueType.string.name] = ValueType.string
ToTypeScriptValueTypes[ValueType.number.name] = ValueType.number
ToTypeScriptValueTypes[ValueType.int.name] = ValueType.number
ToTypeScriptValueTypes[ValueType.float.name] = ValueType.number
ToTypeScriptValueTypes[ValueType.decimal.name] = ValueType.number
ToTypeScriptValueTypes[ValueType.boolean.name] = ValueType.boolean
ToTypeScriptValueTypes[ValueType.dateTime.name] = ValueType.dateTime
ToTypeScriptValueTypes[ValueType.void.name] = ValueType.void

export const TYPE_RESOLVERS = {
	typeScript: new DirectlyMappedValueTypeResolver(
		ProgrammingLanguage.typeScript,
		TypeScriptMandatoryValueTypes,
		TypeScriptOptionalValueTypes,
		ToTypeScriptValueTypes
	),
}

export const BUILDERS = {
	enumValueHarvester: (settings: any): Builder => new TypeScriptEnumValueHarvester(settings),
	classToModelHarvester: (settings: any): Builder => new TypeScriptClassToModelHarvester(settings),
	classPropertyToModelHarvester: (settings: any): Builder => new TypeScriptClassPropertyToModelHarvester(settings),
	classInheritanceHarvester: (settings: any): Builder => new TypescriptClassInheritanceHarvester(settings),
	interfaceToModelHarvester: (settings: any): Builder => new TypeScriptInterfaceToModelHarvester(settings),
	methodToModelHarvester: (settings: any): Builder => new TypeScriptClassMethodToModelHarvester(settings),
}

export const TEMPLATES = {
	poco: { type: 'handlebars', contents: (): string => fs.readFileSync(`${__dirname}/Poco.handlebars`).toString() },
}

export * from './AbstractTypeScriptAstHarvester'
export * from './TypescriptClassInheritanceHarvester'
export * from './TypeScriptClassMethodToModelHarvester'
export * from './TypeScriptClassPropertyToModelHarvester'
export * from './TypeScriptClassToModelHarvester'
export * from './TypeScriptEnumValueHarvester'
export * from './TypeScriptInterfaceToModelHarvester'
