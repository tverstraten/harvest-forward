/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-unused-vars */
// Generated from \tools\parsers\python\Python3Parser.g4 by ANTLR 4.8
// jshint ignore: start
var antlr4 = require('antlr4/index');

// This class defines a complete listener for a parse tree produced by Python3Parser.
function Python3ParserListener() {
    antlr4.tree.ParseTreeListener.call(this);
    return this;
}

Python3ParserListener.prototype = Object.create(antlr4.tree.ParseTreeListener.prototype);
Python3ParserListener.prototype.constructor = Python3ParserListener;

// Enter a parse tree produced by Python3Parser#single_input.
Python3ParserListener.prototype.enterSingle_input = function (ctx) {
};

// Exit a parse tree produced by Python3Parser#single_input.
Python3ParserListener.prototype.exitSingle_input = function (ctx) {
};


// Enter a parse tree produced by Python3Parser#file_input.
Python3ParserListener.prototype.enterFile_input = function (ctx) {
};

// Exit a parse tree produced by Python3Parser#file_input.
Python3ParserListener.prototype.exitFile_input = function (ctx) {
};


// Enter a parse tree produced by Python3Parser#eval_input.
Python3ParserListener.prototype.enterEval_input = function (ctx) {
};

// Exit a parse tree produced by Python3Parser#eval_input.
Python3ParserListener.prototype.exitEval_input = function (ctx) {
};


// Enter a parse tree produced by Python3Parser#decorator.
Python3ParserListener.prototype.enterDecorator = function (ctx) {
};

// Exit a parse tree produced by Python3Parser#decorator.
Python3ParserListener.prototype.exitDecorator = function (ctx) {
};


// Enter a parse tree produced by Python3Parser#decorators.
Python3ParserListener.prototype.enterDecorators = function (ctx) {
};

// Exit a parse tree produced by Python3Parser#decorators.
Python3ParserListener.prototype.exitDecorators = function (ctx) {
};


// Enter a parse tree produced by Python3Parser#decorated.
Python3ParserListener.prototype.enterDecorated = function (ctx) {
};

// Exit a parse tree produced by Python3Parser#decorated.
Python3ParserListener.prototype.exitDecorated = function (ctx) {
};


// Enter a parse tree produced by Python3Parser#async_funcdef.
Python3ParserListener.prototype.enterAsync_funcdef = function (ctx) {
};

// Exit a parse tree produced by Python3Parser#async_funcdef.
Python3ParserListener.prototype.exitAsync_funcdef = function (ctx) {
};


// Enter a parse tree produced by Python3Parser#funcdef.
Python3ParserListener.prototype.enterFuncdef = function (ctx) {
};

// Exit a parse tree produced by Python3Parser#funcdef.
Python3ParserListener.prototype.exitFuncdef = function (ctx) {
};


// Enter a parse tree produced by Python3Parser#parameters.
Python3ParserListener.prototype.enterParameters = function (ctx) {
};

// Exit a parse tree produced by Python3Parser#parameters.
Python3ParserListener.prototype.exitParameters = function (ctx) {
};


// Enter a parse tree produced by Python3Parser#typedargslist.
Python3ParserListener.prototype.enterTypedargslist = function (ctx) {
};

// Exit a parse tree produced by Python3Parser#typedargslist.
Python3ParserListener.prototype.exitTypedargslist = function (ctx) {
};


// Enter a parse tree produced by Python3Parser#tfpdef.
Python3ParserListener.prototype.enterTfpdef = function (ctx) {
};

// Exit a parse tree produced by Python3Parser#tfpdef.
Python3ParserListener.prototype.exitTfpdef = function (ctx) {
};


// Enter a parse tree produced by Python3Parser#varargslist.
Python3ParserListener.prototype.enterVarargslist = function (ctx) {
};

// Exit a parse tree produced by Python3Parser#varargslist.
Python3ParserListener.prototype.exitVarargslist = function (ctx) {
};


// Enter a parse tree produced by Python3Parser#vfpdef.
Python3ParserListener.prototype.enterVfpdef = function (ctx) {
};

// Exit a parse tree produced by Python3Parser#vfpdef.
Python3ParserListener.prototype.exitVfpdef = function (ctx) {
};


