<!--

@license Apache-2.0

Copyright (c) 2018 The Stdlib Authors.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

   http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

-->

# Binomial Test

[![NPM version][npm-image]][npm-url] [![Build Status][test-image]][test-url] [![Coverage Status][coverage-image]][coverage-url] <!-- [![dependencies][dependencies-image]][dependencies-url] -->

> Exact test for the success probability in a Bernoulli experiment.

<section class="installation">

## Installation

```bash
npm install @stdlib/stats-binomial-test
```

Alternatively,

-   To load the package in a website via a `script` tag without installation and bundlers, use the [ES Module][es-module] available on the [`esm` branch][esm-url].
-   If you are using Deno, visit the [`deno` branch][deno-url].
-   For use in Observable, or in browser/node environments, use the [Universal Module Definition (UMD)][umd] build available on the [`umd` branch][umd-url].

The [branches.md][branches-url] file summarizes the available branches and displays a diagram illustrating their relationships.

</section>

<section class="usage">

## Usage

```javascript
var binomialTest = require( '@stdlib/stats-binomial-test' );
```

#### binomialTest( x\[, n]\[, opts] )

When supplied nonnegative integers `x` (number of successes in a Bernoulli experiment) and `n` (total number of trials), the function computes an exact test for the success probability in a Bernoulli experiment. Alternatively, `x` may be a two-element array containing the number of successes and failures, respectively.

```javascript
var out = binomialTest( 550, 1000 );
/* returns
    {
        'rejected': true,
        'pValue': ~0.001,
        'statistic': 0.55,
        'ci': [ ~0.519, ~0.581 ],
        // ...
    }
*/

out = binomialTest( [ 550, 450 ] );
/* returns
    {
        'rejected': true,
        'pValue': ~0.001,
        'statistic': 0.55,
        'ci': [ ~0.519, ~0.581 ],
        // ...
    }
*/
```

The returned object comes with a `.print()` method which when invoked will print a formatted output of the results of the hypothesis test. `print` accepts a `digits` option that controls the number of decimal digits displayed for the outputs and a `decision` option, which when set to `false` will hide the test decision.

<!-- run-disable -->

```javascript
console.log( out.print() );
/* e.g., =>
    Exact binomial test

    Alternative hypothesis: True correlation coefficient is not equal to 0.5

        pValue: 0.0017
        statistic: 0.55
        95% confidence interval: [0.5186,0.5811]

    Test Decision: Reject null in favor of alternative at 5% significance level
*/
```

The function accepts the following `options`:

-   **alpha**: `number` in the interval `[0,1]` giving the significance level of the hypothesis test. Default: `0.05`.
-   **alternative**: Either `two-sided`, `less` or `greater`. Indicates whether the alternative hypothesis is that the true ratio of variances is greater than one (`greater`), smaller than one (`less`), or that the variances are the same (`two-sided`). Default: `two-sided`.
-   **p**: success `probability` under the null hypothesis. Default: `0.5`.

By default, the hypothesis test is carried out at a significance level of `0.05`. To choose a different significance level, set the `alpha` option.

```javascript
var out = binomialTest( 59, 100, {
    'alpha': 0.1
});
/* returns
    {
        'rejected': true,
        'pValue': ~0.089,
        'statistic': 0.59,
        'ci': [ ~0.487, ~0.687 ],
        // ...
    }
*/
```

By default, a two-sided test is performed. To perform either of the one-sided tests, set the `alternative` option to `less` or `greater`.

```javascript
out = binomialTest( 550, 1000, {
    'alternative': 'greater'
});
table = out.print();
/** e.g., returns
    Exact binomial test

    Alternative hypothesis: True correlation coefficient is greater than 0.5

        pValue: 0.0009
        statistic: 0.55
        95% confidence interval: [0.5235,1]

    Test Decision: Reject null in favor of alternative at 5% significance level
*/

out = binomialTest( 550, 1000, {
    'alternative': 'less'
});
table = out.print();
/* e.g., returns
    Exact binomial test

    Alternative hypothesis: True correlation coefficient is less than 0.5

        pValue: 0.9993
        statistic: 0.55
        95% confidence interval: [0,0.5762]

    Test Decision: Fail to reject null in favor of alternative at 5% significance level
*/
```

To test whether the success probability in the population is equal to some other value than `0.5`, set the `p` option.

