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
    {"name": "include", "symbols": [{"literal":"include"}, "path"], "postprocess": builders.include},
    {"name": "include", "symbols": [{"literal":"use"}, "path"], "postprocess": builders.use},
    {"name": "assignment$subexpression$1", "symbols": ["expr"]},
    {"name": "assignment$subexpression$1", "symbols": ["undef"]},
    {"name": "assignment$subexpression$1", "symbols": ["boolean"]},
    {"name": "assignment$subexpression$1", "symbols": ["string"]},
    {"name": "assignment", "symbols": ["identifier", {"literal":"="}, "assignment$subexpression$1"], "postprocess": builders.assignment},
    {"name": "expr$ebnf$1", "symbols": []},
    {"name": "expr$ebnf$1$subexpression$1$subexpression$1", "symbols": [{"literal":"+"}]},
    {"name": "expr$ebnf$1$subexpression$1$subexpression$1", "symbols": [{"literal":"-"}]},
    {"name": "expr$ebnf$1$subexpression$1", "symbols": ["expr$ebnf$1$subexpression$1$subexpression$1", "term"]},
    {"name": "expr$ebnf$1", "symbols": ["expr$ebnf$1", "expr$ebnf$1$subexpression$1"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "expr", "symbols": ["term", "expr$ebnf$1"], "postprocess": builders.binaryOperator},
    {"name": "term$ebnf$1", "symbols": []},
    {"name": "term$ebnf$1$subexpression$1$subexpression$1", "symbols": [{"literal":"*"}]},
    {"name": "term$ebnf$1$subexpression$1$subexpression$1", "symbols": [{"literal":"/"}]},
    {"name": "term$ebnf$1$subexpression$1$subexpression$1", "symbols": [{"literal":"%"}]},
    {"name": "term$ebnf$1$subexpression$1", "symbols": ["term$ebnf$1$subexpression$1$subexpression$1", "factor"]},
    {"name": "term$ebnf$1", "symbols": ["term$ebnf$1", "term$ebnf$1$subexpression$1"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "term", "symbols": ["factor", "term$ebnf$1"], "postprocess": builders.binaryOperator},
    {"name": "factor$subexpression$1", "symbols": [{"literal":"+"}]},
    {"name": "factor$subexpression$1", "symbols": [{"literal":"-"}]},
    {"name": "factor", "symbols": ["factor$subexpression$1", "factor"], "postprocess": builders.unaryOperator},
    {"name": "factor", "symbols": ["number"], "postprocess": utils.forward},
    {"name": "factor", "symbols": [{"literal":"("}, "expr", {"literal":")"}], "postprocess": utils.surrounded},
    {"name": "factor", "symbols": ["identifier"], "postprocess": utils.forward},
    {"name": "undef", "symbols": [{"literal":"undef"}], "postprocess": builders.undef},
    {"name": "boolean", "symbols": [{"literal":"true"}], "postprocess": builders.boolean},
    {"name": "boolean", "symbols": [{"literal":"false"}], "postprocess": builders.boolean},
    {"name": "number", "symbols": [(lexer.has("number") ? {type: "number"} : number)], "postprocess": builders.number},
    {"name": "string", "symbols": [(lexer.has("string") ? {type: "string"} : string)], "postprocess": builders.string},
    {"name": "path", "symbols": [(lexer.has("path") ? {type: "path"} : path)], "postprocess": builders.path},
    {"name": "identifier", "symbols": [(lexer.has("identifier") ? {type: "identifier"} : identifier)], "postprocess": builders.identifier},
    {"name": "comment", "symbols": [(lexer.has("lcomment") ? {type: "lcomment"} : lcomment)], "postprocess": builders.lineComment},
    {"name": "comment", "symbols": [(lexer.has("mcomment") ? {type: "mcomment"} : mcomment)], "postprocess": builders.blockComment}
]
  , ParserStart: "statement"
}
if (typeof module !== 'undefined'&& typeof module.exports !== 'undefined') {
   module.exports = grammar;
} else {
   window.grammar = grammar;
}
})();
