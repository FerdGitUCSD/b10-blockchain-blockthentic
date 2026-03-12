__d(function(g,r,i,a,m,e,d){"use strict";Object.defineProperty(e,'__esModule',{value:!0});var t=r(d[0]);Object.keys(t).forEach(function(n){'default'===n||Object.prototype.hasOwnProperty.call(e,n)||Object.defineProperty(e,n,{enumerable:!0,get:function(){return t[n]}})})},9013,[9109]);
__d(function(g,_r,_i,a,m,_e,_d){"use strict";Object.defineProperty(_e,'__esModule',{value:!0}),Object.defineProperty(_e,"W3mModalBase",{enumerable:!0,get:function(){return p}}),Object.defineProperty(_e,"W3mModal",{enumerable:!0,get:function(){return b}}),Object.defineProperty(_e,"AppKitModal",{enumerable:!0,get:function(){return u}});var e=_r(_d[0]),t=_r(_d[1]),o=_r(_d[2]),r=_r(_d[3]),n=_r(_d[4]),s=_r(_d[5]);_r(_d[6]),_r(_d[7]),_r(_d[8]),_r(_d[9]),_r(_d[10]),_r(_d[11]),_r(_d[12]);var i,l=_r(_d[13]),d=(i=l)&&i.__esModule?i:{default:i},c=this&&this.__decorate||function(e,t,o,r){var n,s=arguments.length,i=s<3?t:null===r?r=Object.getOwnPropertyDescriptor(t,o):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)i=Reflect.decorate(e,t,o,r);else for(var l=e.length-1;l>=0;l--)(n=e[l])&&(i=(s<3?n(i):s>3?n(t,o,i):n(t,o))||i);return s>3&&i&&Object.defineProperty(t,o,i),i};const h='scroll-lock';class p extends e.LitElement{constructor(){super(),this.unsubscribe=[],this.abortController=void 0,this.hasPrefetched=!1,this.enableEmbedded=n.OptionsController.state.enableEmbedded,this.open=n.ModalController.state.open,this.caipAddress=n.ChainController.state.activeCaipAddress,this.caipNetwork=n.ChainController.state.activeCaipNetwork,this.shake=n.ModalController.state.shake,this.filterByNamespace=n.ConnectorController.state.filterByNamespace,this.initializeTheming(),n.ApiController.prefetchAnalyticsConfig(),this.unsubscribe.push(n.ModalController.subscribeKey('open',e=>e?this.onOpen():this.onClose()),n.ModalController.subscribeKey('shake',e=>this.shake=e),n.ChainController.subscribeKey('activeCaipNetwork',e=>this.onNewNetwork(e)),n.ChainController.subscribeKey('activeCaipAddress',e=>this.onNewAddress(e)),n.OptionsController.subscribeKey('enableEmbedded',e=>this.enableEmbedded=e),n.ConnectorController.subscribeKey('filterByNamespace',e=>{this.filterByNamespace===e||n.ChainController.getAccountData(e)?.caipAddress||(n.ApiController.fetchRecommendedWallets(),this.filterByNamespace=e)}))}firstUpdated(){if(this.caipAddress){if(this.enableEmbedded)return n.ModalController.close(),void this.prefetch();this.onNewAddress(this.caipAddress)}this.open&&this.onOpen(),this.enableEmbedded&&this.prefetch()}disconnectedCallback(){this.unsubscribe.forEach(e=>e()),this.onRemoveKeyboardListener()}render(){return this.style.cssText=`\n      --local-border-bottom-mobile-radius: ${this.enableEmbedded?'clamp(0px, var(--wui-border-radius-l), 44px)':'0px'};\n    `,this.enableEmbedded?e.html`${this.contentTemplate()}
        <w3m-tooltip></w3m-tooltip> `:this.open?e.html`
          <wui-flex @click=${this.onOverlayClick.bind(this)} data-testid="w3m-modal-overlay">
            ${this.contentTemplate()}
          </wui-flex>
          <w3m-tooltip></w3m-tooltip>
        `:null}contentTemplate(){return e.html` <wui-card
      shake="${this.shake}"
      data-embedded="${(0,o.ifDefined)(this.enableEmbedded)}"
      role="alertdialog"
      aria-modal="true"
      tabindex="0"
      data-testid="w3m-modal-card"
    >
      <w3m-header></w3m-header>
      <w3m-router></w3m-router>
      <w3m-snackbar></w3m-snackbar>
      <w3m-alertbar></w3m-alertbar>
    </wui-card>`}async onOverlayClick(e){e.target===e.currentTarget&&await this.handleClose()}async handleClose(){await n.ModalUtil.safeClose()}initializeTheming(){const{themeVariables:e,themeMode:t}=n.ThemeController.state,o=s.UiHelperUtil.getColorTheme(t);(0,s.initializeTheming)(e,o)}onClose(){this.open=!1,this.classList.remove('open'),this.onScrollUnlock(),n.SnackController.hide(),this.onRemoveKeyboardListener()}onOpen(){this.open=!0,this.classList.add('open'),this.onScrollLock(),this.onAddKeyboardListener()}onScrollLock(){const e=document.createElement('style');e.dataset.w3m=h,e.textContent="\n      body {\n        touch-action: none;\n        overflow: hidden;\n        overscroll-behavior: contain;\n      }\n      w3m-modal {\n        pointer-events: auto;\n      }\n    ",document.head.appendChild(e)}onScrollUnlock(){const e=document.head.querySelector(`style[data-w3m="${h}"]`);e&&e.remove()}onAddKeyboardListener(){this.abortController=new AbortController;const e=this.shadowRoot?.querySelector('wui-card');e?.focus(),window.addEventListener('keydown',t=>{if('Escape'===t.key)this.handleClose();else if('Tab'===t.key){const{tagName:o}=t.target;!o||o.includes('W3M-')||o.includes('WUI-')||e?.focus()}},this.abortController)}onRemoveKeyboardListener(){this.abortController?.abort(),this.abortController=void 0}async onNewAddress(e){const t=n.ChainController.state.isSwitchingNamespace,o=n.CoreHelperUtil.getPlainAddress(e),r=t&&o;!o&&!t?n.ModalController.close():r&&n.RouterController.goBack(),await n.SIWXUtil.initializeIfEnabled(),this.caipAddress=e,n.ChainController.setIsSwitchingNamespace(!1)}onNewNetwork(e){const t=this.caipNetwork,o=t?.caipNetworkId?.toString(),s=t?.chainNamespace,i=e?.caipNetworkId?.toString(),l=e?.chainNamespace,d=o!==i,c=d&&!(s!==l),h=t?.name===r.ConstantsUtil.UNSUPPORTED_NETWORK_NAME,p='ConnectingExternal'===n.RouterController.state.view,b=!n.ChainController.getAccountData(e?.chainNamespace)?.caipAddress,u='UnsupportedChain'===n.RouterController.state.view;let C=!1;n.ModalController.state.open&&!p&&(b?d&&(C=!0):(u||c&&!h)&&(C=!0)),C&&'SIWXSignMessage'!==n.RouterController.state.view&&n.RouterController.goBack(),this.caipNetwork=e}prefetch(){this.hasPrefetched||(n.ApiController.prefetch(),n.ApiController.fetchWalletsByPage({page:1}),this.hasPrefetched=!0)}}p.styles=d.default,c([(0,t.property)({type:Boolean})],p.prototype,"enableEmbedded",void 0),c([(0,t.state)()],p.prototype,"open",void 0),c([(0,t.state)()],p.prototype,"caipAddress",void 0),c([(0,t.state)()],p.prototype,"caipNetwork",void 0),c([(0,t.state)()],p.prototype,"shake",void 0),c([(0,t.state)()],p.prototype,"filterByNamespace",void 0);let b=class extends p{};b=c([(0,s.customElement)('w3m-modal')],b);let u=class extends p{};u=c([(0,s.customElement)('appkit-modal')],u)},9109,[4999,5775,5786,7382,7402,7695,9110,7701,9113,9118,9127,9132,9134,9136]);
