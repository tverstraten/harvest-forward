parser grammar vbParser;

options {
	tokenVocab = vbLexer;
}

start
    : classMemberDeclaration EOF
    // | optionStatement* importsStatement* attributesStatement* namespaceMemberDeclaration*
    //| classDeclaration
    ;
/*
character:
    NOT_LINE_TERMINATOR
    ;

comment
    : commentMarker character*
    ;

commentMarker
    : SINGLE_QUOTE_CHAR
    | REM
    ;
*/

hexDigit: decimalDigit | A | B | C | D | E | F;
decimalDigit: octalDigit | EIGHT | NINE;
octalDigit: ZERO | ONE | TWO | THREE | FOUR | FIVE | SIX | SEVEN;

alphaCharacter: A | B | C | D | E | F | G | H | I | J | K | L | M | N | O | P | Q | R | S | T | U | V | W | X | Y | Z;

booleanLiteral: T R U E | F A L S E;

intLiteral: decimalDigit+;

hexLiteral: AMPERSAND H hexDigit+;

octalLiteral: AMPERSAND O octalDigit+;

integerLiteral: integerLiteralValue integralTypeCharacter?;

integerLiteralValue: intLiteral | hexLiteral | octalLiteral;

floatingPointLiteral: floatingPointLiteralValue floatingPointTypeCharacter? | intLiteral floatingPointTypeCharacter;

floatingPointLiteralValue: intLiteral PERIOD intLiteral exponent? | PERIOD intLiteral exponent? | intLiteral exponent;

exponent: E sign? intLiteral;

sign: PLUS| MINUS;

singleTypeCharacter: EXCLAMATION;

doubleTypeCharacter: POUND;

longTypeCharacter: AMPERSAND;

stringTypeCharacter: DOLLAR;

integerTypeCharacter: PERCENT;

decimalTypeCharacter: AT;

integralTypeCharacter
    : SHORT_CHARACTER 
    | UNSIGNED_SHORT_CHARACTER 
    | INTEGER_CHARACTER 
    | UNSIGNED_INTEGER_CHARACTER 
    | LONG_CHARACTER 
    | UNSIGNED_LONG_CHARACTER 
    | integerTypeCharacter 
    | longTypeCharacter
    ;

floatingPointTypeCharacter
    : SINGLE_CHARACTER 
    | DOUBLE_CHARACTER 
    | DECIMAL_CHARACTER 
    | singleTypeCharacter 
    | doubleTypeCharacter 
    | decimalTypeCharacter
    ;

monthValue: intLiteral;
dayValue: intLiteral;
yearValue: intLiteral;
hourValue: intLiteral;
minuteValue: intLiteral;
secondValue: intLiteral;

ampm
    : A M 
    | P M
    ;

dateValue
    : monthValue SLASH dayValue SLASH yearValue 
    | monthValue MINUS dayValue MINUS yearValue
    ;
    
timeValue
    : hourValue COLON minuteValue ( COLON secondValue )? WS* ampm?
    | hourValue WS* ampm
    ;

dateOrTime
    : dateValue WS+ timeValue
    | dateValue
    | timeValue
    ;

dateLiteral
    : POUND WS* dateOrTime WS* POUND
    ;

stringCharacter
    //: (~ [\"\r\n] | '""')+ 
    : '"'+ 
    | DOUBLE_QUOTE_CHARACTER DOUBLE_QUOTE_CHARACTER
    ;

stringLiteral
    : DOUBLE_QUOTE_CHARACTER stringCharacter* DOUBLE_QUOTE_CHARACTER
    ;

characterLiteral
    : DOUBLE_QUOTE_CHARACTER stringCharacter DOUBLE_QUOTE_CHARACTER C
    ;

identifierStart
    : alphaCharacter 
    | UNDERSCORE identifierCharacter
    ;

identifierName
    : identifierStart identifierCharacter*
    ;

identifierCharacter
    : UNDERSCORE
    | alphaCharacter 
    | decimalDigit
    ;

identifier
    : identifierName
    | identifierName typeCharacter?
    | LEFT_SQUARE_BRACKET identifierName RIGHT_SQUARE_BRACKET
    ;

identifierOrKeyword
    : identifier
    ;

typeCharacter: integerTypeCharacter | longTypeCharacter | decimalTypeCharacter | singleTypeCharacter | doubleTypeCharacter | stringTypeCharacter;

literal
    : booleanLiteral
    | integerLiteral
    | floatingPointLiteral
    | stringLiteral
    | characterLiteral
    | dateLiteral
    | NOTHING
    ;

elseIf
    : ELSEIF
    | ELSE IF
    ;

// 3. Preprocessing Directives

cCStart
    : cCStatement*
    ;

cCStatement
    : cCConstantDeclaration
    | cCIfGroup
    ;

cCExpression
    : literalExpression
    | cCParenthesizedExpression
    | cCSimpleNameExpression
    | cCCastExpression
    | cCUnaryOperator cCExpression
    | cCExpression cCBinaryOperator cCExpression
    | cCConditionalExpression
    ;

cCParenthesizedExpression
    : LEFT_PAREN cCExpression RIGHT_PAREN
    ;

cCSimpleNameExpression
    : identifier
    ;

cCCastExpression
    : DIRECTCAST LEFT_PAREN cCExpression COMMA typeName RIGHT_PAREN
    | TRYCAST LEFT_PAREN cCExpression COMMA typeName RIGHT_PAREN
    | CTYPE LEFT_PAREN cCExpression COMMA typeName RIGHT_PAREN
    | castTarget LEFT_PAREN cCExpression RIGHT_PAREN
    ;
/*
cCOperatorExpression
    : cCUnaryOperator cCExpression
    | cCExpression cCBinaryOperator cCExpression
    ;
*/

cCPlusMinus
    : PLUS | MINUS
    ;

cCUnaryOperator
    : cCPlusMinus | NOT
    ;

cCBinaryOperator
    : cCPlusMinus | ASTERISK | SLASH | DOUBLE_BACK_SLASH | MOD | CARET | EQUALS
    | LEFT_ARROW RIGHT_ARROW | LEFT_ARROW | RIGHT_ARROW | LEFT_ARROW EQUALS | RIGHT_ARROW EQUALS | AMPERSAND
    | AND | OR | XOR | ANDALSO | ORELSE
    | LEFT_ARROW LEFT_ARROW | RIGHT_ARROW RIGHT_ARROW
    ;

cCConditionalExpression
    : IF LEFT_PAREN cCExpression COMMA cCExpression COMMA cCExpression RIGHT_PAREN
    | IF LEFT_PAREN cCExpression COMMA cCExpression RIGHT_PAREN
    ;

cCConstantDeclaration
    : POUND CONST identifier EQUALS cCExpression  LINE_TERMINATOR
    ;

