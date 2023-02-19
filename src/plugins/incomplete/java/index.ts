import fs from 'fs'
import { ProgrammingLanguage } from '../../../system/ProgrammingLanguage'
import { SimpleMappedValueTypeResolver } from '../../../system/SimpleMappedValueTypeResolver'
import { ValueType } from '../../../system/ValueType'

const JavaMandatoryValueTypes = {} as { [key: string]: string }
JavaMandatoryValueTypes[ValueType.object.name] = 'Object'
JavaMandatoryValueTypes[ValueType.string.name] = 'string'
JavaMandatoryValueTypes[ValueType.int.name] = 'long'
JavaMandatoryValueTypes[ValueType.float.name] = 'double'
JavaMandatoryValueTypes[ValueType.boolean.name] = 'boolean'
JavaMandatoryValueTypes[ValueType.dateTime.name] = 'java.util.Date'
JavaMandatoryValueTypes[ValueType.date.name] = 'java.util.Date'
JavaMandatoryValueTypes[ValueType.time.name] = 'java.util.Date'
JavaMandatoryValueTypes[ValueType.interval.name] = 'string'
JavaMandatoryValueTypes[ValueType.decimal.name] = 'BigDecimal'
JavaMandatoryValueTypes[ValueType.void.name] = 'void'

const JavaOptionalValueTypes = {} as { [key: string]: string }
JavaOptionalValueTypes[ValueType.object.name] = 'Object'
JavaOptionalValueTypes[ValueType.string.name] = 'string'
JavaOptionalValueTypes[ValueType.int.name] = 'long'
JavaOptionalValueTypes[ValueType.float.name] = 'double'
JavaOptionalValueTypes[ValueType.boolean.name] = 'bool'
JavaOptionalValueTypes[ValueType.dateTime.name] = 'java.util.Date'
JavaOptionalValueTypes[ValueType.date.name] = 'java.util.Date'
JavaOptionalValueTypes[ValueType.time.name] = 'java.util.Date'
JavaOptionalValueTypes[ValueType.interval.name] = 'string'
JavaOptionalValueTypes[ValueType.decimal.name] = 'BigDecimal'
JavaOptionalValueTypes[ValueType.void.name] = 'void'

export const typeResolvers = {
	Java: new SimpleMappedValueTypeResolver(ProgrammingLanguage.java, JavaMandatoryValueTypes, JavaOptionalValueTypes),
}

export const templates = { Poco: { type: 'handlebars', contents: (): string => fs.readFileSync(`${__dirname}/Poco.handlebars`).toString() } }
