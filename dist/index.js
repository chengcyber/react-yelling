!function(n,e){"object"==typeof exports&&"undefined"!=typeof module?module.exports=e():"function"==typeof define&&define.amd?define(e):n.yell=e()}(this,function(){"use strict";function n(){return(n=Object.assign||function(n){for(var e=1;e<arguments.length;e++){var t=arguments[e];for(var o in t)Object.prototype.hasOwnProperty.call(t,o)&&(n[o]=t[o])}return n}).apply(this,arguments)}var e=require("debug");return function(t){return function(o){var r=n({},{predicate:!0,componentWillMount:!0,render:!0,componentDidMount:!0,componentWillReceiveProps:!0,shouldComponentUpdate:!0,componentWillUpdate:!0,componentDidUpdate:!0,componentWillUnmount:!0},{externalConfig:t}),c=r.predicate;return"function"==typeof c&&!c()||!c?o:(["componentWillMount","render","componentDidMount","componentWillReceiveProps","shouldComponentUpdate","componentWillUpdate","componentDidUpdate","componentWillUnmount"].forEach(function(n){var t,c,i;r[n]&&(o.prototype[n]=(c=n,i=(t=o).prototype[c],function(){var n=e(t.name);e.enable(t.name);for(var o="",r=arguments.length,p=new Array(r),a=0;a<r;a++)p[a]=arguments[a];return p.length&&p.forEach(function(n){return o+="".concat(JSON.stringify(n)," ")}),n("'s ".concat(c,": ").concat(o)),!i||"function"!=typeof i||i.call.apply(i,[this].concat(p))}))}),o)}}});
