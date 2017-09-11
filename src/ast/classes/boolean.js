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
 * @package src/ast/classes
 * @author jsconan
 */

const AstLiteral = require('./literal');

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
     * @param {Object} [properties] - An optional list of additional properties to set.
     * @throws {TypeError} if the value is not a valid boolean
     */
    constructor(value, properties) {
        super('Boolean', value, properties);
    }

    /**
     * Gets a boolean value.
     * @param {*} value
     * @returns {Boolean}
     * @throws {TypeError} if the value is not a valid boolean
     */
    cast(value) {
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
}

module.exports = AstBoolean;
