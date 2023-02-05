# Typescript plugin

This plugin includes basic [value types](./index.ts) for Typescript, templates for producing Typescript code and some harvesters to collect basic information. The templates are:

1. [Poco](./Poco.handlebars) - Template for a class that holds the properties of a model class

The harvesters included are:

1. [AbstractTypeScriptAstHarvester](./AbstractTypeScriptAstHarvester.ts) - A base point of inheritence for harvesters of information from typescript source code
1. [TypeScriptClassFieldToModelHarvester](./TypeScriptClassFieldToModelHarvester.ts) - Extract fields from classes and add to the model
1. [TypeScriptClassPropertyToModelHarvester](./TypeScriptClassPropertyToModelHarvester.ts) - Extract properties from classes and add to the model
1. [TypeScriptClassToModelHarvester](./TypeScriptClassToModelHarvester.ts) - Extract classes without the members from the model
1. [TypeScriptEnumValueHarvester](./TypeScriptEnumValueHarvester.ts) - Extract enumerations and their values and add to the model
