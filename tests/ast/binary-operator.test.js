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
 * Unit tests: AST node that represents a binary operator.
 *
 * @package tests/ast
 * @author jsconan
 */

const chai = require('chai');
const expect = chai.expect;

const AstNode = require('./../../src/ast/node');
const AstPosition = require('./../../src/ast/position');
const AstFragment = require('./../../src/ast/fragment');
const AstNumber = require('./../../src/ast/number');
const AstBinaryOperator = require('./../../src/ast/binary-operator');

describe('AST node: AstBinaryOperator', () => {

    it('should create an AstBinaryOperator', () => {
        const type = 'binaryOperator';
        const operator = '+';
        const left = new AstNumber(1);
        const right = new AstNumber(2);
        const node = new AstBinaryOperator(left, operator, right);

        expect(node).to.be.an('object');
        expect(node).to.be.an.instanceOf(AstNode);
        expect(node).to.be.an.instanceOf(AstFragment);
        expect(node).to.be.an.instanceOf(AstBinaryOperator);
        expect(node.left).to.be.instanceOf(AstNode);
        expect(node.right).to.be.instanceOf(AstNode);
        expect(node).to.have.a.property('type').that.is.equal(type);
        expect(node).to.have.a.property('operator').that.is.equal(operator);
        expect(node).to.have.a.property('left').that.is.equal(left);
        expect(node).to.have.a.property('right').that.is.equal(right);
    });

    it('should throw a TypeError if one of the operands is not a valid AstNode', () => {
        const operand = new AstNumber(1);
        expect(() => new AstBinaryOperator(operand, '+', {})).to.throw(TypeError);
        expect(() => new AstBinaryOperator({}, '+', operand)).to.throw(TypeError);
    });

    it('should stringify an AstBinaryOperator', () => {
        const type = 'binaryOperator';
        const operator = '+';
        const left = new AstNumber(1);
        const right = new AstNumber(2);
        const startLine = 1;
        const startColumn = 1;
        const startOffset = 0;
        const endLine = 1;
        const endColumn = 3;
        const endOffset = 2;
        const expected = {
            type: type,
            operator: operator,
            left: {type: 'number', value: 1},
            right: {type: 'number', value: 2},
            start: {type: 'position', line: startLine, column: startColumn, offset: startOffset},
            end: {type: 'position', line: endLine, column: endColumn, offset: endOffset}
        };
        const node = new AstBinaryOperator(left, operator, right);
        const stringified = '{"type":"' + type + '","operator":"' + operator + '",' +
            '"left":{"type":"number","value":1},' +
            '"right":{"type":"number","value":2},' +
            '"start":{"type":"position","line":' + startLine + ',"column":' + startColumn + ',"offset":' + startOffset + '},' +
            '"end":{"type":"position","line":' + endLine + ',"column":' + endColumn + ',"offset":' + endOffset + '}}';

        node.startAt(startLine, startColumn, startOffset);
        node.endAt(endLine, endColumn, endOffset);

        expect(node).to.be.an('object');
        expect(node).to.be.an.instanceOf(AstNode);
        expect(node).to.be.an.instanceOf(AstFragment);
        expect(node).to.be.an.instanceOf(AstBinaryOperator);
        expect(node).to.deep.equal(expected);
        expect(node.left).to.be.instanceOf(AstNode);
        expect(node.right).to.be.instanceOf(AstNode);
        expect(node.start).to.be.instanceOf(AstPosition);
        expect(node.end).to.be.instanceOf(AstPosition);
        expect(node + '').to.be.equal(stringified);
    });

    it('should clone an AstBinaryOperator', () => {
        const node = (new AstBinaryOperator(new AstNumber(1), '+', new AstNumber(2))).startAt(1, 1, 0).endAt(1, 4, 3);

        const clone = node.clone();

        expect(clone).to.be.an('object');
        expect(clone).to.be.an.instanceOf(AstNode);
        expect(clone).to.be.an.instanceOf(AstFragment);
        expect(clone).to.be.an.instanceOf(AstBinaryOperator);
        expect(clone).to.not.be.equal(node);
        expect(clone).to.be.deep.equal(node);
    });

    it('should clone an AstBinaryOperator with the provided properties', () => {
        const operator = '+';
        const left = new AstNumber(1);
        const right = new AstNumber(2);
        const newOperator = '-';
        const newLeft = new AstNumber(2);
        const newRight = new AstNumber(1);

        const node = (new AstBinaryOperator(left, operator, right)).startAt(1, 1, 0).endAt(1, 4, 3);

        const clone = node.clone({
            type: 'number',         // should not be allowed
            operator: newOperator,
            left: newLeft,
            right: newRight,
        });

        expect(clone).to.be.an('object');
        expect(clone).to.be.an.instanceOf(AstNode);
        expect(clone).to.be.an.instanceOf(AstFragment);
        expect(clone).to.be.an.instanceOf(AstBinaryOperator);
        expect(clone).to.not.be.equal(node);
        expect(clone).to.be.not.deep.equal(node);
        expect(clone).to.have.a.property('type').that.is.equal(node.type);
        expect(clone).to.have.a.property('operator').that.is.equal(newOperator);
        expect(clone).to.have.a.property('left').that.is.equal(newLeft);
        expect(clone).to.have.a.property('right').that.is.equal(newRight);
        expect(clone).to.have.a.property('start').that.is.equal(node.start);
        expect(clone).to.have.a.property('end').that.is.equal(node.end);
    });

    it('should throw a TypeError if one of the operands is not a valid AstNode when cloning', () => {
        const node = (new AstBinaryOperator(new AstNumber(1), '+', new AstNumber(2))).startAt(1, 1, 0).endAt(1, 4, 3);
        expect(() => node.clone({left: {}})).to.throw(TypeError);
        expect(() => node.clone({right: {}})).to.throw(TypeError);
    });

});
