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
 * Unit tests: AST node that represents a block comment.
 *
 * @package tests/ast
 * @author jsconan
 */

const chai = require('chai');
const expect = chai.expect;

const AstNode = require('./../../src/ast/node');
const AstPosition = require('./../../src/ast/position');
const AstFragment = require('./../../src/ast/fragment');
const AstComment = require('./../../src/ast/comment');
const AstBlockComment = require('./../../src/ast/block-comment');

describe('OpenSCAD AstBlockComment', () => {

    it('should create an AstBlockComment with the specified value (single line)', () => {
        const type = 'blockComment';
        const value = ['a comment'];
        const node = new AstBlockComment('a comment');

        expect(node).to.be.an('object');
        expect(node).to.be.an.instanceOf(AstNode);
        expect(node).to.be.an.instanceOf(AstFragment);
        expect(node).to.be.an.instanceOf(AstComment);
        expect(node).to.be.an.instanceOf(AstBlockComment);
        expect(node).to.have.a.property('type').that.is.equal(type);
        expect(node).to.have.a.property('value').that.is.deep.equal(value);
    });

    it('should create an AstBlockComment with the specified value (multi lines)', () => {
        const type = 'blockComment';
        const value = ['a', 'multi', 'line', 'comment'];
        const node = new AstBlockComment('a\r\nmulti\r\nline\r\ncomment');

        expect(node).to.be.an('object');
        expect(node).to.be.an.instanceOf(AstNode);
        expect(node).to.be.an.instanceOf(AstFragment);
        expect(node).to.be.an.instanceOf(AstComment);
        expect(node).to.be.an.instanceOf(AstBlockComment);
        expect(node).to.have.a.property('type').that.is.equal(type);
        expect(node).to.have.a.property('value').that.is.deep.equal(value);
    });

    it('should create an AstBlockComment with the specified value as a stringable', () => {
        const type = 'blockComment';
        const value = ['a comment'];
        const node = new AstBlockComment({
            value: 'a comment',
            toString: function () {
                return '' + this.value;
            }
        });

        expect(node).to.be.an('object');
        expect(node).to.be.an.instanceOf(AstNode);
        expect(node).to.be.an.instanceOf(AstFragment);
        expect(node).to.be.an.instanceOf(AstComment);
        expect(node).to.be.an.instanceOf(AstBlockComment);
        expect(node).to.have.a.property('type').that.is.equal(type);
        expect(node).to.have.a.property('value').that.is.deep.equal(value);
    });

    it('should stringify an AstBlockComment', () => {
        const type = 'blockComment';
        const value = ['a', 'multi', 'line', 'comment'];
        const startLine = 1;
        const startColumn = 1;
        const startOffset = 0;
        const endLine = 1;
        const endColumn = 10;
        const endOffset = 9;
        const expected = {
            type: type,
            value: value,
            start: {type: 'position', line: startLine, column: startColumn, offset: startOffset},
            end: {type: 'position', line: endLine, column: endColumn, offset: endOffset}
        };
        const node = new AstBlockComment('a\r\nmulti\r\nline\r\ncomment');
        const stringified = '{"type":"' + type + '","value":["a","multi","line","comment"],' +
            '"start":{"type":"position","line":' + startLine + ',"column":' + startColumn + ',"offset":' + startOffset + '},' +
            '"end":{"type":"position","line":' + endLine + ',"column":' + endColumn + ',"offset":' + endOffset + '}}';

        node.startAt(startLine, startColumn, startOffset);
        node.endAt(endLine, endColumn, endOffset);

        expect(node).to.be.an('object');
        expect(node).to.be.an.instanceOf(AstNode);
        expect(node).to.be.an.instanceOf(AstFragment);
        expect(node).to.be.an.instanceOf(AstComment);
        expect(node).to.be.an.instanceOf(AstBlockComment);
        expect(node).to.deep.equal(expected);
        expect(node.start).to.be.instanceOf(AstPosition);
        expect(node.end).to.be.instanceOf(AstPosition);
        expect(node + '').to.be.equal(stringified);
    });

});
