import ts, { EnumDeclaration, EnumMember, SyntaxKind } from 'typescript'
import { Artifact } from '../../system/Artifact'
import { ComponentOrigin } from '../../system/ComponentOrigin'
import { Permanence } from '../../system/Permanence'
import { System } from '../../system/System'
import { SystemComponentArtifact } from '../../system/SystemComponentArtifact'
import { EnumeratedValue, Enumeration, InformationModel } from '../information-architecture'
import { AbstractTypeScriptAstHarvester } from './AbstractTypeScriptAstHarvester'

export class TypeScriptEnumValueHarvester extends AbstractTypeScriptAstHarvester {
	constructor(configurationValues?: { [key: string]: any }) {
		super('A harvester that reads enumeration values from typescript files', {}, configurationValues)
	}

	// eslint-disable-next-line max-lines-per-function
	async harvestFromAst(system: System, ast: ts.SourceFile): Promise<Artifact[]> {
		const results = [] as Artifact[]
		let representedEnum: Enumeration
		const model = InformationModel.fromSystem(system)
		try {
			// eslint-disable-next-line max-lines-per-function, @typescript-eslint/naming-convention
			ts.forEachChild(ast, function visit(node: ts.Node) {
				switch (node.kind) {
					case SyntaxKind.EnumDeclaration:
						const declaration = node as EnumDeclaration
						const name = declaration.name
						const enumName = name.getText(ast)
						const jsDoc = (node as any).jsDoc as any[]
						let documentationText = ''
						if (jsDoc != null) {
							jsDoc.forEach((jsDocItem) => {
								documentationText += jsDocItem.comment as string
							})
						}
						representedEnum = new Enumeration(model.fullConstantCaseName, enumName, documentationText, [])
						representedEnum.permanence = Permanence.constant
						representedEnum.informational = true
						representedEnum.functional = false
						representedEnum.origin = ComponentOrigin.harvested
						model.addChild(representedEnum)
						results.push(new SystemComponentArtifact(representedEnum))
						ts.forEachChild(node, visit)
						break
					case SyntaxKind.EnumMember:
						const member = (<EnumMember>node).name
						const memberName = member.getText(ast)
						const memberJsDoc = (node as any).jsDoc as any[]
						let memberDocumentationText = ''
						if (memberJsDoc != null) {
							memberJsDoc.forEach((jsDocItem) => {
								memberDocumentationText += jsDocItem.comment as string
							})
						}
						const initializer = (node as any).initializer
						let initializerText
						if (initializer != null) initializerText = initializer.getText(ast)
						const enumValue = new EnumeratedValue(representedEnum.constantCaseFullName, memberName, memberDocumentationText, initializerText)
						enumValue.permanence = Permanence.constant
						enumValue.informational = true
						enumValue.functional = false
						enumValue.origin = ComponentOrigin.harvested
						representedEnum.addChild(enumValue)
						break
					default:
						// ignore
						break
				}
				//console.log(node.kind);
			})
		} catch (problem) {
			this.logger.error(`harvestFromAst(failed) ${problem}`)
		}

		return results
	}
}