__d(function(g,r,i,a,m,e,d){"use strict";Object.defineProperty(e,'__esModule',{value:!0});var t=r(d[0]);Object.keys(t).forEach(function(n){'default'===n||Object.prototype.hasOwnProperty.call(e,n)||Object.defineProperty(e,n,{enumerable:!0,get:function(){return t[n]}})})},9110,[9111]);
__d(function(g,_r,_i,a,m,_e,_d){"use strict";Object.defineProperty(_e,'__esModule',{value:!0}),Object.defineProperty(_e,"WuiCard",{enumerable:!0,get:function(){return s}});var e,t=_r(_d[0]),r=_r(_d[1]),l=_r(_d[2]),n=_r(_d[3]),o=(e=n)&&e.__esModule?e:{default:e},c=this&&this.__decorate||function(e,t,r,l){var n,o=arguments.length,c=o<3?t:null===l?l=Object.getOwnPropertyDescriptor(t,r):l;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)c=Reflect.decorate(e,t,r,l);else for(var s=e.length-1;s>=0;s--)(n=e[s])&&(c=(o<3?n(c):o>3?n(t,r,c):n(t,r))||c);return o>3&&c&&Object.defineProperty(t,r,c),c};let s=class extends t.LitElement{render(){return t.html`<slot></slot>`}};s.styles=[r.resetStyles,o.default],s=c([(0,l.customElement)('wui-card')],s)},9111,[4999,7697,7700,9112]);
__d(function(g,r,i,a,m,e,d){"use strict";Object.defineProperty(e,'__esModule',{value:!0}),Object.defineProperty(e,"default",{enumerable:!0,get:function(){return o}});var o=r(d[0]).css`
  :host {
    display: block;
    border-radius: clamp(0px, var(--wui-border-radius-l), 44px);
    box-shadow: 0 0 0 1px var(--wui-color-gray-glass-005);
    background-color: var(--wui-color-modal-bg);
    overflow: hidden;
  }

  :host([data-embedded='true']) {
    box-shadow:
      0 0 0 1px var(--wui-color-gray-glass-005),
      0px 4px 12px 4px var(--w3m-card-embedded-shadow-color);
  }
`},9112,[4999]);
__d(function(g,_r,_i,a,m,_e,_d){"use strict";Object.defineProperty(_e,'__esModule',{value:!0}),Object.defineProperty(_e,"presets",{enumerable:!0,get:function(){return l}}),Object.defineProperty(_e,"W3mAlertBar",{enumerable:!0,get:function(){return u}});var e=_r(_d[0]),r=_r(_d[1]),o=_r(_d[2]),t=_r(_d[3]);_r(_d[4]);var n,s=_r(_d[5]),c=(n=s)&&n.__esModule?n:{default:n},i=this&&this.__decorate||function(e,r,o,t){var n,s=arguments.length,c=s<3?r:null===t?t=Object.getOwnPropertyDescriptor(r,o):t;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)c=Reflect.decorate(e,r,o,t);else for(var i=e.length-1;i>=0;i--)(n=e[i])&&(c=(s<3?n(c):s>3?n(r,o,c):n(r,o))||c);return s>3&&c&&Object.defineProperty(r,o,c),c};const l={info:{backgroundColor:'fg-350',iconColor:'fg-325',icon:'info'},success:{backgroundColor:'success-glass-reown-020',iconColor:'success-125',icon:'checkmark'},warning:{backgroundColor:'warning-glass-reown-020',iconColor:'warning-100',icon:'warningCircle'},error:{backgroundColor:'error-glass-reown-020',iconColor:'error-125',icon:'exclamationTriangle'}};let u=class extends e.LitElement{constructor(){super(),this.unsubscribe=[],this.open=o.AlertController.state.open,this.onOpen(!0),this.unsubscribe.push(o.AlertController.subscribeKey('open',e=>{this.open=e,this.onOpen(!1)}))}disconnectedCallback(){this.unsubscribe.forEach(e=>e())}render(){const{message:r,variant:t}=o.AlertController.state,n=l[t];return e.html`
      <wui-alertbar
        message=${r}
        backgroundColor=${n?.backgroundColor}
        iconColor=${n?.iconColor}
        icon=${n?.icon}
      ></wui-alertbar>
    `}onOpen(e){this.open?(this.animate([{opacity:0,transform:'scale(0.85)'},{opacity:1,transform:'scale(1)'}],{duration:150,fill:'forwards',easing:'ease'}),this.style.cssText="pointer-events: auto"):e||(this.animate([{opacity:1,transform:'scale(1)'},{opacity:0,transform:'scale(0.85)'}],{duration:150,fill:'forwards',easing:'ease'}),this.style.cssText="pointer-events: none")}};u.styles=c.default,i([(0,r.state)()],u.prototype,"open",void 0),u=i([(0,t.customElement)('w3m-alertbar')],u)},9113,[4999,5775,7402,7695,9114,9117]);
__d(function(g,r,i,a,m,e,d){"use strict";Object.defineProperty(e,'__esModule',{value:!0});var t=r(d[0]);Object.keys(t).forEach(function(n){'default'===n||Object.prototype.hasOwnProperty.call(e,n)||Object.defineProperty(e,n,{enumerable:!0,get:function(){return t[n]}})})},9114,[9115]);
__d(function(g,_r,_i,a,m,_e,_d){"use strict";Object.defineProperty(_e,'__esModule',{value:!0}),Object.defineProperty(_e,"WuiAlertBar",{enumerable:!0,get:function(){return u}});var e=_r(_d[0]),t=_r(_d[1]),o=_r(_d[2]);_r(_d[3]),_r(_d[4]),_r(_d[5]);var r,i=_r(_d[6]),n=_r(_d[7]),l=_r(_d[8]),c=(r=l)&&r.__esModule?r:{default:r},s=this&&this.__decorate||function(e,t,o,r){var i,n=arguments.length,l=n<3?t:null===r?r=Object.getOwnPropertyDescriptor(t,o):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)l=Reflect.decorate(e,t,o,r);else for(var c=e.length-1;c>=0;c--)(i=e[c])&&(l=(n<3?i(l):n>3?i(t,o,l):i(t,o))||l);return n>3&&l&&Object.defineProperty(t,o,l),l};let u=class extends e.LitElement{constructor(){super(...arguments),this.message='',this.backgroundColor='accent-100',this.iconColor='accent-100',this.icon='info'}render(){return this.style.cssText=`\n      --local-icon-bg-value: var(--wui-color-${this.backgroundColor});\n   `,e.html`
      <wui-flex flexDirection="row" justifyContent="space-between" alignItems="center">
        <wui-flex columnGap="xs" flexDirection="row" alignItems="center">
          <wui-flex
            flexDirection="row"
            alignItems="center"
            justifyContent="center"
            class="icon-box"
          >
            <wui-icon color=${this.iconColor} size="md" name=${this.icon}></wui-icon>
          </wui-flex>
          <wui-text variant="small-500" color="bg-350" data-testid="wui-alertbar-text"
            >${this.message}</wui-text
          >
        </wui-flex>
        <wui-icon
          class="close"
          color="bg-350"
          size="sm"
          name="close"
          @click=${this.onClose}
        ></wui-icon>
      </wui-flex>
    `}onClose(){o.AlertController.close()}};u.styles=[i.resetStyles,c.default],s([(0,t.property)()],u.prototype,"message",void 0),s([(0,t.property)()],u.prototype,"backgroundColor",void 0),s([(0,t.property)()],u.prototype,"iconColor",void 0),s([(0,t.property)()],u.prototype,"icon",void 0),u=s([(0,n.customElement)('wui-alertbar')],u)},9115,[4999,5775,7402,7704,7710,7702,7697,7700,9116]);
