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
 * Unit tests: Lexer that recognizes the tokens of the OpenSCAD language.
 *
 * @package tests/parser/openscad
 * @author jsconan
 */

const _ = require('lodash');
const chai = require('chai');
const expect = chai.expect;

const openScadLexer = require('./../../../src/parser/openscad/lexer');
const lexerTokenSchema = require('./../lexer-token-schema.json');
const lexerTestCases = require('./lexer-test-cases.json');

chai.use(require('chai-json-schema'));

describe('OpenSCAD lexer', () => {

    it('should be a valid lexer', () => {
        const lexer = openScadLexer();
        expect(lexer).to.be.an('object');
        expect(lexer).to.have.a.property('next').that.is.a('function');
        expect(lexer).to.have.a.property('save').that.is.a('function');
        expect(lexer).to.have.a.property('reset').that.is.a('function');
        expect(lexer).to.have.a.property('formatError').that.is.a('function');
        expect(lexer).to.have.a.property('has').that.is.a('function');
    });

    describe('tokens', () => {

        // the test cases are defined inside the JSON file ./lexer-test-cases.json
        _.forEach(lexerTestCases, (testCases, category) => {

            // the test cases are gathered by categories
            describe(category, () => {
                _.forEach(testCases, (testCase) => {

                    // the title can contains placeholders
                    const title = testCase.title.replace('%input', JSON.stringify(testCase.input));

                    // wrap each test case
                    it(title, () => {
                        const lexer = openScadLexer(testCase.input);

                        // sometimes no token is expected
                        if (testCase.output.length === 0) {
                            expect(lexer.next()).to.be.undefined;
                        } else {
                            // in most of cases there are one or more expected tokens
                            const success = _.every(testCase.output, (expectedToken) => {
                                if (expectedToken === false) {
                                    // it may lead to an error as the token should not be parsed
                                    expect(lexer.next).to.throw();
                                    return false;
                                } else {
                                    // recognized token
                                    const token = lexer.next();
                                    expect(token).to.be.an('object');
                                    expect(token).to.be.jsonSchema(lexerTokenSchema);
                                    expect(token).to.include(expectedToken);
                                    return true;
                                }
                            });

                            // once the source has been successfully parsed, no other token should be found
                            if (success) {
                                expect(lexer.next()).to.be.undefined;
                            }
                        }
                    });
                });
            });
        });

    });

    describe('next', () => {

        it('should return a token object', () => {
            const lexer = openScadLexer('42 foo');

            const token1 = lexer.next();
            expect(token1).to.be.an('object');
            expect(token1).to.have.property('type').that.is.equal('number');
            expect(token1).to.have.property('value').that.is.equal('42');
            expect(token1).to.have.property('text').that.is.equal('42');
            expect(token1).to.have.property('line').that.is.equal(1);
            expect(token1).to.have.property('col').that.is.equal(1);
            expect(token1).to.have.property('offset').that.is.equal(0);

            const token2 = lexer.next();
            expect(token2).to.be.an('object');
            expect(token2).to.have.property('type').that.is.equal('identifier');
            expect(token2).to.have.property('value').that.is.equal('foo');
            expect(token2).to.have.property('text').that.is.equal('foo');
            expect(token2).to.have.property('line').that.is.equal(1);
            expect(token2).to.have.property('col').that.is.equal(4);
            expect(token2).to.have.property('offset').that.is.equal(3);

            const token3 = lexer.next();
            expect(token3).to.be.undefined;
        });

    });

    describe('save', () => {

        it('should return an info object that describes the current state of the lexer', () => {
            const lexer = openScadLexer('42 foo 123');

            const token1 = lexer.next();
            expect(token1).to.be.an('object');
            expect(token1).to.have.property('type').that.is.equal('number');
            expect(token1).to.have.property('value').that.is.equal('42');
            expect(token1).to.have.property('text').that.is.equal('42');
            expect(token1).to.have.property('line').that.is.equal(1);
            expect(token1).to.have.property('col').that.is.equal(1);
            expect(token1).to.have.property('offset').that.is.equal(0);

            const info = lexer.save();
            expect(info).to.be.an('object');
            expect(info).to.have.property('line').that.is.equal(1);
            expect(info).to.have.property('col').that.is.equal(3);
            expect(info).to.have.property('state').that.is.equal('start');
        });

    });

    describe('reset', () => {

        it('should reset the state', () => {
            const lexer = openScadLexer('42 foo 123');

            const token1 = lexer.next();
            expect(token1).to.be.an('object');
            expect(token1).to.have.property('type').that.is.equal('number');
            expect(token1).to.have.property('value').that.is.equal('42');
            expect(token1).to.have.property('text').that.is.equal('42');
            expect(token1).to.have.property('line').that.is.equal(1);
            expect(token1).to.have.property('col').that.is.equal(1);
            expect(token1).to.have.property('offset').that.is.equal(0);

            const info = lexer.save();
            expect(info).to.be.an('object');
            expect(info).to.have.property('line').that.is.equal(1);
            expect(info).to.have.property('col').that.is.equal(3);
            expect(info).to.have.property('state').that.is.equal('start');

            const token2 = lexer.next();
            expect(token2).to.be.an('object');
            expect(token2).to.have.property('type').that.is.equal('identifier');
            expect(token2).to.have.property('value').that.is.equal('foo');
            expect(token2).to.have.property('text').that.is.equal('foo');
            expect(token2).to.have.property('line').that.is.equal(1);
            expect(token2).to.have.property('col').that.is.equal(4);
            expect(token2).to.have.property('offset').that.is.equal(3);

            const token3 = lexer.next();
            expect(token3).to.be.an('object');
            expect(token3).to.have.property('type').that.is.equal('number');
            expect(token3).to.have.property('value').that.is.equal('123');
            expect(token3).to.have.property('text').that.is.equal('123');
            expect(token3).to.have.property('line').that.is.equal(1);
            expect(token3).to.have.property('col').that.is.equal(8);
            expect(token3).to.have.property('offset').that.is.equal(7);

            expect(lexer.next()).to.be.undefined;

            lexer.reset('bar', info);

            const token4 = lexer.next();
            expect(token4).to.be.an('object');
            expect(token4).to.have.property('type').that.is.equal('identifier');
            expect(token4).to.have.property('value').that.is.equal('bar');
            expect(token4).to.have.property('text').that.is.equal('bar');
            expect(token2).to.have.property('line').that.is.equal(1);
            expect(token2).to.have.property('col').that.is.equal(4);
            expect(token2).to.have.property('offset').that.is.equal(3);
        });

    });

    describe('formatError', () => {

        it('should return a string with an error message describing a parse error at that token', () => {
            const lexer = openScadLexer('@');
            expect(() => lexer.next()).to.throw('invalid syntax at line 1 col 1:\n\n  @\n  ^');

            expect(lexer.formatError({
                value: '@',
                line: 5,
                col: 3,
                offset: 0,
                lineBreaks: 0
            }, 'unknown token')).to.be.equal('unknown token at line 5 col 3:\n\n  @\n    ^');
        });

    });

    describe('has', () => {

        it('should return true if the lexer can emit tokens with that name', () => {
            const lexer = openScadLexer();

            [
                '_space',
                'number',
                'string',
                'path',
                'identifier',
                'mcomment',
                'lcomment',
                'dot',
                'comma',
                'semicolon',
                'colon',
                'lbrace',
                'rbrace',
                'lparen',
                'rparen',
                'lsquare',
                'rsquare',
                'lesserequal',
                'lesserthan',
                'greaterequal',
                'greaterthan',
                'equal',
                'notequal',
                'assign',
                'add',
                'subtract',
                'multiply',
                'divide',
                'modulo',
                'cond',
                'and',
                'or',
                'not',
                'debug'
            ].forEach((token) => {
                expect(lexer.has(token)).to.be.true;
            });

            expect(lexer.has('foo')).to.be.false;
        });

    });

});
