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
 * Unit tests: AST node that represents a position in the source code.
 *
 * @package tests/ast
 * @author jsconan
 */

const chai = require('chai');
const expect = chai.expect;

const AstNode = require('./../../src/ast/node');
const AstPosition = require('./../../src/ast/position');

describe('OpenSCAD AstPosition', () => {

    it('should create an AstPosition with the specified values', () => {
        const line = 1;
        const column = 2;
        const offset = 1;
        const expected = {type: 'position', line: line, column: column, offset: offset};
        const position = new AstPosition(line, column, offset);

        expect(position).to.be.an('object');
        expect(position).to.be.an.instanceOf(AstNode);
        expect(position).to.be.an.instanceOf(AstPosition);
        expect(position).to.be.deep.equal(expected);
    });

    it('should accept line or column as strings', () => {
        const line = "1";
        const column = "2";
        const offset = "1";
        const expected = {type: 'position', line: 1, column: 2, offset: 1};
        const position = new AstPosition(line, column, offset);

        expect(position).to.be.an('object');
        expect(position).to.be.an.instanceOf(AstNode);
        expect(position).to.be.an.instanceOf(AstPosition);
        expect(position).to.be.deep.equal(expected);
    });

    it('should not allow to set 0 in line or column', () => {
        expect(() => AstPosition(0, 2, 1)).to.throw(TypeError);
        expect(() => AstPosition(1, 0, 0)).to.throw(TypeError);
    });

    it('should not allow to set negative value', () => {
        expect(() => AstPosition(-1, 2, 0)).to.throw(TypeError);
        expect(() => AstPosition(1, -2, 0)).to.throw(TypeError);
        expect(() => AstPosition(1, 2, -1)).to.throw(TypeError);
    });

    it('should not allow to redefine existing properties', () => {
        const line = 1;
        const column = 2;
        const offset = 1;
        const expected = {type: 'position', line: line, column: column, offset: offset};
        const position = new AstPosition(line, column, offset);

        expect(position).to.be.an('object');
        expect(position).to.be.an.instanceOf(AstNode);
        expect(position).to.be.an.instanceOf(AstPosition);
        expect(position).to.be.deep.equal(expected);

        expect(() => position.addProperty('type', 'identifier')).to.throw(TypeError);
        expect(() => position.addProperty('line', 20)).to.throw(TypeError);
        expect(() => position.addProperty('column', 19)).to.throw(TypeError);
        expect(() => position.addProperty('offset', 50)).to.throw(TypeError);

        expect(position.type).to.be.equal('position');
        expect(position.line).to.be.equal(line);
        expect(position.column).to.be.equal(column);
        expect(position.offset).to.be.equal(offset);
    });

    it('should not allow to change values', () => {
        const line = 1;
        const column = 2;
        const offset = 1;
        const expected = {type: 'position', line: line, column: column, offset: offset};
        const position = new AstPosition(line, column, offset);

        expect(position).to.be.an('object');
        expect(position).to.be.an.instanceOf(AstNode);
        expect(position).to.be.an.instanceOf(AstPosition);
        expect(position).to.be.deep.equal(expected);

        position.line = 10;
        position.column = 20;
        position.offset = 50;

        expect(position).to.be.deep.equal(expected);
    });

    it('should stringify an AstPosition', () => {
        const line = 1;
        const column = 2;
        const offset = 1;
        const expected = {type: 'position', line: line, column: column, offset: offset};
        const stringified = '{"type":"position","line":' + line + ',"column":' + column + ',"offset":' + offset + '}';
        const position = new AstPosition(line, column, offset);

        expect(position).to.be.an('object');
        expect(position).to.be.an.instanceOf(AstNode);
        expect(position).to.be.an.instanceOf(AstPosition);
        expect(position).to.be.deep.equal(expected);
        expect(position + '').to.be.equal(stringified);
    });

});