// Enter a parse tree produced by Python3Parser#stmt.
Python3ParserListener.prototype.enterStmt = function (ctx) {
};

// Exit a parse tree produced by Python3Parser#stmt.
Python3ParserListener.prototype.exitStmt = function (ctx) {
};


// Enter a parse tree produced by Python3Parser#simple_stmt.
Python3ParserListener.prototype.enterSimple_stmt = function (ctx) {
};

// Exit a parse tree produced by Python3Parser#simple_stmt.
Python3ParserListener.prototype.exitSimple_stmt = function (ctx) {
};


// Enter a parse tree produced by Python3Parser#small_stmt.
Python3ParserListener.prototype.enterSmall_stmt = function (ctx) {
};

// Exit a parse tree produced by Python3Parser#small_stmt.
Python3ParserListener.prototype.exitSmall_stmt = function (ctx) {
};


// Enter a parse tree produced by Python3Parser#expr_stmt.
Python3ParserListener.prototype.enterExpr_stmt = function (ctx) {
};

// Exit a parse tree produced by Python3Parser#expr_stmt.
Python3ParserListener.prototype.exitExpr_stmt = function (ctx) {
};


// Enter a parse tree produced by Python3Parser#annassign.
Python3ParserListener.prototype.enterAnnassign = function (ctx) {
};

// Exit a parse tree produced by Python3Parser#annassign.
Python3ParserListener.prototype.exitAnnassign = function (ctx) {
};


// Enter a parse tree produced by Python3Parser#testlist_star_expr.
Python3ParserListener.prototype.enterTestlist_star_expr = function (ctx) {
};

// Exit a parse tree produced by Python3Parser#testlist_star_expr.
Python3ParserListener.prototype.exitTestlist_star_expr = function (ctx) {
};


// Enter a parse tree produced by Python3Parser#augassign.
Python3ParserListener.prototype.enterAugassign = function (ctx) {
};

// Exit a parse tree produced by Python3Parser#augassign.
Python3ParserListener.prototype.exitAugassign = function (ctx) {
};


// Enter a parse tree produced by Python3Parser#del_stmt.
Python3ParserListener.prototype.enterDel_stmt = function (ctx) {
};

// Exit a parse tree produced by Python3Parser#del_stmt.
Python3ParserListener.prototype.exitDel_stmt = function (ctx) {
};


// Enter a parse tree produced by Python3Parser#pass_stmt.
Python3ParserListener.prototype.enterPass_stmt = function (ctx) {
};

// Exit a parse tree produced by Python3Parser#pass_stmt.
Python3ParserListener.prototype.exitPass_stmt = function (ctx) {
};


// Enter a parse tree produced by Python3Parser#flow_stmt.
Python3ParserListener.prototype.enterFlow_stmt = function (ctx) {
};

// Exit a parse tree produced by Python3Parser#flow_stmt.
Python3ParserListener.prototype.exitFlow_stmt = function (ctx) {
};


// Enter a parse tree produced by Python3Parser#break_stmt.
Python3ParserListener.prototype.enterBreak_stmt = function (ctx) {
};

// Exit a parse tree produced by Python3Parser#break_stmt.
Python3ParserListener.prototype.exitBreak_stmt = function (ctx) {
};


// Enter a parse tree produced by Python3Parser#continue_stmt.
Python3ParserListener.prototype.enterContinue_stmt = function (ctx) {
};

// Exit a parse tree produced by Python3Parser#continue_stmt.
Python3ParserListener.prototype.exitContinue_stmt = function (ctx) {
};


// Enter a parse tree produced by Python3Parser#return_stmt.
Python3ParserListener.prototype.enterReturn_stmt = function (ctx) {
};

// Exit a parse tree produced by Python3Parser#return_stmt.
Python3ParserListener.prototype.exitReturn_stmt = function (ctx) {
};


// Enter a parse tree produced by Python3Parser#yield_stmt.
Python3ParserListener.prototype.enterYield_stmt = function (ctx) {
};

// Exit a parse tree produced by Python3Parser#yield_stmt.
Python3ParserListener.prototype.exitYield_stmt = function (ctx) {
};


