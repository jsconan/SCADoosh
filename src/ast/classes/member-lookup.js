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
     * @throws {TypeError} if the member is not an AstIdentifier, or if the expression is not a valid AstFragment
     */
    constructor(expr, member) {
        if (!AstFragment.validate(expr)) {
            throw new TypeError('The expression should be an AstFragment!');
        }
        if (!AstIdentifier.validate(member)) {
            throw new TypeError('The member should be an AstIdentifier!');
        }
        super({
            type: 'member-lookup',
            expr: expr,
            member: member,
        });
    }

    /**
     * Clones the instance.
     * @param {Object} [properties] - an optional list of additional properties to set.
     * @returns {AstMemberLookup}
     * @throws {TypeError} if the member is not an AstIdentifier, or if the expression is not a valid AstFragment
     */
    clone(properties) {
        if (properties) {
            if (typeof properties.expr !== 'undefined' && !AstFragment.validate(properties.expr)) {
                throw new TypeError('The expression should be an AstFragment!');
            }
            if (typeof properties.member !== 'undefined' && !AstIdentifier.validate(properties.member)) {
                throw new TypeError('The member should be an AstIdentifier!');
            }
        }

        return super.clone(properties);
    }
}

module.exports = AstMemberLookup;
