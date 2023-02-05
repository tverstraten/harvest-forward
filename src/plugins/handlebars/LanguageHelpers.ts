import Handlebars from 'handlebars'
import { Logging } from '@tverstraten/log-annotations'
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
		return type ? (typeof type == 'string' ? type : type.inLanguage(language)) : 'undefined'
	}

	cSharp(type: any): string {
		return this.toTypeInLanguage(ProgrammingLanguage.cSharp, type)
	}

	go(type: any): string {
		return this.toTypeInLanguage(ProgrammingLanguage.go, type)
	}

	javaScript(type: any): string {
		return this.toTypeInLanguage(ProgrammingLanguage.javaScript, type)
	}

	java(type: any): string {
		return this.toTypeInLanguage(ProgrammingLanguage.java, type)
	}

	php(type: any): string {
		return this.toTypeInLanguage(ProgrammingLanguage.php, type)
	}

	python(type: any): string {
		return this.toTypeInLanguage(ProgrammingLanguage.python, type)
	}

	sql(type: any): string {
		return this.toTypeInLanguage(ProgrammingLanguage.sql, type)
	}

	tSql(type: any): string {
		return this.toTypeInLanguage(ProgrammingLanguage.tSql, type)
	}

	typeScript(type: any): string {
		return this.toTypeInLanguage(ProgrammingLanguage.typeScript, type)
	}

	visualBasic(type: any): string {
		return this.toTypeInLanguage(ProgrammingLanguage.visualBasic, type)
	}

	visualBasicNet(type: any): string {
		return this.toTypeInLanguage(ProgrammingLanguage.visualBasicNet, type)
	}
}
