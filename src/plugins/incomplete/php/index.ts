/* eslint-disable @typescript-eslint/naming-convention */
import fs from 'fs'
import { ProgrammingLanguage } from '../../../system/ProgrammingLanguage'
import { SimpleMappedValueTypeResolver } from '../../../system/SimpleMappedValueTypeResolver'
import { ValueType } from '../../../system/ValueType'

const PHPValueTypes: Map<ValueType, string> = new Map<ValueType, string>([
	[ValueType.object, 'Object'],
	[ValueType.string, 'string'],
	[ValueType.int, 'int'],
	[ValueType.float, 'float'],
	[ValueType.boolean, 'bool'],
	[ValueType.dateTime, '\\DateTime'],
	[ValueType.date, '\\DateTime'],
	[ValueType.time, '\\DateTime'],
	[ValueType.interval, 'string'],
	[ValueType.decimal, 'float'],
	[ValueType.void, 'undefined'],
	[ValueType.object.asOptional, '?Object'],
	[ValueType.string.asOptional, '?string'],
	[ValueType.int.asOptional, '?int'],
	[ValueType.float.asOptional, '?float'],
	[ValueType.boolean.asOptional, '?bool'],
	[ValueType.dateTime.asOptional, '?\\DateTime'],
	[ValueType.date.asOptional, '?\\DateTime'],
	[ValueType.time.asOptional, '?\\DateTime'],
	[ValueType.interval.asOptional, '?string'],
	[ValueType.decimal.asOptional, '?float'],
	[ValueType.void.asOptional, 'undefined'],
])

export const typeResolvers = {
	PHP: new SimpleMappedValueTypeResolver(ProgrammingLanguage.php, PHPValueTypes),
}

export const templates = {
	Poco: { type: 'handlebars', contents: (): string => fs.readFileSync(`${__dirname}/Poco.handlebars`).toString() },
}
