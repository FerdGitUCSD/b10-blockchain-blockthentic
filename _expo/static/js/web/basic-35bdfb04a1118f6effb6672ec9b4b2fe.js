__d(function(g,r,i,a,m,e,d){"use strict";Object.defineProperty(e,'__esModule',{value:!0});var t=r(d[0]);Object.keys(t).forEach(function(n){'default'===n||Object.prototype.hasOwnProperty.call(e,n)||Object.defineProperty(e,n,{enumerable:!0,get:function(){return t[n]}})});var n=r(d[1]);Object.keys(n).forEach(function(t){'default'===t||Object.prototype.hasOwnProperty.call(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:function(){return n[t]}})});var c=r(d[2]);Object.keys(c).forEach(function(t){'default'===t||Object.prototype.hasOwnProperty.call(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:function(){return c[t]}})})},9012,[9015,9078,9105]);
__d(function(g,_r,_i,a,m,e,_d){"use strict";Object.defineProperty(e,'__esModule',{value:!0}),Object.defineProperty(e,"W3mConnectingWcBasicView",{enumerable:!0,get:function(){return r}});var t=_r(_d[0]),l=_r(_d[1]),n=_r(_d[2]),i=_r(_d[3]);_r(_d[4]),_r(_d[5]),_r(_d[6]),_r(_d[7]);var o=this&&this.__decorate||function(t,l,n,i){var o,r=arguments.length,c=r<3?l:null===i?i=Object.getOwnPropertyDescriptor(l,n):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)c=Reflect.decorate(t,l,n,i);else for(var s=t.length-1;s>=0;s--)(o=t[s])&&(c=(r<3?o(c):r>3?o(l,n,c):o(l,n))||c);return r>3&&c&&Object.defineProperty(l,n,c),c};let r=class extends t.LitElement{constructor(){super(...arguments),this.isMobile=n.CoreHelperUtil.isMobile()}render(){if(this.isMobile){const{featured:l,recommended:i}=n.ApiController.state,{customWallets:o}=n.OptionsController.state,r=n.StorageUtil.getRecentWallets(),c=l.length||i.length||o?.length||r.length;return t.html`<wui-flex
        flexDirection="column"
        gap="xs"
        .margin=${['3xs','s','s','s']}
      >
        ${c?t.html`<w3m-connector-list></w3m-connector-list>`:null}
        <w3m-all-wallets-widget></w3m-all-wallets-widget>
      </wui-flex>`}return t.html`<wui-flex flexDirection="column" .padding=${['0','0','l','0']}>
      <w3m-connecting-wc-view></w3m-connecting-wc-view>
      <wui-flex flexDirection="column" .padding=${['0','m','0','m']}>
        <w3m-all-wallets-widget></w3m-all-wallets-widget> </wui-flex
    ></wui-flex>`}};o([(0,l.state)()],r.prototype,"isMobile",void 0),r=o([(0,i.customElement)('w3m-connecting-wc-basic-view')],r)},9015,[4999,5775,7402,7695,7701,9016,9024,9035]);
__d(function(g,_r,_i,a,m,e,_d){"use strict";Object.defineProperty(e,'__esModule',{value:!0}),Object.defineProperty(e,"W3mAllWalletsWidget",{enumerable:!0,get:function(){return r}});var t=_r(_d[0]),l=_r(_d[1]),o=_r(_d[2]),n=_r(_d[3]),s=_r(_d[4]);_r(_d[5]);var i=this&&this.__decorate||function(t,l,o,n){var s,i=arguments.length,r=i<3?l:null===n?n=Object.getOwnPropertyDescriptor(l,o):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(t,l,o,n);else for(var c=t.length-1;c>=0;c--)(s=t[c])&&(r=(i<3?s(r):i>3?s(l,o,r):s(l,o))||r);return i>3&&r&&Object.defineProperty(l,o,r),r};let r=class extends t.LitElement{constructor(){super(),this.unsubscribe=[],this.tabIdx=void 0,this.connectors=n.ConnectorController.state.connectors,this.count=n.ApiController.state.count,this.filteredCount=n.ApiController.state.filteredWallets.length,this.isFetchingRecommendedWallets=n.ApiController.state.isFetchingRecommendedWallets,this.unsubscribe.push(n.ConnectorController.subscribeKey('connectors',t=>this.connectors=t),n.ApiController.subscribeKey('count',t=>this.count=t),n.ApiController.subscribeKey('filteredWallets',t=>this.filteredCount=t.length),n.ApiController.subscribeKey('isFetchingRecommendedWallets',t=>this.isFetchingRecommendedWallets=t))}disconnectedCallback(){this.unsubscribe.forEach(t=>t())}render(){const l=this.connectors.find(t=>'walletConnect'===t.id),{allWallets:s}=n.OptionsController.state;if(!l||'HIDE'===s)return null;if('ONLY_MOBILE'===s&&!n.CoreHelperUtil.isMobile())return null;const i=n.ApiController.state.featured.length,r=this.count+i,c=r<10?r:10*Math.floor(r/10),d=this.filteredCount>0?this.filteredCount:c;let u=`${d}`;return this.filteredCount>0?u=`${this.filteredCount}`:d<r&&(u=`${d}+`),t.html`
      <wui-list-wallet
        name="All Wallets"
        walletIcon="allWallets"
        showAllWallets
        @click=${this.onAllWallets.bind(this)}
        tagLabel=${u}
        tagVariant="shade"
        data-testid="all-wallets"
        tabIdx=${(0,o.ifDefined)(this.tabIdx)}
        .loading=${this.isFetchingRecommendedWallets}
        loadingSpinnerColor=${this.isFetchingRecommendedWallets?'fg-300':'accent-100'}
      ></wui-list-wallet>
    `}onAllWallets(){n.EventsController.sendEvent({type:'track',event:'CLICK_ALL_WALLETS'}),n.RouterController.push('AllWallets')}};i([(0,l.property)()],r.prototype,"tabIdx",void 0),i([(0,l.state)()],r.prototype,"connectors",void 0),i([(0,l.state)()],r.prototype,"count",void 0),i([(0,l.state)()],r.prototype,"filteredCount",void 0),i([(0,l.state)()],r.prototype,"isFetchingRecommendedWallets",void 0),r=i([(0,s.customElement)('w3m-all-wallets-widget')],r)},9016,[4999,5775,5786,7402,7695,9017]);
__d(function(g,r,i,a,m,e,d){"use strict";Object.defineProperty(e,'__esModule',{value:!0});var t=r(d[0]);Object.keys(t).forEach(function(n){'default'===n||Object.prototype.hasOwnProperty.call(e,n)||Object.defineProperty(e,n,{enumerable:!0,get:function(){return t[n]}})})},9017,[9018]);
__d(function(g,_r,_i,a,m,_e,_d){"use strict";Object.defineProperty(_e,'__esModule',{value:!0}),Object.defineProperty(_e,"WuiListWallet",{enumerable:!0,get:function(){return h}});var t=_r(_d[0]),e=_r(_d[1]),l=_r(_d[2]);_r(_d[3]),_r(_d[4]),_r(_d[5]);var i=_r(_d[6]),o=_r(_d[7]);_r(_d[8]),_r(_d[9]),_r(_d[10]);var r,s=_r(_d[11]),n=(r=s)&&r.__esModule?r:{default:r},p=this&&this.__decorate||function(t,e,l,i){var o,r=arguments.length,s=r<3?e:null===i?i=Object.getOwnPropertyDescriptor(e,l):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)s=Reflect.decorate(t,e,l,i);else for(var n=t.length-1;n>=0;n--)(o=t[n])&&(s=(r<3?o(s):r>3?o(e,l,s):o(e,l))||s);return r>3&&s&&Object.defineProperty(e,l,s),s};let h=class extends t.LitElement{constructor(){super(...arguments),this.walletImages=[],this.imageSrc='',this.name='',this.tabIdx=void 0,this.installed=!1,this.disabled=!1,this.showAllWallets=!1,this.loading=!1,this.loadingSpinnerColor='accent-100'}render(){return t.html`
      <button ?disabled=${this.disabled} tabindex=${(0,l.ifDefined)(this.tabIdx)}>
        ${this.templateAllWallets()} ${this.templateWalletImage()}
        <wui-text variant="paragraph-500" color="inherit">${this.name}</wui-text>
        ${this.templateStatus()}
      </button>
    `}templateAllWallets(){return this.showAllWallets&&this.imageSrc?t.html` <wui-all-wallets-image .imageeSrc=${this.imageSrc}> </wui-all-wallets-image> `:this.showAllWallets&&this.walletIcon?t.html` <wui-wallet-image .walletIcon=${this.walletIcon} size="sm"> </wui-wallet-image> `:null}templateWalletImage(){return!this.showAllWallets&&this.imageSrc?t.html`<wui-wallet-image
        size="sm"
        imageSrc=${this.imageSrc}
        name=${this.name}
        .installed=${this.installed}
      ></wui-wallet-image>`:this.showAllWallets||this.imageSrc?null:t.html`<wui-wallet-image size="sm" name=${this.name}></wui-wallet-image>`}templateStatus(){return this.loading?t.html`<wui-loading-spinner
        size="lg"
        color=${this.loadingSpinnerColor}
      ></wui-loading-spinner>`:this.tagLabel&&this.tagVariant?t.html`<wui-tag variant=${this.tagVariant}>${this.tagLabel}</wui-tag>`:this.icon?t.html`<wui-icon color="inherit" size="sm" name=${this.icon}></wui-icon>`:null}};h.styles=[i.resetStyles,i.elementStyles,n.default],p([(0,e.property)({type:Array})],h.prototype,"walletImages",void 0),p([(0,e.property)()],h.prototype,"imageSrc",void 0),p([(0,e.property)()],h.prototype,"name",void 0),p([(0,e.property)()],h.prototype,"tagLabel",void 0),p([(0,e.property)()],h.prototype,"tagVariant",void 0),p([(0,e.property)()],h.prototype,"icon",void 0),p([(0,e.property)()],h.prototype,"walletIcon",void 0),p([(0,e.property)()],h.prototype,"tabIdx",void 0),p([(0,e.property)({type:Boolean})],h.prototype,"installed",void 0),p([(0,e.property)({type:Boolean})],h.prototype,"disabled",void 0),p([(0,e.property)({type:Boolean})],h.prototype,"showAllWallets",void 0),p([(0,e.property)({type:Boolean})],h.prototype,"loading",void 0),p([(0,e.property)({type:String})],h.prototype,"loadingSpinnerColor",void 0),h=p([(0,o.customElement)('wui-list-wallet')],h)},9018,[4999,5775,5786,7704,7710,7712,7697,7700,9019,7716,9020,9023]);
__d(function(g,_r,_i,a,m,_e,_d){"use strict";Object.defineProperty(_e,'__esModule',{value:!0}),Object.defineProperty(_e,"WuiAllWalletsImage",{enumerable:!0,get:function(){return u}});var e=_r(_d[0]),t=_r(_d[1]),l=_r(_d[2]);_r(_d[3]);var i=_r(_d[4]),r=_r(_d[5]);_r(_d[6]),_r(_d[7]);var s,c=_r(_d[8]),n=(s=c)&&s.__esModule?s:{default:s},o=this&&this.__decorate||function(e,t,l,i){var r,s=arguments.length,c=s<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,l):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)c=Reflect.decorate(e,t,l,i);else for(var n=e.length-1;n>=0;n--)(r=e[n])&&(c=(s<3?r(c):s>3?r(t,l,c):r(t,l))||c);return s>3&&c&&Object.defineProperty(t,l,c),c};let u=class extends e.LitElement{constructor(){super(...arguments),this.walletImages=[]}render(){const t=this.walletImages.length<4;return e.html`${this.walletImages.slice(0,4).map(({src:t,walletName:i})=>e.html`
            <wui-wallet-image
              size="inherit"
              imageSrc=${t}
              name=${(0,l.ifDefined)(i)}
            ></wui-wallet-image>
          `)}
      ${t?[...Array(4-this.walletImages.length)].map(()=>e.html` <wui-wallet-image size="inherit" name=""></wui-wallet-image>`):null}
      <wui-flex>
        <wui-icon-box
          size="xxs"
          iconSize="xxs"
          iconcolor="success-100"
          backgroundcolor="success-100"
          icon="checkmark"
          background="opaque"
        ></wui-icon-box>
      </wui-flex>`}};u.styles=[i.resetStyles,n.default],o([(0,t.property)({type:Array})],u.prototype,"walletImages",void 0),u=o([(0,r.customElement)('wui-all-wallets-image')],u)},9019,[4999,5775,5786,7702,7697,7700,7712,9020,9022]);
__d(function(g,_r,_i,a,m,_e,_d){"use strict";Object.defineProperty(_e,'__esModule',{value:!0}),Object.defineProperty(_e,"WuiWalletImage",{enumerable:!0,get:function(){return c}});var e=_r(_d[0]),t=_r(_d[1]);_r(_d[2]),_r(_d[3]),_r(_d[4]);var i=_r(_d[5]),r=_r(_d[6]);_r(_d[7]);var l,o=_r(_d[8]),s=(l=o)&&l.__esModule?l:{default:l},n=this&&this.__decorate||function(e,t,i,r){var l,o=arguments.length,s=o<3?t:null===r?r=Object.getOwnPropertyDescriptor(t,i):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)s=Reflect.decorate(e,t,i,r);else for(var n=e.length-1;n>=0;n--)(l=e[n])&&(s=(o<3?l(s):o>3?l(t,i,s):l(t,i))||s);return o>3&&s&&Object.defineProperty(t,i,s),s};let c=class extends e.LitElement{constructor(){super(...arguments),this.size='md',this.name='',this.installed=!1,this.badgeSize='xs'}render(){let t='xxs';return t='lg'===this.size?'m':'md'===this.size?'xs':'xxs',this.style.cssText=`\n       --local-border-radius: var(--wui-border-radius-${t});\n       --local-size: var(--wui-wallet-image-size-${this.size});\n   `,this.walletIcon&&(this.dataset.walletIcon=this.walletIcon),e.html`
      <wui-flex justifyContent="center" alignItems="center"> ${this.templateVisual()} </wui-flex>
    `}templateVisual(){return this.imageSrc?e.html`<wui-image src=${this.imageSrc} alt=${this.name}></wui-image>`:this.walletIcon?e.html`<wui-icon
        data-parent-size="md"
        size="md"
        color="inherit"
        name=${this.walletIcon}
      ></wui-icon>`:e.html`<wui-icon
      data-parent-size=${this.size}
      size="inherit"
      color="inherit"
      name="walletPlaceholder"
    ></wui-icon>`}};c.styles=[i.elementStyles,i.resetStyles,s.default],n([(0,t.property)()],c.prototype,"size",void 0),n([(0,t.property)()],c.prototype,"name",void 0),n([(0,t.property)()],c.prototype,"imageSrc",void 0),n([(0,t.property)()],c.prototype,"walletIcon",void 0),n([(0,t.property)({type:Boolean})],c.prototype,"installed",void 0),n([(0,t.property)()],c.prototype,"badgeSize",void 0),c=n([(0,r.customElement)('wui-wallet-image')],c)},9020,[4999,5775,7704,7714,7702,7697,7700,7712,9021]);
__d(function(g,r,i,a,m,e,d){"use strict";Object.defineProperty(e,'__esModule',{value:!0}),Object.defineProperty(e,"default",{enumerable:!0,get:function(){return t}});var t=r(d[0]).css`
  :host {
    position: relative;
    background-color: var(--wui-color-gray-glass-002);
    display: flex;
    justify-content: center;
    align-items: center;
    width: var(--local-size);
    height: var(--local-size);
    border-radius: inherit;
    border-radius: var(--local-border-radius);
  }

  :host > wui-flex {
    overflow: hidden;
    border-radius: inherit;
    border-radius: var(--local-border-radius);
  }

  :host::after {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    border-radius: inherit;
    border: 1px solid var(--wui-color-gray-glass-010);
    pointer-events: none;
  }

  :host([name='Extension'])::after {
    border: 1px solid var(--wui-color-accent-glass-010);
  }

  :host([data-wallet-icon='allWallets']) {
    background-color: var(--wui-all-wallets-bg-100);
  }

  :host([data-wallet-icon='allWallets'])::after {
    border: 1px solid var(--wui-color-accent-glass-010);
  }

  wui-icon[data-parent-size='inherit'] {
    width: 75%;
    height: 75%;
    align-items: center;
  }

  wui-icon[data-parent-size='sm'] {
    width: 18px;
    height: 18px;
  }

  wui-icon[data-parent-size='md'] {
    width: 24px;
    height: 24px;
  }

  wui-icon[data-parent-size='lg'] {
    width: 42px;
    height: 42px;
  }

  wui-icon[data-parent-size='full'] {
    width: 100%;
    height: 100%;
  }

  :host > wui-icon-box {
    position: absolute;
    overflow: hidden;
    right: -1px;
    bottom: -2px;
    z-index: 1;
    border: 2px solid var(--wui-color-bg-150, #1e1f1f);
    padding: 1px;
  }
`},9021,[4999]);
__d(function(g,r,i,a,m,e,d){"use strict";Object.defineProperty(e,'__esModule',{value:!0}),Object.defineProperty(e,"default",{enumerable:!0,get:function(){return t}});var t=r(d[0]).css`
  :host {
    position: relative;
    border-radius: var(--wui-border-radius-xxs);
    width: 40px;
    height: 40px;
    overflow: hidden;
    background: var(--wui-color-gray-glass-002);
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    gap: var(--wui-spacing-4xs);
    padding: 3.75px !important;
  }

  :host::after {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    border-radius: inherit;
    border: 1px solid var(--wui-color-gray-glass-010);
    pointer-events: none;
  }

  :host > wui-wallet-image {
    width: 14px;
    height: 14px;
    border-radius: var(--wui-border-radius-5xs);
  }

  :host > wui-flex {
    padding: 2px;
    position: fixed;
    overflow: hidden;
    left: 34px;
    bottom: 8px;
    background: var(--dark-background-150, #1e1f1f);
    border-radius: 50%;
    z-index: 2;
    display: flex;
  }
`},9022,[4999]);
__d(function(g,r,i,a,m,e,d){"use strict";Object.defineProperty(e,'__esModule',{value:!0}),Object.defineProperty(e,"default",{enumerable:!0,get:function(){return o}});var o=r(d[0]).css`
  button {
    column-gap: var(--wui-spacing-s);
    padding: 7px var(--wui-spacing-l) 7px var(--wui-spacing-xs);
    width: 100%;
    background-color: var(--wui-color-gray-glass-002);
    border-radius: var(--wui-border-radius-xs);
    color: var(--wui-color-fg-100);
  }

  button > wui-text:nth-child(2) {
    display: flex;
    flex: 1;
  }

  button:disabled {
    background-color: var(--wui-color-gray-glass-015);
    color: var(--wui-color-gray-glass-015);
  }

  button:disabled > wui-tag {
    background-color: var(--wui-color-gray-glass-010);
    color: var(--wui-color-fg-300);
  }

  wui-icon {
    color: var(--wui-color-fg-200) !important;
  }
`},9023,[4999]);
__d(function(g,_r,_i,a,m,_e,_d){"use strict";Object.defineProperty(_e,'__esModule',{value:!0}),Object.defineProperty(_e,"W3mConnectorList",{enumerable:!0,get:function(){return u}});var e=_r(_d[0]),t=_r(_d[1]),n=_r(_d[2]),c=_r(_d[3]),o=_r(_d[4]);_r(_d[5]),_r(_d[6]),_r(_d[7]),_r(_d[8]),_r(_d[9]),_r(_d[10]),_r(_d[11]),_r(_d[12]),_r(_d[13]),_r(_d[14]);var r,i=_r(_d[15]),d=_r(_d[16]),s=(r=d)&&r.__esModule?r:{default:r},l=this&&this.__decorate||function(e,t,n,c){var o,r=arguments.length,i=r<3?t:null===c?c=Object.getOwnPropertyDescriptor(t,n):c;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)i=Reflect.decorate(e,t,n,c);else for(var d=e.length-1;d>=0;d--)(o=e[d])&&(i=(r<3?o(i):r>3?o(t,n,i):o(t,n))||i);return r>3&&i&&Object.defineProperty(t,n,i),i};let u=class extends e.LitElement{constructor(){super(),this.unsubscribe=[],this.tabIdx=void 0,this.connectors=c.ConnectorController.state.connectors,this.recommended=c.ApiController.state.recommended,this.featured=c.ApiController.state.featured,this.unsubscribe.push(c.ConnectorController.subscribeKey('connectors',e=>this.connectors=e),c.ApiController.subscribeKey('recommended',e=>this.recommended=e),c.ApiController.subscribeKey('featured',e=>this.featured=e))}disconnectedCallback(){this.unsubscribe.forEach(e=>e())}render(){return e.html`
      <wui-flex flexDirection="column" gap="xs"> ${this.connectorListTemplate()} </wui-flex>
    `}connectorListTemplate(){const{custom:t,recent:c,announced:o,injected:r,multiChain:d,recommended:s,featured:l,external:u}=i.ConnectorUtil.getConnectorsByType(this.connectors,this.recommended,this.featured);return i.ConnectorUtil.getConnectorTypeOrder({custom:t,recent:c,announced:o,injected:r,multiChain:d,recommended:s,featured:l,external:u}).map(t=>{switch(t){case'injected':return e.html`
            ${d.length?e.html`<w3m-connect-multi-chain-widget
                  tabIdx=${(0,n.ifDefined)(this.tabIdx)}
                ></w3m-connect-multi-chain-widget>`:null}
            ${o.length?e.html`<w3m-connect-announced-widget
                  tabIdx=${(0,n.ifDefined)(this.tabIdx)}
                ></w3m-connect-announced-widget>`:null}
            ${r.length?e.html`<w3m-connect-injected-widget
                  .connectors=${r}
                  tabIdx=${(0,n.ifDefined)(this.tabIdx)}
                ></w3m-connect-injected-widget>`:null}
          `;case'walletConnect':return e.html`<w3m-connect-walletconnect-widget
            tabIdx=${(0,n.ifDefined)(this.tabIdx)}
          ></w3m-connect-walletconnect-widget>`;case'recent':return e.html`<w3m-connect-recent-widget
            tabIdx=${(0,n.ifDefined)(this.tabIdx)}
          ></w3m-connect-recent-widget>`;case'featured':return e.html`<w3m-connect-featured-widget
            .wallets=${l}
            tabIdx=${(0,n.ifDefined)(this.tabIdx)}
          ></w3m-connect-featured-widget>`;case'custom':return e.html`<w3m-connect-custom-widget
            tabIdx=${(0,n.ifDefined)(this.tabIdx)}
          ></w3m-connect-custom-widget>`;case'external':return e.html`<w3m-connect-external-widget
            tabIdx=${(0,n.ifDefined)(this.tabIdx)}
          ></w3m-connect-external-widget>`;case'recommended':return e.html`<w3m-connect-recommended-widget
            .wallets=${s}
            tabIdx=${(0,n.ifDefined)(this.tabIdx)}
          ></w3m-connect-recommended-widget>`;default:return console.warn(`Unknown connector type: ${t}`),null}})}};u.styles=s.default,l([(0,t.property)()],u.prototype,"tabIdx",void 0),l([(0,t.state)()],u.prototype,"connectors",void 0),l([(0,t.state)()],u.prototype,"recommended",void 0),l([(0,t.state)()],u.prototype,"featured",void 0),u=l([(0,o.customElement)('w3m-connector-list')],u)},9024,[4999,5775,5786,7402,7695,7701,9025,9026,9027,9028,9029,9030,9031,9032,9033,7683,9034]);