cCIfGroup
    : POUND IF cCExpression THEN?  LINE_TERMINATOR cCStatement*
    cCElseIfGroup* cCElseGroup? POUND END IF  LINE_TERMINATOR
    ;

cCElseIfGroup
    : POUND elseIf cCExpression THEN?  LINE_TERMINATOR cCStatement*
    ;

cCElseGroup
    : POUND ELSE  LINE_TERMINATOR cCStatement*
    ;

regionStart
    : regionStatement*
    ;

regionStatement
    : regionGroup
    ;

regionGroup
    : POUND REGION stringLiteral  LINE_TERMINATOR
      regionStatement*
      POUND END REGION  LINE_TERMINATOR
    ;

// 4. General concepts

accessModifier
    : PUBLIC
    | PROTECTED
    | FRIEND
    | PRIVATE
    | PROTECTED FRIEND
    ;

typeParameterList
    : LEFT_PAREN OF typeParameter ( COMMA typeParameter )* RIGHT_PAREN
    ;

typeParameter
    : varianceModifier? identifier typeParameterConstraints?
    ;

varianceModifier
    : IN | OUT
    ;

typeParameterConstraints
    : AS constraint
    | AS LEFT_BRACE constraintList RIGHT_BRACE
    ;

constraintList
    : constraint ( COMMA constraint )*
    ;

constraint
    : typeName
    | NEW
    | STRUCTURE
    | CLASS
    ;

// 5. attributes

attributes
    : attributeBlock+
    ;

attributeBlock
    :  LINE_TERMINATOR? LEFT_ARROW attributeList LINE_TERMINATOR? RIGHT_ARROW LINE_TERMINATOR?
    ;

attributeList
    : attribute ( COMMA attribute )*
    ;

attribute
    : ( attributeModifier COLON )? simpleTypeName
    ( LEFT_PAREN attributeArguments? RIGHT_PAREN )?
    ;

attributeModifier
    : ASSEMBLY | MODULE
    ;

attributeArguments
    : attributePositionalArgumentList
    | attributePositionalArgumentList COMMA variablePropertyInitializerList
    | variablePropertyInitializerList
    ;

attributePositionalArgumentList
    : attributeArgumentExpression ( COMMA attributeArgumentExpression? )*
    ;

variablePropertyInitializerList
    : variablePropertyInitializer ( COMMA variablePropertyInitializer )*
    ;

variablePropertyInitializer
    : identifierOrKeyword COLON EQUALS attributeArgumentExpression
    ;

attributeArgumentExpression
    : constantExpression
    | getTypeExpression
    | arrayExpression
    ;

// 6. Source files and namespaces

statementTerminator
    : LINE_TERMINATOR
    | COLON
    | EOF
    ;

attributesStatement
    : attributes statementTerminator
    ;

optionStatement
    : optionExplicitStatement
    | optionStrictStatement
    | optionCompareStatement
    | optionInferStatement
    ;

optionExplicitStatement
    : OPTION EXPLICIT onOff? statementTerminator
    ;

onOff
    : ON | OFF
    ;

optionStrictStatement
    : OPTION STRICT onOff? statementTerminator
    ;

optionCompareStatement
    : OPTION COMPARE compareOption statementTerminator
    ;

compareOption
    : BINARY | TEXT
    ;

optionInferStatement
    : OPTION INFER onOff? statementTerminator
    ;

importsStatement
    : IMPORTS importsClauses statementTerminator
    ;

importsClauses
    : importsClause ( COMMA importsClause )*
    ;

importsClause
    : aliasImportsClause
    | membersImportsClause
    | xMLNamespaceImportsClause
    ;

aliasImportsClause
    : identifier EQUALS typeName
    ;

membersImportsClause
    : typeName
    ;

xMLNamespaceImportsClause
    : LEFT_ARROW xMLNamespaceAttributeName XMLWhitespace? EQUALS XMLWhitespace?
      xMLNamespaceValue RIGHT_ARROW
    ;

xMLNamespaceValue
    : DOUBLE_QUOTE_CHARACTER xMLAttributeDoubleQuoteValueCharacter* DOUBLE_QUOTE_CHARACTER
    | SINGLE_QUOTE_CHAR xMLAttributeSingleQuoteValueCharacter* SINGLE_QUOTE_CHAR
    ;

namespaceDeclaration
    : NAMESPACE namespaceName statementTerminator
      namespaceMemberDeclaration*
      END NAMESPACE statementTerminator
    ;

namespaceName
    : relativeNamespaceName
    | GLOBAL
    | GLOBAL PERIOD relativeNamespaceName
    ;

relativeNamespaceName
    : identifier ( PERIOD identifierOrKeyword )*
    ;

namespaceMemberDeclaration
    : namespaceDeclaration
    | typeDeclaration
    ;

typeDeclaration
    : moduleDeclaration
    | nonModuleDeclaration
    ;

nonModuleDeclaration
    : enumDeclaration
    | structureDeclaration
    | interfaceDeclaration
    | classDeclaration
    | delegateDeclaration
    ;

// 7. Types

typeName
    : arrayTypeName
    | nonArrayTypeName
    ;

nonArrayTypeName
    : simpleTypeName
//    | nullableTypeName
    | nonArrayTypeName QUESTION_MARK
    ;

simpleTypeName
    : qualifiedTypeName
    | builtInTypeName
    ;

qualifiedTypeName
    : identifier typeArguments? (PERIOD identifierOrKeyword typeArguments?)*
    | GLOBAL PERIOD identifierOrKeyword typeArguments?
      (PERIOD identifierOrKeyword typeArguments?)*
    ;

typeArguments
    : LEFT_PAREN OF typeArgumentList RIGHT_PAREN
    ;

typeArgumentList
    : typeName ( COMMA typeName )*
    ;

builtInTypeName
    : OBJECT
    | primitiveTypeName
    ;

typeModifier
    : accessModifier
    | SHADOWS
    ;

identifierModifiers
    : nullableNameModifier? arrayNameModifier?
    ;

nullableNameModifier
    : QUESTION_MARK
    ;

typeImplementsClause
    : IMPLEMENTS typeImplements statementTerminator
    ;

typeImplements
    : nonArrayTypeName ( COMMA nonArrayTypeName )*
    ;

primitiveTypeName
    : numericTypeName
    | BOOLEAN
    | DATE
    | CHAR
    | STRING
    ;

numericTypeName
    : integralTypeName
    | floatingPointTypeName
    | DECIMAL
    ;

integralTypeName
    : BYTE | SBYTE | USHORT | SHORT | UINTEGER | INTEGER | ULONG | LONG
    ;

floatingPointTypeName
    : SINGLE | DOUBLE
    ;

enumDeclaration
    : attributes? typeModifier* ENUM identifier
      ( AS nonArrayTypeName )? statementTerminator
      enumMemberDeclaration+
      END ENUM statementTerminator
    ;