__d(function(g,r,i,a,m,e,d){"use strict";Object.defineProperty(e,'__esModule',{value:!0}),Object.defineProperty(e,"default",{enumerable:!0,get:function(){return o}});var o=r(d[0]).css`
  :host {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: var(--wui-spacing-s);
    border-radius: var(--wui-border-radius-s);
    border: 1px solid var(--wui-color-dark-glass-100);
    box-sizing: border-box;
    background-color: var(--wui-color-bg-325);
    box-shadow: 0px 0px 16px 0px rgba(0, 0, 0, 0.25);
  }

  wui-flex {
    width: 100%;
  }

  wui-text {
    word-break: break-word;
    flex: 1;
  }

  .close {
    cursor: pointer;
  }

  .icon-box {
    height: 40px;
    width: 40px;
    border-radius: var(--wui-border-radius-3xs);
    background-color: var(--local-icon-bg-value);
  }
`},9116,[4999]);
__d(function(g,r,i,a,m,e,d){"use strict";Object.defineProperty(e,'__esModule',{value:!0}),Object.defineProperty(e,"default",{enumerable:!0,get:function(){return t}});var t=r(d[0]).css`
  :host {
    display: block;
    position: absolute;
    top: var(--wui-spacing-s);
    left: var(--wui-spacing-l);
    right: var(--wui-spacing-l);
    opacity: 0;
    pointer-events: none;
  }
`},9117,[4999]);
__d(function(g,_r,_i,a,m,_e,_d){"use strict";Object.defineProperty(_e,'__esModule',{value:!0}),Object.defineProperty(_e,"W3mHeader",{enumerable:!0,get:function(){return u}});var e=_r(_d[0]),t=_r(_d[1]),i=_r(_d[2]),o=_r(_d[3]),n=_r(_d[4]);_r(_d[5]),_r(_d[6]),_r(_d[7]),_r(_d[8]),_r(_d[9]);var r,s=_r(_d[10]),l=_r(_d[11]),c=(r=l)&&r.__esModule?r:{default:r},h=this&&this.__decorate||function(e,t,i,o){var n,r=arguments.length,s=r<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)s=Reflect.decorate(e,t,i,o);else for(var l=e.length-1;l>=0;l--)(n=e[l])&&(s=(r<3?n(s):r>3?n(t,i,s):n(t,i))||s);return r>3&&s&&Object.defineProperty(t,i,s),s};const d=['SmartSessionList'];function w(){const e=o.RouterController.state.data?.connector?.name,t=o.RouterController.state.data?.wallet?.name,i=o.RouterController.state.data?.network?.name,n=t??e,r=o.ConnectorController.getConnectors();return{Connect:`Connect ${1===r.length&&'w3m-email'===r[0]?.id?'Email':''} Wallet`,Create:'Create Wallet',ChooseAccountName:void 0,Account:void 0,AccountSettings:void 0,AllWallets:'All Wallets',ApproveTransaction:'Approve Transaction',BuyInProgress:'Buy',ConnectingExternal:n??'Connect Wallet',ConnectingWalletConnect:n??'WalletConnect',ConnectingWalletConnectBasic:'WalletConnect',ConnectingSiwe:'Sign In',Convert:'Convert',ConvertSelectToken:'Select token',ConvertPreview:'Preview convert',Downloads:n?`Get ${n}`:'Downloads',EmailLogin:'Email Login',EmailVerifyOtp:'Confirm Email',EmailVerifyDevice:'Register Device',GetWallet:'Get a wallet',Networks:'Choose Network',OnRampProviders:'Choose Provider',OnRampActivity:'Activity',OnRampTokenSelect:'Select Token',OnRampFiatSelect:'Select Currency',Pay:'How you pay',Profile:void 0,SwitchNetwork:i??'Switch Network',SwitchAddress:'Switch Address',Transactions:'Activity',UnsupportedChain:'Switch Network',UpgradeEmailWallet:'Upgrade your Wallet',UpdateEmailWallet:'Edit Email',UpdateEmailPrimaryOtp:'Confirm Current Email',UpdateEmailSecondaryOtp:'Confirm New Email',WhatIsABuy:'What is Buy?',RegisterAccountName:'Choose name',RegisterAccountNameSuccess:'',WalletReceive:'Receive',WalletCompatibleNetworks:'Compatible Networks',Swap:'Swap',SwapSelectToken:'Select token',SwapPreview:'Preview swap',WalletSend:'Send',WalletSendPreview:'Review send',WalletSendSelectToken:'Select Token',WhatIsANetwork:'What is a network?',WhatIsAWallet:'What is a wallet?',ConnectWallets:'Connect wallet',ConnectSocials:'All socials',ConnectingSocial:o.AccountController.state.socialProvider?o.AccountController.state.socialProvider:'Connect Social',ConnectingMultiChain:'Select chain',ConnectingFarcaster:'Farcaster',SwitchActiveChain:'Switch chain',SmartSessionCreated:void 0,SmartSessionList:'Smart Sessions',SIWXSignMessage:'Sign In',PayLoading:'Payment in progress'}}let u=class extends e.LitElement{constructor(){super(),this.unsubscribe=[],this.heading=w()[o.RouterController.state.view],this.network=o.ChainController.state.activeCaipNetwork,this.networkImage=o.AssetUtil.getNetworkImage(this.network),this.showBack=!1,this.prevHistoryLength=1,this.view=o.RouterController.state.view,this.viewDirection='',this.headerText=w()[o.RouterController.state.view],this.unsubscribe.push(o.AssetController.subscribeNetworkImages(()=>{this.networkImage=o.AssetUtil.getNetworkImage(this.network)}),o.RouterController.subscribeKey('view',e=>{setTimeout(()=>{this.view=e,this.headerText=w()[e]},s.ConstantsUtil.ANIMATION_DURATIONS.HeaderText),this.onViewChange(),this.onHistoryChange()}),o.ChainController.subscribeKey('activeCaipNetwork',e=>{this.network=e,this.networkImage=o.AssetUtil.getNetworkImage(this.network)}))}disconnectCallback(){this.unsubscribe.forEach(e=>e())}render(){return e.html`
      <wui-flex .padding=${this.getPadding()} justifyContent="space-between" alignItems="center">
        ${this.leftHeaderTemplate()} ${this.titleTemplate()} ${this.rightHeaderTemplate()}
      </wui-flex>
    `}onWalletHelp(){o.EventsController.sendEvent({type:'track',event:'CLICK_WALLET_HELP'}),o.RouterController.push('WhatIsAWallet')}async onClose(){await o.ModalUtil.safeClose()}rightHeaderTemplate(){const t=o.OptionsController?.state?.features?.smartSessions;return'Account'===o.RouterController.state.view&&t?e.html`<wui-flex>
      <wui-icon-link
        icon="clock"
        @click=${()=>o.RouterController.push('SmartSessionList')}
        data-testid="w3m-header-smart-sessions"
      ></wui-icon-link>
      ${this.closeButtonTemplate()}
    </wui-flex> `:this.closeButtonTemplate()}closeButtonTemplate(){return e.html`
      <wui-icon-link
        icon="close"
        @click=${this.onClose.bind(this)}
        data-testid="w3m-header-close"
      ></wui-icon-link>
    `}titleTemplate(){const t=d.includes(this.view);return e.html`
      <wui-flex
        view-direction="${this.viewDirection}"
        class="w3m-header-title"
        alignItems="center"
        gap="xs"
      >
        <wui-text variant="paragraph-700" color="fg-100" data-testid="w3m-header-text"
          >${this.headerText}</wui-text
        >
        ${t?e.html`<wui-tag variant="main">Beta</wui-tag>`:null}
      </wui-flex>
    `}leftHeaderTemplate(){const{view:t}=o.RouterController.state,n='Connect'===t,r=o.OptionsController.state.enableEmbedded,s='ApproveTransaction'===t,l='ConnectingSiwe'===t,c='Account'===t,h=o.OptionsController.state.enableNetworkSwitch,d=s||l||n&&r;return c&&h?e.html`<wui-select
        id="dynamic"
        data-testid="w3m-account-select-network"
        active-network=${(0,i.ifDefined)(this.network?.name)}
        @click=${this.onNetworks.bind(this)}
        imageSrc=${(0,i.ifDefined)(this.networkImage)}
      ></wui-select>`:this.showBack&&!d?e.html`<wui-icon-link
        data-testid="header-back"
        id="dynamic"
        icon="chevronLeft"
        @click=${this.onGoBack.bind(this)}
      ></wui-icon-link>`:e.html`<wui-icon-link
      data-hidden=${!n}
      id="dynamic"
      icon="helpCircle"
      @click=${this.onWalletHelp.bind(this)}
    ></wui-icon-link>`}onNetworks(){this.isAllowedNetworkSwitch()&&(o.EventsController.sendEvent({type:'track',event:'CLICK_NETWORKS'}),o.RouterController.push('Networks'))}isAllowedNetworkSwitch(){const e=o.ChainController.getAllRequestedCaipNetworks(),t=!!e&&e.length>1,i=e?.find(({id:e})=>e===this.network?.id);return t||!i}getPadding(){return this.heading?['l','2l','l','2l']:['0','2l','0','2l']}onViewChange(){const{history:e}=o.RouterController.state;let t=s.ConstantsUtil.VIEW_DIRECTION.Next;e.length<this.prevHistoryLength&&(t=s.ConstantsUtil.VIEW_DIRECTION.Prev),this.prevHistoryLength=e.length,this.viewDirection=t}async onHistoryChange(){const{history:e}=o.RouterController.state,t=this.shadowRoot?.querySelector('#dynamic');e.length>1&&!this.showBack&&t?(await t.animate([{opacity:1},{opacity:0}],{duration:200,fill:'forwards',easing:'ease'}).finished,this.showBack=!0,t.animate([{opacity:0},{opacity:1}],{duration:200,fill:'forwards',easing:'ease'})):e.length<=1&&this.showBack&&t&&(await t.animate([{opacity:1},{opacity:0}],{duration:200,fill:'forwards',easing:'ease'}).finished,this.showBack=!1,t.animate([{opacity:0},{opacity:1}],{duration:200,fill:'forwards',easing:'ease'}))}onGoBack(){o.RouterController.goBack()}};u.styles=c.default,h([(0,t.state)()],u.prototype,"heading",void 0),h([(0,t.state)()],u.prototype,"network",void 0),h([(0,t.state)()],u.prototype,"networkImage",void 0),h([(0,t.state)()],u.prototype,"showBack",void 0),h([(0,t.state)()],u.prototype,"prevHistoryLength",void 0),h([(0,t.state)()],u.prototype,"view",void 0),h([(0,t.state)()],u.prototype,"viewDirection",void 0),h([(0,t.state)()],u.prototype,"headerText",void 0),u=h([(0,n.customElement)('w3m-header')],u)},9118,[4999,5775,5786,7402,7695,7701,9119,9122,9125,7721,7694,9126]);
