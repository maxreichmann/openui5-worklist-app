/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/test/selectors/_BindingPath","sap/m/ListBase","sap/m/ListItemBase","sap/ui/thirdparty/jquery"],function(t,e,n,i){"use strict";var r=t.extend("sap.ui.test.selectors._TableRowItem",{_generate:function(t,e){if(e.ancestor&&e.relative){var n=this._getValidationRoot(t);var r=this._getAncestor(t);var o=r.getBindingInfo("items");var a=n.getBindingContextPath&&n.getBindingContextPath();var s={};if(o&&a){s=i.extend(this._createSelectorBase(n,{}),{bindingPath:{modelName:o.model||undefined,path:a},ancestor:e.ancestor})}this._oLogger.debug("Control "+t+" has table row binding context path "+a);return i.extend({},e.relative,{ancestor:s})}else{this._oLogger.debug("Control "+t+" does not have unique selector within row subtree or unique table selector")}},_isAncestorRequired:function(){return true},_isValidationRootRequired:function(){return true},_getAncestor:function(t){var n=this._getValidationRoot(t);if(n){return this._findAncestor(n,function(t){return t instanceof e})}},_getValidationRoot:function(t){return this._findAncestor(t,function(t){return t instanceof n})}});return r});
//# sourceMappingURL=_TableRowItem.js.map