enumMemberDeclaration
    : attributes? identifier ( EQUALS constantExpression )? statementTerminator
    ;

classDeclaration
    : attributes? classModifier* CLASS identifier typeParameterList? statementTerminator
      classBase?
      typeImplementsClause*
      classMemberDeclaration*
      END CLASS statementTerminator
    ;

classModifier
    : typeModifier
    | MUST_INHERIT
    | NOT_INHERITABLE
    | PARTIAL
    ;

classBase
    : INHERITS nonArrayTypeName statementTerminator
    ;

classMemberDeclaration
    : nonModuleDeclaration
    | eventMemberDeclaration
    | variableMemberDeclaration
    | constantMemberDeclaration
    | methodMemberDeclaration
    | propertyMemberDeclaration
    | constructorMemberDeclaration
    | operatorDeclaration
    ;

structureDeclaration
    : attributes? structureModifier* STRUCTURE identifier
      typeParameterList? statementTerminator
      typeImplementsClause*
      structMemberDeclaration*
      END STRUCTURE statementTerminator
    ;

structureModifier
    : typeModifier
    | PARTIAL
    ;

structMemberDeclaration
    : nonModuleDeclaration
    | variableMemberDeclaration
    | constantMemberDeclaration
    | eventMemberDeclaration
    | methodMemberDeclaration
    | propertyMemberDeclaration
    | constructorMemberDeclaration
    | operatorDeclaration
    ;

moduleDeclaration
    : attributes? typeModifier* MODULE identifier statementTerminator
      moduleMemberDeclaration*
      END MODULE statementTerminator
    ;

moduleMemberDeclaration
    : nonModuleDeclaration
    | variableMemberDeclaration
    | constantMemberDeclaration
    | eventMemberDeclaration
    | methodMemberDeclaration
    | propertyMemberDeclaration
    | constructorMemberDeclaration
    ;

interfaceDeclaration
    : attributes? typeModifier* INTERFACE identifier
      typeParameterList? statementTerminator
      interfaceBase*
      interfaceMemberDeclaration*
      END INTERFACE statementTerminator
    ;

interfaceBase
    : INHERITS interfaceBases statementTerminator
    ;

interfaceBases
    : nonArrayTypeName ( COMMA nonArrayTypeName )*
    ;

interfaceMemberDeclaration
    : nonModuleDeclaration
    | interfaceEventMemberDeclaration
    | interfaceMethodMemberDeclaration
    | interfacePropertyMemberDeclaration
    ;

arrayTypeName
    : nonArrayTypeName arrayTypeModifiers
    ;

arrayTypeModifiers
    : arrayTypeModifier+
    ;

arrayTypeModifier
    : LEFT_PAREN rankList? RIGHT_PAREN
    ;

rankList
    : COMMA+
    ;

arrayNameModifier
    : arrayTypeModifiers
    | arraySizeInitializationModifier
    ;

delegateDeclaration
    : attributes? typeModifier* DELEGATE methodSignature statementTerminator
    ;

methodSignature
    : subSignature
    | functionSignature
    ;

// 9. Type members

implementsClause
    : IMPLEMENTS implementsList
    ;

implementsList
    : interfaceMemberSpecifier ( COMMA interfaceMemberSpecifier )*
    ;

interfaceMemberSpecifier
    : nonArrayTypeName PERIOD identifierOrKeyword
    ;

methodMemberDeclaration
    : methodDeclaration
    | externalMethodDeclaration
    ;

interfaceMethodMemberDeclaration
    : interfaceMethodDeclaration
    ;

methodDeclaration
    : subDeclaration
    | mustOverrideSubDeclaration
    | functionDeclaration
    | mustOverrideFunctionDeclaration
    ;

interfaceMethodDeclaration
    : interfaceSubDeclaration
    | interfaceFunctionDeclaration
    ;

subSignature
    : SUB identifier typeParameterList?
      ( LEFT_PAREN parameterList? RIGHT_PAREN )?
    ;

functionSignature
    : FUNCTION identifier typeParameterList?
      ( LEFT_PAREN parameterList? RIGHT_PAREN )?
      ( AS attributes? typeName )?
    ;

subDeclaration
    : attributes? procedureModifier* subSignature
      handlesOrImplements? LINE_TERMINATOR
      block
      END SUB statementTerminator
    ;

mustOverrideSubDeclaration
    : attributes? mustOverrideProcedureModifier+ subSignature
      handlesOrImplements? statementTerminator
    ;

interfaceSubDeclaration
    : attributes? interfaceProcedureModifier* subSignature statementTerminator
    ;

functionDeclaration
    : attributes? procedureModifier* functionSignature
    //: functionSignature
      handlesOrImplements? LINE_TERMINATOR
      block
      END FUNCTION statementTerminator
    ;

mustOverrideFunctionDeclaration
    : attributes? mustOverrideProcedureModifier+ functionSignature
      handlesOrImplements? statementTerminator
    ;

interfaceFunctionDeclaration
    : attributes? interfaceProcedureModifier* functionSignature statementTerminator
    ;

procedureModifier
    : accessModifier | SHADOWS | SHARED | OVERRIDABLE | NOTOVERRIDABLE | OVERRIDES
    | OVERLOADS | PARTIAL | ITERATOR | ASYNC
    ;

mustOverrideProcedureModifier
    : procedureModifier
    | MUSTOVERRIDE
    ;

interfaceProcedureModifier
    : SHADOWS | OVERLOADS
    ;

handlesOrImplements
    : handlesClause
    | implementsClause
    ;

externalMethodDeclaration
    : externalSubDeclaration
    | externalFunctionDeclaration
    ;

externalSubDeclaration
    : attributes? externalMethodModifier* DECLARE charsetModifier? SUB
      identifier libraryClause aliasClause?
      ( LEFT_PAREN parameterList? RIGHT_PAREN )? statementTerminator
    ;

externalFunctionDeclaration
    : attributes? externalMethodModifier* DECLARE charsetModifier? FUNCTION
      identifier libraryClause aliasClause?
      ( LEFT_PAREN parameterList? RIGHT_PAREN )?
      ( AS attributes? typeName )?
      statementTerminator
    ;

externalMethodModifier
    : accessModifier
    | SHADOWS
    | OVERLOADS
    ;

charsetModifier
    : ANSI | UNICODE | AUTO
    ;

libraryClause
    : LIB stringLiteral
    ;

aliasClause
    : ALIAS stringLiteral
    ;

parameterList
    : parameter ( COMMA parameter )*
    ;

parameter
    : attributes? parameterModifier* parameterIdentifier ( AS typeName )?
      ( EQUALS constantExpression )?
    ;

parameterModifier
    : BYVAL | BYREF | OPTIONAL | PARAM_ARRAY
    ;

