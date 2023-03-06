/* eslint-disable max-depth */
import ts, { ClassDeclaration, Expression, PropertyDeclaration, SyntaxKind } from 'typescript'
import { Artifact } from '../../system/Artifact'
import { ComponentOrigin } from '../../system/ComponentOrigin'
import { Permanence } from '../../system/Permanence'
import { ProgrammingLanguage } from '../../system/ProgrammingLanguage'
import { System } from '../../system/System'
import { SystemComponent } from '../../system/SystemComponent'
import { SystemComponentArtifact } from '../../system/SystemComponentArtifact'
import { ValueType } from '../../system/ValueType'
import { Class, InformationModel, Property } from '../information-architecture'
import { AbstractTypeScriptAstHarvester } from './AbstractTypeScriptAstHarvester'

export class TypeScriptClassPropertyToModelHarvester extends AbstractTypeScriptAstHarvester {
	constructor(configurationValues?: { [key: string]: any }) {
		super('A harvester that infers the data model from typescript classes', {}, configurationValues)
	}

	// eslint-disable-next-line max-lines-per-function
	async harvestFromAst(system: System, ast: ts.SourceFile): Promise<Artifact[]> {
		let representedClass: Class
		const _thisThis = this
		const results = [] as Artifact[]
		const model = InformationModel.fromSystem(system)
		try {
			// eslint-disable-next-line max-lines-per-function, @typescript-eslint/naming-convention
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
						const memberName = memberIdentifier.getText(ast)
						if (representedClass != null && representedClass.propertiesMap[memberName] == null) {
							const memberJsDoc = (node as any).jsDoc as any[]
							let memberDocumentationText = ''
							if (memberJsDoc != null) {
								memberJsDoc.forEach((jsDocItem) => {
									memberDocumentationText += jsDocItem.comment as string
								})
							}
							let typeNode = member.type as ts.TypeNode
							let typeName
							if (typeNode == null && member.initializer) {
								const definingInitializer = member.initializer as Expression
								if ((definingInitializer as any).type) typeNode = (definingInitializer as any).type
								else {
									const initializerText = definingInitializer.getText(ast)
									if (initializerText) {
										if (!isNaN(parseInt(initializerText))) typeName = 'number'
										else if (!isNaN(parseFloat(initializerText))) typeName = 'number'
										else {
											try {
												const asJson = JSON.parse(initializerText)
												if (typeof asJson == 'boolean') typeName = 'boolean'
												else typeName = 'string'
											} catch (problem) {
												typeName = 'string'
											}
										}
									}
								}
							}
							if (!typeName) {
								if (typeNode == null) typeName = 'string'
								else typeName = typeNode.getText(ast)
							}

							if (typeName.indexOf('|') >= 0) {
								typeName = typeName.substr(0, typeName.indexOf('|')).trim()
							}
							let isArray
							if (typeName.indexOf('[]') >= 0) {
								typeName = typeName.replace('[]', '')
								isArray = true
							} else isArray = false

							const staticModifier = member.modifiers?.find((modifier) => modifier.kind == SyntaxKind.StaticKeyword)

							const fullName = SystemComponent.fullConstantCase(model.fullConstantCaseName, typeName)
							let propertyType
							try {
								propertyType = ValueType.fromNameInLanguage(ProgrammingLanguage.typeScript, typeName)
								if (!propertyType) propertyType = system.descendants[fullName] as ValueType
								if (isArray && propertyType) propertyType = propertyType.asCollection
							} catch (problem) {
								_thisThis.logger.error(`harvestFromAst(failed) ${problem}`)
								propertyType = ValueType.fromNameInLanguage(ProgrammingLanguage.typeScript, 'string')
							}
							if (propertyType) {
								if (member.questionToken) propertyType = propertyType.asOptional
								const newProperty = new Property(representedClass.constantCaseFullName, memberName, memberDocumentationText, propertyType, 0)
								newProperty.permanence = Permanence.persistent
								newProperty.informational = true
								newProperty.functional = false
								newProperty.optional = member.questionToken ? true : false
								newProperty.origin = ComponentOrigin.harvested
								newProperty.static = staticModifier ? true : false

								representedClass.addChild(newProperty)
								results.push(new SystemComponentArtifact(newProperty))
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