// Enter a parse tree produced by Python3Parser#raise_stmt.
Python3ParserListener.prototype.enterRaise_stmt = function (ctx) {
};

// Exit a parse tree produced by Python3Parser#raise_stmt.
Python3ParserListener.prototype.exitRaise_stmt = function (ctx) {
};


// Enter a parse tree produced by Python3Parser#import_stmt.
Python3ParserListener.prototype.enterImport_stmt = function (ctx) {
};

// Exit a parse tree produced by Python3Parser#import_stmt.
Python3ParserListener.prototype.exitImport_stmt = function (ctx) {
};


// Enter a parse tree produced by Python3Parser#import_name.
Python3ParserListener.prototype.enterImport_name = function (ctx) {
};

// Exit a parse tree produced by Python3Parser#import_name.
Python3ParserListener.prototype.exitImport_name = function (ctx) {
};


// Enter a parse tree produced by Python3Parser#import_from.
Python3ParserListener.prototype.enterImport_from = function (ctx) {
};

// Exit a parse tree produced by Python3Parser#import_from.
Python3ParserListener.prototype.exitImport_from = function (ctx) {
};


// Enter a parse tree produced by Python3Parser#import_as_name.
Python3ParserListener.prototype.enterImport_as_name = function (ctx) {
};

// Exit a parse tree produced by Python3Parser#import_as_name.
Python3ParserListener.prototype.exitImport_as_name = function (ctx) {
};


// Enter a parse tree produced by Python3Parser#dotted_as_name.
Python3ParserListener.prototype.enterDotted_as_name = function (ctx) {
};

// Exit a parse tree produced by Python3Parser#dotted_as_name.
Python3ParserListener.prototype.exitDotted_as_name = function (ctx) {
};


// Enter a parse tree produced by Python3Parser#import_as_names.
Python3ParserListener.prototype.enterImport_as_names = function (ctx) {
};

// Exit a parse tree produced by Python3Parser#import_as_names.
Python3ParserListener.prototype.exitImport_as_names = function (ctx) {
};


// Enter a parse tree produced by Python3Parser#dotted_as_names.
Python3ParserListener.prototype.enterDotted_as_names = function (ctx) {
};

// Exit a parse tree produced by Python3Parser#dotted_as_names.
Python3ParserListener.prototype.exitDotted_as_names = function (ctx) {
};


// Enter a parse tree produced by Python3Parser#dotted_name.
Python3ParserListener.prototype.enterDotted_name = function (ctx) {
};

// Exit a parse tree produced by Python3Parser#dotted_name.
Python3ParserListener.prototype.exitDotted_name = function (ctx) {
};


// Enter a parse tree produced by Python3Parser#global_stmt.
Python3ParserListener.prototype.enterGlobal_stmt = function (ctx) {
};

// Exit a parse tree produced by Python3Parser#global_stmt.
Python3ParserListener.prototype.exitGlobal_stmt = function (ctx) {
};


// Enter a parse tree produced by Python3Parser#nonlocal_stmt.
Python3ParserListener.prototype.enterNonlocal_stmt = function (ctx) {
};

// Exit a parse tree produced by Python3Parser#nonlocal_stmt.
Python3ParserListener.prototype.exitNonlocal_stmt = function (ctx) {
};


// Enter a parse tree produced by Python3Parser#assert_stmt.
Python3ParserListener.prototype.enterAssert_stmt = function (ctx) {
};

// Exit a parse tree produced by Python3Parser#assert_stmt.
Python3ParserListener.prototype.exitAssert_stmt = function (ctx) {
};


// Enter a parse tree produced by Python3Parser#compound_stmt.
Python3ParserListener.prototype.enterCompound_stmt = function (ctx) {
};

// Exit a parse tree produced by Python3Parser#compound_stmt.
Python3ParserListener.prototype.exitCompound_stmt = function (ctx) {
};


// Enter a parse tree produced by Python3Parser#async_stmt.
Python3ParserListener.prototype.enterAsync_stmt = function (ctx) {
};

// Exit a parse tree produced by Python3Parser#async_stmt.
Python3ParserListener.prototype.exitAsync_stmt = function (ctx) {
};


// Enter a parse tree produced by Python3Parser#if_stmt.
Python3ParserListener.prototype.enterIf_stmt = function (ctx) {
};

