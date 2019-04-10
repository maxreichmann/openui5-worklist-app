/*!
 * OpenUI5
 * (c) Copyright 2009-2019 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/Icon","./Input","./InputBase","./InputRenderer","sap/ui/core/Control","sap/ui/core/IconPool","sap/ui/core/LabelEnablement","sap/ui/Device","sap/ui/core/library","sap/ui/core/Renderer","sap/m/library","./StepInputRenderer","sap/ui/events/KeyCodes","sap/base/Log"],function(e,t,i,a,n,r,s,u,o,l,p,h,c,g){"use strict";var f=p.InputType;var d=o.TextAlign;var _=o.ValueState;var y=p.StepInputValidationMode;var m=p.StepInputStepModeType;var V=n.extend("sap.m.StepInput",{metadata:{interfaces:["sap.ui.core.IFormContent"],library:"sap.m",designtime:"sap/m/designtime/StepInput.designtime",properties:{min:{type:"float",group:"Data"},max:{type:"float",group:"Data"},step:{type:"float",group:"Data",defaultValue:1},stepMode:{type:"sap.m.StepInputStepModeType",group:"Data",defaultValue:m.AdditionAndSubtraction},largerStep:{type:"float",group:"Data",defaultValue:2},value:{type:"float",group:"Data",defaultValue:0},name:{type:"string",group:"Misc",defaultValue:null},placeholder:{type:"string",group:"Misc",defaultValue:null},required:{type:"boolean",group:"Misc",defaultValue:false},width:{type:"sap.ui.core.CSSSize",group:"Dimension"},valueState:{type:"sap.ui.core.ValueState",group:"Data",defaultValue:_.None},valueStateText:{type:"string",group:"Misc",defaultValue:null},editable:{type:"boolean",group:"Behavior",defaultValue:true},enabled:{type:"boolean",group:"Behavior",defaultValue:true},displayValuePrecision:{type:"int",group:"Data",defaultValue:0},description:{type:"string",group:"Misc",defaultValue:null},fieldWidth:{type:"sap.ui.core.CSSSize",group:"Appearance",defaultValue:"50%"},textAlign:{type:"sap.ui.core.TextAlign",group:"Appearance",defaultValue:d.End},validationMode:{type:"sap.m.StepInputValidationMode",group:"Misc",defaultValue:y.FocusOut}},aggregations:{_input:{type:"sap.ui.core.Control",multiple:false,visibility:"hidden"}},associations:{ariaLabelledBy:{type:"sap.ui.core.Control",multiple:true,singularName:"ariaLabelledBy"},ariaDescribedBy:{type:"sap.ui.core.Control",multiple:true,singularName:"ariaDescribedBy"}},events:{change:{parameters:{value:{type:"string"}}}},dnd:{draggable:false,droppable:true}},constructor:function(e,t){n.prototype.constructor.apply(this,arguments);if(this.getEditable()){this._getOrCreateDecrementButton();this._getOrCreateIncrementButton()}if(typeof e!=="string"){t=e}if(t&&t.value===undefined){this.setValue(this._getDefaultValue(undefined,t.max,t.min))}}});var v=sap.ui.getCore().getLibraryResourceBundle("sap.m");V.STEP_INPUT_INCREASE_BTN_TOOLTIP=v.getText("STEP_INPUT_INCREASE_BTN");V.STEP_INPUT_DECREASE_BTN_TOOLTIP=v.getText("STEP_INPUT_DECREASE_BTN");V.INITIAL_WAIT_TIMEOUT=500;V.ACCELLERATION=.8;V.MIN_WAIT_TIMEOUT=50;V.INITIAL_SPEED=120;V._TOLERANCE=10;var b={min:"aria-valuemin",max:"aria-valuemax",value:"aria-valuenow"};var I=["enabled","editable","name","placeholder","required","valueStateText","description","fieldWidth","textAlign"];var D=l.extend(a);D.writeInnerAttributes=function(e,t){e.writeAttribute("type",t.getType().toLowerCase());if(sap.ui.getCore().getConfiguration().getRTL()){e.writeAttribute("dir","ltr")}};D.getAccessibilityState=function(e){var t=a.getAccessibilityState(e),i=e.getParent(),n=i.getMin(),r=i.getMax(),u=i.getValue(),o=i.getAriaLabelledBy(),l=s.getReferencingLabels(i),p=o.concat(l).join(" "),h=i.getAriaDescribedBy().join(" ");t["role"]="spinbutton";t["valuenow"]=u;if(typeof n==="number"){t["valuemin"]=n}if(typeof r==="number"){t["valuemax"]=r}if(h){t["describedby"]=h}if(p){t["labelledby"]=p}return t};var T=t.extend("sap.m.internal.NumericInput",{metadata:{library:"sap.m"},constructor:function(e,i){return t.apply(this,arguments)},renderer:D});T.prototype.onBeforeRendering=function(){i.prototype.onBeforeRendering.call(this);this._deregisterEvents()};V.prototype.init=function(){this._iRealPrecision=0;this._attachChange();this._bPaste=false;this._onmousewheel=this._onmousewheel.bind(this)};V.prototype.onBeforeRendering=function(){var e=this.getMin(),t=this.getMax(),i=this.getValue();this._iRealPrecision=this._getRealValuePrecision();this._getInput().setValue(this._getFormatedValue(i));if(this._isNumericLike(e)&&e>i){this.setValue(e)}if(this._isNumericLike(t)&&t<i){this.setValue(t)}this._disableButtons(i,t,e);this.$().unbind(u.browser.firefox?"DOMMouseScroll":"mousewheel",this._onmousewheel)};V.prototype.onAfterRendering=function(){this.$().bind(u.browser.firefox?"DOMMouseScroll":"mousewheel",this._onmousewheel)};V.prototype.exit=function(){this.$().unbind(u.browser.firefox?"DOMMouseScroll":"mousewheel",this._onmousewheel)};V.prototype.setProperty=function(e,t,i){this._writeAccessibilityState(e,t);n.prototype.setProperty.call(this,e,t,i);if(I.indexOf(e)>-1){this._getInput().setProperty(e,this.getProperty(e),i)}return this};V.prototype.setValidationMode=function(e){if(this.getValidationMode()!==e){switch(e){case sap.m.StepInputValidationMode.FocusOut:this._detachLiveChange();break;case sap.m.StepInputValidationMode.LiveChange:this._attachLiveChange();break}this.setProperty("validationMode",e)}return this};V.prototype.setMin=function(e){var t,i=this.getValue(),a=i!==0&&!i;if(e===undefined){return this.setProperty("min",e,true)}if(!this._validateOptionalNumberProperty("min",e)){return this}t=this.setProperty("min",e,a);this._disableButtons(i,this.getMax(),e);this._verifyValue();return t};V.prototype.setMax=function(e){var t,i=this.getValue(),a=i!==0&&!i;if(e===undefined){return this.setProperty("max",e,true)}if(!this._validateOptionalNumberProperty("max",e)){return this}t=this.setProperty("max",e,a);this._disableButtons(this.getValue(),e,this.getMin());this._verifyValue();return t};V.prototype._validateOptionalNumberProperty=function(e,t){if(this._isNumericLike(t)){return true}g.error("The value of property '"+e+"' must be a number");return false};V.prototype.setDisplayValuePrecision=function(e){var t,i=this.getValue(),a=i!==0&&!i;if(S(e)){t=parseInt(e)}else{t=0;g.warning(this+": ValuePrecision ("+e+") is not correct. It should be a number between 0 and 20! Setting the default ValuePrecision:0.")}return this.setProperty("displayValuePrecision",t,a)};V.prototype.setTooltip=function(e){this._getInput().setTooltip(e)};V.prototype._getIncrementButton=function(){var e=this._getInput().getAggregation("_endIcon");return e?e[0]:null};V.prototype._getDecrementButton=function(){var e=this._getInput().getAggregation("_beginIcon");return e?e[0]:null};V.prototype._createIncrementButton=function(){var e=this;var t=this._getInput().addEndIcon({src:r.getIconURI("add"),id:this.getId()+"-incrementBtn",noTabStop:true,press:this._handleButtonPress.bind(this,true),tooltip:V.STEP_INPUT_INCREASE_BTN_TOOLTIP});t.getEnabled=function(){return!this._shouldDisableIncrementButton(this.getValue(),this.getMax())}.bind(this);t.addEventDelegate({onAfterRendering:function(){t.$().attr("tabindex","-1");e._attachEvents(t,true)}});return t};V.prototype._createDecrementButton=function(){var e=this;var t=this._getInput().addBeginIcon({src:r.getIconURI("less"),id:this.getId()+"-decrementBtn",noTabStop:true,press:this._handleButtonPress.bind(this,false),tooltip:V.STEP_INPUT_DECREASE_BTN_TOOLTIP});t.getEnabled=function(){return!this._shouldDisableDecrementButton(this.getValue(),this.getMin())}.bind(this);t.addEventDelegate({onAfterRendering:function(){t.$().attr("tabindex","-1");e._attachEvents(t,false)}});return t};V.prototype._getInput=function(){if(!this.getAggregation("_input")){var e=new T({id:this.getId()+"-input",textAlign:this.getTextAlign(),type:f.Number,editable:this.getEditable(),enabled:this.getEnabled(),description:this.getDescription(),fieldWidth:this.getFieldWidth(),liveChange:this._inputLiveChangeHandler});this.setAggregation("_input",e)}return this.getAggregation("_input")};V.prototype._handleButtonPress=function(e){var t=this._calculateNewValue(1,e),i=this.getMin(),a=this.getMax();this._btndown=undefined;this._disableButtons(t.displayValue,a,i);this.setValue(t.value);if(this._sOldValue!==this.getValue()){this.fireChange({value:this.getValue()})}this.$().focus();return this};V.prototype._disableButtons=function(e,t,i){if(!this._isNumericLike(e)){return}var a=this._getIncrementButton(),n=this._getDecrementButton(),r=this._shouldDisableDecrementButton(e,i),s=this._shouldDisableIncrementButton(e,t);n&&n.toggleStyleClass("sapMStepInputIconDisabled",r);a&&a.toggleStyleClass("sapMStepInputIconDisabled",s);return this};V.prototype._shouldDisableDecrementButton=function(e,t){var i=this._isNumericLike(t),a=this.getEnabled(),n=i&&t>=e;return a?n:true};V.prototype._shouldDisableIncrementButton=function(e,t){var i=this._isNumericLike(t),a=this.getEnabled(),n=i&&t<=e;return a?n:true};V.prototype.onfocusout=function(){this._verifyValue()};V.prototype._verifyValue=function(){var e=this.getMin(),t=this.getMax(),i=parseFloat(this._getInput().getValue());if(!this._isNumericLike(i)){return}if(this._isNumericLike(t)&&i>t||this._isNumericLike(e)&&i<e||this._areFoldChangeRequirementsFulfilled()&&i%this.getStep()!==0){this.setValueState(_.Error)}else{this.setValueState(_.None)}};V.prototype.setValue=function(e){var t;if(e==undefined){e=0}this._sOldValue=this.getValue();if(!this._validateOptionalNumberProperty("value",e)){return this}this._getInput().setValue(this._getFormatedValue(e));this._verifyValue();this._disableButtons(e,this.getMax(),this.getMin());t=this.setProperty("value",parseFloat(e),true);this._iRealPrecision=this._getRealValuePrecision();return t};V.prototype._getFormatedValue=function(e){var t=this.getDisplayValuePrecision(),i,a;if(e==undefined){e=this.getValue()}if(t<=0){return parseFloat(e).toFixed(0)}a=e.toString().split(".");if(a.length===2){i=a[1].length;if(i>t){return parseFloat(e).toFixed(t)}return a[0]+"."+this._padZeroesRight(a[1],t)}else{return e.toString()+"."+this._padZeroesRight("0",t)}};V.prototype._padZeroesRight=function(e,t){var i="",a=e.length;for(var n=a;n<t;n++){i=i+"0"}i=e+i;return i};V.prototype.onsappageup=function(e){this._applyValue(this._calculateNewValue(this.getLargerStep(),true).displayValue);this._verifyValue();e.preventDefault()};V.prototype.onsappagedown=function(e){this._applyValue(this._calculateNewValue(this.getLargerStep(),false).displayValue);this._verifyValue();e.preventDefault()};V.prototype.onsappageupmodifiers=function(e){if(this._isNumericLike(this.getMax())&&!(e.ctrlKey||e.metaKey||e.altKey)&&e.shiftKey){this._applyValue(this.getMax())}};V.prototype.onsappagedownmodifiers=function(e){if(this._isNumericLike(this.getMin())&&!(e.ctrlKey||e.metaKey||e.altKey)&&e.shiftKey){this._applyValue(this.getMin())}};V.prototype.onsapup=function(e){e.preventDefault();this._applyValue(this._calculateNewValue(1,true).displayValue);this._verifyValue()};V.prototype.onsapdown=function(e){e.preventDefault();this._applyValue(this._calculateNewValue(1,false).displayValue);this._verifyValue()};V.prototype._onmousewheel=function(e){var t=this.getDomRef().contains(document.activeElement);if(t){e.preventDefault();var i=e.originalEvent,a=i.detail?-i.detail>0:i.wheelDelta>0;this._applyValue(this._calculateNewValue(1,a).displayValue);this._verifyValue()}};V.prototype.onkeydown=function(e){var t=false;this._bPaste=(e.ctrlKey||e.metaKey)&&e.which===c.V;if(e.which===c.ARROW_UP&&!e.altKey&&e.shiftKey&&(e.ctrlKey||e.metaKey)){this._applyValue(this.getMax());t=true}if(e.which===c.ARROW_DOWN&&!e.altKey&&e.shiftKey&&(e.ctrlKey||e.metaKey)){this._applyValue(this.getMin());t=true}if(e.which===c.ARROW_UP&&!(e.ctrlKey||e.metaKey||e.altKey)&&e.shiftKey){e.preventDefault();this._applyValue(this._calculateNewValue(this.getLargerStep(),true).displayValue);t=true}if(e.which===c.ARROW_DOWN&&!(e.ctrlKey||e.metaKey||e.altKey)&&e.shiftKey){e.preventDefault();this._applyValue(this._calculateNewValue(this.getLargerStep(),false).displayValue);t=true}if(e.which===c.ARROW_UP&&(e.ctrlKey||e.metaKey)){e.preventDefault();this._applyValue(this._calculateNewValue(1,true).displayValue);t=true}if(e.which===c.ARROW_DOWN&&(e.ctrlKey||e.metaKey)){e.preventDefault();this._applyValue(this._calculateNewValue(1,false).displayValue);t=true}if(e.which===c.ARROW_UP&&e.altKey){e.preventDefault();this._applyValue(this._calculateNewValue(1,true).displayValue);t=true}if(e.which===c.ARROW_DOWN&&e.altKey){e.preventDefault();this._applyValue(this._calculateNewValue(1,false).displayValue);t=true}if(t){this._verifyValue()}};V.prototype.onsapescape=function(e){this._getInput().onsapescape(e)};V.prototype._attachLiveChange=function(){this._getInput().attachLiveChange(this._liveChange,this)};V.prototype._detachLiveChange=function(){this._getInput().detachLiveChange(this._liveChange,this)};V.prototype._attachChange=function(){this._getInput().attachChange(this._change,this)};V.prototype._liveChange=function(){this._verifyValue();this._disableButtons(this._getInput().getValue(),this.getMax(),this.getMin())};V.prototype._change=function(e){this._sOldValue=this.getValue();this.setValue(this._getDefaultValue(this._getInput().getValue(),this.getMax(),this.getMin()));if(this._sOldValue!==this.getValue()&&!this._isButtonFocused()){this.fireChange({value:this.getValue()})}};V.prototype._applyValue=function(e){if(!this.getEditable()||!this.getEnabled()){return}this.getAggregation("_input")._$input.val(this._getFormatedValue(e))};V.prototype._calculateNewValue=function(e,t){var i=this.getStep(),a=this.getMax(),n=this.getMin(),r=this.getValue(),s=parseFloat(this._getDefaultValue(this._getInput().getValue(),a,n)),u=t?1:-1,o=Math.abs(i)*Math.abs(e),l=s+u*o,p,h,c=this.getDisplayValuePrecision();if(c>0){p=this._sumValues(s,o,u,c)}else{p=l}if(this._areFoldChangeRequirementsFulfilled()){l=p=h=this._calculateClosestFoldValue(s,o,u)}else{h=this._sumValues(r,o,u,this._iRealPrecision)}if(this._isNumericLike(a)&&l>=a){h=a;p=a}if(this._isNumericLike(n)&&l<=n){h=n;p=n}return{value:h,displayValue:p}};V.prototype._getRealValuePrecision=function(){var e=this.getValue().toString().split("."),t=this.getStep().toString().split("."),i,a;i=!e[1]?0:e[1].length;a=!t[1]?0:t[1].length;return i>a?i:a};V.prototype.setValueState=function(e){var t=false,i=false;switch(e){case _.Error:t=true;break;case _.Warning:i=true;break;case _.Success:case _.None:break;default:return this}this._getInput().setValueState(e);setTimeout(function(){this.$().toggleClass("sapMStepInputError",t).toggleClass("sapMStepInputWarning",i)}.bind(this),0);this.setProperty("valueState",e,true);return this};V.prototype.setEditable=function(e){var t=V.prototype.setProperty.call(this,"editable",e);this._getOrCreateDecrementButton().setVisible(e);this._getOrCreateIncrementButton().setVisible(e);return t};V.prototype._getOrCreateDecrementButton=function(){return this._getDecrementButton()||this._createDecrementButton()};V.prototype._getOrCreateIncrementButton=function(){return this._getIncrementButton()||this._createIncrementButton()};V.prototype._inputLiveChangeHandler=function(e){var t=this.getParent()._restrictCharsWhenDecimal(e);this.setProperty("value",t?t:e.getParameter("newValue"),true)};V.prototype._restrictCharsWhenDecimal=function(e){var t=e.getParameter("value").indexOf("."),i=this.getDisplayValuePrecision(),a;if(t>0&&i>0){var n=e.getParameter("value"),r=n.split(".")[1],s=r?r.length:0,u=e.getSource().getProperty("value"),o=n.split(".")[0],l=u.substring(u.indexOf(".")+1,u.length);if(!this._bPaste){if(s>i){a=o+"."+l;this._showWrongValueVisualEffect()}}else{if(n.indexOf(".")){a=n.split(".")[0]+"."+r.substring(0,i)}this._bPaste=false}}this._getInput().updateDomValue(a);return a};V.prototype._showWrongValueVisualEffect=function(){var e=this.getValueState();if(e===_.Error){return}this.setValueState(_.Error);setTimeout(this["setValueState"].bind(this,e),1e3)};V.prototype._getDefaultValue=function(e,t,i){if(e!==""&&e!==undefined){return this._getInput().getValue()}if(this._isNumericLike(i)&&i>0){return i}else if(this._isNumericLike(t)&&t<0){return t}else{return 0}};V.prototype._isNumericLike=function(e){return!isNaN(e)&&e!==null&&e!==""};V.prototype._isInteger=function(e){return e===parseInt(e)};V.prototype._writeAccessibilityState=function(e,t){var i=this._getInput().getDomRef("inner");if(!i){return}if(e&&b[e]){i.setAttribute(b[e],t)}};V.prototype._isButtonFocused=function(){return document.activeElement===this._getIncrementButton().getDomRef()||document.activeElement===this._getDecrementButton().getDomRef()};V.prototype._sumValues=function(e,t,i,a){var n=Math.pow(10,a),r=parseInt((e*n).toFixed(10)),s=parseInt((t*n).toFixed(10));return(r+i*s)/n};V.prototype._areFoldChangeRequirementsFulfilled=function(){return this.getStepMode()===m.Multiple&&this.getDisplayValuePrecision()===0&&this._isInteger(this.getStep())&&this._isInteger(this.getLargerStep())};V.prototype._calculateClosestFoldValue=function(e,t,i){var a=Math.floor(e),n=t;do{a+=i;n--}while(a%t!==0&&n);if(a%t!==0){g.error("Wrong next/previous value "+a+" for "+e+", step: "+t+" and sign: "+i,this)}return a};function S(e){return typeof e==="number"&&!isNaN(e)&&e>=0&&e<=20}V.prototype._calcWaitTimeout=function(){this._speed*=V.ACCELLERATION;this._waitTimeout=this._waitTimeout-this._speed<V.MIN_WAIT_TIMEOUT?V.MIN_WAIT_TIMEOUT:this._waitTimeout-this._speed;return this._waitTimeout};V.prototype._spinValues=function(e){var t=this;if(this._btndown){this._spinTimeoutId=setTimeout(function(){if(t._btndown){var i=t._calculateNewValue(1,e);t.setValue(i.value);if(!t._getIncrementButton().getEnabled()||!t._getDecrementButton().getEnabled()){w.call(t);t.fireChange({value:t.getValue()})}t._spinValues(e)}},t._calcWaitTimeout())}};V.prototype._attachEvents=function(e,t){var i=this;var a={onmousedown:function(e){if(e.button===0&&!i._btndown){i._waitTimeout=V.INITIAL_WAIT_TIMEOUT;i._speed=V.INITIAL_SPEED;i._btndown=true;i._spinValues(t)}},onmouseup:function(e){if(i._btndown){w.call(i)}},onmouseout:function(e){if(i._btndown){w.call(i);i.fireChange({value:i.getValue()})}},oncontextmenu:function(e){e.stopImmediatePropagation(true);e.preventDefault();e.stopPropagation()}};e.addDelegate(a,true)};V.prototype.getIdForLabel=function(){return this.getAggregation("_input").getIdForLabel()};function w(){if(this._btndown){this._btndown=undefined;clearTimeout(this._spinTimeoutId);this._waitTimeout=500;this._speed=120}}return V});