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
 * Unit tests: AST node that represents the boolean constant `true`.
 *
 * @package tests/ast
 * @author jsconan
 */

const chai = require('chai');
const expect = chai.expect;

const AstNode = require('./../../src/ast/node');
const AstFragment = require('./../../src/ast/fragment');
const AstLiteral = require('./../../src/ast/literal');
const AstBoolean = require('./../../src/ast/boolean');
const AstFalse = require('./../../src/ast/false');

describe('OpenSCAD AstFalse', () => {

    it('should create an AstFalse', () => {
        const type = 'boolean';
        const value = false;
        const number = new AstFalse();

        expect(number).to.be.an('object');
        expect(number).to.be.an.instanceOf(AstNode);
        expect(number).to.be.an.instanceOf(AstFragment);
        expect(number).to.be.an.instanceOf(AstLiteral);
        expect(number).to.be.an.instanceOf(AstBoolean);
        expect(number).to.be.an.instanceOf(AstFalse);
        expect(number).to.have.a.property('type').that.is.equal(type);
        expect(number).to.have.a.property('value').that.is.equal(value);
    });

});
