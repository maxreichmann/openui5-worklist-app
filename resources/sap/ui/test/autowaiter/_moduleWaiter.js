/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./WaiterBase","sap/ui/thirdparty/jquery"],function(t,e){"use strict";var r={PENDING:"PENDING",LOADED:"LOADED",ERROR:"ERROR"};var s=t.extend("sap.ui.test.autowaiter._ModuleWaiter",{constructor:function(){this._aModules=[];var e=this;var s=Object.getOwnPropertyDescriptor(HTMLScriptElement.prototype,"src");Object.defineProperty(HTMLScriptElement.prototype,"src",{set:function(t){if(!this.dataset.sapUiTestModuleWaiterHandled){var i={src:t,state:r.PENDING,script:this};e._aModules.push(i);this.addEventListener("load",function(){i.state=r.LOADED;e._oLogger.trace("Script with src '"+t+"' loaded successfully")});this.addEventListener("error",function(){i.state=r.ERROR;e._oLogger.trace("Script with src '"+t+"' failed to load")});this.dataset.sapUiTestModuleWaiterHandled="true";e._oLogger.trace("Script with src '"+t+"' is tracked")}s.set.call(this,t)},get:s.get});t.apply(this,arguments)},hasPending:function(){var t=this._aModules.filter(function(t){if(!e(t.script).length){this._oLogger.trace("Script with src '"+t.src+"' was removed");return false}if(t.script.noModule){this._oLogger.trace("Script with src '"+t.src+"' and 'nomodule' will be ignored because the browser supports ES6 modules");return false}return t.state===r.PENDING}.bind(this));var s=t.length>0;if(s){this._oHasPendingLogger.debug("There are "+t.length+" modules still loading");t.forEach(function(t){this._oHasPendingLogger.debug("Pending module: "+t.src)}.bind(this))}return s}});return new s});
//# sourceMappingURL=_moduleWaiter.js.map