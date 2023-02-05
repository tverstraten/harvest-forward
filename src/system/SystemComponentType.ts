/**
 * A categorization of the portion of the system that is targeted.
 */
export enum SystemComponentType {
	system = 'system',

	storage = 'storage',

	storageProjection = 'storageProjection',

	informationModel = 'informationModel',

	informationModelMapping = 'informationModelMapping',

	informationModelProjection = 'informationModelProjection',

	informationModelProjectionMapping = 'informationModelProjectionMapping',

	dataAccess = 'dataAccess',

	service = 'service',

	serviceEndpoint = 'serviceEndpoint',

	clientApiProxy = 'clientApiProxy',

	clientApplication = 'clientApplication',

	visualization = 'visualization',

	accessControlMapping = 'accessControlMapping',

	validationRule = 'validationRule',
}
