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
     * Sets the start position of the fragment. Accept to copy the position from another AstFragment.
     * @param {Number|String|AstFragment} line
     * @param {Number|String} [column]
     * @param {Number|String} [offset]
     * @returns {AstFragment}
     * @throws {TypeError} if the position is intended to be set from an object that is not an AstFragment
     */
    startAt(line, column, offset) {
        let position;

        if (typeof line === 'object') {
            if (line instanceof AstFragment) {
                position = line.start;
            } else {
                throw new TypeError('Cannot set a start position from a non AstFragment');
            }
        } else {
            position = new AstPosition(line, column, offset);
        }

        this.addProperty('start', position);

        return this;
    }

    /**
     * Sets the end position of the fragment. Accept to copy the position from another AstFragment.
     * @param {Number|String|AstFragment} line
     * @param {Number|String} [column]
     * @param {Number|String} [offset]
     * @returns {AstFragment}
     * @throws {TypeError} if the position is intended to be set from an object that is not an AstFragment
     */
    endAt(line, column, offset) {
        let position;

        if (typeof line === 'object') {
            if (line instanceof AstFragment) {
                position = line.end;
            } else {
                throw new TypeError('Cannot set an end position from a non AstFragment');
            }
        } else {
            position = new AstPosition(line, column, offset);
        }

        this.addProperty('end', position);

        return this;
    }

    /**
     * Clones the instance.
     * @param {Object} [properties] - an optional list of additional properties to set.
     * @returns {AstFragment}
     * @throws {TypeError} if one of the operands is not a valid AstNode
     */
    clone(properties) {
        if (properties) {
            let error = false;
            if (typeof properties.start !== 'undefined') {
                error = error || !AstNode.validate(properties.start, AstPosition);
            }
            if (typeof properties.end !== 'undefined') {
                error = error || !AstNode.validate(properties.end, AstPosition);
            }
            if (error) {
                throw new TypeError('Cannot set a position from a non AstFragment');
            }
        }

        return super.clone(properties);
    }
}

module.exports = AstFragment;
