// Generated from \tools\parsers\python\Python3Parser.g4 by ANTLR 4.8
// jshint ignore: start
var antlr4 = require('antlr4/index');

// This class defines a complete generic visitor for a parse tree produced by Python3Parser.

function Python3ParserVisitor() {
    antlr4.tree.ParseTreeVisitor.call(this);
    return this;
}

Python3ParserVisitor.prototype = Object.create(antlr4.tree.ParseTreeVisitor.prototype);
Python3ParserVisitor.prototype.constructor = Python3ParserVisitor;

// Visit a parse tree produced by Python3Parser#single_input.
Python3ParserVisitor.prototype.visitSingle_input = function (ctx) {
    return this.visitChildren(ctx);
};


// Visit a parse tree produced by Python3Parser#file_input.
Python3ParserVisitor.prototype.visitFile_input = function (ctx) {
    return this.visitChildren(ctx);
};


// Visit a parse tree produced by Python3Parser#eval_input.
Python3ParserVisitor.prototype.visitEval_input = function (ctx) {
    return this.visitChildren(ctx);
};


// Visit a parse tree produced by Python3Parser#decorator.
Python3ParserVisitor.prototype.visitDecorator = function (ctx) {
    return this.visitChildren(ctx);
};


// Visit a parse tree produced by Python3Parser#decorators.
Python3ParserVisitor.prototype.visitDecorators = function (ctx) {
    return this.visitChildren(ctx);
};


// Visit a parse tree produced by Python3Parser#decorated.
Python3ParserVisitor.prototype.visitDecorated = function (ctx) {
    return this.visitChildren(ctx);
};


// Visit a parse tree produced by Python3Parser#async_funcdef.
Python3ParserVisitor.prototype.visitAsync_funcdef = function (ctx) {
    return this.visitChildren(ctx);
};


// Visit a parse tree produced by Python3Parser#funcdef.
Python3ParserVisitor.prototype.visitFuncdef = function (ctx) {
    return this.visitChildren(ctx);
};


// Visit a parse tree produced by Python3Parser#parameters.
Python3ParserVisitor.prototype.visitParameters = function (ctx) {
    return this.visitChildren(ctx);
};


// Visit a parse tree produced by Python3Parser#typedargslist.
Python3ParserVisitor.prototype.visitTypedargslist = function (ctx) {
    return this.visitChildren(ctx);
};


// Visit a parse tree produced by Python3Parser#tfpdef.
Python3ParserVisitor.prototype.visitTfpdef = function (ctx) {
    return this.visitChildren(ctx);
};


// Visit a parse tree produced by Python3Parser#varargslist.
Python3ParserVisitor.prototype.visitVarargslist = function (ctx) {
    return this.visitChildren(ctx);
};


// Visit a parse tree produced by Python3Parser#vfpdef.
Python3ParserVisitor.prototype.visitVfpdef = function (ctx) {
    return this.visitChildren(ctx);
};


// Visit a parse tree produced by Python3Parser#stmt.
Python3ParserVisitor.prototype.visitStmt = function (ctx) {
    return this.visitChildren(ctx);
};


// Visit a parse tree produced by Python3Parser#simple_stmt.
Python3ParserVisitor.prototype.visitSimple_stmt = function (ctx) {
    return this.visitChildren(ctx);
};


// Visit a parse tree produced by Python3Parser#small_stmt.
Python3ParserVisitor.prototype.visitSmall_stmt = function (ctx) {
    return this.visitChildren(ctx);
};


// Visit a parse tree produced by Python3Parser#expr_stmt.
Python3ParserVisitor.prototype.visitExpr_stmt = function (ctx) {
    return this.visitChildren(ctx);
};


// Visit a parse tree produced by Python3Parser#annassign.
Python3ParserVisitor.prototype.visitAnnassign = function (ctx) {
    return this.visitChildren(ctx);
};


// Visit a parse tree produced by Python3Parser#testlist_star_expr.
Python3ParserVisitor.prototype.visitTestlist_star_expr = function (ctx) {
    return this.visitChildren(ctx);
};


