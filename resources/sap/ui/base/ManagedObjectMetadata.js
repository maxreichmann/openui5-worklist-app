/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./DataType","./Metadata","sap/base/Log","sap/base/assert","sap/base/util/ObjectPath","sap/base/strings/escapeRegExp","sap/base/util/merge","sap/base/util/isPlainObject"],function(t,e,i,r,n,s,o,a){"use strict";var g=function(t,i){e.apply(this,arguments)};g.prototype=Object.create(e.prototype);g.prototype.constructor=g;var u=Object.prototype.hasOwnProperty;function l(t){return t.charAt(0).toUpperCase()+t.slice(1)}var h=/(children|ies|ves|oes|ses|ches|shes|xes|s)$/i;var p={children:-3,ies:"y",ves:"f",oes:-2,ses:-2,ches:-2,shes:-2,xes:-2,s:-1};function f(t){return t.replace(h,function(t,e){var i=p[e.toLowerCase()];return typeof i==="string"?i:e.slice(0,i)})}function c(t,e){return function(){i.warning("Usage of deprecated feature: "+e);return t.apply(this,arguments)}}function m(t,e){var i=null;for(var r in e){if(u.call(e,r)&&typeof t[r]==="undefined"){i=i||{};i[r]=e[r]}}return i}var d={SPECIAL_SETTING:-1,PROPERTY:0,SINGLE_AGGREGATION:1,MULTIPLE_AGGREGATION:2,SINGLE_ASSOCIATION:3,MULTIPLE_ASSOCIATION:4,EVENT:5};g._guessSingularName=f;function A(t,e,i){i=typeof i!=="object"?{type:i}:i;this.name=e;this.type=i.type||"any";this.visibility=i.visibility||"public";this.defaultValue=i.defaultValue;this.appData=m(this,i);this._oParent=t;this._sUID="special:"+e;this._iKind=d.SPECIAL_SETTING}function _(t,e,i){i=typeof i!=="object"?{type:i}:i;this.name=e;this.type=i.type||"string";this.group=i.group||"Misc";this.defaultValue=i.defaultValue!==null?i.defaultValue:null;this.bindable=!!i.bindable;this.deprecated=!!i.deprecated||false;this.visibility=i.visibility||"public";this.byValue=i.byValue===true;this.selector=typeof i.selector==="string"?i.selector:null;this.appData=m(this,i);this._oParent=t;this._sUID=e;this._iKind=d.PROPERTY;var r=l(e);this._sMutator="set"+r;this._sGetter="get"+r;if(this.bindable){this._sBind="bind"+r;this._sUnbind="unbind"+r}else{this._sBind=this._sUnbind=undefined}this._oType=null}_.prototype.generate=function(t){var e=this,i=e.name;t(e._sGetter,function(){return this.getProperty(i)});t(e._sMutator,function(t){this.setProperty(i,t);return this},e);if(e.bindable){t(e._sBind,function(t,e,r){this.bindProperty(i,t,e,r);return this},e);t(e._sUnbind,function(t){this.unbindProperty(i,t);return this})}};_.prototype.getType=function(){if(!this._oType){this._oType=t.getType(this.type)}return this._oType};_.prototype.getDefaultValue=function(){var e=this.defaultValue,i;if(e===null){i=this.getType();if(i instanceof t){e=i.getDefaultValue()}}return e};_.prototype.get=function(t){if(this.visibility!=="public"){return t.getProperty(this.name)}return t[this._sGetter]()};_.prototype.set=function(t,e){if(this.visibility!=="public"){return t.setProperty(this.name,e)}return t[this._sMutator](e)};function y(t,e,i){i=typeof i!=="object"?{type:i}:i;this.name=e;this.type=i.type||"sap.ui.core.Control";this.altTypes=Array.isArray(i.altTypes)?i.altTypes:undefined;this.multiple=typeof i.multiple==="boolean"?i.multiple:true;this.singularName=this.multiple?i.singularName||f(e):undefined;this.bindable=!!i.bindable;this.deprecated=i.deprecated||false;this.visibility=i.visibility||"public";this.selector=i.selector||null;this.forwarding=i.forwarding;this._doesNotRequireFactory=!!i._doesNotRequireFactory;this.appData=m(this,i);this._oParent=t;this._sUID="aggregation:"+e;this._iKind=this.multiple?d.MULTIPLE_AGGREGATION:d.SINGLE_AGGREGATION;this._oForwarder=this.forwarding?new v(this):undefined;var r=l(e);this._sGetter="get"+r;if(this.multiple){var n=l(this.singularName);this._sMutator="add"+n;this._sInsertMutator="insert"+n;this._sRemoveMutator="remove"+n;this._sRemoveAllMutator="removeAll"+r;this._sIndexGetter="indexOf"+n;this._sUpdater="update"+r;this._sRefresher="refresh"+r}else{this._sMutator="set"+r;this._sInsertMutator=this._sRemoveMutator=this._sRemoveAllMutator=this._sIndexGetter=this._sUpdater=this._sRefresher=undefined}this._sDestructor="destroy"+r;if(this.bindable){this._sBind="bind"+r;this._sUnbind="unbind"+r}else{this._sBind=this._sUnbind=undefined}}y.prototype.generate=function(t){var e=this,i=e.name;if(!e.multiple){t(e._sGetter,function(){return this.getAggregation(i)});t(e._sMutator,function(t){this.setAggregation(i,t);return this},e)}else{t(e._sGetter,function(){return this.getAggregation(i,[])});t(e._sMutator,function(t){this.addAggregation(i,t);return this},e);t(e._sInsertMutator,function(t,e){this.insertAggregation(i,t,e);return this},e);t(e._sRemoveMutator,function(t){return this.removeAggregation(i,t)});t(e._sRemoveAllMutator,function(){return this.removeAllAggregation(i)});t(e._sIndexGetter,function(t){return this.indexOfAggregation(i,t)})}t(e._sDestructor,function(){this.destroyAggregation(i);return this});if(e.bindable){t(e._sBind,function(t,e,r,n){this.bindAggregation(i,t,e,r,n);return this},e);t(e._sUnbind,function(t){this.unbindAggregation(i,t);return this})}};y.prototype.getType=function(){if(!this._oType){this._oType=t.getType(this.type)}return this._oType};y.prototype.get=function(t){if(this.visibility!=="public"){return t.getAggregation(this.name,this.multiple?[]:undefined)}return t[this._sGetter]()};y.prototype.set=function(t,e){if(this.visibility!=="public"){return t.setAggregation(this.name,e)}return t[this._sMutator](e)};y.prototype.add=function(t,e){if(this.visibility!=="public"){return t.addAggregation(this.name,e)}return t[this._sMutator](e)};y.prototype.insert=function(t,e,i){if(this.visibility!=="public"){return t.insertAggregation(this.name,e,i)}return t[this._sInsertMutator](e,i)};y.prototype.remove=function(t,e){if(this.visibility!=="public"){return t.removeAggregation(this.name,e)}return t[this._sRemoveMutator](e)};y.prototype.removeAll=function(t){if(this.visibility!=="public"){return t.removeAllAggregation(this.name)}return t[this._sRemoveAllMutator]()};y.prototype.indexOf=function(t,e){if(this.visibility!=="public"){return t.indexOfAggregation(this.name,e)}return t[this._sIndexGetter](e)};y.prototype.destroy=function(t){return t[this._sDestructor]()};y.prototype.update=function(t,e,i){if(t[this._sUpdater]){t[this._sUpdater](e,i)}else{t.updateAggregation(this.name,e,i)}};y.prototype.refresh=function(t,e){if(t[this._sRefresher]){t[this._sRefresher](e)}else{this.update(t,e)}};function v(t){var e=t.forwarding;this.aggregation=t;this.targetAggregationName=e.aggregation;this.forwardBinding=e.forwardBinding;this.targetAggregationInfo=null;if(e.getter){if(typeof e.getter==="function"){this._getTarget=e.getter}else{this._getTarget=function(t){return function(){return this[t]()}}(e.getter)}}else if(e.idSuffix){this._getTarget=function(t){return function(){return sap.ui.getCore().byId(this.getId()+t)}}(e.idSuffix)}else{throw new Error("Either getter or idSuffix must be given for forwarding the aggregation "+t.name+" to the aggregation "+e.aggregation+" in "+t._oParent.getName())}}v.prototype._getTargetAggregationInfo=function(t){var e=this.targetAggregationInfo;if(!e&&t){e=this.targetAggregationInfo=t.getMetadata().getAggregation(this.targetAggregationName);if(!e){throw new Error("Target aggregation "+this.targetAggregationName+" not found on "+t)}if(this.aggregation.multiple&&!e.multiple){throw new Error("Aggregation "+this.aggregation+" (multiple: "+this.aggregation.multiple+") cannot be forwarded to aggregation "+this.targetAggregationName+" (multiple: "+e.multiple+")")}if(!this.aggregation.multiple&&e.multiple&&this.aggregation.forwarding.forwardBinding){throw new Error("Aggregation "+this.aggregation+" (multiple: "+this.aggregation.multiple+") cannot be forwarded to aggregation "+this.targetAggregationName+" (multiple: "+e.multiple+") with 'forwardBinding' set to 'true'")}}return e};v.prototype.getTarget=function(t,e){var i=this._getTarget.call(t);this._getTargetAggregationInfo(i);if(i){t.mForwardedAggregations=t.mForwardedAggregations||{};if(t.mForwardedAggregations[this.aggregation.name]===undefined||e){var r=i.mAggregations[this.targetAggregationInfo.name];if(r&&!e&&!this.aggregation.forwarding.forwardBinding&&!(Array.isArray(r)&&r.length===0)){throw new Error("There is already content in aggregation "+this.targetAggregationInfo.name+" of "+i+" to which forwarding is being set up now.")}else{var n=i.mAggregations[this.targetAggregationInfo.name]||(this.targetAggregationInfo.multiple?[]:null);t.mForwardedAggregations[this.aggregation.name]=i.mAggregations[this.targetAggregationInfo.name]=n}}}return i};v.prototype.get=function(t){var e=this.getTarget(t);if(e){var i=this.targetAggregationInfo.get(e);if(!this.aggregation.multiple&&this.targetAggregationInfo.multiple){i=i[0]}return i}else{return this.aggregation.multiple?[]:null}};v.prototype.indexOf=function(t,e){var i=this.getTarget(t);return this.targetAggregationInfo.indexOf(i,e)};v.prototype.set=function(t,e){var i=this.getTarget(t);t.mForwardedAggregations[this.aggregation.name]=e;if(this.targetAggregationInfo.multiple){var r=this.targetAggregationInfo.get(i);if(r&&r[0]){if(r[0]===e){return t}this.targetAggregationInfo.removeAll(i)}g.addAPIParentInfoBegin(e,t,this.aggregation.name);this.targetAggregationInfo.add(i,e)}else{g.addAPIParentInfoBegin(e,t,this.aggregation.name);this.targetAggregationInfo.set(i,e)}g.addAPIParentInfoEnd(e);return t};v.prototype.add=function(t,e){var i=this.getTarget(t);g.addAPIParentInfoBegin(e,t,this.aggregation.name);this.targetAggregationInfo.add(i,e);g.addAPIParentInfoEnd(e);return t};v.prototype.insert=function(t,e,i){var r=this.getTarget(t);g.addAPIParentInfoBegin(e,t,this.aggregation.name);this.targetAggregationInfo.insert(r,e,i);g.addAPIParentInfoEnd(e);return t};g.addAPIParentInfoBegin=function(t,e,i){if(!t){return}var r={parent:e,aggregationName:i};if(t.aAPIParentInfos){if(t.aAPIParentInfos.forwardingCounter){t.aAPIParentInfos.forwardingCounter++}else{delete t.aAPIParentInfos}}if(!t.aAPIParentInfos){t.aAPIParentInfos=[r];t.aAPIParentInfos.forwardingCounter=1}else{t.aAPIParentInfos.push(r)}};g.addAPIParentInfoEnd=function(t){t&&t.aAPIParentInfos&&t.aAPIParentInfos.forwardingCounter--};v.prototype.remove=function(t,e){var i=this.getTarget(t);var r=this.targetAggregationInfo.remove(i,e);if(r){r.aAPIParentInfos&&r.aAPIParentInfos.pop()}return r};v.prototype.removeAll=function(t){var e=this.getTarget(t);delete t.mForwardedAggregations[this.aggregation.name];var i=this.targetAggregationInfo.removeAll(e);for(var r=0;r<i.length;r++){if(i[r].aAPIParentInfos){i[r].aAPIParentInfos.pop()}}return i};v.prototype.destroy=function(t){var e=this.getTarget(t);delete t.mForwardedAggregations[this.aggregation.name];if(e){this.targetAggregationInfo.destroy(e)}return t};function P(t,e,i){i=typeof i!=="object"?{type:i}:i;this.name=e;this.type=i.type||"sap.ui.core.Control";this.multiple=i.multiple||false;this.singularName=this.multiple?i.singularName||f(e):undefined;this.deprecated=i.deprecated||false;this.visibility=i.visibility||"public";this.appData=m(this,i);this._oParent=t;this._sUID="association:"+e;this._iKind=this.multiple?d.MULTIPLE_ASSOCIATION:d.SINGLE_ASSOCIATION;var r=l(e);this._sGetter="get"+r;if(this.multiple){var n=l(this.singularName);this._sMutator="add"+n;this._sRemoveMutator="remove"+n;this._sRemoveAllMutator="removeAll"+r}else{this._sMutator="set"+r;this._sRemoveMutator=this._sRemoveAllMutator=undefined}}P.prototype.generate=function(t){var e=this,r=e.name;if(!e.multiple){t(e._sGetter,function(){return this.getAssociation(r)});t(e._sMutator,function(t){this.setAssociation(r,t);return this},e)}else{t(e._sGetter,function(){return this.getAssociation(r,[])});t(e._sMutator,function(t){this.addAssociation(r,t);return this},e);t(e._sRemoveMutator,function(t){return this.removeAssociation(r,t)});t(e._sRemoveAllMutator,function(){return this.removeAllAssociation(r)});if(r!==e.singularName){t("removeAll"+l(e.singularName),function(){i.warning("Usage of deprecated method "+e._oParent.getName()+".prototype."+"removeAll"+l(e.singularName)+","+" use method "+e._sRemoveAllMutator+" (plural) instead.");return this[e._sRemoveAllMutator]()})}}};P.prototype.getType=function(){if(!this._oType){this._oType=t.getType(this.type)}return this._oType};P.prototype.get=function(t){if(this.visibility!=="public"){return t.getAssociation(this.name,this.multiple?[]:undefined)}return t[this._sGetter]()};P.prototype.set=function(t,e){if(this.visibility!=="public"){return t.setAssociation(this.name,e)}return t[this._sMutator](e)};P.prototype.add=function(t,e){if(this.visibility!=="public"){return t.addAssociation(this.name,e)}return t[this._sMutator](e)};P.prototype.remove=function(t,e){if(this.visibility!=="public"){return t.removeAssociation(this.name,e)}return t[this._sRemoveMutator](e)};P.prototype.removeAll=function(t){if(this.visibility!=="public"){return t.removeAllAssociation(this.name)}return t[this._sRemoveAllMutator]()};function b(t,e,i){this.name=e;this.allowPreventDefault=i.allowPreventDefault||false;this.deprecated=i.deprecated||false;this.visibility="public";this.allowPreventDefault=!!i.allowPreventDefault;this.enableEventBubbling=!!i.enableEventBubbling;this.appData=m(this,i);this._oParent=t;this._sUID="event:"+e;this._iKind=d.EVENT;var r=l(e);this._sMutator="attach"+r;this._sDetachMutator="detach"+r;this._sTrigger="fire"+r}b.prototype.generate=function(t){var e=this,i=e.name,r=e.allowPreventDefault,n=e.enableEventBubbling;t(e._sMutator,function(t,e,r){this.attachEvent(i,t,e,r);return this},e);t(e._sDetachMutator,function(t,e){this.detachEvent(i,t,e);return this});t(e._sTrigger,function(t){return this.fireEvent(i,t,r,n)})};b.prototype.attach=function(t,e,i,r){return t[this._sMutator](e,i,r)};b.prototype.detach=function(t,e,i){return t[this._sDetachMutator](e,i)};b.prototype.fire=function(t,e){return t[this._sTrigger](e,this.allowPreventDefault,this.enableEventBubbling)};g.prototype.metaFactorySpecialSetting=A;g.prototype.metaFactoryProperty=_;g.prototype.metaFactoryAggregation=y;g.prototype.metaFactoryAssociation=P;g.prototype.metaFactoryEvent=b;g.prototype.applySettings=function(t){var i=this,r=t.metadata;e.prototype.applySettings.call(this,t);function n(t,e){var r={},n;if(t){for(n in t){if(u.call(t,n)){r[n]=new e(i,n,t[n])}}}return r}function s(t,e){var i={},r;for(r in t){if(e===(t[r].visibility==="public")){i[r]=t[r]}}return i}var o=/([a-z][^.]*(?:\.[a-z][^.]*)*)\./;function a(t){var e=o.exec(t);return e&&e[1]||""}this._sLibraryName=r.library||a(this.getName());this._mSpecialSettings=n(r.specialSettings,this.metaFactorySpecialSetting);var g=n(r.properties,this.metaFactoryProperty);this._mProperties=s(g,true);this._mPrivateProperties=s(g,false);var l=n(r.aggregations,this.metaFactoryAggregation);this._mAggregations=s(l,true);this._mPrivateAggregations=s(l,false);this._sDefaultAggregation=r.defaultAggregation||null;this._sDefaultProperty=r.defaultProperty||null;var h=n(r.associations,this.metaFactoryAssociation);this._mAssociations=s(h,true);this._mPrivateAssociations=s(h,false);this._mEvents=n(r.events,this.metaFactoryEvent);this._oDesignTime=t.metadata["designtime"]||t.metadata["designTime"];this._sProvider=t.metadata["provider"];if(t.metadata.__version>1){this.generateAccessors()}};g.prototype.afterApplySettings=function(){e.prototype.afterApplySettings.call(this);var t=this.getParent();if(t instanceof g){this._mAllEvents=Object.assign({},t._mAllEvents,this._mEvents);this._mAllPrivateProperties=Object.assign({},t._mAllPrivateProperties,this._mPrivateProperties);this._mAllProperties=Object.assign({},t._mAllProperties,this._mProperties);this._mAllPrivateAggregations=Object.assign({},t._mAllPrivateAggregations,this._mPrivateAggregations);this._mAllAggregations=Object.assign({},t._mAllAggregations,this._mAggregations);this._mAllPrivateAssociations=Object.assign({},t._mAllPrivateAssociations,this._mPrivateAssociations);this._mAllAssociations=Object.assign({},t._mAllAssociations,this._mAssociations);this._sDefaultAggregation=this._sDefaultAggregation||t._sDefaultAggregation;this._sDefaultProperty=this._sDefaultProperty||t._sDefaultProperty;this._mAllSpecialSettings=Object.assign({},t._mAllSpecialSettings,this._mSpecialSettings);this._sProvider=this._sProvider||t._sProvider}else{this._mAllEvents=this._mEvents;this._mAllPrivateProperties=this._mPrivateProperties;this._mAllProperties=this._mProperties;this._mAllPrivateAggregations=this._mPrivateAggregations;this._mAllAggregations=this._mAggregations;this._mAllPrivateAssociations=this._mPrivateAssociations;this._mAllAssociations=this._mAssociations;this._mAllSpecialSettings=this._mSpecialSettings}};g.Kind=d;g.prototype.getLibraryName=function(){return this._sLibraryName};g.prototype.addProperty=function(t,e){var i=this._mProperties[t]=new _(this,t,e);if(!this._mAllProperties[t]){this._mAllProperties[t]=i}if(this._fnPropertyBagFactory){this._fnPropertyBagFactory.prototype[t]=i.getDefaultValue()}};g.prototype.hasProperty=function(t){return!!this._mAllProperties[t]};g.prototype.getProperty=function(t){var e=this._mAllProperties[t];return typeof e==="object"?e:undefined};g.prototype.getProperties=function(){return this._mProperties};g.prototype.getAllProperties=function(){return this._mAllProperties};g.prototype.getAllPrivateProperties=function(){return this._mAllPrivateProperties};g.prototype.getManagedProperty=function(t){t=t||this._sDefaultProperty;var e=t?this._mAllProperties[t]||this._mAllPrivateProperties[t]:undefined;return typeof e==="object"?e:undefined};g.prototype.getDefaultPropertyName=function(){return this._sDefaultProperty};g.prototype.getDefaultProperty=function(){return this.getProperty(this.getDefaultPropertyName())};g.prototype.hasAggregation=function(t){return!!this._mAllAggregations[t]};g.prototype.getAggregation=function(t){t=t||this._sDefaultAggregation;var e=t?this._mAllAggregations[t]:undefined;return typeof e==="object"?e:undefined};g.prototype.getAggregations=function(){return this._mAggregations};g.prototype.getAllAggregations=function(){return this._mAllAggregations};g.prototype.getAllPrivateAggregations=function(){return this._mAllPrivateAggregations};g.prototype.getManagedAggregation=function(t){t=t||this._sDefaultAggregation;var e=t?this._mAllAggregations[t]||this._mAllPrivateAggregations[t]:undefined;return typeof e==="object"?e:undefined};g.prototype.getDefaultAggregationName=function(){return this._sDefaultAggregation};g.prototype.getDefaultAggregation=function(){return this.getAggregation()};g.prototype.forwardAggregation=function(t,e){var i=this.getAggregation(t);if(!i){throw new Error("aggregation "+t+" does not exist")}if(!e||!e.aggregation||!(e.idSuffix||e.getter)||e.idSuffix&&e.getter){throw new Error("an 'mOptions' object with 'aggregation' property and either 'idSuffix' or 'getter' property (but not both) must be given"+" but does not exist")}if(i._oParent===this){i.forwarding=e;i._oForwarder=new v(i)}else{i=new this.metaFactoryAggregation(this,t,{type:i.type,altTypes:i.altTypes,multiple:i.multiple,singularName:i.singularName,bindable:i.bindable,deprecated:i.deprecated,visibility:i.visibility,selector:i.selector,forwarding:e});this._mAggregations[t]=this._mAllAggregations[t]=i}};g.prototype.getAggregationForwarder=function(t){var e=this._mAllAggregations[t];return e?e._oForwarder:undefined};g.prototype.getDefaultPropertyName=function(){return this._sDefaultProperty};g.prototype.getDefaultProperty=function(){return this.getProperty(this.getDefaultPropertyName())};g.prototype.getPropertyLikeSetting=function(t){var e=this._mAllProperties[t];if(typeof e==="object"){return e}e=this._mAllAggregations[t];return typeof e==="object"&&e.altTypes&&e.altTypes.length>0?e:undefined};g.prototype.hasAssociation=function(t){return!!this._mAllAssociations[t]};g.prototype.getAssociation=function(t){var e=this._mAllAssociations[t];return typeof e==="object"?e:undefined};g.prototype.getAssociations=function(){return this._mAssociations};g.prototype.getAllAssociations=function(){return this._mAllAssociations};g.prototype.getAllPrivateAssociations=function(){return this._mAllPrivateAssociations};g.prototype.getManagedAssociation=function(t){var e=this._mAllAssociations[t]||this._mAllPrivateAssociations[t];return typeof e==="object"?e:undefined};g.prototype.hasEvent=function(t){return!!this._mAllEvents[t]};g.prototype.getEvent=function(t){var e=this._mAllEvents[t];return typeof e==="object"?e:undefined};g.prototype.getEvents=function(){return this._mEvents};g.prototype.getAllEvents=function(){return this._mAllEvents};g.prototype.addSpecialSetting=function(t,e){var i=new A(this,t,e);this._mSpecialSettings[t]=i;if(!this._mAllSpecialSettings[t]){this._mAllSpecialSettings[t]=i}};g.prototype.hasSpecialSetting=function(t){return!!this._mAllSpecialSettings[t]};g.prototype.getPropertyDefaults=function(){var t=this._mDefaults,e;if(t){return t}if(this.getParent()instanceof g){t=Object.assign({},this.getParent().getPropertyDefaults())}else{t={}}for(e in this._mProperties){t[e]=this._mProperties[e].getDefaultValue()}for(e in this._mPrivateProperties){t[e]=this._mPrivateProperties[e].getDefaultValue()}this._mDefaults=t;return t};g.prototype.createPropertyBag=function(){if(!this._fnPropertyBagFactory){this._fnPropertyBagFactory=function t(){};this._fnPropertyBagFactory.prototype=this.getPropertyDefaults()}return new this._fnPropertyBagFactory};g.prototype.getJSONKeys=function(){if(this._mJSONKeys){return this._mJSONKeys}var t={},e={};function i(i){var r,n,s;for(r in i){n=i[r];s=t[r];if(!s||n._iKind<s._iKind){t[r]=e[r]=n}e[n._sUID]=n}}i(this._mAllSpecialSettings);i(this.getAllProperties());i(this.getAllAggregations());i(this.getAllAssociations());i(this.getAllEvents());this._mJSONKeys=e;this._mAllSettings=t;return this._mJSONKeys};g.prototype.getAllSettings=function(){if(!this._mAllSettings){this.getJSONKeys()}return this._mAllSettings};g.prototype.removeUnknownSettings=function(t){r(t==null||typeof t==="object","mSettings must be null or undefined or an object");if(t==null){return t}var e=this.getJSONKeys(),i={},n;for(n in t){if(u.call(e,n)){i[n]=t[n]}}return i};g.prototype.generateAccessors=function(){var t=this.getClass().prototype,e=this.getName()+".",i=this._aPublicMethods,r;function n(r,n,s){if(!t[r]){t[r]=s&&s.deprecated?c(n,e+s.name):n}i.push(r)}for(r in this._mProperties){this._mProperties[r].generate(n)}for(r in this._mAggregations){this._mAggregations[r].generate(n)}for(r in this._mAssociations){this._mAssociations[r].generate(n)}for(r in this._mEvents){this._mEvents[r].generate(n)}};function I(t){var e=t.getLibraryName(),i=sap.ui.getCore().getConfiguration().getPreload(),r=sap.ui.getCore().getLoadedLibraries()[e];if(r&&r.designtime){var n;if(i==="async"||i==="sync"){n=sap.ui.loader._.loadJSResourceAsync(r.designtime.replace(/\.designtime$/,"-preload.designtime.js"),true)}else{n=Promise.resolve()}return new Promise(function(t,e){n.then(function(){sap.ui.require([r.designtime],function(e){t(e)},e)})})}return Promise.resolve(null)}function T(t){if(a(t._oDesignTime)||!t._oDesignTime){return Promise.resolve(t._oDesignTime||{})}return new Promise(function(e,i){var r;if(typeof t._oDesignTime==="string"){r=t._oDesignTime}else{r=t.getName().replace(/\./g,"/")+".designtime"}I(t).then(function(n){sap.ui.require([r],function(i){i.designtimeModule=r;t._oDesignTime=i;i._oLib=n;e(i)},i)})})}var w={};g.setDesignTimeDefaultMapping=function(t){w=t};function D(t){var e=t instanceof n.get("sap.ui.base.ManagedObject")&&typeof t.data==="function"&&t.data("sap-ui-custom-settings")&&t.data("sap-ui-custom-settings")["sap.ui.dt"]&&t.data("sap-ui-custom-settings")["sap.ui.dt"].designtime;if(typeof e==="string"){e=w[e]||e;return new Promise(function(i,r){sap.ui.require([e],function(e){if(typeof e==="function"){i(e(t))}else{i(e)}},r)})}else{return Promise.resolve({})}}function S(t,e){var i=t;if("default"in t){i=o({},t.default,e!=="default"&&t[e]||null)}return i}function E(t,e,i){return o({},S(e,i),{templates:{create:null}},S(t,i),{designtimeModule:t.designtimeModule||undefined,_oLib:t._oLib})}g.prototype.loadDesignTime=function(t,e){e=typeof e==="string"&&e||"default";var i=D(t);if(!this._oDesignTimePromise){var r;var n=this.getParent();if(n instanceof g){r=n.loadDesignTime(null,e)}else{r=Promise.resolve({})}this._oDesignTimePromise=T(this).then(function(t){return r.then(function(i){return E(t,i,e)})})}return Promise.all([i,this._oDesignTimePromise]).then(function(t){var i=t[0],r=t[1];return o({},r,S(i||{},e))})};var M={},N;function O(t){r(!/[0-9]+$/.exec(t),"AutoId Prefixes must not end with numbers");t=(N||(N=sap.ui.getCore().getConfiguration().getUIDPrefix()))+t;var e=M[t]||0;M[t]=e+1;return t+e}g.uid=O;g.prototype.uid=function(){var t=this._sUIDToken;if(typeof t!=="string"){t=this.getName();t=t.slice(t.lastIndexOf(".")+1);t=t.replace(/([a-z])([A-Z])/g,"$1 $2").split(" ").slice(-1)[0];t=this._sUIDToken=t.replace(/([^A-Za-z0-9-_.:])|([0-9]+$)/g,"").toLowerCase()}return O(t)};var R;g.isGeneratedId=function(t){N=N||sap.ui.getCore().getConfiguration().getUIDPrefix();R=R||new RegExp("(^|-{1,3})"+s(N));return R.test(t)};return g},true);
//# sourceMappingURL=ManagedObjectMetadata.js.map