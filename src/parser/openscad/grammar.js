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
const lexer = require('./lexer');
const pp = require('./postprocessors');
var grammar = {
    Lexer: lexer,
    ParserRules: [
    {"name": "main", "symbols": ["undef"], "postprocess": id},
    {"name": "main", "symbols": ["boolean"], "postprocess": id},
    {"name": "main", "symbols": ["number"], "postprocess": id},
    {"name": "main", "symbols": ["string"], "postprocess": id},
    {"name": "main", "symbols": ["path"], "postprocess": id},
    {"name": "main", "symbols": ["identifier"], "postprocess": id},
    {"name": "main", "symbols": ["comment"], "postprocess": id},
    {"name": "undef", "symbols": [{"literal":"undef"}], "postprocess": pp.undef},
    {"name": "boolean", "symbols": [{"literal":"true"}], "postprocess": pp.bool},
    {"name": "boolean", "symbols": [{"literal":"false"}], "postprocess": pp.bool},
    {"name": "number", "symbols": [(lexer.has("number") ? {type: "number"} : number)], "postprocess": pp.number},
    {"name": "string", "symbols": [(lexer.has("string") ? {type: "string"} : string)], "postprocess": pp.string},
    {"name": "path", "symbols": [(lexer.has("path") ? {type: "path"} : path)], "postprocess": pp.path},
    {"name": "identifier", "symbols": [(lexer.has("identifier") ? {type: "identifier"} : identifier)], "postprocess": pp.identifier},
    {"name": "comment", "symbols": [(lexer.has("lcomment") ? {type: "lcomment"} : lcomment)], "postprocess": pp.lcomment},
    {"name": "comment", "symbols": [(lexer.has("mcomment") ? {type: "mcomment"} : mcomment)], "postprocess": pp.mcomment}
]
  , ParserStart: "main"
}
if (typeof module !== 'undefined'&& typeof module.exports !== 'undefined') {
   module.exports = grammar;
} else {
   window.grammar = grammar;
}
})();
