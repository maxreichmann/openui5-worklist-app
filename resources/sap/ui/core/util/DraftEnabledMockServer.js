/*
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/thirdparty/jquery","sap/base/util/isEmptyObject"],function(jQuery,t){"use strict";return{_oDraftMetadata:{},_oConstants:{COM_SAP_VOCABULARIES_COMMON_V1_DRAFTROOT:"com.sap.vocabularies.Common.v1.DraftRoot",COM_SAP_VOCABULARIES_COMMON_V1_DRAFTNODE:"com.sap.vocabularies.Common.v1.DraftNode",COM_SAP_VOCABULARIES_COMMON_V1_SEMANTICKEY:"com.sap.vocabularies.Common.v1.SemanticKey",EMPTY_GUID:"00000000-0000-0000-0000-000000000000",SIBLINGENTITY_NAVIGATION:"SiblingEntity",DRAFT_ADMINISTRATIVE_DATA:"DraftAdministrativeData",DRAFT_ADMINISTRATIVE_DATA_UUID:"DraftAdministrativeDataUUID",ACTIVATION_ACTION:"ActivationAction",EDIT_ACTION:"EditAction",VALIDATE_ACTION:"ValidationFunction",PREPARE_ACTION:"PreparationAction"},handleDraft:function(t,a){var e=sap.ui.require("sap/ui/core/util/MockServer");var r=e._syncAjax;var o=function(t){var a=t.getParameter("oEntity");a.IsActiveEntity=false;a.HasActiveEntity=false;a.HasDraftEntity=false};var i=function(t){var a=t.getParameter("oXhr");var e=r({url:a.url,dataType:"json"}).data.d;for(var o=0;o<this._oDraftMetadata.draftNodes.length;o++){for(var i in this._mEntitySets[this._oDraftMetadata.draftRootName].navprops){if(this._mEntitySets[this._oDraftMetadata.draftRootName].navprops[i].to.entitySet===this._oDraftMetadata.draftNodes[o]){var s=r({url:e[i].__deferred.uri,dataType:"json"});if(s.data&&s.data.d&&s.data.d.results){var n;for(var f=0;f<s.data.d.results.length;f++){n=s.data.d.results[f];r({url:n.__metadata.uri,type:"DELETE"})}}}}}};if(t&&t.EntityContainer){var s=t.EntityContainer[Object.keys(t.EntityContainer)[0]];for(var n in s){var f=s[n];if(f[this._oConstants.COM_SAP_VOCABULARIES_COMMON_V1_DRAFTROOT]){this._oDraftMetadata.draftRootName=n;this._oDraftMetadata.annotations=t;this._oDraftMetadata.mockServerRootUri=a.getRootUri();if(f[this._oConstants.COM_SAP_VOCABULARIES_COMMON_V1_DRAFTROOT][this._oConstants.ACTIVATION_ACTION]){this._oDraftMetadata.draftRootActivationName=f[this._oConstants.COM_SAP_VOCABULARIES_COMMON_V1_DRAFTROOT][this._oConstants.ACTIVATION_ACTION].String}if(this._oDraftMetadata.draftRootActivationName){this._oDraftMetadata.draftRootActivationName=this._oDraftMetadata.draftRootActivationName.substring(this._oDraftMetadata.draftRootActivationName.lastIndexOf("/")+1)}this._oDraftMetadata.draftRootEditName=f[this._oConstants.COM_SAP_VOCABULARIES_COMMON_V1_DRAFTROOT][this._oConstants.EDIT_ACTION];this._oDraftMetadata.draftRootEditName=this._oDraftMetadata.draftRootEditName?this._oDraftMetadata.draftRootEditName.String:undefined;if(this._oDraftMetadata.draftRootEditName){this._oDraftMetadata.draftRootEditName=this._oDraftMetadata.draftRootEditName.substring(this._oDraftMetadata.draftRootEditName.lastIndexOf("/")+1)}this._oDraftMetadata.draftRootValidationName=f[this._oConstants.COM_SAP_VOCABULARIES_COMMON_V1_DRAFTROOT][this._oConstants.VALIDATE_ACTION];this._oDraftMetadata.draftRootValidationName=this._oDraftMetadata.draftRootValidationName?this._oDraftMetadata.draftRootValidationName.String:undefined;if(this._oDraftMetadata.draftRootValidationName){this._oDraftMetadata.draftRootValidationName=this._oDraftMetadata.draftRootValidationName.substring(this._oDraftMetadata.draftRootValidationName.lastIndexOf("/")+1)}this._oDraftMetadata.draftRootPreparationtionName=f[this._oConstants.COM_SAP_VOCABULARIES_COMMON_V1_DRAFTROOT][this._oConstants.PREPARE_ACTION];this._oDraftMetadata.draftRootPreparationtionName=this._oDraftMetadata.draftRootPreparationtionName?this._oDraftMetadata.draftRootPreparationtionName.String:undefined;if(this._oDraftMetadata.draftRootPreparationtionName){this._oDraftMetadata.draftRootPreparationtionName=this._oDraftMetadata.draftRootPreparationtionName.substring(this._oDraftMetadata.draftRootPreparationtionName.lastIndexOf("/")+1)}jQuery.extend(a,this);a.attachAfter(e.HTTPMETHOD.POST,o,this._oDraftMetadata.draftRootName);a.attachBefore(e.HTTPMETHOD.DELETE,i,this._oDraftMetadata.draftRootName);a.attachAfter(e.HTTPMETHOD.GET,this._fnDraftAdministrativeData,this._oDraftMetadata.draftRootName)}}}},_calcSemanticKeys:function(t,a){var e=[];for(var r in this._oDraftMetadata.annotations){if(r.lastIndexOf(a[t].type)>-1){e=this._oDraftMetadata.annotations[r][this._oConstants.COM_SAP_VOCABULARIES_COMMON_V1_SEMANTICKEY]||[];break}}var o=[];var i;for(var s=0;s<e.length;s++){i=e[s];for(var n in i){o.push(i[n])}}return o},_prepareDraftMetadata:function(t){var a=this;var e=sap.ui.require("sap/ui/core/util/MockServer");this._oDraftMetadata.draftNodes=[];this._oDraftMetadata.draftRootKey=t[this._oDraftMetadata.draftRootName].keys.filter(function(e){return a._calcSemanticKeys(a._oDraftMetadata.draftRootName,t).indexOf(e)<0})[0];var r=a._oDraftMetadata.annotations;var o=r.EntityContainer[Object.keys(r.EntityContainer)[0]];for(var i in o){var s=o[i];if(s[a._oConstants.COM_SAP_VOCABULARIES_COMMON_V1_DRAFTNODE]){this._oDraftMetadata.draftNodes.push(i)}}for(var n=0;n<this._oDraftMetadata.draftNodes.length;n++){this.attachAfter(e.HTTPMETHOD.GET,this._fnDraftAdministrativeData,this._oDraftMetadata.draftNodes[n])}},_fnDraftAdministrativeData:function(a){var e={};var r=a.getParameter("oFilteredData");if(!r){e=a.getParameter("oEntry");if(e.IsActiveEntity&&!e.HasDraftEntity){e[this._oConstants.DRAFT_ADMINISTRATIVE_DATA]=null}}else{if(r.results){r=r.results}else{if(t(r)){r=null;return}}for(var o=0;o<r.length;o++){e=r[o];if(e.IsActiveEntity&&!e.HasDraftEntity){e[this._oConstants.DRAFT_ADMINISTRATIVE_DATA]=null}}}},_handleDraftArtifacts:function(t){var a=this;var e=this._oMockdata;var r=e[this._oDraftMetadata.draftRootName];var o=function(t,a){return t.filter(function(t){return a.indexOf(t)<0})[0]};if(r.length===100){for(var i=0;i<r.length;i++){var s=r[i];if(i<25){s.IsActiveEntity=true;s.HasActiveEntity=false;s.HasDraftEntity=false;s[this._oDraftMetadata.draftRootKey]=this._oConstants.EMPTY_GUID;if(s[this._oConstants.DRAFT_ADMINISTRATIVE_DATA_UUID]){s[this._oConstants.DRAFT_ADMINISTRATIVE_DATA_UUID]=null}var n=[];var f=[];for(var d=0;d<this._oDraftMetadata.draftNodes.length;d++){f=this._calcSemanticKeys(this._oDraftMetadata.draftNodes[d],t);n=e[this._oDraftMetadata.draftNodes[d]];var _=t[this._oDraftMetadata.draftRootName];for(var D in _.navprops){var h=_.navprops[D];if(h.to.entitySet===this._oDraftMetadata.draftNodes[d]){var v=h.from.propRef.length;for(var u=0;u<v;u++){n[i][h.to.propRef[u]]=s[h.from.propRef[u]]}}}n[i].IsActiveEntity=true;n[i].HasActiveEntity=false;n[i].HasDraftEntity=false;n[i][this._oDraftMetadata.draftRootKey]=this._oConstants.EMPTY_GUID;if(n[i][this._oConstants.DRAFT_ADMINISTRATIVE_DATA_UUID]){n[i][this._oConstants.DRAFT_ADMINISTRATIVE_DATA_UUID]=null}var M=o(t[this._oDraftMetadata.draftNodes[d]].keys,f);n[i][M]=this._oConstants.EMPTY_GUID}}else if(i<50){s.IsActiveEntity=false;s.HasActiveEntity=false;s.HasDraftEntity=false;n=[];f=[];for(var d=0;d<this._oDraftMetadata.draftNodes.length;d++){f=this._calcSemanticKeys(this._oDraftMetadata.draftNodes[d],t);n=e[this._oDraftMetadata.draftNodes[d]];var _=t[this._oDraftMetadata.draftRootName];for(var D in _.navprops){var h=_.navprops[D];if(h.to.entitySet===this._oDraftMetadata.draftNodes[d]){var v=h.from.propRef.length;for(var u=0;u<v;u++){n[i][h.to.propRef[u]]=s[h.from.propRef[u]]}}}n[i].IsActiveEntity=false;n[i].HasActiveEntity=false;n[i].HasDraftEntity=false;M=o(t[this._oDraftMetadata.draftNodes[d]].keys,f)}}else if(i<75){var A=jQuery.extend(true,{},s);s.IsActiveEntity=true;s.HasActiveEntity=false;s.HasDraftEntity=true;s[this._oDraftMetadata.draftRootKey]=this._oConstants.EMPTY_GUID;n=[];f=[];for(var d=0;d<this._oDraftMetadata.draftNodes.length;d++){f=this._calcSemanticKeys(this._oDraftMetadata.draftNodes[d],t);n=e[this._oDraftMetadata.draftNodes[d]];var _=t[this._oDraftMetadata.draftRootName];for(var D in _.navprops){var h=_.navprops[D];if(h.to.entitySet===this._oDraftMetadata.draftNodes[d]){var v=h.from.propRef.length;for(var u=0;u<v;u++){n[i][h.to.propRef[u]]=s[h.from.propRef[u]]}}}n[i].IsActiveEntity=true;n[i].HasActiveEntity=false;n[i].HasDraftEntity=true;M=o(t[this._oDraftMetadata.draftNodes[d]].keys,f);n[i][M]=this._oConstants.EMPTY_GUID}A.IsActiveEntity=false;A.HasActiveEntity=true;A.HasDraftEntity=false;r[i+25]=A}}}var p=this._getRootUri();jQuery.each(t,function(t,r){jQuery.each(e[t],function(e,o){o.__metadata=o.__metadata||{};o.__metadata.uri=p+t+"("+a._createKeysString(r,o)+")";o.__metadata.type=r.schema+"."+r.type;jQuery.each(r.navprops,function(e){o[e]={__deferred:{uri:p+t+"("+a._createKeysString(r,o)+")/"+e}}})})})},_activate:function(t){var a=sap.ui.require("sap/ui/core/util/MockServer");var e=a._syncAjax;var r;var o=function(t,a){return t.filter(function(t){return a.indexOf(t)<0})[0]};for(var i=0;i<this._oDraftMetadata.draftNodes.length;i++){for(var s in this._mEntitySets[this._oDraftMetadata.draftRootName].navprops){if(this._mEntitySets[this._oDraftMetadata.draftRootName].navprops[s].to.entitySet===this._oDraftMetadata.draftNodes[i]){r=e({url:t[s].__deferred.uri,dataType:"json"});if(r.success&&r.data&&r.data.d&&r.data.d.results){var n;for(var f=0;f<r.data.d.results.length;f++){n=r.data.d.results[f];n.IsActiveEntity=true;n.HasActiveEntity=false;n.HasDraftEntity=false;n[this._oDraftMetadata.draftRootKey]=this._oConstants.EMPTY_GUID;var d=this._calcSemanticKeys(this._oDraftMetadata.draftNodes[i],this._mEntitySets);var _=o(this._mEntitySets[this._oDraftMetadata.draftNodes[i]].keys,d);n[_]=this._oConstants.EMPTY_GUID;e({url:n.__metadata.uri,type:"PATCH",data:JSON.stringify(n)})}}}}}t.IsActiveEntity=true;t.HasActiveEntity=false;t.HasDraftEntity=false;t[this._oDraftMetadata.draftRootKey]=this._oConstants.EMPTY_GUID;e({url:t.__metadata.uri,type:"PATCH",data:JSON.stringify(t)});return t},setRequests:function(a){var e=this;var r=sap.ui.require("sap/ui/core/util/MockServer");var o=r._syncAjax;a.push({method:"POST",path:new RegExp(e._oDraftMetadata.draftRootActivationName),response:function(t){var a=JSON.parse(t.requestBody);var r=[];for(var i in a){r.push(i+" eq "+a[i])}var s=o({url:e._oDraftMetadata.mockServerRootUri+e._oDraftMetadata.draftRootName+"?$filter="+r.join(" and "),dataType:"json"});if(!s.success||!s.data.d.results[0]){t.respond(404)}var n=s.data.d.results[0];if(n.IsActiveEntity){t.respond(400)}if(n.HasActiveEntity){var f=n.SiblingEntity.__deferred.uri;s=o({url:f,dataType:"json"});if(s.success&&s.data&&s.data.d.__metadata){var d=s.data.d;s=o({url:d.__metadata.uri,type:"DELETE"})}}n=e._activate(n);t.respondJSON(200,{},JSON.stringify({d:n}));return true}});if(e._oDraftMetadata.draftRootEditName){a.push({method:"POST",path:new RegExp(e._oDraftMetadata.draftRootEditName+"(\\?(.*))?"),response:function(a,r){var i=[];var s=JSON.parse(a.requestBody);if(s&&!t(s)){for(var n in s){i.push(n+" eq "+s[n])}}else{var f=decodeURIComponent(r).replace("?","&").split("&");for(var d in f){var _=f[d];var D=new RegExp("(.*)=(.*)");var h;if(_){h=D.exec(_);i.push(h[1]+" eq "+h[2])}}}var v=o({url:e._oDraftMetadata.mockServerRootUri+e._oDraftMetadata.draftRootName+"?$filter="+i.join(" and "),dataType:"json"});if(!v.success||!v.data.d.results[0]){a.respond(404)}var u=v.data.d.results[0];if(!u.IsActiveEntity||u.HasDraftEntity){a.respond(400)}var M=jQuery.extend(true,{},u);M.IsActiveEntity=false;M.HasActiveEntity=true;M.HasDraftEntity=false;M[e._oDraftMetadata.draftRootKey]=e._generatePropertyValue(e._oDraftMetadata.draftRootKey,"Guid");var A=e._getRootUri();var p=e._mEntitySets[e._oDraftMetadata.draftRootName];M.__metadata=M.__metadata||{};M.__metadata.uri=A+e._oDraftMetadata.draftRootName+"("+e._createKeysString(p,M)+")";M.__metadata.type=p.schema+"."+p.type;jQuery.each(p.navprops,function(t){M[t]={__deferred:{uri:A+e._oDraftMetadata.draftRootName+"("+e._createKeysString(p,M)+")/"+t}}});e._oMockdata[e._oDraftMetadata.draftRootName].push(M);v=o({url:u.__metadata.uri,type:"PATCH",data:JSON.stringify({HasDraftEntity:true})});a.respondJSON(200,{},JSON.stringify({d:M}));return true}})}if(e._oDraftMetadata.draftRootValidationName){a.push({method:"GET",path:new RegExp(e._oDraftMetadata.draftRootValidationName+"(\\?(.*))?"),response:function(t,a){var o=e._oDraftMetadata.draftRootValidationName;e.fireEvent(r.HTTPMETHOD.GET+o+":before",{oXhr:t,sUrlParams:a});e.fireEvent(r.HTTPMETHOD.GET+":before",{oXhr:t,sUrlParams:a});var i={d:{}};i.d[o]={__metadata:{type:"ValidationResult"},IsValid:true};e.fireEvent(r.HTTPMETHOD.GET+o+":after",{oXhr:t,oResult:i});e.fireEvent(r.HTTPMETHOD.GET+":after",{oXhr:t,oResult:i});t.respondJSON(200,{},JSON.stringify(i));return true}})}if(e._oDraftMetadata.draftRootPreparationtionName){a.push({method:"POST",path:new RegExp(e._oDraftMetadata.draftRootPreparationtionName),response:function(t){e.fireEvent(r.HTTPMETHOD.POST+e._oDraftMetadata.draftRootPreparationtionName+":before",{oXhr:t});e.fireEvent(r.HTTPMETHOD.POST+":before",{oXhr:t});var a=JSON.parse(t.requestBody);var i=[];for(var s in a){i.push(s+" eq "+a[s])}var n=o({url:e._oDraftMetadata.mockServerRootUri+e._oDraftMetadata.draftRootName+"?$filter="+i.join(" and "),dataType:"json"});if(!n.success||!n.data.d.results[0]){t.respond(404)}var f=n.data.d.results[0];e.fireEvent(r.HTTPMETHOD.POST+e._oDraftMetadata.draftRootPreparationtionName+":after",{oXhr:t,oEntry:f});e.fireEvent(r.HTTPMETHOD.POST+":after",{oXhr:t,oEntry:f});t.respondJSON(200,{},JSON.stringify({d:f}));return true}})}r.prototype.setRequests.apply(this,[a])},_generateMockdata:function(t,a){var e=sap.ui.require("sap/ui/core/util/MockServer");e.prototype._generateMockdata.apply(this,[t,a]);this._handleDraftArtifacts(t)},_loadMockdata:function(t,a){var e=sap.ui.require("sap/ui/core/util/MockServer");e.prototype._loadMockdata.apply(this,[t,a]);this._handleDraftArtifacts(t)},_resolveNavigation:function(t,a,e,r){var o=sap.ui.require("sap/ui/core/util/MockServer");var i=o.prototype._resolveNavigation.apply(this,[t,a,e,r]);if(e===this._oConstants.SIBLINGENTITY_NAVIGATION){if(r&&r.IsActiveEntity){i.splice(0,1)}else{i.length>1?i.splice(1,1):i.splice(0,1)}}else if(e===this._oConstants.DRAFT_ADMINISTRATIVE_DATA){if(r){if(r.IsActiveEntity&&!r.HasDraftEntity){i[0]=null}}else{i[0]=null}}return i},_findEntitySets:function(t){var a=sap.ui.require("sap/ui/core/util/MockServer");var e=a.prototype._findEntitySets.apply(this,[t]);this._prepareDraftMetadata(e);return e},getEntitySetData:function(t){var a=sap.ui.require("sap/ui/core/util/MockServer");var e=a.prototype.getEntitySetData.apply(this,[t]);var r=function(){return e};if(t===this._oDraftMetadata.draftRootName){this._fnDraftAdministrativeData({getParameter:r});return e}for(var o=0;o<this._oDraftMetadata.draftNodes.length;o++){if(t===this._oDraftMetadata.draftNodes[o]){this._fnDraftAdministrativeData({getParameter:r});return e}}return e}}},true);
//# sourceMappingURL=DraftEnabledMockServer.js.map