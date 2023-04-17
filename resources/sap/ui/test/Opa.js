/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/Device","sap/ui/thirdparty/jquery","sap/ui/test/_LogCollector","sap/ui/test/_OpaLogger","sap/ui/test/_ParameterValidator","sap/ui/test/_UsageReport","sap/ui/test/_OpaUriParameterParser","sap/ui/test/_ValidationParameters"],function(e,t,r,n,i,a,o,s){"use strict";var u=n.getLogger("sap.ui.test.Opa"),c=r.getInstance(),f=[],l={},g=-1,p,d,m,v,h=new i({errorPrefix:"sap.ui.test.Opa#waitFor"});c.start();function _(e,t){if(window["sap-ui-debug"]){t.timeout=t.debugTimeout}var r=new Date;n();function n(){u.timestamp("opa.check");c.getAndClearLog();var i=e();v=t._stack;if(i.error){d.reject(t);return}if(i.result){w();return}var a=(new Date-r)/1e3;if(t.timeout===0||t.timeout>a){g=setTimeout(n,t.pollingInterval);return}C("Opa timeout after "+t.timeout+" seconds",t);if(t.error){try{t.error(t,i.arguments)}finally{d.reject(t)}}else{d.reject(t)}}}function w(){if(!f.length){if(d){d.resolve()}return true}var e=f.shift();g=setTimeout(function(){_(e.callback,e.options)},(x.config.asyncPolling?e.options.pollingInterval:0)+x.config.executionDelay)}function y(e,t){var r=e.get();if(r){var n=f.splice(f.length-r,r);n.forEach(function(e){e.options._nestedIn=t});f=n.concat(f)}}function O(e){return"Exception thrown by the testcode:'"+k(e)+"'"}function k(e){var t=e.toString();if(e.stack){t+="\n"+e.stack}return t}function C(e,t,r){var n=c.getAndClearLog();if(n){e+="\nThis is what Opa logged:\n"+n}if(!r&&t._stack){e+=P(t)}if(t.errorMessage){t.errorMessage+="\n"+e}else{t.errorMessage=e}u.error(t.errorMessage,"Opa")}function F(t){t=(t||0)+2;if(e.browser.mozilla){t=t-1}var r=new Error,n=r.stack;if(!n){try{throw r()}catch(e){n=e.stack}}if(!n){return""}n=n.split("\n");n.splice(0,t);return n.join("\n")}function P(e){var t="\nCallstack:\n";if(e._stack){t+=e._stack;delete e._stack}else{t+="Unknown"}if(e._nestedIn){t+=P(e._nestedIn);delete e._nestedIn}return t}var x=function(e){this.and=this;t.extend(this,e)};x.config={};x.extendConfig=function(e){var r=["actions","assertions","arrangements"];r.filter(function(t){return!!e[t]}).forEach(function(t){var r=e[t];var n=Object.getPrototypeOf(e[t]);var i=x.config[t];var a=Object.getPrototypeOf(x.config[t]);for(var o in i){if(!(o in r)){r[o]=i[o]}}for(var s in a){if(!(s in r)){n[s]=a[s]}}});x.config=t.extend(true,x.config,e,x._uriParams);n.setLevel(x.config.logLevel)};var b=0;if(e.browser.safari){b=50}x.resetConfig=function(){x.config=t.extend({arrangements:new x,actions:new x,assertions:new x,timeout:15,pollingInterval:400,debugTimeout:0,_stackDropCount:0,executionDelay:b,asyncPolling:false},x._uriParams)};x.getContext=function(){return l};x.emptyQueue=function e(){if(m){throw new Error("Opa is emptying its queue. Calling Opa.emptyQueue() is not supported at this time.")}m=true;p=null;d=t.Deferred();w();return d.promise().fail(function(e){f=[];if(p){var t=p.qunitTimeout?"QUnit timeout after "+p.qunitTimeout+" seconds":"Queue was stopped manually";e._stack=p.qunitTimeout&&v||F(1);C(t,e)}}).always(function(){f=[];g=-1;d=null;v=null;m=false})};x.stopQueue=function e(){x._stopQueue()};x._stopQueue=function(e){f=[];if(!d){u.warning("stopQueue was called before emptyQueue, queued tests have never been executed","Opa")}else{if(g!==-1){clearTimeout(g)}p=e||{};d.reject(p)}};x._uriParams=o._getOpaParams();x.resetConfig();x._usageReport=new a(x.config);n.setLevel(x.config.logLevel);x.prototype={getContext:x.getContext,waitFor:function(e){var r=t.Deferred(),n=x._createFilteredConfig(x._aConfigValuesForWaitFor);e=t.extend({},n,e);this._validateWaitFor(e);e._stack=F(1+e._stackDropCount);delete e._stackDropCount;var i=t.extend({},this);r.promise(i);f.push({callback:function(){var t=true;if(e.check){try{t=e.check.apply(this,arguments)}catch(t){var n="Failure in Opa check function\n"+O(t);C(n,e,t.stack);r.reject(e);return{error:true,arguments:arguments}}}if(p){return{result:true,arguments:arguments}}if(!t){return{result:false,arguments:arguments}}if(e.success){var i=x._getWaitForCounter();try{e.success.apply(this,arguments)}catch(t){var n="Failure in Opa success function\n"+O(t);C(n,e,t.stack);r.reject(e);return{error:true,arguments:arguments}}finally{y(i,e)}}r.resolve();return{result:true,arguments:arguments}}.bind(this),options:e});return i},extendConfig:x.extendConfig,emptyQueue:x.emptyQueue,iWaitForPromise:function(e){return this._schedulePromiseOnFlow(e)},_schedulePromiseOnFlow:function(e,t){t=t||{};var r={};t.check=function(){if(!r.started){r.started=true;e.then(function(){r.done=true},function(e){r.errorMessage="Error while waiting for promise scheduled on flow"+(e?", details: "+k(e):"")})}if(r.errorMessage){throw new Error(r.errorMessage)}else{return!!r.done}};return this.waitFor(t)},_validateWaitFor:function(e){h.validate({validationInfo:s.OPA_WAITFOR,inputToValidate:e})}};x._createFilteredOptions=function(e,t){var r={};e.forEach(function(e){var n=t[e];if(n===undefined){return}r[e]=n});return r};x._createFilteredConfig=function(e){return x._createFilteredOptions(e,x.config)};x._getWaitForCounter=function(){var e=f.length;return{get:function(){var t=f.length-e;return Math.max(t,0)}}};x._aConfigValuesForWaitFor=Object.keys(s.OPA_WAITFOR_CONFIG);return x},true);
//# sourceMappingURL=Opa.js.map