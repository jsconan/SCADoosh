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
 * Defines an AST node that represents a member lookup.
 *
 * @package src/ast/classes
 * @author jsconan
 */

const _ = require('lodash');
const AstIdentifier = require('./identifier');
const AstFragment = require('./fragment');

/**
 * Defines an AST node that represents a member lookup.
 * @typedef {AstFragment} AstMemberLookup
 * @property {String} type
 * @property {AstFragment} expr
 * @property {AstIdentifier} member
 * @property {AstPosition} start
 * @property {AstPosition} end
 */
class AstMemberLookup extends AstFragment {
    /**
     * Creates an AstMemberLookup.
     * @param {AstFragment} expr
     * @param {AstIdentifier} member
     * @param {Object} [properties] - An optional list of additional properties to set.
     * @throws {TypeError} if the member is not an AstIdentifier, or if the expression is not a valid AstFragment
     */
    constructor(expr, member, properties) {
        super(_.assign({
            type: 'member-lookup',
            expr: expr,
            member: member,
        }, properties));
    }

    /**
     * Transforms the properties before assign them to the node.
     * @param {Object} properties - The properties to transform
     * @returns {Object}
     * @throws {TypeError} if the properties are invalid
     */
    mapProperties(properties) {
        if (!AstFragment.validate(properties.expr)) {
            throw new TypeError('The expression should be an AstFragment!');
        }
        if (!AstIdentifier.validate(properties.member)) {
            throw new TypeError('The member should be an AstIdentifier!');
        }
        return super.mapProperties(properties);
    }
}

module.exports = AstMemberLookup;
