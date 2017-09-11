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
 * Unit tests: AST node that represents a language fragment.
 *
 * @package tests/ast/classes
 * @author jsconan
 */

const chai = require('chai');
const expect = chai.expect;

const AstNode = require('../../../src/ast/classes/node');
const AstPosition = require('../../../src/ast/classes/position');
const AstFragment = require('../../../src/ast/classes/fragment');

describe('AstFragment', () => {

    it('should throw a TypeError if the type is missing', () => {
        expect(() => {
            new AstFragment();
        }).to.throw(TypeError);

        expect(() => {
            new AstFragment("");
        }).to.throw(TypeError);
    });

    it('should throw a TypeError if the type is not a string', () => {
        expect(() => {
            new AstFragment({myProp: "a property"});
        }).to.throw(TypeError);

        expect(() => {
            new AstFragment(true);
        }).to.throw(TypeError);
    });

    it('should throw a TypeError if the positions are not AstPosition', () => {
        expect(() => {
            new AstFragment({type: 'Foo', start: {}});
        }).to.throw(TypeError);

        expect(() => {
            new AstFragment({type: 'Foo', start: new AstNode('Foo')});
        }).to.throw(TypeError);

        expect(() => {
            new AstFragment({type: 'Foo', end: {}});
        }).to.throw(TypeError);

        expect(() => {
            new AstFragment({type: 'Foo', end: new AstNode('Foo')});
        }).to.throw(TypeError);
    });

    it('should create an AstFragment with the specified type', () => {
        const type = 'Literal';
        const node = new AstFragment(type);

        expect(node).to.be.an('object');
        expect(node).to.be.an.instanceOf(AstNode);
        expect(node).to.be.an.instanceOf(AstFragment);
        expect(node).to.have.a.property('type').that.is.equal(type);
    });

    it('should create an AstFragment with the specified properties', () => {
        const type = 'Literal';
        const start = new AstPosition(1, 2, 1);
        const end = new AstPosition(2, 3, 2);
        const node = new AstFragment({
            type: type,
            start: start,
            end: end
        });

        expect(node).to.be.an('object');
        expect(node).to.be.an.instanceOf(AstNode);
        expect(node).to.be.an.instanceOf(AstFragment);
        expect(node).to.have.a.property('type').that.is.equal(type);
        expect(node).to.have.a.property('start').that.is.equal(start);
        expect(node).to.have.a.property('end').that.is.equal(end);
    });

    it('should create an AstFragment with the specified type and properties', () => {
        const type = 'Literal';
        const start = new AstPosition(1, 2, 1);
        const end = new AstPosition(2, 3, 2);
        const node = new AstFragment(type, {
            start: start,
            end: end
        });

        expect(node).to.be.an('object');
        expect(node).to.be.an.instanceOf(AstNode);
        expect(node).to.be.an.instanceOf(AstFragment);
        expect(node).to.have.a.property('type').that.is.equal(type);
        expect(node).to.have.a.property('start').that.is.equal(start);
        expect(node).to.have.a.property('end').that.is.equal(end);
    });

    it('should create an AstFragment with the specified position from other AstFragment', () => {
        const type = 'Literal';
        const startLine = 1;
        const startColumn = 1;
        const startOffset = 0;
        const endLine = 2;
        const endColumn = 1;
        const endOffset = 10;
        const expected = {
            type: type,
            start: {type: 'Position', line: startLine, column: startColumn, offset: startOffset},
            end: {type: 'Position', line: endLine, column: endColumn, offset: endOffset}
        };
        const other = (new AstFragment(type)).startAt(startLine, startColumn, startOffset).endAt(endLine, endColumn, endOffset);
        const node = new AstFragment(type, {
            start: other,
            end: other,
        });

        expect(node).to.be.an('object');
        expect(node).to.be.an.instanceOf(AstNode);
        expect(node).to.be.an.instanceOf(AstFragment);
        expect(node).to.deep.equal(expected);
        expect(node.start).to.be.instanceOf(AstPosition);
        expect(node.end).to.be.instanceOf(AstPosition);
    });

    it('should create an AstFragment with the specified position from provided AstPosition', () => {
        const type = 'Literal';
        const startLine = 1;
        const startColumn = 1;
        const startOffset = 0;
        const endLine = 2;
        const endColumn = 1;
        const endOffset = 10;
        const expected = {
            type: type,
            start: {type: 'Position', line: startLine, column: startColumn, offset: startOffset},
            end: {type: 'Position', line: endLine, column: endColumn, offset: endOffset}
        };
        const start = new AstPosition(startLine, startColumn, startOffset);
        const end = new AstPosition(endLine, endColumn, endOffset);
        const node = new AstFragment(type, {
            start: start,
            end: end,
        });

        expect(node).to.be.an('object');
        expect(node).to.be.an.instanceOf(AstNode);
        expect(node).to.be.an.instanceOf(AstFragment);
        expect(node).to.deep.equal(expected);
        expect(node.start).to.be.instanceOf(AstPosition);
        expect(node.start).to.be.equal(start);
        expect(node.end).to.be.instanceOf(AstPosition);
        expect(node.end).to.be.equal(end);
    });

    it('should add a position in an AstFragment from line, column, offset values', () => {
        const type = 'Literal';
        const startLine = 1;
        const startColumn = 1;
        const startOffset = 0;
        const endLine = 2;
        const endColumn = 1;
        const endOffset = 10;
        const expected = {
            type: type,
            start: {type: 'Position', line: startLine, column: startColumn, offset: startOffset},
            end: {type: 'Position', line: endLine, column: endColumn, offset: endOffset}
        };
        const node = new AstFragment(type);

        expect(node.startAt(startLine, startColumn, startOffset)).to.be.equal(node);
        expect(node.endAt(endLine, endColumn, endOffset)).to.be.equal(node);

        expect(node).to.be.an('object');
        expect(node).to.be.an.instanceOf(AstNode);
        expect(node).to.be.an.instanceOf(AstFragment);
        expect(node).to.deep.equal(expected);
        expect(node.start).to.be.instanceOf(AstPosition);
        expect(node.end).to.be.instanceOf(AstPosition);
    });

    it('should add a position in an AstFragment from other AstFragment', () => {
        const type = 'Literal';
        const startLine = 1;
        const startColumn = 1;
        const startOffset = 0;
        const endLine = 2;
        const endColumn = 1;
        const endOffset = 10;
        const expected = {
            type: type,
            start: {type: 'Position', line: startLine, column: startColumn, offset: startOffset},
            end: {type: 'Position', line: endLine, column: endColumn, offset: endOffset}
        };
        const other = new AstFragment(type);
        const node = new AstFragment(type);

        expect(other.startAt(startLine, startColumn, startOffset)).to.be.equal(other);
        expect(other.endAt(endLine, endColumn, endOffset)).to.be.equal(other);

        expect(node.startAt(other)).to.be.equal(node);
        expect(node.endAt(other)).to.be.equal(node);

        expect(node).to.be.an('object');
        expect(node).to.be.an.instanceOf(AstNode);
        expect(node).to.be.an.instanceOf(AstFragment);
        expect(node).to.deep.equal(expected);
        expect(node.start).to.be.instanceOf(AstPosition);
        expect(node.end).to.be.instanceOf(AstPosition);
    });

    it('should add a position in an AstFragment from provided AstPosition', () => {
        const type = 'Literal';
        const startLine = 1;
        const startColumn = 1;
        const startOffset = 0;
        const endLine = 2;
        const endColumn = 1;
        const endOffset = 10;
        const expected = {
            type: type,
            start: {type: 'Position', line: startLine, column: startColumn, offset: startOffset},
            end: {type: 'Position', line: endLine, column: endColumn, offset: endOffset}
        };
        const start = new AstPosition(startLine, startColumn, startOffset);
        const end = new AstPosition(endLine, endColumn, endOffset);
        const node = new AstFragment(type);

        expect(node.startAt(start)).to.be.equal(node);
        expect(node.endAt(end)).to.be.equal(node);

        expect(node).to.be.an('object');
        expect(node).to.be.an.instanceOf(AstNode);
        expect(node).to.be.an.instanceOf(AstFragment);
        expect(node).to.deep.equal(expected);
        expect(node.start).to.be.instanceOf(AstPosition);
        expect(node.start).to.be.equal(start);
        expect(node.end).to.be.instanceOf(AstPosition);
        expect(node.end).to.be.equal(end);
    });

    it('should not add a position in an AstFragment from non AstFragment', () => {
        const type = 'Literal';
        const node = new AstFragment(type);
        const other = new AstNode('Other');

        expect(() => node.startAt({})).to.throw(TypeError);
        expect(() => node.endAt({})).to.throw(TypeError);

        expect(() => node.startAt(other)).to.throw(TypeError);
        expect(() => node.endAt(other)).to.throw(TypeError);
    });

    it('should stringify an AstFragment', () => {
        const type = 'Literal';
        const startLine = 1;
        const startColumn = 1;
        const startOffset = 0;
        const endLine = 2;
        const endColumn = 1;
        const endOffset = 10;
        const expected = {
            type: type,
            start: {type: 'Position', line: startLine, column: startColumn, offset: startOffset},
            end: {type: 'Position', line: endLine, column: endColumn, offset: endOffset}
        };
        const node = new AstFragment(type);
        const stringified = '{"type":"' + type + '",' +
            '"start":{"type":"Position","line":' + startLine + ',"column":' + startColumn + ',"offset":' + startOffset + '},' +
            '"end":{"type":"Position","line":' + endLine + ',"column":' + endColumn + ',"offset":' + endOffset + '}}';

        node.startAt(startLine, startColumn, startOffset);
        node.endAt(endLine, endColumn, endOffset);

        expect(node).to.be.an('object');
        expect(node).to.be.an.instanceOf(AstNode);
        expect(node).to.be.an.instanceOf(AstFragment);
        expect(node).to.deep.equal(expected);
        expect(node + '').to.be.equal(stringified);
    });

    it('should clone an AstFragment', () => {
        const type = 'Literal';
        const value = 'foo';
        const node = (new AstFragment({
            type: type,
            value: value
        })).startAt(1, 1, 0).endAt(1, 4, 3);

        const clone = node.clone();

        expect(clone).to.be.an('object');
        expect(clone).to.be.an.instanceOf(AstNode);
        expect(clone).to.be.an.instanceOf(AstFragment);
        expect(clone).to.not.be.equal(node);
        expect(clone).to.be.deep.equal(node);
    });

    it('should clone an AstFragment with the provided properties', () => {
        const type = 'Literal';
        const value = 'foo';
        const newValue = 'bar';
        const other = (new AstFragment(type)).startAt(3, 4, 5).endAt(6, 7, 8);
        const end = new AstPosition(10, 11, 12);
        const node = (new AstFragment({
            type: type,
            value: value
        })).startAt(1, 1, 0).endAt(1, 4, 3);

        const clone = node.clone({
            type: 'Number',         // should not be allowed
            value: newValue,
            start: other,
            end: end
        });

        expect(clone).to.be.an('object');
        expect(clone).to.be.an.instanceOf(AstNode);
        expect(clone).to.be.an.instanceOf(AstFragment);
        expect(clone).to.not.be.equal(node);
        expect(clone).to.be.not.deep.equal(node);
        expect(clone).to.have.a.property('type').that.is.equal(node.type);
        expect(clone).to.have.a.property('value').that.is.equal(newValue);
        expect(clone).to.have.a.property('start').that.is.equal(other.start);
        expect(clone).to.have.a.property('end').that.is.equal(end);
    });

    it('should throw a TypeError if the position to set in a clone is not an AstPosition', () => {
        const node = (new AstFragment('Foo')).startAt(1, 1, 0).endAt(1, 4, 3);

        expect(() => node.clone({start: ''})).to.throw(TypeError);
        expect(() => node.clone({start: 'foo'})).to.throw(TypeError);
        expect(() => node.clone({start: {}})).to.throw(TypeError);
        expect(() => node.clone({start: new AstNode('Foo')})).to.throw(TypeError);
        expect(() => node.clone({start: 10})).to.throw(TypeError);
        expect(() => node.clone({start: 0})).to.throw(TypeError);

        expect(() => node.clone({end: ''})).to.throw(TypeError);
        expect(() => node.clone({end: 'foo'})).to.throw(TypeError);
        expect(() => node.clone({end: {}})).to.throw(TypeError);
        expect(() => node.clone({end: new AstNode('Foo')})).to.throw(TypeError);
        expect(() => node.clone({end: 10})).to.throw(TypeError);
        expect(() => node.clone({end: 0})).to.throw(TypeError);
    });

});
