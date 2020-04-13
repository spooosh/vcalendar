function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread();
}

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

    return arr2;
  }
}

function _iterableToArray(iter) {
  if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter);
}

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance");
}

var dayTemplate = function dayTemplate(year, month, date) {
  return {
    year: year,
    month: month,
    date: date
  };
};
var getDaysInMonth = function getDaysInMonth(year, month) {
  var lastDate = new Date(year, month + 1, 0).getDate();
  return _toConsumableArray(Array(lastDate).keys()).map(function (i) {
    return dayTemplate(year, month, i + 1);
  });
};
var getFirstWeek = function getFirstWeek(year, month, addWeek, startWeekDay) {
  var first = new Date(year, month, 1);
  var firstDay = first.getDay() - startWeekDay;
  var diff = 7 - firstDay;
  diff = diff >= 7 ? diff - 7 : diff;
  if (addWeek) { diff += addWeek * 7; }
  return _toConsumableArray(Array(diff).keys()).map(function (i) {
    return dayTemplate(year, month, i + 1);
  });
};
var getLastWeek = function getLastWeek(year, month, startWeekDay) {
  var last = new Date(year, month + 1, 0);
  var lastDate = last.getDate();
  var lastDay = last.getDay() + 1 - startWeekDay;
  var diff = lastDate - lastDay;

  var days = _toConsumableArray(Array(lastDay).keys()).map(function (i) {
    return dayTemplate(year, month, diff + i + 1);
  });

  return days.length < 7 ? days : [];
};
var isPassed = function isPassed(date) {
  var today = new Date();
  today = new Date("".concat(today.getMonth() + 1, ".").concat(today.getDate(), ".").concat(today.getFullYear()));
  return date.getTime() < today.getTime();
};
var dateUntil = function dateUntil(val, untilDate) {
  return val.getTime() < untilDate.getTime();
};
var dateAfter = function dateAfter(val, afterDate) {
  return val.getTime() > afterDate.getTime();
};
var getDateTime = function getDateTime(date) {
  var newDate = new Date(date);
  var y = newDate.getFullYear();
  var d = newDate.getDate();
  var m = newDate.getMonth();
  return new Date(y, m, d).getTime();
};

//
//
//
//
//
//
var script = {
  name: 'Popover'
};

function unwrapExports (x) {
	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
}

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var dist = createCommonjsModule(function (module, exports) {

Object.defineProperty(exports, '__esModule', { value: true });

function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier
/* server only */
, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
  if (typeof shadowMode !== 'boolean') {
    createInjectorSSR = createInjector;
    createInjector = shadowMode;
    shadowMode = false;
  } // Vue.extend constructor export interop.


  var options = typeof script === 'function' ? script.options : script; // render functions

  if (template && template.render) {
    options.render = template.render;
    options.staticRenderFns = template.staticRenderFns;
    options._compiled = true; // functional template

    if (isFunctionalTemplate) {
      options.functional = true;
    }
  } // scopedId


  if (scopeId) {
    options._scopeId = scopeId;
  }

  var hook;

  if (moduleIdentifier) {
    // server build
    hook = function hook(context) {
      // 2.3 injection
      context = context || // cached call
      this.$vnode && this.$vnode.ssrContext || // stateful
      this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext; // functional
      // 2.2 with runInNewContext: true

      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__;
      } // inject component styles


      if (style) {
        style.call(this, createInjectorSSR(context));
      } // register component module identifier for async chunk inference


      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier);
      }
    }; // used by ssr in case component is cached and beforeCreate
    // never gets called


    options._ssrRegister = hook;
  } else if (style) {
    hook = shadowMode ? function (context) {
      style.call(this, createInjectorShadow(context, this.$root.$options.shadowRoot));
    } : function (context) {
      style.call(this, createInjector(context));
    };
  }

  if (hook) {
    if (options.functional) {
      // register for functional component in vue file
      var originalRender = options.render;

      options.render = function renderWithStyleInjection(h, context) {
        hook.call(context);
        return originalRender(h, context);
      };
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate;
      options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
    }
  }

  return script;
}

var isOldIE = typeof navigator !== 'undefined' && /msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());
function createInjector(context) {
  return function (id, style) {
    return addStyle(id, style);
  };
}
var HEAD;
var styles = {};

