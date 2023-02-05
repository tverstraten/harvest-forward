import * as ChangeCase from 'change-case'
import Handlebars from 'handlebars'
import Pluralize from 'pluralize'
import { Logging } from '@tverstraten/log-annotations'

export class WordHelpers {
	private static helpersRegistered = false

	private logger = Logging.newLogger(this.constructor.name)

	static registerAll(): any {
		if (this.helpersRegistered) return
		this.helpersRegistered = true
		Handlebars.registerHelper('SentenceCase', WordHelpers.prototype.sentenceCase)
		Handlebars.registerHelper('CapitalCase', WordHelpers.prototype.capitalCase)
		Handlebars.registerHelper('ConstantCase', WordHelpers.prototype.constantCase)
		Handlebars.registerHelper('PascalCase', WordHelpers.prototype.pascalCase)
		Handlebars.registerHelper('CamelCase', WordHelpers.prototype.camelCase)
		Handlebars.registerHelper('SnakeCase', WordHelpers.prototype.snakeCase)
		Handlebars.registerHelper('Singular', WordHelpers.prototype.singular)
		Handlebars.registerHelper('Plural', WordHelpers.prototype.plural)
	}

	sentenceCase(aString: any): string | null {
		return aString ? ChangeCase.sentenceCase(aString) : null
	}

	capitalCase(aString: any): string | null {
		return aString ? ChangeCase.capitalCase(aString) : null
	}

	constantCase(aString: any): string | null {
		return aString ? ChangeCase.constantCase(aString) : null
	}

	pascalCase(aString: any): string | null {
		return aString ? ChangeCase.pascalCase(aString) : null
	}

	camelCase(aString: any): string | null {
		return aString ? ChangeCase.camelCase(aString) : null
	}

	snakeCase(aString: any): string | null {
		return aString ? ChangeCase.snakeCase(aString) : null
	}

	singular(aString: any): string | null {
		return aString ? Pluralize.singular(aString) : null
	}

	plural(aString: any): string | null {
		return aString ? Pluralize.plural(aString) : null
	}
}
