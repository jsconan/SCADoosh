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
 * Unit tests: AST node that represents an expression with a declarations clause.
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
const AstExpression = require('../../../src/ast/classes/expression');

describe('AstExpression', () => {

    it('should create an AstExpression with a declarations clause', () => {
        const type = 'expression';
        const expression = new AstNumber(3);
        const declarations = [new AstNumber(1), new AstNumber(2)];
        const node = new AstExpression(expression, declarations);

        expect(node).to.be.an('object');
        expect(node).to.be.an.instanceOf(AstNode);
        expect(node).to.be.an.instanceOf(AstFragment);
        expect(node).to.be.an.instanceOf(AstExpression);
        expect(node.expression).to.be.instanceOf(AstFragment);
        expect(node.declarations).to.be.an('array');
        expect(node).to.have.a.property('type').that.is.equal(type);
        expect(node).to.have.a.property('expression').that.is.equal(expression);
        expect(node).to.have.a.property('declarations').that.is.equal(declarations);
    });

    it('should create an AstExpression with a single declaration', () => {
        const type = 'expression';
        const expression = new AstNumber(3);
        const declarations = new AstNumber(2);
        const node = new AstExpression(expression, declarations);

        expect(node).to.be.an('object');
        expect(node).to.be.an.instanceOf(AstNode);
        expect(node).to.be.an.instanceOf(AstFragment);
        expect(node).to.be.an.instanceOf(AstExpression);
        expect(node.expression).to.be.instanceOf(AstFragment);
        expect(node.declarations).to.be.an('array');
        expect(node).to.have.a.property('type').that.is.equal(type);
        expect(node).to.have.a.property('expression').that.is.equal(expression);
        expect(node).to.have.a.property('declarations').that.is.deep.equal([declarations]);
    });

    it('should create an AstExpression with no declaration', () => {
        const type = 'expression';
        const expression = new AstNumber(3);
        const declarations = [];
        const node = new AstExpression(expression, declarations);

        expect(node).to.be.an('object');
        expect(node).to.be.an.instanceOf(AstNode);
        expect(node).to.be.an.instanceOf(AstFragment);
        expect(node).to.be.an.instanceOf(AstExpression);
        expect(node.expression).to.be.instanceOf(AstFragment);
        expect(node.declarations).to.be.an('array');
        expect(node).to.have.a.property('type').that.is.equal(type);
        expect(node).to.have.a.property('expression').that.is.equal(expression);
        expect(node).to.have.a.property('declarations').that.is.equal(declarations);
    });

    it('should create an AstExpression with the provided properties', () => {
        const type = 'foo';
        const expression = new AstNumber(3);
        const declarations = [new AstNumber(1), new AstNumber(2)];
        const node = new AstExpression('expression', 'declarations', {
            type: type,
            expression: expression,
            declarations: declarations,
            foo: 'bar'
        });

        expect(node).to.be.an('object');
        expect(node).to.be.an.instanceOf(AstNode);
        expect(node).to.be.an.instanceOf(AstFragment);
        expect(node).to.be.an.instanceOf(AstExpression);
        expect(node.expression).to.be.instanceOf(AstFragment);
        expect(node.declarations).to.be.an('array');
        expect(node).to.have.a.property('type').that.is.equal(type);
        expect(node).to.have.a.property('expression').that.is.equal(expression);
        expect(node).to.have.a.property('declarations').that.is.equal(declarations);
        expect(node).to.have.a.property('foo').that.is.equal('bar');
    });

    it('should throw a TypeError if one of the operands is not a valid AstFragment', () => {
        expect(() => new AstExpression(new AstNumber(1), {})).to.throw(TypeError);
        expect(() => new AstExpression(new AstNumber(1), [{}])).to.throw(TypeError);
        expect(() => new AstExpression(new AstNumber(1), [new AstNumber(1), {}])).to.throw(TypeError);
        expect(() => new AstExpression(new AstNumber(1), new AstNode('foo'))).to.throw(TypeError);
        expect(() => new AstExpression(new AstNumber(1), [new AstNode('foo')])).to.throw(TypeError);
        expect(() => new AstExpression({}, new AstNumber(1))).to.throw(TypeError);
        expect(() => new AstExpression(new AstNode('foo'), new AstNumber(1))).to.throw(TypeError);

        expect(() => new AstExpression(new AstNumber(1), new AstNumber(1), {expression: {}})).to.throw(TypeError);
        expect(() => new AstExpression(new AstNumber(1), new AstNumber(1), {expression: new AstNode('foo')})).to.throw(TypeError);
        expect(() => new AstExpression(new AstNumber(1), new AstNumber(1), {declarations: {}})).to.throw(TypeError);
        expect(() => new AstExpression(new AstNumber(1), new AstNumber(1), {declarations: [{}]})).to.throw(TypeError);
        expect(() => new AstExpression(new AstNumber(1), new AstNumber(1), {declarations: new AstNode('foo')})).to.throw(TypeError);
        expect(() => new AstExpression(new AstNumber(1), new AstNumber(1), {declarations: [new AstNode('foo')]})).to.throw(TypeError);
    });

    it('should stringify an AstExpression', () => {
        const type = 'expression';
        const expression = new AstNumber(3);
        const declarations = [new AstNumber(1), new AstNumber(2)];
        const startLine = 1;
        const startColumn = 1;
        const startOffset = 0;
        const endLine = 1;
        const endColumn = 6;
        const endOffset = 5;
        const expected = {
            type: type,
            expression: {type: 'number', value: 3},
            declarations: [
                {type: 'number', value: 1},
                {type: 'number', value: 2}
            ],
            start: {type: 'position', line: startLine, column: startColumn, offset: startOffset},
            end: {type: 'position', line: endLine, column: endColumn, offset: endOffset}
        };
        const node = new AstExpression(expression, declarations);
        const stringified = '{"type":"' + type + '",' +
            '"expression":{"type":"number","value":3},' +
            '"declarations":[{"type":"number","value":1},{"type":"number","value":2}],' +
            '"start":{"type":"position","line":' + startLine + ',"column":' + startColumn + ',"offset":' + startOffset + '},' +
            '"end":{"type":"position","line":' + endLine + ',"column":' + endColumn + ',"offset":' + endOffset + '}}';

        node.startAt(startLine, startColumn, startOffset);
        node.endAt(endLine, endColumn, endOffset);

        expect(node).to.be.an('object');
        expect(node).to.be.an.instanceOf(AstNode);
        expect(node).to.be.an.instanceOf(AstFragment);
        expect(node).to.be.an.instanceOf(AstExpression);
        expect(node).to.deep.equal(expected);
        expect(node.expression).to.be.instanceOf(AstFragment);
        expect(node.declarations).to.be.an('array');
        expect(node.start).to.be.instanceOf(AstPosition);
        expect(node.end).to.be.instanceOf(AstPosition);
        expect(node + '').to.be.equal(stringified);
    });

    it('should clone an AstExpression', () => {
        const expression = new AstNumber(3);
        const declarations = [new AstNumber(1), new AstNumber(2)];
        const node = (new AstExpression(expression, declarations)).startAt(1, 1, 0).endAt(1, 6, 5);

        const clone = node.clone();

        expect(clone).to.be.an('object');
        expect(clone).to.be.an.instanceOf(AstNode);
        expect(clone).to.be.an.instanceOf(AstFragment);
        expect(clone).to.be.an.instanceOf(AstExpression);
        expect(clone).to.not.be.equal(node);
        expect(clone).to.be.deep.equal(node);
    });

    it('should clone an AstExpression with the provided properties', () => {
        const expression = new AstNumber(3);
        const declarations = [new AstNumber(1), new AstNumber(2)];
        const newExpression = new AstIdentifier('bar');
        const newDeclarations = [new AstNumber(3), new AstNumber(4)];
        const node = (new AstExpression(expression, declarations)).startAt(1, 1, 0).endAt(1, 6, 5);

        const clone = node.clone({
            type: 'number',         // should not be allowed
            expression: newExpression,
            declarations: newDeclarations
        });

        expect(clone).to.be.an('object');
        expect(clone).to.be.an.instanceOf(AstNode);
        expect(clone).to.be.an.instanceOf(AstFragment);
        expect(clone).to.be.an.instanceOf(AstExpression);
        expect(clone).to.not.be.equal(node);
        expect(clone).to.be.not.deep.equal(node);
        expect(clone).to.have.a.property('type').that.is.equal(node.type);
        expect(clone).to.have.a.property('expression').that.is.equal(newExpression);
        expect(clone).to.have.a.property('declarations').that.is.equal(newDeclarations);
        expect(clone).to.have.a.property('start').that.is.equal(node.start);
        expect(clone).to.have.a.property('end').that.is.equal(node.end);
    });

    it('should throw a TypeError if one of the operands is not a valid AstFragment when cloning', () => {
        const node = (new AstExpression(new AstNumber(1), [new AstNumber(1)])).startAt(1, 1, 0).endAt(1, 4, 3);

        expect(() => node.clone({expression: {}})).to.throw(TypeError);
        expect(() => node.clone({expression: new AstNode('foo')})).to.throw(TypeError);

        expect(() => node.clone({declarations: {}})).to.throw(TypeError);
        expect(() => node.clone({declarations: [{}]})).to.throw(TypeError);
        expect(() => node.clone({declarations: new AstNode('foo')})).to.throw(TypeError);
        expect(() => node.clone({declarations: [new AstNode('foo')]})).to.throw(TypeError);
    });

});