function addStyle(id, css) {
  var group = isOldIE ? css.media || 'default' : id;
  var style = styles[group] || (styles[group] = {
    ids: new Set(),
    styles: []
  });

  if (!style.ids.has(id)) {
    style.ids.add(id);
    var code = css.source;

    if (css.map) {
      // https://developer.chrome.com/devtools/docs/javascript-debugging
      // this makes source maps inside style tags work properly in Chrome
      code += '\n/*# sourceURL=' + css.map.sources[0] + ' */'; // http://stackoverflow.com/a/26603875

      code += '\n/*# sourceMappingURL=data:application/json;base64,' + btoa(unescape(encodeURIComponent(JSON.stringify(css.map)))) + ' */';
    }

    if (!style.element) {
      style.element = document.createElement('style');
      style.element.type = 'text/css';
      if (css.media) { style.element.setAttribute('media', css.media); }

      if (HEAD === undefined) {
        HEAD = document.head || document.getElementsByTagName('head')[0];
      }

      HEAD.appendChild(style.element);
    }

    if ('styleSheet' in style.element) {
      style.styles.push(code);
      style.element.styleSheet.cssText = style.styles.filter(Boolean).join('\n');
    } else {
      var index = style.ids.size - 1;
      var textNode = document.createTextNode(code);
      var nodes = style.element.childNodes;
      if (nodes[index]) { style.element.removeChild(nodes[index]); }
      if (nodes.length) { style.element.insertBefore(textNode, nodes[index]); }else { style.element.appendChild(textNode); }
    }
  }
}

function createInjectorSSR(context) {
  if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
    context = __VUE_SSR_CONTEXT__;
  }

  if (!context) { return function () {}; }

  if (!('styles' in context)) {
    context._styles = context._styles || {};
    Object.defineProperty(context, 'styles', {
      enumerable: true,
      get: function get() {
        return context._renderStyles(context._styles);
      }
    });
    context._renderStyles = context._renderStyles || renderStyles;
  }

  return function (id, style) {
    return addStyle$1(id, style, context);
  };
}

function addStyle$1(id, css, context) {
  var group =  css.media || 'default' ;
  var style = context._styles[group] || (context._styles[group] = {
    ids: [],
    css: ''
  });

  if (!style.ids.includes(id)) {
    style.media = css.media;
    style.ids.push(id);
    var code = css.source;

    style.css += code + '\n';
  }
}

function renderStyles(styles) {
  var css = '';

  for (var key in styles) {
    var style = styles[key];
    css += '<style data-vue-ssr-id="' + Array.from(style.ids).join(' ') + '"' + (style.media ? ' media="' + style.media + '"' : '') + '>' + style.css + '</style>';
  }

  return css;
}

function createInjector$1(context, shadowRoot) {
  return function (id, style) {
    return addStyle$2(style, shadowRoot);
  };
}

function createStyleElement(shadowRoot) {
  var styleElement = document.createElement('style');
  styleElement.type = 'text/css';
  shadowRoot.appendChild(styleElement);
  return styleElement;
}

function addStyle$2(css, shadowRoot) {
  var styleElement = createStyleElement(shadowRoot);
  if (css.media) { styleElement.setAttribute('media', css.media); }

  if ('styleSheet' in styleElement) {
    styleElement.styleSheet.cssText = css.source;
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild);
    }

    styleElement.appendChild(document.createTextNode(css.source));
  }
}

exports.normalizeComponent = normalizeComponent;
exports.createInjector = createInjector;
exports.createInjectorSSR = createInjectorSSR;
exports.createInjectorShadow = createInjector$1;

});

unwrapExports(dist);
var dist_1 = dist.normalizeComponent;
var dist_2 = dist.createInjector;
var dist_3 = dist.createInjectorSSR;
var dist_4 = dist.createInjectorShadow;

/* script */
var __vue_script__ = script;

/* template */
var __vue_render__ = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"vcalendar__popover"},[_vm._t("default")],2)};
var __vue_staticRenderFns__ = [];

  /* style */
  var __vue_inject_styles__ = function (inject) {
    if (!inject) { return }
    inject("data-v-1a9d9e51_0", { source: ".vcalendar__popover{display:flex;flex-direction:column;align-items:center;padding:12px 24px;border-radius:12px;box-shadow:0 4px 20px 0 rgba(48,48,48,.15);user-select:none}", map: undefined, media: undefined });

  };
  /* scoped */
  var __vue_scope_id__ = undefined;
  /* module identifier */
  var __vue_module_identifier__ = undefined;
  /* functional template */
  var __vue_is_functional_template__ = false;
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  var __vue_component__ = dist_1(
    { render: __vue_render__, staticRenderFns: __vue_staticRenderFns__ },
    __vue_inject_styles__,
    __vue_script__,
    __vue_scope_id__,
    __vue_is_functional_template__,
    __vue_module_identifier__,
    false,
    dist_2,
    undefined,
    undefined
  );

