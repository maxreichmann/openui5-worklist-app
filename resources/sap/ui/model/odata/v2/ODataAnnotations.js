/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/base/assert","sap/base/util/extend","sap/ui/base/EventProvider","sap/ui/core/Configuration","sap/ui/core/cache/CacheManager","sap/ui/model/odata/AnnotationParser","sap/ui/thirdparty/jquery"],function(e,t,r,a,o,n,jQuery){"use strict";var i=r.extend("sap.ui.model.odata.v2.ODataAnnotations",{constructor:function(e,t){var a=this;r.apply(this,[t]);this._oMetadata=e;this._pLoaded=e.loaded();this._mCustomHeaders={};this._mAnnotations={};this._hasErrors=false;function i(e){if(!a._hasErrors){o.set(a.sCacheKey,JSON.stringify(e))}}if(!t||!t.skipMetadata){if(!t){t={}}if(!t.source){t.source=[]}else if(Array.isArray(t.source)){t.source=t.source.slice(0)}else{t.source=[t.source]}t.source.unshift({type:"xml",data:e.loaded().then(function(e){return{xml:e["metadataString"],lastModified:e["lastModified"],eTag:e["eTag"]}})})}if(t){this.sCacheKey=t.cacheKey;this.setHeaders(t.headers);if(this.sCacheKey){this._pLoaded=o.get(a.sCacheKey).then(function(e){var r;if(e){r=JSON.parse(e)}if(Array.isArray(r)){r.annotations={};r.forEach(function(e){n.restoreAnnotationsAtArrays(e.annotations);n.merge(r.annotations,e.annotations)});a._mAnnotations=r.annotations;a._fireSomeLoaded(r);a._fireLoaded(r);return r}else{return a.addSource(t.source).then(function(e){i(e);return e})}})}else{this._pLoaded=this.addSource(t.source)}}},metadata:{publicMethods:["getData","addSource","getHeaders","setHeaders","attachSuccess","detachSuccess","attachError","detachError","attachLoaded","detachLoaded","attachFailed","detachFailed"]}});i.prototype.getData=function(){return this._mAnnotations};i.prototype.getAnnotationsData=function(){return this._mAnnotations};i.prototype.getHeaders=function(){return t({},this._mCustomHeaders)};i.prototype.setHeaders=function(e){this._mCustomHeaders=t({},e)};i.prototype.loaded=function(){return this._pLoaded};i.prototype.addSource=function(e){if(!e||Array.isArray(e)&&e.length===0){return this._oMetadata.loaded()}if(!Array.isArray(e)){e=[e]}var t=this;var r=e.map(function(e){e=typeof e==="string"?{type:"url",data:e}:e;return t._loadSource(e).then(t._parseSourceXML).then(t._parseSource.bind(t)).catch(function(e){return e})});return Promise.all(r).then(function(e){return e.map(function(e){try{e=t._mergeSource(e);t._fireSuccess(e)}catch(r){t._fireError(e)}return e})}).then(function(e){e.annotations=t.getData();var r=e.filter(function(e){return e instanceof Error});if(r.length>0){t._hasErrors=true;if(r.length!==e.length){t._fireSomeLoaded(e);t._fireFailed(e)}else{t._fireFailed(e);t._fireAllFailed(e);return Promise.reject(e)}}else{t._fireSomeLoaded(e);t._fireLoaded(e)}return e})};i.prototype.attachSuccess=function(e,t,r){return this.attachEvent("success",e,t,r)};i.prototype.detachSuccess=function(e,t){return this.detachEvent("success",e,t)};i.prototype.attachError=function(e,t,r){return this.attachEvent("error",e,t,r)};i.prototype.detachError=function(e,t){return this.detachEvent("error",e,t)};i.prototype.attachLoaded=function(e,t,r){return this.attachEvent("loaded",e,t,r)};i.prototype.detachLoaded=function(e,t){return this.detachEvent("loaded",e,t)};i.prototype.attachFailed=function(e,t,r){return this.attachEvent("failed",e,t,r)};i.prototype.detachFailed=function(e,t){return this.detachEvent("failed",e,t)};i.prototype.attachSomeLoaded=function(e,t,r){return this.attachEvent("someLoaded",e,t,r)};i.prototype.detachSomeLoaded=function(e,t){return this.detachEvent("someLoaded",e,t)};i.prototype.attachAllFailed=function(e,t,r){return this.attachEvent("allFailed",e,t,r)};i.prototype.detachAllFailed=function(e,t){return this.detachEvent("allFailed",e,t)};i.prototype._fireSuccess=function(e){return this.fireEvent("success",{result:e},false,false)};i.prototype._fireError=function(e){return this.fireEvent("error",{result:e},false,false)};i.prototype._fireLoaded=function(e){return this.fireEvent("loaded",{result:e},false,false)};i.prototype._fireFailed=function(e){return this.fireEvent("failed",{result:e},false,false)};i.prototype._fireSomeLoaded=function(e){return this.fireEvent("someLoaded",{result:e},false,false)};i.prototype._fireAllFailed=function(e){return this.fireEvent("allFailed",{result:e},false,false)};i.prototype._loadSource=function(e){if(e.data instanceof Promise){return e.data.then(function(t){delete e.data;e.type="xml";e.xml=t.xml;e.lastModified=t.lastModified;e.eTag=t.eTag;return this._loadSource(e)}.bind(this))}else if(e.type==="xml"){if(typeof e.data==="string"){e.xml=e.data;delete e.data}return Promise.resolve(e)}else if(e.type==="url"){return this._loadUrl(e)}else{var t=new Error('Unknown source type: "'+e.type+'"');t.source=e;return Promise.reject(t)}};i.prototype._loadUrl=function(t){e(t.type==="url",'Source type must be "url" in order to be loaded');return new Promise(function(e,r){var a={url:t.data,async:true,headers:this._getHeaders(),beforeSend:function(e){e.overrideMimeType("text/plain")}};var o=function(r,a,o){t.xml=o.responseText;if(o.getResponseHeader("Last-Modified")){t.lastModified=new Date(o.getResponseHeader("Last-Modified"))}if(o.getResponseHeader("eTag")){t.eTag=o.getResponseHeader("eTag")}e(t)};var n=function(e,a){var o=new Error('Could not load annotation URL: "'+t.data+'"');o.source=t;r(o)};jQuery.ajax(a).done(o).fail(n)}.bind(this))};i.prototype._parseSourceXML=function(t){e(typeof t.xml==="string","Source must contain XML string in order to be parsed");return new Promise(function(e,r){var a=(new DOMParser).parseFromString(t.xml,"application/xml");if(a.getElementsByTagName("parsererror").length>0){var o=new Error("There were errors parsing the XML.");o.source={type:t.type,data:t.data,xml:t.xml,document:a};r(o)}else{t.document=a;e(t)}})};i.prototype._parseSource=function(e){return this._oMetadata.loaded().then(function(){e.annotations=n.parse(this._oMetadata,e.document,e.data);delete e.document;return e}.bind(this))};i.prototype._mergeSource=function(t){e(typeof t.annotations==="object","Source must contain an annotation object to be merged");n.merge(this._mAnnotations,t.annotations);return t};i.prototype._getHeaders=function(){return t({"sap-cancel-on-close":true},this.getHeaders(),{"Accept-Language":a.getLanguageTag()})};return i});
//# sourceMappingURL=ODataAnnotations.js.map