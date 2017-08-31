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
 * Unit tests: Helper that splits a text into lines.
 *
 * @package tests/utils
 * @author jsconan
 */

const chai = require('chai');
const expect = chai.expect;

const splitLines = require('./../../src/utils/split-lines');

chai.use(require('chai-json-schema'));

describe('splitLines helper', () => {

    it('should accept text without line breaks', () => {
        const text = 'a simple text';
        expect(splitLines(text)).to.be.deep.equal([text]);
    });

    it('should recognize any types of line breaks', () => {
        expect(splitLines('two\nlines')).to.be.deep.equal(['two', 'lines']);
        expect(splitLines('two\r\nlines')).to.be.deep.equal(['two', 'lines']);
        expect(splitLines('two\rlines')).to.be.deep.equal(['two', 'lines']);
        expect(splitLines('\nseveral\nlines\n')).to.be.deep.equal(['', 'several', 'lines', '']);
    });

    it('should accept stringable object', () => {
        const text = 'a simple text';
        const obj = {
            text: text,
            toString: function () {
                return this.text;
            }
        };

        expect(splitLines(obj)).to.be.deep.equal([text]);
    });

    it('should convert any values to string', () => {
        expect(splitLines(true)).to.be.deep.equal(['true']);
        expect(splitLines(10)).to.be.deep.equal(['10']);
        expect(splitLines({})).to.be.deep.equal(['[object Object]']);
    });

});