__d(function(g,_r,_i,a,m,e,_d){"use strict";Object.defineProperty(e,'__esModule',{value:!0}),Object.defineProperty(e,"W3mConnectAnnouncedWidget",{enumerable:!0,get:function(){return i}});var t=_r(_d[0]),n=_r(_d[1]),o=_r(_d[2]),r=_r(_d[3]),c=_r(_d[4]);_r(_d[5]),_r(_d[6]);var l=_r(_d[7]),s=this&&this.__decorate||function(t,n,o,r){var c,l=arguments.length,s=l<3?n:null===r?r=Object.getOwnPropertyDescriptor(n,o):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)s=Reflect.decorate(t,n,o,r);else for(var i=t.length-1;i>=0;i--)(c=t[i])&&(s=(l<3?c(s):l>3?c(n,o,s):c(n,o))||s);return l>3&&s&&Object.defineProperty(n,o,s),s};let i=class extends t.LitElement{constructor(){super(),this.unsubscribe=[],this.tabIdx=void 0,this.connectors=r.ConnectorController.state.connectors,this.unsubscribe.push(r.ConnectorController.subscribeKey('connectors',t=>this.connectors=t))}disconnectedCallback(){this.unsubscribe.forEach(t=>t())}render(){const n=this.connectors.filter(t=>'ANNOUNCED'===t.type);return n?.length?t.html`
      <wui-flex flexDirection="column" gap="xs">
        ${n.filter(l.ConnectorUtil.showConnector).map(n=>t.html`
              <wui-list-wallet
                imageSrc=${(0,o.ifDefined)(r.AssetUtil.getConnectorImage(n))}
                name=${n.name??'Unknown'}
                @click=${()=>this.onConnector(n)}
                tagVariant="success"
                tagLabel="installed"
                data-testid=${`wallet-selector-${n.id}`}
                .installed=${!0}
                tabIdx=${(0,o.ifDefined)(this.tabIdx)}
              >
              </wui-list-wallet>
            `)}
      </wui-flex>
    `:(this.style.cssText="display: none",null)}onConnector(t){'walletConnect'===t.id?r.CoreHelperUtil.isMobile()?r.RouterController.push('AllWallets'):r.RouterController.push('ConnectingWalletConnect'):r.RouterController.push('ConnectingExternal',{connector:t})}};s([(0,n.property)()],i.prototype,"tabIdx",void 0),s([(0,n.state)()],i.prototype,"connectors",void 0),i=s([(0,c.customElement)('w3m-connect-announced-widget')],i)},9025,[4999,5775,5786,7402,7695,7701,9017,7683]);
__d(function(g,_r,_i,a,m,e,_d){"use strict";Object.defineProperty(e,'__esModule',{value:!0}),Object.defineProperty(e,"W3mConnectCustomWidget",{enumerable:!0,get:function(){return r}});var t=_r(_d[0]),n=_r(_d[1]),o=_r(_d[2]),i=_r(_d[3]),l=_r(_d[4]);_r(_d[5]),_r(_d[6]);var s=this&&this.__decorate||function(t,n,o,i){var l,s=arguments.length,r=s<3?n:null===i?i=Object.getOwnPropertyDescriptor(n,o):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(t,n,o,i);else for(var c=t.length-1;c>=0;c--)(l=t[c])&&(r=(s<3?l(r):s>3?l(n,o,r):l(n,o))||r);return s>3&&r&&Object.defineProperty(n,o,r),r};let r=class extends t.LitElement{constructor(){super(),this.unsubscribe=[],this.tabIdx=void 0,this.connectors=i.ConnectorController.state.connectors,this.loading=!1,this.unsubscribe.push(i.ConnectorController.subscribeKey('connectors',t=>this.connectors=t)),i.CoreHelperUtil.isTelegram()&&i.CoreHelperUtil.isIos()&&(this.loading=!i.ConnectionController.state.wcUri,this.unsubscribe.push(i.ConnectionController.subscribeKey('wcUri',t=>this.loading=!t)))}disconnectedCallback(){this.unsubscribe.forEach(t=>t())}render(){const{customWallets:n}=i.OptionsController.state;if(!n?.length)return this.style.cssText="display: none",null;const l=this.filterOutDuplicateWallets(n);return t.html`<wui-flex flexDirection="column" gap="xs">
      ${l.map(n=>t.html`
          <wui-list-wallet
            imageSrc=${(0,o.ifDefined)(i.AssetUtil.getWalletImage(n))}
            name=${n.name??'Unknown'}
            @click=${()=>this.onConnectWallet(n)}
            data-testid=${`wallet-selector-${n.id}`}
            tabIdx=${(0,o.ifDefined)(this.tabIdx)}
            ?loading=${this.loading}
          >
          </wui-list-wallet>
        `)}
    </wui-flex>`}filterOutDuplicateWallets(t){const n=i.StorageUtil.getRecentWallets(),o=this.connectors.map(t=>t.info?.rdns).filter(Boolean),l=n.map(t=>t.rdns).filter(Boolean),s=o.concat(l);if(s.includes('io.metamask.mobile')&&i.CoreHelperUtil.isMobile()){const t=s.indexOf('io.metamask.mobile');s[t]='io.metamask'}return t.filter(t=>!s.includes(String(t?.rdns)))}onConnectWallet(t){this.loading||i.RouterController.push('ConnectingWalletConnect',{wallet:t})}};s([(0,n.property)()],r.prototype,"tabIdx",void 0),s([(0,n.state)()],r.prototype,"connectors",void 0),s([(0,n.state)()],r.prototype,"loading",void 0),r=s([(0,l.customElement)('w3m-connect-custom-widget')],r)},9026,[4999,5775,5786,7402,7695,7701,9017]);
__d(function(g,_r,_i,a,m,e,_d){"use strict";Object.defineProperty(e,'__esModule',{value:!0}),Object.defineProperty(e,"W3mConnectExternalWidget",{enumerable:!0,get:function(){return u}});var t=_r(_d[0]),n=_r(_d[1]),o=_r(_d[2]),r=_r(_d[3]),c=_r(_d[4]),i=_r(_d[5]);_r(_d[6]),_r(_d[7]);var s=_r(_d[8]),l=this&&this.__decorate||function(t,n,o,r){var c,i=arguments.length,s=i<3?n:null===r?r=Object.getOwnPropertyDescriptor(n,o):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)s=Reflect.decorate(t,n,o,r);else for(var l=t.length-1;l>=0;l--)(c=t[l])&&(s=(i<3?c(s):i>3?c(n,o,s):c(n,o))||s);return i>3&&s&&Object.defineProperty(n,o,s),s};let u=class extends t.LitElement{constructor(){super(),this.unsubscribe=[],this.tabIdx=void 0,this.connectors=c.ConnectorController.state.connectors,this.unsubscribe.push(c.ConnectorController.subscribeKey('connectors',t=>this.connectors=t))}disconnectedCallback(){this.unsubscribe.forEach(t=>t())}render(){const n=this.connectors.filter(t=>'EXTERNAL'===t.type).filter(s.ConnectorUtil.showConnector).filter(t=>t.id!==r.ConstantsUtil.CONNECTOR_ID.COINBASE_SDK);return n?.length?t.html`
      <wui-flex flexDirection="column" gap="xs">
        ${n.map(n=>t.html`
            <wui-list-wallet
              imageSrc=${(0,o.ifDefined)(c.AssetUtil.getConnectorImage(n))}
              .installed=${!0}
              name=${n.name??'Unknown'}
              data-testid=${`wallet-selector-external-${n.id}`}
              @click=${()=>this.onConnector(n)}
              tabIdx=${(0,o.ifDefined)(this.tabIdx)}
            >
            </wui-list-wallet>
          `)}
      </wui-flex>
    `:(this.style.cssText="display: none",null)}onConnector(t){c.RouterController.push('ConnectingExternal',{connector:t})}};l([(0,n.property)()],u.prototype,"tabIdx",void 0),l([(0,n.state)()],u.prototype,"connectors",void 0),u=l([(0,i.customElement)('w3m-connect-external-widget')],u)},9027,[4999,5775,5786,7382,7402,7695,7701,9017,7683]);
__d(function(g,_r,_i,a,m,e,_d){"use strict";Object.defineProperty(e,'__esModule',{value:!0}),Object.defineProperty(e,"W3mConnectFeaturedWidget",{enumerable:!0,get:function(){return c}});var t=_r(_d[0]),l=_r(_d[1]),n=_r(_d[2]),r=_r(_d[3]),o=_r(_d[4]);_r(_d[5]),_r(_d[6]);var i=this&&this.__decorate||function(t,l,n,r){var o,i=arguments.length,c=i<3?l:null===r?r=Object.getOwnPropertyDescriptor(l,n):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)c=Reflect.decorate(t,l,n,r);else for(var s=t.length-1;s>=0;s--)(o=t[s])&&(c=(i<3?o(c):i>3?o(l,n,c):o(l,n))||c);return i>3&&c&&Object.defineProperty(l,n,c),c};let c=class extends t.LitElement{constructor(){super(...arguments),this.tabIdx=void 0,this.wallets=[]}render(){return this.wallets.length?t.html`
      <wui-flex flexDirection="column" gap="xs">
        ${this.wallets.map(l=>t.html`
            <wui-list-wallet
              data-testid=${`wallet-selector-featured-${l.id}`}
              imageSrc=${(0,n.ifDefined)(r.AssetUtil.getWalletImage(l))}
              name=${l.name??'Unknown'}
              @click=${()=>this.onConnectWallet(l)}
              tabIdx=${(0,n.ifDefined)(this.tabIdx)}
            >
            </wui-list-wallet>
          `)}
      </wui-flex>
    `:(this.style.cssText="display: none",null)}onConnectWallet(t){r.ConnectorController.selectWalletConnector(t)}};i([(0,l.property)()],c.prototype,"tabIdx",void 0),i([(0,l.property)()],c.prototype,"wallets",void 0),c=i([(0,o.customElement)('w3m-connect-featured-widget')],c)},9028,[4999,5775,5786,7402,7695,7701,9017]);
__d(function(g,_r,_i,a,m,e,_d){"use strict";Object.defineProperty(e,'__esModule',{value:!0}),Object.defineProperty(e,"W3mConnectInjectedWidget",{enumerable:!0,get:function(){return s}});var t=_r(_d[0]),n=_r(_d[1]),o=_r(_d[2]),r=_r(_d[3]),c=_r(_d[4]);_r(_d[5]),_r(_d[6]);var i=_r(_d[7]),l=this&&this.__decorate||function(t,n,o,r){var c,i=arguments.length,l=i<3?n:null===r?r=Object.getOwnPropertyDescriptor(n,o):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)l=Reflect.decorate(t,n,o,r);else for(var s=t.length-1;s>=0;s--)(c=t[s])&&(l=(i<3?c(l):i>3?c(n,o,l):c(n,o))||l);return i>3&&l&&Object.defineProperty(n,o,l),l};let s=class extends t.LitElement{constructor(){super(...arguments),this.tabIdx=void 0,this.connectors=[]}render(){const n=this.connectors.filter(i.ConnectorUtil.showConnector);return 0===n.length?(this.style.cssText="display: none",null):t.html`
      <wui-flex flexDirection="column" gap="xs">
        ${n.map(n=>t.html`
            <wui-list-wallet
              imageSrc=${(0,o.ifDefined)(r.AssetUtil.getConnectorImage(n))}
              .installed=${!0}
              name=${n.name??'Unknown'}
              tagVariant="success"
              tagLabel="installed"
              data-testid=${`wallet-selector-${n.id}`}
              @click=${()=>this.onConnector(n)}
              tabIdx=${(0,o.ifDefined)(this.tabIdx)}
            >
            </wui-list-wallet>
          `)}
      </wui-flex>
    `}onConnector(t){r.ConnectorController.setActiveConnector(t),r.RouterController.push('ConnectingExternal',{connector:t})}};l([(0,n.property)()],s.prototype,"tabIdx",void 0),l([(0,n.property)()],s.prototype,"connectors",void 0),s=l([(0,c.customElement)('w3m-connect-injected-widget')],s)},9029,[4999,5775,5786,7402,7695,7701,9017,7683]);
__d(function(g,_r,_i,a,m,e,_d){"use strict";Object.defineProperty(e,'__esModule',{value:!0}),Object.defineProperty(e,"W3mConnectMultiChainWidget",{enumerable:!0,get:function(){return l}});var t=_r(_d[0]),n=_r(_d[1]),o=_r(_d[2]),r=_r(_d[3]),c=_r(_d[4]);_r(_d[5]),_r(_d[6]);var i=this&&this.__decorate||function(t,n,o,r){var c,i=arguments.length,l=i<3?n:null===r?r=Object.getOwnPropertyDescriptor(n,o):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)l=Reflect.decorate(t,n,o,r);else for(var s=t.length-1;s>=0;s--)(c=t[s])&&(l=(i<3?c(l):i>3?c(n,o,l):c(n,o))||l);return i>3&&l&&Object.defineProperty(n,o,l),l};let l=class extends t.LitElement{constructor(){super(),this.unsubscribe=[],this.tabIdx=void 0,this.connectors=r.ConnectorController.state.connectors,this.unsubscribe.push(r.ConnectorController.subscribeKey('connectors',t=>this.connectors=t))}disconnectedCallback(){this.unsubscribe.forEach(t=>t())}render(){const n=this.connectors.filter(t=>'MULTI_CHAIN'===t.type&&'WalletConnect'!==t.name);return n?.length?t.html`
      <wui-flex flexDirection="column" gap="xs">
        ${n.map(n=>t.html`
            <wui-list-wallet
              imageSrc=${(0,o.ifDefined)(r.AssetUtil.getConnectorImage(n))}
              .installed=${!0}
              name=${n.name??'Unknown'}
              tagVariant="shade"
              tagLabel="multichain"
              data-testid=${`wallet-selector-${n.id}`}
              @click=${()=>this.onConnector(n)}
              tabIdx=${(0,o.ifDefined)(this.tabIdx)}
            >
            </wui-list-wallet>
          `)}
      </wui-flex>
    `:(this.style.cssText="display: none",null)}onConnector(t){r.ConnectorController.setActiveConnector(t),r.RouterController.push('ConnectingMultiChain')}};i([(0,n.property)()],l.prototype,"tabIdx",void 0),i([(0,n.state)()],l.prototype,"connectors",void 0),l=i([(0,c.customElement)('w3m-connect-multi-chain-widget')],l)},9030,[4999,5775,5786,7402,7695,7701,9017]);
__d(function(g,_r,_i,a,m,e,_d){"use strict";Object.defineProperty(e,'__esModule',{value:!0}),Object.defineProperty(e,"W3mConnectRecentWidget",{enumerable:!0,get:function(){return c}});var t=_r(_d[0]),n=_r(_d[1]),o=_r(_d[2]),i=_r(_d[3]),r=_r(_d[4]);_r(_d[5]),_r(_d[6]);var l=_r(_d[7]),s=this&&this.__decorate||function(t,n,o,i){var r,l=arguments.length,s=l<3?n:null===i?i=Object.getOwnPropertyDescriptor(n,o):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)s=Reflect.decorate(t,n,o,i);else for(var c=t.length-1;c>=0;c--)(r=t[c])&&(s=(l<3?r(s):l>3?r(n,o,s):r(n,o))||s);return l>3&&s&&Object.defineProperty(n,o,s),s};let c=class extends t.LitElement{constructor(){super(),this.unsubscribe=[],this.tabIdx=void 0,this.connectors=i.ConnectorController.state.connectors,this.loading=!1,this.unsubscribe.push(i.ConnectorController.subscribeKey('connectors',t=>this.connectors=t)),i.CoreHelperUtil.isTelegram()&&i.CoreHelperUtil.isIos()&&(this.loading=!i.ConnectionController.state.wcUri,this.unsubscribe.push(i.ConnectionController.subscribeKey('wcUri',t=>this.loading=!t)))}render(){const n=i.StorageUtil.getRecentWallets().filter(t=>!l.WalletUtil.isExcluded(t)).filter(t=>!this.hasWalletConnector(t)).filter(t=>this.isWalletCompatibleWithCurrentChain(t));return n.length?t.html`
      <wui-flex flexDirection="column" gap="xs">
        ${n.map(n=>t.html`
            <wui-list-wallet
              imageSrc=${(0,o.ifDefined)(i.AssetUtil.getWalletImage(n))}
              name=${n.name??'Unknown'}
              @click=${()=>this.onConnectWallet(n)}
              tagLabel="recent"
              tagVariant="shade"
              tabIdx=${(0,o.ifDefined)(this.tabIdx)}
              ?loading=${this.loading}
            >
            </wui-list-wallet>
          `)}
      </wui-flex>
    `:(this.style.cssText="display: none",null)}onConnectWallet(t){this.loading||i.ConnectorController.selectWalletConnector(t)}hasWalletConnector(t){return this.connectors.some(n=>n.id===t.id||n.name===t.name)}isWalletCompatibleWithCurrentChain(t){const n=i.ChainController.state.activeChain;return!n||!t.chains||t.chains.some(t=>{const o=t.split(':')[0];return n===o})}};s([(0,n.property)()],c.prototype,"tabIdx",void 0),s([(0,n.state)()],c.prototype,"connectors",void 0),s([(0,n.state)()],c.prototype,"loading",void 0),c=s([(0,r.customElement)('w3m-connect-recent-widget')],c)},9031,[4999,5775,5786,7402,7695,7701,9017,7693]);
__d(function(g,_r,_i,a,m,e,_d){"use strict";Object.defineProperty(e,'__esModule',{value:!0}),Object.defineProperty(e,"W3mConnectRecommendedWidget",{enumerable:!0,get:function(){return c}});var t=_r(_d[0]),n=_r(_d[1]),l=_r(_d[2]),o=_r(_d[3]),r=_r(_d[4]);_r(_d[5]),_r(_d[6]);var i=_r(_d[7]),s=this&&this.__decorate||function(t,n,l,o){var r,i=arguments.length,s=i<3?n:null===o?o=Object.getOwnPropertyDescriptor(n,l):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)s=Reflect.decorate(t,n,l,o);else for(var c=t.length-1;c>=0;c--)(r=t[c])&&(s=(i<3?r(s):i>3?r(n,l,s):r(n,l))||s);return i>3&&s&&Object.defineProperty(n,l,s),s};let c=class extends t.LitElement{constructor(){super(),this.unsubscribe=[],this.tabIdx=void 0,this.wallets=[],this.loading=!1,o.CoreHelperUtil.isTelegram()&&o.CoreHelperUtil.isIos()&&(this.loading=!o.ConnectionController.state.wcUri,this.unsubscribe.push(o.ConnectionController.subscribeKey('wcUri',t=>this.loading=!t)))}render(){const{connectors:n}=o.ConnectorController.state,{customWallets:r,featuredWalletIds:s}=o.OptionsController.state,c=o.StorageUtil.getRecentWallets(),d=n.find(t=>'walletConnect'===t.id),u=n.filter(t=>'INJECTED'===t.type||'ANNOUNCED'===t.type||'MULTI_CHAIN'===t.type).filter(t=>'Browser Wallet'!==t.name);if(!d)return null;if(s||r||!this.wallets.length)return this.style.cssText="display: none",null;const p=u.length+c.length,f=Math.max(0,2-p),h=i.WalletUtil.filterOutDuplicateWallets(this.wallets).slice(0,f);return h.length?t.html`
      <wui-flex flexDirection="column" gap="xs">
        ${h.map(n=>t.html`
            <wui-list-wallet
              imageSrc=${(0,l.ifDefined)(o.AssetUtil.getWalletImage(n))}
              name=${n?.name??'Unknown'}
              @click=${()=>this.onConnectWallet(n)}
              tabIdx=${(0,l.ifDefined)(this.tabIdx)}
              ?loading=${this.loading}
            >
            </wui-list-wallet>
          `)}
      </wui-flex>
    `:(this.style.cssText="display: none",null)}onConnectWallet(t){if(this.loading)return;const n=o.ConnectorController.getConnector(t.id,t.rdns);n?o.RouterController.push('ConnectingExternal',{connector:n}):o.RouterController.push('ConnectingWalletConnect',{wallet:t})}};s([(0,n.property)()],c.prototype,"tabIdx",void 0),s([(0,n.property)()],c.prototype,"wallets",void 0),s([(0,n.state)()],c.prototype,"loading",void 0),c=s([(0,r.customElement)('w3m-connect-recommended-widget')],c)},9032,[4999,5775,5786,7402,7695,7701,9017,7693]);
__d(function(g,_r,_i,a,m,e,_d){"use strict";Object.defineProperty(e,'__esModule',{value:!0}),Object.defineProperty(e,"W3mConnectWalletConnectWidget",{enumerable:!0,get:function(){return i}});var t=_r(_d[0]),n=_r(_d[1]),o=_r(_d[2]),r=_r(_d[3]),c=_r(_d[4]);_r(_d[5]);var s=this&&this.__decorate||function(t,n,o,r){var c,s=arguments.length,i=s<3?n:null===r?r=Object.getOwnPropertyDescriptor(n,o):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)i=Reflect.decorate(t,n,o,r);else for(var l=t.length-1;l>=0;l--)(c=t[l])&&(i=(s<3?c(i):s>3?c(n,o,i):c(n,o))||i);return s>3&&i&&Object.defineProperty(n,o,i),i};let i=class extends t.LitElement{constructor(){super(),this.unsubscribe=[],this.tabIdx=void 0,this.connectors=r.ConnectorController.state.connectors,this.connectorImages=r.AssetController.state.connectorImages,this.unsubscribe.push(r.ConnectorController.subscribeKey('connectors',t=>this.connectors=t),r.AssetController.subscribeKey('connectorImages',t=>this.connectorImages=t))}disconnectedCallback(){this.unsubscribe.forEach(t=>t())}render(){if(r.CoreHelperUtil.isMobile())return this.style.cssText="display: none",null;const n=this.connectors.find(t=>'walletConnect'===t.id);if(!n)return this.style.cssText="display: none",null;const c=n.imageUrl||this.connectorImages[n?.imageId??''];return t.html`
      <wui-list-wallet
        imageSrc=${(0,o.ifDefined)(c)}
        name=${n.name??'Unknown'}
        @click=${()=>this.onConnector(n)}
        tagLabel="qr code"
        tagVariant="main"
        tabIdx=${(0,o.ifDefined)(this.tabIdx)}
        data-testid="wallet-selector-walletconnect"
      >
      </wui-list-wallet>
    `}onConnector(t){r.ConnectorController.setActiveConnector(t),r.RouterController.push('ConnectingWalletConnect')}};s([(0,n.property)()],i.prototype,"tabIdx",void 0),s([(0,n.state)()],i.prototype,"connectors",void 0),s([(0,n.state)()],i.prototype,"connectorImages",void 0),i=s([(0,c.customElement)('w3m-connect-walletconnect-widget')],i)},9033,[4999,5775,5786,7402,7695,9017]);
