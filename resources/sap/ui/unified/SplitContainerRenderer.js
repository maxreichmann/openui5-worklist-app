/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/library","sap/ui/core/Configuration"],function(t,e){"use strict";var n=t.Orientation;var i={};i.render=function(t,i){var a=i.getId();var r=i.getOrientation()==n.Vertical;t.write("<div");t.writeControlData(i);t.addClass("sapUiUfdSpltCont");t.addClass("sapUiUfdSpltCont"+(r?"V":"H"));if(e.getAnimation()){t.addClass("sapUiUfdSpltContAnim")}if(!i.getShowSecondaryContent()){t.addClass("sapUiUfdSpltContPaneHidden")}t.writeClasses();t.write(">");var o=a+"-canvas";t.write("<section id='",o,"' class='sapUiUfdSpltContCanvas'>");this.renderContent(t,o,i.getContent(),i._bRootContent);t.write("</section>");var d=a+"-pane";var s=i.getShowSecondaryContent()?i.getSecondaryContentSize():"0";t.write("<aside id='",d);t.write("'");t.addStyle("width",s);t.writeStyles();t.addClass("sapUiUfdSpltContPane");if(!i.getShowSecondaryContent()){t.addClass("sapUiUfdSplitContSecondClosed")}t.writeClasses();t.write(">");this.renderContent(t,d,i.getSecondaryContent(),i._bRootContent);t.write("</aside>");t.write("</div>")};i.renderContent=function(t,e,n,i){t.write("<div id='",e,"cntnt' class='sapUiUfdSpltContCntnt'");if(i){t.writeAttribute("data-sap-ui-root-content","true")}t.write(">");for(var a=0;a<n.length;a++){t.renderControl(n[a])}t.write("</div>")};return i},true);
//# sourceMappingURL=SplitContainerRenderer.js.map