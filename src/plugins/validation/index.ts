import { Builder } from '../../runtime/Builder'
import { ClassValidatorRulesExtractor } from './builders/ClassValidatorRulesExtractor'
import { RulesPropertyTypeExtractor } from './builders/RulesPropertyTypeExtractor'

export const BUILDERS = {
	classValidatorRulesExtractor: (settings: any): Builder => new ClassValidatorRulesExtractor(settings),
	rulesPropertyTypeExtractor: (settings: any): Builder => new RulesPropertyTypeExtractor(settings),
}

export * from './Rule'
export * from './CardinalityRule'
export * from './ContainsRule'
export * from './DateRangeRule'
export * from './EqualsRule'
export * from './InRule'
export * from './IsNumberRule'
export * from './IsDecimalRule'
export * from './LengthRule'
export * from './NotContainsRule'
export * from './NotEqualRule'
export * from './NumericRangeRule'
export * from './RegexRule'
export * from './Rule'
export * from './ValueTypeRule'
export * from './builders/ClassValidatorRulesExtractor'
export * from './builders/RulesPropertyTypeExtractor'
