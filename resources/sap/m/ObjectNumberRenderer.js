/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/Renderer","sap/ui/core/library","./library","sap/ui/core/Core"],function(e,t,n,r){"use strict";var a=t.ValueState;var s=t.TextDirection;var i="sapMObjectNumberStatus";var o=n.EmptyIndicatorMode;var p=r.getLibraryResourceBundle("sap.m");var d={apiVersion:2};d.render=function(t,n){var r=n.getTooltip_AsString(),a=n.getTextDirection(),p=n.getTextAlign(),d={};t.openStart("div",n);t.class("sapMObjectNumber");if(n._isActive()){t.class("sapMObjectNumberActive");t.attr("tabindex","0");d.role="button"}t.class(i+n.getState());if(n.getEmphasized()){t.class("sapMObjectNumberEmph")}if(n.getInverted()){t.class("sapMObjectNumberInverted")}if(r){t.attr("title",r)}if(a!==s.Inherit){t.attr("dir",a.toLowerCase())}p=e.getTextAlign(p,a);if(p){t.style("text-align",p)}if(n._hasExternalLabelling()){d["labelledby"]={value:n._generateSelfLabellingIds(),append:true}}t.accessibilityState(n,d);t.openEnd();t.openStart("span",n.getId()+"-inner");t.class("sapMObjectNumberInner");t.openEnd();if(n.getEmptyIndicatorMode()!==o.Off&&!n.getNumber()){this.renderEmptyIndicator(t,n)}else{this.renderText(t,n);this.renderUnit(t,n)}t.close("span");this.renderEmphasizedInfoElement(t,n);this.renderHiddenARIAElement(t,n);this.renderRoleDescriptionInfo(t,n);t.close("div")};d.renderText=function(e,t){var n=t.getUnit()||t.getNumberUnit();e.openStart("span",t.getId()+"-number");e.class("sapMObjectNumberText");e.openEnd();e.text(t.getNumber());if(n!==""){e.text(" ")}e.close("span")};d.renderUnit=function(e,t){var n=t.getUnit()||t.getNumberUnit();if(n!==""){e.openStart("span",t.getId()+"-unit");e.class("sapMObjectNumberUnit");e.openEnd();e.text(n);e.close("span")}};d.renderEmphasizedInfoElement=function(e,t){if(!t.getEmphasized()||!t.getNumber()){return}e.openStart("span",t.getId()+"-emphasized");e.class("sapUiPseudoInvisibleText");e.openEnd();e.text(sap.ui.getCore().getLibraryResourceBundle("sap.m").getText("OBJECTNUMBER_EMPHASIZED"));e.close("span")};d.renderHiddenARIAElement=function(e,t){if(t.getState()==a.None){return}e.openStart("span",t.getId()+"-state");e.class("sapUiPseudoInvisibleText");e.openEnd();e.text(t._getStateText());e.close("span")};d.renderRoleDescriptionInfo=function(e,t){e.openStart("span",t.getId()+"-roledescription");e.class("sapUiPseudoInvisibleText");e.openEnd();e.text(sap.ui.getCore().getLibraryResourceBundle("sap.m").getText("OBJECTNUMBER_NAME"));e.close("span")};d.renderEmptyIndicator=function(e,t){e.openStart("span");e.class("sapMEmptyIndicator");if(t.getEmptyIndicatorMode()===o.Auto){e.class("sapMEmptyIndicatorAuto")}e.openEnd();e.openStart("span");e.attr("aria-hidden",true);e.openEnd();e.text(p.getText("EMPTY_INDICATOR"));e.close("span");e.openStart("span");e.class("sapUiPseudoInvisibleText");e.openEnd();e.text(p.getText("EMPTY_INDICATOR_TEXT"));e.close("span");e.close("span")};return d},true);
//# sourceMappingURL=ObjectNumberRenderer.js.map