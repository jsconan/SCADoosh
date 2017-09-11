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
 * Defines an AST node that represents a position in the source code.
 *
 * @package src/ast/classes
 * @author jsconan
 */

const _ = require('lodash');
const AstNode = require('./node');

/**
 * Defines an AST node that represents a position in the source code.
 * @typedef {AstNode} AstPosition
 * @property {String} type
 * @property {Number} line
 * @property {Number} column
 * @property {Number} offset
 */
class AstPosition extends AstNode {
    /**
     * Creates an AstPosition.
     * @param {Number|String} line - The line coordinate, must be an integer above 0
     * @param {Number|String} column - The column coordinate, must be an integer above 0
     * @param {Number|String} offset - The offset from the beginning of the text
     * @param {Object} [properties] - An optional list of additional properties to set.
     * @throws {TypeError} if the values are negative or null
     */
    constructor(line, column, offset, properties) {
        super(_.assign({
            type: 'Position',
            line: line,
            column: column,
            offset: offset
        }, properties));
    }

    /**
     * Transforms the properties before assign them to the node.
     * @param {Object} properties - The properties to transform
     * @returns {Object}
     * @throws {TypeError} if the properties are invalid
     */
    mapProperties(properties) {
        properties.line = parseInt(properties.line, 10);
        properties.column = parseInt(properties.column, 10);
        properties.offset = parseInt(properties.offset, 10);

        if (isNaN(properties.line) || properties.line < 1 ||
            isNaN(properties.column) || properties.column < 1 ||
            isNaN(properties.offset) || properties.offset < 0) {
            throw new TypeError('The text coordinates cannot be negative or null');
        }

        return super.mapProperties(properties);
    }
}

module.exports = AstPosition;
