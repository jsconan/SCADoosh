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
 * Unit tests: AST node that represents a for statement.
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
const AstFunctionCall = require('../../../src/ast/classes/function-call');
const AstAssignment = require('../../../src/ast/classes/assignment');
const AstNoop = require('../../../src/ast/classes/noop');
const AstForStatement = require('../../../src/ast/classes/for-statement');

describe('AstForStatement', () => {

    it('should create an AstForStatement', () => {
        const type = 'ForStatement';
        const init = new AstAssignment(new AstIdentifier('i'), new AstNumber(0));;
        const condition = new AstBinaryOperator(new AstIdentifier('i'), '<', new AstNumber(10));
        const increment = new AstAssignment(new AstIdentifier('i'), new AstBinaryOperator(new AstIdentifier('i'), '+', new AstNumber(1)));
        const body = new AstFunctionCall(new AstIdentifier('echo'), [new AstIdentifier('i')]);
        const node = new AstForStatement(init, condition, increment, body);

        expect(node).to.be.an('object');
        expect(node).to.be.an.instanceOf(AstNode);
        expect(node).to.be.an.instanceOf(AstFragment);
        expect(node).to.be.an.instanceOf(AstForStatement);
        expect(node).to.have.a.property('type').that.is.equal(type);
        expect(node).to.have.a.property('init').that.is.an.instanceOf(AstFragment).and.is.equal(init);
        expect(node).to.have.a.property('condition').that.is.an.instanceOf(AstFragment).and.is.equal(condition);
        expect(node).to.have.a.property('increment').that.an.instanceOf(AstFragment).and.is.equal(increment);
        expect(node).to.have.a.property('body').that.an.instanceOf(AstFragment).and.is.equal(body);
    });

    it('should create an AstForStatement with the provided properties', () => {
        const type = 'ForStatement';
        const init = new AstAssignment(new AstIdentifier('i'), new AstNumber(0));;
        const condition = new AstBinaryOperator(new AstIdentifier('i'), '<', new AstNumber(10));
        const increment = new AstAssignment(new AstIdentifier('i'), new AstBinaryOperator(new AstIdentifier('i'), '+', new AstNumber(1)));
        const body = new AstFunctionCall(new AstIdentifier('echo'), [new AstIdentifier('i')]);
        const node = new AstForStatement('init', 'condition', 'increment', 'body', {
            init: init,
            condition: condition,
            increment: increment,
            body: body,
            foo: 'bar'
        });

        expect(node).to.be.an('object');
        expect(node).to.be.an.instanceOf(AstNode);
        expect(node).to.be.an.instanceOf(AstFragment);
        expect(node).to.be.an.instanceOf(AstForStatement);
        expect(node).to.have.a.property('type').that.is.equal(type);
        expect(node).to.have.a.property('init').that.is.an.instanceOf(AstFragment).and.is.equal(init);
        expect(node).to.have.a.property('condition').that.is.an.instanceOf(AstFragment).and.is.equal(condition);
        expect(node).to.have.a.property('increment').that.an.instanceOf(AstFragment).and.is.equal(increment);
        expect(node).to.have.a.property('body').that.an.instanceOf(AstFragment).and.is.equal(body);
        expect(node).to.have.a.property('foo').that.is.equal('bar');
    });

    it('should throw a TypeError if one of the operands is not a valid AstFragment', () => {
        expect(() => new AstForStatement(new AstNoop(), new AstNoop(), new AstNoop(), {})).to.throw(TypeError);
        expect(() => new AstForStatement(new AstNoop(), new AstNoop(), new AstNoop(), [])).to.throw(TypeError);
        expect(() => new AstForStatement(new AstNoop(), new AstNoop(), new AstNoop(), new AstNode('Foo'))).to.throw(TypeError);

        expect(() => new AstForStatement(new AstNoop(), new AstNoop(), {}, new AstNoop())).to.throw(TypeError);
        expect(() => new AstForStatement(new AstNoop(), new AstNoop(), [], new AstNoop())).to.throw(TypeError);
        expect(() => new AstForStatement(new AstNoop(), new AstNoop(), new AstNode('Foo'), new AstNoop())).to.throw(TypeError);

        expect(() => new AstForStatement(new AstNoop(), {}, new AstNoop(), new AstNoop())).to.throw(TypeError);
        expect(() => new AstForStatement(new AstNoop(), [], new AstNoop(), new AstNoop())).to.throw(TypeError);
        expect(() => new AstForStatement(new AstNoop(), new AstNode('Foo'), new AstNoop(), new AstNoop())).to.throw(TypeError);

        expect(() => new AstForStatement({}, new AstNoop(), new AstNoop(), new AstNoop())).to.throw(TypeError);
        expect(() => new AstForStatement([], new AstNoop(), new AstNoop(), new AstNoop())).to.throw(TypeError);
        expect(() => new AstForStatement(new AstNode('Foo'), new AstNoop(), new AstNoop(), new AstNoop())).to.throw(TypeError);
    });

    it('should stringify an AstForStatement', () => {
        const type = 'ForStatement';
        const init = new AstAssignment(new AstIdentifier('i'), new AstNumber(0));;
        const condition = new AstBinaryOperator(new AstIdentifier('i'), '<', new AstNumber(10));
        const increment = new AstAssignment(new AstIdentifier('i'), new AstBinaryOperator(new AstIdentifier('i'), '+', new AstNumber(1)));
        const body = new AstFunctionCall(new AstIdentifier('echo'), [new AstIdentifier('i')]);
        const startLine = 1;
        const startColumn = 1;
        const startOffset = 0;
        const endLine = 1;
        const endColumn = 28;
        const endOffset = 27;
        const expected = {
            type: type,
            init: {
                type: 'Assignment',
                identifier: {type: 'Identifier', value: 'i'},
                value: {type: 'Number', value: 0}
            },
            condition: {
                type: 'BinaryOperator',
                operator: '<',
                left: {type: 'Identifier', value: 'i'},
                right: {type: 'Number', value: 10}
            },
            increment: {
                type: 'Assignment',
                identifier: {type: 'Identifier', value: 'i'},
                value: {
                    type: 'BinaryOperator',
                    operator: '+',
                    left: {type: 'Identifier', value: 'i'},
                    right: {type: 'Number', value: 1}
                }
            },
            body: {
                type: 'FunctionCall',
                identifier: {type: 'Identifier', value: 'echo'},
                parameters: [{type: 'Identifier', value: 'i'}],
            },
            start: {type: 'Position', line: startLine, column: startColumn, offset: startOffset},
            end: {type: 'Position', line: endLine, column: endColumn, offset: endOffset}
        };
        const node = new AstForStatement(init, condition, increment, body);
        const stringified = '{"type":"' + type + '",' +
            '"init":{"type":"Assignment","identifier":{"type":"Identifier","value":"i"},"value":{"type":"Number","value":0}},' +
            '"condition":{"type":"BinaryOperator","operator":"<","left":{"type":"Identifier","value":"i"},"right":{"type":"Number","value":10}},' +
            '"increment":{"type":"Assignment","identifier":{"type":"Identifier","value":"i"},"value":{"type":"BinaryOperator","operator":"+","left":{"type":"Identifier","value":"i"},"right":{"type":"Number","value":1}}},' +
            '"body":{"type":"FunctionCall","identifier":{"type":"Identifier","value":"echo"},"parameters":[{"type":"Identifier","value":"i"}]},' +
            '"start":{"type":"Position","line":' + startLine + ',"column":' + startColumn + ',"offset":' + startOffset + '},' +
            '"end":{"type":"Position","line":' + endLine + ',"column":' + endColumn + ',"offset":' + endOffset + '}}';

        node.startAt(startLine, startColumn, startOffset);
        node.endAt(endLine, endColumn, endOffset);

        expect(node).to.be.an('object');
        expect(node).to.be.an.instanceOf(AstNode);
        expect(node).to.be.an.instanceOf(AstFragment);
        expect(node).to.be.an.instanceOf(AstForStatement);
        expect(node).to.have.a.property('start').that.is.an.instanceOf(AstPosition);
        expect(node).to.have.a.property('end').that.is.an.instanceOf(AstPosition);
        expect(node).to.have.a.property('type').that.is.equal(type);
        expect(node).to.have.a.property('init').that.is.an.instanceOf(AstFragment).and.is.equal(init);
        expect(node).to.have.a.property('condition').that.is.an.instanceOf(AstFragment).and.is.equal(condition);
        expect(node).to.have.a.property('increment').that.an.instanceOf(AstFragment).and.is.equal(increment);
        expect(node).to.have.a.property('body').that.an.instanceOf(AstFragment).and.is.equal(body);
        expect(node).to.deep.equal(expected);
        expect(node + '').to.be.equal(stringified);
    });

    it('should clone an AstForStatement', () => {
        const node = (new AstForStatement(new AstNumber(1), new AstNumber(2), new AstNumber(3), new AstNumber(4))).startAt(1, 1, 0).endAt(1, 4, 3);

        const clone = node.clone();

        expect(clone).to.be.an('object');
        expect(clone).to.be.an.instanceOf(AstNode);
        expect(clone).to.be.an.instanceOf(AstFragment);
        expect(clone).to.be.an.instanceOf(AstForStatement);
        expect(clone).to.not.be.equal(node);
        expect(clone).to.be.deep.equal(node);
    });

    it('should clone an AstForStatement with the provided properties', () => {
        const type = 'ForStatement';
        const init = new AstAssignment(new AstIdentifier('i'), new AstNumber(0));
        const condition = new AstBinaryOperator(new AstIdentifier('i'), '<', new AstNumber(10));
        const increment = new AstAssignment(new AstIdentifier('i'), new AstBinaryOperator(new AstIdentifier('i'), '+', new AstNumber(1)));
        const body = new AstFunctionCall(new AstIdentifier('echo'), [new AstIdentifier('i')]);

        const newInit = new AstAssignment(new AstIdentifier('j'), new AstNumber(0));
        const newCondition = new AstBinaryOperator(new AstIdentifier('j'), '<', new AstNumber(10));
        const newIncrement = new AstAssignment(new AstIdentifier('j'), new AstBinaryOperator(new AstIdentifier('j'), '+', new AstNumber(1)));
        const newBody = new AstFunctionCall(new AstIdentifier('echo'), [new AstIdentifier('j')]);

        const node = new AstForStatement(init, condition, increment, body).startAt(1, 1, 0).endAt(1, 4, 3);

        const clone = node.clone({
            type: 'Number',         // should not be allowed
            init: newInit,
            condition: newCondition,
            increment: newIncrement,
            body: newBody,
            foo: 'bar'
        });

        expect(clone).to.be.an('object');
        expect(clone).to.be.an.instanceOf(AstNode);
        expect(clone).to.be.an.instanceOf(AstFragment);
        expect(clone).to.be.an.instanceOf(AstForStatement);
        expect(clone).to.have.a.property('type').that.is.equal(type);
        expect(clone).to.have.a.property('init').that.is.an.instanceOf(AstFragment).and.is.equal(newInit);
        expect(clone).to.have.a.property('condition').that.is.an.instanceOf(AstFragment).and.is.equal(newCondition);
        expect(clone).to.have.a.property('increment').that.an.instanceOf(AstFragment).and.is.equal(newIncrement);
        expect(clone).to.have.a.property('body').that.an.instanceOf(AstFragment).and.is.equal(newBody);
        expect(clone).to.have.a.property('foo').that.is.equal('bar');
        expect(clone).to.have.a.property('start').that.is.equal(node.start);
        expect(clone).to.have.a.property('end').that.is.equal(node.end);
    });

    it('should throw a TypeError if one of the operands is not a valid AstFragment when cloning', () => {
        const node = (new AstForStatement(new AstNumber(1), new AstNumber(2), new AstNumber(3), new AstNumber(4))).startAt(1, 1, 0).endAt(1, 4, 3);
        expect(() => node.clone({init: {}})).to.throw(TypeError);
        expect(() => node.clone({init: new AstNode('Foo')})).to.throw(TypeError);
        expect(() => node.clone({condition: {}})).to.throw(TypeError);
        expect(() => node.clone({condition: new AstNode('Foo')})).to.throw(TypeError);
        expect(() => node.clone({increment: {}})).to.throw(TypeError);
        expect(() => node.clone({increment: new AstNode('Foo')})).to.throw(TypeError);
        expect(() => node.clone({body: {}})).to.throw(TypeError);
        expect(() => node.clone({body: new AstNode('Foo')})).to.throw(TypeError);
    });

});
