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
     * @param {String} type
     * @param {String|Array} value
     */
    constructor(type, value) {
        super({
            type: type,
            value: _.isArray(value) ? value : '' + value
        });
    }

    /**
     * Clones the instance.
     * @param {Object} [properties] - an optional list of additional properties to set.
     * @returns {AstComment}
     */
    clone(properties) {
        if (properties && typeof properties.value !== 'undefined') {
            properties.value = '' + properties.value;
        }

        return super.clone(properties);
    }
}

module.exports = AstComment;
