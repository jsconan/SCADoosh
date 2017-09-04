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
 * Unit tests: Lexical analyzer that recognizes the tokens of the target language.
 *
 * @package tests/parser
 * @author jsconan
 */

const chai = require('chai');
const expect = chai.expect;

const Lexer = require('./../../src/parser/lexer');

describe('Lexical analyser', () => {

    it('should have the expected API', () => {
        expect(Lexer).to.be.a('function');

        ['next', 'save', 'reset', 'formatError', 'has'].forEach((method) => {
            const lexer = new Lexer({
                token: /\w+/,
                _space: {
                    match: /\s+/,
                    lineBreaks: true
                }
            });
            expect(lexer).to.be.an('object');
            expect(lexer).to.be.an.instanceOf(Lexer);
            expect(lexer).to.have.a.property(method).that.is.a('function');
        });

        ['crop', 'cropLeft', 'cropRight', 'numeric'].forEach((method) => {
            expect(Lexer).to.be.a('function');
            expect(Lexer).to.have.a.property(method).that.is.a('function');
        });

        const lexer = new Lexer({
            token: /\w+/,
            _space: {
                match: /\s+/,
                lineBreaks: true
            }
        });
        expect(lexer).to.be.an('object');
        expect(lexer).to.be.an.instanceOf(Lexer);
        expect(lexer).to.have.a.property('lexer').that.is.an('object');
        expect(lexer).to.have.a.property('refinery').that.is.an('object');

        const lexerLexer = lexer.lexer;
        const lexerRefinery = lexer.refinery;
        lexer.lexer = {foo: 'bar'};
        lexer.refinery = {foo: 'bar'};
        expect(lexer).to.have.a.property('lexer').that.is.equal(lexerLexer);
        expect(lexer).to.have.a.property('refinery').that.is.equal(lexerRefinery);
    });

    describe('next', () => {

        it('should return a token object', () => {
            const lexer = new Lexer({
                token: /\w+/,
                _space: {
                    match: /\s+/,
                    lineBreaks: true
                }
            });

            expect(lexer).to.be.an('object');
            expect(lexer).to.be.an.instanceOf(Lexer);

            lexer.reset('42 foo');

            const token1 = lexer.next();
            expect(token1).to.be.an('object');
            expect(token1).to.have.property('type').that.is.equal('token');
            expect(token1).to.have.property('value').that.is.equal('42');
            expect(token1).to.have.property('text').that.is.equal('42');
            expect(token1).to.have.property('line').that.is.equal(1);
            expect(token1).to.have.property('col').that.is.equal(1);
            expect(token1).to.have.property('offset').that.is.equal(0);

            const token2 = lexer.next();
            expect(token2).to.be.an('object');
            expect(token2).to.have.property('type').that.is.equal('token');
            expect(token2).to.have.property('value').that.is.equal('foo');
            expect(token2).to.have.property('text').that.is.equal('foo');
            expect(token2).to.have.property('line').that.is.equal(1);
            expect(token2).to.have.property('col').that.is.equal(4);
            expect(token2).to.have.property('offset').that.is.equal(3);

            const token3 = lexer.next();
            expect(token3).to.be.undefined;
        });

        it('should refine the token values', () => {
            const lexer = new Lexer({
                string: /[a-zA-Z]+\w*/,
                number: /\d+/,
                _space: {
                    match: /\s+/,
                    lineBreaks: true
                }
            }, {
                string: (token) => {
                    token.value = `"${token.value}"`;
                    return token;
                },
                number: (token) => {
                    token.value = parseFloat(token.value);
                    return token;
                }
            });

            expect(lexer).to.be.an('object');
            expect(lexer).to.be.an.instanceOf(Lexer);

            lexer.reset('42 foo');

            const token1 = lexer.next();
            expect(token1).to.be.an('object');
            expect(token1).to.have.property('type').that.is.equal('number');
            expect(token1).to.have.property('value').that.is.equal(42);
            expect(token1).to.have.property('text').that.is.equal('42');
            expect(token1).to.have.property('line').that.is.equal(1);
            expect(token1).to.have.property('col').that.is.equal(1);
            expect(token1).to.have.property('offset').that.is.equal(0);

            const token2 = lexer.next();
            expect(token2).to.be.an('object');
            expect(token2).to.have.property('type').that.is.equal('string');
            expect(token2).to.have.property('value').that.is.equal('"foo"');
            expect(token2).to.have.property('text').that.is.equal('foo');
            expect(token2).to.have.property('line').that.is.equal(1);
            expect(token2).to.have.property('col').that.is.equal(4);
            expect(token2).to.have.property('offset').that.is.equal(3);

            const token3 = lexer.next();
            expect(token3).to.be.undefined;
        });

        it('should refine the token values using the builtin refinery', () => {
            const lexer = new Lexer({
                id: /[a-zA-Z]+\w*/,
                string: /"[a-zA-Z]+\w*"/,
                currency: /\d+\$/,
                number: /\d+/,
                comment: /\/\/.*?$/,
                _space: {
                    match: /\s+/,
                    lineBreaks: true
                }
            }, {
                string: (token) => Lexer.crop(token, 1),
                comment: (token) => Lexer.cropLeft(token, 2),
                currency: (token) => Lexer.cropRight(token, 1),
                number: (token) => Lexer.numeric(token)
            });

            expect(lexer).to.be.an('object');
            expect(lexer).to.be.an.instanceOf(Lexer);

            lexer.reset('foo 42$ 42 "bar" //hello');

            const token1 = lexer.next();
            expect(token1).to.be.an('object');
            expect(token1).to.have.property('type').that.is.equal('id');
            expect(token1).to.have.property('value').that.is.equal('foo');
            expect(token1).to.have.property('text').that.is.equal('foo');
            expect(token1).to.have.property('line').that.is.equal(1);
            expect(token1).to.have.property('col').that.is.equal(1);
            expect(token1).to.have.property('offset').that.is.equal(0);

            const token2 = lexer.next();
            expect(token2).to.be.an('object');
            expect(token2).to.have.property('type').that.is.equal('currency');
            expect(token2).to.have.property('value').that.is.equal('42');
            expect(token2).to.have.property('text').that.is.equal('42$');
            expect(token2).to.have.property('line').that.is.equal(1);
            expect(token2).to.have.property('col').that.is.equal(5);
            expect(token2).to.have.property('offset').that.is.equal(4);

            const token3 = lexer.next();
            expect(token3).to.be.an('object');
            expect(token3).to.have.property('type').that.is.equal('number');
            expect(token3).to.have.property('value').that.is.equal(42);
            expect(token3).to.have.property('text').that.is.equal('42');
            expect(token3).to.have.property('line').that.is.equal(1);
            expect(token3).to.have.property('col').that.is.equal(9);
            expect(token3).to.have.property('offset').that.is.equal(8);

            const token4 = lexer.next();
            expect(token4).to.be.an('object');
            expect(token4).to.have.property('type').that.is.equal('string');
            expect(token4).to.have.property('value').that.is.equal('bar');
            expect(token4).to.have.property('text').that.is.equal('"bar"');
            expect(token4).to.have.property('line').that.is.equal(1);
            expect(token4).to.have.property('col').that.is.equal(12);
            expect(token4).to.have.property('offset').that.is.equal(11);

            const token5 = lexer.next();
            expect(token5).to.be.an('object');
            expect(token5).to.have.property('type').that.is.equal('comment');
            expect(token5).to.have.property('value').that.is.equal('hello');
            expect(token5).to.have.property('text').that.is.equal('//hello');
            expect(token5).to.have.property('line').that.is.equal(1);
            expect(token5).to.have.property('col').that.is.equal(18);
            expect(token5).to.have.property('offset').that.is.equal(17);


            const token6 = lexer.next();
            expect(token6).to.be.undefined;
        });

    });

    describe('save', () => {

        it('should return an info object that describes the current state of the lexer', () => {
            const lexer = new Lexer({
                token: /\w+/,
                _space: {
                    match: /\s+/,
                    lineBreaks: true
                }
            });

            expect(lexer).to.be.an('object');
            expect(lexer).to.be.an.instanceOf(Lexer);

            lexer.reset('42 foo');

            const token1 = lexer.next();
            expect(token1).to.be.an('object');
            expect(token1).to.have.property('type').that.is.equal('token');
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
            const lexer = new Lexer({
                token: /\w+/,
                _space: {
                    match: /\s+/,
                    lineBreaks: true
                }
            });

            expect(lexer).to.be.an('object');
            expect(lexer).to.be.an.instanceOf(Lexer);

            lexer.reset('42 foo 123');

            const token1 = lexer.next();
            expect(token1).to.be.an('object');
            expect(token1).to.have.property('type').that.is.equal('token');
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
            expect(token2).to.have.property('type').that.is.equal('token');
            expect(token2).to.have.property('value').that.is.equal('foo');
            expect(token2).to.have.property('text').that.is.equal('foo');
            expect(token2).to.have.property('line').that.is.equal(1);
            expect(token2).to.have.property('col').that.is.equal(4);
            expect(token2).to.have.property('offset').that.is.equal(3);

            const token3 = lexer.next();
            expect(token3).to.be.an('object');
            expect(token3).to.have.property('type').that.is.equal('token');
            expect(token3).to.have.property('value').that.is.equal('123');
            expect(token3).to.have.property('text').that.is.equal('123');
            expect(token3).to.have.property('line').that.is.equal(1);
            expect(token3).to.have.property('col').that.is.equal(8);
            expect(token3).to.have.property('offset').that.is.equal(7);

            expect(lexer.next()).to.be.undefined;

            lexer.reset('bar', info);

            const token4 = lexer.next();
            expect(token4).to.be.an('object');
            expect(token4).to.have.property('type').that.is.equal('token');
            expect(token4).to.have.property('value').that.is.equal('bar');
            expect(token4).to.have.property('text').that.is.equal('bar');
            expect(token2).to.have.property('line').that.is.equal(1);
            expect(token2).to.have.property('col').that.is.equal(4);
            expect(token2).to.have.property('offset').that.is.equal(3);
        });

    });

    describe('formatError', () => {

        it('should return a string with an error message describing a parse error at that token', () => {
            const lexer = new Lexer({
                token: /\w+/
            });

            expect(lexer).to.be.an('object');
            expect(lexer).to.be.an.instanceOf(Lexer);

            lexer.reset('@');
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
            const lexer = new Lexer({
                token: /\w+/,
                _space: {
                    match: /\s+/,
                    lineBreaks: true
                }
            });

            expect(lexer).to.be.an('object');
            expect(lexer).to.be.an.instanceOf(Lexer);

            [
                '_space',
                'token'
            ].forEach((token) => {
                expect(lexer.has(token)).to.be.true;
            });

            expect(lexer.has('foo')).to.be.false;
        });

    });

});
