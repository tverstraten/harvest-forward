import fs from 'fs'
import { Builder } from '../../runtime/Builder'
import { BidirectionalMappedValueTypeResolver } from '../../system/BidirectionalMappedValueTypeResolver'
import { ProgrammingLanguage } from '../../system/ProgrammingLanguage'
import { ValueType } from '../../system/ValueType'
import { TypescriptClassInheritanceHarvester } from './TypescriptClassInheritanceHarvester'
import { TypeScriptClassMethodToModelHarvester } from './TypeScriptClassMethodToModelHarvester'
import { TypeScriptClassPropertyToModelHarvester } from './TypeScriptClassPropertyToModelHarvester'
import { TypeScriptClassToModelHarvester } from './TypeScriptClassToModelHarvester'
import { TypeScriptEnumValueHarvester } from './TypeScriptEnumValueHarvester'
import { TypeScriptInterfaceToModelHarvester } from './TypeScriptInterfaceToModelHarvester'

const TypeScriptValueTypes: Map<ValueType, string> = new Map<ValueType, string>([
	[ValueType.object, 'any'],
	[ValueType.string, 'string'],
	[ValueType.int, 'number'],
	[ValueType.number, 'number'],
	[ValueType.float, 'number'],
	[ValueType.boolean, 'boolean'],
	[ValueType.dateTime, 'Date'],
	[ValueType.date, 'Date'],
	[ValueType.time, 'Date'],
	[ValueType.interval, 'string'],
	[ValueType.decimal, 'number'],
	[ValueType.void, 'void'],
	[ValueType.object.asOptional, 'any?'],
	[ValueType.string.asOptional, 'string?'],
	[ValueType.int.asOptional, 'number?'],
	[ValueType.number.asOptional, 'number?'],
	[ValueType.float.asOptional, 'number?'],
	[ValueType.boolean.asOptional, 'boolean?'],
	[ValueType.dateTime.asOptional, 'Date?'],
	[ValueType.date.asOptional, 'Date?'],
	[ValueType.time.asOptional, 'Date?'],
	[ValueType.interval.asOptional, 'string?'],
	[ValueType.decimal.asOptional, 'number?'],
	[ValueType.void.asOptional, 'void'],
])

const ReverseTypeScriptValueTypes: Map<string, ValueType> = new Map<string, ValueType>([
	['any', ValueType.object],
	['string', ValueType.string],
	['number', ValueType.number],
	['boolean', ValueType.boolean],
	['Date', ValueType.dateTime],
	['void', ValueType.void],
	['any?', ValueType.object.asOptional],
	['string?', ValueType.string.asOptional],
	['number?', ValueType.number.asOptional],
	['boolean?', ValueType.boolean.asOptional],
	['Date?', ValueType.dateTime.asOptional],
])

export const TYPE_RESOLVERS = {
	typeScript: new BidirectionalMappedValueTypeResolver(ProgrammingLanguage.typeScript, TypeScriptValueTypes, ReverseTypeScriptValueTypes),
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
