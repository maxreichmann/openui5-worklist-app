/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/Control","sap/ui/core/IconPool","sap/ui/core/message/MessageMixin","sap/ui/core/format/NumberFormat","sap/ui/model/ValidateException","sap/ui/Device","sap/ui/core/library","sap/m/library","./NumericInput","./StepInputRenderer","sap/ui/events/KeyCodes","sap/base/Log"],function(e,t,i,n,s,a,r,u,o,l,h,p){"use strict";var g=r.TextAlign;var _=r.ValueState;var f=u.StepInputValidationMode;var d=u.StepInputStepModeType;var c=e.extend("sap.m.StepInput",{metadata:{interfaces:["sap.ui.core.IFormContent"],library:"sap.m",designtime:"sap/m/designtime/StepInput.designtime",properties:{min:{type:"float",group:"Data"},max:{type:"float",group:"Data"},step:{type:"float",group:"Data",defaultValue:1},stepMode:{type:"sap.m.StepInputStepModeType",group:"Data",defaultValue:d.AdditionAndSubtraction},largerStep:{type:"float",group:"Data",defaultValue:2},value:{type:"float",group:"Data",defaultValue:0},name:{type:"string",group:"Misc",defaultValue:null},placeholder:{type:"string",group:"Misc",defaultValue:null},required:{type:"boolean",group:"Misc",defaultValue:false},width:{type:"sap.ui.core.CSSSize",group:"Dimension"},valueState:{type:"sap.ui.core.ValueState",group:"Data",defaultValue:_.None},valueStateText:{type:"string",group:"Misc",defaultValue:null},editable:{type:"boolean",group:"Behavior",defaultValue:true},enabled:{type:"boolean",group:"Behavior",defaultValue:true},displayValuePrecision:{type:"int",group:"Data",defaultValue:0},description:{type:"string",group:"Misc",defaultValue:null},fieldWidth:{type:"sap.ui.core.CSSSize",group:"Appearance",defaultValue:"50%"},textAlign:{type:"sap.ui.core.TextAlign",group:"Appearance",defaultValue:g.End},validationMode:{type:"sap.m.StepInputValidationMode",group:"Misc",defaultValue:f.FocusOut}},aggregations:{_input:{type:"sap.ui.core.Control",multiple:false,visibility:"hidden"}},associations:{ariaLabelledBy:{type:"sap.ui.core.Control",multiple:true,singularName:"ariaLabelledBy"},ariaDescribedBy:{type:"sap.ui.core.Control",multiple:true,singularName:"ariaDescribedBy"}},events:{change:{parameters:{value:{type:"string"}}}},dnd:{draggable:false,droppable:true}},constructor:function(t,i){e.prototype.constructor.apply(this,arguments);if(this.getEditable()){this._getOrCreateDecrementButton();this._getOrCreateIncrementButton()}if(typeof t!=="string"){i=t}if(i&&i.value===undefined){this.setValue(this._getDefaultValue(undefined,i.max,i.min))}},renderer:l});c.INITIAL_WAIT_TIMEOUT=500;c.ACCELLERATION=.8;c.MIN_WAIT_TIMEOUT=50;c.INITIAL_SPEED=120;c._TOLERANCE=10;var m=["enabled","editable","name","placeholder","required","valueStateText","description","fieldWidth","textAlign"];i.call(c.prototype);c.prototype.init=function(){this._iRealPrecision=0;this._attachChange();this._bPaste=false;this._bNeedsVerification=false;this._bValueStatePreset=true;this._onmousewheel=this._onmousewheel.bind(this);window.addEventListener("contextmenu",function(e){if(this._btndown===false&&e.target.className.indexOf("sapMInputBaseIconContainer")!==-1){e.preventDefault()}}.bind(this))};c.prototype.onBeforeRendering=function(){var e=this._getMin(),t=this._getMax(),i=this._sOriginalValue||this.getValue(),n=this.getEditable();this._iRealPrecision=this._getRealValuePrecision();this._getInput().setValue(this._getFormattedValue(i));this._getInput().setValueState(this.getValueState());this._getOrCreateDecrementButton().setVisible(n);this._getOrCreateIncrementButton().setVisible(n);this._disableButtons(i,t,e);this.$().off(a.browser.firefox?"DOMMouseScroll":"mousewheel",this._onmousewheel);if(this._bNeedsVerification&&!this._bValueStatePreset){this._verifyValue();this._bNeedsVerification=false}};c.prototype.onAfterRendering=function(){this.$().on(a.browser.firefox?"DOMMouseScroll":"mousewheel",this._onmousewheel)};c.prototype.exit=function(){this.$().off(a.browser.firefox?"DOMMouseScroll":"mousewheel",this._onmousewheel);this._sOriginalValue=null};c.prototype.setProperty=function(t,i,n){e.prototype.setProperty.call(this,t,i,n);if(m.indexOf(t)>-1){this._getInput().setProperty(t,this.getProperty(t),n)}return this};c.prototype.setValidationMode=function(e){if(this.getValidationMode()!==e){switch(e){case f.FocusOut:this._detachLiveChange();break;case f.LiveChange:this._attachLiveChange();break}this.setProperty("validationMode",e)}return this};c.prototype.setMin=function(e){if(e!==undefined&&!this._validateOptionalNumberProperty("min",e)){return this}return this.setProperty("min",e)};c.prototype.setMax=function(e){if(e!==undefined&&!this._validateOptionalNumberProperty("max",e)){return this}return this.setProperty("max",e)};c.prototype._validateOptionalNumberProperty=function(e,t){if(this._isNumericLike(t)){return true}p.error("The value of property '"+e+"' must be a number");return false};c.prototype.setDisplayValuePrecision=function(e){var t,i;if(y(e)){t=parseInt(e)}else{t=0;p.warning(this+": ValuePrecision ("+e+") is not correct. It should be a number between 0 and 20! Setting the default ValuePrecision:0.")}var i=this.setProperty("displayValuePrecision",t);this._getNumberFormatter(true);return i};c.prototype._getIncrementButton=function(){var e=this._getInput().getAggregation("_endIcon")||[];var t=null;if(e.length){t=e[e.length-1]}return t};c.prototype._getDecrementButton=function(){var e=this._getInput().getAggregation("_beginIcon");return e?e[0]:null};c.prototype._createIncrementButton=function(){var e=this._getInput().addEndIcon({src:t.getIconURI("add"),id:this.getId()+"-incrementBtn",noTabStop:true,decorative:false,press:this._handleButtonPress.bind(this,1),useIconTooltip:false});e.getEnabled=function(){return!this._shouldDisableIncrementButton(this._parseNumber(this._getInput().getValue()),this._getMax())}.bind(this);e.$().attr("tabindex","-1");this._attachEvents(e,true);e.addEventDelegate({onAfterRendering:function(){e.$().attr("tabindex","-1")}});return e};c.prototype._createDecrementButton=function(){var e=this._getInput().addBeginIcon({src:t.getIconURI("less"),id:this.getId()+"-decrementBtn",noTabStop:true,decorative:false,press:this._handleButtonPress.bind(this,-1),useIconTooltip:false});e.getEnabled=function(){return!this._shouldDisableDecrementButton(this._parseNumber(this._getInput().getValue()),this._getMin())}.bind(this);e.$().attr("tabindex","-1");this._attachEvents(e,false);e.addEventDelegate({onAfterRendering:function(){e.$().attr("tabindex","-1")}});return e};c.prototype._getInput=function(){if(!this.getAggregation("_input")){var e=new o({id:this.getId()+"-input",textAlign:this.getTextAlign(),editable:this.getEditable(),enabled:this.getEnabled(),description:this.getDescription(),fieldWidth:this.getFieldWidth(),liveChange:this._inputLiveChangeHandler});this.setAggregation("_input",e)}return this.getAggregation("_input")};c.prototype._changeValue=function(e){if(this._fTempValue!=this._fOldValue||e){this.setValue(this._fTempValue);this.fireChange({value:this._fTempValue})}else{this._applyValue(this._fTempValue);this._disableButtons(this._parseNumber(this._getInput().getValue()),this._getMax(),this._getMin())}return this};c.prototype._handleButtonPress=function(e){if(!this._bSpinStarted){this._bDelayedEventFire=false;this._changeValueWithStep(e);this._btndown=false;this._changeValue()}else{this._bSpinStarted=false}this._bNeedsVerification=true;return this};c.prototype._changeValueWithStep=function(e){var t,i;if(isNaN(this._fTempValue)||this._fTempValue===undefined){this._fTempValue=this.getValue()}i=this._checkInputValue();this._fTempValue+=i;t=e!==0?this._calculateNewValue(e):this._fTempValue;if(e!==0||i!==0||this._bDelayedEventFire){this._fTempValue=t}if(this._bDelayedEventFire){this._applyValue(t);this._disableButtons(this._parseNumber(this._getFormattedValue(t)),this._getMax(),this._getMin());this._bNeedsVerification=true}return this};c.prototype._disableButtons=function(e,t,i){if(!this._isNumericLike(e)){return}var n=this._getIncrementButton(),s=this._getDecrementButton(),a=this._shouldDisableDecrementButton(e,i),r=this._shouldDisableIncrementButton(e,t);s&&s.toggleStyleClass("sapMStepInputIconDisabled",a);n&&n.toggleStyleClass("sapMStepInputIconDisabled",r);return this};c.prototype._shouldDisableDecrementButton=function(e,t){var i=this._isNumericLike(t),n=this.getEnabled(),s=i&&t>=e;return n?s:true};c.prototype._shouldDisableIncrementButton=function(e,t){var i=this._isNumericLike(t),n=this.getEnabled(),s=i&&t<=e;return n?s:true};c.prototype._verifyValue=function(){var e=this._getMin(),t=this._getMax(),i=this._parseNumber(this._getInput().getValue()),n=sap.ui.getCore().getLibraryResourceBundle("sap.ui.core"),a=this.getBinding("value"),r=a&&a.getType&&a.getType(),u=r&&r.oConstraints&&r.oConstraints.maximum,o=r&&r.oConstraints&&r.oConstraints.minimum,l,h=[],p=false,g;if(!this._isNumericLike(i)){return}g=this;do{p=g.hasListeners("validationError");g=g.getEventingParent()}while(g&&!p);if(this._isMoreThanMax(i)){if(p&&u){return}l=n.getText("EnterNumberMax",[t]);h.push("maximum")}else if(this._isLessThanMin(i)){if(p&&o){return}l=n.getText("EnterNumberMin",[e]);h.push("minimum")}else if(this._areFoldChangeRequirementsFulfilled()&&i%this.getStep()!==0){l=n.getText("Float.Invalid")}if(l){this.setProperty("valueState",_.Error,true);this._getInput().setValueState(_.Error);this._getInput().setValueStateText(l);if(p){this.fireValidationError({element:this,exception:new s(l,h),id:this.getId(),message:l,property:"value"})}}else{this.setProperty("valueState",_.None,true);this._getInput().setValueState(_.None)}};c.prototype.setValueState=function(e){this._bValueStatePreset=true;this.setProperty("valueState",e);this._getInput().setValueState(e);return this};c.prototype.setValue=function(e){var t;if(isNaN(e)||e===null){e=this._getDefaultValue(undefined,this._getMax(),this._getMin())}else{e=Number(e)}if(!this._validateOptionalNumberProperty("value",e)){return this}this._sOriginalValue=e;this._applyValue(e);this._disableButtons(this._parseNumber(this._getInput().getValue()),this._getMax(),this._getMin());if(e!==this._fOldValue){this._fOldValue=e;t=this.setProperty("value",e)}else{t=this}this._iRealPrecision=this._getRealValuePrecision();this._fTempValue=e;this._bValueStatePreset=false;return t};c.prototype._getNumberFormatter=function(e){if(!this._formatter||e){this._formatter=n.getFloatInstance({decimals:this.getDisplayValuePrecision()})}return this._formatter};c.prototype._getFormattedValue=function(e){var t=this.getDisplayValuePrecision(),i,n;if(e==undefined){e=this.getValue()}if(a.system.desktop){return this._getNumberFormatter().format(e)}if(t<=0){return parseFloat(e).toFixed(0)}n=e.toString().split(".");if(n.length===2){i=n[1].length;if(i>t){return parseFloat(e).toFixed(t)}return n[0]+"."+this._padZeroesRight(n[1],t)}else{return e.toString()+"."+this._padZeroesRight("0",t)}};c.prototype._padZeroesRight=function(e,t){var i="",n=e.length;for(var s=n;s<t;s++){i=i+"0"}i=e+i;return i};c.prototype._checkInputValue=function(){var e=this._getInput().getValue(),t=0;if(e===""){e=this._getDefaultValue(e,this._getMax(),this._getMin()).toString()}if(this.getDisplayValuePrecision()===0){e=Math.round(this._parseNumber(e.toLowerCase().split("e")[0])).toString()}if(this._getFormattedValue(this._fTempValue)!==e){t=this._parseNumber(e)-this._fTempValue}return t};c.prototype.onsappageup=function(e){e.preventDefault();if(this.getEditable()){this._bDelayedEventFire=true;this._changeValueWithStep(this.getLargerStep())}};c.prototype.onsappagedown=function(e){e.preventDefault();if(this.getEditable()){this._bDelayedEventFire=true;this._changeValueWithStep(-this.getLargerStep())}};c.prototype.onsappageupmodifiers=function(e){if(this.getEditable()&&this._isNumericLike(this._getMax())&&!(e.ctrlKey||e.metaKey||e.altKey)&&e.shiftKey){this._bDelayedEventFire=true;this._fTempValue=this._parseNumber(this._getInput().getValue());this._changeValueWithStep(this._getMax()-this._fTempValue)}};c.prototype.onsappagedownmodifiers=function(e){if(this.getEditable()&&this._isNumericLike(this._getMin())&&!(e.ctrlKey||e.metaKey||e.altKey)&&e.shiftKey){this._bDelayedEventFire=true;this._fTempValue=this._parseNumber(this._getInput().getValue());this._changeValueWithStep(-(this._fTempValue-this._getMin()))}};c.prototype.onsapup=function(e){e.preventDefault();if(this.getEditable()){this._bDelayedEventFire=true;this._changeValueWithStep(1);e.setMarked()}};c.prototype.onsapdown=function(e){e.preventDefault();if(this.getEditable()){this._bDelayedEventFire=true;this._changeValueWithStep(-1);e.setMarked()}};c.prototype._onmousewheel=function(e){var t=this.getDomRef().contains(document.activeElement);if(t&&this.getEditable()&&this.getEnabled()){e.preventDefault();var i=e.originalEvent,n=i.detail?-i.detail>0:i.wheelDelta>0;this._bDelayedEventFire=true;this._changeValueWithStep(n?1:-1)}};c.prototype.onkeydown=function(e){var t,i,n;if(!this.getEditable()){return}if(e.which===h.ENTER&&this._fTempValue!==this.getValue()){e.preventDefault();this._changeValue();return}this._bPaste=(e.ctrlKey||e.metaKey)&&e.which===h.V;if(e.which===h.ARROW_UP&&!e.altKey&&e.shiftKey&&(e.ctrlKey||e.metaKey)){i=this._getMax();this._fTempValue=this._parseNumber(this._getInput().getValue());t=i!==undefined?i-this._fTempValue:0}else if(e.which===h.ARROW_DOWN&&!e.altKey&&e.shiftKey&&(e.ctrlKey||e.metaKey)){n=this._getMin();this._fTempValue=this._parseNumber(this._getInput().getValue());t=n!==undefined?-(this._fTempValue-n):0}else if(e.which===h.ARROW_UP&&!(e.ctrlKey||e.metaKey||e.altKey)&&e.shiftKey){t=this.getLargerStep()}else if(e.which===h.ARROW_DOWN&&!(e.ctrlKey||e.metaKey||e.altKey)&&e.shiftKey){t=-this.getLargerStep()}else if(e.which===h.ARROW_UP&&(e.ctrlKey||e.metaKey)){t=1}else if(e.which===h.ARROW_DOWN&&(e.ctrlKey||e.metaKey)){t=-1}else if(e.which===h.ARROW_UP&&e.altKey){t=1}else if(e.which===h.ARROW_DOWN&&e.altKey){t=-1}if(t!==undefined){e.preventDefault();if(t!==0){this._bDelayedEventFire=true;this._changeValueWithStep(t)}}};c.prototype.onsapescape=function(e){if(this._fOldValue!==this._fTempValue){this._applyValue(this._fOldValue);this._bNeedsVerification=true}};c.prototype._attachLiveChange=function(){this._getInput().attachLiveChange(this._liveChange,this)};c.prototype._detachLiveChange=function(){this._getInput().detachLiveChange(this._liveChange,this)};c.prototype._attachChange=function(){this._getInput().attachChange(this._change,this)};c.prototype._liveChange=function(){this._disableButtons(this._parseNumber(this._getInput().getValue()),this._getMax(),this._getMin());this._verifyValue()};c.prototype._change=function(e){var t;var i=this._getInput().getValue();var n=this._isLessThanMin(i)||this._isMoreThanMax(i);if(!this._isButtonFocused()){if(!this._btndown||n){t=this._parseNumber(this._getFormattedValue());if(this._fOldValue===undefined){this._fOldValue=t}this._bDelayedEventFire=false;this._changeValueWithStep(0);this._changeValue();this._bNeedsVerification=true}else{this._fTempValue=this._parseNumber(this._getInput().getValue())}}};c.prototype._isMoreThanMax=function(e){return this._isNumericLike(this._getMax())&&this._getMax()<e};c.prototype._isLessThanMin=function(e){return this._isNumericLike(this._getMin())&&this._getMin()>e};c.prototype._applyValue=function(e){this._getInput().setValue(this._getFormattedValue(e))};c.prototype._calculateNewValue=function(e,t){if(t===undefined){t=e<0?false:true}var i=this.getStep(),n=this._getMax(),s=this._getMin(),a=parseFloat(this._getDefaultValue(this._getInput().getValue(),n,s)),r=t?1:-1,u=Math.abs(i)*Math.abs(e),o=a+r*u,l;if(this._areFoldChangeRequirementsFulfilled()){o=l=this._calculateClosestFoldValue(a,u,r)}else{l=this._sumValues(this._fTempValue,u,r,this._iRealPrecision)}if(this._isNumericLike(n)&&o>=n){l=n}if(this._isNumericLike(s)&&o<=s){l=s}return l};c.prototype._getRealValuePrecision=function(){var e=this.getValue().toString().split("."),t=this.getStep().toString().split("."),i,n;i=!e[1]?0:e[1].length;n=!t[1]?0:t[1].length;return i>n?i:n};c.prototype._getOrCreateDecrementButton=function(){return this._getDecrementButton()||this._createDecrementButton()};c.prototype._getOrCreateIncrementButton=function(){return this._getIncrementButton()||this._createIncrementButton()};c.prototype._inputLiveChangeHandler=function(e){var t=this.getParent()._restrictCharsWhenDecimal(e);this.setProperty("value",t?t:e.getParameter("newValue"),true)};c.prototype._restrictCharsWhenDecimal=function(e){var t=a.system.desktop?this._getNumberFormatter().oFormatOptions.decimalSeparator:".";var i=e.getParameter("value").indexOf(t),n=this.getDisplayValuePrecision(),s=e.getParameter("value"),r;if(i>0&&n>=0){var u=s.split(t)[1],o=u?u.length:0,l=s.split(t)[0],h=n>0?s.substring(s.indexOf(t)+1,s.length):"";if(!this._bPaste){if(o>n){r=l+(n>0?t+h.substr(0,n):"");this._showWrongValueVisualEffect()}}else{if(s.indexOf(t)){r=s.split(t)[0]+(n>0?t+u.substring(0,n):"")}this._bPaste=false}}else{r=s}if(this._getInput()._getInputValue()!==r){this._getInput().updateDomValue(r)}return r};c.prototype._showWrongValueVisualEffect=function(){var e=this.getValueState(),t=this._getInput();if(e===_.Error){return}t.setValueState(_.Error);setTimeout(t["setValueState"].bind(t,e),1e3)};c.prototype._getDefaultValue=function(e,t,i){if(e!==""&&e!==undefined){return this._parseNumber(this._getInput().getValue())}if(this._isNumericLike(i)&&i>0){return i}else if(this._isNumericLike(t)&&t<0){return t}else{return 0}};c.prototype._isNumericLike=function(e){return!isNaN(e)&&e!==null&&e!==""};c.prototype._isInteger=function(e){return e===parseInt(e)};c.prototype._isButtonFocused=function(){return document.activeElement===this._getIncrementButton().getDomRef()||document.activeElement===this._getDecrementButton().getDomRef()};c.prototype._sumValues=function(e,t,i,n){var s=Math.pow(10,n),a=parseInt((e*s).toFixed(1)),r=parseInt((t*s).toFixed(1));return(a+i*r)/s};c.prototype._areFoldChangeRequirementsFulfilled=function(){return this.getStepMode()===d.Multiple&&this.getDisplayValuePrecision()===0&&this._isInteger(this.getStep())&&this._isInteger(this.getLargerStep())};c.prototype._calculateClosestFoldValue=function(e,t,i){var n=Math.floor(e),s=t;do{n+=i;s--}while(n%t!==0&&s);if(n%t!==0){p.error("Wrong next/previous value "+n+" for "+e+", step: "+t+" and sign: "+i,this)}return n};function y(e){return typeof e==="number"&&!isNaN(e)&&e>=0&&e<=20}c.prototype._calcWaitTimeout=function(){this._speed*=c.ACCELLERATION;this._waitTimeout=this._waitTimeout-this._speed<c.MIN_WAIT_TIMEOUT?c.MIN_WAIT_TIMEOUT:this._waitTimeout-this._speed;return this._waitTimeout};c.prototype._spinValues=function(e){this._spinTimeoutId=setTimeout(function(){if(this._btndown){this._bSpinStarted=true;this._bDelayedEventFire=true;this._changeValueWithStep(e?1:-1);this._disableButtons(this._parseNumber(this._getInput().getValue()),this._getMax(),this._getMin());if(this._getIncrementButton().getEnabled()&&e||this._getDecrementButton().getEnabled()&&!e){this._spinValues(e)}}}.bind(this),this._calcWaitTimeout())};c.prototype._attachEvents=function(e,t){var i={onmousedown:function(e){if(e.button===0&&!this._btndown){this._btndown=true;this._waitTimeout=c.INITIAL_WAIT_TIMEOUT;this._speed=c.INITIAL_SPEED;this._spinValues(t)}}.bind(this),onmouseup:function(e){if(e.button===0){this._bDelayedEventFire=undefined;this._btndown=false;this._stopSpin()}}.bind(this),onmouseout:function(e){if(this._btndown){this._bDelayedEventFire=undefined;this._stopSpin()}}.bind(this),oncontextmenu:function(e){e.stopImmediatePropagation(true);if(e.originalEvent&&e.originalEvent.cancelable){e.preventDefault()}e.stopPropagation()},ontouchend:function(e){if(a.system.phone||a.system.tablet){this._bDelayedEventFire=undefined;this._btndown=false;this._stopSpin()}if(e.originalEvent&&e.originalEvent.cancelable){e.preventDefault()}if(t){this._getIncrementButton().invalidate()}else{this._getDecrementButton().invalidate()}}.bind(this)};e.addDelegate(i,true)};c.prototype._stopSpin=function(){this._resetSpinValues();if(this._bSpinStarted){this._changeValue()}};c.prototype._getMin=function(){var e=this.getBinding("value"),t=e&&e.getType&&e.getType(),i=t&&t.oConstraints&&t.oConstraints.minimum;return i!==undefined?parseFloat(i):this.getMin()};c.prototype._getMax=function(){var e=this.getBinding("value"),t=e&&e.getType&&e.getType(),i=t&&t.oConstraints&&t.oConstraints.maximum;return i!==undefined?parseFloat(i):this.getMax()};c.prototype.getIdForLabel=function(){return this._getInput().getIdForLabel()};c.prototype.onfocusout=function(e){if(!this._btndown){this._changeValueWithStep(0);if(this._bDelayedEventFire&&this._fTempValue!==this._fOldValue){this._bDelayedEventFire=undefined;this._changeValue()}}};c.prototype.getFocusDomRef=function(){return this.getAggregation("_input").getFocusDomRef()};c.prototype._resetSpinValues=function(){clearTimeout(this._spinTimeoutId);this._waitTimeout=500;this._speed=120};c.prototype.getAccessibilityInfo=function(){return{type:sap.ui.getCore().getLibraryResourceBundle("sap.m").getText("ACC_CTR_TYPE_STEPINPUT"),description:this.getValue()||"",focusable:this.getEnabled(),enabled:this.getEnabled(),editable:this.getEnabled()&&this.getEditable()}};c.prototype._parseNumber=function(e){if(a.system.desktop){return this._getNumberFormatter().parse(e)}return Number(e)};return c});
//# sourceMappingURL=StepInput.js.map