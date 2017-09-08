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
 * Unit tests: AST node that represents an identifier lookup.
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
const AstLookup = require('../../../src/ast/classes/lookup');

describe('AST node: AstLookup', () => {

    it('should create an AstLookup', () => {
        const type = 'lookup';
        const name = new AstIdentifier('foo');
        const node = new AstLookup(name);

        expect(node).to.be.an('object');
        expect(node).to.be.an.instanceOf(AstNode);
        expect(node).to.be.an.instanceOf(AstFragment);
        expect(node).to.be.an.instanceOf(AstLookup);
        expect(node.name).to.be.instanceOf(AstIdentifier);
        expect(node).to.have.a.property('type').that.is.equal(type);
        expect(node).to.have.a.property('name').that.is.equal(name);
    });

    it('should throw a TypeError if the name is not a valid AstIdentifier', () => {
        expect(() => new AstLookup({})).to.throw(TypeError);
        expect(() => new AstLookup(new AstNumber(1))).to.throw(TypeError);
        expect(() => new AstLookup(new AstNode('foo'))).to.throw(TypeError);
    });

    it('should stringify an AstLookup', () => {
        const type = 'lookup';
        const name = new AstIdentifier('foo');
        const startLine = 1;
        const startColumn = 1;
        const startOffset = 0;
        const endLine = 1;
        const endColumn = 6;
        const endOffset = 5;
        const expected = {
            type: type,
            name: {type: 'identifier', value: 'foo'},
            start: {type: 'position', line: startLine, column: startColumn, offset: startOffset},
            end: {type: 'position', line: endLine, column: endColumn, offset: endOffset}
        };
        const node = new AstLookup(name);
        const stringified = '{"type":"' + type + '",' +
            '"name":{"type":"identifier","value":"foo"},' +
            '"start":{"type":"position","line":' + startLine + ',"column":' + startColumn + ',"offset":' + startOffset + '},' +
            '"end":{"type":"position","line":' + endLine + ',"column":' + endColumn + ',"offset":' + endOffset + '}}';

        node.startAt(startLine, startColumn, startOffset);
        node.endAt(endLine, endColumn, endOffset);

        expect(node).to.be.an('object');
        expect(node).to.be.an.instanceOf(AstNode);
        expect(node).to.be.an.instanceOf(AstFragment);
        expect(node).to.be.an.instanceOf(AstLookup);
        expect(node).to.deep.equal(expected);
        expect(node.name).to.be.instanceOf(AstIdentifier);
        expect(node.start).to.be.instanceOf(AstPosition);
        expect(node.end).to.be.instanceOf(AstPosition);
        expect(node + '').to.be.equal(stringified);
    });

    it('should clone an AstLookup', () => {
        const node = (new AstLookup(new AstIdentifier('foo'))).startAt(1, 1, 0).endAt(1, 6, 5);

        const clone = node.clone();

        expect(clone).to.be.an('object');
        expect(clone).to.be.an.instanceOf(AstNode);
        expect(clone).to.be.an.instanceOf(AstFragment);
        expect(clone).to.be.an.instanceOf(AstLookup);
        expect(clone).to.not.be.equal(node);
        expect(clone).to.be.deep.equal(node);
    });

    it('should clone an AstLookup with the provided properties', () => {
        const name = new AstIdentifier('foo');
        const newName = new AstIdentifier('bar');

        const node = (new AstLookup(name)).startAt(1, 1, 0).endAt(1, 6, 5);

        const clone = node.clone({
            type: 'number',         // should not be allowed
            name: newName,
        });

        expect(clone).to.be.an('object');
        expect(clone).to.be.an.instanceOf(AstNode);
        expect(clone).to.be.an.instanceOf(AstFragment);
        expect(clone).to.be.an.instanceOf(AstLookup);
        expect(clone).to.not.be.equal(node);
        expect(clone).to.be.not.deep.equal(node);
        expect(clone).to.have.a.property('type').that.is.equal(node.type);
        expect(clone).to.have.a.property('name').that.is.equal(newName);
        expect(clone).to.have.a.property('start').that.is.equal(node.start);
        expect(clone).to.have.a.property('end').that.is.equal(node.end);
    });

    it('should throw a TypeError if one of the operands is not a valid AstFragment when cloning', () => {
        const node = (new AstLookup(new AstIdentifier(1))).startAt(1, 1, 0).endAt(1, 4, 3);
        expect(() => node.clone({name: {}})).to.throw(TypeError);
        expect(() => node.clone({name: new AstNumber(3)})).to.throw(TypeError);
        expect(() => node.clone({name: new AstNode('foo')})).to.throw(TypeError);
    });

});
