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

	fromType(__originalType: any, __optional: boolean): string {
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
		expect(helpers.cSharp(ValueType.string.name)).toBe(`string`)
		expect(helpers.cSharp(null)).toBe(`undefined`)
		ValueType.uninstall(ProgrammingLanguage.cSharp)
		try {
			expect(helpers.cSharp(ValueType.string)).toBe(`bogus1-Kotlin`)
			fail('this is supposed to fail')
		} catch (problem) {
			ok(true)
		}
	})

	it('go', async () => {
		const resolver = new TempTypeResolver(ProgrammingLanguage.go)
		ValueType.install(ProgrammingLanguage.go, resolver)
		const helpers = new LanguageHelpers()
		expect(helpers.go(ValueType.string)).toBe(`bogus1-Go`)
		expect(helpers.go(ValueType.string.name)).toBe(`string`)
		expect(helpers.go(null)).toBe(`undefined`)
		ValueType.uninstall(ProgrammingLanguage.go)
		try {
			expect(helpers.go(ValueType.string)).toBe(`bogus1-Kotlin`)
			fail('this is supposed to fail')
		} catch (problem) {
			ok(true)
		}
	})

	it('javaScript', async () => {
		const resolver = new TempTypeResolver(ProgrammingLanguage.javaScript)
		ValueType.install(ProgrammingLanguage.javaScript, resolver)
		const helpers = new LanguageHelpers()
		expect(helpers.javaScript(ValueType.string)).toBe(`bogus1-JavaScript`)
		expect(helpers.javaScript(ValueType.string.name)).toBe(`string`)
		expect(helpers.javaScript(null)).toBe(`undefined`)
		ValueType.uninstall(ProgrammingLanguage.javaScript)
		try {
			expect(helpers.javaScript(ValueType.string)).toBe(`bogus1-Kotlin`)
			fail('this is supposed to fail')
		} catch (problem) {
			ok(true)
		}
	})

	it('java', async () => {
		const resolver = new TempTypeResolver(ProgrammingLanguage.java)
		ValueType.install(ProgrammingLanguage.java, resolver)
		const helpers = new LanguageHelpers()
		expect(helpers.java(ValueType.string)).toBe(`bogus1-Java`)
		expect(helpers.java(ValueType.string.name)).toBe(`string`)
		expect(helpers.java(null)).toBe(`undefined`)
		ValueType.uninstall(ProgrammingLanguage.java)
		try {
			expect(helpers.java(ValueType.string)).toBe(`bogus1-Kotlin`)
			fail('this is supposed to fail')
		} catch (problem) {
			ok(true)
		}
	})

	// eslint-disable-next-line spellcheck/spell-checker
	it('php', async () => {
		const resolver = new TempTypeResolver(ProgrammingLanguage.php)
		ValueType.install(ProgrammingLanguage.php, resolver)
		const helpers = new LanguageHelpers()
		// eslint-disable-next-line spellcheck/spell-checker
		expect(helpers.php(ValueType.string)).toBe(`bogus1-PHP`)
		expect(helpers.php(ValueType.string.name)).toBe(`string`)
		expect(helpers.php(null)).toBe(`undefined`)
		ValueType.uninstall(ProgrammingLanguage.php)
		try {
			expect(helpers.php(ValueType.string)).toBe(`bogus1-Kotlin`)
			fail('this is supposed to fail')
		} catch (problem) {
			ok(true)
		}
	})

	it('python', async () => {
		const resolver = new TempTypeResolver(ProgrammingLanguage.python)
		ValueType.install(ProgrammingLanguage.python, resolver)
		const helpers = new LanguageHelpers()
		expect(helpers.python(ValueType.string)).toBe(`bogus1-Python`)
		expect(helpers.python(ValueType.string.name)).toBe(`string`)
		expect(helpers.python(null)).toBe(`undefined`)
		ValueType.uninstall(ProgrammingLanguage.python)
		try {
			expect(helpers.python(ValueType.string)).toBe(`bogus1-Kotlin`)
			fail('this is supposed to fail')
		} catch (problem) {
			ok(true)
		}
	})

	it('sql', async () => {
		const resolver = new TempTypeResolver(ProgrammingLanguage.sql)
		ValueType.install(ProgrammingLanguage.sql, resolver)
		const helpers = new LanguageHelpers()
		expect(helpers.sql(ValueType.string)).toBe(`bogus1-Sql`)
		expect(helpers.sql(ValueType.string.name)).toBe(`string`)
		expect(helpers.sql(null)).toBe(`undefined`)
		ValueType.uninstall(ProgrammingLanguage.sql)
		try {
			expect(helpers.sql(ValueType.string)).toBe(`bogus1-Kotlin`)
			fail('this is supposed to fail')
		} catch (problem) {
			ok(true)
		}
	})

	it('tSql', async () => {
		const resolver = new TempTypeResolver(ProgrammingLanguage.tSql)
		ValueType.install(ProgrammingLanguage.tSql, resolver)
		const helpers = new LanguageHelpers()
		expect(helpers.tSql(ValueType.string)?.toString()).toBe(`bogus1-TSql`)
		expect(helpers.tSql(ValueType.string.name)).toBe(`string`)
		expect(helpers.tSql(null)).toBe(`undefined`)
		ValueType.uninstall(ProgrammingLanguage.tSql)
		try {
			expect(helpers.tSql(ValueType.string)).toBe(`bogus1-Kotlin`)
			fail('this is supposed to fail')
		} catch (problem) {
			ok(true)
		}
	})

	it('typeScript', async () => {
		const resolver = new TempTypeResolver(ProgrammingLanguage.typeScript)
		ValueType.install(ProgrammingLanguage.typeScript, resolver)
		const helpers = new LanguageHelpers()
		expect(helpers.typeScript(ValueType.string)).toBe(`bogus1-TypeScript`)
		expect(helpers.typeScript(ValueType.string.name)).toBe(`string`)
		expect(helpers.typeScript(null)).toBe(`undefined`)
		ValueType.uninstall(ProgrammingLanguage.typeScript)
		try {
			expect(helpers.typeScript(ValueType.string)).toBe(`bogus1-Kotlin`)
			fail('this is supposed to fail')
		} catch (problem) {
			ok(true)
		}
	})
})
