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
 * @package tests/ast/classes
 * @author jsconan
 */

const chai = require('chai');
const expect = chai.expect;

const AstNode = require('../../../src/ast/classes/node');
const AstPosition = require('../../../src/ast/classes/position');
const AstFragment = require('../../../src/ast/classes/fragment');
const AstLiteral = require('../../../src/ast/classes/literal');

describe('AST node: AstLiteral', () => {

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
            new AstLiteral({type: "boolean"});
        }).to.throw(TypeError);

        expect(() => {
            new AstLiteral(true);
        }).to.throw(TypeError);
    });

    it('should create an AstLiteral with the specified type', () => {
        const type = 'number';
        const node = new AstLiteral(type);

        expect(node).to.be.an('object');
        expect(node).to.be.an.instanceOf(AstNode);
        expect(node).to.be.an.instanceOf(AstFragment);
        expect(node).to.be.an.instanceOf(AstLiteral);
        expect(node).to.have.a.property('type').that.is.equal(type);
    });

    it('should create an AstLiteral with the specified value', () => {
        const type = 'number';
        const value = 9;
        const node = new AstLiteral(type, value);

        expect(node).to.be.an('object');
        expect(node).to.be.an.instanceOf(AstNode);
        expect(node).to.be.an.instanceOf(AstFragment);
        expect(node).to.be.an.instanceOf(AstLiteral);
        expect(node).to.have.a.property('type').that.is.equal(type);
        expect(node).to.have.a.property('value').that.is.equal(value);
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
        const node = new AstLiteral(type, value);
        const stringified = '{"type":"' + type + '","value":' + value + ',' +
            '"start":{"type":"position","line":' + startLine + ',"column":' + startColumn + ',"offset":' + startOffset + '},' +
            '"end":{"type":"position","line":' + endLine + ',"column":' + endColumn + ',"offset":' + endOffset + '}}';

        node.startAt(startLine, startColumn, startOffset);
        node.endAt(endLine, endColumn, endOffset);

        expect(node).to.be.an('object');
        expect(node).to.be.an.instanceOf(AstNode);
        expect(node).to.be.an.instanceOf(AstFragment);
        expect(node).to.be.an.instanceOf(AstLiteral);
        expect(node).to.deep.equal(expected);
        expect(node.start).to.be.instanceOf(AstPosition);
        expect(node.end).to.be.instanceOf(AstPosition);
        expect(node + '').to.be.equal(stringified);
    });

    it('should clone an AstLiteral', () => {
        const type = 'string';
        const value = 'foo';
        const node = (new AstLiteral(type, value)).startAt(1, 1, 0).endAt(1, 4, 3);

        const clone = node.clone();

        expect(clone).to.be.an('object');
        expect(clone).to.be.an.instanceOf(AstNode);
        expect(clone).to.be.an.instanceOf(AstFragment);
        expect(clone).to.be.an.instanceOf(AstLiteral);
        expect(clone).to.not.be.equal(node);
        expect(clone).to.be.deep.equal(node);
    });

    it('should clone an AstLiteral with the provided properties', () => {
        const type = 'string';
        const value = 'foo';
        const newValue = 'bar';
        const node = (new AstLiteral(type, value)).startAt(1, 1, 0).endAt(1, 4, 3);

        const clone = node.clone({
            type: 'number',         // should not be allowed
            value: newValue
        });

        expect(clone).to.be.an('object');
        expect(clone).to.be.an.instanceOf(AstNode);
        expect(clone).to.be.an.instanceOf(AstFragment);
        expect(clone).to.be.an.instanceOf(AstLiteral);
        expect(clone).to.not.be.equal(node);
        expect(clone).to.be.not.deep.equal(node);
        expect(clone).to.have.a.property('type').that.is.equal(node.type);
        expect(clone).to.have.a.property('value').that.is.equal(newValue);
        expect(clone).to.have.a.property('start').that.is.equal(node.start);
        expect(clone).to.have.a.property('end').that.is.equal(node.end);
    });

});