parameterIdentifier
    : identifier identifierModifiers
    ;

handlesClause
    : ( HANDLES eventHandlesList )
    ;

eventHandlesList
    : eventMemberSpecifier ( COMMA eventMemberSpecifier )*
    ;

eventMemberSpecifier
    : identifier PERIOD identifierOrKeyword
    | MYBASE PERIOD identifierOrKeyword
    | MYCLASS PERIOD identifierOrKeyword
    | ME PERIOD identifierOrKeyword
    ;

constructorMemberDeclaration
    : attributes? constructorModifier* SUB NEW
      ( LEFT_PAREN parameterList? RIGHT_PAREN )? LINE_TERMINATOR
      block?
      END SUB statementTerminator
    ;

constructorModifier
    : accessModifier
    | SHARED
    ;

eventMemberDeclaration
    : regularEventMemberDeclaration
    | customEventMemberDeclaration
    ;

regularEventMemberDeclaration
    : attributes? eventModifiers* EVENT
      identifier parametersOrType implementsClause? statementTerminator
    ;

interfaceEventMemberDeclaration
    : attributes? interfaceEventModifiers* EVENT
      identifier parametersOrType statementTerminator
    ;

parametersOrType
    : ( LEFT_PAREN parameterList? RIGHT_PAREN )?
    | AS nonArrayTypeName
    ;

eventModifiers
    : accessModifier
    | SHADOWS
    | SHARED
    ;

interfaceEventModifiers
    : SHADOWS
    ;

customEventMemberDeclaration
    : attributes? eventModifiers* CUSTOM EVENT
      identifier AS typeName implementsClause? statementTerminator
      eventAccessorDeclaration+
      END EVENT statementTerminator
    ;

eventAccessorDeclaration
    : addHandlerDeclaration
    | removeHandlerDeclaration
    | raiseEventDeclaration
    ;

addHandlerDeclaration
    : attributes? ADDHANDLER
      LEFT_PAREN parameterList RIGHT_PAREN LINE_TERMINATOR
      block?
      END ADDHANDLER statementTerminator
    ;

removeHandlerDeclaration
    : attributes? REMOVEHANDLER
      LEFT_PAREN parameterList RIGHT_PAREN LINE_TERMINATOR
      block?
      END REMOVEHANDLER statementTerminator
    ;

raiseEventDeclaration
    : attributes? RAISEEVENT
      LEFT_PAREN parameterList RIGHT_PAREN LINE_TERMINATOR
      block?
      END RAISEEVENT statementTerminator
    ;

constantMemberDeclaration
    : attributes? constantModifier* CONST constantDeclarators statementTerminator
    ;

constantModifier
    : accessModifier
    | SHADOWS
    ;

constantDeclarators
    : constantDeclarator ( COMMA constantDeclarator )*
    ;

constantDeclarator
    : identifier ( AS typeName )? EQUALS constantExpression statementTerminator
    ;

variableMemberDeclaration
    : attributes? variableModifier+ variableDeclarators statementTerminator
    ;

variableModifier
    : accessModifier
    | SHADOWS
    | SHARED
    | READONLY
    | WITH_EVENTS
    | DIM
    ;

variableDeclarators
    : variableDeclarator ( COMMA variableDeclarator )*
    ;

variableDeclarator
    : variableIdentifiers AS objectCreationExpression
    | variableIdentifiers ( AS typeName )? ( EQUALS expression )?
    ;

variableIdentifiers
    : variableIdentifier ( COMMA variableIdentifier )*
    ;

variableIdentifier
    : identifier identifierModifiers
    ;

arraySizeInitializationModifier
    : LEFT_PAREN boundList RIGHT_PAREN arrayTypeModifiers?
    ;

boundList
    : bound ( COMMA bound )*
    ;

bound
    : expression
    | ZERO TO expression
    ;

propertyMemberDeclaration
    : regularPropertyMemberDeclaration
    | mustOverridePropertyMemberDeclaration
    | autoPropertyMemberDeclaration
    ;

propertySignature
    : PROPERTY
      identifier ( LEFT_PAREN parameterList? RIGHT_PAREN )?
      ( AS attributes? typeName )?
    ;

regularPropertyMemberDeclaration
    : attributes? propertyModifier* propertySignature
      implementsClause? LINE_TERMINATOR
      propertyAccessorDeclaration+
      END PROPERTY statementTerminator
    ;

mustOverridePropertyMemberDeclaration
    : attributes? mustOverridePropertyModifier+ propertySignature
      implementsClause? statementTerminator
    ;

autoPropertyMemberDeclaration
    : attributes? autoPropertyModifier* PROPERTY identifier
      ( LEFT_PAREN parameterList? RIGHT_PAREN )?
      ( AS attributes? typeName )? ( EQUALS expression )?
      implementsClause? LINE_TERMINATOR
    | attributes? autoPropertyModifier* PROPERTY identifier
      ( LEFT_PAREN parameterList? RIGHT_PAREN )?
      AS attributes? NEW
      ( nonArrayTypeName ( LEFT_PAREN argumentList? RIGHT_PAREN )? )?
      objectCreationExpressionInitializer?
      implementsClause? LINE_TERMINATOR
    ;

interfacePropertyMemberDeclaration
    : attributes? interfacePropertyModifier* propertySignature statementTerminator
    ;

autoPropertyModifier
    : accessModifier
    | SHADOWS
    | SHARED
    | OVERRIDABLE
    | NOTOVERRIDABLE
    | OVERRIDES
    | OVERLOADS
    ;

propertyModifier
    : autoPropertyModifier
    | DEFAULT
    | READONLY
    | WRITEONLY
    | ITERATOR
    ;

mustOverridePropertyModifier
    : propertyModifier
    | MUSTOVERRIDE
    ;

interfacePropertyModifier
    : SHADOWS
    | OVERLOADS
    | DEFAULT
    | READONLY
    | WRITEONLY
    ;

propertyAccessorDeclaration
    : propertyGetDeclaration
    | propertySetDeclaration
    ;

propertyGetDeclaration
    : attributes? accessModifier? GET LINE_TERMINATOR
      block?
      END GET statementTerminator
    ;

propertySetDeclaration
    : attributes? accessModifier? SET
      ( LEFT_PAREN parameterList? RIGHT_PAREN )? LINE_TERMINATOR
      block?
      END SET statementTerminator
    ;

operatorDeclaration
    : attributes? operatorModifier* OPERATORKEYWORD overloadableOperator
      LEFT_PAREN parameterList RIGHT_PAREN
      ( AS attributes? typeName )? LINE_TERMINATOR
      block?
      END OPERATORKEYWORD statementTerminator
    ;

operatorModifier
    : PUBLIC | SHARED | OVERLOADS | SHADOWS | WIDENING | NARROWING
    ;

