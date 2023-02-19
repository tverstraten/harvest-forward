import { Logging } from '@tverstraten/log-annotations'
import Handlebars from 'handlebars'
import { ProgrammingLanguage } from '../../system/ProgrammingLanguage'

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

	cSharp(type: any): string {
		return type.toNameInLanguage(ProgrammingLanguage.cSharp)
	}

	go(type: any): string {
		return type.toNameInLanguage(ProgrammingLanguage.go)
	}

	javaScript(type: any): string {
		return type.toNameInLanguage(ProgrammingLanguage.javaScript)
	}

	java(type: any): string {
		return type.toNameInLanguage(ProgrammingLanguage.java)
	}

	php(type: any): string {
		return type.toNameInLanguage(ProgrammingLanguage.php)
	}

	python(type: any): string {
		return type.toNameInLanguage(ProgrammingLanguage.python)
	}

	sql(type: any): string {
		return type.toNameInLanguage(ProgrammingLanguage.sql)
	}

	tSql(type: any): string {
		return type.toNameInLanguage(ProgrammingLanguage.tSql)
	}

	typeScript(type: any): string {
		return type.toNameInLanguage(ProgrammingLanguage.typeScript)
	}

	visualBasic(type: any): string {
		return type.toNameInLanguage(ProgrammingLanguage.visualBasic)
	}

	visualBasicNet(type: any): string {
		return type.toNameInLanguage(ProgrammingLanguage.visualBasicNet)
	}
}
