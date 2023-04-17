/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./BaseHeader","sap/m/library","sap/f/library","sap/m/Text","sap/m/Avatar","sap/f/cards/HeaderRenderer","sap/ui/core/InvisibleText"],function(t,e,i,a,s,r,n){"use strict";var l=e.AvatarShape;var o=e.AvatarColor;var p=t.extend("sap.f.cards.Header",{metadata:{library:"sap.f",interfaces:["sap.f.cards.IHeader"],properties:{title:{type:"string",defaultValue:""},titleMaxLines:{type:"int",defaultValue:3},subtitle:{type:"string",defaultValue:""},subtitleMaxLines:{type:"int",defaultValue:2},statusText:{type:"string",defaultValue:""},iconDisplayShape:{type:"sap.m.AvatarShape",defaultValue:l.Circle},iconSrc:{type:"sap.ui.core.URI",defaultValue:""},iconInitials:{type:"string",defaultValue:""},iconAlt:{type:"string",defaultValue:""},iconBackgroundColor:{type:"sap.m.AvatarColor",defaultValue:o.Transparent},iconVisible:{type:"boolean",defaultValue:true}},aggregations:{_title:{type:"sap.m.Text",multiple:false,visibility:"hidden"},_subtitle:{type:"sap.m.Text",multiple:false,visibility:"hidden"},_avatar:{type:"sap.m.Avatar",multiple:false,visibility:"hidden"}},events:{press:{}}},renderer:r});p.prototype.init=function(){t.prototype.init.apply(this,arguments);this.data("sap-ui-fastnavgroup","true",true);this._oAriaAvatarText=new n({id:this.getId()+"-ariaAvatarText"});this._oAriaAvatarText.setText(this._oRb.getText("ARIA_HEADER_AVATAR_TEXT"))};p.prototype.exit=function(){t.prototype.exit.apply(this,arguments);if(this._oAriaAvatarText){this._oAriaAvatarText.destroy();this._oAriaAvatarText=null}};p.prototype._getTitle=function(){var t=this.getAggregation("_title");if(!t){t=(new a).addStyleClass("sapFCardTitle");this.setAggregation("_title",t)}return t};p.prototype._getSubtitle=function(){var t=this.getAggregation("_subtitle");if(!t){t=(new a).addStyleClass("sapFCardSubtitle");this.setAggregation("_subtitle",t)}return t};p.prototype._getAvatar=function(){var t=this.getAggregation("_avatar");if(!t){t=(new s).addStyleClass("sapFCardIcon");this.setAggregation("_avatar",t)}return t};p.prototype.onBeforeRendering=function(){t.prototype.onBeforeRendering.apply(this,arguments);this._getTitle().setText(this.getTitle()).setMaxLines(this.getTitleMaxLines());this._getSubtitle().setText(this.getSubtitle()).setMaxLines(this.getSubtitleMaxLines());var e=this._getAvatar();e.setDisplayShape(this.getIconDisplayShape());e.setSrc(this.getIconSrc());e.setInitials(this.getIconInitials());e.setTooltip(this.getIconAlt());e.setBackgroundColor(this.getIconBackgroundColor())};p.prototype.enhanceAccessibilityState=function(t,e){if(t===this.getAggregation("_title")){e.role=this.getTitleAriaRole();e.level=this.getAriaHeadingLevel()}};p.prototype._getAriaLabelledBy=function(){var t="",e="",i="",a="",s="",r;if(this.getParent()&&this.getParent()._ariaText){t=this.getParent()._ariaText.getId()}if(this.getTitle()){e=this._getTitle().getId()}if(this.getSubtitle()){i=this._getSubtitle().getId()}if(this.getStatusText()){a=this.getId()+"-status"}if(this.getIconSrc()||this.getIconInitials()){s=this.getId()+"-ariaAvatarText"}r=t+" "+e+" "+i+" "+a+" "+s;return r.replace(/ {2,}/g," ").trim()};p.prototype.isLoading=function(){return false};p.prototype.attachPress=function(){var e=Array.prototype.slice.apply(arguments);e.unshift("press");t.prototype.attachEvent.apply(this,e);this.invalidate();return this};p.prototype.detachPress=function(){var e=Array.prototype.slice.apply(arguments);e.unshift("press");t.prototype.detachEvent.apply(this,e);this.invalidate();return this};return p});
//# sourceMappingURL=Header.js.map