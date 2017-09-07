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
    {"name": "package", "symbols": ["statements"], "postprocess": (data) => builders.list(data, 'AstPackage')},
    {"name": "statements$ebnf$1", "symbols": []},
    {"name": "statements$ebnf$1", "symbols": ["statements$ebnf$1", "statement"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "statements", "symbols": ["statements$ebnf$1"]},
    {"name": "statement", "symbols": [{"literal":";"}], "postprocess": (data) => builders.noop(data)},
    {"name": "statement", "symbols": [{"literal":"{"}, "statements", {"literal":"}"}], "postprocess": (data) => builders.block(data, 'AstBlock')},
    {"name": "statement", "symbols": ["assignment", {"literal":";"}], "postprocess": utils.head},
    {"name": "statement", "symbols": ["comment"], "postprocess": id},
    {"name": "statement", "symbols": ["include"], "postprocess": id},
    {"name": "include", "symbols": [{"literal":"include"}, "path"], "postprocess": (data) => builders.command(data, 'AstInclude')},
    {"name": "include", "symbols": [{"literal":"use"}, "path"], "postprocess": (data) => builders.command(data, 'AstUse')},
    {"name": "assignment", "symbols": ["identifier", {"literal":"="}, "expr"], "postprocess": (data) => builders.assignment(data, 'AstAssignment')},
    {"name": "expr$subexpression$1", "symbols": ["expr", {"literal":"&&"}, "cond"]},
    {"name": "expr$subexpression$1", "symbols": ["expr", {"literal":"||"}, "cond"]},
    {"name": "expr", "symbols": ["expr$subexpression$1"], "postprocess": (data) => builders.binaryOperator(data, 'AstBinaryOperator')},
    {"name": "expr", "symbols": ["cond"], "postprocess": id},
    {"name": "cond$subexpression$1", "symbols": ["cond", {"literal":"<"}, "sum"]},
    {"name": "cond$subexpression$1", "symbols": ["cond", {"literal":"<="}, "sum"]},
    {"name": "cond$subexpression$1", "symbols": ["cond", {"literal":"=="}, "sum"]},
    {"name": "cond$subexpression$1", "symbols": ["cond", {"literal":"!="}, "sum"]},
    {"name": "cond$subexpression$1", "symbols": ["cond", {"literal":">"}, "sum"]},
    {"name": "cond$subexpression$1", "symbols": ["cond", {"literal":">="}, "sum"]},
    {"name": "cond", "symbols": ["cond$subexpression$1"], "postprocess": (data) => builders.binaryOperator(data, 'AstBinaryOperator')},
    {"name": "cond", "symbols": ["sum"], "postprocess": id},
    {"name": "sum$subexpression$1", "symbols": ["sum", {"literal":"+"}, "term"]},
    {"name": "sum$subexpression$1", "symbols": ["sum", {"literal":"-"}, "term"]},
    {"name": "sum", "symbols": ["sum$subexpression$1"], "postprocess": (data) => builders.binaryOperator(data, 'AstBinaryOperator')},
    {"name": "sum", "symbols": ["term"], "postprocess": id},
    {"name": "term$subexpression$1", "symbols": ["term", {"literal":"*"}, "atom"]},
    {"name": "term$subexpression$1", "symbols": ["term", {"literal":"/"}, "atom"]},
    {"name": "term$subexpression$1", "symbols": ["term", {"literal":"%"}, "atom"]},
    {"name": "term", "symbols": ["term$subexpression$1"], "postprocess": (data) => builders.binaryOperator(data, 'AstBinaryOperator')},
    {"name": "term", "symbols": ["atom"], "postprocess": id},
    {"name": "atom$subexpression$1", "symbols": [{"literal":"+"}, "atom"]},
    {"name": "atom$subexpression$1", "symbols": [{"literal":"-"}, "atom"]},
    {"name": "atom$subexpression$1", "symbols": [{"literal":"!"}, "atom"]},
    {"name": "atom", "symbols": ["atom$subexpression$1"], "postprocess": (data) => builders.unaryOperator(data, 'AstUnaryOperator')},
    {"name": "atom", "symbols": [{"literal":"("}, "expr", {"literal":")"}], "postprocess": utils.surrounded},
    {"name": "atom", "symbols": ["value"], "postprocess": id},
    {"name": "value", "symbols": ["number"], "postprocess": id},
    {"name": "value", "symbols": ["string"], "postprocess": id},
    {"name": "value", "symbols": ["boolean"], "postprocess": id},
    {"name": "value", "symbols": ["undef"], "postprocess": id},
    {"name": "value", "symbols": ["identifier"], "postprocess": id},
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
  , ParserStart: "package"
}
if (typeof module !== 'undefined'&& typeof module.exports !== 'undefined') {
   module.exports = grammar;
} else {
   window.grammar = grammar;
}
})();
