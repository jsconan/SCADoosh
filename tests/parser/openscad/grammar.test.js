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

const _ = require('lodash');
const chai = require('chai');
const expect = chai.expect;

const nearley = require('nearley');
const grammar = nearley.Grammar.fromCompiled(require('./../../../src/parser/openscad/grammar'));
const grammarTokenSchema = require('./../grammar-token-schema.json');
const grammarTestCases = require('./grammar-test-cases.json');

chai.use(require('chai-json-schema'));

describe('OpenSCAD grammar', () => {

    // the test cases are defined inside the JSON file ./grammar-test-cases.json
    _.forEach(grammarTestCases, (testCase) => {
        // the title can contains placeholders
        const title = testCase.title.replace('%input', JSON.stringify(testCase.input));

        // wrap each test case
        it(title, () => {
            const parser = new nearley.Parser(grammar);
            const doParse = _.bind(parser.feed, parser, testCase.input);

            if (testCase.error) {
                // it may lead to an error as the source code should not be parsed
                expect(doParse).to.throw();
            } else {
                doParse();

                expect(parser.results).to.be.an('array');

                // sometimes no output is expected
                if (testCase.output.length === 0) {
                    expect(parser.results).to.have.length(0);
                } else {
                    // in most of cases there are one or more expected output
                    _.forEach(testCase.output, (expectedToken, index) => {
                        const token = parser.results[index];
                        expect(token).to.be.an('object');
                        expect(token).to.be.jsonSchema(grammarTokenSchema);
                        expect(token).to.deep.equal(expectedToken);
                    });
                }
            }
        });
    });

});
