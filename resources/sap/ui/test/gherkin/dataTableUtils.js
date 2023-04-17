/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/thirdparty/jquery"],function(t){"use strict";function e(t,e){e=e||" ";return t.replace(/[\-_]/g," ").trim().replace(/(?!\s)\W/g,"").replace(/\s+/g,e)}var r={normalization:{titleCase:function(t){r._testNormalizationInput(t,"titleCase");return e(t).replace(/\w*/g,function(t){return t.charAt(0).toUpperCase()+t.substr(1).toLowerCase()})},pascalCase:function(t){r._testNormalizationInput(t,"pascalCase");return r.normalization.titleCase(t).split(/\s/).join("")},camelCase:function(t){r._testNormalizationInput(t,"camelCase");return r.normalization.pascalCase(t).replace(/^(\w)/,function(t){return t.toLowerCase()})},hyphenated:function(t){r._testNormalizationInput(t,"hyphenated");return e(t,"-").toLowerCase()},none:function(t){r._testNormalizationInput(t,"none");return t}},toTable:function(t,e){this._testArrayInput(t,"toTable");var r=this._getNormalizationFunction(e,"toTable");var n=t[0].map(r);return t.slice(1).map(function(t){var e={};for(var r=0;r<n.length;++r){var a=n[r];if(e.hasOwnProperty(a)===false){e[a]=t[r]}else{throw new Error("dataTableUtils.toTable: data table contains duplicate header: | "+a+" |")}}return e})},toObject:function(e,r){this._testArrayInput(e,"toObject");var n=this._getNormalizationFunction(r,"toObject");this._detectDuplicateKeys(e,n);var a={};e.forEach(function(e){var r=n(e[0]);var i=e.slice(1);if(i.length===1){i=i[0]}else{i=i.reduceRight(function(t,e){var r={};r[n(e)]=t;return r})}if(!a.hasOwnProperty(r)){a[r]=i}else{t.extend(a[r],i)}});return a},_detectDuplicateKeys:function(t,e){var r={};t.forEach(function(t){var n=t.slice(0,t.length-1).map(e);for(var a=n.length;a>0;--a){var i=n.slice(0,a).join("-");if(!r[i]){r[i]=t}else{var o=r[i];var s=o.slice(0,o.length-1).map(e);if(o.length!==t.length||s.every(function(t,e){return n[e]===t})){var l="| "+o.join(" | ")+" |";throw new Error("dataTableUtils.toObject: data table row is being overwritten: "+l)}}}})},_getNormalizationFunction:function(t,e){var r="dataTableUtils."+e+": parameter 'vNorm' must be either a Function or a String with the value 'titleCase', 'pascalCase', 'camelCase', 'hyphenated' or 'none'";if(typeof t==="string"||t instanceof String){var n=this.normalization[t];if(n===undefined){throw new Error(r)}return n}else if(typeof t==="function"){return t}else if(t===undefined||t===null){return this.normalization.none}else{throw new Error(r)}},_testNormalizationInput:function(t,e){if(typeof t!=="string"&&!(t instanceof String)){throw new Error("dataTableUtils.normalization."+e+": parameter 'sString' must be a valid string")}},_testArrayInput:function(t,e){var r="dataTableUtils."+e+": parameter 'aData' must be an Array of Array of Strings";if(!Array.isArray(t)){throw new Error(r)}if(!t.every(function(t){return Array.isArray(t)&&t.every(function(t){return typeof t==="string"||t instanceof String})})){throw new Error(r)}}};return r},true);
//# sourceMappingURL=dataTableUtils.js.map