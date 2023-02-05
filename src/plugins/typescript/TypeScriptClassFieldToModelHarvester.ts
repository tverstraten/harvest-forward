import ts, { ClassDeclaration, SyntaxKind, VariableDeclaration } from 'typescript'
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

export class TypeScriptClassFieldToModelHarvester extends AbstractTypeScriptAstHarvester {
	constructor(configurationValues?: { [key: string]: any }) {
		super('A harvester that infers the data model from typescript classes', {}, configurationValues)
	}

	// eslint-disable-next-line max-lines-per-function
	async harvestFromAst(system: System, ast: ts.SourceFile): Promise<Artifact[]> {
		let representedClass: Class
		const results = [] as Artifact[]
		const _thisThis = this
		const model = InformationModel.fromSystem(system)
		try {
			this.ensureRegexes()
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
					case SyntaxKind.VariableDeclaration:
						const member = node as VariableDeclaration
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
							let typeName = typeNode.getText(ast)
							if (typeName.indexOf('|') >= 0) {
								typeName = typeName.substr(0, typeName.indexOf('|')).trim()
							}
							let isArray
							if (typeName.indexOf('[]') >= 0) {
								typeName = typeName.replace('[]', '')
								isArray = true
							} else isArray = false

							const fullName = SystemComponent.fullConstantCase(model.fullConstantCaseName, typeName)
							let propertyType = system.descendants[fullName] as ValueType
							if (propertyType == null) propertyType = ValueType.fromNameInType(ProgrammingLanguage.typeScript, typeName)
							if (isArray) propertyType = propertyType.asCollection

							const newProperty = new Property(representedClass.constantCaseFullName, memberName, memberDocumentationText, propertyType, 0)
							newProperty.permanence = Permanence.persistent
							newProperty.informational = true
							newProperty.functional = false
							newProperty.origin = ComponentOrigin.harvested
							representedClass.addChild(newProperty)
							results.push(new SystemComponentArtifact(newProperty))
						}
						break
					default:
						// ignore
						break
				}
			})

			return results
		} catch (problem) {
			this.logger.error(`harvestFromAst(failed) ${problem}`)
			throw problem
		}
	}
}