__d(function(g,r,i,a,m,e,d){"use strict";Object.defineProperty(e,'__esModule',{value:!0});var t=r(d[0]);Object.keys(t).forEach(function(n){'default'===n||Object.prototype.hasOwnProperty.call(e,n)||Object.defineProperty(e,n,{enumerable:!0,get:function(){return t[n]}})})},9119,[9120]);
__d(function(g,_r,_i,a,m,_e,_d){"use strict";Object.defineProperty(_e,'__esModule',{value:!0}),Object.defineProperty(_e,"WuiIconLink",{enumerable:!0,get:function(){return c}});var e=_r(_d[0]),t=_r(_d[1]);_r(_d[2]);var o,i=_r(_d[3]),r=_r(_d[4]),s=_r(_d[5]),n=(o=s)&&o.__esModule?o:{default:o},l=this&&this.__decorate||function(e,t,o,i){var r,s=arguments.length,n=s<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,o):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,o,i);else for(var l=e.length-1;l>=0;l--)(r=e[l])&&(n=(s<3?r(n):s>3?r(t,o,n):r(t,o))||n);return s>3&&n&&Object.defineProperty(t,o,n),n};let c=class extends e.LitElement{constructor(){super(...arguments),this.size='md',this.disabled=!1,this.icon='copy',this.iconColor='inherit'}render(){const t='lg'===this.size?'--wui-border-radius-xs':'--wui-border-radius-xxs',o='lg'===this.size?'--wui-spacing-1xs':'--wui-spacing-2xs';return this.style.cssText=`\n    --local-border-radius: var(${t});\n    --local-padding: var(${o});\n`,e.html`
      <button ?disabled=${this.disabled}>
        <wui-icon color=${this.iconColor} size=${this.size} name=${this.icon}></wui-icon>
      </button>
    `}};c.styles=[i.resetStyles,i.elementStyles,i.colorStyles,n.default],l([(0,t.property)()],c.prototype,"size",void 0),l([(0,t.property)({type:Boolean})],c.prototype,"disabled",void 0),l([(0,t.property)()],c.prototype,"icon",void 0),l([(0,t.property)()],c.prototype,"iconColor",void 0),c=l([(0,r.customElement)('wui-icon-link')],c)},9120,[4999,5775,7704,7697,7700,9121]);
