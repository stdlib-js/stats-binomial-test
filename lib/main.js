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

var setReadOnly = require( '@stdlib/utils-define-read-only-property' );
var isNumberArray = require( '@stdlib/assert-is-number-array' );
var isNonNegativeInteger = require( '@stdlib/assert-is-nonnegative-integer' );
var betaQuantile = require( '@stdlib/stats-base-dists-beta-quantile' );
var floor = require( '@stdlib/math-base-special-floor' );
var ceil = require( '@stdlib/math-base-special-ceil' );
var binomialCDF = require( '@stdlib/stats-base-dists-binomial-cdf' );
var binomialPMF = require( '@stdlib/stats-base-dists-binomial-pmf' );
var format = require( '@stdlib/string-format' );
var validate = require( './validate.js' );
var print = require( './print.js' ); // eslint-disable-line stdlib/no-redeclare


// VARIABLES //

var RELATIVE_ERROR = 1+1e-07;


// FUNCTIONS //

/**
* Calculates the lower endpoint of a confidence interval.
*
* @private
* @param {NonNegativeInteger} x - number of successes
* @param {NonNegativeInteger} n - total number of observations
* @param {number} alpha - significance level
* @returns {number} lower endpoint
*/
function lower( x, n, alpha ) {
	return ( x === 0 ) ? 0 : betaQuantile( alpha, x, n - x + 1 );
}

/**
* Calculates the upper endpoint of a confidence interval.
*
* @private
* @param {NonNegativeInteger} x - number of successes
* @param {NonNegativeInteger} n - total number of observations
* @param {number} alpha - significance level
* @returns {number} upper endpoint
*/
function upper( x, n, alpha ) {
	return ( x === n ) ? 1 : betaQuantile( 1 - alpha, x + 1, n - x );
}


// MAIN //

/**
* Computes an exact test for the success probability in a Bernoulli experiment.
*
* @param {(NonNegativeInteger|Array)} x - number of successes or two-element array with successes and failures
* @param {NonNegativeInteger} [n] - total number of observations
* @param {Options} [options] - function options
* @param {number} [options.alpha=0.05] - significance level
* @param {string} [options.alternative='two-sided'] - alternative hypothesis (`two-sided`, `less` or `greater`)
* @param {Probability} [options.p=0.5] - success probability under H0
* @throws {TypeError} options must be an object
* @throws {TypeError} must provide valid options
* @throws {RangeError} alpha option has to be a number in the interval `[0,1]`
* @throws {TypeError} alternative option has to be a string
* @throws {Error} alternative option must be `two-sided`, `less` or `greater`
* @returns {Object} test results
*/
function binomialTest() {
	var alpha;
	var opts;
	var cint;
	var pval;
	var stat;
	var alt;
	var err;
	var out;
	var d;
	var m;
	var n;
	var p;
	var x;
	var y;
	var i;

	opts = {};
	if ( isNumberArray( arguments[ 0 ] ) ) {
		x = arguments[ 0 ];
		if ( x.length !== 2 ) {
			throw new Error( format( 'invalid argument. An array argument must contain two elements. Value: `%s`.', x ) );
		}
		n = x[ 1 ] + x[ 0 ];
		x = x[ 0 ];
		if ( arguments[ 1 ] ) {
			err = validate( opts, arguments[ 1 ] );
		}
	} else {
		x = arguments[ 0 ];
		n = arguments[ 1 ];
		if ( !isNonNegativeInteger( x ) ) {
			throw new TypeError( format( 'invalid argument. Must provide a nonnegative integer or a two-element array. Value: `%s`.', x ) );
		}
		if ( !isNonNegativeInteger( n ) ) {
			throw new TypeError( format( 'invalid argument. Must provide a nonnegative integer. Value: `%s`.', n ) );
		}
		if ( x > n ) {
			throw new TypeError( format( 'invalid arguments. Number of successes cannot be larger than the total number of observations. x: `%u`. n: `%u`.' ) );
		}
		if ( arguments[ 2 ] ) {
			err = validate( opts, arguments[ 2 ] );
		}
	}
	if ( err ) {
		throw err;
	}

	if ( opts.alpha === void 0 ) {
		alpha = 0.05;
	} else {
		alpha = opts.alpha;
	}
	if ( alpha < 0.0 || alpha > 1.0 ) {
		throw new RangeError( format( 'invalid option. `%s` option must be a number on the interval: [0, 1]. Option: `%f`.', 'alpha', alpha ) );
	}
	if ( opts.p === void 0 ) {
		p = 0.5;
	} else {
		p = opts.p;
	}
	if ( p < 0.0 || p > 1.0 ) {
		throw new RangeError( format( 'invalid option. `%s` option must be a probability. Option: `%f`.', 'p', p ) );
	}

	alt = opts.alternative || 'two-sided';
	stat = x / n;
	switch ( alt ) {
	case 'less':
		pval = binomialCDF( x, n, p );
		cint = [ 0.0, upper( x, n, alpha ) ];
		break;
	case 'greater':
		pval = 1.0 - binomialCDF( x - 1, n, p );
		cint = [ lower( x, n, alpha ), 1.0 ];
		break;
	case 'two-sided':
		d = binomialPMF( x, n, p );
		m = n * p;
		if ( x === m ) {
			pval = 1;
		} else if ( x < m ) {
			y = 0;
			for ( i = ceil( m ); i <= n; i++ ) {
				if ( binomialPMF( i, n, p ) <= d * RELATIVE_ERROR ) {
					y += 1;
				}
			}
			pval = binomialCDF(x, n, p) + ( 1 - binomialCDF(n - y, n, p ) );
		} else {
			y = 0;
			for ( i = 0; i <= floor( m ); i++ ) {
				if ( binomialPMF( i, n, p ) <= d * RELATIVE_ERROR ) {
					y += 1;
				}
			}
			pval = binomialCDF( y-1, n, p ) + ( 1 - binomialCDF( x-1, n, p ) );
		}
		cint = [ lower( x, n, alpha/2.0 ), upper( x, n, alpha/2.0 ) ];
		break;
	default:
		throw new Error( format( 'invalid option. `%s` option must be one of the following: "%s". Option: `%s`.', 'alternative', [ 'two-sided', 'less', 'greater' ].join( '", "' ), alt ) );
	}

	out = {};
	setReadOnly( out, 'rejected', pval <= alpha );
	setReadOnly( out, 'alpha', alpha );
	setReadOnly( out, 'pValue', pval );
	setReadOnly( out, 'statistic', stat );
	setReadOnly( out, 'ci', cint );
	setReadOnly( out, 'nullValue', p );
	setReadOnly( out, 'alternative', alt );
	setReadOnly( out, 'method', 'Exact binomial test' );
	setReadOnly( out, 'print', print );
	return out;
}


// EXPORTS //

module.exports = binomialTest;
