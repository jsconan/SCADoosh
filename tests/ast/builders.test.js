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
 * Unit tests: Builders that will produce the AST nodes from the language parser.
 *
 * @package tests/ast
 * @author jsconan
 */

const _ = require('lodash');
const chai = require('chai');
const expect = chai.expect;

const classes = require('../../src/ast/classes');
const builders = require('../../src/ast/builders');

describe('AST builders', () => {

    describe('terminal', () => {

        it('should create the node using the provided class name', () => {
            const token = {
                value: 'foo',
                text: 'foo',
                line: 2,
                col: 7,
                offset: 12
            };
            const node = builders.terminal([token], 'AstString');

            expect(node).to.be.an.instanceOf(classes.AstString);
            expect(node).to.have.property('start');
            expect(node.start).to.be.an.instanceOf(classes.AstPosition);
            expect(node.start.line).to.be.equal(token.line);
            expect(node.start.column).to.be.equal(token.col);
            expect(node.start.offset).to.be.equal(token.offset);
            expect(node).to.have.property('end');
            expect(node.end).to.be.an.instanceOf(classes.AstPosition);
            expect(node.end.line).to.be.equal(token.line);
            expect(node.end.column).to.be.equal(token.col + token.value.length);
            expect(node.end.offset).to.be.equal(token.offset + token.value.length);
        });

        it('should create the node using the provided class', () => {
            const token = {
                value: 'foo',
                text: 'foo',
                line: 2,
                col: 7,
                offset: 12
            };
            const node = builders.terminal([token], classes.AstString);

            expect(node).to.be.an.instanceOf(classes.AstString);
            expect(node).to.have.property('start');
            expect(node.start).to.be.an.instanceOf(classes.AstPosition);
            expect(node.start.line).to.be.equal(token.line);
            expect(node.start.column).to.be.equal(token.col);
            expect(node.start.offset).to.be.equal(token.offset);
            expect(node).to.have.property('end');
            expect(node.end).to.be.an.instanceOf(classes.AstPosition);
            expect(node.end.line).to.be.equal(token.line);
            expect(node.end.column).to.be.equal(token.col + token.value.length);
            expect(node.end.offset).to.be.equal(token.offset + token.value.length);
        });

        it('should create the node and set the position for a multi lines token', () => {
            const token = {
                value: '\nfoo\nbar',
                text: '\nfoo\nbar',
                line: 2,
                col: 7,
                offset: 12
            };
            const node = builders.terminal([token], 'AstString');

            expect(node).to.be.an.instanceOf(classes.AstString);
            expect(node).to.have.property('start');
            expect(node.start).to.be.an.instanceOf(classes.AstPosition);
            expect(node.start.line).to.be.equal(token.line);
            expect(node.start.column).to.be.equal(token.col);
            expect(node.start.offset).to.be.equal(token.offset);
            expect(node).to.have.property('end');
            expect(node.end).to.be.an.instanceOf(classes.AstPosition);
            expect(node.end.line).to.be.equal(token.line + 2);
            expect(node.end.column).to.be.equal(4);
            expect(node.end.offset).to.be.equal(token.offset + token.value.length);
        });

        it('should create the node from a direct token', () => {
            const token = {
                value: '\nfoo\nbar',
                text: '\nfoo\nbar',
                line: 2,
                col: 7,
                offset: 12
            };
            const node = builders.terminal(token, classes.AstString);

            expect(node).to.be.an.instanceOf(classes.AstString);
            expect(node).to.have.property('start');
            expect(node.start).to.be.an.instanceOf(classes.AstPosition);
            expect(node.start.line).to.be.equal(token.line);
            expect(node.start.column).to.be.equal(token.col);
            expect(node.start.offset).to.be.equal(token.offset);
            expect(node).to.have.property('end');
            expect(node.end).to.be.an.instanceOf(classes.AstPosition);
            expect(node.end.line).to.be.equal(token.line + 2);
            expect(node.end.column).to.be.equal(4);
            expect(node.end.offset).to.be.equal(token.offset + token.value.length);
        });

        it('should straight return the already existing node', () => {
            const data = new classes.AstNumber(42).startAt(1, 1, 0).endAt(1, 3, 2);
            expect(builders.terminal(data, 'AstNumber')).to.be.equal(data);
            expect(builders.terminal([data], 'AstNumber')).to.be.equal(data);
            expect(builders.terminal(data, 'AstString')).to.be.an.instanceOf(classes.AstString);
            expect(builders.terminal(data, 'AstString')).to.have.a.property('value').that.is.equal('42');
        });

        it('should throw a TypeError if the AST class is not valid', () => {
            const token = {
                value: 'foo',
                text: 'foo',
                line: 2,
                col: 7,
                offset: 12
            };

            expect(() => builders.terminal(token, 'foo')).to.throw(TypeError);
            expect(() => builders.terminal(token, {})).to.throw(TypeError);
            expect(() => builders.terminal(token, () => {
            })).to.throw(TypeError);
        });

        it('should throw a TypeError if the data is not valid', () => {
            expect(() => builders.terminal([], 'AstNumber')).to.throw(TypeError);
            expect(() => builders.terminal([{}, {}], 'AstNumber')).to.throw(TypeError);
        });

        it('should throw a TypeError if the created node is not an AstFragment', () => {
            class AstFoo extends classes.AstNode {
                constructor() {
                    super('foo');
                }
            }

            const token = {
                value: 'foo',
                text: 'foo',
                line: 2,
                col: 7,
                offset: 12
            };

            expect(() => builders.terminal(token, AstFoo)).to.throw(TypeError);
        });

    });

    describe('unaryOperator', () => {

        it('should produce the descriptor for a unary operator expression', () => {
            const value = new classes.AstNumber(2);
            const node = new classes.AstUnaryOperator('-', value);
            const input = [{
                type: 'subtract',
                value: '-',
                text: '-',
                offset: 1,
                lineBreaks: 0,
                line: 1,
                col: 2
            }, value];

            value.startAt(1, 3, 2);
            value.endAt(1, 4, 3);
            node.startAt(1, 2, 1);
            node.endAt(value);

            expect(builders.unaryOperator(input)).to.be.an.instanceOf(classes.AstUnaryOperator);
            expect(builders.unaryOperator(input)).to.be.deep.equal(node);
        });

        it('should produce the descriptor for a unary operator expression, no matter the depth', () => {
            const value = new classes.AstNumber(3);
            const node = new classes.AstUnaryOperator('+', value);
            const input = [[[{
                type: 'add',
                value: '+',
                text: '+',
                offset: 1,
                lineBreaks: 0,
                line: 1,
                col: 2
            }], [value]]];

            value.startAt(1, 3, 2);
            value.endAt(1, 4, 3);
            node.startAt(1, 2, 1);
            node.endAt(value);

            expect(builders.unaryOperator(input)).to.be.an.instanceOf(classes.AstUnaryOperator);
            expect(builders.unaryOperator(input)).to.be.deep.equal(node);
        });

        it('should produce the descriptor for a particular type of unary operator expression', () => {
            class AstUnaryFoo extends classes.AstUnaryOperator {}
            const value = new classes.AstNumber(3);
            const node = new AstUnaryFoo('+', value);
            const input = [[[{
                type: 'add',
                value: '+',
                text: '+',
                offset: 1,
                lineBreaks: 0,
                line: 1,
                col: 2
            }], [value]]];

            value.startAt(1, 3, 2);
            value.endAt(1, 4, 3);
            node.startAt(1, 2, 1);
            node.endAt(value);

            expect(builders.unaryOperator(input, AstUnaryFoo)).to.be.an.instanceOf(classes.AstUnaryOperator);
            expect(builders.unaryOperator(input, AstUnaryFoo)).to.be.an.instanceOf(AstUnaryFoo);
            expect(builders.unaryOperator(input, AstUnaryFoo)).to.be.deep.equal(node);
        });

        it('should forward the existing descriptor for a unary operator expression', () => {
            const value = new classes.AstNumber(5);
            const node = new classes.AstUnaryOperator('-', value);

            expect(builders.unaryOperator(node)).to.be.deep.equal(node);
            expect(builders.unaryOperator([node])).to.be.deep.equal(node);
        });

    });

    describe('binaryOperator', () => {

        it('should produce the descriptor for a binary operator expression', () => {
            const left = new classes.AstNumber(1);
            const right = new classes.AstNumber(2);
            const node = new classes.AstBinaryOperator(left, '+', right);
            const input = [left, {
                type: 'add',
                value: '+',
                text: '+',
                offset: 1,
                lineBreaks: 0,
                line: 1,
                col: 2
            }, right];

            left.startAt(1, 1, 0);
            left.endAt(1, 2, 1);
            right.startAt(1, 3, 2);
            right.endAt(1, 4, 3);
            node.startAt(left);
            node.endAt(right);

            expect(builders.binaryOperator(input)).to.be.an.instanceOf(classes.AstBinaryOperator);
            expect(builders.binaryOperator(input)).to.be.deep.equal(node);
        });

        it('should produce the descriptor for a binary operator expression, no matter the depth', () => {
            const left = new classes.AstNumber(3);
            const right = new classes.AstNumber(2);
            const node = new classes.AstBinaryOperator(left, '-', right);
            const input = [left, [[{
                type: 'subtract',
                value: '-',
                text: '-',
                offset: 1,
                lineBreaks: 0,
                line: 1,
                col: 2
            }], [right]]];

            left.startAt(1, 1, 0);
            left.endAt(1, 2, 1);
            right.startAt(1, 3, 2);
            right.endAt(1, 4, 3);
            node.startAt(left);
            node.endAt(right);

            expect(builders.binaryOperator(input)).to.be.an.instanceOf(classes.AstBinaryOperator);
            expect(builders.binaryOperator(input)).to.be.deep.equal(node);
        });

        it('should produce the descriptor for a particular type of binary operator expression', () => {
            class AstBinaryFoo extends classes.AstBinaryOperator {}
            const left = new classes.AstNumber(3);
            const right = new classes.AstNumber(2);
            const node = new AstBinaryFoo(left, '-', right);
            const input = [left, [[{
                type: 'subtract',
                value: '-',
                text: '-',
                offset: 1,
                lineBreaks: 0,
                line: 1,
                col: 2
            }], [right]]];

            left.startAt(1, 1, 0);
            left.endAt(1, 2, 1);
            right.startAt(1, 3, 2);
            right.endAt(1, 4, 3);
            node.startAt(left);
            node.endAt(right);

            expect(builders.binaryOperator(input, AstBinaryFoo)).to.be.an.instanceOf(classes.AstBinaryOperator);
            expect(builders.binaryOperator(input, AstBinaryFoo)).to.be.an.instanceOf(AstBinaryFoo);
            expect(builders.binaryOperator(input, AstBinaryFoo)).to.be.deep.equal(node);
        });

        it('should forward the existing descriptor for a binary operator expression', () => {
            const left = new classes.AstNumber(2);
            const right = new classes.AstNumber(4);
            const node = new classes.AstBinaryOperator(left, '*', right);

            expect(builders.binaryOperator(node)).to.be.deep.equal(node);
            expect(builders.binaryOperator([node])).to.be.deep.equal(node);
        });

    });

    describe('assignment', () => {

        it('should produce the descriptor for an assignment expression', () => {
            const identifier = new classes.AstIdentifier('answer');
            const value = new classes.AstNumber(42);
            const node = new classes.AstAssignment(identifier, value);
            const input = [identifier, {
                type: 'assign',
                value: '=',
                text: '=',
                offset: 6,
                lineBreaks: 0,
                line: 1,
                col: 7
            }, value];

            identifier.startAt(1, 1, 0);
            identifier.endAt(1, 7, 6);
            value.startAt(1, 8, 7);
            value.endAt(1, 9, 8);
            node.startAt(identifier);
            node.endAt(value);

            expect(builders.assignment(input)).to.be.an.instanceOf(classes.AstAssignment);
            expect(builders.assignment(input)).to.be.deep.equal(node);
        });

        it('should produce the descriptor for an assignment expression, no matter the depth', () => {
            const identifier = new classes.AstIdentifier('answer');
            const value = new classes.AstNumber(42);
            const node = new classes.AstAssignment(identifier, value);
            const input = [[identifier], [{
                type: 'assign',
                value: '=',
                text: '=',
                offset: 6,
                lineBreaks: 0,
                line: 1,
                col: 7
            }, [value]]];

            identifier.startAt(1, 1, 0);
            identifier.endAt(1, 7, 6);
            value.startAt(1, 8, 7);
            value.endAt(1, 9, 8);
            node.startAt(identifier);
            node.endAt(value);

            expect(builders.assignment(input)).to.be.an.instanceOf(classes.AstAssignment);
            expect(builders.assignment(input)).to.be.deep.equal(node);
        });

        it('should produce the descriptor for a particular type of assignment expression', () => {
            class AstFooAssignment extends classes.AstAssignment {}
            const identifier = new classes.AstIdentifier('answer');
            const value = new classes.AstNumber(42);
            const node = new AstFooAssignment(identifier, value);
            const input = [[identifier], [{
                type: 'assign',
                value: '=',
                text: '=',
                offset: 6,
                lineBreaks: 0,
                line: 1,
                col: 7
            }, [value]]];

            identifier.startAt(1, 1, 0);
            identifier.endAt(1, 7, 6);
            value.startAt(1, 8, 7);
            value.endAt(1, 9, 8);
            node.startAt(identifier);
            node.endAt(value);

            expect(builders.assignment(input, AstFooAssignment)).to.be.an.instanceOf(classes.AstAssignment);
            expect(builders.assignment(input, AstFooAssignment)).to.be.an.instanceOf(AstFooAssignment);
            expect(builders.assignment(input, AstFooAssignment)).to.be.deep.equal(node);
        });

        it('should forward the existing descriptor for an assignment expression', () => {
            const identifier = new classes.AstIdentifier('answer');
            const value = new classes.AstNumber(42);
            const node = new classes.AstAssignment(identifier, value);

            expect(builders.assignment(node)).to.be.deep.equal(node);
            expect(builders.assignment([node])).to.be.deep.equal(node);
        });

    });

    describe('command', () => {

        it('should produce the descriptor for an include statement', () => {
            const path = new classes.AstPath('./path/to/library.scad');
            const node = new classes.AstInclude(path);
            const input = [{
                type: 'include',
                value: 'include',
                text: 'include',
                offset: 0,
                lineBreaks: 0,
                line: 1,
                col: 1
            }, path];

            path.startAt(1, 8, 7);
            path.endAt(1, 32, 31);
            node.startAt(1, 1, 0);
            node.endAt(path);

            expect(builders.command(input, 'AstInclude')).to.be.an.instanceOf(classes.AstInclude);
            expect(builders.command(input, 'AstInclude')).to.be.deep.equal(node);
        });

        it('should produce the descriptor for an include statement, no matter the depth', () => {
            const path = new classes.AstPath('./path/to/library.scad');
            const node = new classes.AstInclude(path);
            const input = [[[{
                type: 'include',
                value: 'include',
                text: 'include',
                offset: 0,
                lineBreaks: 0,
                line: 1,
                col: 1
            }], [path]]];

            path.startAt(1, 8, 7);
            path.endAt(1, 32, 31);
            node.startAt(1, 1, 0);
            node.endAt(path);

            expect(builders.command(input, 'AstInclude')).to.be.an.instanceOf(classes.AstInclude);
            expect(builders.command(input, 'AstInclude')).to.be.deep.equal(node);
        });

        it('should forward the existing descriptor for an include statement', () => {
            const path = new classes.AstPath('./path/to/library.scad');
            const node = new classes.AstInclude(path);

            expect(builders.command(node, 'AstInclude')).to.be.deep.equal(node);
            expect(builders.command([node], 'AstInclude')).to.be.deep.equal(node);
        });

        it('should produce the descriptor for a use statement', () => {
            const path = new classes.AstPath('./path/to/library.scad');
            const node = new classes.AstUse(path);
            const input = [{
                type: 'use',
                value: 'use',
                text: 'use',
                offset: 0,
                lineBreaks: 0,
                line: 1,
                col: 1
            }, path];

            path.startAt(1, 4, 3);
            path.endAt(1, 28, 27);
            node.startAt(1, 1, 0);
            node.endAt(path);

            expect(builders.command(input, 'AstUse')).to.be.an.instanceOf(classes.AstUse);
            expect(builders.command(input, 'AstUse')).to.be.deep.equal(node);
        });

        it('should produce the descriptor for a particular type of command', () => {
            class AstFooCommand extends classes.AstUse {
                constructor(path, category) {
                    super(path);
                    this.addProperty('category', category);
                }
            }
            const path = new classes.AstPath('./path/to/library.scad');
            const node = new AstFooCommand(path, 'foo');
            const input = [{
                type: 'foo',
                value: 'foo',
                text: 'foo',
                offset: 0,
                lineBreaks: 0,
                line: 1,
                col: 1
            }, path];

            path.startAt(1, 4, 3);
            path.endAt(1, 28, 27);
            node.startAt(1, 1, 0);
            node.endAt(path);

            expect(builders.command(input, AstFooCommand)).to.be.an.instanceOf(classes.AstUse);
            expect(builders.command(input, AstFooCommand)).to.be.an.instanceOf(AstFooCommand);
            expect(builders.command(input, AstFooCommand)).to.be.deep.equal(node);
            expect(builders.command(input, AstFooCommand)).to.have.a.property('category').that.is.equal('foo');
        });

        it('should produce the descriptor for a use statement, no matter the depth', () => {
            const path = new classes.AstPath('./path/to/library.scad');
            const node = new classes.AstUse(path);
            const input = [[[{
                type: 'use',
                value: 'use',
                text: 'use',
                offset: 0,
                lineBreaks: 0,
                line: 1,
                col: 1
            }], [path]]];

            path.startAt(1, 4, 3);
            path.endAt(1, 28, 27);
            node.startAt(1, 1, 0);
            node.endAt(path);

            expect(builders.command(input, 'AstUse')).to.be.an.instanceOf(classes.AstUse);
            expect(builders.command(input, 'AstUse')).to.be.deep.equal(node);
        });

        it('should forward the existing descriptor for a use statement', () => {
            const path = new classes.AstPath('./path/to/library.scad');
            const node = new classes.AstUse(path);

            expect(builders.command(node, 'AstUse')).to.be.deep.equal(node);
            expect(builders.command([node], 'AstUse')).to.be.deep.equal(node);
        });

    });

    describe('block', () => {

        it('should produce the descriptor for a block of statements', () => {
            const nodes = [
                new classes.AstAssignment(new classes.AstIdentifier('foo'), new classes.AstNumber(42)),
                new classes.AstAssignment(new classes.AstIdentifier('bar'), new classes.AstNumber(21)),
                new classes.AstAssignment(new classes.AstIdentifier('x'), new classes.AstNumber(3))
            ];
            const line = 2;
            const column = 4;
            const input = [{
                type: 'lbrace',
                value: '{',
                text: '{',
                line: line - 1,
                col: 1,
                offset: 0
            }, nodes, {
                type: 'rbrace',
                value: '}',
                text: '}',
                line: line + nodes.length,
                col: 1,
                offset: 0
            }];

            const node = new classes.AstBlock(nodes);
            node.startAt(line - 1, 1, 0);
            node.endAt(line + nodes.length, 2, 1);

            nodes.forEach((node, idx) => {
                node.identifier.startAt(line + idx, column, column - 1);
                node.identifier.endAt(line + idx, node.identifier.start.column + node.identifier.value.length, node.identifier.start.offset + node.identifier.value.length);
                node.value.startAt(line + idx, node.identifier.end.column + 2, node.identifier.end.offset + 2);
                node.value.endAt(line + idx, node.value.start.column + ('' + node.value.value).length, node.value.start.offset + ('' + node.value.value).length);
                node.startAt(node.identifier);
                node.endAt(node.value);
            });

            expect(builders.block(input)).to.be.an.instanceOf(classes.AstBlock);
            expect(builders.block(input)).to.be.deep.equal(node);
        });

        it('should produce the descriptor for a block of statements, no matter the depth', () => {
            const nodes = [
                new classes.AstAssignment(new classes.AstIdentifier('foo'), new classes.AstNumber(42)),
                new classes.AstAssignment(new classes.AstIdentifier('bar'), new classes.AstNumber(21)),
                new classes.AstAssignment(new classes.AstIdentifier('x'), new classes.AstNumber(3))
            ];
            const line = 2;
            const column = 4;
            const input = [[{
                type: 'lbrace',
                value: '{',
                text: '{',
                line: line - 1,
                col: 1,
                offset: 0
            }], [nodes], [{
                type: 'rbrace',
                value: '}',
                text: '}',
                line: line + nodes.length,
                col: 1,
                offset: 0
            }]];

            const node = new classes.AstBlock(nodes);
            node.startAt(line - 1, 1, 0);
            node.endAt(line + nodes.length, 2, 1);

            nodes.forEach((node, idx) => {
                node.identifier.startAt(line + idx, column, column - 1);
                node.identifier.endAt(line + idx, node.identifier.start.column + node.identifier.value.length, node.identifier.start.offset + node.identifier.value.length);
                node.value.startAt(line + idx, node.identifier.end.column + 2, node.identifier.end.offset + 2);
                node.value.endAt(line + idx, node.value.start.column + ('' + node.value.value).length, node.value.start.offset + ('' + node.value.value).length);
                node.startAt(node.identifier);
                node.endAt(node.value);
            });

            expect(builders.block(input)).to.be.an.instanceOf(classes.AstBlock);
            expect(builders.block(input)).to.be.deep.equal(node);
        });

        it('should produce the descriptor for a block of one statement', () => {
            const nodes = [
                new classes.AstAssignment(new classes.AstIdentifier('foo'), new classes.AstNumber(42)),
            ];
            const line = 2;
            const column = 4;
            const input = [{
                type: 'lbrace',
                value: '{',
                text: '{',
                line: line - 1,
                col: 1,
                offset: 0
            }, nodes, {
                type: 'rbrace',
                value: '}',
                text: '}',
                line: line + nodes.length,
                col: 1,
                offset: 0
            }];

            const node = new classes.AstBlock(nodes);
            node.startAt(line - 1, 1, 0);
            node.endAt(line + nodes.length, 2, 1);

            nodes.forEach((node, idx) => {
                node.identifier.startAt(line + idx, column, column - 1);
                node.identifier.endAt(line + idx, node.identifier.start.column + node.identifier.value.length, node.identifier.start.offset + node.identifier.value.length);
                node.value.startAt(line + idx, node.identifier.end.column + 2, node.identifier.end.offset + 2);
                node.value.endAt(line + idx, node.value.start.column + ('' + node.value.value).length, node.value.start.offset + ('' + node.value.value).length);
                node.startAt(node.identifier);
                node.endAt(node.value);
            });

            expect(builders.block(input)).to.be.an.instanceOf(classes.AstBlock);
            expect(builders.block(input)).to.be.deep.equal(node);
        });

        it('should produce the descriptor for an empty block of statements', () => {
            const nodes = [];
            const input = [{
                type: 'lbrace',
                value: '{',
                text: '{',
                line: 1,
                col: 1,
                offset: 0
            }, nodes, {
                type: 'rbrace',
                value: '}',
                text: '}',
                line: 1,
                col: 2,
                offset: 1
            }];
            const node = new classes.AstBlock(nodes);
            node.startAt(1, 1, 0);
            node.endAt(1, 3, 2);

            expect(builders.block(input)).to.be.an.instanceOf(classes.AstBlock);
            expect(builders.block(input)).to.be.deep.equal(node);
        });

        it('should produce the descriptor for a particular type of block', () => {
            class AstFooBlock extends classes.AstBlock {}
            const nodes = [];
            const input = [{
                type: 'lbrace',
                value: '{',
                text: '{',
                line: 1,
                col: 1,
                offset: 0
            }, nodes, {
                type: 'rbrace',
                value: '}',
                text: '}',
                line: 1,
                col: 2,
                offset: 1
            }];
            const node = new AstFooBlock(nodes);
            node.startAt(1, 1, 0);
            node.endAt(1, 3, 2);

            expect(builders.block(input, AstFooBlock)).to.be.an.instanceOf(classes.AstBlock);
            expect(builders.block(input, AstFooBlock)).to.be.an.instanceOf(AstFooBlock);
            expect(builders.block(input, AstFooBlock)).to.be.deep.equal(node);
        });

        it('should forward the existing descriptor for a block of statements', () => {
            const node = new classes.AstBlock([]);

            expect(builders.block(node)).to.be.deep.equal(node);
            expect(builders.block([node])).to.be.deep.equal(node);
        });

    });

});
