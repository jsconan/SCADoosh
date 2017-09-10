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
 * Unit tests: AST node that represents a unary operator.
 *
 * @package tests/ast/classes
 * @author jsconan
 */

const chai = require('chai');
const expect = chai.expect;

const AstNode = require('../../../src/ast/classes/node');
const AstPosition = require('../../../src/ast/classes/position');
const AstFragment = require('../../../src/ast/classes/fragment');
const AstNumber = require('../../../src/ast/classes/number');
const AstUnaryOperator = require('../../../src/ast/classes/unary-operator');

describe('AstUnaryOperator', () => {

    it('should create an AstUnaryOperator', () => {
        const type = 'unaryOperator';
        const operator = '-';
        const value = new AstNumber(1);
        const node = new AstUnaryOperator(operator, value);

        expect(node).to.be.an('object');
        expect(node).to.be.an.instanceOf(AstNode);
        expect(node).to.be.an.instanceOf(AstFragment);
        expect(node).to.be.an.instanceOf(AstUnaryOperator);
        expect(node.value).to.be.instanceOf(AstFragment);
        expect(node).to.have.a.property('type').that.is.equal(type);
        expect(node).to.have.a.property('operator').that.is.equal(operator);
        expect(node).to.have.a.property('value').that.is.equal(value);
    });

    it('should create an AstUnaryOperator with the provided properties', () => {
        const type = 'unaryOperator';
        const operator = '-';
        const value = new AstNumber(1);
        const node = new AstUnaryOperator('operator', 'value', {
            operator: operator,
            value: value,
            foo: 'bar'
        });

        expect(node).to.be.an('object');
        expect(node).to.be.an.instanceOf(AstNode);
        expect(node).to.be.an.instanceOf(AstFragment);
        expect(node).to.be.an.instanceOf(AstUnaryOperator);
        expect(node.value).to.be.instanceOf(AstFragment);
        expect(node).to.have.a.property('type').that.is.equal(type);
        expect(node).to.have.a.property('operator').that.is.equal(operator);
        expect(node).to.have.a.property('value').that.is.equal(value);
        expect(node).to.have.a.property('foo').that.is.equal('bar');
    });

    it('should throw a TypeError if the operand is not a valid AstFragment', () => {
        expect(() => new AstUnaryOperator('+', {})).to.throw(TypeError);
        expect(() => new AstUnaryOperator('+', new AstNode('foo'))).to.throw(TypeError);
    });

    it('should stringify an AstUnaryOperator', () => {
        const type = 'unaryOperator';
        const operator = '-';
        const value = new AstNumber(1);
        const startLine = 1;
        const startColumn = 1;
        const startOffset = 0;
        const endLine = 1;
        const endColumn = 3;
        const endOffset = 2;
        const expected = {
            type: type,
            operator: operator,
            value: {type: 'number', value: 1},
            start: {type: 'position', line: startLine, column: startColumn, offset: startOffset},
            end: {type: 'position', line: endLine, column: endColumn, offset: endOffset}
        };
        const node = new AstUnaryOperator(operator, value);
        const stringified = '{"type":"' + type + '","operator":"' + operator + '",' +
            '"value":{"type":"number","value":1},' +
            '"start":{"type":"position","line":' + startLine + ',"column":' + startColumn + ',"offset":' + startOffset + '},' +
            '"end":{"type":"position","line":' + endLine + ',"column":' + endColumn + ',"offset":' + endOffset + '}}';

        node.startAt(startLine, startColumn, startOffset);
        node.endAt(endLine, endColumn, endOffset);

        expect(node).to.be.an('object');
        expect(node).to.be.an.instanceOf(AstNode);
        expect(node).to.be.an.instanceOf(AstFragment);
        expect(node).to.be.an.instanceOf(AstUnaryOperator);
        expect(node).to.deep.equal(expected);
        expect(node.value).to.be.instanceOf(AstFragment);
        expect(node.start).to.be.instanceOf(AstPosition);
        expect(node.end).to.be.instanceOf(AstPosition);
        expect(node + '').to.be.equal(stringified);
    });

    it('should clone an AstUnaryOperator', () => {
        const node = (new AstUnaryOperator('+', new AstNumber(2))).startAt(1, 1, 0).endAt(1, 4, 3);

        const clone = node.clone();

        expect(clone).to.be.an('object');
        expect(clone).to.be.an.instanceOf(AstNode);
        expect(clone).to.be.an.instanceOf(AstFragment);
        expect(clone).to.be.an.instanceOf(AstUnaryOperator);
        expect(clone).to.not.be.equal(node);
        expect(clone).to.be.deep.equal(node);
    });

    it('should clone an AstUnaryOperator with the provided properties', () => {
        const operator = '+';
        const value = new AstNumber(2);
        const newOperator = '-';
        const newValue = new AstNumber(1);

        const node = (new AstUnaryOperator(operator, value)).startAt(1, 1, 0).endAt(1, 4, 3);

        const clone = node.clone({
            type: 'number',         // should not be allowed
            operator: newOperator,
            value: newValue
        });

        expect(clone).to.be.an('object');
        expect(clone).to.be.an.instanceOf(AstNode);
        expect(clone).to.be.an.instanceOf(AstFragment);
        expect(clone).to.be.an.instanceOf(AstUnaryOperator);
        expect(clone).to.not.be.equal(node);
        expect(clone).to.be.not.deep.equal(node);
        expect(clone).to.have.a.property('type').that.is.equal(node.type);
        expect(clone).to.have.a.property('operator').that.is.equal(newOperator);
        expect(clone).to.have.a.property('value').that.is.equal(newValue);
        expect(clone).to.have.a.property('start').that.is.equal(node.start);
        expect(clone).to.have.a.property('end').that.is.equal(node.end);
    });

    it('should throw a TypeError if one of the operands is not a valid AstFragment when cloning', () => {
        const node = (new AstUnaryOperator('+', new AstNumber(2))).startAt(1, 1, 0).endAt(1, 4, 3);
        expect(() => node.clone({value: {}})).to.throw(TypeError);
        expect(() => node.clone({value: new AstNode('foo')})).to.throw(TypeError);
    });

});
