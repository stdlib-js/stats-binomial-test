/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// MODULES //

var isNumber = require( '@stdlib/assert-is-number' ).isPrimitive;
var isObject = require( '@stdlib/assert-is-plain-object' );
var isString = require( '@stdlib/assert-is-string' ).isPrimitive;
var isnan = require( '@stdlib/assert-is-nan' );
var hasOwnProp = require( '@stdlib/assert-has-own-property' );
var format = require( '@stdlib/string-format' );


// MAIN //

/**
* Validates function options.
*
* @private
* @param {Object} opts - destination for validated options
* @param {Options} options - function options
* @param {number} [options.alpha] - significance level
* @param {string} [options.alternative] - alternative hypothesis (`two-sided`, `less` or `greater`)
* @param {number} [options.p] - probability under H0
* @returns {(null|Error)} null or an error
*/
function validate( opts, options ) {
	if ( !isObject( options ) ) {
		return new TypeError( format( 'invalid argument. Options argument must be an object. Value: `%s`.', options ) );
	}
	if ( hasOwnProp( options, 'alpha' ) ) {
		opts.alpha = options.alpha;
		if ( !isNumber( opts.alpha ) || isnan( opts.alpha ) ) {
			return new TypeError( format( 'invalid option. `%s` option must be a number. Option: `%s`.', 'alpha', opts.alpha ) );
		}
	}
	if ( hasOwnProp( options, 'alternative' ) ) {
		opts.alternative = options.alternative;
		if ( !isString( opts.alternative ) ) {
			return new TypeError( format( 'invalid option. `%s` option must be a string. Option: `%s`.', 'alternative', opts.alternative ) );
		}
	}
	if ( hasOwnProp( options, 'p' ) ) {
		opts.p = options.p;
		if ( !isNumber( opts.p ) || isnan( opts.p ) ) {
			return new TypeError( format( 'invalid option. `%s` option must be a number. Option: `%s`.', 'p', opts.p ) );
		}
	}
	return null;
}


// EXPORTS //

module.exports = validate;