__d(function(g,r,i,a,m,e,d){"use strict";Object.defineProperty(e,'__esModule',{value:!0}),Object.defineProperty(e,"default",{enumerable:!0,get:function(){return c}});var c=r(d[0]).css`
  :host {
    margin-top: var(--wui-spacing-3xs);
  }
  wui-separator {
    margin: var(--wui-spacing-m) calc(var(--wui-spacing-m) * -1) var(--wui-spacing-xs)
      calc(var(--wui-spacing-m) * -1);
    width: calc(100% + var(--wui-spacing-s) * 2);
  }
`},9034,[4999]);
__d(function(g,_r,_i,a,m,e,_d){"use strict";Object.defineProperty(e,'__esModule',{value:!0}),Object.defineProperty(e,"W3mConnectingWcView",{enumerable:!0,get:function(){return s}});var t=_r(_d[0]),o=_r(_d[1]),n=_r(_d[2]),r=_r(_d[3]);_r(_d[4]),_r(_d[5]),_r(_d[6]),_r(_d[7]),_r(_d[8]),_r(_d[9]),_r(_d[10]);var i=this&&this.__decorate||function(t,o,n,r){var i,s=arguments.length,l=s<3?o:null===r?r=Object.getOwnPropertyDescriptor(o,n):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)l=Reflect.decorate(t,o,n,r);else for(var c=t.length-1;c>=0;c--)(i=t[c])&&(l=(s<3?i(l):s>3?i(o,n,l):i(o,n))||l);return s>3&&l&&Object.defineProperty(o,n,l),l};let s=class extends t.LitElement{constructor(){super(),this.wallet=n.RouterController.state.data?.wallet,this.unsubscribe=[],this.platform=void 0,this.platforms=[],this.isSiwxEnabled=Boolean(n.OptionsController.state.siwx),this.remoteFeatures=n.OptionsController.state.remoteFeatures,this.determinePlatforms(),this.initializeConnection(),this.unsubscribe.push(n.OptionsController.subscribeKey('remoteFeatures',t=>this.remoteFeatures=t))}disconnectedCallback(){this.unsubscribe.forEach(t=>t())}render(){return t.html`
      ${this.headerTemplate()}
      <div>${this.platformTemplate()}</div>
      ${this.reownBrandingTemplate()}
    `}reownBrandingTemplate(){return this.remoteFeatures?.reownBranding?t.html`<wui-ux-by-reown></wui-ux-by-reown>`:null}async initializeConnection(t=!1){if('browser'!==this.platform&&(!n.OptionsController.state.manualWCControl||t))try{const{wcPairingExpiry:o,status:r}=n.ConnectionController.state;(t||n.OptionsController.state.enableEmbedded||n.CoreHelperUtil.isPairingExpired(o)||'connecting'===r)&&(await n.ConnectionController.connectWalletConnect(),this.isSiwxEnabled||n.ModalController.close())}catch(t){n.EventsController.sendEvent({type:'track',event:'CONNECT_ERROR',properties:{message:t?.message??'Unknown'}}),n.ConnectionController.setWcError(!0),n.SnackController.showError(t.message??'Connection error'),n.ConnectionController.resetWcConnection(),n.RouterController.goBack()}}determinePlatforms(){if(!this.wallet)return this.platforms.push('qrcode'),void(this.platform='qrcode');if(this.platform)return;const{mobile_link:t,desktop_link:o,webapp_link:r,injected:i,rdns:s}=this.wallet,l=i?.map(({injected_id:t})=>t).filter(Boolean),c=[...s?[s]:l??[]],p=!n.OptionsController.state.isUniversalProvider&&c.length,h=t,d=r,u=n.ConnectionController.checkInstalled(c),w=p&&u,f=o&&!n.CoreHelperUtil.isMobile();w&&!n.ChainController.state.noAdapters&&this.platforms.push('browser'),h&&this.platforms.push(n.CoreHelperUtil.isMobile()?'mobile':'qrcode'),d&&this.platforms.push('web'),f&&this.platforms.push('desktop'),w||!p||n.ChainController.state.noAdapters||this.platforms.push('unsupported'),this.platform=this.platforms[0]}platformTemplate(){switch(this.platform){case'browser':return t.html`<w3m-connecting-wc-browser></w3m-connecting-wc-browser>`;case'web':return t.html`<w3m-connecting-wc-web></w3m-connecting-wc-web>`;case'desktop':return t.html`
          <w3m-connecting-wc-desktop .onRetry=${()=>this.initializeConnection(!0)}>
          </w3m-connecting-wc-desktop>
        `;case'mobile':return t.html`
          <w3m-connecting-wc-mobile isMobile .onRetry=${()=>this.initializeConnection(!0)}>
          </w3m-connecting-wc-mobile>
        `;case'qrcode':return t.html`<w3m-connecting-wc-qrcode></w3m-connecting-wc-qrcode>`;default:return t.html`<w3m-connecting-wc-unsupported></w3m-connecting-wc-unsupported>`}}headerTemplate(){return this.platforms.length>1?t.html`
      <w3m-connecting-header
        .platforms=${this.platforms}
        .onSelectPlatfrom=${this.onSelectPlatform.bind(this)}
      >
      </w3m-connecting-header>
    `:null}async onSelectPlatform(t){const o=this.shadowRoot?.querySelector('div');o&&(await o.animate([{opacity:1},{opacity:0}],{duration:200,fill:'forwards',easing:'ease'}).finished,this.platform=t,o.animate([{opacity:0},{opacity:1}],{duration:200,fill:'forwards',easing:'ease'}))}};i([(0,o.state)()],s.prototype,"platform",void 0),i([(0,o.state)()],s.prototype,"platforms",void 0),i([(0,o.state)()],s.prototype,"isSiwxEnabled",void 0),i([(0,o.state)()],s.prototype,"remoteFeatures",void 0),s=i([(0,r.customElement)('w3m-connecting-wc-view')],s)},9035,[4999,5775,7402,7695,9036,9040,9061,9062,9063,9076,9077]);
__d(function(g,_r,_i,a,m,e,_d){"use strict";Object.defineProperty(e,'__esModule',{value:!0}),Object.defineProperty(e,"W3mConnectingHeader",{enumerable:!0,get:function(){return l}});var t=_r(_d[0]),o=_r(_d[1]),r=_r(_d[2]);_r(_d[3]),_r(_d[4]);var n=this&&this.__decorate||function(t,o,r,n){var l,s=arguments.length,i=s<3?o:null===n?n=Object.getOwnPropertyDescriptor(o,r):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)i=Reflect.decorate(t,o,r,n);else for(var c=t.length-1;c>=0;c--)(l=t[c])&&(i=(s<3?l(i):s>3?l(o,r,i):l(o,r))||i);return s>3&&i&&Object.defineProperty(o,r,i),i};let l=class extends t.LitElement{constructor(){super(...arguments),this.platformTabs=[],this.unsubscribe=[],this.platforms=[],this.onSelectPlatfrom=void 0}disconnectCallback(){this.unsubscribe.forEach(t=>t())}render(){const o=this.generateTabs();return t.html`
      <wui-flex justifyContent="center" .padding=${['0','0','l','0']}>
        <wui-tabs .tabs=${o} .onTabChange=${this.onTabChange.bind(this)}></wui-tabs>
      </wui-flex>
    `}generateTabs(){const t=this.platforms.map(t=>'browser'===t?{label:'Browser',icon:'extension',platform:'browser'}:'mobile'===t?{label:'Mobile',icon:'mobile',platform:'mobile'}:'qrcode'===t?{label:'Mobile',icon:'mobile',platform:'qrcode'}:'web'===t?{label:'Webapp',icon:'browser',platform:'web'}:'desktop'===t?{label:'Desktop',icon:'desktop',platform:'desktop'}:{label:'Browser',icon:'extension',platform:'unsupported'});return this.platformTabs=t.map(({platform:t})=>t),t}onTabChange(t){const o=this.platformTabs[t];o&&this.onSelectPlatfrom?.(o)}};n([(0,o.property)({type:Array})],l.prototype,"platforms",void 0),n([(0,o.property)()],l.prototype,"onSelectPlatfrom",void 0),l=n([(0,r.customElement)('w3m-connecting-header')],l)},9036,[4999,5775,7695,7701,9037]);
__d(function(g,r,i,a,m,e,d){"use strict";Object.defineProperty(e,'__esModule',{value:!0});var t=r(d[0]);Object.keys(t).forEach(function(n){'default'===n||Object.prototype.hasOwnProperty.call(e,n)||Object.defineProperty(e,n,{enumerable:!0,get:function(){return t[n]}})})},9037,[9038]);
__d(function(g,_r,_i,a,m,_e,_d){"use strict";Object.defineProperty(_e,'__esModule',{value:!0}),Object.defineProperty(_e,"WuiTabs",{enumerable:!0,get:function(){return h}});var t=_r(_d[0]),e=_r(_d[1]);_r(_d[2]),_r(_d[3]);var i,s=_r(_d[4]),o=_r(_d[5]),n=_r(_d[6]),r=(i=n)&&i.__esModule?i:{default:i},l=this&&this.__decorate||function(t,e,i,s){var o,n=arguments.length,r=n<3?e:null===s?s=Object.getOwnPropertyDescriptor(e,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(t,e,i,s);else for(var l=t.length-1;l>=0;l--)(o=t[l])&&(r=(n<3?o(r):n>3?o(e,i,r):o(e,i))||r);return n>3&&r&&Object.defineProperty(e,i,r),r};let h=class extends t.LitElement{constructor(){super(...arguments),this.tabs=[],this.onTabChange=()=>null,this.buttons=[],this.disabled=!1,this.localTabWidth='100px',this.activeTab=0,this.isDense=!1}render(){return this.isDense=this.tabs.length>3,this.style.cssText=`\n      --local-tab: ${this.activeTab};\n      --local-tab-width: ${this.localTabWidth};\n    `,this.dataset.type=this.isDense?'flex':'block',this.tabs.map((e,i)=>{const s=i===this.activeTab;return t.html`
        <button
          ?disabled=${this.disabled}
          @click=${()=>this.onTabClick(i)}
          data-active=${s}
          data-testid="tab-${e.label?.toLowerCase()}"
        >
          ${this.iconTemplate(e)}
          <wui-text variant="small-600" color="inherit"> ${e.label} </wui-text>
        </button>
      `})}firstUpdated(){this.shadowRoot&&this.isDense&&(this.buttons=[...this.shadowRoot.querySelectorAll('button')],setTimeout(()=>{this.animateTabs(0,!0)},0))}iconTemplate(e){return e.icon?t.html`<wui-icon size="xs" color="inherit" name=${e.icon}></wui-icon>`:null}onTabClick(t){this.buttons&&this.animateTabs(t,!1),this.activeTab=t,this.onTabChange(t)}animateTabs(t,e){const i=this.buttons[this.activeTab],s=this.buttons[t],o=i?.querySelector('wui-text'),n=s?.querySelector('wui-text'),r=s?.getBoundingClientRect(),l=n?.getBoundingClientRect();i&&o&&!e&&t!==this.activeTab&&(o.animate([{opacity:0}],{duration:50,easing:'ease',fill:'forwards'}),i.animate([{width:"34px"}],{duration:500,easing:'ease',fill:'forwards'})),s&&r&&l&&n&&(t!==this.activeTab||e)&&(this.localTabWidth=`${Math.round(r.width+l.width)+6}px`,s.animate([{width:`${r.width+l.width}px`}],{duration:e?0:500,fill:'forwards',easing:'ease'}),n.animate([{opacity:1}],{duration:e?0:125,delay:e?0:200,fill:'forwards',easing:'ease'}))}};h.styles=[s.resetStyles,s.elementStyles,r.default],l([(0,e.property)({type:Array})],h.prototype,"tabs",void 0),l([(0,e.property)()],h.prototype,"onTabChange",void 0),l([(0,e.property)({type:Array})],h.prototype,"buttons",void 0),l([(0,e.property)({type:Boolean})],h.prototype,"disabled",void 0),l([(0,e.property)()],h.prototype,"localTabWidth",void 0),l([(0,e.state)()],h.prototype,"activeTab",void 0),l([(0,e.state)()],h.prototype,"isDense",void 0),h=l([(0,o.customElement)('wui-tabs')],h)},9038,[4999,5775,7704,7710,7697,7700,9039]);
__d(function(g,r,i,a,m,e,d){"use strict";Object.defineProperty(e,'__esModule',{value:!0}),Object.defineProperty(e,"default",{enumerable:!0,get:function(){return t}});var t=r(d[0]).css`
  :host {
    display: inline-flex;
    background-color: var(--wui-color-gray-glass-002);
    border-radius: var(--wui-border-radius-3xl);
    padding: var(--wui-spacing-3xs);
    position: relative;
    height: 36px;
    min-height: 36px;
    overflow: hidden;
  }

  :host::before {
    content: '';
    position: absolute;
    pointer-events: none;
    top: 4px;
    left: 4px;
    display: block;
    width: var(--local-tab-width);
    height: 28px;
    border-radius: var(--wui-border-radius-3xl);
    background-color: var(--wui-color-gray-glass-002);
    box-shadow: inset 0 0 0 1px var(--wui-color-gray-glass-002);
    transform: translateX(calc(var(--local-tab) * var(--local-tab-width)));
    transition: transform var(--wui-ease-out-power-1) var(--wui-duration-md);
    will-change: background-color, opacity;
  }

  :host([data-type='flex'])::before {
    left: 3px;
    transform: translateX(calc((var(--local-tab) * 34px) + (var(--local-tab) * 4px)));
  }

  :host([data-type='flex']) {
    display: flex;
    padding: 0px 0px 0px 12px;
    gap: 4px;
  }

  :host([data-type='flex']) > button > wui-text {
    position: absolute;
    left: 18px;
    opacity: 0;
  }

  button[data-active='true'] > wui-icon,
  button[data-active='true'] > wui-text {
    color: var(--wui-color-fg-100);
  }

  button[data-active='false'] > wui-icon,
  button[data-active='false'] > wui-text {
    color: var(--wui-color-fg-200);
  }

  button[data-active='true']:disabled,
  button[data-active='false']:disabled {
    background-color: transparent;
    opacity: 0.5;
    cursor: not-allowed;
  }

  button[data-active='true']:disabled > wui-text {
    color: var(--wui-color-fg-200);
  }

  button[data-active='false']:disabled > wui-text {
    color: var(--wui-color-fg-300);
  }

  button > wui-icon,
  button > wui-text {
    pointer-events: none;
    transition: color var(--wui-e ase-out-power-1) var(--wui-duration-md);
    will-change: color;
  }

  button {
    width: var(--local-tab-width);
    transition: background-color var(--wui-ease-out-power-1) var(--wui-duration-md);
    will-change: background-color;
  }

  :host([data-type='flex']) > button {
    width: 34px;
    position: relative;
    display: flex;
    justify-content: flex-start;
  }

  button:hover:enabled,
  button:active:enabled {
    background-color: transparent !important;
  }

  button:hover:enabled > wui-icon,
  button:active:enabled > wui-icon {
    transition: all var(--wui-ease-out-power-1) var(--wui-duration-lg);
    color: var(--wui-color-fg-125);
  }

  button:hover:enabled > wui-text,
  button:active:enabled > wui-text {
    transition: all var(--wui-ease-out-power-1) var(--wui-duration-lg);
    color: var(--wui-color-fg-125);
  }

  button {
    border-radius: var(--wui-border-radius-3xl);
  }
`},9039,[4999]);
__d(function(g,_r,_i,a,m,e,_d){"use strict";Object.defineProperty(e,'__esModule',{value:!0}),Object.defineProperty(e,"W3mConnectingWcBrowser",{enumerable:!0,get:function(){return c}});var t=_r(_d[0]),n=_r(_d[1]),o=_r(_d[2]),r=this&&this.__decorate||function(t,n,o,r){var c,s=arguments.length,i=s<3?n:null===r?r=Object.getOwnPropertyDescriptor(n,o):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)i=Reflect.decorate(t,n,o,r);else for(var l=t.length-1;l>=0;l--)(c=t[l])&&(i=(s<3?c(i):s>3?c(n,o,i):c(n,o))||i);return s>3&&i&&Object.defineProperty(n,o,i),i};let c=class extends o.W3mConnectingWidget{constructor(){if(super(),!this.wallet)throw new Error('w3m-connecting-wc-browser: No wallet provided');this.onConnect=this.onConnectProxy.bind(this),this.onAutoConnect=this.onConnectProxy.bind(this),t.EventsController.sendEvent({type:'track',event:'SELECT_WALLET',properties:{name:this.wallet.name,platform:'browser'}})}async onConnectProxy(){try{this.error=!1;const{connectors:n}=t.ConnectorController.state,o=n.find(t=>'ANNOUNCED'===t.type&&t.info?.rdns===this.wallet?.rdns||'INJECTED'===t.type||t.name===this.wallet?.name);if(!o)throw new Error('w3m-connecting-wc-browser: No connector found');await t.ConnectionController.connectExternal(o,o.chain),t.ModalController.close(),t.EventsController.sendEvent({type:'track',event:'CONNECT_SUCCESS',properties:{method:'browser',name:this.wallet?.name||'Unknown'}})}catch(n){t.EventsController.sendEvent({type:'track',event:'CONNECT_ERROR',properties:{message:n?.message??'Unknown'}}),this.error=!0}}};c=r([(0,n.customElement)('w3m-connecting-wc-browser')],c)},9040,[7402,7695,9041]);
__d(function(g,_r,_i,a,m,_e,_d){"use strict";Object.defineProperty(_e,'__esModule',{value:!0}),Object.defineProperty(_e,"W3mConnectingWidget",{enumerable:!0,get:function(){return c}});var t=_r(_d[0]),e=_r(_d[1]),o=_r(_d[2]),i=_r(_d[3]);_r(_d[4]),_r(_d[5]),_r(_d[6]),_r(_d[7]),_r(_d[8]),_r(_d[9]),_r(_d[10]),_r(_d[11]),_r(_d[12]);var r,n=_r(_d[13]),s=(r=n)&&r.__esModule?r:{default:r},l=this&&this.__decorate||function(t,e,o,i){var r,n=arguments.length,s=n<3?e:null===i?i=Object.getOwnPropertyDescriptor(e,o):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)s=Reflect.decorate(t,e,o,i);else for(var l=t.length-1;l>=0;l--)(r=t[l])&&(s=(n<3?r(s):n>3?r(e,o,s):r(e,o))||s);return n>3&&s&&Object.defineProperty(e,o,s),s};class c extends t.LitElement{constructor(){super(),this.wallet=i.RouterController.state.data?.wallet,this.connector=i.RouterController.state.data?.connector,this.timeout=void 0,this.secondaryBtnIcon='refresh',this.onConnect=void 0,this.onRender=void 0,this.onAutoConnect=void 0,this.isWalletConnect=!0,this.unsubscribe=[],this.imageSrc=i.AssetUtil.getWalletImage(this.wallet)??i.AssetUtil.getConnectorImage(this.connector),this.name=this.wallet?.name??this.connector?.name??'Wallet',this.isRetrying=!1,this.uri=i.ConnectionController.state.wcUri,this.error=i.ConnectionController.state.wcError,this.ready=!1,this.showRetry=!1,this.secondaryBtnLabel='Try again',this.secondaryLabel='Accept connection request in the wallet',this.isLoading=!1,this.isMobile=!1,this.onRetry=void 0,this.unsubscribe.push(i.ConnectionController.subscribeKey('wcUri',t=>{this.uri=t,this.isRetrying&&this.onRetry&&(this.isRetrying=!1,this.onConnect?.())}),i.ConnectionController.subscribeKey('wcError',t=>this.error=t)),(i.CoreHelperUtil.isTelegram()||i.CoreHelperUtil.isSafari())&&i.CoreHelperUtil.isIos()&&i.ConnectionController.state.wcUri&&this.onConnect?.()}firstUpdated(){this.onAutoConnect?.(),this.showRetry=!this.onAutoConnect}disconnectedCallback(){this.unsubscribe.forEach(t=>t()),i.ConnectionController.setWcError(!1),clearTimeout(this.timeout)}render(){this.onRender?.(),this.onShowRetry();const e=this.error?'Connection can be declined if a previous request is still active':this.secondaryLabel;let i=`Continue in ${this.name}`;return this.error&&(i='Connection declined'),t.html`
      <wui-flex
        data-error=${(0,o.ifDefined)(this.error)}
        data-retry=${this.showRetry}
        flexDirection="column"
        alignItems="center"
        .padding=${['3xl','xl','xl','xl']}
        gap="xl"
      >
        <wui-flex justifyContent="center" alignItems="center">
          <wui-wallet-image size="lg" imageSrc=${(0,o.ifDefined)(this.imageSrc)}></wui-wallet-image>

          ${this.error?null:this.loaderTemplate()}

          <wui-icon-box
            backgroundColor="error-100"
            background="opaque"
            iconColor="error-100"
            icon="close"
            size="sm"
            border
            borderColor="wui-color-bg-125"
          ></wui-icon-box>
        </wui-flex>

        <wui-flex flexDirection="column" alignItems="center" gap="xs">
          <wui-text variant="paragraph-500" color=${this.error?'error-100':'fg-100'}>
            ${i}
          </wui-text>
          <wui-text align="center" variant="small-500" color="fg-200">${e}</wui-text>
        </wui-flex>

        ${this.secondaryBtnLabel?t.html`
              <wui-button
                variant="accent"
                size="md"
                ?disabled=${this.isRetrying||this.isLoading}
                @click=${this.onTryAgain.bind(this)}
                data-testid="w3m-connecting-widget-secondary-button"
              >
                <wui-icon color="inherit" slot="iconLeft" name=${this.secondaryBtnIcon}></wui-icon>
                ${this.secondaryBtnLabel}
              </wui-button>
            `:null}
      </wui-flex>

      ${this.isWalletConnect?t.html`
            <wui-flex .padding=${['0','xl','xl','xl']} justifyContent="center">
              <wui-link @click=${this.onCopyUri} color="fg-200" data-testid="wui-link-copy">
                <wui-icon size="xs" color="fg-200" slot="iconLeft" name="copy"></wui-icon>
                Copy link
              </wui-link>
            </wui-flex>
          `:null}

      <w3m-mobile-download-links .wallet=${this.wallet}></w3m-mobile-download-links>
    `}onShowRetry(){if(this.error&&!this.showRetry){this.showRetry=!0;const t=this.shadowRoot?.querySelector('wui-button');t?.animate([{opacity:0},{opacity:1}],{fill:'forwards',easing:'ease'})}}onTryAgain(){i.ConnectionController.setWcError(!1),this.onRetry?(this.isRetrying=!0,this.onRetry?.()):this.onConnect?.()}loaderTemplate(){const e=i.ThemeController.state.themeVariables['--w3m-border-radius-master'],o=e?parseInt(e.replace('px',''),10):4;return t.html`<wui-loading-thumbnail radius=${9*o}></wui-loading-thumbnail>`}onCopyUri(){try{this.uri&&(i.CoreHelperUtil.copyToClopboard(this.uri),i.SnackController.showSuccess('Link copied'))}catch{i.SnackController.showError('Failed to copy')}}}c.styles=s.default,l([(0,e.state)()],c.prototype,"isRetrying",void 0),l([(0,e.state)()],c.prototype,"uri",void 0),l([(0,e.state)()],c.prototype,"error",void 0),l([(0,e.state)()],c.prototype,"ready",void 0),l([(0,e.state)()],c.prototype,"showRetry",void 0),l([(0,e.state)()],c.prototype,"secondaryBtnLabel",void 0),l([(0,e.state)()],c.prototype,"secondaryLabel",void 0),l([(0,e.state)()],c.prototype,"isLoading",void 0),l([(0,e.property)({type:Boolean})],c.prototype,"isMobile",void 0),l([(0,e.property)()],c.prototype,"onRetry",void 0)},9041,[4999,5775,5786,7402,9042,7701,7720,9045,9046,9049,7721,9052,9053,9060]);
