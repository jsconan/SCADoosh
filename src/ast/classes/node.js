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
 * Defines an AST node.
 *
 * @package src/ast/classes
 * @author jsconan
 */


const _ = require('lodash');

/**
 * Defines an AST node.
 * @typedef {Object} AstNode
 * @property {String} type
 */
class AstNode {
    /**
     * Creates an AstNode.
     * @param {String|Object} type - The node's type. It is mandatory, a `TypeError` will be thrown if missing.
     * @param {Object} [properties] - An optional list of additional properties to set.
     * @throws {TypeError} if the type is missing
     * @throws {TypeError} if the properties are invalid
     */
    constructor(type, properties) {
        if (typeof type === 'object') {
            properties = type;
        } else {
            properties = _.assign({}, properties, {type: type});
        }

        if (!properties.type || typeof properties.type !== "string") {
            throw new TypeError('An AST node should have a type!');
        }

        this.addProperties(properties);
    }

    /**
     * Stringifies the object.
     * @returns {String}
     */
    toString() {
        return JSON.stringify(this);
    }

    /**
     * Adds a read-only property to the object.
     * @param {String} name
     * @param {*} value
     * @returns {AstNode}
     */
    addProperty(name, value) {
        Object.defineProperty(this, name, {
            value: value,
            configurable: false,
            enumerable: true,
            writable: false
        });
        return this;
    }

    /**
     * Adds a list of read-only properties to the object.
     * @param {Object} properties
     * @returns {AstNode}
     * @throws {TypeError} if the properties are invalid
     */
    addProperties(properties) {
        _.forEach(this.mapProperties(properties), (value, name) => {
            this.addProperty(name, value);
        });
        return this;
    }

    /**
     * Gets the properties of the object, without the type.
     * @returns {Object}
     */
    getProperties() {
        return _.omit(this, 'type');
    }

    /**
     * Transforms the properties before assign them to the node.
     * @param {Object} properties - The properties to transform
     * @returns {Object}
     * @throws {TypeError} if the properties are invalid
     */
    mapProperties(properties) {
        return properties;
    }

    /**
     * Clones the instance.
     * @param {Object} [properties] - an optional list of additional properties to set.
     * @returns {AstNode}
     * @throws {TypeError} if the properties are invalid
     */
    clone(properties) {
        const clone = Object.create(this.constructor.prototype);
        return clone.addProperties(_.defaults(_.omit(properties, 'type'), this));
    }

    /**
     * Checks whether the node is of a particular type or not.
     * @param {String|Function} [type] - Could be a type name or a class constructor.
     * @returns {Boolean}
     */
    is(type) {
        return AstNode.validate(this, type);
    }

    /**
     * Checks whether an object is an AstNode or not.
     * @param {Object} obj - The Object to check
     * @param {String|Function} [type] - Could be a type name or a class constructor.
     * @returns {Boolean}
     */
    static validate(obj, type) {
        const isClass = _.isFunction(type);
        const Class = isClass ? type : this;
        return (obj && obj instanceof Class) && (!type || isClass || obj.type === type);
    }

    /**
     * Checks if the nodes are valid AST nodes
     * @param {AstFragment[]} nodes
     * @param {String|Function} [type] - Could be a type name or a class constructor.
     * @returns {Boolean}
     */
    static validateNodes(nodes, type) {
        return _.isArray(nodes) && nodes.every((parameter) => {
            return this.validate(parameter, type);
        });
    }
}

module.exports = AstNode;
