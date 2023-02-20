import ts, { ClassDeclaration, MethodDeclaration, SyntaxKind } from 'typescript'
import { Artifact } from '../../system/Artifact'
import { ComponentOrigin } from '../../system/ComponentOrigin'
import { Permanence } from '../../system/Permanence'
import { ProgrammingLanguage } from '../../system/ProgrammingLanguage'
import { System } from '../../system/System'
import { SystemComponent } from '../../system/SystemComponent'
import { SystemComponentArtifact } from '../../system/SystemComponentArtifact'
import { ValueSpecification } from '../../system/ValueSpecification'
import { ValueType } from '../../system/ValueType'
import { Class, InformationModel, Method, Parameter } from '../information-architecture'
import { AbstractTypeScriptAstHarvester } from './AbstractTypeScriptAstHarvester'

export class TypeScriptClassMethodToModelHarvester extends AbstractTypeScriptAstHarvester {
	constructor(configurationValues?: { [key: string]: any }) {
		super('A harvester that infers the functional model from typescript classes', {}, configurationValues)
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
					case SyntaxKind.MethodDeclaration:
						const member = node as MethodDeclaration
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
							const typeNode = member.type as ts.TypeNode
							let typeName
							if (typeNode == null) typeName = 'string'
							else typeName = typeNode.getText(ast)
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
							let returnType
							try {
								returnType = system.descendants[fullName] as ValueType
								if (returnType == null) returnType = ValueType.fromNameInLanguage(ProgrammingLanguage.typeScript, typeName)
								if (isArray && returnType) returnType = returnType.asCollection
							} catch (problem) {
								_thisThis.logger.error(`harvestFromAst(failed) ${problem}`)
								returnType = ValueType.fromNameInLanguage(ProgrammingLanguage.typeScript, 'string')
							}

							const newMethod = new Method(representedClass.constantCaseFullName, memberName, memberDocumentationText)
							newMethod.permanence = Permanence.persistent
							newMethod.informational = false
							newMethod.functional = true
							newMethod.origin = ComponentOrigin.harvested
							newMethod.static = staticModifier ? true : false
							newMethod.returns = { type: returnType } as ValueSpecification
							representedClass.addChild(newMethod)

							member.parameters?.forEach((astParameter) => {
								const parameterName = astParameter.name.getText(ast)
								const parameterDescription = ''
								const parameterTypeName = astParameter.type?.getText(ast) as string
								let parameterType

								const fullParameterTypeName = SystemComponent.fullConstantCase(model.fullConstantCaseName, parameterTypeName)
								try {
									parameterType = system.descendants[fullParameterTypeName] as ValueType
									if (parameterType == null) parameterType = ValueType.fromNameInLanguage(ProgrammingLanguage.typeScript, parameterTypeName)
								} catch (problem) {
									_thisThis.logger.error(`harvestFromAst(failed) ${problem}`)
									parameterType = ValueType.fromNameInLanguage(ProgrammingLanguage.typeScript, 'string')
								}

								if (parameterType) {
									const parameter = new Parameter(newMethod.fullConstantCaseName, parameterName, parameterDescription, parameterType, 0)
									parameter.optional = astParameter.questionToken ? true : false

									newMethod.addChild(parameter)
								}
							})

							results.push(new SystemComponentArtifact(newMethod))
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
