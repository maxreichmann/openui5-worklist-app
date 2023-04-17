/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./ColorPickerDisplayMode","sap/ui/Device"],function(e,o){"use strict";var r={apiVersion:2};r.render=function(r,t){var n=t.getDisplayMode(),i=t.bResponsive;r.openStart("div",t);r.accessibilityState(t,{role:"group",roledescription:sap.ui.getCore().getLibraryResourceBundle("sap.ui.unified").getText("COLOR_PICKER_TITLE")});if(i){r.class("sapUiColorPicker-ColorPickerMatrix");r.class("sapUiColorPicker-"+n);r.class("sapUnifiedColorPicker");if(t._bHSLMode){r.class("sapUiColorPickerHSL")}}if(o.system.phone){r.class("sapUiCPPhone")}r.openEnd();if(!i){r.renderControl(t.getAggregation("_grid"))}else{switch(n){case e.Default:this.renderDefaultColorPicker(r,t);break;case e.Large:this.renderLargeColorPicker(r,t);break;case e.Simplified:this.renderSimplifiedColorPicker(r,t)}}r.close("div")};r.renderDefaultColorPicker=function(e,r){e.renderControl(r.getAggregation("_oCPBox"));if(o.system.phone){e.openStart("div");e.class("sapUiCPPhoneContent");e.openEnd();e.openStart("div");e.class("sapUiCPSlidersPhone");e.openEnd();e.renderControl(r.getAggregation("_oSlider"));e.renderControl(r.getAggregation("_oAlphaSlider"));e.close("div");this.renderMobileSwatches(e,r);e.close("div")}else{e.renderControl(r.getAggregation("_oSlider"));e.renderControl(r.getAggregation("_oAlphaSlider"));this.renderDesktopSwatchesAndHexFields(e,r)}e.openStart("div");e.class("sapUiCPDefaultWrapper");e.openEnd();if(o.system.phone){e.renderControl(r.getAggregation("_oHexField"));e.openStart("div");e.class("sapUiCPHexText");e.openEnd();e.text("Hex");e.close("div")}e.openStart("div");e.class("sapUiCPDefaultRGB");e.openEnd();e.renderControl(r.getAggregation("_oRedField"));this.renderEmptyDiv(e);e.renderControl(r.getAggregation("_oGreenField"));this.renderEmptyDiv(e);e.renderControl(r.getAggregation("_oBlueField"));this.renderEmptyDiv(e);e.renderControl(r.getAggregation("_oAlphaField"));e.close("div");e.openStart("div");e.class("sapUiCPDefaultHSLV");e.openEnd();e.renderControl(r.getAggregation("_oHueField"));this.renderEmptyDiv(e);e.renderControl(r.getAggregation("_oSatField"));e.openStart("div");e.class("sapUiCPPercentSymbol");e.openEnd();e.text("%");e.close("div");e.renderControl(r.getAggregation("_oLitField"));e.renderControl(r.getAggregation("_oValField"));if(r.getMode()==="HSL"){e.openStart("div");e.class("sapUiCPPercentSymbol");e.openEnd();e.text("%");e.close("div")}else{this.renderEmptyDiv(e)}e.renderControl(r.getAggregation("_oAlphaField2"));e.close("div");e.renderControl(r.getAggregation("_oButton"));this.renderRGBLabel(e,r);this.renderHSLVLabel(e,r);e.close("div")};r.renderLargeColorPicker=function(e,o){e.renderControl(o.getAggregation("_oCPBox"));e.renderControl(o.getAggregation("_oSlider"));e.renderControl(o.getAggregation("_oAlphaSlider"));this.renderDesktopSwatchesAndHexFields(e,o);e.renderControl(o.oRGBorHSLRBUnifiedGroup);e.openStart("div");e.class("sapUiCPRGBA");e.openEnd();e.renderControl(o.getAggregation("_oRedField"));this.renderEmptyDiv(e);e.renderControl(o.getAggregation("_oGreenField"));this.renderEmptyDiv(e);e.renderControl(o.getAggregation("_oBlueField"));this.renderEmptyDiv(e);e.renderControl(o.getAggregation("_oAlphaField"));e.close("div");this.renderRGBLabel(e,o);e.openStart("div");e.class("sapUiCPHSLV");e.openEnd();e.renderControl(o.getAggregation("_oHueField"));this.renderEmptyDiv(e);e.renderControl(o.getAggregation("_oSatField"));e.openStart("div");e.class("sapUiCPPercentSymbol");e.openEnd();e.text("%");e.close("div");o.getMode()==="HSL"?this.renderLFirst(e,o):this.renderVFirst(e,o);e.close("div");this.renderHSLVLabel(e,o)};r.renderSimplifiedColorPicker=function(e,r){e.renderControl(r.getAggregation("_oCPBox"));if(o.system.phone){e.openStart("div");e.class("sapUiCPPhoneContent");e.openEnd();e.openStart("div");e.class("sapUiCPSlidersPhone");e.openEnd();e.renderControl(r.getAggregation("_oSlider"));e.close("div");e.renderControl(r.getAggregation("_oHexField"));this.renderMobileSwatches(e,r);e.openStart("div");e.class("sapUiCPHexWrapper");e.openEnd();e.openStart("div");e.class("sapUiCPHexText");e.openEnd();e.text("Hex");e.close("div");e.close("div");e.close("div")}else{e.renderControl(r.getAggregation("_oSlider"));this.renderDesktopSwatchesAndHexFields(e,r)}};r.renderDesktopSwatchesAndHexFields=function(e,o){e.openStart("div");e.class("sapUiCPComparisonWrapper");e.openEnd();e.openStart("div",o.getId()+"-ocBox");e.class("sapUiColorPicker-ColorPickerOldColor");e.openEnd();e.close("div");e.openStart("div",o.getId()+"-ncBox");e.class("sapUiColorPicker-ColorPickerNewColor");e.openEnd();e.close("div");e.close("div");e.openStart("div");e.class("sapUiCPHexWrapper");e.openEnd();e.openStart("span");e.class("sapUiCPHexText");e.openEnd();e.text("Hex");e.close("span");e.close("div");e.renderControl(o.getAggregation("_oHexField"))};r.renderMobileSwatches=function(e,o){e.openStart("div");e.class("sapUiCPComparisonWrapper");e.class("sapUiCPComparisonWrapperPhone");e.openEnd();e.openStart("div",o.getId()+"-ocBox");e.class("sapUiColorPicker-ColorPickerOldColor");e.openEnd();e.close("div");e.openStart("div",o.getId()+"-ncBox");e.class("sapUiColorPicker-ColorPickerNewColor");e.openEnd();e.close("div");e.close("div")};r.renderLFirst=function(e,o){e.renderControl(o.getAggregation("_oLitField"));e.openStart("div");e.class("sapUiCPPercentSymbol");e.openEnd();e.text("%");e.close("div");e.renderControl(o.getAggregation("_oValField"))};r.renderVFirst=function(e,o){e.renderControl(o.getAggregation("_oValField"));this.renderEmptyDiv(e);e.renderControl(o.getAggregation("_oLitField"))};r.renderEmptyDiv=function(e){e.openStart("div");e.class("sapUiCPEmptyDiv");e.openEnd();e.close("div")};r.renderRGBLabel=function(e,o){e.openStart("div");e.class("sapUiCPRGBText");e.openEnd();e.openStart("span");e.class("sapUiCPText");e.openEnd();e.text("R");e.close("span");this.renderEmptyDiv(e);e.openStart("span");e.class("sapUiCPText");e.openEnd();e.text("G");e.close("span");this.renderEmptyDiv(e);e.openStart("span");e.class("sapUiCPText");e.openEnd();e.text("B");e.close("span");this.renderEmptyDiv(e);if(o.getDisplayMode()==="Default"){e.openStart("span");e.class("sapUiCPText");e.openEnd();e.text("A");e.close("span")}else{e.openStart("span");e.class("sapUiCPText");e.openEnd();e.close("span")}e.close("div")};r.renderHSLVLabel=function(e,o){e.openStart("div");e.class("sapUiCPHSLVText");e.openEnd();e.openStart("span");e.class("sapUiCPText");e.openEnd();e.text("H");e.close("span");this.renderEmptyDiv(e);e.openStart("span");e.class("sapUiCPText");e.openEnd();e.text("S");e.close("span");this.renderEmptyDiv(e);if(o.getMode()==="HSL"){e.openStart("span");e.class("sapUiCPText");e.openEnd();e.text("L");e.close("span")}else{e.openStart("span");e.class("sapUiCPText");e.openEnd();e.text("V");e.close("span")}this.renderEmptyDiv(e);e.openStart("span");e.class("sapUiCPText");e.openEnd();e.text("A");e.close("span");e.close("div")};return r},true);
//# sourceMappingURL=ColorPickerRenderer.js.map