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
 * Defines an AST node that represents a module call.
 *
 * @package src/ast/classes
 * @author jsconan
 */

const _ = require('lodash');
const AstFunctionCall = require('./function-call');

/**
 * Defines an AST node that represents a module call.
 * @typedef {AstFunctionCall} AstModuleCall
 * @property {String} type
 * @property {AstIdentifier} identifier
 * @property {AstFragment[]} parameters
 * @property {AstPosition} start
 * @property {AstPosition} end
 */
class AstModuleCall extends AstFunctionCall {
    /**
     * Creates an AstModuleCall.
     * @param {AstIdentifier} identifier
     * @param {AstFragment[]} parameters
     * @param {Object} [properties] - An optional list of additional properties to set.
     * @throws {TypeError} if the identifier is not an AstIdentifier, or if the parameters are not valid AstFragment
     */
    constructor(identifier, parameters, properties) {
        super(identifier, parameters, _.assign({type: 'module-call'}, properties));
    }
}

module.exports = AstModuleCall;
