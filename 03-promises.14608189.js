!function(){var e="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},t={},n={},o=e.parcelRequire7bc7;null==o&&((o=function(e){if(e in t)return t[e].exports;if(e in n){var o=n[e];delete n[e];var r={id:e,exports:{}};return t[e]=r,o.call(r.exports,r,r.exports),r.exports}var a=new Error("Cannot find module '"+e+"'");throw a.code="MODULE_NOT_FOUND",a}).register=function(e,t){n[e]=t},e.parcelRequire7bc7=o);var r=o("h6c0i"),a={formElement:document.querySelector(".form"),firstDelayElement:document.querySelector('[name="delay"]'),delayStepElement:document.querySelector('[name="step"]'),promisesAmountElement:document.querySelector('[name="amount"]')};function i(e,t){return new Promise((function(n,o){var r=Math.random()>.3;setTimeout((function(){r?n({position:e,delay:t}):o({position:e,delay:t})}),t)}))}!function(){if(null===localStorage.getItem("formData"))return;var e=JSON.parse(localStorage.getItem("formData")),t=e.firstDelay,n=e.delayStep,o=e.promisesAmount;a.firstDelayElement.value=t,a.delayStepElement.value=n,a.promisesAmountElement.value=o}(),document.querySelector('[name="reset"]').addEventListener("click",(function(){a.firstDelayElement.value="",a.delayStepElement.value="",a.promisesAmountElement.value="",localStorage.removeItem("formData")})),a.formElement.addEventListener("submit",(function(e){e.preventDefault();var t=Number(a.firstDelayElement.value),n=Number(a.delayStepElement.value),o=Number(a.promisesAmountElement.value);!function(e,t,n){var o={firstDelay:e,delayStep:t,promisesAmount:n};localStorage.setItem("formData",JSON.stringify(o))}(t,n,o);for(var l=1;l<=o;l+=1)l>1&&(t+=n),i(l,t).then((function(e){var a=e.position,i=e.delay;r.Notify.init({position:"center-top",timeout:t-n+n*o}),r.Notify.success("✅ Fulfilled promise ".concat(a," in ").concat(i,"ms"))})).catch((function(e){var a=e.position,i=e.delay;r.Notify.init({position:"center-top",timeout:t-n+n*o}),r.Notify.failure("❌ Rejected promise ".concat(a," in ").concat(i,"ms"))}))}))}();
//# sourceMappingURL=03-promises.14608189.js.map