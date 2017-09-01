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
 * Unit tests: Hub that provides factories to create final AST nodes.
 *
 * @package tests/ast
 * @author jsconan
 */

const _ = require('lodash');
const chai = require('chai');
const expect = chai.expect;

const ast = require('./../../src/ast/ast');
const AstNode = require('./../../src/ast/node');
const AstPosition = require('./../../src/ast/position');
const AstFragment = require('./../../src/ast/fragment');
const AstLiteral = require('./../../src/ast/literal');
const AstNumber = require('./../../src/ast/number');
const AstString = require('./../../src/ast/string');
const AstPath = require('./../../src/ast/path');
const AstIdentifier = require('./../../src/ast/identifier');
const AstBoolean = require('./../../src/ast/boolean');
const AstTrue = require('./../../src/ast/true');
const AstFalse = require('./../../src/ast/false');
const AstUndefined = require('./../../src/ast/undefined');
const AstComment = require('./../../src/ast/comment');
const AstLineComment = require('./../../src/ast/line-comment');
const AstBlockComment = require('./../../src/ast/block-comment');
const AstBinaryOperator = require('./../../src/ast/binary-operator');
const AstUnaryOperator = require('./../../src/ast/unary-operator');

describe('OpenSCAD AST hub', () => {

    it('should contains the AST node creation helpers', () => {
        [
            'number',
            'string',
            'path',
            'identifier',
            'boolean',
            'undefined',
            'lineComment',
            'blockComment',
            'binaryOperator',
            'unaryOperator'
        ].forEach((name) => {
            expect(ast).to.have.a.property(name).that.is.a('function');
        });
    });

    describe('nodes', () => {

        it('should expose the list of node classes', () => {

            expect(ast).to.have.a.property('nodes').that.is.an('object');
            expect(ast.nodes).to.have.a.property('AstNode').that.is.equal(AstNode);
            expect(ast.nodes).to.have.a.property('AstPosition').that.is.equal(AstPosition);
            expect(ast.nodes).to.have.a.property('AstFragment').that.is.equal(AstFragment);
            expect(ast.nodes).to.have.a.property('AstLiteral').that.is.equal(AstLiteral);
            expect(ast.nodes).to.have.a.property('AstNumber').that.is.equal(AstNumber);
            expect(ast.nodes).to.have.a.property('AstString').that.is.equal(AstString);
            expect(ast.nodes).to.have.a.property('AstPath').that.is.equal(AstPath);
            expect(ast.nodes).to.have.a.property('AstIdentifier').that.is.equal(AstIdentifier);
            expect(ast.nodes).to.have.a.property('AstBoolean').that.is.equal(AstBoolean);
            expect(ast.nodes).to.have.a.property('AstTrue').that.is.equal(AstTrue);
            expect(ast.nodes).to.have.a.property('AstFalse').that.is.equal(AstFalse);
            expect(ast.nodes).to.have.a.property('AstUndefined').that.is.equal(AstUndefined);
            expect(ast.nodes).to.have.a.property('AstComment').that.is.equal(AstComment);
            expect(ast.nodes).to.have.a.property('AstLineComment').that.is.equal(AstLineComment);
            expect(ast.nodes).to.have.a.property('AstBlockComment').that.is.equal(AstBlockComment);
            expect(ast.nodes).to.have.a.property('AstBinaryOperator').that.is.equal(AstBinaryOperator);
            expect(ast.nodes).to.have.a.property('AstUnaryOperator').that.is.equal(AstUnaryOperator);

            [
                'AstNode',
                'AstPosition',
                'AstFragment',
                'AstLiteral',
                'AstNumber',
                'AstString',
                'AstPath',
                'AstIdentifier',
                'AstBoolean',
                'AstTrue',
                'AstFalse',
                'AstUndefined',
                'AstComment',
                'AstLineComment',
                'AstBlockComment',
                'AstBinaryOperator',
                'AstUnaryOperator'
            ].forEach((name) => {
                expect(ast.nodes).to.have.a.property(name).that.is.a('function');
            });
        });

    });

    describe('utils', () => {

        describe('is', () => {

            it('should check using a class constructor', () => {

                const node = new AstNode('node');
                const number = new AstNumber(42);

                expect(ast.utils.is(node, AstNode)).to.be.equal(true);
                expect(ast.utils.is(node, AstFragment)).to.be.equal(false);

                expect(ast.utils.is(number, AstNode)).to.be.equal(true);
                expect(ast.utils.is(number, AstFragment)).to.be.equal(true);
                expect(ast.utils.is(number, AstNumber)).to.be.equal(true);
                expect(ast.utils.is(number, AstString)).to.be.equal(false);
                expect(ast.utils.is(number, _.noop)).to.be.equal(false);

                expect(ast.utils.is({}, AstNode)).to.be.equal(false);
                expect(ast.utils.is(42, AstNode)).to.be.equal(false);

            });

            it('should check using a class name', () => {

                const node = new AstNode('node');
                const number = new AstNumber(42);

                expect(ast.utils.is(node, 'AstNode')).to.be.equal(true);
                expect(ast.utils.is(node, 'AstFragment')).to.be.equal(false);

                expect(ast.utils.is(number, 'AstNode')).to.be.equal(true);
                expect(ast.utils.is(number, 'AstFragment')).to.be.equal(true);
                expect(ast.utils.is(number, 'AstNumber')).to.be.equal(true);
                expect(ast.utils.is(number, 'AstString')).to.be.equal(false);
                expect(ast.utils.is(number, 'number')).to.be.equal(false);

                expect(ast.utils.is({}, 'AstNode')).to.be.equal(false);
                expect(ast.utils.is(42, 'AstNode')).to.be.equal(false);

            });

        });

        describe('startPosition', () => {

            it('should create a start AstPosition from the provided token', () => {
                const token = {
                    value: 'foo',
                    line: 2,
                    col: 7,
                    offset: 12
                };
                const node = ast.utils.startPosition(token);

                expect(node).to.be.an.instanceOf(AstPosition);
                expect(node).to.have.property('line').that.is.equal(token.line);
                expect(node).to.have.property('column').that.is.equal(token.col);
                expect(node).to.have.property('offset').that.is.equal(token.offset);
            });

            it('should return the start position of the provided AstFragment', () => {
                const fragment = new AstNumber(1);
                fragment.startAt(1, 1, 0);
                fragment.endAt(1, 2, 1);

                const node = ast.utils.startPosition(fragment);

                expect(node).to.be.an.instanceOf(AstPosition);
                expect(node).to.be.equal(fragment.start);
            });

            it('should throw a TypeError if the provided token is wrong', () => {
                expect(() => ast.utils.startPosition({})).to.throw(TypeError);
                expect(() => ast.utils.startPosition('')).to.throw(TypeError);
                expect(() => ast.utils.startPosition({line: -1, col: 1, offset: 0})).to.throw(TypeError);
                expect(() => ast.utils.startPosition({line: 1, col: -1, offset: 0})).to.throw(TypeError);
                expect(() => ast.utils.startPosition({line: 1, col: 1, offset: -1})).to.throw(TypeError);
            });

        });

        describe('endPosition', () => {

            it('should create an end AstPosition from the provided token (single line)', () => {
                const token = {
                    value: 'foo',
                    line: 2,
                    col: 7,
                    offset: 12
                };
                const node = ast.utils.endPosition(token);

                expect(node).to.be.an.instanceOf(AstPosition);
                expect(node).to.have.property('line').that.is.equal(token.line);
                expect(node).to.have.property('column').that.is.equal(token.col + token.value.length);
                expect(node).to.have.property('offset').that.is.equal(token.offset + token.value.length);
            });

            it('should create an end AstPosition from the provided token (multi lines)', () => {
                const token = {
                    value: '\nfoo\nbar',
                    line: 2,
                    col: 7,
                    offset: 12
                };
                const node = ast.utils.endPosition(token);

                expect(node).to.be.an.instanceOf(AstPosition);
                expect(node).to.have.property('line').that.is.equal(token.line + 2);
                expect(node).to.have.property('column').that.is.equal(4);
                expect(node).to.have.property('offset').that.is.equal(token.offset + token.value.length);
            });

            it('should return the end position of the provided AstFragment', () => {
                const fragment = new AstNumber(1);
                fragment.startAt(1, 1, 0);
                fragment.endAt(1, 2, 1);

                const node = ast.utils.endPosition(fragment);

                expect(node).to.be.an.instanceOf(AstPosition);
                expect(node).to.be.equal(fragment.end);
            });

            it('should throw a TypeError if the provided token is wrong', () => {
                expect(() => ast.utils.endPosition({})).to.throw(TypeError);
                expect(() => ast.utils.endPosition('')).to.throw(TypeError);
                expect(() => ast.utils.endPosition({value: '', line: -5, col: 1, offset: 0})).to.throw(TypeError);
                expect(() => ast.utils.endPosition({value: '', line: 1, col: -5, offset: 0})).to.throw(TypeError);
                expect(() => ast.utils.endPosition({value: '', line: 1, col: 1, offset: -5})).to.throw(TypeError);
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
                    expect(ast.utils.forward(value)).to.be.equal(value);
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
                    expect(ast.utils.forward(value)).to.be.equal(value[0]);
                });

            });

            it('should throw a TypeError if the array contains more than one element', () => {

                expect(() => ast.utils.forward([1, 2])).to.throw(TypeError);

            });

        });

        describe('surrounded', () => {

            it('should unwrap the nested AST node and update the position accordingly to the sibling tokens', () => {

                const left = {
                    value: '(',
                    line: 1,
                    col: 2,
                    offset: 1
                };
                const node = ast.number(3);
                const right = {
                    value: ')',
                    line: 1,
                    col: 5,
                    offset: 4
                };

                node.startAt(1, 3, 2);
                node.endAt(1, 4, 3);

                expect(node.start.offset).to.be.equal(2);
                expect(node.start.column).to.be.equal(3);
                expect(node.end.offset).to.be.equal(3);
                expect(node.end.column).to.be.equal(4);

                const output = ast.utils.surrounded([left, [node, [right]]]);

                expect(output).to.be.not.equal(node);
                expect(output.start.offset).to.be.equal(left.offset);
                expect(output.start.column).to.be.equal(left.col);
                expect(output.end.offset).to.be.equal(right.offset + right.value.length);
                expect(output.end.column).to.be.equal(right.col + right.value.length);

            });

            it('should unwrap the nested AST node and update the position accordingly to the sibling nodes', () => {

                const left = ast.identifier('foo');
                const right = ast.identifier('bar');
                const node = ast.number(3);

                left.startAt(1, 1, 0);
                left.endAt(1, 4, 3);

                right.startAt(1, 6, 5);
                right.endAt(1, 9, 8);

                node.startAt(1, 5, 4);
                node.endAt(1, 6, 5);

                expect(node.start.offset).to.be.equal(4);
                expect(node.start.column).to.be.equal(5);
                expect(node.end.offset).to.be.equal(5);
                expect(node.end.column).to.be.equal(6);

                const output = ast.utils.surrounded([[[left], [node]], [right]]);

                expect(output).to.be.not.equal(node);
                expect(output.start.offset).to.be.equal(left.start.offset);
                expect(output.start.column).to.be.equal(left.start.column);
                expect(output.end.offset).to.be.equal(right.end.offset);
                expect(output.end.column).to.be.equal(right.end.column);

            });

            it('should unwrap the nested AST node and update the position accordingly to the sibling nodes/tokens whatever the nested depth is', () => {

                const left = ast.identifier('foo');
                const node = ast.number(3);
                const right = {
                    value: 'bar',
                    line: 1,
                    col: 6,
                    offset: 5
                };

                left.startAt(1, 1, 0);
                left.endAt(1, 4, 3);

                node.startAt(1, 5, 4);
                node.endAt(1, 6, 5);

                expect(node.start.offset).to.be.equal(4);
                expect(node.start.column).to.be.equal(5);
                expect(node.end.offset).to.be.equal(5);
                expect(node.end.column).to.be.equal(6);

                const output = ast.utils.surrounded([left, node, right]);

                expect(output).to.be.not.equal(node);
                expect(output.start.offset).to.be.equal(left.start.offset);
                expect(output.start.column).to.be.equal(left.start.column);
                expect(output.end.offset).to.be.equal(right.offset + right.value.length);
                expect(output.end.column).to.be.equal(right.col + right.value.length);

            });

            it('should straight returns the data if there is only one element', () => {

                [
                    42,
                    true,
                    "foo bar",
                    {foo: "bar"}
                ].forEach((value) => {
                    expect(ast.utils.surrounded(value)).to.be.equal(value);
                });

                [
                    [42],
                    [true],
                    ["foo bar"],
                    [{foo: "bar"}]
                ].forEach((value) => {
                    expect(ast.utils.surrounded(value)).to.be.equal(value[0]);
                });

            });

            it('should throw a TypeError if the data does not contains the right number of elements', () => {

                expect(() => ast.utils.surrounded([1, 2])).to.throw(TypeError);

            });

            it('should throw a TypeError if the data to unwrap does not contain a valid AST node', () => {

                expect(() => ast.utils.surrounded([{value: '1'}, {}, {value: '3'}])).to.throw(TypeError);

            });

            it('should throw a TypeError if the data to unwrap does not contain a valid tokens', () => {

                expect(() => ast.utils.surrounded(['1', new AstNumber(1), {value: '3'}])).to.throw(TypeError);
                expect(() => ast.utils.surrounded([{value: '1'}, new AstNumber(1), '3'])).to.throw(TypeError);

            });

        });

        describe('discard', () => {

            it('should returns null whatever the input is', () => {

                expect(ast.utils.discard(42)).to.be.null;
                expect(ast.utils.discard(true)).to.be.null;
                expect(ast.utils.discard("foo bar")).to.be.null;
                expect(ast.utils.discard([1, 2, 3])).to.be.null;
                expect(ast.utils.discard({foo: "bar"})).to.be.null;

            });

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
            const node = ast.terminal(token, token.value, 'string');

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
            const node = ast.terminal(token, token.value, 'AstString');

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
            const node = ast.terminal(token, token.value, ast.nodes.AstString);

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
            const node = ast.terminal(token, token.value, 'AstString');

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
            const node = ast.terminal(token, token.value, 'string');

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
            const node = ast.terminal(token, token.value, ast.nodes.AstString);

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

            expect(() => ast.terminal(token, token.value, 'foo')).to.throw(TypeError);
            expect(() => ast.terminal(token, token.value, {})).to.throw(TypeError);
            expect(() => ast.terminal(token, token.value, () => {})).to.throw(TypeError);
        });

        it('should throw a TypeError if the created node is not an AstFragment', () => {
            class AstFoo extends AstNode {
                constructor() {
                    super('foo');
                }
            }
            const token = {
                value: 'foo',
                line: 2,
                col: 7,
                offset: 12
            };

            expect(() => ast.terminal(token, token.value, AstFoo)).to.throw(TypeError);
        });

    });

    describe('number', () => {

        it('should create an AstNumber', () => {
            const value = 42;
            const node = ast.number(value);
            expect(node).to.be.an.instanceOf(AstNumber);
            expect(node).to.have.a.property('type').that.is.equal('number');
            expect(node).to.have.a.property('value').that.is.equal(value);
        });

    });

    describe('string', () => {

        it('should create an AstString', () => {
            const value = 'foo';
            const node = ast.string(value);
            expect(node).to.be.an.instanceOf(AstString);
            expect(node).to.have.a.property('type').that.is.equal('string');
            expect(node).to.have.a.property('value').that.is.equal(value);
        });

    });

    describe('path', () => {

        it('should create an AstPath', () => {
            const value = './foo/bar.scad';
            const node = ast.path(value);
            expect(node).to.be.an.instanceOf(AstPath);
            expect(node).to.have.a.property('type').that.is.equal('path');
            expect(node).to.have.a.property('value').that.is.equal(value);
        });

    });

    describe('identifier', () => {

        it('should create an AstIdentifier', () => {
            const value = 'foo';
            const node = ast.identifier(value);
            expect(node).to.be.an.instanceOf(AstIdentifier);
            expect(node).to.have.a.property('type').that.is.equal('identifier');
            expect(node).to.have.a.property('value').that.is.equal(value);
        });

    });

    describe('boolean', () => {

        it('should create an AstIdentifier', () => {
            const value = true;
            const node = ast.boolean(value);
            expect(node).to.be.an.instanceOf(AstBoolean);
            expect(node).to.have.a.property('type').that.is.equal('boolean');
            expect(node).to.have.a.property('value').that.is.equal(value);
        });

    });

    describe('undefined', () => {

        it('should create an AstUndefined', () => {
            const value = null;
            const node = ast.undefined(value);
            expect(node).to.be.an.instanceOf(AstUndefined);
            expect(node).to.have.a.property('type').that.is.equal('undefined');
            expect(node).to.have.a.property('value').that.is.equal(value);
        });

    });

    describe('lineComment', () => {

        it('should create an AstLineComment', () => {
            const value = 'foo';
            const node = ast.lineComment(value);
            expect(node).to.be.an.instanceOf(AstLineComment);
            expect(node).to.have.a.property('type').that.is.equal('lineComment');
            expect(node).to.have.a.property('value').that.is.equal(value);
        });

    });

    describe('blockComment', () => {

        it('should create an AstBlockComment', () => {
            const value = 'foo';
            const node = ast.blockComment(value);
            expect(node).to.be.an.instanceOf(AstBlockComment);
            expect(node).to.have.a.property('type').that.is.equal('blockComment');
            expect(node).to.have.a.property('value').that.is.deep.equal([value]);
        });

    });

    describe('binaryOperator', () => {

        it('should create an AstBinaryOperator', () => {
            const operator = '+';
            const leftValue = ast.number(20);
            const rightValue = ast.number(22);
            const node = ast.binaryOperator(leftValue, operator, rightValue);
            expect(node).to.be.an.instanceOf(AstBinaryOperator);
            expect(node).to.have.a.property('type').that.is.equal('binaryOperator');
            expect(node).to.have.a.property('operator').that.is.equal(operator);
            expect(node).to.have.a.property('leftValue').that.is.equal(leftValue);
            expect(node).to.have.a.property('rightValue').that.is.equal(rightValue);
        });

    });

    describe('unaryOperator', () => {

        it('should create an AstUnaryOperator', () => {
            const operator = '-';
            const value = ast.number(42);
            const node = ast.unaryOperator(operator, value);
            expect(node).to.be.an.instanceOf(AstUnaryOperator);
            expect(node).to.have.a.property('type').that.is.equal('unaryOperator');
            expect(node).to.have.a.property('operator').that.is.equal(operator);
            expect(node).to.have.a.property('value').that.is.equal(value);
        });

    });

});
