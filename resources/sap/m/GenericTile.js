/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./library","sap/ui/core/Control","sap/m/Text","sap/ui/core/HTML","sap/ui/core/Icon","sap/ui/core/IconPool","sap/m/Button","sap/m/GenericTileRenderer","sap/m/GenericTileLineModeRenderer","sap/m/Image","sap/ui/Device","sap/ui/core/ResizeHandler","sap/base/strings/camelize","sap/base/util/deepEqual","sap/ui/events/PseudoEvents","sap/ui/core/theming/Parameters","sap/ui/thirdparty/jquery","sap/ui/core/library","sap/ui/core/Configuration","sap/ui/core/InvisibleText"],function(e,t,i,o,s,n,a,r,l,h,p,d,c,u,g,f,jQuery,_,y,m){"use strict";var T=e.GenericTileScope,v=e.LoadState,I=_.CSSColor,A=e.FrameType,M=e.Size,S=e.GenericTileMode,C=e.TileSizeBehavior,b=e.WrappingType,R=e.URLHelper,L;L=f.get({name:"sapLegendColor9",callback:function(e){L=e}});var x="GenericTileDeviceSet";var B={};var P=t.extend("sap.m.GenericTile",{metadata:{library:"sap.m",properties:{mode:{type:"sap.m.GenericTileMode",group:"Appearance",defaultValue:S.ContentMode},header:{type:"string",group:"Appearance",defaultValue:null},subheader:{type:"string",group:"Appearance",defaultValue:null},failedText:{type:"string",group:"Appearance",defaultValue:null},size:{type:"sap.m.Size",group:"Misc",defaultValue:M.Auto,deprecated:true},frameType:{type:"sap.m.FrameType",group:"Misc",defaultValue:A.OneByOne},systemInfo:{type:"string",group:"Misc",defaultValue:null},appShortcut:{type:"string",group:"Misc",defaultValue:null},backgroundImage:{type:"sap.ui.core.URI",group:"Misc",defaultValue:null},headerImage:{type:"sap.ui.core.URI",group:"Misc",defaultValue:null},state:{type:"sap.m.LoadState",group:"Misc",defaultValue:v.Loaded},imageDescription:{type:"string",group:"Accessibility",defaultValue:null},scope:{type:"sap.m.GenericTileScope",group:"Misc",defaultValue:T.Display},sizeBehavior:{type:"sap.m.TileSizeBehavior",defaultValue:C.Responsive},ariaLabel:{type:"string",group:"Accessibility",defaultValue:null},ariaRole:{type:"string",group:"Accessibility",defaultValue:null},ariaRoleDescription:{type:"string",group:"Accessibility",defaultValue:null},url:{type:"sap.ui.core.URI",group:"Misc",defaultValue:null},enableNavigationButton:{type:"boolean",group:"Misc",defaultValue:false},pressEnabled:{type:"boolean",group:"Misc",defaultValue:true},navigationButtonText:{type:"string",group:"Misc",defaultValue:null},wrappingType:{type:"sap.m.WrappingType",group:"Appearance",defaultValue:b.Normal},width:{type:"sap.ui.core.CSSSize",group:"Appearance"},additionalTooltip:{type:"string",group:"Accessibility",defaultValue:null},tileIcon:{type:"sap.ui.core.URI",multiple:false},backgroundColor:{type:"string",group:"Appearance",defaultValue:L},valueColor:{type:"sap.m.ValueColor",group:"Appearance",defaultValue:"None"},iconLoaded:{type:"boolean",group:"Misc",defaultValue:true},renderOnThemeChange:{type:"boolean",group:"Misc",defaultValue:false}},defaultAggregation:"tileContent",aggregations:{tileContent:{type:"sap.m.TileContent",multiple:true,bindable:"bindable"},icon:{type:"sap.ui.core.Control",multiple:false,deprecated:true},actionButtons:{type:"sap.m.Button",multiple:true,bindable:"bindable"},_titleText:{type:"sap.m.Text",multiple:false,visibility:"hidden"},_failedMessageText:{type:"sap.m.Text",multiple:false,visibility:"hidden"},_invisibleText:{type:"sap.ui.core.InvisibleText",multiple:false,visibility:"hidden"},_tileIcon:{type:"sap.ui.core.Icon",multiple:false,visibility:"hidden"},_tileIconImage:{type:"sap.m.Image",multiple:false,visibility:"hidden"}},events:{press:{parameters:{scope:{type:"sap.m.GenericTileScope"},action:{type:"string"},domRef:{type:"any"}}}}},renderer:{apiVersion:2,render:function(e,t){if(t.getMode()===S.LineMode){l.render(e,t)}else{r.render(e,t)}}}});P._Action={Press:"Press",Remove:"Remove",More:"More"};P.LINEMODE_SIBLING_PROPERTIES=["state","subheader","header","scope"];P.prototype.init=function(){this._oRb=sap.ui.getCore().getLibraryResourceBundle("sap.m");if(!p.media.hasRangeSet(x)){p.media.initRangeSet(x,[450],"px",["small","large"])}this._oTitle=new i(this.getId()+"-title");this._oTitle.addStyleClass("sapMGTTitle");this._oTitle.cacheLineHeight=false;this.setAggregation("_titleText",this._oTitle,true);this._oAppShortcut=new i(this.getId()+"-appShortcut");this._oAppShortcut.cacheLineHeight=false;this.addDependent(this._oAppShortcut);this._oSystemInfo=new i(this.getId()+"-systemInfo");this._oSystemInfo.cacheLineHeight=false;this.addDependent(this._oSystemInfo);this._oSubTitle=new i(this.getId()+"-subTitle");this._oSubTitle.cacheLineHeight=false;this.addDependent(this._oSubTitle);this._sFailedToLoad=this._oRb.getText("INFOTILE_CANNOT_LOAD_TILE");this._sLoading=this._oRb.getText("INFOTILE_LOADING");this._oFailedText=new i(this.getId()+"-failed-txt",{maxLines:2});this._oFailedText.cacheLineHeight=false;this._oFailedText.addStyleClass("sapMGTFailed");this.setAggregation("_failedMessageText",this._oFailedText,true);this._oInvisibleText=new m(this.getId()+"-ariaText");this.setAggregation("_invisibleText",this._oInvisibleText,true);this._oWarningIcon=new s(this.getId()+"-warn-icon",{src:"sap-icon://notification",size:"1.375rem"});this._oWarningIcon.addStyleClass("sapMGTFtrFldIcnMrk");this._oBusy=new o(this.getId()+"-overlay");this._oBusy.setBusyIndicatorDelay(0);this._bTilePress=true;this._sBGColor=L;this._bThemeApplied=true;if(!sap.ui.getCore().isInitialized()){this._bThemeApplied=false;sap.ui.getCore().attachInit(this._handleCoreInitialized.bind(this))}else{this._handleCoreInitialized()}this._oNavigateAction=new a(this.getId()+"-navigateAction");this._oNavigateAction._bExcludeFromTabChain=true;this.addDependent(this._oNavigateAction)};P.prototype.setWrappingType=function(e){this.setProperty("wrappingType",e,true);this._oTitle.setWrappingType(e);this._oFailedText.setWrappingType(e);this._oSubTitle.setWrappingType(e);this._oAppShortcut.setWrappingType(e);this._oSystemInfo.setWrappingType(e);return this};P.prototype.setSubheader=function(e){this.setProperty("subheader",e);this._oSubTitle.setText(e);return this};P.prototype.setAppShortcut=function(e){this.setProperty("appShortcut",e);this._oAppShortcut.setText(e);return this};P.prototype.setSystemInfo=function(e){this.setProperty("systemInfo",e);this._oSystemInfo.setText(e);return this};P.prototype._handleCoreInitialized=function(){this._bThemeApplied=sap.ui.getCore().isThemeApplied();if(!this._bThemeApplied){sap.ui.getCore().attachThemeChanged(this._handleThemeApplied,this)}};P.prototype._handleThemeApplied=function(){this._bThemeApplied=true;this._oTitle.clampHeight();sap.ui.getCore().detachThemeChanged(this._handleThemeApplied,this)};P.prototype.onThemeChanged=function(){if(this.getDomRef()&&this.getRenderOnThemeChange()){this.invalidate()}};P.prototype._initScopeContent=function(e){if(!this.getState||this.getState()!==v.Disabled){if(this._oMoreIcon){this._oMoreIcon.destroy();this._oMoreIcon=null}if(this.isA("sap.m.GenericTile")&&this._isIconMode()&&this.getFrameType()===A.TwoByHalf){this._oMoreIcon=this._oMoreIcon||new a({id:this.getId()+"-action-more",icon:"sap-icon://overflow",type:"Transparent",tooltip:this._oRb.getText("GENERICTILE_MORE_ACTIONBUTTON_TEXT")}).addStyleClass("sapMPointer").addStyleClass(e+"MoreIcon").addStyleClass(e+"ActionMoreButton");this._oMoreIcon.ontouchstart=function(){this.removeFocus()}.bind(this)}else{this._oMoreIcon=this._oMoreIcon||new a({id:this.getId()+"-action-more",icon:"sap-icon://overflow",type:"Unstyled"}).addStyleClass("sapMPointer").addStyleClass(e+"MoreIcon");this._oMoreIcon._bExcludeFromTabChain=true}this._oRemoveButton=this._oRemoveButton||new a({id:this.getId()+"-action-remove",icon:"sap-icon://decline",tooltip:this._oRb.getText("GENERICTILE_REMOVEBUTTON_TEXT")}).addStyleClass("sapUiSizeCompact").addStyleClass(e+"RemoveButton");this._oRemoveButton._bExcludeFromTabChain=true;switch(this.getScope()){case T.Actions:this._oMoreIcon.setVisible(true);this._oRemoveButton.setVisible(true);break;case T.ActionMore:this._oMoreIcon.setVisible(true);this._oRemoveButton.setVisible(false);break;case T.ActionRemove:this._oRemoveButton.setVisible(true);this._oMoreIcon.setVisible(false);break;default:}}};P.prototype._addClassesForButton=function(){this._oMoreIcon.getDomRef().classList.add("sapMBtn");this._oMoreIcon.getDomRef("inner").classList.add("sapMBtnInner");this._oMoreIcon.getDomRef("inner").classList.add("sapMBtnTransparent")};P.prototype.removeFocus=function(){this.getDomRef().classList.add("sapMGTActionButtonPress");this._oMoreIcon._activeButton()};P.prototype._isSmall=function(){return this.getSizeBehavior()===C.Small||window.matchMedia("(max-width: 374px)").matches};P.prototype.exit=function(){if(this._sParentResizeListenerId){d.deregister(this._sResizeListenerId);this._sParentResizeListenerId=null}p.media.detachHandler(this._handleMediaChange,this,x);if(this._$RootNode){this._$RootNode.off(this._getAnimationEvents());this._$RootNode=null}this._clearAnimationUpdateQueue();this._oWarningIcon.destroy();if(this._oImage){this._oImage.destroy()}this._oBusy.destroy();if(this._oMoreIcon){this._oMoreIcon.destroy()}if(this._oRemoveButton){this._oRemoveButton.destroy()}if(this._oNavigateAction){this._oNavigateAction.destroy()}};P.prototype.onBeforeRendering=function(){var e=!!this.getSubheader();if(this.getMode()===S.HeaderMode||this.getMode()===S.IconMode){this._applyHeaderMode(e)}else{this._applyContentMode(e)}var t=this.getTileContent().length;for(var i=0;i<t;i++){this.getTileContent()[i].setProperty("disabled",this.getState()===v.Disabled,true)}this._initScopeContent("sapMGT");this._generateFailedText();this.$().off("mouseenter");this.$().off("mouseleave");if(this._sParentResizeListenerId){d.deregister(this._sResizeListenerId);this._sParentResizeListenerId=null}var o=this.getParent();if(o&&o.isA("sap.f.GridContainer")){this._applyExtraWidth()}if(o&&o.getParent()&&o.getParent().isA("sap.f.GridContainer")&&o.isA("sap.m.SlideTile")){this._applyExtraWidth(o.getParent(),true)}p.media.detachHandler(this._handleMediaChange,this,x);if(this._$RootNode){this._$RootNode.off(this._getAnimationEvents())}if(this.getFrameType()===A.Auto){this.setProperty("frameType",A.OneByOne,true)}if(this.getMode()!==S.LineMode&&(this.getAppShortcut()||this.getSystemInfo())){this._setMaxLines()}if(this._isNavigateActionEnabled()){var s=this.getNavigationButtonText()?this.getNavigationButtonText():this._oRb.getText("ACTION_READ_MORE");this._oNavigateAction.setText(s);this._oNavigateAction.detachPress(this._navigateEventHandler,this)}if(this._isIconMode()){this._validateBackgroundColor()}};P.prototype.onAfterRendering=function(){this._setupResizeClassHandler();this.$().on("mouseenter",this._updateAriaAndTitle.bind(this));this.$().on("mouseleave",this._removeTooltipFromControl.bind(this));var e=this.getMode();var i=this._isScreenLarge();if(e===S.LineMode){var o=this.$().parent();if(i){this._updateHoverStyle(true);if(this.getParent()instanceof t){this._sParentResizeListenerId=d.register(this.getParent(),this._handleResize.bind(this))}else{this._sParentResizeListenerId=d.register(o,this._handleResize.bind(this))}}}if(e===S.LineMode&&this._bUpdateLineTileSiblings){this._updateLineTileSiblings();this._bUpdateLineTileSiblings=false}if(e===S.LineMode){p.media.attachHandler(this._handleMediaChange,this,x)}if(this._isNavigateActionEnabled()){this._oNavigateAction.attachPress(this._navigateEventHandler,this)}if(this._oMoreIcon&&this._oMoreIcon.getDomRef()&&!this._isIconMode()){this._oMoreIcon.getDomRef().firstChild.classList.remove("sapMBtnHoverable");this._oMoreIcon.getDomRef().firstChild.classList.remove("sapMFocusable")}if(this._isIconMode()&&this.getFrameType()===A.TwoByHalf&&this._oMoreIcon.getDomRef()){this._addClassesForButton()}if(this.getFrameType()===A.TwoByOne&&this.getMode()===S.ActionMode&&this.getState()===v.Loaded&&!this.isA("sap.m.ActionTile")){this._applyExtraHeight()}if(this.getTooltip()&&this.getDomRef()){this.getDomRef().setAttribute("aria-describedby",this.getAggregation("_invisibleText").getId())}this.onDragComplete()};P.prototype._applyExtraHeight=function(){var e=this.getDomRef("hdr-text").offsetHeight,t=parseInt(getComputedStyle(this.getDomRef("title")).lineHeight.slice(0,2)),i=Math.ceil(e/t);if(i===1&&!this.getHeaderImage()){this.getDomRef("content").classList.add("sapMGTFtrMarginTop")}else{this.getDomRef("content").classList.remove("sapMGTFtrMarginTop")}};P.prototype._validateBackgroundColor=function(){var e=this.getBackgroundColor();if(I.isValid(e)){this._sBGColor=e}else{var t=f.get({name:e,callback:function(e){this._sBGColor=e?e:L}.bind(this)});if(t){this._sBGColor=t}}};P.prototype._setMaxLines=function(){var e=this.getFrameType(),t=e===A.OneByOne||e===A.TwoByHalf?1:2;this._oAppShortcut.setProperty("maxLines",t,true);this._oSystemInfo.setProperty("maxLines",t,true);if(this.getFrameType()===A.TwoByHalf){var i=this.getAppShortcut().length>11,o=this.getSystemInfo().length>11;if(i&&o||i){this._oAppShortcut.setProperty("maxLines",2,true)}else if(o){this._oSystemInfo.setProperty("maxLines",2,true)}}};P.prototype.onDragComplete=function(){if(this.hasStyleClass("sapMGTPressActive")){this.removeStyleClass("sapMGTPressActive");if(this.$("hover-overlay").length>0){this.$("hover-overlay").removeClass("sapMGTPressActive")}if(this.getMode()===S.LineMode){this.removeStyleClass("sapMGTLineModePress")}}};P.prototype._handleResize=function(){if(this.getMode()===S.LineMode&&this._isScreenLarge()&&this.getParent()){this._queueAnimationEnd()}};P.prototype._setupResizeClassHandler=function(){var e=function(){if(this.getSizeBehavior()===C.Small||window.matchMedia("(max-width: 374px)").matches||this._isSmallStretchTile()){this.$().addClass("sapMTileSmallPhone");if(this._isSmallStretchTile()){this.addStyleClass("sapMGTStretch")}}else{this.$().removeClass("sapMTileSmallPhone");this.removeStyleClass("sapMGTStretch")}}.bind(this);jQuery(window).on("resize",e);e()};P.prototype._isSmallStretchTile=function(){return this.getFrameType()===A.Stretch&&window.matchMedia("(max-width: 600px)").matches};P.prototype._isCompact=function(){return jQuery("body").hasClass("sapUiSizeCompact")||this.$().is(".sapUiSizeCompact")||this.$().closest(".sapUiSizeCompact").length>0};P.prototype._calculateStyleData=function(){this.$("lineBreak").remove();if(!this._isScreenLarge()||!this.getDomRef()||this.$().is(":hidden")){return null}var e=this.$(),t=this.$("endMarker"),i=this.$("startMarker");if(t.length===0||i.length===0){return null}var o=this._getLineCount(),s,n,a=Math.ceil(l._getCSSPixelValue(this,"margin-top")),r,h=this.$().parent().innerWidth(),d=Math.ceil(l._getCSSPixelValue(this,"min-height")),c=l._getCSSPixelValue(this,"line-height"),u=this.$().is(":not(:first-child)")&&o>1,g=jQuery("<span><br></span>"),f=0,_=y.getRTL(),m=t.position();if(u){g.attr("id",this.getId()+"-lineBreak");e.prepend(g);o=this._getLineCount();m=t.position()}var T={rtl:_,lineBreak:u,startOffset:i.offset(),endOffset:t.offset(),availableWidth:h,lines:[]};var v;if(p.browser.msie||p.browser.edge){v=g.find("br").position()}else{v=g.position()}var I=v;if(!(p.browser.mozilla||p.browser.msie||p.browser.edge)&&v.left<m.left){I=m}T.positionLeft=u?v.left:e.position().left;T.positionRight=u?e.width()-I.left:T.availableWidth-e.position().left;if(!u&&o>1){T.positionRight=i.parent().innerWidth()-(i.position().left+i.width())}for(f;f<o;f++){if(u&&f===0){continue}if(o===1){s=_?T.availableWidth-T.positionLeft:T.positionLeft;r=e.width()}else if(f===o-1){s=0;r=_?e.width()-m.left:m.left}else if(u&&f===1){s=0;r=h}else{s=0;r=h}n=f*c+a;T.lines.push({offset:{x:s,y:n},width:r,height:d})}return T};P.prototype._getStyleData=function(){var e=this._calculateStyleData();if(!u(this._oStyleData,e)){delete this._oStyleData;this._oStyleData=e;return true}return false};P.prototype._getAnimationEvents=function(){return"transitionend.sapMGT$id animationend.sapMGT$id".replace(/\$id/g,c(this.getId()))};P.prototype._updateHoverStyle=function(e){if(!this._getStyleData()&&!e){return}this._clearAnimationUpdateQueue();this._cHoverStyleUpdates=-1;this._oAnimationEndCallIds={};if(this._oStyleData&&this._oStyleData.lineBreak&&this.getUIArea()){this._$RootNode=jQuery(this.getUIArea().getRootNode());this._$RootNode.on(this._getAnimationEvents(),this._queueAnimationEnd.bind(this))}this._queueAnimationEnd()};P.prototype._queueAnimationEnd=function(e){if(e){var t=jQuery(e.target);if(t.is(".sapMGT, .sapMGT *")){return false}}if(typeof this._cHoverStyleUpdates!=="number"){this._cHoverStyleUpdates=-1}if(!this._oAnimationEndCallIds){this._oAnimationEndCallIds={}}this._cHoverStyleUpdates++;this._oAnimationEndCallIds[this._cHoverStyleUpdates]=setTimeout(this._handleAnimationEnd.bind(this,this._cHoverStyleUpdates),10)};P.prototype._handleAnimationEnd=function(e){delete this._oAnimationEndCallIds[e];if(this._cHoverStyleUpdates===e){this._getStyleData();l._updateHoverStyle.call(this)}};P.prototype._clearAnimationUpdateQueue=function(){for(var e in this._oAnimationEndCallIds){clearTimeout(this._oAnimationEndCallIds[e]);delete this._oAnimationEndCallIds[e]}};P.prototype._getLineCount=function(){var e=this.getDomRef().getBoundingClientRect(),t=l._getCSSPixelValue(this,"line-height");return Math.round(e.height/t)};P.prototype.getBoundingRects=function(){var e=this.$().offset();return[{offset:{x:e.left,y:e.top},width:this.$().outerWidth(),height:this.$().height()}]};P.prototype._updateLineTileSiblings=function(){var e=this.getParent();if(this.getMode()===S.LineMode&&this._isScreenLarge()&&e){var t=e.indexOfAggregation(this.sParentAggregationName,this);var i=e.getAggregation(this.sParentAggregationName).splice(t+1);for(t=0;t<i.length;t++){var o=i[t];if(o instanceof P&&o.getMode()===S.LineMode){o._updateHoverStyle()}}}};P.prototype.ontouchstart=function(e){if(e&&e.target.id.indexOf("-action-more")===-1&&this.getDomRef()){this.getDomRef().classList.remove("sapMGTActionButtonPress")}this.addStyleClass("sapMGTPressActive");if(this.$("hover-overlay").length>0){this.$("hover-overlay").addClass("sapMGTPressActive")}if(this.getMode()===S.LineMode){this.addStyleClass("sapMGTLineModePress")}};P.prototype.ontouchcancel=function(){this.removeStyleClass("sapMGTPressActive");if(this.$("hover-overlay").length>0){this.$("hover-overlay").removeClass("sapMGTPressActive")}};P.prototype.ontouchend=function(){this.removeStyleClass("sapMGTPressActive");if(this.$("hover-overlay").length>0){this.$("hover-overlay").removeClass("sapMGTPressActive")}if(this.getMode()===S.LineMode){this.removeStyleClass("sapMGTLineModePress")}};P.prototype.ontap=function(e){if(!w(e,this)){var t;if(this._bTilePress&&this.getState()!==v.Disabled){this.$().trigger("focus");t=this._getEventParams(e);if(!(this.isInActionRemoveScope()&&t.action===P._Action.Press)){this.firePress(t)}e.preventDefault()}}};var E=false;P.prototype.onkeydown=function(e){if(!w(e,this)){E=e.keyCode===16||e.keyCode===27?true:false;var t=B[e.keyCode];if(!t){B[e.keyCode]=true;if(B[32]||B[13]){e.preventDefault()}}if(g.events.sapselect.fnCheck(e)&&this.getState()!==v.Disabled){this.addStyleClass("sapMGTPressActive");if(this.$("hover-overlay").length>0){this.$("hover-overlay").addClass("sapMGTPressActive")}e.preventDefault()}}};P.prototype._updateAriaLabel=function(){var e=this._getAriaText(),t=this.$(),i=false;if(t.attr("aria-label")!==e){t.attr("aria-label",e);i=true}return i};P.prototype.onsaptabnext=function(e){if(this._isIconMode()&&this.getFrameType()===A.TwoByHalf&&e&&e.keyCode){if(e.keyCode===9&&e.srcControl.getId()==this._oMoreIcon.getId()){this._oMoreIcon.removeStyleClass("sapMGTVisible")}else if(e.keyCode===9){this._oMoreIcon.addStyleClass("sapMGTVisible")}}};P.prototype.onkeyup=function(e){if(!w(e,this)){var t=B[e.keyCode];if(t){delete B[e.keyCode]}var i,o=false,s=this.getScope(),n=s===T.Actions||s===T.ActionRemove;if(n&&(g.events.sapdelete.fnCheck(e)||g.events.sapbackspace.fnCheck(e))){i={scope:s,action:P._Action.Remove,domRef:this._oRemoveButton.getPopupAnchorDomRef()};o=true}if(B[16]&&e.keyCode!==16&&this.getState()!==v.Disabled){E===false}if((g.events.sapselect.fnCheck(e)||E)&&this.getState()!==v.Disabled){this.removeStyleClass("sapMGTPressActive");if(this.$("hover-overlay").length>0){this.$("hover-overlay").removeClass("sapMGTPressActive")}i=this._getEventParams(e);o=true}if(!E&&o){this.firePress(i);e.preventDefault()}this._updateAriaLabel()}};P.prototype.setProperty=function(e){t.prototype.setProperty.apply(this,arguments);if(this.getMode()===S.LineMode&&P.LINEMODE_SIBLING_PROPERTIES.indexOf(e)!==-1){this._bUpdateLineTileSiblings=true}return this};P.prototype.getHeader=function(){return this._oTitle.getText()};P.prototype.setHeader=function(e){this.setProperty("header",e);this._oTitle.setText(e);return this};P.prototype.setHeaderImage=function(e){var t=!u(this.getHeaderImage(),e);if(t){if(this._oImage){this._oImage.destroy();this._oImage=undefined}if(e){this._oImage=n.createControlByURI({id:this.getId()+"-icon-image",src:e},h);this._oImage.addStyleClass("sapMGTHdrIconImage")}}return this.setProperty("headerImage",e)};P.prototype._applyHeaderMode=function(e){var t=this.getFrameType();if(this._isIconMode()){var i,o;o=t===A.TwoByHalf?1:2;if(t===A.OneByOne){i=e?2:4}else if(t===A.TwoByHalf){i=e?1:2}this._oTitle.setProperty("maxLines",i,true);this._oSubTitle.setProperty("maxLines",o,true)}else if(t===A.TwoByOne&&this.getMode()===S.ActionMode){this._oTitle.setProperty("maxLines",2,true)}else if(t===A.OneByHalf||t===A.TwoByHalf){this._oTitle.setProperty("maxLines",2,true)}else{if(e){this._oTitle.setProperty("maxLines",4,true)}else{this._oTitle.setProperty("maxLines",5,true)}}this._changeTileContentContentVisibility(false)};P.prototype._applyContentMode=function(e){var t=this.getFrameType();var i=this.getTileContent();var o=false;if(t===A.TwoByHalf||t===A.OneByHalf){if(i.length){for(var s=0;s<i.length;s++){var n=i[s].getAggregation("content");if(n!==null){if(t===A.OneByHalf&&n.getMetadata().getName()==="sap.m.ImageContent"){o=true;this._oTitle.setProperty("maxLines",2,true);break}else{this._oTitle.setProperty("maxLines",1,true);break}}this._oTitle.setProperty("maxLines",2,true)}}else{this._oTitle.setProperty("maxLines",2,true)}}else if(t===A.TwoByOne&&this.getMode()===S.ActionMode){if(e){this._oTitle.setProperty("maxLines",1,true)}else{this._oTitle.setProperty("maxLines",2,true)}}else if(e){this._oTitle.setProperty("maxLines",2,true)}else{this._oTitle.setProperty("maxLines",3,true)}this._changeTileContentContentVisibility(true,t,o)};P.prototype._changeTileContentContentVisibility=function(e,t,i){var o;o=this.getTileContent();for(var s=0;s<o.length;s++){if(t==A.OneByHalf&&i){o[s].setRenderContent(false)}else{o[s].setRenderContent(e)}}};P.prototype._getHeaderAriaAndTooltipText=function(){var e="";var t=true;if(this.getHeader()){e+=this.getHeader();t=false}if(this.getSubheader()){e+=(t?"":"\n")+this.getSubheader();t=false}if(this.getImageDescription()){e+=(t?"":"\n")+this.getImageDescription()}return e};P.prototype._getContentAriaAndTooltipText=function(){var e="";var t=true;var i=this.getTileContent();var o=this.getAdditionalTooltip();if(!this._isInActionScope()&&(this.getMode()===S.ContentMode||this.getMode()===S.ArticleMode||this.getMode()===S.ActionMode)){for(var s=0;s<i.length;s++){if(i[s].getVisible()){if(typeof i[s]._getAriaAndTooltipText==="function"){e+=(t?"":"\n")+i[s]._getAriaAndTooltipText()}else if(i[s].getTooltip_AsString()){e+=(t?"":"\n")+i[s].getTooltip_AsString()}t=false}}}if(o){e+=(t?"":"\n")+o}return e};P.prototype._getAriaAndTooltipText=function(){var e=this._getHeaderAriaAndTooltipText()+"\n"+this._getContentAriaAndTooltipText();switch(this.getState()){case v.Disabled:return"";case v.Loading:return e+"\n"+this._sLoading;case v.Failed:return e+"\n"+this._oFailedText.getText();default:if(e.trim().length===0){return""}else{return e}}};P.prototype._getAriaText=function(e){var t=this._getAriaAndTooltipText();var i=this.getAriaLabel();if(!t||this._isTooltipSuppressed()){t=this._getAriaAndTooltipText()}if(this._isInActionScope()&&this.getScope()!==T.ActionMore){t=this._oRb.getText("GENERICTILE_ACTIONS_ARIA_TEXT")+" "+t}if(i){t=i+" "+t}if(!e){t=t.trim();t+="\n"+this._getSizeDescription()}return t.trim()};P.prototype._getSizeDescription=function(){var e="",t=this.getFrameType();if(this.getMode()===S.LineMode){var i=this.getUrl()&&!this._isInActionScope()&&this.getState()!==v.Disabled;var o=this.hasListeners("press");if(i||o){e="GENERIC_TILE_LINK"}else{e="GENERIC_TILE_LINE_SIZE"}}else if(t===A.OneByHalf){e="GENERIC_TILE_FLAT_SIZE"}else if(t===A.TwoByHalf){e="GENERIC_TILE_FLAT_WIDE_SIZE"}else if(t===A.TwoByOne){e="GENERIC_TILE_WIDE_SIZE"}else if(t===A.OneByOne){e="GENERIC_TILE_ROLE_DESCRIPTION"}return this._oRb.getText(e)};P.prototype._getTooltipText=function(){var e=this.getTooltip_Text();if(this._isTooltipSuppressed()===true){e=null}return e};P.prototype._checkFooter=function(e,t){var i=t.getState();var o=this._isInActionScope()||this._bShowActionsView===true;var s=this.getFrameType();var n=e.getAggregation("content");if(this._isIconMode()){e.setRenderFooter(false)}else if(i===v.Failed||o&&i!==v.Disabled){e.setRenderFooter(false)}else if(s===A.TwoByHalf&&(n!==null||this.getSubheader())){e.setRenderFooter(false)}else if(s===A.OneByHalf&&(n!==null&&n.getMetadata().getName()!=="sap.m.ImageContent"||this.getSubheader())){e.setRenderFooter(false)}else{e.setRenderFooter(true);return true}};P.prototype._isInActionScope=function(){return this.getScope()===T.Actions||this.getScope()===T.ActionMore||this.getScope()===T.ActionRemove};P.prototype.isInActionRemoveScope=function(){return this.getScope()===T.ActionRemove};P.prototype._generateFailedText=function(){var e=this.getFailedText();var t=e?e:this._sFailedToLoad;this._oFailedText.setProperty("text",t,true);this._oFailedText.setAggregation("tooltip",t,true)};P.prototype._isTooltipSuppressed=function(){var e=this.getTooltip_Text();if(e&&e.length>0&&e.trim().length===0){return true}else{return false}};P.prototype._isHeaderTextTruncated=function(){var e,t,i,o;if(this.getMode()===S.LineMode){i=this.$("hdr-text");if(i.length>0){o=Math.ceil(i[0].getBoundingClientRect().width);return i[0]&&o<i[0].scrollWidth}else{return false}}else{e=this.getAggregation("_titleText").getDomRef("inner");t=this.getAggregation("_titleText").getClampHeight(e);return t<e.scrollHeight}};P.prototype._isSubheaderTextTruncated=function(){var e;if(this.getMode()===S.LineMode){e=this.$("subHdr-text")}else{e=this.$("subTitle")}if(e.length>0){var t=Math.ceil(e[0].getBoundingClientRect().width);return e[0]&&t<e[0].scrollWidth}else{return false}};P.prototype._setTooltipFromControl=function(){var e=this._getAriaAndTooltipText();if(e&&!this._getTooltipText()&&!this._isTooltipSuppressed()){this.$().attr("title",e.trim());this._bTooltipFromControl=true}};P.prototype._updateAriaAndTitle=function(){var e=this._getAriaAndTooltipText();var t=this._getAriaText();var i=this.$();if(i.attr("title")!==e){i.attr("aria-label",t)}if(this._isInActionScope()){i.find("*:not(.sapMGTRemoveButton,.sapMGTActionMoreButton)").removeAttr("aria-label").removeAttr("title").off("mouseenter")}else{i.find("*").removeAttr("aria-label").removeAttr("title").off("mouseenter")}this._setTooltipFromControl()};P.prototype._removeTooltipFromControl=function(){if(this._bTooltipFromControl){this.$().removeAttr("title");this._bTooltipFromControl=false}};P.prototype._isScreenLarge=function(){return this._getCurrentMediaContainerRange(x).name==="large"};P.prototype._getEventParams=function(e){var t,i=P._Action.Press,o=this.getScope(),s=this.getDomRef();if((o===T.Actions||T.ActionRemove)&&e.target.id.indexOf("-action-remove")>-1){i=P._Action.Remove;s=this._oRemoveButton.getPopupAnchorDomRef()}else if((o===T.Actions||o===T.ActionMore)&&this._isIconMode&&this._isIconMode()&&e.target.id.indexOf("-action-more")>-1){i=P._Action.More;s=this._oMoreIcon.getDomRef()}else if(o===T.Actions||o===T.ActionMore){s=this._oMoreIcon.getDomRef()}t={scope:o,action:i,domRef:s};return t};P.prototype._handleMediaChange=function(){this._bUpdateLineTileSiblings=true;this.invalidate()};P.prototype.setPressEnabled=function(e){this._bTilePress=e;this.setProperty("pressEnabled",e);return this};P.prototype.showActionsView=function(e){if(this._bShowActionsView!==e){this._bShowActionsView=e;this.invalidate()}};P.prototype._generateIconAggregation=function(e){var t="";this._oIcon=n.createControlByURI({size:this.getFrameType()===A.OneByOne?"2rem":"1.25rem",useIconTooltip:false,src:e});if(!this._oIcon){this._oIcon=n.createControlByURI({height:this.getFrameType()===A.OneByOne?"2rem":"1.25rem",width:this.getFrameType()===A.OneByOne?"2rem":"1.25rem",useIconTooltip:false,src:e},h).addStyleClass("sapMPointer").addStyleClass("sapMGTTileIcon")}this._oIcon.addStyleClass("sapMPointer").addStyleClass("sapMGTTileIcon");if(this._oIcon instanceof h){t="_tileIconImage"}else if(this._oIcon instanceof s){t="_tileIcon"}if(t){this.setAggregation(t,this._oIcon)}return t};P.prototype._isIconMode=function(){if(this.getMode()===S.IconMode&&(this.getFrameType()===A.OneByOne||this.getFrameType()===A.TwoByHalf)){if(this.getTileIcon()&&this.getBackgroundColor()){return true}else{if(!this.getIconLoaded()){return true}else{return false}}}else{return false}};P.prototype._isNavigateActionEnabled=function(){return this.getMode()===S.ArticleMode&&this.getUrl()&&this.getEnableNavigationButton()};P.prototype._applyExtraWidth=function(e,t){var i;if(t==true){i=e.getActiveLayoutSettings().getGap()}else{i=this.getParent().getActiveLayoutSettings().getGap()}var o=this.getFrameType()===A.TwoByHalf||this.getFrameType()===A.TwoByOne,s=i==="16px"||i==="1rem";if(s&&o){this.addStyleClass("sapMGTWidthForGridContainer")}else if(!s&&this.hasStyleClass("sapMGTWidthForGridContainer")){this.removeStyleClass("sapMGTWidthForGridContainer")}};P.prototype._isActionMode=function(){return this.getFrameType()===A.TwoByOne&&this.getMode()===S.ActionMode&&this.getActionButtons().length};P.prototype._getNavigateAction=function(){return this._oNavigateAction};P.prototype._navigateEventHandler=function(e){e.preventDefault();var t=e.getSource().getParent().getUrl();R.redirect(t,true)};function w(e,t){var i=false,o=false;if(t._isActionMode()){var s=document.querySelector("#"+t.getId()+"-actionButtons");i=s&&s!==e.target&&s.contains(e.target)}if(t._isNavigateActionEnabled()){var n=document.querySelector("#"+t.getId()+"-navigateActionContainer");o=n&&n!==e.target&&n.contains(e.target)}return i||o}return P});
//# sourceMappingURL=GenericTile.js.map