// Generated from \tools\parsers\java\java9\Java9Parser.g4 by ANTLR 4.8
// jshint ignore: start
var antlr4 = require('antlr4/index');

// This class defines a complete listener for a parse tree produced by Java9Parser.
function Java9ParserListener() {
    antlr4.tree.ParseTreeListener.call(this);
    return this;
}

Java9ParserListener.prototype = Object.create(antlr4.tree.ParseTreeListener.prototype);
Java9ParserListener.prototype.constructor = Java9ParserListener;

// Enter a parse tree produced by Java9Parser#literal.
Java9ParserListener.prototype.enterLiteral = function (ctx) {
};

// Exit a parse tree produced by Java9Parser#literal.
Java9ParserListener.prototype.exitLiteral = function (ctx) {
};


// Enter a parse tree produced by Java9Parser#primitiveType.
Java9ParserListener.prototype.enterPrimitiveType = function (ctx) {
};

// Exit a parse tree produced by Java9Parser#primitiveType.
Java9ParserListener.prototype.exitPrimitiveType = function (ctx) {
};


// Enter a parse tree produced by Java9Parser#numericType.
Java9ParserListener.prototype.enterNumericType = function (ctx) {
};

// Exit a parse tree produced by Java9Parser#numericType.
Java9ParserListener.prototype.exitNumericType = function (ctx) {
};


// Enter a parse tree produced by Java9Parser#integralType.
Java9ParserListener.prototype.enterIntegralType = function (ctx) {
};

// Exit a parse tree produced by Java9Parser#integralType.
Java9ParserListener.prototype.exitIntegralType = function (ctx) {
};


// Enter a parse tree produced by Java9Parser#floatingPointType.
Java9ParserListener.prototype.enterFloatingPointType = function (ctx) {
};

// Exit a parse tree produced by Java9Parser#floatingPointType.
Java9ParserListener.prototype.exitFloatingPointType = function (ctx) {
};


// Enter a parse tree produced by Java9Parser#referenceType.
Java9ParserListener.prototype.enterReferenceType = function (ctx) {
};

// Exit a parse tree produced by Java9Parser#referenceType.
Java9ParserListener.prototype.exitReferenceType = function (ctx) {
};


// Enter a parse tree produced by Java9Parser#classOrInterfaceType.
Java9ParserListener.prototype.enterClassOrInterfaceType = function (ctx) {
};

// Exit a parse tree produced by Java9Parser#classOrInterfaceType.
Java9ParserListener.prototype.exitClassOrInterfaceType = function (ctx) {
};


// Enter a parse tree produced by Java9Parser#classType.
Java9ParserListener.prototype.enterClassType = function (ctx) {
};

// Exit a parse tree produced by Java9Parser#classType.
Java9ParserListener.prototype.exitClassType = function (ctx) {
};


// Enter a parse tree produced by Java9Parser#classType_lf_classOrInterfaceType.
Java9ParserListener.prototype.enterClassType_lf_classOrInterfaceType = function (ctx) {
};

// Exit a parse tree produced by Java9Parser#classType_lf_classOrInterfaceType.
Java9ParserListener.prototype.exitClassType_lf_classOrInterfaceType = function (ctx) {
};


// Enter a parse tree produced by Java9Parser#classType_lfno_classOrInterfaceType.
Java9ParserListener.prototype.enterClassType_lfno_classOrInterfaceType = function (ctx) {
};

// Exit a parse tree produced by Java9Parser#classType_lfno_classOrInterfaceType.
Java9ParserListener.prototype.exitClassType_lfno_classOrInterfaceType = function (ctx) {
};


// Enter a parse tree produced by Java9Parser#interfaceType.
Java9ParserListener.prototype.enterInterfaceType = function (ctx) {
};

// Exit a parse tree produced by Java9Parser#interfaceType.
Java9ParserListener.prototype.exitInterfaceType = function (ctx) {
};


// Enter a parse tree produced by Java9Parser#interfaceType_lf_classOrInterfaceType.
Java9ParserListener.prototype.enterInterfaceType_lf_classOrInterfaceType = function (ctx) {
};

// Exit a parse tree produced by Java9Parser#interfaceType_lf_classOrInterfaceType.
Java9ParserListener.prototype.exitInterfaceType_lf_classOrInterfaceType = function (ctx) {
};


// Enter a parse tree produced by Java9Parser#interfaceType_lfno_classOrInterfaceType.
Java9ParserListener.prototype.enterInterfaceType_lfno_classOrInterfaceType = function (ctx) {
};

// Exit a parse tree produced by Java9Parser#interfaceType_lfno_classOrInterfaceType.
Java9ParserListener.prototype.exitInterfaceType_lfno_classOrInterfaceType = function (ctx) {
};


// Enter a parse tree produced by Java9Parser#typeVariable.
Java9ParserListener.prototype.enterTypeVariable = function (ctx) {
};

// Exit a parse tree produced by Java9Parser#typeVariable.
Java9ParserListener.prototype.exitTypeVariable = function (ctx) {
};


// Enter a parse tree produced by Java9Parser#arrayType.
Java9ParserListener.prototype.enterArrayType = function (ctx) {
};

// Exit a parse tree produced by Java9Parser#arrayType.
Java9ParserListener.prototype.exitArrayType = function (ctx) {
};


// Enter a parse tree produced by Java9Parser#dims.
Java9ParserListener.prototype.enterDims = function (ctx) {
};

// Exit a parse tree produced by Java9Parser#dims.
Java9ParserListener.prototype.exitDims = function (ctx) {
};


// Enter a parse tree produced by Java9Parser#typeParameter.
Java9ParserListener.prototype.enterTypeParameter = function (ctx) {
};

// Exit a parse tree produced by Java9Parser#typeParameter.
Java9ParserListener.prototype.exitTypeParameter = function (ctx) {
};


// Enter a parse tree produced by Java9Parser#typeParameterModifier.
Java9ParserListener.prototype.enterTypeParameterModifier = function (ctx) {
};

// Exit a parse tree produced by Java9Parser#typeParameterModifier.
Java9ParserListener.prototype.exitTypeParameterModifier = function (ctx) {
};


// Enter a parse tree produced by Java9Parser#typeBound.
Java9ParserListener.prototype.enterTypeBound = function (ctx) {
};

// Exit a parse tree produced by Java9Parser#typeBound.
Java9ParserListener.prototype.exitTypeBound = function (ctx) {
};


// Enter a parse tree produced by Java9Parser#additionalBound.
Java9ParserListener.prototype.enterAdditionalBound = function (ctx) {
};

// Exit a parse tree produced by Java9Parser#additionalBound.
Java9ParserListener.prototype.exitAdditionalBound = function (ctx) {
};


// Enter a parse tree produced by Java9Parser#typeArguments.
Java9ParserListener.prototype.enterTypeArguments = function (ctx) {
};

// Exit a parse tree produced by Java9Parser#typeArguments.
Java9ParserListener.prototype.exitTypeArguments = function (ctx) {
};


// Enter a parse tree produced by Java9Parser#typeArgumentList.
Java9ParserListener.prototype.enterTypeArgumentList = function (ctx) {
};

// Exit a parse tree produced by Java9Parser#typeArgumentList.
Java9ParserListener.prototype.exitTypeArgumentList = function (ctx) {
};


// Enter a parse tree produced by Java9Parser#typeArgument.
Java9ParserListener.prototype.enterTypeArgument = function (ctx) {
};

// Exit a parse tree produced by Java9Parser#typeArgument.
Java9ParserListener.prototype.exitTypeArgument = function (ctx) {
};


// Enter a parse tree produced by Java9Parser#wildcard.
Java9ParserListener.prototype.enterWildcard = function (ctx) {
};

// Exit a parse tree produced by Java9Parser#wildcard.
Java9ParserListener.prototype.exitWildcard = function (ctx) {
};


// Enter a parse tree produced by Java9Parser#wildcardBounds.
Java9ParserListener.prototype.enterWildcardBounds = function (ctx) {
};

// Exit a parse tree produced by Java9Parser#wildcardBounds.
Java9ParserListener.prototype.exitWildcardBounds = function (ctx) {
};


// Enter a parse tree produced by Java9Parser#moduleName.
Java9ParserListener.prototype.enterModuleName = function (ctx) {
};

// Exit a parse tree produced by Java9Parser#moduleName.
Java9ParserListener.prototype.exitModuleName = function (ctx) {
};


// Enter a parse tree produced by Java9Parser#packageName.
Java9ParserListener.prototype.enterPackageName = function (ctx) {
};

// Exit a parse tree produced by Java9Parser#packageName.
Java9ParserListener.prototype.exitPackageName = function (ctx) {
};


// Enter a parse tree produced by Java9Parser#typeName.
Java9ParserListener.prototype.enterTypeName = function (ctx) {
};

// Exit a parse tree produced by Java9Parser#typeName.
Java9ParserListener.prototype.exitTypeName = function (ctx) {
};


// Enter a parse tree produced by Java9Parser#packageOrTypeName.
Java9ParserListener.prototype.enterPackageOrTypeName = function (ctx) {
};

// Exit a parse tree produced by Java9Parser#packageOrTypeName.
Java9ParserListener.prototype.exitPackageOrTypeName = function (ctx) {
};


// Enter a parse tree produced by Java9Parser#expressionName.
Java9ParserListener.prototype.enterExpressionName = function (ctx) {
};

// Exit a parse tree produced by Java9Parser#expressionName.
Java9ParserListener.prototype.exitExpressionName = function (ctx) {
};


// Enter a parse tree produced by Java9Parser#methodName.
Java9ParserListener.prototype.enterMethodName = function (ctx) {
};

// Exit a parse tree produced by Java9Parser#methodName.
Java9ParserListener.prototype.exitMethodName = function (ctx) {
};


