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
 * Unit tests: AST node that represents a function definition.
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
const AstAssignment = require('../../../src/ast/classes/assignment');
const AstFunction = require('../../../src/ast/classes/function');

describe('AstFunction', () => {

    it('should create an AstFunction with a list of parameters and a list of statements', () => {
        const type = 'function';
        const identifier = new AstIdentifier('foo');
        const parameters = [new AstNumber(1), new AstNumber(2)];
        const statements = [new AstAssignment(new AstIdentifier('foo'), new AstNumber(42))];
        const node = new AstFunction(identifier, parameters, statements);

        expect(node).to.be.an('object');
        expect(node).to.be.an.instanceOf(AstNode);
        expect(node).to.be.an.instanceOf(AstFragment);
        expect(node).to.be.an.instanceOf(AstFunction);
        expect(node.identifier).to.be.instanceOf(AstIdentifier);
        expect(node.parameters).to.be.an('array');
        expect(node).to.have.a.property('type').that.is.equal(type);
        expect(node).to.have.a.property('identifier').that.is.equal(identifier);
        expect(node).to.have.a.property('parameters').that.is.equal(parameters);
        expect(node).to.have.a.property('statements').that.is.equal(statements);
    });

    it('should create an AstFunction with a single parameter and a single statement', () => {
        const type = 'function';
        const identifier = new AstIdentifier('foo');
        const parameters = new AstNumber(1);
        const statements = new AstAssignment(new AstIdentifier('foo'), new AstNumber(42));
        const node = new AstFunction(identifier, parameters, statements);

        expect(node).to.be.an('object');
        expect(node).to.be.an.instanceOf(AstNode);
        expect(node).to.be.an.instanceOf(AstFragment);
        expect(node).to.be.an.instanceOf(AstFunction);
        expect(node.identifier).to.be.instanceOf(AstIdentifier);
        expect(node.parameters).to.be.an('array');
        expect(node).to.have.a.property('type').that.is.equal(type);
        expect(node).to.have.a.property('identifier').that.is.equal(identifier);
        expect(node).to.have.a.property('parameters').that.is.deep.equal([parameters]);
        expect(node).to.have.a.property('statements').that.is.deep.equal([statements]);
    });

    it('should create an AstFunction with no parameter and no statement', () => {
        const type = 'function';
        const identifier = new AstIdentifier('foo');
        const parameters = [];
        const statements = [];
        const node = new AstFunction(identifier, parameters, statements);

        expect(node).to.be.an('object');
        expect(node).to.be.an.instanceOf(AstNode);
        expect(node).to.be.an.instanceOf(AstFragment);
        expect(node).to.be.an.instanceOf(AstFunction);
        expect(node.identifier).to.be.instanceOf(AstIdentifier);
        expect(node.parameters).to.be.an('array');
        expect(node).to.have.a.property('type').that.is.equal(type);
        expect(node).to.have.a.property('identifier').that.is.equal(identifier);
        expect(node).to.have.a.property('parameters').that.is.equal(parameters);
        expect(node).to.have.a.property('statements').that.is.equal(statements);
    });

    it('should create an AstFunction with the provided properties', () => {
        const type = 'foo';
        const identifier = new AstIdentifier('foo');
        const parameters = [new AstNumber(1), new AstNumber(2)];
        const statements = [new AstAssignment(new AstIdentifier('foo'), new AstNumber(42))];
        const node = new AstFunction('identifier', 'parameters', 'statements', {
            type: type,
            identifier: identifier,
            parameters: parameters,
            statements: statements,
            foo: 'bar'
        });

        expect(node).to.be.an('object');
        expect(node).to.be.an.instanceOf(AstNode);
        expect(node).to.be.an.instanceOf(AstFragment);
        expect(node).to.be.an.instanceOf(AstFunction);
        expect(node.identifier).to.be.instanceOf(AstIdentifier);
        expect(node.parameters).to.be.an('array');
        expect(node).to.have.a.property('type').that.is.equal(type);
        expect(node).to.have.a.property('identifier').that.is.equal(identifier);
        expect(node).to.have.a.property('parameters').that.is.equal(parameters);
        expect(node).to.have.a.property('statements').that.is.equal(statements);
        expect(node).to.have.a.property('foo').that.is.equal('bar');
    });

    it('should throw a TypeError if one of the operands is not a valid AstFragment', () => {
        expect(() => new AstFunction(new AstIdentifier(1), [], {})).to.throw(TypeError);
        expect(() => new AstFunction(new AstIdentifier(1), [], [{}])).to.throw(TypeError);
        expect(() => new AstFunction(new AstIdentifier(1), [], [new AstNumber(1), {}])).to.throw(TypeError);
        expect(() => new AstFunction(new AstIdentifier(1), [], new AstNode('foo'))).to.throw(TypeError);
        expect(() => new AstFunction(new AstIdentifier(1), [], [new AstNode('foo')])).to.throw(TypeError);

        expect(() => new AstFunction(new AstIdentifier(1), {}, [])).to.throw(TypeError);
        expect(() => new AstFunction(new AstIdentifier(1), [{}], [])).to.throw(TypeError);
        expect(() => new AstFunction(new AstIdentifier(1), [new AstNumber(1), {}], [])).to.throw(TypeError);
        expect(() => new AstFunction(new AstIdentifier(1), new AstNode('foo'), [])).to.throw(TypeError);
        expect(() => new AstFunction(new AstIdentifier(1), [new AstNode('foo')], [])).to.throw(TypeError);
        expect(() => new AstFunction({}, [], [])).to.throw(TypeError);
        expect(() => new AstFunction(new AstNode('foo'), [], [])).to.throw(TypeError);
        expect(() => new AstFunction(new AstNumber(2), [], [])).to.throw(TypeError);


        expect(() => new AstFunction(new AstIdentifier('foo'), [], [], {identifier: {}})).to.throw(TypeError);
        expect(() => new AstFunction(new AstIdentifier('foo'), [], [], {identifier: new AstNode('foo')})).to.throw(TypeError);
        expect(() => new AstFunction(new AstIdentifier('foo'), [], [], {identifier: new AstNumber(1)})).to.throw(TypeError);
        expect(() => new AstFunction(new AstIdentifier('foo'), [], [], {parameters: {}})).to.throw(TypeError);
        expect(() => new AstFunction(new AstIdentifier('foo'), [], [], {parameters: [{}]})).to.throw(TypeError);
        expect(() => new AstFunction(new AstIdentifier('foo'), [], [], {parameters: new AstNode('foo')})).to.throw(TypeError);
        expect(() => new AstFunction(new AstIdentifier('foo'), [], [], {parameters: [new AstNode('foo')]})).to.throw(TypeError);
        expect(() => new AstFunction(new AstIdentifier('foo'), [], [], {statements: {}})).to.throw(TypeError);
        expect(() => new AstFunction(new AstIdentifier('foo'), [], [], {statements: [{}]})).to.throw(TypeError);
        expect(() => new AstFunction(new AstIdentifier('foo'), [], [], {statements: new AstNode('foo')})).to.throw(TypeError);
        expect(() => new AstFunction(new AstIdentifier('foo'), [], [], {statements: [new AstNode('foo')]})).to.throw(TypeError);
    });

    it('should stringify an AstFunction', () => {
        const type = 'function';
        const identifier = new AstIdentifier('foo');
        const parameters = [new AstNumber(1), new AstNumber(2)];
        const statements = [new AstAssignment(new AstIdentifier('foo'), new AstNumber(42))];
        const startLine = 1;
        const startColumn = 1;
        const startOffset = 0;
        const endLine = 1;
        const endColumn = 6;
        const endOffset = 5;
        const expected = {
            type: type,
            identifier: {type: 'identifier', value: 'foo'},
            parameters: [
                {type: 'number', value: 1},
                {type: 'number', value: 2}
            ],
            statements: [{
                type: 'assignment',
                identifier: {type: 'identifier', value: 'foo'},
                value: {type: 'number', value: 42}
            }],
            start: {type: 'position', line: startLine, column: startColumn, offset: startOffset},
            end: {type: 'position', line: endLine, column: endColumn, offset: endOffset}
        };
        const node = new AstFunction(identifier, parameters, statements);
        const stringified = '{"type":"' + type + '",' +
            '"identifier":{"type":"identifier","value":"foo"},' +
            '"parameters":[{"type":"number","value":1},{"type":"number","value":2}],' +
            '"statements":[{"type":"assignment","identifier":{"type":"identifier","value":"foo"},"value":{"type":"number","value":42}}],' +
            '"start":{"type":"position","line":' + startLine + ',"column":' + startColumn + ',"offset":' + startOffset + '},' +
            '"end":{"type":"position","line":' + endLine + ',"column":' + endColumn + ',"offset":' + endOffset + '}}';

        node.startAt(startLine, startColumn, startOffset);
        node.endAt(endLine, endColumn, endOffset);

        expect(node).to.be.an('object');
        expect(node).to.be.an.instanceOf(AstNode);
        expect(node).to.be.an.instanceOf(AstFragment);
        expect(node).to.be.an.instanceOf(AstFunction);
        expect(node).to.deep.equal(expected);
        expect(node.identifier).to.be.instanceOf(AstIdentifier);
        expect(node.parameters).to.be.an('array');
        expect(node.start).to.be.instanceOf(AstPosition);
        expect(node.end).to.be.instanceOf(AstPosition);
        expect(node + '').to.be.equal(stringified);
    });

    it('should clone an AstFunction', () => {
        const identifier = new AstIdentifier('foo');
        const parameters = [new AstNumber(1), new AstNumber(2)];
        const statements = [new AstAssignment(new AstIdentifier('foo'), new AstNumber(42))];
        const node = (new AstFunction(identifier, parameters, statements)).startAt(1, 1, 0).endAt(1, 6, 5);

        const clone = node.clone();

        expect(clone).to.be.an('object');
        expect(clone).to.be.an.instanceOf(AstNode);
        expect(clone).to.be.an.instanceOf(AstFragment);
        expect(clone).to.be.an.instanceOf(AstFunction);
        expect(clone).to.not.be.equal(node);
        expect(clone).to.be.deep.equal(node);
    });

    it('should clone an AstFunction with empty list of properties', () => {
        const identifier = new AstIdentifier('foo');
        const parameters = [new AstNumber(1), new AstNumber(2)];
        const statements = [new AstAssignment(new AstIdentifier('foo'), new AstNumber(42))];
        const node = (new AstFunction(identifier, parameters, statements)).startAt(1, 1, 0).endAt(1, 6, 5);

        const clone = node.clone({});

        expect(clone).to.be.an('object');
        expect(clone).to.be.an.instanceOf(AstNode);
        expect(clone).to.be.an.instanceOf(AstFragment);
        expect(clone).to.be.an.instanceOf(AstFunction);
        expect(clone).to.not.be.equal(node);
        expect(clone).to.be.deep.equal(node);
    });

    it('should clone an AstFunction with the provided properties', () => {
        const identifier = new AstIdentifier('foo');
        const parameters = [new AstNumber(1), new AstNumber(2)];
        const statements = [new AstAssignment(new AstIdentifier('foo'), new AstNumber(42))];
        const newIdentifier = new AstIdentifier('bar');
        const newParameters = [new AstNumber(3), new AstNumber(4)];
        const newStatements = [new AstAssignment(new AstIdentifier('bar'), new AstNumber(21))];
        const node = (new AstFunction(identifier, parameters, statements)).startAt(1, 1, 0).endAt(1, 6, 5);

        const clone = node.clone({
            type: 'number',         // should not be allowed
            identifier: newIdentifier,
            parameters: newParameters,
            statements: newStatements
        });

        expect(clone).to.be.an('object');
        expect(clone).to.be.an.instanceOf(AstNode);
        expect(clone).to.be.an.instanceOf(AstFragment);
        expect(clone).to.be.an.instanceOf(AstFunction);
        expect(clone).to.not.be.equal(node);
        expect(clone).to.be.not.deep.equal(node);
        expect(clone).to.have.a.property('type').that.is.equal(node.type);
        expect(clone).to.have.a.property('identifier').that.is.equal(newIdentifier);
        expect(clone).to.have.a.property('parameters').that.is.equal(newParameters);
        expect(clone).to.have.a.property('statements').that.is.equal(newStatements);
        expect(clone).to.have.a.property('start').that.is.equal(node.start);
        expect(clone).to.have.a.property('end').that.is.equal(node.end);
    });

    it('should throw a TypeError if one of the operands is not a valid AstFragment when cloning', () => {
        const node = (new AstFunction(new AstIdentifier(1), [], [])).startAt(1, 1, 0).endAt(1, 4, 3);

        expect(() => node.clone({identifier: new AstNumber(3)})).to.throw(TypeError);
        expect(() => node.clone({identifier: {}})).to.throw(TypeError);
        expect(() => node.clone({identifier: new AstNode('foo')})).to.throw(TypeError);

        expect(() => node.clone({parameters: {}})).to.throw(TypeError);
        expect(() => node.clone({parameters: [{}]})).to.throw(TypeError);
        expect(() => node.clone({parameters: new AstNode('foo')})).to.throw(TypeError);
        expect(() => node.clone({parameters: [new AstNode('foo')]})).to.throw(TypeError);

        expect(() => node.clone({statements: {}})).to.throw(TypeError);
        expect(() => node.clone({statements: [{}]})).to.throw(TypeError);
        expect(() => node.clone({statements: new AstNode('foo')})).to.throw(TypeError);
        expect(() => node.clone({statements: [new AstNode('foo')]})).to.throw(TypeError);
    });

});
