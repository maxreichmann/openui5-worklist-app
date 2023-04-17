/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/Control","sap/ui/events/KeyCodes","./library","sap/ui/core/library","sap/ui/core/Icon","./GenericTagRenderer"],function(e,t,r,i,o,a){"use strict";var n=r.GenericTagDesign,s=r.GenericTagValueState,c=i.ValueState,l={Error:"sap-icon://error",Warning:"sap-icon://alert",Success:"sap-icon://sys-enter-2",Information:"sap-icon://information"};var u=e.extend("sap.m.GenericTag",{metadata:{library:"sap.m",interfaces:["sap.m.IOverflowToolbarContent","sap.m.IOverflowToolbarFlexibleContent"],properties:{text:{type:"string",defaultValue:""},status:{type:"sap.ui.core.ValueState",defaultValue:c.None},design:{type:"sap.m.GenericTagDesign",defaultValue:n.Full},valueState:{type:"sap.m.GenericTagValueState",defaultValue:s.None}},defaultAggregation:"value",associations:{ariaLabelledBy:{type:"sap.ui.core.Control",multiple:true,singularName:"ariaLabelledBy"}},aggregations:{value:{type:"sap.m.ObjectNumber",multiple:false},_statusIcon:{type:"sap.ui.core.Icon",multiple:false,visibility:"hidden"},_errorIcon:{type:"sap.ui.core.Icon",multiple:false,visibility:"hidden"}},events:{press:{}}},renderer:a});u.CLASSNAME_OVERFLOW_TOOLBAR="sapMGenericTagOverflowToolbar";u.prototype.setStatus=function(e){this.setProperty("status",e,false);this._getStatusIcon().setSrc(e!==c.None?l[e]:null);return this};u.prototype.setValue=function(e){var t=this.getValue();if(t){e.detachEvent("_change",this._fireValueChanged,this)}this.setAggregation("value",e);e.attachEvent("_change",this._fireValueChanged,this);this._fireValueChanged();return this};u.prototype._fireValueChanged=function(){this.fireEvent("_valueChanged")};u.prototype._getStatusIcon=function(){var e=this.getAggregation("_statusIcon");if(!e){e=new o(this.getId()+"-statusIcon").addStyleClass("sapMGenericTagIcon");this.setAggregation("_statusIcon",e)}return e};u.prototype._getErrorIcon=function(){var e=this.getAggregation("_errorIcon");if(!e){e=new o(this.getId()+"-errorIcon",{src:l[c.Error]}).addStyleClass("sapMGenericTagErrorIcon");this.setAggregation("_errorIcon",e)}return e};u.prototype.ontouchstart=function(){this._toggleActiveGenericTag(true)};u.prototype.ontouchend=function(){this._toggleActiveGenericTag(false)};u.prototype.ontouchcancel=function(){this._toggleActiveGenericTag(false)};u.prototype.onkeydown=function(e){if(e.which===t.SPACE||e.which===t.ENTER){this._toggleActiveGenericTag(true)}if(e.which===t.SHIFT||e.which===t.ESCAPE){this._bShouldInterupt=this._bSpacePressed}if(e.which===t.SPACE){this._bSpacePressed=true;e.preventDefault()}if(e.which===t.ENTER){this.firePress()}};u.prototype.onkeyup=function(e){if(e.which===t.SPACE||e.which===t.ENTER){this._toggleActiveGenericTag(false)}if(e.which===t.SPACE){if(!this._bShouldInterupt){this.firePress()}this._bShouldInterupt=false;this._bSpacePressed=false}};u.prototype.onclick=function(){this.firePress()};u.prototype.onfocusout=function(){this._toggleActiveGenericTag(false)};u.prototype._toggleActiveGenericTag=function(e){this.toggleStyleClass("sapMGenericTagActive",e)};u.prototype._onBeforeEnterOverflow=function(e){e.addStyleClass(u.CLASSNAME_OVERFLOW_TOOLBAR)};u.prototype._onAfterExitOverflow=function(e){e.removeStyleClass(u.CLASSNAME_OVERFLOW_TOOLBAR)};u.prototype.getOverflowToolbarConfig=function(){var e={canOverflow:true,invalidationEvents:["_valueChanged"]};e.onBeforeEnterOverflow=this._onBeforeEnterOverflow;e.onAfterExitOverflow=this._onAfterExitOverflow;return e};return u});
//# sourceMappingURL=GenericTag.js.map