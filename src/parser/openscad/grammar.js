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
    {"name": "main", "symbols": [], "postprocess": utils.discard},
    {"name": "main", "symbols": ["undef"], "postprocess": utils.forward},
    {"name": "main", "symbols": ["boolean"], "postprocess": utils.forward},
    {"name": "main", "symbols": ["expr"], "postprocess": utils.forward},
    {"name": "main", "symbols": ["string"], "postprocess": utils.forward},
    {"name": "main", "symbols": ["path"], "postprocess": utils.forward},
    {"name": "main", "symbols": ["identifier"], "postprocess": utils.forward},
    {"name": "main", "symbols": ["comment"], "postprocess": utils.forward},
    {"name": "expr$ebnf$1", "symbols": []},
    {"name": "expr$ebnf$1$subexpression$1$subexpression$1", "symbols": [{"literal":"+"}]},
    {"name": "expr$ebnf$1$subexpression$1$subexpression$1", "symbols": [{"literal":"-"}]},
    {"name": "expr$ebnf$1$subexpression$1", "symbols": ["expr$ebnf$1$subexpression$1$subexpression$1", "term"]},
    {"name": "expr$ebnf$1", "symbols": ["expr$ebnf$1", "expr$ebnf$1$subexpression$1"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "expr", "symbols": ["term", "expr$ebnf$1"], "postprocess": builders.binaryOperator},
    {"name": "term$ebnf$1", "symbols": []},
    {"name": "term$ebnf$1$subexpression$1$subexpression$1", "symbols": [{"literal":"*"}]},
    {"name": "term$ebnf$1$subexpression$1$subexpression$1", "symbols": [{"literal":"/"}]},
    {"name": "term$ebnf$1$subexpression$1", "symbols": ["term$ebnf$1$subexpression$1$subexpression$1", "factor"]},
    {"name": "term$ebnf$1", "symbols": ["term$ebnf$1", "term$ebnf$1$subexpression$1"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "term", "symbols": ["factor", "term$ebnf$1"], "postprocess": builders.binaryOperator},
    {"name": "factor$subexpression$1", "symbols": [{"literal":"+"}]},
    {"name": "factor$subexpression$1", "symbols": [{"literal":"-"}]},
    {"name": "factor", "symbols": ["factor$subexpression$1", "factor"], "postprocess": builders.unaryOperator},
    {"name": "factor", "symbols": ["number"], "postprocess": utils.forward},
    {"name": "factor", "symbols": [{"literal":"("}, "expr", {"literal":")"}], "postprocess": utils.surrounded},
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
  , ParserStart: "main"
}
if (typeof module !== 'undefined'&& typeof module.exports !== 'undefined') {
   module.exports = grammar;
} else {
   window.grammar = grammar;
}
})();
