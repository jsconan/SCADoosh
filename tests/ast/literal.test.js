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
 * Unit tests: AST node that represents a language literal.
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

describe('OpenSCAD AstLiteral', () => {

    it('should throw a TypeError if the type is missing', () => {
        expect(() => {
            new AstLiteral();
        }).to.throw(TypeError);

        expect(() => {
            new AstLiteral("");
        }).to.throw(TypeError);
    });

    it('should throw a TypeError if the type is not a string', () => {
        expect(() => {
            new AstLiteral({myProp: "a property"});
        }).to.throw(TypeError);

        expect(() => {
            new AstLiteral(true);
        }).to.throw(TypeError);
    });

    it('should create an AstLiteral with the specified type', () => {
        const type = 'number';
        const literal = new AstLiteral(type);

        expect(literal).to.be.an('object');
        expect(literal).to.be.an.instanceOf(AstNode);
        expect(literal).to.be.an.instanceOf(AstFragment);
        expect(literal).to.be.an.instanceOf(AstLiteral);
        expect(literal).to.have.a.property('type').that.is.equal(type);

        literal.type = 'identifier';

        expect(literal.type).to.be.equal(type);
    });

    it('should create an AstLiteral with the specified value', () => {
        const type = 'number';
        const value = 9;
        const literal = new AstLiteral(type, value);

        expect(literal).to.be.an('object');
        expect(literal).to.have.a.property('type').that.is.equal(type);
        expect(literal).to.have.a.property('value').that.is.equal(value);

        literal.type = 'identifier';
        literal.value = 'foo';

        expect(literal.type).to.be.equal(type);
        expect(literal.value).to.be.equal(value);
    });

    it('should add position in an AstLiteral', () => {
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
        const literal = new AstLiteral(type, value);

        literal.startAt(startLine, startColumn, startOffset);
        literal.endAt(endLine, endColumn, endOffset);

        expect(literal).to.be.an('object');
        expect(literal).to.deep.equal(expected);
        expect(literal.start).to.be.instanceOf(AstPosition);
        expect(literal.end).to.be.instanceOf(AstPosition);
    });

    it('should stringify an AstLiteral', () => {
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
        const literal = new AstLiteral(type, value);
        const stringified = '{"type":"' + type + '","value":' + value + ',' +
            '"start":{"type":"position","line":' + startLine + ',"column":' + startColumn + ',"offset":' + startOffset + '},' +
            '"end":{"type":"position","line":' + endLine + ',"column":' + endColumn + ',"offset":' + endOffset + '}}';

        literal.startAt(startLine, startColumn, startOffset);
        literal.endAt(endLine, endColumn, endOffset);

        expect(literal).to.be.an('object');
        expect(literal).to.deep.equal(expected);
        expect(literal + '').to.be.equal(stringified);
    });

    it('should add read-only values', () => {
        const type = 'number';
        const value = 3;
        const prop = 'an additional property';
        const literal = new AstLiteral(type, value);

        literal.addProperty('myProp', prop);

        expect(literal).to.be.an('object');
        expect(literal).to.have.a.property('type').that.is.equal(type);
        expect(literal).to.have.a.property('value').that.is.equal(value);
        expect(literal).to.have.a.property('myProp').that.is.equal(prop);

        literal.myProp = 'another value';

        expect(literal.myProp).to.be.equal(prop);
    });

    it('should not allow to redefine existing properties', () => {
        const type = 'boolean';
        const value = true;
        const literal = new AstLiteral(type, value);

        expect(literal).to.be.an('object');
        expect(literal).to.have.a.property('type').that.is.equal(type);
        expect(literal).to.have.a.property('value').that.is.equal(value);

        expect(() => literal.addProperty('type', 'identifier')).to.throw(TypeError);
        expect(() => literal.addProperty('value', 'foo')).to.throw(TypeError);

        expect(literal.type).to.be.equal(type);
        expect(literal.value).to.be.equal(value);
    });

});
