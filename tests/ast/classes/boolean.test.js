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
 * Unit tests: AST node that represents a boolean literal.
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
const AstBoolean = require('../../../src/ast/classes/boolean');

describe('AstBoolean', () => {

    it('should create an AstBoolean with the specified value', () => {
        const type = 'boolean';
        const value = true;
        const node = new AstBoolean(value);

        expect(node).to.be.an('object');
        expect(node).to.be.an.instanceOf(AstNode);
        expect(node).to.be.an.instanceOf(AstFragment);
        expect(node).to.be.an.instanceOf(AstLiteral);
        expect(node).to.be.an.instanceOf(AstBoolean);
        expect(node).to.have.a.property('type').that.is.equal(type);
        expect(node).to.have.a.property('value').that.is.equal(value);
    });

    it('should create an AstBoolean with the specified value as a string (true)', () => {
        const type = 'boolean';
        const value = true;
        const node = new AstBoolean('true');

        expect(node).to.be.an('object');
        expect(node).to.be.an.instanceOf(AstNode);
        expect(node).to.be.an.instanceOf(AstFragment);
        expect(node).to.be.an.instanceOf(AstLiteral);
        expect(node).to.be.an.instanceOf(AstBoolean);
        expect(node).to.have.a.property('type').that.is.equal(type);
        expect(node).to.have.a.property('value').that.is.equal(value);
    });

    it('should create an AstBoolean with the specified value as a string (false)', () => {
        const type = 'boolean';
        const value = false;
        const node = new AstBoolean('false');

        expect(node).to.be.an('object');
        expect(node).to.be.an.instanceOf(AstNode);
        expect(node).to.be.an.instanceOf(AstFragment);
        expect(node).to.be.an.instanceOf(AstLiteral);
        expect(node).to.be.an.instanceOf(AstBoolean);
        expect(node).to.have.a.property('type').that.is.equal(type);
        expect(node).to.have.a.property('value').that.is.equal(value);
    });

    it('should create an AstBoolean with the specified properties', () => {
        const type = 'boolean';
        const value = true;
        const node = new AstBoolean(false, {value: 'true', info: 'foo'});

        expect(node).to.be.an('object');
        expect(node).to.be.an.instanceOf(AstNode);
        expect(node).to.be.an.instanceOf(AstFragment);
        expect(node).to.be.an.instanceOf(AstLiteral);
        expect(node).to.be.an.instanceOf(AstBoolean);
        expect(node).to.have.a.property('type').that.is.equal(type);
        expect(node).to.have.a.property('value').that.is.equal(value);
        expect(node).to.have.a.property('info').that.is.equal('foo');
    });

    it('should throw a TypeError if the value is not compatible with boolean', () => {
        expect(() => new AstBoolean('')).to.throw(TypeError);
        expect(() => new AstBoolean('foo')).to.throw(TypeError);
        expect(() => new AstBoolean({})).to.throw(TypeError);
        expect(() => new AstBoolean(10)).to.throw(TypeError);
        expect(() => new AstBoolean(0)).to.throw(TypeError);

        expect(() => new AstBoolean(true, {value: ''})).to.throw(TypeError);
        expect(() => new AstBoolean(true, {value: 'foo'})).to.throw(TypeError);
        expect(() => new AstBoolean(true, {value: {}})).to.throw(TypeError);
        expect(() => new AstBoolean(true, {value: 10})).to.throw(TypeError);
        expect(() => new AstBoolean(true, {value: 0})).to.throw(TypeError);
    });

    it('should stringify an AstBoolean', () => {
        const type = 'boolean';
        const value = true;
        const startLine = 1;
        const startColumn = 1;
        const startOffset = 0;
        const endLine = 1;
        const endColumn = 5;
        const endOffset = 4;
        const expected = {
            type: type,
            value: value,
            start: {type: 'position', line: startLine, column: startColumn, offset: startOffset},
            end: {type: 'position', line: endLine, column: endColumn, offset: endOffset}
        };
        const node = new AstBoolean(value);
        const stringified = '{"type":"' + type + '","value":' + value + ',' +
            '"start":{"type":"position","line":' + startLine + ',"column":' + startColumn + ',"offset":' + startOffset + '},' +
            '"end":{"type":"position","line":' + endLine + ',"column":' + endColumn + ',"offset":' + endOffset + '}}';

        node.startAt(startLine, startColumn, startOffset);
        node.endAt(endLine, endColumn, endOffset);

        expect(node).to.be.an('object');
        expect(node).to.be.an.instanceOf(AstNode);
        expect(node).to.be.an.instanceOf(AstFragment);
        expect(node).to.be.an.instanceOf(AstLiteral);
        expect(node).to.be.an.instanceOf(AstBoolean);
        expect(node).to.deep.equal(expected);
        expect(node.start).to.be.instanceOf(AstPosition);
        expect(node.end).to.be.instanceOf(AstPosition);
        expect(node + '').to.be.equal(stringified);
    });

    it('should clone an AstBoolean', () => {
        const value = true;
        const node = (new AstBoolean(value)).startAt(1, 1, 0).endAt(1, 4, 3);

        const clone = node.clone();

        expect(clone).to.be.an('object');
        expect(clone).to.be.an.instanceOf(AstNode);
        expect(clone).to.be.an.instanceOf(AstFragment);
        expect(clone).to.be.an.instanceOf(AstLiteral);
        expect(clone).to.be.an.instanceOf(AstBoolean);
        expect(clone).to.not.be.equal(node);
        expect(clone).to.be.deep.equal(node);
    });

    it('should clone an AstBoolean with the provided properties', () => {
        const value = true;
        const newValue = false;
        const node = (new AstBoolean(value)).startAt(1, 1, 0).endAt(1, 4, 3);

        const clone = node.clone({
            type: 'number',         // should not be allowed
            value: '' + newValue
        });

        expect(clone).to.be.an('object');
        expect(clone).to.be.an.instanceOf(AstNode);
        expect(clone).to.be.an.instanceOf(AstFragment);
        expect(clone).to.be.an.instanceOf(AstLiteral);
        expect(clone).to.be.an.instanceOf(AstBoolean);
        expect(clone).to.not.be.equal(node);
        expect(clone).to.be.not.deep.equal(node);
        expect(clone).to.have.a.property('type').that.is.equal(node.type);
        expect(clone).to.have.a.property('value').that.is.equal(newValue);
        expect(clone).to.have.a.property('start').that.is.equal(node.start);
        expect(clone).to.have.a.property('end').that.is.equal(node.end);
    });

    it('should throw a TypeError if the value to set in a clone is not compatible with boolean', () => {
        const node = new AstBoolean(true);
        expect(() => node.clone({value: ''})).to.throw(TypeError);
        expect(() => node.clone({value: 'foo'})).to.throw(TypeError);
        expect(() => node.clone({value: {}})).to.throw(TypeError);
        expect(() => node.clone({value: 10})).to.throw(TypeError);
        expect(() => node.clone({value: 0})).to.throw(TypeError);
    });

});
