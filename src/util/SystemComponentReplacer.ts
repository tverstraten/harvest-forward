import { SystemDescendantComponent } from '../system/SystemDescendantComponent'

/**
 * Utility for system json objects. It replaces references to system components with the components id.
 *
 * @param key - The name of a field or property in an object.
 * @param value - The current value for the field or property.
 * @returns A new object to replace with the recursive object.
 */
export function SystemComponentReplacer(key: any, value: any): any {
	if (key === 'parent') return
	if (key === '_children') return value
	if (value instanceof SystemDescendantComponent) {
		if (value.fullConstantCaseName === key) return value
		return `${value.fullConstantCaseName}`
	}
	return value
}
