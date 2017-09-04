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
 * Unit tests: Hub that provides access to all AST node classes, and provides factories to create final AST nodes.
 *
 * @package tests/ast
 * @author jsconan
 */

const chai = require('chai');
const expect = chai.expect;

const ast = require('./../../src/ast/ast');
const AstNode = require('./../../src/ast/node');
const AstPosition = require('./../../src/ast/position');
const AstFragment = require('./../../src/ast/fragment');
const AstLiteral = require('./../../src/ast/literal');
const AstNumber = require('./../../src/ast/number');
const AstString = require('./../../src/ast/string');
const AstPath = require('./../../src/ast/path');
const AstIdentifier = require('./../../src/ast/identifier');
const AstBoolean = require('./../../src/ast/boolean');
const AstTrue = require('./../../src/ast/true');
const AstFalse = require('./../../src/ast/false');
const AstUndefined = require('./../../src/ast/undefined');
const AstComment = require('./../../src/ast/comment');
const AstLineComment = require('./../../src/ast/line-comment');
const AstBlockComment = require('./../../src/ast/block-comment');
const AstBinaryOperator = require('./../../src/ast/binary-operator');
const AstUnaryOperator = require('./../../src/ast/unary-operator');
const AstAssignment = require('./../../src/ast/assignment');