__d(function(g,r,i,a,m,e,d){"use strict";Object.defineProperty(e,'__esModule',{value:!0}),Object.defineProperty(e,"default",{enumerable:!0,get:function(){return o}});var o=r(d[0]).css`
  button {
    border-radius: var(--local-border-radius);
    color: var(--wui-color-fg-100);
    padding: var(--local-padding);
  }

  @media (max-width: 700px) {
    button {
      padding: var(--wui-spacing-s);
    }
  }

  button > wui-icon {
    pointer-events: none;
  }

  button:disabled > wui-icon {
    color: var(--wui-color-bg-300) !important;
  }

  button:disabled {
    background-color: transparent;
  }
`},9121,[4999]);
__d(function(g,r,i,a,m,e,d){"use strict";Object.defineProperty(e,'__esModule',{value:!0});var t=r(d[0]);Object.keys(t).forEach(function(n){'default'===n||Object.prototype.hasOwnProperty.call(e,n)||Object.defineProperty(e,n,{enumerable:!0,get:function(){return t[n]}})})},9122,[9123]);
__d(function(g,_r,_i,a,m,_e,_d){"use strict";Object.defineProperty(_e,'__esModule',{value:!0}),Object.defineProperty(_e,"WuiSelect",{enumerable:!0,get:function(){return u}});var e=_r(_d[0]),t=_r(_d[1]);_r(_d[2]),_r(_d[3]),_r(_d[4]);var o,r=_r(_d[5]),i=_r(_d[6]),c=_r(_d[7]),l=(o=c)&&o.__esModule?o:{default:o},n=this&&this.__decorate||function(e,t,o,r){var i,c=arguments.length,l=c<3?t:null===r?r=Object.getOwnPropertyDescriptor(t,o):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)l=Reflect.decorate(e,t,o,r);else for(var n=e.length-1;n>=0;n--)(i=e[n])&&(l=(c<3?i(l):c>3?i(t,o,l):i(t,o))||l);return c>3&&l&&Object.defineProperty(t,o,l),l};let u=class extends e.LitElement{constructor(){super(...arguments),this.imageSrc=''}render(){return e.html`<button>
      ${this.imageTemplate()}
      <wui-icon size="xs" color="fg-200" name="chevronBottom"></wui-icon>
    </button>`}imageTemplate(){return this.imageSrc?e.html`<wui-image src=${this.imageSrc} alt="select visual"></wui-image>`:e.html`<wui-icon-box
      size="xxs"
      iconColor="fg-200"
      backgroundColor="fg-100"
      background="opaque"
      icon="networkPlaceholder"
    ></wui-icon-box>`}};u.styles=[r.resetStyles,r.elementStyles,r.colorStyles,l.default],n([(0,t.property)()],u.prototype,"imageSrc",void 0),u=n([(0,i.customElement)('wui-select')],u)},9123,[4999,5775,7704,7714,7712,7697,7700,9124]);
__d(function(g,r,i,a,m,e,d){"use strict";Object.defineProperty(e,'__esModule',{value:!0}),Object.defineProperty(e,"default",{enumerable:!0,get:function(){return u}});var u=r(d[0]).css`
  button {
    display: block;
    display: flex;
    align-items: center;
    padding: var(--wui-spacing-xxs);
    gap: var(--wui-spacing-xxs);
    transition: all var(--wui-ease-out-power-1) var(--wui-duration-md);
    border-radius: var(--wui-border-radius-xxs);
  }

  wui-image {
    border-radius: 100%;
    width: var(--wui-spacing-xl);
    height: var(--wui-spacing-xl);
  }

  wui-icon-box {
    width: var(--wui-spacing-xl);
    height: var(--wui-spacing-xl);
  }

  button:hover {
    background-color: var(--wui-color-gray-glass-002);
  }

  button:active {
    background-color: var(--wui-color-gray-glass-005);
  }
`},9124,[4999]);
__d(function(g,r,i,a,m,e,d){"use strict";Object.defineProperty(e,'__esModule',{value:!0});var t=r(d[0]);Object.keys(t).forEach(function(n){'default'===n||Object.prototype.hasOwnProperty.call(e,n)||Object.defineProperty(e,n,{enumerable:!0,get:function(){return t[n]}})})},9125,[7716]);
__d(function(g,r,i,a,m,e,d){"use strict";Object.defineProperty(e,'__esModule',{value:!0}),Object.defineProperty(e,"default",{enumerable:!0,get:function(){return t}});var t=r(d[0]).css`
  :host {
    height: 64px;
  }

  wui-text {
    text-transform: capitalize;
  }

  wui-flex.w3m-header-title {
    transform: translateY(0);
    opacity: 1;
  }

  wui-flex.w3m-header-title[view-direction='prev'] {
    animation:
      slide-down-out 120ms forwards var(--wui-ease-out-power-2),
      slide-down-in 120ms forwards var(--wui-ease-out-power-2);
    animation-delay: 0ms, 200ms;
  }

  wui-flex.w3m-header-title[view-direction='next'] {
    animation:
      slide-up-out 120ms forwards var(--wui-ease-out-power-2),
      slide-up-in 120ms forwards var(--wui-ease-out-power-2);
    animation-delay: 0ms, 200ms;
  }

  wui-icon-link[data-hidden='true'] {
    opacity: 0 !important;
    pointer-events: none;
  }

  @keyframes slide-up-out {
    from {
      transform: translateY(0px);
      opacity: 1;
    }
    to {
      transform: translateY(3px);
      opacity: 0;
    }
  }

  @keyframes slide-up-in {
    from {
      transform: translateY(-3px);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }

  @keyframes slide-down-out {
    from {
      transform: translateY(0px);
      opacity: 1;
    }
    to {
      transform: translateY(-3px);
      opacity: 0;
    }
  }

  @keyframes slide-down-in {
    from {
      transform: translateY(3px);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }
`},9126,[4999]);
__d(function(g,_r,_i,a,m,_e,_d){"use strict";Object.defineProperty(_e,'__esModule',{value:!0}),Object.defineProperty(_e,"W3mSnackBar",{enumerable:!0,get:function(){return u}});var e=_r(_d[0]),t=_r(_d[1]),o=_r(_d[2]),r=_r(_d[3]);_r(_d[4]);var n,s=_r(_d[5]),i=(n=s)&&n.__esModule?n:{default:n},c=this&&this.__decorate||function(e,t,o,r){var n,s=arguments.length,i=s<3?t:null===r?r=Object.getOwnPropertyDescriptor(t,o):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)i=Reflect.decorate(e,t,o,r);else for(var c=e.length-1;c>=0;c--)(n=e[c])&&(i=(s<3?n(i):s>3?n(t,o,i):n(t,o))||i);return s>3&&i&&Object.defineProperty(t,o,i),i};const l={loading:void 0,success:{backgroundColor:'success-100',iconColor:'success-100',icon:'checkmark'},error:{backgroundColor:'error-100',iconColor:'error-100',icon:'close'}};let u=class extends e.LitElement{constructor(){super(),this.unsubscribe=[],this.timeout=void 0,this.open=o.SnackController.state.open,this.unsubscribe.push(o.SnackController.subscribeKey('open',e=>{this.open=e,this.onOpen()}))}disconnectedCallback(){clearTimeout(this.timeout),this.unsubscribe.forEach(e=>e())}render(){const{message:t,variant:r,svg:n}=o.SnackController.state,s=l[r],{icon:i,iconColor:c}=n??s??{};return e.html`
      <wui-snackbar
        message=${t}
        backgroundColor=${s?.backgroundColor}
        iconColor=${c}
        icon=${i}
        .loading=${'loading'===r}
      ></wui-snackbar>
    `}onOpen(){clearTimeout(this.timeout),this.open?(this.animate([{opacity:0,transform:'translateX(-50%) scale(0.85)'},{opacity:1,transform:'translateX(-50%) scale(1)'}],{duration:150,fill:'forwards',easing:'ease'}),this.timeout&&clearTimeout(this.timeout),o.SnackController.state.autoClose&&(this.timeout=setTimeout(()=>o.SnackController.hide(),2500))):this.animate([{opacity:1,transform:'translateX(-50%) scale(1)'},{opacity:0,transform:'translateX(-50%) scale(0.85)'}],{duration:150,fill:'forwards',easing:'ease'})}};u.styles=i.default,c([(0,t.state)()],u.prototype,"open",void 0),u=c([(0,r.customElement)('w3m-snackbar')],u)},9127,[4999,5775,7402,7695,9128,9131]);
