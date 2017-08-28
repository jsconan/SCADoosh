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

const lexer = require('./../../../src/parser/openscad/lexer');
const lexerTokenSchema = require('./../lexer-token-schema.json');
const lexerTestCases = require('./lexer-test-cases.json');

chai.use(require('chai-json-schema'));

describe('OpenSCAD lexer', () => {

    // the test cases are defined inside the JSON file ./lexer-test-cases.json
    _.forEach(lexerTestCases, (testCase) => {
        // the title can contains placeholders
        const title = testCase.title.replace('%input', JSON.stringify(testCase.input));

        // wrap each test case
        it(title, () => {
            lexer.reset(testCase.input);

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
