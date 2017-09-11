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
 * Defines an AST node that represents a function call.
 *
 * @package src/ast/classes
 * @author jsconan
 */

const _ = require('lodash');
const AstIdentifier = require('./identifier');
const AstFragment = require('./fragment');

/**
 * Defines an AST node that represents a function call.
 * @typedef {AstFragment} AstFunctionCall
 * @property {String} type
 * @property {AstIdentifier} identifier
 * @property {AstFragment[]} parameters
 * @property {AstPosition} start
 * @property {AstPosition} end
 */
class AstFunctionCall extends AstFragment {
    /**
     * Creates an AstFunctionCall.
     * @param {AstIdentifier} identifier
     * @param {AstFragment[]} parameters
     * @param {Object} [properties] - An optional list of additional properties to set.
     * @throws {TypeError} if the identifier is not an AstIdentifier, or if the parameters are not valid AstFragment
     */
    constructor(identifier, parameters, properties) {
        super(_.assign({
            type: 'FunctionCall',
            identifier: identifier,
            parameters: parameters
        }, properties));
    }

    /**
     * Transforms the properties before assign them to the node.
     * @param {Object} properties - The properties to transform
     * @returns {Object}
     * @throws {TypeError} if the properties are invalid
     */
    mapProperties(properties) {
        if (!AstIdentifier.validate(properties.identifier)) {
            throw new TypeError('The identifier should be an AstIdentifier!');
        }

        if (!_.isArray(properties.parameters)) {
            properties.parameters = [properties.parameters];
        }

        if (!AstFragment.validateNodes(properties.parameters)) {
            throw new TypeError('The parameters should be a list of AstFragment!');
        }

        return super.mapProperties(properties);
    }
}

module.exports = AstFunctionCall;
