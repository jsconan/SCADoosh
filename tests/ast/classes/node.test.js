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

describe('AstNode', () => {

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
        const type = 'Literal';
        const node = new AstNode(type);

        expect(node).to.be.an('object');
        expect(node).to.be.an.instanceOf(AstNode);
        expect(node).to.have.a.property('type').that.is.equal(type);
    });

    it('should create an AstNode with the specified properties', () => {
        const type = 'Literal';
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
        const type = 'Literal';
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

    it('should create an AstNode with the transformed properties', () => {
        class AstFoo extends AstNode {
            mapProperties(properties) {
                if (properties && properties.value) {
                    properties.value = '' + properties.value
                }
                return properties;
            }
        }
        const type = 'Literal';
        const value = 42;
        const node = new AstFoo(type, {
            value: value
        });

        expect(node).to.be.an('object');
        expect(node).to.be.an.instanceOf(AstNode);
        expect(node).to.be.an.instanceOf(AstFoo);
        expect(node).to.have.a.property('type').that.is.equal(type);
        expect(node).to.have.a.property('value').that.is.equal('' + value);
    });

    it('should stringify an AstNode', () => {
        const type = 'Literal';
        const node = new AstNode(type);
        const stringified = '{"type":"' + type + '"}';

        expect(node).to.be.an('object');
        expect(node).to.be.an.instanceOf(AstNode);
        expect(node).to.have.a.property('type').that.is.equal(type);
        expect(node + '').to.be.equal(stringified);
    });

    it('should add read-only values', () => {
        const type = 'Literal';
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
        const type = 'Literal';
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

        expect(() => node.addProperty('type', 'Identifier')).to.throw(TypeError);
        expect(() => node.addProperty('position', 20)).to.throw(TypeError);
        expect(() => node.addProperty('offset', 19)).to.throw(TypeError);
        expect(() => node.addProperties({
            type: 'Number',
            position: 8,
            offset: 7
        })).to.throw(TypeError);

        expect(node.type).to.be.equal(type);
        expect(node.position).to.be.equal(position);
        expect(node.offset).to.be.equal(offset);
    });

    it('should get the properties', () => {
        const type = 'Literal';
        const properties = {
            name: 'foo',
            value: 42,
            position: 10,
            offset: 9
        };
        const node = new AstNode(type, Object.assign({}, properties));

        expect(node).to.be.an('object');
        expect(node).to.be.an.instanceOf(AstNode);
        expect(node).to.have.a.property('type').that.is.equal(type);
        Object.keys(properties).forEach((name) => {
            expect(node).to.have.a.property(name).that.is.equal(properties[name]);
        });

        expect(node.getProperties()).to.be.deep.equal(properties);
    });

    it('should clone an AstNode', () => {
        const type = 'Literal';
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
        const type = 'Literal';
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
            type: 'Number',         // should not be allowed
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

    it('should clone an AstNode with the transformed properties', () => {
        class AstFoo extends AstNode {
            mapProperties(properties) {
                if (properties && properties.value) {
                    properties.value = '' + properties.value
                }
                return properties;
            }
        }

        const type = 'Literal';
        const value = 42;
        const newValue = 21;
        const node = new AstFoo({
            type: type,
            value: value
        });

        const clone = node.clone({
            type: 'Number',         // should not be allowed
            value: newValue
        });

        expect(clone).to.be.an('object');
        expect(clone).to.be.an.instanceOf(AstNode);
        expect(clone).to.be.an.instanceOf(AstFoo);
        expect(clone).to.not.be.equal(node);
        expect(clone).to.be.not.deep.equal(node);
        expect(clone).to.have.a.property('type').that.is.equal(node.type);
        expect(clone).to.have.a.property('value').that.is.equal('' + newValue);
    });

    it('should tell if the AstNode has the right type', () => {
        class AstFoo extends AstNode {}

        const type = 'Literal';
        const node = new AstNode(type);
        const foo = new AstFoo('Identifier');

        expect(node.is(AstNode)).to.be.true;
        expect(node.is(AstFoo)).to.be.false;
        expect(node.is(type)).to.be.true;
        expect(node.is('Identifier')).to.be.false;
        expect(node.is('Test')).to.be.false;
        expect(node.is(1)).to.be.false;

        expect(foo.is(AstNode)).to.be.true;
        expect(foo.is(AstFoo)).to.be.true;
        expect(foo.is(type)).to.be.false;
        expect(foo.is('Identifier')).to.be.true;
        expect(foo.is('Test')).to.be.false;
        expect(foo.is(1)).to.be.false;
    });

    it('should validate an AstNode object or not', () => {
        class AstFoo extends AstNode {}

        const type = 'Literal';
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

    it('should validate the node from the inherited class instead of AstNode', () => {
        class AstFoo extends AstNode {}

        const type = 'Literal';
        const node = new AstNode(type);
        const foo = new AstFoo(type);

        expect(AstFoo.validate(node)).to.be.false;
        expect(AstFoo.validate(foo)).to.be.true;
        expect(AstFoo.validate(node, type)).to.be.false;
        expect(AstFoo.validate(foo, type)).to.be.true;
        expect(AstFoo.validate(node, AstFoo)).to.be.false;
        expect(AstFoo.validate(node, AstNode)).to.be.true;
        expect(AstFoo.validate(foo, AstFoo)).to.be.true;
    });

    it('should validate a list of nodes', () => {
        const type = 'Literal';
        const node = new AstNode(type);

        expect(AstNode.validateNodes(node)).to.be.false;
        expect(AstNode.validateNodes({})).to.be.false;
        expect(AstNode.validateNodes([node])).to.be.true;
        expect(AstNode.validateNodes([node], type)).to.be.true;
        expect(AstNode.validateNodes([node], 'foo')).to.be.false;
        expect(AstNode.validateNodes([])).to.be.true;
        expect(AstNode.validateNodes([{}])).to.be.false;
    });

    it('should validate a list of nodes from the inherited class instead of AstNode', () => {
        class AstFoo extends AstNode {}
        const type = 'Foo';
        const node = new AstNode(type);
        const foo = new AstFoo(type);

        expect(AstFoo.validateNodes(node)).to.be.false;
        expect(AstFoo.validateNodes({})).to.be.false;
        expect(AstFoo.validateNodes([node])).to.be.false;
        expect(AstFoo.validateNodes([foo])).to.be.true;
        expect(AstFoo.validateNodes([foo, node])).to.be.false;
        expect(AstFoo.validateNodes([node], type)).to.be.false;
        expect(AstFoo.validateNodes([foo], type)).to.be.true;
        expect(AstFoo.validateNodes([foo, node], type)).to.be.false;
        expect(AstFoo.validateNodes([node, foo], AstFoo)).to.be.false;
        expect(AstFoo.validateNodes([node, foo], AstNode)).to.be.true;
        expect(AstFoo.validateNodes([foo], AstFoo)).to.be.true;
        expect(AstFoo.validateNodes([foo, node], AstFoo)).to.be.false;
    });

});
