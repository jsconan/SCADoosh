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
 * Unit tests: Helpers that apply on strings.
 *
 * @package tests/utils
 * @author jsconan
 */

const chai = require('chai');
const expect = chai.expect;

const strings = require('./../../src/utils/strings');

chai.use(require('chai-json-schema'));

describe('strings helpers', () => {

    describe('trimLength', () => {

        it('should removes the first and the last chars off the string', () => {

            const str = 'foo bar';
            expect(strings.trimLength(str, 0)).to.be.equal('foo bar');
            expect(strings.trimLength(str, 1)).to.be.equal('oo ba');
            expect(strings.trimLength(str, 2)).to.be.equal('o b');
            expect(strings.trimLength(str, 3)).to.be.equal(' ');
            expect(strings.trimLength(str, 4)).to.be.equal('');
            expect(strings.trimLength(str, 5)).to.be.equal('');

        });

        it('should try to convert the value to string, then removes the first and the last chars off the string', () => {

            const str = 12345;
            expect(strings.trimLength(str, 0)).to.be.equal('12345');
            expect(strings.trimLength(str, 1)).to.be.equal('234');
            expect(strings.trimLength(str, 2)).to.be.equal('3');
            expect(strings.trimLength(str, 3)).to.be.equal('');
            expect(strings.trimLength(str, 4)).to.be.equal('');
            expect(strings.trimLength(str, 5)).to.be.equal('');

        });

    });

    describe('rest', () => {

        it('should returns the rest of the string from a particular index', () => {

            const str = 'foo bar';
            expect(strings.rest(str, 0)).to.be.equal('foo bar');
            expect(strings.rest(str, 1)).to.be.equal('oo bar');
            expect(strings.rest(str, 2)).to.be.equal('o bar');
            expect(strings.rest(str, 3)).to.be.equal(' bar');
            expect(strings.rest(str, 4)).to.be.equal('bar');
            expect(strings.rest(str, 5)).to.be.equal('ar');
            expect(strings.rest(str, 6)).to.be.equal('r');
            expect(strings.rest(str, 7)).to.be.equal('');

        });

        it('should try to convert the value to string, then returns the rest of the string from a particular index', () => {

            const str = 12345;
            expect(strings.rest(str, 0)).to.be.equal('12345');
            expect(strings.rest(str, 1)).to.be.equal('2345');
            expect(strings.rest(str, 2)).to.be.equal('345');
            expect(strings.rest(str, 3)).to.be.equal('45');
            expect(strings.rest(str, 4)).to.be.equal('5');
            expect(strings.rest(str, 5)).to.be.equal('');
            expect(strings.rest(str, 6)).to.be.equal('');

        });

    });

    describe('splitLines', () => {

        it('should accept text without line breaks', () => {
            const text = 'a simple text';
            expect(strings.splitLines(text)).to.be.deep.equal([text]);
        });

        it('should recognize any types of line breaks', () => {
            expect(strings.splitLines('two\nlines')).to.be.deep.equal(['two', 'lines']);
            expect(strings.splitLines('two\r\nlines')).to.be.deep.equal(['two', 'lines']);
            expect(strings.splitLines('two\rlines')).to.be.deep.equal(['two', 'lines']);
            expect(strings.splitLines('\nseveral\nlines\n')).to.be.deep.equal(['', 'several', 'lines', '']);
        });

        it('should accept stringable object', () => {
            const text = 'a simple text';
            const obj = {
                text: text,
                toString: function () {
                    return this.text;
                }
            };

            expect(strings.splitLines(obj)).to.be.deep.equal([text]);
        });

        it('should convert any values to string', () => {
            expect(strings.splitLines(true)).to.be.deep.equal(['true']);
            expect(strings.splitLines(10)).to.be.deep.equal(['10']);
            expect(strings.splitLines({})).to.be.deep.equal(['[object Object]']);
        });

    });

});
