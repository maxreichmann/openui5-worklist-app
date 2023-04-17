/*!
* OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
*/
sap.ui.define(["./library","./SliderUtilities","sap/ui/core/Control","sap/ui/core/Popup","./SliderTooltipContainerRenderer","sap/ui/thirdparty/jquery","sap/ui/core/Configuration"],function(t,e,o,i,r,jQuery,s){"use strict";var n=o.extend("sap.m.SliderTooltipContainer",{metadata:{library:"sap.m",properties:{enabled:{type:"boolean",group:"Behavior",defaultValue:true},width:{type:"sap.ui.core.CSSSize",group:"Appearance",defaultValue:"0px"}},associations:{associatedTooltips:{type:"sap.m.SliderTooltipBase",multiple:true}}},renderer:r});n.prototype.init=function(){this.oPopup=new i;this.oPopup.setShadow(false);this.oPopup.setAutoClose(false);this._scrollListener=this._getScrollListener();this._bClosedFromOverflow=false;this._bRtl=s.getRTL()};n.prototype._handleTabNavigation=function(t){var e=this._oParentSlider&&this._oParentSlider.isA("sap.m.RangeSlider");t.preventDefault();this[e?"_handleRangeSliderF2":"_handleSliderF2"].apply(this,arguments)};n.prototype._handleSliderF2=function(){this._oParentSlider.focus()};n.prototype._handleRangeSliderF2=function(t){var e=this._oParentSlider._getHandleForTooltip(t.srcControl);jQuery(e).trigger("focus")};n.prototype.onsaptabnext=n.prototype._handleTabNavigation;n.prototype.onsaptabprevious=n.prototype._handleTabNavigation;n.prototype.onkeydown=function(t){if(t.keyCode===e.CONSTANTS.F2_KEYCODE){this._handleTabNavigation(t)}};n.prototype.show=function(t){this.oPopup.setContent(this);this._$ParentSlider=t.$();this._oParentSlider=t;this.oPopup.open(0,i.Dock.BeginTop,i.Dock.BeginTop,this._$ParentSlider,"0 -24","flip");document.addEventListener("scroll",this._scrollListener,true)};n.prototype._getScrollListener=function(){return function(){clearTimeout(this._scrollDebounce);this._scrollDebounce=setTimeout(this.repositionTooltips.bind(this),0)}.bind(this)};n.prototype.hide=function(){this.oPopup.close();document.removeEventListener("scroll",this._scrollListener,true)};n.prototype.repositionTooltips=function(){if(!this._oParentSlider){return}var t=this._oParentSlider.isA("sap.m.RangeSlider"),e=this._oParentSlider.getUsedTooltips(),o=this.getAssociatedTooltipsAsControls()[0].$().outerHeight(true);if(this.getDomRef()){this[t?"_positionRangeTooltips":"_positionTooltip"].call(this,e,arguments[0],arguments[1]);this.getDomRef().style["top"]=this._$ParentSlider.offset().top-o+"px";this._handleOverflow()}};n.prototype._positionTooltip=function(t,e,o){var i=this._getTooltipPosition(t[0].getValue(),e,o),r=this._bRtl?"right":"left";if(i){this.getDomRef().children[0].style[r]=i}};n.prototype._handleOverflow=function(){var t=this.getDomRef(),o,i;if(t){o=e.getElementScrollableParent(this._$ParentSlider[0].parentNode);i=e.isScrolledIntoView(this._$ParentSlider[0],o);if(!i){this._bClosedFromOverflow=true;this.hide()}}};n.prototype._positionRangeTooltips=function(t,o,i){var r=this._bRtl,s=r?"right":"left",n=r?"left":"right",l=this._oParentSlider.getRange(),a=e.getPercentOfValue(l[0]>l[1]?l[1]:l[0],o,i),p=e.getPercentOfValue(l[0]>l[1]?l[0]:l[1],o,i),h=this.getAssociatedTooltipsAsControls()[0].$().outerWidth(),d=e.getPercentOfValue(+t[0].getValue(),o,i),c=e.getPercentOfValue(+t[1].getValue(),o,i),u=this._oParentSlider.$("progress"),f=this.$("container"),_=this._$ParentSlider.width(),S=false,T=h-e.CONSTANTS.TOOLTIP_SIDE_PADDING,g=(T+e.CONSTANTS.CHARACTER_WIDTH_PX)/2/_*100,A=a-g-(g*2-(p-a))/2,P={"min-width":2*h+e.CONSTANTS.TOOLTIP_BORDER*2+"px"},N;P[s]="calc("+d+"%"+" - "+(h/2-e.CONSTANTS.HANDLE_HALF_WIDTH)+"px)";P[n]="calc("+(100-c)+"% "+"- "+(h-(h/2-e.CONSTANTS.HANDLE_HALF_WIDTH-e.CONSTANTS.TOOLTIP_BORDER))+"px)";if(u.outerWidth()<=h/2+(h-e.CONSTANTS.HANDLE_HALF_WIDTH)){P[s]="calc("+A+"%"+" + "+e.CONSTANTS.HANDLE_HALF_WIDTH+"px)";S=true}f.css(P);N=this._$ParentSlider.offset();if(f.offset().left+f.outerWidth()>N.left+this._$ParentSlider.outerWidth()){P=this[r?"_getStickedToStart":"_getStickedToEnd"].call(this,P,s,n,S)}if(f.offset().left<=N.left){P=this[r?"_getStickedToEnd":"_getStickedToStart"].call(this,P,s,n,S)}f.css(P)};n.prototype._getStickedToStart=function(t,e){t[e]="0";return t};n.prototype._getStickedToEnd=function(t,o,i,r){var s=this.getAssociatedTooltipsAsControls()[0].$().outerWidth();t[i]="calc(0% - "+2*e.CONSTANTS.HANDLE_HALF_WIDTH+"px)";if(r){t[o]="calc(100% - "+(s+(s-2*e.CONSTANTS.HANDLE_HALF_WIDTH))+"px)"}return t};n.prototype._getTooltipPosition=function(t,o,i){var r=e.getPercentOfValue(+t,o,i),s=this.getAssociatedTooltipsAsControls()[0].$().outerWidth(),n=this._$ParentSlider.outerWidth(),l=100*e.CONSTANTS.SLIDER_SIDE_PADDING/n,a=100*s/n;if(r+l<a/2){return"0"}else if(r-l>100-a/2){return"calc(100% - "+(s-e.CONSTANTS.HANDLE_HALF_WIDTH*2)+"px)"}else{return"calc("+r+"% - "+(s/2-e.CONSTANTS.HANDLE_HALF_WIDTH)+"px)"}};n.prototype.setWidth=function(t){if(this.getDomRef()){this.$().width(t)}return this.setProperty("width",t,true)};n.prototype.getAssociatedTooltipsAsControls=function(){var t=this.getAssociation("associatedTooltips")||[];return t.map(function(t){return sap.ui.getCore().byId(t)})};n.prototype.onmouseout=function(t){var e=jQuery.contains(this._oParentSlider.getDomRef(),document.activeElement),o=jQuery.contains(this.getDomRef(),document.activeElement),i=jQuery.contains(this._oParentSlider.getDomRef(),t.toElement),r=jQuery.contains(this.getDomRef(),t.toElement);if(e||o||i||r){return}this.hide()};n.prototype.onfocusout=function(t){if(jQuery.contains(this._$ParentSlider[0],t.relatedTarget)||jQuery.contains(this.getDomRef(),t.relatedTarget)){return}if(this._bClosedFromOverflow){this._oParentSlider.focus();this._bClosedFromOverflow=false}this.hide()};n.prototype.onBeforeRendering=function(){this._bRtl=s.getRTL()};n.prototype.exit=function(){this._oParentSlider=null;this._$ParentSlider=null;document.removeEventListener("scroll",this._scrollListener,true)};return n});
//# sourceMappingURL=SliderTooltipContainer.js.map