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
 * Defines an AST node that represents a list of statements.
 *
 * @package src/ast
 * @author jsconan
 */

const _ = require('lodash');
const AstNode = require('./node');
const AstFragment = require('./fragment');

/**
 * Ensures the statements are valid AST nodes
 * @param {AstNode[]} statements
 * @throws {TypeError} if the statements are not valid AST nodes
 */
function validateStatements(statements) {
    statements.forEach((statement) => {
        if (!AstNode.validate(statement)) {
            throw new TypeError('The statement should be an AstNode!');
        }
    });
}

/**
 * Defines an AST node that represents a list of statements.
 * @typedef {AstFragment} AstBlock
 * @property {String} type
 * @property {AstNode[]} statements
 * @property {AstPosition} start
 * @property {AstPosition} end
 */
class AstBlock extends AstFragment {
    /**
     * Creates an AstBlock.
     * @param {AstNode[]|AstNode} statements - A statement or a list of statements
     * @throws {TypeError} if the statements are not valid AST nodes
     */
    constructor(statements) {
        if (!_.isArray(statements)) {
            statements = [statements];
        }

        validateStatements(statements);

        super({
            type: 'block',
            statements: statements
        });
    }

    /**
     * Clones the instance.
     * @param {Object} [properties] - an optional list of additional properties to set.
     * @returns {AstBlock}
     * @throws {TypeError} if the statements are not valid AST nodes
     */
    clone(properties) {
        if (properties && typeof properties.statements !== 'undefined') {
            if (!_.isArray(properties.statements)) {
                properties.statements = [properties.statements];
            }

            validateStatements(properties.statements);
        }

        return super.clone(properties);
    }
}

module.exports = AstBlock;