//
//
//
//
//
//
//
//
//
//
var script$1 = {
  name: 'ChevronIcon',
  props: {
    left: Boolean,
    right: Boolean
  },
  computed: {
    classList: function classList() {
      var _ref;

      return _ref = {}, _defineProperty(_ref, this.$style._left, this.left), _defineProperty(_ref, this.$style._right, this.right), _ref;
    }
  }
};

/* script */
var __vue_script__$1 = script$1;

/* template */
var __vue_render__$1 = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{class:[_vm.$style.ChevronIcon, _vm.classList],on:{"click":function($event){return _vm.$emit('click')}}},[_c('svg',{class:_vm.$style.svg,attrs:{"viewBox":"0 0 20 20"}},[_c('path',{attrs:{"d":"M10,16c-0.5,0-1-0.2-1.4-0.6l-8-8c-0.8-0.8-0.8-2,0-2.8c0.8-0.8,2-0.8,2.8,0l6.6,6.6l6.6-6.6c0.8-0.8,2-0.8,2.8,0 c0.8,0.8,0.8,2,0,2.8l-8,8C11,15.8,10.5,16,10,16z"}})])])};
var __vue_staticRenderFns__$1 = [];

  /* style */
  var __vue_inject_styles__$1 = function (inject) {
    if (!inject) { return }
    inject("data-v-2cae0a6c_0", { source: ".-input-css-6-ChevronIcon-2tT_{display:block;width:12px;height:12px;color:#303030;opacity:1;transition:all .3s cubic-bezier(0,.4,.4,1);cursor:pointer}.-input-css-6-ChevronIcon-2tT_:hover{color:#0d56c6}.-input-css-6-_left-q7l9{transform:translate3d(0,0,0) rotate(90deg)}.-input-css-6-_right-3vDW{transform:translate3d(0,0,0) rotate(-90deg)}.-input-css-6-svg-SaP3{display:block;width:100%;height:100%;fill:currentColor}", map: undefined, media: undefined });
Object.defineProperty(this, "$style", { value: {"ChevronIcon":"-input-css-6-ChevronIcon-2tT_","_left":"-input-css-6-_left-q7l9","_right":"-input-css-6-_right-3vDW","svg":"-input-css-6-svg-SaP3"} });

  };
  /* scoped */
  var __vue_scope_id__$1 = undefined;
  /* module identifier */
  var __vue_module_identifier__$1 = undefined;
  /* functional template */
  var __vue_is_functional_template__$1 = false;
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  var __vue_component__$1 = dist_1(
    { render: __vue_render__$1, staticRenderFns: __vue_staticRenderFns__$1 },
    __vue_inject_styles__$1,
    __vue_script__$1,
    __vue_scope_id__$1,
    __vue_is_functional_template__$1,
    __vue_module_identifier__$1,
    false,
    dist_2,
    undefined,
    undefined
  );

//
var script$2 = {
  name: 'YearList',
  components: {
    ChevronIcon: __vue_component__$1
  },
  props: {
    focusedYear: {
      type: Number,
      default: new Date().getFullYear()
    }
  }
};

/* script */
var __vue_script__$2 = script$2;

