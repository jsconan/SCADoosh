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
 * Unit tests: AST node that represents an array lookup.
 *
 * @package tests/ast/classes
 * @author jsconan
 */

const chai = require('chai');
const expect = chai.expect;

const AstNode = require('../../../src/ast/classes/node');
const AstPosition = require('../../../src/ast/classes/position');
const AstFragment = require('../../../src/ast/classes/fragment');
const AstIdentifier = require('../../../src/ast/classes/identifier');
const AstNumber = require('../../../src/ast/classes/number');
const AstArrayLookup = require('../../../src/ast/classes/array-lookup');

describe('AST node: AstArrayLookup', () => {

    it('should create an AstArrayLookup', () => {
        const type = 'array-lookup';
        const array = new AstIdentifier(2);
        const index = new AstNumber(1);
        const node = new AstArrayLookup(array, index);

        expect(node).to.be.an('object');
        expect(node).to.be.an.instanceOf(AstNode);
        expect(node).to.be.an.instanceOf(AstFragment);
        expect(node).to.be.an.instanceOf(AstArrayLookup);
        expect(node.array).to.be.instanceOf(AstFragment);
        expect(node.index).to.be.instanceOf(AstFragment);
        expect(node).to.have.a.property('type').that.is.equal(type);
        expect(node).to.have.a.property('array').that.is.equal(array);
        expect(node).to.have.a.property('index').that.is.equal(index);
    });

    it('should throw a TypeError if one of the operands is not a valid AstFragment', () => {
        expect(() => new AstArrayLookup(new AstIdentifier(1), {})).to.throw(TypeError);
        expect(() => new AstArrayLookup(new AstIdentifier(1), new AstNode('foo'))).to.throw(TypeError);
        expect(() => new AstArrayLookup({}, new AstNumber(1))).to.throw(TypeError);
        expect(() => new AstArrayLookup(new AstNode('foo'), new AstNumber(1))).to.throw(TypeError);
    });

    it('should stringify an AstArrayLookup', () => {
        const type = 'array-lookup';
        const array = new AstIdentifier('foo');
        const index = new AstNumber(2);
        const startLine = 1;
        const startColumn = 1;
        const startOffset = 0;
        const endLine = 1;
        const endColumn = 6;
        const endOffset = 5;
        const expected = {
            type: type,
            array: {type: 'identifier', value: 'foo'},
            index: {type: 'number', value: 2},
            start: {type: 'position', line: startLine, column: startColumn, offset: startOffset},
            end: {type: 'position', line: endLine, column: endColumn, offset: endOffset}
        };
        const node = new AstArrayLookup(array, index);
        const stringified = '{"type":"' + type + '",' +
            '"array":{"type":"identifier","value":"foo"},' +
            '"index":{"type":"number","value":2},' +
            '"start":{"type":"position","line":' + startLine + ',"column":' + startColumn + ',"offset":' + startOffset + '},' +
            '"end":{"type":"position","line":' + endLine + ',"column":' + endColumn + ',"offset":' + endOffset + '}}';

        node.startAt(startLine, startColumn, startOffset);
        node.endAt(endLine, endColumn, endOffset);

        expect(node).to.be.an('object');
        expect(node).to.be.an.instanceOf(AstNode);
        expect(node).to.be.an.instanceOf(AstFragment);
        expect(node).to.be.an.instanceOf(AstArrayLookup);
        expect(node).to.deep.equal(expected);
        expect(node.array).to.be.instanceOf(AstFragment);
        expect(node.index).to.be.instanceOf(AstFragment);
        expect(node.start).to.be.instanceOf(AstPosition);
        expect(node.end).to.be.instanceOf(AstPosition);
        expect(node + '').to.be.equal(stringified);
    });

    it('should clone an AstArrayLookup', () => {
        const node = (new AstArrayLookup(new AstIdentifier('foo'), new AstNumber(2))).startAt(1, 1, 0).endAt(1, 6, 5);

        const clone = node.clone();

        expect(clone).to.be.an('object');
        expect(clone).to.be.an.instanceOf(AstNode);
        expect(clone).to.be.an.instanceOf(AstFragment);
        expect(clone).to.be.an.instanceOf(AstArrayLookup);
        expect(clone).to.not.be.equal(node);
        expect(clone).to.be.deep.equal(node);
    });

    it('should clone an AstArrayLookup with the provided properties', () => {
        const array = new AstIdentifier('foo');
        const index = new AstNumber(2);
        const newArray = new AstIdentifier('bar');
        const newIndex = new AstNumber(1);

        const node = (new AstArrayLookup(array, index)).startAt(1, 1, 0).endAt(1, 6, 5);

        const clone = node.clone({
            type: 'number',         // should not be allowed
            array: newArray,
            index: newIndex,
        });

        expect(clone).to.be.an('object');
        expect(clone).to.be.an.instanceOf(AstNode);
        expect(clone).to.be.an.instanceOf(AstFragment);
        expect(clone).to.be.an.instanceOf(AstArrayLookup);
        expect(clone).to.not.be.equal(node);
        expect(clone).to.be.not.deep.equal(node);
        expect(clone).to.have.a.property('type').that.is.equal(node.type);
        expect(clone).to.have.a.property('array').that.is.equal(newArray);
        expect(clone).to.have.a.property('index').that.is.equal(newIndex);
        expect(clone).to.have.a.property('start').that.is.equal(node.start);
        expect(clone).to.have.a.property('end').that.is.equal(node.end);
    });

    it('should throw a TypeError if one of the operands is not a valid AstFragment when cloning', () => {
        const node = (new AstArrayLookup(new AstNumber(2), new AstIdentifier(1))).startAt(1, 1, 0).endAt(1, 4, 3);
        expect(() => node.clone({array: {}})).to.throw(TypeError);
        expect(() => node.clone({array: new AstNode('foo')})).to.throw(TypeError);
        expect(() => node.clone({index: {}})).to.throw(TypeError);
        expect(() => node.clone({index: new AstNode('foo')})).to.throw(TypeError);
    });

});
