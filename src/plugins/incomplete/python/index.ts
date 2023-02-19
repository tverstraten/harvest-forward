import fs from 'fs'
import { ProgrammingLanguage } from '../../../system/ProgrammingLanguage'
import { SimpleMappedValueTypeResolver } from '../../../system/SimpleMappedValueTypeResolver'
import { ValueType } from '../../../system/ValueType'

const PythonMandatoryValueTypes = {} as { [key: string]: string }
PythonMandatoryValueTypes[ValueType.object.name] = 'Object'
PythonMandatoryValueTypes[ValueType.string.name] = 'string'
PythonMandatoryValueTypes[ValueType.int.name] = 'number'
PythonMandatoryValueTypes[ValueType.float.name] = 'number'
PythonMandatoryValueTypes[ValueType.boolean.name] = 'boolean'
PythonMandatoryValueTypes[ValueType.dateTime.name] = 'Date'
PythonMandatoryValueTypes[ValueType.date.name] = 'Date'
PythonMandatoryValueTypes[ValueType.time.name] = 'Date'
PythonMandatoryValueTypes[ValueType.interval.name] = 'string'
PythonMandatoryValueTypes[ValueType.decimal.name] = 'number'
PythonMandatoryValueTypes[ValueType.void.name] = 'null'

const PythonOptionalValueTypes = {} as { [key: string]: string }
PythonOptionalValueTypes[ValueType.object.name] = 'Object'
PythonOptionalValueTypes[ValueType.string.name] = 'string'
PythonOptionalValueTypes[ValueType.int.name] = 'number'
PythonOptionalValueTypes[ValueType.float.name] = 'number'
PythonOptionalValueTypes[ValueType.boolean.name] = 'boolean'
PythonOptionalValueTypes[ValueType.dateTime.name] = 'Date'
PythonOptionalValueTypes[ValueType.date.name] = 'Date'
PythonOptionalValueTypes[ValueType.time.name] = 'Date'
PythonOptionalValueTypes[ValueType.interval.name] = 'string'
PythonOptionalValueTypes[ValueType.decimal.name] = 'number'
PythonOptionalValueTypes[ValueType.void.name] = 'null'

export const typeResolvers = {
	Python: new SimpleMappedValueTypeResolver(ProgrammingLanguage.python, PythonMandatoryValueTypes, PythonOptionalValueTypes),
}

export const templates = { Poco: { type: 'handlebars', contents: (): string => fs.readFileSync(`${__dirname}/Poco.handlebars`).toString() } }
