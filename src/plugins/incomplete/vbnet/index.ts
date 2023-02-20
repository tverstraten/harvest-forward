/* eslint-disable @typescript-eslint/naming-convention */
import fs from 'fs'
import { ProgrammingLanguage } from '../../../system/ProgrammingLanguage'
import { SimpleMappedValueTypeResolver } from '../../../system/SimpleMappedValueTypeResolver'
import { ValueType } from '../../../system/ValueType'

const VisualBasicNetValueTypes: Map<ValueType, string> = new Map<ValueType, string>([
	[ValueType.object, 'Object'],
	[ValueType.string, 'String'],
	[ValueType.int, 'Integer'],
	[ValueType.float, 'double'],
	[ValueType.boolean, 'bool'],
	[ValueType.dateTime, 'DateTime'],
	[ValueType.date, 'DateTime'],
	[ValueType.time, 'DateTime'],
	[ValueType.interval, 'string'],
	[ValueType.decimal, 'decimal'],
	[ValueType.void, 'void'],
	[ValueType.object, 'Object?'],
	[ValueType.string, 'String?'],
	[ValueType.int, 'Integer?'],
	[ValueType.float, 'double?'],
	[ValueType.boolean, 'bool?'],
	[ValueType.dateTime, 'DateTime?'],
	[ValueType.date, 'DateTime?'],
	[ValueType.time, 'DateTime?'],
	[ValueType.interval, 'string?'],
	[ValueType.decimal, 'decimal?'],
	[ValueType.void, 'void']
])

export const typeResolvers = {
	VisualBasicNet: new SimpleMappedValueTypeResolver(ProgrammingLanguage.visualBasicNet, VisualBasicNetValueTypes),
}

export const templates = { Poco: { type: 'handlebars', contents: (): string => fs.readFileSync(`${__dirname}/Poco.handlebars`).toString() } }
