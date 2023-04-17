/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/Device","sap/ui/core/IconPool"],function(e,t){"use strict";var n={apiVersion:2};n.render=function(e,t){var a=t.getActionBarExpanded(),r=t._isSideContentExpanded();e.openStart("div",t);e.class("sapFSP");t._isSingleItem()&&e.class("sapFSPSingleItem");a&&t.getItems().length!==1&&e.class("sapFSPActionBarExpanded");r&&e.class("sapFSPSideContentExpanded");e.openEnd();n.renderMain(e,t);t.getItems().length&&n.renderSide(e,t);e.close("div")};n.renderItem=function(n,a,r,o,d){var i=a.getSelectedItem(),s=a._isSingleItem(),l=e.system.phone,p=o===null,c=i===r.getId(),S=p?"aria-expanded":"aria-selected",g=p?a._getOverflowItemText():r.getText();n.openStart("li",r);!d&&n.attr("title",g);n.class("sapFSPItem");if(!p&&c||p&&a._bOverflowMenuOpened){n.class("sapFSPSelected");n.attr(S,"true")}else{n.attr(S,"false")}p&&n.class("sapFSPOverflowItem")&&n.attr("aria-haspopup","menu");n.attr("role",p?"button":"option");!p&&n.attr("aria-posinset",o+1);n.openEnd();n.renderControl(t.createControlByURI({src:o===0&&s&&l?"sap-icon://navigation-up-arrow":r.getIcon()}));if(s&&l||!s&&d){n.openStart("span");n.class("sapFSPItemText");n.openEnd();n.text(g);n.close("span")}n.close("li")};n.renderMain=function(e,t){var n=t.getMainContent(),a;e.openStart("div");e.class("sapFSPMain");e.attr("data-sap-ui-fastnavgroup","true");e.openEnd();for(a=0;a<n.length;a++){e.renderControl(n[a])}e.close("div")};n.renderSide=function(t,a){var r=a.getActionBarExpanded()||a._getSideContentExpanded(),o=e.system.phone,d=a._getSidePanelWidth();t.openStart("aside");t.class("sapFSPSide");t.attr("data-sap-ui-fastnavgroup","true");t.attr("role","region");t.attr("aria-label",a._getAriaLabelText());r&&!o&&t.style("width",d);t.openEnd();t.openStart("div");t.class("sapFSPSideInner");r&&!o&&t.style("width",d);t.openEnd();n.renderActionBar(t,a);a.getSelectedItem()&&n.renderSideContent(t,a);t.close("div");t.close("aside")};n.renderSideContent=function(e,t){var a=t._getSelectedItem().getContent(),r=t._isSideContentExpanded(),o;if(r){e.openStart("div");e.class("sapFSPSideContent");e.attr("data-sap-ui-fastnavgroup","true");e.attr("role","region");e.attr("aria-label",t._getSideContentHeaderTitle().getText());e.openEnd();n.renderSideContentHeader(e,t);e.openStart("div");e.class("sapFSPSideContentInner");e.attr("aria-labelledby",t.getId()+"-header");e.openEnd();for(o=0;o<a.length;o++){e.renderControl(a[o])}e.close("div");e.close("div")}};n.renderSideContentHeader=function(e,t){e.openStart("div",t.getId()+"-header");e.class("sapFSPSideContentHeader");e.openEnd();e.renderControl(t._getSideContentHeaderIcon());e.renderControl(t._getSideContentHeaderTitle());e.renderControl(t._getSideContentHeaderCloseBtn());e.close("div")};n.renderActionBar=function(t,a){var r=a.getItems(),o=a.getActionBarExpanded(),d=r.length===1,i=e.system.phone,s=a.getAggregation("_arrowButton"),l;if(!i){d&&s.setTooltip(a.getItems()[0].getText());t.renderControl(s)}if(r.length){t.openStart("div");t.class("sapFSPActionBarWrapper");o&&t.class("sapFSPExpanded");t.attr("role","toolbar");t.openEnd();t.openStart("ul",a.getId()+"-ActionBar");t.class("sapFSPActionBar");r.length<4&&t.class("sapFSPCenteredItems");t.attr("aria-multiselectable","false");t.attr("aria-label","Actions");t.attr("role","listbox");t.openEnd();if(i||r.length>1){for(l=0;l<r.length;l++){n.renderItem(t,a,r[l],l,o)}if(!i){n.renderItem(t,a,a.getAggregation("_overflowItem"),null,o)}}t.close("ul");t.close("div")}};return n});
//# sourceMappingURL=SidePanelRenderer.js.map