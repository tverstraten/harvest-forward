/* eslint-disable @typescript-eslint/naming-convention */
import fs from 'fs'
import { ProgrammingLanguage } from '../../../system/ProgrammingLanguage'
import { SimpleMappedValueTypeResolver } from '../../../system/SimpleMappedValueTypeResolver'
import { ValueType } from '../../../system/ValueType'

const JavaScriptValueTypes: Map<ValueType, string> = new Map<ValueType, string>([
	[ValueType.object, 'any'],
	[ValueType.string, 'string'],
	[ValueType.int, 'number'],
	[ValueType.float, 'number'],
	[ValueType.boolean, 'boolean'],
	[ValueType.dateTime, 'Date'],
	[ValueType.date, 'Date'],
	[ValueType.time, 'Date'],
	[ValueType.interval, 'string'],
	[ValueType.decimal, 'number'],
	[ValueType.void, 'undefined'],
	[ValueType.object.asOptional, 'any | null'],
	[ValueType.string.asOptional, 'string | null'],
	[ValueType.int.asOptional, 'number | null'],
	[ValueType.float.asOptional, 'number | null'],
	[ValueType.boolean.asOptional, 'boolean | null'],
	[ValueType.dateTime.asOptional, 'Date | null'],
	[ValueType.date.asOptional, 'Date | null'],
	[ValueType.time.asOptional, 'Date | null'],
	[ValueType.interval.asOptional, 'string | null'],
	[ValueType.decimal.asOptional, 'number | null'],
	[ValueType.void.asOptional, 'undefined'],
])

export const typeResolvers = {
	JavaScript: new SimpleMappedValueTypeResolver(ProgrammingLanguage.javaScript, JavaScriptValueTypes),
}

export const templates = { Poco: { type: 'handlebars', contents: (): string => fs.readFileSync(`${__dirname}/Poco.handlebars`).toString() } }
