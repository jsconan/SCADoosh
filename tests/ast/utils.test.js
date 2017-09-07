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
 * Unit tests: AST utility helpers.
 *
 * @package tests/ast
 * @author jsconan
 */

const _ = require('lodash');
const chai = require('chai');
const expect = chai.expect;

const utils = require('./../../src/ast/utils');
const classes = require('./../../src/ast/classes');

describe('AST utils', () => {

    describe('is', () => {

        it('should check using a class constructor', () => {

            const node = new classes.AstNode('node');
            const number = new classes.AstNumber(42);

            expect(utils.is(node, classes.AstNode)).to.be.equal(true);
            expect(utils.is(node, classes.AstFragment)).to.be.equal(false);

            expect(utils.is(number, classes.AstNode)).to.be.equal(true);
            expect(utils.is(number, classes.AstFragment)).to.be.equal(true);
            expect(utils.is(number, classes.AstNumber)).to.be.equal(true);
            expect(utils.is(number, classes.AstString)).to.be.equal(false);
            expect(utils.is(number, _.noop)).to.be.equal(false);

            expect(utils.is({}, classes.AstNode)).to.be.equal(false);
            expect(utils.is(42, classes.AstNode)).to.be.equal(false);

        });

        it('should check using a class name', () => {

            const node = new classes.AstNode('node');
            const number = new classes.AstNumber(42);

            expect(utils.is(node, 'AstNode')).to.be.equal(true);
            expect(utils.is(node, 'AstFragment')).to.be.equal(false);

            expect(utils.is(number, 'AstNode')).to.be.equal(true);
            expect(utils.is(number, 'AstFragment')).to.be.equal(true);
            expect(utils.is(number, 'AstNumber')).to.be.equal(true);
            expect(utils.is(number, 'AstString')).to.be.equal(false);
            expect(utils.is(number, 'number')).to.be.equal(false);

            expect(utils.is({}, 'AstNode')).to.be.equal(false);
            expect(utils.is(42, 'AstNode')).to.be.equal(false);

        });

    });

    describe('getClass', () => {

        it('should get the class from a name', () => {
            expect(utils.getClass('AstNode')).to.be.equal(classes.AstNode);
            expect(utils.getClass('AstNumber')).to.be.equal(classes.AstNumber);
            expect(utils.getClass('AstLiteral')).to.be.equal(classes.AstLiteral);
        });

        it('should straight retun the provided class if valid', () => {
            class AstFoo extends classes.AstNode {
            }

            function Cls() {
            }

            expect(utils.getClass(classes.AstNode)).to.be.equal(classes.AstNode);
            expect(utils.getClass(classes.AstNumber)).to.be.equal(classes.AstNumber);
            expect(utils.getClass(classes.AstLiteral)).to.be.equal(classes.AstLiteral);
            expect(utils.getClass(AstFoo)).to.be.equal(AstFoo);
            expect(utils.getClass(Cls)).to.be.equal(Cls);
        });

        it('should throw a TypeError if the AST class is not valid', () => {
            expect(() => utils.getClass('')).to.throw(TypeError);
            expect(() => utils.getClass('foo')).to.throw(TypeError);
            expect(() => utils.getClass({})).to.throw(TypeError);
        });

    });

    describe('startPosition', () => {

        it('should create a start AstPosition from the provided token', () => {
            const token = {
                line: 2,
                col: 7,
                offset: 12
            };
            const node = utils.startPosition(token);

            expect(node).to.be.an.instanceOf(classes.AstPosition);
            expect(node).to.have.property('line').that.is.equal(token.line);
            expect(node).to.have.property('column').that.is.equal(token.col);
            expect(node).to.have.property('offset').that.is.equal(token.offset);
        });

        it('should return the start position of the provided AstFragment', () => {
            const fragment = new classes.AstNumber(1);
            fragment.startAt(1, 1, 0);
            fragment.endAt(1, 2, 1);

            const node = utils.startPosition(fragment);

            expect(node).to.be.an.instanceOf(classes.AstPosition);
            expect(node).to.be.equal(fragment.start);
        });

        it('should throw a TypeError if the provided token is wrong', () => {
            expect(() => utils.startPosition({})).to.throw(TypeError);
            expect(() => utils.startPosition('')).to.throw(TypeError);
            expect(() => utils.startPosition({line: -1, col: 1, offset: 0})).to.throw(TypeError);
            expect(() => utils.startPosition({line: 1, col: -1, offset: 0})).to.throw(TypeError);
            expect(() => utils.startPosition({line: 1, col: 1, offset: -1})).to.throw(TypeError);
        });

    });

    describe('endPosition', () => {

        it('should create an end AstPosition from the provided token (single line)', () => {
            const token = {
                text: 'foo',
                line: 2,
                col: 7,
                offset: 12
            };
            const node = utils.endPosition(token);

            expect(node).to.be.an.instanceOf(classes.AstPosition);
            expect(node).to.have.property('line').that.is.equal(token.line);
            expect(node).to.have.property('column').that.is.equal(token.col + token.text.length);
            expect(node).to.have.property('offset').that.is.equal(token.offset + token.text.length);
        });

        it('should create an end AstPosition from the provided token (multi lines)', () => {
            const token = {
                text: '\nfoo\nbar',
                line: 2,
                col: 7,
                offset: 12
            };
            const node = utils.endPosition(token);

            expect(node).to.be.an.instanceOf(classes.AstPosition);
            expect(node).to.have.property('line').that.is.equal(token.line + 2);
            expect(node).to.have.property('column').that.is.equal(4);
            expect(node).to.have.property('offset').that.is.equal(token.offset + token.text.length);
        });

        it('should return the end position of the provided AstFragment', () => {
            const fragment = new classes.AstNumber(1);
            fragment.startAt(1, 1, 0);
            fragment.endAt(1, 2, 1);

            const node = utils.endPosition(fragment);

            expect(node).to.be.an.instanceOf(classes.AstPosition);
            expect(node).to.be.equal(fragment.end);
        });

        it('should throw a TypeError if the provided token is wrong', () => {
            expect(() => utils.endPosition({})).to.throw(TypeError);
            expect(() => utils.endPosition('')).to.throw(TypeError);
            expect(() => utils.endPosition({text: '', line: -5, col: 1, offset: 0})).to.throw(TypeError);
            expect(() => utils.endPosition({text: '', line: 1, col: -5, offset: 0})).to.throw(TypeError);
            expect(() => utils.endPosition({text: '', line: 1, col: 1, offset: -5})).to.throw(TypeError);
        });

    });

    describe('setPosition', () => {

        it('should set the position accordingly to the surrounding tokens', () => {

            const data = [{
                text: '(',
                line: 1,
                col: 2,
                offset: 1
            }, {}, {}, {
                text: ')',
                line: 1,
                col: 5,
                offset: 4
            }];

            const node = new classes.AstNumber(42);

            expect(utils.setPosition(node, data)).to.be.equal(node);
            expect(node).to.have.a.property('start').that.is.an.instanceOf(classes.AstPosition);
            expect(node).to.have.a.property('end').that.is.an.instanceOf(classes.AstPosition);

            expect(node.start.line).to.be.equal(1);
            expect(node.start.column).to.be.equal(2);
            expect(node.start.offset).to.be.equal(1);

            expect(node.end.line).to.be.equal(1);
            expect(node.end.column).to.be.equal(6);
            expect(node.end.offset).to.be.equal(5);

        });

        it('should set the position accordingly to the provided token', () => {

            const data = {
                text: '42',
                line: 1,
                col: 2,
                offset: 1
            };

            const node = new classes.AstNumber(42);

            expect(utils.setPosition(node, data)).to.be.equal(node);
            expect(node).to.have.a.property('start').that.is.an.instanceOf(classes.AstPosition);
            expect(node).to.have.a.property('end').that.is.an.instanceOf(classes.AstPosition);

            expect(node.start.line).to.be.equal(1);
            expect(node.start.column).to.be.equal(2);
            expect(node.start.offset).to.be.equal(1);

            expect(node.end.line).to.be.equal(1);
            expect(node.end.column).to.be.equal(4);
            expect(node.end.offset).to.be.equal(3);

        });

        it('should throw a TypeError if the node is not an AstFragment', () => {
            const data = [{
                text: '(',
                line: 1,
                col: 2,
                offset: 1
            }, {}, {}, {
                text: ')',
                line: 1,
                col: 5,
                offset: 4
            }];

            expect(() => utils.setPosition({}, data)).to.throw(TypeError);
            expect(() => utils.setPosition(new classes.AstNode('foo'), data)).to.throw(TypeError);

        });

    });

    describe('surrounded', () => {

        it('should unwrap the nested AST node and update the position accordingly to the sibling tokens', () => {

            const left = {
                text: '(',
                line: 1,
                col: 2,
                offset: 1
            };
            const node = new classes.AstNumber(3);
            const right = {
                text: ')',
                line: 1,
                col: 5,
                offset: 4
            };

            node.startAt(1, 3, 2);
            node.endAt(1, 4, 3);

            expect(node.start.line).to.be.equal(1);
            expect(node.start.column).to.be.equal(3);
            expect(node.start.offset).to.be.equal(2);
            expect(node.end.line).to.be.equal(1);
            expect(node.end.column).to.be.equal(4);
            expect(node.end.offset).to.be.equal(3);

            const output = utils.surrounded([left, [node, [right]]]);

            expect(output).to.be.not.equal(node);
            expect(output.start.line).to.be.equal(left.line);
            expect(output.start.column).to.be.equal(left.col);
            expect(output.start.offset).to.be.equal(left.offset);
            expect(output.end.line).to.be.equal(right.line);
            expect(output.end.column).to.be.equal(right.col + right.text.length);
            expect(output.end.offset).to.be.equal(right.offset + right.text.length);

        });

        it('should unwrap the nested AST node and update the position accordingly to the sibling nodes', () => {

            const left = new classes.AstIdentifier('foo');
            const right = new classes.AstIdentifier('bar');
            const node = new classes.AstNumber(3);

            left.startAt(1, 1, 0);
            left.endAt(1, 4, 3);

            right.startAt(2, 6, 5);
            right.endAt(2, 9, 8);

            node.startAt(1, 5, 4);
            node.endAt(1, 6, 5);

            expect(node.start.line).to.be.equal(1);
            expect(node.start.column).to.be.equal(5);
            expect(node.start.offset).to.be.equal(4);
            expect(node.end.line).to.be.equal(1);
            expect(node.end.column).to.be.equal(6);
            expect(node.end.offset).to.be.equal(5);

            const output = utils.surrounded([[[left], [node]], [right]]);

            expect(output).to.be.not.equal(node);
            expect(output.start.line).to.be.equal(left.start.line);
            expect(output.start.column).to.be.equal(left.start.column);
            expect(output.start.offset).to.be.equal(left.start.offset);
            expect(output.end.line).to.be.equal(right.end.line);
            expect(output.end.column).to.be.equal(right.end.column);
            expect(output.end.offset).to.be.equal(right.end.offset);

        });

        it('should unwrap the nested AST node and update the position accordingly to the sibling nodes/tokens whatever the nested depth is', () => {

            const left = new classes.AstIdentifier('foo');
            const node = new classes.AstNumber(3);
            const right = {
                text: 'bar',
                line: 1,
                col: 6,
                offset: 5
            };

            left.startAt(1, 1, 0);
            left.endAt(1, 4, 3);

            node.startAt(1, 5, 4);
            node.endAt(1, 6, 5);

            expect(node.start.line).to.be.equal(1);
            expect(node.start.column).to.be.equal(5);
            expect(node.start.offset).to.be.equal(4);
            expect(node.end.line).to.be.equal(1);
            expect(node.end.column).to.be.equal(6);
            expect(node.end.offset).to.be.equal(5);

            const output = utils.surrounded([left, node, right]);

            expect(output).to.be.not.equal(node);
            expect(output.start.line).to.be.equal(left.start.line);
            expect(output.start.column).to.be.equal(left.start.column);
            expect(output.start.offset).to.be.equal(left.start.offset);
            expect(output.end.line).to.be.equal(right.line);
            expect(output.end.column).to.be.equal(right.col + right.text.length);
            expect(output.end.offset).to.be.equal(right.offset + right.text.length);

        });

        it('should straight return the data if there is only one element', () => {

            [
                42,
                true,
                "foo bar",
                {foo: "bar"}
            ].forEach((value) => {
                expect(utils.surrounded(value)).to.be.equal(value);
            });

            [
                [42],
                [true],
                ["foo bar"],
                [{foo: "bar"}]
            ].forEach((value) => {
                expect(utils.surrounded(value)).to.be.equal(value[0]);
            });

        });

        it('should throw a TypeError if the data does not contains the right number of elements', () => {

            expect(() => utils.surrounded([1, 2])).to.throw(TypeError);

        });

        it('should throw a TypeError if the data to unwrap does not contain a valid AST node', () => {

            expect(() => utils.surrounded([{value: '1'}, {}, {value: '3'}])).to.throw(TypeError);

        });

        it('should throw a TypeError if the data to unwrap does not contain a valid tokens', () => {

            expect(() => utils.surrounded(['1', new classes.AstNumber(1), {value: '3'}])).to.throw(TypeError);
            expect(() => utils.surrounded([{value: '1'}, new classes.AstNumber(1), '3'])).to.throw(TypeError);

        });

    });

    describe('forward', () => {

        it('should straight return the value if it is not an array', () => {

            [
                {
                    text: ';',
                    line: 1,
                    col: 3,
                    offset: 2
                },
                new classes.AstNumber(42)
            ].forEach((value) => {
                expect(utils.forward(value)).to.be.equal(value);
            });

        });

        it('should return the first element of the array', () => {

            [
                [{
                    text: ';',
                    line: 1,
                    col: 3,
                    offset: 2
                }],
                [new classes.AstNumber(42)]
            ].forEach((value) => {
                expect(utils.forward(value)).to.be.equal(value[0]);
            });

            [
                [[{
                    text: ';',
                    line: 1,
                    col: 3,
                    offset: 2
                }]],
                [[new classes.AstNumber(42)]]
            ].forEach((value) => {
                expect(utils.forward(value)).to.be.equal(value[0][0]);
            });

        });

        it('should throw a TypeError if the array contains more than one element', () => {

            expect(() => utils.forward([1, 2])).to.throw(TypeError);

        });

    });

    describe('head', () => {

        it('should straight return the value if it is not an array', () => {

            [
                {
                    text: ';',
                    line: 1,
                    col: 3,
                    offset: 2
                },
                new classes.AstNumber(42)
            ].forEach((value) => {
                expect(utils.head(value)).to.be.equal(value);
            });

        });

        it('should return the first element of the array', () => {

            [
                [{
                    text: 'echo',
                    line: 1,
                    col: 3,
                    offset: 2
                }, {
                    text: 'hello',
                    line: 1,
                    col: 8,
                    offset: 7
                }, {
                    text: ';',
                    line: 1,
                    col: 10,
                    offset: 9
                }],
                [
                    new classes.AstNumber(42)
                ]
            ].forEach((value) => {
                expect(utils.head(value)).to.be.equal(value[0]);
            });

            [
                [[{
                    text: 'echo',
                    line: 1,
                    col: 3,
                    offset: 2
                }], [{
                    text: 'hello',
                    line: 1,
                    col: 8,
                    offset: 7
                }, {
                    text: ';',
                    line: 1,
                    col: 10,
                    offset: 9
                }]],
                [
                    [
                        new classes.AstNumber(42)
                    ]
                ]
            ].forEach((value) => {
                expect(utils.head(value)).to.be.equal(value[0][0]);
            });

        });

        it('should return the first element of the array and update the position', () => {

            const node = new classes.AstNumber(42);
            const token = {
                text: ';',
                line: 1,
                col: 3,
                offset: 2
            };

            node.startAt(1, 1, 0);
            node.endAt(1, 3, 2);

            const output = utils.head([[node, [token]]]);

            expect(output).to.be.an.instanceOf(classes.AstNumber);
            expect(output.start.line).to.be.equal(1);
            expect(output.start.column).to.be.equal(1);
            expect(output.start.offset).to.be.equal(0);
            expect(output.end.line).to.be.equal(token.line);
            expect(output.end.column).to.be.equal(token.col + token.text.length);
            expect(output.end.offset).to.be.equal(token.offset + token.text.length);

        });

    });

    describe('tail', () => {

        it('should straight return the value if it is not an array', () => {

            [
                {
                    text: ';',
                    line: 1,
                    col: 3,
                    offset: 2
                },
                new classes.AstNumber(42)
            ].forEach((value) => {
                expect(utils.tail(value)).to.be.equal(value);
            });

        });

        it('should return the last element of the array', () => {

            [
                [{
                    text: 'echo',
                    line: 1,
                    col: 3,
                    offset: 2
                }, {
                    text: 'hello',
                    line: 1,
                    col: 8,
                    offset: 7
                }, {
                    text: ';',
                    line: 1,
                    col: 10,
                    offset: 9
                }],
                [
                    new classes.AstNumber(42)
                ]
            ].forEach((value) => {
                expect(utils.tail(value)).to.be.equal(value[value.length - 1]);
            });

            [
                [[{
                    text: 'echo',
                    line: 1,
                    col: 3,
                    offset: 2
                }], [{
                    text: 'hello',
                    line: 1,
                    col: 8,
                    offset: 7
                }, {
                    text: ';',
                    line: 1,
                    col: 10,
                    offset: 9
                }]],
                [
                    [
                        new classes.AstNumber(42)
                    ]
                ]
            ].forEach((value) => {
                const v = value[value.length - 1];
                expect(utils.tail(value)).to.be.equal(v[v.length - 1]);
            });

        });

        it('should return the last element of the array and update the position', () => {

            const node = new classes.AstNumber(42);
            const token = {
                text: 'echo',
                line: 1,
                col: 1,
                offset: 0
            };

            node.startAt(1, 6, 5);
            node.endAt(1, 9, 8);

            const output = utils.tail([[token], [node]]);

            expect(output).to.be.an.instanceOf(classes.AstNumber);
            expect(output.start.line).to.be.equal(1);
            expect(output.start.column).to.be.equal(1);
            expect(output.start.offset).to.be.equal(0);
            expect(output.end.line).to.be.equal(1);
            expect(output.end.column).to.be.equal(9);
            expect(output.end.offset).to.be.equal(8);

        });

    });

    describe('flatten', () => {

        it('should flatten the array', () => {
            expect(utils.flatten([[[{foo: 'bar'}], 42], [[{bar: 'foo'}]], [42]])).to.be.deep.equal([{foo: 'bar'}, 42, {bar: 'foo'}, 42]);
        });

        it('should force the array', () => {
            expect(utils.flatten(42)).to.be.deep.equal([42]);
            expect(utils.flatten({foo: 'bar'})).to.be.deep.equal([{foo: 'bar'}]);
        });

    });

    describe('discard', () => {

        it('should return null whatever the input is', () => {

            expect(utils.discard(42)).to.be.null;
            expect(utils.discard(true)).to.be.null;
            expect(utils.discard("foo bar")).to.be.null;
            expect(utils.discard([1, 2, 3])).to.be.null;
            expect(utils.discard({foo: "bar"})).to.be.null;

        });

    });

});
