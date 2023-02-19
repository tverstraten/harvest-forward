// Generated from \tools\parsers\java\java9\Java9Parser.g4 by ANTLR 4.8
// jshint ignore: start
var antlr4 = require('antlr4/index');

// This class defines a complete generic visitor for a parse tree produced by Java9Parser.

function Java9ParserVisitor() {
    antlr4.tree.ParseTreeVisitor.call(this);
    return this;
}

Java9ParserVisitor.prototype = Object.create(antlr4.tree.ParseTreeVisitor.prototype);
Java9ParserVisitor.prototype.constructor = Java9ParserVisitor;

// Visit a parse tree produced by Java9Parser#literal.
Java9ParserVisitor.prototype.visitLiteral = function (ctx) {
    return this.visitChildren(ctx);
};


// Visit a parse tree produced by Java9Parser#primitiveType.
Java9ParserVisitor.prototype.visitPrimitiveType = function (ctx) {
    return this.visitChildren(ctx);
};


// Visit a parse tree produced by Java9Parser#numericType.
Java9ParserVisitor.prototype.visitNumericType = function (ctx) {
    return this.visitChildren(ctx);
};


// Visit a parse tree produced by Java9Parser#integralType.
Java9ParserVisitor.prototype.visitIntegralType = function (ctx) {
    return this.visitChildren(ctx);
};


// Visit a parse tree produced by Java9Parser#floatingPointType.
Java9ParserVisitor.prototype.visitFloatingPointType = function (ctx) {
    return this.visitChildren(ctx);
};


// Visit a parse tree produced by Java9Parser#referenceType.
Java9ParserVisitor.prototype.visitReferenceType = function (ctx) {
    return this.visitChildren(ctx);
};


// Visit a parse tree produced by Java9Parser#classOrInterfaceType.
Java9ParserVisitor.prototype.visitClassOrInterfaceType = function (ctx) {
    return this.visitChildren(ctx);
};


// Visit a parse tree produced by Java9Parser#classType.
Java9ParserVisitor.prototype.visitClassType = function (ctx) {
    return this.visitChildren(ctx);
};


// Visit a parse tree produced by Java9Parser#classType_lf_classOrInterfaceType.
Java9ParserVisitor.prototype.visitClassType_lf_classOrInterfaceType = function (ctx) {
    return this.visitChildren(ctx);
};


// Visit a parse tree produced by Java9Parser#classType_lfno_classOrInterfaceType.
Java9ParserVisitor.prototype.visitClassType_lfno_classOrInterfaceType = function (ctx) {
    return this.visitChildren(ctx);
};


// Visit a parse tree produced by Java9Parser#interfaceType.
Java9ParserVisitor.prototype.visitInterfaceType = function (ctx) {
    return this.visitChildren(ctx);
};


// Visit a parse tree produced by Java9Parser#interfaceType_lf_classOrInterfaceType.
Java9ParserVisitor.prototype.visitInterfaceType_lf_classOrInterfaceType = function (ctx) {
    return this.visitChildren(ctx);
};


// Visit a parse tree produced by Java9Parser#interfaceType_lfno_classOrInterfaceType.
Java9ParserVisitor.prototype.visitInterfaceType_lfno_classOrInterfaceType = function (ctx) {
    return this.visitChildren(ctx);
};


// Visit a parse tree produced by Java9Parser#typeVariable.
Java9ParserVisitor.prototype.visitTypeVariable = function (ctx) {
    return this.visitChildren(ctx);
};


// Visit a parse tree produced by Java9Parser#arrayType.
Java9ParserVisitor.prototype.visitArrayType = function (ctx) {
    return this.visitChildren(ctx);
};


// Visit a parse tree produced by Java9Parser#dims.
Java9ParserVisitor.prototype.visitDims = function (ctx) {
    return this.visitChildren(ctx);
};


// Visit a parse tree produced by Java9Parser#typeParameter.
Java9ParserVisitor.prototype.visitTypeParameter = function (ctx) {
    return this.visitChildren(ctx);
};


// Visit a parse tree produced by Java9Parser#typeParameterModifier.
Java9ParserVisitor.prototype.visitTypeParameterModifier = function (ctx) {
    return this.visitChildren(ctx);
};


// Visit a parse tree produced by Java9Parser#typeBound.
Java9ParserVisitor.prototype.visitTypeBound = function (ctx) {
    return this.visitChildren(ctx);
};


// Visit a parse tree produced by Java9Parser#additionalBound.
Java9ParserVisitor.prototype.visitAdditionalBound = function (ctx) {
    return this.visitChildren(ctx);
};


// Visit a parse tree produced by Java9Parser#typeArguments.
Java9ParserVisitor.prototype.visitTypeArguments = function (ctx) {
    return this.visitChildren(ctx);
};


// Visit a parse tree produced by Java9Parser#typeArgumentList.
Java9ParserVisitor.prototype.visitTypeArgumentList = function (ctx) {
    return this.visitChildren(ctx);
};


// Visit a parse tree produced by Java9Parser#typeArgument.
Java9ParserVisitor.prototype.visitTypeArgument = function (ctx) {
    return this.visitChildren(ctx);
};


// Visit a parse tree produced by Java9Parser#wildcard.
Java9ParserVisitor.prototype.visitWildcard = function (ctx) {
    return this.visitChildren(ctx);
};


// Visit a parse tree produced by Java9Parser#wildcardBounds.
Java9ParserVisitor.prototype.visitWildcardBounds = function (ctx) {
    return this.visitChildren(ctx);
};


// Visit a parse tree produced by Java9Parser#moduleName.
Java9ParserVisitor.prototype.visitModuleName = function (ctx) {
    return this.visitChildren(ctx);
};


// Visit a parse tree produced by Java9Parser#packageName.
Java9ParserVisitor.prototype.visitPackageName = function (ctx) {
    return this.visitChildren(ctx);
};


// Visit a parse tree produced by Java9Parser#typeName.
Java9ParserVisitor.prototype.visitTypeName = function (ctx) {
    return this.visitChildren(ctx);
};


// Visit a parse tree produced by Java9Parser#packageOrTypeName.
Java9ParserVisitor.prototype.visitPackageOrTypeName = function (ctx) {
    return this.visitChildren(ctx);
};


