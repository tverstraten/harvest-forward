import Handlebars from 'handlebars'
import { SystemComponent } from '../../system/SystemComponent'
import { SystemDescendantComponent } from '../../system/SystemDescendantComponent'
import { SystemComponentReplacer } from '../../util/SystemComponentReplacer'
// eslint-disable-next-line @typescript-eslint/no-var-requires
const utils = require('handlebars-utils')

export class MiscHelpers {
	private static helpersRegistered = false

	static registerAll(): void {
		if (this.helpersRegistered) return
		this.helpersRegistered = true
		Handlebars.registerHelper('Curly', MiscHelpers.prototype.curly)
		Handlebars.registerHelper('Json', MiscHelpers.prototype.json)
		// eslint-disable-next-line spellcheck/spell-checker
		Handlebars.registerHelper('JSONstringifyFormatted', MiscHelpers.prototype.jsonStringifyFormatted)
		Handlebars.registerHelper('RandomString', MiscHelpers.prototype.randomString)
		Handlebars.registerHelper('RandomNumber', MiscHelpers.prototype.randomNumber)

		// eslint-disable-next-line spellcheck/spell-checker
		Handlebars.registerHelper('ifvalue', MiscHelpers.prototype.ifValue)
		// eslint-disable-next-line spellcheck/spell-checker
		Handlebars.registerHelper('ifvaluein', MiscHelpers.prototype.ifValueIn)
		Handlebars.registerHelper('IsNumber', MiscHelpers.prototype.isNumber)
		Handlebars.registerHelper('findComponents', MiscHelpers.prototype.findComponents)
	}

	curly(aString: any): string {
		return `{${aString}}`
	}

	json(anObject: any): string {
		let result = ''
		if (anObject != null)
			Object.keys(anObject).forEach((key) => {
				const value = anObject[key]
				if (typeof value === 'object') result += `${key}: [object], `
				else result += `${key}: ${value}, `
			})
		return `{${result}}`
	}

	jsonStringifyFormatted(anObject: any): string {
		if (anObject) return `${JSON.stringify(anObject, SystemComponentReplacer, 4)}`
		return '{}'
	}

	randomString(length: any): string {
		let outString = ''
		const outLength = length == null || length == -1 ? 50 : length
		// eslint-disable-next-line spellcheck/spell-checker
		const charChoices = '0123456789Aabcdefghijklmnopqrstuvwxyz0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ'
		for (let index = 0; index < outLength; index++) {
			outString += charChoices.charAt(Math.floor(Math.random() * charChoices.length))
		}
		return outString
	}

	randomNumber(max: any): number {
		return Math.floor(Math.random() * max)
	}

	ifValue(this: any, conditional: any, options: any): string {
		if (options.hash.equals === conditional) return options.fn(this)
		return options.inverse(this)
	}

	ifValueIn(this: any, conditional: any, options: any): any {
		if (typeof options.hash.equals === 'string') {
			const choices = options.hash.equals.split(',')
			for (let index = 0; index < choices.length; index++) {
				choices[index] = choices[index].trim()
			}
			if (choices.includes(conditional)) return options.fn(this)
		}
		return options.inverse(this)
	}

	isNumber(this: any, value: any, options: any): any {
		if (typeof value === 'number') return options.fn(this)
		if (typeof value === 'string') {
			const numericValue = parseFloat(value)
			if (!Number.isNaN(numericValue)) return options.fn(this)
		}
		return options.inverse(this)
	}

	findComponents(systemComponent: SystemComponent, searchCriteria: any, options: any): string {
		const unsortedMatches = systemComponent.findComponentsByString(searchCriteria.replace(/'/g, '"'))
		const sortedMatches = unsortedMatches.sort((componentA: SystemComponent, componentB: SystemComponent) =>
			(componentA as SystemDescendantComponent).fullConstantCaseName > (componentB as SystemDescendantComponent).fullConstantCaseName ? 1 : -1
		)
		const data = utils.createFrame(options, options.hash)

		let buffer = ''
		let index = -1
		const length = sortedMatches.length

		while (++index < length) {
			const item = sortedMatches[index] as any
			data.index = index
			item.index = index + 1
			item.total = length
			item.isFirst = index === 0
			item.first = index === 0
			item.isLast = index === length - 1
			item.last = index === length - 1
			buffer += options.fn(item, { data: data })
		}

		return buffer
	}
}
