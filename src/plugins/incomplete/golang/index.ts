import fs from 'fs'
import { ProgrammingLanguage } from '../../../system/ProgrammingLanguage'
import { SimpleMappedValueTypeResolver } from '../../../system/SimpleMappedValueTypeResolver'
import { ValueType } from '../../../system/ValueType'

const GoMandatoryValueTypes = {} as { [key: string]: string }
GoMandatoryValueTypes[ValueType.object.name] = 'Object'
GoMandatoryValueTypes[ValueType.string.name] = 'string'
GoMandatoryValueTypes[ValueType.int.name] = 'long'
GoMandatoryValueTypes[ValueType.float.name] = 'double'
GoMandatoryValueTypes[ValueType.boolean.name] = 'boolean'
GoMandatoryValueTypes[ValueType.dateTime.name] = 'Date'
GoMandatoryValueTypes[ValueType.date.name] = 'Date'
GoMandatoryValueTypes[ValueType.time.name] = 'Date'
GoMandatoryValueTypes[ValueType.interval.name] = 'string'
GoMandatoryValueTypes[ValueType.decimal.name] = 'double'
GoMandatoryValueTypes[ValueType.void.name] = 'void'

const GoOptionalValueTypes = {} as { [key: string]: string }
GoOptionalValueTypes[ValueType.object.name] = 'Object'
GoOptionalValueTypes[ValueType.string.name] = 'string'
GoOptionalValueTypes[ValueType.int.name] = 'long'
GoOptionalValueTypes[ValueType.float.name] = 'double'
GoOptionalValueTypes[ValueType.boolean.name] = 'boolean'
GoOptionalValueTypes[ValueType.dateTime.name] = 'Date'
GoOptionalValueTypes[ValueType.date.name] = 'Date'
GoOptionalValueTypes[ValueType.time.name] = 'Date'
GoOptionalValueTypes[ValueType.interval.name] = 'string'
GoOptionalValueTypes[ValueType.decimal.name] = 'double'
GoOptionalValueTypes[ValueType.void.name] = 'void'

export const GoValueTypeResolver = new SimpleMappedValueTypeResolver(ProgrammingLanguage.go, GoMandatoryValueTypes, GoOptionalValueTypes)

export const templates = { Poco: { type: 'handlebars', contents: (): string => fs.readFileSync(`${__dirname}/Poco.handlebars`).toString() } }
