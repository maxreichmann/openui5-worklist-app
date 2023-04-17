/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["../library","sap/ui/Device","sap/ui/core/Element","../UIArea","sap/ui/thirdparty/jquery","sap/ui/core/Configuration"],function(t,e,r,n,jQuery,i){"use strict";var o=t.dnd.RelativeDropPosition;var a={},f=null,g=null,s=null,u=[],l=[],d=null,c,p,D,h,v={},m;function w(t,e){if(!t){return}if(t.addStyleClass){t.addStyleClass(e)}else{t.$().addClass(e)}}function C(t,e){if(!t){return}if(t.removeStyleClass){t.removeStyleClass(e)}else{t.$().removeClass(e)}}function b(t,e){var n=r.closestTo(t.target,true);if(!n){return}var i=jQuery.Event(null,t);i.type=e;n.getUIArea()._handleEvent(i)}function E(t){return!t.disabled&&/^(input|textarea)$/.test(t.localName)}function y(t,e){if(!t||!t.getDragGhost){return}var r=t.getDragGhost();if(!r){return}if(!p){p=jQuery('<div class="sapUiDnDGhostContainer"></div>');jQuery(document.body).append(p)}p.append(r);window.setTimeout(function(){p.empty()},0);var n=e.originalEvent;n.dataTransfer.setDragImage(r,n.offsetX,n.offsetY)}function S(t){var e={},r,n=t.originalEvent.dataTransfer,i=function(t,e){n.setData(t,e)};return{setData:function(t,r){r=""+r;e[t]=r;i(t,r)},getData:function(t){return e[t]},setTextData:function(t){t=""+t;e["text/plain"]=t;e["text"]=t;i("text/plain",t);i("text",t)},getTextData:function(){return e["text/plain"]},setComplexData:function(t,r){e[t]=r},getComplexData:function(t){return e[t]},getIndicator:function(){return c&&c[0]},setIndicatorConfig:function(t){r=t},getIndicatorConfig:function(t){return r},getDragControl:function(){return f},getDropControl:function(){return s},setDropControl:function(t){s=t},getDropInfo:function(){return l[0]||null},getDropPosition:function(){return D}}}function T(t){f=g=s=d=null;D="";u=[];l=[]}function O(){if(c){return c}c=jQuery("<div class='sapUiDnDIndicator'></div>");jQuery(sap.ui.getCore().getStaticAreaRef()).append(c);return c}function A(){if(c){c.removeAttr("style");c.hide();v={}}}function x(t,e,r,n){if(!e){return}var a=t.dragSession&&t.dragSession.getIndicatorConfig(),f=e.getBoundingClientRect(),g=window.pageYOffset,s=window.pageXOffset,u=O(),l,d={},c={top:f.top+g,bottom:f.bottom+g,left:f.left+s,right:f.right+s,width:f.width,height:f.height};if(!r||r=="On"){l=o.On;n=""}else if(n=="Horizontal"){var p=t.pageX-c.left;d.height=c.height;d.top=c.top;if(r=="Between"){d.width="";if(p<c.width*.5){l=o.Before;d.left=c.left}else{l=o.After;d.left=c.right}}else if(r=="OnOrBetween"){if(p<c.width*.25){l=o.Before;d.left=c.left;d.width=""}else if(p>c.width*.75){l=o.After;d.left=c.right;d.width=""}else{l=o.On}}if(l!=o.On&&i.getRTL()){l=l==o.After?o.Before:o.After}}else{var D=t.pageY-c.top;d.width=c.width;d.left=c.left;if(r=="Between"){d.height="";if(D<c.height*.5){l=o.Before;d.top=c.top}else{l=o.After;d.top=c.bottom}}else if(r=="OnOrBetween"){if(D<c.height*.25){l=o.Before;d.top=c.top;d.height=""}else if(D>c.height*.75){l=o.After;d.top=c.bottom;d.height=""}else{l=o.On}}}if(a&&a.display=="none"){return l}if(l==o.On){d.top=c.top;d.left=c.left;d.width=c.width;d.height=c.height;r=l}else{r="Between"}if(v.top!=d.top||v.left!=d.left||v.width!=d.width||v.height!=d.height){u.attr("data-drop-layout",n);u.attr("data-drop-position",r);u.css(Object.assign(d,a));u.show();v=d}return l}function I(t){var e=t.getParent(),r=t.getDragDropConfig?t.getDragDropConfig():[],n=e&&e.getDragDropConfig?e.getDragDropConfig():[];return r.concat(n)}function B(t){var e=I(t);return e.filter(function(e){return e.isDraggable(t)})}function N(t,e,r){var n=I(t);e=e||[];return n.filter(function(t){return!t.isA("sap.ui.core.dnd.IDragInfo")}).concat(e).filter(function(n){if(!n.isDroppable(t,r)){return false}var i=n.getGroupName();if(!i){return true}return e.some(function(t){return t.getGroupName()==i})})}function U(t,e){t.preventDefault();if(f){var r=e.getDropEffect().toLowerCase();t.originalEvent.dataTransfer.dropEffect=r}}function k(t,e,r){var n=e.getTargetAggregation();if(!n){return x(t,r.getDomRef())}var i;if(t.getMark("DragWithin")==n){i=r.getDomRefForSetting(n)}i=i||r.getDomRef();return x(t,i,e.getDropPosition(true),e.getDropLayout(true))}a.preprocessEvent=function(t){if(d&&t.type.indexOf("dr")==0){t.dragSession=d}var e="onbefore"+t.type;if(a[e]){a[e](t)}};a.postprocessEvent=function(t){var e="onafter"+t.type;if(a[e]){a[e](t)}};a.onbeforemousedown=function(t){if(e.browser.firefox&&E(t.target)){m=jQuery(t.target).closest("[data-sap-ui-draggable=true]").prop("draggable",false)[0]}};a.onbeforemouseup=function(t){if(m){m.draggable=true;m=null}};a.onbeforedragstart=function(t){if(!t.target.draggable){return}if(E(document.activeElement)){t.target.getAttribute("data-sap-ui-draggable")&&t.preventDefault();return}f=r.closestTo(t.target,true);if(!f){return}u=B(f);if(!u.length){return}if(!e.system.desktop&&!t.originalEvent.dataTransfer.getData("text")){t.originalEvent.dataTransfer.setData("text"," ")}t.dragSession=d=S(t)};a.onafterdragstart=function(t){if(!u.length||t.isDefaultPrevented()){T();return}u=t.isMarked("NonDraggable")?[]:u.filter(function(e){return e.fireDragStart(t)});if(!u.length){t.preventDefault();T();return}y(f,t);w(f,"sapUiDnDDragging");if(jQuery(t.target).closest(".sapUiScrollDelegate")[0]){jQuery("html").addClass("sapUiDnDNoScrolling")}};a.onbeforedragenter=function(t){var e=r.closestTo(t.target,true);if(e&&g===e){t.setMark("DragWithin","SameControl")}else{h=Date.now();g=e}var n=[],i;s=e;for(var o=0;o<20&&s;o++){n=N(s,u,t);if(n.length){break}i=s.getDomRef();i=i&&i.parentElement;s=r.closestTo(i,true)}if(t.getMark("DragWithin")!="SameControl"){l=n;if(d){d.setIndicatorConfig(null)}}if(!l.length){s=null}else if(!d){t.dragSession=d=S(t)}};a.onafterdragenter=function(t){if(!s||t.isMarked("NonDroppable")){l=[]}else if(t.getMark("DragWithin")!="SameControl"){l=l.filter(function(e){return e.fireDragEnter(t)})}var e=l[0];if(!e||e.getDropEffect()=="None"){A();D=""}else{U(t,e);D=k(t,e,s)}};a.onbeforedragover=function(t){var e=Date.now();if(e-h>=1e3){b(t,"longdragover");h=e}};a.onafterdragover=function(t){var e=l[0];if(!e||e.getDropEffect()=="None"){return}l.forEach(function(e){e.fireDragOver(t)});U(t,e);if(e&&e.getDropPosition(true)=="On"){return}D=k(t,e,s)};a.onbeforedrop=function(t){if(l.length){t.preventDefault()}};a.onafterdrop=function(t){l.forEach(function(e){e.fireDrop(t)});this.iDragEndTimer=window.requestAnimationFrame(this.onafterdragend.bind(this,t))};a.onafterdragend=function(t){this.iDragEndTimer=window.cancelAnimationFrame(this.iDragEndTimer);u.forEach(function(e){e.fireDragEnd(t)});C(f,"sapUiDnDDragging");jQuery("html").removeClass("sapUiDnDNoScrolling");A();T()};n.addEventPreprocessor(a.preprocessEvent);n.addEventPostprocessor(a.postprocessEvent);return a},true);
//# sourceMappingURL=DragAndDrop.js.map