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
 * Defines an AST node that represents an expression with a declarations clause.
 *
 * @package src/ast/classes
 * @author jsconan
 */

const _ = require('lodash');
const AstFragment = require('./fragment');

/**
 * Defines an AST node that represents an expression with a declarations clause.
 * @typedef {AstFragment} AstExpression
 * @property {String} type
 * @property {AstFragment} expression
 * @property {AstFragment[]} declarations
 * @property {AstPosition} start
 * @property {AstPosition} end
 */
class AstExpression extends AstFragment {
    /**
     * Creates an AstExpression.
     * @param {AstFragment} expression
     * @param {AstFragment[]} declarations
     * @param {Object} [properties] - An optional list of additional properties to set.
     * @throws {TypeError} if the expression or the declarations are not valid AstFragment
     */
    constructor(expression, declarations, properties) {
        super(_.assign({
            type: 'expression',
            expression: expression,
            declarations: declarations
        }, properties));
    }

    /**
     * Transforms the properties before assign them to the node.
     * @param {Object} properties - The properties to transform
     * @returns {Object}
     * @throws {TypeError} if the properties are invalid
     */
    mapProperties(properties) {
        if (!AstFragment.validate(properties.expression)) {
            throw new TypeError('The expression should be an AstFragment!');
        }

        if (!_.isArray(properties.declarations)) {
            properties.declarations = [properties.declarations];
        }

        if (!AstFragment.validateNodes(properties.declarations)) {
            throw new TypeError('The declarations should be a list of AstFragment!');
        }

        return super.mapProperties(properties);
    }
}

module.exports = AstExpression;
