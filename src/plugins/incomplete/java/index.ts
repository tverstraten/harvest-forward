/* eslint-disable @typescript-eslint/naming-convention */
import fs from 'fs'
import { ProgrammingLanguage } from '../../../system/ProgrammingLanguage'
import { SimpleMappedValueTypeResolver } from '../../../system/SimpleMappedValueTypeResolver'
import { ValueType } from '../../../system/ValueType'

const JavaValueTypes: Map<ValueType, string> = new Map<ValueType, string>([
	[ValueType.object, 'Object'],
	[ValueType.string, 'string'],
	[ValueType.int, 'long'],
	[ValueType.float, 'double'],
	[ValueType.boolean, 'boolean'],
	[ValueType.dateTime, 'java.util.Date'],
	[ValueType.date, 'java.util.Date'],
	[ValueType.time, 'java.util.Date'],
	[ValueType.interval, 'string'],
	[ValueType.decimal, 'BigDecimal'],
	[ValueType.void, 'void'],
	[ValueType.object.asOptional, 'Object'],
	[ValueType.string.asOptional, 'string'],
	[ValueType.int.asOptional, 'long'],
	[ValueType.float.asOptional, 'double'],
	[ValueType.boolean.asOptional, 'bool'],
	[ValueType.dateTime.asOptional, 'java.util.Date'],
	[ValueType.date.asOptional, 'java.util.Date'],
	[ValueType.time.asOptional, 'java.util.Date'],
	[ValueType.interval.asOptional, 'string'],
	[ValueType.decimal.asOptional, 'BigDecimal'],
	[ValueType.void.asOptional, 'void'],
])

export const typeResolvers = {
	Java: new SimpleMappedValueTypeResolver(ProgrammingLanguage.java, JavaValueTypes),
}

export const templates = { Poco: { type: 'handlebars', contents: (): string => fs.readFileSync(`${__dirname}/Poco.handlebars`).toString() } }