// Visit a parse tree produced by Java9Parser#expressionName.
Java9ParserVisitor.prototype.visitExpressionName = function (ctx) {
    return this.visitChildren(ctx);
};


// Visit a parse tree produced by Java9Parser#methodName.
Java9ParserVisitor.prototype.visitMethodName = function (ctx) {
    return this.visitChildren(ctx);
};


// Visit a parse tree produced by Java9Parser#ambiguousName.
Java9ParserVisitor.prototype.visitAmbiguousName = function (ctx) {
    return this.visitChildren(ctx);
};


// Visit a parse tree produced by Java9Parser#compilationUnit.
Java9ParserVisitor.prototype.visitCompilationUnit = function (ctx) {
    return this.visitChildren(ctx);
};


// Visit a parse tree produced by Java9Parser#ordinaryCompilation.
Java9ParserVisitor.prototype.visitOrdinaryCompilation = function (ctx) {
    return this.visitChildren(ctx);
};


// Visit a parse tree produced by Java9Parser#modularCompilation.
Java9ParserVisitor.prototype.visitModularCompilation = function (ctx) {
    return this.visitChildren(ctx);
};


// Visit a parse tree produced by Java9Parser#packageDeclaration.
Java9ParserVisitor.prototype.visitPackageDeclaration = function (ctx) {
    return this.visitChildren(ctx);
};


// Visit a parse tree produced by Java9Parser#packageModifier.
Java9ParserVisitor.prototype.visitPackageModifier = function (ctx) {
    return this.visitChildren(ctx);
};


// Visit a parse tree produced by Java9Parser#importDeclaration.
Java9ParserVisitor.prototype.visitImportDeclaration = function (ctx) {
    return this.visitChildren(ctx);
};


// Visit a parse tree produced by Java9Parser#singleTypeImportDeclaration.
Java9ParserVisitor.prototype.visitSingleTypeImportDeclaration = function (ctx) {
    return this.visitChildren(ctx);
};


// Visit a parse tree produced by Java9Parser#typeImportOnDemandDeclaration.
Java9ParserVisitor.prototype.visitTypeImportOnDemandDeclaration = function (ctx) {
    return this.visitChildren(ctx);
};


// Visit a parse tree produced by Java9Parser#singleStaticImportDeclaration.
Java9ParserVisitor.prototype.visitSingleStaticImportDeclaration = function (ctx) {
    return this.visitChildren(ctx);
};


// Visit a parse tree produced by Java9Parser#staticImportOnDemandDeclaration.
Java9ParserVisitor.prototype.visitStaticImportOnDemandDeclaration = function (ctx) {
    return this.visitChildren(ctx);
};


// Visit a parse tree produced by Java9Parser#typeDeclaration.
Java9ParserVisitor.prototype.visitTypeDeclaration = function (ctx) {
    return this.visitChildren(ctx);
};


// Visit a parse tree produced by Java9Parser#moduleDeclaration.
Java9ParserVisitor.prototype.visitModuleDeclaration = function (ctx) {
    return this.visitChildren(ctx);
};


// Visit a parse tree produced by Java9Parser#moduleDirective.
Java9ParserVisitor.prototype.visitModuleDirective = function (ctx) {
    return this.visitChildren(ctx);
};


// Visit a parse tree produced by Java9Parser#requiresModifier.
Java9ParserVisitor.prototype.visitRequiresModifier = function (ctx) {
    return this.visitChildren(ctx);
};


// Visit a parse tree produced by Java9Parser#classDeclaration.
Java9ParserVisitor.prototype.visitClassDeclaration = function (ctx) {
    return this.visitChildren(ctx);
};


// Visit a parse tree produced by Java9Parser#normalClassDeclaration.
Java9ParserVisitor.prototype.visitNormalClassDeclaration = function (ctx) {
    return this.visitChildren(ctx);
};


// Visit a parse tree produced by Java9Parser#classModifier.
Java9ParserVisitor.prototype.visitClassModifier = function (ctx) {
    return this.visitChildren(ctx);
};


// Visit a parse tree produced by Java9Parser#typeParameters.
Java9ParserVisitor.prototype.visitTypeParameters = function (ctx) {
    return this.visitChildren(ctx);
};


// Visit a parse tree produced by Java9Parser#typeParameterList.
Java9ParserVisitor.prototype.visitTypeParameterList = function (ctx) {
    return this.visitChildren(ctx);
};


// Visit a parse tree produced by Java9Parser#superclass.
Java9ParserVisitor.prototype.visitSuperclass = function (ctx) {
    return this.visitChildren(ctx);
};


// Visit a parse tree produced by Java9Parser#superinterfaces.
Java9ParserVisitor.prototype.visitSuperinterfaces = function (ctx) {
    return this.visitChildren(ctx);
};


// Visit a parse tree produced by Java9Parser#interfaceTypeList.
Java9ParserVisitor.prototype.visitInterfaceTypeList = function (ctx) {
    return this.visitChildren(ctx);
};


// Visit a parse tree produced by Java9Parser#classBody.
Java9ParserVisitor.prototype.visitClassBody = function (ctx) {
    return this.visitChildren(ctx);
};


// Visit a parse tree produced by Java9Parser#classBodyDeclaration.
Java9ParserVisitor.prototype.visitClassBodyDeclaration = function (ctx) {
    return this.visitChildren(ctx);
};


// Visit a parse tree produced by Java9Parser#classMemberDeclaration.
Java9ParserVisitor.prototype.visitClassMemberDeclaration = function (ctx) {
    return this.visitChildren(ctx);
};


// Visit a parse tree produced by Java9Parser#fieldDeclaration.
Java9ParserVisitor.prototype.visitFieldDeclaration = function (ctx) {
    return this.visitChildren(ctx);
};


// Visit a parse tree produced by Java9Parser#fieldModifier.
Java9ParserVisitor.prototype.visitFieldModifier = function (ctx) {
    return this.visitChildren(ctx);
};


// Visit a parse tree produced by Java9Parser#variableDeclaratorList.
Java9ParserVisitor.prototype.visitVariableDeclaratorList = function (ctx) {
    return this.visitChildren(ctx);
};


// Visit a parse tree produced by Java9Parser#variableDeclarator.
Java9ParserVisitor.prototype.visitVariableDeclarator = function (ctx) {
    return this.visitChildren(ctx);
};


