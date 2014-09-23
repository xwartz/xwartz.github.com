//----------------------------------------------------------
// Copyright (C) Microsoft Corporation. All rights reserved.
//----------------------------------------------------------
// MicrosoftAjax.js
Function.__typeName="Function";Function.__class=true;Function.createCallback=function(b,a){return function(){var e=arguments.length;if(e>0){var d=[];for(var c=0;c<e;c++)d[c]=arguments[c];d[e]=a;return b.apply(this,d)}return b.call(this,a)}};Function.createDelegate=function(a,b){return function(){return b.apply(a,arguments)}};Function.emptyFunction=Function.emptyMethod=function(){};Function._validateParams=function(e,c){var a;a=Function._validateParameterCount(e,c);if(a){a.popStackFrame();return a}for(var b=0;b<e.length;b++){var d=c[Math.min(b,c.length-1)],f=d.name;if(d.parameterArray)f+="["+(b-c.length+1)+"]";a=Function._validateParameter(e[b],d,f);if(a){a.popStackFrame();return a}}return null};Function._validateParameterCount=function(e,a){var c=a.length,d=0;for(var b=0;b<a.length;b++)if(a[b].parameterArray)c=Number.MAX_VALUE;else if(!a[b].optional)d++;if(e.length<d||e.length>c){var f=Error.parameterCount();f.popStackFrame();return f}return null};Function._validateParameter=function(c,a,h){var b,g=a.type,l=!!a.integer,k=!!a.domElement,m=!!a.mayBeNull;b=Function._validateParameterType(c,g,l,k,m,h);if(b){b.popStackFrame();return b}var e=a.elementType,f=!!a.elementMayBeNull;if(g===Array&&typeof c!=="undefined"&&c!==null&&(e||!f)){var j=!!a.elementInteger,i=!!a.elementDomElement;for(var d=0;d<c.length;d++){var n=c[d];b=Function._validateParameterType(n,e,j,i,f,h+"["+d+"]");if(b){b.popStackFrame();return b}}}return null};Function._validateParameterType=function(a,c,n,m,k,d){var b;if(typeof a==="undefined")if(k)return null;else{b=Error.argumentUndefined(d);b.popStackFrame();return b}if(a===null)if(k)return null;else{b=Error.argumentNull(d);b.popStackFrame();return b}if(c&&c.__enum){if(typeof a!=="number"){b=Error.argumentType(d,Object.getType(a),c);b.popStackFrame();return b}if(a%1===0){var e=c.prototype;if(!c.__flags||a===0){for(var i in e)if(e[i]===a)return null}else{var l=a;for(var i in e){var f=e[i];if(f===0)continue;if((f&a)===f)l-=f;if(l===0)return null}}}b=Error.argumentOutOfRange(d,a,String.format(Sys.Res.enumInvalidValue,a,c.getName()));b.popStackFrame();return b}if(m){var h;if(typeof a.nodeType!=="number"){var g=a.ownerDocument||a.document||a;if(g!=a){var j=g.defaultView||g.parentWindow;h=j!=a&&!(j.document&&a.document&&j.document===a.document)}else h=typeof g.body==="undefined"}else h=a.nodeType===3;if(h){b=Error.argument(d,Sys.Res.argumentDomElement);b.popStackFrame();return b}}if(c&&!c.isInstanceOfType(a)){b=Error.argumentType(d,Object.getType(a),c);b.popStackFrame();return b}if(c===Number&&n)if(a%1!==0){b=Error.argumentOutOfRange(d,a,Sys.Res.argumentInteger);b.popStackFrame();return b}return null};Error.__typeName="Error";Error.__class=true;Error.create=function(d,b){var a=new Error(d);a.message=d;if(b)for(var c in b)a[c]=b[c];a.popStackFrame();return a};Error.argument=function(a,c){var b="Sys.ArgumentException: "+(c?c:Sys.Res.argument);if(a)b+="\n"+String.format(Sys.Res.paramName,a);var d=Error.create(b,{name:"Sys.ArgumentException",paramName:a});d.popStackFrame();return d};Error.argumentNull=function(a,c){var b="Sys.ArgumentNullException: "+(c?c:Sys.Res.argumentNull);if(a)b+="\n"+String.format(Sys.Res.paramName,a);var d=Error.create(b,{name:"Sys.ArgumentNullException",paramName:a});d.popStackFrame();return d};Error.argumentOutOfRange=function(c,a,d){var b="Sys.ArgumentOutOfRangeException: "+(d?d:Sys.Res.argumentOutOfRange);if(c)b+="\n"+String.format(Sys.Res.paramName,c);if(typeof a!=="undefined"&&a!==null)b+="\n"+String.format(Sys.Res.actualValue,a);var e=Error.create(b,{name:"Sys.ArgumentOutOfRangeException",paramName:c,actualValue:a});e.popStackFrame();return e};Error.argumentType=function(d,c,b,e){var a="Sys.ArgumentTypeException: ";if(e)a+=e;else if(c&&b)a+=String.format(Sys.Res.argumentTypeWithTypes,c.getName(),b.getName());else a+=Sys.Res.argumentType;if(d)a+="\n"+String.format(Sys.Res.paramName,d);var f=Error.create(a,{name:"Sys.ArgumentTypeException",paramName:d,actualType:c,expectedType:b});f.popStackFrame();return f};Error.argumentUndefined=function(a,c){var b="Sys.ArgumentUndefinedException: "+(c?c:Sys.Res.argumentUndefined);if(a)b+="\n"+String.format(Sys.Res.paramName,a);var d=Error.create(b,{name:"Sys.ArgumentUndefinedException",paramName:a});d.popStackFrame();return d};Error.format=function(a){var c="Sys.FormatException: "+(a?a:Sys.Res.format),b=Error.create(c,{name:"Sys.FormatException"});b.popStackFrame();return b};Error.invalidOperation=function(a){var c="Sys.InvalidOperationException: "+(a?a:Sys.Res.invalidOperation),b=Error.create(c,{name:"Sys.InvalidOperationException"});b.popStackFrame();return b};Error.notImplemented=function(a){var c="Sys.NotImplementedException: "+(a?a:Sys.Res.notImplemented),b=Error.create(c,{name:"Sys.NotImplementedException"});b.popStackFrame();return b};Error.parameterCount=function(a){var c="Sys.ParameterCountException: "+(a?a:Sys.Res.parameterCount),b=Error.create(c,{name:"Sys.ParameterCountException"});b.popStackFrame();return b};Error.prototype.popStackFrame=function(){if(typeof this.stack==="undefined"||this.stack===null||typeof this.fileName==="undefined"||this.fileName===null||typeof this.lineNumber==="undefined"||this.lineNumber===null)return;var a=this.stack.split("\n"),c=a[0],e=this.fileName+":"+this.lineNumber;while(typeof c!=="undefined"&&c!==null&&c.indexOf(e)===-1){a.shift();c=a[0]}var d=a[1];if(typeof d==="undefined"||d===null)return;var b=d.match(/@(.*):(\d+)$/);if(typeof b==="undefined"||b===null)return;this.fileName=b[1];this.lineNumber=parseInt(b[2]);a.shift();this.stack=a.join("\n")};Object.__typeName="Object";Object.__class=true;Object.getType=function(b){var a=b.constructor;if(!a||typeof a!=="function"||!a.__typeName||a.__typeName==="Object")return Object;return a};Object.getTypeName=function(a){return Object.getType(a).getName()};String.__typeName="String";String.__class=true;String.prototype.endsWith=function(a){return this.substr(this.length-a.length)===a};String.prototype.startsWith=function(a){return this.substr(0,a.length)===a};String.prototype.trim=function(){return this.replace(/^\s+|\s+$/g,"")};String.prototype.trimEnd=function(){return this.replace(/\s+$/,"")};String.prototype.trimStart=function(){return this.replace(/^\s+/,"")};String.format=function(){return String._toFormattedString(false,arguments)};String.localeFormat=function(){return String._toFormattedString(true,arguments)};String._toFormattedString=function(l,j){var c="",e=j[0];for(var a=0;true;){var f=e.indexOf("{",a),d=e.indexOf("}",a);if(f<0&&d<0){c+=e.slice(a);break}if(d>0&&(d<f||f<0)){c+=e.slice(a,d+1);a=d+2;continue}c+=e.slice(a,f);a=f+1;if(e.charAt(a)==="{"){c+="{";a++;continue}if(d<0)break;var h=e.substring(a,d),g=h.indexOf(":"),k=parseInt(g<0?h:h.substring(0,g),10)+1,i=g<0?"":h.substring(g+1),b=j[k];if(typeof b==="undefined"||b===null)b="";if(b.toFormattedString)c+=b.toFormattedString(i);else if(l&&b.localeFormat)c+=b.localeFormat(i);else if(b.format)c+=b.format(i);else c+=b.toString();a=d+1}return c};Boolean.__typeName="Boolean";Boolean.__class=true;Boolean.parse=function(b){var a=b.trim().toLowerCase();if(a==="false")return false;if(a==="true")return true};Date.__typeName="Date";Date.__class=true;Date._appendPreOrPostMatch=function(e,b){var d=0,a=false;for(var c=0,g=e.length;c<g;c++){var f=e.charAt(c);switch(f){case "'":if(a)b.append("'");else d++;a=false;break;case "\\":if(a)b.append("\\");a=!a;break;default:b.append(f);a=false}}return d};Date._expandFormat=function(a,b){if(!b)b="F";if(b.length===1)switch(b){case "d":return a.ShortDatePattern;case "D":return a.LongDatePattern;case "t":return a.ShortTimePattern;case "T":return a.LongTimePattern;case "F":return a.FullDateTimePattern;case "M":case "m":return a.MonthDayPattern;case "s":return a.SortableDateTimePattern;case "Y":case "y":return a.YearMonthPattern;default:throw Error.format(Sys.Res.formatInvalidString)}return b};Date._expandYear=function(c,a){if(a<100){var b=(new Date).getFullYear();a+=b-b%100;if(a>c.Calendar.TwoDigitYearMax)return a-100}return a};Date._getParseRegExp=function(b,e){if(!b._parseRegExp)b._parseRegExp={};else if(b._parseRegExp[e])return b._parseRegExp[e];var c=Date._expandFormat(b,e);c=c.replace(/([\^\$\.\*\+\?\|\[\]\(\)\{\}])/g,"\\\\$1");var a=new Sys.StringBuilder("^"),j=[],f=0,i=0,h=Date._getTokenRegExp(),d;while((d=h.exec(c))!==null){var l=c.slice(f,d.index);f=h.lastIndex;i+=Date._appendPreOrPostMatch(l,a);if(i%2===1){a.append(d[0]);continue}switch(d[0]){case "dddd":case "ddd":case "MMMM":case "MMM":a.append("(\\D+)");break;case "tt":case "t":a.append("(\\D*)");break;case "yyyy":a.append("(\\d{4})");break;case "fff":a.append("(\\d{3})");break;case "ff":a.append("(\\d{2})");break;case "f":a.append("(\\d)");break;case "dd":case "d":case "MM":case "M":case "yy":case "y":case "HH":case "H":case "hh":case "h":case "mm":case "m":case "ss":case "s":a.append("(\\d\\d?)");break;case "zzz":a.append("([+-]?\\d\\d?:\\d{2})");break;case "zz":case "z":a.append("([+-]?\\d\\d?)")}Array.add(j,d[0])}Date._appendPreOrPostMatch(c.slice(f),a);a.append("$");var k=a.toString().replace(/\s+/g,"\\s+"),g={"regExp":k,"groups":j};b._parseRegExp[e]=g;return g};Date._getTokenRegExp=function(){return /dddd|ddd|dd|d|MMMM|MMM|MM|M|yyyy|yy|y|hh|h|HH|H|mm|m|ss|s|tt|t|fff|ff|f|zzz|zz|z/g};Date.parseLocale=function(a){return Date._parse(a,Sys.CultureInfo.CurrentCulture,arguments)};Date.parseInvariant=function(a){return Date._parse(a,Sys.CultureInfo.InvariantCulture,arguments)};Date._parse=function(g,c,h){var e=false;for(var a=1,i=h.length;a<i;a++){var f=h[a];if(f){e=true;var b=Date._parseExact(g,f,c);if(b)return b}}if(!e){var d=c._getDateTimeFormats();for(var a=0,i=d.length;a<i;a++){var b=Date._parseExact(g,d[a],c);if(b)return b}}return null};Date._parseExact=function(s,y,j){s=s.trim();var m=j.dateTimeFormat,v=Date._getParseRegExp(m,y),x=(new RegExp(v.regExp)).exec(s);if(x===null)return null;var w=v.groups,f=null,c=null,h=null,g=null,d=0,n=0,o=0,e=0,k=null,r=false;for(var p=0,z=w.length;p<z;p++){var a=x[p+1];if(a)switch(w[p]){case "dd":case "d":h=parseInt(a,10);if(h<1||h>31)return null;break;case "MMMM":c=j._getMonthIndex(a);if(c<0||c>11)return null;break;case "MMM":c=j._getAbbrMonthIndex(a);if(c<0||c>11)return null;break;case "M":case "MM":var c=parseInt(a,10)-1;if(c<0||c>11)return null;break;case "y":case "yy":f=Date._expandYear(m,parseInt(a,10));if(f<0||f>9999)return null;break;case "yyyy":f=parseInt(a,10);if(f<0||f>9999)return null;break;case "h":case "hh":d=parseInt(a,10);if(d===12)d=0;if(d<0||d>11)return null;break;case "H":case "HH":d=parseInt(a,10);if(d<0||d>23)return null;break;case "m":case "mm":n=parseInt(a,10);if(n<0||n>59)return null;break;case "s":case "ss":o=parseInt(a,10);if(o<0||o>59)return null;break;case "tt":case "t":var u=a.toUpperCase();r=u===m.PMDesignator.toUpperCase();if(!r&&u!==m.AMDesignator.toUpperCase())return null;break;case "f":e=parseInt(a,10)*100;if(e<0||e>999)return null;break;case "ff":e=parseInt(a,10)*10;if(e<0||e>999)return null;break;case "fff":e=parseInt(a,10);if(e<0||e>999)return null;break;case "dddd":g=j._getDayIndex(a);if(g<0||g>6)return null;break;case "ddd":g=j._getAbbrDayIndex(a);if(g<0||g>6)return null;break;case "zzz":var q=a.split(/:/);if(q.length!==2)return null;var i=parseInt(q[0],10);if(i<-12||i>13)return null;var l=parseInt(q[1],10);if(l<0||l>59)return null;k=i*60+(a.startsWith("-")?-l:l);break;case "z":case "zz":var i=parseInt(a,10);if(i<-12||i>13)return null;k=i*60}}var b=new Date;if(f===null)f=b.getFullYear();if(c===null)c=b.getMonth();if(h===null)h=b.getDate();b.setFullYear(f,c,h);if(b.getDate()!==h)return null;if(g!==null&&b.getDay()!==g)return null;if(r&&d<12)d+=12;b.setHours(d,n,o,e);if(k!==null){var t=b.getMinutes()-(k+b.getTimezoneOffset());b.setHours(b.getHours()+parseInt(t/60,10),t%60)}return b};Date.prototype.format=function(a){return this._toFormattedString(a,Sys.CultureInfo.InvariantCulture)};Date.prototype.localeFormat=function(a){return this._toFormattedString(a,Sys.CultureInfo.CurrentCulture)};Date.prototype._toFormattedString=function(e,h){if(!e||e.length===0||e==="i")if(h&&h.name.length>0)return this.toLocaleString();else return this.toString();var d=h.dateTimeFormat;e=Date._expandFormat(d,e);var a=new Sys.StringBuilder,b;function c(a){if(a<10)return "0"+a;return a.toString()}function g(a){if(a<10)return "00"+a;if(a<100)return "0"+a;return a.toString()}var j=0,i=Date._getTokenRegExp();for(;true;){var l=i.lastIndex,f=i.exec(e),k=e.slice(l,f?f.index:e.length);j+=Date._appendPreOrPostMatch(k,a);if(!f)break;if(j%2===1){a.append(f[0]);continue}switch(f[0]){case "dddd":a.append(d.DayNames[this.getDay()]);break;case "ddd":a.append(d.AbbreviatedDayNames[this.getDay()]);break;case "dd":a.append(c(this.getDate()));break;case "d":a.append(this.getDate());break;case "MMMM":a.append(d.MonthNames[this.getMonth()]);break;case "MMM":a.append(d.AbbreviatedMonthNames[this.getMonth()]);break;case "MM":a.append(c(this.getMonth()+1));break;case "M":a.append(this.getMonth()+1);break;case "yyyy":a.append(this.getFullYear());break;case "yy":a.append(c(this.getFullYear()%100));break;case "y":a.append(this.getFullYear()%100);break;case "hh":b=this.getHours()%12;if(b===0)b=12;a.append(c(b));break;case "h":b=this.getHours()%12;if(b===0)b=12;a.append(b);break;case "HH":a.append(c(this.getHours()));break;case "H":a.append(this.getHours());break;case "mm":a.append(c(this.getMinutes()));break;case "m":a.append(this.getMinutes());break;case "ss":a.append(c(this.getSeconds()));break;case "s":a.append(this.getSeconds());break;case "tt":a.append(this.getHours()<12?d.AMDesignator:d.PMDesignator);break;case "t":a.append((this.getHours()<12?d.AMDesignator:d.PMDesignator).charAt(0));break;case "f":a.append(g(this.getMilliseconds()).charAt(0));break;case "ff":a.append(g(this.getMilliseconds()).substr(0,2));break;case "fff":a.append(g(this.getMilliseconds()));break;case "z":b=this.getTimezoneOffset()/60;a.append((b<=0?"+":"-")+Math.floor(Math.abs(b)));break;case "zz":b=this.getTimezoneOffset()/60;a.append((b<=0?"+":"-")+c(Math.floor(Math.abs(b))));break;case "zzz":b=this.getTimezoneOffset()/60;a.append((b<=0?"+":"-")+c(Math.floor(Math.abs(b)))+d.TimeSeparator+c(Math.abs(this.getTimezoneOffset()%60)))}}return a.toString()};Number.__typeName="Number";Number.__class=true;Number.parseLocale=function(a){return Number._parse(a,Sys.CultureInfo.CurrentCulture)};Number.parseInvariant=function(a){return Number._parse(a,Sys.CultureInfo.InvariantCulture)};Number._parse=function(b,n){b=b.trim();if(b.match(/^[+-]?infinity$/i))return parseFloat(b);if(b.match(/^0x[a-f0-9]+$/i))return parseInt(b);var a=n.numberFormat,f=Number._parseNumberNegativePattern(b,a,a.NumberNegativePattern),h=f[0],d=f[1];if(h===""&&a.NumberNegativePattern!==1){f=Number._parseNumberNegativePattern(b,a,1);h=f[0];d=f[1]}if(h==="")h="+";var j,c,e=d.indexOf("e");if(e<0)e=d.indexOf("E");if(e<0){c=d;j=null}else{c=d.substr(0,e);j=d.substr(e+1)}var g,k,m=c.indexOf(a.NumberDecimalSeparator);if(m<0){g=c;k=null}else{g=c.substr(0,m);k=c.substr(m+a.NumberDecimalSeparator.length)}g=g.split(a.NumberGroupSeparator).join("");var l=h+g;if(k!==null)l+="."+k;if(j!==null){var i=Number._parseNumberNegativePattern(j,a,1);if(i[0]==="")i[0]="+";l+="e"+i[0]+i[1]}if(l.match(/^[+-]?\d*\.?\d*(e[+-]?\d+)?$/))return parseFloat(l);return Number.NaN};Number._parseNumberNegativePattern=function(a,d,e){var b=d.NegativeSign,c=d.PositiveSign;switch(e){case 4:b=" "+b;c=" "+c;case 3:if(a.endsWith(b))return ["-",a.substr(0,a.length-b.length)];else if(a.endsWith(c))return ["+",a.substr(0,a.length-c.length)];break;case 2:b+=" ";c+=" ";case 1:if(a.startsWith(b))return ["-",a.substr(b.length)];else if(a.startsWith(c))return ["+",a.substr(c.length)];break;case 0:if(a.startsWith("(")&&a.endsWith(")"))return ["-",a.substr(1,a.length-2)]}return ["",a]};Number.prototype.format=function(a){return this._toFormattedString(a,Sys.CultureInfo.InvariantCulture)};Number.prototype.localeFormat=function(a){return this._toFormattedString(a,Sys.CultureInfo.CurrentCulture)};Number.prototype._toFormattedString=function(d,j){if(!d||d.length===0||d==="i")if(j&&j.name.length>0)return this.toLocaleString();else return this.toString();var q=["n %","n%","%n"],p=["-n %","-n%","-%n"],r=["(n)","-n","- n","n-","n -"],o=["$n","n$","$ n","n $"],n=["($n)","-$n","$-n","$n-","(n$)","-n$","n-$","n$-","-n $","-$ n","n $-","$ n-","$ -n","n- $","($ n)","(n $)"];function i(p,k,j,l,o){var e=j[0],g=1,c=p.toString(),a="",m="",i=c.split(".");if(i.length>1){c=i[0];a=i[1];var h=a.split(/e/i);if(h.length>1){a=h[0];m="e"+h[1]}}if(k>0){var f=a.length-k;if(f>0)a=a.slice(0,k);else if(f<0)for(var n=0;n<Math.abs(f);n++)a+="0";a=o+a}else a="";a+=m;var b=c.length-1,d="";while(b>=0){if(e===0||e>b)if(d.length>0)return c.slice(0,b+1)+l+d+a;else return c.slice(0,b+1)+a;if(d.length>0)d=c.slice(b-e+1,b+1)+l+d;else d=c.slice(b-e+1,b+1);b-=e;if(g<j.length){e=j[g];g++}}return c.slice(0,b+1)+l+d+a}var a=j.numberFormat,e=Math.abs(this);if(!d)d="D";var b=-1;if(d.length>1)b=parseInt(d.slice(1),10);var c;switch(d.charAt(0)){case "d":case "D":c="n";if(b!==-1){var g=""+e,k=b-g.length;if(k>0)for(var m=0;m<k;m++)g="0"+g;e=g}if(this<0)e=-e;break;case "c":case "C":if(this<0)c=n[a.CurrencyNegativePattern];else c=o[a.CurrencyPositivePattern];if(b===-1)b=a.CurrencyDecimalDigits;e=i(Math.abs(this),b,a.CurrencyGroupSizes,a.CurrencyGroupSeparator,a.CurrencyDecimalSeparator);break;case "n":case "N":if(this<0)c=r[a.NumberNegativePattern];else c="n";if(b===-1)b=a.NumberDecimalDigits;e=i(Math.abs(this),b,a.NumberGroupSizes,a.NumberGroupSeparator,a.NumberDecimalSeparator);break;case "p":case "P":if(this<0)c=p[a.PercentNegativePattern];else c=q[a.PercentPositivePattern];if(b===-1)b=a.PercentDecimalDigits;e=i(Math.abs(this),b,a.PercentGroupSizes,a.PercentGroupSeparator,a.PercentDecimalSeparator);break;default:throw Error.format(Sys.Res.formatBadFormatSpecifier)}var l=/n|\$|-|%/g,f="";for(;true;){var s=l.lastIndex,h=l.exec(c);f+=c.slice(s,h?h.index:c.length);if(!h)break;switch(h[0]){case "n":f+=e;break;case "$":f+=a.CurrencySymbol;break;case "-":f+=a.NegativeSign;break;case "%":f+=a.PercentSymbol}}return f};RegExp.__typeName="RegExp";RegExp.__class=true;Array.__typeName="Array";Array.__class=true;Array.add=Array.enqueue=function(a,b){a[a.length]=b};Array.addRange=function(a,b){a.push.apply(a,b)};Array.clear=function(a){a.length=0};Array.clone=function(a){if(a.length===1)return [a[0]];else return Array.apply(null,a)};Array.contains=function(a,b){return Array.indexOf(a,b)>=0};Array.dequeue=function(a){return a.shift()};Array.forEach=function(b,e,d){for(var a=0,f=b.length;a<f;a++){var c=b[a];if(typeof c!=="undefined")e.call(d,c,a,b)}};Array.indexOf=function(d,e,a){if(typeof e==="undefined")return -1;var c=d.length;if(c!==0){a=a-0;if(isNaN(a))a=0;else{if(isFinite(a))a=a-a%1;if(a<0)a=Math.max(0,c+a)}for(var b=a;b<c;b++)if(typeof d[b]!=="undefined"&&d[b]===e)return b}return -1};Array.insert=function(a,b,c){a.splice(b,0,c)};Array.parse=function(value){if(!value)return [];return eval(value)};Array.remove=function(b,c){var a=Array.indexOf(b,c);if(a>=0)b.splice(a,1);return a>=0};Array.removeAt=function(a,b){a.splice(b,1)};if(!window)this.window=this;window.Type=Function;Type.prototype.callBaseMethod=function(a,d,b){var c=this.getBaseMethod(a,d);if(!b)return c.apply(a);else return c.apply(a,b)};Type.prototype.getBaseMethod=function(d,c){var b=this.getBaseType();if(b){var a=b.prototype[c];return a instanceof Function?a:null}return null};Type.prototype.getBaseType=function(){return typeof this.__baseType==="undefined"?null:this.__baseType};Type.prototype.getInterfaces=function(){var a=[],b=this;while(b){var c=b.__interfaces;if(c)for(var d=0,f=c.length;d<f;d++){var e=c[d];if(!Array.contains(a,e))a[a.length]=e}b=b.__baseType}return a};Type.prototype.getName=function(){return typeof this.__typeName==="undefined"?"":this.__typeName};Type.prototype.implementsInterface=function(d){this.resolveInheritance();var c=d.getName(),a=this.__interfaceCache;if(a){var e=a[c];if(typeof e!=="undefined")return e}else a=this.__interfaceCache={};var b=this;while(b){var f=b.__interfaces;if(f)if(Array.indexOf(f,d)!==-1)return a[c]=true;b=b.__baseType}return a[c]=false};Type.prototype.inheritsFrom=function(b){this.resolveInheritance();var a=this.__baseType;while(a){if(a===b)return true;a=a.__baseType}return false};Type.prototype.initializeBase=function(a,b){this.resolveInheritance();if(this.__baseType)if(!b)this.__baseType.apply(a);else this.__baseType.apply(a,b);return a};Type.prototype.isImplementedBy=function(a){if(typeof a==="undefined"||a===null)return false;var b=Object.getType(a);return !!(b.implementsInterface&&b.implementsInterface(this))};Type.prototype.isInstanceOfType=function(b){if(typeof b==="undefined"||b===null)return false;if(b instanceof this)return true;var a=Object.getType(b);return !!(a===this)||a.inheritsFrom&&a.inheritsFrom(this)||a.implementsInterface&&a.implementsInterface(this)};Type.prototype.registerClass=function(c,b,d){this.prototype.constructor=this;this.__typeName=c;this.__class=true;if(b){this.__baseType=b;this.__basePrototypePending=true}Sys.__upperCaseTypes[c.toUpperCase()]=this;if(d){this.__interfaces=[];for(var a=2,f=arguments.length;a<f;a++){var e=arguments[a];this.__interfaces.push(e)}}return this};Type.prototype.registerInterface=function(a){Sys.__upperCaseTypes[a.toUpperCase()]=this;this.prototype.constructor=this;this.__typeName=a;this.__interface=true;return this};Type.prototype.resolveInheritance=function(){if(this.__basePrototypePending){var b=this.__baseType;b.resolveInheritance();for(var a in b.prototype){var c=b.prototype[a];if(!this.prototype[a])this.prototype[a]=c}delete this.__basePrototypePending}};Type.getRootNamespaces=function(){return Array.clone(Sys.__rootNamespaces)};Type.isClass=function(a){if(typeof a==="undefined"||a===null)return false;return !!a.__class};Type.isInterface=function(a){if(typeof a==="undefined"||a===null)return false;return !!a.__interface};Type.isNamespace=function(a){if(typeof a==="undefined"||a===null)return false;return !!a.__namespace};Type.parse=function(typeName,ns){var fn;if(ns){fn=Sys.__upperCaseTypes[ns.getName().toUpperCase()+"."+typeName.toUpperCase()];return fn||null}if(!typeName)return null;if(!Type.__htClasses)Type.__htClasses={};fn=Type.__htClasses[typeName];if(!fn){fn=eval(typeName);Type.__htClasses[typeName]=fn}return fn};Type.registerNamespace=function(f){var d=window,c=f.split(".");for(var b=0;b<c.length;b++){var e=c[b],a=d[e];if(!a){a=d[e]={__namespace:true,__typeName:c.slice(0,b+1).join(".")};if(b===0)Sys.__rootNamespaces[Sys.__rootNamespaces.length]=a;a.getName=function(){return this.__typeName}}d=a}};window.Sys={__namespace:true,__typeName:"Sys",getName:function(){return "Sys"},__upperCaseTypes:{}};Sys.__rootNamespaces=[Sys];Sys.IDisposable=function(){};Sys.IDisposable.prototype={};Sys.IDisposable.registerInterface("Sys.IDisposable");Sys.StringBuilder=function(a){this._parts=typeof a!=="undefined"&&a!==null&&a!==""?[a.toString()]:[];this._value={};this._len=0};Sys.StringBuilder.prototype={append:function(a){this._parts[this._parts.length]=a},appendLine:function(a){this._parts[this._parts.length]=typeof a==="undefined"||a===null||a===""?"\r\n":a+"\r\n"},clear:function(){this._parts=[];this._value={};this._len=0},isEmpty:function(){if(this._parts.length===0)return true;return this.toString()===""},toString:function(a){a=a||"";var b=this._parts;if(this._len!==b.length){this._value={};this._len=b.length}var d=this._value;if(typeof d[a]==="undefined"){if(a!=="")for(var c=0;c<b.length;)if(typeof b[c]==="undefined"||b[c]===""||b[c]===null)b.splice(c,1);else c++;d[a]=this._parts.join(a)}return d[a]}};Sys.StringBuilder.registerClass("Sys.StringBuilder");if(!window.XMLHttpRequest)window.XMLHttpRequest=function(){var b=["Mxsml2.XMLHTTP.3.0","Msxml2.XMLHTTP"];for(var a=0,c=b.length;a<c;a++)try{return new ActiveXObject(b[a])}catch(d){}return null};Sys.Browser={};Sys.Browser.InternetExplorer={};Sys.Browser.Firefox={};Sys.Browser.Safari={};Sys.Browser.Opera={};Sys.Browser.agent=null;Sys.Browser.hasDebuggerStatement=false;Sys.Browser.name=navigator.appName;Sys.Browser.version=parseFloat(navigator.appVersion);if(navigator.userAgent.indexOf(" MSIE ")>-1){Sys.Browser.agent=Sys.Browser.InternetExplorer;Sys.Browser.version=parseFloat(navigator.userAgent.match(/MSIE (\d+\.\d+)/)[1]);Sys.Browser.hasDebuggerStatement=true}else if(navigator.userAgent.indexOf(" Firefox/")>-1){Sys.Browser.agent=Sys.Browser.Firefox;Sys.Browser.version=parseFloat(navigator.userAgent.match(/Firefox\/(\d+\.\d+)/)[1]);Sys.Browser.name="Firefox";Sys.Browser.hasDebuggerStatement=true}else if(navigator.userAgent.indexOf(" Safari/")>-1){Sys.Browser.agent=Sys.Browser.Safari;Sys.Browser.version=parseFloat(navigator.userAgent.match(/Safari\/(\d+(\.\d+)?)/)[1]);Sys.Browser.name="Safari"}else if(navigator.userAgent.indexOf("Opera/")>-1)Sys.Browser.agent=Sys.Browser.Opera;Type.registerNamespace("Sys.UI");Sys._Debug=function(){};Sys._Debug.prototype={_appendConsole:function(a){if(typeof Debug!=="undefined"&&Debug.writeln)Debug.writeln(a);if(window.console&&window.console.log)window.console.log(a);if(window.opera)window.opera.postError(a);if(window.debugService)window.debugService.trace(a)},_appendTrace:function(b){var a=document.getElementById("TraceConsole");if(a&&a.tagName.toUpperCase()==="TEXTAREA")a.value+=b+"\n"},assert:function(c,a,b){if(!c){a=b&&this.assert.caller?String.format(Sys.Res.assertFailedCaller,a,this.assert.caller):String.format(Sys.Res.assertFailed,a);if(confirm(String.format(Sys.Res.breakIntoDebugger,a)))this.fail(a)}},clearTrace:function(){var a=document.getElementById("TraceConsole");if(a&&a.tagName.toUpperCase()==="TEXTAREA")a.value=""},fail:function(message){this._appendConsole(message);if(Sys.Browser.hasDebuggerStatement)eval("debugger")},trace:function(a){this._appendConsole(a);this._appendTrace(a)},traceDump:function(a,b){var c=this._traceDump(a,b,true)},_traceDump:function(a,c,f,b,d){c=c?c:"traceDump";b=b?b:"";if(a===null){this.trace(b+c+": null");return}switch(typeof a){case "undefined":this.trace(b+c+": Undefined");break;case "number":case "string":case "boolean":this.trace(b+c+": "+a);break;default:if(Date.isInstanceOfType(a)||RegExp.isInstanceOfType(a)){this.trace(b+c+": "+a.toString());break}if(!d)d=[];else if(Array.contains(d,a)){this.trace(b+c+": ...");return}Array.add(d,a);if(a==window||a===document||window.HTMLElement&&a instanceof HTMLElement||typeof a.nodeName==="string"){var k=a.tagName?a.tagName:"DomElement";if(a.id)k+=" - "+a.id;this.trace(b+c+" {"+k+"}")}else{var i=Object.getTypeName(a);this.trace(b+c+(typeof i==="string"?" {"+i+"}":""));if(b===""||f){b+="    ";var e,j,l,g,h;if(Array.isInstanceOfType(a)){j=a.length;for(e=0;e<j;e++)this._traceDump(a[e],"["+e+"]",f,b,d)}else for(g in a){h=a[g];if(!Function.isInstanceOfType(h))this._traceDump(h,g,f,b,d)}}}Array.remove(d,a)}}};Sys._Debug.registerClass("Sys._Debug");Sys.Debug=new Sys._Debug;Sys.Debug.isDebug=false;function Sys$Enum$parse(c,e){var a,b,i;if(e){a=this.__lowerCaseValues;if(!a){this.__lowerCaseValues=a={};var g=this.prototype;for(var f in g)a[f.toLowerCase()]=g[f]}}else a=this.prototype;if(!this.__flags){i=e?c.toLowerCase():c;b=a[i.trim()];if(typeof b!=="number")throw Error.argument("value",String.format(Sys.Res.enumInvalidValue,c,this.__typeName));return b}else{var h=(e?c.toLowerCase():c).split(","),j=0;for(var d=h.length-1;d>=0;d--){var k=h[d].trim();b=a[k];if(typeof b!=="number")throw Error.argument("value",String.format(Sys.Res.enumInvalidValue,c.split(",")[d].trim(),this.__typeName));j|=b}return j}}function Sys$Enum$toString(c){if(typeof c==="undefined"||c===null)return this.__string;var d=this.prototype,a;if(!this.__flags||c===0){for(a in d)if(d[a]===c)return a}else{var b=this.__sortedValues;if(!b){b=[];for(a in d)b[b.length]={key:a,value:d[a]};b.sort(function(a,b){return a.value-b.value});this.__sortedValues=b}var e=[],g=c;for(a=b.length-1;a>=0;a--){var h=b[a],f=h.value;if(f===0)continue;if((f&c)===f){e[e.length]=h.key;g-=f;if(g===0)break}}if(e.length&&g===0)return e.reverse().join(", ")}return ""}Type.prototype.registerEnum=function(b,c){Sys.__upperCaseTypes[b.toUpperCase()]=this;for(var a in this.prototype)this[a]=this.prototype[a];this.__typeName=b;this.parse=Sys$Enum$parse;this.__string=this.toString();this.toString=Sys$Enum$toString;this.__flags=c;this.__enum=true};Type.isEnum=function(a){if(typeof a==="undefined"||a===null)return false;return !!a.__enum};Type.isFlags=function(a){if(typeof a==="undefined"||a===null)return false;return !!a.__flags};Sys.EventHandlerList=function(){this._list={}};Sys.EventHandlerList.prototype={addHandler:function(b,a){Array.add(this._getEvent(b,true),a)},removeHandler:function(c,b){var a=this._getEvent(c);if(!a)return;Array.remove(a,b)},getHandler:function(b){var a=this._getEvent(b);if(!a||a.length===0)return null;a=Array.clone(a);return function(c,d){for(var b=0,e=a.length;b<e;b++)a[b](c,d)}},_getEvent:function(a,b){if(!this._list[a]){if(!b)return null;this._list[a]=[]}return this._list[a]}};Sys.EventHandlerList.registerClass("Sys.EventHandlerList");Sys.EventArgs=function(){};Sys.EventArgs.registerClass("Sys.EventArgs");Sys.EventArgs.Empty=new Sys.EventArgs;Sys.CancelEventArgs=function(){Sys.CancelEventArgs.initializeBase(this);this._cancel=false};Sys.CancelEventArgs.prototype={get_cancel:function(){return this._cancel},set_cancel:function(a){this._cancel=a}};Sys.CancelEventArgs.registerClass("Sys.CancelEventArgs",Sys.EventArgs);Sys.INotifyPropertyChange=function(){};Sys.INotifyPropertyChange.prototype={};Sys.INotifyPropertyChange.registerInterface("Sys.INotifyPropertyChange");Sys.PropertyChangedEventArgs=function(a){Sys.PropertyChangedEventArgs.initializeBase(this);this._propertyName=a};Sys.PropertyChangedEventArgs.prototype={get_propertyName:function(){return this._propertyName}};Sys.PropertyChangedEventArgs.registerClass("Sys.PropertyChangedEventArgs",Sys.EventArgs);Sys.INotifyDisposing=function(){};Sys.INotifyDisposing.prototype={};Sys.INotifyDisposing.registerInterface("Sys.INotifyDisposing");Sys.Component=function(){if(Sys.Application)Sys.Application.registerDisposableObject(this)};Sys.Component.prototype={_id:null,_initialized:false,_updating:false,get_events:function(){if(!this._events)this._events=new Sys.EventHandlerList;return this._events},get_id:function(){return this._id},set_id:function(a){this._id=a},get_isInitialized:function(){return this._initialized},get_isUpdating:function(){return this._updating},add_disposing:function(a){this.get_events().addHandler("disposing",a)},remove_disposing:function(a){this.get_events().removeHandler("disposing",a)},add_propertyChanged:function(a){this.get_events().addHandler("propertyChanged",a)},remove_propertyChanged:function(a){this.get_events().removeHandler("propertyChanged",a)},beginUpdate:function(){this._updating=true},dispose:function(){if(this._events){var a=this._events.getHandler("disposing");if(a)a(this,Sys.EventArgs.Empty)}delete this._events;Sys.Application.unregisterDisposableObject(this);Sys.Application.removeComponent(this)},endUpdate:function(){this._updating=false;if(!this._initialized)this.initialize();this.updated()},initialize:function(){this._initialized=true},raisePropertyChanged:function(b){if(!this._events)return;var a=this._events.getHandler("propertyChanged");if(a)a(this,new Sys.PropertyChangedEventArgs(b))},updated:function(){}};Sys.Component.registerClass("Sys.Component",null,Sys.IDisposable,Sys.INotifyPropertyChange,Sys.INotifyDisposing);function Sys$Component$_setProperties(a,i){var d,j=Object.getType(a),e=j===Object||j===Sys.UI.DomElement,h=Sys.Component.isInstanceOfType(a)&&!a.get_isUpdating();if(h)a.beginUpdate();for(var c in i){var b=i[c],f=e?null:a["get_"+c];if(e||typeof f!=="function"){var k=a[c];if(!b||typeof b!=="object"||e&&!k)a[c]=b;else Sys$Component$_setProperties(k,b)}else{var l=a["set_"+c];if(typeof l==="function")l.apply(a,[b]);else if(b instanceof Array){d=f.apply(a);for(var g=0,m=d.length,n=b.length;g<n;g++,m++)d[m]=b[g]}else if(typeof b==="object"&&Object.getType(b)===Object){d=f.apply(a);Sys$Component$_setProperties(d,b)}}}if(h)a.endUpdate()}function Sys$Component$_setReferences(c,b){for(var a in b){var e=c["set_"+a],d=$find(b[a]);e.apply(c,[d])}}var $create=Sys.Component.create=function(h,f,d,c,g){var a=g?new h(g):new h,b=Sys.Application,i=b.get_isCreatingComponents();a.beginUpdate();if(f)Sys$Component$_setProperties(a,f);if(d)for(var e in d)a["add_"+e](d[e]);if(a.get_id())b.addComponent(a);if(i){b._createdComponents[b._createdComponents.length]=a;if(c)b._addComponentToSecondPass(a,c);else a.endUpdate()}else{if(c)Sys$Component$_setReferences(a,c);a.endUpdate()}return a};Sys.UI.MouseButton=function(){throw Error.notImplemented()};Sys.UI.MouseButton.prototype={leftButton:0,middleButton:1,rightButton:2};Sys.UI.MouseButton.registerEnum("Sys.UI.MouseButton");Sys.UI.Key=function(){throw Error.notImplemented()};Sys.UI.Key.prototype={backspace:8,tab:9,enter:13,esc:27,space:32,pageUp:33,pageDown:34,end:35,home:36,left:37,up:38,right:39,down:40,del:127};Sys.UI.Key.registerEnum("Sys.UI.Key");Sys.UI.Point=function(a,b){this.x=a;this.y=b};Sys.UI.Point.registerClass("Sys.UI.Point");Sys.UI.Bounds=function(c,d,b,a){this.x=c;this.y=d;this.height=a;this.width=b};Sys.UI.Bounds.registerClass("Sys.UI.Bounds");Sys.UI.DomEvent=function(d){var a=d;this.rawEvent=a;this.altKey=a.altKey;if(typeof a.button!=="undefined")this.button=typeof a.which!=="undefined"?a.button:a.button===4?Sys.UI.MouseButton.middleButton:a.button===2?Sys.UI.MouseButton.rightButton:Sys.UI.MouseButton.leftButton;if(a.type==="keypress")this.charCode=a.charCode||a.keyCode;else if(a.keyCode&&a.keyCode===46)this.keyCode=127;else this.keyCode=a.keyCode;this.clientX=a.clientX;this.clientY=a.clientY;this.ctrlKey=a.ctrlKey;this.target=a.target?a.target:a.srcElement;if(typeof a.offsetX!=="undefined"&&typeof a.offsetY!=="undefined"){this.offsetX=a.offsetX;this.offsetY=a.offsetY}else if(this.target&&this.target.nodeType!==3&&typeof a.clientX==="number"){var b=Sys.UI.DomElement.getLocation(this.target),c=Sys.UI.DomElement._getWindow(this.target);this.offsetX=(c.pageXOffset||0)+a.clientX-b.x;this.offsetY=(c.pageYOffset||0)+a.clientY-b.y}this.screenX=a.screenX;this.screenY=a.screenY;this.shiftKey=a.shiftKey;this.type=a.type};Sys.UI.DomEvent.prototype={preventDefault:function(){if(this.rawEvent.preventDefault)this.rawEvent.preventDefault();else if(window.event)this.rawEvent.returnValue=false},stopPropagation:function(){if(this.rawEvent.stopPropagation)this.rawEvent.stopPropagation();else if(window.event)this.rawEvent.cancelBubble=true}};Sys.UI.DomEvent.registerClass("Sys.UI.DomEvent");var $addHandler=Sys.UI.DomEvent.addHandler=function(a,d,e){if(!a._events)a._events={};var c=a._events[d];if(!c)a._events[d]=c=[];var b;if(a.addEventListener){b=function(b){return e.call(a,new Sys.UI.DomEvent(b))};a.addEventListener(d,b,false)}else if(a.attachEvent){b=function(){var b={};try{b=Sys.UI.DomElement._getWindow(a).event}catch(c){}return e.call(a,new Sys.UI.DomEvent(b))};a.attachEvent("on"+d,b)}c[c.length]={handler:e,browserHandler:b}},$addHandlers=Sys.UI.DomEvent.addHandlers=function(e,d,c){for(var b in d){var a=d[b];if(c)a=Function.createDelegate(c,a);$addHandler(e,b,a)}},$clearHandlers=Sys.UI.DomEvent.clearHandlers=function(a){if(a._events){var e=a._events;for(var b in e){var d=e[b];for(var c=d.length-1;c>=0;c--)$removeHandler(a,b,d[c].handler)}a._events=null}},$removeHandler=Sys.UI.DomEvent.removeHandler=function(a,e,f){var d=null,c=a._events[e];for(var b=0,g=c.length;b<g;b++)if(c[b].handler===f){d=c[b].browserHandler;break}if(a.removeEventListener)a.removeEventListener(e,d,false);else if(a.detachEvent)a.detachEvent("on"+e,d);c.splice(b,1)};Sys.UI.DomElement=function(){};Sys.UI.DomElement.registerClass("Sys.UI.DomElement");Sys.UI.DomElement.addCssClass=function(a,b){if(!Sys.UI.DomElement.containsCssClass(a,b))if(a.className==="")a.className=b;else a.className+=" "+b};Sys.UI.DomElement.containsCssClass=function(b,a){return Array.contains(b.className.split(" "),a)};Sys.UI.DomElement.getBounds=function(a){var b=Sys.UI.DomElement.getLocation(a);return new Sys.UI.Bounds(b.x,b.y,a.offsetWidth||0,a.offsetHeight||0)};var $get=Sys.UI.DomElement.getElementById=function(f,e){if(!e)return document.getElementById(f);if(e.getElementById)return e.getElementById(f);var c=[],d=e.childNodes;for(var b=0;b<d.length;b++){var a=d[b];if(a.nodeType==1)c[c.length]=a}while(c.length){a=c.shift();if(a.id==f)return a;d=a.childNodes;for(b=0;b<d.length;b++){a=d[b];if(a.nodeType==1)c[c.length]=a}}return null};switch(Sys.Browser.agent){case Sys.Browser.InternetExplorer:Sys.UI.DomElement.getLocation=function(a){if(a.self||a.nodeType===9)return new Sys.UI.Point(0,0);var b=a.getBoundingClientRect();if(!b)return new Sys.UI.Point(0,0);var d=a.ownerDocument.documentElement,e=b.left-2+d.scrollLeft,f=b.top-2+d.scrollTop;try{var c=a.ownerDocument.parentWindow.frameElement||null;if(c){var g=c.frameBorder==="0"||c.frameBorder==="no"?2:0;e+=g;f+=g}}catch(h){}return new Sys.UI.Point(e,f)};break;case Sys.Browser.Safari:Sys.UI.DomElement.getLocation=function(c){if(c.window&&c.window===c||c.nodeType===9)return new Sys.UI.Point(0,0);var f=0,g=0,j=null,e=null,b;for(var a=c;a;j=a,(e=b,a=a.offsetParent)){b=Sys.UI.DomElement._getCurrentStyle(a);var d=a.tagName;if((a.offsetLeft||a.offsetTop)&&(d!=="BODY"||(!e||e.position!=="absolute"))){f+=a.offsetLeft;g+=a.offsetTop}}b=Sys.UI.DomElement._getCurrentStyle(c);var h=b?b.position:null;if(!h||h!=="absolute")for(var a=c.parentNode;a;a=a.parentNode){d=a.tagName;if(d!=="BODY"&&d!=="HTML"&&(a.scrollLeft||a.scrollTop)){f-=a.scrollLeft||0;g-=a.scrollTop||0}b=Sys.UI.DomElement._getCurrentStyle(a);var i=b?b.position:null;if(i&&i==="absolute")break}return new Sys.UI.Point(f,g)};break;case Sys.Browser.Opera:Sys.UI.DomElement.getLocation=function(b){if(b.window&&b.window===b||b.nodeType===9)return new Sys.UI.Point(0,0);var d=0,e=0,i=null;for(var a=b;a;i=a,a=a.offsetParent){var f=a.tagName;d+=a.offsetLeft||0;e+=a.offsetTop||0}var g=b.style.position,c=g&&g!=="static";for(var a=b.parentNode;a;a=a.parentNode){f=a.tagName;if(f!=="BODY"&&f!=="HTML"&&(a.scrollLeft||a.scrollTop)&&(c&&(a.style.overflow==="scroll"||a.style.overflow==="auto"))){d-=a.scrollLeft||0;e-=a.scrollTop||0}var h=a&&a.style?a.style.position:null;c=c||h&&h!=="static"}return new Sys.UI.Point(d,e)};break;default:Sys.UI.DomElement.getLocation=function(d){if(d.window&&d.window===d||d.nodeType===9)return new Sys.UI.Point(0,0);var e=0,f=0,i=null,g=null,b=null;for(var a=d;a;i=a,(g=b,a=a.offsetParent)){var c=a.tagName;b=Sys.UI.DomElement._getCurrentStyle(a);if((a.offsetLeft||a.offsetTop)&&!(c==="BODY"&&(!g||g.position!=="absolute"))){e+=a.offsetLeft;f+=a.offsetTop}if(i!==null&&b){if(c!=="TABLE"&&c!=="TD"&&c!=="HTML"){e+=parseInt(b.borderLeftWidth)||0;f+=parseInt(b.borderTopWidth)||0}if(c==="TABLE"&&(b.position==="relative"||b.position==="absolute")){e+=parseInt(b.marginLeft)||0;f+=parseInt(b.marginTop)||0}}}b=Sys.UI.DomElement._getCurrentStyle(d);var h=b?b.position:null;if(!h||h!=="absolute")for(var a=d.parentNode;a;a=a.parentNode){c=a.tagName;if(c!=="BODY"&&c!=="HTML"&&(a.scrollLeft||a.scrollTop)){e-=a.scrollLeft||0;f-=a.scrollTop||0;b=Sys.UI.DomElement._getCurrentStyle(a);if(b){e+=parseInt(b.borderLeftWidth)||0;f+=parseInt(b.borderTopWidth)||0}}}return new Sys.UI.Point(e,f)}}Sys.UI.DomElement.removeCssClass=function(d,c){var a=" "+d.className+" ",b=a.indexOf(" "+c+" ");if(b>=0)d.className=(a.substr(0,b)+" "+a.substring(b+c.length+1,a.length)).trim()};Sys.UI.DomElement.setLocation=function(b,c,d){var a=b.style;a.position="absolute";a.left=c+"px";a.top=d+"px"};Sys.UI.DomElement.toggleCssClass=function(b,a){if(Sys.UI.DomElement.containsCssClass(b,a))Sys.UI.DomElement.removeCssClass(b,a);else Sys.UI.DomElement.addCssClass(b,a)};Sys.UI.DomElement.getVisibilityMode=function(a){return a._visibilityMode===Sys.UI.VisibilityMode.hide?Sys.UI.VisibilityMode.hide:Sys.UI.VisibilityMode.collapse};Sys.UI.DomElement.setVisibilityMode=function(a,b){Sys.UI.DomElement._ensureOldDisplayMode(a);if(a._visibilityMode!==b){a._visibilityMode=b;if(Sys.UI.DomElement.getVisible(a)===false)if(a._visibilityMode===Sys.UI.VisibilityMode.hide)a.style.display=a._oldDisplayMode;else a.style.display="none";a._visibilityMode=b}};Sys.UI.DomElement.getVisible=function(b){var a=b.currentStyle||Sys.UI.DomElement._getCurrentStyle(b);if(!a)return true;return a.visibility!=="hidden"&&a.display!=="none"};Sys.UI.DomElement.setVisible=function(a,b){if(b!==Sys.UI.DomElement.getVisible(a)){Sys.UI.DomElement._ensureOldDisplayMode(a);a.style.visibility=b?"visible":"hidden";if(b||a._visibilityMode===Sys.UI.VisibilityMode.hide)a.style.display=a._oldDisplayMode;else a.style.display="none"}};Sys.UI.DomElement._ensureOldDisplayMode=function(a){if(!a._oldDisplayMode){var b=a.currentStyle||Sys.UI.DomElement._getCurrentStyle(a);a._oldDisplayMode=b?b.display:null;if(!a._oldDisplayMode||a._oldDisplayMode==="none")switch(a.tagName.toUpperCase()){case "DIV":case "P":case "ADDRESS":case "BLOCKQUOTE":case "BODY":case "COL":case "COLGROUP":case "DD":case "DL":case "DT":case "FIELDSET":case "FORM":case "H1":case "H2":case "H3":case "H4":case "H5":case "H6":case "HR":case "IFRAME":case "LEGEND":case "OL":case "PRE":case "TABLE":case "TD":case "TH":case "TR":case "UL":a._oldDisplayMode="block";break;case "LI":a._oldDisplayMode="list-item";break;default:a._oldDisplayMode="inline"}}};Sys.UI.DomElement._getWindow=function(a){var b=a.ownerDocument||a.document||a;return b.defaultView||b.parentWindow};Sys.UI.DomElement._getCurrentStyle=function(a){if(a.nodeType===3)return null;var c=Sys.UI.DomElement._getWindow(a);if(a.documentElement)a=a.documentElement;var b=c&&a!==c&&c.getComputedStyle?c.getComputedStyle(a,null):a.currentStyle||a.style;if(!b&&Sys.Browser.agent===Sys.Browser.Safari&&a.style){var g=a.style.display,f=a.style.position;a.style.position="absolute";a.style.display="block";var e=c.getComputedStyle(a,null);a.style.display=g;a.style.position=f;b={};for(var d in e)b[d]=e[d];b.display="none"}return b};Sys.IContainer=function(){};Sys.IContainer.prototype={};Sys.IContainer.registerInterface("Sys.IContainer");Sys._ScriptLoader=function(){this._scriptsToLoad=null;this._scriptLoadedDelegate=Function.createDelegate(this,this._scriptLoadedHandler)};Sys._ScriptLoader.prototype={dispose:function(){this._stopLoading();if(this._events)delete this._events;this._scriptLoadedDelegate=null},loadScripts:function(a,c,d,b){this._loading=true;this._allScriptsLoadedCallback=c;this._scriptLoadFailedCallback=d;this._scriptLoadTimeoutCallback=b;if(a>0)this._timeoutCookie=window.setTimeout(Function.createDelegate(this,this._scriptLoadTimeoutHandler),a*1000);this._loadScriptsInternal()},notifyScriptLoaded:function(){if(!this._loading)return;this._currentTask._notified++;if(Sys.Browser.agent===Sys.Browser.Safari)if(this._currentTask._notified===1)window.setTimeout(Function.createDelegate(this,function(){this._scriptLoadedHandler(this._currentTask.get_scriptElement(),true)}),0)},queueCustomScriptTag:function(a){if(!this._scriptsToLoad)this._scriptsToLoad=[];Array.add(this._scriptsToLoad,a)},queueScriptBlock:function(a){if(!this._scriptsToLoad)this._scriptsToLoad=[];Array.add(this._scriptsToLoad,{text:a})},queueScriptReference:function(a){if(!this._scriptsToLoad)this._scriptsToLoad=[];Array.add(this._scriptsToLoad,{src:a})},_createScriptElement:function(c){var a=document.createElement("SCRIPT");a.type="text/javascript";for(var b in c)a[b]=c[b];return a},_loadScriptsInternal:function(){if(this._scriptsToLoad&&this._scriptsToLoad.length>0){var b=Array.dequeue(this._scriptsToLoad),a=this._createScriptElement(b);if(a.text&&Sys.Browser.agent===Sys.Browser.Safari){a.innerHTML=a.text;delete a.text}if(typeof b.src==="string"){this._currentTask=new Sys._ScriptLoaderTask(a,this._scriptLoadedDelegate);this._currentTask.execute()}else{document.getElementsByTagName("HEAD")[0].appendChild(a);var d=this;window.setTimeout(function(){Sys._ScriptLoader._clearScript(a);d._loadScriptsInternal()},0)}}else{var c=this._allScriptsLoadedCallback;this._stopLoading();if(c)c(this)}},_raiseError:function(a){var c=this._scriptLoadFailedCallback,b=this._currentTask.get_scriptElement();this._stopLoading();if(c)c(this,b,a);else throw Sys._ScriptLoader._errorScriptLoadFailed(b.src,a)},_scriptLoadedHandler:function(a,b){if(b&&this._currentTask._notified)if(this._currentTask._notified>1)this._raiseError(true);else{Array.add(Sys._ScriptLoader._getLoadedScripts(),a.src);this._currentTask.dispose();this._currentTask=null;this._loadScriptsInternal()}else this._raiseError(false)},_scriptLoadTimeoutHandler:function(){var a=this._scriptLoadTimeoutCallback;this._stopLoading();if(a)a(this)},_stopLoading:function(){if(this._timeoutCookie){window.clearTimeout(this._timeoutCookie);this._timeoutCookie=null}if(this._currentTask){this._currentTask.dispose();this._currentTask=null}this._scriptsToLoad=null;this._loading=null;this._allScriptsLoadedCallback=null;this._scriptLoadFailedCallback=null;this._scriptLoadTimeoutCallback=null}};Sys._ScriptLoader.registerClass("Sys._ScriptLoader",null,Sys.IDisposable);Sys._ScriptLoader.getInstance=function(){var a=Sys._ScriptLoader._activeInstance;if(!a)a=Sys._ScriptLoader._activeInstance=new Sys._ScriptLoader;return a};Sys._ScriptLoader.isScriptLoaded=function(b){var a=document.createElement("script");a.src=b;return Array.contains(Sys._ScriptLoader._getLoadedScripts(),a.src)};Sys._ScriptLoader.readLoadedScripts=function(){if(!Sys._ScriptLoader._referencedScripts){var b=Sys._ScriptLoader._referencedScripts=[],c=document.getElementsByTagName("SCRIPT");for(i=c.length-1;i>=0;i--){var d=c[i],a=d.src;if(a.length)if(!Array.contains(b,a))Array.add(b,a)}}};Sys._ScriptLoader._clearScript=function(a){if(!Sys.Debug.isDebug)a.parentNode.removeChild(a)};Sys._ScriptLoader._errorScriptLoadFailed=function(b,d){var a;if(d)a=Sys.Res.scriptLoadMultipleCallbacks;else a=Sys.Res.scriptLoadFailed;var e="Sys.ScriptLoadFailedException: "+String.format(a,b),c=Error.create(e,{name:"Sys.ScriptLoadFailedException","scriptUrl":b});c.popStackFrame();return c};Sys._ScriptLoader._getLoadedScripts=function(){if(!Sys._ScriptLoader._referencedScripts){Sys._ScriptLoader._referencedScripts=[];Sys._ScriptLoader.readLoadedScripts()}return Sys._ScriptLoader._referencedScripts};Sys._ScriptLoaderTask=function(b,a){this._scriptElement=b;this._completedCallback=a;this._notified=0};Sys._ScriptLoaderTask.prototype={get_scriptElement:function(){return this._scriptElement},dispose:function(){if(this._disposed)return;this._disposed=true;this._removeScriptElementHandlers();Sys._ScriptLoader._clearScript(this._scriptElement);this._scriptElement=null},execute:function(){this._addScriptElementHandlers();document.getElementsByTagName("HEAD")[0].appendChild(this._scriptElement)},_addScriptElementHandlers:function(){this._scriptLoadDelegate=Function.createDelegate(this,this._scriptLoadHandler);if(Sys.Browser.agent!==Sys.Browser.InternetExplorer){this._scriptElement.readyState="loaded";$addHandler(this._scriptElement,"load",this._scriptLoadDelegate)}else $addHandler(this._scriptElement,"readystatechange",this._scriptLoadDelegate);if(this._scriptElement.addEventListener){this._scriptErrorDelegate=Function.createDelegate(this,this._scriptErrorHandler);this._scriptElement.addEventListener("error",this._scriptErrorDelegate,false)}},_removeScriptElementHandlers:function(){if(this._scriptLoadDelegate){var a=this.get_scriptElement();if(Sys.Browser.agent!==Sys.Browser.InternetExplorer)$removeHandler(a,"load",this._scriptLoadDelegate);else $removeHandler(a,"readystatechange",this._scriptLoadDelegate);if(this._scriptErrorDelegate){this._scriptElement.removeEventListener("error",this._scriptErrorDelegate,false);this._scriptErrorDelegate=null}this._scriptLoadDelegate=null}},_scriptErrorHandler:function(){if(this._disposed)return;this._completedCallback(this.get_scriptElement(),false)},_scriptLoadHandler:function(){if(this._disposed)return;var a=this.get_scriptElement();if(a.readyState!=="loaded"&&a.readyState!=="complete")return;var b=this;window.setTimeout(function(){b._completedCallback(a,true)},0)}};Sys._ScriptLoaderTask.registerClass("Sys._ScriptLoaderTask",null,Sys.IDisposable);Sys.ApplicationLoadEventArgs=function(b,a){Sys.ApplicationLoadEventArgs.initializeBase(this);this._components=b;this._isPartialLoad=a};Sys.ApplicationLoadEventArgs.prototype={get_components:function(){return this._components},get_isPartialLoad:function(){return this._isPartialLoad}};Sys.ApplicationLoadEventArgs.registerClass("Sys.ApplicationLoadEventArgs",Sys.EventArgs);Sys._Application=function(){Sys._Application.initializeBase(this);this._disposableObjects=[];this._components={};this._createdComponents=[];this._secondPassComponents=[];this._unloadHandlerDelegate=Function.createDelegate(this,this._unloadHandler);this._loadHandlerDelegate=Function.createDelegate(this,this._loadHandler);Sys.UI.DomEvent.addHandler(window,"unload",this._unloadHandlerDelegate);Sys.UI.DomEvent.addHandler(window,"load",this._loadHandlerDelegate)};Sys._Application.prototype={_creatingComponents:false,_disposing:false,get_isCreatingComponents:function(){return this._creatingComponents},add_load:function(a){this.get_events().addHandler("load",a)},remove_load:function(a){this.get_events().removeHandler("load",a)},add_init:function(a){if(this._initialized)a(this,Sys.EventArgs.Empty);else this.get_events().addHandler("init",a)},remove_init:function(a){this.get_events().removeHandler("init",a)},add_unload:function(a){this.get_events().addHandler("unload",a)},remove_unload:function(a){this.get_events().removeHandler("unload",a)},addComponent:function(a){this._components[a.get_id()]=a},beginCreateComponents:function(){this._creatingComponents=true},dispose:function(){if(!this._disposing){this._disposing=true;if(window.pageUnload)window.pageUnload(this,Sys.EventArgs.Empty);var c=this.get_events().getHandler("unload");if(c)c(this,Sys.EventArgs.Empty);var b=Array.clone(this._disposableObjects);for(var a=0,e=b.length;a<e;a++)b[a].dispose();Array.clear(this._disposableObjects);Sys.UI.DomEvent.removeHandler(window,"unload",this._unloadHandlerDelegate);if(this._loadHandlerDelegate){Sys.UI.DomEvent.removeHandler(window,"load",this._loadHandlerDelegate);this._loadHandlerDelegate=null}var d=Sys._ScriptLoader.getInstance();if(d)d.dispose();Sys._Application.callBaseMethod(this,"dispose")}},endCreateComponents:function(){var b=this._secondPassComponents;for(var a=0,d=b.length;a<d;a++){var c=b[a].component;Sys$Component$_setReferences(c,b[a].references);c.endUpdate()}this._secondPassComponents=[];this._creatingComponents=false},findComponent:function(b,a){return a?Sys.IContainer.isInstanceOfType(a)?a.findComponent(b):a[b]||null:Sys.Application._components[b]||null},getComponents:function(){var a=[],b=this._components;for(var c in b)a[a.length]=b[c];return a},initialize:function(){if(!this._initialized&&!this._initializing){this._initializing=true;window.setTimeout(Function.createDelegate(this,this._doInitialize),0)}},notifyScriptLoaded:function(){var a=Sys._ScriptLoader.getInstance();if(a)a.notifyScriptLoaded()},registerDisposableObject:function(a){if(!this._disposing)this._disposableObjects[this._disposableObjects.length]=a},raiseLoad:function(){var b=this.get_events().getHandler("load"),a=new Sys.ApplicationLoadEventArgs(Array.clone(this._createdComponents),!this._initializing);if(b)b(this,a);if(window.pageLoad)window.pageLoad(this,a);this._createdComponents=[]},removeComponent:function(b){var a=b.get_id();if(a)delete this._components[a]},unregisterDisposableObject:function(a){if(!this._disposing)Array.remove(this._disposableObjects,a)},_addComponentToSecondPass:function(b,a){this._secondPassComponents[this._secondPassComponents.length]={component:b,references:a}},_doInitialize:function(){Sys._Application.callBaseMethod(this,"initialize");var a=this.get_events().getHandler("init");if(a){this.beginCreateComponents();a(this,Sys.EventArgs.Empty);this.endCreateComponents()}this.raiseLoad();this._initializing=false},_loadHandler:function(){if(this._loadHandlerDelegate){Sys.UI.DomEvent.removeHandler(window,"load",this._loadHandlerDelegate);this._loadHandlerDelegate=null}this.initialize()},_unloadHandler:function(){this.dispose()}};Sys._Application.registerClass("Sys._Application",Sys.Component,Sys.IContainer);Sys.Application=new Sys._Application;var $find=Sys.Application.findComponent;Type.registerNamespace("Sys.Net");Sys.Net.WebRequestExecutor=function(){this._webRequest=null;this._resultObject=null};Sys.Net.WebRequestExecutor.prototype={get_webRequest:function(){return this._webRequest},_set_webRequest:function(a){this._webRequest=a},get_started:function(){throw Error.notImplemented()},get_responseAvailable:function(){throw Error.notImplemented()},get_timedOut:function(){throw Error.notImplemented()},get_aborted:function(){throw Error.notImplemented()},get_responseData:function(){throw Error.notImplemented()},get_statusCode:function(){throw Error.notImplemented()},get_statusText:function(){throw Error.notImplemented()},get_xml:function(){throw Error.notImplemented()},get_object:function(){if(!this._resultObject)this._resultObject=Sys.Serialization.JavaScriptSerializer.deserialize(this.get_responseData());return this._resultObject},executeRequest:function(){throw Error.notImplemented()},abort:function(){throw Error.notImplemented()},getResponseHeader:function(){throw Error.notImplemented()},getAllResponseHeaders:function(){throw Error.notImplemented()}};Sys.Net.WebRequestExecutor.registerClass("Sys.Net.WebRequestExecutor");Sys.Net.XMLDOM=function(d){if(!window.DOMParser){var c=["Msxml2.DOMDocument.3.0","Msxml2.DOMDocument"];for(var b=0,f=c.length;b<f;b++)try{var a=new ActiveXObject(c[b]);a.async=false;a.loadXML(d);a.setProperty("SelectionLanguage","XPath");return a}catch(g){}}else try{var e=new window.DOMParser;return e.parseFromString(d,"text/xml")}catch(g){}return null};Sys.Net.XMLHttpExecutor=function(){Sys.Net.XMLHttpExecutor.initializeBase(this);var a=this;this._xmlHttpRequest=null;this._webRequest=null;this._responseAvailable=false;this._timedOut=false;this._timer=null;this._aborted=false;this._started=false;this._onReadyStateChange=function(){if(a._xmlHttpRequest.readyState===4){try{if(typeof a._xmlHttpRequest.status==="undefined")return}catch(b){return}a._clearTimer();a._responseAvailable=true;a._webRequest.completed(Sys.EventArgs.Empty);if(a._xmlHttpRequest!=null){a._xmlHttpRequest.onreadystatechange=Function.emptyMethod;a._xmlHttpRequest=null}}};this._clearTimer=function(){if(a._timer!=null){window.clearTimeout(a._timer);a._timer=null}};this._onTimeout=function(){if(!a._responseAvailable){a._clearTimer();a._timedOut=true;a._xmlHttpRequest.onreadystatechange=Function.emptyMethod;a._xmlHttpRequest.abort();a._webRequest.completed(Sys.EventArgs.Empty);a._xmlHttpRequest=null}}};Sys.Net.XMLHttpExecutor.prototype={get_timedOut:function(){return this._timedOut},get_started:function(){return this._started},get_responseAvailable:function(){return this._responseAvailable},get_aborted:function(){return this._aborted},executeRequest:function(){this._webRequest=this.get_webRequest();var c=this._webRequest.get_body(),a=this._webRequest.get_headers();this._xmlHttpRequest=new XMLHttpRequest;this._xmlHttpRequest.onreadystatechange=this._onReadyStateChange;var e=this._webRequest.get_httpVerb();this._xmlHttpRequest.open(e,this._webRequest.getResolvedUrl(),true);if(a)for(var b in a){var f=a[b];if(typeof f!=="function")this._xmlHttpRequest.setRequestHeader(b,f)}if(e.toLowerCase()==="post"){if(a===null||!a["Content-Type"])this._xmlHttpRequest.setRequestHeader("Content-Type","application/x-www-form-urlencoded; charset=utf-8");if(!c)c=""}var d=this._webRequest.get_timeout();if(d>0)this._timer=window.setTimeout(Function.createDelegate(this,this._onTimeout),d);this._xmlHttpRequest.send(c);this._started=true},getResponseHeader:function(b){var a;try{a=this._xmlHttpRequest.getResponseHeader(b)}catch(c){}if(!a)a="";return a},getAllResponseHeaders:function(){return this._xmlHttpRequest.getAllResponseHeaders()},get_responseData:function(){return this._xmlHttpRequest.responseText},get_statusCode:function(){var a=0;try{a=this._xmlHttpRequest.status}catch(b){}return a},get_statusText:function(){return this._xmlHttpRequest.statusText},get_xml:function(){var a=this._xmlHttpRequest.responseXML;if(!a||!a.documentElement){a=Sys.Net.XMLDOM(this._xmlHttpRequest.responseText);if(!a||!a.documentElement)return null}else if(navigator.userAgent.indexOf("MSIE")!==-1)a.setProperty("SelectionLanguage","XPath");if(a.documentElement.namespaceURI==="http://www.mozilla.org/newlayout/xml/parsererror.xml"&&a.documentElement.tagName==="parsererror")return null;if(a.documentElement.firstChild&&a.documentElement.firstChild.tagName==="parsererror")return null;return a},abort:function(){if(this._aborted||this._responseAvailable||this._timedOut)return;this._aborted=true;this._clearTimer();if(this._xmlHttpRequest&&!this._responseAvailable){this._xmlHttpRequest.onreadystatechange=Function.emptyMethod;this._xmlHttpRequest.abort();this._xmlHttpRequest=null;this._webRequest.completed(Sys.EventArgs.Empty)}}};Sys.Net.XMLHttpExecutor.registerClass("Sys.Net.XMLHttpExecutor",Sys.Net.WebRequestExecutor);Sys.Net._WebRequestManager=function(){this._this=this;this._defaultTimeout=0;this._defaultExecutorType="Sys.Net.XMLHttpExecutor"};Sys.Net._WebRequestManager.prototype={add_invokingRequest:function(a){this._get_eventHandlerList().addHandler("invokingRequest",a)},remove_invokingRequest:function(a){this._get_eventHandlerList().removeHandler("invokingRequest",a)},add_completedRequest:function(a){this._get_eventHandlerList().addHandler("completedRequest",a)},remove_completedRequest:function(a){this._get_eventHandlerList().removeHandler("completedRequest",a)},_get_eventHandlerList:function(){if(!this._events)this._events=new Sys.EventHandlerList;return this._events},get_defaultTimeout:function(){return this._defaultTimeout},set_defaultTimeout:function(a){this._defaultTimeout=a},get_defaultExecutorType:function(){return this._defaultExecutorType},set_defaultExecutorType:function(a){this._defaultExecutorType=a},executeRequest:function(webRequest){var executor=webRequest.get_executor();if(!executor){var failed=false;try{var executorType=eval(this._defaultExecutorType);executor=new executorType}catch(a){failed=true}webRequest.set_executor(executor)}if(executor.get_aborted())return;var evArgs=new Sys.Net.NetworkRequestEventArgs(webRequest),handler=this._get_eventHandlerList().getHandler("invokingRequest");if(handler)handler(this,evArgs);if(!evArgs.get_cancel())executor.executeRequest()}};Sys.Net._WebRequestManager.registerClass("Sys.Net._WebRequestManager");Sys.Net.WebRequestManager=new Sys.Net._WebRequestManager;Sys.Net.NetworkRequestEventArgs=function(a){Sys.Net.NetworkRequestEventArgs.initializeBase(this);this._webRequest=a};Sys.Net.NetworkRequestEventArgs.prototype={get_webRequest:function(){return this._webRequest}};Sys.Net.NetworkRequestEventArgs.registerClass("Sys.Net.NetworkRequestEventArgs",Sys.CancelEventArgs);Sys.Net.WebRequest=function(){this._url="";this._headers={};this._body=null;this._userContext=null;this._httpVerb=null;this._executor=null;this._invokeCalled=false;this._timeout=0};Sys.Net.WebRequest.prototype={add_completed:function(a){this._get_eventHandlerList().addHandler("completed",a)},remove_completed:function(a){this._get_eventHandlerList().removeHandler("completed",a)},completed:function(b){var a=Sys.Net.WebRequestManager._get_eventHandlerList().getHandler("completedRequest");if(a)a(this._executor,b);a=this._get_eventHandlerList().getHandler("completed");if(a)a(this._executor,b)},_get_eventHandlerList:function(){if(!this._events)this._events=new Sys.EventHandlerList;return this._events},get_url:function(){return this._url},set_url:function(a){this._url=a},get_headers:function(){return this._headers},get_httpVerb:function(){if(this._httpVerb===null){if(this._body===null)return "GET";return "POST"}return this._httpVerb},set_httpVerb:function(a){this._httpVerb=a},get_body:function(){return this._body},set_body:function(a){this._body=a},get_userContext:function(){return this._userContext},set_userContext:function(a){this._userContext=a},get_executor:function(){return this._executor},set_executor:function(a){this._executor=a;this._executor._set_webRequest(this)},get_timeout:function(){if(this._timeout===0)return Sys.Net.WebRequestManager.get_defaultTimeout();return this._timeout},set_timeout:function(a){this._timeout=a},getResolvedUrl:function(){return Sys.Net.WebRequest._resolveUrl(this._url)},invoke:function(){Sys.Net.WebRequestManager.executeRequest(this);this._invokeCalled=true}};Sys.Net.WebRequest._resolveUrl=function(b,a){if(b&&b.indexOf("://")!==-1)return b;if(!a||a.length===0){var c=document.getElementsByTagName("base")[0];if(c&&c.href&&c.href.length>0)a=c.href;else a=document.URL}var d=a.indexOf("?");if(d!==-1)a=a.substr(0,d);a=a.substr(0,a.lastIndexOf("/")+1);if(!b||b.length===0)return a;if(b.charAt(0)==="/"){var e=a.indexOf("://"),g=a.indexOf("/",e+3);return a.substr(0,g)+b}else{var f=a.lastIndexOf("/");return a.substr(0,f+1)+b}};Sys.Net.WebRequest._createQueryString=function(d,b){if(!b)b=encodeURIComponent;var a=new Sys.StringBuilder,f=0;for(var c in d){var e=d[c];if(typeof e==="function")continue;var g=Sys.Serialization.JavaScriptSerializer.serialize(e);if(f!==0)a.append("&");a.append(c);a.append("=");a.append(b(g));f++}return a.toString()};Sys.Net.WebRequest._createUrl=function(a,b){if(!b)return a;var d=Sys.Net.WebRequest._createQueryString(b);if(d.length>0){var c="?";if(a&&a.indexOf("?")!==-1)c="&";return a+c+d}else return a};Sys.Net.WebRequest.registerClass("Sys.Net.WebRequest");Sys.Net.WebServiceProxy=function(){};Sys.Net.WebServiceProxy.prototype={get_timeout:function(){return this._timeout},set_timeout:function(a){if(a<0)throw Error.argumentOutOfRange("value",a,Sys.Res.invalidTimeout);this._timeout=a},get_defaultUserContext:function(){return this._userContext},set_defaultUserContext:function(a){this._userContext=a},get_defaultSucceededCallback:function(){return this._succeeded},set_defaultSucceededCallback:function(a){this._succeeded=a},get_defaultFailedCallback:function(){return this._failed},set_defaultFailedCallback:function(a){this._failed=a},get_path:function(){return this._path},set_path:function(a){this._path=a},_invoke:function(d,e,g,f,c,b,a){if(c===null||typeof c==="undefined")c=this.get_defaultSucceededCallback();if(b===null||typeof b==="undefined")b=this.get_defaultFailedCallback();if(a===null||typeof a==="undefined")a=this.get_defaultUserContext();return Sys.Net.WebServiceProxy.invoke(d,e,g,f,c,b,a,this.get_timeout())}};Sys.Net.WebServiceProxy.registerClass("Sys.Net.WebServiceProxy");Sys.Net.WebServiceProxy.invoke=function(k,a,j,d,i,c,f,h){var b=new Sys.Net.WebRequest;b.get_headers()["Content-Type"]="application/json; charset=utf-8";if(!d)d={};var g=d;if(!j||!g)g={};b.set_url(Sys.Net.WebRequest._createUrl(k+"/"+encodeURIComponent(a),g));var e=null;if(!j){e=Sys.Serialization.JavaScriptSerializer.serialize(d);if(e==="{}")e=""}b.set_body(e);b.add_completed(l);if(h&&h>0)b.set_timeout(h);b.invoke();function l(d){if(d.get_responseAvailable()){var g=d.get_statusCode(),b=null;try{var e=d.getResponseHeader("Content-Type");if(e.startsWith("application/json"))b=d.get_object();else if(e.startsWith("text/xml"))b=d.get_xml();else b=d.get_responseData()}catch(m){}var k=d.getResponseHeader("jsonerror"),h=k==="true";if(h){if(b)b=new Sys.Net.WebServiceError(false,b.Message,b.StackTrace,b.ExceptionType)}else if(e.startsWith("application/json"))b=b.d;if(g<200||g>=300||h){if(c){if(!b||!h)b=new Sys.Net.WebServiceError(false,String.format(Sys.Res.webServiceFailedNoMsg,a),"","");b._statusCode=g;c(b,f,a)}}else if(i)i(b,f,a)}else{var j;if(d.get_timedOut())j=String.format(Sys.Res.webServiceTimedOut,a);else j=String.format(Sys.Res.webServiceFailedNoMsg,a);if(c)c(new Sys.Net.WebServiceError(d.get_timedOut(),j,"",""),f,a)}}return b};Sys.Net.WebServiceProxy._generateTypedConstructor=function(a){return function(b){if(b)for(var c in b)this[c]=b[c];this.__type=a}};Sys.Net.WebServiceError=function(c,d,b,a){this._timedOut=c;this._message=d;this._stackTrace=b;this._exceptionType=a;this._statusCode=-1};Sys.Net.WebServiceError.prototype={get_timedOut:function(){return this._timedOut},get_statusCode:function(){return this._statusCode},get_message:function(){return this._message},get_stackTrace:function(){return this._stackTrace},get_exceptionType:function(){return this._exceptionType}};Sys.Net.WebServiceError.registerClass("Sys.Net.WebServiceError");Type.registerNamespace("Sys.Services");Sys.Services._ProfileService=function(){Sys.Services._ProfileService.initializeBase(this);this.properties={}};Sys.Services._ProfileService.DefaultWebServicePath="";Sys.Services._ProfileService.prototype={_defaultLoadCompletedCallback:null,_defaultSaveCompletedCallback:null,_path:"",_timeout:0,get_defaultLoadCompletedCallback:function(){return this._defaultLoadCompletedCallback},set_defaultLoadCompletedCallback:function(a){this._defaultLoadCompletedCallback=a},get_defaultSaveCompletedCallback:function(){return this._defaultSaveCompletedCallback},set_defaultSaveCompletedCallback:function(a){this._defaultSaveCompletedCallback=a},get_path:function(){return this._path||""},load:function(c,d,e,f){var b,a;if(!c){a="GetAllPropertiesForCurrentUser";b={authenticatedUserOnly:false}}else{a="GetPropertiesForCurrentUser";b={properties:this._clonePropertyNames(c),authenticatedUserOnly:false}}this._invoke(this._get_path(),a,false,b,Function.createDelegate(this,this._onLoadComplete),Function.createDelegate(this,this._onLoadFailed),[d,e,f])},save:function(d,b,c,e){var a=this._flattenProperties(d,this.properties);this._invoke(this._get_path(),"SetPropertiesForCurrentUser",false,{values:a.value,authenticatedUserOnly:false},Function.createDelegate(this,this._onSaveComplete),Function.createDelegate(this,this._onSaveFailed),[b,c,e,a.count])},_clonePropertyNames:function(e){var c=[],d={};for(var b=0;b<e.length;b++){var a=e[b];if(!d[a]){Array.add(c,a);d[a]=true}}return c},_flattenProperties:function(a,i,j){var b={},e,d,g=0;if(a&&a.length===0)return {value:b,count:0};for(var c in i){e=i[c];d=j?j+"."+c:c;if(Sys.Services.ProfileGroup.isInstanceOfType(e)){var k=this._flattenProperties(a,e,d),h=k.value;g+=k.count;for(var f in h){var l=h[f];b[f]=l}}else if(!a||Array.indexOf(a,d)!==-1){b[d]=e;g++}}return {value:b,count:g}},_get_path:function(){var a=this.get_path();if(!a.length)a=Sys.Services._ProfileService.DefaultWebServicePath;if(!a||!a.length)throw Error.invalidOperation(Sys.Res.servicePathNotSet);return a},_onLoadComplete:function(a,e,g){if(typeof a!=="object")throw Error.invalidOperation(String.format(Sys.Res.webServiceInvalidReturnType,g,"Object"));var c=this._unflattenProperties(a);for(var b in c)this.properties[b]=c[b];var d=e[0]||this.get_defaultLoadCompletedCallback()||this.get_defaultSucceededCallback();if(d){var f=e[2]||this.get_defaultUserContext();d(a.length,f,"Sys.Services.ProfileService.load")}},_onLoadFailed:function(d,b){var a=b[1]||this.get_defaultFailedCallback();if(a){var c=b[2]||this.get_defaultUserContext();a(d,c,"Sys.Services.ProfileService.load")}},_onSaveComplete:function(a,b,f){var c=b[3];if(a!==null)if(a instanceof Array)c-=a.length;else if(typeof a==="number")c=a;else throw Error.invalidOperation(String.format(Sys.Res.webServiceInvalidReturnType,f,"Array"));var d=b[0]||this.get_defaultSaveCompletedCallback()||this.get_defaultSucceededCallback();if(d){var e=b[2]||this.get_defaultUserContext();d(c,e,"Sys.Services.ProfileService.save")}},_onSaveFailed:function(d,b){var a=b[1]||this.get_defaultFailedCallback();if(a){var c=b[2]||this.get_defaultUserContext();a(d,c,"Sys.Services.ProfileService.save")}},_unflattenProperties:function(e){var c={},d,f,h=0;for(var a in e){h++;f=e[a];d=a.indexOf(".");if(d!==-1){var g=a.substr(0,d);a=a.substr(d+1);var b=c[g];if(!b||!Sys.Services.ProfileGroup.isInstanceOfType(b)){b=new Sys.Services.ProfileGroup;c[g]=b}b[a]=f}else c[a]=f}e.length=h;return c}};Sys.Services._ProfileService.registerClass("Sys.Services._ProfileService",Sys.Net.WebServiceProxy);Sys.Services.ProfileService=new Sys.Services._ProfileService;Sys.Services.ProfileGroup=function(a){if(a)for(var b in a)this[b]=a[b]};Sys.Services.ProfileGroup.registerClass("Sys.Services.ProfileGroup");Sys.Services._AuthenticationService=function(){Sys.Services._AuthenticationService.initializeBase(this)};Sys.Services._AuthenticationService.DefaultWebServicePath="";Sys.Services._AuthenticationService.prototype={_defaultLoginCompletedCallback:null,_defaultLogoutCompletedCallback:null,_path:"",_timeout:0,_authenticated:false,get_defaultLoginCompletedCallback:function(){return this._defaultLoginCompletedCallback},set_defaultLoginCompletedCallback:function(a){this._defaultLoginCompletedCallback=a},get_defaultLogoutCompletedCallback:function(){return this._defaultLogoutCompletedCallback},set_defaultLogoutCompletedCallback:function(a){this._defaultLogoutCompletedCallback=a},get_isLoggedIn:function(){return this._authenticated},get_path:function(){return this._path||""},login:function(c,b,a,h,f,d,e,g){this._invoke(this._get_path(),"Login",false,{userName:c,password:b,createPersistentCookie:a},Function.createDelegate(this,this._onLoginComplete),Function.createDelegate(this,this._onLoginFailed),[c,b,a,h,f,d,e,g])},logout:function(c,a,b,d){this._invoke(this._get_path(),"Logout",false,{},Function.createDelegate(this,this._onLogoutComplete),Function.createDelegate(this,this._onLogoutFailed),[c,a,b,d])},_get_path:function(){var a=this.get_path();if(!a.length)a=Sys.Services._AuthenticationService.DefaultWebServicePath;if(!a||!a.length)throw Error.invalidOperation(Sys.Res.servicePathNotSet);return a},_onLoginComplete:function(e,c,f){if(typeof e!=="boolean")throw Error.invalidOperation(String.format(Sys.Res.webServiceInvalidReturnType,f,"Boolean"));var b=c[4],d=c[7]||this.get_defaultUserContext(),a=c[5]||this.get_defaultLoginCompletedCallback()||this.get_defaultSucceededCallback();if(e){this._authenticated=true;if(a)a(true,d,"Sys.Services.AuthenticationService.login");if(typeof b!=="undefined"&&b!==null)window.location.href=b}else if(a)a(false,d,"Sys.Services.AuthenticationService.login")},_onLoginFailed:function(d,b){var a=b[6]||this.get_defaultFailedCallback();if(a){var c=b[7]||this.get_defaultUserContext();a(d,c,"Sys.Services.AuthenticationService.login")}},_onLogoutComplete:function(f,a,e){if(f!==null)throw Error.invalidOperation(String.format(Sys.Res.webServiceInvalidReturnType,e,"null"));var b=a[0],d=a[3]||this.get_defaultUserContext(),c=a[1]||this.get_defaultLogoutCompletedCallback()||this.get_defaultSucceededCallback();this._authenticated=false;if(c)c(null,d,"Sys.Services.AuthenticationService.logout");if(!b)window.location.reload();else window.location.href=b},_onLogoutFailed:function(c,b){var a=b[2]||this.get_defaultFailedCallback();if(a)a(c,b[3],"Sys.Services.AuthenticationService.logout")},_setAuthenticated:function(a){this._authenticated=a}};Sys.Services._AuthenticationService.registerClass("Sys.Services._AuthenticationService",Sys.Net.WebServiceProxy);Sys.Services.AuthenticationService=new Sys.Services._AuthenticationService;Sys.Services._RoleService=function(){Sys.Services._RoleService.initializeBase(this);this._roles=[]};Sys.Services._RoleService.DefaultWebServicePath="";Sys.Services._RoleService.prototype={_defaultLoadCompletedCallback:null,_rolesIndex:null,_timeout:0,_path:"",get_defaultLoadCompletedCallback:function(){return this._defaultLoadCompletedCallback},set_defaultLoadCompletedCallback:function(a){this._defaultLoadCompletedCallback=a},get_path:function(){return this._path||""},get_roles:function(){return Array.clone(this._roles)},isUserInRole:function(a){var b=this._get_rolesIndex()[a.trim().toLowerCase()];return !!b},load:function(a,b,c){Sys.Net.WebServiceProxy.invoke(this._get_path(),"GetRolesForCurrentUser",false,{},Function.createDelegate(this,this._onLoadComplete),Function.createDelegate(this,this._onLoadFailed),[a,b,c],this.get_timeout())},_get_path:function(){var a=this.get_path();if(!a||!a.length)a=Sys.Services._RoleService.DefaultWebServicePath;if(!a||!a.length)throw Error.invalidOperation(Sys.Res.servicePathNotSet);return a},_get_rolesIndex:function(){if(!this._rolesIndex){var b={};for(var a=0;a<this._roles.length;a++)b[this._roles[a].toLowerCase()]=true;this._rolesIndex=b}return this._rolesIndex},_onLoadComplete:function(a,c,f){if(a&&!(a instanceof Array))throw Error.invalidOperation(String.format(Sys.Res.webServiceInvalidReturnType,f,"Array"));this._roles=a;this._rolesIndex=null;var b=c[0]||this.get_defaultLoadCompletedCallback()||this.get_defaultSucceededCallback();if(b){var e=c[2]||this.get_defaultUserContext(),d=Array.clone(a);b(d,e,"Sys.Services.RoleService.load")}},_onLoadFailed:function(d,b){var a=b[1]||this.get_defaultFailedCallback();if(a){var c=b[2]||this.get_defaultUserContext();a(d,c,"Sys.Services.RoleService.load")}}};Sys.Services._RoleService.registerClass("Sys.Services._RoleService",Sys.Net.WebServiceProxy);Sys.Services.RoleService=new Sys.Services._RoleService;Type.registerNamespace("Sys.Serialization");Sys.Serialization.JavaScriptSerializer=function(){};Sys.Serialization.JavaScriptSerializer.registerClass("Sys.Serialization.JavaScriptSerializer");Sys.Serialization.JavaScriptSerializer._serverTypeFieldName="__type";Sys.Serialization.JavaScriptSerializer._stringRegEx=new RegExp('["\\b\\f\\n\\r\\t\\\\\\x00-\\x1F]',"i");Sys.Serialization.JavaScriptSerializer._dateRegEx=new RegExp('(^|[^\\\\])\\"\\\\/Date\\((-?[0-9]+)(?:[a-zA-Z]|(?:\\+|-)[0-9]{4})?\\)\\\\/\\"',"g");Sys.Serialization.JavaScriptSerializer._jsonRegEx=new RegExp("[^,:{}\\[\\]0-9.\\-+Eaeflnr-u \\n\\r\\t]","g");Sys.Serialization.JavaScriptSerializer._jsonStringRegEx=new RegExp('"(\\\\.|[^"\\\\])*"',"g");Sys.Serialization.JavaScriptSerializer._serializeBooleanWithBuilder=function(b,a){a.append(b.toString())};Sys.Serialization.JavaScriptSerializer._serializeNumberWithBuilder=function(a,b){if(isFinite(a))b.append(String(a));else throw Error.invalidOperation(Sys.Res.cannotSerializeNonFiniteNumbers)};Sys.Serialization.JavaScriptSerializer._serializeStringWithBuilder=function(c,a){a.append('"');if(Sys.Serialization.JavaScriptSerializer._stringRegEx.test(c)){var d=c.length;for(i=0;i<d;++i){var b=c.charAt(i);if(b>=" "){if(b==="\\"||b==='"')a.append("\\");a.append(b)}else switch(b){case "\b":a.append("\\b");break;case "\f":a.append("\\f");break;case "\n":a.append("\\n");break;case "\r":a.append("\\r");break;case "\t":a.append("\\t");break;default:a.append("\\u00");if(b.charCodeAt()<16)a.append("0");a.append(b.charCodeAt().toString(16))}}}else a.append(c);a.append('"')};Sys.Serialization.JavaScriptSerializer._serializeWithBuilder=function(b,a,i,g){var c;switch(typeof b){case "object":if(b)if(Number.isInstanceOfType(b))Sys.Serialization.JavaScriptSerializer._serializeNumberWithBuilder(b,a);else if(Boolean.isInstanceOfType(b))Sys.Serialization.JavaScriptSerializer._serializeBooleanWithBuilder(b,a);else if(String.isInstanceOfType(b))Sys.Serialization.JavaScriptSerializer._serializeStringWithBuilder(b,a);else if(Array.isInstanceOfType(b)){a.append("[");for(c=0;c<b.length;++c){if(c>0)a.append(",");Sys.Serialization.JavaScriptSerializer._serializeWithBuilder(b[c],a,false,g)}a.append("]")}else{if(Date.isInstanceOfType(b)){a.append('"\\/Date(');a.append(b.getTime());a.append(')\\/"');break}var d=[],f=0;for(var e in b){if(e.startsWith("$"))continue;if(e===Sys.Serialization.JavaScriptSerializer._serverTypeFieldName&&f!==0){d[f++]=d[0];d[0]=e}else d[f++]=e}if(i)d.sort();a.append("{");var j=false;for(c=0;c<f;c++){var h=b[d[c]];if(typeof h!=="undefined"&&typeof h!=="function"){if(j)a.append(",");else j=true;Sys.Serialization.JavaScriptSerializer._serializeWithBuilder(d[c],a,i,g);a.append(":");Sys.Serialization.JavaScriptSerializer._serializeWithBuilder(h,a,i,g)}}a.append("}")}else a.append("null");break;case "number":Sys.Serialization.JavaScriptSerializer._serializeNumberWithBuilder(b,a);break;case "string":Sys.Serialization.JavaScriptSerializer._serializeStringWithBuilder(b,a);break;case "boolean":Sys.Serialization.JavaScriptSerializer._serializeBooleanWithBuilder(b,a);break;default:a.append("null")}};Sys.Serialization.JavaScriptSerializer.serialize=function(b){var a=new Sys.StringBuilder;Sys.Serialization.JavaScriptSerializer._serializeWithBuilder(b,a,false);return a.toString()};Sys.Serialization.JavaScriptSerializer.deserialize=function(data,secure){if(data.length===0)throw Error.argument("data",Sys.Res.cannotDeserializeEmptyString);try{var exp=data.replace(Sys.Serialization.JavaScriptSerializer._dateRegEx,"$1new Date($2)");if(secure&&Sys.Serialization.JavaScriptSerializer._jsonRegEx.test(exp.replace(Sys.Serialization.JavaScriptSerializer._jsonStringRegEx,"")))throw null;return eval("("+exp+")")}catch(a){throw Error.argument("data",Sys.Res.cannotDeserializeInvalidJson)}};Sys.CultureInfo=function(c,b,a){this.name=c;this.numberFormat=b;this.dateTimeFormat=a};Sys.CultureInfo.prototype={_getDateTimeFormats:function(){if(!this._dateTimeFormats){var a=this.dateTimeFormat;this._dateTimeFormats=[a.MonthDayPattern,a.YearMonthPattern,a.ShortDatePattern,a.ShortTimePattern,a.LongDatePattern,a.LongTimePattern,a.FullDateTimePattern,a.RFC1123Pattern,a.SortableDateTimePattern,a.UniversalSortableDateTimePattern]}return this._dateTimeFormats},_getMonthIndex:function(a){if(!this._upperMonths)this._upperMonths=this._toUpperArray(this.dateTimeFormat.MonthNames);return Array.indexOf(this._upperMonths,this._toUpper(a))},_getAbbrMonthIndex:function(a){if(!this._upperAbbrMonths)this._upperAbbrMonths=this._toUpperArray(this.dateTimeFormat.AbbreviatedMonthNames);return Array.indexOf(this._upperAbbrMonths,this._toUpper(a))},_getDayIndex:function(a){if(!this._upperDays)this._upperDays=this._toUpperArray(this.dateTimeFormat.DayNames);return Array.indexOf(this._upperDays,this._toUpper(a))},_getAbbrDayIndex:function(a){if(!this._upperAbbrDays)this._upperAbbrDays=this._toUpperArray(this.dateTimeFormat.AbbreviatedDayNames);return Array.indexOf(this._upperAbbrDays,this._toUpper(a))},_toUpperArray:function(c){var b=[];for(var a=0,d=c.length;a<d;a++)b[a]=this._toUpper(c[a]);return b},_toUpper:function(a){return a.split("\u00a0").join(" ").toUpperCase()}};Sys.CultureInfo._parse=function(b){var a=Sys.Serialization.JavaScriptSerializer.deserialize(b);return new Sys.CultureInfo(a.name,a.numberFormat,a.dateTimeFormat)};Sys.CultureInfo.registerClass("Sys.CultureInfo");Sys.CultureInfo.InvariantCulture=Sys.CultureInfo._parse('{"name":"","numberFormat":{"CurrencyDecimalDigits":2,"CurrencyDecimalSeparator":".","IsReadOnly":true,"CurrencyGroupSizes":[3],"NumberGroupSizes":[3],"PercentGroupSizes":[3],"CurrencyGroupSeparator":",","CurrencySymbol":"\u00a4","NaNSymbol":"NaN","CurrencyNegativePattern":0,"NumberNegativePattern":1,"PercentPositivePattern":0,"PercentNegativePattern":0,"NegativeInfinitySymbol":"-Infinity","NegativeSign":"-","NumberDecimalDigits":2,"NumberDecimalSeparator":".","NumberGroupSeparator":",","CurrencyPositivePattern":0,"PositiveInfinitySymbol":"Infinity","PositiveSign":"+","PercentDecimalDigits":2,"PercentDecimalSeparator":".","PercentGroupSeparator":",","PercentSymbol":"%","PerMilleSymbol":"\u2030","NativeDigits":["0","1","2","3","4","5","6","7","8","9"],"DigitSubstitution":1},"dateTimeFormat":{"AMDesignator":"AM","Calendar":{"MinSupportedDateTime":"@-62135568000000@","MaxSupportedDateTime":"@253402300799999@","AlgorithmType":1,"CalendarType":1,"Eras":[1],"TwoDigitYearMax":2029,"IsReadOnly":true},"DateSeparator":"/","FirstDayOfWeek":0,"CalendarWeekRule":0,"FullDateTimePattern":"dddd, dd MMMM yyyy HH:mm:ss","LongDatePattern":"dddd, dd MMMM yyyy","LongTimePattern":"HH:mm:ss","MonthDayPattern":"MMMM dd","PMDesignator":"PM","RFC1123Pattern":"ddd, dd MMM yyyy HH\':\'mm\':\'ss \'GMT\'","ShortDatePattern":"MM/dd/yyyy","ShortTimePattern":"HH:mm","SortableDateTimePattern":"yyyy\'-\'MM\'-\'dd\'T\'HH\':\'mm\':\'ss","TimeSeparator":":","UniversalSortableDateTimePattern":"yyyy\'-\'MM\'-\'dd HH\':\'mm\':\'ss\'Z\'","YearMonthPattern":"yyyy MMMM","AbbreviatedDayNames":["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],"ShortestDayNames":["Su","Mo","Tu","We","Th","Fr","Sa"],"DayNames":["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],"AbbreviatedMonthNames":["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec",""],"MonthNames":["January","February","March","April","May","June","July","August","September","October","November","December",""],"IsReadOnly":true,"NativeCalendarName":"Gregorian Calendar","AbbreviatedMonthGenitiveNames":["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec",""],"MonthGenitiveNames":["January","February","March","April","May","June","July","August","September","October","November","December",""]}}');if(typeof __cultureInfo==="undefined")var __cultureInfo='{"name":"en-US","numberFormat":{"CurrencyDecimalDigits":2,"CurrencyDecimalSeparator":".","IsReadOnly":false,"CurrencyGroupSizes":[3],"NumberGroupSizes":[3],"PercentGroupSizes":[3],"CurrencyGroupSeparator":",","CurrencySymbol":"$","NaNSymbol":"NaN","CurrencyNegativePattern":0,"NumberNegativePattern":1,"PercentPositivePattern":0,"PercentNegativePattern":0,"NegativeInfinitySymbol":"-Infinity","NegativeSign":"-","NumberDecimalDigits":2,"NumberDecimalSeparator":".","NumberGroupSeparator":",","CurrencyPositivePattern":0,"PositiveInfinitySymbol":"Infinity","PositiveSign":"+","PercentDecimalDigits":2,"PercentDecimalSeparator":".","PercentGroupSeparator":",","PercentSymbol":"%","PerMilleSymbol":"\u2030","NativeDigits":["0","1","2","3","4","5","6","7","8","9"],"DigitSubstitution":1},"dateTimeFormat":{"AMDesignator":"AM","Calendar":{"MinSupportedDateTime":"@-62135568000000@","MaxSupportedDateTime":"@253402300799999@","AlgorithmType":1,"CalendarType":1,"Eras":[1],"TwoDigitYearMax":2029,"IsReadOnly":false},"DateSeparator":"/","FirstDayOfWeek":0,"CalendarWeekRule":0,"FullDateTimePattern":"dddd, MMMM dd, yyyy h:mm:ss tt","LongDatePattern":"dddd, MMMM dd, yyyy","LongTimePattern":"h:mm:ss tt","MonthDayPattern":"MMMM dd","PMDesignator":"PM","RFC1123Pattern":"ddd, dd MMM yyyy HH\':\'mm\':\'ss \'GMT\'","ShortDatePattern":"M/d/yyyy","ShortTimePattern":"h:mm tt","SortableDateTimePattern":"yyyy\'-\'MM\'-\'dd\'T\'HH\':\'mm\':\'ss","TimeSeparator":":","UniversalSortableDateTimePattern":"yyyy\'-\'MM\'-\'dd HH\':\'mm\':\'ss\'Z\'","YearMonthPattern":"MMMM, yyyy","AbbreviatedDayNames":["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],"ShortestDayNames":["Su","Mo","Tu","We","Th","Fr","Sa"],"DayNames":["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],"AbbreviatedMonthNames":["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec",""],"MonthNames":["January","February","March","April","May","June","July","August","September","October","November","December",""],"IsReadOnly":false,"NativeCalendarName":"Gregorian Calendar","AbbreviatedMonthGenitiveNames":["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec",""],"MonthGenitiveNames":["January","February","March","April","May","June","July","August","September","October","November","December",""]}}';Sys.CultureInfo.CurrentCulture=Sys.CultureInfo._parse(__cultureInfo);delete __cultureInfo;Sys.UI.Behavior=function(b){Sys.UI.Behavior.initializeBase(this);this._element=b;var a=b._behaviors;if(!a)b._behaviors=[this];else a[a.length]=this};Sys.UI.Behavior.prototype={_name:null,get_element:function(){return this._element},get_id:function(){var a=Sys.UI.Behavior.callBaseMethod(this,"get_id");if(a)return a;if(!this._element||!this._element.id)return "";return this._element.id+"$"+this.get_name()},get_name:function(){if(this._name)return this._name;var a=Object.getTypeName(this),b=a.lastIndexOf(".");if(b!=-1)a=a.substr(b+1);if(!this.get_isInitialized())this._name=a;return a},set_name:function(a){this._name=a},initialize:function(){Sys.UI.Behavior.callBaseMethod(this,"initialize");var a=this.get_name();if(a)this._element[a]=this},dispose:function(){Sys.UI.Behavior.callBaseMethod(this,"dispose");if(this._element){var a=this.get_name();if(a)this._element[a]=null;Array.remove(this._element._behaviors,this);delete this._element}}};Sys.UI.Behavior.registerClass("Sys.UI.Behavior",Sys.Component);Sys.UI.Behavior.getBehaviorByName=function(b,c){var a=b[c];return a&&Sys.UI.Behavior.isInstanceOfType(a)?a:null};Sys.UI.Behavior.getBehaviors=function(a){if(!a._behaviors)return [];return Array.clone(a._behaviors)};Sys.UI.Behavior.getBehaviorsByType=function(d,e){var a=d._behaviors,c=[];if(a)for(var b=0,f=a.length;b<f;b++)if(e.isInstanceOfType(a[b]))c[c.length]=a[b];return c};Sys.UI.VisibilityMode=function(){throw Error.notImplemented()};Sys.UI.VisibilityMode.prototype={hide:0,collapse:1};Sys.UI.VisibilityMode.registerEnum("Sys.UI.VisibilityMode");Sys.UI.Control=function(a){Sys.UI.Control.initializeBase(this);this._element=a;a.control=this};Sys.UI.Control.prototype={_parent:null,_visibilityMode:Sys.UI.VisibilityMode.hide,get_element:function(){return this._element},get_id:function(){if(!this._element)return "";return this._element.id},set_id:function(){throw Error.invalidOperation(Sys.Res.cantSetId)},get_parent:function(){if(this._parent)return this._parent;if(!this._element)return null;var a=this._element.parentNode;while(a){if(a.control)return a.control;a=a.parentNode}return null},set_parent:function(a){this._parent=a},get_visibilityMode:function(){return Sys.UI.DomElement.getVisibilityMode(this._element)},set_visibilityMode:function(a){Sys.UI.DomElement.setVisibilityMode(this._element,a)},get_visible:function(){return Sys.UI.DomElement.getVisible(this._element)},set_visible:function(a){Sys.UI.DomElement.setVisible(this._element,a)},addCssClass:function(a){Sys.UI.DomElement.addCssClass(this._element,a)},dispose:function(){Sys.UI.Control.callBaseMethod(this,"dispose");if(this._element){this._element.control=undefined;delete this._element}if(this._parent)delete this._parent},onBubbleEvent:function(){return false},raiseBubbleEvent:function(b,c){var a=this.get_parent();while(a){if(a.onBubbleEvent(b,c))return;a=a.get_parent()}},removeCssClass:function(a){Sys.UI.DomElement.removeCssClass(this._element,a)},toggleCssClass:function(a){Sys.UI.DomElement.toggleCssClass(this._element,a)}};Sys.UI.Control.registerClass("Sys.UI.Control",Sys.Component);
Type.registerNamespace('Sys');Sys.Res={'argumentInteger':'Value must be an integer.','scriptLoadMultipleCallbacks':'The script \'{0}\' contains multiple calls to Sys.Application.notifyScriptLoaded(). Only one is allowed.','invokeCalledTwice':'Cannot call invoke more than once.','webServiceFailed':'The server method \'{0}\' failed with the following error: {1}','webServiceInvalidJsonWrapper':'The server method \'{0}\' returned invalid data. The \'d\' property is missing from the JSON wrapper.','argumentType':'Object cannot be converted to the required type.','argumentNull':'Value cannot be null.','controlCantSetId':'The id property can\'t be set on a control.','formatBadFormatSpecifier':'Format specifier was invalid.','webServiceFailedNoMsg':'The server method \'{0}\' failed.','argumentDomElement':'Value must be a DOM element.','invalidExecutorType':'Could not create a valid Sys.Net.WebRequestExecutor from: {0}.','cannotCallBeforeResponse':'Cannot call {0} when responseAvailable is false.','actualValue':'Actual value was {0}.','enumInvalidValue':'\'{0}\' is not a valid value for enum {1}.','scriptLoadFailed':'The script \'{0}\' could not be loaded.','parameterCount':'Parameter count mismatch.','cannotDeserializeEmptyString':'Cannot deserialize empty string.','formatInvalidString':'Input string was not in a correct format.','invalidTimeout':'Value must be greater than or equal to zero.','cannotAbortBeforeStart':'Cannot abort when executor has not started.','argument':'Value does not fall within the expected range.','cannotDeserializeInvalidJson':'Cannot deserialize. The data does not correspond to valid JSON.','invalidHttpVerb':'httpVerb cannot be set to an empty or null string.','nullWebRequest':'Cannot call executeRequest with a null webRequest.','eventHandlerInvalid':'Handler was not added through the Sys.UI.DomEvent.addHandler method.','cannotSerializeNonFiniteNumbers':'Cannot serialize non finite numbers.','argumentUndefined':'Value cannot be undefined.','webServiceInvalidReturnType':'The server method \'{0}\' returned an invalid type. Expected type: {1}','servicePathNotSet':'The path to the web service has not been set.','argumentTypeWithTypes':'Object of type \'{0}\' cannot be converted to type \'{1}\'.','cannotCallOnceStarted':'Cannot call {0} once started.','badBaseUrl1':'Base URL does not contain ://.','badBaseUrl2':'Base URL does not contain another /.','badBaseUrl3':'Cannot find last / in base URL.','setExecutorAfterActive':'Cannot set executor after it has become active.','paramName':'Parameter name: {0}','cannotCallOutsideHandler':'Cannot call {0} outside of a completed event handler.','cannotSerializeObjectWithCycle':'Cannot serialize object with cyclic reference within child properties.','format':'One of the identified items was in an invalid format.','assertFailedCaller':'Assertion Failed: {0}\r\nat {1}','argumentOutOfRange':'Specified argument was out of the range of valid values.','webServiceTimedOut':'The server method \'{0}\' timed out.','notImplemented':'The method or operation is not implemented.','assertFailed':'Assertion Failed: {0}','invalidOperation':'Operation is not valid due to the current state of the object.','breakIntoDebugger':'{0}\r\n\r\nBreak into debugger?'};
if(typeof(Sys)!=='undefined')Sys.Application.notifyScriptLoaded();
;/* Copy from jquery.drawinglibrary.js */

var supportsvg = detectSVG();
/*if ( !results.support && results.builtin )
alert( "You need to enable SVG support first!" );
else if ( !results.support )
alert( "You need a browser with SVG support" );
else if ( results.native == "Opera" && results.builtinVersion < 9 )
alert( "Opera 8 is not compatible with this program.. please upgrade Opera to at least version 9" );
else if ( results.support == "Plugin" && !results.IID )
alert( "Please disable the " + results.plugin + " SVG plugin as it is not compatible with this software for this browser" );
else	alert( "Success! Starting the application.." );
*/

//from http://thomas.tanreisoftware.com/?p=79
function detectSVG() {
    var results = { support: null, plugin: null, builtin: null };
    var obj = null;
    if (navigator && navigator.mimeTypes && navigator.mimeTypes.length) {
        for (var mime in { "image/svg+xml": null, "image/svg": null, "image/svg-xml": null }) {
            if (navigator.mimeTypes[mime] && (obj = navigator.mimeTypes[mime].enabledPlugin) && obj)
                results = { plugin: (obj = obj.name.toLowerCase()) && obj.indexOf("adobe") >= 0 ? "Adobe" : (obj.indexOf("renesis") >= 0 ? "Renesis" : "Unknown") };
        }
    }
    else if ((obj = document.createElement("object")) && obj && typeof obj.setAttribute("type", "image/svg+xml")) {
        if (typeof obj.USE_SVGZ == "string")
            results = { plugin: "Adobe", IID: "Adobe.SVGCtl", pluginVersion: obj.window && obj.window._window_impl ? (obj.window.evalScript ? 6 : 3) : 2 };
        else if (obj.window && obj.window.getSVGViewerVersion().indexOf("enesis") > 0)
            results = { plugin: "Renesis", IID: "RenesisX.RenesisCtrl.1" };
    }
    results.IID = (results.plugin == "Adobe" ? "Adobe.SVGCtl" : (results.plugin == "Renesis" ? "renesisX.RenesisCtrl.1" : null));

    // Does the browser support SVG natively? Gecko claims no support if a plugin is active, but still gives back an NSI inteface
    var claimed = document && document.implementation && document.implementation.hasFeature("org.w3c.dom.svg", "1.0");
    var nsi = window.Components && window.Components.interfaces && !!Components.interfaces.nsIDOMGetSVGDocument;
    results.builtin = claimed ? (!!window.opera ? "Opera" : (nsi ? "Gecko" : "Safari")) : (!!window.opera && window.opera.version ? "Opera" : (nsi ? "Gecko" : null));
    results.builtinVersion = results.builtin && !!window.opera ? parseFloat(window.opera.version()) : (nsi ? (typeof Iterator == "function" ? (Array.reduce ? 3.0 : 2.0) : 1.5) : null);

    // Which is active, the plugin or native support? Opera 9 makes it hard to tell..
    if (!!window.opera && results.builtinVersion >= 9 && (obj = document.createElement("object")) && obj && typeof obj.setAttribute("type", "image/svg+xml") && document.appendChild(obj)) {
        results.support = obj.offsetWidth ? "Plugin" : "Builtin";
        document.removeChild(obj);
    }
    else results.support = results.plugin && !claimed ? "Plugin" : (results.builtin && claimed ? "Builtin" : null);

    return results;
}
	;/*!
 * jQuery JavaScript Library v1.8.0
 * http://jquery.com/
 *
 * Includes Sizzle.js
 * http://sizzlejs.com/
 *
 * Copyright 2012 jQuery Foundation and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: Thu Aug 09 2012 16:24:48 GMT-0400 (Eastern Daylight Time)
 */
(function( window, undefined ) {
var
	// A central reference to the root jQuery(document)
	rootjQuery,

	// The deferred used on DOM ready
	readyList,

	// Use the correct document accordingly with window argument (sandbox)
	document = window.document,
	location = window.location,
	navigator = window.navigator,

	// Map over jQuery in case of overwrite
	_jQuery = window.jQuery,

	// Map over the $ in case of overwrite
	_$ = window.$,

	// Save a reference to some core methods
	core_push = Array.prototype.push,
	core_slice = Array.prototype.slice,
	core_indexOf = Array.prototype.indexOf,
	core_toString = Object.prototype.toString,
	core_hasOwn = Object.prototype.hasOwnProperty,
	core_trim = String.prototype.trim,

	// Define a local copy of jQuery
	jQuery = function( selector, context ) {
		// The jQuery object is actually just the init constructor 'enhanced'
		return new jQuery.fn.init( selector, context, rootjQuery );
	},

	// Used for matching numbers
	core_pnum = /[\-+]?(?:\d*\.|)\d+(?:[eE][\-+]?\d+|)/.source,

	// Used for detecting and trimming whitespace
	core_rnotwhite = /\S/,
	core_rspace = /\s+/,

	// IE doesn't match non-breaking spaces with \s
	rtrim = core_rnotwhite.test("\xA0") ? (/^[\s\xA0]+|[\s\xA0]+$/g) : /^\s+|\s+$/g,

	// A simple way to check for HTML strings
	// Prioritize #id over <tag> to avoid XSS via location.hash (#9521)
	rquickExpr = /^(?:[^#<]*(<[\w\W]+>)[^>]*$|#([\w\-]*)$)/,

	// Match a standalone tag
	rsingleTag = /^<(\w+)\s*\/?>(?:<\/\1>|)$/,

	// JSON RegExp
	rvalidchars = /^[\],:{}\s]*$/,
	rvalidbraces = /(?:^|:|,)(?:\s*\[)+/g,
	rvalidescape = /\\(?:["\\\/bfnrt]|u[\da-fA-F]{4})/g,
	rvalidtokens = /"[^"\\\r\n]*"|true|false|null|-?(?:\d\d*\.|)\d+(?:[eE][\-+]?\d+|)/g,

	// Matches dashed string for camelizing
	rmsPrefix = /^-ms-/,
	rdashAlpha = /-([\da-z])/gi,

	// Used by jQuery.camelCase as callback to replace()
	fcamelCase = function( all, letter ) {
		return ( letter + "" ).toUpperCase();
	},

	// The ready event handler and self cleanup method
	DOMContentLoaded = function() {
		if ( document.addEventListener ) {
			document.removeEventListener( "DOMContentLoaded", DOMContentLoaded, false );
			jQuery.ready();
		} else if ( document.readyState === "complete" ) {
			// we're here because readyState === "complete" in oldIE
			// which is good enough for us to call the dom ready!
			document.detachEvent( "onreadystatechange", DOMContentLoaded );
			jQuery.ready();
		}
	},

	// [[Class]] -> type pairs
	class2type = {};

jQuery.fn = jQuery.prototype = {
	constructor: jQuery,
	init: function( selector, context, rootjQuery ) {
		var match, elem, ret, doc;

		// Handle $(""), $(null), $(undefined), $(false)
		if ( !selector ) {
			return this;
		}

		// Handle $(DOMElement)
		if ( selector.nodeType ) {
			this.context = this[0] = selector;
			this.length = 1;
			return this;
		}

		// Handle HTML strings
		if ( typeof selector === "string" ) {
			if ( selector.charAt(0) === "<" && selector.charAt( selector.length - 1 ) === ">" && selector.length >= 3 ) {
				// Assume that strings that start and end with <> are HTML and skip the regex check
				match = [ null, selector, null ];

			} else {
				match = rquickExpr.exec( selector );
			}

			// Match html or make sure no context is specified for #id
			if ( match && (match[1] || !context) ) {

				// HANDLE: $(html) -> $(array)
				if ( match[1] ) {
					context = context instanceof jQuery ? context[0] : context;
					doc = ( context && context.nodeType ? context.ownerDocument || context : document );

					// scripts is true for back-compat
					selector = jQuery.parseHTML( match[1], doc, true );
					if ( rsingleTag.test( match[1] ) && jQuery.isPlainObject( context ) ) {
						this.attr.call( selector, context, true );
					}

					return jQuery.merge( this, selector );

				// HANDLE: $(#id)
				} else {
					elem = document.getElementById( match[2] );

					// Check parentNode to catch when Blackberry 4.6 returns
					// nodes that are no longer in the document #6963
					if ( elem && elem.parentNode ) {
						// Handle the case where IE and Opera return items
						// by name instead of ID
						if ( elem.id !== match[2] ) {
							return rootjQuery.find( selector );
						}

						// Otherwise, we inject the element directly into the jQuery object
						this.length = 1;
						this[0] = elem;
					}

					this.context = document;
					this.selector = selector;
					return this;
				}

			// HANDLE: $(expr, $(...))
			} else if ( !context || context.jquery ) {
				return ( context || rootjQuery ).find( selector );

			// HANDLE: $(expr, context)
			// (which is just equivalent to: $(context).find(expr)
			} else {
				return this.constructor( context ).find( selector );
			}

		// HANDLE: $(function)
		// Shortcut for document ready
		} else if ( jQuery.isFunction( selector ) ) {
			return rootjQuery.ready( selector );
		}

		if ( selector.selector !== undefined ) {
			this.selector = selector.selector;
			this.context = selector.context;
		}

		return jQuery.makeArray( selector, this );
	},

	// Start with an empty selector
	selector: "",

	// The current version of jQuery being used
	jquery: "1.8.0",

	// The default length of a jQuery object is 0
	length: 0,

	// The number of elements contained in the matched element set
	size: function() {
		return this.length;
	},

	toArray: function() {
		return core_slice.call( this );
	},

	// Get the Nth element in the matched element set OR
	// Get the whole matched element set as a clean array
	get: function( num ) {
		return num == null ?

			// Return a 'clean' array
			this.toArray() :

			// Return just the object
			( num < 0 ? this[ this.length + num ] : this[ num ] );
	},

	// Take an array of elements and push it onto the stack
	// (returning the new matched element set)
	pushStack: function( elems, name, selector ) {

		// Build a new jQuery matched element set
		var ret = jQuery.merge( this.constructor(), elems );

		// Add the old object onto the stack (as a reference)
		ret.prevObject = this;

		ret.context = this.context;

		if ( name === "find" ) {
			ret.selector = this.selector + ( this.selector ? " " : "" ) + selector;
		} else if ( name ) {
			ret.selector = this.selector + "." + name + "(" + selector + ")";
		}

		// Return the newly-formed element set
		return ret;
	},

	// Execute a callback for every element in the matched set.
	// (You can seed the arguments with an array of args, but this is
	// only used internally.)
	each: function( callback, args ) {
		return jQuery.each( this, callback, args );
	},

	ready: function( fn ) {
		// Add the callback
		jQuery.ready.promise().done( fn );

		return this;
	},

	eq: function( i ) {
		i = +i;
		return i === -1 ?
			this.slice( i ) :
			this.slice( i, i + 1 );
	},

	first: function() {
		return this.eq( 0 );
	},

	last: function() {
		return this.eq( -1 );
	},

	slice: function() {
		return this.pushStack( core_slice.apply( this, arguments ),
			"slice", core_slice.call(arguments).join(",") );
	},

	map: function( callback ) {
		return this.pushStack( jQuery.map(this, function( elem, i ) {
			return callback.call( elem, i, elem );
		}));
	},

	end: function() {
		return this.prevObject || this.constructor(null);
	},

	// For internal use only.
	// Behaves like an Array's method, not like a jQuery method.
	push: core_push,
	sort: [].sort,
	splice: [].splice
};

// Give the init function the jQuery prototype for later instantiation
jQuery.fn.init.prototype = jQuery.fn;

jQuery.extend = jQuery.fn.extend = function() {
	var options, name, src, copy, copyIsArray, clone,
		target = arguments[0] || {},
		i = 1,
		length = arguments.length,
		deep = false;

	// Handle a deep copy situation
	if ( typeof target === "boolean" ) {
		deep = target;
		target = arguments[1] || {};
		// skip the boolean and the target
		i = 2;
	}

	// Handle case when target is a string or something (possible in deep copy)
	if ( typeof target !== "object" && !jQuery.isFunction(target) ) {
		target = {};
	}

	// extend jQuery itself if only one argument is passed
	if ( length === i ) {
		target = this;
		--i;
	}

	for ( ; i < length; i++ ) {
		// Only deal with non-null/undefined values
		if ( (options = arguments[ i ]) != null ) {
			// Extend the base object
			for ( name in options ) {
				src = target[ name ];
				copy = options[ name ];

				// Prevent never-ending loop
				if ( target === copy ) {
					continue;
				}

				// Recurse if we're merging plain objects or arrays
				if ( deep && copy && ( jQuery.isPlainObject(copy) || (copyIsArray = jQuery.isArray(copy)) ) ) {
					if ( copyIsArray ) {
						copyIsArray = false;
						clone = src && jQuery.isArray(src) ? src : [];

					} else {
						clone = src && jQuery.isPlainObject(src) ? src : {};
					}

					// Never move original objects, clone them
					target[ name ] = jQuery.extend( deep, clone, copy );

				// Don't bring in undefined values
				} else if ( copy !== undefined ) {
					target[ name ] = copy;
				}
			}
		}
	}

	// Return the modified object
	return target;
};

jQuery.extend({
	noConflict: function( deep ) {
		if ( window.$ === jQuery ) {
			window.$ = _$;
		}

		if ( deep && window.jQuery === jQuery ) {
			window.jQuery = _jQuery;
		}

		return jQuery;
	},

	// Is the DOM ready to be used? Set to true once it occurs.
	isReady: false,

	// A counter to track how many items to wait for before
	// the ready event fires. See #6781
	readyWait: 1,

	// Hold (or release) the ready event
	holdReady: function( hold ) {
		if ( hold ) {
			jQuery.readyWait++;
		} else {
			jQuery.ready( true );
		}
	},

	// Handle when the DOM is ready
	ready: function( wait ) {

		// Abort if there are pending holds or we're already ready
		if ( wait === true ? --jQuery.readyWait : jQuery.isReady ) {
			return;
		}

		// Make sure body exists, at least, in case IE gets a little overzealous (ticket #5443).
		if ( !document.body ) {
			return setTimeout( jQuery.ready, 1 );
		}

		// Remember that the DOM is ready
		jQuery.isReady = true;

		// If a normal DOM Ready event fired, decrement, and wait if need be
		if ( wait !== true && --jQuery.readyWait > 0 ) {
			return;
		}

		// If there are functions bound, to execute
		readyList.resolveWith( document, [ jQuery ] );

		// Trigger any bound ready events
		if ( jQuery.fn.trigger ) {
			jQuery( document ).trigger("ready").off("ready");
		}
	},

	// See test/unit/core.js for details concerning isFunction.
	// Since version 1.3, DOM methods and functions like alert
	// aren't supported. They return false on IE (#2968).
	isFunction: function( obj ) {
		return jQuery.type(obj) === "function";
	},

	isArray: Array.isArray || function( obj ) {
		return jQuery.type(obj) === "array";
	},

	isWindow: function( obj ) {
		return obj != null && obj == obj.window;
	},

	isNumeric: function( obj ) {
		return !isNaN( parseFloat(obj) ) && isFinite( obj );
	},

	type: function( obj ) {
		return obj == null ?
			String( obj ) :
			class2type[ core_toString.call(obj) ] || "object";
	},

	isPlainObject: function( obj ) {
		// Must be an Object.
		// Because of IE, we also have to check the presence of the constructor property.
		// Make sure that DOM nodes and window objects don't pass through, as well
		if ( !obj || jQuery.type(obj) !== "object" || obj.nodeType || jQuery.isWindow( obj ) ) {
			return false;
		}

		try {
			// Not own constructor property must be Object
			if ( obj.constructor &&
				!core_hasOwn.call(obj, "constructor") &&
				!core_hasOwn.call(obj.constructor.prototype, "isPrototypeOf") ) {
				return false;
			}
		} catch ( e ) {
			// IE8,9 Will throw exceptions on certain host objects #9897
			return false;
		}

		// Own properties are enumerated firstly, so to speed up,
		// if last one is own, then all properties are own.

		var key;
		for ( key in obj ) {}

		return key === undefined || core_hasOwn.call( obj, key );
	},

	isEmptyObject: function( obj ) {
		var name;
		for ( name in obj ) {
			return false;
		}
		return true;
	},

	error: function( msg ) {
		throw new Error( msg );
	},

	// data: string of html
	// context (optional): If specified, the fragment will be created in this context, defaults to document
	// scripts (optional): If true, will include scripts passed in the html string
	parseHTML: function( data, context, scripts ) {
		var parsed;
		if ( !data || typeof data !== "string" ) {
			return null;
		}
		if ( typeof context === "boolean" ) {
			scripts = context;
			context = 0;
		}
		context = context || document;

		// Single tag
		if ( (parsed = rsingleTag.exec( data )) ) {
			return [ context.createElement( parsed[1] ) ];
		}

		parsed = jQuery.buildFragment( [ data ], context, scripts ? null : [] );
		return jQuery.merge( [],
			(parsed.cacheable ? jQuery.clone( parsed.fragment ) : parsed.fragment).childNodes );
	},

	parseJSON: function( data ) {
		if ( !data || typeof data !== "string") {
			return null;
		}

		// Make sure leading/trailing whitespace is removed (IE can't handle it)
		data = jQuery.trim( data );

		// Attempt to parse using the native JSON parser first
		if ( window.JSON && window.JSON.parse ) {
			return window.JSON.parse( data );
		}

		// Make sure the incoming data is actual JSON
		// Logic borrowed from http://json.org/json2.js
		if ( rvalidchars.test( data.replace( rvalidescape, "@" )
			.replace( rvalidtokens, "]" )
			.replace( rvalidbraces, "")) ) {

			return ( new Function( "return " + data ) )();

		}
		jQuery.error( "Invalid JSON: " + data );
	},

	// Cross-browser xml parsing
	parseXML: function( data ) {
		var xml, tmp;
		if ( !data || typeof data !== "string" ) {
			return null;
		}
		try {
			if ( window.DOMParser ) { // Standard
				tmp = new DOMParser();
				xml = tmp.parseFromString( data , "text/xml" );
			} else { // IE
				xml = new ActiveXObject( "Microsoft.XMLDOM" );
				xml.async = "false";
				xml.loadXML( data );
			}
		} catch( e ) {
			xml = undefined;
		}
		if ( !xml || !xml.documentElement || xml.getElementsByTagName( "parsererror" ).length ) {
			jQuery.error( "Invalid XML: " + data );
		}
		return xml;
	},

	noop: function() {},

	// Evaluates a script in a global context
	// Workarounds based on findings by Jim Driscoll
	// http://weblogs.java.net/blog/driscoll/archive/2009/09/08/eval-javascript-global-context
	globalEval: function( data ) {
		if ( data && core_rnotwhite.test( data ) ) {
			// We use execScript on Internet Explorer
			// We use an anonymous function so that context is window
			// rather than jQuery in Firefox
			( window.execScript || function( data ) {
				window[ "eval" ].call( window, data );
			} )( data );
		}
	},

	// Convert dashed to camelCase; used by the css and data modules
	// Microsoft forgot to hump their vendor prefix (#9572)
	camelCase: function( string ) {
		return string.replace( rmsPrefix, "ms-" ).replace( rdashAlpha, fcamelCase );
	},

	nodeName: function( elem, name ) {
		return elem.nodeName && elem.nodeName.toUpperCase() === name.toUpperCase();
	},

	// args is for internal usage only
	each: function( obj, callback, args ) {
		var name,
			i = 0,
			length = obj.length,
			isObj = length === undefined || jQuery.isFunction( obj );

		if ( args ) {
			if ( isObj ) {
				for ( name in obj ) {
					if ( callback.apply( obj[ name ], args ) === false ) {
						break;
					}
				}
			} else {
				for ( ; i < length; ) {
					if ( callback.apply( obj[ i++ ], args ) === false ) {
						break;
					}
				}
			}

		// A special, fast, case for the most common use of each
		} else {
			if ( isObj ) {
				for ( name in obj ) {
					if ( callback.call( obj[ name ], name, obj[ name ] ) === false ) {
						break;
					}
				}
			} else {
				for ( ; i < length; ) {
					if ( callback.call( obj[ i ], i, obj[ i++ ] ) === false ) {
						break;
					}
				}
			}
		}

		return obj;
	},

	// Use native String.trim function wherever possible
	trim: core_trim ?
		function( text ) {
			return text == null ?
				"" :
				core_trim.call( text );
		} :

		// Otherwise use our own trimming functionality
		function( text ) {
			return text == null ?
				"" :
				text.toString().replace( rtrim, "" );
		},

	// results is for internal usage only
	makeArray: function( arr, results ) {
		var type,
			ret = results || [];

		if ( arr != null ) {
			// The window, strings (and functions) also have 'length'
			// Tweaked logic slightly to handle Blackberry 4.7 RegExp issues #6930
			type = jQuery.type( arr );

			if ( arr.length == null || type === "string" || type === "function" || type === "regexp" || jQuery.isWindow( arr ) ) {
				core_push.call( ret, arr );
			} else {
				jQuery.merge( ret, arr );
			}
		}

		return ret;
	},

	inArray: function( elem, arr, i ) {
		var len;

		if ( arr ) {
			if ( core_indexOf ) {
				return core_indexOf.call( arr, elem, i );
			}

			len = arr.length;
			i = i ? i < 0 ? Math.max( 0, len + i ) : i : 0;

			for ( ; i < len; i++ ) {
				// Skip accessing in sparse arrays
				if ( i in arr && arr[ i ] === elem ) {
					return i;
				}
			}
		}

		return -1;
	},

	merge: function( first, second ) {
		var l = second.length,
			i = first.length,
			j = 0;

		if ( typeof l === "number" ) {
			for ( ; j < l; j++ ) {
				first[ i++ ] = second[ j ];
			}

		} else {
			while ( second[j] !== undefined ) {
				first[ i++ ] = second[ j++ ];
			}
		}

		first.length = i;

		return first;
	},

	grep: function( elems, callback, inv ) {
		var retVal,
			ret = [],
			i = 0,
			length = elems.length;
		inv = !!inv;

		// Go through the array, only saving the items
		// that pass the validator function
		for ( ; i < length; i++ ) {
			retVal = !!callback( elems[ i ], i );
			if ( inv !== retVal ) {
				ret.push( elems[ i ] );
			}
		}

		return ret;
	},

	// arg is for internal usage only
	map: function( elems, callback, arg ) {
		var value, key,
			ret = [],
			i = 0,
			length = elems.length,
			// jquery objects are treated as arrays
			isArray = elems instanceof jQuery || length !== undefined && typeof length === "number" && ( ( length > 0 && elems[ 0 ] && elems[ length -1 ] ) || length === 0 || jQuery.isArray( elems ) ) ;

		// Go through the array, translating each of the items to their
		if ( isArray ) {
			for ( ; i < length; i++ ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret[ ret.length ] = value;
				}
			}

		// Go through every key on the object,
		} else {
			for ( key in elems ) {
				value = callback( elems[ key ], key, arg );

				if ( value != null ) {
					ret[ ret.length ] = value;
				}
			}
		}

		// Flatten any nested arrays
		return ret.concat.apply( [], ret );
	},

	// A global GUID counter for objects
	guid: 1,

	// Bind a function to a context, optionally partially applying any
	// arguments.
	proxy: function( fn, context ) {
		var tmp, args, proxy;

		if ( typeof context === "string" ) {
			tmp = fn[ context ];
			context = fn;
			fn = tmp;
		}

		// Quick check to determine if target is callable, in the spec
		// this throws a TypeError, but we will just return undefined.
		if ( !jQuery.isFunction( fn ) ) {
			return undefined;
		}

		// Simulated bind
		args = core_slice.call( arguments, 2 );
		proxy = function() {
			return fn.apply( context, args.concat( core_slice.call( arguments ) ) );
		};

		// Set the guid of unique handler to the same of original handler, so it can be removed
		proxy.guid = fn.guid = fn.guid || proxy.guid || jQuery.guid++;

		return proxy;
	},

	// Multifunctional method to get and set values of a collection
	// The value/s can optionally be executed if it's a function
	access: function( elems, fn, key, value, chainable, emptyGet, pass ) {
		var exec,
			bulk = key == null,
			i = 0,
			length = elems.length;

		// Sets many values
		if ( key && typeof key === "object" ) {
			for ( i in key ) {
				jQuery.access( elems, fn, i, key[i], 1, emptyGet, value );
			}
			chainable = 1;

		// Sets one value
		} else if ( value !== undefined ) {
			// Optionally, function values get executed if exec is true
			exec = pass === undefined && jQuery.isFunction( value );

			if ( bulk ) {
				// Bulk operations only iterate when executing function values
				if ( exec ) {
					exec = fn;
					fn = function( elem, key, value ) {
						return exec.call( jQuery( elem ), value );
					};

				// Otherwise they run against the entire set
				} else {
					fn.call( elems, value );
					fn = null;
				}
			}

			if ( fn ) {
				for (; i < length; i++ ) {
					fn( elems[i], key, exec ? value.call( elems[i], i, fn( elems[i], key ) ) : value, pass );
				}
			}

			chainable = 1;
		}

		return chainable ?
			elems :

			// Gets
			bulk ?
				fn.call( elems ) :
				length ? fn( elems[0], key ) : emptyGet;
	},

	now: function() {
		return ( new Date() ).getTime();
	}
});

jQuery.ready.promise = function( obj ) {
	if ( !readyList ) {

		readyList = jQuery.Deferred();

		// Catch cases where $(document).ready() is called after the
		// browser event has already occurred.
		if ( document.readyState === "complete" || ( document.readyState !== "loading" && document.addEventListener ) ) {
			// Handle it asynchronously to allow scripts the opportunity to delay ready
			setTimeout( jQuery.ready, 1 );

		// Standards-based browsers support DOMContentLoaded
		} else if ( document.addEventListener ) {
			// Use the handy event callback
			document.addEventListener( "DOMContentLoaded", DOMContentLoaded, false );

			// A fallback to window.onload, that will always work
			window.addEventListener( "load", jQuery.ready, false );

		// If IE event model is used
		} else {
			// Ensure firing before onload, maybe late but safe also for iframes
			document.attachEvent( "onreadystatechange", DOMContentLoaded );

			// A fallback to window.onload, that will always work
			window.attachEvent( "onload", jQuery.ready );

			// If IE and not a frame
			// continually check to see if the document is ready
			var top = false;

			try {
				top = window.frameElement == null && document.documentElement;
			} catch(e) {}

			if ( top && top.doScroll ) {
				(function doScrollCheck() {
					if ( !jQuery.isReady ) {

						try {
							// Use the trick by Diego Perini
							// http://javascript.nwbox.com/IEContentLoaded/
							top.doScroll("left");
						} catch(e) {
							return setTimeout( doScrollCheck, 50 );
						}

						// and execute any waiting functions
						jQuery.ready();
					}
				})();
			}
		}
	}
	return readyList.promise( obj );
};

// Populate the class2type map
jQuery.each("Boolean Number String Function Array Date RegExp Object".split(" "), function(i, name) {
	class2type[ "[object " + name + "]" ] = name.toLowerCase();
});

// All jQuery objects should point back to these
rootjQuery = jQuery(document);
// String to Object options format cache
var optionsCache = {};

// Convert String-formatted options into Object-formatted ones and store in cache
function createOptions( options ) {
	var object = optionsCache[ options ] = {};
	jQuery.each( options.split( core_rspace ), function( _, flag ) {
		object[ flag ] = true;
	});
	return object;
}

/*
 * Create a callback list using the following parameters:
 *
 *	options: an optional list of space-separated options that will change how
 *			the callback list behaves or a more traditional option object
 *
 * By default a callback list will act like an event callback list and can be
 * "fired" multiple times.
 *
 * Possible options:
 *
 *	once:			will ensure the callback list can only be fired once (like a Deferred)
 *
 *	memory:			will keep track of previous values and will call any callback added
 *					after the list has been fired right away with the latest "memorized"
 *					values (like a Deferred)
 *
 *	unique:			will ensure a callback can only be added once (no duplicate in the list)
 *
 *	stopOnFalse:	interrupt callings when a callback returns false
 *
 */
jQuery.Callbacks = function( options ) {

	// Convert options from String-formatted to Object-formatted if needed
	// (we check in cache first)
	options = typeof options === "string" ?
		( optionsCache[ options ] || createOptions( options ) ) :
		jQuery.extend( {}, options );

	var // Last fire value (for non-forgettable lists)
		memory,
		// Flag to know if list was already fired
		fired,
		// Flag to know if list is currently firing
		firing,
		// First callback to fire (used internally by add and fireWith)
		firingStart,
		// End of the loop when firing
		firingLength,
		// Index of currently firing callback (modified by remove if needed)
		firingIndex,
		// Actual callback list
		list = [],
		// Stack of fire calls for repeatable lists
		stack = !options.once && [],
		// Fire callbacks
		fire = function( data ) {
			memory = options.memory && data;
			fired = true;
			firingIndex = firingStart || 0;
			firingStart = 0;
			firingLength = list.length;
			firing = true;
			for ( ; list && firingIndex < firingLength; firingIndex++ ) {
				if ( list[ firingIndex ].apply( data[ 0 ], data[ 1 ] ) === false && options.stopOnFalse ) {
					memory = false; // To prevent further calls using add
					break;
				}
			}
			firing = false;
			if ( list ) {
				if ( stack ) {
					if ( stack.length ) {
						fire( stack.shift() );
					}
				} else if ( memory ) {
					list = [];
				} else {
					self.disable();
				}
			}
		},
		// Actual Callbacks object
		self = {
			// Add a callback or a collection of callbacks to the list
			add: function() {
				if ( list ) {
					// First, we save the current length
					var start = list.length;
					(function add( args ) {
						jQuery.each( args, function( _, arg ) {
							if ( jQuery.isFunction( arg ) && ( !options.unique || !self.has( arg ) ) ) {
								list.push( arg );
							} else if ( arg && arg.length ) {
								// Inspect recursively
								add( arg );
							}
						});
					})( arguments );
					// Do we need to add the callbacks to the
					// current firing batch?
					if ( firing ) {
						firingLength = list.length;
					// With memory, if we're not firing then
					// we should call right away
					} else if ( memory ) {
						firingStart = start;
						fire( memory );
					}
				}
				return this;
			},
			// Remove a callback from the list
			remove: function() {
				if ( list ) {
					jQuery.each( arguments, function( _, arg ) {
						var index;
						while( ( index = jQuery.inArray( arg, list, index ) ) > -1 ) {
							list.splice( index, 1 );
							// Handle firing indexes
							if ( firing ) {
								if ( index <= firingLength ) {
									firingLength--;
								}
								if ( index <= firingIndex ) {
									firingIndex--;
								}
							}
						}
					});
				}
				return this;
			},
			// Control if a given callback is in the list
			has: function( fn ) {
				return jQuery.inArray( fn, list ) > -1;
			},
			// Remove all callbacks from the list
			empty: function() {
				list = [];
				return this;
			},
			// Have the list do nothing anymore
			disable: function() {
				list = stack = memory = undefined;
				return this;
			},
			// Is it disabled?
			disabled: function() {
				return !list;
			},
			// Lock the list in its current state
			lock: function() {
				stack = undefined;
				if ( !memory ) {
					self.disable();
				}
				return this;
			},
			// Is it locked?
			locked: function() {
				return !stack;
			},
			// Call all callbacks with the given context and arguments
			fireWith: function( context, args ) {
				args = args || [];
				args = [ context, args.slice ? args.slice() : args ];
				if ( list && ( !fired || stack ) ) {
					if ( firing ) {
						stack.push( args );
					} else {
						fire( args );
					}
				}
				return this;
			},
			// Call all the callbacks with the given arguments
			fire: function() {
				self.fireWith( this, arguments );
				return this;
			},
			// To know if the callbacks have already been called at least once
			fired: function() {
				return !!fired;
			}
		};

	return self;
};
jQuery.extend({

	Deferred: function( func ) {
		var tuples = [
				// action, add listener, listener list, final state
				[ "resolve", "done", jQuery.Callbacks("once memory"), "resolved" ],
				[ "reject", "fail", jQuery.Callbacks("once memory"), "rejected" ],
				[ "notify", "progress", jQuery.Callbacks("memory") ]
			],
			state = "pending",
			promise = {
				state: function() {
					return state;
				},
				always: function() {
					deferred.done( arguments ).fail( arguments );
					return this;
				},
				then: function( /* fnDone, fnFail, fnProgress */ ) {
					var fns = arguments;
					return jQuery.Deferred(function( newDefer ) {
						jQuery.each( tuples, function( i, tuple ) {
							var action = tuple[ 0 ],
								fn = fns[ i ];
							// deferred[ done | fail | progress ] for forwarding actions to newDefer
							deferred[ tuple[1] ]( jQuery.isFunction( fn ) ?
								function() {
									var returned = fn.apply( this, arguments );
									if ( returned && jQuery.isFunction( returned.promise ) ) {
										returned.promise()
											.done( newDefer.resolve )
											.fail( newDefer.reject )
											.progress( newDefer.notify );
									} else {
										newDefer[ action + "With" ]( this === deferred ? newDefer : this, [ returned ] );
									}
								} :
								newDefer[ action ]
							);
						});
						fns = null;
					}).promise();
				},
				// Get a promise for this deferred
				// If obj is provided, the promise aspect is added to the object
				promise: function( obj ) {
					return typeof obj === "object" ? jQuery.extend( obj, promise ) : promise;
				}
			},
			deferred = {};

		// Keep pipe for back-compat
		promise.pipe = promise.then;

		// Add list-specific methods
		jQuery.each( tuples, function( i, tuple ) {
			var list = tuple[ 2 ],
				stateString = tuple[ 3 ];

			// promise[ done | fail | progress ] = list.add
			promise[ tuple[1] ] = list.add;

			// Handle state
			if ( stateString ) {
				list.add(function() {
					// state = [ resolved | rejected ]
					state = stateString;

				// [ reject_list | resolve_list ].disable; progress_list.lock
				}, tuples[ i ^ 1 ][ 2 ].disable, tuples[ 2 ][ 2 ].lock );
			}

			// deferred[ resolve | reject | notify ] = list.fire
			deferred[ tuple[0] ] = list.fire;
			deferred[ tuple[0] + "With" ] = list.fireWith;
		});

		// Make the deferred a promise
		promise.promise( deferred );

		// Call given func if any
		if ( func ) {
			func.call( deferred, deferred );
		}

		// All done!
		return deferred;
	},

	// Deferred helper
	when: function( subordinate /* , ..., subordinateN */ ) {
		var i = 0,
			resolveValues = core_slice.call( arguments ),
			length = resolveValues.length,

			// the count of uncompleted subordinates
			remaining = length !== 1 || ( subordinate && jQuery.isFunction( subordinate.promise ) ) ? length : 0,

			// the master Deferred. If resolveValues consist of only a single Deferred, just use that.
			deferred = remaining === 1 ? subordinate : jQuery.Deferred(),

			// Update function for both resolve and progress values
			updateFunc = function( i, contexts, values ) {
				return function( value ) {
					contexts[ i ] = this;
					values[ i ] = arguments.length > 1 ? core_slice.call( arguments ) : value;
					if( values === progressValues ) {
						deferred.notifyWith( contexts, values );
					} else if ( !( --remaining ) ) {
						deferred.resolveWith( contexts, values );
					}
				};
			},

			progressValues, progressContexts, resolveContexts;

		// add listeners to Deferred subordinates; treat others as resolved
		if ( length > 1 ) {
			progressValues = new Array( length );
			progressContexts = new Array( length );
			resolveContexts = new Array( length );
			for ( ; i < length; i++ ) {
				if ( resolveValues[ i ] && jQuery.isFunction( resolveValues[ i ].promise ) ) {
					resolveValues[ i ].promise()
						.done( updateFunc( i, resolveContexts, resolveValues ) )
						.fail( deferred.reject )
						.progress( updateFunc( i, progressContexts, progressValues ) );
				} else {
					--remaining;
				}
			}
		}

		// if we're not waiting on anything, resolve the master
		if ( !remaining ) {
			deferred.resolveWith( resolveContexts, resolveValues );
		}

		return deferred.promise();
	}
});
jQuery.support = (function() {

	var support,
		all,
		a,
		select,
		opt,
		input,
		fragment,
		eventName,
		i,
		isSupported,
		clickFn,
		div = document.createElement("div");

	// Preliminary tests
	div.setAttribute( "className", "t" );
	div.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";

	all = div.getElementsByTagName("*");
	a = div.getElementsByTagName("a")[ 0 ];
	a.style.cssText = "top:1px;float:left;opacity:.5";

	// Can't get basic test support
	if ( !all || !all.length || !a ) {
		return {};
	}

	// First batch of supports tests
	select = document.createElement("select");
	opt = select.appendChild( document.createElement("option") );
	input = div.getElementsByTagName("input")[ 0 ];

	support = {
		// IE strips leading whitespace when .innerHTML is used
		leadingWhitespace: ( div.firstChild.nodeType === 3 ),

		// Make sure that tbody elements aren't automatically inserted
		// IE will insert them into empty tables
		tbody: !div.getElementsByTagName("tbody").length,

		// Make sure that link elements get serialized correctly by innerHTML
		// This requires a wrapper element in IE
		htmlSerialize: !!div.getElementsByTagName("link").length,

		// Get the style information from getAttribute
		// (IE uses .cssText instead)
		style: /top/.test( a.getAttribute("style") ),

		// Make sure that URLs aren't manipulated
		// (IE normalizes it by default)
		hrefNormalized: ( a.getAttribute("href") === "/a" ),

		// Make sure that element opacity exists
		// (IE uses filter instead)
		// Use a regex to work around a WebKit issue. See #5145
		opacity: /^0.5/.test( a.style.opacity ),

		// Verify style float existence
		// (IE uses styleFloat instead of cssFloat)
		cssFloat: !!a.style.cssFloat,

		// Make sure that if no value is specified for a checkbox
		// that it defaults to "on".
		// (WebKit defaults to "" instead)
		checkOn: ( input.value === "on" ),

		// Make sure that a selected-by-default option has a working selected property.
		// (WebKit defaults to false instead of true, IE too, if it's in an optgroup)
		optSelected: opt.selected,

		// Test setAttribute on camelCase class. If it works, we need attrFixes when doing get/setAttribute (ie6/7)
		getSetAttribute: div.className !== "t",

		// Tests for enctype support on a form(#6743)
		enctype: !!document.createElement("form").enctype,

		// Makes sure cloning an html5 element does not cause problems
		// Where outerHTML is undefined, this still works
		html5Clone: document.createElement("nav").cloneNode( true ).outerHTML !== "<:nav></:nav>",

		// jQuery.support.boxModel DEPRECATED in 1.8 since we don't support Quirks Mode
		boxModel: ( document.compatMode === "CSS1Compat" ),

		// Will be defined later
		submitBubbles: true,
		changeBubbles: true,
		focusinBubbles: false,
		deleteExpando: true,
		noCloneEvent: true,
		inlineBlockNeedsLayout: false,
		shrinkWrapBlocks: false,
		reliableMarginRight: true,
		boxSizingReliable: true,
		pixelPosition: false
	};

	// Make sure checked status is properly cloned
	input.checked = true;
	support.noCloneChecked = input.cloneNode( true ).checked;

	// Make sure that the options inside disabled selects aren't marked as disabled
	// (WebKit marks them as disabled)
	select.disabled = true;
	support.optDisabled = !opt.disabled;

	// Test to see if it's possible to delete an expando from an element
	// Fails in Internet Explorer
	try {
		delete div.test;
	} catch( e ) {
		support.deleteExpando = false;
	}

	if ( !div.addEventListener && div.attachEvent && div.fireEvent ) {
		div.attachEvent( "onclick", clickFn = function() {
			// Cloning a node shouldn't copy over any
			// bound event handlers (IE does this)
			support.noCloneEvent = false;
		});
		div.cloneNode( true ).fireEvent("onclick");
		div.detachEvent( "onclick", clickFn );
	}

	// Check if a radio maintains its value
	// after being appended to the DOM
	input = document.createElement("input");
	input.value = "t";
	input.setAttribute( "type", "radio" );
	support.radioValue = input.value === "t";

	input.setAttribute( "checked", "checked" );

	// #11217 - WebKit loses check when the name is after the checked attribute
	input.setAttribute( "name", "t" );

	div.appendChild( input );
	fragment = document.createDocumentFragment();
	fragment.appendChild( div.lastChild );

	// WebKit doesn't clone checked state correctly in fragments
	support.checkClone = fragment.cloneNode( true ).cloneNode( true ).lastChild.checked;

	// Check if a disconnected checkbox will retain its checked
	// value of true after appended to the DOM (IE6/7)
	support.appendChecked = input.checked;

	fragment.removeChild( input );
	fragment.appendChild( div );

	// Technique from Juriy Zaytsev
	// http://perfectionkills.com/detecting-event-support-without-browser-sniffing/
	// We only care about the case where non-standard event systems
	// are used, namely in IE. Short-circuiting here helps us to
	// avoid an eval call (in setAttribute) which can cause CSP
	// to go haywire. See: https://developer.mozilla.org/en/Security/CSP
	if ( div.attachEvent ) {
		for ( i in {
			submit: true,
			change: true,
			focusin: true
		}) {
			eventName = "on" + i;
			isSupported = ( eventName in div );
			if ( !isSupported ) {
				div.setAttribute( eventName, "return;" );
				isSupported = ( typeof div[ eventName ] === "function" );
			}
			support[ i + "Bubbles" ] = isSupported;
		}
	}

	// Run tests that need a body at doc ready
	jQuery(function() {
		var container, div, tds, marginDiv,
			divReset = "padding:0;margin:0;border:0;display:block;overflow:hidden;",
			body = document.getElementsByTagName("body")[0];

		if ( !body ) {
			// Return for frameset docs that don't have a body
			return;
		}

		container = document.createElement("div");
		container.style.cssText = "visibility:hidden;border:0;width:0;height:0;position:static;top:0;margin-top:1px";
		body.insertBefore( container, body.firstChild );

		// Construct the test element
		div = document.createElement("div");
		container.appendChild( div );

		// Check if table cells still have offsetWidth/Height when they are set
		// to display:none and there are still other visible table cells in a
		// table row; if so, offsetWidth/Height are not reliable for use when
		// determining if an element has been hidden directly using
		// display:none (it is still safe to use offsets if a parent element is
		// hidden; don safety goggles and see bug #4512 for more information).
		// (only IE 8 fails this test)
		div.innerHTML = "<table><tr><td></td><td>t</td></tr></table>";
		tds = div.getElementsByTagName("td");
		tds[ 0 ].style.cssText = "padding:0;margin:0;border:0;display:none";
		isSupported = ( tds[ 0 ].offsetHeight === 0 );

		tds[ 0 ].style.display = "";
		tds[ 1 ].style.display = "none";

		// Check if empty table cells still have offsetWidth/Height
		// (IE <= 8 fail this test)
		support.reliableHiddenOffsets = isSupported && ( tds[ 0 ].offsetHeight === 0 );

		// Check box-sizing and margin behavior
		div.innerHTML = "";
		div.style.cssText = "box-sizing:border-box;-moz-box-sizing:border-box;-webkit-box-sizing:border-box;padding:1px;border:1px;display:block;width:4px;margin-top:1%;position:absolute;top:1%;";
		support.boxSizing = ( div.offsetWidth === 4 );
		support.doesNotIncludeMarginInBodyOffset = ( body.offsetTop !== 1 );

		// NOTE: To any future maintainer, window.getComputedStyle was used here
		// instead of getComputedStyle because it gave a better gzip size.
		// The difference between window.getComputedStyle and getComputedStyle is
		// 7 bytes
		if ( window.getComputedStyle ) {
			support.pixelPosition = ( window.getComputedStyle( div, null ) || {} ).top !== "1%";
			support.boxSizingReliable = ( window.getComputedStyle( div, null ) || { width: "4px" } ).width === "4px";

			// Check if div with explicit width and no margin-right incorrectly
			// gets computed margin-right based on width of container. For more
			// info see bug #3333
			// Fails in WebKit before Feb 2011 nightlies
			// WebKit Bug 13343 - getComputedStyle returns wrong value for margin-right
			marginDiv = document.createElement("div");
			marginDiv.style.cssText = div.style.cssText = divReset;
			marginDiv.style.marginRight = marginDiv.style.width = "0";
			div.style.width = "1px";
			div.appendChild( marginDiv );
			support.reliableMarginRight =
				!parseFloat( ( window.getComputedStyle( marginDiv, null ) || {} ).marginRight );
		}

		if ( typeof div.style.zoom !== "undefined" ) {
			// Check if natively block-level elements act like inline-block
			// elements when setting their display to 'inline' and giving
			// them layout
			// (IE < 8 does this)
			div.innerHTML = "";
			div.style.cssText = divReset + "width:1px;padding:1px;display:inline;zoom:1";
			support.inlineBlockNeedsLayout = ( div.offsetWidth === 3 );

			// Check if elements with layout shrink-wrap their children
			// (IE 6 does this)
			div.style.display = "block";
			div.style.overflow = "visible";
			div.innerHTML = "<div></div>";
			div.firstChild.style.width = "5px";
			support.shrinkWrapBlocks = ( div.offsetWidth !== 3 );

			container.style.zoom = 1;
		}

		// Null elements to avoid leaks in IE
		body.removeChild( container );
		container = div = tds = marginDiv = null;
	});

	// Null elements to avoid leaks in IE
	fragment.removeChild( div );
	all = a = select = opt = input = fragment = div = null;

	return support;
})();
var rbrace = /^(?:\{.*\}|\[.*\])$/,
	rmultiDash = /([A-Z])/g;

jQuery.extend({
	cache: {},

	deletedIds: [],

	// Please use with caution
	uuid: 0,

	// Unique for each copy of jQuery on the page
	// Non-digits removed to match rinlinejQuery
	expando: "jQuery" + ( jQuery.fn.jquery + Math.random() ).replace( /\D/g, "" ),

	// The following elements throw uncatchable exceptions if you
	// attempt to add expando properties to them.
	noData: {
		"embed": true,
		// Ban all objects except for Flash (which handle expandos)
		"object": "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000",
		"applet": true
	},

	hasData: function( elem ) {
		elem = elem.nodeType ? jQuery.cache[ elem[jQuery.expando] ] : elem[ jQuery.expando ];
		return !!elem && !isEmptyDataObject( elem );
	},

	data: function( elem, name, data, pvt /* Internal Use Only */ ) {
		if ( !jQuery.acceptData( elem ) ) {
			return;
		}

		var thisCache, ret,
			internalKey = jQuery.expando,
			getByName = typeof name === "string",

			// We have to handle DOM nodes and JS objects differently because IE6-7
			// can't GC object references properly across the DOM-JS boundary
			isNode = elem.nodeType,

			// Only DOM nodes need the global jQuery cache; JS object data is
			// attached directly to the object so GC can occur automatically
			cache = isNode ? jQuery.cache : elem,

			// Only defining an ID for JS objects if its cache already exists allows
			// the code to shortcut on the same path as a DOM node with no cache
			id = isNode ? elem[ internalKey ] : elem[ internalKey ] && internalKey;

		// Avoid doing any more work than we need to when trying to get data on an
		// object that has no data at all
		if ( (!id || !cache[id] || (!pvt && !cache[id].data)) && getByName && data === undefined ) {
			return;
		}

		if ( !id ) {
			// Only DOM nodes need a new unique ID for each element since their data
			// ends up in the global cache
			if ( isNode ) {
				elem[ internalKey ] = id = jQuery.deletedIds.pop() || ++jQuery.uuid;
			} else {
				id = internalKey;
			}
		}

		if ( !cache[ id ] ) {
			cache[ id ] = {};

			// Avoids exposing jQuery metadata on plain JS objects when the object
			// is serialized using JSON.stringify
			if ( !isNode ) {
				cache[ id ].toJSON = jQuery.noop;
			}
		}

		// An object can be passed to jQuery.data instead of a key/value pair; this gets
		// shallow copied over onto the existing cache
		if ( typeof name === "object" || typeof name === "function" ) {
			if ( pvt ) {
				cache[ id ] = jQuery.extend( cache[ id ], name );
			} else {
				cache[ id ].data = jQuery.extend( cache[ id ].data, name );
			}
		}

		thisCache = cache[ id ];

		// jQuery data() is stored in a separate object inside the object's internal data
		// cache in order to avoid key collisions between internal data and user-defined
		// data.
		if ( !pvt ) {
			if ( !thisCache.data ) {
				thisCache.data = {};
			}

			thisCache = thisCache.data;
		}

		if ( data !== undefined ) {
			thisCache[ jQuery.camelCase( name ) ] = data;
		}

		// Check for both converted-to-camel and non-converted data property names
		// If a data property was specified
		if ( getByName ) {

			// First Try to find as-is property data
			ret = thisCache[ name ];

			// Test for null|undefined property data
			if ( ret == null ) {

				// Try to find the camelCased property
				ret = thisCache[ jQuery.camelCase( name ) ];
			}
		} else {
			ret = thisCache;
		}

		return ret;
	},

	removeData: function( elem, name, pvt /* Internal Use Only */ ) {
		if ( !jQuery.acceptData( elem ) ) {
			return;
		}

		var thisCache, i, l,

			isNode = elem.nodeType,

			// See jQuery.data for more information
			cache = isNode ? jQuery.cache : elem,
			id = isNode ? elem[ jQuery.expando ] : jQuery.expando;

		// If there is already no cache entry for this object, there is no
		// purpose in continuing
		if ( !cache[ id ] ) {
			return;
		}

		if ( name ) {

			thisCache = pvt ? cache[ id ] : cache[ id ].data;

			if ( thisCache ) {

				// Support array or space separated string names for data keys
				if ( !jQuery.isArray( name ) ) {

					// try the string as a key before any manipulation
					if ( name in thisCache ) {
						name = [ name ];
					} else {

						// split the camel cased version by spaces unless a key with the spaces exists
						name = jQuery.camelCase( name );
						if ( name in thisCache ) {
							name = [ name ];
						} else {
							name = name.split(" ");
						}
					}
				}

				for ( i = 0, l = name.length; i < l; i++ ) {
					delete thisCache[ name[i] ];
				}

				// If there is no data left in the cache, we want to continue
				// and let the cache object itself get destroyed
				if ( !( pvt ? isEmptyDataObject : jQuery.isEmptyObject )( thisCache ) ) {
					return;
				}
			}
		}

		// See jQuery.data for more information
		if ( !pvt ) {
			delete cache[ id ].data;

			// Don't destroy the parent cache unless the internal data object
			// had been the only thing left in it
			if ( !isEmptyDataObject( cache[ id ] ) ) {
				return;
			}
		}

		// Destroy the cache
		if ( isNode ) {
			jQuery.cleanData( [ elem ], true );

		// Use delete when supported for expandos or `cache` is not a window per isWindow (#10080)
		} else if ( jQuery.support.deleteExpando || cache != cache.window ) {
			delete cache[ id ];

		// When all else fails, null
		} else {
			cache[ id ] = null;
		}
	},

	// For internal use only.
	_data: function( elem, name, data ) {
		return jQuery.data( elem, name, data, true );
	},

	// A method for determining if a DOM node can handle the data expando
	acceptData: function( elem ) {
		var noData = elem.nodeName && jQuery.noData[ elem.nodeName.toLowerCase() ];

		// nodes accept data unless otherwise specified; rejection can be conditional
		return !noData || noData !== true && elem.getAttribute("classid") === noData;
	}
});

jQuery.fn.extend({
	data: function( key, value ) {
		var parts, part, attr, name, l,
			elem = this[0],
			i = 0,
			data = null;

		// Gets all values
		if ( key === undefined ) {
			if ( this.length ) {
				data = jQuery.data( elem );

				if ( elem.nodeType === 1 && !jQuery._data( elem, "parsedAttrs" ) ) {
					attr = elem.attributes;
					for ( l = attr.length; i < l; i++ ) {
						name = attr[i].name;

						if ( name.indexOf( "data-" ) === 0 ) {
							name = jQuery.camelCase( name.substring(5) );

							dataAttr( elem, name, data[ name ] );
						}
					}
					jQuery._data( elem, "parsedAttrs", true );
				}
			}

			return data;
		}

		// Sets multiple values
		if ( typeof key === "object" ) {
			return this.each(function() {
				jQuery.data( this, key );
			});
		}

		parts = key.split( ".", 2 );
		parts[1] = parts[1] ? "." + parts[1] : "";
		part = parts[1] + "!";

		return jQuery.access( this, function( value ) {

			if ( value === undefined ) {
				data = this.triggerHandler( "getData" + part, [ parts[0] ] );

				// Try to fetch any internally stored data first
				if ( data === undefined && elem ) {
					data = jQuery.data( elem, key );
					data = dataAttr( elem, key, data );
				}

				return data === undefined && parts[1] ?
					this.data( parts[0] ) :
					data;
			}

			parts[1] = value;
			this.each(function() {
				var self = jQuery( this );

				self.triggerHandler( "setData" + part, parts );
				jQuery.data( this, key, value );
				self.triggerHandler( "changeData" + part, parts );
			});
		}, null, value, arguments.length > 1, null, false );
	},

	removeData: function( key ) {
		return this.each(function() {
			jQuery.removeData( this, key );
		});
	}
});

function dataAttr( elem, key, data ) {
	// If nothing was found internally, try to fetch any
	// data from the HTML5 data-* attribute
	if ( data === undefined && elem.nodeType === 1 ) {

		var name = "data-" + key.replace( rmultiDash, "-$1" ).toLowerCase();

		data = elem.getAttribute( name );

		if ( typeof data === "string" ) {
			try {
				data = data === "true" ? true :
				data === "false" ? false :
				data === "null" ? null :
				// Only convert to a number if it doesn't change the string
				+data + "" === data ? +data :
				rbrace.test( data ) ? jQuery.parseJSON( data ) :
					data;
			} catch( e ) {}

			// Make sure we set the data so it isn't changed later
			jQuery.data( elem, key, data );

		} else {
			data = undefined;
		}
	}

	return data;
}

// checks a cache object for emptiness
function isEmptyDataObject( obj ) {
	var name;
	for ( name in obj ) {

		// if the public data object is empty, the private is still empty
		if ( name === "data" && jQuery.isEmptyObject( obj[name] ) ) {
			continue;
		}
		if ( name !== "toJSON" ) {
			return false;
		}
	}

	return true;
}
jQuery.extend({
	queue: function( elem, type, data ) {
		var queue;

		if ( elem ) {
			type = ( type || "fx" ) + "queue";
			queue = jQuery._data( elem, type );

			// Speed up dequeue by getting out quickly if this is just a lookup
			if ( data ) {
				if ( !queue || jQuery.isArray(data) ) {
					queue = jQuery._data( elem, type, jQuery.makeArray(data) );
				} else {
					queue.push( data );
				}
			}
			return queue || [];
		}
	},

	dequeue: function( elem, type ) {
		type = type || "fx";

		var queue = jQuery.queue( elem, type ),
			fn = queue.shift(),
			hooks = jQuery._queueHooks( elem, type ),
			next = function() {
				jQuery.dequeue( elem, type );
			};

		// If the fx queue is dequeued, always remove the progress sentinel
		if ( fn === "inprogress" ) {
			fn = queue.shift();
		}

		if ( fn ) {

			// Add a progress sentinel to prevent the fx queue from being
			// automatically dequeued
			if ( type === "fx" ) {
				queue.unshift( "inprogress" );
			}

			// clear up the last queue stop function
			delete hooks.stop;
			fn.call( elem, next, hooks );
		}
		if ( !queue.length && hooks ) {
			hooks.empty.fire();
		}
	},

	// not intended for public consumption - generates a queueHooks object, or returns the current one
	_queueHooks: function( elem, type ) {
		var key = type + "queueHooks";
		return jQuery._data( elem, key ) || jQuery._data( elem, key, {
			empty: jQuery.Callbacks("once memory").add(function() {
				jQuery.removeData( elem, type + "queue", true );
				jQuery.removeData( elem, key, true );
			})
		});
	}
});

jQuery.fn.extend({
	queue: function( type, data ) {
		var setter = 2;

		if ( typeof type !== "string" ) {
			data = type;
			type = "fx";
			setter--;
		}

		if ( arguments.length < setter ) {
			return jQuery.queue( this[0], type );
		}

		return data === undefined ?
			this :
			this.each(function() {
				var queue = jQuery.queue( this, type, data );

				// ensure a hooks for this queue
				jQuery._queueHooks( this, type );

				if ( type === "fx" && queue[0] !== "inprogress" ) {
					jQuery.dequeue( this, type );
				}
			});
	},
	dequeue: function( type ) {
		return this.each(function() {
			jQuery.dequeue( this, type );
		});
	},
	// Based off of the plugin by Clint Helfers, with permission.
	// http://blindsignals.com/index.php/2009/07/jquery-delay/
	delay: function( time, type ) {
		time = jQuery.fx ? jQuery.fx.speeds[ time ] || time : time;
		type = type || "fx";

		return this.queue( type, function( next, hooks ) {
			var timeout = setTimeout( next, time );
			hooks.stop = function() {
				clearTimeout( timeout );
			};
		});
	},
	clearQueue: function( type ) {
		return this.queue( type || "fx", [] );
	},
	// Get a promise resolved when queues of a certain type
	// are emptied (fx is the type by default)
	promise: function( type, obj ) {
		var tmp,
			count = 1,
			defer = jQuery.Deferred(),
			elements = this,
			i = this.length,
			resolve = function() {
				if ( !( --count ) ) {
					defer.resolveWith( elements, [ elements ] );
				}
			};

		if ( typeof type !== "string" ) {
			obj = type;
			type = undefined;
		}
		type = type || "fx";

		while( i-- ) {
			if ( (tmp = jQuery._data( elements[ i ], type + "queueHooks" )) && tmp.empty ) {
				count++;
				tmp.empty.add( resolve );
			}
		}
		resolve();
		return defer.promise( obj );
	}
});
var nodeHook, boolHook, fixSpecified,
	rclass = /[\t\r\n]/g,
	rreturn = /\r/g,
	rtype = /^(?:button|input)$/i,
	rfocusable = /^(?:button|input|object|select|textarea)$/i,
	rclickable = /^a(?:rea|)$/i,
	rboolean = /^(?:autofocus|autoplay|async|checked|controls|defer|disabled|hidden|loop|multiple|open|readonly|required|scoped|selected)$/i,
	getSetAttribute = jQuery.support.getSetAttribute;

jQuery.fn.extend({
	attr: function( name, value ) {
		return jQuery.access( this, jQuery.attr, name, value, arguments.length > 1 );
	},

	removeAttr: function( name ) {
		return this.each(function() {
			jQuery.removeAttr( this, name );
		});
	},

	prop: function( name, value ) {
		return jQuery.access( this, jQuery.prop, name, value, arguments.length > 1 );
	},

	removeProp: function( name ) {
		name = jQuery.propFix[ name ] || name;
		return this.each(function() {
			// try/catch handles cases where IE balks (such as removing a property on window)
			try {
				this[ name ] = undefined;
				delete this[ name ];
			} catch( e ) {}
		});
	},

	addClass: function( value ) {
		var classNames, i, l, elem,
			setClass, c, cl;

		if ( jQuery.isFunction( value ) ) {
			return this.each(function( j ) {
				jQuery( this ).addClass( value.call(this, j, this.className) );
			});
		}

		if ( value && typeof value === "string" ) {
			classNames = value.split( core_rspace );

			for ( i = 0, l = this.length; i < l; i++ ) {
				elem = this[ i ];

				if ( elem.nodeType === 1 ) {
					if ( !elem.className && classNames.length === 1 ) {
						elem.className = value;

					} else {
						setClass = " " + elem.className + " ";

						for ( c = 0, cl = classNames.length; c < cl; c++ ) {
							if ( !~setClass.indexOf( " " + classNames[ c ] + " " ) ) {
								setClass += classNames[ c ] + " ";
							}
						}
						elem.className = jQuery.trim( setClass );
					}
				}
			}
		}

		return this;
	},

	removeClass: function( value ) {
		var removes, className, elem, c, cl, i, l;

		if ( jQuery.isFunction( value ) ) {
			return this.each(function( j ) {
				jQuery( this ).removeClass( value.call(this, j, this.className) );
			});
		}
		if ( (value && typeof value === "string") || value === undefined ) {
			removes = ( value || "" ).split( core_rspace );

			for ( i = 0, l = this.length; i < l; i++ ) {
				elem = this[ i ];
				if ( elem.nodeType === 1 && elem.className ) {

					className = (" " + elem.className + " ").replace( rclass, " " );

					// loop over each item in the removal list
					for ( c = 0, cl = removes.length; c < cl; c++ ) {
						// Remove until there is nothing to remove,
						while ( className.indexOf(" " + removes[ c ] + " ") > -1 ) {
							className = className.replace( " " + removes[ c ] + " " , " " );
						}
					}
					elem.className = value ? jQuery.trim( className ) : "";
				}
			}
		}

		return this;
	},

	toggleClass: function( value, stateVal ) {
		var type = typeof value,
			isBool = typeof stateVal === "boolean";

		if ( jQuery.isFunction( value ) ) {
			return this.each(function( i ) {
				jQuery( this ).toggleClass( value.call(this, i, this.className, stateVal), stateVal );
			});
		}

		return this.each(function() {
			if ( type === "string" ) {
				// toggle individual class names
				var className,
					i = 0,
					self = jQuery( this ),
					state = stateVal,
					classNames = value.split( core_rspace );

				while ( (className = classNames[ i++ ]) ) {
					// check each className given, space separated list
					state = isBool ? state : !self.hasClass( className );
					self[ state ? "addClass" : "removeClass" ]( className );
				}

			} else if ( type === "undefined" || type === "boolean" ) {
				if ( this.className ) {
					// store className if set
					jQuery._data( this, "__className__", this.className );
				}

				// toggle whole className
				this.className = this.className || value === false ? "" : jQuery._data( this, "__className__" ) || "";
			}
		});
	},

	hasClass: function( selector ) {
		var className = " " + selector + " ",
			i = 0,
			l = this.length;
		for ( ; i < l; i++ ) {
			if ( this[i].nodeType === 1 && (" " + this[i].className + " ").replace(rclass, " ").indexOf( className ) > -1 ) {
				return true;
			}
		}

		return false;
	},

	val: function( value ) {
		var hooks, ret, isFunction,
			elem = this[0];

		if ( !arguments.length ) {
			if ( elem ) {
				hooks = jQuery.valHooks[ elem.type ] || jQuery.valHooks[ elem.nodeName.toLowerCase() ];

				if ( hooks && "get" in hooks && (ret = hooks.get( elem, "value" )) !== undefined ) {
					return ret;
				}

				ret = elem.value;

				return typeof ret === "string" ?
					// handle most common string cases
					ret.replace(rreturn, "") :
					// handle cases where value is null/undef or number
					ret == null ? "" : ret;
			}

			return;
		}

		isFunction = jQuery.isFunction( value );

		return this.each(function( i ) {
			var val,
				self = jQuery(this);

			if ( this.nodeType !== 1 ) {
				return;
			}

			if ( isFunction ) {
				val = value.call( this, i, self.val() );
			} else {
				val = value;
			}

			// Treat null/undefined as ""; convert numbers to string
			if ( val == null ) {
				val = "";
			} else if ( typeof val === "number" ) {
				val += "";
			} else if ( jQuery.isArray( val ) ) {
				val = jQuery.map(val, function ( value ) {
					return value == null ? "" : value + "";
				});
			}

			hooks = jQuery.valHooks[ this.type ] || jQuery.valHooks[ this.nodeName.toLowerCase() ];

			// If set returns undefined, fall back to normal setting
			if ( !hooks || !("set" in hooks) || hooks.set( this, val, "value" ) === undefined ) {
				this.value = val;
			}
		});
	}
});

jQuery.extend({
	valHooks: {
		option: {
			get: function( elem ) {
				// attributes.value is undefined in Blackberry 4.7 but
				// uses .value. See #6932
				var val = elem.attributes.value;
				return !val || val.specified ? elem.value : elem.text;
			}
		},
		select: {
			get: function( elem ) {
				var value, i, max, option,
					index = elem.selectedIndex,
					values = [],
					options = elem.options,
					one = elem.type === "select-one";

				// Nothing was selected
				if ( index < 0 ) {
					return null;
				}

				// Loop through all the selected options
				i = one ? index : 0;
				max = one ? index + 1 : options.length;
				for ( ; i < max; i++ ) {
					option = options[ i ];

					// Don't return options that are disabled or in a disabled optgroup
					if ( option.selected && (jQuery.support.optDisabled ? !option.disabled : option.getAttribute("disabled") === null) &&
							(!option.parentNode.disabled || !jQuery.nodeName( option.parentNode, "optgroup" )) ) {

						// Get the specific value for the option
						value = jQuery( option ).val();

						// We don't need an array for one selects
						if ( one ) {
							return value;
						}

						// Multi-Selects return an array
						values.push( value );
					}
				}

				// Fixes Bug #2551 -- select.val() broken in IE after form.reset()
				if ( one && !values.length && options.length ) {
					return jQuery( options[ index ] ).val();
				}

				return values;
			},

			set: function( elem, value ) {
				var values = jQuery.makeArray( value );

				jQuery(elem).find("option").each(function() {
					this.selected = jQuery.inArray( jQuery(this).val(), values ) >= 0;
				});

				if ( !values.length ) {
					elem.selectedIndex = -1;
				}
				return values;
			}
		}
	},

	// Unused in 1.8, left in so attrFn-stabbers won't die; remove in 1.9
	attrFn: {},

	attr: function( elem, name, value, pass ) {
		var ret, hooks, notxml,
			nType = elem.nodeType;

		// don't get/set attributes on text, comment and attribute nodes
		if ( !elem || nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		if ( pass && jQuery.isFunction( jQuery.fn[ name ] ) ) {
			return jQuery( elem )[ name ]( value );
		}

		// Fallback to prop when attributes are not supported
		if ( typeof elem.getAttribute === "undefined" ) {
			return jQuery.prop( elem, name, value );
		}

		notxml = nType !== 1 || !jQuery.isXMLDoc( elem );

		// All attributes are lowercase
		// Grab necessary hook if one is defined
		if ( notxml ) {
			name = name.toLowerCase();
			hooks = jQuery.attrHooks[ name ] || ( rboolean.test( name ) ? boolHook : nodeHook );
		}

		if ( value !== undefined ) {

			if ( value === null ) {
				jQuery.removeAttr( elem, name );
				return;

			} else if ( hooks && "set" in hooks && notxml && (ret = hooks.set( elem, value, name )) !== undefined ) {
				return ret;

			} else {
				elem.setAttribute( name, "" + value );
				return value;
			}

		} else if ( hooks && "get" in hooks && notxml && (ret = hooks.get( elem, name )) !== null ) {
			return ret;

		} else {

			ret = elem.getAttribute( name );

			// Non-existent attributes return null, we normalize to undefined
			return ret === null ?
				undefined :
				ret;
		}
	},

	removeAttr: function( elem, value ) {
		var propName, attrNames, name, isBool,
			i = 0;

		if ( value && elem.nodeType === 1 ) {

			attrNames = value.split( core_rspace );

			for ( ; i < attrNames.length; i++ ) {
				name = attrNames[ i ];

				if ( name ) {
					propName = jQuery.propFix[ name ] || name;
					isBool = rboolean.test( name );

					// See #9699 for explanation of this approach (setting first, then removal)
					// Do not do this for boolean attributes (see #10870)
					if ( !isBool ) {
						jQuery.attr( elem, name, "" );
					}
					elem.removeAttribute( getSetAttribute ? name : propName );

					// Set corresponding property to false for boolean attributes
					if ( isBool && propName in elem ) {
						elem[ propName ] = false;
					}
				}
			}
		}
	},

	attrHooks: {
		type: {
			set: function( elem, value ) {
				// We can't allow the type property to be changed (since it causes problems in IE)
				if ( rtype.test( elem.nodeName ) && elem.parentNode ) {
					jQuery.error( "type property can't be changed" );
				} else if ( !jQuery.support.radioValue && value === "radio" && jQuery.nodeName(elem, "input") ) {
					// Setting the type on a radio button after the value resets the value in IE6-9
					// Reset value to it's default in case type is set after value
					// This is for element creation
					var val = elem.value;
					elem.setAttribute( "type", value );
					if ( val ) {
						elem.value = val;
					}
					return value;
				}
			}
		},
		// Use the value property for back compat
		// Use the nodeHook for button elements in IE6/7 (#1954)
		value: {
			get: function( elem, name ) {
				if ( nodeHook && jQuery.nodeName( elem, "button" ) ) {
					return nodeHook.get( elem, name );
				}
				return name in elem ?
					elem.value :
					null;
			},
			set: function( elem, value, name ) {
				if ( nodeHook && jQuery.nodeName( elem, "button" ) ) {
					return nodeHook.set( elem, value, name );
				}
				// Does not return so that setAttribute is also used
				elem.value = value;
			}
		}
	},

	propFix: {
		tabindex: "tabIndex",
		readonly: "readOnly",
		"for": "htmlFor",
		"class": "className",
		maxlength: "maxLength",
		cellspacing: "cellSpacing",
		cellpadding: "cellPadding",
		rowspan: "rowSpan",
		colspan: "colSpan",
		usemap: "useMap",
		frameborder: "frameBorder",
		contenteditable: "contentEditable"
	},

	prop: function( elem, name, value ) {
		var ret, hooks, notxml,
			nType = elem.nodeType;

		// don't get/set properties on text, comment and attribute nodes
		if ( !elem || nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		notxml = nType !== 1 || !jQuery.isXMLDoc( elem );

		if ( notxml ) {
			// Fix name and attach hooks
			name = jQuery.propFix[ name ] || name;
			hooks = jQuery.propHooks[ name ];
		}

		if ( value !== undefined ) {
			if ( hooks && "set" in hooks && (ret = hooks.set( elem, value, name )) !== undefined ) {
				return ret;

			} else {
				return ( elem[ name ] = value );
			}

		} else {
			if ( hooks && "get" in hooks && (ret = hooks.get( elem, name )) !== null ) {
				return ret;

			} else {
				return elem[ name ];
			}
		}
	},

	propHooks: {
		tabIndex: {
			get: function( elem ) {
				// elem.tabIndex doesn't always return the correct value when it hasn't been explicitly set
				// http://fluidproject.org/blog/2008/01/09/getting-setting-and-removing-tabindex-values-with-javascript/
				var attributeNode = elem.getAttributeNode("tabindex");

				return attributeNode && attributeNode.specified ?
					parseInt( attributeNode.value, 10 ) :
					rfocusable.test( elem.nodeName ) || rclickable.test( elem.nodeName ) && elem.href ?
						0 :
						undefined;
			}
		}
	}
});

// Hook for boolean attributes
boolHook = {
	get: function( elem, name ) {
		// Align boolean attributes with corresponding properties
		// Fall back to attribute presence where some booleans are not supported
		var attrNode,
			property = jQuery.prop( elem, name );
		return property === true || typeof property !== "boolean" && ( attrNode = elem.getAttributeNode(name) ) && attrNode.nodeValue !== false ?
			name.toLowerCase() :
			undefined;
	},
	set: function( elem, value, name ) {
		var propName;
		if ( value === false ) {
			// Remove boolean attributes when set to false
			jQuery.removeAttr( elem, name );
		} else {
			// value is true since we know at this point it's type boolean and not false
			// Set boolean attributes to the same name and set the DOM property
			propName = jQuery.propFix[ name ] || name;
			if ( propName in elem ) {
				// Only set the IDL specifically if it already exists on the element
				elem[ propName ] = true;
			}

			elem.setAttribute( name, name.toLowerCase() );
		}
		return name;
	}
};

// IE6/7 do not support getting/setting some attributes with get/setAttribute
if ( !getSetAttribute ) {

	fixSpecified = {
		name: true,
		id: true,
		coords: true
	};

	// Use this for any attribute in IE6/7
	// This fixes almost every IE6/7 issue
	nodeHook = jQuery.valHooks.button = {
		get: function( elem, name ) {
			var ret;
			ret = elem.getAttributeNode( name );
			return ret && ( fixSpecified[ name ] ? ret.value !== "" : ret.specified ) ?
				ret.value :
				undefined;
		},
		set: function( elem, value, name ) {
			// Set the existing or create a new attribute node
			var ret = elem.getAttributeNode( name );
			if ( !ret ) {
				ret = document.createAttribute( name );
				elem.setAttributeNode( ret );
			}
			return ( ret.value = value + "" );
		}
	};

	// Set width and height to auto instead of 0 on empty string( Bug #8150 )
	// This is for removals
	jQuery.each([ "width", "height" ], function( i, name ) {
		jQuery.attrHooks[ name ] = jQuery.extend( jQuery.attrHooks[ name ], {
			set: function( elem, value ) {
				if ( value === "" ) {
					elem.setAttribute( name, "auto" );
					return value;
				}
			}
		});
	});

	// Set contenteditable to false on removals(#10429)
	// Setting to empty string throws an error as an invalid value
	jQuery.attrHooks.contenteditable = {
		get: nodeHook.get,
		set: function( elem, value, name ) {
			if ( value === "" ) {
				value = "false";
			}
			nodeHook.set( elem, value, name );
		}
	};
}


// Some attributes require a special call on IE
if ( !jQuery.support.hrefNormalized ) {
	jQuery.each([ "href", "src", "width", "height" ], function( i, name ) {
		jQuery.attrHooks[ name ] = jQuery.extend( jQuery.attrHooks[ name ], {
			get: function( elem ) {
				var ret = elem.getAttribute( name, 2 );
				return ret === null ? undefined : ret;
			}
		});
	});
}

if ( !jQuery.support.style ) {
	jQuery.attrHooks.style = {
		get: function( elem ) {
			// Return undefined in the case of empty string
			// Normalize to lowercase since IE uppercases css property names
			return elem.style.cssText.toLowerCase() || undefined;
		},
		set: function( elem, value ) {
			return ( elem.style.cssText = "" + value );
		}
	};
}

// Safari mis-reports the default selected property of an option
// Accessing the parent's selectedIndex property fixes it
if ( !jQuery.support.optSelected ) {
	jQuery.propHooks.selected = jQuery.extend( jQuery.propHooks.selected, {
		get: function( elem ) {
			var parent = elem.parentNode;

			if ( parent ) {
				parent.selectedIndex;

				// Make sure that it also works with optgroups, see #5701
				if ( parent.parentNode ) {
					parent.parentNode.selectedIndex;
				}
			}
			return null;
		}
	});
}

// IE6/7 call enctype encoding
if ( !jQuery.support.enctype ) {
	jQuery.propFix.enctype = "encoding";
}

// Radios and checkboxes getter/setter
if ( !jQuery.support.checkOn ) {
	jQuery.each([ "radio", "checkbox" ], function() {
		jQuery.valHooks[ this ] = {
			get: function( elem ) {
				// Handle the case where in Webkit "" is returned instead of "on" if a value isn't specified
				return elem.getAttribute("value") === null ? "on" : elem.value;
			}
		};
	});
}
jQuery.each([ "radio", "checkbox" ], function() {
	jQuery.valHooks[ this ] = jQuery.extend( jQuery.valHooks[ this ], {
		set: function( elem, value ) {
			if ( jQuery.isArray( value ) ) {
				return ( elem.checked = jQuery.inArray( jQuery(elem).val(), value ) >= 0 );
			}
		}
	});
});
var rformElems = /^(?:textarea|input|select)$/i,
	rtypenamespace = /^([^\.]*|)(?:\.(.+)|)$/,
	rhoverHack = /(?:^|\s)hover(\.\S+|)\b/,
	rkeyEvent = /^key/,
	rmouseEvent = /^(?:mouse|contextmenu)|click/,
	rfocusMorph = /^(?:focusinfocus|focusoutblur)$/,
	hoverHack = function( events ) {
		return jQuery.event.special.hover ? events : events.replace( rhoverHack, "mouseenter$1 mouseleave$1" );
	};

/*
 * Helper functions for managing events -- not part of the public interface.
 * Props to Dean Edwards' addEvent library for many of the ideas.
 */
jQuery.event = {

	add: function( elem, types, handler, data, selector ) {

		var elemData, eventHandle, events,
			t, tns, type, namespaces, handleObj,
			handleObjIn, handlers, special;

		// Don't attach events to noData or text/comment nodes (allow plain objects tho)
		if ( elem.nodeType === 3 || elem.nodeType === 8 || !types || !handler || !(elemData = jQuery._data( elem )) ) {
			return;
		}

		// Caller can pass in an object of custom data in lieu of the handler
		if ( handler.handler ) {
			handleObjIn = handler;
			handler = handleObjIn.handler;
			selector = handleObjIn.selector;
		}

		// Make sure that the handler has a unique ID, used to find/remove it later
		if ( !handler.guid ) {
			handler.guid = jQuery.guid++;
		}

		// Init the element's event structure and main handler, if this is the first
		events = elemData.events;
		if ( !events ) {
			elemData.events = events = {};
		}
		eventHandle = elemData.handle;
		if ( !eventHandle ) {
			elemData.handle = eventHandle = function( e ) {
				// Discard the second event of a jQuery.event.trigger() and
				// when an event is called after a page has unloaded
				return typeof jQuery !== "undefined" && (!e || jQuery.event.triggered !== e.type) ?
					jQuery.event.dispatch.apply( eventHandle.elem, arguments ) :
					undefined;
			};
			// Add elem as a property of the handle fn to prevent a memory leak with IE non-native events
			eventHandle.elem = elem;
		}

		// Handle multiple events separated by a space
		// jQuery(...).bind("mouseover mouseout", fn);
		types = jQuery.trim( hoverHack(types) ).split( " " );
		for ( t = 0; t < types.length; t++ ) {

			tns = rtypenamespace.exec( types[t] ) || [];
			type = tns[1];
			namespaces = ( tns[2] || "" ).split( "." ).sort();

			// If event changes its type, use the special event handlers for the changed type
			special = jQuery.event.special[ type ] || {};

			// If selector defined, determine special event api type, otherwise given type
			type = ( selector ? special.delegateType : special.bindType ) || type;

			// Update special based on newly reset type
			special = jQuery.event.special[ type ] || {};

			// handleObj is passed to all event handlers
			handleObj = jQuery.extend({
				type: type,
				origType: tns[1],
				data: data,
				handler: handler,
				guid: handler.guid,
				selector: selector,
				namespace: namespaces.join(".")
			}, handleObjIn );

			// Init the event handler queue if we're the first
			handlers = events[ type ];
			if ( !handlers ) {
				handlers = events[ type ] = [];
				handlers.delegateCount = 0;

				// Only use addEventListener/attachEvent if the special events handler returns false
				if ( !special.setup || special.setup.call( elem, data, namespaces, eventHandle ) === false ) {
					// Bind the global event handler to the element
					if ( elem.addEventListener ) {
						elem.addEventListener( type, eventHandle, false );

					} else if ( elem.attachEvent ) {
						elem.attachEvent( "on" + type, eventHandle );
					}
				}
			}

			if ( special.add ) {
				special.add.call( elem, handleObj );

				if ( !handleObj.handler.guid ) {
					handleObj.handler.guid = handler.guid;
				}
			}

			// Add to the element's handler list, delegates in front
			if ( selector ) {
				handlers.splice( handlers.delegateCount++, 0, handleObj );
			} else {
				handlers.push( handleObj );
			}

			// Keep track of which events have ever been used, for event optimization
			jQuery.event.global[ type ] = true;
		}

		// Nullify elem to prevent memory leaks in IE
		elem = null;
	},

	global: {},

	// Detach an event or set of events from an element
	remove: function( elem, types, handler, selector, mappedTypes ) {

		var t, tns, type, origType, namespaces, origCount,
			j, events, special, eventType, handleObj,
			elemData = jQuery.hasData( elem ) && jQuery._data( elem );

		if ( !elemData || !(events = elemData.events) ) {
			return;
		}

		// Once for each type.namespace in types; type may be omitted
		types = jQuery.trim( hoverHack( types || "" ) ).split(" ");
		for ( t = 0; t < types.length; t++ ) {
			tns = rtypenamespace.exec( types[t] ) || [];
			type = origType = tns[1];
			namespaces = tns[2];

			// Unbind all events (on this namespace, if provided) for the element
			if ( !type ) {
				for ( type in events ) {
					jQuery.event.remove( elem, type + types[ t ], handler, selector, true );
				}
				continue;
			}

			special = jQuery.event.special[ type ] || {};
			type = ( selector? special.delegateType : special.bindType ) || type;
			eventType = events[ type ] || [];
			origCount = eventType.length;
			namespaces = namespaces ? new RegExp("(^|\\.)" + namespaces.split(".").sort().join("\\.(?:.*\\.|)") + "(\\.|$)") : null;

			// Remove matching events
			for ( j = 0; j < eventType.length; j++ ) {
				handleObj = eventType[ j ];

				if ( ( mappedTypes || origType === handleObj.origType ) &&
					 ( !handler || handler.guid === handleObj.guid ) &&
					 ( !namespaces || namespaces.test( handleObj.namespace ) ) &&
					 ( !selector || selector === handleObj.selector || selector === "**" && handleObj.selector ) ) {
					eventType.splice( j--, 1 );

					if ( handleObj.selector ) {
						eventType.delegateCount--;
					}
					if ( special.remove ) {
						special.remove.call( elem, handleObj );
					}
				}
			}

			// Remove generic event handler if we removed something and no more handlers exist
			// (avoids potential for endless recursion during removal of special event handlers)
			if ( eventType.length === 0 && origCount !== eventType.length ) {
				if ( !special.teardown || special.teardown.call( elem, namespaces, elemData.handle ) === false ) {
					jQuery.removeEvent( elem, type, elemData.handle );
				}

				delete events[ type ];
			}
		}

		// Remove the expando if it's no longer used
		if ( jQuery.isEmptyObject( events ) ) {
			delete elemData.handle;

			// removeData also checks for emptiness and clears the expando if empty
			// so use it instead of delete
			jQuery.removeData( elem, "events", true );
		}
	},

	// Events that are safe to short-circuit if no handlers are attached.
	// Native DOM events should not be added, they may have inline handlers.
	customEvent: {
		"getData": true,
		"setData": true,
		"changeData": true
	},

	trigger: function( event, data, elem, onlyHandlers ) {
		// Don't do events on text and comment nodes
		if ( elem && (elem.nodeType === 3 || elem.nodeType === 8) ) {
			return;
		}

		// Event object or event type
		var cache, exclusive, i, cur, old, ontype, special, handle, eventPath, bubbleType,
			type = event.type || event,
			namespaces = [];

		// focus/blur morphs to focusin/out; ensure we're not firing them right now
		if ( rfocusMorph.test( type + jQuery.event.triggered ) ) {
			return;
		}

		if ( type.indexOf( "!" ) >= 0 ) {
			// Exclusive events trigger only for the exact event (no namespaces)
			type = type.slice(0, -1);
			exclusive = true;
		}

		if ( type.indexOf( "." ) >= 0 ) {
			// Namespaced trigger; create a regexp to match event type in handle()
			namespaces = type.split(".");
			type = namespaces.shift();
			namespaces.sort();
		}

		if ( (!elem || jQuery.event.customEvent[ type ]) && !jQuery.event.global[ type ] ) {
			// No jQuery handlers for this event type, and it can't have inline handlers
			return;
		}

		// Caller can pass in an Event, Object, or just an event type string
		event = typeof event === "object" ?
			// jQuery.Event object
			event[ jQuery.expando ] ? event :
			// Object literal
			new jQuery.Event( type, event ) :
			// Just the event type (string)
			new jQuery.Event( type );

		event.type = type;
		event.isTrigger = true;
		event.exclusive = exclusive;
		event.namespace = namespaces.join( "." );
		event.namespace_re = event.namespace? new RegExp("(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)") : null;
		ontype = type.indexOf( ":" ) < 0 ? "on" + type : "";

		// Handle a global trigger
		if ( !elem ) {

			// TODO: Stop taunting the data cache; remove global events and always attach to document
			cache = jQuery.cache;
			for ( i in cache ) {
				if ( cache[ i ].events && cache[ i ].events[ type ] ) {
					jQuery.event.trigger( event, data, cache[ i ].handle.elem, true );
				}
			}
			return;
		}

		// Clean up the event in case it is being reused
		event.result = undefined;
		if ( !event.target ) {
			event.target = elem;
		}

		// Clone any incoming data and prepend the event, creating the handler arg list
		data = data != null ? jQuery.makeArray( data ) : [];
		data.unshift( event );

		// Allow special events to draw outside the lines
		special = jQuery.event.special[ type ] || {};
		if ( special.trigger && special.trigger.apply( elem, data ) === false ) {
			return;
		}

		// Determine event propagation path in advance, per W3C events spec (#9951)
		// Bubble up to document, then to window; watch for a global ownerDocument var (#9724)
		eventPath = [[ elem, special.bindType || type ]];
		if ( !onlyHandlers && !special.noBubble && !jQuery.isWindow( elem ) ) {

			bubbleType = special.delegateType || type;
			cur = rfocusMorph.test( bubbleType + type ) ? elem : elem.parentNode;
			for ( old = elem; cur; cur = cur.parentNode ) {
				eventPath.push([ cur, bubbleType ]);
				old = cur;
			}

			// Only add window if we got to document (e.g., not plain obj or detached DOM)
			if ( old === (elem.ownerDocument || document) ) {
				eventPath.push([ old.defaultView || old.parentWindow || window, bubbleType ]);
			}
		}

		// Fire handlers on the event path
		for ( i = 0; i < eventPath.length && !event.isPropagationStopped(); i++ ) {

			cur = eventPath[i][0];
			event.type = eventPath[i][1];

			handle = ( jQuery._data( cur, "events" ) || {} )[ event.type ] && jQuery._data( cur, "handle" );
			if ( handle ) {
				handle.apply( cur, data );
			}
			// Note that this is a bare JS function and not a jQuery handler
			handle = ontype && cur[ ontype ];
			if ( handle && jQuery.acceptData( cur ) && handle.apply( cur, data ) === false ) {
				event.preventDefault();
			}
		}
		event.type = type;

		// If nobody prevented the default action, do it now
		if ( !onlyHandlers && !event.isDefaultPrevented() ) {

			if ( (!special._default || special._default.apply( elem.ownerDocument, data ) === false) &&
				!(type === "click" && jQuery.nodeName( elem, "a" )) && jQuery.acceptData( elem ) ) {

				// Call a native DOM method on the target with the same name name as the event.
				// Can't use an .isFunction() check here because IE6/7 fails that test.
				// Don't do default actions on window, that's where global variables be (#6170)
				// IE<9 dies on focus/blur to hidden element (#1486)
				if ( ontype && elem[ type ] && ((type !== "focus" && type !== "blur") || event.target.offsetWidth !== 0) && !jQuery.isWindow( elem ) ) {

					// Don't re-trigger an onFOO event when we call its FOO() method
					old = elem[ ontype ];

					if ( old ) {
						elem[ ontype ] = null;
					}

					// Prevent re-triggering of the same event, since we already bubbled it above
					jQuery.event.triggered = type;
					elem[ type ]();
					jQuery.event.triggered = undefined;

					if ( old ) {
						elem[ ontype ] = old;
					}
				}
			}
		}

		return event.result;
	},

	dispatch: function( event ) {

		// Make a writable jQuery.Event from the native event object
		event = jQuery.event.fix( event || window.event );

		var i, j, cur, jqcur, ret, selMatch, matched, matches, handleObj, sel, related,
			handlers = ( (jQuery._data( this, "events" ) || {} )[ event.type ] || []),
			delegateCount = handlers.delegateCount,
			args = [].slice.call( arguments ),
			run_all = !event.exclusive && !event.namespace,
			special = jQuery.event.special[ event.type ] || {},
			handlerQueue = [];

		// Use the fix-ed jQuery.Event rather than the (read-only) native event
		args[0] = event;
		event.delegateTarget = this;

		// Call the preDispatch hook for the mapped type, and let it bail if desired
		if ( special.preDispatch && special.preDispatch.call( this, event ) === false ) {
			return;
		}

		// Determine handlers that should run if there are delegated events
		// Avoid non-left-click bubbling in Firefox (#3861)
		if ( delegateCount && !(event.button && event.type === "click") ) {

			// Pregenerate a single jQuery object for reuse with .is()
			jqcur = jQuery(this);
			jqcur.context = this;

			for ( cur = event.target; cur != this; cur = cur.parentNode || this ) {

				// Don't process clicks (ONLY) on disabled elements (#6911, #8165, #xxxx)
				if ( cur.disabled !== true || event.type !== "click" ) {
					selMatch = {};
					matches = [];
					jqcur[0] = cur;
					for ( i = 0; i < delegateCount; i++ ) {
						handleObj = handlers[ i ];
						sel = handleObj.selector;

						if ( selMatch[ sel ] === undefined ) {
							selMatch[ sel ] = jqcur.is( sel );
						}
						if ( selMatch[ sel ] ) {
							matches.push( handleObj );
						}
					}
					if ( matches.length ) {
						handlerQueue.push({ elem: cur, matches: matches });
					}
				}
			}
		}

		// Add the remaining (directly-bound) handlers
		if ( handlers.length > delegateCount ) {
			handlerQueue.push({ elem: this, matches: handlers.slice( delegateCount ) });
		}

		// Run delegates first; they may want to stop propagation beneath us
		for ( i = 0; i < handlerQueue.length && !event.isPropagationStopped(); i++ ) {
			matched = handlerQueue[ i ];
			event.currentTarget = matched.elem;

			for ( j = 0; j < matched.matches.length && !event.isImmediatePropagationStopped(); j++ ) {
				handleObj = matched.matches[ j ];

				// Triggered event must either 1) be non-exclusive and have no namespace, or
				// 2) have namespace(s) a subset or equal to those in the bound event (both can have no namespace).
				if ( run_all || (!event.namespace && !handleObj.namespace) || event.namespace_re && event.namespace_re.test( handleObj.namespace ) ) {

					event.data = handleObj.data;
					event.handleObj = handleObj;

					ret = ( (jQuery.event.special[ handleObj.origType ] || {}).handle || handleObj.handler )
							.apply( matched.elem, args );

					if ( ret !== undefined ) {
						event.result = ret;
						if ( ret === false ) {
							event.preventDefault();
							event.stopPropagation();
						}
					}
				}
			}
		}

		// Call the postDispatch hook for the mapped type
		if ( special.postDispatch ) {
			special.postDispatch.call( this, event );
		}

		return event.result;
	},

	// Includes some event props shared by KeyEvent and MouseEvent
	// *** attrChange attrName relatedNode srcElement  are not normalized, non-W3C, deprecated, will be removed in 1.8 ***
	props: "attrChange attrName relatedNode srcElement altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),

	fixHooks: {},

	keyHooks: {
		props: "char charCode key keyCode".split(" "),
		filter: function( event, original ) {

			// Add which for key events
			if ( event.which == null ) {
				event.which = original.charCode != null ? original.charCode : original.keyCode;
			}

			return event;
		}
	},

	mouseHooks: {
		props: "button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
		filter: function( event, original ) {
			var eventDoc, doc, body,
				button = original.button,
				fromElement = original.fromElement;

			// Calculate pageX/Y if missing and clientX/Y available
			if ( event.pageX == null && original.clientX != null ) {
				eventDoc = event.target.ownerDocument || document;
				doc = eventDoc.documentElement;
				body = eventDoc.body;

				event.pageX = original.clientX + ( doc && doc.scrollLeft || body && body.scrollLeft || 0 ) - ( doc && doc.clientLeft || body && body.clientLeft || 0 );
				event.pageY = original.clientY + ( doc && doc.scrollTop  || body && body.scrollTop  || 0 ) - ( doc && doc.clientTop  || body && body.clientTop  || 0 );
			}

			// Add relatedTarget, if necessary
			if ( !event.relatedTarget && fromElement ) {
				event.relatedTarget = fromElement === event.target ? original.toElement : fromElement;
			}

			// Add which for click: 1 === left; 2 === middle; 3 === right
			// Note: button is not normalized, so don't use it
			if ( !event.which && button !== undefined ) {
				event.which = ( button & 1 ? 1 : ( button & 2 ? 3 : ( button & 4 ? 2 : 0 ) ) );
			}

			return event;
		}
	},

	fix: function( event ) {
		if ( event[ jQuery.expando ] ) {
			return event;
		}

		// Create a writable copy of the event object and normalize some properties
		var i, prop,
			originalEvent = event,
			fixHook = jQuery.event.fixHooks[ event.type ] || {},
			copy = fixHook.props ? this.props.concat( fixHook.props ) : this.props;

		event = jQuery.Event( originalEvent );

		for ( i = copy.length; i; ) {
			prop = copy[ --i ];
			event[ prop ] = originalEvent[ prop ];
		}

		// Fix target property, if necessary (#1925, IE 6/7/8 & Safari2)
		if ( !event.target ) {
			event.target = originalEvent.srcElement || document;
		}

		// Target should not be a text node (#504, Safari)
		if ( event.target.nodeType === 3 ) {
			event.target = event.target.parentNode;
		}

		// For mouse/key events, metaKey==false if it's undefined (#3368, #11328; IE6/7/8)
		event.metaKey = !!event.metaKey;

		return fixHook.filter? fixHook.filter( event, originalEvent ) : event;
	},

	special: {
		ready: {
			// Make sure the ready event is setup
			setup: jQuery.bindReady
		},

		load: {
			// Prevent triggered image.load events from bubbling to window.load
			noBubble: true
		},

		focus: {
			delegateType: "focusin"
		},
		blur: {
			delegateType: "focusout"
		},

		beforeunload: {
			setup: function( data, namespaces, eventHandle ) {
				// We only want to do this special case on windows
				if ( jQuery.isWindow( this ) ) {
					this.onbeforeunload = eventHandle;
				}
			},

			teardown: function( namespaces, eventHandle ) {
				if ( this.onbeforeunload === eventHandle ) {
					this.onbeforeunload = null;
				}
			}
		}
	},

	simulate: function( type, elem, event, bubble ) {
		// Piggyback on a donor event to simulate a different one.
		// Fake originalEvent to avoid donor's stopPropagation, but if the
		// simulated event prevents default then we do the same on the donor.
		var e = jQuery.extend(
			new jQuery.Event(),
			event,
			{ type: type,
				isSimulated: true,
				originalEvent: {}
			}
		);
		if ( bubble ) {
			jQuery.event.trigger( e, null, elem );
		} else {
			jQuery.event.dispatch.call( elem, e );
		}
		if ( e.isDefaultPrevented() ) {
			event.preventDefault();
		}
	}
};

// Some plugins are using, but it's undocumented/deprecated and will be removed.
// The 1.7 special event interface should provide all the hooks needed now.
jQuery.event.handle = jQuery.event.dispatch;

jQuery.removeEvent = document.removeEventListener ?
	function( elem, type, handle ) {
		if ( elem.removeEventListener ) {
			elem.removeEventListener( type, handle, false );
		}
	} :
	function( elem, type, handle ) {
		var name = "on" + type;

		if ( elem.detachEvent ) {

			// #8545, #7054, preventing memory leaks for custom events in IE6-8 –
			// detachEvent needed property on element, by name of that event, to properly expose it to GC
			if ( typeof elem[ name ] === "undefined" ) {
				elem[ name ] = null;
			}

			elem.detachEvent( name, handle );
		}
	};

jQuery.Event = function( src, props ) {
	// Allow instantiation without the 'new' keyword
	if ( !(this instanceof jQuery.Event) ) {
		return new jQuery.Event( src, props );
	}

	// Event object
	if ( src && src.type ) {
		this.originalEvent = src;
		this.type = src.type;

		// Events bubbling up the document may have been marked as prevented
		// by a handler lower down the tree; reflect the correct value.
		this.isDefaultPrevented = ( src.defaultPrevented || src.returnValue === false ||
			src.getPreventDefault && src.getPreventDefault() ) ? returnTrue : returnFalse;

	// Event type
	} else {
		this.type = src;
	}

	// Put explicitly provided properties onto the event object
	if ( props ) {
		jQuery.extend( this, props );
	}

	// Create a timestamp if incoming event doesn't have one
	this.timeStamp = src && src.timeStamp || jQuery.now();

	// Mark it as fixed
	this[ jQuery.expando ] = true;
};

function returnFalse() {
	return false;
}
function returnTrue() {
	return true;
}

// jQuery.Event is based on DOM3 Events as specified by the ECMAScript Language Binding
// http://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
jQuery.Event.prototype = {
	preventDefault: function() {
		this.isDefaultPrevented = returnTrue;

		var e = this.originalEvent;
		if ( !e ) {
			return;
		}

		// if preventDefault exists run it on the original event
		if ( e.preventDefault ) {
			e.preventDefault();

		// otherwise set the returnValue property of the original event to false (IE)
		} else {
			e.returnValue = false;
		}
	},
	stopPropagation: function() {
		this.isPropagationStopped = returnTrue;

		var e = this.originalEvent;
		if ( !e ) {
			return;
		}
		// if stopPropagation exists run it on the original event
		if ( e.stopPropagation ) {
			e.stopPropagation();
		}
		// otherwise set the cancelBubble property of the original event to true (IE)
		e.cancelBubble = true;
	},
	stopImmediatePropagation: function() {
		this.isImmediatePropagationStopped = returnTrue;
		this.stopPropagation();
	},
	isDefaultPrevented: returnFalse,
	isPropagationStopped: returnFalse,
	isImmediatePropagationStopped: returnFalse
};

// Create mouseenter/leave events using mouseover/out and event-time checks
jQuery.each({
	mouseenter: "mouseover",
	mouseleave: "mouseout"
}, function( orig, fix ) {
	jQuery.event.special[ orig ] = {
		delegateType: fix,
		bindType: fix,

		handle: function( event ) {
			var ret,
				target = this,
				related = event.relatedTarget,
				handleObj = event.handleObj,
				selector = handleObj.selector;

			// For mousenter/leave call the handler if related is outside the target.
			// NB: No relatedTarget if the mouse left/entered the browser window
			if ( !related || (related !== target && !jQuery.contains( target, related )) ) {
				event.type = handleObj.origType;
				ret = handleObj.handler.apply( this, arguments );
				event.type = fix;
			}
			return ret;
		}
	};
});

// IE submit delegation
if ( !jQuery.support.submitBubbles ) {

	jQuery.event.special.submit = {
		setup: function() {
			// Only need this for delegated form submit events
			if ( jQuery.nodeName( this, "form" ) ) {
				return false;
			}

			// Lazy-add a submit handler when a descendant form may potentially be submitted
			jQuery.event.add( this, "click._submit keypress._submit", function( e ) {
				// Node name check avoids a VML-related crash in IE (#9807)
				var elem = e.target,
					form = jQuery.nodeName( elem, "input" ) || jQuery.nodeName( elem, "button" ) ? elem.form : undefined;
				if ( form && !jQuery._data( form, "_submit_attached" ) ) {
					jQuery.event.add( form, "submit._submit", function( event ) {
						event._submit_bubble = true;
					});
					jQuery._data( form, "_submit_attached", true );
				}
			});
			// return undefined since we don't need an event listener
		},

		postDispatch: function( event ) {
			// If form was submitted by the user, bubble the event up the tree
			if ( event._submit_bubble ) {
				delete event._submit_bubble;
				if ( this.parentNode && !event.isTrigger ) {
					jQuery.event.simulate( "submit", this.parentNode, event, true );
				}
			}
		},

		teardown: function() {
			// Only need this for delegated form submit events
			if ( jQuery.nodeName( this, "form" ) ) {
				return false;
			}

			// Remove delegated handlers; cleanData eventually reaps submit handlers attached above
			jQuery.event.remove( this, "._submit" );
		}
	};
}

// IE change delegation and checkbox/radio fix
if ( !jQuery.support.changeBubbles ) {

	jQuery.event.special.change = {

		setup: function() {

			if ( rformElems.test( this.nodeName ) ) {
				// IE doesn't fire change on a check/radio until blur; trigger it on click
				// after a propertychange. Eat the blur-change in special.change.handle.
				// This still fires onchange a second time for check/radio after blur.
				if ( this.type === "checkbox" || this.type === "radio" ) {
					jQuery.event.add( this, "propertychange._change", function( event ) {
						if ( event.originalEvent.propertyName === "checked" ) {
							this._just_changed = true;
						}
					});
					jQuery.event.add( this, "click._change", function( event ) {
						if ( this._just_changed && !event.isTrigger ) {
							this._just_changed = false;
						}
						// Allow triggered, simulated change events (#11500)
						jQuery.event.simulate( "change", this, event, true );
					});
				}
				return false;
			}
			// Delegated event; lazy-add a change handler on descendant inputs
			jQuery.event.add( this, "beforeactivate._change", function( e ) {
				var elem = e.target;

				if ( rformElems.test( elem.nodeName ) && !jQuery._data( elem, "_change_attached" ) ) {
					jQuery.event.add( elem, "change._change", function( event ) {
						if ( this.parentNode && !event.isSimulated && !event.isTrigger ) {
							jQuery.event.simulate( "change", this.parentNode, event, true );
						}
					});
					jQuery._data( elem, "_change_attached", true );
				}
			});
		},

		handle: function( event ) {
			var elem = event.target;

			// Swallow native change events from checkbox/radio, we already triggered them above
			if ( this !== elem || event.isSimulated || event.isTrigger || (elem.type !== "radio" && elem.type !== "checkbox") ) {
				return event.handleObj.handler.apply( this, arguments );
			}
		},

		teardown: function() {
			jQuery.event.remove( this, "._change" );

			return rformElems.test( this.nodeName );
		}
	};
}

// Create "bubbling" focus and blur events
if ( !jQuery.support.focusinBubbles ) {
	jQuery.each({ focus: "focusin", blur: "focusout" }, function( orig, fix ) {

		// Attach a single capturing handler while someone wants focusin/focusout
		var attaches = 0,
			handler = function( event ) {
				jQuery.event.simulate( fix, event.target, jQuery.event.fix( event ), true );
			};

		jQuery.event.special[ fix ] = {
			setup: function() {
				if ( attaches++ === 0 ) {
					document.addEventListener( orig, handler, true );
				}
			},
			teardown: function() {
				if ( --attaches === 0 ) {
					document.removeEventListener( orig, handler, true );
				}
			}
		};
	});
}

jQuery.fn.extend({

	on: function( types, selector, data, fn, /*INTERNAL*/ one ) {
		var origFn, type;

		// Types can be a map of types/handlers
		if ( typeof types === "object" ) {
			// ( types-Object, selector, data )
			if ( typeof selector !== "string" ) { // && selector != null
				// ( types-Object, data )
				data = data || selector;
				selector = undefined;
			}
			for ( type in types ) {
				this.on( type, selector, data, types[ type ], one );
			}
			return this;
		}

		if ( data == null && fn == null ) {
			// ( types, fn )
			fn = selector;
			data = selector = undefined;
		} else if ( fn == null ) {
			if ( typeof selector === "string" ) {
				// ( types, selector, fn )
				fn = data;
				data = undefined;
			} else {
				// ( types, data, fn )
				fn = data;
				data = selector;
				selector = undefined;
			}
		}
		if ( fn === false ) {
			fn = returnFalse;
		} else if ( !fn ) {
			return this;
		}

		if ( one === 1 ) {
			origFn = fn;
			fn = function( event ) {
				// Can use an empty set, since event contains the info
				jQuery().off( event );
				return origFn.apply( this, arguments );
			};
			// Use same guid so caller can remove using origFn
			fn.guid = origFn.guid || ( origFn.guid = jQuery.guid++ );
		}
		return this.each( function() {
			jQuery.event.add( this, types, fn, data, selector );
		});
	},
	one: function( types, selector, data, fn ) {
		return this.on( types, selector, data, fn, 1 );
	},
	off: function( types, selector, fn ) {
		var handleObj, type;
		if ( types && types.preventDefault && types.handleObj ) {
			// ( event )  dispatched jQuery.Event
			handleObj = types.handleObj;
			jQuery( types.delegateTarget ).off(
				handleObj.namespace ? handleObj.origType + "." + handleObj.namespace : handleObj.origType,
				handleObj.selector,
				handleObj.handler
			);
			return this;
		}
		if ( typeof types === "object" ) {
			// ( types-object [, selector] )
			for ( type in types ) {
				this.off( type, selector, types[ type ] );
			}
			return this;
		}
		if ( selector === false || typeof selector === "function" ) {
			// ( types [, fn] )
			fn = selector;
			selector = undefined;
		}
		if ( fn === false ) {
			fn = returnFalse;
		}
		return this.each(function() {
			jQuery.event.remove( this, types, fn, selector );
		});
	},

	bind: function( types, data, fn ) {
		return this.on( types, null, data, fn );
	},
	unbind: function( types, fn ) {
		return this.off( types, null, fn );
	},

	live: function( types, data, fn ) {
		jQuery( this.context ).on( types, this.selector, data, fn );
		return this;
	},
	die: function( types, fn ) {
		jQuery( this.context ).off( types, this.selector || "**", fn );
		return this;
	},

	delegate: function( selector, types, data, fn ) {
		return this.on( types, selector, data, fn );
	},
	undelegate: function( selector, types, fn ) {
		// ( namespace ) or ( selector, types [, fn] )
		return arguments.length == 1? this.off( selector, "**" ) : this.off( types, selector || "**", fn );
	},

	trigger: function( type, data ) {
		return this.each(function() {
			jQuery.event.trigger( type, data, this );
		});
	},
	triggerHandler: function( type, data ) {
		if ( this[0] ) {
			return jQuery.event.trigger( type, data, this[0], true );
		}
	},

	toggle: function( fn ) {
		// Save reference to arguments for access in closure
		var args = arguments,
			guid = fn.guid || jQuery.guid++,
			i = 0,
			toggler = function( event ) {
				// Figure out which function to execute
				var lastToggle = ( jQuery._data( this, "lastToggle" + fn.guid ) || 0 ) % i;
				jQuery._data( this, "lastToggle" + fn.guid, lastToggle + 1 );

				// Make sure that clicks stop
				event.preventDefault();

				// and execute the function
				return args[ lastToggle ].apply( this, arguments ) || false;
			};

		// link all the functions, so any of them can unbind this click handler
		toggler.guid = guid;
		while ( i < args.length ) {
			args[ i++ ].guid = guid;
		}

		return this.click( toggler );
	},

	hover: function( fnOver, fnOut ) {
		return this.mouseenter( fnOver ).mouseleave( fnOut || fnOver );
	}
});

jQuery.each( ("blur focus focusin focusout load resize scroll unload click dblclick " +
	"mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " +
	"change select submit keydown keypress keyup error contextmenu").split(" "), function( i, name ) {

	// Handle event binding
	jQuery.fn[ name ] = function( data, fn ) {
		if ( fn == null ) {
			fn = data;
			data = null;
		}

		return arguments.length > 0 ?
			this.on( name, null, data, fn ) :
			this.trigger( name );
	};

	if ( rkeyEvent.test( name ) ) {
		jQuery.event.fixHooks[ name ] = jQuery.event.keyHooks;
	}

	if ( rmouseEvent.test( name ) ) {
		jQuery.event.fixHooks[ name ] = jQuery.event.mouseHooks;
	}
});
/*!
 * Sizzle CSS Selector Engine
 *  Copyright 2012 jQuery Foundation and other contributors
 *  Released under the MIT license
 *  http://sizzlejs.com/
 */
(function( window, undefined ) {

var cachedruns,
	dirruns,
	sortOrder,
	siblingCheck,
	assertGetIdNotName,

	document = window.document,
	docElem = document.documentElement,

	strundefined = "undefined",
	hasDuplicate = false,
	baseHasDuplicate = true,
	done = 0,
	slice = [].slice,
	push = [].push,

	expando = ( "sizcache" + Math.random() ).replace( ".", "" ),

	// Regex

	// Whitespace characters http://www.w3.org/TR/css3-selectors/#whitespace
	whitespace = "[\\x20\\t\\r\\n\\f]",
	// http://www.w3.org/TR/css3-syntax/#characters
	characterEncoding = "(?:\\\\.|[-\\w]|[^\\x00-\\xa0])+",

	// Loosely modeled on CSS identifier characters
	// An unquoted value should be a CSS identifier (http://www.w3.org/TR/css3-selectors/#attribute-selectors)
	// Proper syntax: http://www.w3.org/TR/CSS21/syndata.html#value-def-identifier
	identifier = characterEncoding.replace( "w", "w#" ),

	// Acceptable operators http://www.w3.org/TR/selectors/#attribute-selectors
	operators = "([*^$|!~]?=)",
	attributes = "\\[" + whitespace + "*(" + characterEncoding + ")" + whitespace +
		"*(?:" + operators + whitespace + "*(?:(['\"])((?:\\\\.|[^\\\\])*?)\\3|(" + identifier + ")|)|)" + whitespace + "*\\]",
	pseudos = ":(" + characterEncoding + ")(?:\\((?:(['\"])((?:\\\\.|[^\\\\])*?)\\2|((?:[^,]|\\\\,|(?:,(?=[^\\[]*\\]))|(?:,(?=[^\\(]*\\))))*))\\)|)",
	pos = ":(nth|eq|gt|lt|first|last|even|odd)(?:\\((\\d*)\\)|)(?=[^-]|$)",
	combinators = whitespace + "*([\\x20\\t\\r\\n\\f>+~])" + whitespace + "*",
	groups = "(?=[^\\x20\\t\\r\\n\\f])(?:\\\\.|" + attributes + "|" + pseudos.replace( 2, 7 ) + "|[^\\\\(),])+",

	// Leading and non-escaped trailing whitespace, capturing some non-whitespace characters preceding the latter
	rtrim = new RegExp( "^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g" ),

	rcombinators = new RegExp( "^" + combinators ),

	// All simple (non-comma) selectors, excluding insignifant trailing whitespace
	rgroups = new RegExp( groups + "?(?=" + whitespace + "*,|$)", "g" ),

	// A selector, or everything after leading whitespace
	// Optionally followed in either case by a ")" for terminating sub-selectors
	rselector = new RegExp( "^(?:(?!,)(?:(?:^|,)" + whitespace + "*" + groups + ")*?|" + whitespace + "*(.*?))(\\)|$)" ),

	// All combinators and selector components (attribute test, tag, pseudo, etc.), the latter appearing together when consecutive
	rtokens = new RegExp( groups.slice( 19, -6 ) + "\\x20\\t\\r\\n\\f>+~])+|" + combinators, "g" ),

	// Easily-parseable/retrievable ID or TAG or CLASS selectors
	rquickExpr = /^(?:#([\w\-]+)|(\w+)|\.([\w\-]+))$/,

	rsibling = /[\x20\t\r\n\f]*[+~]/,
	rendsWithNot = /:not\($/,

	rheader = /h\d/i,
	rinputs = /input|select|textarea|button/i,

	rbackslash = /\\(?!\\)/g,

	matchExpr = {
		"ID": new RegExp( "^#(" + characterEncoding + ")" ),
		"CLASS": new RegExp( "^\\.(" + characterEncoding + ")" ),
		"NAME": new RegExp( "^\\[name=['\"]?(" + characterEncoding + ")['\"]?\\]" ),
		"TAG": new RegExp( "^(" + characterEncoding.replace( "[-", "[-\\*" ) + ")" ),
		"ATTR": new RegExp( "^" + attributes ),
		"PSEUDO": new RegExp( "^" + pseudos ),
		"CHILD": new RegExp( "^:(only|nth|last|first)-child(?:\\(" + whitespace +
			"*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace +
			"*(\\d+)|))" + whitespace + "*\\)|)", "i" ),
		"POS": new RegExp( pos, "ig" ),
		// For use in libraries implementing .is()
		"needsContext": new RegExp( "^" + whitespace + "*[>+~]|" + pos, "i" )
	},

	classCache = {},
	cachedClasses = [],
	compilerCache = {},
	cachedSelectors = [],

	// Mark a function for use in filtering
	markFunction = function( fn ) {
		fn.sizzleFilter = true;
		return fn;
	},

	// Returns a function to use in pseudos for input types
	createInputFunction = function( type ) {
		return function( elem ) {
			// Check the input's nodeName and type
			return elem.nodeName.toLowerCase() === "input" && elem.type === type;
		};
	},

	// Returns a function to use in pseudos for buttons
	createButtonFunction = function( type ) {
		return function( elem ) {
			var name = elem.nodeName.toLowerCase();
			return (name === "input" || name === "button") && elem.type === type;
		};
	},

	// Used for testing something on an element
	assert = function( fn ) {
		var pass = false,
			div = document.createElement("div");
		try {
			pass = fn( div );
		} catch (e) {}
		// release memory in IE
		div = null;
		return pass;
	},

	// Check if attributes should be retrieved by attribute nodes
	assertAttributes = assert(function( div ) {
		div.innerHTML = "<select></select>";
		var type = typeof div.lastChild.getAttribute("multiple");
		// IE8 returns a string for some attributes even when not present
		return type !== "boolean" && type !== "string";
	}),

	// Check if getElementById returns elements by name
	// Check if getElementsByName privileges form controls or returns elements by ID
	assertUsableName = assert(function( div ) {
		// Inject content
		div.id = expando + 0;
		div.innerHTML = "<a name='" + expando + "'></a><div name='" + expando + "'></div>";
		docElem.insertBefore( div, docElem.firstChild );

		// Test
		var pass = document.getElementsByName &&
			// buggy browsers will return fewer than the correct 2
			document.getElementsByName( expando ).length ===
			// buggy browsers will return more than the correct 0
			2 + document.getElementsByName( expando + 0 ).length;
		assertGetIdNotName = !document.getElementById( expando );

		// Cleanup
		docElem.removeChild( div );

		return pass;
	}),

	// Check if the browser returns only elements
	// when doing getElementsByTagName("*")
	assertTagNameNoComments = assert(function( div ) {
		div.appendChild( document.createComment("") );
		return div.getElementsByTagName("*").length === 0;
	}),

	// Check if getAttribute returns normalized href attributes
	assertHrefNotNormalized = assert(function( div ) {
		div.innerHTML = "<a href='#'></a>";
		return div.firstChild && typeof div.firstChild.getAttribute !== strundefined &&
			div.firstChild.getAttribute("href") === "#";
	}),

	// Check if getElementsByClassName can be trusted
	assertUsableClassName = assert(function( div ) {
		// Opera can't find a second classname (in 9.6)
		div.innerHTML = "<div class='hidden e'></div><div class='hidden'></div>";
		if ( !div.getElementsByClassName || div.getElementsByClassName("e").length === 0 ) {
			return false;
		}

		// Safari caches class attributes, doesn't catch changes (in 3.2)
		div.lastChild.className = "e";
		return div.getElementsByClassName("e").length !== 1;
	});

var Sizzle = function( selector, context, results, seed ) {
	results = results || [];
	context = context || document;
	var match, elem, xml, m,
		nodeType = context.nodeType;

	if ( nodeType !== 1 && nodeType !== 9 ) {
		return [];
	}

	if ( !selector || typeof selector !== "string" ) {
		return results;
	}

	xml = isXML( context );

	if ( !xml && !seed ) {
		if ( (match = rquickExpr.exec( selector )) ) {
			// Speed-up: Sizzle("#ID")
			if ( (m = match[1]) ) {
				if ( nodeType === 9 ) {
					elem = context.getElementById( m );
					// Check parentNode to catch when Blackberry 4.6 returns
					// nodes that are no longer in the document #6963
					if ( elem && elem.parentNode ) {
						// Handle the case where IE, Opera, and Webkit return items
						// by name instead of ID
						if ( elem.id === m ) {
							results.push( elem );
							return results;
						}
					} else {
						return results;
					}
				} else {
					// Context is not a document
					if ( context.ownerDocument && (elem = context.ownerDocument.getElementById( m )) &&
						contains( context, elem ) && elem.id === m ) {
						results.push( elem );
						return results;
					}
				}

			// Speed-up: Sizzle("TAG")
			} else if ( match[2] ) {
				push.apply( results, slice.call(context.getElementsByTagName( selector ), 0) );
				return results;

			// Speed-up: Sizzle(".CLASS")
			} else if ( (m = match[3]) && assertUsableClassName && context.getElementsByClassName ) {
				push.apply( results, slice.call(context.getElementsByClassName( m ), 0) );
				return results;
			}
		}
	}

	// All others
	return select( selector, context, results, seed, xml );
};

var Expr = Sizzle.selectors = {

	// Can be adjusted by the user
	cacheLength: 50,

	match: matchExpr,

	order: [ "ID", "TAG" ],

	attrHandle: {},

	createPseudo: markFunction,

	find: {
		"ID": assertGetIdNotName ?
			function( id, context, xml ) {
				if ( typeof context.getElementById !== strundefined && !xml ) {
					var m = context.getElementById( id );
					// Check parentNode to catch when Blackberry 4.6 returns
					// nodes that are no longer in the document #6963
					return m && m.parentNode ? [m] : [];
				}
			} :
			function( id, context, xml ) {
				if ( typeof context.getElementById !== strundefined && !xml ) {
					var m = context.getElementById( id );

					return m ?
						m.id === id || typeof m.getAttributeNode !== strundefined && m.getAttributeNode("id").value === id ?
							[m] :
							undefined :
						[];
				}
			},

		"TAG": assertTagNameNoComments ?
			function( tag, context ) {
				if ( typeof context.getElementsByTagName !== strundefined ) {
					return context.getElementsByTagName( tag );
				}
			} :
			function( tag, context ) {
				var results = context.getElementsByTagName( tag );

				// Filter out possible comments
				if ( tag === "*" ) {
					var elem,
						tmp = [],
						i = 0;

					for ( ; (elem = results[i]); i++ ) {
						if ( elem.nodeType === 1 ) {
							tmp.push( elem );
						}
					}

					return tmp;
				}
				return results;
			}
	},

	relative: {
		">": { dir: "parentNode", first: true },
		" ": { dir: "parentNode" },
		"+": { dir: "previousSibling", first: true },
		"~": { dir: "previousSibling" }
	},

	preFilter: {
		"ATTR": function( match ) {
			match[1] = match[1].replace( rbackslash, "" );

			// Move the given value to match[3] whether quoted or unquoted
			match[3] = ( match[4] || match[5] || "" ).replace( rbackslash, "" );

			if ( match[2] === "~=" ) {
				match[3] = " " + match[3] + " ";
			}

			return match.slice( 0, 4 );
		},

		"CHILD": function( match ) {
			/* matches from matchExpr.CHILD
				1 type (only|nth|...)
				2 argument (even|odd|\d*|\d*n([+-]\d+)?|...)
				3 xn-component of xn+y argument ([+-]?\d*n|)
				4 sign of xn-component
				5 x of xn-component
				6 sign of y-component
				7 y of y-component
			*/
			match[1] = match[1].toLowerCase();

			if ( match[1] === "nth" ) {
				// nth-child requires argument
				if ( !match[2] ) {
					Sizzle.error( match[0] );
				}

				// numeric x and y parameters for Expr.filter.CHILD
				// remember that false/true cast respectively to 0/1
				match[3] = +( match[3] ? match[4] + (match[5] || 1) : 2 * ( match[2] === "even" || match[2] === "odd" ) );
				match[4] = +( ( match[6] + match[7] ) || match[2] === "odd" );

			// other types prohibit arguments
			} else if ( match[2] ) {
				Sizzle.error( match[0] );
			}

			return match;
		},

		"PSEUDO": function( match ) {
			var argument,
				unquoted = match[4];

			if ( matchExpr["CHILD"].test( match[0] ) ) {
				return null;
			}

			// Relinquish our claim on characters in `unquoted` from a closing parenthesis on
			if ( unquoted && (argument = rselector.exec( unquoted )) && argument.pop() ) {

				match[0] = match[0].slice( 0, argument[0].length - unquoted.length - 1 );
				unquoted = argument[0].slice( 0, -1 );
			}

			// Quoted or unquoted, we have the full argument
			// Return only captures needed by the pseudo filter method (type and argument)
			match.splice( 2, 3, unquoted || match[3] );
			return match;
		}
	},

	filter: {
		"ID": assertGetIdNotName ?
			function( id ) {
				id = id.replace( rbackslash, "" );
				return function( elem ) {
					return elem.getAttribute("id") === id;
				};
			} :
			function( id ) {
				id = id.replace( rbackslash, "" );
				return function( elem ) {
					var node = typeof elem.getAttributeNode !== strundefined && elem.getAttributeNode("id");
					return node && node.value === id;
				};
			},

		"TAG": function( nodeName ) {
			if ( nodeName === "*" ) {
				return function() { return true; };
			}
			nodeName = nodeName.replace( rbackslash, "" ).toLowerCase();

			return function( elem ) {
				return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
			};
		},

		"CLASS": function( className ) {
			var pattern = classCache[ className ];
			if ( !pattern ) {
				pattern = classCache[ className ] = new RegExp( "(^|" + whitespace + ")" + className + "(" + whitespace + "|$)" );
				cachedClasses.push( className );
				// Avoid too large of a cache
				if ( cachedClasses.length > Expr.cacheLength ) {
					delete classCache[ cachedClasses.shift() ];
				}
			}
			return function( elem ) {
				return pattern.test( elem.className || (typeof elem.getAttribute !== strundefined && elem.getAttribute("class")) || "" );
			};
		},

		"ATTR": function( name, operator, check ) {
			if ( !operator ) {
				return function( elem ) {
					return Sizzle.attr( elem, name ) != null;
				};
			}

			return function( elem ) {
				var result = Sizzle.attr( elem, name ),
					value = result + "";

				if ( result == null ) {
					return operator === "!=";
				}

				switch ( operator ) {
					case "=":
						return value === check;
					case "!=":
						return value !== check;
					case "^=":
						return check && value.indexOf( check ) === 0;
					case "*=":
						return check && value.indexOf( check ) > -1;
					case "$=":
						return check && value.substr( value.length - check.length ) === check;
					case "~=":
						return ( " " + value + " " ).indexOf( check ) > -1;
					case "|=":
						return value === check || value.substr( 0, check.length + 1 ) === check + "-";
				}
			};
		},

		"CHILD": function( type, argument, first, last ) {

			if ( type === "nth" ) {
				var doneName = done++;

				return function( elem ) {
					var parent, diff,
						count = 0,
						node = elem;

					if ( first === 1 && last === 0 ) {
						return true;
					}

					parent = elem.parentNode;

					if ( parent && (parent[ expando ] !== doneName || !elem.sizset) ) {
						for ( node = parent.firstChild; node; node = node.nextSibling ) {
							if ( node.nodeType === 1 ) {
								node.sizset = ++count;
								if ( node === elem ) {
									break;
								}
							}
						}

						parent[ expando ] = doneName;
					}

					diff = elem.sizset - last;

					if ( first === 0 ) {
						return diff === 0;

					} else {
						return ( diff % first === 0 && diff / first >= 0 );
					}
				};
			}

			return function( elem ) {
				var node = elem;

				switch ( type ) {
					case "only":
					case "first":
						while ( (node = node.previousSibling) ) {
							if ( node.nodeType === 1 ) {
								return false;
							}
						}

						if ( type === "first" ) {
							return true;
						}

						node = elem;

						/* falls through */
					case "last":
						while ( (node = node.nextSibling) ) {
							if ( node.nodeType === 1 ) {
								return false;
							}
						}

						return true;
				}
			};
		},

		"PSEUDO": function( pseudo, argument, context, xml ) {
			// pseudo-class names are case-insensitive
			// http://www.w3.org/TR/selectors/#pseudo-classes
			// Prioritize by case sensitivity in case custom pseudos are added with uppercase letters
			var fn = Expr.pseudos[ pseudo ] || Expr.pseudos[ pseudo.toLowerCase() ];

			if ( !fn ) {
				Sizzle.error( "unsupported pseudo: " + pseudo );
			}

			// The user may set fn.sizzleFilter to indicate
			// that arguments are needed to create the filter function
			// just as Sizzle does
			if ( !fn.sizzleFilter ) {
				return fn;
			}

			return fn( argument, context, xml );
		}
	},

	pseudos: {
		"not": markFunction(function( selector, context, xml ) {
			// Trim the selector passed to compile
			// to avoid treating leading and trailing
			// spaces as combinators
			var matcher = compile( selector.replace( rtrim, "$1" ), context, xml );
			return function( elem ) {
				return !matcher( elem );
			};
		}),

		"enabled": function( elem ) {
			return elem.disabled === false;
		},

		"disabled": function( elem ) {
			return elem.disabled === true;
		},

		"checked": function( elem ) {
			// In CSS3, :checked should return both checked and selected elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			var nodeName = elem.nodeName.toLowerCase();
			return (nodeName === "input" && !!elem.checked) || (nodeName === "option" && !!elem.selected);
		},

		"selected": function( elem ) {
			// Accessing this property makes selected-by-default
			// options in Safari work properly
			if ( elem.parentNode ) {
				elem.parentNode.selectedIndex;
			}

			return elem.selected === true;
		},

		"parent": function( elem ) {
			return !Expr.pseudos["empty"]( elem );
		},

		"empty": function( elem ) {
			// http://www.w3.org/TR/selectors/#empty-pseudo
			// :empty is only affected by element nodes and content nodes(including text(3), cdata(4)),
			//   not comment, processing instructions, or others
			// Thanks to Diego Perini for the nodeName shortcut
			//   Greater than "@" means alpha characters (specifically not starting with "#" or "?")
			var nodeType;
			elem = elem.firstChild;
			while ( elem ) {
				if ( elem.nodeName > "@" || (nodeType = elem.nodeType) === 3 || nodeType === 4 ) {
					return false;
				}
				elem = elem.nextSibling;
			}
			return true;
		},

		"contains": markFunction(function( text ) {
			return function( elem ) {
				return ( elem.textContent || elem.innerText || getText( elem ) ).indexOf( text ) > -1;
			};
		}),

		"has": markFunction(function( selector ) {
			return function( elem ) {
				return Sizzle( selector, elem ).length > 0;
			};
		}),

		"header": function( elem ) {
			return rheader.test( elem.nodeName );
		},

		"text": function( elem ) {
			var type, attr;
			// IE6 and 7 will map elem.type to 'text' for new HTML5 types (search, etc)
			// use getAttribute instead to test this case
			return elem.nodeName.toLowerCase() === "input" &&
				(type = elem.type) === "text" &&
				( (attr = elem.getAttribute("type")) == null || attr.toLowerCase() === type );
		},

		// Input types
		"radio": createInputFunction("radio"),
		"checkbox": createInputFunction("checkbox"),
		"file": createInputFunction("file"),
		"password": createInputFunction("password"),
		"image": createInputFunction("image"),

		"submit": createButtonFunction("submit"),
		"reset": createButtonFunction("reset"),

		"button": function( elem ) {
			var name = elem.nodeName.toLowerCase();
			return name === "input" && elem.type === "button" || name === "button";
		},

		"input": function( elem ) {
			return rinputs.test( elem.nodeName );
		},

		"focus": function( elem ) {
			var doc = elem.ownerDocument;
			return elem === doc.activeElement && (!doc.hasFocus || doc.hasFocus()) && !!(elem.type || elem.href);
		},

		"active": function( elem ) {
			return elem === elem.ownerDocument.activeElement;
		}
	},

	setFilters: {
		"first": function( elements, argument, not ) {
			return not ? elements.slice( 1 ) : [ elements[0] ];
		},

		"last": function( elements, argument, not ) {
			var elem = elements.pop();
			return not ? elements : [ elem ];
		},

		"even": function( elements, argument, not ) {
			var results = [],
				i = not ? 1 : 0,
				len = elements.length;
			for ( ; i < len; i = i + 2 ) {
				results.push( elements[i] );
			}
			return results;
		},

		"odd": function( elements, argument, not ) {
			var results = [],
				i = not ? 0 : 1,
				len = elements.length;
			for ( ; i < len; i = i + 2 ) {
				results.push( elements[i] );
			}
			return results;
		},

		"lt": function( elements, argument, not ) {
			return not ? elements.slice( +argument ) : elements.slice( 0, +argument );
		},

		"gt": function( elements, argument, not ) {
			return not ? elements.slice( 0, +argument + 1 ) : elements.slice( +argument + 1 );
		},

		"eq": function( elements, argument, not ) {
			var elem = elements.splice( +argument, 1 );
			return not ? elements : elem;
		}
	}
};

// Deprecated
Expr.setFilters["nth"] = Expr.setFilters["eq"];

// Back-compat
Expr.filters = Expr.pseudos;

// IE6/7 return a modified href
if ( !assertHrefNotNormalized ) {
	Expr.attrHandle = {
		"href": function( elem ) {
			return elem.getAttribute( "href", 2 );
		},
		"type": function( elem ) {
			return elem.getAttribute("type");
		}
	};
}

// Add getElementsByName if usable
if ( assertUsableName ) {
	Expr.order.push("NAME");
	Expr.find["NAME"] = function( name, context ) {
		if ( typeof context.getElementsByName !== strundefined ) {
			return context.getElementsByName( name );
		}
	};
}

// Add getElementsByClassName if usable
if ( assertUsableClassName ) {
	Expr.order.splice( 1, 0, "CLASS" );
	Expr.find["CLASS"] = function( className, context, xml ) {
		if ( typeof context.getElementsByClassName !== strundefined && !xml ) {
			return context.getElementsByClassName( className );
		}
	};
}

// If slice is not available, provide a backup
try {
	slice.call( docElem.childNodes, 0 )[0].nodeType;
} catch ( e ) {
	slice = function( i ) {
		var elem, results = [];
		for ( ; (elem = this[i]); i++ ) {
			results.push( elem );
		}
		return results;
	};
}

var isXML = Sizzle.isXML = function( elem ) {
	// documentElement is verified for cases where it doesn't yet exist
	// (such as loading iframes in IE - #4833)
	var documentElement = elem && (elem.ownerDocument || elem).documentElement;
	return documentElement ? documentElement.nodeName !== "HTML" : false;
};

// Element contains another
var contains = Sizzle.contains = docElem.compareDocumentPosition ?
	function( a, b ) {
		return !!( a.compareDocumentPosition( b ) & 16 );
	} :
	docElem.contains ?
	function( a, b ) {
		var adown = a.nodeType === 9 ? a.documentElement : a,
			bup = b.parentNode;
		return a === bup || !!( bup && bup.nodeType === 1 && adown.contains && adown.contains(bup) );
	} :
	function( a, b ) {
		while ( (b = b.parentNode) ) {
			if ( b === a ) {
				return true;
			}
		}
		return false;
	};

/**
 * Utility function for retrieving the text value of an array of DOM nodes
 * @param {Array|Element} elem
 */
var getText = Sizzle.getText = function( elem ) {
	var node,
		ret = "",
		i = 0,
		nodeType = elem.nodeType;

	if ( nodeType ) {
		if ( nodeType === 1 || nodeType === 9 || nodeType === 11 ) {
			// Use textContent for elements
			// innerText usage removed for consistency of new lines (see #11153)
			if ( typeof elem.textContent === "string" ) {
				return elem.textContent;
			} else {
				// Traverse its children
				for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
					ret += getText( elem );
				}
			}
		} else if ( nodeType === 3 || nodeType === 4 ) {
			return elem.nodeValue;
		}
		// Do not include comment or processing instruction nodes
	} else {

		// If no nodeType, this is expected to be an array
		for ( ; (node = elem[i]); i++ ) {
			// Do not traverse comment nodes
			ret += getText( node );
		}
	}
	return ret;
};

Sizzle.attr = function( elem, name ) {
	var attr,
		xml = isXML( elem );

	if ( !xml ) {
		name = name.toLowerCase();
	}
	if ( Expr.attrHandle[ name ] ) {
		return Expr.attrHandle[ name ]( elem );
	}
	if ( assertAttributes || xml ) {
		return elem.getAttribute( name );
	}
	attr = elem.getAttributeNode( name );
	return attr ?
		typeof elem[ name ] === "boolean" ?
			elem[ name ] ? name : null :
			attr.specified ? attr.value : null :
		null;
};

Sizzle.error = function( msg ) {
	throw new Error( "Syntax error, unrecognized expression: " + msg );
};

// Check if the JavaScript engine is using some sort of
// optimization where it does not always call our comparision
// function. If that is the case, discard the hasDuplicate value.
//   Thus far that includes Google Chrome.
[0, 0].sort(function() {
	return (baseHasDuplicate = 0);
});


if ( docElem.compareDocumentPosition ) {
	sortOrder = function( a, b ) {
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		return ( !a.compareDocumentPosition || !b.compareDocumentPosition ?
			a.compareDocumentPosition :
			a.compareDocumentPosition(b) & 4
		) ? -1 : 1;
	};

} else {
	sortOrder = function( a, b ) {
		// The nodes are identical, we can exit early
		if ( a === b ) {
			hasDuplicate = true;
			return 0;

		// Fallback to using sourceIndex (in IE) if it's available on both nodes
		} else if ( a.sourceIndex && b.sourceIndex ) {
			return a.sourceIndex - b.sourceIndex;
		}

		var al, bl,
			ap = [],
			bp = [],
			aup = a.parentNode,
			bup = b.parentNode,
			cur = aup;

		// If the nodes are siblings (or identical) we can do a quick check
		if ( aup === bup ) {
			return siblingCheck( a, b );

		// If no parents were found then the nodes are disconnected
		} else if ( !aup ) {
			return -1;

		} else if ( !bup ) {
			return 1;
		}

		// Otherwise they're somewhere else in the tree so we need
		// to build up a full list of the parentNodes for comparison
		while ( cur ) {
			ap.unshift( cur );
			cur = cur.parentNode;
		}

		cur = bup;

		while ( cur ) {
			bp.unshift( cur );
			cur = cur.parentNode;
		}

		al = ap.length;
		bl = bp.length;

		// Start walking down the tree looking for a discrepancy
		for ( var i = 0; i < al && i < bl; i++ ) {
			if ( ap[i] !== bp[i] ) {
				return siblingCheck( ap[i], bp[i] );
			}
		}

		// We ended someplace up the tree so do a sibling check
		return i === al ?
			siblingCheck( a, bp[i], -1 ) :
			siblingCheck( ap[i], b, 1 );
	};

	siblingCheck = function( a, b, ret ) {
		if ( a === b ) {
			return ret;
		}

		var cur = a.nextSibling;

		while ( cur ) {
			if ( cur === b ) {
				return -1;
			}

			cur = cur.nextSibling;
		}

		return 1;
	};
}

// Document sorting and removing duplicates
Sizzle.uniqueSort = function( results ) {
	var elem,
		i = 1;

	if ( sortOrder ) {
		hasDuplicate = baseHasDuplicate;
		results.sort( sortOrder );

		if ( hasDuplicate ) {
			for ( ; (elem = results[i]); i++ ) {
				if ( elem === results[ i - 1 ] ) {
					results.splice( i--, 1 );
				}
			}
		}
	}

	return results;
};

function multipleContexts( selector, contexts, results, seed ) {
	var i = 0,
		len = contexts.length;
	for ( ; i < len; i++ ) {
		Sizzle( selector, contexts[i], results, seed );
	}
}

function handlePOSGroup( selector, posfilter, argument, contexts, seed, not ) {
	var results,
		fn = Expr.setFilters[ posfilter.toLowerCase() ];

	if ( !fn ) {
		Sizzle.error( posfilter );
	}

	if ( selector || !(results = seed) ) {
		multipleContexts( selector || "*", contexts, (results = []), seed );
	}

	return results.length > 0 ? fn( results, argument, not ) : [];
}

function handlePOS( selector, context, results, seed, groups ) {
	var match, not, anchor, ret, elements, currentContexts, part, lastIndex,
		i = 0,
		len = groups.length,
		rpos = matchExpr["POS"],
		// This is generated here in case matchExpr["POS"] is extended
		rposgroups = new RegExp( "^" + rpos.source + "(?!" + whitespace + ")", "i" ),
		// This is for making sure non-participating
		// matching groups are represented cross-browser (IE6-8)
		setUndefined = function() {
			var i = 1,
				len = arguments.length - 2;
			for ( ; i < len; i++ ) {
				if ( arguments[i] === undefined ) {
					match[i] = undefined;
				}
			}
		};

	for ( ; i < len; i++ ) {
		// Reset regex index to 0
		rpos.exec("");
		selector = groups[i];
		ret = [];
		anchor = 0;
		elements = seed;
		while ( (match = rpos.exec( selector )) ) {
			lastIndex = rpos.lastIndex = match.index + match[0].length;
			if ( lastIndex > anchor ) {
				part = selector.slice( anchor, match.index );
				anchor = lastIndex;
				currentContexts = [ context ];

				if ( rcombinators.test(part) ) {
					if ( elements ) {
						currentContexts = elements;
					}
					elements = seed;
				}

				if ( (not = rendsWithNot.test( part )) ) {
					part = part.slice( 0, -5 ).replace( rcombinators, "$&*" );
				}

				if ( match.length > 1 ) {
					match[0].replace( rposgroups, setUndefined );
				}
				elements = handlePOSGroup( part, match[1], match[2], currentContexts, elements, not );
			}
		}

		if ( elements ) {
			ret = ret.concat( elements );

			if ( (part = selector.slice( anchor )) && part !== ")" ) {
				if ( rcombinators.test(part) ) {
					multipleContexts( part, ret, results, seed );
				} else {
					Sizzle( part, context, results, seed ? seed.concat(elements) : elements );
				}
			} else {
				push.apply( results, ret );
			}
		} else {
			Sizzle( selector, context, results, seed );
		}
	}

	// Do not sort if this is a single filter
	return len === 1 ? results : Sizzle.uniqueSort( results );
}

function tokenize( selector, context, xml ) {
	var tokens, soFar, type,
		groups = [],
		i = 0,

		// Catch obvious selector issues: terminal ")"; nonempty fallback match
		// rselector never fails to match *something*
		match = rselector.exec( selector ),
		matched = !match.pop() && !match.pop(),
		selectorGroups = matched && selector.match( rgroups ) || [""],

		preFilters = Expr.preFilter,
		filters = Expr.filter,
		checkContext = !xml && context !== document;

	for ( ; (soFar = selectorGroups[i]) != null && matched; i++ ) {
		groups.push( tokens = [] );

		// Need to make sure we're within a narrower context if necessary
		// Adding a descendant combinator will generate what is needed
		if ( checkContext ) {
			soFar = " " + soFar;
		}

		while ( soFar ) {
			matched = false;

			// Combinators
			if ( (match = rcombinators.exec( soFar )) ) {
				soFar = soFar.slice( match[0].length );

				// Cast descendant combinators to space
				matched = tokens.push({ part: match.pop().replace( rtrim, " " ), captures: match });
			}

			// Filters
			for ( type in filters ) {
				if ( (match = matchExpr[ type ].exec( soFar )) && (!preFilters[ type ] ||
					(match = preFilters[ type ]( match, context, xml )) ) ) {

					soFar = soFar.slice( match.shift().length );
					matched = tokens.push({ part: type, captures: match });
				}
			}

			if ( !matched ) {
				break;
			}
		}
	}

	if ( !matched ) {
		Sizzle.error( selector );
	}

	return groups;
}

function addCombinator( matcher, combinator, context ) {
	var dir = combinator.dir,
		doneName = done++;

	if ( !matcher ) {
		// If there is no matcher to check, check against the context
		matcher = function( elem ) {
			return elem === context;
		};
	}
	return combinator.first ?
		function( elem, context ) {
			while ( (elem = elem[ dir ]) ) {
				if ( elem.nodeType === 1 ) {
					return matcher( elem, context ) && elem;
				}
			}
		} :
		function( elem, context ) {
			var cache,
				dirkey = doneName + "." + dirruns,
				cachedkey = dirkey + "." + cachedruns;
			while ( (elem = elem[ dir ]) ) {
				if ( elem.nodeType === 1 ) {
					if ( (cache = elem[ expando ]) === cachedkey ) {
						return elem.sizset;
					} else if ( typeof cache === "string" && cache.indexOf(dirkey) === 0 ) {
						if ( elem.sizset ) {
							return elem;
						}
					} else {
						elem[ expando ] = cachedkey;
						if ( matcher( elem, context ) ) {
							elem.sizset = true;
							return elem;
						}
						elem.sizset = false;
					}
				}
			}
		};
}

function addMatcher( higher, deeper ) {
	return higher ?
		function( elem, context ) {
			var result = deeper( elem, context );
			return result && higher( result === true ? elem : result, context );
		} :
		deeper;
}

// ["TAG", ">", "ID", " ", "CLASS"]
function matcherFromTokens( tokens, context, xml ) {
	var token, matcher,
		i = 0;

	for ( ; (token = tokens[i]); i++ ) {
		if ( Expr.relative[ token.part ] ) {
			matcher = addCombinator( matcher, Expr.relative[ token.part ], context );
		} else {
			token.captures.push( context, xml );
			matcher = addMatcher( matcher, Expr.filter[ token.part ].apply( null, token.captures ) );
		}
	}

	return matcher;
}

function matcherFromGroupMatchers( matchers ) {
	return function( elem, context ) {
		var matcher,
			j = 0;
		for ( ; (matcher = matchers[j]); j++ ) {
			if ( matcher(elem, context) ) {
				return true;
			}
		}
		return false;
	};
}

var compile = Sizzle.compile = function( selector, context, xml ) {
	var tokens, group, i,
		cached = compilerCache[ selector ];

	// Return a cached group function if already generated (context dependent)
	if ( cached && cached.context === context ) {
		return cached;
	}

	// Generate a function of recursive functions that can be used to check each element
	group = tokenize( selector, context, xml );
	for ( i = 0; (tokens = group[i]); i++ ) {
		group[i] = matcherFromTokens( tokens, context, xml );
	}

	// Cache the compiled function
	cached = compilerCache[ selector ] = matcherFromGroupMatchers( group );
	cached.context = context;
	cached.runs = cached.dirruns = 0;
	cachedSelectors.push( selector );
	// Ensure only the most recent are cached
	if ( cachedSelectors.length > Expr.cacheLength ) {
		delete compilerCache[ cachedSelectors.shift() ];
	}
	return cached;
};

Sizzle.matches = function( expr, elements ) {
	return Sizzle( expr, null, null, elements );
};

Sizzle.matchesSelector = function( elem, expr ) {
	return Sizzle( expr, null, null, [ elem ] ).length > 0;
};

var select = function( selector, context, results, seed, xml ) {
	// Remove excessive whitespace
	selector = selector.replace( rtrim, "$1" );
	var elements, matcher, i, len, elem, token,
		type, findContext, notTokens,
		match = selector.match( rgroups ),
		tokens = selector.match( rtokens ),
		contextNodeType = context.nodeType;

	// POS handling
	if ( matchExpr["POS"].test(selector) ) {
		return handlePOS( selector, context, results, seed, match );
	}

	if ( seed ) {
		elements = slice.call( seed, 0 );

	// To maintain document order, only narrow the
	// set if there is one group
	} else if ( match && match.length === 1 ) {

		// Take a shortcut and set the context if the root selector is an ID
		if ( tokens.length > 1 && contextNodeType === 9 && !xml &&
				(match = matchExpr["ID"].exec( tokens[0] )) ) {

			context = Expr.find["ID"]( match[1], context, xml )[0];
			if ( !context ) {
				return results;
			}

			selector = selector.slice( tokens.shift().length );
		}

		findContext = ( (match = rsibling.exec( tokens[0] )) && !match.index && context.parentNode ) || context;

		// Get the last token, excluding :not
		notTokens = tokens.pop();
		token = notTokens.split(":not")[0];

		for ( i = 0, len = Expr.order.length; i < len; i++ ) {
			type = Expr.order[i];

			if ( (match = matchExpr[ type ].exec( token )) ) {
				elements = Expr.find[ type ]( (match[1] || "").replace( rbackslash, "" ), findContext, xml );

				if ( elements == null ) {
					continue;
				}

				if ( token === notTokens ) {
					selector = selector.slice( 0, selector.length - notTokens.length ) +
						token.replace( matchExpr[ type ], "" );

					if ( !selector ) {
						push.apply( results, slice.call(elements, 0) );
					}
				}
				break;
			}
		}
	}

	// Only loop over the given elements once
	// If selector is empty, we're already done
	if ( selector ) {
		matcher = compile( selector, context, xml );
		dirruns = matcher.dirruns++;

		if ( elements == null ) {
			elements = Expr.find["TAG"]( "*", (rsibling.test( selector ) && context.parentNode) || context );
		}
		for ( i = 0; (elem = elements[i]); i++ ) {
			cachedruns = matcher.runs++;
			if ( matcher(elem, context) ) {
				results.push( elem );
			}
		}
	}

	return results;
};

if ( document.querySelectorAll ) {
	(function() {
		var disconnectedMatch,
			oldSelect = select,
			rescape = /'|\\/g,
			rattributeQuotes = /\=[\x20\t\r\n\f]*([^'"\]]*)[\x20\t\r\n\f]*\]/g,
			rbuggyQSA = [],
			// matchesSelector(:active) reports false when true (IE9/Opera 11.5)
			// A support test would require too much code (would include document ready)
			// just skip matchesSelector for :active
			rbuggyMatches = [":active"],
			matches = docElem.matchesSelector ||
				docElem.mozMatchesSelector ||
				docElem.webkitMatchesSelector ||
				docElem.oMatchesSelector ||
				docElem.msMatchesSelector;

		// Build QSA regex
		// Regex strategy adopted from Diego Perini
		assert(function( div ) {
			div.innerHTML = "<select><option selected></option></select>";

			// IE8 - Some boolean attributes are not treated correctly
			if ( !div.querySelectorAll("[selected]").length ) {
				rbuggyQSA.push( "\\[" + whitespace + "*(?:checked|disabled|ismap|multiple|readonly|selected|value)" );
			}

			// Webkit/Opera - :checked should return selected option elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			// IE8 throws error here (do not put tests after this one)
			if ( !div.querySelectorAll(":checked").length ) {
				rbuggyQSA.push(":checked");
			}
		});

		assert(function( div ) {

			// Opera 10-12/IE9 - ^= $= *= and empty values
			// Should not select anything
			div.innerHTML = "<p test=''></p>";
			if ( div.querySelectorAll("[test^='']").length ) {
				rbuggyQSA.push( "[*^$]=" + whitespace + "*(?:\"\"|'')" );
			}

			// FF 3.5 - :enabled/:disabled and hidden elements (hidden elements are still enabled)
			// IE8 throws error here (do not put tests after this one)
			div.innerHTML = "<input type='hidden'>";
			if ( !div.querySelectorAll(":enabled").length ) {
				rbuggyQSA.push(":enabled", ":disabled");
			}
		});

		rbuggyQSA = rbuggyQSA.length && new RegExp( rbuggyQSA.join("|") );

		select = function( selector, context, results, seed, xml ) {
			// Only use querySelectorAll when not filtering,
			// when this is not xml,
			// and when no QSA bugs apply
			if ( !seed && !xml && (!rbuggyQSA || !rbuggyQSA.test( selector )) ) {
				if ( context.nodeType === 9 ) {
					try {
						push.apply( results, slice.call(context.querySelectorAll( selector ), 0) );
						return results;
					} catch(qsaError) {}
				// qSA works strangely on Element-rooted queries
				// We can work around this by specifying an extra ID on the root
				// and working up from there (Thanks to Andrew Dupont for the technique)
				// IE 8 doesn't work on object elements
				} else if ( context.nodeType === 1 && context.nodeName.toLowerCase() !== "object" ) {
					var old = context.getAttribute("id"),
						nid = old || expando,
						newContext = rsibling.test( selector ) && context.parentNode || context;

					if ( old ) {
						nid = nid.replace( rescape, "\\$&" );
					} else {
						context.setAttribute( "id", nid );
					}

					try {
						push.apply( results, slice.call( newContext.querySelectorAll(
							selector.replace( rgroups, "[id='" + nid + "'] $&" )
						), 0 ) );
						return results;
					} catch(qsaError) {
					} finally {
						if ( !old ) {
							context.removeAttribute("id");
						}
					}
				}
			}

			return oldSelect( selector, context, results, seed, xml );
		};

		if ( matches ) {
			assert(function( div ) {
				// Check to see if it's possible to do matchesSelector
				// on a disconnected node (IE 9)
				disconnectedMatch = matches.call( div, "div" );

				// This should fail with an exception
				// Gecko does not error, returns false instead
				try {
					matches.call( div, "[test!='']:sizzle" );
					rbuggyMatches.push( Expr.match.PSEUDO );
				} catch ( e ) {}
			});

			// rbuggyMatches always contains :active, so no need for a length check
			rbuggyMatches = /* rbuggyMatches.length && */ new RegExp( rbuggyMatches.join("|") );

			Sizzle.matchesSelector = function( elem, expr ) {
				// Make sure that attribute selectors are quoted
				expr = expr.replace( rattributeQuotes, "='$1']" );

				// rbuggyMatches always contains :active, so no need for an existence check
				if ( !isXML( elem ) && !rbuggyMatches.test( expr ) && (!rbuggyQSA || !rbuggyQSA.test( expr )) ) {
					try {
						var ret = matches.call( elem, expr );

						// IE 9's matchesSelector returns false on disconnected nodes
						if ( ret || disconnectedMatch ||
								// As well, disconnected nodes are said to be in a document
								// fragment in IE 9
								elem.document && elem.document.nodeType !== 11 ) {
							return ret;
						}
					} catch(e) {}
				}

				return Sizzle( expr, null, null, [ elem ] ).length > 0;
			};
		}
	})();
}

// Override sizzle attribute retrieval
Sizzle.attr = jQuery.attr;
jQuery.find = Sizzle;
jQuery.expr = Sizzle.selectors;
jQuery.expr[":"] = jQuery.expr.pseudos;
jQuery.unique = Sizzle.uniqueSort;
jQuery.text = Sizzle.getText;
jQuery.isXMLDoc = Sizzle.isXML;
jQuery.contains = Sizzle.contains;


})( window );
var runtil = /Until$/,
	rparentsprev = /^(?:parents|prev(?:Until|All))/,
	isSimple = /^.[^:#\[\.,]*$/,
	rneedsContext = jQuery.expr.match.needsContext,
	// methods guaranteed to produce a unique set when starting from a unique set
	guaranteedUnique = {
		children: true,
		contents: true,
		next: true,
		prev: true
	};

jQuery.fn.extend({
	find: function( selector ) {
		var i, l, length, n, r, ret,
			self = this;

		if ( typeof selector !== "string" ) {
			return jQuery( selector ).filter(function() {
				for ( i = 0, l = self.length; i < l; i++ ) {
					if ( jQuery.contains( self[ i ], this ) ) {
						return true;
					}
				}
			});
		}

		ret = this.pushStack( "", "find", selector );

		for ( i = 0, l = this.length; i < l; i++ ) {
			length = ret.length;
			jQuery.find( selector, this[i], ret );

			if ( i > 0 ) {
				// Make sure that the results are unique
				for ( n = length; n < ret.length; n++ ) {
					for ( r = 0; r < length; r++ ) {
						if ( ret[r] === ret[n] ) {
							ret.splice(n--, 1);
							break;
						}
					}
				}
			}
		}

		return ret;
	},

	has: function( target ) {
		var i,
			targets = jQuery( target, this ),
			len = targets.length;

		return this.filter(function() {
			for ( i = 0; i < len; i++ ) {
				if ( jQuery.contains( this, targets[i] ) ) {
					return true;
				}
			}
		});
	},

	not: function( selector ) {
		return this.pushStack( winnow(this, selector, false), "not", selector);
	},

	filter: function( selector ) {
		return this.pushStack( winnow(this, selector, true), "filter", selector );
	},

	is: function( selector ) {
		return !!selector && (
			typeof selector === "string" ?
				// If this is a positional/relative selector, check membership in the returned set
				// so $("p:first").is("p:last") won't return true for a doc with two "p".
				rneedsContext.test( selector ) ?
					jQuery( selector, this.context ).index( this[0] ) >= 0 :
					jQuery.filter( selector, this ).length > 0 :
				this.filter( selector ).length > 0 );
	},

	closest: function( selectors, context ) {
		var cur,
			i = 0,
			l = this.length,
			ret = [],
			pos = rneedsContext.test( selectors ) || typeof selectors !== "string" ?
				jQuery( selectors, context || this.context ) :
				0;

		for ( ; i < l; i++ ) {
			cur = this[i];

			while ( cur && cur.ownerDocument && cur !== context && cur.nodeType !== 11 ) {
				if ( pos ? pos.index(cur) > -1 : jQuery.find.matchesSelector(cur, selectors) ) {
					ret.push( cur );
					break;
				}
				cur = cur.parentNode;
			}
		}

		ret = ret.length > 1 ? jQuery.unique( ret ) : ret;

		return this.pushStack( ret, "closest", selectors );
	},

	// Determine the position of an element within
	// the matched set of elements
	index: function( elem ) {

		// No argument, return index in parent
		if ( !elem ) {
			return ( this[0] && this[0].parentNode ) ? this.prevAll().length : -1;
		}

		// index in selector
		if ( typeof elem === "string" ) {
			return jQuery.inArray( this[0], jQuery( elem ) );
		}

		// Locate the position of the desired element
		return jQuery.inArray(
			// If it receives a jQuery object, the first element is used
			elem.jquery ? elem[0] : elem, this );
	},

	add: function( selector, context ) {
		var set = typeof selector === "string" ?
				jQuery( selector, context ) :
				jQuery.makeArray( selector && selector.nodeType ? [ selector ] : selector ),
			all = jQuery.merge( this.get(), set );

		return this.pushStack( isDisconnected( set[0] ) || isDisconnected( all[0] ) ?
			all :
			jQuery.unique( all ) );
	},

	addBack: function( selector ) {
		return this.add( selector == null ?
			this.prevObject : this.prevObject.filter(selector)
		);
	}
});

jQuery.fn.andSelf = jQuery.fn.addBack;

// A painfully simple check to see if an element is disconnected
// from a document (should be improved, where feasible).
function isDisconnected( node ) {
	return !node || !node.parentNode || node.parentNode.nodeType === 11;
}

function sibling( cur, dir ) {
	do {
		cur = cur[ dir ];
	} while ( cur && cur.nodeType !== 1 );

	return cur;
}

jQuery.each({
	parent: function( elem ) {
		var parent = elem.parentNode;
		return parent && parent.nodeType !== 11 ? parent : null;
	},
	parents: function( elem ) {
		return jQuery.dir( elem, "parentNode" );
	},
	parentsUntil: function( elem, i, until ) {
		return jQuery.dir( elem, "parentNode", until );
	},
	next: function( elem ) {
		return sibling( elem, "nextSibling" );
	},
	prev: function( elem ) {
		return sibling( elem, "previousSibling" );
	},
	nextAll: function( elem ) {
		return jQuery.dir( elem, "nextSibling" );
	},
	prevAll: function( elem ) {
		return jQuery.dir( elem, "previousSibling" );
	},
	nextUntil: function( elem, i, until ) {
		return jQuery.dir( elem, "nextSibling", until );
	},
	prevUntil: function( elem, i, until ) {
		return jQuery.dir( elem, "previousSibling", until );
	},
	siblings: function( elem ) {
		return jQuery.sibling( ( elem.parentNode || {} ).firstChild, elem );
	},
	children: function( elem ) {
		return jQuery.sibling( elem.firstChild );
	},
	contents: function( elem ) {
		return jQuery.nodeName( elem, "iframe" ) ?
			elem.contentDocument || elem.contentWindow.document :
			jQuery.merge( [], elem.childNodes );
	}
}, function( name, fn ) {
	jQuery.fn[ name ] = function( until, selector ) {
		var ret = jQuery.map( this, fn, until );

		if ( !runtil.test( name ) ) {
			selector = until;
		}

		if ( selector && typeof selector === "string" ) {
			ret = jQuery.filter( selector, ret );
		}

		ret = this.length > 1 && !guaranteedUnique[ name ] ? jQuery.unique( ret ) : ret;

		if ( this.length > 1 && rparentsprev.test( name ) ) {
			ret = ret.reverse();
		}

		return this.pushStack( ret, name, core_slice.call( arguments ).join(",") );
	};
});

jQuery.extend({
	filter: function( expr, elems, not ) {
		if ( not ) {
			expr = ":not(" + expr + ")";
		}

		return elems.length === 1 ?
			jQuery.find.matchesSelector(elems[0], expr) ? [ elems[0] ] : [] :
			jQuery.find.matches(expr, elems);
	},

	dir: function( elem, dir, until ) {
		var matched = [],
			cur = elem[ dir ];

		while ( cur && cur.nodeType !== 9 && (until === undefined || cur.nodeType !== 1 || !jQuery( cur ).is( until )) ) {
			if ( cur.nodeType === 1 ) {
				matched.push( cur );
			}
			cur = cur[dir];
		}
		return matched;
	},

	sibling: function( n, elem ) {
		var r = [];

		for ( ; n; n = n.nextSibling ) {
			if ( n.nodeType === 1 && n !== elem ) {
				r.push( n );
			}
		}

		return r;
	}
});

// Implement the identical functionality for filter and not
function winnow( elements, qualifier, keep ) {

	// Can't pass null or undefined to indexOf in Firefox 4
	// Set to 0 to skip string check
	qualifier = qualifier || 0;

	if ( jQuery.isFunction( qualifier ) ) {
		return jQuery.grep(elements, function( elem, i ) {
			var retVal = !!qualifier.call( elem, i, elem );
			return retVal === keep;
		});

	} else if ( qualifier.nodeType ) {
		return jQuery.grep(elements, function( elem, i ) {
			return ( elem === qualifier ) === keep;
		});

	} else if ( typeof qualifier === "string" ) {
		var filtered = jQuery.grep(elements, function( elem ) {
			return elem.nodeType === 1;
		});

		if ( isSimple.test( qualifier ) ) {
			return jQuery.filter(qualifier, filtered, !keep);
		} else {
			qualifier = jQuery.filter( qualifier, filtered );
		}
	}

	return jQuery.grep(elements, function( elem, i ) {
		return ( jQuery.inArray( elem, qualifier ) >= 0 ) === keep;
	});
}
function createSafeFragment( document ) {
	var list = nodeNames.split( "|" ),
	safeFrag = document.createDocumentFragment();

	if ( safeFrag.createElement ) {
		while ( list.length ) {
			safeFrag.createElement(
				list.pop()
			);
		}
	}
	return safeFrag;
}

var nodeNames = "abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|" +
		"header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",
	rinlinejQuery = / jQuery\d+="(?:null|\d+)"/g,
	rleadingWhitespace = /^\s+/,
	rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
	rtagName = /<([\w:]+)/,
	rtbody = /<tbody/i,
	rhtml = /<|&#?\w+;/,
	rnoInnerhtml = /<(?:script|style|link)/i,
	rnocache = /<(?:script|object|embed|option|style)/i,
	rnoshimcache = new RegExp("<(?:" + nodeNames + ")[\\s/>]", "i"),
	rcheckableType = /^(?:checkbox|radio)$/,
	// checked="checked" or checked
	rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
	rscriptType = /\/(java|ecma)script/i,
	rcleanScript = /^\s*<!(?:\[CDATA\[|\-\-)|[\]\-]{2}>\s*$/g,
	wrapMap = {
		option: [ 1, "<select multiple='multiple'>", "</select>" ],
		legend: [ 1, "<fieldset>", "</fieldset>" ],
		thead: [ 1, "<table>", "</table>" ],
		tr: [ 2, "<table><tbody>", "</tbody></table>" ],
		td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],
		col: [ 2, "<table><tbody></tbody><colgroup>", "</colgroup></table>" ],
		area: [ 1, "<map>", "</map>" ],
		_default: [ 0, "", "" ]
	},
	safeFragment = createSafeFragment( document ),
	fragmentDiv = safeFragment.appendChild( document.createElement("div") );

wrapMap.optgroup = wrapMap.option;
wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
wrapMap.th = wrapMap.td;

// IE6-8 can't serialize link, script, style, or any html5 (NoScope) tags,
// unless wrapped in a div with non-breaking characters in front of it.
if ( !jQuery.support.htmlSerialize ) {
	wrapMap._default = [ 1, "X<div>", "</div>" ];
}

jQuery.fn.extend({
	text: function( value ) {
		return jQuery.access( this, function( value ) {
			return value === undefined ?
				jQuery.text( this ) :
				this.empty().append( ( this[0] && this[0].ownerDocument || document ).createTextNode( value ) );
		}, null, value, arguments.length );
	},

	wrapAll: function( html ) {
		if ( jQuery.isFunction( html ) ) {
			return this.each(function(i) {
				jQuery(this).wrapAll( html.call(this, i) );
			});
		}

		if ( this[0] ) {
			// The elements to wrap the target around
			var wrap = jQuery( html, this[0].ownerDocument ).eq(0).clone(true);

			if ( this[0].parentNode ) {
				wrap.insertBefore( this[0] );
			}

			wrap.map(function() {
				var elem = this;

				while ( elem.firstChild && elem.firstChild.nodeType === 1 ) {
					elem = elem.firstChild;
				}

				return elem;
			}).append( this );
		}

		return this;
	},

	wrapInner: function( html ) {
		if ( jQuery.isFunction( html ) ) {
			return this.each(function(i) {
				jQuery(this).wrapInner( html.call(this, i) );
			});
		}

		return this.each(function() {
			var self = jQuery( this ),
				contents = self.contents();

			if ( contents.length ) {
				contents.wrapAll( html );

			} else {
				self.append( html );
			}
		});
	},

	wrap: function( html ) {
		var isFunction = jQuery.isFunction( html );

		return this.each(function(i) {
			jQuery( this ).wrapAll( isFunction ? html.call(this, i) : html );
		});
	},

	unwrap: function() {
		return this.parent().each(function() {
			if ( !jQuery.nodeName( this, "body" ) ) {
				jQuery( this ).replaceWith( this.childNodes );
			}
		}).end();
	},

	append: function() {
		return this.domManip(arguments, true, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 ) {
				this.appendChild( elem );
			}
		});
	},

	prepend: function() {
		return this.domManip(arguments, true, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 ) {
				this.insertBefore( elem, this.firstChild );
			}
		});
	},

	before: function() {
		if ( !isDisconnected( this[0] ) ) {
			return this.domManip(arguments, false, function( elem ) {
				this.parentNode.insertBefore( elem, this );
			});
		}

		if ( arguments.length ) {
			var set = jQuery.clean( arguments );
			return this.pushStack( jQuery.merge( set, this ), "before", this.selector );
		}
	},

	after: function() {
		if ( !isDisconnected( this[0] ) ) {
			return this.domManip(arguments, false, function( elem ) {
				this.parentNode.insertBefore( elem, this.nextSibling );
			});
		}

		if ( arguments.length ) {
			var set = jQuery.clean( arguments );
			return this.pushStack( jQuery.merge( this, set ), "after", this.selector );
		}
	},

	// keepData is for internal use only--do not document
	remove: function( selector, keepData ) {
		var elem,
			i = 0;

		for ( ; (elem = this[i]) != null; i++ ) {
			if ( !selector || jQuery.filter( selector, [ elem ] ).length ) {
				if ( !keepData && elem.nodeType === 1 ) {
					jQuery.cleanData( elem.getElementsByTagName("*") );
					jQuery.cleanData( [ elem ] );
				}

				if ( elem.parentNode ) {
					elem.parentNode.removeChild( elem );
				}
			}
		}

		return this;
	},

	empty: function() {
		var elem,
			i = 0;

		for ( ; (elem = this[i]) != null; i++ ) {
			// Remove element nodes and prevent memory leaks
			if ( elem.nodeType === 1 ) {
				jQuery.cleanData( elem.getElementsByTagName("*") );
			}

			// Remove any remaining nodes
			while ( elem.firstChild ) {
				elem.removeChild( elem.firstChild );
			}
		}

		return this;
	},

	clone: function( dataAndEvents, deepDataAndEvents ) {
		dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
		deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;

		return this.map( function () {
			return jQuery.clone( this, dataAndEvents, deepDataAndEvents );
		});
	},

	html: function( value ) {
		return jQuery.access( this, function( value ) {
			var elem = this[0] || {},
				i = 0,
				l = this.length;

			if ( value === undefined ) {
				return elem.nodeType === 1 ?
					elem.innerHTML.replace( rinlinejQuery, "" ) :
					undefined;
			}

			// See if we can take a shortcut and just use innerHTML
			if ( typeof value === "string" && !rnoInnerhtml.test( value ) &&
				( jQuery.support.htmlSerialize || !rnoshimcache.test( value )  ) &&
				( jQuery.support.leadingWhitespace || !rleadingWhitespace.test( value ) ) &&
				!wrapMap[ ( rtagName.exec( value ) || ["", ""] )[1].toLowerCase() ] ) {

				value = value.replace( rxhtmlTag, "<$1></$2>" );

				try {
					for (; i < l; i++ ) {
						// Remove element nodes and prevent memory leaks
						elem = this[i] || {};
						if ( elem.nodeType === 1 ) {
							jQuery.cleanData( elem.getElementsByTagName( "*" ) );
							elem.innerHTML = value;
						}
					}

					elem = 0;

				// If using innerHTML throws an exception, use the fallback method
				} catch(e) {}
			}

			if ( elem ) {
				this.empty().append( value );
			}
		}, null, value, arguments.length );
	},

	replaceWith: function( value ) {
		if ( !isDisconnected( this[0] ) ) {
			// Make sure that the elements are removed from the DOM before they are inserted
			// this can help fix replacing a parent with child elements
			if ( jQuery.isFunction( value ) ) {
				return this.each(function(i) {
					var self = jQuery(this), old = self.html();
					self.replaceWith( value.call( this, i, old ) );
				});
			}

			if ( typeof value !== "string" ) {
				value = jQuery( value ).detach();
			}

			return this.each(function() {
				var next = this.nextSibling,
					parent = this.parentNode;

				jQuery( this ).remove();

				if ( next ) {
					jQuery(next).before( value );
				} else {
					jQuery(parent).append( value );
				}
			});
		}

		return this.length ?
			this.pushStack( jQuery(jQuery.isFunction(value) ? value() : value), "replaceWith", value ) :
			this;
	},

	detach: function( selector ) {
		return this.remove( selector, true );
	},

	domManip: function( args, table, callback ) {

		// Flatten any nested arrays
		args = [].concat.apply( [], args );

		var results, first, fragment, iNoClone,
			i = 0,
			value = args[0],
			scripts = [],
			l = this.length;

		// We can't cloneNode fragments that contain checked, in WebKit
		if ( !jQuery.support.checkClone && l > 1 && typeof value === "string" && rchecked.test( value ) ) {
			return this.each(function() {
				jQuery(this).domManip( args, table, callback );
			});
		}

		if ( jQuery.isFunction(value) ) {
			return this.each(function(i) {
				var self = jQuery(this);
				args[0] = value.call( this, i, table ? self.html() : undefined );
				self.domManip( args, table, callback );
			});
		}

		if ( this[0] ) {
			results = jQuery.buildFragment( args, this, scripts );
			fragment = results.fragment;
			first = fragment.firstChild;

			if ( fragment.childNodes.length === 1 ) {
				fragment = first;
			}

			if ( first ) {
				table = table && jQuery.nodeName( first, "tr" );

				// Use the original fragment for the last item instead of the first because it can end up
				// being emptied incorrectly in certain situations (#8070).
				// Fragments from the fragment cache must always be cloned and never used in place.
				for ( iNoClone = results.cacheable || l - 1; i < l; i++ ) {
					callback.call(
						table && jQuery.nodeName( this[i], "table" ) ?
							findOrAppend( this[i], "tbody" ) :
							this[i],
						i === iNoClone ?
							fragment :
							jQuery.clone( fragment, true, true )
					);
				}
			}

			// Fix #11809: Avoid leaking memory
			fragment = first = null;

			if ( scripts.length ) {
				jQuery.each( scripts, function( i, elem ) {
					if ( elem.src ) {
						if ( jQuery.ajax ) {
							jQuery.ajax({
								url: elem.src,
								type: "GET",
								dataType: "script",
								async: false,
								global: false,
								"throws": true
							});
						} else {
							jQuery.error("no ajax");
						}
					} else {
						jQuery.globalEval( ( elem.text || elem.textContent || elem.innerHTML || "" ).replace( rcleanScript, "" ) );
					}

					if ( elem.parentNode ) {
						elem.parentNode.removeChild( elem );
					}
				});
			}
		}

		return this;
	}
});

function findOrAppend( elem, tag ) {
	return elem.getElementsByTagName( tag )[0] || elem.appendChild( elem.ownerDocument.createElement( tag ) );
}

function cloneCopyEvent( src, dest ) {

	if ( dest.nodeType !== 1 || !jQuery.hasData( src ) ) {
		return;
	}

	var type, i, l,
		oldData = jQuery._data( src ),
		curData = jQuery._data( dest, oldData ),
		events = oldData.events;

	if ( events ) {
		delete curData.handle;
		curData.events = {};

		for ( type in events ) {
			for ( i = 0, l = events[ type ].length; i < l; i++ ) {
				jQuery.event.add( dest, type, events[ type ][ i ] );
			}
		}
	}

	// make the cloned public data object a copy from the original
	if ( curData.data ) {
		curData.data = jQuery.extend( {}, curData.data );
	}
}

function cloneFixAttributes( src, dest ) {
	var nodeName;

	// We do not need to do anything for non-Elements
	if ( dest.nodeType !== 1 ) {
		return;
	}

	// clearAttributes removes the attributes, which we don't want,
	// but also removes the attachEvent events, which we *do* want
	if ( dest.clearAttributes ) {
		dest.clearAttributes();
	}

	// mergeAttributes, in contrast, only merges back on the
	// original attributes, not the events
	if ( dest.mergeAttributes ) {
		dest.mergeAttributes( src );
	}

	nodeName = dest.nodeName.toLowerCase();

	if ( nodeName === "object" ) {
		// IE6-10 improperly clones children of object elements using classid.
		// IE10 throws NoModificationAllowedError if parent is null, #12132.
		if ( dest.parentNode ) {
			dest.outerHTML = src.outerHTML;
		}

		// This path appears unavoidable for IE9. When cloning an object
		// element in IE9, the outerHTML strategy above is not sufficient.
		// If the src has innerHTML and the destination does not,
		// copy the src.innerHTML into the dest.innerHTML. #10324
		if ( jQuery.support.html5Clone && (src.innerHTML && !jQuery.trim(dest.innerHTML)) ) {
			dest.innerHTML = src.innerHTML;
		}

	} else if ( nodeName === "input" && rcheckableType.test( src.type ) ) {
		// IE6-8 fails to persist the checked state of a cloned checkbox
		// or radio button. Worse, IE6-7 fail to give the cloned element
		// a checked appearance if the defaultChecked value isn't also set

		dest.defaultChecked = dest.checked = src.checked;

		// IE6-7 get confused and end up setting the value of a cloned
		// checkbox/radio button to an empty string instead of "on"
		if ( dest.value !== src.value ) {
			dest.value = src.value;
		}

	// IE6-8 fails to return the selected option to the default selected
	// state when cloning options
	} else if ( nodeName === "option" ) {
		dest.selected = src.defaultSelected;

	// IE6-8 fails to set the defaultValue to the correct value when
	// cloning other types of input fields
	} else if ( nodeName === "input" || nodeName === "textarea" ) {
		dest.defaultValue = src.defaultValue;

	// IE blanks contents when cloning scripts
	} else if ( nodeName === "script" && dest.text !== src.text ) {
		dest.text = src.text;
	}

	// Event data gets referenced instead of copied if the expando
	// gets copied too
	dest.removeAttribute( jQuery.expando );
}

jQuery.buildFragment = function( args, context, scripts ) {
	var fragment, cacheable, cachehit,
		first = args[ 0 ];

	// Set context from what may come in as undefined or a jQuery collection or a node
	context = context || document;
	context = (context[0] || context).ownerDocument || context[0] || context;

	// Ensure that an attr object doesn't incorrectly stand in as a document object
	// Chrome and Firefox seem to allow this to occur and will throw exception
	// Fixes #8950
	if ( typeof context.createDocumentFragment === "undefined" ) {
		context = document;
	}

	// Only cache "small" (1/2 KB) HTML strings that are associated with the main document
	// Cloning options loses the selected state, so don't cache them
	// IE 6 doesn't like it when you put <object> or <embed> elements in a fragment
	// Also, WebKit does not clone 'checked' attributes on cloneNode, so don't cache
	// Lastly, IE6,7,8 will not correctly reuse cached fragments that were created from unknown elems #10501
	if ( args.length === 1 && typeof first === "string" && first.length < 512 && context === document &&
		first.charAt(0) === "<" && !rnocache.test( first ) &&
		(jQuery.support.checkClone || !rchecked.test( first )) &&
		(jQuery.support.html5Clone || !rnoshimcache.test( first )) ) {

		// Mark cacheable and look for a hit
		cacheable = true;
		fragment = jQuery.fragments[ first ];
		cachehit = fragment !== undefined;
	}

	if ( !fragment ) {
		fragment = context.createDocumentFragment();
		jQuery.clean( args, context, fragment, scripts );

		// Update the cache, but only store false
		// unless this is a second parsing of the same content
		if ( cacheable ) {
			jQuery.fragments[ first ] = cachehit && fragment;
		}
	}

	return { fragment: fragment, cacheable: cacheable };
};

jQuery.fragments = {};

jQuery.each({
	appendTo: "append",
	prependTo: "prepend",
	insertBefore: "before",
	insertAfter: "after",
	replaceAll: "replaceWith"
}, function( name, original ) {
	jQuery.fn[ name ] = function( selector ) {
		var elems,
			i = 0,
			ret = [],
			insert = jQuery( selector ),
			l = insert.length,
			parent = this.length === 1 && this[0].parentNode;

		if ( (parent == null || parent && parent.nodeType === 11 && parent.childNodes.length === 1) && l === 1 ) {
			insert[ original ]( this[0] );
			return this;
		} else {
			for ( ; i < l; i++ ) {
				elems = ( i > 0 ? this.clone(true) : this ).get();
				jQuery( insert[i] )[ original ]( elems );
				ret = ret.concat( elems );
			}

			return this.pushStack( ret, name, insert.selector );
		}
	};
});

function getAll( elem ) {
	if ( typeof elem.getElementsByTagName !== "undefined" ) {
		return elem.getElementsByTagName( "*" );

	} else if ( typeof elem.querySelectorAll !== "undefined" ) {
		return elem.querySelectorAll( "*" );

	} else {
		return [];
	}
}

// Used in clean, fixes the defaultChecked property
function fixDefaultChecked( elem ) {
	if ( rcheckableType.test( elem.type ) ) {
		elem.defaultChecked = elem.checked;
	}
}

jQuery.extend({
	clone: function( elem, dataAndEvents, deepDataAndEvents ) {
		var srcElements,
			destElements,
			i,
			clone;

		if ( jQuery.support.html5Clone || jQuery.isXMLDoc(elem) || !rnoshimcache.test( "<" + elem.nodeName + ">" ) ) {
			clone = elem.cloneNode( true );

		// IE<=8 does not properly clone detached, unknown element nodes
		} else {
			fragmentDiv.innerHTML = elem.outerHTML;
			fragmentDiv.removeChild( clone = fragmentDiv.firstChild );
		}

		if ( (!jQuery.support.noCloneEvent || !jQuery.support.noCloneChecked) &&
				(elem.nodeType === 1 || elem.nodeType === 11) && !jQuery.isXMLDoc(elem) ) {
			// IE copies events bound via attachEvent when using cloneNode.
			// Calling detachEvent on the clone will also remove the events
			// from the original. In order to get around this, we use some
			// proprietary methods to clear the events. Thanks to MooTools
			// guys for this hotness.

			cloneFixAttributes( elem, clone );

			// Using Sizzle here is crazy slow, so we use getElementsByTagName instead
			srcElements = getAll( elem );
			destElements = getAll( clone );

			// Weird iteration because IE will replace the length property
			// with an element if you are cloning the body and one of the
			// elements on the page has a name or id of "length"
			for ( i = 0; srcElements[i]; ++i ) {
				// Ensure that the destination node is not null; Fixes #9587
				if ( destElements[i] ) {
					cloneFixAttributes( srcElements[i], destElements[i] );
				}
			}
		}

		// Copy the events from the original to the clone
		if ( dataAndEvents ) {
			cloneCopyEvent( elem, clone );

			if ( deepDataAndEvents ) {
				srcElements = getAll( elem );
				destElements = getAll( clone );

				for ( i = 0; srcElements[i]; ++i ) {
					cloneCopyEvent( srcElements[i], destElements[i] );
				}
			}
		}

		srcElements = destElements = null;

		// Return the cloned set
		return clone;
	},

	clean: function( elems, context, fragment, scripts ) {
		var j, safe, elem, tag, wrap, depth, div, hasBody, tbody, len, handleScript, jsTags,
			i = 0,
			ret = [];

		// Ensure that context is a document
		if ( !context || typeof context.createDocumentFragment === "undefined" ) {
			context = document;
		}

		// Use the already-created safe fragment if context permits
		for ( safe = context === document && safeFragment; (elem = elems[i]) != null; i++ ) {
			if ( typeof elem === "number" ) {
				elem += "";
			}

			if ( !elem ) {
				continue;
			}

			// Convert html string into DOM nodes
			if ( typeof elem === "string" ) {
				if ( !rhtml.test( elem ) ) {
					elem = context.createTextNode( elem );
				} else {
					// Ensure a safe container in which to render the html
					safe = safe || createSafeFragment( context );
					div = div || safe.appendChild( context.createElement("div") );

					// Fix "XHTML"-style tags in all browsers
					elem = elem.replace(rxhtmlTag, "<$1></$2>");

					// Go to html and back, then peel off extra wrappers
					tag = ( rtagName.exec( elem ) || ["", ""] )[1].toLowerCase();
					wrap = wrapMap[ tag ] || wrapMap._default;
					depth = wrap[0];
					div.innerHTML = wrap[1] + elem + wrap[2];

					// Move to the right depth
					while ( depth-- ) {
						div = div.lastChild;
					}

					// Remove IE's autoinserted <tbody> from table fragments
					if ( !jQuery.support.tbody ) {

						// String was a <table>, *may* have spurious <tbody>
						hasBody = rtbody.test(elem);
							tbody = tag === "table" && !hasBody ?
								div.firstChild && div.firstChild.childNodes :

								// String was a bare <thead> or <tfoot>
								wrap[1] === "<table>" && !hasBody ?
									div.childNodes :
									[];

						for ( j = tbody.length - 1; j >= 0 ; --j ) {
							if ( jQuery.nodeName( tbody[ j ], "tbody" ) && !tbody[ j ].childNodes.length ) {
								tbody[ j ].parentNode.removeChild( tbody[ j ] );
							}
						}
					}

					// IE completely kills leading whitespace when innerHTML is used
					if ( !jQuery.support.leadingWhitespace && rleadingWhitespace.test( elem ) ) {
						div.insertBefore( context.createTextNode( rleadingWhitespace.exec(elem)[0] ), div.firstChild );
					}

					elem = div.childNodes;

					// Remember the top-level container for proper cleanup
					div = safe.lastChild;
				}
			}

			if ( elem.nodeType ) {
				ret.push( elem );
			} else {
				ret = jQuery.merge( ret, elem );
			}
		}

		// Fix #11356: Clear elements from safeFragment
		if ( div ) {
			safe.removeChild( div );
			elem = div = safe = null;
		}

		// Reset defaultChecked for any radios and checkboxes
		// about to be appended to the DOM in IE 6/7 (#8060)
		if ( !jQuery.support.appendChecked ) {
			for ( i = 0; (elem = ret[i]) != null; i++ ) {
				if ( jQuery.nodeName( elem, "input" ) ) {
					fixDefaultChecked( elem );
				} else if ( typeof elem.getElementsByTagName !== "undefined" ) {
					jQuery.grep( elem.getElementsByTagName("input"), fixDefaultChecked );
				}
			}
		}

		// Append elements to a provided document fragment
		if ( fragment ) {
			// Special handling of each script element
			handleScript = function( elem ) {
				// Check if we consider it executable
				if ( !elem.type || rscriptType.test( elem.type ) ) {
					// Detach the script and store it in the scripts array (if provided) or the fragment
					// Return truthy to indicate that it has been handled
					return scripts ?
						scripts.push( elem.parentNode ? elem.parentNode.removeChild( elem ) : elem ) :
						fragment.appendChild( elem );
				}
			};

			for ( i = 0; (elem = ret[i]) != null; i++ ) {
				// Check if we're done after handling an executable script
				if ( !( jQuery.nodeName( elem, "script" ) && handleScript( elem ) ) ) {
					// Append to fragment and handle embedded scripts
					fragment.appendChild( elem );
					if ( typeof elem.getElementsByTagName !== "undefined" ) {
						// handleScript alters the DOM, so use jQuery.merge to ensure snapshot iteration
						jsTags = jQuery.grep( jQuery.merge( [], elem.getElementsByTagName("script") ), handleScript );

						// Splice the scripts into ret after their former ancestor and advance our index beyond them
						ret.splice.apply( ret, [i + 1, 0].concat( jsTags ) );
						i += jsTags.length;
					}
				}
			}
		}

		return ret;
	},

	cleanData: function( elems, /* internal */ acceptData ) {
		var data, id, elem, type,
			i = 0,
			internalKey = jQuery.expando,
			cache = jQuery.cache,
			deleteExpando = jQuery.support.deleteExpando,
			special = jQuery.event.special;

		for ( ; (elem = elems[i]) != null; i++ ) {

			if ( acceptData || jQuery.acceptData( elem ) ) {

				id = elem[ internalKey ];
				data = id && cache[ id ];

				if ( data ) {
					if ( data.events ) {
						for ( type in data.events ) {
							if ( special[ type ] ) {
								jQuery.event.remove( elem, type );

							// This is a shortcut to avoid jQuery.event.remove's overhead
							} else {
								jQuery.removeEvent( elem, type, data.handle );
							}
						}
					}

					// Remove cache only if it was not already removed by jQuery.event.remove
					if ( cache[ id ] ) {

						delete cache[ id ];

						// IE does not allow us to delete expando properties from nodes,
						// nor does it have a removeAttribute function on Document nodes;
						// we must handle all of these cases
						if ( deleteExpando ) {
							delete elem[ internalKey ];

						} else if ( elem.removeAttribute ) {
							elem.removeAttribute( internalKey );

						} else {
							elem[ internalKey ] = null;
						}

						jQuery.deletedIds.push( id );
					}
				}
			}
		}
	}
});
// Limit scope pollution from any deprecated API
(function() {

var matched, browser;

// Use of jQuery.browser is frowned upon.
// More details: http://api.jquery.com/jQuery.browser
// jQuery.uaMatch maintained for back-compat
jQuery.uaMatch = function( ua ) {
	ua = ua.toLowerCase();

	var match = /(chrome)[ \/]([\w.]+)/.exec( ua ) ||
		/(webkit)[ \/]([\w.]+)/.exec( ua ) ||
		/(opera)(?:.*version|)[ \/]([\w.]+)/.exec( ua ) ||
		/(msie) ([\w.]+)/.exec( ua ) ||
		ua.indexOf("compatible") < 0 && /(mozilla)(?:.*? rv:([\w.]+)|)/.exec( ua ) ||
		[];

	return {
		browser: match[ 1 ] || "",
		version: match[ 2 ] || "0"
	};
};

matched = jQuery.uaMatch( navigator.userAgent );
browser = {};

if ( matched.browser ) {
	browser[ matched.browser ] = true;
	browser.version = matched.version;
}

// Deprecated, use jQuery.browser.webkit instead
// Maintained for back-compat only
if ( browser.webkit ) {
	browser.safari = true;
}

jQuery.browser = browser;

jQuery.sub = function() {
	function jQuerySub( selector, context ) {
		return new jQuerySub.fn.init( selector, context );
	}
	jQuery.extend( true, jQuerySub, this );
	jQuerySub.superclass = this;
	jQuerySub.fn = jQuerySub.prototype = this();
	jQuerySub.fn.constructor = jQuerySub;
	jQuerySub.sub = this.sub;
	jQuerySub.fn.init = function init( selector, context ) {
		if ( context && context instanceof jQuery && !(context instanceof jQuerySub) ) {
			context = jQuerySub( context );
		}

		return jQuery.fn.init.call( this, selector, context, rootjQuerySub );
	};
	jQuerySub.fn.init.prototype = jQuerySub.fn;
	var rootjQuerySub = jQuerySub(document);
	return jQuerySub;
};

})();
var curCSS, iframe, iframeDoc,
	ralpha = /alpha\([^)]*\)/i,
	ropacity = /opacity=([^)]*)/,
	rposition = /^(top|right|bottom|left)$/,
	rmargin = /^margin/,
	rnumsplit = new RegExp( "^(" + core_pnum + ")(.*)$", "i" ),
	rnumnonpx = new RegExp( "^(" + core_pnum + ")(?!px)[a-z%]+$", "i" ),
	rrelNum = new RegExp( "^([-+])=(" + core_pnum + ")", "i" ),
	elemdisplay = {},

	cssShow = { position: "absolute", visibility: "hidden", display: "block" },
	cssNormalTransform = {
		letterSpacing: 0,
		fontWeight: 400,
		lineHeight: 1
	},

	cssExpand = [ "Top", "Right", "Bottom", "Left" ],
	cssPrefixes = [ "Webkit", "O", "Moz", "ms" ],

	eventsToggle = jQuery.fn.toggle;

// return a css property mapped to a potentially vendor prefixed property
function vendorPropName( style, name ) {

	// shortcut for names that are not vendor prefixed
	if ( name in style ) {
		return name;
	}

	// check for vendor prefixed names
	var capName = name.charAt(0).toUpperCase() + name.slice(1),
		origName = name,
		i = cssPrefixes.length;

	while ( i-- ) {
		name = cssPrefixes[ i ] + capName;
		if ( name in style ) {
			return name;
		}
	}

	return origName;
}

function isHidden( elem, el ) {
	elem = el || elem;
	return jQuery.css( elem, "display" ) === "none" || !jQuery.contains( elem.ownerDocument, elem );
}

function showHide( elements, show ) {
	var elem, display,
		values = [],
		index = 0,
		length = elements.length;

	for ( ; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}
		values[ index ] = jQuery._data( elem, "olddisplay" );
		if ( show ) {
			// Reset the inline display of this element to learn if it is
			// being hidden by cascaded rules or not
			if ( !values[ index ] && elem.style.display === "none" ) {
				elem.style.display = "";
			}

			// Set elements which have been overridden with display: none
			// in a stylesheet to whatever the default browser style is
			// for such an element
			if ( elem.style.display === "" && isHidden( elem ) ) {
				values[ index ] = jQuery._data( elem, "olddisplay", css_defaultDisplay(elem.nodeName) );
			}
		} else {
			display = curCSS( elem, "display" );

			if ( !values[ index ] && display !== "none" ) {
				jQuery._data( elem, "olddisplay", display );
			}
		}
	}

	// Set the display of most of the elements in a second loop
	// to avoid the constant reflow
	for ( index = 0; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}
		if ( !show || elem.style.display === "none" || elem.style.display === "" ) {
			elem.style.display = show ? values[ index ] || "" : "none";
		}
	}

	return elements;
}

jQuery.fn.extend({
	css: function( name, value ) {
		return jQuery.access( this, function( elem, name, value ) {
			return value !== undefined ?
				jQuery.style( elem, name, value ) :
				jQuery.css( elem, name );
		}, name, value, arguments.length > 1 );
	},
	show: function() {
		return showHide( this, true );
	},
	hide: function() {
		return showHide( this );
	},
	toggle: function( state, fn2 ) {
		var bool = typeof state === "boolean";

		if ( jQuery.isFunction( state ) && jQuery.isFunction( fn2 ) ) {
			return eventsToggle.apply( this, arguments );
		}

		return this.each(function() {
			if ( bool ? state : isHidden( this ) ) {
				jQuery( this ).show();
			} else {
				jQuery( this ).hide();
			}
		});
	}
});

jQuery.extend({
	// Add in style property hooks for overriding the default
	// behavior of getting and setting a style property
	cssHooks: {
		opacity: {
			get: function( elem, computed ) {
				if ( computed ) {
					// We should always get a number back from opacity
					var ret = curCSS( elem, "opacity" );
					return ret === "" ? "1" : ret;

				}
			}
		}
	},

	// Exclude the following css properties to add px
	cssNumber: {
		"fillOpacity": true,
		"fontWeight": true,
		"lineHeight": true,
		"opacity": true,
		"orphans": true,
		"widows": true,
		"zIndex": true,
		"zoom": true
	},

	// Add in properties whose names you wish to fix before
	// setting or getting the value
	cssProps: {
		// normalize float css property
		"float": jQuery.support.cssFloat ? "cssFloat" : "styleFloat"
	},

	// Get and set the style property on a DOM Node
	style: function( elem, name, value, extra ) {
		// Don't set styles on text and comment nodes
		if ( !elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style ) {
			return;
		}

		// Make sure that we're working with the right name
		var ret, type, hooks,
			origName = jQuery.camelCase( name ),
			style = elem.style;

		name = jQuery.cssProps[ origName ] || ( jQuery.cssProps[ origName ] = vendorPropName( style, origName ) );

		// gets hook for the prefixed version
		// followed by the unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// Check if we're setting a value
		if ( value !== undefined ) {
			type = typeof value;

			// convert relative number strings (+= or -=) to relative numbers. #7345
			if ( type === "string" && (ret = rrelNum.exec( value )) ) {
				value = ( ret[1] + 1 ) * ret[2] + parseFloat( jQuery.css( elem, name ) );
				// Fixes bug #9237
				type = "number";
			}

			// Make sure that NaN and null values aren't set. See: #7116
			if ( value == null || type === "number" && isNaN( value ) ) {
				return;
			}

			// If a number was passed in, add 'px' to the (except for certain CSS properties)
			if ( type === "number" && !jQuery.cssNumber[ origName ] ) {
				value += "px";
			}

			// If a hook was provided, use that value, otherwise just set the specified value
			if ( !hooks || !("set" in hooks) || (value = hooks.set( elem, value, extra )) !== undefined ) {
				// Wrapped to prevent IE from throwing errors when 'invalid' values are provided
				// Fixes bug #5509
				try {
					style[ name ] = value;
				} catch(e) {}
			}

		} else {
			// If a hook was provided get the non-computed value from there
			if ( hooks && "get" in hooks && (ret = hooks.get( elem, false, extra )) !== undefined ) {
				return ret;
			}

			// Otherwise just get the value from the style object
			return style[ name ];
		}
	},

	css: function( elem, name, numeric, extra ) {
		var val, num, hooks,
			origName = jQuery.camelCase( name );

		// Make sure that we're working with the right name
		name = jQuery.cssProps[ origName ] || ( jQuery.cssProps[ origName ] = vendorPropName( elem.style, origName ) );

		// gets hook for the prefixed version
		// followed by the unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// If a hook was provided get the computed value from there
		if ( hooks && "get" in hooks ) {
			val = hooks.get( elem, true, extra );
		}

		// Otherwise, if a way to get the computed value exists, use that
		if ( val === undefined ) {
			val = curCSS( elem, name );
		}

		//convert "normal" to computed value
		if ( val === "normal" && name in cssNormalTransform ) {
			val = cssNormalTransform[ name ];
		}

		// Return, converting to number if forced or a qualifier was provided and val looks numeric
		if ( numeric || extra !== undefined ) {
			num = parseFloat( val );
			return numeric || jQuery.isNumeric( num ) ? num || 0 : val;
		}
		return val;
	},

	// A method for quickly swapping in/out CSS properties to get correct calculations
	swap: function( elem, options, callback ) {
		var ret, name,
			old = {};

		// Remember the old values, and insert the new ones
		for ( name in options ) {
			old[ name ] = elem.style[ name ];
			elem.style[ name ] = options[ name ];
		}

		ret = callback.call( elem );

		// Revert the old values
		for ( name in options ) {
			elem.style[ name ] = old[ name ];
		}

		return ret;
	},

	curCSS: function( elem, name ) {
		var ret, width, minWidth, maxWidth,
			computed = getComputedStyle( elem, null ),
			style = elem.style;

		if ( computed ) {

			ret = computed[ name ];
			if ( ret === "" && !jQuery.contains( elem.ownerDocument.documentElement, elem ) ) {
				ret = jQuery.style( elem, name );
			}

			// A tribute to the "awesome hack by Dean Edwards"
			// Chrome < 17 and Safari 5.0 uses "computed value" instead of "used value" for margin-right
			// Safari 5.1.7 (at least) returns percentage for a larger set of values, but width seems to be reliably pixels
			// this is against the CSSOM draft spec: http://dev.w3.org/csswg/cssom/#resolved-values
			if ( rnumnonpx.test( ret ) && rmargin.test( name ) ) {
				width = style.width;
				minWidth = style.minWidth;
				maxWidth = style.maxWidth;

				style.minWidth = style.maxWidth = style.width = ret;
				ret = computed.width;

				style.width = width;
				style.minWidth = minWidth;
				style.maxWidth = maxWidth;
			}
		}

		return ret;
	}
});

// NOTE: To any future maintainer, we've used both window.getComputedStyle
// and getComputedStyle here to produce a better gzip size
if ( window.getComputedStyle ) {
	curCSS = function( elem, name ) {
		var ret, width, minWidth, maxWidth,
			computed = getComputedStyle( elem, null ),
			style = elem.style;

		if ( computed ) {

			ret = computed[ name ];
			if ( ret === "" && !jQuery.contains( elem.ownerDocument.documentElement, elem ) ) {
				ret = jQuery.style( elem, name );
			}

			// A tribute to the "awesome hack by Dean Edwards"
			// Chrome < 17 and Safari 5.0 uses "computed value" instead of "used value" for margin-right
			// Safari 5.1.7 (at least) returns percentage for a larger set of values, but width seems to be reliably pixels
			// this is against the CSSOM draft spec: http://dev.w3.org/csswg/cssom/#resolved-values
			if ( rnumnonpx.test( ret ) && rmargin.test( name ) ) {
				width = style.width;
				minWidth = style.minWidth;
				maxWidth = style.maxWidth;

				style.minWidth = style.maxWidth = style.width = ret;
				ret = computed.width;

				style.width = width;
				style.minWidth = minWidth;
				style.maxWidth = maxWidth;
			}
		}

		return ret;
	};
} else if ( document.documentElement.currentStyle ) {
	curCSS = function( elem, name ) {
		var left, rsLeft,
			ret = elem.currentStyle && elem.currentStyle[ name ],
			style = elem.style;

		// Avoid setting ret to empty string here
		// so we don't default to auto
		if ( ret == null && style && style[ name ] ) {
			ret = style[ name ];
		}

		// From the awesome hack by Dean Edwards
		// http://erik.eae.net/archives/2007/07/27/18.54.15/#comment-102291

		// If we're not dealing with a regular pixel number
		// but a number that has a weird ending, we need to convert it to pixels
		// but not position css attributes, as those are proportional to the parent element instead
		// and we can't measure the parent instead because it might trigger a "stacking dolls" problem
		if ( rnumnonpx.test( ret ) && !rposition.test( name ) ) {

			// Remember the original values
			left = style.left;
			rsLeft = elem.runtimeStyle && elem.runtimeStyle.left;

			// Put in the new values to get a computed value out
			if ( rsLeft ) {
				elem.runtimeStyle.left = elem.currentStyle.left;
			}
			style.left = name === "fontSize" ? "1em" : ret;
			ret = style.pixelLeft + "px";

			// Revert the changed values
			style.left = left;
			if ( rsLeft ) {
				elem.runtimeStyle.left = rsLeft;
			}
		}

		return ret === "" ? "auto" : ret;
	};
}

function setPositiveNumber( elem, value, subtract ) {
	var matches = rnumsplit.exec( value );
	return matches ?
			Math.max( 0, matches[ 1 ] - ( subtract || 0 ) ) + ( matches[ 2 ] || "px" ) :
			value;
}

function augmentWidthOrHeight( elem, name, extra, isBorderBox ) {
	var i = extra === ( isBorderBox ? "border" : "content" ) ?
		// If we already have the right measurement, avoid augmentation
		4 :
		// Otherwise initialize for horizontal or vertical properties
		name === "width" ? 1 : 0,

		val = 0;

	for ( ; i < 4; i += 2 ) {
		// both box models exclude margin, so add it if we want it
		if ( extra === "margin" ) {
			// we use jQuery.css instead of curCSS here
			// because of the reliableMarginRight CSS hook!
			val += jQuery.css( elem, extra + cssExpand[ i ], true );
		}

		// From this point on we use curCSS for maximum performance (relevant in animations)
		if ( isBorderBox ) {
			// border-box includes padding, so remove it if we want content
			if ( extra === "content" ) {
				val -= parseFloat( curCSS( elem, "padding" + cssExpand[ i ] ) ) || 0;
			}

			// at this point, extra isn't border nor margin, so remove border
			if ( extra !== "margin" ) {
				val -= parseFloat( curCSS( elem, "border" + cssExpand[ i ] + "Width" ) ) || 0;
			}
		} else {
			// at this point, extra isn't content, so add padding
			val += parseFloat( curCSS( elem, "padding" + cssExpand[ i ] ) ) || 0;

			// at this point, extra isn't content nor padding, so add border
			if ( extra !== "padding" ) {
				val += parseFloat( curCSS( elem, "border" + cssExpand[ i ] + "Width" ) ) || 0;
			}
		}
	}

	return val;
}

function getWidthOrHeight( elem, name, extra ) {

	// Start with offset property, which is equivalent to the border-box value
	var val = name === "width" ? elem.offsetWidth : elem.offsetHeight,
		valueIsBorderBox = true,
		isBorderBox = jQuery.support.boxSizing && jQuery.css( elem, "boxSizing" ) === "border-box";

	if ( val <= 0 ) {
		// Fall back to computed then uncomputed css if necessary
		val = curCSS( elem, name );
		if ( val < 0 || val == null ) {
			val = elem.style[ name ];
		}

		// Computed unit is not pixels. Stop here and return.
		if ( rnumnonpx.test(val) ) {
			return val;
		}

		// we need the check for style in case a browser which returns unreliable values
		// for getComputedStyle silently falls back to the reliable elem.style
		valueIsBorderBox = isBorderBox && ( jQuery.support.boxSizingReliable || val === elem.style[ name ] );

		// Normalize "", auto, and prepare for extra
		val = parseFloat( val ) || 0;
	}

	// use the active box-sizing model to add/subtract irrelevant styles
	return ( val +
		augmentWidthOrHeight(
			elem,
			name,
			extra || ( isBorderBox ? "border" : "content" ),
			valueIsBorderBox
		)
	) + "px";
}


// Try to determine the default display value of an element
function css_defaultDisplay( nodeName ) {
	if ( elemdisplay[ nodeName ] ) {
		return elemdisplay[ nodeName ];
	}

	var elem = jQuery( "<" + nodeName + ">" ).appendTo( document.body ),
		display = elem.css("display");
	elem.remove();

	// If the simple way fails,
	// get element's real default display by attaching it to a temp iframe
	if ( display === "none" || display === "" ) {
		// Use the already-created iframe if possible
		iframe = document.body.appendChild(
			iframe || jQuery.extend( document.createElement("iframe"), {
				frameBorder: 0,
				width: 0,
				height: 0
			})
		);

		// Create a cacheable copy of the iframe document on first call.
		// IE and Opera will allow us to reuse the iframeDoc without re-writing the fake HTML
		// document to it; WebKit & Firefox won't allow reusing the iframe document.
		if ( !iframeDoc || !iframe.createElement ) {
			iframeDoc = ( iframe.contentWindow || iframe.contentDocument ).document;
			iframeDoc.write("<!doctype html><html><body>");
			iframeDoc.close();
		}

		elem = iframeDoc.body.appendChild( iframeDoc.createElement(nodeName) );

		display = curCSS( elem, "display" );
		document.body.removeChild( iframe );
	}

	// Store the correct default display
	elemdisplay[ nodeName ] = display;

	return display;
}

jQuery.each([ "height", "width" ], function( i, name ) {
	jQuery.cssHooks[ name ] = {
		get: function( elem, computed, extra ) {
			if ( computed ) {
				if ( elem.offsetWidth !== 0 || curCSS( elem, "display" ) !== "none" ) {
					return getWidthOrHeight( elem, name, extra );
				} else {
					return jQuery.swap( elem, cssShow, function() {
						return getWidthOrHeight( elem, name, extra );
					});
				}
			}
		},

		set: function( elem, value, extra ) {
			return setPositiveNumber( elem, value, extra ?
				augmentWidthOrHeight(
					elem,
					name,
					extra,
					jQuery.support.boxSizing && jQuery.css( elem, "boxSizing" ) === "border-box"
				) : 0
			);
		}
	};
});

if ( !jQuery.support.opacity ) {
	jQuery.cssHooks.opacity = {
		get: function( elem, computed ) {
			// IE uses filters for opacity
			return ropacity.test( (computed && elem.currentStyle ? elem.currentStyle.filter : elem.style.filter) || "" ) ?
				( 0.01 * parseFloat( RegExp.$1 ) ) + "" :
				computed ? "1" : "";
		},

		set: function( elem, value ) {
			var style = elem.style,
				currentStyle = elem.currentStyle,
				opacity = jQuery.isNumeric( value ) ? "alpha(opacity=" + value * 100 + ")" : "",
				filter = currentStyle && currentStyle.filter || style.filter || "";

			// IE has trouble with opacity if it does not have layout
			// Force it by setting the zoom level
			style.zoom = 1;

			// if setting opacity to 1, and no other filters exist - attempt to remove filter attribute #6652
			if ( value >= 1 && jQuery.trim( filter.replace( ralpha, "" ) ) === "" &&
				style.removeAttribute ) {

				// Setting style.filter to null, "" & " " still leave "filter:" in the cssText
				// if "filter:" is present at all, clearType is disabled, we want to avoid this
				// style.removeAttribute is IE Only, but so apparently is this code path...
				style.removeAttribute( "filter" );

				// if there there is no filter style applied in a css rule, we are done
				if ( currentStyle && !currentStyle.filter ) {
					return;
				}
			}

			// otherwise, set new filter values
			style.filter = ralpha.test( filter ) ?
				filter.replace( ralpha, opacity ) :
				filter + " " + opacity;
		}
	};
}

// These hooks cannot be added until DOM ready because the support test
// for it is not run until after DOM ready
jQuery(function() {
	if ( !jQuery.support.reliableMarginRight ) {
		jQuery.cssHooks.marginRight = {
			get: function( elem, computed ) {
				// WebKit Bug 13343 - getComputedStyle returns wrong value for margin-right
				// Work around by temporarily setting element display to inline-block
				return jQuery.swap( elem, { "display": "inline-block" }, function() {
					if ( computed ) {
						return curCSS( elem, "marginRight" );
					}
				});
			}
		};
	}

	// Webkit bug: https://bugs.webkit.org/show_bug.cgi?id=29084
	// getComputedStyle returns percent when specified for top/left/bottom/right
	// rather than make the css module depend on the offset module, we just check for it here
	if ( !jQuery.support.pixelPosition && jQuery.fn.position ) {
		jQuery.each( [ "top", "left" ], function( i, prop ) {
			jQuery.cssHooks[ prop ] = {
				get: function( elem, computed ) {
					if ( computed ) {
						var ret = curCSS( elem, prop );
						// if curCSS returns percentage, fallback to offset
						return rnumnonpx.test( ret ) ? jQuery( elem ).position()[ prop ] + "px" : ret;
					}
				}
			};
		});
	}

});

if ( jQuery.expr && jQuery.expr.filters ) {
	jQuery.expr.filters.hidden = function( elem ) {
		return ( elem.offsetWidth === 0 && elem.offsetHeight === 0 ) || (!jQuery.support.reliableHiddenOffsets && ((elem.style && elem.style.display) || curCSS( elem, "display" )) === "none");
	};

	jQuery.expr.filters.visible = function( elem ) {
		return !jQuery.expr.filters.hidden( elem );
	};
}

// These hooks are used by animate to expand properties
jQuery.each({
	margin: "",
	padding: "",
	border: "Width"
}, function( prefix, suffix ) {
	jQuery.cssHooks[ prefix + suffix ] = {
		expand: function( value ) {
			var i,

				// assumes a single number if not a string
				parts = typeof value === "string" ? value.split(" ") : [ value ],
				expanded = {};

			for ( i = 0; i < 4; i++ ) {
				expanded[ prefix + cssExpand[ i ] + suffix ] =
					parts[ i ] || parts[ i - 2 ] || parts[ 0 ];
			}

			return expanded;
		}
	};

	if ( !rmargin.test( prefix ) ) {
		jQuery.cssHooks[ prefix + suffix ].set = setPositiveNumber;
	}
});
var r20 = /%20/g,
	rbracket = /\[\]$/,
	rCRLF = /\r?\n/g,
	rinput = /^(?:color|date|datetime|datetime-local|email|hidden|month|number|password|range|search|tel|text|time|url|week)$/i,
	rselectTextarea = /^(?:select|textarea)/i;

jQuery.fn.extend({
	serialize: function() {
		return jQuery.param( this.serializeArray() );
	},
	serializeArray: function() {
		return this.map(function(){
			return this.elements ? jQuery.makeArray( this.elements ) : this;
		})
		.filter(function(){
			return this.name && !this.disabled &&
				( this.checked || rselectTextarea.test( this.nodeName ) ||
					rinput.test( this.type ) );
		})
		.map(function( i, elem ){
			var val = jQuery( this ).val();

			return val == null ?
				null :
				jQuery.isArray( val ) ?
					jQuery.map( val, function( val, i ){
						return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
					}) :
					{ name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
		}).get();
	}
});

//Serialize an array of form elements or a set of
//key/values into a query string
jQuery.param = function( a, traditional ) {
	var prefix,
		s = [],
		add = function( key, value ) {
			// If value is a function, invoke it and return its value
			value = jQuery.isFunction( value ) ? value() : ( value == null ? "" : value );
			s[ s.length ] = encodeURIComponent( key ) + "=" + encodeURIComponent( value );
		};

	// Set traditional to true for jQuery <= 1.3.2 behavior.
	if ( traditional === undefined ) {
		traditional = jQuery.ajaxSettings && jQuery.ajaxSettings.traditional;
	}

	// If an array was passed in, assume that it is an array of form elements.
	if ( jQuery.isArray( a ) || ( a.jquery && !jQuery.isPlainObject( a ) ) ) {
		// Serialize the form elements
		jQuery.each( a, function() {
			add( this.name, this.value );
		});

	} else {
		// If traditional, encode the "old" way (the way 1.3.2 or older
		// did it), otherwise encode params recursively.
		for ( prefix in a ) {
			buildParams( prefix, a[ prefix ], traditional, add );
		}
	}

	// Return the resulting serialization
	return s.join( "&" ).replace( r20, "+" );
};

function buildParams( prefix, obj, traditional, add ) {
	var name;

	if ( jQuery.isArray( obj ) ) {
		// Serialize array item.
		jQuery.each( obj, function( i, v ) {
			if ( traditional || rbracket.test( prefix ) ) {
				// Treat each array item as a scalar.
				add( prefix, v );

			} else {
				// If array item is non-scalar (array or object), encode its
				// numeric index to resolve deserialization ambiguity issues.
				// Note that rack (as of 1.0.0) can't currently deserialize
				// nested arrays properly, and attempting to do so may cause
				// a server error. Possible fixes are to modify rack's
				// deserialization algorithm or to provide an option or flag
				// to force array serialization to be shallow.
				buildParams( prefix + "[" + ( typeof v === "object" ? i : "" ) + "]", v, traditional, add );
			}
		});

	} else if ( !traditional && jQuery.type( obj ) === "object" ) {
		// Serialize object item.
		for ( name in obj ) {
			buildParams( prefix + "[" + name + "]", obj[ name ], traditional, add );
		}

	} else {
		// Serialize scalar item.
		add( prefix, obj );
	}
}
var // Document location
	ajaxLocation,
	// Document location segments
	ajaxLocParts,

	rhash = /#.*$/,
	rheaders = /^(.*?):[ \t]*([^\r\n]*)\r?$/mg, // IE leaves an \r character at EOL
	// #7653, #8125, #8152: local protocol detection
	rlocalProtocol = /^(?:about|app|app\-storage|.+\-extension|file|res|widget):$/,
	rnoContent = /^(?:GET|HEAD)$/,
	rprotocol = /^\/\//,
	rquery = /\?/,
	rscript = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
	rts = /([?&])_=[^&]*/,
	rurl = /^([\w\+\.\-]+:)(?:\/\/([^\/?#:]*)(?::(\d+)|)|)/,

	// Keep a copy of the old load method
	_load = jQuery.fn.load,

	/* Prefilters
	 * 1) They are useful to introduce custom dataTypes (see ajax/jsonp.js for an example)
	 * 2) These are called:
	 *    - BEFORE asking for a transport
	 *    - AFTER param serialization (s.data is a string if s.processData is true)
	 * 3) key is the dataType
	 * 4) the catchall symbol "*" can be used
	 * 5) execution will start with transport dataType and THEN continue down to "*" if needed
	 */
	prefilters = {},

	/* Transports bindings
	 * 1) key is the dataType
	 * 2) the catchall symbol "*" can be used
	 * 3) selection will start with transport dataType and THEN go to "*" if needed
	 */
	transports = {},

	// Avoid comment-prolog char sequence (#10098); must appease lint and evade compression
	allTypes = ["*/"] + ["*"];

// #8138, IE may throw an exception when accessing
// a field from window.location if document.domain has been set
try {
	ajaxLocation = location.href;
} catch( e ) {
	// Use the href attribute of an A element
	// since IE will modify it given document.location
	ajaxLocation = document.createElement( "a" );
	ajaxLocation.href = "";
	ajaxLocation = ajaxLocation.href;
}

// Segment location into parts
ajaxLocParts = rurl.exec( ajaxLocation.toLowerCase() ) || [];

// Base "constructor" for jQuery.ajaxPrefilter and jQuery.ajaxTransport
function addToPrefiltersOrTransports( structure ) {

	// dataTypeExpression is optional and defaults to "*"
	return function( dataTypeExpression, func ) {

		if ( typeof dataTypeExpression !== "string" ) {
			func = dataTypeExpression;
			dataTypeExpression = "*";
		}

		var dataType, list, placeBefore,
			dataTypes = dataTypeExpression.toLowerCase().split( core_rspace ),
			i = 0,
			length = dataTypes.length;

		if ( jQuery.isFunction( func ) ) {
			// For each dataType in the dataTypeExpression
			for ( ; i < length; i++ ) {
				dataType = dataTypes[ i ];
				// We control if we're asked to add before
				// any existing element
				placeBefore = /^\+/.test( dataType );
				if ( placeBefore ) {
					dataType = dataType.substr( 1 ) || "*";
				}
				list = structure[ dataType ] = structure[ dataType ] || [];
				// then we add to the structure accordingly
				list[ placeBefore ? "unshift" : "push" ]( func );
			}
		}
	};
}

// Base inspection function for prefilters and transports
function inspectPrefiltersOrTransports( structure, options, originalOptions, jqXHR,
		dataType /* internal */, inspected /* internal */ ) {

	dataType = dataType || options.dataTypes[ 0 ];
	inspected = inspected || {};

	inspected[ dataType ] = true;

	var selection,
		list = structure[ dataType ],
		i = 0,
		length = list ? list.length : 0,
		executeOnly = ( structure === prefilters );

	for ( ; i < length && ( executeOnly || !selection ); i++ ) {
		selection = list[ i ]( options, originalOptions, jqXHR );
		// If we got redirected to another dataType
		// we try there if executing only and not done already
		if ( typeof selection === "string" ) {
			if ( !executeOnly || inspected[ selection ] ) {
				selection = undefined;
			} else {
				options.dataTypes.unshift( selection );
				selection = inspectPrefiltersOrTransports(
						structure, options, originalOptions, jqXHR, selection, inspected );
			}
		}
	}
	// If we're only executing or nothing was selected
	// we try the catchall dataType if not done already
	if ( ( executeOnly || !selection ) && !inspected[ "*" ] ) {
		selection = inspectPrefiltersOrTransports(
				structure, options, originalOptions, jqXHR, "*", inspected );
	}
	// unnecessary when only executing (prefilters)
	// but it'll be ignored by the caller in that case
	return selection;
}

// A special extend for ajax options
// that takes "flat" options (not to be deep extended)
// Fixes #9887
function ajaxExtend( target, src ) {
	var key, deep,
		flatOptions = jQuery.ajaxSettings.flatOptions || {};
	for ( key in src ) {
		if ( src[ key ] !== undefined ) {
			( flatOptions[ key ] ? target : ( deep || ( deep = {} ) ) )[ key ] = src[ key ];
		}
	}
	if ( deep ) {
		jQuery.extend( true, target, deep );
	}
}

jQuery.fn.load = function( url, params, callback ) {
	if ( typeof url !== "string" && _load ) {
		return _load.apply( this, arguments );
	}

	// Don't do a request if no elements are being requested
	if ( !this.length ) {
		return this;
	}

	var selector, type, response,
		self = this,
		off = url.indexOf(" ");

	if ( off >= 0 ) {
		selector = url.slice( off, url.length );
		url = url.slice( 0, off );
	}

	// If it's a function
	if ( jQuery.isFunction( params ) ) {

		// We assume that it's the callback
		callback = params;
		params = undefined;

	// Otherwise, build a param string
	} else if ( typeof params === "object" ) {
		type = "POST";
	}

	// Request the remote document
	jQuery.ajax({
		url: url,

		// if "type" variable is undefined, then "GET" method will be used
		type: type,
		dataType: "html",
		data: params,
		complete: function( jqXHR, status ) {
			if ( callback ) {
				self.each( callback, response || [ jqXHR.responseText, status, jqXHR ] );
			}
		}
	}).done(function( responseText ) {

		// Save response for use in complete callback
		response = arguments;

		// See if a selector was specified
		self.html( selector ?

			// Create a dummy div to hold the results
			jQuery("<div>")

				// inject the contents of the document in, removing the scripts
				// to avoid any 'Permission Denied' errors in IE
				.append( responseText.replace( rscript, "" ) )

				// Locate the specified elements
				.find( selector ) :

			// If not, just inject the full result
			responseText );

	});

	return this;
};

// Attach a bunch of functions for handling common AJAX events
jQuery.each( "ajaxStart ajaxStop ajaxComplete ajaxError ajaxSuccess ajaxSend".split( " " ), function( i, o ){
	jQuery.fn[ o ] = function( f ){
		return this.on( o, f );
	};
});

jQuery.each( [ "get", "post" ], function( i, method ) {
	jQuery[ method ] = function( url, data, callback, type ) {
		// shift arguments if data argument was omitted
		if ( jQuery.isFunction( data ) ) {
			type = type || callback;
			callback = data;
			data = undefined;
		}

		return jQuery.ajax({
			type: method,
			url: url,
			data: data,
			success: callback,
			dataType: type
		});
	};
});

jQuery.extend({

	getScript: function( url, callback ) {
		return jQuery.get( url, undefined, callback, "script" );
	},

	getJSON: function( url, data, callback ) {
		return jQuery.get( url, data, callback, "json" );
	},

	// Creates a full fledged settings object into target
	// with both ajaxSettings and settings fields.
	// If target is omitted, writes into ajaxSettings.
	ajaxSetup: function( target, settings ) {
		if ( settings ) {
			// Building a settings object
			ajaxExtend( target, jQuery.ajaxSettings );
		} else {
			// Extending ajaxSettings
			settings = target;
			target = jQuery.ajaxSettings;
		}
		ajaxExtend( target, settings );
		return target;
	},

	ajaxSettings: {
		url: ajaxLocation,
		isLocal: rlocalProtocol.test( ajaxLocParts[ 1 ] ),
		global: true,
		type: "GET",
		contentType: "application/x-www-form-urlencoded; charset=UTF-8",
		processData: true,
		async: true,
		/*
		timeout: 0,
		data: null,
		dataType: null,
		username: null,
		password: null,
		cache: null,
		throws: false,
		traditional: false,
		headers: {},
		*/

		accepts: {
			xml: "application/xml, text/xml",
			html: "text/html",
			text: "text/plain",
			json: "application/json, text/javascript",
			"*": allTypes
		},

		contents: {
			xml: /xml/,
			html: /html/,
			json: /json/
		},

		responseFields: {
			xml: "responseXML",
			text: "responseText"
		},

		// List of data converters
		// 1) key format is "source_type destination_type" (a single space in-between)
		// 2) the catchall symbol "*" can be used for source_type
		converters: {

			// Convert anything to text
			"* text": window.String,

			// Text to html (true = no transformation)
			"text html": true,

			// Evaluate text as a json expression
			"text json": jQuery.parseJSON,

			// Parse text as xml
			"text xml": jQuery.parseXML
		},

		// For options that shouldn't be deep extended:
		// you can add your own custom options here if
		// and when you create one that shouldn't be
		// deep extended (see ajaxExtend)
		flatOptions: {
			context: true,
			url: true
		}
	},

	ajaxPrefilter: addToPrefiltersOrTransports( prefilters ),
	ajaxTransport: addToPrefiltersOrTransports( transports ),

	// Main method
	ajax: function( url, options ) {

		// If url is an object, simulate pre-1.5 signature
		if ( typeof url === "object" ) {
			options = url;
			url = undefined;
		}

		// Force options to be an object
		options = options || {};

		var // ifModified key
			ifModifiedKey,
			// Response headers
			responseHeadersString,
			responseHeaders,
			// transport
			transport,
			// timeout handle
			timeoutTimer,
			// Cross-domain detection vars
			parts,
			// To know if global events are to be dispatched
			fireGlobals,
			// Loop variable
			i,
			// Create the final options object
			s = jQuery.ajaxSetup( {}, options ),
			// Callbacks context
			callbackContext = s.context || s,
			// Context for global events
			// It's the callbackContext if one was provided in the options
			// and if it's a DOM node or a jQuery collection
			globalEventContext = callbackContext !== s &&
				( callbackContext.nodeType || callbackContext instanceof jQuery ) ?
						jQuery( callbackContext ) : jQuery.event,
			// Deferreds
			deferred = jQuery.Deferred(),
			completeDeferred = jQuery.Callbacks( "once memory" ),
			// Status-dependent callbacks
			statusCode = s.statusCode || {},
			// Headers (they are sent all at once)
			requestHeaders = {},
			requestHeadersNames = {},
			// The jqXHR state
			state = 0,
			// Default abort message
			strAbort = "canceled",
			// Fake xhr
			jqXHR = {

				readyState: 0,

				// Caches the header
				setRequestHeader: function( name, value ) {
					if ( !state ) {
						var lname = name.toLowerCase();
						name = requestHeadersNames[ lname ] = requestHeadersNames[ lname ] || name;
						requestHeaders[ name ] = value;
					}
					return this;
				},

				// Raw string
				getAllResponseHeaders: function() {
					return state === 2 ? responseHeadersString : null;
				},

				// Builds headers hashtable if needed
				getResponseHeader: function( key ) {
					var match;
					if ( state === 2 ) {
						if ( !responseHeaders ) {
							responseHeaders = {};
							while( ( match = rheaders.exec( responseHeadersString ) ) ) {
								responseHeaders[ match[1].toLowerCase() ] = match[ 2 ];
							}
						}
						match = responseHeaders[ key.toLowerCase() ];
					}
					return match === undefined ? null : match;
				},

				// Overrides response content-type header
				overrideMimeType: function( type ) {
					if ( !state ) {
						s.mimeType = type;
					}
					return this;
				},

				// Cancel the request
				abort: function( statusText ) {
					statusText = statusText || strAbort;
					if ( transport ) {
						transport.abort( statusText );
					}
					done( 0, statusText );
					return this;
				}
			};

		// Callback for when everything is done
		// It is defined here because jslint complains if it is declared
		// at the end of the function (which would be more logical and readable)
		function done( status, nativeStatusText, responses, headers ) {
			var isSuccess, success, error, response, modified,
				statusText = nativeStatusText;

			// Called once
			if ( state === 2 ) {
				return;
			}

			// State is "done" now
			state = 2;

			// Clear timeout if it exists
			if ( timeoutTimer ) {
				clearTimeout( timeoutTimer );
			}

			// Dereference transport for early garbage collection
			// (no matter how long the jqXHR object will be used)
			transport = undefined;

			// Cache response headers
			responseHeadersString = headers || "";

			// Set readyState
			jqXHR.readyState = status > 0 ? 4 : 0;

			// Get response data
			if ( responses ) {
				response = ajaxHandleResponses( s, jqXHR, responses );
			}

			// If successful, handle type chaining
			if ( status >= 200 && status < 300 || status === 304 ) {

				// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
				if ( s.ifModified ) {

					modified = jqXHR.getResponseHeader("Last-Modified");
					if ( modified ) {
						jQuery.lastModified[ ifModifiedKey ] = modified;
					}
					modified = jqXHR.getResponseHeader("Etag");
					if ( modified ) {
						jQuery.etag[ ifModifiedKey ] = modified;
					}
				}

				// If not modified
				if ( status === 304 ) {

					statusText = "notmodified";
					isSuccess = true;

				// If we have data
				} else {

					isSuccess = ajaxConvert( s, response );
					statusText = isSuccess.state;
					success = isSuccess.data;
					error = isSuccess.error;
					isSuccess = !error;
				}
			} else {
				// We extract error from statusText
				// then normalize statusText and status for non-aborts
				error = statusText;
				if ( !statusText || status ) {
					statusText = "error";
					if ( status < 0 ) {
						status = 0;
					}
				}
			}

			// Set data for the fake xhr object
			jqXHR.status = status;
			jqXHR.statusText = "" + ( nativeStatusText || statusText );

			// Success/Error
			if ( isSuccess ) {
				deferred.resolveWith( callbackContext, [ success, statusText, jqXHR ] );
			} else {
				deferred.rejectWith( callbackContext, [ jqXHR, statusText, error ] );
			}

			// Status-dependent callbacks
			jqXHR.statusCode( statusCode );
			statusCode = undefined;

			if ( fireGlobals ) {
				globalEventContext.trigger( "ajax" + ( isSuccess ? "Success" : "Error" ),
						[ jqXHR, s, isSuccess ? success : error ] );
			}

			// Complete
			completeDeferred.fireWith( callbackContext, [ jqXHR, statusText ] );

			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxComplete", [ jqXHR, s ] );
				// Handle the global AJAX counter
				if ( !( --jQuery.active ) ) {
					jQuery.event.trigger( "ajaxStop" );
				}
			}
		}

		// Attach deferreds
		deferred.promise( jqXHR );
		jqXHR.success = jqXHR.done;
		jqXHR.error = jqXHR.fail;
		jqXHR.complete = completeDeferred.add;

		// Status-dependent callbacks
		jqXHR.statusCode = function( map ) {
			if ( map ) {
				var tmp;
				if ( state < 2 ) {
					for ( tmp in map ) {
						statusCode[ tmp ] = [ statusCode[tmp], map[tmp] ];
					}
				} else {
					tmp = map[ jqXHR.status ];
					jqXHR.always( tmp );
				}
			}
			return this;
		};

		// Remove hash character (#7531: and string promotion)
		// Add protocol if not provided (#5866: IE7 issue with protocol-less urls)
		// We also use the url parameter if available
		s.url = ( ( url || s.url ) + "" ).replace( rhash, "" ).replace( rprotocol, ajaxLocParts[ 1 ] + "//" );

		// Extract dataTypes list
		s.dataTypes = jQuery.trim( s.dataType || "*" ).toLowerCase().split( core_rspace );

		// Determine if a cross-domain request is in order
		if ( s.crossDomain == null ) {
			parts = rurl.exec( s.url.toLowerCase() );
			s.crossDomain = !!( parts &&
				( parts[ 1 ] != ajaxLocParts[ 1 ] || parts[ 2 ] != ajaxLocParts[ 2 ] ||
					( parts[ 3 ] || ( parts[ 1 ] === "http:" ? 80 : 443 ) ) !=
						( ajaxLocParts[ 3 ] || ( ajaxLocParts[ 1 ] === "http:" ? 80 : 443 ) ) )
			);
		}

		// Convert data if not already a string
		if ( s.data && s.processData && typeof s.data !== "string" ) {
			s.data = jQuery.param( s.data, s.traditional );
		}

		// Apply prefilters
		inspectPrefiltersOrTransports( prefilters, s, options, jqXHR );

		// If request was aborted inside a prefilter, stop there
		if ( state === 2 ) {
			return jqXHR;
		}

		// We can fire global events as of now if asked to
		fireGlobals = s.global;

		// Uppercase the type
		s.type = s.type.toUpperCase();

		// Determine if request has content
		s.hasContent = !rnoContent.test( s.type );

		// Watch for a new set of requests
		if ( fireGlobals && jQuery.active++ === 0 ) {
			jQuery.event.trigger( "ajaxStart" );
		}

		// More options handling for requests with no content
		if ( !s.hasContent ) {

			// If data is available, append data to url
			if ( s.data ) {
				s.url += ( rquery.test( s.url ) ? "&" : "?" ) + s.data;
				// #9682: remove data so that it's not used in an eventual retry
				delete s.data;
			}

			// Get ifModifiedKey before adding the anti-cache parameter
			ifModifiedKey = s.url;

			// Add anti-cache in url if needed
			if ( s.cache === false ) {

				var ts = jQuery.now(),
					// try replacing _= if it is there
					ret = s.url.replace( rts, "$1_=" + ts );

				// if nothing was replaced, add timestamp to the end
				s.url = ret + ( ( ret === s.url ) ? ( rquery.test( s.url ) ? "&" : "?" ) + "_=" + ts : "" );
			}
		}

		// Set the correct header, if data is being sent
		if ( s.data && s.hasContent && s.contentType !== false || options.contentType ) {
			jqXHR.setRequestHeader( "Content-Type", s.contentType );
		}

		// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
		if ( s.ifModified ) {
			ifModifiedKey = ifModifiedKey || s.url;
			if ( jQuery.lastModified[ ifModifiedKey ] ) {
				jqXHR.setRequestHeader( "If-Modified-Since", jQuery.lastModified[ ifModifiedKey ] );
			}
			if ( jQuery.etag[ ifModifiedKey ] ) {
				jqXHR.setRequestHeader( "If-None-Match", jQuery.etag[ ifModifiedKey ] );
			}
		}

		// Set the Accepts header for the server, depending on the dataType
		jqXHR.setRequestHeader(
			"Accept",
			s.dataTypes[ 0 ] && s.accepts[ s.dataTypes[0] ] ?
				s.accepts[ s.dataTypes[0] ] + ( s.dataTypes[ 0 ] !== "*" ? ", " + allTypes + "; q=0.01" : "" ) :
				s.accepts[ "*" ]
		);

		// Check for headers option
		for ( i in s.headers ) {
			jqXHR.setRequestHeader( i, s.headers[ i ] );
		}

		// Allow custom headers/mimetypes and early abort
		if ( s.beforeSend && ( s.beforeSend.call( callbackContext, jqXHR, s ) === false || state === 2 ) ) {
				// Abort if not done already and return
				return jqXHR.abort();

		}

		// aborting is no longer a cancellation
		strAbort = "abort";

		// Install callbacks on deferreds
		for ( i in { success: 1, error: 1, complete: 1 } ) {
			jqXHR[ i ]( s[ i ] );
		}

		// Get transport
		transport = inspectPrefiltersOrTransports( transports, s, options, jqXHR );

		// If no transport, we auto-abort
		if ( !transport ) {
			done( -1, "No Transport" );
		} else {
			jqXHR.readyState = 1;
			// Send global event
			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxSend", [ jqXHR, s ] );
			}
			// Timeout
			if ( s.async && s.timeout > 0 ) {
				timeoutTimer = setTimeout( function(){
					jqXHR.abort( "timeout" );
				}, s.timeout );
			}

			try {
				state = 1;
				transport.send( requestHeaders, done );
			} catch (e) {
				// Propagate exception as error if not done
				if ( state < 2 ) {
					done( -1, e );
				// Simply rethrow otherwise
				} else {
					throw e;
				}
			}
		}

		return jqXHR;
	},

	// Counter for holding the number of active queries
	active: 0,

	// Last-Modified header cache for next request
	lastModified: {},
	etag: {}

});

/* Handles responses to an ajax request:
 * - sets all responseXXX fields accordingly
 * - finds the right dataType (mediates between content-type and expected dataType)
 * - returns the corresponding response
 */
function ajaxHandleResponses( s, jqXHR, responses ) {

	var ct, type, finalDataType, firstDataType,
		contents = s.contents,
		dataTypes = s.dataTypes,
		responseFields = s.responseFields;

	// Fill responseXXX fields
	for ( type in responseFields ) {
		if ( type in responses ) {
			jqXHR[ responseFields[type] ] = responses[ type ];
		}
	}

	// Remove auto dataType and get content-type in the process
	while( dataTypes[ 0 ] === "*" ) {
		dataTypes.shift();
		if ( ct === undefined ) {
			ct = s.mimeType || jqXHR.getResponseHeader( "content-type" );
		}
	}

	// Check if we're dealing with a known content-type
	if ( ct ) {
		for ( type in contents ) {
			if ( contents[ type ] && contents[ type ].test( ct ) ) {
				dataTypes.unshift( type );
				break;
			}
		}
	}

	// Check to see if we have a response for the expected dataType
	if ( dataTypes[ 0 ] in responses ) {
		finalDataType = dataTypes[ 0 ];
	} else {
		// Try convertible dataTypes
		for ( type in responses ) {
			if ( !dataTypes[ 0 ] || s.converters[ type + " " + dataTypes[0] ] ) {
				finalDataType = type;
				break;
			}
			if ( !firstDataType ) {
				firstDataType = type;
			}
		}
		// Or just use first one
		finalDataType = finalDataType || firstDataType;
	}

	// If we found a dataType
	// We add the dataType to the list if needed
	// and return the corresponding response
	if ( finalDataType ) {
		if ( finalDataType !== dataTypes[ 0 ] ) {
			dataTypes.unshift( finalDataType );
		}
		return responses[ finalDataType ];
	}
}

// Chain conversions given the request and the original response
function ajaxConvert( s, response ) {

	var conv, conv2, current, tmp,
		// Work with a copy of dataTypes in case we need to modify it for conversion
		dataTypes = s.dataTypes.slice(),
		prev = dataTypes[ 0 ],
		converters = {},
		i = 0;

	// Apply the dataFilter if provided
	if ( s.dataFilter ) {
		response = s.dataFilter( response, s.dataType );
	}

	// Create converters map with lowercased keys
	if ( dataTypes[ 1 ] ) {
		for ( conv in s.converters ) {
			converters[ conv.toLowerCase() ] = s.converters[ conv ];
		}
	}

	// Convert to each sequential dataType, tolerating list modification
	for ( ; (current = dataTypes[++i]); ) {

		// There's only work to do if current dataType is non-auto
		if ( current !== "*" ) {

			// Convert response if prev dataType is non-auto and differs from current
			if ( prev !== "*" && prev !== current ) {

				// Seek a direct converter
				conv = converters[ prev + " " + current ] || converters[ "* " + current ];

				// If none found, seek a pair
				if ( !conv ) {
					for ( conv2 in converters ) {

						// If conv2 outputs current
						tmp = conv2.split(" ");
						if ( tmp[ 1 ] === current ) {

							// If prev can be converted to accepted input
							conv = converters[ prev + " " + tmp[ 0 ] ] ||
								converters[ "* " + tmp[ 0 ] ];
							if ( conv ) {
								// Condense equivalence converters
								if ( conv === true ) {
									conv = converters[ conv2 ];

								// Otherwise, insert the intermediate dataType
								} else if ( converters[ conv2 ] !== true ) {
									current = tmp[ 0 ];
									dataTypes.splice( i--, 0, current );
								}

								break;
							}
						}
					}
				}

				// Apply converter (if not an equivalence)
				if ( conv !== true ) {

					// Unless errors are allowed to bubble, catch and return them
					if ( conv && s["throws"] ) {
						response = conv( response );
					} else {
						try {
							response = conv( response );
						} catch ( e ) {
							return { state: "parsererror", error: conv ? e : "No conversion from " + prev + " to " + current };
						}
					}
				}
			}

			// Update prev for next iteration
			prev = current;
		}
	}

	return { state: "success", data: response };
}
var oldCallbacks = [],
	rquestion = /\?/,
	rjsonp = /(=)\?(?=&|$)|\?\?/,
	nonce = jQuery.now();

// Default jsonp settings
jQuery.ajaxSetup({
	jsonp: "callback",
	jsonpCallback: function() {
		var callback = oldCallbacks.pop() || ( jQuery.expando + "_" + ( nonce++ ) );
		this[ callback ] = true;
		return callback;
	}
});

// Detect, normalize options and install callbacks for jsonp requests
jQuery.ajaxPrefilter( "json jsonp", function( s, originalSettings, jqXHR ) {

	var callbackName, overwritten, responseContainer,
		data = s.data,
		url = s.url,
		hasCallback = s.jsonp !== false,
		replaceInUrl = hasCallback && rjsonp.test( url ),
		replaceInData = hasCallback && !replaceInUrl && typeof data === "string" &&
			!( s.contentType || "" ).indexOf("application/x-www-form-urlencoded") &&
			rjsonp.test( data );

	// Handle iff the expected data type is "jsonp" or we have a parameter to set
	if ( s.dataTypes[ 0 ] === "jsonp" || replaceInUrl || replaceInData ) {

		// Get callback name, remembering preexisting value associated with it
		callbackName = s.jsonpCallback = jQuery.isFunction( s.jsonpCallback ) ?
			s.jsonpCallback() :
			s.jsonpCallback;
		overwritten = window[ callbackName ];

		// Insert callback into url or form data
		if ( replaceInUrl ) {
			s.url = url.replace( rjsonp, "$1" + callbackName );
		} else if ( replaceInData ) {
			s.data = data.replace( rjsonp, "$1" + callbackName );
		} else if ( hasCallback ) {
			s.url += ( rquestion.test( url ) ? "&" : "?" ) + s.jsonp + "=" + callbackName;
		}

		// Use data converter to retrieve json after script execution
		s.converters["script json"] = function() {
			if ( !responseContainer ) {
				jQuery.error( callbackName + " was not called" );
			}
			return responseContainer[ 0 ];
		};

		// force json dataType
		s.dataTypes[ 0 ] = "json";

		// Install callback
		window[ callbackName ] = function() {
			responseContainer = arguments;
		};

		// Clean-up function (fires after converters)
		jqXHR.always(function() {
			// Restore preexisting value
			window[ callbackName ] = overwritten;

			// Save back as free
			if ( s[ callbackName ] ) {
				// make sure that re-using the options doesn't screw things around
				s.jsonpCallback = originalSettings.jsonpCallback;

				// save the callback name for future use
				oldCallbacks.push( callbackName );
			}

			// Call if it was a function and we have a response
			if ( responseContainer && jQuery.isFunction( overwritten ) ) {
				overwritten( responseContainer[ 0 ] );
			}

			responseContainer = overwritten = undefined;
		});

		// Delegate to script
		return "script";
	}
});
// Install script dataType
jQuery.ajaxSetup({
	accepts: {
		script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
	},
	contents: {
		script: /javascript|ecmascript/
	},
	converters: {
		"text script": function( text ) {
			jQuery.globalEval( text );
			return text;
		}
	}
});

// Handle cache's special case and global
jQuery.ajaxPrefilter( "script", function( s ) {
	if ( s.cache === undefined ) {
		s.cache = false;
	}
	if ( s.crossDomain ) {
		s.type = "GET";
		s.global = false;
	}
});

// Bind script tag hack transport
jQuery.ajaxTransport( "script", function(s) {

	// This transport only deals with cross domain requests
	if ( s.crossDomain ) {

		var script,
			head = document.head || document.getElementsByTagName( "head" )[0] || document.documentElement;

		return {

			send: function( _, callback ) {

				script = document.createElement( "script" );

				script.async = "async";

				if ( s.scriptCharset ) {
					script.charset = s.scriptCharset;
				}

				script.src = s.url;

				// Attach handlers for all browsers
				script.onload = script.onreadystatechange = function( _, isAbort ) {

					if ( isAbort || !script.readyState || /loaded|complete/.test( script.readyState ) ) {

						// Handle memory leak in IE
						script.onload = script.onreadystatechange = null;

						// Remove the script
						if ( head && script.parentNode ) {
							head.removeChild( script );
						}

						// Dereference the script
						script = undefined;

						// Callback if not abort
						if ( !isAbort ) {
							callback( 200, "success" );
						}
					}
				};
				// Use insertBefore instead of appendChild  to circumvent an IE6 bug.
				// This arises when a base node is used (#2709 and #4378).
				head.insertBefore( script, head.firstChild );
			},

			abort: function() {
				if ( script ) {
					script.onload( 0, 1 );
				}
			}
		};
	}
});
var xhrCallbacks,
	// #5280: Internet Explorer will keep connections alive if we don't abort on unload
	xhrOnUnloadAbort = window.ActiveXObject ? function() {
		// Abort all pending requests
		for ( var key in xhrCallbacks ) {
			xhrCallbacks[ key ]( 0, 1 );
		}
	} : false,
	xhrId = 0;

// Functions to create xhrs
function createStandardXHR() {
	try {
		return new window.XMLHttpRequest();
	} catch( e ) {}
}

function createActiveXHR() {
	try {
		return new window.ActiveXObject( "Microsoft.XMLHTTP" );
	} catch( e ) {}
}

// Create the request object
// (This is still attached to ajaxSettings for backward compatibility)
jQuery.ajaxSettings.xhr = window.ActiveXObject ?
	/* Microsoft failed to properly
	 * implement the XMLHttpRequest in IE7 (can't request local files),
	 * so we use the ActiveXObject when it is available
	 * Additionally XMLHttpRequest can be disabled in IE7/IE8 so
	 * we need a fallback.
	 */
	function() {
		return !this.isLocal && createStandardXHR() || createActiveXHR();
	} :
	// For all other browsers, use the standard XMLHttpRequest object
	createStandardXHR;

// Determine support properties
(function( xhr ) {
	jQuery.extend( jQuery.support, {
		ajax: !!xhr,
		cors: !!xhr && ( "withCredentials" in xhr )
	});
})( jQuery.ajaxSettings.xhr() );

// Create transport if the browser can provide an xhr
if ( jQuery.support.ajax ) {

	jQuery.ajaxTransport(function( s ) {
		// Cross domain only allowed if supported through XMLHttpRequest
		if ( !s.crossDomain || jQuery.support.cors ) {

			var callback;

			return {
				send: function( headers, complete ) {

					// Get a new xhr
					var handle, i,
						xhr = s.xhr();

					// Open the socket
					// Passing null username, generates a login popup on Opera (#2865)
					if ( s.username ) {
						xhr.open( s.type, s.url, s.async, s.username, s.password );
					} else {
						xhr.open( s.type, s.url, s.async );
					}

					// Apply custom fields if provided
					if ( s.xhrFields ) {
						for ( i in s.xhrFields ) {
							xhr[ i ] = s.xhrFields[ i ];
						}
					}

					// Override mime type if needed
					if ( s.mimeType && xhr.overrideMimeType ) {
						xhr.overrideMimeType( s.mimeType );
					}

					// X-Requested-With header
					// For cross-domain requests, seeing as conditions for a preflight are
					// akin to a jigsaw puzzle, we simply never set it to be sure.
					// (it can always be set on a per-request basis or even using ajaxSetup)
					// For same-domain requests, won't change header if already provided.
					if ( !s.crossDomain && !headers["X-Requested-With"] ) {
						headers[ "X-Requested-With" ] = "XMLHttpRequest";
					}

					// Need an extra try/catch for cross domain requests in Firefox 3
					try {
						for ( i in headers ) {
							xhr.setRequestHeader( i, headers[ i ] );
						}
					} catch( _ ) {}

					// Do send the request
					// This may raise an exception which is actually
					// handled in jQuery.ajax (so no try/catch here)
					xhr.send( ( s.hasContent && s.data ) || null );

					// Listener
					callback = function( _, isAbort ) {

						var status,
							statusText,
							responseHeaders,
							responses,
							xml;

						// Firefox throws exceptions when accessing properties
						// of an xhr when a network error occurred
						// http://helpful.knobs-dials.com/index.php/Component_returned_failure_code:_0x80040111_(NS_ERROR_NOT_AVAILABLE)
						try {

							// Was never called and is aborted or complete
							if ( callback && ( isAbort || xhr.readyState === 4 ) ) {

								// Only called once
								callback = undefined;

								// Do not keep as active anymore
								if ( handle ) {
									xhr.onreadystatechange = jQuery.noop;
									if ( xhrOnUnloadAbort ) {
										delete xhrCallbacks[ handle ];
									}
								}

								// If it's an abort
								if ( isAbort ) {
									// Abort it manually if needed
									if ( xhr.readyState !== 4 ) {
										xhr.abort();
									}
								} else {
									status = xhr.status;
									responseHeaders = xhr.getAllResponseHeaders();
									responses = {};
									xml = xhr.responseXML;

									// Construct response list
									if ( xml && xml.documentElement /* #4958 */ ) {
										responses.xml = xml;
									}

									// When requesting binary data, IE6-9 will throw an exception
									// on any attempt to access responseText (#11426)
									try {
										responses.text = xhr.responseText;
									} catch( _ ) {
									}

									// Firefox throws an exception when accessing
									// statusText for faulty cross-domain requests
									try {
										statusText = xhr.statusText;
									} catch( e ) {
										// We normalize with Webkit giving an empty statusText
										statusText = "";
									}

									// Filter status for non standard behaviors

									// If the request is local and we have data: assume a success
									// (success with no data won't get notified, that's the best we
									// can do given current implementations)
									if ( !status && s.isLocal && !s.crossDomain ) {
										status = responses.text ? 200 : 404;
									// IE - #1450: sometimes returns 1223 when it should be 204
									} else if ( status === 1223 ) {
										status = 204;
									}
								}
							}
						} catch( firefoxAccessException ) {
							if ( !isAbort ) {
								complete( -1, firefoxAccessException );
							}
						}

						// Call complete if needed
						if ( responses ) {
							complete( status, statusText, responses, responseHeaders );
						}
					};

					if ( !s.async ) {
						// if we're in sync mode we fire the callback
						callback();
					} else if ( xhr.readyState === 4 ) {
						// (IE6 & IE7) if it's in cache and has been
						// retrieved directly we need to fire the callback
						setTimeout( callback, 0 );
					} else {
						handle = ++xhrId;
						if ( xhrOnUnloadAbort ) {
							// Create the active xhrs callbacks list if needed
							// and attach the unload handler
							if ( !xhrCallbacks ) {
								xhrCallbacks = {};
								jQuery( window ).unload( xhrOnUnloadAbort );
							}
							// Add to list of active xhrs callbacks
							xhrCallbacks[ handle ] = callback;
						}
						xhr.onreadystatechange = callback;
					}
				},

				abort: function() {
					if ( callback ) {
						callback(0,1);
					}
				}
			};
		}
	});
}
var fxNow, timerId,
	rfxtypes = /^(?:toggle|show|hide)$/,
	rfxnum = new RegExp( "^(?:([-+])=|)(" + core_pnum + ")([a-z%]*)$", "i" ),
	rrun = /queueHooks$/,
	animationPrefilters = [ defaultPrefilter ],
	tweeners = {
		"*": [function( prop, value ) {
			var end, unit, prevScale,
				tween = this.createTween( prop, value ),
				parts = rfxnum.exec( value ),
				target = tween.cur(),
				start = +target || 0,
				scale = 1;

			if ( parts ) {
				end = +parts[2];
				unit = parts[3] || ( jQuery.cssNumber[ prop ] ? "" : "px" );

				// We need to compute starting value
				if ( unit !== "px" && start ) {
					// Iteratively approximate from a nonzero starting point
					// Prefer the current property, because this process will be trivial if it uses the same units
					// Fallback to end or a simple constant
					start = jQuery.css( tween.elem, prop, true ) || end || 1;

					do {
						// If previous iteration zeroed out, double until we get *something*
						// Use a string for doubling factor so we don't accidentally see scale as unchanged below
						prevScale = scale = scale || ".5";

						// Adjust and apply
						start = start / scale;
						jQuery.style( tween.elem, prop, start + unit );

						// Update scale, tolerating zeroes from tween.cur()
						scale = tween.cur() / target;

					// Stop looping if we've hit the mark or scale is unchanged
					} while ( scale !== 1 && scale !== prevScale );
				}

				tween.unit = unit;
				tween.start = start;
				// If a +=/-= token was provided, we're doing a relative animation
				tween.end = parts[1] ? start + ( parts[1] + 1 ) * end : end;
			}
			return tween;
		}]
	};

// Animations created synchronously will run synchronously
function createFxNow() {
	setTimeout(function() {
		fxNow = undefined;
	}, 0 );
	return ( fxNow = jQuery.now() );
}

function createTweens( animation, props ) {
	jQuery.each( props, function( prop, value ) {
		var collection = ( tweeners[ prop ] || [] ).concat( tweeners[ "*" ] ),
			index = 0,
			length = collection.length;
		for ( ; index < length; index++ ) {
			if ( collection[ index ].call( animation, prop, value ) ) {

				// we're done with this property
				return;
			}
		}
	});
}

function Animation( elem, properties, options ) {
	var result,
		index = 0,
		tweenerIndex = 0,
		length = animationPrefilters.length,
		deferred = jQuery.Deferred().always( function() {
			// don't match elem in the :animated selector
			delete tick.elem;
		}),
		tick = function() {
			var currentTime = fxNow || createFxNow(),
				remaining = Math.max( 0, animation.startTime + animation.duration - currentTime ),
				percent = 1 - ( remaining / animation.duration || 0 ),
				index = 0,
				length = animation.tweens.length;

			for ( ; index < length ; index++ ) {
				animation.tweens[ index ].run( percent );
			}

			deferred.notifyWith( elem, [ animation, percent, remaining ]);

			if ( percent < 1 && length ) {
				return remaining;
			} else {
				deferred.resolveWith( elem, [ animation ] );
				return false;
			}
		},
		animation = deferred.promise({
			elem: elem,
			props: jQuery.extend( {}, properties ),
			opts: jQuery.extend( true, { specialEasing: {} }, options ),
			originalProperties: properties,
			originalOptions: options,
			startTime: fxNow || createFxNow(),
			duration: options.duration,
			tweens: [],
			createTween: function( prop, end, easing ) {
				var tween = jQuery.Tween( elem, animation.opts, prop, end,
						animation.opts.specialEasing[ prop ] || animation.opts.easing );
				animation.tweens.push( tween );
				return tween;
			},
			stop: function( gotoEnd ) {
				var index = 0,
					// if we are going to the end, we want to run all the tweens
					// otherwise we skip this part
					length = gotoEnd ? animation.tweens.length : 0;

				for ( ; index < length ; index++ ) {
					animation.tweens[ index ].run( 1 );
				}

				// resolve when we played the last frame
				// otherwise, reject
				if ( gotoEnd ) {
					deferred.resolveWith( elem, [ animation, gotoEnd ] );
				} else {
					deferred.rejectWith( elem, [ animation, gotoEnd ] );
				}
				return this;
			}
		}),
		props = animation.props;

	propFilter( props, animation.opts.specialEasing );

	for ( ; index < length ; index++ ) {
		result = animationPrefilters[ index ].call( animation, elem, props, animation.opts );
		if ( result ) {
			return result;
		}
	}

	createTweens( animation, props );

	if ( jQuery.isFunction( animation.opts.start ) ) {
		animation.opts.start.call( elem, animation );
	}

	jQuery.fx.timer(
		jQuery.extend( tick, {
			anim: animation,
			queue: animation.opts.queue,
			elem: elem
		})
	);

	// attach callbacks from options
	return animation.progress( animation.opts.progress )
		.done( animation.opts.done, animation.opts.complete )
		.fail( animation.opts.fail )
		.always( animation.opts.always );
}

function propFilter( props, specialEasing ) {
	var index, name, easing, value, hooks;

	// camelCase, specialEasing and expand cssHook pass
	for ( index in props ) {
		name = jQuery.camelCase( index );
		easing = specialEasing[ name ];
		value = props[ index ];
		if ( jQuery.isArray( value ) ) {
			easing = value[ 1 ];
			value = props[ index ] = value[ 0 ];
		}

		if ( index !== name ) {
			props[ name ] = value;
			delete props[ index ];
		}

		hooks = jQuery.cssHooks[ name ];
		if ( hooks && "expand" in hooks ) {
			value = hooks.expand( value );
			delete props[ name ];

			// not quite $.extend, this wont overwrite keys already present.
			// also - reusing 'index' from above because we have the correct "name"
			for ( index in value ) {
				if ( !( index in props ) ) {
					props[ index ] = value[ index ];
					specialEasing[ index ] = easing;
				}
			}
		} else {
			specialEasing[ name ] = easing;
		}
	}
}

jQuery.Animation = jQuery.extend( Animation, {

	tweener: function( props, callback ) {
		if ( jQuery.isFunction( props ) ) {
			callback = props;
			props = [ "*" ];
		} else {
			props = props.split(" ");
		}

		var prop,
			index = 0,
			length = props.length;

		for ( ; index < length ; index++ ) {
			prop = props[ index ];
			tweeners[ prop ] = tweeners[ prop ] || [];
			tweeners[ prop ].unshift( callback );
		}
	},

	prefilter: function( callback, prepend ) {
		if ( prepend ) {
			animationPrefilters.unshift( callback );
		} else {
			animationPrefilters.push( callback );
		}
	}
});

function defaultPrefilter( elem, props, opts ) {
	var index, prop, value, length, dataShow, tween, hooks, oldfire,
		anim = this,
		style = elem.style,
		orig = {},
		handled = [],
		hidden = elem.nodeType && isHidden( elem );

	// handle queue: false promises
	if ( !opts.queue ) {
		hooks = jQuery._queueHooks( elem, "fx" );
		if ( hooks.unqueued == null ) {
			hooks.unqueued = 0;
			oldfire = hooks.empty.fire;
			hooks.empty.fire = function() {
				if ( !hooks.unqueued ) {
					oldfire();
				}
			};
		}
		hooks.unqueued++;

		anim.always(function() {
			// doing this makes sure that the complete handler will be called
			// before this completes
			anim.always(function() {
				hooks.unqueued--;
				if ( !jQuery.queue( elem, "fx" ).length ) {
					hooks.empty.fire();
				}
			});
		});
	}

	// height/width overflow pass
	if ( elem.nodeType === 1 && ( "height" in props || "width" in props ) ) {
		// Make sure that nothing sneaks out
		// Record all 3 overflow attributes because IE does not
		// change the overflow attribute when overflowX and
		// overflowY are set to the same value
		opts.overflow = [ style.overflow, style.overflowX, style.overflowY ];

		// Set display property to inline-block for height/width
		// animations on inline elements that are having width/height animated
		if ( jQuery.css( elem, "display" ) === "inline" &&
				jQuery.css( elem, "float" ) === "none" ) {

			// inline-level elements accept inline-block;
			// block-level elements need to be inline with layout
			if ( !jQuery.support.inlineBlockNeedsLayout || css_defaultDisplay( elem.nodeName ) === "inline" ) {
				style.display = "inline-block";

			} else {
				style.zoom = 1;
			}
		}
	}

	if ( opts.overflow ) {
		style.overflow = "hidden";
		if ( !jQuery.support.shrinkWrapBlocks ) {
			anim.done(function() {
				style.overflow = opts.overflow[ 0 ];
				style.overflowX = opts.overflow[ 1 ];
				style.overflowY = opts.overflow[ 2 ];
			});
		}
	}


	// show/hide pass
	for ( index in props ) {
		value = props[ index ];
		if ( rfxtypes.exec( value ) ) {
			delete props[ index ];
			if ( value === ( hidden ? "hide" : "show" ) ) {
				continue;
			}
			handled.push( index );
		}
	}

	length = handled.length;
	if ( length ) {
		dataShow = jQuery._data( elem, "fxshow" ) || jQuery._data( elem, "fxshow", {} );
		if ( hidden ) {
			jQuery( elem ).show();
		} else {
			anim.done(function() {
				jQuery( elem ).hide();
			});
		}
		anim.done(function() {
			var prop;
			jQuery.removeData( elem, "fxshow", true );
			for ( prop in orig ) {
				jQuery.style( elem, prop, orig[ prop ] );
			}
		});
		for ( index = 0 ; index < length ; index++ ) {
			prop = handled[ index ];
			tween = anim.createTween( prop, hidden ? dataShow[ prop ] : 0 );
			orig[ prop ] = dataShow[ prop ] || jQuery.style( elem, prop );

			if ( !( prop in dataShow ) ) {
				dataShow[ prop ] = tween.start;
				if ( hidden ) {
					tween.end = tween.start;
					tween.start = prop === "width" || prop === "height" ? 1 : 0;
				}
			}
		}
	}
}

function Tween( elem, options, prop, end, easing ) {
	return new Tween.prototype.init( elem, options, prop, end, easing );
}
jQuery.Tween = Tween;

Tween.prototype = {
	constructor: Tween,
	init: function( elem, options, prop, end, easing, unit ) {
		this.elem = elem;
		this.prop = prop;
		this.easing = easing || "swing";
		this.options = options;
		this.start = this.now = this.cur();
		this.end = end;
		this.unit = unit || ( jQuery.cssNumber[ prop ] ? "" : "px" );
	},
	cur: function() {
		var hooks = Tween.propHooks[ this.prop ];

		return hooks && hooks.get ?
			hooks.get( this ) :
			Tween.propHooks._default.get( this );
	},
	run: function( percent ) {
		var eased,
			hooks = Tween.propHooks[ this.prop ];

		this.pos = eased = jQuery.easing[ this.easing ]( percent, this.options.duration * percent, 0, 1, this.options.duration );
		this.now = ( this.end - this.start ) * eased + this.start;

		if ( this.options.step ) {
			this.options.step.call( this.elem, this.now, this );
		}

		if ( hooks && hooks.set ) {
			hooks.set( this );
		} else {
			Tween.propHooks._default.set( this );
		}
		return this;
	}
};

Tween.prototype.init.prototype = Tween.prototype;

Tween.propHooks = {
	_default: {
		get: function( tween ) {
			var result;

			if ( tween.elem[ tween.prop ] != null &&
				(!tween.elem.style || tween.elem.style[ tween.prop ] == null) ) {
				return tween.elem[ tween.prop ];
			}

			// passing any value as a 4th parameter to .css will automatically
			// attempt a parseFloat and fallback to a string if the parse fails
			// so, simple values such as "10px" are parsed to Float.
			// complex values such as "rotate(1rad)" are returned as is.
			result = jQuery.css( tween.elem, tween.prop, false, "" );
			// Empty strings, null, undefined and "auto" are converted to 0.
			return !result || result === "auto" ? 0 : result;
		},
		set: function( tween ) {
			// use step hook for back compat - use cssHook if its there - use .style if its
			// available and use plain properties where available
			if ( jQuery.fx.step[ tween.prop ] ) {
				jQuery.fx.step[ tween.prop ]( tween );
			} else if ( tween.elem.style && ( tween.elem.style[ jQuery.cssProps[ tween.prop ] ] != null || jQuery.cssHooks[ tween.prop ] ) ) {
				jQuery.style( tween.elem, tween.prop, tween.now + tween.unit );
			} else {
				tween.elem[ tween.prop ] = tween.now;
			}
		}
	}
};

// Remove in 2.0 - this supports IE8's panic based approach
// to setting things on disconnected nodes

Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
	set: function( tween ) {
		if ( tween.elem.nodeType && tween.elem.parentNode ) {
			tween.elem[ tween.prop ] = tween.now;
		}
	}
};

jQuery.each([ "toggle", "show", "hide" ], function( i, name ) {
	var cssFn = jQuery.fn[ name ];
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return speed == null || typeof speed === "boolean" ||
			// special check for .toggle( handler, handler, ... )
			( !i && jQuery.isFunction( speed ) && jQuery.isFunction( easing ) ) ?
			cssFn.apply( this, arguments ) :
			this.animate( genFx( name, true ), speed, easing, callback );
	};
});

jQuery.fn.extend({
	fadeTo: function( speed, to, easing, callback ) {

		// show any hidden elements after setting opacity to 0
		return this.filter( isHidden ).css( "opacity", 0 ).show()

			// animate to the value specified
			.end().animate({ opacity: to }, speed, easing, callback );
	},
	animate: function( prop, speed, easing, callback ) {
		var empty = jQuery.isEmptyObject( prop ),
			optall = jQuery.speed( speed, easing, callback ),
			doAnimation = function() {
				// Operate on a copy of prop so per-property easing won't be lost
				var anim = Animation( this, jQuery.extend( {}, prop ), optall );

				// Empty animations resolve immediately
				if ( empty ) {
					anim.stop( true );
				}
			};

		return empty || optall.queue === false ?
			this.each( doAnimation ) :
			this.queue( optall.queue, doAnimation );
	},
	stop: function( type, clearQueue, gotoEnd ) {
		var stopQueue = function( hooks ) {
			var stop = hooks.stop;
			delete hooks.stop;
			stop( gotoEnd );
		};

		if ( typeof type !== "string" ) {
			gotoEnd = clearQueue;
			clearQueue = type;
			type = undefined;
		}
		if ( clearQueue && type !== false ) {
			this.queue( type || "fx", [] );
		}

		return this.each(function() {
			var dequeue = true,
				index = type != null && type + "queueHooks",
				timers = jQuery.timers,
				data = jQuery._data( this );

			if ( index ) {
				if ( data[ index ] && data[ index ].stop ) {
					stopQueue( data[ index ] );
				}
			} else {
				for ( index in data ) {
					if ( data[ index ] && data[ index ].stop && rrun.test( index ) ) {
						stopQueue( data[ index ] );
					}
				}
			}

			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this && (type == null || timers[ index ].queue === type) ) {
					timers[ index ].anim.stop( gotoEnd );
					dequeue = false;
					timers.splice( index, 1 );
				}
			}

			// start the next in the queue if the last step wasn't forced
			// timers currently will call their complete callbacks, which will dequeue
			// but only if they were gotoEnd
			if ( dequeue || !gotoEnd ) {
				jQuery.dequeue( this, type );
			}
		});
	}
});

// Generate parameters to create a standard animation
function genFx( type, includeWidth ) {
	var which,
		attrs = { height: type },
		i = 0;

	// if we include width, step value is 1 to do all cssExpand values,
	// if we don't include width, step value is 2 to skip over Left and Right
	for( ; i < 4 ; i += 2 - includeWidth ) {
		which = cssExpand[ i ];
		attrs[ "margin" + which ] = attrs[ "padding" + which ] = type;
	}

	if ( includeWidth ) {
		attrs.opacity = attrs.width = type;
	}

	return attrs;
}

// Generate shortcuts for custom animations
jQuery.each({
	slideDown: genFx("show"),
	slideUp: genFx("hide"),
	slideToggle: genFx("toggle"),
	fadeIn: { opacity: "show" },
	fadeOut: { opacity: "hide" },
	fadeToggle: { opacity: "toggle" }
}, function( name, props ) {
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return this.animate( props, speed, easing, callback );
	};
});

jQuery.speed = function( speed, easing, fn ) {
	var opt = speed && typeof speed === "object" ? jQuery.extend( {}, speed ) : {
		complete: fn || !fn && easing ||
			jQuery.isFunction( speed ) && speed,
		duration: speed,
		easing: fn && easing || easing && !jQuery.isFunction( easing ) && easing
	};

	opt.duration = jQuery.fx.off ? 0 : typeof opt.duration === "number" ? opt.duration :
		opt.duration in jQuery.fx.speeds ? jQuery.fx.speeds[ opt.duration ] : jQuery.fx.speeds._default;

	// normalize opt.queue - true/undefined/null -> "fx"
	if ( opt.queue == null || opt.queue === true ) {
		opt.queue = "fx";
	}

	// Queueing
	opt.old = opt.complete;

	opt.complete = function() {
		if ( jQuery.isFunction( opt.old ) ) {
			opt.old.call( this );
		}

		if ( opt.queue ) {
			jQuery.dequeue( this, opt.queue );
		}
	};

	return opt;
};

jQuery.easing = {
	linear: function( p ) {
		return p;
	},
	swing: function( p ) {
		return 0.5 - Math.cos( p*Math.PI ) / 2;
	}
};

jQuery.timers = [];
jQuery.fx = Tween.prototype.init;
jQuery.fx.tick = function() {
	var timer,
		timers = jQuery.timers,
		i = 0;

	for ( ; i < timers.length; i++ ) {
		timer = timers[ i ];
		// Checks the timer has not already been removed
		if ( !timer() && timers[ i ] === timer ) {
			timers.splice( i--, 1 );
		}
	}

	if ( !timers.length ) {
		jQuery.fx.stop();
	}
};

jQuery.fx.timer = function( timer ) {
	if ( timer() && jQuery.timers.push( timer ) && !timerId ) {
		timerId = setInterval( jQuery.fx.tick, jQuery.fx.interval );
	}
};

jQuery.fx.interval = 13;

jQuery.fx.stop = function() {
	clearInterval( timerId );
	timerId = null;
};

jQuery.fx.speeds = {
	slow: 600,
	fast: 200,
	// Default speed
	_default: 400
};

// Back Compat <1.8 extension point
jQuery.fx.step = {};

if ( jQuery.expr && jQuery.expr.filters ) {
	jQuery.expr.filters.animated = function( elem ) {
		return jQuery.grep(jQuery.timers, function( fn ) {
			return elem === fn.elem;
		}).length;
	};
}
var rroot = /^(?:body|html)$/i;

jQuery.fn.offset = function( options ) {
	if ( arguments.length ) {
		return options === undefined ?
			this :
			this.each(function( i ) {
				jQuery.offset.setOffset( this, options, i );
			});
	}

	var box, docElem, body, win, clientTop, clientLeft, scrollTop, scrollLeft, top, left,
		elem = this[ 0 ],
		doc = elem && elem.ownerDocument;

	if ( !doc ) {
		return;
	}

	if ( (body = doc.body) === elem ) {
		return jQuery.offset.bodyOffset( elem );
	}

	docElem = doc.documentElement;

	// Make sure we're not dealing with a disconnected DOM node
	if ( !jQuery.contains( docElem, elem ) ) {
		return { top: 0, left: 0 };
	}

	box = elem.getBoundingClientRect();
	win = getWindow( doc );
	clientTop  = docElem.clientTop  || body.clientTop  || 0;
	clientLeft = docElem.clientLeft || body.clientLeft || 0;
	scrollTop  = win.pageYOffset || docElem.scrollTop;
	scrollLeft = win.pageXOffset || docElem.scrollLeft;
	top  = box.top  + scrollTop  - clientTop;
	left = box.left + scrollLeft - clientLeft;

	return { top: top, left: left };
};

jQuery.offset = {

	bodyOffset: function( body ) {
		var top = body.offsetTop,
			left = body.offsetLeft;

		if ( jQuery.support.doesNotIncludeMarginInBodyOffset ) {
			top  += parseFloat( jQuery.css(body, "marginTop") ) || 0;
			left += parseFloat( jQuery.css(body, "marginLeft") ) || 0;
		}

		return { top: top, left: left };
	},

	setOffset: function( elem, options, i ) {
		var position = jQuery.css( elem, "position" );

		// set position first, in-case top/left are set even on static elem
		if ( position === "static" ) {
			elem.style.position = "relative";
		}

		var curElem = jQuery( elem ),
			curOffset = curElem.offset(),
			curCSSTop = jQuery.css( elem, "top" ),
			curCSSLeft = jQuery.css( elem, "left" ),
			calculatePosition = ( position === "absolute" || position === "fixed" ) && jQuery.inArray("auto", [curCSSTop, curCSSLeft]) > -1,
			props = {}, curPosition = {}, curTop, curLeft;

		// need to be able to calculate position if either top or left is auto and position is either absolute or fixed
		if ( calculatePosition ) {
			curPosition = curElem.position();
			curTop = curPosition.top;
			curLeft = curPosition.left;
		} else {
			curTop = parseFloat( curCSSTop ) || 0;
			curLeft = parseFloat( curCSSLeft ) || 0;
		}

		if ( jQuery.isFunction( options ) ) {
			options = options.call( elem, i, curOffset );
		}

		if ( options.top != null ) {
			props.top = ( options.top - curOffset.top ) + curTop;
		}
		if ( options.left != null ) {
			props.left = ( options.left - curOffset.left ) + curLeft;
		}

		if ( "using" in options ) {
			options.using.call( elem, props );
		} else {
			curElem.css( props );
		}
	}
};


jQuery.fn.extend({

	position: function() {
		if ( !this[0] ) {
			return;
		}

		var elem = this[0],

		// Get *real* offsetParent
		offsetParent = this.offsetParent(),

		// Get correct offsets
		offset       = this.offset(),
		parentOffset = rroot.test(offsetParent[0].nodeName) ? { top: 0, left: 0 } : offsetParent.offset();

		// Subtract element margins
		// note: when an element has margin: auto the offsetLeft and marginLeft
		// are the same in Safari causing offset.left to incorrectly be 0
		offset.top  -= parseFloat( jQuery.css(elem, "marginTop") ) || 0;
		offset.left -= parseFloat( jQuery.css(elem, "marginLeft") ) || 0;

		// Add offsetParent borders
		parentOffset.top  += parseFloat( jQuery.css(offsetParent[0], "borderTopWidth") ) || 0;
		parentOffset.left += parseFloat( jQuery.css(offsetParent[0], "borderLeftWidth") ) || 0;

		// Subtract the two offsets
		return {
			top:  offset.top  - parentOffset.top,
			left: offset.left - parentOffset.left
		};
	},

	offsetParent: function() {
		return this.map(function() {
			var offsetParent = this.offsetParent || document.body;
			while ( offsetParent && (!rroot.test(offsetParent.nodeName) && jQuery.css(offsetParent, "position") === "static") ) {
				offsetParent = offsetParent.offsetParent;
			}
			return offsetParent || document.body;
		});
	}
});


// Create scrollLeft and scrollTop methods
jQuery.each( {scrollLeft: "pageXOffset", scrollTop: "pageYOffset"}, function( method, prop ) {
	var top = /Y/.test( prop );

	jQuery.fn[ method ] = function( val ) {
		return jQuery.access( this, function( elem, method, val ) {
			var win = getWindow( elem );

			if ( val === undefined ) {
				return win ? (prop in win) ? win[ prop ] :
					win.document.documentElement[ method ] :
					elem[ method ];
			}

			if ( win ) {
				win.scrollTo(
					!top ? val : jQuery( win ).scrollLeft(),
					 top ? val : jQuery( win ).scrollTop()
				);

			} else {
				elem[ method ] = val;
			}
		}, method, val, arguments.length, null );
	};
});

function getWindow( elem ) {
	return jQuery.isWindow( elem ) ?
		elem :
		elem.nodeType === 9 ?
			elem.defaultView || elem.parentWindow :
			false;
}
// Create innerHeight, innerWidth, height, width, outerHeight and outerWidth methods
jQuery.each( { Height: "height", Width: "width" }, function( name, type ) {
	jQuery.each( { padding: "inner" + name, content: type, "": "outer" + name }, function( defaultExtra, funcName ) {
		// margin is only for outerHeight, outerWidth
		jQuery.fn[ funcName ] = function( margin, value ) {
			var chainable = arguments.length && ( defaultExtra || typeof margin !== "boolean" ),
				extra = defaultExtra || ( margin === true || value === true ? "margin" : "border" );

			return jQuery.access( this, function( elem, type, value ) {
				var doc;

				if ( jQuery.isWindow( elem ) ) {
					// As of 5/8/2012 this will yield incorrect results for Mobile Safari, but there
					// isn't a whole lot we can do. See pull request at this URL for discussion:
					// https://github.com/jquery/jquery/pull/764
					return elem.document.documentElement[ "client" + name ];
				}

				// Get document width or height
				if ( elem.nodeType === 9 ) {
					doc = elem.documentElement;

					// Either scroll[Width/Height] or offset[Width/Height] or client[Width/Height], whichever is greatest
					// unfortunately, this causes bug #3838 in IE6/8 only, but there is currently no good, small way to fix it.
					return Math.max(
						elem.body[ "scroll" + name ], doc[ "scroll" + name ],
						elem.body[ "offset" + name ], doc[ "offset" + name ],
						doc[ "client" + name ]
					);
				}

				return value === undefined ?
					// Get width or height on the element, requesting but not forcing parseFloat
					jQuery.css( elem, type, value, extra ) :

					// Set width or height on the element
					jQuery.style( elem, type, value, extra );
			}, type, chainable ? margin : undefined, chainable );
		};
	});
});
// Expose jQuery to the global object
window.jQuery = window.$ = jQuery;

// Expose jQuery as an AMD module, but only for AMD loaders that
// understand the issues with loading multiple versions of jQuery
// in a page that all might call define(). The loader will indicate
// they have special allowances for multiple jQuery versions by
// specifying define.amd.jQuery = true. Register as a named module,
// since jQuery can be concatenated with other files that may use define,
// but not use a proper concatenation script that understands anonymous
// AMD modules. A named AMD is safest and most robust way to register.
// Lowercase jquery is used because AMD module names are derived from
// file names, and jQuery is normally delivered in a lowercase file name.
// Do this after creating the global so that if an AMD module wants to call
// noConflict to hide this version of jQuery, it will work.
if ( typeof define === "function" && define.amd && define.amd.jQuery ) {
	define( "jquery", [], function () { return jQuery; } );
}

})( window );
;/*
 * jQuery UI 1.7.2
 *
 * Copyright (c) 2009 AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT (MIT-LICENSE.txt)
 * and GPL (GPL-LICENSE.txt) licenses.
 *
 * http://docs.jquery.com/UI
 */
;jQuery.ui || (function($) {

var _remove = $.fn.remove,
	isFF2 = $.browser.mozilla && (parseFloat($.browser.version) < 1.9);

//Helper functions and ui object
$.ui = {
	version: "1.7.2",

	// $.ui.plugin is deprecated.  Use the proxy pattern instead.
	plugin: {
		add: function(module, option, set) {
			var proto = $.ui[module].prototype;
			for(var i in set) {
				proto.plugins[i] = proto.plugins[i] || [];
				proto.plugins[i].push([option, set[i]]);
			}
		},
		call: function(instance, name, args) {
			var set = instance.plugins[name];
			if(!set || !instance.element[0].parentNode) { return; }

			for (var i = 0; i < set.length; i++) {
				if (instance.options[set[i][0]]) {
					set[i][1].apply(instance.element, args);
				}
			}
		}
	},

	contains: function(a, b) {
		return document.compareDocumentPosition
			? a.compareDocumentPosition(b) & 16
			: a !== b && a.contains(b);
	},

	hasScroll: function(el, a) {

		//If overflow is hidden, the element might have extra content, but the user wants to hide it
		if ($(el).css('overflow') == 'hidden') { return false; }

		var scroll = (a && a == 'left') ? 'scrollLeft' : 'scrollTop',
			has = false;

		if (el[scroll] > 0) { return true; }

		// TODO: determine which cases actually cause this to happen
		// if the element doesn't have the scroll set, see if it's possible to
		// set the scroll
		el[scroll] = 1;
		has = (el[scroll] > 0);
		el[scroll] = 0;
		return has;
	},

	isOverAxis: function(x, reference, size) {
		//Determines when x coordinate is over "b" element axis
		return (x > reference) && (x < (reference + size));
	},

	isOver: function(y, x, top, left, height, width) {
		//Determines when x, y coordinates is over "b" element
		return $.ui.isOverAxis(y, top, height) && $.ui.isOverAxis(x, left, width);
	},

	keyCode: {
		BACKSPACE: 8,
		CAPS_LOCK: 20,
		COMMA: 188,
		CONTROL: 17,
		DELETE: 46,
		DOWN: 40,
		END: 35,
		ENTER: 13,
		ESCAPE: 27,
		HOME: 36,
		INSERT: 45,
		LEFT: 37,
		NUMPAD_ADD: 107,
		NUMPAD_DECIMAL: 110,
		NUMPAD_DIVIDE: 111,
		NUMPAD_ENTER: 108,
		NUMPAD_MULTIPLY: 106,
		NUMPAD_SUBTRACT: 109,
		PAGE_DOWN: 34,
		PAGE_UP: 33,
		PERIOD: 190,
		RIGHT: 39,
		SHIFT: 16,
		SPACE: 32,
		TAB: 9,
		UP: 38
	}
};

// WAI-ARIA normalization
if (isFF2) {
	var attr = $.attr,
		removeAttr = $.fn.removeAttr,
		ariaNS = "http://www.w3.org/2005/07/aaa",
		ariaState = /^aria-/,
		ariaRole = /^wairole:/;

	$.attr = function(elem, name, value) {
		var set = value !== undefined;

		return (name == 'role'
			? (set
				? attr.call(this, elem, name, "wairole:" + value)
				: (attr.apply(this, arguments) || "").replace(ariaRole, ""))
			: (ariaState.test(name)
				? (set
					? elem.setAttributeNS(ariaNS,
						name.replace(ariaState, "aaa:"), value)
					: attr.call(this, elem, name.replace(ariaState, "aaa:")))
				: attr.apply(this, arguments)));
	};

	$.fn.removeAttr = function(name) {
		return (ariaState.test(name)
			? this.each(function() {
				this.removeAttributeNS(ariaNS, name.replace(ariaState, ""));
			}) : removeAttr.call(this, name));
	};
}

//jQuery plugins
$.fn.extend({
	remove: function() {
		// Safari has a native remove event which actually removes DOM elements,
		// so we have to use triggerHandler instead of trigger (#3037).
		$("*", this).add(this).each(function() {
			$(this).triggerHandler("remove");
		});
		return _remove.apply(this, arguments );
	},

	enableSelection: function() {
		return this
			.attr('unselectable', 'off')
			.css('MozUserSelect', '')
			.unbind('selectstart.ui');
	},

	disableSelection: function() {
		return this
			.attr('unselectable', 'on')
			.css('MozUserSelect', 'none')
			.bind('selectstart.ui', function() { return false; });
	},

	scrollParent: function() {
		var scrollParent;
		if(($.browser.msie && (/(static|relative)/).test(this.css('position'))) || (/absolute/).test(this.css('position'))) {
			scrollParent = this.parents().filter(function() {
				return (/(relative|absolute|fixed)/).test($.curCSS(this,'position',1)) && (/(auto|scroll)/).test($.curCSS(this,'overflow',1)+$.curCSS(this,'overflow-y',1)+$.curCSS(this,'overflow-x',1));
			}).eq(0);
		} else {
			scrollParent = this.parents().filter(function() {
				return (/(auto|scroll)/).test($.curCSS(this,'overflow',1)+$.curCSS(this,'overflow-y',1)+$.curCSS(this,'overflow-x',1));
			}).eq(0);
		}

		return (/fixed/).test(this.css('position')) || !scrollParent.length ? $(document) : scrollParent;
	}
});


//Additional selectors
$.extend($.expr[':'], {
	data: function(elem, i, match) {
		//@void
		if(match){
			return !!$.data(elem, match[3]);
		}
	},

	focusable: function(element) {
		var nodeName = element.nodeName.toLowerCase(),
			tabIndex = $.attr(element, 'tabindex');
		return (/input|select|textarea|button|object/.test(nodeName)
			? !element.disabled
			: 'a' == nodeName || 'area' == nodeName
				? element.href || !isNaN(tabIndex)
				: !isNaN(tabIndex))
			// the element and all of its ancestors must be visible
			// the browser may report that the area is hidden
			&& !$(element)['area' == nodeName ? 'parents' : 'closest'](':hidden').length;
	},

	tabbable: function(element) {
		var tabIndex = $.attr(element, 'tabindex');
		return (isNaN(tabIndex) || tabIndex >= 0) && $(element).is(':focusable');
	}
});


// $.widget is a factory to create jQuery plugins
// taking some boilerplate code out of the plugin code
function getter(namespace, plugin, method, args) {
	function getMethods(type) {
		var methods = $[namespace][plugin][type] || [];
		return (typeof methods == 'string' ? methods.split(/,?\s+/) : methods);
	}

	var methods = getMethods('getter');
	if (args.length == 1 && typeof args[0] == 'string') {
		methods = methods.concat(getMethods('getterSetter'));
	}
	return ($.inArray(method, methods) != -1);
}

$.widget = function(name, prototype) {
	var namespace = name.split(".")[0];
	name = name.split(".")[1];

	// create plugin method
	$.fn[name] = function(options) {
		var isMethodCall = (typeof options == 'string'),
			args = Array.prototype.slice.call(arguments, 1);

		// prevent calls to internal methods
		if (isMethodCall && options.substring(0, 1) == '_') {
			return this;
		}

		// handle getter methods
		if (isMethodCall && getter(namespace, name, options, args)) {
			var instance = $.data(this[0], name);
			return (instance ? instance[options].apply(instance, args)
				: undefined);
		}

		// handle initialization and non-getter methods
		return this.each(function() {
			var instance = $.data(this, name);

			// constructor
			(!instance && !isMethodCall &&
				$.data(this, name, new $[namespace][name](this, options))._init());

			// method call
			(instance && isMethodCall && $.isFunction(instance[options]) &&
				instance[options].apply(instance, args));
		});
	};

	// create widget constructor
	$[namespace] = $[namespace] || {};
	$[namespace][name] = function(element, options) {
		var self = this;

		this.namespace = namespace;
		this.widgetName = name;
		this.widgetEventPrefix = $[namespace][name].eventPrefix || name;
		this.widgetBaseClass = namespace + '-' + name;

		this.options = $.extend({},
			$.widget.defaults,
			$[namespace][name].defaults,
			$.metadata && $.metadata.get(element)[name],
			options);

		this.element = $(element)
			.bind('setData.' + name, function(event, key, value) {
				if (event.target == element) {
					return self._setData(key, value);
				}
			})
			.bind('getData.' + name, function(event, key) {
				if (event.target == element) {
					return self._getData(key);
				}
			})
			.bind('remove', function() {
				return self.destroy();
			});
	};

	// add widget prototype
	$[namespace][name].prototype = $.extend({}, $.widget.prototype, prototype);

	// TODO: merge getter and getterSetter properties from widget prototype
	// and plugin prototype
	$[namespace][name].getterSetter = 'option';
};

$.widget.prototype = {
	_init: function() {},
	destroy: function() {
		this.element.removeData(this.widgetName)
			.removeClass(this.widgetBaseClass + '-disabled' + ' ' + this.namespace + '-state-disabled')
			.removeAttr('aria-disabled');
	},

	option: function(key, value) {
		var options = key,
			self = this;

		if (typeof key == "string") {
			if (value === undefined) {
				return this._getData(key);
			}
			options = {};
			options[key] = value;
		}

		$.each(options, function(key, value) {
			self._setData(key, value);
		});
	},
	_getData: function(key) {
		return this.options[key];
	},
	_setData: function(key, value) {
		this.options[key] = value;

		if (key == 'disabled') {
			this.element
				[value ? 'addClass' : 'removeClass'](
					this.widgetBaseClass + '-disabled' + ' ' +
					this.namespace + '-state-disabled')
				.attr("aria-disabled", value);
		}
	},

	enable: function() {
		this._setData('disabled', false);
	},
	disable: function() {
		this._setData('disabled', true);
	},

	_trigger: function(type, event, data) {
		var callback = this.options[type],
			eventName = (type == this.widgetEventPrefix
				? type : this.widgetEventPrefix + type);

		event = $.Event(event);
		event.type = eventName;

		// copy original event properties over to the new event
		// this would happen if we could call $.event.fix instead of $.Event
		// but we don't have a way to force an event to be fixed multiple times
		if (event.originalEvent) {
			for (var i = $.event.props.length, prop; i;) {
				prop = $.event.props[--i];
				event[prop] = event.originalEvent[prop];
			}
		}

		this.element.trigger(event, data);

		return !($.isFunction(callback) && callback.call(this.element[0], event, data) === false
			|| event.isDefaultPrevented());
	}
};

$.widget.defaults = {
	disabled: false
};


/** Mouse Interaction Plugin **/

$.ui.mouse = {
	_mouseInit: function() {
		var self = this;

		this.element
			.bind('mousedown.'+this.widgetName, function(event) {
				return self._mouseDown(event);
			})
			.bind('click.'+this.widgetName, function(event) {
				if(self._preventClickEvent) {
					self._preventClickEvent = false;
					event.stopImmediatePropagation();
					return false;
				}
			});

		// Prevent text selection in IE
		if ($.browser.msie) {
			this._mouseUnselectable = this.element.attr('unselectable');
			this.element.attr('unselectable', 'on');
		}

		this.started = false;
	},

	// TODO: make sure destroying one instance of mouse doesn't mess with
	// other instances of mouse
	_mouseDestroy: function() {
		this.element.unbind('.'+this.widgetName);

		// Restore text selection in IE
		($.browser.msie
			&& this.element.attr('unselectable', this._mouseUnselectable));
	},

	_mouseDown: function(event) {
		// don't let more than one widget handle mouseStart
		// TODO: figure out why we have to use originalEvent
		event.originalEvent = event.originalEvent || {};
		if (event.originalEvent.mouseHandled) { return; }

		// we may have missed mouseup (out of window)
		(this._mouseStarted && this._mouseUp(event));

		this._mouseDownEvent = event;

		var self = this,
			btnIsLeft = (event.which == 1),
			elIsCancel = (typeof this.options.cancel == "string" ? $(event.target).parents().add(event.target).filter(this.options.cancel).length : false);
		if (!btnIsLeft || elIsCancel || !this._mouseCapture(event)) {
			return true;
		}

		this.mouseDelayMet = !this.options.delay;
		if (!this.mouseDelayMet) {
			this._mouseDelayTimer = setTimeout(function() {
				self.mouseDelayMet = true;
			}, this.options.delay);
		}

		if (this._mouseDistanceMet(event) && this._mouseDelayMet(event)) {
			this._mouseStarted = (this._mouseStart(event) !== false);
			if (!this._mouseStarted) {
				event.preventDefault();
				return true;
			}
		}

		// these delegates are required to keep context
		this._mouseMoveDelegate = function(event) {
			return self._mouseMove(event);
		};
		this._mouseUpDelegate = function(event) {
			return self._mouseUp(event);
		};
		$(document)
			.bind('mousemove.'+this.widgetName, this._mouseMoveDelegate)
			.bind('mouseup.'+this.widgetName, this._mouseUpDelegate);

		// preventDefault() is used to prevent the selection of text here -
		// however, in Safari, this causes select boxes not to be selectable
		// anymore, so this fix is needed
		($.browser.safari || event.preventDefault());

		event.originalEvent.mouseHandled = true;
		return true;
	},

	_mouseMove: function(event) {
		// IE mouseup check - mouseup happened when mouse was out of window
		if ($.browser.msie && !event.button) {
			return this._mouseUp(event);
		}

		if (this._mouseStarted) {
			this._mouseDrag(event);
			return event.preventDefault();
		}

		if (this._mouseDistanceMet(event) && this._mouseDelayMet(event)) {
			this._mouseStarted =
				(this._mouseStart(this._mouseDownEvent, event) !== false);
			(this._mouseStarted ? this._mouseDrag(event) : this._mouseUp(event));
		}

		return !this._mouseStarted;
	},

	_mouseUp: function(event) {
		$(document)
			.unbind('mousemove.'+this.widgetName, this._mouseMoveDelegate)
			.unbind('mouseup.'+this.widgetName, this._mouseUpDelegate);

		if (this._mouseStarted) {
			this._mouseStarted = false;
			this._preventClickEvent = (event.target == this._mouseDownEvent.target);
			this._mouseStop(event);
		}

		return false;
	},

	_mouseDistanceMet: function(event) {
		return (Math.max(
				Math.abs(this._mouseDownEvent.pageX - event.pageX),
				Math.abs(this._mouseDownEvent.pageY - event.pageY)
			) >= this.options.distance
		);
	},

	_mouseDelayMet: function(event) {
		return this.mouseDelayMet;
	},

	// These are placeholder methods, to be overriden by extending plugin
	_mouseStart: function(event) {},
	_mouseDrag: function(event) {},
	_mouseStop: function(event) {},
	_mouseCapture: function(event) { return true; }
};

$.ui.mouse.defaults = {
	cancel: null,
	distance: 1,
	delay: 0
};

})(jQuery);
/*
 * jQuery UI Draggable 1.7.2
 *
 * Copyright (c) 2009 AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT (MIT-LICENSE.txt)
 * and GPL (GPL-LICENSE.txt) licenses.
 *
 * http://docs.jquery.com/UI/Draggables
 *
 * Depends:
 *	ui.core.js
 */
(function($) {

$.widget("ui.draggable", $.extend({}, $.ui.mouse, {

	_init: function() {

		if (this.options.helper == 'original' && !(/^(?:r|a|f)/).test(this.element.css("position")))
			this.element[0].style.position = 'relative';

		(this.options.addClasses && this.element.addClass("ui-draggable"));
		(this.options.disabled && this.element.addClass("ui-draggable-disabled"));

		this._mouseInit();

	},

	destroy: function() {
		if(!this.element.data('draggable')) return;
		this.element
			.removeData("draggable")
			.unbind(".draggable")
			.removeClass("ui-draggable"
				+ " ui-draggable-dragging"
				+ " ui-draggable-disabled");
		this._mouseDestroy();
	},

	_mouseCapture: function(event) {

		var o = this.options;

		if (this.helper || o.disabled || $(event.target).is('.ui-resizable-handle'))
			return false;

		//Quit if we're not on a valid handle
		this.handle = this._getHandle(event);
		if (!this.handle)
			return false;

		return true;

	},

	_mouseStart: function(event) {

		var o = this.options;

		//Create and append the visible helper
		this.helper = this._createHelper(event);

		//Cache the helper size
		this._cacheHelperProportions();

		//If ddmanager is used for droppables, set the global draggable
		if($.ui.ddmanager)
			$.ui.ddmanager.current = this;

		/*
		 * - Position generation -
		 * This block generates everything position related - it's the core of draggables.
		 */

		//Cache the margins of the original element
		this._cacheMargins();

		//Store the helper's css position
		this.cssPosition = this.helper.css("position");
		this.scrollParent = this.helper.scrollParent();

		//The element's absolute position on the page minus margins
		this.offset = this.element.offset();
		this.offset = {
			top: this.offset.top - this.margins.top,
			left: this.offset.left - this.margins.left
		};

		$.extend(this.offset, {
			click: { //Where the click happened, relative to the element
				left: event.pageX - this.offset.left,
				top: event.pageY - this.offset.top
			},
			parent: this._getParentOffset(),
			relative: this._getRelativeOffset() //This is a relative to absolute position minus the actual position calculation - only used for relative positioned helper
		});

		//Generate the original position
		this.originalPosition = this._generatePosition(event);
		this.originalPageX = event.pageX;
		this.originalPageY = event.pageY;

		//Adjust the mouse offset relative to the helper if 'cursorAt' is supplied
		if(o.cursorAt)
			this._adjustOffsetFromHelper(o.cursorAt);

		//Set a containment if given in the options
		if(o.containment)
			this._setContainment();

		//Call plugins and callbacks
		this._trigger("start", event);

		//Recache the helper size
		this._cacheHelperProportions();

		//Prepare the droppable offsets
		if ($.ui.ddmanager && !o.dropBehaviour)
			$.ui.ddmanager.prepareOffsets(this, event);

		this.helper.addClass("ui-draggable-dragging");
		this._mouseDrag(event, true); //Execute the drag once - this causes the helper not to be visible before getting its correct position
		return true;
	},

	_mouseDrag: function(event, noPropagation) {

		//Compute the helpers position
		this.position = this._generatePosition(event);
		this.positionAbs = this._convertPositionTo("absolute");

		//Call plugins and callbacks and use the resulting position if something is returned
		if (!noPropagation) {
			var ui = this._uiHash();
			this._trigger('drag', event, ui);
			this.position = ui.position;
		}

		if(!this.options.axis || this.options.axis != "y") this.helper[0].style.left = this.position.left+'px';
		if(!this.options.axis || this.options.axis != "x") this.helper[0].style.top = this.position.top+'px';
		if($.ui.ddmanager) $.ui.ddmanager.drag(this, event);

		return false;
	},

	_mouseStop: function(event) {

		//If we are using droppables, inform the manager about the drop
		var dropped = false;
		if ($.ui.ddmanager && !this.options.dropBehaviour)
			dropped = $.ui.ddmanager.drop(this, event);

		//if a drop comes from outside (a sortable)
		if(this.dropped) {
			dropped = this.dropped;
			this.dropped = false;
		}

		if((this.options.revert == "invalid" && !dropped) || (this.options.revert == "valid" && dropped) || this.options.revert === true || ($.isFunction(this.options.revert) && this.options.revert.call(this.element, dropped))) {
			var self = this;
			$(this.helper).animate(this.originalPosition, parseInt(this.options.revertDuration, 10), function() {
				self._trigger("stop", event);
				self._clear();
			});
		} else {
			this._trigger("stop", event);
			this._clear();
		}

		return false;
	},

	_getHandle: function(event) {

		var handle = !this.options.handle || !$(this.options.handle, this.element).length ? true : false;
		$(this.options.handle, this.element)
			.find("*")
			.andSelf()
			.each(function() {
				if(this == event.target) handle = true;
			});

		return handle;

	},

	_createHelper: function(event) {

		var o = this.options;
		var helper = $.isFunction(o.helper) ? $(o.helper.apply(this.element[0], [event])) : (o.helper == 'clone' ? this.element.clone() : this.element);

		if(!helper.parents('body').length)
			helper.appendTo((o.appendTo == 'parent' ? this.element[0].parentNode : o.appendTo));

		if(helper[0] != this.element[0] && !(/(fixed|absolute)/).test(helper.css("position")))
			helper.css("position", "absolute");

		return helper;

	},

	_adjustOffsetFromHelper: function(obj) {
		if(obj.left != undefined) this.offset.click.left = obj.left + this.margins.left;
		if(obj.right != undefined) this.offset.click.left = this.helperProportions.width - obj.right + this.margins.left;
		if(obj.top != undefined) this.offset.click.top = obj.top + this.margins.top;
		if(obj.bottom != undefined) this.offset.click.top = this.helperProportions.height - obj.bottom + this.margins.top;
	},

	_getParentOffset: function() {

		//Get the offsetParent and cache its position
		this.offsetParent = this.helper.offsetParent();
		var po = this.offsetParent.offset();

		// This is a special case where we need to modify a offset calculated on start, since the following happened:
		// 1. The position of the helper is absolute, so it's position is calculated based on the next positioned parent
		// 2. The actual offset parent is a child of the scroll parent, and the scroll parent isn't the document, which means that
		//    the scroll is included in the initial calculation of the offset of the parent, and never recalculated upon drag
		if(this.cssPosition == 'absolute' && this.scrollParent[0] != document && $.ui.contains(this.scrollParent[0], this.offsetParent[0])) {
			po.left += this.scrollParent.scrollLeft();
			po.top += this.scrollParent.scrollTop();
		}

		if((this.offsetParent[0] == document.body) //This needs to be actually done for all browsers, since pageX/pageY includes this information
		|| (this.offsetParent[0].tagName && this.offsetParent[0].tagName.toLowerCase() == 'html' && $.browser.msie)) //Ugly IE fix
			po = { top: 0, left: 0 };

		return {
			top: po.top + (parseInt(this.offsetParent.css("borderTopWidth"),10) || 0),
			left: po.left + (parseInt(this.offsetParent.css("borderLeftWidth"),10) || 0)
		};

	},

	_getRelativeOffset: function() {

		if(this.cssPosition == "relative") {
			var p = this.element.position();
			return {
				top: p.top - (parseInt(this.helper.css("top"),10) || 0) + this.scrollParent.scrollTop(),
				left: p.left - (parseInt(this.helper.css("left"),10) || 0) + this.scrollParent.scrollLeft()
			};
		} else {
			return { top: 0, left: 0 };
		}

	},

	_cacheMargins: function() {
		this.margins = {
			left: (parseInt(this.element.css("marginLeft"),10) || 0),
			top: (parseInt(this.element.css("marginTop"),10) || 0)
		};
	},

	_cacheHelperProportions: function() {
		this.helperProportions = {
			width: this.helper.outerWidth(),
			height: this.helper.outerHeight()
		};
	},

	_setContainment: function() {

		var o = this.options;
		if(o.containment == 'parent') o.containment = this.helper[0].parentNode;
		if(o.containment == 'document' || o.containment == 'window') this.containment = [
			0 - this.offset.relative.left - this.offset.parent.left,
			0 - this.offset.relative.top - this.offset.parent.top,
			$(o.containment == 'document' ? document : window).width() - this.helperProportions.width - this.margins.left,
			($(o.containment == 'document' ? document : window).height() || document.body.parentNode.scrollHeight) - this.helperProportions.height - this.margins.top
		];

		if(!(/^(document|window|parent)$/).test(o.containment) && o.containment.constructor != Array) {
			var ce = $(o.containment)[0]; if(!ce) return;
			var co = $(o.containment).offset();
			var over = ($(ce).css("overflow") != 'hidden');

			this.containment = [
				co.left + (parseInt($(ce).css("borderLeftWidth"),10) || 0) + (parseInt($(ce).css("paddingLeft"),10) || 0) - this.margins.left,
				co.top + (parseInt($(ce).css("borderTopWidth"),10) || 0) + (parseInt($(ce).css("paddingTop"),10) || 0) - this.margins.top,
				co.left+(over ? Math.max(ce.scrollWidth,ce.offsetWidth) : ce.offsetWidth) - (parseInt($(ce).css("borderLeftWidth"),10) || 0) - (parseInt($(ce).css("paddingRight"),10) || 0) - this.helperProportions.width - this.margins.left,
				co.top+(over ? Math.max(ce.scrollHeight,ce.offsetHeight) : ce.offsetHeight) - (parseInt($(ce).css("borderTopWidth"),10) || 0) - (parseInt($(ce).css("paddingBottom"),10) || 0) - this.helperProportions.height - this.margins.top
			];
		} else if(o.containment.constructor == Array) {
			this.containment = o.containment;
		}

	},

	_convertPositionTo: function(d, pos) {

		if(!pos) pos = this.position;
		var mod = d == "absolute" ? 1 : -1;
		var o = this.options, scroll = this.cssPosition == 'absolute' && !(this.scrollParent[0] != document && $.ui.contains(this.scrollParent[0], this.offsetParent[0])) ? this.offsetParent : this.scrollParent, scrollIsRootNode = (/(html|body)/i).test(scroll[0].tagName);

		return {
			top: (
				pos.top																	// The absolute mouse position
				+ this.offset.relative.top * mod										// Only for relative positioned nodes: Relative offset from element to offset parent
				+ this.offset.parent.top * mod											// The offsetParent's offset without borders (offset + border)
				- ($.browser.safari && this.cssPosition == 'fixed' ? 0 : ( this.cssPosition == 'fixed' ? -this.scrollParent.scrollTop() : ( scrollIsRootNode ? 0 : scroll.scrollTop() ) ) * mod)
			),
			left: (
				pos.left																// The absolute mouse position
				+ this.offset.relative.left * mod										// Only for relative positioned nodes: Relative offset from element to offset parent
				+ this.offset.parent.left * mod											// The offsetParent's offset without borders (offset + border)
				- ($.browser.safari && this.cssPosition == 'fixed' ? 0 : ( this.cssPosition == 'fixed' ? -this.scrollParent.scrollLeft() : scrollIsRootNode ? 0 : scroll.scrollLeft() ) * mod)
			)
		};

	},

	_generatePosition: function(event) {

		var o = this.options, scroll = this.cssPosition == 'absolute' && !(this.scrollParent[0] != document && $.ui.contains(this.scrollParent[0], this.offsetParent[0])) ? this.offsetParent : this.scrollParent, scrollIsRootNode = (/(html|body)/i).test(scroll[0].tagName);

		// This is another very weird special case that only happens for relative elements:
		// 1. If the css position is relative
		// 2. and the scroll parent is the document or similar to the offset parent
		// we have to refresh the relative offset during the scroll so there are no jumps
		if(this.cssPosition == 'relative' && !(this.scrollParent[0] != document && this.scrollParent[0] != this.offsetParent[0])) {
			this.offset.relative = this._getRelativeOffset();
		}

		var pageX = event.pageX;
		var pageY = event.pageY;

		/*
		 * - Position constraining -
		 * Constrain the position to a mix of grid, containment.
		 */

		if(this.originalPosition) { //If we are not dragging yet, we won't check for options

			if(this.containment) {
				if(event.pageX - this.offset.click.left < this.containment[0]) pageX = this.containment[0] + this.offset.click.left;
				if(event.pageY - this.offset.click.top < this.containment[1]) pageY = this.containment[1] + this.offset.click.top;
				if(event.pageX - this.offset.click.left > this.containment[2]) pageX = this.containment[2] + this.offset.click.left;
				if(event.pageY - this.offset.click.top > this.containment[3]) pageY = this.containment[3] + this.offset.click.top;
			}

			if(o.grid) {
				var top = this.originalPageY + Math.round((pageY - this.originalPageY) / o.grid[1]) * o.grid[1];
				pageY = this.containment ? (!(top - this.offset.click.top < this.containment[1] || top - this.offset.click.top > this.containment[3]) ? top : (!(top - this.offset.click.top < this.containment[1]) ? top - o.grid[1] : top + o.grid[1])) : top;

				var left = this.originalPageX + Math.round((pageX - this.originalPageX) / o.grid[0]) * o.grid[0];
				pageX = this.containment ? (!(left - this.offset.click.left < this.containment[0] || left - this.offset.click.left > this.containment[2]) ? left : (!(left - this.offset.click.left < this.containment[0]) ? left - o.grid[0] : left + o.grid[0])) : left;
			}

		}

		return {
			top: (
				pageY																// The absolute mouse position
				- this.offset.click.top													// Click offset (relative to the element)
				- this.offset.relative.top												// Only for relative positioned nodes: Relative offset from element to offset parent
				- this.offset.parent.top												// The offsetParent's offset without borders (offset + border)
				+ ($.browser.safari && this.cssPosition == 'fixed' ? 0 : ( this.cssPosition == 'fixed' ? -this.scrollParent.scrollTop() : ( scrollIsRootNode ? 0 : scroll.scrollTop() ) ))
			),
			left: (
				pageX																// The absolute mouse position
				- this.offset.click.left												// Click offset (relative to the element)
				- this.offset.relative.left												// Only for relative positioned nodes: Relative offset from element to offset parent
				- this.offset.parent.left												// The offsetParent's offset without borders (offset + border)
				+ ($.browser.safari && this.cssPosition == 'fixed' ? 0 : ( this.cssPosition == 'fixed' ? -this.scrollParent.scrollLeft() : scrollIsRootNode ? 0 : scroll.scrollLeft() ))
			)
		};

	},

	_clear: function() {
		this.helper.removeClass("ui-draggable-dragging");
		if(this.helper[0] != this.element[0] && !this.cancelHelperRemoval) this.helper.remove();
		//if($.ui.ddmanager) $.ui.ddmanager.current = null;
		this.helper = null;
		this.cancelHelperRemoval = false;
	},

	// From now on bulk stuff - mainly helpers

	_trigger: function(type, event, ui) {
		ui = ui || this._uiHash();
		$.ui.plugin.call(this, type, [event, ui]);
		if(type == "drag") this.positionAbs = this._convertPositionTo("absolute"); //The absolute position has to be recalculated after plugins
		return $.widget.prototype._trigger.call(this, type, event, ui);
	},

	plugins: {},

	_uiHash: function(event) {
		return {
			helper: this.helper,
			position: this.position,
			absolutePosition: this.positionAbs, //deprecated
			offset: this.positionAbs
		};
	}

}));

$.extend($.ui.draggable, {
	version: "1.7.2",
	eventPrefix: "drag",
	defaults: {
		addClasses: true,
		appendTo: "parent",
		axis: false,
		cancel: ":input,option",
		connectToSortable: false,
		containment: false,
		cursor: "auto",
		cursorAt: false,
		delay: 0,
		distance: 1,
		grid: false,
		handle: false,
		helper: "original",
		iframeFix: false,
		opacity: false,
		refreshPositions: false,
		revert: false,
		revertDuration: 500,
		scope: "default",
		scroll: true,
		scrollSensitivity: 20,
		scrollSpeed: 20,
		snap: false,
		snapMode: "both",
		snapTolerance: 20,
		stack: false,
		zIndex: false
	}
});

$.ui.plugin.add("draggable", "connectToSortable", {
	start: function(event, ui) {

		var inst = $(this).data("draggable"), o = inst.options,
			uiSortable = $.extend({}, ui, { item: inst.element });
		inst.sortables = [];
		$(o.connectToSortable).each(function() {
			var sortable = $.data(this, 'sortable');
			if (sortable && !sortable.options.disabled) {
				inst.sortables.push({
					instance: sortable,
					shouldRevert: sortable.options.revert
				});
				sortable._refreshItems();	//Do a one-time refresh at start to refresh the containerCache
				sortable._trigger("activate", event, uiSortable);
			}
		});

	},
	stop: function(event, ui) {

		//If we are still over the sortable, we fake the stop event of the sortable, but also remove helper
		var inst = $(this).data("draggable"),
			uiSortable = $.extend({}, ui, { item: inst.element });

		$.each(inst.sortables, function() {
			if(this.instance.isOver) {

				this.instance.isOver = 0;

				inst.cancelHelperRemoval = true; //Don't remove the helper in the draggable instance
				this.instance.cancelHelperRemoval = false; //Remove it in the sortable instance (so sortable plugins like revert still work)

				//The sortable revert is supported, and we have to set a temporary dropped variable on the draggable to support revert: 'valid/invalid'
				if(this.shouldRevert) this.instance.options.revert = true;

				//Trigger the stop of the sortable
				this.instance._mouseStop(event);

				this.instance.options.helper = this.instance.options._helper;

				//If the helper has been the original item, restore properties in the sortable
				if(inst.options.helper == 'original')
					this.instance.currentItem.css({ top: 'auto', left: 'auto' });

			} else {
				this.instance.cancelHelperRemoval = false; //Remove the helper in the sortable instance
				this.instance._trigger("deactivate", event, uiSortable);
			}

		});

	},
	drag: function(event, ui) {

		var inst = $(this).data("draggable"), self = this;

		var checkPos = function(o) {
			var dyClick = this.offset.click.top, dxClick = this.offset.click.left;
			var helperTop = this.positionAbs.top, helperLeft = this.positionAbs.left;
			var itemHeight = o.height, itemWidth = o.width;
			var itemTop = o.top, itemLeft = o.left;

			return $.ui.isOver(helperTop + dyClick, helperLeft + dxClick, itemTop, itemLeft, itemHeight, itemWidth);
		};

		$.each(inst.sortables, function(i) {

			//Copy over some variables to allow calling the sortable's native _intersectsWith
			this.instance.positionAbs = inst.positionAbs;
			this.instance.helperProportions = inst.helperProportions;
			this.instance.offset.click = inst.offset.click;

			if(this.instance._intersectsWith(this.instance.containerCache)) {

				//If it intersects, we use a little isOver variable and set it once, so our move-in stuff gets fired only once
				if(!this.instance.isOver) {

					this.instance.isOver = 1;
					//Now we fake the start of dragging for the sortable instance,
					//by cloning the list group item, appending it to the sortable and using it as inst.currentItem
					//We can then fire the start event of the sortable with our passed browser event, and our own helper (so it doesn't create a new one)
					this.instance.currentItem = $(self).clone().appendTo(this.instance.element).data("sortable-item", true);
					this.instance.options._helper = this.instance.options.helper; //Store helper option to later restore it
					this.instance.options.helper = function() { return ui.helper[0]; };

					event.target = this.instance.currentItem[0];
					this.instance._mouseCapture(event, true);
					this.instance._mouseStart(event, true, true);

					//Because the browser event is way off the new appended portlet, we modify a couple of variables to reflect the changes
					this.instance.offset.click.top = inst.offset.click.top;
					this.instance.offset.click.left = inst.offset.click.left;
					this.instance.offset.parent.left -= inst.offset.parent.left - this.instance.offset.parent.left;
					this.instance.offset.parent.top -= inst.offset.parent.top - this.instance.offset.parent.top;

					inst._trigger("toSortable", event);
					inst.dropped = this.instance.element; //draggable revert needs that
					//hack so receive/update callbacks work (mostly)
					inst.currentItem = inst.element;
					this.instance.fromOutside = inst;

				}

				//Provided we did all the previous steps, we can fire the drag event of the sortable on every draggable drag, when it intersects with the sortable
				if(this.instance.currentItem) this.instance._mouseDrag(event);

			} else {

				//If it doesn't intersect with the sortable, and it intersected before,
				//we fake the drag stop of the sortable, but make sure it doesn't remove the helper by using cancelHelperRemoval
				if(this.instance.isOver) {

					this.instance.isOver = 0;
					this.instance.cancelHelperRemoval = true;

					//Prevent reverting on this forced stop
					this.instance.options.revert = false;

					// The out event needs to be triggered independently
					this.instance._trigger('out', event, this.instance._uiHash(this.instance));

					this.instance._mouseStop(event, true);
					this.instance.options.helper = this.instance.options._helper;

					//Now we remove our currentItem, the list group clone again, and the placeholder, and animate the helper back to it's original size
					this.instance.currentItem.remove();
					if(this.instance.placeholder) this.instance.placeholder.remove();

					inst._trigger("fromSortable", event);
					inst.dropped = false; //draggable revert needs that
				}

			};

		});

	}
});

$.ui.plugin.add("draggable", "cursor", {
	start: function(event, ui) {
		var t = $('body'), o = $(this).data('draggable').options;
		if (t.css("cursor")) o._cursor = t.css("cursor");
		t.css("cursor", o.cursor);
	},
	stop: function(event, ui) {
		var o = $(this).data('draggable').options;
		if (o._cursor) $('body').css("cursor", o._cursor);
	}
});

$.ui.plugin.add("draggable", "iframeFix", {
	start: function(event, ui) {
		var o = $(this).data('draggable').options;
		$(o.iframeFix === true ? "iframe" : o.iframeFix).each(function() {
			$('<div class="ui-draggable-iframeFix" style="background: #fff;"></div>')
			.css({
				width: this.offsetWidth+"px", height: this.offsetHeight+"px",
				position: "absolute", opacity: "0.001", zIndex: 1000
			})
			.css($(this).offset())
			.appendTo("body");
		});
	},
	stop: function(event, ui) {
		$("div.ui-draggable-iframeFix").each(function() { this.parentNode.removeChild(this); }); //Remove frame helpers
	}
});

$.ui.plugin.add("draggable", "opacity", {
	start: function(event, ui) {
		var t = $(ui.helper), o = $(this).data('draggable').options;
		if(t.css("opacity")) o._opacity = t.css("opacity");
		t.css('opacity', o.opacity);
	},
	stop: function(event, ui) {
		var o = $(this).data('draggable').options;
		if(o._opacity) $(ui.helper).css('opacity', o._opacity);
	}
});

$.ui.plugin.add("draggable", "scroll", {
	start: function(event, ui) {
		var i = $(this).data("draggable");
		if(i.scrollParent[0] != document && i.scrollParent[0].tagName != 'HTML') i.overflowOffset = i.scrollParent.offset();
	},
	drag: function(event, ui) {

		var i = $(this).data("draggable"), o = i.options, scrolled = false;

		if(i.scrollParent[0] != document && i.scrollParent[0].tagName != 'HTML') {

			if(!o.axis || o.axis != 'x') {
				if((i.overflowOffset.top + i.scrollParent[0].offsetHeight) - event.pageY < o.scrollSensitivity)
					i.scrollParent[0].scrollTop = scrolled = i.scrollParent[0].scrollTop + o.scrollSpeed;
				else if(event.pageY - i.overflowOffset.top < o.scrollSensitivity)
					i.scrollParent[0].scrollTop = scrolled = i.scrollParent[0].scrollTop - o.scrollSpeed;
			}

			if(!o.axis || o.axis != 'y') {
				if((i.overflowOffset.left + i.scrollParent[0].offsetWidth) - event.pageX < o.scrollSensitivity)
					i.scrollParent[0].scrollLeft = scrolled = i.scrollParent[0].scrollLeft + o.scrollSpeed;
				else if(event.pageX - i.overflowOffset.left < o.scrollSensitivity)
					i.scrollParent[0].scrollLeft = scrolled = i.scrollParent[0].scrollLeft - o.scrollSpeed;
			}

		} else {

			if(!o.axis || o.axis != 'x') {
				if(event.pageY - $(document).scrollTop() < o.scrollSensitivity)
					scrolled = $(document).scrollTop($(document).scrollTop() - o.scrollSpeed);
				else if($(window).height() - (event.pageY - $(document).scrollTop()) < o.scrollSensitivity)
					scrolled = $(document).scrollTop($(document).scrollTop() + o.scrollSpeed);
			}

			if(!o.axis || o.axis != 'y') {
				if(event.pageX - $(document).scrollLeft() < o.scrollSensitivity)
					scrolled = $(document).scrollLeft($(document).scrollLeft() - o.scrollSpeed);
				else if($(window).width() - (event.pageX - $(document).scrollLeft()) < o.scrollSensitivity)
					scrolled = $(document).scrollLeft($(document).scrollLeft() + o.scrollSpeed);
			}

		}

		if(scrolled !== false && $.ui.ddmanager && !o.dropBehaviour)
			$.ui.ddmanager.prepareOffsets(i, event);

	}
});

$.ui.plugin.add("draggable", "snap", {
	start: function(event, ui) {

		var i = $(this).data("draggable"), o = i.options;
		i.snapElements = [];

		$(o.snap.constructor != String ? ( o.snap.items || ':data(draggable)' ) : o.snap).each(function() {
			var $t = $(this); var $o = $t.offset();
			if(this != i.element[0]) i.snapElements.push({
				item: this,
				width: $t.outerWidth(), height: $t.outerHeight(),
				top: $o.top, left: $o.left
			});
		});

	},
	drag: function(event, ui) {

		var inst = $(this).data("draggable"), o = inst.options;
		var d = o.snapTolerance;

		var x1 = ui.offset.left, x2 = x1 + inst.helperProportions.width,
			y1 = ui.offset.top, y2 = y1 + inst.helperProportions.height;

		for (var i = inst.snapElements.length - 1; i >= 0; i--){

			var l = inst.snapElements[i].left, r = l + inst.snapElements[i].width,
				t = inst.snapElements[i].top, b = t + inst.snapElements[i].height;

			//Yes, I know, this is insane ;)
			if(!((l-d < x1 && x1 < r+d && t-d < y1 && y1 < b+d) || (l-d < x1 && x1 < r+d && t-d < y2 && y2 < b+d) || (l-d < x2 && x2 < r+d && t-d < y1 && y1 < b+d) || (l-d < x2 && x2 < r+d && t-d < y2 && y2 < b+d))) {
				if(inst.snapElements[i].snapping) (inst.options.snap.release && inst.options.snap.release.call(inst.element, event, $.extend(inst._uiHash(), { snapItem: inst.snapElements[i].item })));
				inst.snapElements[i].snapping = false;
				continue;
			}

			if(o.snapMode != 'inner') {
				var ts = Math.abs(t - y2) <= d;
				var bs = Math.abs(b - y1) <= d;
				var ls = Math.abs(l - x2) <= d;
				var rs = Math.abs(r - x1) <= d;
				if(ts) ui.position.top = inst._convertPositionTo("relative", { top: t - inst.helperProportions.height, left: 0 }).top - inst.margins.top;
				if(bs) ui.position.top = inst._convertPositionTo("relative", { top: b, left: 0 }).top - inst.margins.top;
				if(ls) ui.position.left = inst._convertPositionTo("relative", { top: 0, left: l - inst.helperProportions.width }).left - inst.margins.left;
				if(rs) ui.position.left = inst._convertPositionTo("relative", { top: 0, left: r }).left - inst.margins.left;
			}

			var first = (ts || bs || ls || rs);

			if(o.snapMode != 'outer') {
				var ts = Math.abs(t - y1) <= d;
				var bs = Math.abs(b - y2) <= d;
				var ls = Math.abs(l - x1) <= d;
				var rs = Math.abs(r - x2) <= d;
				if(ts) ui.position.top = inst._convertPositionTo("relative", { top: t, left: 0 }).top - inst.margins.top;
				if(bs) ui.position.top = inst._convertPositionTo("relative", { top: b - inst.helperProportions.height, left: 0 }).top - inst.margins.top;
				if(ls) ui.position.left = inst._convertPositionTo("relative", { top: 0, left: l }).left - inst.margins.left;
				if(rs) ui.position.left = inst._convertPositionTo("relative", { top: 0, left: r - inst.helperProportions.width }).left - inst.margins.left;
			}

			if(!inst.snapElements[i].snapping && (ts || bs || ls || rs || first))
				(inst.options.snap.snap && inst.options.snap.snap.call(inst.element, event, $.extend(inst._uiHash(), { snapItem: inst.snapElements[i].item })));
			inst.snapElements[i].snapping = (ts || bs || ls || rs || first);

		};

	}
});

$.ui.plugin.add("draggable", "stack", {
	start: function(event, ui) {

		var o = $(this).data("draggable").options;

		var group = $.makeArray($(o.stack.group)).sort(function(a,b) {
			return (parseInt($(a).css("zIndex"),10) || o.stack.min) - (parseInt($(b).css("zIndex"),10) || o.stack.min);
		});

		$(group).each(function(i) {
			this.style.zIndex = o.stack.min + i;
		});

		this[0].style.zIndex = o.stack.min + group.length;

	}
});

$.ui.plugin.add("draggable", "zIndex", {
	start: function(event, ui) {
		var t = $(ui.helper), o = $(this).data("draggable").options;
		if(t.css("zIndex")) o._zIndex = t.css("zIndex");
		t.css('zIndex', o.zIndex);
	},
	stop: function(event, ui) {
		var o = $(this).data("draggable").options;
		if(o._zIndex) $(ui.helper).css('zIndex', o._zIndex);
	}
});

})(jQuery);
/*
 * jQuery UI Droppable 1.7.2
 *
 * Copyright (c) 2009 AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT (MIT-LICENSE.txt)
 * and GPL (GPL-LICENSE.txt) licenses.
 *
 * http://docs.jquery.com/UI/Droppables
 *
 * Depends:
 *	ui.core.js
 *	ui.draggable.js
 */
(function($) {

$.widget("ui.droppable", {

	_init: function() {

		var o = this.options, accept = o.accept;
		this.isover = 0; this.isout = 1;

		this.options.accept = this.options.accept && $.isFunction(this.options.accept) ? this.options.accept : function(d) {
			return d.is(accept);
		};

		//Store the droppable's proportions
		this.proportions = { width: this.element[0].offsetWidth, height: this.element[0].offsetHeight };

		// Add the reference and positions to the manager
		$.ui.ddmanager.droppables[this.options.scope] = $.ui.ddmanager.droppables[this.options.scope] || [];
		$.ui.ddmanager.droppables[this.options.scope].push(this);

		(this.options.addClasses && this.element.addClass("ui-droppable"));

	},

	destroy: function() {
		var drop = $.ui.ddmanager.droppables[this.options.scope];
		for ( var i = 0; i < drop.length; i++ )
			if ( drop[i] == this )
				drop.splice(i, 1);

		this.element
			.removeClass("ui-droppable ui-droppable-disabled")
			.removeData("droppable")
			.unbind(".droppable");
	},

	_setData: function(key, value) {

		if(key == 'accept') {
			this.options.accept = value && $.isFunction(value) ? value : function(d) {
				return d.is(value);
			};
		} else {
			$.widget.prototype._setData.apply(this, arguments);
		}

	},

	_activate: function(event) {
		var draggable = $.ui.ddmanager.current;
		if(this.options.activeClass) this.element.addClass(this.options.activeClass);
		(draggable && this._trigger('activate', event, this.ui(draggable)));
	},

	_deactivate: function(event) {
		var draggable = $.ui.ddmanager.current;
		if(this.options.activeClass) this.element.removeClass(this.options.activeClass);
		(draggable && this._trigger('deactivate', event, this.ui(draggable)));
	},

	_over: function(event) {

		var draggable = $.ui.ddmanager.current;
		if (!draggable || (draggable.currentItem || draggable.element)[0] == this.element[0]) return; // Bail if draggable and droppable are same element

		if (this.options.accept.call(this.element[0],(draggable.currentItem || draggable.element))) {
			if(this.options.hoverClass) this.element.addClass(this.options.hoverClass);
			this._trigger('over', event, this.ui(draggable));
		}

	},

	_out: function(event) {

		var draggable = $.ui.ddmanager.current;
		if (!draggable || (draggable.currentItem || draggable.element)[0] == this.element[0]) return; // Bail if draggable and droppable are same element

		if (this.options.accept.call(this.element[0],(draggable.currentItem || draggable.element))) {
			if(this.options.hoverClass) this.element.removeClass(this.options.hoverClass);
			this._trigger('out', event, this.ui(draggable));
		}

	},

	_drop: function(event,custom) {

		var draggable = custom || $.ui.ddmanager.current;
		if (!draggable || (draggable.currentItem || draggable.element)[0] == this.element[0]) return false; // Bail if draggable and droppable are same element

		var childrenIntersection = false;
		this.element.find(":data(droppable)").not(".ui-draggable-dragging").each(function() {
			var inst = $.data(this, 'droppable');
			if(inst.options.greedy && $.ui.intersect(draggable, $.extend(inst, { offset: inst.element.offset() }), inst.options.tolerance)) {
				childrenIntersection = true; return false;
			}
		});
		if(childrenIntersection) return false;

		if(this.options.accept.call(this.element[0],(draggable.currentItem || draggable.element))) {
			if(this.options.activeClass) this.element.removeClass(this.options.activeClass);
			if(this.options.hoverClass) this.element.removeClass(this.options.hoverClass);
			this._trigger('drop', event, this.ui(draggable));
			return this.element;
		}

		return false;

	},

	ui: function(c) {
		return {
			draggable: (c.currentItem || c.element),
			helper: c.helper,
			position: c.position,
			absolutePosition: c.positionAbs, //deprecated
			offset: c.positionAbs
		};
	}

});

$.extend($.ui.droppable, {
	version: "1.7.2",
	eventPrefix: 'drop',
	defaults: {
		accept: '*',
		activeClass: false,
		addClasses: true,
		greedy: false,
		hoverClass: false,
		scope: 'default',
		tolerance: 'intersect'
	}
});

$.ui.intersect = function(draggable, droppable, toleranceMode) {

	if (!droppable.offset) return false;

	var x1 = (draggable.positionAbs || draggable.position.absolute).left, x2 = x1 + draggable.helperProportions.width,
		y1 = (draggable.positionAbs || draggable.position.absolute).top, y2 = y1 + draggable.helperProportions.height;
	var l = droppable.offset.left, r = l + droppable.proportions.width,
		t = droppable.offset.top, b = t + droppable.proportions.height;

	switch (toleranceMode) {
		case 'fit':
			return (l < x1 && x2 < r
				&& t < y1 && y2 < b);
			break;
		case 'intersect':
			return (l < x1 + (draggable.helperProportions.width / 2) // Right Half
				&& x2 - (draggable.helperProportions.width / 2) < r // Left Half
				&& t < y1 + (draggable.helperProportions.height / 2) // Bottom Half
				&& y2 - (draggable.helperProportions.height / 2) < b ); // Top Half
			break;
		case 'pointer':
			var draggableLeft = ((draggable.positionAbs || draggable.position.absolute).left + (draggable.clickOffset || draggable.offset.click).left),
				draggableTop = ((draggable.positionAbs || draggable.position.absolute).top + (draggable.clickOffset || draggable.offset.click).top),
				isOver = $.ui.isOver(draggableTop, draggableLeft, t, l, droppable.proportions.height, droppable.proportions.width);
			return isOver;
			break;
		case 'touch':
			return (
					(y1 >= t && y1 <= b) ||	// Top edge touching
					(y2 >= t && y2 <= b) ||	// Bottom edge touching
					(y1 < t && y2 > b)		// Surrounded vertically
				) && (
					(x1 >= l && x1 <= r) ||	// Left edge touching
					(x2 >= l && x2 <= r) ||	// Right edge touching
					(x1 < l && x2 > r)		// Surrounded horizontally
				);
			break;
		default:
			return false;
			break;
		}

};

/*
	This manager tracks offsets of draggables and droppables
*/
$.ui.ddmanager = {
	current: null,
	droppables: { 'default': [] },
	prepareOffsets: function(t, event) {

		var m = $.ui.ddmanager.droppables[t.options.scope];
		var type = event ? event.type : null; // workaround for #2317
		var list = (t.currentItem || t.element).find(":data(droppable)").andSelf();

		droppablesLoop: for (var i = 0; i < m.length; i++) {

			if(m[i].options.disabled || (t && !m[i].options.accept.call(m[i].element[0],(t.currentItem || t.element)))) continue;	//No disabled and non-accepted
			for (var j=0; j < list.length; j++) { if(list[j] == m[i].element[0]) { m[i].proportions.height = 0; continue droppablesLoop; } }; //Filter out elements in the current dragged item
			m[i].visible = m[i].element.css("display") != "none"; if(!m[i].visible) continue; 									//If the element is not visible, continue

			m[i].offset = m[i].element.offset();
			m[i].proportions = { width: m[i].element[0].offsetWidth, height: m[i].element[0].offsetHeight };

			if(type == "mousedown") m[i]._activate.call(m[i], event); //Activate the droppable if used directly from draggables

		}

	},
	drop: function(draggable, event) {

		var dropped = false;
		$.each($.ui.ddmanager.droppables[draggable.options.scope], function() {

			if(!this.options) return;
			if (!this.options.disabled && this.visible && $.ui.intersect(draggable, this, this.options.tolerance))
				dropped = this._drop.call(this, event);

			if (!this.options.disabled && this.visible && this.options.accept.call(this.element[0],(draggable.currentItem || draggable.element))) {
				this.isout = 1; this.isover = 0;
				this._deactivate.call(this, event);
			}

		});
		return dropped;

	},
	drag: function(draggable, event) {

		//If you have a highly dynamic page, you might try this option. It renders positions every time you move the mouse.
		if(draggable.options.refreshPositions) $.ui.ddmanager.prepareOffsets(draggable, event);

		//Run through all droppables and check their positions based on specific tolerance options

		$.each($.ui.ddmanager.droppables[draggable.options.scope], function() {

			if(this.options.disabled || this.greedyChild || !this.visible) return;
			var intersects = $.ui.intersect(draggable, this, this.options.tolerance);

			var c = !intersects && this.isover == 1 ? 'isout' : (intersects && this.isover == 0 ? 'isover' : null);
			if(!c) return;

			var parentInstance;
			if (this.options.greedy) {
				var parent = this.element.parents(':data(droppable):eq(0)');
				if (parent.length) {
					parentInstance = $.data(parent[0], 'droppable');
					parentInstance.greedyChild = (c == 'isover' ? 1 : 0);
				}
			}

			// we just moved into a greedy child
			if (parentInstance && c == 'isover') {
				parentInstance['isover'] = 0;
				parentInstance['isout'] = 1;
				parentInstance._out.call(parentInstance, event);
			}

			this[c] = 1; this[c == 'isout' ? 'isover' : 'isout'] = 0;
			this[c == "isover" ? "_over" : "_out"].call(this, event);

			// we just moved out of a greedy child
			if (parentInstance && c == 'isout') {
				parentInstance['isout'] = 0;
				parentInstance['isover'] = 1;
				parentInstance._over.call(parentInstance, event);
			}
		});

	}
};

})(jQuery);
/*
 * jQuery UI Resizable 1.7.2
 *
 * Copyright (c) 2009 AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT (MIT-LICENSE.txt)
 * and GPL (GPL-LICENSE.txt) licenses.
 *
 * http://docs.jquery.com/UI/Resizables
 *
 * Depends:
 *	ui.core.js
 */
(function($) {

$.widget("ui.resizable", $.extend({}, $.ui.mouse, {

	_init: function() {

		var self = this, o = this.options;
		this.element.addClass("ui-resizable");

		$.extend(this, {
			_aspectRatio: !!(o.aspectRatio),
			aspectRatio: o.aspectRatio,
			originalElement: this.element,
			_proportionallyResizeElements: [],
			_helper: o.helper || o.ghost || o.animate ? o.helper || 'ui-resizable-helper' : null
		});

		//Wrap the element if it cannot hold child nodes
		if(this.element[0].nodeName.match(/canvas|textarea|input|select|button|img/i)) {

			//Opera fix for relative positioning
			if (/relative/.test(this.element.css('position')) && $.browser.opera)
				this.element.css({ position: 'relative', top: 'auto', left: 'auto' });

			//Create a wrapper element and set the wrapper to the new current internal element
			this.element.wrap(
				$('<div class="ui-wrapper" style="overflow: hidden;"></div>').css({
					position: this.element.css('position'),
					width: this.element.outerWidth(),
					height: this.element.outerHeight(),
					top: this.element.css('top'),
					left: this.element.css('left')
				})
			);

			//Overwrite the original this.element
			this.element = this.element.parent().data(
				"resizable", this.element.data('resizable')
			);

			this.elementIsWrapper = true;

			//Move margins to the wrapper
			this.element.css({ marginLeft: this.originalElement.css("marginLeft"), marginTop: this.originalElement.css("marginTop"), marginRight: this.originalElement.css("marginRight"), marginBottom: this.originalElement.css("marginBottom") });
			this.originalElement.css({ marginLeft: 0, marginTop: 0, marginRight: 0, marginBottom: 0});

			//Prevent Safari textarea resize
			this.originalResizeStyle = this.originalElement.css('resize');
			this.originalElement.css('resize', 'none');

			//Push the actual element to our proportionallyResize internal array
			this._proportionallyResizeElements.push(this.originalElement.css({ position: 'static', zoom: 1, display: 'block' }));

			// avoid IE jump (hard set the margin)
			this.originalElement.css({ margin: this.originalElement.css('margin') });

			// fix handlers offset
			this._proportionallyResize();

		}

		this.handles = o.handles || (!$('.ui-resizable-handle', this.element).length ? "e,s,se" : { n: '.ui-resizable-n', e: '.ui-resizable-e', s: '.ui-resizable-s', w: '.ui-resizable-w', se: '.ui-resizable-se', sw: '.ui-resizable-sw', ne: '.ui-resizable-ne', nw: '.ui-resizable-nw' });
		if(this.handles.constructor == String) {

			if(this.handles == 'all') this.handles = 'n,e,s,w,se,sw,ne,nw';
			var n = this.handles.split(","); this.handles = {};

			for(var i = 0; i < n.length; i++) {

				var handle = $.trim(n[i]), hname = 'ui-resizable-'+handle;
				var axis = $('<div class="ui-resizable-handle ' + hname + '"></div>');

				// increase zIndex of sw, se, ne, nw axis
				//TODO : this modifies original option
				if(/sw|se|ne|nw/.test(handle)) axis.css({ zIndex: ++o.zIndex });

				//TODO : What's going on here?
				if ('se' == handle) {
					axis.addClass('ui-icon ui-icon-gripsmall-diagonal-se');
				};

				//Insert into internal handles object and append to element
				this.handles[handle] = '.ui-resizable-'+handle;
				this.element.append(axis);
			}

		}

		this._renderAxis = function(target) {

			target = target || this.element;

			for(var i in this.handles) {

				if(this.handles[i].constructor == String)
					this.handles[i] = $(this.handles[i], this.element).show();

				//Apply pad to wrapper element, needed to fix axis position (textarea, inputs, scrolls)
				if (this.elementIsWrapper && this.originalElement[0].nodeName.match(/textarea|input|select|button/i)) {

					var axis = $(this.handles[i], this.element), padWrapper = 0;

					//Checking the correct pad and border
					padWrapper = /sw|ne|nw|se|n|s/.test(i) ? axis.outerHeight() : axis.outerWidth();

					//The padding type i have to apply...
					var padPos = [ 'padding',
						/ne|nw|n/.test(i) ? 'Top' :
						/se|sw|s/.test(i) ? 'Bottom' :
						/^e$/.test(i) ? 'Right' : 'Left' ].join("");

					target.css(padPos, padWrapper);

					this._proportionallyResize();

				}

				//TODO: What's that good for? There's not anything to be executed left
				if(!$(this.handles[i]).length)
					continue;

			}
		};

		//TODO: make renderAxis a prototype function
		this._renderAxis(this.element);

		this._handles = $('.ui-resizable-handle', this.element)
			.disableSelection();

		//Matching axis name
		this._handles.mouseover(function() {
			if (!self.resizing) {
				if (this.className)
					var axis = this.className.match(/ui-resizable-(se|sw|ne|nw|n|e|s|w)/i);
				//Axis, default = se
				self.axis = axis && axis[1] ? axis[1] : 'se';
			}
		});

		//If we want to auto hide the elements
		if (o.autoHide) {
			this._handles.hide();
			$(this.element)
				.addClass("ui-resizable-autohide")
				.hover(function() {
					$(this).removeClass("ui-resizable-autohide");
					self._handles.show();
				},
				function(){
					if (!self.resizing) {
						$(this).addClass("ui-resizable-autohide");
						self._handles.hide();
					}
				});
		}

		//Initialize the mouse interaction
		this._mouseInit();

	},

	destroy: function() {

		this._mouseDestroy();

		var _destroy = function(exp) {
			$(exp).removeClass("ui-resizable ui-resizable-disabled ui-resizable-resizing")
				.removeData("resizable").unbind(".resizable").find('.ui-resizable-handle').remove();
		};

		//TODO: Unwrap at same DOM position
		if (this.elementIsWrapper) {
			_destroy(this.element);
			var wrapper = this.element;
			wrapper.parent().append(
				this.originalElement.css({
					position: wrapper.css('position'),
					width: wrapper.outerWidth(),
					height: wrapper.outerHeight(),
					top: wrapper.css('top'),
					left: wrapper.css('left')
				})
			).end().remove();
		}

		this.originalElement.css('resize', this.originalResizeStyle);
		_destroy(this.originalElement);

	},

	_mouseCapture: function(event) {

		var handle = false;
		for(var i in this.handles) {
			if($(this.handles[i])[0] == event.target) handle = true;
		}

		return this.options.disabled || !!handle;

	},

	_mouseStart: function(event) {

		var o = this.options, iniPos = this.element.position(), el = this.element;

		this.resizing = true;
		this.documentScroll = { top: $(document).scrollTop(), left: $(document).scrollLeft() };

		// bugfix for http://dev.jquery.com/ticket/1749
		if (el.is('.ui-draggable') || (/absolute/).test(el.css('position'))) {
			el.css({ position: 'absolute', top: iniPos.top, left: iniPos.left });
		}

		//Opera fixing relative position
		if ($.browser.opera && (/relative/).test(el.css('position')))
			el.css({ position: 'relative', top: 'auto', left: 'auto' });

		this._renderProxy();

		var curleft = num(this.helper.css('left')), curtop = num(this.helper.css('top'));

		if (o.containment) {
			curleft += $(o.containment).scrollLeft() || 0;
			curtop += $(o.containment).scrollTop() || 0;
		}

		//Store needed variables
		this.offset = this.helper.offset();
		this.position = { left: curleft, top: curtop };
		this.size = this._helper ? { width: el.outerWidth(), height: el.outerHeight() } : { width: el.width(), height: el.height() };
		this.originalSize = this._helper ? { width: el.outerWidth(), height: el.outerHeight() } : { width: el.width(), height: el.height() };
		this.originalPosition = { left: curleft, top: curtop };
		this.sizeDiff = { width: el.outerWidth() - el.width(), height: el.outerHeight() - el.height() };
		this.originalMousePosition = { left: event.pageX, top: event.pageY };

		//Aspect Ratio
		this.aspectRatio = (typeof o.aspectRatio == 'number') ? o.aspectRatio : ((this.originalSize.width / this.originalSize.height) || 1);

	    var cursor = $('.ui-resizable-' + this.axis).css('cursor');
	    $('body').css('cursor', cursor == 'auto' ? this.axis + '-resize' : cursor);

		el.addClass("ui-resizable-resizing");
		this._propagate("start", event);
		return true;
	},

	_mouseDrag: function(event) {

		//Increase performance, avoid regex
		var el = this.helper, o = this.options, props = {},
			self = this, smp = this.originalMousePosition, a = this.axis;

		var dx = (event.pageX-smp.left)||0, dy = (event.pageY-smp.top)||0;
		var trigger = this._change[a];
		if (!trigger) return false;

		// Calculate the attrs that will be change
		var data = trigger.apply(this, [event, dx, dy]), ie6 = $.browser.msie && $.browser.version < 7, csdif = this.sizeDiff;

		if (this._aspectRatio || event.shiftKey)
			data = this._updateRatio(data, event);

		data = this._respectSize(data, event);

		// plugins callbacks need to be called first
		this._propagate("resize", event);

		el.css({
			top: this.position.top + "px", left: this.position.left + "px",
			width: this.size.width + "px", height: this.size.height + "px"
		});

		if (!this._helper && this._proportionallyResizeElements.length)
			this._proportionallyResize();

		this._updateCache(data);

		// calling the user callback at the end
		this._trigger('resize', event, this.ui());

		return false;
	},

	_mouseStop: function(event) {

		this.resizing = false;
		var o = this.options, self = this;

		if(this._helper) {
			var pr = this._proportionallyResizeElements, ista = pr.length && (/textarea/i).test(pr[0].nodeName),
						soffseth = ista && $.ui.hasScroll(pr[0], 'left') /* TODO - jump height */ ? 0 : self.sizeDiff.height,
							soffsetw = ista ? 0 : self.sizeDiff.width;

			var s = { width: (self.size.width - soffsetw), height: (self.size.height - soffseth) },
				left = (parseInt(self.element.css('left'), 10) + (self.position.left - self.originalPosition.left)) || null,
				top = (parseInt(self.element.css('top'), 10) + (self.position.top - self.originalPosition.top)) || null;

			if (!o.animate)
				this.element.css($.extend(s, { top: top, left: left }));

			self.helper.height(self.size.height);
			self.helper.width(self.size.width);

			if (this._helper && !o.animate) this._proportionallyResize();
		}

		$('body').css('cursor', 'auto');

		this.element.removeClass("ui-resizable-resizing");

		this._propagate("stop", event);

		if (this._helper) this.helper.remove();
		return false;

	},

	_updateCache: function(data) {
		var o = this.options;
		this.offset = this.helper.offset();
		if (isNumber(data.left)) this.position.left = data.left;
		if (isNumber(data.top)) this.position.top = data.top;
		if (isNumber(data.height)) this.size.height = data.height;
		if (isNumber(data.width)) this.size.width = data.width;
	},

	_updateRatio: function(data, event) {

		var o = this.options, cpos = this.position, csize = this.size, a = this.axis;

		if (data.height) data.width = (csize.height * this.aspectRatio);
		else if (data.width) data.height = (csize.width / this.aspectRatio);

		if (a == 'sw') {
			data.left = cpos.left + (csize.width - data.width);
			data.top = null;
		}
		if (a == 'nw') {
			data.top = cpos.top + (csize.height - data.height);
			data.left = cpos.left + (csize.width - data.width);
		}

		return data;
	},

	_respectSize: function(data, event) {

		var el = this.helper, o = this.options, pRatio = this._aspectRatio || event.shiftKey, a = this.axis,
				ismaxw = isNumber(data.width) && o.maxWidth && (o.maxWidth < data.width), ismaxh = isNumber(data.height) && o.maxHeight && (o.maxHeight < data.height),
					isminw = isNumber(data.width) && o.minWidth && (o.minWidth > data.width), isminh = isNumber(data.height) && o.minHeight && (o.minHeight > data.height);

		if (isminw) data.width = o.minWidth;
		if (isminh) data.height = o.minHeight;
		if (ismaxw) data.width = o.maxWidth;
		if (ismaxh) data.height = o.maxHeight;

		var dw = this.originalPosition.left + this.originalSize.width, dh = this.position.top + this.size.height;
		var cw = /sw|nw|w/.test(a), ch = /nw|ne|n/.test(a);

		if (isminw && cw) data.left = dw - o.minWidth;
		if (ismaxw && cw) data.left = dw - o.maxWidth;
		if (isminh && ch)	data.top = dh - o.minHeight;
		if (ismaxh && ch)	data.top = dh - o.maxHeight;

		// fixing jump error on top/left - bug #2330
		var isNotwh = !data.width && !data.height;
		if (isNotwh && !data.left && data.top) data.top = null;
		else if (isNotwh && !data.top && data.left) data.left = null;

		return data;
	},

	_proportionallyResize: function() {

		var o = this.options;
		if (!this._proportionallyResizeElements.length) return;
		var element = this.helper || this.element;

		for (var i=0; i < this._proportionallyResizeElements.length; i++) {

			var prel = this._proportionallyResizeElements[i];

			if (!this.borderDif) {
				var b = [prel.css('borderTopWidth'), prel.css('borderRightWidth'), prel.css('borderBottomWidth'), prel.css('borderLeftWidth')],
					p = [prel.css('paddingTop'), prel.css('paddingRight'), prel.css('paddingBottom'), prel.css('paddingLeft')];

				this.borderDif = $.map(b, function(v, i) {
					var border = parseInt(v,10)||0, padding = parseInt(p[i],10)||0;
					return border + padding;
				});
			}

			if ($.browser.msie && !(!($(element).is(':hidden') || $(element).parents(':hidden').length)))
				continue;

			prel.css({
				height: (element.height() - this.borderDif[0] - this.borderDif[2]) || 0,
				width: (element.width() - this.borderDif[1] - this.borderDif[3]) || 0
			});

		};

	},

	_renderProxy: function() {

		var el = this.element, o = this.options;
		this.elementOffset = el.offset();

		if(this._helper) {

			this.helper = this.helper || $('<div style="overflow:hidden;"></div>');

			// fix ie6 offset TODO: This seems broken
			var ie6 = $.browser.msie && $.browser.version < 7, ie6offset = (ie6 ? 1 : 0),
			pxyoffset = ( ie6 ? 2 : -1 );

			this.helper.addClass(this._helper).css({
				width: this.element.outerWidth() + pxyoffset,
				height: this.element.outerHeight() + pxyoffset,
				position: 'absolute',
				left: this.elementOffset.left - ie6offset +'px',
				top: this.elementOffset.top - ie6offset +'px',
				zIndex: ++o.zIndex //TODO: Don't modify option
			});

			this.helper
				.appendTo("body")
				.disableSelection();

		} else {
			this.helper = this.element;
		}

	},

	_change: {
		e: function(event, dx, dy) {
			return { width: this.originalSize.width + dx };
		},
		w: function(event, dx, dy) {
			var o = this.options, cs = this.originalSize, sp = this.originalPosition;
			return { left: sp.left + dx, width: cs.width - dx };
		},
		n: function(event, dx, dy) {
			var o = this.options, cs = this.originalSize, sp = this.originalPosition;
			return { top: sp.top + dy, height: cs.height - dy };
		},
		s: function(event, dx, dy) {
			return { height: this.originalSize.height + dy };
		},
		se: function(event, dx, dy) {
			return $.extend(this._change.s.apply(this, arguments), this._change.e.apply(this, [event, dx, dy]));
		},
		sw: function(event, dx, dy) {
			return $.extend(this._change.s.apply(this, arguments), this._change.w.apply(this, [event, dx, dy]));
		},
		ne: function(event, dx, dy) {
			return $.extend(this._change.n.apply(this, arguments), this._change.e.apply(this, [event, dx, dy]));
		},
		nw: function(event, dx, dy) {
			return $.extend(this._change.n.apply(this, arguments), this._change.w.apply(this, [event, dx, dy]));
		}
	},

	_propagate: function(n, event) {
		$.ui.plugin.call(this, n, [event, this.ui()]);
		(n != "resize" && this._trigger(n, event, this.ui()));
	},

	plugins: {},

	ui: function() {
		return {
			originalElement: this.originalElement,
			element: this.element,
			helper: this.helper,
			position: this.position,
			size: this.size,
			originalSize: this.originalSize,
			originalPosition: this.originalPosition
		};
	}

}));

$.extend($.ui.resizable, {
	version: "1.7.2",
	eventPrefix: "resize",
	defaults: {
		alsoResize: false,
		animate: false,
		animateDuration: "slow",
		animateEasing: "swing",
		aspectRatio: false,
		autoHide: false,
		cancel: ":input,option",
		containment: false,
		delay: 0,
		distance: 1,
		ghost: false,
		grid: false,
		handles: "e,s,se",
		helper: false,
		maxHeight: null,
		maxWidth: null,
		minHeight: 10,
		minWidth: 10,
		zIndex: 1000
	}
});

/*
 * Resizable Extensions
 */

$.ui.plugin.add("resizable", "alsoResize", {

	start: function(event, ui) {

		var self = $(this).data("resizable"), o = self.options;

		_store = function(exp) {
			$(exp).each(function() {
				$(this).data("resizable-alsoresize", {
					width: parseInt($(this).width(), 10), height: parseInt($(this).height(), 10),
					left: parseInt($(this).css('left'), 10), top: parseInt($(this).css('top'), 10)
				});
			});
		};

		if (typeof(o.alsoResize) == 'object' && !o.alsoResize.parentNode) {
			if (o.alsoResize.length) { o.alsoResize = o.alsoResize[0];	_store(o.alsoResize); }
			else { $.each(o.alsoResize, function(exp, c) { _store(exp); }); }
		}else{
			_store(o.alsoResize);
		}
	},

	resize: function(event, ui){
		var self = $(this).data("resizable"), o = self.options, os = self.originalSize, op = self.originalPosition;

		var delta = {
			height: (self.size.height - os.height) || 0, width: (self.size.width - os.width) || 0,
			top: (self.position.top - op.top) || 0, left: (self.position.left - op.left) || 0
		},

		_alsoResize = function(exp, c) {
			$(exp).each(function() {
				var el = $(this), start = $(this).data("resizable-alsoresize"), style = {}, css = c && c.length ? c : ['width', 'height', 'top', 'left'];

				$.each(css || ['width', 'height', 'top', 'left'], function(i, prop) {
					var sum = (start[prop]||0) + (delta[prop]||0);
					if (sum && sum >= 0)
						style[prop] = sum || null;
				});

				//Opera fixing relative position
				if (/relative/.test(el.css('position')) && $.browser.opera) {
					self._revertToRelativePosition = true;
					el.css({ position: 'absolute', top: 'auto', left: 'auto' });
				}

				el.css(style);
			});
		};

		if (typeof(o.alsoResize) == 'object' && !o.alsoResize.nodeType) {
			$.each(o.alsoResize, function(exp, c) { _alsoResize(exp, c); });
		}else{
			_alsoResize(o.alsoResize);
		}
	},

	stop: function(event, ui){
		var self = $(this).data("resizable");

		//Opera fixing relative position
		if (self._revertToRelativePosition && $.browser.opera) {
			self._revertToRelativePosition = false;
			el.css({ position: 'relative' });
		}

		$(this).removeData("resizable-alsoresize-start");
	}
});

$.ui.plugin.add("resizable", "animate", {

	stop: function(event, ui) {
		var self = $(this).data("resizable"), o = self.options;

		var pr = self._proportionallyResizeElements, ista = pr.length && (/textarea/i).test(pr[0].nodeName),
					soffseth = ista && $.ui.hasScroll(pr[0], 'left') /* TODO - jump height */ ? 0 : self.sizeDiff.height,
						soffsetw = ista ? 0 : self.sizeDiff.width;

		var style = { width: (self.size.width - soffsetw), height: (self.size.height - soffseth) },
					left = (parseInt(self.element.css('left'), 10) + (self.position.left - self.originalPosition.left)) || null,
						top = (parseInt(self.element.css('top'), 10) + (self.position.top - self.originalPosition.top)) || null;

		self.element.animate(
			$.extend(style, top && left ? { top: top, left: left } : {}), {
				duration: o.animateDuration,
				easing: o.animateEasing,
				step: function() {

					var data = {
						width: parseInt(self.element.css('width'), 10),
						height: parseInt(self.element.css('height'), 10),
						top: parseInt(self.element.css('top'), 10),
						left: parseInt(self.element.css('left'), 10)
					};

					if (pr && pr.length) $(pr[0]).css({ width: data.width, height: data.height });

					// propagating resize, and updating values for each animation step
					self._updateCache(data);
					self._propagate("resize", event);

				}
			}
		);
	}

});

$.ui.plugin.add("resizable", "containment", {

	start: function(event, ui) {
		var self = $(this).data("resizable"), o = self.options, el = self.element;
		var oc = o.containment,	ce = (oc instanceof $) ? oc.get(0) : (/parent/.test(oc)) ? el.parent().get(0) : oc;
		if (!ce) return;

		self.containerElement = $(ce);

		if (/document/.test(oc) || oc == document) {
			self.containerOffset = { left: 0, top: 0 };
			self.containerPosition = { left: 0, top: 0 };

			self.parentData = {
				element: $(document), left: 0, top: 0,
				width: $(document).width(), height: $(document).height() || document.body.parentNode.scrollHeight
			};
		}

		// i'm a node, so compute top, left, right, bottom
		else {
			var element = $(ce), p = [];
			$([ "Top", "Right", "Left", "Bottom" ]).each(function(i, name) { p[i] = num(element.css("padding" + name)); });

			self.containerOffset = element.offset();
			self.containerPosition = element.position();
			self.containerSize = { height: (element.innerHeight() - p[3]), width: (element.innerWidth() - p[1]) };

			var co = self.containerOffset, ch = self.containerSize.height,	cw = self.containerSize.width,
						width = ($.ui.hasScroll(ce, "left") ? ce.scrollWidth : cw ), height = ($.ui.hasScroll(ce) ? ce.scrollHeight : ch);

			self.parentData = {
				element: ce, left: co.left, top: co.top, width: width, height: height
			};
		}
	},

	resize: function(event, ui) {
		var self = $(this).data("resizable"), o = self.options,
				ps = self.containerSize, co = self.containerOffset, cs = self.size, cp = self.position,
				pRatio = self._aspectRatio || event.shiftKey, cop = { top:0, left:0 }, ce = self.containerElement;

		if (ce[0] != document && (/static/).test(ce.css('position'))) cop = co;

		if (cp.left < (self._helper ? co.left : 0)) {
			self.size.width = self.size.width + (self._helper ? (self.position.left - co.left) : (self.position.left - cop.left));
			if (pRatio) self.size.height = self.size.width / o.aspectRatio;
			self.position.left = o.helper ? co.left : 0;
		}

		if (cp.top < (self._helper ? co.top : 0)) {
			self.size.height = self.size.height + (self._helper ? (self.position.top - co.top) : self.position.top);
			if (pRatio) self.size.width = self.size.height * o.aspectRatio;
			self.position.top = self._helper ? co.top : 0;
		}

		self.offset.left = self.parentData.left+self.position.left;
		self.offset.top = self.parentData.top+self.position.top;

		var woset = Math.abs( (self._helper ? self.offset.left - cop.left : (self.offset.left - cop.left)) + self.sizeDiff.width ),
					hoset = Math.abs( (self._helper ? self.offset.top - cop.top : (self.offset.top - co.top)) + self.sizeDiff.height );

		var isParent = self.containerElement.get(0) == self.element.parent().get(0),
		    isOffsetRelative = /relative|absolute/.test(self.containerElement.css('position'));

		if(isParent && isOffsetRelative) woset -= self.parentData.left;

		if (woset + self.size.width >= self.parentData.width) {
			self.size.width = self.parentData.width - woset;
			if (pRatio) self.size.height = self.size.width / self.aspectRatio;
		}

		if (hoset + self.size.height >= self.parentData.height) {
			self.size.height = self.parentData.height - hoset;
			if (pRatio) self.size.width = self.size.height * self.aspectRatio;
		}
	},

	stop: function(event, ui){
		var self = $(this).data("resizable"), o = self.options, cp = self.position,
				co = self.containerOffset, cop = self.containerPosition, ce = self.containerElement;

		var helper = $(self.helper), ho = helper.offset(), w = helper.outerWidth() - self.sizeDiff.width, h = helper.outerHeight() - self.sizeDiff.height;

		if (self._helper && !o.animate && (/relative/).test(ce.css('position')))
			$(this).css({ left: ho.left - cop.left - co.left, width: w, height: h });

		if (self._helper && !o.animate && (/static/).test(ce.css('position')))
			$(this).css({ left: ho.left - cop.left - co.left, width: w, height: h });

	}
});

$.ui.plugin.add("resizable", "ghost", {

	start: function(event, ui) {

		var self = $(this).data("resizable"), o = self.options, cs = self.size;

		self.ghost = self.originalElement.clone();
		self.ghost
			.css({ opacity: .25, display: 'block', position: 'relative', height: cs.height, width: cs.width, margin: 0, left: 0, top: 0 })
			.addClass('ui-resizable-ghost')
			.addClass(typeof o.ghost == 'string' ? o.ghost : '');

		self.ghost.appendTo(self.helper);

	},

	resize: function(event, ui){
		var self = $(this).data("resizable"), o = self.options;
		if (self.ghost) self.ghost.css({ position: 'relative', height: self.size.height, width: self.size.width });
	},

	stop: function(event, ui){
		var self = $(this).data("resizable"), o = self.options;
		if (self.ghost && self.helper) self.helper.get(0).removeChild(self.ghost.get(0));
	}

});

$.ui.plugin.add("resizable", "grid", {

	resize: function(event, ui) {
		var self = $(this).data("resizable"), o = self.options, cs = self.size, os = self.originalSize, op = self.originalPosition, a = self.axis, ratio = o._aspectRatio || event.shiftKey;
		o.grid = typeof o.grid == "number" ? [o.grid, o.grid] : o.grid;
		var ox = Math.round((cs.width - os.width) / (o.grid[0]||1)) * (o.grid[0]||1), oy = Math.round((cs.height - os.height) / (o.grid[1]||1)) * (o.grid[1]||1);

		if (/^(se|s|e)$/.test(a)) {
			self.size.width = os.width + ox;
			self.size.height = os.height + oy;
		}
		else if (/^(ne)$/.test(a)) {
			self.size.width = os.width + ox;
			self.size.height = os.height + oy;
			self.position.top = op.top - oy;
		}
		else if (/^(sw)$/.test(a)) {
			self.size.width = os.width + ox;
			self.size.height = os.height + oy;
			self.position.left = op.left - ox;
		}
		else {
			self.size.width = os.width + ox;
			self.size.height = os.height + oy;
			self.position.top = op.top - oy;
			self.position.left = op.left - ox;
		}
	}

});

var num = function(v) {
	return parseInt(v, 10) || 0;
};

var isNumber = function(value) {
	return !isNaN(parseInt(value, 10));
};

})(jQuery);
/*
 * jQuery UI Selectable 1.7.2
 *
 * Copyright (c) 2009 AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT (MIT-LICENSE.txt)
 * and GPL (GPL-LICENSE.txt) licenses.
 *
 * http://docs.jquery.com/UI/Selectables
 *
 * Depends:
 *	ui.core.js
 */
(function($) {

$.widget("ui.selectable", $.extend({}, $.ui.mouse, {

	_init: function() {
		var self = this;

		this.element.addClass("ui-selectable");

		this.dragged = false;

		// cache selectee children based on filter
		var selectees;
		this.refresh = function() {
			selectees = $(self.options.filter, self.element[0]);
			selectees.each(function() {
				var $this = $(this);
				var pos = $this.offset();
				$.data(this, "selectable-item", {
					element: this,
					$element: $this,
					left: pos.left,
					top: pos.top,
					right: pos.left + $this.outerWidth(),
					bottom: pos.top + $this.outerHeight(),
					startselected: false,
					selected: $this.hasClass('ui-selected'),
					selecting: $this.hasClass('ui-selecting'),
					unselecting: $this.hasClass('ui-unselecting')
				});
			});
		};
		this.refresh();

		this.selectees = selectees.addClass("ui-selectee");

		this._mouseInit();

		this.helper = $(document.createElement('div'))
			.css({border:'1px dotted black'})
			.addClass("ui-selectable-helper");
	},

	destroy: function() {
		this.element
			.removeClass("ui-selectable ui-selectable-disabled")
			.removeData("selectable")
			.unbind(".selectable");
		this._mouseDestroy();
	},

	_mouseStart: function(event) {
		var self = this;

		this.opos = [event.pageX, event.pageY];

		if (this.options.disabled)
			return;

		var options = this.options;

		this.selectees = $(options.filter, this.element[0]);

		this._trigger("start", event);

		$(options.appendTo).append(this.helper);
		// position helper (lasso)
		this.helper.css({
			"z-index": 100,
			"position": "absolute",
			"left": event.clientX,
			"top": event.clientY,
			"width": 0,
			"height": 0
		});

		if (options.autoRefresh) {
			this.refresh();
		}

		this.selectees.filter('.ui-selected').each(function() {
			var selectee = $.data(this, "selectable-item");
			selectee.startselected = true;
			if (!event.metaKey) {
				selectee.$element.removeClass('ui-selected');
				selectee.selected = false;
				selectee.$element.addClass('ui-unselecting');
				selectee.unselecting = true;
				// selectable UNSELECTING callback
				self._trigger("unselecting", event, {
					unselecting: selectee.element
				});
			}
		});

		$(event.target).parents().andSelf().each(function() {
			var selectee = $.data(this, "selectable-item");
			if (selectee) {
				selectee.$element.removeClass("ui-unselecting").addClass('ui-selecting');
				selectee.unselecting = false;
				selectee.selecting = true;
				selectee.selected = true;
				// selectable SELECTING callback
				self._trigger("selecting", event, {
					selecting: selectee.element
				});
				return false;
			}
		});

	},

	_mouseDrag: function(event) {
		var self = this;
		this.dragged = true;

		if (this.options.disabled)
			return;

		var options = this.options;

		var x1 = this.opos[0], y1 = this.opos[1], x2 = event.pageX, y2 = event.pageY;
		if (x1 > x2) { var tmp = x2; x2 = x1; x1 = tmp; }
		if (y1 > y2) { var tmp = y2; y2 = y1; y1 = tmp; }
		this.helper.css({left: x1, top: y1, width: x2-x1, height: y2-y1});

		this.selectees.each(function() {
			var selectee = $.data(this, "selectable-item");
			//prevent helper from being selected if appendTo: selectable
			if (!selectee || selectee.element == self.element[0])
				return;
			var hit = false;
			if (options.tolerance == 'touch') {
				hit = ( !(selectee.left > x2 || selectee.right < x1 || selectee.top > y2 || selectee.bottom < y1) );
			} else if (options.tolerance == 'fit') {
				hit = (selectee.left > x1 && selectee.right < x2 && selectee.top > y1 && selectee.bottom < y2);
			}

			if (hit) {
				// SELECT
				if (selectee.selected) {
					selectee.$element.removeClass('ui-selected');
					selectee.selected = false;
				}
				if (selectee.unselecting) {
					selectee.$element.removeClass('ui-unselecting');
					selectee.unselecting = false;
				}
				if (!selectee.selecting) {
					selectee.$element.addClass('ui-selecting');
					selectee.selecting = true;
					// selectable SELECTING callback
					self._trigger("selecting", event, {
						selecting: selectee.element
					});
				}
			} else {
				// UNSELECT
				if (selectee.selecting) {
					if (event.metaKey && selectee.startselected) {
						selectee.$element.removeClass('ui-selecting');
						selectee.selecting = false;
						selectee.$element.addClass('ui-selected');
						selectee.selected = true;
					} else {
						selectee.$element.removeClass('ui-selecting');
						selectee.selecting = false;
						if (selectee.startselected) {
							selectee.$element.addClass('ui-unselecting');
							selectee.unselecting = true;
						}
						// selectable UNSELECTING callback
						self._trigger("unselecting", event, {
							unselecting: selectee.element
						});
					}
				}
				if (selectee.selected) {
					if (!event.metaKey && !selectee.startselected) {
						selectee.$element.removeClass('ui-selected');
						selectee.selected = false;

						selectee.$element.addClass('ui-unselecting');
						selectee.unselecting = true;
						// selectable UNSELECTING callback
						self._trigger("unselecting", event, {
							unselecting: selectee.element
						});
					}
				}
			}
		});

		return false;
	},

	_mouseStop: function(event) {
		var self = this;

		this.dragged = false;

		var options = this.options;

		$('.ui-unselecting', this.element[0]).each(function() {
			var selectee = $.data(this, "selectable-item");
			selectee.$element.removeClass('ui-unselecting');
			selectee.unselecting = false;
			selectee.startselected = false;
			self._trigger("unselected", event, {
				unselected: selectee.element
			});
		});
		$('.ui-selecting', this.element[0]).each(function() {
			var selectee = $.data(this, "selectable-item");
			selectee.$element.removeClass('ui-selecting').addClass('ui-selected');
			selectee.selecting = false;
			selectee.selected = true;
			selectee.startselected = true;
			self._trigger("selected", event, {
				selected: selectee.element
			});
		});
		this._trigger("stop", event);

		this.helper.remove();

		return false;
	}

}));

$.extend($.ui.selectable, {
	version: "1.7.2",
	defaults: {
		appendTo: 'body',
		autoRefresh: true,
		cancel: ":input,option",
		delay: 0,
		distance: 0,
		filter: '*',
		tolerance: 'touch'
	}
});

})(jQuery);
/*
 * jQuery UI Sortable 1.7.2
 *
 * Copyright (c) 2009 AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT (MIT-LICENSE.txt)
 * and GPL (GPL-LICENSE.txt) licenses.
 *
 * http://docs.jquery.com/UI/Sortables
 *
 * Depends:
 *	ui.core.js
 */
(function($) {

$.widget("ui.sortable", $.extend({}, $.ui.mouse, {
	_init: function() {

		var o = this.options;
		this.containerCache = {};
		this.element.addClass("ui-sortable");

		//Get the items
		this.refresh();

		//Let's determine if the items are floating
		this.floating = this.items.length ? (/left|right/).test(this.items[0].item.css('float')) : false;

		//Let's determine the parent's offset
		this.offset = this.element.offset();

		//Initialize mouse events for interaction
		this._mouseInit();

	},

	destroy: function() {
		this.element
			.removeClass("ui-sortable ui-sortable-disabled")
			.removeData("sortable")
			.unbind(".sortable");
		this._mouseDestroy();

		for ( var i = this.items.length - 1; i >= 0; i-- )
			this.items[i].item.removeData("sortable-item");
	},

	_mouseCapture: function(event, overrideHandle) {

		if (this.reverting) {
			return false;
		}

		if(this.options.disabled || this.options.type == 'static') return false;

		//We have to refresh the items data once first
		this._refreshItems(event);

		//Find out if the clicked node (or one of its parents) is a actual item in this.items
		var currentItem = null, self = this, nodes = $(event.target).parents().each(function() {
			if($.data(this, 'sortable-item') == self) {
				currentItem = $(this);
				return false;
			}
		});
		if($.data(event.target, 'sortable-item') == self) currentItem = $(event.target);

		if(!currentItem) return false;
		if(this.options.handle && !overrideHandle) {
			var validHandle = false;

			$(this.options.handle, currentItem).find("*").andSelf().each(function() { if(this == event.target) validHandle = true; });
			if(!validHandle) return false;
		}

		this.currentItem = currentItem;
		this._removeCurrentsFromItems();
		return true;

	},

	_mouseStart: function(event, overrideHandle, noActivation) {

		var o = this.options, self = this;
		this.currentContainer = this;

		//We only need to call refreshPositions, because the refreshItems call has been moved to mouseCapture
		this.refreshPositions();

		//Create and append the visible helper
		this.helper = this._createHelper(event);

		//Cache the helper size
		this._cacheHelperProportions();

		/*
		 * - Position generation -
		 * This block generates everything position related - it's the core of draggables.
		 */

		//Cache the margins of the original element
		this._cacheMargins();

		//Get the next scrolling parent
		this.scrollParent = this.helper.scrollParent();

		//The element's absolute position on the page minus margins
		this.offset = this.currentItem.offset();
		this.offset = {
			top: this.offset.top - this.margins.top,
			left: this.offset.left - this.margins.left
		};

		// Only after we got the offset, we can change the helper's position to absolute
		// TODO: Still need to figure out a way to make relative sorting possible
		this.helper.css("position", "absolute");
		this.cssPosition = this.helper.css("position");

		$.extend(this.offset, {
			click: { //Where the click happened, relative to the element
				left: event.pageX - this.offset.left,
				top: event.pageY - this.offset.top
			},
			parent: this._getParentOffset(),
			relative: this._getRelativeOffset() //This is a relative to absolute position minus the actual position calculation - only used for relative positioned helper
		});

		//Generate the original position
		this.originalPosition = this._generatePosition(event);
		this.originalPageX = event.pageX;
		this.originalPageY = event.pageY;

		//Adjust the mouse offset relative to the helper if 'cursorAt' is supplied
		if(o.cursorAt)
			this._adjustOffsetFromHelper(o.cursorAt);

		//Cache the former DOM position
		this.domPosition = { prev: this.currentItem.prev()[0], parent: this.currentItem.parent()[0] };

		//If the helper is not the original, hide the original so it's not playing any role during the drag, won't cause anything bad this way
		if(this.helper[0] != this.currentItem[0]) {
			this.currentItem.hide();
		}

		//Create the placeholder
		this._createPlaceholder();

		//Set a containment if given in the options
		if(o.containment)
			this._setContainment();

		if(o.cursor) { // cursor option
			if ($('body').css("cursor")) this._storedCursor = $('body').css("cursor");
			$('body').css("cursor", o.cursor);
		}

		if(o.opacity) { // opacity option
			if (this.helper.css("opacity")) this._storedOpacity = this.helper.css("opacity");
			this.helper.css("opacity", o.opacity);
		}

		if(o.zIndex) { // zIndex option
			if (this.helper.css("zIndex")) this._storedZIndex = this.helper.css("zIndex");
			this.helper.css("zIndex", o.zIndex);
		}

		//Prepare scrolling
		if(this.scrollParent[0] != document && this.scrollParent[0].tagName != 'HTML')
			this.overflowOffset = this.scrollParent.offset();

		//Call callbacks
		this._trigger("start", event, this._uiHash());

		//Recache the helper size
		if(!this._preserveHelperProportions)
			this._cacheHelperProportions();


		//Post 'activate' events to possible containers
		if(!noActivation) {
			 for (var i = this.containers.length - 1; i >= 0; i--) { this.containers[i]._trigger("activate", event, self._uiHash(this)); }
		}

		//Prepare possible droppables
		if($.ui.ddmanager)
			$.ui.ddmanager.current = this;

		if ($.ui.ddmanager && !o.dropBehaviour)
			$.ui.ddmanager.prepareOffsets(this, event);

		this.dragging = true;

		this.helper.addClass("ui-sortable-helper");
		this._mouseDrag(event); //Execute the drag once - this causes the helper not to be visible before getting its correct position
		return true;

	},

	_mouseDrag: function(event) {

		//Compute the helpers position
		this.position = this._generatePosition(event);
		this.positionAbs = this._convertPositionTo("absolute");

		if (!this.lastPositionAbs) {
			this.lastPositionAbs = this.positionAbs;
		}

		//Do scrolling
		if(this.options.scroll) {
			var o = this.options, scrolled = false;
			if(this.scrollParent[0] != document && this.scrollParent[0].tagName != 'HTML') {

				if((this.overflowOffset.top + this.scrollParent[0].offsetHeight) - event.pageY < o.scrollSensitivity)
					this.scrollParent[0].scrollTop = scrolled = this.scrollParent[0].scrollTop + o.scrollSpeed;
				else if(event.pageY - this.overflowOffset.top < o.scrollSensitivity)
					this.scrollParent[0].scrollTop = scrolled = this.scrollParent[0].scrollTop - o.scrollSpeed;

				if((this.overflowOffset.left + this.scrollParent[0].offsetWidth) - event.pageX < o.scrollSensitivity)
					this.scrollParent[0].scrollLeft = scrolled = this.scrollParent[0].scrollLeft + o.scrollSpeed;
				else if(event.pageX - this.overflowOffset.left < o.scrollSensitivity)
					this.scrollParent[0].scrollLeft = scrolled = this.scrollParent[0].scrollLeft - o.scrollSpeed;

			} else {

				if(event.pageY - $(document).scrollTop() < o.scrollSensitivity)
					scrolled = $(document).scrollTop($(document).scrollTop() - o.scrollSpeed);
				else if($(window).height() - (event.pageY - $(document).scrollTop()) < o.scrollSensitivity)
					scrolled = $(document).scrollTop($(document).scrollTop() + o.scrollSpeed);

				if(event.pageX - $(document).scrollLeft() < o.scrollSensitivity)
					scrolled = $(document).scrollLeft($(document).scrollLeft() - o.scrollSpeed);
				else if($(window).width() - (event.pageX - $(document).scrollLeft()) < o.scrollSensitivity)
					scrolled = $(document).scrollLeft($(document).scrollLeft() + o.scrollSpeed);

			}

			if(scrolled !== false && $.ui.ddmanager && !o.dropBehaviour)
				$.ui.ddmanager.prepareOffsets(this, event);
		}

		//Regenerate the absolute position used for position checks
		this.positionAbs = this._convertPositionTo("absolute");

		//Set the helper position
		if(!this.options.axis || this.options.axis != "y") this.helper[0].style.left = this.position.left+'px';
		if(!this.options.axis || this.options.axis != "x") this.helper[0].style.top = this.position.top+'px';

		//Rearrange
		for (var i = this.items.length - 1; i >= 0; i--) {

			//Cache variables and intersection, continue if no intersection
			var item = this.items[i], itemElement = item.item[0], intersection = this._intersectsWithPointer(item);
			if (!intersection) continue;

			if(itemElement != this.currentItem[0] //cannot intersect with itself
				&&	this.placeholder[intersection == 1 ? "next" : "prev"]()[0] != itemElement //no useless actions that have been done before
				&&	!$.ui.contains(this.placeholder[0], itemElement) //no action if the item moved is the parent of the item checked
				&& (this.options.type == 'semi-dynamic' ? !$.ui.contains(this.element[0], itemElement) : true)
			) {

				this.direction = intersection == 1 ? "down" : "up";

				if (this.options.tolerance == "pointer" || this._intersectsWithSides(item)) {
					this._rearrange(event, item);
				} else {
					break;
				}

				this._trigger("change", event, this._uiHash());
				break;
			}
		}

		//Post events to containers
		this._contactContainers(event);

		//Interconnect with droppables
		if($.ui.ddmanager) $.ui.ddmanager.drag(this, event);

		//Call callbacks
		this._trigger('sort', event, this._uiHash());

		this.lastPositionAbs = this.positionAbs;
		return false;

	},

	_mouseStop: function(event, noPropagation) {

		if(!event) return;

		//If we are using droppables, inform the manager about the drop
		if ($.ui.ddmanager && !this.options.dropBehaviour)
			$.ui.ddmanager.drop(this, event);

		if(this.options.revert) {
			var self = this;
			var cur = self.placeholder.offset();

			self.reverting = true;

			$(this.helper).animate({
				left: cur.left - this.offset.parent.left - self.margins.left + (this.offsetParent[0] == document.body ? 0 : this.offsetParent[0].scrollLeft),
				top: cur.top - this.offset.parent.top - self.margins.top + (this.offsetParent[0] == document.body ? 0 : this.offsetParent[0].scrollTop)
			}, parseInt(this.options.revert, 10) || 500, function() {
				self._clear(event);
			});
		} else {
			this._clear(event, noPropagation);
		}

		return false;

	},

	cancel: function() {

		var self = this;

		if(this.dragging) {

			this._mouseUp();

			if(this.options.helper == "original")
				this.currentItem.css(this._storedCSS).removeClass("ui-sortable-helper");
			else
				this.currentItem.show();

			//Post deactivating events to containers
			for (var i = this.containers.length - 1; i >= 0; i--){
				this.containers[i]._trigger("deactivate", null, self._uiHash(this));
				if(this.containers[i].containerCache.over) {
					this.containers[i]._trigger("out", null, self._uiHash(this));
					this.containers[i].containerCache.over = 0;
				}
			}

		}

		//$(this.placeholder[0]).remove(); would have been the jQuery way - unfortunately, it unbinds ALL events from the original node!
		if(this.placeholder[0].parentNode) this.placeholder[0].parentNode.removeChild(this.placeholder[0]);
		if(this.options.helper != "original" && this.helper && this.helper[0].parentNode) this.helper.remove();

		$.extend(this, {
			helper: null,
			dragging: false,
			reverting: false,
			_noFinalSort: null
		});

		if(this.domPosition.prev) {
			$(this.domPosition.prev).after(this.currentItem);
		} else {
			$(this.domPosition.parent).prepend(this.currentItem);
		}

		return true;

	},

	serialize: function(o) {

		var items = this._getItemsAsjQuery(o && o.connected);
		var str = []; o = o || {};

		$(items).each(function() {
			var res = ($(o.item || this).attr(o.attribute || 'id') || '').match(o.expression || (/(.+)[-=_](.+)/));
			if(res) str.push((o.key || res[1]+'[]')+'='+(o.key && o.expression ? res[1] : res[2]));
		});

		return str.join('&');

	},

	toArray: function(o) {

		var items = this._getItemsAsjQuery(o && o.connected);
		var ret = []; o = o || {};

		items.each(function() { ret.push($(o.item || this).attr(o.attribute || 'id') || ''); });
		return ret;

	},

	/* Be careful with the following core functions */
	_intersectsWith: function(item) {

		var x1 = this.positionAbs.left,
			x2 = x1 + this.helperProportions.width,
			y1 = this.positionAbs.top,
			y2 = y1 + this.helperProportions.height;

		var l = item.left,
			r = l + item.width,
			t = item.top,
			b = t + item.height;

		var dyClick = this.offset.click.top,
			dxClick = this.offset.click.left;

		var isOverElement = (y1 + dyClick) > t && (y1 + dyClick) < b && (x1 + dxClick) > l && (x1 + dxClick) < r;

		if(	   this.options.tolerance == "pointer"
			|| this.options.forcePointerForContainers
			|| (this.options.tolerance != "pointer" && this.helperProportions[this.floating ? 'width' : 'height'] > item[this.floating ? 'width' : 'height'])
		) {
			return isOverElement;
		} else {

			return (l < x1 + (this.helperProportions.width / 2) // Right Half
				&& x2 - (this.helperProportions.width / 2) < r // Left Half
				&& t < y1 + (this.helperProportions.height / 2) // Bottom Half
				&& y2 - (this.helperProportions.height / 2) < b ); // Top Half

		}
	},

	_intersectsWithPointer: function(item) {

		var isOverElementHeight = $.ui.isOverAxis(this.positionAbs.top + this.offset.click.top, item.top, item.height),
			isOverElementWidth = $.ui.isOverAxis(this.positionAbs.left + this.offset.click.left, item.left, item.width),
			isOverElement = isOverElementHeight && isOverElementWidth,
			verticalDirection = this._getDragVerticalDirection(),
			horizontalDirection = this._getDragHorizontalDirection();

		if (!isOverElement)
			return false;

		return this.floating ?
			( ((horizontalDirection && horizontalDirection == "right") || verticalDirection == "down") ? 2 : 1 )
			: ( verticalDirection && (verticalDirection == "down" ? 2 : 1) );

	},

	_intersectsWithSides: function(item) {

		var isOverBottomHalf = $.ui.isOverAxis(this.positionAbs.top + this.offset.click.top, item.top + (item.height/2), item.height),
			isOverRightHalf = $.ui.isOverAxis(this.positionAbs.left + this.offset.click.left, item.left + (item.width/2), item.width),
			verticalDirection = this._getDragVerticalDirection(),
			horizontalDirection = this._getDragHorizontalDirection();

		if (this.floating && horizontalDirection) {
			return ((horizontalDirection == "right" && isOverRightHalf) || (horizontalDirection == "left" && !isOverRightHalf));
		} else {
			return verticalDirection && ((verticalDirection == "down" && isOverBottomHalf) || (verticalDirection == "up" && !isOverBottomHalf));
		}

	},

	_getDragVerticalDirection: function() {
		var delta = this.positionAbs.top - this.lastPositionAbs.top;
		return delta != 0 && (delta > 0 ? "down" : "up");
	},

	_getDragHorizontalDirection: function() {
		var delta = this.positionAbs.left - this.lastPositionAbs.left;
		return delta != 0 && (delta > 0 ? "right" : "left");
	},

	refresh: function(event) {
		this._refreshItems(event);
		this.refreshPositions();
	},

	_connectWith: function() {
		var options = this.options;
		return options.connectWith.constructor == String
			? [options.connectWith]
			: options.connectWith;
	},

	_getItemsAsjQuery: function(connected) {

		var self = this;
		var items = [];
		var queries = [];
		var connectWith = this._connectWith();

		if(connectWith && connected) {
			for (var i = connectWith.length - 1; i >= 0; i--){
				var cur = $(connectWith[i]);
				for (var j = cur.length - 1; j >= 0; j--){
					var inst = $.data(cur[j], 'sortable');
					if(inst && inst != this && !inst.options.disabled) {
						queries.push([$.isFunction(inst.options.items) ? inst.options.items.call(inst.element) : $(inst.options.items, inst.element).not(".ui-sortable-helper"), inst]);
					}
				};
			};
		}

		queries.push([$.isFunction(this.options.items) ? this.options.items.call(this.element, null, { options: this.options, item: this.currentItem }) : $(this.options.items, this.element).not(".ui-sortable-helper"), this]);

		for (var i = queries.length - 1; i >= 0; i--){
			queries[i][0].each(function() {
				items.push(this);
			});
		};

		return $(items);

	},

	_removeCurrentsFromItems: function() {

		var list = this.currentItem.find(":data(sortable-item)");

		for (var i=0; i < this.items.length; i++) {

			for (var j=0; j < list.length; j++) {
				if(list[j] == this.items[i].item[0])
					this.items.splice(i,1);
			};

		};

	},

	_refreshItems: function(event) {

		this.items = [];
		this.containers = [this];
		var items = this.items;
		var self = this;
		var queries = [[$.isFunction(this.options.items) ? this.options.items.call(this.element[0], event, { item: this.currentItem }) : $(this.options.items, this.element), this]];
		var connectWith = this._connectWith();

		if(connectWith) {
			for (var i = connectWith.length - 1; i >= 0; i--){
				var cur = $(connectWith[i]);
				for (var j = cur.length - 1; j >= 0; j--){
					var inst = $.data(cur[j], 'sortable');
					if(inst && inst != this && !inst.options.disabled) {
						queries.push([$.isFunction(inst.options.items) ? inst.options.items.call(inst.element[0], event, { item: this.currentItem }) : $(inst.options.items, inst.element), inst]);
						this.containers.push(inst);
					}
				};
			};
		}

		for (var i = queries.length - 1; i >= 0; i--) {
			var targetData = queries[i][1];
			var _queries = queries[i][0];

			for (var j=0, queriesLength = _queries.length; j < queriesLength; j++) {
				var item = $(_queries[j]);

				item.data('sortable-item', targetData); // Data for target checking (mouse manager)

				items.push({
					item: item,
					instance: targetData,
					width: 0, height: 0,
					left: 0, top: 0
				});
			};
		};

	},

	refreshPositions: function(fast) {

		//This has to be redone because due to the item being moved out/into the offsetParent, the offsetParent's position will change
		if(this.offsetParent && this.helper) {
			this.offset.parent = this._getParentOffset();
		}

		for (var i = this.items.length - 1; i >= 0; i--){
			var item = this.items[i];

			//We ignore calculating positions of all connected containers when we're not over them
			if(item.instance != this.currentContainer && this.currentContainer && item.item[0] != this.currentItem[0])
				continue;

			var t = this.options.toleranceElement ? $(this.options.toleranceElement, item.item) : item.item;

			if (!fast) {
				item.width = t.outerWidth();
				item.height = t.outerHeight();
			}

			var p = t.offset();
			item.left = p.left;
			item.top = p.top;
		};

		if(this.options.custom && this.options.custom.refreshContainers) {
			this.options.custom.refreshContainers.call(this);
		} else {
			for (var i = this.containers.length - 1; i >= 0; i--){
				var p = this.containers[i].element.offset();
				this.containers[i].containerCache.left = p.left;
				this.containers[i].containerCache.top = p.top;
				this.containers[i].containerCache.width	= this.containers[i].element.outerWidth();
				this.containers[i].containerCache.height = this.containers[i].element.outerHeight();
			};
		}

	},

	_createPlaceholder: function(that) {

		var self = that || this, o = self.options;

		if(!o.placeholder || o.placeholder.constructor == String) {
			var className = o.placeholder;
			o.placeholder = {
				element: function() {

					var el = $(document.createElement(self.currentItem[0].nodeName))
						.addClass(className || self.currentItem[0].className+" ui-sortable-placeholder")
						.removeClass("ui-sortable-helper")[0];

					if(!className)
						el.style.visibility = "hidden";

					return el;
				},
				update: function(container, p) {

					// 1. If a className is set as 'placeholder option, we don't force sizes - the class is responsible for that
					// 2. The option 'forcePlaceholderSize can be enabled to force it even if a class name is specified
					if(className && !o.forcePlaceholderSize) return;

					//If the element doesn't have a actual height by itself (without styles coming from a stylesheet), it receives the inline height from the dragged item
					if(!p.height()) { p.height(self.currentItem.innerHeight() - parseInt(self.currentItem.css('paddingTop')||0, 10) - parseInt(self.currentItem.css('paddingBottom')||0, 10)); };
					if(!p.width()) { p.width(self.currentItem.innerWidth() - parseInt(self.currentItem.css('paddingLeft')||0, 10) - parseInt(self.currentItem.css('paddingRight')||0, 10)); };
				}
			};
		}

		//Create the placeholder
		self.placeholder = $(o.placeholder.element.call(self.element, self.currentItem));

		//Append it after the actual current item
		self.currentItem.after(self.placeholder);

		//Update the size of the placeholder (TODO: Logic to fuzzy, see line 316/317)
		o.placeholder.update(self, self.placeholder);

	},

	_contactContainers: function(event) {
		for (var i = this.containers.length - 1; i >= 0; i--){

			if(this._intersectsWith(this.containers[i].containerCache)) {
				if(!this.containers[i].containerCache.over) {

					if(this.currentContainer != this.containers[i]) {

						//When entering a new container, we will find the item with the least distance and append our item near it
						var dist = 10000; var itemWithLeastDistance = null; var base = this.positionAbs[this.containers[i].floating ? 'left' : 'top'];
						for (var j = this.items.length - 1; j >= 0; j--) {
							if(!$.ui.contains(this.containers[i].element[0], this.items[j].item[0])) continue;
							var cur = this.items[j][this.containers[i].floating ? 'left' : 'top'];
							if(Math.abs(cur - base) < dist) {
								dist = Math.abs(cur - base); itemWithLeastDistance = this.items[j];
							}
						}

						if(!itemWithLeastDistance && !this.options.dropOnEmpty) //Check if dropOnEmpty is enabled
							continue;

						this.currentContainer = this.containers[i];
						itemWithLeastDistance ? this._rearrange(event, itemWithLeastDistance, null, true) : this._rearrange(event, null, this.containers[i].element, true);
						this._trigger("change", event, this._uiHash());
						this.containers[i]._trigger("change", event, this._uiHash(this));

						//Update the placeholder
						this.options.placeholder.update(this.currentContainer, this.placeholder);

					}

					this.containers[i]._trigger("over", event, this._uiHash(this));
					this.containers[i].containerCache.over = 1;
				}
			} else {
				if(this.containers[i].containerCache.over) {
					this.containers[i]._trigger("out", event, this._uiHash(this));
					this.containers[i].containerCache.over = 0;
				}
			}

		};
	},

	_createHelper: function(event) {

		var o = this.options;
		var helper = $.isFunction(o.helper) ? $(o.helper.apply(this.element[0], [event, this.currentItem])) : (o.helper == 'clone' ? this.currentItem.clone() : this.currentItem);

		if(!helper.parents('body').length) //Add the helper to the DOM if that didn't happen already
			$(o.appendTo != 'parent' ? o.appendTo : this.currentItem[0].parentNode)[0].appendChild(helper[0]);

		if(helper[0] == this.currentItem[0])
			this._storedCSS = { width: this.currentItem[0].style.width, height: this.currentItem[0].style.height, position: this.currentItem.css("position"), top: this.currentItem.css("top"), left: this.currentItem.css("left") };

		if(helper[0].style.width == '' || o.forceHelperSize) helper.width(this.currentItem.width());
		if(helper[0].style.height == '' || o.forceHelperSize) helper.height(this.currentItem.height());

		return helper;

	},

	_adjustOffsetFromHelper: function(obj) {
		if(obj.left != undefined) this.offset.click.left = obj.left + this.margins.left;
		if(obj.right != undefined) this.offset.click.left = this.helperProportions.width - obj.right + this.margins.left;
		if(obj.top != undefined) this.offset.click.top = obj.top + this.margins.top;
		if(obj.bottom != undefined) this.offset.click.top = this.helperProportions.height - obj.bottom + this.margins.top;
	},

	_getParentOffset: function() {


		//Get the offsetParent and cache its position
		this.offsetParent = this.helper.offsetParent();
		var po = this.offsetParent.offset();

		// This is a special case where we need to modify a offset calculated on start, since the following happened:
		// 1. The position of the helper is absolute, so it's position is calculated based on the next positioned parent
		// 2. The actual offset parent is a child of the scroll parent, and the scroll parent isn't the document, which means that
		//    the scroll is included in the initial calculation of the offset of the parent, and never recalculated upon drag
		if(this.cssPosition == 'absolute' && this.scrollParent[0] != document && $.ui.contains(this.scrollParent[0], this.offsetParent[0])) {
			po.left += this.scrollParent.scrollLeft();
			po.top += this.scrollParent.scrollTop();
		}

		if((this.offsetParent[0] == document.body) //This needs to be actually done for all browsers, since pageX/pageY includes this information
		|| (this.offsetParent[0].tagName && this.offsetParent[0].tagName.toLowerCase() == 'html' && $.browser.msie)) //Ugly IE fix
			po = { top: 0, left: 0 };

		return {
			top: po.top + (parseInt(this.offsetParent.css("borderTopWidth"),10) || 0),
			left: po.left + (parseInt(this.offsetParent.css("borderLeftWidth"),10) || 0)
		};

	},

	_getRelativeOffset: function() {

		if(this.cssPosition == "relative") {
			var p = this.currentItem.position();
			return {
				top: p.top - (parseInt(this.helper.css("top"),10) || 0) + this.scrollParent.scrollTop(),
				left: p.left - (parseInt(this.helper.css("left"),10) || 0) + this.scrollParent.scrollLeft()
			};
		} else {
			return { top: 0, left: 0 };
		}

	},

	_cacheMargins: function() {
		this.margins = {
			left: (parseInt(this.currentItem.css("marginLeft"),10) || 0),
			top: (parseInt(this.currentItem.css("marginTop"),10) || 0)
		};
	},

	_cacheHelperProportions: function() {
		this.helperProportions = {
			width: this.helper.outerWidth(),
			height: this.helper.outerHeight()
		};
	},

	_setContainment: function() {

		var o = this.options;
		if(o.containment == 'parent') o.containment = this.helper[0].parentNode;
		if(o.containment == 'document' || o.containment == 'window') this.containment = [
			0 - this.offset.relative.left - this.offset.parent.left,
			0 - this.offset.relative.top - this.offset.parent.top,
			$(o.containment == 'document' ? document : window).width() - this.helperProportions.width - this.margins.left,
			($(o.containment == 'document' ? document : window).height() || document.body.parentNode.scrollHeight) - this.helperProportions.height - this.margins.top
		];

		if(!(/^(document|window|parent)$/).test(o.containment)) {
			var ce = $(o.containment)[0];
			var co = $(o.containment).offset();
			var over = ($(ce).css("overflow") != 'hidden');

			this.containment = [
				co.left + (parseInt($(ce).css("borderLeftWidth"),10) || 0) + (parseInt($(ce).css("paddingLeft"),10) || 0) - this.margins.left,
				co.top + (parseInt($(ce).css("borderTopWidth"),10) || 0) + (parseInt($(ce).css("paddingTop"),10) || 0) - this.margins.top,
				co.left+(over ? Math.max(ce.scrollWidth,ce.offsetWidth) : ce.offsetWidth) - (parseInt($(ce).css("borderLeftWidth"),10) || 0) - (parseInt($(ce).css("paddingRight"),10) || 0) - this.helperProportions.width - this.margins.left,
				co.top+(over ? Math.max(ce.scrollHeight,ce.offsetHeight) : ce.offsetHeight) - (parseInt($(ce).css("borderTopWidth"),10) || 0) - (parseInt($(ce).css("paddingBottom"),10) || 0) - this.helperProportions.height - this.margins.top
			];
		}

	},

	_convertPositionTo: function(d, pos) {

		if(!pos) pos = this.position;
		var mod = d == "absolute" ? 1 : -1;
		var o = this.options, scroll = this.cssPosition == 'absolute' && !(this.scrollParent[0] != document && $.ui.contains(this.scrollParent[0], this.offsetParent[0])) ? this.offsetParent : this.scrollParent, scrollIsRootNode = (/(html|body)/i).test(scroll[0].tagName);

		return {
			top: (
				pos.top																	// The absolute mouse position
				+ this.offset.relative.top * mod										// Only for relative positioned nodes: Relative offset from element to offset parent
				+ this.offset.parent.top * mod											// The offsetParent's offset without borders (offset + border)
				- ($.browser.safari && this.cssPosition == 'fixed' ? 0 : ( this.cssPosition == 'fixed' ? -this.scrollParent.scrollTop() : ( scrollIsRootNode ? 0 : scroll.scrollTop() ) ) * mod)
			),
			left: (
				pos.left																// The absolute mouse position
				+ this.offset.relative.left * mod										// Only for relative positioned nodes: Relative offset from element to offset parent
				+ this.offset.parent.left * mod											// The offsetParent's offset without borders (offset + border)
				- ($.browser.safari && this.cssPosition == 'fixed' ? 0 : ( this.cssPosition == 'fixed' ? -this.scrollParent.scrollLeft() : scrollIsRootNode ? 0 : scroll.scrollLeft() ) * mod)
			)
		};

	},

	_generatePosition: function(event) {

		var o = this.options, scroll = this.cssPosition == 'absolute' && !(this.scrollParent[0] != document && $.ui.contains(this.scrollParent[0], this.offsetParent[0])) ? this.offsetParent : this.scrollParent, scrollIsRootNode = (/(html|body)/i).test(scroll[0].tagName);

		// This is another very weird special case that only happens for relative elements:
		// 1. If the css position is relative
		// 2. and the scroll parent is the document or similar to the offset parent
		// we have to refresh the relative offset during the scroll so there are no jumps
		if(this.cssPosition == 'relative' && !(this.scrollParent[0] != document && this.scrollParent[0] != this.offsetParent[0])) {
			this.offset.relative = this._getRelativeOffset();
		}

		var pageX = event.pageX;
		var pageY = event.pageY;

		/*
		 * - Position constraining -
		 * Constrain the position to a mix of grid, containment.
		 */

		if(this.originalPosition) { //If we are not dragging yet, we won't check for options

			if(this.containment) {
				if(event.pageX - this.offset.click.left < this.containment[0]) pageX = this.containment[0] + this.offset.click.left;
				if(event.pageY - this.offset.click.top < this.containment[1]) pageY = this.containment[1] + this.offset.click.top;
				if(event.pageX - this.offset.click.left > this.containment[2]) pageX = this.containment[2] + this.offset.click.left;
				if(event.pageY - this.offset.click.top > this.containment[3]) pageY = this.containment[3] + this.offset.click.top;
			}

			if(o.grid) {
				var top = this.originalPageY + Math.round((pageY - this.originalPageY) / o.grid[1]) * o.grid[1];
				pageY = this.containment ? (!(top - this.offset.click.top < this.containment[1] || top - this.offset.click.top > this.containment[3]) ? top : (!(top - this.offset.click.top < this.containment[1]) ? top - o.grid[1] : top + o.grid[1])) : top;

				var left = this.originalPageX + Math.round((pageX - this.originalPageX) / o.grid[0]) * o.grid[0];
				pageX = this.containment ? (!(left - this.offset.click.left < this.containment[0] || left - this.offset.click.left > this.containment[2]) ? left : (!(left - this.offset.click.left < this.containment[0]) ? left - o.grid[0] : left + o.grid[0])) : left;
			}

		}

		return {
			top: (
				pageY																// The absolute mouse position
				- this.offset.click.top													// Click offset (relative to the element)
				- this.offset.relative.top												// Only for relative positioned nodes: Relative offset from element to offset parent
				- this.offset.parent.top												// The offsetParent's offset without borders (offset + border)
				+ ($.browser.safari && this.cssPosition == 'fixed' ? 0 : ( this.cssPosition == 'fixed' ? -this.scrollParent.scrollTop() : ( scrollIsRootNode ? 0 : scroll.scrollTop() ) ))
			),
			left: (
				pageX																// The absolute mouse position
				- this.offset.click.left												// Click offset (relative to the element)
				- this.offset.relative.left												// Only for relative positioned nodes: Relative offset from element to offset parent
				- this.offset.parent.left												// The offsetParent's offset without borders (offset + border)
				+ ($.browser.safari && this.cssPosition == 'fixed' ? 0 : ( this.cssPosition == 'fixed' ? -this.scrollParent.scrollLeft() : scrollIsRootNode ? 0 : scroll.scrollLeft() ))
			)
		};

	},

	_rearrange: function(event, i, a, hardRefresh) {

		a ? a[0].appendChild(this.placeholder[0]) : i.item[0].parentNode.insertBefore(this.placeholder[0], (this.direction == 'down' ? i.item[0] : i.item[0].nextSibling));

		//Various things done here to improve the performance:
		// 1. we create a setTimeout, that calls refreshPositions
		// 2. on the instance, we have a counter variable, that get's higher after every append
		// 3. on the local scope, we copy the counter variable, and check in the timeout, if it's still the same
		// 4. this lets only the last addition to the timeout stack through
		this.counter = this.counter ? ++this.counter : 1;
		var self = this, counter = this.counter;

		window.setTimeout(function() {
			if(counter == self.counter) self.refreshPositions(!hardRefresh); //Precompute after each DOM insertion, NOT on mousemove
		},0);

	},

	_clear: function(event, noPropagation) {

		this.reverting = false;
		// We delay all events that have to be triggered to after the point where the placeholder has been removed and
		// everything else normalized again
		var delayedTriggers = [], self = this;

		// We first have to update the dom position of the actual currentItem
		// Note: don't do it if the current item is already removed (by a user), or it gets reappended (see #4088)
		if(!this._noFinalSort && this.currentItem[0].parentNode) this.placeholder.before(this.currentItem);
		this._noFinalSort = null;

		if(this.helper[0] == this.currentItem[0]) {
			for(var i in this._storedCSS) {
				if(this._storedCSS[i] == 'auto' || this._storedCSS[i] == 'static') this._storedCSS[i] = '';
			}
			this.currentItem.css(this._storedCSS).removeClass("ui-sortable-helper");
		} else {
			this.currentItem.show();
		}

		if(this.fromOutside && !noPropagation) delayedTriggers.push(function(event) { this._trigger("receive", event, this._uiHash(this.fromOutside)); });
		if((this.fromOutside || this.domPosition.prev != this.currentItem.prev().not(".ui-sortable-helper")[0] || this.domPosition.parent != this.currentItem.parent()[0]) && !noPropagation) delayedTriggers.push(function(event) { this._trigger("update", event, this._uiHash()); }); //Trigger update callback if the DOM position has changed
		if(!$.ui.contains(this.element[0], this.currentItem[0])) { //Node was moved out of the current element
			if(!noPropagation) delayedTriggers.push(function(event) { this._trigger("remove", event, this._uiHash()); });
			for (var i = this.containers.length - 1; i >= 0; i--){
				if($.ui.contains(this.containers[i].element[0], this.currentItem[0]) && !noPropagation) {
					delayedTriggers.push((function(c) { return function(event) { c._trigger("receive", event, this._uiHash(this)); };  }).call(this, this.containers[i]));
					delayedTriggers.push((function(c) { return function(event) { c._trigger("update", event, this._uiHash(this));  }; }).call(this, this.containers[i]));
				}
			};
		};

		//Post events to containers
		for (var i = this.containers.length - 1; i >= 0; i--){
			if(!noPropagation) delayedTriggers.push((function(c) { return function(event) { c._trigger("deactivate", event, this._uiHash(this)); };  }).call(this, this.containers[i]));
			if(this.containers[i].containerCache.over) {
				delayedTriggers.push((function(c) { return function(event) { c._trigger("out", event, this._uiHash(this)); };  }).call(this, this.containers[i]));
				this.containers[i].containerCache.over = 0;
			}
		}

		//Do what was originally in plugins
		if(this._storedCursor) $('body').css("cursor", this._storedCursor); //Reset cursor
		if(this._storedOpacity) this.helper.css("opacity", this._storedOpacity); //Reset cursor
		if(this._storedZIndex) this.helper.css("zIndex", this._storedZIndex == 'auto' ? '' : this._storedZIndex); //Reset z-index

		this.dragging = false;
		if(this.cancelHelperRemoval) {
			if(!noPropagation) {
				this._trigger("beforeStop", event, this._uiHash());
				for (var i=0; i < delayedTriggers.length; i++) { delayedTriggers[i].call(this, event); }; //Trigger all delayed events
				this._trigger("stop", event, this._uiHash());
			}
			return false;
		}

		if(!noPropagation) this._trigger("beforeStop", event, this._uiHash());

		//$(this.placeholder[0]).remove(); would have been the jQuery way - unfortunately, it unbinds ALL events from the original node!
		this.placeholder[0].parentNode.removeChild(this.placeholder[0]);

		if(this.helper[0] != this.currentItem[0]) this.helper.remove(); this.helper = null;

		if(!noPropagation) {
			for (var i=0; i < delayedTriggers.length; i++) { delayedTriggers[i].call(this, event); }; //Trigger all delayed events
			this._trigger("stop", event, this._uiHash());
		}

		this.fromOutside = false;
		return true;

	},

	_trigger: function() {
		if ($.widget.prototype._trigger.apply(this, arguments) === false) {
			this.cancel();
		}
	},

	_uiHash: function(inst) {
		var self = inst || this;
		return {
			helper: self.helper,
			placeholder: self.placeholder || $([]),
			position: self.position,
			absolutePosition: self.positionAbs, //deprecated
			offset: self.positionAbs,
			item: self.currentItem,
			sender: inst ? inst.element : null
		};
	}

}));

$.extend($.ui.sortable, {
	getter: "serialize toArray",
	version: "1.7.2",
	eventPrefix: "sort",
	defaults: {
		appendTo: "parent",
		axis: false,
		cancel: ":input,option",
		connectWith: false,
		containment: false,
		cursor: 'auto',
		cursorAt: false,
		delay: 0,
		distance: 1,
		dropOnEmpty: true,
		forcePlaceholderSize: false,
		forceHelperSize: false,
		grid: false,
		handle: false,
		helper: "original",
		items: '> *',
		opacity: false,
		placeholder: false,
		revert: false,
		scroll: true,
		scrollSensitivity: 20,
		scrollSpeed: 20,
		scope: "default",
		tolerance: "intersect",
		zIndex: 1000
	}
});

})(jQuery);
/*
 * jQuery UI Effects 1.7.2
 *
 * Copyright (c) 2009 AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT (MIT-LICENSE.txt)
 * and GPL (GPL-LICENSE.txt) licenses.
 *
 * http://docs.jquery.com/UI/Effects/
 */
;jQuery.effects || (function($) {

$.effects = {
	version: "1.7.2",

	// Saves a set of properties in a data storage
	save: function(element, set) {
		for(var i=0; i < set.length; i++) {
			if(set[i] !== null) element.data("ec.storage."+set[i], element[0].style[set[i]]);
		}
	},

	// Restores a set of previously saved properties from a data storage
	restore: function(element, set) {
		for(var i=0; i < set.length; i++) {
			if(set[i] !== null) element.css(set[i], element.data("ec.storage."+set[i]));
		}
	},

	setMode: function(el, mode) {
		if (mode == 'toggle') mode = el.is(':hidden') ? 'show' : 'hide'; // Set for toggle
		return mode;
	},

	getBaseline: function(origin, original) { // Translates a [top,left] array into a baseline value
		// this should be a little more flexible in the future to handle a string & hash
		var y, x;
		switch (origin[0]) {
			case 'top': y = 0; break;
			case 'middle': y = 0.5; break;
			case 'bottom': y = 1; break;
			default: y = origin[0] / original.height;
		};
		switch (origin[1]) {
			case 'left': x = 0; break;
			case 'center': x = 0.5; break;
			case 'right': x = 1; break;
			default: x = origin[1] / original.width;
		};
		return {x: x, y: y};
	},

	// Wraps the element around a wrapper that copies position properties
	createWrapper: function(element) {

		//if the element is already wrapped, return it
		if (element.parent().is('.ui-effects-wrapper'))
			return element.parent();

		//Cache width,height and float properties of the element, and create a wrapper around it
		var props = { width: element.outerWidth(true), height: element.outerHeight(true), 'float': element.css('float') };
		element.wrap('<div class="ui-effects-wrapper" style="font-size:100%;background:transparent;border:none;margin:0;padding:0"></div>');
		var wrapper = element.parent();

		//Transfer the positioning of the element to the wrapper
		if (element.css('position') == 'static') {
			wrapper.css({ position: 'relative' });
			element.css({ position: 'relative'} );
		} else {
			var top = element.css('top'); if(isNaN(parseInt(top,10))) top = 'auto';
			var left = element.css('left'); if(isNaN(parseInt(left,10))) left = 'auto';
			wrapper.css({ position: element.css('position'), top: top, left: left, zIndex: element.css('z-index') }).show();
			element.css({position: 'relative', top: 0, left: 0 });
		}

		wrapper.css(props);
		return wrapper;
	},

	removeWrapper: function(element) {
		if (element.parent().is('.ui-effects-wrapper'))
			return element.parent().replaceWith(element);
		return element;
	},

	setTransition: function(element, list, factor, value) {
		value = value || {};
		$.each(list, function(i, x){
			unit = element.cssUnit(x);
			if (unit[0] > 0) value[x] = unit[0] * factor + unit[1];
		});
		return value;
	},

	//Base function to animate from one class to another in a seamless transition
	animateClass: function(value, duration, easing, callback) {

		var cb = (typeof easing == "function" ? easing : (callback ? callback : null));
		var ea = (typeof easing == "string" ? easing : null);

		return this.each(function() {

			var offset = {}; var that = $(this); var oldStyleAttr = that.attr("style") || '';
			if(typeof oldStyleAttr == 'object') oldStyleAttr = oldStyleAttr["cssText"]; /* Stupidly in IE, style is a object.. */
			if(value.toggle) { that.hasClass(value.toggle) ? value.remove = value.toggle : value.add = value.toggle; }

			//Let's get a style offset
			var oldStyle = $.extend({}, (document.defaultView ? document.defaultView.getComputedStyle(this,null) : this.currentStyle));
			if(value.add) that.addClass(value.add); if(value.remove) that.removeClass(value.remove);
			var newStyle = $.extend({}, (document.defaultView ? document.defaultView.getComputedStyle(this,null) : this.currentStyle));
			if(value.add) that.removeClass(value.add); if(value.remove) that.addClass(value.remove);

			// The main function to form the object for animation
			for(var n in newStyle) {
				if( typeof newStyle[n] != "function" && newStyle[n] /* No functions and null properties */
				&& n.indexOf("Moz") == -1 && n.indexOf("length") == -1 /* No mozilla spezific render properties. */
				&& newStyle[n] != oldStyle[n] /* Only values that have changed are used for the animation */
				&& (n.match(/color/i) || (!n.match(/color/i) && !isNaN(parseInt(newStyle[n],10)))) /* Only things that can be parsed to integers or colors */
				&& (oldStyle.position != "static" || (oldStyle.position == "static" && !n.match(/left|top|bottom|right/))) /* No need for positions when dealing with static positions */
				) offset[n] = newStyle[n];
			}

			that.animate(offset, duration, ea, function() { // Animate the newly constructed offset object
				// Change style attribute back to original. For stupid IE, we need to clear the damn object.
				if(typeof $(this).attr("style") == 'object') { $(this).attr("style")["cssText"] = ""; $(this).attr("style")["cssText"] = oldStyleAttr; } else $(this).attr("style", oldStyleAttr);
				if(value.add) $(this).addClass(value.add); if(value.remove) $(this).removeClass(value.remove);
				if(cb) cb.apply(this, arguments);
			});

		});
	}
};


function _normalizeArguments(a, m) {

	var o = a[1] && a[1].constructor == Object ? a[1] : {}; if(m) o.mode = m;
	var speed = a[1] && a[1].constructor != Object ? a[1] : (o.duration ? o.duration : a[2]); //either comes from options.duration or the secon/third argument
		speed = $.fx.off ? 0 : typeof speed === "number" ? speed : $.fx.speeds[speed] || $.fx.speeds._default;
	var callback = o.callback || ( $.isFunction(a[1]) && a[1] ) || ( $.isFunction(a[2]) && a[2] ) || ( $.isFunction(a[3]) && a[3] );

	return [a[0], o, speed, callback];

}

//Extend the methods of jQuery
$.fn.extend({

	//Save old methods
	_show: $.fn.show,
	_hide: $.fn.hide,
	__toggle: $.fn.toggle,
	_addClass: $.fn.addClass,
	_removeClass: $.fn.removeClass,
	_toggleClass: $.fn.toggleClass,

	// New effect methods
	effect: function(fx, options, speed, callback) {
		return $.effects[fx] ? $.effects[fx].call(this, {method: fx, options: options || {}, duration: speed, callback: callback }) : null;
	},

	show: function() {
		if(!arguments[0] || (arguments[0].constructor == Number || (/(slow|normal|fast)/).test(arguments[0])))
			return this._show.apply(this, arguments);
		else {
			return this.effect.apply(this, _normalizeArguments(arguments, 'show'));
		}
	},

	hide: function() {
		if(!arguments[0] || (arguments[0].constructor == Number || (/(slow|normal|fast)/).test(arguments[0])))
			return this._hide.apply(this, arguments);
		else {
			return this.effect.apply(this, _normalizeArguments(arguments, 'hide'));
		}
	},

	toggle: function(){
		if(!arguments[0] ||
			(arguments[0].constructor == Number || (/(slow|normal|fast)/).test(arguments[0])) ||
			($.isFunction(arguments[0]) || typeof arguments[0] == 'boolean')) {
			return this.__toggle.apply(this, arguments);
		} else {
			return this.effect.apply(this, _normalizeArguments(arguments, 'toggle'));
		}
	},

	addClass: function(classNames, speed, easing, callback) {
		return speed ? $.effects.animateClass.apply(this, [{ add: classNames },speed,easing,callback]) : this._addClass(classNames);
	},
	removeClass: function(classNames,speed,easing,callback) {
		return speed ? $.effects.animateClass.apply(this, [{ remove: classNames },speed,easing,callback]) : this._removeClass(classNames);
	},
	toggleClass: function(classNames,speed,easing,callback) {
		return ( (typeof speed !== "boolean") && speed ) ? $.effects.animateClass.apply(this, [{ toggle: classNames },speed,easing,callback]) : this._toggleClass(classNames, speed);
	},
	morph: function(remove,add,speed,easing,callback) {
		return $.effects.animateClass.apply(this, [{ add: add, remove: remove },speed,easing,callback]);
	},
	switchClass: function() {
		return this.morph.apply(this, arguments);
	},

	// helper functions
	cssUnit: function(key) {
		var style = this.css(key), val = [];
		$.each( ['em','px','%','pt'], function(i, unit){
			if(style.indexOf(unit) > 0)
				val = [parseFloat(style), unit];
		});
		return val;
	}
});

/*
 * jQuery Color Animations
 * Copyright 2007 John Resig
 * Released under the MIT and GPL licenses.
 */

// We override the animation for all of these color styles
$.each(['backgroundColor', 'borderBottomColor', 'borderLeftColor', 'borderRightColor', 'borderTopColor', 'color', 'outlineColor'], function(i,attr){
		$.fx.step[attr] = function(fx) {
				if ( fx.state == 0 ) {
						fx.start = getColor( fx.elem, attr );
						fx.end = getRGB( fx.end );
				}

				fx.elem.style[attr] = "rgb(" + [
						Math.max(Math.min( parseInt((fx.pos * (fx.end[0] - fx.start[0])) + fx.start[0],10), 255), 0),
						Math.max(Math.min( parseInt((fx.pos * (fx.end[1] - fx.start[1])) + fx.start[1],10), 255), 0),
						Math.max(Math.min( parseInt((fx.pos * (fx.end[2] - fx.start[2])) + fx.start[2],10), 255), 0)
				].join(",") + ")";
			};
});

// Color Conversion functions from highlightFade
// By Blair Mitchelmore
// http://jquery.offput.ca/highlightFade/

// Parse strings looking for color tuples [255,255,255]
function getRGB(color) {
		var result;

		// Check if we're already dealing with an array of colors
		if ( color && color.constructor == Array && color.length == 3 )
				return color;

		// Look for rgb(num,num,num)
		if (result = /rgb\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*\)/.exec(color))
				return [parseInt(result[1],10), parseInt(result[2],10), parseInt(result[3],10)];

		// Look for rgb(num%,num%,num%)
		if (result = /rgb\(\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*\)/.exec(color))
				return [parseFloat(result[1])*2.55, parseFloat(result[2])*2.55, parseFloat(result[3])*2.55];

		// Look for #a0b1c2
		if (result = /#([a-fA-F0-9]{2})([a-fA-F0-9]{2})([a-fA-F0-9]{2})/.exec(color))
				return [parseInt(result[1],16), parseInt(result[2],16), parseInt(result[3],16)];

		// Look for #fff
		if (result = /#([a-fA-F0-9])([a-fA-F0-9])([a-fA-F0-9])/.exec(color))
				return [parseInt(result[1]+result[1],16), parseInt(result[2]+result[2],16), parseInt(result[3]+result[3],16)];

		// Look for rgba(0, 0, 0, 0) == transparent in Safari 3
		if (result = /rgba\(0, 0, 0, 0\)/.exec(color))
				return colors['transparent'];

		// Otherwise, we're most likely dealing with a named color
		return colors[$.trim(color).toLowerCase()];
}

function getColor(elem, attr) {
		var color;

		do {
				color = $.curCSS(elem, attr);

				// Keep going until we find an element that has color, or we hit the body
				if ( color != '' && color != 'transparent' || $.nodeName(elem, "body") )
						break;

				attr = "backgroundColor";
		} while ( elem = elem.parentNode );

		return getRGB(color);
};

// Some named colors to work with
// From Interface by Stefan Petre
// http://interface.eyecon.ro/

var colors = {
	aqua:[0,255,255],
	azure:[240,255,255],
	beige:[245,245,220],
	black:[0,0,0],
	blue:[0,0,255],
	brown:[165,42,42],
	cyan:[0,255,255],
	darkblue:[0,0,139],
	darkcyan:[0,139,139],
	darkgrey:[169,169,169],
	darkgreen:[0,100,0],
	darkkhaki:[189,183,107],
	darkmagenta:[139,0,139],
	darkolivegreen:[85,107,47],
	darkorange:[255,140,0],
	darkorchid:[153,50,204],
	darkred:[139,0,0],
	darksalmon:[233,150,122],
	darkviolet:[148,0,211],
	fuchsia:[255,0,255],
	gold:[255,215,0],
	green:[0,128,0],
	indigo:[75,0,130],
	khaki:[240,230,140],
	lightblue:[173,216,230],
	lightcyan:[224,255,255],
	lightgreen:[144,238,144],
	lightgrey:[211,211,211],
	lightpink:[255,182,193],
	lightyellow:[255,255,224],
	lime:[0,255,0],
	magenta:[255,0,255],
	maroon:[128,0,0],
	navy:[0,0,128],
	olive:[128,128,0],
	orange:[255,165,0],
	pink:[255,192,203],
	purple:[128,0,128],
	violet:[128,0,128],
	red:[255,0,0],
	silver:[192,192,192],
	white:[255,255,255],
	yellow:[255,255,0],
	transparent: [255,255,255]
};

/*
 * jQuery Easing v1.3 - http://gsgd.co.uk/sandbox/jquery/easing/
 *
 * Uses the built in easing capabilities added In jQuery 1.1
 * to offer multiple easing options
 *
 * TERMS OF USE - jQuery Easing
 *
 * Open source under the BSD License.
 *
 * Copyright 2008 George McGinley Smith
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without modification,
 * are permitted provided that the following conditions are met:
 *
 * Redistributions of source code must retain the above copyright notice, this list of
 * conditions and the following disclaimer.
 * Redistributions in binary form must reproduce the above copyright notice, this list
 * of conditions and the following disclaimer in the documentation and/or other materials
 * provided with the distribution.
 *
 * Neither the name of the author nor the names of contributors may be used to endorse
 * or promote products derived from this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE
 * COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
 * EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE
 * GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED
 * AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 * NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED
 * OF THE POSSIBILITY OF SUCH DAMAGE.
 *
*/

// t: current time, b: begInnIng value, c: change In value, d: duration
$.easing.jswing = $.easing.swing;

$.extend($.easing,
{
	def: 'easeOutQuad',
	swing: function (x, t, b, c, d) {
		//alert($.easing.default);
		return $.easing[$.easing.def](x, t, b, c, d);
	},
	easeInQuad: function (x, t, b, c, d) {
		return c*(t/=d)*t + b;
	},
	easeOutQuad: function (x, t, b, c, d) {
		return -c *(t/=d)*(t-2) + b;
	},
	easeInOutQuad: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return c/2*t*t + b;
		return -c/2 * ((--t)*(t-2) - 1) + b;
	},
	easeInCubic: function (x, t, b, c, d) {
		return c*(t/=d)*t*t + b;
	},
	easeOutCubic: function (x, t, b, c, d) {
		return c*((t=t/d-1)*t*t + 1) + b;
	},
	easeInOutCubic: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return c/2*t*t*t + b;
		return c/2*((t-=2)*t*t + 2) + b;
	},
	easeInQuart: function (x, t, b, c, d) {
		return c*(t/=d)*t*t*t + b;
	},
	easeOutQuart: function (x, t, b, c, d) {
		return -c * ((t=t/d-1)*t*t*t - 1) + b;
	},
	easeInOutQuart: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return c/2*t*t*t*t + b;
		return -c/2 * ((t-=2)*t*t*t - 2) + b;
	},
	easeInQuint: function (x, t, b, c, d) {
		return c*(t/=d)*t*t*t*t + b;
	},
	easeOutQuint: function (x, t, b, c, d) {
		return c*((t=t/d-1)*t*t*t*t + 1) + b;
	},
	easeInOutQuint: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return c/2*t*t*t*t*t + b;
		return c/2*((t-=2)*t*t*t*t + 2) + b;
	},
	easeInSine: function (x, t, b, c, d) {
		return -c * Math.cos(t/d * (Math.PI/2)) + c + b;
	},
	easeOutSine: function (x, t, b, c, d) {
		return c * Math.sin(t/d * (Math.PI/2)) + b;
	},
	easeInOutSine: function (x, t, b, c, d) {
		return -c/2 * (Math.cos(Math.PI*t/d) - 1) + b;
	},
	easeInExpo: function (x, t, b, c, d) {
		return (t==0) ? b : c * Math.pow(2, 10 * (t/d - 1)) + b;
	},
	easeOutExpo: function (x, t, b, c, d) {
		return (t==d) ? b+c : c * (-Math.pow(2, -10 * t/d) + 1) + b;
	},
	easeInOutExpo: function (x, t, b, c, d) {
		if (t==0) return b;
		if (t==d) return b+c;
		if ((t/=d/2) < 1) return c/2 * Math.pow(2, 10 * (t - 1)) + b;
		return c/2 * (-Math.pow(2, -10 * --t) + 2) + b;
	},
	easeInCirc: function (x, t, b, c, d) {
		return -c * (Math.sqrt(1 - (t/=d)*t) - 1) + b;
	},
	easeOutCirc: function (x, t, b, c, d) {
		return c * Math.sqrt(1 - (t=t/d-1)*t) + b;
	},
	easeInOutCirc: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return -c/2 * (Math.sqrt(1 - t*t) - 1) + b;
		return c/2 * (Math.sqrt(1 - (t-=2)*t) + 1) + b;
	},
	easeInElastic: function (x, t, b, c, d) {
		var s=1.70158;var p=0;var a=c;
		if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
		if (a < Math.abs(c)) { a=c; var s=p/4; }
		else var s = p/(2*Math.PI) * Math.asin (c/a);
		return -(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
	},
	easeOutElastic: function (x, t, b, c, d) {
		var s=1.70158;var p=0;var a=c;
		if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
		if (a < Math.abs(c)) { a=c; var s=p/4; }
		else var s = p/(2*Math.PI) * Math.asin (c/a);
		return a*Math.pow(2,-10*t) * Math.sin( (t*d-s)*(2*Math.PI)/p ) + c + b;
	},
	easeInOutElastic: function (x, t, b, c, d) {
		var s=1.70158;var p=0;var a=c;
		if (t==0) return b;  if ((t/=d/2)==2) return b+c;  if (!p) p=d*(.3*1.5);
		if (a < Math.abs(c)) { a=c; var s=p/4; }
		else var s = p/(2*Math.PI) * Math.asin (c/a);
		if (t < 1) return -.5*(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
		return a*Math.pow(2,-10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )*.5 + c + b;
	},
	easeInBack: function (x, t, b, c, d, s) {
		if (s == undefined) s = 1.70158;
		return c*(t/=d)*t*((s+1)*t - s) + b;
	},
	easeOutBack: function (x, t, b, c, d, s) {
		if (s == undefined) s = 1.70158;
		return c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b;
	},
	easeInOutBack: function (x, t, b, c, d, s) {
		if (s == undefined) s = 1.70158;
		if ((t/=d/2) < 1) return c/2*(t*t*(((s*=(1.525))+1)*t - s)) + b;
		return c/2*((t-=2)*t*(((s*=(1.525))+1)*t + s) + 2) + b;
	},
	easeInBounce: function (x, t, b, c, d) {
		return c - $.easing.easeOutBounce (x, d-t, 0, c, d) + b;
	},
	easeOutBounce: function (x, t, b, c, d) {
		if ((t/=d) < (1/2.75)) {
			return c*(7.5625*t*t) + b;
		} else if (t < (2/2.75)) {
			return c*(7.5625*(t-=(1.5/2.75))*t + .75) + b;
		} else if (t < (2.5/2.75)) {
			return c*(7.5625*(t-=(2.25/2.75))*t + .9375) + b;
		} else {
			return c*(7.5625*(t-=(2.625/2.75))*t + .984375) + b;
		}
	},
	easeInOutBounce: function (x, t, b, c, d) {
		if (t < d/2) return $.easing.easeInBounce (x, t*2, 0, c, d) * .5 + b;
		return $.easing.easeOutBounce (x, t*2-d, 0, c, d) * .5 + c*.5 + b;
	}
});

/*
 *
 * TERMS OF USE - EASING EQUATIONS
 *
 * Open source under the BSD License.
 *
 * Copyright 2001 Robert Penner
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without modification,
 * are permitted provided that the following conditions are met:
 *
 * Redistributions of source code must retain the above copyright notice, this list of
 * conditions and the following disclaimer.
 * Redistributions in binary form must reproduce the above copyright notice, this list
 * of conditions and the following disclaimer in the documentation and/or other materials
 * provided with the distribution.
 *
 * Neither the name of the author nor the names of contributors may be used to endorse
 * or promote products derived from this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE
 * COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
 * EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE
 * GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED
 * AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 * NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED
 * OF THE POSSIBILITY OF SUCH DAMAGE.
 *
 */

})(jQuery);
/*
 * jQuery UI Effects Blind 1.7.2
 *
 * Copyright (c) 2009 AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT (MIT-LICENSE.txt)
 * and GPL (GPL-LICENSE.txt) licenses.
 *
 * http://docs.jquery.com/UI/Effects/Blind
 *
 * Depends:
 *	effects.core.js
 */
(function($) {

$.effects.blind = function(o) {

	return this.queue(function() {

		// Create element
		var el = $(this), props = ['position','top','left'];

		// Set options
		var mode = $.effects.setMode(el, o.options.mode || 'hide'); // Set Mode
		var direction = o.options.direction || 'vertical'; // Default direction

		// Adjust
		$.effects.save(el, props); el.show(); // Save & Show
		var wrapper = $.effects.createWrapper(el).css({overflow:'hidden'}); // Create Wrapper
		var ref = (direction == 'vertical') ? 'height' : 'width';
		var distance = (direction == 'vertical') ? wrapper.height() : wrapper.width();
		if(mode == 'show') wrapper.css(ref, 0); // Shift

		// Animation
		var animation = {};
		animation[ref] = mode == 'show' ? distance : 0;

		// Animate
		wrapper.animate(animation, o.duration, o.options.easing, function() {
			if(mode == 'hide') el.hide(); // Hide
			$.effects.restore(el, props); $.effects.removeWrapper(el); // Restore
			if(o.callback) o.callback.apply(el[0], arguments); // Callback
			el.dequeue();
		});

	});

};

})(jQuery);
/*
 * jQuery UI Effects Bounce 1.7.2
 *
 * Copyright (c) 2009 AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT (MIT-LICENSE.txt)
 * and GPL (GPL-LICENSE.txt) licenses.
 *
 * http://docs.jquery.com/UI/Effects/Bounce
 *
 * Depends:
 *	effects.core.js
 */
(function($) {

$.effects.bounce = function(o) {

	return this.queue(function() {

		// Create element
		var el = $(this), props = ['position','top','left'];

		// Set options
		var mode = $.effects.setMode(el, o.options.mode || 'effect'); // Set Mode
		var direction = o.options.direction || 'up'; // Default direction
		var distance = o.options.distance || 20; // Default distance
		var times = o.options.times || 5; // Default # of times
		var speed = o.duration || 250; // Default speed per bounce
		if (/show|hide/.test(mode)) props.push('opacity'); // Avoid touching opacity to prevent clearType and PNG issues in IE

		// Adjust
		$.effects.save(el, props); el.show(); // Save & Show
		$.effects.createWrapper(el); // Create Wrapper
		var ref = (direction == 'up' || direction == 'down') ? 'top' : 'left';
		var motion = (direction == 'up' || direction == 'left') ? 'pos' : 'neg';
		var distance = o.options.distance || (ref == 'top' ? el.outerHeight({margin:true}) / 3 : el.outerWidth({margin:true}) / 3);
		if (mode == 'show') el.css('opacity', 0).css(ref, motion == 'pos' ? -distance : distance); // Shift
		if (mode == 'hide') distance = distance / (times * 2);
		if (mode != 'hide') times--;

		// Animate
		if (mode == 'show') { // Show Bounce
			var animation = {opacity: 1};
			animation[ref] = (motion == 'pos' ? '+=' : '-=') + distance;
			el.animate(animation, speed / 2, o.options.easing);
			distance = distance / 2;
			times--;
		};
		for (var i = 0; i < times; i++) { // Bounces
			var animation1 = {}, animation2 = {};
			animation1[ref] = (motion == 'pos' ? '-=' : '+=') + distance;
			animation2[ref] = (motion == 'pos' ? '+=' : '-=') + distance;
			el.animate(animation1, speed / 2, o.options.easing).animate(animation2, speed / 2, o.options.easing);
			distance = (mode == 'hide') ? distance * 2 : distance / 2;
		};
		if (mode == 'hide') { // Last Bounce
			var animation = {opacity: 0};
			animation[ref] = (motion == 'pos' ? '-=' : '+=')  + distance;
			el.animate(animation, speed / 2, o.options.easing, function(){
				el.hide(); // Hide
				$.effects.restore(el, props); $.effects.removeWrapper(el); // Restore
				if(o.callback) o.callback.apply(this, arguments); // Callback
			});
		} else {
			var animation1 = {}, animation2 = {};
			animation1[ref] = (motion == 'pos' ? '-=' : '+=') + distance;
			animation2[ref] = (motion == 'pos' ? '+=' : '-=') + distance;
			el.animate(animation1, speed / 2, o.options.easing).animate(animation2, speed / 2, o.options.easing, function(){
				$.effects.restore(el, props); $.effects.removeWrapper(el); // Restore
				if(o.callback) o.callback.apply(this, arguments); // Callback
			});
		};
		el.queue('fx', function() { el.dequeue(); });
		el.dequeue();
	});

};

})(jQuery);
/*
 * jQuery UI Effects Clip 1.7.2
 *
 * Copyright (c) 2009 AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT (MIT-LICENSE.txt)
 * and GPL (GPL-LICENSE.txt) licenses.
 *
 * http://docs.jquery.com/UI/Effects/Clip
 *
 * Depends:
 *	effects.core.js
 */
(function($) {

$.effects.clip = function(o) {

	return this.queue(function() {

		// Create element
		var el = $(this), props = ['position','top','left','height','width'];

		// Set options
		var mode = $.effects.setMode(el, o.options.mode || 'hide'); // Set Mode
		var direction = o.options.direction || 'vertical'; // Default direction

		// Adjust
		$.effects.save(el, props); el.show(); // Save & Show
		var wrapper = $.effects.createWrapper(el).css({overflow:'hidden'}); // Create Wrapper
		var animate = el[0].tagName == 'IMG' ? wrapper : el;
		var ref = {
			size: (direction == 'vertical') ? 'height' : 'width',
			position: (direction == 'vertical') ? 'top' : 'left'
		};
		var distance = (direction == 'vertical') ? animate.height() : animate.width();
		if(mode == 'show') { animate.css(ref.size, 0); animate.css(ref.position, distance / 2); } // Shift

		// Animation
		var animation = {};
		animation[ref.size] = mode == 'show' ? distance : 0;
		animation[ref.position] = mode == 'show' ? 0 : distance / 2;

		// Animate
		animate.animate(animation, { queue: false, duration: o.duration, easing: o.options.easing, complete: function() {
			if(mode == 'hide') el.hide(); // Hide
			$.effects.restore(el, props); $.effects.removeWrapper(el); // Restore
			if(o.callback) o.callback.apply(el[0], arguments); // Callback
			el.dequeue();
		}});

	});

};

})(jQuery);
/*
 * jQuery UI Effects Drop 1.7.2
 *
 * Copyright (c) 2009 AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT (MIT-LICENSE.txt)
 * and GPL (GPL-LICENSE.txt) licenses.
 *
 * http://docs.jquery.com/UI/Effects/Drop
 *
 * Depends:
 *	effects.core.js
 */
(function($) {

$.effects.drop = function(o) {

	return this.queue(function() {

		// Create element
		var el = $(this), props = ['position','top','left','opacity'];

		// Set options
		var mode = $.effects.setMode(el, o.options.mode || 'hide'); // Set Mode
		var direction = o.options.direction || 'left'; // Default Direction

		// Adjust
		$.effects.save(el, props); el.show(); // Save & Show
		$.effects.createWrapper(el); // Create Wrapper
		var ref = (direction == 'up' || direction == 'down') ? 'top' : 'left';
		var motion = (direction == 'up' || direction == 'left') ? 'pos' : 'neg';
		var distance = o.options.distance || (ref == 'top' ? el.outerHeight({margin:true}) / 2 : el.outerWidth({margin:true}) / 2);
		if (mode == 'show') el.css('opacity', 0).css(ref, motion == 'pos' ? -distance : distance); // Shift

		// Animation
		var animation = {opacity: mode == 'show' ? 1 : 0};
		animation[ref] = (mode == 'show' ? (motion == 'pos' ? '+=' : '-=') : (motion == 'pos' ? '-=' : '+=')) + distance;

		// Animate
		el.animate(animation, { queue: false, duration: o.duration, easing: o.options.easing, complete: function() {
			if(mode == 'hide') el.hide(); // Hide
			$.effects.restore(el, props); $.effects.removeWrapper(el); // Restore
			if(o.callback) o.callback.apply(this, arguments); // Callback
			el.dequeue();
		}});

	});

};

})(jQuery);
/*
 * jQuery UI Effects Explode 1.7.2
 *
 * Copyright (c) 2009 AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT (MIT-LICENSE.txt)
 * and GPL (GPL-LICENSE.txt) licenses.
 *
 * http://docs.jquery.com/UI/Effects/Explode
 *
 * Depends:
 *	effects.core.js
 */
(function($) {

$.effects.explode = function(o) {

	return this.queue(function() {

	var rows = o.options.pieces ? Math.round(Math.sqrt(o.options.pieces)) : 3;
	var cells = o.options.pieces ? Math.round(Math.sqrt(o.options.pieces)) : 3;

	o.options.mode = o.options.mode == 'toggle' ? ($(this).is(':visible') ? 'hide' : 'show') : o.options.mode;
	var el = $(this).show().css('visibility', 'hidden');
	var offset = el.offset();

	//Substract the margins - not fixing the problem yet.
	offset.top -= parseInt(el.css("marginTop"),10) || 0;
	offset.left -= parseInt(el.css("marginLeft"),10) || 0;

	var width = el.outerWidth(true);
	var height = el.outerHeight(true);

	for(var i=0;i<rows;i++) { // =
		for(var j=0;j<cells;j++) { // ||
			el
				.clone()
				.appendTo('body')
				.wrap('<div></div>')
				.css({
					position: 'absolute',
					visibility: 'visible',
					left: -j*(width/cells),
					top: -i*(height/rows)
				})
				.parent()
				.addClass('ui-effects-explode')
				.css({
					position: 'absolute',
					overflow: 'hidden',
					width: width/cells,
					height: height/rows,
					left: offset.left + j*(width/cells) + (o.options.mode == 'show' ? (j-Math.floor(cells/2))*(width/cells) : 0),
					top: offset.top + i*(height/rows) + (o.options.mode == 'show' ? (i-Math.floor(rows/2))*(height/rows) : 0),
					opacity: o.options.mode == 'show' ? 0 : 1
				}).animate({
					left: offset.left + j*(width/cells) + (o.options.mode == 'show' ? 0 : (j-Math.floor(cells/2))*(width/cells)),
					top: offset.top + i*(height/rows) + (o.options.mode == 'show' ? 0 : (i-Math.floor(rows/2))*(height/rows)),
					opacity: o.options.mode == 'show' ? 1 : 0
				}, o.duration || 500);
		}
	}

	// Set a timeout, to call the callback approx. when the other animations have finished
	setTimeout(function() {

		o.options.mode == 'show' ? el.css({ visibility: 'visible' }) : el.css({ visibility: 'visible' }).hide();
				if(o.callback) o.callback.apply(el[0]); // Callback
				el.dequeue();

				$('div.ui-effects-explode').remove();

	}, o.duration || 500);


	});

};

})(jQuery);
/*
 * jQuery UI Effects Fold 1.7.2
 *
 * Copyright (c) 2009 AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT (MIT-LICENSE.txt)
 * and GPL (GPL-LICENSE.txt) licenses.
 *
 * http://docs.jquery.com/UI/Effects/Fold
 *
 * Depends:
 *	effects.core.js
 */
(function($) {

$.effects.fold = function(o) {

	return this.queue(function() {

		// Create element
		var el = $(this), props = ['position','top','left'];

		// Set options
		var mode = $.effects.setMode(el, o.options.mode || 'hide'); // Set Mode
		var size = o.options.size || 15; // Default fold size
		var horizFirst = !(!o.options.horizFirst); // Ensure a boolean value
		var duration = o.duration ? o.duration / 2 : $.fx.speeds._default / 2;

		// Adjust
		$.effects.save(el, props); el.show(); // Save & Show
		var wrapper = $.effects.createWrapper(el).css({overflow:'hidden'}); // Create Wrapper
		var widthFirst = ((mode == 'show') != horizFirst);
		var ref = widthFirst ? ['width', 'height'] : ['height', 'width'];
		var distance = widthFirst ? [wrapper.width(), wrapper.height()] : [wrapper.height(), wrapper.width()];
		var percent = /([0-9]+)%/.exec(size);
		if(percent) size = parseInt(percent[1],10) / 100 * distance[mode == 'hide' ? 0 : 1];
		if(mode == 'show') wrapper.css(horizFirst ? {height: 0, width: size} : {height: size, width: 0}); // Shift

		// Animation
		var animation1 = {}, animation2 = {};
		animation1[ref[0]] = mode == 'show' ? distance[0] : size;
		animation2[ref[1]] = mode == 'show' ? distance[1] : 0;

		// Animate
		wrapper.animate(animation1, duration, o.options.easing)
		.animate(animation2, duration, o.options.easing, function() {
			if(mode == 'hide') el.hide(); // Hide
			$.effects.restore(el, props); $.effects.removeWrapper(el); // Restore
			if(o.callback) o.callback.apply(el[0], arguments); // Callback
			el.dequeue();
		});

	});

};

})(jQuery);
/*
 * jQuery UI Effects Highlight 1.7.2
 *
 * Copyright (c) 2009 AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT (MIT-LICENSE.txt)
 * and GPL (GPL-LICENSE.txt) licenses.
 *
 * http://docs.jquery.com/UI/Effects/Highlight
 *
 * Depends:
 *	effects.core.js
 */
(function($) {

$.effects.highlight = function(o) {

	return this.queue(function() {

		// Create element
		var el = $(this), props = ['backgroundImage','backgroundColor','opacity'];

		// Set options
		var mode = $.effects.setMode(el, o.options.mode || 'show'); // Set Mode
		var color = o.options.color || "#ffff99"; // Default highlight color
		var oldColor = el.css("backgroundColor");

		// Adjust
		$.effects.save(el, props); el.show(); // Save & Show
		el.css({backgroundImage: 'none', backgroundColor: color}); // Shift

		// Animation
		var animation = {backgroundColor: oldColor };
		if (mode == "hide") animation['opacity'] = 0;

		// Animate
		el.animate(animation, { queue: false, duration: o.duration, easing: o.options.easing, complete: function() {
			if(mode == "hide") el.hide();
			$.effects.restore(el, props);
		if (mode == "show" && $.browser.msie) this.style.removeAttribute('filter');
			if(o.callback) o.callback.apply(this, arguments);
			el.dequeue();
		}});

	});

};

})(jQuery);
/*
 * jQuery UI Effects Pulsate 1.7.2
 *
 * Copyright (c) 2009 AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT (MIT-LICENSE.txt)
 * and GPL (GPL-LICENSE.txt) licenses.
 *
 * http://docs.jquery.com/UI/Effects/Pulsate
 *
 * Depends:
 *	effects.core.js
 */
(function($) {

$.effects.pulsate = function(o) {

	return this.queue(function() {

		// Create element
		var el = $(this);

		// Set options
		var mode = $.effects.setMode(el, o.options.mode || 'show'); // Set Mode
		var times = o.options.times || 5; // Default # of times
		var duration = o.duration ? o.duration / 2 : $.fx.speeds._default / 2;

		// Adjust
		if (mode == 'hide') times--;
		if (el.is(':hidden')) { // Show fadeIn
			el.css('opacity', 0);
			el.show(); // Show
			el.animate({opacity: 1}, duration, o.options.easing);
			times = times-2;
		}

		// Animate
		for (var i = 0; i < times; i++) { // Pulsate
			el.animate({opacity: 0}, duration, o.options.easing).animate({opacity: 1}, duration, o.options.easing);
		};
		if (mode == 'hide') { // Last Pulse
			el.animate({opacity: 0}, duration, o.options.easing, function(){
				el.hide(); // Hide
				if(o.callback) o.callback.apply(this, arguments); // Callback
			});
		} else {
			el.animate({opacity: 0}, duration, o.options.easing).animate({opacity: 1}, duration, o.options.easing, function(){
				if(o.callback) o.callback.apply(this, arguments); // Callback
			});
		};
		el.queue('fx', function() { el.dequeue(); });
		el.dequeue();
	});

};

})(jQuery);
/*
 * jQuery UI Effects Scale 1.7.2
 *
 * Copyright (c) 2009 AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT (MIT-LICENSE.txt)
 * and GPL (GPL-LICENSE.txt) licenses.
 *
 * http://docs.jquery.com/UI/Effects/Scale
 *
 * Depends:
 *	effects.core.js
 */
(function($) {

$.effects.puff = function(o) {

	return this.queue(function() {

		// Create element
		var el = $(this);

		// Set options
		var options = $.extend(true, {}, o.options);
		var mode = $.effects.setMode(el, o.options.mode || 'hide'); // Set Mode
		var percent = parseInt(o.options.percent,10) || 150; // Set default puff percent
		options.fade = true; // It's not a puff if it doesn't fade! :)
		var original = {height: el.height(), width: el.width()}; // Save original

		// Adjust
		var factor = percent / 100;
		el.from = (mode == 'hide') ? original : {height: original.height * factor, width: original.width * factor};

		// Animation
		options.from = el.from;
		options.percent = (mode == 'hide') ? percent : 100;
		options.mode = mode;

		// Animate
		el.effect('scale', options, o.duration, o.callback);
		el.dequeue();
	});

};

$.effects.scale = function(o) {

	return this.queue(function() {

		// Create element
		var el = $(this);

		// Set options
		var options = $.extend(true, {}, o.options);
		var mode = $.effects.setMode(el, o.options.mode || 'effect'); // Set Mode
		var percent = parseInt(o.options.percent,10) || (parseInt(o.options.percent,10) == 0 ? 0 : (mode == 'hide' ? 0 : 100)); // Set default scaling percent
		var direction = o.options.direction || 'both'; // Set default axis
		var origin = o.options.origin; // The origin of the scaling
		if (mode != 'effect') { // Set default origin and restore for show/hide
			options.origin = origin || ['middle','center'];
			options.restore = true;
		}
		var original = {height: el.height(), width: el.width()}; // Save original
		el.from = o.options.from || (mode == 'show' ? {height: 0, width: 0} : original); // Default from state

		// Adjust
		var factor = { // Set scaling factor
			y: direction != 'horizontal' ? (percent / 100) : 1,
			x: direction != 'vertical' ? (percent / 100) : 1
		};
		el.to = {height: original.height * factor.y, width: original.width * factor.x}; // Set to state

		if (o.options.fade) { // Fade option to support puff
			if (mode == 'show') {el.from.opacity = 0; el.to.opacity = 1;};
			if (mode == 'hide') {el.from.opacity = 1; el.to.opacity = 0;};
		};

		// Animation
		options.from = el.from; options.to = el.to; options.mode = mode;

		// Animate
		el.effect('size', options, o.duration, o.callback);
		el.dequeue();
	});

};

$.effects.size = function(o) {

	return this.queue(function() {

		// Create element
		var el = $(this), props = ['position','top','left','width','height','overflow','opacity'];
		var props1 = ['position','top','left','overflow','opacity']; // Always restore
		var props2 = ['width','height','overflow']; // Copy for children
		var cProps = ['fontSize'];
		var vProps = ['borderTopWidth', 'borderBottomWidth', 'paddingTop', 'paddingBottom'];
		var hProps = ['borderLeftWidth', 'borderRightWidth', 'paddingLeft', 'paddingRight'];

		// Set options
		var mode = $.effects.setMode(el, o.options.mode || 'effect'); // Set Mode
		var restore = o.options.restore || false; // Default restore
		var scale = o.options.scale || 'both'; // Default scale mode
		var origin = o.options.origin; // The origin of the sizing
		var original = {height: el.height(), width: el.width()}; // Save original
		el.from = o.options.from || original; // Default from state
		el.to = o.options.to || original; // Default to state
		// Adjust
		if (origin) { // Calculate baseline shifts
			var baseline = $.effects.getBaseline(origin, original);
			el.from.top = (original.height - el.from.height) * baseline.y;
			el.from.left = (original.width - el.from.width) * baseline.x;
			el.to.top = (original.height - el.to.height) * baseline.y;
			el.to.left = (original.width - el.to.width) * baseline.x;
		};
		var factor = { // Set scaling factor
			from: {y: el.from.height / original.height, x: el.from.width / original.width},
			to: {y: el.to.height / original.height, x: el.to.width / original.width}
		};
		if (scale == 'box' || scale == 'both') { // Scale the css box
			if (factor.from.y != factor.to.y) { // Vertical props scaling
				props = props.concat(vProps);
				el.from = $.effects.setTransition(el, vProps, factor.from.y, el.from);
				el.to = $.effects.setTransition(el, vProps, factor.to.y, el.to);
			};
			if (factor.from.x != factor.to.x) { // Horizontal props scaling
				props = props.concat(hProps);
				el.from = $.effects.setTransition(el, hProps, factor.from.x, el.from);
				el.to = $.effects.setTransition(el, hProps, factor.to.x, el.to);
			};
		};
		if (scale == 'content' || scale == 'both') { // Scale the content
			if (factor.from.y != factor.to.y) { // Vertical props scaling
				props = props.concat(cProps);
				el.from = $.effects.setTransition(el, cProps, factor.from.y, el.from);
				el.to = $.effects.setTransition(el, cProps, factor.to.y, el.to);
			};
		};
		$.effects.save(el, restore ? props : props1); el.show(); // Save & Show
		$.effects.createWrapper(el); // Create Wrapper
		el.css('overflow','hidden').css(el.from); // Shift

		// Animate
		if (scale == 'content' || scale == 'both') { // Scale the children
			vProps = vProps.concat(['marginTop','marginBottom']).concat(cProps); // Add margins/font-size
			hProps = hProps.concat(['marginLeft','marginRight']); // Add margins
			props2 = props.concat(vProps).concat(hProps); // Concat
			el.find("*[width]").each(function(){
				child = $(this);
				if (restore) $.effects.save(child, props2);
				var c_original = {height: child.height(), width: child.width()}; // Save original
				child.from = {height: c_original.height * factor.from.y, width: c_original.width * factor.from.x};
				child.to = {height: c_original.height * factor.to.y, width: c_original.width * factor.to.x};
				if (factor.from.y != factor.to.y) { // Vertical props scaling
					child.from = $.effects.setTransition(child, vProps, factor.from.y, child.from);
					child.to = $.effects.setTransition(child, vProps, factor.to.y, child.to);
				};
				if (factor.from.x != factor.to.x) { // Horizontal props scaling
					child.from = $.effects.setTransition(child, hProps, factor.from.x, child.from);
					child.to = $.effects.setTransition(child, hProps, factor.to.x, child.to);
				};
				child.css(child.from); // Shift children
				child.animate(child.to, o.duration, o.options.easing, function(){
					if (restore) $.effects.restore(child, props2); // Restore children
				}); // Animate children
			});
		};

		// Animate
		el.animate(el.to, { queue: false, duration: o.duration, easing: o.options.easing, complete: function() {
			if(mode == 'hide') el.hide(); // Hide
			$.effects.restore(el, restore ? props : props1); $.effects.removeWrapper(el); // Restore
			if(o.callback) o.callback.apply(this, arguments); // Callback
			el.dequeue();
		}});

	});

};

})(jQuery);
/*
 * jQuery UI Effects Shake 1.7.2
 *
 * Copyright (c) 2009 AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT (MIT-LICENSE.txt)
 * and GPL (GPL-LICENSE.txt) licenses.
 *
 * http://docs.jquery.com/UI/Effects/Shake
 *
 * Depends:
 *	effects.core.js
 */
(function($) {

$.effects.shake = function(o) {

	return this.queue(function() {

		// Create element
		var el = $(this), props = ['position','top','left'];

		// Set options
		var mode = $.effects.setMode(el, o.options.mode || 'effect'); // Set Mode
		var direction = o.options.direction || 'left'; // Default direction
		var distance = o.options.distance || 20; // Default distance
		var times = o.options.times || 3; // Default # of times
		var speed = o.duration || o.options.duration || 140; // Default speed per shake

		// Adjust
		$.effects.save(el, props); el.show(); // Save & Show
		$.effects.createWrapper(el); // Create Wrapper
		var ref = (direction == 'up' || direction == 'down') ? 'top' : 'left';
		var motion = (direction == 'up' || direction == 'left') ? 'pos' : 'neg';

		// Animation
		var animation = {}, animation1 = {}, animation2 = {};
		animation[ref] = (motion == 'pos' ? '-=' : '+=')  + distance;
		animation1[ref] = (motion == 'pos' ? '+=' : '-=')  + distance * 2;
		animation2[ref] = (motion == 'pos' ? '-=' : '+=')  + distance * 2;

		// Animate
		el.animate(animation, speed, o.options.easing);
		for (var i = 1; i < times; i++) { // Shakes
			el.animate(animation1, speed, o.options.easing).animate(animation2, speed, o.options.easing);
		};
		el.animate(animation1, speed, o.options.easing).
		animate(animation, speed / 2, o.options.easing, function(){ // Last shake
			$.effects.restore(el, props); $.effects.removeWrapper(el); // Restore
			if(o.callback) o.callback.apply(this, arguments); // Callback
		});
		el.queue('fx', function() { el.dequeue(); });
		el.dequeue();
	});

};

})(jQuery);
/*
 * jQuery UI Effects Slide 1.7.2
 *
 * Copyright (c) 2009 AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT (MIT-LICENSE.txt)
 * and GPL (GPL-LICENSE.txt) licenses.
 *
 * http://docs.jquery.com/UI/Effects/Slide
 *
 * Depends:
 *	effects.core.js
 */
(function($) {

$.effects.slide = function(o) {

	return this.queue(function() {

		// Create element
		var el = $(this), props = ['position','top','left'];

		// Set options
		var mode = $.effects.setMode(el, o.options.mode || 'show'); // Set Mode
		var direction = o.options.direction || 'left'; // Default Direction

		// Adjust
		$.effects.save(el, props); el.show(); // Save & Show
		$.effects.createWrapper(el).css({overflow:'hidden'}); // Create Wrapper
		var ref = (direction == 'up' || direction == 'down') ? 'top' : 'left';
		var motion = (direction == 'up' || direction == 'left') ? 'pos' : 'neg';
		var distance = o.options.distance || (ref == 'top' ? el.outerHeight({margin:true}) : el.outerWidth({margin:true}));
		if (mode == 'show') el.css(ref, motion == 'pos' ? -distance : distance); // Shift

		// Animation
		var animation = {};
		animation[ref] = (mode == 'show' ? (motion == 'pos' ? '+=' : '-=') : (motion == 'pos' ? '-=' : '+=')) + distance;

		// Animate
		el.animate(animation, { queue: false, duration: o.duration, easing: o.options.easing, complete: function() {
			if(mode == 'hide') el.hide(); // Hide
			$.effects.restore(el, props); $.effects.removeWrapper(el); // Restore
			if(o.callback) o.callback.apply(this, arguments); // Callback
			el.dequeue();
		}});

	});

};

})(jQuery);
/*
 * jQuery UI Effects Transfer 1.7.2
 *
 * Copyright (c) 2009 AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT (MIT-LICENSE.txt)
 * and GPL (GPL-LICENSE.txt) licenses.
 *
 * http://docs.jquery.com/UI/Effects/Transfer
 *
 * Depends:
 *	effects.core.js
 */
(function($) {

$.effects.transfer = function(o) {
	return this.queue(function() {
		var elem = $(this),
			target = $(o.options.to),
			endPosition = target.offset(),
			animation = {
				top: endPosition.top,
				left: endPosition.left,
				height: target.innerHeight(),
				width: target.innerWidth()
			},
			startPosition = elem.offset(),
			transfer = $('<div class="ui-effects-transfer"></div>')
				.appendTo(document.body)
				.addClass(o.options.className)
				.css({
					top: startPosition.top,
					left: startPosition.left,
					height: elem.innerHeight(),
					width: elem.innerWidth(),
					position: 'absolute'
				})
				.animate(animation, o.duration, o.options.easing, function() {
					transfer.remove();
					(o.callback && o.callback.apply(elem[0], arguments));
					elem.dequeue();
				});
	});
};

})(jQuery);
/*
 * jQuery UI Accordion 1.7.2
 *
 * Copyright (c) 2009 AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT (MIT-LICENSE.txt)
 * and GPL (GPL-LICENSE.txt) licenses.
 *
 * http://docs.jquery.com/UI/Accordion
 *
 * Depends:
 *	ui.core.js
 */
(function($) {

$.widget("ui.accordion", {

	_init: function() {

		var o = this.options, self = this;
		this.running = 0;

		// if the user set the alwaysOpen option on init
		// then we need to set the collapsible option
		// if they set both on init, collapsible will take priority
		if (o.collapsible == $.ui.accordion.defaults.collapsible &&
			o.alwaysOpen != $.ui.accordion.defaults.alwaysOpen) {
			o.collapsible = !o.alwaysOpen;
		}

		if ( o.navigation ) {
			var current = this.element.find("a").filter(o.navigationFilter);
			if ( current.length ) {
				if ( current.filter(o.header).length ) {
					this.active = current;
				} else {
					this.active = current.parent().parent().prev();
					current.addClass("ui-accordion-content-active");
				}
			}
		}

		this.element.addClass("ui-accordion ui-widget ui-helper-reset");

		// in lack of child-selectors in CSS we need to mark top-LIs in a UL-accordion for some IE-fix
		if (this.element[0].nodeName == "UL") {
			this.element.children("li").addClass("ui-accordion-li-fix");
		}

		this.headers = this.element.find(o.header).addClass("ui-accordion-header ui-helper-reset ui-state-default ui-corner-all")
			.bind("mouseenter.accordion", function(){ $(this).addClass('ui-state-hover'); })
			.bind("mouseleave.accordion", function(){ $(this).removeClass('ui-state-hover'); })
			.bind("focus.accordion", function(){ $(this).addClass('ui-state-focus'); })
			.bind("blur.accordion", function(){ $(this).removeClass('ui-state-focus'); });

		this.headers
			.next()
				.addClass("ui-accordion-content ui-helper-reset ui-widget-content ui-corner-bottom");

		this.active = this._findActive(this.active || o.active).toggleClass("ui-state-default").toggleClass("ui-state-active").toggleClass("ui-corner-all").toggleClass("ui-corner-top");
		this.active.next().addClass('ui-accordion-content-active');

		//Append icon elements
		$("<span/>").addClass("ui-icon " + o.icons.header).prependTo(this.headers);
		this.active.find(".ui-icon").toggleClass(o.icons.header).toggleClass(o.icons.headerSelected);

		// IE7-/Win - Extra vertical space in lists fixed
		if ($.browser.msie) {
			this.element.find('a').css('zoom', '1');
		}

		this.resize();

		//ARIA
		this.element.attr('role','tablist');

		this.headers
			.attr('role','tab')
			.bind('keydown', function(event) { return self._keydown(event); })
			.next()
			.attr('role','tabpanel');

		this.headers
			.not(this.active || "")
			.attr('aria-expanded','false')
			.attr("tabIndex", "-1")
			.next()
			.hide();

		// make sure at least one header is in the tab order
		if (!this.active.length) {
			this.headers.eq(0).attr('tabIndex','0');
		} else {
			this.active
				.attr('aria-expanded','true')
				.attr('tabIndex', '0');
		}

		// only need links in taborder for Safari
		if (!$.browser.safari)
			this.headers.find('a').attr('tabIndex','-1');

		if (o.event) {
			this.headers.bind((o.event) + ".accordion", function(event) { return self._clickHandler.call(self, event, this); });
		}

	},

	destroy: function() {
		var o = this.options;

		this.element
			.removeClass("ui-accordion ui-widget ui-helper-reset")
			.removeAttr("role")
			.unbind('.accordion')
			.removeData('accordion');

		this.headers
			.unbind(".accordion")
			.removeClass("ui-accordion-header ui-helper-reset ui-state-default ui-corner-all ui-state-active ui-corner-top")
			.removeAttr("role").removeAttr("aria-expanded").removeAttr("tabindex");

		this.headers.find("a").removeAttr("tabindex");
		this.headers.children(".ui-icon").remove();
		var contents = this.headers.next().css("display", "").removeAttr("role").removeClass("ui-helper-reset ui-widget-content ui-corner-bottom ui-accordion-content ui-accordion-content-active");
		if (o.autoHeight || o.fillHeight) {
			contents.css("height", "");
		}
	},

	_setData: function(key, value) {
		if(key == 'alwaysOpen') { key = 'collapsible'; value = !value; }
		$.widget.prototype._setData.apply(this, arguments);
	},

	_keydown: function(event) {

		var o = this.options, keyCode = $.ui.keyCode;

		if (o.disabled || event.altKey || event.ctrlKey)
			return;

		var length = this.headers.length;
		var currentIndex = this.headers.index(event.target);
		var toFocus = false;

		switch(event.keyCode) {
			case keyCode.RIGHT:
			case keyCode.DOWN:
				toFocus = this.headers[(currentIndex + 1) % length];
				break;
			case keyCode.LEFT:
			case keyCode.UP:
				toFocus = this.headers[(currentIndex - 1 + length) % length];
				break;
			case keyCode.SPACE:
			case keyCode.ENTER:
				return this._clickHandler({ target: event.target }, event.target);
		}

		if (toFocus) {
			$(event.target).attr('tabIndex','-1');
			$(toFocus).attr('tabIndex','0');
			toFocus.focus();
			return false;
		}

		return true;

	},

	resize: function() {

		var o = this.options, maxHeight;

		if (o.fillSpace) {

			if($.browser.msie) { var defOverflow = this.element.parent().css('overflow'); this.element.parent().css('overflow', 'hidden'); }
			maxHeight = this.element.parent().height();
			if($.browser.msie) { this.element.parent().css('overflow', defOverflow); }

			this.headers.each(function() {
				maxHeight -= $(this).outerHeight();
			});

			var maxPadding = 0;
			this.headers.next().each(function() {
				maxPadding = Math.max(maxPadding, $(this).innerHeight() - $(this).height());
			}).height(Math.max(0, maxHeight - maxPadding))
			.css('overflow', 'auto');

		} else if ( o.autoHeight ) {
			maxHeight = 0;
			this.headers.next().each(function() {
				maxHeight = Math.max(maxHeight, $(this).outerHeight());
			}).height(maxHeight);
		}

	},

	activate: function(index) {
		// call clickHandler with custom event
		var active = this._findActive(index)[0];
		this._clickHandler({ target: active }, active);
	},

	_findActive: function(selector) {
		return selector
			? typeof selector == "number"
				? this.headers.filter(":eq(" + selector + ")")
				: this.headers.not(this.headers.not(selector))
			: selector === false
				? $([])
				: this.headers.filter(":eq(0)");
	},

	_clickHandler: function(event, target) {

		var o = this.options;
		if (o.disabled) return false;

		// called only when using activate(false) to close all parts programmatically
		if (!event.target && o.collapsible) {
			this.active.removeClass("ui-state-active ui-corner-top").addClass("ui-state-default ui-corner-all")
				.find(".ui-icon").removeClass(o.icons.headerSelected).addClass(o.icons.header);
			this.active.next().addClass('ui-accordion-content-active');
			var toHide = this.active.next(),
				data = {
					options: o,
					newHeader: $([]),
					oldHeader: o.active,
					newContent: $([]),
					oldContent: toHide
				},
				toShow = (this.active = $([]));
			this._toggle(toShow, toHide, data);
			return false;
		}

		// get the click target
		var clicked = $(event.currentTarget || target);
		var clickedIsActive = clicked[0] == this.active[0];

		// if animations are still active, or the active header is the target, ignore click
		if (this.running || (!o.collapsible && clickedIsActive)) {
			return false;
		}

		// switch classes
		this.active.removeClass("ui-state-active ui-corner-top").addClass("ui-state-default ui-corner-all")
			.find(".ui-icon").removeClass(o.icons.headerSelected).addClass(o.icons.header);
		this.active.next().addClass('ui-accordion-content-active');
		if (!clickedIsActive) {
			clicked.removeClass("ui-state-default ui-corner-all").addClass("ui-state-active ui-corner-top")
				.find(".ui-icon").removeClass(o.icons.header).addClass(o.icons.headerSelected);
			clicked.next().addClass('ui-accordion-content-active');
		}

		// find elements to show and hide
		var toShow = clicked.next(),
			toHide = this.active.next(),
			data = {
				options: o,
				newHeader: clickedIsActive && o.collapsible ? $([]) : clicked,
				oldHeader: this.active,
				newContent: clickedIsActive && o.collapsible ? $([]) : toShow.find('> *'),
				oldContent: toHide.find('> *')
			},
			down = this.headers.index( this.active[0] ) > this.headers.index( clicked[0] );

		this.active = clickedIsActive ? $([]) : clicked;
		this._toggle(toShow, toHide, data, clickedIsActive, down);

		return false;

	},

	_toggle: function(toShow, toHide, data, clickedIsActive, down) {

		var o = this.options, self = this;

		this.toShow = toShow;
		this.toHide = toHide;
		this.data = data;

		var complete = function() { if(!self) return; return self._completed.apply(self, arguments); };

		// trigger changestart event
		this._trigger("changestart", null, this.data);

		// count elements to animate
		this.running = toHide.size() === 0 ? toShow.size() : toHide.size();

		if (o.animated) {

			var animOptions = {};

			if ( o.collapsible && clickedIsActive ) {
				animOptions = {
					toShow: $([]),
					toHide: toHide,
					complete: complete,
					down: down,
					autoHeight: o.autoHeight || o.fillSpace
				};
			} else {
				animOptions = {
					toShow: toShow,
					toHide: toHide,
					complete: complete,
					down: down,
					autoHeight: o.autoHeight || o.fillSpace
				};
			}

			if (!o.proxied) {
				o.proxied = o.animated;
			}

			if (!o.proxiedDuration) {
				o.proxiedDuration = o.duration;
			}

			o.animated = $.isFunction(o.proxied) ?
				o.proxied(animOptions) : o.proxied;

			o.duration = $.isFunction(o.proxiedDuration) ?
				o.proxiedDuration(animOptions) : o.proxiedDuration;

			var animations = $.ui.accordion.animations,
				duration = o.duration,
				easing = o.animated;

			if (!animations[easing]) {
				animations[easing] = function(options) {
					this.slide(options, {
						easing: easing,
						duration: duration || 700
					});
				};
			}

			animations[easing](animOptions);

		} else {

			if (o.collapsible && clickedIsActive) {
				toShow.toggle();
			} else {
				toHide.hide();
				toShow.show();
			}

			complete(true);

		}

		toHide.prev().attr('aria-expanded','false').attr("tabIndex", "-1").blur();
		toShow.prev().attr('aria-expanded','true').attr("tabIndex", "0").focus();

	},

	_completed: function(cancel) {

		var o = this.options;

		this.running = cancel ? 0 : --this.running;
		if (this.running) return;

		if (o.clearStyle) {
			this.toShow.add(this.toHide).css({
				height: "",
				overflow: ""
			});
		}

		this._trigger('change', null, this.data);
	}

});


$.extend($.ui.accordion, {
	version: "1.7.2",
	defaults: {
		active: null,
		alwaysOpen: true, //deprecated, use collapsible
		animated: 'slide',
		autoHeight: true,
		clearStyle: false,
		collapsible: false,
		event: "click",
		fillSpace: false,
		header: "> li > :first-child,> :not(li):even",
		icons: {
			header: "ui-icon-triangle-1-e",
			headerSelected: "ui-icon-triangle-1-s"
		},
		navigation: false,
		navigationFilter: function() {
			return this.href.toLowerCase() == location.href.toLowerCase();
		}
	},
	animations: {
		slide: function(options, additions) {
			options = $.extend({
				easing: "swing",
				duration: 300
			}, options, additions);
			if ( !options.toHide.size() ) {
				options.toShow.animate({height: "show"}, options);
				return;
			}
			if ( !options.toShow.size() ) {
				options.toHide.animate({height: "hide"}, options);
				return;
			}
			var overflow = options.toShow.css('overflow'),
				percentDone,
				showProps = {},
				hideProps = {},
				fxAttrs = [ "height", "paddingTop", "paddingBottom" ],
				originalWidth;
			// fix width before calculating height of hidden element
			var s = options.toShow;
			originalWidth = s[0].style.width;
			s.width( parseInt(s.parent().width(),10) - parseInt(s.css("paddingLeft"),10) - parseInt(s.css("paddingRight"),10) - (parseInt(s.css("borderLeftWidth"),10) || 0) - (parseInt(s.css("borderRightWidth"),10) || 0) );

			$.each(fxAttrs, function(i, prop) {
				hideProps[prop] = 'hide';

				var parts = ('' + $.css(options.toShow[0], prop)).match(/^([\d+-.]+)(.*)$/);
				showProps[prop] = {
					value: parts[1],
					unit: parts[2] || 'px'
				};
			});
			options.toShow.css({ height: 0, overflow: 'hidden' }).show();
			options.toHide.filter(":hidden").each(options.complete).end().filter(":visible").animate(hideProps,{
				step: function(now, settings) {
					// only calculate the percent when animating height
					// IE gets very inconsistent results when animating elements
					// with small values, which is common for padding
					if (settings.prop == 'height') {
						percentDone = (settings.now - settings.start) / (settings.end - settings.start);
					}

					options.toShow[0].style[settings.prop] =
						(percentDone * showProps[settings.prop].value) + showProps[settings.prop].unit;
				},
				duration: options.duration,
				easing: options.easing,
				complete: function() {
					if ( !options.autoHeight ) {
						options.toShow.css("height", "");
					}
					options.toShow.css("width", originalWidth);
					options.toShow.css({overflow: overflow});
					options.complete();
				}
			});
		},
		bounceslide: function(options) {
			this.slide(options, {
				easing: options.down ? "easeOutBounce" : "swing",
				duration: options.down ? 1000 : 200
			});
		},
		easeslide: function(options) {
			this.slide(options, {
				easing: "easeinout",
				duration: 700
			});
		}
	}
});

})(jQuery);
/*
 * jQuery UI Datepicker 1.7.2
 *
 * Copyright (c) 2009 AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT (MIT-LICENSE.txt)
 * and GPL (GPL-LICENSE.txt) licenses.
 *
 * http://docs.jquery.com/UI/Datepicker
 *
 * Depends:
 *	ui.core.js
 */

(function($) { // hide the namespace

$.extend($.ui, { datepicker: { version: "1.7.2" } });

var PROP_NAME = 'datepicker';

/* Date picker manager.
   Use the singleton instance of this class, $.datepicker, to interact with the date picker.
   Settings for (groups of) date pickers are maintained in an instance object,
   allowing multiple different settings on the same page. */

function Datepicker() {
	this.debug = false; // Change this to true to start debugging
	this._curInst = null; // The current instance in use
	this._keyEvent = false; // If the last event was a key event
	this._disabledInputs = []; // List of date picker inputs that have been disabled
	this._datepickerShowing = false; // True if the popup picker is showing , false if not
	this._inDialog = false; // True if showing within a "dialog", false if not
	this._mainDivId = 'ui-datepicker-div'; // The ID of the main datepicker division
	this._inlineClass = 'ui-datepicker-inline'; // The name of the inline marker class
	this._appendClass = 'ui-datepicker-append'; // The name of the append marker class
	this._triggerClass = 'ui-datepicker-trigger'; // The name of the trigger marker class
	this._dialogClass = 'ui-datepicker-dialog'; // The name of the dialog marker class
	this._disableClass = 'ui-datepicker-disabled'; // The name of the disabled covering marker class
	this._unselectableClass = 'ui-datepicker-unselectable'; // The name of the unselectable cell marker class
	this._currentClass = 'ui-datepicker-current-day'; // The name of the current day marker class
	this._dayOverClass = 'ui-datepicker-days-cell-over'; // The name of the day hover marker class
	this.regional = []; // Available regional settings, indexed by language code
	this.regional[''] = { // Default regional settings
		closeText: 'Done', // Display text for close link
		prevText: 'Prev', // Display text for previous month link
		nextText: 'Next', // Display text for next month link
		currentText: 'Today', // Display text for current month link
		monthNames: ['January','February','March','April','May','June',
			'July','August','September','October','November','December'], // Names of months for drop-down and formatting
		monthNamesShort: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'], // For formatting
		dayNames: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'], // For formatting
		dayNamesShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'], // For formatting
		dayNamesMin: ['Su','Mo','Tu','We','Th','Fr','Sa'], // Column headings for days starting at Sunday
		dateFormat: 'mm/dd/yy', // See format options on parseDate
		firstDay: 0, // The first day of the week, Sun = 0, Mon = 1, ...
		isRTL: false // True if right-to-left language, false if left-to-right
	};
	this._defaults = { // Global defaults for all the date picker instances
		showOn: 'focus', // 'focus' for popup on focus,
			// 'button' for trigger button, or 'both' for either
		showAnim: 'show', // Name of jQuery animation for popup
		showOptions: {}, // Options for enhanced animations
		defaultDate: null, // Used when field is blank: actual date,
			// +/-number for offset from today, null for today
		appendText: '', // Display text following the input box, e.g. showing the format
		buttonText: '...', // Text for trigger button
		buttonImage: '', // URL for trigger button image
		buttonImageOnly: false, // True if the image appears alone, false if it appears on a button
		hideIfNoPrevNext: false, // True to hide next/previous month links
			// if not applicable, false to just disable them
		navigationAsDateFormat: false, // True if date formatting applied to prev/today/next links
		gotoCurrent: false, // True if today link goes back to current selection instead
		changeMonth: false, // True if month can be selected directly, false if only prev/next
		changeYear: false, // True if year can be selected directly, false if only prev/next
		showMonthAfterYear: false, // True if the year select precedes month, false for month then year
		yearRange: '-10:+10', // Range of years to display in drop-down,
			// either relative to current year (-nn:+nn) or absolute (nnnn:nnnn)
		showOtherMonths: false, // True to show dates in other months, false to leave blank
		calculateWeek: this.iso8601Week, // How to calculate the week of the year,
			// takes a Date and returns the number of the week for it
		shortYearCutoff: '+10', // Short year values < this are in the current century,
			// > this are in the previous century,
			// string value starting with '+' for current year + value
		minDate: null, // The earliest selectable date, or null for no limit
		maxDate: null, // The latest selectable date, or null for no limit
		duration: 'normal', // Duration of display/closure
		beforeShowDay: null, // Function that takes a date and returns an array with
			// [0] = true if selectable, false if not, [1] = custom CSS class name(s) or '',
			// [2] = cell title (optional), e.g. $.datepicker.noWeekends
		beforeShow: null, // Function that takes an input field and
			// returns a set of custom settings for the date picker
		onSelect: null, // Define a callback function when a date is selected
		onChangeMonthYear: null, // Define a callback function when the month or year is changed
		onClose: null, // Define a callback function when the datepicker is closed
		numberOfMonths: 1, // Number of months to show at a time
		showCurrentAtPos: 0, // The position in multipe months at which to show the current month (starting at 0)
		stepMonths: 1, // Number of months to step back/forward
		stepBigMonths: 12, // Number of months to step back/forward for the big links
		altField: '', // Selector for an alternate field to store selected dates into
		altFormat: '', // The date format to use for the alternate field
		constrainInput: true, // The input is constrained by the current date format
		showButtonPanel: false // True to show button panel, false to not show it
	};
	$.extend(this._defaults, this.regional['']);
	this.dpDiv = $('<div id="' + this._mainDivId + '" class="ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all ui-helper-hidden-accessible"></div>');
}

$.extend(Datepicker.prototype, {
	/* Class name added to elements to indicate already configured with a date picker. */
	markerClassName: 'hasDatepicker',

	/* Debug logging (if enabled). */
	log: function () {
		if (this.debug)
			console.log.apply('', arguments);
	},

	/* Override the default settings for all instances of the date picker.
	   @param  settings  object - the new settings to use as defaults (anonymous object)
	   @return the manager object */
	setDefaults: function(settings) {
		extendRemove(this._defaults, settings || {});
		return this;
	},

	/* Attach the date picker to a jQuery selection.
	   @param  target    element - the target input field or division or span
	   @param  settings  object - the new settings to use for this date picker instance (anonymous) */
	_attachDatepicker: function(target, settings) {
		// check for settings on the control itself - in namespace 'date:'
		var inlineSettings = null;
		for (var attrName in this._defaults) {
			var attrValue = target.getAttribute('date:' + attrName);
			if (attrValue) {
				inlineSettings = inlineSettings || {};
				try {
					inlineSettings[attrName] = eval(attrValue);
				} catch (err) {
					inlineSettings[attrName] = attrValue;
				}
			}
		}
		var nodeName = target.nodeName.toLowerCase();
		var inline = (nodeName == 'div' || nodeName == 'span');
		if (!target.id)
			target.id = 'dp' + (++this.uuid);
		var inst = this._newInst($(target), inline);
		inst.settings = $.extend({}, settings || {}, inlineSettings || {});
		if (nodeName == 'input') {
			this._connectDatepicker(target, inst);
		} else if (inline) {
			this._inlineDatepicker(target, inst);
		}
	},

	/* Create a new instance object. */
	_newInst: function(target, inline) {
		var id = target[0].id.replace(/([:\[\]\.])/g, '\\\\$1'); // escape jQuery meta chars
		return {id: id, input: target, // associated target
			selectedDay: 0, selectedMonth: 0, selectedYear: 0, // current selection
			drawMonth: 0, drawYear: 0, // month being drawn
			inline: inline, // is datepicker inline or not
			dpDiv: (!inline ? this.dpDiv : // presentation div
			$('<div class="' + this._inlineClass + ' ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all"></div>'))};
	},

	/* Attach the date picker to an input field. */
	_connectDatepicker: function(target, inst) {
		var input = $(target);
		inst.append = $([]);
		inst.trigger = $([]);
		if (input.hasClass(this.markerClassName))
			return;
		var appendText = this._get(inst, 'appendText');
		var isRTL = this._get(inst, 'isRTL');
		if (appendText) {
			inst.append = $('<span class="' + this._appendClass + '">' + appendText + '</span>');
			input[isRTL ? 'before' : 'after'](inst.append);
		}
		var showOn = this._get(inst, 'showOn');
		if (showOn == 'focus' || showOn == 'both') // pop-up date picker when in the marked field
			input.focus(this._showDatepicker);
		if (showOn == 'button' || showOn == 'both') { // pop-up date picker when button clicked
			var buttonText = this._get(inst, 'buttonText');
			var buttonImage = this._get(inst, 'buttonImage');
			inst.trigger = $(this._get(inst, 'buttonImageOnly') ?
				$('<img/>').addClass(this._triggerClass).
					attr({ src: buttonImage, alt: buttonText, title: buttonText }) :
				$('<button type="button"></button>').addClass(this._triggerClass).
					html(buttonImage == '' ? buttonText : $('<img/>').attr(
					{ src:buttonImage, alt:buttonText, title:buttonText })));
			input[isRTL ? 'before' : 'after'](inst.trigger);
			inst.trigger.click(function() {
				if ($.datepicker._datepickerShowing && $.datepicker._lastInput == target)
					$.datepicker._hideDatepicker();
				else
					$.datepicker._showDatepicker(target);
				return false;
			});
		}
		input.addClass(this.markerClassName).keydown(this._doKeyDown).keypress(this._doKeyPress).
			bind("setData.datepicker", function(event, key, value) {
				inst.settings[key] = value;
			}).bind("getData.datepicker", function(event, key) {
				return this._get(inst, key);
			});
		$.data(target, PROP_NAME, inst);
	},

	/* Attach an inline date picker to a div. */
	_inlineDatepicker: function(target, inst) {
		var divSpan = $(target);
		if (divSpan.hasClass(this.markerClassName))
			return;
		divSpan.addClass(this.markerClassName).append(inst.dpDiv).
			bind("setData.datepicker", function(event, key, value){
				inst.settings[key] = value;
			}).bind("getData.datepicker", function(event, key){
				return this._get(inst, key);
			});
		$.data(target, PROP_NAME, inst);
		this._setDate(inst, this._getDefaultDate(inst));
		this._updateDatepicker(inst);
		this._updateAlternate(inst);
	},

	/* Pop-up the date picker in a "dialog" box.
	   @param  input     element - ignored
	   @param  dateText  string - the initial date to display (in the current format)
	   @param  onSelect  function - the function(dateText) to call when a date is selected
	   @param  settings  object - update the dialog date picker instance's settings (anonymous object)
	   @param  pos       int[2] - coordinates for the dialog's position within the screen or
	                     event - with x/y coordinates or
	                     leave empty for default (screen centre)
	   @return the manager object */
	_dialogDatepicker: function(input, dateText, onSelect, settings, pos) {
		var inst = this._dialogInst; // internal instance
		if (!inst) {
			var id = 'dp' + (++this.uuid);
			this._dialogInput = $('<input type="text" id="' + id +
				'" size="1" style="position: absolute; top: -100px;"/>');
			this._dialogInput.keydown(this._doKeyDown);
			$('body').append(this._dialogInput);
			inst = this._dialogInst = this._newInst(this._dialogInput, false);
			inst.settings = {};
			$.data(this._dialogInput[0], PROP_NAME, inst);
		}
		extendRemove(inst.settings, settings || {});
		this._dialogInput.val(dateText);

		this._pos = (pos ? (pos.length ? pos : [pos.pageX, pos.pageY]) : null);
		if (!this._pos) {
			var browserWidth = window.innerWidth || document.documentElement.clientWidth ||	document.body.clientWidth;
			var browserHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
			var scrollX = document.documentElement.scrollLeft || document.body.scrollLeft;
			var scrollY = document.documentElement.scrollTop || document.body.scrollTop;
			this._pos = // should use actual width/height below
				[(browserWidth / 2) - 100 + scrollX, (browserHeight / 2) - 150 + scrollY];
		}

		// move input on screen for focus, but hidden behind dialog
		this._dialogInput.css('left', this._pos[0] + 'px').css('top', this._pos[1] + 'px');
		inst.settings.onSelect = onSelect;
		this._inDialog = true;
		this.dpDiv.addClass(this._dialogClass);
		this._showDatepicker(this._dialogInput[0]);
		if ($.blockUI)
			$.blockUI(this.dpDiv);
		$.data(this._dialogInput[0], PROP_NAME, inst);
		return this;
	},

	/* Detach a datepicker from its control.
	   @param  target    element - the target input field or division or span */
	_destroyDatepicker: function(target) {
		var $target = $(target);
		var inst = $.data(target, PROP_NAME);
		if (!$target.hasClass(this.markerClassName)) {
			return;
		}
		var nodeName = target.nodeName.toLowerCase();
		$.removeData(target, PROP_NAME);
		if (nodeName == 'input') {
			inst.append.remove();
			inst.trigger.remove();
			$target.removeClass(this.markerClassName).
				unbind('focus', this._showDatepicker).
				unbind('keydown', this._doKeyDown).
				unbind('keypress', this._doKeyPress);
		} else if (nodeName == 'div' || nodeName == 'span')
			$target.removeClass(this.markerClassName).empty();
	},

	/* Enable the date picker to a jQuery selection.
	   @param  target    element - the target input field or division or span */
	_enableDatepicker: function(target) {
		var $target = $(target);
		var inst = $.data(target, PROP_NAME);
		if (!$target.hasClass(this.markerClassName)) {
			return;
		}
		var nodeName = target.nodeName.toLowerCase();
		if (nodeName == 'input') {
			target.disabled = false;
			inst.trigger.filter('button').
				each(function() { this.disabled = false; }).end().
				filter('img').css({opacity: '1.0', cursor: ''});
		}
		else if (nodeName == 'div' || nodeName == 'span') {
			var inline = $target.children('.' + this._inlineClass);
			inline.children().removeClass('ui-state-disabled');
		}
		this._disabledInputs = $.map(this._disabledInputs,
			function(value) { return (value == target ? null : value); }); // delete entry
	},

	/* Disable the date picker to a jQuery selection.
	   @param  target    element - the target input field or division or span */
	_disableDatepicker: function(target) {
		var $target = $(target);
		var inst = $.data(target, PROP_NAME);
		if (!$target.hasClass(this.markerClassName)) {
			return;
		}
		var nodeName = target.nodeName.toLowerCase();
		if (nodeName == 'input') {
			target.disabled = true;
			inst.trigger.filter('button').
				each(function() { this.disabled = true; }).end().
				filter('img').css({opacity: '0.5', cursor: 'default'});
		}
		else if (nodeName == 'div' || nodeName == 'span') {
			var inline = $target.children('.' + this._inlineClass);
			inline.children().addClass('ui-state-disabled');
		}
		this._disabledInputs = $.map(this._disabledInputs,
			function(value) { return (value == target ? null : value); }); // delete entry
		this._disabledInputs[this._disabledInputs.length] = target;
	},

	/* Is the first field in a jQuery collection disabled as a datepicker?
	   @param  target    element - the target input field or division or span
	   @return boolean - true if disabled, false if enabled */
	_isDisabledDatepicker: function(target) {
		if (!target) {
			return false;
		}
		for (var i = 0; i < this._disabledInputs.length; i++) {
			if (this._disabledInputs[i] == target)
				return true;
		}
		return false;
	},

	/* Retrieve the instance data for the target control.
	   @param  target  element - the target input field or division or span
	   @return  object - the associated instance data
	   @throws  error if a jQuery problem getting data */
	_getInst: function(target) {
		try {
			return $.data(target, PROP_NAME);
		}
		catch (err) {
			throw 'Missing instance data for this datepicker';
		}
	},

	/* Update or retrieve the settings for a date picker attached to an input field or division.
	   @param  target  element - the target input field or division or span
	   @param  name    object - the new settings to update or
	                   string - the name of the setting to change or retrieve,
	                   when retrieving also 'all' for all instance settings or
	                   'defaults' for all global defaults
	   @param  value   any - the new value for the setting
	                   (omit if above is an object or to retrieve a value) */
	_optionDatepicker: function(target, name, value) {
		var inst = this._getInst(target);
		if (arguments.length == 2 && typeof name == 'string') {
			return (name == 'defaults' ? $.extend({}, $.datepicker._defaults) :
				(inst ? (name == 'all' ? $.extend({}, inst.settings) :
				this._get(inst, name)) : null));
		}
		var settings = name || {};
		if (typeof name == 'string') {
			settings = {};
			settings[name] = value;
		}
		if (inst) {
			if (this._curInst == inst) {
				this._hideDatepicker(null);
			}
			var date = this._getDateDatepicker(target);
			extendRemove(inst.settings, settings);
			this._setDateDatepicker(target, date);
			this._updateDatepicker(inst);
		}
	},

	// change method deprecated
	_changeDatepicker: function(target, name, value) {
		this._optionDatepicker(target, name, value);
	},

	/* Redraw the date picker attached to an input field or division.
	   @param  target  element - the target input field or division or span */
	_refreshDatepicker: function(target) {
		var inst = this._getInst(target);
		if (inst) {
			this._updateDatepicker(inst);
		}
	},

	/* Set the dates for a jQuery selection.
	   @param  target   element - the target input field or division or span
	   @param  date     Date - the new date
	   @param  endDate  Date - the new end date for a range (optional) */
	_setDateDatepicker: function(target, date, endDate) {
		var inst = this._getInst(target);
		if (inst) {
			this._setDate(inst, date, endDate);
			this._updateDatepicker(inst);
			this._updateAlternate(inst);
		}
	},

	/* Get the date(s) for the first entry in a jQuery selection.
	   @param  target  element - the target input field or division or span
	   @return Date - the current date or
	           Date[2] - the current dates for a range */
	_getDateDatepicker: function(target) {
		var inst = this._getInst(target);
		if (inst && !inst.inline)
			this._setDateFromField(inst);
		return (inst ? this._getDate(inst) : null);
	},

	/* Handle keystrokes. */
	_doKeyDown: function(event) {
		var inst = $.datepicker._getInst(event.target);
		var handled = true;
		var isRTL = inst.dpDiv.is('.ui-datepicker-rtl');
		inst._keyEvent = true;
		if ($.datepicker._datepickerShowing)
			switch (event.keyCode) {
				case 9:  $.datepicker._hideDatepicker(null, '');
						break; // hide on tab out
				case 13: var sel = $('td.' + $.datepicker._dayOverClass +
							', td.' + $.datepicker._currentClass, inst.dpDiv);
						if (sel[0])
							$.datepicker._selectDay(event.target, inst.selectedMonth, inst.selectedYear, sel[0]);
						else
							$.datepicker._hideDatepicker(null, $.datepicker._get(inst, 'duration'));
						return false; // don't submit the form
						break; // select the value on enter
				case 27: $.datepicker._hideDatepicker(null, $.datepicker._get(inst, 'duration'));
						break; // hide on escape
				case 33: $.datepicker._adjustDate(event.target, (event.ctrlKey ?
							-$.datepicker._get(inst, 'stepBigMonths') :
							-$.datepicker._get(inst, 'stepMonths')), 'M');
						break; // previous month/year on page up/+ ctrl
				case 34: $.datepicker._adjustDate(event.target, (event.ctrlKey ?
							+$.datepicker._get(inst, 'stepBigMonths') :
							+$.datepicker._get(inst, 'stepMonths')), 'M');
						break; // next month/year on page down/+ ctrl
				case 35: if (event.ctrlKey || event.metaKey) $.datepicker._clearDate(event.target);
						handled = event.ctrlKey || event.metaKey;
						break; // clear on ctrl or command +end
				case 36: if (event.ctrlKey || event.metaKey) $.datepicker._gotoToday(event.target);
						handled = event.ctrlKey || event.metaKey;
						break; // current on ctrl or command +home
				case 37: if (event.ctrlKey || event.metaKey) $.datepicker._adjustDate(event.target, (isRTL ? +1 : -1), 'D');
						handled = event.ctrlKey || event.metaKey;
						// -1 day on ctrl or command +left
						if (event.originalEvent.altKey) $.datepicker._adjustDate(event.target, (event.ctrlKey ?
									-$.datepicker._get(inst, 'stepBigMonths') :
									-$.datepicker._get(inst, 'stepMonths')), 'M');
						// next month/year on alt +left on Mac
						break;
				case 38: if (event.ctrlKey || event.metaKey) $.datepicker._adjustDate(event.target, -7, 'D');
						handled = event.ctrlKey || event.metaKey;
						break; // -1 week on ctrl or command +up
				case 39: if (event.ctrlKey || event.metaKey) $.datepicker._adjustDate(event.target, (isRTL ? -1 : +1), 'D');
						handled = event.ctrlKey || event.metaKey;
						// +1 day on ctrl or command +right
						if (event.originalEvent.altKey) $.datepicker._adjustDate(event.target, (event.ctrlKey ?
									+$.datepicker._get(inst, 'stepBigMonths') :
									+$.datepicker._get(inst, 'stepMonths')), 'M');
						// next month/year on alt +right
						break;
				case 40: if (event.ctrlKey || event.metaKey) $.datepicker._adjustDate(event.target, +7, 'D');
						handled = event.ctrlKey || event.metaKey;
						break; // +1 week on ctrl or command +down
				default: handled = false;
			}
		else if (event.keyCode == 36 && event.ctrlKey) // display the date picker on ctrl+home
			$.datepicker._showDatepicker(this);
		else {
			handled = false;
		}
		if (handled) {
			event.preventDefault();
			event.stopPropagation();
		}
	},

	/* Filter entered characters - based on date format. */
	_doKeyPress: function(event) {
		var inst = $.datepicker._getInst(event.target);
		if ($.datepicker._get(inst, 'constrainInput')) {
			var chars = $.datepicker._possibleChars($.datepicker._get(inst, 'dateFormat'));
			var chr = String.fromCharCode(event.charCode == undefined ? event.keyCode : event.charCode);
			return event.ctrlKey || (chr < ' ' || !chars || chars.indexOf(chr) > -1);
		}
	},

	/* Pop-up the date picker for a given input field.
	   @param  input  element - the input field attached to the date picker or
	                  event - if triggered by focus */
	_showDatepicker: function(input) {
		input = input.target || input;
		if (input.nodeName.toLowerCase() != 'input') // find from button/image trigger
			input = $('input', input.parentNode)[0];
		if ($.datepicker._isDisabledDatepicker(input) || $.datepicker._lastInput == input) // already here
			return;
		var inst = $.datepicker._getInst(input);
		var beforeShow = $.datepicker._get(inst, 'beforeShow');
		extendRemove(inst.settings, (beforeShow ? beforeShow.apply(input, [input, inst]) : {}));
		$.datepicker._hideDatepicker(null, '');
		$.datepicker._lastInput = input;
		$.datepicker._setDateFromField(inst);
		if ($.datepicker._inDialog) // hide cursor
			input.value = '';
		if (!$.datepicker._pos) { // position below input
			$.datepicker._pos = $.datepicker._findPos(input);
			$.datepicker._pos[1] += input.offsetHeight; // add the height
		}
		var isFixed = false;
		$(input).parents().each(function() {
			isFixed |= $(this).css('position') == 'fixed';
			return !isFixed;
		});
		if (isFixed && $.browser.opera) { // correction for Opera when fixed and scrolled
			$.datepicker._pos[0] -= document.documentElement.scrollLeft;
			$.datepicker._pos[1] -= document.documentElement.scrollTop;
		}
		var offset = {left: $.datepicker._pos[0], top: $.datepicker._pos[1]};
		$.datepicker._pos = null;
		inst.rangeStart = null;
		// determine sizing offscreen
		inst.dpDiv.css({position: 'absolute', display: 'block', top: '-1000px'});
		$.datepicker._updateDatepicker(inst);
		// fix width for dynamic number of date pickers
		// and adjust position before showing
		offset = $.datepicker._checkOffset(inst, offset, isFixed);
		inst.dpDiv.css({position: ($.datepicker._inDialog && $.blockUI ?
			'static' : (isFixed ? 'fixed' : 'absolute')), display: 'none',
			left: offset.left + 'px', top: offset.top + 'px'});
		if (!inst.inline) {
			var showAnim = $.datepicker._get(inst, 'showAnim') || 'show';
			var duration = $.datepicker._get(inst, 'duration');
			var postProcess = function() {
				$.datepicker._datepickerShowing = true;
				if ($.browser.msie && parseInt($.browser.version,10) < 7) // fix IE < 7 select problems
					$('iframe.ui-datepicker-cover').css({width: inst.dpDiv.width() + 4,
						height: inst.dpDiv.height() + 4});
			};
			if ($.effects && $.effects[showAnim])
				inst.dpDiv.show(showAnim, $.datepicker._get(inst, 'showOptions'), duration, postProcess);
			else
				inst.dpDiv[showAnim](duration, postProcess);
			if (duration == '')
				postProcess();
			if (inst.input[0].type != 'hidden')
				inst.input[0].focus();
			$.datepicker._curInst = inst;
		}
	},

	/* Generate the date picker content. */
	_updateDatepicker: function(inst) {
		var dims = {width: inst.dpDiv.width() + 4,
			height: inst.dpDiv.height() + 4};
		var self = this;
		inst.dpDiv.empty().append(this._generateHTML(inst))
			.find('iframe.ui-datepicker-cover').
				css({width: dims.width, height: dims.height})
			.end()
			.find('button, .ui-datepicker-prev, .ui-datepicker-next, .ui-datepicker-calendar td a')
				.bind('mouseout', function(){
					$(this).removeClass('ui-state-hover');
					if(this.className.indexOf('ui-datepicker-prev') != -1) $(this).removeClass('ui-datepicker-prev-hover');
					if(this.className.indexOf('ui-datepicker-next') != -1) $(this).removeClass('ui-datepicker-next-hover');
				})
				.bind('mouseover', function(){
					if (!self._isDisabledDatepicker( inst.inline ? inst.dpDiv.parent()[0] : inst.input[0])) {
						$(this).parents('.ui-datepicker-calendar').find('a').removeClass('ui-state-hover');
						$(this).addClass('ui-state-hover');
						if(this.className.indexOf('ui-datepicker-prev') != -1) $(this).addClass('ui-datepicker-prev-hover');
						if(this.className.indexOf('ui-datepicker-next') != -1) $(this).addClass('ui-datepicker-next-hover');
					}
				})
			.end()
			.find('.' + this._dayOverClass + ' a')
				.trigger('mouseover')
			.end();
		var numMonths = this._getNumberOfMonths(inst);
		var cols = numMonths[1];
		var width = 17;
		if (cols > 1) {
			inst.dpDiv.addClass('ui-datepicker-multi-' + cols).css('width', (width * cols) + 'em');
		} else {
			inst.dpDiv.removeClass('ui-datepicker-multi-2 ui-datepicker-multi-3 ui-datepicker-multi-4').width('');
		}
		inst.dpDiv[(numMonths[0] != 1 || numMonths[1] != 1 ? 'add' : 'remove') +
			'Class']('ui-datepicker-multi');
		inst.dpDiv[(this._get(inst, 'isRTL') ? 'add' : 'remove') +
			'Class']('ui-datepicker-rtl');
		if (inst.input && inst.input[0].type != 'hidden' && inst == $.datepicker._curInst)
			$(inst.input[0]).focus();
	},

	/* Check positioning to remain on screen. */
	_checkOffset: function(inst, offset, isFixed) {
		var dpWidth = inst.dpDiv.outerWidth();
		var dpHeight = inst.dpDiv.outerHeight();
		var inputWidth = inst.input ? inst.input.outerWidth() : 0;
		var inputHeight = inst.input ? inst.input.outerHeight() : 0;
		var viewWidth = (window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth) + $(document).scrollLeft();
		var viewHeight = (window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight) + $(document).scrollTop();

		offset.left -= (this._get(inst, 'isRTL') ? (dpWidth - inputWidth) : 0);
		offset.left -= (isFixed && offset.left == inst.input.offset().left) ? $(document).scrollLeft() : 0;
		offset.top -= (isFixed && offset.top == (inst.input.offset().top + inputHeight)) ? $(document).scrollTop() : 0;

		// now check if datepicker is showing outside window viewport - move to a better place if so.
		offset.left -= (offset.left + dpWidth > viewWidth && viewWidth > dpWidth) ? Math.abs(offset.left + dpWidth - viewWidth) : 0;
		offset.top -= (offset.top + dpHeight > viewHeight && viewHeight > dpHeight) ? Math.abs(offset.top + dpHeight + inputHeight*2 - viewHeight) : 0;

		return offset;
	},

	/* Find an object's position on the screen. */
	_findPos: function(obj) {
        while (obj && (obj.type == 'hidden' || obj.nodeType != 1)) {
            obj = obj.nextSibling;
        }
        var position = $(obj).offset();
	    return [position.left, position.top];
	},

	/* Hide the date picker from view.
	   @param  input  element - the input field attached to the date picker
	   @param  duration  string - the duration over which to close the date picker */
	_hideDatepicker: function(input, duration) {
		var inst = this._curInst;
		if (!inst || (input && inst != $.data(input, PROP_NAME)))
			return;
		if (inst.stayOpen)
			this._selectDate('#' + inst.id, this._formatDate(inst,
				inst.currentDay, inst.currentMonth, inst.currentYear));
		inst.stayOpen = false;
		if (this._datepickerShowing) {
			duration = (duration != null ? duration : this._get(inst, 'duration'));
			var showAnim = this._get(inst, 'showAnim');
			var postProcess = function() {
				$.datepicker._tidyDialog(inst);
			};
			if (duration != '' && $.effects && $.effects[showAnim])
				inst.dpDiv.hide(showAnim, $.datepicker._get(inst, 'showOptions'),
					duration, postProcess);
			else
				inst.dpDiv[(duration == '' ? 'hide' : (showAnim == 'slideDown' ? 'slideUp' :
					(showAnim == 'fadeIn' ? 'fadeOut' : 'hide')))](duration, postProcess);
			if (duration == '')
				this._tidyDialog(inst);
			var onClose = this._get(inst, 'onClose');
			if (onClose)
				onClose.apply((inst.input ? inst.input[0] : null),
					[(inst.input ? inst.input.val() : ''), inst]);  // trigger custom callback
			this._datepickerShowing = false;
			this._lastInput = null;
			if (this._inDialog) {
				this._dialogInput.css({ position: 'absolute', left: '0', top: '-100px' });
				if ($.blockUI) {
					$.unblockUI();
					$('body').append(this.dpDiv);
				}
			}
			this._inDialog = false;
		}
		this._curInst = null;
	},

	/* Tidy up after a dialog display. */
	_tidyDialog: function(inst) {
		inst.dpDiv.removeClass(this._dialogClass).unbind('.ui-datepicker-calendar');
	},

	/* Close date picker if clicked elsewhere. */
	_checkExternalClick: function(event) {
		if (!$.datepicker._curInst)
			return;
		var $target = $(event.target);
		if (($target.parents('#' + $.datepicker._mainDivId).length == 0) &&
				!$target.hasClass($.datepicker.markerClassName) &&
				!$target.hasClass($.datepicker._triggerClass) &&
				$.datepicker._datepickerShowing && !($.datepicker._inDialog && $.blockUI))
			$.datepicker._hideDatepicker(null, '');
	},

	/* Adjust one of the date sub-fields. */
	_adjustDate: function(id, offset, period) {
		var target = $(id);
		var inst = this._getInst(target[0]);
		if (this._isDisabledDatepicker(target[0])) {
			return;
		}
		this._adjustInstDate(inst, offset +
			(period == 'M' ? this._get(inst, 'showCurrentAtPos') : 0), // undo positioning
			period);
		this._updateDatepicker(inst);
	},

	/* Action for current link. */
	_gotoToday: function(id) {
		var target = $(id);
		var inst = this._getInst(target[0]);
		if (this._get(inst, 'gotoCurrent') && inst.currentDay) {
			inst.selectedDay = inst.currentDay;
			inst.drawMonth = inst.selectedMonth = inst.currentMonth;
			inst.drawYear = inst.selectedYear = inst.currentYear;
		}
		else {
		var date = new Date();
		inst.selectedDay = date.getDate();
		inst.drawMonth = inst.selectedMonth = date.getMonth();
		inst.drawYear = inst.selectedYear = date.getFullYear();
		}
		this._notifyChange(inst);
		this._adjustDate(target);
	},

	/* Action for selecting a new month/year. */
	_selectMonthYear: function(id, select, period) {
		var target = $(id);
		var inst = this._getInst(target[0]);
		inst._selectingMonthYear = false;
		inst['selected' + (period == 'M' ? 'Month' : 'Year')] =
		inst['draw' + (period == 'M' ? 'Month' : 'Year')] =
			parseInt(select.options[select.selectedIndex].value,10);
		this._notifyChange(inst);
		this._adjustDate(target);
	},

	/* Restore input focus after not changing month/year. */
	_clickMonthYear: function(id) {
		var target = $(id);
		var inst = this._getInst(target[0]);
		if (inst.input && inst._selectingMonthYear && !$.browser.msie)
			inst.input[0].focus();
		inst._selectingMonthYear = !inst._selectingMonthYear;
	},

	/* Action for selecting a day. */
	_selectDay: function(id, month, year, td) {
		var target = $(id);
		if ($(td).hasClass(this._unselectableClass) || this._isDisabledDatepicker(target[0])) {
			return;
		}
		var inst = this._getInst(target[0]);
		inst.selectedDay = inst.currentDay = $('a', td).html();
		inst.selectedMonth = inst.currentMonth = month;
		inst.selectedYear = inst.currentYear = year;
		if (inst.stayOpen) {
			inst.endDay = inst.endMonth = inst.endYear = null;
		}
		this._selectDate(id, this._formatDate(inst,
			inst.currentDay, inst.currentMonth, inst.currentYear));
		if (inst.stayOpen) {
			inst.rangeStart = this._daylightSavingAdjust(
				new Date(inst.currentYear, inst.currentMonth, inst.currentDay));
			this._updateDatepicker(inst);
		}
	},

	/* Erase the input field and hide the date picker. */
	_clearDate: function(id) {
		var target = $(id);
		var inst = this._getInst(target[0]);
		inst.stayOpen = false;
		inst.endDay = inst.endMonth = inst.endYear = inst.rangeStart = null;
		this._selectDate(target, '');
	},

	/* Update the input field with the selected date. */
	_selectDate: function(id, dateStr) {
		var target = $(id);
		var inst = this._getInst(target[0]);
		dateStr = (dateStr != null ? dateStr : this._formatDate(inst));
		if (inst.input)
			inst.input.val(dateStr);
		this._updateAlternate(inst);
		var onSelect = this._get(inst, 'onSelect');
		if (onSelect)
			onSelect.apply((inst.input ? inst.input[0] : null), [dateStr, inst]);  // trigger custom callback
		else if (inst.input)
			inst.input.trigger('change'); // fire the change event
		if (inst.inline)
			this._updateDatepicker(inst);
		else if (!inst.stayOpen) {
			this._hideDatepicker(null, this._get(inst, 'duration'));
			this._lastInput = inst.input[0];
			if (typeof(inst.input[0]) != 'object')
				inst.input[0].focus(); // restore focus
			this._lastInput = null;
		}
	},

	/* Update any alternate field to synchronise with the main field. */
	_updateAlternate: function(inst) {
		var altField = this._get(inst, 'altField');
		if (altField) { // update alternate field too
			var altFormat = this._get(inst, 'altFormat') || this._get(inst, 'dateFormat');
			var date = this._getDate(inst);
			dateStr = this.formatDate(altFormat, date, this._getFormatConfig(inst));
			$(altField).each(function() { $(this).val(dateStr); });
		}
	},

	/* Set as beforeShowDay function to prevent selection of weekends.
	   @param  date  Date - the date to customise
	   @return [boolean, string] - is this date selectable?, what is its CSS class? */
	noWeekends: function(date) {
		var day = date.getDay();
		return [(day > 0 && day < 6), ''];
	},

	/* Set as calculateWeek to determine the week of the year based on the ISO 8601 definition.
	   @param  date  Date - the date to get the week for
	   @return  number - the number of the week within the year that contains this date */
	iso8601Week: function(date) {
		var checkDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
		var firstMon = new Date(checkDate.getFullYear(), 1 - 1, 4); // First week always contains 4 Jan
		var firstDay = firstMon.getDay() || 7; // Day of week: Mon = 1, ..., Sun = 7
		firstMon.setDate(firstMon.getDate() + 1 - firstDay); // Preceding Monday
		if (firstDay < 4 && checkDate < firstMon) { // Adjust first three days in year if necessary
			checkDate.setDate(checkDate.getDate() - 3); // Generate for previous year
			return $.datepicker.iso8601Week(checkDate);
		} else if (checkDate > new Date(checkDate.getFullYear(), 12 - 1, 28)) { // Check last three days in year
			firstDay = new Date(checkDate.getFullYear() + 1, 1 - 1, 4).getDay() || 7;
			if (firstDay > 4 && (checkDate.getDay() || 7) < firstDay - 3) { // Adjust if necessary
				return 1;
			}
		}
		return Math.floor(((checkDate - firstMon) / 86400000) / 7) + 1; // Weeks to given date
	},

	/* Parse a string value into a date object.
	   See formatDate below for the possible formats.

	   @param  format    string - the expected format of the date
	   @param  value     string - the date in the above format
	   @param  settings  Object - attributes include:
	                     shortYearCutoff  number - the cutoff year for determining the century (optional)
	                     dayNamesShort    string[7] - abbreviated names of the days from Sunday (optional)
	                     dayNames         string[7] - names of the days from Sunday (optional)
	                     monthNamesShort  string[12] - abbreviated names of the months (optional)
	                     monthNames       string[12] - names of the months (optional)
	   @return  Date - the extracted date value or null if value is blank */
	parseDate: function (format, value, settings) {
		if (format == null || value == null)
			throw 'Invalid arguments';
		value = (typeof value == 'object' ? value.toString() : value + '');
		if (value == '')
			return null;
		var shortYearCutoff = (settings ? settings.shortYearCutoff : null) || this._defaults.shortYearCutoff;
		var dayNamesShort = (settings ? settings.dayNamesShort : null) || this._defaults.dayNamesShort;
		var dayNames = (settings ? settings.dayNames : null) || this._defaults.dayNames;
		var monthNamesShort = (settings ? settings.monthNamesShort : null) || this._defaults.monthNamesShort;
		var monthNames = (settings ? settings.monthNames : null) || this._defaults.monthNames;
		var year = -1;
		var month = -1;
		var day = -1;
		var doy = -1;
		var literal = false;
		// Check whether a format character is doubled
		var lookAhead = function(match) {
			var matches = (iFormat + 1 < format.length && format.charAt(iFormat + 1) == match);
			if (matches)
				iFormat++;
			return matches;
		};
		// Extract a number from the string value
		var getNumber = function(match) {
			lookAhead(match);
			var origSize = (match == '@' ? 14 : (match == 'y' ? 4 : (match == 'o' ? 3 : 2)));
			var size = origSize;
			var num = 0;
			while (size > 0 && iValue < value.length &&
					value.charAt(iValue) >= '0' && value.charAt(iValue) <= '9') {
				num = num * 10 + parseInt(value.charAt(iValue++),10);
				size--;
			}
			if (size == origSize)
				throw 'Missing number at position ' + iValue;
			return num;
		};
		// Extract a name from the string value and convert to an index
		var getName = function(match, shortNames, longNames) {
			var names = (lookAhead(match) ? longNames : shortNames);
			var size = 0;
			for (var j = 0; j < names.length; j++)
				size = Math.max(size, names[j].length);
			var name = '';
			var iInit = iValue;
			while (size > 0 && iValue < value.length) {
				name += value.charAt(iValue++);
				for (var i = 0; i < names.length; i++)
					if (name == names[i])
						return i + 1;
				size--;
			}
			throw 'Unknown name at position ' + iInit;
		};
		// Confirm that a literal character matches the string value
		var checkLiteral = function() {
			if (value.charAt(iValue) != format.charAt(iFormat))
				throw 'Unexpected literal at position ' + iValue;
			iValue++;
		};
		var iValue = 0;
		for (var iFormat = 0; iFormat < format.length; iFormat++) {
			if (literal)
				if (format.charAt(iFormat) == "'" && !lookAhead("'"))
					literal = false;
				else
					checkLiteral();
			else
				switch (format.charAt(iFormat)) {
					case 'd':
						day = getNumber('d');
						break;
					case 'D':
						getName('D', dayNamesShort, dayNames);
						break;
					case 'o':
						doy = getNumber('o');
						break;
					case 'm':
						month = getNumber('m');
						break;
					case 'M':
						month = getName('M', monthNamesShort, monthNames);
						break;
					case 'y':
						year = getNumber('y');
						break;
					case '@':
						var date = new Date(getNumber('@'));
						year = date.getFullYear();
						month = date.getMonth() + 1;
						day = date.getDate();
						break;
					case "'":
						if (lookAhead("'"))
							checkLiteral();
						else
							literal = true;
						break;
					default:
						checkLiteral();
				}
		}
		if (year == -1)
			year = new Date().getFullYear();
		else if (year < 100)
			year += new Date().getFullYear() - new Date().getFullYear() % 100 +
				(year <= shortYearCutoff ? 0 : -100);
		if (doy > -1) {
			month = 1;
			day = doy;
			do {
				var dim = this._getDaysInMonth(year, month - 1);
				if (day <= dim)
					break;
				month++;
				day -= dim;
			} while (true);
		}
		var date = this._daylightSavingAdjust(new Date(year, month - 1, day));
		if (date.getFullYear() != year || date.getMonth() + 1 != month || date.getDate() != day)
			throw 'Invalid date'; // E.g. 31/02/*
		return date;
	},

	/* Standard date formats. */
	ATOM: 'yy-mm-dd', // RFC 3339 (ISO 8601)
	COOKIE: 'D, dd M yy',
	ISO_8601: 'yy-mm-dd',
	RFC_822: 'D, d M y',
	RFC_850: 'DD, dd-M-y',
	RFC_1036: 'D, d M y',
	RFC_1123: 'D, d M yy',
	RFC_2822: 'D, d M yy',
	RSS: 'D, d M y', // RFC 822
	TIMESTAMP: '@',
	W3C: 'yy-mm-dd', // ISO 8601

	/* Format a date object into a string value.
	   The format can be combinations of the following:
	   d  - day of month (no leading zero)
	   dd - day of month (two digit)
	   o  - day of year (no leading zeros)
	   oo - day of year (three digit)
	   D  - day name short
	   DD - day name long
	   m  - month of year (no leading zero)
	   mm - month of year (two digit)
	   M  - month name short
	   MM - month name long
	   y  - year (two digit)
	   yy - year (four digit)
	   @ - Unix timestamp (ms since 01/01/1970)
	   '...' - literal text
	   '' - single quote

	   @param  format    string - the desired format of the date
	   @param  date      Date - the date value to format
	   @param  settings  Object - attributes include:
	                     dayNamesShort    string[7] - abbreviated names of the days from Sunday (optional)
	                     dayNames         string[7] - names of the days from Sunday (optional)
	                     monthNamesShort  string[12] - abbreviated names of the months (optional)
	                     monthNames       string[12] - names of the months (optional)
	   @return  string - the date in the above format */
	formatDate: function (format, date, settings) {
		if (!date)
			return '';
		var dayNamesShort = (settings ? settings.dayNamesShort : null) || this._defaults.dayNamesShort;
		var dayNames = (settings ? settings.dayNames : null) || this._defaults.dayNames;
		var monthNamesShort = (settings ? settings.monthNamesShort : null) || this._defaults.monthNamesShort;
		var monthNames = (settings ? settings.monthNames : null) || this._defaults.monthNames;
		// Check whether a format character is doubled
		var lookAhead = function(match) {
			var matches = (iFormat + 1 < format.length && format.charAt(iFormat + 1) == match);
			if (matches)
				iFormat++;
			return matches;
		};
		// Format a number, with leading zero if necessary
		var formatNumber = function(match, value, len) {
			var num = '' + value;
			if (lookAhead(match))
				while (num.length < len)
					num = '0' + num;
			return num;
		};
		// Format a name, short or long as requested
		var formatName = function(match, value, shortNames, longNames) {
			return (lookAhead(match) ? longNames[value] : shortNames[value]);
		};
		var output = '';
		var literal = false;
		if (date)
			for (var iFormat = 0; iFormat < format.length; iFormat++) {
				if (literal)
					if (format.charAt(iFormat) == "'" && !lookAhead("'"))
						literal = false;
					else
						output += format.charAt(iFormat);
				else
					switch (format.charAt(iFormat)) {
						case 'd':
							output += formatNumber('d', date.getDate(), 2);
							break;
						case 'D':
							output += formatName('D', date.getDay(), dayNamesShort, dayNames);
							break;
						case 'o':
							var doy = date.getDate();
							for (var m = date.getMonth() - 1; m >= 0; m--)
								doy += this._getDaysInMonth(date.getFullYear(), m);
							output += formatNumber('o', doy, 3);
							break;
						case 'm':
							output += formatNumber('m', date.getMonth() + 1, 2);
							break;
						case 'M':
							output += formatName('M', date.getMonth(), monthNamesShort, monthNames);
							break;
						case 'y':
							output += (lookAhead('y') ? date.getFullYear() :
								(date.getYear() % 100 < 10 ? '0' : '') + date.getYear() % 100);
							break;
						case '@':
							output += date.getTime();
							break;
						case "'":
							if (lookAhead("'"))
								output += "'";
							else
								literal = true;
							break;
						default:
							output += format.charAt(iFormat);
					}
			}
		return output;
	},

	/* Extract all possible characters from the date format. */
	_possibleChars: function (format) {
		var chars = '';
		var literal = false;
		for (var iFormat = 0; iFormat < format.length; iFormat++)
			if (literal)
				if (format.charAt(iFormat) == "'" && !lookAhead("'"))
					literal = false;
				else
					chars += format.charAt(iFormat);
			else
				switch (format.charAt(iFormat)) {
					case 'd': case 'm': case 'y': case '@':
						chars += '0123456789';
						break;
					case 'D': case 'M':
						return null; // Accept anything
					case "'":
						if (lookAhead("'"))
							chars += "'";
						else
							literal = true;
						break;
					default:
						chars += format.charAt(iFormat);
				}
		return chars;
	},

	/* Get a setting value, defaulting if necessary. */
	_get: function(inst, name) {
		return inst.settings[name] !== undefined ?
			inst.settings[name] : this._defaults[name];
	},

	/* Parse existing date and initialise date picker. */
	_setDateFromField: function(inst) {
		var dateFormat = this._get(inst, 'dateFormat');
		var dates = inst.input ? inst.input.val() : null;
		inst.endDay = inst.endMonth = inst.endYear = null;
		var date = defaultDate = this._getDefaultDate(inst);
		var settings = this._getFormatConfig(inst);
		try {
			date = this.parseDate(dateFormat, dates, settings) || defaultDate;
		} catch (event) {
			this.log(event);
			date = defaultDate;
		}
		inst.selectedDay = date.getDate();
		inst.drawMonth = inst.selectedMonth = date.getMonth();
		inst.drawYear = inst.selectedYear = date.getFullYear();
		inst.currentDay = (dates ? date.getDate() : 0);
		inst.currentMonth = (dates ? date.getMonth() : 0);
		inst.currentYear = (dates ? date.getFullYear() : 0);
		this._adjustInstDate(inst);
	},

	/* Retrieve the default date shown on opening. */
	_getDefaultDate: function(inst) {
		var date = this._determineDate(this._get(inst, 'defaultDate'), new Date());
		var minDate = this._getMinMaxDate(inst, 'min', true);
		var maxDate = this._getMinMaxDate(inst, 'max');
		date = (minDate && date < minDate ? minDate : date);
		date = (maxDate && date > maxDate ? maxDate : date);
		return date;
	},

	/* A date may be specified as an exact value or a relative one. */
	_determineDate: function(date, defaultDate) {
		var offsetNumeric = function(offset) {
			var date = new Date();
			date.setDate(date.getDate() + offset);
			return date;
		};
		var offsetString = function(offset, getDaysInMonth) {
			var date = new Date();
			var year = date.getFullYear();
			var month = date.getMonth();
			var day = date.getDate();
			var pattern = /([+-]?[0-9]+)\s*(d|D|w|W|m|M|y|Y)?/g;
			var matches = pattern.exec(offset);
			while (matches) {
				switch (matches[2] || 'd') {
					case 'd' : case 'D' :
						day += parseInt(matches[1],10); break;
					case 'w' : case 'W' :
						day += parseInt(matches[1],10) * 7; break;
					case 'm' : case 'M' :
						month += parseInt(matches[1],10);
						day = Math.min(day, getDaysInMonth(year, month));
						break;
					case 'y': case 'Y' :
						year += parseInt(matches[1],10);
						day = Math.min(day, getDaysInMonth(year, month));
						break;
				}
				matches = pattern.exec(offset);
			}
			return new Date(year, month, day);
		};
		date = (date == null ? defaultDate :
			(typeof date == 'string' ? offsetString(date, this._getDaysInMonth) :
			(typeof date == 'number' ? (isNaN(date) ? defaultDate : offsetNumeric(date)) : date)));
		date = (date && date.toString() == 'Invalid Date' ? defaultDate : date);
		if (date) {
			date.setHours(0);
			date.setMinutes(0);
			date.setSeconds(0);
			date.setMilliseconds(0);
		}
		return this._daylightSavingAdjust(date);
	},

	/* Handle switch to/from daylight saving.
	   Hours may be non-zero on daylight saving cut-over:
	   > 12 when midnight changeover, but then cannot generate
	   midnight datetime, so jump to 1AM, otherwise reset.
	   @param  date  (Date) the date to check
	   @return  (Date) the corrected date */
	_daylightSavingAdjust: function(date) {
		if (!date) return null;
		date.setHours(date.getHours() > 12 ? date.getHours() + 2 : 0);
		return date;
	},

	/* Set the date(s) directly. */
	_setDate: function(inst, date, endDate) {
		var clear = !(date);
		var origMonth = inst.selectedMonth;
		var origYear = inst.selectedYear;
		date = this._determineDate(date, new Date());
		inst.selectedDay = inst.currentDay = date.getDate();
		inst.drawMonth = inst.selectedMonth = inst.currentMonth = date.getMonth();
		inst.drawYear = inst.selectedYear = inst.currentYear = date.getFullYear();
		if (origMonth != inst.selectedMonth || origYear != inst.selectedYear)
			this._notifyChange(inst);
		this._adjustInstDate(inst);
		if (inst.input) {
			inst.input.val(clear ? '' : this._formatDate(inst));
		}
	},

	/* Retrieve the date(s) directly. */
	_getDate: function(inst) {
		var startDate = (!inst.currentYear || (inst.input && inst.input.val() == '') ? null :
			this._daylightSavingAdjust(new Date(
			inst.currentYear, inst.currentMonth, inst.currentDay)));
			return startDate;
	},

	/* Generate the HTML for the current state of the date picker. */
	_generateHTML: function(inst) {
		var today = new Date();
		today = this._daylightSavingAdjust(
			new Date(today.getFullYear(), today.getMonth(), today.getDate())); // clear time
		var isRTL = this._get(inst, 'isRTL');
		var showButtonPanel = this._get(inst, 'showButtonPanel');
		var hideIfNoPrevNext = this._get(inst, 'hideIfNoPrevNext');
		var navigationAsDateFormat = this._get(inst, 'navigationAsDateFormat');
		var numMonths = this._getNumberOfMonths(inst);
		var showCurrentAtPos = this._get(inst, 'showCurrentAtPos');
		var stepMonths = this._get(inst, 'stepMonths');
		var stepBigMonths = this._get(inst, 'stepBigMonths');
		var isMultiMonth = (numMonths[0] != 1 || numMonths[1] != 1);
		var currentDate = this._daylightSavingAdjust((!inst.currentDay ? new Date(9999, 9, 9) :
			new Date(inst.currentYear, inst.currentMonth, inst.currentDay)));
		var minDate = this._getMinMaxDate(inst, 'min', true);
		var maxDate = this._getMinMaxDate(inst, 'max');
		var drawMonth = inst.drawMonth - showCurrentAtPos;
		var drawYear = inst.drawYear;
		if (drawMonth < 0) {
			drawMonth += 12;
			drawYear--;
		}
		if (maxDate) {
			var maxDraw = this._daylightSavingAdjust(new Date(maxDate.getFullYear(),
				maxDate.getMonth() - numMonths[1] + 1, maxDate.getDate()));
			maxDraw = (minDate && maxDraw < minDate ? minDate : maxDraw);
			while (this._daylightSavingAdjust(new Date(drawYear, drawMonth, 1)) > maxDraw) {
				drawMonth--;
				if (drawMonth < 0) {
					drawMonth = 11;
					drawYear--;
				}
			}
		}
		inst.drawMonth = drawMonth;
		inst.drawYear = drawYear;
		var prevText = this._get(inst, 'prevText');
		prevText = (!navigationAsDateFormat ? prevText : this.formatDate(prevText,
			this._daylightSavingAdjust(new Date(drawYear, drawMonth - stepMonths, 1)),
			this._getFormatConfig(inst)));
		var prev = (this._canAdjustMonth(inst, -1, drawYear, drawMonth) ?
			'<a class="ui-datepicker-prev ui-corner-all" onclick="DP_jQuery.datepicker._adjustDate(\'#' + inst.id + '\', -' + stepMonths + ', \'M\');"' +
			' title="' + prevText + '"><span class="ui-icon ui-icon-circle-triangle-' + ( isRTL ? 'e' : 'w') + '">' + prevText + '</span></a>' :
			(hideIfNoPrevNext ? '' : '<a class="ui-datepicker-prev ui-corner-all ui-state-disabled" title="'+ prevText +'"><span class="ui-icon ui-icon-circle-triangle-' + ( isRTL ? 'e' : 'w') + '">' + prevText + '</span></a>'));
		var nextText = this._get(inst, 'nextText');
		nextText = (!navigationAsDateFormat ? nextText : this.formatDate(nextText,
			this._daylightSavingAdjust(new Date(drawYear, drawMonth + stepMonths, 1)),
			this._getFormatConfig(inst)));
		var next = (this._canAdjustMonth(inst, +1, drawYear, drawMonth) ?
			'<a class="ui-datepicker-next ui-corner-all" onclick="DP_jQuery.datepicker._adjustDate(\'#' + inst.id + '\', +' + stepMonths + ', \'M\');"' +
			' title="' + nextText + '"><span class="ui-icon ui-icon-circle-triangle-' + ( isRTL ? 'w' : 'e') + '">' + nextText + '</span></a>' :
			(hideIfNoPrevNext ? '' : '<a class="ui-datepicker-next ui-corner-all ui-state-disabled" title="'+ nextText + '"><span class="ui-icon ui-icon-circle-triangle-' + ( isRTL ? 'w' : 'e') + '">' + nextText + '</span></a>'));
		var currentText = this._get(inst, 'currentText');
		var gotoDate = (this._get(inst, 'gotoCurrent') && inst.currentDay ? currentDate : today);
		currentText = (!navigationAsDateFormat ? currentText :
			this.formatDate(currentText, gotoDate, this._getFormatConfig(inst)));
		var controls = (!inst.inline ? '<button type="button" class="ui-datepicker-close ui-state-default ui-priority-primary ui-corner-all" onclick="DP_jQuery.datepicker._hideDatepicker();">' + this._get(inst, 'closeText') + '</button>' : '');
		var buttonPanel = (showButtonPanel) ? '<div class="ui-datepicker-buttonpane ui-widget-content">' + (isRTL ? controls : '') +
			(this._isInRange(inst, gotoDate) ? '<button type="button" class="ui-datepicker-current ui-state-default ui-priority-secondary ui-corner-all" onclick="DP_jQuery.datepicker._gotoToday(\'#' + inst.id + '\');"' +
			'>' + currentText + '</button>' : '') + (isRTL ? '' : controls) + '</div>' : '';
		var firstDay = parseInt(this._get(inst, 'firstDay'),10);
		firstDay = (isNaN(firstDay) ? 0 : firstDay);
		var dayNames = this._get(inst, 'dayNames');
		var dayNamesShort = this._get(inst, 'dayNamesShort');
		var dayNamesMin = this._get(inst, 'dayNamesMin');
		var monthNames = this._get(inst, 'monthNames');
		var monthNamesShort = this._get(inst, 'monthNamesShort');
		var beforeShowDay = this._get(inst, 'beforeShowDay');
		var showOtherMonths = this._get(inst, 'showOtherMonths');
		var calculateWeek = this._get(inst, 'calculateWeek') || this.iso8601Week;
		var endDate = inst.endDay ? this._daylightSavingAdjust(
			new Date(inst.endYear, inst.endMonth, inst.endDay)) : currentDate;
		var defaultDate = this._getDefaultDate(inst);
		var html = '';
		for (var row = 0; row < numMonths[0]; row++) {
			var group = '';
			for (var col = 0; col < numMonths[1]; col++) {
				var selectedDate = this._daylightSavingAdjust(new Date(drawYear, drawMonth, inst.selectedDay));
				var cornerClass = ' ui-corner-all';
				var calender = '';
				if (isMultiMonth) {
					calender += '<div class="ui-datepicker-group ui-datepicker-group-';
					switch (col) {
						case 0: calender += 'first'; cornerClass = ' ui-corner-' + (isRTL ? 'right' : 'left'); break;
						case numMonths[1]-1: calender += 'last'; cornerClass = ' ui-corner-' + (isRTL ? 'left' : 'right'); break;
						default: calender += 'middle'; cornerClass = ''; break;
					}
					calender += '">';
				}
				calender += '<div class="ui-datepicker-header ui-widget-header ui-helper-clearfix' + cornerClass + '">' +
					(/all|left/.test(cornerClass) && row == 0 ? (isRTL ? next : prev) : '') +
					(/all|right/.test(cornerClass) && row == 0 ? (isRTL ? prev : next) : '') +
					this._generateMonthYearHeader(inst, drawMonth, drawYear, minDate, maxDate,
					selectedDate, row > 0 || col > 0, monthNames, monthNamesShort) + // draw month headers
					'</div><table class="ui-datepicker-calendar"><thead>' +
					'<tr>';
				var thead = '';
				for (var dow = 0; dow < 7; dow++) { // days of the week
					var day = (dow + firstDay) % 7;
					thead += '<th' + ((dow + firstDay + 6) % 7 >= 5 ? ' class="ui-datepicker-week-end"' : '') + '>' +
						'<span title="' + dayNames[day] + '">' + dayNamesMin[day] + '</span></th>';
				}
				calender += thead + '</tr></thead><tbody>';
				var daysInMonth = this._getDaysInMonth(drawYear, drawMonth);
				if (drawYear == inst.selectedYear && drawMonth == inst.selectedMonth)
					inst.selectedDay = Math.min(inst.selectedDay, daysInMonth);
				var leadDays = (this._getFirstDayOfMonth(drawYear, drawMonth) - firstDay + 7) % 7;
				var numRows = (isMultiMonth ? 6 : Math.ceil((leadDays + daysInMonth) / 7)); // calculate the number of rows to generate
				var printDate = this._daylightSavingAdjust(new Date(drawYear, drawMonth, 1 - leadDays));
				for (var dRow = 0; dRow < numRows; dRow++) { // create date picker rows
					calender += '<tr>';
					var tbody = '';
					for (var dow = 0; dow < 7; dow++) { // create date picker days
						var daySettings = (beforeShowDay ?
							beforeShowDay.apply((inst.input ? inst.input[0] : null), [printDate]) : [true, '']);
						var otherMonth = (printDate.getMonth() != drawMonth);
						var unselectable = otherMonth || !daySettings[0] ||
							(minDate && printDate < minDate) || (maxDate && printDate > maxDate);
						tbody += '<td class="' +
							((dow + firstDay + 6) % 7 >= 5 ? ' ui-datepicker-week-end' : '') + // highlight weekends
							(otherMonth ? ' ui-datepicker-other-month' : '') + // highlight days from other months
							((printDate.getTime() == selectedDate.getTime() && drawMonth == inst.selectedMonth && inst._keyEvent) || // user pressed key
							(defaultDate.getTime() == printDate.getTime() && defaultDate.getTime() == selectedDate.getTime()) ?
							// or defaultDate is current printedDate and defaultDate is selectedDate
							' ' + this._dayOverClass : '') + // highlight selected day
							(unselectable ? ' ' + this._unselectableClass + ' ui-state-disabled': '') +  // highlight unselectable days
							(otherMonth && !showOtherMonths ? '' : ' ' + daySettings[1] + // highlight custom dates
							(printDate.getTime() >= currentDate.getTime() && printDate.getTime() <= endDate.getTime() ? // in current range
							' ' + this._currentClass : '') + // highlight selected day
							(printDate.getTime() == today.getTime() ? ' ui-datepicker-today' : '')) + '"' + // highlight today (if different)
							((!otherMonth || showOtherMonths) && daySettings[2] ? ' title="' + daySettings[2] + '"' : '') + // cell title
							(unselectable ? '' : ' onclick="DP_jQuery.datepicker._selectDay(\'#' +
							inst.id + '\',' + drawMonth + ',' + drawYear + ', this);return false;"') + '>' + // actions
							(otherMonth ? (showOtherMonths ? printDate.getDate() : '&#xa0;') : // display for other months
							(unselectable ? '<span class="ui-state-default">' + printDate.getDate() + '</span>' : '<a class="ui-state-default' +
							(printDate.getTime() == today.getTime() ? ' ui-state-highlight' : '') +
							(printDate.getTime() >= currentDate.getTime() && printDate.getTime() <= endDate.getTime() ? // in current range
							' ui-state-active' : '') + // highlight selected day
							'" href="#">' + printDate.getDate() + '</a>')) + '</td>'; // display for this month
						printDate.setDate(printDate.getDate() + 1);
						printDate = this._daylightSavingAdjust(printDate);
					}
					calender += tbody + '</tr>';
				}
				drawMonth++;
				if (drawMonth > 11) {
					drawMonth = 0;
					drawYear++;
				}
				calender += '</tbody></table>' + (isMultiMonth ? '</div>' +
							((numMonths[0] > 0 && col == numMonths[1]-1) ? '<div class="ui-datepicker-row-break"></div>' : '') : '');
				group += calender;
			}
			html += group;
		}
		html += buttonPanel + ($.browser.msie && parseInt($.browser.version,10) < 7 && !inst.inline ?
			'<iframe src="javascript:false;" class="ui-datepicker-cover" frameborder="0"></iframe>' : '');
		inst._keyEvent = false;
		return html;
	},

	/* Generate the month and year header. */
	_generateMonthYearHeader: function(inst, drawMonth, drawYear, minDate, maxDate,
			selectedDate, secondary, monthNames, monthNamesShort) {
		minDate = (inst.rangeStart && minDate && selectedDate < minDate ? selectedDate : minDate);
		var changeMonth = this._get(inst, 'changeMonth');
		var changeYear = this._get(inst, 'changeYear');
		var showMonthAfterYear = this._get(inst, 'showMonthAfterYear');
		var html = '<div class="ui-datepicker-title">';
		var monthHtml = '';
		// month selection
		if (secondary || !changeMonth)
			monthHtml += '<span class="ui-datepicker-month">' + monthNames[drawMonth] + '</span> ';
		else {
			var inMinYear = (minDate && minDate.getFullYear() == drawYear);
			var inMaxYear = (maxDate && maxDate.getFullYear() == drawYear);
			monthHtml += '<select class="ui-datepicker-month" ' +
				'onchange="DP_jQuery.datepicker._selectMonthYear(\'#' + inst.id + '\', this, \'M\');" ' +
				'onclick="DP_jQuery.datepicker._clickMonthYear(\'#' + inst.id + '\');"' +
			 	'>';
			for (var month = 0; month < 12; month++) {
				if ((!inMinYear || month >= minDate.getMonth()) &&
						(!inMaxYear || month <= maxDate.getMonth()))
					monthHtml += '<option value="' + month + '"' +
						(month == drawMonth ? ' selected="selected"' : '') +
						'>' + monthNamesShort[month] + '</option>';
			}
			monthHtml += '</select>';
		}
		if (!showMonthAfterYear)
			html += monthHtml + ((secondary || changeMonth || changeYear) && (!(changeMonth && changeYear)) ? '&#xa0;' : '');
		// year selection
		if (secondary || !changeYear)
			html += '<span class="ui-datepicker-year">' + drawYear + '</span>';
		else {
			// determine range of years to display
			var years = this._get(inst, 'yearRange').split(':');
			var year = 0;
			var endYear = 0;
			if (years.length != 2) {
				year = drawYear - 10;
				endYear = drawYear + 10;
			} else if (years[0].charAt(0) == '+' || years[0].charAt(0) == '-') {
				year = drawYear + parseInt(years[0], 10);
				endYear = drawYear + parseInt(years[1], 10);
			} else {
				year = parseInt(years[0], 10);
				endYear = parseInt(years[1], 10);
			}
			year = (minDate ? Math.max(year, minDate.getFullYear()) : year);
			endYear = (maxDate ? Math.min(endYear, maxDate.getFullYear()) : endYear);
			html += '<select class="ui-datepicker-year" ' +
				'onchange="DP_jQuery.datepicker._selectMonthYear(\'#' + inst.id + '\', this, \'Y\');" ' +
				'onclick="DP_jQuery.datepicker._clickMonthYear(\'#' + inst.id + '\');"' +
				'>';
			for (; year <= endYear; year++) {
				html += '<option value="' + year + '"' +
					(year == drawYear ? ' selected="selected"' : '') +
					'>' + year + '</option>';
			}
			html += '</select>';
		}
		if (showMonthAfterYear)
			html += (secondary || changeMonth || changeYear ? '&#xa0;' : '') + monthHtml;
		html += '</div>'; // Close datepicker_header
		return html;
	},

	/* Adjust one of the date sub-fields. */
	_adjustInstDate: function(inst, offset, period) {
		var year = inst.drawYear + (period == 'Y' ? offset : 0);
		var month = inst.drawMonth + (period == 'M' ? offset : 0);
		var day = Math.min(inst.selectedDay, this._getDaysInMonth(year, month)) +
			(period == 'D' ? offset : 0);
		var date = this._daylightSavingAdjust(new Date(year, month, day));
		// ensure it is within the bounds set
		var minDate = this._getMinMaxDate(inst, 'min', true);
		var maxDate = this._getMinMaxDate(inst, 'max');
		date = (minDate && date < minDate ? minDate : date);
		date = (maxDate && date > maxDate ? maxDate : date);
		inst.selectedDay = date.getDate();
		inst.drawMonth = inst.selectedMonth = date.getMonth();
		inst.drawYear = inst.selectedYear = date.getFullYear();
		if (period == 'M' || period == 'Y')
			this._notifyChange(inst);
	},

	/* Notify change of month/year. */
	_notifyChange: function(inst) {
		var onChange = this._get(inst, 'onChangeMonthYear');
		if (onChange)
			onChange.apply((inst.input ? inst.input[0] : null),
				[inst.selectedYear, inst.selectedMonth + 1, inst]);
	},

	/* Determine the number of months to show. */
	_getNumberOfMonths: function(inst) {
		var numMonths = this._get(inst, 'numberOfMonths');
		return (numMonths == null ? [1, 1] : (typeof numMonths == 'number' ? [1, numMonths] : numMonths));
	},

	/* Determine the current maximum date - ensure no time components are set - may be overridden for a range. */
	_getMinMaxDate: function(inst, minMax, checkRange) {
		var date = this._determineDate(this._get(inst, minMax + 'Date'), null);
		return (!checkRange || !inst.rangeStart ? date :
			(!date || inst.rangeStart > date ? inst.rangeStart : date));
	},

	/* Find the number of days in a given month. */
	_getDaysInMonth: function(year, month) {
		return 32 - new Date(year, month, 32).getDate();
	},

	/* Find the day of the week of the first of a month. */
	_getFirstDayOfMonth: function(year, month) {
		return new Date(year, month, 1).getDay();
	},

	/* Determines if we should allow a "next/prev" month display change. */
	_canAdjustMonth: function(inst, offset, curYear, curMonth) {
		var numMonths = this._getNumberOfMonths(inst);
		var date = this._daylightSavingAdjust(new Date(
			curYear, curMonth + (offset < 0 ? offset : numMonths[1]), 1));
		if (offset < 0)
			date.setDate(this._getDaysInMonth(date.getFullYear(), date.getMonth()));
		return this._isInRange(inst, date);
	},

	/* Is the given date in the accepted range? */
	_isInRange: function(inst, date) {
		// during range selection, use minimum of selected date and range start
		var newMinDate = (!inst.rangeStart ? null : this._daylightSavingAdjust(
			new Date(inst.selectedYear, inst.selectedMonth, inst.selectedDay)));
		newMinDate = (newMinDate && inst.rangeStart < newMinDate ? inst.rangeStart : newMinDate);
		var minDate = newMinDate || this._getMinMaxDate(inst, 'min');
		var maxDate = this._getMinMaxDate(inst, 'max');
		return ((!minDate || date >= minDate) && (!maxDate || date <= maxDate));
	},

	/* Provide the configuration settings for formatting/parsing. */
	_getFormatConfig: function(inst) {
		var shortYearCutoff = this._get(inst, 'shortYearCutoff');
		shortYearCutoff = (typeof shortYearCutoff != 'string' ? shortYearCutoff :
			new Date().getFullYear() % 100 + parseInt(shortYearCutoff, 10));
		return {shortYearCutoff: shortYearCutoff,
			dayNamesShort: this._get(inst, 'dayNamesShort'), dayNames: this._get(inst, 'dayNames'),
			monthNamesShort: this._get(inst, 'monthNamesShort'), monthNames: this._get(inst, 'monthNames')};
	},

	/* Format the given date for display. */
	_formatDate: function(inst, day, month, year) {
		if (!day) {
			inst.currentDay = inst.selectedDay;
			inst.currentMonth = inst.selectedMonth;
			inst.currentYear = inst.selectedYear;
		}
		var date = (day ? (typeof day == 'object' ? day :
			this._daylightSavingAdjust(new Date(year, month, day))) :
			this._daylightSavingAdjust(new Date(inst.currentYear, inst.currentMonth, inst.currentDay)));
		return this.formatDate(this._get(inst, 'dateFormat'), date, this._getFormatConfig(inst));
	}
});

/* jQuery extend now ignores nulls! */
function extendRemove(target, props) {
	$.extend(target, props);
	for (var name in props)
		if (props[name] == null || props[name] == undefined)
			target[name] = props[name];
	return target;
};

/* Determine whether an object is an array. */
function isArray(a) {
	return (a && (($.browser.safari && typeof a == 'object' && a.length) ||
		(a.constructor && a.constructor.toString().match(/\Array\(\)/))));
};

/* Invoke the datepicker functionality.
   @param  options  string - a command, optionally followed by additional parameters or
                    Object - settings for attaching new datepicker functionality
   @return  jQuery object */
$.fn.datepicker = function(options){

	/* Initialise the date picker. */
	if (!$.datepicker.initialized) {
		$(document).mousedown($.datepicker._checkExternalClick).
			find('body').append($.datepicker.dpDiv);
		$.datepicker.initialized = true;
	}

	var otherArgs = Array.prototype.slice.call(arguments, 1);
	if (typeof options == 'string' && (options == 'isDisabled' || options == 'getDate'))
		return $.datepicker['_' + options + 'Datepicker'].
			apply($.datepicker, [this[0]].concat(otherArgs));
	if (options == 'option' && arguments.length == 2 && typeof arguments[1] == 'string')
		return $.datepicker['_' + options + 'Datepicker'].
			apply($.datepicker, [this[0]].concat(otherArgs));
	return this.each(function() {
		typeof options == 'string' ?
			$.datepicker['_' + options + 'Datepicker'].
				apply($.datepicker, [this].concat(otherArgs)) :
			$.datepicker._attachDatepicker(this, options);
	});
};

$.datepicker = new Datepicker(); // singleton instance
$.datepicker.initialized = false;
$.datepicker.uuid = new Date().getTime();
$.datepicker.version = "1.7.2";

// Workaround for #4055
// Add another global to avoid noConflict issues with inline event handlers
window.DP_jQuery = $;

})(jQuery);
/*
 * jQuery UI Dialog 1.7.2
 *
 * Copyright (c) 2009 AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT (MIT-LICENSE.txt)
 * and GPL (GPL-LICENSE.txt) licenses.
 *
 * http://docs.jquery.com/UI/Dialog
 *
 * Depends:
 *	ui.core.js
 *	ui.draggable.js
 *	ui.resizable.js
 */
(function($) {

var setDataSwitch = {
		dragStart: "start.draggable",
		drag: "drag.draggable",
		dragStop: "stop.draggable",
		maxHeight: "maxHeight.resizable",
		minHeight: "minHeight.resizable",
		maxWidth: "maxWidth.resizable",
		minWidth: "minWidth.resizable",
		resizeStart: "start.resizable",
		resize: "drag.resizable",
		resizeStop: "stop.resizable"
	},

	uiDialogClasses =
		'ui-dialog ' +
		'ui-widget ' +
		'ui-widget-content ' +
		'ui-corner-all ';

$.widget("ui.dialog", {

	_init: function() {
		this.originalTitle = this.element.attr('title');

		var self = this,
			options = this.options,

			title = options.title || this.originalTitle || '&nbsp;',
			titleId = $.ui.dialog.getTitleId(this.element),

			uiDialog = (this.uiDialog = $('<div/>'))
				.appendTo(document.body)
				.hide()
				.addClass(uiDialogClasses + options.dialogClass)
				.css({
					position: 'absolute',
					overflow: 'hidden',
					zIndex: options.zIndex
				})
				// setting tabIndex makes the div focusable
				// setting outline to 0 prevents a border on focus in Mozilla
				.attr('tabIndex', -1).css('outline', 0).keydown(function(event) {
					(options.closeOnEscape && event.keyCode
						&& event.keyCode == $.ui.keyCode.ESCAPE && self.close(event));
				})
				.attr({
					role: 'dialog',
					'aria-labelledby': titleId
				})
				.mousedown(function(event) {
					self.moveToTop(false, event);
				}),

			uiDialogContent = this.element
				.show()
				.removeAttr('title')
				.addClass(
					'ui-dialog-content ' +
					'ui-widget-content')
				.appendTo(uiDialog),

			uiDialogTitlebar = (this.uiDialogTitlebar = $('<div></div>'))
				.addClass(
					'ui-dialog-titlebar ' +
					'ui-widget-header ' +
					'ui-corner-all ' +
					'ui-helper-clearfix'
				)
				.prependTo(uiDialog),

			uiDialogTitlebarClose = $('<a href="#"/>')
				.addClass(
					'ui-dialog-titlebar-close ' +
					'ui-corner-all'
				)
				.attr('role', 'button')
				.hover(
					function() {
						uiDialogTitlebarClose.addClass('ui-state-hover');
					},
					function() {
						uiDialogTitlebarClose.removeClass('ui-state-hover');
					}
				)
				.focus(function() {
					uiDialogTitlebarClose.addClass('ui-state-focus');
				})
				.blur(function() {
					uiDialogTitlebarClose.removeClass('ui-state-focus');
				})
				.mousedown(function(ev) {
					ev.stopPropagation();
				})
				.click(function(event) {
					self.close(event);
					return false;
				})
				.appendTo(uiDialogTitlebar),

			uiDialogTitlebarCloseText = (this.uiDialogTitlebarCloseText = $('<span/>'))
				.addClass(
					'ui-icon ' +
					'ui-icon-closethick'
				)
				.text(options.closeText)
				.appendTo(uiDialogTitlebarClose),

			uiDialogTitle = $('<span/>')
				.addClass('ui-dialog-title')
				.attr('id', titleId)
				.html(title)
				.prependTo(uiDialogTitlebar);

		uiDialogTitlebar.find("*").add(uiDialogTitlebar).disableSelection();

		(options.draggable && $.fn.draggable && this._makeDraggable());
		(options.resizable && $.fn.resizable && this._makeResizable());

		this._createButtons(options.buttons);
		this._isOpen = false;

		(options.bgiframe && $.fn.bgiframe && uiDialog.bgiframe());
		(options.autoOpen && this.open());

	},

	destroy: function() {
		(this.overlay && this.overlay.destroy());
		this.uiDialog.hide();
		this.element
			.unbind('.dialog')
			.removeData('dialog')
			.removeClass('ui-dialog-content ui-widget-content')
			.hide().appendTo('body');
		this.uiDialog.remove();

		(this.originalTitle && this.element.attr('title', this.originalTitle));
	},

	close: function(event) {
		var self = this;

		if (false === self._trigger('beforeclose', event)) {
			return;
		}

		(self.overlay && self.overlay.destroy());
		self.uiDialog.unbind('keypress.ui-dialog');

		(self.options.hide
			? self.uiDialog.hide(self.options.hide, function() {
				self._trigger('close', event);
			})
			: self.uiDialog.hide() && self._trigger('close', event));

		$.ui.dialog.overlay.resize();

		self._isOpen = false;

		// adjust the maxZ to allow other modal dialogs to continue to work (see #4309)
		if (self.options.modal) {
			var maxZ = 0;
			$('.ui-dialog').each(function() {
				if (this != self.uiDialog[0]) {
					maxZ = Math.max(maxZ, $(this).css('z-index'));
				}
			});
			$.ui.dialog.maxZ = maxZ;
		}
	},

	isOpen: function() {
		return this._isOpen;
	},

	// the force parameter allows us to move modal dialogs to their correct
	// position on open
	moveToTop: function(force, event) {

		if ((this.options.modal && !force)
			|| (!this.options.stack && !this.options.modal)) {
			return this._trigger('focus', event);
		}

		if (this.options.zIndex > $.ui.dialog.maxZ) {
			$.ui.dialog.maxZ = this.options.zIndex;
		}
		(this.overlay && this.overlay.$el.css('z-index', $.ui.dialog.overlay.maxZ = ++$.ui.dialog.maxZ));

		//Save and then restore scroll since Opera 9.5+ resets when parent z-Index is changed.
		//  http://ui.jquery.com/bugs/ticket/3193
		var saveScroll = { scrollTop: this.element.attr('scrollTop'), scrollLeft: this.element.attr('scrollLeft') };
		this.uiDialog.css('z-index', ++$.ui.dialog.maxZ);
		this.element.attr(saveScroll);
		this._trigger('focus', event);
	},

	open: function() {
		if (this._isOpen) { return; }

		var options = this.options,
			uiDialog = this.uiDialog;

		this.overlay = options.modal ? new $.ui.dialog.overlay(this) : null;
		(uiDialog.next().length && uiDialog.appendTo('body'));
		this._size();
		this._position(options.position);
		uiDialog.show(options.show);
		this.moveToTop(true);

		// prevent tabbing out of modal dialogs
		(options.modal && uiDialog.bind('keypress.ui-dialog', function(event) {
			if (event.keyCode != $.ui.keyCode.TAB) {
				return;
			}

			var tabbables = $(':tabbable', this),
				first = tabbables.filter(':first')[0],
				last  = tabbables.filter(':last')[0];

			if (event.target == last && !event.shiftKey) {
				setTimeout(function() {
					first.focus();
				}, 1);
			} else if (event.target == first && event.shiftKey) {
				setTimeout(function() {
					last.focus();
				}, 1);
			}
		}));

		// set focus to the first tabbable element in the content area or the first button
		// if there are no tabbable elements, set focus on the dialog itself
		$([])
			.add(uiDialog.find('.ui-dialog-content :tabbable:first'))
			.add(uiDialog.find('.ui-dialog-buttonpane :tabbable:first'))
			.add(uiDialog)
			.filter(':first')
			.focus();

		this._trigger('open');
		this._isOpen = true;
	},

	_createButtons: function(buttons) {
		var self = this,
			hasButtons = false,
			uiDialogButtonPane = $('<div></div>')
				.addClass(
					'ui-dialog-buttonpane ' +
					'ui-widget-content ' +
					'ui-helper-clearfix'
				);

		// if we already have a button pane, remove it
		this.uiDialog.find('.ui-dialog-buttonpane').remove();

		(typeof buttons == 'object' && buttons !== null &&
			$.each(buttons, function() { return !(hasButtons = true); }));
		if (hasButtons) {
			$.each(buttons, function(name, fn) {
				$('<button type="button"></button>')
					.addClass(
						'ui-state-default ' +
						'ui-corner-all'
					)
					.text(name)
					.click(function() { fn.apply(self.element[0], arguments); })
					.hover(
						function() {
							$(this).addClass('ui-state-hover');
						},
						function() {
							$(this).removeClass('ui-state-hover');
						}
					)
					.focus(function() {
						$(this).addClass('ui-state-focus');
					})
					.blur(function() {
						$(this).removeClass('ui-state-focus');
					})
					.appendTo(uiDialogButtonPane);
			});
			uiDialogButtonPane.appendTo(this.uiDialog);
		}
	},

	_makeDraggable: function() {
		var self = this,
			options = this.options,
			heightBeforeDrag;

		this.uiDialog.draggable({
			cancel: '.ui-dialog-content',
			handle: '.ui-dialog-titlebar',
			containment: 'document',
			start: function() {
				heightBeforeDrag = options.height;
				$(this).height($(this).height()).addClass("ui-dialog-dragging");
				(options.dragStart && options.dragStart.apply(self.element[0], arguments));
			},
			drag: function() {
				(options.drag && options.drag.apply(self.element[0], arguments));
			},
			stop: function() {
				$(this).removeClass("ui-dialog-dragging").height(heightBeforeDrag);
				(options.dragStop && options.dragStop.apply(self.element[0], arguments));
				$.ui.dialog.overlay.resize();
			}
		});
	},

	_makeResizable: function(handles) {
		handles = (handles === undefined ? this.options.resizable : handles);
		var self = this,
			options = this.options,
			resizeHandles = typeof handles == 'string'
				? handles
				: 'n,e,s,w,se,sw,ne,nw';

		this.uiDialog.resizable({
			cancel: '.ui-dialog-content',
			alsoResize: this.element,
			maxWidth: options.maxWidth,
			maxHeight: options.maxHeight,
			minWidth: options.minWidth,
			minHeight: options.minHeight,
			start: function() {
				$(this).addClass("ui-dialog-resizing");
				(options.resizeStart && options.resizeStart.apply(self.element[0], arguments));
			},
			resize: function() {
				(options.resize && options.resize.apply(self.element[0], arguments));
			},
			handles: resizeHandles,
			stop: function() {
				$(this).removeClass("ui-dialog-resizing");
				options.height = $(this).height();
				options.width = $(this).width();
				(options.resizeStop && options.resizeStop.apply(self.element[0], arguments));
				$.ui.dialog.overlay.resize();
			}
		})
		.find('.ui-resizable-se').addClass('ui-icon ui-icon-grip-diagonal-se');
	},

	_position: function(pos) {
		var wnd = $(window), doc = $(document),
			pTop = doc.scrollTop(), pLeft = doc.scrollLeft(),
			minTop = pTop;

		if ($.inArray(pos, ['center','top','right','bottom','left']) >= 0) {
			pos = [
				pos == 'right' || pos == 'left' ? pos : 'center',
				pos == 'top' || pos == 'bottom' ? pos : 'middle'
			];
		}
		if (pos.constructor != Array) {
			pos = ['center', 'middle'];
		}
		if (pos[0].constructor == Number) {
			pLeft += pos[0];
		} else {
			switch (pos[0]) {
				case 'left':
					pLeft += 0;
					break;
				case 'right':
					pLeft += wnd.width() - this.uiDialog.outerWidth();
					break;
				default:
				case 'center':
					pLeft += (wnd.width() - this.uiDialog.outerWidth()) / 2;
			}
		}
		if (pos[1].constructor == Number) {
			pTop += pos[1];
		} else {
			switch (pos[1]) {
				case 'top':
					pTop += 0;
					break;
				case 'bottom':
					pTop += wnd.height() - this.uiDialog.outerHeight();
					break;
				default:
				case 'middle':
					pTop += (wnd.height() - this.uiDialog.outerHeight()) / 2;
			}
		}

		// prevent the dialog from being too high (make sure the titlebar
		// is accessible)
		pTop = Math.max(pTop, minTop);
		this.uiDialog.css({top: pTop, left: pLeft});
	},

	_setData: function(key, value){
		(setDataSwitch[key] && this.uiDialog.data(setDataSwitch[key], value));
		switch (key) {
			case "buttons":
				this._createButtons(value);
				break;
			case "closeText":
				this.uiDialogTitlebarCloseText.text(value);
				break;
			case "dialogClass":
				this.uiDialog
					.removeClass(this.options.dialogClass)
					.addClass(uiDialogClasses + value);
				break;
			case "draggable":
				(value
					? this._makeDraggable()
					: this.uiDialog.draggable('destroy'));
				break;
			case "height":
				this.uiDialog.height(value);
				break;
			case "position":
				this._position(value);
				break;
			case "resizable":
				var uiDialog = this.uiDialog,
					isResizable = this.uiDialog.is(':data(resizable)');

				// currently resizable, becoming non-resizable
				(isResizable && !value && uiDialog.resizable('destroy'));

				// currently resizable, changing handles
				(isResizable && typeof value == 'string' &&
					uiDialog.resizable('option', 'handles', value));

				// currently non-resizable, becoming resizable
				(isResizable || this._makeResizable(value));
				break;
			case "title":
				$(".ui-dialog-title", this.uiDialogTitlebar).html(value || '&nbsp;');
				break;
			case "width":
				this.uiDialog.width(value);
				break;
		}

		$.widget.prototype._setData.apply(this, arguments);
	},

	_size: function() {
		/* If the user has resized the dialog, the .ui-dialog and .ui-dialog-content
		 * divs will both have width and height set, so we need to reset them
		 */
		var options = this.options;

		// reset content sizing
		this.element.css({
			height: 0,
			minHeight: 0,
			width: 'auto'
		});

		// reset wrapper sizing
		// determine the height of all the non-content elements
		var nonContentHeight = this.uiDialog.css({
				height: 'auto',
				width: options.width
			})
			.height();

		this.element
			.css({
				minHeight: Math.max(options.minHeight - nonContentHeight, 0),
				height: options.height == 'auto'
					? 'auto'
					: Math.max(options.height - nonContentHeight, 0)
			});
	}
});

$.extend($.ui.dialog, {
	version: "1.7.2",
	defaults: {
		autoOpen: true,
		bgiframe: false,
		buttons: {},
		closeOnEscape: true,
		closeText: 'close',
		dialogClass: '',
		draggable: true,
		hide: null,
		height: 'auto',
		maxHeight: false,
		maxWidth: false,
		minHeight: 150,
		minWidth: 150,
		modal: false,
		position: 'center',
		resizable: true,
		show: null,
		stack: true,
		title: '',
		width: 300,
		zIndex: 1000
	},

	getter: 'isOpen',

	uuid: 0,
	maxZ: 0,

	getTitleId: function($el) {
		return 'ui-dialog-title-' + ($el.attr('id') || ++this.uuid);
	},

	overlay: function(dialog) {
		this.$el = $.ui.dialog.overlay.create(dialog);
	}
});

$.extend($.ui.dialog.overlay, {
	instances: [],
	maxZ: 0,
	events: $.map('focus,mousedown,mouseup,keydown,keypress,click'.split(','),
		function(event) { return event + '.dialog-overlay'; }).join(' '),
	create: function(dialog) {
		if (this.instances.length === 0) {
			// prevent use of anchors and inputs
			// we use a setTimeout in case the overlay is created from an
			// event that we're going to be cancelling (see #2804)
			setTimeout(function() {
				// handle $(el).dialog().dialog('close') (see #4065)
				if ($.ui.dialog.overlay.instances.length) {
					$(document).bind($.ui.dialog.overlay.events, function(event) {
						var dialogZ = $(event.target).parents('.ui-dialog').css('zIndex') || 0;
						return (dialogZ > $.ui.dialog.overlay.maxZ);
					});
				}
			}, 1);

			// allow closing by pressing the escape key
			$(document).bind('keydown.dialog-overlay', function(event) {
				(dialog.options.closeOnEscape && event.keyCode
						&& event.keyCode == $.ui.keyCode.ESCAPE && dialog.close(event));
			});

			// handle window resize
			$(window).bind('resize.dialog-overlay', $.ui.dialog.overlay.resize);
		}

		var $el = $('<div></div>').appendTo(document.body)
			.addClass('ui-widget-overlay').css({
				width: this.width(),
				height: this.height()
			});

		(dialog.options.bgiframe && $.fn.bgiframe && $el.bgiframe());

		this.instances.push($el);
		return $el;
	},

	destroy: function($el) {
		this.instances.splice($.inArray(this.instances, $el), 1);

		if (this.instances.length === 0) {
			$([document, window]).unbind('.dialog-overlay');
		}

		$el.remove();

		// adjust the maxZ to allow other modal dialogs to continue to work (see #4309)
		var maxZ = 0;
		$.each(this.instances, function() {
			maxZ = Math.max(maxZ, this.css('z-index'));
		});
		this.maxZ = maxZ;
	},

	height: function() {
		// handle IE 6
		if ($.browser.msie && $.browser.version < 7) {
			var scrollHeight = Math.max(
				document.documentElement.scrollHeight,
				document.body.scrollHeight
			);
			var offsetHeight = Math.max(
				document.documentElement.offsetHeight,
				document.body.offsetHeight
			);

			if (scrollHeight < offsetHeight) {
				return $(window).height() + 'px';
			} else {
				return scrollHeight + 'px';
			}
		// handle "good" browsers
		} else {
			return $(document).height() + 'px';
		}
	},

	width: function() {
		// handle IE 6
		if ($.browser.msie && $.browser.version < 7) {
			var scrollWidth = Math.max(
				document.documentElement.scrollWidth,
				document.body.scrollWidth
			);
			var offsetWidth = Math.max(
				document.documentElement.offsetWidth,
				document.body.offsetWidth
			);

			if (scrollWidth < offsetWidth) {
				return $(window).width() + 'px';
			} else {
				return scrollWidth + 'px';
			}
		// handle "good" browsers
		} else {
			return $(document).width() + 'px';
		}
	},

	resize: function() {
		/* If the dialog is draggable and the user drags it past the
		 * right edge of the window, the document becomes wider so we
		 * need to stretch the overlay. If the user then drags the
		 * dialog back to the left, the document will become narrower,
		 * so we need to shrink the overlay to the appropriate size.
		 * This is handled by shrinking the overlay before setting it
		 * to the full document size.
		 */
		var $overlays = $([]);
		$.each($.ui.dialog.overlay.instances, function() {
			$overlays = $overlays.add(this);
		});

		$overlays.css({
			width: 0,
			height: 0
		}).css({
			width: $.ui.dialog.overlay.width(),
			height: $.ui.dialog.overlay.height()
		});
	}
});

$.extend($.ui.dialog.overlay.prototype, {
	destroy: function() {
		$.ui.dialog.overlay.destroy(this.$el);
	}
});

})(jQuery);
/*
 * jQuery UI Progressbar 1.7.2
 *
 * Copyright (c) 2009 AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT (MIT-LICENSE.txt)
 * and GPL (GPL-LICENSE.txt) licenses.
 *
 * http://docs.jquery.com/UI/Progressbar
 *
 * Depends:
 *   ui.core.js
 */
(function($) {

$.widget("ui.progressbar", {

	_init: function() {

		this.element
			.addClass("ui-progressbar"
				+ " ui-widget"
				+ " ui-widget-content"
				+ " ui-corner-all")
			.attr({
				role: "progressbar",
				"aria-valuemin": this._valueMin(),
				"aria-valuemax": this._valueMax(),
				"aria-valuenow": this._value()
			});

		this.valueDiv = $('<div class="ui-progressbar-value ui-widget-header ui-corner-left"></div>').appendTo(this.element);

		this._refreshValue();

	},

	destroy: function() {

		this.element
			.removeClass("ui-progressbar"
				+ " ui-widget"
				+ " ui-widget-content"
				+ " ui-corner-all")
			.removeAttr("role")
			.removeAttr("aria-valuemin")
			.removeAttr("aria-valuemax")
			.removeAttr("aria-valuenow")
			.removeData("progressbar")
			.unbind(".progressbar");

		this.valueDiv.remove();

		$.widget.prototype.destroy.apply(this, arguments);

	},

	value: function(newValue) {
		if (newValue === undefined) {
			return this._value();
		}

		this._setData('value', newValue);
		return this;
	},

	_setData: function(key, value) {

		switch (key) {
			case 'value':
				this.options.value = value;
				this._refreshValue();
				this._trigger('change', null, {});
				break;
		}

		$.widget.prototype._setData.apply(this, arguments);

	},

	_value: function() {

		var val = this.options.value;
		if (val < this._valueMin()) val = this._valueMin();
		if (val > this._valueMax()) val = this._valueMax();

		return val;

	},

	_valueMin: function() {
		var valueMin = 0;
		return valueMin;
	},

	_valueMax: function() {
		var valueMax = 100;
		return valueMax;
	},

	_refreshValue: function() {
		var value = this.value();
		this.valueDiv[value == this._valueMax() ? 'addClass' : 'removeClass']("ui-corner-right");
		this.valueDiv.width(value + '%');
		this.element.attr("aria-valuenow", value);
	}

});

$.extend($.ui.progressbar, {
	version: "1.7.2",
	defaults: {
		value: 0
	}
});

})(jQuery);
/*
 * jQuery UI Slider 1.7.2
 *
 * Copyright (c) 2009 AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT (MIT-LICENSE.txt)
 * and GPL (GPL-LICENSE.txt) licenses.
 *
 * http://docs.jquery.com/UI/Slider
 *
 * Depends:
 *	ui.core.js
 */

(function($) {

$.widget("ui.slider", $.extend({}, $.ui.mouse, {

	_init: function() {

		var self = this, o = this.options;
		this._keySliding = false;
		this._handleIndex = null;
		this._detectOrientation();
		this._mouseInit();

		this.element
			.addClass("ui-slider"
				+ " ui-slider-" + this.orientation
				+ " ui-widget"
				+ " ui-widget-content"
				+ " ui-corner-all");

		this.range = $([]);

		if (o.range) {

			if (o.range === true) {
				this.range = $('<div></div>');
				if (!o.values) o.values = [this._valueMin(), this._valueMin()];
				if (o.values.length && o.values.length != 2) {
					o.values = [o.values[0], o.values[0]];
				}
			} else {
				this.range = $('<div></div>');
			}

			this.range
				.appendTo(this.element)
				.addClass("ui-slider-range");

			if (o.range == "min" || o.range == "max") {
				this.range.addClass("ui-slider-range-" + o.range);
			}

			// note: this isn't the most fittingly semantic framework class for this element,
			// but worked best visually with a variety of themes
			this.range.addClass("ui-widget-header");

		}

		if ($(".ui-slider-handle", this.element).length == 0)
			$('<a href="#"></a>')
				.appendTo(this.element)
				.addClass("ui-slider-handle");

		if (o.values && o.values.length) {
			while ($(".ui-slider-handle", this.element).length < o.values.length)
				$('<a href="#"></a>')
					.appendTo(this.element)
					.addClass("ui-slider-handle");
		}

		this.handles = $(".ui-slider-handle", this.element)
			.addClass("ui-state-default"
				+ " ui-corner-all");

		this.handle = this.handles.eq(0);

		this.handles.add(this.range).filter("a")
			.click(function(event) {
				event.preventDefault();
			})
			.hover(function() {
				if (!o.disabled) {
					$(this).addClass('ui-state-hover');
				}
			}, function() {
				$(this).removeClass('ui-state-hover');
			})
			.focus(function() {
				if (!o.disabled) {
					$(".ui-slider .ui-state-focus").removeClass('ui-state-focus'); $(this).addClass('ui-state-focus');
				} else {
					$(this).blur();
				}
			})
			.blur(function() {
				$(this).removeClass('ui-state-focus');
			});

		this.handles.each(function(i) {
			$(this).data("index.ui-slider-handle", i);
		});

		this.handles.keydown(function(event) {

			var ret = true;

			var index = $(this).data("index.ui-slider-handle");

			if (self.options.disabled)
				return;

			switch (event.keyCode) {
				case $.ui.keyCode.HOME:
				case $.ui.keyCode.END:
				case $.ui.keyCode.UP:
				case $.ui.keyCode.RIGHT:
				case $.ui.keyCode.DOWN:
				case $.ui.keyCode.LEFT:
					ret = false;
					if (!self._keySliding) {
						self._keySliding = true;
						$(this).addClass("ui-state-active");
						self._start(event, index);
					}
					break;
			}

			var curVal, newVal, step = self._step();
			if (self.options.values && self.options.values.length) {
				curVal = newVal = self.values(index);
			} else {
				curVal = newVal = self.value();
			}

			switch (event.keyCode) {
				case $.ui.keyCode.HOME:
					newVal = self._valueMin();
					break;
				case $.ui.keyCode.END:
					newVal = self._valueMax();
					break;
				case $.ui.keyCode.UP:
				case $.ui.keyCode.RIGHT:
					if(curVal == self._valueMax()) return;
					newVal = curVal + step;
					break;
				case $.ui.keyCode.DOWN:
				case $.ui.keyCode.LEFT:
					if(curVal == self._valueMin()) return;
					newVal = curVal - step;
					break;
			}

			self._slide(event, index, newVal);

			return ret;

		}).keyup(function(event) {

			var index = $(this).data("index.ui-slider-handle");

			if (self._keySliding) {
				self._stop(event, index);
				self._change(event, index);
				self._keySliding = false;
				$(this).removeClass("ui-state-active");
			}

		});

		this._refreshValue();

	},

	destroy: function() {

		this.handles.remove();
		this.range.remove();

		this.element
			.removeClass("ui-slider"
				+ " ui-slider-horizontal"
				+ " ui-slider-vertical"
				+ " ui-slider-disabled"
				+ " ui-widget"
				+ " ui-widget-content"
				+ " ui-corner-all")
			.removeData("slider")
			.unbind(".slider");

		this._mouseDestroy();

	},

	_mouseCapture: function(event) {

		var o = this.options;

		if (o.disabled)
			return false;

		this.elementSize = {
			width: this.element.outerWidth(),
			height: this.element.outerHeight()
		};
		this.elementOffset = this.element.offset();

		var position = { x: event.pageX, y: event.pageY };
		var normValue = this._normValueFromMouse(position);

		var distance = this._valueMax() - this._valueMin() + 1, closestHandle;
		var self = this, index;
		this.handles.each(function(i) {
			var thisDistance = Math.abs(normValue - self.values(i));
			if (distance > thisDistance) {
				distance = thisDistance;
				closestHandle = $(this);
				index = i;
			}
		});

		// workaround for bug #3736 (if both handles of a range are at 0,
		// the first is always used as the one with least distance,
		// and moving it is obviously prevented by preventing negative ranges)
		if(o.range == true && this.values(1) == o.min) {
			closestHandle = $(this.handles[++index]);
		}

		this._start(event, index);

		self._handleIndex = index;

		closestHandle
			.addClass("ui-state-active")
			.focus();

		var offset = closestHandle.offset();
		var mouseOverHandle = !$(event.target).parents().andSelf().is('.ui-slider-handle');
		this._clickOffset = mouseOverHandle ? { left: 0, top: 0 } : {
			left: event.pageX - offset.left - (closestHandle.width() / 2),
			top: event.pageY - offset.top
				- (closestHandle.height() / 2)
				- (parseInt(closestHandle.css('borderTopWidth'),10) || 0)
				- (parseInt(closestHandle.css('borderBottomWidth'),10) || 0)
				+ (parseInt(closestHandle.css('marginTop'),10) || 0)
		};

		normValue = this._normValueFromMouse(position);
		this._slide(event, index, normValue);
		return true;

	},

	_mouseStart: function(event) {
		return true;
	},

	_mouseDrag: function(event) {

		var position = { x: event.pageX, y: event.pageY };
		var normValue = this._normValueFromMouse(position);

		this._slide(event, this._handleIndex, normValue);

		return false;

	},

	_mouseStop: function(event) {

		this.handles.removeClass("ui-state-active");
		this._stop(event, this._handleIndex);
		this._change(event, this._handleIndex);
		this._handleIndex = null;
		this._clickOffset = null;

		return false;

	},

	_detectOrientation: function() {
		this.orientation = this.options.orientation == 'vertical' ? 'vertical' : 'horizontal';
	},

	_normValueFromMouse: function(position) {

		var pixelTotal, pixelMouse;
		if ('horizontal' == this.orientation) {
			pixelTotal = this.elementSize.width;
			pixelMouse = position.x - this.elementOffset.left - (this._clickOffset ? this._clickOffset.left : 0);
		} else {
			pixelTotal = this.elementSize.height;
			pixelMouse = position.y - this.elementOffset.top - (this._clickOffset ? this._clickOffset.top : 0);
		}

		var percentMouse = (pixelMouse / pixelTotal);
		if (percentMouse > 1) percentMouse = 1;
		if (percentMouse < 0) percentMouse = 0;
		if ('vertical' == this.orientation)
			percentMouse = 1 - percentMouse;

		var valueTotal = this._valueMax() - this._valueMin(),
			valueMouse = percentMouse * valueTotal,
			valueMouseModStep = valueMouse % this.options.step,
			normValue = this._valueMin() + valueMouse - valueMouseModStep;

		if (valueMouseModStep > (this.options.step / 2))
			normValue += this.options.step;

		// Since JavaScript has problems with large floats, round
		// the final value to 5 digits after the decimal point (see #4124)
		return parseFloat(normValue.toFixed(5));

	},

	_start: function(event, index) {
		var uiHash = {
			handle: this.handles[index],
			value: this.value()
		};
		if (this.options.values && this.options.values.length) {
			uiHash.value = this.values(index);
			uiHash.values = this.values();
		}
		this._trigger("start", event, uiHash);
	},

	_slide: function(event, index, newVal) {

		var handle = this.handles[index];

		if (this.options.values && this.options.values.length) {

			var otherVal = this.values(index ? 0 : 1);

			if ((this.options.values.length == 2 && this.options.range === true) &&
				((index == 0 && newVal > otherVal) || (index == 1 && newVal < otherVal))){
 				newVal = otherVal;
			}

			if (newVal != this.values(index)) {
				var newValues = this.values();
				newValues[index] = newVal;
				// A slide can be canceled by returning false from the slide callback
				var allowed = this._trigger("slide", event, {
					handle: this.handles[index],
					value: newVal,
					values: newValues
				});
				var otherVal = this.values(index ? 0 : 1);
				if (allowed !== false) {
					this.values(index, newVal, ( event.type == 'mousedown' && this.options.animate ), true);
				}
			}

		} else {

			if (newVal != this.value()) {
				// A slide can be canceled by returning false from the slide callback
				var allowed = this._trigger("slide", event, {
					handle: this.handles[index],
					value: newVal
				});
				if (allowed !== false) {
					this._setData('value', newVal, ( event.type == 'mousedown' && this.options.animate ));
				}

			}

		}

	},

	_stop: function(event, index) {
		var uiHash = {
			handle: this.handles[index],
			value: this.value()
		};
		if (this.options.values && this.options.values.length) {
			uiHash.value = this.values(index);
			uiHash.values = this.values();
		}
		this._trigger("stop", event, uiHash);
	},

	_change: function(event, index) {
		var uiHash = {
			handle: this.handles[index],
			value: this.value()
		};
		if (this.options.values && this.options.values.length) {
			uiHash.value = this.values(index);
			uiHash.values = this.values();
		}
		this._trigger("change", event, uiHash);
	},

	value: function(newValue) {

		if (arguments.length) {
			this._setData("value", newValue);
			this._change(null, 0);
		}

		return this._value();

	},

	values: function(index, newValue, animated, noPropagation) {

		if (arguments.length > 1) {
			this.options.values[index] = newValue;
			this._refreshValue(animated);
			if(!noPropagation) this._change(null, index);
		}

		if (arguments.length) {
			if (this.options.values && this.options.values.length) {
				return this._values(index);
			} else {
				return this.value();
			}
		} else {
			return this._values();
		}

	},

	_setData: function(key, value, animated) {

		$.widget.prototype._setData.apply(this, arguments);

		switch (key) {
			case 'disabled':
				if (value) {
					this.handles.filter(".ui-state-focus").blur();
					this.handles.removeClass("ui-state-hover");
					this.handles.attr("disabled", "disabled");
				} else {
					this.handles.removeAttr("disabled");
				}
			case 'orientation':

				this._detectOrientation();

				this.element
					.removeClass("ui-slider-horizontal ui-slider-vertical")
					.addClass("ui-slider-" + this.orientation);
				this._refreshValue(animated);
				break;
			case 'value':
				this._refreshValue(animated);
				break;
		}

	},

	_step: function() {
		var step = this.options.step;
		return step;
	},

	_value: function() {

		var val = this.options.value;
		if (val < this._valueMin()) val = this._valueMin();
		if (val > this._valueMax()) val = this._valueMax();

		return val;

	},

	_values: function(index) {

		if (arguments.length) {
			var val = this.options.values[index];
			if (val < this._valueMin()) val = this._valueMin();
			if (val > this._valueMax()) val = this._valueMax();

			return val;
		} else {
			return this.options.values;
		}

	},

	_valueMin: function() {
		var valueMin = this.options.min;
		return valueMin;
	},

	_valueMax: function() {
		var valueMax = this.options.max;
		return valueMax;
	},

	_refreshValue: function(animate) {

		var oRange = this.options.range, o = this.options, self = this;

		if (this.options.values && this.options.values.length) {
			var vp0, vp1;
			this.handles.each(function(i, j) {
				var valPercent = (self.values(i) - self._valueMin()) / (self._valueMax() - self._valueMin()) * 100;
				var _set = {}; _set[self.orientation == 'horizontal' ? 'left' : 'bottom'] = valPercent + '%';
				$(this).stop(1,1)[animate ? 'animate' : 'css'](_set, o.animate);
				if (self.options.range === true) {
					if (self.orientation == 'horizontal') {
						(i == 0) && self.range.stop(1,1)[animate ? 'animate' : 'css']({ left: valPercent + '%' }, o.animate);
						(i == 1) && self.range[animate ? 'animate' : 'css']({ width: (valPercent - lastValPercent) + '%' }, { queue: false, duration: o.animate });
					} else {
						(i == 0) && self.range.stop(1,1)[animate ? 'animate' : 'css']({ bottom: (valPercent) + '%' }, o.animate);
						(i == 1) && self.range[animate ? 'animate' : 'css']({ height: (valPercent - lastValPercent) + '%' }, { queue: false, duration: o.animate });
					}
				}
				lastValPercent = valPercent;
			});
		} else {
			var value = this.value(),
				valueMin = this._valueMin(),
				valueMax = this._valueMax(),
				valPercent = valueMax != valueMin
					? (value - valueMin) / (valueMax - valueMin) * 100
					: 0;
			var _set = {}; _set[self.orientation == 'horizontal' ? 'left' : 'bottom'] = valPercent + '%';
			this.handle.stop(1,1)[animate ? 'animate' : 'css'](_set, o.animate);

			(oRange == "min") && (this.orientation == "horizontal") && this.range.stop(1,1)[animate ? 'animate' : 'css']({ width: valPercent + '%' }, o.animate);
			(oRange == "max") && (this.orientation == "horizontal") && this.range[animate ? 'animate' : 'css']({ width: (100 - valPercent) + '%' }, { queue: false, duration: o.animate });
			(oRange == "min") && (this.orientation == "vertical") && this.range.stop(1,1)[animate ? 'animate' : 'css']({ height: valPercent + '%' }, o.animate);
			(oRange == "max") && (this.orientation == "vertical") && this.range[animate ? 'animate' : 'css']({ height: (100 - valPercent) + '%' }, { queue: false, duration: o.animate });
		}

	}

}));

$.extend($.ui.slider, {
	getter: "value values",
	version: "1.7.2",
	eventPrefix: "slide",
	defaults: {
		animate: false,
		delay: 0,
		distance: 0,
		max: 100,
		min: 0,
		orientation: 'horizontal',
		range: false,
		step: 1,
		value: 0,
		values: null
	}
});

})(jQuery);
/*
 * jQuery UI Tabs 1.7.2
 *
 * Copyright (c) 2009 AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT (MIT-LICENSE.txt)
 * and GPL (GPL-LICENSE.txt) licenses.
 *
 * http://docs.jquery.com/UI/Tabs
 *
 * Depends:
 *	ui.core.js
 */
(function($) {

$.widget("ui.tabs", {

	_init: function() {
		if (this.options.deselectable !== undefined) {
			this.options.collapsible = this.options.deselectable;
		}
		this._tabify(true);
	},

	_setData: function(key, value) {
		if (key == 'selected') {
			if (this.options.collapsible && value == this.options.selected) {
				return;
			}
			this.select(value);
		}
		else {
			this.options[key] = value;
			if (key == 'deselectable') {
				this.options.collapsible = value;
			}
			this._tabify();
		}
	},

	_tabId: function(a) {
		return a.title && a.title.replace(/\s/g, '_').replace(/[^A-Za-z0-9\-_:\.]/g, '') ||
			this.options.idPrefix + $.data(a);
	},

	_sanitizeSelector: function(hash) {
		return hash.replace(/:/g, '\\:'); // we need this because an id may contain a ":"
	},

	_cookie: function() {
		var cookie = this.cookie || (this.cookie = this.options.cookie.name || 'ui-tabs-' + $.data(this.list[0]));
		return $.cookie.apply(null, [cookie].concat($.makeArray(arguments)));
	},

	_ui: function(tab, panel) {
		return {
			tab: tab,
			panel: panel,
			index: this.anchors.index(tab)
		};
	},

	_cleanup: function() {
		// restore all former loading tabs labels
		this.lis.filter('.ui-state-processing').removeClass('ui-state-processing')
				.find('span:data(label.tabs)')
				.each(function() {
					var el = $(this);
					el.html(el.data('label.tabs')).removeData('label.tabs');
				});
	},

	_tabify: function(init) {

		this.list = this.element.children('ul:first');
		this.lis = $('li:has(a[href])', this.list);
		this.anchors = this.lis.map(function() { return $('a', this)[0]; });
		this.panels = $([]);

		var self = this, o = this.options;

		var fragmentId = /^#.+/; // Safari 2 reports '#' for an empty hash
		this.anchors.each(function(i, a) {
			var href = $(a).attr('href');

			// For dynamically created HTML that contains a hash as href IE < 8 expands
			// such href to the full page url with hash and then misinterprets tab as ajax.
			// Same consideration applies for an added tab with a fragment identifier
			// since a[href=#fragment-identifier] does unexpectedly not match.
			// Thus normalize href attribute...
			var hrefBase = href.split('#')[0], baseEl;
			if (hrefBase && (hrefBase === location.toString().split('#')[0] ||
					(baseEl = $('base')[0]) && hrefBase === baseEl.href)) {
				href = a.hash;
				a.href = href;
			}

			// inline tab
			if (fragmentId.test(href)) {
				self.panels = self.panels.add(self._sanitizeSelector(href));
			}

			// remote tab
			else if (href != '#') { // prevent loading the page itself if href is just "#"
				$.data(a, 'href.tabs', href); // required for restore on destroy

				// TODO until #3808 is fixed strip fragment identifier from url
				// (IE fails to load from such url)
				$.data(a, 'load.tabs', href.replace(/#.*$/, '')); // mutable data

				var id = self._tabId(a);
				a.href = '#' + id;
				var $panel = $('#' + id);
				if (!$panel.length) {
					$panel = $(o.panelTemplate).attr('id', id).addClass('ui-tabs-panel ui-widget-content ui-corner-bottom')
						.insertAfter(self.panels[i - 1] || self.list);
					$panel.data('destroy.tabs', true);
				}
				self.panels = self.panels.add($panel);
			}

			// invalid tab href
			else {
				o.disabled.push(i);
			}
		});

		// initialization from scratch
		if (init) {

			// attach necessary classes for styling
			this.element.addClass('ui-tabs ui-widget ui-widget-content ui-corner-all');
			this.list.addClass('ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all');
			this.lis.addClass('ui-state-default ui-corner-top');
			this.panels.addClass('ui-tabs-panel ui-widget-content ui-corner-bottom');

			// Selected tab
			// use "selected" option or try to retrieve:
			// 1. from fragment identifier in url
			// 2. from cookie
			// 3. from selected class attribute on <li>
			if (o.selected === undefined) {
				if (location.hash) {
					this.anchors.each(function(i, a) {
						if (a.hash == location.hash) {
							o.selected = i;
							return false; // break
						}
					});
				}
				if (typeof o.selected != 'number' && o.cookie) {
					o.selected = parseInt(self._cookie(), 10);
				}
				if (typeof o.selected != 'number' && this.lis.filter('.ui-tabs-selected').length) {
					o.selected = this.lis.index(this.lis.filter('.ui-tabs-selected'));
				}
				o.selected = o.selected || 0;
			}
			else if (o.selected === null) { // usage of null is deprecated, TODO remove in next release
				o.selected = -1;
			}

			// sanity check - default to first tab...
			o.selected = ((o.selected >= 0 && this.anchors[o.selected]) || o.selected < 0) ? o.selected : 0;

			// Take disabling tabs via class attribute from HTML
			// into account and update option properly.
			// A selected tab cannot become disabled.
			o.disabled = $.unique(o.disabled.concat(
				$.map(this.lis.filter('.ui-state-disabled'),
					function(n, i) { return self.lis.index(n); } )
			)).sort();

			if ($.inArray(o.selected, o.disabled) != -1) {
				o.disabled.splice($.inArray(o.selected, o.disabled), 1);
			}

			// highlight selected tab
			this.panels.addClass('ui-tabs-hide');
			this.lis.removeClass('ui-tabs-selected ui-state-active');
			if (o.selected >= 0 && this.anchors.length) { // check for length avoids error when initializing empty list
				this.panels.eq(o.selected).removeClass('ui-tabs-hide');
				this.lis.eq(o.selected).addClass('ui-tabs-selected ui-state-active');

				// seems to be expected behavior that the show callback is fired
				self.element.queue("tabs", function() {
					self._trigger('show', null, self._ui(self.anchors[o.selected], self.panels[o.selected]));
				});

				this.load(o.selected);
			}

			// clean up to avoid memory leaks in certain versions of IE 6
			$(window).bind('unload', function() {
				self.lis.add(self.anchors).unbind('.tabs');
				self.lis = self.anchors = self.panels = null;
			});

		}
		// update selected after add/remove
		else {
			o.selected = this.lis.index(this.lis.filter('.ui-tabs-selected'));
		}

		// update collapsible
		this.element[o.collapsible ? 'addClass' : 'removeClass']('ui-tabs-collapsible');

		// set or update cookie after init and add/remove respectively
		if (o.cookie) {
			this._cookie(o.selected, o.cookie);
		}

		// disable tabs
		for (var i = 0, li; (li = this.lis[i]); i++) {
			$(li)[$.inArray(i, o.disabled) != -1 &&
				!$(li).hasClass('ui-tabs-selected') ? 'addClass' : 'removeClass']('ui-state-disabled');
		}

		// reset cache if switching from cached to not cached
		if (o.cache === false) {
			this.anchors.removeData('cache.tabs');
		}

		// remove all handlers before, tabify may run on existing tabs after add or option change
		this.lis.add(this.anchors).unbind('.tabs');

		if (o.event != 'mouseover') {
			var addState = function(state, el) {
				if (el.is(':not(.ui-state-disabled)')) {
					el.addClass('ui-state-' + state);
				}
			};
			var removeState = function(state, el) {
				el.removeClass('ui-state-' + state);
			};
			this.lis.bind('mouseover.tabs', function() {
				addState('hover', $(this));
			});
			this.lis.bind('mouseout.tabs', function() {
				removeState('hover', $(this));
			});
			this.anchors.bind('focus.tabs', function() {
				addState('focus', $(this).closest('li'));
			});
			this.anchors.bind('blur.tabs', function() {
				removeState('focus', $(this).closest('li'));
			});
		}

		// set up animations
		var hideFx, showFx;
		if (o.fx) {
			if ($.isArray(o.fx)) {
				hideFx = o.fx[0];
				showFx = o.fx[1];
			}
			else {
				hideFx = showFx = o.fx;
			}
		}

		// Reset certain styles left over from animation
		// and prevent IE's ClearType bug...
		function resetStyle($el, fx) {
			$el.css({ display: '' });
			if ($.browser.msie && fx.opacity) {
				$el[0].style.removeAttribute('filter');
			}
		}

		// Show a tab...
		var showTab = showFx ?
			function(clicked, $show) {
				$(clicked).closest('li').removeClass('ui-state-default').addClass('ui-tabs-selected ui-state-active');
				$show.hide().removeClass('ui-tabs-hide') // avoid flicker that way
					.animate(showFx, showFx.duration || 'normal', function() {
						resetStyle($show, showFx);
						self._trigger('show', null, self._ui(clicked, $show[0]));
					});
			} :
			function(clicked, $show) {
				$(clicked).closest('li').removeClass('ui-state-default').addClass('ui-tabs-selected ui-state-active');
				$show.removeClass('ui-tabs-hide');
				self._trigger('show', null, self._ui(clicked, $show[0]));
			};

		// Hide a tab, $show is optional...
		var hideTab = hideFx ?
			function(clicked, $hide) {
				$hide.animate(hideFx, hideFx.duration || 'normal', function() {
					self.lis.removeClass('ui-tabs-selected ui-state-active').addClass('ui-state-default');
					$hide.addClass('ui-tabs-hide');
					resetStyle($hide, hideFx);
					self.element.dequeue("tabs");
				});
			} :
			function(clicked, $hide, $show) {
				self.lis.removeClass('ui-tabs-selected ui-state-active').addClass('ui-state-default');
				$hide.addClass('ui-tabs-hide');
				self.element.dequeue("tabs");
			};

		// attach tab event handler, unbind to avoid duplicates from former tabifying...
		this.anchors.bind(o.event + '.tabs', function() {
			var el = this, $li = $(this).closest('li'), $hide = self.panels.filter(':not(.ui-tabs-hide)'),
					$show = $(self._sanitizeSelector(this.hash));

			// If tab is already selected and not collapsible or tab disabled or
			// or is already loading or click callback returns false stop here.
			// Check if click handler returns false last so that it is not executed
			// for a disabled or loading tab!
			if (($li.hasClass('ui-tabs-selected') && !o.collapsible) ||
				$li.hasClass('ui-state-disabled') ||
				$li.hasClass('ui-state-processing') ||
				self._trigger('select', null, self._ui(this, $show[0])) === false) {
				this.blur();
				return false;
			}

			o.selected = self.anchors.index(this);

			self.abort();

			// if tab may be closed
			if (o.collapsible) {
				if ($li.hasClass('ui-tabs-selected')) {
					o.selected = -1;

					if (o.cookie) {
						self._cookie(o.selected, o.cookie);
					}

					self.element.queue("tabs", function() {
						hideTab(el, $hide);
					}).dequeue("tabs");

					this.blur();
					return false;
				}
				else if (!$hide.length) {
					if (o.cookie) {
						self._cookie(o.selected, o.cookie);
					}

					self.element.queue("tabs", function() {
						showTab(el, $show);
					});

					self.load(self.anchors.index(this)); // TODO make passing in node possible, see also http://dev.jqueryui.com/ticket/3171

					this.blur();
					return false;
				}
			}

			if (o.cookie) {
				self._cookie(o.selected, o.cookie);
			}

			// show new tab
			if ($show.length) {
				if ($hide.length) {
					self.element.queue("tabs", function() {
						hideTab(el, $hide);
					});
				}
				self.element.queue("tabs", function() {
					showTab(el, $show);
				});

				self.load(self.anchors.index(this));
			}
			else {
				throw 'jQuery UI Tabs: Mismatching fragment identifier.';
			}

			// Prevent IE from keeping other link focussed when using the back button
			// and remove dotted border from clicked link. This is controlled via CSS
			// in modern browsers; blur() removes focus from address bar in Firefox
			// which can become a usability and annoying problem with tabs('rotate').
			if ($.browser.msie) {
				this.blur();
			}

		});

		// disable click in any case
		this.anchors.bind('click.tabs', function(){return false;});

	},

	destroy: function() {
		var o = this.options;

		this.abort();

		this.element.unbind('.tabs')
			.removeClass('ui-tabs ui-widget ui-widget-content ui-corner-all ui-tabs-collapsible')
			.removeData('tabs');

		this.list.removeClass('ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all');

		this.anchors.each(function() {
			var href = $.data(this, 'href.tabs');
			if (href) {
				this.href = href;
			}
			var $this = $(this).unbind('.tabs');
			$.each(['href', 'load', 'cache'], function(i, prefix) {
				$this.removeData(prefix + '.tabs');
			});
		});

		this.lis.unbind('.tabs').add(this.panels).each(function() {
			if ($.data(this, 'destroy.tabs')) {
				$(this).remove();
			}
			else {
				$(this).removeClass([
					'ui-state-default',
					'ui-corner-top',
					'ui-tabs-selected',
					'ui-state-active',
					'ui-state-hover',
					'ui-state-focus',
					'ui-state-disabled',
					'ui-tabs-panel',
					'ui-widget-content',
					'ui-corner-bottom',
					'ui-tabs-hide'
				].join(' '));
			}
		});

		if (o.cookie) {
			this._cookie(null, o.cookie);
		}
	},

	add: function(url, label, index) {
		if (index === undefined) {
			index = this.anchors.length; // append by default
		}

		var self = this, o = this.options,
			$li = $(o.tabTemplate.replace(/#\{href\}/g, url).replace(/#\{label\}/g, label)),
			id = !url.indexOf('#') ? url.replace('#', '') : this._tabId($('a', $li)[0]);

		$li.addClass('ui-state-default ui-corner-top').data('destroy.tabs', true);

		// try to find an existing element before creating a new one
		var $panel = $('#' + id);
		if (!$panel.length) {
			$panel = $(o.panelTemplate).attr('id', id).data('destroy.tabs', true);
		}
		$panel.addClass('ui-tabs-panel ui-widget-content ui-corner-bottom ui-tabs-hide');

		if (index >= this.lis.length) {
			$li.appendTo(this.list);
			$panel.appendTo(this.list[0].parentNode);
		}
		else {
			$li.insertBefore(this.lis[index]);
			$panel.insertBefore(this.panels[index]);
		}

		o.disabled = $.map(o.disabled,
			function(n, i) { return n >= index ? ++n : n; });

		this._tabify();

		if (this.anchors.length == 1) { // after tabify
			$li.addClass('ui-tabs-selected ui-state-active');
			$panel.removeClass('ui-tabs-hide');
			this.element.queue("tabs", function() {
				self._trigger('show', null, self._ui(self.anchors[0], self.panels[0]));
			});

			this.load(0);
		}

		// callback
		this._trigger('add', null, this._ui(this.anchors[index], this.panels[index]));
	},

	remove: function(index) {
		var o = this.options, $li = this.lis.eq(index).remove(),
			$panel = this.panels.eq(index).remove();

		// If selected tab was removed focus tab to the right or
		// in case the last tab was removed the tab to the left.
		if ($li.hasClass('ui-tabs-selected') && this.anchors.length > 1) {
			this.select(index + (index + 1 < this.anchors.length ? 1 : -1));
		}

		o.disabled = $.map($.grep(o.disabled, function(n, i) { return n != index; }),
			function(n, i) { return n >= index ? --n : n; });

		this._tabify();

		// callback
		this._trigger('remove', null, this._ui($li.find('a')[0], $panel[0]));
	},

	enable: function(index) {
		var o = this.options;
		if ($.inArray(index, o.disabled) == -1) {
			return;
		}

		this.lis.eq(index).removeClass('ui-state-disabled');
		o.disabled = $.grep(o.disabled, function(n, i) { return n != index; });

		// callback
		this._trigger('enable', null, this._ui(this.anchors[index], this.panels[index]));
	},

	disable: function(index) {
		var self = this, o = this.options;
		if (index != o.selected) { // cannot disable already selected tab
			this.lis.eq(index).addClass('ui-state-disabled');

			o.disabled.push(index);
			o.disabled.sort();

			// callback
			this._trigger('disable', null, this._ui(this.anchors[index], this.panels[index]));
		}
	},

	select: function(index) {
		if (typeof index == 'string') {
			index = this.anchors.index(this.anchors.filter('[href$=' + index + ']'));
		}
		else if (index === null) { // usage of null is deprecated, TODO remove in next release
			index = -1;
		}
		if (index == -1 && this.options.collapsible) {
			index = this.options.selected;
		}

		this.anchors.eq(index).trigger(this.options.event + '.tabs');
	},

	load: function(index) {
		var self = this, o = this.options, a = this.anchors.eq(index)[0], url = $.data(a, 'load.tabs');

		this.abort();

		// not remote or from cache
		if (!url || this.element.queue("tabs").length !== 0 && $.data(a, 'cache.tabs')) {
			this.element.dequeue("tabs");
			return;
		}

		// load remote from here on
		this.lis.eq(index).addClass('ui-state-processing');

		if (o.spinner) {
			var span = $('span', a);
			span.data('label.tabs', span.html()).html(o.spinner);
		}

		this.xhr = $.ajax($.extend({}, o.ajaxOptions, {
			url: url,
			success: function(r, s) {
				$(self._sanitizeSelector(a.hash)).html(r);

				// take care of tab labels
				self._cleanup();

				if (o.cache) {
					$.data(a, 'cache.tabs', true); // if loaded once do not load them again
				}

				// callbacks
				self._trigger('load', null, self._ui(self.anchors[index], self.panels[index]));
				try {
					o.ajaxOptions.success(r, s);
				}
				catch (e) {}

				// last, so that load event is fired before show...
				self.element.dequeue("tabs");
			}
		}));
	},

	abort: function() {
		// stop possibly running animations
		this.element.queue([]);
		this.panels.stop(false, true);

		// terminate pending requests from other tabs
		if (this.xhr) {
			this.xhr.abort();
			delete this.xhr;
		}

		// take care of tab labels
		this._cleanup();

	},

	url: function(index, url) {
		this.anchors.eq(index).removeData('cache.tabs').data('load.tabs', url);
	},

	length: function() {
		return this.anchors.length;
	}

});

$.extend($.ui.tabs, {
	version: '1.7.2',
	getter: 'length',
	defaults: {
		ajaxOptions: null,
		cache: false,
		cookie: null, // e.g. { expires: 7, path: '/', domain: 'jquery.com', secure: true }
		collapsible: false,
		disabled: [],
		event: 'click',
		fx: null, // e.g. { height: 'toggle', opacity: 'toggle', duration: 200 }
		idPrefix: 'ui-tabs-',
		panelTemplate: '<div></div>',
		spinner: '<em>Loading&#8230;</em>',
		tabTemplate: '<li><a href="#{href}"><span>#{label}</span></a></li>'
	}
});

/*
 * Tabs Extensions
 */

/*
 * Rotate
 */
$.extend($.ui.tabs.prototype, {
	rotation: null,
	rotate: function(ms, continuing) {

		var self = this, o = this.options;

		var rotate = self._rotate || (self._rotate = function(e) {
			clearTimeout(self.rotation);
			self.rotation = setTimeout(function() {
				var t = o.selected;
				self.select( ++t < self.anchors.length ? t : 0 );
			}, ms);

			if (e) {
				e.stopPropagation();
			}
		});

		var stop = self._unrotate || (self._unrotate = !continuing ?
			function(e) {
				if (e.clientX) { // in case of a true click
					self.rotate(null);
				}
			} :
			function(e) {
				t = o.selected;
				rotate();
			});

		// start rotation
		if (ms) {
			this.element.bind('tabsshow', rotate);
			this.anchors.bind(o.event + '.tabs', stop);
			rotate();
		}
		// stop rotation
		else {
			clearTimeout(self.rotation);
			this.element.unbind('tabsshow', rotate);
			this.anchors.unbind(o.event + '.tabs', stop);
			delete this._rotate;
			delete this._unrotate;
		}
	}
});

})(jQuery);
;/*
 * --------------------------------------------------------------------
 * jQuery-Plugin - $.download - allows for simple get/post requests for files
 * by Scott Jehl, scott@filamentgroup.com
 * http://www.filamentgroup.com
 * reference article: http://www.filamentgroup.com/lab/jquery_plugin_for_requesting_ajax_like_file_downloads/
 * Copyright (c) 2008 Filament Group, Inc
 * Dual licensed under the MIT (filamentgroup.com/examples/mit-license.txt) and GPL (filamentgroup.com/examples/gpl-license.txt) licenses.
 * --------------------------------------------------------------------
 */
 
jQuery.download = function(url, data, method){
	//url and data options required
	if( url && data ){ 
		//data can be string of parameters or array/object
		data = typeof data == 'string' ? data : jQuery.param(data);
		//split params into form inputs
		var inputs = '';
		jQuery.each(data.split('&'), function(){ 
			var pair = this.split('=');
			inputs+='<input type="hidden" name="'+ pair[0] +'" value="'+ pair[1] +'" />'; 
		});
		//send request
		jQuery('<form action="'+ url +'" method="'+ (method||'post') +'">'+inputs+'</form>')
		.appendTo('body').submit().remove();
	};
};
;(function($){
/*
 * Editable 1.3.3
 *
 * Copyright (c) 2009 Arash Karimzadeh (arashkarimzadeh.com)
 * Licensed under the MIT (MIT-LICENSE.txt)
 * http://www.opensource.org/licenses/mit-license.php
 *
 * Date: Mar 02 2009
 */
$.fn.editable = function(options){
  var defaults = {
    onEdit: null,
    onSubmit: null,
    onCancel: null,
    editClass: null,
    submit: null,
    cancel: null,
    type: 'text', //text, textarea or select
    submitBy: 'blur', //blur,change,dblclick,click
    editBy: 'click',
    options: null
}
  if(options=='disable')
    return this.unbind(this.data('editable.options').editBy,this.data('editable.options').toEditable);
  if(options=='enable')
    return this.bind(this.data('editable.options').editBy,this.data('editable.options').toEditable);
  if(options=='destroy')
    return  this.unbind(this.data('editable.options').editBy,this.data('editable.options').toEditable)
          .data('editable.previous',null)
          .data('editable.current',null)
          .data('editable.options',null);

  var options = $.extend(defaults, options);

  options.toEditable = function(){
    $this = $(this);
    $this.data('editable.current',$this.html());
    opts = $this.data('editable.options');
    $.editableFactory[opts.type].toEditable($this.empty(),opts);
    // Configure events,styles for changed content
    $this.data('editable.previous',$this.data('editable.current'))
       .children()
         .focus()
         .addClass(opts.editClass);
    // Submit Event
    if(opts.submit){
      $('<button/>').appendTo($this)
            .html(opts.submit)
            .one('mouseup',function(){opts.toNonEditable($(this).parent(),true)});
}else
      $this.one(opts.submitBy,function(){opts.toNonEditable($(this),true)})
         .children()
           .one(opts.submitBy,function(){opts.toNonEditable($(this).parent(),true)});
    // Cancel Event
    if(opts.cancel)
      $('<button/>').appendTo($this)
            .html(opts.cancel)
            .one('mouseup',function(){opts.toNonEditable($(this).parent(),false)});
    // Call User Function
    if($.isFunction(opts.onEdit))
      opts.onEdit.apply(  $this,
                  [{
                    current:$this.data('editable.current'),
                    previous:$this.data('editable.previous')
}]
                );
}
  options.toNonEditable = function($this,change){
    opts = $this.data('editable.options');
    // Configure events,styles for changed content
    $this.one(opts.editBy,opts.toEditable)
       .data( 'editable.current',
            change
            ?$.editableFactory[opts.type].getValue($this,opts)
  :$this.data('editable.current')
          )
       .html(
            opts.type=='password'
               ?'*****'
  :$this.data('editable.current')
          );
    // Call User Function
    var func = null;
    if($.isFunction(opts.onSubmit)&&change==true)
      func = opts.onSubmit;
    else if($.isFunction(opts.onCancel)&&change==false)
      func = opts.onCancel;
    if(func!=null)
      func.apply($this,
            [{
              current:$this.data('editable.current'),
              previous:$this.data('editable.previous')
}]
          );
}
  this.data('editable.options',options);
  return  this.one(options.editBy,options.toEditable);
}
$.editableFactory = {
  'text': {
    toEditable: function($this,options){
      $('<input/>').appendTo($this)
             .val($this.data('editable.current'));
},
    getValue: function($this,options){
      return $this.children().val();
}
},
  'password': {
    toEditable: function($this,options){
      $this.data('editable.current',$this.data('editable.password'));
      $this.data('editable.previous',$this.data('editable.password'));
      $('<input type="password"/>').appendTo($this)
                     .val($this.data('editable.current'));
},
    getValue: function($this,options){
      $this.data('editable.password',$this.children().val());
      return $this.children().val();
}
},
  'textarea': {
    toEditable: function($this,options){
      $('<textarea/>').appendTo($this)
              .val($this.data('editable.current'));
},
    getValue: function($this,options){
      return $this.children().val();
}
},
  'select': {
    toEditable: function($this,options){
      $select = $('<select/>').appendTo($this);
      $.each( options.options,
          function(key,value){
            $('<option/>').appendTo($select)
                  .html(value)
                  .attr('value',key);
}
           )
      $select.children().each(
        function(){
          var opt = $(this);
          if(opt.text()==$this.data('editable.current'))
            return opt.attr('selected', 'selected').text();
}
      )
},
    getValue: function($this,options){
      var item = null;
      $('select', $this).children().each(
        function(){
          if($(this).attr('selected'))
            return item = $(this).text();
}
      )
      return item;
}
}
}
})(jQuery);
;/*!
 * jQuery Form Plugin
 * version: 2.43 (12-MAR-2010)
 * @requires jQuery v1.3.2 or later
 *
 * Examples and documentation at: http://malsup.com/jquery/form/
 * Dual licensed under the MIT and GPL licenses:
 *   http://www.opensource.org/licenses/mit-license.php
 *   http://www.gnu.org/licenses/gpl.html
 */
;(function($) {

/*
	Usage Note:
	-----------
	Do not use both ajaxSubmit and ajaxForm on the same form.  These
	functions are intended to be exclusive.  Use ajaxSubmit if you want
	to bind your own submit handler to the form.  For example,

	$(document).ready(function() {
		$('#myForm').bind('submit', function() {
			$(this).ajaxSubmit({
				target: '#output'
			});
			return false; // <-- important!
		});
	});

	Use ajaxForm when you want the plugin to manage all the event binding
	for you.  For example,

	$(document).ready(function() {
		$('#myForm').ajaxForm({
			target: '#output'
		});
	});

	When using ajaxForm, the ajaxSubmit function will be invoked for you
	at the appropriate time.
*/

/**
 * ajaxSubmit() provides a mechanism for immediately submitting
 * an HTML form using AJAX.
 */
$.fn.ajaxSubmit = function(options) {
	// fast fail if nothing selected (http://dev.jquery.com/ticket/2752)
	if (!this.length) {
		log('ajaxSubmit: skipping submit process - no element selected');
		return this;
	}

	if (typeof options == 'function')
		options = { success: options };

	var url = $.trim(this.attr('action'));
	if (url) {
		// clean url (don't include hash vaue)
		url = (url.match(/^([^#]+)/)||[])[1];
   	}
   	url = url || window.location.href || '';

	options = $.extend({
		url:  url,
		type: this.attr('method') || 'GET',
		iframeSrc: /^https/i.test(window.location.href || '') ? 'javascript:false' : 'about:blank'
	}, options || {});

	// hook for manipulating the form data before it is extracted;
	// convenient for use with rich editors like tinyMCE or FCKEditor
	var veto = {};
	this.trigger('form-pre-serialize', [this, options, veto]);
	if (veto.veto) {
		log('ajaxSubmit: submit vetoed via form-pre-serialize trigger');
		return this;
	}

	// provide opportunity to alter form data before it is serialized
	if (options.beforeSerialize && options.beforeSerialize(this, options) === false) {
		log('ajaxSubmit: submit aborted via beforeSerialize callback');
		return this;
	}

	var a = this.formToArray(options.semantic);
	if (options.data) {
		options.extraData = options.data;
		for (var n in options.data) {
		  if(options.data[n] instanceof Array) {
			for (var k in options.data[n])
			  a.push( { name: n, value: options.data[n][k] } );
		  }
		  else
			 a.push( { name: n, value: options.data[n] } );
		}
	}

	// give pre-submit callback an opportunity to abort the submit
	if (options.beforeSubmit && options.beforeSubmit(a, this, options) === false) {
		log('ajaxSubmit: submit aborted via beforeSubmit callback');
		return this;
	}

	// fire vetoable 'validate' event
	this.trigger('form-submit-validate', [a, this, options, veto]);
	if (veto.veto) {
		log('ajaxSubmit: submit vetoed via form-submit-validate trigger');
		return this;
	}

	var q = $.param(a);

	if (options.type.toUpperCase() == 'GET') {
		options.url += (options.url.indexOf('?') >= 0 ? '&' : '?') + q;
		options.data = null;  // data is null for 'get'
	}
	else
		options.data = q; // data is the query string for 'post'

	var $form = this, callbacks = [];
	if (options.resetForm) callbacks.push(function() { $form.resetForm(); });
	if (options.clearForm) callbacks.push(function() { $form.clearForm(); });

	// perform a load on the target only if dataType is not provided
	if (!options.dataType && options.target) {
		var oldSuccess = options.success || function(){};
		callbacks.push(function(data) {
			var fn = options.replaceTarget ? 'replaceWith' : 'html';
			$(options.target)[fn](data).each(oldSuccess, arguments);
		});
	}
	else if (options.success)
		callbacks.push(options.success);

	options.success = function(data, status, xhr) { // jQuery 1.4+ passes xhr as 3rd arg
		for (var i=0, max=callbacks.length; i < max; i++)
			callbacks[i].apply(options, [data, status, xhr || $form, $form]);
	};

	// are there files to upload?
	var files = $('input:file', this).fieldValue();
	var found = false;
	for (var j=0; j < files.length; j++)
		if (files[j])
			found = true;

	var multipart = false;
//	var mp = 'multipart/form-data';
//	multipart = ($form.attr('enctype') == mp || $form.attr('encoding') == mp);

	// options.iframe allows user to force iframe mode
	// 06-NOV-09: now defaulting to iframe mode if file input is detected
   if ((files.length && options.iframe !== false) || options.iframe || found || multipart) {
	   // hack to fix Safari hang (thanks to Tim Molendijk for this)
	   // see:  http://groups.google.com/group/jquery-dev/browse_thread/thread/36395b7ab510dd5d
	   if (options.closeKeepAlive)
		   $.get(options.closeKeepAlive, fileUpload);
	   else
		   fileUpload();
	   }
   else
	   $.ajax(options);

	// fire 'notify' event
	this.trigger('form-submit-notify', [this, options]);
	return this;


	// private function for handling file uploads (hat tip to YAHOO!)
	function fileUpload() {
		var form = $form[0];

		if ($(':input[name=submit]', form).length) {
			alert('Error: Form elements must not be named "submit".');
			return;
		}

		var opts = $.extend({}, $.ajaxSettings, options);
		var s = $.extend(true, {}, $.extend(true, {}, $.ajaxSettings), opts);

		var id = 'jqFormIO' + (new Date().getTime());
		var $io = $('<iframe id="' + id + '" name="' + id + '" src="'+ opts.iframeSrc +'" onload="(jQuery(this).data(\'form-plugin-onload\'))()" />');
		var io = $io[0];

		$io.css({ position: 'absolute', top: '-1000px', left: '-1000px' });

		var xhr = { // mock object
			aborted: 0,
			responseText: null,
			responseXML: null,
			status: 0,
			statusText: 'n/a',
			getAllResponseHeaders: function() {},
			getResponseHeader: function() {},
			setRequestHeader: function() {},
			abort: function() {
				this.aborted = 1;
				$io.attr('src', opts.iframeSrc); // abort op in progress
			}
		};

		var g = opts.global;
		// trigger ajax global events so that activity/block indicators work like normal
		if (g && ! $.active++) $.event.trigger("ajaxStart");
		if (g) $.event.trigger("ajaxSend", [xhr, opts]);

		if (s.beforeSend && s.beforeSend(xhr, s) === false) {
			s.global && $.active--;
			return;
		}
		if (xhr.aborted)
			return;

		var cbInvoked = false;
		var timedOut = 0;

		// add submitting element to data if we know it
		var sub = form.clk;
		if (sub) {
			var n = sub.name;
			if (n && !sub.disabled) {
				opts.extraData = opts.extraData || {};
				opts.extraData[n] = sub.value;
				if (sub.type == "image") {
					opts.extraData[n+'.x'] = form.clk_x;
					opts.extraData[n+'.y'] = form.clk_y;
				}
			}
		}

		// take a breath so that pending repaints get some cpu time before the upload starts
		function doSubmit() {
			// make sure form attrs are set
			var t = $form.attr('target'), a = $form.attr('action');

			// update form attrs in IE friendly way
			form.setAttribute('target',id);
			if (form.getAttribute('method') != 'POST')
				form.setAttribute('method', 'POST');
			if (form.getAttribute('action') != opts.url)
				form.setAttribute('action', opts.url);

			// ie borks in some cases when setting encoding
			if (! opts.skipEncodingOverride) {
				$form.attr({
					encoding: 'multipart/form-data',
					enctype:  'multipart/form-data'
				});
			}

			// support timout
			if (opts.timeout)
				setTimeout(function() { timedOut = true; cb(); }, opts.timeout);

			// add "extra" data to form if provided in options
			var extraInputs = [];
			try {
				if (opts.extraData)
					for (var n in opts.extraData)
						extraInputs.push(
							$('<input type="hidden" name="'+n+'" value="'+opts.extraData[n]+'" />')
								.appendTo(form)[0]);

				// add iframe to doc and submit the form
				$io.appendTo('body');
				$io.data('form-plugin-onload', cb);
				form.submit();
			}
			finally {
				// reset attrs and remove "extra" input elements
				form.setAttribute('action',a);
				t ? form.setAttribute('target', t) : $form.removeAttr('target');
				$(extraInputs).remove();
			}
		};

		if (opts.forceSync)
			doSubmit();
		else
			setTimeout(doSubmit, 10); // this lets dom updates render
	
		var domCheckCount = 100;

		function cb() {
			if (cbInvoked) 
				return;

			var ok = true;
			try {
				if (timedOut) throw 'timeout';
				// extract the server response from the iframe
				var data, doc;

				doc = io.contentWindow ? io.contentWindow.document : io.contentDocument ? io.contentDocument : io.document;
				
				var isXml = opts.dataType == 'xml' || doc.XMLDocument || $.isXMLDoc(doc);
				log('isXml='+isXml);
				if (!isXml && (doc.body == null || doc.body.innerHTML == '')) {
				 	if (--domCheckCount) {
						// in some browsers (Opera) the iframe DOM is not always traversable when
						// the onload callback fires, so we loop a bit to accommodate
				 		log('requeing onLoad callback, DOM not available');
						setTimeout(cb, 250);
						return;
					}
					log('Could not access iframe DOM after 100 tries.');
					return;
				}

				log('response detected');
				cbInvoked = true;
				xhr.responseText = doc.body ? doc.body.innerHTML : null;
				xhr.responseXML = doc.XMLDocument ? doc.XMLDocument : doc;
				xhr.getResponseHeader = function(header){
					var headers = {'content-type': opts.dataType};
					return headers[header];
				};

				if (opts.dataType == 'json' || opts.dataType == 'script') {
					// see if user embedded response in textarea
					var ta = doc.getElementsByTagName('textarea')[0];
					if (ta)
						xhr.responseText = ta.value;
					else {
						// account for browsers injecting pre around json response
						var pre = doc.getElementsByTagName('pre')[0];
						if (pre)
							xhr.responseText = pre.innerHTML;
					}			  
				}
				else if (opts.dataType == 'xml' && !xhr.responseXML && xhr.responseText != null) {
					xhr.responseXML = toXml(xhr.responseText);
				}
				data = $.httpData(xhr, opts.dataType);
			}
			catch(e){
				log('error caught:',e);
				ok = false;
				xhr.error = e;
				$.handleError(opts, xhr, 'error', e);
			}

			// ordering of these callbacks/triggers is odd, but that's how $.ajax does it
			if (ok) {
				opts.success(data, 'success');
				if (g) $.event.trigger("ajaxSuccess", [xhr, opts]);
			}
			if (g) $.event.trigger("ajaxComplete", [xhr, opts]);
			if (g && ! --$.active) $.event.trigger("ajaxStop");
			if (opts.complete) opts.complete(xhr, ok ? 'success' : 'error');

			// clean up
			setTimeout(function() {
				$io.removeData('form-plugin-onload');
				$io.remove();
				xhr.responseXML = null;
			}, 100);
		};

		function toXml(s, doc) {
			if (window.ActiveXObject) {
				doc = new ActiveXObject('Microsoft.XMLDOM');
				doc.async = 'false';
				doc.loadXML(s);
			}
			else
				doc = (new DOMParser()).parseFromString(s, 'text/xml');
			return (doc && doc.documentElement && doc.documentElement.tagName != 'parsererror') ? doc : null;
		};
	};
};

/**
 * ajaxForm() provides a mechanism for fully automating form submission.
 *
 * The advantages of using this method instead of ajaxSubmit() are:
 *
 * 1: This method will include coordinates for <input type="image" /> elements (if the element
 *	is used to submit the form).
 * 2. This method will include the submit element's name/value data (for the element that was
 *	used to submit the form).
 * 3. This method binds the submit() method to the form for you.
 *
 * The options argument for ajaxForm works exactly as it does for ajaxSubmit.  ajaxForm merely
 * passes the options argument along after properly binding events for submit elements and
 * the form itself.
 */
$.fn.ajaxForm = function(options) {
	return this.ajaxFormUnbind().bind('submit.form-plugin', function(e) {
		e.preventDefault();
		$(this).ajaxSubmit(options);
	}).bind('click.form-plugin', function(e) {
		var target = e.target;
		var $el = $(target);
		if (!($el.is(":submit,input:image"))) {
			// is this a child element of the submit el?  (ex: a span within a button)
			var t = $el.closest(':submit');
			if (t.length == 0)
				return;
			target = t[0];
		}
		var form = this;
		form.clk = target;
		if (target.type == 'image') {
			if (e.offsetX != undefined) {
				form.clk_x = e.offsetX;
				form.clk_y = e.offsetY;
			} else if (typeof $.fn.offset == 'function') { // try to use dimensions plugin
				var offset = $el.offset();
				form.clk_x = e.pageX - offset.left;
				form.clk_y = e.pageY - offset.top;
			} else {
				form.clk_x = e.pageX - target.offsetLeft;
				form.clk_y = e.pageY - target.offsetTop;
			}
		}
		// clear form vars
		setTimeout(function() { form.clk = form.clk_x = form.clk_y = null; }, 100);
	});
};

// ajaxFormUnbind unbinds the event handlers that were bound by ajaxForm
$.fn.ajaxFormUnbind = function() {
	return this.unbind('submit.form-plugin click.form-plugin');
};

/**
 * formToArray() gathers form element data into an array of objects that can
 * be passed to any of the following ajax functions: $.get, $.post, or load.
 * Each object in the array has both a 'name' and 'value' property.  An example of
 * an array for a simple login form might be:
 *
 * [ { name: 'username', value: 'jresig' }, { name: 'password', value: 'secret' } ]
 *
 * It is this array that is passed to pre-submit callback functions provided to the
 * ajaxSubmit() and ajaxForm() methods.
 */
$.fn.formToArray = function(semantic) {
	var a = [];
	if (this.length == 0) return a;

	var form = this[0];
	var els = semantic ? form.getElementsByTagName('*') : form.elements;
	if (!els) return a;
	for(var i=0, max=els.length; i < max; i++) {
		var el = els[i];
		var n = el.name;
		if (!n) continue;

		if (semantic && form.clk && el.type == "image") {
			// handle image inputs on the fly when semantic == true
			if(!el.disabled && form.clk == el) {
				a.push({name: n, value: $(el).val()});
				a.push({name: n+'.x', value: form.clk_x}, {name: n+'.y', value: form.clk_y});
			}
			continue;
		}

		var v = $.fieldValue(el, true);
		if (v && v.constructor == Array) {
			for(var j=0, jmax=v.length; j < jmax; j++)
				a.push({name: n, value: v[j]});
		}
		else if (v !== null && typeof v != 'undefined')
			a.push({name: n, value: v});
	}

	if (!semantic && form.clk) {
		// input type=='image' are not found in elements array! handle it here
		var $input = $(form.clk), input = $input[0], n = input.name;
		if (n && !input.disabled && input.type == 'image') {
			a.push({name: n, value: $input.val()});
			a.push({name: n+'.x', value: form.clk_x}, {name: n+'.y', value: form.clk_y});
		}
	}
	return a;
};

/**
 * Serializes form data into a 'submittable' string. This method will return a string
 * in the format: name1=value1&amp;name2=value2
 */
$.fn.formSerialize = function(semantic) {
	//hand off to jQuery.param for proper encoding
	return $.param(this.formToArray(semantic));
};

/**
 * Serializes all field elements in the jQuery object into a query string.
 * This method will return a string in the format: name1=value1&amp;name2=value2
 */
$.fn.fieldSerialize = function(successful) {
	var a = [];
	this.each(function() {
		var n = this.name;
		if (!n) return;
		var v = $.fieldValue(this, successful);
		if (v && v.constructor == Array) {
			for (var i=0,max=v.length; i < max; i++)
				a.push({name: n, value: v[i]});
		}
		else if (v !== null && typeof v != 'undefined')
			a.push({name: this.name, value: v});
	});
	//hand off to jQuery.param for proper encoding
	return $.param(a);
};

/**
 * Returns the value(s) of the element in the matched set.  For example, consider the following form:
 *
 *  <form><fieldset>
 *	  <input name="A" type="text" />
 *	  <input name="A" type="text" />
 *	  <input name="B" type="checkbox" value="B1" />
 *	  <input name="B" type="checkbox" value="B2"/>
 *	  <input name="C" type="radio" value="C1" />
 *	  <input name="C" type="radio" value="C2" />
 *  </fieldset></form>
 *
 *  var v = $(':text').fieldValue();
 *  // if no values are entered into the text inputs
 *  v == ['','']
 *  // if values entered into the text inputs are 'foo' and 'bar'
 *  v == ['foo','bar']
 *
 *  var v = $(':checkbox').fieldValue();
 *  // if neither checkbox is checked
 *  v === undefined
 *  // if both checkboxes are checked
 *  v == ['B1', 'B2']
 *
 *  var v = $(':radio').fieldValue();
 *  // if neither radio is checked
 *  v === undefined
 *  // if first radio is checked
 *  v == ['C1']
 *
 * The successful argument controls whether or not the field element must be 'successful'
 * (per http://www.w3.org/TR/html4/interact/forms.html#successful-controls).
 * The default value of the successful argument is true.  If this value is false the value(s)
 * for each element is returned.
 *
 * Note: This method *always* returns an array.  If no valid value can be determined the
 *	   array will be empty, otherwise it will contain one or more values.
 */
$.fn.fieldValue = function(successful) {
	for (var val=[], i=0, max=this.length; i < max; i++) {
		var el = this[i];
		var v = $.fieldValue(el, successful);
		if (v === null || typeof v == 'undefined' || (v.constructor == Array && !v.length))
			continue;
		v.constructor == Array ? $.merge(val, v) : val.push(v);
	}
	return val;
};

/**
 * Returns the value of the field element.
 */
$.fieldValue = function(el, successful) {
	var n = el.name, t = el.type, tag = el.tagName.toLowerCase();
	if (typeof successful == 'undefined') successful = true;

	if (successful && (!n || el.disabled || t == 'reset' || t == 'button' ||
		(t == 'checkbox' || t == 'radio') && !el.checked ||
		(t == 'submit' || t == 'image') && el.form && el.form.clk != el ||
		tag == 'select' && el.selectedIndex == -1))
			return null;

	if (tag == 'select') {
		var index = el.selectedIndex;
		if (index < 0) return null;
		var a = [], ops = el.options;
		var one = (t == 'select-one');
		var max = (one ? index+1 : ops.length);
		for(var i=(one ? index : 0); i < max; i++) {
			var op = ops[i];
			if (op.selected) {
				var v = op.value;
				if (!v) // extra pain for IE...
					v = (op.attributes && op.attributes['value'] && !(op.attributes['value'].specified)) ? op.text : op.value;
				if (one) return v;
				a.push(v);
			}
		}
		return a;
	}
	return el.value;
};

/**
 * Clears the form data.  Takes the following actions on the form's input fields:
 *  - input text fields will have their 'value' property set to the empty string
 *  - select elements will have their 'selectedIndex' property set to -1
 *  - checkbox and radio inputs will have their 'checked' property set to false
 *  - inputs of type submit, button, reset, and hidden will *not* be effected
 *  - button elements will *not* be effected
 */
$.fn.clearForm = function() {
	return this.each(function() {
		$('input,select,textarea', this).clearFields();
	});
};

/**
 * Clears the selected form elements.
 */
$.fn.clearFields = $.fn.clearInputs = function() {
	return this.each(function() {
		var t = this.type, tag = this.tagName.toLowerCase();
		if (t == 'text' || t == 'password' || tag == 'textarea')
			this.value = '';
		else if (t == 'checkbox' || t == 'radio')
			this.checked = false;
		else if (tag == 'select')
			this.selectedIndex = -1;
	});
};

/**
 * Resets the form data.  Causes all form elements to be reset to their original value.
 */
$.fn.resetForm = function() {
	return this.each(function() {
		// guard against an input with the name of 'reset'
		// note that IE reports the reset function as an 'object'
		if (typeof this.reset == 'function' || (typeof this.reset == 'object' && !this.reset.nodeType))
			this.reset();
	});
};

/**
 * Enables or disables any matching elements.
 */
$.fn.enable = function(b) {
	if (b == undefined) b = true;
	return this.each(function() {
		this.disabled = !b;
	});
};

/**
 * Checks/unchecks any matching checkboxes or radio buttons and
 * selects/deselects and matching option elements.
 */
$.fn.selected = function(select) {
	if (select == undefined) select = true;
	return this.each(function() {
		var t = this.type;
		if (t == 'checkbox' || t == 'radio')
			this.checked = select;
		else if (this.tagName.toLowerCase() == 'option') {
			var $sel = $(this).parent('select');
			if (select && $sel[0] && $sel[0].type == 'select-one') {
				// deselect all other options
				$sel.find('option').selected(false);
			}
			this.selected = select;
		}
	});
};

// helper fn for console logging
// set $.fn.ajaxSubmit.debug to true to enable debug logging
function log() {
	if ($.fn.ajaxSubmit.debug) {
		var msg = '[jquery.form] ' + Array.prototype.join.call(arguments,'');
		if (window.console && window.console.log)
			window.console.log(msg);
		else if (window.opera && window.opera.postError)
			window.opera.postError(msg);
	}
};

})(jQuery);
;/*
 * imgAreaSelect jQuery plugin
 * version 1.0.0-rc.1
 *
 * Copyright (c) 2008-2013 Michal Wojciechowski (odyniec.net)
 *
 * Dual licensed under the MIT (http://opensource.org/licenses/MIT)
 * and GPL (http://opensource.org/licenses/GPL-2.0) licenses.
 *
 * http://odyniec.net/projects/imgareaselect/
 *
 */

(function($) {

/*
 * Math functions will be used extensively, so it's convenient to make a few
 * shortcuts
 */
var abs = Math.abs,
    max = Math.max,
    min = Math.min,
    round = Math.round;

/**
 * Create a new HTML div element
 *
 * @return A jQuery object representing the new element
 */
function div() {
    return $('<div/>');
}

/**
 * imgAreaSelect initialization
 *
 * @param img
 *            A HTML image element to attach the plugin to
 * @param options
 *            An options object
 */
$.imgAreaSelect = function (img, options) {
    var
        /* jQuery object representing the image */
        $img = $(img),

        /* Has the image finished loading? */
        imgLoaded,

        /* Plugin elements */

        /* Container box */
        $box = div(),
        /* Selection area */
        $area = div(),
        /* Border (four divs) */
        $border = div().add(div()).add(div()).add(div()),
        /* Outer area */
        $outer = div(),
        /* Handles (empty by default, initialized in setOptions()) */
        $handles = $([]),

        /* Image position (relative to viewport) */
        left, top,

        /* Image offset (as returned by .offset()) */
        imgOfs = { left: 0, top: 0 },

        /* Image dimensions (as returned by .width() and .height()) */
        imgWidth, imgHeight,

        /*
         * jQuery object representing the parent element that the plugin
         * elements are appended to
         */
        $parent,

        /* Parent element offset (as returned by .offset()) */
        parOfs = { left: 0, top: 0 },

        /* Base z-index for plugin elements */
        zIndex = 0,

        /* Plugin elements position */
        position = 'absolute',

        /* X/Y coordinates of the starting point for move/resize operations */
        startX, startY,

        /*
         * Distance between the mouse cursor (or touch point) and selection area
         * edges (when resizing)
         */
        edgeX, edgeY,

        /* Horizontal and vertical scaling factors */
        scaleX, scaleY,

        /* Current resize mode ("nw", "se", etc.) */
        resize,

        /* Selection area constraints */
        minWidth, minHeight, maxWidth, maxHeight,

        /* Aspect ratio to maintain (floating point number) */
        aspectRatio,

        /* Are the plugin elements currently displayed? */
        shown,

        /* Current selection (relative to parent element) */
        x1, y1, x2, y2,

        /* Current selection (relative to scaled image) */
        selection = { x1: 0, y1: 0, x2: 0, y2: 0, width: 0, height: 0 },

        /* User agent */
        ua = navigator.userAgent,

        /* Is the user performing a touch action? */
        touch,

        /* Various helper variables used throughout the code */
        $p, d, i, o, w, h, adjusted;

    /*
     * Translate selection coordinates (relative to scaled image) to viewport
     * coordinates (relative to parent element)
     */

    /**
     * Translate selection X to viewport X
     *
     * @param x
     *            Selection X
     * @return Viewport X
     */
    function viewX(x) {
        return x + imgOfs.left - parOfs.left;
    }

    /**
     * Translate selection Y to viewport Y
     *
     * @param y
     *            Selection Y
     * @return Viewport Y
     */
    function viewY(y) {
        return y + imgOfs.top - parOfs.top;
    }

    /*
     * Translate viewport coordinates to selection coordinates
     */

    /**
     * Translate viewport X to selection X
     *
     * @param x
     *            Viewport X
     * @return Selection X
     */
    function selX(x) {
        return x - imgOfs.left + parOfs.left;
    }

    /**
     * Translate viewport Y to selection Y
     *
     * @param y
     *            Viewport Y
     * @return Selection Y
     */
    function selY(y) {
        return y - imgOfs.top + parOfs.top;
    }

    /*
     * Translate event coordinates (relative to document) to viewport
     * coordinates
     */

    /**
     * Get event X and translate it to viewport X
     *
     * @param event
     *            The event object
     * @return Viewport X
     */
    function evX(event) {
        var coords = touchCoords(event) || event, x;

        if (x = parseInt(coords.pageX))
            return x - parOfs.left;
    }

    /**
     * Get event Y and translate it to viewport Y
     *
     * @param event
     *            The event object
     * @return Viewport Y
     */
    function evY(event) {
        var coords = touchCoords(event) || event, y;

        if (y = parseInt(coords.pageY))
            return y - parOfs.top;
    }

    /**
     * Get the first touch object in an event
     *
     * @param event
     *            The event object
     * @return The first touch object found in the event object, or false if
     *         none are found
     */
    function touchCoords(event) {
        var oev = event.originalEvent || {};

        return oev.touches && oev.touches.length ? oev.touches[0] : false;
    }

    /**
     * Get the current selection
     *
     * @param noScale
     *            If set to <code>true</code>, scaling is not applied to the
     *            returned selection
     * @return Selection object
     */
    function getSelection(noScale) {
        var sx = noScale || scaleX, sy = noScale || scaleY;

        return { x1: round(selection.x1 * sx),
            y1: round(selection.y1 * sy),
            x2: round(selection.x2 * sx) - 1,
            y2: round(selection.y2 * sy) - 1,
            width: round(selection.x2 * sx) - round(selection.x1 * sx),
            height: round(selection.y2 * sy) - round(selection.y1 * sy) };
    }

    /**
     * Set the current selection
     *
     * @param x1
     *            X coordinate of the upper left corner of the selection area
     * @param y1
     *            Y coordinate of the upper left corner of the selection area
     * @param x2
     *            X coordinate of the lower right corner of the selection area
     * @param y2
     *            Y coordinate of the lower right corner of the selection area
     * @param noScale
     *            If set to <code>true</code>, scaling is not applied to the
     *            new selection
     */
    function setSelection(x1, y1, x2, y2, noScale) {
        var sx = noScale || scaleX, sy = noScale || scaleY;

        selection = {
            x1: round(x1 / sx || 0),
            y1: round(y1 / sy || 0),
            x2: round(++x2 / sx || 0),
            y2: round(++y2 / sy || 0)
        };

        selection.width = selection.x2 - selection.x1;
        selection.height = selection.y2 - selection.y1;
    }

    /**
     * Recalculate image and parent offsets
     */
    function adjust() {
        /*
         * Do not adjust if image has not yet loaded or if width is not a
         * positive number. The latter might happen when imgAreaSelect is put
         * on a parent element which is then hidden.
         */
        if (!imgLoaded || !$img.width())
            return;

        /*
         * Get image offset. The .offset() method returns float values, so they
         * need to be rounded.
         */
        imgOfs = { left: round($img.offset().left), top: round($img.offset().top) };

        /* Get image dimensions */
        imgWidth = $img.innerWidth();
        imgHeight = $img.innerHeight();

        imgOfs.top += ($img.outerHeight() - imgHeight) >> 1;
        imgOfs.left += ($img.outerWidth() - imgWidth) >> 1;

        /* Set minimum and maximum selection area dimensions */
        minWidth = round(options.minWidth / scaleX) || 0;
        minHeight = round(options.minHeight / scaleY) || 0;
        maxWidth = round(min(options.maxWidth / scaleX || 1<<24, imgWidth));
        maxHeight = round(min(options.maxHeight / scaleY || 1<<24, imgHeight));

        /* Determine parent element offset */
        parOfs = position == 'fixed' ?
            /* Plugin elements position set to fixed */
            { left: $(document).scrollLeft(), top: $(document).scrollTop() } :
            /* Check parent element position */
            /static|^$/.test($parent.css('position')) ?
                /* Static */
                { left: 0, top: 0 } :
                /* Absolute or relative */
                { left: round($parent.offset().left) - $parent.scrollLeft(),
                    top: round($parent.offset().top) - $parent.scrollTop() };

        left = viewX(0);
        top = viewY(0);

        /*
         * Check if selection area is within image boundaries, adjust if
         * necessary
         */
        if (selection.x2 > imgWidth || selection.y2 > imgHeight)
            fixAreaCoords();
    }

    /**
     * Update plugin elements
     *
     * @param resetKeyPress
     *            If set to <code>false</code>, this instance's keypress
     *            event handler is not activated
     */
    function update(resetKeyPress) {
        /* If plugin elements are hidden, do nothing */
        if (!shown) return;

        /*
         * Set the position and size of the container box and the selection area
         * inside it
         */
        $box.css({ left: viewX(selection.x1), top: viewY(selection.y1) })
            .add($area).width(w = selection.width).height(h = selection.height);

        /*
         * Reset the position of selection area, borders, and handles (IE6/IE7
         * position them incorrectly if we don't do this)
         */
        $area.add($border).add($handles).css({ left: 0, top: 0 });

        /* Set border dimensions */
        $border.add($outer)
            .width(max(w - $border.outerWidth() + $border.innerWidth(), 0))
            .height(max(h - $border.outerHeight() + $border.innerHeight(), 0));

        /* Set the dimensions and border styles of the outer area */
        $outer.css({
            left: left,
            top: top,
            width: w,
            height: h,
            borderStyle: 'solid',
            borderWidth: selection.y1 + 'px ' +
                (imgWidth - selection.x2) + 'px ' + (imgHeight - selection.y2) +
                'px ' + selection.x1 + 'px'
        });

        w -= $handles.outerWidth();
        h -= $handles.outerHeight();

        /* Arrange handles */
        switch ($handles.length) {
        case 8:
            $($handles[4]).css({ left: w >> 1 });
            $($handles[5]).css({ left: w, top: h >> 1 });
            $($handles[6]).css({ left: w >> 1, top: h });
            $($handles[7]).css({ top: h >> 1 });
        case 4:
            $handles.slice(1,3).css({ left: w });
            $handles.slice(2,4).css({ top: h });
        }

        if (resetKeyPress !== false) {
            /*
             * Need to reset the document keypress event handler -- unbind the
             * current handler
             */
            if ($.imgAreaSelect.keyPress != docKeyPress)
                $(document).unbind($.imgAreaSelect.keyPress,
                    $.imgAreaSelect.onKeyPress);

            if (options.keys)
                /*
                 * Set the document keypress event handler to this instance's
                 * docKeyPress() function
                 */
                $(document)[$.imgAreaSelect.keyPress](
                    $.imgAreaSelect.onKeyPress = docKeyPress);
        }
    }

    /**
     * Do the complete update sequence: recalculate offsets, update the
     * elements, and set the correct values of x1, y1, x2, and y2.
     *
     * @param resetKeyPress
     *            If set to <code>false</code>, this instance's keypress
     *            event handler is not activated
     */
    function doUpdate(resetKeyPress) {
        adjust();
        update(resetKeyPress);
        x1 = viewX(selection.x1); y1 = viewY(selection.y1);
        x2 = viewX(selection.x2); y2 = viewY(selection.y2);
    }

    /**
     * Hide or fade out an element (or multiple elements)
     *
     * @param $elem
     *            A jQuery object containing the element(s) to hide/fade out
     * @param fn
     *            Callback function to be called when fadeOut() completes
     */
    function hide($elem, fn) {
        options.fadeDuration ? $elem.fadeOut(options.fadeDuration, fn) : $elem.hide();
    }

    /**
     * Check if a touch event is expected and if the passed event object really
     * is a touch event
     *
     * @param event
     *            The event object
     * @return True if the event handler should be interrupted
     */
    function breakWhenNoTouch(event) {
        return touch && !/^touch/.test(event.type);
    }

    /**
     * Check event coordinates to determine if the selection area should be
     * resized or moved
     *
     * @param event
     *            The event object
     */
    function checkResize(event) {
        var x = selX(evX(event)) - selection.x1,
            y = selY(evY(event)) - selection.y1;

        /* Clear the resize mode */
        resize = '';

        if (options.resizable) {
            /*
             * Check if the mouse pointer is over the resize margin area and set
             * the resize mode accordingly
             */
            if (y <= options.resizeMargin)
                resize = 'n';
            else if (y >= selection.height - options.resizeMargin)
                resize = 's';
            if (x <= options.resizeMargin)
                resize += 'w';
            else if (x >= selection.width - options.resizeMargin)
                resize += 'e';
        }

        $box.css('cursor', resize ? resize + '-resize' :
            options.movable ? 'move' : '');
    }

    /**
     * Selection area mousemove event handler
     *
     * @param event
     *            The event object
     */
    function areaMouseMove(event) {
        if (breakWhenNoTouch(event))
            return;

        if (!adjusted) {
            adjust();
            adjusted = true;

            $box.one('mouseout', function () { adjusted = false; });
        }

        checkResize(event);
    }

    /**
     * Document mouseup event handler
     *
     * @param event
     *            The event object
     */
    function docMouseUp(event) {
        /* Reset touch action flag */
        touch = false;
        /* Set back the default cursor */
        $('body').css('cursor', '');
        /*
         * If autoHide is enabled, or if the selection has zero width/height,
         * hide the selection and the outer area
         */
        if (options.autoHide || selection.width * selection.height == 0)
            hide($box.add($outer), function () { $(this).hide(); });

        $(document).off('mousemove touchmove', selectingMouseMove);
        $box.on('mousemove touchmove', areaMouseMove);

        /*
         * If docMouseUp() is called by areaMouseDown() to work around the issue
         * with Android Chrome, there is no event object, and we don't want to
         * run the onSelectEnd callback function.
         */
        if (event)
            options.onSelectEnd(img, getSelection());
    }

    /**
     * Selection area mousedown event handler
     *
     * @param event
     *            The event object
     * @return false
     */
    function areaMouseDown(event) {
        if (event.type == 'mousedown' && event.which != 1) return false;

        if (event.type == 'touchstart') {
            /*
             * Android Chrome often does not produce a touchend event
             * (https://code.google.com/p/chromium/issues/detail?id=152913), so
             * if it appears that the touch flag is still set, we call the
             * mouseup/touchend event handler to clean up after the previous
             * touch action.
             */
            if (touch)
                docMouseUp();

            /* This is a start of a touch action */
            touch = true;

            /*
             * Normally, checkResize() is called by the mousemove event handler
             * triggered just before mousedown, but with a touch action there
             * is no mousemove, so we need to call it explicitly.
             */
            checkResize(event);
        }
        else
            adjust();

        if (resize) {
            /* Resize mode is in effect */

            /*
             * Set (x1, y1) to the fixed corner of the selection area, and (x2,
             * y2) to the corner that's being moved.
             */
            x1 = viewX(selection['x' + (1 + /w/.test(resize))]);
            y1 = viewY(selection['y' + (1 + /n/.test(resize))]);
            x2 = viewX(selection['x' + (1 + !/w/.test(resize))]);
            y2 = viewY(selection['y' + (1 + !/n/.test(resize))]);

            edgeX = x2 - evX(event);
            edgeY = y2 - evY(event);

            $(document).on('mousemove touchmove', selectingMouseMove)
                .one('mouseup touchend', docMouseUp);
            $box.off('mousemove touchmove', areaMouseMove);
        }
        else if (options.movable) {
            startX = left + selection.x1 - evX(event);
            startY = top + selection.y1 - evY(event);

            $box.off('mousemove touchmove', areaMouseMove);

            $(document).on('mousemove touchmove', movingMouseMove)
                .one('mouseup touchend', function () {
                    touch = false;
                    options.onSelectEnd(img, getSelection());

                    $(document).off('mousemove touchmove', movingMouseMove);
                    $box.on('mousemove touchmove', areaMouseMove);
                });
        }
        else
            $img.mousedown(event);

        return false;
    }

    /**
     * Adjust the x2/y2 coordinates to maintain aspect ratio (if defined)
     *
     * @param xFirst
     *            If set to <code>true</code>, calculate x2 first. Otherwise,
     *            calculate y2 first.
     */
    function fixAspectRatio(xFirst) {
        if (aspectRatio)
            if (xFirst) {
                x2 = max(left, min(left + imgWidth,
                    x1 + abs(y2 - y1) * aspectRatio * (x2 > x1 || -1)));
                y2 = round(max(top, min(top + imgHeight,
                    y1 + abs(x2 - x1) / aspectRatio * (y2 > y1 || -1))));
                x2 = round(x2);
            }
            else {
                y2 = max(top, min(top + imgHeight,
                    y1 + abs(x2 - x1) / aspectRatio * (y2 > y1 || -1)));
                x2 = round(max(left, min(left + imgWidth,
                    x1 + abs(y2 - y1) * aspectRatio * (x2 > x1 || -1))));
                y2 = round(y2);
            }
    }

    /**
     * Check if the coordinates of the selection area are within the required
     * limits and conform to the aspect ratio; adjust if necessary
     */
    function fixAreaCoords() {
        /*
         * Make sure the top left corner of the selection area stays within
         * image boundaries (it might not if the image source was dynamically
         * changed).
         */
        x1 = min(x1, left + imgWidth);
        y1 = min(y1, top + imgHeight);

        if (abs(x2 - x1) < minWidth) {
            /* Selection width is smaller than minWidth */
            x2 = x1 - minWidth * (x2 < x1 || -1);

            if (x2 < left)
                x1 = left + minWidth;
            else if (x2 > left + imgWidth)
                x1 = left + imgWidth - minWidth;
        }

        if (abs(y2 - y1) < minHeight) {
            /* Selection height is smaller than minHeight */
            y2 = y1 - minHeight * (y2 < y1 || -1);

            if (y2 < top)
                y1 = top + minHeight;
            else if (y2 > top + imgHeight)
                y1 = top + imgHeight - minHeight;
        }

        x2 = max(left, min(x2, left + imgWidth));
        y2 = max(top, min(y2, top + imgHeight));

        fixAspectRatio(abs(x2 - x1) < abs(y2 - y1) * aspectRatio);

        if (abs(x2 - x1) > maxWidth) {
            /* Selection width is greater than maxWidth */
            x2 = x1 - maxWidth * (x2 < x1 || -1);
            fixAspectRatio();
        }

        if (abs(y2 - y1) > maxHeight) {
            /* Selection height is greater than maxHeight */
            y2 = y1 - maxHeight * (y2 < y1 || -1);
            fixAspectRatio(true);
        }

        selection = { x1: selX(min(x1, x2)), x2: selX(max(x1, x2)),
            y1: selY(min(y1, y2)), y2: selY(max(y1, y2)),
            width: abs(x2 - x1), height: abs(y2 - y1) };
    }

    /**
     * Resize the selection area respecting the minimum/maximum dimensions and
     * aspect ratio
     */
    function doResize() {
        fixAreaCoords();

        update();

        options.onSelectChange(img, getSelection());
    }

    /**
     * Mousemove event handler triggered when the user is selecting an area
     *
     * @param event
     *            The event object
     * @return false
     */
    function selectingMouseMove(event) {
        if (breakWhenNoTouch(event))
            return;

        fixAreaCoords();

        x2 = /w|e|^$/.test(resize) || aspectRatio ? evX(event) + edgeX : viewX(selection.x2);
        y2 = /n|s|^$/.test(resize) || aspectRatio ? evY(event) + edgeY : viewY(selection.y2);

        doResize();

        return false;
    }

    /**
     * Move the selection area
     *
     * @param newX1
     *            New viewport X1
     * @param newY1
     *            New viewport Y1
     */
    function doMove(newX1, newY1) {
        x2 = (x1 = newX1) + selection.width;
        y2 = (y1 = newY1) + selection.height;

        $.extend(selection, { x1: selX(x1), y1: selY(y1), x2: selX(x2),
            y2: selY(y2) });

        update();

        options.onSelectChange(img, getSelection());
    }

    /**
     * Mousemove event handler triggered when the selection area is being moved
     *
     * @param event
     *            The event object
     * @return false
     */
    function movingMouseMove(event) {
        if (breakWhenNoTouch(event))
            return;

        x1 = max(left, min(startX + evX(event), left + imgWidth - selection.width));
        y1 = max(top, min(startY + evY(event), top + imgHeight - selection.height));

        doMove(x1, y1);

        event.preventDefault();
        return false;
    }

    /**
     * Start selection
     */
    function startSelection() {
        $(document).off('mousemove touchmove', startSelection);
        adjust();

        x2 = x1;
        y2 = y1;
        doResize();

        resize = '';

        if (!$outer.is(':visible'))
            /* Show the plugin elements */
            $box.add($outer).hide().fadeIn(options.fadeDuration||0)

        shown = true;

        $(document).off('mouseup touchend', cancelSelection)
            .on('mousemove touchmove', selectingMouseMove)
            .one('mouseup touchend', docMouseUp);
        $box.off('mousemove touchmove', areaMouseMove);

        options.onSelectStart(img, getSelection());
    }

    /**
     * Cancel selection
     */
    function cancelSelection() {
        $(document).off('mousemove touchmove', startSelection)
            .off('mouseup touchend', cancelSelection);
        hide($box.add($outer));

        setSelection(selX(x1), selY(y1), selX(x1), selY(y1));

        /* If this is an API call, callback functions should not be triggered */
        if (!(this instanceof $.imgAreaSelect)) {
            options.onSelectChange(img, getSelection());
            options.onSelectEnd(img, getSelection());
        }
    }

    /**
     * Image mousedown event handler
     *
     * @param event
     *            The event object
     * @return false
     */
    function imgMouseDown(event) {
        /* Ignore the event if animation is in progress */
        if (event.type == 'mousedown' && event.which != 1 ||
                $outer.is(':animated'))
            return false;

        /* If it's a touch action, set the touch flag */
        touch = event.type == 'touchstart';

        adjust();
        startX = x1 = evX(event);
        startY = y1 = evY(event);
        edgeX = edgeY = 0;

        /* Selection will start when the mouse is moved */
        $(document).on({ 'mousemove touchmove': startSelection,
            'mouseup touchend': cancelSelection });

        return false;
    }

    /**
     * Window resize event handler
     */
    function windowResize() {
        doUpdate(false);
    }

    /**
     * Image load event handler. This is the final part of the initialization
     * process.
     */
    function imgLoad() {
        imgLoaded = true;

        /* Set options */
        setOptions(options = $.extend({
            classPrefix: 'imgareaselect',
            movable: true,
            parent: 'body',
            resizable: true,
            resizeMargin: 10,
            onInit: function () {},
            onSelectStart: function () {},
            onSelectChange: function () {},
            onSelectEnd: function () {}
        }, options));

        if (options.show) {
            shown = true;
            adjust();
            update();
            $box.add($outer).hide().fadeIn(options.fadeDuration||0)
        }

        /*
         * Call the onInit callback. The setTimeout() call is used to ensure
         * that the plugin has been fully initialized and the object instance is
         * available (so that it can be obtained in the callback).
         */
        setTimeout(function () { options.onInit(img, getSelection()); }, 0);
    }

    /**
     * Document keypress event handler
     *
     * @param event
     *            The event object
     * @return false
     */
    var docKeyPress = function(event) {
        var k = options.keys, d, t, key = event.keyCode;

        d = !isNaN(k.alt) && (event.altKey || event.originalEvent.altKey) ? k.alt :
            !isNaN(k.ctrl) && event.ctrlKey ? k.ctrl :
            !isNaN(k.shift) && event.shiftKey ? k.shift :
            !isNaN(k.arrows) ? k.arrows : 10;

        if (k.arrows == 'resize' || (k.shift == 'resize' && event.shiftKey) ||
            (k.ctrl == 'resize' && event.ctrlKey) ||
            (k.alt == 'resize' && (event.altKey || event.originalEvent.altKey)))
        {
            /* Resize selection */

            switch (key) {
            case 37:
                /* Left */
                d = -d;
            case 39:
                /* Right */
                t = max(x1, x2);
                x1 = min(x1, x2);
                x2 = max(t + d, x1);
                fixAspectRatio();
                break;
            case 38:
                /* Up */
                d = -d;
            case 40:
                /* Down */
                t = max(y1, y2);
                y1 = min(y1, y2);
                y2 = max(t + d, y1);
                fixAspectRatio(true);
                break;
            default:
                return;
            }

            doResize();
        }
        else {
            /* Move selection */

            x1 = min(x1, x2);
            y1 = min(y1, y2);

            switch (key) {
            case 37:
                /* Left */
                doMove(max(x1 - d, left), y1);
                break;
            case 38:
                /* Up */
                doMove(x1, max(y1 - d, top));
                break;
            case 39:
                /* Right */
                doMove(x1 + min(d, imgWidth - selX(x2)), y1);
                break;
            case 40:
                /* Down */
                doMove(x1, y1 + min(d, imgHeight - selY(y2)));
                break;
            default:
                return;
            }
        }

        return false;
    };

    /**
     * Set plugin options
     *
     * @param newOptions
     *            The new options object
     */
    function setOptions(newOptions) {
        if (newOptions.parent)
            ($parent = $(newOptions.parent)).append($box).append($outer);

        /* Merge the new options with the existing ones */
        $.extend(options, newOptions);

        adjust();

        if (newOptions.handles != null) {
            /* Recreate selection area handles */
            $handles.remove();
            $handles = $([]);

            i = newOptions.handles ? newOptions.handles == 'corners' ? 4 : 8 : 0;

            while (i--)
                $handles = $handles.add(div());

            /* Add a class to handles and set the CSS properties */
            $handles.addClass(options.classPrefix + '-handle').css({
                position: 'absolute',
                /*
                 * The font-size property needs to be set to zero, otherwise
                 * Internet Explorer makes the handles too large
                 */
                fontSize: 0,
                zIndex: zIndex + 1 || 1
            });

            /*
             * If handle width/height has not been set with CSS rules, set the
             * default 5px
             */
            if (!parseInt($handles.css('width')) >= 0)
                $handles.width(5).height(5);
        }

        /* Calculate scale factors */
        scaleX = options.imageWidth / imgWidth || 1;
        scaleY = options.imageHeight / imgHeight || 1;

        /* Set selection */
        if (newOptions.x1 != null) {
            setSelection(newOptions.x1, newOptions.y1, newOptions.x2,
                newOptions.y2);
            newOptions.show = !newOptions.hide;
        }

        if (newOptions.keys)
            /* Enable keyboard support */
            options.keys = $.extend({ shift: 1, ctrl: 'resize' },
                newOptions.keys);

        /* Add classes to plugin elements */
        $outer.addClass(options.classPrefix + '-outer');
        $area.addClass(options.classPrefix + '-selection');
        for (i = 0; i++ < 4;)
            $($border[i-1]).addClass(options.classPrefix + '-border' + i);

        /* Append all the selection area elements to the container box */
        $box.append($area.add($border)).append($handles);

        if (msie) {
            if (o = ($outer.css('filter')||'').match(/opacity=(\d+)/))
                $outer.css('opacity', o[1]/100);
            if (o = ($border.css('filter')||'').match(/opacity=(\d+)/))
                $border.css('opacity', o[1]/100);
        }

        if (newOptions.hide)
            hide($box.add($outer));
        else if (newOptions.show && imgLoaded) {
            shown = true;
            $box.add($outer).fadeIn(options.fadeDuration||0)
            doUpdate();
        }

        /* Calculate the aspect ratio factor */
        aspectRatio = (d = (options.aspectRatio || '').split(/:/))[0] / d[1];

        $img.add($outer).off('mousedown touchstart', imgMouseDown);

        if (options.disable || options.enable === false) {
            /* Disable the plugin */
            $box.off({ 'mousemove touchmove': areaMouseMove,
                'mousedown touchstart': areaMouseDown });
            $(window).off('resize', windowResize);
        }
        else {
            if (options.enable || options.disable === false) {
                /* Enable the plugin */
                if (options.resizable || options.movable)
                    $box.on({ 'mousemove touchmove': areaMouseMove,
                        'mousedown touchstart': areaMouseDown });

                $(window).resize(windowResize);
            }

            if (!options.persistent)
                $img.add($outer).on('mousedown touchstart', imgMouseDown);
        }

        options.enable = options.disable = undefined;
    }

    /**
     * Remove plugin completely
     */
    this.remove = function () {
        /*
         * Call setOptions with { disable: true } to unbind the event handlers
         */
        setOptions({ disable: true });
        $box.add($outer).remove();
    };

    /*
     * Public API
     */

    /**
     * Get current options
     *
     * @return An object containing the set of options currently in use
     */
    this.getOptions = function () { return options; };

    /**
     * Set plugin options
     *
     * @param newOptions
     *            The new options object
     */
    this.setOptions = setOptions;

    /**
     * Get the current selection
     *
     * @param noScale
     *            If set to <code>true</code>, scaling is not applied to the
     *            returned selection
     * @return Selection object
     */
    this.getSelection = getSelection;

    /**
     * Set the current selection
     *
     * @param x1
     *            X coordinate of the upper left corner of the selection area
     * @param y1
     *            Y coordinate of the upper left corner of the selection area
     * @param x2
     *            X coordinate of the lower right corner of the selection area
     * @param y2
     *            Y coordinate of the lower right corner of the selection area
     * @param noScale
     *            If set to <code>true</code>, scaling is not applied to the
     *            new selection
     */
    this.setSelection = setSelection;

    /**
     * Cancel selection
     */
    this.cancelSelection = cancelSelection;

    /**
     * Update plugin elements
     *
     * @param resetKeyPress
     *            If set to <code>false</code>, this instance's keypress
     *            event handler is not activated
     */
    this.update = doUpdate;

    /* Do the dreaded browser detection */
    var msie = (/msie ([\w.]+)/i.exec(ua)||[])[1],
        safari = /webkit/i.test(ua) && !/chrome/i.test(ua);

    /*
     * Traverse the image's parent elements (up to <body>) and find the
     * highest z-index
     */
    $p = $img;

    while ($p.length) {
        zIndex = max(zIndex,
            !isNaN($p.css('z-index')) ? $p.css('z-index') : zIndex);
        /*
         * If the parent element is not set explicitly, check if any of the
         * ancestor elements has fixed position
         */
        if (!options.parent && $p.css('position') == 'fixed')
            position = 'fixed';

        $p = $p.parent(':not(body)');
    }

    /*
     * If z-index is given as an option, it overrides the one found by the
     * above loop
     */
    zIndex = options.zIndex || zIndex;

    /*
     * In MSIE and WebKit, we need to use the keydown event instead of keypress
     */
    $.imgAreaSelect.keyPress = msie || safari ? 'keydown' : 'keypress';

    $box.add($outer).hide().css({ position: position, overflow: 'hidden',
        zIndex: zIndex || '0' });
    $box.css({ zIndex: zIndex + 2 || 2 });
    $area.add($border).css({ position: 'absolute', fontSize: 0 });

    /*
     * If the image has been fully loaded, or if it is not really an image (eg.
     * a div), call imgLoad() immediately; otherwise, bind it to be called once
     * on image load event.
     */
    img.complete || img.readyState == 'complete' || !$img.is('img') ?
        imgLoad() : $img.one('load', imgLoad);

    /*
     * MSIE 9.0 doesn't always fire the image load event -- resetting the src
     * attribute seems to trigger it. The check is for version 7 and above to
     * accommodate for MSIE 9 running in compatibility mode.
     */
    if (!imgLoaded && msie && msie >= 7)
        img.src = img.src;
};

/**
 * Invoke imgAreaSelect on a jQuery object containing the image(s)
 *
 * @param options
 *            Options object
 * @return The jQuery object or a reference to imgAreaSelect instance (if the
 *         <code>instance</code> option was specified)
 */
$.fn.imgAreaSelect = function (options) {
    options = options || {};

    this.each(function () {
        /* Is there already an imgAreaSelect instance bound to this element? */
        if ($(this).data('imgAreaSelect')) {
            /* Yes there is -- is it supposed to be removed? */
            if (options.remove) {
                /* Remove the plugin */
                $(this).data('imgAreaSelect').remove();
                $(this).removeData('imgAreaSelect');
            }
            else
                /* Reset options */
                $(this).data('imgAreaSelect').setOptions(options);
        }
        else if (!options.remove) {
            /* No exising instance -- create a new one */

            /*
             * If neither the "enable" nor the "disable" option is present, add
             * "enable" as the default
             */
            if (options.enable === undefined && options.disable === undefined)
                options.enable = true;

            $(this).data('imgAreaSelect', new $.imgAreaSelect(this, options));
        }
    });

    if (options.instance)
        /*
         * Return the imgAreaSelect instance bound to the first element in the
         * set
         */
        return $(this).data('imgAreaSelect');

    return this;
};

})(jQuery);
;/*!
 * jquery.qtip. The jQuery tooltip plugin
 *
 * Copyright (c) 2009 Craig Thompson
 * http://craigsworks.com
 *
 * Licensed under MIT
 * http://www.opensource.org/licenses/mit-license.php
 *
 * Launch  : February 2009
 * Version : 1.0.0-rc3
 * Released: Tuesday 12th May, 2009 - 00:00
 * Debug: jquery.qtip.debug.js
 */
(function($)
{
   // Implementation
   $.fn.qtip = function(options, blanket)
   {
      var i, id, interfaces, opts, obj, command, config, api;

      // Return API / Interfaces if requested
      if(typeof options == 'string')
      {
         // Make sure API data exists if requested
         if(typeof $(this).data('qtip') !== 'object')
            $.fn.qtip.log.error.call(self, 1, $.fn.qtip.constants.NO_TOOLTIP_PRESENT, false);

         // Return requested object
         if(options == 'api')
            return $(this).data('qtip').interfaces[ $(this).data('qtip').current ];
         else if(options == 'interfaces')
            return $(this).data('qtip').interfaces;
      }

      // Validate provided options
      else
      {
         // Set null options object if no options are provided
         if(!options) options = {};

         // Sanitize option data
         if(typeof options.content !== 'object' || (options.content.jquery && options.content.length > 0)) options.content = { text: options.content };
         if(typeof options.content.title !== 'object') options.content.title = { text: options.content.title };
         if(typeof options.position !== 'object') options.position = { corner: options.position };
         if(typeof options.position.corner !== 'object') options.position.corner = { target: options.position.corner, tooltip: options.position.corner };
         if(typeof options.show !== 'object') options.show = { when: options.show };
         if(typeof options.show.when !== 'object') options.show.when = { event: options.show.when };
         if(typeof options.show.effect !== 'object') options.show.effect = { type: options.show.effect };
         if(typeof options.hide !== 'object') options.hide = { when: options.hide };
         if(typeof options.hide.when !== 'object') options.hide.when = { event: options.hide.when };
         if(typeof options.hide.effect !== 'object') options.hide.effect = { type: options.hide.effect };
         if(typeof options.style !== 'object') options.style = { name: options.style };
         options.style = sanitizeStyle(options.style);

         // Build main options object
         opts = $.extend(true, {}, $.fn.qtip.defaults, options);

         // Inherit all style properties into one syle object and include original options
         opts.style = buildStyle.call({ options: opts }, opts.style);
         opts.user = $.extend(true, {}, options);
      };

      // Iterate each matched element
      return $(this).each(function() // Return original elements as per jQuery guidelines
      {
         // Check for API commands
         if(typeof options == 'string')
         {
            command = options.toLowerCase();
            interfaces = $(this).qtip('interfaces');

            // Make sure API data exists$('.qtip').qtip('destroy')
            if(typeof interfaces == 'object')
            {
               // Check if API call is a BLANKET DESTROY command
               if(blanket === true && command == 'destroy')
                  while(interfaces.length > 0) interfaces[interfaces.length-1].destroy();

               // API call is not a BLANKET DESTROY command
               else
               {
                  // Check if supplied command effects this tooltip only (NOT BLANKET)
                  if(blanket !== true) interfaces = [ $(this).qtip('api') ];

                  // Execute command on chosen qTips
                  for(i = 0; i < interfaces.length; i++)
                  {
                     // Destroy command doesn't require tooltip to be rendered
                     if(command == 'destroy') interfaces[i].destroy();

                     // Only call API if tooltip is rendered and it wasn't a destroy call
                     else if(interfaces[i].status.rendered === true)
                     {
                        if(command == 'show') interfaces[i].show();
                        else if(command == 'hide') interfaces[i].hide();
                        else if(command == 'focus') interfaces[i].focus();
                        else if(command == 'disable') interfaces[i].disable(true);
                        else if(command == 'enable') interfaces[i].disable(false);
                     };
                  };
               };
            };
         }

         // No API commands, continue with qTip creation
         else
         {
            // Create unique configuration object
            config = $.extend(true, {}, opts);
            config.hide.effect.length = opts.hide.effect.length;
            config.show.effect.length = opts.show.effect.length;

            // Sanitize target options
            if(config.position.container === false) config.position.container = $(document.body);
            if(config.position.target === false) config.position.target = $(this);
            if(config.show.when.target === false) config.show.when.target = $(this);
            if(config.hide.when.target === false) config.hide.when.target = $(this);

            // Determine tooltip ID (Reuse array slots if possible)
            id = $.fn.qtip.interfaces.length;
            for(i = 0; i < id; i++)
            {
               if(typeof $.fn.qtip.interfaces[i] == 'undefined'){ id = i; break; };
            };

            // Instantiate the tooltip
            obj = new qTip($(this), config, id);

            // Add API references
            $.fn.qtip.interfaces[id] = obj;

            // Check if element already has qTip data assigned
            if(typeof $(this).data('qtip') == 'object')
            {
               // Set new current interface id
               if(typeof $(this).attr('qtip') === 'undefined')
                  $(this).data('qtip').current = $(this).data('qtip').interfaces.length;

               // Push new API interface onto interfaces array
               $(this).data('qtip').interfaces.push(obj);
            }

            // No qTip data is present, create now
            else $(this).data('qtip', { current: 0, interfaces: [obj] });

            // If prerendering is disabled, create tooltip on showEvent
            if(config.content.prerender === false && config.show.when.event !== false && config.show.ready !== true)
            {
               config.show.when.target.bind(config.show.when.event+'.qtip-'+id+'-create', { qtip: id }, function(event)
               {
                  // Retrieve API interface via passed qTip Id
                  api = $.fn.qtip.interfaces[ event.data.qtip ];

                  // Unbind show event and cache mouse coords
                  api.options.show.when.target.unbind(api.options.show.when.event+'.qtip-'+event.data.qtip+'-create');
                  api.cache.mouse = { x: event.pageX, y: event.pageY };

                  // Render tooltip and start the event sequence
                  construct.call( api );
                  api.options.show.when.target.trigger(api.options.show.when.event);
               });
            }

            // Prerendering is enabled, create tooltip now
            else
            {
               // Set mouse position cache to top left of the element
               obj.cache.mouse = {
                  x: config.show.when.target.offset().left,
                  y: config.show.when.target.offset().top
               };

               // Construct the tooltip
               construct.call(obj);
            }
         };
      });
   };

   // Instantiator
   function qTip(target, options, id)
   {
      // Declare this reference
      var self = this;

      // Setup class attributes
      self.id = id;
      self.options = options;
      self.status = {
         animated: false,
         rendered: false,
         disabled: false,
         focused: false
      };
      self.elements = {
         target: target.addClass(self.options.style.classes.target),
         tooltip: null,
         wrapper: null,
         content: null,
         contentWrapper: null,
         title: null,
         button: null,
         tip: null,
         bgiframe: null
      };
      self.cache = {
         mouse: {},
         position: {},
         toggle: 0
      };
      self.timers = {};

      // Define exposed API methods
      $.extend(self, self.options.api,
      {
         show: function(event)
         {
            var returned, solo;

            // Make sure tooltip is rendered and if not, return
            if(!self.status.rendered)
               return $.fn.qtip.log.error.call(self, 2, $.fn.qtip.constants.TOOLTIP_NOT_RENDERED, 'show');

            // Only continue if element is visible
            if(self.elements.tooltip.css('display') !== 'none') return self;

            // Clear animation queue
            self.elements.tooltip.stop(true, false);

            // Call API method and if return value is false, halt
            returned = self.beforeShow.call(self, event);
            if(returned === false) return self;

            // Define afterShow callback method
            function afterShow()
            {
               // Call API method and focus if it isn't static
               if(self.options.position.type !== 'static') self.focus();
               self.onShow.call(self, event);

               // Prevent antialias from disappearing in IE7 by removing filter attribute
               if($.browser.msie) self.elements.tooltip.get(0).style.removeAttribute('filter');
            };

            // Maintain toggle functionality if enabled
            self.cache.toggle = 1;

            // Update tooltip position if it isn't static
            if(self.options.position.type !== 'static')
               self.updatePosition(event, (self.options.show.effect.length > 0));

            // Hide other tooltips if tooltip is solo
            if(typeof self.options.show.solo == 'object') solo = $(self.options.show.solo);
            else if(self.options.show.solo === true) solo = $('div.qtip').not(self.elements.tooltip);
            if(solo) solo.each(function(){ if($(this).qtip('api').status.rendered === true) $(this).qtip('api').hide(); });

            // Show tooltip
            if(typeof self.options.show.effect.type == 'function')
            {
               self.options.show.effect.type.call(self.elements.tooltip, self.options.show.effect.length);
               self.elements.tooltip.queue(function(){ afterShow(); $(this).dequeue(); });
            }
            else
            {
               switch(self.options.show.effect.type.toLowerCase())
               {
                  case 'fade':
                     self.elements.tooltip.fadeIn(self.options.show.effect.length, afterShow);
                     break;
                  case 'slide':
                     self.elements.tooltip.slideDown(self.options.show.effect.length, function()
                     {
                        afterShow();
                        if(self.options.position.type !== 'static') self.updatePosition(event, true);
                     });
                     break;
                  case 'grow':
                     self.elements.tooltip.show(self.options.show.effect.length, afterShow);
                     break;
                  default:
                     self.elements.tooltip.show(null, afterShow);
                     break;
               };

               // Add active class to tooltip
               self.elements.tooltip.addClass(self.options.style.classes.active);
            };

            // Log event and return
            return $.fn.qtip.log.error.call(self, 1, $.fn.qtip.constants.EVENT_SHOWN, 'show');
         },

         hide: function(event)
         {
            var returned;

            // Make sure tooltip is rendered and if not, return
            if(!self.status.rendered)
               return $.fn.qtip.log.error.call(self, 2, $.fn.qtip.constants.TOOLTIP_NOT_RENDERED, 'hide');

            // Only continue if element is visible
            else if(self.elements.tooltip.css('display') === 'none') return self;

            // Stop show timer and animation queue
            clearTimeout(self.timers.show);
            self.elements.tooltip.stop(true, false);

            // Call API method and if return value is false, halt
            returned = self.beforeHide.call(self, event);
            if(returned === false) return self;

            // Define afterHide callback method
            function afterHide(){ self.onHide.call(self, event); };

            // Maintain toggle functionality if enabled
            self.cache.toggle = 0;

            // Hide tooltip
            if(typeof self.options.hide.effect.type == 'function')
            {
               self.options.hide.effect.type.call(self.elements.tooltip, self.options.hide.effect.length);
               self.elements.tooltip.queue(function(){ afterHide(); $(this).dequeue(); });
            }
            else
            {
               switch(self.options.hide.effect.type.toLowerCase())
               {
                  case 'fade':
                     self.elements.tooltip.fadeOut(self.options.hide.effect.length, afterHide);
                     break;
                  case 'slide':
                     self.elements.tooltip.slideUp(self.options.hide.effect.length, afterHide);
                     break;
                  case 'grow':
                     self.elements.tooltip.hide(self.options.hide.effect.length, afterHide);
                     break;
                  default:
                     self.elements.tooltip.hide(null, afterHide);
                     break;
               };

               // Remove active class to tooltip
               self.elements.tooltip.removeClass(self.options.style.classes.active);
            };

            // Log event and return
            return $.fn.qtip.log.error.call(self, 1, $.fn.qtip.constants.EVENT_HIDDEN, 'hide');
         },

         updatePosition: function(event, animate)
         {
            var i, target, tooltip, coords, mapName, imagePos, newPosition, ieAdjust, ie6Adjust, borderAdjust, mouseAdjust, offset, curPosition, returned

            // Make sure tooltip is rendered and if not, return
            if(!self.status.rendered)
               return $.fn.qtip.log.error.call(self, 2, $.fn.qtip.constants.TOOLTIP_NOT_RENDERED, 'updatePosition');

            // If tooltip is static, return
            else if(self.options.position.type == 'static')
               return $.fn.qtip.log.error.call(self, 1, $.fn.qtip.constants.CANNOT_POSITION_STATIC, 'updatePosition');

            // Define property objects
            target = {
               position: { left: 0, top: 0 },
               dimensions: { height: 0, width: 0 },
               corner: self.options.position.corner.target
            };
            tooltip = {
               position: self.getPosition(),
               dimensions: self.getDimensions(),
               corner: self.options.position.corner.tooltip
            };

            // Target is an HTML element
            if(self.options.position.target !== 'mouse')
            {
               // If the HTML element is AREA, calculate position manually
               if(self.options.position.target.get(0).nodeName.toLowerCase() == 'area')
               {
                  // Retrieve coordinates from coords attribute and parse into integers
                  coords = self.options.position.target.attr('coords').split(',');
                  for(i = 0; i < coords.length; i++) coords[i] = parseInt(coords[i]);

                  // Setup target position object
                  mapName = self.options.position.target.parent('map').attr('name');
                  imagePos = $('img[usemap="#'+mapName+'"]:first').offset();
                  target.position = {
                     left: Math.floor(imagePos.left + coords[0]),
                     top: Math.floor(imagePos.top + coords[1])
                  };

                  // Determine width and height of the area
                  switch(self.options.position.target.attr('shape').toLowerCase())
                  {
                     case 'rect':
                        target.dimensions = {
                           width: Math.ceil(Math.abs(coords[2] - coords[0])),
                           height: Math.ceil(Math.abs(coords[3] - coords[1]))
                        };
                        break;

                     case 'circle':
                        target.dimensions = {
                           width: coords[2] + 1,
                           height: coords[2] + 1
                        };
                        break;

                     case 'poly':
                        target.dimensions = {
                           width: coords[0],
                           height: coords[1]
                        };

                        for(i = 0; i < coords.length; i++)
                        {
                           if(i % 2 == 0)
                           {
                              if(coords[i] > target.dimensions.width)
                                 target.dimensions.width = coords[i];
                              if(coords[i] < coords[0])
                                 target.position.left = Math.floor(imagePos.left + coords[i]);
                           }
                           else
                           {
                              if(coords[i] > target.dimensions.height)
                                 target.dimensions.height = coords[i];
                              if(coords[i] < coords[1])
                                 target.position.top = Math.floor(imagePos.top + coords[i]);
                           };
                        };

                        target.dimensions.width = target.dimensions.width - (target.position.left - imagePos.left);
                        target.dimensions.height = target.dimensions.height - (target.position.top - imagePos.top);
                        break;

                     default:
                        return $.fn.qtip.log.error.call(self, 4, $.fn.qtip.constants.INVALID_AREA_SHAPE, 'updatePosition');
                        break;
                  };

                  // Adjust position by 2 pixels (Positioning bug?)
                  target.dimensions.width -= 2; target.dimensions.height -= 2;
               }

               // Target is the document
               else if(self.options.position.target.add(document.body).length === 1)
               {
                  target.position = { left: $(document).scrollLeft(), top: $(document).scrollTop() };
                  target.dimensions = { height: $(window).height(), width: $(window).width() };
               }

               // Target is a regular HTML element, find position normally
               else
               {
                  // Check if the target is another tooltip. If its animated, retrieve position from newPosition data
                  if(typeof self.options.position.target.attr('qtip') !== 'undefined')
                     target.position = self.options.position.target.qtip('api').cache.position;
                  else
                     target.position = self.options.position.target.offset();

                  // Setup dimensions objects
                  target.dimensions = {
                     height: self.options.position.target.outerHeight(),
                     width: self.options.position.target.outerWidth()
                  };
               };

               // Calculate correct target corner position
               newPosition = $.extend({}, target.position);
               if(target.corner.search(/right/i) !== -1)
                  newPosition.left += target.dimensions.width;

               if(target.corner.search(/bottom/i) !== -1)
                  newPosition.top += target.dimensions.height;

               if(target.corner.search(/((top|bottom)Middle)|center/) !== -1)
                  newPosition.left += (target.dimensions.width / 2);

               if(target.corner.search(/((left|right)Middle)|center/) !== -1)
                  newPosition.top += (target.dimensions.height / 2);
            }

            // Mouse is the target, set position to current mouse coordinates
            else
            {
               // Setup target position and dimensions objects
               target.position = newPosition = { left: self.cache.mouse.x, top: self.cache.mouse.y };
               target.dimensions = { height: 1, width: 1 };
            };

            // Calculate correct target corner position
            if(tooltip.corner.search(/right/i) !== -1)
               newPosition.left -= tooltip.dimensions.width;

            if(tooltip.corner.search(/bottom/i) !== -1)
               newPosition.top -= tooltip.dimensions.height;

            if(tooltip.corner.search(/((top|bottom)Middle)|center/) !== -1)
               newPosition.left -= (tooltip.dimensions.width / 2);

            if(tooltip.corner.search(/((left|right)Middle)|center/) !== -1)
               newPosition.top -= (tooltip.dimensions.height / 2);

            // Setup IE adjustment variables (Pixel gap bugs)
            ieAdjust = ($.browser.msie) ? 1 : 0; // And this is why I hate IE...
            ie6Adjust = ($.browser.msie && parseInt($.browser.version.charAt(0)) === 6) ? 1 : 0; // ...and even more so IE6!

            // Adjust for border radius
            if(self.options.style.border.radius > 0)
            {
               if(tooltip.corner.search(/Left/) !== -1)
                  newPosition.left -= self.options.style.border.radius;
               else if(tooltip.corner.search(/Right/) !== -1)
                  newPosition.left += self.options.style.border.radius;

               if(tooltip.corner.search(/Top/) !== -1)
                  newPosition.top -= self.options.style.border.radius;
               else if(tooltip.corner.search(/Bottom/) !== -1)
                  newPosition.top += self.options.style.border.radius;
            };

            // IE only adjustments (Pixel perfect!)
            if(ieAdjust)
            {
               if(tooltip.corner.search(/top/) !== -1)
                  newPosition.top -= ieAdjust
               else if(tooltip.corner.search(/bottom/) !== -1)
                  newPosition.top += ieAdjust

               if(tooltip.corner.search(/left/) !== -1)
                  newPosition.left -= ieAdjust
               else if(tooltip.corner.search(/right/) !== -1)
                  newPosition.left += ieAdjust

               if(tooltip.corner.search(/leftMiddle|rightMiddle/) !== -1)
                  newPosition.top -= 1
            };

            // If screen adjustment is enabled, apply adjustments
            if(self.options.position.adjust.screen === true)
               newPosition = screenAdjust.call(self, newPosition, target, tooltip);

            // If mouse is the target, prevent tooltip appearing directly under the mouse
            if(self.options.position.target === 'mouse' && self.options.position.adjust.mouse === true)
            {
               if(self.options.position.adjust.screen === true && self.elements.tip)
                  mouseAdjust = self.elements.tip.attr('rel');
               else
                  mouseAdjust = self.options.position.corner.tooltip;

               newPosition.left += (mouseAdjust.search(/right/i) !== -1) ? -6 : 6;
               newPosition.top += (mouseAdjust.search(/bottom/i) !== -1) ? -6 : 6;
            }

            // Initiate bgiframe plugin in IE6 if tooltip overlaps a select box or object element
            if(!self.elements.bgiframe && $.browser.msie && parseInt($.browser.version.charAt(0)) == 6)
            {
               $('select, object').each(function()
               {
                  offset = $(this).offset();
                  offset.bottom = offset.top + $(this).height();
                  offset.right = offset.left + $(this).width();

                  if(newPosition.top + tooltip.dimensions.height >= offset.top
                  && newPosition.left + tooltip.dimensions.width >= offset.left)
                     bgiframe.call(self);
               });
            };

            // Add user xy adjustments
            newPosition.left += self.options.position.adjust.x;
            newPosition.top += self.options.position.adjust.y;

            // Set new tooltip position if its moved, animate if enabled
            curPosition = self.getPosition();
            if(newPosition.left != curPosition.left || newPosition.top != curPosition.top)
            {
               // Call API method and if return value is false, halt
               returned = self.beforePositionUpdate.call(self, event);
               if(returned === false) return self;

               // Cache new position
               self.cache.position = newPosition;

               // Check if animation is enabled
               if(animate === true)
               {
                  // Set animated status
                  self.status.animated = true;

                  // Animate and reset animated status on animation end
                  self.elements.tooltip.animate(newPosition, 200, 'swing', function(){ self.status.animated = false });
               }

               // Set new position via CSS
               else self.elements.tooltip.css(newPosition);

               // Call API method and log event if its not a mouse move
               self.onPositionUpdate.call(self, event);
               if(typeof event !== 'undefined' && event.type && event.type !== 'mousemove')
                  $.fn.qtip.log.error.call(self, 1, $.fn.qtip.constants.EVENT_POSITION_UPDATED, 'updatePosition');
            };

            return self;
         },

         updateWidth: function(newWidth)
         {
            var hidden;

            // Make sure tooltip is rendered and if not, return
            if(!self.status.rendered)
               return $.fn.qtip.log.error.call(self, 2, $.fn.qtip.constants.TOOLTIP_NOT_RENDERED, 'updateWidth');

            // Make sure supplied width is a number and if not, return
            else if(newWidth && typeof newWidth !== 'number')
               return $.fn.qtip.log.error.call(self, 2, 'newWidth must be of type number', 'updateWidth');

            // Setup elements which must be hidden during width update
            hidden = self.elements.contentWrapper.siblings().add(self.elements.tip).add(self.elements.button);

            // Calculate the new width if one is not supplied
            if(!newWidth)
            {
               // Explicit width is set
               if(typeof self.options.style.width.value == 'number')
                  newWidth = self.options.style.width.value;

               // No width is set, proceed with auto detection
               else
               {
                  // Set width to auto initally to determine new width and hide other elements
                  self.elements.tooltip.css({ width: 'auto' });
                  hidden.hide();

                  // Set position and zoom to defaults to prevent IE hasLayout bug
                  if($.browser.msie)
                     self.elements.wrapper.add(self.elements.contentWrapper.children()).css({ zoom: 'normal' });

                  // Set the new width
                  newWidth = self.getDimensions().width + 1;

                  // Make sure its within the maximum and minimum width boundries
                  if(!self.options.style.width.value)
                  {
                     if(newWidth > self.options.style.width.max) newWidth = self.options.style.width.max
                     if(newWidth < self.options.style.width.min) newWidth = self.options.style.width.min
                  };
               };
            };

            // Adjust newWidth by 1px if width is odd (IE6 rounding bug fix)
            if(newWidth % 2 !== 0) newWidth -= 1;

            // Set the new calculated width and unhide other elements
            self.elements.tooltip.width(newWidth);
            hidden.show();

            // Set the border width, if enabled
            if(self.options.style.border.radius)
            {
               self.elements.tooltip.find('.qtip-betweenCorners').each(function(i)
               {
                  $(this).width(newWidth - (self.options.style.border.radius * 2));
               })
            };

            // IE only adjustments
            if($.browser.msie)
            {
               // Reset position and zoom to give the wrapper layout (IE hasLayout bug)
               self.elements.wrapper.add(self.elements.contentWrapper.children()).css({ zoom: '1' });

               // Set the new width
               self.elements.wrapper.width(newWidth);

               // Adjust BGIframe height and width if enabled
               if(self.elements.bgiframe) self.elements.bgiframe.width(newWidth).height(self.getDimensions.height);
            };

            // Log event and return
            return $.fn.qtip.log.error.call(self, 1, $.fn.qtip.constants.EVENT_WIDTH_UPDATED, 'updateWidth');
         },

         updateStyle: function(name)
         {
            var tip, borders, context, corner, coordinates;

            // Make sure tooltip is rendered and if not, return
            if(!self.status.rendered)
               return $.fn.qtip.log.error.call(self, 2, $.fn.qtip.constants.TOOLTIP_NOT_RENDERED, 'updateStyle');

            // Return if style is not defined or name is not a string
            else if(typeof name !== 'string' || !$.fn.qtip.styles[name])
               return $.fn.qtip.log.error.call(self, 2, $.fn.qtip.constants.STYLE_NOT_DEFINED, 'updateStyle');

            // Set the new style object
            self.options.style = buildStyle.call(self, $.fn.qtip.styles[name], self.options.user.style);

            // Update initial styles of content and title elements
            self.elements.content.css( jQueryStyle(self.options.style) );
            if(self.options.content.title.text !== false)
               self.elements.title.css( jQueryStyle(self.options.style.title, true) );

            // Update CSS border colour
            self.elements.contentWrapper.css({ borderColor: self.options.style.border.color });

            // Update tip color if enabled
            if(self.options.style.tip.corner !== false)
            {
               if($('<canvas>').get(0).getContext)
               {
                  // Retrieve canvas context and clear
                  tip = self.elements.tooltip.find('.qtip-tip canvas:first');
                  context = tip.get(0).getContext('2d');
                  context.clearRect(0,0,300,300);

                  // Draw new tip
                  corner = tip.parent('div[rel]:first').attr('rel');
                  coordinates = calculateTip(corner, self.options.style.tip.size.width, self.options.style.tip.size.height);
                  drawTip.call(self, tip, coordinates, self.options.style.tip.color || self.options.style.border.color);
               }
               else if($.browser.msie)
               {
                  // Set new fillcolor attribute
                  tip = self.elements.tooltip.find('.qtip-tip [nodeName="shape"]');
                  tip.attr('fillcolor', self.options.style.tip.color || self.options.style.border.color);
               };
            };

            // Update border colors if enabled
            if(self.options.style.border.radius > 0)
            {
               self.elements.tooltip.find('.qtip-betweenCorners').css({ backgroundColor: self.options.style.border.color });

               if($('<canvas>').get(0).getContext)
               {
                  borders = calculateBorders(self.options.style.border.radius)
                  self.elements.tooltip.find('.qtip-wrapper canvas').each(function()
                  {
                     // Retrieve canvas context and clear
                     context = $(this).get(0).getContext('2d');
                     context.clearRect(0,0,300,300);

                     // Draw new border
                     corner = $(this).parent('div[rel]:first').attr('rel')
                     drawBorder.call(self, $(this), borders[corner],
                        self.options.style.border.radius, self.options.style.border.color);
                  });
               }
               else if($.browser.msie)
               {
                  // Set new fillcolor attribute on each border corner
                  self.elements.tooltip.find('.qtip-wrapper [nodeName="arc"]').each(function()
                  {
                     $(this).attr('fillcolor', self.options.style.border.color)
                  });
               };
            };

            // Log event and return
            return $.fn.qtip.log.error.call(self, 1, $.fn.qtip.constants.EVENT_STYLE_UPDATED, 'updateStyle');
         },

         updateContent: function(content, reposition)
         {
            var parsedContent, images, loadedImages;

            // Make sure tooltip is rendered and if not, return
            if(!self.status.rendered)
               return $.fn.qtip.log.error.call(self, 2, $.fn.qtip.constants.TOOLTIP_NOT_RENDERED, 'updateContent');

            // Make sure content is defined before update
            else if(!content)
               return $.fn.qtip.log.error.call(self, 2, $.fn.qtip.constants.NO_CONTENT_PROVIDED, 'updateContent');

            // Call API method and set new content if a string is returned
            parsedContent = self.beforeContentUpdate.call(self, content);
            if(typeof parsedContent == 'string') content = parsedContent;
            else if(parsedContent === false) return;

            // Set position and zoom to defaults to prevent IE hasLayout bug
            if($.browser.msie) self.elements.contentWrapper.children().css({ zoom: 'normal' });

            // Append new content if its a DOM array and show it if hidden
            if(content.jquery && content.length > 0)
               content.clone(true).appendTo(self.elements.content).show();

            // Content is a regular string, insert the new content
            else self.elements.content.html(content);

            // Check if images need to be loaded before position is updated to prevent mis-positioning
            images = self.elements.content.find('img[complete=false]');
            if(images.length > 0)
            {
               loadedImages = 0;
               images.each(function(i)
               {
                  $('<img src="'+ $(this).attr('src') +'" />')
                     .load(function(){ if(++loadedImages == images.length) afterLoad(); });
               });
            }
            else afterLoad();

            function afterLoad()
            {
               // Update the tooltip width
               self.updateWidth();

               // If repositioning is enabled, update positions
               if(reposition !== false)
               {
                  // Update position if tooltip isn't static
                  if(self.options.position.type !== 'static')
                     self.updatePosition(self.elements.tooltip.is(':visible'), true);

                  // Reposition the tip if enabled
                  if(self.options.style.tip.corner !== false)
                     positionTip.call(self);
               };
            };

            // Call API method and log event
            self.onContentUpdate.call(self);
            return $.fn.qtip.log.error.call(self, 1, $.fn.qtip.constants.EVENT_CONTENT_UPDATED, 'loadContent');
         },

         loadContent: function(url, data, method)
         {
            var returned;

            // Make sure tooltip is rendered and if not, return
            if(!self.status.rendered)
               return $.fn.qtip.log.error.call(self, 2, $.fn.qtip.constants.TOOLTIP_NOT_RENDERED, 'loadContent');

            // Call API method and if return value is false, halt
            returned = self.beforeContentLoad.call(self);
            if(returned === false) return self;

            // Load content using specified request type
            if(method == 'post')
               $.post(url, data, setupContent);
            else
               $.get(url, data, setupContent);

            function setupContent(content)
            {
               // Call API method and log event
               self.onContentLoad.call(self);
               $.fn.qtip.log.error.call(self, 1, $.fn.qtip.constants.EVENT_CONTENT_LOADED, 'loadContent');

               // Update the content
               self.updateContent(content);
            };

            return self;
         },

         updateTitle: function(content)
         {
            // Make sure tooltip is rendered and if not, return
            if(!self.status.rendered)
               return $.fn.qtip.log.error.call(self, 2, $.fn.qtip.constants.TOOLTIP_NOT_RENDERED, 'updateTitle');

            // Make sure content is defined before update
            else if(!content)
               return $.fn.qtip.log.error.call(self, 2, $.fn.qtip.constants.NO_CONTENT_PROVIDED, 'updateTitle');

            // Call API method and if return value is false, halt
            returned = self.beforeTitleUpdate.call(self);
            if(returned === false) return self;

            // Set the new content and reappend the button if enabled
            if(self.elements.button) self.elements.button = self.elements.button.clone(true);
            self.elements.title.html(content)
            if(self.elements.button) self.elements.title.prepend(self.elements.button);

            // Call API method and log event
            self.onTitleUpdate.call(self);
            return $.fn.qtip.log.error.call(self, 1, $.fn.qtip.constants.EVENT_TITLE_UPDATED, 'updateTitle');
         },

         focus: function(event)
         {
            var curIndex, newIndex, elemIndex, returned;

            // Make sure tooltip is rendered and if not, return
            if(!self.status.rendered)
               return $.fn.qtip.log.error.call(self, 2, $.fn.qtip.constants.TOOLTIP_NOT_RENDERED, 'focus');

            else if(self.options.position.type == 'static')
               return $.fn.qtip.log.error.call(self, 1, $.fn.qtip.constants.CANNOT_FOCUS_STATIC, 'focus');

            // Set z-index variables
            curIndex = parseInt( self.elements.tooltip.css('z-index') );
            newIndex = 6000 + $('div.qtip[qtip]').length - 1;

            // Only update the z-index if it has changed and tooltip is not already focused
            if(!self.status.focused && curIndex !== newIndex)
            {
               // Call API method and if return value is false, halt
               returned = self.beforeFocus.call(self, event);
               if(returned === false) return self;

               // Loop through all other tooltips
               $('div.qtip[qtip]').not(self.elements.tooltip).each(function()
               {
                  if($(this).qtip('api').status.rendered === true)
                  {
                     elemIndex = parseInt($(this).css('z-index'));

                     // Reduce all other tooltip z-index by 1
                     if(typeof elemIndex == 'number' && elemIndex > -1)
                        $(this).css({ zIndex: parseInt( $(this).css('z-index') ) - 1 });

                     // Set focused status to false
                     $(this).qtip('api').status.focused = false;
                  }
               })

               // Set the new z-index and set focus status to true
               self.elements.tooltip.css({ zIndex: newIndex });
               self.status.focused = true;

               // Call API method and log event
               self.onFocus.call(self, event);
               $.fn.qtip.log.error.call(self, 1, $.fn.qtip.constants.EVENT_FOCUSED, 'focus');
            };

            return self;
         },

         disable: function(state)
         {
            // Make sure tooltip is rendered and if not, return
            if(!self.status.rendered)
               return $.fn.qtip.log.error.call(self, 2, $.fn.qtip.constants.TOOLTIP_NOT_RENDERED, 'disable');

            if(state)
            {
               // Tooltip is not already disabled, proceed
               if(!self.status.disabled)
               {
                  // Set the disabled flag and log event
                  self.status.disabled = true;
                  $.fn.qtip.log.error.call(self, 1, $.fn.qtip.constants.EVENT_DISABLED, 'disable');
               }

               // Tooltip is already disabled, inform user via log
               else  $.fn.qtip.log.error.call(self, 1, $.fn.qtip.constants.TOOLTIP_ALREADY_DISABLED, 'disable');
            }
            else
            {
               // Tooltip is not already enabled, proceed
               if(self.status.disabled)
               {
                  // Reassign events, set disable status and log
                  self.status.disabled = false;
                  $.fn.qtip.log.error.call(self, 1, $.fn.qtip.constants.EVENT_ENABLED, 'disable');
               }

               // Tooltip is already enabled, inform the user via log
               else $.fn.qtip.log.error.call(self, 1, $.fn.qtip.constants.TOOLTIP_ALREADY_ENABLED, 'disable');
            };

            return self;
         },

         destroy: function()
         {
            var i, returned, interfaces;

            // Call API method and if return value is false, halt
            returned = self.beforeDestroy.call(self);
            if(returned === false) return self;

            // Check if tooltip is rendered
            if(self.status.rendered)
            {
               // Remove event handlers and remove element
               self.options.show.when.target.unbind('mousemove.qtip', self.updatePosition);
               self.options.show.when.target.unbind('mouseout.qtip', self.hide);
               self.options.show.when.target.unbind(self.options.show.when.event + '.qtip');
               self.options.hide.when.target.unbind(self.options.hide.when.event + '.qtip');
               self.elements.tooltip.unbind(self.options.hide.when.event + '.qtip');
               self.elements.tooltip.unbind('mouseover.qtip', self.focus);
               self.elements.tooltip.remove();
            }

            // Tooltip isn't yet rendered, remove render event
            else self.options.show.when.target.unbind(self.options.show.when.event+'.qtip-create');

            // Check to make sure qTip data is present on target element
            if(typeof self.elements.target.data('qtip') == 'object')
            {
               // Remove API references from interfaces object
               interfaces = self.elements.target.data('qtip').interfaces;
               if(typeof interfaces == 'object' && interfaces.length > 0)
               {
                  // Remove API from interfaces array
                  for(i = 0; i < interfaces.length - 1; i++)
                     if(interfaces[i].id == self.id) interfaces.splice(i, 1)
               }
            }
            delete $.fn.qtip.interfaces[self.id];

            // Set qTip current id to previous tooltips API if available
            if(typeof interfaces == 'object' && interfaces.length > 0)
               self.elements.target.data('qtip').current = interfaces.length -1;
            else
               self.elements.target.removeData('qtip');

            // Call API method and log destroy
            self.onDestroy.call(self);
            $.fn.qtip.log.error.call(self, 1, $.fn.qtip.constants.EVENT_DESTROYED, 'destroy');

            return self.elements.target
         },

         getPosition: function()
         {
            var show, offset;

            // Make sure tooltip is rendered and if not, return
            if(!self.status.rendered)
               return $.fn.qtip.log.error.call(self, 2, $.fn.qtip.constants.TOOLTIP_NOT_RENDERED, 'getPosition');

            show = (self.elements.tooltip.css('display') !== 'none') ? false : true;

            // Show and hide tooltip to make sure coordinates are returned
            if(show) self.elements.tooltip.css({ visiblity: 'hidden' }).show();
            offset = self.elements.tooltip.offset();
            if(show) self.elements.tooltip.css({ visiblity: 'visible' }).hide();

            return offset;
         },

         getDimensions: function()
         {
            var show, dimensions;

            // Make sure tooltip is rendered and if not, return
            if(!self.status.rendered)
               return $.fn.qtip.log.error.call(self, 2, $.fn.qtip.constants.TOOLTIP_NOT_RENDERED, 'getDimensions');

            show = (!self.elements.tooltip.is(':visible')) ? true : false;

            // Show and hide tooltip to make sure dimensions are returned
            if(show) self.elements.tooltip.css({ visiblity: 'hidden' }).show();
            dimensions = {
               height: self.elements.tooltip.outerHeight(),
               width: self.elements.tooltip.outerWidth()
            };
            if(show) self.elements.tooltip.css({ visiblity: 'visible' }).hide();

            return dimensions;
         }
      });
   };

   // Define priamry construct function
   function construct()
   {
      var self, adjust, content, url, data, method, tempLength;
      self = this;

      // Call API method
      self.beforeRender.call(self);

      // Set rendered status to true
      self.status.rendered = true;

      // Create initial tooltip elements
      self.elements.tooltip =  '<div qtip="'+self.id+'" ' +
         'class="qtip '+(self.options.style.classes.tooltip || self.options.style)+'"' +
         'style="display:none; -moz-border-radius:0; -webkit-border-radius:0; border-radius:0;' +
         'position:'+self.options.position.type+';">' +
         '  <div class="qtip-wrapper" style="position:relative; overflow:hidden; text-align:left;">' +
         '    <div class="qtip-contentWrapper" style="overflow:hidden;">' +
         '       <div class="qtip-content '+self.options.style.classes.content+'"></div>' +
         '</div></div></div>';

      // Append to container element
      self.elements.tooltip = $(self.elements.tooltip);
      self.elements.tooltip.appendTo(self.options.position.container)

      // Setup tooltip qTip data
      self.elements.tooltip.data('qtip', { current: 0, interfaces: [self] });

      // Setup element references
      self.elements.wrapper = self.elements.tooltip.children('div:first');
      self.elements.contentWrapper = self.elements.wrapper.children('div:first').css({ background: self.options.style.background });
      self.elements.content = self.elements.contentWrapper.children('div:first').css( jQueryStyle(self.options.style) );

      // Apply IE hasLayout fix to wrapper and content elements
      if($.browser.msie) self.elements.wrapper.add(self.elements.content).css({ zoom: 1 });

      // Setup tooltip attributes
      if(self.options.hide.when.event == 'unfocus') self.elements.tooltip.attr('unfocus', true);

      // If an explicit width is set, updateWidth prior to setting content to prevent dirty rendering
      if(typeof self.options.style.width.value == 'number') self.updateWidth();

      // Create borders and tips if supported by the browser
      if($('<canvas>').get(0).getContext || $.browser.msie)
      {
         // Create border
         if(self.options.style.border.radius > 0)
            createBorder.call(self);
         else
            self.elements.contentWrapper.css({ border: self.options.style.border.width+'px solid '+self.options.style.border.color  });

         // Create tip if enabled
         if(self.options.style.tip.corner !== false)
            createTip.call(self);
      }

      // Neither canvas or VML is supported, tips and borders cannot be drawn!
      else
      {
         // Set defined border width
         self.elements.contentWrapper.css({ border: self.options.style.border.width+'px solid '+self.options.style.border.color  });

         // Reset border radius and tip
         self.options.style.border.radius = 0;
         self.options.style.tip.corner = false;

         // Inform via log
         $.fn.qtip.log.error.call(self, 2, $.fn.qtip.constants.CANVAS_VML_NOT_SUPPORTED, 'render');
      };

      // Use the provided content string or DOM array
      if((typeof self.options.content.text == 'string' && self.options.content.text.length > 0)
      || (self.options.content.text.jquery && self.options.content.text.length > 0))
         content = self.options.content.text;

      // Use title string for content if present
      else if(typeof self.elements.target.attr('title') == 'string' && self.elements.target.attr('title').length > 0)
      {
         content = self.elements.target.attr('title').replace("\\n", '<br />');
         self.elements.target.attr('title', ''); // Remove title attribute to prevent default tooltip showing
      }

      // No title is present, use alt attribute instead
      else if(typeof self.elements.target.attr('alt') == 'string' && self.elements.target.attr('alt').length > 0)
      {
         content = self.elements.target.attr('alt').replace("\\n", '<br />');
         self.elements.target.attr('alt', ''); // Remove alt attribute to prevent default tooltip showing
      }

      // No valid content was provided, inform via log
      else
      {
         content = ' ';
         $.fn.qtip.log.error.call(self, 1, $.fn.qtip.constants.NO_VALID_CONTENT, 'render');
      };

      // Set the tooltips content and create title if enabled
      if(self.options.content.title.text !== false) createTitle.call(self);
      self.updateContent(content);

      // Assign events and toggle tooltip with focus
      assignEvents.call(self);
      if(self.options.show.ready === true) self.show();

      // Retrieve ajax content if provided
      if(self.options.content.url !== false)
      {
         url = self.options.content.url;
         data = self.options.content.data;
         method = self.options.content.method || 'get';
         self.loadContent(url, data, method);
      };

      // Call API method and log event
      self.onRender.call(self);
      $.fn.qtip.log.error.call(self, 1, $.fn.qtip.constants.EVENT_RENDERED, 'render');
   };

   // Create borders using canvas and VML
   function createBorder()
   {
      var self, i, width, radius, color, coordinates, containers, size, betweenWidth, betweenCorners, borderTop, borderBottom, borderCoord, sideWidth, vertWidth;
      self = this;

      // Destroy previous border elements, if present
      self.elements.wrapper.find('.qtip-borderBottom, .qtip-borderTop').remove();

      // Setup local variables
      width = self.options.style.border.width;
      radius = self.options.style.border.radius;
      color = self.options.style.border.color || self.options.style.tip.color;

      // Calculate border coordinates
      coordinates = calculateBorders(radius);

      // Create containers for the border shapes
      containers = {};
      for(i in coordinates)
      {
         // Create shape container
         containers[i] = '<div rel="'+i+'" style="'+((i.search(/Left/) !== -1) ? 'left' : 'right') + ':0; ' +
            'position:absolute; height:'+radius+'px; width:'+radius+'px; overflow:hidden; line-height:0.1px; font-size:1px">';

         // Canvas is supported
         if($('<canvas>').get(0).getContext)
            containers[i] += '<canvas height="'+radius+'" width="'+radius+'" style="vertical-align: top"></canvas>';

         // No canvas, but if it's IE use VML
         else if($.browser.msie)
         {
            size = radius * 2 + 3;
            containers[i] += '<v:arc stroked="false" fillcolor="'+color+'" startangle="'+coordinates[i][0]+'" endangle="'+coordinates[i][1]+'" ' +
               'style="width:'+size+'px; height:'+size+'px; margin-top:'+((i.search(/bottom/) !== -1) ? -2 : -1)+'px; ' +
               'margin-left:'+((i.search(/Right/) !== -1) ? coordinates[i][2] - 3.5 : -1)+'px; ' +
               'vertical-align:top; display:inline-block; behavior:url(#default#VML)"></v:arc>';

         };

         containers[i] += '</div>';
      };

      // Create between corners elements
      betweenWidth = self.getDimensions().width - (Math.max(width, radius) * 2);
      betweenCorners = '<div class="qtip-betweenCorners" style="height:'+radius+'px; width:'+betweenWidth+'px; ' +
         'overflow:hidden; background-color:'+color+'; line-height:0.1px; font-size:1px;">';

      // Create top border container
      borderTop = '<div class="qtip-borderTop" dir="ltr" style="height:'+radius+'px; ' +
         'margin-left:'+radius+'px; line-height:0.1px; font-size:1px; padding:0;">' +
         containers['topLeft'] + containers['topRight'] + betweenCorners;
      self.elements.wrapper.prepend(borderTop);

      // Create bottom border container
      borderBottom = '<div class="qtip-borderBottom" dir="ltr" style="height:'+radius+'px; ' +
         'margin-left:'+radius+'px; line-height:0.1px; font-size:1px; padding:0;">' +
         containers['bottomLeft'] + containers['bottomRight'] + betweenCorners;
      self.elements.wrapper.append(borderBottom);

      // Draw the borders if canvas were used (Delayed til after DOM creation)
      if($('<canvas>').get(0).getContext)
      {
         self.elements.wrapper.find('canvas').each(function()
         {
            borderCoord = coordinates[ $(this).parent('[rel]:first').attr('rel') ];
            drawBorder.call(self, $(this), borderCoord, radius, color);
         })
      }

      // Create a phantom VML element (IE won't show the last created VML element otherwise)
      else if($.browser.msie) self.elements.tooltip.append('<v:image style="behavior:url(#default#VML);"></v:image>');

      // Setup contentWrapper border
      sideWidth = Math.max(radius, (radius + (width - radius)) )
      vertWidth = Math.max(width - radius, 0);
      self.elements.contentWrapper.css({
         border: '0px solid ' + color,
         borderWidth: vertWidth + 'px ' + sideWidth + 'px'
      })
   };

   // Border canvas draw method
   function drawBorder(canvas, coordinates, radius, color)
   {
      // Create corner
      var context = canvas.get(0).getContext('2d');
      context.fillStyle = color;
      context.beginPath();
      context.arc(coordinates[0], coordinates[1], radius, 0, Math.PI * 2, false);
      context.fill();
   };

   // Create tip using canvas and VML
   function createTip(corner)
   {
      var self, color, coordinates, coordsize, path;
      self = this;

      // Destroy previous tip, if there is one
      if(self.elements.tip !== null) self.elements.tip.remove();

      // Setup color and corner values
      color = self.options.style.tip.color || self.options.style.border.color;
      if(self.options.style.tip.corner === false) return;
      else if(!corner) corner = self.options.style.tip.corner;

      // Calculate tip coordinates
      coordinates = calculateTip(corner, self.options.style.tip.size.width, self.options.style.tip.size.height);

      // Create tip element
      self.elements.tip =  '<div class="'+self.options.style.classes.tip+'" dir="ltr" rel="'+corner+'" style="position:absolute; ' +
         'height:'+self.options.style.tip.size.height+'px; width:'+self.options.style.tip.size.width+'px; ' +
         'margin:0 auto; line-height:0.1px; font-size:1px;">';

      // Use canvas element if supported
      if($('<canvas>').get(0).getContext)
          self.elements.tip += '<canvas height="'+self.options.style.tip.size.height+'" width="'+self.options.style.tip.size.width+'"></canvas>';

      // Canvas not supported - Use VML (IE)
      else if($.browser.msie)
      {
         // Create coordize and tip path using tip coordinates
         coordsize = self.options.style.tip.size.width + ',' + self.options.style.tip.size.height;
         path = 'm' + coordinates[0][0] + ',' + coordinates[0][1];
         path += ' l' + coordinates[1][0] + ',' + coordinates[1][1];
         path += ' ' + coordinates[2][0] + ',' + coordinates[2][1];
         path += ' xe';

         // Create VML element
         self.elements.tip += '<v:shape fillcolor="'+color+'" stroked="false" filled="true" path="'+path+'" coordsize="'+coordsize+'" ' +
            'style="width:'+self.options.style.tip.size.width+'px; height:'+self.options.style.tip.size.height+'px; ' +
            'line-height:0.1px; display:inline-block; behavior:url(#default#VML); ' +
            'vertical-align:'+((corner.search(/top/) !== -1) ? 'bottom' : 'top')+'"></v:shape>';

         // Create a phantom VML element (IE won't show the last created VML element otherwise)
         self.elements.tip += '<v:image style="behavior:url(#default#VML);"></v:image>';

         // Prevent tooltip appearing above the content (IE z-index bug)
         self.elements.contentWrapper.css('position', 'relative');
      };

      // Attach new tip to tooltip element
      self.elements.tooltip.prepend(self.elements.tip + '</div>');

      // Create element reference and draw the canvas tip (Delayed til after DOM creation)
      self.elements.tip = self.elements.tooltip.find('.'+self.options.style.classes.tip).eq(0);
      if($('<canvas>').get(0).getContext)
         drawTip.call(self, self.elements.tip.find('canvas:first'), coordinates, color);

      // Fix IE small tip bug
      if(corner.search(/top/) !== -1 && $.browser.msie && parseInt($.browser.version.charAt(0)) === 6)
         self.elements.tip.css({ marginTop: -4 });

      // Set the tip position
      positionTip.call(self, corner);
   };

   // Canvas tip drawing method
   function drawTip(canvas, coordinates, color)
   {
      // Setup properties
      var context = canvas.get(0).getContext('2d');
      context.fillStyle = color;

      // Create tip
      context.beginPath();
      context.moveTo(coordinates[0][0], coordinates[0][1]);
      context.lineTo(coordinates[1][0], coordinates[1][1]);
      context.lineTo(coordinates[2][0], coordinates[2][1]);
      context.fill();
   };

   function positionTip(corner)
   {
      var self, ieAdjust, paddingCorner, paddingSize, newMargin;
      self = this;

      // Return if tips are disabled or tip is not yet rendered
      if(self.options.style.tip.corner === false || !self.elements.tip) return;
      if(!corner) corner = self.elements.tip.attr('rel');

      // Setup adjustment variables
      ieAdjust = positionAdjust = ($.browser.msie) ? 1 : 0;

      // Set initial position
      self.elements.tip.css(corner.match(/left|right|top|bottom/)[0], 0);

      // Set position of tip to correct side
      if(corner.search(/top|bottom/) !== -1)
      {
         // Adjustments for IE6 - 0.5px border gap bug
         if($.browser.msie)
         {
            if(parseInt($.browser.version.charAt(0)) === 6)
               positionAdjust = (corner.search(/top/) !== -1) ? -3 : 1;
            else
               positionAdjust = (corner.search(/top/) !== -1) ? 1 : 2;
         };

         if(corner.search(/Middle/) !== -1)
            self.elements.tip.css({ left: '50%', marginLeft: -(self.options.style.tip.size.width / 2) });

         else if(corner.search(/Left/) !== -1)
            self.elements.tip.css({ left: self.options.style.border.radius - ieAdjust });

         else if(corner.search(/Right/) !== -1)
            self.elements.tip.css({ right: self.options.style.border.radius + ieAdjust });

         if(corner.search(/top/) !== -1)
            self.elements.tip.css({ top: -positionAdjust });
         else
            self.elements.tip.css({ bottom: positionAdjust });

      }
      else if(corner.search(/left|right/) !== -1)
      {
         // Adjustments for IE6 - 0.5px border gap bug
         if($.browser.msie)
            positionAdjust = (parseInt($.browser.version.charAt(0)) === 6) ? 1 : ((corner.search(/left/) !== -1) ? 1 : 2);

         if(corner.search(/Middle/) !== -1)
            self.elements.tip.css({ top: '50%', marginTop: -(self.options.style.tip.size.height / 2) });

         else if(corner.search(/Top/) !== -1)
            self.elements.tip.css({ top: self.options.style.border.radius - ieAdjust });

         else if(corner.search(/Bottom/) !== -1)
            self.elements.tip.css({ bottom: self.options.style.border.radius + ieAdjust });

         if(corner.search(/left/) !== -1)
            self.elements.tip.css({ left: -positionAdjust });
         else
            self.elements.tip.css({ right: positionAdjust });
      };

      // Adjust tooltip padding to compensate for tip
      paddingCorner = 'padding-' + corner.match(/left|right|top|bottom/)[0];
      paddingSize = self.options.style.tip.size[ (paddingCorner.search(/left|right/) !== -1) ? 'width' : 'height' ];
      self.elements.tooltip.css('padding', 0);
      self.elements.tooltip.css(paddingCorner, paddingSize);

      // Match content margin to prevent gap bug in IE6 ONLY
      if($.browser.msie && parseInt($.browser.version.charAt(0)) == 6)
      {
         newMargin = parseInt(self.elements.tip.css('margin-top')) || 0;
         newMargin += parseInt(self.elements.content.css('margin-top')) || 0;

         self.elements.tip.css({ marginTop: newMargin });
      };
   };

   // Create title bar for content
   function createTitle()
   {
      var self = this;

      // Destroy previous title element, if present
      if(self.elements.title !== null) self.elements.title.remove();

      // Create title element
      self.elements.title = $('<div class="'+self.options.style.classes.title+'">')
         .css( jQueryStyle(self.options.style.title, true) )
         .css({ zoom: ($.browser.msie) ? 1 : 0 })
         .prependTo(self.elements.contentWrapper);

      // Update title with contents if enabled
      if(self.options.content.title.text) self.updateTitle.call(self, self.options.content.title.text);

      // Create title close buttons if enabled
      if(self.options.content.title.button !== false
      && typeof self.options.content.title.button == 'string')
      {
         self.elements.button = $('<a class="'+self.options.style.classes.button+'" style="float:right; position: relative"></a>')
            .css( jQueryStyle(self.options.style.button, true) )
            .html(self.options.content.title.button)
            .prependTo(self.elements.title)
            .click(function(event){ if(!self.status.disabled) self.hide(event) });
      };
   };

   // Assign hide and show events
   function assignEvents()
   {
      var self, showTarget, hideTarget, inactiveEvents;
      self = this;

      // Setup event target variables
      showTarget = self.options.show.when.target;
      hideTarget = self.options.hide.when.target;

      // Add tooltip as a hideTarget is its fixed
      if(self.options.hide.fixed) hideTarget = hideTarget.add(self.elements.tooltip);

      // Check if the hide event is special 'inactive' type
      if(self.options.hide.when.event == 'inactive')
      {
         // Define events which reset the 'inactive' event handler
         inactiveEvents = ['click', 'dblclick', 'mousedown', 'mouseup', 'mousemove',
         'mouseout', 'mouseenter', 'mouseleave', 'mouseover' ];

         // Define 'inactive' event timer method
         function inactiveMethod(event)
         {
            if(self.status.disabled === true) return;

            //Clear and reset the timer
            clearTimeout(self.timers.inactive);
            self.timers.inactive = setTimeout(function()
            {
               // Unassign 'inactive' events
               $(inactiveEvents).each(function()
               {
                  hideTarget.unbind(this+'.qtip-inactive');
                  self.elements.content.unbind(this+'.qtip-inactive');
               });

               // Hide the tooltip
               self.hide(event);
            }
            , self.options.hide.delay);
         };
      }

      // Check if the tooltip is 'fixed'
      else if(self.options.hide.fixed === true)
      {
         self.elements.tooltip.bind('mouseover.qtip', function()
         {
            if(self.status.disabled === true) return;

            // Reset the hide timer
            clearTimeout(self.timers.hide);
         });
      };

      // Define show event method
      function showMethod(event)
      {
         if(self.status.disabled === true) return;

         // If set, hide tooltip when inactive for delay period
         if(self.options.hide.when.event == 'inactive')
         {
            // Assign each reset event
            $(inactiveEvents).each(function()
            {
               hideTarget.bind(this+'.qtip-inactive', inactiveMethod);
               self.elements.content.bind(this+'.qtip-inactive', inactiveMethod);
            });

            // Start the inactive timer
            inactiveMethod();
         };

         // Clear hide timers
         clearTimeout(self.timers.show);
         clearTimeout(self.timers.hide);

         // Start show timer
         self.timers.show = setTimeout(function(){ self.show(event); }, self.options.show.delay);
      };

      // Define hide event method
      function hideMethod(event)
      {
         if(self.status.disabled === true) return;

         // Prevent hiding if tooltip is fixed and event target is the tooltip
         if(self.options.hide.fixed === true
         && self.options.hide.when.event.search(/mouse(out|leave)/i) !== -1
         && $(event.relatedTarget).parents('div.qtip[qtip]').length > 0)
         {
            // Prevent default and popagation
            event.stopPropagation();
            event.preventDefault();

            // Reset the hide timer
            clearTimeout(self.timers.hide);
            return false;
         };

         // Clear timers and stop animation queue
         clearTimeout(self.timers.show);
         clearTimeout(self.timers.hide);
         self.elements.tooltip.stop(true, true);

         // If tooltip has displayed, start hide timer
         self.timers.hide = setTimeout(function(){ self.hide(event); }, self.options.hide.delay);
      };

      // Both events and targets are identical, apply events using a toggle
      if((self.options.show.when.target.add(self.options.hide.when.target).length === 1
      && self.options.show.when.event == self.options.hide.when.event
      && self.options.hide.when.event !== 'inactive')
      || self.options.hide.when.event == 'unfocus')
      {
         self.cache.toggle = 0;
         // Use a toggle to prevent hide/show conflicts
         showTarget.bind(self.options.show.when.event + '.qtip', function(event)
         {
            if(self.cache.toggle == 0) showMethod(event);
            else hideMethod(event);
         });
      }

      // Events are not identical, bind normally
      else
      {
         showTarget.bind(self.options.show.when.event + '.qtip', showMethod);

         // If the hide event is not 'inactive', bind the hide method
         if(self.options.hide.when.event !== 'inactive')
            hideTarget.bind(self.options.hide.when.event + '.qtip', hideMethod);
      };

      // Focus the tooltip on mouseover
      if(self.options.position.type.search(/(fixed|absolute)/) !== -1)
         self.elements.tooltip.bind('mouseover.qtip', self.focus);

      // If mouse is the target, update tooltip position on mousemove
      if(self.options.position.target === 'mouse' && self.options.position.type !== 'static')
      {
         showTarget.bind('mousemove.qtip', function(event)
         {
            // Set the new mouse positions if adjustment is enabled
            self.cache.mouse = { x: event.pageX, y: event.pageY };

            // Update the tooltip position only if the tooltip is visible and adjustment is enabled
            if(self.status.disabled === false
            && self.options.position.adjust.mouse === true
            && self.options.position.type !== 'static'
            && self.elements.tooltip.css('display') !== 'none')
               self.updatePosition(event);
         });
      };
   };

   // Screen position adjustment
   function screenAdjust(position, target, tooltip)
   {
      var self, adjustedPosition, adjust, newCorner, overflow, corner;
      self = this;

      // Setup corner and adjustment variable
      if(tooltip.corner == 'center') return target.position // TODO: 'center' corner adjustment
      adjustedPosition = $.extend({}, position);
      newCorner = { x: false, y: false };

      // Define overflow properties
      overflow = {
         left: (adjustedPosition.left < $.fn.qtip.cache.screen.scroll.left),
         right: (adjustedPosition.left + tooltip.dimensions.width + 2 >= $.fn.qtip.cache.screen.width + $.fn.qtip.cache.screen.scroll.left),
         top: (adjustedPosition.top < $.fn.qtip.cache.screen.scroll.top),
         bottom: (adjustedPosition.top + tooltip.dimensions.height + 2 >= $.fn.qtip.cache.screen.height + $.fn.qtip.cache.screen.scroll.top)
      };

      // Determine new positioning properties
      adjust = {
         left: (overflow.left && (tooltip.corner.search(/right/i) != -1 || (tooltip.corner.search(/right/i) == -1 && !overflow.right))),
         right: (overflow.right && (tooltip.corner.search(/left/i) != -1 || (tooltip.corner.search(/left/i) == -1 && !overflow.left))),
         top: (overflow.top && tooltip.corner.search(/top/i) == -1),
         bottom: (overflow.bottom && tooltip.corner.search(/bottom/i) == -1)
      };

      // Tooltip overflows off the left side of the screen
      if(adjust.left)
      {
         if(self.options.position.target !== 'mouse')
            adjustedPosition.left = target.position.left + target.dimensions.width;
         else
            adjustedPosition.left = self.cache.mouse.x

         newCorner.x = 'Left';
      }

      // Tooltip overflows off the right side of the screen
      else if(adjust.right)
      {
         if(self.options.position.target !== 'mouse')
            adjustedPosition.left = target.position.left - tooltip.dimensions.width;
         else
            adjustedPosition.left = self.cache.mouse.x - tooltip.dimensions.width;

         newCorner.x = 'Right';
      };

      // Tooltip overflows off the top of the screen
      if(adjust.top)
      {
         if(self.options.position.target !== 'mouse')
            adjustedPosition.top = target.position.top + target.dimensions.height;
         else
            adjustedPosition.top = self.cache.mouse.y

         newCorner.y = 'top';
      }

      // Tooltip overflows off the bottom of the screen
      else if(adjust.bottom)
      {
         if(self.options.position.target !== 'mouse')
            adjustedPosition.top = target.position.top - tooltip.dimensions.height;
         else
            adjustedPosition.top = self.cache.mouse.y - tooltip.dimensions.height;

         newCorner.y = 'bottom';
      };

      // Don't adjust if resulting position is negative
      if(adjustedPosition.left < 0)
      {
         adjustedPosition.left = position.left;
         newCorner.x = false;
      };
      if(adjustedPosition.top < 0)
      {
         adjustedPosition.top = position.top;
         newCorner.y = false;
      };

      // Change tip corner if positioning has changed and tips are enabled
      if(self.options.style.tip.corner !== false)
      {
         // Determine new corner properties
         adjustedPosition.corner = new String(tooltip.corner);
         if(newCorner.x !== false) adjustedPosition.corner = adjustedPosition.corner.replace(/Left|Right|Middle/, newCorner.x);
         if(newCorner.y !== false) adjustedPosition.corner = adjustedPosition.corner.replace(/top|bottom/, newCorner.y);

         // Adjust tip if position has changed and tips are enabled
         if(adjustedPosition.corner !== self.elements.tip.attr('rel'))
            createTip.call(self, adjustedPosition.corner);
      };

      return adjustedPosition;
   };

   // Build a jQuery style object from supplied style object
   function jQueryStyle(style, sub)
   {
      var styleObj, i;

      styleObj = $.extend(true, {}, style);
      for(i in styleObj)
      {
         if(sub === true && i.search(/(tip|classes)/i) !== -1)
            delete styleObj[i];
         else if(!sub && i.search(/(width|border|tip|title|classes|user)/i) !== -1)
            delete styleObj[i];
      };

      return styleObj;
   };

   // Sanitize styles
   function sanitizeStyle(style)
   {
      if(typeof style.tip !== 'object') style.tip = { corner: style.tip };
      if(typeof style.tip.size !== 'object') style.tip.size = { width: style.tip.size, height: style.tip.size };
      if(typeof style.border !== 'object') style.border = { width: style.border };
      if(typeof style.width !== 'object') style.width = { value: style.width };
      if(typeof style.width.max == 'string') style.width.max = parseInt(style.width.max.replace(/([0-9]+)/i, "$1"));
      if(typeof style.width.min == 'string') style.width.min = parseInt(style.width.min.replace(/([0-9]+)/i, "$1"));

      // Convert deprecated x and y tip values to width/height
      if(typeof style.tip.size.x == 'number')
      {
         style.tip.size.width = style.tip.size.x;
         delete style.tip.size.x;
      };
      if(typeof style.tip.size.y == 'number')
      {
         style.tip.size.height = style.tip.size.y;
         delete style.tip.size.y;
      };

      return style;
   };

   // Build styles recursively with inheritance
   function buildStyle()
   {
      var self, i, styleArray, styleExtend, finalStyle, ieAdjust;
      self = this;

      // Build style options from supplied arguments
      styleArray = [true, {}];
      for(i = 0; i < arguments.length; i++)
         styleArray.push(arguments[i]);
      styleExtend = [ $.extend.apply($, styleArray) ];

      // Loop through each named style inheritance
      while(typeof styleExtend[0].name == 'string')
      {
         // Sanitize style data and append to extend array
         styleExtend.unshift( sanitizeStyle($.fn.qtip.styles[ styleExtend[0].name ]) );
      };

      // Make sure resulting tooltip className represents final style
      styleExtend.unshift(true, {classes:{ tooltip: 'qtip-' + (arguments[0].name || 'defaults') }}, $.fn.qtip.styles.defaults);

      // Extend into a single style object
      finalStyle = $.extend.apply($, styleExtend);

      // Adjust tip size if needed (IE 1px adjustment bug fix)
      ieAdjust = ($.browser.msie) ? 1 : 0;
      finalStyle.tip.size.width += ieAdjust;
      finalStyle.tip.size.height += ieAdjust;

      // Force even numbers for pixel precision
      if(finalStyle.tip.size.width % 2 > 0) finalStyle.tip.size.width += 1;
      if(finalStyle.tip.size.height % 2 > 0) finalStyle.tip.size.height += 1;

      // Sanitize final styles tip corner value
      if(finalStyle.tip.corner === true)
         finalStyle.tip.corner = (self.options.position.corner.tooltip === 'center') ? false : self.options.position.corner.tooltip;

      return finalStyle;
   };

   // Tip coordinates calculator
   function calculateTip(corner, width, height)
   {
      // Define tip coordinates in terms of height and width values
      var tips = {
         bottomRight:   [[0,0],              [width,height],      [width,0]],
         bottomLeft:    [[0,0],              [width,0],           [0,height]],
         topRight:      [[0,height],         [width,0],           [width,height]],
         topLeft:       [[0,0],              [0,height],          [width,height]],
         topMiddle:     [[0,height],         [width / 2,0],       [width,height]],
         bottomMiddle:  [[0,0],              [width,0],           [width / 2,height]],
         rightMiddle:   [[0,0],              [width,height / 2],  [0,height]],
         leftMiddle:    [[width,0],          [width,height],      [0,height / 2]]
      };
      tips.leftTop = tips.bottomRight;
      tips.rightTop = tips.bottomLeft;
      tips.leftBottom = tips.topRight;
      tips.rightBottom = tips.topLeft;

      return tips[corner];
   };

   // Border coordinates calculator
   function calculateBorders(radius)
   {
      var borders;

      // Use canvas element if supported
      if($('<canvas>').get(0).getContext)
      {
         borders = {
            topLeft: [radius,radius], topRight: [0,radius],
            bottomLeft: [radius,0], bottomRight: [0,0]
         };
      }

      // Canvas not supported - Use VML (IE)
      else if($.browser.msie)
      {
         borders = {
            topLeft: [-90,90,0], topRight: [-90,90,-radius],
            bottomLeft: [90,270,0], bottomRight: [90, 270,-radius]
         };
      };

      return borders;
   };

   // BGIFRAME JQUERY PLUGIN ADAPTION
   //   Special thanks to Brandon Aaron for this plugin
   //   http://plugins.jquery.com/project/bgiframe
   function bgiframe()
   {
      var self, html, dimensions;
      self = this;
      dimensions = self.getDimensions();

      // Setup iframe HTML string
      html = '<iframe class="qtip-bgiframe" frameborder="0" tabindex="-1" src="javascript:false" '+
         'style="display:block; position:absolute; z-index:-1; filter:alpha(opacity=\'0\'); border: 1px solid red; ' +
         'height:'+dimensions.height+'px; width:'+dimensions.width+'px" />';

      // Append the new HTML and setup element reference
      self.elements.bgiframe = self.elements.wrapper.prepend(html).children('.qtip-bgiframe:first');
   };

   // Assign cache and event initialisation on document load
   $(document).ready(function()
   {
      // Setup library cache with window scroll and dimensions of document
      $.fn.qtip.cache = {
         screen: {
            scroll: { left: $(window).scrollLeft(), top: $(window).scrollTop() },
            width: $(window).width(),
            height: $(window).height()
         }
      };

      // Adjust positions of the tooltips on window resize or scroll if enabled
      var adjustTimer;
      $(window).bind('resize scroll', function(event)
      {
         clearTimeout(adjustTimer);
         adjustTimer = setTimeout(function()
         {
            // Readjust cached screen values
            if(event.type === 'scroll')
               $.fn.qtip.cache.screen.scroll = { left: $(window).scrollLeft(), top: $(window).scrollTop() };
            else
            {
               $.fn.qtip.cache.screen.width = $(window).width();
               $.fn.qtip.cache.screen.height = $(window).height();
            };

            for(i = 0; i < $.fn.qtip.interfaces.length; i++)
            {
               // Access current elements API
               var api = $.fn.qtip.interfaces[i];

               // Update position if resize or scroll adjustments are enabled
               if(api.status.rendered === true
               && (api.options.position.type !== 'static'
               || api.options.position.adjust.scroll && event.type === 'scroll'
               || api.options.position.adjust.resize && event.type === 'resize'))
               {
                  // Queue the animation so positions are updated correctly
                  api.updatePosition(event, true);
               }
            };
         }
         , 100);
      })

      // Hide unfocus toolipts on document mousedown
      $(document).bind('mousedown.qtip', function(event)
      {
         if($(event.target).parents('div.qtip').length === 0)
         {
            $('.qtip[unfocus]').each(function()
            {
               var api = $(this).qtip("api");

               // Only hide if its visible and not the tooltips target
               if($(this).is(':visible') && !api.status.disabled
               && $(event.target).add(api.elements.target).length > 1)
                  api.hide(event);
            })
         };
      })
   });

   // Define qTip API interfaces array
   $.fn.qtip.interfaces = []

   // Define log and constant place holders
   $.fn.qtip.log = { error: function(){ return this; } };
   $.fn.qtip.constants = {};

   // Define configuration defaults
   $.fn.qtip.defaults = {
      // Content
      content: {
         prerender: false,
         text: false,
         url: false,
         data: null,
         title: {
            text: false,
            button: false
         }
      },
      // Position
      position: {
         target: false,
         corner: {
            target: 'bottomRight',
            tooltip: 'topLeft'
         },
         adjust: {
            x: 0, y: 0,
            mouse: true,
            screen: false,
            scroll: true,
            resize: true
         },
         type: 'absolute',
         container: false
      },
      // Effects
      show: {
         when: {
            target: false,
            event: 'mouseover'
         },
         effect: {
            type: 'fade',
            length: 100
         },
         delay: 140,
         solo: false,
         ready: false
      },
      hide: {
         when: {
            target: false,
            event: 'mouseout'
         },
         effect: {
            type: 'fade',
            length: 100
         },
         delay: 0,
         fixed: false
      },
      // Callbacks
      api: {
         beforeRender: function(){},
         onRender: function(){},
         beforePositionUpdate: function(){},
         onPositionUpdate: function(){},
         beforeShow: function(){},
         onShow: function(){},
         beforeHide: function(){},
         onHide: function(){},
         beforeContentUpdate: function(){},
         onContentUpdate: function(){},
         beforeContentLoad: function(){},
         onContentLoad: function(){},
         beforeTitleUpdate: function(){},
         onTitleUpdate: function(){},
         beforeDestroy: function(){},
         onDestroy: function(){},
         beforeFocus: function(){},
         onFocus: function(){}
      }
   };

   $.fn.qtip.styles = {
      defaults: {
         background: 'white',
         color: '#111',
         overflow: 'hidden',
         textAlign: 'left',
         width: {
            min: 0,
            max: 250
         },
         padding: '5px 9px',
         border: {
            width: 1,
            radius: 0,
            color: '#d3d3d3'
         },
         tip: {
            corner: false,
            color: false,
            size: { width: 13, height: 13 },
            opacity: 1
         },
         title: {
            background: '#e1e1e1',
            fontWeight: 'bold',
            padding: '7px 12px'
         },
         button: {
            cursor: 'pointer'
         },
         classes: {
            target: '',
            tip: 'qtip-tip',
            title: 'qtip-title',
            button: 'qtip-button',
            content: 'qtip-content',
            active: 'qtip-active'
         }
      },
      cream: {
         border: {
            width: 3,
            radius: 0,
            color: '#F9E98E'
         },
         title: {
            background: '#F0DE7D',
            color: '#A27D35'
         },
         background: '#FBF7AA',
         color: '#A27D35',

         classes: { tooltip: 'qtip-cream' }
      },
      light: {
         border: {
            width: 3,
            radius: 0,
            color: '#E2E2E2'
         },
         title: {
            background: '#f1f1f1',
            color: '#454545'
         },
         background: 'white',
         color: '#454545',

         classes: { tooltip: 'qtip-light' }
      },
      dark: {
         border: {
            width: 3,
            radius: 0,
            color: '#303030'
         },
         title: {
            background: '#404040',
            color: '#f3f3f3'
         },
         background: '#505050',
         color: '#f3f3f3',

         classes: { tooltip: 'qtip-dark' }
      },
      red: {
         border: {
            width: 3,
            radius: 0,
            color: '#CE6F6F'
         },
         title: {
            background: '#f28279',
            color: '#9C2F2F'
         },
         background: '#F79992',
         color: '#9C2F2F',

         classes: { tooltip: 'qtip-red' }
      },
      green: {
         border: {
            width: 3,
            radius: 0,
            color: '#A9DB66'
         },
         title: {
            background: '#b9db8c',
            color: '#58792E'
         },
         background: '#CDE6AC',
         color: '#58792E',

         classes: { tooltip: 'qtip-green' }
      },
      blue: {
         border: {
            width: 3,
            radius: 0,
            color: '#ADD9ED'
         },
         title: {
            background: '#D0E9F5',
            color: '#5E99BD'
         },
         background: '#E5F6FE',
         color: '#4D9FBF',

         classes: { tooltip: 'qtip-blue' }
      }
   };
})(jQuery);
;/* http://keith-wood.name/svg.html
   SVG for jQuery v1.4.5.
   Written by Keith Wood (kbwood{at}iinet.com.au) August 2007.
   Dual licensed under the GPL (http://dev.jquery.com/browser/trunk/jquery/GPL-LICENSE.txt) and
   MIT (http://dev.jquery.com/browser/trunk/jquery/MIT-LICENSE.txt) licenses.
   Please attribute the author if you use it. */

(function($) { // Hide scope, no $ conflict

/* SVG manager.
   Use the singleton instance of this class, $.svg,
   to interact with the SVG functionality. */
function SVGManager() {
	this._settings = []; // Settings to be remembered per SVG object
	this._extensions = []; // List of SVG extensions added to SVGWrapper
		// for each entry [0] is extension name, [1] is extension class (function)
		// the function takes one parameter - the SVGWrapper instance
	this.regional = []; // Localisations, indexed by language, '' for default (English)
	this.regional[''] = {errorLoadingText: 'Error loading',
		notSupportedText: 'This browser does not support SVG'};
	this.local = this.regional['']; // Current localisation
	this._uuid = new Date().getTime();
	this._renesis = detectActiveX('RenesisX.RenesisCtrl');
}

/* Determine whether a given ActiveX control is available.
   @param  classId  (string) the ID for the ActiveX control
   @return  (boolean) true if found, false if not */
function detectActiveX(classId) {
	try {
		return !!(window.ActiveXObject && new ActiveXObject(classId));
	}
	catch (e) {
		return false;
	}
}

var PROP_NAME = 'svgwrapper';

$.extend(SVGManager.prototype, {
	/* Class name added to elements to indicate already configured with SVG. */
	markerClassName: 'hasSVG',

	/* SVG namespace. */
	svgNS: 'http://www.w3.org/2000/svg',
	/* XLink namespace. */
	xlinkNS: 'http://www.w3.org/1999/xlink',

	/* SVG wrapper class. */
	_wrapperClass: SVGWrapper,

	/* Camel-case versions of attribute names containing dashes or are reserved words. */
	_attrNames: {class_: 'class', in_: 'in',
		alignmentBaseline: 'alignment-baseline', baselineShift: 'baseline-shift',
		clipPath: 'clip-path', clipRule: 'clip-rule',
		colorInterpolation: 'color-interpolation',
		colorInterpolationFilters: 'color-interpolation-filters',
		colorRendering: 'color-rendering', dominantBaseline: 'dominant-baseline',
		enableBackground: 'enable-background', fillOpacity: 'fill-opacity',
		fillRule: 'fill-rule', floodColor: 'flood-color',
		floodOpacity: 'flood-opacity', fontFamily: 'font-family',
		fontSize: 'font-size', fontSizeAdjust: 'font-size-adjust',
		fontStretch: 'font-stretch', fontStyle: 'font-style',
		fontVariant: 'font-variant', fontWeight: 'font-weight',
		glyphOrientationHorizontal: 'glyph-orientation-horizontal',
		glyphOrientationVertical: 'glyph-orientation-vertical',
		horizAdvX: 'horiz-adv-x', horizOriginX: 'horiz-origin-x',
		imageRendering: 'image-rendering', letterSpacing: 'letter-spacing',
		lightingColor: 'lighting-color', markerEnd: 'marker-end',
		markerMid: 'marker-mid', markerStart: 'marker-start',
		stopColor: 'stop-color', stopOpacity: 'stop-opacity',
		strikethroughPosition: 'strikethrough-position',
		strikethroughThickness: 'strikethrough-thickness',
		strokeDashArray: 'stroke-dasharray', strokeDashOffset: 'stroke-dashoffset',
		strokeLineCap: 'stroke-linecap', strokeLineJoin: 'stroke-linejoin',
		strokeMiterLimit: 'stroke-miterlimit', strokeOpacity: 'stroke-opacity',
		strokeWidth: 'stroke-width', textAnchor: 'text-anchor',
		textDecoration: 'text-decoration', textRendering: 'text-rendering',
		underlinePosition: 'underline-position', underlineThickness: 'underline-thickness',
		vertAdvY: 'vert-adv-y', vertOriginY: 'vert-origin-y',
		wordSpacing: 'word-spacing', writingMode: 'writing-mode'},

	/* Add the SVG object to its container. */
	_attachSVG: function(container, settings) {
		var svg = (container.namespaceURI == this.svgNS ? container : null);
		var container = (svg ? null : container);
		if ($(container || svg).hasClass(this.markerClassName)) {
			return;
		}
		if (typeof settings == 'string') {
			settings = {loadURL: settings};
		}
		else if (typeof settings == 'function') {
			settings = {onLoad: settings};
		}
		$(container || svg).addClass(this.markerClassName);
		try {
			if (!svg) {
				svg = document.createElementNS(this.svgNS, 'svg');
				svg.setAttribute('version', '1.1');
				if (container.clientWidth > 0) {
					svg.setAttribute('width', container.clientWidth);
				}
				if (container.clientHeight > 0) {
					svg.setAttribute('height', container.clientHeight);
				}
				container.appendChild(svg);
			}
			this._afterLoad(container, svg, settings || {});
		}
		catch (e) {
			if ($.browser.msie) {
				if (!container.id) {
					container.id = 'svg' + (this._uuid++);
				}
				this._settings[container.id] = settings;
				container.innerHTML = '<embed type="image/svg+xml" width="100%" ' +
					'height="100%" src="' + (settings.initPath || '') + 'blank.svg" ' +
					'pluginspage="http://www.adobe.com/svg/viewer/install/main.html"/>';
			}
			else {
				container.innerHTML = '<p class="svg_error">' +
					this.local.notSupportedText + '</p>';
			}
		}
	},

	/* SVG callback after loading - register SVG root. */
	_registerSVG: function() {
		for (var i = 0; i < document.embeds.length; i++) { // Check all
			var container = document.embeds[i].parentNode;
			if (!$(container).hasClass($.svg.markerClassName) || // Not SVG
					$.data(container, PROP_NAME)) { // Already done
				continue;
			}
			var svg = null;
			try {
				svg = document.embeds[i].getSVGDocument();
			}
			catch(e) {
				setTimeout($.svg._registerSVG, 250); // Renesis takes longer to load
				return;
			}
			svg = (svg ? svg.documentElement : null);
			if (svg) {
				$.svg._afterLoad(container, svg);
			}
		}
	},

	/* Post-processing once loaded. */
	_afterLoad: function(container, svg, settings) {
		var settings = settings || this._settings[container.id];
		this._settings[container ? container.id : ''] = null;
		var wrapper = new this._wrapperClass(svg, container);
		$.data(container || svg, PROP_NAME, wrapper);
		try {
			if (settings.loadURL) { // Load URL
				wrapper.load(settings.loadURL, settings);
			}
			if (settings.settings) { // Additional settings
				wrapper.configure(settings.settings);
			}
			if (settings.onLoad && !settings.loadURL) { // Onload callback
				settings.onLoad.apply(container || svg, [wrapper]);
			}
		}
		catch (e) {
			alert(e);
		}
	},

	/* Return the SVG wrapper created for a given container.
	   @param  container  (string) selector for the container or
	                      (element) the container for the SVG object or
	                      jQuery collection - first entry is the container
	   @return  (SVGWrapper) the corresponding SVG wrapper element, or null if not attached */
	_getSVG: function(container) {
		container = (typeof container == 'string' ? $(container)[0] :
			(container.jquery ? container[0] : container));
		return $.data(container, PROP_NAME);
	},

	/* Remove the SVG functionality from a div.
	   @param  container  (element) the container for the SVG object */
	_destroySVG: function(container) {
		var $container = $(container);
		if (!$container.hasClass(this.markerClassName)) {
			return;
		}
		$container.removeClass(this.markerClassName);
		if (container.namespaceURI != this.svgNS) {
			$container.empty();
		}
		$.removeData(container, PROP_NAME);
	},

	/* Extend the SVGWrapper object with an embedded class.
	   The constructor function must take a single parameter that is
	   a reference to the owning SVG root object. This allows the
	   extension to access the basic SVG functionality.
	   @param  name      (string) the name of the SVGWrapper attribute to access the new class
	   @param  extClass  (function) the extension class constructor */
	addExtension: function(name, extClass) {
		this._extensions.push([name, extClass]);
	},

	/* Does this node belong to SVG?
	   @param  node  (element) the node to be tested
	   @return  (boolean) true if an SVG node, false if not */
	isSVGElem: function(node) {
		return (node.nodeType == 1 && node.namespaceURI == $.svg.svgNS);
	}
});

/* The main SVG interface, which encapsulates the SVG element.
   Obtain a reference from $().svg('get') */
function SVGWrapper(svg, container) {
	this._svg = svg; // The SVG root node
	this._container = container; // The containing div
	for (var i = 0; i < $.svg._extensions.length; i++) {
		var extension = $.svg._extensions[i];
		this[extension[0]] = new extension[1](this);
	}
}

$.extend(SVGWrapper.prototype, {

	/* Retrieve the width of the SVG object. */
	_width: function() {
		return (this._container ? this._container.clientWidth : this._svg.width);
	},

	/* Retrieve the height of the SVG object. */
	_height: function() {
		return (this._container ? this._container.clientHeight : this._svg.height);
	},

	/* Retrieve the root SVG element.
	   @return  the top-level SVG element */
	root: function() {
		return this._svg;
	},

	/* Configure a SVG node.
	   @param  node      (element, optional) the node to configure
	   @param  settings  (object) additional settings for the root
	   @param  clear     (boolean) true to remove existing attributes first,
	                     false to add to what is already there (optional)
	   @return  (SVGWrapper) this root */
	configure: function(node, settings, clear) {
		if (!node.nodeName) {
			clear = settings;
			settings = node;
			node = this._svg;
		}
		if (clear) {
			for (var i = node.attributes.length - 1; i >= 0; i--) {
				var attr = node.attributes.item(i);
				if (!(attr.nodeName == 'onload' || attr.nodeName == 'version' ||
						attr.nodeName.substring(0, 5) == 'xmlns')) {
					node.attributes.removeNamedItem(attr.nodeName);
				}
			}
		}
		for (var attrName in settings) {
			node.setAttribute($.svg._attrNames[attrName] || attrName, settings[attrName]);
		}
		return this;
	},

	/* Locate a specific element in the SVG document.
	   @param  id  (string) the element's identifier
	   @return  (element) the element reference, or null if not found */
	getElementById: function(id) {
		return this._svg.ownerDocument.getElementById(id);
	},

	/* Change the attributes for a SVG node.
	   @param  element   (SVG element) the node to change
	   @param  settings  (object) the new settings
	   @return  (SVGWrapper) this root */
	change: function(element, settings) {
		if (element) {
			for (var name in settings) {
				if (settings[name] == null) {
					element.removeAttribute($.svg._attrNames[name] || name);
				}
				else {
					element.setAttribute($.svg._attrNames[name] || name, settings[name]);
				}
			}
		}
		return this;
	},

	/* Check for parent being absent and adjust arguments accordingly. */
	_args: function(values, names, optSettings) {
		names.splice(0, 0, 'parent');
		names.splice(names.length, 0, 'settings');
		var args = {};
		var offset = 0;
		if (values[0] != null && values[0].jquery) {
			values[0] = values[0][0];
		}
		if (values[0] != null && !(typeof values[0] == 'object' && values[0].nodeName)) {
			args['parent'] = null;
			offset = 1;
		}
		for (var i = 0; i < values.length; i++) {
			args[names[i + offset]] = values[i];
		}
		if (optSettings) {
			$.each(optSettings, function(i, value) {
				if (typeof args[value] == 'object') {
					args.settings = args[value];
					args[value] = null;
				}
			});
		}
		return args;
	},

	/* Add a title.
	   @param  parent    (element or jQuery) the parent node for the new title (optional)
	   @param  text      (string) the text of the title
	   @param  settings  (object) additional settings for the title (optional)
	   @return  (element) the new title node */
	title: function(parent, text, settings) {
		var args = this._args(arguments, ['text']);
		var node = this._makeNode(args.parent, 'title', args.settings || {});
		node.appendChild(this._svg.ownerDocument.createTextNode(args.text));
		return node;
	},

	/* Add a description.
	   @param  parent    (element or jQuery) the parent node for the new description (optional)
	   @param  text      (string) the text of the description
	   @param  settings  (object) additional settings for the description (optional)
	   @return  (element) the new description node */
	describe: function(parent, text, settings) {
		var args = this._args(arguments, ['text']);
		var node = this._makeNode(args.parent, 'desc', args.settings || {});
		node.appendChild(this._svg.ownerDocument.createTextNode(args.text));
		return node;
	},

	/* Add a definitions node.
	   @param  parent    (element or jQuery) the parent node for the new definitions (optional)
	   @param  id        (string) the ID of this definitions (optional)
	   @param  settings  (object) additional settings for the definitions (optional)
	   @return  (element) the new definitions node */
	defs: function(parent, id, settings) {
		var args = this._args(arguments, ['id'], ['id']);
		return this._makeNode(args.parent, 'defs', $.extend(
			(args.id ? {id: args.id} : {}), args.settings || {}));
	},

	/* Add a symbol definition.
	   @param  parent    (element or jQuery) the parent node for the new symbol (optional)
	   @param  id        (string) the ID of this symbol
	   @param  x1        (number) the left coordinate for this symbol
	   @param  y1        (number) the top coordinate for this symbol
	   @param  width     (number) the width of this symbol
	   @param  height    (number) the height of this symbol
	   @param  settings  (object) additional settings for the symbol (optional)
	   @return  (element) the new symbol node */
	symbol: function(parent, id, x1, y1, width, height, settings) {
		var args = this._args(arguments, ['id', 'x1', 'y1', 'width', 'height']);
		return this._makeNode(args.parent, 'symbol', $.extend({id: args.id,
			viewBox: args.x1 + ' ' + args.y1 + ' ' + args.width + ' ' + args.height},
			args.settings || {}));
	},

	/* Add a marker definition.
	   @param  parent    (element or jQuery) the parent node for the new marker (optional)
	   @param  id        (string) the ID of this marker
	   @param  refX      (number) the x-coordinate for the reference point
	   @param  refY      (number) the y-coordinate for the reference point
	   @param  mWidth    (number) the marker viewport width
	   @param  mHeight   (number) the marker viewport height
	   @param  orient    (string or int) 'auto' or angle (degrees) (optional)
	   @param  settings  (object) additional settings for the marker (optional)
	   @return  (element) the new marker node */
	marker: function(parent, id, refX, refY, mWidth, mHeight, orient, settings) {
		var args = this._args(arguments, ['id', 'refX', 'refY',
			'mWidth', 'mHeight', 'orient'], ['orient']);
		return this._makeNode(args.parent, 'marker', $.extend(
			{id: args.id, refX: args.refX, refY: args.refY, markerWidth: args.mWidth,
			markerHeight: args.mHeight, orient: args.orient || 'auto'}, args.settings || {}));
	},

	/* Add a style node.
	   @param  parent    (element or jQuery) the parent node for the new node (optional)
	   @param  styles    (string) the CSS styles
	   @param  settings  (object) additional settings for the node (optional)
	   @return  (element) the new style node */
	style: function(parent, styles, settings) {
		var args = this._args(arguments, ['styles']);
		var node = this._makeNode(args.parent, 'style', $.extend(
			{type: 'text/css'}, args.settings || {}));
		node.appendChild(this._svg.ownerDocument.createTextNode(args.styles));
		if ($.browser.opera) {
			$('head').append('<style type="text/css">' + args.styles + '</style>');
		}
		return node;
	},

	/* Add a script node.
	   @param  parent    (element or jQuery) the parent node for the new node (optional)
	   @param  script    (string) the JavaScript code
	   @param  type      (string) the MIME type for the code (optional, default 'text/javascript')
	   @param  settings  (object) additional settings for the node (optional)
	   @return  (element) the new script node */
	script: function(parent, script, type, settings) {
		var args = this._args(arguments, ['script', 'type'], ['type']);
		var node = this._makeNode(args.parent, 'script', $.extend(
			{type: args.type || 'text/javascript'}, args.settings || {}));
		node.appendChild(this._svg.ownerDocument.createTextNode(args.script));
		if (!$.browser.mozilla) {
			$.globalEval(args.script);
		}
		return node;
	},

	/* Add a linear gradient definition.
	   Specify all of x1, y1, x2, y2 or none of them.
	   @param  parent    (element or jQuery) the parent node for the new gradient (optional)
	   @param  id        (string) the ID for this gradient
	   @param  stops     (string[][]) the gradient stops, each entry is
	                     [0] is offset (0.0-1.0 or 0%-100%), [1] is colour,
						 [2] is opacity (optional)
	   @param  x1        (number) the x-coordinate of the gradient start (optional)
	   @param  y1        (number) the y-coordinate of the gradient start (optional)
	   @param  x2        (number) the x-coordinate of the gradient end (optional)
	   @param  y2        (number) the y-coordinate of the gradient end (optional)
	   @param  settings  (object) additional settings for the gradient (optional)
	   @return  (element) the new gradient node */
	linearGradient: function(parent, id, stops, x1, y1, x2, y2, settings) {
		var args = this._args(arguments,
			['id', 'stops', 'x1', 'y1', 'x2', 'y2'], ['x1']);
		var sets = $.extend({id: args.id},
			(args.x1 != null ? {x1: args.x1, y1: args.y1, x2: args.x2, y2: args.y2} : {}));
		return this._gradient(args.parent, 'linearGradient',
			$.extend(sets, args.settings || {}), args.stops);
	},

	/* Add a radial gradient definition.
	   Specify all of cx, cy, r, fx, fy or none of them.
	   @param  parent    (element or jQuery) the parent node for the new gradient (optional)
	   @param  id        (string) the ID for this gradient
	   @param  stops     (string[][]) the gradient stops, each entry
	                     [0] is offset, [1] is colour, [2] is opacity (optional)
	   @param  cx        (number) the x-coordinate of the largest circle centre (optional)
	   @param  cy        (number) the y-coordinate of the largest circle centre (optional)
	   @param  r         (number) the radius of the largest circle (optional)
	   @param  fx        (number) the x-coordinate of the gradient focus (optional)
	   @param  fy        (number) the y-coordinate of the gradient focus (optional)
	   @param  settings  (object) additional settings for the gradient (optional)
	   @return  (element) the new gradient node */
	radialGradient: function(parent, id, stops, cx, cy, r, fx, fy, settings) {
		var args = this._args(arguments,
			['id', 'stops', 'cx', 'cy', 'r', 'fx', 'fy'], ['cx']);
		var sets = $.extend({id: args.id}, (args.cx != null ?
			{cx: args.cx, cy: args.cy, r: args.r, fx: args.fx, fy: args.fy} : {}));
		return this._gradient(args.parent, 'radialGradient',
			$.extend(sets, args.settings || {}), args.stops);
	},

	/* Add a gradient node. */
	_gradient: function(parent, name, settings, stops) {
		var node = this._makeNode(parent, name, settings);
		for (var i = 0; i < stops.length; i++) {
			var stop = stops[i];
			this._makeNode(node, 'stop', $.extend(
				{offset: stop[0], stopColor: stop[1]},
				(stop[2] != null ? {stopOpacity: stop[2]} : {})));
		}
		return node;
	},

	/* Add a pattern definition.
	   Specify all of vx, vy, xwidth, vheight or none of them.
	   @param  parent    (element or jQuery) the parent node for the new pattern (optional)
	   @param  id        (string) the ID for this pattern
	   @param  x         (number) the x-coordinate for the left edge of the pattern
	   @param  y         (number) the y-coordinate for the top edge of the pattern
	   @param  width     (number) the width of the pattern
	   @param  height    (number) the height of the pattern
	   @param  vx        (number) the minimum x-coordinate for view box (optional)
	   @param  vy        (number) the minimum y-coordinate for the view box (optional)
	   @param  vwidth    (number) the width of the view box (optional)
	   @param  vheight   (number) the height of the view box (optional)
	   @param  settings  (object) additional settings for the pattern (optional)
	   @return  (element) the new pattern node */
	pattern: function(parent, id, x, y, width, height, vx, vy, vwidth, vheight, settings) {
		var args = this._args(arguments, ['id', 'x', 'y', 'width', 'height',
			'vx', 'vy', 'vwidth', 'vheight'], ['vx']);
		var sets = $.extend({id: args.id, x: args.x, y: args.y,
			width: args.width, height: args.height}, (args.vx != null ?
			{viewBox: args.vx + ' ' + args.vy + ' ' + args.vwidth + ' ' + args.vheight} : {}));
		return this._makeNode(args.parent, 'pattern', $.extend(sets, args.settings || {}));
	},

	/* Add a clip path definition.
	   @param  parent  (element) the parent node for the new element (optional)
	   @param  id      (string) the ID for this path
	   @param  units   (string) either 'userSpaceOnUse' (default) or 'objectBoundingBox' (optional)
	   @return  (element) the new clipPath node */
	clipPath: function(parent, id, units, settings) {
		var args = this._args(arguments, ['id', 'units']);
		args.units = args.units || 'userSpaceOnUse';
		return this._makeNode(args.parent, 'clipPath', $.extend(
			{id: args.id, clipPathUnits: args.units}, args.settings || {}));
	},

	/* Add a mask definition.
	   @param  parent    (element or jQuery) the parent node for the new mask (optional)
	   @param  id        (string) the ID for this mask
	   @param  x         (number) the x-coordinate for the left edge of the mask
	   @param  y         (number) the y-coordinate for the top edge of the mask
	   @param  width     (number) the width of the mask
	   @param  height    (number) the height of the mask
	   @param  settings  (object) additional settings for the mask (optional)
	   @return  (element) the new mask node */
	mask: function(parent, id, x, y, width, height, settings) {
		var args = this._args(arguments, ['id', 'x', 'y', 'width', 'height']);
		return this._makeNode(args.parent, 'mask', $.extend(
			{id: args.id, x: args.x, y: args.y, width: args.width, height: args.height},
			args.settings || {}));
	},

	/* Create a new path object.
	   @return  (SVGPath) a new path object */
	createPath: function() {
		return new SVGPath();
	},

	/* Create a new text object.
	   @return  (SVGText) a new text object */
	createText: function() {
		return new SVGText();
	},

	/* Add an embedded SVG element.
	   Specify all of vx, vy, vwidth, vheight or none of them.
	   @param  parent    (element or jQuery) the parent node for the new node (optional)
	   @param  x         (number) the x-coordinate for the left edge of the node
	   @param  y         (number) the y-coordinate for the top edge of the node
	   @param  width     (number) the width of the node
	   @param  height    (number) the height of the node
	   @param  vx        (number) the minimum x-coordinate for view box (optional)
	   @param  vy        (number) the minimum y-coordinate for the view box (optional)
	   @param  vwidth    (number) the width of the view box (optional)
	   @param  vheight   (number) the height of the view box (optional)
	   @param  settings  (object) additional settings for the node (optional)
	   @return  (element) the new node */
	svg: function(parent, x, y, width, height, vx, vy, vwidth, vheight, settings) {
		var args = this._args(arguments, ['x', 'y', 'width', 'height',
			'vx', 'vy', 'vwidth', 'vheight'], ['vx']);
		var sets = $.extend({x: args.x, y: args.y, width: args.width, height: args.height},
			(args.vx != null ? {viewBox: args.vx + ' ' + args.vy + ' ' +
			args.vwidth + ' ' + args.vheight} : {}));
		return this._makeNode(args.parent, 'svg', $.extend(sets, args.settings || {}));
	},

	/* Create a group.
	   @param  parent    (element or jQuery) the parent node for the new group (optional)
	   @param  id        (string) the ID of this group (optional)
	   @param  settings  (object) additional settings for the group (optional)
	   @return  (element) the new group node */
	group: function(parent, id, settings) {
		var args = this._args(arguments, ['id'], ['id']);
		return this._makeNode(args.parent, 'g', $.extend({id: args.id}, args.settings || {}));
	},

	/* Add a usage reference.
	   Specify all of x, y, width, height or none of them.
	   @param  parent    (element or jQuery) the parent node for the new node (optional)
	   @param  x         (number) the x-coordinate for the left edge of the node (optional)
	   @param  y         (number) the y-coordinate for the top edge of the node (optional)
	   @param  width     (number) the width of the node (optional)
	   @param  height    (number) the height of the node (optional)
	   @param  ref       (string) the ID of the definition node
	   @param  settings  (object) additional settings for the node (optional)
	   @return  (element) the new node */
	use: function(parent, x, y, width, height, ref, settings) {
		var args = this._args(arguments, ['x', 'y', 'width', 'height', 'ref']);
		if (typeof args.x == 'string') {
			args.ref = args.x;
			args.settings = args.y;
			args.x = args.y = args.width = args.height = null;
		}
		var node = this._makeNode(args.parent, 'use', $.extend(
			{x: args.x, y: args.y, width: args.width, height: args.height},
			args.settings || {}));
		node.setAttributeNS($.svg.xlinkNS, 'href', args.ref);
		return node;
	},

	/* Add a link, which applies to all child elements.
	   @param  parent    (element or jQuery) the parent node for the new link (optional)
	   @param  ref       (string) the target URL
	   @param  settings  (object) additional settings for the link (optional)
	   @return  (element) the new link node */
	link: function(parent, ref, settings) {
		var args = this._args(arguments, ['ref']);
		var node = this._makeNode(args.parent, 'a', args.settings);
		node.setAttributeNS($.svg.xlinkNS, 'href', args.ref);
		return node;
	},

	/* Add an image.
	   @param  parent    (element or jQuery) the parent node for the new image (optional)
	   @param  x         (number) the x-coordinate for the left edge of the image
	   @param  y         (number) the y-coordinate for the top edge of the image
	   @param  width     (number) the width of the image
	   @param  height    (number) the height of the image
	   @param  ref       (string) the path to the image
	   @param  settings  (object) additional settings for the image (optional)
	   @return  (element) the new image node */
	image: function(parent, x, y, width, height, ref, settings) {
		var args = this._args(arguments, ['x', 'y', 'width', 'height', 'ref']);
		var node = this._makeNode(args.parent, 'image', $.extend(
			{x: args.x, y: args.y, width: args.width, height: args.height},
			args.settings || {}));
		node.setAttributeNS($.svg.xlinkNS, 'href', args.ref);
		return node;
	},

	/* Draw a path.
	   @param  parent    (element or jQuery) the parent node for the new shape (optional)
	   @param  path      (string or SVGPath) the path to draw
	   @param  settings  (object) additional settings for the shape (optional)
	   @return  (element) the new shape node */
	path: function(parent, path, settings) {
		var args = this._args(arguments, ['path']);
		return this._makeNode(args.parent, 'path', $.extend(
			{d: (args.path.path ? args.path.path() : args.path)}, args.settings || {}));
	},

	/* Draw a rectangle.
	   Specify both of rx and ry or neither.
	   @param  parent    (element or jQuery) the parent node for the new shape (optional)
	   @param  x         (number) the x-coordinate for the left edge of the rectangle
	   @param  y         (number) the y-coordinate for the top edge of the rectangle
	   @param  width     (number) the width of the rectangle
	   @param  height    (number) the height of the rectangle
	   @param  rx        (number) the x-radius of the ellipse for the rounded corners (optional)
	   @param  ry        (number) the y-radius of the ellipse for the rounded corners (optional)
	   @param  settings  (object) additional settings for the shape (optional)
	   @return  (element) the new shape node */
	rect: function(parent, x, y, width, height, rx, ry, settings) {
		var args = this._args(arguments, ['x', 'y', 'width', 'height', 'rx', 'ry'], ['rx']);
		return this._makeNode(args.parent, 'rect', $.extend(
			{x: args.x, y: args.y, width: args.width, height: args.height},
			(args.rx ? {rx: args.rx, ry: args.ry} : {}), args.settings || {}));
	},

	/* Draw a circle.
	   @param  parent    (element or jQuery) the parent node for the new shape (optional)
	   @param  cx        (number) the x-coordinate for the centre of the circle
	   @param  cy        (number) the y-coordinate for the centre of the circle
	   @param  r         (number) the radius of the circle
	   @param  settings  (object) additional settings for the shape (optional)
	   @return  (element) the new shape node */
	circle: function(parent, cx, cy, r, settings) {
		var args = this._args(arguments, ['cx', 'cy', 'r']);
		return this._makeNode(args.parent, 'circle', $.extend(
			{cx: args.cx, cy: args.cy, r: args.r}, args.settings || {}));
	},

	/* Draw an ellipse.
	   @param  parent    (element or jQuery) the parent node for the new shape (optional)
	   @param  cx        (number) the x-coordinate for the centre of the ellipse
	   @param  cy        (number) the y-coordinate for the centre of the ellipse
	   @param  rx        (number) the x-radius of the ellipse
	   @param  ry        (number) the y-radius of the ellipse
	   @param  settings  (object) additional settings for the shape (optional)
	   @return  (element) the new shape node */
	ellipse: function(parent, cx, cy, rx, ry, settings) {
		var args = this._args(arguments, ['cx', 'cy', 'rx', 'ry']);
		return this._makeNode(args.parent, 'ellipse', $.extend(
			{cx: args.cx, cy: args.cy, rx: args.rx, ry: args.ry}, args.settings || {}));
	},

	/* Draw a line.
	   @param  parent    (element or jQuery) the parent node for the new shape (optional)
	   @param  x1        (number) the x-coordinate for the start of the line
	   @param  y1        (number) the y-coordinate for the start of the line
	   @param  x2        (number) the x-coordinate for the end of the line
	   @param  y2        (number) the y-coordinate for the end of the line
	   @param  settings  (object) additional settings for the shape (optional)
	   @return  (element) the new shape node */
	line: function(parent, x1, y1, x2, y2, settings) {
		var args = this._args(arguments, ['x1', 'y1', 'x2', 'y2']);
		return this._makeNode(args.parent, 'line', $.extend(
			{x1: args.x1, y1: args.y1, x2: args.x2, y2: args.y2}, args.settings || {}));
	},

	/* Draw a polygonal line.
	   @param  parent    (element or jQuery) the parent node for the new shape (optional)
	   @param  points    (number[][]) the x-/y-coordinates for the points on the line
	   @param  settings  (object) additional settings for the shape (optional)
	   @return  (element) the new shape node */
	polyline: function(parent, points, settings) {
		var args = this._args(arguments, ['points']);
		return this._poly(args.parent, 'polyline', args.points, args.settings);
	},

	/* Draw a polygonal shape.
	   @param  parent    (element or jQuery) the parent node for the new shape (optional)
	   @param  points    (number[][]) the x-/y-coordinates for the points on the shape
	   @param  settings  (object) additional settings for the shape (optional)
	   @return  (element) the new shape node */
	polygon: function(parent, points, settings) {
		var args = this._args(arguments, ['points']);
		return this._poly(args.parent, 'polygon', args.points, args.settings);
	},

	/* Draw a polygonal line or shape. */
	_poly: function(parent, name, points, settings) {
		var ps = '';
		for (var i = 0; i < points.length; i++) {
			ps += points[i].join() + ' ';
		}
		return this._makeNode(parent, name, $.extend(
			{points: $.trim(ps)}, settings || {}));
	},

	/* Draw text.
	   Specify both of x and y or neither of them.
	   @param  parent    (element or jQuery) the parent node for the text (optional)
	   @param  x         (number or number[]) the x-coordinate(s) for the text (optional)
	   @param  y         (number or number[]) the y-coordinate(s) for the text (optional)
	   @param  value     (string) the text content or
	                     (SVGText) text with spans and references
	   @param  settings  (object) additional settings for the text (optional)
	   @return  (element) the new text node */
	text: function(parent, x, y, value, settings) {
		var args = this._args(arguments, ['x', 'y', 'value']);
		if (typeof args.x == 'string' && arguments.length < 4) {
			args.value = args.x;
			args.settings = args.y;
			args.x = args.y = null;
		}
		return this._text(args.parent, 'text', args.value, $.extend(
			{x: (args.x && isArray(args.x) ? args.x.join(' ') : args.x),
			y: (args.y && isArray(args.y) ? args.y.join(' ') : args.y)},
			args.settings || {}));
	},

	/* Draw text along a path.
	   @param  parent    (element or jQuery) the parent node for the text (optional)
	   @param  path      (string) the ID of the path
	   @param  value     (string) the text content or
	                     (SVGText) text with spans and references
	   @param  settings  (object) additional settings for the text (optional)
	   @return  (element) the new text node */
	textpath: function(parent, path, value, settings) {
		var args = this._args(arguments, ['path', 'value']);
		var node = this._text(args.parent, 'textPath', args.value, args.settings || {});
		node.setAttributeNS($.svg.xlinkNS, 'href', args.path);
		return node;
	},

	/* Draw text. */
	_text: function(parent, name, value, settings) {
		var node = this._makeNode(parent, name, settings);
		if (typeof value == 'string') {
			node.appendChild(node.ownerDocument.createTextNode(value));
		}
		else {
			for (var i = 0; i < value._parts.length; i++) {
				var part = value._parts[i];
				if (part[0] == 'tspan') {
					var child = this._makeNode(node, part[0], part[2]);
					child.appendChild(node.ownerDocument.createTextNode(part[1]));
					node.appendChild(child);
				}
				else if (part[0] == 'tref') {
					var child = this._makeNode(node, part[0], part[2]);
					child.setAttributeNS($.svg.xlinkNS, 'href', part[1]);
					node.appendChild(child);
				}
				else if (part[0] == 'textpath') {
					var set = $.extend({}, part[2]);
					set.href = null;
					var child = this._makeNode(node, part[0], set);
					child.setAttributeNS($.svg.xlinkNS, 'href', part[2].href);
					child.appendChild(node.ownerDocument.createTextNode(part[1]));
					node.appendChild(child);
				}
				else { // straight text
					node.appendChild(node.ownerDocument.createTextNode(part[1]));
				}
			}
		}
		return node;
	},

	/* Add a custom SVG element.
	   @param  parent    (element or jQuery) the parent node for the new element (optional)
	   @param  name      (string) the name of the element
	   @param  settings  (object) additional settings for the element (optional)
	   @return  (element) the new custom node */
	other: function(parent, name, settings) {
		var args = this._args(arguments, ['name']);
		return this._makeNode(args.parent, args.name, args.settings || {});
	},

	/* Create a shape node with the given settings. */
	_makeNode: function(parent, name, settings) {
		parent = parent || this._svg;
		var node = this._svg.ownerDocument.createElementNS($.svg.svgNS, name);
		for (var name in settings) {
			var value = settings[name];
			if (value != null && value != null &&
					(typeof value != 'string' || value != '')) {
				node.setAttribute($.svg._attrNames[name] || name, value);
			}
		}
		parent.appendChild(node);
		return node;
	},

	/* Add an existing SVG node to the diagram.
	   @param  parent  (element or jQuery) the parent node for the new node (optional)
	   @param  node    (element) the new node to add or
	                   (string) the jQuery selector for the node or
	                   (jQuery collection) set of nodes to add
	   @return  (SVGWrapper) this wrapper */
	add: function(parent, node) {
		var args = this._args((arguments.length == 1 ? [null, parent] : arguments), ['node']);
		var svg = this;
		args.parent = args.parent || this._svg;
		args.node = (args.node.jquery ? args.node : $(args.node));
		try {
			if ($.svg._renesis) {
				throw 'Force traversal';
			}
			args.parent.appendChild(args.node.cloneNode(true));
		}
		catch (e) {
			args.node.each(function() {
				var child = svg._cloneAsSVG(this);
				if (child) {
					args.parent.appendChild(child);
				}
			});
		}
		return this;
	},

	/* Clone an existing SVG node and add it to the diagram.
	   @param  parent  (element or jQuery) the parent node for the new node (optional)
	   @param  node    (element) the new node to add or
	                   (string) the jQuery selector for the node or
	                   (jQuery collection) set of nodes to add
	   @return  (element[]) collection of new nodes */
	clone: function(parent, node) {
		var svg = this;
		var args = this._args((arguments.length == 1 ? [null, parent] : arguments), ['node']);
		args.parent = args.parent || this._svg;
		args.node = (args.node.jquery ? args.node : $(args.node));
		var newNodes = [];
		args.node.each(function() {
			var child = svg._cloneAsSVG(this);
			if (child) {
				child.id = '';
				args.parent.appendChild(child);
				newNodes.push(child);
			}
		});
		return newNodes;
	},

	/* SVG nodes must belong to the SVG namespace, so clone and ensure this is so.
	   @param  node  (element) the SVG node to clone
	   @return  (element) the cloned node */
	_cloneAsSVG: function(node) {
		var newNode = null;
		if (node.nodeType == 1) { // element
			newNode = this._svg.ownerDocument.createElementNS(
				$.svg.svgNS, this._checkName(node.nodeName));
			for (var i = 0; i < node.attributes.length; i++) {
				var attr = node.attributes.item(i);
				if (attr.nodeName != 'xmlns' && attr.nodeValue) {
					if (attr.prefix == 'xlink') {
						newNode.setAttributeNS($.svg.xlinkNS,
							attr.localName || attr.baseName, attr.nodeValue);
					}
					else {
						newNode.setAttribute(this._checkName(attr.nodeName), attr.nodeValue);
					}
				}
			}
			for (var i = 0; i < node.childNodes.length; i++) {
				var child = this._cloneAsSVG(node.childNodes[i]);
				if (child) {
					newNode.appendChild(child);
				}
			}
		}
		else if (node.nodeType == 3) { // text
			if ($.trim(node.nodeValue)) {
				newNode = this._svg.ownerDocument.createTextNode(node.nodeValue);
			}
		}
		else if (node.nodeType == 4) { // CDATA
			if ($.trim(node.nodeValue)) {
				try {
					newNode = this._svg.ownerDocument.createCDATASection(node.nodeValue);
				}
				catch (e) {
					newNode = this._svg.ownerDocument.createTextNode(
						node.nodeValue.replace(/&/g, '&amp;').
						replace(/</g, '&lt;').replace(/>/g, '&gt;'));
				}
			}
		}
		return newNode;
	},

	/* Node names must be lower case and without SVG namespace prefix. */
	_checkName: function(name) {
		name = (name.substring(0, 1) >= 'A' && name.substring(0, 1) <= 'Z' ?
			name.toLowerCase() : name);
		return (name.substring(0, 4) == 'svg:' ? name.substring(4) : name);
	},

	/* Load an external SVG document.
	   @param  url       (string) the location of the SVG document or
	                     the actual SVG content
	   @param  settings  (boolean) see addTo below or
	                     (function) see onLoad below or
	                     (object) additional settings for the load with attributes below:
	                       addTo       (boolean) true to add to what's already there,
	                                   or false to clear the canvas first
						   changeSize  (boolean) true to allow the canvas size to change,
	                                   or false to retain the original
	                       onLoad      (function) callback after the document has loaded,
	                                   'this' is the container, receives SVG object and
	                                   optional error message as a parameter
	                       parent      (string or element or jQuery) the parent to load
	                                   into, defaults to top-level svg element
	   @return  (SVGWrapper) this root */
	load: function(url, settings) {
		settings = (typeof settings == 'boolean' ? {addTo: settings} :
			(typeof settings == 'function' ? {onLoad: settings} :
			(typeof settings == 'string' ? {parent: settings} :
			(typeof settings == 'object' && settings.nodeName ? {parent: settings} :
			(typeof settings == 'object' && settings.jquery ? {parent: settings} :
			settings || {})))));
		if (!settings.parent && !settings.addTo) {
			this.clear(false);
		}
		var size = [this._svg.getAttribute('width'), this._svg.getAttribute('height')];
		var wrapper = this;
		// Report a problem with the load
		var reportError = function(message) {
			message = $.svg.local.errorLoadingText + ': ' + message;
			if (settings.onLoad) {
				settings.onLoad.apply(wrapper._container || wrapper._svg, [wrapper, message]);
			}
			else {
				wrapper.text(null, 10, 20, message);
			}
		};
		// Create a DOM from SVG content
		var loadXML4IE = function(data) {
			var xml = new ActiveXObject('Microsoft.XMLDOM');
			xml.validateOnParse = false;
			xml.resolveExternals = false;
			xml.async = false;
			xml.loadXML(data);
			if (xml.parseError.errorCode != 0) {
				reportError(xml.parseError.reason);
				return null;
			}
			return xml;
		};
		// Load the SVG DOM
		var loadSVG = function(data) {
			if (!data) {
				return;
			}
			if (data.documentElement.nodeName != 'svg') {
				var errors = data.getElementsByTagName('parsererror');
				var messages = (errors.length ? errors[0].getElementsByTagName('div') : []); // Safari
				reportError(!errors.length ? '???' :
					(messages.length ? messages[0] : errors[0]).firstChild.nodeValue);
				return;
			}
			var parent = (settings.parent ? $(settings.parent)[0] : wrapper._svg);
			var attrs = {};
			for (var i = 0; i < data.documentElement.attributes.length; i++) {
				var attr = data.documentElement.attributes.item(i);
				if (!(attr.nodeName == 'version' || attr.nodeName.substring(0, 5) == 'xmlns')) {
					attrs[attr.nodeName] = attr.nodeValue;
				}
			}
			wrapper.configure(parent, attrs, !settings.parent);
			var nodes = data.documentElement.childNodes;
			for (var i = 0; i < nodes.length; i++) {
				try {
					if ($.svg._renesis) {
						throw 'Force traversal';
					}
					parent.appendChild(wrapper._svg.ownerDocument.importNode(nodes[i], true));
					if (nodes[i].nodeName == 'script') {
						$.globalEval(nodes[i].textContent);
					}
				}
				catch (e) {
					wrapper.add(parent, nodes[i]);
				}
			}
			if (!settings.changeSize) {
				wrapper.configure(parent, {width: size[0], height: size[1]});
			}
			if (settings.onLoad) {
				settings.onLoad.apply(wrapper._container || wrapper._svg, [wrapper]);
			}
		};
		if (url.match('<svg')) { // Inline SVG
			loadSVG($.browser.msie ? loadXML4IE(url) :
				new DOMParser().parseFromString(url, 'text/xml'));
		}
		else { // Remote SVG
			$.ajax({url: url, dataType: ($.browser.msie ? 'text' : 'xml'),
				success: function(xml) {
					loadSVG($.browser.msie ? loadXML4IE(xml) : xml);
				}, error: function(http, message, exc) {
					reportError(message + (exc ? ' ' + exc.message : ''));
				}});
		}
		return this;
	},

	/* Delete a specified node.
	   @param  node  (element or jQuery) the drawing node to remove
	   @return  (SVGWrapper) this root */
	remove: function(node) {
		node = (node.jquery ? node[0] : node);
		node.parentNode.removeChild(node);
		return this;
	},

	/* Delete everything in the current document.
	   @param  attrsToo  (boolean) true to clear any root attributes as well,
	                     false to leave them (optional)
	   @return  (SVGWrapper) this root */
	clear: function(attrsToo) {
		if (attrsToo) {
			this.configure({}, true);
		}
		while (this._svg.firstChild) {
			this._svg.removeChild(this._svg.firstChild);
		}
		return this;
	},

	/* Serialise the current diagram into an SVG text document.
	   @param  node  (SVG element) the starting node (optional)
	   @return  (string) the SVG as text */
	toSVG: function(node) {
		node = node || this._svg;
		return (typeof XMLSerializer == 'undefined' ? this._toSVG(node) :
			new XMLSerializer().serializeToString(node));
	},

	/* Serialise one node in the SVG hierarchy. */
	_toSVG: function(node) {
		var svgDoc = '';
		if (!node) {
			return svgDoc;
		}
		if (node.nodeType == 3) { // Text
			svgDoc = node.nodeValue;
		}
		else if (node.nodeType == 4) { // CDATA
			svgDoc = '<![CDATA[' + node.nodeValue + ']]>';
		}
		else { // Element
			svgDoc = '<' + node.nodeName;
			if (node.attributes) {
				for (var i = 0; i < node.attributes.length; i++) {
					var attr = node.attributes.item(i);
					if (!($.trim(attr.nodeValue) == '' || attr.nodeValue.match(/^\[object/) ||
							attr.nodeValue.match(/^function/))) {
						svgDoc += ' ' + (attr.namespaceURI == $.svg.xlinkNS ? 'xlink:' : '') +
							attr.nodeName + '="' + attr.nodeValue + '"';
					}
				}
			}
			if (node.firstChild) {
				svgDoc += '>';
				var child = node.firstChild;
				while (child) {
					svgDoc += this._toSVG(child);
					child = child.nextSibling;
				}
				svgDoc += '</' + node.nodeName + '>';
			}
				else {
				svgDoc += '/>';
			}
		}
		return svgDoc;
	}
});

/* Helper to generate an SVG path.
   Obtain an instance from the SVGWrapper object.
   String calls together to generate the path and use its value:
   var path = root.createPath();
   root.path(null, path.move(100, 100).line(300, 100).line(200, 300).close(), {fill: 'red'});
   or
   root.path(null, path.move(100, 100).line([[300, 100], [200, 300]]).close(), {fill: 'red'}); */
function SVGPath() {
	this._path = '';
}

$.extend(SVGPath.prototype, {
	/* Prepare to create a new path.
	   @return  (SVGPath) this path */
	reset: function() {
		this._path = '';
		return this;
	},

	/* Move the pointer to a position.
	   @param  x         (number) x-coordinate to move to or
	                     (number[][]) x-/y-coordinates to move to
	   @param  y         (number) y-coordinate to move to (omitted if x is array)
	   @param  relative  (boolean) true for coordinates relative to the current point,
	                     false for coordinates being absolute
	   @return  (SVGPath) this path */
	move: function(x, y, relative) {
		relative = (isArray(x) ? y : relative);
		return this._coords((relative ? 'm' : 'M'), x, y);
	},

	/* Draw a line to a position.
	   @param  x         (number) x-coordinate to move to or
	                     (number[][]) x-/y-coordinates to move to
	   @param  y         (number) y-coordinate to move to (omitted if x is array)
	   @param  relative  (boolean) true for coordinates relative to the current point,
	                     false for coordinates being absolute
	   @return  (SVGPath) this path */
	line: function(x, y, relative) {
		relative = (isArray(x) ? y : relative);
		return this._coords((relative ? 'l' : 'L'), x, y);
	},

	/* Draw a horizontal line to a position.
	   @param  x         (number) x-coordinate to draw to or
	                     (number[]) x-coordinates to draw to
	   @param  relative  (boolean) true for coordinates relative to the current point,
	                     false for coordinates being absolute
	   @return  (SVGPath) this path */
	horiz: function(x, relative) {
		this._path += (relative ? 'h' : 'H') + (isArray(x) ? x.join(' ') : x);
		return this;
	},

	/* Draw a vertical line to a position.
	   @param  y         (number) y-coordinate to draw to or
	                     (number[]) y-coordinates to draw to
	   @param  relative  (boolean) true for coordinates relative to the current point,
	                     false for coordinates being absolute
	   @return  (SVGPath) this path */
	vert: function(y, relative) {
		this._path += (relative ? 'v' : 'V') + (isArray(y) ? y.join(' ') : y);
		return this;
	},

	/* Draw a cubic Bézier curve.
	   @param  x1        (number) x-coordinate of beginning control point or
	                     (number[][]) x-/y-coordinates of control and end points to draw to
	   @param  y1        (number) y-coordinate of beginning control point (omitted if x1 is array)
	   @param  x2        (number) x-coordinate of ending control point (omitted if x1 is array)
	   @param  y2        (number) y-coordinate of ending control point (omitted if x1 is array)
	   @param  x         (number) x-coordinate of curve end (omitted if x1 is array)
	   @param  y         (number) y-coordinate of curve end (omitted if x1 is array)
	   @param  relative  (boolean) true for coordinates relative to the current point,
	                     false for coordinates being absolute
	   @return  (SVGPath) this path */
	curveC: function(x1, y1, x2, y2, x, y, relative) {
		relative = (isArray(x1) ? y1 : relative);
		return this._coords((relative ? 'c' : 'C'), x1, y1, x2, y2, x, y);
	},

	/* Continue a cubic Bézier curve.
	   Starting control point is the reflection of the previous end control point.
	   @param  x2        (number) x-coordinate of ending control point or
	                     (number[][]) x-/y-coordinates of control and end points to draw to
	   @param  y2        (number) y-coordinate of ending control point (omitted if x2 is array)
	   @param  x         (number) x-coordinate of curve end (omitted if x2 is array)
	   @param  y         (number) y-coordinate of curve end (omitted if x2 is array)
	   @param  relative  (boolean) true for coordinates relative to the current point,
	                     false for coordinates being absolute
	   @return  (SVGPath) this path */
	smoothC: function(x2, y2, x, y, relative) {
		relative = (isArray(x2) ? y2 : relative);
		return this._coords((relative ? 's' : 'S'), x2, y2, x, y);
	},

	/* Draw a quadratic Bézier curve.
	   @param  x1        (number) x-coordinate of control point or
	                     (number[][]) x-/y-coordinates of control and end points to draw to
	   @param  y1        (number) y-coordinate of control point (omitted if x1 is array)
	   @param  x         (number) x-coordinate of curve end (omitted if x1 is array)
	   @param  y         (number) y-coordinate of curve end (omitted if x1 is array)
	   @param  relative  (boolean) true for coordinates relative to the current point,
	                     false for coordinates being absolute
	   @return  (SVGPath) this path */
	curveQ: function(x1, y1, x, y, relative) {
		relative = (isArray(x1) ? y1 : relative);
		return this._coords((relative ? 'q' : 'Q'), x1, y1, x, y);
	},

	/* Continue a quadratic Bézier curve.
	   Control point is the reflection of the previous control point.
	   @param  x         (number) x-coordinate of curve end or
	                     (number[][]) x-/y-coordinates of points to draw to
	   @param  y         (number) y-coordinate of curve end (omitted if x is array)
	   @param  relative  (boolean) true for coordinates relative to the current point,
	                     false for coordinates being absolute
	   @return  (SVGPath) this path */
	smoothQ: function(x, y, relative) {
		relative = (isArray(x) ? y : relative);
		return this._coords((relative ? 't' : 'T'), x, y);
	},

	/* Generate a path command with (a list of) coordinates. */
	_coords: function(cmd, x1, y1, x2, y2, x3, y3) {
		if (isArray(x1)) {
			for (var i = 0; i < x1.length; i++) {
				var cs = x1[i];
				this._path += (i == 0 ? cmd : ' ') + cs[0] + ',' + cs[1] +
					(cs.length < 4 ? '' : ' ' + cs[2] + ',' + cs[3] +
					(cs.length < 6 ? '': ' ' + cs[4] + ',' + cs[5]));
			}
		}
		else {
			this._path += cmd + x1 + ',' + y1 +
				(x2 == null ? '' : ' ' + x2 + ',' + y2 +
				(x3 == null ? '' : ' ' + x3 + ',' + y3));
		}
		return this;
	},

	/* Draw an arc to a position.
	   @param  rx         (number) x-radius of arc or
	                      (number/boolean[][]) x-/y-coordinates and flags for points to draw to
	   @param  ry         (number) y-radius of arc (omitted if rx is array)
	   @param  xRotate    (number) x-axis rotation (degrees, clockwise) (omitted if rx is array)
	   @param  large      (boolean) true to draw the large part of the arc,
	                      false to draw the small part (omitted if rx is array)
	   @param  clockwise  (boolean) true to draw the clockwise arc,
	                      false to draw the anti-clockwise arc (omitted if rx is array)
	   @param  x          (number) x-coordinate of arc end (omitted if rx is array)
	   @param  y          (number) y-coordinate of arc end (omitted if rx is array)
	   @param  relative   (boolean) true for coordinates relative to the current point,
	                      false for coordinates being absolute
	   @return  (SVGPath) this path */
	arc: function(rx, ry, xRotate, large, clockwise, x, y, relative) {
		relative = (isArray(rx) ? ry : relative);
		this._path += (relative ? 'a' : 'A');
		if (isArray(rx)) {
			for (var i = 0; i < rx.length; i++) {
				var cs = rx[i];
				this._path += (i == 0 ? '' : ' ') + cs[0] + ',' + cs[1] + ' ' +
					cs[2] + ' ' + (cs[3] ? '1' : '0') + ',' +
					(cs[4] ? '1' : '0') + ' ' + cs[5] + ',' + cs[6];
			}
		}
		else {
			this._path += rx + ',' + ry + ' ' + xRotate + ' ' +
				(large ? '1' : '0') + ',' + (clockwise ? '1' : '0') + ' ' + x + ',' + y;
		}
		return this;
	},

	/* Close the current path.
	   @return  (SVGPath) this path */
	close: function() {
		this._path += 'z';
		return this;
	},

	/* Return the string rendering of the specified path.
	   @return  (string) stringified path */
	path: function() {
		return this._path;
	}
});

SVGPath.prototype.moveTo = SVGPath.prototype.move;
SVGPath.prototype.lineTo = SVGPath.prototype.line;
SVGPath.prototype.horizTo = SVGPath.prototype.horiz;
SVGPath.prototype.vertTo = SVGPath.prototype.vert;
SVGPath.prototype.curveCTo = SVGPath.prototype.curveC;
SVGPath.prototype.smoothCTo = SVGPath.prototype.smoothC;
SVGPath.prototype.curveQTo = SVGPath.prototype.curveQ;
SVGPath.prototype.smoothQTo = SVGPath.prototype.smoothQ;
SVGPath.prototype.arcTo = SVGPath.prototype.arc;

/* Helper to generate an SVG text object.
   Obtain an instance from the SVGWrapper object.
   String calls together to generate the text and use its value:
   var text = root.createText();
   root.text(null, x, y, text.string('This is ').
     span('red', {fill: 'red'}).string('!'), {fill: 'blue'}); */
function SVGText() {
	this._parts = []; // The components of the text object
}

$.extend(SVGText.prototype, {
	/* Prepare to create a new text object.
	   @return  (SVGText) this text */
	reset: function() {
		this._parts = [];
		return this;
	},

	/* Add a straight string value.
	   @param  value  (string) the actual text
	   @return  (SVGText) this text object */
	string: function(value) {
		this._parts[this._parts.length] = ['text', value];
		return this;
	},

	/* Add a separate text span that has its own settings.
	   @param  value     (string) the actual text
	   @param  settings  (object) the settings for this text
	   @return  (SVGText) this text object */
	span: function(value, settings) {
		this._parts[this._parts.length] = ['tspan', value, settings];
		return this;
	},

	/* Add a reference to a previously defined text string.
	   @param  id        (string) the ID of the actual text
	   @param  settings  (object) the settings for this text
	   @return  (SVGText) this text object */
	ref: function(id, settings) {
		this._parts[this._parts.length] = ['tref', id, settings];
		return this;
	},

	/* Add text drawn along a path.
	   @param  id        (string) the ID of the path
	   @param  value     (string) the actual text
	   @param  settings  (object) the settings for this text
	   @return  (SVGText) this text object */
	path: function(id, value, settings) {
		this._parts[this._parts.length] = ['textpath', value,
			$.extend({href: id}, settings || {})];
		return this;
	}
});

/* Attach the SVG functionality to a jQuery selection.
   @param  command  (string) the command to run (optional, default 'attach')
   @param  options  (object) the new settings to use for these SVG instances
   @return jQuery (object) for chaining further calls */
$.fn.svg = function(options) {
	var otherArgs = Array.prototype.slice.call(arguments, 1);
	if (typeof options == 'string' && options == 'get') {
		return $.svg['_' + options + 'SVG'].apply($.svg, [this[0]].concat(otherArgs));
	}
	return this.each(function() {
		if (typeof options == 'string') {
			$.svg['_' + options + 'SVG'].apply($.svg, [this].concat(otherArgs));
		}
		else {
			$.svg._attachSVG(this, options || {});
		}
	});
};

/* Determine whether an object is an array. */
function isArray(a) {
	return (a && a.constructor == Array);
}

// Singleton primary SVG interface
$.svg = new SVGManager();

})(jQuery);
