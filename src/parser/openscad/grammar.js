// Generated automatically by nearley
// http://github.com/Hardmath123/nearley
(function () {
function id(x) {return x[0]; }

/**
 * Part of the SCADoosh tool.
 * Grammar that applies on the OpenSCAD language.
 *
 * @package src/parser/openscad
 * @author jsconan
 * @license GPLv3
 */
const lexer = require('./lexer')();
const utils = require('./../../ast/utils');
const builders = require('./../../ast/builders');
var grammar = {
    Lexer: lexer,
    ParserRules: [
    {"name": "statement", "symbols": ["assignment", {"literal":";"}], "postprocess": utils.head},
    {"name": "statement$subexpression$1", "symbols": [{"literal":";"}]},
    {"name": "statement$subexpression$1", "symbols": []},
    {"name": "statement", "symbols": ["include", "statement$subexpression$1"], "postprocess": utils.head},
    {"name": "statement", "symbols": ["comment"], "postprocess": utils.forward},
    {"name": "statement", "symbols": [], "postprocess": utils.discard},
    {"name": "include", "symbols": [{"literal":"include"}, "path"], "postprocess": (data) => builders.command(data, 'AstInclude')},
    {"name": "include", "symbols": [{"literal":"use"}, "path"], "postprocess": (data) => builders.command(data, 'AstUse')},
    {"name": "assignment$subexpression$1", "symbols": ["expr"]},
    {"name": "assignment$subexpression$1", "symbols": ["undef"]},
    {"name": "assignment$subexpression$1", "symbols": ["boolean"]},
    {"name": "assignment$subexpression$1", "symbols": ["string"]},
    {"name": "assignment", "symbols": ["identifier", {"literal":"="}, "assignment$subexpression$1"], "postprocess": (data) => builders.assignment(data, 'AstAssignment')},
    {"name": "expr$ebnf$1", "symbols": []},
    {"name": "expr$ebnf$1$subexpression$1$subexpression$1", "symbols": [{"literal":"+"}]},
    {"name": "expr$ebnf$1$subexpression$1$subexpression$1", "symbols": [{"literal":"-"}]},
    {"name": "expr$ebnf$1$subexpression$1", "symbols": ["expr$ebnf$1$subexpression$1$subexpression$1", "term"]},
    {"name": "expr$ebnf$1", "symbols": ["expr$ebnf$1", "expr$ebnf$1$subexpression$1"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "expr", "symbols": ["term", "expr$ebnf$1"], "postprocess": (data) => builders.binaryOperator(data, 'AstBinaryOperator')},
    {"name": "term$ebnf$1", "symbols": []},
    {"name": "term$ebnf$1$subexpression$1$subexpression$1", "symbols": [{"literal":"*"}]},
    {"name": "term$ebnf$1$subexpression$1$subexpression$1", "symbols": [{"literal":"/"}]},
    {"name": "term$ebnf$1$subexpression$1$subexpression$1", "symbols": [{"literal":"%"}]},
    {"name": "term$ebnf$1$subexpression$1", "symbols": ["term$ebnf$1$subexpression$1$subexpression$1", "factor"]},
    {"name": "term$ebnf$1", "symbols": ["term$ebnf$1", "term$ebnf$1$subexpression$1"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "term", "symbols": ["factor", "term$ebnf$1"], "postprocess": (data) => builders.binaryOperator(data, 'AstBinaryOperator')},
    {"name": "factor$subexpression$1", "symbols": [{"literal":"+"}]},
    {"name": "factor$subexpression$1", "symbols": [{"literal":"-"}]},
    {"name": "factor", "symbols": ["factor$subexpression$1", "factor"], "postprocess": (data) => builders.unaryOperator(data, 'AstUnaryOperator')},
    {"name": "factor", "symbols": ["number"], "postprocess": utils.forward},
    {"name": "factor", "symbols": [{"literal":"("}, "expr", {"literal":")"}], "postprocess": utils.surrounded},
    {"name": "factor", "symbols": ["identifier"], "postprocess": utils.forward},
    {"name": "undef", "symbols": [{"literal":"undef"}], "postprocess": (data) => builders.terminal(data, 'AstUndefined')},
    {"name": "boolean$subexpression$1", "symbols": [{"literal":"true"}]},
    {"name": "boolean$subexpression$1", "symbols": [{"literal":"false"}]},
    {"name": "boolean", "symbols": ["boolean$subexpression$1"], "postprocess": (data) => builders.terminal(data, 'AstBoolean')},
    {"name": "number", "symbols": [(lexer.has("number") ? {type: "number"} : number)], "postprocess": (data) => builders.terminal(data, 'AstNumber')},
    {"name": "string", "symbols": [(lexer.has("string") ? {type: "string"} : string)], "postprocess": (data) => builders.terminal(data, 'AstString')},
    {"name": "path", "symbols": [(lexer.has("path") ? {type: "path"} : path)], "postprocess": (data) => builders.terminal(data, 'AstPath')},
    {"name": "identifier", "symbols": [(lexer.has("identifier") ? {type: "identifier"} : identifier)], "postprocess": (data) => builders.terminal(data, 'AstIdentifier')},
    {"name": "comment", "symbols": [(lexer.has("lcomment") ? {type: "lcomment"} : lcomment)], "postprocess": (data) => builders.terminal(data, 'AstLineComment')},
    {"name": "comment", "symbols": [(lexer.has("mcomment") ? {type: "mcomment"} : mcomment)], "postprocess": (data) => builders.terminal(data, 'AstBlockComment')}
]
  , ParserStart: "statement"
}
if (typeof module !== 'undefined'&& typeof module.exports !== 'undefined') {
   module.exports = grammar;
} else {
   window.grammar = grammar;
}
})();
