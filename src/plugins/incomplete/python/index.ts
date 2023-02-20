/* eslint-disable @typescript-eslint/naming-convention */
import fs from 'fs'
import { ProgrammingLanguage } from '../../../system/ProgrammingLanguage'
import { SimpleMappedValueTypeResolver } from '../../../system/SimpleMappedValueTypeResolver'
import { ValueType } from '../../../system/ValueType'

const PythonValueTypes: Map<ValueType, string> = new Map<ValueType, string>([
	[ValueType.object, 'Object'],
	[ValueType.string, 'string'],
	[ValueType.int, 'number'],
	[ValueType.float, 'number'],
	[ValueType.boolean, 'boolean'],
	[ValueType.dateTime, 'Date'],
	[ValueType.date, 'Date'],
	[ValueType.time, 'Date'],
	[ValueType.interval, 'string'],
	[ValueType.decimal, 'number'],
	[ValueType.void, 'null'],
	[ValueType.object.asOptional, 'Object'],
	[ValueType.string.asOptional, 'string'],
	[ValueType.int.asOptional, 'number'],
	[ValueType.float.asOptional, 'number'],
	[ValueType.boolean.asOptional, 'boolean'],
	[ValueType.dateTime.asOptional, 'Date'],
	[ValueType.date.asOptional, 'Date'],
	[ValueType.time.asOptional, 'Date'],
	[ValueType.interval.asOptional, 'string'],
	[ValueType.decimal.asOptional, 'number'],
	[ValueType.void.asOptional, 'null'],
])

export const typeResolvers = {
	Python: new SimpleMappedValueTypeResolver(ProgrammingLanguage.python, PythonValueTypes),
}

export const templates = { Poco: { type: 'handlebars', contents: (): string => fs.readFileSync(`${__dirname}/Poco.handlebars`).toString() } }
