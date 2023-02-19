import { Nameable } from './Nameable'

export class ProgrammingLanguage implements Nameable {
	readonly name: string

	constructor(name: string) {
		this.name = name
	}

	static generic = new ProgrammingLanguage('Generic')

	static cSharp = new ProgrammingLanguage('CSharp')

	static go = new ProgrammingLanguage('Go')

	static java = new ProgrammingLanguage('Java')

	static javaScript = new ProgrammingLanguage('JavaScript')

	static mySql = new ProgrammingLanguage('MySql')

	static php = new ProgrammingLanguage('PHP')

	static postgres = new ProgrammingLanguage('Postgres')

	static python = new ProgrammingLanguage('Python')

	static sql = new ProgrammingLanguage('Sql')

	static tSql = new ProgrammingLanguage('TSql')

	static typeScript = new ProgrammingLanguage('TypeScript')

	static visualBasicNet = new ProgrammingLanguage('VisualBasicNet')

	static visualBasic = new ProgrammingLanguage('VisualBasic')

	static recognizedLanguages = [
		ProgrammingLanguage.generic,
		ProgrammingLanguage.cSharp,
		ProgrammingLanguage.go,
		ProgrammingLanguage.java,
		ProgrammingLanguage.javaScript,
		ProgrammingLanguage.mySql,
		// eslint-disable-next-line spellcheck/spell-checker
		ProgrammingLanguage.php,
		ProgrammingLanguage.postgres,
		ProgrammingLanguage.python,
		ProgrammingLanguage.sql,
		ProgrammingLanguage.tSql,
		ProgrammingLanguage.typeScript,
		ProgrammingLanguage.visualBasicNet,
		ProgrammingLanguage.visualBasic,
	]

	static hasName(name: string): boolean {
		for (const key in ProgrammingLanguage.recognizedLanguages) {
			const language = ProgrammingLanguage.recognizedLanguages[key]
			if (language.name === name) return true
		}

		return false
	}

	static fromName(name: string): ProgrammingLanguage {
		for (const key in ProgrammingLanguage.recognizedLanguages) {
			const language = ProgrammingLanguage.recognizedLanguages[key]
			if (language.name.toLowerCase() === name.toLowerCase()) return language
		}

		throw RangeError(`ProgrammingLanguage does not have a value of ${name}`)
	}
}