overloadableOperator
    : cCPlusMinus | ASTERISK | SLASH | DOUBLE_BACK_SLASH | AMPERSAND | LIKE | MOD | AND | OR | XOR
    | CARET | LEFT_ARROW LEFT_ARROW | RIGHT_ARROW RIGHT_ARROW | EQUALS | LEFT_ARROW RIGHT_ARROW | RIGHT_ARROW | LEFT_ARROW | RIGHT_ARROW EQUALS | LEFT_ARROW EQUALS
    | NOT | IS_TRUE | IS_FALSE | CTYPE
    ;

// 10. statements

statement
    : labelDeclarationStatement
    | localDeclarationStatement
    | withStatement
    | syncLockStatement
    | eventStatement
    | assignmentStatement
    | invocationStatement
    | conditionalStatement
    | loopStatement
    | errorHandlingStatement
    | branchStatement
    | arrayHandlingStatement
    | usingStatement
	| awaitStatement
	| yieldStatement
    ;

block
    : statements
    ;

labelDeclarationStatement
    : labelName COLON
    ;

labelName
    : identifier
    | intLiteral
    ;

statements
    : statement ( COLON statement? )*
    | ( COLON statement? )+
    ;

localDeclarationStatement
    : localModifier variableDeclarators statementTerminator
    ;

localModifier
    : STATIC | DIM | CONST
    ;

withStatement
    : WITH expression statementTerminator
      block?
      END WITH statementTerminator
    ;

syncLockStatement
    : SYNCLOCK expression statementTerminator
      block?
      END SYNCLOCK statementTerminator
    ;

eventStatement
    : raiseEventStatement
    | addHandlerStatement
    | removeHandlerStatement
    ;

raiseEventStatement
    : RAISEEVENT identifierOrKeyword
      ( LEFT_PAREN argumentList? RIGHT_PAREN )? statementTerminator
    ;

addHandlerStatement
    : ADDHANDLER expression COMMA expression statementTerminator
    ;

removeHandlerStatement
    : REMOVEHANDLER expression COMMA expression statementTerminator
    ;

assignmentStatement
    : regularAssignmentStatement
    | compoundAssignmentStatement
    | midAssignmentStatement
    ;

regularAssignmentStatement
    : expression EQUALS expression statementTerminator
    ;

compoundAssignmentStatement
    : expression compoundBinaryOperator LINE_TERMINATOR? expression statementTerminator
    ;

compoundBinaryOperator
    : CARET EQUALS | ASTERISK EQUALS | SLASH EQUALS | DOUBLE_BACK_SLASH EQUALS | PLUS EQUALS | MINUS EQUALS
    | AMPERSAND EQUALS | LEFT_ARROW LEFT_ARROW EQUALS | RIGHT_ARROW RIGHT_ARROW EQUALS
    ;

midAssignmentStatement
    : MID DOLLAR? LEFT_PAREN expression COMMA expression
      ( COMMA expression )? RIGHT_PAREN EQUALS expression statementTerminator
    ;

invocationStatement
    : CALL? expression ( LEFT_PAREN argumentList? RIGHT_PAREN )? statementTerminator
    ;

conditionalStatement
    : ifStatement
    | selectStatement
    ;

ifStatement
    : blockIfStatement
    | lineIfThenStatement
    ;

blockIfStatement
    : IF booleanExpression THEN? statementTerminator
      block?
      elseIfStatement*
      elseStatement?
      END IF statementTerminator
    ;

elseIfStatement
    : elseIf booleanExpression THEN? statementTerminator
      block?
    ;

elseStatement
    : ELSE statementTerminator
      block?
    ;

lineIfThenStatement
    : IF booleanExpression THEN statements ( ELSE statements )? statementTerminator
    ;

selectStatement
    : SELECT CASE? expression statementTerminator
      caseStatement*
      caseElseStatement?
      END SELECT statementTerminator
    ;

caseStatement
    : CASE caseClauses statementTerminator
      block?
    ;

caseClauses
    : caseClause ( COMMA caseClause )*
    ;

caseClause
    : ( IS LINE_TERMINATOR? )? comparisonOperator LINE_TERMINATOR? expression
    | expression ( TO expression )?
    ;

comparisonOperator
    : EQUALS | LEFT_ARROW RIGHT_ARROW | LEFT_ARROW | RIGHT_ARROW | RIGHT_ARROW EQUALS | LEFT_ARROW EQUALS
    ;

caseElseStatement
    : CASE ELSE statementTerminator
      block?
    ;

loopStatement
    : whileStatement
    | doLoopStatement
    | forStatement
    | forEachStatement
    ;

whileStatement
    : WHILE booleanExpression statementTerminator
      block?
      END WHILE statementTerminator
    ;

doLoopStatement
    : doTopLoopStatement
    | doBottomLoopStatement
    ;

doTopLoopStatement
    : DO ( whileOrUntil booleanExpression )? statementTerminator
      block?
      LOOP statementTerminator
    ;

doBottomLoopStatement
    : DO statementTerminator
      block?
      LOOP whileOrUntil booleanExpression statementTerminator
    ;

whileOrUntil
    : WHILE | UNTIL
    ;

forStatement
    : FOR loopControlVariable EQUALS expression TO expression
      ( STEP expression )? statementTerminator
      block?
      ( NEXT nextExpressionList? statementTerminator )?
    ;

loopControlVariable
    : identifier ( identifierModifiers AS typeName )?
    | expression
    ;

nextExpressionList
    : expression ( COMMA expression )*
    ;

forEachStatement
    : FOR EACH loopControlVariable IN LINE_TERMINATOR? expression statementTerminator
      block?
      ( NEXT nextExpressionList? statementTerminator )?
    ;

errorHandlingStatement
    : structuredErrorStatement
    | unstructuredErrorStatement
    ;

structuredErrorStatement
    : throwStatement
    | tryStatement
    ;

tryStatement
    : TRY statementTerminator
      block?
      catchStatement*
      finallyStatement?
      END TRY statementTerminator
    ;

finallyStatement
    : FINALLY statementTerminator
      block?
    ;

catchStatement
    : CATCH ( identifier ( AS nonArrayTypeName )? )?
	  ( WHEN booleanExpression )? statementTerminator
      block?
    ;

throwStatement
    : THROW expression? statementTerminator
    ;

unstructuredErrorStatement
    : errorStatement
    | onErrorStatement
    | resumeStatement
    ;

errorStatement
    : ERROR expression statementTerminator
    ;

onErrorStatement
    : ON ERROR errorClause statementTerminator
    ;

errorClause
    : GOTO MINUS ONE
    | GOTO ZERO
    | goToStatement
    | RESUME NEXT
    ;

resumeStatement
    : RESUME resumeClause? statementTerminator
    ;

resumeClause
    : NEXT
    | labelName
    ;