// Visit a parse tree produced by Java9Parser#variableDeclaratorId.
Java9ParserVisitor.prototype.visitVariableDeclaratorId = function (ctx) {
    return this.visitChildren(ctx);
};


// Visit a parse tree produced by Java9Parser#variableInitializer.
Java9ParserVisitor.prototype.visitVariableInitializer = function (ctx) {
    return this.visitChildren(ctx);
};


// Visit a parse tree produced by Java9Parser#unannType.
Java9ParserVisitor.prototype.visitUnannType = function (ctx) {
    return this.visitChildren(ctx);
};


// Visit a parse tree produced by Java9Parser#unannPrimitiveType.
Java9ParserVisitor.prototype.visitUnannPrimitiveType = function (ctx) {
    return this.visitChildren(ctx);
};


// Visit a parse tree produced by Java9Parser#unannReferenceType.
Java9ParserVisitor.prototype.visitUnannReferenceType = function (ctx) {
    return this.visitChildren(ctx);
};


// Visit a parse tree produced by Java9Parser#unannClassOrInterfaceType.
Java9ParserVisitor.prototype.visitUnannClassOrInterfaceType = function (ctx) {
    return this.visitChildren(ctx);
};


// Visit a parse tree produced by Java9Parser#unannClassType.
Java9ParserVisitor.prototype.visitUnannClassType = function (ctx) {
    return this.visitChildren(ctx);
};


// Visit a parse tree produced by Java9Parser#unannClassType_lf_unannClassOrInterfaceType.
Java9ParserVisitor.prototype.visitUnannClassType_lf_unannClassOrInterfaceType = function (ctx) {
    return this.visitChildren(ctx);
};


// Visit a parse tree produced by Java9Parser#unannClassType_lfno_unannClassOrInterfaceType.
Java9ParserVisitor.prototype.visitUnannClassType_lfno_unannClassOrInterfaceType = function (ctx) {
    return this.visitChildren(ctx);
};


// Visit a parse tree produced by Java9Parser#unannInterfaceType.
Java9ParserVisitor.prototype.visitUnannInterfaceType = function (ctx) {
    return this.visitChildren(ctx);
};


// Visit a parse tree produced by Java9Parser#unannInterfaceType_lf_unannClassOrInterfaceType.
Java9ParserVisitor.prototype.visitUnannInterfaceType_lf_unannClassOrInterfaceType = function (ctx) {
    return this.visitChildren(ctx);
};


// Visit a parse tree produced by Java9Parser#unannInterfaceType_lfno_unannClassOrInterfaceType.
Java9ParserVisitor.prototype.visitUnannInterfaceType_lfno_unannClassOrInterfaceType = function (ctx) {
    return this.visitChildren(ctx);
};


// Visit a parse tree produced by Java9Parser#unannTypeVariable.
Java9ParserVisitor.prototype.visitUnannTypeVariable = function (ctx) {
    return this.visitChildren(ctx);
};


// Visit a parse tree produced by Java9Parser#unannArrayType.
Java9ParserVisitor.prototype.visitUnannArrayType = function (ctx) {
    return this.visitChildren(ctx);
};


// Visit a parse tree produced by Java9Parser#methodDeclaration.
Java9ParserVisitor.prototype.visitMethodDeclaration = function (ctx) {
    return this.visitChildren(ctx);
};


// Visit a parse tree produced by Java9Parser#methodModifier.
Java9ParserVisitor.prototype.visitMethodModifier = function (ctx) {
    return this.visitChildren(ctx);
};


// Visit a parse tree produced by Java9Parser#methodHeader.
Java9ParserVisitor.prototype.visitMethodHeader = function (ctx) {
    return this.visitChildren(ctx);
};


// Visit a parse tree produced by Java9Parser#result.
Java9ParserVisitor.prototype.visitResult = function (ctx) {
    return this.visitChildren(ctx);
};


// Visit a parse tree produced by Java9Parser#methodDeclarator.
Java9ParserVisitor.prototype.visitMethodDeclarator = function (ctx) {
    return this.visitChildren(ctx);
};


// Visit a parse tree produced by Java9Parser#formalParameterList.
Java9ParserVisitor.prototype.visitFormalParameterList = function (ctx) {
    return this.visitChildren(ctx);
};


// Visit a parse tree produced by Java9Parser#formalParameters.
Java9ParserVisitor.prototype.visitFormalParameters = function (ctx) {
    return this.visitChildren(ctx);
};


// Visit a parse tree produced by Java9Parser#formalParameter.
Java9ParserVisitor.prototype.visitFormalParameter = function (ctx) {
    return this.visitChildren(ctx);
};


// Visit a parse tree produced by Java9Parser#variableModifier.
Java9ParserVisitor.prototype.visitVariableModifier = function (ctx) {
    return this.visitChildren(ctx);
};


// Visit a parse tree produced by Java9Parser#lastFormalParameter.
Java9ParserVisitor.prototype.visitLastFormalParameter = function (ctx) {
    return this.visitChildren(ctx);
};


// Visit a parse tree produced by Java9Parser#receiverParameter.
Java9ParserVisitor.prototype.visitReceiverParameter = function (ctx) {
    return this.visitChildren(ctx);
};


// Visit a parse tree produced by Java9Parser#throws_.
Java9ParserVisitor.prototype.visitThrows_ = function (ctx) {
    return this.visitChildren(ctx);
};


// Visit a parse tree produced by Java9Parser#exceptionTypeList.
Java9ParserVisitor.prototype.visitExceptionTypeList = function (ctx) {
    return this.visitChildren(ctx);
};


// Visit a parse tree produced by Java9Parser#exceptionType.
Java9ParserVisitor.prototype.visitExceptionType = function (ctx) {
    return this.visitChildren(ctx);
};


// Visit a parse tree produced by Java9Parser#methodBody.
Java9ParserVisitor.prototype.visitMethodBody = function (ctx) {
    return this.visitChildren(ctx);
};


// Visit a parse tree produced by Java9Parser#instanceInitializer.
Java9ParserVisitor.prototype.visitInstanceInitializer = function (ctx) {
    return this.visitChildren(ctx);
};


// Visit a parse tree produced by Java9Parser#staticInitializer.
Java9ParserVisitor.prototype.visitStaticInitializer = function (ctx) {
    return this.visitChildren(ctx);
};


