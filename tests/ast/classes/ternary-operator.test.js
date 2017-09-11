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
 * Unit tests: AST node that represents a ternary operator.
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
const AstTernaryOperator = require('../../../src/ast/classes/ternary-operator');

describe('AstTernaryOperator', () => {

    it('should create an AstTernaryOperator', () => {
        const type = 'TernaryOperator';
        const condition = new AstNumber(1);
        const consequent = new AstNumber(2);
        const alternative = new AstNumber(3);
        const node = new AstTernaryOperator(condition, consequent, alternative);

        expect(node).to.be.an('object');
        expect(node).to.be.an.instanceOf(AstNode);
        expect(node).to.be.an.instanceOf(AstFragment);
        expect(node).to.be.an.instanceOf(AstTernaryOperator);
        expect(node.condition).to.be.instanceOf(AstFragment);
        expect(node.consequent).to.be.instanceOf(AstFragment);
        expect(node.alternative).to.be.instanceOf(AstFragment);
        expect(node).to.have.a.property('type').that.is.equal(type);
        expect(node).to.have.a.property('condition').that.is.equal(condition);
        expect(node).to.have.a.property('consequent').that.is.equal(consequent);
        expect(node).to.have.a.property('alternative').that.is.equal(alternative);
    });

    it('should create an AstTernaryOperator with the provided properties', () => {
        const type = 'TernaryOperator';
        const condition = new AstNumber(1);
        const consequent = new AstNumber(2);
        const alternative = new AstNumber(3);
        const node = new AstTernaryOperator('condition', 'consequent', 'alternative', {
            condition: condition,
            consequent: consequent,
            alternative: alternative,
            foo: 'bar'
        });

        expect(node).to.be.an('object');
        expect(node).to.be.an.instanceOf(AstNode);
        expect(node).to.be.an.instanceOf(AstFragment);
        expect(node).to.be.an.instanceOf(AstTernaryOperator);
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
        expect(() => new AstTernaryOperator(new AstNumber(1), new AstNumber(2), {})).to.throw(TypeError);
        expect(() => new AstTernaryOperator(new AstNumber(1), new AstNumber(2), new AstNode('Foo'))).to.throw(TypeError);

        expect(() => new AstTernaryOperator(new AstNumber(1), {}, new AstNumber(2))).to.throw(TypeError);
        expect(() => new AstTernaryOperator(new AstNumber(1), new AstNode('Foo'), new AstNumber(2))).to.throw(TypeError);

        expect(() => new AstTernaryOperator({}, new AstNumber(1), new AstNumber(2))).to.throw(TypeError);
        expect(() => new AstTernaryOperator(new AstNode('Foo'), new AstNumber(1), new AstNumber(2))).to.throw(TypeError);
    });

    it('should stringify an AstTernaryOperator', () => {
        const type = 'TernaryOperator';
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
            condition: {type: 'Number', value: 1},
            consequent: {type: 'Number', value: 2},
            alternative: {type: 'Number', value: 3},
            start: {type: 'Position', line: startLine, column: startColumn, offset: startOffset},
            end: {type: 'Position', line: endLine, column: endColumn, offset: endOffset}
        };
        const node = new AstTernaryOperator(condition, consequent, alternative);
        const stringified = '{"type":"' + type + '",' +
            '"condition":{"type":"Number","value":1},' +
            '"consequent":{"type":"Number","value":2},' +
            '"alternative":{"type":"Number","value":3},' +
            '"start":{"type":"Position","line":' + startLine + ',"column":' + startColumn + ',"offset":' + startOffset + '},' +
            '"end":{"type":"Position","line":' + endLine + ',"column":' + endColumn + ',"offset":' + endOffset + '}}';

        node.startAt(startLine, startColumn, startOffset);
        node.endAt(endLine, endColumn, endOffset);

        expect(node).to.be.an('object');
        expect(node).to.be.an.instanceOf(AstNode);
        expect(node).to.be.an.instanceOf(AstFragment);
        expect(node).to.be.an.instanceOf(AstTernaryOperator);
        expect(node).to.deep.equal(expected);
        expect(node.condition).to.be.instanceOf(AstFragment);
        expect(node.consequent).to.be.instanceOf(AstFragment);
        expect(node.alternative).to.be.instanceOf(AstFragment);
        expect(node.start).to.be.instanceOf(AstPosition);
        expect(node.end).to.be.instanceOf(AstPosition);
        expect(node + '').to.be.equal(stringified);
    });

    it('should clone an AstTernaryOperator', () => {
        const node = (new AstTernaryOperator(new AstNumber(1), new AstNumber(2), new AstNumber(3))).startAt(1, 1, 0).endAt(1, 4, 3);

        const clone = node.clone();

        expect(clone).to.be.an('object');
        expect(clone).to.be.an.instanceOf(AstNode);
        expect(clone).to.be.an.instanceOf(AstFragment);
        expect(clone).to.be.an.instanceOf(AstTernaryOperator);
        expect(clone).to.not.be.equal(node);
        expect(clone).to.be.deep.equal(node);
    });

    it('should clone an AstTernaryOperator with the provided properties', () => {
        const condition = new AstNumber(1);
        const consequent = new AstNumber(2);
        const alternative = new AstNumber(3);
        const newCondition = new AstNumber(41);
        const newConsequent = new AstNumber(5);
        const newAlternative = new AstNumber(6);

        const node = (new AstTernaryOperator(condition, consequent, alternative)).startAt(1, 1, 0).endAt(1, 4, 3);

        const clone = node.clone({
            type: 'Number',         // should not be allowed
            condition: newCondition,
            consequent: newConsequent,
            alternative: newAlternative,
        });

        expect(clone).to.be.an('object');
        expect(clone).to.be.an.instanceOf(AstNode);
        expect(clone).to.be.an.instanceOf(AstFragment);
        expect(clone).to.be.an.instanceOf(AstTernaryOperator);
        expect(clone).to.not.be.equal(node);
        expect(clone).to.be.not.deep.equal(node);
        expect(clone).to.have.a.property('type').that.is.equal(node.type);
        expect(clone).to.have.a.property('condition').that.is.equal(newCondition);
        expect(clone).to.have.a.property('consequent').that.is.equal(newConsequent);
        expect(clone).to.have.a.property('alternative').that.is.equal(newAlternative);
        expect(clone).to.have.a.property('start').that.is.equal(node.start);
        expect(clone).to.have.a.property('end').that.is.equal(node.end);
    });

    it('should throw a TypeError if one of the operands is not a valid AstFragment when cloning', () => {
        const node = (new AstTernaryOperator(new AstNumber(1), new AstNumber(2), new AstNumber(3))).startAt(1, 1, 0).endAt(1, 4, 3);
        expect(() => node.clone({condition: {}})).to.throw(TypeError);
        expect(() => node.clone({condition: new AstNode('Foo')})).to.throw(TypeError);
        expect(() => node.clone({consequent: {}})).to.throw(TypeError);
        expect(() => node.clone({consequent: new AstNode('Foo')})).to.throw(TypeError);
        expect(() => node.clone({alternative: {}})).to.throw(TypeError);
        expect(() => node.clone({alternative: new AstNode('Foo')})).to.throw(TypeError);
    });

});
