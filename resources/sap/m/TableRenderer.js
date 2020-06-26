/*!
 * OpenUI5
 * (c) Copyright 2009-2020 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/Renderer","sap/ui/core/Core","./library","./ListBaseRenderer","./ColumnListItemRenderer"],function(e,t,a,s,r){"use strict";var n=a.ListKeyboardMode;var l=e.extend(s);l.apiVersion=2;var i=t.getConfiguration().getRTL();l.columnAlign={left:i?"flex-end":"flex-start",center:"center",right:i?"flex-start":"flex-end"};l.renderColumns=function(e,t,a){var n=0,i=0,o=false,d=false,c=t.getMode(),u=s.ModeOrder[c],p="sapMListTbl",g=t.getId("tbl"),f=a=="Head"?"th":"td",C="t"+a.toLowerCase(),b=t.getColumns(),h,L=function(t,a,s){e.openStart(f,a&&g+a);if(f==="th"){e.class("sapMTableTH");e.attr("role",s?"presentation":"columnheader")}else if(s){e.attr("role","presentation")}s&&e.attr("aria-hidden","true");e.class(p+t);e.openEnd();e.close(f);n++};if(a=="Head"){var H=b.reduce(function(e,t,a){t.setIndex(-1);t.setInitialOrder(a);t.setForcedColumn(false);return t.getCalculatedMinScreenWidth()<e.getCalculatedMinScreenWidth()?t:e},b[0]);var M=b.filter(function(e){return e.getVisible()&&!e.isPopin()&&!e.isHidden()}).length;if(!M&&H){H.setForcedColumn(true);M=1}h=b.every(function(e){return!e.getHeader()||!e.getHeader().getVisible()||!e.getVisible()||e.isPopin()||e.isHidden()})}e.openStart(C).openEnd();e.openStart("tr",t.addNavSection(g+a+"er"));e.attr("tabindex",-1);if(h){e.class("sapMListTblHeaderNone")}else{e.class("sapMListTblRow").class("sapMLIBFocusable").class("sapMListTbl"+a+"er");r.addLegacyOutlineClass.call(r,e)}e.openEnd();L("HighlightCol",a+"Highlight",true);if(u==-1){if(c=="MultiSelect"&&a=="Head"&&!h){e.openStart("th");e.class("sapMTableTH");e.attr("aria-hidden","true");e.class(p+"SelCol");e.attr("role","presentation");e.openEnd();e.renderControl(t._getSelectAllCheckbox());e.close("th");n++}else{L("SelCol","",true)}}t.getColumns(true).forEach(function(s,r){if(!s.getVisible()){return}if(s.isPopin()){o=true;return}var c=s.isHidden();if(c){i++}var u=s["get"+a+"er"](),g=M==1?"":s.getWidth(),C=s.getStyleClass(true),b=s.getCssAlign();if(a=="Head"){e.openStart(f,s);e.class("sapMTableTH");e.attr("role","columnheader");var h=s.getSortIndicator().toLowerCase();h!=="none"&&e.attr("aria-sort",h)}else{e.openStart(f)}C&&e.class(C);e.class(p+"Cell");e.class(p+a+"erCell");e.attr("data-sap-width",s.getWidth());e.style("width",g);if(b&&a!=="Head"){e.style("text-align",b)}if(c){e.style("display","none");e.attr("aria-hidden","true")}e.openEnd();if(u){if(a==="Head"){e.openStart("div");e.class("sapMColumnHeader");if(t.bActiveHeaders){e.attr("tabindex",0);e.attr("role","button");e.attr("aria-haspopup","dialog");e.class("sapMColumnHeaderActive")}if(b){e.style("justify-content",l.columnAlign[b]);e.style("text-align",b)}e.openEnd();e.renderControl(u.addStyleClass("sapMColumnHeaderContent"));e.close("div")}else{e.renderControl(u)}}if(a=="Head"&&!d){d=!!s.getFooter()}e.close(f);s.setIndex(n++)});L("NavCol",a+"Nav",!t._iItemNeedsColumn);if(u==1){L("SelCol","",true)}L("NavigatedCol",a+"Navigated",true);e.close("tr");e.close(C);if(a==="Head"){t._bPopinChanged=t._hasPopin!==o||t._iHiddenPopinColumns!==t._getHiddenInPopin().length||o;t._hasPopin=o;t._colCount=n-i;t._hasFooter=d;t._headerHidden=h}};l.renderContainerAttributes=function(e,t){e.attr("role","application");e.class("sapMListTblCnt");e.accessibilityState(t,this.getAccessibilityState(t))};l.renderListStartAttributes=function(e,t){e.openStart("table",t.getId("listUl"));e.class("sapMListTbl");if(t.getFixedLayout()===false){e.style("table-layout","auto")}if(t._iItemNeedsColumn){e.class("sapMListTblHasNav")}};l.getAriaRole=function(e){return""};l.getAriaLabelledBy=function(e){var t=s.getAriaLabelledBy.call(this,e);var a=this.getAriaAnnouncement("TABLE_ROLE_DESCRIPTION");if(t&&a){return t+" "+a}return a||t};l.renderListHeadAttributes=function(e,t){this.renderColumns(e,t,"Head");e.openStart("tbody",t.addNavSection(t.getId("tblBody")));e.class("sapMListItems");e.class("sapMTableTBody");if(t.getAlternateRowColors()){e.class(t._getAlternateRowColorsClass())}if(t.hasPopin()){e.class("sapMListTblHasPopin")}e.openEnd()};l.renderListEndAttributes=function(e,t){e.close("tbody");t._hasFooter&&this.renderColumns(e,t,"Foot");e.close("table")};l.renderNoData=function(e,a){e.openStart("tr",a.getId("nodata"));e.attr("tabindex",a.getKeyboardMode()==n.Navigation?-1:0);e.class("sapMLIB").class("sapMListTblRow").class("sapMLIBTypeInactive");r.addFocusableClasses.call(r,e);if(!a._headerHidden||!a.getHeaderText()&&!a.getHeaderToolbar()){e.class("sapMLIBShowSeparator")}e.openEnd();e.openStart("td",a.getId("nodata-text"));e.attr("colspan",a.getColCount());e.class("sapMListTblCell").class("sapMListTblCellNoData");e.openEnd();if(!a.shouldRenderItems()){e.text(t.getLibraryResourceBundle("sap.m").getText("TABLE_NO_COLUMNS"))}else{e.text(a.getNoDataText(true))}e.close("td");e.close("tr")};return l},true);