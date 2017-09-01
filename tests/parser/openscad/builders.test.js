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
 * Unit tests: Builders that will produce the AST nodes from the OpenSCAD language parser.
 *
 * @package tests/parser/openscad
 * @author jsconan
 */

const _ = require('lodash');
const chai = require('chai');
const expect = chai.expect;

const ast = require('./../../../src/ast/ast');
const builders = require('./../../../src/parser/openscad/builders');
const buildersTestCases = require('./builders-test-cases.json');

describe('OpenSCAD AST builders', () => {

    // unit tests for the builders that operate on terminals
    // the test cases are defined inside the JSON file ./builders-test-cases.json
    _.forEach(buildersTestCases, (testCases, category) => {

        // the test cases are gathered by categories
        describe(category, () => {
            _.forEach(testCases, (testCase) => {
                // wrap each test case
                it(testCase.title, () => {
                    const doCall = _.bind(builders[testCase.method], builders, testCase.input);

                    if (testCase.error) {
                        // it may lead to an error as the input token could be incompatible
                        expect(doCall).to.throw();
                    } else {
                        const descriptor = doCall();
                        if (testCase.output) {
                            // the builder should return the expected descriptor
                            expect(descriptor).to.be.an('object');
                            expect(descriptor).to.deep.include(testCase.output);
                        } else {
                            // the builder should return the expected value
                            expect(descriptor).to.equal(testCase.output);
                        }
                    }
                });
            });
        })

    });

    describe('unaryOperator', () => {

        it('should produce the descriptor for the unary operator expression "-2"', () => {
            const value = ast.number(2);
            const node = ast.unaryOperator('-', value);
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

            expect(builders.unaryOperator(input)).to.be.deep.equal(node);
        });

        it('should produce the descriptor for the unary operator expression "+3"', () => {
            const value = ast.number(3);
            const node = ast.unaryOperator('+', value);
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

            expect(builders.unaryOperator(input)).to.be.deep.equal(node);
        });

        it('should forward the existing descriptor for the unary operator expression "-5"', () => {
            const value = ast.number(5);
            const node = ast.unaryOperator('-', value);
            const input = [node];

            expect(builders.unaryOperator(input)).to.be.deep.equal(node);
        });

    });

    describe('binaryOperator', () => {

        it('should produce the descriptor for the binary operator expression "1+2"', () => {
            const left = ast.number(1);
            const right = ast.number(2);
            const node = ast.binaryOperator(left, '+', right);
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

            expect(builders.binaryOperator(input)).to.be.deep.equal(node);
        });

        it('should produce the descriptor for the binary operator expression "3-2"', () => {
            const left = ast.number(3);
            const right = ast.number(2);
            const node = ast.binaryOperator(left, '-', right);
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

            expect(builders.binaryOperator(input)).to.be.deep.equal(node);
        });

        it('should forward the existing descriptor for the binary operator expression "2*4"', () => {
            const left = ast.number(2);
            const right = ast.number(4);
            const node = ast.binaryOperator(left, '*', right);
            const input = [node];

            expect(builders.binaryOperator(input)).to.be.deep.equal(node);
        });

    });

});
