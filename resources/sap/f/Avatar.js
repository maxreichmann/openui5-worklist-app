/*!
 * OpenUI5
 * (c) Copyright 2009-2019 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./library","sap/ui/core/Control","sap/ui/core/IconPool","./AvatarRenderer","sap/ui/events/KeyCodes","sap/base/Log"],function(t,e,a,i,s,r){"use strict";var o=t.AvatarType;var n=t.AvatarImageFitType;var p=t.AvatarSize;var l=t.AvatarShape;var h=e.extend("sap.f.Avatar",{metadata:{library:"sap.f",properties:{src:{type:"sap.ui.core.URI",group:"Data",defaultValue:null},initials:{type:"string",group:"Data",defaultValue:null},displayShape:{type:"sap.f.AvatarShape",group:"Appearance",defaultValue:l.Circle},displaySize:{type:"sap.f.AvatarSize",group:"Appearance",defaultValue:p.S},customDisplaySize:{type:"sap.ui.core.CSSSize",group:"Appearance",defaultValue:"3rem"},customFontSize:{type:"sap.ui.core.CSSSize",group:"Appearance",defaultValue:"1.125rem"},imageFitType:{type:"sap.f.AvatarImageFitType",group:"Appearance",defaultValue:n.Cover}},aggregations:{detailBox:{type:"sap.m.LightBox",multiple:false,bindable:"bindable"}},associations:{ariaDescribedBy:{type:"sap.ui.core.Control",multiple:true,singularName:"ariaDescribedBy"},ariaLabelledBy:{type:"sap.ui.core.Control",multiple:true,singularName:"ariaLabelledBy"}},events:{press:{}},designtime:"sap/f/designtime/Avatar.designtime"}});h.DEFAULT_CIRCLE_PLACEHOLDER="sap-icon://person-placeholder";h.DEFAULT_SQUARE_PLACEHOLDER="sap-icon://product";h.prototype.init=function(){this._sActualType=null;this._bIsDefaultIcon=true;this._sImageFallbackType=null};h.prototype.exit=function(){if(this._icon){this._icon.destroy()}if(this._fnLightBoxOpen){this._fnLightBoxOpen=null}};h.prototype.setDetailBox=function(t){var e=this.getDetailBox();if(t){if(t===e){return this}if(e){this.detachPress(this._fnLightBoxOpen,e)}this._fnLightBoxOpen=t.open;this.attachPress(this._fnLightBoxOpen,t)}else if(this._fnLightBoxOpen){this.detachPress(this._fnLightBoxOpen,e);this._fnLightBoxOpen=null}return this.setAggregation("detailBox",t)};h.prototype.clone=function(){var t=e.prototype.clone.apply(this,arguments),a=t.getDetailBox();if(a){t.detachPress(this._fnLightBoxOpen,this.getDetailBox());t._fnLightBoxOpen=a.open;t.attachPress(t._fnLightBoxOpen,a)}return t};h.prototype.attachPress=function(){Array.prototype.unshift.apply(arguments,["press"]);e.prototype.attachEvent.apply(this,arguments);if(this.hasListeners("press")){this.$().attr("tabindex","0");this.$().attr("role","button")}return this};h.prototype.detachPress=function(){Array.prototype.unshift.apply(arguments,["press"]);e.prototype.detachEvent.apply(this,arguments);if(!this.hasListeners("press")){this.$().removeAttr("tabindex");this.$().attr("role","img")}return this};h.prototype.ontap=function(){this.firePress({})};h.prototype.onkeyup=function(t){if(t.which===s.SPACE||t.which===s.ENTER){this.firePress({});t.stopPropagation()}};h.prototype._areInitialsValid=function(t){var e=/^[a-zA-Z]{1,2}$/;if(!e.test(t)){r.warning("Initials should consist of only 1 or 2 latin letters",this);this._sActualType=o.Icon;this._bIsDefaultIcon=true;return false}return true};h.prototype._validateSrc=function(t){if(a.isIconURI(t)){this._sActualType=o.Icon;this._bIsDefaultIcon=false}else{this._bIsDefaultIcon=true;this._sActualType=o.Image;this.preloadedImage=new window.Image;this.preloadedImage.src=t;this.preloadedImage.onload=this._onImageLoad.bind(this);this.preloadedImage.onerror=this._onImageError.bind(this)}return this};h.prototype._getActualDisplayType=function(){var t=this.getSrc(),e=this.getInitials();if(t){this._validateSrc(t)}else if(e&&this._areInitialsValid(e)){this._sActualType=o.Initials}else{r.warning("No src and initials were provided",this);this._sActualType=o.Icon;this._bIsDefaultIcon=true}return this._sActualType};h.prototype._getImageFallbackType=function(){var t=this.getInitials();if(this._sActualType===o.Image){this._sImageFallbackType=t&&this._areInitialsValid(t)?o.Initials:o.Icon}return this._sImageFallbackType};h.prototype._getDefaultIconPath=function(t){var e=null;if(t===l.Circle){e=h.DEFAULT_CIRCLE_PLACEHOLDER}else if(t===l.Square){e=h.DEFAULT_SQUARE_PLACEHOLDER}return e};h.prototype._getIcon=function(){var t=this.getSrc(),e=this.getDisplayShape();if(this._bIsDefaultIcon){t=this._getDefaultIconPath(e)}if(!this._icon){this._icon=a.createControlByURI({alt:"Image placeholder",src:t})}else if(this._icon.getSrc()!==t){this._icon.setSrc(t)}return this._icon};h.prototype._getEscapedSrc=function(){var t=this.getSrc();if(!t){return""}return t.replace(/'/g,"\\'")};h.prototype._getDefaultTooltip=function(){return sap.ui.getCore().getLibraryResourceBundle("sap.f").getText("AVATAR_TOOLTIP")};h.prototype._onImageLoad=function(){delete this.preloadedImage};h.prototype._onImageError=function(){var t=this._getImageFallbackType();this.$().removeClass("sapFAvatarImage").addClass("sapFAvatar"+t);delete this.preloadedImage};return h});