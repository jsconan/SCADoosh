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
 * Defines an AST node that represents a comment.
 *
 * @package src/ast
 * @author jsconan
 */

const _ = require('lodash');
const AstFragment = require('./fragment');

/**
 * Defines an AST node that represents a comment.
 * @typedef {AstFragment} AstComment
 * @property {String} type
 * @property {String|Array} value
 * @property {AstPosition} start
 * @property {AstPosition} end
 */
class AstComment extends AstFragment {
    /**
     * Creates an AstComment.
     * @param {String|Array} value
     */
    constructor(value) {
        let type;

        if (_.isArray(value)) {
            type = 'mcomment';
        } else {
            type = 'lcomment';
            value = '' + value;
        }

        super({
            type: type,
            value: value
        });
    }
}

module.exports = AstComment;
