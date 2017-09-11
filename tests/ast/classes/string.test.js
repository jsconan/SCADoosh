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
 * Unit tests: AST node that represents a string literal.
 *
 * @package tests/ast/classes
 * @author jsconan
 */

const chai = require('chai');
const expect = chai.expect;

const AstNode = require('../../../src/ast/classes/node');
const AstPosition = require('../../../src/ast/classes/position');
const AstFragment = require('../../../src/ast/classes/fragment');
const AstLiteral = require('../../../src/ast/classes/literal');
const AstString = require('../../../src/ast/classes/string');

describe('AstString', () => {

    it('should create an AstString with the specified value', () => {
        const type = 'String';
        const value = 'a string';
        const node = new AstString(value);

        expect(node).to.be.an('object');
        expect(node).to.be.an.instanceOf(AstNode);
        expect(node).to.be.an.instanceOf(AstFragment);
        expect(node).to.be.an.instanceOf(AstLiteral);
        expect(node).to.be.an.instanceOf(AstString);
        expect(node).to.have.a.property('type').that.is.equal(type);
        expect(node).to.have.a.property('value').that.is.equal(value);
    });

    it('should create an AstString with the specified properties', () => {
        const type = 'String';
        const value = 42;
        const node = new AstString(value, {
            info: 'foo'
        });

        expect(node).to.be.an('object');
        expect(node).to.be.an.instanceOf(AstNode);
        expect(node).to.be.an.instanceOf(AstFragment);
        expect(node).to.be.an.instanceOf(AstLiteral);
        expect(node).to.be.an.instanceOf(AstString);
        expect(node).to.have.a.property('type').that.is.equal(type);
        expect(node).to.have.a.property('value').that.is.equal('' + value);
        expect(node).to.have.a.property('info').that.is.equal('foo');
    });

    it('should create an AstString with the specified value as a stringable', () => {
        const type = 'String';
        const value = 'a string';
        const node = new AstString({
            value: 'a string',
            toString: function () {
                return '' + this.value;
            }
        });

        expect(node).to.be.an('object');
        expect(node).to.be.an.instanceOf(AstNode);
        expect(node).to.be.an.instanceOf(AstFragment);
        expect(node).to.be.an.instanceOf(AstLiteral);
        expect(node).to.be.an.instanceOf(AstString);
        expect(node).to.have.a.property('type').that.is.equal(type);
        expect(node).to.have.a.property('value').that.is.equal(value);
    });

    it('should stringify an AstString', () => {
        const type = 'String';
        const value = 'a string';
        const startLine = 1;
        const startColumn = 1;
        const startOffset = 0;
        const endLine = 1;
        const endColumn = 9;
        const endOffset = 8;
        const expected = {
            type: type,
            value: value,
            start: {type: 'Position', line: startLine, column: startColumn, offset: startOffset},
            end: {type: 'Position', line: endLine, column: endColumn, offset: endOffset}
        };
        const node = new AstString(value);
        const stringified = '{"type":"' + type + '","value":"' + value + '",' +
            '"start":{"type":"Position","line":' + startLine + ',"column":' + startColumn + ',"offset":' + startOffset + '},' +
            '"end":{"type":"Position","line":' + endLine + ',"column":' + endColumn + ',"offset":' + endOffset + '}}';

        node.startAt(startLine, startColumn, startOffset);
        node.endAt(endLine, endColumn, endOffset);

        expect(node).to.be.an('object');
        expect(node).to.be.an.instanceOf(AstNode);
        expect(node).to.be.an.instanceOf(AstFragment);
        expect(node).to.be.an.instanceOf(AstLiteral);
        expect(node).to.be.an.instanceOf(AstString);
        expect(node).to.deep.equal(expected);
        expect(node.start).to.be.instanceOf(AstPosition);
        expect(node.end).to.be.instanceOf(AstPosition);
        expect(node + '').to.be.equal(stringified);
    });

    it('should clone an AstString', () => {
        const value = 'foo';
        const node = (new AstString(value)).startAt(1, 1, 0).endAt(1, 4, 3);

        const clone = node.clone();

        expect(clone).to.be.an('object');
        expect(clone).to.be.an.instanceOf(AstNode);
        expect(clone).to.be.an.instanceOf(AstFragment);
        expect(clone).to.be.an.instanceOf(AstLiteral);
        expect(clone).to.be.an.instanceOf(AstString);
        expect(clone).to.not.be.equal(node);
        expect(clone).to.be.deep.equal(node);
    });

    it('should clone an AstString with the provided properties', () => {
        const value = 'foo';
        const newValue = 123;
        const node = (new AstString(value)).startAt(1, 1, 0).endAt(1, 4, 3);

        const clone = node.clone({
            type: 'Number',         // should not be allowed
            value: newValue
        });

        expect(clone).to.be.an('object');
        expect(clone).to.be.an.instanceOf(AstNode);
        expect(clone).to.be.an.instanceOf(AstFragment);
        expect(clone).to.be.an.instanceOf(AstLiteral);
        expect(clone).to.be.an.instanceOf(AstString);
        expect(clone).to.not.be.equal(node);
        expect(clone).to.be.not.deep.equal(node);
        expect(clone).to.have.a.property('type').that.is.equal(node.type);
        expect(clone).to.have.a.property('value').that.is.equal('' + newValue);
        expect(clone).to.have.a.property('start').that.is.equal(node.start);
        expect(clone).to.have.a.property('end').that.is.equal(node.end);
    });

});