// Enter a parse tree produced by Java9Parser#ambiguousName.
Java9ParserListener.prototype.enterAmbiguousName = function (ctx) {
};

// Exit a parse tree produced by Java9Parser#ambiguousName.
Java9ParserListener.prototype.exitAmbiguousName = function (ctx) {
};


// Enter a parse tree produced by Java9Parser#compilationUnit.
Java9ParserListener.prototype.enterCompilationUnit = function (ctx) {
};

// Exit a parse tree produced by Java9Parser#compilationUnit.
Java9ParserListener.prototype.exitCompilationUnit = function (ctx) {
};


// Enter a parse tree produced by Java9Parser#ordinaryCompilation.
Java9ParserListener.prototype.enterOrdinaryCompilation = function (ctx) {
};

// Exit a parse tree produced by Java9Parser#ordinaryCompilation.
Java9ParserListener.prototype.exitOrdinaryCompilation = function (ctx) {
};


// Enter a parse tree produced by Java9Parser#modularCompilation.
Java9ParserListener.prototype.enterModularCompilation = function (ctx) {
};

// Exit a parse tree produced by Java9Parser#modularCompilation.
Java9ParserListener.prototype.exitModularCompilation = function (ctx) {
};


// Enter a parse tree produced by Java9Parser#packageDeclaration.
Java9ParserListener.prototype.enterPackageDeclaration = function (ctx) {
};

// Exit a parse tree produced by Java9Parser#packageDeclaration.
Java9ParserListener.prototype.exitPackageDeclaration = function (ctx) {
};


// Enter a parse tree produced by Java9Parser#packageModifier.
Java9ParserListener.prototype.enterPackageModifier = function (ctx) {
};

// Exit a parse tree produced by Java9Parser#packageModifier.
Java9ParserListener.prototype.exitPackageModifier = function (ctx) {
};


// Enter a parse tree produced by Java9Parser#importDeclaration.
Java9ParserListener.prototype.enterImportDeclaration = function (ctx) {
};

// Exit a parse tree produced by Java9Parser#importDeclaration.
Java9ParserListener.prototype.exitImportDeclaration = function (ctx) {
};


// Enter a parse tree produced by Java9Parser#singleTypeImportDeclaration.
Java9ParserListener.prototype.enterSingleTypeImportDeclaration = function (ctx) {
};

// Exit a parse tree produced by Java9Parser#singleTypeImportDeclaration.
Java9ParserListener.prototype.exitSingleTypeImportDeclaration = function (ctx) {
};


// Enter a parse tree produced by Java9Parser#typeImportOnDemandDeclaration.
Java9ParserListener.prototype.enterTypeImportOnDemandDeclaration = function (ctx) {
};

// Exit a parse tree produced by Java9Parser#typeImportOnDemandDeclaration.
Java9ParserListener.prototype.exitTypeImportOnDemandDeclaration = function (ctx) {
};


// Enter a parse tree produced by Java9Parser#singleStaticImportDeclaration.
Java9ParserListener.prototype.enterSingleStaticImportDeclaration = function (ctx) {
};

// Exit a parse tree produced by Java9Parser#singleStaticImportDeclaration.
Java9ParserListener.prototype.exitSingleStaticImportDeclaration = function (ctx) {
};


// Enter a parse tree produced by Java9Parser#staticImportOnDemandDeclaration.
Java9ParserListener.prototype.enterStaticImportOnDemandDeclaration = function (ctx) {
};

// Exit a parse tree produced by Java9Parser#staticImportOnDemandDeclaration.
Java9ParserListener.prototype.exitStaticImportOnDemandDeclaration = function (ctx) {
};


// Enter a parse tree produced by Java9Parser#typeDeclaration.
Java9ParserListener.prototype.enterTypeDeclaration = function (ctx) {
};

// Exit a parse tree produced by Java9Parser#typeDeclaration.
Java9ParserListener.prototype.exitTypeDeclaration = function (ctx) {
};


// Enter a parse tree produced by Java9Parser#moduleDeclaration.
Java9ParserListener.prototype.enterModuleDeclaration = function (ctx) {
};

// Exit a parse tree produced by Java9Parser#moduleDeclaration.
Java9ParserListener.prototype.exitModuleDeclaration = function (ctx) {
};


// Enter a parse tree produced by Java9Parser#moduleDirective.
Java9ParserListener.prototype.enterModuleDirective = function (ctx) {
};

// Exit a parse tree produced by Java9Parser#moduleDirective.
Java9ParserListener.prototype.exitModuleDirective = function (ctx) {
};


// Enter a parse tree produced by Java9Parser#requiresModifier.
Java9ParserListener.prototype.enterRequiresModifier = function (ctx) {
};

// Exit a parse tree produced by Java9Parser#requiresModifier.
Java9ParserListener.prototype.exitRequiresModifier = function (ctx) {
};


// Enter a parse tree produced by Java9Parser#classDeclaration.
Java9ParserListener.prototype.enterClassDeclaration = function (ctx) {
};

// Exit a parse tree produced by Java9Parser#classDeclaration.
Java9ParserListener.prototype.exitClassDeclaration = function (ctx) {
};


// Enter a parse tree produced by Java9Parser#normalClassDeclaration.
Java9ParserListener.prototype.enterNormalClassDeclaration = function (ctx) {
};

// Exit a parse tree produced by Java9Parser#normalClassDeclaration.
Java9ParserListener.prototype.exitNormalClassDeclaration = function (ctx) {
};


// Enter a parse tree produced by Java9Parser#classModifier.
Java9ParserListener.prototype.enterClassModifier = function (ctx) {
};

// Exit a parse tree produced by Java9Parser#classModifier.
Java9ParserListener.prototype.exitClassModifier = function (ctx) {
};


// Enter a parse tree produced by Java9Parser#typeParameters.
Java9ParserListener.prototype.enterTypeParameters = function (ctx) {
};

// Exit a parse tree produced by Java9Parser#typeParameters.
Java9ParserListener.prototype.exitTypeParameters = function (ctx) {
};


// Enter a parse tree produced by Java9Parser#typeParameterList.
Java9ParserListener.prototype.enterTypeParameterList = function (ctx) {
};

// Exit a parse tree produced by Java9Parser#typeParameterList.
Java9ParserListener.prototype.exitTypeParameterList = function (ctx) {
};


// Enter a parse tree produced by Java9Parser#superclass.
Java9ParserListener.prototype.enterSuperclass = function (ctx) {
};

// Exit a parse tree produced by Java9Parser#superclass.
Java9ParserListener.prototype.exitSuperclass = function (ctx) {
};


// Enter a parse tree produced by Java9Parser#superinterfaces.
Java9ParserListener.prototype.enterSuperinterfaces = function (ctx) {
};

// Exit a parse tree produced by Java9Parser#superinterfaces.
Java9ParserListener.prototype.exitSuperinterfaces = function (ctx) {
};


// Enter a parse tree produced by Java9Parser#interfaceTypeList.
Java9ParserListener.prototype.enterInterfaceTypeList = function (ctx) {
};

// Exit a parse tree produced by Java9Parser#interfaceTypeList.
Java9ParserListener.prototype.exitInterfaceTypeList = function (ctx) {
};


// Enter a parse tree produced by Java9Parser#classBody.
Java9ParserListener.prototype.enterClassBody = function (ctx) {
};

// Exit a parse tree produced by Java9Parser#classBody.
Java9ParserListener.prototype.exitClassBody = function (ctx) {
};


// Enter a parse tree produced by Java9Parser#classBodyDeclaration.
Java9ParserListener.prototype.enterClassBodyDeclaration = function (ctx) {
};

// Exit a parse tree produced by Java9Parser#classBodyDeclaration.
Java9ParserListener.prototype.exitClassBodyDeclaration = function (ctx) {
};


// Enter a parse tree produced by Java9Parser#classMemberDeclaration.
Java9ParserListener.prototype.enterClassMemberDeclaration = function (ctx) {
};

// Exit a parse tree produced by Java9Parser#classMemberDeclaration.
Java9ParserListener.prototype.exitClassMemberDeclaration = function (ctx) {
};


// Enter a parse tree produced by Java9Parser#fieldDeclaration.
Java9ParserListener.prototype.enterFieldDeclaration = function (ctx) {
};

// Exit a parse tree produced by Java9Parser#fieldDeclaration.
Java9ParserListener.prototype.exitFieldDeclaration = function (ctx) {
};


// Enter a parse tree produced by Java9Parser#fieldModifier.
Java9ParserListener.prototype.enterFieldModifier = function (ctx) {
};

// Exit a parse tree produced by Java9Parser#fieldModifier.
Java9ParserListener.prototype.exitFieldModifier = function (ctx) {
};


// Enter a parse tree produced by Java9Parser#variableDeclaratorList.
Java9ParserListener.prototype.enterVariableDeclaratorList = function (ctx) {
};

// Exit a parse tree produced by Java9Parser#variableDeclaratorList.
Java9ParserListener.prototype.exitVariableDeclaratorList = function (ctx) {
};


// Enter a parse tree produced by Java9Parser#variableDeclarator.
Java9ParserListener.prototype.enterVariableDeclarator = function (ctx) {
};

// Exit a parse tree produced by Java9Parser#variableDeclarator.
Java9ParserListener.prototype.exitVariableDeclarator = function (ctx) {
};


// Enter a parse tree produced by Java9Parser#variableDeclaratorId.
Java9ParserListener.prototype.enterVariableDeclaratorId = function (ctx) {
};

// Exit a parse tree produced by Java9Parser#variableDeclaratorId.
Java9ParserListener.prototype.exitVariableDeclaratorId = function (ctx) {
};


// Enter a parse tree produced by Java9Parser#variableInitializer.
Java9ParserListener.prototype.enterVariableInitializer = function (ctx) {
};

