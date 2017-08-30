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
        const fragment = new AstFragment(type);

        expect(fragment).to.be.an('object');
        expect(fragment).to.be.an.instanceOf(AstNode);
        expect(fragment).to.have.a.property('type').that.is.equal(type);

        fragment.type = 'identifier';

        expect(fragment.type).to.be.equal(type);
    });

    it('should create an AstFragment with the specified properties', () => {
        const type = 'literal';
        const position = 10;
        const offset = 9;
        const fragment = new AstFragment({
            type: type,
            position: position,
            offset: offset
        });

        expect(fragment).to.be.an('object');
        expect(fragment).to.have.a.property('type').that.is.equal(type);
        expect(fragment).to.have.a.property('position').that.is.equal(position);
        expect(fragment).to.have.a.property('offset').that.is.equal(offset);

        fragment.type = 'identifier';
        fragment.position = 20;
        fragment.offset = 19;

        expect(fragment.type).to.be.equal(type);
        expect(fragment.position).to.be.equal(position);
        expect(fragment.offset).to.be.equal(offset);
    });

    it('should create an AstFragment with the specified type and properties', () => {
        const type = 'literal';
        const position = 10;
        const offset = 9;
        const fragment = new AstFragment(type, {
            position: position,
            offset: offset
        });

        expect(fragment).to.be.an('object');
        expect(fragment).to.have.a.property('type').that.is.equal(type);
        expect(fragment).to.have.a.property('position').that.is.equal(position);
        expect(fragment).to.have.a.property('offset').that.is.equal(offset);

        fragment.type = 'identifier';
        fragment.position = 20;
        fragment.offset = 19;

        expect(fragment.type).to.be.equal(type);
        expect(fragment.position).to.be.equal(position);
        expect(fragment.offset).to.be.equal(offset);
    });

    it('should add position in an AstFragment', () => {
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
        const fragment = new AstFragment(type);

        fragment.startAt(startLine, startColumn, startOffset);
        fragment.endAt(endLine, endColumn, endOffset);

        expect(fragment).to.be.an('object');
        expect(fragment).to.deep.equal(expected);
        expect(fragment.start).to.be.instanceOf(AstPosition);
        expect(fragment.end).to.be.instanceOf(AstPosition);
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
        const fragment = new AstFragment(type);
        const stringified = '{"type":"' + type + '",' +
            '"start":{"type":"position","line":' + startLine + ',"column":' + startColumn + ',"offset":' + startOffset + '},' +
            '"end":{"type":"position","line":' + endLine + ',"column":' + endColumn + ',"offset":' + endOffset + '}}';

        fragment.startAt(startLine, startColumn, startOffset);
        fragment.endAt(endLine, endColumn, endOffset);

        expect(fragment).to.be.an('object');
        expect(fragment).to.deep.equal(expected);
        expect(fragment + '').to.be.equal(stringified);
    });

    it('should add read-only values', () => {
        const type = 'literal';
        const prop = 'an additional property';
        const fragment = new AstFragment(type);

        fragment.addProperty('myProp', prop);

        expect(fragment).to.be.an('object');
        expect(fragment).to.have.a.property('type').that.is.equal(type);
        expect(fragment).to.have.a.property('myProp').that.is.equal(prop);

        fragment.myProp = 'another value';

        expect(fragment.myProp).to.be.equal(prop);
    });

    it('should not allow to redefine existing properties', () => {
        const type = 'literal';
        const position = 10;
        const offset = 9;
        const fragment = new AstFragment({
            type: type,
            position: position,
            offset: offset
        });

        expect(fragment).to.be.an('object');
        expect(fragment).to.have.a.property('type').that.is.equal(type);
        expect(fragment).to.have.a.property('position').that.is.equal(position);
        expect(fragment).to.have.a.property('offset').that.is.equal(offset);

        expect(() => fragment.addProperty('type', 'identifier')).to.throw(TypeError);
        expect(() => fragment.addProperty('position', 20)).to.throw(TypeError);
        expect(() => fragment.addProperty('offset', 19)).to.throw(TypeError);

        expect(fragment.type).to.be.equal(type);
        expect(fragment.position).to.be.equal(position);
        expect(fragment.offset).to.be.equal(offset);
    });

});