/* template */
var __vue_render__$2 = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"vcalendar-year"},[_c('ChevronIcon',{staticClass:"vcalendar-year__arrow",attrs:{"left":""},on:{"click":function($event){return _vm.$emit('previous-year')}}}),_vm._v(" "),_c('ul',{staticClass:"vcalendar-year__list"},[_c('li',{staticClass:"vcalendar-year__value"},[_vm._v(_vm._s(_vm.focusedYear))])]),_vm._v(" "),_c('ChevronIcon',{staticClass:"vcalendar-year__arrow",attrs:{"right":""},on:{"click":function($event){return _vm.$emit('next-year')}}})],1)};
var __vue_staticRenderFns__$2 = [];

  /* style */
  var __vue_inject_styles__$2 = function (inject) {
    if (!inject) { return }
    inject("data-v-047ba2e8_0", { source: ".vcalendar-year{display:flex;align-items:center;justify-content:space-between}.vcalendar-year__arrow{flex-shrink:0}.vcalendar-year__list{list-style:none;padding:0;margin:0}.vcalendar-year__value{margin:0 10px;font-weight:500}", map: undefined, media: undefined });

  };
  /* scoped */
  var __vue_scope_id__$2 = undefined;
  /* module identifier */
  var __vue_module_identifier__$2 = undefined;
  /* functional template */
  var __vue_is_functional_template__$2 = false;
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  var __vue_component__$2 = dist_1(
    { render: __vue_render__$2, staticRenderFns: __vue_staticRenderFns__$2 },
    __vue_inject_styles__$2,
    __vue_script__$2,
    __vue_scope_id__$2,
    __vue_is_functional_template__$2,
    __vue_module_identifier__$2,
    false,
    dist_2,
    undefined,
    undefined
  );

var locale = {
  en: {
    months: function months() {
      return ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    },
    dayOfAWeek: function dayOfAWeek() {
      return ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    }
  },
  ru: {
    months: function months() {
      return ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];
    },
    dayOfAWeek: function dayOfAWeek() {
      return ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'];
    }
  }
};

//
var script$3 = {
  name: 'MonthList',
  components: {
    ChevronIcon: __vue_component__$1
  },
  props: {
    focusedMonth: {
      type: Number,
      default: new Date().getMonth()
    },
    locale: String
  },
  computed: {
    monthName: function monthName() {
      return locale[this.locale].months()[this.focusedMonth];
    }
  }
};

/* script */
var __vue_script__$3 = script$3;

/* template */
var __vue_render__$3 = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"vcalendar-month"},[_c('ChevronIcon',{staticClass:"vcalendar-month__arrow",attrs:{"left":""},on:{"click":function($event){return _vm.$emit('previous-month')}}}),_vm._v(" "),_c('ul',{staticClass:"vcalendar-month__list"},[_c('li',{staticClass:"vcalendar-month__value"},[_vm._v(_vm._s(_vm.monthName))])]),_vm._v(" "),_c('ChevronIcon',{staticClass:"vcalendar-month__arrow",attrs:{"right":""},on:{"click":function($event){return _vm.$emit('next-month')}}})],1)};
var __vue_staticRenderFns__$3 = [];

  /* style */
  var __vue_inject_styles__$3 = function (inject) {
    if (!inject) { return }
    inject("data-v-5cddef8c_0", { source: ".vcalendar-month{display:flex;align-items:center;justify-content:space-between}.vcalendar-month__arrow{flex-shrink:0}.vcalendar-month__list{list-style:none;padding:0;margin:0}.vcalendar-month__value{margin:0 10px;text-align:center;font-weight:500}", map: undefined, media: undefined });

  };
  /* scoped */
  var __vue_scope_id__$3 = undefined;
  /* module identifier */
  var __vue_module_identifier__$3 = undefined;
  /* functional template */
  var __vue_is_functional_template__$3 = false;
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  var __vue_component__$3 = dist_1(
    { render: __vue_render__$3, staticRenderFns: __vue_staticRenderFns__$3 },
    __vue_inject_styles__$3,
    __vue_script__$3,
    __vue_scope_id__$3,
    __vue_is_functional_template__$3,
    __vue_module_identifier__$3,
    false,
    dist_2,
    undefined,
    undefined
  );