// Visit a parse tree produced by Python3Parser#augassign.
Python3ParserVisitor.prototype.visitAugassign = function (ctx) {
    return this.visitChildren(ctx);
};


// Visit a parse tree produced by Python3Parser#del_stmt.
Python3ParserVisitor.prototype.visitDel_stmt = function (ctx) {
    return this.visitChildren(ctx);
};


// Visit a parse tree produced by Python3Parser#pass_stmt.
Python3ParserVisitor.prototype.visitPass_stmt = function (ctx) {
    return this.visitChildren(ctx);
};


// Visit a parse tree produced by Python3Parser#flow_stmt.
Python3ParserVisitor.prototype.visitFlow_stmt = function (ctx) {
    return this.visitChildren(ctx);
};


// Visit a parse tree produced by Python3Parser#break_stmt.
Python3ParserVisitor.prototype.visitBreak_stmt = function (ctx) {
    return this.visitChildren(ctx);
};


// Visit a parse tree produced by Python3Parser#continue_stmt.
Python3ParserVisitor.prototype.visitContinue_stmt = function (ctx) {
    return this.visitChildren(ctx);
};


// Visit a parse tree produced by Python3Parser#return_stmt.
Python3ParserVisitor.prototype.visitReturn_stmt = function (ctx) {
    return this.visitChildren(ctx);
};


// Visit a parse tree produced by Python3Parser#yield_stmt.
Python3ParserVisitor.prototype.visitYield_stmt = function (ctx) {
    return this.visitChildren(ctx);
};


// Visit a parse tree produced by Python3Parser#raise_stmt.
Python3ParserVisitor.prototype.visitRaise_stmt = function (ctx) {
    return this.visitChildren(ctx);
};


// Visit a parse tree produced by Python3Parser#import_stmt.
Python3ParserVisitor.prototype.visitImport_stmt = function (ctx) {
    return this.visitChildren(ctx);
};


// Visit a parse tree produced by Python3Parser#import_name.
Python3ParserVisitor.prototype.visitImport_name = function (ctx) {
    return this.visitChildren(ctx);
};


// Visit a parse tree produced by Python3Parser#import_from.
Python3ParserVisitor.prototype.visitImport_from = function (ctx) {
    return this.visitChildren(ctx);
};


// Visit a parse tree produced by Python3Parser#import_as_name.
Python3ParserVisitor.prototype.visitImport_as_name = function (ctx) {
    return this.visitChildren(ctx);
};


// Visit a parse tree produced by Python3Parser#dotted_as_name.
Python3ParserVisitor.prototype.visitDotted_as_name = function (ctx) {
    return this.visitChildren(ctx);
};


// Visit a parse tree produced by Python3Parser#import_as_names.
Python3ParserVisitor.prototype.visitImport_as_names = function (ctx) {
    return this.visitChildren(ctx);
};


// Visit a parse tree produced by Python3Parser#dotted_as_names.
Python3ParserVisitor.prototype.visitDotted_as_names = function (ctx) {
    return this.visitChildren(ctx);
};


// Visit a parse tree produced by Python3Parser#dotted_name.
Python3ParserVisitor.prototype.visitDotted_name = function (ctx) {
    return this.visitChildren(ctx);
};


// Visit a parse tree produced by Python3Parser#global_stmt.
Python3ParserVisitor.prototype.visitGlobal_stmt = function (ctx) {
    return this.visitChildren(ctx);
};


// Visit a parse tree produced by Python3Parser#nonlocal_stmt.
Python3ParserVisitor.prototype.visitNonlocal_stmt = function (ctx) {
    return this.visitChildren(ctx);
};


// Visit a parse tree produced by Python3Parser#assert_stmt.
Python3ParserVisitor.prototype.visitAssert_stmt = function (ctx) {
    return this.visitChildren(ctx);
};


// Visit a parse tree produced by Python3Parser#compound_stmt.
Python3ParserVisitor.prototype.visitCompound_stmt = function (ctx) {
    return this.visitChildren(ctx);
};


// Visit a parse tree produced by Python3Parser#async_stmt.
Python3ParserVisitor.prototype.visitAsync_stmt = function (ctx) {
    return this.visitChildren(ctx);
};


