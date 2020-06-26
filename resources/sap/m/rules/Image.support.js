/*!
 * OpenUI5
 * (c) Copyright 2009-2020 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/support/library"],function(e){"use strict";var t=e.Categories,i=e.Severity,n=e.Audiences;var a=[1.5,2],s=3e3;function r(e,t){return new Promise(function(i,n){var a=e.getSrc(),r=e._generateSrcByDensity(a,t),o=document.createElement("IMG"),d=false;o.setAttribute("src",r);o.style.position="absolute";o.style.left="-10000px";o.style.top="-10000px";function l(){c();i(true)}function u(){c();i(false)}function c(){if(o&&o.parentNode!==null){o.parentNode.removeChild(o)}d=true}o.addEventListener("load",l);o.addEventListener("error",u);document.body.appendChild(o);setTimeout(function(){if(!d){n()}},s)})}var o={id:"densityAwareImage",audiences:[n.Control],categories:[t.Usability],enabled:true,async:true,minversion:"1.60",title:"Image: Density awareness disabled",description:"We checked that your application provides high-density version(s) of the listed image(s). "+'However, the high-density version(s) will be ignored, because the "densityAware" property of this image is disabled. '+'Since UI5 1.60, the "densityAware" property is no longer enabled by default. You need to enable it explicitly.',resolution:'Enable the "densityAware" property of this image control',resolutionurls:[{text:"API Refrence for sap.m.Image",href:"https://sapui5.hana.ondemand.com/#/api/sap.m.Image"}],check:function(e,t,n,s){var o=[],d=[],l,u,c;n.getElementsByClassName("sap.m.Image").forEach(function(t){if(!t.getDensityAware()){a.forEach(function(n){l=r(t,n);o.push(l);l.then(function(n){if(!n){return}u=t.getId();if(d.indexOf(u)>-1){return}d.push(u);c=t.getMetadata().getElementName();e.addIssue({severity:i.Low,details:"Image '"+c+"' ("+u+") has 'densityAware' disabled even though high-density version is also available",context:{id:u}})}).catch(function(){})})}});Promise.all(o).then(s)}};return[o]},true);