/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/m/InstanceManager","sap/f/FlexibleColumnLayout","sap/ui/base/Object","sap/ui/core/routing/History","sap/base/Log"],function(e,t,i,o,n){"use strict";var r=i.extend("sap.f.routing.TargetHandler",{constructor:function(e){this._aQueue=[];this._oNavigationOrderPromise=Promise.resolve();if(e===undefined){this._bCloseDialogs=true}else{this._bCloseDialogs=!!e}}});r.prototype.setCloseDialogs=function(e){this._bCloseDialogs=!!e;return this};r.prototype.getCloseDialogs=function(){return this._bCloseDialogs};r.prototype.addNavigation=function(e){this._aQueue.push(e)};r.prototype.navigate=function(e){var t=this._createResultingNavigations(e.navigationIdentifier),i=false,o=this._getDirection(e),n;while(t.length){n=this._applyNavigationResult(t.shift().oParams,o);i=i||n}if(i||o){this._closeDialogs()}};r.prototype._chainNavigation=function(e,t){var i=this._oNavigationOrderPromise.then(e);this._oNavigationOrderPromise=i.catch(function(e){n.error("The following error occurred while displaying routing target with name '"+t+"': "+e)});return i};r.prototype._getDirection=function(e){var t=e.level,i=o.getInstance(),n=false;if(e.direction==="Backwards"){n=true}else if(isNaN(t)||isNaN(this._iCurrentLevel)||t===this._iCurrentLevel){if(e.askHistory){n=i.getDirection()==="Backwards"}}else{n=t<this._iCurrentLevel}this._iCurrentLevel=t;return n};r.prototype._createResultingNavigations=function(e){var t,i,o,n,r=[],s;while(this._aQueue.length){i=this._aQueue.shift();o=i.targetControl;n={oContainer:o,oParams:i,placeholderConfig:i.placeholderConfig};if(!a(o)){continue}for(t=0;t<r.length;t++){s=r[t];if(s.oContainer!==o){continue}}r.push(n)}return r};r.prototype._applyNavigationResult=function(e,i){var o=e.targetControl,r=e.eventData,a=e.placeholderShown?"show":e.transition||"",s=e.transitionParameters,l=e.view.getId(),u,g=o instanceof t,c=false,h=e.placeholderConfig;if(g){u=[o.getCurrentBeginColumnPage(),o.getCurrentMidColumnPage(),o.getCurrentEndColumnPage()];c=u.some(function(e){return e&&e.getId()===l})}if(c){if(h.autoClose){o.hidePlaceholder(h)}n.info("navigation to view with id: "+l+" is skipped since it already is displayed by its targetControl","sap.f.routing.TargetHandler");return false}n.info("navigation to view with id: "+l+" the targetControl is "+o.getId()+" backwards is "+i);if(i){o._safeBackToPage(l,a,r,s)}else{o.to(l,a,r,s)}if(h.autoClose){o.hidePlaceholder(h)}return true};r.prototype._closeDialogs=function(){if(!this._bCloseDialogs){return}if(e.hasOpenPopover()){e.closeAllPopovers()}if(e.hasOpenDialog()){e.closeAllDialogs()}if(e.hasOpenLightBox()){e.closeAllLightBoxes()}};function a(e){return e&&e.isA(["sap.m.NavContainer","sap.m.SplitContainer","sap.f.FlexibleColumnLayout"])}r.prototype.showPlaceholder=function(e){var t=e.container,i=true,o;if(e.object&&!(e.object instanceof Promise)){o=e.object}if(e.container&&typeof e.container.needPlaceholder==="function"){i=e.container.needPlaceholder(e.aggregation,o)}if(i){return t.showPlaceholder(e)}else{return Promise.resolve()}};return r});
//# sourceMappingURL=TargetHandler.js.map