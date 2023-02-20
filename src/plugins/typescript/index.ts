import fs from 'fs'
import { Builder } from '../../runtime/Builder'
import { ProgrammingLanguage } from '../../system/ProgrammingLanguage'
import { SimpleMappedValueTypeResolver } from '../../system/SimpleMappedValueTypeResolver'
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
	[ValueType.object.asOptional, 'any | undefined'],
	[ValueType.string.asOptional, 'string | undefined'],
	[ValueType.int.asOptional, 'number | undefined'],
	[ValueType.number.asOptional, 'number | undefined'],
	[ValueType.float.asOptional, 'number | undefined'],
	[ValueType.boolean.asOptional, 'boolean | undefined'],
	[ValueType.dateTime.asOptional, 'Date | undefined'],
	[ValueType.date.asOptional, 'Date | undefined'],
	[ValueType.time.asOptional, 'Date | undefined'],
	[ValueType.interval.asOptional, 'string | undefined'],
	[ValueType.decimal.asOptional, 'number | undefined'],
	[ValueType.void.asOptional, 'void'],
])

export const TYPE_RESOLVERS = {
	typeScript: new SimpleMappedValueTypeResolver(
		ProgrammingLanguage.typeScript,
		TypeScriptValueTypes
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