// Visit a parse tree produced by Java9Parser#constructorDeclaration.
Java9ParserVisitor.prototype.visitConstructorDeclaration = function (ctx) {
    return this.visitChildren(ctx);
};


// Visit a parse tree produced by Java9Parser#constructorModifier.
Java9ParserVisitor.prototype.visitConstructorModifier = function (ctx) {
    return this.visitChildren(ctx);
};


// Visit a parse tree produced by Java9Parser#constructorDeclarator.
Java9ParserVisitor.prototype.visitConstructorDeclarator = function (ctx) {
    return this.visitChildren(ctx);
};


// Visit a parse tree produced by Java9Parser#simpleTypeName.
Java9ParserVisitor.prototype.visitSimpleTypeName = function (ctx) {
    return this.visitChildren(ctx);
};


// Visit a parse tree produced by Java9Parser#constructorBody.
Java9ParserVisitor.prototype.visitConstructorBody = function (ctx) {
    return this.visitChildren(ctx);
};


// Visit a parse tree produced by Java9Parser#explicitConstructorInvocation.
Java9ParserVisitor.prototype.visitExplicitConstructorInvocation = function (ctx) {
    return this.visitChildren(ctx);
};


// Visit a parse tree produced by Java9Parser#enumDeclaration.
Java9ParserVisitor.prototype.visitEnumDeclaration = function (ctx) {
    return this.visitChildren(ctx);
};


// Visit a parse tree produced by Java9Parser#enumBody.
Java9ParserVisitor.prototype.visitEnumBody = function (ctx) {
    return this.visitChildren(ctx);
};


// Visit a parse tree produced by Java9Parser#enumConstantList.
Java9ParserVisitor.prototype.visitEnumConstantList = function (ctx) {
    return this.visitChildren(ctx);
};


// Visit a parse tree produced by Java9Parser#enumConstant.
Java9ParserVisitor.prototype.visitEnumConstant = function (ctx) {
    return this.visitChildren(ctx);
};


// Visit a parse tree produced by Java9Parser#enumConstantModifier.
Java9ParserVisitor.prototype.visitEnumConstantModifier = function (ctx) {
    return this.visitChildren(ctx);
};


// Visit a parse tree produced by Java9Parser#enumBodyDeclarations.
Java9ParserVisitor.prototype.visitEnumBodyDeclarations = function (ctx) {
    return this.visitChildren(ctx);
};


// Visit a parse tree produced by Java9Parser#interfaceDeclaration.
Java9ParserVisitor.prototype.visitInterfaceDeclaration = function (ctx) {
    return this.visitChildren(ctx);
};


// Visit a parse tree produced by Java9Parser#normalInterfaceDeclaration.
Java9ParserVisitor.prototype.visitNormalInterfaceDeclaration = function (ctx) {
    return this.visitChildren(ctx);
};


// Visit a parse tree produced by Java9Parser#interfaceModifier.
Java9ParserVisitor.prototype.visitInterfaceModifier = function (ctx) {
    return this.visitChildren(ctx);
};


// Visit a parse tree produced by Java9Parser#extendsInterfaces.
Java9ParserVisitor.prototype.visitExtendsInterfaces = function (ctx) {
    return this.visitChildren(ctx);
};


// Visit a parse tree produced by Java9Parser#interfaceBody.
Java9ParserVisitor.prototype.visitInterfaceBody = function (ctx) {
    return this.visitChildren(ctx);
};


// Visit a parse tree produced by Java9Parser#interfaceMemberDeclaration.
Java9ParserVisitor.prototype.visitInterfaceMemberDeclaration = function (ctx) {
    return this.visitChildren(ctx);
};


// Visit a parse tree produced by Java9Parser#constantDeclaration.
Java9ParserVisitor.prototype.visitConstantDeclaration = function (ctx) {
    return this.visitChildren(ctx);
};


// Visit a parse tree produced by Java9Parser#constantModifier.
Java9ParserVisitor.prototype.visitConstantModifier = function (ctx) {
    return this.visitChildren(ctx);
};


// Visit a parse tree produced by Java9Parser#interfaceMethodDeclaration.
Java9ParserVisitor.prototype.visitInterfaceMethodDeclaration = function (ctx) {
    return this.visitChildren(ctx);
};


// Visit a parse tree produced by Java9Parser#interfaceMethodModifier.
Java9ParserVisitor.prototype.visitInterfaceMethodModifier = function (ctx) {
    return this.visitChildren(ctx);
};


// Visit a parse tree produced by Java9Parser#annotationTypeDeclaration.
Java9ParserVisitor.prototype.visitAnnotationTypeDeclaration = function (ctx) {
    return this.visitChildren(ctx);
};


// Visit a parse tree produced by Java9Parser#annotationTypeBody.
Java9ParserVisitor.prototype.visitAnnotationTypeBody = function (ctx) {
    return this.visitChildren(ctx);
};


// Visit a parse tree produced by Java9Parser#annotationTypeMemberDeclaration.
Java9ParserVisitor.prototype.visitAnnotationTypeMemberDeclaration = function (ctx) {
    return this.visitChildren(ctx);
};


// Visit a parse tree produced by Java9Parser#annotationTypeElementDeclaration.
Java9ParserVisitor.prototype.visitAnnotationTypeElementDeclaration = function (ctx) {
    return this.visitChildren(ctx);
};


// Visit a parse tree produced by Java9Parser#annotationTypeElementModifier.
Java9ParserVisitor.prototype.visitAnnotationTypeElementModifier = function (ctx) {
    return this.visitChildren(ctx);
};


// Visit a parse tree produced by Java9Parser#defaultValue.
Java9ParserVisitor.prototype.visitDefaultValue = function (ctx) {
    return this.visitChildren(ctx);
};


// Visit a parse tree produced by Java9Parser#annotation.
Java9ParserVisitor.prototype.visitAnnotation = function (ctx) {
    return this.visitChildren(ctx);
};


// Visit a parse tree produced by Java9Parser#normalAnnotation.
Java9ParserVisitor.prototype.visitNormalAnnotation = function (ctx) {
    return this.visitChildren(ctx);
};


// Visit a parse tree produced by Java9Parser#elementValuePairList.
Java9ParserVisitor.prototype.visitElementValuePairList = function (ctx) {
    return this.visitChildren(ctx);
};


