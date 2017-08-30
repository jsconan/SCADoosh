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
 * @package tests/ast
 * @author jsconan
 */

const chai = require('chai');
const expect = chai.expect;

const AstNode = require('./../../src/ast/node');
const AstPosition = require('./../../src/ast/position');
const AstFragment = require('./../../src/ast/fragment');
const AstLiteral = require('./../../src/ast/literal');
const AstString = require('./../../src/ast/string');

describe('OpenSCAD AstString', () => {

    it('should create an AstString with the specified value', () => {
        const type = 'string';
        const value = 'a string';
        const number = new AstString(value);

        expect(number).to.be.an('object');
        expect(number).to.be.an.instanceOf(AstNode);
        expect(number).to.be.an.instanceOf(AstFragment);
        expect(number).to.be.an.instanceOf(AstLiteral);
        expect(number).to.be.an.instanceOf(AstString);
        expect(number).to.have.a.property('type').that.is.equal(type);
        expect(number).to.have.a.property('value').that.is.equal(value);
    });

    it('should create an AstString with the specified value as a stringable', () => {
        const type = 'string';
        const value = 'a string';
        const number = new AstString({
            value: 'a string',
            toString: function () {
                return '' + this.value;
            }
        });

        expect(number).to.be.an('object');
        expect(number).to.be.an.instanceOf(AstNode);
        expect(number).to.be.an.instanceOf(AstFragment);
        expect(number).to.be.an.instanceOf(AstLiteral);
        expect(number).to.be.an.instanceOf(AstString);
        expect(number).to.have.a.property('type').that.is.equal(type);
        expect(number).to.have.a.property('value').that.is.equal(value);
    });

    it('should stringify an AstString', () => {
        const type = 'string';
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
            start: {type: 'position', line: startLine, column: startColumn, offset: startOffset},
            end: {type: 'position', line: endLine, column: endColumn, offset: endOffset}
        };
        const number = new AstString(value);
        const stringified = '{"type":"' + type + '","value":"' + value + '",' +
            '"start":{"type":"position","line":' + startLine + ',"column":' + startColumn + ',"offset":' + startOffset + '},' +
            '"end":{"type":"position","line":' + endLine + ',"column":' + endColumn + ',"offset":' + endOffset + '}}';

        number.startAt(startLine, startColumn, startOffset);
        number.endAt(endLine, endColumn, endOffset);

        expect(number).to.be.an('object');
        expect(number).to.be.an.instanceOf(AstNode);
        expect(number).to.be.an.instanceOf(AstFragment);
        expect(number).to.be.an.instanceOf(AstLiteral);
        expect(number).to.be.an.instanceOf(AstString);
        expect(number).to.deep.equal(expected);
        expect(number.start).to.be.instanceOf(AstPosition);
        expect(number.end).to.be.instanceOf(AstPosition);
        expect(number + '').to.be.equal(stringified);
    });

});