__d(function(g,r,i,a,m,e,d){"use strict";Object.defineProperty(e,'__esModule',{value:!0});var t=r(d[0]);Object.keys(t).forEach(function(n){'default'===n||Object.prototype.hasOwnProperty.call(e,n)||Object.defineProperty(e,n,{enumerable:!0,get:function(){return t[n]}})})},9042,[9043]);
__d(function(g,_r,_i,a,m,_e,_d){"use strict";Object.defineProperty(_e,'__esModule',{value:!0}),Object.defineProperty(_e,"WuiButton",{enumerable:!0,get:function(){return p}});var t=_r(_d[0]),e=_r(_d[1]);_r(_d[2]),_r(_d[3]);var o,i=_r(_d[4]),r=_r(_d[5]),s=_r(_d[6]),n=(o=s)&&o.__esModule?o:{default:o},l=this&&this.__decorate||function(t,e,o,i){var r,s=arguments.length,n=s<3?e:null===i?i=Object.getOwnPropertyDescriptor(e,o):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(t,e,o,i);else for(var l=t.length-1;l>=0;l--)(r=t[l])&&(n=(s<3?r(n):s>3?r(e,o,n):r(e,o))||n);return s>3&&n&&Object.defineProperty(e,o,n),n};const d={main:'inverse-100',inverse:'inverse-000',accent:'accent-100','accent-error':'error-100','accent-success':'success-100',neutral:'fg-100',disabled:'gray-glass-020'},h={lg:'paragraph-600',md:'small-600'},c={lg:'md',md:'md'};let p=class extends t.LitElement{constructor(){super(...arguments),this.size='lg',this.disabled=!1,this.fullWidth=!1,this.loading=!1,this.variant='main',this.hasIconLeft=!1,this.hasIconRight=!1,this.borderRadius='m'}render(){this.style.cssText=`\n    --local-width: ${this.fullWidth?'100%':'auto'};\n    --local-opacity-100: ${this.loading?0:1};\n    --local-opacity-000: ${this.loading?1:0};\n    --local-border-radius: var(--wui-border-radius-${this.borderRadius});\n    `;const e=this.textVariant??h[this.size];return t.html`
      <button
        data-variant=${this.variant}
        data-icon-left=${this.hasIconLeft}
        data-icon-right=${this.hasIconRight}
        data-size=${this.size}
        ?disabled=${this.disabled}
      >
        ${this.loadingTemplate()}
        <slot name="iconLeft" @slotchange=${()=>this.handleSlotLeftChange()}></slot>
        <wui-text variant=${e} color="inherit">
          <slot></slot>
        </wui-text>
        <slot name="iconRight" @slotchange=${()=>this.handleSlotRightChange()}></slot>
      </button>
    `}handleSlotLeftChange(){this.hasIconLeft=!0}handleSlotRightChange(){this.hasIconRight=!0}loadingTemplate(){if(this.loading){const e=c[this.size],o=this.disabled?d.disabled:d[this.variant];return t.html`<wui-loading-spinner color=${o} size=${e}></wui-loading-spinner>`}return t.html``}};p.styles=[i.resetStyles,i.elementStyles,n.default],l([(0,e.property)()],p.prototype,"size",void 0),l([(0,e.property)({type:Boolean})],p.prototype,"disabled",void 0),l([(0,e.property)({type:Boolean})],p.prototype,"fullWidth",void 0),l([(0,e.property)({type:Boolean})],p.prototype,"loading",void 0),l([(0,e.property)()],p.prototype,"variant",void 0),l([(0,e.property)({type:Boolean})],p.prototype,"hasIconLeft",void 0),l([(0,e.property)({type:Boolean})],p.prototype,"hasIconRight",void 0),l([(0,e.property)()],p.prototype,"borderRadius",void 0),l([(0,e.property)()],p.prototype,"textVariant",void 0),p=l([(0,r.customElement)('wui-button')],p)},9043,[4999,5775,7718,7710,7697,7700,9044]);
__d(function(g,r,i,a,m,e,d){"use strict";Object.defineProperty(e,'__esModule',{value:!0}),Object.defineProperty(e,"default",{enumerable:!0,get:function(){return o}});var o=r(d[0]).css`
  :host {
    width: var(--local-width);
    position: relative;
  }

  button {
    border: none;
    border-radius: var(--local-border-radius);
    width: var(--local-width);
    white-space: nowrap;
  }

  /* -- Sizes --------------------------------------------------- */
  button[data-size='md'] {
    padding: 8.2px var(--wui-spacing-l) 9px var(--wui-spacing-l);
    height: 36px;
  }

  button[data-size='md'][data-icon-left='true'][data-icon-right='false'] {
    padding: 8.2px var(--wui-spacing-l) 9px var(--wui-spacing-s);
  }

  button[data-size='md'][data-icon-right='true'][data-icon-left='false'] {
    padding: 8.2px var(--wui-spacing-s) 9px var(--wui-spacing-l);
  }

  button[data-size='lg'] {
    padding: var(--wui-spacing-m) var(--wui-spacing-2l);
    height: 48px;
  }

  /* -- Variants --------------------------------------------------------- */
  button[data-variant='main'] {
    background-color: var(--wui-color-accent-100);
    color: var(--wui-color-inverse-100);
    border: none;
    box-shadow: inset 0 0 0 1px var(--wui-color-gray-glass-010);
  }

  button[data-variant='inverse'] {
    background-color: var(--wui-color-inverse-100);
    color: var(--wui-color-inverse-000);
    border: none;
    box-shadow: inset 0 0 0 1px var(--wui-color-gray-glass-010);
  }

  button[data-variant='accent'] {
    background-color: var(--wui-color-accent-glass-010);
    color: var(--wui-color-accent-100);
    border: none;
    box-shadow: inset 0 0 0 1px var(--wui-color-gray-glass-005);
  }

  button[data-variant='accent-error'] {
    background: var(--wui-color-error-glass-015);
    color: var(--wui-color-error-100);
    border: none;
    box-shadow: inset 0 0 0 1px var(--wui-color-error-glass-010);
  }

  button[data-variant='accent-success'] {
    background: var(--wui-color-success-glass-015);
    color: var(--wui-color-success-100);
    border: none;
    box-shadow: inset 0 0 0 1px var(--wui-color-success-glass-010);
  }

  button[data-variant='neutral'] {
    background: transparent;
    color: var(--wui-color-fg-100);
    border: none;
    box-shadow: inset 0 0 0 1px var(--wui-color-gray-glass-005);
  }

  /* -- Focus states --------------------------------------------------- */
  button[data-variant='main']:focus-visible:enabled {
    background-color: var(--wui-color-accent-090);
    box-shadow:
      inset 0 0 0 1px var(--wui-color-accent-100),
      0 0 0 4px var(--wui-color-accent-glass-020);
  }
  button[data-variant='inverse']:focus-visible:enabled {
    background-color: var(--wui-color-inverse-100);
    box-shadow:
      inset 0 0 0 1px var(--wui-color-gray-glass-010),
      0 0 0 4px var(--wui-color-accent-glass-020);
  }
  button[data-variant='accent']:focus-visible:enabled {
    background-color: var(--wui-color-accent-glass-010);
    box-shadow:
      inset 0 0 0 1px var(--wui-color-accent-100),
      0 0 0 4px var(--wui-color-accent-glass-020);
  }
  button[data-variant='accent-error']:focus-visible:enabled {
    background: var(--wui-color-error-glass-015);
    box-shadow:
      inset 0 0 0 1px var(--wui-color-error-100),
      0 0 0 4px var(--wui-color-error-glass-020);
  }
  button[data-variant='accent-success']:focus-visible:enabled {
    background: var(--wui-color-success-glass-015);
    box-shadow:
      inset 0 0 0 1px var(--wui-color-success-100),
      0 0 0 4px var(--wui-color-success-glass-020);
  }
  button[data-variant='neutral']:focus-visible:enabled {
    background: var(--wui-color-gray-glass-005);
    box-shadow:
      inset 0 0 0 1px var(--wui-color-gray-glass-010),
      0 0 0 4px var(--wui-color-gray-glass-002);
  }

  /* -- Hover & Active states ----------------------------------------------------------- */
  @media (hover: hover) and (pointer: fine) {
    button[data-variant='main']:hover:enabled {
      background-color: var(--wui-color-accent-090);
    }

    button[data-variant='main']:active:enabled {
      background-color: var(--wui-color-accent-080);
    }

    button[data-variant='accent']:hover:enabled {
      background-color: var(--wui-color-accent-glass-015);
    }

    button[data-variant='accent']:active:enabled {
      background-color: var(--wui-color-accent-glass-020);
    }

    button[data-variant='accent-error']:hover:enabled {
      background: var(--wui-color-error-glass-020);
      color: var(--wui-color-error-100);
    }

    button[data-variant='accent-error']:active:enabled {
      background: var(--wui-color-error-glass-030);
      color: var(--wui-color-error-100);
    }

    button[data-variant='accent-success']:hover:enabled {
      background: var(--wui-color-success-glass-020);
      color: var(--wui-color-success-100);
    }

    button[data-variant='accent-success']:active:enabled {
      background: var(--wui-color-success-glass-030);
      color: var(--wui-color-success-100);
    }

    button[data-variant='neutral']:hover:enabled {
      background: var(--wui-color-gray-glass-002);
    }

    button[data-variant='neutral']:active:enabled {
      background: var(--wui-color-gray-glass-005);
    }

    button[data-size='lg'][data-icon-left='true'][data-icon-right='false'] {
      padding-left: var(--wui-spacing-m);
    }

    button[data-size='lg'][data-icon-right='true'][data-icon-left='false'] {
      padding-right: var(--wui-spacing-m);
    }
  }

  /* -- Disabled state --------------------------------------------------- */
  button:disabled {
    background-color: var(--wui-color-gray-glass-002);
    box-shadow: inset 0 0 0 1px var(--wui-color-gray-glass-002);
    color: var(--wui-color-gray-glass-020);
    cursor: not-allowed;
  }

  button > wui-text {
    transition: opacity var(--wui-ease-out-power-1) var(--wui-duration-md);
    will-change: opacity;
    opacity: var(--local-opacity-100);
  }

  ::slotted(*) {
    transition: opacity var(--wui-ease-out-power-1) var(--wui-duration-md);
    will-change: opacity;
    opacity: var(--local-opacity-100);
  }

  wui-loading-spinner {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    opacity: var(--local-opacity-000);
  }
`},9044,[4999]);
__d(function(g,r,i,a,m,e,d){"use strict";Object.defineProperty(e,'__esModule',{value:!0});var t=r(d[0]);Object.keys(t).forEach(function(n){'default'===n||Object.prototype.hasOwnProperty.call(e,n)||Object.defineProperty(e,n,{enumerable:!0,get:function(){return t[n]}})})},9045,[7712]);
__d(function(g,r,i,a,m,e,d){"use strict";Object.defineProperty(e,'__esModule',{value:!0});var t=r(d[0]);Object.keys(t).forEach(function(n){'default'===n||Object.prototype.hasOwnProperty.call(e,n)||Object.defineProperty(e,n,{enumerable:!0,get:function(){return t[n]}})})},9046,[9047]);
__d(function(g,_r,_i,a,m,_e,_d){"use strict";Object.defineProperty(_e,'__esModule',{value:!0}),Object.defineProperty(_e,"WuiLink",{enumerable:!0,get:function(){return c}});var e=_r(_d[0]),t=_r(_d[1]),o=_r(_d[2]);_r(_d[3]);var r,i=_r(_d[4]),l=_r(_d[5]),n=_r(_d[6]),s=(r=n)&&r.__esModule?r:{default:r},d=this&&this.__decorate||function(e,t,o,r){var i,l=arguments.length,n=l<3?t:null===r?r=Object.getOwnPropertyDescriptor(t,o):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,o,r);else for(var s=e.length-1;s>=0;s--)(i=e[s])&&(n=(l<3?i(n):l>3?i(t,o,n):i(t,o))||n);return l>3&&n&&Object.defineProperty(t,o,n),n};let c=class extends e.LitElement{constructor(){super(...arguments),this.tabIdx=void 0,this.disabled=!1,this.color='inherit'}render(){return e.html`
      <button ?disabled=${this.disabled} tabindex=${(0,o.ifDefined)(this.tabIdx)}>
        <slot name="iconLeft"></slot>
        <wui-text variant="small-600" color=${this.color}>
          <slot></slot>
        </wui-text>
        <slot name="iconRight"></slot>
      </button>
    `}};c.styles=[i.resetStyles,i.elementStyles,s.default],d([(0,t.property)()],c.prototype,"tabIdx",void 0),d([(0,t.property)({type:Boolean})],c.prototype,"disabled",void 0),d([(0,t.property)()],c.prototype,"color",void 0),c=d([(0,l.customElement)('wui-link')],c)},9047,[4999,5775,5786,7710,7697,7700,9048]);
__d(function(g,r,i,a,m,e,d){"use strict";Object.defineProperty(e,'__esModule',{value:!0}),Object.defineProperty(e,"default",{enumerable:!0,get:function(){return o}});var o=r(d[0]).css`
  button {
    padding: var(--wui-spacing-4xs) var(--wui-spacing-xxs);
    border-radius: var(--wui-border-radius-3xs);
    background-color: transparent;
    color: var(--wui-color-accent-100);
  }

  button:disabled {
    background-color: transparent;
    color: var(--wui-color-gray-glass-015);
  }

  button:hover {
    background-color: var(--wui-color-gray-glass-005);
  }
`},9048,[4999]);
__d(function(g,r,i,a,m,e,d){"use strict";Object.defineProperty(e,'__esModule',{value:!0});var t=r(d[0]);Object.keys(t).forEach(function(n){'default'===n||Object.prototype.hasOwnProperty.call(e,n)||Object.defineProperty(e,n,{enumerable:!0,get:function(){return t[n]}})})},9049,[9050]);
__d(function(g,_r,_i,a,m,_e,_d){"use strict";Object.defineProperty(_e,'__esModule',{value:!0}),Object.defineProperty(_e,"WuiLoadingThumbnail",{enumerable:!0,get:function(){return d}});var e,t=_r(_d[0]),r=_r(_d[1]),s=_r(_d[2]),o=_r(_d[3]),i=_r(_d[4]),n=(e=i)&&e.__esModule?e:{default:e},u=this&&this.__decorate||function(e,t,r,s){var o,i=arguments.length,n=i<3?t:null===s?s=Object.getOwnPropertyDescriptor(t,r):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,r,s);else for(var u=e.length-1;u>=0;u--)(o=e[u])&&(n=(i<3?o(n):i>3?o(t,r,n):o(t,r))||n);return i>3&&n&&Object.defineProperty(t,r,n),n};let d=class extends t.LitElement{constructor(){super(...arguments),this.radius=36}render(){return this.svgLoaderTemplate()}svgLoaderTemplate(){const e=this.radius>50?50:this.radius,r=36-e,s=116+r,o=245+r,i=360+1.75*r;return t.html`
      <svg viewBox="0 0 110 110" width="110" height="110">
        <rect
          x="2"
          y="2"
          width="106"
          height="106"
          rx=${e}
          stroke-dasharray="${s} ${o}"
          stroke-dashoffset=${i}
        />
      </svg>
    `}};d.styles=[s.resetStyles,n.default],u([(0,r.property)({type:Number})],d.prototype,"radius",void 0),d=u([(0,o.customElement)('wui-loading-thumbnail')],d)},9050,[4999,5775,7697,7700,9051]);