// Exit a parse tree produced by Python3Parser#if_stmt.
Python3ParserListener.prototype.exitIf_stmt = function (ctx) {
};


// Enter a parse tree produced by Python3Parser#while_stmt.
Python3ParserListener.prototype.enterWhile_stmt = function (ctx) {
};

// Exit a parse tree produced by Python3Parser#while_stmt.
Python3ParserListener.prototype.exitWhile_stmt = function (ctx) {
};


// Enter a parse tree produced by Python3Parser#for_stmt.
Python3ParserListener.prototype.enterFor_stmt = function (ctx) {
};

// Exit a parse tree produced by Python3Parser#for_stmt.
Python3ParserListener.prototype.exitFor_stmt = function (ctx) {
};


// Enter a parse tree produced by Python3Parser#try_stmt.
Python3ParserListener.prototype.enterTry_stmt = function (ctx) {
};

// Exit a parse tree produced by Python3Parser#try_stmt.
Python3ParserListener.prototype.exitTry_stmt = function (ctx) {
};


// Enter a parse tree produced by Python3Parser#with_stmt.
Python3ParserListener.prototype.enterWith_stmt = function (ctx) {
};

// Exit a parse tree produced by Python3Parser#with_stmt.
Python3ParserListener.prototype.exitWith_stmt = function (ctx) {
};


// Enter a parse tree produced by Python3Parser#with_item.
Python3ParserListener.prototype.enterWith_item = function (ctx) {
};

// Exit a parse tree produced by Python3Parser#with_item.
Python3ParserListener.prototype.exitWith_item = function (ctx) {
};


// Enter a parse tree produced by Python3Parser#except_clause.
Python3ParserListener.prototype.enterExcept_clause = function (ctx) {
};

// Exit a parse tree produced by Python3Parser#except_clause.
Python3ParserListener.prototype.exitExcept_clause = function (ctx) {
};


// Enter a parse tree produced by Python3Parser#suite.
Python3ParserListener.prototype.enterSuite = function (ctx) {
};

// Exit a parse tree produced by Python3Parser#suite.
Python3ParserListener.prototype.exitSuite = function (ctx) {
};


// Enter a parse tree produced by Python3Parser#test.
Python3ParserListener.prototype.enterTest = function (ctx) {
};

// Exit a parse tree produced by Python3Parser#test.
Python3ParserListener.prototype.exitTest = function (ctx) {
};


// Enter a parse tree produced by Python3Parser#test_nocond.
Python3ParserListener.prototype.enterTest_nocond = function (ctx) {
};

// Exit a parse tree produced by Python3Parser#test_nocond.
Python3ParserListener.prototype.exitTest_nocond = function (ctx) {
};


// Enter a parse tree produced by Python3Parser#lambdef.
Python3ParserListener.prototype.enterLambdef = function (ctx) {
};

// Exit a parse tree produced by Python3Parser#lambdef.
Python3ParserListener.prototype.exitLambdef = function (ctx) {
};


// Enter a parse tree produced by Python3Parser#lambdef_nocond.
Python3ParserListener.prototype.enterLambdef_nocond = function (ctx) {
};

// Exit a parse tree produced by Python3Parser#lambdef_nocond.
Python3ParserListener.prototype.exitLambdef_nocond = function (ctx) {
};


// Enter a parse tree produced by Python3Parser#or_test.
Python3ParserListener.prototype.enterOr_test = function (ctx) {
};

// Exit a parse tree produced by Python3Parser#or_test.
Python3ParserListener.prototype.exitOr_test = function (ctx) {
};


// Enter a parse tree produced by Python3Parser#and_test.
Python3ParserListener.prototype.enterAnd_test = function (ctx) {
};

// Exit a parse tree produced by Python3Parser#and_test.
Python3ParserListener.prototype.exitAnd_test = function (ctx) {
};


// Enter a parse tree produced by Python3Parser#not_test.
Python3ParserListener.prototype.enterNot_test = function (ctx) {
};

// Exit a parse tree produced by Python3Parser#not_test.
Python3ParserListener.prototype.exitNot_test = function (ctx) {
};


