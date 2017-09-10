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
 * Defines an AST node that represents a list of nodes.
 *
 * @package src/ast/classes
 * @author jsconan
 */

const _ = require('lodash');
const AstFragment = require('./fragment');

/**
 * Defines an AST node that represents a list of nodes.
 * @typedef {AstFragment} AstGroup
 * @property {String} type
 * @property {AstFragment[]} statements
 * @property {AstPosition} start
 * @property {AstPosition} end
 */
class AstGroup extends AstFragment {
    /**
     * Creates an AstGroup.
     * @param {String} type
     * @param {AstFragment[]|AstFragment} statements - A statement or a list of statements
     * @param {Object} [properties] - An optional list of additional properties to set.
     * @throws {TypeError} if the statements are not valid AST nodes
     */
    constructor(type, statements, properties) {
        super(_.assign({
            type: type,
            statements: statements
        }, properties));
    }

    /**
     * Transforms the properties before assign them to the node.
     * @param {Object} properties - The properties to transform
     * @returns {Object}
     * @throws {TypeError} if the properties are invalid
     */
    mapProperties(properties) {
        if (!_.isArray(properties.statements)) {
            properties.statements = [properties.statements];
        }

        if (!AstFragment.validateNodes(properties.statements)) {
            throw new TypeError('The statements should be a a list of AstFragment!');
        }
        return properties;
    }
}

module.exports = AstGroup;
