import { Builder } from '../../runtime/Builder'
import { ClassValidatorRulesHarvester } from './builders/ClassValidatorRulesHarvester'
import { RulesPropertyTypeHarvester } from './builders/RulesPropertyTypeHarvester'

export const BUILDERS = {
	classValidatorRulesHarvester: (settings: any): Builder => new ClassValidatorRulesHarvester(settings),
	rulesPropertyTypeHarvester: (settings: any): Builder => new RulesPropertyTypeHarvester(settings),
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
export * from './builders/ClassValidatorRulesHarvester'
export * from './builders/RulesPropertyTypeHarvester'