__d(function(g,r,i,a,m,e,d){"use strict";Object.defineProperty(e,'__esModule',{value:!0});var t=r(d[0]);Object.keys(t).forEach(function(n){'default'===n||Object.prototype.hasOwnProperty.call(e,n)||Object.defineProperty(e,n,{enumerable:!0,get:function(){return t[n]}})})},9128,[9129]);
__d(function(g,_r,_i,a,m,_e,_d){"use strict";Object.defineProperty(_e,'__esModule',{value:!0}),Object.defineProperty(_e,"WuiSnackbar",{enumerable:!0,get:function(){return l}});var e=_r(_d[0]),o=_r(_d[1]);_r(_d[2]),_r(_d[3]),_r(_d[4]);var t=_r(_d[5]),r=_r(_d[6]);_r(_d[7]);var i,n=_r(_d[8]),c=(i=n)&&i.__esModule?i:{default:i},s=this&&this.__decorate||function(e,o,t,r){var i,n=arguments.length,c=n<3?o:null===r?r=Object.getOwnPropertyDescriptor(o,t):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)c=Reflect.decorate(e,o,t,r);else for(var s=e.length-1;s>=0;s--)(i=e[s])&&(c=(n<3?i(c):n>3?i(o,t,c):i(o,t))||c);return n>3&&c&&Object.defineProperty(o,t,c),c};let l=class extends e.LitElement{constructor(){super(...arguments),this.backgroundColor='accent-100',this.iconColor='accent-100',this.icon='checkmark',this.message='',this.loading=!1,this.iconType='default'}render(){return e.html`
      ${this.templateIcon()}
      <wui-text variant="paragraph-500" color="fg-100" data-testid="wui-snackbar-message"
        >${this.message}</wui-text
      >
    `}templateIcon(){return this.loading?e.html`<wui-loading-spinner size="md" color="accent-100"></wui-loading-spinner>`:'default'===this.iconType?e.html`<wui-icon size="xl" color=${this.iconColor} name=${this.icon}></wui-icon>`:e.html`<wui-icon-box
      size="sm"
      iconSize="xs"
      iconColor=${this.iconColor}
      backgroundColor=${this.backgroundColor}
      icon=${this.icon}
      background="opaque"
    ></wui-icon-box>`}};l.styles=[t.resetStyles,c.default],s([(0,o.property)()],l.prototype,"backgroundColor",void 0),s([(0,o.property)()],l.prototype,"iconColor",void 0),s([(0,o.property)()],l.prototype,"icon",void 0),s([(0,o.property)()],l.prototype,"message",void 0),s([(0,o.property)()],l.prototype,"loading",void 0),s([(0,o.property)()],l.prototype,"iconType",void 0),l=s([(0,r.customElement)('wui-snackbar')],l)},9129,[4999,5775,7704,7718,7710,7697,7700,7712,9130]);
__d(function(g,r,i,a,m,e,d){"use strict";Object.defineProperty(e,'__esModule',{value:!0}),Object.defineProperty(e,"default",{enumerable:!0,get:function(){return s}});var s=r(d[0]).css`
  :host {
    display: flex;
    column-gap: var(--wui-spacing-s);
    align-items: center;
    padding: var(--wui-spacing-xs) var(--wui-spacing-m) var(--wui-spacing-xs) var(--wui-spacing-xs);
    border-radius: var(--wui-border-radius-s);
    border: 1px solid var(--wui-color-gray-glass-005);
    box-sizing: border-box;
    background-color: var(--wui-color-bg-175);
    box-shadow:
      0px 14px 64px -4px rgba(0, 0, 0, 0.15),
      0px 8px 22px -6px rgba(0, 0, 0, 0.15);

    max-width: 300px;
  }

  :host wui-loading-spinner {
    margin-left: var(--wui-spacing-3xs);
  }
`},9130,[4999]);
__d(function(g,r,i,a,m,e,d){"use strict";Object.defineProperty(e,'__esModule',{value:!0}),Object.defineProperty(e,"default",{enumerable:!0,get:function(){return t}});var t=r(d[0]).css`
  :host {
    display: block;
    position: absolute;
    opacity: 0;
    pointer-events: none;
    top: 11px;
    left: 50%;
    width: max-content;
  }
`},9131,[4999]);
__d(function(g,_r,_i,a,m,_e,_d){"use strict";Object.defineProperty(_e,'__esModule',{value:!0}),Object.defineProperty(_e,"W3mTooltip",{enumerable:!0,get:function(){return c}});var t=_r(_d[0]),e=_r(_d[1]),o=_r(_d[2]),i=_r(_d[3]);_r(_d[4]),_r(_d[5]),_r(_d[6]);var r,s=_r(_d[7]),n=(r=s)&&r.__esModule?r:{default:r},l=this&&this.__decorate||function(t,e,o,i){var r,s=arguments.length,n=s<3?e:null===i?i=Object.getOwnPropertyDescriptor(e,o):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(t,e,o,i);else for(var l=t.length-1;l>=0;l--)(r=t[l])&&(n=(s<3?r(n):s>3?r(e,o,n):r(e,o))||n);return s>3&&n&&Object.defineProperty(e,o,n),n};let c=class extends t.LitElement{constructor(){super(),this.unsubscribe=[],this.open=o.TooltipController.state.open,this.message=o.TooltipController.state.message,this.triggerRect=o.TooltipController.state.triggerRect,this.variant=o.TooltipController.state.variant,this.unsubscribe.push(o.TooltipController.subscribe(t=>{this.open=t.open,this.message=t.message,this.triggerRect=t.triggerRect,this.variant=t.variant}))}disconnectedCallback(){this.unsubscribe.forEach(t=>t())}render(){this.dataset.variant=this.variant;const e=this.triggerRect.top,o=this.triggerRect.left;return this.style.cssText=`\n    --w3m-tooltip-top: ${e}px;\n    --w3m-tooltip-left: ${o}px;\n    --w3m-tooltip-parent-width: ${this.triggerRect.width/2}px;\n    --w3m-tooltip-display: ${this.open?'flex':'none'};\n    --w3m-tooltip-opacity: ${this.open?1:0};\n    `,t.html`<wui-flex>
      <wui-icon data-placement="top" color="fg-100" size="inherit" name="cursor"></wui-icon>
      <wui-text color="inherit" variant="small-500">${this.message}</wui-text>
    </wui-flex>`}};c.styles=[n.default],l([(0,e.state)()],c.prototype,"open",void 0),l([(0,e.state)()],c.prototype,"message",void 0),l([(0,e.state)()],c.prototype,"triggerRect",void 0),l([(0,e.state)()],c.prototype,"variant",void 0),c=l([(0,i.customElement)('w3m-tooltip'),(0,i.customElement)('w3m-tooltip')],c)},9132,[4999,5775,7402,7695,7701,7720,7721,9133]);
