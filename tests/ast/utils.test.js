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

const AstNode = require('./../../src/ast/node');
const AstPosition = require('./../../src/ast/position');
const AstFragment = require('./../../src/ast/fragment');
const AstNumber = require('./../../src/ast/number');
const AstString = require('./../../src/ast/string');
const AstIdentifier = require('./../../src/ast/identifier');

describe('OpenSCAD AST utils', () => {

    describe('is', () => {

        it('should check using a class constructor', () => {

            const node = new AstNode('node');
            const number = new AstNumber(42);

            expect(utils.is(node, AstNode)).to.be.equal(true);
            expect(utils.is(node, AstFragment)).to.be.equal(false);

            expect(utils.is(number, AstNode)).to.be.equal(true);
            expect(utils.is(number, AstFragment)).to.be.equal(true);
            expect(utils.is(number, AstNumber)).to.be.equal(true);
            expect(utils.is(number, AstString)).to.be.equal(false);
            expect(utils.is(number, _.noop)).to.be.equal(false);

            expect(utils.is({}, AstNode)).to.be.equal(false);
            expect(utils.is(42, AstNode)).to.be.equal(false);

        });

        it('should check using a class name', () => {

            const node = new AstNode('node');
            const number = new AstNumber(42);

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

    describe('startPosition', () => {

        it('should create a start AstPosition from the provided token', () => {
            const token = {
                line: 2,
                col: 7,
                offset: 12
            };
            const node = utils.startPosition(token);

            expect(node).to.be.an.instanceOf(AstPosition);
            expect(node).to.have.property('line').that.is.equal(token.line);
            expect(node).to.have.property('column').that.is.equal(token.col);
            expect(node).to.have.property('offset').that.is.equal(token.offset);
        });

        it('should return the start position of the provided AstFragment', () => {
            const fragment = new AstNumber(1);
            fragment.startAt(1, 1, 0);
            fragment.endAt(1, 2, 1);

            const node = utils.startPosition(fragment);

            expect(node).to.be.an.instanceOf(AstPosition);
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

            expect(node).to.be.an.instanceOf(AstPosition);
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

            expect(node).to.be.an.instanceOf(AstPosition);
            expect(node).to.have.property('line').that.is.equal(token.line + 2);
            expect(node).to.have.property('column').that.is.equal(4);
            expect(node).to.have.property('offset').that.is.equal(token.offset + token.text.length);
        });

        it('should return the end position of the provided AstFragment', () => {
            const fragment = new AstNumber(1);
            fragment.startAt(1, 1, 0);
            fragment.endAt(1, 2, 1);

            const node = utils.endPosition(fragment);

            expect(node).to.be.an.instanceOf(AstPosition);
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

    describe('surrounded', () => {

        it('should unwrap the nested AST node and update the position accordingly to the sibling tokens', () => {

            const left = {
                text: '(',
                line: 1,
                col: 2,
                offset: 1
            };
            const node = new AstNumber(3);
            const right = {
                text: ')',
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

            const output = utils.surrounded([left, [node, [right]]]);

            expect(output).to.be.not.equal(node);
            expect(output.start.offset).to.be.equal(left.offset);
            expect(output.start.column).to.be.equal(left.col);
            expect(output.end.offset).to.be.equal(right.offset + right.text.length);
            expect(output.end.column).to.be.equal(right.col + right.text.length);

        });

        it('should unwrap the nested AST node and update the position accordingly to the sibling nodes', () => {

            const left = new AstIdentifier('foo');
            const right = new AstIdentifier('bar');
            const node = new AstNumber(3);

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

            const output = utils.surrounded([[[left], [node]], [right]]);

            expect(output).to.be.not.equal(node);
            expect(output.start.offset).to.be.equal(left.start.offset);
            expect(output.start.column).to.be.equal(left.start.column);
            expect(output.end.offset).to.be.equal(right.end.offset);
            expect(output.end.column).to.be.equal(right.end.column);

        });

        it('should unwrap the nested AST node and update the position accordingly to the sibling nodes/tokens whatever the nested depth is', () => {

            const left = new AstIdentifier('foo');
            const node = new AstNumber(3);
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

            expect(node.start.offset).to.be.equal(4);
            expect(node.start.column).to.be.equal(5);
            expect(node.end.offset).to.be.equal(5);
            expect(node.end.column).to.be.equal(6);

            const output = utils.surrounded([left, node, right]);

            expect(output).to.be.not.equal(node);
            expect(output.start.offset).to.be.equal(left.start.offset);
            expect(output.start.column).to.be.equal(left.start.column);
            expect(output.end.offset).to.be.equal(right.offset + right.text.length);
            expect(output.end.column).to.be.equal(right.col + right.text.length);

        });

        it('should straight returns the data if there is only one element', () => {

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

            expect(() => utils.surrounded(['1', new AstNumber(1), {value: '3'}])).to.throw(TypeError);
            expect(() => utils.surrounded([{value: '1'}, new AstNumber(1), '3'])).to.throw(TypeError);

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

        it('should throw a TypeError if the array contains more than one element', () => {

            expect(() => utils.forward([1, 2])).to.throw(TypeError);

        });

    });

    describe('head', () => {

        it('should straight returns the value if it is not an array', () => {

            const values = [
                42,
                true,
                "foo bar",
                {foo: "bar"}
            ];

            values.forEach((value) => {
                expect(utils.head(value)).to.be.equal(value);
            });

        });

        it('should returns the first element of the array', () => {

            const values = [
                [],
                [42, 43, 44],
                [true, false],
                ["foo bar", "bar foo", "hello"],
                [{foo: "bar"}, {bar: "foo"}]
            ];

            values.forEach((value) => {
                expect(utils.head(value)).to.be.equal(value[0]);
            });

        });

    });

    describe('tail', () => {

        it('should straight returns the value if it is not an array', () => {

            const values = [
                42,
                true,
                "foo bar",
                {foo: "bar"}
            ];

            values.forEach((value) => {
                expect(utils.tail(value)).to.be.equal(value);
            });

        });

        it('should returns the last element of the array', () => {

            const values = [
                [],
                [42, 43, 44],
                [true, false],
                ["foo bar", "bar foo", "hello"],
                [{foo: "bar"}, {bar: "foo"}]
            ];

            values.forEach((value) => {
                expect(utils.tail(value)).to.be.equal(value[value.length - 1]);
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
