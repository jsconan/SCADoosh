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
 * Unit tests: Grammar that applies on the OpenSCAD language.
 *
 * @package tests/parser/openscad
 * @author jsconan
 */

const chai = require('chai');
const expect = chai.expect;

const nearley = require('nearley');
const grammar = nearley.Grammar.fromCompiled(require('./../../../src/parser/openscad/grammar'));

const utils = require('../../../src/ast/utils');
const builders = require('../../../src/ast/builders');

describe('OpenSCAD grammar', () => {

    describe('empty', () => {

        it('should parse empty text', () => {
            const parser = new nearley.Parser(grammar);
            parser.feed('');
            expect(parser.results).to.be.an('array');
            expect(parser.results).to.deep.equal([null]);
        });

    });

    describe('include', () => {

        it('should parse an include statement', () => {
            const parser = new nearley.Parser(grammar);
            const expected = [
                builders.command([
                    {
                        type: 'include',
                        value: 'include',
                        text: 'include',
                        line: 1,
                        col: 1,
                        offset: 0
                    },
                    builders.terminal([{
                        type: 'path',
                        value: './path/to/file.scad',
                        text: '<./path/to/file.scad>',
                        line: 1,
                        col: 9,
                        offset: 8
                    }], 'AstPath')
                ], 'AstInclude')
            ];

            parser.feed('include <./path/to/file.scad>');

            expect(parser.results).to.be.an('array');
            expect(parser.results).to.deep.equal(expected);
        });

        it('should parse an include statement with ending semicolon', () => {
            const parser = new nearley.Parser(grammar);
            const expected = [
                builders.command([
                    {
                        type: 'include',
                        value: 'include',
                        text: 'include',
                        line: 1,
                        col: 1,
                        offset: 0
                    },
                    builders.terminal([{
                        type: 'path',
                        value: './path/to/file.scad',
                        text: '<./path/to/file.scad>',
                        line: 1,
                        col: 9,
                        offset: 8
                    }], 'AstPath')
                ], 'AstInclude')
            ];

            parser.feed('include <./path/to/file.scad>;');

            expect(parser.results).to.be.an('array');
            expect(parser.results).to.deep.equal(expected);
        });

    });

    describe('use', () => {

        it('should parse a use statement', () => {
            const parser = new nearley.Parser(grammar);
            const expected = [
                builders.command([
                    {
                        type: 'use',
                        value: 'use',
                        text: 'use',
                        line: 1,
                        col: 1,
                        offset: 0
                    },
                    builders.terminal([{
                        type: 'path',
                        value: './path/to/file.scad',
                        text: '<./path/to/file.scad>',
                        line: 1,
                        col: 5,
                        offset: 4
                    }], 'AstPath')
                ], 'AstUse')
            ];

            parser.feed('use <./path/to/file.scad>');

            expect(parser.results).to.be.an('array');
            expect(parser.results).to.deep.equal(expected);
        });

        it('should parse a use statement with ending semicolon', () => {
            const parser = new nearley.Parser(grammar);
            const expected = [
                builders.command([
                    {
                        type: 'use',
                        value: 'use',
                        text: 'use',
                        line: 1,
                        col: 1,
                        offset: 0
                    },
                    builders.terminal([{
                        type: 'path',
                        value: './path/to/file.scad',
                        text: '<./path/to/file.scad>',
                        line: 1,
                        col: 5,
                        offset: 4
                    }], 'AstPath')
                ], 'AstUse')
            ];

            parser.feed('use <./path/to/file.scad>;');

            expect(parser.results).to.be.an('array');
            expect(parser.results).to.deep.equal(expected);
        });

    });

    describe('comment', () => {

        it('should parse a line comment', () => {
            const parser = new nearley.Parser(grammar);
            const expected = [
                builders.terminal([
                    {
                        type: 'lcomment',
                        value: ' a line comment',
                        text: '// a line comment',
                        line: 1,
                        col: 1,
                        offset: 0
                    }
                ], 'AstLineComment')
            ];

            parser.feed('// a line comment');

            expect(parser.results).to.be.an('array');
            expect(parser.results).to.deep.equal(expected);
        });

        it('should parse a block comment', () => {
            const parser = new nearley.Parser(grammar);
            const expected = [
                builders.terminal([
                    {
                        type: 'mcomment',
                        value: ' a\n block\n comment\n ',
                        text: '/* a\n block\n comment\n */',
                        line: 1,
                        col: 1,
                        offset: 0
                    }
                ], 'AstBlockComment')
            ];

            parser.feed('/* a\n block\n comment\n */');

            expect(parser.results).to.be.an('array');
            expect(parser.results).to.deep.equal(expected);
        });

    });

    describe('assignment', () => {

        it('should parse a string assignment statement', () => {
            const parser = new nearley.Parser(grammar);
            const expected = [
                builders.assignment([
                    builders.terminal([{
                        type: 'identifier',
                        value: 'foo',
                        text: 'foo',
                        line: 1,
                        col: 1,
                        offset: 0
                    }], 'AstIdentifier'),
                    {
                        type: 'assign',
                        value: '=',
                        text: '=',
                        line: 1,
                        col: 5,
                        offset: 4
                    },
                    builders.terminal([{
                        type: 'string',
                        value: 'bar',
                        text: '"bar"',
                        line: 1,
                        col: 7,
                        offset: 6
                    }], 'AstString')
                ])
            ];

            parser.feed('foo = "bar";');

            expect(parser.results).to.be.an('array');
            expect(parser.results).to.deep.equal(expected);
        });

        it('should parse a boolean assignment statement `true`', () => {
            const parser = new nearley.Parser(grammar);
            const expected = [
                builders.assignment([
                    builders.terminal([{
                        type: 'identifier',
                        value: 'foo',
                        text: 'foo',
                        line: 1,
                        col: 1,
                        offset: 0
                    }], 'AstIdentifier'),
                    {
                        type: 'assign',
                        value: '=',
                        text: '=',
                        line: 1,
                        col: 5,
                        offset: 4
                    },
                    builders.terminal([{
                        type: 'true',
                        value: 'true',
                        text: 'true',
                        line: 1,
                        col: 7,
                        offset: 6
                    }], 'AstBoolean')
                ])
            ];

            parser.feed('foo = true;');

            expect(parser.results).to.be.an('array');
            expect(parser.results).to.deep.equal(expected);
        });

        it('should parse a boolean assignment statement `false`', () => {
            const parser = new nearley.Parser(grammar);
            const expected = [
                builders.assignment([
                    builders.terminal([{
                        type: 'identifier',
                        value: 'foo',
                        text: 'foo',
                        line: 1,
                        col: 1,
                        offset: 0
                    }], 'AstIdentifier'),
                    {
                        type: 'assign',
                        value: '=',
                        text: '=',
                        line: 1,
                        col: 5,
                        offset: 4
                    },
                    builders.terminal([{
                        type: 'false',
                        value: 'false',
                        text: 'false',
                        line: 1,
                        col: 7,
                        offset: 6
                    }], 'AstBoolean')
                ])
            ];

            parser.feed('foo = false;');

            expect(parser.results).to.be.an('array');
            expect(parser.results).to.deep.equal(expected);
        });

        it('should parse an undefined assignment statement', () => {
            const parser = new nearley.Parser(grammar);
            const expected = [
                builders.assignment([
                    builders.terminal([{
                        type: 'identifier',
                        value: 'foo',
                        text: 'foo',
                        line: 1,
                        col: 1,
                        offset: 0
                    }], 'AstIdentifier'),
                    {
                        type: 'assign',
                        value: '=',
                        text: '=',
                        line: 1,
                        col: 5,
                        offset: 4
                    },
                    builders.terminal([{
                        type: 'undef',
                        value: 'undef',
                        text: 'undef',
                        line: 1,
                        col: 7,
                        offset: 6
                    }], 'AstUndefined')
                ])
            ];

            parser.feed('foo = undef;');

            expect(parser.results).to.be.an('array');
            expect(parser.results).to.deep.equal(expected);
        });

        it('should parse a number assignment statement', () => {
            const parser = new nearley.Parser(grammar);
            const expected = [
                builders.assignment([
                    builders.terminal([{
                        type: 'identifier',
                        value: 'foo',
                        text: 'foo',
                        line: 1,
                        col: 1,
                        offset: 0
                    }], 'AstIdentifier'),
                    {
                        type: 'assign',
                        value: '=',
                        text: '=',
                        line: 1,
                        col: 5,
                        offset: 4
                    },
                    builders.terminal([{
                        type: 'number',
                        value: '42',
                        text: '42',
                        line: 1,
                        col: 7,
                        offset: 6
                    }], 'AstNumber')
                ])
            ];

            parser.feed('foo = 42;');

            expect(parser.results).to.be.an('array');
            expect(parser.results).to.deep.equal(expected);
        });

        it('should parse an identifier assignment statement', () => {
            const parser = new nearley.Parser(grammar);
            const expected = [
                builders.assignment([
                    builders.terminal([{
                        type: 'identifier',
                        value: 'foo',
                        text: 'foo',
                        line: 1,
                        col: 1,
                        offset: 0
                    }], 'AstIdentifier'),
                    {
                        type: 'assign',
                        value: '=',
                        text: '=',
                        line: 1,
                        col: 5,
                        offset: 4
                    },
                    builders.terminal([{
                        type: 'identifier',
                        value: 'bar',
                        text: 'bar',
                        line: 1,
                        col: 7,
                        offset: 6
                    }], 'AstIdentifier')
                ])
            ];

            parser.feed('foo = bar;');

            expect(parser.results).to.be.an('array');
            expect(parser.results).to.deep.equal(expected);
        });

        it('should parse an expression assignment statement `1 + 2`', () => {
            const parser = new nearley.Parser(grammar);
            const expected = [
                builders.assignment([
                    builders.terminal([{
                        type: 'identifier',
                        value: 'foo',
                        text: 'foo',
                        line: 1,
                        col: 1,
                        offset: 0
                    }], 'AstIdentifier'),
                    {
                        type: 'assign',
                        value: '=',
                        text: '=',
                        line: 1,
                        col: 5,
                        offset: 4
                    },
                    builders.binaryOperator([
                        builders.terminal([
                            {
                                type: 'number',
                                value: '1',
                                text: '1',
                                line: 1,
                                col: 7,
                                offset: 6
                            }
                        ], 'AstNumber'),
                        {
                            type: 'add',
                            value: '+',
                            text: '+',
                            line: 1,
                            col: 9,
                            offset: 8
                        },
                        builders.terminal([
                            {
                                type: 'number',
                                value: '2',
                                text: '2',
                                line: 1,
                                col: 11,
                                offset: 10
                            }
                        ], 'AstNumber')
                    ])
                ])
            ];

            parser.feed('foo = 1 + 2;');

            expect(parser.results).to.be.an('array');
            expect(parser.results).to.deep.equal(expected);
        });

        it('should parse an expression assignment statement `4 - 3`', () => {
            const parser = new nearley.Parser(grammar);
            const expected = [
                builders.assignment([
                    builders.terminal([{
                        type: 'identifier',
                        value: 'foo',
                        text: 'foo',
                        line: 1,
                        col: 1,
                        offset: 0
                    }], 'AstIdentifier'),
                    {
                        type: 'assign',
                        value: '=',
                        text: '=',
                        line: 1,
                        col: 4,
                        offset: 3
                    },
                    builders.binaryOperator([
                        builders.terminal([
                            {
                                type: 'number',
                                value: '4',
                                text: '4',
                                line: 1,
                                col: 5,
                                offset: 4
                            }
                        ], 'AstNumber'),
                        {
                            type: 'subtract',
                            value: '-',
                            text: '-',
                            line: 1,
                            col: 6,
                            offset: 5
                        },
                        builders.terminal([
                            {
                                type: 'number',
                                value: '3',
                                text: '3',
                                line: 1,
                                col: 7,
                                offset: 6
                            }
                        ], 'AstNumber')
                    ])
                ])
            ];

            parser.feed('foo=4-3;');

            expect(parser.results).to.be.an('array');
            expect(parser.results).to.deep.equal(expected);
        });

        it('should parse an expression assignment statement `2 * 4`', () => {
            const parser = new nearley.Parser(grammar);
            const expected = [
                builders.assignment([
                    builders.terminal([{
                        type: 'identifier',
                        value: 'foo',
                        text: 'foo',
                        line: 1,
                        col: 1,
                        offset: 0
                    }], 'AstIdentifier'),
                    {
                        type: 'assign',
                        value: '=',
                        text: '=',
                        line: 1,
                        col: 5,
                        offset: 4
                    },
                    builders.binaryOperator([
                        builders.terminal([
                            {
                                type: 'number',
                                value: '2',
                                text: '2',
                                line: 1,
                                col: 7,
                                offset: 6
                            }
                        ], 'AstNumber'),
                        {
                            type: 'multiply',
                            value: '*',
                            text: '*',
                            line: 1,
                            col: 9,
                            offset: 8
                        },
                        builders.terminal([
                            {
                                type: 'number',
                                value: '3',
                                text: '3',
                                line: 1,
                                col: 11,
                                offset: 10
                            }
                        ], 'AstNumber')
                    ])
                ])
            ];

            parser.feed('foo = 2 * 3;');

            expect(parser.results).to.be.an('array');
            expect(parser.results).to.deep.equal(expected);
        });

        it('should parse an expression assignment statement `5 / 2`', () => {
            const parser = new nearley.Parser(grammar);
            const expected = [
                builders.assignment([
                    builders.terminal([{
                        type: 'identifier',
                        value: 'foo',
                        text: 'foo',
                        line: 1,
                        col: 1,
                        offset: 0
                    }], 'AstIdentifier'),
                    {
                        type: 'assign',
                        value: '=',
                        text: '=',
                        line: 1,
                        col: 5,
                        offset: 4
                    },
                    builders.binaryOperator([
                        builders.terminal([
                            {
                                type: 'number',
                                value: '5',
                                text: '5',
                                line: 1,
                                col: 7,
                                offset: 6
                            }
                        ], 'AstNumber'),
                        {
                            type: 'divide',
                            value: '/',
                            text: '/',
                            line: 1,
                            col: 9,
                            offset: 8
                        },
                        builders.terminal([
                            {
                                type: 'number',
                                value: '2',
                                text: '2',
                                line: 1,
                                col: 11,
                                offset: 10
                            }
                        ], 'AstNumber')
                    ])
                ])
            ];

            parser.feed('foo = 5 / 2;');

            expect(parser.results).to.be.an('array');
            expect(parser.results).to.deep.equal(expected);
        });

        it('should parse an expression assignment statement `7 % 2`', () => {
            const parser = new nearley.Parser(grammar);
            const expected = [
                builders.assignment([
                    builders.terminal([{
                        type: 'identifier',
                        value: 'foo',
                        text: 'foo',
                        line: 1,
                        col: 1,
                        offset: 0
                    }], 'AstIdentifier'),
                    {
                        type: 'assign',
                        value: '=',
                        text: '=',
                        line: 1,
                        col: 4,
                        offset: 3
                    },
                    builders.binaryOperator([
                        builders.terminal([
                            {
                                type: 'number',
                                value: '7',
                                text: '7',
                                line: 1,
                                col: 5,
                                offset: 4
                            }
                        ], 'AstNumber'),
                        {
                            type: 'modulo',
                            value: '%',
                            text: '%',
                            line: 1,
                            col: 6,
                            offset: 5
                        },
                        builders.terminal([
                            {
                                type: 'number',
                                value: '2',
                                text: '2',
                                line: 1,
                                col: 7,
                                offset: 6
                            }
                        ], 'AstNumber')
                    ])
                ])
            ];

            parser.feed('foo=7%2;');

            expect(parser.results).to.be.an('array');
            expect(parser.results).to.deep.equal(expected);
        });

        it('should parse an expression assignment statement `-9`', () => {
            const parser = new nearley.Parser(grammar);
            const expected = [
                builders.assignment([
                    builders.terminal([{
                        type: 'identifier',
                        value: 'foo',
                        text: 'foo',
                        line: 1,
                        col: 1,
                        offset: 0
                    }], 'AstIdentifier'),
                    {
                        type: 'assign',
                        value: '=',
                        text: '=',
                        line: 1,
                        col: 5,
                        offset: 4
                    },
                    builders.unaryOperator([
                        {
                            type: 'subtract',
                            value: '-',
                            text: '-',
                            line: 1,
                            col: 7,
                            offset: 6
                        },
                        builders.terminal([
                            {
                                type: 'number',
                                value: '9',
                                text: '9',
                                line: 1,
                                col: 9,
                                offset: 8
                            }
                        ], 'AstNumber')
                    ])
                ])
            ];

            parser.feed('foo = - 9;');

            expect(parser.results).to.be.an('array');
            expect(parser.results).to.deep.equal(expected);
        });

        it('should parse an expression assignment statement `+1 + 2 * 3`', () => {
            const parser = new nearley.Parser(grammar);
            const expected = [
                builders.assignment([
                    builders.terminal([{
                        type: 'identifier',
                        value: 'foo',
                        text: 'foo',
                        line: 1,
                        col: 1,
                        offset: 0
                    }], 'AstIdentifier'),
                    {
                        type: 'assign',
                        value: '=',
                        text: '=',
                        line: 1,
                        col: 5,
                        offset: 4
                    },
                    builders.binaryOperator([
                        builders.unaryOperator([
                            {
                                type: 'add',
                                value: '+',
                                text: '+',
                                line: 1,
                                col: 7,
                                offset: 6
                            },
                            builders.terminal([
                                {
                                    type: 'number',
                                    value: '1',
                                    text: '1',
                                    line: 1,
                                    col: 8,
                                    offset: 7
                                }
                            ], 'AstNumber')
                        ]),
                        {
                            type: 'add',
                            value: '+',
                            text: '+',
                            line: 1,
                            col: 10,
                            offset: 9
                        },
                        builders.binaryOperator([
                            builders.terminal([
                                {
                                    type: 'number',
                                    value: '2',
                                    text: '2',
                                    line: 1,
                                    col: 12,
                                    offset: 11
                                }
                            ], 'AstNumber'),
                            {
                                type: 'multiply',
                                value: '*',
                                text: '*',
                                line: 1,
                                col: 14,
                                offset: 13
                            },
                            builders.terminal([
                                {
                                    type: 'number',
                                    value: '3',
                                    text: '3',
                                    line: 1,
                                    col: 16,
                                    offset: 15
                                }
                            ], 'AstNumber')
                        ])
                    ])
                ])
            ];

            parser.feed('foo = +1 + 2 * 3;');

            expect(parser.results).to.be.an('array');
            expect(parser.results).to.deep.equal(expected);
        });

        it('should parse an expression assignment statement `2 * (4 - 1)`', () => {
            const parser = new nearley.Parser(grammar);
            const expected = [
                builders.assignment([
                    builders.terminal([{
                        type: 'identifier',
                        value: 'foo',
                        text: 'foo',
                        line: 1,
                        col: 1,
                        offset: 0
                    }], 'AstIdentifier'),
                    {
                        type: 'assign',
                        value: '=',
                        text: '=',
                        line: 1,
                        col: 5,
                        offset: 4
                    },
                    builders.binaryOperator([
                        builders.terminal([
                            {
                                type: 'number',
                                value: '2',
                                text: '2',
                                line: 1,
                                col: 7,
                                offset: 6
                            }
                        ], 'AstNumber'),
                        {
                            type: 'multiply',
                            value: '*',
                            text: '*',
                            line: 1,
                            col: 9,
                            offset: 8
                        },
                        utils.surrounded([
                            {
                                type: 'lparen',
                                value: '(',
                                text: '(',
                                line: 1,
                                col: 11,
                                offset: 10
                            },
                            builders.binaryOperator([
                                builders.terminal([
                                    {
                                        type: 'number',
                                        value: '4',
                                        text: '4',
                                        line: 1,
                                        col: 12,
                                        offset: 11
                                    }
                                ], 'AstNumber'),
                                {
                                    type: 'subtract',
                                    value: '-',
                                    text: '-',
                                    line: 1,
                                    col: 14,
                                    offset: 13
                                },
                                builders.terminal([
                                    {
                                        type: 'number',
                                        value: '1',
                                        text: '1',
                                        line: 1,
                                        col: 16,
                                        offset: 15
                                    }
                                ], 'AstNumber')
                            ]),
                            {
                                type: 'rparen',
                                value: ')',
                                text: ')',
                                line: 1,
                                col: 17,
                                offset: 16
                            }
                        ])
                    ])
                ])
            ];

            parser.feed('foo = 2 * (4 - 1);');

            expect(parser.results).to.be.an('array');
            expect(parser.results).to.deep.equal(expected);
        });
    });

});
