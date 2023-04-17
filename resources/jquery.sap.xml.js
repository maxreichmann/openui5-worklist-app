/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["jquery.sap.global","sap/ui/util/XMLHelper"],function(jQuery,e){"use strict";jQuery.sap.parseXML=e.parse;jQuery.sap.serializeXML=function(r){var a="";if(window.ActiveXObject){a=r.xml;if(a){return a}}if(window.XMLSerializer){return e.serialize(r)}return a};jQuery.sap.isEqualNode=function(e,r){if(e===r){return true}if(!e||!r){return false}if(e.isEqualNode){return e.isEqualNode(r)}if(e.nodeType!=r.nodeType){return false}if(e.nodeValue!=r.nodeValue){return false}if(e.baseName!=r.baseName){return false}if(e.nodeName!=r.nodeName){return false}if(e.nameSpaceURI!=r.nameSpaceURI){return false}if(e.prefix!=r.prefix){return false}if(e.nodeType!=1){return true}if(e.attributes.length!=r.attributes.length){return false}for(var a=0;a<e.attributes.length;a++){if(!jQuery.sap.isEqualNode(e.attributes[a],r.attributes[a])){return false}}if(e.childNodes.length!=r.childNodes.length){return false}for(var a=0;a<e.childNodes.length;a++){if(!jQuery.sap.isEqualNode(e.childNodes[a],r.childNodes[a])){return false}}return true};jQuery.sap.getParseError=e.getParseError;return jQuery});
//# sourceMappingURL=jquery.sap.xml.js.map