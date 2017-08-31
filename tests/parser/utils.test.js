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
 * Unit tests: Parser utils.
 *
 * @package tests/parser
 * @author jsconan
 */

const chai = require('chai');
const expect = chai.expect;

const utils = require('./../../src/parser/utils');
const ast = require('./../../src/ast/ast');

chai.use(require('chai-json-schema'));

describe('Parser utils', () => {

    describe('tokenStart', () => {

        it('should set the start position in the provided node', () => {
            const token = {
                value: 'foo',
                line: 2,
                col: 7,
                offset: 12
            };
            const node = new ast.nodes.AstString(token.value);
            const ret = utils.tokenStart(token, node);

            expect(ret).to.be.equal(node);
            expect(node).to.have.property('start');
            expect(node.start).to.be.an.instanceOf(ast.nodes.AstPosition);
            expect(node.start.line).to.be.equal(token.line);
            expect(node.start.column).to.be.equal(token.col);
            expect(node.start.offset).to.be.equal(token.offset);
        });

        it('should throw a TypeError if the provided node is not compatible', () => {
            const token = {
                value: 'foo',
                line: 2,
                col: 7,
                offset: 12
            };
            expect(() => utils.tokenStart(token)).to.throw(TypeError);
            expect(() => utils.tokenStart(token, {})).to.throw(TypeError);
            expect(() => utils.tokenStart(token, new ast.nodes.AstPosition())).to.throw(TypeError);
        });

    });

    describe('tokenEnd', () => {

        it('should set the end position in the provided node (single line)', () => {
            const token = {
                value: 'foo',
                line: 2,
                col: 7,
                offset: 12
            };
            const node = new ast.nodes.AstString(token.value);
            const ret = utils.tokenEnd(token, node);

            expect(ret).to.be.equal(node);
            expect(node).to.have.property('end');
            expect(node.end).to.be.an.instanceOf(ast.nodes.AstPosition);
            expect(node.end.line).to.be.equal(token.line);
            expect(node.end.column).to.be.equal(token.col + token.value.length);
            expect(node.end.offset).to.be.equal(token.offset + token.value.length);
        });

        it('should set the end position in the provided node (multi lines)', () => {
            const token = {
                value: '\nfoo\nbar',
                line: 2,
                col: 7,
                offset: 12
            };
            const node = new ast.nodes.AstString(token.value);
            const ret = utils.tokenEnd(token, node);

            expect(ret).to.be.equal(node);
            expect(node).to.have.property('end');
            expect(node.end).to.be.an.instanceOf(ast.nodes.AstPosition);
            expect(node.end.line).to.be.equal(token.line + 2);
            expect(node.end.column).to.be.equal(4);
            expect(node.end.offset).to.be.equal(token.offset + token.value.length);
        });

        it('should throw a TypeError if the provided node is not compatible', () => {
            const token = {
                value: 'foo',
                line: 2,
                col: 7,
                offset: 12
            };
            expect(() => utils.tokenEnd(token)).to.throw(TypeError);
            expect(() => utils.tokenEnd(token, {})).to.throw(TypeError);
            expect(() => utils.tokenEnd(token, new ast.nodes.AstPosition())).to.throw(TypeError);
        });

    });

    describe('terminal', () => {

        it('should create the node using the provided factory name and set the position (single line)', () => {
            const token = {
                value: 'foo',
                line: 2,
                col: 7,
                offset: 12
            };
            const node = utils.terminal(token, token.value, 'string');

            expect(node).to.be.an.instanceOf(ast.nodes.AstString);
            expect(node).to.have.property('start');
            expect(node.start).to.be.an.instanceOf(ast.nodes.AstPosition);
            expect(node.start.line).to.be.equal(token.line);
            expect(node.start.column).to.be.equal(token.col);
            expect(node.start.offset).to.be.equal(token.offset);
            expect(node).to.have.property('end');
            expect(node.end).to.be.an.instanceOf(ast.nodes.AstPosition);
            expect(node.end.line).to.be.equal(token.line);
            expect(node.end.column).to.be.equal(token.col + token.value.length);
            expect(node.end.offset).to.be.equal(token.offset + token.value.length);
        });

        it('should create the node using the provided class name and set the position (single line)', () => {
            const token = {
                value: 'foo',
                line: 2,
                col: 7,
                offset: 12
            };
            const node = utils.terminal(token, token.value, 'AstString');

            expect(node).to.be.an.instanceOf(ast.nodes.AstString);
            expect(node).to.have.property('start');
            expect(node.start).to.be.an.instanceOf(ast.nodes.AstPosition);
            expect(node.start.line).to.be.equal(token.line);
            expect(node.start.column).to.be.equal(token.col);
            expect(node.start.offset).to.be.equal(token.offset);
            expect(node).to.have.property('end');
            expect(node.end).to.be.an.instanceOf(ast.nodes.AstPosition);
            expect(node.end.line).to.be.equal(token.line);
            expect(node.end.column).to.be.equal(token.col + token.value.length);
            expect(node.end.offset).to.be.equal(token.offset + token.value.length);
        });

        it('should create the node using the provided class and set the position (single line)', () => {
            const token = {
                value: 'foo',
                line: 2,
                col: 7,
                offset: 12
            };
            const node = utils.terminal(token, token.value, ast.nodes.AstString);

            expect(node).to.be.an.instanceOf(ast.nodes.AstString);
            expect(node).to.have.property('start');
            expect(node.start).to.be.an.instanceOf(ast.nodes.AstPosition);
            expect(node.start.line).to.be.equal(token.line);
            expect(node.start.column).to.be.equal(token.col);
            expect(node.start.offset).to.be.equal(token.offset);
            expect(node).to.have.property('end');
            expect(node.end).to.be.an.instanceOf(ast.nodes.AstPosition);
            expect(node.end.line).to.be.equal(token.line);
            expect(node.end.column).to.be.equal(token.col + token.value.length);
            expect(node.end.offset).to.be.equal(token.offset + token.value.length);
        });

        it('should create the node using the provided class name and set the position (multi lines)', () => {
            const token = {
                value: '\nfoo\nbar',
                line: 2,
                col: 7,
                offset: 12
            };
            const node = utils.terminal(token, token.value, 'AstString');

            expect(node).to.be.an.instanceOf(ast.nodes.AstString);
            expect(node).to.have.property('start');
            expect(node.start).to.be.an.instanceOf(ast.nodes.AstPosition);
            expect(node.start.line).to.be.equal(token.line);
            expect(node.start.column).to.be.equal(token.col);
            expect(node.start.offset).to.be.equal(token.offset);
            expect(node).to.have.property('end');
            expect(node.end).to.be.an.instanceOf(ast.nodes.AstPosition);
            expect(node.end.line).to.be.equal(token.line + 2);
            expect(node.end.column).to.be.equal(4);
            expect(node.end.offset).to.be.equal(token.offset + token.value.length);
        });

        it('should create the node using the provided factory name and set the position (multi lines)', () => {
            const token = {
                value: '\nfoo\nbar',
                line: 2,
                col: 7,
                offset: 12
            };
            const node = utils.terminal(token, token.value, 'string');

            expect(node).to.be.an.instanceOf(ast.nodes.AstString);
            expect(node).to.have.property('start');
            expect(node.start).to.be.an.instanceOf(ast.nodes.AstPosition);
            expect(node.start.line).to.be.equal(token.line);
            expect(node.start.column).to.be.equal(token.col);
            expect(node.start.offset).to.be.equal(token.offset);
            expect(node).to.have.property('end');
            expect(node.end).to.be.an.instanceOf(ast.nodes.AstPosition);
            expect(node.end.line).to.be.equal(token.line + 2);
            expect(node.end.column).to.be.equal(4);
            expect(node.end.offset).to.be.equal(token.offset + token.value.length);
        });

        it('should create the node using the provided class and set the position (multi lines)', () => {
            const token = {
                value: '\nfoo\nbar',
                line: 2,
                col: 7,
                offset: 12
            };
            const node = utils.terminal(token, token.value, ast.nodes.AstString);

            expect(node).to.be.an.instanceOf(ast.nodes.AstString);
            expect(node).to.have.property('start');
            expect(node.start).to.be.an.instanceOf(ast.nodes.AstPosition);
            expect(node.start.line).to.be.equal(token.line);
            expect(node.start.column).to.be.equal(token.col);
            expect(node.start.offset).to.be.equal(token.offset);
            expect(node).to.have.property('end');
            expect(node.end).to.be.an.instanceOf(ast.nodes.AstPosition);
            expect(node.end.line).to.be.equal(token.line + 2);
            expect(node.end.column).to.be.equal(4);
            expect(node.end.offset).to.be.equal(token.offset + token.value.length);
        });

        it('should throw a TypeError if the AST class is not valid', () => {
            const token = {
                value: 'foo',
                line: 2,
                col: 7,
                offset: 12
            };

            expect(() => utils.terminal(token, token.value, 'foo')).to.throw(TypeError);
            expect(() => utils.terminal(token, token.value, {})).to.throw(TypeError);
            expect(() => utils.terminal(token, token.value, function() {})).to.throw(TypeError);
        });

        it('should throw a TypeError if the created node is not an AstFragment', () => {
            const token = {
                value: 'foo',
                line: 2,
                col: 7,
                offset: 12
            };

            expect(() => utils.terminal(token, token.value, ast.nodes.AstPosition)).to.throw(TypeError);
        });

    });

    describe('forward', () => {

        it('should straight returns the value if it is not an array', () => {

            const values = [
                42,
                true,
                "foo bar",
                {foo: "bar"}
            ];

            values.forEach((value) => {
                expect(utils.forward(value)).to.be.equal(value);
            });

        });

        it('should returns the first element of the array', () => {

            const values = [
                [],
                [42],
                [true],
                ["foo bar"],
                [{foo: "bar"}]
            ];

            values.forEach((value) => {
                expect(utils.forward(value)).to.be.equal(value[0]);
            });

        });

    });

    describe('discard', () => {

        it('should returns null whatever the input is', () => {

            expect(utils.discard(42)).to.be.null;
            expect(utils.discard(true)).to.be.null;
            expect(utils.discard("foo bar")).to.be.null;
            expect(utils.discard([1, 2, 3])).to.be.null;
            expect(utils.discard({foo: "bar"})).to.be.null;

        });

    });

});
