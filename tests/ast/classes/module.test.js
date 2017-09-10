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
 * Unit tests: AST node that represents a module definition.
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
const AstNoop = require('../../../src/ast/classes/noop');
const AstFunction = require('../../../src/ast/classes/function');
const AstModule = require('../../../src/ast/classes/module');

describe('AstModule', () => {

    it('should create an AstModule with a list of parameters', () => {
        const type = 'module';
        const identifier = new AstIdentifier('foo');
        const parameters = [new AstNumber(1), new AstNumber(2)];
        const body = new AstAssignment(new AstIdentifier('foo'), new AstNumber(42));
        const node = new AstModule(identifier, parameters, body);

        expect(node).to.be.an('object');
        expect(node).to.be.an.instanceOf(AstNode);
        expect(node).to.be.an.instanceOf(AstFragment);
        expect(node).to.be.an.instanceOf(AstFunction);
        expect(node).to.be.an.instanceOf(AstModule);
        expect(node.identifier).to.be.instanceOf(AstIdentifier);
        expect(node.parameters).to.be.an('array');
        expect(node).to.have.a.property('type').that.is.equal(type);
        expect(node).to.have.a.property('identifier').that.is.equal(identifier);
        expect(node).to.have.a.property('parameters').that.is.equal(parameters);
        expect(node).to.have.a.property('body').that.is.equal(body);
    });

    it('should create an AstModule with a single parameter', () => {
        const type = 'module';
        const identifier = new AstIdentifier('foo');
        const parameters = new AstNumber(1);
        const body = new AstAssignment(new AstIdentifier('foo'), new AstNumber(42));
        const node = new AstModule(identifier, parameters, body);

        expect(node).to.be.an('object');
        expect(node).to.be.an.instanceOf(AstNode);
        expect(node).to.be.an.instanceOf(AstFragment);
        expect(node).to.be.an.instanceOf(AstFunction);
        expect(node).to.be.an.instanceOf(AstModule);
        expect(node.identifier).to.be.instanceOf(AstIdentifier);
        expect(node.parameters).to.be.an('array');
        expect(node).to.have.a.property('type').that.is.equal(type);
        expect(node).to.have.a.property('identifier').that.is.equal(identifier);
        expect(node).to.have.a.property('parameters').that.is.deep.equal([parameters]);
        expect(node).to.have.a.property('body').that.is.deep.equal(body);
    });

    it('should create an AstModule with no parameter', () => {
        const type = 'module';
        const identifier = new AstIdentifier('foo');
        const parameters = [];
        const body = new AstNoop();
        const node = new AstModule(identifier, parameters, body);

        expect(node).to.be.an('object');
        expect(node).to.be.an.instanceOf(AstNode);
        expect(node).to.be.an.instanceOf(AstFragment);
        expect(node).to.be.an.instanceOf(AstFunction);
        expect(node).to.be.an.instanceOf(AstModule);
        expect(node.identifier).to.be.instanceOf(AstIdentifier);
        expect(node.parameters).to.be.an('array');
        expect(node).to.have.a.property('type').that.is.equal(type);
        expect(node).to.have.a.property('identifier').that.is.equal(identifier);
        expect(node).to.have.a.property('parameters').that.is.equal(parameters);
        expect(node).to.have.a.property('body').that.is.equal(body);
    });

    it('should create an AstModule with the provided properties', () => {
        const type = 'foo';
        const identifier = new AstIdentifier('foo');
        const parameters = [new AstNumber(1), new AstNumber(2)];
        const body = new AstAssignment(new AstIdentifier('foo'), new AstNumber(42));
        const node = new AstModule('identifier', 'parameters', 'body', {
            type: type,
            identifier: identifier,
            parameters: parameters,
            body: body,
            foo: 'bar'
        });

        expect(node).to.be.an('object');
        expect(node).to.be.an.instanceOf(AstNode);
        expect(node).to.be.an.instanceOf(AstFragment);
        expect(node).to.be.an.instanceOf(AstFunction);
        expect(node).to.be.an.instanceOf(AstModule);
        expect(node.identifier).to.be.instanceOf(AstIdentifier);
        expect(node.parameters).to.be.an('array');
        expect(node).to.have.a.property('type').that.is.equal(type);
        expect(node).to.have.a.property('identifier').that.is.equal(identifier);
        expect(node).to.have.a.property('parameters').that.is.equal(parameters);
        expect(node).to.have.a.property('body').that.is.equal(body);
        expect(node).to.have.a.property('foo').that.is.equal('bar');
    });

    it('should throw a TypeError if one of the operands is not a valid AstFragment', () => {
        expect(() => new AstModule(new AstIdentifier(1), [], {})).to.throw(TypeError);
        expect(() => new AstModule(new AstIdentifier(1), [], [])).to.throw(TypeError);
        expect(() => new AstModule(new AstIdentifier(1), [], new AstNode('foo'))).to.throw(TypeError);

        expect(() => new AstModule(new AstIdentifier(1), {}, new AstNoop())).to.throw(TypeError);
        expect(() => new AstModule(new AstIdentifier(1), [{}], new AstNoop())).to.throw(TypeError);
        expect(() => new AstModule(new AstIdentifier(1), [new AstNumber(1), {}], new AstNoop())).to.throw(TypeError);
        expect(() => new AstModule(new AstIdentifier(1), new AstNode('foo'), new AstNoop())).to.throw(TypeError);
        expect(() => new AstModule(new AstIdentifier(1), [new AstNode('foo')], new AstNoop())).to.throw(TypeError);
        expect(() => new AstModule({}, [], new AstNoop())).to.throw(TypeError);
        expect(() => new AstModule(new AstNode('foo'), [], new AstNoop())).to.throw(TypeError);
        expect(() => new AstModule(new AstNumber(2), [], new AstNoop())).to.throw(TypeError);


        expect(() => new AstModule(new AstIdentifier('foo'), [], new AstNoop(), {identifier: {}})).to.throw(TypeError);
        expect(() => new AstModule(new AstIdentifier('foo'), [], new AstNoop(), {identifier: new AstNode('foo')})).to.throw(TypeError);
        expect(() => new AstModule(new AstIdentifier('foo'), [], new AstNoop(), {identifier: new AstNumber(1)})).to.throw(TypeError);
        expect(() => new AstModule(new AstIdentifier('foo'), [], new AstNoop(), {parameters: {}})).to.throw(TypeError);
        expect(() => new AstModule(new AstIdentifier('foo'), [], new AstNoop(), {parameters: [{}]})).to.throw(TypeError);
        expect(() => new AstModule(new AstIdentifier('foo'), [], new AstNoop(), {parameters: new AstNode('foo')})).to.throw(TypeError);
        expect(() => new AstModule(new AstIdentifier('foo'), [], new AstNoop(), {parameters: [new AstNode('foo')]})).to.throw(TypeError);
        expect(() => new AstModule(new AstIdentifier('foo'), [], new AstNoop(), {body: {}})).to.throw(TypeError);
        expect(() => new AstModule(new AstIdentifier('foo'), [], new AstNoop(), {body: []})).to.throw(TypeError);
        expect(() => new AstModule(new AstIdentifier('foo'), [], new AstNoop(), {body: new AstNode('foo')})).to.throw(TypeError);
    });

    it('should stringify an AstModule', () => {
        const type = 'module';
        const identifier = new AstIdentifier('foo');
        const parameters = [new AstNumber(1), new AstNumber(2)];
        const body = new AstAssignment(new AstIdentifier('foo'), new AstNumber(42));
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
            body: {
                type: 'assignment',
                identifier: {type: 'identifier', value: 'foo'},
                value: {type: 'number', value: 42}
            },
            start: {type: 'position', line: startLine, column: startColumn, offset: startOffset},
            end: {type: 'position', line: endLine, column: endColumn, offset: endOffset}
        };
        const node = new AstModule(identifier, parameters, body);
        const stringified = '{"type":"' + type + '",' +
            '"identifier":{"type":"identifier","value":"foo"},' +
            '"parameters":[{"type":"number","value":1},{"type":"number","value":2}],' +
            '"body":{"type":"assignment","identifier":{"type":"identifier","value":"foo"},"value":{"type":"number","value":42}},' +
            '"start":{"type":"position","line":' + startLine + ',"column":' + startColumn + ',"offset":' + startOffset + '},' +
            '"end":{"type":"position","line":' + endLine + ',"column":' + endColumn + ',"offset":' + endOffset + '}}';

        node.startAt(startLine, startColumn, startOffset);
        node.endAt(endLine, endColumn, endOffset);

        expect(node).to.be.an('object');
        expect(node).to.be.an.instanceOf(AstNode);
        expect(node).to.be.an.instanceOf(AstFragment);
        expect(node).to.be.an.instanceOf(AstFunction);
        expect(node).to.be.an.instanceOf(AstModule);
        expect(node).to.deep.equal(expected);
        expect(node.identifier).to.be.instanceOf(AstIdentifier);
        expect(node.parameters).to.be.an('array');
        expect(node.start).to.be.instanceOf(AstPosition);
        expect(node.end).to.be.instanceOf(AstPosition);
        expect(node + '').to.be.equal(stringified);
    });

    it('should clone an AstModule', () => {
        const identifier = new AstIdentifier('foo');
        const parameters = [new AstNumber(1), new AstNumber(2)];
        const body = new AstAssignment(new AstIdentifier('foo'), new AstNumber(42));
        const node = (new AstModule(identifier, parameters, body)).startAt(1, 1, 0).endAt(1, 6, 5);

        const clone = node.clone();

        expect(clone).to.be.an('object');
        expect(clone).to.be.an.instanceOf(AstNode);
        expect(clone).to.be.an.instanceOf(AstFragment);
        expect(node).to.be.an.instanceOf(AstFunction);
        expect(clone).to.be.an.instanceOf(AstModule);
        expect(clone).to.not.be.equal(node);
        expect(clone).to.be.deep.equal(node);
    });

    it('should clone an AstModule with empty list of properties', () => {
        const identifier = new AstIdentifier('foo');
        const parameters = [new AstNumber(1), new AstNumber(2)];
        const body = new AstAssignment(new AstIdentifier('foo'), new AstNumber(42));
        const node = (new AstModule(identifier, parameters, body)).startAt(1, 1, 0).endAt(1, 6, 5);

        const clone = node.clone({});

        expect(clone).to.be.an('object');
        expect(clone).to.be.an.instanceOf(AstNode);
        expect(clone).to.be.an.instanceOf(AstFragment);
        expect(node).to.be.an.instanceOf(AstFunction);
        expect(clone).to.be.an.instanceOf(AstModule);
        expect(clone).to.not.be.equal(node);
        expect(clone).to.be.deep.equal(node);
    });

    it('should clone an AstModule with the provided properties', () => {
        const identifier = new AstIdentifier('foo');
        const parameters = [new AstNumber(1), new AstNumber(2)];
        const body = new AstAssignment(new AstIdentifier('foo'), new AstNumber(42));
        const newIdentifier = new AstIdentifier('bar');
        const newParameters = [new AstNumber(3), new AstNumber(4)];
        const newBody = new AstAssignment(new AstIdentifier('bar'), new AstNumber(21));
        const node = (new AstModule(identifier, parameters, body)).startAt(1, 1, 0).endAt(1, 6, 5);

        const clone = node.clone({
            type: 'number',         // should not be allowed
            identifier: newIdentifier,
            parameters: newParameters,
            body: newBody
        });

        expect(clone).to.be.an('object');
        expect(clone).to.be.an.instanceOf(AstNode);
        expect(clone).to.be.an.instanceOf(AstFragment);
        expect(node).to.be.an.instanceOf(AstFunction);
        expect(clone).to.be.an.instanceOf(AstModule);
        expect(clone).to.not.be.equal(node);
        expect(clone).to.be.not.deep.equal(node);
        expect(clone).to.have.a.property('type').that.is.equal(node.type);
        expect(clone).to.have.a.property('identifier').that.is.equal(newIdentifier);
        expect(clone).to.have.a.property('parameters').that.is.equal(newParameters);
        expect(clone).to.have.a.property('body').that.is.equal(newBody);
        expect(clone).to.have.a.property('start').that.is.equal(node.start);
        expect(clone).to.have.a.property('end').that.is.equal(node.end);
    });

    it('should throw a TypeError if one of the operands is not a valid AstFragment when cloning', () => {
        const node = (new AstModule(new AstIdentifier(1), [], new AstNoop())).startAt(1, 1, 0).endAt(1, 4, 3);

        expect(() => node.clone({identifier: new AstNumber(3)})).to.throw(TypeError);
        expect(() => node.clone({identifier: {}})).to.throw(TypeError);
        expect(() => node.clone({identifier: new AstNode('foo')})).to.throw(TypeError);

        expect(() => node.clone({parameters: {}})).to.throw(TypeError);
        expect(() => node.clone({parameters: [{}]})).to.throw(TypeError);
        expect(() => node.clone({parameters: new AstNode('foo')})).to.throw(TypeError);
        expect(() => node.clone({parameters: [new AstNode('foo')]})).to.throw(TypeError);

        expect(() => node.clone({body: {}})).to.throw(TypeError);
        expect(() => node.clone({body: []})).to.throw(TypeError);
        expect(() => node.clone({body: new AstNode('foo')})).to.throw(TypeError);
    });

});
