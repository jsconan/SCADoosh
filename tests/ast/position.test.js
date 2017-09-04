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

describe('AST node: AstPosition', () => {

    it('should create an AstPosition with the specified values', () => {
        const line = 1;
        const column = 2;
        const offset = 1;
        const expected = {type: 'position', line: line, column: column, offset: offset};
        const node = new AstPosition(line, column, offset);

        expect(node).to.be.an('object');
        expect(node).to.be.an.instanceOf(AstNode);
        expect(node).to.be.an.instanceOf(AstPosition);
        expect(node).to.be.deep.equal(expected);
    });

    it('should accept line or column as strings', () => {
        const line = "1";
        const column = "2";
        const offset = "1";
        const expected = {type: 'position', line: 1, column: 2, offset: 1};
        const node = new AstPosition(line, column, offset);

        expect(node).to.be.an('object');
        expect(node).to.be.an.instanceOf(AstNode);
        expect(node).to.be.an.instanceOf(AstPosition);
        expect(node).to.be.deep.equal(expected);
    });

    it('should not allow to set NaN values', () => {
        expect(() => new AstPosition(parseFloat('foo'), 2, 1)).to.throw(TypeError);
        expect(() => new AstPosition(1, parseFloat('foo'), 0)).to.throw(TypeError);
        expect(() => new AstPosition(1, 1, parseFloat('foo'))).to.throw(TypeError);
    });

    it('should not allow to set 0 in line or column', () => {
        expect(() => new AstPosition(0, 2, 1)).to.throw(TypeError);
        expect(() => new AstPosition(1, 0, 0)).to.throw(TypeError);
    });

    it('should not allow to set negative value', () => {
        expect(() => new AstPosition(-1, 2, 0)).to.throw(TypeError);
        expect(() => new AstPosition(1, -2, 0)).to.throw(TypeError);
        expect(() => new AstPosition(1, 2, -1)).to.throw(TypeError);
    });

    it('should not allow to redefine existing properties', () => {
        const line = 1;
        const column = 2;
        const offset = 1;
        const expected = {type: 'position', line: line, column: column, offset: offset};
        const node = new AstPosition(line, column, offset);

        expect(node).to.be.an('object');
        expect(node).to.be.an.instanceOf(AstNode);
        expect(node).to.be.an.instanceOf(AstPosition);
        expect(node).to.be.deep.equal(expected);

        expect(() => node.addProperty('type', 'identifier')).to.throw(TypeError);
        expect(() => node.addProperty('line', 20)).to.throw(TypeError);
        expect(() => node.addProperty('column', 19)).to.throw(TypeError);
        expect(() => node.addProperty('offset', 50)).to.throw(TypeError);

        expect(node.type).to.be.equal('position');
        expect(node.line).to.be.equal(line);
        expect(node.column).to.be.equal(column);
        expect(node.offset).to.be.equal(offset);
    });

    it('should not allow to change values', () => {
        const line = 1;
        const column = 2;
        const offset = 1;
        const expected = {type: 'position', line: line, column: column, offset: offset};
        const node = new AstPosition(line, column, offset);

        expect(node).to.be.an('object');
        expect(node).to.be.an.instanceOf(AstNode);
        expect(node).to.be.an.instanceOf(AstPosition);
        expect(node).to.be.deep.equal(expected);

        node.line = 10;
        node.column = 20;
        node.offset = 50;

        expect(node).to.be.deep.equal(expected);
    });

    it('should stringify an AstPosition', () => {
        const line = 1;
        const column = 2;
        const offset = 1;
        const expected = {type: 'position', line: line, column: column, offset: offset};
        const stringified = '{"type":"position","line":' + line + ',"column":' + column + ',"offset":' + offset + '}';
        const node = new AstPosition(line, column, offset);

        expect(node).to.be.an('object');
        expect(node).to.be.an.instanceOf(AstNode);
        expect(node).to.be.an.instanceOf(AstPosition);
        expect(node).to.be.deep.equal(expected);
        expect(node + '').to.be.equal(stringified);
    });

    it('should clone an AstPosition', () => {
        const line = 1;
        const column = 2;
        const offset = 0;
        const node = new AstPosition(line, column, offset);

        const clone = node.clone();

        expect(clone).to.be.an('object');
        expect(clone).to.be.an.instanceOf(AstNode);
        expect(clone).to.be.an.instanceOf(AstPosition);
        expect(clone).to.not.be.equal(node);
        expect(clone).to.be.deep.equal(node);
    });

    it('should clone an AstPosition with the provided properties', () => {
        const line = 1;
        const column = 2;
        const offset = 0;
        const newLine = 2;
        const newColumn = 3;
        const newOffset = 1;
        const node = new AstPosition(line, column, offset);

        const clone = node.clone({
            type: 'number',         // should not be allowed
            line: newLine,
            column: '' + newColumn,
            offset: newOffset
        });

        expect(clone).to.be.an('object');
        expect(clone).to.be.an.instanceOf(AstNode);
        expect(clone).to.be.an.instanceOf(AstPosition);
        expect(clone).to.not.be.equal(node);
        expect(clone).to.be.not.deep.equal(node);
        expect(clone).to.have.a.property('type').that.is.equal(node.type);
        expect(clone).to.have.a.property('line').that.is.equal(newLine);
        expect(clone).to.have.a.property('column').that.is.equal(newColumn);
        expect(clone).to.have.a.property('offset').that.is.equal(newOffset);
    });

    it('should not allow to clone and set 0 in line or column', () => {
        const node = new AstPosition(1, 1, 0);
        expect(() => node.clone({line: 0})).to.throw(TypeError);
        expect(() => node.clone({column: 0})).to.throw(TypeError);
    });

    it('should not allow to clone and set negative value', () => {
        const node = new AstPosition(1, 1, 0);
        expect(() => node.clone({line: -1})).to.throw(TypeError);
        expect(() => node.clone({column: -2})).to.throw(TypeError);
        expect(() => node.clone({offset: -1})).to.throw(TypeError);
    });

    it('should not allow to clone and set NaN value', () => {
        const node = new AstPosition(1, 1, 0);
        expect(() => node.clone({line: parseFloat('foo')})).to.throw(TypeError);
        expect(() => node.clone({column: parseFloat('foo')})).to.throw(TypeError);
        expect(() => node.clone({offset: parseFloat('foo')})).to.throw(TypeError);
    });

});
