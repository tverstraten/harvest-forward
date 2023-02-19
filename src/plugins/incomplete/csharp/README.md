# CSharp plugin

This plugin includes basic [value types](./index.ts) for C# plus several templates for producing C# code. The templates are:

1. [Enum](./Enum.handlebars) - Template for C# enumerations
1. [Poco.generated](./Poco.generated.handlebars) - Template for a partial class that implements all the properties and inheritence of a model class
1. [Poco](./Poco.handlebars) - Template for a partial class stub that is meant for the developer to use to extendthe model class

# TODO:

An ANTLR grammar is present with the intent of turning it into a parser for harvesting from C# source code.