var script$4 = {
  name: 'Day',
  props: {
    year: Number,
    month: Number,
    date: Number,

    /*
    ** Global options
    */
    today: Number,
    chosen: Array,

    /*
    ** Not focused month day
    */
    otherMonth: Boolean,

    /*
    ** Day of a week
    */
    dow: Boolean,

    /*
    ** Disabled options
    */
    disabledPassed: Boolean,
    disabledUntil: Date,
    disabledAfter: Date,
    disabledDates: Array,

    /*
    ** Allowed options
    */
    allowedDates: Array
  },
  computed: {
    parsedDate: function parsedDate() {
      return new Date(this.year, this.month, this.date);
    },
    time: function time() {
      return this.parsedDate.getTime();
    },
    isToday: function isToday() {
      var d = new Date(this.today);
      return this.year === d.getFullYear() && this.month === d.getMonth() && this.date === d.getDate();
    },
    isActive: function isActive() {
      if (!this.chosen) { return false; }
      return this.chosen.includes(this.parsedDate.getTime());
    },
    isDisabled: function isDisabled() {
      var _this$disabledDates, _this$allowedDates;

      var val = false;

      if (this.disabledPassed || this.disabledUntil || this.disabledAfter || ((_this$disabledDates = this.disabledDates) === null || _this$disabledDates === void 0 ? void 0 : _this$disabledDates.length)) {
        var _this$disabledDates2;

        if (this.disabledPassed) { val = isPassed(this.parsedDate); }
        if (this.disabledUntil && !val) { val = dateUntil(this.parsedDate, this.disabledUntil); }
        if (this.disabledAfter && !val) { val = dateAfter(this.parsedDate, this.disabledAfter); }
        if (((_this$disabledDates2 = this.disabledDates) === null || _this$disabledDates2 === void 0 ? void 0 : _this$disabledDates2.length) && !val) { val = this.disabledDates.includes(this.parsedDate.getTime()); }
      } else if ((_this$allowedDates = this.allowedDates) === null || _this$allowedDates === void 0 ? void 0 : _this$allowedDates.length) {
        val = !this.allowedDates.includes(this.parsedDate.getTime());
      }

      return val;
    },
    classList: function classList() {
      var _ref;

      return _ref = {}, _defineProperty(_ref, '_active', this.isActive), _defineProperty(_ref, '_disabled', this.isDisabled), _defineProperty(_ref, '_dow', this.dow), _defineProperty(_ref, '_in-other-month', this.otherMonth), _defineProperty(_ref, '_is-today', this.isToday), _ref;
    }
  }
};

/* script */
var __vue_script__$4 = script$4;

/* template */
var __vue_render__$4 = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{class:['vcalendar-day', _vm.classList],on:{"click":function($event){return _vm.$emit('click', _vm.parsedDate)}}},[_c('div',{staticClass:"vcalendar-day__inner"},[_vm._t("default",[_vm._v("\n            "+_vm._s(_vm.date)+"\n        ")])],2)])};
var __vue_staticRenderFns__$4 = [];

  /* style */
  var __vue_inject_styles__$4 = function (inject) {
    if (!inject) { return }
    inject("data-v-39df0323_0", { source: ".vcalendar-day{display:flex;justify-content:center;align-items:center;cursor:pointer}.vcalendar-day._in-other-month .vcalendar-day__inner{color:#a2a2a2}.vcalendar-day._is-today .vcalendar-day__inner{background-color:#cbdcf8;color:#303030}.vcalendar-day:hover .vcalendar-day__inner{background-color:#ececec;color:#303030}.vcalendar-day._dow{pointer-events:none;color:#0d56c6}.vcalendar-day._active .vcalendar-day__inner{background-color:#0d56c6;color:#fff}.vcalendar-day._disabled{opacity:.4;pointer-events:none}.vcalendar-day__inner{flex-shrink:0;display:block;width:28px;height:28px;border-radius:50%;text-align:center;line-height:27px;color:#303030;transition:all .3s cubic-bezier(0,.4,.4,1)}", map: undefined, media: undefined });

  };
  /* scoped */
  var __vue_scope_id__$4 = undefined;
  /* module identifier */
  var __vue_module_identifier__$4 = undefined;
  /* functional template */
  var __vue_is_functional_template__$4 = false;
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  var __vue_component__$4 = dist_1(
    { render: __vue_render__$4, staticRenderFns: __vue_staticRenderFns__$4 },
    __vue_inject_styles__$4,
    __vue_script__$4,
    __vue_scope_id__$4,
    __vue_is_functional_template__$4,
    __vue_module_identifier__$4,
    false,
    dist_2,
    undefined,
    undefined
  );