// Visit a parse tree produced by Python3Parser#if_stmt.
Python3ParserVisitor.prototype.visitIf_stmt = function (ctx) {
    return this.visitChildren(ctx);
};


// Visit a parse tree produced by Python3Parser#while_stmt.
Python3ParserVisitor.prototype.visitWhile_stmt = function (ctx) {
    return this.visitChildren(ctx);
};


// Visit a parse tree produced by Python3Parser#for_stmt.
Python3ParserVisitor.prototype.visitFor_stmt = function (ctx) {
    return this.visitChildren(ctx);
};


// Visit a parse tree produced by Python3Parser#try_stmt.
Python3ParserVisitor.prototype.visitTry_stmt = function (ctx) {
    return this.visitChildren(ctx);
};


// Visit a parse tree produced by Python3Parser#with_stmt.
Python3ParserVisitor.prototype.visitWith_stmt = function (ctx) {
    return this.visitChildren(ctx);
};


// Visit a parse tree produced by Python3Parser#with_item.
Python3ParserVisitor.prototype.visitWith_item = function (ctx) {
    return this.visitChildren(ctx);
};


// Visit a parse tree produced by Python3Parser#except_clause.
Python3ParserVisitor.prototype.visitExcept_clause = function (ctx) {
    return this.visitChildren(ctx);
};


// Visit a parse tree produced by Python3Parser#suite.
Python3ParserVisitor.prototype.visitSuite = function (ctx) {
    return this.visitChildren(ctx);
};


// Visit a parse tree produced by Python3Parser#test.
Python3ParserVisitor.prototype.visitTest = function (ctx) {
    return this.visitChildren(ctx);
};


// Visit a parse tree produced by Python3Parser#test_nocond.
Python3ParserVisitor.prototype.visitTest_nocond = function (ctx) {
    return this.visitChildren(ctx);
};


// Visit a parse tree produced by Python3Parser#lambdef.
Python3ParserVisitor.prototype.visitLambdef = function (ctx) {
    return this.visitChildren(ctx);
};


// Visit a parse tree produced by Python3Parser#lambdef_nocond.
Python3ParserVisitor.prototype.visitLambdef_nocond = function (ctx) {
    return this.visitChildren(ctx);
};


// Visit a parse tree produced by Python3Parser#or_test.
Python3ParserVisitor.prototype.visitOr_test = function (ctx) {
    return this.visitChildren(ctx);
};


// Visit a parse tree produced by Python3Parser#and_test.
Python3ParserVisitor.prototype.visitAnd_test = function (ctx) {
    return this.visitChildren(ctx);
};


// Visit a parse tree produced by Python3Parser#not_test.
Python3ParserVisitor.prototype.visitNot_test = function (ctx) {
    return this.visitChildren(ctx);
};


// Visit a parse tree produced by Python3Parser#comparison.
Python3ParserVisitor.prototype.visitComparison = function (ctx) {
    return this.visitChildren(ctx);
};


// Visit a parse tree produced by Python3Parser#comp_op.
Python3ParserVisitor.prototype.visitComp_op = function (ctx) {
    return this.visitChildren(ctx);
};


// Visit a parse tree produced by Python3Parser#star_expr.
Python3ParserVisitor.prototype.visitStar_expr = function (ctx) {
    return this.visitChildren(ctx);
};


// Visit a parse tree produced by Python3Parser#expr.
Python3ParserVisitor.prototype.visitExpr = function (ctx) {
    return this.visitChildren(ctx);
};


// Visit a parse tree produced by Python3Parser#xor_expr.
Python3ParserVisitor.prototype.visitXor_expr = function (ctx) {
    return this.visitChildren(ctx);
};


// Visit a parse tree produced by Python3Parser#and_expr.
Python3ParserVisitor.prototype.visitAnd_expr = function (ctx) {
    return this.visitChildren(ctx);
};


// Visit a parse tree produced by Python3Parser#shift_expr.
Python3ParserVisitor.prototype.visitShift_expr = function (ctx) {
    return this.visitChildren(ctx);
};


// Visit a parse tree produced by Python3Parser#arith_expr.
Python3ParserVisitor.prototype.visitArith_expr = function (ctx) {
    return this.visitChildren(ctx);
};


