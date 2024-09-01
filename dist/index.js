"use strict";var w=function(e,r){return function(){return r||e((r={exports:{}}).exports,r),r.exports}};var R=w(function($,j){
var T=require('@stdlib/assert-is-number/dist').isPrimitive,L=require('@stdlib/assert-is-plain-object/dist'),Q=require('@stdlib/assert-is-string/dist').isPrimitive,V=require('@stdlib/assert-is-nan/dist'),q=require('@stdlib/assert-has-own-property/dist'),d=require('@stdlib/error-tools-fmtprodmsg/dist');function S(e,r){return L(r)?q(r,"alpha")&&(e.alpha=r.alpha,!T(e.alpha)||V(e.alpha))?new TypeError(d('1Gx8P',"alpha",e.alpha)):q(r,"alternative")&&(e.alternative=r.alternative,!Q(e.alternative))?new TypeError(d('1Gx2W',"alternative",e.alternative)):q(r,"p")&&(e.p=r.p,!T(e.p)||V(e.p))?new TypeError(d('1Gx8P',"p",e.p)):null:new TypeError(d('1Gx2V',r));}j.exports=S
});var N=w(function(ee,k){
var _=require('@stdlib/assert-is-positive-integer/dist'),z=require('@stdlib/assert-is-plain-object/dist'),G=require('@stdlib/assert-is-boolean/dist').isPrimitive,P=require('@stdlib/assert-has-own-property/dist'),g=require('@stdlib/math-base-special-roundn/dist'),E=require('@stdlib/error-tools-fmtprodmsg/dist');function H(e){var r,s,i;if(s=4,r=!0,arguments.length>0){if(!z(e))throw new TypeError(E('1Gx3L',e));if(P(e,"digits")){if(!_(e.digits))throw new TypeError(E('1Gx3P',"digits",e.digits));s=e.digits}if(P(e,"decision")){if(!G(e.decision))throw new TypeError(E('1Gx2o',"decision",e.decision));r=e.decision}}switch(i="",i+=this.method,i+="\n\n",i+="Alternative hypothesis: ",i+="True correlation coefficient is ",this.alternative){case"less":i+="less than ";break;case"greater":i+="greater than ";break;case"two-sided":default:i+="not equal to ";break}return i+=this.nullValue,i+="\n\n",i+="    pValue: "+g(this.pValue,-s)+"\n",i+="    statistic: "+g(this.statistic,-s)+"\n",i+="    "+(1-this.alpha)*100+"% confidence interval: ["+g(this.ci[0],-s)+","+g(this.ci[1],-s)+"]",i+="\n\n",r&&(i+="Test Decision: ",this.rejected?i+="Reject null in favor of alternative at "+this.alpha*100+"% significance level":i+="Fail to reject null in favor of alternative at "+this.alpha*100+"% significance level",i+="\n"),i}k.exports=H
});var C=w(function(re,B){
var l=require('@stdlib/utils-define-read-only-property/dist'),J=require('@stdlib/assert-is-number-array/dist'),A=require('@stdlib/assert-is-nonnegative-integer/dist'),D=require('@stdlib/stats-base-dists-beta-quantile/dist'),K=require('@stdlib/math-base-special-floor/dist'),U=require('@stdlib/math-base-special-ceil/dist'),p=require('@stdlib/stats-base-dists-binomial-cdf/dist'),y=require('@stdlib/stats-base-dists-binomial-pmf/dist'),v=require('@stdlib/error-tools-fmtprodmsg/dist'),F=R(),W=N(),x=1+1e-7;function I(e,r,s){return e===0?0:D(s,e,r-e+1)}function M(e,r,s){return e===r?1:D(1-s,e+1,r-e)}function X(){var e,r,s,i,O,h,m,o,b,c,t,n,a,f,u;if(r={},J(arguments[0])){if(a=arguments[0],a.length!==2)throw new Error(v('1Gx9G',a));t=a[1]+a[0],a=a[0],arguments[1]&&(m=F(r,arguments[1]))}else{if(a=arguments[0],t=arguments[1],!A(a))throw new TypeError(v('1Gx9H',a));if(!A(t))throw new TypeError(v('1Gx2K',t));if(a>t)throw new TypeError(v('1Gx9I'));arguments[2]&&(m=F(r,arguments[2]))}if(m)throw m;if(r.alpha===void 0?e=.05:e=r.alpha,e<0||e>1)throw new RangeError(v('1Gx8V',"alpha",e));if(r.p===void 0?n=.5:n=r.p,n<0||n>1)throw new RangeError(v('1Gx9J',"p",n));switch(h=r.alternative||"two-sided",O=a/t,h){case"less":i=p(a,t,n),s=[0,M(a,t,e)];break;case"greater":i=1-p(a-1,t,n),s=[I(a,t,e),1];break;case"two-sided":if(b=y(a,t,n),c=t*n,a===c)i=1;else if(a<c){for(f=0,u=U(c);u<=t;u++)y(u,t,n)<=b*x&&(f+=1);i=p(a,t,n)+(1-p(t-f,t,n))}else{for(f=0,u=0;u<=K(c);u++)y(u,t,n)<=b*x&&(f+=1);i=p(f-1,t,n)+(1-p(a-1,t,n))}s=[I(a,t,e/2),M(a,t,e/2)];break;default:throw new Error(v('1Gx4S',"alternative",["two-sided","less","greater"].join('", "'),h))}return o={},l(o,"rejected",i<=e),l(o,"alpha",e),l(o,"pValue",i),l(o,"statistic",O),l(o,"ci",s),l(o,"nullValue",n),l(o,"alternative",h),l(o,"method","Exact binomial test"),l(o,"print",W),o}B.exports=X
});var Y=C();module.exports=Y;
/** @license Apache-2.0 */
//# sourceMappingURL=index.js.map