```javascript
var out = binomialTest( 23, 100, {
    'p': 0.2
});
/* returns
    {
        'rejected': false,
        'pValue': ~0.453,
        'statistic': 0.23,
        'ci': [ ~0.152, ~0.325 ],
        // ...
    }
*/

var table = out.print();
/* e.g., returns
    Exact binomial test

    Alternative hypothesis: True correlation coefficient is not equal to 0.2

        pValue: 0.4534
        statistic: 0.23
        95% confidence interval: [0.1517,0.3249]

    Test Decision: Fail to reject null in favor of alternative at 5% significance level
*/
```

</section>

<!-- /.usage -->

<section class="examples">

## Examples

<!-- eslint no-undef: "error" -->

```javascript
var binomialTest = require( '@stdlib/stats-binomial-test' );

var out = binomialTest( 682, 925 );
/* returns
    {
        'rejected': true,
        'pValue': ~3.544e-49,
        'statistic': 0.737,
        'ci': [ ~0.708, ~0.765 ],
        // ...
    }
*/

out = binomialTest( [ 682, 925 - 682 ] );
/* returns
    {
        'rejected': true,
        'pValue': ~3.544e-49,
        'statistic': 0.737,
        'ci': [ ~0.708, ~0.765 ],
        // ...
    }
*/

out = binomialTest( 682, 925, {
    'p': 0.75,
    'alpha': 0.05
});
/* returns
    {
        'rejected': false,
        'pValue': ~0.382
        'statistic': 0.737,
        'ci': [ ~0.708, ~0.765 ],
        // ...
    }
*/

out = binomialTest( 21, 40, {
    'p': 0.4,
    'alternative': 'greater'
});
/* returns
    {
        'rejected': false,
        'pValue': ~0.382,
        'statistic': 0.737,
        'ci': [ ~0.385, 1.0 ],
        // ...
    }
*/
```

</section>

<!-- /.examples -->

<!-- Section for related `stdlib` packages. Do not manually edit this section, as it is automatically populated. -->

<section class="related">

</section>

<!-- /.related -->

<!-- Section for all links. Make sure to keep an empty line after the `section` element and another before the `/section` close. -->


<section class="main-repo" >

* * *

## Notice

This package is part of [stdlib][stdlib], a standard library for JavaScript and Node.js, with an emphasis on numerical and scientific computing. The library provides a collection of robust, high performance libraries for mathematics, statistics, streams, utilities, and more.

For more information on the project, filing bug reports and feature requests, and guidance on how to develop [stdlib][stdlib], see the main project [repository][stdlib].

#### Community

[![Chat][chat-image]][chat-url]

---

## License

See [LICENSE][stdlib-license].


## Copyright

Copyright &copy; 2016-2022. The Stdlib [Authors][stdlib-authors].

</section>

<!-- /.stdlib -->

<!-- Section for all links. Make sure to keep an empty line after the `section` element and another before the `/section` close. -->

<section class="links">

[npm-image]: http://img.shields.io/npm/v/@stdlib/stats-binomial-test.svg
[npm-url]: https://npmjs.org/package/@stdlib/stats-binomial-test

[test-image]: https://github.com/stdlib-js/stats-binomial-test/actions/workflows/test.yml/badge.svg?branch=main
[test-url]: https://github.com/stdlib-js/stats-binomial-test/actions/workflows/test.yml?query=branch:main

[coverage-image]: https://img.shields.io/codecov/c/github/stdlib-js/stats-binomial-test/main.svg
[coverage-url]: https://codecov.io/github/stdlib-js/stats-binomial-test?branch=main

<!--

[dependencies-image]: https://img.shields.io/david/stdlib-js/stats-binomial-test.svg
[dependencies-url]: https://david-dm.org/stdlib-js/stats-binomial-test/main

-->

[chat-image]: https://img.shields.io/gitter/room/stdlib-js/stdlib.svg
[chat-url]: https://gitter.im/stdlib-js/stdlib/

[stdlib]: https://github.com/stdlib-js/stdlib

[stdlib-authors]: https://github.com/stdlib-js/stdlib/graphs/contributors

[umd]: https://github.com/umdjs/umd
[es-module]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules

[deno-url]: https://github.com/stdlib-js/stats-binomial-test/tree/deno
[umd-url]: https://github.com/stdlib-js/stats-binomial-test/tree/umd
[esm-url]: https://github.com/stdlib-js/stats-binomial-test/tree/esm
[branches-url]: https://github.com/stdlib-js/stats-binomial-test/blob/main/branches.md

[stdlib-license]: https://raw.githubusercontent.com/stdlib-js/stats-binomial-test/main/LICENSE

</section>

<!-- /.links -->
