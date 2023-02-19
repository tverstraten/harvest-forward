import fs from 'fs'
import { ProgrammingLanguage } from '../../../system/ProgrammingLanguage'
import { SimpleMappedValueTypeResolver } from '../../../system/SimpleMappedValueTypeResolver'
import { ValueType } from '../../../system/ValueType'

const JavaScriptMandatoryValueTypes = {} as { [key: string]: string }
JavaScriptMandatoryValueTypes[ValueType.object.name] = 'any'
JavaScriptMandatoryValueTypes[ValueType.string.name] = 'string'
JavaScriptMandatoryValueTypes[ValueType.int.name] = 'number'
JavaScriptMandatoryValueTypes[ValueType.float.name] = 'number'
JavaScriptMandatoryValueTypes[ValueType.boolean.name] = 'boolean'
JavaScriptMandatoryValueTypes[ValueType.dateTime.name] = 'Date'
JavaScriptMandatoryValueTypes[ValueType.date.name] = 'Date'
JavaScriptMandatoryValueTypes[ValueType.time.name] = 'Date'
JavaScriptMandatoryValueTypes[ValueType.interval.name] = 'string'
JavaScriptMandatoryValueTypes[ValueType.decimal.name] = 'number'
JavaScriptMandatoryValueTypes[ValueType.void.name] = 'undefined'

const JavaScriptOptionalValueTypes = {} as { [key: string]: string }
JavaScriptOptionalValueTypes[ValueType.object.name] = 'any | null'
JavaScriptOptionalValueTypes[ValueType.string.name] = 'string | null'
JavaScriptOptionalValueTypes[ValueType.int.name] = 'number | null'
JavaScriptOptionalValueTypes[ValueType.float.name] = 'number | null'
JavaScriptOptionalValueTypes[ValueType.boolean.name] = 'boolean | null'
JavaScriptOptionalValueTypes[ValueType.dateTime.name] = 'Date | null'
JavaScriptOptionalValueTypes[ValueType.date.name] = 'Date | null'
JavaScriptOptionalValueTypes[ValueType.time.name] = 'Date | null'
JavaScriptOptionalValueTypes[ValueType.interval.name] = 'string | null'
JavaScriptOptionalValueTypes[ValueType.decimal.name] = 'number | null'
JavaScriptOptionalValueTypes[ValueType.void.name] = 'undefined'

export const typeResolvers = {
	JavaScript: new SimpleMappedValueTypeResolver(ProgrammingLanguage.javaScript, JavaScriptMandatoryValueTypes, JavaScriptOptionalValueTypes),
}

export const templates = { Poco: { type: 'handlebars', contents: (): string => fs.readFileSync(`${__dirname}/Poco.handlebars`).toString() } }