__d(function(g,r,i,a,m,e,d){"use strict";Object.defineProperty(e,'__esModule',{value:!0}),Object.defineProperty(e,"default",{enumerable:!0,get:function(){return t}});var t=r(d[0]).css`
  :host {
    display: block;
    width: var(--wui-box-size-md);
    height: var(--wui-box-size-md);
  }

  svg {
    width: var(--wui-box-size-md);
    height: var(--wui-box-size-md);
  }

  rect {
    fill: none;
    stroke: var(--wui-color-accent-100);
    stroke-width: 4px;
    stroke-linecap: round;
    animation: dash 1s linear infinite;
  }

  @keyframes dash {
    to {
      stroke-dashoffset: 0px;
    }
  }
`},9051,[4999]);
__d(function(g,r,i,a,m,e,d){"use strict";Object.defineProperty(e,'__esModule',{value:!0});var t=r(d[0]);Object.keys(t).forEach(function(n){'default'===n||Object.prototype.hasOwnProperty.call(e,n)||Object.defineProperty(e,n,{enumerable:!0,get:function(){return t[n]}})})},9052,[9020]);
__d(function(g,_r,_i,a,m,_e,_d){"use strict";Object.defineProperty(_e,'__esModule',{value:!0}),Object.defineProperty(_e,"W3mMobileDownloadLinks",{enumerable:!0,get:function(){return u}});var e=_r(_d[0]),t=_r(_d[1]),l=_r(_d[2]),o=_r(_d[3]);_r(_d[4]);var n,r=_r(_d[5]),i=(n=r)&&n.__esModule?n:{default:n},s=this&&this.__decorate||function(e,t,l,o){var n,r=arguments.length,i=r<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,l):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)i=Reflect.decorate(e,t,l,o);else for(var s=e.length-1;s>=0;s--)(n=e[s])&&(i=(r<3?n(i):r>3?n(t,l,i):n(t,l))||i);return r>3&&i&&Object.defineProperty(t,l,i),i};let u=class extends e.LitElement{constructor(){super(...arguments),this.wallet=void 0}render(){if(!this.wallet)return this.style.display='none',null;const{name:t,app_store:n,play_store:r,chrome_store:i,homepage:s}=this.wallet,u=l.CoreHelperUtil.isMobile(),c=l.CoreHelperUtil.isIos(),p=l.CoreHelperUtil.isAndroid(),h=[n,r,s,i].filter(Boolean).length>1,b=o.UiHelperUtil.getTruncateString({string:t,charsStart:12,charsEnd:0,truncate:'end'});return h&&!u?e.html`
        <wui-cta-button
          label=${`Don't have ${b}?`}
          buttonLabel="Get"
          @click=${()=>l.RouterController.push('Downloads',{wallet:this.wallet})}
        ></wui-cta-button>
      `:!h&&s?e.html`
        <wui-cta-button
          label=${`Don't have ${b}?`}
          buttonLabel="Get"
          @click=${this.onHomePage.bind(this)}
        ></wui-cta-button>
      `:n&&c?e.html`
        <wui-cta-button
          label=${`Don't have ${b}?`}
          buttonLabel="Get"
          @click=${this.onAppStore.bind(this)}
        ></wui-cta-button>
      `:r&&p?e.html`
        <wui-cta-button
          label=${`Don't have ${b}?`}
          buttonLabel="Get"
          @click=${this.onPlayStore.bind(this)}
        ></wui-cta-button>
      `:(this.style.display='none',null)}onAppStore(){this.wallet?.app_store&&l.CoreHelperUtil.openHref(this.wallet.app_store,'_blank')}onPlayStore(){this.wallet?.play_store&&l.CoreHelperUtil.openHref(this.wallet.play_store,'_blank')}onHomePage(){this.wallet?.homepage&&l.CoreHelperUtil.openHref(this.wallet.homepage,'_blank')}};u.styles=[i.default],s([(0,t.property)({type:Object})],u.prototype,"wallet",void 0),u=s([(0,o.customElement)('w3m-mobile-download-links')],u)},9053,[4999,5775,7402,7695,9054,9059]);
__d(function(g,r,i,a,m,e,d){"use strict";Object.defineProperty(e,'__esModule',{value:!0});var t=r(d[0]);Object.keys(t).forEach(function(n){'default'===n||Object.prototype.hasOwnProperty.call(e,n)||Object.defineProperty(e,n,{enumerable:!0,get:function(){return t[n]}})})},9054,[9055]);
__d(function(g,_r,_i,a,m,_e,_d){"use strict";Object.defineProperty(_e,'__esModule',{value:!0}),Object.defineProperty(_e,"WuiCtaButton",{enumerable:!0,get:function(){return u}});var e=_r(_d[0]),t=_r(_d[1]);_r(_d[2]),_r(_d[3]),_r(_d[4]);var r,o=_r(_d[5]),n=_r(_d[6]),i=_r(_d[7]),l=(r=i)&&r.__esModule?r:{default:r},s=this&&this.__decorate||function(e,t,r,o){var n,i=arguments.length,l=i<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,r):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)l=Reflect.decorate(e,t,r,o);else for(var s=e.length-1;s>=0;s--)(n=e[s])&&(l=(i<3?n(l):i>3?n(t,r,l):n(t,r))||l);return i>3&&l&&Object.defineProperty(t,r,l),l};let u=class extends e.LitElement{constructor(){super(...arguments),this.disabled=!1,this.label='',this.buttonLabel=''}render(){return e.html`
      <wui-flex
        justifyContent="space-between"
        alignItems="center"
        .padding=${['1xs','2l','1xs','2l']}
      >
        <wui-text variant="paragraph-500" color="fg-200">${this.label}</wui-text>
        <wui-chip-button size="sm" variant="shade" text=${this.buttonLabel} icon="chevronRight">
        </wui-chip-button>
      </wui-flex>
    `}};u.styles=[o.resetStyles,o.elementStyles,l.default],s([(0,t.property)({type:Boolean})],u.prototype,"disabled",void 0),s([(0,t.property)()],u.prototype,"label",void 0),s([(0,t.property)()],u.prototype,"buttonLabel",void 0),u=s([(0,n.customElement)('wui-cta-button')],u)},9055,[4999,5775,7710,9056,7702,7697,7700,9058]);
__d(function(g,_r,_i,a,m,_e,_d){"use strict";Object.defineProperty(_e,'__esModule',{value:!0}),Object.defineProperty(_e,"WuiChipButton",{enumerable:!0,get:function(){return l}});var t=_r(_d[0]),e=_r(_d[1]);_r(_d[2]),_r(_d[3]),_r(_d[4]);var i,r=_r(_d[5]),o=_r(_d[6]),n=_r(_d[7]),s=(i=n)&&i.__esModule?i:{default:i},c=this&&this.__decorate||function(t,e,i,r){var o,n=arguments.length,s=n<3?e:null===r?r=Object.getOwnPropertyDescriptor(e,i):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)s=Reflect.decorate(t,e,i,r);else for(var c=t.length-1;c>=0;c--)(o=t[c])&&(s=(n<3?o(s):n>3?o(e,i,s):o(e,i))||s);return n>3&&s&&Object.defineProperty(e,i,s),s};let l=class extends t.LitElement{constructor(){super(...arguments),this.variant='accent',this.imageSrc='',this.disabled=!1,this.icon='externalLink',this.size='md',this.text=''}render(){const e='sm'===this.size?'small-600':'paragraph-600';return t.html`
      <button
        class=${this.disabled?'disabled':''}
        data-variant=${this.variant}
        data-size=${this.size}
      >
        ${this.imageSrc?t.html`<wui-image src=${this.imageSrc}></wui-image>`:null}
        <wui-text variant=${e} color="inherit"> ${this.text} </wui-text>
        <wui-icon name=${this.icon} color="inherit" size="inherit"></wui-icon>
      </button>
    `}};l.styles=[r.resetStyles,r.elementStyles,s.default],c([(0,e.property)()],l.prototype,"variant",void 0),c([(0,e.property)()],l.prototype,"imageSrc",void 0),c([(0,e.property)({type:Boolean})],l.prototype,"disabled",void 0),c([(0,e.property)()],l.prototype,"icon",void 0),c([(0,e.property)()],l.prototype,"size",void 0),c([(0,e.property)()],l.prototype,"text",void 0),l=c([(0,o.customElement)('wui-chip-button')],l)},9056,[4999,5775,7704,7714,7710,7697,7700,9057]);
__d(function(g,r,i,a,m,e,d){"use strict";Object.defineProperty(e,'__esModule',{value:!0}),Object.defineProperty(e,"default",{enumerable:!0,get:function(){return o}});var o=r(d[0]).css`
  button {
    border: none;
    border-radius: var(--wui-border-radius-3xl);
  }

  button[data-variant='main'] {
    background-color: var(--wui-color-accent-100);
    color: var(--wui-color-inverse-100);
    box-shadow: inset 0 0 0 1px var(--wui-color-gray-glass-010);
  }

  button[data-variant='accent'] {
    background-color: var(--wui-color-accent-glass-010);
    color: var(--wui-color-accent-100);
    box-shadow: inset 0 0 0 1px var(--wui-color-gray-glass-005);
  }

  button[data-variant='gray'] {
    background-color: transparent;
    color: var(--wui-color-fg-200);
    box-shadow: inset 0 0 0 1px var(--wui-color-gray-glass-010);
  }

  button[data-variant='shade'] {
    background-color: transparent;
    color: var(--wui-color-accent-100);
    box-shadow: inset 0 0 0 1px var(--wui-color-gray-glass-010);
  }

  button[data-size='sm'] {
    height: 32px;
    padding: 0 var(--wui-spacing-s);
  }

  button[data-size='md'] {
    height: 40px;
    padding: 0 var(--wui-spacing-l);
  }

  button[data-size='sm'] > wui-image {
    width: 16px;
    height: 16px;
  }

  button[data-size='md'] > wui-image {
    width: 24px;
    height: 24px;
  }

  button[data-size='sm'] > wui-icon {
    width: 12px;
    height: 12px;
  }

  button[data-size='md'] > wui-icon {
    width: 14px;
    height: 14px;
  }

  wui-image {
    border-radius: var(--wui-border-radius-3xl);
    overflow: hidden;
  }

  button.disabled > wui-icon,
  button.disabled > wui-image {
    filter: grayscale(1);
  }

  button[data-variant='main'] > wui-image {
    box-shadow: inset 0 0 0 1px var(--wui-color-accent-090);
  }

  button[data-variant='shade'] > wui-image,
  button[data-variant='gray'] > wui-image {
    box-shadow: inset 0 0 0 1px var(--wui-color-gray-glass-010);
  }

  @media (hover: hover) and (pointer: fine) {
    button[data-variant='main']:focus-visible {
      background-color: var(--wui-color-accent-090);
    }

    button[data-variant='main']:hover:enabled {
      background-color: var(--wui-color-accent-090);
    }

    button[data-variant='main']:active:enabled {
      background-color: var(--wui-color-accent-080);
    }

    button[data-variant='accent']:hover:enabled {
      background-color: var(--wui-color-accent-glass-015);
    }

    button[data-variant='accent']:active:enabled {
      background-color: var(--wui-color-accent-glass-020);
    }

    button[data-variant='shade']:focus-visible,
    button[data-variant='gray']:focus-visible,
    button[data-variant='shade']:hover,
    button[data-variant='gray']:hover {
      background-color: var(--wui-color-gray-glass-002);
    }

    button[data-variant='gray']:active,
    button[data-variant='shade']:active {
      background-color: var(--wui-color-gray-glass-005);
    }
  }

  button.disabled {
    color: var(--wui-color-gray-glass-020);
    background-color: var(--wui-color-gray-glass-002);
    box-shadow: inset 0 0 0 1px var(--wui-color-gray-glass-002);
    pointer-events: none;
  }
`},9057,[4999]);
__d(function(g,r,i,a,m,e,d){"use strict";Object.defineProperty(e,'__esModule',{value:!0}),Object.defineProperty(e,"default",{enumerable:!0,get:function(){return u}});var u=r(d[0]).css`
  wui-flex {
    width: 100%;
    background-color: var(--wui-color-gray-glass-002);
    border-radius: var(--wui-border-radius-xs);
  }
`},9058,[4999]);
__d(function(g,r,i,a,m,e,d){"use strict";Object.defineProperty(e,'__esModule',{value:!0}),Object.defineProperty(e,"default",{enumerable:!0,get:function(){return t}});var t=r(d[0]).css`
  :host {
    display: block;
    padding: 0 var(--wui-spacing-xl) var(--wui-spacing-xl);
  }
`},9059,[4999]);
__d(function(g,r,i,a,m,e,d){"use strict";Object.defineProperty(e,'__esModule',{value:!0}),Object.defineProperty(e,"default",{enumerable:!0,get:function(){return t}});var t=r(d[0]).css`
  @keyframes shake {
    0% {
      transform: translateX(0);
    }
    25% {
      transform: translateX(3px);
    }
    50% {
      transform: translateX(-3px);
    }
    75% {
      transform: translateX(3px);
    }
    100% {
      transform: translateX(0);
    }
  }

  wui-flex:first-child:not(:only-child) {
    position: relative;
  }

  wui-loading-thumbnail {
    position: absolute;
  }

  wui-icon-box {
    position: absolute;
    right: calc(var(--wui-spacing-3xs) * -1);
    bottom: calc(var(--wui-spacing-3xs) * -1);
    opacity: 0;
    transform: scale(0.5);
    transition-property: opacity, transform;
    transition-duration: var(--wui-duration-lg);
    transition-timing-function: var(--wui-ease-out-power-2);
    will-change: opacity, transform;
  }

  wui-text[align='center'] {
    width: 100%;
    padding: 0px var(--wui-spacing-l);
  }

  [data-error='true'] wui-icon-box {
    opacity: 1;
    transform: scale(1);
  }

  [data-error='true'] > wui-flex:first-child {
    animation: shake 250ms cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
  }

  [data-retry='false'] wui-link {
    display: none;
  }

  [data-retry='true'] wui-link {
    display: block;
    opacity: 1;
  }
`},9060,[4999]);
__d(function(g,_r,_i,a,m,e,_d){"use strict";Object.defineProperty(e,'__esModule',{value:!0}),Object.defineProperty(e,"W3mConnectingWcDesktop",{enumerable:!0,get:function(){return i}});var t=_r(_d[0]),n=_r(_d[1]),r=_r(_d[2]),o=this&&this.__decorate||function(t,n,r,o){var i,s=arguments.length,c=s<3?n:null===o?o=Object.getOwnPropertyDescriptor(n,r):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)c=Reflect.decorate(t,n,r,o);else for(var l=t.length-1;l>=0;l--)(i=t[l])&&(c=(s<3?i(c):s>3?i(n,r,c):i(n,r))||c);return s>3&&c&&Object.defineProperty(n,r,c),c};let i=class extends r.W3mConnectingWidget{constructor(){if(super(),!this.wallet)throw new Error('w3m-connecting-wc-desktop: No wallet provided');this.onConnect=this.onConnectProxy.bind(this),this.onRender=this.onRenderProxy.bind(this),t.EventsController.sendEvent({type:'track',event:'SELECT_WALLET',properties:{name:this.wallet.name,platform:'desktop'}})}onRenderProxy(){!this.ready&&this.uri&&(this.ready=!0,this.onConnect?.())}onConnectProxy(){if(this.wallet?.desktop_link&&this.uri)try{this.error=!1;const{desktop_link:n,name:r}=this.wallet,{redirect:o,href:i}=t.CoreHelperUtil.formatNativeUrl(n,this.uri);t.ConnectionController.setWcLinking({name:r,href:i}),t.ConnectionController.setRecentWallet(this.wallet),t.CoreHelperUtil.openHref(o,'_blank')}catch{this.error=!0}}};i=o([(0,n.customElement)('w3m-connecting-wc-desktop')],i)},9061,[7402,7695,9041]);
__d(function(g,_r,_i,a,m,_e,_d){"use strict";Object.defineProperty(_e,'__esModule',{value:!0}),Object.defineProperty(_e,"W3mConnectingWcMobile",{enumerable:!0,get:function(){return o}});var e=_r(_d[0]),t=_r(_d[1]),i=_r(_d[2]),r=_r(_d[3]),n=this&&this.__decorate||function(e,t,i,r){var n,o=arguments.length,s=o<3?t:null===r?r=Object.getOwnPropertyDescriptor(t,i):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)s=Reflect.decorate(e,t,i,r);else for(var l=e.length-1;l>=0;l--)(n=e[l])&&(s=(o<3?n(s):o>3?n(t,i,s):n(t,i))||s);return o>3&&s&&Object.defineProperty(t,i,s),s};let o=class extends r.W3mConnectingWidget{constructor(){if(super(),this.btnLabelTimeout=void 0,this.redirectDeeplink=void 0,this.redirectUniversalLink=void 0,this.target=void 0,this.preferUniversalLinks=t.OptionsController.state.experimental_preferUniversalLinks,this.isLoading=!0,this.onConnect=()=>{if(this.wallet?.mobile_link&&this.uri)try{this.error=!1;const{mobile_link:e,link_mode:i,name:r}=this.wallet,{redirect:n,redirectUniversalLink:o,href:s}=t.CoreHelperUtil.formatNativeUrl(e,this.uri,i);this.redirectDeeplink=n,this.redirectUniversalLink=o,this.target=t.CoreHelperUtil.isIframe()?'_top':'_self',t.ConnectionController.setWcLinking({name:r,href:s}),t.ConnectionController.setRecentWallet(this.wallet),this.preferUniversalLinks&&this.redirectUniversalLink?t.CoreHelperUtil.openHref(this.redirectUniversalLink,this.target):t.CoreHelperUtil.openHref(this.redirectDeeplink,this.target)}catch(e){t.EventsController.sendEvent({type:'track',event:'CONNECT_PROXY_ERROR',properties:{message:e instanceof Error?e.message:'Error parsing the deeplink',uri:this.uri,mobile_link:this.wallet.mobile_link,name:this.wallet.name}}),this.error=!0}},!this.wallet)throw new Error('w3m-connecting-wc-mobile: No wallet provided');this.secondaryBtnLabel='Open',this.secondaryLabel=t.ConstantsUtil.CONNECT_LABELS.MOBILE,this.secondaryBtnIcon='externalLink',this.onHandleURI(),this.unsubscribe.push(t.ConnectionController.subscribeKey('wcUri',()=>{this.onHandleURI()})),t.EventsController.sendEvent({type:'track',event:'SELECT_WALLET',properties:{name:this.wallet.name,platform:'mobile'}})}disconnectedCallback(){super.disconnectedCallback(),clearTimeout(this.btnLabelTimeout)}onHandleURI(){this.isLoading=!this.uri,!this.ready&&this.uri&&(this.ready=!0,this.onConnect?.())}onTryAgain(){t.ConnectionController.setWcError(!1),this.onConnect?.()}};n([(0,e.state)()],o.prototype,"redirectDeeplink",void 0),n([(0,e.state)()],o.prototype,"redirectUniversalLink",void 0),n([(0,e.state)()],o.prototype,"target",void 0),n([(0,e.state)()],o.prototype,"preferUniversalLinks",void 0),n([(0,e.state)()],o.prototype,"isLoading",void 0),o=n([(0,i.customElement)('w3m-connecting-wc-mobile')],o)},9062,[5775,7402,7695,9041]);
__d(function(g,_r,_i,a,m,_e,_d){"use strict";Object.defineProperty(_e,'__esModule',{value:!0}),Object.defineProperty(_e,"W3mConnectingWcQrcode",{enumerable:!0,get:function(){return d}});var e=_r(_d[0]),t=_r(_d[1]),i=_r(_d[2]),r=_r(_d[3]);_r(_d[4]),_r(_d[5]),_r(_d[6]),_r(_d[7]),_r(_d[8]),_r(_d[9]),_r(_d[10]);var o=_r(_d[11]);_r(_d[12]);var n,l=_r(_d[13]),s=(n=l)&&n.__esModule?n:{default:n},c=this&&this.__decorate||function(e,t,i,r){var o,n=arguments.length,l=n<3?t:null===r?r=Object.getOwnPropertyDescriptor(t,i):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)l=Reflect.decorate(e,t,i,r);else for(var s=e.length-1;s>=0;s--)(o=e[s])&&(l=(n<3?o(l):n>3?o(t,i,l):o(t,i))||l);return n>3&&l&&Object.defineProperty(t,i,l),l};let d=class extends o.W3mConnectingWidget{constructor(){super(),this.forceUpdate=()=>{this.requestUpdate()},window.addEventListener('resize',this.forceUpdate),i.EventsController.sendEvent({type:'track',event:'SELECT_WALLET',properties:{name:this.wallet?.name??'WalletConnect',platform:'qrcode'}})}disconnectedCallback(){super.disconnectedCallback(),this.unsubscribe?.forEach(e=>e()),window.removeEventListener('resize',this.forceUpdate)}render(){return this.onRenderProxy(),e.html`
      <wui-flex
        flexDirection="column"
        alignItems="center"
        .padding=${['0','xl','xl','xl']}
        gap="xl"
      >
        <wui-shimmer borderRadius="l" width="100%"> ${this.qrCodeTemplate()} </wui-shimmer>

        <wui-text variant="paragraph-500" color="fg-100">
          Scan this QR Code with your phone
        </wui-text>
        ${this.copyTemplate()}
      </wui-flex>
      <w3m-mobile-download-links .wallet=${this.wallet}></w3m-mobile-download-links>
    `}onRenderProxy(){!this.ready&&this.uri&&(this.timeout=setTimeout(()=>{this.ready=!0},200))}qrCodeTemplate(){if(!this.uri||!this.ready)return null;const r=this.getBoundingClientRect().width-40,o=this.wallet?this.wallet.name:void 0;return i.ConnectionController.setWcLinking(void 0),i.ConnectionController.setRecentWallet(this.wallet),e.html` <wui-qr-code
      size=${r}
      theme=${i.ThemeController.state.themeMode}
      uri=${this.uri}
      imageSrc=${(0,t.ifDefined)(i.AssetUtil.getWalletImage(this.wallet))}
      color=${(0,t.ifDefined)(i.ThemeController.state.themeVariables['--w3m-qr-color'])}
      alt=${(0,t.ifDefined)(o)}
      data-testid="wui-qr-code"
    ></wui-qr-code>`}copyTemplate(){const t=!this.uri||!this.ready;return e.html`<wui-link
      .disabled=${t}
      @click=${this.onCopyUri}
      color="fg-200"
      data-testid="copy-wc2-uri"
    >
      <wui-icon size="xs" color="fg-200" slot="iconLeft" name="copy"></wui-icon>
      Copy link
    </wui-link>`}};d.styles=s.default,d=c([(0,r.customElement)('w3m-connecting-wc-qrcode')],d)},9063,[4999,5786,7402,7695,7701,7720,9046,9064,9068,7721,9071,9041,9053,9075]);
__d(function(g,r,i,a,m,e,d){"use strict";Object.defineProperty(e,'__esModule',{value:!0});var t=r(d[0]);Object.keys(t).forEach(function(n){'default'===n||Object.prototype.hasOwnProperty.call(e,n)||Object.defineProperty(e,n,{enumerable:!0,get:function(){return t[n]}})})},9064,[9065]);
__d(function(g,_r,_i,a,m,_e,_d){"use strict";Object.defineProperty(_e,'__esModule',{value:!0}),Object.defineProperty(_e,"WuiQrCode",{enumerable:!0,get:function(){return p}});var e=_r(_d[0]),t=_r(_d[1]);_r(_d[2]),_r(_d[3]);var r,i=_r(_d[4]),o=_r(_d[5]),s=_r(_d[6]),l=_r(_d[7]),n=(r=l)&&r.__esModule?r:{default:r},c=this&&this.__decorate||function(e,t,r,i){var o,s=arguments.length,l=s<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,r):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)l=Reflect.decorate(e,t,r,i);else for(var n=e.length-1;n>=0;n--)(o=e[n])&&(l=(s<3?o(l):s>3?o(t,r,l):o(t,r))||l);return s>3&&l&&Object.defineProperty(t,r,l),l};let p=class extends e.LitElement{constructor(){super(...arguments),this.uri='',this.size=0,this.theme='dark',this.imageSrc=void 0,this.alt=void 0,this.arenaClear=void 0,this.farcaster=void 0}render(){return this.dataset.theme=this.theme,this.dataset.clear=String(this.arenaClear),this.style.cssText=`\n     --local-size: ${this.size}px;\n     --local-icon-color: ${this.color??"#3396ff"}\n    `,e.html`${this.templateVisual()} ${this.templateSvg()}`}templateSvg(){const t='light'===this.theme?this.size:this.size-32;return e.svg`
      <svg height=${t} width=${t}>
        ${i.QrCodeUtil.generate({uri:this.uri,size:t,logoSize:this.arenaClear?0:t/4,dotColor:this.color})}
      </svg>
    `}templateVisual(){return this.imageSrc?e.html`<wui-image src=${this.imageSrc} alt=${this.alt??'logo'}></wui-image>`:this.farcaster?e.html`<wui-icon
        class="farcaster"
        size="inherit"
        color="inherit"
        name="farcaster"
      ></wui-icon>`:e.html`<wui-icon size="inherit" color="inherit" name="walletConnect"></wui-icon>`}};p.styles=[o.resetStyles,n.default],c([(0,t.property)()],p.prototype,"uri",void 0),c([(0,t.property)({type:Number})],p.prototype,"size",void 0),c([(0,t.property)()],p.prototype,"theme",void 0),c([(0,t.property)()],p.prototype,"imageSrc",void 0),c([(0,t.property)()],p.prototype,"alt",void 0),c([(0,t.property)()],p.prototype,"color",void 0),c([(0,t.property)({type:Boolean})],p.prototype,"arenaClear",void 0),c([(0,t.property)({type:Boolean})],p.prototype,"farcaster",void 0),p=c([(0,s.customElement)('wui-qr-code')],p)},9065,[4999,5775,7704,7714,9066,7697,7700,9067]);
__d(function(g,r,_i,_a,m,_e,d){"use strict";Object.defineProperty(_e,'__esModule',{value:!0}),Object.defineProperty(_e,"QrCodeUtil",{enumerable:!0,get:function(){return l}});var e,t=r(d[0]),o=(e=t)&&e.__esModule?e:{default:e},n=r(d[1]);function s(e,t,o){if(e===t)return!1;return(e-t<0?t-e:e-t)<=o+.1}function c(e,t){const n=Array.prototype.slice.call(o.default.create(e,{errorCorrectionLevel:t}).modules.data,0),s=Math.sqrt(n.length);return n.reduce((e,t,o)=>(o%s===0?e.push([t]):e[e.length-1].push(t))&&e,[])}const l={generate({uri:e,size:t,logoSize:o,dotColor:l="#141414"}){const h=[],u=c(e,'Q'),i=t/u.length,a=[{x:0,y:0},{x:1,y:0},{x:0,y:1}];a.forEach(({x:e,y:t})=>{const o=(u.length-7)*i*e,s=(u.length-7)*i*t,c=.45;for(let e=0;e<a.length;e+=1){const t=i*(7-2*e);h.push(n.svg`
            <rect
              fill=${2===e?l:"transparent"}
              width=${0===e?t-5:t}
              rx= ${0===e?(t-5)*c:t*c}
              ry= ${0===e?(t-5)*c:t*c}
              stroke=${l}
              stroke-width=${0===e?5:0}
              height=${0===e?t-5:t}
              x= ${0===e?s+i*e+2.5:s+i*e}
              y= ${0===e?o+i*e+2.5:o+i*e}
            />
          `)}});const f=Math.floor((o+25)/i),p=u.length/2-f/2,$=u.length/2+f/2-1,y=[];u.forEach((e,t)=>{e.forEach((e,o)=>{if(u[t][o]&&!(t<7&&o<7||t>u.length-8&&o<7||t<7&&o>u.length-8||t>p&&t<$&&o>p&&o<$)){const e=t*i+i/2,n=o*i+i/2;y.push([e,n])}})});const x={};return y.forEach(([e,t])=>{x[e]?x[e]?.push(t):x[e]=[t]}),Object.entries(x).map(([e,t])=>{const o=t.filter(e=>t.every(t=>!s(e,t,i)));return[Number(e),o]}).forEach(([e,t])=>{t.forEach(t=>{h.push(n.svg`<circle cx=${e} cy=${t} fill=${l} r=${i/2.5} />`)})}),Object.entries(x).filter(([e,t])=>t.length>1).map(([e,t])=>{const o=t.filter(e=>t.some(t=>s(e,t,i)));return[Number(e),o]}).map(([e,t])=>{t.sort((e,t)=>e<t?-1:1);const o=[];for(const e of t){const t=o.find(t=>t.some(t=>s(e,t,i)));t?t.push(e):o.push([e])}return[e,o.map(e=>[e[0],e[e.length-1]])]}).forEach(([e,t])=>{t.forEach(([t,o])=>{h.push(n.svg`
              <line
                x1=${e}
                x2=${e}
                y1=${t}
                y2=${o}
                stroke=${l}
                stroke-width=${i/1.25}
                stroke-linecap="round"
              />
            `)})}),h}}},9066,[997,4999]);
__d(function(g,r,i,a,m,e,d){"use strict";Object.defineProperty(e,'__esModule',{value:!0}),Object.defineProperty(e,"default",{enumerable:!0,get:function(){return o}});var o=r(d[0]).css`
  :host {
    position: relative;
    user-select: none;
    display: block;
    overflow: hidden;
    aspect-ratio: 1 / 1;
    width: var(--local-size);
  }

  :host([data-theme='dark']) {
    border-radius: clamp(0px, var(--wui-border-radius-l), 40px);
    background-color: var(--wui-color-inverse-100);
    padding: var(--wui-spacing-l);
  }

  :host([data-theme='light']) {
    box-shadow: 0 0 0 1px var(--wui-color-bg-125);
    background-color: var(--wui-color-bg-125);
  }

  :host([data-clear='true']) > wui-icon {
    display: none;
  }

  svg:first-child,
  wui-image,
  wui-icon {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateY(-50%) translateX(-50%);
  }

  wui-image {
    width: 25%;
    height: 25%;
    border-radius: var(--wui-border-radius-xs);
  }

  wui-icon {
    width: 100%;
    height: 100%;
    color: var(--local-icon-color) !important;
    transform: translateY(-50%) translateX(-50%) scale(0.25);
  }
`},9067,[4999]);
__d(function(g,r,i,a,m,e,d){"use strict";Object.defineProperty(e,'__esModule',{value:!0});var t=r(d[0]);Object.keys(t).forEach(function(n){'default'===n||Object.prototype.hasOwnProperty.call(e,n)||Object.defineProperty(e,n,{enumerable:!0,get:function(){return t[n]}})})},9068,[9069]);
__d(function(g,_r,_i,a,m,_e,_d){"use strict";Object.defineProperty(_e,'__esModule',{value:!0}),Object.defineProperty(_e,"WuiShimmer",{enumerable:!0,get:function(){return n}});var e,t=_r(_d[0]),r=_r(_d[1]),i=_r(_d[2]),o=_r(_d[3]),s=(e=o)&&e.__esModule?e:{default:e},d=this&&this.__decorate||function(e,t,r,i){var o,s=arguments.length,d=s<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,r):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)d=Reflect.decorate(e,t,r,i);else for(var n=e.length-1;n>=0;n--)(o=e[n])&&(d=(s<3?o(d):s>3?o(t,r,d):o(t,r))||d);return s>3&&d&&Object.defineProperty(t,r,d),d};let n=class extends t.LitElement{constructor(){super(...arguments),this.width='',this.height='',this.borderRadius='m',this.variant='default'}render(){return this.style.cssText=`\n      width: ${this.width};\n      height: ${this.height};\n      border-radius: clamp(0px,var(--wui-border-radius-${this.borderRadius}), 40px);\n    `,t.html`<slot></slot>`}};n.styles=[s.default],d([(0,r.property)()],n.prototype,"width",void 0),d([(0,r.property)()],n.prototype,"height",void 0),d([(0,r.property)()],n.prototype,"borderRadius",void 0),d([(0,r.property)()],n.prototype,"variant",void 0),n=d([(0,i.customElement)('wui-shimmer')],n)},9069,[4999,5775,7700,9070]);
__d(function(g,r,i,a,m,e,d){"use strict";Object.defineProperty(e,'__esModule',{value:!0}),Object.defineProperty(e,"default",{enumerable:!0,get:function(){return o}});var o=r(d[0]).css`
  :host {
    display: block;
    box-shadow: inset 0 0 0 1px var(--wui-color-gray-glass-005);
    background: linear-gradient(
      120deg,
      var(--wui-color-bg-200) 5%,
      var(--wui-color-bg-200) 48%,
      var(--wui-color-bg-300) 55%,
      var(--wui-color-bg-300) 60%,
      var(--wui-color-bg-300) calc(60% + 10px),
      var(--wui-color-bg-200) calc(60% + 12px),
      var(--wui-color-bg-200) 100%
    );
    background-size: 250%;
    animation: shimmer 3s linear infinite reverse;
  }

  :host([variant='light']) {
    background: linear-gradient(
      120deg,
      var(--wui-color-bg-150) 5%,
      var(--wui-color-bg-150) 48%,
      var(--wui-color-bg-200) 55%,
      var(--wui-color-bg-200) 60%,
      var(--wui-color-bg-200) calc(60% + 10px),
      var(--wui-color-bg-150) calc(60% + 12px),
      var(--wui-color-bg-150) 100%
    );
    background-size: 250%;
  }

  @keyframes shimmer {
    from {
      background-position: -250% 0;
    }
    to {
      background-position: 250% 0;
    }
  }
`},9070,[4999]);
__d(function(g,r,i,a,m,e,d){"use strict";Object.defineProperty(e,'__esModule',{value:!0});var t=r(d[0]);Object.keys(t).forEach(function(n){'default'===n||Object.prototype.hasOwnProperty.call(e,n)||Object.defineProperty(e,n,{enumerable:!0,get:function(){return t[n]}})})},9071,[9072]);
__d(function(g,_r,_i,a,m,_e,_d){"use strict";Object.defineProperty(_e,'__esModule',{value:!0}),Object.defineProperty(_e,"WuiUxByReown",{enumerable:!0,get:function(){return c}});var e=_r(_d[0]);_r(_d[1]),_r(_d[2]),_r(_d[3]);var t,n=_r(_d[4]),r=_r(_d[5]),l=_r(_d[6]),o=_r(_d[7]),i=(t=o)&&t.__esModule?t:{default:t},u=this&&this.__decorate||function(e,t,n,r){var l,o=arguments.length,i=o<3?t:null===r?r=Object.getOwnPropertyDescriptor(t,n):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)i=Reflect.decorate(e,t,n,r);else for(var u=e.length-1;u>=0;u--)(l=e[u])&&(i=(o<3?l(i):o>3?l(t,n,i):l(t,n))||i);return o>3&&i&&Object.defineProperty(t,n,i),i};let c=class extends e.LitElement{render(){return e.html`
      <a
        data-testid="ux-branding-reown"
        href=${n.REOWN_URL}
        rel="noreferrer"
        target="_blank"
        style="text-decoration: none;"
      >
        <wui-flex
          justifyContent="center"
          alignItems="center"
          gap="xs"
          .padding=${['0','0','l','0']}
        >
          <wui-text variant="small-500" color="fg-100"> UX by </wui-text>
          <wui-icon name="reown" size="xxxl" class="reown-logo"></wui-icon>
        </wui-flex>
      </a>
    `}};c.styles=[r.resetStyles,r.elementStyles,i.default],c=u([(0,l.customElement)('wui-ux-by-reown')],c)},9072,[4999,7704,7710,7702,9073,7697,7700,9074]);
__d(function(g,r,i,a,m,e,d){"use strict";Object.defineProperty(e,'__esModule',{value:!0}),Object.defineProperty(e,"specialCharactersRegex",{enumerable:!0,get:function(){return t}}),Object.defineProperty(e,"numbersRegex",{enumerable:!0,get:function(){return n}}),Object.defineProperty(e,"REOWN_URL",{enumerable:!0,get:function(){return u}});const t=/[.*+?^${}()|[\]\\]/gu,n=/[0-9,.]/u,u='https://reown.com'},9073,[]);
__d(function(g,r,i,a,m,e,d){"use strict";Object.defineProperty(e,'__esModule',{value:!0}),Object.defineProperty(e,"default",{enumerable:!0,get:function(){return t}});var t=r(d[0]).css`
  .reown-logo {
    height: var(--wui-spacing-xxl);
  }

  a {
    text-decoration: none;
    cursor: pointer;
  }

  a:hover {
    opacity: 0.9;
  }
`},9074,[4999]);
__d(function(g,r,i,a,m,e,d){"use strict";Object.defineProperty(e,'__esModule',{value:!0}),Object.defineProperty(e,"default",{enumerable:!0,get:function(){return t}});var t=r(d[0]).css`
  @keyframes fadein {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  wui-shimmer {
    width: 100%;
    aspect-ratio: 1 / 1;
    border-radius: clamp(0px, var(--wui-border-radius-l), 40px) !important;
  }

  wui-qr-code {
    opacity: 0;
    animation-duration: 200ms;
    animation-timing-function: ease;
    animation-name: fadein;
    animation-fill-mode: forwards;
  }
`},9075,[4999]);
__d(function(g,_r,_i,a,m,e,_d){"use strict";Object.defineProperty(e,'__esModule',{value:!0}),Object.defineProperty(e,"W3mConnectingWcUnsupported",{enumerable:!0,get:function(){return i}});var t=_r(_d[0]),l=_r(_d[1]),r=_r(_d[2]),n=_r(_d[3]);_r(_d[4]),_r(_d[5]),_r(_d[6]),_r(_d[7]);var o=this&&this.__decorate||function(t,l,r,n){var o,i=arguments.length,c=i<3?l:null===n?n=Object.getOwnPropertyDescriptor(l,r):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)c=Reflect.decorate(t,l,r,n);else for(var s=t.length-1;s>=0;s--)(o=t[s])&&(c=(i<3?o(c):i>3?o(l,r,c):o(l,r))||c);return i>3&&c&&Object.defineProperty(l,r,c),c};let i=class extends t.LitElement{constructor(){if(super(),this.wallet=r.RouterController.state.data?.wallet,!this.wallet)throw new Error('w3m-connecting-wc-unsupported: No wallet provided');r.EventsController.sendEvent({type:'track',event:'SELECT_WALLET',properties:{name:this.wallet.name,platform:'browser'}})}render(){return t.html`
      <wui-flex
        flexDirection="column"
        alignItems="center"
        .padding=${['3xl','xl','xl','xl']}
        gap="xl"
      >
        <wui-wallet-image
          size="lg"
          imageSrc=${(0,l.ifDefined)(r.AssetUtil.getWalletImage(this.wallet))}
        ></wui-wallet-image>

        <wui-text variant="paragraph-500" color="fg-100">Not Detected</wui-text>
      </wui-flex>

      <w3m-mobile-download-links .wallet=${this.wallet}></w3m-mobile-download-links>
    `}};i=o([(0,n.customElement)('w3m-connecting-wc-unsupported')],i)},9076,[4999,5786,7402,7695,7701,7721,9052,9053]);
__d(function(g,_r,_i,a,m,e,_d){"use strict";Object.defineProperty(e,'__esModule',{value:!0}),Object.defineProperty(e,"W3mConnectingWcWeb",{enumerable:!0,get:function(){return s}});var t=_r(_d[0]),n=_r(_d[1]),r=_r(_d[2]),o=_r(_d[3]),i=this&&this.__decorate||function(t,n,r,o){var i,s=arguments.length,c=s<3?n:null===o?o=Object.getOwnPropertyDescriptor(n,r):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)c=Reflect.decorate(t,n,r,o);else for(var l=t.length-1;l>=0;l--)(i=t[l])&&(c=(s<3?i(c):s>3?i(n,r,c):i(n,r))||c);return s>3&&c&&Object.defineProperty(n,r,c),c};let s=class extends o.W3mConnectingWidget{constructor(){if(super(),this.isLoading=!0,!this.wallet)throw new Error('w3m-connecting-wc-web: No wallet provided');this.onConnect=this.onConnectProxy.bind(this),this.secondaryBtnLabel='Open',this.secondaryLabel=n.ConstantsUtil.CONNECT_LABELS.MOBILE,this.secondaryBtnIcon='externalLink',this.updateLoadingState(),this.unsubscribe.push(n.ConnectionController.subscribeKey('wcUri',()=>{this.updateLoadingState()})),n.EventsController.sendEvent({type:'track',event:'SELECT_WALLET',properties:{name:this.wallet.name,platform:'web'}})}updateLoadingState(){this.isLoading=!this.uri}onConnectProxy(){if(this.wallet?.webapp_link&&this.uri)try{this.error=!1;const{webapp_link:t,name:r}=this.wallet,{redirect:o,href:i}=n.CoreHelperUtil.formatUniversalUrl(t,this.uri);n.ConnectionController.setWcLinking({name:r,href:i}),n.ConnectionController.setRecentWallet(this.wallet),n.CoreHelperUtil.openHref(o,'_blank')}catch{this.error=!0}}};i([(0,t.state)()],s.prototype,"isLoading",void 0),s=i([(0,r.customElement)('w3m-connecting-wc-web')],s)},9077,[5775,7402,7695,9041]);
__d(function(g,_r,_i,a,m,e,_d){"use strict";Object.defineProperty(e,'__esModule',{value:!0}),Object.defineProperty(e,"W3mAllWalletsView",{enumerable:!0,get:function(){return c}});var t=_r(_d[0]),i=_r(_d[1]),n=_r(_d[2]),l=_r(_d[3]),r=_r(_d[4]);_r(_d[5]),_r(_d[6]),_r(_d[7]),_r(_d[8]),_r(_d[9]),_r(_d[10]);var o=this&&this.__decorate||function(t,i,n,l){var r,o=arguments.length,c=o<3?i:null===l?l=Object.getOwnPropertyDescriptor(i,n):l;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)c=Reflect.decorate(t,i,n,l);else for(var s=t.length-1;s>=0;s--)(r=t[s])&&(c=(o<3?r(c):o>3?r(i,n,c):r(i,n))||c);return o>3&&c&&Object.defineProperty(i,n,c),c};let c=class extends t.LitElement{constructor(){super(...arguments),this.search='',this.onDebouncedSearch=l.CoreHelperUtil.debounce(t=>{this.search=t})}render(){const i=this.search.length>=2;return t.html`
      <wui-flex .padding=${['0','s','s','s']} gap="xs">
        <wui-search-bar @inputChange=${this.onInputChange.bind(this)}></wui-search-bar>
        <wui-certified-switch
          ?checked=${this.badge}
          @click=${this.onClick.bind(this)}
          data-testid="wui-certified-switch"
        ></wui-certified-switch>
        ${this.qrButtonTemplate()}
      </wui-flex>
      ${i||this.badge?t.html`<w3m-all-wallets-search
            query=${this.search}
            badge=${(0,n.ifDefined)(this.badge)}
          ></w3m-all-wallets-search>`:t.html`<w3m-all-wallets-list badge=${(0,n.ifDefined)(this.badge)}></w3m-all-wallets-list>`}
    `}onInputChange(t){this.onDebouncedSearch(t.detail)}onClick(){'certified'!==this.badge?(this.badge='certified',l.SnackController.showSvg('Only WalletConnect certified',{icon:'walletConnectBrown',iconColor:'accent-100'})):this.badge=void 0}qrButtonTemplate(){return l.CoreHelperUtil.isMobile()?t.html`
        <wui-icon-box
          size="lg"
          iconSize="xl"
          iconColor="accent-100"
          backgroundColor="accent-100"
          icon="qrCode"
          background="transparent"
          border
          borderColor="wui-accent-glass-010"
          @click=${this.onWalletConnectQr.bind(this)}
        ></wui-icon-box>
      `:null}onWalletConnectQr(){l.RouterController.push('ConnectingWalletConnect')}};o([(0,i.state)()],c.prototype,"search",void 0),o([(0,i.state)()],c.prototype,"badge",void 0),c=o([(0,r.customElement)('w3m-all-wallets-view')],c)},9078,[4999,5775,5786,7402,7695,9079,7701,9045,9084,9091,9102]);
__d(function(g,r,i,a,m,e,d){"use strict";Object.defineProperty(e,'__esModule',{value:!0});var t=r(d[0]);Object.keys(t).forEach(function(n){'default'===n||Object.prototype.hasOwnProperty.call(e,n)||Object.defineProperty(e,n,{enumerable:!0,get:function(){return t[n]}})})},9079,[9080]);
__d(function(g,_r,_i,a,m,_e,_d){"use strict";Object.defineProperty(_e,'__esModule',{value:!0}),Object.defineProperty(_e,"WuiCertifiedSwitch",{enumerable:!0,get:function(){return s}});var e=_r(_d[0]),t=_r(_d[1]),r=_r(_d[2]);_r(_d[3]);var c=_r(_d[4]),i=_r(_d[5]);_r(_d[6]);var n,o=_r(_d[7]),l=(n=o)&&n.__esModule?n:{default:n},u=this&&this.__decorate||function(e,t,r,c){var i,n=arguments.length,o=n<3?t:null===c?c=Object.getOwnPropertyDescriptor(t,r):c;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,r,c);else for(var l=e.length-1;l>=0;l--)(i=e[l])&&(o=(n<3?i(o):n>3?i(t,r,o):i(t,r))||o);return n>3&&o&&Object.defineProperty(t,r,o),o};let s=class extends e.LitElement{constructor(){super(...arguments),this.checked=void 0}render(){return e.html`
      <button>
        <wui-icon size="xl" name="walletConnectBrown"></wui-icon>
        <wui-switch ?checked=${(0,r.ifDefined)(this.checked)}></wui-switch>
      </button>
    `}};s.styles=[c.resetStyles,c.elementStyles,l.default],u([(0,t.property)({type:Boolean})],s.prototype,"checked",void 0),s=u([(0,i.customElement)('wui-certified-switch')],s)},9080,[4999,5775,5786,7704,7697,7700,9081,9083]);
__d(function(g,_r,_i,a,m,_e,_d){"use strict";Object.defineProperty(_e,'__esModule',{value:!0}),Object.defineProperty(_e,"WuiSwitch",{enumerable:!0,get:function(){return d}});var e,t=_r(_d[0]),n=_r(_d[1]),c=_r(_d[2]),i=_r(_d[3]),s=_r(_d[4]),r=_r(_d[5]),l=_r(_d[6]),o=(e=l)&&e.__esModule?e:{default:e},h=this&&this.__decorate||function(e,t,n,c){var i,s=arguments.length,r=s<3?t:null===c?c=Object.getOwnPropertyDescriptor(t,n):c;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(e,t,n,c);else for(var l=e.length-1;l>=0;l--)(i=e[l])&&(r=(s<3?i(r):s>3?i(t,n,r):i(t,n))||r);return s>3&&r&&Object.defineProperty(t,n,r),r};let d=class extends t.LitElement{constructor(){super(...arguments),this.inputElementRef=(0,i.createRef)(),this.checked=void 0}render(){return t.html`
      <label>
        <input
          ${(0,i.ref)(this.inputElementRef)}
          type="checkbox"
          ?checked=${(0,c.ifDefined)(this.checked)}
          @change=${this.dispatchChangeEvent.bind(this)}
        />
        <span></span>
      </label>
    `}dispatchChangeEvent(){this.dispatchEvent(new CustomEvent('switchChange',{detail:this.inputElementRef.value?.checked,bubbles:!0,composed:!0}))}};d.styles=[s.resetStyles,s.elementStyles,s.colorStyles,o.default],h([(0,n.property)({type:Boolean})],d.prototype,"checked",void 0),d=h([(0,r.customElement)('wui-switch')],d)},9081,[4999,5775,5786,5946,7697,7700,9082]);
__d(function(g,r,i,a,m,e,d){"use strict";Object.defineProperty(e,'__esModule',{value:!0}),Object.defineProperty(e,"default",{enumerable:!0,get:function(){return o}});var o=r(d[0]).css`
  :host {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  label {
    position: relative;
    display: inline-block;
    width: 32px;
    height: 22px;
  }

  input {
    width: 0;
    height: 0;
    opacity: 0;
  }

  span {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: var(--wui-color-blue-100);
    border-width: 1px;
    border-style: solid;
    border-color: var(--wui-color-gray-glass-002);
    border-radius: 999px;
    transition:
      background-color var(--wui-ease-inout-power-1) var(--wui-duration-md),
      border-color var(--wui-ease-inout-power-1) var(--wui-duration-md);
    will-change: background-color, border-color;
  }

  span:before {
    position: absolute;
    content: '';
    height: 16px;
    width: 16px;
    left: 3px;
    top: 2px;
    background-color: var(--wui-color-inverse-100);
    transition: transform var(--wui-ease-inout-power-1) var(--wui-duration-lg);
    will-change: transform;
    border-radius: 50%;
  }

  input:checked + span {
    border-color: var(--wui-color-gray-glass-005);
    background-color: var(--wui-color-blue-100);
  }

  input:not(:checked) + span {
    background-color: var(--wui-color-gray-glass-010);
  }

  input:checked + span:before {
    transform: translateX(calc(100% - 7px));
  }
`},9082,[4999]);
__d(function(g,r,i,a,m,e,d){"use strict";Object.defineProperty(e,'__esModule',{value:!0}),Object.defineProperty(e,"default",{enumerable:!0,get:function(){return o}});var o=r(d[0]).css`
  :host {
    height: 100%;
  }

  button {
    display: flex;
    align-items: center;
    justify-content: center;
    column-gap: var(--wui-spacing-1xs);
    padding: var(--wui-spacing-xs) var(--wui-spacing-s);
    background-color: var(--wui-color-gray-glass-002);
    border-radius: var(--wui-border-radius-xs);
    box-shadow: inset 0 0 0 1px var(--wui-color-gray-glass-002);
    transition: background-color var(--wui-ease-out-power-1) var(--wui-duration-md);
    will-change: background-color;
    cursor: pointer;
  }

  wui-switch {
    pointer-events: none;
  }
`},9083,[4999]);
__d(function(g,r,i,a,m,e,d){"use strict";Object.defineProperty(e,'__esModule',{value:!0});var t=r(d[0]);Object.keys(t).forEach(function(n){'default'===n||Object.prototype.hasOwnProperty.call(e,n)||Object.defineProperty(e,n,{enumerable:!0,get:function(){return t[n]}})})},9084,[9085]);
__d(function(g,_r,_i,a,m,_e,_d){"use strict";Object.defineProperty(_e,'__esModule',{value:!0}),Object.defineProperty(_e,"WuiSearchBar",{enumerable:!0,get:function(){return o}});var e=_r(_d[0]),t=_r(_d[1]);_r(_d[2]);var n=_r(_d[3]),r=_r(_d[4]);_r(_d[5]);var c,u=_r(_d[6]),i=(c=u)&&c.__esModule?c:{default:c},l=this&&this.__decorate||function(e,t,n,r){var c,u=arguments.length,i=u<3?t:null===r?r=Object.getOwnPropertyDescriptor(t,n):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)i=Reflect.decorate(e,t,n,r);else for(var l=e.length-1;l>=0;l--)(c=e[l])&&(i=(u<3?c(i):u>3?c(t,n,i):c(t,n))||i);return u>3&&i&&Object.defineProperty(t,n,i),i};let o=class extends e.LitElement{constructor(){super(...arguments),this.inputComponentRef=(0,t.createRef)()}render(){return e.html`
      <wui-input-text
        ${(0,t.ref)(this.inputComponentRef)}
        placeholder="Search wallet"
        icon="search"
        type="search"
        enterKeyHint="search"
        size="sm"
      >
        <wui-input-element @click=${this.clearValue} icon="close"></wui-input-element>
      </wui-input-text>
    `}clearValue(){const e=this.inputComponentRef.value,t=e?.inputElementRef.value;t&&(t.value='',t.focus(),t.dispatchEvent(new Event('input')))}};o.styles=[n.resetStyles,i.default],o=l([(0,r.customElement)('wui-search-bar')],o)},9085,[4999,5946,9086,7697,7700,9088,9090]);
__d(function(g,_r,_i,a,m,_e,_d){"use strict";Object.defineProperty(_e,'__esModule',{value:!0}),Object.defineProperty(_e,"WuiInputElement",{enumerable:!0,get:function(){return u}});var e=_r(_d[0]),t=_r(_d[1]);_r(_d[2]);var n,r=_r(_d[3]),o=_r(_d[4]),i=_r(_d[5]),c=(n=i)&&n.__esModule?n:{default:n},l=this&&this.__decorate||function(e,t,n,r){var o,i=arguments.length,c=i<3?t:null===r?r=Object.getOwnPropertyDescriptor(t,n):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)c=Reflect.decorate(e,t,n,r);else for(var l=e.length-1;l>=0;l--)(o=e[l])&&(c=(i<3?o(c):i>3?o(t,n,c):o(t,n))||c);return i>3&&c&&Object.defineProperty(t,n,c),c};let u=class extends e.LitElement{constructor(){super(...arguments),this.icon='copy'}render(){return e.html`
      <button>
        <wui-icon color="inherit" size="xxs" name=${this.icon}></wui-icon>
      </button>
    `}};u.styles=[r.resetStyles,r.elementStyles,c.default],l([(0,t.property)()],u.prototype,"icon",void 0),u=l([(0,o.customElement)('wui-input-element')],u)},9086,[4999,5775,7704,7697,7700,9087]);
__d(function(g,r,i,a,m,e,d){"use strict";Object.defineProperty(e,'__esModule',{value:!0}),Object.defineProperty(e,"default",{enumerable:!0,get:function(){return o}});var o=r(d[0]).css`
  button {
    background-color: var(--wui-color-fg-300);
    border-radius: var(--wui-border-radius-4xs);
    width: 16px;
    height: 16px;
  }

  button:disabled {
    background-color: var(--wui-color-bg-300);
  }

  wui-icon {
    color: var(--wui-color-bg-200) !important;
  }

  button:focus-visible {
    background-color: var(--wui-color-fg-250);
    border: 1px solid var(--wui-color-accent-100);
  }

  @media (hover: hover) and (pointer: fine) {
    button:hover:enabled {
      background-color: var(--wui-color-fg-250);
    }

    button:active:enabled {
      background-color: var(--wui-color-fg-225);
    }
  }
`},9087,[4999]);
__d(function(g,_r,_i,a,m,_e,_d){"use strict";Object.defineProperty(_e,'__esModule',{value:!0}),Object.defineProperty(_e,"WuiInputText",{enumerable:!0,get:function(){return h}});var t=_r(_d[0]),e=_r(_d[1]),i=_r(_d[2]),o=_r(_d[3]),n=_r(_d[4]);_r(_d[5]);var p,r=_r(_d[6]),s=_r(_d[7]),l=_r(_d[8]),d=(p=l)&&p.__esModule?p:{default:p},u=this&&this.__decorate||function(t,e,i,o){var n,p=arguments.length,r=p<3?e:null===o?o=Object.getOwnPropertyDescriptor(e,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(t,e,i,o);else for(var s=t.length-1;s>=0;s--)(n=t[s])&&(r=(p<3?n(r):p>3?n(e,i,r):n(e,i))||r);return p>3&&r&&Object.defineProperty(e,i,r),r};let h=class extends t.LitElement{constructor(){super(...arguments),this.inputElementRef=(0,n.createRef)(),this.size='md',this.disabled=!1,this.placeholder='',this.type='text',this.value=''}render(){const e=`wui-padding-right-${this.inputRightPadding}`,p=`wui-size-${this.size}`,r={[p]:!0,[e]:Boolean(this.inputRightPadding)};return t.html`${this.templateIcon()}
      <input
        data-testid="wui-input-text"
        ${(0,n.ref)(this.inputElementRef)}
        class=${(0,i.classMap)(r)}
        type=${this.type}
        enterkeyhint=${(0,o.ifDefined)(this.enterKeyHint)}
        ?disabled=${this.disabled}
        placeholder=${this.placeholder}
        @input=${this.dispatchInputChangeEvent.bind(this)}
        .value=${this.value||''}
        tabindex=${(0,o.ifDefined)(this.tabIdx)}
      />
      <slot></slot>`}templateIcon(){return this.icon?t.html`<wui-icon
        data-input=${this.size}
        size=${this.size}
        color="inherit"
        name=${this.icon}
      ></wui-icon>`:null}dispatchInputChangeEvent(){this.dispatchEvent(new CustomEvent('inputChange',{detail:this.inputElementRef.value?.value,bubbles:!0,composed:!0}))}};h.styles=[r.resetStyles,r.elementStyles,d.default],u([(0,e.property)()],h.prototype,"size",void 0),u([(0,e.property)()],h.prototype,"icon",void 0),u([(0,e.property)({type:Boolean})],h.prototype,"disabled",void 0),u([(0,e.property)()],h.prototype,"placeholder",void 0),u([(0,e.property)()],h.prototype,"type",void 0),u([(0,e.property)()],h.prototype,"keyHint",void 0),u([(0,e.property)()],h.prototype,"value",void 0),u([(0,e.property)()],h.prototype,"inputRightPadding",void 0),u([(0,e.property)()],h.prototype,"tabIdx",void 0),h=u([(0,s.customElement)('wui-input-text')],h)},9088,[4999,5775,5820,5786,5946,7704,7697,7700,9089]);
__d(function(g,r,i,a,m,e,d){"use strict";Object.defineProperty(e,'__esModule',{value:!0}),Object.defineProperty(e,"default",{enumerable:!0,get:function(){return n}});var n=r(d[0]).css`
  :host {
    position: relative;
    width: 100%;
    display: inline-block;
    color: var(--wui-color-fg-275);
  }

  input {
    width: 100%;
    border-radius: var(--wui-border-radius-xs);
    box-shadow: inset 0 0 0 1px var(--wui-color-gray-glass-002);
    background: var(--wui-color-gray-glass-002);
    font-size: var(--wui-font-size-paragraph);
    letter-spacing: var(--wui-letter-spacing-paragraph);
    color: var(--wui-color-fg-100);
    transition:
      background-color var(--wui-ease-inout-power-1) var(--wui-duration-md),
      border-color var(--wui-ease-inout-power-1) var(--wui-duration-md),
      box-shadow var(--wui-ease-inout-power-1) var(--wui-duration-md);
    will-change: background-color, border-color, box-shadow;
    caret-color: var(--wui-color-accent-100);
  }

  input:disabled {
    cursor: not-allowed;
    border: 1px solid var(--wui-color-gray-glass-010);
  }

  input:disabled::placeholder,
  input:disabled + wui-icon {
    color: var(--wui-color-fg-300);
  }

  input::placeholder {
    color: var(--wui-color-fg-275);
  }

  input:focus:enabled {
    background-color: var(--wui-color-gray-glass-005);
    -webkit-box-shadow:
      inset 0 0 0 1px var(--wui-color-accent-100),
      0px 0px 0px 4px var(--wui-box-shadow-blue);
    -moz-box-shadow:
      inset 0 0 0 1px var(--wui-color-accent-100),
      0px 0px 0px 4px var(--wui-box-shadow-blue);
    box-shadow:
      inset 0 0 0 1px var(--wui-color-accent-100),
      0px 0px 0px 4px var(--wui-box-shadow-blue);
  }

  input:hover:enabled {
    background-color: var(--wui-color-gray-glass-005);
  }

  wui-icon {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    pointer-events: none;
  }

  .wui-size-sm {
    padding: 9px var(--wui-spacing-m) 10px var(--wui-spacing-s);
  }

  wui-icon + .wui-size-sm {
    padding: 9px var(--wui-spacing-m) 10px 36px;
  }

  wui-icon[data-input='sm'] {
    left: var(--wui-spacing-s);
  }

  .wui-size-md {
    padding: 15px var(--wui-spacing-m) var(--wui-spacing-l) var(--wui-spacing-m);
  }

  wui-icon + .wui-size-md,
  wui-loading-spinner + .wui-size-md {
    padding: 10.5px var(--wui-spacing-3xl) 10.5px var(--wui-spacing-3xl);
  }

  wui-icon[data-input='md'] {
    left: var(--wui-spacing-l);
  }

  .wui-size-lg {
    padding: var(--wui-spacing-s) var(--wui-spacing-s) var(--wui-spacing-s) var(--wui-spacing-l);
    letter-spacing: var(--wui-letter-spacing-medium-title);
    font-size: var(--wui-font-size-medium-title);
    font-weight: var(--wui-font-weight-light);
    line-height: 130%;
    color: var(--wui-color-fg-100);
    height: 64px;
  }

  .wui-padding-right-xs {
    padding-right: var(--wui-spacing-xs);
  }

  .wui-padding-right-s {
    padding-right: var(--wui-spacing-s);
  }

  .wui-padding-right-m {
    padding-right: var(--wui-spacing-m);
  }

  .wui-padding-right-l {
    padding-right: var(--wui-spacing-l);
  }

  .wui-padding-right-xl {
    padding-right: var(--wui-spacing-xl);
  }

  .wui-padding-right-2xl {
    padding-right: var(--wui-spacing-2xl);
  }

  .wui-padding-right-3xl {
    padding-right: var(--wui-spacing-3xl);
  }

  .wui-padding-right-4xl {
    padding-right: var(--wui-spacing-4xl);
  }

  .wui-padding-right-5xl {
    padding-right: var(--wui-spacing-5xl);
  }

  wui-icon + .wui-size-lg,
  wui-loading-spinner + .wui-size-lg {
    padding-left: 50px;
  }

  wui-icon[data-input='lg'] {
    left: var(--wui-spacing-l);
  }

  .wui-size-mdl {
    padding: 17.25px var(--wui-spacing-m) 17.25px var(--wui-spacing-m);
  }
  wui-icon + .wui-size-mdl,
  wui-loading-spinner + .wui-size-mdl {
    padding: 17.25px var(--wui-spacing-3xl) 17.25px 40px;
  }
  wui-icon[data-input='mdl'] {
    left: var(--wui-spacing-m);
  }

  input:placeholder-shown ~ ::slotted(wui-input-element),
  input:placeholder-shown ~ ::slotted(wui-icon) {
    opacity: 0;
    pointer-events: none;
  }

  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  input[type='number'] {
    -moz-appearance: textfield;
  }

  ::slotted(wui-input-element),
  ::slotted(wui-icon) {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
  }

  ::slotted(wui-input-element) {
    right: var(--wui-spacing-m);
  }

  ::slotted(wui-icon) {
    right: 0px;
  }
`},9089,[4999]);
__d(function(g,r,i,a,m,e,d){"use strict";Object.defineProperty(e,'__esModule',{value:!0}),Object.defineProperty(e,"default",{enumerable:!0,get:function(){return t}});var t=r(d[0]).css`
  :host {
    position: relative;
    display: inline-block;
    width: 100%;
  }
`},9090,[4999]);
__d(function(g,_r,_i,a,m,_e,_d){"use strict";Object.defineProperty(_e,'__esModule',{value:!0}),Object.defineProperty(_e,"W3mAllWalletsList",{enumerable:!0,get:function(){return p}});var e=_r(_d[0]),t=_r(_d[1]),l=_r(_d[2]),i=_r(_d[3]),r=_r(_d[4]);_r(_d[5]),_r(_d[6]);var s=_r(_d[7]);_r(_d[8]);var o,n=_r(_d[9]),d=(o=n)&&o.__esModule?o:{default:o},c=this&&this.__decorate||function(e,t,l,i){var r,s=arguments.length,o=s<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,l):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,l,i);else for(var n=e.length-1;n>=0;n--)(r=e[n])&&(o=(s<3?r(o):s>3?r(t,l,o):r(t,l))||o);return s>3&&o&&Object.defineProperty(t,l,o),o};const h='local-paginator';let p=class extends e.LitElement{constructor(){super(),this.unsubscribe=[],this.paginationObserver=void 0,this.loading=!i.ApiController.state.wallets.length,this.wallets=i.ApiController.state.wallets,this.recommended=i.ApiController.state.recommended,this.featured=i.ApiController.state.featured,this.filteredWallets=i.ApiController.state.filteredWallets,this.unsubscribe.push(i.ApiController.subscribeKey('wallets',e=>this.wallets=e),i.ApiController.subscribeKey('recommended',e=>this.recommended=e),i.ApiController.subscribeKey('featured',e=>this.featured=e),i.ApiController.subscribeKey('filteredWallets',e=>this.filteredWallets=e))}firstUpdated(){this.initialFetch(),this.createPaginationObserver()}disconnectedCallback(){this.unsubscribe.forEach(e=>e()),this.paginationObserver?.disconnect()}render(){return e.html`
      <wui-grid
        data-scroll=${!this.loading}
        .padding=${['0','s','s','s']}
        columnGap="xxs"
        rowGap="l"
        justifyContent="space-between"
      >
        ${this.loading?this.shimmerTemplate(16):this.walletsTemplate()}
        ${this.paginationLoaderTemplate()}
      </wui-grid>
    `}async initialFetch(){this.loading=!0;const e=this.shadowRoot?.querySelector('wui-grid');e&&(await i.ApiController.fetchWalletsByPage({page:1}),await e.animate([{opacity:1},{opacity:0}],{duration:200,fill:'forwards',easing:'ease'}).finished,this.loading=!1,e.animate([{opacity:0},{opacity:1}],{duration:200,fill:'forwards',easing:'ease'}))}shimmerTemplate(t,i){return[...Array(t)].map(()=>e.html`
        <wui-card-select-loader type="wallet" id=${(0,l.ifDefined)(i)}></wui-card-select-loader>
      `)}walletsTemplate(){const t=this.filteredWallets?.length>0?i.CoreHelperUtil.uniqueBy([...this.featured,...this.recommended,...this.filteredWallets],'id'):i.CoreHelperUtil.uniqueBy([...this.featured,...this.recommended,...this.wallets],'id');return s.WalletUtil.markWalletsAsInstalled(t).map(t=>e.html`
        <w3m-all-wallets-list-item
          @click=${()=>this.onConnectWallet(t)}
          .wallet=${t}
        ></w3m-all-wallets-list-item>
      `)}paginationLoaderTemplate(){const{wallets:e,recommended:t,featured:l,count:r}=i.ApiController.state,s=window.innerWidth<352?3:4,o=e.length+t.length;let n=Math.ceil(o/s)*s-o+s;return n-=e.length?l.length%s:0,0===r&&l.length>0?null:0===r||[...l,...e,...t].length<r?this.shimmerTemplate(n,h):null}createPaginationObserver(){const e=this.shadowRoot?.querySelector(`#${h}`);e&&(this.paginationObserver=new IntersectionObserver(([e])=>{if(e?.isIntersecting&&!this.loading){const{page:e,count:t,wallets:l}=i.ApiController.state;l.length<t&&i.ApiController.fetchWalletsByPage({page:e+1})}}),this.paginationObserver.observe(e))}onConnectWallet(e){i.ConnectorController.selectWalletConnector(e)}};p.styles=d.default,c([(0,t.state)()],p.prototype,"loading",void 0),c([(0,t.state)()],p.prototype,"wallets",void 0),c([(0,t.state)()],p.prototype,"recommended",void 0),c([(0,t.state)()],p.prototype,"featured",void 0),c([(0,t.state)()],p.prototype,"filteredWallets",void 0),p=c([(0,r.customElement)('w3m-all-wallets-list')],p)},9091,[4999,5775,5786,7402,7695,9092,9096,7693,9099,9101]);
__d(function(g,r,i,a,m,e,d){"use strict";Object.defineProperty(e,'__esModule',{value:!0});var t=r(d[0]);Object.keys(t).forEach(function(n){'default'===n||Object.prototype.hasOwnProperty.call(e,n)||Object.defineProperty(e,n,{enumerable:!0,get:function(){return t[n]}})})},9092,[9093]);
__d(function(g,_r,_i,a,m,_e,_d){"use strict";Object.defineProperty(_e,'__esModule',{value:!0}),Object.defineProperty(_e,"WuiCardSelectLoader",{enumerable:!0,get:function(){return h}});var e=_r(_d[0]),t=_r(_d[1]),r=_r(_d[2]);_r(_d[3]);var i,s=_r(_d[4]),l=_r(_d[5]),o=_r(_d[6]),u=(i=o)&&i.__esModule?i:{default:i},d=this&&this.__decorate||function(e,t,r,i){var s,l=arguments.length,o=l<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,r):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,r,i);else for(var u=e.length-1;u>=0;u--)(s=e[u])&&(o=(l<3?s(o):l>3?s(t,r,o):s(t,r))||o);return l>3&&o&&Object.defineProperty(t,r,o),o};let h=class extends e.LitElement{constructor(){super(...arguments),this.type='wallet'}render(){return e.html`
      ${this.shimmerTemplate()}
      <wui-shimmer width="56px" height="20px" borderRadius="xs"></wui-shimmer>
    `}shimmerTemplate(){return'network'===this.type?e.html` <wui-shimmer
          data-type=${this.type}
          width="48px"
          height="54px"
          borderRadius="xs"
        ></wui-shimmer>
        ${r.networkSvgMd}`:e.html`<wui-shimmer width="56px" height="56px" borderRadius="xs"></wui-shimmer>`}};h.styles=[s.resetStyles,s.elementStyles,u.default],d([(0,t.property)()],h.prototype,"type",void 0),h=d([(0,l.customElement)('wui-card-select-loader')],h)},9093,[4999,5775,9094,9069,7697,7700,9095]);
__d(function(g,r,i,a,m,e,d){"use strict";Object.defineProperty(e,'__esModule',{value:!0}),Object.defineProperty(e,"networkSvgMd",{enumerable:!0,get:function(){return t}});const t=r(d[0]).svg`<svg  viewBox="0 0 48 54" fill="none">
  <path
    d="M43.4605 10.7248L28.0485 1.61089C25.5438 0.129705 22.4562 0.129705 19.9515 1.61088L4.53951 10.7248C2.03626 12.2051 0.5 14.9365 0.5 17.886V36.1139C0.5 39.0635 2.03626 41.7949 4.53951 43.2752L19.9515 52.3891C22.4562 53.8703 25.5438 53.8703 28.0485 52.3891L43.4605 43.2752C45.9637 41.7949 47.5 39.0635 47.5 36.114V17.8861C47.5 14.9365 45.9637 12.2051 43.4605 10.7248Z"
  />
</svg>`},9094,[4999]);
__d(function(g,r,i,a,m,e,d){"use strict";Object.defineProperty(e,'__esModule',{value:!0}),Object.defineProperty(e,"default",{enumerable:!0,get:function(){return t}});var t=r(d[0]).css`
  :host {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 104px;
    row-gap: var(--wui-spacing-xs);
    padding: var(--wui-spacing-xs) 10px;
    background-color: var(--wui-color-gray-glass-002);
    border-radius: clamp(0px, var(--wui-border-radius-xs), 20px);
    position: relative;
  }

  wui-shimmer[data-type='network'] {
    border: none;
    -webkit-clip-path: var(--wui-path-network);
    clip-path: var(--wui-path-network);
  }

  svg {
    position: absolute;
    width: 48px;
    height: 54px;
    z-index: 1;
  }

  svg > path {
    stroke: var(--wui-color-gray-glass-010);
    stroke-width: 1px;
  }

  @media (max-width: 350px) {
    :host {
      width: 100%;
    }
  }
`},9095,[4999]);
__d(function(g,r,i,a,m,e,d){"use strict";Object.defineProperty(e,'__esModule',{value:!0});var t=r(d[0]);Object.keys(t).forEach(function(n){'default'===n||Object.prototype.hasOwnProperty.call(e,n)||Object.defineProperty(e,n,{enumerable:!0,get:function(){return t[n]}})})},9096,[9097]);
__d(function(g,_r,_i,a,m,_e,_d){"use strict";Object.defineProperty(_e,'__esModule',{value:!0}),Object.defineProperty(_e,"WuiGrid",{enumerable:!0,get:function(){return d}});var t,e=_r(_d[0]),i=_r(_d[1]),n=_r(_d[2]),p=_r(_d[3]),r=_r(_d[4]),o=_r(_d[5]),s=(t=o)&&t.__esModule?t:{default:t},l=this&&this.__decorate||function(t,e,i,n){var p,r=arguments.length,o=r<3?e:null===n?n=Object.getOwnPropertyDescriptor(e,i):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(t,e,i,n);else for(var s=t.length-1;s>=0;s--)(p=t[s])&&(o=(r<3?p(o):r>3?p(e,i,o):p(e,i))||o);return r>3&&o&&Object.defineProperty(e,i,o),o};let d=class extends e.LitElement{render(){return this.style.cssText=`\n      grid-template-rows: ${this.gridTemplateRows};\n      grid-template-columns: ${this.gridTemplateColumns};\n      justify-items: ${this.justifyItems};\n      align-items: ${this.alignItems};\n      justify-content: ${this.justifyContent};\n      align-content: ${this.alignContent};\n      column-gap: ${this.columnGap&&`var(--wui-spacing-${this.columnGap})`};\n      row-gap: ${this.rowGap&&`var(--wui-spacing-${this.rowGap})`};\n      gap: ${this.gap&&`var(--wui-spacing-${this.gap})`};\n      padding-top: ${this.padding&&p.UiHelperUtil.getSpacingStyles(this.padding,0)};\n      padding-right: ${this.padding&&p.UiHelperUtil.getSpacingStyles(this.padding,1)};\n      padding-bottom: ${this.padding&&p.UiHelperUtil.getSpacingStyles(this.padding,2)};\n      padding-left: ${this.padding&&p.UiHelperUtil.getSpacingStyles(this.padding,3)};\n      margin-top: ${this.margin&&p.UiHelperUtil.getSpacingStyles(this.margin,0)};\n      margin-right: ${this.margin&&p.UiHelperUtil.getSpacingStyles(this.margin,1)};\n      margin-bottom: ${this.margin&&p.UiHelperUtil.getSpacingStyles(this.margin,2)};\n      margin-left: ${this.margin&&p.UiHelperUtil.getSpacingStyles(this.margin,3)};\n    `,e.html`<slot></slot>`}};d.styles=[n.resetStyles,s.default],l([(0,i.property)()],d.prototype,"gridTemplateRows",void 0),l([(0,i.property)()],d.prototype,"gridTemplateColumns",void 0),l([(0,i.property)()],d.prototype,"justifyItems",void 0),l([(0,i.property)()],d.prototype,"alignItems",void 0),l([(0,i.property)()],d.prototype,"justifyContent",void 0),l([(0,i.property)()],d.prototype,"alignContent",void 0),l([(0,i.property)()],d.prototype,"columnGap",void 0),l([(0,i.property)()],d.prototype,"rowGap",void 0),l([(0,i.property)()],d.prototype,"gap",void 0),l([(0,i.property)()],d.prototype,"padding",void 0),l([(0,i.property)()],d.prototype,"margin",void 0),d=l([(0,r.customElement)('wui-grid')],d)},9097,[4999,5775,7697,7698,7700,9098]);
__d(function(g,r,i,a,m,e,d){"use strict";Object.defineProperty(e,'__esModule',{value:!0}),Object.defineProperty(e,"default",{enumerable:!0,get:function(){return t}});var t=r(d[0]).css`
  :host {
    display: grid;
    width: inherit;
    height: inherit;
  }
`},9098,[4999]);
__d(function(g,_r,_i,a,m,_e,_d){"use strict";Object.defineProperty(_e,'__esModule',{value:!0}),Object.defineProperty(_e,"W3mAllWalletsListItem",{enumerable:!0,get:function(){return h}});var e=_r(_d[0]),t=_r(_d[1]),i=_r(_d[2]),s=_r(_d[3]),l=_r(_d[4]);_r(_d[5]),_r(_d[6]),_r(_d[7]),_r(_d[8]),_r(_d[9]);var r,n=_r(_d[10]),o=(r=n)&&r.__esModule?r:{default:r},c=this&&this.__decorate||function(e,t,i,s){var l,r=arguments.length,n=r<3?t:null===s?s=Object.getOwnPropertyDescriptor(t,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,i,s);else for(var o=e.length-1;o>=0;o--)(l=e[o])&&(n=(r<3?l(n):r>3?l(t,i,n):l(t,i))||n);return r>3&&n&&Object.defineProperty(t,i,n),n};let h=class extends e.LitElement{constructor(){super(),this.observer=new IntersectionObserver(()=>{}),this.visible=!1,this.imageSrc=void 0,this.imageLoading=!1,this.wallet=void 0,this.observer=new IntersectionObserver(e=>{e.forEach(e=>{e.isIntersecting?(this.visible=!0,this.fetchImageSrc()):this.visible=!1})},{threshold:.01})}firstUpdated(){this.observer.observe(this)}disconnectedCallback(){this.observer.disconnect()}render(){const t='certified'===this.wallet?.badge_type;return e.html`
      <button>
        ${this.imageTemplate()}
        <wui-flex flexDirection="row" alignItems="center" justifyContent="center" gap="3xs">
          <wui-text
            variant="tiny-500"
            color="inherit"
            class=${(0,i.ifDefined)(t?'certified':void 0)}
            >${this.wallet?.name}</wui-text
          >
          ${t?e.html`<wui-icon size="sm" name="walletConnectBrown"></wui-icon>`:null}
        </wui-flex>
      </button>
    `}imageTemplate(){return!this.visible&&!this.imageSrc||this.imageLoading?this.shimmerTemplate():e.html`
      <wui-wallet-image
        size="md"
        imageSrc=${(0,i.ifDefined)(this.imageSrc)}
        name=${this.wallet?.name}
        .installed=${this.wallet?.installed}
        badgeSize="sm"
      >
      </wui-wallet-image>
    `}shimmerTemplate(){return e.html`<wui-shimmer width="56px" height="56px" borderRadius="xs"></wui-shimmer>`}async fetchImageSrc(){this.wallet&&(this.imageSrc=s.AssetUtil.getWalletImage(this.wallet),this.imageSrc||(this.imageLoading=!0,this.imageSrc=await s.AssetUtil.fetchWalletImage(this.wallet.image_id),this.imageLoading=!1))}};h.styles=o.default,c([(0,t.state)()],h.prototype,"visible",void 0),c([(0,t.state)()],h.prototype,"imageSrc",void 0),c([(0,t.state)()],h.prototype,"imageLoading",void 0),c([(0,t.property)()],h.prototype,"wallet",void 0),h=c([(0,l.customElement)('w3m-all-wallets-list-item')],h)},9099,[4999,5775,5786,7402,7695,7701,7720,9068,7721,9052,9100]);
__d(function(g,r,i,a,m,e,d){"use strict";Object.defineProperty(e,'__esModule',{value:!0}),Object.defineProperty(e,"default",{enumerable:!0,get:function(){return o}});var o=r(d[0]).css`
  button {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    width: 104px;
    row-gap: var(--wui-spacing-xs);
    padding: var(--wui-spacing-s) var(--wui-spacing-0);
    background-color: var(--wui-color-gray-glass-002);
    border-radius: clamp(0px, var(--wui-border-radius-xs), 20px);
    transition:
      color var(--wui-duration-lg) var(--wui-ease-out-power-1),
      background-color var(--wui-duration-lg) var(--wui-ease-out-power-1),
      border-radius var(--wui-duration-lg) var(--wui-ease-out-power-1);
    will-change: background-color, color, border-radius;
    outline: none;
    border: none;
  }

  button > wui-flex > wui-text {
    color: var(--wui-color-fg-100);
    max-width: 86px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    justify-content: center;
  }

  button > wui-flex > wui-text.certified {
    max-width: 66px;
  }

  button:hover:enabled {
    background-color: var(--wui-color-gray-glass-005);
  }

  button:disabled > wui-flex > wui-text {
    color: var(--wui-color-gray-glass-015);
  }

  [data-selected='true'] {
    background-color: var(--wui-color-accent-glass-020);
  }

  @media (hover: hover) and (pointer: fine) {
    [data-selected='true']:hover:enabled {
      background-color: var(--wui-color-accent-glass-015);
    }
  }

  [data-selected='true']:active:enabled {
    background-color: var(--wui-color-accent-glass-010);
  }

  @media (max-width: 350px) {
    button {
      width: 100%;
    }
  }
`},9100,[4999]);
__d(function(g,r,i,a,m,e,d){"use strict";Object.defineProperty(e,'__esModule',{value:!0}),Object.defineProperty(e,"default",{enumerable:!0,get:function(){return t}});var t=r(d[0]).css`
  wui-grid {
    max-height: clamp(360px, 400px, 80vh);
    overflow: scroll;
    scrollbar-width: none;
    grid-auto-rows: min-content;
    grid-template-columns: repeat(auto-fill, 104px);
  }

  @media (max-width: 350px) {
    wui-grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  wui-grid[data-scroll='false'] {
    overflow: hidden;
  }

  wui-grid::-webkit-scrollbar {
    display: none;
  }

  wui-loading-spinner {
    padding-top: var(--wui-spacing-l);
    padding-bottom: var(--wui-spacing-l);
    justify-content: center;
    grid-column: 1 / span 4;
  }
`},9101,[4999]);
__d(function(g,_r,_i,a,m,_e,_d){"use strict";Object.defineProperty(_e,'__esModule',{value:!0}),Object.defineProperty(_e,"W3mAllWalletsSearch",{enumerable:!0,get:function(){return d}});var e=_r(_d[0]),t=_r(_d[1]),l=_r(_d[2]),r=_r(_d[3]);_r(_d[4]),_r(_d[5]),_r(_d[6]),_r(_d[7]),_r(_d[8]);var i=_r(_d[9]);_r(_d[10]);var o,n=_r(_d[11]),s=(o=n)&&o.__esModule?o:{default:o},c=this&&this.__decorate||function(e,t,l,r){var i,o=arguments.length,n=o<3?t:null===r?r=Object.getOwnPropertyDescriptor(t,l):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,l,r);else for(var s=e.length-1;s>=0;s--)(i=e[s])&&(n=(o<3?i(n):o>3?i(t,l,n):i(t,l))||n);return o>3&&n&&Object.defineProperty(t,l,n),n};let d=class extends e.LitElement{constructor(){super(...arguments),this.prevQuery='',this.prevBadge=void 0,this.loading=!0,this.query=''}render(){return this.onSearch(),this.loading?e.html`<wui-loading-spinner color="accent-100"></wui-loading-spinner>`:this.walletsTemplate()}async onSearch(){this.query.trim()===this.prevQuery.trim()&&this.badge===this.prevBadge||(this.prevQuery=this.query,this.prevBadge=this.badge,this.loading=!0,await l.ApiController.searchWallet({search:this.query,badge:this.badge}),this.loading=!1)}walletsTemplate(){const{search:t}=l.ApiController.state,r=i.WalletUtil.markWalletsAsInstalled(t);return t.length?e.html`
      <wui-grid
        data-testid="wallet-list"
        .padding=${['0','s','s','s']}
        rowGap="l"
        columnGap="xs"
        justifyContent="space-between"
      >
        ${r.map(t=>e.html`
            <w3m-all-wallets-list-item
              @click=${()=>this.onConnectWallet(t)}
              .wallet=${t}
              data-testid="wallet-search-item-${t.id}"
            ></w3m-all-wallets-list-item>
          `)}
      </wui-grid>
    `:e.html`
        <wui-flex
          data-testid="no-wallet-found"
          justifyContent="center"
          alignItems="center"
          gap="s"
          flexDirection="column"
        >
          <wui-icon-box
            size="lg"
            iconColor="fg-200"
            backgroundColor="fg-300"
            icon="wallet"
            background="transparent"
          ></wui-icon-box>
          <wui-text data-testid="no-wallet-found-text" color="fg-200" variant="paragraph-500">
            No Wallet found
          </wui-text>
        </wui-flex>
      `}onConnectWallet(e){l.ConnectorController.selectWalletConnector(e)}};d.styles=s.default,c([(0,t.state)()],d.prototype,"loading",void 0),c([(0,t.property)()],d.prototype,"query",void 0),c([(0,t.property)()],d.prototype,"badge",void 0),d=c([(0,r.customElement)('w3m-all-wallets-search')],d)},9102,[4999,5775,7402,7695,7701,9096,9045,9103,7721,7693,9099,9104]);
__d(function(g,r,i,a,m,e,d){"use strict";Object.defineProperty(e,'__esModule',{value:!0});var t=r(d[0]);Object.keys(t).forEach(function(n){'default'===n||Object.prototype.hasOwnProperty.call(e,n)||Object.defineProperty(e,n,{enumerable:!0,get:function(){return t[n]}})})},9103,[7718]);
__d(function(g,r,i,a,m,e,d){"use strict";Object.defineProperty(e,'__esModule',{value:!0}),Object.defineProperty(e,"default",{enumerable:!0,get:function(){return t}});var t=r(d[0]).css`
  wui-grid,
  wui-loading-spinner,
  wui-flex {
    height: 360px;
  }

  wui-grid {
    overflow: scroll;
    scrollbar-width: none;
    grid-auto-rows: min-content;
    grid-template-columns: repeat(auto-fill, 104px);
  }

  wui-grid[data-scroll='false'] {
    overflow: hidden;
  }

  wui-grid::-webkit-scrollbar {
    display: none;
  }

  wui-loading-spinner {
    justify-content: center;
    align-items: center;
  }

  @media (max-width: 350px) {
    wui-grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }
`},9104,[4999]);
__d(function(g,_r,_i,a,m,e,_d){"use strict";Object.defineProperty(e,'__esModule',{value:!0}),Object.defineProperty(e,"W3mDownloadsView",{enumerable:!0,get:function(){return l}});var t=_r(_d[0]),i=_r(_d[1]),r=_r(_d[2]);_r(_d[3]),_r(_d[4]),_r(_d[5]);var o=this&&this.__decorate||function(t,i,r,o){var l,n=arguments.length,s=n<3?i:null===o?o=Object.getOwnPropertyDescriptor(i,r):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)s=Reflect.decorate(t,i,r,o);else for(var p=t.length-1;p>=0;p--)(l=t[p])&&(s=(n<3?l(s):n>3?l(i,r,s):l(i,r))||s);return n>3&&s&&Object.defineProperty(i,r,s),s};let l=class extends t.LitElement{constructor(){super(...arguments),this.wallet=i.RouterController.state.data?.wallet}render(){if(!this.wallet)throw new Error('w3m-downloads-view');return t.html`
      <wui-flex gap="xs" flexDirection="column" .padding=${['s','s','l','s']}>
        ${this.chromeTemplate()} ${this.iosTemplate()} ${this.androidTemplate()}
        ${this.homepageTemplate()}
      </wui-flex>
    `}chromeTemplate(){return this.wallet?.chrome_store?t.html`<wui-list-item
      variant="icon"
      icon="chromeStore"
      iconVariant="square"
      @click=${this.onChromeStore.bind(this)}
      chevron
    >
      <wui-text variant="paragraph-500" color="fg-100">Chrome Extension</wui-text>
    </wui-list-item>`:null}iosTemplate(){return this.wallet?.app_store?t.html`<wui-list-item
      variant="icon"
      icon="appStore"
      iconVariant="square"
      @click=${this.onAppStore.bind(this)}
      chevron
    >
      <wui-text variant="paragraph-500" color="fg-100">iOS App</wui-text>
    </wui-list-item>`:null}androidTemplate(){return this.wallet?.play_store?t.html`<wui-list-item
      variant="icon"
      icon="playStore"
      iconVariant="square"
      @click=${this.onPlayStore.bind(this)}
      chevron
    >
      <wui-text variant="paragraph-500" color="fg-100">Android App</wui-text>
    </wui-list-item>`:null}homepageTemplate(){return this.wallet?.homepage?t.html`
      <wui-list-item
        variant="icon"
        icon="browser"
        iconVariant="square-blue"
        @click=${this.onHomePage.bind(this)}
        chevron
      >
        <wui-text variant="paragraph-500" color="fg-100">Website</wui-text>
      </wui-list-item>
    `:null}onChromeStore(){this.wallet?.chrome_store&&i.CoreHelperUtil.openHref(this.wallet.chrome_store,'_blank')}onAppStore(){this.wallet?.app_store&&i.CoreHelperUtil.openHref(this.wallet.app_store,'_blank')}onPlayStore(){this.wallet?.play_store&&i.CoreHelperUtil.openHref(this.wallet.play_store,'_blank')}onHomePage(){this.wallet?.homepage&&i.CoreHelperUtil.openHref(this.wallet.homepage,'_blank')}};l=o([(0,r.customElement)('w3m-downloads-view')],l)},9105,[4999,7402,7695,7701,9106,7721]);
