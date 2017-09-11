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
 * Unit tests: AST node that represents a member lookup.
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
const AstMemberLookup = require('../../../src/ast/classes/member-lookup');

describe('AstMemberLookup', () => {

    it('should create an AstMemberLookup', () => {
        const type = 'MemberLookup';
        const expr = new AstNumber(2);
        const member = new AstIdentifier('foo');
        const node = new AstMemberLookup(expr, member);

        expect(node).to.be.an('object');
        expect(node).to.be.an.instanceOf(AstNode);
        expect(node).to.be.an.instanceOf(AstFragment);
        expect(node).to.be.an.instanceOf(AstMemberLookup);
        expect(node.expr).to.be.instanceOf(AstFragment);
        expect(node.member).to.be.instanceOf(AstIdentifier);
        expect(node).to.have.a.property('type').that.is.equal(type);
        expect(node).to.have.a.property('expr').that.is.equal(expr);
        expect(node).to.have.a.property('member').that.is.equal(member);
    });

    it('should create an AstMemberLookup with the provided properties', () => {
        const type = 'Foo';
        const expr = new AstNumber(2);
        const member = new AstIdentifier('foo');
        const node = new AstMemberLookup('expr', 'member', {
            type: type,
            expr: expr,
            member: member,
            foo: 'bar'
        });

        expect(node).to.be.an('object');
        expect(node).to.be.an.instanceOf(AstNode);
        expect(node).to.be.an.instanceOf(AstFragment);
        expect(node).to.be.an.instanceOf(AstMemberLookup);
        expect(node.expr).to.be.instanceOf(AstFragment);
        expect(node.member).to.be.instanceOf(AstIdentifier);
        expect(node).to.have.a.property('type').that.is.equal(type);
        expect(node).to.have.a.property('expr').that.is.equal(expr);
        expect(node).to.have.a.property('member').that.is.equal(member);
        expect(node).to.have.a.property('foo').that.is.equal('bar');
    });

    it('should throw a TypeError if one of the operands is not a valid AstFragment', () => {
        expect(() => new AstMemberLookup(new AstNumber(1), {})).to.throw(TypeError);
        expect(() => new AstMemberLookup(new AstNumber(1), new AstNode('Foo'))).to.throw(TypeError);
        expect(() => new AstMemberLookup({}, new AstIdentifier(1))).to.throw(TypeError);
        expect(() => new AstMemberLookup(new AstNode('Foo'), new AstIdentifier(1))).to.throw(TypeError);
        expect(() => new AstMemberLookup(new AstNumber(2), new AstNumber(1))).to.throw(TypeError);

        expect(() => new AstMemberLookup(new AstNumber(1), new AstIdentifier('foo'), {expr: {}})).to.throw(TypeError);
        expect(() => new AstMemberLookup(new AstNumber(1), new AstIdentifier('foo'), {expr: new AstNode('Foo')})).to.throw(TypeError);
        expect(() => new AstMemberLookup(new AstNumber(1), new AstIdentifier('foo'), {member: {}})).to.throw(TypeError);
        expect(() => new AstMemberLookup(new AstNumber(1), new AstIdentifier('foo'), {member: new AstNode('Foo')})).to.throw(TypeError);
    });

    it('should stringify an AstMemberLookup', () => {
        const type = 'MemberLookup';
        const expr = new AstNumber(2);
        const member = new AstIdentifier('foo');
        const startLine = 1;
        const startColumn = 1;
        const startOffset = 0;
        const endLine = 1;
        const endColumn = 6;
        const endOffset = 5;
        const expected = {
            type: type,
            expr: {type: 'Number', value: 2},
            member: {type: 'Identifier', value: 'foo'},
            start: {type: 'Position', line: startLine, column: startColumn, offset: startOffset},
            end: {type: 'Position', line: endLine, column: endColumn, offset: endOffset}
        };
        const node = new AstMemberLookup(expr, member);
        const stringified = '{"type":"' + type + '",' +
            '"expr":{"type":"Number","value":2},' +
            '"member":{"type":"Identifier","value":"foo"},' +
            '"start":{"type":"Position","line":' + startLine + ',"column":' + startColumn + ',"offset":' + startOffset + '},' +
            '"end":{"type":"Position","line":' + endLine + ',"column":' + endColumn + ',"offset":' + endOffset + '}}';

        node.startAt(startLine, startColumn, startOffset);
        node.endAt(endLine, endColumn, endOffset);

        expect(node).to.be.an('object');
        expect(node).to.be.an.instanceOf(AstNode);
        expect(node).to.be.an.instanceOf(AstFragment);
        expect(node).to.be.an.instanceOf(AstMemberLookup);
        expect(node).to.deep.equal(expected);
        expect(node.expr).to.be.instanceOf(AstFragment);
        expect(node.member).to.be.instanceOf(AstIdentifier);
        expect(node.start).to.be.instanceOf(AstPosition);
        expect(node.end).to.be.instanceOf(AstPosition);
        expect(node + '').to.be.equal(stringified);
    });

    it('should clone an AstMemberLookup', () => {
        const node = (new AstMemberLookup(new AstNumber(2), new AstIdentifier('foo'))).startAt(1, 1, 0).endAt(1, 6, 5);

        const clone = node.clone();

        expect(clone).to.be.an('object');
        expect(clone).to.be.an.instanceOf(AstNode);
        expect(clone).to.be.an.instanceOf(AstFragment);
        expect(clone).to.be.an.instanceOf(AstMemberLookup);
        expect(clone).to.not.be.equal(node);
        expect(clone).to.be.deep.equal(node);
    });

    it('should clone an AstMemberLookup with the provided properties', () => {
        const expr = new AstNumber(2);
        const member = new AstIdentifier('foo');
        const newExpr = new AstNumber(1);
        const newMember = new AstIdentifier('bar');

        const node = (new AstMemberLookup(expr, member)).startAt(1, 1, 0).endAt(1, 6, 5);

        const clone = node.clone({
            type: 'Number',         // should not be allowed
            expr: newExpr,
            member: newMember,
        });

        expect(clone).to.be.an('object');
        expect(clone).to.be.an.instanceOf(AstNode);
        expect(clone).to.be.an.instanceOf(AstFragment);
        expect(clone).to.be.an.instanceOf(AstMemberLookup);
        expect(clone).to.not.be.equal(node);
        expect(clone).to.be.not.deep.equal(node);
        expect(clone).to.have.a.property('type').that.is.equal(node.type);
        expect(clone).to.have.a.property('expr').that.is.equal(newExpr);
        expect(clone).to.have.a.property('member').that.is.equal(newMember);
        expect(clone).to.have.a.property('start').that.is.equal(node.start);
        expect(clone).to.have.a.property('end').that.is.equal(node.end);
    });

    it('should throw a TypeError if one of the operands is not a valid AstFragment when cloning', () => {
        const node = (new AstMemberLookup(new AstNumber(2), new AstIdentifier(1))).startAt(1, 1, 0).endAt(1, 4, 3);
        expect(() => node.clone({expr: {}})).to.throw(TypeError);
        expect(() => node.clone({expr: new AstNode('Foo')})).to.throw(TypeError);
        expect(() => node.clone({member: {}})).to.throw(TypeError);
        expect(() => node.clone({member: new AstNumber(3)})).to.throw(TypeError);
        expect(() => node.clone({member: new AstNode('Foo')})).to.throw(TypeError);
    });

});