// Exit a parse tree produced by Java9Parser#variableInitializer.
Java9ParserListener.prototype.exitVariableInitializer = function (ctx) {
};


// Enter a parse tree produced by Java9Parser#unannType.
Java9ParserListener.prototype.enterUnannType = function (ctx) {
};

// Exit a parse tree produced by Java9Parser#unannType.
Java9ParserListener.prototype.exitUnannType = function (ctx) {
};


// Enter a parse tree produced by Java9Parser#unannPrimitiveType.
Java9ParserListener.prototype.enterUnannPrimitiveType = function (ctx) {
};

// Exit a parse tree produced by Java9Parser#unannPrimitiveType.
Java9ParserListener.prototype.exitUnannPrimitiveType = function (ctx) {
};


// Enter a parse tree produced by Java9Parser#unannReferenceType.
Java9ParserListener.prototype.enterUnannReferenceType = function (ctx) {
};

// Exit a parse tree produced by Java9Parser#unannReferenceType.
Java9ParserListener.prototype.exitUnannReferenceType = function (ctx) {
};


// Enter a parse tree produced by Java9Parser#unannClassOrInterfaceType.
Java9ParserListener.prototype.enterUnannClassOrInterfaceType = function (ctx) {
};

// Exit a parse tree produced by Java9Parser#unannClassOrInterfaceType.
Java9ParserListener.prototype.exitUnannClassOrInterfaceType = function (ctx) {
};


// Enter a parse tree produced by Java9Parser#unannClassType.
Java9ParserListener.prototype.enterUnannClassType = function (ctx) {
};

// Exit a parse tree produced by Java9Parser#unannClassType.
Java9ParserListener.prototype.exitUnannClassType = function (ctx) {
};


// Enter a parse tree produced by Java9Parser#unannClassType_lf_unannClassOrInterfaceType.
Java9ParserListener.prototype.enterUnannClassType_lf_unannClassOrInterfaceType = function (ctx) {
};

// Exit a parse tree produced by Java9Parser#unannClassType_lf_unannClassOrInterfaceType.
Java9ParserListener.prototype.exitUnannClassType_lf_unannClassOrInterfaceType = function (ctx) {
};


// Enter a parse tree produced by Java9Parser#unannClassType_lfno_unannClassOrInterfaceType.
Java9ParserListener.prototype.enterUnannClassType_lfno_unannClassOrInterfaceType = function (ctx) {
};

// Exit a parse tree produced by Java9Parser#unannClassType_lfno_unannClassOrInterfaceType.
Java9ParserListener.prototype.exitUnannClassType_lfno_unannClassOrInterfaceType = function (ctx) {
};


// Enter a parse tree produced by Java9Parser#unannInterfaceType.
Java9ParserListener.prototype.enterUnannInterfaceType = function (ctx) {
};

// Exit a parse tree produced by Java9Parser#unannInterfaceType.
Java9ParserListener.prototype.exitUnannInterfaceType = function (ctx) {
};


// Enter a parse tree produced by Java9Parser#unannInterfaceType_lf_unannClassOrInterfaceType.
Java9ParserListener.prototype.enterUnannInterfaceType_lf_unannClassOrInterfaceType = function (ctx) {
};

// Exit a parse tree produced by Java9Parser#unannInterfaceType_lf_unannClassOrInterfaceType.
Java9ParserListener.prototype.exitUnannInterfaceType_lf_unannClassOrInterfaceType = function (ctx) {
};


// Enter a parse tree produced by Java9Parser#unannInterfaceType_lfno_unannClassOrInterfaceType.
Java9ParserListener.prototype.enterUnannInterfaceType_lfno_unannClassOrInterfaceType = function (ctx) {
};

// Exit a parse tree produced by Java9Parser#unannInterfaceType_lfno_unannClassOrInterfaceType.
Java9ParserListener.prototype.exitUnannInterfaceType_lfno_unannClassOrInterfaceType = function (ctx) {
};


// Enter a parse tree produced by Java9Parser#unannTypeVariable.
Java9ParserListener.prototype.enterUnannTypeVariable = function (ctx) {
};

// Exit a parse tree produced by Java9Parser#unannTypeVariable.
Java9ParserListener.prototype.exitUnannTypeVariable = function (ctx) {
};


// Enter a parse tree produced by Java9Parser#unannArrayType.
Java9ParserListener.prototype.enterUnannArrayType = function (ctx) {
};

// Exit a parse tree produced by Java9Parser#unannArrayType.
Java9ParserListener.prototype.exitUnannArrayType = function (ctx) {
};


// Enter a parse tree produced by Java9Parser#methodDeclaration.
Java9ParserListener.prototype.enterMethodDeclaration = function (ctx) {
};

// Exit a parse tree produced by Java9Parser#methodDeclaration.
Java9ParserListener.prototype.exitMethodDeclaration = function (ctx) {
};


// Enter a parse tree produced by Java9Parser#methodModifier.
Java9ParserListener.prototype.enterMethodModifier = function (ctx) {
};

// Exit a parse tree produced by Java9Parser#methodModifier.
Java9ParserListener.prototype.exitMethodModifier = function (ctx) {
};


// Enter a parse tree produced by Java9Parser#methodHeader.
Java9ParserListener.prototype.enterMethodHeader = function (ctx) {
};

// Exit a parse tree produced by Java9Parser#methodHeader.
Java9ParserListener.prototype.exitMethodHeader = function (ctx) {
};


// Enter a parse tree produced by Java9Parser#result.
Java9ParserListener.prototype.enterResult = function (ctx) {
};

// Exit a parse tree produced by Java9Parser#result.
Java9ParserListener.prototype.exitResult = function (ctx) {
};


// Enter a parse tree produced by Java9Parser#methodDeclarator.
Java9ParserListener.prototype.enterMethodDeclarator = function (ctx) {
};

// Exit a parse tree produced by Java9Parser#methodDeclarator.
Java9ParserListener.prototype.exitMethodDeclarator = function (ctx) {
};


// Enter a parse tree produced by Java9Parser#formalParameterList.
Java9ParserListener.prototype.enterFormalParameterList = function (ctx) {
};

// Exit a parse tree produced by Java9Parser#formalParameterList.
Java9ParserListener.prototype.exitFormalParameterList = function (ctx) {
};


// Enter a parse tree produced by Java9Parser#formalParameters.
Java9ParserListener.prototype.enterFormalParameters = function (ctx) {
};

// Exit a parse tree produced by Java9Parser#formalParameters.
Java9ParserListener.prototype.exitFormalParameters = function (ctx) {
};


// Enter a parse tree produced by Java9Parser#formalParameter.
Java9ParserListener.prototype.enterFormalParameter = function (ctx) {
};

// Exit a parse tree produced by Java9Parser#formalParameter.
Java9ParserListener.prototype.exitFormalParameter = function (ctx) {
};


// Enter a parse tree produced by Java9Parser#variableModifier.
Java9ParserListener.prototype.enterVariableModifier = function (ctx) {
};

// Exit a parse tree produced by Java9Parser#variableModifier.
Java9ParserListener.prototype.exitVariableModifier = function (ctx) {
};


// Enter a parse tree produced by Java9Parser#lastFormalParameter.
Java9ParserListener.prototype.enterLastFormalParameter = function (ctx) {
};

// Exit a parse tree produced by Java9Parser#lastFormalParameter.
Java9ParserListener.prototype.exitLastFormalParameter = function (ctx) {
};


// Enter a parse tree produced by Java9Parser#receiverParameter.
Java9ParserListener.prototype.enterReceiverParameter = function (ctx) {
};

// Exit a parse tree produced by Java9Parser#receiverParameter.
Java9ParserListener.prototype.exitReceiverParameter = function (ctx) {
};


// Enter a parse tree produced by Java9Parser#throws_.
Java9ParserListener.prototype.enterThrows_ = function (ctx) {
};

// Exit a parse tree produced by Java9Parser#throws_.
Java9ParserListener.prototype.exitThrows_ = function (ctx) {
};


// Enter a parse tree produced by Java9Parser#exceptionTypeList.
Java9ParserListener.prototype.enterExceptionTypeList = function (ctx) {
};

// Exit a parse tree produced by Java9Parser#exceptionTypeList.
Java9ParserListener.prototype.exitExceptionTypeList = function (ctx) {
};


// Enter a parse tree produced by Java9Parser#exceptionType.
Java9ParserListener.prototype.enterExceptionType = function (ctx) {
};

// Exit a parse tree produced by Java9Parser#exceptionType.
Java9ParserListener.prototype.exitExceptionType = function (ctx) {
};


// Enter a parse tree produced by Java9Parser#methodBody.
Java9ParserListener.prototype.enterMethodBody = function (ctx) {
};

// Exit a parse tree produced by Java9Parser#methodBody.
Java9ParserListener.prototype.exitMethodBody = function (ctx) {
};


// Enter a parse tree produced by Java9Parser#instanceInitializer.
Java9ParserListener.prototype.enterInstanceInitializer = function (ctx) {
};

// Exit a parse tree produced by Java9Parser#instanceInitializer.
Java9ParserListener.prototype.exitInstanceInitializer = function (ctx) {
};


// Enter a parse tree produced by Java9Parser#staticInitializer.
Java9ParserListener.prototype.enterStaticInitializer = function (ctx) {
};

// Exit a parse tree produced by Java9Parser#staticInitializer.
Java9ParserListener.prototype.exitStaticInitializer = function (ctx) {
};


// Enter a parse tree produced by Java9Parser#constructorDeclaration.
Java9ParserListener.prototype.enterConstructorDeclaration = function (ctx) {
};

// Exit a parse tree produced by Java9Parser#constructorDeclaration.
Java9ParserListener.prototype.exitConstructorDeclaration = function (ctx) {
};