// Visit a parse tree produced by Python3Parser#term.
Python3ParserVisitor.prototype.visitTerm = function (ctx) {
    return this.visitChildren(ctx);
};


// Visit a parse tree produced by Python3Parser#factor.
Python3ParserVisitor.prototype.visitFactor = function (ctx) {
    return this.visitChildren(ctx);
};


// Visit a parse tree produced by Python3Parser#power.
Python3ParserVisitor.prototype.visitPower = function (ctx) {
    return this.visitChildren(ctx);
};


// Visit a parse tree produced by Python3Parser#atom_expr.
Python3ParserVisitor.prototype.visitAtom_expr = function (ctx) {
    return this.visitChildren(ctx);
};


// Visit a parse tree produced by Python3Parser#atom.
Python3ParserVisitor.prototype.visitAtom = function (ctx) {
    return this.visitChildren(ctx);
};


// Visit a parse tree produced by Python3Parser#testlist_comp.
Python3ParserVisitor.prototype.visitTestlist_comp = function (ctx) {
    return this.visitChildren(ctx);
};


// Visit a parse tree produced by Python3Parser#trailer.
Python3ParserVisitor.prototype.visitTrailer = function (ctx) {
    return this.visitChildren(ctx);
};


// Visit a parse tree produced by Python3Parser#subscriptlist.
Python3ParserVisitor.prototype.visitSubscriptlist = function (ctx) {
    return this.visitChildren(ctx);
};


// Visit a parse tree produced by Python3Parser#subscript.
Python3ParserVisitor.prototype.visitSubscript = function (ctx) {
    return this.visitChildren(ctx);
};


// Visit a parse tree produced by Python3Parser#sliceop.
Python3ParserVisitor.prototype.visitSliceop = function (ctx) {
    return this.visitChildren(ctx);
};


// Visit a parse tree produced by Python3Parser#exprlist.
Python3ParserVisitor.prototype.visitExprlist = function (ctx) {
    return this.visitChildren(ctx);
};


// Visit a parse tree produced by Python3Parser#testlist.
Python3ParserVisitor.prototype.visitTestlist = function (ctx) {
    return this.visitChildren(ctx);
};


// Visit a parse tree produced by Python3Parser#dictorsetmaker.
Python3ParserVisitor.prototype.visitDictorsetmaker = function (ctx) {
    return this.visitChildren(ctx);
};


// Visit a parse tree produced by Python3Parser#classdef.
Python3ParserVisitor.prototype.visitClassdef = function (ctx) {
    return this.visitChildren(ctx);
};


// Visit a parse tree produced by Python3Parser#arglist.
Python3ParserVisitor.prototype.visitArglist = function (ctx) {
    return this.visitChildren(ctx);
};


// Visit a parse tree produced by Python3Parser#argument.
Python3ParserVisitor.prototype.visitArgument = function (ctx) {
    return this.visitChildren(ctx);
};


// Visit a parse tree produced by Python3Parser#comp_iter.
Python3ParserVisitor.prototype.visitComp_iter = function (ctx) {
    return this.visitChildren(ctx);
};


// Visit a parse tree produced by Python3Parser#comp_for.
Python3ParserVisitor.prototype.visitComp_for = function (ctx) {
    return this.visitChildren(ctx);
};


// Visit a parse tree produced by Python3Parser#comp_if.
Python3ParserVisitor.prototype.visitComp_if = function (ctx) {
    return this.visitChildren(ctx);
};


// Visit a parse tree produced by Python3Parser#encoding_decl.
Python3ParserVisitor.prototype.visitEncoding_decl = function (ctx) {
    return this.visitChildren(ctx);
};


// Visit a parse tree produced by Python3Parser#yield_expr.
Python3ParserVisitor.prototype.visitYield_expr = function (ctx) {
    return this.visitChildren(ctx);
};


// Visit a parse tree produced by Python3Parser#yield_arg.
Python3ParserVisitor.prototype.visitYield_arg = function (ctx) {
    return this.visitChildren(ctx);
};



exports.Python3ParserVisitor = Python3ParserVisitor;