// Visit a parse tree produced by Java9Parser#elementValuePair.
Java9ParserVisitor.prototype.visitElementValuePair = function (ctx) {
    return this.visitChildren(ctx);
};


// Visit a parse tree produced by Java9Parser#elementValue.
Java9ParserVisitor.prototype.visitElementValue = function (ctx) {
    return this.visitChildren(ctx);
};


// Visit a parse tree produced by Java9Parser#elementValueArrayInitializer.
Java9ParserVisitor.prototype.visitElementValueArrayInitializer = function (ctx) {
    return this.visitChildren(ctx);
};


// Visit a parse tree produced by Java9Parser#elementValueList.
Java9ParserVisitor.prototype.visitElementValueList = function (ctx) {
    return this.visitChildren(ctx);
};


// Visit a parse tree produced by Java9Parser#markerAnnotation.
Java9ParserVisitor.prototype.visitMarkerAnnotation = function (ctx) {
    return this.visitChildren(ctx);
};


// Visit a parse tree produced by Java9Parser#singleElementAnnotation.
Java9ParserVisitor.prototype.visitSingleElementAnnotation = function (ctx) {
    return this.visitChildren(ctx);
};


// Visit a parse tree produced by Java9Parser#arrayInitializer.
Java9ParserVisitor.prototype.visitArrayInitializer = function (ctx) {
    return this.visitChildren(ctx);
};


// Visit a parse tree produced by Java9Parser#variableInitializerList.
Java9ParserVisitor.prototype.visitVariableInitializerList = function (ctx) {
    return this.visitChildren(ctx);
};


// Visit a parse tree produced by Java9Parser#block.
Java9ParserVisitor.prototype.visitBlock = function (ctx) {
    return this.visitChildren(ctx);
};


// Visit a parse tree produced by Java9Parser#blockStatements.
Java9ParserVisitor.prototype.visitBlockStatements = function (ctx) {
    return this.visitChildren(ctx);
};


// Visit a parse tree produced by Java9Parser#blockStatement.
Java9ParserVisitor.prototype.visitBlockStatement = function (ctx) {
    return this.visitChildren(ctx);
};


// Visit a parse tree produced by Java9Parser#localVariableDeclarationStatement.
Java9ParserVisitor.prototype.visitLocalVariableDeclarationStatement = function (ctx) {
    return this.visitChildren(ctx);
};


// Visit a parse tree produced by Java9Parser#localVariableDeclaration.
Java9ParserVisitor.prototype.visitLocalVariableDeclaration = function (ctx) {
    return this.visitChildren(ctx);
};


// Visit a parse tree produced by Java9Parser#statement.
Java9ParserVisitor.prototype.visitStatement = function (ctx) {
    return this.visitChildren(ctx);
};


// Visit a parse tree produced by Java9Parser#statementNoShortIf.
Java9ParserVisitor.prototype.visitStatementNoShortIf = function (ctx) {
    return this.visitChildren(ctx);
};


// Visit a parse tree produced by Java9Parser#statementWithoutTrailingSubstatement.
Java9ParserVisitor.prototype.visitStatementWithoutTrailingSubstatement = function (ctx) {
    return this.visitChildren(ctx);
};


// Visit a parse tree produced by Java9Parser#emptyStatement.
Java9ParserVisitor.prototype.visitEmptyStatement = function (ctx) {
    return this.visitChildren(ctx);
};


// Visit a parse tree produced by Java9Parser#labeledStatement.
Java9ParserVisitor.prototype.visitLabeledStatement = function (ctx) {
    return this.visitChildren(ctx);
};


// Visit a parse tree produced by Java9Parser#labeledStatementNoShortIf.
Java9ParserVisitor.prototype.visitLabeledStatementNoShortIf = function (ctx) {
    return this.visitChildren(ctx);
};


// Visit a parse tree produced by Java9Parser#expressionStatement.
Java9ParserVisitor.prototype.visitExpressionStatement = function (ctx) {
    return this.visitChildren(ctx);
};


// Visit a parse tree produced by Java9Parser#statementExpression.
Java9ParserVisitor.prototype.visitStatementExpression = function (ctx) {
    return this.visitChildren(ctx);
};


// Visit a parse tree produced by Java9Parser#ifThenStatement.
Java9ParserVisitor.prototype.visitIfThenStatement = function (ctx) {
    return this.visitChildren(ctx);
};


// Visit a parse tree produced by Java9Parser#ifThenElseStatement.
Java9ParserVisitor.prototype.visitIfThenElseStatement = function (ctx) {
    return this.visitChildren(ctx);
};


// Visit a parse tree produced by Java9Parser#ifThenElseStatementNoShortIf.
Java9ParserVisitor.prototype.visitIfThenElseStatementNoShortIf = function (ctx) {
    return this.visitChildren(ctx);
};


// Visit a parse tree produced by Java9Parser#assertStatement.
Java9ParserVisitor.prototype.visitAssertStatement = function (ctx) {
    return this.visitChildren(ctx);
};


// Visit a parse tree produced by Java9Parser#switchStatement.
Java9ParserVisitor.prototype.visitSwitchStatement = function (ctx) {
    return this.visitChildren(ctx);
};


// Visit a parse tree produced by Java9Parser#switchBlock.
Java9ParserVisitor.prototype.visitSwitchBlock = function (ctx) {
    return this.visitChildren(ctx);
};


// Visit a parse tree produced by Java9Parser#switchBlockStatementGroup.
Java9ParserVisitor.prototype.visitSwitchBlockStatementGroup = function (ctx) {
    return this.visitChildren(ctx);
};


// Visit a parse tree produced by Java9Parser#switchLabels.
Java9ParserVisitor.prototype.visitSwitchLabels = function (ctx) {
    return this.visitChildren(ctx);
};


// Visit a parse tree produced by Java9Parser#switchLabel.
Java9ParserVisitor.prototype.visitSwitchLabel = function (ctx) {
    return this.visitChildren(ctx);
};


// Visit a parse tree produced by Java9Parser#enumConstantName.
Java9ParserVisitor.prototype.visitEnumConstantName = function (ctx) {
    return this.visitChildren(ctx);
};


// Visit a parse tree produced by Java9Parser#whileStatement.
Java9ParserVisitor.prototype.visitWhileStatement = function (ctx) {
    return this.visitChildren(ctx);
};


