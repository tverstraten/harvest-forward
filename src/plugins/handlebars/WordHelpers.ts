import Handlebars from 'handlebars'
import Pluralize from 'pluralize'
import { Logging } from '@tverstraten/log-annotations'

export class WordHelpers {
	private static helpersRegistered = false

	private logger = Logging.newLogger(this.constructor.name)

	static registerAll(): any {
		if (this.helpersRegistered) return
		this.helpersRegistered = true
		Handlebars.registerHelper('Singular', WordHelpers.prototype.singular)
		Handlebars.registerHelper('Plural', WordHelpers.prototype.plural)
	}

	singular(aString: any): string | null {
		return aString ? Pluralize.singular(aString) : null
	}

	plural(aString: any): string | null {
		return aString ? Pluralize.plural(aString) : null
	}
}