__d(function(g,r,i,a,m,e,d){"use strict";Object.defineProperty(e,'__esModule',{value:!0}),Object.defineProperty(e,"default",{enumerable:!0,get:function(){return t}});var t=r(d[0]).css`
  :host {
    pointer-events: none;
  }

  :host > wui-flex {
    display: var(--w3m-tooltip-display);
    opacity: var(--w3m-tooltip-opacity);
    padding: 9px var(--wui-spacing-s) 10px var(--wui-spacing-s);
    border-radius: var(--wui-border-radius-xxs);
    color: var(--wui-color-bg-100);
    position: fixed;
    top: var(--w3m-tooltip-top);
    left: var(--w3m-tooltip-left);
    transform: translate(calc(-50% + var(--w3m-tooltip-parent-width)), calc(-100% - 8px));
    max-width: calc(var(--w3m-modal-width) - var(--wui-spacing-xl));
    transition: opacity 0.2s var(--wui-ease-out-power-2);
    will-change: opacity;
  }

  :host([data-variant='shade']) > wui-flex {
    background-color: var(--wui-color-bg-150);
    border: 1px solid var(--wui-color-gray-glass-005);
  }

  :host([data-variant='shade']) > wui-flex > wui-text {
    color: var(--wui-color-fg-150);
  }

  :host([data-variant='fill']) > wui-flex {
    background-color: var(--wui-color-fg-100);
    border: none;
  }

  wui-icon {
    position: absolute;
    width: 12px !important;
    height: 4px !important;
    color: var(--wui-color-bg-150);
  }

  wui-icon[data-placement='top'] {
    bottom: 0px;
    left: 50%;
    transform: translate(-50%, 95%);
  }

  wui-icon[data-placement='bottom'] {
    top: 0;
    left: 50%;
    transform: translate(-50%, -95%) rotate(180deg);
  }

  wui-icon[data-placement='right'] {
    top: 50%;
    left: 0;
    transform: translate(-65%, -50%) rotate(90deg);
  }

  wui-icon[data-placement='left'] {
    top: 50%;
    right: 0%;
    transform: translate(65%, -50%) rotate(270deg);
  }
`},9133,[4999]);
__d(function(g,_r,_i,a,m,_e,_d){"use strict";Object.defineProperty(_e,'__esModule',{value:!0}),Object.defineProperty(_e,"W3mRouter",{enumerable:!0,get:function(){return o}});var e,t=_r(_d[0]),i=_r(_d[1]),n=_r(_d[2]),w=_r(_d[3]),r=_r(_d[4]),s=_r(_d[5]),c=(e=s)&&e.__esModule?e:{default:e},l=this&&this.__decorate||function(e,t,i,n){var w,r=arguments.length,s=r<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,i):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)s=Reflect.decorate(e,t,i,n);else for(var c=e.length-1;c>=0;c--)(w=e[c])&&(s=(r<3?w(s):r>3?w(t,i,s):w(t,i))||s);return r>3&&s&&Object.defineProperty(t,i,s),s};let o=class extends t.LitElement{constructor(){super(),this.resizeObserver=void 0,this.prevHeight='0px',this.prevHistoryLength=1,this.unsubscribe=[],this.view=n.RouterController.state.view,this.viewDirection='',this.unsubscribe.push(n.RouterController.subscribeKey('view',e=>this.onViewChange(e)))}firstUpdated(){this.resizeObserver=new ResizeObserver(([e])=>{const t=`${e?.contentRect.height}px`;'0px'!==this.prevHeight&&(this.style.setProperty('--prev-height',this.prevHeight),this.style.setProperty('--new-height',t),this.style.animation='w3m-view-height 150ms forwards ease',this.style.height='auto'),setTimeout(()=>{this.prevHeight=t,this.style.animation='unset'},r.ConstantsUtil.ANIMATION_DURATIONS.ModalHeight)}),this.resizeObserver?.observe(this.getWrapper())}disconnectedCallback(){this.resizeObserver?.unobserve(this.getWrapper()),this.unsubscribe.forEach(e=>e())}render(){return t.html`<div class="w3m-router-container" view-direction="${this.viewDirection}">
      ${this.viewTemplate()}
    </div>`}viewTemplate(){switch(this.view){case'AccountSettings':return t.html`<w3m-account-settings-view></w3m-account-settings-view>`;case'Account':return t.html`<w3m-account-view></w3m-account-view>`;case'AllWallets':return t.html`<w3m-all-wallets-view></w3m-all-wallets-view>`;case'ApproveTransaction':return t.html`<w3m-approve-transaction-view></w3m-approve-transaction-view>`;case'BuyInProgress':return t.html`<w3m-buy-in-progress-view></w3m-buy-in-progress-view>`;case'ChooseAccountName':return t.html`<w3m-choose-account-name-view></w3m-choose-account-name-view>`;case'Connect':default:return t.html`<w3m-connect-view></w3m-connect-view>`;case'Create':return t.html`<w3m-connect-view walletGuide="explore"></w3m-connect-view>`;case'ConnectingWalletConnect':return t.html`<w3m-connecting-wc-view></w3m-connecting-wc-view>`;case'ConnectingWalletConnectBasic':return t.html`<w3m-connecting-wc-basic-view></w3m-connecting-wc-basic-view>`;case'ConnectingExternal':return t.html`<w3m-connecting-external-view></w3m-connecting-external-view>`;case'ConnectingSiwe':return t.html`<w3m-connecting-siwe-view></w3m-connecting-siwe-view>`;case'ConnectWallets':return t.html`<w3m-connect-wallets-view></w3m-connect-wallets-view>`;case'ConnectSocials':return t.html`<w3m-connect-socials-view></w3m-connect-socials-view>`;case'ConnectingSocial':return t.html`<w3m-connecting-social-view></w3m-connecting-social-view>`;case'Downloads':return t.html`<w3m-downloads-view></w3m-downloads-view>`;case'EmailLogin':return t.html`<w3m-email-login-view></w3m-email-login-view>`;case'EmailVerifyOtp':return t.html`<w3m-email-verify-otp-view></w3m-email-verify-otp-view>`;case'EmailVerifyDevice':return t.html`<w3m-email-verify-device-view></w3m-email-verify-device-view>`;case'GetWallet':return t.html`<w3m-get-wallet-view></w3m-get-wallet-view>`;case'Networks':return t.html`<w3m-networks-view></w3m-networks-view>`;case'SwitchNetwork':return t.html`<w3m-network-switch-view></w3m-network-switch-view>`;case'Profile':return t.html`<w3m-profile-view></w3m-profile-view>`;case'SwitchAddress':return t.html`<w3m-switch-address-view></w3m-switch-address-view>`;case'Transactions':return t.html`<w3m-transactions-view></w3m-transactions-view>`;case'OnRampProviders':return t.html`<w3m-onramp-providers-view></w3m-onramp-providers-view>`;case'OnRampActivity':return t.html`<w3m-onramp-activity-view></w3m-onramp-activity-view>`;case'OnRampTokenSelect':return t.html`<w3m-onramp-token-select-view></w3m-onramp-token-select-view>`;case'OnRampFiatSelect':return t.html`<w3m-onramp-fiat-select-view></w3m-onramp-fiat-select-view>`;case'UpgradeEmailWallet':return t.html`<w3m-upgrade-wallet-view></w3m-upgrade-wallet-view>`;case'UpdateEmailWallet':return t.html`<w3m-update-email-wallet-view></w3m-update-email-wallet-view>`;case'UpdateEmailPrimaryOtp':return t.html`<w3m-update-email-primary-otp-view></w3m-update-email-primary-otp-view>`;case'UpdateEmailSecondaryOtp':return t.html`<w3m-update-email-secondary-otp-view></w3m-update-email-secondary-otp-view>`;case'UnsupportedChain':return t.html`<w3m-unsupported-chain-view></w3m-unsupported-chain-view>`;case'Swap':return t.html`<w3m-swap-view></w3m-swap-view>`;case'SwapSelectToken':return t.html`<w3m-swap-select-token-view></w3m-swap-select-token-view>`;case'SwapPreview':return t.html`<w3m-swap-preview-view></w3m-swap-preview-view>`;case'WalletSend':return t.html`<w3m-wallet-send-view></w3m-wallet-send-view>`;case'WalletSendSelectToken':return t.html`<w3m-wallet-send-select-token-view></w3m-wallet-send-select-token-view>`;case'WalletSendPreview':return t.html`<w3m-wallet-send-preview-view></w3m-wallet-send-preview-view>`;case'WhatIsABuy':return t.html`<w3m-what-is-a-buy-view></w3m-what-is-a-buy-view>`;case'WalletReceive':return t.html`<w3m-wallet-receive-view></w3m-wallet-receive-view>`;case'WalletCompatibleNetworks':return t.html`<w3m-wallet-compatible-networks-view></w3m-wallet-compatible-networks-view>`;case'WhatIsAWallet':return t.html`<w3m-what-is-a-wallet-view></w3m-what-is-a-wallet-view>`;case'ConnectingMultiChain':return t.html`<w3m-connecting-multi-chain-view></w3m-connecting-multi-chain-view>`;case'WhatIsANetwork':return t.html`<w3m-what-is-a-network-view></w3m-what-is-a-network-view>`;case'ConnectingFarcaster':return t.html`<w3m-connecting-farcaster-view></w3m-connecting-farcaster-view>`;case'SwitchActiveChain':return t.html`<w3m-switch-active-chain-view></w3m-switch-active-chain-view>`;case'RegisterAccountName':return t.html`<w3m-register-account-name-view></w3m-register-account-name-view>`;case'RegisterAccountNameSuccess':return t.html`<w3m-register-account-name-success-view></w3m-register-account-name-success-view>`;case'SmartSessionCreated':return t.html`<w3m-smart-session-created-view></w3m-smart-session-created-view>`;case'SmartSessionList':return t.html`<w3m-smart-session-list-view></w3m-smart-session-list-view>`;case'SIWXSignMessage':return t.html`<w3m-siwx-sign-message-view></w3m-siwx-sign-message-view>`;case'Pay':return t.html`<w3m-pay-view></w3m-pay-view>`;case'PayLoading':return t.html`<w3m-pay-loading-view></w3m-pay-loading-view>`}}onViewChange(e){n.TooltipController.hide();let t=r.ConstantsUtil.VIEW_DIRECTION.Next;const{history:i}=n.RouterController.state;i.length<this.prevHistoryLength&&(t=r.ConstantsUtil.VIEW_DIRECTION.Prev),this.prevHistoryLength=i.length,this.viewDirection=t,setTimeout(()=>{this.view=e},r.ConstantsUtil.ANIMATION_DURATIONS.ViewTransition)}getWrapper(){return this.shadowRoot?.querySelector('div')}};o.styles=c.default,l([(0,i.state)()],o.prototype,"view",void 0),l([(0,i.state)()],o.prototype,"viewDirection",void 0),o=l([(0,w.customElement)('w3m-router')],o)},9134,[4999,5775,7402,7695,7694,9135]);
