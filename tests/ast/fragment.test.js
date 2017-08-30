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
 * Unit tests: AST node that represents a language fragment.
 *
 * @package tests/ast
 * @author jsconan
 */

const chai = require('chai');
const expect = chai.expect;

const AstNode = require('./../../src/ast/node');
const AstPosition = require('./../../src/ast/position');
const AstFragment = require('./../../src/ast/fragment');

describe('OpenSCAD AstFragment', () => {

    it('should throw a TypeError if the type is missing', () => {
        expect(() => {
            new AstFragment();
        }).to.throw(TypeError);

        expect(() => {
            new AstFragment("");
        }).to.throw(TypeError);
    });

    it('should throw a TypeError if the type is not a string', () => {
        expect(() => {
            new AstFragment({myProp: "a property"});
        }).to.throw(TypeError);

        expect(() => {
            new AstFragment(true);
        }).to.throw(TypeError);
    });

    it('should create an AstFragment with the specified type', () => {
        const type = 'literal';
        const node = new AstFragment(type);

        expect(node).to.be.an('object');
        expect(node).to.be.an.instanceOf(AstNode);
        expect(node).to.be.an.instanceOf(AstFragment);
        expect(node).to.have.a.property('type').that.is.equal(type);
    });

    it('should create an AstFragment with the specified properties', () => {
        const type = 'literal';
        const position = 10;
        const offset = 9;
        const node = new AstFragment({
            type: type,
            position: position,
            offset: offset
        });

        expect(node).to.be.an('object');
        expect(node).to.be.an.instanceOf(AstNode);
        expect(node).to.be.an.instanceOf(AstFragment);
        expect(node).to.have.a.property('type').that.is.equal(type);
        expect(node).to.have.a.property('position').that.is.equal(position);
        expect(node).to.have.a.property('offset').that.is.equal(offset);
    });

    it('should create an AstFragment with the specified type and properties', () => {
        const type = 'literal';
        const position = 10;
        const offset = 9;
        const node = new AstFragment(type, {
            position: position,
            offset: offset
        });

        expect(node).to.be.an('object');
        expect(node).to.be.an.instanceOf(AstNode);
        expect(node).to.be.an.instanceOf(AstFragment);
        expect(node).to.have.a.property('type').that.is.equal(type);
        expect(node).to.have.a.property('position').that.is.equal(position);
        expect(node).to.have.a.property('offset').that.is.equal(offset);
    });

    it('should add a position in an AstFragment', () => {
        const type = 'literal';
        const startLine = 1;
        const startColumn = 1;
        const startOffset = 0;
        const endLine = 2;
        const endColumn = 1;
        const endOffset = 10;
        const expected = {
            type: type,
            start: {type: 'position', line: startLine, column: startColumn, offset: startOffset},
            end: {type: 'position', line: endLine, column: endColumn, offset: endOffset}
        };
        const node = new AstFragment(type);

        node.startAt(startLine, startColumn, startOffset);
        node.endAt(endLine, endColumn, endOffset);

        expect(node).to.be.an('object');
        expect(node).to.be.an.instanceOf(AstNode);
        expect(node).to.be.an.instanceOf(AstFragment);
        expect(node).to.deep.equal(expected);
        expect(node.start).to.be.instanceOf(AstPosition);
        expect(node.end).to.be.instanceOf(AstPosition);
    });

    it('should stringify an AstFragment', () => {
        const type = 'literal';
        const startLine = 1;
        const startColumn = 1;
        const startOffset = 0;
        const endLine = 2;
        const endColumn = 1;
        const endOffset = 10;
        const expected = {
            type: type,
            start: {type: 'position', line: startLine, column: startColumn, offset: startOffset},
            end: {type: 'position', line: endLine, column: endColumn, offset: endOffset}
        };
        const node = new AstFragment(type);
        const stringified = '{"type":"' + type + '",' +
            '"start":{"type":"position","line":' + startLine + ',"column":' + startColumn + ',"offset":' + startOffset + '},' +
            '"end":{"type":"position","line":' + endLine + ',"column":' + endColumn + ',"offset":' + endOffset + '}}';

        node.startAt(startLine, startColumn, startOffset);
        node.endAt(endLine, endColumn, endOffset);

        expect(node).to.be.an('object');
        expect(node).to.be.an.instanceOf(AstNode);
        expect(node).to.be.an.instanceOf(AstFragment);
        expect(node).to.deep.equal(expected);
        expect(node + '').to.be.equal(stringified);
    });

});