__d(function(g,r,i,a,m,e,d){"use strict";Object.defineProperty(e,'__esModule',{value:!0});var t=r(d[0]);Object.keys(t).forEach(function(n){'default'===n||Object.prototype.hasOwnProperty.call(e,n)||Object.defineProperty(e,n,{enumerable:!0,get:function(){return t[n]}})})},9106,[9107]);
__d(function(g,_r,_i,a,m,_e,_d){"use strict";Object.defineProperty(_e,'__esModule',{value:!0}),Object.defineProperty(_e,"WuiListItem",{enumerable:!0,get:function(){return p}});var t=_r(_d[0]),i=_r(_d[1]),e=_r(_d[2]);_r(_d[3]),_r(_d[4]),_r(_d[5]),_r(_d[6]),_r(_d[7]);var o=_r(_d[8]),n=_r(_d[9]);_r(_d[10]);var r,l=_r(_d[11]),s=(r=l)&&r.__esModule?r:{default:r},c=this&&this.__decorate||function(t,i,e,o){var n,r=arguments.length,l=r<3?i:null===o?o=Object.getOwnPropertyDescriptor(i,e):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)l=Reflect.decorate(t,i,e,o);else for(var s=t.length-1;s>=0;s--)(n=t[s])&&(l=(r<3?n(l):r>3?n(i,e,l):n(i,e))||l);return r>3&&l&&Object.defineProperty(i,e,l),l};let p=class extends t.LitElement{constructor(){super(...arguments),this.tabIdx=void 0,this.variant='icon',this.disabled=!1,this.imageSrc=void 0,this.alt=void 0,this.chevron=!1,this.loading=!1}render(){return t.html`
      <button
        ?disabled=${!!this.loading||Boolean(this.disabled)}
        data-loading=${this.loading}
        data-iconvariant=${(0,e.ifDefined)(this.iconVariant)}
        tabindex=${(0,e.ifDefined)(this.tabIdx)}
      >
        ${this.loadingTemplate()} ${this.visualTemplate()}
        <wui-flex gap="3xs">
          <slot></slot>
        </wui-flex>
        ${this.chevronTemplate()}
      </button>
    `}visualTemplate(){if('image'===this.variant&&this.imageSrc)return t.html`<wui-image src=${this.imageSrc} alt=${this.alt??'list item'}></wui-image>`;if('square'===this.iconVariant&&this.icon&&'icon'===this.variant)return t.html`<wui-icon name=${this.icon}></wui-icon>`;if('icon'===this.variant&&this.icon&&this.iconVariant){const i=['blue','square-blue'].includes(this.iconVariant)?'accent-100':'fg-200',e='square-blue'===this.iconVariant?'mdl':'md',o=this.iconSize?this.iconSize:e;return t.html`
        <wui-icon-box
          data-variant=${this.iconVariant}
          icon=${this.icon}
          iconSize=${o}
          background="transparent"
          iconColor=${i}
          backgroundColor=${i}
          size=${e}
        ></wui-icon-box>
      `}return null}loadingTemplate(){return this.loading?t.html`<wui-loading-spinner
        data-testid="wui-list-item-loading-spinner"
        color="fg-300"
      ></wui-loading-spinner>`:t.html``}chevronTemplate(){return this.chevron?t.html`<wui-icon size="inherit" color="fg-200" name="chevronRight"></wui-icon>`:null}};p.styles=[o.resetStyles,o.elementStyles,s.default],c([(0,i.property)()],p.prototype,"icon",void 0),c([(0,i.property)()],p.prototype,"iconSize",void 0),c([(0,i.property)()],p.prototype,"tabIdx",void 0),c([(0,i.property)()],p.prototype,"variant",void 0),c([(0,i.property)()],p.prototype,"iconVariant",void 0),c([(0,i.property)({type:Boolean})],p.prototype,"disabled",void 0),c([(0,i.property)()],p.prototype,"imageSrc",void 0),c([(0,i.property)()],p.prototype,"alt",void 0),c([(0,i.property)({type:Boolean})],p.prototype,"chevron",void 0),c([(0,i.property)({type:Boolean})],p.prototype,"loading",void 0),p=c([(0,n.customElement)('wui-list-item')],p)},9107,[4999,5775,5786,7704,7714,7718,7710,7702,7697,7700,7712,9108]);