var script$5 = {
  name: 'DateList',
  components: {
    Day: __vue_component__$4
  },
  props: {
    /*
    ** Global options
    */
    startWeekDay: Number,
    locale: String,
    chosen: Array,
    focused: Object,
    today: Number,

    /*
    ** Disabled options
    */
    disabledPassed: Boolean,
    disabledUntil: Date,
    disabledAfter: Date,
    disabledDates: Array,

    /*
    ** Allowed options
    */
    allowedDates: Array
  },
  computed: {
    dayOfAWeek: function dayOfAWeek() {
      var days = locale[this.locale].dayOfAWeek();

      if (this.startWeekDay) {
        var firstDays = days.splice(0, this.startWeekDay);
        days = [].concat(_toConsumableArray(days), _toConsumableArray(firstDays));
      }

      return days;
    },
    previousMonthDays: function previousMonthDays() {
      var previousMonth = this.focused.month > 0 ? this.focused.month - 1 : 11;
      var previousYear = this.focused.month > 0 ? this.focused.year : this.focused.year - 1;
      return getLastWeek(previousYear, previousMonth, this.startWeekDay);
    },
    nextMonthDays: function nextMonthDays() {
      var nextMonth = this.focused.month < 11 ? this.focused.month + 1 : 0;
      var nextYear = this.focused.month < 11 ? this.focused.year : this.focused.year + 1;
      var addWeek = Math.floor(6 - (this.previousMonthDays.length + this.currentMonthDays.length) / 7);
      var days = getFirstWeek(nextYear, nextMonth, addWeek, this.startWeekDay);
      return days;
    },
    currentMonthDays: function currentMonthDays() {
      var days = getDaysInMonth(this.focused.year, this.focused.month);
      return days;
    }
  }
};

/* script */
var __vue_script__$5 = script$5;

/* template */
var __vue_render__$5 = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"vcalendar-date-l"},[_c('ul',{staticClass:"vcalendar-date-l__list"},[_vm._l((_vm.dayOfAWeek),function(d){return _c('li',{key:("dow" + d),staticClass:"vcalendar-date-l__day"},[_c('Day',{key:("dow" + d),attrs:{"dow":""}},[_vm._v("\n                "+_vm._s(d)+"\n            ")])],1)}),_vm._v(" "),_vm._l((_vm.previousMonthDays),function(d){return _c('li',{key:("previous" + (d.date)),staticClass:"vcalendar-date-l__day"},[_c('Day',{key:("previous" + (d.date)),attrs:{"year":d.year,"month":d.month,"date":d.date,"today":_vm.today,"chosen":_vm.chosen,"other-month":"","disabled-passed":_vm.disabledPassed,"disabled-until":_vm.disabledUntil,"disabled-after":_vm.disabledAfter,"disabled-dates":_vm.disabledDates,"allowed-dates":_vm.allowedDates},on:{"click":function (val) { return _vm.$emit('change', val); }}})],1)}),_vm._v(" "),_vm._l((_vm.currentMonthDays),function(d){return _c('li',{key:("current" + (d.date)),staticClass:"vcalendar-date-l__day"},[_c('Day',{key:("current" + (d.date)),attrs:{"year":d.year,"month":d.month,"date":d.date,"chosen":_vm.chosen,"today":_vm.today,"disabled-passed":_vm.disabledPassed,"disabled-until":_vm.disabledUntil,"disabled-after":_vm.disabledAfter,"disabled-dates":_vm.disabledDates,"allowed-dates":_vm.allowedDates},on:{"click":function (val) { return _vm.$emit('change', val); }}})],1)}),_vm._v(" "),_vm._l((_vm.nextMonthDays),function(d){return _c('li',{key:("next" + (d.date)),staticClass:"vcalendar-date-l__day"},[_c('Day',{key:("next" + (d.date)),attrs:{"year":d.year,"month":d.month,"date":d.date,"today":_vm.today,"chosen":_vm.chosen,"other-month":"","disabled-passed":_vm.disabledPassed,"disabled-until":_vm.disabledUntil,"disabled-after":_vm.disabledAfter,"disabled-dates":_vm.disabledDates,"allowed-dates":_vm.allowedDates},on:{"click":function (val) { return _vm.$emit('change', val); }}})],1)})],2)])};
var __vue_staticRenderFns__$5 = [];

  /* style */
  var __vue_inject_styles__$5 = function (inject) {
    if (!inject) { return }
    inject("data-v-ed2ff2d6_0", { source: ".vcalendar-date-l{display:block;font-variant-numeric:tabular-nums}.vcalendar-date-l__list{display:flex;flex-wrap:wrap;margin:-4px;padding:0;list-style:none}.vcalendar-date-l__day{flex-shrink:0;flex-grow:0;width:calc(100% / 7);padding:4px}", map: undefined, media: undefined });

  };
  /* scoped */
  var __vue_scope_id__$5 = undefined;
  /* module identifier */
  var __vue_module_identifier__$5 = undefined;
  /* functional template */
  var __vue_is_functional_template__$5 = false;
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  var __vue_component__$5 = dist_1(
    { render: __vue_render__$5, staticRenderFns: __vue_staticRenderFns__$5 },
    __vue_inject_styles__$5,
    __vue_script__$5,
    __vue_scope_id__$5,
    __vue_is_functional_template__$5,
    __vue_module_identifier__$5,
    false,
    dist_2,
    undefined,
    undefined
  );

