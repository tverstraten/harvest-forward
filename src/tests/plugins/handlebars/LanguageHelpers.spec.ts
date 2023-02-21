/* eslint-disable max-lines-per-function */
import { ok } from 'assert'
import { LanguageHelpers } from '../../../plugins/handlebars/LanguageHelpers'
import { ProgrammingLanguage } from '../../../system/ProgrammingLanguage'
import { ValueType } from '../../../system/ValueType'
import { ValueTypeResolver } from '../../../system/ValueTypeResolver'

class TempTypeResolver implements ValueTypeResolver {
	resolvedLanguage: ProgrammingLanguage

	constructor(language: ProgrammingLanguage) {
		this.resolvedLanguage = language
	}

	doesSupport(__language: ProgrammingLanguage): boolean {
		return true
	}

	doesMap(__type: any): boolean {
		return true
	}

	fromType(__originalType: any): string {
		return `bogus1-${this.resolvedLanguage.name}`
	}

	hasName(__name: string): boolean {
		return true
	}

	toTypeName(name: string): string | undefined {
		return `bogus2-${name}`
	}

	toType(__name: string): ValueType | undefined {
		return ValueType.string
	}
}

describe('all', () => {
	it('register', async () => {
		LanguageHelpers.registerAll()
		LanguageHelpers.registerAll()
		ok(true)
	})

	it('cSharp', async () => {
		const resolver = new TempTypeResolver(ProgrammingLanguage.cSharp)
		ValueType.install(ProgrammingLanguage.cSharp, resolver)
		const helpers = new LanguageHelpers()
		expect(helpers.cSharp(ValueType.string)).toBe(`bogus1-CSharp`)
		expect(helpers.cSharp(null)).toBeUndefined()
		ValueType.uninstall(ProgrammingLanguage.cSharp)
		expect(helpers.cSharp(ValueType.string)).toBeUndefined()
	})

	it('go', async () => {
		const resolver = new TempTypeResolver(ProgrammingLanguage.go)
		ValueType.install(ProgrammingLanguage.go, resolver)
		const helpers = new LanguageHelpers()
		expect(helpers.go(ValueType.string)).toBe(`bogus1-Go`)
		expect(helpers.go(null)).toBeUndefined()
		ValueType.uninstall(ProgrammingLanguage.go)
		expect(helpers.go(ValueType.string)).toBeUndefined()
	})

	it('javaScript', async () => {
		const resolver = new TempTypeResolver(ProgrammingLanguage.javaScript)
		ValueType.install(ProgrammingLanguage.javaScript, resolver)
		const helpers = new LanguageHelpers()
		expect(helpers.javaScript(ValueType.string)).toBe(`bogus1-JavaScript`)
		expect(helpers.javaScript(null)).toBeUndefined()
		ValueType.uninstall(ProgrammingLanguage.javaScript)
		expect(helpers.javaScript(ValueType.string)).toBeUndefined()
	})

	it('java', async () => {
		const resolver = new TempTypeResolver(ProgrammingLanguage.java)
		ValueType.install(ProgrammingLanguage.java, resolver)
		const helpers = new LanguageHelpers()
		expect(helpers.java(ValueType.string)).toBe(`bogus1-Java`)
		expect(helpers.java(null)).toBeUndefined()
		ValueType.uninstall(ProgrammingLanguage.java)
		expect(helpers.java(ValueType.string)).toBeUndefined()
	})

	// eslint-disable-next-line spellcheck/spell-checker
	it('php', async () => {
		const resolver = new TempTypeResolver(ProgrammingLanguage.php)
		ValueType.install(ProgrammingLanguage.php, resolver)
		const helpers = new LanguageHelpers()
		// eslint-disable-next-line spellcheck/spell-checker
		expect(helpers.php(ValueType.string)).toBe(`bogus1-PHP`)
		expect(helpers.php(null)).toBeUndefined()
		ValueType.uninstall(ProgrammingLanguage.php)
		expect(helpers.php(ValueType.string)).toBeUndefined()
	})

	it('python', async () => {
		const resolver = new TempTypeResolver(ProgrammingLanguage.python)
		ValueType.install(ProgrammingLanguage.python, resolver)
		const helpers = new LanguageHelpers()
		expect(helpers.python(ValueType.string)).toBe(`bogus1-Python`)
		expect(helpers.python(null)).toBeUndefined()
		ValueType.uninstall(ProgrammingLanguage.python)
		expect(helpers.python(ValueType.string)).toBeUndefined()
	})

	it('sql', async () => {
		const resolver = new TempTypeResolver(ProgrammingLanguage.sql)
		ValueType.install(ProgrammingLanguage.sql, resolver)
		const helpers = new LanguageHelpers()
		expect(helpers.sql(ValueType.string)).toBe(`bogus1-Sql`)
		expect(helpers.sql(null)).toBeUndefined()
		ValueType.uninstall(ProgrammingLanguage.sql)
		expect(helpers.sql(ValueType.string)).toBeUndefined()
	})

	it('tSql', async () => {
		const resolver = new TempTypeResolver(ProgrammingLanguage.tSql)
		ValueType.install(ProgrammingLanguage.tSql, resolver)
		const helpers = new LanguageHelpers()
		expect(helpers.tSql(ValueType.string)?.toString()).toBe(`bogus1-TSql`)
		expect(helpers.tSql(null)).toBeUndefined()
		ValueType.uninstall(ProgrammingLanguage.tSql)
		expect(helpers.tSql(ValueType.string)).toBeUndefined()
	})

	it('typeScript', async () => {
		const resolver = new TempTypeResolver(ProgrammingLanguage.typeScript)
		ValueType.install(ProgrammingLanguage.typeScript, resolver)
		const helpers = new LanguageHelpers()
		expect(helpers.typeScript(ValueType.string)).toBe(`bogus1-TypeScript`)
		expect(helpers.typeScript(null)).toBeUndefined()
		ValueType.uninstall(ProgrammingLanguage.typeScript)
		expect(helpers.typeScript(ValueType.string)).toBeUndefined()
	})
})
