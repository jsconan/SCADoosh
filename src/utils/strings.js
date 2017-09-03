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
 * Defines some helpers that apply on strings.
 *
 * @package src/utils
 * @author jsconan
 */

/**
 * Will match every line breaks
 * @type {RegExp}
 */
const reLineBreak = /\r\n?|\n/;

module.exports = {
    /**
     * Splits a text into lines.
     * @param {String|Object} str
     */
    splitLines: (str) => ('' + str).split(reLineBreak),

    /**
     * Removes the `n` first and the `n` last chars off the string
     * @param {String} str
     * @param {Number} n
     * @returns {Token}
     */
    trimLength: (str, n) => n ? ('' + str).slice(+n, -n) : ('' + str),

    /**
     * Gets the rest of the value after `n` chars
     * @param {String} str
     * @param {Number} n
     * @returns {Token}
     */
    rest: (str, n) => ('' + str).substr(+n),
};
