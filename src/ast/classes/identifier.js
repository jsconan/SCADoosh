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
 * Defines an AST node that represents an identifier.
 *
 * @package src/ast/classes
 * @author jsconan
 */

const AstLiteral = require('./literal');

/**
 * Defines an AST node that represents an identifier.
 * @typedef {AstLiteral} AstIdentifier
 * @property {String} type
 * @property {String} value
 * @property {AstPosition} start
 * @property {AstPosition} end
 */
class AstIdentifier extends AstLiteral {
    /**
     * Creates an AstIdentifier.
     * @param {String} value
     */
    constructor(value) {
        super('identifier', '' + value);
    }

    /**
     * Clones the instance.
     * @param {Object} [properties] - an optional list of additional properties to set.
     * @returns {AstIdentifier}
     */
    clone(properties) {
        if (properties && typeof properties.value !== 'undefined') {
            properties.value = '' + properties.value;
        }

        return super.clone(properties);
    }
}

module.exports = AstIdentifier;
