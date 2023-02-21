import { Logging } from '@tverstraten/log-annotations'
import Handlebars from 'handlebars'
import { ProgrammingLanguage } from '../../system/ProgrammingLanguage'
import { ValueType } from '../../system/ValueType'

export class LanguageHelpers {
	private static helpersRegistered = false

	private logger = Logging.newLogger(this.constructor.name)

	static registerAll(): void {
		if (this.helpersRegistered) return
		this.helpersRegistered = true
		// TODO: these all need to be externalized into language plugins
		Handlebars.registerHelper('CSharp', LanguageHelpers.prototype.cSharp)
		Handlebars.registerHelper('Go', LanguageHelpers.prototype.go)
		Handlebars.registerHelper('JavaScript', LanguageHelpers.prototype.javaScript)
		Handlebars.registerHelper('Java', LanguageHelpers.prototype.java)
		// eslint-disable-next-line spellcheck/spell-checker
		Handlebars.registerHelper('PHP', LanguageHelpers.prototype.php)
		Handlebars.registerHelper('Python', LanguageHelpers.prototype.python)
		Handlebars.registerHelper('Sql', LanguageHelpers.prototype.sql)
		Handlebars.registerHelper('TSql', LanguageHelpers.prototype.tSql)
		Handlebars.registerHelper('TypeScript', LanguageHelpers.prototype.typeScript)
		Handlebars.registerHelper('VisualBasic', LanguageHelpers.prototype.visualBasic)
		Handlebars.registerHelper('VisualBasicNet', LanguageHelpers.prototype.visualBasicNet)
	}

	private toTypeInLanguage(language: ProgrammingLanguage, type: any): string {
		return type ? (typeof type == 'string' ? type : type.toNameInLanguage(language)) : 'undefined'
	}

	toAny(type: ValueType | string, language: ProgrammingLanguage): string | undefined {
		if (typeof type == 'string') {
			const genericType = ValueType.fromName(type)
			return genericType ? genericType.toNameInLanguage(language) : undefined
		}
		return type ? type.toNameInLanguage(language) : undefined
	}

	cSharp(type: any): string | undefined {
		return this.toAny(type, ProgrammingLanguage.cSharp)
	}

	go(type: any): string | undefined {
		return this.toAny(type, ProgrammingLanguage.go)
	}

	javaScript(type: any): string | undefined {
		return this.toAny(type, ProgrammingLanguage.javaScript)
	}

	java(type: any): string | undefined {
		return this.toAny(type, ProgrammingLanguage.java)
	}

	php(type: any): string | undefined {
		return this.toAny(type, ProgrammingLanguage.php)
	}

	python(type: any): string | undefined {
		return this.toAny(type, ProgrammingLanguage.python)
	}

	sql(type: any): string | undefined {
		return this.toAny(type, ProgrammingLanguage.sql)
	}

	tSql(type: any): string | undefined {
		return this.toAny(type, ProgrammingLanguage.tSql)
	}

	typeScript(type: any): string | undefined {
		return this.toAny(type, ProgrammingLanguage.typeScript)
	}

	visualBasic(type: any): string | undefined {
		return this.toAny(type, ProgrammingLanguage.visualBasic)
	}

	visualBasicNet(type: any): string | undefined {
		return this.toAny(type, ProgrammingLanguage.visualBasicNet)
	}
}