// Enter a parse tree produced by Java9Parser#constructorModifier.
Java9ParserListener.prototype.enterConstructorModifier = function (ctx) {
};

// Exit a parse tree produced by Java9Parser#constructorModifier.
Java9ParserListener.prototype.exitConstructorModifier = function (ctx) {
};


// Enter a parse tree produced by Java9Parser#constructorDeclarator.
Java9ParserListener.prototype.enterConstructorDeclarator = function (ctx) {
};

// Exit a parse tree produced by Java9Parser#constructorDeclarator.
Java9ParserListener.prototype.exitConstructorDeclarator = function (ctx) {
};


// Enter a parse tree produced by Java9Parser#simpleTypeName.
Java9ParserListener.prototype.enterSimpleTypeName = function (ctx) {
};

// Exit a parse tree produced by Java9Parser#simpleTypeName.
Java9ParserListener.prototype.exitSimpleTypeName = function (ctx) {
};


// Enter a parse tree produced by Java9Parser#constructorBody.
Java9ParserListener.prototype.enterConstructorBody = function (ctx) {
};

// Exit a parse tree produced by Java9Parser#constructorBody.
Java9ParserListener.prototype.exitConstructorBody = function (ctx) {
};


// Enter a parse tree produced by Java9Parser#explicitConstructorInvocation.
Java9ParserListener.prototype.enterExplicitConstructorInvocation = function (ctx) {
};

// Exit a parse tree produced by Java9Parser#explicitConstructorInvocation.
Java9ParserListener.prototype.exitExplicitConstructorInvocation = function (ctx) {
};


// Enter a parse tree produced by Java9Parser#enumDeclaration.
Java9ParserListener.prototype.enterEnumDeclaration = function (ctx) {
};

// Exit a parse tree produced by Java9Parser#enumDeclaration.
Java9ParserListener.prototype.exitEnumDeclaration = function (ctx) {
};


// Enter a parse tree produced by Java9Parser#enumBody.
Java9ParserListener.prototype.enterEnumBody = function (ctx) {
};

// Exit a parse tree produced by Java9Parser#enumBody.
Java9ParserListener.prototype.exitEnumBody = function (ctx) {
};


// Enter a parse tree produced by Java9Parser#enumConstantList.
Java9ParserListener.prototype.enterEnumConstantList = function (ctx) {
};

// Exit a parse tree produced by Java9Parser#enumConstantList.
Java9ParserListener.prototype.exitEnumConstantList = function (ctx) {
};


// Enter a parse tree produced by Java9Parser#enumConstant.
Java9ParserListener.prototype.enterEnumConstant = function (ctx) {
};

// Exit a parse tree produced by Java9Parser#enumConstant.
Java9ParserListener.prototype.exitEnumConstant = function (ctx) {
};


// Enter a parse tree produced by Java9Parser#enumConstantModifier.
Java9ParserListener.prototype.enterEnumConstantModifier = function (ctx) {
};

// Exit a parse tree produced by Java9Parser#enumConstantModifier.
Java9ParserListener.prototype.exitEnumConstantModifier = function (ctx) {
};


// Enter a parse tree produced by Java9Parser#enumBodyDeclarations.
Java9ParserListener.prototype.enterEnumBodyDeclarations = function (ctx) {
};

// Exit a parse tree produced by Java9Parser#enumBodyDeclarations.
Java9ParserListener.prototype.exitEnumBodyDeclarations = function (ctx) {
};


// Enter a parse tree produced by Java9Parser#interfaceDeclaration.
Java9ParserListener.prototype.enterInterfaceDeclaration = function (ctx) {
};

// Exit a parse tree produced by Java9Parser#interfaceDeclaration.
Java9ParserListener.prototype.exitInterfaceDeclaration = function (ctx) {
};


// Enter a parse tree produced by Java9Parser#normalInterfaceDeclaration.
Java9ParserListener.prototype.enterNormalInterfaceDeclaration = function (ctx) {
};

// Exit a parse tree produced by Java9Parser#normalInterfaceDeclaration.
Java9ParserListener.prototype.exitNormalInterfaceDeclaration = function (ctx) {
};


// Enter a parse tree produced by Java9Parser#interfaceModifier.
Java9ParserListener.prototype.enterInterfaceModifier = function (ctx) {
};

// Exit a parse tree produced by Java9Parser#interfaceModifier.
Java9ParserListener.prototype.exitInterfaceModifier = function (ctx) {
};


// Enter a parse tree produced by Java9Parser#extendsInterfaces.
Java9ParserListener.prototype.enterExtendsInterfaces = function (ctx) {
};

// Exit a parse tree produced by Java9Parser#extendsInterfaces.
Java9ParserListener.prototype.exitExtendsInterfaces = function (ctx) {
};


// Enter a parse tree produced by Java9Parser#interfaceBody.
Java9ParserListener.prototype.enterInterfaceBody = function (ctx) {
};

// Exit a parse tree produced by Java9Parser#interfaceBody.
Java9ParserListener.prototype.exitInterfaceBody = function (ctx) {
};


// Enter a parse tree produced by Java9Parser#interfaceMemberDeclaration.
Java9ParserListener.prototype.enterInterfaceMemberDeclaration = function (ctx) {
};

// Exit a parse tree produced by Java9Parser#interfaceMemberDeclaration.
Java9ParserListener.prototype.exitInterfaceMemberDeclaration = function (ctx) {
};


// Enter a parse tree produced by Java9Parser#constantDeclaration.
Java9ParserListener.prototype.enterConstantDeclaration = function (ctx) {
};

// Exit a parse tree produced by Java9Parser#constantDeclaration.
Java9ParserListener.prototype.exitConstantDeclaration = function (ctx) {
};


// Enter a parse tree produced by Java9Parser#constantModifier.
Java9ParserListener.prototype.enterConstantModifier = function (ctx) {
};

// Exit a parse tree produced by Java9Parser#constantModifier.
Java9ParserListener.prototype.exitConstantModifier = function (ctx) {
};


// Enter a parse tree produced by Java9Parser#interfaceMethodDeclaration.
Java9ParserListener.prototype.enterInterfaceMethodDeclaration = function (ctx) {
};

// Exit a parse tree produced by Java9Parser#interfaceMethodDeclaration.
Java9ParserListener.prototype.exitInterfaceMethodDeclaration = function (ctx) {
};


// Enter a parse tree produced by Java9Parser#interfaceMethodModifier.
Java9ParserListener.prototype.enterInterfaceMethodModifier = function (ctx) {
};

// Exit a parse tree produced by Java9Parser#interfaceMethodModifier.
Java9ParserListener.prototype.exitInterfaceMethodModifier = function (ctx) {
};


// Enter a parse tree produced by Java9Parser#annotationTypeDeclaration.
Java9ParserListener.prototype.enterAnnotationTypeDeclaration = function (ctx) {
};

// Exit a parse tree produced by Java9Parser#annotationTypeDeclaration.
Java9ParserListener.prototype.exitAnnotationTypeDeclaration = function (ctx) {
};


// Enter a parse tree produced by Java9Parser#annotationTypeBody.
Java9ParserListener.prototype.enterAnnotationTypeBody = function (ctx) {
};

// Exit a parse tree produced by Java9Parser#annotationTypeBody.
Java9ParserListener.prototype.exitAnnotationTypeBody = function (ctx) {
};


// Enter a parse tree produced by Java9Parser#annotationTypeMemberDeclaration.
Java9ParserListener.prototype.enterAnnotationTypeMemberDeclaration = function (ctx) {
};

// Exit a parse tree produced by Java9Parser#annotationTypeMemberDeclaration.
Java9ParserListener.prototype.exitAnnotationTypeMemberDeclaration = function (ctx) {
};


// Enter a parse tree produced by Java9Parser#annotationTypeElementDeclaration.
Java9ParserListener.prototype.enterAnnotationTypeElementDeclaration = function (ctx) {
};

// Exit a parse tree produced by Java9Parser#annotationTypeElementDeclaration.
Java9ParserListener.prototype.exitAnnotationTypeElementDeclaration = function (ctx) {
};


// Enter a parse tree produced by Java9Parser#annotationTypeElementModifier.
Java9ParserListener.prototype.enterAnnotationTypeElementModifier = function (ctx) {
};

// Exit a parse tree produced by Java9Parser#annotationTypeElementModifier.
Java9ParserListener.prototype.exitAnnotationTypeElementModifier = function (ctx) {
};


// Enter a parse tree produced by Java9Parser#defaultValue.
Java9ParserListener.prototype.enterDefaultValue = function (ctx) {
};

// Exit a parse tree produced by Java9Parser#defaultValue.
Java9ParserListener.prototype.exitDefaultValue = function (ctx) {
};


// Enter a parse tree produced by Java9Parser#annotation.
Java9ParserListener.prototype.enterAnnotation = function (ctx) {
};

// Exit a parse tree produced by Java9Parser#annotation.
Java9ParserListener.prototype.exitAnnotation = function (ctx) {
};


// Enter a parse tree produced by Java9Parser#normalAnnotation.
Java9ParserListener.prototype.enterNormalAnnotation = function (ctx) {
};

// Exit a parse tree produced by Java9Parser#normalAnnotation.
Java9ParserListener.prototype.exitNormalAnnotation = function (ctx) {
};


// Enter a parse tree produced by Java9Parser#elementValuePairList.
Java9ParserListener.prototype.enterElementValuePairList = function (ctx) {
};

// Exit a parse tree produced by Java9Parser#elementValuePairList.
Java9ParserListener.prototype.exitElementValuePairList = function (ctx) {
};


// Enter a parse tree produced by Java9Parser#elementValuePair.
Java9ParserListener.prototype.enterElementValuePair = function (ctx) {
};

// Exit a parse tree produced by Java9Parser#elementValuePair.
Java9ParserListener.prototype.exitElementValuePair = function (ctx) {
};


