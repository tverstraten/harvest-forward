import { SystemDescendantComponent } from './SystemDescendantComponent'

export function SystemComponentComparator(paramA: SystemDescendantComponent, paramB: SystemDescendantComponent): number {
	return paramA.fullConstantCaseName == paramB.fullConstantCaseName ? 0 : paramA.fullConstantCaseName > paramB.fullConstantCaseName ? 1 : -1
}
