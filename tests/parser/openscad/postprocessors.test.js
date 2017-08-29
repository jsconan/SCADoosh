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
 * Unit tests: Grammar postprocessors for the OpenSCAD language parser.
 *
 * @package tests/parser/openscad
 * @author jsconan
 */

const _ = require('lodash');
const chai = require('chai');
const expect = chai.expect;

const pp = require('./../../../src/parser/openscad/postprocessors');
const grammarTokenSchema = require('./../grammar-token-schema.json');
const postprocessorsTestCases = require('./postprocessors-test-cases.json');

chai.use(require('chai-json-schema'));

describe('OpenSCAD postprocessors', () => {

    // the test cases are defined inside the JSON file ./postprocessors-test-cases.json
    _.forEach(postprocessorsTestCases, (testCases, method) => {
        // the test cases are gathered by methods
        it(method, () => {
            _.forEach(testCases, (testCase) => {
                // wrap each test case
                it(testCase.title, () => {
                    const doCall = _.bind(pp[method], pp, testCase.input);

                    if (testCase.error) {
                        // it may lead to an error as the inout token could be incompatible
                        expect(doCall).to.throw();
                    } else {
                        // recognized token
                        const descriptor = doCall();
                        expect(descriptor).to.be.an('object');
                        expect(descriptor).to.be.jsonSchema(grammarTokenSchema);
                        expect(descriptor).to.deep.include(testCase.output);
                    }
                });
            });

        });
    });

});
