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
 * Unit tests: AST node that represents a number literal.
 *
 * @package tests/ast
 * @author jsconan
 */

const chai = require('chai');
const expect = chai.expect;

const AstNode = require('./../../src/ast/node');
const AstPosition = require('./../../src/ast/position');
const AstFragment = require('./../../src/ast/fragment');
const AstLiteral = require('./../../src/ast/literal');
const AstNumber = require('./../../src/ast/number');

describe('OpenSCAD AstNumber', () => {

    it('should create an AstNumber with the specified value', () => {
        const type = 'number';
        const value = 9;
        const number = new AstNumber(value);

        expect(number).to.be.an('object');
        expect(number).to.be.an.instanceOf(AstNode);
        expect(number).to.be.an.instanceOf(AstFragment);
        expect(number).to.be.an.instanceOf(AstLiteral);
        expect(number).to.be.an.instanceOf(AstNumber);
        expect(number).to.have.a.property('type').that.is.equal(type);
        expect(number).to.have.a.property('value').that.is.equal(value);

        number.type = 'identifier';
        number.value = 'foo';

        expect(number.type).to.be.equal(type);
        expect(number.value).to.be.equal(value);
    });

    it('should create an AstNumber with the specified value as a string', () => {
        const type = 'number';
        const value = 9;
        const number = new AstNumber("9");

        expect(number).to.be.an('object');
        expect(number).to.be.an.instanceOf(AstNode);
        expect(number).to.be.an.instanceOf(AstFragment);
        expect(number).to.be.an.instanceOf(AstLiteral);
        expect(number).to.be.an.instanceOf(AstNumber);
        expect(number).to.have.a.property('type').that.is.equal(type);
        expect(number).to.have.a.property('value').that.is.equal(value);

        number.type = 'identifier';
        number.value = 'foo';

        expect(number.type).to.be.equal(type);
        expect(number.value).to.be.equal(value);
    });

    it('should add position in an AstNumber', () => {
        const type = 'number';
        const value = 10;
        const startLine = 1;
        const startColumn = 1;
        const startOffset = 0;
        const endLine = 1;
        const endColumn = 3;
        const endOffset = 2;
        const expected = {
            type: type,
            value: value,
            start: {type: 'position', line: startLine, column: startColumn, offset: startOffset},
            end: {type: 'position', line: endLine, column: endColumn, offset: endOffset}
        };
        const number = new AstNumber(value);

        number.startAt(startLine, startColumn, startOffset);
        number.endAt(endLine, endColumn, endOffset);

        expect(number).to.be.an('object');
        expect(number).to.deep.equal(expected);
        expect(number).to.be.instanceOf(AstNumber);
        expect(number.start).to.be.instanceOf(AstPosition);
        expect(number.end).to.be.instanceOf(AstPosition);
    });

    it('should stringify an AstNumber', () => {
        const type = 'number';
        const value = 10;
        const startLine = 1;
        const startColumn = 1;
        const startOffset = 0;
        const endLine = 1;
        const endColumn = 3;
        const endOffset = 2;
        const expected = {
            type: type,
            value: value,
            start: {type: 'position', line: startLine, column: startColumn, offset: startOffset},
            end: {type: 'position', line: endLine, column: endColumn, offset: endOffset}
        };
        const number = new AstNumber(value);
        const stringified = '{"type":"' + type + '","value":' + value + ',' +
            '"start":{"type":"position","line":' + startLine + ',"column":' + startColumn + ',"offset":' + startOffset + '},' +
            '"end":{"type":"position","line":' + endLine + ',"column":' + endColumn + ',"offset":' + endOffset + '}}';

        number.startAt(startLine, startColumn, startOffset);
        number.endAt(endLine, endColumn, endOffset);

        expect(number).to.be.an('object');
        expect(number).to.deep.equal(expected);
        expect(number).to.be.instanceOf(AstNumber);
        expect(number.start).to.be.instanceOf(AstPosition);
        expect(number.end).to.be.instanceOf(AstPosition);
        expect(number + '').to.be.equal(stringified);
    });

    it('should add read-only values', () => {
        const type = 'number';
        const value = 3;
        const prop = 'an additional property';
        const number = new AstNumber(value);

        number.addProperty('myProp', prop);

        expect(number).to.be.an('object');
        expect(number).to.have.a.property('type').that.is.equal(type);
        expect(number).to.have.a.property('value').that.is.equal(value);
        expect(number).to.have.a.property('myProp').that.is.equal(prop);

        number.myProp = 'another value';

        expect(number.myProp).to.be.equal(prop);
    });

    it('should not allow to redefine existing properties', () => {
        const type = 'number';
        const value = 5;
        const number = new AstNumber(value);

        expect(number).to.be.an('object');
        expect(number).to.have.a.property('type').that.is.equal(type);
        expect(number).to.have.a.property('value').that.is.equal(value);

        expect(() => number.addProperty('type', 'identifier')).to.throw(TypeError);
        expect(() => number.addProperty('value', 'foo')).to.throw(TypeError);

        expect(number.type).to.be.equal(type);
        expect(number.value).to.be.equal(value);
    });

});