// Enter a parse tree produced by Python3Parser#comparison.
Python3ParserListener.prototype.enterComparison = function (ctx) {
};

// Exit a parse tree produced by Python3Parser#comparison.
Python3ParserListener.prototype.exitComparison = function (ctx) {
};


// Enter a parse tree produced by Python3Parser#comp_op.
Python3ParserListener.prototype.enterComp_op = function (ctx) {
};

// Exit a parse tree produced by Python3Parser#comp_op.
Python3ParserListener.prototype.exitComp_op = function (ctx) {
};


// Enter a parse tree produced by Python3Parser#star_expr.
Python3ParserListener.prototype.enterStar_expr = function (ctx) {
};

// Exit a parse tree produced by Python3Parser#star_expr.
Python3ParserListener.prototype.exitStar_expr = function (ctx) {
};


// Enter a parse tree produced by Python3Parser#expr.
Python3ParserListener.prototype.enterExpr = function (ctx) {
};

// Exit a parse tree produced by Python3Parser#expr.
Python3ParserListener.prototype.exitExpr = function (ctx) {
};


// Enter a parse tree produced by Python3Parser#xor_expr.
Python3ParserListener.prototype.enterXor_expr = function (ctx) {
};

// Exit a parse tree produced by Python3Parser#xor_expr.
Python3ParserListener.prototype.exitXor_expr = function (ctx) {
};


// Enter a parse tree produced by Python3Parser#and_expr.
Python3ParserListener.prototype.enterAnd_expr = function (ctx) {
};

// Exit a parse tree produced by Python3Parser#and_expr.
Python3ParserListener.prototype.exitAnd_expr = function (ctx) {
};


// Enter a parse tree produced by Python3Parser#shift_expr.
Python3ParserListener.prototype.enterShift_expr = function (ctx) {
};

// Exit a parse tree produced by Python3Parser#shift_expr.
Python3ParserListener.prototype.exitShift_expr = function (ctx) {
};


// Enter a parse tree produced by Python3Parser#arith_expr.
Python3ParserListener.prototype.enterArith_expr = function (ctx) {
};

// Exit a parse tree produced by Python3Parser#arith_expr.
Python3ParserListener.prototype.exitArith_expr = function (ctx) {
};


// Enter a parse tree produced by Python3Parser#term.
Python3ParserListener.prototype.enterTerm = function (ctx) {
};

// Exit a parse tree produced by Python3Parser#term.
Python3ParserListener.prototype.exitTerm = function (ctx) {
};


// Enter a parse tree produced by Python3Parser#factor.
Python3ParserListener.prototype.enterFactor = function (ctx) {
};

// Exit a parse tree produced by Python3Parser#factor.
Python3ParserListener.prototype.exitFactor = function (ctx) {
};


// Enter a parse tree produced by Python3Parser#power.
Python3ParserListener.prototype.enterPower = function (ctx) {
};

// Exit a parse tree produced by Python3Parser#power.
Python3ParserListener.prototype.exitPower = function (ctx) {
};


// Enter a parse tree produced by Python3Parser#atom_expr.
Python3ParserListener.prototype.enterAtom_expr = function (ctx) {
};

// Exit a parse tree produced by Python3Parser#atom_expr.
Python3ParserListener.prototype.exitAtom_expr = function (ctx) {
};


// Enter a parse tree produced by Python3Parser#atom.
Python3ParserListener.prototype.enterAtom = function (ctx) {
};

// Exit a parse tree produced by Python3Parser#atom.
Python3ParserListener.prototype.exitAtom = function (ctx) {
};


// Enter a parse tree produced by Python3Parser#testlist_comp.
Python3ParserListener.prototype.enterTestlist_comp = function (ctx) {
};

// Exit a parse tree produced by Python3Parser#testlist_comp.
Python3ParserListener.prototype.exitTestlist_comp = function (ctx) {
};


// Enter a parse tree produced by Python3Parser#trailer.
Python3ParserListener.prototype.enterTrailer = function (ctx) {
};

// Exit a parse tree produced by Python3Parser#trailer.
Python3ParserListener.prototype.exitTrailer = function (ctx) {
};


// Enter a parse tree produced by Python3Parser#subscriptlist.
Python3ParserListener.prototype.enterSubscriptlist = function (ctx) {
};