//
var script$6 = {
  name: 'VCalendar',
  components: {
    DateList: __vue_component__$5,
    MonthList: __vue_component__$3,
    YearList: __vue_component__$2,
    Popover: __vue_component__
  },
  props: {
    /*
    ** Options
    */
    multiple: {
      type: Boolean,
      default: false
    },

    /*
    ** Language
    */
    locale: {
      type: String,
      default: 'en'
    },

    /*
    ** Disabled dates list
    */
    disabled: {
      type: Array,
      default: function _default() {
        return [];
      }
    },

    /*
    ** Not disabled dates list
    */
    allowed: {
      type: Array,
      default: function _default() {
        return [];
      }
    },

    /*
    ** Allow empty chosen
    ** default chosen if false: today
    */
    allowEmpty: {
      type: Boolean,
      default: false
    },

    /*
    ** Week first day index
    ** @default: 0 - Sunday
    */
    startWeekDay: {
      type: Number,
      default: 0
    }
  },
  data: function data() {
    return {
      chosen: [],
      focused: {
        date: new Date().getDate(),
        month: new Date().getMonth(),
        year: new Date().getFullYear()
      }
    };
  },
  computed: {
    today: function today() {
      return getDateTime(new Date());
    },

    /*
    ** Disabled options
    */
    disabledPassed: function disabledPassed() {
      return this.disabled.includes('passed');
    },
    disabledUntil: function disabledUntil() {
      var param = this.disabled.filter(function (i) {
        return i.indexOf('until') > -1;
      });
      if (!param.length) { return null; }
      param = param[0];
      var date = param.split(' ')[1];
      date = getDateTime(date);
      return date ? new Date(date) : null;
    },
    disabledAfter: function disabledAfter() {
      var param = this.disabled.filter(function (i) {
        return i.indexOf('after') > -1;
      });
      if (!param.length) { return null; }
      param = param[0];
      var date = param.split(' ')[1];
      date = getDateTime(Date.parse(date));
      return date ? new Date(date) : null;
    },
    disabledDates: function disabledDates() {
      var _this$disabled;

      var dates = ((_this$disabled = this.disabled) === null || _this$disabled === void 0 ? void 0 : _this$disabled.length) ? this.disabled.filter(function (i) {
        return i.indexOf('until') < 0 && i.indexOf('after') < 0;
      }) : [];
      return dates.filter(function (i) {
        return Date.parse(i);
      }).map(function (i) {
        return getDateTime(i);
      });
    },

    /*
    ** Allowed dates
    */
    allowedDates: function allowedDates() {
      var _this$allowed;

      var dates = ((_this$allowed = this.allowed) === null || _this$allowed === void 0 ? void 0 : _this$allowed.length) ? this.allowed.filter(function (i) {
        return Date.parse(i);
      }).map(function (i) {
        return getDateTime(i);
      }) : [];
      return dates;
    }
  },
  created: function created() {
    this.setInitialDates();
  },
  methods: {
    /*
    ** Events methods
    */
    onPreviousMonth: function onPreviousMonth() {
      this.focused.month = this.focused.month > 0 ? this.focused.month - 1 : 11;
      if (this.focused.month === 11) { this.focused.year -= 1; }
    },
    onNextMonth: function onNextMonth() {
      this.focused.month = this.focused.month < 11 ? this.focused.month + 1 : 0;
      if (!this.focused.month) { this.focused.year += 1; }
    },
    onPreviousYear: function onPreviousYear() {
      this.focused.year -= 1;
    },
    onNextYear: function onNextYear() {
      this.focused.year += 1;
    },
    onDateChange: function onDateChange(val) {
      var m = val.getMonth();
      var y = val.getFullYear();
      var time = val.getTime();
      this.focused.month = m;
      this.focused.year = y;
      this.chosen.includes(time) ? this.removeChosenDate(time) : this.addChosenDate(time);
    },

    /*
    ** Methods
    */
    addChosenDate: function addChosenDate(val) {
      this.multiple ? this.chosen.push(val) : this.chosen = [val].concat();
      this.emitChange();
    },
    removeChosenDate: function removeChosenDate(val) {
      var _this = this,
          _this$chosen;

      var remove = function remove() {
        _this.multiple ? _this.chosen = _this.chosen.filter(function (d) {
          return d !== val;
        }).slice() : _this.chosen = [].concat();
      };

      if (this.allowEmpty) {
        remove();
      } else if (((_this$chosen = this.chosen) === null || _this$chosen === void 0 ? void 0 : _this$chosen.length) > 1) {
        remove();
      }

      this.emitChange();
    },
    setInitialDates: function setInitialDates() {
      var _this$allowedDates;

      if ((_this$allowedDates = this.allowedDates) === null || _this$allowedDates === void 0 ? void 0 : _this$allowedDates.length) {
        var dates = this.allowedDates.slice();
        dates.sort(function (a, b) {
          return a - b;
        });
        var firstDate = dates[0];
        var d = new Date(firstDate);
        this.focused.year = d.getFullYear();
        this.focused.month = d.getMonth();

        if (!this.allowEmpty) {
          this.chosen = [dates[0]];
          this.emitChange();
        }
      } else {
        this.setInitialChosen();
      }
    },
    setInitialChosen: function setInitialChosen() {
      if (!this.allowEmpty) {
        this.chosen = [new Date(this.today).getTime()];
        this.emitChange();
      }
    },

    /*
    ** Emitters
    */
    emitChange: function emitChange() {
      this.$emit('change', this.chosen);
    }
  }
};