// Visit a parse tree produced by Java9Parser#whileStatementNoShortIf.
Java9ParserVisitor.prototype.visitWhileStatementNoShortIf = function (ctx) {
    return this.visitChildren(ctx);
};


// Visit a parse tree produced by Java9Parser#doStatement.
Java9ParserVisitor.prototype.visitDoStatement = function (ctx) {
    return this.visitChildren(ctx);
};


// Visit a parse tree produced by Java9Parser#forStatement.
Java9ParserVisitor.prototype.visitForStatement = function (ctx) {
    return this.visitChildren(ctx);
};


// Visit a parse tree produced by Java9Parser#forStatementNoShortIf.
Java9ParserVisitor.prototype.visitForStatementNoShortIf = function (ctx) {
    return this.visitChildren(ctx);
};


// Visit a parse tree produced by Java9Parser#basicForStatement.
Java9ParserVisitor.prototype.visitBasicForStatement = function (ctx) {
    return this.visitChildren(ctx);
};


// Visit a parse tree produced by Java9Parser#basicForStatementNoShortIf.
Java9ParserVisitor.prototype.visitBasicForStatementNoShortIf = function (ctx) {
    return this.visitChildren(ctx);
};


// Visit a parse tree produced by Java9Parser#forInit.
Java9ParserVisitor.prototype.visitForInit = function (ctx) {
    return this.visitChildren(ctx);
};


// Visit a parse tree produced by Java9Parser#forUpdate.
Java9ParserVisitor.prototype.visitForUpdate = function (ctx) {
    return this.visitChildren(ctx);
};


// Visit a parse tree produced by Java9Parser#statementExpressionList.
Java9ParserVisitor.prototype.visitStatementExpressionList = function (ctx) {
    return this.visitChildren(ctx);
};


// Visit a parse tree produced by Java9Parser#enhancedForStatement.
Java9ParserVisitor.prototype.visitEnhancedForStatement = function (ctx) {
    return this.visitChildren(ctx);
};


// Visit a parse tree produced by Java9Parser#enhancedForStatementNoShortIf.
Java9ParserVisitor.prototype.visitEnhancedForStatementNoShortIf = function (ctx) {
    return this.visitChildren(ctx);
};


// Visit a parse tree produced by Java9Parser#breakStatement.
Java9ParserVisitor.prototype.visitBreakStatement = function (ctx) {
    return this.visitChildren(ctx);
};


// Visit a parse tree produced by Java9Parser#continueStatement.
Java9ParserVisitor.prototype.visitContinueStatement = function (ctx) {
    return this.visitChildren(ctx);
};


// Visit a parse tree produced by Java9Parser#returnStatement.
Java9ParserVisitor.prototype.visitReturnStatement = function (ctx) {
    return this.visitChildren(ctx);
};


// Visit a parse tree produced by Java9Parser#throwStatement.
Java9ParserVisitor.prototype.visitThrowStatement = function (ctx) {
    return this.visitChildren(ctx);
};


// Visit a parse tree produced by Java9Parser#synchronizedStatement.
Java9ParserVisitor.prototype.visitSynchronizedStatement = function (ctx) {
    return this.visitChildren(ctx);
};


// Visit a parse tree produced by Java9Parser#tryStatement.
Java9ParserVisitor.prototype.visitTryStatement = function (ctx) {
    return this.visitChildren(ctx);
};


// Visit a parse tree produced by Java9Parser#catches.
Java9ParserVisitor.prototype.visitCatches = function (ctx) {
    return this.visitChildren(ctx);
};


// Visit a parse tree produced by Java9Parser#catchClause.
Java9ParserVisitor.prototype.visitCatchClause = function (ctx) {
    return this.visitChildren(ctx);
};


// Visit a parse tree produced by Java9Parser#catchFormalParameter.
Java9ParserVisitor.prototype.visitCatchFormalParameter = function (ctx) {
    return this.visitChildren(ctx);
};


// Visit a parse tree produced by Java9Parser#catchType.
Java9ParserVisitor.prototype.visitCatchType = function (ctx) {
    return this.visitChildren(ctx);
};


// Visit a parse tree produced by Java9Parser#finally_.
Java9ParserVisitor.prototype.visitFinally_ = function (ctx) {
    return this.visitChildren(ctx);
};


// Visit a parse tree produced by Java9Parser#tryWithResourcesStatement.
Java9ParserVisitor.prototype.visitTryWithResourcesStatement = function (ctx) {
    return this.visitChildren(ctx);
};


// Visit a parse tree produced by Java9Parser#resourceSpecification.
Java9ParserVisitor.prototype.visitResourceSpecification = function (ctx) {
    return this.visitChildren(ctx);
};


// Visit a parse tree produced by Java9Parser#resourceList.
Java9ParserVisitor.prototype.visitResourceList = function (ctx) {
    return this.visitChildren(ctx);
};


// Visit a parse tree produced by Java9Parser#resource.
Java9ParserVisitor.prototype.visitResource = function (ctx) {
    return this.visitChildren(ctx);
};


// Visit a parse tree produced by Java9Parser#variableAccess.
Java9ParserVisitor.prototype.visitVariableAccess = function (ctx) {
    return this.visitChildren(ctx);
};


// Visit a parse tree produced by Java9Parser#primary.
Java9ParserVisitor.prototype.visitPrimary = function (ctx) {
    return this.visitChildren(ctx);
};


// Visit a parse tree produced by Java9Parser#primaryNoNewArray.
Java9ParserVisitor.prototype.visitPrimaryNoNewArray = function (ctx) {
    return this.visitChildren(ctx);
};


// Visit a parse tree produced by Java9Parser#primaryNoNewArray_lf_arrayAccess.
Java9ParserVisitor.prototype.visitPrimaryNoNewArray_lf_arrayAccess = function (ctx) {
    return this.visitChildren(ctx);
};


// Visit a parse tree produced by Java9Parser#primaryNoNewArray_lfno_arrayAccess.
Java9ParserVisitor.prototype.visitPrimaryNoNewArray_lfno_arrayAccess = function (ctx) {
    return this.visitChildren(ctx);
};


