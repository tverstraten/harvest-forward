import { Builder } from '../../runtime/Builder'
import fs from 'fs'
import { ProgrammingLanguage } from '../../system/ProgrammingLanguage'
import { SimpleMappedValueTypeResolver } from '../../system/SimpleMappedValueTypeResolver'
import { ValueType } from '../../system/ValueType'
import { TypeScriptClassFieldToModelHarvester } from './TypeScriptClassFieldToModelHarvester'
import { TypeScriptClassPropertyToModelHarvester } from './TypeScriptClassPropertyToModelHarvester'
import { TypeScriptClassToModelHarvester } from './TypeScriptClassToModelHarvester'
import { TypeScriptEnumValueHarvester } from './TypeScriptEnumValueHarvester'

const TypeScriptMandatoryValueTypes = {} as { [key: string]: string }
TypeScriptMandatoryValueTypes[ValueType.object.name] = 'any'
TypeScriptMandatoryValueTypes[ValueType.string.name] = 'string'
TypeScriptMandatoryValueTypes[ValueType.int.name] = 'number'
TypeScriptMandatoryValueTypes[ValueType.float.name] = 'number'
TypeScriptMandatoryValueTypes[ValueType.boolean.name] = 'boolean'
TypeScriptMandatoryValueTypes[ValueType.dateTime.name] = 'Date'
TypeScriptMandatoryValueTypes[ValueType.date.name] = 'Date'
TypeScriptMandatoryValueTypes[ValueType.time.name] = 'Date'
TypeScriptMandatoryValueTypes[ValueType.interval.name] = 'string'
TypeScriptMandatoryValueTypes[ValueType.decimal.name] = 'number'
TypeScriptMandatoryValueTypes[ValueType.void.name] = 'void'

const TypeScriptOptionalValueTypes = {} as { [key: string]: string }
TypeScriptOptionalValueTypes[ValueType.object.name] = 'any | null'
TypeScriptOptionalValueTypes[ValueType.string.name] = 'string | null'
TypeScriptOptionalValueTypes[ValueType.int.name] = 'number | null'
TypeScriptOptionalValueTypes[ValueType.float.name] = 'number | null'
TypeScriptOptionalValueTypes[ValueType.boolean.name] = 'boolean | null'
TypeScriptOptionalValueTypes[ValueType.dateTime.name] = 'Date | null'
TypeScriptOptionalValueTypes[ValueType.date.name] = 'Date | null'
TypeScriptOptionalValueTypes[ValueType.time.name] = 'Date | null'
TypeScriptOptionalValueTypes[ValueType.interval.name] = 'string | null'
TypeScriptOptionalValueTypes[ValueType.decimal.name] = 'number | null'
TypeScriptOptionalValueTypes[ValueType.void.name] = 'void'

export const TYPE_RESOLVERS = {
	typeScript: new SimpleMappedValueTypeResolver(ProgrammingLanguage.typeScript, TypeScriptMandatoryValueTypes, TypeScriptOptionalValueTypes),
}

export const BUILDERS = {
	enumValueHarvester: (settings: any): Builder => new TypeScriptEnumValueHarvester(settings),
	classFieldToModelHarvester: (settings: any): Builder => new TypeScriptClassFieldToModelHarvester(settings),
	classToModelHarvester: (settings: any): Builder => new TypeScriptClassToModelHarvester(settings),
	classPropertyToModelHarvester: (settings: any): Builder => new TypeScriptClassPropertyToModelHarvester(settings),
}

export const TEMPLATES = {
	poco: { type: 'handlebars', contents: (): string => fs.readFileSync(`${__dirname}/Poco.handlebars`).toString() },
}

export * from './AbstractTypeScriptAstHarvester'
export * from './TypeScriptClassFieldToModelHarvester'
export * from './TypeScriptClassPropertyToModelHarvester'
export * from './TypeScriptClassToModelHarvester'
export * from './TypeScriptEnumValueHarvester'
