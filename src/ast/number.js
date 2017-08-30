/**
 * @license
 * GPLv3 License
 *
 * Copyright (c) 2017 Jean-Sebastien CONAN
 *
 * This file is part of SCADoosh.
 *
 * SCADoosh is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * SCADoosh is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with SCADoosh. If not, see <http://www.gnu.org/licenses/>.
 */

/**
 * Part of the SCADoosh tool.
 *
 * Defines an AST node that represents a number literal.
 *
 * @package src/ast
 * @author jsconan
 */

const AstLiteral = require('./literal');

/**
 * Defines an AST node that represents a number literal.
 * @typedef {AstLiteral} AstNumber
 * @property {String} type
 * @property {Number} value
 * @property {AstPosition} start
 * @property {AstPosition} end
 */
class AstNumber extends AstLiteral {
    /**
     * Creates an AstNumber.
     * @param {Number|String} value
     */
    constructor(value) {
        super('number', parseFloat(value));
    }
}

module.exports = AstNumber;
