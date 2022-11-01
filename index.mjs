// Copyright (c) 2022 The Stdlib Authors. License is Apache-2.0: http://www.apache.org/licenses/LICENSE-2.0
/// <reference types="./index.d.ts" />
import e from"https://cdn.jsdelivr.net/gh/stdlib-js/utils-define-read-only-property@esm/index.mjs";import t from"https://cdn.jsdelivr.net/gh/stdlib-js/assert-is-number-array@v0.0.8-esm/index.mjs";import s from"https://cdn.jsdelivr.net/gh/stdlib-js/assert-is-nonnegative-integer@esm/index.mjs";import i from"https://cdn.jsdelivr.net/gh/stdlib-js/stats-base-dists-beta-quantile@esm/index.mjs";import r from"https://cdn.jsdelivr.net/gh/stdlib-js/math-base-special-floor@esm/index.mjs";import n from"https://cdn.jsdelivr.net/gh/stdlib-js/math-base-special-ceil@esm/index.mjs";import a from"https://cdn.jsdelivr.net/gh/stdlib-js/stats-base-dists-binomial-cdf@v0.0.7-esm/index.mjs";import o from"https://cdn.jsdelivr.net/gh/stdlib-js/stats-base-dists-binomial-pmf@esm/index.mjs";import l from"https://cdn.jsdelivr.net/gh/stdlib-js/error-tools-fmtprodmsg@v0.0.2-esm/index.mjs";import{isPrimitive as d}from"https://cdn.jsdelivr.net/gh/stdlib-js/assert-is-number@esm/index.mjs";import m from"https://cdn.jsdelivr.net/gh/stdlib-js/assert-is-plain-object@esm/index.mjs";import{isPrimitive as p}from"https://cdn.jsdelivr.net/gh/stdlib-js/assert-is-string@esm/index.mjs";import h from"https://cdn.jsdelivr.net/gh/stdlib-js/assert-is-nan@esm/index.mjs";import c from"https://cdn.jsdelivr.net/gh/stdlib-js/assert-has-own-property@esm/index.mjs";import f from"https://cdn.jsdelivr.net/gh/stdlib-js/assert-is-positive-integer@esm/index.mjs";import{isPrimitive as j}from"https://cdn.jsdelivr.net/gh/stdlib-js/assert-is-boolean@esm/index.mjs";import v from"https://cdn.jsdelivr.net/gh/stdlib-js/math-base-special-roundn@esm/index.mjs";function b(e,t){return m(t)?c(t,"alpha")&&(e.alpha=t.alpha,!d(e.alpha)||h(e.alpha))?new TypeError(l("0dN8h","alpha",e.alpha)):c(t,"alternative")&&(e.alternative=t.alternative,!p(e.alternative))?new TypeError(l("0dN2i","alternative",e.alternative)):c(t,"p")&&(e.p=t.p,!d(e.p)||h(e.p))?new TypeError(l("0dN8h","p",e.p)):null:new TypeError(l("0dN2h",t))}function u(e){var t,s,i;if(s=4,t=!0,arguments.length>0){if(!m(e))throw new TypeError(l("0dN3X",e));if(c(e,"digits")){if(!f(e.digits))throw new TypeError(l("0dN3b","digits",e.digits));s=e.digits}if(c(e,"decision")){if(!j(e.decision))throw new TypeError(l("0dN30","decision",e.decision));t=e.decision}}switch(i="",i+=this.method,i+="\n\n",i+="Alternative hypothesis: ",i+="True correlation coefficient is ",this.alternative){case"less":i+="less than ";break;case"greater":i+="greater than ";break;default:i+="not equal to "}return i+=this.nullValue,i+="\n\n",i+="    pValue: "+v(this.pValue,-s)+"\n",i+="    statistic: "+v(this.statistic,-s)+"\n",i+="    "+100*(1-this.alpha)+"% confidence interval: ["+v(this.ci[0],-s)+","+v(this.ci[1],-s)+"]",i+="\n\n",t&&(i+="Test Decision: ",this.rejected?i+="Reject null in favor of alternative at "+100*this.alpha+"% significance level":i+="Fail to reject null in favor of alternative at "+100*this.alpha+"% significance level",i+="\n"),i}function g(e,t,s){return 0===e?0:i(s,e,t-e+1)}function w(e,t,s){return e===t?1:i(1-s,e+1,t-e)}function x(){var i,d,m,p,h,c,f,j,v,x,y,E,T,N,V;if(d={},t(arguments[0])){if(2!==(T=arguments[0]).length)throw new Error(l("invalid argument. An array argument must contain two elements. Value: `%s`.",T));y=T[1]+T[0],T=T[0],arguments[1]&&(f=b(d,arguments[1]))}else{if(y=arguments[1],!s(T=arguments[0]))throw new TypeError(l("0dN9r",T));if(!s(y))throw new TypeError(l("0dN2V",y));if(T>y)throw new TypeError(l("invalid arguments. Number of successes cannot be larger than the total number of observations. x: `%u`. n: `%u`."));arguments[2]&&(f=b(d,arguments[2]))}if(f)throw f;if((i=void 0===d.alpha?.05:d.alpha)<0||i>1)throw new RangeError(l("invalid option. `%s` option must be a number on the interval: [0, 1]. Option: `%f`.","alpha",i));if((E=void 0===d.p?.5:d.p)<0||E>1)throw new RangeError(l("invalid option. `%s` option must be a probability. Option: `%f`.","p",E));switch(h=T/y,c=d.alternative||"two-sided"){case"less":p=a(T,y,E),m=[0,w(T,y,i)];break;case"greater":p=1-a(T-1,y,E),m=[g(T,y,i),1];break;case"two-sided":if(v=o(T,y,E),T===(x=y*E))p=1;else if(T<x){for(N=0,V=n(x);V<=y;V++)o(V,y,E)<=1.0000001*v&&(N+=1);p=a(T,y,E)+(1-a(y-N,y,E))}else{for(N=0,V=0;V<=r(x);V++)o(V,y,E)<=1.0000001*v&&(N+=1);p=a(N-1,y,E)+(1-a(T-1,y,E))}m=[g(T,y,i/2),w(T,y,i/2)];break;default:throw new Error(l("0dN3t","alternative",["two-sided","less","greater"].join('", "'),c))}return e(j={},"rejected",p<=i),e(j,"alpha",i),e(j,"pValue",p),e(j,"statistic",h),e(j,"ci",m),e(j,"nullValue",E),e(j,"alternative",c),e(j,"method","Exact binomial test"),e(j,"print",u),j}export{x as default};
//# sourceMappingURL=index.mjs.map