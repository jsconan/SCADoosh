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
 * Defines an AST node that represents a boolean literal.
 *
 * @package src/ast
 * @author jsconan
 */

const AstLiteral = require('./literal');

/**
 * Gets a boolean value.
 * @param {Boolean|String} value
 * @returns {Boolean}
 * @throws {TypeError} if the value is not a valid boolean
 */
function boolean(value) {
    if (typeof value !== 'boolean') {
        switch ('' + value) {
            case 'true':
                value = true;
                break;

            case 'false':
                value = false;
                break;

            default:
                throw new TypeError(`${value} is not a valid boolean value`);
        }
    }
    return value;
}

/**
 * Defines an AST node that represents a string literal.
 * @typedef {AstLiteral} AstBoolean
 * @property {String} type
 * @property {Boolean} value
 * @property {AstPosition} start
 * @property {AstPosition} end
 */
class AstBoolean extends AstLiteral {
    /**
     * Creates an AstBoolean.
     * @param {Boolean|String} value
     * @throws {TypeError} if the value is not a valid boolean
     */
    constructor(value) {
        super('boolean', boolean(value));
    }

    /**
     * Clones the instance.
     * @param {Object} [properties] - an optional list of additional properties to set.
     * @returns {AstBoolean}
     * @throws {TypeError} if the value is not a valid boolean
     */
    clone(properties) {
        if (properties && typeof properties.value !== 'undefined') {
            properties.value = boolean(properties.value);
        }

        return super.clone(properties);
    }
}

module.exports = AstBoolean;
