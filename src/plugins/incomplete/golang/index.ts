/* eslint-disable @typescript-eslint/naming-convention */
import fs from 'fs'
import { ProgrammingLanguage } from '../../../system/ProgrammingLanguage'
import { SimpleMappedValueTypeResolver } from '../../../system/SimpleMappedValueTypeResolver'
import { ValueType } from '../../../system/ValueType'

const GoMandatoryTypes: Map<ValueType, string> = new Map<ValueType, string>([
	[ValueType.object, 'Object'],
	[ValueType.string, 'string'],
	[ValueType.int, 'long'],
	[ValueType.float, 'double'],
	[ValueType.boolean, 'boolean'],
	[ValueType.dateTime, 'Date'],
	[ValueType.date, 'Date'],
	[ValueType.time, 'Date'],
	[ValueType.interval, 'string'],
	[ValueType.decimal, 'double'],
	[ValueType.void, 'void'],
	[ValueType.object.asOptional, 'Object'],
	[ValueType.string.asOptional, 'string'],
	[ValueType.int.asOptional, 'long'],
	[ValueType.float.asOptional, 'double'],
	[ValueType.boolean.asOptional, 'boolean'],
	[ValueType.dateTime.asOptional, 'Date'],
	[ValueType.date.asOptional, 'Date'],
	[ValueType.time.asOptional, 'Date'],
	[ValueType.interval.asOptional, 'string'],
	[ValueType.decimal.asOptional, 'double'],
	[ValueType.void.asOptional, 'void'],
])

export const GoValueTypeResolver = new SimpleMappedValueTypeResolver(ProgrammingLanguage.go, GoMandatoryTypes)

export const templates = { Poco: { type: 'handlebars', contents: (): string => fs.readFileSync(`${__dirname}/Poco.handlebars`).toString() } }
