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
 * Defines an AST node that represents a language fragment.
 *
 * @package src/ast
 * @author jsconan
 */

const AstNode = require('./node');
const AstPosition = require('./position');

/**
 * Defines an AST node that represents a language fragment.
 * @typedef {AstNode} AstFragment
 * @property {String} type
 * @property {AstPosition} start
 * @property {AstPosition} end
 */
class AstFragment extends AstNode {
    /**
     * Sets the start position of the fragment
     * @param {Number|String} line
     * @param {Number|String} column
     * @param {Number|String} offset
     * @returns {AstFragment}
     */
    startAt(line, column, offset) {
        this.addProperty('start', new AstPosition(line, column, offset));
        return this;
    }

    /**
     * Sets the end position of the fragment
     * @param {Number|String} line
     * @param {Number|String} column
     * @param {Number|String} offset
     * @returns {AstFragment}
     */
    endAt(line, column, offset) {
        this.addProperty('end', new AstPosition(line, column, offset));
        return this;
    }
}

module.exports = AstFragment;
