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
 * Defines an AST node that represents an include statement.
 *
 * @package src/ast/classes
 * @author jsconan
 */

const _ = require('lodash');
const AstPath = require('./path');
const AstFragment = require('./fragment');

/**
 * Defines an AST node that represents an include statement.
 * @typedef {AstFragment} AstInclude
 * @property {String} type
 * @property {AstPath} identifier
 * @property {AstPosition} start
 * @property {AstPosition} end
 */
class AstInclude extends AstFragment {
    /**
     * Creates an AstInclude.
     * @param {AstPath} path
     * @param {Object} [properties] - An optional list of additional properties to set.
     * @throws {TypeError} if the path is not an AstPath
     */
    constructor(path, properties) {
        super(_.assign({
            type: 'include',
            path: path
        }, properties));
    }

    /**
     * Transforms the properties before assign them to the node.
     * @param {Object} properties - The properties to transform
     * @returns {Object}
     * @throws {TypeError} if the properties are invalid
     */
    mapProperties(properties) {
        if (!AstPath.validate(properties.path)) {
            throw new TypeError('The path should be an AstPath!');
        }

        return properties;
    }
}

module.exports = AstInclude;
