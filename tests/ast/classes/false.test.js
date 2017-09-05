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
 * Unit tests: AST node that represents the boolean constant `true`.
 *
 * @package tests/ast/classes
 * @author jsconan
 */

const chai = require('chai');
const expect = chai.expect;

const AstNode = require('../../../src/ast/classes/node');
const AstFragment = require('../../../src/ast/classes/fragment');
const AstLiteral = require('../../../src/ast/classes/literal');
const AstBoolean = require('../../../src/ast/classes/boolean');
const AstFalse = require('../../../src/ast/classes/false');

describe('AST node: AstFalse', () => {

    it('should create an AstFalse', () => {
        const type = 'boolean';
        const value = false;
        const node = new AstFalse();

        expect(node).to.be.an('object');
        expect(node).to.be.an.instanceOf(AstNode);
        expect(node).to.be.an.instanceOf(AstFragment);
        expect(node).to.be.an.instanceOf(AstLiteral);
        expect(node).to.be.an.instanceOf(AstBoolean);
        expect(node).to.be.an.instanceOf(AstFalse);
        expect(node).to.have.a.property('type').that.is.equal(type);
        expect(node).to.have.a.property('value').that.is.equal(value);
    });

    it('should clone an AstFalse', () => {
        const node = (new AstFalse()).startAt(1, 1, 0).endAt(1, 4, 3);

        const clone = node.clone();

        expect(clone).to.be.an('object');
        expect(clone).to.be.an.instanceOf(AstNode);
        expect(clone).to.be.an.instanceOf(AstFragment);
        expect(clone).to.be.an.instanceOf(AstLiteral);
        expect(clone).to.be.an.instanceOf(AstBoolean);
        expect(clone).to.be.an.instanceOf(AstFalse);
        expect(clone).to.not.be.equal(node);
        expect(clone).to.be.deep.equal(node);
    });

    it('should clone an AstFalse with the provided properties', () => {
        const value = true;
        const node = (new AstFalse()).startAt(1, 1, 0).endAt(1, 4, 3);

        const clone = node.clone({
            type: 'number',         // should not be allowed
            value: value
        });

        expect(clone).to.be.an('object');
        expect(clone).to.be.an.instanceOf(AstNode);
        expect(clone).to.be.an.instanceOf(AstFragment);
        expect(clone).to.be.an.instanceOf(AstLiteral);
        expect(clone).to.be.an.instanceOf(AstBoolean);
        expect(clone).to.be.an.instanceOf(AstFalse);
        expect(clone).to.not.be.equal(node);
        expect(clone).to.be.not.deep.equal(node);
        expect(clone).to.have.a.property('type').that.is.equal(node.type);
        expect(clone).to.have.a.property('value').that.is.equal(value);
        expect(clone).to.have.a.property('start').that.is.equal(node.start);
        expect(clone).to.have.a.property('end').that.is.equal(node.end);
    });

    it('should throw a TypeError if the value to set in a clone is not compatible with boolean', () => {
        const node = new AstFalse();
        expect(() => node.clone({value: ''})).to.throw(TypeError);
        expect(() => node.clone({value: 'foo'})).to.throw(TypeError);
        expect(() => node.clone({value: {}})).to.throw(TypeError);
        expect(() => node.clone({value: 10})).to.throw(TypeError);
        expect(() => node.clone({value: 0})).to.throw(TypeError);
    });

});
