__d(function(g,r,i,a,m,e,d){"use strict";Object.defineProperty(e,'__esModule',{value:!0}),Object.defineProperty(e,"WebSocket",{enumerable:!0,get:function(){return t}});const t=(0,r(d[0]).getNativeWebSocket)()},1315,[1316]);
__d(function(g,r,i,a,m,e,d){"use strict";Object.defineProperty(e,'__esModule',{value:!0}),e.getNativeWebSocket=function(){if("undefined"!=typeof WebSocket)return WebSocket;if(void 0!==g.WebSocket)return g.WebSocket;if(void 0!==window.WebSocket)return window.WebSocket;if(void 0!==self.WebSocket)return self.WebSocket;throw new Error("`WebSocket` is not supported in this environment")}},1316,[]);
__d(function(g,r,i,a,m,e,d){"use strict";Object.defineProperty(e,'__esModule',{value:!0}),Object.defineProperty(e,"openPay",{enumerable:!0,get:function(){return c.openPay}}),Object.defineProperty(e,"getExchanges",{enumerable:!0,get:function(){return c.getExchanges}}),Object.defineProperty(e,"getPayResult",{enumerable:!0,get:function(){return c.getPayResult}}),Object.defineProperty(e,"getPayError",{enumerable:!0,get:function(){return c.getPayError}}),Object.defineProperty(e,"getIsPaymentInProgress",{enumerable:!0,get:function(){return c.getIsPaymentInProgress}}),Object.defineProperty(e,"pay",{enumerable:!0,get:function(){return c.pay}}),Object.defineProperty(e,"PayController",{enumerable:!0,get:function(){return u.PayController}});var t=r(d[0]);Object.keys(t).forEach(function(n){'default'===n||Object.prototype.hasOwnProperty.call(e,n)||Object.defineProperty(e,n,{enumerable:!0,get:function(){return t[n]}})});var n=r(d[1]);Object.keys(n).forEach(function(t){'default'===t||Object.prototype.hasOwnProperty.call(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:function(){return n[t]}})});var o=r(d[2]);Object.keys(o).forEach(function(t){'default'===t||Object.prototype.hasOwnProperty.call(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:function(){return o[t]}})});var c=r(d[3]),u=r(d[4]),f=r(d[5]);Object.keys(f).forEach(function(t){'default'===t||Object.prototype.hasOwnProperty.call(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:function(){return f[t]}})})},5912,[6142,6152,6158,6170,6145,6171]);
__d(function(g,r,i,a,m,e,d){"use strict";Object.defineProperty(e,'__esModule',{value:!0});var t=r(d[0]);Object.keys(t).forEach(function(n){'default'===n||Object.prototype.hasOwnProperty.call(e,n)||Object.defineProperty(e,n,{enumerable:!0,get:function(){return t[n]}})})},5915,[6129]);
__d(function(g,_r,_i,a,m,_e,_d){"use strict";Object.defineProperty(_e,'__esModule',{value:!0}),Object.defineProperty(_e,"W3mEmailOtpWidget",{enumerable:!0,get:function(){return c}});var t=_r(_d[0]),e=_r(_d[1]),i=_r(_d[2]),o=_r(_d[3]);_r(_d[4]),_r(_d[5]),_r(_d[6]),_r(_d[7]),_r(_d[8]);var r,n,l=_r(_d[9]),s=_r(_d[10]),u=(r=s)&&r.__esModule?r:{default:r},h=this&&this.__decorate||function(t,e,i,o){var r,n=arguments.length,l=n<3?e:null===o?o=Object.getOwnPropertyDescriptor(e,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)l=Reflect.decorate(t,e,i,o);else for(var s=t.length-1;s>=0;s--)(r=t[s])&&(l=(n<3?r(l):n>3?r(e,i,l):r(e,i))||l);return n>3&&l&&Object.defineProperty(e,i,l),l};let c=n=class extends t.LitElement{firstUpdated(){this.startOTPTimeout()}disconnectedCallback(){clearTimeout(this.OTPTimeout)}constructor(){super(),this.loading=!1,this.timeoutTimeLeft=l.W3mFrameHelpers.getTimeToNextEmailLogin(),this.error='',this.otp='',this.email=i.RouterController.state.data?.email,this.authConnector=i.ConnectorController.getAuthConnector()}render(){if(!this.email)throw new Error('w3m-email-otp-widget: No email provided');const e=Boolean(this.timeoutTimeLeft),i=this.getFooterLabels(e);return t.html`
      <wui-flex
        flexDirection="column"
        alignItems="center"
        .padding=${['4','0','4','0']}
        gap="4"
      >
        <wui-flex
          class="email-display"
          flexDirection="column"
          alignItems="center"
          .padding=${['0','5','0','5']}
        >
          <wui-text variant="md-regular" color="primary" align="center">
            Enter the code we sent to
          </wui-text>
          <wui-text variant="md-medium" color="primary" lineClamp="1" align="center">
            ${this.email}
          </wui-text>
        </wui-flex>

        <wui-text variant="sm-regular" color="secondary">The code expires in 20 minutes</wui-text>

        ${this.loading?t.html`<wui-loading-spinner size="xl" color="accent-primary"></wui-loading-spinner>`:t.html` <wui-flex flexDirection="column" alignItems="center" gap="2">
              <wui-otp
                dissabled
                length="6"
                @inputChange=${this.onOtpInputChange.bind(this)}
                .otp=${this.otp}
              ></wui-otp>
              ${this.error?t.html`
                    <wui-text variant="sm-regular" align="center" color="error">
                      ${this.error}. Try Again
                    </wui-text>
                  `:null}
            </wui-flex>`}

        <wui-flex alignItems="center" gap="2">
          <wui-text variant="sm-regular" color="secondary">${i.title}</wui-text>
          <wui-link @click=${this.onResendCode.bind(this)} .disabled=${e}>
            ${i.action}
          </wui-link>
        </wui-flex>
      </wui-flex>
    `}startOTPTimeout(){this.timeoutTimeLeft=l.W3mFrameHelpers.getTimeToNextEmailLogin(),this.OTPTimeout=setInterval(()=>{this.timeoutTimeLeft>0?this.timeoutTimeLeft=l.W3mFrameHelpers.getTimeToNextEmailLogin():clearInterval(this.OTPTimeout)},1e3)}async onOtpInputChange(t){try{this.loading||(this.otp=t.detail,this.shouldSubmitOnOtpChange()&&(this.loading=!0,await(this.onOtpSubmit?.(this.otp))))}catch(t){this.error=i.CoreHelperUtil.parseError(t),this.loading=!1}}async onResendCode(){try{if(this.onOtpResend){if(!this.loading&&!this.timeoutTimeLeft){this.error='',this.otp='';if(!i.ConnectorController.getAuthConnector()||!this.email)throw new Error('w3m-email-otp-widget: Unable to resend email');this.loading=!0,await this.onOtpResend(this.email),this.startOTPTimeout(),i.SnackController.showSuccess('Code email resent')}}else this.onStartOver&&this.onStartOver()}catch(t){i.SnackController.showError(t)}finally{this.loading=!1}}getFooterLabels(t){return this.onStartOver?{title:'Something wrong?',action:"Try again "+(t?`in ${this.timeoutTimeLeft}s`:'')}:{title:"Didn't receive it?",action:"Resend "+(t?`in ${this.timeoutTimeLeft}s`:'Code')}}shouldSubmitOnOtpChange(){return this.authConnector&&this.otp.length===n.OTP_LENGTH}};c.OTP_LENGTH=6,c.styles=u.default,h([(0,e.state)()],c.prototype,"loading",void 0),h([(0,e.state)()],c.prototype,"timeoutTimeLeft",void 0),h([(0,e.state)()],c.prototype,"error",void 0),c=n=h([(0,o.customElement)('w3m-email-otp-widget')],c)},5994,[5531,5557,5442,5528,5631,5640,5759,6132,5632,5449,6137]);
__d(function(g,r,i,a,m,e,d){"use strict";Object.defineProperty(e,'__esModule',{value:!0});var t=r(d[0]);Object.keys(t).forEach(function(n){'default'===n||Object.prototype.hasOwnProperty.call(e,n)||Object.defineProperty(e,n,{enumerable:!0,get:function(){return t[n]}})})},6022,[6138]);
__d(function(g,r,i,a,m,e,d){"use strict";Object.defineProperty(e,'__esModule',{value:!0});var t=r(d[0]);Object.keys(t).forEach(function(n){'default'===n||Object.prototype.hasOwnProperty.call(e,n)||Object.defineProperty(e,n,{enumerable:!0,get:function(){return t[n]}})})},6043,[6140]);
__d(function(g,r,i,a,m,e,d){"use strict";Object.defineProperty(e,'__esModule',{value:!0});var t=r(d[0]);Object.keys(t).forEach(function(n){'default'===n||Object.prototype.hasOwnProperty.call(e,n)||Object.defineProperty(e,n,{enumerable:!0,get:function(){return t[n]}})})},6063,[5601]);
__d(function(g,r,i,a,m,e,d){"use strict";Object.defineProperty(e,'__esModule',{value:!0});var t=r(d[0]);Object.keys(t).forEach(function(n){'default'===n||Object.prototype.hasOwnProperty.call(e,n)||Object.defineProperty(e,n,{enumerable:!0,get:function(){return t[n]}})})},6109,[6143]);
__d(function(_g,_r,_i,_a,_m,_e,_d){"use strict";Object.defineProperty(_e,'__esModule',{value:!0}),Object.defineProperty(_e,"CSSResult",{enumerable:!0,get:function(){return t.CSSResult}}),Object.defineProperty(_e,"ReactiveElement",{enumerable:!0,get:function(){return m}}),Object.defineProperty(_e,"adoptStyles",{enumerable:!0,get:function(){return t.adoptStyles}}),Object.defineProperty(_e,"css",{enumerable:!0,get:function(){return t.css}}),Object.defineProperty(_e,"defaultConverter",{enumerable:!0,get:function(){return d}}),Object.defineProperty(_e,"getCompatibleStyle",{enumerable:!0,get:function(){return t.getCompatibleStyle}}),Object.defineProperty(_e,"notEqual",{enumerable:!0,get:function(){return p}}),Object.defineProperty(_e,"supportsAdoptingStyleSheets",{enumerable:!0,get:function(){return t.supportsAdoptingStyleSheets}}),Object.defineProperty(_e,"unsafeCSS",{enumerable:!0,get:function(){return t.unsafeCSS}});var t=_r(_d[0]);
/**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   */const{is:e,defineProperty:r,getOwnPropertyDescriptor:s,getOwnPropertyNames:i,getOwnPropertySymbols:n,getPrototypeOf:o}=Object,a=globalThis,l=a.trustedTypes,h=l?l.emptyScript:"",c=a.reactiveElementPolyfillSupport,u=(t,e)=>t,d={toAttribute(t,e){switch(e){case Boolean:t=t?h:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let r=t;switch(e){case Boolean:r=null!==t;break;case Number:r=null===t?null:Number(t);break;case Object:case Array:try{r=JSON.parse(t)}catch(t){r=null}}return r}},p=(t,r)=>!e(t,r),f={attribute:!0,type:String,converter:d,reflect:!1,hasChanged:p};var y;null!=Symbol.metadata||(Symbol.metadata=Symbol("metadata")),null!=a.litPropertyMetadata||(a.litPropertyMetadata=new WeakMap);class m extends HTMLElement{static addInitializer(t){var e;this._$Ei(),(null!=(e=this.l)?e:this.l=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=f){if(e.state&&(e.attribute=!1),this._$Ei(),this.elementProperties.set(t,e),!e.noAccessor){const s=Symbol(),i=this.getPropertyDescriptor(t,s,e);void 0!==i&&r(this.prototype,t,i)}}static getPropertyDescriptor(t,e,r){var i;const{get:n,set:o}=null!=(i=s(this.prototype,t))?i:{get(){return this[e]},set(t){this[e]=t}};return{get(){return null==n?void 0:n.call(this)},set(e){const s=null==n?void 0:n.call(this);o.call(this,e),this.requestUpdate(t,s,r)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){var e;return null!=(e=this.elementProperties.get(t))?e:f}static _$Ei(){if(this.hasOwnProperty(u("elementProperties")))return;const t=o(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(u("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(u("properties"))){const t=this.properties,e=[...i(t),...n(t)];for(const r of e)this.createProperty(r,t[r])}const t=this[Symbol.metadata];if(null!==t){const e=litPropertyMetadata.get(t);if(void 0!==e)for(const[t,r]of e)this.elementProperties.set(t,r)}this._$Eh=new Map;for(const[t,e]of this.elementProperties){const r=this._$Eu(t,e);void 0!==r&&this._$Eh.set(r,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){const r=[];if(Array.isArray(e)){const s=new Set(e.flat(1/0).reverse());for(const e of s)r.unshift((0,t.getCompatibleStyle)(e))}else void 0!==e&&r.push((0,t.getCompatibleStyle)(e));return r}static _$Eu(t,e){const r=e.attribute;return!1===r?void 0:"string"==typeof r?r:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){var t;this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),null==(t=this.constructor.l)||t.forEach(t=>t(this))}addController(t){var e,r;(null!=(e=this._$EO)?e:this._$EO=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&(null==(r=t.hostConnected)||r.call(t))}removeController(t){var e;null==(e=this._$EO)||e.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const r of e.keys())this.hasOwnProperty(r)&&(t.set(r,this[r]),delete this[r]);t.size>0&&(this._$Ep=t)}createRenderRoot(){var e;const r=null!=(e=this.shadowRoot)?e:this.attachShadow(this.constructor.shadowRootOptions);return(0,t.adoptStyles)(r,this.constructor.elementStyles),r}connectedCallback(){var t;null!=this.renderRoot||(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),null==(t=this._$EO)||t.forEach(t=>{var e;return null==(e=t.hostConnected)?void 0:e.call(t)})}enableUpdating(t){}disconnectedCallback(){var t;null==(t=this._$EO)||t.forEach(t=>{var e;return null==(e=t.hostDisconnected)?void 0:e.call(t)})}attributeChangedCallback(t,e,r){this._$AK(t,r)}_$EC(t,e){var r;const s=this.constructor.elementProperties.get(t),i=this.constructor._$Eu(t,s);if(void 0!==i&&!0===s.reflect){const n=(void 0!==(null==(r=s.converter)?void 0:r.toAttribute)?s.converter:d).toAttribute(e,s.type);this._$Em=t,null==n?this.removeAttribute(i):this.setAttribute(i,n),this._$Em=null}}_$AK(t,e){var r;const s=this.constructor,i=s._$Eh.get(t);if(void 0!==i&&this._$Em!==i){const t=s.getPropertyOptions(i),n="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==(null==(r=t.converter)?void 0:r.fromAttribute)?t.converter:d;this._$Em=i,this[i]=n.fromAttribute(e,t.type),this._$Em=null}}requestUpdate(t,e,r){var s;if(void 0!==t){if(null!=r||(r=this.constructor.getPropertyOptions(t)),!(null!=(s=r.hasChanged)?s:p)(this[t],e))return;this.P(t,e,r)}!1===this.isUpdatePending&&(this._$ES=this._$ET())}P(t,e,r){var s;this._$AL.has(t)||this._$AL.set(t,e),!0===r.reflect&&this._$Em!==t&&(null!=(s=this._$Ej)?s:this._$Ej=new Set).add(t)}async _$ET(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var t;if(!this.isUpdatePending)return;if(!this.hasUpdated){if(null!=this.renderRoot||(this.renderRoot=this.createRenderRoot()),this._$Ep){for(const[t,e]of this._$Ep)this[t]=e;this._$Ep=void 0}const t=this.constructor.elementProperties;if(t.size>0)for(const[e,r]of t)!0!==r.wrapped||this._$AL.has(e)||void 0===this[e]||this.P(e,this[e],r)}let e=!1;const r=this._$AL;try{e=this.shouldUpdate(r),e?(this.willUpdate(r),null==(t=this._$EO)||t.forEach(t=>{var e;return null==(e=t.hostUpdate)?void 0:e.call(t)}),this.update(r)):this._$EU()}catch(t){throw e=!1,this._$EU(),t}e&&this._$AE(r)}willUpdate(t){}_$AE(t){var e;null==(e=this._$EO)||e.forEach(t=>{var e;return null==(e=t.hostUpdated)?void 0:e.call(t)}),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EU(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Ej&&(this._$Ej=this._$Ej.forEach(t=>this._$EC(t,this[t]))),this._$EU()}updated(t){}firstUpdated(t){}}m.elementStyles=[],m.shadowRootOptions={mode:"open"},m[u("elementProperties")]=new Map,m[u("finalized")]=new Map,null==c||c({ReactiveElement:m}),(null!=(y=a.reactiveElementVersions)?y:a.reactiveElementVersions=[]).push("2.0.4")},6110,[6115]);
__d(function(_g,_r,_i,_a,_m,_e,_d){"use strict";Object.defineProperty(_e,'__esModule',{value:!0}),Object.defineProperty(_e,"html",{enumerable:!0,get:function(){return m}}),Object.defineProperty(_e,"noChange",{enumerable:!0,get:function(){return H}}),Object.defineProperty(_e,"nothing",{enumerable:!0,get:function(){return x}}),Object.defineProperty(_e,"render",{enumerable:!0,get:function(){return W}}),Object.defineProperty(_e,"svg",{enumerable:!0,get:function(){return y}});
/**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   */
const t=globalThis,e=t.trustedTypes,i=e?e.createPolicy("lit-html",{createHTML:t=>t}):void 0,s="$lit$",n=`lit$${Math.random().toFixed(9).slice(2)}$`,r="?"+n,o=`<${r}>`,l=document,h=()=>l.createComment(""),$=t=>null===t||"object"!=typeof t&&"function"!=typeof t,u=Array.isArray,a="[ \t\n\f\r]",c=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,d=/-->/g,_=/>/g,A=RegExp(`>|${a}(?:([^\\s"'>=/]+)(${a}*=${a}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),p=/'/g,v=/"/g,g=/^(?:script|style|textarea|title)$/i,f=t=>(e,...i)=>({_$litType$:t,strings:e,values:i}),m=f(1),y=f(2),H=Symbol.for("lit-noChange"),x=Symbol.for("lit-nothing"),b=new WeakMap,N=l.createTreeWalker(l,129);function T(t,e){if(!Array.isArray(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==i?i.createHTML(e):e}const C=(t,e)=>{const i=t.length-1,r=[];let l,h=2===e?"<svg>":"",$=c;for(let e=0;e<i;e++){const i=t[e];let u,a,f=-1,m=0;for(;m<i.length&&($.lastIndex=m,a=$.exec(i),null!==a);)m=$.lastIndex,$===c?"!--"===a[1]?$=d:void 0!==a[1]?$=_:void 0!==a[2]?(g.test(a[2])&&(l=RegExp("</"+a[2],"g")),$=A):void 0!==a[3]&&($=A):$===A?">"===a[0]?($=null!=l?l:c,f=-1):void 0===a[1]?f=-2:(f=$.lastIndex-a[2].length,u=a[1],$=void 0===a[3]?A:'"'===a[3]?v:p):$===v||$===p?$=A:$===d||$===_?$=c:($=A,l=void 0);const y=$===A&&t[e+1].startsWith("/>")?" ":"";h+=$===c?i+o:f>=0?(r.push(u),i.slice(0,f)+s+i.slice(f)+n+y):i+n+(-2===f?e:y)}return[T(t,h+(t[i]||"<?>")+(2===e?"</svg>":"")),r]};class M{constructor({strings:t,_$litType$:i},o){let l;this.parts=[];let $=0,u=0;const a=t.length-1,c=this.parts,[d,_]=C(t,i);if(this.el=M.createElement(d,o),N.currentNode=this.el.content,2===i){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes)}for(;null!==(l=N.nextNode())&&c.length<a;){if(1===l.nodeType){if(l.hasAttributes())for(const t of l.getAttributeNames())if(t.endsWith(s)){const e=_[u++],i=l.getAttribute(t).split(n),s=/([.?@])?(.*)/.exec(e);c.push({type:1,index:$,name:s[2],strings:i,ctor:"."===s[1]?E:"?"===s[1]?I:"@"===s[1]?B:j}),l.removeAttribute(t)}else t.startsWith(n)&&(c.push({type:6,index:$}),l.removeAttribute(t));if(g.test(l.tagName)){const t=l.textContent.split(n),i=t.length-1;if(i>0){l.textContent=e?e.emptyScript:"";for(let e=0;e<i;e++)l.append(t[e],h()),N.nextNode(),c.push({type:2,index:++$});l.append(t[i],h())}}}else if(8===l.nodeType)if(l.data===r)c.push({type:2,index:$});else{let t=-1;for(;-1!==(t=l.data.indexOf(n,t+1));)c.push({type:7,index:$}),t+=n.length-1}$++}}static createElement(t,e){const i=l.createElement("template");return i.innerHTML=t,i}}function S(t,e,i=t,s){var n,r,o;if(e===H)return e;let l=void 0!==s?null==(n=i._$Co)?void 0:n[s]:i._$Cl;const h=$(e)?void 0:e._$litDirective$;return(null==l?void 0:l.constructor)!==h&&(null==(r=null==l?void 0:l._$AO)||r.call(l,!1),void 0===h?l=void 0:(l=new h(t),l._$AT(t,i,s)),void 0!==s?(null!=(o=i._$Co)?o:i._$Co=[])[s]=l:i._$Cl=l),void 0!==l&&(e=S(t,l._$AS(t,e.values),l,s)),e}class w{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){var e;const{el:{content:i},parts:s}=this._$AD,n=(null!=(e=null==t?void 0:t.creationScope)?e:l).importNode(i,!0);N.currentNode=n;let r=N.nextNode(),o=0,h=0,$=s[0];for(;void 0!==$;){if(o===$.index){let e;2===$.type?e=new P(r,r.nextSibling,this,t):1===$.type?e=new $.ctor(r,$.name,$.strings,this,t):6===$.type&&(e=new O(r,this,t)),this._$AV.push(e),$=s[++h]}o!==(null==$?void 0:$.index)&&(r=N.nextNode(),o++)}return N.currentNode=l,n}p(t){let e=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}}class P{get _$AU(){var t,e;return null!=(e=null==(t=this._$AM)?void 0:t._$AU)?e:this._$Cv}constructor(t,e,i,s){var n;this.type=2,this._$AH=x,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=s,this._$Cv=null==(n=null==s?void 0:s.isConnected)||n}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===(null==t?void 0:t.nodeType)&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){var i;t=S(this,t,e),$(t)?t===x||null==t||""===t?(this._$AH!==x&&this._$AR(),this._$AH=x):t!==this._$AH&&t!==H&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):u(i=t)||"function"==typeof(null==i?void 0:i[Symbol.iterator])?this.k(t):this._(t)}S(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.S(t))}_(t){this._$AH!==x&&$(this._$AH)?this._$AA.nextSibling.data=t:this.T(l.createTextNode(t)),this._$AH=t}$(t){var e;const{values:i,_$litType$:s}=t,n="number"==typeof s?this._$AC(t):(void 0===s.el&&(s.el=M.createElement(T(s.h,s.h[0]),this.options)),s);if((null==(e=this._$AH)?void 0:e._$AD)===n)this._$AH.p(i);else{const t=new w(n,this),e=t.u(this.options);t.p(i),this.T(e),this._$AH=t}}_$AC(t){let e=b.get(t.strings);return void 0===e&&b.set(t.strings,e=new M(t)),e}k(t){u(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let i,s=0;for(const n of t)s===e.length?e.push(i=new P(this.S(h()),this.S(h()),this,this.options)):i=e[s],i._$AI(n),s++;s<e.length&&(this._$AR(i&&i._$AB.nextSibling,s),e.length=s)}_$AR(t=this._$AA.nextSibling,e){var i;for(null==(i=this._$AP)||i.call(this,!1,!0,e);t&&t!==this._$AB;){const e=t.nextSibling;t.remove(),t=e}}setConnected(t){var e;void 0===this._$AM&&(this._$Cv=t,null==(e=this._$AP)||e.call(this,t))}}class j{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,i,s,n){this.type=1,this._$AH=x,this._$AN=void 0,this.element=t,this.name=e,this._$AM=s,this.options=n,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=x}_$AI(t,e=this,i,s){const n=this.strings;let r=!1;if(void 0===n)t=S(this,t,e,0),r=!$(t)||t!==this._$AH&&t!==H,r&&(this._$AH=t);else{const s=t;let o,l;for(t=n[0],o=0;o<n.length-1;o++)l=S(this,s[i+o],e,o),l===H&&(l=this._$AH[o]),r||(r=!$(l)||l!==this._$AH[o]),l===x?t=x:t!==x&&(t+=(null!=l?l:"")+n[o+1]),this._$AH[o]=l}r&&!s&&this.j(t)}j(t){t===x?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,null!=t?t:"")}}class E extends j{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===x?void 0:t}}class I extends j{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==x)}}class B extends j{constructor(t,e,i,s,n){super(t,e,i,s,n),this.type=5}_$AI(t,e=this){var i;if((t=null!=(i=S(this,t,e,0))?i:x)===H)return;const s=this._$AH,n=t===x&&s!==x||t.capture!==s.capture||t.once!==s.once||t.passive!==s.passive,r=t!==x&&(s===x||n);n&&this.element.removeEventListener(this.name,this,s),r&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){var e,i;"function"==typeof this._$AH?this._$AH.call(null!=(i=null==(e=this.options)?void 0:e.host)?i:this.element,t):this._$AH.handleEvent(t)}}class O{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){S(this,t)}}const U=t.litHtmlPolyfillSupport;var R;null==U||U(M,P),(null!=(R=t.litHtmlVersions)?R:t.litHtmlVersions=[]).push("3.1.4");const W=(t,e,i)=>{var s,n;const r=null!=(s=null==i?void 0:i.renderBefore)?s:e;let o=r._$litPart$;if(void 0===o){const t=null!=(n=null==i?void 0:i.renderBefore)?n:null;r._$litPart$=o=new P(e.insertBefore(h(),t),t,void 0,null!=i?i:{})}return o._$AI(t),o}},6111,[]);
__d(function(g,_r,_i,a,m,_e,d){"use strict";Object.defineProperty(_e,'__esModule',{value:!0}),Object.defineProperty(_e,"LitElement",{enumerable:!0,get:function(){return r}}),Object.defineProperty(_e,"ReactiveElement",{enumerable:!0,get:function(){return t.ReactiveElement}}),Object.defineProperty(_e,"defaultConverter",{enumerable:!0,get:function(){return t.defaultConverter}}),Object.defineProperty(_e,"html",{enumerable:!0,get:function(){return n.html}}),Object.defineProperty(_e,"noChange",{enumerable:!0,get:function(){return n.noChange}}),Object.defineProperty(_e,"notEqual",{enumerable:!0,get:function(){return t.notEqual}}),Object.defineProperty(_e,"nothing",{enumerable:!0,get:function(){return n.nothing}}),Object.defineProperty(_e,"render",{enumerable:!0,get:function(){return n.render}}),Object.defineProperty(_e,"svg",{enumerable:!0,get:function(){return n.svg}});var e,t=_r(d[0]),n=_r(d[1]);
/**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   */
class r extends t.ReactiveElement{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var e;const t=super.createRenderRoot();return null!=(e=this.renderOptions).renderBefore||(e.renderBefore=t.firstChild),t}update(e){const t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=(0,n.render)(t,this.renderRoot,this.renderOptions)}connectedCallback(){var e;super.connectedCallback(),null==(e=this._$Do)||e.setConnected(!0)}disconnectedCallback(){var e;super.disconnectedCallback(),null==(e=this._$Do)||e.setConnected(!1)}render(){return n.noChange}}r._$litElement$=!0,r.finalized=!0,null==(e=globalThis.litElementHydrateSupport)||e.call(globalThis,{LitElement:r});const l=globalThis.litElementPolyfillSupport;var o;null==l||l({LitElement:r}),(null!=(o=globalThis.litElementVersions)?o:globalThis.litElementVersions=[]).push("4.0.6")},6112,[6110,6111]);
__d(function(g,r,i,a,m,_e,d){"use strict";Object.defineProperty(_e,'__esModule',{value:!0}),Object.defineProperty(_e,"customElement",{enumerable:!0,get:function(){return e}});
/**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   */
const e=e=>(t,n)=>{void 0!==n?n.addInitializer(()=>{customElements.define(e,t)}):customElements.define(e,t)}},6113,[]);
__d(function(_g,_r,_i,_a,m,_e,_d){"use strict";Object.defineProperty(_e,'__esModule',{value:!0}),Object.defineProperty(_e,"property",{enumerable:!0,get:function(){return d}}),Object.defineProperty(_e,"standardProperty",{enumerable:!0,get:function(){return u}});var e=_r(_d[0]),t=Object.defineProperty,r=Object.defineProperties,o=Object.getOwnPropertyDescriptors,n=Object.getOwnPropertySymbols,a=Object.prototype.hasOwnProperty,i=Object.prototype.propertyIsEnumerable,c=(e,r,o)=>r in e?t(e,r,{enumerable:!0,configurable:!0,writable:!0,value:o}):e[r]=o,s=(e,t)=>{for(var r in t||(t={}))a.call(t,r)&&c(e,r,t[r]);if(n)for(var r of n(t))i.call(t,r)&&c(e,r,t[r]);return e},p=(e,t)=>r(e,o(t));
/**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   */
const l={attribute:!0,type:String,converter:e.defaultConverter,reflect:!1,hasChanged:e.notEqual},u=(e=l,t,r)=>{const{kind:o,metadata:n}=r;let a=globalThis.litPropertyMetadata.get(n);if(void 0===a&&globalThis.litPropertyMetadata.set(n,a=new Map),a.set(r.name,e),"accessor"===o){const{name:o}=r;return{set(r){const n=t.get.call(this);t.set.call(this,r),this.requestUpdate(o,n,e)},init(t){return void 0!==t&&this.P(o,void 0,e),t}}}if("setter"===o){const{name:o}=r;return function(r){const n=this[o];t.call(this,r),this.requestUpdate(o,n,e)}}throw Error("Unsupported decorator location: "+o)};function d(e){return(t,r)=>"object"==typeof r?u(e,t,r):((e,t,r)=>{const o=t.hasOwnProperty(r);return t.constructor.createProperty(r,o?p(s({},e),{wrapped:!0}):e),o?Object.getOwnPropertyDescriptor(t,r):void 0})(e,t,r)}},6114,[6110]);
__d(function(g,_r,_i,_a,m,_e,_d){"use strict";Object.defineProperty(_e,'__esModule',{value:!0}),Object.defineProperty(_e,"CSSResult",{enumerable:!0,get:function(){return o}}),Object.defineProperty(_e,"adoptStyles",{enumerable:!0,get:function(){return i}}),Object.defineProperty(_e,"css",{enumerable:!0,get:function(){return c}}),Object.defineProperty(_e,"getCompatibleStyle",{enumerable:!0,get:function(){return u}}),Object.defineProperty(_e,"supportsAdoptingStyleSheets",{enumerable:!0,get:function(){return t}}),Object.defineProperty(_e,"unsafeCSS",{enumerable:!0,get:function(){return r}});
/**
   * @license
   * Copyright 2019 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   */
const e=globalThis,t=e.ShadowRoot&&(void 0===e.ShadyCSS||e.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,n=Symbol(),s=new WeakMap;class o{constructor(e,t,s){if(this._$cssResult$=!0,s!==n)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o;const n=this.t;if(t&&void 0===e){const t=void 0!==n&&1===n.length;t&&(e=s.get(n)),void 0===e&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),t&&s.set(n,e))}return e}toString(){return this.cssText}}const r=e=>new o("string"==typeof e?e:e+"",void 0,n),c=(e,...t)=>{const s=1===e.length?e[0]:t.reduce((t,n,s)=>t+(e=>{if(!0===e._$cssResult$)return e.cssText;if("number"==typeof e)return e;throw Error("Value passed to 'css' function must be a 'css' function result: "+e+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(n)+e[s+1],e[0]);return new o(s,e,n)},i=(n,s)=>{if(t)n.adoptedStyleSheets=s.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(const t of s){const s=document.createElement("style"),o=e.litNonce;void 0!==o&&s.setAttribute("nonce",o),s.textContent=t.cssText,n.appendChild(s)}},u=t?e=>e:e=>e instanceof CSSStyleSheet?(e=>{let t="";for(const n of e.cssRules)t+=n.cssText;return r(t)})(e):e},6115,[]);
__d(function(g,r,i,a,m,e,d){"use strict";Object.defineProperty(e,'__esModule',{value:!0});var t=r(d[0]);Object.keys(t).forEach(function(n){'default'===n||Object.prototype.hasOwnProperty.call(e,n)||Object.defineProperty(e,n,{enumerable:!0,get:function(){return t[n]}})});var n=r(d[1]);Object.keys(n).forEach(function(t){'default'===t||Object.prototype.hasOwnProperty.call(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:function(){return n[t]}})})},6129,[6130,6131]);
__d(function(g,r,i,a,m,e,d){"use strict";Object.defineProperty(e,'__esModule',{value:!0}),Object.defineProperty(e,"ReownAuthentication",{enumerable:!0,get:function(){return l}});var t=r(d[0]),s=r(d[1]),o=r(d[2]),n=r(d[3]),c=r(d[4]),h=r(d[5]);class l{constructor(s={}){this.otpUuid=null,this.listeners={sessionChanged:[]},this.localAuthStorageKey=s.localAuthStorageKey||t.SafeLocalStorageKeys.SIWX_AUTH_TOKEN,this.localNonceStorageKey=s.localNonceStorageKey||t.SafeLocalStorageKeys.SIWX_NONCE_TOKEN,this.required=s.required??!0,this.messenger=new h.ReownAuthenticationMessenger({getNonce:this.getNonce.bind(this)})}async createMessage(t){return this.messenger.createMessage(t)}async addSession(t){const s=await this.request({method:'POST',key:'authenticate',body:{data:t.data,message:t.message,signature:t.signature,clientId:this.getClientId(),walletInfo:this.getWalletInfo()},headers:['nonce','otp']});this.setStorageToken(s.token,this.localAuthStorageKey),this.emit('sessionChanged',t),this.setAppKitAccountUser(u(s.token)),this.otpUuid=null}async getSessions(t,s){try{if(!this.getStorageToken(this.localAuthStorageKey))return[];const o=await this.request({method:'GET',key:'me',query:{},headers:['auth']});if(!o)return[];const n=o.address.toLowerCase()===s.toLowerCase(),c=o.caip2Network===t;if(!n||!c)return[];const h={data:{accountAddress:o.address,chainId:o.caip2Network},message:'',signature:''};return this.emit('sessionChanged',h),this.setAppKitAccountUser(o),[h]}catch{return[]}}async revokeSession(t,s){return Promise.resolve(this.clearStorageTokens())}async setSessions(t){if(0===t.length)this.clearStorageTokens();else{const s=t.find(t=>t.data.chainId===(0,c.getActiveCaipNetwork)()?.caipNetworkId)||t[0];await this.addSession(s)}}getRequired(){return this.required}async getSessionAccount(){if(!this.getStorageToken(this.localAuthStorageKey))throw new Error('Not authenticated');return this.request({method:'GET',key:'me',body:void 0,query:{includeAppKitAccount:!0},headers:['auth']})}async setSessionAccountMetadata(t=null){if(!this.getStorageToken(this.localAuthStorageKey))throw new Error('Not authenticated');return this.request({method:'PUT',key:'account-metadata',body:{metadata:t},headers:['auth']})}on(t,s){return this.listeners[t].push(s),()=>{this.listeners[t]=this.listeners[t].filter(t=>t!==s)}}removeAllListeners(){Object.keys(this.listeners).forEach(t=>{this.listeners[t]=[]})}async requestEmailOtp({email:t,account:s}){const o=await this.request({method:'POST',key:'otp',body:{email:t,account:s}});return this.otpUuid=o.uuid,this.messenger.resources=[`email:${t}`],o}confirmEmailOtp({code:t}){return this.request({method:'PUT',key:'otp',body:{code:t},headers:['otp']})}async request({method:s,key:o,query:n,body:c,headers:h}){const{projectId:l,st:u,sv:y}=this.getSDKProperties(),S=new URL(`${t.ConstantsUtil.W3M_API_URL}/auth/v1/${String(o)}`);S.searchParams.set('projectId',l),S.searchParams.set('st',u),S.searchParams.set('sv',y),n&&Object.entries(n).forEach(([t,s])=>S.searchParams.set(t,String(s)));const p=await fetch(S,{method:s,body:c?JSON.stringify(c):void 0,headers:Array.isArray(h)?h.reduce((t,s)=>{switch(s){case'nonce':t['x-nonce-jwt']=`Bearer ${this.getStorageToken(this.localNonceStorageKey)}`;break;case'auth':t.Authorization=`Bearer ${this.getStorageToken(this.localAuthStorageKey)}`;break;case'otp':this.otpUuid&&(t['x-otp']=this.otpUuid)}return t},{}):void 0});if(!p.ok)throw new Error(await p.text());return p.headers.get('content-type')?.includes('application/json')?p.json():null}getStorageToken(s){return t.SafeLocalStorage.getItem(s)}setStorageToken(s,o){t.SafeLocalStorage.setItem(o,s)}clearStorageTokens(){this.otpUuid=null,t.SafeLocalStorage.removeItem(this.localAuthStorageKey),t.SafeLocalStorage.removeItem(this.localNonceStorageKey),this.emit('sessionChanged',void 0)}async getNonce(){const{nonce:t,token:s}=await this.request({method:'GET',key:'nonce'});return this.setStorageToken(s,this.localNonceStorageKey),t}getClientId(){return o.BlockchainApiController.state.clientId}getWalletInfo(){const t=n.ChainController.getAccountData()?.connectedWalletInfo;if(!t)return;if('social'in t&&'identifier'in t){return{type:'social',social:t.social,identifier:t.identifier}}const{name:s,icon:o}=t;let c='unknown';switch(t.type){case'EXTERNAL':case'INJECTED':case'ANNOUNCED':c='extension';break;case'WALLET_CONNECT':c='walletconnect';break;default:c='unknown'}return{type:c,name:s,icon:o}}getSDKProperties(){return s.ApiController._getSdkProperties()}emit(t,s){this.listeners[t].forEach(t=>t(s))}setAppKitAccountUser(s){const{email:o}=s;o&&Object.values(t.ConstantsUtil.CHAIN).forEach(t=>{n.ChainController.setAccountProp('user',{email:o},t)})}}function u(t){const s=t.split('.');if(3!==s.length)throw new Error('Invalid token');const o=s[1];if('string'!=typeof o)throw new Error('Invalid token');const n=o.replace(/-/gu,'+').replace(/_/gu,'/'),c=n.padEnd(n.length+(4-n.length%4)%4,'=');return JSON.parse(atob(c))}},6130,[3707,5474,5463,5448,5469,6131]);
__d(function(g,r,i,a,m,e,d){"use strict";Object.defineProperty(e,'__esModule',{value:!0}),Object.defineProperty(e,"ReownAuthenticationMessenger",{enumerable:!0,get:function(){return o}});var t=r(d[0]),n=r(d[1]);class o{constructor(t){this.getNonce=t.getNonce}async createMessage(t){const n={accountAddress:t.accountAddress,chainId:t.chainId,version:'1',domain:'undefined'==typeof document?'Unknown Domain':document.location.host,uri:'undefined'==typeof document?'Unknown URI':document.location.href,resources:this.resources,nonce:await this.getNonce(t),issuedAt:this.stringifyDate(new Date),statement:void 0,expirationTime:void 0,notBefore:void 0},o={toString:()=>this.stringify(n)};return Object.assign(n,o)}stringify(t){const n=this.getNetworkName(t.chainId);return[`${t.domain} wants you to sign in with your ${n} account:`,t.accountAddress,t.statement?`\n${t.statement}\n`:'',`URI: ${t.uri}`,`Version: ${t.version}`,`Chain ID: ${t.chainId}`,`Nonce: ${t.nonce}`,t.issuedAt&&`Issued At: ${t.issuedAt}`,t.expirationTime&&`Expiration Time: ${t.expirationTime}`,t.notBefore&&`Not Before: ${t.notBefore}`,t.requestId&&`Request ID: ${t.requestId}`,t.resources?.length&&t.resources.reduce((t,n)=>`${t}\n- ${n}`,'Resources:')].filter(t=>'string'==typeof t).join('\n').trim()}getNetworkName(o){const s=n.ChainController.getAllRequestedCaipNetworks();return t.NetworkUtil.getNetworkNameByCaipNetworkId(s,o)}stringifyDate(t){return t.toISOString()}}},6131,[3707,5448]);
__d(function(g,r,i,a,m,e,d){"use strict";Object.defineProperty(e,'__esModule',{value:!0});var t=r(d[0]);Object.keys(t).forEach(function(n){'default'===n||Object.prototype.hasOwnProperty.call(e,n)||Object.defineProperty(e,n,{enumerable:!0,get:function(){return t[n]}})})},6132,[6133]);
__d(function(g,_r,_i,a,m,_e,_d){"use strict";Object.defineProperty(_e,'__esModule',{value:!0}),Object.defineProperty(_e,"WuiOtp",{enumerable:!0,get:function(){return h}});var t=_r(_d[0]),e=_r(_d[1]);_r(_d[2]);var s=_r(_d[3]),i=_r(_d[4]),n=_r(_d[5]);_r(_d[6]);var u,l=_r(_d[7]),r=(u=l)&&u.__esModule?u:{default:u},o=this&&this.__decorate||function(t,e,s,i){var n,u=arguments.length,l=u<3?e:null===i?i=Object.getOwnPropertyDescriptor(e,s):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)l=Reflect.decorate(t,e,s,i);else for(var r=t.length-1;r>=0;r--)(n=t[r])&&(l=(u<3?n(l):u>3?n(e,s,l):n(e,s))||l);return u>3&&l&&Object.defineProperty(e,s,l),l};let h=class extends t.LitElement{constructor(){super(...arguments),this.length=6,this.otp='',this.values=Array.from({length:this.length}).map(()=>''),this.numerics=[],this.shouldInputBeEnabled=t=>this.values.slice(0,t).every(t=>''!==t),this.handleKeyDown=(t,e)=>{const s=t.target,i=this.getInputElement(s);if(!i)return;['ArrowLeft','ArrowRight','Shift','Delete'].includes(t.key)&&t.preventDefault();const n=i.selectionStart;switch(t.key){case'ArrowLeft':n&&i.setSelectionRange(n+1,n+1),this.focusInputField('prev',e);break;case'ArrowRight':case'Shift':this.focusInputField('next',e);break;case'Delete':case'Backspace':''===i.value?this.focusInputField('prev',e):this.updateInput(i,e,'')}},this.focusInputField=(t,e)=>{if('next'===t){const t=e+1;if(!this.shouldInputBeEnabled(t))return;const s=this.numerics[t<this.length?t:e],i=s?this.getInputElement(s):void 0;i&&(i.disabled=!1,i.focus())}if('prev'===t){const t=e-1,s=this.numerics[t>-1?t:e],i=s?this.getInputElement(s):void 0;i&&i.focus()}}}firstUpdated(){this.otp&&(this.values=this.otp.split(''));const t=this.shadowRoot?.querySelectorAll('wui-input-numeric');t&&(this.numerics=Array.from(t)),this.numerics[0]?.focus()}render(){return t.html`
      <wui-flex gap="1" data-testid="wui-otp-input">
        ${Array.from({length:this.length}).map((e,s)=>t.html`
            <wui-input-numeric
              @input=${t=>this.handleInput(t,s)}
              @click=${t=>this.selectInput(t)}
              @keydown=${t=>this.handleKeyDown(t,s)}
              .disabled=${!this.shouldInputBeEnabled(s)}
              .value=${this.values[s]||''}
            >
            </wui-input-numeric>
          `)}
      </wui-flex>
    `}updateInput(t,e,s){const i=this.numerics[e],n=t||(i?this.getInputElement(i):void 0);n&&(n.value=s,this.values=this.values.map((t,i)=>i===e?s:t))}selectInput(t){const e=t.target;if(e){const t=this.getInputElement(e);t?.select()}}handleInput(t,e){const s=t.target,n=this.getInputElement(s);if(n){const s=n.value;if('insertFromPaste'===t.inputType)this.handlePaste(n,s,e);else{i.UiHelperUtil.isNumber(s)&&t.data?(this.updateInput(n,e,t.data),this.focusInputField('next',e)):this.updateInput(n,e,'')}}this.dispatchInputChangeEvent()}handlePaste(t,e,s){const n=e[0];if(n&&i.UiHelperUtil.isNumber(n)){this.updateInput(t,s,n);const i=e.substring(1);if(s+1<this.length&&i.length){const t=this.numerics[s+1],e=t?this.getInputElement(t):void 0;e&&this.handlePaste(e,i,s+1)}else this.focusInputField('next',s)}else this.updateInput(t,s,'')}getInputElement(t){return t.shadowRoot?.querySelector('input')?t.shadowRoot.querySelector('input'):null}dispatchInputChangeEvent(){const t=this.values.join('');this.dispatchEvent(new CustomEvent('inputChange',{detail:t,bubbles:!0,composed:!0}))}};h.styles=[s.resetStyles,r.default],o([(0,e.property)({type:Number})],h.prototype,"length",void 0),o([(0,e.property)({type:String})],h.prototype,"otp",void 0),o([(0,e.state)()],h.prototype,"values",void 0),h=o([(0,n.customElement)('wui-otp')],h)},6133,[5531,5557,5610,5530,5539,5541,6134,6136]);
__d(function(g,_r,_i,a,m,_e,_d){"use strict";Object.defineProperty(_e,'__esModule',{value:!0}),Object.defineProperty(_e,"WuiInputNumeric",{enumerable:!0,get:function(){return s}});var e,t=_r(_d[0]),r=_r(_d[1]),n=_r(_d[2]),o=_r(_d[3]),u=_r(_d[4]),l=(e=u)&&e.__esModule?e:{default:e},i=this&&this.__decorate||function(e,t,r,n){var o,u=arguments.length,l=u<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,r):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)l=Reflect.decorate(e,t,r,n);else for(var i=e.length-1;i>=0;i--)(o=e[i])&&(l=(u<3?o(l):u>3?o(t,r,l):o(t,r))||l);return u>3&&l&&Object.defineProperty(t,r,l),l};let s=class extends t.LitElement{constructor(){super(...arguments),this.disabled=!1,this.value=''}render(){return t.html`<input
      type="number"
      maxlength="1"
      inputmode="numeric"
      autofocus
      ?disabled=${this.disabled}
      value=${this.value}
    /> `}};s.styles=[n.resetStyles,n.elementStyles,l.default],i([(0,r.property)({type:Boolean})],s.prototype,"disabled",void 0),i([(0,r.property)({type:String})],s.prototype,"value",void 0),s=i([(0,o.customElement)('wui-input-numeric')],s)},6134,[5531,5557,5530,5541,6135]);
__d(function(g,r,i,a,m,e,d){"use strict";Object.defineProperty(e,'__esModule',{value:!0}),Object.defineProperty(e,"default",{enumerable:!0,get:function(){return o}});var o=r(d[0]).css`
  :host {
    position: relative;
    display: inline-block;
  }

  input {
    width: 48px;
    height: 48px;
    background: ${({tokens:o})=>o.theme.foregroundPrimary};
    border-radius: ${({borderRadius:o})=>o[4]};
    border: 1px solid ${({tokens:o})=>o.theme.borderPrimary};
    font-family: ${({fontFamily:o})=>o.regular};
    font-size: ${({textSize:o})=>o.large};
    line-height: 18px;
    letter-spacing: -0.16px;
    text-align: center;
    color: ${({tokens:o})=>o.theme.textPrimary};
    caret-color: ${({tokens:o})=>o.core.textAccentPrimary};
    transition:
      background-color ${({durations:o})=>o.lg}
        ${({easings:o})=>o['ease-out-power-2']},
      border-color ${({durations:o})=>o.lg}
        ${({easings:o})=>o['ease-out-power-2']},
      box-shadow ${({durations:o})=>o.lg}
        ${({easings:o})=>o['ease-out-power-2']};
    will-change: background-color, border-color, box-shadow;
    box-sizing: border-box;
    -webkit-appearance: none;
    -moz-appearance: textfield;
    padding: ${({spacing:o})=>o[4]};
  }

  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  input[type='number'] {
    -moz-appearance: textfield;
  }

  input:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }

  input:focus-visible:enabled {
    background-color: transparent;
    border: 1px solid ${({tokens:o})=>o.theme.borderSecondary};
    box-shadow: 0px 0px 0px 4px ${({tokens:o})=>o.core.foregroundAccent040};
  }
`},6135,[5537]);
__d(function(g,r,i,a,m,e,d){"use strict";Object.defineProperty(e,'__esModule',{value:!0}),Object.defineProperty(e,"default",{enumerable:!0,get:function(){return t}});var t=r(d[0]).css`
  :host {
    position: relative;
    display: block;
  }
`},6136,[5531]);
__d(function(g,r,i,a,m,e,d){"use strict";Object.defineProperty(e,'__esModule',{value:!0}),Object.defineProperty(e,"default",{enumerable:!0,get:function(){return t}});var t=r(d[0]).css`
  wui-loading-spinner {
    margin: 9px auto;
  }

  .email-display,
  .email-display wui-text {
    max-width: 100%;
  }
`},6137,[5531]);
__d(function(g,_r,_i,a,m,_e,_d){"use strict";Object.defineProperty(_e,'__esModule',{value:!0}),Object.defineProperty(_e,"WuiTokenButton",{enumerable:!0,get:function(){return p}});var e=_r(_d[0]),t=_r(_d[1]);_r(_d[2]),_r(_d[3]),_r(_d[4]),_r(_d[5]),_r(_d[6]);var i,r=_r(_d[7]),s=_r(_d[8]),o=_r(_d[9]),l=(i=o)&&i.__esModule?i:{default:i},n=this&&this.__decorate||function(e,t,i,r){var s,o=arguments.length,l=o<3?t:null===r?r=Object.getOwnPropertyDescriptor(t,i):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)l=Reflect.decorate(e,t,i,r);else for(var n=e.length-1;n>=0;n--)(s=e[n])&&(l=(o<3?s(l):o>3?s(t,i,l):s(t,i))||l);return o>3&&l&&Object.defineProperty(t,i,l),l};const c={lg:'lg-regular',md:'lg-regular',sm:'md-regular'},u={lg:'lg',md:'md',sm:'sm'};let p=class extends e.LitElement{constructor(){super(...arguments),this.size='md',this.disabled=!1,this.text='',this.loading=!1}render(){return this.loading?e.html` <wui-flex alignItems="center" gap="01" padding="01">
        <wui-shimmer width="20px" height="20px"></wui-shimmer>
        <wui-shimmer width="32px" height="18px" borderRadius="4xs"></wui-shimmer>
      </wui-flex>`:e.html`
      <button ?disabled=${this.disabled} data-size=${this.size}>
        ${this.imageTemplate()} ${this.textTemplate()}
      </button>
    `}imageTemplate(){if(this.imageSrc&&this.chainImageSrc)return e.html`<wui-flex class="left-image-container">
        <wui-image src=${this.imageSrc} class="token-image"></wui-image>
        <wui-image src=${this.chainImageSrc} class="chain-image"></wui-image>
      </wui-flex>`;if(this.imageSrc)return e.html`<wui-image src=${this.imageSrc} class="token-image"></wui-image>`;const t=u[this.size];return e.html`<wui-flex class="left-icon-container">
      <wui-icon size=${t} name="networkPlaceholder"></wui-icon>
    </wui-flex>`}textTemplate(){const t=c[this.size];return e.html`<wui-text color="primary" variant=${t}
      >${this.text}</wui-text
    >`}};p.styles=[r.resetStyles,r.elementStyles,l.default],n([(0,t.property)()],p.prototype,"size",void 0),n([(0,t.property)()],p.prototype,"imageSrc",void 0),n([(0,t.property)()],p.prototype,"chainImageSrc",void 0),n([(0,t.property)({type:Boolean})],p.prototype,"disabled",void 0),n([(0,t.property)()],p.prototype,"text",void 0),n([(0,t.property)({type:Boolean})],p.prototype,"loading",void 0),p=n([(0,s.customElement)('wui-token-button')],p)},6138,[5531,5557,5572,5601,5695,5605,5610,5530,5541,6139]);
__d(function(g,r,i,a,m,e,d){"use strict";Object.defineProperty(e,'__esModule',{value:!0}),Object.defineProperty(e,"default",{enumerable:!0,get:function(){return t}});var t=r(d[0]).css`
  button {
    display: block;
    display: flex;
    align-items: center;
    padding: ${({spacing:t})=>t[1]};
    transition: background-color ${({durations:t})=>t.lg}
      ${({easings:t})=>t['ease-out-power-2']};
    will-change: background-color;
    background-color: ${({tokens:t})=>t.theme.foregroundPrimary};
    border-radius: ${({borderRadius:t})=>t[32]};
  }

  wui-image {
    border-radius: ${({borderRadius:t})=>t[32]};
  }

  wui-text {
    padding-left: ${({spacing:t})=>t[1]};
    padding-right: ${({spacing:t})=>t[1]};
  }

  .left-icon-container {
    width: 24px;
    height: 24px;
    justify-content: center;
    align-items: center;
  }

  .left-image-container {
    position: relative;
    justify-content: center;
    align-items: center;
  }

  .chain-image {
    position: absolute;
    border: 1px solid ${({tokens:t})=>t.theme.foregroundPrimary};
  }

  /* -- Sizes --------------------------------------------------- */
  button[data-size='lg'] {
    height: 32px;
  }

  button[data-size='md'] {
    height: 28px;
  }

  button[data-size='sm'] {
    height: 24px;
  }

  button[data-size='lg'] .token-image {
    width: 24px;
    height: 24px;
  }

  button[data-size='md'] .token-image {
    width: 20px;
    height: 20px;
  }

  button[data-size='sm'] .token-image {
    width: 16px;
    height: 16px;
  }

  button[data-size='lg'] .left-icon-container {
    width: 24px;
    height: 24px;
  }

  button[data-size='md'] .left-icon-container {
    width: 20px;
    height: 20px;
  }

  button[data-size='sm'] .left-icon-container {
    width: 16px;
    height: 16px;
  }

  button[data-size='lg'] .chain-image {
    width: 12px;
    height: 12px;
    bottom: 2px;
    right: -4px;
  }

  button[data-size='md'] .chain-image {
    width: 10px;
    height: 10px;
    bottom: 2px;
    right: -4px;
  }

  button[data-size='sm'] .chain-image {
    width: 8px;
    height: 8px;
    bottom: 2px;
    right: -3px;
  }

  /* -- Focus states --------------------------------------------------- */
  button:focus-visible:enabled {
    background-color: ${({tokens:t})=>t.theme.foregroundSecondary};
    box-shadow: 0 0 0 4px ${({tokens:t})=>t.core.foregroundAccent040};
  }

  /* -- Hover & Active states ----------------------------------------------------------- */
  @media (hover: hover) {
    button:hover:enabled,
    button:active:enabled {
      background-color: ${({tokens:t})=>t.theme.foregroundSecondary};
    }
  }

  /* -- Disabled states --------------------------------------------------- */
  button:disabled {
    background-color: ${({tokens:t})=>t.theme.foregroundSecondary};
    opacity: 0.5;
  }
`},6139,[5537]);
__d(function(g,_r,_i,a,m,_e,_d){"use strict";Object.defineProperty(_e,'__esModule',{value:!0}),Object.defineProperty(_e,"WuiInputAmount",{enumerable:!0,get:function(){return d}});var t,e=_r(_d[0]),i=_r(_d[1]),r=_r(_d[2]),n=_r(_d[3]),s=_r(_d[4]),p=_r(_d[5]),o=_r(_d[6]),l=_r(_d[7]),u=(t=l)&&t.__esModule?t:{default:t},h=this&&this.__decorate||function(t,e,i,r){var n,s=arguments.length,p=s<3?e:null===r?r=Object.getOwnPropertyDescriptor(e,i):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)p=Reflect.decorate(t,e,i,r);else for(var o=t.length-1;o>=0;o--)(n=t[o])&&(p=(s<3?n(p):s>3?n(e,i,p):n(e,i))||p);return s>3&&p&&Object.defineProperty(e,i,p),p};let d=class extends e.LitElement{constructor(){super(...arguments),this.inputElementRef=(0,r.createRef)(),this.disabled=!1,this.value='',this.placeholder='0',this.widthVariant='auto',this.maxDecimals=void 0,this.maxIntegers=void 0,this.fontSize='h4',this.error=!1}firstUpdated(){this.resizeInput()}updated(){this.style.setProperty('--local-font-size',n.vars.textSize[this.fontSize]),this.resizeInput()}render(){return this.dataset.widthVariant=this.widthVariant,this.dataset.error=String(this.error),this.inputElementRef?.value&&this.value&&(this.inputElementRef.value.value=this.value),'auto'===this.widthVariant?this.inputTemplate():e.html`
      <div class="wui-input-amount-fit-width">
        <span class="wui-input-amount-fit-mirror"></span>
        ${this.inputTemplate()}
      </div>
    `}inputTemplate(){return e.html`<input
      ${(0,r.ref)(this.inputElementRef)}
      type="text"
      inputmode="decimal"
      pattern="[0-9,.]*"
      placeholder=${this.placeholder}
      ?disabled=${this.disabled}
      autofocus
      value=${this.value??''}
      @input=${this.dispatchInputChangeEvent.bind(this)}
    />`}dispatchInputChangeEvent(){this.inputElementRef.value&&(this.inputElementRef.value.value=p.UiHelperUtil.maskInput({value:this.inputElementRef.value.value,decimals:this.maxDecimals,integers:this.maxIntegers}),this.dispatchEvent(new CustomEvent('inputChange',{detail:this.inputElementRef.value.value,bubbles:!0,composed:!0})),this.resizeInput())}resizeInput(){if('fit'===this.widthVariant){const t=this.inputElementRef.value;if(t){const e=t.previousElementSibling;e&&(e.textContent=t.value||'0',t.style.width=`${e.offsetWidth}px`)}}}};d.styles=[s.resetStyles,s.elementStyles,u.default],h([(0,i.property)({type:Boolean})],d.prototype,"disabled",void 0),h([(0,i.property)({type:String})],d.prototype,"value",void 0),h([(0,i.property)({type:String})],d.prototype,"placeholder",void 0),h([(0,i.property)({type:String})],d.prototype,"widthVariant",void 0),h([(0,i.property)({type:Number})],d.prototype,"maxDecimals",void 0),h([(0,i.property)({type:Number})],d.prototype,"maxIntegers",void 0),h([(0,i.property)({type:String})],d.prototype,"fontSize",void 0),h([(0,i.property)({type:Boolean})],d.prototype,"error",void 0),d=h([(0,o.customElement)('wui-input-amount')],d)},6140,[5531,5557,5734,5537,5530,5539,5541,6141]);
__d(function(g,r,i,a,m,e,d){"use strict";Object.defineProperty(e,'__esModule',{value:!0}),Object.defineProperty(e,"default",{enumerable:!0,get:function(){return t}});var t=r(d[0]).css`
  :host {
    position: relative;
    display: inline-block;
  }

  :host([data-error='true']) > input {
    color: ${({tokens:t})=>t.core.textError};
  }

  :host([data-error='false']) > input {
    color: ${({tokens:t})=>t.theme.textPrimary};
  }

  input {
    background: transparent;
    height: auto;
    box-sizing: border-box;
    color: ${({tokens:t})=>t.theme.textPrimary};
    font-feature-settings: 'case' on;
    font-size: ${({textSize:t})=>t.h4};
    caret-color: ${({tokens:t})=>t.core.backgroundAccentPrimary};
    line-height: ${({typography:t})=>t['h4-regular-mono'].lineHeight};
    letter-spacing: ${({typography:t})=>t['h4-regular-mono'].letterSpacing};
    -webkit-appearance: none;
    -moz-appearance: textfield;
    padding: 0px;
    font-family: ${({fontFamily:t})=>t.mono};
  }

  :host([data-width-variant='auto']) input {
    width: 100%;
  }

  :host([data-width-variant='fit']) input {
    width: 1ch;
  }

  .wui-input-amount-fit-mirror {
    position: absolute;
    visibility: hidden;
    white-space: pre;
    font-size: var(--local-font-size);
    line-height: 130%;
    letter-spacing: -1.28px;
    font-family: ${({fontFamily:t})=>t.mono};
  }

  .wui-input-amount-fit-width {
    display: inline-block;
    position: relative;
  }

  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  input::placeholder {
    color: ${({tokens:t})=>t.theme.textSecondary};
  }
`},6141,[5537]);
__d(function(g,_r,_i,a,m,_e,_d){"use strict";Object.defineProperty(_e,'__esModule',{value:!0}),Object.defineProperty(_e,"W3mPayView",{enumerable:!0,get:function(){return h}});var e=_r(_d[0]),t=_r(_d[1]),i=_r(_d[2]);_r(_d[3]);var n=_r(_d[4]),o=_r(_d[5]);_r(_d[6]),_r(_d[7]),_r(_d[8]),_r(_d[9]),_r(_d[10]),_r(_d[11]),_r(_d[12]),_r(_d[13]),_r(_d[14]),_r(_d[15]),_r(_d[16]),_r(_d[17]);var r,s=_r(_d[18]),l=_r(_d[19]),c=_r(_d[20]),u=_r(_d[21]),d=(r=u)&&r.__esModule?r:{default:r},p=this&&this.__decorate||function(e,t,i,n){var o,r=arguments.length,s=r<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,i):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)s=Reflect.decorate(e,t,i,n);else for(var l=e.length-1;l>=0;l--)(o=e[l])&&(s=(r<3?o(s):r>3?o(t,i,s):o(t,i))||s);return r>3&&s&&Object.defineProperty(t,i,s),s};let h=class extends e.LitElement{constructor(){super(),this.unsubscribe=[],this.amount=s.PayController.state.amount,this.namespace=void 0,this.paymentAsset=s.PayController.state.paymentAsset,this.activeConnectorIds=n.ConnectorController.state.activeConnectorIds,this.caipAddress=void 0,this.exchanges=s.PayController.state.exchanges,this.isLoading=s.PayController.state.isLoading,this.initializeNamespace(),this.unsubscribe.push(s.PayController.subscribeKey('amount',e=>this.amount=e)),this.unsubscribe.push(n.ConnectorController.subscribeKey('activeConnectorIds',e=>this.activeConnectorIds=e)),this.unsubscribe.push(s.PayController.subscribeKey('exchanges',e=>this.exchanges=e)),this.unsubscribe.push(s.PayController.subscribeKey('isLoading',e=>this.isLoading=e)),s.PayController.fetchExchanges(),s.PayController.setSelectedExchange(void 0)}disconnectedCallback(){this.unsubscribe.forEach(e=>e())}render(){return e.html`
      <wui-flex flexDirection="column">
        ${this.paymentDetailsTemplate()} ${this.paymentMethodsTemplate()}
      </wui-flex>
    `}paymentMethodsTemplate(){return e.html`
      <wui-flex flexDirection="column" padding="3" gap="2" class="payment-methods-container">
        ${this.payWithWalletTemplate()} ${this.templateSeparator()}
        ${this.templateExchangeOptions()}
      </wui-flex>
    `}initializeNamespace(){const e=n.ChainController.state.activeChain;this.namespace=e,this.caipAddress=n.ChainController.getAccountData(e)?.caipAddress,this.unsubscribe.push(n.ChainController.subscribeChainProp('accountState',e=>{this.caipAddress=e?.caipAddress},e))}paymentDetailsTemplate(){const t=n.ChainController.getAllRequestedCaipNetworks().find(e=>e.caipNetworkId===this.paymentAsset.network);return e.html`
      <wui-flex
        alignItems="center"
        justifyContent="space-between"
        .padding=${['6','8','6','8']}
        gap="2"
      >
        <wui-flex alignItems="center" gap="1">
          <wui-text variant="h1-regular" color="primary">
            ${(0,l.formatAmount)(this.amount||'0')}
          </wui-text>

          <wui-flex flexDirection="column">
            <wui-text variant="h6-regular" color="secondary">
              ${this.paymentAsset.metadata.symbol||'Unknown'}
            </wui-text>
            <wui-text variant="md-medium" color="secondary"
              >on ${t?.name||'Unknown'}</wui-text
            >
          </wui-flex>
        </wui-flex>

        <wui-flex class="left-image-container">
          <wui-image
            src=${(0,i.ifDefined)(this.paymentAsset.metadata.logoURI)}
            class="token-image"
          ></wui-image>
          <wui-image
            src=${(0,i.ifDefined)(n.AssetUtil.getNetworkImage(t))}
            class="chain-image"
          ></wui-image>
        </wui-flex>
      </wui-flex>
    `}payWithWalletTemplate(){return(0,l.isPayWithWalletSupported)(this.paymentAsset.network)?this.caipAddress?this.connectedWalletTemplate():this.disconnectedWalletTemplate():e.html``}connectedWalletTemplate(){const{name:t,image:n}=this.getWalletProperties({namespace:this.namespace});return e.html`
      <wui-flex flexDirection="column" gap="3">
        <wui-list-item
          type="secondary"
          boxColor="foregroundSecondary"
          @click=${this.onWalletPayment}
          .boxed=${!1}
          ?chevron=${!0}
          ?fullSize=${!1}
          ?rounded=${!0}
          data-testid="wallet-payment-option"
          imageSrc=${(0,i.ifDefined)(n)}
          imageSize="3xl"
        >
          <wui-text variant="lg-regular" color="primary">Pay with ${t}</wui-text>
        </wui-list-item>

        <wui-list-item
          type="secondary"
          icon="power"
          iconColor="error"
          @click=${this.onDisconnect}
          data-testid="disconnect-button"
          ?chevron=${!1}
          boxColor="foregroundSecondary"
        >
          <wui-text variant="lg-regular" color="secondary">Disconnect</wui-text>
        </wui-list-item>
      </wui-flex>
    `}disconnectedWalletTemplate(){return e.html`<wui-list-item
      type="secondary"
      boxColor="foregroundSecondary"
      variant="icon"
      iconColor="default"
      iconVariant="overlay"
      icon="wallet"
      @click=${this.onWalletPayment}
      ?chevron=${!0}
      data-testid="wallet-payment-option"
    >
      <wui-text variant="lg-regular" color="primary">Pay with wallet</wui-text>
    </wui-list-item>`}templateExchangeOptions(){if(this.isLoading)return e.html`<wui-flex justifyContent="center" alignItems="center">
        <wui-loading-spinner size="md"></wui-loading-spinner>
      </wui-flex>`;const t=this.exchanges.filter(e=>(0,l.isTestnetAsset)(this.paymentAsset)?e.id===c.REOWN_TEST_EXCHANGE_ID:e.id!==c.REOWN_TEST_EXCHANGE_ID);return 0===t.length?e.html`<wui-flex justifyContent="center" alignItems="center">
        <wui-text variant="md-medium" color="primary">No exchanges available</wui-text>
      </wui-flex>`:t.map(t=>e.html`
        <wui-list-item
          type="secondary"
          boxColor="foregroundSecondary"
          @click=${()=>this.onExchangePayment(t)}
          data-testid="exchange-option-${t.id}"
          ?chevron=${!0}
          imageSrc=${(0,i.ifDefined)(t.imageUrl)}
        >
          <wui-text flexGrow="1" variant="lg-regular" color="primary">
            Pay with ${t.name}
          </wui-text>
        </wui-list-item>
      `)}templateSeparator(){return e.html`<wui-separator text="or" bgColor="secondary"></wui-separator>`}async onWalletPayment(){if(!this.namespace)throw new Error('Namespace not found');this.caipAddress?n.RouterController.push('PayQuote'):(await n.ConnectorController.connect(),await n.ModalController.open({view:'PayQuote'}))}onExchangePayment(e){s.PayController.setSelectedExchange(e),n.RouterController.push('PayQuote')}async onDisconnect(){try{await n.ConnectionController.disconnect(),await n.ModalController.open({view:'Pay'})}catch{console.error('Failed to disconnect'),n.SnackController.showError('Failed to disconnect')}}getWalletProperties({namespace:e}){if(!e)return{name:void 0,image:void 0};const t=this.activeConnectorIds[e];if(!t)return{name:void 0,image:void 0};const i=n.ConnectorController.getConnector({id:t,namespace:e});if(!i)return{name:void 0,image:void 0};const o=n.AssetUtil.getConnectorImage(i);return{name:i.name,image:o}}};h.styles=d.default,p([(0,t.state)()],h.prototype,"amount",void 0),p([(0,t.state)()],h.prototype,"namespace",void 0),p([(0,t.state)()],h.prototype,"paymentAsset",void 0),p([(0,t.state)()],h.prototype,"activeConnectorIds",void 0),p([(0,t.state)()],h.prototype,"caipAddress",void 0),p([(0,t.state)()],h.prototype,"exchanges",void 0),p([(0,t.state)()],h.prototype,"isLoading",void 0),h=p([(0,o.customElement)('w3m-pay-view')],h)},6142,[5531,5557,5568,3707,5442,5528,5664,5631,5639,6109,5650,6063,5653,5759,5859,5724,5632,5755,6145,6150,6148,6151]);
__d(function(g,_r,_i,a,m,_e,_d){"use strict";Object.defineProperty(_e,'__esModule',{value:!0}),Object.defineProperty(_e,"WuiIconButton",{enumerable:!0,get:function(){return l}});var t=_r(_d[0]),e=_r(_d[1]),i=_r(_d[2]);_r(_d[3]);var o,r=_r(_d[4]),n=_r(_d[5]),p=_r(_d[6]),s=(o=p)&&o.__esModule?o:{default:o},d=this&&this.__decorate||function(t,e,i,o){var r,n=arguments.length,p=n<3?e:null===o?o=Object.getOwnPropertyDescriptor(e,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)p=Reflect.decorate(t,e,i,o);else for(var s=t.length-1;s>=0;s--)(r=t[s])&&(p=(n<3?r(p):n>3?r(e,i,p):r(e,i))||p);return n>3&&p&&Object.defineProperty(e,i,p),p};let l=class extends t.LitElement{constructor(){super(...arguments),this.icon='card',this.variant='primary',this.type='accent',this.size='md',this.iconSize=void 0,this.fullWidth=!1,this.disabled=!1}render(){return t.html`<button
      data-variant=${this.variant}
      data-type=${this.type}
      data-size=${this.size}
      data-full-width=${this.fullWidth}
      ?disabled=${this.disabled}
    >
      <wui-icon color="inherit" name=${this.icon} size=${(0,i.ifDefined)(this.iconSize)}></wui-icon>
    </button>`}};l.styles=[r.resetStyles,r.elementStyles,s.default],d([(0,e.property)()],l.prototype,"icon",void 0),d([(0,e.property)()],l.prototype,"variant",void 0),d([(0,e.property)()],l.prototype,"type",void 0),d([(0,e.property)()],l.prototype,"size",void 0),d([(0,e.property)()],l.prototype,"iconSize",void 0),d([(0,e.property)({type:Boolean})],l.prototype,"fullWidth",void 0),d([(0,e.property)({type:Boolean})],l.prototype,"disabled",void 0),l=d([(0,n.customElement)('wui-icon-button')],l)},6143,[5531,5557,5568,5572,5530,5541,6144]);
__d(function(g,r,i,a,m,e,d){"use strict";Object.defineProperty(e,'__esModule',{value:!0}),Object.defineProperty(e,"default",{enumerable:!0,get:function(){return t}});var t=r(d[0]).css`
  :host {
    position: relative;
  }

  button {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: transparent;
    padding: ${({spacing:t})=>t[1]};
  }

  /* -- Colors --------------------------------------------------- */
  button[data-type='accent'] wui-icon {
    color: ${({tokens:t})=>t.core.iconAccentPrimary};
  }

  button[data-type='neutral'][data-variant='primary'] wui-icon {
    color: ${({tokens:t})=>t.theme.iconInverse};
  }

  button[data-type='neutral'][data-variant='secondary'] wui-icon {
    color: ${({tokens:t})=>t.theme.iconDefault};
  }

  button[data-type='success'] wui-icon {
    color: ${({tokens:t})=>t.core.iconSuccess};
  }

  button[data-type='error'] wui-icon {
    color: ${({tokens:t})=>t.core.iconError};
  }

  /* -- Sizes --------------------------------------------------- */
  button[data-size='xs'] {
    width: 16px;
    height: 16px;

    border-radius: ${({borderRadius:t})=>t[1]};
  }

  button[data-size='sm'] {
    width: 20px;
    height: 20px;
    border-radius: ${({borderRadius:t})=>t[1]};
  }

  button[data-size='md'] {
    width: 24px;
    height: 24px;
    border-radius: ${({borderRadius:t})=>t[2]};
  }

  button[data-size='lg'] {
    width: 28px;
    height: 28px;
    border-radius: ${({borderRadius:t})=>t[2]};
  }

  button[data-size='xs'] wui-icon {
    width: 8px;
    height: 8px;
  }

  button[data-size='sm'] wui-icon {
    width: 12px;
    height: 12px;
  }

  button[data-size='md'] wui-icon {
    width: 16px;
    height: 16px;
  }

  button[data-size='lg'] wui-icon {
    width: 20px;
    height: 20px;
  }

  /* -- Hover --------------------------------------------------- */
  @media (hover: hover) {
    button[data-type='accent']:hover:enabled {
      background-color: ${({tokens:t})=>t.core.foregroundAccent010};
    }

    button[data-variant='primary'][data-type='neutral']:hover:enabled {
      background-color: ${({tokens:t})=>t.theme.foregroundSecondary};
    }

    button[data-variant='secondary'][data-type='neutral']:hover:enabled {
      background-color: ${({tokens:t})=>t.theme.foregroundSecondary};
    }

    button[data-type='success']:hover:enabled {
      background-color: ${({tokens:t})=>t.core.backgroundSuccess};
    }

    button[data-type='error']:hover:enabled {
      background-color: ${({tokens:t})=>t.core.backgroundError};
    }
  }

  /* -- Focus --------------------------------------------------- */
  button:focus-visible {
    box-shadow: 0 0 0 4px ${({tokens:t})=>t.core.foregroundAccent020};
  }

  /* -- Properties --------------------------------------------------- */
  button[data-full-width='true'] {
    width: 100%;
  }

  :host([fullWidth]) {
    width: 100%;
  }

  button[disabled] {
    opacity: 0.5;
    cursor: not-allowed;
  }
`},6144,[5537]);
__d(function(g,r,i,a,m,e,d){"use strict";Object.defineProperty(e,'__esModule',{value:!0}),Object.defineProperty(e,"DIRECT_TRANSFER_REQUEST_ID",{enumerable:!0,get:function(){return P}}),Object.defineProperty(e,"DIRECT_TRANSFER_DEPOSIT_TYPE",{enumerable:!0,get:function(){return h}}),Object.defineProperty(e,"DIRECT_TRANSFER_TRANSACTION_TYPE",{enumerable:!0,get:function(){return w}}),Object.defineProperty(e,"PayController",{enumerable:!0,get:function(){return C}});var t=r(d[0]),n=r(d[1]),s=r(d[2]),o=r(d[3]),c=r(d[4]),p=r(d[5]),y=r(d[6]),u=r(d[7]),l=r(d[8]),E=r(d[9]);const A='unknown',P='direct-transfer',h='deposit',w='transaction',I=(0,t.proxy)({paymentAsset:{network:'eip155:1',asset:'0x0',metadata:{name:'0x0',symbol:'0x0',decimals:0}},recipient:'0x0',amount:0,isConfigured:!1,error:null,isPaymentInProgress:!1,exchanges:[],isLoading:!1,openInNewTab:!0,redirectUrl:void 0,payWithExchange:void 0,currentPayment:void 0,analyticsSet:!1,paymentId:void 0,choice:'pay',tokenBalances:{[s.ConstantsUtil.CHAIN.EVM]:[],[s.ConstantsUtil.CHAIN.SOLANA]:[]},isFetchingTokenBalances:!1,selectedPaymentAsset:null,quote:void 0,quoteStatus:'waiting',quoteError:null,isFetchingQuote:!1,selectedExchange:void 0,exchangeUrlForQuote:void 0,requestId:void 0}),C={state:I,subscribe:n=>(0,t.subscribe)(I,()=>n(I)),subscribeKey:(t,s)=>(0,n.subscribeKey)(I,t,s),async handleOpenPay(t){this.resetState(),this.setPaymentConfig(t),this.initializeAnalytics(),(0,E.ensureCorrectAddress)(),await this.prepareTokenLogo(),I.isConfigured=!0,o.EventsController.sendEvent({type:'track',event:'PAY_MODAL_OPEN',properties:{exchanges:I.exchanges,configuration:{network:I.paymentAsset.network,asset:I.paymentAsset.asset,recipient:I.recipient,amount:I.amount}}}),await o.ModalController.open({view:'Pay'})},resetState(){I.paymentAsset={network:'eip155:1',asset:'0x0',metadata:{name:'0x0',symbol:'0x0',decimals:0}},I.recipient='0x0',I.amount=0,I.isConfigured=!1,I.error=null,I.isPaymentInProgress=!1,I.isLoading=!1,I.currentPayment=void 0,I.selectedExchange=void 0,I.exchangeUrlForQuote=void 0,I.requestId=void 0},resetQuoteState(){I.quote=void 0,I.quoteStatus='waiting',I.quoteError=null,I.isFetchingQuote=!1,I.requestId=void 0},setPaymentConfig(t){if(!t.paymentAsset)throw new y.AppKitPayError(y.AppKitPayErrorCodes.INVALID_PAYMENT_CONFIG);try{I.choice=t.choice??'pay',I.paymentAsset=t.paymentAsset,I.recipient=t.recipient,I.amount=t.amount,I.openInNewTab=t.openInNewTab??!0,I.redirectUrl=t.redirectUrl,I.payWithExchange=t.payWithExchange,I.error=null}catch(t){throw new y.AppKitPayError(y.AppKitPayErrorCodes.INVALID_PAYMENT_CONFIG,t.message)}},setSelectedPaymentAsset(t){I.selectedPaymentAsset=t},setSelectedExchange(t){I.selectedExchange=t},setRequestId(t){I.requestId=t},setPaymentInProgress(t){I.isPaymentInProgress=t},getPaymentAsset:()=>I.paymentAsset,getExchanges:()=>I.exchanges,async fetchExchanges(){try{I.isLoading=!0;const t=await(0,u.getExchanges)({page:0});I.exchanges=t.exchanges.slice(0,2)}catch(t){throw o.SnackController.showError(y.AppKitPayErrorMessages.UNABLE_TO_GET_EXCHANGES),new y.AppKitPayError(y.AppKitPayErrorCodes.UNABLE_TO_GET_EXCHANGES)}finally{I.isLoading=!1}},async getAvailableExchanges(t){try{const n=t?.asset&&t?.network?(0,l.formatCaip19Asset)(t.network,t.asset):void 0;return await(0,u.getExchanges)({page:t?.page??0,asset:n,amount:t?.amount?.toString()})}catch(t){throw new y.AppKitPayError(y.AppKitPayErrorCodes.UNABLE_TO_GET_EXCHANGES)}},async getPayUrl(t,n,s=!1){try{const c=Number(n.amount),p=await(0,u.getPayUrl)({exchangeId:t,asset:(0,l.formatCaip19Asset)(n.network,n.asset),amount:c.toString(),recipient:`${n.network}:${n.recipient}`});return o.EventsController.sendEvent({type:'track',event:'PAY_EXCHANGE_SELECTED',properties:{source:'pay',exchange:{id:t},configuration:{network:n.network,asset:n.asset,recipient:n.recipient,amount:c},currentPayment:{type:'exchange',exchangeId:t},headless:s}}),s&&(this.initiatePayment(),o.EventsController.sendEvent({type:'track',event:'PAY_INITIATED',properties:{source:'pay',paymentId:I.paymentId||A,configuration:{network:n.network,asset:n.asset,recipient:n.recipient,amount:c},currentPayment:{type:'exchange',exchangeId:t}}})),p}catch(t){if(t instanceof Error&&t.message.includes('is not supported'))throw new y.AppKitPayError(y.AppKitPayErrorCodes.ASSET_NOT_SUPPORTED);throw new Error(t.message)}},async generateExchangeUrlForQuote({exchangeId:t,paymentAsset:n,amount:s,recipient:o}){const c=await(0,u.getPayUrl)({exchangeId:t,asset:(0,l.formatCaip19Asset)(n.network,n.asset),amount:s.toString(),recipient:o});I.exchangeSessionId=c.sessionId,I.exchangeUrlForQuote=c.url},async openPayUrl(t,n,s=!1){try{const c=await this.getPayUrl(t.exchangeId,n,s);if(!c)throw new y.AppKitPayError(y.AppKitPayErrorCodes.UNABLE_TO_GET_PAY_URL);const p=t.openInNewTab??!0?'_blank':'_self';return o.CoreHelperUtil.openHref(c.url,p),c}catch(t){throw t instanceof y.AppKitPayError?I.error=t.message:I.error=y.AppKitPayErrorMessages.GENERIC_PAYMENT_ERROR,new y.AppKitPayError(y.AppKitPayErrorCodes.UNABLE_TO_GET_PAY_URL)}},async onTransfer({chainNamespace:t,fromAddress:n,toAddress:c,amount:u,paymentAsset:l}){if(I.currentPayment={type:'wallet',status:'IN_PROGRESS'},!I.isPaymentInProgress)try{this.initiatePayment();const A=o.ChainController.getAllRequestedCaipNetworks().find(t=>t.caipNetworkId===l.network);if(!A)throw new Error('Target network not found');const P=o.ChainController.state.activeCaipNetwork;switch(p.HelpersUtil.isLowerCaseMatch(P?.caipNetworkId,A.caipNetworkId)||await o.ChainController.switchActiveNetwork(A),t){case s.ConstantsUtil.CHAIN.EVM:'native'===l.asset&&(I.currentPayment.result=await(0,E.processEvmNativePayment)(l,t,{recipient:c,amount:u,fromAddress:n})),l.asset.startsWith('0x')&&(I.currentPayment.result=await(0,E.processEvmErc20Payment)(l,{recipient:c,amount:u,fromAddress:n})),I.currentPayment.status='SUCCESS';break;case s.ConstantsUtil.CHAIN.SOLANA:I.currentPayment.result=await(0,E.processSolanaPayment)(t,{recipient:c,amount:u,fromAddress:n,tokenMint:'native'===l.asset?void 0:l.asset}),I.currentPayment.status='SUCCESS';break;default:throw new y.AppKitPayError(y.AppKitPayErrorCodes.INVALID_CHAIN_NAMESPACE)}}catch(t){throw t instanceof y.AppKitPayError?I.error=t.message:I.error=y.AppKitPayErrorMessages.GENERIC_PAYMENT_ERROR,I.currentPayment.status='FAILED',o.SnackController.showError(I.error),t}finally{I.isPaymentInProgress=!1}},async onSendTransaction(t){try{const{namespace:n,transactionStep:c}=t;C.initiatePayment();const y=o.ChainController.getAllRequestedCaipNetworks().find(t=>t.caipNetworkId===I.paymentAsset?.network);if(!y)throw new Error('Target network not found');const u=o.ChainController.state.activeCaipNetwork;if(p.HelpersUtil.isLowerCaseMatch(u?.caipNetworkId,y.caipNetworkId)||await o.ChainController.switchActiveNetwork(y),n===s.ConstantsUtil.CHAIN.EVM){const{from:t,to:s,data:p,value:y}=c.transaction;await o.ConnectionController.sendTransaction({address:t,to:s,data:p,value:BigInt(y),chainNamespace:n})}else if(n===s.ConstantsUtil.CHAIN.SOLANA){const{instructions:t}=c.transaction;await o.ConnectionController.writeSolanaTransaction({instructions:t})}}catch(t){throw t instanceof y.AppKitPayError?I.error=t.message:I.error=y.AppKitPayErrorMessages.GENERIC_PAYMENT_ERROR,o.SnackController.showError(I.error),t}finally{I.isPaymentInProgress=!1}},getExchangeById:t=>I.exchanges.find(n=>n.id===t),validatePayConfig(t){const{paymentAsset:n,recipient:s,amount:o}=t;if(!n)throw new y.AppKitPayError(y.AppKitPayErrorCodes.INVALID_PAYMENT_CONFIG);if(!s)throw new y.AppKitPayError(y.AppKitPayErrorCodes.INVALID_RECIPIENT);if(!n.asset)throw new y.AppKitPayError(y.AppKitPayErrorCodes.INVALID_ASSET);if(null==o||o<=0)throw new y.AppKitPayError(y.AppKitPayErrorCodes.INVALID_AMOUNT)},async handlePayWithExchange(t){try{I.currentPayment={type:'exchange',exchangeId:t};const{network:n,asset:s}=I.paymentAsset,o={network:n,asset:s,amount:I.amount,recipient:I.recipient},c=await this.getPayUrl(t,o);if(!c)throw new y.AppKitPayError(y.AppKitPayErrorCodes.UNABLE_TO_INITIATE_PAYMENT);return I.currentPayment.sessionId=c.sessionId,I.currentPayment.status='IN_PROGRESS',I.currentPayment.exchangeId=t,this.initiatePayment(),{url:c.url,openInNewTab:I.openInNewTab}}catch(t){return t instanceof y.AppKitPayError?I.error=t.message:I.error=y.AppKitPayErrorMessages.GENERIC_PAYMENT_ERROR,I.isPaymentInProgress=!1,o.SnackController.showError(I.error),null}},async getBuyStatus(t,n){try{const s=await(0,u.getBuyStatus)({sessionId:n,exchangeId:t});return'SUCCESS'!==s.status&&'FAILED'!==s.status||o.EventsController.sendEvent({type:'track',event:'SUCCESS'===s.status?'PAY_SUCCESS':'PAY_ERROR',properties:{message:'FAILED'===s.status?o.CoreHelperUtil.parseError(I.error):void 0,source:'pay',paymentId:I.paymentId||A,configuration:{network:I.paymentAsset.network,asset:I.paymentAsset.asset,recipient:I.recipient,amount:I.amount},currentPayment:{type:'exchange',exchangeId:I.currentPayment?.exchangeId,sessionId:I.currentPayment?.sessionId,result:s.txHash}}}),s}catch(t){throw new y.AppKitPayError(y.AppKitPayErrorCodes.UNABLE_TO_GET_BUY_STATUS)}},async fetchTokensFromEOA({caipAddress:t,caipNetwork:n,namespace:o}){if(!t)return[];const{address:p}=s.ParseUtil.parseCaipAddress(t);let y=n;o===s.ConstantsUtil.CHAIN.EVM&&(y=void 0);return await c.BalanceUtil.getMyTokensWithBalance({address:p,caipNetwork:y})},async fetchTokensFromExchange(){if(!I.selectedExchange)return[];const t=await(0,u.getAssetsForExchange)(I.selectedExchange.id),n=Object.values(t.assets).flat();return await Promise.all(n.map(async t=>{const n=(0,l.formatPaymentAssetToBalance)(t),{chainNamespace:c}=s.ParseUtil.parseCaipNetworkId(n.chainId);let p=n.address;if(o.CoreHelperUtil.isCaipAddress(p)){const{address:t}=s.ParseUtil.parseCaipAddress(p);p=t}const y=await o.AssetUtil.getImageByToken(p??'',c).catch(()=>{});return n.iconUrl=y??'',n}))},async fetchTokens({caipAddress:t,caipNetwork:n,namespace:s}){try{I.isFetchingTokenBalances=!0;const o=Boolean(I.selectedExchange)?this.fetchTokensFromExchange():this.fetchTokensFromEOA({caipAddress:t,caipNetwork:n,namespace:s}),c=await o;I.tokenBalances=Object.assign({},I.tokenBalances,{[s]:c})}catch(t){const n=t instanceof Error?t.message:'Unable to get token balances';o.SnackController.showError(n)}finally{I.isFetchingTokenBalances=!1}},async fetchQuote({amount:t,address:n,sourceToken:c,toToken:p,recipient:l}){try{C.resetQuoteState(),I.isFetchingQuote=!0;const o=await(0,u.getQuote)({amount:t,address:I.selectedExchange?void 0:n,sourceToken:c,toToken:p,recipient:l});if(I.selectedExchange){const t=(0,E.getTransferStep)(o);if(t){const n=`${c.network}:${t.deposit.receiver}`,o=s.NumberUtil.formatNumber(t.deposit.amount,{decimals:c.metadata.decimals??0,round:8});await C.generateExchangeUrlForQuote({exchangeId:I.selectedExchange.id,paymentAsset:c,amount:o.toString(),recipient:n})}}I.quote=o}catch(t){let n=y.AppKitPayErrorMessages.UNABLE_TO_GET_QUOTE;if(t instanceof Error&&t.cause&&t.cause instanceof Response)try{const s=await t.cause.json();s.error&&'string'==typeof s.error&&(n=s.error)}catch{}throw I.quoteError=n,o.SnackController.showError(n),new y.AppKitPayError(y.AppKitPayErrorCodes.UNABLE_TO_GET_QUOTE)}finally{I.isFetchingQuote=!1}},async fetchQuoteStatus({requestId:t}){try{if(t===P){const t=I.selectedExchange,n=I.exchangeSessionId;if(t&&n){switch((await this.getBuyStatus(t.id,n)).status){case'IN_PROGRESS':case'UNKNOWN':default:I.quoteStatus='waiting';break;case'SUCCESS':I.quoteStatus='success',I.isPaymentInProgress=!1;break;case'FAILED':I.quoteStatus='failure',I.isPaymentInProgress=!1}return}return void(I.quoteStatus='success')}const{status:n}=await(0,u.getQuoteStatus)({requestId:t});I.quoteStatus=n}catch{throw I.quoteStatus='failure',new y.AppKitPayError(y.AppKitPayErrorCodes.UNABLE_TO_GET_QUOTE_STATUS)}},initiatePayment(){I.isPaymentInProgress=!0,I.paymentId=crypto.randomUUID()},initializeAnalytics(){I.analyticsSet||(I.analyticsSet=!0,this.subscribeKey('isPaymentInProgress',t=>{if(I.currentPayment?.status&&'UNKNOWN'!==I.currentPayment.status){const t={IN_PROGRESS:'PAY_INITIATED',SUCCESS:'PAY_SUCCESS',FAILED:'PAY_ERROR'}[I.currentPayment.status];o.EventsController.sendEvent({type:'track',event:t,properties:{message:'FAILED'===I.currentPayment.status?o.CoreHelperUtil.parseError(I.error):void 0,source:'pay',paymentId:I.paymentId||A,configuration:{network:I.paymentAsset.network,asset:I.paymentAsset.asset,recipient:I.recipient,amount:I.amount},currentPayment:{type:I.currentPayment.type,exchangeId:I.currentPayment.exchangeId,sessionId:I.currentPayment.sessionId,result:I.currentPayment.result}}})}}))},async prepareTokenLogo(){if(!I.paymentAsset.metadata.logoURI)try{const{chainNamespace:t}=s.ParseUtil.parseCaipNetworkId(I.paymentAsset.network),n=await o.AssetUtil.getImageByToken(I.paymentAsset.asset,t);I.paymentAsset.metadata.logoURI=n}catch{}}}},6145,[4209,4217,3707,5442,5512,5515,6146,6147,6150,6149]);
__d(function(g,r,i,a,m,e,d){"use strict";Object.defineProperty(e,'__esModule',{value:!0}),Object.defineProperty(e,"AppKitPayErrorCodes",{enumerable:!0,get:function(){return _}}),Object.defineProperty(e,"AppKitPayErrorMessages",{enumerable:!0,get:function(){return E}}),Object.defineProperty(e,"AppKitPayError",{enumerable:!0,get:function(){return T}}),e.createAppKitPayError=function(E,A){const N=E||_.UNKNOWN_ERROR;return new T(N,A)};const _={INVALID_PAYMENT_CONFIG:'INVALID_PAYMENT_CONFIG',INVALID_RECIPIENT:'INVALID_RECIPIENT',INVALID_ASSET:'INVALID_ASSET',INVALID_AMOUNT:'INVALID_AMOUNT',UNKNOWN_ERROR:'UNKNOWN_ERROR',UNABLE_TO_INITIATE_PAYMENT:'UNABLE_TO_INITIATE_PAYMENT',INVALID_CHAIN_NAMESPACE:'INVALID_CHAIN_NAMESPACE',GENERIC_PAYMENT_ERROR:'GENERIC_PAYMENT_ERROR',UNABLE_TO_GET_EXCHANGES:'UNABLE_TO_GET_EXCHANGES',ASSET_NOT_SUPPORTED:'ASSET_NOT_SUPPORTED',UNABLE_TO_GET_PAY_URL:'UNABLE_TO_GET_PAY_URL',UNABLE_TO_GET_BUY_STATUS:'UNABLE_TO_GET_BUY_STATUS',UNABLE_TO_GET_TOKEN_BALANCES:'UNABLE_TO_GET_TOKEN_BALANCES',UNABLE_TO_GET_QUOTE:'UNABLE_TO_GET_QUOTE',UNABLE_TO_GET_QUOTE_STATUS:'UNABLE_TO_GET_QUOTE_STATUS',INVALID_RECIPIENT_ADDRESS_FOR_ASSET:'INVALID_RECIPIENT_ADDRESS_FOR_ASSET'},E={[_.INVALID_PAYMENT_CONFIG]:'Invalid payment configuration',[_.INVALID_RECIPIENT]:'Invalid recipient address',[_.INVALID_ASSET]:'Invalid asset specified',[_.INVALID_AMOUNT]:'Invalid payment amount',[_.INVALID_RECIPIENT_ADDRESS_FOR_ASSET]:'Invalid recipient address for the asset selected',[_.UNKNOWN_ERROR]:'Unknown payment error occurred',[_.UNABLE_TO_INITIATE_PAYMENT]:'Unable to initiate payment',[_.INVALID_CHAIN_NAMESPACE]:'Invalid chain namespace',[_.GENERIC_PAYMENT_ERROR]:'Unable to process payment',[_.UNABLE_TO_GET_EXCHANGES]:'Unable to get exchanges',[_.ASSET_NOT_SUPPORTED]:'Asset not supported by the selected exchange',[_.UNABLE_TO_GET_PAY_URL]:'Unable to get payment URL',[_.UNABLE_TO_GET_BUY_STATUS]:'Unable to get buy status',[_.UNABLE_TO_GET_TOKEN_BALANCES]:'Unable to get token balances',[_.UNABLE_TO_GET_QUOTE]:'Unable to get quote. Please choose a different token',[_.UNABLE_TO_GET_QUOTE_STATUS]:'Unable to get quote status'};class T extends Error{get message(){return E[this.code]}constructor(_,A){super(E[_]),this.name='AppKitPayError',this.code=_,this.details=A,Error.captureStackTrace&&Error.captureStackTrace(this,T)}}},6146,[]);
__d(function(g,r,i,a,m,e,d){"use strict";Object.defineProperty(e,'__esModule',{value:!0}),e.getApiUrl=l,e.getExchanges=async function(t){return(await h('reown_getExchanges',t)).result},e.getPayUrl=async function(t){return(await h('reown_getExchangePayUrl',t)).result},e.getBuyStatus=async function(t){return(await h('reown_getExchangeBuyStatus',t)).result},e.getTransfersQuote=w,e.getQuote=async function(t){const n=s.HelpersUtil.isLowerCaseMatch(t.sourceToken.network,t.toToken.network),o=s.HelpersUtil.isLowerCaseMatch(t.sourceToken.asset,t.toToken.asset);if(n&&o)return(0,c.getDirectTransferQuote)(t);return w(t)},e.getQuoteStatus=async function(t){return await u.get({path:'/appkit/v1/transfers/status',params:Object.assign({requestId:t.requestId},k())})},e.getAssetsForExchange=async function(t){return await u.get({path:`/appkit/v1/transfers/assets/exchanges/${t}`,params:k()})};var t=r(d[0]),n=r(d[1]),s=r(d[2]),o=r(d[3]),c=r(d[4]);const u=new n.FetchUtil({baseUrl:n.CoreHelperUtil.getApiUrl(),clientId:null});class p extends Error{}function l(){const t=n.OptionsController.getSnapshot().projectId;return`${o.API_URL}?projectId=${t}`}function k(){const{projectId:t,sdkType:s,sdkVersion:o}=n.OptionsController.state;return{projectId:t,st:s||'appkit',sv:o||'html-wagmi-4.2.2'}}async function h(t,s){const o=l(),{sdkType:c,sdkVersion:u,projectId:k}=n.OptionsController.getSnapshot(),h={jsonrpc:'2.0',id:1,method:t,params:Object.assign({},s||{},{st:c,sv:u,projectId:k})},w=await fetch(o,{method:'POST',body:JSON.stringify(h),headers:{'Content-Type':'application/json'}}),f=await w.json();if(f.error)throw new p(f.error.message);return f}async function w(s){const o=t.NumberUtil.bigNumber(s.amount).times(10**s.toToken.metadata.decimals).toString(),{chainId:c,chainNamespace:p}=t.ParseUtil.parseCaipNetworkId(s.sourceToken.network),{chainId:l,chainNamespace:h}=t.ParseUtil.parseCaipNetworkId(s.toToken.network),w='native'===s.sourceToken.asset?(0,n.getNativeTokenAddress)(p):s.sourceToken.asset,f='native'===s.toToken.asset?(0,n.getNativeTokenAddress)(h):s.toToken.asset;return await u.post({path:'/appkit/v1/transfers/quote',body:{user:s.address,originChainId:c.toString(),originCurrency:w,destinationChainId:l.toString(),destinationCurrency:f,recipient:s.recipient,amount:o},params:k()})}},6147,[3707,5442,5515,6148,6149]);
__d(function(g,r,i,a,m,e,d){"use strict";Object.defineProperty(e,'__esModule',{value:!0}),Object.defineProperty(e,"API_URL",{enumerable:!0,get:function(){return t}}),Object.defineProperty(e,"REOWN_TEST_EXCHANGE_ID",{enumerable:!0,get:function(){return n}});const t='https://rpc.walletconnect.org/v1/json-rpc',n='reown_test'},6148,[]);
__d(function(g,r,i,a,m,e,d){"use strict";Object.defineProperty(e,'__esModule',{value:!0}),e.ensureCorrectNetwork=async function(t){const{paymentAssetNetwork:n,activeCaipNetwork:p,approvedCaipNetworkIds:E,requestedCaipNetworks:A}=t,c=o.CoreHelperUtil.sortRequestedNetworks(E,A).find(t=>t.caipNetworkId===n);if(!c)throw new s.AppKitPayError(s.AppKitPayErrorCodes.INVALID_PAYMENT_CONFIG);if(c.caipNetworkId===p.caipNetworkId)return;const C=o.ChainController.getNetworkProp('supportsAllNetworks',c.chainNamespace);if(!E?.includes(c.caipNetworkId)&&!C)throw new s.AppKitPayError(s.AppKitPayErrorCodes.INVALID_PAYMENT_CONFIG);try{await o.ChainController.switchActiveNetwork(c)}catch(t){throw new s.AppKitPayError(s.AppKitPayErrorCodes.GENERIC_PAYMENT_ERROR,t)}},e.ensureCorrectAddress=function(){const{chainNamespace:p}=t.ParseUtil.parseCaipNetworkId(n.PayController.state.paymentAsset.network);if(!o.CoreHelperUtil.isAddress(n.PayController.state.recipient,p))throw new s.AppKitPayError(s.AppKitPayErrorCodes.INVALID_RECIPIENT_ADDRESS_FOR_ASSET,`Provide valid recipient address for namespace "${p}"`)},e.processEvmNativePayment=async function(n,p,E){if(p!==t.ConstantsUtil.CHAIN.EVM)throw new s.AppKitPayError(s.AppKitPayErrorCodes.INVALID_CHAIN_NAMESPACE);if(!E.fromAddress)throw new s.AppKitPayError(s.AppKitPayErrorCodes.INVALID_PAYMENT_CONFIG,'fromAddress is required for native EVM payments.');const A='string'==typeof E.amount?parseFloat(E.amount):E.amount;if(isNaN(A))throw new s.AppKitPayError(s.AppKitPayErrorCodes.INVALID_PAYMENT_CONFIG);const c=n.metadata?.decimals??18,C=o.ConnectionController.parseUnits(A.toString(),c);if('bigint'!=typeof C)throw new s.AppKitPayError(s.AppKitPayErrorCodes.GENERIC_PAYMENT_ERROR);return await o.ConnectionController.sendTransaction({chainNamespace:p,to:E.recipient,address:E.fromAddress,value:C,data:'0x'})??void 0},e.processEvmErc20Payment=async function(n,p){if(!p.fromAddress)throw new s.AppKitPayError(s.AppKitPayErrorCodes.INVALID_PAYMENT_CONFIG,'fromAddress is required for ERC20 EVM payments.');const E=n.asset,A=p.recipient,c=Number(n.metadata.decimals),C=o.ConnectionController.parseUnits(p.amount.toString(),c);if(void 0===C)throw new s.AppKitPayError(s.AppKitPayErrorCodes.GENERIC_PAYMENT_ERROR);return await o.ConnectionController.writeContract({fromAddress:p.fromAddress,tokenAddress:E,args:[A,C],method:'transfer',abi:t.ContractUtil.getERC20Abi(E),chainNamespace:t.ConstantsUtil.CHAIN.EVM})??void 0},e.processSolanaPayment=async function(n,p){if(n!==t.ConstantsUtil.CHAIN.SOLANA)throw new s.AppKitPayError(s.AppKitPayErrorCodes.INVALID_CHAIN_NAMESPACE);if(!p.fromAddress)throw new s.AppKitPayError(s.AppKitPayErrorCodes.INVALID_PAYMENT_CONFIG,'fromAddress is required for Solana payments.');const E='string'==typeof p.amount?parseFloat(p.amount):p.amount;if(isNaN(E)||E<=0)throw new s.AppKitPayError(s.AppKitPayErrorCodes.INVALID_PAYMENT_CONFIG,'Invalid payment amount.');try{if(!o.ProviderController.getProvider(n))throw new s.AppKitPayError(s.AppKitPayErrorCodes.GENERIC_PAYMENT_ERROR,'No Solana provider available.');const A=await o.ConnectionController.sendTransaction({chainNamespace:t.ConstantsUtil.CHAIN.SOLANA,to:p.recipient,value:E,tokenMint:p.tokenMint});if(!A)throw new s.AppKitPayError(s.AppKitPayErrorCodes.GENERIC_PAYMENT_ERROR,'Transaction failed.');return A}catch(t){if(t instanceof s.AppKitPayError)throw t;throw new s.AppKitPayError(s.AppKitPayErrorCodes.GENERIC_PAYMENT_ERROR,`Solana payment failed: ${t}`)}},e.getDirectTransferQuote=async function({sourceToken:t,toToken:s,amount:p,recipient:E}){const A=o.ConnectionController.parseUnits(p,t.metadata.decimals),c=o.ConnectionController.parseUnits(p,s.metadata.decimals);return Promise.resolve({type:n.DIRECT_TRANSFER_REQUEST_ID,origin:{amount:A?.toString()??'0',currency:t},destination:{amount:c?.toString()??'0',currency:s},fees:[{id:'service',label:'Service Fee',amount:'0',currency:s}],steps:[{requestId:n.DIRECT_TRANSFER_REQUEST_ID,type:'deposit',deposit:{amount:A?.toString()??'0',currency:t.asset,receiver:E}}],timeInSeconds:6})},e.getTransferStep=function(t){if(!t)return null;const o=t.steps[0];if(!o||o.type!==n.DIRECT_TRANSFER_DEPOSIT_TYPE)return null;return o},e.getTransactionsSteps=function(t,o=0){if(!t)return[];const s=t.steps.filter(t=>t.type===n.DIRECT_TRANSFER_TRANSACTION_TYPE),p=s.filter((t,n)=>n+1>o);return s.length>0&&s.length<3?p:[]};var t=r(d[0]),o=r(d[1]),n=r(d[2]),s=r(d[3])},6149,[3707,5442,6145,6146]);
__d(function(g,r,i,a,m,e,d){"use strict";Object.defineProperty(e,'__esModule',{value:!0}),e.formatCaip19Asset=function(n,s){const{chainNamespace:o,chainId:u}=t.ParseUtil.parseCaipNetworkId(n),p=c[o];if(!p)throw new Error(`Unsupported chain namespace for CAIP-19 formatting: ${o}`);let f=p.native.assetNamespace,w=p.native.assetReference;'native'!==s?(f=p.defaultTokenNamespace,w=s):'eip155'===o&&l[u]&&(w=l[u]);return`${o}:${u}/${f}:${w}`},e.isPayWithWalletSupported=function(n){const{chainNamespace:s}=t.ParseUtil.parseCaipNetworkId(n);return o.includes(s)},e.formatBalanceToPaymentAsset=function(o){const c=n.ChainController.getAllRequestedCaipNetworks().find(t=>t.caipNetworkId===o.chainId);let l=o.address;if(!c)throw new Error(`Target network not found for balance chainId "${o.chainId}"`);if(s.HelpersUtil.isLowerCaseMatch(o.symbol,c.nativeCurrency.symbol))l='native';else if(n.CoreHelperUtil.isCaipAddress(l)){const{address:n}=t.ParseUtil.parseCaipAddress(l);l=n}else if(!l)throw new Error(`Balance address not found for balance symbol "${o.symbol}"`);return{network:c.caipNetworkId,asset:l,metadata:{name:o.name,symbol:o.symbol,decimals:Number(o.quantity.decimals),logoURI:o.iconUrl},amount:o.quantity.numeric}},e.formatPaymentAssetToBalance=function(t){return{chainId:t.network,address:`${t.network}:${t.asset}`,symbol:t.metadata.symbol,name:t.metadata.name,iconUrl:t.metadata.logoURI||'',price:0,quantity:{numeric:'0',decimals:t.metadata.decimals.toString()}}},e.formatAmount=function(n){const s=t.NumberUtil.bigNumber(n,{safe:!0});if(s.lt(.001))return'<0.001';return s.round(4).toString()},e.isTestnetAsset=function(t){const s=n.ChainController.getAllRequestedCaipNetworks().find(n=>n.caipNetworkId===t.network);if(!s)return!1;return Boolean(s.testnet)};var t=r(d[0]),n=r(d[1]),s=r(d[2]);const o=['eip155','solana'],c={eip155:{native:{assetNamespace:'slip44',assetReference:'60'},defaultTokenNamespace:'erc20'},solana:{native:{assetNamespace:'slip44',assetReference:'501'},defaultTokenNamespace:'token'}},l={56:'714',204:'714'}},6150,[3707,5442,5515]);
__d(function(g,r,i,a,m,e,d){"use strict";Object.defineProperty(e,'__esModule',{value:!0}),Object.defineProperty(e,"default",{enumerable:!0,get:function(){return t}});var t=r(d[0]).css`
  wui-separator {
    margin: var(--apkt-spacing-3) calc(var(--apkt-spacing-3) * -1) var(--apkt-spacing-2)
      calc(var(--apkt-spacing-3) * -1);
    width: calc(100% + var(--apkt-spacing-3) * 2);
  }

  .token-display {
    padding: var(--apkt-spacing-3) var(--apkt-spacing-3);
    border-radius: var(--apkt-borderRadius-5);
    background-color: var(--apkt-tokens-theme-backgroundPrimary);
    margin-top: var(--apkt-spacing-3);
    margin-bottom: var(--apkt-spacing-3);
  }

  .token-display wui-text {
    text-transform: none;
  }

  wui-loading-spinner {
    padding: var(--apkt-spacing-2);
  }

  .left-image-container {
    position: relative;
    justify-content: center;
    align-items: center;
  }

  .token-image {
    border-radius: ${({borderRadius:t})=>t.round};
    width: 40px;
    height: 40px;
  }

  .chain-image {
    position: absolute;
    width: 20px;
    height: 20px;
    bottom: -3px;
    right: -5px;
    border-radius: ${({borderRadius:t})=>t.round};
    border: 2px solid ${({tokens:t})=>t.theme.backgroundPrimary};
  }

  .payment-methods-container {
    background-color: ${({tokens:t})=>t.theme.foregroundPrimary};
    border-top-right-radius: ${({borderRadius:t})=>t[8]};
    border-top-left-radius: ${({borderRadius:t})=>t[8]};
  }
`},6151,[5528]);
__d(function(g,_r,_i,a,m,_e,_d){"use strict";Object.defineProperty(_e,'__esModule',{value:!0}),Object.defineProperty(_e,"W3mPayLoadingView",{enumerable:!0,get:function(){return y}});var e=_r(_d[0]),t=_r(_d[1]),i=_r(_d[2]),n=_r(_d[3]),s=_r(_d[4]),r=_r(_d[5]),o=_r(_d[6]);_r(_d[7]),_r(_d[8]),_r(_d[9]),_r(_d[10]),_r(_d[11]),_r(_d[12]);var l,u=_r(_d[13]),c=_r(_d[14]),d=_r(_d[15]),p=_r(_d[16]),f=_r(_d[17]),h=(l=f)&&l.__esModule?l:{default:l},w=this&&this.__decorate||function(e,t,i,n){var s,r=arguments.length,o=r<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,i):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,i,n);else for(var l=e.length-1;l>=0;l--)(s=e[l])&&(o=(r<3?s(o):r>3?s(t,i,o):s(t,i))||o);return r>3&&o&&Object.defineProperty(t,i,o),o};const x={received:['pending','success','submitted'],processing:['success','submitted'],sending:['success','submitted']};let y=class extends e.LitElement{constructor(){super(),this.unsubscribe=[],this.pollingInterval=null,this.paymentAsset=c.PayController.state.paymentAsset,this.quoteStatus=c.PayController.state.quoteStatus,this.quote=c.PayController.state.quote,this.amount=c.PayController.state.amount,this.namespace=void 0,this.caipAddress=void 0,this.profileName=null,this.activeConnectorIds=r.ConnectorController.state.activeConnectorIds,this.selectedExchange=c.PayController.state.selectedExchange,this.initializeNamespace(),this.unsubscribe.push(c.PayController.subscribeKey('quoteStatus',e=>this.quoteStatus=e),c.PayController.subscribeKey('quote',e=>this.quote=e),r.ConnectorController.subscribeKey('activeConnectorIds',e=>this.activeConnectorIds=e),c.PayController.subscribeKey('selectedExchange',e=>this.selectedExchange=e))}connectedCallback(){super.connectedCallback(),this.startPolling()}disconnectedCallback(){super.disconnectedCallback(),this.stopPolling(),this.unsubscribe.forEach(e=>e())}render(){return e.html`
      <wui-flex flexDirection="column" .padding=${['3','0','0','0']} gap="2">
        ${this.tokenTemplate()} ${this.paymentTemplate()} ${this.paymentLifecycleTemplate()}
      </wui-flex>
    `}tokenTemplate(){const t=(0,d.formatAmount)(this.amount||'0'),i=this.paymentAsset.metadata.symbol??'Unknown',s=r.ChainController.getAllRequestedCaipNetworks().find(e=>e.caipNetworkId===this.paymentAsset.network),o='failure'===this.quoteStatus||'timeout'===this.quoteStatus||'refund'===this.quoteStatus;return'success'===this.quoteStatus||'submitted'===this.quoteStatus?e.html`<wui-flex alignItems="center" justifyContent="center">
        <wui-flex justifyContent="center" alignItems="center" class="token-image success">
          <wui-icon name="checkmark" color="success" size="inherit"></wui-icon>
        </wui-flex>
      </wui-flex>`:o?e.html`<wui-flex alignItems="center" justifyContent="center">
        <wui-flex justifyContent="center" alignItems="center" class="token-image error">
          <wui-icon name="close" color="error" size="inherit"></wui-icon>
        </wui-flex>
      </wui-flex>`:e.html`
      <wui-flex alignItems="center" justifyContent="center">
        <wui-flex class="token-image-container">
          <wui-pulse size="125px" rings="3" duration="4" opacity="0.5" variant="accent-primary">
            <wui-flex justifyContent="center" alignItems="center" class="token-image loading">
              <wui-icon name="paperPlaneTitle" color="accent-primary" size="inherit"></wui-icon>
            </wui-flex>
          </wui-pulse>

          <wui-flex
            justifyContent="center"
            alignItems="center"
            class="token-badge-container loading"
          >
            <wui-flex
              alignItems="center"
              justifyContent="center"
              gap="01"
              padding="1"
              class="token-badge"
            >
              <wui-image
                src=${(0,n.ifDefined)(r.AssetUtil.getNetworkImage(s))}
                class="chain-image"
                size="mdl"
              ></wui-image>

              <wui-text variant="lg-regular" color="primary">${t} ${i}</wui-text>
            </wui-flex>
          </wui-flex>
        </wui-flex>
      </wui-flex>
    `}paymentTemplate(){return e.html`
      <wui-flex flexDirection="column" gap="2" .padding=${['0','6','0','6']}>
        ${this.renderPayment()}
        <wui-separator></wui-separator>
        ${this.renderWallet()}
      </wui-flex>
    `}paymentLifecycleTemplate(){const t=this.getStepsWithStatus();return e.html`
      <wui-flex flexDirection="column" padding="4" gap="2" class="payment-lifecycle-container">
        <wui-flex alignItems="center" justifyContent="space-between">
          <wui-text variant="md-regular" color="secondary">PAYMENT CYCLE</wui-text>

          ${this.renderPaymentCycleBadge()}
        </wui-flex>

        <wui-flex flexDirection="column" gap="5" .padding=${['2','0','2','0']}>
          ${t.map(e=>this.renderStep(e))}
        </wui-flex>
      </wui-flex>
    `}renderPaymentCycleBadge(){const t='failure'===this.quoteStatus||'timeout'===this.quoteStatus||'refund'===this.quoteStatus,i='success'===this.quoteStatus||'submitted'===this.quoteStatus;if(t)return e.html`
        <wui-flex
          justifyContent="center"
          alignItems="center"
          class="payment-step-badge error"
          gap="1"
        >
          <wui-icon name="close" color="error" size="xs"></wui-icon>
          <wui-text variant="sm-regular" color="error">Failed</wui-text>
        </wui-flex>
      `;if(i)return e.html`
        <wui-flex
          justifyContent="center"
          alignItems="center"
          class="payment-step-badge success"
          gap="1"
        >
          <wui-icon name="checkmark" color="success" size="xs"></wui-icon>
          <wui-text variant="sm-regular" color="success">Completed</wui-text>
        </wui-flex>
      `;const n=this.quote?.timeInSeconds??0;return e.html`
      <wui-flex alignItems="center" justifyContent="space-between" gap="3">
        <wui-flex
          justifyContent="center"
          alignItems="center"
          class="payment-step-badge loading"
          gap="1"
        >
          <wui-icon name="clock" color="default" size="xs"></wui-icon>
          <wui-text variant="sm-regular" color="primary">Est. ${n} sec</wui-text>
        </wui-flex>

        <wui-icon name="chevronBottom" color="default" size="xxs"></wui-icon>
      </wui-flex>
    `}renderPayment(){const t=r.ChainController.getAllRequestedCaipNetworks().find(e=>{const t=this.quote?.origin.currency.network;if(!t)return!1;const{chainId:i}=s.ParseUtil.parseCaipNetworkId(t);return u.HelpersUtil.isLowerCaseMatch(e.id.toString(),i.toString())}),i=s.NumberUtil.formatNumber(this.quote?.origin.amount||'0',{decimals:this.quote?.origin.currency.metadata.decimals??0}).toString(),o=(0,d.formatAmount)(i),l=this.quote?.origin.currency.metadata.symbol??'Unknown';return e.html`
      <wui-flex
        alignItems="flex-start"
        justifyContent="space-between"
        .padding=${['3','0','3','0']}
      >
        <wui-text variant="lg-regular" color="secondary">Payment Method</wui-text>

        <wui-flex flexDirection="column" alignItems="flex-end" gap="1">
          <wui-flex alignItems="center" gap="01">
            <wui-text variant="lg-regular" color="primary">${o}</wui-text>
            <wui-text variant="lg-regular" color="secondary">${l}</wui-text>
          </wui-flex>

          <wui-flex alignItems="center" gap="1">
            <wui-text variant="md-regular" color="secondary">on</wui-text>
            <wui-image
              src=${(0,n.ifDefined)(r.AssetUtil.getNetworkImage(t))}
              size="xs"
            ></wui-image>
            <wui-text variant="md-regular" color="secondary">${t?.name}</wui-text>
          </wui-flex>
        </wui-flex>
      </wui-flex>
    `}renderWallet(){return e.html`
      <wui-flex
        alignItems="flex-start"
        justifyContent="space-between"
        .padding=${['3','0','3','0']}
      >
        <wui-text variant="lg-regular" color="secondary">Wallet</wui-text>

        ${this.renderWalletText()}
      </wui-flex>
    `}renderWalletText(){const{image:t}=this.getWalletProperties({namespace:this.namespace}),{address:i}=this.caipAddress?s.ParseUtil.parseCaipAddress(this.caipAddress):{},r=this.selectedExchange?.name;return this.selectedExchange?e.html`
        <wui-flex alignItems="center" justifyContent="flex-end" gap="1">
          <wui-text variant="lg-regular" color="primary">${r}</wui-text>
          <wui-image src=${(0,n.ifDefined)(this.selectedExchange.imageUrl)} size="mdl"></wui-image>
        </wui-flex>
      `:e.html`
      <wui-flex alignItems="center" justifyContent="flex-end" gap="1">
        <wui-text variant="lg-regular" color="primary">
          ${o.UiHelperUtil.getTruncateString({string:this.profileName||i||r||'',charsStart:this.profileName?16:4,charsEnd:this.profileName?0:6,truncate:this.profileName?'end':'middle'})}
        </wui-text>

        <wui-image src=${(0,n.ifDefined)(t)} size="mdl"></wui-image>
      </wui-flex>
    `}getStepsWithStatus(){return'failure'===this.quoteStatus||'timeout'===this.quoteStatus||'refund'===this.quoteStatus?p.STEPS.map(e=>Object.assign({},e,{status:'failed'})):p.STEPS.map(e=>{const t=(x[e.id]??[]).includes(this.quoteStatus)?'completed':'pending';return Object.assign({},e,{status:t})})}renderStep({title:t,icon:n,status:s}){const r={'step-icon-box':!0,success:'completed'===s};return e.html`
      <wui-flex alignItems="center" gap="3">
        <wui-flex justifyContent="center" alignItems="center" class="step-icon-container">
          <wui-icon name=${n} color="default" size="mdl"></wui-icon>

          <wui-flex alignItems="center" justifyContent="center" class=${(0,i.classMap)(r)}>
            ${this.renderStatusIndicator(s)}
          </wui-flex>
        </wui-flex>

        <wui-text variant="md-regular" color="primary">${t}</wui-text>
      </wui-flex>
    `}renderStatusIndicator(t){return'completed'===t?e.html`<wui-icon size="sm" color="success" name="checkmark"></wui-icon>`:'failed'===t?e.html`<wui-icon size="sm" color="error" name="close"></wui-icon>`:'pending'===t?e.html`<wui-loading-spinner color="accent-primary" size="sm"></wui-loading-spinner>`:null}startPolling(){this.pollingInterval||(this.fetchQuoteStatus(),this.pollingInterval=setInterval(()=>{this.fetchQuoteStatus()},3e3))}stopPolling(){this.pollingInterval&&(clearInterval(this.pollingInterval),this.pollingInterval=null)}async fetchQuoteStatus(){const e=c.PayController.state.requestId;if(!e||p.TERMINAL_STATES.includes(this.quoteStatus))this.stopPolling();else try{await c.PayController.fetchQuoteStatus({requestId:e}),p.TERMINAL_STATES.includes(this.quoteStatus)&&this.stopPolling()}catch{this.stopPolling()}}initializeNamespace(){const e=r.ChainController.state.activeChain;this.namespace=e,this.caipAddress=r.ChainController.getAccountData(e)?.caipAddress,this.profileName=r.ChainController.getAccountData(e)?.profileName??null,this.unsubscribe.push(r.ChainController.subscribeChainProp('accountState',e=>{this.caipAddress=e?.caipAddress,this.profileName=e?.profileName??null},e))}getWalletProperties({namespace:e}){if(!e)return{name:void 0,image:void 0};const t=this.activeConnectorIds[e];if(!t)return{name:void 0,image:void 0};const i=r.ConnectorController.getConnector({id:t,namespace:e});if(!i)return{name:void 0,image:void 0};const n=r.AssetUtil.getConnectorImage(i);return{name:i.name,image:n}}};y.styles=h.default,w([(0,t.state)()],y.prototype,"paymentAsset",void 0),w([(0,t.state)()],y.prototype,"quoteStatus",void 0),w([(0,t.state)()],y.prototype,"quote",void 0),w([(0,t.state)()],y.prototype,"amount",void 0),w([(0,t.state)()],y.prototype,"namespace",void 0),w([(0,t.state)()],y.prototype,"caipAddress",void 0),w([(0,t.state)()],y.prototype,"profileName",void 0),w([(0,t.state)()],y.prototype,"activeConnectorIds",void 0),w([(0,t.state)()],y.prototype,"selectedExchange",void 0),y=w([(0,o.customElement)('w3m-pay-loading-view')],y)},6152,[5531,5557,5606,5568,3707,5442,5528,5631,6063,5759,6153,5724,5632,5515,6145,6150,6156,6157]);
__d(function(g,r,i,a,m,e,d){"use strict";Object.defineProperty(e,'__esModule',{value:!0});var t=r(d[0]);Object.keys(t).forEach(function(n){'default'===n||Object.prototype.hasOwnProperty.call(e,n)||Object.defineProperty(e,n,{enumerable:!0,get:function(){return t[n]}})})},6153,[6154]);
__d(function(g,_r,_i,a,m,_e,_d){"use strict";Object.defineProperty(_e,'__esModule',{value:!0}),Object.defineProperty(_e,"WuiPulse",{enumerable:!0,get:function(){return u}});var e,t=_r(_d[0]),r=_r(_d[1]),s=_r(_d[2]),i=_r(_d[3]),o=_r(_d[4]),n=_r(_d[5]),p=(e=n)&&e.__esModule?e:{default:e},c=this&&this.__decorate||function(e,t,r,s){var i,o=arguments.length,n=o<3?t:null===s?s=Object.getOwnPropertyDescriptor(t,r):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,r,s);else for(var p=e.length-1;p>=0;p--)(i=e[p])&&(n=(o<3?i(n):o>3?i(t,r,n):i(t,r))||n);return o>3&&n&&Object.defineProperty(t,r,n),n};const l={'accent-primary':s.vars.tokens.core.backgroundAccentPrimary};let u=class extends t.LitElement{constructor(){super(...arguments),this.rings=3,this.duration=2,this.opacity=.3,this.size="200px",this.variant='accent-primary'}render(){const e=l[this.variant];this.style.cssText=`\n      --pulse-size: ${this.size};\n      --pulse-duration: ${this.duration}s;\n      --pulse-color: ${e};\n      --pulse-opacity: ${this.opacity};\n    `;const r=Array.from({length:this.rings},(e,t)=>this.renderRing(t,this.rings));return t.html`
      <div class="pulse-container">
        <div class="pulse-rings">${r}</div>
        <div class="pulse-content">
          <slot></slot>
        </div>
      </div>
    `}renderRing(e,r){const s=`animation-delay: ${e/r*this.duration}s;`;return t.html`<div class="pulse-ring" style=${s}></div>`}};u.styles=[i.resetStyles,p.default],c([(0,r.property)({type:Number})],u.prototype,"rings",void 0),c([(0,r.property)({type:Number})],u.prototype,"duration",void 0),c([(0,r.property)({type:Number})],u.prototype,"opacity",void 0),c([(0,r.property)()],u.prototype,"size",void 0),c([(0,r.property)()],u.prototype,"variant",void 0),u=c([(0,o.customElement)('wui-pulse')],u)},6154,[5531,5557,5537,5530,5541,6155]);
__d(function(g,r,i,a,m,e,d){"use strict";Object.defineProperty(e,'__esModule',{value:!0}),Object.defineProperty(e,"default",{enumerable:!0,get:function(){return t}});var t=r(d[0]).css`
  :host {
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }

  .pulse-container {
    position: relative;
    width: var(--pulse-size);
    height: var(--pulse-size);
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .pulse-rings {
    position: absolute;
    inset: 0;
    pointer-events: none;
  }

  .pulse-ring {
    position: absolute;
    inset: 0;
    border-radius: 50%;
    border: 2px solid var(--pulse-color);
    opacity: 0;
    animation: pulse var(--pulse-duration, 2s) ease-out infinite;
  }

  .pulse-content {
    position: relative;
    z-index: 1;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  @keyframes pulse {
    0% {
      transform: scale(0.5);
      opacity: var(--pulse-opacity, 0.3);
    }
    50% {
      opacity: calc(var(--pulse-opacity, 0.3) * 0.5);
    }
    100% {
      transform: scale(1.2);
      opacity: 0;
    }
  }
`},6155,[5537]);
__d(function(g,r,i,a,m,e,d){"use strict";Object.defineProperty(e,'__esModule',{value:!0}),Object.defineProperty(e,"STEPS",{enumerable:!0,get:function(){return t}}),Object.defineProperty(e,"TERMINAL_STATES",{enumerable:!0,get:function(){return n}});const t=[{id:'received',title:'Receiving funds',icon:'dollar'},{id:'processing',title:'Swapping asset',icon:'recycleHorizontal'},{id:'sending',title:'Sending asset to the recipient address',icon:'send'}],n=['success','submitted','failure','timeout','refund']},6156,[]);
__d(function(g,r,i,a,m,e,d){"use strict";Object.defineProperty(e,'__esModule',{value:!0}),Object.defineProperty(e,"default",{enumerable:!0,get:function(){return o}});var o=r(d[0]).css`
  :host {
    display: block;
    height: 100%;
    width: 100%;
  }

  wui-image {
    border-radius: ${({borderRadius:o})=>o.round};
  }

  .token-badge-container {
    position: absolute;
    bottom: 6px;
    left: 50%;
    transform: translateX(-50%);
    border-radius: ${({borderRadius:o})=>o[4]};
    z-index: 3;
    min-width: 105px;
  }

  .token-badge-container.loading {
    background-color: ${({tokens:o})=>o.theme.backgroundPrimary};
    border: 3px solid ${({tokens:o})=>o.theme.backgroundPrimary};
  }

  .token-badge-container.success {
    background-color: ${({tokens:o})=>o.theme.backgroundPrimary};
    border: 3px solid ${({tokens:o})=>o.theme.backgroundPrimary};
  }

  .token-image-container {
    position: relative;
  }

  .token-image {
    border-radius: ${({borderRadius:o})=>o.round};
    width: 64px;
    height: 64px;
  }

  .token-image.success {
    background-color: ${({tokens:o})=>o.theme.foregroundPrimary};
  }

  .token-image.error {
    background-color: ${({tokens:o})=>o.theme.foregroundPrimary};
  }

  .token-image.loading {
    background: ${({colors:o})=>o.accent010};
  }

  .token-image wui-icon {
    width: 32px;
    height: 32px;
  }

  .token-badge {
    background-color: ${({tokens:o})=>o.theme.foregroundPrimary};
    border: 1px solid ${({tokens:o})=>o.theme.foregroundSecondary};
    border-radius: ${({borderRadius:o})=>o[4]};
  }

  .token-badge wui-text {
    white-space: nowrap;
  }

  .payment-lifecycle-container {
    background-color: ${({tokens:o})=>o.theme.foregroundPrimary};
    border-top-right-radius: ${({borderRadius:o})=>o[6]};
    border-top-left-radius: ${({borderRadius:o})=>o[6]};
  }

  .payment-step-badge {
    padding: ${({spacing:o})=>o[1]} ${({spacing:o})=>o[2]};
    border-radius: ${({borderRadius:o})=>o[1]};
  }

  .payment-step-badge.loading {
    background-color: ${({tokens:o})=>o.theme.foregroundSecondary};
  }

  .payment-step-badge.error {
    background-color: ${({tokens:o})=>o.core.backgroundError};
  }

  .payment-step-badge.success {
    background-color: ${({tokens:o})=>o.core.backgroundSuccess};
  }

  .step-icon-container {
    position: relative;
    height: 40px;
    width: 40px;
    border-radius: ${({borderRadius:o})=>o.round};
    background-color: ${({tokens:o})=>o.theme.foregroundSecondary};
  }

  .step-icon-box {
    position: absolute;
    right: -4px;
    bottom: -1px;
    padding: 2px;
    border-radius: ${({borderRadius:o})=>o.round};
    border: 2px solid ${({tokens:o})=>o.theme.backgroundPrimary};
    background-color: ${({tokens:o})=>o.theme.foregroundPrimary};
  }

  .step-icon-box.success {
    background-color: ${({tokens:o})=>o.core.backgroundSuccess};
  }
`},6157,[5528]);
__d(function(g,_r,_i,a,m,_e,_d){"use strict";Object.defineProperty(_e,'__esModule',{value:!0}),Object.defineProperty(_e,"W3mPayQuoteView",{enumerable:!0,get:function(){return b}});var e=_r(_d[0]),t=_r(_d[1]),s=_r(_d[2]),i=_r(_d[3]),n=_r(_d[4]),o=_r(_d[5]),r=_r(_d[6]);_r(_d[7]),_r(_d[8]),_r(_d[9]);var l=_r(_d[10]),c=_r(_d[11]);_r(_d[12]),_r(_d[13]),_r(_d[14]),_r(_d[15]),_r(_d[16]);var h,u=_r(_d[17]),d=_r(_d[18]),p=_r(_d[19]),y=(h=p)&&h.__esModule?h:{default:h},f=this&&this.__decorate||function(e,t,s,i){var n,o=arguments.length,r=o<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,s):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(e,t,s,i);else for(var l=e.length-1;l>=0;l--)(n=e[l])&&(r=(o<3?n(r):o>3?n(t,s,r):n(t,s))||r);return o>3&&r&&Object.defineProperty(t,s,r),r};const w={eip155:{icon:'ethereum',label:'EVM'},solana:{icon:'solana',label:'Solana'},bip122:{icon:'bitcoin',label:'Bitcoin'},ton:{icon:'ton',label:'Ton'}};let b=class extends e.LitElement{constructor(){super(),this.unsubscribe=[],this.profileName=null,this.paymentAsset=c.PayController.state.paymentAsset,this.namespace=void 0,this.caipAddress=void 0,this.amount=c.PayController.state.amount,this.recipient=c.PayController.state.recipient,this.activeConnectorIds=o.ConnectorController.state.activeConnectorIds,this.selectedPaymentAsset=c.PayController.state.selectedPaymentAsset,this.selectedExchange=c.PayController.state.selectedExchange,this.isFetchingQuote=c.PayController.state.isFetchingQuote,this.quoteError=c.PayController.state.quoteError,this.quote=c.PayController.state.quote,this.isFetchingTokenBalances=c.PayController.state.isFetchingTokenBalances,this.tokenBalances=c.PayController.state.tokenBalances,this.isPaymentInProgress=c.PayController.state.isPaymentInProgress,this.exchangeUrlForQuote=c.PayController.state.exchangeUrlForQuote,this.completedTransactionsCount=0,this.unsubscribe.push(c.PayController.subscribeKey('paymentAsset',e=>this.paymentAsset=e)),this.unsubscribe.push(c.PayController.subscribeKey('tokenBalances',e=>this.onTokenBalancesChanged(e))),this.unsubscribe.push(c.PayController.subscribeKey('isFetchingTokenBalances',e=>this.isFetchingTokenBalances=e)),this.unsubscribe.push(o.ConnectorController.subscribeKey('activeConnectorIds',e=>this.activeConnectorIds=e)),this.unsubscribe.push(c.PayController.subscribeKey('selectedPaymentAsset',e=>this.selectedPaymentAsset=e)),this.unsubscribe.push(c.PayController.subscribeKey('isFetchingQuote',e=>this.isFetchingQuote=e)),this.unsubscribe.push(c.PayController.subscribeKey('quoteError',e=>this.quoteError=e)),this.unsubscribe.push(c.PayController.subscribeKey('quote',e=>this.quote=e)),this.unsubscribe.push(c.PayController.subscribeKey('amount',e=>this.amount=e)),this.unsubscribe.push(c.PayController.subscribeKey('recipient',e=>this.recipient=e)),this.unsubscribe.push(c.PayController.subscribeKey('isPaymentInProgress',e=>this.isPaymentInProgress=e)),this.unsubscribe.push(c.PayController.subscribeKey('selectedExchange',e=>this.selectedExchange=e)),this.unsubscribe.push(c.PayController.subscribeKey('exchangeUrlForQuote',e=>this.exchangeUrlForQuote=e)),this.resetQuoteState(),this.initializeNamespace(),this.fetchTokens()}disconnectedCallback(){super.disconnectedCallback(),this.resetAssetsState(),this.unsubscribe.forEach(e=>e())}updated(e){super.updated(e);e.has('selectedPaymentAsset')&&this.fetchQuote()}render(){return e.html`
      <wui-flex flexDirection="column">
        ${this.profileTemplate()}

        <wui-flex
          flexDirection="column"
          gap="4"
          class="payment-methods-container"
          .padding=${['4','4','5','4']}
        >
          ${this.paymentOptionsViewTemplate()} ${this.amountWithFeeTemplate()}

          <wui-flex
            alignItems="center"
            justifyContent="space-between"
            .padding=${['1','0','1','0']}
          >
            <wui-separator></wui-separator>
          </wui-flex>

          ${this.paymentActionsTemplate()}
        </wui-flex>
      </wui-flex>
    `}profileTemplate(){if(this.selectedExchange){const t=n.NumberUtil.formatNumber(this.quote?.origin.amount,{decimals:this.quote?.origin.currency.metadata.decimals??0}).toString();return e.html`
        <wui-flex
          .padding=${['4','3','4','3']}
          alignItems="center"
          justifyContent="space-between"
          gap="2"
        >
          <wui-text variant="lg-regular" color="secondary">Paying with</wui-text>

          ${this.quote?e.html`<wui-text variant="lg-regular" color="primary">
                ${n.NumberUtil.bigNumber(t,{safe:!0}).round(6).toString()}
                ${this.quote.origin.currency.metadata.symbol}
              </wui-text>`:e.html`<wui-shimmer width="80px" height="18px" variant="light"></wui-shimmer>`}
        </wui-flex>
      `}const t=o.CoreHelperUtil.getPlainAddress(this.caipAddress)??'',{name:s,image:r}=this.getWalletProperties({namespace:this.namespace}),{icon:l,label:c}=w[this.namespace]??{};return e.html`
      <wui-flex
        .padding=${['4','3','4','3']}
        alignItems="center"
        justifyContent="space-between"
        gap="2"
      >
        <wui-wallet-switch
          profileName=${(0,i.ifDefined)(this.profileName)}
          address=${(0,i.ifDefined)(t)}
          imageSrc=${(0,i.ifDefined)(r)}
          alt=${(0,i.ifDefined)(s)}
          @click=${this.onConnectOtherWallet.bind(this)}
          data-testid="wui-wallet-switch"
        ></wui-wallet-switch>

        <wui-wallet-switch
          profileName=${(0,i.ifDefined)(c)}
          address=${(0,i.ifDefined)(t)}
          icon=${(0,i.ifDefined)(l)}
          iconSize="xs"
          .enableGreenCircle=${!1}
          alt=${(0,i.ifDefined)(c)}
          @click=${this.onConnectOtherWallet.bind(this)}
          data-testid="wui-wallet-switch"
        ></wui-wallet-switch>
      </wui-flex>
    `}initializeNamespace(){const e=o.ChainController.state.activeChain;this.namespace=e,this.caipAddress=o.ChainController.getAccountData(e)?.caipAddress,this.profileName=o.ChainController.getAccountData(e)?.profileName??null,this.unsubscribe.push(o.ChainController.subscribeChainProp('accountState',e=>this.onAccountStateChanged(e),e))}async fetchTokens(){if(this.namespace){let e;if(this.caipAddress){const{chainId:t,chainNamespace:s}=n.ParseUtil.parseCaipAddress(this.caipAddress),i=`${s}:${t}`;e=o.ChainController.getAllRequestedCaipNetworks().find(e=>e.caipNetworkId===i)}await c.PayController.fetchTokens({caipAddress:this.caipAddress,caipNetwork:e,namespace:this.namespace})}}fetchQuote(){if(this.amount&&this.recipient&&this.selectedPaymentAsset&&this.paymentAsset){const{address:e}=this.caipAddress?n.ParseUtil.parseCaipAddress(this.caipAddress):{};c.PayController.fetchQuote({amount:this.amount.toString(),address:e,sourceToken:this.selectedPaymentAsset,toToken:this.paymentAsset,recipient:this.recipient})}}getWalletProperties({namespace:e}){if(!e)return{name:void 0,image:void 0};const t=this.activeConnectorIds[e];if(!t)return{name:void 0,image:void 0};const s=o.ConnectorController.getConnector({id:t,namespace:e});if(!s)return{name:void 0,image:void 0};const i=o.AssetUtil.getConnectorImage(s);return{name:s.name,image:i}}paymentOptionsViewTemplate(){return e.html`
      <wui-flex flexDirection="column" gap="2">
        <wui-text variant="sm-regular" color="secondary">CHOOSE PAYMENT OPTION</wui-text>
        <wui-flex class="pay-options-container">${this.paymentOptionsTemplate()}</wui-flex>
      </wui-flex>
    `}paymentOptionsTemplate(){const t=this.getPaymentAssetFromTokenBalances();if(this.isFetchingTokenBalances)return e.html`<w3m-pay-options-skeleton></w3m-pay-options-skeleton>`;if(0===t.length)return e.html`<w3m-pay-options-empty
        @connectOtherWallet=${this.onConnectOtherWallet.bind(this)}
      ></w3m-pay-options-empty>`;const n={disabled:this.isFetchingQuote};return e.html`<w3m-pay-options
      class=${(0,s.classMap)(n)}
      .options=${t}
      .selectedPaymentAsset=${(0,i.ifDefined)(this.selectedPaymentAsset)}
      .onSelect=${this.onSelectedPaymentAssetChanged.bind(this)}
    ></w3m-pay-options>`}amountWithFeeTemplate(){return this.isFetchingQuote||!this.selectedPaymentAsset||this.quoteError?e.html`<w3m-pay-fees-skeleton></w3m-pay-fees-skeleton>`:e.html`<w3m-pay-fees></w3m-pay-fees>`}paymentActionsTemplate(){const t=this.isFetchingQuote||this.isFetchingTokenBalances,s=this.isFetchingQuote||this.isFetchingTokenBalances||!this.selectedPaymentAsset||Boolean(this.quoteError),i=n.NumberUtil.formatNumber(this.quote?.origin.amount??0,{decimals:this.quote?.origin.currency.metadata.decimals??0}).toString();return this.selectedExchange?t||s?e.html`
          <wui-shimmer width="100%" height="48px" variant="light" ?rounded=${!0}></wui-shimmer>
        `:e.html`<wui-button
        size="lg"
        fullWidth
        variant="accent-secondary"
        @click=${this.onPayWithExchange.bind(this)}
      >
        ${`Continue in ${this.selectedExchange.name}`}

        <wui-icon name="arrowRight" color="inherit" size="sm" slot="iconRight"></wui-icon>
      </wui-button>`:e.html`
      <wui-flex alignItems="center" justifyContent="space-between">
        <wui-flex flexDirection="column" gap="1">
          <wui-text variant="md-regular" color="secondary">Order Total</wui-text>

          ${t||s?e.html`<wui-shimmer width="58px" height="32px" variant="light"></wui-shimmer>`:e.html`<wui-flex alignItems="center" gap="01">
                <wui-text variant="h4-regular" color="primary">${(0,u.formatAmount)(i)}</wui-text>

                <wui-text variant="lg-regular" color="secondary">
                  ${this.quote?.origin.currency.metadata.symbol||'Unknown'}
                </wui-text>
              </wui-flex>`}
        </wui-flex>

        ${this.actionButtonTemplate({isLoading:t,isDisabled:s})}
      </wui-flex>
    `}actionButtonTemplate(t){const s=(0,d.getTransactionsSteps)(this.quote),{isLoading:i,isDisabled:n}=t;let o='Pay';return s.length>1&&0===this.completedTransactionsCount&&(o='Approve'),e.html`
      <wui-button
        size="lg"
        variant="accent-primary"
        ?loading=${i||this.isPaymentInProgress}
        ?disabled=${n||this.isPaymentInProgress}
        @click=${()=>{s.length>0?this.onSendTransactions():this.onTransfer()}}
      >
        ${o}
        ${i?null:e.html`<wui-icon
              name="arrowRight"
              color="inherit"
              size="sm"
              slot="iconRight"
            ></wui-icon>`}
      </wui-button>
    `}getPaymentAssetFromTokenBalances(){if(!this.namespace)return[];return(this.tokenBalances[this.namespace]??[]).map(e=>{try{return(0,u.formatBalanceToPaymentAsset)(e)}catch(e){return null}}).filter(e=>Boolean(e)).filter(e=>{const{chainId:t}=n.ParseUtil.parseCaipNetworkId(e.network),{chainId:s}=n.ParseUtil.parseCaipNetworkId(this.paymentAsset.network);return!!l.HelpersUtil.isLowerCaseMatch(e.asset,this.paymentAsset.asset)||(!this.selectedExchange||!l.HelpersUtil.isLowerCaseMatch(t.toString(),s.toString()))})}onTokenBalancesChanged(e){this.tokenBalances=e;const[t]=this.getPaymentAssetFromTokenBalances();t&&c.PayController.setSelectedPaymentAsset(t)}async onConnectOtherWallet(){await o.ConnectorController.connect(),await o.ModalController.open({view:'PayQuote'})}onAccountStateChanged(e){const{address:t}=this.caipAddress?n.ParseUtil.parseCaipAddress(this.caipAddress):{};if(this.caipAddress=e?.caipAddress,this.profileName=e?.profileName??null,t){const{address:e}=this.caipAddress?n.ParseUtil.parseCaipAddress(this.caipAddress):{};e?l.HelpersUtil.isLowerCaseMatch(e,t)||(this.resetAssetsState(),this.resetQuoteState(),this.fetchTokens()):o.ModalController.close()}}onSelectedPaymentAssetChanged(e){this.isFetchingQuote||c.PayController.setSelectedPaymentAsset(e)}async onTransfer(){const e=(0,d.getTransferStep)(this.quote);if(e){if(!l.HelpersUtil.isLowerCaseMatch(this.selectedPaymentAsset?.asset,e.deposit.currency))throw new Error('Quote asset is not the same as the selected payment asset');const t=this.selectedPaymentAsset?.amount??'0',s=n.NumberUtil.formatNumber(e.deposit.amount,{decimals:this.selectedPaymentAsset?.metadata.decimals??0}).toString();if(!n.NumberUtil.bigNumber(t).gte(s))return void o.SnackController.showError('Insufficient funds');if(this.quote&&this.selectedPaymentAsset&&this.caipAddress&&this.namespace){const{address:t}=n.ParseUtil.parseCaipAddress(this.caipAddress);await c.PayController.onTransfer({chainNamespace:this.namespace,fromAddress:t,toAddress:e.deposit.receiver,amount:s,paymentAsset:this.selectedPaymentAsset}),c.PayController.setRequestId(e.requestId),o.RouterController.push('PayLoading')}}}async onSendTransactions(){const e=this.selectedPaymentAsset?.amount??'0',t=n.NumberUtil.formatNumber(this.quote?.origin.amount??0,{decimals:this.selectedPaymentAsset?.metadata.decimals??0}).toString();if(!n.NumberUtil.bigNumber(e).gte(t))return void o.SnackController.showError('Insufficient funds');const s=(0,d.getTransactionsSteps)(this.quote),[i]=(0,d.getTransactionsSteps)(this.quote,this.completedTransactionsCount);if(i&&this.namespace){await c.PayController.onSendTransaction({namespace:this.namespace,transactionStep:i}),this.completedTransactionsCount+=1;this.completedTransactionsCount===s.length&&(c.PayController.setRequestId(i.requestId),o.RouterController.push('PayLoading'))}}onPayWithExchange(){if(this.exchangeUrlForQuote){const e=o.CoreHelperUtil.returnOpenHref('','popupWindow','scrollbar=yes,width=480,height=720');if(!e)throw new Error('Could not create popup window');e.location.href=this.exchangeUrlForQuote;const t=(0,d.getTransferStep)(this.quote);t&&c.PayController.setRequestId(t.requestId),c.PayController.initiatePayment(),o.RouterController.push('PayLoading')}}resetAssetsState(){c.PayController.setSelectedPaymentAsset(null)}resetQuoteState(){c.PayController.resetQuoteState()}};b.styles=y.default,f([(0,t.state)()],b.prototype,"profileName",void 0),f([(0,t.state)()],b.prototype,"paymentAsset",void 0),f([(0,t.state)()],b.prototype,"namespace",void 0),f([(0,t.state)()],b.prototype,"caipAddress",void 0),f([(0,t.state)()],b.prototype,"amount",void 0),f([(0,t.state)()],b.prototype,"recipient",void 0),f([(0,t.state)()],b.prototype,"activeConnectorIds",void 0),f([(0,t.state)()],b.prototype,"selectedPaymentAsset",void 0),f([(0,t.state)()],b.prototype,"selectedExchange",void 0),f([(0,t.state)()],b.prototype,"isFetchingQuote",void 0),f([(0,t.state)()],b.prototype,"quoteError",void 0),f([(0,t.state)()],b.prototype,"quote",void 0),f([(0,t.state)()],b.prototype,"isFetchingTokenBalances",void 0),f([(0,t.state)()],b.prototype,"tokenBalances",void 0),f([(0,t.state)()],b.prototype,"isPaymentInProgress",void 0),f([(0,t.state)()],b.prototype,"exchangeUrlForQuote",void 0),f([(0,t.state)()],b.prototype,"completedTransactionsCount",void 0),b=f([(0,r.customElement)('w3m-pay-quote-view')],b)},6158,[5531,5557,5606,5568,3707,5442,5528,5631,5632,5673,5515,6145,6159,6161,6163,6165,6167,6150,6149,6169]);
__d(function(g,_r,_i,a,m,_e,_d){"use strict";Object.defineProperty(_e,'__esModule',{value:!0}),Object.defineProperty(_e,"W3mPayFeesSkeleton",{enumerable:!0,get:function(){return l}});var e=_r(_d[0]),t=_r(_d[1]);_r(_d[2]),_r(_d[3]),_r(_d[4]);var i,r=_r(_d[5]),n=(i=r)&&i.__esModule?i:{default:i},u=this&&this.__decorate||function(e,t,i,r){var n,u=arguments.length,l=u<3?t:null===r?r=Object.getOwnPropertyDescriptor(t,i):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)l=Reflect.decorate(e,t,i,r);else for(var s=e.length-1;s>=0;s--)(n=e[s])&&(l=(u<3?n(l):u>3?n(t,i,l):n(t,i))||l);return u>3&&l&&Object.defineProperty(t,i,l),l};let l=class extends e.LitElement{render(){return e.html`
      <wui-flex flexDirection="column" gap="4">
        <wui-flex alignItems="center" justifyContent="space-between">
          <wui-text variant="md-regular" color="secondary">Pay</wui-text>
          <wui-shimmer width="60px" height="16px" borderRadius="4xs" variant="light"></wui-shimmer>
        </wui-flex>

        <wui-flex alignItems="center" justifyContent="space-between">
          <wui-text variant="md-regular" color="secondary">Network Fee</wui-text>

          <wui-flex flexDirection="column" alignItems="flex-end" gap="2">
            <wui-shimmer
              width="75px"
              height="16px"
              borderRadius="4xs"
              variant="light"
            ></wui-shimmer>

            <wui-flex alignItems="center" gap="01">
              <wui-shimmer width="14px" height="14px" rounded variant="light"></wui-shimmer>
              <wui-shimmer
                width="49px"
                height="14px"
                borderRadius="4xs"
                variant="light"
              ></wui-shimmer>
            </wui-flex>
          </wui-flex>
        </wui-flex>

        <wui-flex alignItems="center" justifyContent="space-between">
          <wui-text variant="md-regular" color="secondary">Service Fee</wui-text>
          <wui-shimmer width="75px" height="16px" borderRadius="4xs" variant="light"></wui-shimmer>
        </wui-flex>
      </wui-flex>
    `}};l.styles=[n.default],l=u([(0,t.customElement)('w3m-pay-fees-skeleton')],l)},6159,[5531,5528,5631,5754,5632,6160]);
__d(function(g,r,i,a,m,e,d){"use strict";Object.defineProperty(e,'__esModule',{value:!0}),Object.defineProperty(e,"default",{enumerable:!0,get:function(){return t}});var t=r(d[0]).css`
  :host {
    display: block;
  }
`},6160,[5531]);
__d(function(g,_r,_i,a,m,_e,_d){"use strict";Object.defineProperty(_e,'__esModule',{value:!0}),Object.defineProperty(_e,"W3mPayFees",{enumerable:!0,get:function(){return w}});var e=_r(_d[0]),t=_r(_d[1]),r=_r(_d[2]),i=_r(_d[3]),n=_r(_d[4]),o=_r(_d[5]);_r(_d[6]),_r(_d[7]),_r(_d[8]);var u,l=_r(_d[9]),s=_r(_d[10]),c=_r(_d[11]),d=(u=c)&&u.__esModule?u:{default:u},f=this&&this.__decorate||function(e,t,r,i){var n,o=arguments.length,u=o<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,r):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)u=Reflect.decorate(e,t,r,i);else for(var l=e.length-1;l>=0;l--)(n=e[l])&&(u=(o<3?n(u):o>3?n(t,r,u):n(t,r))||u);return o>3&&u&&Object.defineProperty(t,r,u),u};let w=class extends e.LitElement{constructor(){super(),this.unsubscribe=[],this.quote=s.PayController.state.quote,this.unsubscribe.push(s.PayController.subscribeKey('quote',e=>this.quote=e))}disconnectedCallback(){this.unsubscribe.forEach(e=>e())}render(){const t=i.NumberUtil.formatNumber(this.quote?.origin.amount||'0',{decimals:this.quote?.origin.currency.metadata.decimals??0,round:6}).toString();return e.html`
      <wui-flex flexDirection="column" gap="4">
        <wui-flex alignItems="center" justifyContent="space-between">
          <wui-text variant="md-regular" color="secondary">Pay</wui-text>
          <wui-text variant="md-regular" color="primary">
            ${t} ${this.quote?.origin.currency.metadata.symbol||'Unknown'}
          </wui-text>
        </wui-flex>

        ${this.quote&&this.quote.fees.length>0?this.quote.fees.map(e=>this.renderFee(e)):null}
      </wui-flex>
    `}renderFee(t){const o='network'===t.id,u=i.NumberUtil.formatNumber(t.amount||'0',{decimals:t.currency.metadata.decimals??0,round:6}).toString();if(o){const i=n.ChainController.getAllRequestedCaipNetworks().find(e=>l.HelpersUtil.isLowerCaseMatch(e.caipNetworkId,t.currency.network));return e.html`
        <wui-flex alignItems="center" justifyContent="space-between">
          <wui-text variant="md-regular" color="secondary">${t.label}</wui-text>

          <wui-flex flexDirection="column" alignItems="flex-end" gap="2">
            <wui-text variant="md-regular" color="primary">
              ${u} ${t.currency.metadata.symbol||'Unknown'}
            </wui-text>

            <wui-flex alignItems="center" gap="01">
              <wui-image
                src=${(0,r.ifDefined)(n.AssetUtil.getNetworkImage(i))}
                size="xs"
              ></wui-image>
              <wui-text variant="sm-regular" color="secondary">
                ${i?.name||'Unknown'}
              </wui-text>
            </wui-flex>
          </wui-flex>
        </wui-flex>
      `}return e.html`
      <wui-flex alignItems="center" justifyContent="space-between">
        <wui-text variant="md-regular" color="secondary">${t.label}</wui-text>
        <wui-text variant="md-regular" color="primary">
          ${u} ${t.currency.metadata.symbol||'Unknown'}
        </wui-text>
      </wui-flex>
    `}};w.styles=[d.default],f([(0,t.state)()],w.prototype,"quote",void 0),w=f([(0,o.customElement)('w3m-pay-fees')],w)},6161,[5531,5557,5568,3707,5442,5528,5631,6063,5632,5515,6145,6162]);
__d(function(g,r,i,a,m,e,d){"use strict";Object.defineProperty(e,'__esModule',{value:!0}),Object.defineProperty(e,"default",{enumerable:!0,get:function(){return t}});var t=r(d[0]).css`
  :host {
    display: block;
  }

  wui-image {
    border-radius: ${({borderRadius:t})=>t.round};
  }
`},6162,[5528]);
__d(function(g,_r,_i,a,m,_e,_d){"use strict";Object.defineProperty(_e,'__esModule',{value:!0}),Object.defineProperty(_e,"W3mPayOptionsEmpty",{enumerable:!0,get:function(){return l}});var e=_r(_d[0]),t=_r(_d[1]),n=_r(_d[2]);_r(_d[3]),_r(_d[4]),_r(_d[5]),_r(_d[6]);var c,r=_r(_d[7]),o=_r(_d[8]),i=(c=o)&&c.__esModule?c:{default:c},s=this&&this.__decorate||function(e,t,n,c){var r,o=arguments.length,i=o<3?t:null===c?c=Object.getOwnPropertyDescriptor(t,n):c;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)i=Reflect.decorate(e,t,n,c);else for(var s=e.length-1;s>=0;s--)(r=e[s])&&(i=(o<3?r(i):o>3?r(t,n,i):r(t,n))||i);return o>3&&i&&Object.defineProperty(t,n,i),i};let l=class extends e.LitElement{constructor(){super(),this.unsubscribe=[],this.selectedExchange=r.PayController.state.selectedExchange,this.unsubscribe.push(r.PayController.subscribeKey('selectedExchange',e=>this.selectedExchange=e))}disconnectedCallback(){this.unsubscribe.forEach(e=>e())}render(){const t=Boolean(this.selectedExchange);return e.html`
      <wui-flex
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        gap="3"
        class="disabled-container"
      >
        <wui-icon name="coins" color="default" size="inherit"></wui-icon>

        <wui-text variant="md-regular" color="primary" align="center">
          You don't have enough funds to complete this transaction
        </wui-text>

        ${t?null:e.html`<wui-button
              size="md"
              variant="neutral-secondary"
              @click=${this.dispatchConnectOtherWalletEvent.bind(this)}
              >Connect other wallet</wui-button
            >`}
      </wui-flex>
    `}dispatchConnectOtherWalletEvent(){this.dispatchEvent(new CustomEvent('connectOtherWallet',{detail:!0,bubbles:!0,composed:!0}))}};l.styles=[i.default],s([(0,t.property)({type:Array})],l.prototype,"selectedExchange",void 0),l=s([(0,n.customElement)('w3m-pay-options-empty')],l)},6163,[5531,5557,5528,5664,5631,5639,5632,6145,6164]);
__d(function(g,r,i,a,m,e,d){"use strict";Object.defineProperty(e,'__esModule',{value:!0}),Object.defineProperty(e,"default",{enumerable:!0,get:function(){return t}});var t=r(d[0]).css`
  :host {
    display: block;
    width: 100%;
  }

  .disabled-container {
    padding: ${({spacing:t})=>t[2]};
    min-height: 168px;
  }

  wui-icon {
    width: ${({spacing:t})=>t[8]};
    height: ${({spacing:t})=>t[8]};
  }

  wui-flex > wui-text {
    max-width: 273px;
  }
`},6164,[5528]);
__d(function(g,_r,_i,a,m,_e,_d){"use strict";Object.defineProperty(_e,'__esModule',{value:!0}),Object.defineProperty(_e,"W3mPayOptionsSkeleton",{enumerable:!0,get:function(){return s}});var e=_r(_d[0]),t=_r(_d[1]);_r(_d[2]),_r(_d[3]);var i,n=_r(_d[4]),r=(i=n)&&i.__esModule?i:{default:i},l=this&&this.__decorate||function(e,t,i,n){var r,l=arguments.length,s=l<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,i):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)s=Reflect.decorate(e,t,i,n);else for(var o=e.length-1;o>=0;o--)(r=e[o])&&(s=(l<3?r(s):l>3?r(t,i,s):r(t,i))||s);return l>3&&s&&Object.defineProperty(t,i,s),s};let s=class extends e.LitElement{render(){return e.html`
      <wui-flex flexDirection="column" gap="2" class="pay-options-container">
        ${this.renderOptionEntry()} ${this.renderOptionEntry()} ${this.renderOptionEntry()}
      </wui-flex>
    `}renderOptionEntry(){return e.html`
      <wui-flex
        alignItems="center"
        justifyContent="space-between"
        gap="2"
        class="pay-option-container"
      >
        <wui-flex alignItems="center" gap="2">
          <wui-flex class="token-images-container">
            <wui-shimmer
              width="32px"
              height="32px"
              rounded
              variant="light"
              class="token-image"
            ></wui-shimmer>
            <wui-shimmer
              width="16px"
              height="16px"
              rounded
              variant="light"
              class="chain-image"
            ></wui-shimmer>
          </wui-flex>

          <wui-flex flexDirection="column" gap="1">
            <wui-shimmer
              width="74px"
              height="16px"
              borderRadius="4xs"
              variant="light"
            ></wui-shimmer>
            <wui-shimmer
              width="46px"
              height="14px"
              borderRadius="4xs"
              variant="light"
            ></wui-shimmer>
          </wui-flex>
        </wui-flex>
      </wui-flex>
    `}};s.styles=[r.default],s=l([(0,t.customElement)('w3m-pay-options-skeleton')],s)},6165,[5531,5528,5631,5754,6166]);
__d(function(g,r,i,a,m,e,d){"use strict";Object.defineProperty(e,'__esModule',{value:!0}),Object.defineProperty(e,"default",{enumerable:!0,get:function(){return o}});var o=r(d[0]).css`
  :host {
    display: block;
    width: 100%;
  }

  .pay-options-container {
    max-height: 196px;
    overflow-y: auto;
    overflow-x: hidden;
    scrollbar-width: none;
  }

  .pay-options-container::-webkit-scrollbar {
    display: none;
  }

  .pay-option-container {
    border-radius: ${({borderRadius:o})=>o[4]};
    padding: ${({spacing:o})=>o[3]};
    min-height: 60px;
  }

  .token-images-container {
    position: relative;
    justify-content: center;
    align-items: center;
  }

  .chain-image {
    position: absolute;
    bottom: -3px;
    right: -5px;
    border: 2px solid ${({tokens:o})=>o.theme.foregroundSecondary};
  }
`},6166,[5528]);
__d(function(g,_r,_i,a,m,_e,_d){"use strict";Object.defineProperty(_e,'__esModule',{value:!0}),Object.defineProperty(_e,"W3mPayOptions",{enumerable:!0,get:function(){return u}});var t=_r(_d[0]),e=_r(_d[1]),o=_r(_d[2]),i=_r(_d[3]),s=_r(_d[4]),r=_r(_d[5]);_r(_d[6]),_r(_d[7]);var n,l=_r(_d[8]),c=(n=l)&&n.__esModule?n:{default:n},p=this&&this.__decorate||function(t,e,o,i){var s,r=arguments.length,n=r<3?e:null===i?i=Object.getOwnPropertyDescriptor(e,o):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(t,e,o,i);else for(var l=t.length-1;l>=0;l--)(s=t[l])&&(n=(r<3?s(n):r>3?s(e,o,n):s(e,o))||n);return r>3&&n&&Object.defineProperty(e,o,n),n};let u=class extends t.LitElement{constructor(){super(),this.unsubscribe=[],this.options=[],this.selectedPaymentAsset=null}disconnectedCallback(){this.unsubscribe.forEach(t=>t()),this.resizeObserver?.disconnect();const t=this.shadowRoot?.querySelector('.pay-options-container');t?.removeEventListener('scroll',this.handleOptionsListScroll.bind(this))}firstUpdated(){const t=this.shadowRoot?.querySelector('.pay-options-container');t&&(requestAnimationFrame(this.handleOptionsListScroll.bind(this)),t?.addEventListener('scroll',this.handleOptionsListScroll.bind(this)),this.resizeObserver=new ResizeObserver(()=>{this.handleOptionsListScroll()}),this.resizeObserver?.observe(t),this.handleOptionsListScroll())}render(){return t.html`
      <wui-flex flexDirection="column" gap="2" class="pay-options-container">
        ${this.options.map(t=>this.payOptionTemplate(t))}
      </wui-flex>
    `}payOptionTemplate(e){const{network:r,metadata:n,asset:l,amount:c="0"}=e,p=s.ChainController.getAllRequestedCaipNetworks().find(t=>t.caipNetworkId===r),u=`${r}:${l}`===`${this.selectedPaymentAsset?.network}:${this.selectedPaymentAsset?.asset}`,y=i.NumberUtil.bigNumber(c,{safe:!0}),d=y.gt(0);return t.html`
      <wui-flex
        alignItems="center"
        justifyContent="space-between"
        gap="2"
        @click=${()=>this.onSelect?.(e)}
        class="pay-option-container"
      >
        <wui-flex alignItems="center" gap="2">
          <wui-flex class="token-images-container">
            <wui-image
              src=${(0,o.ifDefined)(n.logoURI)}
              class="token-image"
              size="3xl"
            ></wui-image>
            <wui-image
              src=${(0,o.ifDefined)(s.AssetUtil.getNetworkImage(p))}
              class="chain-image"
              size="md"
            ></wui-image>
          </wui-flex>

          <wui-flex flexDirection="column" gap="1">
            <wui-text variant="lg-regular" color="primary">${n.symbol}</wui-text>
            ${d?t.html`<wui-text variant="sm-regular" color="secondary">
                  ${y.round(6).toString()} ${n.symbol}
                </wui-text>`:null}
          </wui-flex>
        </wui-flex>

        ${u?t.html`<wui-icon name="checkmark" size="md" color="success"></wui-icon>`:null}
      </wui-flex>
    `}handleOptionsListScroll(){const t=this.shadowRoot?.querySelector('.pay-options-container');if(!t)return;t.scrollHeight>300?(t.style.setProperty('--options-mask-image',"linear-gradient(\n          to bottom,\n          rgba(0, 0, 0, calc(1 - var(--options-scroll--top-opacity))) 0px,\n          rgba(200, 200, 200, calc(1 - var(--options-scroll--top-opacity))) 1px,\n          black 50px,\n          black calc(100% - 50px),\n          rgba(155, 155, 155, calc(1 - var(--options-scroll--bottom-opacity))) calc(100% - 1px),\n          rgba(0, 0, 0, calc(1 - var(--options-scroll--bottom-opacity))) 100%\n        )"),t.style.setProperty('--options-scroll--top-opacity',r.MathUtil.interpolate([0,50],[0,1],t.scrollTop).toString()),t.style.setProperty('--options-scroll--bottom-opacity',r.MathUtil.interpolate([0,50],[0,1],t.scrollHeight-t.scrollTop-t.offsetHeight).toString())):(t.style.setProperty('--options-mask-image','none'),t.style.setProperty('--options-scroll--top-opacity','0'),t.style.setProperty('--options-scroll--bottom-opacity','0'))}};u.styles=[c.default],p([(0,e.property)({type:Array})],u.prototype,"options",void 0),p([(0,e.property)()],u.prototype,"selectedPaymentAsset",void 0),p([(0,e.property)()],u.prototype,"onSelect",void 0),u=p([(0,r.customElement)('w3m-pay-options')],u)},6167,[5531,5557,5568,3707,5442,5528,5631,5632,6168]);
__d(function(g,r,i,a,m,e,d){"use strict";Object.defineProperty(e,'__esModule',{value:!0}),Object.defineProperty(e,"default",{enumerable:!0,get:function(){return o}});var o=r(d[0]).css`
  :host {
    display: block;
    width: 100%;
  }

  .pay-options-container {
    max-height: 196px;
    overflow-y: auto;
    overflow-x: hidden;
    scrollbar-width: none;
    mask-image: var(--options-mask-image);
    -webkit-mask-image: var(--options-mask-image);
  }

  .pay-options-container::-webkit-scrollbar {
    display: none;
  }

  .pay-option-container {
    cursor: pointer;
    border-radius: ${({borderRadius:o})=>o[4]};
    padding: ${({spacing:o})=>o[3]};
    transition: background-color ${({durations:o})=>o.lg}
      ${({easings:o})=>o['ease-out-power-1']};
    will-change: background-color;
  }

  .token-images-container {
    position: relative;
    justify-content: center;
    align-items: center;
  }

  .token-image {
    border-radius: ${({borderRadius:o})=>o.round};
    width: 32px;
    height: 32px;
  }

  .chain-image {
    position: absolute;
    width: 16px;
    height: 16px;
    bottom: -3px;
    right: -5px;
    border-radius: ${({borderRadius:o})=>o.round};
    border: 2px solid ${({tokens:o})=>o.theme.backgroundPrimary};
  }

  @media (hover: hover) and (pointer: fine) {
    .pay-option-container:hover {
      background-color: ${({tokens:o})=>o.theme.foregroundPrimary};
    }
  }
`},6168,[5528]);
__d(function(g,r,i,a,m,e,d){"use strict";Object.defineProperty(e,'__esModule',{value:!0}),Object.defineProperty(e,"default",{enumerable:!0,get:function(){return o}});var o=r(d[0]).css`
  .payment-methods-container {
    background-color: ${({tokens:o})=>o.theme.foregroundPrimary};
    border-top-right-radius: ${({borderRadius:o})=>o[5]};
    border-top-left-radius: ${({borderRadius:o})=>o[5]};
  }

  .pay-options-container {
    background-color: ${({tokens:o})=>o.theme.foregroundSecondary};
    border-radius: ${({borderRadius:o})=>o[5]};
    padding: ${({spacing:o})=>o[1]};
  }

  w3m-tooltip-trigger {
    display: flex;
    align-items: center;
    justify-content: center;
    max-width: fit-content;
  }

  wui-image {
    border-radius: ${({borderRadius:o})=>o.round};
  }

  w3m-pay-options.disabled {
    opacity: 0.5;
    pointer-events: none;
  }
`},6169,[5528]);
__d(function(g,r,i,a,m,e,d){"use strict";Object.defineProperty(e,'__esModule',{value:!0}),e.openPay=s,e.pay=async function(c,P=o){if(P<=0)throw new n.AppKitPayError(n.AppKitPayErrorCodes.INVALID_PAYMENT_CONFIG,'Timeout must be greater than 0');try{await s(c)}catch(t){if(t instanceof n.AppKitPayError)throw t;throw new n.AppKitPayError(n.AppKitPayErrorCodes.UNABLE_TO_INITIATE_PAYMENT,t.message)}return new Promise((o,s)=>{let c=!1;const l=setTimeout(()=>{c||(c=!0,C(),s(new n.AppKitPayError(n.AppKitPayErrorCodes.GENERIC_PAYMENT_ERROR,'Payment timeout')))},P);function y(){if(c)return;const n=t.PayController.state.currentPayment,s=t.PayController.state.error,u=t.PayController.state.isPaymentInProgress;return'SUCCESS'===n?.status?(c=!0,C(),clearTimeout(l),void o({success:!0,result:n.result})):'FAILED'===n?.status?(c=!0,C(),clearTimeout(l),void o({success:!1,error:s||'Payment failed'})):void(!s||u||n||(c=!0,C(),clearTimeout(l),o({success:!1,error:s})))}const E=u('currentPayment',y),p=u('error',y),f=u('isPaymentInProgress',y),C=(A=[E,p,f],()=>{A.forEach(t=>{try{t()}catch{}})});var A;y()})},e.getAvailableExchanges=function(n){return t.PayController.getAvailableExchanges(n)},e.getPayUrl=function(n,o){return t.PayController.getPayUrl(n,o,!0)},e.openPayUrl=function(n,o,s){return t.PayController.openPayUrl({exchangeId:n,openInNewTab:s},o,!0)},e.getExchanges=function(){return t.PayController.getExchanges()},e.getPayResult=function(){return t.PayController.state.currentPayment?.result},e.getPayError=function(){return t.PayController.state.error},e.getIsPaymentInProgress=function(){return t.PayController.state.isPaymentInProgress},e.subscribeStateKey=u;var t=r(d[0]),n=r(d[1]);const o=3e5;async function s(n){return t.PayController.handleOpenPay(n)}function u(n,o){return t.PayController.subscribeKey(n,o)}},6170,[6145,6146]);
__d(function(g,r,i,a,m,e,d){"use strict";Object.defineProperty(e,'__esModule',{value:!0}),Object.defineProperty(e,"baseETH",{enumerable:!0,get:function(){return t}}),Object.defineProperty(e,"baseUSDC",{enumerable:!0,get:function(){return n}}),Object.defineProperty(e,"baseSepoliaETH",{enumerable:!0,get:function(){return o}}),Object.defineProperty(e,"ethereumUSDC",{enumerable:!0,get:function(){return s}}),Object.defineProperty(e,"optimismUSDC",{enumerable:!0,get:function(){return c}}),Object.defineProperty(e,"arbitrumUSDC",{enumerable:!0,get:function(){return b}}),Object.defineProperty(e,"polygonUSDC",{enumerable:!0,get:function(){return l}}),Object.defineProperty(e,"solanaUSDC",{enumerable:!0,get:function(){return u}}),Object.defineProperty(e,"ethereumUSDT",{enumerable:!0,get:function(){return f}}),Object.defineProperty(e,"optimismUSDT",{enumerable:!0,get:function(){return D}}),Object.defineProperty(e,"arbitrumUSDT",{enumerable:!0,get:function(){return S}}),Object.defineProperty(e,"polygonUSDT",{enumerable:!0,get:function(){return p}}),Object.defineProperty(e,"solanaUSDT",{enumerable:!0,get:function(){return y}}),Object.defineProperty(e,"solanaSOL",{enumerable:!0,get:function(){return U}});const t={network:'eip155:8453',asset:'native',metadata:{name:'Ethereum',symbol:'ETH',decimals:18}},n={network:'eip155:8453',asset:'0x833589fcd6edb6e08f4c7c32d4f71b54bda02913',metadata:{name:'USD Coin',symbol:'USDC',decimals:6}},o={network:'eip155:84532',asset:'native',metadata:{name:'Ethereum',symbol:'ETH',decimals:18}},s={network:'eip155:1',asset:'0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',metadata:{name:'USD Coin',symbol:'USDC',decimals:6}},c={network:'eip155:10',asset:'0x0b2c639c533813f4aa9d7837caf62653d097ff85',metadata:{name:'USD Coin',symbol:'USDC',decimals:6}},b={network:'eip155:42161',asset:'0xaf88d065e77c8cC2239327C5EDb3A432268e5831',metadata:{name:'USD Coin',symbol:'USDC',decimals:6}},l={network:'eip155:137',asset:'0x3c499c542cef5e3811e1192ce70d8cc03d5c3359',metadata:{name:'USD Coin',symbol:'USDC',decimals:6}},u={network:'solana:5eykt4UsFv8P8NJdTREpY1vzqKqZKvdp',asset:'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v',metadata:{name:'USD Coin',symbol:'USDC',decimals:6}},f={network:'eip155:1',asset:'0xdAC17F958D2ee523a2206206994597C13D831ec7',metadata:{name:'Tether USD',symbol:'USDT',decimals:6}},D={network:'eip155:10',asset:'0x94b008aA00579c1307B0EF2c499aD98a8ce58e58',metadata:{name:'Tether USD',symbol:'USDT',decimals:6}},S={network:'eip155:42161',asset:'0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9',metadata:{name:'Tether USD',symbol:'USDT',decimals:6}},p={network:'eip155:137',asset:'0xc2132d05d31c914a87c6611c10748aeb04b58e8f',metadata:{name:'Tether USD',symbol:'USDT',decimals:6}},y={network:'solana:5eykt4UsFv8P8NJdTREpY1vzqKqZKvdp',asset:'Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB',metadata:{name:'Tether USD',symbol:'USDT',decimals:6}},U={network:'solana:5eykt4UsFv8P8NJdTREpY1vzqKqZKvdp',asset:'native',metadata:{name:'Solana',symbol:'SOL',decimals:9}}},6171,[]);
__d(function(g,_r,i,a,m,_e,d){"use strict";function e(r){var t,n,f="";if("string"==typeof r||"number"==typeof r)f+=r;else if("object"==typeof r)if(Array.isArray(r))for(t=0;t<r.length;t++)r[t]&&(n=e(r[t]))&&(f&&(f+=" "),f+=n);else for(t in r)r[t]&&(f&&(f+=" "),f+=t);return f}function r(){for(var r,t,n=0,f="";n<arguments.length;)(r=arguments[n++])&&(t=e(r))&&(f&&(f+=" "),f+=t);return f}Object.defineProperty(_e,'__esModule',{value:!0}),Object.defineProperty(_e,"default",{enumerable:!0,get:function(){return t}}),_e.clsx=r;var t=r},6172,[]);
__d(function(g,r,_i,a,m,e,d){"use strict";Object.defineProperty(e,'__esModule',{value:!0}),Object.defineProperty(e,"SHA256",{enumerable:!0,get:function(){return o}}),Object.defineProperty(e,"sha256",{enumerable:!0,get:function(){return c}}),Object.defineProperty(e,"sha224",{enumerable:!0,get:function(){return l}});var t=r(d[0]),s=r(d[1]);const i=new Uint32Array([1116352408,1899447441,3049323471,3921009573,961987163,1508970993,2453635748,2870763221,3624381080,310598401,607225278,1426881987,1925078388,2162078206,2614888103,3248222580,3835390401,4022224774,264347078,604807628,770255983,1249150122,1555081692,1996064986,2554220882,2821834349,2952996808,3210313671,3336571891,3584528711,113926993,338241895,666307205,773529912,1294757372,1396182291,1695183700,1986661051,2177026350,2456956037,2730485921,2820302411,3259730800,3345764771,3516065817,3600352804,4094571909,275423344,430227734,506948616,659060556,883997877,958139571,1322822218,1537002063,1747873779,1955562222,2024104815,2227730452,2361852424,2428436474,2756734187,3204031479,3329325298]),h=new Uint32Array([1779033703,3144134277,1013904242,2773480762,1359893119,2600822924,528734635,1541459225]),n=new Uint32Array(64);class o extends t.HashMD{constructor(){super(64,32,8,!1),this.A=0|h[0],this.B=0|h[1],this.C=0|h[2],this.D=0|h[3],this.E=0|h[4],this.F=0|h[5],this.G=0|h[6],this.H=0|h[7]}get(){const{A:t,B:s,C:i,D:h,E:n,F:o,G:u,H:c}=this;return[t,s,i,h,n,o,u,c]}set(t,s,i,h,n,o,u,c){this.A=0|t,this.B=0|s,this.C=0|i,this.D=0|h,this.E=0|n,this.F=0|o,this.G=0|u,this.H=0|c}process(h,o){for(let t=0;t<16;t++,o+=4)n[t]=h.getUint32(o,!1);for(let t=16;t<64;t++){const i=n[t-15],h=n[t-2],o=(0,s.rotr)(i,7)^(0,s.rotr)(i,18)^i>>>3,u=(0,s.rotr)(h,17)^(0,s.rotr)(h,19)^h>>>10;n[t]=u+n[t-7]+o+n[t-16]|0}let{A:u,B:c,C:l,D:f,E:p,F:A,G:C,H:b}=this;for(let h=0;h<64;h++){const o=b+((0,s.rotr)(p,6)^(0,s.rotr)(p,11)^(0,s.rotr)(p,25))+(0,t.Chi)(p,A,C)+i[h]+n[h]|0,y=((0,s.rotr)(u,2)^(0,s.rotr)(u,13)^(0,s.rotr)(u,22))+(0,t.Maj)(u,c,l)|0;b=C,C=A,A=p,p=f+o|0,f=l,l=c,c=u,u=o+y|0}u=u+this.A|0,c=c+this.B|0,l=l+this.C|0,f=f+this.D|0,p=p+this.E|0,A=A+this.F|0,C=C+this.G|0,b=b+this.H|0,this.set(u,c,l,f,p,A,C,b)}roundClean(){n.fill(0)}destroy(){this.set(0,0,0,0,0,0,0,0),this.buffer.fill(0)}}class u extends o{constructor(){super(),this.A=-1056596264,this.B=914150663,this.C=812702999,this.D=-150054599,this.E=-4191439,this.F=1750603025,this.G=1694076839,this.H=-1090891868,this.outputLen=28}}const c=(0,s.wrapConstructor)(()=>new o),l=(0,s.wrapConstructor)(()=>new u)},6173,[6174,6176]);
__d(function(g,r,_i,_a,m,e,d){"use strict";Object.defineProperty(e,'__esModule',{value:!0}),e.setBigUint64=i,Object.defineProperty(e,"Chi",{enumerable:!0,get:function(){return n}}),Object.defineProperty(e,"Maj",{enumerable:!0,get:function(){return o}}),Object.defineProperty(e,"HashMD",{enumerable:!0,get:function(){return h}});var t=r(d[0]),s=r(d[1]);function i(t,s,i,n){if('function'==typeof t.setBigUint64)return t.setBigUint64(s,i,n);const o=BigInt(32),h=BigInt(4294967295),u=Number(i>>o&h),f=Number(i&h),c=n?4:0,a=n?0:4;t.setUint32(s+c,u,n),t.setUint32(s+a,f,n)}const n=(t,s,i)=>t&s^~t&i,o=(t,s,i)=>t&s^t&i^s&i;class h extends s.Hash{constructor(t,i,n,o){super(),this.blockLen=t,this.outputLen=i,this.padOffset=n,this.isLE=o,this.finished=!1,this.length=0,this.pos=0,this.destroyed=!1,this.buffer=new Uint8Array(t),this.view=(0,s.createView)(this.buffer)}update(i){(0,t.aexists)(this);const{view:n,buffer:o,blockLen:h}=this,u=(i=(0,s.toBytes)(i)).length;for(let t=0;t<u;){const f=Math.min(h-this.pos,u-t);if(f===h){const n=(0,s.createView)(i);for(;h<=u-t;t+=h)this.process(n,t);continue}o.set(i.subarray(t,t+f),this.pos),this.pos+=f,t+=f,this.pos===h&&(this.process(n,0),this.pos=0)}return this.length+=i.length,this.roundClean(),this}digestInto(n){(0,t.aexists)(this),(0,t.aoutput)(n,this),this.finished=!0;const{buffer:o,view:h,blockLen:u,isLE:f}=this;let{pos:c}=this;o[c++]=128,this.buffer.subarray(c).fill(0),this.padOffset>u-c&&(this.process(h,0),c=0);for(let t=c;t<u;t++)o[t]=0;i(h,u-8,BigInt(8*this.length),f),this.process(h,0);const a=(0,s.createView)(n),l=this.outputLen;if(l%4)throw new Error('_sha2: outputLen should be aligned to 32bit');const p=l/4,b=this.get();if(p>b.length)throw new Error('_sha2: outputLen bigger than state');for(let t=0;t<p;t++)a.setUint32(4*t,b[t],f)}digest(){const{buffer:t,outputLen:s}=this;this.digestInto(t);const i=t.slice(0,s);return this.destroy(),i}_cloneInto(t){t||(t=new this.constructor),t.set(...this.get());const{blockLen:s,buffer:i,length:n,finished:o,destroyed:h,pos:u}=this;return t.length=n,t.pos=u,t.finished=o,t.destroyed=h,n%s&&t.buffer.set(i),t}}},6174,[6175,6176]);
__d(function(g,r,i,_a,m,e,d){"use strict";function t(t){if(!Number.isSafeInteger(t)||t<0)throw new Error('positive integer expected, got '+t)}function n(t,...n){if(!((o=t)instanceof Uint8Array||ArrayBuffer.isView(o)&&'Uint8Array'===o.constructor.name))throw new Error('Uint8Array expected');var o;if(n.length>0&&!n.includes(t.length))throw new Error('Uint8Array expected of length '+n+', got length='+t.length)}function o(n){if('function'!=typeof n||'function'!=typeof n.create)throw new Error('Hash should be wrapped by utils.wrapConstructor');t(n.outputLen),t(n.blockLen)}function u(t,n=!0){if(t.destroyed)throw new Error('Hash instance has been destroyed');if(n&&t.finished)throw new Error('Hash#digest() has already been called')}function f(t,o){n(t);const u=o.outputLen;if(t.length<u)throw new Error('digestInto() expects output buffer of length at least '+u)}Object.defineProperty(e,'__esModule',{value:!0}),Object.defineProperty(e,"anumber",{enumerable:!0,get:function(){return t}}),Object.defineProperty(e,"abytes",{enumerable:!0,get:function(){return n}}),Object.defineProperty(e,"ahash",{enumerable:!0,get:function(){return o}}),Object.defineProperty(e,"aexists",{enumerable:!0,get:function(){return u}}),Object.defineProperty(e,"aoutput",{enumerable:!0,get:function(){return f}})},6175,[]);
__d(function(g,r,_i,_a,m,e,d){"use strict";Object.defineProperty(e,'__esModule',{value:!0}),e.isBytes=
/*! noble-hashes - MIT License (c) 2022 Paul Miller (paulmillr.com) */
function(t){return t instanceof Uint8Array||ArrayBuffer.isView(t)&&'Uint8Array'===t.constructor.name},Object.defineProperty(e,"u8",{enumerable:!0,get:function(){return o}}),Object.defineProperty(e,"u32",{enumerable:!0,get:function(){return c}}),Object.defineProperty(e,"createView",{enumerable:!0,get:function(){return u}}),Object.defineProperty(e,"rotr",{enumerable:!0,get:function(){return i}}),Object.defineProperty(e,"rotl",{enumerable:!0,get:function(){return f}}),Object.defineProperty(e,"isLE",{enumerable:!0,get:function(){return a}}),Object.defineProperty(e,"byteSwap",{enumerable:!0,get:function(){return s}}),Object.defineProperty(e,"byteSwapIfBE",{enumerable:!0,get:function(){return y}}),e.byteSwap32=function(t){for(let n=0;n<t.length;n++)t[n]=s(t[n])},e.bytesToHex=function(t){(0,n.abytes)(t);let o='';for(let n=0;n<t.length;n++)o+=p[t[n]];return o},e.hexToBytes=function(t){if('string'!=typeof t)throw new Error('hex string expected, got '+typeof t);const n=t.length,o=n/2;if(n%2)throw new Error('hex string expected, got unpadded hex of length '+n);const c=new Uint8Array(o);for(let n=0,u=0;n<o;n++,u+=2){const o=l(t.charCodeAt(u)),i=l(t.charCodeAt(u+1));if(void 0===o||void 0===i){const n=t[u]+t[u+1];throw new Error('hex string expected, got non-hex character "'+n+'" at index '+u)}c[n]=16*o+i}return c},Object.defineProperty(e,"nextTick",{enumerable:!0,get:function(){return h}}),e.asyncLoop=async function(t,n,o){let c=Date.now();for(let u=0;u<t;u++){o(u);const t=Date.now()-c;t>=0&&t<n||(await h(),c+=t)}},e.utf8ToBytes=w,e.toBytes=O,e.concatBytes=function(...t){let o=0;for(let c=0;c<t.length;c++){const u=t[c];(0,n.abytes)(u),o+=u.length}const c=new Uint8Array(o);for(let n=0,o=0;n<t.length;n++){const u=t[n];c.set(u,o),o+=u.length}return c},Object.defineProperty(e,"Hash",{enumerable:!0,get:function(){return A}}),e.checkOpts=function(t,n){if(void 0!==n&&'[object Object]'!=={}.toString.call(n))throw new Error('Options should be object or undefined');return Object.assign(t,n)},e.wrapConstructor=function(t){const n=n=>t().update(O(n)).digest(),o=t();return n.outputLen=o.outputLen,n.blockLen=o.blockLen,n.create=()=>t(),n},e.wrapConstructorWithOpts=function(t){const n=(n,o)=>t(o).update(O(n)).digest(),o=t({});return n.outputLen=o.outputLen,n.blockLen=o.blockLen,n.create=n=>t(n),n},e.wrapXOFConstructorWithOpts=function(t){const n=(n,o)=>t(o).update(O(n)).digest(),o=t({});return n.outputLen=o.outputLen,n.blockLen=o.blockLen,n.create=n=>t(n),n},e.randomBytes=function(n=32){if(t.crypto&&'function'==typeof t.crypto.getRandomValues)return t.crypto.getRandomValues(new Uint8Array(n));if(t.crypto&&'function'==typeof t.crypto.randomBytes)return t.crypto.randomBytes(n);throw new Error('crypto.getRandomValues must be defined')};var t=r(d[0]),n=r(d[1]);const o=t=>new Uint8Array(t.buffer,t.byteOffset,t.byteLength),c=t=>new Uint32Array(t.buffer,t.byteOffset,Math.floor(t.byteLength/4)),u=t=>new DataView(t.buffer,t.byteOffset,t.byteLength),i=(t,n)=>t<<32-n|t>>>n,f=(t,n)=>t<<n|t>>>32-n>>>0,a=(()=>68===new Uint8Array(new Uint32Array([287454020]).buffer)[0])(),s=t=>t<<24&4278190080|t<<8&16711680|t>>>8&65280|t>>>24&255,y=a?t=>t:t=>s(t);const p=Array.from({length:256},(t,n)=>n.toString(16).padStart(2,'0'));const b={_0:48,_9:57,A:65,F:70,a:97,f:102};function l(t){return t>=b._0&&t<=b._9?t-b._0:t>=b.A&&t<=b.F?t-(b.A-10):t>=b.a&&t<=b.f?t-(b.a-10):void 0}const h=async()=>{};function w(t){if('string'!=typeof t)throw new Error('utf8ToBytes expected string, got '+typeof t);return new Uint8Array((new TextEncoder).encode(t))}function O(t){return'string'==typeof t&&(t=w(t)),(0,n.abytes)(t),t}class A{clone(){return this._cloneInto()}}},6176,[6177,6175]);
__d(function(g,r,i,a,m,e,d){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.crypto=void 0,e.crypto='object'==typeof globalThis&&'crypto'in globalThis?globalThis.crypto:void 0},6177,[]);
__d(function(g,r,i,a,_m,e,d){"use strict";var n=this&&this.__createBinding||(Object.create?function(n,t,s,c){void 0===c&&(c=s);var o=Object.getOwnPropertyDescriptor(t,s);o&&!("get"in o?!t.__esModule:o.writable||o.configurable)||(o={enumerable:!0,get:function(){return t[s]}}),Object.defineProperty(n,c,o)}:function(n,t,s,c){void 0===c&&(c=s),n[c]=t[s]}),t=this&&this.__exportStar||function(t,s){for(var c in t)"default"===c||Object.prototype.hasOwnProperty.call(s,c)||n(s,t,c)};Object.defineProperty(e,"__esModule",{value:!0}),e.setBaseUrl=void 0,e.relayTransaction=function(n,t){return(0,s.postEndpoint)(o,'/v1/chains/{chainId}/relay',{path:{chainId:n},body:t})},e.getRelayCount=function(n,t){return(0,s.getEndpoint)(o,'/v1/chains/{chainId}/relay/{address}',{path:{chainId:n,address:t}})},e.getSafeInfo=function(n,t){return(0,s.getEndpoint)(o,'/v1/chains/{chainId}/safes/{address}',{path:{chainId:n,address:t}})},e.getIncomingTransfers=function(n,t,c,u){return(0,s.getEndpoint)(o,'/v1/chains/{chainId}/safes/{address}/incoming-transfers/',{path:{chainId:n,address:t},query:c},u)},e.getModuleTransactions=function(n,t,c,u){return(0,s.getEndpoint)(o,'/v1/chains/{chainId}/safes/{address}/module-transactions/',{path:{chainId:n,address:t},query:c},u)},e.getMultisigTransactions=function(n,t,c,u){return(0,s.getEndpoint)(o,'/v1/chains/{chainId}/safes/{address}/multisig-transactions/',{path:{chainId:n,address:t},query:c},u)},e.getBalances=function(n,t,c="usd",u={}){return(0,s.getEndpoint)(o,'/v1/chains/{chainId}/safes/{address}/balances/{currency}',{path:{chainId:n,address:t,currency:c},query:u})},e.getFiatCurrencies=function(){return(0,s.getEndpoint)(o,'/v1/balances/supported-fiat-codes')},e.getOwnedSafes=function(n,t){return(0,s.getEndpoint)(o,'/v1/chains/{chainId}/owners/{address}/safes',{path:{chainId:n,address:t}})},e.getAllOwnedSafes=function(n){return(0,s.getEndpoint)(o,'/v1/owners/{address}/safes',{path:{address:n}})},e.getCollectibles=function(n,t,c={}){return(0,s.getEndpoint)(o,'/v1/chains/{chainId}/safes/{address}/collectibles',{path:{chainId:n,address:t},query:c})},e.getCollectiblesPage=function(n,t,c={},u){return(0,s.getEndpoint)(o,'/v2/chains/{chainId}/safes/{address}/collectibles',{path:{chainId:n,address:t},query:c},u)},e.getTransactionHistory=function(n,t,c={},u){return(0,s.getEndpoint)(o,'/v1/chains/{chainId}/safes/{safe_address}/transactions/history',{path:{chainId:n,safe_address:t},query:c},u)},e.getTransactionQueue=function(n,t,c={},u){return(0,s.getEndpoint)(o,'/v1/chains/{chainId}/safes/{safe_address}/transactions/queued',{path:{chainId:n,safe_address:t},query:c},u)},e.getTransactionDetails=function(n,t){return(0,s.getEndpoint)(o,'/v1/chains/{chainId}/transactions/{transactionId}',{path:{chainId:n,transactionId:t}})},e.deleteTransaction=function(n,t,c){return(0,s.deleteEndpoint)(o,'/v1/chains/{chainId}/transactions/{safeTxHash}',{path:{chainId:n,safeTxHash:t},body:{signature:c}})},e.postSafeGasEstimation=function(n,t,c){return(0,s.postEndpoint)(o,'/v2/chains/{chainId}/safes/{safe_address}/multisig-transactions/estimations',{path:{chainId:n,safe_address:t},body:c})},e.getNonces=function(n,t){return(0,s.getEndpoint)(o,'/v1/chains/{chainId}/safes/{safe_address}/nonces',{path:{chainId:n,safe_address:t}})},e.proposeTransaction=function(n,t,c){return(0,s.postEndpoint)(o,'/v1/chains/{chainId}/transactions/{safe_address}/propose',{path:{chainId:n,safe_address:t},body:c})},e.getConfirmationView=function(n,t,c,u,h,f){return(0,s.postEndpoint)(o,'/v1/chains/{chainId}/safes/{safe_address}/views/transaction-confirmation',{path:{chainId:n,safe_address:t},body:{operation:c,data:u,to:h,value:f}})},e.getTxPreview=function(n,t,c,u,h,f){return(0,s.postEndpoint)(o,'/v1/chains/{chainId}/transactions/{safe_address}/preview',{path:{chainId:n,safe_address:t},body:{operation:c,data:u,to:h,value:f}})},e.getChainsConfig=function(n){return(0,s.getEndpoint)(o,'/v1/chains',{query:n})},e.getChainConfig=function(n){return(0,s.getEndpoint)(o,'/v1/chains/{chainId}',{path:{chainId:n}})},e.getSafeApps=function(n,t={}){return(0,s.getEndpoint)(o,'/v1/chains/{chainId}/safe-apps',{path:{chainId:n},query:t})},e.getMasterCopies=function(n){return(0,s.getEndpoint)(o,'/v1/chains/{chainId}/about/master-copies',{path:{chainId:n}})},e.getDecodedData=function(n,t,c,u){return(0,s.postEndpoint)(o,'/v1/chains/{chainId}/data-decoder',{path:{chainId:n},body:{operation:t,data:c,to:u}})},e.getSafeMessages=function(n,t,c){return(0,s.getEndpoint)(o,'/v1/chains/{chainId}/safes/{safe_address}/messages',{path:{chainId:n,safe_address:t},query:{}},c)},e.getSafeMessage=function(n,t){return(0,s.getEndpoint)(o,'/v1/chains/{chainId}/messages/{message_hash}',{path:{chainId:n,message_hash:t}})},e.proposeSafeMessage=function(n,t,c){return(0,s.postEndpoint)(o,'/v1/chains/{chainId}/safes/{safe_address}/messages',{path:{chainId:n,safe_address:t},body:c})},e.confirmSafeMessage=function(n,t,c){return(0,s.postEndpoint)(o,'/v1/chains/{chainId}/messages/{message_hash}/signatures',{path:{chainId:n,message_hash:t},body:c})},e.getDelegates=function(n,t={}){return(0,s.getEndpoint)(o,'/v2/chains/{chainId}/delegates',{path:{chainId:n},query:t})},e.registerDevice=function(n){return(0,s.postEndpoint)(o,'/v1/register/notifications',{body:n})},e.unregisterSafe=function(n,t,c){return(0,s.deleteEndpoint)(o,'/v1/chains/{chainId}/notifications/devices/{uuid}/safes/{safe_address}',{path:{chainId:n,safe_address:t,uuid:c}})},e.unregisterDevice=function(n,t){return(0,s.deleteEndpoint)(o,'/v1/chains/{chainId}/notifications/devices/{uuid}',{path:{chainId:n,uuid:t}})},e.registerEmail=function(n,t,c,u){return(0,s.postEndpoint)(o,'/v1/chains/{chainId}/safes/{safe_address}/emails',{path:{chainId:n,safe_address:t},body:c,headers:u})},e.changeEmail=function(n,t,c,u,h){return(0,s.putEndpoint)(o,'/v1/chains/{chainId}/safes/{safe_address}/emails/{signer}',{path:{chainId:n,safe_address:t,signer:c},body:u,headers:h})},e.resendEmailVerificationCode=function(n,t,c){return(0,s.postEndpoint)(o,'/v1/chains/{chainId}/safes/{safe_address}/emails/{signer}/verify-resend',{path:{chainId:n,safe_address:t,signer:c},body:''})},e.verifyEmail=function(n,t,c,u){return(0,s.putEndpoint)(o,'/v1/chains/{chainId}/safes/{safe_address}/emails/{signer}/verify',{path:{chainId:n,safe_address:t,signer:c},body:u})},e.getRegisteredEmail=function(n,t,c,u){return(0,s.getEndpoint)(o,'/v1/chains/{chainId}/safes/{safe_address}/emails/{signer}',{path:{chainId:n,safe_address:t,signer:c},headers:u})},e.deleteRegisteredEmail=function(n,t,c,u){return(0,s.deleteEndpoint)(o,'/v1/chains/{chainId}/safes/{safe_address}/emails/{signer}',{path:{chainId:n,safe_address:t,signer:c},headers:u})},e.registerRecoveryModule=function(n,t,c){return(0,s.postEndpoint)(o,'/v1/chains/{chainId}/safes/{safe_address}/recovery',{path:{chainId:n,safe_address:t},body:c})},e.unsubscribeSingle=function(n){return(0,s.deleteEndpoint)(o,'/v1/subscriptions',{query:n})},e.unsubscribeAll=function(n){return(0,s.deleteEndpoint)(o,'/v1/subscriptions/all',{query:n})},e.getSafeOverviews=function(n,t){return(0,s.getEndpoint)(o,'/v1/safes',{query:Object.assign(Object.assign({},t),{safes:n.join(',')})})},e.getContract=function(n,t){return(0,s.getEndpoint)(o,'/v1/chains/{chainId}/contracts/{contractAddress}',{path:{chainId:n,contractAddress:t}})},e.getAuthNonce=function(){return(0,s.getEndpoint)(o,'/v1/auth/nonce',{credentials:'include'})},e.verifyAuth=function(n){return(0,s.postEndpoint)(o,'/v1/auth/verify',{body:n,credentials:'include'})},e.createAccount=function(n){return(0,s.postEndpoint)(o,'/v1/accounts',{body:n,credentials:'include'})},e.getAccount=function(n){return(0,s.getEndpoint)(o,'/v1/accounts/{address}',{path:{address:n},credentials:'include'})},e.deleteAccount=function(n){return(0,s.deleteEndpoint)(o,'/v1/accounts/{address}',{path:{address:n},credentials:'include'})},e.getAccountDataTypes=function(){return(0,s.getEndpoint)(o,'/v1/accounts/data-types')},e.getAccountDataSettings=function(n){return(0,s.getEndpoint)(o,'/v1/accounts/{address}/data-settings',{path:{address:n},credentials:'include'})},e.putAccountDataSettings=function(n,t){return(0,s.putEndpoint)(o,'/v1/accounts/{address}/data-settings',{path:{address:n},body:t,credentials:'include'})},e.getIndexingStatus=function(n){return(0,s.getEndpoint)(o,'/v1/chains/{chainId}/about/indexing',{path:{chainId:n}})};const s=r(d[0]),c=r(d[1]);t(r(d[2]),e),t(r(d[3]),e),t(r(d[4]),e),t(r(d[5]),e),t(r(d[6]),e),t(r(d[7]),e),t(r(d[8]),e),t(r(d[9]),e),t(r(d[10]),e),t(r(d[11]),e);let o=c.DEFAULT_BASE_URL;e.setBaseUrl=n=>{o=n}},6178,[6179,6181,6182,6183,6184,6185,6186,6187,6188,6189,6190,6191]);
__d(function(g,r,i,a,m,e,d){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.postEndpoint=function(l,o,u){const v=t(l,o,null==u?void 0:u.path,null==u?void 0:u.query);return(0,n.fetchData)(v,'POST',null==u?void 0:u.body,null==u?void 0:u.headers,null==u?void 0:u.credentials)},e.putEndpoint=function(l,o,u){const v=t(l,o,null==u?void 0:u.path,null==u?void 0:u.query);return(0,n.fetchData)(v,'PUT',null==u?void 0:u.body,null==u?void 0:u.headers,null==u?void 0:u.credentials)},e.deleteEndpoint=function(l,o,u){const v=t(l,o,null==u?void 0:u.path,null==u?void 0:u.query);return(0,n.fetchData)(v,'DELETE',null==u?void 0:u.body,null==u?void 0:u.headers,null==u?void 0:u.credentials)},e.getEndpoint=function(l,o,u,v){if(v)return(0,n.getData)(v,void 0,null==u?void 0:u.credentials);const c=t(l,o,null==u?void 0:u.path,null==u?void 0:u.query);return(0,n.getData)(c,null==u?void 0:u.headers,null==u?void 0:u.credentials)};const n=r(d[0]);function t(t,l,o,u){return`${t}${(0,n.insertParams)(l,o)}${(0,n.stringifyQuery)(u)}`}},6179,[6180]);
__d(function(g,r,i,a,m,_e,d){"use strict";var t=this&&this.__awaiter||function(t,n,e,o){return new(e||(e=Promise))(function(c,s){function u(t){try{l(o.next(t))}catch(t){s(t)}}function f(t){try{l(o.throw(t))}catch(t){s(t)}}function l(t){var n;t.done?c(t.value):(n=t.value,n instanceof e?n:new e(function(t){t(n)})).then(u,f)}l((o=o.apply(t,n||[])).next())})};Object.defineProperty(_e,"__esModule",{value:!0}),_e.insertParams=function(t,n){return n?Object.keys(n).reduce((t,o)=>e(t,o,String(n[o])),t):t},_e.stringifyQuery=function(t){if(!t)return'';const n=new URLSearchParams;Object.keys(t).forEach(e=>{null!=t[e]&&n.append(e,String(t[e]))});const e=n.toString();return e?`?${e}`:''},_e.fetchData=function(n,e,c,s,u){return t(this,void 0,void 0,function*(){const t=Object.assign({'Content-Type':'application/json'},s),f={method:null!=e?e:'POST',headers:t};u&&(f.credentials=u),null!=c&&(f.body='string'==typeof c?c:JSON.stringify(c));return o(yield fetch(n,f))})},_e.getData=function(n,e,c){return t(this,void 0,void 0,function*(){const t={method:'GET'};e&&(t.headers=Object.assign(Object.assign({},e),{'Content-Type':'application/json'})),c&&(t.credentials=c);return o(yield fetch(n,t))})};const n=t=>'object'==typeof t&&null!==t&&('code'in t||'statusCode'in t)&&'message'in t;function e(t,n,e){return t.replace(new RegExp(`\\{${n}\\}`,'g'),e)}function o(e){return t(this,void 0,void 0,function*(){var t;let o;try{o=yield e.json()}catch(t){o={}}if(!e.ok){const c=n(o)?`CGW error - ${null!==(t=o.code)&&void 0!==t?t:o.statusCode}: ${o.message}`:`CGW error - status ${e.statusText}`;throw new Error(c)}return o})}},6180,[]);
__d(function(g,r,i,a,m,e,d){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.DEFAULT_BASE_URL=void 0,e.DEFAULT_BASE_URL='https://safe-client.safe.global'},6181,[]);
__d(function(g,r,i,a,m,e,d){"use strict";var t;Object.defineProperty(e,"__esModule",{value:!0}),e.ImplementationVersionState=void 0,(function(t){t.UP_TO_DATE="UP_TO_DATE",t.OUTDATED="OUTDATED",t.UNKNOWN="UNKNOWN"})(t||(e.ImplementationVersionState=t={}))},6182,[]);
__d(function(g,r,i,a,m,e,d){"use strict";var T,A,o;Object.defineProperty(e,"__esModule",{value:!0}),e.SafeAppSocialPlatforms=e.SafeAppFeatures=e.SafeAppAccessPolicyTypes=void 0,(function(T){T.NoRestrictions="NO_RESTRICTIONS",T.DomainAllowlist="DOMAIN_ALLOWLIST"})(T||(e.SafeAppAccessPolicyTypes=T={})),(function(T){T.BATCHED_TRANSACTIONS="BATCHED_TRANSACTIONS"})(A||(e.SafeAppFeatures=A={})),(function(T){T.TWITTER="TWITTER",T.GITHUB="GITHUB",T.DISCORD="DISCORD",T.TELEGRAM="TELEGRAM"})(o||(e.SafeAppSocialPlatforms=o={}))},6183,[]);
__d(function(g,r,i,a,m,e,d){"use strict";var E,T,A,N,n,I,t,O,_,L,o,D;Object.defineProperty(e,"__esModule",{value:!0}),e.LabelValue=e.StartTimeValue=e.DurationType=e.DetailedExecutionInfoType=e.TransactionListItemType=e.ConflictType=e.TransactionInfoType=e.SettingsInfoType=e.TransactionTokenType=e.TransferDirection=e.TransactionStatus=e.Operation=void 0,(function(E){E[E.CALL=0]="CALL",E[E.DELEGATE=1]="DELEGATE"})(E||(e.Operation=E={})),(function(E){E.AWAITING_CONFIRMATIONS="AWAITING_CONFIRMATIONS",E.AWAITING_EXECUTION="AWAITING_EXECUTION",E.CANCELLED="CANCELLED",E.FAILED="FAILED",E.SUCCESS="SUCCESS"})(T||(e.TransactionStatus=T={})),(function(E){E.INCOMING="INCOMING",E.OUTGOING="OUTGOING",E.UNKNOWN="UNKNOWN"})(A||(e.TransferDirection=A={})),(function(E){E.ERC20="ERC20",E.ERC721="ERC721",E.NATIVE_COIN="NATIVE_COIN"})(N||(e.TransactionTokenType=N={})),(function(E){E.SET_FALLBACK_HANDLER="SET_FALLBACK_HANDLER",E.ADD_OWNER="ADD_OWNER",E.REMOVE_OWNER="REMOVE_OWNER",E.SWAP_OWNER="SWAP_OWNER",E.CHANGE_THRESHOLD="CHANGE_THRESHOLD",E.CHANGE_IMPLEMENTATION="CHANGE_IMPLEMENTATION",E.ENABLE_MODULE="ENABLE_MODULE",E.DISABLE_MODULE="DISABLE_MODULE",E.SET_GUARD="SET_GUARD",E.DELETE_GUARD="DELETE_GUARD"})(n||(e.SettingsInfoType=n={})),(function(E){E.TRANSFER="Transfer",E.SETTINGS_CHANGE="SettingsChange",E.CUSTOM="Custom",E.CREATION="Creation",E.SWAP_ORDER="SwapOrder",E.TWAP_ORDER="TwapOrder",E.SWAP_TRANSFER="SwapTransfer",E.NATIVE_STAKING_DEPOSIT="NativeStakingDeposit",E.NATIVE_STAKING_VALIDATORS_EXIT="NativeStakingValidatorsExit",E.NATIVE_STAKING_WITHDRAW="NativeStakingWithdraw"})(I||(e.TransactionInfoType=I={})),(function(E){E.NONE="None",E.HAS_NEXT="HasNext",E.END="End"})(t||(e.ConflictType=t={})),(function(E){E.TRANSACTION="TRANSACTION",E.LABEL="LABEL",E.CONFLICT_HEADER="CONFLICT_HEADER",E.DATE_LABEL="DATE_LABEL"})(O||(e.TransactionListItemType=O={})),(function(E){E.MULTISIG="MULTISIG",E.MODULE="MODULE"})(_||(e.DetailedExecutionInfoType=_={})),(function(E){E.AUTO="AUTO",E.LIMIT_DURATION="LIMIT_DURATION"})(L||(e.DurationType=L={})),(function(E){E.AT_MINING_TIME="AT_MINING_TIME",E.AT_EPOCH="AT_EPOCH"})(o||(e.StartTimeValue=o={})),(function(E){E.Queued="Queued",E.Next="Next"})(D||(e.LabelValue=D={}))},6184,[]);
__d(function(g,r,i,a,m,e,d){"use strict";var I,N,A;Object.defineProperty(e,"__esModule",{value:!0}),e.FEATURES=e.GAS_PRICE_TYPE=e.RPC_AUTHENTICATION=void 0,(function(I){I.API_KEY_PATH="API_KEY_PATH",I.NO_AUTHENTICATION="NO_AUTHENTICATION",I.UNKNOWN="UNKNOWN"})(I||(e.RPC_AUTHENTICATION=I={})),(function(I){I.ORACLE="ORACLE",I.FIXED="FIXED",I.FIXED_1559="FIXED1559",I.UNKNOWN="UNKNOWN"})(N||(e.GAS_PRICE_TYPE=N={})),(function(I){I.ERC721="ERC721",I.SAFE_APPS="SAFE_APPS",I.CONTRACT_INTERACTION="CONTRACT_INTERACTION",I.DOMAIN_LOOKUP="DOMAIN_LOOKUP",I.SPENDING_LIMIT="SPENDING_LIMIT",I.EIP1559="EIP1559",I.SAFE_TX_GAS_OPTIONAL="SAFE_TX_GAS_OPTIONAL",I.TX_SIMULATION="TX_SIMULATION",I.EIP1271="EIP1271"})(A||(e.FEATURES=A={}))},6185,[]);
__d(function(g,r,i,a,m,e,d){"use strict";var N;Object.defineProperty(e,"__esModule",{value:!0}),e.TokenType=void 0,(function(N){N.ERC20="ERC20",N.ERC721="ERC721",N.NATIVE_TOKEN="NATIVE_TOKEN",N.UNKNOWN="UNKNOWN"})(N||(e.TokenType=N={}))},6186,[]);
__d(function(g,r,i,a,m,e,d){"use strict";Object.defineProperty(e,"__esModule",{value:!0})},6187,[]);
__d(function(g,r,i,a,m,e,d){"use strict";var I,T;Object.defineProperty(e,"__esModule",{value:!0}),e.NativeStakingStatus=e.ConfirmationViewTypes=void 0,(function(I){I.GENERIC="GENERIC",I.COW_SWAP_ORDER="COW_SWAP_ORDER",I.COW_SWAP_TWAP_ORDER="COW_SWAP_TWAP_ORDER",I.KILN_NATIVE_STAKING_DEPOSIT="KILN_NATIVE_STAKING_DEPOSIT",I.KILN_NATIVE_STAKING_VALIDATORS_EXIT="KILN_NATIVE_STAKING_VALIDATORS_EXIT",I.KILN_NATIVE_STAKING_WITHDRAW="KILN_NATIVE_STAKING_WITHDRAW"})(I||(e.ConfirmationViewTypes=I={})),(function(I){I.NOT_STAKED="NOT_STAKED",I.ACTIVATING="ACTIVATING",I.DEPOSIT_IN_PROGRESS="DEPOSIT_IN_PROGRESS",I.ACTIVE="ACTIVE",I.EXIT_REQUESTED="EXIT_REQUESTED",I.EXITING="EXITING",I.EXITED="EXITED",I.SLASHED="SLASHED"})(T||(e.NativeStakingStatus=T={}))},6188,[]);
__d(function(g,r,i,a,m,e,d){"use strict";var s,t;Object.defineProperty(e,"__esModule",{value:!0}),e.SafeMessageStatus=e.SafeMessageListItemType=void 0,(function(s){s.DATE_LABEL="DATE_LABEL",s.MESSAGE="MESSAGE"})(s||(e.SafeMessageListItemType=s={})),(function(s){s.NEEDS_CONFIRMATION="NEEDS_CONFIRMATION",s.CONFIRMED="CONFIRMED"})(t||(e.SafeMessageStatus=t={}))},6189,[]);
__d(function(g,r,i,a,m,e,d){"use strict";var c;Object.defineProperty(e,"__esModule",{value:!0}),e.DeviceType=void 0,(function(c){c.ANDROID="ANDROID",c.IOS="IOS",c.WEB="WEB"})(c||(e.DeviceType=c={}))},6190,[]);
__d(function(g,r,i,a,m,e,d){"use strict";Object.defineProperty(e,"__esModule",{value:!0})},6191,[]);
__d(function(g,r,i,a,m,e,d){"use strict";Object.defineProperty(e,'__esModule',{value:!0}),Object.defineProperty(e,"DateUtil",{enumerable:!0,get:function(){return t.DateUtil}}),Object.defineProperty(e,"NetworkUtil",{enumerable:!0,get:function(){return n.NetworkUtil}}),Object.defineProperty(e,"AVAILABLE_NAMESPACES",{enumerable:!0,get:function(){return n.AVAILABLE_NAMESPACES}}),Object.defineProperty(e,"NumberUtil",{enumerable:!0,get:function(){return o.NumberUtil}}),Object.defineProperty(e,"InputUtil",{enumerable:!0,get:function(){return u.InputUtil}}),Object.defineProperty(e,"ContractUtil",{enumerable:!0,get:function(){return c.ContractUtil}}),Object.defineProperty(e,"erc20ABI",{enumerable:!0,get:function(){return f.erc20ABI}}),Object.defineProperty(e,"NavigationUtil",{enumerable:!0,get:function(){return l.NavigationUtil}}),Object.defineProperty(e,"ConstantsUtil",{enumerable:!0,get:function(){return b.ConstantsUtil}}),Object.defineProperty(e,"Emitter",{enumerable:!0,get:function(){return y.Emitter}}),Object.defineProperty(e,"ParseUtil",{enumerable:!0,get:function(){return P.ParseUtil}}),Object.defineProperty(e,"ErrorUtil",{enumerable:!0,get:function(){return j.ErrorUtil}}),Object.defineProperty(e,"UserRejectedRequestError",{enumerable:!0,get:function(){return j.UserRejectedRequestError}}),Object.defineProperty(e,"SafeLocalStorage",{enumerable:!0,get:function(){return p.SafeLocalStorage}}),Object.defineProperty(e,"SafeLocalStorageKeys",{enumerable:!0,get:function(){return p.SafeLocalStorageKeys}}),Object.defineProperty(e,"isSafe",{enumerable:!0,get:function(){return p.isSafe}}),Object.defineProperty(e,"getSafeConnectorIdKey",{enumerable:!0,get:function(){return p.getSafeConnectorIdKey}}),Object.defineProperty(e,"getW3mThemeVariables",{enumerable:!0,get:function(){return s.getW3mThemeVariables}}),Object.defineProperty(e,"isReownName",{enumerable:!0,get:function(){return O.isReownName}});var t=r(d[0]),n=r(d[1]),o=r(d[2]),u=r(d[3]),c=r(d[4]),f=r(d[5]),l=r(d[6]),b=r(d[7]),y=r(d[8]),P=r(d[9]),j=r(d[10]),p=r(d[11]),s=r(d[12]),O=r(d[13])},6192,[6193,6198,6200,6201,6202,6203,6206,6199,6207,6208,6209,6210,6211,6212]);
__d(function(g,r,i,a,m,_e,d){"use strict";function e(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(_e,'__esModule',{value:!0}),Object.defineProperty(_e,"DateUtil",{enumerable:!0,get:function(){return c}});var t=e(r(d[0])),n=e(r(d[1])),u=e(r(d[2])),o=e(r(d[3]));t.default.extend(u.default),t.default.extend(o.default);const l=Object.assign({},n.default,{name:'en-web3-modal',relativeTime:{future:'in %s',past:'%s ago',s:'%d sec',m:'1 min',mm:'%d min',h:'1 hr',hh:'%d hrs',d:'1 d',dd:'%d d',M:'1 mo',MM:'%d mo',y:'1 yr',yy:'%d yr'}}),f=['January','February','March','April','May','June','July','August','September','October','November','December'];t.default.locale('en-web3-modal',l);const c={getMonthNameByIndex:e=>f[e],getYear:(e=(new Date).toISOString())=>(0,t.default)(e).year(),getRelativeDateFromNow:e=>(0,t.default)(e).locale('en-web3-modal').fromNow(!0),formatDate:(e,n="DD MMM")=>(0,t.default)(e).format(n)}},6193,[6194,6195,6196,6197]);
__d(function(_g,_r,_i,_a,_m,_e,_d){var t,e;t=this,e=function(){"use strict";var t=6e4,e=36e5,n="millisecond",r="second",i="minute",s="hour",u="day",a="week",o="month",c="quarter",f="year",h="date",d="Invalid Date",$=/^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/,l=/\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g,y={name:"en",weekdays:"Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),months:"January_February_March_April_May_June_July_August_September_October_November_December".split("_"),ordinal:function(t){var e=["th","st","nd","rd"],n=t%100;return"["+t+(e[(n-20)%10]||e[n]||e[0])+"]"}},M=function(t,e,n){var r=String(t);return!r||r.length>=e?t:""+Array(e+1-r.length).join(n)+t},v={s:M,z:function(t){var e=-t.utcOffset(),n=Math.abs(e),r=Math.floor(n/60),i=n%60;return(e<=0?"+":"-")+M(r,2,"0")+":"+M(i,2,"0")},m:function t(e,n){if(e.date()<n.date())return-t(n,e);var r=12*(n.year()-e.year())+(n.month()-e.month()),i=e.clone().add(r,o),s=n-i<0,u=e.clone().add(r+(s?-1:1),o);return+(-(r+(n-i)/(s?i-u:u-i))||0)},a:function(t){return t<0?Math.ceil(t)||0:Math.floor(t)},p:function(t){return{M:o,y:f,w:a,d:u,D:h,h:s,m:i,s:r,ms:n,Q:c}[t]||String(t||"").toLowerCase().replace(/s$/,"")},u:function(t){return void 0===t}},m="en",g={};g[m]=y;var D="$isDayjsObject",S=function(t){return t instanceof b||!(!t||!t[D])},p=function t(e,n,r){var i;if(!e)return m;if("string"==typeof e){var s=e.toLowerCase();g[s]&&(i=s),n&&(g[s]=n,i=s);var u=e.split("-");if(!i&&u.length>1)return t(u[0])}else{var a=e.name;g[a]=e,i=a}return!r&&i&&(m=i),i||!r&&m},w=function(t,e){if(S(t))return t.clone();var n="object"==typeof e?e:{};return n.date=t,n.args=arguments,new b(n)},O=v;O.l=p,O.i=S,O.w=function(t,e){return w(t,{locale:e.$L,utc:e.$u,x:e.$x,$offset:e.$offset})};var b=(function(){function y(t){this.$L=p(t.locale,null,!0),this.parse(t),this.$x=this.$x||t.x||{},this[D]=!0}var M=y.prototype;return M.parse=function(t){this.$d=(function(t){var e=t.date,n=t.utc;if(null===e)return new Date(NaN);if(O.u(e))return new Date;if(e instanceof Date)return new Date(e);if("string"==typeof e&&!/Z$/i.test(e)){var r=e.match($);if(r){var i=r[2]-1||0,s=(r[7]||"0").substring(0,3);return n?new Date(Date.UTC(r[1],i,r[3]||1,r[4]||0,r[5]||0,r[6]||0,s)):new Date(r[1],i,r[3]||1,r[4]||0,r[5]||0,r[6]||0,s)}}return new Date(e)})(t),this.init()},M.init=function(){var t=this.$d;this.$y=t.getFullYear(),this.$M=t.getMonth(),this.$D=t.getDate(),this.$W=t.getDay(),this.$H=t.getHours(),this.$m=t.getMinutes(),this.$s=t.getSeconds(),this.$ms=t.getMilliseconds()},M.$utils=function(){return O},M.isValid=function(){return!(this.$d.toString()===d)},M.isSame=function(t,e){var n=w(t);return this.startOf(e)<=n&&n<=this.endOf(e)},M.isAfter=function(t,e){return w(t)<this.startOf(e)},M.isBefore=function(t,e){return this.endOf(e)<w(t)},M.$g=function(t,e,n){return O.u(t)?this[e]:this.set(n,t)},M.unix=function(){return Math.floor(this.valueOf()/1e3)},M.valueOf=function(){return this.$d.getTime()},M.startOf=function(t,e){var n=this,c=!!O.u(e)||e,d=O.p(t),$=function(t,e){var r=O.w(n.$u?Date.UTC(n.$y,e,t):new Date(n.$y,e,t),n);return c?r:r.endOf(u)},l=function(t,e){return O.w(n.toDate()[t].apply(n.toDate("s"),(c?[0,0,0,0]:[23,59,59,999]).slice(e)),n)},y=this.$W,M=this.$M,v=this.$D,m="set"+(this.$u?"UTC":"");switch(d){case f:return c?$(1,0):$(31,11);case o:return c?$(1,M):$(0,M+1);case a:var g=this.$locale().weekStart||0,D=(y<g?y+7:y)-g;return $(c?v-D:v+(6-D),M);case u:case h:return l(m+"Hours",0);case s:return l(m+"Minutes",1);case i:return l(m+"Seconds",2);case r:return l(m+"Milliseconds",3);default:return this.clone()}},M.endOf=function(t){return this.startOf(t,!1)},M.$set=function(t,e){var a,c=O.p(t),d="set"+(this.$u?"UTC":""),$=(a={},a[u]=d+"Date",a[h]=d+"Date",a[o]=d+"Month",a[f]=d+"FullYear",a[s]=d+"Hours",a[i]=d+"Minutes",a[r]=d+"Seconds",a[n]=d+"Milliseconds",a)[c],l=c===u?this.$D+(e-this.$W):e;if(c===o||c===f){var y=this.clone().set(h,1);y.$d[$](l),y.init(),this.$d=y.set(h,Math.min(this.$D,y.daysInMonth())).$d}else $&&this.$d[$](l);return this.init(),this},M.set=function(t,e){return this.clone().$set(t,e)},M.get=function(t){return this[O.p(t)]()},M.add=function(n,c){var h,d=this;n=Number(n);var $=O.p(c),l=function(t){var e=w(d);return O.w(e.date(e.date()+Math.round(t*n)),d)};if($===o)return this.set(o,this.$M+n);if($===f)return this.set(f,this.$y+n);if($===u)return l(1);if($===a)return l(7);var y=(h={},h[i]=t,h[s]=e,h[r]=1e3,h)[$]||1,M=this.$d.getTime()+n*y;return O.w(M,this)},M.subtract=function(t,e){return this.add(-1*t,e)},M.format=function(t){var e=this,n=this.$locale();if(!this.isValid())return n.invalidDate||d;var r=t||"YYYY-MM-DDTHH:mm:ssZ",i=O.z(this),s=this.$H,u=this.$m,a=this.$M,o=n.weekdays,c=n.months,f=n.meridiem,h=function(t,n,i,s){return t&&(t[n]||t(e,r))||i[n].slice(0,s)},$=function(t){return O.s(s%12||12,t,"0")},y=f||function(t,e,n){var r=t<12?"AM":"PM";return n?r.toLowerCase():r};return r.replace(l,function(t,r){return r||(function(t){switch(t){case"YY":return String(e.$y).slice(-2);case"YYYY":return O.s(e.$y,4,"0");case"M":return a+1;case"MM":return O.s(a+1,2,"0");case"MMM":return h(n.monthsShort,a,c,3);case"MMMM":return h(c,a);case"D":return e.$D;case"DD":return O.s(e.$D,2,"0");case"d":return String(e.$W);case"dd":return h(n.weekdaysMin,e.$W,o,2);case"ddd":return h(n.weekdaysShort,e.$W,o,3);case"dddd":return o[e.$W];case"H":return String(s);case"HH":return O.s(s,2,"0");case"h":return $(1);case"hh":return $(2);case"a":return y(s,u,!0);case"A":return y(s,u,!1);case"m":return String(u);case"mm":return O.s(u,2,"0");case"s":return String(e.$s);case"ss":return O.s(e.$s,2,"0");case"SSS":return O.s(e.$ms,3,"0");case"Z":return i}return null})(t)||i.replace(":","")})},M.utcOffset=function(){return 15*-Math.round(this.$d.getTimezoneOffset()/15)},M.diff=function(n,h,d){var $,l=this,y=O.p(h),M=w(n),v=(M.utcOffset()-this.utcOffset())*t,m=this-M,g=function(){return O.m(l,M)};switch(y){case f:$=g()/12;break;case o:$=g();break;case c:$=g()/3;break;case a:$=(m-v)/6048e5;break;case u:$=(m-v)/864e5;break;case s:$=m/e;break;case i:$=m/t;break;case r:$=m/1e3;break;default:$=m}return d?$:O.a($)},M.daysInMonth=function(){return this.endOf(o).$D},M.$locale=function(){return g[this.$L]},M.locale=function(t,e){if(!t)return this.$L;var n=this.clone(),r=p(t,e,!0);return r&&(n.$L=r),n},M.clone=function(){return O.w(this.$d,this)},M.toDate=function(){return new Date(this.valueOf())},M.toJSON=function(){return this.isValid()?this.toISOString():null},M.toISOString=function(){return this.$d.toISOString()},M.toString=function(){return this.$d.toUTCString()},y})(),_=b.prototype;return w.prototype=_,[["$ms",n],["$s",r],["$m",i],["$H",s],["$W",u],["$M",o],["$y",f],["$D",h]].forEach(function(t){_[t[1]]=function(e){return this.$g(e,t[0],t[1])}}),w.extend=function(t,e){return t.$i||(t(e,b,w),t.$i=!0),w},w.locale=p,w.isDayjs=S,w.unix=function(t){return w(1e3*t)},w.en=g[m],w.Ls=g,w.p={},w},"object"==typeof _e&&void 0!==_m?_m.exports=e():"function"==typeof define&&define.amd?define(e):(t="undefined"!=typeof globalThis?globalThis:t||self).dayjs=e()},6194,[]);
__d(function(g,r,i,a,m,_e,d){var e,n;e=this,n=function(){"use strict";return{name:"en",weekdays:"Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),months:"January_February_March_April_May_June_July_August_September_October_November_December".split("_"),ordinal:function(e){var n=["th","st","nd","rd"],t=e%100;return"["+e+(n[(t-20)%10]||n[t]||n[0])+"]"}}},"object"==typeof _e&&void 0!==m?m.exports=n():"function"==typeof define&&define.amd?define(n):(e="undefined"!=typeof globalThis?globalThis:e||self).dayjs_locale_en=n()},6195,[]);
__d(function(g,_r,_i,_a,_m,_e,_d){var r,t;r=this,t=function(){"use strict";return function(r,t,e){r=r||{};var n=t.prototype,o={future:"in %s",past:"%s ago",s:"a few seconds",m:"a minute",mm:"%d minutes",h:"an hour",hh:"%d hours",d:"a day",dd:"%d days",M:"a month",MM:"%d months",y:"a year",yy:"%d years"};function i(r,t,e,o){return n.fromToBase(r,t,e,o)}e.en.relativeTime=o,n.fromToBase=function(t,n,i,d,a){for(var u,f,s,l=i.$locale().relativeTime||o,h=r.thresholds||[{l:"s",r:44,d:"second"},{l:"m",r:89},{l:"mm",r:44,d:"minute"},{l:"h",r:89},{l:"hh",r:21,d:"hour"},{l:"d",r:35},{l:"dd",r:25,d:"day"},{l:"M",r:45},{l:"MM",r:10,d:"month"},{l:"y",r:17},{l:"yy",d:"year"}],m=h.length,c=0;c<m;c+=1){var y=h[c];y.d&&(u=d?e(t).diff(i,y.d,!0):i.diff(t,y.d,!0));var p=(r.rounding||Math.round)(Math.abs(u));if(s=u>0,p<=y.r||!y.r){p<=1&&c>0&&(y=h[c-1]);var v=l[y.l];a&&(p=a(""+p)),f="string"==typeof v?v.replace("%d",p):v(p,n,y.l,s);break}}if(n)return f;var M=s?l.future:l.past;return"function"==typeof M?M(f):M.replace("%s",f)},n.to=function(r,t){return i(r,t,this,!0)},n.from=function(r,t){return i(r,t,this)};var d=function(r){return r.$u?e.utc():e()};n.toNow=function(r){return this.to(d(this),r)},n.fromNow=function(r){return this.from(d(this),r)}}},"object"==typeof _e&&void 0!==_m?_m.exports=t():"function"==typeof define&&define.amd?define(t):(r="undefined"!=typeof globalThis?globalThis:r||self).dayjs_plugin_relativeTime=t()},6196,[]);
__d(function(g,r,i,a,m,_e,d){var e,n;e=this,n=function(){"use strict";return function(e,n,t){t.updateLocale=function(e,n){var o=t.Ls[e];if(o)return(n?Object.keys(n):[]).forEach(function(e){o[e]=n[e]}),o}}},"object"==typeof _e&&void 0!==m?m.exports=n():"function"==typeof define&&define.amd?define(n):(e="undefined"!=typeof globalThis?globalThis:e||self).dayjs_plugin_updateLocale=n()},6197,[]);
__d(function(g,r,i,a,m,e,d){"use strict";Object.defineProperty(e,'__esModule',{value:!0}),Object.defineProperty(e,"NetworkUtil",{enumerable:!0,get:function(){return o}}),Object.defineProperty(e,"AVAILABLE_NAMESPACES",{enumerable:!0,get:function(){return n}});var t=r(d[0]);const o={caipNetworkIdToNumber:t=>t?Number(t.split(':')[1]):void 0,parseEvmChainId(t){return'string'==typeof t?this.caipNetworkIdToNumber(t):t},getNetworksByNamespace:(t,o)=>t?.filter(t=>t.chainNamespace===o)||[],getFirstNetworkByNamespace(t,o){return this.getNetworksByNamespace(t,o)[0]},getNetworkNameByCaipNetworkId(o,n){if(!n)return;const s=o.find(t=>t.caipNetworkId===n);if(s)return s.name;const[c]=n.split(':');return t.ConstantsUtil.CHAIN_NAME_MAP?.[c]||void 0}},n=['eip155','solana','polkadot','bip122','cosmos','sui','stacks']},6198,[6199]);
__d(function(g,r,i,a,m,e,d){"use strict";Object.defineProperty(e,'__esModule',{value:!0}),Object.defineProperty(e,"ConstantsUtil",{enumerable:!0,get:function(){return t}});const t={WC_NAME_SUFFIX:'.reown.id',WC_NAME_SUFFIX_LEGACY:'.wcn.id',BLOCKCHAIN_API_RPC_URL:'https://rpc.walletconnect.org',PULSE_API_URL:'https://pulse.walletconnect.org',W3M_API_URL:'https://api.web3modal.org',CONNECTOR_ID:{WALLET_CONNECT:'walletConnect',INJECTED:'injected',WALLET_STANDARD:'announced',COINBASE:'coinbaseWallet',COINBASE_SDK:'coinbaseWalletSDK',SAFE:'safe',LEDGER:'ledger',OKX:'okx',EIP6963:'eip6963',AUTH:'ID_AUTH'},CONNECTOR_NAMES:{AUTH:'Auth'},AUTH_CONNECTOR_SUPPORTED_CHAINS:['eip155','solana'],LIMITS:{PENDING_TRANSACTIONS:99},CHAIN:{EVM:'eip155',SOLANA:'solana',POLKADOT:'polkadot',BITCOIN:'bip122'},CHAIN_NAME_MAP:{eip155:'EVM Networks',solana:'Solana',polkadot:'Polkadot',bip122:'Bitcoin',cosmos:'Cosmos',sui:'Sui',stacks:'Stacks'},ADAPTER_TYPES:{BITCOIN:'bitcoin',SOLANA:'solana',WAGMI:'wagmi',ETHERS:'ethers',ETHERS5:'ethers5'},USDT_CONTRACT_ADDRESSES:['0xdac17f958d2ee523a2206206994597c13d831ec7','0xc2132d05d31c914a87c6611c10748aeb04b58e8f','0x9702230a8ea53601f5cd2dc00fdbc13d4df4a8c7','0x919C1c267BC06a7039e03fcc2eF738525769109c','0x48065fbBE25f71C9282ddf5e1cD6D6A887483D5e','0x55d398326f99059fF775485246999027B3197955','0xfd086bc7cd5c481dcc9c85ebe478a1c0b69fcbb9'],SOLANA_SPL_TOKEN_ADDRESSES:{SOL:'So11111111111111111111111111111111111111112'},HTTP_STATUS_CODES:{SERVER_ERROR:500,TOO_MANY_REQUESTS:429,SERVICE_UNAVAILABLE:503,FORBIDDEN:403},UNSUPPORTED_NETWORK_NAME:'Unknown Network',SECURE_SITE_SDK_ORIGIN:('undefined'!=typeof process&&void 0!==process.env?process.env.NEXT_PUBLIC_SECURE_SITE_ORIGIN:void 0)||'https://secure.walletconnect.org',REMOTE_FEATURES_ALERTS:{MULTI_WALLET_NOT_ENABLED:{DEFAULT:{displayMessage:'Multi-Wallet Not Enabled',debugMessage:'Multi-wallet support is not enabled. Please enable it in your AppKit configuration at cloud.reown.com.'},CONNECTIONS_HOOK:{displayMessage:'Multi-Wallet Not Enabled',debugMessage:'Multi-wallet support is not enabled. Please enable it in your AppKit configuration at cloud.reown.com to use the useAppKitConnections hook.'},CONNECTION_HOOK:{displayMessage:'Multi-Wallet Not Enabled',debugMessage:'Multi-wallet support is not enabled. Please enable it in your AppKit configuration at cloud.reown.com to use the useAppKitConnection hook.'}}},IS_DEVELOPMENT:'undefined'!=typeof process&&!1}},6199,[]);
__d(function(g,r,i,_a,m,_e,d){"use strict";Object.defineProperty(_e,'__esModule',{value:!0}),Object.defineProperty(_e,"NumberUtil",{enumerable:!0,get:function(){return n}});var e,t=r(d[0]),o=(e=t)&&e.__esModule?e:{default:e};const n={bigNumber:e=>e?new o.default(e):new o.default(0),multiply(e,t){if(void 0===e||void 0===t)return new o.default(0);const n=new o.default(e),u=new o.default(t);return n.times(u)},toFixed:(e,t=2)=>void 0===e||''===e?new o.default(0).toFixed(t):new o.default(e).toFixed(t),formatNumberToLocalString:(e,t=2)=>void 0===e||''===e?'0.00':'number'==typeof e?e.toLocaleString('en-US',{maximumFractionDigits:t,minimumFractionDigits:t,roundingMode:'floor'}):parseFloat(e).toLocaleString('en-US',{maximumFractionDigits:t,minimumFractionDigits:t,roundingMode:'floor'}),parseLocalStringToNumber(e){if(void 0===e||''===e)return 0;const t=e.replace(/,/gu,'');return new o.default(t).toNumber()}}},6200,[3717]);
__d(function(g,r,i,a,m,e,d){"use strict";Object.defineProperty(e,'__esModule',{value:!0}),Object.defineProperty(e,"InputUtil",{enumerable:!0,get:function(){return t}});const t={numericInputKeyDown(t,n,u){const c=t.metaKey||t.ctrlKey,l=t.key,o=l.toLocaleLowerCase(),f=','===l,p='.'===l,s=l>='0'&&l<='9';!c&&('a'===o||'c'===o||'v'===o||'x'===o)&&t.preventDefault(),'0'!==n||f||p||'0'!==l||t.preventDefault(),'0'===n&&s&&(u(l),t.preventDefault()),(f||p)&&(n||(u('0.'),t.preventDefault()),(n?.includes('.')||n?.includes(','))&&t.preventDefault()),s||['Backspace','Meta','Ctrl','a','A','c','C','x','X','v','V','ArrowLeft','ArrowRight','Tab'].includes(l)||p||f||t.preventDefault()}}},6201,[]);
__d(function(g,r,i,a,m,e,d){"use strict";Object.defineProperty(e,'__esModule',{value:!0}),Object.defineProperty(e,"ContractUtil",{enumerable:!0,get:function(){return u}});var t=r(d[0]),n=r(d[1]),c=r(d[2]),s=r(d[3]);const u={getERC20Abi:n=>s.ConstantsUtil.USDT_CONTRACT_ADDRESSES.includes(n)?c.usdtABI:t.erc20ABI,getSwapAbi:()=>n.swapABI}},6202,[6203,6204,6205,6199]);
__d(function(g,r,i,a,m,e,d){"use strict";Object.defineProperty(e,'__esModule',{value:!0}),Object.defineProperty(e,"erc20ABI",{enumerable:!0,get:function(){return t}});const t=[{type:'function',name:'transfer',stateMutability:'nonpayable',inputs:[{name:'_to',type:'address'},{name:'_value',type:'uint256'}],outputs:[{name:'',type:'bool'}]},{type:'function',name:'transferFrom',stateMutability:'nonpayable',inputs:[{name:'_from',type:'address'},{name:'_to',type:'address'},{name:'_value',type:'uint256'}],outputs:[{name:'',type:'bool'}]}]},6203,[]);
__d(function(g,r,i,a,m,e,d){"use strict";Object.defineProperty(e,'__esModule',{value:!0}),Object.defineProperty(e,"swapABI",{enumerable:!0,get:function(){return t}});const t=[{type:'function',name:'approve',stateMutability:'nonpayable',inputs:[{name:'spender',type:'address'},{name:'amount',type:'uint256'}],outputs:[{type:'bool'}]}]},6204,[]);
__d(function(g,r,i,a,m,e,d){"use strict";Object.defineProperty(e,'__esModule',{value:!0}),Object.defineProperty(e,"usdtABI",{enumerable:!0,get:function(){return t}});const t=[{type:'function',name:'transfer',stateMutability:'nonpayable',inputs:[{name:'recipient',type:'address'},{name:'amount',type:'uint256'}],outputs:[]},{type:'function',name:'transferFrom',stateMutability:'nonpayable',inputs:[{name:'sender',type:'address'},{name:'recipient',type:'address'},{name:'amount',type:'uint256'}],outputs:[{name:'',type:'bool'}]}]},6205,[]);
__d(function(g,r,i,a,m,e,d){"use strict";Object.defineProperty(e,'__esModule',{value:!0}),Object.defineProperty(e,"NavigationUtil",{enumerable:!0,get:function(){return t}});const t={URLS:{FAQ:'https://walletconnect.com/faq'}}},6206,[]);
__d(function(g,r,i,a,m,e,d){"use strict";Object.defineProperty(e,'__esModule',{value:!0}),Object.defineProperty(e,"Emitter",{enumerable:!0,get:function(){return t}});class t{on(n,s){t.eventListeners.has(n)||t.eventListeners.set(n,new Set),t.eventListeners.get(n)?.add(s)}off(n,s){const c=t.eventListeners.get(n);c&&c.delete(s)}emit(n,s){const c=t.eventListeners.get(n);c&&c.forEach(t=>t(s))}clear(n){t.eventListeners.delete(n)}clearAll(){t.eventListeners.clear()}}t.eventListeners=new Map},6207,[]);
__d(function(g,r,i,a,m,e,d){"use strict";Object.defineProperty(e,'__esModule',{value:!0}),Object.defineProperty(e,"ParseUtil",{enumerable:!0,get:function(){return n}});const n={validateCaipAddress(n){if(3!==n.split(':')?.length)throw new Error('Invalid CAIP Address');return n},parseCaipAddress(n){const t=n.split(':');if(3!==t.length)throw new Error(`Invalid CAIP-10 address: ${n}`);const[s,o,c]=t;if(!s||!o||!c)throw new Error(`Invalid CAIP-10 address: ${n}`);return{chainNamespace:s,chainId:o,address:c}},parseCaipNetworkId(n){const t=n.split(':');if(2!==t.length)throw new Error(`Invalid CAIP-2 network id: ${n}`);const[s,o]=t;if(!s||!o)throw new Error(`Invalid CAIP-2 network id: ${n}`);return{chainNamespace:s,chainId:o}}}},6208,[]);
__d(function(g,r,i,a,m,e,d){"use strict";Object.defineProperty(e,'__esModule',{value:!0}),Object.defineProperty(e,"ErrorUtil",{enumerable:!0,get:function(){return R}}),Object.defineProperty(e,"ProviderRpcError",{enumerable:!0,get:function(){return s}}),Object.defineProperty(e,"UserRejectedRequestError",{enumerable:!0,get:function(){return t}});const R={RPC_ERROR_CODE:{USER_REJECTED_REQUEST:4001},PROVIDER_RPC_ERROR_NAME:{PROVIDER_RPC:'ProviderRpcError',USER_REJECTED_REQUEST:'UserRejectedRequestError'},isRpcProviderError(R){try{if('object'==typeof R&&null!==R){const s=R,t='string'==typeof s.message,E='number'==typeof s.code;return t&&E}return!1}catch{return!1}},isUserRejectedMessage:R=>R.toLowerCase().includes('user rejected')||R.toLowerCase().includes('user cancelled')||R.toLowerCase().includes('user canceled'),isUserRejectedRequestError(s){if(R.isRpcProviderError(s)){return s.code===R.RPC_ERROR_CODE.USER_REJECTED_REQUEST||R.isUserRejectedMessage(s.message)}return s instanceof Error&&R.isUserRejectedMessage(s.message)}};class s extends Error{constructor(s,t){super(t.message,{cause:s}),this.name=R.PROVIDER_RPC_ERROR_NAME.PROVIDER_RPC,this.code=t.code}}class t extends s{constructor(s){super(s,{code:R.RPC_ERROR_CODE.USER_REJECTED_REQUEST,message:'User rejected the request'}),this.name=R.PROVIDER_RPC_ERROR_NAME.USER_REJECTED_REQUEST}}},6209,[]);
__d(function(g,r,i,a,m,e,d){"use strict";Object.defineProperty(e,'__esModule',{value:!0}),Object.defineProperty(e,"SafeLocalStorageKeys",{enumerable:!0,get:function(){return t}}),e.getSafeConnectorIdKey=function(t){if(!t)throw new Error('Namespace is required for CONNECTED_CONNECTOR_ID');return`@appkit/${t}:connected_connector_id`},Object.defineProperty(e,"SafeLocalStorage",{enumerable:!0,get:function(){return _}}),e.isSafe=n;const t={WALLET_ID:'@appkit/wallet_id',WALLET_NAME:'@appkit/wallet_name',SOLANA_WALLET:'@appkit/solana_wallet',SOLANA_CAIP_CHAIN:'@appkit/solana_caip_chain',ACTIVE_CAIP_NETWORK_ID:'@appkit/active_caip_network_id',CONNECTED_SOCIAL:'@appkit/connected_social',CONNECTED_SOCIAL_USERNAME:'@appkit-wallet/SOCIAL_USERNAME',RECENT_WALLETS:'@appkit/recent_wallets',RECENT_WALLET:'@appkit/recent_wallet',DEEPLINK_CHOICE:'WALLETCONNECT_DEEPLINK_CHOICE',ACTIVE_NAMESPACE:'@appkit/active_namespace',CONNECTED_NAMESPACES:'@appkit/connected_namespaces',CONNECTION_STATUS:'@appkit/connection_status',SIWX_AUTH_TOKEN:'@appkit/siwx-auth-token',SIWX_NONCE_TOKEN:'@appkit/siwx-nonce-token',TELEGRAM_SOCIAL_PROVIDER:'@appkit/social_provider',NATIVE_BALANCE_CACHE:'@appkit/native_balance_cache',PORTFOLIO_CACHE:'@appkit/portfolio_cache',ENS_CACHE:'@appkit/ens_cache',IDENTITY_CACHE:'@appkit/identity_cache',PREFERRED_ACCOUNT_TYPES:'@appkit/preferred_account_types',CONNECTIONS:'@appkit/connections',DISCONNECTED_CONNECTOR_IDS:'@appkit/disconnected_connector_ids',HISTORY_TRANSACTIONS_CACHE:'@appkit/history_transactions_cache',TOKEN_PRICE_CACHE:'@appkit/token_price_cache',RECENT_EMAILS:'@appkit/recent_emails',LATEST_APPKIT_VERSION:'@appkit/latest_version'};const _={setItem(t,_){n()&&void 0!==_&&localStorage.setItem(t,_)},getItem(t){if(n())return localStorage.getItem(t)||void 0},removeItem(t){n()&&localStorage.removeItem(t)},clear(){n()&&localStorage.clear()}};function n(){return'undefined'!=typeof window&&'undefined'!=typeof localStorage}},6210,[]);
__d(function(g,r,i,a,m,e,d){"use strict";Object.defineProperty(e,'__esModule',{value:!0}),e.getW3mThemeVariables=function(c,t){if('light'===t)return{'--w3m-accent':c?.['--w3m-accent']||'hsla(231, 100%, 70%, 1)','--w3m-background':'#fff'};return{'--w3m-accent':c?.['--w3m-accent']||'hsla(230, 100%, 67%, 1)','--w3m-background':'#202020'}}},6211,[]);
__d(function(g,r,i,a,m,e,d){"use strict";Object.defineProperty(e,'__esModule',{value:!0}),e.isReownName=function(n){return n?.endsWith(t.ConstantsUtil.WC_NAME_SUFFIX_LEGACY)||n?.endsWith(t.ConstantsUtil.WC_NAME_SUFFIX)};var t=r(d[0])},6212,[6199]);
__d(function(g,r,i,a,m,e,d){"use strict";Object.defineProperty(e,'__esModule',{value:!0}),Object.defineProperty(e,"ModalController",{enumerable:!0,get:function(){return N}});var t=r(d[0]),o=r(d[1]);r(d[2]);var n=r(d[3]),l=r(d[4]),s=r(d[5]),c=r(d[6]),C=r(d[7]),p=r(d[8]),u=r(d[9]),h=r(d[10]),b=r(d[11]),w=r(d[12]),k=r(d[13]);const v=(0,t.proxy)({loading:!1,loadingNamespaceMap:new Map,open:!1,shake:!1,namespace:void 0}),A={state:v,subscribe:o=>(0,t.subscribe)(v,()=>o(v)),subscribeKey:(t,n)=>(0,o.subscribeKey)(v,t,n),async open(t){const o=t?.namespace,s=C.ChainController.state.activeChain,A=o&&o!==s,f=C.ChainController.getAccountData(t?.namespace)?.caipAddress,R=C.ChainController.state.noAdapters;if(p.ConnectionController.state.wcBasic?c.ApiController.prefetch({fetchNetworkImages:!1,fetchConnectorImages:!1,fetchWalletRanks:!1}):await c.ApiController.prefetch(),u.ConnectorController.setFilterByNamespace(t?.namespace),N.setLoading(!0,o),o&&A){const t=C.ChainController.getNetworkData(o)?.caipNetwork||C.ChainController.getRequestedCaipNetworks(o)[0];t&&(R?(await C.ChainController.switchActiveNetwork(t),k.RouterController.push('ConnectingWalletConnectBasic')):l.NetworkUtil.onSwitchNetwork({network:t,ignoreSwitchConfirmation:!0}))}else b.OptionsController.state.manualWCControl||R&&!f?n.CoreHelperUtil.isMobile()?k.RouterController.reset('AllWallets'):k.RouterController.reset('ConnectingWalletConnectBasic'):t?.view?k.RouterController.reset(t.view,t.data):f?k.RouterController.reset('Account'):k.RouterController.reset('Connect');v.open=!0,w.PublicStateController.set({open:!0}),h.EventsController.sendEvent({type:'track',event:'MODAL_OPEN',properties:{connected:Boolean(f)}})},close(){const t=b.OptionsController.state.enableEmbedded,o=Boolean(C.ChainController.state.activeCaipAddress);v.open&&h.EventsController.sendEvent({type:'track',event:'MODAL_CLOSE',properties:{connected:o}}),v.open=!1,k.RouterController.reset('Connect'),N.clearLoading(),t?o?k.RouterController.replace('Account'):k.RouterController.push('Connect'):w.PublicStateController.set({open:!1}),p.ConnectionController.resetUri()},setLoading(t,o){o&&v.loadingNamespaceMap.set(o,t),v.loading=t,w.PublicStateController.set({loading:t})},clearLoading(){v.loadingNamespaceMap.clear(),v.loading=!1,w.PublicStateController.set({loading:!1})},shake(){v.shake||(v.shake=!0,setTimeout(()=>{v.shake=!1},500))}},N=(0,s.withErrorBoundary)(A)},6213,[4209,4217,6192,6214,6217,6232,6234,6218,6225,6230,6237,6222,6244,6238]);
__d(function(g,_r,i,_a,m,_e,d){"use strict";Object.defineProperty(_e,'__esModule',{value:!0}),Object.defineProperty(_e,"CoreHelperUtil",{enumerable:!0,get:function(){return r}});var e=_r(d[0]),t=_r(d[1]),n=_r(d[2]);const r={isMobile(){return!!this.isClient()&&Boolean(window?.matchMedia&&'function'==typeof window.matchMedia&&window.matchMedia('(pointer:coarse)')?.matches||/Android|webOS|iPhone|iPad|iPod|BlackBerry|Opera Mini/u.test(navigator.userAgent))},checkCaipNetwork:(e,t="")=>e?.caipNetworkId.toLocaleLowerCase().includes(t.toLowerCase()),isAndroid(){if(!this.isMobile())return!1;const e=window?.navigator.userAgent.toLowerCase();return r.isMobile()&&e.includes('android')},isIos(){if(!this.isMobile())return!1;const e=window?.navigator.userAgent.toLowerCase();return e.includes('iphone')||e.includes('ipad')},isSafari(){if(!this.isClient())return!1;const e=window?.navigator.userAgent.toLowerCase();return e.includes('safari')},isClient:()=>'undefined'!=typeof window,isPairingExpired:e=>!e||e-Date.now()<=t.ConstantsUtil.TEN_SEC_MS,isAllowedRetry:(e,n=t.ConstantsUtil.ONE_SEC_MS)=>Date.now()-e>=n,copyToClopboard(e){navigator.clipboard.writeText(e)},isIframe(){try{return window?.self!==window?.top}catch(e){return!1}},isSafeApp(){if(r.isClient()&&window.self!==window.top)try{const e=window?.location?.ancestorOrigins?.[0],t='https://app.safe.global';if(e){const n=new URL(e),r=new URL(t);return n.hostname===r.hostname}}catch{return!1}return!1},getPairingExpiry:()=>Date.now()+t.ConstantsUtil.FOUR_MINUTES_MS,getNetworkId:e=>e?.split(':')[1],getPlainAddress:e=>e?.split(':')[2],wait:async e=>new Promise(t=>{setTimeout(t,e)}),debounce(e,t=500){let n;return(...r)=>{n&&clearTimeout(n),n=setTimeout(function(){e(...r)},t)}},isHttpUrl:e=>e.startsWith('http://')||e.startsWith('https://'),formatNativeUrl(e,t,n=null){if(r.isHttpUrl(e))return this.formatUniversalUrl(e,t);let o=e,s=n;o&&(o.includes('://')||(o=e.replaceAll('/','').replaceAll(':',''),o=`${o}://`),o.endsWith('/')||(o=`${o}/`)),s&&!s?.endsWith('/')&&(s=`${s}/`),this.isTelegram()&&this.isAndroid()&&(t=encodeURIComponent(t));const a=encodeURIComponent(t);return{redirect:`${o}wc?uri=${a}`,redirectUniversalLink:s?`${s}wc?uri=${a}`:void 0,href:o}},formatUniversalUrl(e,t){if(!r.isHttpUrl(e))return this.formatNativeUrl(e,t);let n=e;n.endsWith('/')||(n=`${n}/`);return{redirect:`${n}wc?uri=${encodeURIComponent(t)}`,href:n}},getOpenTargetForPlatform(e){return'popupWindow'===e?e:this.isTelegram()?n.StorageUtil.getTelegramSocialProvider()?'_top':'_blank':e},openHref(e,t,n){window?.open(e,this.getOpenTargetForPlatform(t),n||'noreferrer noopener')},returnOpenHref(e,t,n){return window?.open(e,this.getOpenTargetForPlatform(t),n||'noreferrer noopener')},isTelegram:()=>'undefined'!=typeof window&&(Boolean(window.TelegramWebviewProxy)||Boolean(window.Telegram)||Boolean(window.TelegramWebviewProxyProto)),isPWA(){if('undefined'==typeof window)return!1;const e=!(!window?.matchMedia||'function'!=typeof window.matchMedia)&&window.matchMedia('(display-mode: standalone)')?.matches,t=window?.navigator?.standalone;return Boolean(e||t)},async preloadImage(e){const t=new Promise((t,n)=>{const r=new Image;r.onload=t,r.onerror=n,r.crossOrigin='anonymous',r.src=e});return Promise.race([t,r.wait(2e3)])},parseBalance(e,t){let n='0.000';if('string'==typeof e){const t=Number(e);if(!isNaN(t)){const e=(Math.floor(1e3*t)/1e3).toFixed(3);e&&(n=e)}}const[r,o]=n.split('.'),s=r||'0',a=o||'000';return{formattedText:`${s}.${a}${t?` ${t}`:''}`,value:s,decimals:a,symbol:t}},getApiUrl:()=>e.ConstantsUtil.W3M_API_URL,getBlockchainApiUrl:()=>e.ConstantsUtil.BLOCKCHAIN_API_RPC_URL,getAnalyticsUrl:()=>e.ConstantsUtil.PULSE_API_URL,getUUID:()=>crypto?.randomUUID?crypto.randomUUID():'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/gu,e=>{const t=16*Math.random()|0;return('x'===e?t:3&t|8).toString(16)}),parseError:e=>'string'==typeof e?e:'string'==typeof e?.issues?.[0]?.message?e.issues[0].message:e instanceof Error?e.message:'Unknown error',sortRequestedNetworks(e,t=[]){const n={};return t&&e&&(e.forEach((e,t)=>{n[e]=t}),t.sort((e,t)=>{const r=n[e.id],o=n[t.id];return void 0!==r&&void 0!==o?r-o:void 0!==r?-1:void 0!==o?1:0})),t},calculateBalance(e){let t=0;for(const n of e)t+=n.value??0;return t},formatTokenBalance(e){const t=e.toFixed(2),[n,r]=t.split('.');return{dollars:n,pennies:r}},isAddress(e,t="eip155"){switch(t){case'eip155':return!!/^(?:0x)?[0-9a-f]{40}$/iu.test(e)&&!(!/^(?:0x)?[0-9a-f]{40}$/iu.test(e)&&!/^(?:0x)?[0-9A-F]{40}$/iu.test(e));case'solana':return/[1-9A-HJ-NP-Za-km-z]{32,44}$/iu.test(e);default:return!1}},uniqueBy(e,t){const n=new Set;return e.filter(e=>{const r=e[t];return!n.has(r)&&(n.add(r),!0)})},generateSdkVersion:(e,n,r)=>`${n}-${0===e.length?t.ConstantsUtil.ADAPTER_TYPES.UNIVERSAL:e.map(e=>e.adapterType).join(',')}-${r}`,createAccount:(e,t,n,r,o)=>({namespace:e,address:t,type:n,publicKey:r,path:o}),isCaipAddress(t){if('string'!=typeof t)return!1;const n=t.split(':'),r=n[0];return 3===n.filter(Boolean).length&&r in e.ConstantsUtil.CHAIN_NAME_MAP},getAccount:e=>e?'string'==typeof e?{address:e,chainId:void 0}:{address:e.address,chainId:e.chainId}:{address:void 0,chainId:void 0},isMac(){const e=window?.navigator.userAgent.toLowerCase();return e.includes('macintosh')&&!e.includes('safari')},formatTelegramSocialLoginUrl(e){const t=`--${encodeURIComponent(window?.location.href)}`,n='state=';if('auth.magic.link'===new URL(e).host){const r='provider_authorization_url=',o=e.substring(e.indexOf(r)+r.length),s=this.injectIntoUrl(decodeURIComponent(o),n,t);return e.replace(o,encodeURIComponent(s))}return this.injectIntoUrl(e,n,t)},injectIntoUrl(e,t,n){const r=e.indexOf(t);if(-1===r)throw new Error(`${t} parameter not found in the URL: ${e}`);const o=e.indexOf('&',r),s=t.length,a=-1!==o?o:e.length;return e.substring(0,r+s)+(e.substring(r+s,a)+n)+e.substring(o)}}},6214,[6192,6215,6216]);
__d(function(g,r,i,a,m,e,d){"use strict";Object.defineProperty(e,'__esModule',{value:!0}),Object.defineProperty(e,"ONRAMP_PROVIDERS",{enumerable:!0,get:function(){return t}}),Object.defineProperty(e,"MELD_PUBLIC_KEY",{enumerable:!0,get:function(){return S}}),Object.defineProperty(e,"ConstantsUtil",{enumerable:!0,get:function(){return n}});var A=r(d[0]);const E=('undefined'!=typeof process&&void 0!==process.env?process.env.NEXT_PUBLIC_SECURE_SITE_ORIGIN:void 0)||'https://secure.walletconnect.org',t=[{label:'Meld.io',name:'meld',feeRange:'1-2%',url:'https://meldcrypto.com',supportedChains:['eip155','solana']}],S='WXETMuFUQmqqybHuRkSgxv:25B8LJHSfpG6LVjR2ytU5Cwh7Z4Sch2ocoU',n={FOUR_MINUTES_MS:24e4,TEN_SEC_MS:1e4,FIVE_SEC_MS:5e3,THREE_SEC_MS:3e3,ONE_SEC_MS:1e3,SECURE_SITE:E,SECURE_SITE_DASHBOARD:`${E}/dashboard`,SECURE_SITE_FAVICON:`${E}/images/favicon.png`,SOLANA_NATIVE_TOKEN_ADDRESS:'So11111111111111111111111111111111111111111',RESTRICTED_TIMEZONES:['ASIA/SHANGHAI','ASIA/URUMQI','ASIA/CHONGQING','ASIA/HARBIN','ASIA/KASHGAR','ASIA/MACAU','ASIA/HONG_KONG','ASIA/MACAO','ASIA/BEIJING','ASIA/HARBIN'],SWAP_SUGGESTED_TOKENS:['ETH','UNI','1INCH','AAVE','SOL','ADA','AVAX','DOT','LINK','NITRO','GAIA','MILK','TRX','NEAR','GNO','WBTC','DAI','WETH','USDC','USDT','ARB','BAL','BICO','CRV','ENS','MATIC','OP'],SWAP_POPULAR_TOKENS:['ETH','UNI','1INCH','AAVE','SOL','ADA','AVAX','DOT','LINK','NITRO','GAIA','MILK','TRX','NEAR','GNO','WBTC','DAI','WETH','USDC','USDT','ARB','BAL','BICO','CRV','ENS','MATIC','OP','METAL','DAI','CHAMP','WOLF','SALE','BAL','BUSD','MUST','BTCpx','ROUTE','HEX','WELT','amDAI','VSQ','VISION','AURUM','pSP','SNX','VC','LINK','CHP','amUSDT','SPHERE','FOX','GIDDY','GFC','OMEN','OX_OLD','DE','WNT'],BALANCE_SUPPORTED_CHAINS:[A.ConstantsUtil.CHAIN.EVM,A.ConstantsUtil.CHAIN.SOLANA],SEND_PARAMS_SUPPORTED_CHAINS:[A.ConstantsUtil.CHAIN.EVM],SWAP_SUPPORTED_NETWORKS:['eip155:1','eip155:42161','eip155:10','eip155:324','eip155:8453','eip155:56','eip155:137','eip155:100','eip155:43114','eip155:250','eip155:8217','eip155:1313161554'],NAMES_SUPPORTED_CHAIN_NAMESPACES:[A.ConstantsUtil.CHAIN.EVM],ONRAMP_SUPPORTED_CHAIN_NAMESPACES:[A.ConstantsUtil.CHAIN.EVM,A.ConstantsUtil.CHAIN.SOLANA],PAY_WITH_EXCHANGE_SUPPORTED_CHAIN_NAMESPACES:[A.ConstantsUtil.CHAIN.EVM,A.ConstantsUtil.CHAIN.SOLANA],ACTIVITY_ENABLED_CHAIN_NAMESPACES:[A.ConstantsUtil.CHAIN.EVM],NATIVE_TOKEN_ADDRESS:{eip155:'0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee',solana:'So11111111111111111111111111111111111111111',polkadot:'0x',bip122:'0x',cosmos:'0x',sui:'0x',stacks:'0x'},CONVERT_SLIPPAGE_TOLERANCE:1,CONNECT_LABELS:{MOBILE:'Open and continue in the wallet app',WEB:'Open and continue in the wallet app'},SEND_SUPPORTED_NAMESPACES:[A.ConstantsUtil.CHAIN.EVM,A.ConstantsUtil.CHAIN.SOLANA],DEFAULT_REMOTE_FEATURES:{swaps:['1inch'],onramp:['meld'],email:!0,socials:['google','x','discord','farcaster','github','apple','facebook'],activity:!0,reownBranding:!0,multiWallet:!1,emailCapture:!1,payWithExchange:!1,payments:!1,reownAuthentication:!1},DEFAULT_REMOTE_FEATURES_DISABLED:{email:!1,socials:!1,swaps:!1,onramp:!1,activity:!1,reownBranding:!1,emailCapture:!1,reownAuthentication:!1},DEFAULT_FEATURES:{receive:!0,send:!0,emailShowWallets:!0,connectorTypeOrder:['walletConnect','recent','injected','featured','custom','external','recommended'],analytics:!0,allWallets:!0,legalCheckbox:!1,smartSessions:!1,collapseWallets:!1,walletFeaturesOrder:['onramp','swaps','receive','send'],connectMethodsOrder:void 0,pay:!1,reownAuthentication:!1},DEFAULT_SOCIALS:['google','x','farcaster','discord','apple','github','facebook'],DEFAULT_ACCOUNT_TYPES:{bip122:'payment',eip155:'smartAccount',polkadot:'eoa',solana:'eoa'},ADAPTER_TYPES:{UNIVERSAL:'universal',SOLANA:'solana',WAGMI:'wagmi',ETHERS:'ethers',ETHERS5:'ethers5',BITCOIN:'bitcoin'},SIWX_DEFAULTS:{signOutOnDisconnect:!0}}},6215,[6192]);
__d(function(g,_r,_i,_a,m,_e,d){"use strict";Object.defineProperty(_e,'__esModule',{value:!0}),Object.defineProperty(_e,"StorageUtil",{enumerable:!0,get:function(){return r}});var e,t=_r(d[0]),a=(e=t)&&e.__esModule?e:{default:e},o=_r(d[1]);function c(e){var t=n(e,"string");return"symbol"==typeof t?t:t+""}function n(e,t){if("object"!=typeof e||!e)return e;var a=e[Symbol.toPrimitive];if(void 0!==a){var o=a.call(e,t||"default");if("object"!=typeof o)return o;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===t?String:Number)(e)}const r={cacheExpiry:{portfolio:3e4,nativeBalance:3e4,ens:3e5,identity:3e5,transactionsHistory:15e3,tokenPrice:15e3,latestAppKitVersion:6048e5},isCacheExpired:(e,t)=>Date.now()-e>t,getActiveNetworkProps(){const e=r.getActiveNamespace(),t=r.getActiveCaipNetworkId(),a=t?t.split(':')[1]:void 0;return{namespace:e,caipNetworkId:t,chainId:a?isNaN(Number(a))?a:Number(a):void 0}},setWalletConnectDeepLink({name:e,href:t}){try{o.SafeLocalStorage.setItem(o.SafeLocalStorageKeys.DEEPLINK_CHOICE,JSON.stringify({href:t,name:e}))}catch{console.info('Unable to set WalletConnect deep link')}},getWalletConnectDeepLink(){try{const e=o.SafeLocalStorage.getItem(o.SafeLocalStorageKeys.DEEPLINK_CHOICE);if(e)return JSON.parse(e)}catch{console.info('Unable to get WalletConnect deep link')}},deleteWalletConnectDeepLink(){try{o.SafeLocalStorage.removeItem(o.SafeLocalStorageKeys.DEEPLINK_CHOICE)}catch{console.info('Unable to delete WalletConnect deep link')}},setActiveNamespace(e){try{o.SafeLocalStorage.setItem(o.SafeLocalStorageKeys.ACTIVE_NAMESPACE,e)}catch{console.info('Unable to set active namespace')}},setActiveCaipNetworkId(e){try{o.SafeLocalStorage.setItem(o.SafeLocalStorageKeys.ACTIVE_CAIP_NETWORK_ID,e),r.setActiveNamespace(e.split(':')[0])}catch{console.info('Unable to set active caip network id')}},getActiveCaipNetworkId(){try{return o.SafeLocalStorage.getItem(o.SafeLocalStorageKeys.ACTIVE_CAIP_NETWORK_ID)}catch{return void console.info('Unable to get active caip network id')}},deleteActiveCaipNetworkId(){try{o.SafeLocalStorage.removeItem(o.SafeLocalStorageKeys.ACTIVE_CAIP_NETWORK_ID)}catch{console.info('Unable to delete active caip network id')}},deleteConnectedConnectorId(e){try{const t=(0,o.getSafeConnectorIdKey)(e);o.SafeLocalStorage.removeItem(t)}catch{console.info('Unable to delete connected connector id')}},setAppKitRecent(e){try{const t=r.getRecentWallets();t.find(t=>t.id===e.id)||(t.unshift(e),t.length>2&&t.pop(),o.SafeLocalStorage.setItem(o.SafeLocalStorageKeys.RECENT_WALLETS,JSON.stringify(t)),o.SafeLocalStorage.setItem(o.SafeLocalStorageKeys.RECENT_WALLET,JSON.stringify(e)))}catch{console.info('Unable to set AppKit recent')}},getRecentWallets(){try{const e=o.SafeLocalStorage.getItem(o.SafeLocalStorageKeys.RECENT_WALLETS);return e?JSON.parse(e):[]}catch{console.info('Unable to get AppKit recent')}return[]},getRecentWallet(){try{const e=o.SafeLocalStorage.getItem(o.SafeLocalStorageKeys.RECENT_WALLET);return e?JSON.parse(e):null}catch{console.info('Unable to get AppKit recent')}return null},deleteRecentWallet(){try{o.SafeLocalStorage.removeItem(o.SafeLocalStorageKeys.RECENT_WALLET)}catch{console.info('Unable to delete AppKit recent')}},setConnectedConnectorId(e,t){try{const a=(0,o.getSafeConnectorIdKey)(e);o.SafeLocalStorage.setItem(a,t)}catch{console.info('Unable to set Connected Connector Id')}},getActiveNamespace(){try{return o.SafeLocalStorage.getItem(o.SafeLocalStorageKeys.ACTIVE_NAMESPACE)}catch{console.info('Unable to get active namespace')}},getConnectedConnectorId(e){if(e)try{const t=(0,o.getSafeConnectorIdKey)(e);return o.SafeLocalStorage.getItem(t)}catch(t){console.info('Unable to get connected connector id in namespace',e)}},setConnectedSocialProvider(e){try{o.SafeLocalStorage.setItem(o.SafeLocalStorageKeys.CONNECTED_SOCIAL,e)}catch{console.info('Unable to set connected social provider')}},getConnectedSocialProvider(){try{return o.SafeLocalStorage.getItem(o.SafeLocalStorageKeys.CONNECTED_SOCIAL)}catch{console.info('Unable to get connected social provider')}},deleteConnectedSocialProvider(){try{o.SafeLocalStorage.removeItem(o.SafeLocalStorageKeys.CONNECTED_SOCIAL)}catch{console.info('Unable to delete connected social provider')}},getConnectedSocialUsername(){try{return o.SafeLocalStorage.getItem(o.SafeLocalStorageKeys.CONNECTED_SOCIAL_USERNAME)}catch{console.info('Unable to get connected social username')}},getStoredActiveCaipNetworkId(){const e=o.SafeLocalStorage.getItem(o.SafeLocalStorageKeys.ACTIVE_CAIP_NETWORK_ID),t=e?.split(':')?.[1];return t},setConnectionStatus(e){try{o.SafeLocalStorage.setItem(o.SafeLocalStorageKeys.CONNECTION_STATUS,e)}catch{console.info('Unable to set connection status')}},getConnectionStatus(){try{return o.SafeLocalStorage.getItem(o.SafeLocalStorageKeys.CONNECTION_STATUS)}catch{return}},getConnectedNamespaces(){try{const e=o.SafeLocalStorage.getItem(o.SafeLocalStorageKeys.CONNECTED_NAMESPACES);return e?.length?e.split(','):[]}catch{return[]}},setConnectedNamespaces(e){try{const t=Array.from(new Set(e));o.SafeLocalStorage.setItem(o.SafeLocalStorageKeys.CONNECTED_NAMESPACES,t.join(','))}catch{console.info('Unable to set namespaces in storage')}},addConnectedNamespace(e){try{const t=r.getConnectedNamespaces();t.includes(e)||(t.push(e),r.setConnectedNamespaces(t))}catch{console.info('Unable to add connected namespace')}},removeConnectedNamespace(e){try{const t=r.getConnectedNamespaces(),a=t.indexOf(e);a>-1&&(t.splice(a,1),r.setConnectedNamespaces(t))}catch{console.info('Unable to remove connected namespace')}},getTelegramSocialProvider(){try{return o.SafeLocalStorage.getItem(o.SafeLocalStorageKeys.TELEGRAM_SOCIAL_PROVIDER)}catch{return console.info('Unable to get telegram social provider'),null}},setTelegramSocialProvider(e){try{o.SafeLocalStorage.setItem(o.SafeLocalStorageKeys.TELEGRAM_SOCIAL_PROVIDER,e)}catch{console.info('Unable to set telegram social provider')}},removeTelegramSocialProvider(){try{o.SafeLocalStorage.removeItem(o.SafeLocalStorageKeys.TELEGRAM_SOCIAL_PROVIDER)}catch{console.info('Unable to remove telegram social provider')}},getBalanceCache(){let e={};try{const t=o.SafeLocalStorage.getItem(o.SafeLocalStorageKeys.PORTFOLIO_CACHE);e=t?JSON.parse(t):{}}catch{console.info('Unable to get balance cache')}return e},removeAddressFromBalanceCache(e){try{const t=r.getBalanceCache();o.SafeLocalStorage.setItem(o.SafeLocalStorageKeys.PORTFOLIO_CACHE,JSON.stringify(Object.assign({},t,{[e]:void 0})))}catch{console.info('Unable to remove address from balance cache',e)}},getBalanceCacheForCaipAddress(e){try{const t=r.getBalanceCache()[e];if(t&&!this.isCacheExpired(t.timestamp,this.cacheExpiry.portfolio))return t.balance;r.removeAddressFromBalanceCache(e)}catch{console.info('Unable to get balance cache for address',e)}},updateBalanceCache(e){try{const t=r.getBalanceCache();t[e.caipAddress]=e,o.SafeLocalStorage.setItem(o.SafeLocalStorageKeys.PORTFOLIO_CACHE,JSON.stringify(t))}catch{console.info('Unable to update balance cache',e)}},getNativeBalanceCache(){let e={};try{const t=o.SafeLocalStorage.getItem(o.SafeLocalStorageKeys.NATIVE_BALANCE_CACHE);e=t?JSON.parse(t):{}}catch{console.info('Unable to get balance cache')}return e},removeAddressFromNativeBalanceCache(e){try{const t=r.getBalanceCache();o.SafeLocalStorage.setItem(o.SafeLocalStorageKeys.NATIVE_BALANCE_CACHE,JSON.stringify(Object.assign({},t,{[e]:void 0})))}catch{console.info('Unable to remove address from balance cache',e)}},getNativeBalanceCacheForCaipAddress(e){try{const t=r.getNativeBalanceCache()[e];if(t&&!this.isCacheExpired(t.timestamp,this.cacheExpiry.nativeBalance))return t;console.info('Discarding cache for address',e),r.removeAddressFromBalanceCache(e)}catch{console.info('Unable to get balance cache for address',e)}},updateNativeBalanceCache(e){try{const t=r.getNativeBalanceCache();t[e.caipAddress]=e,o.SafeLocalStorage.setItem(o.SafeLocalStorageKeys.NATIVE_BALANCE_CACHE,JSON.stringify(t))}catch{console.info('Unable to update balance cache',e)}},getEnsCache(){let e={};try{const t=o.SafeLocalStorage.getItem(o.SafeLocalStorageKeys.ENS_CACHE);e=t?JSON.parse(t):{}}catch{console.info('Unable to get ens name cache')}return e},getEnsFromCacheForAddress(e){try{const t=r.getEnsCache()[e];if(t&&!this.isCacheExpired(t.timestamp,this.cacheExpiry.ens))return t.ens;r.removeEnsFromCache(e)}catch{console.info('Unable to get ens name from cache',e)}},updateEnsCache(e){try{const t=r.getEnsCache();t[e.address]=e,o.SafeLocalStorage.setItem(o.SafeLocalStorageKeys.ENS_CACHE,JSON.stringify(t))}catch{console.info('Unable to update ens name cache',e)}},removeEnsFromCache(e){try{const t=r.getEnsCache();o.SafeLocalStorage.setItem(o.SafeLocalStorageKeys.ENS_CACHE,JSON.stringify(Object.assign({},t,{[e]:void 0})))}catch{console.info('Unable to remove ens name from cache',e)}},getIdentityCache(){let e={};try{const t=o.SafeLocalStorage.getItem(o.SafeLocalStorageKeys.IDENTITY_CACHE);e=t?JSON.parse(t):{}}catch{console.info('Unable to get identity cache')}return e},getIdentityFromCacheForAddress(e){try{const t=r.getIdentityCache()[e];if(t&&!this.isCacheExpired(t.timestamp,this.cacheExpiry.identity))return t.identity;r.removeIdentityFromCache(e)}catch{console.info('Unable to get identity from cache',e)}},updateIdentityCache(e){try{const t=r.getIdentityCache();t[e.address]={identity:e.identity,timestamp:e.timestamp},o.SafeLocalStorage.setItem(o.SafeLocalStorageKeys.IDENTITY_CACHE,JSON.stringify(t))}catch{console.info('Unable to update identity cache',e)}},removeIdentityFromCache(e){try{const t=r.getIdentityCache();o.SafeLocalStorage.setItem(o.SafeLocalStorageKeys.IDENTITY_CACHE,JSON.stringify(Object.assign({},t,{[e]:void 0})))}catch{console.info('Unable to remove identity from cache',e)}},clearAddressCache(){try{o.SafeLocalStorage.removeItem(o.SafeLocalStorageKeys.PORTFOLIO_CACHE),o.SafeLocalStorage.removeItem(o.SafeLocalStorageKeys.NATIVE_BALANCE_CACHE),o.SafeLocalStorage.removeItem(o.SafeLocalStorageKeys.ENS_CACHE),o.SafeLocalStorage.removeItem(o.SafeLocalStorageKeys.IDENTITY_CACHE),o.SafeLocalStorage.removeItem(o.SafeLocalStorageKeys.HISTORY_TRANSACTIONS_CACHE)}catch{console.info('Unable to clear address cache')}},setPreferredAccountTypes(e){try{o.SafeLocalStorage.setItem(o.SafeLocalStorageKeys.PREFERRED_ACCOUNT_TYPES,JSON.stringify(e))}catch{console.info('Unable to set preferred account types',e)}},getPreferredAccountTypes(){try{const e=o.SafeLocalStorage.getItem(o.SafeLocalStorageKeys.PREFERRED_ACCOUNT_TYPES);return e?JSON.parse(e):{}}catch{console.info('Unable to get preferred account types')}return{}},setConnections(e,t){try{const a=r.getConnections(),c=a[t]??[],n=new Map;for(const e of c)n.set(e.connectorId,Object.assign({},e));for(const t of e){const e=n.get(t.connectorId),a=t.connectorId===o.ConstantsUtil.CONNECTOR_ID.AUTH;if(e&&!a){const a=new Set(e.accounts.map(e=>e.address.toLowerCase())),o=t.accounts.filter(e=>!a.has(e.address.toLowerCase()));e.accounts.push(...o)}else n.set(t.connectorId,Object.assign({},t))}const s=Object.assign({},a,{[t]:Array.from(n.values())});o.SafeLocalStorage.setItem(o.SafeLocalStorageKeys.CONNECTIONS,JSON.stringify(s))}catch(e){console.error('Unable to sync connections to storage',e)}},getConnections(){try{const e=o.SafeLocalStorage.getItem(o.SafeLocalStorageKeys.CONNECTIONS);return e?JSON.parse(e):{}}catch(e){return console.error('Unable to get connections from storage',e),{}}},deleteAddressFromConnection({connectorId:e,address:t,namespace:a}){try{const c=r.getConnections(),n=c[a]??[],s=new Map(n.map(e=>[e.connectorId,e])),i=s.get(e);if(i){0===i.accounts.filter(e=>e.address.toLowerCase()!==t.toLowerCase()).length?s.delete(e):s.set(e,Object.assign({},i,{accounts:i.accounts.filter(e=>e.address.toLowerCase()!==t.toLowerCase())}))}o.SafeLocalStorage.setItem(o.SafeLocalStorageKeys.CONNECTIONS,JSON.stringify(Object.assign({},c,{[a]:Array.from(s.values())})))}catch{console.error(`Unable to remove address "${t}" from connector "${e}" in namespace "${a}"`)}},getDisconnectedConnectorIds(){try{const e=o.SafeLocalStorage.getItem(o.SafeLocalStorageKeys.DISCONNECTED_CONNECTOR_IDS);return e?JSON.parse(e):{}}catch{console.info('Unable to get disconnected connector ids')}return{}},addDisconnectedConnectorId(e,t){try{const a=r.getDisconnectedConnectorIds(),c=a[t]??[];c.push(e),o.SafeLocalStorage.setItem(o.SafeLocalStorageKeys.DISCONNECTED_CONNECTOR_IDS,JSON.stringify(Object.assign({},a,{[t]:Array.from(new Set(c))})))}catch{console.error(`Unable to set disconnected connector id "${e}" for namespace "${t}"`)}},removeDisconnectedConnectorId(e,t){try{const a=r.getDisconnectedConnectorIds();let c=a[t]??[];c=c.filter(t=>t.toLowerCase()!==e.toLowerCase()),o.SafeLocalStorage.setItem(o.SafeLocalStorageKeys.DISCONNECTED_CONNECTOR_IDS,JSON.stringify(Object.assign({},a,{[t]:Array.from(new Set(c))})))}catch{console.error(`Unable to remove disconnected connector id "${e}" for namespace "${t}"`)}},isConnectorDisconnected(e,t){try{const a=r.getDisconnectedConnectorIds();return(a[t]??[]).some(t=>t.toLowerCase()===e.toLowerCase())}catch{console.info(`Unable to get disconnected connector id "${e}" for namespace "${t}"`)}return!1},getTransactionsCache(){try{const e=o.SafeLocalStorage.getItem(o.SafeLocalStorageKeys.HISTORY_TRANSACTIONS_CACHE);return e?JSON.parse(e):{}}catch{console.info('Unable to get transactions cache')}return{}},getTransactionsCacheForAddress({address:e,chainId:t=""}){try{const a=r.getTransactionsCache(),o=a[e]?.[t];if(o&&!this.isCacheExpired(o.timestamp,this.cacheExpiry.transactionsHistory))return o.transactions;r.removeTransactionsCache({address:e,chainId:t})}catch{console.info('Unable to get transactions cache')}},updateTransactionsCache({address:e,chainId:t="",timestamp:a,transactions:c}){try{const n=r.getTransactionsCache();n[e]=Object.assign({},n[e],{[t]:{timestamp:a,transactions:c}}),o.SafeLocalStorage.setItem(o.SafeLocalStorageKeys.HISTORY_TRANSACTIONS_CACHE,JSON.stringify(n))}catch{console.info('Unable to update transactions cache',{address:e,chainId:t,timestamp:a,transactions:c})}},removeTransactionsCache({address:e,chainId:t}){try{const n=r.getTransactionsCache(),s=n?.[e]||{},i=(0,a.default)(s,[t].map(c));o.SafeLocalStorage.setItem(o.SafeLocalStorageKeys.HISTORY_TRANSACTIONS_CACHE,JSON.stringify(Object.assign({},n,{[e]:i})))}catch{console.info('Unable to remove transactions cache',{address:e,chainId:t})}},getTokenPriceCache(){try{const e=o.SafeLocalStorage.getItem(o.SafeLocalStorageKeys.TOKEN_PRICE_CACHE);return e?JSON.parse(e):{}}catch{console.info('Unable to get token price cache')}return{}},getTokenPriceCacheForAddresses(e){try{const t=r.getTokenPriceCache()[e.join(',')];if(t&&!this.isCacheExpired(t.timestamp,this.cacheExpiry.tokenPrice))return t.tokenPrice;r.removeTokenPriceCache(e)}catch{console.info('Unable to get token price cache for addresses',e)}},updateTokenPriceCache(e){try{const t=r.getTokenPriceCache();t[e.addresses.join(',')]={timestamp:e.timestamp,tokenPrice:e.tokenPrice},o.SafeLocalStorage.setItem(o.SafeLocalStorageKeys.TOKEN_PRICE_CACHE,JSON.stringify(t))}catch{console.info('Unable to update token price cache',e)}},removeTokenPriceCache(e){try{const t=r.getTokenPriceCache();o.SafeLocalStorage.setItem(o.SafeLocalStorageKeys.TOKEN_PRICE_CACHE,JSON.stringify(Object.assign({},t,{[e.join(',')]:void 0})))}catch{console.info('Unable to remove token price cache',e)}},getLatestAppKitVersion(){try{const e=this.getLatestAppKitVersionCache(),t=e?.version;return t&&!this.isCacheExpired(e.timestamp,this.cacheExpiry.latestAppKitVersion)?t:void 0}catch{console.info('Unable to get latest AppKit version')}},getLatestAppKitVersionCache(){try{const e=o.SafeLocalStorage.getItem(o.SafeLocalStorageKeys.LATEST_APPKIT_VERSION);return e?JSON.parse(e):{}}catch{console.info('Unable to get latest AppKit version cache')}return{}},updateLatestAppKitVersion(e){try{const t=r.getLatestAppKitVersionCache();t.timestamp=e.timestamp,t.version=e.version,o.SafeLocalStorage.setItem(o.SafeLocalStorageKeys.LATEST_APPKIT_VERSION,JSON.stringify(t))}catch{console.info('Unable to update latest AppKit version on local storage',e)}}}},6216,[212,6192]);
__d(function(g,r,i,a,m,e,d){"use strict";Object.defineProperty(e,'__esModule',{value:!0}),Object.defineProperty(e,"NetworkUtil",{enumerable:!0,get:function(){return s}});var t=r(d[0]),n=r(d[1]),o=r(d[2]),c=r(d[3]);const s={onSwitchNetwork({network:s,ignoreSwitchConfirmation:C=!1}){const l=n.ChainController.state.activeCaipNetwork,h=n.ChainController.state.activeChain,u=c.RouterController.state.data;if(s.id===l?.id)return;const w=Boolean(n.ChainController.getAccountData(h)?.address),N=Boolean(n.ChainController.getAccountData(s.chainNamespace)?.address),p=s.chainNamespace!==h,k=o.ConnectorController.getConnectorId(h)===t.ConstantsUtil.CONNECTOR_ID.AUTH,O=t.ConstantsUtil.AUTH_CONNECTOR_SUPPORTED_CHAINS.find(t=>t===s.chainNamespace);C||k&&O?c.RouterController.push('SwitchNetwork',Object.assign({},u,{network:s})):w&&p&&!N?c.RouterController.push('SwitchActiveChain',{switchToChain:s.chainNamespace,navigateTo:'Connect',navigateWithReplace:!0,network:s}):c.RouterController.push('SwitchNetwork',Object.assign({},u,{network:s}))}}},6217,[6192,6218,6230,6238]);
__d(function(g,r,i,_a,m,e,d){"use strict";Object.defineProperty(e,'__esModule',{value:!0}),Object.defineProperty(e,"ChainController",{enumerable:!0,get:function(){return E}});var t=r(d[0]),a=r(d[1]),o=r(d[2]),n=r(d[3]),s=r(d[4]),c=r(d[5]),p=r(d[6]),l=r(d[7]),C=r(d[8]),w=r(d[9]),N=r(d[10]),k=r(d[11]),h=r(d[12]),u=r(d[13]),v=r(d[14]),A=r(d[15]),f=r(d[16]);const S={currentTab:0,tokenBalance:[],smartAccountDeployed:!1,addressLabels:new Map,user:void 0,preferredAccountType:void 0},b={caipNetwork:void 0,supportsAllNetworks:!0,smartAccountEnabledNetworks:[]},I=(0,t.proxy)({chains:(0,a.proxyMap)(),activeCaipAddress:void 0,activeChain:void 0,activeCaipNetwork:void 0,noAdapters:!1,universalAdapter:{networkControllerClient:void 0,connectionControllerClient:void 0},isSwitchingNamespace:!1}),y={state:I,subscribe:a=>(0,t.subscribe)(I,()=>{a(I)}),subscribeKey:(t,o)=>(0,a.subscribeKey)(I,t,o),subscribeAccountStateProp(t,o,n){const s=n||I.activeChain;return s?(0,a.subscribeKey)(I.chains.get(s)?.accountState||{},t,o):()=>{}},subscribeChainProp(a,o,n){let s;return(0,t.subscribe)(I.chains,()=>{const t=n||I.activeChain;if(t){const n=I.chains.get(t)?.[a];s!==n&&(s=n,o(n))}})},initialize(a,o,n){const{chainId:s,namespace:c}=p.StorageUtil.getActiveNetworkProps(),l=o?.find(t=>t.id.toString()===s?.toString()),C=a.find(t=>t?.namespace===c)||a?.[0],w=a.map(t=>t.namespace).filter(t=>void 0!==t),N=h.OptionsController.state.enableEmbedded?new Set([...w]):new Set([...o?.map(t=>t.chainNamespace)??[]]);0!==a?.length&&C||(I.noAdapters=!0),I.noAdapters||(I.activeChain=C?.namespace,I.activeCaipNetwork=l,E.setChainNetworkData(C?.namespace,{caipNetwork:l}),I.activeChain&&u.PublicStateController.set({activeChain:C?.namespace})),N.forEach(a=>{const s=o?.filter(t=>t.chainNamespace===a),c=p.StorageUtil.getPreferredAccountTypes()||{},l=Object.assign({},h.OptionsController.state.defaultAccountTypes,c);E.state.chains.set(a,Object.assign({namespace:a,networkState:(0,t.proxy)(Object.assign({},b,{caipNetwork:s?.[0]})),accountState:(0,t.proxy)(Object.assign({},S,{preferredAccountType:l[a]})),caipNetworks:s??[]},n)),E.setRequestedCaipNetworks(s??[],a)})},removeAdapter(t){if(I.activeChain===t){const a=Array.from(I.chains.entries()).find(([a])=>a!==t);if(a){const t=a[1]?.caipNetworks?.[0];t&&E.setActiveCaipNetwork(t)}}I.chains.delete(t)},addAdapter(t,{networkControllerClient:a,connectionControllerClient:o},n){if(!t.namespace)throw new Error('ChainController:addAdapter - adapter must have a namespace');I.chains.set(t.namespace,{namespace:t.namespace,networkState:Object.assign({},b,{caipNetwork:n[0]}),accountState:Object.assign({},S),caipNetworks:n,connectionControllerClient:o,networkControllerClient:a}),E.setRequestedCaipNetworks(n?.filter(a=>a.chainNamespace===t.namespace)??[],t.namespace)},addNetwork(t){const a=I.chains.get(t.chainNamespace);if(a){const o=[...a.caipNetworks||[]];a.caipNetworks?.find(a=>a.id===t.id)||o.push(t),I.chains.set(t.chainNamespace,Object.assign({},a,{caipNetworks:o})),E.setRequestedCaipNetworks(o,t.chainNamespace),w.ConnectorController.filterByNamespace(t.chainNamespace,!0)}},removeNetwork(t,a){const o=I.chains.get(t);if(o){const n=I.activeCaipNetwork?.id===a,s=[...o.caipNetworks?.filter(t=>t.id!==a)||[]];n&&o?.caipNetworks?.[0]&&E.setActiveCaipNetwork(o.caipNetworks[0]),I.chains.set(t,Object.assign({},o,{caipNetworks:s})),E.setRequestedCaipNetworks(s||[],t),0===s.length&&w.ConnectorController.filterByNamespace(t,!1)}},setAdapterNetworkState(t,a){const o=I.chains.get(t);o&&(o.networkState=Object.assign({},o.networkState||b,a),I.chains.set(t,o))},setChainAccountData(t,a,o=!0){if(!t)throw new Error('Chain is required to update chain account data');const n=I.chains.get(t);if(n){const o=Object.assign({},n.accountState||S,a);I.chains.set(t,Object.assign({},n,{accountState:o})),1!==I.chains.size&&I.activeChain!==t||a.caipAddress&&(I.activeCaipAddress=a.caipAddress)}},setChainNetworkData(t,a){if(!t)return;const o=I.chains.get(t);if(o){const n=Object.assign({},o.networkState||b,a);I.chains.set(t,Object.assign({},o,{networkState:n}))}},setAccountProp(t,a,o,n=!0){E.setChainAccountData(o,{[t]:a},n)},setActiveNamespace(t){I.activeChain=t;const a=t?I.chains.get(t):void 0,o=a?.networkState?.caipNetwork;o?.id&&t&&(I.activeCaipAddress=a?.accountState?.caipAddress,I.activeCaipNetwork=o,E.setChainNetworkData(t,{caipNetwork:o}),p.StorageUtil.setActiveCaipNetworkId(o?.caipNetworkId),u.PublicStateController.set({activeChain:t,selectedNetworkId:o?.caipNetworkId}))},setActiveCaipNetwork(t){if(!t)return;const a=I.activeChain===t.chainNamespace;a||E.setIsSwitchingNamespace(!0);const n=I.chains.get(t.chainNamespace);I.activeChain=t.chainNamespace,I.activeCaipNetwork=t,E.setChainNetworkData(t.chainNamespace,{caipNetwork:t});let s=n?.accountState?.address;if(s)I.activeCaipAddress=`${t.chainNamespace}:${t.id}:${s}`;else if(a&&I.activeCaipAddress){const{address:a}=o.ParseUtil.parseCaipAddress(I.activeCaipAddress);s=a,I.activeCaipAddress=`${t.caipNetworkId}:${s}`}else I.activeCaipAddress=void 0;E.setChainAccountData(t.chainNamespace,{address:s,caipAddress:I.activeCaipAddress}),A.SendController.resetSend(),u.PublicStateController.set({activeChain:I.activeChain,selectedNetworkId:I.activeCaipNetwork?.caipNetworkId}),p.StorageUtil.setActiveCaipNetworkId(t.caipNetworkId);E.checkIfSupportedNetwork(t.chainNamespace)||!h.OptionsController.state.enableNetworkSwitch||h.OptionsController.state.allowUnsupportedChain||C.ConnectionController.state.wcBasic||E.showUnsupportedChainUI()},addCaipNetwork(t){if(!t)return;const a=I.chains.get(t.chainNamespace);a&&a?.caipNetworks?.push(t)},async switchActiveNamespace(t){if(!t)return;const a=t!==E.state.activeChain,o=E.getNetworkData(t)?.caipNetwork,n=E.getCaipNetworkByNamespace(t,o?.id);a&&n&&await E.switchActiveNetwork(n)},async switchActiveNetwork(t,{throwOnFailure:a=!1}={}){const o=E.state.activeChain;if(!o)throw new Error('ChainController:switchActiveNetwork - namespace is required');const n=E.state.chains.get(o),s=!n?.caipNetworks?.some(t=>t.id===I.activeCaipNetwork?.id),c=E.getNetworkControllerClient(t.chainNamespace);if(c){try{await c.switchCaipNetwork(t),s&&k.ModalController.close()}catch(t){if(a)throw t;v.RouterController.goBack()}N.EventsController.sendEvent({type:'track',event:'SWITCH_NETWORK',properties:{network:t.caipNetworkId}})}},getNetworkControllerClient(t){const a=t||I.activeChain;if(!a)throw new Error('ChainController:getNetworkControllerClient - chain is required');const o=I.chains.get(a);if(!o)throw new Error('Chain adapter not found');if(!o.networkControllerClient)throw new Error('NetworkController client not set');return o.networkControllerClient},getConnectionControllerClient(t){const a=t||I.activeChain;if(!a)throw new Error('Chain is required to get connection controller client');const o=I.chains.get(a);if(!o?.connectionControllerClient)throw new Error('ConnectionController client not set');return o.connectionControllerClient},getNetworkProp(t,a){const o=I.chains.get(a)?.networkState;if(o)return o[t]},getRequestedCaipNetworks(t){const a=I.chains.get(t),{approvedCaipNetworkIds:o=[],requestedCaipNetworks:n=[]}=a?.networkState||{};return c.CoreHelperUtil.sortRequestedNetworks(o,n).filter(t=>t?.id)},getAllRequestedCaipNetworks(){const t=[];return I.chains.forEach(a=>{if(!a.namespace)throw new Error('ChainController:getAllRequestedCaipNetworks - chainAdapter must have a namespace');const o=E.getRequestedCaipNetworks(a.namespace);t.push(...o)}),t},setRequestedCaipNetworks(t,a){E.setAdapterNetworkState(a,{requestedCaipNetworks:t});const o=E.getAllRequestedCaipNetworks().map(t=>t.chainNamespace),n=Array.from(new Set(o));w.ConnectorController.filterByNamespaces(n)},getAllApprovedCaipNetworkIds(){const t=[];return I.chains.forEach(a=>{if(!a.namespace)throw new Error('ChainController:getAllApprovedCaipNetworkIds - chainAdapter must have a namespace');const o=E.getApprovedCaipNetworkIds(a.namespace);t.push(...o)}),t},getActiveCaipNetwork:t=>t?I.chains.get(t)?.networkState?.caipNetwork:I.activeCaipNetwork,getActiveCaipAddress:()=>I.activeCaipAddress,getApprovedCaipNetworkIds(t){const a=I.chains.get(t);return a?.networkState?.approvedCaipNetworkIds||[]},async setApprovedCaipNetworksData(t){const a=E.getNetworkControllerClient(),o=await(a?.getApprovedCaipNetworksData());E.setAdapterNetworkState(t,{approvedCaipNetworkIds:o?.approvedCaipNetworkIds,supportsAllNetworks:o?.supportsAllNetworks})},checkIfSupportedNetwork(t,a){const o=a||I.activeCaipNetwork?.caipNetworkId,n=E.getRequestedCaipNetworks(t);return!n.length||n?.some(t=>t.caipNetworkId===o)},checkIfSupportedChainId(t){if(!I.activeChain)return!0;const a=E.getRequestedCaipNetworks(I.activeChain);return a?.some(a=>a.id===t)},setSmartAccountEnabledNetworks(t,a){E.setAdapterNetworkState(a,{smartAccountEnabledNetworks:t})},checkIfSmartAccountEnabled(){const t=o.NetworkUtil.caipNetworkIdToNumber(I.activeCaipNetwork?.caipNetworkId),a=I.activeChain;if(!a||!t)return!1;const n=E.getNetworkProp('smartAccountEnabledNetworks',a);return Boolean(n?.includes(Number(t)))},showUnsupportedChainUI(){k.ModalController.open({view:'UnsupportedChain'})},checkIfNamesSupported(){const t=I.activeCaipNetwork;return Boolean(t?.chainNamespace&&s.ConstantsUtil.NAMES_SUPPORTED_CHAIN_NAMESPACES.includes(t.chainNamespace))},resetNetwork(t){E.setAdapterNetworkState(t,{approvedCaipNetworkIds:void 0,supportsAllNetworks:!0})},resetAccount(t){const a=t;if(!a)throw new Error('Chain is required to set account prop');const o=E.state.chains.get(a)?.accountState?.preferredAccountType,n=h.OptionsController.state.defaultAccountTypes[a];I.activeCaipAddress=void 0,E.setChainAccountData(a,{smartAccountDeployed:!1,currentTab:0,caipAddress:void 0,address:void 0,balance:void 0,balanceSymbol:void 0,profileName:void 0,profileImage:void 0,addressExplorerUrl:void 0,tokenBalance:[],connectedWalletInfo:void 0,preferredAccountType:n||o,socialProvider:void 0,socialWindow:void 0,farcasterUrl:void 0,user:void 0,status:'disconnected'}),w.ConnectorController.removeConnectorId(a)},setIsSwitchingNamespace(t){I.isSwitchingNamespace=t},getFirstCaipNetworkSupportsAuthConnector(){const t=[];let a;if(I.chains.forEach(a=>{o.ConstantsUtil.AUTH_CONNECTOR_SUPPORTED_CHAINS.find(t=>t===a.namespace)&&a.namespace&&t.push(a.namespace)}),t.length>0){const o=t[0];return a=o?I.chains.get(o)?.caipNetworks?.[0]:void 0,a}},getAccountData(t){const a=t||I.activeChain;if(a)return E.state.chains.get(a)?.accountState},getNetworkData(t){const a=t||I.activeChain;if(a)return E.state.chains.get(a)?.networkState},getCaipNetworkByNamespace(t,a){if(!t)return;const o=E.state.chains.get(t),n=o?.caipNetworks?.find(t=>t.id===a);return n||(o?.networkState?.caipNetwork||o?.caipNetworks?.[0])},getRequestedCaipNetworkIds(){const t=w.ConnectorController.state.filterByNamespace;return(t?[I.chains.get(t)]:Array.from(I.chains.values())).flatMap(t=>t?.caipNetworks||[]).map(t=>t.caipNetworkId)},getCaipNetworks:t=>t?E.getRequestedCaipNetworks(t):E.getAllRequestedCaipNetworks(),getCaipNetworkById:(t,a)=>y.getCaipNetworks(a).find(a=>a.id.toString()===t.toString()||a.caipNetworkId.toString()===t.toString()),setLastConnectedSIWECaipNetwork(t){I.lastConnectedSIWECaipNetwork=t},getLastConnectedSIWECaipNetwork:()=>I.lastConnectedSIWECaipNetwork,async fetchTokenBalance(t){const a=E.getAccountData();if(!a)return[];const o=E.state.activeCaipNetwork?.caipNetworkId,p=E.state.activeCaipNetwork?.chainNamespace,l=E.state.activeCaipAddress,C=l?c.CoreHelperUtil.getPlainAddress(l):void 0;if(E.setAccountProp('balanceLoading',!0,p),a.lastRetry&&!c.CoreHelperUtil.isAllowedRetry(a.lastRetry,30*s.ConstantsUtil.ONE_SEC_MS))return E.setAccountProp('balanceLoading',!1,p),[];try{if(C&&o&&p){const t=await n.BalanceUtil.getMyTokensWithBalance();return E.setAccountProp('tokenBalance',t,p),E.setAccountProp('lastRetry',void 0,p),E.setAccountProp('balanceLoading',!1,p),t}}catch(a){E.setAccountProp('lastRetry',Date.now(),p),t?.(a),f.SnackController.showError('Token Balance Unavailable')}finally{E.setAccountProp('balanceLoading',!1,p)}return[]},isCaipNetworkDisabled(t){const a=t.chainNamespace,n=Boolean(E.getAccountData(a)?.caipAddress),s=E.getAllApprovedCaipNetworkIds(),c=!1!==E.getNetworkProp('supportsAllNetworks',a),p=w.ConnectorController.getConnectorId(a),l=w.ConnectorController.getAuthConnector(),C=p===o.ConstantsUtil.CONNECTOR_ID.AUTH&&l;return!(!n||c||C)&&!s?.includes(t.caipNetworkId)}},E=(0,l.withErrorBoundary)(y)},6218,[4209,4217,6192,6219,6215,6214,6216,6232,6225,6230,6237,6213,6222,6244,6238,6245,6224]);
__d(function(g,r,i,a,m,e,d){"use strict";Object.defineProperty(e,'__esModule',{value:!0}),Object.defineProperty(e,"BalanceUtil",{enumerable:!0,get:function(){return b}});var t=r(d[0]),n=r(d[1]),s=r(d[2]),c=r(d[3]),l=r(d[4]),o=r(d[5]),u=r(d[6]),C=r(d[7]),p=r(d[8]);const b={async getMyTokensWithBalance(t){const l=c.ChainController.getAccountData()?.address,u=c.ChainController.state.activeCaipNetwork,p=o.ConnectorController.getConnectorId('eip155')===n.ConstantsUtil.CONNECTOR_ID.AUTH;if(!l||!u)return[];const b=`${u.caipNetworkId}:${l}`,f=C.StorageUtil.getBalanceCacheForCaipAddress(b);if(f)return f.balances;if(u.chainNamespace===n.ConstantsUtil.CHAIN.EVM&&p){const t=await this.getEIP155Balances(l,u);if(t)return this.filterLowQualityTokens(t)}const w=await s.BlockchainApiController.getBalance(l,u.caipNetworkId,t);return this.filterLowQualityTokens(w.balances)},async getEIP155Balances(t,n){try{const s=u.ERC7811Utils.getChainIdHexFromCAIP2ChainId(n.caipNetworkId),c=await l.ConnectionController.getCapabilities(t);if(!c?.[s]?.assetDiscovery?.supported)return null;const o=await l.ConnectionController.walletGetAssets({account:t,chainFilter:[s]});if(!u.ERC7811Utils.isWalletGetAssetsResponse(o))return null;const p=(o[s]||[]).map(t=>u.ERC7811Utils.createBalance(t,n.caipNetworkId));return C.StorageUtil.updateBalanceCache({caipAddress:`${n.caipNetworkId}:${t}`,balance:{balances:p},timestamp:Date.now()}),p}catch(t){return null}},filterLowQualityTokens:t=>t.filter(t=>'0'!==t.quantity.decimals),async fetchERC20Balance({caipAddress:s,assetAddress:c,caipNetwork:l}){const o=await p.ViemUtil.createViemPublicClient(l),{address:u}=n.ParseUtil.parseCaipAddress(s),[{result:C},{result:b},{result:f},{result:w}]=await o.multicall({contracts:[{address:c,functionName:'name',args:[],abi:t.erc20Abi},{address:c,functionName:'symbol',args:[],abi:t.erc20Abi},{address:c,functionName:'balanceOf',args:[u],abi:t.erc20Abi},{address:c,functionName:'decimals',args:[],abi:t.erc20Abi}]});return{name:C,symbol:b,decimals:w,balance:f&&w?(0,t.formatUnits)(f,w):'0'}}}},6219,[1450,6192,6220,6218,6225,6230,6242,6216,6243]);
__d(function(g,r,i,a,m,_e,d){"use strict";Object.defineProperty(_e,'__esModule',{value:!0}),Object.defineProperty(_e,"BlockchainApiController",{enumerable:!0,get:function(){return C}});var e=r(d[0]),t=r(d[1]),o=r(d[2]),n=r(d[3]),s=r(d[4]),p=r(d[5]),c=r(d[6]),u=r(d[7]);const l={purchaseCurrencies:[{id:'2b92315d-eab7-5bef-84fa-089a131333f5',name:'USD Coin',symbol:'USDC',networks:[{name:'ethereum-mainnet',display_name:'Ethereum',chain_id:'1',contract_address:'0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48'},{name:'polygon-mainnet',display_name:'Polygon',chain_id:'137',contract_address:'0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174'}]},{id:'2b92315d-eab7-5bef-84fa-089a131333f5',name:'Ether',symbol:'ETH',networks:[{name:'ethereum-mainnet',display_name:'Ethereum',chain_id:'1',contract_address:'0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48'},{name:'polygon-mainnet',display_name:'Polygon',chain_id:'137',contract_address:'0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174'}]}],paymentCurrencies:[{id:'USD',payment_method_limits:[{id:'card',min:'10.00',max:'7500.00'},{id:'ach_bank_account',min:'10.00',max:'25000.00'}]},{id:'EUR',payment_method_limits:[{id:'card',min:'10.00',max:'7500.00'},{id:'ach_bank_account',min:'10.00',max:'25000.00'}]}]},w=o.CoreHelperUtil.getBlockchainApiUrl(),h=(0,e.proxy)({clientId:null,api:new n.FetchUtil({baseUrl:w,clientId:null}),supportedChains:{http:[],ws:[]}}),C={state:h,async get(e){const{st:t,sv:o}=C.getSdkProperties(),n=c.OptionsController.state.projectId,s=Object.assign({},e.params||{},{st:t,sv:o,projectId:n});return h.api.get(Object.assign({},e,{params:s}))},getSdkProperties(){const{sdkType:e,sdkVersion:t}=c.OptionsController.state;return{st:e||'unknown',sv:t||'unknown'}},async isNetworkSupported(e){if(!e)return!1;try{h.supportedChains.http.length||await C.getSupportedNetworks()}catch(e){return!1}return h.supportedChains.http.includes(e)},async getSupportedNetworks(){try{const e=await C.get({path:'v1/supported-chains'});return h.supportedChains=e,e}catch{return h.supportedChains}},async fetchIdentity({address:e}){const t=s.StorageUtil.getIdentityFromCacheForAddress(e);if(t)return t;const n=await C.get({path:`/v1/identity/${e}`,params:{sender:p.ChainController.state.activeCaipAddress?o.CoreHelperUtil.getPlainAddress(p.ChainController.state.activeCaipAddress):void 0}});return s.StorageUtil.updateIdentityCache({address:e,identity:n,timestamp:Date.now()}),n},async fetchTransactions({account:e,cursor:t,signal:o,cache:n,chainId:c}){if(!await C.isNetworkSupported(p.ChainController.state.activeCaipNetwork?.caipNetworkId))return{data:[],next:void 0};const u=s.StorageUtil.getTransactionsCacheForAddress({address:e,chainId:c});if(u)return u;const l=await C.get({path:`/v1/account/${e}/history`,params:{cursor:t,chainId:c},signal:o,cache:n});return s.StorageUtil.updateTransactionsCache({address:e,chainId:c,timestamp:Date.now(),transactions:l}),l},fetchSwapQuote:async({amount:e,userAddress:t,from:o,to:n,gasPrice:s})=>await C.isNetworkSupported(p.ChainController.state.activeCaipNetwork?.caipNetworkId)?C.get({path:"/v1/convert/quotes",headers:{'Content-Type':'application/json'},params:{amount:e,userAddress:t,from:o,to:n,gasPrice:s}}):{quotes:[]},fetchSwapTokens:async({chainId:e})=>await C.isNetworkSupported(p.ChainController.state.activeCaipNetwork?.caipNetworkId)?C.get({path:"/v1/convert/tokens",params:{chainId:e}}):{tokens:[]},async fetchTokenPrice({addresses:e}){if(!await C.isNetworkSupported(p.ChainController.state.activeCaipNetwork?.caipNetworkId))return{fungibles:[]};const t=s.StorageUtil.getTokenPriceCacheForAddresses(e);if(t)return t;const o=await h.api.post({path:'/v1/fungible/price',body:{currency:'usd',addresses:e,projectId:c.OptionsController.state.projectId},headers:{'Content-Type':'application/json'}});return s.StorageUtil.updateTokenPriceCache({addresses:e,timestamp:Date.now(),tokenPrice:o}),o},fetchSwapAllowance:async({tokenAddress:e,userAddress:t})=>await C.isNetworkSupported(p.ChainController.state.activeCaipNetwork?.caipNetworkId)?C.get({path:"/v1/convert/allowance",params:{tokenAddress:e,userAddress:t},headers:{'Content-Type':'application/json'}}):{allowance:'0'},async fetchGasPrice({chainId:e}){const{st:t,sv:o}=C.getSdkProperties();if(!await C.isNetworkSupported(p.ChainController.state.activeCaipNetwork?.caipNetworkId))throw new Error('Network not supported for Gas Price');return C.get({path:"/v1/convert/gas-price",headers:{'Content-Type':'application/json'},params:{chainId:e,st:t,sv:o}})},async generateSwapCalldata({amount:e,from:o,to:n,userAddress:s,disableEstimate:u}){if(!await C.isNetworkSupported(p.ChainController.state.activeCaipNetwork?.caipNetworkId))throw new Error('Network not supported for Swaps');return h.api.post({path:'/v1/convert/build-transaction',headers:{'Content-Type':'application/json'},body:{amount:e,eip155:{slippage:t.ConstantsUtil.CONVERT_SLIPPAGE_TOLERANCE},projectId:c.OptionsController.state.projectId,from:o,to:n,userAddress:s,disableEstimate:u}})},async generateApproveCalldata({from:e,to:t,userAddress:o}){const{st:n,sv:s}=C.getSdkProperties();if(!await C.isNetworkSupported(p.ChainController.state.activeCaipNetwork?.caipNetworkId))throw new Error('Network not supported for Swaps');return C.get({path:"/v1/convert/build-approve",headers:{'Content-Type':'application/json'},params:{userAddress:o,from:e,to:t,st:n,sv:s}})},async getBalance(e,t,o){const{st:n,sv:c}=C.getSdkProperties();if(!await C.isNetworkSupported(p.ChainController.state.activeCaipNetwork?.caipNetworkId))return u.SnackController.showError('Token Balance Unavailable'),{balances:[]};const l=`${t}:${e}`,w=s.StorageUtil.getBalanceCacheForCaipAddress(l);if(w)return w;const h=await C.get({path:`/v1/account/${e}/balance`,params:{currency:'usd',chainId:t,forceUpdate:o,st:n,sv:c}});return s.StorageUtil.updateBalanceCache({caipAddress:l,balance:h,timestamp:Date.now()}),h},lookupEnsName:async e=>await C.isNetworkSupported(p.ChainController.state.activeCaipNetwork?.caipNetworkId)?C.get({path:`/v1/profile/account/${e}`,params:{apiVersion:'2'}}):{addresses:{},attributes:[]},async reverseLookupEnsName({address:e}){if(!await C.isNetworkSupported(p.ChainController.state.activeCaipNetwork?.caipNetworkId))return[];const t=p.ChainController.getAccountData()?.address;return C.get({path:`/v1/profile/reverse/${e}`,params:{sender:t,apiVersion:'2'}})},getEnsNameSuggestions:async e=>await C.isNetworkSupported(p.ChainController.state.activeCaipNetwork?.caipNetworkId)?C.get({path:`/v1/profile/suggestions/${e}`,params:{zone:'reown.id'}}):{suggestions:[]},registerEnsName:async({coinType:e,address:t,message:o,signature:n})=>await C.isNetworkSupported(p.ChainController.state.activeCaipNetwork?.caipNetworkId)?h.api.post({path:"/v1/profile/account",body:{coin_type:e,address:t,message:o,signature:n},headers:{'Content-Type':'application/json'}}):{success:!1},async generateOnRampURL({destinationWallets:e,partnerUserId:t,defaultNetwork:o,purchaseAmount:n,paymentAmount:s}){if(!await C.isNetworkSupported(p.ChainController.state.activeCaipNetwork?.caipNetworkId))return'';return(await h.api.post({path:"/v1/generators/onrampurl",params:{projectId:c.OptionsController.state.projectId},body:{destinationWallets:e,defaultNetwork:o,partnerUserId:t,defaultExperience:'buy',presetCryptoAmount:n,presetFiatAmount:s}})).url},async getOnrampOptions(){if(!await C.isNetworkSupported(p.ChainController.state.activeCaipNetwork?.caipNetworkId))return{paymentCurrencies:[],purchaseCurrencies:[]};try{return await C.get({path:"/v1/onramp/options"})}catch(e){return l}},async getOnrampQuote({purchaseCurrency:e,paymentCurrency:t,amount:o,network:n}){try{if(!await C.isNetworkSupported(p.ChainController.state.activeCaipNetwork?.caipNetworkId))return null;return await h.api.post({path:"/v1/onramp/quote",params:{projectId:c.OptionsController.state.projectId},body:{purchaseCurrency:e,paymentCurrency:t,amount:o,network:n}})}catch(e){return{networkFee:{amount:o,currency:t.id},paymentSubtotal:{amount:o,currency:t.id},paymentTotal:{amount:o,currency:t.id},purchaseAmount:{amount:o,currency:t.id},quoteId:'mocked-quote-id'}}},getSmartSessions:async e=>await C.isNetworkSupported(p.ChainController.state.activeCaipNetwork?.caipNetworkId)?C.get({path:`/v1/sessions/${e}`}):[],revokeSmartSession:async(e,t,o)=>await C.isNetworkSupported(p.ChainController.state.activeCaipNetwork?.caipNetworkId)?h.api.post({path:`/v1/sessions/${e}/revoke`,params:{projectId:c.OptionsController.state.projectId},body:{pci:t,signature:o}}):{success:!1},setClientId(e){h.clientId=e,h.api=new n.FetchUtil({baseUrl:w,clientId:e})}}},6220,[4209,6215,6214,6221,6216,6218,6222,6224]);
__d(function(g,r,i,a,m,_e,d){"use strict";const e=["headers","signal","cache"],t=["headers","signal"],s=["body","headers","signal"],n=["body","headers","signal"],o=["body","headers","signal"],c=["body"];Object.defineProperty(_e,'__esModule',{value:!0}),Object.defineProperty(_e,"FetchUtil",{enumerable:!0,get:function(){return b}});var l,h=r(d[0]),u=(l=h)&&l.__esModule?l:{default:l};async function y(...e){const t=await fetch(...e);if(!t.ok){throw new Error(`HTTP status code: ${t.status}`,{cause:t})}return t}class b{constructor({baseUrl:e,clientId:t}){this.baseUrl=e,this.clientId=t}async get(t){let{headers:s,signal:n,cache:o}=t,c=(0,u.default)(t,e);const l=this.createUrl(c);return(await y(l,{method:'GET',headers:s,signal:n,cache:o})).json()}async getBlob(e){let{headers:s,signal:n}=e,o=(0,u.default)(e,t);const c=this.createUrl(o);return(await y(c,{method:'GET',headers:s,signal:n})).blob()}async post(e){let{body:t,headers:n,signal:o}=e,c=(0,u.default)(e,s);const l=this.createUrl(c);return(await y(l,{method:'POST',headers:n,body:t?JSON.stringify(t):void 0,signal:o})).json()}async put(e){let{body:t,headers:s,signal:o}=e,c=(0,u.default)(e,n);const l=this.createUrl(c);return(await y(l,{method:'PUT',headers:s,body:t?JSON.stringify(t):void 0,signal:o})).json()}async delete(e){let{body:t,headers:s,signal:n}=e,c=(0,u.default)(e,o);const l=this.createUrl(c);return(await y(l,{method:'DELETE',headers:s,body:t?JSON.stringify(t):void 0,signal:n})).json()}createUrl({path:e,params:t}){const s=new URL(e,this.baseUrl);return t&&Object.entries(t).forEach(([e,t])=>{t&&s.searchParams.append(e,t)}),this.clientId&&s.searchParams.append('clientId',this.clientId),s}sendBeacon(e){let{body:t}=e,s=(0,u.default)(e,c);const n=this.createUrl(s);return navigator.sendBeacon(n.toString(),t?JSON.stringify(t):void 0)}}},6221,[212]);
__d(function(g,r,i,a,m,e,d){"use strict";Object.defineProperty(e,'__esModule',{value:!0}),Object.defineProperty(e,"OptionsController",{enumerable:!0,get:function(){return c}});var t=r(d[0]),s=r(d[1]),l=r(d[2]),n=r(d[3]),o=r(d[4]);const u=(0,t.proxy)({features:l.ConstantsUtil.DEFAULT_FEATURES,projectId:'',sdkType:'appkit',sdkVersion:'html-wagmi-undefined',defaultAccountTypes:l.ConstantsUtil.DEFAULT_ACCOUNT_TYPES,enableNetworkSwitch:!0,experimental_preferUniversalLinks:!1,remoteFeatures:{},enableMobileFullScreen:!1}),c={state:u,subscribeKey:(t,l)=>(0,s.subscribeKey)(u,t,l),setOptions(t){Object.assign(u,t)},setRemoteFeatures(t){if(!t)return;const s=Object.assign({},u.remoteFeatures,t);u.remoteFeatures=s,u.remoteFeatures?.socials&&(u.remoteFeatures.socials=o.OptionsUtil.filterSocialsByPlatform(u.remoteFeatures.socials)),u.features?.pay&&(u.remoteFeatures.email=!1,u.remoteFeatures.socials=!1)},setFeatures(t){if(!t)return;u.features||(u.features=l.ConstantsUtil.DEFAULT_FEATURES);const s=Object.assign({},u.features,t);u.features=s,u.features?.pay&&u.remoteFeatures&&(u.remoteFeatures.email=!1,u.remoteFeatures.socials=!1)},setProjectId(t){u.projectId=t},setCustomRpcUrls(t){u.customRpcUrls=t},setAllWallets(t){u.allWallets=t},setIncludeWalletIds(t){u.includeWalletIds=t},setExcludeWalletIds(t){u.excludeWalletIds=t},setFeaturedWalletIds(t){u.featuredWalletIds=t},setTokens(t){u.tokens=t},setTermsConditionsUrl(t){u.termsConditionsUrl=t},setPrivacyPolicyUrl(t){u.privacyPolicyUrl=t},setCustomWallets(t){u.customWallets=t},setIsSiweEnabled(t){u.isSiweEnabled=t},setIsUniversalProvider(t){u.isUniversalProvider=t},setSdkVersion(t){u.sdkVersion=t},setMetadata(t){u.metadata=t},setDisableAppend(t){u.disableAppend=t},setEIP6963Enabled(t){u.enableEIP6963=t},setDebug(t){u.debug=t},setEnableWalletGuide(t){u.enableWalletGuide=t},setEnableAuthLogger(t){u.enableAuthLogger=t},setEnableWallets(t){u.enableWallets=t},setPreferUniversalLinks(t){u.experimental_preferUniversalLinks=t},setSIWX(t){if(t)for(const[s,n]of Object.entries(l.ConstantsUtil.SIWX_DEFAULTS))t[s]??=n;u.siwx=t},setConnectMethodsOrder(t){u.features=Object.assign({},u.features,{connectMethodsOrder:t})},setWalletFeaturesOrder(t){u.features=Object.assign({},u.features,{walletFeaturesOrder:t})},setSocialsOrder(t){u.remoteFeatures=Object.assign({},u.remoteFeatures,{socials:t})},setCollapseWallets(t){u.features=Object.assign({},u.features,{collapseWallets:t})},setEnableEmbedded(t){u.enableEmbedded=t},setAllowUnsupportedChain(t){u.allowUnsupportedChain=t},setManualWCControl(t){u.manualWCControl=t},setEnableNetworkSwitch(t){u.enableNetworkSwitch=t},setEnableMobileFullScreen(t){u.enableMobileFullScreen=n.CoreHelperUtil.isMobile()&&t},setEnableReconnect(t){u.enableReconnect=t},setDefaultAccountTypes(t={}){Object.entries(t).forEach(([t,s])=>{s&&(u.defaultAccountTypes[t]=s)})},setUniversalProviderConfigOverride(t){u.universalProviderConfigOverride=t},getUniversalProviderConfigOverride:()=>u.universalProviderConfigOverride,getSnapshot:()=>(0,t.snapshot)(u)}},6222,[4209,4217,6215,6214,6223]);
__d(function(g,r,i,a,m,e,d){"use strict";Object.defineProperty(e,'__esModule',{value:!0}),Object.defineProperty(e,"OptionsUtil",{enumerable:!0,get:function(){return s}});var t=r(d[0]),o=r(d[1]),l=r(d[2]);const s={getFeatureValue(t,l){const s=l?.[t];return void 0===s?o.ConstantsUtil.DEFAULT_FEATURES[t]:s},filterSocialsByPlatform(t){if(!t||!t.length)return t;if(l.CoreHelperUtil.isTelegram()){if(l.CoreHelperUtil.isIos())return t.filter(t=>'google'!==t);if(l.CoreHelperUtil.isMac())return t.filter(t=>'x'!==t);if(l.CoreHelperUtil.isAndroid())return t.filter(t=>!['facebook','x'].includes(t))}return t},isSocialsEnabled:()=>Array.isArray(t.OptionsController.state.features?.socials)&&t.OptionsController.state.features?.socials.length>0||Array.isArray(t.OptionsController.state.remoteFeatures?.socials)&&t.OptionsController.state.remoteFeatures?.socials.length>0,isEmailEnabled:()=>Boolean(t.OptionsController.state.features?.email||t.OptionsController.state.remoteFeatures?.email)}},6223,[6222,6215,6214]);
__d(function(g,r,i,a,m,e,d){"use strict";Object.defineProperty(e,'__esModule',{value:!0}),Object.defineProperty(e,"SnackController",{enumerable:!0,get:function(){return u}});var s=r(d[0]),o=r(d[1]),t=r(d[2]);const n=Object.freeze({message:'',variant:'success',svg:void 0,open:!1,autoClose:!0}),c=(0,s.proxy)(Object.assign({},n)),u={state:c,subscribeKey:(s,t)=>(0,o.subscribeKey)(c,s,t),showLoading(s,o={}){this._showMessage(Object.assign({message:s,variant:'loading'},o))},showSuccess(s){this._showMessage({message:s,variant:'success'})},showSvg(s,o){this._showMessage({message:s,svg:o})},showError(s){const o=t.CoreHelperUtil.parseError(s);this._showMessage({message:o,variant:'error'})},hide(){c.message=n.message,c.variant=n.variant,c.svg=n.svg,c.open=n.open,c.autoClose=n.autoClose},_showMessage({message:s,svg:o,variant:t="success",autoClose:u=n.autoClose}){c.open?(c.open=!1,setTimeout(()=>{c.message=s,c.variant=t,c.svg=o,c.open=!0,c.autoClose=u},150)):(c.message=s,c.variant=t,c.svg=o,c.open=!0,c.autoClose=u)}}},6224,[4209,4217,6214]);
__d(function(g,r,i,_a,m,e,d){"use strict";Object.defineProperty(e,'__esModule',{value:!0}),Object.defineProperty(e,"ConnectionController",{enumerable:!0,get:function(){return U}});var n=r(d[0]),t=r(d[1]),o=r(d[2]),c=r(d[3]),a=r(d[4]),s=r(d[5]),l=r(d[6]),C=r(d[7]),p=r(d[8]),w=r(d[9]),u=r(d[10]),h=r(d[11]),y=r(d[12]),f=r(d[13]),E=r(d[14]);const v=(0,n.proxy)({connections:new Map,recentConnections:new Map,isSwitchingConnection:!1,wcError:!1,buffering:!1,status:'disconnected'});let A;const _={state:v,subscribe:t=>(0,n.subscribe)(v,()=>t(v)),subscribeKey:(n,o)=>(0,t.subscribeKey)(v,n,o),_getClient:()=>v._client,setClient(t){v._client=(0,n.ref)(t)},initialize(n){const t=n.filter(n=>Boolean(n.namespace)).map(n=>n.namespace);U.syncStorageConnections(t)},syncStorageConnections(n){const t=C.StorageUtil.getConnections(),o=n??Array.from(w.ChainController.state.chains.keys());for(const n of o){const o=t[n]??[],c=new Map(v.recentConnections);c.set(n,o),v.recentConnections=c}},getConnections:n=>n?v.connections.get(n)??[]:[],hasAnyConnection(n){const t=U.state.connections;return Array.from(t.values()).flatMap(n=>n).some(({connectorId:t})=>t===n)},async connectWalletConnect({cache:n="auto"}={}){const t=l.CoreHelperUtil.isTelegram()||l.CoreHelperUtil.isSafari()&&l.CoreHelperUtil.isIos();if('always'===n||'auto'===n&&t){if(A)return await A,void(A=void 0);if(!l.CoreHelperUtil.isPairingExpired(v?.wcPairingExpiry)){const n=v.wcUri;return void(v.wcUri=n)}A=U._getClient()?.connectWalletConnect?.().catch(()=>{}),U.state.status='connecting',await A,A=void 0,v.wcPairingExpiry=void 0,U.state.status='connected'}else await(U._getClient()?.connectWalletConnect?.())},async connectExternal(n,t,o=!0){const c=await(U._getClient()?.connectExternal?.(n));return o&&w.ChainController.setActiveNamespace(t),c},async reconnectExternal(n){await(U._getClient()?.reconnectExternal?.(n));const t=n.chain||w.ChainController.state.activeChain;t&&u.ConnectorController.setConnectorId(n.id,t)},async setPreferredAccountType(n,t){if(!t)return;y.ModalController.setLoading(!0,w.ChainController.state.activeChain);const o=u.ConnectorController.getAuthConnector();o&&(w.ChainController.setAccountProp('preferredAccountType',n,t),await o.provider.setPreferredAccount(n),C.StorageUtil.setPreferredAccountTypes(Object.entries(w.ChainController.state.chains).reduce((n,[t,o])=>{const a=t,s=(0,c.getPreferredAccountType)(a);return void 0!==s&&(n[a]=s),n},{})),await U.reconnectExternal(o),y.ModalController.setLoading(!1,w.ChainController.state.activeChain),h.EventsController.sendEvent({type:'track',event:'SET_PREFERRED_ACCOUNT_TYPE',properties:{accountType:n,network:w.ChainController.state.activeCaipNetwork?.caipNetworkId||''}}))},signMessage:async n=>U._getClient()?.signMessage(n),parseUnits:(n,t)=>U._getClient()?.parseUnits(n,t),formatUnits:(n,t)=>U._getClient()?.formatUnits(n,t),updateBalance:n=>U._getClient()?.updateBalance(n),sendTransaction:async n=>U._getClient()?.sendTransaction(n),getCapabilities:async n=>U._getClient()?.getCapabilities(n),grantPermissions:async n=>U._getClient()?.grantPermissions(n),walletGetAssets:async n=>U._getClient()?.walletGetAssets(n)??{},estimateGas:async n=>U._getClient()?.estimateGas(n),writeContract:async n=>U._getClient()?.writeContract(n),getEnsAddress:async n=>U._getClient()?.getEnsAddress(n),getEnsAvatar:async n=>U._getClient()?.getEnsAvatar(n),checkInstalled:n=>U._getClient()?.checkInstalled?.(n)||!1,resetWcConnection(){v.wcUri=void 0,v.wcPairingExpiry=void 0,v.wcLinking=void 0,v.recentWallet=void 0,v.status='disconnected',E.TransactionsController.resetTransactions(),C.StorageUtil.deleteWalletConnectDeepLink(),C.StorageUtil.deleteRecentWallet()},resetUri(){v.wcUri=void 0,v.wcPairingExpiry=void 0,A=void 0},finalizeWcConnection(n){const{wcLinking:t,recentWallet:o}=U.state;t&&C.StorageUtil.setWalletConnectDeepLink(t),o&&C.StorageUtil.setAppKitRecent(o),n&&h.EventsController.sendEvent({type:'track',event:'CONNECT_SUCCESS',address:n,properties:{method:t?'mobile':'qrcode',name:f.RouterController.state.data?.wallet?.name||'Unknown',view:f.RouterController.state.view,walletRank:o?.order}})},setWcBasic(n){v.wcBasic=n},setUri(n){v.wcUri=n,v.wcPairingExpiry=l.CoreHelperUtil.getPairingExpiry()},setWcLinking(n){v.wcLinking=n},setWcError(n){v.wcError=n,v.buffering=!1},setRecentWallet(n){v.recentWallet=n},setBuffering(n){v.buffering=n},setStatus(n){v.status=n},setIsSwitchingConnection(n){v.isSwitchingConnection=n},async disconnect({id:n,namespace:t,initialDisconnect:o}={}){try{await(U._getClient()?.disconnect({id:n,chainNamespace:t,initialDisconnect:o}))}catch(n){throw new p.AppKitError('Failed to disconnect','INTERNAL_SDK_ERROR',n)}},async disconnectConnector({id:n,namespace:t}){try{await(U._getClient()?.disconnectConnector({id:n,namespace:t}))}catch(n){throw new p.AppKitError('Failed to disconnect connector','INTERNAL_SDK_ERROR',n)}},setConnections(n,t){const o=new Map(v.connections);o.set(t,n),v.connections=o},async handleAuthAccountSwitch({address:n,namespace:t}){const o=w.ChainController.getAccountData(t),c=o?.user?.accounts?.find(n=>'smartAccount'===n.type),a=c&&c.address.toLowerCase()===n.toLowerCase()&&s.ConnectorControllerUtil.canSwitchToSmartAccount(t)?'smartAccount':'eoa';await U.setPreferredAccountType(a,t)},async handleActiveConnection({connection:n,namespace:t,address:c}){const a=u.ConnectorController.getConnectorById(n.connectorId),s=n.connectorId===o.ConstantsUtil.CONNECTOR_ID.AUTH;if(!a)throw new Error(`No connector found for connection: ${n.connectorId}`);if(!s){const n=await U.connectExternal({id:a.id,type:a.type,provider:a.provider,address:c,chain:t},t);return n?.address}return s&&c&&await U.handleAuthAccountSwitch({address:c,namespace:t}),c},async handleDisconnectedConnection({connection:n,namespace:t,address:c,closeModalOnConnect:a}){const l=u.ConnectorController.getConnectorById(n.connectorId),C=n.auth?.name?.toLowerCase(),p=n.connectorId===o.ConstantsUtil.CONNECTOR_ID.AUTH,w=n.connectorId===o.ConstantsUtil.CONNECTOR_ID.WALLET_CONNECT;if(!l)throw new Error(`No connector found for connection: ${n.connectorId}`);let h;if(p)if(C&&s.ConnectorControllerUtil.isSocialProvider(C)){const{address:n}=await s.ConnectorControllerUtil.connectSocial({social:C,closeModalOnConnect:a,onOpenFarcaster(){y.ModalController.open({view:'ConnectingFarcaster'})},onConnect(){f.RouterController.replace('ProfileWallets')}});h=n}else{const{address:n}=await s.ConnectorControllerUtil.connectEmail({closeModalOnConnect:a,onOpen(){y.ModalController.open({view:'EmailLogin'})},onConnect(){f.RouterController.replace('ProfileWallets')}});h=n}else if(w){const{address:n}=await s.ConnectorControllerUtil.connectWalletConnect({walletConnect:!0,connector:l,closeModalOnConnect:a,onOpen(n){const t=n?'AllWallets':'ConnectingWalletConnect';y.ModalController.state.open?f.RouterController.push(t):y.ModalController.open({view:t})},onConnect(){f.RouterController.replace('ProfileWallets')}});h=n}else{const n=await U.connectExternal({id:l.id,type:l.type,provider:l.provider,chain:t},t);n&&(h=n.address)}return p&&c&&await U.handleAuthAccountSwitch({address:c,namespace:t}),h},async switchConnection({connection:n,address:t,namespace:c,closeModalOnConnect:s,onChange:l}){let C;const p=w.ChainController.getAccountData(c)?.caipAddress;if(p){const{address:n}=o.ParseUtil.parseCaipAddress(p);C=n}const u=a.ConnectionControllerUtil.getConnectionStatus(n,c);switch(u){case'connected':case'active':{const o=await U.handleActiveConnection({connection:n,namespace:c,address:t});if(C&&o){const n=o.toLowerCase()!==C.toLowerCase();l?.({address:o,namespace:c,hasSwitchedAccount:n,hasSwitchedWallet:'active'===u})}break}case'disconnected':{const o=await U.handleDisconnectedConnection({connection:n,namespace:c,address:t,closeModalOnConnect:s});o&&l?.({address:o,namespace:c,hasSwitchedAccount:!0,hasSwitchedWallet:!0});break}default:throw new Error(`Invalid connection status: ${u}`)}}},U=(0,p.withErrorBoundary)(_)},6225,[4209,4217,6192,6226,6240,6227,6214,6216,6232,6218,6230,6237,6213,6238,6241]);
__d(function(g,r,i,a,m,e,d){"use strict";Object.defineProperty(e,'__esModule',{value:!0}),e.getChainsToDisconnect=function(c){const C=Array.from(n.ChainController.state.chains.keys());let s=[];c?(s.push([c,n.ChainController.state.chains.get(c)]),o.ConnectorControllerUtil.checkNamespaceConnectorId(c,t.ConstantsUtil.CONNECTOR_ID.WALLET_CONNECT)?C.forEach(C=>{C!==c&&o.ConnectorControllerUtil.checkNamespaceConnectorId(C,t.ConstantsUtil.CONNECTOR_ID.WALLET_CONNECT)&&s.push([C,n.ChainController.state.chains.get(C)])}):o.ConnectorControllerUtil.checkNamespaceConnectorId(c,t.ConstantsUtil.CONNECTOR_ID.AUTH)&&C.forEach(C=>{C!==c&&o.ConnectorControllerUtil.checkNamespaceConnectorId(C,t.ConstantsUtil.CONNECTOR_ID.AUTH)&&s.push([C,n.ChainController.state.chains.get(C)])})):s=Array.from(n.ChainController.state.chains.entries());return s},e.getActiveNetworkTokenAddress=function(){const t=n.ChainController.state.activeCaipNetwork?.chainNamespace||'eip155',o=n.ChainController.state.activeCaipNetwork?.id||1,C=c.ConstantsUtil.NATIVE_TOKEN_ADDRESS[t];return`${t}:${o}:${C}`},e.getPreferredAccountType=function(t){const o=n.ChainController.getAccountData(t)?.preferredAccountType;return o},e.getActiveCaipNetwork=function(t){if(t)return n.ChainController.state.chains.get(t)?.networkState?.caipNetwork;return n.ChainController.state.activeCaipNetwork};var t=r(d[0]),n=r(d[1]),o=r(d[2]),c=r(d[3])},6226,[6192,6218,6227,6215]);
__d(function(g,r,i,a,m,e,d){"use strict";Object.defineProperty(e,'__esModule',{value:!0}),Object.defineProperty(e,"ConnectorControllerUtil",{enumerable:!0,get:function(){return A}});var o=r(d[0]),t=r(d[1]),n=r(d[2]),l=r(d[3]),c=r(d[4]),s=r(d[5]),C=r(d[6]),p=r(d[7]),u=r(d[8]),E=r(d[9]),v=r(d[10]),w=r(d[11]),h=r(d[12]);const A={checkNamespaceConnectorId:(o,t)=>s.ConnectorController.getConnectorId(o)===t,isSocialProvider:o=>v.ConstantsUtil.DEFAULT_REMOTE_FEATURES.socials.includes(o),connectWalletConnect:({walletConnect:o,connector:n,closeModalOnConnect:c=!0,redirectViewOnModalClose:C="Connect",onOpen:E,onConnect:v})=>new Promise((h,A)=>{if(o&&s.ConnectorController.setActiveConnector(n),E?.(w.CoreHelperUtil.isMobile()&&o),C){const o=p.ModalController.subscribeKey('open',t=>{t||(u.RouterController.state.view!==C&&u.RouterController.replace(C),o(),A(new Error('Modal closed')))})}const f=l.ChainController.subscribeKey('activeCaipAddress',o=>{o&&(v?.(),c&&p.ModalController.close(),f(),h(t.ParseUtil.parseCaipAddress(o)))})}),connectExternal:o=>new Promise((n,s)=>{const C=l.ChainController.subscribeKey('activeCaipAddress',o=>{o&&(p.ModalController.close(),C(),n(t.ParseUtil.parseCaipAddress(o)))});c.ConnectionController.connectExternal(o,o.chain).catch(()=>{C(),s(new Error('Connection rejected'))})}),connectSocial({social:n,namespace:u,closeModalOnConnect:E=!0,onOpenFarcaster:v,onConnect:A}){const f=l.ChainController.getAccountData(u);let U=f?.socialWindow,O=f?.socialProvider,S=!1,I=null;const _=u||l.ChainController.state.activeChain,y=l.ChainController.subscribeKey('activeCaipAddress',o=>{o&&(E&&p.ModalController.close(),y())});return new Promise((u,E)=>{async function y(o){if(o.data?.resultUri)if(o.origin===t.ConstantsUtil.SECURE_SITE_SDK_ORIGIN){window.removeEventListener('message',y,!1);try{const n=s.ConnectorController.getAuthConnector(_);if(n&&!S){const s=l.ChainController.getAccountData(_);U&&(U.close(),l.ChainController.setAccountProp('socialWindow',void 0,_),U=s?.socialWindow),S=!0;const p=o.data.resultUri;if(O&&C.EventsController.sendEvent({type:'track',event:'SOCIAL_LOGIN_REQUEST_USER_DATA',properties:{provider:O}}),O){h.StorageUtil.setConnectedSocialProvider(O),await c.ConnectionController.connectExternal({id:n.id,type:n.type,socialUri:p},n.chain);const o=l.ChainController.state.activeCaipAddress;if(!o)return void E(new Error('Failed to connect'));u(t.ParseUtil.parseCaipAddress(o)),C.EventsController.sendEvent({type:'track',event:'SOCIAL_LOGIN_SUCCESS',properties:{provider:O}})}}}catch(o){O&&C.EventsController.sendEvent({type:'track',event:'SOCIAL_LOGIN_ERROR',properties:{provider:O,message:w.CoreHelperUtil.parseError(o)}}),E(new Error('Failed to connect'))}}else O&&C.EventsController.sendEvent({type:'track',event:'SOCIAL_LOGIN_ERROR',properties:{provider:O,message:'Untrusted Origin'}})}!(async function(){if(n){const o=l.ChainController.getAccountData(_);l.ChainController.setAccountProp('socialProvider',n,_),O=o?.socialProvider,C.EventsController.sendEvent({type:'track',event:'SOCIAL_LOGIN_STARTED',properties:{provider:O}})}if('farcaster'===O){v?.();const o=p.ModalController.subscribeKey('open',t=>{t||'farcaster'!==n||(E(new Error('Popup closed')),A?.(),o())}),t=s.ConnectorController.getAuthConnector();if(t){const o=l.ChainController.getAccountData(_);if(!o?.farcasterUrl)try{const{url:o}=await t.provider.getFarcasterUri();l.ChainController.setAccountProp('farcasterUrl',o,_)}catch{E(new Error('Failed to connect to farcaster'))}}}else{const n=s.ConnectorController.getAuthConnector();I=w.CoreHelperUtil.returnOpenHref(`${t.ConstantsUtil.SECURE_SITE_SDK_ORIGIN}/loading`,'popupWindow','width=600,height=800,scrollbars=yes');try{if(n&&O){const{uri:t}=await n.provider.getSocialRedirectUri({provider:O});if(I&&t){l.ChainController.setAccountProp('socialWindow',(0,o.ref)(I),_),U=f?.socialWindow,I.location.href=t;const n=setInterval(()=>{U?.closed&&!S&&(E(new Error('Popup closed')),clearInterval(n))},1e3);window.addEventListener('message',y,!1)}else I?.close(),E(new Error('Failed to initiate social connection'))}}catch{E(new Error('Failed to initiate social connection')),I?.close()}}})()})},connectEmail:({closeModalOnConnect:o=!0,redirectViewOnModalClose:n="Connect",onOpen:c,onConnect:s})=>new Promise((C,E)=>{if(c?.(),n){const o=p.ModalController.subscribeKey('open',t=>{t||(u.RouterController.state.view!==n&&u.RouterController.replace(n),o(),E(new Error('Modal closed')))})}const v=l.ChainController.subscribeKey('activeCaipAddress',n=>{n&&(s?.(),o&&p.ModalController.close(),v(),C(t.ParseUtil.parseCaipAddress(n)))})}),async updateEmail(){const o=h.StorageUtil.getConnectedConnectorId(l.ChainController.state.activeChain),n=s.ConnectorController.getAuthConnector();if(!n)throw new Error('No auth connector found');if(o!==t.ConstantsUtil.CONNECTOR_ID.AUTH)throw new Error('Not connected to email or social');const c=n.provider.getEmail()??'';return await p.ModalController.open({view:'UpdateEmailWallet',data:{email:c,redirectView:void 0}}),new Promise((o,t)=>{const l=setInterval(()=>{const t=n.provider.getEmail()??'';t!==c&&(p.ModalController.close(),clearInterval(l),s(),o({email:t}))},1e3),s=p.ModalController.subscribeKey('open',o=>{o||('Connect'!==u.RouterController.state.view&&u.RouterController.push('Connect'),clearInterval(l),s(),t(new Error('Modal closed')))})})},canSwitchToSmartAccount:o=>l.ChainController.checkIfSmartAccountEnabled()&&(0,E.getPreferredAccountType)(o)===n.W3mFrameRpcConstants.ACCOUNT_TYPES.EOA}},6227,[4208,6192,6228,6218,6225,6230,6237,6213,6238,6226,6215,6214,6216]);
__d(function(g,r,i,a,m,e,d){"use strict";Object.defineProperty(e,'__esModule',{value:!0}),Object.defineProperty(e,"W3mFrameRpcConstants",{enumerable:!0,get:function(){return t.W3mFrameRpcConstants}});var t=r(d[0])},6228,[6229]);
__d(function(g,r,i,a,m,e,d){"use strict";Object.defineProperty(e,'__esModule',{value:!0}),Object.defineProperty(e,"SECURE_SITE_SDK",{enumerable:!0,get:function(){return _}}),Object.defineProperty(e,"DEFAULT_LOG_LEVEL",{enumerable:!0,get:function(){return E}}),Object.defineProperty(e,"SECURE_SITE_SDK_VERSION",{enumerable:!0,get:function(){return R}}),Object.defineProperty(e,"W3mFrameConstants",{enumerable:!0,get:function(){return C}}),Object.defineProperty(e,"W3mFrameRpcConstants",{enumerable:!0,get:function(){return S}});const _=('undefined'!=typeof process&&void 0!==process.env?process.env.NEXT_PUBLIC_SECURE_SITE_SDK_URL:void 0)||'https://secure.walletconnect.org/sdk',E=('undefined'!=typeof process&&void 0!==process.env?process.env.NEXT_PUBLIC_DEFAULT_LOG_LEVEL:void 0)||'error',R=('undefined'!=typeof process&&void 0!==process.env?process.env.NEXT_PUBLIC_SECURE_SITE_SDK_VERSION:void 0)||'4',C={APP_EVENT_KEY:'@w3m-app/',FRAME_EVENT_KEY:'@w3m-frame/',RPC_METHOD_KEY:'RPC_',STORAGE_KEY:'@appkit-wallet/',SESSION_TOKEN_KEY:'SESSION_TOKEN_KEY',EMAIL_LOGIN_USED_KEY:'EMAIL_LOGIN_USED_KEY',LAST_USED_CHAIN_KEY:'LAST_USED_CHAIN_KEY',LAST_EMAIL_LOGIN_TIME:'LAST_EMAIL_LOGIN_TIME',EMAIL:'EMAIL',PREFERRED_ACCOUNT_TYPE:'PREFERRED_ACCOUNT_TYPE',SMART_ACCOUNT_ENABLED:'SMART_ACCOUNT_ENABLED',SMART_ACCOUNT_ENABLED_NETWORKS:'SMART_ACCOUNT_ENABLED_NETWORKS',SOCIAL_USERNAME:'SOCIAL_USERNAME',APP_SWITCH_NETWORK:'@w3m-app/SWITCH_NETWORK',APP_CONNECT_EMAIL:'@w3m-app/CONNECT_EMAIL',APP_CONNECT_DEVICE:'@w3m-app/CONNECT_DEVICE',APP_CONNECT_OTP:'@w3m-app/CONNECT_OTP',APP_CONNECT_SOCIAL:'@w3m-app/CONNECT_SOCIAL',APP_GET_SOCIAL_REDIRECT_URI:'@w3m-app/GET_SOCIAL_REDIRECT_URI',APP_GET_USER:'@w3m-app/GET_USER',APP_SIGN_OUT:'@w3m-app/SIGN_OUT',APP_IS_CONNECTED:'@w3m-app/IS_CONNECTED',APP_GET_CHAIN_ID:'@w3m-app/GET_CHAIN_ID',APP_RPC_REQUEST:'@w3m-app/RPC_REQUEST',APP_UPDATE_EMAIL:'@w3m-app/UPDATE_EMAIL',APP_UPDATE_EMAIL_PRIMARY_OTP:'@w3m-app/UPDATE_EMAIL_PRIMARY_OTP',APP_UPDATE_EMAIL_SECONDARY_OTP:'@w3m-app/UPDATE_EMAIL_SECONDARY_OTP',APP_AWAIT_UPDATE_EMAIL:'@w3m-app/AWAIT_UPDATE_EMAIL',APP_SYNC_THEME:'@w3m-app/SYNC_THEME',APP_SYNC_DAPP_DATA:'@w3m-app/SYNC_DAPP_DATA',APP_GET_SMART_ACCOUNT_ENABLED_NETWORKS:'@w3m-app/GET_SMART_ACCOUNT_ENABLED_NETWORKS',APP_INIT_SMART_ACCOUNT:'@w3m-app/INIT_SMART_ACCOUNT',APP_SET_PREFERRED_ACCOUNT:'@w3m-app/SET_PREFERRED_ACCOUNT',APP_CONNECT_FARCASTER:'@w3m-app/CONNECT_FARCASTER',APP_GET_FARCASTER_URI:'@w3m-app/GET_FARCASTER_URI',APP_RELOAD:'@w3m-app/RELOAD',APP_RPC_ABORT:'@w3m-app/RPC_ABORT',FRAME_SWITCH_NETWORK_ERROR:'@w3m-frame/SWITCH_NETWORK_ERROR',FRAME_SWITCH_NETWORK_SUCCESS:'@w3m-frame/SWITCH_NETWORK_SUCCESS',FRAME_CONNECT_EMAIL_ERROR:'@w3m-frame/CONNECT_EMAIL_ERROR',FRAME_CONNECT_EMAIL_SUCCESS:'@w3m-frame/CONNECT_EMAIL_SUCCESS',FRAME_CONNECT_DEVICE_ERROR:'@w3m-frame/CONNECT_DEVICE_ERROR',FRAME_CONNECT_DEVICE_SUCCESS:'@w3m-frame/CONNECT_DEVICE_SUCCESS',FRAME_CONNECT_OTP_SUCCESS:'@w3m-frame/CONNECT_OTP_SUCCESS',FRAME_CONNECT_OTP_ERROR:'@w3m-frame/CONNECT_OTP_ERROR',FRAME_CONNECT_SOCIAL_SUCCESS:'@w3m-frame/CONNECT_SOCIAL_SUCCESS',FRAME_CONNECT_SOCIAL_ERROR:'@w3m-frame/CONNECT_SOCIAL_ERROR',FRAME_CONNECT_FARCASTER_SUCCESS:'@w3m-frame/CONNECT_FARCASTER_SUCCESS',FRAME_CONNECT_FARCASTER_ERROR:'@w3m-frame/CONNECT_FARCASTER_ERROR',FRAME_GET_FARCASTER_URI_SUCCESS:'@w3m-frame/GET_FARCASTER_URI_SUCCESS',FRAME_GET_FARCASTER_URI_ERROR:'@w3m-frame/GET_FARCASTER_URI_ERROR',FRAME_GET_SOCIAL_REDIRECT_URI_SUCCESS:'@w3m-frame/GET_SOCIAL_REDIRECT_URI_SUCCESS',FRAME_GET_SOCIAL_REDIRECT_URI_ERROR:'@w3m-frame/GET_SOCIAL_REDIRECT_URI_ERROR',FRAME_GET_USER_SUCCESS:'@w3m-frame/GET_USER_SUCCESS',FRAME_GET_USER_ERROR:'@w3m-frame/GET_USER_ERROR',FRAME_SIGN_OUT_SUCCESS:'@w3m-frame/SIGN_OUT_SUCCESS',FRAME_SIGN_OUT_ERROR:'@w3m-frame/SIGN_OUT_ERROR',FRAME_IS_CONNECTED_SUCCESS:'@w3m-frame/IS_CONNECTED_SUCCESS',FRAME_IS_CONNECTED_ERROR:'@w3m-frame/IS_CONNECTED_ERROR',FRAME_GET_CHAIN_ID_SUCCESS:'@w3m-frame/GET_CHAIN_ID_SUCCESS',FRAME_GET_CHAIN_ID_ERROR:'@w3m-frame/GET_CHAIN_ID_ERROR',FRAME_RPC_REQUEST_SUCCESS:'@w3m-frame/RPC_REQUEST_SUCCESS',FRAME_RPC_REQUEST_ERROR:'@w3m-frame/RPC_REQUEST_ERROR',FRAME_SESSION_UPDATE:'@w3m-frame/SESSION_UPDATE',FRAME_UPDATE_EMAIL_SUCCESS:'@w3m-frame/UPDATE_EMAIL_SUCCESS',FRAME_UPDATE_EMAIL_ERROR:'@w3m-frame/UPDATE_EMAIL_ERROR',FRAME_UPDATE_EMAIL_PRIMARY_OTP_SUCCESS:'@w3m-frame/UPDATE_EMAIL_PRIMARY_OTP_SUCCESS',FRAME_UPDATE_EMAIL_PRIMARY_OTP_ERROR:'@w3m-frame/UPDATE_EMAIL_PRIMARY_OTP_ERROR',FRAME_UPDATE_EMAIL_SECONDARY_OTP_SUCCESS:'@w3m-frame/UPDATE_EMAIL_SECONDARY_OTP_SUCCESS',FRAME_UPDATE_EMAIL_SECONDARY_OTP_ERROR:'@w3m-frame/UPDATE_EMAIL_SECONDARY_OTP_ERROR',FRAME_SYNC_THEME_SUCCESS:'@w3m-frame/SYNC_THEME_SUCCESS',FRAME_SYNC_THEME_ERROR:'@w3m-frame/SYNC_THEME_ERROR',FRAME_SYNC_DAPP_DATA_SUCCESS:'@w3m-frame/SYNC_DAPP_DATA_SUCCESS',FRAME_SYNC_DAPP_DATA_ERROR:'@w3m-frame/SYNC_DAPP_DATA_ERROR',FRAME_GET_SMART_ACCOUNT_ENABLED_NETWORKS_SUCCESS:'@w3m-frame/GET_SMART_ACCOUNT_ENABLED_NETWORKS_SUCCESS',FRAME_GET_SMART_ACCOUNT_ENABLED_NETWORKS_ERROR:'@w3m-frame/GET_SMART_ACCOUNT_ENABLED_NETWORKS_ERROR',FRAME_INIT_SMART_ACCOUNT_SUCCESS:'@w3m-frame/INIT_SMART_ACCOUNT_SUCCESS',FRAME_INIT_SMART_ACCOUNT_ERROR:'@w3m-frame/INIT_SMART_ACCOUNT_ERROR',FRAME_SET_PREFERRED_ACCOUNT_SUCCESS:'@w3m-frame/SET_PREFERRED_ACCOUNT_SUCCESS',FRAME_SET_PREFERRED_ACCOUNT_ERROR:'@w3m-frame/SET_PREFERRED_ACCOUNT_ERROR',FRAME_READY:'@w3m-frame/READY',FRAME_RELOAD_SUCCESS:'@w3m-frame/RELOAD_SUCCESS',FRAME_RELOAD_ERROR:'@w3m-frame/RELOAD_ERROR',FRAME_RPC_ABORT_SUCCESS:'@w3m-frame/RPC_ABORT_SUCCESS',FRAME_RPC_ABORT_ERROR:'@w3m-frame/RPC_ABORT_ERROR',RPC_RESPONSE_TYPE_ERROR:'RPC_RESPONSE_ERROR',RPC_RESPONSE_TYPE_TX:'RPC_RESPONSE_TRANSACTION_HASH',RPC_RESPONSE_TYPE_OBJECT:'RPC_RESPONSE_OBJECT'},S={SAFE_RPC_METHODS:['eth_accounts','eth_blockNumber','eth_call','eth_chainId','eth_estimateGas','eth_feeHistory','eth_gasPrice','eth_getAccount','eth_getBalance','eth_getBlockByHash','eth_getBlockByNumber','eth_getBlockReceipts','eth_getBlockTransactionCountByHash','eth_getBlockTransactionCountByNumber','eth_getCode','eth_getFilterChanges','eth_getFilterLogs','eth_getLogs','eth_getProof','eth_getStorageAt','eth_getTransactionByBlockHashAndIndex','eth_getTransactionByBlockNumberAndIndex','eth_getTransactionByHash','eth_getTransactionCount','eth_getTransactionReceipt','eth_getUncleCountByBlockHash','eth_getUncleCountByBlockNumber','eth_maxPriorityFeePerGas','eth_newBlockFilter','eth_newFilter','eth_newPendingTransactionFilter','eth_sendRawTransaction','eth_syncing','eth_uninstallFilter','wallet_getCapabilities','wallet_getCallsStatus','eth_getUserOperationReceipt','eth_estimateUserOperationGas','eth_getUserOperationByHash','eth_supportedEntryPoints','wallet_getAssets'],NOT_SAFE_RPC_METHODS:['personal_sign','eth_signTypedData_v4','eth_sendTransaction','solana_signMessage','solana_signTransaction','solana_signAllTransactions','solana_signAndSendTransaction','wallet_sendCalls','wallet_grantPermissions','wallet_revokePermissions','eth_sendUserOperation'],GET_CHAIN_ID:'eth_chainId',RPC_METHOD_NOT_ALLOWED_MESSAGE:'Requested RPC call is not allowed',RPC_METHOD_NOT_ALLOWED_UI_MESSAGE:'Action not allowed',ACCOUNT_TYPES:{EOA:'eoa',SMART_ACCOUNT:'smartAccount'}}},6229,[]);
__d(function(g,r,i,a,m,e,d){"use strict";Object.defineProperty(e,'__esModule',{value:!0}),Object.defineProperty(e,"ConnectorController",{enumerable:!0,get:function(){return T}});var t=r(d[0]),n=r(d[1]),o=r(d[2]),c=r(d[3]),s=r(d[4]),l=r(d[5]),C=r(d[6]),p=r(d[7]),h=r(d[8]),u=r(d[9]),f=r(d[10]),N=r(d[11]),b=r(d[12]);const y=Object.fromEntries(o.AVAILABLE_NAMESPACES.map(t=>[t,void 0])),I=Object.fromEntries(o.AVAILABLE_NAMESPACES.map(t=>[t,!0])),E=(0,t.proxy)({allConnectors:[],connectors:[],activeConnector:void 0,filterByNamespace:void 0,activeConnectorIds:y,filterByNamespaceMap:I}),A={state:E,subscribe:n=>(0,t.subscribe)(E,()=>{n(E)}),subscribeKey:(t,o)=>(0,n.subscribeKey)(E,t,o),initialize(t){t.forEach(t=>{const n=C.StorageUtil.getConnectedConnectorId(t);n&&T.setConnectorId(n,t)})},setActiveConnector(n){n&&(E.activeConnector=(0,t.ref)(n))},setConnectors(n){n.filter(t=>!E.allConnectors.some(n=>n.id===t.id&&T.getConnectorName(n.name)===T.getConnectorName(t.name)&&n.chain===t.chain)).forEach(n=>{'MULTI_CHAIN'!==n.type&&E.allConnectors.push((0,t.ref)(n))});const o=T.getEnabledNamespaces(),c=T.getEnabledConnectors(o);E.connectors=T.mergeMultiChainConnectors(c)},filterByNamespaces(t){Object.keys(E.filterByNamespaceMap).forEach(t=>{E.filterByNamespaceMap[t]=!1}),t.forEach(t=>{E.filterByNamespaceMap[t]=!0}),T.updateConnectorsForEnabledNamespaces()},filterByNamespace(t,n){E.filterByNamespaceMap[t]=n,T.updateConnectorsForEnabledNamespaces()},updateConnectorsForEnabledNamespaces(){const t=T.getEnabledNamespaces(),n=T.getEnabledConnectors(t),o=T.areAllNamespacesEnabled();E.connectors=T.mergeMultiChainConnectors(n),o?h.ApiController.clearFilterByNamespaces():h.ApiController.filterByNamespaces(t)},getEnabledNamespaces:()=>Object.entries(E.filterByNamespaceMap).filter(([t,n])=>n).map(([t])=>t),getEnabledConnectors:t=>E.allConnectors.filter(n=>t.includes(n.chain)),areAllNamespacesEnabled:()=>Object.values(E.filterByNamespaceMap).every(t=>t),mergeMultiChainConnectors(t){const n=T.generateConnectorMapByName(t),c=[];return n.forEach(t=>{const n=t[0],s=n?.id===o.ConstantsUtil.CONNECTOR_ID.AUTH;t.length>1&&n?c.push({name:n.name,imageUrl:n.imageUrl,imageId:n.imageId,connectors:[...t],type:s?'AUTH':'MULTI_CHAIN',chain:'eip155',id:n?.id||''}):n&&c.push(n)}),c},generateConnectorMapByName(t){const n=new Map;return t.forEach(t=>{const{name:o}=t,c=T.getConnectorName(o);if(!c)return;const s=n.get(c)||[];s.find(n=>n.chain===t.chain)||s.push(t),n.set(c,s)}),n},getConnectorName(t){if(!t)return t;return{'Trust Wallet':'Trust'}[t]||t},getUniqueConnectorsByName(t){const n=[];return t.forEach(t=>{n.find(n=>n.chain===t.chain)||n.push(t)}),n},addConnector(n){if(n.id===o.ConstantsUtil.CONNECTOR_ID.AUTH){const c=n,s=(0,t.snapshot)(f.OptionsController.state),l=b.ThemeController.getSnapshot().themeMode,C=b.ThemeController.getSnapshot().themeVariables;c?.provider?.syncDappData?.({metadata:s.metadata,sdkVersion:s.sdkVersion,projectId:s.projectId,sdkType:s.sdkType}),c?.provider?.syncTheme({themeMode:l,themeVariables:C,w3mThemeVariables:(0,o.getW3mThemeVariables)(C,l)}),T.setConnectors([n])}else T.setConnectors([n])},getAuthConnector(t){const n=t||u.ChainController.state.activeChain,c=E.connectors.find(t=>t.id===o.ConstantsUtil.CONNECTOR_ID.AUTH);if(c){if(c?.connectors?.length){return c.connectors.find(t=>t.chain===n)}return c}},getAnnouncedConnectorRdns:()=>E.connectors.filter(t=>'ANNOUNCED'===t.type).map(t=>t.info?.rdns),getConnectorById:t=>E.allConnectors.find(n=>n.id===t),getConnector({id:t,rdns:n,namespace:o}){const c=o||u.ChainController.state.activeChain;return E.allConnectors.filter(t=>t.chain===c).find(o=>o.explorerId===t||o.info?.rdns===n)},syncIfAuthConnector(n){if('ID_AUTH'!==n.id)return;const c=n,s=(0,t.snapshot)(f.OptionsController.state),l=b.ThemeController.getSnapshot().themeMode,C=b.ThemeController.getSnapshot().themeVariables;c?.provider?.syncDappData?.({metadata:s.metadata,sdkVersion:s.sdkVersion,sdkType:s.sdkType,projectId:s.projectId}),c.provider.syncTheme({themeMode:l,themeVariables:C,w3mThemeVariables:(0,o.getW3mThemeVariables)(C,l)})},getConnectorsByNamespace(t){const n=E.allConnectors.filter(n=>n.chain===t);return T.mergeMultiChainConnectors(n)},canSwitchToSmartAccount:t=>u.ChainController.checkIfSmartAccountEnabled()&&(0,s.getPreferredAccountType)(t)===c.W3mFrameRpcConstants.ACCOUNT_TYPES.EOA,selectWalletConnector(t){const n=N.RouterController.state.data?.redirectView,o=T.getConnector({id:t.id,rdns:t.rdns});l.MobileWalletUtil.handleMobileDeeplinkRedirect(o?.explorerId||t.id,u.ChainController.state.activeChain),o?N.RouterController.push('ConnectingExternal',{connector:o,wallet:t,redirectView:n}):N.RouterController.push('ConnectingWalletConnect',{wallet:t,redirectView:n})},getConnectors:t=>t?T.getConnectorsByNamespace(t):T.mergeMultiChainConnectors(E.allConnectors),setFilterByNamespace(t){E.filterByNamespace=t,E.connectors=T.getConnectors(t),h.ApiController.setFilterByNamespace(t)},setConnectorId(t,n){t&&(E.activeConnectorIds=Object.assign({},E.activeConnectorIds,{[n]:t}),C.StorageUtil.setConnectedConnectorId(n,t))},removeConnectorId(t){E.activeConnectorIds=Object.assign({},E.activeConnectorIds,{[t]:void 0}),C.StorageUtil.deleteConnectedConnectorId(t)},getConnectorId(t){if(t)return E.activeConnectorIds[t]},isConnected:t=>t?Boolean(E.activeConnectorIds[t]):Object.values(E.activeConnectorIds).some(t=>Boolean(t)),resetConnectorIds(){E.activeConnectorIds=Object.assign({},y)}},T=(0,p.withErrorBoundary)(A)},6230,[4209,4217,6192,6228,6226,6231,6216,6232,6234,6218,6222,6238,6239]);
__d(function(g,r,i,a,m,e,d){"use strict";Object.defineProperty(e,'__esModule',{value:!0}),Object.defineProperty(e,"CUSTOM_DEEPLINK_WALLETS",{enumerable:!0,get:function(){return o}}),Object.defineProperty(e,"MobileWalletUtil",{enumerable:!0,get:function(){return c}});var t=r(d[0]),n=r(d[1]);const o={PHANTOM:{id:'a797aa35c0fadbfc1a53e7f675162ed5226968b44a19ee3d24385c64d1d3c393',url:'https://phantom.app'},SOLFLARE:{id:'1ca0bdd4747578705b1939af023d120677c64fe6ca76add81fda36e350605e79',url:'https://solflare.com'},COINBASE:{id:'fd20dc426fb37566d803205b19bbc1d4096b248ac04548e3cfb6b3a38bd033aa',url:'https://go.cb-w.com'},BINANCE:{id:'2fafea35bb471d22889ccb49c08d99dd0a18a37982602c33f696a5723934ba25',appId:'yFK5FCqYprrXDiVFbhyRx7',deeplink:'bnc://app.binance.com/mp/app',url:'https://app.binance.com/en/download'}},c={handleMobileDeeplinkRedirect(c,s){const l=window.location.href,p=encodeURIComponent(l);if(c===o.PHANTOM.id&&!('phantom'in window)){const t=l.startsWith('https')?'https':'http',n=l.split('/')[2],c=encodeURIComponent(`${t}://${n}`);window.location.href=`${o.PHANTOM.url}/ul/browse/${p}?ref=${c}`}if(c!==o.SOLFLARE.id||'solflare'in window||(window.location.href=`${o.SOLFLARE.url}/ul/v1/browse/${p}?ref=${p}`),s===t.ConstantsUtil.CHAIN.SOLANA&&(c!==o.COINBASE.id||'coinbaseSolana'in window||(window.location.href=`${o.COINBASE.url}/dapp?cb_url=${p}`)),s===t.ConstantsUtil.CHAIN.BITCOIN&&c===o.BINANCE.id&&!('binancew3w'in window)){const t=n.ChainController.state.activeCaipNetwork,c=window.btoa('/pages/browser/index'),s=window.btoa(`url=${p}&defaultChainId=${t?.id??1}`),l=new URL(o.BINANCE.deeplink);l.searchParams.set('appId',o.BINANCE.appId),l.searchParams.set('startPagePath',c),l.searchParams.set('startPageQuery',s);const b=new URL(o.BINANCE.url);b.searchParams.set('_dp',window.btoa(l.toString())),window.location.href=b.toString()}}}},6231,[6192,6218]);
__d(function(g,r,i,a,m,e,d){"use strict";Object.defineProperty(e,'__esModule',{value:!0}),Object.defineProperty(e,"AppKitError",{enumerable:!0,get:function(){return n}}),e.withErrorBoundary=function(t,n="INTERNAL_SDK_ERROR"){const s={};return Object.keys(t).forEach(c=>{const u=t[c];if('function'==typeof u){let t=u;t='AsyncFunction'===u.constructor.name?async(...t)=>{try{return await u(...t)}catch(t){return o(t,n)}}:(...t)=>{try{return u(...t)}catch(t){return o(t,n)}},s[c]=t}else s[c]=u}),s};var t=r(d[0]);class n extends Error{constructor(t,o,s){super(t),this.originalName='AppKitError',this.name='AppKitError',this.category=o,this.originalError=s,s&&s instanceof Error&&(this.originalName=s.name),Object.setPrototypeOf(this,n.prototype);let c=!1;if(s instanceof Error&&'string'==typeof s.stack&&s.stack){const t=s.stack,n=t.indexOf('\n');if(n>-1){const o=t.substring(n+1);this.stack=`${this.name}: ${this.message}\n${o}`,c=!0}}c||(Error.captureStackTrace?Error.captureStackTrace(this,n):this.stack||(this.stack=`${this.name}: ${this.message}`))}}function o(o,s){let c='';try{c=o instanceof Error?o.message:'string'==typeof o?o:'object'==typeof o&&null!==o?0===Object.keys(o).length?'Unknown error':o?.message||JSON.stringify(o):String(o)}catch(t){c='Unknown error',console.error('Error parsing error message',t)}const u=o instanceof n?o:new n(c,s,o);throw t.TelemetryController.sendError(u,u.category),u}},6232,[6233]);
__d(function(g,r,i,a,m,e,d){"use strict";Object.defineProperty(e,'__esModule',{value:!0}),Object.defineProperty(e,"TelemetryController",{enumerable:!0,get:function(){return u}});var t=r(d[0]),n=r(d[1]),s=r(d[2]),o=r(d[3]),l=r(d[4]);const c=Object.freeze({enabled:!0,events:[]}),p=new o.FetchUtil({baseUrl:s.CoreHelperUtil.getAnalyticsUrl(),clientId:null}),b=(0,t.proxy)(Object.assign({},c)),u={state:b,subscribeKey:(t,s)=>(0,n.subscribeKey)(b,t,s),async sendError(t,n){if(!b.enabled)return;const o=Date.now();if(b.events.filter(t=>{const n=new Date(t.properties.timestamp||'').getTime();return o-n<6e4}).length>=5)return;const c={type:'error',event:n,properties:{errorType:t.name,errorMessage:t.message,stackTrace:t.stack,timestamp:(new Date).toISOString()}};b.events.push(c);try{if('undefined'==typeof window)return;const{projectId:o,sdkType:c,sdkVersion:b}=l.OptionsController.state;await p.post({path:'/e',params:{projectId:o,st:c,sv:b||'html-wagmi-4.2.2'},body:{eventId:s.CoreHelperUtil.getUUID(),url:window.location.href,domain:window.location.hostname,timestamp:(new Date).toISOString(),props:{type:'error',event:n,errorType:t.name,errorMessage:t.message,stackTrace:t.stack}}})}catch{}},enable(){b.enabled=!0},disable(){b.enabled=!1},clearEvents(){b.events=[]}}},6233,[4209,4217,6214,6221,6222]);
__d(function(g,_r,i,_a,m,e,_d){"use strict";Object.defineProperty(e,'__esModule',{value:!0}),Object.defineProperty(e,"api",{enumerable:!0,get:function(){return W}}),Object.defineProperty(e,"ApiController",{enumerable:!0,get:function(){return _}});var t=_r(_d[0]),a=_r(_d[1]),l=_r(_d[2]),s=_r(_d[3]),r=_r(_d[4]),n=_r(_d[5]),o=_r(_d[6]),c=_r(_d[7]),d=_r(_d[8]),p=_r(_d[9]),f=_r(_d[10]),u=_r(_d[11]),h=_r(_d[12]);const C=r.CoreHelperUtil.getApiUrl(),W=new n.FetchUtil({baseUrl:C,clientId:null}),I=(0,t.proxy)({promises:{},page:1,count:0,featured:[],allFeatured:[],recommended:[],allRecommended:[],wallets:[],filteredWallets:[],search:[],isAnalyticsEnabled:!1,excludedWallets:[],isFetchingRecommendedWallets:!1,explorerWallets:[],explorerFilteredWallets:[]}),_={state:I,subscribeKey:(t,l)=>(0,a.subscribeKey)(I,t,l),_getSdkProperties(){const{projectId:t,sdkType:a,sdkVersion:l}=h.OptionsController.state;return{projectId:t,st:a||'appkit',sv:l||'html-wagmi-4.2.2'}},_filterOutExtensions:t=>h.OptionsController.state.isUniversalProvider?t.filter(t=>Boolean(t.mobile_link||t.desktop_link||t.webapp_link)):t,async _fetchWalletImage(t){const a=`${W.baseUrl}/getWalletImage/${t}`,l=await W.getBlob({path:a,params:_._getSdkProperties()});d.AssetController.setWalletImage(t,URL.createObjectURL(l))},async _fetchNetworkImage(t){const a=`${W.baseUrl}/public/getAssetImage/${t}`,l=await W.getBlob({path:a,params:_._getSdkProperties()});d.AssetController.setNetworkImage(t,URL.createObjectURL(l))},async _fetchConnectorImage(t){const a=`${W.baseUrl}/public/getAssetImage/${t}`,l=await W.getBlob({path:a,params:_._getSdkProperties()});d.AssetController.setConnectorImage(t,URL.createObjectURL(l))},async _fetchCurrencyImage(t){const a=`${W.baseUrl}/public/getCurrencyImage/${t}`,l=await W.getBlob({path:a,params:_._getSdkProperties()});d.AssetController.setCurrencyImage(t,URL.createObjectURL(l))},async _fetchTokenImage(t){const a=`${W.baseUrl}/public/getTokenImage/${t}`,l=await W.getBlob({path:a,params:_._getSdkProperties()});d.AssetController.setTokenImage(t,URL.createObjectURL(l))},_filterWalletsByPlatform(t){const a=t.length,l=r.CoreHelperUtil.isMobile()?t?.filter(t=>{if(t.mobile_link||t.webapp_link)return!0;return Object.values(o.CUSTOM_DEEPLINK_WALLETS).map(t=>t.id).includes(t.id)}):t;return{filteredWallets:l,mobileFilteredOutWalletsLength:a-l.length}},fetchProjectConfig:async()=>(await W.get({path:'/appkit/v1/config',params:_._getSdkProperties()})).features,async fetchAllowedOrigins(){try{const{allowedOrigins:t}=await W.get({path:'/projects/v1/origins',params:_._getSdkProperties()});return t}catch(t){if(t instanceof Error&&t.cause instanceof Response){const a=t.cause.status;if(a===l.ConstantsUtil.HTTP_STATUS_CODES.TOO_MANY_REQUESTS)throw new Error('RATE_LIMITED',{cause:t});if(a>=l.ConstantsUtil.HTTP_STATUS_CODES.SERVER_ERROR&&a<600)throw new Error('SERVER_ERROR',{cause:t});return[]}return[]}},async fetchNetworkImages(){const t=p.ChainController.getAllRequestedCaipNetworks(),a=t?.map(({assets:t})=>t?.imageId).filter(Boolean).filter(t=>!s.AssetUtil.getNetworkImageById(t));a&&await Promise.allSettled(a.map(t=>_._fetchNetworkImage(t)))},async fetchConnectorImages(){const{connectors:t}=f.ConnectorController.state,a=t.map(({imageId:t})=>t).filter(Boolean);await Promise.allSettled(a.map(t=>_._fetchConnectorImage(t)))},async fetchCurrencyImages(t=[]){await Promise.allSettled(t.map(t=>_._fetchCurrencyImage(t)))},async fetchTokenImages(t=[]){await Promise.allSettled(t.map(t=>_._fetchTokenImage(t)))},async fetchWallets(t){const a=t.exclude??[];_._getSdkProperties().sv.startsWith('html-core-')&&a.push(...Object.values(o.CUSTOM_DEEPLINK_WALLETS).map(t=>t.id));const l=await W.get({path:'/getWallets',params:Object.assign({},_._getSdkProperties(),t,{page:String(t.page),entries:String(t.entries),include:t.include?.join(','),exclude:a.join(',')})}),{filteredWallets:s,mobileFilteredOutWalletsLength:r}=_._filterWalletsByPlatform(l?.data);return{data:s||[],count:l?.count,mobileFilteredOutWalletsLength:r}},async prefetchWalletRanks(){const t=f.ConnectorController.state.connectors;if(!t?.length)return;const a={page:1,entries:20,badge:'certified'};if(a.names=t.map(t=>t.name).join(','),p.ChainController.state.activeChain===l.ConstantsUtil.CHAIN.EVM){const l=[...t.flatMap(t=>t.connectors?.map(t=>t.info?.rdns)||[]),...t.map(t=>t.info?.rdns)].filter(t=>'string'==typeof t&&t.length>0);l.length&&(a.rdns=l.join(','))}const{data:s}=await _.fetchWallets(a);I.explorerWallets=s;const r=p.ChainController.getRequestedCaipNetworkIds().join(',');I.explorerFilteredWallets=s.filter(t=>t.chains?.some(t=>r.includes(t)))},async fetchFeaturedWallets(){const{featuredWalletIds:t}=h.OptionsController.state;if(t?.length){const a=Object.assign({},_._getSdkProperties(),{page:1,entries:t?.length??4,include:t}),{data:l}=await _.fetchWallets(a),s=[...l].sort((a,l)=>t.indexOf(a.id)-t.indexOf(l.id)),r=s.map(t=>t.image_id).filter(Boolean);await Promise.allSettled(r.map(t=>_._fetchWalletImage(t))),I.featured=s,I.allFeatured=s}},async fetchRecommendedWallets(){try{I.isFetchingRecommendedWallets=!0;const{includeWalletIds:t,excludeWalletIds:a,featuredWalletIds:l}=h.OptionsController.state,s=[...a??[],...l??[]].filter(Boolean),r={page:1,entries:4,include:t,exclude:s,chains:p.ChainController.getRequestedCaipNetworkIds().join(',')},{data:n,count:o}=await _.fetchWallets(r),d=c.StorageUtil.getRecentWallets(),f=n.map(t=>t.image_id).filter(Boolean),u=d.map(t=>t.image_id).filter(Boolean);await Promise.allSettled([...f,...u].map(t=>_._fetchWalletImage(t))),I.recommended=n,I.allRecommended=n,I.count=o??0}catch{}finally{I.isFetchingRecommendedWallets=!1}},async fetchWalletsByPage({page:t}){const{includeWalletIds:a,excludeWalletIds:l,featuredWalletIds:s}=h.OptionsController.state,n=p.ChainController.getRequestedCaipNetworkIds().join(','),o={page:t,entries:40,include:a,exclude:[...I.recommended.map(({id:t})=>t),...l??[],...s??[]].filter(Boolean),chains:n},{data:c,count:d,mobileFilteredOutWalletsLength:f}=await _.fetchWallets(o);I.mobileFilteredOutWalletsLength=f+(I.mobileFilteredOutWalletsLength??0);const u=c.slice(0,20).map(t=>t.image_id).filter(Boolean);await Promise.allSettled(u.map(t=>_._fetchWalletImage(t))),I.wallets=r.CoreHelperUtil.uniqueBy([...I.wallets,..._._filterOutExtensions(c)],'id').filter(t=>t.chains?.some(t=>n.includes(t))),I.count=d>I.count?d:I.count,I.page=t},async initializeExcludedWallets({ids:t}){const a={page:1,entries:t.length,include:t},{data:l}=await _.fetchWallets(a);l&&l.forEach(t=>{I.excludedWallets.push({rdns:t.rdns,name:t.name})})},async searchWallet({search:t,badge:a}){const{includeWalletIds:l,excludeWalletIds:s}=h.OptionsController.state,n=p.ChainController.getRequestedCaipNetworkIds().join(',');I.search=[];const o={page:1,entries:100,search:t?.trim(),badge_type:a,include:l,exclude:s,chains:n},{data:c}=await _.fetchWallets(o);u.EventsController.sendEvent({type:'track',event:'SEARCH_WALLET',properties:{badge:a??'',search:t??''}});const d=c.map(t=>t.image_id).filter(Boolean);await Promise.allSettled([...d.map(t=>_._fetchWalletImage(t)),r.CoreHelperUtil.wait(300)]),I.search=_._filterOutExtensions(c)},initPromise(t,a){const l=I.promises[t];return l||(I.promises[t]=a())},prefetch({fetchConnectorImages:t=!0,fetchFeaturedWallets:a=!0,fetchRecommendedWallets:l=!0,fetchNetworkImages:s=!0,fetchWalletRanks:r=!0}={}){const n=[t&&_.initPromise('connectorImages',_.fetchConnectorImages),a&&_.initPromise('featuredWallets',_.fetchFeaturedWallets),l&&_.initPromise('recommendedWallets',_.fetchRecommendedWallets),s&&_.initPromise('networkImages',_.fetchNetworkImages),r&&_.initPromise('walletRanks',_.prefetchWalletRanks)].filter(Boolean);return Promise.allSettled(n)},prefetchAnalyticsConfig(){h.OptionsController.state.features?.analytics&&_.fetchAnalyticsConfig()},async fetchAnalyticsConfig(){try{const{isAnalyticsEnabled:t}=await W.get({path:'/getAnalyticsConfig',params:_._getSdkProperties()});h.OptionsController.setFeatures({analytics:t})}catch(t){h.OptionsController.setFeatures({analytics:!1})}},filterByNamespaces(t){if(!t?.length)return I.featured=I.allFeatured,void(I.recommended=I.allRecommended);const a=p.ChainController.getRequestedCaipNetworkIds().join(',');I.featured=I.allFeatured.filter(t=>t.chains?.some(t=>a.includes(t))),I.recommended=I.allRecommended.filter(t=>t.chains?.some(t=>a.includes(t))),I.filteredWallets=I.wallets.filter(t=>t.chains?.some(t=>a.includes(t)))},clearFilterByNamespaces(){I.filteredWallets=[]},setFilterByNamespace(t){if(!t)return I.featured=I.allFeatured,void(I.recommended=I.allRecommended);const a=p.ChainController.getRequestedCaipNetworkIds().join(',');I.featured=I.allFeatured.filter(t=>t.chains?.some(t=>a.includes(t))),I.recommended=I.allRecommended.filter(t=>t.chains?.some(t=>a.includes(t))),I.filteredWallets=I.wallets.filter(t=>t.chains?.some(t=>a.includes(t)))}}},6234,[4209,4217,6192,6235,6214,6221,6231,6216,6236,6218,6230,6237,6222]);
__d(function(g,r,i,a,m,e,d){"use strict";Object.defineProperty(e,'__esModule',{value:!0}),Object.defineProperty(e,"AssetUtil",{enumerable:!0,get:function(){return I}});var t=r(d[0]),s=r(d[1]),o=r(d[2]);const n={eip155:'ba0ba0cd-17c6-4806-ad93-f9d174f17900',solana:'a1b58899-f671-4276-6a5e-56ca5bd59700',polkadot:'',bip122:'0b4838db-0161-4ffe-022d-532bf03dba00',cosmos:'',sui:'',stacks:''},l=(0,t.proxy)({networkImagePromises:{}}),I={async fetchWalletImage(t){if(t)return await s.ApiController._fetchWalletImage(t),this.getWalletImageById(t)},async fetchNetworkImage(t){if(!t)return;const o=this.getNetworkImageById(t);return o||(l.networkImagePromises[t]||(l.networkImagePromises[t]=s.ApiController._fetchNetworkImage(t)),await l.networkImagePromises[t],this.getNetworkImageById(t))},getWalletImageById(t){if(t)return o.AssetController.state.walletImages[t]},getWalletImage:t=>t?.image_url?t?.image_url:t?.image_id?o.AssetController.state.walletImages[t.image_id]:void 0,getNetworkImage:t=>t?.assets?.imageUrl?t?.assets?.imageUrl:t?.assets?.imageId?o.AssetController.state.networkImages[t.assets.imageId]:void 0,getNetworkImageById(t){if(t)return o.AssetController.state.networkImages[t]},getConnectorImage:t=>t?.imageUrl?t.imageUrl:t?.info?.icon?t.info.icon:t?.imageId?o.AssetController.state.connectorImages[t.imageId]:void 0,getChainImage:t=>o.AssetController.state.networkImages[n[t]],getTokenImage(t){if(t)return o.AssetController.state.tokenImages[t]}}},6235,[4209,6234,6236]);
__d(function(g,r,i,a,m,e,d){"use strict";Object.defineProperty(e,'__esModule',{value:!0}),Object.defineProperty(e,"AssetController",{enumerable:!0,get:function(){return I}});var s=r(d[0]),t=r(d[1]),n=r(d[2]);const o=(0,s.proxy)({walletImages:{},networkImages:{},chainImages:{},connectorImages:{},tokenImages:{},currencyImages:{}}),c={state:o,subscribeNetworkImages:t=>(0,s.subscribe)(o.networkImages,()=>t(o.networkImages)),subscribeKey:(s,n)=>(0,t.subscribeKey)(o,s,n),subscribe:t=>(0,s.subscribe)(o,()=>t(o)),setWalletImage(s,t){o.walletImages[s]=t},setNetworkImage(s,t){o.networkImages[s]=t},setChainImage(s,t){o.chainImages[s]=t},setConnectorImage(s,t){o.connectorImages=Object.assign({},o.connectorImages,{[s]:t})},setTokenImage(s,t){o.tokenImages[s]=t},setCurrencyImage(s,t){o.currencyImages[s]=t}},I=(0,n.withErrorBoundary)(c)},6236,[4209,4217,6232]);
__d(function(g,r,i,a,m,e,d){"use strict";Object.defineProperty(e,'__esModule',{value:!0}),Object.defineProperty(e,"EventsController",{enumerable:!0,get:function(){return h}});var t=r(d[0]),n=r(d[1]),s=r(d[2]),o=r(d[3]),l=r(d[4]);const p=n.CoreHelperUtil.getAnalyticsUrl(),c=new s.FetchUtil({baseUrl:p,clientId:null}),u=['MODAL_CREATED'],E=(0,t.proxy)({timestamp:Date.now(),lastFlush:Date.now(),reportedErrors:{},data:{type:'track',event:'MODAL_CREATED'},pendingEvents:[],subscribedToVisibilityChange:!1,walletImpressions:[]}),h={state:E,subscribe:n=>(0,t.subscribe)(E,()=>n(E)),getSdkProperties(){const{projectId:t,sdkType:n,sdkVersion:s}=l.OptionsController.state;return{projectId:t,st:n,sv:s||'html-wagmi-4.2.2'}},shouldFlushEvents(){const t=JSON.stringify(E.pendingEvents).length/1024>45,n=E.lastFlush+1e4<Date.now();return t||n},_setPendingEvent(t){try{let s=o.ChainController.getAccountData()?.address;if('address'in t.data&&t.data.address&&(s=t.data.address),u.includes(t.data.event)||'undefined'==typeof window)return;const l=o.ChainController.getActiveCaipNetwork()?.caipNetworkId;this.state.pendingEvents.push({eventId:n.CoreHelperUtil.getUUID(),url:window.location.href,domain:window.location.hostname,timestamp:t.timestamp,props:Object.assign({},t.data,{address:s,properties:Object.assign({},'properties'in t.data?t.data.properties:{},{caipNetworkId:l})})}),E.reportedErrors.FORBIDDEN=!1;h.shouldFlushEvents()&&h._submitPendingEvents()}catch(t){console.warn('_setPendingEvent',t)}},sendEvent(t){E.timestamp=Date.now(),E.data=t;(l.OptionsController.state.features?.analytics||['INITIALIZE','CONNECT_SUCCESS','SOCIAL_LOGIN_SUCCESS'].includes(t.event))&&h._setPendingEvent(E),this.subscribeToFlushTriggers()},sendWalletImpressionEvent(t){E.walletImpressions.push(t)},_transformPendingEventsForBatch(t){try{return t.filter(t=>'WALLET_IMPRESSION'!==t.props.event)}catch{return t}},_submitPendingEvents(){if(E.lastFlush=Date.now(),0!==E.pendingEvents.length||0!==E.walletImpressions.length)try{const t=h._transformPendingEventsForBatch(E.pendingEvents);E.walletImpressions.length&&t.push({eventId:n.CoreHelperUtil.getUUID(),url:window.location.href,domain:window.location.hostname,timestamp:Date.now(),props:{type:'track',event:'WALLET_IMPRESSION',items:[...E.walletImpressions]}}),c.sendBeacon({path:'/batch',params:h.getSdkProperties(),body:t}),E.reportedErrors.FORBIDDEN=!1,E.pendingEvents=[],E.walletImpressions=[]}catch(t){E.reportedErrors.FORBIDDEN=!0}},subscribeToFlushTriggers(){E.subscribedToVisibilityChange||'undefined'!=typeof document&&(E.subscribedToVisibilityChange=!0,document?.addEventListener?.('visibilitychange',()=>{'hidden'===document.visibilityState&&h._submitPendingEvents()}),document?.addEventListener?.('freeze',()=>{h._submitPendingEvents()}),window?.addEventListener?.('pagehide',()=>{h._submitPendingEvents()}),setInterval(()=>{h._submitPendingEvents()},1e4))}}},6237,[4209,6214,6221,6218,6222]);
__d(function(g,r,i,a,m,e,d){"use strict";Object.defineProperty(e,'__esModule',{value:!0}),Object.defineProperty(e,"RouterController",{enumerable:!0,get:function(){return u}});var t=r(d[0]),o=r(d[1]),s=r(d[2]),n=r(d[3]),c=r(d[4]),l=r(d[5]),h=r(d[6]);const p=(0,t.proxy)({view:'Connect',history:['Connect'],transactionStack:[]}),y={state:p,subscribeKey:(t,s)=>(0,o.subscribeKey)(p,t,s),pushTransactionStack(t){p.transactionStack.push(t)},popTransactionStack(t){const o=p.transactionStack.pop();if(!o)return;const{onSuccess:s,onError:n,onCancel:c}=o;switch(t){case'success':s?.();break;case'error':n?.(),u.goBack();break;case'cancel':c?.(),u.goBack()}},push(t,o){t!==p.view&&(p.view=t,p.history.push(t),p.data=o)},reset(t,o){p.view=t,p.history=[t],p.data=o},replace(t,o){p.history.at(-1)===t||(p.view=t,p.history[p.history.length-1]=t,p.data=o)},goBack(){const o=n.ChainController.state.activeCaipAddress,s='ConnectingFarcaster'===u.state.view,y=!o&&s;if(p.history.length>1){p.history.pop();const[t]=p.history.slice(-1);if(t){const s='Connect'===t;p.view=o&&s?'Account':t}}else l.ModalController.close();p.data?.wallet&&(p.data.wallet=void 0),p.data?.redirectView&&(p.data.redirectView=void 0),setTimeout(()=>{if(y){n.ChainController.setAccountProp('farcasterUrl',void 0,n.ChainController.state.activeChain);const o=c.ConnectorController.getAuthConnector();o?.provider?.reload();const s=(0,t.snapshot)(h.OptionsController.state);o?.provider?.syncDappData?.({metadata:s.metadata,sdkVersion:s.sdkVersion,projectId:s.projectId,sdkType:s.sdkType})}},100)},goBackToIndex(t){if(p.history.length>1){p.history=p.history.slice(0,t+1);const[o]=p.history.slice(-1);o&&(p.view=o)}},goBackOrCloseModal(){u.state.history.length>1?u.goBack():l.ModalController.close()}},u=(0,s.withErrorBoundary)(y)},6238,[4209,4217,6232,6218,6230,6213,6222]);
__d(function(g,r,i,a,m,e,d){"use strict";Object.defineProperty(e,'__esModule',{value:!0}),Object.defineProperty(e,"ThemeController",{enumerable:!0,get:function(){return l}});var t=r(d[0]),o=r(d[1]),n=r(d[2]),s=r(d[3]);const h=(0,t.proxy)({themeMode:'dark',themeVariables:{},w3mThemeVariables:void 0}),c={state:h,subscribe:o=>(0,t.subscribe)(h,()=>o(h)),setThemeMode(t){h.themeMode=t;try{const n=s.ConnectorController.getAuthConnector();if(n){const s=c.getSnapshot().themeVariables;n.provider.syncTheme({themeMode:t,themeVariables:s,w3mThemeVariables:(0,o.getW3mThemeVariables)(s,t)})}}catch{console.info('Unable to sync theme to auth connector')}},setThemeVariables(t){h.themeVariables=Object.assign({},h.themeVariables,t);try{const t=s.ConnectorController.getAuthConnector();if(t){const n=c.getSnapshot().themeVariables;t.provider.syncTheme({themeVariables:n,w3mThemeVariables:(0,o.getW3mThemeVariables)(h.themeVariables,h.themeMode)})}}catch{console.info('Unable to sync theme to auth connector')}},getSnapshot:()=>(0,t.snapshot)(h)},l=(0,n.withErrorBoundary)(c)},6239,[4209,6192,6232,6230]);
__d(function(g,r,i,a,m,e,d){"use strict";Object.defineProperty(e,'__esModule',{value:!0}),Object.defineProperty(e,"ConnectionControllerUtil",{enumerable:!0,get:function(){return c}}),r(d[0]);var n=r(d[1]),o=r(d[2]),t=r(d[3]);const c={getConnectionStatus(t,c){const s=o.ConnectorController.state.activeConnectorIds[c],C=n.ConnectionController.getConnections(c);if(Boolean(s)&&t.connectorId===s)return'connected';return C.some(n=>n.connectorId.toLowerCase()===t.connectorId.toLowerCase())?'active':'disconnected'},excludeConnectorAddressFromConnections:({connections:n,connectorId:o,addresses:t})=>n.map(n=>{if(!!o&&n.connectorId.toLowerCase()===o.toLowerCase()&&t){const o=n.accounts.filter(n=>!t.some(o=>o.toLowerCase()===n.address.toLowerCase()));return Object.assign({},n,{accounts:o})}return n}),excludeExistingConnections(n,o){const t=new Set(n);return o.filter(n=>!t.has(n.connectorId))},getConnectionsByConnectorId:(n,o)=>n.filter(n=>n.connectorId.toLowerCase()===o.toLowerCase()),getConnectionsData(s){const C=Boolean(t.OptionsController.state.remoteFeatures?.multiWallet),l=o.ConnectorController.state.activeConnectorIds[s],u=n.ConnectionController.getConnections(s),I=(n.ConnectionController.state.recentConnections.get(s)??[]).filter(n=>o.ConnectorController.getConnectorById(n.connectorId)),f=c.excludeExistingConnections([...u.map(n=>n.connectorId),...l?[l]:[]],I);return C?{connections:u,recentConnections:f}:{connections:u.filter(n=>n.connectorId.toLowerCase()===l?.toLowerCase()),recentConnections:[]}}}},6240,[6192,6225,6230,6222]);
__d(function(g,r,i,_a,m,e,d){"use strict";Object.defineProperty(e,'__esModule',{value:!0}),Object.defineProperty(e,"TransactionsController",{enumerable:!0,get:function(){return f}});var t=r(d[0]),n=r(d[1]),a=r(d[2]),o=r(d[3]),s=r(d[4]),c=r(d[5]),l=r(d[6]),C=r(d[7]),p=r(d[8]);const h=(0,t.proxy)({transactions:[],transactionsByYear:{},lastNetworkInView:void 0,loading:!1,empty:!1,next:void 0}),u={state:h,subscribe:n=>(0,t.subscribe)(h,()=>n(h)),setLastNetworkInView(t){h.lastNetworkInView=t},async fetchTransactions(t){if(!t)throw new Error("Transactions can't be fetched without an accountAddress");h.loading=!0;try{const n=await s.BlockchainApiController.fetchTransactions({account:t,cursor:h.next,chainId:c.ChainController.state.activeCaipNetwork?.caipNetworkId}),a=f.filterSpamTransactions(n.data),o=f.filterByConnectedChain(a),l=[...h.transactions,...o];h.loading=!1,h.transactions=l,h.transactionsByYear=f.groupTransactionsByYearAndMonth(h.transactionsByYear,o),h.empty=0===l.length,h.next=n.next?n.next:void 0}catch(o){const s=c.ChainController.state.activeChain;l.EventsController.sendEvent({type:'track',event:'ERROR_FETCH_TRANSACTIONS',properties:{address:t,projectId:C.OptionsController.state.projectId,cursor:h.next,isSmartAccount:(0,a.getPreferredAccountType)(s)===n.W3mFrameRpcConstants.ACCOUNT_TYPES.SMART_ACCOUNT}}),p.SnackController.showError('Failed to fetch transactions'),h.loading=!1,h.empty=!0,h.next=void 0}},groupTransactionsByYearAndMonth(t={},n=[]){const a=t;return n.forEach(t=>{const n=new Date(t.metadata.minedAt).getFullYear(),o=new Date(t.metadata.minedAt).getMonth(),s=a[n]??{},c=(s[o]??[]).filter(n=>n.id!==t.id);a[n]=Object.assign({},s,{[o]:[...c,t].sort((t,n)=>new Date(n.metadata.minedAt).getTime()-new Date(t.metadata.minedAt).getTime())})}),a},filterSpamTransactions:t=>t.filter(t=>!t.transfers.every(t=>!0===t.nft_info?.flags.is_spam)),filterByConnectedChain(t){const n=c.ChainController.state.activeCaipNetwork?.caipNetworkId;return t.filter(t=>t.metadata.chain===n)},clearCursor(){h.next=void 0},resetTransactions(){h.transactions=[],h.transactionsByYear={},h.lastNetworkInView=void 0,h.loading=!1,h.empty=!1,h.next=void 0}},f=(0,o.withErrorBoundary)(u,'API_ERROR')},6241,[4209,6228,6226,6232,6220,6218,6237,6222,6224]);
__d(function(g,r,i,a,m,e,d){"use strict";Object.defineProperty(e,'__esModule',{value:!0}),Object.defineProperty(e,"ERC7811Utils",{enumerable:!0,get:function(){return s}});var t=r(d[0]);const s={createBalance(t,s){const n={name:t.metadata.name||'',symbol:t.metadata.symbol||'',decimals:t.metadata.decimals||0,value:t.metadata.value||0,price:t.metadata.price||0,iconUrl:t.metadata.iconUrl||''};return{name:n.name,symbol:n.symbol,chainId:s,address:'native'===t.address?void 0:this.convertAddressToCAIP10Address(t.address,s),value:n.value,price:n.price,quantity:{decimals:n.decimals.toString(),numeric:this.convertHexToBalance({hex:t.balance,decimals:n.decimals})},iconUrl:n.iconUrl}},convertHexToBalance:({hex:s,decimals:n})=>(0,t.formatUnits)(BigInt(s),n),convertAddressToCAIP10Address:(t,s)=>`${s}:${t}`,createCAIP2ChainId:(t,s)=>`${s}:${parseInt(t,16)}`,getChainIdHexFromCAIP2ChainId(t){const s=t.split(':');if(s.length<2||!s[1])return'0x0';const n=s[1],o=parseInt(n,10);return isNaN(o)?'0x0':`0x${o.toString(16)}`},isWalletGetAssetsResponse(t){return'object'==typeof t&&null!==t&&Object.values(t).every(t=>Array.isArray(t)&&t.every(t=>this.isValidAsset(t)))},isValidAsset:t=>'object'==typeof t&&null!==t&&'string'==typeof t.address&&'string'==typeof t.balance&&('ERC20'===t.type||'NATIVE'===t.type)&&'object'==typeof t.metadata&&null!==t.metadata&&'string'==typeof t.metadata.name&&'string'==typeof t.metadata.symbol&&'number'==typeof t.metadata.decimals&&'number'==typeof t.metadata.price&&'string'==typeof t.metadata.iconUrl}},6242,[1450]);
__d(function(g,r,i,a,m,e,d){"use strict";Object.defineProperty(e,'__esModule',{value:!0}),Object.defineProperty(e,"ViemUtil",{enumerable:!0,get:function(){return s}}),r(d[0]);var t=r(d[1]),n=r(d[2]);let c;async function o(){if(!c){const{createPublicClient:t,http:n,defineChain:o}=await r(d[4])(d[3],d.paths);c={createPublicClient:t,http:n,defineChain:o}}return c}const s={getBlockchainApiRpcUrl(t,n){const c=new URL('https://rpc.walletconnect.org/v1/');return c.searchParams.set('chainId',t),c.searchParams.set('projectId',n),c.toString()},async getViemChain(n){const{defineChain:c}=await o(),{chainId:s}=t.ParseUtil.parseCaipNetworkId(n.caipNetworkId);return c(Object.assign({},n,{id:Number(s)}))},async createViemPublicClient(t){const{createPublicClient:c,http:l}=await o(),p=n.OptionsController.state.projectId,h=await s.getViemChain(t);if(!h)throw new Error(`Chain ${t.caipNetworkId} not found in viem/chains`);return c({chain:h,transport:l(s.getBlockchainApiRpcUrl(t.caipNetworkId,p))})}}},6243,{"0":1450,"1":6192,"2":6222,"3":1450,"4":1549,"paths":{}});
__d(function(g,r,i,a,m,e,d){"use strict";Object.defineProperty(e,'__esModule',{value:!0}),Object.defineProperty(e,"PublicStateController",{enumerable:!0,get:function(){return c}});var t=r(d[0]),s=r(d[1]);const n=(0,t.proxy)({loading:!1,open:!1,selectedNetworkId:void 0,activeChain:void 0,initialized:!1}),c={state:n,subscribe:s=>(0,t.subscribe)(n,()=>s(n)),subscribeOpen:t=>(0,s.subscribeKey)(n,'open',t),set(t){Object.assign(n,Object.assign({},n,t))}}},6244,[4209,4217]);
__d(function(g,r,i,a,m,e,d){"use strict";Object.defineProperty(e,'__esModule',{value:!0}),Object.defineProperty(e,"SendController",{enumerable:!0,get:function(){return E}});var t=r(d[0]),n=r(d[1]),o=r(d[2]),s=r(d[3]),c=r(d[4]),l=r(d[5]),C=r(d[6]),k=r(d[7]),u=r(d[8]),A=r(d[9]),p=r(d[10]),T=r(d[11]),v=r(d[12]),h=r(d[13]),w=r(d[14]);const N=(0,t.proxy)({tokenBalances:[],loading:!1}),S={state:N,subscribe:n=>(0,t.subscribe)(N,()=>n(N)),subscribeKey:(t,o)=>(0,n.subscribeKey)(N,t,o),setToken(n){n&&(N.token=(0,t.ref)(n))},setTokenAmount(t){N.sendTokenAmount=t},setReceiverAddress(t){N.receiverAddress=t},setReceiverProfileImageUrl(t){N.receiverProfileImageUrl=t},setReceiverProfileName(t){N.receiverProfileName=t},setNetworkBalanceInUsd(t){N.networkBalanceInUSD=t},setLoading(t){N.loading=t},getSdkEventProperties:t=>({message:k.CoreHelperUtil.parseError(t),isSmartAccount:(0,l.getPreferredAccountType)(p.ChainController.state.activeChain)===s.W3mFrameRpcConstants.ACCOUNT_TYPES.SMART_ACCOUNT,token:N.token?.symbol||'',amount:N.sendTokenAmount??0,network:p.ChainController.state.activeCaipNetwork?.caipNetworkId||''}),async sendToken(){try{switch(E.setLoading(!0),p.ChainController.state.activeCaipNetwork?.chainNamespace){case'eip155':return void await E.sendEvmToken();case'solana':return void await E.sendSolanaToken();default:throw new Error('Unsupported chain')}}catch(t){if(o.ErrorUtil.isUserRejectedRequestError(t))throw new o.UserRejectedRequestError(t);throw t}finally{E.setLoading(!1)}},async sendEvmToken(){const t=p.ChainController.state.activeChain;if(!t)throw new Error('SendController:sendEvmToken - activeChainNamespace is required');const n=(0,l.getPreferredAccountType)(t);if(!E.state.sendTokenAmount||!E.state.receiverAddress)throw new Error('An amount and receiver address are required');if(!E.state.token)throw new Error('A token is required');if(E.state.token?.address){v.EventsController.sendEvent({type:'track',event:'SEND_INITIATED',properties:{isSmartAccount:n===s.W3mFrameRpcConstants.ACCOUNT_TYPES.SMART_ACCOUNT,token:E.state.token.address,amount:E.state.sendTokenAmount,network:p.ChainController.state.activeCaipNetwork?.caipNetworkId||''}});const{hash:t}=await E.sendERC20Token({receiverAddress:E.state.receiverAddress,tokenAddress:E.state.token.address,sendTokenAmount:E.state.sendTokenAmount,decimals:E.state.token.quantity.decimals});t&&(N.hash=t)}else{v.EventsController.sendEvent({type:'track',event:'SEND_INITIATED',properties:{isSmartAccount:n===s.W3mFrameRpcConstants.ACCOUNT_TYPES.SMART_ACCOUNT,token:E.state.token.symbol||'',amount:E.state.sendTokenAmount,network:p.ChainController.state.activeCaipNetwork?.caipNetworkId||''}});const{hash:t}=await E.sendNativeToken({receiverAddress:E.state.receiverAddress,sendTokenAmount:E.state.sendTokenAmount,decimals:E.state.token.quantity.decimals});t&&(N.hash=t)}},async fetchTokenBalance(t){N.loading=!0;const n=p.ChainController.state.activeChain,o=p.ChainController.state.activeCaipNetwork?.caipNetworkId,s=p.ChainController.state.activeCaipNetwork?.chainNamespace,l=p.ChainController.getAccountData(n)?.caipAddress??p.ChainController.state.activeCaipAddress,u=l?k.CoreHelperUtil.getPlainAddress(l):void 0;if(N.lastRetry&&!k.CoreHelperUtil.isAllowedRetry(N.lastRetry,30*C.ConstantsUtil.ONE_SEC_MS))return N.loading=!1,[];try{if(u&&o&&s){const t=await c.BalanceUtil.getMyTokensWithBalance();return N.tokenBalances=t,N.lastRetry=void 0,t}}catch(n){N.lastRetry=Date.now(),t?.(n),w.SnackController.showError('Token Balance Unavailable')}finally{N.loading=!1}return[]},fetchNetworkBalance(){if(0===N.tokenBalances.length)return;const t=u.SwapApiUtil.mapBalancesToSwapTokens(N.tokenBalances);if(!t)return;const n=t.find(t=>t.address===(0,l.getActiveNetworkTokenAddress)());n&&(N.networkBalanceInUSD=n?o.NumberUtil.multiply(n.quantity.numeric,n.price).toString():'0')},async sendNativeToken(t){h.RouterController.pushTransactionStack({});const n=t.receiverAddress,c=p.ChainController.getAccountData()?.address,C=T.ConnectionController.parseUnits(t.sendTokenAmount.toString(),Number(t.decimals)),k=await T.ConnectionController.sendTransaction({chainNamespace:o.ConstantsUtil.CHAIN.EVM,to:n,address:c,data:'0x',value:C??BigInt(0)});return v.EventsController.sendEvent({type:'track',event:'SEND_SUCCESS',properties:{isSmartAccount:(0,l.getPreferredAccountType)('eip155')===s.W3mFrameRpcConstants.ACCOUNT_TYPES.SMART_ACCOUNT,token:E.state.token?.symbol||'',amount:t.sendTokenAmount,network:p.ChainController.state.activeCaipNetwork?.caipNetworkId||'',hash:k||''}}),T.ConnectionController._getClient()?.updateBalance('eip155'),E.resetSend(),{hash:k}},async sendERC20Token(t){h.RouterController.pushTransactionStack({onSuccess(){h.RouterController.replace('Account')}});const n=T.ConnectionController.parseUnits(t.sendTokenAmount.toString(),Number(t.decimals)),c=p.ChainController.getAccountData()?.address;if(c&&t.sendTokenAmount&&t.receiverAddress&&t.tokenAddress){const C=k.CoreHelperUtil.getPlainAddress(t.tokenAddress);if(!C)throw new Error('SendController:sendERC20Token - tokenAddress is required');const u=await T.ConnectionController.writeContract({fromAddress:c,tokenAddress:C,args:[t.receiverAddress,n??BigInt(0)],method:'transfer',abi:o.ContractUtil.getERC20Abi(C),chainNamespace:o.ConstantsUtil.CHAIN.EVM});return v.EventsController.sendEvent({type:'track',event:'SEND_SUCCESS',properties:{isSmartAccount:(0,l.getPreferredAccountType)('eip155')===s.W3mFrameRpcConstants.ACCOUNT_TYPES.SMART_ACCOUNT,token:E.state.token?.symbol||'',amount:t.sendTokenAmount,network:p.ChainController.state.activeCaipNetwork?.caipNetworkId||'',hash:u||''}}),E.resetSend(),{hash:u}}return{hash:void 0}},async sendSolanaToken(){if(!E.state.sendTokenAmount||!E.state.receiverAddress)throw new Error('An amount and receiver address are required');let t;h.RouterController.pushTransactionStack({onSuccess(){h.RouterController.replace('Account')}}),E.state.token&&E.state.token.address!==C.ConstantsUtil.SOLANA_NATIVE_TOKEN_ADDRESS&&(t=k.CoreHelperUtil.isCaipAddress(E.state.token.address)?k.CoreHelperUtil.getPlainAddress(E.state.token.address):E.state.token.address);const n=await T.ConnectionController.sendTransaction({chainNamespace:'solana',tokenMint:t,to:E.state.receiverAddress,value:E.state.sendTokenAmount});n&&(N.hash=n),T.ConnectionController._getClient()?.updateBalance('solana'),E.resetSend()},resetSend(){N.token=void 0,N.sendTokenAmount=void 0,N.receiverAddress=void 0,N.receiverProfileImageUrl=void 0,N.receiverProfileName=void 0,N.loading=!1,N.tokenBalances=[]}},E=(0,A.withErrorBoundary)(S)},6245,[4209,4217,6192,6228,6219,6226,6215,6214,6246,6232,6218,6225,6237,6238,6224]);
__d(function(g,r,i,a,m,e,d){"use strict";Object.defineProperty(e,'__esModule',{value:!0}),Object.defineProperty(e,"SwapApiUtil",{enumerable:!0,get:function(){return l}});var n=r(d[0]),t=r(d[1]),s=r(d[2]),c=r(d[3]),o=r(d[4]);const l={async getTokenList(t){const s=await n.BlockchainApiController.fetchSwapTokens({chainId:t});return s?.tokens?.map(n=>Object.assign({},n,{eip2612:!1,quantity:{decimals:'0',numeric:'0'},price:0,value:0}))||[]},async fetchGasPrice(){const c=t.ChainController.state.activeCaipNetwork;if(!c)return null;try{if('solana'===c.chainNamespace){const n=(await(s.ConnectionController?.estimateGas({chainNamespace:'solana'})))?.toString();return{standard:n,fast:n,instant:n}}return await n.BlockchainApiController.fetchGasPrice({chainId:c.caipNetworkId})}catch{return null}},async fetchSwapAllowance({tokenAddress:t,userAddress:c,sourceTokenAmount:o,sourceTokenDecimals:l}){const u=await n.BlockchainApiController.fetchSwapAllowance({tokenAddress:t,userAddress:c});if(u?.allowance&&o&&l){const n=s.ConnectionController.parseUnits(o,l)||0;return BigInt(u.allowance)>=n}return!1},async getMyTokensWithBalance(n){const s=await c.BalanceUtil.getMyTokensWithBalance(n);return t.ChainController.setAccountProp('tokenBalance',s,t.ChainController.state.activeChain),this.mapBalancesToSwapTokens(s)},mapBalancesToSwapTokens:n=>n?.map(n=>Object.assign({},n,{address:n?.address?n.address:(0,o.getActiveNetworkTokenAddress)(),decimals:parseInt(n.quantity.decimals,10),logoUri:n.iconUrl,eip2612:!1}))||[],async handleSwapError(n){try{const t=n?.cause;if(!t?.json)return;const s=await t.json(),c=s?.reasons?.[0]?.description;return c?.includes('insufficient liquidity')?'Insufficient liquidity':void 0}catch{return}}}},6246,[6220,6218,6225,6219,6226]);
__d(function(g,r,i,a,m,e,d){"use strict";Object.defineProperty(e,'__esModule',{value:!0}),Object.defineProperty(e,"ModalController",{enumerable:!0,get:function(){return t.ModalController}}),Object.defineProperty(e,"RouterController",{enumerable:!0,get:function(){return n.RouterController}}),Object.defineProperty(e,"ChainController",{enumerable:!0,get:function(){return o.ChainController}}),Object.defineProperty(e,"ProviderController",{enumerable:!0,get:function(){return l.ProviderController}}),Object.defineProperty(e,"OnRampController",{enumerable:!0,get:function(){return u.OnRampController}}),Object.defineProperty(e,"ConnectionController",{enumerable:!0,get:function(){return c.ConnectionController}}),Object.defineProperty(e,"ConnectionControllerUtil",{enumerable:!0,get:function(){return b.ConnectionControllerUtil}}),Object.defineProperty(e,"ConnectorController",{enumerable:!0,get:function(){return f.ConnectorController}}),Object.defineProperty(e,"ConnectorControllerUtil",{enumerable:!0,get:function(){return p.ConnectorControllerUtil}}),Object.defineProperty(e,"SnackController",{enumerable:!0,get:function(){return C.SnackController}}),Object.defineProperty(e,"ApiController",{enumerable:!0,get:function(){return y.ApiController}}),Object.defineProperty(e,"AssetController",{enumerable:!0,get:function(){return O.AssetController}}),Object.defineProperty(e,"ThemeController",{enumerable:!0,get:function(){return P.ThemeController}}),Object.defineProperty(e,"OptionsController",{enumerable:!0,get:function(){return j.OptionsController}}),Object.defineProperty(e,"BlockchainApiController",{enumerable:!0,get:function(){return s.BlockchainApiController}}),Object.defineProperty(e,"PublicStateController",{enumerable:!0,get:function(){return U.PublicStateController}}),Object.defineProperty(e,"EventsController",{enumerable:!0,get:function(){return S.EventsController}}),Object.defineProperty(e,"TransactionsController",{enumerable:!0,get:function(){return h.TransactionsController}}),Object.defineProperty(e,"SwapController",{enumerable:!0,get:function(){return A.SwapController}}),Object.defineProperty(e,"SendController",{enumerable:!0,get:function(){return E.SendController}}),Object.defineProperty(e,"TooltipController",{enumerable:!0,get:function(){return k.TooltipController}}),Object.defineProperty(e,"EnsController",{enumerable:!0,get:function(){return w.EnsController}}),Object.defineProperty(e,"AlertController",{enumerable:!0,get:function(){return T.AlertController}}),Object.defineProperty(e,"TelemetryController",{enumerable:!0,get:function(){return v.TelemetryController}}),Object.defineProperty(e,"OptionsStateController",{enumerable:!0,get:function(){return R.OptionsStateController}}),Object.defineProperty(e,"ExchangeController",{enumerable:!0,get:function(){return M.ExchangeController}}),Object.defineProperty(e,"AssetUtil",{enumerable:!0,get:function(){return x.AssetUtil}}),Object.defineProperty(e,"ConstantsUtil",{enumerable:!0,get:function(){return B.ConstantsUtil}}),Object.defineProperty(e,"CoreHelperUtil",{enumerable:!0,get:function(){return D.CoreHelperUtil}}),Object.defineProperty(e,"StorageUtil",{enumerable:!0,get:function(){return F.StorageUtil}}),Object.defineProperty(e,"RouterUtil",{enumerable:!0,get:function(){return N.RouterUtil}}),Object.defineProperty(e,"OptionsUtil",{enumerable:!0,get:function(){return _.OptionsUtil}}),Object.defineProperty(e,"SIWXUtil",{enumerable:!0,get:function(){return H.SIWXUtil}}),Object.defineProperty(e,"ModalUtil",{enumerable:!0,get:function(){return I.ModalUtil}}),Object.defineProperty(e,"NetworkUtil",{enumerable:!0,get:function(){return K.NetworkUtil}}),Object.defineProperty(e,"ViemUtil",{enumerable:!0,get:function(){return V.ViemUtil}}),Object.defineProperty(e,"withErrorBoundary",{enumerable:!0,get:function(){return W.withErrorBoundary}}),Object.defineProperty(e,"AppKitError",{enumerable:!0,get:function(){return W.AppKitError}}),Object.defineProperty(e,"baseSepoliaUSDC",{enumerable:!0,get:function(){return X.baseSepoliaUSDC}}),Object.defineProperty(e,"baseUSDC",{enumerable:!0,get:function(){return X.baseUSDC}}),Object.defineProperty(e,"formatCaip19Asset",{enumerable:!0,get:function(){return X.formatCaip19Asset}}),Object.defineProperty(e,"getExchanges",{enumerable:!0,get:function(){return X.getExchanges}}),Object.defineProperty(e,"getPayUrl",{enumerable:!0,get:function(){return X.getPayUrl}}),Object.defineProperty(e,"getPaymentAssetsForNetwork",{enumerable:!0,get:function(){return X.getPaymentAssetsForNetwork}}),Object.defineProperty(e,"FetchUtil",{enumerable:!0,get:function(){return q.FetchUtil}});var t=r(d[0]),n=r(d[1]),o=r(d[2]),l=r(d[3]),u=r(d[4]),c=r(d[5]),b=r(d[6]),f=r(d[7]),p=r(d[8]),C=r(d[9]),y=r(d[10]),O=r(d[11]),P=r(d[12]),j=r(d[13]),s=r(d[14]),U=r(d[15]),S=r(d[16]),h=r(d[17]),A=r(d[18]),E=r(d[19]),k=r(d[20]),w=r(d[21]),T=r(d[22]),v=r(d[23]),R=r(d[24]),M=r(d[25]),x=r(d[26]),B=r(d[27]),D=r(d[28]),F=r(d[29]),N=r(d[30]),_=r(d[31]),H=r(d[32]),I=r(d[33]),K=r(d[34]),V=r(d[35]),W=r(d[36]),X=r(d[37]),q=r(d[38]),z=r(d[39]);Object.keys(z).forEach(function(t){'default'===t||Object.prototype.hasOwnProperty.call(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:function(){return z[t]}})})},6247,[6213,6238,6218,6248,6249,6225,6240,6230,6227,6224,6234,6236,6239,6222,6220,6244,6237,6241,6250,6245,6253,6254,6252,6233,6256,6257,6235,6215,6214,6216,6259,6223,6260,6261,6217,6243,6232,6258,6221,6226]);
__d(function(g,r,i,a,m,e,d){"use strict";Object.defineProperty(e,'__esModule',{value:!0}),Object.defineProperty(e,"ProviderController",{enumerable:!0,get:function(){return b}});var s=r(d[0]),o=r(d[1]);const v={eip155:void 0,solana:void 0,polkadot:void 0,bip122:void 0,cosmos:void 0,sui:void 0,stacks:void 0},t=(0,s.proxy)({providers:Object.assign({},v),providerIds:Object.assign({},v)}),b={state:t,subscribeKey:(s,v)=>(0,o.subscribeKey)(t,s,v),subscribe:o=>(0,s.subscribe)(t,()=>{o(t)}),subscribeProviders:o=>(0,s.subscribe)(t.providers,()=>o(t.providers)),setProvider(o,v){o&&v&&(t.providers[o]=(0,s.ref)(v))},getProvider(s){if(s)return t.providers[s]},setProviderId(s,o){o&&(t.providerIds[s]=o)},getProviderId(s){if(s)return t.providerIds[s]},reset(){t.providers=Object.assign({},v),t.providerIds=Object.assign({},v)},resetChain(s){t.providers[s]=void 0,t.providerIds[s]=void 0}}},6248,[4209,4217]);
__d(function(g,r,i,a,m,e,d){"use strict";Object.defineProperty(e,'__esModule',{value:!0}),Object.defineProperty(e,"USDC_CURRENCY_DEFAULT",{enumerable:!0,get:function(){return C}}),Object.defineProperty(e,"USD_CURRENCY_DEFAULT",{enumerable:!0,get:function(){return h}}),Object.defineProperty(e,"OnRampController",{enumerable:!0,get:function(){return _}});var n=r(d[0]),t=r(d[1]),s=r(d[2]),c=r(d[3]),u=r(d[4]),o=r(d[5]),p=r(d[6]),l=r(d[7]),y=r(d[8]);const C={id:'2b92315d-eab7-5bef-84fa-089a131333f5',name:'USD Coin',symbol:'USDC',networks:[{name:'ethereum-mainnet',display_name:'Ethereum',chain_id:'1',contract_address:'0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48'},{name:'polygon-mainnet',display_name:'Polygon',chain_id:'137',contract_address:'0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174'}]},h={id:'USD',payment_method_limits:[{id:'card',min:'10.00',max:'7500.00'},{id:'ach_bank_account',min:'10.00',max:'25000.00'}]},b={providers:c.ONRAMP_PROVIDERS,selectedProvider:null,error:null,purchaseCurrency:C,paymentCurrency:h,purchaseCurrencies:[C],paymentCurrencies:[],quotesLoading:!1},A=(0,n.proxy)(b),P={state:A,subscribe:t=>(0,n.subscribe)(A,()=>t(A)),subscribeKey:(n,s)=>(0,t.subscribeKey)(A,n,s),setSelectedProvider(n){if(n&&'meld'===n.name){const t=l.ChainController.state.activeChain,u=t===s.ConstantsUtil.CHAIN.SOLANA?'SOL':'USDC',o=t?l.ChainController.state.chains.get(t)?.accountState?.address??'':'',p=new URL(n.url);p.searchParams.append('publicKey',c.MELD_PUBLIC_KEY),p.searchParams.append('destinationCurrencyCode',u),p.searchParams.append('walletAddress',o),p.searchParams.append('externalCustomerId',y.OptionsController.state.projectId),A.selectedProvider=Object.assign({},n,{url:p.toString()})}else A.selectedProvider=n},setOnrampProviders(n){if(Array.isArray(n)&&n.every(n=>'string'==typeof n)){const t=n,s=c.ONRAMP_PROVIDERS.filter(n=>t.includes(n.name));A.providers=s}else A.providers=[]},setPurchaseCurrency(n){A.purchaseCurrency=n},setPaymentCurrency(n){A.paymentCurrency=n},setPurchaseAmount(n){_.state.purchaseAmount=n},setPaymentAmount(n){_.state.paymentAmount=n},async getAvailableCurrencies(){const n=await p.BlockchainApiController.getOnrampOptions();A.purchaseCurrencies=n.purchaseCurrencies,A.paymentCurrencies=n.paymentCurrencies,A.paymentCurrency=n.paymentCurrencies[0]||h,A.purchaseCurrency=n.purchaseCurrencies[0]||C,await o.ApiController.fetchCurrencyImages(n.paymentCurrencies.map(n=>n.id)),await o.ApiController.fetchTokenImages(n.purchaseCurrencies.map(n=>n.symbol))},async getQuote(){A.quotesLoading=!0;try{const n=await p.BlockchainApiController.getOnrampQuote({purchaseCurrency:A.purchaseCurrency,paymentCurrency:A.paymentCurrency,amount:A.paymentAmount?.toString()||'0',network:A.purchaseCurrency?.symbol});return A.quotesLoading=!1,A.purchaseAmount=Number(n?.purchaseAmount.amount),n}catch(n){return A.error=n.message,A.quotesLoading=!1,null}finally{A.quotesLoading=!1}},resetState(){A.selectedProvider=null,A.error=null,A.purchaseCurrency=C,A.paymentCurrency=h,A.purchaseCurrencies=[C],A.paymentCurrencies=[],A.paymentAmount=void 0,A.purchaseAmount=void 0,A.quotesLoading=!1}},_=(0,u.withErrorBoundary)(P)},6249,[4209,4217,6192,6215,6232,6234,6220,6218,6222]);
__d(function(g,r,i,a,m,e,d){"use strict";Object.defineProperty(e,'__esModule',{value:!0}),Object.defineProperty(e,"INITIAL_GAS_LIMIT",{enumerable:!0,get:function(){return U}}),Object.defineProperty(e,"TO_AMOUNT_DECIMALS",{enumerable:!0,get:function(){return b}}),Object.defineProperty(e,"SwapController",{enumerable:!0,get:function(){return B}});var o=r(d[0]),t=r(d[1]),n=r(d[2]),s=r(d[3]),c=r(d[4]),l=r(d[5]),u=r(d[6]),k=r(d[7]),T=r(d[8]),p=r(d[9]),w=r(d[10]),A=r(d[11]),C=r(d[12]),S=r(d[13]),P=r(d[14]),v=r(d[15]),h=r(d[16]),y=r(d[17]),f=r(d[18]);const U=15e4,b=6;Error;const I={initializing:!1,initialized:!1,loadingPrices:!1,loadingQuote:!1,loadingApprovalTransaction:!1,loadingBuildTransaction:!1,loadingTransaction:!1,switchingTokens:!1,fetchError:!1,approvalTransaction:void 0,swapTransaction:void 0,transactionError:void 0,sourceToken:void 0,sourceTokenAmount:'',sourceTokenPriceInUSD:0,toToken:void 0,toTokenAmount:'',toTokenPriceInUSD:0,networkPrice:'0',networkBalanceInUSD:'0',networkTokenSymbol:'',inputError:void 0,slippage:u.ConstantsUtil.CONVERT_SLIPPAGE_TOLERANCE,tokens:void 0,popularTokens:void 0,suggestedTokens:void 0,foundTokens:void 0,myTokensWithBalance:void 0,tokensPriceMap:{},gasFee:'0',gasPriceInUSD:0,priceImpact:void 0,maxSlippage:void 0,providerFee:void 0},E=(0,o.proxy)(Object.assign({},I)),N={state:E,subscribe:t=>(0,o.subscribe)(E,()=>t(E)),subscribeKey:(o,n)=>(0,t.subscribeKey)(E,o,n),getParams(){const o=S.ChainController.state.activeChain,t=S.ChainController.getAccountData(o)?.caipAddress??S.ChainController.state.activeCaipAddress,s=k.CoreHelperUtil.getPlainAddress(t),c=(0,l.getActiveNetworkTokenAddress)(),u=v.ConnectorController.getConnectorId(S.ChainController.state.activeChain);if(!s)throw new Error('No address found to swap the tokens from.');const T=!E.toToken?.address||!E.toToken?.decimals,p=!E.sourceToken?.address||!E.sourceToken?.decimals||!n.NumberUtil.bigNumber(E.sourceTokenAmount).gt(0),w=!E.sourceTokenAmount;return{networkAddress:c,fromAddress:s,fromCaipAddress:t,sourceTokenAddress:E.sourceToken?.address,toTokenAddress:E.toToken?.address,toTokenAmount:E.toTokenAmount,toTokenDecimals:E.toToken?.decimals,sourceTokenAmount:E.sourceTokenAmount,sourceTokenDecimals:E.sourceToken?.decimals,invalidToToken:T,invalidSourceToken:p,invalidSourceTokenAmount:w,availableToSwap:t&&!T&&!p&&!w,isAuthConnector:u===n.ConstantsUtil.CONNECTOR_ID.AUTH}},async setSourceToken(o){if(!o)return E.sourceToken=o,E.sourceTokenAmount='',void(E.sourceTokenPriceInUSD=0);E.sourceToken=o,await B.setTokenPrice(o.address,'sourceToken')},setSourceTokenAmount(o){E.sourceTokenAmount=o},async setToToken(o){if(!o)return E.toToken=o,E.toTokenAmount='',void(E.toTokenPriceInUSD=0);E.toToken=o,await B.setTokenPrice(o.address,'toToken')},setToTokenAmount(o){E.toTokenAmount=o?n.NumberUtil.toFixed(o,b):''},async setTokenPrice(o,t){let n=E.tokensPriceMap[o]||0;n||(E.loadingPrices=!0,n=await B.getAddressPrice(o)),'sourceToken'===t?E.sourceTokenPriceInUSD=n:'toToken'===t&&(E.toTokenPriceInUSD=n),E.loadingPrices&&(E.loadingPrices=!1),B.getParams().availableToSwap&&!E.switchingTokens&&B.swapTokens()},async switchTokens(){if(!E.initializing&&E.initialized&&!E.switchingTokens){E.switchingTokens=!0;try{const o=E.toToken?Object.assign({},E.toToken):void 0,t=E.sourceToken?Object.assign({},E.sourceToken):void 0,n=o&&''===E.toTokenAmount?'1':E.toTokenAmount;B.setSourceTokenAmount(n),B.setToTokenAmount(''),await B.setSourceToken(o),await B.setToToken(t),E.switchingTokens=!1,B.swapTokens()}catch(o){throw E.switchingTokens=!1,o}}},resetState(){E.myTokensWithBalance=I.myTokensWithBalance,E.tokensPriceMap=I.tokensPriceMap,E.initialized=I.initialized,E.initializing=I.initializing,E.switchingTokens=I.switchingTokens,E.sourceToken=I.sourceToken,E.sourceTokenAmount=I.sourceTokenAmount,E.sourceTokenPriceInUSD=I.sourceTokenPriceInUSD,E.toToken=I.toToken,E.toTokenAmount=I.toTokenAmount,E.toTokenPriceInUSD=I.toTokenPriceInUSD,E.networkPrice=I.networkPrice,E.networkTokenSymbol=I.networkTokenSymbol,E.networkBalanceInUSD=I.networkBalanceInUSD,E.inputError=I.inputError},resetValues(){const{networkAddress:o}=B.getParams(),t=E.tokens?.find(t=>t.address===o);B.setSourceToken(t),B.setToToken(void 0)},getApprovalLoadingState:()=>E.loadingApprovalTransaction,clearError(){E.transactionError=void 0},async initializeState(){if(!E.initializing){if(E.initializing=!0,!E.initialized)try{await B.fetchTokens(),E.initialized=!0}catch(o){E.initialized=!1,f.SnackController.showError('Failed to initialize swap'),y.RouterController.goBack()}E.initializing=!1}},async fetchTokens(){const{networkAddress:o}=B.getParams();await B.getNetworkTokenPrice(),await B.getMyTokensWithBalance();const t=E.myTokensWithBalance?.find(t=>t.address===o);t&&(E.networkTokenSymbol=t.symbol,B.setSourceToken(t),B.setSourceTokenAmount('0'))},async getTokenList(){const o=S.ChainController.state.activeCaipNetwork?.caipNetworkId;if(E.caipNetworkId!==o||!E.tokens)try{E.tokensLoading=!0;const t=await T.SwapApiUtil.getTokenList(o);E.tokens=t,E.caipNetworkId=o,E.popularTokens=t.sort((o,t)=>o.symbol<t.symbol?-1:o.symbol>t.symbol?1:0),E.suggestedTokens=t.filter(o=>!!u.ConstantsUtil.SWAP_SUGGESTED_TOKENS.includes(o.symbol))}catch(o){E.tokens=[],E.popularTokens=[],E.suggestedTokens=[]}finally{E.tokensLoading=!1}},async getAddressPrice(o){const t=E.tokensPriceMap[o];if(t)return t;const n=await C.BlockchainApiController.fetchTokenPrice({addresses:[o]}),s=n?.fungibles||[],c=[...E.tokens||[],...E.myTokensWithBalance||[]],l=c?.find(t=>t.address===o)?.symbol,u=s.find(o=>o.symbol.toLowerCase()===l?.toLowerCase())?.price||0,k=parseFloat(u.toString());return E.tokensPriceMap[o]=k,k},async getNetworkTokenPrice(){const{networkAddress:o}=B.getParams(),t=await C.BlockchainApiController.fetchTokenPrice({addresses:[o]}).catch(()=>(f.SnackController.showError('Failed to fetch network token price'),{fungibles:[]})),n=t.fungibles?.[0],s=n?.price.toString()||'0';E.tokensPriceMap[o]=parseFloat(s),E.networkTokenSymbol=n?.symbol||'',E.networkPrice=s},async getMyTokensWithBalance(o){const t=await c.BalanceUtil.getMyTokensWithBalance(o),n=T.SwapApiUtil.mapBalancesToSwapTokens(t);n&&(await B.getInitialGasPrice(),B.setBalances(n))},setBalances(o){const{networkAddress:t}=B.getParams(),s=S.ChainController.state.activeCaipNetwork;if(!s)return;const c=o.find(o=>o.address===t);o.forEach(o=>{E.tokensPriceMap[o.address]=o.price||0}),E.myTokensWithBalance=o.filter(o=>o.address.startsWith(s.caipNetworkId)),E.networkBalanceInUSD=c?n.NumberUtil.multiply(c.quantity.numeric,c.price).toString():'0'},async getInitialGasPrice(){const o=await T.SwapApiUtil.fetchGasPrice();if(!o)return{gasPrice:null,gasPriceInUSD:null};switch(S.ChainController.state?.activeCaipNetwork?.chainNamespace){case n.ConstantsUtil.CHAIN.SOLANA:return E.gasFee=o.standard??'0',E.gasPriceInUSD=n.NumberUtil.multiply(o.standard,E.networkPrice).div(1e9).toNumber(),{gasPrice:BigInt(E.gasFee),gasPriceInUSD:Number(E.gasPriceInUSD)};case n.ConstantsUtil.CHAIN.EVM:default:const t=o.standard??'0',s=BigInt(t),c=BigInt(U),l=p.SwapCalculationUtil.getGasPriceInUSD(E.networkPrice,c,s);return E.gasFee=t,E.gasPriceInUSD=l,{gasPrice:s,gasPriceInUSD:l}}},async swapTokens(){const o=S.ChainController.getAccountData()?.address,t=E.sourceToken,s=E.toToken,c=n.NumberUtil.bigNumber(E.sourceTokenAmount).gt(0);if(c||B.setToTokenAmount(''),!s||!t||E.loadingPrices||!c||!o)return;E.loadingQuote=!0;const l=n.NumberUtil.bigNumber(E.sourceTokenAmount).times(10**t.decimals).round(0);try{const c=await C.BlockchainApiController.fetchSwapQuote({userAddress:o,from:t.address,to:s.address,gasPrice:E.gasFee,amount:l.toString()});E.loadingQuote=!1;const u=c?.quotes?.[0]?.toAmount;if(!u)return void A.AlertController.open({displayMessage:'Incorrect amount',debugMessage:'Please enter a valid amount'},'error');const k=n.NumberUtil.bigNumber(u).div(10**s.decimals).toString();B.setToTokenAmount(k);B.hasInsufficientToken(E.sourceTokenAmount,t.address)?E.inputError='Insufficient balance':(E.inputError=void 0,B.setTransactionDetails())}catch(o){const t=await T.SwapApiUtil.handleSwapError(o);E.loadingQuote=!1,E.inputError=t||'Insufficient balance'}},async getTransaction(){const{fromCaipAddress:o,availableToSwap:t}=B.getParams(),n=E.sourceToken,s=E.toToken;if(o&&t&&n&&s&&!E.loadingQuote)try{E.loadingBuildTransaction=!0;let t;return t=await T.SwapApiUtil.fetchSwapAllowance({userAddress:o,tokenAddress:n.address,sourceTokenAmount:E.sourceTokenAmount,sourceTokenDecimals:n.decimals})?await B.createSwapTransaction():await B.createAllowanceTransaction(),E.loadingBuildTransaction=!1,E.fetchError=!1,t}catch(o){return y.RouterController.goBack(),f.SnackController.showError('Failed to check allowance'),E.loadingBuildTransaction=!1,E.approvalTransaction=void 0,E.swapTransaction=void 0,void(E.fetchError=!0)}},async createAllowanceTransaction(){const{fromCaipAddress:o,sourceTokenAddress:t,toTokenAddress:n}=B.getParams();if(o&&n){if(!t)throw new Error('createAllowanceTransaction - No source token address found.');try{const s=await C.BlockchainApiController.generateApproveCalldata({from:t,to:n,userAddress:o}),c=k.CoreHelperUtil.getPlainAddress(s.tx.from);if(!c)throw new Error('SwapController:createAllowanceTransaction - address is required');const l={data:s.tx.data,to:c,gasPrice:BigInt(s.tx.eip155.gasPrice),value:BigInt(s.tx.value),toAmount:E.toTokenAmount};return E.swapTransaction=void 0,E.approvalTransaction={data:l.data,to:l.to,gasPrice:l.gasPrice,value:l.value,toAmount:l.toAmount},{data:l.data,to:l.to,gasPrice:l.gasPrice,value:l.value,toAmount:l.toAmount}}catch(o){return y.RouterController.goBack(),f.SnackController.showError('Failed to create approval transaction'),E.approvalTransaction=void 0,E.swapTransaction=void 0,void(E.fetchError=!0)}}},async createSwapTransaction(){const{networkAddress:o,fromCaipAddress:t,sourceTokenAmount:n}=B.getParams(),s=E.sourceToken,c=E.toToken;if(!(t&&n&&s&&c))return;const l=P.ConnectionController.parseUnits(n,s.decimals)?.toString();try{const n=await C.BlockchainApiController.generateSwapCalldata({userAddress:t,from:s.address,to:c.address,amount:l,disableEstimate:!0}),u=s.address===o,T=BigInt(n.tx.eip155.gas),w=BigInt(n.tx.eip155.gasPrice),A=k.CoreHelperUtil.getPlainAddress(n.tx.to);if(!A)throw new Error('SwapController:createSwapTransaction - address is required');const S={data:n.tx.data,to:A,gas:T,gasPrice:w,value:u?BigInt(l??'0'):BigInt('0'),toAmount:E.toTokenAmount};return E.gasPriceInUSD=p.SwapCalculationUtil.getGasPriceInUSD(E.networkPrice,T,w),E.approvalTransaction=void 0,E.swapTransaction=S,S}catch(o){return y.RouterController.goBack(),f.SnackController.showError('Failed to create transaction'),E.approvalTransaction=void 0,E.swapTransaction=void 0,void(E.fetchError=!0)}},onEmbeddedWalletApprovalSuccess(){f.SnackController.showLoading('Approve limit increase in your wallet'),y.RouterController.replace('SwapPreview')},async sendTransactionForApproval(o){const{fromAddress:t,isAuthConnector:c}=B.getParams();E.loadingApprovalTransaction=!0;c?y.RouterController.pushTransactionStack({onSuccess:B.onEmbeddedWalletApprovalSuccess}):f.SnackController.showLoading("Approve limit increase in your wallet");try{await P.ConnectionController.sendTransaction({address:t,to:o.to,data:o.data,value:o.value,chainNamespace:n.ConstantsUtil.CHAIN.EVM}),await B.swapTokens(),await B.getTransaction(),E.approvalTransaction=void 0,E.loadingApprovalTransaction=!1}catch(o){const t=o;E.transactionError=t?.displayMessage,E.loadingApprovalTransaction=!1,f.SnackController.showError(t?.displayMessage||'Transaction error'),h.EventsController.sendEvent({type:'track',event:'SWAP_APPROVAL_ERROR',properties:{message:t?.displayMessage||t?.message||'Unknown',network:S.ChainController.state.activeCaipNetwork?.caipNetworkId||'',swapFromToken:B.state.sourceToken?.symbol||'',swapToToken:B.state.toToken?.symbol||'',swapFromAmount:B.state.sourceTokenAmount||'',swapToAmount:B.state.toTokenAmount||'',isSmartAccount:(0,l.getPreferredAccountType)(n.ConstantsUtil.CHAIN.EVM)===s.W3mFrameRpcConstants.ACCOUNT_TYPES.SMART_ACCOUNT}})}},async sendTransactionForSwap(o){if(!o)return;const{fromAddress:t,toTokenAmount:c,isAuthConnector:u}=B.getParams();E.loadingTransaction=!0;const k=`Swapping ${E.sourceToken?.symbol} to ${n.NumberUtil.formatNumberToLocalString(c,3)} ${E.toToken?.symbol}`,T=`Swapped ${E.sourceToken?.symbol} to ${n.NumberUtil.formatNumberToLocalString(c,3)} ${E.toToken?.symbol}`;u?y.RouterController.pushTransactionStack({onSuccess(){y.RouterController.replace('Account'),f.SnackController.showLoading(k),N.resetState()}}):f.SnackController.showLoading('Confirm transaction in your wallet');try{const c=[E.sourceToken?.address,E.toToken?.address].join(','),k=await P.ConnectionController.sendTransaction({address:t,to:o.to,data:o.data,value:o.value,chainNamespace:n.ConstantsUtil.CHAIN.EVM});return E.loadingTransaction=!1,f.SnackController.showSuccess(T),h.EventsController.sendEvent({type:'track',event:'SWAP_SUCCESS',properties:{network:S.ChainController.state.activeCaipNetwork?.caipNetworkId||'',swapFromToken:B.state.sourceToken?.symbol||'',swapToToken:B.state.toToken?.symbol||'',swapFromAmount:B.state.sourceTokenAmount||'',swapToAmount:B.state.toTokenAmount||'',isSmartAccount:(0,l.getPreferredAccountType)(n.ConstantsUtil.CHAIN.EVM)===s.W3mFrameRpcConstants.ACCOUNT_TYPES.SMART_ACCOUNT}}),N.resetState(),u||y.RouterController.replace('Account'),N.getMyTokensWithBalance(c),k}catch(o){const t=o;return E.transactionError=t?.displayMessage,E.loadingTransaction=!1,f.SnackController.showError(t?.displayMessage||'Transaction error'),void h.EventsController.sendEvent({type:'track',event:'SWAP_ERROR',properties:{message:t?.displayMessage||t?.message||'Unknown',network:S.ChainController.state.activeCaipNetwork?.caipNetworkId||'',swapFromToken:B.state.sourceToken?.symbol||'',swapToToken:B.state.toToken?.symbol||'',swapFromAmount:B.state.sourceTokenAmount||'',swapToAmount:B.state.toTokenAmount||'',isSmartAccount:(0,l.getPreferredAccountType)(n.ConstantsUtil.CHAIN.EVM)===s.W3mFrameRpcConstants.ACCOUNT_TYPES.SMART_ACCOUNT}})}},hasInsufficientToken:(o,t)=>p.SwapCalculationUtil.isInsufficientSourceTokenForSwap(o,t,E.myTokensWithBalance),setTransactionDetails(){const{toTokenAddress:o,toTokenDecimals:t}=B.getParams();o&&t&&(E.gasPriceInUSD=p.SwapCalculationUtil.getGasPriceInUSD(E.networkPrice,BigInt(E.gasFee),BigInt(U)),E.priceImpact=p.SwapCalculationUtil.getPriceImpact({sourceTokenAmount:E.sourceTokenAmount,sourceTokenPriceInUSD:E.sourceTokenPriceInUSD,toTokenPriceInUSD:E.toTokenPriceInUSD,toTokenAmount:E.toTokenAmount}),E.maxSlippage=p.SwapCalculationUtil.getMaxSlippage(E.slippage,E.toTokenAmount),E.providerFee=p.SwapCalculationUtil.getProviderFee(E.sourceTokenAmount))}},B=(0,w.withErrorBoundary)(N)},6250,[4209,4217,6192,6228,6219,6226,6215,6214,6246,6251,6232,6252,6220,6218,6225,6230,6237,6238,6224]);
__d(function(g,r,i,a,m,e,d){"use strict";Object.defineProperty(e,'__esModule',{value:!0}),Object.defineProperty(e,"SwapCalculationUtil",{enumerable:!0,get:function(){return u}});var t=r(d[0]);const u={getGasPriceInEther:(t,u)=>Number(u*t)/1e18,getGasPriceInUSD(n,b,o){const s=u.getGasPriceInEther(b,o);return t.NumberUtil.bigNumber(n).times(s).toNumber()},getPriceImpact({sourceTokenAmount:u,sourceTokenPriceInUSD:n,toTokenPriceInUSD:b,toTokenAmount:o}){const s=t.NumberUtil.bigNumber(u).times(n),c=t.NumberUtil.bigNumber(o).times(b);return s.minus(c).div(s).times(100).toNumber()},getMaxSlippage(u,n){const b=t.NumberUtil.bigNumber(u).div(100);return t.NumberUtil.multiply(n,b).toNumber()},getProviderFee:(u,n=.0085)=>t.NumberUtil.bigNumber(u).times(n).toString(),isInsufficientNetworkTokenForGas(u,n){const b=n||'0';return!!t.NumberUtil.bigNumber(u).eq(0)||t.NumberUtil.bigNumber(t.NumberUtil.bigNumber(b)).gt(u)},isInsufficientSourceTokenForSwap(u,n,b){const o=b?.find(t=>t.address===n)?.quantity?.numeric;return t.NumberUtil.bigNumber(o||'0').lt(u)}}},6251,[6192]);
__d(function(g,r,i,a,m,e,d){"use strict";Object.defineProperty(e,'__esModule',{value:!0}),Object.defineProperty(e,"AlertController",{enumerable:!0,get:function(){return l}});var n=r(d[0]),o=r(d[1]),s=r(d[2]),t=r(d[3]);const c=(0,n.proxy)({message:'',variant:'info',open:!1}),u={state:c,subscribeKey:(n,s)=>(0,o.subscribeKey)(c,n,s),open(n,o){const{debug:s}=t.OptionsController.state,{code:u,displayMessage:l,debugMessage:p}=n;l&&s&&(c.message=l,c.variant=o,c.open=!0),p&&console.error('function'==typeof p?p():p,u?{code:u}:void 0)},warn(n,o,s){c.open=!0,c.message=n,c.variant='warning',o&&console.warn(o,s)},close(){c.open=!1,c.message='',c.variant='info'}},l=(0,s.withErrorBoundary)(u)},6252,[4209,4217,6232,6222]);
__d(function(g,r,i,a,m,e,d){"use strict";Object.defineProperty(e,'__esModule',{value:!0}),Object.defineProperty(e,"TooltipController",{enumerable:!0,get:function(){return u}});var t=r(d[0]),s=r(d[1]),o=r(d[2]);const n=(0,t.proxy)({message:'',open:!1,triggerRect:{width:0,height:0,top:0,left:0},variant:'shade'}),c={state:n,subscribe:s=>(0,t.subscribe)(n,()=>s(n)),subscribeKey:(t,o)=>(0,s.subscribeKey)(n,t,o),showTooltip({message:t,triggerRect:s,variant:o}){n.open=!0,n.message=t,n.triggerRect=s,n.variant=o},hide(){n.open=!1,n.message='',n.triggerRect={width:0,height:0,top:0,left:0}}},u=(0,o.withErrorBoundary)(c)},6253,[4209,4217,6232]);
__d(function(g,r,i,a,m,_e,d){"use strict";Object.defineProperty(_e,'__esModule',{value:!0}),Object.defineProperty(_e,"EnsController",{enumerable:!0,get:function(){return w}});var e=r(d[0]),t=r(d[1]);r(d[2]);var o=r(d[3]),n=r(d[4]),s=r(d[5]),c=r(d[6]),l=r(d[7]),u=r(d[8]),p=r(d[9]),h=r(d[10]);const C=(0,e.proxy)({suggestions:[],loading:!1}),E={state:C,subscribe:t=>(0,e.subscribe)(C,()=>t(C)),subscribeKey:(e,o)=>(0,t.subscribeKey)(C,e,o),async resolveName(e){try{return await c.BlockchainApiController.lookupEnsName(e)}catch(e){const t=e;throw new Error(t?.reasons?.[0]?.description||'Error resolving name')}},async isNameRegistered(e){try{return await c.BlockchainApiController.lookupEnsName(e),!0}catch{return!1}},async getSuggestions(e){try{C.loading=!0,C.suggestions=[];const t=await c.BlockchainApiController.getEnsNameSuggestions(e);return C.suggestions=t.suggestions||[],C.suggestions}catch(e){const t=w.parseEnsApiError(e,'Error fetching name suggestions');throw new Error(t)}finally{C.loading=!1}},async getNamesForAddress(e){try{if(!l.ChainController.state.activeCaipNetwork)return[];const t=n.StorageUtil.getEnsFromCacheForAddress(e);if(t)return t;const o=await c.BlockchainApiController.reverseLookupEnsName({address:e});return n.StorageUtil.updateEnsCache({address:e,ens:o,timestamp:Date.now()}),o}catch(e){const t=w.parseEnsApiError(e,'Error fetching names for address');throw new Error(t)}},async registerName(e){const t=l.ChainController.state.activeCaipNetwork,s=l.ChainController.getAccountData(t?.chainNamespace)?.address,E=p.ConnectorController.getAuthConnector();if(!t)throw new Error('Network not found');if(!s||!E)throw new Error('Address or auth connector not found');C.loading=!0;try{const p=JSON.stringify({name:e,attributes:{},timestamp:Math.floor(Date.now()/1e3)});h.RouterController.pushTransactionStack({onCancel(){h.RouterController.replace('RegisterAccountName')}});const E=await u.ConnectionController.signMessage(p);C.loading=!1;const w=t.id;if(!w)throw new Error('Network not found');const N=o.EnsUtil.convertEVMChainIdToCoinType(Number(w));await c.BlockchainApiController.registerEnsName({coinType:N,address:s,signature:E,message:p}),l.ChainController.setAccountProp('profileName',e,t.chainNamespace),n.StorageUtil.updateEnsCache({address:s,ens:[{name:e,registered_at:(new Date).toISOString(),updated_at:void 0,addresses:{},attributes:[]}],timestamp:Date.now()}),h.RouterController.replace('RegisterAccountNameSuccess')}catch(t){const o=w.parseEnsApiError(t,`Error registering name ${e}`);throw h.RouterController.replace('RegisterAccountName'),new Error(o)}finally{C.loading=!1}},validateName:e=>/^[a-zA-Z0-9-]{4,}$/u.test(e),parseEnsApiError(e,t){const o=e;return o?.reasons?.[0]?.description||t}},w=(0,s.withErrorBoundary)(E)},6254,[4209,4217,6192,6255,6216,6232,6220,6218,6225,6230,6238]);
__d(function(g,r,i,a,m,e,d){"use strict";Object.defineProperty(e,'__esModule',{value:!0}),Object.defineProperty(e,"EnsUtil",{enumerable:!0,get:function(){return t}});const n=2147483648,t={convertEVMChainIdToCoinType(t){if(t>=n)throw new Error('Invalid chainId');return(n|t)>>>0}}},6255,[]);
__d(function(g,r,i,a,m,e,d){"use strict";Object.defineProperty(e,'__esModule',{value:!0}),Object.defineProperty(e,"OptionsStateController",{enumerable:!0,get:function(){return b}});var s=r(d[0]),t=r(d[1]);const c=(0,s.proxy)({isLegalCheckboxChecked:!1}),b={state:c,subscribe:t=>(0,s.subscribe)(c,()=>t(c)),subscribeKey:(s,b)=>(0,t.subscribeKey)(c,s,b),setIsLegalCheckboxChecked(s){c.isLegalCheckboxChecked=s}}},6256,[4209,4217]);
__d(function(g,r,i,a,_m,e,d){"use strict";Object.defineProperty(e,'__esModule',{value:!0}),Object.defineProperty(e,"DEFAULT_STATE",{enumerable:!0,get:function(){return A}}),Object.defineProperty(e,"ExchangeController",{enumerable:!0,get:function(){return P}});var t=r(d[0]),n=r(d[1]),s=r(d[2]),o=r(d[3]),c=r(d[4]),u=r(d[5]),m=r(d[6]),p=r(d[7]),l=r(d[8]),y=r(d[9]),h=r(d[10]),w=r(d[11]);const A={paymentAsset:null,amount:null,tokenAmount:0,priceLoading:!1,error:null,exchanges:[],isLoading:!1,currentPayment:void 0,isPaymentInProgress:!1,paymentId:'',assets:[]},E=(0,t.proxy)(A),P={state:E,subscribe:n=>(0,t.subscribe)(E,()=>n(E)),subscribeKey:(t,s)=>(0,n.subscribeKey)(E,t,s),resetState(){Object.assign(E,Object.assign({},A))},async getAssetsForNetwork(t){const n=(0,m.getPaymentAssetsForNetwork)(t),s=await P.getAssetsImageAndPrice(n),c=n.map(t=>{const n='native'===t.asset?(0,o.getActiveNetworkTokenAddress)():`${t.network}:${t.asset}`,c=s.find(t=>t.fungibles?.[0]?.address?.toLowerCase()===n.toLowerCase());return Object.assign({},t,{price:c?.fungibles?.[0]?.price||1,metadata:Object.assign({},t.metadata,{iconUrl:c?.fungibles?.[0]?.iconUrl})})});return E.assets=c,c},async getAssetsImageAndPrice(t){const n=t.map(t=>'native'===t.asset?(0,o.getActiveNetworkTokenAddress)():`${t.network}:${t.asset}`);return await Promise.all(n.map(t=>p.BlockchainApiController.fetchTokenPrice({addresses:[t]})))},getTokenAmount(){if(!E?.paymentAsset?.price)throw new Error('Cannot get token price');const t=s.NumberUtil.bigNumber(E.amount??0).round(8),n=s.NumberUtil.bigNumber(E.paymentAsset.price).round(8);return t.div(n).round(8).toNumber()},setAmount(t){E.amount=t,E.paymentAsset?.price&&(E.tokenAmount=P.getTokenAmount())},setPaymentAsset(t){E.paymentAsset=t},isPayWithExchangeEnabled:()=>h.OptionsController.state.remoteFeatures?.payWithExchange||h.OptionsController.state.remoteFeatures?.payments||h.OptionsController.state.features?.pay,isPayWithExchangeSupported:()=>P.isPayWithExchangeEnabled()&&l.ChainController.state.activeCaipNetwork&&c.ConstantsUtil.PAY_WITH_EXCHANGE_SUPPORTED_CHAIN_NAMESPACES.includes(l.ChainController.state.activeCaipNetwork.chainNamespace),async fetchExchanges(){try{const t=P.isPayWithExchangeSupported();if(!E.paymentAsset||!t)return E.exchanges=[],void(E.isLoading=!1);E.isLoading=!0;const n=await(0,m.getExchanges)({page:0,asset:(0,m.formatCaip19Asset)(E.paymentAsset.network,E.paymentAsset.asset),amount:E.amount?.toString()??'0'});E.exchanges=n.exchanges.slice(0,2)}catch(t){throw w.SnackController.showError('Unable to get exchanges'),new Error('Unable to get exchanges')}finally{E.isLoading=!1}},async getPayUrl(t,n){try{const s=Number(n.amount),o=await(0,m.getPayUrl)({exchangeId:t,asset:(0,m.formatCaip19Asset)(n.network,n.asset),amount:s.toString(),recipient:`${n.network}:${n.recipient}`});return y.EventsController.sendEvent({type:'track',event:'PAY_EXCHANGE_SELECTED',properties:{exchange:{id:t},configuration:{network:n.network,asset:n.asset,recipient:n.recipient,amount:s},currentPayment:{type:'exchange',exchangeId:t},source:'fund-from-exchange',headless:!1}}),o}catch(t){if(t instanceof Error&&t.message.includes('is not supported'))throw new Error('Asset not supported');throw new Error(t.message)}},async handlePayWithExchange(t){try{const n=l.ChainController.getAccountData()?.address;if(!n)throw new Error('No account connected');if(!E.paymentAsset)throw new Error('No payment asset selected');const s=u.CoreHelperUtil.returnOpenHref('','popupWindow','scrollbar=yes,width=480,height=720');if(!s)throw new Error('Could not create popup window');E.isPaymentInProgress=!0,E.paymentId=crypto.randomUUID(),E.currentPayment={type:'exchange',exchangeId:t};const{network:o,asset:c}=E.paymentAsset,m={network:o,asset:c,amount:E.tokenAmount,recipient:n},p=await P.getPayUrl(t,m);if(!p){try{s.close()}catch(t){console.error('Unable to close popup window',t)}throw new Error('Unable to initiate payment')}E.currentPayment.sessionId=p.sessionId,E.currentPayment.status='IN_PROGRESS',E.currentPayment.exchangeId=t,s.location.href=p.url}catch(t){E.error='Unable to initiate payment',w.SnackController.showError(E.error)}},async waitUntilComplete({exchangeId:t,sessionId:n,paymentId:s,retries:o=20}){const c=await P.getBuyStatus(t,n,s);if('SUCCESS'===c.status||'FAILED'===c.status)return c;if(0===o)throw new Error('Unable to get deposit status');return await new Promise(t=>{setTimeout(t,5e3)}),P.waitUntilComplete({exchangeId:t,sessionId:n,paymentId:s,retries:o-1})},async getBuyStatus(t,n,s){try{if(!E.currentPayment)throw new Error('No current payment');const o=await(0,m.getBuyStatus)({sessionId:n,exchangeId:t});if(E.currentPayment.status=o.status,'SUCCESS'===o.status||'FAILED'===o.status){const t=l.ChainController.getAccountData()?.address;E.currentPayment.result=o.txHash,E.isPaymentInProgress=!1,y.EventsController.sendEvent({type:'track',event:'SUCCESS'===o.status?'PAY_SUCCESS':'PAY_ERROR',properties:{message:'FAILED'===o.status?u.CoreHelperUtil.parseError(E.error):void 0,source:'fund-from-exchange',paymentId:s,configuration:{network:E.paymentAsset?.network||'',asset:E.paymentAsset?.asset||'',recipient:t||'',amount:E.amount??0},currentPayment:{type:'exchange',exchangeId:E.currentPayment?.exchangeId,sessionId:E.currentPayment?.sessionId,result:o.txHash}}})}return o}catch(t){return{status:'UNKNOWN',txHash:''}}},reset(){E.currentPayment=void 0,E.isPaymentInProgress=!1,E.paymentId='',E.paymentAsset=null,E.amount=0,E.tokenAmount=0,E.priceLoading=!1,E.error=null,E.exchanges=[],E.isLoading=!1}}},6257,[4209,4217,6192,6226,6215,6214,6258,6220,6218,6237,6222,6224]);
__d(function(g,r,i,a,m,e,d){"use strict";Object.defineProperty(e,'__esModule',{value:!0}),e.getApiUrl=c,e.getExchanges=async function(t){return(await l('reown_getExchanges',t)).result},e.getPayUrl=async function(t){return(await l('reown_getExchangePayUrl',t)).result},e.getBuyStatus=async function(t){return(await l('reown_getExchangeBuyStatus',t)).result},e.formatCaip19Asset=function(s,o){const{chainNamespace:c,chainId:l}=t.ParseUtil.parseCaipNetworkId(s),p=n[c];if(!p)throw new Error(`Unsupported chain namespace for CAIP-19 formatting: ${c}`);let b=p.native.assetNamespace,u=p.native.assetReference;'native'!==o&&(b=p.defaultTokenNamespace,u=o);return`${c}:${l}/${b}:${u}`},Object.defineProperty(e,"baseUSDC",{enumerable:!0,get:function(){return p}}),Object.defineProperty(e,"baseSepoliaUSDC",{enumerable:!0,get:function(){return b}}),Object.defineProperty(e,"assets",{enumerable:!0,get:function(){return u}}),e.getPaymentAssetsForNetwork=function(t){return Object.values(u).filter(s=>s.network===t)};var t=r(d[0]),s=r(d[1]);const n={eip155:{native:{assetNamespace:'slip44',assetReference:'60'},defaultTokenNamespace:'erc20'},solana:{native:{assetNamespace:'slip44',assetReference:'501'},defaultTokenNamespace:'token'}};class o extends Error{}function c(){const{sdkType:t,sdkVersion:n,projectId:o}=s.OptionsController.getSnapshot(),c=new URL('https://rpc.walletconnect.org/v1/json-rpc');return c.searchParams.set('projectId',o),c.searchParams.set('st',t),c.searchParams.set('sv',n),c.searchParams.set('source','fund-wallet'),c.toString()}async function l(t,n){const l=c(),{projectId:p}=s.OptionsController.getSnapshot(),b={jsonrpc:'2.0',id:1,method:t,params:Object.assign({},n||{},{projectId:p})},u=await fetch(l,{method:'POST',body:JSON.stringify(b),headers:{'Content-Type':'application/json'}}),S=await u.json();if(S.error)throw new o(S.error.message);return S}const p={network:'eip155:8453',asset:'0x833589fcd6edb6e08f4c7c32d4f71b54bda02913',metadata:{name:'USD Coin',symbol:'USDC',decimals:6}},b={network:'eip155:84532',asset:'0x036CbD53842c5426634e7929541eC2318f3dCF7e',metadata:{name:'USD Coin',symbol:'USDC',decimals:6}},u={ethereumETH:{network:'eip155:1',asset:'native',metadata:{name:'Ethereum',symbol:'ETH',decimals:18}},baseETH:{network:'eip155:8453',asset:'native',metadata:{name:'Ethereum',symbol:'ETH',decimals:18}},baseUSDC:p,baseSepoliaETH:{network:'eip155:84532',asset:'native',metadata:{name:'Ethereum',symbol:'ETH',decimals:18}},ethereumUSDC:{network:'eip155:1',asset:'0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',metadata:{name:'USD Coin',symbol:'USDC',decimals:6}},arbitrumUSDC:{network:'eip155:42161',asset:'0xaf88d065e77c8cC2239327C5EDb3A432268e5831',metadata:{name:'USD Coin',symbol:'USDC',decimals:6}},polygonUSDC:{network:'eip155:137',asset:'0x2791bca1f2de4661ed88a30c99a7a9449aa84174',metadata:{name:'USD Coin',symbol:'USDC',decimals:6}},solanaUSDC:{network:'solana:5eykt4UsFv8P8NJdTREpY1vzqKqZKvdp',asset:'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v',metadata:{name:'USD Coin',symbol:'USDC',decimals:6}},ethereumUSDT:{network:'eip155:1',asset:'0xdAC17F958D2ee523a2206206994597C13D831ec7',metadata:{name:'Tether USD',symbol:'USDT',decimals:6}},optimismUSDT:{network:'eip155:10',asset:'0x94b008aA00579c1307B0EF2c499aD98a8ce58e58',metadata:{name:'Tether USD',symbol:'USDT',decimals:6}},arbitrumUSDT:{network:'eip155:42161',asset:'0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9',metadata:{name:'Tether USD',symbol:'USDT',decimals:6}},polygonUSDT:{network:'eip155:137',asset:'0xc2132d05d31c914a87c6611c10748aeb04b58e8f',metadata:{name:'Tether USD',symbol:'USDT',decimals:6}},solanaUSDT:{network:'solana:5eykt4UsFv8P8NJdTREpY1vzqKqZKvdp',asset:'Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB',metadata:{name:'Tether USD',symbol:'USDT',decimals:6}},solanaSOL:{network:'solana:5eykt4UsFv8P8NJdTREpY1vzqKqZKvdp',asset:'native',metadata:{name:'Solana',symbol:'SOL',decimals:9}}}},6258,[6192,6222]);
__d(function(g,r,i,a,m,e,d){"use strict";Object.defineProperty(e,'__esModule',{value:!0}),Object.defineProperty(e,"RouterUtil",{enumerable:!0,get:function(){return l}});var o=r(d[0]),t=r(d[1]);const l={goBackOrCloseModal(){t.RouterController.state.history.length>1?t.RouterController.goBack():o.ModalController.close()},navigateAfterNetworkSwitch(){const{history:l}=t.RouterController.state,n=l.findIndex(o=>'Networks'===o);n>=1?t.RouterController.goBackToIndex(n-1):o.ModalController.close()}}},6259,[6213,6238]);
__d(function(g,r,i,a,m,e,d){"use strict";Object.defineProperty(e,'__esModule',{value:!0}),Object.defineProperty(e,"SIWXUtil",{enumerable:!0,get:function(){return v}}),r(d[0]);var t=r(d[1]),n=r(d[2]),s=r(d[3]),o=r(d[4]),c=r(d[5]),l=r(d[6]),C=r(d[7]),p=r(d[8]),u=r(d[9]),h=r(d[10]),S=r(d[11]),w=r(d[12]);let I=null;const v={getSIWX:()=>p.OptionsController.state.siwx,async initializeIfEnabled(t=s.ChainController.getActiveCaipAddress()){const n=p.OptionsController.state.siwx;if(!n||!t)return;const[c,S,w]=t.split(':');if(s.ChainController.checkIfSupportedNetwork(c,`${c}:${S}`))try{if(p.OptionsController.state.remoteFeatures?.emailCapture){const t=s.ChainController.getAccountData(c)?.user;return void await C.ModalController.open({view:'DataCapture',data:{email:t?.email??void 0}})}I&&await I;if((await n.getSessions(`${c}:${S}`,w)).length)return;await C.ModalController.open({view:'SIWXSignMessage'})}catch(t){console.error('SIWXUtil:initializeIfEnabled',t),l.EventsController.sendEvent({type:'track',event:'SIWX_AUTH_ERROR',properties:this.getSIWXEventProperties(t)}),await(o.ConnectionController._getClient()?.disconnect().catch(console.error)),u.RouterController.reset('Connect'),h.SnackController.showError('A problem occurred while trying initialize authentication')}},async requestSignMessage(){const n=p.OptionsController.state.siwx,I=w.CoreHelperUtil.getPlainAddress(s.ChainController.getActiveCaipAddress()),v=(0,S.getActiveCaipNetwork)(),A=o.ConnectionController._getClient();if(!n)throw new Error('SIWX is not enabled');if(!I)throw new Error('No ActiveCaipAddress found');if(!v)throw new Error('No ActiveCaipNetwork or client found');if(!A)throw new Error('No ConnectionController client found');try{const o=await n.createMessage({chainId:v.caipNetworkId,accountAddress:I}),p=o.toString();c.ConnectorController.getConnectorId(v.chainNamespace)===t.ConstantsUtil.CONNECTOR_ID.AUTH&&u.RouterController.pushTransactionStack({});const h=await A.signMessage(p);await n.addSession({data:o,message:p,signature:h}),s.ChainController.setLastConnectedSIWECaipNetwork(v),C.ModalController.close(),l.EventsController.sendEvent({type:'track',event:'SIWX_AUTH_SUCCESS',properties:this.getSIWXEventProperties()})}catch(t){C.ModalController.state.open&&'ApproveTransaction'!==u.RouterController.state.view||await C.ModalController.open({view:'SIWXSignMessage'}),h.SnackController.showError('Error signing message'),l.EventsController.sendEvent({type:'track',event:'SIWX_AUTH_ERROR',properties:this.getSIWXEventProperties(t)}),console.error('SWIXUtil:requestSignMessage',t)}},async cancelSignMessage(){try{const t=this.getSIWX(),n=t?.getRequired?.();if(n){const n=s.ChainController.getLastConnectedSIWECaipNetwork();if(n){const c=await(t?.getSessions(n?.caipNetworkId,w.CoreHelperUtil.getPlainAddress(s.ChainController.getActiveCaipAddress())||''));c&&c.length>0?await s.ChainController.switchActiveNetwork(n):await o.ConnectionController.disconnect()}else await o.ConnectionController.disconnect()}else C.ModalController.close();C.ModalController.close(),l.EventsController.sendEvent({event:'CLICK_CANCEL_SIWX',type:'track',properties:this.getSIWXEventProperties()})}catch(t){console.error('SIWXUtil:cancelSignMessage',t)}},async getAllSessions(){const t=this.getSIWX(),n=s.ChainController.getAllRequestedCaipNetworks(),o=[];return await Promise.all(n.map(async n=>{const c=await(t?.getSessions(n.caipNetworkId,w.CoreHelperUtil.getPlainAddress(s.ChainController.getActiveCaipAddress())||''));c&&o.push(...c)})),o},async getSessions(t){const n=p.OptionsController.state.siwx;let o=t?.address;if(!o){const t=s.ChainController.getActiveCaipAddress();o=w.CoreHelperUtil.getPlainAddress(t)}let c=t?.caipNetworkId;if(!c){const t=s.ChainController.getActiveCaipNetwork();c=t?.caipNetworkId}return n&&o&&c?n.getSessions(c,o):[]},async isSIWXCloseDisabled(){const t=this.getSIWX();if(t){const n='ApproveTransaction'===u.RouterController.state.view,s='SIWXSignMessage'===u.RouterController.state.view;if(n||s)return t.getRequired?.()&&0===(await this.getSessions()).length}return!1},async authConnectorAuthenticate({authConnector:n,chainId:o,socialUri:c,preferredAccountType:l,chainNamespace:C}){const u=v.getSIWX(),h=(0,S.getActiveCaipNetwork)();if(!u||!C.includes(t.ConstantsUtil.CHAIN.EVM)||p.OptionsController.state.remoteFeatures?.emailCapture){const t=await n.connect({chainId:o,socialUri:c,preferredAccountType:l});return{address:t.address,chainId:t.chainId,accounts:t.accounts}}const w=`${C}:${o}`,I=await u.createMessage({chainId:w,accountAddress:'<<AccountAddress>>'}),A={accountAddress:I.accountAddress,chainId:I.chainId,domain:I.domain,uri:I.uri,version:I.version,nonce:I.nonce,notBefore:I.notBefore,statement:I.statement,resources:I.resources,requestId:I.requestId,issuedAt:I.issuedAt,expirationTime:I.expirationTime,serializedMessage:I.toString()},E=await n.connect({chainId:o,socialUri:c,siwxMessage:A,preferredAccountType:l});if(A.accountAddress=E.address,A.serializedMessage=E.message||'',E.signature&&E.message){const t=v.addEmbeddedWalletSession(A,E.message,E.signature);await t}return s.ChainController.setLastConnectedSIWECaipNetwork(h),{address:E.address,chainId:E.chainId,accounts:E.accounts}},async addEmbeddedWalletSession(t,n,s){if(I)return I;const o=v.getSIWX();return o?(I=o.addSession({data:t,message:n,signature:s}).finally(()=>{I=null}),I):Promise.resolve()},async universalProviderAuthenticate({universalProvider:t,chains:n,methods:o}){const c=v.getSIWX(),C=(0,S.getActiveCaipNetwork)(),p=new Set(n.map(t=>t.split(':')[0]));if(!c||1!==p.size||!p.has('eip155'))return!1;const u=await c.createMessage({chainId:(0,S.getActiveCaipNetwork)()?.caipNetworkId||'',accountAddress:''}),w=await t.authenticate({nonce:u.nonce,domain:u.domain,uri:u.uri,exp:u.expirationTime,iat:u.issuedAt,nbf:u.notBefore,requestId:u.requestId,version:u.version,resources:u.resources,statement:u.statement,chainId:u.chainId,methods:o,chains:[u.chainId,...n.filter(t=>t!==u.chainId)]});h.SnackController.showLoading('Authenticating...',{autoClose:!1});const I=Object.assign({},w.session.peer.metadata,{name:w.session.peer.metadata.name,icon:w.session.peer.metadata.icons?.[0],type:'WALLET_CONNECT'});if(s.ChainController.setAccountProp('connectedWalletInfo',I,Array.from(p)[0]),w?.auths?.length){const n=w.auths.map(n=>{const s=t.client.formatAuthMessage({request:n.p,iss:n.p.iss});return{data:Object.assign({},n.p,{accountAddress:n.p.iss.split(':').slice(-1).join(''),chainId:n.p.iss.split(':').slice(2,4).join(':'),uri:n.p.aud,version:n.p.version||u.version,expirationTime:n.p.exp,issuedAt:n.p.iat,notBefore:n.p.nbf}),message:s,signature:n.s.s,cacao:n}});try{await c.setSessions(n),C&&s.ChainController.setLastConnectedSIWECaipNetwork(C),l.EventsController.sendEvent({type:'track',event:'SIWX_AUTH_SUCCESS',properties:v.getSIWXEventProperties()})}catch(n){throw console.error('SIWX:universalProviderAuth - failed to set sessions',n),l.EventsController.sendEvent({type:'track',event:'SIWX_AUTH_ERROR',properties:v.getSIWXEventProperties(n)}),await t.disconnect().catch(console.error),n}finally{h.SnackController.hide()}}return!0},getSIWXEventProperties(t){const o=s.ChainController.state.activeChain;if(!o)throw new Error('SIWXUtil:getSIWXEventProperties - namespace is required');return{network:s.ChainController.state.activeCaipNetwork?.caipNetworkId||'',isSmartAccount:(0,S.getPreferredAccountType)(o)===n.W3mFrameRpcConstants.ACCOUNT_TYPES.SMART_ACCOUNT,message:t?w.CoreHelperUtil.parseError(t):void 0}},async clearSessions(){const t=this.getSIWX();t&&await t.setSessions([])}}},6260,[2650,6192,6228,6218,6225,6230,6237,6213,6222,6238,6224,6226,6214]);
__d(function(g,r,i,a,m,e,d){"use strict";Object.defineProperty(e,'__esModule',{value:!0}),Object.defineProperty(e,"ModalUtil",{enumerable:!0,get:function(){return s}});var t=r(d[0]),o=r(d[1]),n=r(d[2]),l=r(d[3]);const s={isUnsupportedChainView:()=>'UnsupportedChain'===n.RouterController.state.view||'SwitchNetwork'===n.RouterController.state.view&&n.RouterController.state.history.includes('UnsupportedChain'),async safeClose(){if(this.isUnsupportedChainView())return void o.ModalController.shake();await l.SIWXUtil.isSIWXCloseDisabled()?o.ModalController.shake():('DataCapture'!==n.RouterController.state.view&&'DataCaptureOtpConfirm'!==n.RouterController.state.view||t.ConnectionController.disconnect(),o.ModalController.close())}}},6261,[6225,6213,6238,6260]);
__d(function(g,r,_i,_a,m,e,d){"use strict";Object.defineProperty(e,'__esModule',{value:!0}),Object.defineProperty(e,"ConnectorUtil",{enumerable:!0,get:function(){return a}});var t=r(d[0]),l=r(d[1]),n=r(d[2]),o=r(d[3]);const a={getConnectorsByType(t,n,a){const{customWallets:i}=l.OptionsController.state,s=l.StorageUtil.getRecentWallets(),c=o.WalletUtil.filterOutDuplicateWallets(n),C=o.WalletUtil.filterOutDuplicateWallets(a),p=t.filter(t=>'MULTI_CHAIN'===t.type),u=t.filter(t=>'ANNOUNCED'===t.type),h=t.filter(t=>'INJECTED'===t.type);return{custom:i,recent:s,external:t.filter(t=>'EXTERNAL'===t.type),multiChain:p,announced:u,injected:h,recommended:c,featured:C}},showConnector(t){const o=t.info?.rdns,a=Boolean(o)&&l.ApiController.state.excludedWallets.some(t=>Boolean(t.rdns)&&t.rdns===o),i=Boolean(t.name)&&l.ApiController.state.excludedWallets.some(l=>n.HelpersUtil.isLowerCaseMatch(l.name,t.name));if('INJECTED'===t.type){if('Browser Wallet'===t.name){if(!l.CoreHelperUtil.isMobile())return!1;if(l.CoreHelperUtil.isMobile()&&!o&&!l.ConnectionController.checkInstalled())return!1}if(a||i)return!1}return'ANNOUNCED'!==t.type&&'EXTERNAL'!==t.type||!a&&!i},getIsConnectedWithWC:()=>Array.from(l.ChainController.state.chains.values()).some(n=>l.ConnectorController.getConnectorId(n.namespace)===t.ConstantsUtil.CONNECTOR_ID.WALLET_CONNECT),getConnectorTypeOrder({recommended:t,featured:n,custom:o,recent:a,announced:i,injected:s,multiChain:c,external:C,overriddenConnectors:p=l.OptionsController.state.features?.connectorTypeOrder??[]}){const u=[{type:'walletConnect',isEnabled:!0},{type:'recent',isEnabled:a.length>0},{type:'injected',isEnabled:[...s,...i,...c].length>0},{type:'featured',isEnabled:n.length>0},{type:'custom',isEnabled:o&&o.length>0},{type:'external',isEnabled:C.length>0},{type:'recommended',isEnabled:t.length>0}].filter(t=>t.isEnabled),h=new Set(u.map(t=>t.type)),f=p.filter(t=>h.has(t)).map(t=>({type:t,isEnabled:!0})),W=u.filter(({type:t})=>!f.some(({type:l})=>l===t));return Array.from(new Set([...f,...W].map(({type:t})=>t)))},sortConnectorsByExplorerWallet:t=>[...t].sort((t,l)=>t.explorerWallet&&l.explorerWallet?(t.explorerWallet.order??0)-(l.explorerWallet.order??0):t.explorerWallet?-1:l.explorerWallet?1:0),getAuthName:({email:t,socialUsername:l,socialProvider:n})=>l?n&&'discord'===n&&l.endsWith('0')?l.slice(0,-1):l:t.length>30?`${t.slice(0,-3)}...`:t,async fetchProviderData(n){try{if('Browser Wallet'===n.name&&!l.CoreHelperUtil.isMobile())return{accounts:[],chainId:void 0};if(n.id===t.ConstantsUtil.CONNECTOR_ID.AUTH)return{accounts:[],chainId:void 0};const[o,a]=await Promise.all([n.provider?.request({method:'eth_accounts'}),n.provider?.request({method:'eth_chainId'}).then(t=>Number(t))]);return{accounts:o,chainId:a}}catch(t){return console.warn(`Failed to fetch provider data for ${n.name}`,t),{accounts:[],chainId:void 0}}},getFilteredCustomWallets(t){const n=l.StorageUtil.getRecentWallets(),o=l.ConnectorController.state.connectors.map(t=>t.info?.rdns).filter(Boolean),a=n.map(t=>t.rdns).filter(Boolean),i=o.concat(a);if(i.includes('io.metamask.mobile')&&l.CoreHelperUtil.isMobile()){const t=i.indexOf('io.metamask.mobile');i[t]='io.metamask'}return t.filter(t=>!i.includes(String(t?.rdns)))},hasWalletConnector:t=>l.ConnectorController.state.connectors.some(l=>l.id===t.id||l.name===t.name),isWalletCompatibleWithCurrentChain(t){const n=l.ChainController.state.activeChain;return!n||!t.chains||t.chains.some(t=>{const l=t.split(':')[0];return n===l})},getFilteredRecentWallets(){return l.StorageUtil.getRecentWallets().filter(t=>!o.WalletUtil.isExcluded(t)).filter(t=>!this.hasWalletConnector(t)).filter(t=>this.isWalletCompatibleWithCurrentChain(t))},getCappedRecommendedWallets(t){const{connectors:n}=l.ConnectorController.state,{customWallets:a,featuredWalletIds:i}=l.OptionsController.state,s=n.find(t=>'walletConnect'===t.id),c=n.filter(t=>'INJECTED'===t.type||'ANNOUNCED'===t.type||'MULTI_CHAIN'===t.type);if(!s&&!c.length&&!a?.length)return[];const C=l.OptionsUtil.isEmailEnabled(),p=l.OptionsUtil.isSocialsEnabled(),u=c.filter(t=>'Browser Wallet'!==t.name),h=(i?.length||0)+(a?.length||0)+(u.length||0)+(C?1:0)+(p?1:0),f=Math.max(0,4-h);if(f<=0)return[];return o.WalletUtil.filterOutDuplicateWallets(t).slice(0,f)}}},6262,[6192,6247,6263,6275]);
__d(function(g,r,i,a,m,e,d){"use strict";Object.defineProperty(e,'__esModule',{value:!0}),Object.defineProperty(e,"ConstantsUtil",{enumerable:!0,get:function(){return t.ConstantsUtil}}),Object.defineProperty(e,"PresetsUtil",{enumerable:!0,get:function(){return n.PresetsUtil}}),Object.defineProperty(e,"HelpersUtil",{enumerable:!0,get:function(){return o.HelpersUtil}}),Object.defineProperty(e,"SemVerUtils",{enumerable:!0,get:function(){return l.SemVerUtils}}),Object.defineProperty(e,"ErrorUtil",{enumerable:!0,get:function(){return u.ErrorUtil}}),Object.defineProperty(e,"TokenUtil",{enumerable:!0,get:function(){return c.TokenUtil}}),Object.defineProperty(e,"LoggerUtil",{enumerable:!0,get:function(){return f.LoggerUtil}}),Object.defineProperty(e,"CaipNetworksUtil",{enumerable:!0,get:function(){return b.CaipNetworksUtil}}),Object.defineProperty(e,"getBlockchainApiRpcUrl",{enumerable:!0,get:function(){return b.getBlockchainApiRpcUrl}}),Object.defineProperty(e,"SocialProviderEnum",{enumerable:!0,get:function(){return p.SocialProviderEnum}});var t=r(d[0]),n=r(d[1]),o=r(d[2]),l=r(d[3]),u=r(d[4]),c=r(d[5]),f=r(d[6]),b=r(d[7]),p=r(d[8])},6263,[6264,6265,6266,6267,6268,6269,6270,6273,6274]);
__d(function(g,r,i,a,m,e,d){"use strict";Object.defineProperty(e,'__esModule',{value:!0}),Object.defineProperty(e,"ConstantsUtil",{enumerable:!0,get:function(){return N}});const N={METMASK_CONNECTOR_NAME:'MetaMask',TRUST_CONNECTOR_NAME:'Trust Wallet',SOLFLARE_CONNECTOR_NAME:'Solflare',PHANTOM_CONNECTOR_NAME:'Phantom',COIN98_CONNECTOR_NAME:'Coin98',MAGIC_EDEN_CONNECTOR_NAME:'Magic Eden',BACKPACK_CONNECTOR_NAME:'Backpack',BITGET_CONNECTOR_NAME:'Bitget Wallet',FRONTIER_CONNECTOR_NAME:'Frontier',XVERSE_CONNECTOR_NAME:'Xverse Wallet',LEATHER_CONNECTOR_NAME:'Leather',OKX_CONNECTOR_NAME:'OKX Wallet',EIP155:r(d[0]).ConstantsUtil.CHAIN.EVM,ADD_CHAIN_METHOD:'wallet_addEthereumChain',EIP6963_ANNOUNCE_EVENT:'eip6963:announceProvider',EIP6963_REQUEST_EVENT:'eip6963:requestProvider',CONNECTOR_RDNS_MAP:{coinbaseWallet:'com.coinbase.wallet',coinbaseWalletSDK:'com.coinbase.wallet'},CONNECTOR_TYPE_EXTERNAL:'EXTERNAL',CONNECTOR_TYPE_WALLET_CONNECT:'WALLET_CONNECT',CONNECTOR_TYPE_INJECTED:'INJECTED',CONNECTOR_TYPE_ANNOUNCED:'ANNOUNCED',CONNECTOR_TYPE_AUTH:'AUTH',CONNECTOR_TYPE_MULTI_CHAIN:'MULTI_CHAIN',CONNECTOR_TYPE_W3M_AUTH:'ID_AUTH',getSDKVersionWarningMessage:(N,E)=>`\n     @@@@@@@           @@@@@@@@@@@@@@@@@@      \n   @@@@@@@@@@@      @@@@@@@@@@@@@@@@@@@@@@@@   \n  @@@@@@@@@@@@@    @@@@@@@@@@@@@@@@@@@@@@@@@@  \n @@@@@@@@@@@@@@@  @@@@@@@@@@@@@@@@@@@@@@@@@@@  \n @@@@@@@@@@@@@@@  @@@@@@@@@@@@@@   @@@@@@@@@@@ \n @@@@@@@@@@@@@@@  @@@@@@@@@@@@@   @@@@@@@@@@@@ \n @@@@@@@@@@@@@@@  @@@@@@@@@@@@@  @@@@@@@@@@@@@\n @@@@@@@@@@@@@@@  @@@@@@@@@@@@   @@@@@@@@@@@@@    \n @@@@@@   @@@@@@  @@@@@@@@@@@   @@@@@@@@@@@@@@    \n @@@@@@   @@@@@@  @@@@@@@@@@@  @@@@@@@@@@@@@@@ \n @@@@@@@@@@@@@@@  @@@@@@@@@@   @@@@@@@@@@@@@@@ \n @@@@@@@@@@@@@@@  @@@@@@@@@@@@@@@@@@@@@@@@@@@  \n  @@@@@@@@@@@@@    @@@@@@@@@@@@@@@@@@@@@@@@@@  \n   @@@@@@@@@@@      @@@@@@@@@@@@@@@@@@@@@@@@   \n      @@@@@            @@@@@@@@@@@@@@@@@@  \n      \nAppKit SDK version ${N} is outdated. Latest version is ${E}. Please update to the latest version for bug fixes and new features.\n            \nChangelog: https://github.com/reown-com/appkit/releases\nNPM Registry: https://www.npmjs.com/package/@reown/appkit`}},6264,[6192]);
__d(function(g,r,i,a,m,e,d){"use strict";Object.defineProperty(e,'__esModule',{value:!0}),Object.defineProperty(e,"PresetsUtil",{enumerable:!0,get:function(){return f}});var b=r(d[0]),c=r(d[1]);const f={ConnectorExplorerIds:{[b.ConstantsUtil.CONNECTOR_ID.COINBASE]:'fd20dc426fb37566d803205b19bbc1d4096b248ac04548e3cfb6b3a38bd033aa',[b.ConstantsUtil.CONNECTOR_ID.COINBASE_SDK]:'fd20dc426fb37566d803205b19bbc1d4096b248ac04548e3cfb6b3a38bd033aa',[b.ConstantsUtil.CONNECTOR_ID.SAFE]:'225affb176778569276e484e1b92637ad061b01e13a048b35a9d280c3b58970f',[b.ConstantsUtil.CONNECTOR_ID.LEDGER]:'19177a98252e07ddfc9af2083ba8e07ef627cb6103467ffebb3f8f4205fd7927',[b.ConstantsUtil.CONNECTOR_ID.OKX]:'971e689d0a5be527bac79629b4ee9b925e82208e5168b733496a09c0faed0709',[c.ConstantsUtil.METMASK_CONNECTOR_NAME]:'c57ca95b47569778a828d19178114f4db188b89b763c899ba0be274e97267d96',[c.ConstantsUtil.TRUST_CONNECTOR_NAME]:'4622a2b2d6af1c9844944291e5e7351a6aa24cd7b23099efac1b2fd875da31a0',[c.ConstantsUtil.SOLFLARE_CONNECTOR_NAME]:'1ca0bdd4747578705b1939af023d120677c64fe6ca76add81fda36e350605e79',[c.ConstantsUtil.PHANTOM_CONNECTOR_NAME]:'a797aa35c0fadbfc1a53e7f675162ed5226968b44a19ee3d24385c64d1d3c393',[c.ConstantsUtil.COIN98_CONNECTOR_NAME]:'2a3c89040ac3b723a1972a33a125b1db11e258a6975d3a61252cd64e6ea5ea01',[c.ConstantsUtil.MAGIC_EDEN_CONNECTOR_NAME]:'8b830a2b724a9c3fbab63af6f55ed29c9dfa8a55e732dc88c80a196a2ba136c6',[c.ConstantsUtil.BACKPACK_CONNECTOR_NAME]:'2bd8c14e035c2d48f184aaa168559e86b0e3433228d3c4075900a221785019b0',[c.ConstantsUtil.BITGET_CONNECTOR_NAME]:'38f5d18bd8522c244bdd70cb4a68e0e718865155811c043f052fb9f1c51de662',[c.ConstantsUtil.FRONTIER_CONNECTOR_NAME]:'85db431492aa2e8672e93f4ea7acf10c88b97b867b0d373107af63dc4880f041',[c.ConstantsUtil.XVERSE_CONNECTOR_NAME]:'2a87d74ae02e10bdd1f51f7ce6c4e1cc53cd5f2c0b6b5ad0d7b3007d2b13de7b',[c.ConstantsUtil.LEATHER_CONNECTOR_NAME]:'483afe1df1df63daf313109971ff3ef8356ddf1cc4e45877d205eee0b7893a13',[c.ConstantsUtil.OKX_CONNECTOR_NAME]:'971e689d0a5be527bac79629b4ee9b925e82208e5168b733496a09c0faed0709'},NetworkImageIds:{1:'ba0ba0cd-17c6-4806-ad93-f9d174f17900',42161:'3bff954d-5cb0-47a0-9a23-d20192e74600',43114:'30c46e53-e989-45fb-4549-be3bd4eb3b00',56:'93564157-2e8e-4ce7-81df-b264dbee9b00',250:'06b26297-fe0c-4733-5d6b-ffa5498aac00',10:'ab9c186a-c52f-464b-2906-ca59d760a400',137:'41d04d42-da3b-4453-8506-668cc0727900',5e3:'e86fae9b-b770-4eea-e520-150e12c81100',295:'6a97d510-cac8-4e58-c7ce-e8681b044c00',11155111:'e909ea0a-f92a-4512-c8fc-748044ea6800',84532:'a18a7ecd-e307-4360-4746-283182228e00',1301:'4eeea7ef-0014-4649-5d1d-07271a80f600',130:'2257980a-3463-48c6-cbac-a42d2a956e00',10143:'0a728e83-bacb-46db-7844-948f05434900',100:'02b53f6a-e3d4-479e-1cb4-21178987d100',9001:'f926ff41-260d-4028-635e-91913fc28e00',324:'b310f07f-4ef7-49f3-7073-2a0a39685800',314:'5a73b3dd-af74-424e-cae0-0de859ee9400',4689:'34e68754-e536-40da-c153-6ef2e7188a00',1088:'3897a66d-40b9-4833-162f-a2c90531c900',1284:'161038da-44ae-4ec7-1208-0ea569454b00',1285:'f1d73bb6-5450-4e18-38f7-fb6484264a00',7777777:'845c60df-d429-4991-e687-91ae45791600',42220:'ab781bbc-ccc6-418d-d32d-789b15da1f00',8453:'7289c336-3981-4081-c5f4-efc26ac64a00',1313161554:'3ff73439-a619-4894-9262-4470c773a100',2020:'b8101fc0-9c19-4b6f-ec65-f6dfff106e00',2021:'b8101fc0-9c19-4b6f-ec65-f6dfff106e00',80094:'e329c2c9-59b0-4a02-83e4-212ff3779900',2741:'fc2427d1-5af9-4a9c-8da5-6f94627cd900','5eykt4UsFv8P8NJdTREpY1vzqKqZKvdp':'a1b58899-f671-4276-6a5e-56ca5bd59700','4uhcVJyU9pJkvQyS88uRDiswHXSCkY3z':'a1b58899-f671-4276-6a5e-56ca5bd59700',EtWTRABZaYq6iMfeYKouRu166VU2xqa1:'a1b58899-f671-4276-6a5e-56ca5bd59700','000000000019d6689c085ae165831e93':'0b4838db-0161-4ffe-022d-532bf03dba00','000000000933ea01ad0ee984209779ba':'39354064-d79b-420b-065d-f980c4b78200','00000008819873e925422c1ff0f99f7c':'b3406e4a-bbfc-44fb-e3a6-89673c78b700'},ConnectorImageIds:{[b.ConstantsUtil.CONNECTOR_ID.COINBASE]:'0c2840c3-5b04-4c44-9661-fbd4b49e1800',[b.ConstantsUtil.CONNECTOR_ID.COINBASE_SDK]:'0c2840c3-5b04-4c44-9661-fbd4b49e1800',[b.ConstantsUtil.CONNECTOR_ID.SAFE]:'461db637-8616-43ce-035a-d89b8a1d5800',[b.ConstantsUtil.CONNECTOR_ID.LEDGER]:'54a1aa77-d202-4f8d-0fb2-5d2bb6db0300',[b.ConstantsUtil.CONNECTOR_ID.WALLET_CONNECT]:'ef1a1fcf-7fe8-4d69-bd6d-fda1345b4400',[b.ConstantsUtil.CONNECTOR_ID.INJECTED]:'07ba87ed-43aa-4adf-4540-9e6a2b9cae00'},ConnectorNamesMap:{[b.ConstantsUtil.CONNECTOR_ID.INJECTED]:'Browser Wallet',[b.ConstantsUtil.CONNECTOR_ID.WALLET_CONNECT]:'WalletConnect',[b.ConstantsUtil.CONNECTOR_ID.COINBASE]:'Coinbase',[b.ConstantsUtil.CONNECTOR_ID.COINBASE_SDK]:'Coinbase',[b.ConstantsUtil.CONNECTOR_ID.LEDGER]:'Ledger',[b.ConstantsUtil.CONNECTOR_ID.SAFE]:'Safe'},ConnectorTypesMap:{[b.ConstantsUtil.CONNECTOR_ID.INJECTED]:'INJECTED',[b.ConstantsUtil.CONNECTOR_ID.WALLET_CONNECT]:'WALLET_CONNECT',[b.ConstantsUtil.CONNECTOR_ID.EIP6963]:'ANNOUNCED',[b.ConstantsUtil.CONNECTOR_ID.AUTH]:'AUTH',[c.ConstantsUtil.CONNECTOR_TYPE_AUTH]:'AUTH'},WalletConnectRpcChainIds:[1,5,11155111,10,420,42161,421613,137,80001,42220,1313161554,1313161555,56,97,43114,43113,100,8453,84531,7777777,999,324,280]}},6265,[6192,6264]);
__d(function(g,r,i,a,m,e,d){"use strict";Object.defineProperty(e,'__esModule',{value:!0}),Object.defineProperty(e,"HelpersUtil",{enumerable:!0,get:function(){return s}});var t=r(d[0]),n=r(d[1]),o=r(d[2]);const s={getCaipTokens(t){if(!t)return;const n={};return Object.entries(t).forEach(([t,s])=>{n[`${o.ConstantsUtil.EIP155}:${t}`]=s}),n},isLowerCaseMatch:(t,n)=>t?.toLowerCase()===n?.toLowerCase(),getActiveNamespaceConnectedToAuth(){const o=n.ChainController.state.activeChain;return t.ConstantsUtil.AUTH_CONNECTOR_SUPPORTED_CHAINS.find(s=>n.ConnectorController.getConnectorId(s)===t.ConstantsUtil.CONNECTOR_ID.AUTH&&s===o)},withRetry({conditionFn:t,intervalMs:n,maxRetries:o}){let s=0;return new Promise(c=>{!(async function C(){return s+=1,await t()?c(!0):s>=o?c(!1):(setTimeout(C,n),null)})()})},userChainIdToChainNamespace(n){if('number'==typeof n)return t.ConstantsUtil.CHAIN.EVM;const[o]=n.split(':');return o},getOtherAuthNamespaces(n){if(!n)return[];return t.ConstantsUtil.AUTH_CONNECTOR_SUPPORTED_CHAINS.filter(t=>t!==n)},getConnectorStorageInfo(t,o){const c=n.StorageUtil.getConnections()[o]??[];return{hasDisconnected:n.StorageUtil.isConnectorDisconnected(t,o),hasConnected:c.some(n=>s.isLowerCaseMatch(n.connectorId,t))}}}},6266,[6192,6247,6264]);
__d(function(g,r,_i,a,m,e,d){"use strict";Object.defineProperty(e,'__esModule',{value:!0}),Object.defineProperty(e,"SemVerUtils",{enumerable:!0,get:function(){return i}});var t=r(d[0]),n=r(d[1]),s=r(d[2]);const i={extractVersion(t){if(!t||'string'!=typeof t)return null;const n=t.match(/(?:[~^>=<]+\s*)?(?<version>\d+(?:\.\d+){0,2})(?:-[a-zA-Z]+\.\d+)?/u);return n?.groups?.version||null},checkSDKVersion(i){const o=this.extractVersion(i),c=t.ConstantsUtil.IS_DEVELOPMENT;if(!o||!c)return;const l=n.StorageUtil.getLatestAppKitVersion();if(this.isValidVersion(l)&&this.isOlder(o,l))console.warn(s.ConstantsUtil.getSDKVersionWarningMessage(o,l));else try{fetch('https://registry.npmjs.org/@reown/appkit/latest').then(t=>t.json()).then(t=>{const i=t.version;this.isOlder(o,i)&&(n.StorageUtil.updateLatestAppKitVersion({timestamp:Date.now(),version:i}),console.warn(s.ConstantsUtil.getSDKVersionWarningMessage(o,i)))})}catch(t){}},isValidVersion:t=>'string'==typeof t&&/^\d+\.\d+\.\d+$/u.test(t),isOlder(t,n){const s=this.extractVersion(t),i=this.extractVersion(n);if(!s||!i)return!1;function o(t){const n=t.split('.').map(Number);for(;n.length<3;)n.push(0);return n}const c=o(s),l=o(i);for(let t=0;t<Math.max(c.length,l.length);t+=1){const n=c[t]||0,s=l[t]||0;if(n<s)return!0;if(n>s)return!1}return!1}}},6267,[6192,6247,6264]);
__d(function(g,r,i,a,m,e,d){"use strict";Object.defineProperty(e,'__esModule',{value:!0}),Object.defineProperty(e,"ErrorUtil",{enumerable:!0,get:function(){return o}});var s=r(d[0]);const o={EmbeddedWalletAbortController:new AbortController,UniversalProviderErrors:{UNAUTHORIZED_DOMAIN_NOT_ALLOWED:{message:'Unauthorized: origin not allowed',alertErrorKey:'ORIGIN_NOT_ALLOWED'},JWT_VALIDATION_ERROR:{message:'JWT validation error: JWT Token is not yet valid',alertErrorKey:'JWT_TOKEN_NOT_VALID'},INVALID_KEY:{message:'Unauthorized: invalid key',alertErrorKey:'INVALID_PROJECT_ID'}},ALERT_ERRORS:{SWITCH_NETWORK_NOT_FOUND:{code:'APKT001',displayMessage:'Network Not Found',debugMessage:'The specified network is not recognized. Please ensure it is included in the `networks` array of your `createAppKit` configuration.'},ORIGIN_NOT_ALLOWED:{code:'APKT002',displayMessage:'Invalid App Configuration',debugMessage:()=>`The origin ${(0,s.isSafe)()?window.origin:'unknown'} is not in your allow list. Please update your allowed domains at https://dashboard.reown.com.`},IFRAME_LOAD_FAILED:{code:'APKT003',displayMessage:'Network Error: Wallet Load Failed',debugMessage:()=>'Failed to load the embedded wallet. This may be due to network issues or server downtime. Please check your network connection and try again shortly. Contact support if the issue persists.'},IFRAME_REQUEST_TIMEOUT:{code:'APKT004',displayMessage:'Wallet Request Timeout',debugMessage:()=>'The request to the embedded wallet timed out. Please check your network connection and try again shortly. Contact support if the issue persists.'},UNVERIFIED_DOMAIN:{code:'APKT005',displayMessage:'Unverified Domain',debugMessage:()=>'Embedded wallet load failed. Ensure your domain is verified in https://dashboard.reown.com.'},JWT_TOKEN_NOT_VALID:{code:'APKT006',displayMessage:'Session Expired',debugMessage:'Your session is invalid or expired. Please check your system\u2019s date and time settings, then reconnect.'},INVALID_PROJECT_ID:{code:'APKT007',displayMessage:'Invalid Project ID',debugMessage:'The specified project ID is invalid. Please visit https://dashboard.reown.com to obtain a valid project ID.'},PROJECT_ID_NOT_CONFIGURED:{code:'APKT008',displayMessage:'Project ID Missing',debugMessage:'No project ID is configured. You can create and configure a project ID at https://dashboard.reown.com.'},SERVER_ERROR_APP_CONFIGURATION:{code:'APKT009',displayMessage:'Server Error',debugMessage:s=>`Unable to fetch App Configuration. ${s}. Please check your network connection and try again shortly. Contact support if the issue persists.`},RATE_LIMITED_APP_CONFIGURATION:{code:'APKT010',displayMessage:'Rate Limited',debugMessage:'You have been rate limited while retrieving App Configuration. Please wait a few minutes and try again. Contact support if the issue persists.'}},ALERT_WARNINGS:{LOCAL_CONFIGURATION_IGNORED:{debugMessage:s=>`[Reown Config Notice] ${s}`},INACTIVE_NAMESPACE_NOT_CONNECTED:{code:'APKTW001',displayMessage:'Inactive Namespace Not Connected',debugMessage:(s,o)=>`An error occurred while connecting an inactive namespace ${s}: "${o}"`},INVALID_EMAIL:{code:'APKTW002',displayMessage:'Invalid Email Address',debugMessage:'Please enter a valid email address'}}}},6268,[6192]);
__d(function(g,r,i,a,m,e,d){"use strict";Object.defineProperty(e,'__esModule',{value:!0}),Object.defineProperty(e,"TokenUtil",{enumerable:!0,get:function(){return n}});var t=r(d[0]);const n={TOKEN_ADDRESSES_BY_SYMBOL:{USDC:{8453:t.baseUSDC.asset,84532:t.baseSepoliaUSDC.asset}},getTokenSymbolByAddress(t){if(!t)return;const[s]=Object.entries(n.TOKEN_ADDRESSES_BY_SYMBOL).find(([n,s])=>Object.values(s).includes(t))??[];return s}}},6269,[6247]);
__d(function(g,r,i,a,m,e,d){"use strict";Object.defineProperty(e,'__esModule',{value:!0}),Object.defineProperty(e,"LoggerUtil",{enumerable:!0,get:function(){return t}});var o=r(d[0]);const t={createLogger(t,n="error"){const c=(0,o.getDefaultLoggerOptions)({level:n}),{logger:f}=(0,o.generatePlatformLogger)({opts:c});return f.error=(...o)=>{for(const n of o)if(n instanceof Error)return void t(n,...o);t(void 0,...o)},f}}},6270,[6271]);
__d(function(_g,_r,_i,_a,_m,_e,_d){"use strict";Object.defineProperty(_e,'__esModule',{value:!0}),Object.defineProperty(_e,"MAX_LOG_SIZE_IN_BYTES_DEFAULT",{enumerable:!0,get:function(){return l}}),Object.defineProperty(_e,"PINO_CUSTOM_CONTEXT_KEY",{enumerable:!0,get:function(){return s}}),Object.defineProperty(_e,"PINO_LOGGER_DEFAULTS",{enumerable:!0,get:function(){return o}}),Object.defineProperty(_e,"formatChildLoggerContext",{enumerable:!0,get:function(){return C}}),Object.defineProperty(_e,"generateChildLogger",{enumerable:!0,get:function(){return B}}),Object.defineProperty(_e,"generateClientLogger",{enumerable:!0,get:function(){return S}}),Object.defineProperty(_e,"generatePlatformLogger",{enumerable:!0,get:function(){return P}}),Object.defineProperty(_e,"generateServerLogger",{enumerable:!0,get:function(){return j}}),Object.defineProperty(_e,"getBrowserLoggerContext",{enumerable:!0,get:function(){return m}}),Object.defineProperty(_e,"getDefaultLoggerOptions",{enumerable:!0,get:function(){return w}}),Object.defineProperty(_e,"getLoggerContext",{enumerable:!0,get:function(){return _}}),Object.defineProperty(_e,"pino",{enumerable:!0,get:function(){return r.default}}),Object.defineProperty(_e,"setBrowserLoggerContext",{enumerable:!0,get:function(){return I}});var e,t=_r(_d[0]),r=(e=t)&&e.__esModule?e:{default:e},n=_r(_d[1]);const o={level:"info"},s="custom_context",l=1024e3;class i{constructor(e){this.nodeValue=e,this.sizeInBytes=(new TextEncoder).encode(this.nodeValue).length,this.next=null}get value(){return this.nodeValue}get size(){return this.sizeInBytes}}class g{constructor(e){this.head=null,this.tail=null,this.lengthInNodes=0,this.maxSizeInBytes=e,this.sizeInBytes=0}append(e){const t=new i(e);if(t.size>this.maxSizeInBytes)throw new Error(`[LinkedList] Value too big to insert into list: ${e} with size ${t.size}`);for(;this.size+t.size>this.maxSizeInBytes;)this.shift();this.head?(this.tail&&(this.tail.next=t),this.tail=t):(this.head=t,this.tail=t),this.lengthInNodes++,this.sizeInBytes+=t.size}shift(){if(!this.head)return;const e=this.head;this.head=this.head.next,this.head||(this.tail=null),this.lengthInNodes--,this.sizeInBytes-=e.size}toArray(){const e=[];let t=this.head;for(;null!==t;)e.push(t.value),t=t.next;return e}get length(){return this.lengthInNodes}get size(){return this.sizeInBytes}toOrderedArray(){return Array.from(this)}[Symbol.iterator](){let e=this.head;return{next:()=>{if(!e)return{done:!0,value:null};const t=e.value;return e=e.next,{done:!1,value:t}}}}}class u{constructor(e,r=l){this.level=e??"error",this.levelValue=t.levels.values[this.level],this.MAX_LOG_SIZE_IN_BYTES=r,this.logs=new g(this.MAX_LOG_SIZE_IN_BYTES)}forwardToConsole(e,r){r===t.levels.values.error?console.error(e):r===t.levels.values.warn?console.warn(e):r===t.levels.values.debug?console.debug(e):r===t.levels.values.trace?console.trace(e):console.log(e)}appendToLogs(e){this.logs.append((0,n.safeJsonStringify)({timestamp:(new Date).toISOString(),log:e}));const t="string"==typeof e?JSON.parse(e).level:e.level;t>=this.levelValue&&this.forwardToConsole(e,t)}getLogs(){return this.logs}clearLogs(){this.logs=new g(this.MAX_LOG_SIZE_IN_BYTES)}getLogArray(){return Array.from(this.logs)}logsToBlob(e){const t=this.getLogArray();return t.push((0,n.safeJsonStringify)({extraMetadata:e})),new Blob(t,{type:"application/json"})}}class a{constructor(e,t=l){this.baseChunkLogger=new u(e,t)}write(e){this.baseChunkLogger.appendToLogs(e)}getLogs(){return this.baseChunkLogger.getLogs()}clearLogs(){this.baseChunkLogger.clearLogs()}getLogArray(){return this.baseChunkLogger.getLogArray()}logsToBlob(e){return this.baseChunkLogger.logsToBlob(e)}downloadLogsBlobInBrowser(e){const t=URL.createObjectURL(this.logsToBlob(e)),r=document.createElement("a");r.href=t,r.download=`walletconnect-logs-${(new Date).toISOString()}.txt`,document.body.appendChild(r),r.click(),document.body.removeChild(r),URL.revokeObjectURL(t)}}class c{constructor(e,t=l){this.baseChunkLogger=new u(e,t)}write(e){this.baseChunkLogger.appendToLogs(e)}getLogs(){return this.baseChunkLogger.getLogs()}clearLogs(){this.baseChunkLogger.clearLogs()}getLogArray(){return this.baseChunkLogger.getLogArray()}logsToBlob(e){return this.baseChunkLogger.logsToBlob(e)}}var h=Object.defineProperty,d=Object.defineProperties,f=Object.getOwnPropertyDescriptors,b=Object.getOwnPropertySymbols,p=Object.prototype.hasOwnProperty,L=Object.prototype.propertyIsEnumerable,y=(e,t,r)=>t in e?h(e,t,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[t]=r,v=(e,t)=>{for(var r in t||(t={}))p.call(t,r)&&y(e,r,t[r]);if(b)for(var r of b(t))L.call(t,r)&&y(e,r,t[r]);return e},O=(e,t)=>d(e,f(t));function w(e){return O(v({},e),{level:e?.level||o.level})}function m(e,t=s){return e[t]||""}function I(e,t,r=s){return e[r]=t,e}function _(e,t=s){let r="";return r=typeof e.bindings>"u"?m(e,t):e.bindings().context||"",r}function C(e,t,r=s){const n=_(e,r);return n.trim()?`${n}/${t}`:t}function B(e,t,r=s){const n=C(e,t,r);return I(e.child({context:n}),n,r)}function S(e){var t,n;const o=new a(null==(t=e.opts)?void 0:t.level,e.maxSizeInBytes);return{logger:(0,r.default)(O(v({},e.opts),{level:"trace",browser:O(v({},null==(n=e.opts)?void 0:n.browser),{write:e=>o.write(e)})})),chunkLoggerController:o}}function j(e){var t;const n=new c(null==(t=e.opts)?void 0:t.level,e.maxSizeInBytes);return{logger:(0,r.default)(O(v({},e.opts),{level:"trace"}),n),chunkLoggerController:n}}function P(e){return typeof e.loggerOverride<"u"&&"string"!=typeof e.loggerOverride?{logger:e.loggerOverride,chunkLoggerController:null}:typeof window<"u"?S(e):j(e)}},6271,[6272,2677]);
__d(function(g,r,_i,_a,m,_e,d){'use strict';const e=r(d[0]);m.exports=n;const t=(function(){function e(e){return void 0!==e&&e}try{return'undefined'!=typeof globalThis||Object.defineProperty(Object.prototype,'globalThis',{get:function(){return delete Object.prototype.globalThis,this.globalThis=this},configurable:!0}),globalThis}catch(t){return e(self)||e(window)||e(this)||{}}})().console||{},i={mapHttpRequest:b,mapHttpResponse:b,wrapRequestSerializer:p,wrapResponseSerializer:p,wrapErrorSerializer:p,req:b,res:b,err:function(e){const t={type:e.constructor.name,msg:e.message,stack:e.stack};for(const i in e)void 0===t[i]&&(t[i]=e[i]);return t}};function s(e,t){if(Array.isArray(e)){return e.filter(function(e){return'!stdSerializers.err'!==e})}return!0===e&&Object.keys(t)}function n(e){(e=e||{}).browser=e.browser||{};const i=e.browser.transmit;if(i&&'function'!=typeof i.send)throw Error('pino: transmit option must have a send function');const o=e.browser.write||t;e.browser.write&&(e.browser.asObject=!0);const a=e.serializers||{},f=s(e.browser.serialize,a);let b=e.browser.serialize;Array.isArray(e.browser.serialize)&&e.browser.serialize.indexOf('!stdSerializers.err')>-1&&(b=!1);'function'==typeof o&&(o.error=o.fatal=o.warn=o.info=o.debug=o.trace=o),!1===e.enabled&&(e.level='silent');const p=e.level||'info',z=Object.create(o);z.log||(z.log=w),Object.defineProperty(z,'levelVal',{get:function(){return'silent'===this.level?1/0:this.levels.values[this.level]}}),Object.defineProperty(z,'level',{get:function(){return this._level},set:function(e){if('silent'!==e&&!this.levels.values[e])throw Error('unknown level '+e);this._level=e,l(y,z,'error','log'),l(y,z,'fatal','error'),l(y,z,'warn','error'),l(y,z,'info','log'),l(y,z,'debug','log'),l(y,z,'trace','log')}});const y={transmit:i,serialize:f,asObject:e.browser.asObject,levels:['error','fatal','warn','info','debug','trace'],timestamp:h(e)};return z.levels=n.levels,z.level=p,z.setMaxListeners=z.getMaxListeners=z.emit=z.addListener=z.on=z.prependListener=z.once=z.prependOnceListener=z.removeListener=z.removeAllListeners=z.listeners=z.listenerCount=z.eventNames=z.write=z.flush=w,z.serializers=a,z._serialize=f,z._stdErrSerialize=b,z.child=function(t,s){if(!t)throw new Error('missing bindings for child Pino');s=s||{},f&&t.serializers&&(s.serializers=t.serializers);const n=s.serializers;if(f&&n){var l=Object.assign({},a,n),o=!0===e.browser.serialize?Object.keys(l):f;delete t.serializers,c([t],o,l,this._stdErrSerialize)}function h(e){this._childLevel=1+(0|e._childLevel),this.error=u(e,t,'error'),this.fatal=u(e,t,'fatal'),this.warn=u(e,t,'warn'),this.info=u(e,t,'info'),this.debug=u(e,t,'debug'),this.trace=u(e,t,'trace'),l&&(this.serializers=l,this._serialize=o),i&&(this._logEvent=v([].concat(e._logEvent.bindings,t)))}return h.prototype=this,new h(this)},i&&(z._logEvent=v()),z}function l(e,i,s,n){const l=Object.getPrototypeOf(i);i[s]=i.levelVal>i.levels.values[s]?w:l[s]?l[s]:t[s]||t[n]||w,o(e,i,s)}function o(e,i,s){var l;(e.transmit||i[s]!==w)&&(i[s]=(l=i[s],function(){const o=e.timestamp(),u=new Array(arguments.length),v=Object.getPrototypeOf&&Object.getPrototypeOf(this)===t?t:this;for(var h=0;h<u.length;h++)u[h]=arguments[h];if(e.serialize&&!e.asObject&&c(u,this._serialize,this.serializers,this._stdErrSerialize),e.asObject?l.call(v,a(this,s,u,o)):l.apply(v,u),e.transmit){const t=e.transmit.level||i.level,l=n.levels.values[t],a=n.levels.values[s];if(a<l)return;f(this,{ts:o,methodLevel:s,methodValue:a,transmitLevel:t,transmitValue:n.levels.values[e.transmit.level||i.level],send:e.transmit.send,val:i.levelVal},u)}}))}function a(t,i,s,l){t._serialize&&c(s,t._serialize,t.serializers,t._stdErrSerialize);const o=s.slice();let a=o[0];const u={};l&&(u.time=l),u.level=n.levels.values[i];let f=1+(0|t._childLevel);if(f<1&&(f=1),null!==a&&'object'==typeof a){for(;f--&&'object'==typeof o[0];)Object.assign(u,o.shift());a=o.length?e(o.shift(),o):void 0}else'string'==typeof a&&(a=e(o.shift(),o));return void 0!==a&&(u.msg=a),u}function c(e,t,i,s){for(const l in e)if(s&&e[l]instanceof Error)e[l]=n.stdSerializers.err(e[l]);else if('object'==typeof e[l]&&!Array.isArray(e[l]))for(const s in e[l])t&&t.indexOf(s)>-1&&s in i&&(e[l][s]=i[s](e[l][s]))}function u(e,t,i){return function(){const s=new Array(1+arguments.length);s[0]=t;for(var n=1;n<s.length;n++)s[n]=arguments[n-1];return e[i].apply(this,s)}}function f(e,t,i){const s=t.send,n=t.ts,l=t.methodLevel,o=t.methodValue,a=t.val,u=e._logEvent.bindings;c(i,e._serialize||Object.keys(e.serializers),e.serializers,void 0===e._stdErrSerialize||e._stdErrSerialize),e._logEvent.ts=n,e._logEvent.messages=i.filter(function(e){return-1===u.indexOf(e)}),e._logEvent.level.label=l,e._logEvent.level.value=o,s(l,e._logEvent,a),e._logEvent=v(u)}function v(e){return{ts:0,messages:[],bindings:e||[],level:{label:'',value:0}}}function h(e){return'function'==typeof e.timestamp?e.timestamp:!1===e.timestamp?z:y}function b(){return{}}function p(e){return e}function w(){}function z(){return!1}function y(){return Date.now()}n.levels={values:{fatal:60,error:50,warn:40,info:30,debug:20,trace:10},labels:{10:'trace',20:'debug',30:'info',40:'warn',50:'error',60:'fatal'}},n.stdSerializers=i,n.stdTimeFunctions=Object.assign({},{nullTime:z,epochTime:y,unixTime:function(){return Math.round(Date.now()/1e3)},isoTime:function(){return new Date(Date.now()).toISOString()}})},6272,[2676]);
__d(function(g,r,_i,a,m,_e,d){"use strict";Object.defineProperty(_e,'__esModule',{value:!0}),_e.getBlockchainApiRpcUrl=s,Object.defineProperty(_e,"CaipNetworksUtil",{enumerable:!0,get:function(){return n}});var e=r(d[0]),t=r(d[1]),i=r(d[2]),p=r(d[3]);function s(e,t){const i=new URL('https://rpc.walletconnect.org/v1/');return i.searchParams.set('chainId',e),i.searchParams.set('projectId',t),i.toString()}const c=['near:mainnet','solana:5eykt4UsFv8P8NJdTREpY1vzqKqZKvdp','eip155:1101','eip155:56','eip155:42161','eip155:7777777','eip155:59144','eip155:324','solana:EtWTRABZaYq6iMfeYKouRu166VU2xqa1','eip155:5000','solana:4sgjmw1sunhzsxgspuhpqldx6wiyjntz','eip155:80084','eip155:5003','eip155:100','eip155:8453','eip155:42220','eip155:1313161555','eip155:17000','eip155:1','eip155:300','eip155:1313161554','eip155:1329','eip155:84532','eip155:421614','eip155:11155111','eip155:8217','eip155:43114','solana:4uhcVJyU9pJkvQyS88uRDiswHXSCkY3z','eip155:999999999','eip155:11155420','eip155:80002','eip155:97','eip155:43113','eip155:137','eip155:10','eip155:1301','eip155:80094','eip155:80069','eip155:560048','eip155:31','eip155:2818','eip155:57054','eip155:911867','eip155:534351','eip155:1112','eip155:534352','eip155:1111','eip155:146','eip155:130','eip155:1284','eip155:30','eip155:2810','bip122:000000000019d6689c085ae165831e93','bip122:000000000933ea01ad0ee984209779ba'],n={extendRpcUrlWithProjectId(e,t){let i=!1;try{i="rpc.walletconnect.org"===new URL(e).host}catch(e){i=!1}if(i){const i=new URL(e);return i.searchParams.has('projectId')||i.searchParams.set('projectId',t),i.toString()}return e},isCaipNetwork:e=>'chainNamespace'in e&&'caipNetworkId'in e,getChainNamespace(e){return this.isCaipNetwork(e)?e.chainNamespace:t.ConstantsUtil.CHAIN.EVM},getCaipNetworkId(e){return this.isCaipNetwork(e)?e.caipNetworkId:`${t.ConstantsUtil.CHAIN.EVM}:${e.id}`},getDefaultRpcUrl(e,t,i){const p=e.rpcUrls?.default?.http?.[0];return c.includes(t)?s(t,i):p||''},extendCaipNetwork(e,{customNetworkImageUrls:t,projectId:i,customRpcUrls:s}){const c=this.getChainNamespace(e),n=this.getCaipNetworkId(e),o=e.rpcUrls?.default?.http?.[0],l=this.getDefaultRpcUrl(e,n,i),u=e?.rpcUrls?.chainDefault?.http?.[0]||o,h=s?.[n]?.map(e=>e.url)||[],N=[...h,...l?[l]:[]],w=[...h];return u&&!w.includes(u)&&w.push(u),Object.assign({},e,{chainNamespace:c,caipNetworkId:n,assets:{imageId:p.PresetsUtil.NetworkImageIds[e.id],imageUrl:t?.[e.id]},rpcUrls:Object.assign({},e.rpcUrls,{default:{http:N},chainDefault:{http:w}})})},extendCaipNetworks:(e,{customNetworkImageUrls:t,projectId:i,customRpcUrls:p})=>e.map(e=>n.extendCaipNetwork(e,{customNetworkImageUrls:t,customRpcUrls:p,projectId:i})),getViemTransport(t,i,p){const n=[];return p?.forEach(t=>{n.push((0,e.http)(t.url,t.config))}),c.includes(t.caipNetworkId)&&n.push((0,e.http)(s(t.caipNetworkId,i),{fetchOptions:{headers:{'Content-Type':'text/plain'}}})),t?.rpcUrls?.default?.http?.forEach(t=>{n.push((0,e.http)(t))}),(0,e.fallback)(n)},extendWagmiTransports(t,i,p){if(c.includes(t.caipNetworkId)){const s=this.getDefaultRpcUrl(t,t.caipNetworkId,i);return(0,e.fallback)([p,(0,e.http)(s)])}return p},getUnsupportedNetwork:e=>({id:e.split(':')[1],caipNetworkId:e,name:t.ConstantsUtil.UNSUPPORTED_NETWORK_NAME,chainNamespace:e.split(':')[0],nativeCurrency:{name:'',decimals:0,symbol:''},rpcUrls:{default:{http:[]}}}),getCaipNetworkFromStorage(e){const t=i.StorageUtil.getActiveCaipNetworkId(),p=i.ChainController.getAllRequestedCaipNetworks(),s=Array.from(i.ChainController.state.chains?.keys()||[]),c=t?.split(':')[0],n=!!c&&s.includes(c),o=p?.find(e=>e.caipNetworkId===t);return n&&!o&&t?this.getUnsupportedNetwork(t):o||(e||p?.[0])}}},6273,[1450,6192,6247,6265]);
__d(function(g,r,i,a,m,e,d){"use strict";var o;Object.defineProperty(e,'__esModule',{value:!0}),Object.defineProperty(e,"SocialProviderEnum",{enumerable:!0,get:function(){return o}}),(function(o){o.Google="google",o.Github="github",o.Apple="apple",o.Facebook="facebook",o.X="x",o.Discord="discord",o.Farcaster="farcaster"})(o||(o={}))},6274,[]);
__d(function(g,r,i,a,m,e,d){"use strict";Object.defineProperty(e,'__esModule',{value:!0}),Object.defineProperty(e,"WalletUtil",{enumerable:!0,get:function(){return s}});var t=r(d[0]),n=r(d[1]),o=r(d[2]),l=r(d[3]);const s={filterOutDuplicatesByRDNS(n){const o=t.OptionsController.state.enableEIP6963?t.ConnectorController.state.connectors:[],l=t.StorageUtil.getRecentWallets(),s=o.map(t=>t.info?.rdns).filter(Boolean),c=l.map(t=>t.rdns).filter(Boolean),u=s.concat(c);if(u.includes('io.metamask.mobile')&&t.CoreHelperUtil.isMobile()){const t=u.indexOf('io.metamask.mobile');u[t]='io.metamask'}return n.filter(t=>{if(t?.rdns&&u.includes(String(t.rdns)))return!1;if(!t?.rdns){if(o.some(n=>n.name===t.name))return!1}return!0})},filterOutDuplicatesByIds(n){const o=t.ConnectorController.state.connectors.filter(t=>'ANNOUNCED'===t.type||'INJECTED'===t.type),l=t.StorageUtil.getRecentWallets(),s=o.map(t=>t.explorerId),c=l.map(t=>t.id),u=s.concat(c);return n.filter(t=>!u.includes(t?.id))},filterOutDuplicateWallets(t){const n=this.filterOutDuplicatesByRDNS(t);return this.filterOutDuplicatesByIds(n)},markWalletsAsInstalled(n){const{connectors:o}=t.ConnectorController.state,{featuredWalletIds:l}=t.OptionsController.state,s=o.filter(t=>'ANNOUNCED'===t.type).reduce((t,n)=>n.info?.rdns?(t[n.info.rdns]=!0,t):t,{});return n.map(t=>Object.assign({},t,{installed:Boolean(t.rdns)&&Boolean(s[t.rdns??''])})).sort((t,n)=>{const o=Number(n.installed)-Number(t.installed);if(0!==o)return o;if(l?.length){const o=l.indexOf(t.id),s=l.indexOf(n.id);if(-1!==o&&-1!==s)return o-s;if(-1!==o)return-1;if(-1!==s)return 1}return 0})},getConnectOrderMethod(n,s){const c=n?.connectMethodsOrder||t.OptionsController.state.features?.connectMethodsOrder,u=s||t.ConnectorController.state.connectors;if(c)return c;const{injected:f,announced:C}=o.ConnectorUtil.getConnectorsByType(u,t.ApiController.state.recommended,t.ApiController.state.featured),p=f.filter(o.ConnectorUtil.showConnector),O=C.filter(o.ConnectorUtil.showConnector);return p.length||O.length?['wallet','email','social']:l.ConstantsUtil.DEFAULT_CONNECT_METHOD_ORDER},isExcluded(o){const l=Boolean(o.rdns)&&t.ApiController.state.excludedWallets.some(t=>t.rdns===o.rdns),s=Boolean(o.name)&&t.ApiController.state.excludedWallets.some(t=>n.HelpersUtil.isLowerCaseMatch(t.name,o.name));return l||s},markWalletsWithDisplayIndex:t=>t.map((t,n)=>Object.assign({},t,{display_index:n}))}},6275,[6247,6263,6262,6276]);
__d(function(g,r,i,a,m,e,d){"use strict";Object.defineProperty(e,'__esModule',{value:!0}),Object.defineProperty(e,"ConstantsUtil",{enumerable:!0,get:function(){return t}});const t={ACCOUNT_TABS:[{label:'Tokens'},{label:'Activity'}],SECURE_SITE_ORIGIN:('undefined'!=typeof process&&void 0!==process.env?process.env.NEXT_PUBLIC_SECURE_SITE_ORIGIN:void 0)||'https://secure.walletconnect.org',VIEW_DIRECTION:{Next:'next',Prev:'prev'},DEFAULT_CONNECT_METHOD_ORDER:['email','social','wallet'],ANIMATION_DURATIONS:{HeaderText:120,ModalHeight:150,ViewTransition:150},VIEWS_WITH_LEGAL_FOOTER:['Connect','ConnectWallets','OnRampTokenSelect','OnRampFiatSelect','OnRampProviders'],VIEWS_WITH_DEFAULT_FOOTER:['Networks']}},6276,[]);
__d(function(g,r,i,a,m,e,d){"use strict";Object.defineProperty(e,'__esModule',{value:!0}),Object.defineProperty(e,"MathUtil",{enumerable:!0,get:function(){return t.MathUtil}}),Object.defineProperty(e,"initializeTheming",{enumerable:!0,get:function(){return n.initializeTheming}}),Object.defineProperty(e,"setColorTheme",{enumerable:!0,get:function(){return n.setColorTheme}}),Object.defineProperty(e,"setThemeVariables",{enumerable:!0,get:function(){return n.setThemeVariables}}),Object.defineProperty(e,"UiHelperUtil",{enumerable:!0,get:function(){return u.UiHelperUtil}}),Object.defineProperty(e,"TransactionUtil",{enumerable:!0,get:function(){return o.TransactionUtil}}),Object.defineProperty(e,"customElement",{enumerable:!0,get:function(){return c.customElement}}),Object.defineProperty(e,"borderRadius",{enumerable:!0,get:function(){return l.borderRadius}}),Object.defineProperty(e,"colors",{enumerable:!0,get:function(){return l.colors}}),Object.defineProperty(e,"spacing",{enumerable:!0,get:function(){return l.spacing}}),Object.defineProperty(e,"css",{enumerable:!0,get:function(){return b.css}}),Object.defineProperty(e,"vars",{enumerable:!0,get:function(){return b.vars}});var t=r(d[0]),n=r(d[1]),u=r(d[2]),o=r(d[3]),c=r(d[4]),l=r(d[5]),b=r(d[6])},6277,[6278,6279,6282,6283,6284,6281,6280]);
__d(function(g,r,i,a,m,e,d){"use strict";Object.defineProperty(e,'__esModule',{value:!0}),Object.defineProperty(e,"MathUtil",{enumerable:!0,get:function(){return t}});const t={interpolate(t,n,o){if(2!==t.length||2!==n.length)throw new Error('inputRange and outputRange must be an array of length 2');const u=t[0]||0,l=t[1]||0,c=n[0]||0,f=n[1]||0;return o<u?c:o>l?f:(f-c)/(l-u)*(o-u)+c}}},6278,[]);
__d(function(g,r,i,a,m,e,d){"use strict";Object.defineProperty(e,'__esModule',{value:!0}),e.initializeTheming=function(t,o="dark"){if(c=t,s=document.createElement('style'),f=document.createElement('style'),l=document.createElement('style'),s.textContent=w(t).core.cssText,f.textContent=w(t).dark.cssText,l.textContent=w(t).light.cssText,document.head.appendChild(s),document.head.appendChild(f),document.head.appendChild(l),k(t,o),u(o),!t?.['--w3m-font-family'])for(const[t,o]of Object.entries(p)){const n=document.createElement('link');n.rel='preload',n.href=o,n.as='font',n.type=t.includes('woff2')?'font/woff2':'font/woff',n.crossOrigin='anonymous',document.head.appendChild(n)}u(o)},e.setColorTheme=u,e.setThemeVariables=function(t){if(c=t,s&&f&&l&&(s.textContent=w(t).core.cssText,f.textContent=w(t).dark.cssText,l.textContent=w(t).light.cssText,t?.['--w3m-font-family'])){const o=t['--w3m-font-family'];s.textContent=s.textContent?.replace('font-family: KHTeka',`font-family: ${o}`),f.textContent=f.textContent?.replace('font-family: KHTeka',`font-family: ${o}`),l.textContent=l.textContent?.replace('font-family: KHTeka',`font-family: ${o}`)}if(n){k(t,'enabled'===l?.media?'light':'dark')}},e.createRootStyles=w,Object.defineProperty(e,"resetStyles",{enumerable:!0,get:function(){return h}}),Object.defineProperty(e,"elementStyles",{enumerable:!0,get:function(){return y}});var t=r(d[0]),o=r(d[1]);let n,s,f,l,c;const p={'KHTeka-500-woff2':'https://fonts.reown.com/KHTeka-Medium.woff2','KHTeka-400-woff2':'https://fonts.reown.com/KHTeka-Regular.woff2','KHTeka-300-woff2':'https://fonts.reown.com/KHTeka-Light.woff2','KHTekaMono-400-woff2':'https://fonts.reown.com/KHTekaMono-Regular.woff2','KHTeka-500-woff':'https://fonts.reown.com/KHTeka-Light.woff','KHTeka-400-woff':'https://fonts.reown.com/KHTeka-Regular.woff','KHTeka-300-woff':'https://fonts.reown.com/KHTeka-Light.woff','KHTekaMono-400-woff':'https://fonts.reown.com/KHTekaMono-Regular.woff'};function k(t,s="dark"){n&&document.head.removeChild(n),n=document.createElement('style'),n.textContent=o.ThemeHelperUtil.createRootStyles(s,t),document.head.appendChild(n)}function u(t="dark"){f&&l&&n&&('light'===t?(k(c,t),f.removeAttribute('media'),l.media='enabled'):(k(c,t),l.removeAttribute('media'),f.media='enabled'))}function w(o){const n=Boolean(o?.['--w3m-font-family']);return{core:t.css`
      ${n?t.css``:t.css`
            @font-face {
              font-family: 'KHTeka';
              src:
                url(${(0,t.unsafeCSS)(p['KHTeka-400-woff2'])}) format('woff2'),
                url(${(0,t.unsafeCSS)(p['KHTeka-400-woff'])}) format('woff');
              font-weight: 400;
              font-style: normal;
              font-display: swap;
            }

            @font-face {
              font-family: 'KHTeka';
              src:
                url(${(0,t.unsafeCSS)(p['KHTeka-300-woff2'])}) format('woff2'),
                url(${(0,t.unsafeCSS)(p['KHTeka-300-woff'])}) format('woff');
              font-weight: 300;
              font-style: normal;
            }

            @font-face {
              font-family: 'KHTekaMono';
              src:
                url(${(0,t.unsafeCSS)(p['KHTekaMono-400-woff2'])}) format('woff2'),
                url(${(0,t.unsafeCSS)(p['KHTekaMono-400-woff'])}) format('woff');
              font-weight: 400;
              font-style: normal;
            }

            @font-face {
              font-family: 'KHTeka';
              src:
                url(${(0,t.unsafeCSS)(p['KHTeka-400-woff2'])}) format('woff2'),
                url(${(0,t.unsafeCSS)(p['KHTeka-400-woff'])}) format('woff');
              font-weight: 400;
              font-style: normal;
            }
          `}

      @keyframes w3m-shake {
        0% {
          transform: scale(1) rotate(0deg);
        }
        20% {
          transform: scale(1) rotate(-1deg);
        }
        40% {
          transform: scale(1) rotate(1.5deg);
        }
        60% {
          transform: scale(1) rotate(-1.5deg);
        }
        80% {
          transform: scale(1) rotate(1deg);
        }
        100% {
          transform: scale(1) rotate(0deg);
        }
      }
      @keyframes w3m-iframe-fade-out {
        0% {
          opacity: 1;
        }
        100% {
          opacity: 0;
        }
      }
      @keyframes w3m-iframe-zoom-in {
        0% {
          transform: translateY(50px);
          opacity: 0;
        }
        100% {
          transform: translateY(0px);
          opacity: 1;
        }
      }
      @keyframes w3m-iframe-zoom-in-mobile {
        0% {
          transform: scale(0.95);
          opacity: 0;
        }
        100% {
          transform: scale(1);
          opacity: 1;
        }
      }
      :root {
        --apkt-modal-width: 370px;

        --apkt-visual-size-inherit: inherit;
        --apkt-visual-size-sm: 40px;
        --apkt-visual-size-md: 55px;
        --apkt-visual-size-lg: 80px;

        --apkt-path-network-sm: path(
          'M15.4 2.1a5.21 5.21 0 0 1 5.2 0l11.61 6.7a5.21 5.21 0 0 1 2.61 4.52v13.4c0 1.87-1 3.59-2.6 4.52l-11.61 6.7c-1.62.93-3.6.93-5.22 0l-11.6-6.7a5.21 5.21 0 0 1-2.61-4.51v-13.4c0-1.87 1-3.6 2.6-4.52L15.4 2.1Z'
        );

        --apkt-path-network-md: path(
          'M43.4605 10.7248L28.0485 1.61089C25.5438 0.129705 22.4562 0.129705 19.9515 1.61088L4.53951 10.7248C2.03626 12.2051 0.5 14.9365 0.5 17.886V36.1139C0.5 39.0635 2.03626 41.7949 4.53951 43.2752L19.9515 52.3891C22.4562 53.8703 25.5438 53.8703 28.0485 52.3891L43.4605 43.2752C45.9637 41.7949 47.5 39.0635 47.5 36.114V17.8861C47.5 14.9365 45.9637 12.2051 43.4605 10.7248Z'
        );

        --apkt-path-network-lg: path(
          'M78.3244 18.926L50.1808 2.45078C45.7376 -0.150261 40.2624 -0.150262 35.8192 2.45078L7.6756 18.926C3.23322 21.5266 0.5 26.3301 0.5 31.5248V64.4752C0.5 69.6699 3.23322 74.4734 7.6756 77.074L35.8192 93.5492C40.2624 96.1503 45.7376 96.1503 50.1808 93.5492L78.3244 77.074C82.7668 74.4734 85.5 69.6699 85.5 64.4752V31.5248C85.5 26.3301 82.7668 21.5266 78.3244 18.926Z'
        );

        --apkt-width-network-sm: 36px;
        --apkt-width-network-md: 48px;
        --apkt-width-network-lg: 86px;

        --apkt-duration-dynamic: 0ms;
        --apkt-height-network-sm: 40px;
        --apkt-height-network-md: 54px;
        --apkt-height-network-lg: 96px;
      }
    `,dark:t.css`
      :root {
      }
    `,light:t.css`
      :root {
      }
    `}}const h=t.css`
  div,
  span,
  iframe,
  a,
  img,
  form,
  button,
  label,
  *::after,
  *::before {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-style: normal;
    text-rendering: optimizeSpeed;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    -webkit-tap-highlight-color: transparent;
    backface-visibility: hidden;
  }

  :host {
    font-family: var(--apkt-fontFamily-regular);
  }
`,y=t.css`
  button,
  a {
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;

    will-change: background-color, color, border, box-shadow, width, height, transform, opacity;
    outline: none;
    border: none;
    text-decoration: none;
    transition:
      background-color var(--apkt-durations-lg) var(--apkt-easings-ease-out-power-2),
      color var(--apkt-durations-lg) var(--apkt-easings-ease-out-power-2),
      border var(--apkt-durations-lg) var(--apkt-easings-ease-out-power-2),
      box-shadow var(--apkt-durations-lg) var(--apkt-easings-ease-out-power-2),
      width var(--apkt-durations-lg) var(--apkt-easings-ease-out-power-2),
      height var(--apkt-durations-lg) var(--apkt-easings-ease-out-power-2),
      transform var(--apkt-durations-lg) var(--apkt-easings-ease-out-power-2),
      opacity var(--apkt-durations-lg) var(--apkt-easings-ease-out-power-2),
      scale var(--apkt-durations-lg) var(--apkt-easings-ease-out-power-2),
      border-radius var(--apkt-durations-lg) var(--apkt-easings-ease-out-power-2);
    will-change:
      background-color, color, border, box-shadow, width, height, transform, opacity, scale,
      border-radius;
  }

  a:active:not([disabled]),
  button:active:not([disabled]) {
    scale: 0.975;
    transform-origin: center;
  }

  button:disabled {
    cursor: default;
  }

  input {
    border: none;
    outline: none;
    appearance: none;
  }
`},6279,[5531,6280]);
__d(function(g,r,i,a,m,e,d){"use strict";Object.defineProperty(e,'__esModule',{value:!0}),Object.defineProperty(e,"ThemeHelperUtil",{enumerable:!0,get:function(){return o}}),Object.defineProperty(e,"css",{enumerable:!0,get:function(){return u}}),Object.defineProperty(e,"vars",{enumerable:!0,get:function(){return c}});var t=r(d[0]),n=r(d[1]);const s='--apkt',o={createCSSVariables(t){const n={},o={};return(function t(n,o,c=""){for(const[u,l]of Object.entries(n)){const n=c?`${c}-${u}`:u;l&&'object'==typeof l&&Object.keys(l).length?(o[u]={},t(l,o[u],n)):'string'==typeof l&&(o[u]=`${s}-${n}`)}})(t,n),(function t(n,s){for(const[o,c]of Object.entries(n))c&&'object'==typeof c?(s[o]={},t(c,s[o])):'string'==typeof c&&(s[o]=`var(${c})`)})(n,o),{cssVariables:n,cssVariablesVarPrefix:o}},assignCSSVariables(t,n){const o={};return(function t(n,c,u){for(const[l,b]of Object.entries(n)){const n=u?`${u}-${l}`:l,k=c[l];b&&'object'==typeof b?t(b,k,n):'string'==typeof k&&(o[`${s}-${n}`]=k)}})(t,n),o},createRootStyles(t,s){const c=Object.assign({},n.styles,{tokens:Object.assign({},n.styles.tokens,{theme:'light'===t?n.tokens.light:n.tokens.dark})}),{cssVariables:u}=o.createCSSVariables(c),l=o.assignCSSVariables(u,c),b=o.generateW3MVariables(s),k=o.generateW3MOverrides(s),p=o.generateScaledVariables(s),x=o.generateBaseVariables(l),f=Object.assign({},l,x,b,k,p),h=o.applyColorMixToVariables(s,f),y=Object.assign({},f,h);return`:root {${Object.entries(y).map(([t,n])=>`${t}:${n.replace('/[:;{}</>]/g','')};`).join('')}}`},generateW3MVariables(t){if(!t)return{};const n={};return n['--w3m-font-family']=t['--w3m-font-family']||'KHTeka',n['--w3m-accent']=t['--w3m-accent']||'#0988F0',n['--w3m-color-mix']=t['--w3m-color-mix']||'#000',n['--w3m-color-mix-strength']=`${t['--w3m-color-mix-strength']||0}%`,n['--w3m-font-size-master']=t['--w3m-font-size-master']||'10px',n['--w3m-border-radius-master']=t['--w3m-border-radius-master']||'4px',n},generateW3MOverrides(t){if(!t)return{};const n={};if(t['--w3m-accent']){const s=t['--w3m-accent'];n['--apkt-tokens-core-iconAccentPrimary']=s,n['--apkt-tokens-core-borderAccentPrimary']=s,n['--apkt-tokens-core-textAccentPrimary']=s,n['--apkt-tokens-core-backgroundAccentPrimary']=s}return t['--w3m-font-family']&&(n['--apkt-fontFamily-regular']=t['--w3m-font-family']),t['--w3m-z-index']&&(n['--apkt-tokens-core-zIndex']=`${t['--w3m-z-index']}`),n},generateScaledVariables(t){if(!t)return{};const n={};if(t['--w3m-font-size-master']){const s=parseFloat(t['--w3m-font-size-master'].replace('px',''));n['--apkt-textSize-h1']=5*Number(s)+"px",n['--apkt-textSize-h2']=4.4*Number(s)+"px",n['--apkt-textSize-h3']=3.8*Number(s)+"px",n['--apkt-textSize-h4']=3.2*Number(s)+"px",n['--apkt-textSize-h5']=2.6*Number(s)+"px",n['--apkt-textSize-h6']=2*Number(s)+"px",n['--apkt-textSize-large']=1.6*Number(s)+"px",n['--apkt-textSize-medium']=1.4*Number(s)+"px",n['--apkt-textSize-small']=1.2*Number(s)+"px"}if(t['--w3m-border-radius-master']){const s=parseFloat(t['--w3m-border-radius-master'].replace('px',''));n['--apkt-borderRadius-1']=`${Number(s)}px`,n['--apkt-borderRadius-2']=2*Number(s)+"px",n['--apkt-borderRadius-3']=3*Number(s)+"px",n['--apkt-borderRadius-4']=4*Number(s)+"px",n['--apkt-borderRadius-5']=5*Number(s)+"px",n['--apkt-borderRadius-6']=6*Number(s)+"px",n['--apkt-borderRadius-8']=8*Number(s)+"px",n['--apkt-borderRadius-16']=16*Number(s)+"px",n['--apkt-borderRadius-20']=20*Number(s)+"px",n['--apkt-borderRadius-32']=32*Number(s)+"px",n['--apkt-borderRadius-64']=64*Number(s)+"px",n['--apkt-borderRadius-128']=128*Number(s)+"px"}return n},generateColorMixCSS(t,n){if(!t?.['--w3m-color-mix']||!t['--w3m-color-mix-strength'])return'';const s=t['--w3m-color-mix'],o=t['--w3m-color-mix-strength'];if(!o||0===o)return'';const c=Object.keys(n||{}).filter(t=>{const n=t.includes('-tokens-core-background')||t.includes('-tokens-core-text')||t.includes('-tokens-core-border')||t.includes('-tokens-core-foreground')||t.includes('-tokens-core-icon')||t.includes('-tokens-theme-background')||t.includes('-tokens-theme-text')||t.includes('-tokens-theme-border')||t.includes('-tokens-theme-foreground')||t.includes('-tokens-theme-icon'),s=t.includes('-borderRadius-')||t.includes('-spacing-')||t.includes('-textSize-')||t.includes('-fontFamily-')||t.includes('-fontWeight-')||t.includes('-typography-')||t.includes('-duration-')||t.includes('-ease-')||t.includes('-path-')||t.includes('-width-')||t.includes('-height-')||t.includes('-visual-size-')||t.includes('-modal-width')||t.includes('-cover');return n&&!s});if(0===c.length)return'';return` @supports (background: color-mix(in srgb, white 50%, black)) {\n      :root {\n        ${c.map(t=>{const c=n?.[t]||'';return c.includes('color-mix')||c.startsWith('#')||c.startsWith('rgb')?`${t}: color-mix(in srgb, ${s} ${o}%, ${c});`:`${t}: color-mix(in srgb, ${s} ${o}%, var(${t}-base, ${c}));`}).join('')}\n      }\n    }`},generateBaseVariables(t){const n={},s=t['--apkt-tokens-theme-backgroundPrimary'];s&&(n['--apkt-tokens-theme-backgroundPrimary-base']=s);const o=t['--apkt-tokens-core-backgroundAccentPrimary'];return o&&(n['--apkt-tokens-core-backgroundAccentPrimary-base']=o),n},applyColorMixToVariables(t,n){const s={};if(n?.['--apkt-tokens-theme-backgroundPrimary']&&(s['--apkt-tokens-theme-backgroundPrimary']='var(--apkt-tokens-theme-backgroundPrimary-base)'),n?.['--apkt-tokens-core-backgroundAccentPrimary']&&(s['--apkt-tokens-core-backgroundAccentPrimary']='var(--apkt-tokens-core-backgroundAccentPrimary-base)'),!t?.['--w3m-color-mix']||!t['--w3m-color-mix-strength'])return s;const o=t['--w3m-color-mix'],c=t['--w3m-color-mix-strength'];if(!c||0===c)return s;const u=Object.keys(n||{}).filter(t=>{const n=t.includes('-tokens-core-background')||t.includes('-tokens-core-text')||t.includes('-tokens-core-border')||t.includes('-tokens-core-foreground')||t.includes('-tokens-core-icon')||t.includes('-tokens-theme-background')||t.includes('-tokens-theme-text')||t.includes('-tokens-theme-border')||t.includes('-tokens-theme-foreground')||t.includes('-tokens-theme-icon')||t.includes('-tokens-theme-overlay'),s=t.includes('-borderRadius-')||t.includes('-spacing-')||t.includes('-textSize-')||t.includes('-fontFamily-')||t.includes('-fontWeight-')||t.includes('-typography-')||t.includes('-duration-')||t.includes('-ease-')||t.includes('-path-')||t.includes('-width-')||t.includes('-height-')||t.includes('-visual-size-')||t.includes('-modal-width')||t.includes('-cover');return n&&!s});return 0===u.length||u.forEach(t=>{const u=n?.[t]||'';t.endsWith('-base')||('--apkt-tokens-theme-backgroundPrimary'===t||'--apkt-tokens-core-backgroundAccentPrimary'===t?s[t]=`color-mix(in srgb, ${o} ${c}%, var(${t}-base))`:u.includes('color-mix')||u.startsWith('#')||u.startsWith('rgb')?s[t]=`color-mix(in srgb, ${o} ${c}%, ${u})`:s[t]=`color-mix(in srgb, ${o} ${c}%, var(${t}-base, ${u}))`)}),s}},{cssVariablesVarPrefix:c}=o.createCSSVariables(n.styles);function u(n,...s){return(0,t.css)(n,...s.map(n=>'function'==typeof n?(0,t.unsafeCSS)(n(c)):(0,t.unsafeCSS)(n)))}},6280,[5531,6281]);
__d(function(g,r,i,a,m,e,d){"use strict";Object.defineProperty(e,'__esModule',{value:!0}),Object.defineProperty(e,"colors",{enumerable:!0,get:function(){return n}}),Object.defineProperty(e,"tokens",{enumerable:!0,get:function(){return t}}),Object.defineProperty(e,"borderRadius",{enumerable:!0,get:function(){return c}}),Object.defineProperty(e,"spacing",{enumerable:!0,get:function(){return o}}),Object.defineProperty(e,"styles",{enumerable:!0,get:function(){return p}});const n={black:'#202020',white:'#FFFFFF',white010:'rgba(255, 255, 255, 0.1)',accent010:'rgba(9, 136, 240, 0.1)',accent020:'rgba(9, 136, 240, 0.2)',accent030:'rgba(9, 136, 240, 0.3)',accent040:'rgba(9, 136, 240, 0.4)',accent050:'rgba(9, 136, 240, 0.5)',accent060:'rgba(9, 136, 240, 0.6)',accent070:'rgba(9, 136, 240, 0.7)',accent080:'rgba(9, 136, 240, 0.8)',accent090:'rgba(9, 136, 240, 0.9)',accent100:'rgba(9, 136, 240, 1.0)',accentSecondary010:'rgba(199, 185, 148, 0.1)',accentSecondary020:'rgba(199, 185, 148, 0.2)',accentSecondary030:'rgba(199, 185, 148, 0.3)',accentSecondary040:'rgba(199, 185, 148, 0.4)',accentSecondary050:'rgba(199, 185, 148, 0.5)',accentSecondary060:'rgba(199, 185, 148, 0.6)',accentSecondary070:'rgba(199, 185, 148, 0.7)',accentSecondary080:'rgba(199, 185, 148, 0.8)',accentSecondary090:'rgba(199, 185, 148, 0.9)',accentSecondary100:'rgba(199, 185, 148, 1.0)',productWalletKit:'#FFB800',productAppKit:'#FF573B',productCloud:'#0988F0',productDocumentation:'#008847',neutrals050:'#F6F6F6',neutrals100:'#F3F3F3',neutrals200:'#E9E9E9',neutrals300:'#D0D0D0',neutrals400:'#BBB',neutrals500:'#9A9A9A',neutrals600:'#6C6C6C',neutrals700:'#4F4F4F',neutrals800:'#363636',neutrals900:'#2A2A2A',neutrals1000:'#252525',semanticSuccess010:'rgba(48, 164, 107, 0.1)',semanticSuccess020:'rgba(48, 164, 107, 0.2)',semanticSuccess030:'rgba(48, 164, 107, 0.3)',semanticSuccess040:'rgba(48, 164, 107, 0.4)',semanticSuccess050:'rgba(48, 164, 107, 0.5)',semanticSuccess060:'rgba(48, 164, 107, 0.6)',semanticSuccess070:'rgba(48, 164, 107, 0.7)',semanticSuccess080:'rgba(48, 164, 107, 0.8)',semanticSuccess090:'rgba(48, 164, 107, 0.9)',semanticSuccess100:'rgba(48, 164, 107, 1.0)',semanticError010:'rgba(223, 74, 52, 0.1)',semanticError020:'rgba(223, 74, 52, 0.2)',semanticError030:'rgba(223, 74, 52, 0.3)',semanticError040:'rgba(223, 74, 52, 0.4)',semanticError050:'rgba(223, 74, 52, 0.5)',semanticError060:'rgba(223, 74, 52, 0.6)',semanticError070:'rgba(223, 74, 52, 0.7)',semanticError080:'rgba(223, 74, 52, 0.8)',semanticError090:'rgba(223, 74, 52, 0.9)',semanticError100:'rgba(223, 74, 52, 1.0)',semanticWarning010:'rgba(243, 161, 63, 0.1)',semanticWarning020:'rgba(243, 161, 63, 0.2)',semanticWarning030:'rgba(243, 161, 63, 0.3)',semanticWarning040:'rgba(243, 161, 63, 0.4)',semanticWarning050:'rgba(243, 161, 63, 0.5)',semanticWarning060:'rgba(243, 161, 63, 0.6)',semanticWarning070:'rgba(243, 161, 63, 0.7)',semanticWarning080:'rgba(243, 161, 63, 0.8)',semanticWarning090:'rgba(243, 161, 63, 0.9)',semanticWarning100:'rgba(243, 161, 63, 1.0)'},t={core:{backgroundAccentPrimary:'#0988F0',backgroundAccentCertified:'#C7B994',backgroundWalletKit:'#FFB800',backgroundAppKit:'#FF573B',backgroundCloud:'#0988F0',backgroundDocumentation:'#008847',backgroundSuccess:'rgba(48, 164, 107, 0.20)',backgroundError:'rgba(223, 74, 52, 0.20)',backgroundWarning:'rgba(243, 161, 63, 0.20)',textAccentPrimary:'#0988F0',textAccentCertified:'#C7B994',textWalletKit:'#FFB800',textAppKit:'#FF573B',textCloud:'#0988F0',textDocumentation:'#008847',textSuccess:'#30A46B',textError:'#DF4A34',textWarning:'#F3A13F',borderAccentPrimary:'#0988F0',borderSecondary:'#C7B994',borderSuccess:'#30A46B',borderError:'#DF4A34',borderWarning:'#F3A13F',foregroundAccent010:'rgba(9, 136, 240, 0.1)',foregroundAccent020:'rgba(9, 136, 240, 0.2)',foregroundAccent040:'rgba(9, 136, 240, 0.4)',foregroundAccent060:'rgba(9, 136, 240, 0.6)',foregroundSecondary020:'rgba(199, 185, 148, 0.2)',foregroundSecondary040:'rgba(199, 185, 148, 0.4)',foregroundSecondary060:'rgba(199, 185, 148, 0.6)',iconAccentPrimary:'#0988F0',iconAccentCertified:'#C7B994',iconSuccess:'#30A46B',iconError:'#DF4A34',iconWarning:'#F3A13F',glass010:'rgba(255, 255, 255, 0.1)',zIndex:'9999'},dark:{overlay:'rgba(0, 0, 0, 0.50)',backgroundPrimary:'#202020',backgroundInvert:'#FFFFFF',textPrimary:'#FFFFFF',textSecondary:'#9A9A9A',textTertiary:'#BBBBBB',textInvert:'#202020',borderPrimary:'#2A2A2A',borderPrimaryDark:'#363636',borderSecondary:'#4F4F4F',foregroundPrimary:'#252525',foregroundSecondary:'#2A2A2A',foregroundTertiary:'#363636',iconDefault:'#9A9A9A',iconInverse:'#FFFFFF'},light:{overlay:'rgba(230 , 230, 230, 0.5)',backgroundPrimary:'#FFFFFF',borderPrimaryDark:'#E9E9E9',backgroundInvert:'#202020',textPrimary:'#202020',textSecondary:'#9A9A9A',textTertiary:'#6C6C6C',textInvert:'#FFFFFF',borderPrimary:'#E9E9E9',borderSecondary:'#D0D0D0',foregroundPrimary:'#F3F3F3',foregroundSecondary:'#E9E9E9',foregroundTertiary:'#D0D0D0',iconDefault:'#9A9A9A',iconInverse:'#202020'}},c={1:'4px',2:'8px',10:'10px',3:'12px',4:'16px',6:'24px',5:'20px',8:'32px',16:'64px',20:'80px',32:'128px',64:'256px',128:'512px',round:'9999px'},o={0:'0px','01':'2px',1:'4px',2:'8px',3:'12px',4:'16px',5:'20px',6:'24px',7:'28px',8:'32px',9:'36px',10:'40px',12:'48px',14:'56px',16:'64px',20:'80px',32:'128px',64:'256px'},p={colors:n,fontFamily:{regular:'KHTeka',mono:'KHTekaMono'},fontWeight:{regular:'400',medium:'500'},textSize:{h1:'50px',h2:'44px',h3:'38px',h4:'32px',h5:'26px',h6:'20px',large:'16px',medium:'14px',small:'12px'},typography:{'h1-regular-mono':{lineHeight:'50px',letterSpacing:'-3px'},'h1-regular':{lineHeight:'50px',letterSpacing:'-1px'},'h1-medium':{lineHeight:'50px',letterSpacing:'-0.84px'},'h2-regular-mono':{lineHeight:'44px',letterSpacing:'-2.64px'},'h2-regular':{lineHeight:'44px',letterSpacing:'-0.88px'},'h2-medium':{lineHeight:'44px',letterSpacing:'-0.88px'},'h3-regular-mono':{lineHeight:'38px',letterSpacing:'-2.28px'},'h3-regular':{lineHeight:'38px',letterSpacing:'-0.76px'},'h3-medium':{lineHeight:'38px',letterSpacing:'-0.76px'},'h4-regular-mono':{lineHeight:'32px',letterSpacing:'-1.92px'},'h4-regular':{lineHeight:'32px',letterSpacing:'-0.32px'},'h4-medium':{lineHeight:'32px',letterSpacing:'-0.32px'},'h5-regular-mono':{lineHeight:'26px',letterSpacing:'-1.56px'},'h5-regular':{lineHeight:'26px',letterSpacing:'-0.26px'},'h5-medium':{lineHeight:'26px',letterSpacing:'-0.26px'},'h6-regular-mono':{lineHeight:'20px',letterSpacing:'-1.2px'},'h6-regular':{lineHeight:'20px',letterSpacing:'-0.6px'},'h6-medium':{lineHeight:'20px',letterSpacing:'-0.6px'},'lg-regular-mono':{lineHeight:'16px',letterSpacing:'-0.96px'},'lg-regular':{lineHeight:'18px',letterSpacing:'-0.16px'},'lg-medium':{lineHeight:'18px',letterSpacing:'-0.16px'},'md-regular-mono':{lineHeight:'14px',letterSpacing:'-0.84px'},'md-regular':{lineHeight:'16px',letterSpacing:'-0.14px'},'md-medium':{lineHeight:'16px',letterSpacing:'-0.14px'},'sm-regular-mono':{lineHeight:'12px',letterSpacing:'-0.72px'},'sm-regular':{lineHeight:'14px',letterSpacing:'-0.12px'},'sm-medium':{lineHeight:'14px',letterSpacing:'-0.12px'}},tokens:{core:t.core,theme:t.dark},borderRadius:c,spacing:o,durations:{xl:'400ms',lg:'200ms',md:'125ms',sm:'75ms'},easings:{'ease-out-power-2':'cubic-bezier(0.23, 0.09, 0.08, 1.13)','ease-out-power-1':'cubic-bezier(0.12, 0.04, 0.2, 1.06)','ease-in-power-2':'cubic-bezier(0.92, -0.13, 0.77, 0.91)','ease-in-power-1':'cubic-bezier(0.88, -0.06, 0.8, 0.96)','ease-inout-power-2':'cubic-bezier(0.77, 0.09, 0.23, 1.13)','ease-inout-power-1':'cubic-bezier(0.88, 0.04, 0.12, 1.06)'}}},6281,[]);
__d(function(_g,_r,_i,a,m,e,d){"use strict";Object.defineProperty(e,'__esModule',{value:!0}),Object.defineProperty(e,"UiHelperUtil",{enumerable:!0,get:function(){return r}});const t='.',r={getSpacingStyles:(t,r)=>Array.isArray(t)?t[r]?`var(--apkt-spacing-${t[r]})`:void 0:'string'==typeof t?`var(--apkt-spacing-${t})`:void 0,getFormattedDate:t=>new Intl.DateTimeFormat('en-US',{month:'short',day:'numeric'}).format(t),formatCurrency(t=0,r={}){const n=Number(t);if(isNaN(n))return'$0.00';return new Intl.NumberFormat('en-US',Object.assign({style:'currency',currency:'USD',minimumFractionDigits:2,maximumFractionDigits:2},r)).format(n)},getHostName(t){try{return new URL(t).hostname}catch(t){return''}},getTruncateString:({string:t,charsStart:r,charsEnd:n,truncate:o})=>t.length<=r+n?t:'end'===o?`${t.substring(0,r)}...`:'start'===o?`...${t.substring(t.length-n)}`:`${t.substring(0,Math.floor(r))}...${t.substring(t.length-Math.floor(n))}`,generateAvatarColors(t){const r=t.toLowerCase().replace(/^0x/iu,'').replace(/[^a-f0-9]/gu,'').substring(0,6).padEnd(6,'0'),n=this.hexToRgb(r),o=getComputedStyle(document.documentElement).getPropertyValue('--w3m-border-radius-master'),i=100-3*Number(o?.replace('px','')),s=`${i}% ${i}% at 65% 40%`,c=[];for(let t=0;t<5;t+=1){const r=this.tintColor(n,.15*t);c.push(`rgb(${r[0]}, ${r[1]}, ${r[2]})`)}return`\n    --local-color-1: ${c[0]};\n    --local-color-2: ${c[1]};\n    --local-color-3: ${c[2]};\n    --local-color-4: ${c[3]};\n    --local-color-5: ${c[4]};\n    --local-radial-circle: ${s}\n   `},hexToRgb(t){const r=parseInt(t,16);return[r>>16&255,r>>8&255,255&r]},tintColor(t,r){const[n,o,i]=t;return[Math.round(n+(255-n)*r),Math.round(o+(255-o)*r),Math.round(i+(255-i)*r)]},isNumber:t=>/^[0-9]+$/u.test(t),getColorTheme:t=>t||('undefined'!=typeof window&&window.matchMedia&&'function'==typeof window.matchMedia?window.matchMedia('(prefers-color-scheme: dark)')?.matches?'dark':'light':'dark'),splitBalance(t){const r=t.split('.');return 2===r.length?[r[0],r[1]]:['0','00']},roundNumber:(t,r,n)=>t.toString().length>=r?Number(t).toFixed(n):t,cssDurationToNumber:t=>t.endsWith('s')?1e3*Number(t.replace('s','')):t.endsWith('ms')?Number(t.replace('ms','')):0,maskInput({value:r,decimals:n,integers:o}){if((r=r.replace(',','.'))===t)return`0${t}`;const[i="",s]=r.split(t).map(t=>t.replace(/[^0-9]/gu,'')),c=o?i.substring(0,o):i,u=2===c.length?String(Number(c)):c,l='number'==typeof n?s?.substring(0,n):s;return('string'==typeof l&&('number'!=typeof n||n>0)?[u,l].join(t):u)??''},capitalize:t=>t?t.charAt(0).toUpperCase()+t.slice(1):''}},6282,[]);
__d(function(g,r,i,_a,m,e,d){"use strict";Object.defineProperty(e,'__esModule',{value:!0}),Object.defineProperty(e,"TransactionUtil",{enumerable:!0,get:function(){return s}});var t=r(d[0]),n=r(d[1]);const a=.1,u=['receive','deposit','borrow','claim'],o=['withdraw','repay','burn'],s={getTransactionGroupTitle(n,a){const u=t.DateUtil.getYear(),o=t.DateUtil.getMonthNameByIndex(a);return n===u?o:`${o} ${n}`},getTransactionImages(t){const[n]=t;return t?.length>1?t.map(t=>this.getTransactionImage(t)):[this.getTransactionImage(n)]},getTransactionImage:t=>({type:s.getTransactionTransferTokenType(t),url:s.getTransactionImageURL(t)}),getTransactionImageURL(t){let n;const a=Boolean(t?.nft_info),u=Boolean(t?.fungible_info);return t&&a?n=t?.nft_info?.content?.preview?.url:t&&u&&(n=t?.fungible_info?.icon?.url),n},getTransactionTransferTokenType:t=>t?.fungible_info?'FUNGIBLE':t?.nft_info?'NFT':void 0,getTransactionDescriptions(t,a){const s=t?.metadata?.operationType,c=a||t?.transfers,l=c?.length>0,f=c?.length>1,h=l&&c?.every(t=>Boolean(t?.fungible_info)),[p,T]=c;let b=this.getTransferDescription(p),y=this.getTransferDescription(T);if(!l){return('send'===s||'receive'===s)&&h?(b=n.UiHelperUtil.getTruncateString({string:t?.metadata.sentFrom,charsStart:4,charsEnd:6,truncate:'middle'}),y=n.UiHelperUtil.getTruncateString({string:t?.metadata.sentTo,charsStart:4,charsEnd:6,truncate:'middle'}),[b,y]):[t.metadata.status]}if(f)return c.map(t=>this.getTransferDescription(t));let _='';return u.includes(s)?_='+':o.includes(s)&&(_='-'),b=_.concat(b),[b]},getTransferDescription(t){let n='';return t?(t?.nft_info?n=t?.nft_info?.name||'-':t?.fungible_info&&(n=this.getFungibleTransferDescription(t)||'-'),n):n},getFungibleTransferDescription(t){if(!t)return null;return[this.getQuantityFixedValue(t?.quantity.numeric),t?.fungible_info?.symbol].join(' ').trim()},mergeTransfers(t){if(t?.length<=1)return t;const n=this.filterGasFeeTransfers(t).reduce((t,n)=>{const a=n?.fungible_info?.name,u=t.find(({fungible_info:t,direction:u})=>a&&a===t?.name&&u===n.direction);if(u){const t=Number(u.quantity.numeric)+Number(n.quantity.numeric);u.quantity.numeric=t.toString(),u.value=(u.value||0)+(n.value||0)}else t.push(n);return t},[]);let a=n;return n.length>2&&(a=n.sort((t,n)=>(n.value||0)-(t.value||0)).slice(0,2)),a=a.sort((t,n)=>'out'===t.direction&&'in'===n.direction?-1:'in'===t.direction&&'out'===n.direction?1:0),a},filterGasFeeTransfers(t){const n=t.reduce((t,n)=>{const a=n?.fungible_info?.name;return a&&(t[a]||(t[a]=[]),t[a].push(n)),t},{}),u=[];return Object.values(n).forEach(t=>{if(1===t.length){const n=t[0];n&&u.push(n)}else{const n=t.filter(t=>'in'===t.direction),o=t.filter(t=>'out'===t.direction);if(1===n.length&&1===o.length){const s=n[0],c=o[0];let l=!1;if(s&&c){const t=Number(s.quantity.numeric),n=Number(c.quantity.numeric);n<t*a?(u.push(s),l=!0):t<n*a&&(u.push(c),l=!0)}l||u.push(...t)}else{const n=this.filterGasFeesFromTokenGroup(t);u.push(...n)}}}),t.forEach(t=>{t?.fungible_info?.name||u.push(t)}),u},filterGasFeesFromTokenGroup(t){if(t.length<=1)return t;const n=t.map(t=>Number(t.quantity.numeric)),u=Math.max(...n),o=Math.min(...n);if(o<.01*u){return t.filter(t=>Number(t.quantity.numeric)>=.01*u)}const s=t.filter(t=>'in'===t.direction),c=t.filter(t=>'out'===t.direction);if(1===s.length&&1===c.length){const t=s[0],n=c[0];if(t&&n){const u=Number(t.quantity.numeric),o=Number(n.quantity.numeric);if(o<u*a)return[t];if(u<o*a)return[n]}}return t},getQuantityFixedValue(t){if(!t)return null;return parseFloat(t).toFixed(3)}}},6283,[6192,6282]);
__d(function(g,r,i,a,m,e,d){"use strict";function n(n,t){const{kind:u,elements:s}=t;return{kind:u,elements:s,finisher(t){customElements.get(n)||customElements.define(n,t)}}}function t(n,t){return customElements.get(n)||customElements.define(n,t),t}Object.defineProperty(e,'__esModule',{value:!0}),e.customElement=function(u){return function(s){return'function'==typeof s?t(u,s):n(u,s)}}},6284,[]);
__d(function(g,r,i,a,m,e,d){"use strict";Object.defineProperty(e,'__esModule',{value:!0});var t=r(d[0]);Object.keys(t).forEach(function(n){'default'===n||Object.prototype.hasOwnProperty.call(e,n)||Object.defineProperty(e,n,{enumerable:!0,get:function(){return t[n]}})})},6285,[6286]);
__d(function(g,_r,_i,a,m,_e,_d){"use strict";Object.defineProperty(_e,'__esModule',{value:!0}),Object.defineProperty(_e,"WuiFlex",{enumerable:!0,get:function(){return d}});var t,e=_r(_d[0]),i=_r(_d[1]),p=_r(_d[2]),r=_r(_d[3]),n=_r(_d[4]),o=_r(_d[5]),s=(t=o)&&t.__esModule?t:{default:t},l=this&&this.__decorate||function(t,e,i,p){var r,n=arguments.length,o=n<3?e:null===p?p=Object.getOwnPropertyDescriptor(e,i):p;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(t,e,i,p);else for(var s=t.length-1;s>=0;s--)(r=t[s])&&(o=(n<3?r(o):n>3?r(e,i,o):r(e,i))||o);return n>3&&o&&Object.defineProperty(e,i,o),o};let d=class extends e.LitElement{render(){return this.style.cssText=`\n      flex-direction: ${this.flexDirection};\n      flex-wrap: ${this.flexWrap};\n      flex-basis: ${this.flexBasis};\n      flex-grow: ${this.flexGrow};\n      flex-shrink: ${this.flexShrink};\n      align-items: ${this.alignItems};\n      justify-content: ${this.justifyContent};\n      column-gap: ${this.columnGap&&`var(--apkt-spacing-${this.columnGap})`};\n      row-gap: ${this.rowGap&&`var(--apkt-spacing-${this.rowGap})`};\n      gap: ${this.gap&&`var(--apkt-spacing-${this.gap})`};\n      padding-top: ${this.padding&&r.UiHelperUtil.getSpacingStyles(this.padding,0)};\n      padding-right: ${this.padding&&r.UiHelperUtil.getSpacingStyles(this.padding,1)};\n      padding-bottom: ${this.padding&&r.UiHelperUtil.getSpacingStyles(this.padding,2)};\n      padding-left: ${this.padding&&r.UiHelperUtil.getSpacingStyles(this.padding,3)};\n      margin-top: ${this.margin&&r.UiHelperUtil.getSpacingStyles(this.margin,0)};\n      margin-right: ${this.margin&&r.UiHelperUtil.getSpacingStyles(this.margin,1)};\n      margin-bottom: ${this.margin&&r.UiHelperUtil.getSpacingStyles(this.margin,2)};\n      margin-left: ${this.margin&&r.UiHelperUtil.getSpacingStyles(this.margin,3)};\n      width: ${this.width};\n    `,e.html`<slot></slot>`}};d.styles=[p.resetStyles,s.default],l([(0,i.property)()],d.prototype,"flexDirection",void 0),l([(0,i.property)()],d.prototype,"flexWrap",void 0),l([(0,i.property)()],d.prototype,"flexBasis",void 0),l([(0,i.property)()],d.prototype,"flexGrow",void 0),l([(0,i.property)()],d.prototype,"flexShrink",void 0),l([(0,i.property)()],d.prototype,"alignItems",void 0),l([(0,i.property)()],d.prototype,"justifyContent",void 0),l([(0,i.property)()],d.prototype,"columnGap",void 0),l([(0,i.property)()],d.prototype,"rowGap",void 0),l([(0,i.property)()],d.prototype,"gap",void 0),l([(0,i.property)()],d.prototype,"padding",void 0),l([(0,i.property)()],d.prototype,"margin",void 0),l([(0,i.property)()],d.prototype,"width",void 0),d=l([(0,n.customElement)('wui-flex')],d)},6286,[5531,5557,6279,6282,6284,6287]);
__d(function(g,r,i,a,m,e,d){"use strict";Object.defineProperty(e,'__esModule',{value:!0}),Object.defineProperty(e,"default",{enumerable:!0,get:function(){return t}});var t=r(d[0]).css`
  :host {
    display: flex;
    width: inherit;
    height: inherit;
    box-sizing: border-box;
  }
`},6287,[5531]);
__d(function(g,r,i,a,m,e,d){"use strict";Object.defineProperty(e,'__esModule',{value:!0});var t=r(d[0]);Object.keys(t).forEach(function(n){'default'===n||Object.prototype.hasOwnProperty.call(e,n)||Object.defineProperty(e,n,{enumerable:!0,get:function(){return t[n]}})})},6288,[6289]);
__d(function(g,_r,_i,a,m,_e,_d){"use strict";Object.defineProperty(_e,'__esModule',{value:!0}),Object.defineProperty(_e,"WuiListWallet",{enumerable:!0,get:function(){return h}});var t=_r(_d[0]),e=_r(_d[1]),l=_r(_d[2]);_r(_d[3]),_r(_d[4]),_r(_d[5]);var i=_r(_d[6]),r=_r(_d[7]);_r(_d[8]),_r(_d[9]),_r(_d[10]);var o,s=_r(_d[11]),n=(o=s)&&o.__esModule?o:{default:o},p=this&&this.__decorate||function(t,e,l,i){var r,o=arguments.length,s=o<3?e:null===i?i=Object.getOwnPropertyDescriptor(e,l):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)s=Reflect.decorate(t,e,l,i);else for(var n=t.length-1;n>=0;n--)(r=t[n])&&(s=(o<3?r(s):o>3?r(e,l,s):r(e,l))||s);return o>3&&s&&Object.defineProperty(e,l,s),s};let h=class extends t.LitElement{constructor(){super(...arguments),this.walletImages=[],this.imageSrc='',this.name='',this.size='md',this.tabIdx=void 0,this.disabled=!1,this.showAllWallets=!1,this.loading=!1,this.loadingSpinnerColor='accent-100'}render(){return this.dataset.size=this.size,t.html`
      <button
        ?disabled=${this.disabled}
        data-all-wallets=${this.showAllWallets}
        tabindex=${(0,l.ifDefined)(this.tabIdx)}
      >
        ${this.templateAllWallets()} ${this.templateWalletImage()}
        <wui-text variant="lg-regular" color="inherit">${this.name}</wui-text>
        ${this.templateStatus()}
      </button>
    `}templateAllWallets(){return this.showAllWallets&&this.imageSrc?t.html` <wui-all-wallets-image .imageeSrc=${this.imageSrc}> </wui-all-wallets-image> `:this.showAllWallets&&this.walletIcon?t.html` <wui-wallet-image .walletIcon=${this.walletIcon} size="sm"> </wui-wallet-image> `:null}templateWalletImage(){return!this.showAllWallets&&this.imageSrc?t.html`<wui-wallet-image
        size=${(0,l.ifDefined)('sm'===this.size?'sm':'md')}
        imageSrc=${this.imageSrc}
        name=${this.name}
      ></wui-wallet-image>`:this.showAllWallets||this.imageSrc?null:t.html`<wui-wallet-image size="sm" name=${this.name}></wui-wallet-image>`}templateStatus(){return this.loading?t.html`<wui-loading-spinner size="lg" color="accent-primary"></wui-loading-spinner>`:this.tagLabel&&this.tagVariant?t.html`<wui-tag size="sm" variant=${this.tagVariant}>${this.tagLabel}</wui-tag>`:null}};h.styles=[i.resetStyles,i.elementStyles,n.default],p([(0,e.property)({type:Array})],h.prototype,"walletImages",void 0),p([(0,e.property)()],h.prototype,"imageSrc",void 0),p([(0,e.property)()],h.prototype,"name",void 0),p([(0,e.property)()],h.prototype,"size",void 0),p([(0,e.property)()],h.prototype,"tagLabel",void 0),p([(0,e.property)()],h.prototype,"tagVariant",void 0),p([(0,e.property)()],h.prototype,"walletIcon",void 0),p([(0,e.property)()],h.prototype,"tabIdx",void 0),p([(0,e.property)({type:Boolean})],h.prototype,"disabled",void 0),p([(0,e.property)({type:Boolean})],h.prototype,"showAllWallets",void 0),p([(0,e.property)({type:Boolean})],h.prototype,"loading",void 0),p([(0,e.property)({type:String})],h.prototype,"loadingSpinnerColor",void 0),h=p([(0,r.customElement)('wui-list-wallet')],h)},6289,[5531,5557,5568,6290,6313,6315,6279,6284,6317,6323,6318,6325]);
__d(function(g,_r,_i,a,m,_e,_d){"use strict";Object.defineProperty(_e,'__esModule',{value:!0}),Object.defineProperty(_e,"ICON_COLOR",{enumerable:!0,get:function(){return W}}),Object.defineProperty(_e,"WuiIcon",{enumerable:!0,get:function(){return D}});var e,t=_r(_d[0]),r=_r(_d[1]),o=_r(_d[2]),h=_r(_d[3]),p=_r(_d[4]),s=_r(_d[5]),c=_r(_d[6]),i=_r(_d[7]),n=_r(_d[8]),l=_r(_d[9]),w=_r(_d[10]),d=_r(_d[11]),u=_r(_d[12]),v=_r(_d[13]),f=_r(_d[14]),k=_r(_d[15]),S=_r(_d[16]),b=_r(_d[17]),y=_r(_d[18]),x=_r(_d[19]),C=_r(_d[20]),z=_r(_d[21]),q=_r(_d[22]),B=_r(_d[23]),O=_r(_d[24]),P=_r(_d[25]),_=_r(_d[26]),I=_r(_d[27]),L=(e=I)&&e.__esModule?e:{default:e},R=this&&this.__decorate||function(e,t,r,o){var h,p=arguments.length,s=p<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,r):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)s=Reflect.decorate(e,t,r,o);else for(var c=e.length-1;c>=0;c--)(h=e[c])&&(s=(p<3?h(s):p>3?h(t,r,s):h(t,r))||s);return p>3&&s&&Object.defineProperty(t,r,s),s};const $={add:'ph-plus',allWallets:'ph-dots-three',arrowBottom:'ph-arrow-down',arrowBottomCircle:'ph-arrow-circle-down',arrowClockWise:'ph-arrow-clockwise',arrowLeft:'ph-arrow-left',arrowRight:'ph-arrow-right',arrowTop:'ph-arrow-up',arrowTopRight:'ph-arrow-up-right',bank:'ph-bank',bin:'ph-trash',browser:'ph-browser',card:'ph-credit-card',checkmark:'ph-check',checkmarkBold:'ph-check',chevronBottom:'ph-caret-down',chevronLeft:'ph-caret-left',chevronRight:'ph-caret-right',chevronTop:'ph-caret-up',clock:'ph-clock',close:'ph-x',coinPlaceholder:'ph-circle-half',compass:'ph-compass',copy:'ph-copy',desktop:'ph-desktop',dollar:'ph-currency-dollar',download:'ph-vault',exclamationCircle:'ph-warning-circle',extension:'ph-puzzle-piece',externalLink:'ph-arrow-square-out',filters:'ph-funnel-simple',helpCircle:'ph-question',id:'ph-identification-card',image:'ph-image',info:'ph-info',lightbulb:'ph-lightbulb',mail:'ph-envelope',mobile:'ph-device-mobile',more:'ph-dots-three',networkPlaceholder:'ph-globe',nftPlaceholder:'ph-image',plus:'ph-plus',power:'ph-power',qrCode:'ph-qr-code',questionMark:'ph-question',refresh:'ph-arrow-clockwise',recycleHorizontal:'ph-arrows-clockwise',search:'ph-magnifying-glass',sealCheck:'ph-seal-check',send:'ph-paper-plane-right',signOut:'ph-sign-out',spinner:'ph-spinner',swapHorizontal:'ph-arrows-left-right',swapVertical:'ph-arrows-down-up',threeDots:'ph-dots-three',user:'ph-user',verify:'ph-seal-check',verifyFilled:'ph-seal-check',warning:'ph-warning',warningCircle:'ph-warning-circle',appStore:'',apple:'',bitcoin:'',chromeStore:'',cursor:'',discord:'',ethereum:'',etherscan:'',facebook:'',farcaster:'',github:'',google:'',playStore:'',reown:'',solana:'',telegram:'',twitch:'',twitterIcon:'',twitter:'',walletConnect:'',walletConnectBrown:'',walletConnectLightBrown:'',x:'',wallet:''},j={'ph-arrow-circle-down':()=>_r(_d[29])(_d[28],_d.paths),'ph-arrow-clockwise':()=>_r(_d[29])(_d[30],_d.paths),'ph-arrow-down':()=>_r(_d[29])(_d[31],_d.paths),'ph-arrow-left':()=>_r(_d[29])(_d[32],_d.paths),'ph-arrow-right':()=>_r(_d[29])(_d[33],_d.paths),'ph-arrow-square-out':()=>_r(_d[29])(_d[34],_d.paths),'ph-arrows-down-up':()=>_r(_d[29])(_d[35],_d.paths),'ph-arrows-left-right':()=>_r(_d[29])(_d[36],_d.paths),'ph-arrow-up':()=>_r(_d[29])(_d[37],_d.paths),'ph-arrow-up-right':()=>_r(_d[29])(_d[38],_d.paths),'ph-arrows-clockwise':()=>_r(_d[29])(_d[39],_d.paths),'ph-bank':()=>_r(_d[29])(_d[40],_d.paths),'ph-browser':()=>_r(_d[29])(_d[41],_d.paths),'ph-caret-down':()=>_r(_d[29])(_d[42],_d.paths),'ph-caret-left':()=>_r(_d[29])(_d[43],_d.paths),'ph-caret-right':()=>_r(_d[29])(_d[44],_d.paths),'ph-caret-up':()=>_r(_d[29])(_d[45],_d.paths),'ph-check':()=>_r(_d[29])(_d[46],_d.paths),'ph-circle-half':()=>_r(_d[29])(_d[47],_d.paths),'ph-clock':()=>_r(_d[29])(_d[48],_d.paths),'ph-compass':()=>_r(_d[29])(_d[49],_d.paths),'ph-copy':()=>_r(_d[29])(_d[50],_d.paths),'ph-credit-card':()=>_r(_d[29])(_d[51],_d.paths),'ph-currency-dollar':()=>_r(_d[29])(_d[52],_d.paths),'ph-desktop':()=>_r(_d[29])(_d[53],_d.paths),'ph-device-mobile':()=>_r(_d[29])(_d[54],_d.paths),'ph-dots-three':()=>_r(_d[29])(_d[55],_d.paths),'ph-vault':()=>_r(_d[29])(_d[56],_d.paths),'ph-envelope':()=>_r(_d[29])(_d[57],_d.paths),'ph-funnel-simple':()=>_r(_d[29])(_d[58],_d.paths),'ph-globe':()=>_r(_d[29])(_d[59],_d.paths),'ph-identification-card':()=>_r(_d[29])(_d[60],_d.paths),'ph-image':()=>_r(_d[29])(_d[61],_d.paths),'ph-info':()=>_r(_d[29])(_d[62],_d.paths),'ph-lightbulb':()=>_r(_d[29])(_d[63],_d.paths),'ph-magnifying-glass':()=>_r(_d[29])(_d[64],_d.paths),'ph-paper-plane-right':()=>_r(_d[29])(_d[65],_d.paths),'ph-plus':()=>_r(_d[29])(_d[66],_d.paths),'ph-power':()=>_r(_d[29])(_d[67],_d.paths),'ph-puzzle-piece':()=>_r(_d[29])(_d[68],_d.paths),'ph-qr-code':()=>_r(_d[29])(_d[69],_d.paths),'ph-question':()=>_r(_d[29])(_d[70],_d.paths),'ph-question-circle':()=>_r(_d[29])(_d[71],_d.paths),'ph-seal-check':()=>_r(_d[29])(_d[72],_d.paths),'ph-sign-out':()=>_r(_d[29])(_d[73],_d.paths),'ph-spinner':()=>_r(_d[29])(_d[74],_d.paths),'ph-trash':()=>_r(_d[29])(_d[75],_d.paths),'ph-user':()=>_r(_d[29])(_d[76],_d.paths),'ph-warning':()=>_r(_d[29])(_d[77],_d.paths),'ph-warning-circle':()=>_r(_d[29])(_d[78],_d.paths),'ph-x':()=>_r(_d[29])(_d[79],_d.paths)},T={appStore:h.appStoreSvg,apple:p.appleSvg,bitcoin:s.bitcoinSvg,chromeStore:c.chromeStoreSvg,cursor:i.cursorSvg,discord:n.discordSvg,ethereum:l.ethereumSvg,etherscan:w.etherscanSvg,facebook:d.facebookSvg,farcaster:u.farcasterSvg,github:v.githubSvg,google:f.googleSvg,playStore:k.playStoreSvg,reown:S.reownSvg,solana:b.solanaSvg,telegram:y.telegramSvg,twitch:x.twitchSvg,twitter:B.xSvg,twitterIcon:C.twitterIconSvg,walletConnect:q.walletConnectSvg,walletConnectInvert:q.walletConnectInvertSvg,walletConnectBrown:q.walletConnectBrownSvg,walletConnectLightBrown:q.walletConnectLightBrownSvg,x:B.xSvg,wallet:z.walletSvg},W={'accent-primary':O.vars.tokens.core.iconAccentPrimary,'accent-certified':O.vars.tokens.core.iconAccentCertified,default:O.vars.tokens.theme.iconDefault,success:O.vars.tokens.core.iconSuccess,error:O.vars.tokens.core.iconError,warning:O.vars.tokens.core.iconWarning,inverse:O.vars.tokens.theme.iconInverse};let D=class extends t.LitElement{constructor(){super(...arguments),this.size='md',this.name='copy',this.weight='bold',this.color='inherit'}render(){this.style.cssText=`\n      --local-width: ${'inherit'===this.size?'inherit':`var(--apkt-spacing-${{xxs:'2',xs:'3',sm:'3',md:'4',mdl:'5',lg:'5',xl:'6',xxl:'7',inherit:'inherit'}[this.size]})`};\n      --local-color: ${'inherit'===this.color?'inherit':W[this.color]}\n    `;const e=$[this.name];if(e&&''!==e){const t=j[e];t&&t();const r=(0,o.unsafeStatic)(e),h={xxs:'0.5em',xs:'0.75em',sm:'0.75em',md:'1em',mdl:'1.25em',lg:'1.25em',xl:'1.5em',xxl:'1.75em'};return o.html`<${r} size=${h[this.size]} weight="${this.weight}"></${r}>`}return T[this.name]||o.html``}};D.styles=[P.resetStyles,L.default],R([(0,r.property)()],D.prototype,"size",void 0),R([(0,r.property)()],D.prototype,"name",void 0),R([(0,r.property)()],D.prototype,"weight",void 0),R([(0,r.property)()],D.prototype,"color",void 0),D=R([(0,_.customElement)('wui-icon')],D)},6290,{"0":5531,"1":5557,"2":5573,"3":6291,"4":6292,"5":6293,"6":6294,"7":6295,"8":6296,"9":6297,"10":6298,"11":6299,"12":6300,"13":6301,"14":6302,"15":6303,"16":6304,"17":6305,"18":6306,"19":6307,"20":6308,"21":6309,"22":6310,"23":6311,"24":6280,"25":6279,"26":6284,"27":6312,"28":5916,"29":1549,"30":5917,"31":5918,"32":5919,"33":5920,"34":5921,"35":5922,"36":5923,"37":5924,"38":5925,"39":5926,"40":5927,"41":5928,"42":5929,"43":5930,"44":5931,"45":5932,"46":5933,"47":5934,"48":5935,"49":5936,"50":5937,"51":5938,"52":5939,"53":5940,"54":5941,"55":5942,"56":5943,"57":5944,"58":5945,"59":5946,"60":5947,"61":5948,"62":5949,"63":5950,"64":5951,"65":5952,"66":5953,"67":5954,"68":5955,"69":5956,"70":5957,"71":5958,"72":5959,"73":5960,"74":5961,"75":5962,"76":5963,"77":5965,"78":5966,"79":5967,"paths":{"5916":"/b10-blockchain-blockthentic/_expo/static/js/web/PhArrowCircleDown-27c5dc46eb47873b55080403aa18dcf0.js","5917":"/b10-blockchain-blockthentic/_expo/static/js/web/PhArrowClockwise-f0b7c0a3face04ad5028526b595630bc.js","5918":"/b10-blockchain-blockthentic/_expo/static/js/web/PhArrowDown-890c430c4f6631ab6a4bd03f989aa53f.js","5919":"/b10-blockchain-blockthentic/_expo/static/js/web/PhArrowLeft-5fadb05bb08124d36db673834fab4ee0.js","5920":"/b10-blockchain-blockthentic/_expo/static/js/web/PhArrowRight-c7c1b6f49cd09b51213e4b9bbfbf3111.js","5921":"/b10-blockchain-blockthentic/_expo/static/js/web/PhArrowSquareOut-19202b3c1b6f1b3755dfe09acd540d31.js","5922":"/b10-blockchain-blockthentic/_expo/static/js/web/PhArrowsDownUp-2dde23709ea0fb0edbe1394ddc7c8086.js","5923":"/b10-blockchain-blockthentic/_expo/static/js/web/PhArrowsLeftRight-156cf388860710e61d781aafa680d2a1.js","5924":"/b10-blockchain-blockthentic/_expo/static/js/web/PhArrowUp-cb7a4fea933cd026c7a6f6081f28215b.js","5925":"/b10-blockchain-blockthentic/_expo/static/js/web/PhArrowUpRight-95cbf125aa7f560439685f2138ef2e7c.js","5926":"/b10-blockchain-blockthentic/_expo/static/js/web/PhArrowsClockwise-9fbbd97f121d5067b77d8ad3de601822.js","5927":"/b10-blockchain-blockthentic/_expo/static/js/web/PhBank-adf0b03d4a9089cf3ca373273a64b36f.js","5928":"/b10-blockchain-blockthentic/_expo/static/js/web/PhBrowser-b820cf322065f202c1f59e3dc59c5af3.js","5929":"/b10-blockchain-blockthentic/_expo/static/js/web/PhCaretDown-54c30ceaddbd7d0a09ce188a78a0d7c4.js","5930":"/b10-blockchain-blockthentic/_expo/static/js/web/PhCaretLeft-3e2670747bd83b0490b7b81693661f7c.js","5931":"/b10-blockchain-blockthentic/_expo/static/js/web/PhCaretRight-902cec3f5c5d28e5d4331e84730af42f.js","5932":"/b10-blockchain-blockthentic/_expo/static/js/web/PhCaretUp-57418e60fadd0c8d012d7c6b6742b25e.js","5933":"/b10-blockchain-blockthentic/_expo/static/js/web/PhCheck-c466e35c58614dcb6cecc57dfe40a32f.js","5934":"/b10-blockchain-blockthentic/_expo/static/js/web/PhCircleHalf-c61cdb34118e0b84a9946741241e9cc2.js","5935":"/b10-blockchain-blockthentic/_expo/static/js/web/PhClock-6ae87a8032ed50d9509052f2aebc5b23.js","5936":"/b10-blockchain-blockthentic/_expo/static/js/web/PhCompass-01058d1baff771a21adff94a0508b856.js","5937":"/b10-blockchain-blockthentic/_expo/static/js/web/PhCopy-58f5d841dce6b384a9a9f2c20e2a8749.js","5938":"/b10-blockchain-blockthentic/_expo/static/js/web/PhCreditCard-d1122f59628f68c191cac88a40e7e395.js","5939":"/b10-blockchain-blockthentic/_expo/static/js/web/PhCurrencyDollar-79fd852884958cd3010d665c262c3727.js","5940":"/b10-blockchain-blockthentic/_expo/static/js/web/PhDesktop-08b4d578881d1d6f3115dadb7378e8f4.js","5941":"/b10-blockchain-blockthentic/_expo/static/js/web/PhDeviceMobile-38f6307c314d50700cbd93aac1321b2f.js","5942":"/b10-blockchain-blockthentic/_expo/static/js/web/PhDotsThree-2529adbf6e4d758f000f0436f05f8522.js","5943":"/b10-blockchain-blockthentic/_expo/static/js/web/PhVault-5ad871e18ab2405f0699980f1dfc47f2.js","5944":"/b10-blockchain-blockthentic/_expo/static/js/web/PhEnvelope-cd2abe5b76469157d3fe1cc9488a8350.js","5945":"/b10-blockchain-blockthentic/_expo/static/js/web/PhFunnelSimple-cdb331e51a0726f706819cf610bdbea5.js","5946":"/b10-blockchain-blockthentic/_expo/static/js/web/PhGlobe-13ef2b78b54a00994fd787d94cc0b7e7.js","5947":"/b10-blockchain-blockthentic/_expo/static/js/web/PhIdentificationCard-535773c565dc5f589ebe7a1dd3c0e79c.js","5948":"/b10-blockchain-blockthentic/_expo/static/js/web/PhImage-dea01440d1e850fd46309b1ddfc0df1f.js","5949":"/b10-blockchain-blockthentic/_expo/static/js/web/PhInfo-194a76e341f191e468654c2c415d5a61.js","5950":"/b10-blockchain-blockthentic/_expo/static/js/web/PhLightbulb-5f66d2d074f25a69f8f773efdacb96a0.js","5951":"/b10-blockchain-blockthentic/_expo/static/js/web/PhMagnifyingGlass-692e9901d3cacf0add0989c46afdc134.js","5952":"/b10-blockchain-blockthentic/_expo/static/js/web/PhPaperPlaneRight-b23b64743725dbf32cf398943763cd94.js","5953":"/b10-blockchain-blockthentic/_expo/static/js/web/PhPlus-f068d936126198c4134178822b379f1d.js","5954":"/b10-blockchain-blockthentic/_expo/static/js/web/PhPower-1477b9ab65f43f5a6780b2d37a718d42.js","5955":"/b10-blockchain-blockthentic/_expo/static/js/web/PhPuzzlePiece-0b1bb0ef9be74da2d04ff48178417679.js","5956":"/b10-blockchain-blockthentic/_expo/static/js/web/PhQrCode-77137a2ecc2282ccced1c14a8743715e.js","5957":"/b10-blockchain-blockthentic/_expo/static/js/web/PhQuestion-842d983e18b52ee8e78a2dde9b73778d.js","5958":"/b10-blockchain-blockthentic/_expo/static/js/web/PhQuestionMark-c700dfb2348918986b2bdefa5fd51390.js","5959":"/b10-blockchain-blockthentic/_expo/static/js/web/PhSealCheck-acec8fed6c27ce39668651d7507555ec.js","5960":"/b10-blockchain-blockthentic/_expo/static/js/web/PhSignOut-cc914f2047050e2fe2cec505f839a42f.js","5961":"/b10-blockchain-blockthentic/_expo/static/js/web/PhSpinner-b395dff9f02969474e0ade827a9fb940.js","5962":"/b10-blockchain-blockthentic/_expo/static/js/web/PhTrash-d3b3a1b357b73a7034c60a97a2eea70b.js","5963":"/b10-blockchain-blockthentic/_expo/static/js/web/PhUser-375f5b4ae69ab9b88241650b1451f8ae.js","5965":"/b10-blockchain-blockthentic/_expo/static/js/web/PhWarning-200cef72d9d02d52a77e6a703bc4ebfd.js","5966":"/b10-blockchain-blockthentic/_expo/static/js/web/PhWarningCircle-3f3dd296613843807b1f8a993fda1d78.js","5967":"/b10-blockchain-blockthentic/_expo/static/js/web/PhX-e3730dbcb07a73274d4ca810ac384b66.js"}});
__d(function(g,r,i,a,m,e,d){"use strict";Object.defineProperty(e,'__esModule',{value:!0}),Object.defineProperty(e,"appStoreSvg",{enumerable:!0,get:function(){return C}});const C=r(d[0]).svg`<svg width="30" height="30" viewBox="0 0 30 30" fill="none">
  <g clip-path="url(#clip0_87_33)">
    <path d="M23.9367 2.29447e-07H6.05917C5.26333 -0.000218805 4.47526 0.156384 3.73997 0.46086C3.00469 0.765337 2.33661 1.21172 1.77391 1.7745C1.21121 2.33727 0.764917 3.00542 0.460542 3.74074C0.156167 4.47607 -0.000327963 5.26417 5.16031e-07 6.06V23.9433C4.48257e-07 24.7389 0.156744 25.5267 0.461276 26.2617C0.765808 26.9967 1.21216 27.6645 1.77484 28.2269C2.33752 28.7894 3.0055 29.2355 3.74061 29.5397C4.47573 29.8439 5.26358 30.0003 6.05917 30H23.9417C25.5486 29.9996 27.0895 29.3609 28.2257 28.2245C29.3618 27.0881 30 25.5469 30 23.94V6.06C29.9993 4.45241 29.3602 2.91091 28.2232 1.77449C27.0861 0.638064 25.5443 -0.000220881 23.9367 2.29447e-07Z" fill="url(#paint0_linear_87_33)"/>
    <path d="M14.8708 6.89259L15.4783 5.84259C15.5679 5.68703 15.6873 5.55064 15.8296 5.44122C15.9719 5.3318 16.1344 5.25148 16.3078 5.20486C16.4812 5.15824 16.662 5.14622 16.8401 5.1695C17.0181 5.19277 17.1898 5.25088 17.3453 5.34051C17.5009 5.43013 17.6373 5.54952 17.7467 5.69186C17.8561 5.83419 17.9364 5.99669 17.9831 6.17006C18.0297 6.34344 18.0417 6.5243 18.0184 6.70232C17.9952 6.88034 17.9371 7.05203 17.8474 7.20759L11.9949 17.3401H16.2283C17.5999 17.3401 18.3691 18.9526 17.7724 20.0701H5.36159C5.18215 20.0707 5.00436 20.0359 4.83845 19.9675C4.67254 19.8992 4.5218 19.7986 4.39492 19.6718C4.26803 19.5449 4.16751 19.3941 4.09915 19.2282C4.03079 19.0623 3.99593 18.8845 3.99659 18.7051C3.99659 17.9476 4.60492 17.3401 5.36159 17.3401H8.84159L13.2958 9.61926L11.9041 7.20426C11.738 6.89096 11.7 6.52543 11.7982 6.18469C11.8963 5.84395 12.1229 5.5546 12.4301 5.37763C12.7374 5.20065 13.1014 5.14987 13.4454 5.23599C13.7893 5.3221 14.0864 5.53838 14.2741 5.83926L14.8708 6.89259ZM9.60659 21.4759L8.29409 23.7526C8.20446 23.9082 8.08506 24.0446 7.94271 24.1541C7.80035 24.2636 7.63783 24.344 7.46441 24.3906C7.291 24.4373 7.11009 24.4493 6.93202 24.4261C6.75395 24.4028 6.58221 24.3447 6.42659 24.2551C6.27097 24.1655 6.13454 24.0461 6.02506 23.9037C5.91559 23.7613 5.83523 23.5988 5.78857 23.4254C5.74191 23.252 5.72986 23.0711 5.75311 22.893C5.77637 22.715 5.83446 22.5432 5.92409 22.3876L6.89909 20.7001C8.00159 20.3584 8.89742 20.6209 9.60659 21.4759ZM20.9066 17.3476H24.4583C25.2158 17.3476 25.8233 17.9551 25.8233 18.7126C25.8233 19.4701 25.2149 20.0776 24.4583 20.0776H22.4858L23.8166 22.3876C24.1916 23.0443 23.9708 23.8726 23.3149 24.2551C23.0006 24.4359 22.6274 24.4845 22.2772 24.3903C21.927 24.2961 21.6286 24.0667 21.4474 23.7526C19.2058 19.8643 17.5216 16.9534 16.4041 15.0151C15.2608 13.0426 16.0783 11.0626 16.8841 10.3909C17.7799 11.9293 19.1191 14.2501 20.9074 17.3476H20.9066Z" fill="white"/>
  </g>
  <defs>
    <linearGradient id="paint0_linear_87_33" x1="15" y1="2.29447e-07" x2="15" y2="30" gradientUnits="userSpaceOnUse">
      <stop stop-color="#18BFFB"/>
      <stop offset="1" stop-color="#2072F3"/>
    </linearGradient>
    <clipPath id="clip0_87_33">
      <rect width="30" height="30" fill="white"/>
    </clipPath>
  </defs>
</svg>`},6291,[5531]);
__d(function(g,r,i,a,m,e,d){"use strict";Object.defineProperty(e,'__esModule',{value:!0}),Object.defineProperty(e,"appleSvg",{enumerable:!0,get:function(){return l}});const l=r(d[0]).svg`<svg fill="none" viewBox="0 0 40 40">
  <g clip-path="url(#a)">
    <g clip-path="url(#b)">
      <circle cx="20" cy="19.89" r="20" fill="#000" />
      <g clip-path="url(#c)">
        <path
          fill="#fff"
          d="M28.77 23.3c-.69 1.99-2.75 5.52-4.87 5.56-1.4.03-1.86-.84-3.46-.84-1.61 0-2.12.81-3.45.86-2.25.1-5.72-5.1-5.72-9.62 0-4.15 2.9-6.2 5.42-6.25 1.36-.02 2.64.92 3.47.92.83 0 2.38-1.13 4.02-.97.68.03 2.6.28 3.84 2.08-3.27 2.14-2.76 6.61.75 8.25ZM24.2 7.88c-2.47.1-4.49 2.69-4.2 4.84 2.28.17 4.47-2.39 4.2-4.84Z"
        />
      </g>
    </g>
  </g>
  <defs>
    <clipPath id="a"><rect width="40" height="40" fill="#fff" rx="20" /></clipPath>
    <clipPath id="b"><path fill="#fff" d="M0 0h40v40H0z" /></clipPath>
    <clipPath id="c"><path fill="#fff" d="M8 7.89h24v24H8z" /></clipPath>
  </defs>
</svg>`},6292,[5531]);
__d(function(g,r,i,a,m,e,d){"use strict";Object.defineProperty(e,'__esModule',{value:!0}),Object.defineProperty(e,"bitcoinSvg",{enumerable:!0,get:function(){return t}});const t=r(d[0]).svg`
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 8 11">
    <path
      fill="var(--apkt-tokens-theme-textPrimary)"
      d="M7.862 4.86c.159-1.064-.652-1.637-1.76-2.018l.36-1.443-.879-.218-.35 1.404c-.23-.058-.468-.112-.703-.166l.352-1.413-.877-.219-.36 1.442a29.02 29.02 0 0 1-.56-.132v-.005l-1.21-.302-.234.938s.652.15.638.158c.356.089.42.324.41.51l-.41 1.644a.715.715 0 0 1 .09.03l-.092-.024-.574 2.302c-.044.108-.154.27-.402.208.008.013-.639-.16-.639-.16L.227 8.403l1.142.285c.213.053.42.109.626.161l-.363 1.459.877.218.36-1.443c.239.065.472.125.7.182l-.36 1.436.879.219.363-1.456c1.497.283 2.623.17 3.097-1.185.381-1.09-.02-1.719-.807-2.129.574-.132 1.006-.51 1.12-1.289ZM5.856 7.673c-.272 1.09-2.107.5-2.702.353l.482-1.933c.595.149 2.503.443 2.22 1.58Zm.271-2.829c-.247.992-1.775.488-2.27.365l.436-1.753c.496.124 2.092.354 1.834 1.388Z"
    />
  </svg>
`},6293,[5531]);
__d(function(g,r,i,a,m,e,d){"use strict";Object.defineProperty(e,'__esModule',{value:!0}),Object.defineProperty(e,"chromeStoreSvg",{enumerable:!0,get:function(){return t}});const t=r(d[0]).svg`<svg width="30" height="30" viewBox="0 0 30 30" fill="none">
<path d="M14.9978 7.80003H27.4668C26.2032 5.61107 24.3857 3.79333 22.1968 2.52955C20.008 1.26577 17.525 0.600485 14.9975 0.600586C12.47 0.600687 9.98712 1.26617 7.79838 2.53012C5.60964 3.79408 3.79221 5.61197 2.52881 7.80103L8.76281 18.599L8.76881 18.598C8.13412 17.5044 7.79906 16.2628 7.79743 14.9983C7.79579 13.7339 8.12764 12.4914 8.7595 11.3961C9.39136 10.3008 10.3009 9.39159 11.3963 8.76005C12.4918 8.12851 13.7344 7.79702 14.9988 7.79903L14.9978 7.80003Z" fill="url(#paint0_linear_87_32)"/>
<path d="M21.237 18.5981L15.003 29.3961C17.5305 29.3961 20.0134 28.7308 22.2022 27.467C24.391 26.2032 26.2086 24.3854 27.4721 22.1965C28.7356 20.0075 29.4006 17.5245 29.4003 14.997C29.3999 12.4695 28.7342 9.9867 27.47 7.7981H15.002L15 7.8041C16.2642 7.80168 17.5067 8.13257 18.6022 8.76342C19.6977 9.39428 20.6076 10.3028 21.2401 11.3974C21.8726 12.492 22.2053 13.734 22.2048 14.9982C22.2042 16.2623 21.8704 17.504 21.237 18.5981Z" fill="url(#paint1_linear_87_32)"/>
<path d="M8.76502 18.601L2.53102 7.80298C1.26664 9.99172 0.600848 12.4748 0.600586 15.0025C0.600324 17.5302 1.2656 20.0134 2.52953 22.2024C3.79345 24.3914 5.61145 26.209 7.80071 27.4725C9.98998 28.736 12.4733 29.4008 15.001 29.4L21.236 18.602L21.232 18.598C20.6022 19.6941 19.6944 20.6049 18.6003 21.2383C17.5062 21.8717 16.2644 22.2055 15.0002 22.2059C13.7359 22.2063 12.4939 21.8733 11.3994 21.2406C10.3049 20.6079 9.39657 19.6977 8.76602 18.602L8.76502 18.601Z" fill="url(#paint2_linear_87_32)"/>
<path d="M14.9998 22.2C16.9094 22.2 18.7407 21.4415 20.091 20.0912C21.4412 18.741 22.1998 16.9096 22.1998 15C22.1998 13.0905 21.4412 11.2591 20.091 9.90888C18.7407 8.55862 16.9094 7.80005 14.9998 7.80005C13.0902 7.80005 11.2589 8.55862 9.90864 9.90888C8.55837 11.2591 7.7998 13.0905 7.7998 15C7.7998 16.9096 8.55837 18.741 9.90864 20.0912C11.2589 21.4415 13.0902 22.2 14.9998 22.2Z" fill="white"/>
<path d="M14.9998 20.7C16.5115 20.7 17.9614 20.0995 19.0303 19.0306C20.0993 17.9616 20.6998 16.5118 20.6998 15C20.6998 13.4883 20.0993 12.0385 19.0303 10.9695C17.9614 9.90058 16.5115 9.30005 14.9998 9.30005C13.4881 9.30005 12.0383 9.90058 10.9693 10.9695C9.90034 12.0385 9.2998 13.4883 9.2998 15C9.2998 16.5118 9.90034 17.9616 10.9693 19.0306C12.0383 20.0995 13.4881 20.7 14.9998 20.7Z" fill="#1A73E8"/>
<defs>
  <linearGradient id="paint0_linear_87_32" x1="3.29381" y1="2.99503" x2="38.0998" y2="2.99503" gradientUnits="userSpaceOnUse">
    <stop stop-color="#D93025"/>
    <stop offset="1" stop-color="#EA4335"/>
  </linearGradient>
  <linearGradient id="paint1_linear_87_32" x1="17.953" y1="29.1431" x2="34.194" y2="-0.298904" gradientUnits="userSpaceOnUse">
    <stop stop-color="#FCC934"/>
    <stop offset="1" stop-color="#FBBC04"/>
  </linearGradient>
  <linearGradient id="paint2_linear_87_32" x1="22.873" y1="28.2" x2="6.63202" y2="-1.24102" gradientUnits="userSpaceOnUse">
    <stop stop-color="#1E8E3E"/>
    <stop offset="1" stop-color="#34A853"/>
  </linearGradient>
</defs>
</svg>`},6294,[5531]);
__d(function(g,r,i,a,m,e,d){"use strict";Object.defineProperty(e,'__esModule',{value:!0}),Object.defineProperty(e,"cursorSvg",{enumerable:!0,get:function(){return t}});const t=r(d[0]).svg` <svg fill="none" viewBox="0 0 13 4">
  <path fill="currentColor" d="M.5 0h12L8.9 3.13a3.76 3.76 0 0 1-4.8 0L.5 0Z" />
</svg>`},6295,[5531]);
__d(function(g,r,i,a,m,e,d){"use strict";Object.defineProperty(e,'__esModule',{value:!0}),Object.defineProperty(e,"discordSvg",{enumerable:!0,get:function(){return l}});const l=r(d[0]).svg`<svg fill="none" viewBox="0 0 40 40">
  <g clip-path="url(#a)">
    <g clip-path="url(#b)">
      <circle cx="20" cy="19.89" r="20" fill="#5865F2" />
      <path
        fill="#fff"
        fill-rule="evenodd"
        d="M25.71 28.15C30.25 28 32 25.02 32 25.02c0-6.61-2.96-11.98-2.96-11.98-2.96-2.22-5.77-2.15-5.77-2.15l-.29.32c3.5 1.07 5.12 2.61 5.12 2.61a16.75 16.75 0 0 0-10.34-1.93l-.35.04a15.43 15.43 0 0 0-5.88 1.9s1.71-1.63 5.4-2.7l-.2-.24s-2.81-.07-5.77 2.15c0 0-2.96 5.37-2.96 11.98 0 0 1.73 2.98 6.27 3.13l1.37-1.7c-2.6-.79-3.6-2.43-3.6-2.43l.58.35.09.06.08.04.02.01.08.05a17.25 17.25 0 0 0 4.52 1.58 14.4 14.4 0 0 0 8.3-.86c.72-.27 1.52-.66 2.37-1.21 0 0-1.03 1.68-3.72 2.44.61.78 1.35 1.67 1.35 1.67Zm-9.55-9.6c-1.17 0-2.1 1.03-2.1 2.28 0 1.25.95 2.28 2.1 2.28 1.17 0 2.1-1.03 2.1-2.28.01-1.25-.93-2.28-2.1-2.28Zm7.5 0c-1.17 0-2.1 1.03-2.1 2.28 0 1.25.95 2.28 2.1 2.28 1.17 0 2.1-1.03 2.1-2.28 0-1.25-.93-2.28-2.1-2.28Z"
        clip-rule="evenodd"
      />
    </g>
  </g>
  <defs>
    <clipPath id="a"><rect width="40" height="40" fill="#fff" rx="20" /></clipPath>
    <clipPath id="b"><path fill="#fff" d="M0 0h40v40H0z" /></clipPath>
  </defs>
</svg>`},6296,[5531]);
__d(function(g,r,i,a,m,e,d){"use strict";Object.defineProperty(e,'__esModule',{value:!0}),Object.defineProperty(e,"ethereumSvg",{enumerable:!0,get:function(){return t}});const t=r(d[0]).svg`<svg
  xmlns="http://www.w3.org/2000/svg"
  fill="none"
  viewBox="0 0 9 12"
>
  <path
    fill="var(--apkt-tokens-theme-textPrimary)"
    d="M4.666.001v4.435l3.748 1.675L4.666.001Zm0 0L.917 6.111l3.749-1.675V.001Zm0 8.984V12l3.75-5.19-3.75 2.176Zm0 3.014V8.985L.917 6.81 4.666 12Zm0-3.712 3.748-2.176-3.748-1.675v3.851Z"
  />
  <path fill="var(--apkt-tokens-theme-textPrimary)" d="m.917 6.111 3.749 2.176v-3.85L.917 6.11Z" />
</svg>`},6297,[5531]);
__d(function(g,r,i,a,m,e,d){"use strict";Object.defineProperty(e,'__esModule',{value:!0}),Object.defineProperty(e,"etherscanSvg",{enumerable:!0,get:function(){return c}});const c=r(d[0]).svg`<svg fill="none" viewBox="0 0 16 16">
  <path
    fill="currentColor"
    d="M4.25 7a.63.63 0 0 0-.63.63v3.97c0 .28-.2.51-.47.54l-.75.07a.93.93 0 0 1-.9-.47A7.51 7.51 0 0 1 5.54.92a7.5 7.5 0 0 1 9.54 4.62c.12.35.06.72-.16 1-.74.97-1.68 1.78-2.6 2.44V4.44a.64.64 0 0 0-.63-.64h-1.06c-.35 0-.63.3-.63.64v5.5c0 .23-.12.42-.32.5l-.52.23V6.05c0-.36-.3-.64-.64-.64H7.45c-.35 0-.64.3-.64.64v4.97c0 .25-.17.46-.4.52a5.8 5.8 0 0 0-.45.11v-4c0-.36-.3-.65-.64-.65H4.25ZM14.07 12.4A7.49 7.49 0 0 1 3.6 14.08c4.09-.58 9.14-2.5 11.87-6.6v.03a7.56 7.56 0 0 1-1.41 4.91Z"
  />
</svg>`},6298,[5531]);
__d(function(g,r,i,a,m,e,d){"use strict";Object.defineProperty(e,'__esModule',{value:!0}),Object.defineProperty(e,"facebookSvg",{enumerable:!0,get:function(){return l}});const l=r(d[0]).svg`<svg fill="none" viewBox="0 0 40 40">
  <g clip-path="url(#a)">
    <g clip-path="url(#b)">
      <circle cx="20" cy="19.89" r="20" fill="#1877F2" />
      <g clip-path="url(#c)">
        <path
          fill="#fff"
          d="M26 12.38h-2.89c-.92 0-1.61.38-1.61 1.34v1.66H26l-.36 4.5H21.5v12H17v-12h-3v-4.5h3V12.5c0-3.03 1.6-4.62 5.2-4.62H26v4.5Z"
        />
      </g>
    </g>
    <path
      fill="#1877F2"
      d="M40 20a20 20 0 1 0-23.13 19.76V25.78H11.8V20h5.07v-4.4c0-5.02 3-7.79 7.56-7.79 2.19 0 4.48.4 4.48.4v4.91h-2.53c-2.48 0-3.25 1.55-3.25 3.13V20h5.54l-.88 5.78h-4.66v13.98A20 20 0 0 0 40 20Z"
    />
    <path
      fill="#fff"
      d="m27.79 25.78.88-5.78h-5.55v-3.75c0-1.58.78-3.13 3.26-3.13h2.53V8.2s-2.3-.39-4.48-.39c-4.57 0-7.55 2.77-7.55 7.78V20H11.8v5.78h5.07v13.98a20.15 20.15 0 0 0 6.25 0V25.78h4.67Z"
    />
  </g>
  <defs>
    <clipPath id="a"><rect width="40" height="40" fill="#fff" rx="20" /></clipPath>
    <clipPath id="b"><path fill="#fff" d="M0 0h40v40H0z" /></clipPath>
    <clipPath id="c"><path fill="#fff" d="M8 7.89h24v24H8z" /></clipPath>
  </defs>
</svg>`},6299,[5531]);
__d(function(g,r,i,a,m,e,d){"use strict";Object.defineProperty(e,'__esModule',{value:!0}),Object.defineProperty(e,"farcasterSvg",{enumerable:!0,get:function(){return h}});const h=r(d[0]).svg`<svg style="border-radius: 9999px; overflow: hidden;"  fill="none" viewBox="0 0 1000 1000">
  <rect width="1000" height="1000" rx="9999" ry="9999" fill="#855DCD"/>
  <path fill="#855DCD" d="M0 0h1000v1000H0V0Z" />
  <path
    fill="#fff"
    d="M320 248h354v504h-51.96V521.13h-.5c-5.76-63.8-59.31-113.81-124.54-113.81s-118.78 50-124.53 113.81h-.5V752H320V248Z"
  />
  <path
    fill="#fff"
    d="m225 320 21.16 71.46h17.9v289.09a16.29 16.29 0 0 0-16.28 16.24v19.49h-3.25a16.3 16.3 0 0 0-16.28 16.24V752h182.26v-19.48a16.22 16.22 0 0 0-16.28-16.24h-3.25v-19.5a16.22 16.22 0 0 0-16.28-16.23h-19.52V320H225Zm400.3 360.55a16.3 16.3 0 0 0-15.04 10.02 16.2 16.2 0 0 0-1.24 6.22v19.49h-3.25a16.29 16.29 0 0 0-16.27 16.24V752h182.24v-19.48a16.23 16.23 0 0 0-16.27-16.24h-3.25v-19.5a16.2 16.2 0 0 0-10.04-15 16.3 16.3 0 0 0-6.23-1.23v-289.1h17.9L775 320H644.82v360.55H625.3Z"
  />
</svg>`},6300,[5531]);
__d(function(g,r,i,a,m,e,d){"use strict";Object.defineProperty(e,'__esModule',{value:!0}),Object.defineProperty(e,"githubSvg",{enumerable:!0,get:function(){return l}});const l=r(d[0]).svg`<svg fill="none" viewBox="0 0 40 40">
  <g clip-path="url(#a)">
    <g clip-path="url(#b)">
      <circle cx="20" cy="19.89" r="20" fill="#1B1F23" />
      <g clip-path="url(#c)">
        <path
          fill="#fff"
          d="M8 19.89a12 12 0 1 1 15.8 11.38c-.6.12-.8-.26-.8-.57v-3.3c0-1.12-.4-1.85-.82-2.22 2.67-.3 5.48-1.31 5.48-5.92 0-1.31-.47-2.38-1.24-3.22.13-.3.54-1.52-.12-3.18 0 0-1-.32-3.3 1.23a11.54 11.54 0 0 0-6 0c-2.3-1.55-3.3-1.23-3.3-1.23a4.32 4.32 0 0 0-.12 3.18 4.64 4.64 0 0 0-1.24 3.22c0 4.6 2.8 5.63 5.47 5.93-.34.3-.65.83-.76 1.6-.69.31-2.42.84-3.5-1 0 0-.63-1.15-1.83-1.23 0 0-1.18-.02-.09.73 0 0 .8.37 1.34 1.76 0 0 .7 2.14 4.03 1.41v2.24c0 .31-.2.68-.8.57A12 12 0 0 1 8 19.9Z"
        />
      </g>
    </g>
  </g>
  <defs>
    <clipPath id="a"><rect width="40" height="40" fill="#fff" rx="20" /></clipPath>
    <clipPath id="b"><path fill="#fff" d="M0 0h40v40H0z" /></clipPath>
    <clipPath id="c"><path fill="#fff" d="M8 7.89h24v24H8z" /></clipPath>
  </defs>
</svg>`},6301,[5531]);
__d(function(g,r,i,a,m,e,d){"use strict";Object.defineProperty(e,'__esModule',{value:!0}),Object.defineProperty(e,"googleSvg",{enumerable:!0,get:function(){return l}});const l=r(d[0]).svg`<svg fill="none" viewBox="0 0 40 40">
  <path
    fill="#4285F4"
    d="M32.74 20.3c0-.93-.08-1.81-.24-2.66H20.26v5.03h7a6 6 0 0 1-2.62 3.91v3.28h4.22c2.46-2.27 3.88-5.6 3.88-9.56Z"
  />
  <path
    fill="#34A853"
    d="M20.26 33a12.4 12.4 0 0 0 8.6-3.14l-4.22-3.28a7.74 7.74 0 0 1-4.38 1.26 7.76 7.76 0 0 1-7.28-5.36H8.65v3.36A12.99 12.99 0 0 0 20.26 33Z"
  />
  <path
    fill="#FBBC05"
    d="M12.98 22.47a7.79 7.79 0 0 1 0-4.94v-3.36H8.65a12.84 12.84 0 0 0 0 11.66l3.37-2.63.96-.73Z"
  />
  <path
    fill="#EA4335"
    d="M20.26 12.18a7.1 7.1 0 0 1 4.98 1.93l3.72-3.72A12.47 12.47 0 0 0 20.26 7c-5.08 0-9.47 2.92-11.6 7.17l4.32 3.36a7.76 7.76 0 0 1 7.28-5.35Z"
  />
</svg>`},6302,[5531]);
__d(function(g,r,i,a,m,e,d){"use strict";Object.defineProperty(e,'__esModule',{value:!0}),Object.defineProperty(e,"playStoreSvg",{enumerable:!0,get:function(){return t}});const t=r(d[0]).svg` <svg width="27" height="30" viewBox="0 0 27 30" fill="none">
  <path d="M12.5395 14.3237L0.116699 27.5049V27.5188C0.251527 28.0177 0.49972 28.4788 0.841941 28.866C1.18416 29.2533 1.61117 29.5563 2.0897 29.7515C2.56823 29.9467 3.08536 30.0287 3.60081 29.9913C4.11625 29.9538 4.61609 29.7979 5.06139 29.5356L5.0975 29.512L19.0718 21.4519L12.5395 14.3237Z" fill="#EA4335"/>
  <path d="M25.103 12.0833L25.0919 12.0722L19.0611 8.57202L12.2607 14.6279L19.0847 21.4504L25.0919 17.9864C25.6229 17.6983 26.0665 17.2725 26.376 16.7537C26.6854 16.2349 26.8493 15.6422 26.8505 15.0381C26.8516 14.434 26.6899 13.8408 26.3824 13.3208C26.0749 12.8008 25.633 12.3734 25.103 12.0833Z" fill="#FBBC04"/>
  <path d="M0.116672 2.49553C0.047224 2.7761 0 3.05528 0 3.35946V26.6537C0 26.9565 0.0347234 27.237 0.116672 27.5162L12.959 14.6725L0.116672 2.49553Z" fill="#4285F4"/>
  <path d="M12.634 15.0001L19.0607 8.57198L5.0975 0.477133C4.65115 0.210463 4.14916 0.0506574 3.63079 0.0102139C3.11242 -0.0302296 2.59172 0.0497852 2.10941 0.244001C1.6271 0.438216 1.19625 0.741368 0.850556 1.12975C0.504864 1.51813 0.253698 1.98121 0.116699 2.48279L12.634 15.0001Z" fill="#34A853"/>
</svg>`},6303,[5531]);
__d(function(g,r,i,a,m,e,d){"use strict";Object.defineProperty(e,'__esModule',{value:!0}),Object.defineProperty(e,"reownSvg",{enumerable:!0,get:function(){return t}});const t=r(d[0]).svg`<svg width="75" height="20" viewBox="0 0 75 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M11.6666 5.83334C11.6666 2.61168 14.2783 0 17.5 0H25.8334C29.055 0 31.6666 2.61168 31.6666 5.83334V14.1666C31.6666 17.3883 29.055 20 25.8334 20H17.5C14.2783 20 11.6666 17.3883 11.6666 14.1666V5.83334Z" fill="var(--apkt-tokens-theme-foregroundTertiary)"/>
<path d="M19.5068 13.7499L22.4309 5.83331H23.2895L20.3654 13.7499H19.5068Z" fill="var(--apkt-tokens-theme-textPrimary)"/>
<path d="M0 5.41666C0 2.42513 2.42513 0 5.41666 0C8.40821 0 10.8334 2.42513 10.8334 5.41666V14.5833C10.8334 17.5748 8.40821 20 5.41666 20C2.42513 20 0 17.5748 0 14.5833V5.41666Z" fill="var(--apkt-tokens-theme-foregroundTertiary)"/>
<path d="M4.89581 12.4997V11.458H5.93747V12.4997H4.89581Z" fill="var(--apkt-tokens-theme-textPrimary)"/>
<path d="M32.5 10C32.5 4.47715 36.6896 0 41.8578 0H65.6422C70.8104 0 75 4.47715 75 10C75 15.5229 70.8104 20 65.6422 20H41.8578C36.6896 20 32.5 15.5229 32.5 10Z" fill="var(--apkt-tokens-theme-foregroundTertiary)"/>
<path d="M61.7108 12.4475V7.82751H62.5266V8.52418C62.8199 8.01084 63.4157 7.70834 64.0757 7.70834C65.0749 7.70834 65.7715 8.34084 65.7715 9.56918V12.4475H64.9649V9.61503C64.9649 8.80831 64.5066 8.38668 63.8374 8.38668C63.1132 8.38668 62.5266 8.9642 62.5266 9.78001V12.4475H61.7108Z" fill="var(--apkt-tokens-theme-textPrimary)"/>
<path d="M56.5671 12.4475L55.7147 7.82748H56.4846L57.0896 11.6409L57.8871 9.12916H58.6479L59.4363 11.6134L60.0505 7.82748H60.8204L59.9679 12.4475H59.0513L58.2721 10.0458L57.4838 12.4475H56.5671Z" fill="var(--apkt-tokens-theme-textPrimary)"/>
<path d="M52.9636 12.5666C51.5611 12.5666 50.7361 11.5217 50.7361 10.1375C50.7361 8.76254 51.5611 7.70834 52.9636 7.70834C54.3661 7.70834 55.1911 8.76254 55.1911 10.1375C55.1911 11.5217 54.3661 12.5666 52.9636 12.5666ZM52.9636 11.8883C53.9719 11.8883 54.357 11.0266 54.357 10.1283C54.357 9.23914 53.9719 8.38668 52.9636 8.38668C51.9552 8.38668 51.5702 9.23914 51.5702 10.1283C51.5702 11.0266 51.9552 11.8883 52.9636 11.8883Z" fill="var(--apkt-tokens-theme-textPrimary)"/>
<path d="M47.8507 12.5666C46.494 12.5666 45.6415 11.5308 45.6415 10.1375C45.6415 8.75337 46.494 7.70834 47.8507 7.70834C48.9965 7.70834 50.0048 8.35917 49.8948 10.3483H46.4756C46.5398 11.2009 46.934 11.8975 47.8507 11.8975C48.4648 11.8975 48.8681 11.5217 49.0057 11.0908H49.8123C49.684 11.8609 48.9598 12.5666 47.8507 12.5666ZM46.494 9.73416H49.1065C49.0423 8.80831 48.6114 8.37751 47.8507 8.37751C47.0165 8.37751 46.604 8.98254 46.494 9.73416Z" fill="var(--apkt-tokens-theme-textPrimary)"/>
<path d="M41.7284 12.4475V7.82748H42.5625V8.60665C42.8559 8.09332 43.3601 7.82748 43.8825 7.82748H44.9917V8.60665H43.8184C43.0851 8.60665 42.5625 9.08331 42.5625 10.0092V12.4475H41.7284Z" fill="var(--apkt-tokens-theme-textPrimary)"/>
</svg>

`},6304,[5531]);
__d(function(g,r,i,a,m,e,d){"use strict";Object.defineProperty(e,'__esModule',{value:!0}),Object.defineProperty(e,"solanaSvg",{enumerable:!0,get:function(){return t}});const t=r(d[0]).svg`
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 8">
    <path
      fill="var(--apkt-tokens-theme-textPrimary)"
      d="m9.524 6.307-1.51 1.584A.35.35 0 0 1 7.76 8H.604a.178.178 0 0 1-.161-.103.168.168 0 0 1 .033-.186l1.51-1.583a.35.35 0 0 1 .256-.11h7.154c.034 0 .068.01.096.029a.168.168 0 0 1 .032.26Zm-1.51-3.189a.35.35 0 0 0-.255-.109H.604a.178.178 0 0 0-.161.103.168.168 0 0 0 .033.186l1.51 1.583a.35.35 0 0 0 .256.11h7.154a.178.178 0 0 0 .16-.104.168.168 0 0 0-.032-.185l-1.51-1.584ZM.605 1.981H7.76a.357.357 0 0 0 .256-.11L9.525.289a.17.17 0 0 0 .032-.185.173.173 0 0 0-.16-.103H2.241a.357.357 0 0 0-.256.109L.476 1.692a.17.17 0 0 0-.033.185.178.178 0 0 0 .16.103Z"
    />
  </svg>
`},6305,[5531]);
__d(function(g,r,i,a,m,e,d){"use strict";Object.defineProperty(e,'__esModule',{value:!0}),Object.defineProperty(e,"telegramSvg",{enumerable:!0,get:function(){return t}});const t=r(d[0]).svg`<svg width="32" height="32" fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
  <g clip-path="url(#a)">
    <path fill="url(#b)" d="M0 0h32v32H0z"/>
    <path fill-rule="evenodd" clip-rule="evenodd" d="M7.034 15.252c4.975-2.167 8.293-3.596 9.953-4.287 4.74-1.971 5.725-2.314 6.366-2.325.142-.002.457.033.662.198.172.14.22.33.243.463.022.132.05.435.028.671-.257 2.7-1.368 9.248-1.933 12.27-.24 1.28-.71 1.708-1.167 1.75-.99.091-1.743-.655-2.703-1.284-1.502-.985-2.351-1.598-3.81-2.558-1.684-1.11-.592-1.721.368-2.718.252-.261 4.619-4.233 4.703-4.594.01-.045.02-.213-.08-.301-.1-.09-.246-.059-.353-.035-.15.034-2.55 1.62-7.198 4.758-.682.468-1.298.696-1.851.684-.61-.013-1.782-.344-2.653-.628-1.069-.347-1.918-.53-1.845-1.12.039-.308.462-.623 1.27-.944Z" fill="#fff"/>
  </g>
  <path d="M.5 16C.5 7.44 7.44.5 16 .5 24.56.5 31.5 7.44 31.5 16c0 8.56-6.94 15.5-15.5 15.5C7.44 31.5.5 24.56.5 16Z" stroke="#141414" stroke-opacity=".05"/>
  <defs>
    <linearGradient id="b" x1="1600" y1="0" x2="1600" y2="3176.27" gradientUnits="userSpaceOnUse">
      <stop stop-color="#2AABEE"/>
      <stop offset="1" stop-color="#229ED9"/>
    </linearGradient>
    <clipPath id="a">
      <path d="M0 16C0 7.163 7.163 0 16 0s16 7.163 16 16-7.163 16-16 16S0 24.837 0 16Z" fill="#fff"/>
    </clipPath>
  </defs>
</svg>`},6306,[5531]);
__d(function(g,r,i,a,m,e,d){"use strict";Object.defineProperty(e,'__esModule',{value:!0}),Object.defineProperty(e,"twitchSvg",{enumerable:!0,get:function(){return l}});const l=r(d[0]).svg`<svg fill="none" viewBox="0 0 40 40">
  <g clip-path="url(#a)">
    <g clip-path="url(#b)">
      <circle cx="20" cy="19.89" r="20" fill="#5A3E85" />
      <g clip-path="url(#c)">
        <path
          fill="#fff"
          d="M18.22 25.7 20 23.91h3.34l2.1-2.1v-6.68H15.4v8.78h2.82v1.77Zm3.87-8.16h1.25v3.66H22.1v-3.66Zm-3.34 0H20v3.66h-1.25v-3.66ZM20 7.9a12 12 0 1 0 0 24 12 12 0 0 0 0-24Zm6.69 14.56-3.66 3.66h-2.72l-1.77 1.78h-1.88V26.1H13.3v-9.82l.94-2.4H26.7v8.56Z"
        />
      </g>
    </g>
  </g>
  <defs>
    <clipPath id="a"><rect width="40" height="40" fill="#fff" rx="20" /></clipPath>
    <clipPath id="b"><path fill="#fff" d="M0 0h40v40H0z" /></clipPath>
    <clipPath id="c"><path fill="#fff" d="M8 7.89h24v24H8z" /></clipPath>
  </defs>
</svg>`},6307,[5531]);
__d(function(g,r,i,a,m,e,d){"use strict";Object.defineProperty(e,'__esModule',{value:!0}),Object.defineProperty(e,"twitterIconSvg",{enumerable:!0,get:function(){return t}});const t=r(d[0]).svg`<svg fill="none" viewBox="0 0 16 16">
  <path
    fill="currentColor"
    d="m14.36 4.74.01.42c0 4.34-3.3 9.34-9.34 9.34A9.3 9.3 0 0 1 0 13.03a6.6 6.6 0 0 0 4.86-1.36 3.29 3.29 0 0 1-3.07-2.28c.5.1 1 .07 1.48-.06A3.28 3.28 0 0 1 .64 6.11v-.04c.46.26.97.4 1.49.41A3.29 3.29 0 0 1 1.11 2.1a9.32 9.32 0 0 0 6.77 3.43 3.28 3.28 0 0 1 5.6-3 6.59 6.59 0 0 0 2.08-.8 3.3 3.3 0 0 1-1.45 1.82A6.53 6.53 0 0 0 16 3.04c-.44.66-1 1.23-1.64 1.7Z"
  />
</svg>`},6308,[5531]);
__d(function(g,r,i,a,m,e,d){"use strict";Object.defineProperty(e,'__esModule',{value:!0}),Object.defineProperty(e,"walletSvg",{enumerable:!0,get:function(){return c}});const c=r(d[0]).svg`<svg fill="none" viewBox="0 0 20 20">
  <path
    fill="currentColor"
    fill-rule="evenodd"
    d="M0 5.5c0-1.8 1.46-3.25 3.25-3.25H14.5c1.8 0 3.25 1.46 3.25 3.25v.28A3.25 3.25 0 0 1 20 8.88v2.24c0 1.45-.94 2.68-2.25 3.1v.28c0 1.8-1.46 3.25-3.25 3.25H3.25A3.25 3.25 0 0 1 0 14.5v-9Zm15.75 8.88h-2.38a4.38 4.38 0 0 1 0-8.76h2.38V5.5c0-.69-.56-1.25-1.25-1.25H3.25C2.56 4.25 2 4.81 2 5.5v9c0 .69.56 1.25 1.25 1.25H14.5c.69 0 1.25-.56 1.25-1.25v-.13Zm-2.38-6.76a2.37 2.37 0 1 0 0 4.75h3.38c.69 0 1.25-.55 1.25-1.24V8.87c0-.69-.56-1.24-1.25-1.24h-3.38Z"
    clip-rule="evenodd"
  />
</svg>`},6309,[5531]);
__d(function(g,r,i,a,m,e,d){"use strict";Object.defineProperty(e,'__esModule',{value:!0}),Object.defineProperty(e,"walletConnectSvg",{enumerable:!0,get:function(){return n}}),Object.defineProperty(e,"walletConnectInvertSvg",{enumerable:!0,get:function(){return l}}),Object.defineProperty(e,"walletConnectLightBrownSvg",{enumerable:!0,get:function(){return L}}),Object.defineProperty(e,"walletConnectBrownSvg",{enumerable:!0,get:function(){return C}});var t=r(d[0]);const n=t.svg`
<svg xmlns="http://www.w3.org/2000/svg" width="89" height="89" viewBox="0 0 89 89" fill="none">
<path d="M60.0468 39.2502L65.9116 33.3854C52.6562 20.13 36.1858 20.13 22.9304 33.3854L28.7952 39.2502C38.8764 29.169 49.9725 29.169 60.0536 39.2502H60.0468Z" fill="var(--apkt-tokens-theme-textPrimary)"/>
<path d="M58.0927 52.9146L44.415 39.2369L30.7373 52.9146L17.0596 39.2369L11.2017 45.0949L30.7373 64.6374L44.415 50.9597L58.0927 64.6374L77.6284 45.0949L71.7704 39.2369L58.0927 52.9146Z" fill="var(--apkt-tokens-theme-textPrimary)"/>
</svg>`,l=t.svg`
<svg xmlns="http://www.w3.org/2000/svg" width="89" height="89" viewBox="0 0 89 89" fill="none">
<path d="M60.0468 39.2502L65.9116 33.3854C52.6562 20.13 36.1858 20.13 22.9304 33.3854L28.7952 39.2502C38.8764 29.169 49.9725 29.169 60.0536 39.2502H60.0468Z" fill="var(--apkt-tokens-theme-textInvert)"/>
<path d="M58.0927 52.9146L44.415 39.2369L30.7373 52.9146L17.0596 39.2369L11.2017 45.0949L30.7373 64.6374L44.415 50.9597L58.0927 64.6374L77.6284 45.0949L71.7704 39.2369L58.0927 52.9146Z" fill="var(--apkt-tokens-theme-textInvert)"/>
</svg>`,L=t.svg`
<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_22274_4692)">
<path d="M0 6.64C0 4.17295 0 2.93942 0.525474 2.01817C0.880399 1.39592 1.39592 0.880399 2.01817 0.525474C2.93942 0 4.17295 0 6.64 0H9.36C11.8271 0 13.0606 0 13.9818 0.525474C14.6041 0.880399 15.1196 1.39592 15.4745 2.01817C16 2.93942 16 4.17295 16 6.64V9.36C16 11.8271 16 13.0606 15.4745 13.9818C15.1196 14.6041 14.6041 15.1196 13.9818 15.4745C13.0606 16 11.8271 16 9.36 16H6.64C4.17295 16 2.93942 16 2.01817 15.4745C1.39592 15.1196 0.880399 14.6041 0.525474 13.9818C0 13.0606 0 11.8271 0 9.36V6.64Z" fill="#C7B994"/>
<path d="M4.49038 5.76609C6.42869 3.86833 9.5713 3.86833 11.5096 5.76609L11.7429 5.99449C11.8398 6.08938 11.8398 6.24323 11.7429 6.33811L10.9449 7.11942C10.8964 7.16686 10.8179 7.16686 10.7694 7.11942L10.4484 6.80512C9.09617 5.48119 6.90381 5.48119 5.5516 6.80512L5.20782 7.14171C5.15936 7.18915 5.08079 7.18915 5.03234 7.14171L4.23434 6.3604C4.13742 6.26552 4.13742 6.11167 4.23434 6.01678L4.49038 5.76609ZM13.1599 7.38192L13.8702 8.07729C13.9671 8.17217 13.9671 8.32602 13.8702 8.4209L10.6677 11.5564C10.5708 11.6513 10.4137 11.6513 10.3168 11.5564L8.04388 9.33105C8.01965 9.30733 7.98037 9.30733 7.95614 9.33105L5.6833 11.5564C5.58638 11.6513 5.42925 11.6513 5.33234 11.5564L2.12982 8.42087C2.0329 8.32598 2.0329 8.17213 2.12982 8.07724L2.84004 7.38188C2.93695 7.28699 3.09408 7.28699 3.191 7.38188L5.46392 9.60726C5.48815 9.63098 5.52743 9.63098 5.55166 9.60726L7.82447 7.38188C7.92138 7.28699 8.07851 7.28699 8.17543 7.38187L10.4484 9.60726C10.4726 9.63098 10.5119 9.63098 10.5361 9.60726L12.809 7.38192C12.9059 7.28703 13.063 7.28703 13.1599 7.38192Z" fill="currentColor"/>
</g>
<defs>
<clipPath id="clip0_22274_4692">
<path d="M0 8C0 3.58172 3.58172 0 8 0C12.4183 0 16 3.58172 16 8C16 12.4183 12.4183 16 8 16C3.58172 16 0 12.4183 0 8Z" fill="white"/>
</clipPath>
</defs>
</svg>
`,C=t.svg`
<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<circle cx="11" cy="11" r="11" transform="matrix(-1 0 0 1 23 1)" fill="#202020"/>
<circle cx="11" cy="11" r="11.5" transform="matrix(-1 0 0 1 23 1)" stroke="#C7B994" stroke-opacity="0.7"/>
<path d="M15.4523 11.0686L16.7472 9.78167C13.8205 6.87297 10.1838 6.87297 7.25708 9.78167L8.55201 11.0686C10.7779 8.85645 13.2279 8.85645 15.4538 11.0686H15.4523Z" fill="#C7B994"/>
<path d="M15.0199 14.067L12 11.0656L8.98 14.067L5.96004 11.0656L4.66663 12.3511L8.98 16.6393L12 13.638L15.0199 16.6393L19.3333 12.3511L18.0399 11.0656L15.0199 14.067Z" fill="#C7B994"/>
</svg>
`},6310,[5531]);
__d(function(g,r,i,a,m,e,d){"use strict";Object.defineProperty(e,'__esModule',{value:!0}),Object.defineProperty(e,"xSvg",{enumerable:!0,get:function(){return l}});const l=r(d[0]).svg`<svg fill="none" viewBox="0 0 41 40">
  <g clip-path="url(#a)">
    <path fill="#000" d="M.8 0h40v40H.8z" />
    <path
      fill="#fff"
      d="m22.63 18.46 7.14-8.3h-1.69l-6.2 7.2-4.96-7.2H11.2l7.5 10.9-7.5 8.71h1.7l6.55-7.61 5.23 7.61h5.72l-7.77-11.31Zm-9.13-7.03h2.6l11.98 17.13h-2.6L13.5 11.43Z"
    />
  </g>
  <defs>
    <clipPath id="a"><path fill="#fff" d="M.8 20a20 20 0 1 1 40 0 20 20 0 0 1-40 0Z" /></clipPath>
  </defs>
</svg>`},6311,[5531]);
__d(function(g,r,i,a,m,e,d){"use strict";Object.defineProperty(e,'__esModule',{value:!0}),Object.defineProperty(e,"default",{enumerable:!0,get:function(){return t}});var t=r(d[0]).css`
  :host {
    display: flex;
    justify-content: center;
    align-items: center;
    aspect-ratio: 1 / 1;
    color: var(--local-color);
    width: var(--local-width);
  }

  svg {
    height: inherit;
    width: inherit;
    object-fit: contain;
    object-position: center;
  }
`},6312,[5531]);
__d(function(g,_r,_i,a,m,_e,_d){"use strict";Object.defineProperty(_e,'__esModule',{value:!0}),Object.defineProperty(_e,"TEXT_VARS_BY_COLOR",{enumerable:!0,get:function(){return y}}),Object.defineProperty(_e,"WuiText",{enumerable:!0,get:function(){return d}});var e,t=_r(_d[0]),r=_r(_d[1]),o=_r(_d[2]),i=_r(_d[3]),n=_r(_d[4]),s=_r(_d[5]),l=_r(_d[6]),c=(e=l)&&e.__esModule?e:{default:e},p=this&&this.__decorate||function(e,t,r,o){var i,n=arguments.length,s=n<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,r):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)s=Reflect.decorate(e,t,r,o);else for(var l=e.length-1;l>=0;l--)(i=e[l])&&(s=(n<3?i(s):n>3?i(t,r,s):i(t,r))||s);return n>3&&s&&Object.defineProperty(t,r,s),s};const y={primary:i.vars.tokens.theme.textPrimary,secondary:i.vars.tokens.theme.textSecondary,tertiary:i.vars.tokens.theme.textTertiary,invert:i.vars.tokens.theme.textInvert,error:i.vars.tokens.core.textError,warning:i.vars.tokens.core.textWarning,'accent-primary':i.vars.tokens.core.textAccentPrimary};let d=class extends t.LitElement{constructor(){super(...arguments),this.variant='md-regular',this.color='inherit',this.align='left',this.lineClamp=void 0,this.display='inline-flex'}render(){const e={[`wui-font-${this.variant}`]:!0,[`wui-line-clamp-${this.lineClamp}`]:!!this.lineClamp};return this.style.cssText=`\n      display: ${this.display};\n      --local-align: ${this.align};\n      --local-color: ${'inherit'===this.color?'inherit':y[this.color??'primary']};\n      `,t.html`<slot class=${(0,o.classMap)(e)}></slot>`}};d.styles=[n.resetStyles,c.default],p([(0,r.property)()],d.prototype,"variant",void 0),p([(0,r.property)()],d.prototype,"color",void 0),p([(0,r.property)()],d.prototype,"align",void 0),p([(0,r.property)()],d.prototype,"lineClamp",void 0),p([(0,r.property)()],d.prototype,"display",void 0),d=p([(0,s.customElement)('wui-text')],d)},6313,[5531,5557,5606,6280,6279,6284,6314]);
__d(function(g,r,i,a,m,e,d){"use strict";Object.defineProperty(e,'__esModule',{value:!0}),Object.defineProperty(e,"default",{enumerable:!0,get:function(){return t}});var t=r(d[0]).css`
  slot {
    width: 100%;
    display: inline-block;
    font-style: normal;
    overflow: inherit;
    text-overflow: inherit;
    text-align: var(--local-align);
    color: var(--local-color);
  }

  .wui-line-clamp-1 {
    overflow: hidden;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
  }

  .wui-line-clamp-2 {
    overflow: hidden;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
  }

  /* -- Headings --------------------------------------------------- */
  .wui-font-h1-regular-mono {
    font-size: ${({textSize:t})=>t.h1};
    line-height: ${({typography:t})=>t['h1-regular-mono'].lineHeight};
    letter-spacing: ${({typography:t})=>t['h1-regular-mono'].letterSpacing};
    font-weight: ${({fontWeight:t})=>t.regular};
    font-family: ${({fontFamily:t})=>t.mono};
  }

  .wui-font-h1-regular {
    font-size: ${({textSize:t})=>t.h1};
    line-height: ${({typography:t})=>t['h1-regular'].lineHeight};
    letter-spacing: ${({typography:t})=>t['h1-regular'].letterSpacing};
    font-weight: ${({fontWeight:t})=>t.regular};
    font-family: ${({fontFamily:t})=>t.regular};
    font-feature-settings:
      'liga' off,
      'clig' off;
  }

  .wui-font-h1-medium {
    font-size: ${({textSize:t})=>t.h1};
    line-height: ${({typography:t})=>t['h1-medium'].lineHeight};
    letter-spacing: ${({typography:t})=>t['h1-medium'].letterSpacing};
    font-weight: ${({fontWeight:t})=>t.medium};
    font-family: ${({fontFamily:t})=>t.regular};
    font-feature-settings:
      'liga' off,
      'clig' off;
  }

  .wui-font-h2-regular-mono {
    font-size: ${({textSize:t})=>t.h2};
    line-height: ${({typography:t})=>t['h2-regular-mono'].lineHeight};
    letter-spacing: ${({typography:t})=>t['h2-regular-mono'].letterSpacing};
    font-weight: ${({fontWeight:t})=>t.regular};
    font-family: ${({fontFamily:t})=>t.mono};
  }

  .wui-font-h2-regular {
    font-size: ${({textSize:t})=>t.h2};
    line-height: ${({typography:t})=>t['h2-regular'].lineHeight};
    letter-spacing: ${({typography:t})=>t['h2-regular'].letterSpacing};
    font-weight: ${({fontWeight:t})=>t.regular};
    font-family: ${({fontFamily:t})=>t.regular};
    font-feature-settings:
      'liga' off,
      'clig' off;
  }

  .wui-font-h2-medium {
    font-size: ${({textSize:t})=>t.h2};
    line-height: ${({typography:t})=>t['h2-medium'].lineHeight};
    letter-spacing: ${({typography:t})=>t['h2-medium'].letterSpacing};
    font-weight: ${({fontWeight:t})=>t.medium};
    font-family: ${({fontFamily:t})=>t.regular};
    font-feature-settings:
      'liga' off,
      'clig' off;
  }

  .wui-font-h3-regular-mono {
    font-size: ${({textSize:t})=>t.h3};
    line-height: ${({typography:t})=>t['h3-regular-mono'].lineHeight};
    letter-spacing: ${({typography:t})=>t['h3-regular-mono'].letterSpacing};
    font-weight: ${({fontWeight:t})=>t.regular};
    font-family: ${({fontFamily:t})=>t.mono};
  }

  .wui-font-h3-regular {
    font-size: ${({textSize:t})=>t.h3};
    line-height: ${({typography:t})=>t['h3-regular'].lineHeight};
    letter-spacing: ${({typography:t})=>t['h3-regular'].letterSpacing};
    font-weight: ${({fontWeight:t})=>t.regular};
    font-family: ${({fontFamily:t})=>t.regular};
    font-feature-settings:
      'liga' off,
      'clig' off;
  }

  .wui-font-h3-medium {
    font-size: ${({textSize:t})=>t.h3};
    line-height: ${({typography:t})=>t['h3-medium'].lineHeight};
    letter-spacing: ${({typography:t})=>t['h3-medium'].letterSpacing};
    font-weight: ${({fontWeight:t})=>t.medium};
    font-family: ${({fontFamily:t})=>t.regular};
    font-feature-settings:
      'liga' off,
      'clig' off;
  }

  .wui-font-h4-regular-mono {
    font-size: ${({textSize:t})=>t.h4};
    line-height: ${({typography:t})=>t['h4-regular-mono'].lineHeight};
    letter-spacing: ${({typography:t})=>t['h4-regular-mono'].letterSpacing};
    font-weight: ${({fontWeight:t})=>t.regular};
    font-family: ${({fontFamily:t})=>t.mono};
  }

  .wui-font-h4-regular {
    font-size: ${({textSize:t})=>t.h4};
    line-height: ${({typography:t})=>t['h4-regular'].lineHeight};
    letter-spacing: ${({typography:t})=>t['h4-regular'].letterSpacing};
    font-weight: ${({fontWeight:t})=>t.regular};
    font-family: ${({fontFamily:t})=>t.regular};
    font-feature-settings:
      'liga' off,
      'clig' off;
  }

  .wui-font-h4-medium {
    font-size: ${({textSize:t})=>t.h4};
    line-height: ${({typography:t})=>t['h4-medium'].lineHeight};
    letter-spacing: ${({typography:t})=>t['h4-medium'].letterSpacing};
    font-weight: ${({fontWeight:t})=>t.medium};
    font-family: ${({fontFamily:t})=>t.regular};
    font-feature-settings:
      'liga' off,
      'clig' off;
  }

  .wui-font-h5-regular-mono {
    font-size: ${({textSize:t})=>t.h5};
    line-height: ${({typography:t})=>t['h5-regular-mono'].lineHeight};
    letter-spacing: ${({typography:t})=>t['h5-regular-mono'].letterSpacing};
    font-weight: ${({fontWeight:t})=>t.regular};
    font-family: ${({fontFamily:t})=>t.mono};
  }

  .wui-font-h5-regular {
    font-size: ${({textSize:t})=>t.h5};
    line-height: ${({typography:t})=>t['h5-regular'].lineHeight};
    letter-spacing: ${({typography:t})=>t['h5-regular'].letterSpacing};
    font-weight: ${({fontWeight:t})=>t.regular};
    font-family: ${({fontFamily:t})=>t.regular};
    font-feature-settings:
      'liga' off,
      'clig' off;
  }

  .wui-font-h5-medium {
    font-size: ${({textSize:t})=>t.h5};
    line-height: ${({typography:t})=>t['h5-medium'].lineHeight};
    letter-spacing: ${({typography:t})=>t['h5-medium'].letterSpacing};
    font-weight: ${({fontWeight:t})=>t.medium};
    font-family: ${({fontFamily:t})=>t.regular};
    font-feature-settings:
      'liga' off,
      'clig' off;
  }

  .wui-font-h6-regular-mono {
    font-size: ${({textSize:t})=>t.h6};
    line-height: ${({typography:t})=>t['h6-regular-mono'].lineHeight};
    letter-spacing: ${({typography:t})=>t['h6-regular-mono'].letterSpacing};
    font-weight: ${({fontWeight:t})=>t.regular};
    font-family: ${({fontFamily:t})=>t.mono};
  }

  .wui-font-h6-regular {
    font-size: ${({textSize:t})=>t.h6};
    line-height: ${({typography:t})=>t['h6-regular'].lineHeight};
    letter-spacing: ${({typography:t})=>t['h6-regular'].letterSpacing};
    font-weight: ${({fontWeight:t})=>t.regular};
    font-family: ${({fontFamily:t})=>t.regular};
    font-feature-settings:
      'liga' off,
      'clig' off;
  }

  .wui-font-h6-medium {
    font-size: ${({textSize:t})=>t.h6};
    line-height: ${({typography:t})=>t['h6-medium'].lineHeight};
    letter-spacing: ${({typography:t})=>t['h6-medium'].letterSpacing};
    font-weight: ${({fontWeight:t})=>t.medium};
    font-family: ${({fontFamily:t})=>t.regular};
    font-feature-settings:
      'liga' off,
      'clig' off;
  }

  .wui-font-lg-regular-mono {
    font-size: ${({textSize:t})=>t.large};
    line-height: ${({typography:t})=>t['lg-regular-mono'].lineHeight};
    letter-spacing: ${({typography:t})=>t['lg-regular-mono'].letterSpacing};
    font-weight: ${({fontWeight:t})=>t.regular};
    font-family: ${({fontFamily:t})=>t.mono};
  }

  .wui-font-lg-regular {
    font-size: ${({textSize:t})=>t.large};
    line-height: ${({typography:t})=>t['lg-regular'].lineHeight};
    letter-spacing: ${({typography:t})=>t['lg-regular'].letterSpacing};
    font-weight: ${({fontWeight:t})=>t.regular};
    font-family: ${({fontFamily:t})=>t.regular};
    font-feature-settings:
      'liga' off,
      'clig' off;
  }

  .wui-font-lg-medium {
    font-size: ${({textSize:t})=>t.large};
    line-height: ${({typography:t})=>t['lg-medium'].lineHeight};
    letter-spacing: ${({typography:t})=>t['lg-medium'].letterSpacing};
    font-weight: ${({fontWeight:t})=>t.medium};
    font-family: ${({fontFamily:t})=>t.regular};
    font-feature-settings:
      'liga' off,
      'clig' off;
  }

  .wui-font-md-regular-mono {
    font-size: ${({textSize:t})=>t.medium};
    line-height: ${({typography:t})=>t['md-regular-mono'].lineHeight};
    letter-spacing: ${({typography:t})=>t['md-regular-mono'].letterSpacing};
    font-weight: ${({fontWeight:t})=>t.regular};
    font-family: ${({fontFamily:t})=>t.mono};
  }

  .wui-font-md-regular {
    font-size: ${({textSize:t})=>t.medium};
    line-height: ${({typography:t})=>t['md-regular'].lineHeight};
    letter-spacing: ${({typography:t})=>t['md-regular'].letterSpacing};
    font-weight: ${({fontWeight:t})=>t.regular};
    font-family: ${({fontFamily:t})=>t.regular};
    font-feature-settings:
      'liga' off,
      'clig' off;
  }

  .wui-font-md-medium {
    font-size: ${({textSize:t})=>t.medium};
    line-height: ${({typography:t})=>t['md-medium'].lineHeight};
    letter-spacing: ${({typography:t})=>t['md-medium'].letterSpacing};
    font-weight: ${({fontWeight:t})=>t.medium};
    font-family: ${({fontFamily:t})=>t.regular};
    font-feature-settings:
      'liga' off,
      'clig' off;
  }

  .wui-font-sm-regular-mono {
    font-size: ${({textSize:t})=>t.small};
    line-height: ${({typography:t})=>t['sm-regular-mono'].lineHeight};
    letter-spacing: ${({typography:t})=>t['sm-regular-mono'].letterSpacing};
    font-weight: ${({fontWeight:t})=>t.regular};
    font-family: ${({fontFamily:t})=>t.mono};
  }

  .wui-font-sm-regular {
    font-size: ${({textSize:t})=>t.small};
    line-height: ${({typography:t})=>t['sm-regular'].lineHeight};
    letter-spacing: ${({typography:t})=>t['sm-regular'].letterSpacing};
    font-weight: ${({fontWeight:t})=>t.regular};
    font-family: ${({fontFamily:t})=>t.regular};
    font-feature-settings:
      'liga' off,
      'clig' off;
  }

  .wui-font-sm-medium {
    font-size: ${({textSize:t})=>t.small};
    line-height: ${({typography:t})=>t['sm-medium'].lineHeight};
    letter-spacing: ${({typography:t})=>t['sm-medium'].letterSpacing};
    font-weight: ${({fontWeight:t})=>t.medium};
    font-family: ${({fontFamily:t})=>t.regular};
    font-feature-settings:
      'liga' off,
      'clig' off;
  }
`},6314,[6280]);
__d(function(g,_r,_i,a,m,_e,_d){"use strict";Object.defineProperty(_e,'__esModule',{value:!0}),Object.defineProperty(_e,"WuiIconBox",{enumerable:!0,get:function(){return l}});var e=_r(_d[0]),t=_r(_d[1]),o=_r(_d[2]);_r(_d[3]);var r,i=_r(_d[4]),n=_r(_d[5]),s=_r(_d[6]),c=(r=s)&&r.__esModule?r:{default:r},d=this&&this.__decorate||function(e,t,o,r){var i,n=arguments.length,s=n<3?t:null===r?r=Object.getOwnPropertyDescriptor(t,o):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)s=Reflect.decorate(e,t,o,r);else for(var c=e.length-1;c>=0;c--)(i=e[c])&&(s=(n<3?i(s):n>3?i(t,o,s):i(t,o))||s);return n>3&&s&&Object.defineProperty(t,o,s),s};let l=class extends e.LitElement{constructor(){super(...arguments),this.icon='copy',this.size='md',this.padding='1',this.color='default'}render(){return this.dataset.padding=this.padding,this.dataset.color=this.color,e.html`
      <wui-icon size=${(0,o.ifDefined)(this.size)} name=${this.icon} color="inherit"></wui-icon>
    `}};l.styles=[i.resetStyles,i.elementStyles,c.default],d([(0,t.property)()],l.prototype,"icon",void 0),d([(0,t.property)()],l.prototype,"size",void 0),d([(0,t.property)()],l.prototype,"padding",void 0),d([(0,t.property)()],l.prototype,"color",void 0),l=d([(0,n.customElement)('wui-icon-box')],l)},6315,[5531,5557,5568,6290,6279,6284,6316]);
__d(function(g,r,i,a,m,e,d){"use strict";Object.defineProperty(e,'__esModule',{value:!0}),Object.defineProperty(e,"default",{enumerable:!0,get:function(){return o}});var o=r(d[0]).css`
  :host {
    display: inline-flex;
    justify-content: center;
    align-items: center;
    border-radius: ${({borderRadius:o})=>o[2]};
    padding: ${({spacing:o})=>o[1]} !important;
    background-color: ${({tokens:o})=>o.theme.backgroundPrimary};
    position: relative;
  }

  :host([data-padding='2']) {
    padding: ${({spacing:o})=>o[2]} !important;
  }

  :host:after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: ${({borderRadius:o})=>o[2]};
  }

  :host > wui-icon {
    z-index: 10;
  }

  /* -- Colors --------------------------------------------------- */
  :host([data-color='accent-primary']) {
    color: ${({tokens:o})=>o.core.iconAccentPrimary};
  }

  :host([data-color='accent-primary']):after {
    background-color: ${({tokens:o})=>o.core.foregroundAccent010};
  }

  :host([data-color='default']),
  :host([data-color='secondary']) {
    color: ${({tokens:o})=>o.theme.iconDefault};
  }

  :host([data-color='default']):after {
    background-color: ${({tokens:o})=>o.theme.foregroundPrimary};
  }

  :host([data-color='secondary']):after {
    background-color: ${({tokens:o})=>o.theme.foregroundSecondary};
  }

  :host([data-color='success']) {
    color: ${({tokens:o})=>o.core.iconSuccess};
  }

  :host([data-color='success']):after {
    background-color: ${({tokens:o})=>o.core.backgroundSuccess};
  }

  :host([data-color='error']) {
    color: ${({tokens:o})=>o.core.iconError};
  }

  :host([data-color='error']):after {
    background-color: ${({tokens:o})=>o.core.backgroundError};
  }

  :host([data-color='warning']) {
    color: ${({tokens:o})=>o.core.iconWarning};
  }

  :host([data-color='warning']):after {
    background-color: ${({tokens:o})=>o.core.backgroundWarning};
  }

  :host([data-color='inverse']) {
    color: ${({tokens:o})=>o.theme.iconInverse};
  }

  :host([data-color='inverse']):after {
    background-color: transparent;
  }
`},6316,[6280]);
__d(function(g,_r,_i,a,m,_e,_d){"use strict";Object.defineProperty(_e,'__esModule',{value:!0}),Object.defineProperty(_e,"WuiAllWalletsImage",{enumerable:!0,get:function(){return u}});var e=_r(_d[0]),t=_r(_d[1]),l=_r(_d[2]),r=_r(_d[3]),s=_r(_d[4]);_r(_d[5]),_r(_d[6]);var i,n=_r(_d[7]),o=(i=n)&&i.__esModule?i:{default:i},c=this&&this.__decorate||function(e,t,l,r){var s,i=arguments.length,n=i<3?t:null===r?r=Object.getOwnPropertyDescriptor(t,l):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,l,r);else for(var o=e.length-1;o>=0;o--)(s=e[o])&&(n=(i<3?s(n):i>3?s(t,l,n):s(t,l))||n);return i>3&&n&&Object.defineProperty(t,l,n),n};let u=class extends e.LitElement{constructor(){super(...arguments),this.walletImages=[]}render(){const t=this.walletImages.length<4;return e.html`${this.walletImages.slice(0,4).map(({src:t,walletName:r})=>e.html`
          <wui-wallet-image
            size="sm"
            imageSrc=${t}
            name=${(0,l.ifDefined)(r)}
          ></wui-wallet-image>
        `)}
    ${t?[...Array(4-this.walletImages.length)].map(()=>e.html` <wui-wallet-image size="sm" name=""></wui-wallet-image>`):null} `}};u.styles=[r.resetStyles,o.default],c([(0,t.property)({type:Array})],u.prototype,"walletImages",void 0),u=c([(0,s.customElement)('wui-all-wallets-image')],u)},6317,[5531,5557,5568,6279,6284,6315,6318,6322]);
__d(function(g,_r,_i,a,m,_e,_d){"use strict";Object.defineProperty(_e,'__esModule',{value:!0}),Object.defineProperty(_e,"WuiWalletImage",{enumerable:!0,get:function(){return c}});var e=_r(_d[0]),t=_r(_d[1]);_r(_d[2]),_r(_d[3]);var i=_r(_d[4]),r=_r(_d[5]);_r(_d[6]);var s,o=_r(_d[7]),l=(s=o)&&s.__esModule?s:{default:s},n=this&&this.__decorate||function(e,t,i,r){var s,o=arguments.length,l=o<3?t:null===r?r=Object.getOwnPropertyDescriptor(t,i):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)l=Reflect.decorate(e,t,i,r);else for(var n=e.length-1;n>=0;n--)(s=e[n])&&(l=(o<3?s(l):o>3?s(t,i,l):s(t,i))||l);return o>3&&l&&Object.defineProperty(t,i,l),l};let c=class extends e.LitElement{constructor(){super(...arguments),this.size='md',this.name='',this.installed=!1,this.badgeSize='xs'}render(){let t='1';return'lg'===this.size?t='4':'md'===this.size?t='2':'sm'===this.size&&(t='1'),this.style.cssText=`\n       --local-border-radius: var(--apkt-borderRadius-${t});\n   `,this.dataset.size=this.size,this.imageSrc&&(this.dataset.image='true'),this.walletIcon&&(this.dataset.walletIcon=this.walletIcon),e.html`
      <wui-flex justifyContent="center" alignItems="center"> ${this.templateVisual()} </wui-flex>
    `}templateVisual(){return this.imageSrc?e.html`<wui-image src=${this.imageSrc} alt=${this.name}></wui-image>`:this.walletIcon?e.html`<wui-icon size="md" color="default" name=${this.walletIcon}></wui-icon>`:e.html`<wui-icon
      data-parent-size=${this.size}
      size="inherit"
      color="inherit"
      name="wallet"
    ></wui-icon>`}};c.styles=[i.resetStyles,l.default],n([(0,t.property)()],c.prototype,"size",void 0),n([(0,t.property)()],c.prototype,"name",void 0),n([(0,t.property)()],c.prototype,"imageSrc",void 0),n([(0,t.property)()],c.prototype,"walletIcon",void 0),n([(0,t.property)({type:Boolean})],c.prototype,"installed",void 0),n([(0,t.property)()],c.prototype,"badgeSize",void 0),c=n([(0,r.customElement)('wui-wallet-image')],c)},6318,[5531,5557,6290,6319,6279,6284,6315,6321]);
__d(function(g,_r,_i,a,m,_e,_d){"use strict";Object.defineProperty(_e,'__esModule',{value:!0}),Object.defineProperty(_e,"WuiImage",{enumerable:!0,get:function(){return d}});var e,t=_r(_d[0]),o=_r(_d[1]),i=_r(_d[2]),r=_r(_d[3]),s=_r(_d[4]),l=_r(_d[5]),n=(e=l)&&e.__esModule?e:{default:e},p=this&&this.__decorate||function(e,t,o,i){var r,s=arguments.length,l=s<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,o):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)l=Reflect.decorate(e,t,o,i);else for(var n=e.length-1;n>=0;n--)(r=e[n])&&(l=(s<3?r(l):s>3?r(t,o,l):r(t,o))||l);return s>3&&l&&Object.defineProperty(t,o,l),l};let d=class extends t.LitElement{constructor(){super(...arguments),this.src='./path/to/image.jpg',this.alt='Image',this.size=void 0,this.boxed=!1,this.rounded=!1,this.fullSize=!1}render(){const e={inherit:'inherit',xxs:'2',xs:'3',sm:'4',md:'4',mdl:'5',lg:'5',xl:'6',xxl:'7','3xl':'8','4xl':'9','5xl':'10'};return this.style.cssText=`\n      --local-width: ${this.size?`var(--apkt-spacing-${e[this.size]});`:'100%'};\n      --local-height: ${this.size?`var(--apkt-spacing-${e[this.size]});`:'100%'};\n      `,this.dataset.boxed=this.boxed?'true':'false',this.dataset.rounded=this.rounded?'true':'false',this.dataset.full=this.fullSize?'true':'false',this.dataset.icon=this.iconColor||'inherit',this.icon?t.html`<wui-icon
        color=${this.iconColor||'inherit'}
        name=${this.icon}
        size="lg"
      ></wui-icon> `:this.logo?t.html`<wui-icon size="lg" color="inherit" name=${this.logo}></wui-icon> `:t.html`<img src=${(0,i.ifDefined)(this.src)} alt=${this.alt} @error=${this.handleImageError} />`}handleImageError(){this.dispatchEvent(new CustomEvent('onLoadError',{bubbles:!0,composed:!0}))}};d.styles=[r.resetStyles,n.default],p([(0,o.property)()],d.prototype,"src",void 0),p([(0,o.property)()],d.prototype,"logo",void 0),p([(0,o.property)()],d.prototype,"icon",void 0),p([(0,o.property)()],d.prototype,"iconColor",void 0),p([(0,o.property)()],d.prototype,"alt",void 0),p([(0,o.property)()],d.prototype,"size",void 0),p([(0,o.property)({type:Boolean})],d.prototype,"boxed",void 0),p([(0,o.property)({type:Boolean})],d.prototype,"rounded",void 0),p([(0,o.property)({type:Boolean})],d.prototype,"fullSize",void 0),d=p([(0,s.customElement)('wui-image')],d)},6319,[5531,5557,5568,6279,6284,6320]);
__d(function(g,r,i,a,m,e,d){"use strict";Object.defineProperty(e,'__esModule',{value:!0}),Object.defineProperty(e,"default",{enumerable:!0,get:function(){return t}});var t=r(d[0]).css`
  :host {
    display: block;
    width: var(--local-width);
    height: var(--local-height);
  }

  img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center center;
    border-radius: inherit;
    user-select: none;
    user-drag: none;
    -webkit-user-drag: none;
    -khtml-user-drag: none;
    -moz-user-drag: none;
    -o-user-drag: none;
  }

  :host([data-boxed='true']) {
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: ${({tokens:t})=>t.theme.foregroundPrimary};
    border-radius: ${({borderRadius:t})=>t[2]};
  }

  :host([data-boxed='true']) img {
    width: 20px;
    height: 20px;
    border-radius: ${({borderRadius:t})=>t[16]};
  }

  :host([data-full='true']) img {
    width: 100%;
    height: 100%;
  }

  :host([data-boxed='true']) wui-icon {
    width: 20px;
    height: 20px;
  }

  :host([data-icon='error']) {
    background-color: ${({tokens:t})=>t.core.backgroundError};
  }

  :host([data-rounded='true']) {
    border-radius: ${({borderRadius:t})=>t[16]};
  }
`},6320,[6280]);
__d(function(g,r,i,a,m,e,d){"use strict";Object.defineProperty(e,'__esModule',{value:!0}),Object.defineProperty(e,"default",{enumerable:!0,get:function(){return t}});var t=r(d[0]).css`
  :host {
    position: relative;
    background-color: ${({tokens:t})=>t.theme.foregroundTertiary};
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: inherit;
    border-radius: var(--local-border-radius);
  }

  :host([data-image='true']) {
    background-color: transparent;
  }

  :host > wui-flex {
    overflow: hidden;
    border-radius: inherit;
    border-radius: var(--local-border-radius);
  }

  :host([data-size='sm']) {
    width: 32px;
    height: 32px;
  }

  :host([data-size='md']) {
    width: 40px;
    height: 40px;
  }

  :host([data-size='lg']) {
    width: 56px;
    height: 56px;
  }

  :host([name='Extension'])::after {
    border: 1px solid ${({colors:t})=>t.accent010};
  }

  :host([data-wallet-icon='allWallets'])::after {
    border: 1px solid ${({colors:t})=>t.accent010};
  }

  wui-icon[data-parent-size='inherit'] {
    width: 75%;
    height: 75%;
    align-items: center;
  }

  wui-icon[data-parent-size='sm'] {
    width: 32px;
    height: 32px;
  }

  wui-icon[data-parent-size='md'] {
    width: 40px;
    height: 40px;
  }

  :host > wui-icon-box {
    position: absolute;
    overflow: hidden;
    right: -1px;
    bottom: -2px;
    z-index: 1;
    border: 2px solid ${({tokens:t})=>t.theme.backgroundPrimary};
    padding: 1px;
  }
`},6321,[6280]);
__d(function(g,r,i,a,m,e,d){"use strict";Object.defineProperty(e,'__esModule',{value:!0}),Object.defineProperty(e,"default",{enumerable:!0,get:function(){return t}});var t=r(d[0]).css`
  :host {
    position: relative;
    border-radius: ${({borderRadius:t})=>t[2]};
    width: 40px;
    height: 40px;
    overflow: hidden;
    background: ${({tokens:t})=>t.theme.foregroundPrimary};
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    column-gap: ${({spacing:t})=>t[1]};
    padding: ${({spacing:t})=>t[1]};
  }

  :host > wui-wallet-image {
    width: 14px;
    height: 14px;
    border-radius: 2px;
  }
`},6322,[6280]);
__d(function(g,_r,_i,a,m,_e,_d){"use strict";Object.defineProperty(_e,'__esModule',{value:!0}),Object.defineProperty(_e,"WuiTag",{enumerable:!0,get:function(){return l}});var t=_r(_d[0]),e=_r(_d[1]);_r(_d[2]),_r(_d[3]);var i,r=_r(_d[4]),o=_r(_d[5]),s=_r(_d[6]),n=(i=s)&&i.__esModule?i:{default:i},c=this&&this.__decorate||function(t,e,i,r){var o,s=arguments.length,n=s<3?e:null===r?r=Object.getOwnPropertyDescriptor(e,i):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(t,e,i,r);else for(var c=t.length-1;c>=0;c--)(o=t[c])&&(n=(s<3?o(n):s>3?o(e,i,n):o(e,i))||n);return s>3&&n&&Object.defineProperty(e,i,n),n};let l=class extends t.LitElement{constructor(){super(...arguments),this.variant='accent',this.size='md',this.icon=void 0}render(){this.dataset.variant=this.variant,this.dataset.size=this.size;const e='md'===this.size?'md-medium':'sm-medium',i='md'===this.size?'md':'sm';return t.html`
      ${this.icon?t.html`<wui-icon size=${i} name=${this.icon}></wui-icon>`:null}
      <wui-text
        display="inline"
        data-variant=${this.variant}
        variant=${e}
        color="inherit"
      >
        <slot></slot>
      </wui-text>
    `}};l.styles=[r.resetStyles,n.default],c([(0,e.property)()],l.prototype,"variant",void 0),c([(0,e.property)()],l.prototype,"size",void 0),c([(0,e.property)()],l.prototype,"icon",void 0),l=c([(0,o.customElement)('wui-tag')],l)},6323,[5531,5557,6290,6313,6279,6284,6324]);
__d(function(g,r,i,a,m,e,d){"use strict";Object.defineProperty(e,'__esModule',{value:!0}),Object.defineProperty(e,"default",{enumerable:!0,get:function(){return o}});var o=r(d[0]).css`
  :host {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: ${({spacing:o})=>o[1]};
    text-transform: uppercase;
  }

  :host([data-variant='accent']) {
    background-color: ${({tokens:o})=>o.core.foregroundAccent010};
    color: ${({tokens:o})=>o.core.textAccentPrimary};
  }

  :host([data-variant='info']) {
    background-color: ${({tokens:o})=>o.theme.foregroundSecondary};
    color: ${({tokens:o})=>o.theme.textSecondary};
  }

  :host([data-variant='success']) {
    background-color: ${({tokens:o})=>o.core.backgroundSuccess};
    color: ${({tokens:o})=>o.core.textSuccess};
  }

  :host([data-variant='warning']) {
    background-color: ${({tokens:o})=>o.core.backgroundWarning};
    color: ${({tokens:o})=>o.core.textWarning};
  }

  :host([data-variant='error']) {
    background-color: ${({tokens:o})=>o.core.backgroundError};
    color: ${({tokens:o})=>o.core.textError};
  }

  :host([data-variant='certified']) {
    background-color: ${({tokens:o})=>o.theme.foregroundSecondary};
    color: ${({tokens:o})=>o.theme.textSecondary};
  }

  :host([data-size='md']) {
    height: 30px;
    padding: 0 ${({spacing:o})=>o[2]};
    border-radius: ${({borderRadius:o})=>o[2]};
  }

  :host([data-size='sm']) {
    height: 20px;
    padding: 0 ${({spacing:o})=>o[1]};
    border-radius: ${({borderRadius:o})=>o[1]};
  }
`},6324,[6280]);
__d(function(g,r,i,a,m,e,d){"use strict";Object.defineProperty(e,'__esModule',{value:!0}),Object.defineProperty(e,"default",{enumerable:!0,get:function(){return o}});var o=r(d[0]).css`
  :host {
    width: 100%;
  }

  button {
    column-gap: ${({spacing:o})=>o[2]};
    padding: ${({spacing:o})=>o[3]};
    width: 100%;
    background-color: transparent;
    border-radius: ${({borderRadius:o})=>o[4]};
    color: ${({tokens:o})=>o.theme.textPrimary};
  }

  button > wui-wallet-image {
    background: ${({tokens:o})=>o.theme.foregroundSecondary};
  }

  button > wui-text:nth-child(2) {
    display: flex;
    flex: 1;
  }

  button:hover:enabled {
    background-color: ${({tokens:o})=>o.theme.foregroundPrimary};
  }

  button[data-all-wallets='true'] {
    background-color: ${({tokens:o})=>o.theme.foregroundPrimary};
  }

  button[data-all-wallets='true']:hover:enabled {
    background-color: ${({tokens:o})=>o.theme.foregroundSecondary};
  }

  button:focus-visible:enabled {
    background-color: ${({tokens:o})=>o.theme.foregroundPrimary};
    box-shadow: 0 0 0 4px ${({tokens:o})=>o.core.foregroundAccent020};
  }

  button:disabled {
    background-color: ${({tokens:o})=>o.theme.foregroundPrimary};
    opacity: 0.5;
    cursor: not-allowed;
  }

  button:disabled > wui-tag {
    background-color: ${({tokens:o})=>o.core.glass010};
    color: ${({tokens:o})=>o.theme.foregroundTertiary};
  }
`},6325,[6280]);
__d(function(g,_r,_i,a,m,_e,_d){"use strict";Object.defineProperty(_e,'__esModule',{value:!0}),Object.defineProperty(_e,"WuiLoadingSpinner",{enumerable:!0,get:function(){return l}});var e,t=_r(_d[0]),r=_r(_d[1]),o=_r(_d[2]),C=_r(_d[3]),n=_r(_d[4]),s=_r(_d[5]),i=(e=s)&&e.__esModule?e:{default:e},c=this&&this.__decorate||function(e,t,r,o){var C,n=arguments.length,s=n<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,r):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)s=Reflect.decorate(e,t,r,o);else for(var i=e.length-1;i>=0;i--)(C=e[i])&&(s=(n<3?C(s):n>3?C(t,r,s):C(t,r))||s);return n>3&&s&&Object.defineProperty(t,r,s),s};let l=class extends t.LitElement{constructor(){super(...arguments),this.color='primary',this.size='lg'}render(){const e={primary:o.vars.tokens.theme.textPrimary,secondary:o.vars.tokens.theme.textSecondary,tertiary:o.vars.tokens.theme.textTertiary,invert:o.vars.tokens.theme.textInvert,error:o.vars.tokens.core.textError,warning:o.vars.tokens.core.textWarning,'accent-primary':o.vars.tokens.core.textAccentPrimary};return this.style.cssText=`\n      --local-color: ${'inherit'===this.color?'inherit':e[this.color]};\n      `,this.dataset.size=this.size,t.html`<svg viewBox="0 0 16 17" fill="none">
      <path
        d="M8.75 2.65625V4.65625C8.75 4.85516 8.67098 5.04593 8.53033 5.18658C8.38968 5.32723 8.19891 5.40625 8 5.40625C7.80109 5.40625 7.61032 5.32723 7.46967 5.18658C7.32902 5.04593 7.25 4.85516 7.25 4.65625V2.65625C7.25 2.45734 7.32902 2.26657 7.46967 2.12592C7.61032 1.98527 7.80109 1.90625 8 1.90625C8.19891 1.90625 8.38968 1.98527 8.53033 2.12592C8.67098 2.26657 8.75 2.45734 8.75 2.65625ZM14 7.90625H12C11.8011 7.90625 11.6103 7.98527 11.4697 8.12592C11.329 8.26657 11.25 8.45734 11.25 8.65625C11.25 8.85516 11.329 9.04593 11.4697 9.18658C11.6103 9.32723 11.8011 9.40625 12 9.40625H14C14.1989 9.40625 14.3897 9.32723 14.5303 9.18658C14.671 9.04593 14.75 8.85516 14.75 8.65625C14.75 8.45734 14.671 8.26657 14.5303 8.12592C14.3897 7.98527 14.1989 7.90625 14 7.90625ZM11.3588 10.9544C11.289 10.8846 11.2062 10.8293 11.115 10.7915C11.0239 10.7538 10.9262 10.7343 10.8275 10.7343C10.7288 10.7343 10.6311 10.7538 10.54 10.7915C10.4488 10.8293 10.366 10.8846 10.2963 10.9544C10.2265 11.0241 10.1711 11.107 10.1334 11.1981C10.0956 11.2893 10.0762 11.387 10.0762 11.4856C10.0762 11.5843 10.0956 11.682 10.1334 11.7731C10.1711 11.8643 10.2265 11.9471 10.2963 12.0169L11.7106 13.4312C11.8515 13.5721 12.0426 13.6513 12.2419 13.6513C12.4411 13.6513 12.6322 13.5721 12.7731 13.4312C12.914 13.2904 12.9932 13.0993 12.9932 12.9C12.9932 12.7007 12.914 12.5096 12.7731 12.3687L11.3588 10.9544ZM8 11.9062C7.80109 11.9062 7.61032 11.9853 7.46967 12.1259C7.32902 12.2666 7.25 12.4573 7.25 12.6562V14.6562C7.25 14.8552 7.32902 15.0459 7.46967 15.1866C7.61032 15.3272 7.80109 15.4062 8 15.4062C8.19891 15.4062 8.38968 15.3272 8.53033 15.1866C8.67098 15.0459 8.75 14.8552 8.75 14.6562V12.6562C8.75 12.4573 8.67098 12.2666 8.53033 12.1259C8.38968 11.9853 8.19891 11.9062 8 11.9062ZM4.64125 10.9544L3.22688 12.3687C3.08598 12.5096 3.00682 12.7007 3.00682 12.9C3.00682 13.0993 3.08598 13.2904 3.22688 13.4312C3.36777 13.5721 3.55887 13.6513 3.75813 13.6513C3.95738 13.6513 4.14848 13.5721 4.28937 13.4312L5.70375 12.0169C5.84465 11.876 5.9238 11.6849 5.9238 11.4856C5.9238 11.2864 5.84465 11.0953 5.70375 10.9544C5.56285 10.8135 5.37176 10.7343 5.1725 10.7343C4.97324 10.7343 4.78215 10.8135 4.64125 10.9544ZM4.75 8.65625C4.75 8.45734 4.67098 8.26657 4.53033 8.12592C4.38968 7.98527 4.19891 7.90625 4 7.90625H2C1.80109 7.90625 1.61032 7.98527 1.46967 8.12592C1.32902 8.26657 1.25 8.45734 1.25 8.65625C1.25 8.85516 1.32902 9.04593 1.46967 9.18658C1.61032 9.32723 1.80109 9.40625 2 9.40625H4C4.19891 9.40625 4.38968 9.32723 4.53033 9.18658C4.67098 9.04593 4.75 8.85516 4.75 8.65625ZM4.2875 3.88313C4.1466 3.74223 3.95551 3.66307 3.75625 3.66307C3.55699 3.66307 3.3659 3.74223 3.225 3.88313C3.0841 4.02402 3.00495 4.21512 3.00495 4.41438C3.00495 4.61363 3.0841 4.80473 3.225 4.94562L4.64125 6.35813C4.78215 6.49902 4.97324 6.57818 5.1725 6.57818C5.37176 6.57818 5.56285 6.49902 5.70375 6.35813C5.84465 6.21723 5.9238 6.02613 5.9238 5.82688C5.9238 5.62762 5.84465 5.43652 5.70375 5.29563L4.2875 3.88313Z"
        fill="currentColor"
      />
    </svg>`}};l.styles=[C.resetStyles,i.default],c([(0,r.property)()],l.prototype,"color",void 0),c([(0,r.property)()],l.prototype,"size",void 0),l=c([(0,n.customElement)('wui-loading-spinner')],l)},6326,[5531,5557,6280,6279,6284,6327]);
__d(function(g,r,i,a,m,e,d){"use strict";Object.defineProperty(e,'__esModule',{value:!0}),Object.defineProperty(e,"default",{enumerable:!0,get:function(){return t}});var t=r(d[0]).css`
  :host {
    display: flex;
  }

  :host([data-size='sm']) > svg {
    width: 12px;
    height: 12px;
  }

  :host([data-size='md']) > svg {
    width: 16px;
    height: 16px;
  }

  :host([data-size='lg']) > svg {
    width: 24px;
    height: 24px;
  }

  :host([data-size='xl']) > svg {
    width: 32px;
    height: 32px;
  }

  svg {
    animation: rotate 1.4s linear infinite;
    color: var(--local-color);
  }

  :host([data-size='md']) > svg > circle {
    stroke-width: 6px;
  }

  :host([data-size='sm']) > svg > circle {
    stroke-width: 8px;
  }

  @keyframes rotate {
    100% {
      transform: rotate(360deg);
    }
  }
`},6327,[5531]);
__d(function(g,r,i,a,m,e,d){"use strict";Object.defineProperty(e,'__esModule',{value:!0});var t=r(d[0]);Object.keys(t).forEach(function(n){'default'===n||Object.prototype.hasOwnProperty.call(e,n)||Object.defineProperty(e,n,{enumerable:!0,get:function(){return t[n]}})})},6328,[6290]);
__d(function(g,r,i,a,m,e,d){"use strict";Object.defineProperty(e,'__esModule',{value:!0});var t=r(d[0]);Object.keys(t).forEach(function(n){'default'===n||Object.prototype.hasOwnProperty.call(e,n)||Object.defineProperty(e,n,{enumerable:!0,get:function(){return t[n]}})})},6329,[6330]);
__d(function(g,_r,_i,a,m,_e,_d){"use strict";Object.defineProperty(_e,'__esModule',{value:!0}),Object.defineProperty(_e,"WuiLink",{enumerable:!0,get:function(){return u}});var e=_r(_d[0]),t=_r(_d[1]);_r(_d[2]),_r(_d[3]);var i,o=_r(_d[4]),r=_r(_d[5]),n=_r(_d[6]),s=(i=n)&&i.__esModule?i:{default:i},c=this&&this.__decorate||function(e,t,i,o){var r,n=arguments.length,s=n<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)s=Reflect.decorate(e,t,i,o);else for(var c=e.length-1;c>=0;c--)(r=e[c])&&(s=(n<3?r(s):n>3?r(t,i,s):r(t,i))||s);return n>3&&s&&Object.defineProperty(t,i,s),s};const l={sm:'sm-medium',md:'md-medium'},d={accent:'accent-primary',secondary:'secondary'};let u=class extends e.LitElement{constructor(){super(...arguments),this.size='md',this.disabled=!1,this.variant='accent',this.icon=void 0}render(){return e.html`
      <button ?disabled=${this.disabled} data-variant=${this.variant}>
        <slot name="iconLeft"></slot>
        <wui-text
          color=${d[this.variant]}
          variant=${l[this.size]}
        >
          <slot></slot>
        </wui-text>
        ${this.iconTemplate()}
      </button>
    `}iconTemplate(){return this.icon?e.html`<wui-icon name=${this.icon} size="sm"></wui-icon>`:null}};u.styles=[o.resetStyles,o.elementStyles,s.default],c([(0,t.property)()],u.prototype,"size",void 0),c([(0,t.property)({type:Boolean})],u.prototype,"disabled",void 0),c([(0,t.property)()],u.prototype,"variant",void 0),c([(0,t.property)()],u.prototype,"icon",void 0),u=c([(0,r.customElement)('wui-link')],u)},6330,[5531,5557,6290,6313,6279,6284,6331]);
__d(function(g,r,i,a,m,e,d){"use strict";Object.defineProperty(e,'__esModule',{value:!0}),Object.defineProperty(e,"default",{enumerable:!0,get:function(){return o}});var o=r(d[0]).css`
  button {
    border: none;
    background: transparent;
    height: 20px;
    padding: ${({spacing:o})=>o[2]};
    column-gap: ${({spacing:o})=>o[1]};
    border-radius: ${({borderRadius:o})=>o[1]};
    padding: 0 ${({spacing:o})=>o[1]};
    border-radius: ${({spacing:o})=>o[1]};
  }

  /* -- Variants --------------------------------------------------------- */
  button[data-variant='accent'] {
    color: ${({tokens:o})=>o.core.textAccentPrimary};
  }

  button[data-variant='secondary'] {
    color: ${({tokens:o})=>o.theme.textSecondary};
  }

  /* -- Focus states --------------------------------------------------- */
  button:focus-visible:enabled {
    box-shadow: 0px 0px 0px 4px rgba(9, 136, 240, 0.2);
  }

  button[data-variant='accent']:focus-visible:enabled {
    background-color: ${({tokens:o})=>o.core.foregroundAccent010};
  }

  button[data-variant='secondary']:focus-visible:enabled {
    background-color: ${({tokens:o})=>o.theme.foregroundSecondary};
  }

  /* -- Hover & Active states ----------------------------------------------------------- */
  button[data-variant='accent']:hover:enabled {
    background-color: ${({tokens:o})=>o.core.foregroundAccent010};
  }

  button[data-variant='secondary']:hover:enabled {
    background-color: ${({tokens:o})=>o.theme.foregroundSecondary};
  }

  button[data-variant='accent']:focus-visible {
    background-color: ${({tokens:o})=>o.core.foregroundAccent010};
  }

  button[data-variant='secondary']:focus-visible {
    background-color: ${({tokens:o})=>o.theme.foregroundSecondary};
    box-shadow: 0px 0px 0px 4px rgba(9, 136, 240, 0.2);
  }

  button[disabled] {
    opacity: 0.5;
    cursor: not-allowed;
  }
`},6331,[6280]);
__d(function(g,r,i,a,m,e,d){"use strict";Object.defineProperty(e,'__esModule',{value:!0});var t=r(d[0]);Object.keys(t).forEach(function(n){'default'===n||Object.prototype.hasOwnProperty.call(e,n)||Object.defineProperty(e,n,{enumerable:!0,get:function(){return t[n]}})})},6332,[6313]);
__d(function(g,r,i,a,m,e,d){"use strict";Object.defineProperty(e,'__esModule',{value:!0});var t=r(d[0]);Object.keys(t).forEach(function(n){'default'===n||Object.prototype.hasOwnProperty.call(e,n)||Object.defineProperty(e,n,{enumerable:!0,get:function(){return t[n]}})})},6333,[6334]);
__d(function(g,_r,_i,a,m,_e,_d){"use strict";Object.defineProperty(_e,'__esModule',{value:!0}),Object.defineProperty(_e,"WuiUxByReown",{enumerable:!0,get:function(){return c}});var e=_r(_d[0]);_r(_d[1]),_r(_d[2]),_r(_d[3]);var t,r=_r(_d[4]),n=_r(_d[5]),i=_r(_d[6]),o=_r(_d[7]),l=(t=o)&&t.__esModule?t:{default:t},u=this&&this.__decorate||function(e,t,r,n){var i,o=arguments.length,l=o<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,r):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)l=Reflect.decorate(e,t,r,n);else for(var u=e.length-1;u>=0;u--)(i=e[u])&&(l=(o<3?i(l):o>3?i(t,r,l):i(t,r))||l);return o>3&&l&&Object.defineProperty(t,r,l),l};let c=class extends e.LitElement{render(){return e.html`
      <a
        data-testid="ux-branding-reown"
        href=${r.REOWN_URL}
        rel="noreferrer"
        target="_blank"
        style="text-decoration: none;"
      >
        <wui-flex
          justifyContent="center"
          alignItems="center"
          gap="1"
          .padding=${['01','0','3','0']}
        >
          <wui-text variant="sm-regular" color="inherit"> UX by </wui-text>
          <wui-icon name="reown" size="inherit" class="reown-logo"></wui-icon>
        </wui-flex>
      </a>
    `}};c.styles=[n.resetStyles,n.elementStyles,l.default],c=u([(0,i.customElement)('wui-ux-by-reown')],c)},6334,[5531,6290,6313,6286,6335,6279,6284,6336]);
__d(function(g,r,i,a,m,e,d){"use strict";Object.defineProperty(e,'__esModule',{value:!0}),Object.defineProperty(e,"REOWN_URL",{enumerable:!0,get:function(){return t}});const t='https://reown.com'},6335,[]);
__d(function(g,r,i,a,m,e,d){"use strict";Object.defineProperty(e,'__esModule',{value:!0}),Object.defineProperty(e,"default",{enumerable:!0,get:function(){return t}});var t=r(d[0]).css`
  .reown-logo {
    height: 24px;
  }

  a {
    text-decoration: none;
    cursor: pointer;
    color: ${({tokens:t})=>t.theme.textSecondary};
  }

  a:hover {
    opacity: 0.9;
  }
`},6336,[6280]);