// Enter a parse tree produced by Java9Parser#elementValue.
Java9ParserListener.prototype.enterElementValue = function (ctx) {
};

// Exit a parse tree produced by Java9Parser#elementValue.
Java9ParserListener.prototype.exitElementValue = function (ctx) {
};


// Enter a parse tree produced by Java9Parser#elementValueArrayInitializer.
Java9ParserListener.prototype.enterElementValueArrayInitializer = function (ctx) {
};

// Exit a parse tree produced by Java9Parser#elementValueArrayInitializer.
Java9ParserListener.prototype.exitElementValueArrayInitializer = function (ctx) {
};


// Enter a parse tree produced by Java9Parser#elementValueList.
Java9ParserListener.prototype.enterElementValueList = function (ctx) {
};

// Exit a parse tree produced by Java9Parser#elementValueList.
Java9ParserListener.prototype.exitElementValueList = function (ctx) {
};


// Enter a parse tree produced by Java9Parser#markerAnnotation.
Java9ParserListener.prototype.enterMarkerAnnotation = function (ctx) {
};

// Exit a parse tree produced by Java9Parser#markerAnnotation.
Java9ParserListener.prototype.exitMarkerAnnotation = function (ctx) {
};


// Enter a parse tree produced by Java9Parser#singleElementAnnotation.
Java9ParserListener.prototype.enterSingleElementAnnotation = function (ctx) {
};

// Exit a parse tree produced by Java9Parser#singleElementAnnotation.
Java9ParserListener.prototype.exitSingleElementAnnotation = function (ctx) {
};


// Enter a parse tree produced by Java9Parser#arrayInitializer.
Java9ParserListener.prototype.enterArrayInitializer = function (ctx) {
};

// Exit a parse tree produced by Java9Parser#arrayInitializer.
Java9ParserListener.prototype.exitArrayInitializer = function (ctx) {
};


// Enter a parse tree produced by Java9Parser#variableInitializerList.
Java9ParserListener.prototype.enterVariableInitializerList = function (ctx) {
};

// Exit a parse tree produced by Java9Parser#variableInitializerList.
Java9ParserListener.prototype.exitVariableInitializerList = function (ctx) {
};


// Enter a parse tree produced by Java9Parser#block.
Java9ParserListener.prototype.enterBlock = function (ctx) {
};

// Exit a parse tree produced by Java9Parser#block.
Java9ParserListener.prototype.exitBlock = function (ctx) {
};


// Enter a parse tree produced by Java9Parser#blockStatements.
Java9ParserListener.prototype.enterBlockStatements = function (ctx) {
};

// Exit a parse tree produced by Java9Parser#blockStatements.
Java9ParserListener.prototype.exitBlockStatements = function (ctx) {
};


// Enter a parse tree produced by Java9Parser#blockStatement.
Java9ParserListener.prototype.enterBlockStatement = function (ctx) {
};

// Exit a parse tree produced by Java9Parser#blockStatement.
Java9ParserListener.prototype.exitBlockStatement = function (ctx) {
};


// Enter a parse tree produced by Java9Parser#localVariableDeclarationStatement.
Java9ParserListener.prototype.enterLocalVariableDeclarationStatement = function (ctx) {
};

// Exit a parse tree produced by Java9Parser#localVariableDeclarationStatement.
Java9ParserListener.prototype.exitLocalVariableDeclarationStatement = function (ctx) {
};


// Enter a parse tree produced by Java9Parser#localVariableDeclaration.
Java9ParserListener.prototype.enterLocalVariableDeclaration = function (ctx) {
};

// Exit a parse tree produced by Java9Parser#localVariableDeclaration.
Java9ParserListener.prototype.exitLocalVariableDeclaration = function (ctx) {
};


// Enter a parse tree produced by Java9Parser#statement.
Java9ParserListener.prototype.enterStatement = function (ctx) {
};

// Exit a parse tree produced by Java9Parser#statement.
Java9ParserListener.prototype.exitStatement = function (ctx) {
};


// Enter a parse tree produced by Java9Parser#statementNoShortIf.
Java9ParserListener.prototype.enterStatementNoShortIf = function (ctx) {
};

// Exit a parse tree produced by Java9Parser#statementNoShortIf.
Java9ParserListener.prototype.exitStatementNoShortIf = function (ctx) {
};


// Enter a parse tree produced by Java9Parser#statementWithoutTrailingSubstatement.
Java9ParserListener.prototype.enterStatementWithoutTrailingSubstatement = function (ctx) {
};

// Exit a parse tree produced by Java9Parser#statementWithoutTrailingSubstatement.
Java9ParserListener.prototype.exitStatementWithoutTrailingSubstatement = function (ctx) {
};


// Enter a parse tree produced by Java9Parser#emptyStatement.
Java9ParserListener.prototype.enterEmptyStatement = function (ctx) {
};

// Exit a parse tree produced by Java9Parser#emptyStatement.
Java9ParserListener.prototype.exitEmptyStatement = function (ctx) {
};


// Enter a parse tree produced by Java9Parser#labeledStatement.
Java9ParserListener.prototype.enterLabeledStatement = function (ctx) {
};

// Exit a parse tree produced by Java9Parser#labeledStatement.
Java9ParserListener.prototype.exitLabeledStatement = function (ctx) {
};


// Enter a parse tree produced by Java9Parser#labeledStatementNoShortIf.
Java9ParserListener.prototype.enterLabeledStatementNoShortIf = function (ctx) {
};

// Exit a parse tree produced by Java9Parser#labeledStatementNoShortIf.
Java9ParserListener.prototype.exitLabeledStatementNoShortIf = function (ctx) {
};


// Enter a parse tree produced by Java9Parser#expressionStatement.
Java9ParserListener.prototype.enterExpressionStatement = function (ctx) {
};

// Exit a parse tree produced by Java9Parser#expressionStatement.
Java9ParserListener.prototype.exitExpressionStatement = function (ctx) {
};


// Enter a parse tree produced by Java9Parser#statementExpression.
Java9ParserListener.prototype.enterStatementExpression = function (ctx) {
};

// Exit a parse tree produced by Java9Parser#statementExpression.
Java9ParserListener.prototype.exitStatementExpression = function (ctx) {
};


// Enter a parse tree produced by Java9Parser#ifThenStatement.
Java9ParserListener.prototype.enterIfThenStatement = function (ctx) {
};

// Exit a parse tree produced by Java9Parser#ifThenStatement.
Java9ParserListener.prototype.exitIfThenStatement = function (ctx) {
};


// Enter a parse tree produced by Java9Parser#ifThenElseStatement.
Java9ParserListener.prototype.enterIfThenElseStatement = function (ctx) {
};

// Exit a parse tree produced by Java9Parser#ifThenElseStatement.
Java9ParserListener.prototype.exitIfThenElseStatement = function (ctx) {
};


// Enter a parse tree produced by Java9Parser#ifThenElseStatementNoShortIf.
Java9ParserListener.prototype.enterIfThenElseStatementNoShortIf = function (ctx) {
};

// Exit a parse tree produced by Java9Parser#ifThenElseStatementNoShortIf.
Java9ParserListener.prototype.exitIfThenElseStatementNoShortIf = function (ctx) {
};


// Enter a parse tree produced by Java9Parser#assertStatement.
Java9ParserListener.prototype.enterAssertStatement = function (ctx) {
};

// Exit a parse tree produced by Java9Parser#assertStatement.
Java9ParserListener.prototype.exitAssertStatement = function (ctx) {
};


// Enter a parse tree produced by Java9Parser#switchStatement.
Java9ParserListener.prototype.enterSwitchStatement = function (ctx) {
};

// Exit a parse tree produced by Java9Parser#switchStatement.
Java9ParserListener.prototype.exitSwitchStatement = function (ctx) {
};


// Enter a parse tree produced by Java9Parser#switchBlock.
Java9ParserListener.prototype.enterSwitchBlock = function (ctx) {
};

// Exit a parse tree produced by Java9Parser#switchBlock.
Java9ParserListener.prototype.exitSwitchBlock = function (ctx) {
};


// Enter a parse tree produced by Java9Parser#switchBlockStatementGroup.
Java9ParserListener.prototype.enterSwitchBlockStatementGroup = function (ctx) {
};

// Exit a parse tree produced by Java9Parser#switchBlockStatementGroup.
Java9ParserListener.prototype.exitSwitchBlockStatementGroup = function (ctx) {
};


// Enter a parse tree produced by Java9Parser#switchLabels.
Java9ParserListener.prototype.enterSwitchLabels = function (ctx) {
};

// Exit a parse tree produced by Java9Parser#switchLabels.
Java9ParserListener.prototype.exitSwitchLabels = function (ctx) {
};


// Enter a parse tree produced by Java9Parser#switchLabel.
Java9ParserListener.prototype.enterSwitchLabel = function (ctx) {
};

// Exit a parse tree produced by Java9Parser#switchLabel.
Java9ParserListener.prototype.exitSwitchLabel = function (ctx) {
};


// Enter a parse tree produced by Java9Parser#enumConstantName.
Java9ParserListener.prototype.enterEnumConstantName = function (ctx) {
};

// Exit a parse tree produced by Java9Parser#enumConstantName.
Java9ParserListener.prototype.exitEnumConstantName = function (ctx) {
};


// Enter a parse tree produced by Java9Parser#whileStatement.
Java9ParserListener.prototype.enterWhileStatement = function (ctx) {
};

// Exit a parse tree produced by Java9Parser#whileStatement.
Java9ParserListener.prototype.exitWhileStatement = function (ctx) {
};


// Enter a parse tree produced by Java9Parser#whileStatementNoShortIf.
Java9ParserListener.prototype.enterWhileStatementNoShortIf = function (ctx) {
};