describe('OpenSCAD AST hub', () => {

    it('should contains the AST node creation helpers', () => {
        [
            'number',
            'string',
            'path',
            'identifier',
            'boolean',
            'undefined',
            'lineComment',
            'blockComment',
            'binaryOperator',
            'unaryOperator',
            'assignment'
        ].forEach((name) => {
            expect(ast).to.have.a.property(name).that.is.a('function');
        });
    });

    describe('nodes', () => {

        it('should expose the list of node classes', () => {

            expect(ast).to.have.a.property('nodes').that.is.an('object');
            expect(ast.nodes).to.have.a.property('AstNode').that.is.equal(AstNode);
            expect(ast.nodes).to.have.a.property('AstPosition').that.is.equal(AstPosition);
            expect(ast.nodes).to.have.a.property('AstFragment').that.is.equal(AstFragment);
            expect(ast.nodes).to.have.a.property('AstLiteral').that.is.equal(AstLiteral);
            expect(ast.nodes).to.have.a.property('AstNumber').that.is.equal(AstNumber);
            expect(ast.nodes).to.have.a.property('AstString').that.is.equal(AstString);
            expect(ast.nodes).to.have.a.property('AstPath').that.is.equal(AstPath);
            expect(ast.nodes).to.have.a.property('AstIdentifier').that.is.equal(AstIdentifier);
            expect(ast.nodes).to.have.a.property('AstBoolean').that.is.equal(AstBoolean);
            expect(ast.nodes).to.have.a.property('AstTrue').that.is.equal(AstTrue);
            expect(ast.nodes).to.have.a.property('AstFalse').that.is.equal(AstFalse);
            expect(ast.nodes).to.have.a.property('AstUndefined').that.is.equal(AstUndefined);
            expect(ast.nodes).to.have.a.property('AstComment').that.is.equal(AstComment);
            expect(ast.nodes).to.have.a.property('AstLineComment').that.is.equal(AstLineComment);
            expect(ast.nodes).to.have.a.property('AstBlockComment').that.is.equal(AstBlockComment);
            expect(ast.nodes).to.have.a.property('AstBinaryOperator').that.is.equal(AstBinaryOperator);
            expect(ast.nodes).to.have.a.property('AstUnaryOperator').that.is.equal(AstUnaryOperator);
            expect(ast.nodes).to.have.a.property('AstAssignment').that.is.equal(AstAssignment);

            [
                'AstNode',
                'AstPosition',
                'AstFragment',
                'AstLiteral',
                'AstNumber',
                'AstString',
                'AstPath',
                'AstIdentifier',
                'AstBoolean',
                'AstTrue',
                'AstFalse',
                'AstUndefined',
                'AstComment',
                'AstLineComment',
                'AstBlockComment',
                'AstBinaryOperator',
                'AstUnaryOperator',
                'AstAssignment'
            ].forEach((name) => {
                expect(ast.nodes).to.have.a.property(name).that.is.a('function');
            });
        });

    });

    describe('number', () => {

        it('should create an AstNumber', () => {
            const value = 42;
            const node = ast.number(value);
            expect(node).to.be.an.instanceOf(AstNumber);
            expect(node).to.have.a.property('type').that.is.equal('number');
            expect(node).to.have.a.property('value').that.is.equal(value);
        });

    });

    describe('string', () => {

        it('should create an AstString', () => {
            const value = 'foo';
            const node = ast.string(value);
            expect(node).to.be.an.instanceOf(AstString);
            expect(node).to.have.a.property('type').that.is.equal('string');
            expect(node).to.have.a.property('value').that.is.equal(value);
        });

    });

    describe('path', () => {

        it('should create an AstPath', () => {
            const value = './foo/bar.scad';
            const node = ast.path(value);
            expect(node).to.be.an.instanceOf(AstPath);
            expect(node).to.have.a.property('type').that.is.equal('path');
            expect(node).to.have.a.property('value').that.is.equal(value);
        });

    });

    describe('identifier', () => {

        it('should create an AstIdentifier', () => {
            const value = 'foo';
            const node = ast.identifier(value);
            expect(node).to.be.an.instanceOf(AstIdentifier);
            expect(node).to.have.a.property('type').that.is.equal('identifier');
            expect(node).to.have.a.property('value').that.is.equal(value);
        });

    });

    describe('boolean', () => {

        it('should create an AstIdentifier', () => {
            const value = true;
            const node = ast.boolean(value);
            expect(node).to.be.an.instanceOf(AstBoolean);
            expect(node).to.have.a.property('type').that.is.equal('boolean');
            expect(node).to.have.a.property('value').that.is.equal(value);
        });

    });

    describe('undefined', () => {

        it('should create an AstUndefined', () => {
            const value = null;
            const node = ast.undefined(value);
            expect(node).to.be.an.instanceOf(AstUndefined);
            expect(node).to.have.a.property('type').that.is.equal('undefined');
            expect(node).to.have.a.property('value').that.is.equal(value);
        });

    });

    describe('lineComment', () => {

        it('should create an AstLineComment', () => {
            const value = 'foo';
            const node = ast.lineComment(value);
            expect(node).to.be.an.instanceOf(AstLineComment);
            expect(node).to.have.a.property('type').that.is.equal('lineComment');
            expect(node).to.have.a.property('value').that.is.equal(value);
        });

    });

    describe('blockComment', () => {

        it('should create an AstBlockComment', () => {
            const value = 'foo';
            const node = ast.blockComment(value);
            expect(node).to.be.an.instanceOf(AstBlockComment);
            expect(node).to.have.a.property('type').that.is.equal('blockComment');
            expect(node).to.have.a.property('value').that.is.deep.equal([value]);
        });

    });

    describe('binaryOperator', () => {

        it('should create an AstBinaryOperator', () => {
            const operator = '+';
            const left = ast.number(20);
            const right = ast.number(22);
            const node = ast.binaryOperator(left, operator, right);
            expect(node).to.be.an.instanceOf(AstBinaryOperator);
            expect(node).to.have.a.property('type').that.is.equal('binaryOperator');
            expect(node).to.have.a.property('operator').that.is.equal(operator);
            expect(node).to.have.a.property('left').that.is.equal(left);
            expect(node).to.have.a.property('right').that.is.equal(right);
        });

    });

    describe('unaryOperator', () => {

        it('should create an AstUnaryOperator', () => {
            const operator = '-';
            const value = ast.number(42);
            const node = ast.unaryOperator(operator, value);
            expect(node).to.be.an.instanceOf(AstUnaryOperator);
            expect(node).to.have.a.property('type').that.is.equal('unaryOperator');
            expect(node).to.have.a.property('operator').that.is.equal(operator);
            expect(node).to.have.a.property('value').that.is.equal(value);
        });

    });

    describe('assignment', () => {

        it('should create an AstAssignment', () => {
            const identifier = ast.identifier('answer');
            const value = ast.number(42);
            const node = ast.assignment(identifier, value);
            expect(node).to.be.an.instanceOf(AstAssignment);
            expect(node).to.have.a.property('type').that.is.equal('assignment');
            expect(node).to.have.a.property('identifier').that.is.equal(identifier);
            expect(node).to.have.a.property('value').that.is.equal(value);
        });

    });

});
