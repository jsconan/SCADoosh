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
const lexer = require('./lexer');
const pp = require('./postprocessors');
%}

@lexer lexer

main ->
        undef       {% id %}
    |   boolean     {% id %}
    |   number      {% id %}
    |   string      {% id %}
    |   path        {% id %}
    |   identifier  {% id %}
    |   comment     {% id %}

# Symbols and primitives
undef ->
        "undef"  {% pp.undef %}

boolean ->
        "true"  {% pp.bool %}
    |   "false" {% pp.bool %}

number ->
        %number {% pp.number %}

string ->
        %string {% pp.string %}

path ->
        %path {% pp.path %}

identifier ->
        %identifier {% pp.identifier %}

# General comments and annotations
comment ->
        %lcomment {% pp.lcomment %}
    |   %mcomment {% pp.mcomment %}