// Exit a parse tree produced by Java9Parser#whileStatementNoShortIf.
Java9ParserListener.prototype.exitWhileStatementNoShortIf = function (ctx) {
};


// Enter a parse tree produced by Java9Parser#doStatement.
Java9ParserListener.prototype.enterDoStatement = function (ctx) {
};

// Exit a parse tree produced by Java9Parser#doStatement.
Java9ParserListener.prototype.exitDoStatement = function (ctx) {
};


// Enter a parse tree produced by Java9Parser#forStatement.
Java9ParserListener.prototype.enterForStatement = function (ctx) {
};

// Exit a parse tree produced by Java9Parser#forStatement.
Java9ParserListener.prototype.exitForStatement = function (ctx) {
};


// Enter a parse tree produced by Java9Parser#forStatementNoShortIf.
Java9ParserListener.prototype.enterForStatementNoShortIf = function (ctx) {
};

// Exit a parse tree produced by Java9Parser#forStatementNoShortIf.
Java9ParserListener.prototype.exitForStatementNoShortIf = function (ctx) {
};


// Enter a parse tree produced by Java9Parser#basicForStatement.
Java9ParserListener.prototype.enterBasicForStatement = function (ctx) {
};

// Exit a parse tree produced by Java9Parser#basicForStatement.
Java9ParserListener.prototype.exitBasicForStatement = function (ctx) {
};


// Enter a parse tree produced by Java9Parser#basicForStatementNoShortIf.
Java9ParserListener.prototype.enterBasicForStatementNoShortIf = function (ctx) {
};

// Exit a parse tree produced by Java9Parser#basicForStatementNoShortIf.
Java9ParserListener.prototype.exitBasicForStatementNoShortIf = function (ctx) {
};


// Enter a parse tree produced by Java9Parser#forInit.
Java9ParserListener.prototype.enterForInit = function (ctx) {
};

// Exit a parse tree produced by Java9Parser#forInit.
Java9ParserListener.prototype.exitForInit = function (ctx) {
};


// Enter a parse tree produced by Java9Parser#forUpdate.
Java9ParserListener.prototype.enterForUpdate = function (ctx) {
};

// Exit a parse tree produced by Java9Parser#forUpdate.
Java9ParserListener.prototype.exitForUpdate = function (ctx) {
};


// Enter a parse tree produced by Java9Parser#statementExpressionList.
Java9ParserListener.prototype.enterStatementExpressionList = function (ctx) {
};

// Exit a parse tree produced by Java9Parser#statementExpressionList.
Java9ParserListener.prototype.exitStatementExpressionList = function (ctx) {
};


// Enter a parse tree produced by Java9Parser#enhancedForStatement.
Java9ParserListener.prototype.enterEnhancedForStatement = function (ctx) {
};

// Exit a parse tree produced by Java9Parser#enhancedForStatement.
Java9ParserListener.prototype.exitEnhancedForStatement = function (ctx) {
};


// Enter a parse tree produced by Java9Parser#enhancedForStatementNoShortIf.
Java9ParserListener.prototype.enterEnhancedForStatementNoShortIf = function (ctx) {
};

// Exit a parse tree produced by Java9Parser#enhancedForStatementNoShortIf.
Java9ParserListener.prototype.exitEnhancedForStatementNoShortIf = function (ctx) {
};


// Enter a parse tree produced by Java9Parser#breakStatement.
Java9ParserListener.prototype.enterBreakStatement = function (ctx) {
};

// Exit a parse tree produced by Java9Parser#breakStatement.
Java9ParserListener.prototype.exitBreakStatement = function (ctx) {
};


// Enter a parse tree produced by Java9Parser#continueStatement.
Java9ParserListener.prototype.enterContinueStatement = function (ctx) {
};

// Exit a parse tree produced by Java9Parser#continueStatement.
Java9ParserListener.prototype.exitContinueStatement = function (ctx) {
};


// Enter a parse tree produced by Java9Parser#returnStatement.
Java9ParserListener.prototype.enterReturnStatement = function (ctx) {
};

// Exit a parse tree produced by Java9Parser#returnStatement.
Java9ParserListener.prototype.exitReturnStatement = function (ctx) {
};


// Enter a parse tree produced by Java9Parser#throwStatement.
Java9ParserListener.prototype.enterThrowStatement = function (ctx) {
};

// Exit a parse tree produced by Java9Parser#throwStatement.
Java9ParserListener.prototype.exitThrowStatement = function (ctx) {
};


// Enter a parse tree produced by Java9Parser#synchronizedStatement.
Java9ParserListener.prototype.enterSynchronizedStatement = function (ctx) {
};

// Exit a parse tree produced by Java9Parser#synchronizedStatement.
Java9ParserListener.prototype.exitSynchronizedStatement = function (ctx) {
};


// Enter a parse tree produced by Java9Parser#tryStatement.
Java9ParserListener.prototype.enterTryStatement = function (ctx) {
};

// Exit a parse tree produced by Java9Parser#tryStatement.
Java9ParserListener.prototype.exitTryStatement = function (ctx) {
};


// Enter a parse tree produced by Java9Parser#catches.
Java9ParserListener.prototype.enterCatches = function (ctx) {
};

// Exit a parse tree produced by Java9Parser#catches.
Java9ParserListener.prototype.exitCatches = function (ctx) {
};


// Enter a parse tree produced by Java9Parser#catchClause.
Java9ParserListener.prototype.enterCatchClause = function (ctx) {
};

// Exit a parse tree produced by Java9Parser#catchClause.
Java9ParserListener.prototype.exitCatchClause = function (ctx) {
};


// Enter a parse tree produced by Java9Parser#catchFormalParameter.
Java9ParserListener.prototype.enterCatchFormalParameter = function (ctx) {
};

// Exit a parse tree produced by Java9Parser#catchFormalParameter.
Java9ParserListener.prototype.exitCatchFormalParameter = function (ctx) {
};


// Enter a parse tree produced by Java9Parser#catchType.
Java9ParserListener.prototype.enterCatchType = function (ctx) {
};

// Exit a parse tree produced by Java9Parser#catchType.
Java9ParserListener.prototype.exitCatchType = function (ctx) {
};


// Enter a parse tree produced by Java9Parser#finally_.
Java9ParserListener.prototype.enterFinally_ = function (ctx) {
};

// Exit a parse tree produced by Java9Parser#finally_.
Java9ParserListener.prototype.exitFinally_ = function (ctx) {
};


// Enter a parse tree produced by Java9Parser#tryWithResourcesStatement.
Java9ParserListener.prototype.enterTryWithResourcesStatement = function (ctx) {
};

// Exit a parse tree produced by Java9Parser#tryWithResourcesStatement.
Java9ParserListener.prototype.exitTryWithResourcesStatement = function (ctx) {
};


// Enter a parse tree produced by Java9Parser#resourceSpecification.
Java9ParserListener.prototype.enterResourceSpecification = function (ctx) {
};

// Exit a parse tree produced by Java9Parser#resourceSpecification.
Java9ParserListener.prototype.exitResourceSpecification = function (ctx) {
};


// Enter a parse tree produced by Java9Parser#resourceList.
Java9ParserListener.prototype.enterResourceList = function (ctx) {
};

// Exit a parse tree produced by Java9Parser#resourceList.
Java9ParserListener.prototype.exitResourceList = function (ctx) {
};


// Enter a parse tree produced by Java9Parser#resource.
Java9ParserListener.prototype.enterResource = function (ctx) {
};

// Exit a parse tree produced by Java9Parser#resource.
Java9ParserListener.prototype.exitResource = function (ctx) {
};


// Enter a parse tree produced by Java9Parser#variableAccess.
Java9ParserListener.prototype.enterVariableAccess = function (ctx) {
};

// Exit a parse tree produced by Java9Parser#variableAccess.
Java9ParserListener.prototype.exitVariableAccess = function (ctx) {
};


// Enter a parse tree produced by Java9Parser#primary.
Java9ParserListener.prototype.enterPrimary = function (ctx) {
};

// Exit a parse tree produced by Java9Parser#primary.
Java9ParserListener.prototype.exitPrimary = function (ctx) {
};


// Enter a parse tree produced by Java9Parser#primaryNoNewArray.
Java9ParserListener.prototype.enterPrimaryNoNewArray = function (ctx) {
};

// Exit a parse tree produced by Java9Parser#primaryNoNewArray.
Java9ParserListener.prototype.exitPrimaryNoNewArray = function (ctx) {
};


// Enter a parse tree produced by Java9Parser#primaryNoNewArray_lf_arrayAccess.
Java9ParserListener.prototype.enterPrimaryNoNewArray_lf_arrayAccess = function (ctx) {
};

// Exit a parse tree produced by Java9Parser#primaryNoNewArray_lf_arrayAccess.
Java9ParserListener.prototype.exitPrimaryNoNewArray_lf_arrayAccess = function (ctx) {
};


// Enter a parse tree produced by Java9Parser#primaryNoNewArray_lfno_arrayAccess.
Java9ParserListener.prototype.enterPrimaryNoNewArray_lfno_arrayAccess = function (ctx) {
};

// Exit a parse tree produced by Java9Parser#primaryNoNewArray_lfno_arrayAccess.
Java9ParserListener.prototype.exitPrimaryNoNewArray_lfno_arrayAccess = function (ctx) {
};


// Enter a parse tree produced by Java9Parser#primaryNoNewArray_lf_primary.
Java9ParserListener.prototype.enterPrimaryNoNewArray_lf_primary = function (ctx) {
};

// Exit a parse tree produced by Java9Parser#primaryNoNewArray_lf_primary.
Java9ParserListener.prototype.exitPrimaryNoNewArray_lf_primary = function (ctx) {
};