/* script */
var __vue_script__$6 = script$6;

/* template */
var __vue_render__$6 = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"vcalendar"},[_c('Popover',[_c('YearList',{staticClass:"vcalendar__year-list",attrs:{"focused-year":_vm.focused.year},on:{"previous-year":_vm.onPreviousYear,"next-year":_vm.onNextYear}}),_vm._v(" "),_c('MonthList',{staticClass:"vcalendar__month-list",attrs:{"focused-month":_vm.focused.month,"locale":_vm.locale},on:{"previous-month":_vm.onPreviousMonth,"next-month":_vm.onNextMonth}}),_vm._v(" "),_c('DateList',{staticClass:"vcalendar__date-list",attrs:{"locale":_vm.locale,"start-week-day":_vm.startWeekDay,"chosen":_vm.chosen,"focused":_vm.focused,"today":_vm.today,"disabled-passed":_vm.disabledPassed,"disabled-until":_vm.disabledUntil,"disabled-after":_vm.disabledAfter,"disabled-dates":_vm.disabledDates,"allowed-dates":_vm.allowedDates},on:{"change":_vm.onDateChange}})],1)],1)};
var __vue_staticRenderFns__$6 = [];

  /* style */
  var __vue_inject_styles__$6 = function (inject) {
    if (!inject) { return }
    inject("data-v-690ffc4d_0", { source: ".vcalendar{display:block;width:320px;box-sizing:border-box}.vcalendar *{box-sizing:inherit}.vcalendar__month-list,.vcalendar__year-list{flex-shrink:0;margin-bottom:8px}.vcalendar__year-list{width:50%}.vcalendar__month-list{width:80%}.vcalendar__date-list{flex-shrink:0}", map: undefined, media: undefined });

  };
  /* scoped */
  var __vue_scope_id__$6 = undefined;
  /* module identifier */
  var __vue_module_identifier__$6 = undefined;
  /* functional template */
  var __vue_is_functional_template__$6 = false;
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  var __vue_component__$6 = dist_1(
    { render: __vue_render__$6, staticRenderFns: __vue_staticRenderFns__$6 },
    __vue_inject_styles__$6,
    __vue_script__$6,
    __vue_scope_id__$6,
    __vue_is_functional_template__$6,
    __vue_module_identifier__$6,
    false,
    dist_2,
    undefined,
    undefined
  );

function install(Vue) {
  if (install.installed) { return; }
  install.installed = true;
  Vue.component('VCalendar', __vue_component__$6);
}
var plugin = {
  install: install
};
var GlobalVue = null;

if (typeof global !== 'undefined') {
  GlobalVue = global.Vue;
} else if (typeof window !== 'undefined') {
  GlobalVue = window.Vue;
}

if (GlobalVue) {
  GlobalVue.use(plugin);
}

__vue_component__$6.install = install;

export default __vue_component__$6;
export { install };
