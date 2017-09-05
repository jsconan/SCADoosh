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
 * Unit tests: base AST node.
 *
 * @package tests/ast/classes
 * @author jsconan
 */

const chai = require('chai');
const expect = chai.expect;

const AstNode = require('../../../src/ast/classes/node');

describe('AST node: AstNode', () => {

    it('should throw a TypeError if the type is missing', () => {
        expect(() => {
            new AstNode();
        }).to.throw(TypeError);

        expect(() => {
            new AstNode("");
        }).to.throw(TypeError);
    });

    it('should throw a TypeError if the type is not a string', () => {
        expect(() => {
            new AstNode({myProp: "a property"});
        }).to.throw(TypeError);

        expect(() => {
            new AstNode(true);
        }).to.throw(TypeError);
    });

    it('should create an AstNode with the specified type', () => {
        const type = 'literal';
        const node = new AstNode(type);

        expect(node).to.be.an('object');
        expect(node).to.be.an.instanceOf(AstNode);
        expect(node).to.have.a.property('type').that.is.equal(type);
    });

    it('should create an AstNode with the specified properties', () => {
        const type = 'literal';
        const position = 10;
        const offset = 9;
        const node = new AstNode({
            type: type,
            position: position,
            offset: offset
        });

        expect(node).to.be.an('object');
        expect(node).to.be.an.instanceOf(AstNode);
        expect(node).to.have.a.property('type').that.is.equal(type);
        expect(node).to.have.a.property('position').that.is.equal(position);
        expect(node).to.have.a.property('offset').that.is.equal(offset);
    });

    it('should create an AstNode with the specified type and properties', () => {
        const type = 'literal';
        const position = 10;
        const offset = 9;
        const node = new AstNode(type, {
            position: position,
            offset: offset
        });

        expect(node).to.be.an('object');
        expect(node).to.be.an.instanceOf(AstNode);
        expect(node).to.have.a.property('type').that.is.equal(type);
        expect(node).to.have.a.property('position').that.is.equal(position);
        expect(node).to.have.a.property('offset').that.is.equal(offset);
    });

    it('should stringify an AstNode', () => {
        const type = 'literal';
        const node = new AstNode(type);
        const stringified = '{"type":"' + type + '"}';

        expect(node).to.be.an('object');
        expect(node).to.be.an.instanceOf(AstNode);
        expect(node).to.have.a.property('type').that.is.equal(type);
        expect(node + '').to.be.equal(stringified);
    });

    it('should add read-only values', () => {
        const type = 'literal';
        const prop = 'an additional property';
        const props = {
            one: 1,
            two: 2
        };
        const node = new AstNode(type);

        expect(node.addProperty('myProp', prop)).to.be.equal(node);

        expect(node).to.be.an('object');
        expect(node).to.be.an.instanceOf(AstNode);
        expect(node).to.have.a.property('type').that.is.equal(type);
        expect(node).to.have.a.property('myProp').that.is.equal(prop);

        node.myProp = 'another value';

        expect(node.myProp).to.be.equal(prop);

        expect(node.addProperties(props)).to.be.equal(node);

        expect(node).to.have.a.property('one').that.is.equal(props.one);
        expect(node).to.have.a.property('two').that.is.equal(props.two);

        node.one = 42;
        node.two = 42;

        expect(node.one).to.be.equal(props.one);
        expect(node.two).to.be.equal(props.two);
    });

    it('should not allow to redefine existing properties', () => {
        const type = 'literal';
        const position = 10;
        const offset = 9;
        const node = new AstNode({
            type: type,
            position: position,
            offset: offset
        });

        expect(node).to.be.an('object');
        expect(node).to.be.an.instanceOf(AstNode);
        expect(node).to.have.a.property('type').that.is.equal(type);
        expect(node).to.have.a.property('position').that.is.equal(position);
        expect(node).to.have.a.property('offset').that.is.equal(offset);

        expect(() => node.addProperty('type', 'identifier')).to.throw(TypeError);
        expect(() => node.addProperty('position', 20)).to.throw(TypeError);
        expect(() => node.addProperty('offset', 19)).to.throw(TypeError);
        expect(() => node.addProperties({
            type: 'number',
            position: 8,
            offset: 7
        })).to.throw(TypeError);

        expect(node.type).to.be.equal(type);
        expect(node.position).to.be.equal(position);
        expect(node.offset).to.be.equal(offset);
    });

    it('should clone an AstNode', () => {
        const type = 'literal';
        const position = 10;
        const offset = 9;
        const node = new AstNode({
            type: type,
            position: position,
            offset: offset
        });

        const clone = node.clone();

        expect(clone).to.be.an('object');
        expect(clone).to.be.an.instanceOf(AstNode);
        expect(clone).to.not.be.equal(node);
        expect(clone).to.be.deep.equal(node);
    });

    it('should clone an AstNode with the provided properties', () => {
        const type = 'literal';
        const position = 10;
        const offset = 9;
        const newPosition = 5;
        const newOffset = 4;
        const node = new AstNode({
            type: type,
            position: position,
            offset: offset
        });

        const clone = node.clone({
            type: 'number',         // should not be allowed
            position: newPosition,
            offset: newOffset
        });

        expect(clone).to.be.an('object');
        expect(clone).to.be.an.instanceOf(AstNode);
        expect(clone).to.not.be.equal(node);
        expect(clone).to.be.not.deep.equal(node);
        expect(clone).to.have.a.property('type').that.is.equal(node.type);
        expect(clone).to.have.a.property('position').that.is.equal(newPosition);
        expect(clone).to.have.a.property('offset').that.is.equal(newOffset);
    });

    it('should tell if the AstNode has the right type', () => {
        class AstFoo extends AstNode {}

        const type = 'literal';
        const node = new AstNode(type);
        const foo = new AstFoo('identifier');

        expect(node.is(AstNode)).to.be.true;
        expect(node.is(AstFoo)).to.be.false;
        expect(node.is(type)).to.be.true;
        expect(node.is('identifier')).to.be.false;
        expect(node.is('test')).to.be.false;
        expect(node.is(1)).to.be.false;

        expect(foo.is(AstNode)).to.be.true;
        expect(foo.is(AstFoo)).to.be.true;
        expect(foo.is(type)).to.be.false;
        expect(foo.is('identifier')).to.be.true;
        expect(foo.is('test')).to.be.false;
        expect(foo.is(1)).to.be.false;
    });

    it('should validate an AstNode object or not', () => {
        class AstFoo extends AstNode {}

        const type = 'literal';
        const node = new AstNode(type);
        const foo = new AstFoo(type);

        expect(AstNode.validate(node)).to.be.true;
        expect(AstNode.validate(node, type)).to.be.true;
        expect(AstNode.validate(foo, type)).to.be.true;
        expect(AstNode.validate(node, AstFoo)).to.be.false;
        expect(AstNode.validate(foo, AstFoo)).to.be.true;

        expect(AstNode.validate({})).to.be.false;
        expect(AstNode.validate({type: type})).to.be.false;
        expect(AstNode.validate({type: type}, type)).to.be.false;
    });

});
