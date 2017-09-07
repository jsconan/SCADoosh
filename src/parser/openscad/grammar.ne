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
        statements              {% (data) => builders.list(data, 'AstPackage') %}

statements ->
        statement:*

statement ->
        ";"                     {% (data) => builders.noop(data) %}
    |   "{" statements "}"      {% (data) => builders.block(data, 'AstBlock') %}
    |   assignment ";"          {% utils.head %}
    |   comment                 {% id %}
    |   include                 {% id %}

include ->
        "include" path          {% (data) => builders.command(data, 'AstInclude') %}
    |   "use" path              {% (data) => builders.command(data, 'AstUse') %}

assignment ->
        identifier "=" expr     {% (data) => builders.assignment(data, 'AstAssignment') %}

expr ->
       (expr "&&" cond
    |   expr "||" cond)         {% (data) => builders.binaryOperator(data, 'AstBinaryOperator') %}
    |   cond                    {% id %}

cond ->
       (cond "<" sum
    |   cond "<=" sum
    |   cond "==" sum
    |   cond "!=" sum
    |   cond ">" sum
    |   cond ">=" sum)          {% (data) => builders.binaryOperator(data, 'AstBinaryOperator') %}
    |   sum                     {% id %}

sum ->
       (sum "+" term
    |   sum "-" term)           {% (data) => builders.binaryOperator(data, 'AstBinaryOperator') %}
    |   term                    {% id %}

term ->
       (term "*" atom
    |   term "/" atom
    |   term "%" atom)          {% (data) => builders.binaryOperator(data, 'AstBinaryOperator') %}
    |   atom                    {% id %}

atom ->
       ("+" atom
    |   "-" atom
    |   "!" atom)               {% (data) => builders.unaryOperator(data, 'AstUnaryOperator') %}
    |   "(" expr ")"            {% utils.surrounded %}
    |   value                   {% id %}

# Literals
value ->
        number                  {% id %}
    |   string                  {% id %}
    |   boolean                 {% id %}
    |   undef                   {% id %}
    |   identifier              {% id %}

undef ->
        "undef"                 {% (data) => builders.terminal(data, 'AstUndefined') %}

boolean ->
        ("true" | "false")      {% (data) => builders.terminal(data, 'AstBoolean') %}

number ->
        %number                 {% (data) => builders.terminal(data, 'AstNumber') %}

string ->
        %string                 {% (data) => builders.terminal(data, 'AstString') %}

path ->
        %path                   {% (data) => builders.terminal(data, 'AstPath') %}

identifier ->
        %identifier             {% (data) => builders.terminal(data, 'AstIdentifier') %}

# General comments and annotations
comment ->
        %lcomment               {% (data) => builders.terminal(data, 'AstLineComment') %}
    |   %mcomment               {% (data) => builders.terminal(data, 'AstBlockComment') %}
