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
 * Unit tests: AST node that represents a function call.
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
const AstFunctionCall = require('../../../src/ast/classes/function-call');

describe('AstFunctionCall', () => {

    it('should create an AstFunctionCall with a list of parameters', () => {
        const type = 'function-call';
        const identifier = new AstIdentifier('foo');
        const parameters = [new AstNumber(1), new AstNumber(2)];
        const node = new AstFunctionCall(identifier, parameters);

        expect(node).to.be.an('object');
        expect(node).to.be.an.instanceOf(AstNode);
        expect(node).to.be.an.instanceOf(AstFragment);
        expect(node).to.be.an.instanceOf(AstFunctionCall);
        expect(node.identifier).to.be.instanceOf(AstIdentifier);
        expect(node.parameters).to.be.an('array');
        expect(node).to.have.a.property('type').that.is.equal(type);
        expect(node).to.have.a.property('identifier').that.is.equal(identifier);
        expect(node).to.have.a.property('parameters').that.is.equal(parameters);
    });

    it('should create an AstFunctionCall with a single parameter', () => {
        const type = 'function-call';
        const identifier = new AstIdentifier('foo');
        const parameters = new AstNumber(1);
        const node = new AstFunctionCall(identifier, parameters);

        expect(node).to.be.an('object');
        expect(node).to.be.an.instanceOf(AstNode);
        expect(node).to.be.an.instanceOf(AstFragment);
        expect(node).to.be.an.instanceOf(AstFunctionCall);
        expect(node.identifier).to.be.instanceOf(AstIdentifier);
        expect(node.parameters).to.be.an('array');
        expect(node).to.have.a.property('type').that.is.equal(type);
        expect(node).to.have.a.property('identifier').that.is.equal(identifier);
        expect(node).to.have.a.property('parameters').that.is.deep.equal([parameters]);
    });

    it('should create an AstFunctionCall with no parameter', () => {
        const type = 'function-call';
        const identifier = new AstIdentifier('foo');
        const parameters = [];
        const node = new AstFunctionCall(identifier, parameters);

        expect(node).to.be.an('object');
        expect(node).to.be.an.instanceOf(AstNode);
        expect(node).to.be.an.instanceOf(AstFragment);
        expect(node).to.be.an.instanceOf(AstFunctionCall);
        expect(node.identifier).to.be.instanceOf(AstIdentifier);
        expect(node.parameters).to.be.an('array');
        expect(node).to.have.a.property('type').that.is.equal(type);
        expect(node).to.have.a.property('identifier').that.is.equal(identifier);
        expect(node).to.have.a.property('parameters').that.is.equal(parameters);
    });

    it('should create an AstFunctionCall with the provided properties', () => {
        const type = 'foo';
        const identifier = new AstIdentifier('foo');
        const parameters = [new AstNumber(1), new AstNumber(2)];
        const node = new AstFunctionCall('identifier', 'parameters', {
            type: type,
            identifier: identifier,
            parameters: parameters,
            foo: 'bar'
        });

        expect(node).to.be.an('object');
        expect(node).to.be.an.instanceOf(AstNode);
        expect(node).to.be.an.instanceOf(AstFragment);
        expect(node).to.be.an.instanceOf(AstFunctionCall);
        expect(node.identifier).to.be.instanceOf(AstIdentifier);
        expect(node.parameters).to.be.an('array');
        expect(node).to.have.a.property('type').that.is.equal(type);
        expect(node).to.have.a.property('identifier').that.is.equal(identifier);
        expect(node).to.have.a.property('parameters').that.is.equal(parameters);
        expect(node).to.have.a.property('foo').that.is.equal('bar');
    });

    it('should throw a TypeError if one of the operands is not a valid AstFragment', () => {
        expect(() => new AstFunctionCall(new AstIdentifier(1), {})).to.throw(TypeError);
        expect(() => new AstFunctionCall(new AstIdentifier(1), [{}])).to.throw(TypeError);
        expect(() => new AstFunctionCall(new AstIdentifier(1), [new AstNumber(1), {}])).to.throw(TypeError);
        expect(() => new AstFunctionCall(new AstIdentifier(1), new AstNode('foo'))).to.throw(TypeError);
        expect(() => new AstFunctionCall(new AstIdentifier(1), [new AstNode('foo')])).to.throw(TypeError);
        expect(() => new AstFunctionCall({}, new AstNumber(1))).to.throw(TypeError);
        expect(() => new AstFunctionCall(new AstNode('foo'), new AstNumber(1))).to.throw(TypeError);
        expect(() => new AstFunctionCall(new AstNumber(2), new AstNumber(1))).to.throw(TypeError);


        expect(() => new AstFunctionCall(new AstIdentifier('foo'), new AstNumber(1), {identifier: {}})).to.throw(TypeError);
        expect(() => new AstFunctionCall(new AstIdentifier('foo'), new AstNumber(1), {identifier: new AstNode('foo')})).to.throw(TypeError);
        expect(() => new AstFunctionCall(new AstIdentifier('foo'), new AstNumber(1), {identifier: new AstNumber(1)})).to.throw(TypeError);
        expect(() => new AstFunctionCall(new AstIdentifier('foo'), new AstNumber(1), {parameters: {}})).to.throw(TypeError);
        expect(() => new AstFunctionCall(new AstIdentifier('foo'), new AstNumber(1), {parameters: [{}]})).to.throw(TypeError);
        expect(() => new AstFunctionCall(new AstIdentifier('foo'), new AstNumber(1), {parameters: new AstNode('foo')})).to.throw(TypeError);
        expect(() => new AstFunctionCall(new AstIdentifier('foo'), new AstNumber(1), {parameters: [new AstNode('foo')]})).to.throw(TypeError);
    });

    it('should stringify an AstFunctionCall', () => {
        const type = 'function-call';
        const identifier = new AstIdentifier('foo');
        const parameters = [new AstNumber(1), new AstNumber(2)];

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
            start: {type: 'position', line: startLine, column: startColumn, offset: startOffset},
            end: {type: 'position', line: endLine, column: endColumn, offset: endOffset}
        };
        const node = new AstFunctionCall(identifier, parameters);
        const stringified = '{"type":"' + type + '",' +
            '"identifier":{"type":"identifier","value":"foo"},' +
            '"parameters":[{"type":"number","value":1},{"type":"number","value":2}],' +
            '"start":{"type":"position","line":' + startLine + ',"column":' + startColumn + ',"offset":' + startOffset + '},' +
            '"end":{"type":"position","line":' + endLine + ',"column":' + endColumn + ',"offset":' + endOffset + '}}';

        node.startAt(startLine, startColumn, startOffset);
        node.endAt(endLine, endColumn, endOffset);

        expect(node).to.be.an('object');
        expect(node).to.be.an.instanceOf(AstNode);
        expect(node).to.be.an.instanceOf(AstFragment);
        expect(node).to.be.an.instanceOf(AstFunctionCall);
        expect(node).to.deep.equal(expected);
        expect(node.identifier).to.be.instanceOf(AstIdentifier);
        expect(node.parameters).to.be.an('array');
        expect(node.start).to.be.instanceOf(AstPosition);
        expect(node.end).to.be.instanceOf(AstPosition);
        expect(node + '').to.be.equal(stringified);
    });

    it('should clone an AstFunctionCall', () => {
        const identifier = new AstIdentifier('foo');
        const parameters = [new AstNumber(1), new AstNumber(2)];
        const node = (new AstFunctionCall(identifier, parameters)).startAt(1, 1, 0).endAt(1, 6, 5);

        const clone = node.clone();

        expect(clone).to.be.an('object');
        expect(clone).to.be.an.instanceOf(AstNode);
        expect(clone).to.be.an.instanceOf(AstFragment);
        expect(clone).to.be.an.instanceOf(AstFunctionCall);
        expect(clone).to.not.be.equal(node);
        expect(clone).to.be.deep.equal(node);
    });

    it('should clone an AstFunctionCall with empty list of properties', () => {
        const identifier = new AstIdentifier('foo');
        const parameters = [new AstNumber(1), new AstNumber(2)];
        const node = (new AstFunctionCall(identifier, parameters)).startAt(1, 1, 0).endAt(1, 6, 5);

        const clone = node.clone({});

        expect(clone).to.be.an('object');
        expect(clone).to.be.an.instanceOf(AstNode);
        expect(clone).to.be.an.instanceOf(AstFragment);
        expect(clone).to.be.an.instanceOf(AstFunctionCall);
        expect(clone).to.not.be.equal(node);
        expect(clone).to.be.deep.equal(node);
    });

    it('should clone an AstFunctionCall with the provided properties', () => {
        const identifier = new AstIdentifier('foo');
        const parameters = [new AstNumber(1), new AstNumber(2)];
        const newIdentifier = new AstIdentifier('bar');
        const newParameters = [new AstNumber(3), new AstNumber(4)];
        const node = (new AstFunctionCall(identifier, parameters)).startAt(1, 1, 0).endAt(1, 6, 5);

        const clone = node.clone({
            type: 'number',         // should not be allowed
            identifier: newIdentifier,
            parameters: newParameters
        });

        expect(clone).to.be.an('object');
        expect(clone).to.be.an.instanceOf(AstNode);
        expect(clone).to.be.an.instanceOf(AstFragment);
        expect(clone).to.be.an.instanceOf(AstFunctionCall);
        expect(clone).to.not.be.equal(node);
        expect(clone).to.be.not.deep.equal(node);
        expect(clone).to.have.a.property('type').that.is.equal(node.type);
        expect(clone).to.have.a.property('identifier').that.is.equal(newIdentifier);
        expect(clone).to.have.a.property('parameters').that.is.equal(newParameters);
        expect(clone).to.have.a.property('start').that.is.equal(node.start);
        expect(clone).to.have.a.property('end').that.is.equal(node.end);
    });

    it('should throw a TypeError if one of the operands is not a valid AstFragment when cloning', () => {
        const node = (new AstFunctionCall(new AstIdentifier(1), [new AstNumber(1)])).startAt(1, 1, 0).endAt(1, 4, 3);

        expect(() => node.clone({identifier: new AstNumber(3)})).to.throw(TypeError);
        expect(() => node.clone({identifier: {}})).to.throw(TypeError);
        expect(() => node.clone({identifier: new AstNode('foo')})).to.throw(TypeError);

        expect(() => node.clone({parameters: {}})).to.throw(TypeError);
        expect(() => node.clone({parameters: [{}]})).to.throw(TypeError);
        expect(() => node.clone({parameters: new AstNode('foo')})).to.throw(TypeError);
        expect(() => node.clone({parameters: [new AstNode('foo')]})).to.throw(TypeError);
    });

});
