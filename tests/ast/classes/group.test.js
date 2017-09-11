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
 * Unit tests: AST node that represents a list of nodes.
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
const AstGroup = require('../../../src/ast/classes/group');

describe('AstGroup', () => {

    it('should create an AstGroup with a list of statements', () => {
        const type = 'Group';
        const statements = [
            new AstAssignment(new AstIdentifier('foo'), new AstNumber(42)),
        ];
        const node = new AstGroup(type, statements);

        expect(node).to.be.an('object');
        expect(node).to.be.an.instanceOf(AstNode);
        expect(node).to.be.an.instanceOf(AstFragment);
        expect(node).to.be.an.instanceOf(AstGroup);
        expect(node.statements).to.be.an('array');
        expect(node).to.have.a.property('type').that.is.equal(type);
        expect(node).to.have.a.property('statements').that.is.deep.equal(statements);
    });

    it('should create an AstGroup with a single statement', () => {
        const type = 'Group';
        const statements = new AstAssignment(new AstIdentifier('foo'), new AstNumber(42));
        const node = new AstGroup(type, statements);

        expect(node).to.be.an('object');
        expect(node).to.be.an.instanceOf(AstNode);
        expect(node).to.be.an.instanceOf(AstFragment);
        expect(node).to.be.an.instanceOf(AstGroup);
        expect(node.statements).to.be.an('array');
        expect(node).to.have.a.property('type').that.is.equal(type);
        expect(node).to.have.a.property('statements').that.is.deep.equal([statements]);
    });

    it('should create an AstGroup with no statement', () => {
        const type = 'Group';
        const statements = [];
        const node = new AstGroup(type, statements);

        expect(node).to.be.an('object');
        expect(node).to.be.an.instanceOf(AstNode);
        expect(node).to.be.an.instanceOf(AstFragment);
        expect(node).to.be.an.instanceOf(AstGroup);
        expect(node.statements).to.be.an('array');
        expect(node).to.have.a.property('type').that.is.equal(type);
        expect(node).to.have.a.property('statements').that.is.deep.equal(statements);
    });


    it('should create an AstGroup with the specified properties', () => {
        const type = 'Foo';
        const statements = [
            new AstAssignment(new AstIdentifier('foo'), new AstNumber(42)),
        ];
        const node = new AstGroup('Group', 'statements', {
            type: type,
            statements: statements,
            foo: 'bar'
        });

        expect(node).to.be.an('object');
        expect(node).to.be.an.instanceOf(AstNode);
        expect(node).to.be.an.instanceOf(AstFragment);
        expect(node).to.be.an.instanceOf(AstGroup);
        expect(node.statements).to.be.an('array');
        expect(node).to.have.a.property('type').that.is.equal(type);
        expect(node).to.have.a.property('statements').that.is.deep.equal(statements);
        expect(node).to.have.a.property('foo').that.is.equal('bar');
    });

    it('should throw a TypeError if the type is missing', () => {
        expect(() => {
            new AstGroup();
        }).to.throw(TypeError);

        expect(() => {
            new AstGroup("", []);
        }).to.throw(TypeError);
    });

    it('should throw a TypeError if the type is not a string', () => {
        expect(() => {
            new AstGroup({myProp: "a property"}, []);
        }).to.throw(TypeError);

        expect(() => {
            new AstGroup(true, []);
        }).to.throw(TypeError);
    });

    it('should throw a TypeError if the statements are not valid', () => {
        const type = 'Group';
        expect(() => new AstGroup(type, [{}])).to.throw(TypeError);
        expect(() => new AstGroup(type, {})).to.throw(TypeError);
        expect(() => new AstGroup(type, new AstNode('Foo'))).to.throw(TypeError);
        expect(() => new AstGroup(type, [new AstNode('Foo')])).to.throw(TypeError);

        expect(() => new AstGroup(type, [new AstFragment('Foo')], {statements: [{}]})).to.throw(TypeError);
        expect(() => new AstGroup(type, [new AstFragment('Foo')], {statements: {}})).to.throw(TypeError);
        expect(() => new AstGroup(type, [new AstFragment('Foo')], {statements: new AstNode('Foo')})).to.throw(TypeError);
        expect(() => new AstGroup(type, [new AstFragment('Foo')], {statements: [new AstNode('Foo')]})).to.throw(TypeError);
    });

    it('should stringify an AstGroup', () => {
        const type = 'Group';
        const statements = new AstAssignment(new AstIdentifier('foo'), new AstNumber(42));
        const node = new AstGroup(type, statements);
        const expected = {
            type: type,
            statements: [{
                type: 'Assignment',
                identifier: {
                    type: 'Identifier', value: 'foo',
                    start: {type: 'Position', line: 1, column: 2, offset: 1},
                    end: {type: 'Position', line: 1, column: 5, offset: 4}
                },
                value: {
                    type: 'Number', value: 42,
                    start: {type: 'Position', line: 1, column: 7, offset: 6},
                    end: {type: 'Position', line: 1, column: 9, offset: 8}
                },
                start: {type: 'Position', line: 1, column: 2, offset: 1},
                end: {type: 'Position', line: 1, column: 9, offset: 8}
            }],
            start: {type: 'Position', line: 1, column: 1, offset: 0},
            end: {type: 'Position', line: 1, column: 10, offset: 9}
        };
        const stringified = '{"type":"' + type + '",' +
            '"statements":[{"type":"Assignment",' +
            '"identifier":{"type":"Identifier","value":"foo",' +
            '"start":{"type":"Position","line":1,"column":2,"offset":1},' +
            '"end":{"type":"Position","line":1,"column":5,"offset":4}},' +
            '"value":{"type":"Number","value":42,' +
            '"start":{"type":"Position","line":1,"column":7,"offset":6},' +
            '"end":{"type":"Position","line":1,"column":9,"offset":8}},' +
            '"start":{"type":"Position","line":1,"column":2,"offset":1},' +
            '"end":{"type":"Position","line":1,"column":9,"offset":8}}],' +
            '"start":{"type":"Position","line":1,"column":1,"offset":0},' +
            '"end":{"type":"Position","line":1,"column":10,"offset":9}}';

        node.statements[0].identifier.startAt(1, 2, 1);
        node.statements[0].identifier.endAt(1, 5, 4);
        node.statements[0].value.startAt(1, 7, 6);
        node.statements[0].value.endAt(1, 9, 8);
        node.statements[0].startAt(1, 2, 1);
        node.statements[0].endAt(1, 9, 8);
        node.startAt(1, 1, 0);
        node.endAt(1, 10, 9);

        expect(node).to.be.an('object');
        expect(node).to.be.an.instanceOf(AstNode);
        expect(node).to.be.an.instanceOf(AstFragment);
        expect(node).to.be.an.instanceOf(AstGroup);
        expect(node).to.deep.equal(expected);
        expect(node.statements).to.be.an('array');
        expect(node.start).to.be.instanceOf(AstPosition);
        expect(node.end).to.be.instanceOf(AstPosition);
        expect(node + '').to.be.equal(stringified);
    });

    it('should clone an AstGroup', () => {
        const type = 'Group';
        const statements = new AstAssignment(new AstIdentifier('foo'), new AstNumber(42));
        const node = new AstGroup(type, statements);
        const clone = node.clone();

        expect(clone).to.be.an('object');
        expect(clone).to.be.an.instanceOf(AstNode);
        expect(clone).to.be.an.instanceOf(AstFragment);
        expect(clone).to.be.an.instanceOf(AstGroup);
        expect(clone).to.not.be.equal(node);
        expect(clone).to.be.deep.equal(node);
    });

    it('should clone an AstGroup with the provided properties', () => {
        const type = 'Group';
        const statements = new AstAssignment(new AstIdentifier('foo'), new AstNumber(42));
        const newStatements = [new AstAssignment(new AstIdentifier('bar'), new AstNumber(21))];

        const node = (new AstGroup(type, statements)).startAt(1, 1, 0).endAt(1, 10, 9);

        const clone = node.clone({
            type: 'Number',         // should not be allowed
            statements: newStatements
        });

        expect(clone).to.be.an('object');
        expect(clone).to.be.an.instanceOf(AstNode);
        expect(clone).to.be.an.instanceOf(AstFragment);
        expect(clone).to.be.an.instanceOf(AstGroup);
        expect(clone).to.not.be.equal(node);
        expect(clone).to.be.not.deep.equal(node);
        expect(clone).to.have.a.property('type').that.is.equal(node.type);
        expect(clone).to.have.a.property('statements').that.is.deep.equal(newStatements);
        expect(clone).to.have.a.property('start').that.is.equal(node.start);
        expect(clone).to.have.a.property('end').that.is.equal(node.end);
    });

    it('should throw a TypeError if the statements are not valid when cloning', () => {
        const type = 'Group';
        const statements = new AstAssignment(new AstIdentifier('foo'), new AstNumber(42));
        const node = (new AstGroup(type, statements)).startAt(1, 1, 0).endAt(1, 10, 9);
        expect(() => node.clone({statements: {}})).to.throw(TypeError);
        expect(() => node.clone({statements: [{}]})).to.throw(TypeError);
    });

});