// Visit a parse tree produced by Java9Parser#primaryNoNewArray_lf_primary.
Java9ParserVisitor.prototype.visitPrimaryNoNewArray_lf_primary = function (ctx) {
    return this.visitChildren(ctx);
};


// Visit a parse tree produced by Java9Parser#primaryNoNewArray_lf_primary_lf_arrayAccess_lf_primary.
Java9ParserVisitor.prototype.visitPrimaryNoNewArray_lf_primary_lf_arrayAccess_lf_primary = function (ctx) {
    return this.visitChildren(ctx);
};


// Visit a parse tree produced by Java9Parser#primaryNoNewArray_lf_primary_lfno_arrayAccess_lf_primary.
Java9ParserVisitor.prototype.visitPrimaryNoNewArray_lf_primary_lfno_arrayAccess_lf_primary = function (ctx) {
    return this.visitChildren(ctx);
};


// Visit a parse tree produced by Java9Parser#primaryNoNewArray_lfno_primary.
Java9ParserVisitor.prototype.visitPrimaryNoNewArray_lfno_primary = function (ctx) {
    return this.visitChildren(ctx);
};


// Visit a parse tree produced by Java9Parser#primaryNoNewArray_lfno_primary_lf_arrayAccess_lfno_primary.
Java9ParserVisitor.prototype.visitPrimaryNoNewArray_lfno_primary_lf_arrayAccess_lfno_primary = function (ctx) {
    return this.visitChildren(ctx);
};


// Visit a parse tree produced by Java9Parser#primaryNoNewArray_lfno_primary_lfno_arrayAccess_lfno_primary.
Java9ParserVisitor.prototype.visitPrimaryNoNewArray_lfno_primary_lfno_arrayAccess_lfno_primary = function (ctx) {
    return this.visitChildren(ctx);
};


// Visit a parse tree produced by Java9Parser#classLiteral.
Java9ParserVisitor.prototype.visitClassLiteral = function (ctx) {
    return this.visitChildren(ctx);
};


// Visit a parse tree produced by Java9Parser#classInstanceCreationExpression.
Java9ParserVisitor.prototype.visitClassInstanceCreationExpression = function (ctx) {
    return this.visitChildren(ctx);
};


// Visit a parse tree produced by Java9Parser#classInstanceCreationExpression_lf_primary.
Java9ParserVisitor.prototype.visitClassInstanceCreationExpression_lf_primary = function (ctx) {
    return this.visitChildren(ctx);
};


// Visit a parse tree produced by Java9Parser#classInstanceCreationExpression_lfno_primary.
Java9ParserVisitor.prototype.visitClassInstanceCreationExpression_lfno_primary = function (ctx) {
    return this.visitChildren(ctx);
};


// Visit a parse tree produced by Java9Parser#typeArgumentsOrDiamond.
Java9ParserVisitor.prototype.visitTypeArgumentsOrDiamond = function (ctx) {
    return this.visitChildren(ctx);
};


// Visit a parse tree produced by Java9Parser#fieldAccess.
Java9ParserVisitor.prototype.visitFieldAccess = function (ctx) {
    return this.visitChildren(ctx);
};


// Visit a parse tree produced by Java9Parser#fieldAccess_lf_primary.
Java9ParserVisitor.prototype.visitFieldAccess_lf_primary = function (ctx) {
    return this.visitChildren(ctx);
};


// Visit a parse tree produced by Java9Parser#fieldAccess_lfno_primary.
Java9ParserVisitor.prototype.visitFieldAccess_lfno_primary = function (ctx) {
    return this.visitChildren(ctx);
};


// Visit a parse tree produced by Java9Parser#arrayAccess.
Java9ParserVisitor.prototype.visitArrayAccess = function (ctx) {
    return this.visitChildren(ctx);
};


// Visit a parse tree produced by Java9Parser#arrayAccess_lf_primary.
Java9ParserVisitor.prototype.visitArrayAccess_lf_primary = function (ctx) {
    return this.visitChildren(ctx);
};


// Visit a parse tree produced by Java9Parser#arrayAccess_lfno_primary.
Java9ParserVisitor.prototype.visitArrayAccess_lfno_primary = function (ctx) {
    return this.visitChildren(ctx);
};


// Visit a parse tree produced by Java9Parser#methodInvocation.
Java9ParserVisitor.prototype.visitMethodInvocation = function (ctx) {
    return this.visitChildren(ctx);
};


// Visit a parse tree produced by Java9Parser#methodInvocation_lf_primary.
Java9ParserVisitor.prototype.visitMethodInvocation_lf_primary = function (ctx) {
    return this.visitChildren(ctx);
};


// Visit a parse tree produced by Java9Parser#methodInvocation_lfno_primary.
Java9ParserVisitor.prototype.visitMethodInvocation_lfno_primary = function (ctx) {
    return this.visitChildren(ctx);
};


// Visit a parse tree produced by Java9Parser#argumentList.
Java9ParserVisitor.prototype.visitArgumentList = function (ctx) {
    return this.visitChildren(ctx);
};


// Visit a parse tree produced by Java9Parser#methodReference.
Java9ParserVisitor.prototype.visitMethodReference = function (ctx) {
    return this.visitChildren(ctx);
};


// Visit a parse tree produced by Java9Parser#methodReference_lf_primary.
Java9ParserVisitor.prototype.visitMethodReference_lf_primary = function (ctx) {
    return this.visitChildren(ctx);
};


// Visit a parse tree produced by Java9Parser#methodReference_lfno_primary.
Java9ParserVisitor.prototype.visitMethodReference_lfno_primary = function (ctx) {
    return this.visitChildren(ctx);
};


// Visit a parse tree produced by Java9Parser#arrayCreationExpression.
Java9ParserVisitor.prototype.visitArrayCreationExpression = function (ctx) {
    return this.visitChildren(ctx);
};


// Visit a parse tree produced by Java9Parser#dimExprs.
Java9ParserVisitor.prototype.visitDimExprs = function (ctx) {
    return this.visitChildren(ctx);
};


// Visit a parse tree produced by Java9Parser#dimExpr.
Java9ParserVisitor.prototype.visitDimExpr = function (ctx) {
    return this.visitChildren(ctx);
};


// Visit a parse tree produced by Java9Parser#constantExpression.
Java9ParserVisitor.prototype.visitConstantExpression = function (ctx) {
    return this.visitChildren(ctx);
};


