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
 * Unit tests: AST node that represents a if statement.
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
const AstBinaryOperator = require('../../../src/ast/classes/binary-operator');
const AstAssignment = require('../../../src/ast/classes/assignment');
const AstNoop = require('../../../src/ast/classes/noop');
const AstIfStatement = require('../../../src/ast/classes/if-statement');

describe('AstIfStatement', () => {

    it('should create an AstIfStatement', () => {
        const type = 'if-statement';
        const condition = new AstBinaryOperator(new AstNumber(1), '==', new AstNumber(2));
        const consequent = new AstAssignment(new AstIdentifier('foo'), new AstNumber(42));;
        const alternative = new AstAssignment(new AstIdentifier('bar'), new AstNumber(42));;
        const node = new AstIfStatement(condition, consequent, alternative);

        expect(node).to.be.an('object');
        expect(node).to.be.an.instanceOf(AstNode);
        expect(node).to.be.an.instanceOf(AstFragment);
        expect(node).to.be.an.instanceOf(AstIfStatement);
        expect(node.condition).to.be.instanceOf(AstFragment);
        expect(node.consequent).to.be.instanceOf(AstFragment);
        expect(node.alternative).to.be.instanceOf(AstFragment);
        expect(node).to.have.a.property('type').that.is.equal(type);
        expect(node).to.have.a.property('condition').that.is.equal(condition);
        expect(node).to.have.a.property('consequent').that.is.equal(consequent);
        expect(node).to.have.a.property('alternative').that.is.equal(alternative);
    });

    it('should create an AstIfStatement with no alternative', () => {
        const type = 'if-statement';
        const condition = new AstBinaryOperator(new AstNumber(1), '==', new AstNumber(2));
        const consequent = new AstAssignment(new AstIdentifier('foo'), new AstNumber(42));;
        const node = new AstIfStatement(condition, consequent);

        expect(node).to.be.an('object');
        expect(node).to.be.an.instanceOf(AstNode);
        expect(node).to.be.an.instanceOf(AstFragment);
        expect(node).to.be.an.instanceOf(AstIfStatement);
        expect(node.condition).to.be.instanceOf(AstFragment);
        expect(node.consequent).to.be.instanceOf(AstFragment);
        expect(node).to.have.a.property('type').that.is.equal(type);
        expect(node).to.have.a.property('condition').that.is.equal(condition);
        expect(node).to.have.a.property('consequent').that.is.equal(consequent);
        expect(node).to.not.have.a.property('alternative');
    });

    it('should create an AstIfStatement with the provided properties', () => {
        const type = 'if-statement';
        const condition = new AstBinaryOperator(new AstNumber(1), '==', new AstNumber(2));
        const consequent = new AstAssignment(new AstIdentifier('foo'), new AstNumber(42));;
        const alternative = new AstAssignment(new AstIdentifier('bar'), new AstNumber(42));;
        const node = new AstIfStatement('condition', 'consequent', 'alternative', {
            condition: condition,
            consequent: consequent,
            alternative: alternative,
            foo: 'bar'
        });

        expect(node).to.be.an('object');
        expect(node).to.be.an.instanceOf(AstNode);
        expect(node).to.be.an.instanceOf(AstFragment);
        expect(node).to.be.an.instanceOf(AstIfStatement);
        expect(node.condition).to.be.instanceOf(AstFragment);
        expect(node.consequent).to.be.instanceOf(AstFragment);
        expect(node.alternative).to.be.instanceOf(AstFragment);
        expect(node).to.have.a.property('type').that.is.equal(type);
        expect(node).to.have.a.property('condition').that.is.equal(condition);
        expect(node).to.have.a.property('consequent').that.is.equal(consequent);
        expect(node).to.have.a.property('alternative').that.is.equal(alternative);
        expect(node).to.have.a.property('foo').that.is.equal('bar');
    });

    it('should throw a TypeError if one of the operands is not a valid AstFragment', () => {
        expect(() => new AstIfStatement(new AstNumber(1), new AstNoop(), {})).to.throw(TypeError);
        expect(() => new AstIfStatement(new AstNumber(1), new AstNoop(), new AstNode('foo'))).to.throw(TypeError);

        expect(() => new AstIfStatement(new AstNumber(1), {}, new AstNoop())).to.throw(TypeError);
        expect(() => new AstIfStatement(new AstNumber(1), new AstNode('foo'), new AstNoop())).to.throw(TypeError);

        expect(() => new AstIfStatement({}, new AstNoop(), new AstNoop())).to.throw(TypeError);
        expect(() => new AstIfStatement(new AstNode('foo'), new AstNoop(), new AstNoop())).to.throw(TypeError);
    });

    it('should stringify an AstIfStatement', () => {
        const type = 'if-statement';
        const condition = new AstNumber(1);
        const consequent = new AstNumber(2);
        const alternative = new AstNumber(3);
        const startLine = 1;
        const startColumn = 1;
        const startOffset = 0;
        const endLine = 1;
        const endColumn = 3;
        const endOffset = 2;
        const expected = {
            type: type,
            condition: {type: 'number', value: 1},
            consequent: {type: 'number', value: 2},
            alternative: {type: 'number', value: 3},
            start: {type: 'position', line: startLine, column: startColumn, offset: startOffset},
            end: {type: 'position', line: endLine, column: endColumn, offset: endOffset}
        };
        const node = new AstIfStatement(condition, consequent, alternative);
        const stringified = '{"type":"' + type + '",' +
            '"condition":{"type":"number","value":1},' +
            '"consequent":{"type":"number","value":2},' +
            '"alternative":{"type":"number","value":3},' +
            '"start":{"type":"position","line":' + startLine + ',"column":' + startColumn + ',"offset":' + startOffset + '},' +
            '"end":{"type":"position","line":' + endLine + ',"column":' + endColumn + ',"offset":' + endOffset + '}}';

        node.startAt(startLine, startColumn, startOffset);
        node.endAt(endLine, endColumn, endOffset);

        expect(node).to.be.an('object');
        expect(node).to.be.an.instanceOf(AstNode);
        expect(node).to.be.an.instanceOf(AstFragment);
        expect(node).to.be.an.instanceOf(AstIfStatement);
        expect(node).to.deep.equal(expected);
        expect(node.condition).to.be.instanceOf(AstFragment);
        expect(node.consequent).to.be.instanceOf(AstFragment);
        expect(node.alternative).to.be.instanceOf(AstFragment);
        expect(node.start).to.be.instanceOf(AstPosition);
        expect(node.end).to.be.instanceOf(AstPosition);
        expect(node + '').to.be.equal(stringified);
    });

    it('should clone an AstIfStatement', () => {
        const node = (new AstIfStatement(new AstNumber(1), new AstNumber(2), new AstNumber(3))).startAt(1, 1, 0).endAt(1, 4, 3);

        const clone = node.clone();

        expect(clone).to.be.an('object');
        expect(clone).to.be.an.instanceOf(AstNode);
        expect(clone).to.be.an.instanceOf(AstFragment);
        expect(clone).to.be.an.instanceOf(AstIfStatement);
        expect(clone).to.not.be.equal(node);
        expect(clone).to.be.deep.equal(node);
    });

    it('should clone an AstIfStatement with the provided properties', () => {
        const condition = new AstNumber(1);
        const consequent = new AstNumber(2);
        const alternative = new AstNumber(3);
        const newCondition = new AstNumber(41);
        const newConsequent = new AstNumber(5);
        const newAlternative = new AstNumber(6);

        const node = (new AstIfStatement(condition, consequent, alternative)).startAt(1, 1, 0).endAt(1, 4, 3);

        const clone = node.clone({
            type: 'number',         // should not be allowed
            condition: newCondition,
            consequent: newConsequent,
            alternative: newAlternative,
            foo: 'bar'
        });

        expect(clone).to.be.an('object');
        expect(clone).to.be.an.instanceOf(AstNode);
        expect(clone).to.be.an.instanceOf(AstFragment);
        expect(clone).to.be.an.instanceOf(AstIfStatement);
        expect(clone).to.not.be.equal(node);
        expect(clone).to.be.not.deep.equal(node);
        expect(clone).to.have.a.property('type').that.is.equal(node.type);
        expect(clone).to.have.a.property('condition').that.is.equal(newCondition);
        expect(clone).to.have.a.property('consequent').that.is.equal(newConsequent);
        expect(clone).to.have.a.property('alternative').that.is.equal(newAlternative);
        expect(clone).to.have.a.property('foo').that.is.equal('bar');
        expect(clone).to.have.a.property('start').that.is.equal(node.start);
        expect(clone).to.have.a.property('end').that.is.equal(node.end);
    });

    it('should throw a TypeError if one of the operands is not a valid AstFragment when cloning', () => {
        const node = (new AstIfStatement(new AstNumber(1), new AstNumber(2), new AstNumber(3))).startAt(1, 1, 0).endAt(1, 4, 3);
        expect(() => node.clone({condition: {}})).to.throw(TypeError);
        expect(() => node.clone({condition: new AstNode('foo')})).to.throw(TypeError);
        expect(() => node.clone({consequent: {}})).to.throw(TypeError);
        expect(() => node.clone({consequent: new AstNode('foo')})).to.throw(TypeError);
        expect(() => node.clone({alternative: {}})).to.throw(TypeError);
        expect(() => node.clone({alternative: new AstNode('foo')})).to.throw(TypeError);
    });

});