branchStatement
    : goToStatement
    | exitStatement
    | continueStatement
    | stopStatement
    | endStatement
    | returnStatement
    ;

goToStatement
    : GOTO labelName statementTerminator
    ;

exitStatement
    : EXIT exitKind statementTerminator
    ;

exitKind
    : DO | FOR | WHILE | SELECT | SUB | FUNCTION | PROPERTY | TRY
    ;

continueStatement
    : CONTINUE continueKind statementTerminator
    ;

continueKind
    : DO | FOR | WHILE
    ;

stopStatement
    : STOP statementTerminator
    ;

endStatement
    : END statementTerminator
    ;

returnStatement
    : RETURN expression? statementTerminator
    ;

arrayHandlingStatement
    : redimStatement
    | eraseStatement
    ;

redimStatement
    : REDIM PRESERVE? redimClauses statementTerminator
    ;

redimClauses
    : redimClause ( COMMA redimClause )*
    ;

redimClause
    : expression arraySizeInitializationModifier
    ;

eraseStatement
    : ERASE eraseExpressions statementTerminator
    ;

eraseExpressions
    : expression ( COMMA expression )*
    ;

usingStatement
    : USING usingResources statementTerminator
      block?
      END USING statementTerminator
    ;

usingResources
    : variableDeclarators
    | expression
    ;

awaitStatement
    : awaitOperatorExpression statementTerminator
    ;

yieldStatement
    : YIELD expression statementTerminator
    ;

// 11. Expressions

expression
    : simpleExpression
    | getTypeExpression
    | typeOfIsExpression
    | expression IS LINE_TERMINATOR? expression
    | expression ISNOT LINE_TERMINATOR? expression
    | getXmlNamespaceExpression
    | newExpression
    | castExpression
    | unaryPlusExpression
    | unaryMinusExpression
    | expression PLUS LINE_TERMINATOR? expression
    | expression MINUS LINE_TERMINATOR? expression
    | expression ASTERISK LINE_TERMINATOR? expression
    | expression SLASH LINE_TERMINATOR? expression
    | expression DOUBLE_BACK_SLASH LINE_TERMINATOR? expression
    | expression MOD LINE_TERMINATOR? expression
    | expression CARET LINE_TERMINATOR? expression
    | expression EQUALS LINE_TERMINATOR? expression
    | expression LEFT_ARROW RIGHT_ARROW LINE_TERMINATOR? expression
    | expression LEFT_ARROW LINE_TERMINATOR? expression
    | expression RIGHT_ARROW LINE_TERMINATOR? expression
    | expression LEFT_ARROW EQUALS LINE_TERMINATOR? expression
    | expression RIGHT_ARROW EQUALS LINE_TERMINATOR? expression
    | expression LIKE LINE_TERMINATOR? expression
    | expression AMPERSAND LINE_TERMINATOR? expression
    | expression ANDALSO LINE_TERMINATOR? expression
    | expression ORELSE LINE_TERMINATOR? expression
    | NOT expression
    | expression AND LINE_TERMINATOR? expression
    | expression OR LINE_TERMINATOR? expression
    | expression XOR LINE_TERMINATOR? expression
    | expression LEFT_ARROW LEFT_ARROW LINE_TERMINATOR? expression
    | expression RIGHT_ARROW RIGHT_ARROW LINE_TERMINATOR? expression
    | awaitOperatorExpression
    | conditionalExpression
    | lambdaExpression
    | queryExpression
    | xMLLiteralExpression
    | expression PERIOD LINE_TERMINATOR? LEFT_ARROW xMLQualifiedName RIGHT_ARROW
    | expression PERIOD LINE_TERMINATOR? AT LINE_TERMINATOR? LEFT_ARROW xMLQualifiedName RIGHT_ARROW
    | expression PERIOD LINE_TERMINATOR? AT LINE_TERMINATOR? identifierOrKeyword
    | expression PERIOD PERIOD PERIOD  LINE_TERMINATOR? LEFT_ARROW xMLQualifiedName 
    | expression ( LEFT_PAREN argumentList? RIGHT_PAREN )+
    | expression LEFT_PAREN argumentList? RIGHT_PAREN
    | expression PERIOD identifierOrKeyword ( LEFT_PAREN OF typeArgumentList RIGHT_PAREN )?
    | memberAccessBase? PERIOD identifierOrKeyword ( LEFT_PAREN OF typeArgumentList RIGHT_PAREN )?
    | expression EXCLAMATION identifierOrKeyword
    ;

memberAccessBase
    : nonArrayTypeName
    | GLOBAL
    | MYCLASS
    | MYBASE
    ;

constantExpression
    : expression
    ;

simpleExpression
    : literalExpression
    | parenthesizedExpression
    | instanceExpression
    | simpleNameExpression
    | addressOfExpression
    ;

literalExpression
    : literal
    ;

parenthesizedExpression
    : LEFT_PAREN expression RIGHT_PAREN
    ;

instanceExpression
    : ME
    ;

simpleNameExpression
    : identifier ( LEFT_PAREN OF typeArgumentList RIGHT_PAREN )?
    ;

addressOfExpression
    : ADDRESSOF expression
    ;

getTypeExpression
    : GETTYPE LEFT_PAREN getTypeTypeName RIGHT_PAREN
    ;

getTypeTypeName
    : typeName
    | qualifiedOpenTypeName
    ;

qualifiedOpenTypeName
    : identifier typeArityList? (PERIOD identifierOrKeyword typeArityList?)*
    | GLOBAL PERIOD identifierOrKeyword typeArityList?
      (PERIOD identifierOrKeyword typeArityList?)*
    ;

typeArityList
    : LEFT_PAREN OF commaList? RIGHT_PAREN
    ;

commaList
    : COMMA COMMA*
    ;

typeOfIsExpression
    : TYPEOF expression IS  LINE_TERMINATOR? typeName
    ;

getXmlNamespaceExpression
    : GET_XML_NAMESPACE LEFT_PAREN xMLNamespaceName? RIGHT_PAREN
    ;

argumentList
    : positionalArgumentList
    | positionalArgumentList COMMA namedArgumentList
    | namedArgumentList
    ;

positionalArgumentList
    : expression ( COMMA expression? )*
    ;

namedArgumentList
    : identifierOrKeyword COLON EQUALS expression
      ( COMMA identifierOrKeyword COLON EQUALS expression )*
    ;

newExpression
    : objectCreationExpression
    | arrayExpression
    | anonymousObjectCreationExpression
    ;

objectCreationExpression
    : NEW nonArrayTypeName ( LEFT_PAREN argumentList? RIGHT_PAREN )?
      objectCreationExpressionInitializer?
    ;

objectCreationExpressionInitializer
    : objectMemberInitializer
    | objectCollectionInitializer
    ;

