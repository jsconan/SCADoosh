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
 * Defines an AST node that represents an assignment.
 *
 * @package src/ast
 * @author jsconan
 */

const AstNode = require('./node');
const AstIdentifier = require('./identifier');
const AstFragment = require('./fragment');

/**
 * Defines an AST node that represents an assignment.
 * @typedef {AstFragment} AstAssignment
 * @property {String} type
 * @property {AstIdentifier} identifier
 * @property {AstNode} value
 * @property {AstPosition} start
 * @property {AstPosition} end
 */
class AstAssignment extends AstFragment {
    /**
     * Creates an AstAssignment.
     * @param {AstIdentifier} identifier
     * @param {AstNode} value
     * @throws {TypeError} if the identifier is not an AstIdentifier, or if the value is not a valid AstNode
     */
    constructor(identifier, value) {
        if (!AstNode.validate(identifier, AstIdentifier)) {
            throw new TypeError('The identifier should be an AstIdentifier!');
        }
        if (!AstNode.validate(value)) {
            throw new TypeError('The value should be an AstNode!');
        }
        super({
            type: 'assignment',
            identifier: identifier,
            value: value
        });
    }

    /**
     * Clones the instance.
     * @param {Object} [properties] - an optional list of additional properties to set.
     * @returns {AstAssignment}
     * @throws {TypeError} if the identifier is not an AstIdentifier, or if the value is not a valid AstNode
     */
    clone(properties) {
        if (properties) {
            if (typeof properties.identifier !== 'undefined' && !AstNode.validate(properties.identifier, AstIdentifier)) {
                throw new TypeError('The identifier should be an AstIdentifier!');
            }
            if (typeof properties.value !== 'undefined' && !AstNode.validate(properties.value)) {
                throw new TypeError('The value should be an AstNode!');
            }
        }

        return super.clone(properties);
    }
}

module.exports = AstAssignment;
