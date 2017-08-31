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
 * Defines an AST node that represents a single line comment.
 *
 * @package src/ast
 * @author jsconan
 */

const AstComment = require('./comment');

/**
 * Defines an AST node that represents a single line comment.
 * @typedef {AstComment} AstLineComment
 * @property {String} type
 * @property {String} value
 * @property {AstPosition} start
 * @property {AstPosition} end
 */
class AstLineComment extends AstComment {
    /**
     * Creates an AstLineComment.
     * @param {String} value
     */
    constructor(value) {
        super('lineComment', value);
    }
}

module.exports = AstLineComment;
