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
 * Unit tests: AST node that represents a range.
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
const AstRange = require('../../../src/ast/classes/range');

describe('AstRange', () => {

    it('should create an AstRange', () => {
        const type = 'Range';
        const first = new AstNumber(3);
        const step = new AstNumber(2);
        const last = new AstNumber(11);
        const node = new AstRange(first, step, last);

        expect(node).to.be.an('object');
        expect(node).to.be.an.instanceOf(AstNode);
        expect(node).to.be.an.instanceOf(AstFragment);
        expect(node).to.be.an.instanceOf(AstRange);
        expect(node).to.have.a.property('type').that.is.equal(type);
        expect(node).to.have.a.property('first').that.is.an.instanceOf(AstNumber).and.is.equal(first);
        expect(node).to.have.a.property('step').that.is.an.instanceOf(AstNumber).and.is.equal(step);
        expect(node).to.have.a.property('last').that.is.an.instanceOf(AstNumber).and.is.equal(last);
    });

    it('should create an AstRange with default step', () => {
        const type = 'Range';
        const first = new AstNumber(3);
        const last = new AstNumber(11);
        const node = new AstRange(first, null, last);

        expect(node).to.be.an('object');
        expect(node).to.be.an.instanceOf(AstNode);
        expect(node).to.be.an.instanceOf(AstFragment);
        expect(node).to.be.an.instanceOf(AstRange);
        expect(node).to.have.a.property('type').that.is.equal(type);
        expect(node).to.have.a.property('first').that.is.an.instanceOf(AstNumber).and.is.equal(first);
        expect(node).to.not.have.a.property('step');
        expect(node).to.have.a.property('last').that.an.instanceOf(AstNumber).and.is.is.equal(last);
    });

    it('should create an AstRange with only first and last values', () => {
        const type = 'Range';
        const first = new AstNumber(3);
        const last = new AstNumber(11);
        const node = new AstRange(first, last);

        expect(node).to.be.an('object');
        expect(node).to.be.an.instanceOf(AstNode);
        expect(node).to.be.an.instanceOf(AstFragment);
        expect(node).to.be.an.instanceOf(AstRange);
        expect(node).to.have.a.property('type').that.is.equal(type);
        expect(node).to.have.a.property('first').that.is.an.instanceOf(AstNumber).and.is.equal(first);
        expect(node).to.not.have.a.property('step');
        expect(node).to.have.a.property('last').that.an.instanceOf(AstNumber).and.is.is.equal(last);
    });

    it('should create an AstRange with the provided properties', () => {
        const type = 'Foo';
        const first = new AstNumber(3);
        const step = new AstNumber(2);
        const last = new AstNumber(11);
        const node = new AstRange('first', 'step', 'last', {
            type: type,
            first: first,
            step: step,
            last: last,
            foo: 'bar'
        });

        expect(node).to.be.an('object');
        expect(node).to.be.an.instanceOf(AstNode);
        expect(node).to.be.an.instanceOf(AstFragment);
        expect(node).to.be.an.instanceOf(AstRange);
        expect(node).to.have.a.property('type').that.is.equal(type);
        expect(node).to.have.a.property('first').that.is.an.instanceOf(AstNumber).and.is.equal(first);
        expect(node).to.have.a.property('step').that.is.an.instanceOf(AstNumber).and.is.equal(step);
        expect(node).to.have.a.property('last').that.is.an.instanceOf(AstNumber).and.is.equal(last);
        expect(node).to.have.a.property('foo').that.is.equal('bar');
    });

    it('should throw a TypeError if one of the operands is not a valid AstNode', () => {
        expect(() => new AstRange(new AstNumber(1), null)).to.throw(TypeError);
        expect(() => new AstRange(new AstNumber(1), {})).to.throw(TypeError);
        expect(() => new AstRange(new AstNumber(1), new AstNode('Foo'))).to.throw(TypeError);
        expect(() => new AstRange(null, new AstNumber(1))).to.throw(TypeError);
        expect(() => new AstRange({}, new AstNumber(1))).to.throw(TypeError);
        expect(() => new AstRange(new AstNode('Foo'), new AstNumber(1))).to.throw(TypeError);
        expect(() => new AstRange(null, new AstNumber(1), new AstNumber(1))).to.throw(TypeError);
        expect(() => new AstRange({}, new AstNumber(1), new AstNumber(1))).to.throw(TypeError);
        expect(() => new AstRange(new AstNode('Foo'), new AstNumber(1), new AstNumber(1))).to.throw(TypeError);
        expect(() => new AstRange(new AstNumber(1), {}, new AstNumber(1))).to.throw(TypeError);
        expect(() => new AstRange(new AstNumber(1), new AstNode('Foo'), new AstNumber(1))).to.throw(TypeError);
        expect(() => new AstRange(new AstNumber(1), new AstNumber(1), null)).to.throw(TypeError);
        expect(() => new AstRange(new AstNumber(1), new AstNumber(1), {})).to.throw(TypeError);
        expect(() => new AstRange(new AstNumber(1), new AstNumber(1), new AstNode('Foo'))).to.throw(TypeError);
    });

    it('should stringify an AstRange', () => {
        const type = 'Range';
        const first = new AstNumber(3);
        const step = new AstNumber(2);
        const last = new AstNumber(11);
        const startLine = 1;
        const startColumn = 1;
        const startOffset = 0;
        const endLine = 1;
        const endColumn = 6;
        const endOffset = 5;
        const expected = {
            type: type,
            first: {type: 'Number', value: 3},
            step: {type: 'Number', value: 2},
            last: {type: 'Number', value: 11},
            start: {type: 'Position', line: startLine, column: startColumn, offset: startOffset},
            end: {type: 'Position', line: endLine, column: endColumn, offset: endOffset}
        };
        const node = new AstRange(first, step, last);
        const stringified = '{"type":"' + type + '",' +
            '"first":{"type":"Number","value":3},' +
            '"step":{"type":"Number","value":2},' +
            '"last":{"type":"Number","value":11},' +
            '"start":{"type":"Position","line":' + startLine + ',"column":' + startColumn + ',"offset":' + startOffset + '},' +
            '"end":{"type":"Position","line":' + endLine + ',"column":' + endColumn + ',"offset":' + endOffset + '}}';

        node.startAt(startLine, startColumn, startOffset);
        node.endAt(endLine, endColumn, endOffset);

        expect(node).to.be.an('object');
        expect(node).to.be.an.instanceOf(AstNode);
        expect(node).to.be.an.instanceOf(AstFragment);
        expect(node).to.be.an.instanceOf(AstRange);
        expect(node).to.deep.equal(expected);
        expect(node.first).to.be.instanceOf(AstNumber);
        expect(node.step).to.be.instanceOf(AstNumber);
        expect(node.last).to.be.instanceOf(AstNumber);
        expect(node.start).to.be.instanceOf(AstPosition);
        expect(node.end).to.be.instanceOf(AstPosition);
        expect(node + '').to.be.equal(stringified);
    });

    it('should clone an AstRange', () => {
        const node = (new AstRange(new AstNumber(1), new AstNumber(2), new AstNumber(3))).startAt(1, 1, 0).endAt(1, 6, 5);

        const clone = node.clone();

        expect(clone).to.be.an('object');
        expect(clone).to.be.an.instanceOf(AstNode);
        expect(clone).to.be.an.instanceOf(AstFragment);
        expect(clone).to.be.an.instanceOf(AstRange);
        expect(clone).to.not.be.equal(node);
        expect(clone).to.be.deep.equal(node);
    });

    it('should clone an AstRange with the provided properties', () => {
        const first = new AstNumber(1);
        const step = new AstNumber(1);
        const last = new AstNumber(3);
        const newFirst = new AstNumber(4);
        const newStep = new AstNumber(2);
        const newLast = new AstNumber(8);

        const node = (new AstRange(first, step, last)).startAt(1, 1, 0).endAt(1, 6, 5);

        const clone = node.clone({
            type: 'Number',         // should not be allowed
            first: newFirst,
            step: newStep,
            last: newLast,
        });

        expect(clone).to.be.an('object');
        expect(clone).to.be.an.instanceOf(AstNode);
        expect(clone).to.be.an.instanceOf(AstFragment);
        expect(clone).to.be.an.instanceOf(AstRange);
        expect(clone).to.not.be.equal(node);
        expect(clone).to.be.not.deep.equal(node);
        expect(clone).to.have.a.property('type').that.is.equal(node.type);
        expect(clone).to.have.a.property('first').that.is.equal(newFirst);
        expect(clone).to.have.a.property('step').that.is.equal(newStep);
        expect(clone).to.have.a.property('last').that.is.equal(newLast);
        expect(clone).to.have.a.property('start').that.is.equal(node.start);
        expect(clone).to.have.a.property('end').that.is.equal(node.end);
    });

    it('should throw a TypeError if one of the operands is not a valid AstNode when cloning', () => {
        const node = (new AstRange(new AstIdentifier(1), new AstNumber(2), new AstNumber(3))).startAt(1, 1, 0).endAt(1, 4, 3);
        expect(() => node.clone({first: null})).to.throw(TypeError);
        expect(() => node.clone({first: {}})).to.throw(TypeError);
        expect(() => node.clone({first: new AstNode('Foo')})).to.throw(TypeError);
        expect(() => node.clone({step: {}})).to.throw(TypeError);
        expect(() => node.clone({step: new AstNode('Foo')})).to.throw(TypeError);
        expect(() => node.clone({last: null})).to.throw(TypeError);
        expect(() => node.clone({last: {}})).to.throw(TypeError);
        expect(() => node.clone({last: new AstNode('Foo')})).to.throw(TypeError);
    });

});
