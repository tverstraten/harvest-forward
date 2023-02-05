import ts, { ClassDeclaration, SyntaxKind } from 'typescript'
import { Artifact } from '../../system/Artifact'
import { ComponentOrigin } from '../../system/ComponentOrigin'
import { Permanence } from '../../system/Permanence'
import { System } from '../../system/System'
import { SystemComponent } from '../../system/SystemComponent'
import { SystemComponentArtifact } from '../../system/SystemComponentArtifact'
import { SystemComponentType } from '../../system/SystemComponentType'
import { Class, InformationModel } from '../information-architecture'
import { AbstractTypeScriptAstHarvester } from './AbstractTypeScriptAstHarvester'

export class TypeScriptClassToModelHarvester extends AbstractTypeScriptAstHarvester {
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
			// eslint-disable-next-line @typescript-eslint/naming-convention
			ts.forEachChild(ast, function visit(node: ts.Node) {
				switch (node.kind) {
					case SyntaxKind.ClassDeclaration:
						const classDeclaration = node as ClassDeclaration
						const name = classDeclaration.name?.getText(ast) as string
						if (name != null && _thisThis.validClass(name)) {
							const fullName = SystemComponent.fullConstantCase(model.fullConstantCaseName, name)
							const valueClass = system.descendants[fullName] as Class
							if (valueClass == null) {
								const memberJsDoc = (node as any).jsDoc as any[]
								let memberDocumentationText = ''
								if (memberJsDoc != null) {
									memberJsDoc.forEach((jsDocItem) => {
										memberDocumentationText += jsDocItem.comment as string
									})
								}
								representedClass = new Class(model.fullConstantCaseName, name, memberDocumentationText, SystemComponentType.informationModel)
								representedClass.permanence = Permanence.persistent
								const abstractModifier = classDeclaration.modifiers?.find((modifier) => modifier.kind == SyntaxKind.AbstractKeyword)
								representedClass.isAbstract = abstractModifier ? true : false
								representedClass.informational = true
								representedClass.functional = false
								representedClass.origin = ComponentOrigin.harvested
								model.addChild(representedClass)
								results.push(new SystemComponentArtifact(representedClass))
								ts.forEachChild(node, visit)
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