objectMemberInitializer
    : WITH LEFT_BRACE fieldInitializerList RIGHT_BRACE
    ;

fieldInitializerList
    : fieldInitializer ( COMMA fieldInitializer )*
    ;

fieldInitializer
    : KEY? (PERIOD identifierOrKeyword EQUALS )? expression
    ;

objectCollectionInitializer
    : FROM collectionInitializer
    ;

collectionInitializer
    : LEFT_BRACE collectionElementList? RIGHT_BRACE
    ;

collectionElementList
    : collectionElement ( COMMA collectionElement )*
    ;

collectionElement
    : expression
    | collectionInitializer
    ;

arrayExpression
    : arrayCreationExpression
    | arrayLiteralExpression
    ;

arrayCreationExpression
    : NEW nonArrayTypeName arrayNameModifier collectionInitializer
    ;

arrayLiteralExpression
    : collectionInitializer
    ;

anonymousObjectCreationExpression
    : NEW objectMemberInitializer
    ;

castExpression
    : DIRECTCAST LEFT_PAREN expression COMMA typeName RIGHT_PAREN
    | TRYCAST LEFT_PAREN expression COMMA typeName RIGHT_PAREN
    | CTYPE LEFT_PAREN expression COMMA typeName RIGHT_PAREN
    | castTarget LEFT_PAREN expression RIGHT_PAREN
    ;

castTarget
    : CBOOL | CBYTE | CCHAR  | CDATE  | CDEC | CDBL | CINT
    | CLNG  | COBJ  | CSBYTE | CSHORT | CSNG | CSTR | CUINT
    | CULNG | CUSHORT
    ;

unaryPlusExpression
    : PLUS expression
    ;

unaryMinusExpression
    : MINUS expression
    ;

booleanExpression
    : expression
    ;

lambdaExpression
    : singleLineLambda
    | multiLineLambda
    ;

singleLineLambda
    : lambdaModifier* FUNCTION ( LEFT_PAREN parameterList? RIGHT_PAREN )? expression
    | SUB ( LEFT_PAREN parameterList? RIGHT_PAREN )? statement
    ;

multiLineLambda
    : multiLineFunctionLambda
    | multiLineSubLambda
    ;

multiLineFunctionLambda
    : lambdaModifier* FUNCTION ( LEFT_PAREN parameterList? RIGHT_PAREN )? ( AS typeName )?  LINE_TERMINATOR
      block
      END FUNCTION
    ;

multiLineSubLambda
    : lambdaModifier* SUB ( LEFT_PAREN parameterList? RIGHT_PAREN )?  LINE_TERMINATOR
      block
      END SUB
    ;

lambdaModifier
    : ASYNC | ITERATOR
    ;

queryExpression
    : fromOrAggregateQueryOperator queryOperator*
    ;

fromOrAggregateQueryOperator
    : fromQueryOperator
    | aggregateQueryOperator
    ;

queryOperator
    : fromQueryOperator
    | aggregateQueryOperator
    | selectQueryOperator
    | distinctQueryOperator
    | whereQueryOperator
    | orderByQueryOperator
    | partitionQueryOperator
    | letQueryOperator
    | groupByQueryOperator
    | joinOrGroupJoinQueryOperator
    ;

joinOrGroupJoinQueryOperator
    : joinQueryOperator
    | groupJoinQueryOperator
    ;

collectionRangeVariableDeclarationList
    : collectionRangeVariableDeclaration ( COMMA collectionRangeVariableDeclaration )*
    ;

collectionRangeVariableDeclaration
    : identifier ( AS typeName )? IN  LINE_TERMINATOR? expression
    ;

expressionRangeVariableDeclarationList
    : expressionRangeVariableDeclaration ( COMMA expressionRangeVariableDeclaration )*
    ;

expressionRangeVariableDeclaration
    : identifier ( AS typeName )? EQUALS expression
    ;

fromQueryOperator
    :  LINE_TERMINATOR? FROM  LINE_TERMINATOR? collectionRangeVariableDeclarationList
    ;

joinQueryOperator
    :  LINE_TERMINATOR? JOIN  LINE_TERMINATOR? collectionRangeVariableDeclaration
      joinOrGroupJoinQueryOperator?  LINE_TERMINATOR? ON  LINE_TERMINATOR? joinConditionList
    ;

joinConditionList
    : joinCondition ( AND  LINE_TERMINATOR? joinCondition )*
    ;

joinCondition
    : expression EQUALSKEYWORD  LINE_TERMINATOR? expression
    ;

letQueryOperator
    :  LINE_TERMINATOR? LET  LINE_TERMINATOR? expressionRangeVariableDeclarationList
    ;

selectQueryOperator
    :  LINE_TERMINATOR? SELECT  LINE_TERMINATOR? expressionRangeVariableDeclarationList
    ;

distinctQueryOperator
    :  LINE_TERMINATOR? DISTINCT  LINE_TERMINATOR?
    ;

whereQueryOperator
    :  LINE_TERMINATOR? WHERE  LINE_TERMINATOR? booleanExpression
    ;

partitionQueryOperator
    :  LINE_TERMINATOR? TAKE  LINE_TERMINATOR? expression
    |  LINE_TERMINATOR? TAKE WHILE  LINE_TERMINATOR? booleanExpression
    |  LINE_TERMINATOR? SKIP_KEYWORD  LINE_TERMINATOR? expression
    |  LINE_TERMINATOR? SKIP_KEYWORD WHILE  LINE_TERMINATOR? booleanExpression
    ;

orderByQueryOperator
    :  LINE_TERMINATOR? ORDER BY  LINE_TERMINATOR? orderExpressionList
    ;

orderExpressionList
    : orderExpression ( COMMA orderExpression )*
    ;

orderExpression
    : expression ordering?
    ;

ordering
    : ASCENDING | DESCENDING
    ;

groupByQueryOperator
    :  LINE_TERMINATOR? GROUP (  LINE_TERMINATOR? expressionRangeVariableDeclarationList )?
       LINE_TERMINATOR? BY  LINE_TERMINATOR? expressionRangeVariableDeclarationList
       LINE_TERMINATOR? INTO  LINE_TERMINATOR? expressionRangeVariableDeclarationList
    ;

aggregateQueryOperator
    :  LINE_TERMINATOR? AGGREGATE  LINE_TERMINATOR? collectionRangeVariableDeclaration queryOperator*
       LINE_TERMINATOR? INTO  LINE_TERMINATOR? expressionRangeVariableDeclarationList
    ;

groupJoinQueryOperator
    :  LINE_TERMINATOR? GROUP JOIN  LINE_TERMINATOR? collectionRangeVariableDeclaration
      joinOrGroupJoinQueryOperator?  LINE_TERMINATOR? ON  LINE_TERMINATOR? joinConditionList
       LINE_TERMINATOR? INTO  LINE_TERMINATOR? expressionRangeVariableDeclarationList
    ;

