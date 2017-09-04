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
 * Defines an AST node that represents a use statement.
 *
 * @package src/ast
 * @author jsconan
 */

const AstNode = require('./node');
const AstPath = require('./path');
const AstFragment = require('./fragment');

/**
 * Defines an AST node that represents a use statement.
 * @typedef {AstFragment} AstUse
 * @property {String} type
 * @property {AstPath} identifier
 * @property {AstPosition} start
 * @property {AstPosition} end
 */
class AstUse extends AstFragment {
    /**
     * Creates an AstUse.
     * @param {AstPath} path
     * @throws {TypeError} if the path is not an AstPath
     */
    constructor(path) {
        if (!AstNode.validate(path, AstPath)) {
            throw new TypeError('The path should be an AstPath!');
        }
        super({
            type: 'use',
            path: path
        });
    }

    /**
     * Clones the instance.
     * @param {Object} [properties] - an optional list of additional properties to set.
     * @returns {AstUse}
     * @throws {TypeError} if the path is not an AstPath
     */
    clone(properties) {
        if (properties) {
            if (typeof properties.path !== 'undefined' && !AstNode.validate(properties.path, AstPath)) {
                throw new TypeError('The path should be an AstPath!');
            }
        }

        return super.clone(properties);
    }
}

module.exports = AstUse;