__d(function(g,r,i,a,m,e,d){"use strict";Object.defineProperty(e,'__esModule',{value:!0}),Object.defineProperty(e,"default",{enumerable:!0,get:function(){return t}});var t=r(d[0]).css`
  :host {
    --prev-height: 0px;
    --new-height: 0px;
    display: block;
  }

  div.w3m-router-container {
    transform: translateY(0);
    opacity: 1;
  }

  div.w3m-router-container[view-direction='prev'] {
    animation:
      slide-left-out 150ms forwards ease,
      slide-left-in 150ms forwards ease;
    animation-delay: 0ms, 200ms;
  }

  div.w3m-router-container[view-direction='next'] {
    animation:
      slide-right-out 150ms forwards ease,
      slide-right-in 150ms forwards ease;
    animation-delay: 0ms, 200ms;
  }

  @keyframes slide-left-out {
    from {
      transform: translateX(0px);
      opacity: 1;
    }
    to {
      transform: translateX(10px);
      opacity: 0;
    }
  }

  @keyframes slide-left-in {
    from {
      transform: translateX(-10px);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }

  @keyframes slide-right-out {
    from {
      transform: translateX(0px);
      opacity: 1;
    }
    to {
      transform: translateX(-10px);
      opacity: 0;
    }
  }

  @keyframes slide-right-in {
    from {
      transform: translateX(10px);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
`},9135,[4999]);
__d(function(g,r,i,a,m,e,d){"use strict";Object.defineProperty(e,'__esModule',{value:!0}),Object.defineProperty(e,"default",{enumerable:!0,get:function(){return t}});var t=r(d[0]).css`
  :host {
    z-index: var(--w3m-z-index);
    display: block;
    backface-visibility: hidden;
    will-change: opacity;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    pointer-events: none;
    opacity: 0;
    background-color: var(--wui-cover);
    transition: opacity 0.2s var(--wui-ease-out-power-2);
    will-change: opacity;
  }

  :host(.open) {
    opacity: 1;
  }

  :host(.appkit-modal) {
    position: relative;
    pointer-events: unset;
    background: none;
    width: 100%;
    opacity: 1;
  }

  wui-card {
    max-width: var(--w3m-modal-width);
    width: 100%;
    position: relative;
    animation: zoom-in 0.2s var(--wui-ease-out-power-2);
    animation-fill-mode: backwards;
    outline: none;
    transition:
      border-radius var(--wui-duration-lg) var(--wui-ease-out-power-1),
      background-color var(--wui-duration-lg) var(--wui-ease-out-power-1);
    will-change: border-radius, background-color;
  }

  :host(.appkit-modal) wui-card {
    max-width: 400px;
  }

  wui-card[shake='true'] {
    animation:
      zoom-in 0.2s var(--wui-ease-out-power-2),
      w3m-shake 0.5s var(--wui-ease-out-power-2);
  }

  wui-flex {
    overflow-x: hidden;
    overflow-y: auto;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
  }

  @media (max-height: 700px) and (min-width: 431px) {
    wui-flex {
      align-items: flex-start;
    }

    wui-card {
      margin: var(--wui-spacing-xxl) 0px;
    }
  }

  @media (max-width: 430px) {
    wui-flex {
      align-items: flex-end;
    }

    wui-card {
      max-width: 100%;
      border-bottom-left-radius: var(--local-border-bottom-mobile-radius);
      border-bottom-right-radius: var(--local-border-bottom-mobile-radius);
      border-bottom: none;
      animation: slide-in 0.2s var(--wui-ease-out-power-2);
    }

    wui-card[shake='true'] {
      animation:
        slide-in 0.2s var(--wui-ease-out-power-2),
        w3m-shake 0.5s var(--wui-ease-out-power-2);
    }
  }

  @keyframes zoom-in {
    0% {
      transform: scale(0.95) translateY(0);
    }
    100% {
      transform: scale(1) translateY(0);
    }
  }

  @keyframes slide-in {
    0% {
      transform: scale(1) translateY(50px);
    }
    100% {
      transform: scale(1) translateY(0);
    }
  }

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

  @keyframes w3m-view-height {
    from {
      height: var(--prev-height);
    }
    to {
      height: var(--new-height);
    }
  }
`},9136,[4999]);