conditionalExpression
    : IF LEFT_PAREN booleanExpression COMMA expression COMMA expression RIGHT_PAREN
    | IF LEFT_PAREN expression COMMA expression RIGHT_PAREN
    ;

xMLLiteralExpression
    : xMLDocument
    | xMLElement
    | xMLProcessingInstruction
    | xMLComment
    | xMLCDATASection
    ;

xMLEmbeddedExpression
    : LEFT_ARROW PERCENT EQUALS  LINE_TERMINATOR? expression  LINE_TERMINATOR? PERCENT RIGHT_ARROW
    ;

xMLDocument
    : xMLDocumentPrologue xMLMisc* xMLDocumentBody xMLMisc*
    ;

xMLDocumentPrologue
    : LEFT_ARROW QUESTION_MARK XML xMLVersion xMLEncoding? xMLStandalone? XMLWhitespace? QUESTION_MARK RIGHT_ARROW
    ;

xMLVersion
    : XMLWhitespace VERSION XMLWhitespace? EQUALS XMLWhitespace? xMLVersionNumberValue
    ;

xMLVersionNumberValue
    : SINGLE_QUOTE_CHAR ONE PERIOD ZERO SINGLE_QUOTE_CHAR
    | DOUBLE_QUOTE_CHARACTER ONE PERIOD ZERO DOUBLE_QUOTE_CHARACTER
    ;

xMLEncoding
    : XMLWhitespace ENCODING XMLWhitespace? EQUALS XMLWhitespace? xMLEncodingNameValue
    ;

xMLEncodingNameValue
    : SINGLE_QUOTE_CHAR xMLEncodingName SINGLE_QUOTE_CHAR
    | DOUBLE_QUOTE_CHARACTER xMLEncodingName DOUBLE_QUOTE_CHARACTER
    ;

xMLEncodingName
    : XMLLatinAlphaCharacter xMLEncodingNameCharacter*
    ;

xMLEncodingNameCharacter
    : XMLUnderscoreCharacter
    | XMLLatinAlphaCharacter
    | XMLNumericCharacter
    | XMLPeriodCharacter
    | XMLDashCharacter
    ;

xMLStandalone
    : XMLWhitespace STANDALONE XMLWhitespace? EQUALS XMLWhitespace? xMLYesNoValue
    ;

xMLYesNoValue
    : SINGLE_QUOTE_CHAR xMLYesNo SINGLE_QUOTE_CHAR
    | DOUBLE_QUOTE_CHARACTER xMLYesNo DOUBLE_QUOTE_CHARACTER
    ;

xMLYesNo
    : YES
    | NO
    ;

xMLMisc
    : xMLComment
    | xMLProcessingInstruction
    | XMLWhitespace
    ;

xMLDocumentBody
    : xMLElement
    | xMLEmbeddedExpression
    ;

xMLElement
    : xMLEmptyElement
    | xMLElementStart xMLContent xMLElementEnd
    ;

xMLEmptyElement
    : LEFT_ARROW xMLQualifiedNameOrExpression xMLAttribute* XMLWhitespace? SLASH RIGHT_ARROW
    ;

xMLElementStart
    : LEFT_ARROW xMLQualifiedNameOrExpression xMLAttribute* XMLWhitespace? RIGHT_ARROW
    ;

xMLElementEnd
    : LEFT_ARROW SLASH RIGHT_ARROW
    | LEFT_ARROW SLASH xMLQualifiedName XMLWhitespace? RIGHT_ARROW
    ;

xMLContent
    : XMLCharacterData? ( xMLNestedContent XMLCharacterData? )+
    ;

xMLNestedContent
    : xMLElement
    | xMLReference
    | xMLCDATASection
    | xMLProcessingInstruction
    | xMLComment
    | xMLEmbeddedExpression
    ;

xMLAttribute
    : XMLWhitespace xMLAttributeName XMLWhitespace? EQUALS XMLWhitespace? xMLAttributeValue
    | XMLWhitespace xMLEmbeddedExpression
    ;

xMLAttributeName
    : xMLQualifiedNameOrExpression
    | xMLNamespaceAttributeName
    ;

xMLAttributeValue
    : DOUBLE_QUOTE_CHARACTER xMLAttributeDoubleQuoteValueCharacter* DOUBLE_QUOTE_CHARACTER
    | SINGLE_QUOTE_CHAR xMLAttributeSingleQuoteValueCharacter* SINGLE_QUOTE_CHAR
    | xMLEmbeddedExpression
    ;

xMLAttributeDoubleQuoteValueCharacter
    : XMLNotDoubleQuote
    | xMLReference
    ;

xMLAttributeSingleQuoteValueCharacter
    : XMLNotSingleQuote
    | xMLReference
    ;

xMLReference
    : xMLEntityReference
    | xMLCharacterReference
    ;

xMLEntityReference
    : AMPERSAND XMLEntityName SEMICOLON
    ;

xMLCharacterReference
    : AMPERSAND POUND XMLNumericCharacter+ SEMICOLON
//    | AMPERSAND POUND XMLX XMLHexNumericCharacter+ SEMICOLON
    ;

xMLNamespaceAttributeName
    : xMLPrefixedNamespaceAttributeName
    | xMLDefaultNamespaceAttributeName
    ;

xMLPrefixedNamespaceAttributeName
    : XMLNS COLON xMLNamespaceName
    ;

xMLDefaultNamespaceAttributeName
    : XMLNS
    ;

xMLNamespaceName
    : XMLNamespaceNameStartCharacter xMLNamespaceNameCharacter*
    ;

xMLNamespaceNameCharacter
    : XMLLetter
    | UNDERSCORE
    ;

xMLQualifiedNameOrExpression
    : xMLQualifiedName
    | xMLEmbeddedExpression
    ;

xMLQualifiedName
    : xMLPrefixedName
    | xMLUnprefixedName
    ;

xMLPrefixedName
    : xMLNamespaceName COLON xMLNamespaceName
    ;

xMLUnprefixedName
    : xMLNamespaceName
    ;

xMLProcessingInstruction
    : LEFT_ARROW QUESTION_MARK XMLProcessingTarget ( XMLWhitespace XMLProcessingValue? )? QUESTION_MARK RIGHT_ARROW
    ;

xMLComment
    : LEFT_ARROW EXCLAMATION MINUS MINUS XMLCommentCharacter* MINUS MINUS RIGHT_ARROW
    ;

xMLCDATASection
    : LEFT_ARROW EXCLAMATION ( CDATA LEFT_SQUARE_BRACKET XMLCDATASectionString? RIGHT_SQUARE_BRACKET )? RIGHT_ARROW
    ;

awaitOperatorExpression
    : AWAIT expression
    ;