__d(function(g,r,i,a,m,e,d){"use strict";Object.defineProperty(e,'__esModule',{value:!0}),Object.defineProperty(e,"default",{enumerable:!0,get:function(){return o}});var o=r(d[0]).css`
  button {
    column-gap: var(--wui-spacing-s);
    padding: 11px 18px 11px var(--wui-spacing-s);
    width: 100%;
    background-color: var(--wui-color-gray-glass-002);
    border-radius: var(--wui-border-radius-xs);
    color: var(--wui-color-fg-250);
    transition:
      color var(--wui-ease-out-power-1) var(--wui-duration-md),
      background-color var(--wui-ease-out-power-1) var(--wui-duration-md);
    will-change: color, background-color;
  }

  button[data-iconvariant='square'],
  button[data-iconvariant='square-blue'] {
    padding: 6px 18px 6px 9px;
  }

  button > wui-flex {
    flex: 1;
  }

  button > wui-image {
    width: 32px;
    height: 32px;
    box-shadow: 0 0 0 2px var(--wui-color-gray-glass-005);
    border-radius: var(--wui-border-radius-3xl);
  }

  button > wui-icon {
    width: 36px;
    height: 36px;
    transition: opacity var(--wui-ease-out-power-1) var(--wui-duration-md);
    will-change: opacity;
  }

  button > wui-icon-box[data-variant='blue'] {
    box-shadow: 0 0 0 2px var(--wui-color-accent-glass-005);
  }

  button > wui-icon-box[data-variant='overlay'] {
    box-shadow: 0 0 0 2px var(--wui-color-gray-glass-005);
  }

  button > wui-icon-box[data-variant='square-blue'] {
    border-radius: var(--wui-border-radius-3xs);
    position: relative;
    border: none;
    width: 36px;
    height: 36px;
  }

  button > wui-icon-box[data-variant='square-blue']::after {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    border-radius: inherit;
    border: 1px solid var(--wui-color-accent-glass-010);
    pointer-events: none;
  }

  button > wui-icon:last-child {
    width: 14px;
    height: 14px;
  }

  button:disabled {
    color: var(--wui-color-gray-glass-020);
  }

  button[data-loading='true'] > wui-icon {
    opacity: 0;
  }

  wui-loading-spinner {
    position: absolute;
    right: 18px;
    top: 50%;
    transform: translateY(-50%);
  }
`},9108,[4999]);