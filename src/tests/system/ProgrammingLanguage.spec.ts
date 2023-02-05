import { ProgrammingLanguage } from '../../system/ProgrammingLanguage'

describe('hasName', () => {
	it('exists', async () => {
		const result = ProgrammingLanguage.hasName(ProgrammingLanguage.javaScript.name)
		expect(result).toBe(true)
	})

	it('does not exist', async () => {
		const badName = `${ProgrammingLanguage.javaScript}-PlusJunk`
		const result = ProgrammingLanguage.hasName(badName)
		expect(result).toBeFalsy
	})

	it('exists but different case', async () => {
		const badName = ProgrammingLanguage.javaScript.name.toUpperCase()
		const result = ProgrammingLanguage.hasName(badName)
		expect(result).toBeFalsy
	})

	it('undefined', async () => {
		const testFunction = (): void => {
			const aValue = undefined as unknown as string
			ProgrammingLanguage.fromName(aValue)
		}
		expect(testFunction).toThrow()
	})
})

describe('fromName', () => {
	it('exists', async () => {
		const result = ProgrammingLanguage.fromName(ProgrammingLanguage.javaScript.name)
		expect(result).toBe(ProgrammingLanguage.javaScript)
	})

	it('does not exist', async () => {
		const testFunction = (): void => {
			const badName = `${ProgrammingLanguage.javaScript}-PlusJunk`
			ProgrammingLanguage.fromName(badName)
		}
		expect(testFunction).toThrow()
	})

	it('undefined', async () => {
		const testFunction = (): void => {
			const aValue = undefined as unknown as string
			ProgrammingLanguage.fromName(aValue)
		}
		expect(testFunction).toThrow()
	})
})
