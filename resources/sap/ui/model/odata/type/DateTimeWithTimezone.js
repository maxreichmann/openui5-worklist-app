/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/format/DateFormat","sap/ui/model/_Helper","sap/ui/model/CompositeType","sap/ui/model/FormatException","sap/ui/model/ParseException"],function(e,t,o,i,n){"use strict";var r="For type 'object', at least one of the format options 'showDate' or"+" 'showTime' must be enabled",a=new Date(Date.UTC((new Date).getFullYear(),11,31,23,59,58));function s(o){var i;if(!o.oFormat){i=t.extend({strictParsing:true},o.oFormatOptions);o.oFormat=e.getDateTimeWithTimezoneInstance(i)}return o.oFormat}var h=o.extend("sap.ui.model.odata.type.DateTimeWithTimezone",{constructor:function(e,t){if(t&&Object.keys(t).length){throw new Error("Type "+this.getName()+" does not support constraints")}e=Object.assign({},e);o.call(this,e);this.oFormat=null;this.bParseWithValues=true;this.bUseInternalValues=true;this.vEmptyTimezoneValue=null;this.bShowDate=e.showDate===undefined||e.showDate;this.bShowTime=e.showTime===undefined||e.showTime;this.bShowTimezone=e.showTimezone===undefined||e.showTimezone;this.setConstraints=function(){throw new Error("Constraints are immutable")};this.setFormatOptions=function(){throw new Error("Format options are immutable")}}});h.prototype._getErrorMessage=function(){var e=!this.bShowDate&&!this.bShowTime?"EnterDateTimeTimezone":"EnterDateTime";return sap.ui.getCore().getLibraryResourceBundle().getText(e,[this.formatValue([a,"America/New_York"],"string")])};h.prototype.formatValue=function(e,t){var o=e&&e[0],n=e&&e[1];if(!e||n===undefined||o===undefined||!o&&!this.bShowTimezone){return null}if(o&&!(o instanceof Date)){throw new i("Timestamp value for "+this.getName()+" is not an instance of Date: "+o)}switch(this.getPrimitiveType(t)){case"object":if(!this.bShowDate&&!this.bShowTime){throw new i(r)}return o;case"string":return s(this).format(o,n);default:throw new i("Don't know how to format "+this.getName()+" to "+t)}};h.prototype.getName=function(){return"sap.ui.model.odata.type.DateTimeWithTimezone"};h.prototype.getPartsIgnoringMessages=function(){if(!this.bShowDate&&!this.bShowTime){return[0]}else if(!this.bShowTimezone){return[1]}return[]};h.prototype.parseValue=function(e,t,o){var i;if(!o){throw new n("'aCurrentValues' is mandatory")}switch(this.getPrimitiveType(t)){case"object":if(!this.bShowDate&&!this.bShowTime){throw new n(r)}if(!e){return[null,undefined]}if(!(e instanceof Date)){throw new n("Given value must be an instance of Date")}return[e,undefined];case"string":if(!e){if(!this.bShowDate&&!this.bShowTime){return[undefined,this.vEmptyTimezoneValue]}return[null,undefined]}try{i=s(this).parse(e,o[1])}catch(e){throw new n(e.message)}if(!i){throw new n(this._getErrorMessage())}return i;default:throw new n("Don't know how to parse "+this.getName()+" from "+t)}};h.prototype.processPartTypes=function(e){var t=e[1];if(t&&t.isA("sap.ui.model.odata.type.String")&&t.getFormatOptions().parseKeepsEmptyString===true){this.vEmptyTimezoneValue=""}};h.prototype.validateValue=function(e){};h.prototype._handleLocalizationChange=function(){this.oFormat=null};return h});
//# sourceMappingURL=DateTimeWithTimezone.js.map