// Visit a parse tree produced by Java9Parser#expression.
Java9ParserVisitor.prototype.visitExpression = function (ctx) {
    return this.visitChildren(ctx);
};


// Visit a parse tree produced by Java9Parser#lambdaExpression.
Java9ParserVisitor.prototype.visitLambdaExpression = function (ctx) {
    return this.visitChildren(ctx);
};


// Visit a parse tree produced by Java9Parser#lambdaParameters.
Java9ParserVisitor.prototype.visitLambdaParameters = function (ctx) {
    return this.visitChildren(ctx);
};


// Visit a parse tree produced by Java9Parser#inferredFormalParameterList.
Java9ParserVisitor.prototype.visitInferredFormalParameterList = function (ctx) {
    return this.visitChildren(ctx);
};


// Visit a parse tree produced by Java9Parser#lambdaBody.
Java9ParserVisitor.prototype.visitLambdaBody = function (ctx) {
    return this.visitChildren(ctx);
};


// Visit a parse tree produced by Java9Parser#assignmentExpression.
Java9ParserVisitor.prototype.visitAssignmentExpression = function (ctx) {
    return this.visitChildren(ctx);
};


// Visit a parse tree produced by Java9Parser#assignment.
Java9ParserVisitor.prototype.visitAssignment = function (ctx) {
    return this.visitChildren(ctx);
};


// Visit a parse tree produced by Java9Parser#leftHandSide.
Java9ParserVisitor.prototype.visitLeftHandSide = function (ctx) {
    return this.visitChildren(ctx);
};


// Visit a parse tree produced by Java9Parser#assignmentOperator.
Java9ParserVisitor.prototype.visitAssignmentOperator = function (ctx) {
    return this.visitChildren(ctx);
};


// Visit a parse tree produced by Java9Parser#conditionalExpression.
Java9ParserVisitor.prototype.visitConditionalExpression = function (ctx) {
    return this.visitChildren(ctx);
};


// Visit a parse tree produced by Java9Parser#conditionalOrExpression.
Java9ParserVisitor.prototype.visitConditionalOrExpression = function (ctx) {
    return this.visitChildren(ctx);
};


// Visit a parse tree produced by Java9Parser#conditionalAndExpression.
Java9ParserVisitor.prototype.visitConditionalAndExpression = function (ctx) {
    return this.visitChildren(ctx);
};


// Visit a parse tree produced by Java9Parser#inclusiveOrExpression.
Java9ParserVisitor.prototype.visitInclusiveOrExpression = function (ctx) {
    return this.visitChildren(ctx);
};


// Visit a parse tree produced by Java9Parser#exclusiveOrExpression.
Java9ParserVisitor.prototype.visitExclusiveOrExpression = function (ctx) {
    return this.visitChildren(ctx);
};


// Visit a parse tree produced by Java9Parser#andExpression.
Java9ParserVisitor.prototype.visitAndExpression = function (ctx) {
    return this.visitChildren(ctx);
};


// Visit a parse tree produced by Java9Parser#equalityExpression.
Java9ParserVisitor.prototype.visitEqualityExpression = function (ctx) {
    return this.visitChildren(ctx);
};


// Visit a parse tree produced by Java9Parser#relationalExpression.
Java9ParserVisitor.prototype.visitRelationalExpression = function (ctx) {
    return this.visitChildren(ctx);
};


// Visit a parse tree produced by Java9Parser#shiftExpression.
Java9ParserVisitor.prototype.visitShiftExpression = function (ctx) {
    return this.visitChildren(ctx);
};


// Visit a parse tree produced by Java9Parser#additiveExpression.
Java9ParserVisitor.prototype.visitAdditiveExpression = function (ctx) {
    return this.visitChildren(ctx);
};


// Visit a parse tree produced by Java9Parser#multiplicativeExpression.
Java9ParserVisitor.prototype.visitMultiplicativeExpression = function (ctx) {
    return this.visitChildren(ctx);
};


// Visit a parse tree produced by Java9Parser#unaryExpression.
Java9ParserVisitor.prototype.visitUnaryExpression = function (ctx) {
    return this.visitChildren(ctx);
};


// Visit a parse tree produced by Java9Parser#preIncrementExpression.
Java9ParserVisitor.prototype.visitPreIncrementExpression = function (ctx) {
    return this.visitChildren(ctx);
};


// Visit a parse tree produced by Java9Parser#preDecrementExpression.
Java9ParserVisitor.prototype.visitPreDecrementExpression = function (ctx) {
    return this.visitChildren(ctx);
};


// Visit a parse tree produced by Java9Parser#unaryExpressionNotPlusMinus.
Java9ParserVisitor.prototype.visitUnaryExpressionNotPlusMinus = function (ctx) {
    return this.visitChildren(ctx);
};


// Visit a parse tree produced by Java9Parser#postfixExpression.
Java9ParserVisitor.prototype.visitPostfixExpression = function (ctx) {
    return this.visitChildren(ctx);
};


// Visit a parse tree produced by Java9Parser#postIncrementExpression.
Java9ParserVisitor.prototype.visitPostIncrementExpression = function (ctx) {
    return this.visitChildren(ctx);
};


// Visit a parse tree produced by Java9Parser#postIncrementExpression_lf_postfixExpression.
Java9ParserVisitor.prototype.visitPostIncrementExpression_lf_postfixExpression = function (ctx) {
    return this.visitChildren(ctx);
};


// Visit a parse tree produced by Java9Parser#postDecrementExpression.
Java9ParserVisitor.prototype.visitPostDecrementExpression = function (ctx) {
    return this.visitChildren(ctx);
};


// Visit a parse tree produced by Java9Parser#postDecrementExpression_lf_postfixExpression.
Java9ParserVisitor.prototype.visitPostDecrementExpression_lf_postfixExpression = function (ctx) {
    return this.visitChildren(ctx);
};


// Visit a parse tree produced by Java9Parser#castExpression.
Java9ParserVisitor.prototype.visitCastExpression = function (ctx) {
    return this.visitChildren(ctx);
};


// Visit a parse tree produced by Java9Parser#identifier.
Java9ParserVisitor.prototype.visitIdentifier = function (ctx) {
    return this.visitChildren(ctx);
};



exports.Java9ParserVisitor = Java9ParserVisitor;