// Exit a parse tree produced by Python3Parser#subscriptlist.
Python3ParserListener.prototype.exitSubscriptlist = function (ctx) {
};


// Enter a parse tree produced by Python3Parser#subscript.
Python3ParserListener.prototype.enterSubscript = function (ctx) {
};

// Exit a parse tree produced by Python3Parser#subscript.
Python3ParserListener.prototype.exitSubscript = function (ctx) {
};


// Enter a parse tree produced by Python3Parser#sliceop.
Python3ParserListener.prototype.enterSliceop = function (ctx) {
};

// Exit a parse tree produced by Python3Parser#sliceop.
Python3ParserListener.prototype.exitSliceop = function (ctx) {
};


// Enter a parse tree produced by Python3Parser#exprlist.
Python3ParserListener.prototype.enterExprlist = function (ctx) {
};

// Exit a parse tree produced by Python3Parser#exprlist.
Python3ParserListener.prototype.exitExprlist = function (ctx) {
};


// Enter a parse tree produced by Python3Parser#testlist.
Python3ParserListener.prototype.enterTestlist = function (ctx) {
};

// Exit a parse tree produced by Python3Parser#testlist.
Python3ParserListener.prototype.exitTestlist = function (ctx) {
};


// Enter a parse tree produced by Python3Parser#dictorsetmaker.
Python3ParserListener.prototype.enterDictorsetmaker = function (ctx) {
};

// Exit a parse tree produced by Python3Parser#dictorsetmaker.
Python3ParserListener.prototype.exitDictorsetmaker = function (ctx) {
};


// Enter a parse tree produced by Python3Parser#classdef.
Python3ParserListener.prototype.enterClassdef = function (ctx) {
};

// Exit a parse tree produced by Python3Parser#classdef.
Python3ParserListener.prototype.exitClassdef = function (ctx) {
};


// Enter a parse tree produced by Python3Parser#arglist.
Python3ParserListener.prototype.enterArglist = function (ctx) {
};

// Exit a parse tree produced by Python3Parser#arglist.
Python3ParserListener.prototype.exitArglist = function (ctx) {
};


// Enter a parse tree produced by Python3Parser#argument.
Python3ParserListener.prototype.enterArgument = function (ctx) {
};

// Exit a parse tree produced by Python3Parser#argument.
Python3ParserListener.prototype.exitArgument = function (ctx) {
};


// Enter a parse tree produced by Python3Parser#comp_iter.
Python3ParserListener.prototype.enterComp_iter = function (ctx) {
};

// Exit a parse tree produced by Python3Parser#comp_iter.
Python3ParserListener.prototype.exitComp_iter = function (ctx) {
};


// Enter a parse tree produced by Python3Parser#comp_for.
Python3ParserListener.prototype.enterComp_for = function (ctx) {
};

// Exit a parse tree produced by Python3Parser#comp_for.
Python3ParserListener.prototype.exitComp_for = function (ctx) {
};


// Enter a parse tree produced by Python3Parser#comp_if.
Python3ParserListener.prototype.enterComp_if = function (ctx) {
};

// Exit a parse tree produced by Python3Parser#comp_if.
Python3ParserListener.prototype.exitComp_if = function (ctx) {
};


// Enter a parse tree produced by Python3Parser#encoding_decl.
Python3ParserListener.prototype.enterEncoding_decl = function (ctx) {
};

// Exit a parse tree produced by Python3Parser#encoding_decl.
Python3ParserListener.prototype.exitEncoding_decl = function (ctx) {
};


// Enter a parse tree produced by Python3Parser#yield_expr.
Python3ParserListener.prototype.enterYield_expr = function (ctx) {
};

// Exit a parse tree produced by Python3Parser#yield_expr.
Python3ParserListener.prototype.exitYield_expr = function (ctx) {
};


// Enter a parse tree produced by Python3Parser#yield_arg.
Python3ParserListener.prototype.enterYield_arg = function (ctx) {
};

// Exit a parse tree produced by Python3Parser#yield_arg.
Python3ParserListener.prototype.exitYield_arg = function (ctx) {
};



exports.Python3ParserListener = Python3ParserListener;