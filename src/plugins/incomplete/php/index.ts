import fs from 'fs'
import { ProgrammingLanguage } from '../../../system/ProgrammingLanguage'
import { SimpleMappedValueTypeResolver } from '../../../system/SimpleMappedValueTypeResolver'
import { ValueType } from '../../../system/ValueType'

const PHPMandatoryValueTypes = {} as { [key: string]: string }
PHPMandatoryValueTypes[ValueType.object.name] = 'Object'
PHPMandatoryValueTypes[ValueType.string.name] = 'string'
PHPMandatoryValueTypes[ValueType.int.name] = 'int'
PHPMandatoryValueTypes[ValueType.float.name] = 'float'
PHPMandatoryValueTypes[ValueType.boolean.name] = 'bool'
PHPMandatoryValueTypes[ValueType.dateTime.name] = '\\DateTime'
PHPMandatoryValueTypes[ValueType.date.name] = '\\DateTime'
PHPMandatoryValueTypes[ValueType.time.name] = '\\DateTime'
PHPMandatoryValueTypes[ValueType.interval.name] = 'string'
PHPMandatoryValueTypes[ValueType.decimal.name] = 'float'
PHPMandatoryValueTypes[ValueType.void.name] = 'undefined'

const PHPOptionalValueTypes = {} as { [key: string]: string }
PHPOptionalValueTypes[ValueType.object.name] = '?Object'
PHPOptionalValueTypes[ValueType.string.name] = '?string'
PHPOptionalValueTypes[ValueType.int.name] = '?int'
PHPOptionalValueTypes[ValueType.float.name] = '?float'
PHPOptionalValueTypes[ValueType.boolean.name] = '?bool'
PHPOptionalValueTypes[ValueType.dateTime.name] = '?\\DateTime'
PHPOptionalValueTypes[ValueType.date.name] = '?\\DateTime'
PHPOptionalValueTypes[ValueType.time.name] = '?\\DateTime'
PHPOptionalValueTypes[ValueType.interval.name] = '?string'
PHPOptionalValueTypes[ValueType.decimal.name] = '?float'
PHPOptionalValueTypes[ValueType.void.name] = 'undefined'

export const typeResolvers = {
	PHP: new SimpleMappedValueTypeResolver(ProgrammingLanguage.php, PHPMandatoryValueTypes, PHPOptionalValueTypes),
}

export const templates = {
	Poco: { type: 'handlebars', contents: (): string => fs.readFileSync(`${__dirname}/Poco.handlebars`).toString() },
}
