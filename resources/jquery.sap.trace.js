/*!
 * OpenUI5
 * (c) Copyright 2009-2020 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["jquery.sap.global","sap/ui/thirdparty/URI","sap/ui/Device","sap/ui/performance/trace/Passport","sap/ui/performance/trace/Interaction","sap/ui/performance/trace/FESR","sap/base/Log","sap/ui/Global"],function(t,e,a,n,i,r,s){"use strict";function o(){if(!(window.performance&&window.performance.getEntries)){s.warning("Interaction tracking is not supported on browsers with insufficient performance API")}}t.sap.interaction={};t.sap.interaction.setActive=function(){o();i.setActive.apply(this,arguments)};t.sap.interaction.getActive=i.getActive;t.sap.interaction.notifyStepStart=i.notifyStepStart;t.sap.interaction.notifyStepEnd=i.notifyStepEnd;t.sap.interaction.notifyEventStart=i.notifyEventStart;t.sap.interaction.notifyScrollEvent=i.notifyScrollEvent;t.sap.interaction.notifyEventEnd=i.notifyEventEnd;t.sap.interaction.setStepComponent=i.setStepComponent;t.sap.fesr={};t.sap.fesr.setActive=function(){o();r.setActive.apply(this,arguments)};t.sap.fesr.getActive=r.getActive;t.sap.fesr.getCurrentTransactionId=n.getTransactionId;t.sap.fesr.getRootId=n.getRootId;t.sap.fesr.addBusyDuration=i.addBusyDuration;t.sap.passport={};t.sap.passport.setActive=n.setActive;t.sap.passport.traceFlags=n.traceFlags;function p(){var t=!!document.querySelector("meta[name=sap-ui-fesr][content=true]"),e=window.location.search.match(/[\?|&]sap-ui-(?:xx-)?fesr=(true|x|X|false)&?/);if(e){t=e[1]&&e[1]!="false"}return t}t.sap.interaction.notifyStepStart(null,true);r.setActive(p());if(/sap-ui-xx-e2e-trace=(true|x|X)/.test(location.search)){sap.ui.requireSync("sap/ui/core/support/trace/E2eTraceLib")}return t});