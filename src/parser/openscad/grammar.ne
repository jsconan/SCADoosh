#
# @license
# GPLv3 License
#
# Copyright (c) 2017 Jean-Sebastien CONAN
#
# This file is part of SCADoosh.
#
# SCADoosh is free software: you can redistribute it and/or modify
# it under the terms of the GNU General Public License as published by
# the Free Software Foundation, either version 3 of the License, or
# (at your option) any later version.
#
# SCADoosh is distributed in the hope that it will be useful,
# but WITHOUT ANY WARRANTY; without even the implied warranty of
# MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
# GNU General Public License for more details.
#
# You should have received a copy of the GNU General Public License
# along with SCADoosh. If not, see <http://www.gnu.org/licenses/>.
#

#
# Part of the SCADoosh tool.
#
# Grammar that abuilderslies on the OpenSCAD language.
#
# @package src/parser/openscad
# @author jsconan
#

@{%
/**
 * Part of the SCADoosh tool.
 * Grammar that abuilderslies on the OpenSCAD language.
 *
 * @package src/parser/openscad
 * @author jsconan
 * @license GPLv3
 */
const lexer = require('./lexer');
const ast = require('./../../ast/ast');
const utils = ast.utils;
const builders = require('./builders');
%}

@lexer lexer

main ->
        null        {% utils.discard %}
    |   undef       {% utils.forward %}
    |   boolean     {% utils.forward %}
    |   expr        {% utils.forward %}
    |   string      {% utils.forward %}
    |   path        {% utils.forward %}
    |   identifier  {% utils.forward %}
    |   comment     {% utils.forward %}

expr ->
        term (("+" | "-") term):*       {% builders.binaryOperator %}

term ->
        factor (("*" | "/") factor):*   {% builders.binaryOperator %}

factor ->
        ("+" | "-") factor              {% builders.unaryOperator %}
    |   number                          {% utils.forward %}
    |   "(" expr ")"                    {% utils.surrounded %}

# Symbols and primitives
undef ->
        "undef"  {% builders.undef %}

boolean ->
        "true"  {% builders.boolean %}
    |   "false" {% builders.boolean %}

number ->
        %number {% builders.number %}

string ->
        %string {% builders.string %}

path ->
        %path {% builders.path %}

identifier ->
        %identifier {% builders.identifier %}

# General comments and annotations
comment ->
        %lcomment {% builders.lineComment %}
    |   %mcomment {% builders.blockComment %}
