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
 * Unit tests: Hub that provides access to all AST node classes.
 *
 * @package tests/ast
 * @author jsconan
 */

const chai = require('chai');
const expect = chai.expect;

const classes = require('./../../src/ast/classes');
const AstNode = require('../../src/ast/classes/node');
const AstPosition = require('../../src/ast/classes/position');
const AstFragment = require('../../src/ast/classes/fragment');
const AstLiteral = require('../../src/ast/classes/literal');
const AstNumber = require('../../src/ast/classes/number');
const AstString = require('../../src/ast/classes/string');
const AstPath = require('../../src/ast/classes/path');
const AstIdentifier = require('../../src/ast/classes/identifier');
const AstBoolean = require('../../src/ast/classes/boolean');
const AstTrue = require('../../src/ast/classes/true');
const AstFalse = require('../../src/ast/classes/false');
const AstUndefined = require('../../src/ast/classes/undefined');
const AstRange = require('../../src/ast/classes/range');
const AstComment = require('../../src/ast/classes/comment');
const AstLineComment = require('../../src/ast/classes/line-comment');
const AstBlockComment = require('../../src/ast/classes/block-comment');
const AstUnaryOperator = require('../../src/ast/classes/unary-operator');
const AstBinaryOperator = require('../../src/ast/classes/binary-operator');
const AstTernaryOperator = require('../../src/ast/classes/ternary-operator');
const AstAssignment = require('../../src/ast/classes/assignment');
const AstFunctionCall = require('../../src/ast/classes/function-call');
const AstLookup = require('../../src/ast/classes/lookup');
const AstMemberLookup = require('../../src/ast/classes/member-lookup');
const AstArrayLookup = require('../../src/ast/classes/array-lookup');
const AstInclude = require('../../src/ast/classes/include');
const AstUse = require('../../src/ast/classes/use');
const AstGroup = require('../../src/ast/classes/group');
const AstPackage = require('../../src/ast/classes/package');
const AstBlock = require('../../src/ast/classes/block');
const AstNoop = require('../../src/ast/classes/noop');

describe('AST hub', () => {

    it('should expose the list of node classes', () => {

        expect(classes).to.have.a.property('AstNode').that.is.a('function').and.is.equal(AstNode);
        expect(classes).to.have.a.property('AstPosition').that.is.a('function').and.is.equal(AstPosition);
        expect(classes).to.have.a.property('AstFragment').that.is.a('function').and.is.equal(AstFragment);
        expect(classes).to.have.a.property('AstLiteral').that.is.a('function').and.is.equal(AstLiteral);
        expect(classes).to.have.a.property('AstNumber').that.is.a('function').and.is.equal(AstNumber);
        expect(classes).to.have.a.property('AstString').that.is.a('function').and.is.equal(AstString);
        expect(classes).to.have.a.property('AstPath').that.is.a('function').and.is.equal(AstPath);
        expect(classes).to.have.a.property('AstIdentifier').that.is.a('function').and.is.equal(AstIdentifier);
        expect(classes).to.have.a.property('AstBoolean').that.is.a('function').and.is.equal(AstBoolean);
        expect(classes).to.have.a.property('AstTrue').that.is.a('function').and.is.equal(AstTrue);
        expect(classes).to.have.a.property('AstFalse').that.is.a('function').and.is.equal(AstFalse);
        expect(classes).to.have.a.property('AstUndefined').that.is.a('function').and.is.equal(AstUndefined);
        expect(classes).to.have.a.property('AstRange').that.is.a('function').and.is.equal(AstRange);
        expect(classes).to.have.a.property('AstComment').that.is.a('function').and.is.equal(AstComment);
        expect(classes).to.have.a.property('AstLineComment').that.is.a('function').and.is.equal(AstLineComment);
        expect(classes).to.have.a.property('AstBlockComment').that.is.a('function').and.is.equal(AstBlockComment);
        expect(classes).to.have.a.property('AstUnaryOperator').that.is.a('function').and.is.equal(AstUnaryOperator);
        expect(classes).to.have.a.property('AstBinaryOperator').that.is.a('function').and.is.equal(AstBinaryOperator);
        expect(classes).to.have.a.property('AstTernaryOperator').that.is.a('function').and.is.equal(AstTernaryOperator);
        expect(classes).to.have.a.property('AstAssignment').that.is.a('function').and.is.equal(AstAssignment);
        expect(classes).to.have.a.property('AstFunctionCall').that.is.a('function').and.is.equal(AstFunctionCall);
        expect(classes).to.have.a.property('AstLookup').that.is.a('function').and.is.equal(AstLookup);
        expect(classes).to.have.a.property('AstMemberLookup').that.is.a('function').and.is.equal(AstMemberLookup);
        expect(classes).to.have.a.property('AstArrayLookup').that.is.a('function').and.is.equal(AstArrayLookup);
        expect(classes).to.have.a.property('AstInclude').that.is.a('function').and.is.equal(AstInclude);
        expect(classes).to.have.a.property('AstUse').that.is.a('function').and.is.equal(AstUse);
        expect(classes).to.have.a.property('AstGroup').that.is.a('function').and.is.equal(AstGroup);
        expect(classes).to.have.a.property('AstPackage').that.is.a('function').and.is.equal(AstPackage);
        expect(classes).to.have.a.property('AstBlock').that.is.a('function').and.is.equal(AstBlock);
        expect(classes).to.have.a.property('AstNoop').that.is.a('function').and.is.equal(AstNoop);
    });

});
