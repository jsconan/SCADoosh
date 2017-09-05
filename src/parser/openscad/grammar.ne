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
# Grammar that applies on the OpenSCAD language.
#
# @package src/parser/openscad
# @author jsconan
#

@{%
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
%}

@lexer lexer

package ->
        statements              {% utils.forward %}

statements ->
        statement:*             {% (data) => builders.list(data, 'AstBlock') %}

statement ->
        ";"                     {% (data) => builders.noop(data) %}
    |   "{" statements "}"      {% utils.surrounded %}
    |   assignment ";"          {% utils.head %}
    |   comment
    |   include

include ->
        "include" path          {% (data) => builders.command(data, 'AstInclude') %}
    |   "use" path              {% (data) => builders.command(data, 'AstUse') %}

assignment ->
        identifier "=" (expr | undef | boolean | string)    {% (data) => builders.assignment(data, 'AstAssignment') %}

expr ->
        term (("+" | "-") term):*               {% (data) => builders.binaryOperator(data, 'AstBinaryOperator') %}

term ->
        factor (("*" | "/" | "%") factor):*     {% (data) => builders.binaryOperator(data, 'AstBinaryOperator') %}

factor ->
        ("+" | "-") factor      {% (data) => builders.unaryOperator(data, 'AstUnaryOperator') %}
    |   "(" expr ")"            {% utils.surrounded %}
    |   number
    |   identifier

# Literals
undef ->
        "undef"             {% (data) => builders.terminal(data, 'AstUndefined') %}

boolean ->
        ("true" | "false")  {% (data) => builders.terminal(data, 'AstBoolean') %}

number ->
        %number             {% (data) => builders.terminal(data, 'AstNumber') %}

string ->
        %string             {% (data) => builders.terminal(data, 'AstString') %}

path ->
        %path               {% (data) => builders.terminal(data, 'AstPath') %}

identifier ->
        %identifier         {% (data) => builders.terminal(data, 'AstIdentifier') %}

# General comments and annotations
comment ->
        %lcomment           {% (data) => builders.terminal(data, 'AstLineComment') %}
    |   %mcomment           {% (data) => builders.terminal(data, 'AstBlockComment') %}