// Enter a parse tree produced by Java9Parser#primaryNoNewArray_lf_primary_lf_arrayAccess_lf_primary.
Java9ParserListener.prototype.enterPrimaryNoNewArray_lf_primary_lf_arrayAccess_lf_primary = function (ctx) {
};

// Exit a parse tree produced by Java9Parser#primaryNoNewArray_lf_primary_lf_arrayAccess_lf_primary.
Java9ParserListener.prototype.exitPrimaryNoNewArray_lf_primary_lf_arrayAccess_lf_primary = function (ctx) {
};


// Enter a parse tree produced by Java9Parser#primaryNoNewArray_lf_primary_lfno_arrayAccess_lf_primary.
Java9ParserListener.prototype.enterPrimaryNoNewArray_lf_primary_lfno_arrayAccess_lf_primary = function (ctx) {
};

// Exit a parse tree produced by Java9Parser#primaryNoNewArray_lf_primary_lfno_arrayAccess_lf_primary.
Java9ParserListener.prototype.exitPrimaryNoNewArray_lf_primary_lfno_arrayAccess_lf_primary = function (ctx) {
};


// Enter a parse tree produced by Java9Parser#primaryNoNewArray_lfno_primary.
Java9ParserListener.prototype.enterPrimaryNoNewArray_lfno_primary = function (ctx) {
};

// Exit a parse tree produced by Java9Parser#primaryNoNewArray_lfno_primary.
Java9ParserListener.prototype.exitPrimaryNoNewArray_lfno_primary = function (ctx) {
};


// Enter a parse tree produced by Java9Parser#primaryNoNewArray_lfno_primary_lf_arrayAccess_lfno_primary.
Java9ParserListener.prototype.enterPrimaryNoNewArray_lfno_primary_lf_arrayAccess_lfno_primary = function (ctx) {
};

// Exit a parse tree produced by Java9Parser#primaryNoNewArray_lfno_primary_lf_arrayAccess_lfno_primary.
Java9ParserListener.prototype.exitPrimaryNoNewArray_lfno_primary_lf_arrayAccess_lfno_primary = function (ctx) {
};


// Enter a parse tree produced by Java9Parser#primaryNoNewArray_lfno_primary_lfno_arrayAccess_lfno_primary.
Java9ParserListener.prototype.enterPrimaryNoNewArray_lfno_primary_lfno_arrayAccess_lfno_primary = function (ctx) {
};

// Exit a parse tree produced by Java9Parser#primaryNoNewArray_lfno_primary_lfno_arrayAccess_lfno_primary.
Java9ParserListener.prototype.exitPrimaryNoNewArray_lfno_primary_lfno_arrayAccess_lfno_primary = function (ctx) {
};


// Enter a parse tree produced by Java9Parser#classLiteral.
Java9ParserListener.prototype.enterClassLiteral = function (ctx) {
};

// Exit a parse tree produced by Java9Parser#classLiteral.
Java9ParserListener.prototype.exitClassLiteral = function (ctx) {
};


// Enter a parse tree produced by Java9Parser#classInstanceCreationExpression.
Java9ParserListener.prototype.enterClassInstanceCreationExpression = function (ctx) {
};

// Exit a parse tree produced by Java9Parser#classInstanceCreationExpression.
Java9ParserListener.prototype.exitClassInstanceCreationExpression = function (ctx) {
};


// Enter a parse tree produced by Java9Parser#classInstanceCreationExpression_lf_primary.
Java9ParserListener.prototype.enterClassInstanceCreationExpression_lf_primary = function (ctx) {
};

// Exit a parse tree produced by Java9Parser#classInstanceCreationExpression_lf_primary.
Java9ParserListener.prototype.exitClassInstanceCreationExpression_lf_primary = function (ctx) {
};


// Enter a parse tree produced by Java9Parser#classInstanceCreationExpression_lfno_primary.
Java9ParserListener.prototype.enterClassInstanceCreationExpression_lfno_primary = function (ctx) {
};

// Exit a parse tree produced by Java9Parser#classInstanceCreationExpression_lfno_primary.
Java9ParserListener.prototype.exitClassInstanceCreationExpression_lfno_primary = function (ctx) {
};


// Enter a parse tree produced by Java9Parser#typeArgumentsOrDiamond.
Java9ParserListener.prototype.enterTypeArgumentsOrDiamond = function (ctx) {
};

// Exit a parse tree produced by Java9Parser#typeArgumentsOrDiamond.
Java9ParserListener.prototype.exitTypeArgumentsOrDiamond = function (ctx) {
};


// Enter a parse tree produced by Java9Parser#fieldAccess.
Java9ParserListener.prototype.enterFieldAccess = function (ctx) {
};

// Exit a parse tree produced by Java9Parser#fieldAccess.
Java9ParserListener.prototype.exitFieldAccess = function (ctx) {
};


// Enter a parse tree produced by Java9Parser#fieldAccess_lf_primary.
Java9ParserListener.prototype.enterFieldAccess_lf_primary = function (ctx) {
};

// Exit a parse tree produced by Java9Parser#fieldAccess_lf_primary.
Java9ParserListener.prototype.exitFieldAccess_lf_primary = function (ctx) {
};


// Enter a parse tree produced by Java9Parser#fieldAccess_lfno_primary.
Java9ParserListener.prototype.enterFieldAccess_lfno_primary = function (ctx) {
};

// Exit a parse tree produced by Java9Parser#fieldAccess_lfno_primary.
Java9ParserListener.prototype.exitFieldAccess_lfno_primary = function (ctx) {
};


// Enter a parse tree produced by Java9Parser#arrayAccess.
Java9ParserListener.prototype.enterArrayAccess = function (ctx) {
};

// Exit a parse tree produced by Java9Parser#arrayAccess.
Java9ParserListener.prototype.exitArrayAccess = function (ctx) {
};


// Enter a parse tree produced by Java9Parser#arrayAccess_lf_primary.
Java9ParserListener.prototype.enterArrayAccess_lf_primary = function (ctx) {
};

// Exit a parse tree produced by Java9Parser#arrayAccess_lf_primary.
Java9ParserListener.prototype.exitArrayAccess_lf_primary = function (ctx) {
};


// Enter a parse tree produced by Java9Parser#arrayAccess_lfno_primary.
Java9ParserListener.prototype.enterArrayAccess_lfno_primary = function (ctx) {
};

// Exit a parse tree produced by Java9Parser#arrayAccess_lfno_primary.
Java9ParserListener.prototype.exitArrayAccess_lfno_primary = function (ctx) {
};


// Enter a parse tree produced by Java9Parser#methodInvocation.
Java9ParserListener.prototype.enterMethodInvocation = function (ctx) {
};

// Exit a parse tree produced by Java9Parser#methodInvocation.
Java9ParserListener.prototype.exitMethodInvocation = function (ctx) {
};


// Enter a parse tree produced by Java9Parser#methodInvocation_lf_primary.
Java9ParserListener.prototype.enterMethodInvocation_lf_primary = function (ctx) {
};

// Exit a parse tree produced by Java9Parser#methodInvocation_lf_primary.
Java9ParserListener.prototype.exitMethodInvocation_lf_primary = function (ctx) {
};


// Enter a parse tree produced by Java9Parser#methodInvocation_lfno_primary.
Java9ParserListener.prototype.enterMethodInvocation_lfno_primary = function (ctx) {
};

// Exit a parse tree produced by Java9Parser#methodInvocation_lfno_primary.
Java9ParserListener.prototype.exitMethodInvocation_lfno_primary = function (ctx) {
};


// Enter a parse tree produced by Java9Parser#argumentList.
Java9ParserListener.prototype.enterArgumentList = function (ctx) {
};

// Exit a parse tree produced by Java9Parser#argumentList.
Java9ParserListener.prototype.exitArgumentList = function (ctx) {
};


// Enter a parse tree produced by Java9Parser#methodReference.
Java9ParserListener.prototype.enterMethodReference = function (ctx) {
};

// Exit a parse tree produced by Java9Parser#methodReference.
Java9ParserListener.prototype.exitMethodReference = function (ctx) {
};


// Enter a parse tree produced by Java9Parser#methodReference_lf_primary.
Java9ParserListener.prototype.enterMethodReference_lf_primary = function (ctx) {
};

// Exit a parse tree produced by Java9Parser#methodReference_lf_primary.
Java9ParserListener.prototype.exitMethodReference_lf_primary = function (ctx) {
};


// Enter a parse tree produced by Java9Parser#methodReference_lfno_primary.
Java9ParserListener.prototype.enterMethodReference_lfno_primary = function (ctx) {
};

// Exit a parse tree produced by Java9Parser#methodReference_lfno_primary.
Java9ParserListener.prototype.exitMethodReference_lfno_primary = function (ctx) {
};


// Enter a parse tree produced by Java9Parser#arrayCreationExpression.
Java9ParserListener.prototype.enterArrayCreationExpression = function (ctx) {
};

// Exit a parse tree produced by Java9Parser#arrayCreationExpression.
Java9ParserListener.prototype.exitArrayCreationExpression = function (ctx) {
};


// Enter a parse tree produced by Java9Parser#dimExprs.
Java9ParserListener.prototype.enterDimExprs = function (ctx) {
};

// Exit a parse tree produced by Java9Parser#dimExprs.
Java9ParserListener.prototype.exitDimExprs = function (ctx) {
};


// Enter a parse tree produced by Java9Parser#dimExpr.
Java9ParserListener.prototype.enterDimExpr = function (ctx) {
};

// Exit a parse tree produced by Java9Parser#dimExpr.
Java9ParserListener.prototype.exitDimExpr = function (ctx) {
};


// Enter a parse tree produced by Java9Parser#constantExpression.
Java9ParserListener.prototype.enterConstantExpression = function (ctx) {
};

// Exit a parse tree produced by Java9Parser#constantExpression.
Java9ParserListener.prototype.exitConstantExpression = function (ctx) {
};


