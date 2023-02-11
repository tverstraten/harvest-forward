import Handlebars from 'handlebars'

export class StringHelpers {
	private static helpersRegistered = false

	static registerAll(): void {
		if (this.helpersRegistered) return
		this.helpersRegistered = true
		Handlebars.registerHelper('NoCrString', StringHelpers.prototype.noCrString)
		Handlebars.registerHelper('Replace', StringHelpers.prototype.replace)
		Handlebars.registerHelper('ToTsTemplate', StringHelpers.prototype.toTsTemplate)
	}

	noCrString(aString: any): Handlebars.SafeString | null {
		if (aString == null) return null
		return new Handlebars.SafeString(aString.replace(/\r\n/g, ' ').replace(/\n/g, ' ').replace(/\r/g, ' '))
	}

	replace(anObject: string, regexText: string): string {
		let result = anObject
		if (anObject != null && regexText != null) {
			const slashAt = regexText.indexOf('/')
			const searchText = regexText.substring(0, slashAt)
			const searchRegex = new RegExp(searchText)
			const replaceText = regexText.substring(slashAt + 1)
			result = anObject.replace(searchRegex, replaceText)
		}
		return result
	}

	toTsTemplate(aString: any): string | null {
		if (aString == null) return null
		const adjusted = aString.replace(/({.*})/g, function (piece: string) {
			return '$' + piece
		})
		return adjusted
	}
}
