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
 * @package tests/ast
 * @author jsconan
 */

const chai = require('chai');
const expect = chai.expect;

const AstNode = require('./../../src/ast/node');

describe('OpenSCAD AstNode', () => {

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
        expect(node).to.have.a.property('type').that.is.equal(type);

        node.type = 'identifier';

        expect(node.type).to.be.equal(type);
    });

    it('should create an AstNode with the specified properties', () => {
        const type = 'literal';
        const position= 10;
        const offset = 9;
        const node = new AstNode({
            type: type,
            position: position,
            offset: offset
        });

        expect(node).to.be.an('object');
        expect(node).to.have.a.property('type').that.is.equal(type);
        expect(node).to.have.a.property('position').that.is.equal(position);
        expect(node).to.have.a.property('offset').that.is.equal(offset);

        node.type = 'identifier';
        node.position = 20;
        node.offset = 19;

        expect(node.type).to.be.equal(type);
        expect(node.position).to.be.equal(position);
        expect(node.offset).to.be.equal(offset);
    });

    it('should create an AstNode with the specified type and properties', () => {
        const type = 'literal';
        const position= 10;
        const offset = 9;
        const node = new AstNode(type, {
            position: position,
            offset: offset
        });

        expect(node).to.be.an('object');
        expect(node).to.have.a.property('type').that.is.equal(type);
        expect(node).to.have.a.property('position').that.is.equal(position);
        expect(node).to.have.a.property('offset').that.is.equal(offset);

        node.type = 'identifier';
        node.position = 20;
        node.offset = 19;

        expect(node.type).to.be.equal(type);
        expect(node.position).to.be.equal(position);
        expect(node.offset).to.be.equal(offset);
    });

    it('should stringify an AstNode', () => {
        const type = 'literal';
        const node = new AstNode(type);
        const stringified = '{"type":"' + type + '"}';

        expect(node).to.be.an('object');
        expect(node).to.have.a.property('type').that.is.equal(type);
        expect(node + '').to.be.equal(stringified);
    });

    it('should add read-only values', () => {
        const type = 'literal';
        const prop = 'an additional property';
        const node = new AstNode(type);

        node.addProperty('myProp', prop);

        expect(node).to.be.an('object');
        expect(node).to.have.a.property('type').that.is.equal(type);
        expect(node).to.have.a.property('myProp').that.is.equal(prop);

        node.myProp = 'another value';

        expect(node.myProp).to.be.equal(prop);
    });

    it('should not allow to redefine existing properties', () => {
        const type = 'literal';
        const position= 10;
        const offset = 9;
        const node = new AstNode({
            type: type,
            position: position,
            offset: offset
        });

        expect(node).to.be.an('object');
        expect(node).to.have.a.property('type').that.is.equal(type);
        expect(node).to.have.a.property('position').that.is.equal(position);
        expect(node).to.have.a.property('offset').that.is.equal(offset);

        expect(() => node.addProperty('type', 'identifier')).to.throw(TypeError);
        expect(() => node.addProperty('position', 20)).to.throw(TypeError);
        expect(() => node.addProperty('offset', 19)).to.throw(TypeError);

        expect(node.type).to.be.equal(type);
        expect(node.position).to.be.equal(position);
        expect(node.offset).to.be.equal(offset);
    });

    it('should validate an AstNode object or not', () => {
        const type = 'literal';
        const node = new AstNode(type);

        expect(AstNode.validate(node)).to.be.true;
        expect(AstNode.validate(node, type)).to.be.true;
        expect(AstNode.validate(node, 'identifier')).to.be.false;

        expect(AstNode.validate({})).to.be.false;
        expect(AstNode.validate({type: type})).to.be.false;
        expect(AstNode.validate({type: type}, type)).to.be.false;
    });

});