// Enter a parse tree produced by Java9Parser#expression.
Java9ParserListener.prototype.enterExpression = function (ctx) {
};

// Exit a parse tree produced by Java9Parser#expression.
Java9ParserListener.prototype.exitExpression = function (ctx) {
};


// Enter a parse tree produced by Java9Parser#lambdaExpression.
Java9ParserListener.prototype.enterLambdaExpression = function (ctx) {
};

// Exit a parse tree produced by Java9Parser#lambdaExpression.
Java9ParserListener.prototype.exitLambdaExpression = function (ctx) {
};


// Enter a parse tree produced by Java9Parser#lambdaParameters.
Java9ParserListener.prototype.enterLambdaParameters = function (ctx) {
};

// Exit a parse tree produced by Java9Parser#lambdaParameters.
Java9ParserListener.prototype.exitLambdaParameters = function (ctx) {
};


// Enter a parse tree produced by Java9Parser#inferredFormalParameterList.
Java9ParserListener.prototype.enterInferredFormalParameterList = function (ctx) {
};

// Exit a parse tree produced by Java9Parser#inferredFormalParameterList.
Java9ParserListener.prototype.exitInferredFormalParameterList = function (ctx) {
};


// Enter a parse tree produced by Java9Parser#lambdaBody.
Java9ParserListener.prototype.enterLambdaBody = function (ctx) {
};

// Exit a parse tree produced by Java9Parser#lambdaBody.
Java9ParserListener.prototype.exitLambdaBody = function (ctx) {
};


// Enter a parse tree produced by Java9Parser#assignmentExpression.
Java9ParserListener.prototype.enterAssignmentExpression = function (ctx) {
};

// Exit a parse tree produced by Java9Parser#assignmentExpression.
Java9ParserListener.prototype.exitAssignmentExpression = function (ctx) {
};


// Enter a parse tree produced by Java9Parser#assignment.
Java9ParserListener.prototype.enterAssignment = function (ctx) {
};

// Exit a parse tree produced by Java9Parser#assignment.
Java9ParserListener.prototype.exitAssignment = function (ctx) {
};


// Enter a parse tree produced by Java9Parser#leftHandSide.
Java9ParserListener.prototype.enterLeftHandSide = function (ctx) {
};

// Exit a parse tree produced by Java9Parser#leftHandSide.
Java9ParserListener.prototype.exitLeftHandSide = function (ctx) {
};


// Enter a parse tree produced by Java9Parser#assignmentOperator.
Java9ParserListener.prototype.enterAssignmentOperator = function (ctx) {
};

// Exit a parse tree produced by Java9Parser#assignmentOperator.
Java9ParserListener.prototype.exitAssignmentOperator = function (ctx) {
};


// Enter a parse tree produced by Java9Parser#conditionalExpression.
Java9ParserListener.prototype.enterConditionalExpression = function (ctx) {
};

// Exit a parse tree produced by Java9Parser#conditionalExpression.
Java9ParserListener.prototype.exitConditionalExpression = function (ctx) {
};


// Enter a parse tree produced by Java9Parser#conditionalOrExpression.
Java9ParserListener.prototype.enterConditionalOrExpression = function (ctx) {
};

// Exit a parse tree produced by Java9Parser#conditionalOrExpression.
Java9ParserListener.prototype.exitConditionalOrExpression = function (ctx) {
};


// Enter a parse tree produced by Java9Parser#conditionalAndExpression.
Java9ParserListener.prototype.enterConditionalAndExpression = function (ctx) {
};

// Exit a parse tree produced by Java9Parser#conditionalAndExpression.
Java9ParserListener.prototype.exitConditionalAndExpression = function (ctx) {
};


// Enter a parse tree produced by Java9Parser#inclusiveOrExpression.
Java9ParserListener.prototype.enterInclusiveOrExpression = function (ctx) {
};

// Exit a parse tree produced by Java9Parser#inclusiveOrExpression.
Java9ParserListener.prototype.exitInclusiveOrExpression = function (ctx) {
};


// Enter a parse tree produced by Java9Parser#exclusiveOrExpression.
Java9ParserListener.prototype.enterExclusiveOrExpression = function (ctx) {
};

// Exit a parse tree produced by Java9Parser#exclusiveOrExpression.
Java9ParserListener.prototype.exitExclusiveOrExpression = function (ctx) {
};


// Enter a parse tree produced by Java9Parser#andExpression.
Java9ParserListener.prototype.enterAndExpression = function (ctx) {
};

// Exit a parse tree produced by Java9Parser#andExpression.
Java9ParserListener.prototype.exitAndExpression = function (ctx) {
};


// Enter a parse tree produced by Java9Parser#equalityExpression.
Java9ParserListener.prototype.enterEqualityExpression = function (ctx) {
};

// Exit a parse tree produced by Java9Parser#equalityExpression.
Java9ParserListener.prototype.exitEqualityExpression = function (ctx) {
};


// Enter a parse tree produced by Java9Parser#relationalExpression.
Java9ParserListener.prototype.enterRelationalExpression = function (ctx) {
};

// Exit a parse tree produced by Java9Parser#relationalExpression.
Java9ParserListener.prototype.exitRelationalExpression = function (ctx) {
};


// Enter a parse tree produced by Java9Parser#shiftExpression.
Java9ParserListener.prototype.enterShiftExpression = function (ctx) {
};

// Exit a parse tree produced by Java9Parser#shiftExpression.
Java9ParserListener.prototype.exitShiftExpression = function (ctx) {
};


// Enter a parse tree produced by Java9Parser#additiveExpression.
Java9ParserListener.prototype.enterAdditiveExpression = function (ctx) {
};

// Exit a parse tree produced by Java9Parser#additiveExpression.
Java9ParserListener.prototype.exitAdditiveExpression = function (ctx) {
};


// Enter a parse tree produced by Java9Parser#multiplicativeExpression.
Java9ParserListener.prototype.enterMultiplicativeExpression = function (ctx) {
};

// Exit a parse tree produced by Java9Parser#multiplicativeExpression.
Java9ParserListener.prototype.exitMultiplicativeExpression = function (ctx) {
};


// Enter a parse tree produced by Java9Parser#unaryExpression.
Java9ParserListener.prototype.enterUnaryExpression = function (ctx) {
};

// Exit a parse tree produced by Java9Parser#unaryExpression.
Java9ParserListener.prototype.exitUnaryExpression = function (ctx) {
};


// Enter a parse tree produced by Java9Parser#preIncrementExpression.
Java9ParserListener.prototype.enterPreIncrementExpression = function (ctx) {
};

// Exit a parse tree produced by Java9Parser#preIncrementExpression.
Java9ParserListener.prototype.exitPreIncrementExpression = function (ctx) {
};


// Enter a parse tree produced by Java9Parser#preDecrementExpression.
Java9ParserListener.prototype.enterPreDecrementExpression = function (ctx) {
};

// Exit a parse tree produced by Java9Parser#preDecrementExpression.
Java9ParserListener.prototype.exitPreDecrementExpression = function (ctx) {
};


// Enter a parse tree produced by Java9Parser#unaryExpressionNotPlusMinus.
Java9ParserListener.prototype.enterUnaryExpressionNotPlusMinus = function (ctx) {
};

// Exit a parse tree produced by Java9Parser#unaryExpressionNotPlusMinus.
Java9ParserListener.prototype.exitUnaryExpressionNotPlusMinus = function (ctx) {
};


// Enter a parse tree produced by Java9Parser#postfixExpression.
Java9ParserListener.prototype.enterPostfixExpression = function (ctx) {
};

// Exit a parse tree produced by Java9Parser#postfixExpression.
Java9ParserListener.prototype.exitPostfixExpression = function (ctx) {
};


// Enter a parse tree produced by Java9Parser#postIncrementExpression.
Java9ParserListener.prototype.enterPostIncrementExpression = function (ctx) {
};

// Exit a parse tree produced by Java9Parser#postIncrementExpression.
Java9ParserListener.prototype.exitPostIncrementExpression = function (ctx) {
};


// Enter a parse tree produced by Java9Parser#postIncrementExpression_lf_postfixExpression.
Java9ParserListener.prototype.enterPostIncrementExpression_lf_postfixExpression = function (ctx) {
};

// Exit a parse tree produced by Java9Parser#postIncrementExpression_lf_postfixExpression.
Java9ParserListener.prototype.exitPostIncrementExpression_lf_postfixExpression = function (ctx) {
};


// Enter a parse tree produced by Java9Parser#postDecrementExpression.
Java9ParserListener.prototype.enterPostDecrementExpression = function (ctx) {
};

// Exit a parse tree produced by Java9Parser#postDecrementExpression.
Java9ParserListener.prototype.exitPostDecrementExpression = function (ctx) {
};


// Enter a parse tree produced by Java9Parser#postDecrementExpression_lf_postfixExpression.
Java9ParserListener.prototype.enterPostDecrementExpression_lf_postfixExpression = function (ctx) {
};

// Exit a parse tree produced by Java9Parser#postDecrementExpression_lf_postfixExpression.
Java9ParserListener.prototype.exitPostDecrementExpression_lf_postfixExpression = function (ctx) {
};


// Enter a parse tree produced by Java9Parser#castExpression.
Java9ParserListener.prototype.enterCastExpression = function (ctx) {
};

// Exit a parse tree produced by Java9Parser#castExpression.
Java9ParserListener.prototype.exitCastExpression = function (ctx) {
};


// Enter a parse tree produced by Java9Parser#identifier.
Java9ParserListener.prototype.enterIdentifier = function (ctx) {
};

// Exit a parse tree produced by Java9Parser#identifier.
Java9ParserListener.prototype.exitIdentifier = function (ctx) {
};



exports.Java9ParserListener = Java9ParserListener;