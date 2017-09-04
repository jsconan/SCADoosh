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
 * Unit tests: AST node that represents a use statement.
 *
 * @package tests/ast
 * @author jsconan
 */

const chai = require('chai');
const expect = chai.expect;

const AstNode = require('./../../src/ast/node');
const AstPosition = require('./../../src/ast/position');
const AstFragment = require('./../../src/ast/fragment');
const AstPath = require('./../../src/ast/path');
const AstUse = require('./../../src/ast/use');

describe('OpenSCAD AstUse', () => {

    it('should create an AstUse', () => {
        const type = 'use';
        const path = new AstPath('./path/to/library.scad');
        const node = new AstUse(path);

        expect(node).to.be.an('object');
        expect(node).to.be.an.instanceOf(AstNode);
        expect(node).to.be.an.instanceOf(AstFragment);
        expect(node).to.be.an.instanceOf(AstUse);
        expect(node.path).to.be.instanceOf(AstPath);
        expect(node).to.have.a.property('type').that.is.equal(type);
        expect(node).to.have.a.property('path').that.is.equal(path);
    });

    it('should throw a TypeError if the path is not an AstPath', () => {
        expect(() => new AstUse(new AstNode('foo'))).to.throw(TypeError);
        expect(() => new AstUse({})).to.throw(TypeError);
    });

    it('should stringify an AstUse', () => {
        const type = 'use';
        const path = new AstPath('./path/to/library.scad');
        const startLine = 1;
        const startColumn = 1;
        const startOffset = 0;
        const endLine = 1;
        const endColumn = 32;
        const endOffset = 31;
        const expected = {
            type: type,
            path: {type: 'path', value: './path/to/library.scad'},
            start: {type: 'position', line: startLine, column: startColumn, offset: startOffset},
            end: {type: 'position', line: endLine, column: endColumn, offset: endOffset}
        };
        const node = new AstUse(path);
        const stringified = '{"type":"' + type + '",' +
            '"path":{"type":"path","value":"./path/to/library.scad"},' +
            '"start":{"type":"position","line":' + startLine + ',"column":' + startColumn + ',"offset":' + startOffset + '},' +
            '"end":{"type":"position","line":' + endLine + ',"column":' + endColumn + ',"offset":' + endOffset + '}}';

        node.startAt(startLine, startColumn, startOffset);
        node.endAt(endLine, endColumn, endOffset);

        expect(node).to.be.an('object');
        expect(node).to.be.an.instanceOf(AstNode);
        expect(node).to.be.an.instanceOf(AstFragment);
        expect(node).to.be.an.instanceOf(AstUse);
        expect(node).to.deep.equal(expected);
        expect(node.path).to.be.instanceOf(AstPath);
        expect(node.start).to.be.instanceOf(AstPosition);
        expect(node.end).to.be.instanceOf(AstPosition);
        expect(node + '').to.be.equal(stringified);
    });

    it('should clone an AstUse', () => {
        const node = (new AstUse(new AstPath('./path/to/library.scad'))).startAt(1, 1, 0).endAt(1, 32, 31);

        const clone = node.clone();

        expect(clone).to.be.an('object');
        expect(clone).to.be.an.instanceOf(AstNode);
        expect(clone).to.be.an.instanceOf(AstFragment);
        expect(clone).to.be.an.instanceOf(AstUse);
        expect(clone).to.not.be.equal(node);
        expect(clone).to.be.deep.equal(node);
    });

    it('should clone an AstUse with the provided properties', () => {
        const path = new AstPath('./path/to/library.scad');
        const newPath = new AstPath('./path/to/another/library.scad');

        const node = (new AstUse(path)).startAt(1, 1, 0).endAt(1, 32, 31);

        const clone = node.clone({
            type: 'number',         // should not be allowed
            path: newPath,
        });

        expect(clone).to.be.an('object');
        expect(clone).to.be.an.instanceOf(AstNode);
        expect(clone).to.be.an.instanceOf(AstFragment);
        expect(clone).to.be.an.instanceOf(AstUse);
        expect(clone).to.not.be.equal(node);
        expect(clone).to.be.not.deep.equal(node);
        expect(clone).to.have.a.property('type').that.is.equal(node.type);
        expect(clone).to.have.a.property('path').that.is.equal(newPath);
        expect(clone).to.have.a.property('start').that.is.equal(node.start);
        expect(clone).to.have.a.property('end').that.is.equal(node.end);
    });

    it('should throw a TypeError if one the path is not a valid AstPath when cloning', () => {
        const node = (new AstUse(new AstPath('./path/to/library.scad'))).startAt(1, 1, 0).endAt(1, 32, 31);
        expect(() => node.clone({path: new AstNode('foo')})).to.throw(TypeError);
        expect(() => node.clone({path: {}})).to.throw(TypeError);
    });

});
