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
 * Defines an AST node that represents a package.
 *
 * @package src/ast/classes
 * @author jsconan
 */

const AstGroup = require('./group');

/**
 * Defines an AST node that represents a package.
 * @typedef {AstGroup} AstPackage
 * @property {String} type
 * @property {AstNode[]} statements
 * @property {AstPosition} start
 * @property {AstPosition} end
 */
class AstPackage extends AstGroup {
    /**
     * Creates an AstPackage.
     * @param {AstFragment[]|AstFragment} statements - A statement or a list of statements
     * @throws {TypeError} if the statements are not valid AST nodes
     */
    constructor(statements) {
        super('package', statements);
    }
}

module.exports = AstPackage;
