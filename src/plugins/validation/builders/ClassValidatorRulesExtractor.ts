import ts, { ClassDeclaration, Decorator, PropertyDeclaration, SyntaxKind } from 'typescript'
import { Artifact } from '../../../system/Artifact'
import { System } from '../../../system/System'
import { SystemComponent } from '../../../system/SystemComponent'
import { Class, Property, InformationModel } from '../../information-architecture'
import { AbstractTypeScriptAstHarvester } from '../../typescript'
import { IsDecimalRule } from '../IsDecimalRule'
import { IsNumberRule } from '../IsNumberRule'
import { LengthRule } from '../LengthRule'
import { Rule } from '../Rule'

export class ClassValidatorRulesExtractor extends AbstractTypeScriptAstHarvester {
	constructor(configurationValues?: { [key: string]: any }) {
		super('A harvester that extracts inheritance relationships from a model of typescript classes', {}, configurationValues)
	}

	// eslint-disable-next-line max-lines-per-function
	async harvestFromAst(system: System, ast: ts.SourceFile): Promise<Artifact[]> {
		let representedClass: Class
		let representedProperty: Property
		const _thisThis = this
		const results = [] as Artifact[]
		const model = InformationModel.fromSystem(system)

		try {
			// eslint-disable-next-line @typescript-eslint/naming-convention, max-lines-per-function
			ts.forEachChild(ast, function visit(node: ts.Node) {
				switch (node.kind) {
					case SyntaxKind.ClassDeclaration:
						const classDeclaration = node as ClassDeclaration
						const name = classDeclaration.name?.getText(ast) as string
						if (name != null && _thisThis.validClass(name)) {
							const fullName = SystemComponent.fullConstantCase(model.fullConstantCaseName, name)
							representedClass = system.descendants[fullName] as Class
							ts.forEachChild(node, visit)
						}
						break
					case SyntaxKind.PropertyDeclaration:
						const member = node as PropertyDeclaration
						const memberIdentifier = member.name
						// eslint-disable-next-line @typescript-eslint/no-unused-vars
						const memberName = memberIdentifier.getText(ast)
						if (memberName != null) {
							const fullName = SystemComponent.fullConstantCase(representedClass.fullConstantCaseName, memberName)
							representedProperty = system.descendants[fullName] as Property
							ts.forEachChild(node, visit)
						}
						ts.forEachChild(node, visit)
						break
					case SyntaxKind.Decorator:
						const decorator = node as Decorator
						const nameNode = (decorator.expression as any).expression
						const decoratorName = nameNode.escapedText
						const parameters = (decorator.expression as any).arguments
						switch (decoratorName) {
							case 'MaxLength':
								if (!representedProperty.rules.find((rule) => rule.objectTypeName == 'LengthRule')) {
									const newRule = new LengthRule(representedProperty.fullConstantCaseName, decoratorName, '')
									newRule.maximum = parseInt(parameters[0].getText(ast))
									representedProperty.rules.push(newRule)
								}
								break

							case 'IsNumber':
								if (!representedProperty.rules.find((rule) => rule.objectTypeName == decoratorName)) {
									const newRule = new IsNumberRule(representedProperty.fullConstantCaseName, decoratorName, '')
									if (parameters && parameters.length > 0) {
										const configurationParameter = parameters[0]
										configurationParameter.properties.forEach((property: any) => {
											const propertyName = property.name.escapedText.replace(`'`, '')
											const initializerText = property.initializer.getText(ast)
											switch (propertyName) {
												case 'allowNaN':
													newRule.allowNaN = initializerText.toLowerCase() == 'true'
													break
												case 'allowInfinity':
													newRule.allowInfinity = initializerText.toLowerCase() == 'true'
													break
												case 'maxDecimalPlaces':
													newRule.maxDecimalPlaces = parseInt(initializerText)
													break
												default:
													break
											}
										})
									}
									representedProperty.rules.push(newRule)
								}
								break

							case 'IsDecimal':
								if (!representedProperty.rules.find((rule) => rule.objectTypeName == decoratorName)) {
									const newRule = new IsDecimalRule(representedProperty.fullConstantCaseName, decoratorName, '')
									const configurationParameter = parameters[0]
									configurationParameter.properties.forEach((property: any) => {
										const propertyName = property.name.escapedText.replace(`'`, '')
										const initializerText = property.initializer.getText(ast)
										switch (propertyName) {
											case 'force_decimal':
												newRule.forceDecimal = initializerText.toLowerCase() == 'true'
												break
											case 'decimal_digits':
												newRule.decimalDigits = parseInt(initializerText)
												break
											case 'locale':
												newRule.locale = initializerText
												break
											default:
												break
										}
									})
									representedProperty.rules.push(newRule)
								}
								break

							default:
								if (!representedProperty.rules.find((rule) => rule.objectTypeName == decoratorName)) {
									representedProperty.rules.push(new Rule(decoratorName, representedProperty.fullConstantCaseName, decoratorName, ''))
								}
						}
						break

					default:
						// ignore
						break
				}
				//console.log(node.kind);
			})

			return results
		} catch (problem) {
			this.logger.error(`harvestFromAst(failed) ${problem}`)
			throw problem
		}
	}
}
