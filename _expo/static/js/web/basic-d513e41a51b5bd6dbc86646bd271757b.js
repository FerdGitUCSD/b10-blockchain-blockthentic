__d(function(g,r,i,a,m,e,d){"use strict";Object.defineProperty(e,'__esModule',{value:!0});var t=r(d[0]);Object.keys(t).forEach(function(n){'default'===n||Object.prototype.hasOwnProperty.call(e,n)||Object.defineProperty(e,n,{enumerable:!0,get:function(){return t[n]}})});var n=r(d[1]);Object.keys(n).forEach(function(t){'default'===t||Object.prototype.hasOwnProperty.call(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:function(){return n[t]}})});var c=r(d[2]);Object.keys(c).forEach(function(t){'default'===t||Object.prototype.hasOwnProperty.call(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:function(){return c[t]}})})},6866,[6869,6910,6935]);
__d(function(g,_r,_i,a,m,e,_d){"use strict";Object.defineProperty(e,'__esModule',{value:!0}),Object.defineProperty(e,"W3mConnectingWcBasicView",{enumerable:!0,get:function(){return o}});var t=_r(_d[0]),i=_r(_d[1]),n=_r(_d[2]),l=_r(_d[3]);_r(_d[4]),_r(_d[5]),_r(_d[6]),_r(_d[7]);var r=this&&this.__decorate||function(t,i,n,l){var r,o=arguments.length,s=o<3?i:null===l?l=Object.getOwnPropertyDescriptor(i,n):l;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)s=Reflect.decorate(t,i,n,l);else for(var c=t.length-1;c>=0;c--)(r=t[c])&&(s=(o<3?r(s):o>3?r(i,n,s):r(i,n))||s);return o>3&&s&&Object.defineProperty(i,n,s),s};let o=class extends t.LitElement{constructor(){super(),this.unsubscribe=[],this.isMobile=n.CoreHelperUtil.isMobile(),this.remoteFeatures=n.OptionsController.state.remoteFeatures,this.unsubscribe.push(n.OptionsController.subscribeKey('remoteFeatures',t=>this.remoteFeatures=t))}disconnectedCallback(){this.unsubscribe.forEach(t=>t())}render(){if(this.isMobile){const{featured:i,recommended:l}=n.ApiController.state,{customWallets:r}=n.OptionsController.state,o=n.StorageUtil.getRecentWallets(),s=i.length||l.length||r?.length||o.length;return t.html`<wui-flex flexDirection="column" gap="2" .margin=${['1','3','3','3']}>
        ${s?t.html`<w3m-connector-list></w3m-connector-list>`:null}
        <w3m-all-wallets-widget></w3m-all-wallets-widget>
      </wui-flex>`}return t.html`<wui-flex flexDirection="column" .padding=${['0','0','4','0']}>
        <w3m-connecting-wc-view ?basic=${!0} .displayBranding=${!1}></w3m-connecting-wc-view>
        <wui-flex flexDirection="column" .padding=${['0','3','0','3']}>
          <w3m-all-wallets-widget></w3m-all-wallets-widget>
        </wui-flex>
      </wui-flex>
      ${this.reownBrandingTemplate()} `}reownBrandingTemplate(){return this.remoteFeatures?.reownBranding?t.html` <wui-flex flexDirection="column" .padding=${['1','0','1','0']}>
      <wui-ux-by-reown></wui-ux-by-reown>
    </wui-flex>`:null}};r([(0,i.state)()],o.prototype,"isMobile",void 0),r([(0,i.state)()],o.prototype,"remoteFeatures",void 0),o=r([(0,l.customElement)('w3m-connecting-wc-basic-view')],o)},6869,[5531,5557,6247,6277,6285,6870,6871,6873]);
__d(function(g,_r,_i,a,m,e,_d){"use strict";Object.defineProperty(e,'__esModule',{value:!0}),Object.defineProperty(e,"W3mAllWalletsWidget",{enumerable:!0,get:function(){return c}});var t=_r(_d[0]),l=_r(_d[1]),o=_r(_d[2]),n=_r(_d[3]),r=_r(_d[4]),s=_r(_d[5]);_r(_d[6]);var i=this&&this.__decorate||function(t,l,o,n){var r,s=arguments.length,i=s<3?l:null===n?n=Object.getOwnPropertyDescriptor(l,o):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)i=Reflect.decorate(t,l,o,n);else for(var c=t.length-1;c>=0;c--)(r=t[c])&&(i=(s<3?r(i):s>3?r(l,o,i):r(l,o))||i);return s>3&&i&&Object.defineProperty(l,o,i),i};let c=class extends t.LitElement{constructor(){super(),this.unsubscribe=[],this.tabIdx=void 0,this.connectors=r.ConnectorController.state.connectors,this.count=r.ApiController.state.count,this.filteredCount=r.ApiController.state.filteredWallets.length,this.isFetchingRecommendedWallets=r.ApiController.state.isFetchingRecommendedWallets,this.unsubscribe.push(r.ConnectorController.subscribeKey('connectors',t=>this.connectors=t),r.ApiController.subscribeKey('count',t=>this.count=t),r.ApiController.subscribeKey('filteredWallets',t=>this.filteredCount=t.length),r.ApiController.subscribeKey('isFetchingRecommendedWallets',t=>this.isFetchingRecommendedWallets=t))}disconnectedCallback(){this.unsubscribe.forEach(t=>t())}render(){const l=this.connectors.find(t=>'walletConnect'===t.id),{allWallets:s}=r.OptionsController.state;if(!l||'HIDE'===s)return null;if('ONLY_MOBILE'===s&&!r.CoreHelperUtil.isMobile())return null;const i=r.ApiController.state.featured.length,c=this.count+i,d=c<10?c:10*Math.floor(c/10),u=this.filteredCount>0?this.filteredCount:d;let h=`${u}`;this.filteredCount>0?h=`${this.filteredCount}`:u<c&&(h=`${u}+`);const C=r.ConnectionController.hasAnyConnection(n.ConstantsUtil.CONNECTOR_ID.WALLET_CONNECT);return t.html`
      <wui-list-wallet
        name="Search Wallet"
        walletIcon="search"
        showAllWallets
        @click=${this.onAllWallets.bind(this)}
        tagLabel=${h}
        tagVariant="info"
        data-testid="all-wallets"
        tabIdx=${(0,o.ifDefined)(this.tabIdx)}
        .loading=${this.isFetchingRecommendedWallets}
        ?disabled=${C}
        size="sm"
      ></wui-list-wallet>
    `}onAllWallets(){r.EventsController.sendEvent({type:'track',event:'CLICK_ALL_WALLETS'}),r.RouterController.push('AllWallets',{redirectView:r.RouterController.state.data?.redirectView})}};i([(0,l.property)()],c.prototype,"tabIdx",void 0),i([(0,l.state)()],c.prototype,"connectors",void 0),i([(0,l.state)()],c.prototype,"count",void 0),i([(0,l.state)()],c.prototype,"filteredCount",void 0),i([(0,l.state)()],c.prototype,"isFetchingRecommendedWallets",void 0),c=i([(0,s.customElement)('w3m-all-wallets-widget')],c)},6870,[5531,5557,5568,6192,6247,6277,6288]);
__d(function(g,_r,_i,a,m,_e,_d){"use strict";Object.defineProperty(_e,'__esModule',{value:!0}),Object.defineProperty(_e,"W3mConnectorList",{enumerable:!0,get:function(){return p}});var e=_r(_d[0]),t=_r(_d[1]),n=_r(_d[2]),o=_r(_d[3]),r=_r(_d[4]),l=_r(_d[5]);_r(_d[6]);var c,i=_r(_d[7]),s=_r(_d[8]),d=_r(_d[9]),u=(c=d)&&c.__esModule?c:{default:c},C=this&&this.__decorate||function(e,t,n,o){var r,l=arguments.length,c=l<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,n):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)c=Reflect.decorate(e,t,n,o);else for(var i=e.length-1;i>=0;i--)(r=e[i])&&(c=(l<3?r(c):l>3?r(t,n,c):r(t,n))||c);return l>3&&c&&Object.defineProperty(t,n,c),c};let p=class extends e.LitElement{constructor(){super(),this.unsubscribe=[],this.connectors=r.ConnectorController.state.connectors,this.recommended=r.ApiController.state.recommended,this.featured=r.ApiController.state.featured,this.explorerWallets=r.ApiController.state.explorerWallets,this.connections=r.ConnectionController.state.connections,this.connectorImages=r.AssetController.state.connectorImages,this.loadingTelegram=!1,this.unsubscribe.push(r.ConnectorController.subscribeKey('connectors',e=>this.connectors=e),r.ConnectionController.subscribeKey('connections',e=>this.connections=e),r.AssetController.subscribeKey('connectorImages',e=>this.connectorImages=e),r.ApiController.subscribeKey('recommended',e=>this.recommended=e),r.ApiController.subscribeKey('featured',e=>this.featured=e),r.ApiController.subscribeKey('explorerFilteredWallets',e=>{this.explorerWallets=e?.length?e:r.ApiController.state.explorerWallets}),r.ApiController.subscribeKey('explorerWallets',e=>{this.explorerWallets?.length||(this.explorerWallets=e)})),r.CoreHelperUtil.isTelegram()&&r.CoreHelperUtil.isIos()&&(this.loadingTelegram=!r.ConnectionController.state.wcUri,this.unsubscribe.push(r.ConnectionController.subscribeKey('wcUri',e=>this.loadingTelegram=!e)))}disconnectedCallback(){this.unsubscribe.forEach(e=>e())}render(){return e.html`
      <wui-flex flexDirection="column" gap="2"> ${this.connectorListTemplate()} </wui-flex>
    `}mapConnectorsToExplorerWallets(e,t){return e.map(e=>{if('MULTI_CHAIN'===e.type&&e.connectors){const n=e.connectors.map(e=>e.id),o=e.connectors.map(e=>e.name),r=e.connectors.map(e=>e.info?.rdns),l=t?.find(e=>n.includes(e.id)||o.includes(e.name)||e.rdns&&(r.includes(e.rdns)||n.includes(e.rdns)));return e.explorerWallet=l??e.explorerWallet,e}const n=t?.find(t=>t.id===e.id||t.rdns===e.info?.rdns||t.name===e.name);return e.explorerWallet=n??e.explorerWallet,e})}processConnectorsByType(e,t=!0){const n=s.ConnectorUtil.sortConnectorsByExplorerWallet([...e]);return t?n.filter(s.ConnectorUtil.showConnector):n}connectorListTemplate(){const e=this.mapConnectorsToExplorerWallets(this.connectors,this.explorerWallets??[]),t=s.ConnectorUtil.getConnectorsByType(e,this.recommended,this.featured),n=this.processConnectorsByType(t.announced.filter(e=>'walletConnect'!==e.id)),l=this.processConnectorsByType(t.injected),c=this.processConnectorsByType(t.multiChain.filter(e=>'WalletConnect'!==e.name),!1),i=t.custom,d=t.recent,u=this.processConnectorsByType(t.external.filter(e=>e.id!==o.ConstantsUtil.CONNECTOR_ID.COINBASE_SDK)),C=t.recommended,p=t.featured,h=s.ConnectorUtil.getConnectorTypeOrder({custom:i,recent:d,announced:n,injected:l,multiChain:c,recommended:C,featured:p,external:u}),f=this.connectors.find(e=>'walletConnect'===e.id),b=r.CoreHelperUtil.isMobile(),y=[];for(const e of h)switch(e){case'walletConnect':!b&&f&&y.push({kind:'connector',subtype:'walletConnect',connector:f});break;case'recent':s.ConnectorUtil.getFilteredRecentWallets().forEach(e=>y.push({kind:'wallet',subtype:'recent',wallet:e}));break;case'injected':c.forEach(e=>y.push({kind:'connector',subtype:'multiChain',connector:e})),n.forEach(e=>y.push({kind:'connector',subtype:'announced',connector:e})),l.forEach(e=>y.push({kind:'connector',subtype:'injected',connector:e}));break;case'featured':p.forEach(e=>y.push({kind:'wallet',subtype:'featured',wallet:e}));break;case'custom':s.ConnectorUtil.getFilteredCustomWallets(i??[]).forEach(e=>y.push({kind:'wallet',subtype:'custom',wallet:e}));break;case'external':u.forEach(e=>y.push({kind:'connector',subtype:'external',connector:e}));break;case'recommended':s.ConnectorUtil.getCappedRecommendedWallets(C).forEach(e=>y.push({kind:'wallet',subtype:'recommended',wallet:e}));break;default:console.warn(`Unknown connector type: ${e}`)}return y.map((e,t)=>'connector'===e.kind?this.renderConnector(e,t):this.renderWallet(e,t))}renderConnector(t,l){const c=t.connector,s=r.AssetUtil.getConnectorImage(c)||this.connectorImages[c?.imageId??''],d=(this.connections.get(c.chain)??[]).some(e=>i.HelpersUtil.isLowerCaseMatch(e.connectorId,c.id));let u,C;'multiChain'===t.subtype?(u='multichain',C='info'):'walletConnect'===t.subtype?(u='qr code',C='accent'):'injected'===t.subtype||'announced'===t.subtype?(u=d?'connected':'installed',C=d?'info':'success'):(u=void 0,C=void 0);const p=r.ConnectionController.hasAnyConnection(o.ConstantsUtil.CONNECTOR_ID.WALLET_CONNECT),h=('walletConnect'===t.subtype||'external'===t.subtype)&&p;return e.html`
      <w3m-list-wallet
        displayIndex=${l}
        imageSrc=${(0,n.ifDefined)(s)}
        .installed=${!0}
        name=${c.name??'Unknown'}
        .tagVariant=${C}
        tagLabel=${(0,n.ifDefined)(u)}
        data-testid=${`wallet-selector-${c.id.toLowerCase()}`}
        size="sm"
        @click=${()=>this.onClickConnector(t)}
        tabIdx=${(0,n.ifDefined)(this.tabIdx)}
        ?disabled=${h}
        rdnsId=${(0,n.ifDefined)(c.explorerWallet?.rdns||void 0)}
        walletRank=${(0,n.ifDefined)(c.explorerWallet?.order)}
      >
      </w3m-list-wallet>
    `}onClickConnector(e){const t=r.RouterController.state.data?.redirectView;return'walletConnect'===e.subtype?(r.ConnectorController.setActiveConnector(e.connector),void(r.CoreHelperUtil.isMobile()?r.RouterController.push('AllWallets'):r.RouterController.push('ConnectingWalletConnect',{redirectView:t}))):'multiChain'===e.subtype?(r.ConnectorController.setActiveConnector(e.connector),void r.RouterController.push('ConnectingMultiChain',{redirectView:t})):'injected'===e.subtype?(r.ConnectorController.setActiveConnector(e.connector),void r.RouterController.push('ConnectingExternal',{connector:e.connector,redirectView:t,wallet:e.connector.explorerWallet})):'announced'===e.subtype?'walletConnect'===e.connector.id?void(r.CoreHelperUtil.isMobile()?r.RouterController.push('AllWallets'):r.RouterController.push('ConnectingWalletConnect',{redirectView:t})):void r.RouterController.push('ConnectingExternal',{connector:e.connector,redirectView:t,wallet:e.connector.explorerWallet}):void r.RouterController.push('ConnectingExternal',{connector:e.connector,redirectView:t})}renderWallet(t,l){const c=t.wallet,i=r.AssetUtil.getWalletImage(c),s=r.ConnectionController.hasAnyConnection(o.ConstantsUtil.CONNECTOR_ID.WALLET_CONNECT),d=this.loadingTelegram,u='recent'===t.subtype?'recent':void 0,C='recent'===t.subtype?'info':void 0;return e.html`
      <w3m-list-wallet
        displayIndex=${l}
        imageSrc=${(0,n.ifDefined)(i)}
        name=${c.name??'Unknown'}
        @click=${()=>this.onClickWallet(t)}
        size="sm"
        data-testid=${`wallet-selector-${c.id}`}
        tabIdx=${(0,n.ifDefined)(this.tabIdx)}
        ?loading=${d}
        ?disabled=${s}
        rdnsId=${(0,n.ifDefined)(c.rdns||void 0)}
        walletRank=${(0,n.ifDefined)(c.order)}
        tagLabel=${(0,n.ifDefined)(u)}
        .tagVariant=${C}
      >
      </w3m-list-wallet>
    `}onClickWallet(e){const t=r.RouterController.state.data?.redirectView;if('featured'===e.subtype)return void r.ConnectorController.selectWalletConnector(e.wallet);if('recent'===e.subtype){if(this.loadingTelegram)return;return void r.ConnectorController.selectWalletConnector(e.wallet)}if('custom'===e.subtype){if(this.loadingTelegram)return;return void r.RouterController.push('ConnectingWalletConnect',{wallet:e.wallet,redirectView:t})}if(this.loadingTelegram)return;const n=r.ConnectorController.getConnector({id:e.wallet.id,rdns:e.wallet.rdns});n?r.RouterController.push('ConnectingExternal',{connector:n,redirectView:t}):r.RouterController.push('ConnectingWalletConnect',{wallet:e.wallet,redirectView:t})}};p.styles=u.default,C([(0,t.property)({type:Number})],p.prototype,"tabIdx",void 0),C([(0,t.state)()],p.prototype,"connectors",void 0),C([(0,t.state)()],p.prototype,"recommended",void 0),C([(0,t.state)()],p.prototype,"featured",void 0),C([(0,t.state)()],p.prototype,"explorerWallets",void 0),C([(0,t.state)()],p.prototype,"connections",void 0),C([(0,t.state)()],p.prototype,"connectorImages",void 0),C([(0,t.state)()],p.prototype,"loadingTelegram",void 0),p=C([(0,l.customElement)('w3m-connector-list')],p)},6871,[5531,5557,5568,6192,6247,6277,6285,6263,6262,6872]);
__d(function(g,r,i,a,m,e,d){"use strict";Object.defineProperty(e,'__esModule',{value:!0}),Object.defineProperty(e,"default",{enumerable:!0,get:function(){return c}});var c=r(d[0]).css`
  :host {
    margin-top: ${({spacing:c})=>c[1]};
  }
  wui-separator {
    margin: ${({spacing:c})=>c[3]} calc(${({spacing:c})=>c[3]} * -1)
      ${({spacing:c})=>c[2]} calc(${({spacing:c})=>c[3]} * -1);
    width: calc(100% + ${({spacing:c})=>c[3]} * 2);
  }
`},6872,[6277]);
__d(function(g,_r,_i,a,m,_e,_d){"use strict";Object.defineProperty(_e,'__esModule',{value:!0}),Object.defineProperty(_e,"W3mConnectingWcView",{enumerable:!0,get:function(){return h}});var e=_r(_d[0]),t=_r(_d[1]),o=_r(_d[2]),r=_r(_d[3]),n=_r(_d[4]),i=_r(_d[5]);_r(_d[6]),_r(_d[7]),_r(_d[8]),_r(_d[9]),_r(_d[10]),_r(_d[11]),_r(_d[12]);var s,l=_r(_d[13]),c=(s=l)&&s.__esModule?s:{default:s},p=this&&this.__decorate||function(e,t,o,r){var n,i=arguments.length,s=i<3?t:null===r?r=Object.getOwnPropertyDescriptor(t,o):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)s=Reflect.decorate(e,t,o,r);else for(var l=e.length-1;l>=0;l--)(n=e[l])&&(s=(i<3?n(s):i>3?n(t,o,s):n(t,o))||s);return i>3&&s&&Object.defineProperty(t,o,s),s};let h=class extends e.LitElement{constructor(){super(),this.wallet=r.RouterController.state.data?.wallet,this.unsubscribe=[],this.platform=void 0,this.platforms=[],this.isSiwxEnabled=Boolean(r.OptionsController.state.siwx),this.remoteFeatures=r.OptionsController.state.remoteFeatures,this.displayBranding=!0,this.basic=!1,this.determinePlatforms(),this.initializeConnection(),this.unsubscribe.push(r.OptionsController.subscribeKey('remoteFeatures',e=>this.remoteFeatures=e))}disconnectedCallback(){this.unsubscribe.forEach(e=>e())}render(){return r.OptionsController.state.enableMobileFullScreen&&this.setAttribute('data-mobile-fullscreen','true'),e.html`
      ${this.headerTemplate()}
      <div class="platform-container">${this.platformTemplate()}</div>
      ${this.reownBrandingTemplate()}
    `}reownBrandingTemplate(){return this.remoteFeatures?.reownBranding&&this.displayBranding?e.html`<wui-ux-by-reown></wui-ux-by-reown>`:null}async initializeConnection(e=!1){if('browser'!==this.platform&&(!r.OptionsController.state.manualWCControl||e))try{const{wcPairingExpiry:t,status:o}=r.ConnectionController.state,{redirectView:n}=r.RouterController.state.data??{};if(e||r.OptionsController.state.enableEmbedded||r.CoreHelperUtil.isPairingExpired(t)||'connecting'===o){const e=r.ConnectionController.getConnections(r.ChainController.state.activeChain),t=this.remoteFeatures?.multiWallet,o=e.length>0;await r.ConnectionController.connectWalletConnect({cache:'never'}),this.isSiwxEnabled||(o&&t?(r.RouterController.replace('ProfileWallets'),r.SnackController.showSuccess('New Wallet Added')):n?r.RouterController.replace(n):r.ModalController.close())}}catch(e){if(e instanceof Error&&e.message.includes('An error occurred when attempting to switch chain')&&!r.OptionsController.state.enableNetworkSwitch&&r.ChainController.state.activeChain)return r.ChainController.setActiveCaipNetwork(i.CaipNetworksUtil.getUnsupportedNetwork(`${r.ChainController.state.activeChain}:${r.ChainController.state.activeCaipNetwork?.id}`)),void r.ChainController.showUnsupportedChainUI();e instanceof r.AppKitError&&e.originalName===o.ErrorUtil.PROVIDER_RPC_ERROR_NAME.USER_REJECTED_REQUEST?r.EventsController.sendEvent({type:'track',event:'USER_REJECTED',properties:{message:e.message}}):r.EventsController.sendEvent({type:'track',event:'CONNECT_ERROR',properties:{message:e?.message??'Unknown'}}),r.ConnectionController.setWcError(!0),r.SnackController.showError(e.message??'Connection error'),r.ConnectionController.resetWcConnection(),r.RouterController.goBack()}}determinePlatforms(){if(!this.wallet)return this.platforms.push('qrcode'),void(this.platform='qrcode');if(this.platform)return;const{mobile_link:e,desktop_link:t,webapp_link:o,injected:n,rdns:i}=this.wallet,s=n?.map(({injected_id:e})=>e).filter(Boolean),l=[...i?[i]:s??[]],c=!r.OptionsController.state.isUniversalProvider&&l.length,p=e,h=o,d=r.ConnectionController.checkInstalled(l),u=c&&d,w=t&&!r.CoreHelperUtil.isMobile();u&&!r.ChainController.state.noAdapters&&this.platforms.push('browser'),p&&this.platforms.push(r.CoreHelperUtil.isMobile()?'mobile':'qrcode'),h&&this.platforms.push('web'),w&&this.platforms.push('desktop'),u||!c||r.ChainController.state.noAdapters||this.platforms.push('unsupported'),this.platform=this.platforms[0]}platformTemplate(){switch(this.platform){case'browser':return e.html`<w3m-connecting-wc-browser></w3m-connecting-wc-browser>`;case'web':return e.html`<w3m-connecting-wc-web></w3m-connecting-wc-web>`;case'desktop':return e.html`
          <w3m-connecting-wc-desktop .onRetry=${()=>this.initializeConnection(!0)}>
          </w3m-connecting-wc-desktop>
        `;case'mobile':return e.html`
          <w3m-connecting-wc-mobile isMobile .onRetry=${()=>this.initializeConnection(!0)}>
          </w3m-connecting-wc-mobile>
        `;case'qrcode':return e.html`<w3m-connecting-wc-qrcode ?basic=${this.basic}></w3m-connecting-wc-qrcode>`;default:return e.html`<w3m-connecting-wc-unsupported></w3m-connecting-wc-unsupported>`}}headerTemplate(){return this.platforms.length>1?e.html`
      <w3m-connecting-header
        .platforms=${this.platforms}
        .onSelectPlatfrom=${this.onSelectPlatform.bind(this)}
      >
      </w3m-connecting-header>
    `:null}async onSelectPlatform(e){const t=this.shadowRoot?.querySelector('div');t&&(await t.animate([{opacity:1},{opacity:0}],{duration:200,fill:'forwards',easing:'ease'}).finished,this.platform=e,t.animate([{opacity:0},{opacity:1}],{duration:200,fill:'forwards',easing:'ease'}))}};h.styles=c.default,p([(0,t.state)()],h.prototype,"platform",void 0),p([(0,t.state)()],h.prototype,"platforms",void 0),p([(0,t.state)()],h.prototype,"isSiwxEnabled",void 0),p([(0,t.state)()],h.prototype,"remoteFeatures",void 0),p([(0,t.property)({type:Boolean})],h.prototype,"displayBranding",void 0),p([(0,t.property)({type:Boolean})],h.prototype,"basic",void 0),h=p([(0,n.customElement)('w3m-connecting-wc-view')],h)},6873,[5531,5557,6192,6247,6277,6263,6874,6880,6896,6897,6898,6907,6908,6909]);
__d(function(g,_r,_i,a,m,e,_d){"use strict";Object.defineProperty(e,'__esModule',{value:!0}),Object.defineProperty(e,"W3mConnectingHeader",{enumerable:!0,get:function(){return l}});var t=_r(_d[0]),o=_r(_d[1]),r=_r(_d[2]);_r(_d[3]),_r(_d[4]);var n=this&&this.__decorate||function(t,o,r,n){var l,s=arguments.length,i=s<3?o:null===n?n=Object.getOwnPropertyDescriptor(o,r):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)i=Reflect.decorate(t,o,r,n);else for(var c=t.length-1;c>=0;c--)(l=t[c])&&(i=(s<3?l(i):s>3?l(o,r,i):l(o,r))||i);return s>3&&i&&Object.defineProperty(o,r,i),i};let l=class extends t.LitElement{constructor(){super(...arguments),this.platformTabs=[],this.unsubscribe=[],this.platforms=[],this.onSelectPlatfrom=void 0}disconnectCallback(){this.unsubscribe.forEach(t=>t())}render(){const o=this.generateTabs();return t.html`
      <wui-flex justifyContent="center" .padding=${['0','0','4','0']}>
        <wui-tabs .tabs=${o} .onTabChange=${this.onTabChange.bind(this)}></wui-tabs>
      </wui-flex>
    `}generateTabs(){const t=this.platforms.map(t=>'browser'===t?{label:'Browser',icon:'extension',platform:'browser'}:'mobile'===t?{label:'Mobile',icon:'mobile',platform:'mobile'}:'qrcode'===t?{label:'Mobile',icon:'mobile',platform:'qrcode'}:'web'===t?{label:'Webapp',icon:'browser',platform:'web'}:'desktop'===t?{label:'Desktop',icon:'desktop',platform:'desktop'}:{label:'Browser',icon:'extension',platform:'unsupported'});return this.platformTabs=t.map(({platform:t})=>t),t}onTabChange(t){const o=this.platformTabs[t];o&&this.onSelectPlatfrom?.(o)}};n([(0,o.property)({type:Array})],l.prototype,"platforms",void 0),n([(0,o.property)()],l.prototype,"onSelectPlatfrom",void 0),l=n([(0,r.customElement)('w3m-connecting-header')],l)},6874,[5531,5557,6277,6285,6875]);
__d(function(g,r,i,a,m,e,d){"use strict";Object.defineProperty(e,'__esModule',{value:!0});var t=r(d[0]);Object.keys(t).forEach(function(n){'default'===n||Object.prototype.hasOwnProperty.call(e,n)||Object.defineProperty(e,n,{enumerable:!0,get:function(){return t[n]}})})},6875,[6876]);
__d(function(g,_r,_i,a,m,_e,_d){"use strict";Object.defineProperty(_e,'__esModule',{value:!0}),Object.defineProperty(_e,"WuiTabs",{enumerable:!0,get:function(){return l}});var e=_r(_d[0]),t=_r(_d[1]),i=_r(_d[2]),r=_r(_d[3]);_r(_d[4]);var s,o=_r(_d[5]),n=(s=o)&&s.__esModule?s:{default:s},c=this&&this.__decorate||function(e,t,i,r){var s,o=arguments.length,n=o<3?t:null===r?r=Object.getOwnPropertyDescriptor(t,i):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,i,r);else for(var c=e.length-1;c>=0;c--)(s=e[c])&&(n=(o<3?s(n):o>3?s(t,i,n):s(t,i))||n);return o>3&&n&&Object.defineProperty(t,i,n),n};let l=class extends e.LitElement{constructor(){super(...arguments),this.tabs=[],this.onTabChange=()=>null,this.size='md',this.activeTab=0}render(){return this.dataset.size=this.size,this.tabs.map((t,i)=>{const r=i===this.activeTab;return e.html`
        <wui-tab-item
          @click=${()=>this.onTabClick(i)}
          icon=${t.icon}
          size=${this.size}
          label=${t.label}
          ?active=${r}
          data-active=${r}
          data-testid="tab-${t.label?.toLowerCase()}"
        ></wui-tab-item>
      `})}onTabClick(e){this.activeTab=e,this.onTabChange(e)}};l.styles=[i.resetStyles,i.elementStyles,n.default],c([(0,t.property)({type:Array})],l.prototype,"tabs",void 0),c([(0,t.property)()],l.prototype,"onTabChange",void 0),c([(0,t.property)()],l.prototype,"size",void 0),c([(0,t.state)()],l.prototype,"activeTab",void 0),l=c([(0,r.customElement)('wui-tabs')],l)},6876,[5531,5557,6279,6284,6877,6879]);
__d(function(g,_r,_i,a,m,_e,_d){"use strict";Object.defineProperty(_e,'__esModule',{value:!0}),Object.defineProperty(_e,"WuiTab",{enumerable:!0,get:function(){return p}});var e=_r(_d[0]),t=_r(_d[1]);_r(_d[2]),_r(_d[3]);var i,r=_r(_d[4]),o=_r(_d[5]),s=_r(_d[6]),l=(i=s)&&i.__esModule?i:{default:i},n=this&&this.__decorate||function(e,t,i,r){var o,s=arguments.length,l=s<3?t:null===r?r=Object.getOwnPropertyDescriptor(t,i):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)l=Reflect.decorate(e,t,i,r);else for(var n=e.length-1;n>=0;n--)(o=e[n])&&(l=(s<3?o(l):s>3?o(t,i,l):o(t,i))||l);return s>3&&l&&Object.defineProperty(t,i,l),l};const c={lg:'lg-regular',md:'md-regular',sm:'sm-regular'},u={lg:'md',md:'sm',sm:'sm'};let p=class extends e.LitElement{constructor(){super(...arguments),this.icon='mobile',this.size='md',this.label='',this.active=!1}render(){return e.html`
      <button data-active=${this.active}>
        ${this.icon?e.html`<wui-icon size=${u[this.size]} name=${this.icon}></wui-icon>`:''}
        <wui-text variant=${c[this.size]}> ${this.label} </wui-text>
      </button>
    `}};p.styles=[r.resetStyles,r.elementStyles,l.default],n([(0,t.property)()],p.prototype,"icon",void 0),n([(0,t.property)()],p.prototype,"size",void 0),n([(0,t.property)()],p.prototype,"label",void 0),n([(0,t.property)({type:Boolean})],p.prototype,"active",void 0),p=n([(0,o.customElement)('wui-tab-item')],p)},6877,[5531,5557,6290,6313,6279,6284,6878]);
__d(function(g,r,i,a,m,e,d){"use strict";Object.defineProperty(e,'__esModule',{value:!0}),Object.defineProperty(e,"default",{enumerable:!0,get:function(){return t}});var t=r(d[0]).css`
  :host {
    flex: 1;
    height: 100%;
  }

  button {
    width: 100%;
    height: 100%;
    display: inline-flex;
    align-items: center;
    padding: ${({spacing:t})=>t[1]} ${({spacing:t})=>t[2]};
    column-gap: ${({spacing:t})=>t[1]};
    color: ${({tokens:t})=>t.theme.textSecondary};
    border-radius: ${({borderRadius:t})=>t[20]};
    background-color: transparent;
    transition: background-color ${({durations:t})=>t.lg}
      ${({easings:t})=>t['ease-out-power-2']};
    will-change: background-color;
  }

  /* -- Hover & Active states ----------------------------------------------------------- */
  button[data-active='true'] {
    color: ${({tokens:t})=>t.theme.textPrimary};
    background-color: ${({tokens:t})=>t.theme.foregroundTertiary};
  }

  button:hover:enabled:not([data-active='true']),
  button:active:enabled:not([data-active='true']) {
    wui-text,
    wui-icon {
      color: ${({tokens:t})=>t.theme.textPrimary};
    }
  }
`},6878,[6280]);
__d(function(g,r,i,a,m,e,d){"use strict";Object.defineProperty(e,'__esModule',{value:!0}),Object.defineProperty(e,"default",{enumerable:!0,get:function(){return t}});var t=r(d[0]).css`
  :host {
    display: inline-flex;
    align-items: center;
    background-color: ${({tokens:t})=>t.theme.foregroundSecondary};
    border-radius: ${({borderRadius:t})=>t[32]};
    padding: ${({spacing:t})=>t['01']};
    box-sizing: border-box;
  }

  :host([data-size='sm']) {
    height: 26px;
  }

  :host([data-size='md']) {
    height: 36px;
  }
`},6879,[6280]);
__d(function(g,_r,_i,a,m,e,_d){"use strict";Object.defineProperty(e,'__esModule',{value:!0}),Object.defineProperty(e,"W3mConnectingWcBrowser",{enumerable:!0,get:function(){return l}});var t=_r(_d[0]),n=_r(_d[1]),r=_r(_d[2]),o=_r(_d[3]),s=this&&this.__decorate||function(t,n,r,o){var s,l=arguments.length,i=l<3?n:null===o?o=Object.getOwnPropertyDescriptor(n,r):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)i=Reflect.decorate(t,n,r,o);else for(var c=t.length-1;c>=0;c--)(s=t[c])&&(i=(l<3?s(i):l>3?s(n,r,i):s(n,r))||i);return l>3&&i&&Object.defineProperty(n,r,i),i};let l=class extends o.W3mConnectingWidget{constructor(){if(super(),!this.wallet)throw new Error('w3m-connecting-wc-browser: No wallet provided');this.onConnect=this.onConnectProxy.bind(this),this.onAutoConnect=this.onConnectProxy.bind(this),n.EventsController.sendEvent({type:'track',event:'SELECT_WALLET',properties:{name:this.wallet.name,platform:'browser',displayIndex:this.wallet?.display_index,walletRank:this.wallet.order,view:n.RouterController.state.view}})}async onConnectProxy(){try{this.error=!1;const{connectors:t}=n.ConnectorController.state,r=t.find(t=>'ANNOUNCED'===t.type&&t.info?.rdns===this.wallet?.rdns||'INJECTED'===t.type||t.name===this.wallet?.name);if(!r)throw new Error('w3m-connecting-wc-browser: No connector found');await n.ConnectionController.connectExternal(r,r.chain),n.ModalController.close(),n.EventsController.sendEvent({type:'track',event:'CONNECT_SUCCESS',properties:{method:'browser',name:this.wallet?.name||'Unknown',view:n.RouterController.state.view,walletRank:this.wallet?.order}})}catch(r){r instanceof n.AppKitError&&r.originalName===t.ErrorUtil.PROVIDER_RPC_ERROR_NAME.USER_REJECTED_REQUEST?n.EventsController.sendEvent({type:'track',event:'USER_REJECTED',properties:{message:r.message}}):n.EventsController.sendEvent({type:'track',event:'CONNECT_ERROR',properties:{message:r?.message??'Unknown'}}),this.error=!0}}};l=s([(0,r.customElement)('w3m-connecting-wc-browser')],l)},6880,[6192,6247,6277,6881]);
__d(function(g,_r,_i,a,m,_e,_d){"use strict";Object.defineProperty(_e,'__esModule',{value:!0}),Object.defineProperty(_e,"W3mConnectingWidget",{enumerable:!0,get:function(){return c}});var e=_r(_d[0]),t=_r(_d[1]),i=_r(_d[2]),o=_r(_d[3]);_r(_d[4]),_r(_d[5]),_r(_d[6]),_r(_d[7]),_r(_d[8]),_r(_d[9]),_r(_d[10]),_r(_d[11]),_r(_d[12]);var r,n=_r(_d[13]),s=(r=n)&&r.__esModule?r:{default:r},l=this&&this.__decorate||function(e,t,i,o){var r,n=arguments.length,s=n<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)s=Reflect.decorate(e,t,i,o);else for(var l=e.length-1;l>=0;l--)(r=e[l])&&(s=(n<3?r(s):n>3?r(t,i,s):r(t,i))||s);return n>3&&s&&Object.defineProperty(t,i,s),s};class c extends e.LitElement{constructor(){super(),this.wallet=o.RouterController.state.data?.wallet,this.connector=o.RouterController.state.data?.connector,this.timeout=void 0,this.secondaryBtnIcon='refresh',this.onConnect=void 0,this.onRender=void 0,this.onAutoConnect=void 0,this.isWalletConnect=!0,this.unsubscribe=[],this.imageSrc=o.AssetUtil.getConnectorImage(this.connector)??o.AssetUtil.getWalletImage(this.wallet),this.name=this.wallet?.name??this.connector?.name??'Wallet',this.isRetrying=!1,this.uri=o.ConnectionController.state.wcUri,this.error=o.ConnectionController.state.wcError,this.ready=!1,this.showRetry=!1,this.label=void 0,this.secondaryBtnLabel='Try again',this.secondaryLabel='Accept connection request in the wallet',this.isLoading=!1,this.isMobile=!1,this.onRetry=void 0,this.unsubscribe.push(o.ConnectionController.subscribeKey('wcUri',e=>{this.uri=e,this.isRetrying&&this.onRetry&&(this.isRetrying=!1,this.onConnect?.())}),o.ConnectionController.subscribeKey('wcError',e=>this.error=e)),(o.CoreHelperUtil.isTelegram()||o.CoreHelperUtil.isSafari())&&o.CoreHelperUtil.isIos()&&o.ConnectionController.state.wcUri&&this.onConnect?.()}firstUpdated(){this.onAutoConnect?.(),this.showRetry=!this.onAutoConnect}disconnectedCallback(){this.unsubscribe.forEach(e=>e()),o.ConnectionController.setWcError(!1),clearTimeout(this.timeout)}render(){this.onRender?.(),this.onShowRetry();const t=this.error?'Connection can be declined if a previous request is still active':this.secondaryLabel;let o='';return this.label?o=this.label:(o=`Continue in ${this.name}`,this.error&&(o='Connection declined')),e.html`
      <wui-flex
        data-error=${(0,i.ifDefined)(this.error)}
        data-retry=${this.showRetry}
        flexDirection="column"
        alignItems="center"
        .padding=${['10','5','5','5']}
        gap="6"
      >
        <wui-flex gap="2" justifyContent="center" alignItems="center">
          <wui-wallet-image size="lg" imageSrc=${(0,i.ifDefined)(this.imageSrc)}></wui-wallet-image>

          ${this.error?null:this.loaderTemplate()}

          <wui-icon-box
            color="error"
            icon="close"
            size="sm"
            border
            borderColor="wui-color-bg-125"
          ></wui-icon-box>
        </wui-flex>

        <wui-flex flexDirection="column" alignItems="center" gap="6"> <wui-flex
          flexDirection="column"
          alignItems="center"
          gap="2"
          .padding=${['2','0','0','0']}
        >
          <wui-text align="center" variant="lg-medium" color=${this.error?'error':'primary'}>
            ${o}
          </wui-text>
          <wui-text align="center" variant="lg-regular" color="secondary">${t}</wui-text>
        </wui-flex>

        ${this.secondaryBtnLabel?e.html`
                <wui-button
                  variant="neutral-secondary"
                  size="md"
                  ?disabled=${this.isRetrying||this.isLoading}
                  @click=${this.onTryAgain.bind(this)}
                  data-testid="w3m-connecting-widget-secondary-button"
                >
                  <wui-icon
                    color="inherit"
                    slot="iconLeft"
                    name=${this.secondaryBtnIcon}
                  ></wui-icon>
                  ${this.secondaryBtnLabel}
                </wui-button>
              `:null}
      </wui-flex>

      ${this.isWalletConnect?e.html`
              <wui-flex .padding=${['0','5','5','5']} justifyContent="center">
                <wui-link
                  @click=${this.onCopyUri}
                  variant="secondary"
                  icon="copy"
                  data-testid="wui-link-copy"
                >
                  Copy link
                </wui-link>
              </wui-flex>
            `:null}

      <w3m-mobile-download-links .wallet=${this.wallet}></w3m-mobile-download-links></wui-flex>
      </wui-flex>
    `}onShowRetry(){if(this.error&&!this.showRetry){this.showRetry=!0;const e=this.shadowRoot?.querySelector('wui-button');e?.animate([{opacity:0},{opacity:1}],{fill:'forwards',easing:'ease'})}}onTryAgain(){o.ConnectionController.setWcError(!1),this.onRetry?(this.isRetrying=!0,this.onRetry?.()):this.onConnect?.()}loaderTemplate(){const t=o.ThemeController.state.themeVariables['--w3m-border-radius-master'],i=t?parseInt(t.replace('px',''),10):4;return e.html`<wui-loading-thumbnail radius=${9*i}></wui-loading-thumbnail>`}onCopyUri(){try{this.uri&&(o.CoreHelperUtil.copyToClopboard(this.uri),o.SnackController.showSuccess('Link copied'))}catch{o.SnackController.showError('Failed to copy')}}}c.styles=s.default,l([(0,t.state)()],c.prototype,"isRetrying",void 0),l([(0,t.state)()],c.prototype,"uri",void 0),l([(0,t.state)()],c.prototype,"error",void 0),l([(0,t.state)()],c.prototype,"ready",void 0),l([(0,t.state)()],c.prototype,"showRetry",void 0),l([(0,t.state)()],c.prototype,"label",void 0),l([(0,t.state)()],c.prototype,"secondaryBtnLabel",void 0),l([(0,t.state)()],c.prototype,"secondaryLabel",void 0),l([(0,t.state)()],c.prototype,"isLoading",void 0),l([(0,t.property)({type:Boolean})],c.prototype,"isMobile",void 0),l([(0,t.property)()],c.prototype,"onRetry",void 0)},6881,[5531,5557,5568,6247,6882,6285,6328,6885,6329,6886,6332,6889,6890,6895]);
__d(function(g,r,i,a,m,e,d){"use strict";Object.defineProperty(e,'__esModule',{value:!0});var t=r(d[0]);Object.keys(t).forEach(function(n){'default'===n||Object.prototype.hasOwnProperty.call(e,n)||Object.defineProperty(e,n,{enumerable:!0,get:function(){return t[n]}})})},6882,[6883]);
__d(function(g,_r,_i,a,m,_e,_d){"use strict";Object.defineProperty(_e,'__esModule',{value:!0}),Object.defineProperty(_e,"WuiButton",{enumerable:!0,get:function(){return u}});var t=_r(_d[0]),e=_r(_d[1]);_r(_d[2]),_r(_d[3]),_r(_d[4]);var i,o=_r(_d[5]),r=_r(_d[6]),n=_r(_d[7]),l=(i=n)&&i.__esModule?i:{default:i},s=this&&this.__decorate||function(t,e,i,o){var r,n=arguments.length,l=n<3?e:null===o?o=Object.getOwnPropertyDescriptor(e,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)l=Reflect.decorate(t,e,i,o);else for(var s=t.length-1;s>=0;s--)(r=t[s])&&(l=(n<3?r(l):n>3?r(e,i,l):r(e,i))||l);return n>3&&l&&Object.defineProperty(e,i,l),l};const d={lg:'lg-regular-mono',md:'md-regular-mono',sm:'sm-regular-mono'},p={lg:'md',md:'md',sm:'sm'};let u=class extends t.LitElement{constructor(){super(...arguments),this.size='lg',this.disabled=!1,this.fullWidth=!1,this.loading=!1,this.variant='accent-primary'}render(){this.style.cssText=`\n    --local-width: ${this.fullWidth?'100%':'auto'};\n     `;const e=this.textVariant??d[this.size];return t.html`
      <button data-variant=${this.variant} data-size=${this.size} ?disabled=${this.disabled}>
        ${this.loadingTemplate()}
        <slot name="iconLeft"></slot>
        <wui-text variant=${e} color="inherit">
          <slot></slot>
        </wui-text>
        <slot name="iconRight"></slot>
      </button>
    `}loadingTemplate(){if(this.loading){const e=p[this.size],i='neutral-primary'===this.variant||'accent-primary'===this.variant?'invert':'primary';return t.html`<wui-loading-spinner color=${i} size=${e}></wui-loading-spinner>`}return null}};u.styles=[o.resetStyles,o.elementStyles,l.default],s([(0,e.property)()],u.prototype,"size",void 0),s([(0,e.property)({type:Boolean})],u.prototype,"disabled",void 0),s([(0,e.property)({type:Boolean})],u.prototype,"fullWidth",void 0),s([(0,e.property)({type:Boolean})],u.prototype,"loading",void 0),s([(0,e.property)()],u.prototype,"variant",void 0),s([(0,e.property)()],u.prototype,"textVariant",void 0),u=s([(0,r.customElement)('wui-button')],u)},6883,[5531,5557,6290,6326,6313,6279,6284,6884]);
__d(function(g,r,i,a,m,e,d){"use strict";Object.defineProperty(e,'__esModule',{value:!0}),Object.defineProperty(e,"default",{enumerable:!0,get:function(){return o}});var o=r(d[0]).css`
  :host {
    width: var(--local-width);
  }

  button {
    width: var(--local-width);
    white-space: nowrap;
    column-gap: ${({spacing:o})=>o[2]};
    transition:
      scale ${({durations:o})=>o.lg} ${({easings:o})=>o['ease-out-power-1']},
      background-color ${({durations:o})=>o.lg}
        ${({easings:o})=>o['ease-out-power-2']},
      border-radius ${({durations:o})=>o.lg}
        ${({easings:o})=>o['ease-out-power-1']};
    will-change: scale, background-color, border-radius;
    cursor: pointer;
  }

  /* -- Sizes --------------------------------------------------- */
  button[data-size='sm'] {
    border-radius: ${({borderRadius:o})=>o[2]};
    padding: 0 ${({spacing:o})=>o[2]};
    height: 28px;
  }

  button[data-size='md'] {
    border-radius: ${({borderRadius:o})=>o[3]};
    padding: 0 ${({spacing:o})=>o[4]};
    height: 38px;
  }

  button[data-size='lg'] {
    border-radius: ${({borderRadius:o})=>o[4]};
    padding: 0 ${({spacing:o})=>o[5]};
    height: 48px;
  }

  /* -- Variants --------------------------------------------------------- */
  button[data-variant='accent-primary'] {
    background-color: ${({tokens:o})=>o.core.backgroundAccentPrimary};
    color: ${({tokens:o})=>o.theme.textInvert};
  }

  button[data-variant='accent-secondary'] {
    background-color: ${({tokens:o})=>o.core.foregroundAccent010};
    color: ${({tokens:o})=>o.core.textAccentPrimary};
  }

  button[data-variant='neutral-primary'] {
    background-color: ${({tokens:o})=>o.theme.backgroundInvert};
    color: ${({tokens:o})=>o.theme.textInvert};
  }

  button[data-variant='neutral-secondary'] {
    background-color: transparent;
    border: 1px solid ${({tokens:o})=>o.theme.borderSecondary};
    color: ${({tokens:o})=>o.theme.textPrimary};
  }

  button[data-variant='neutral-tertiary'] {
    background-color: ${({tokens:o})=>o.theme.foregroundPrimary};
    color: ${({tokens:o})=>o.theme.textPrimary};
  }

  button[data-variant='error-primary'] {
    background-color: ${({tokens:o})=>o.core.textError};
    color: ${({tokens:o})=>o.theme.textInvert};
  }

  button[data-variant='error-secondary'] {
    background-color: ${({tokens:o})=>o.core.backgroundError};
    color: ${({tokens:o})=>o.core.textError};
  }

  button[data-variant='shade'] {
    background: var(--wui-color-gray-glass-002);
    color: var(--wui-color-fg-200);
    border: none;
    box-shadow: inset 0 0 0 1px var(--wui-color-gray-glass-005);
  }

  /* -- Focus states --------------------------------------------------- */
  button[data-size='sm']:focus-visible:enabled {
    border-radius: 28px;
  }

  button[data-size='md']:focus-visible:enabled {
    border-radius: 38px;
  }

  button[data-size='lg']:focus-visible:enabled {
    border-radius: 48px;
  }
  button[data-variant='shade']:focus-visible:enabled {
    background: var(--wui-color-gray-glass-005);
    box-shadow:
      inset 0 0 0 1px var(--wui-color-gray-glass-010),
      0 0 0 4px var(--wui-color-gray-glass-002);
  }

  /* -- Hover & Active states ----------------------------------------------------------- */
  @media (hover: hover) {
    button[data-size='sm']:hover:enabled {
      border-radius: 28px;
    }

    button[data-size='md']:hover:enabled {
      border-radius: 38px;
    }

    button[data-size='lg']:hover:enabled {
      border-radius: 48px;
    }

    button[data-variant='shade']:hover:enabled {
      background: var(--wui-color-gray-glass-002);
    }

    button[data-variant='shade']:active:enabled {
      background: var(--wui-color-gray-glass-005);
    }
  }

  button[data-size='sm']:active:enabled {
    border-radius: 28px;
  }

  button[data-size='md']:active:enabled {
    border-radius: 38px;
  }

  button[data-size='lg']:active:enabled {
    border-radius: 48px;
  }

  /* -- Disabled states --------------------------------------------------- */
  button:disabled {
    opacity: 0.3;
  }
`},6884,[6280]);
__d(function(g,r,i,a,m,e,d){"use strict";Object.defineProperty(e,'__esModule',{value:!0});var t=r(d[0]);Object.keys(t).forEach(function(n){'default'===n||Object.prototype.hasOwnProperty.call(e,n)||Object.defineProperty(e,n,{enumerable:!0,get:function(){return t[n]}})})},6885,[6315]);
__d(function(g,r,i,a,m,e,d){"use strict";Object.defineProperty(e,'__esModule',{value:!0});var t=r(d[0]);Object.keys(t).forEach(function(n){'default'===n||Object.prototype.hasOwnProperty.call(e,n)||Object.defineProperty(e,n,{enumerable:!0,get:function(){return t[n]}})})},6886,[6887]);
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
    `}};d.styles=[s.resetStyles,n.default],u([(0,r.property)({type:Number})],d.prototype,"radius",void 0),d=u([(0,o.customElement)('wui-loading-thumbnail')],d)},6887,[5531,5557,6279,6284,6888]);
__d(function(g,r,i,a,m,e,d){"use strict";Object.defineProperty(e,'__esModule',{value:!0}),Object.defineProperty(e,"default",{enumerable:!0,get:function(){return t}});var t=r(d[0]).css`
  :host {
    display: block;
    width: 100px;
    height: 100px;
  }

  svg {
    width: 100px;
    height: 100px;
  }

  rect {
    fill: none;
    stroke: ${t=>t.colors.accent100};
    stroke-width: 3px;
    stroke-linecap: round;
    animation: dash 1s linear infinite;
  }

  @keyframes dash {
    to {
      stroke-dashoffset: 0px;
    }
  }
`},6888,[6280]);
__d(function(g,r,i,a,m,e,d){"use strict";Object.defineProperty(e,'__esModule',{value:!0});var t=r(d[0]);Object.keys(t).forEach(function(n){'default'===n||Object.prototype.hasOwnProperty.call(e,n)||Object.defineProperty(e,n,{enumerable:!0,get:function(){return t[n]}})})},6889,[6318]);
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
      `:(this.style.display='none',null)}onAppStore(){this.wallet?.app_store&&l.CoreHelperUtil.openHref(this.wallet.app_store,'_blank')}onPlayStore(){this.wallet?.play_store&&l.CoreHelperUtil.openHref(this.wallet.play_store,'_blank')}onHomePage(){this.wallet?.homepage&&l.CoreHelperUtil.openHref(this.wallet.homepage,'_blank')}};u.styles=[i.default],s([(0,t.property)({type:Object})],u.prototype,"wallet",void 0),u=s([(0,o.customElement)('w3m-mobile-download-links')],u)},6890,[5531,5557,6247,6277,6891,6894]);
__d(function(g,r,i,a,m,e,d){"use strict";Object.defineProperty(e,'__esModule',{value:!0});var t=r(d[0]);Object.keys(t).forEach(function(n){'default'===n||Object.prototype.hasOwnProperty.call(e,n)||Object.defineProperty(e,n,{enumerable:!0,get:function(){return t[n]}})})},6891,[6892]);
__d(function(g,_r,_i,a,m,_e,_d){"use strict";Object.defineProperty(_e,'__esModule',{value:!0}),Object.defineProperty(_e,"WuiCtaButton",{enumerable:!0,get:function(){return s}});var e=_r(_d[0]),t=_r(_d[1]);_r(_d[2]),_r(_d[3]),_r(_d[4]);var r=_r(_d[5]),o=_r(_d[6]);_r(_d[7]);var i,n=_r(_d[8]),l=(i=n)&&i.__esModule?i:{default:i},u=this&&this.__decorate||function(e,t,r,o){var i,n=arguments.length,l=n<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,r):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)l=Reflect.decorate(e,t,r,o);else for(var u=e.length-1;u>=0;u--)(i=e[u])&&(l=(n<3?i(l):n>3?i(t,r,l):i(t,r))||l);return n>3&&l&&Object.defineProperty(t,r,l),l};let s=class extends e.LitElement{constructor(){super(...arguments),this.disabled=!1,this.label='',this.buttonLabel=''}render(){return e.html`
      <wui-flex justifyContent="space-between" alignItems="center">
        <wui-text variant="lg-regular" color="inherit">${this.label}</wui-text>
        <wui-button variant="accent-secondary" size="sm">
          ${this.buttonLabel}
          <wui-icon name="chevronRight" color="inherit" size="inherit" slot="iconRight"></wui-icon>
        </wui-button>
      </wui-flex>
    `}};s.styles=[r.resetStyles,r.elementStyles,l.default],u([(0,t.property)({type:Boolean})],s.prototype,"disabled",void 0),u([(0,t.property)()],s.prototype,"label",void 0),u([(0,t.property)()],s.prototype,"buttonLabel",void 0),s=u([(0,o.customElement)('wui-cta-button')],s)},6892,[5531,5557,6290,6313,6286,6279,6284,6883,6893]);
__d(function(g,r,i,a,m,e,d){"use strict";Object.defineProperty(e,'__esModule',{value:!0}),Object.defineProperty(e,"default",{enumerable:!0,get:function(){return t}});var t=r(d[0]).css`
  wui-flex {
    width: 100%;
    height: 52px;
    box-sizing: border-box;
    background-color: ${({tokens:t})=>t.theme.foregroundPrimary};
    border-radius: ${({borderRadius:t})=>t[5]};
    padding-left: ${({spacing:t})=>t[3]};
    padding-right: ${({spacing:t})=>t[3]};
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: ${({spacing:t})=>t[6]};
  }

  wui-text {
    color: ${({tokens:t})=>t.theme.textSecondary};
  }

  wui-icon {
    width: 12px;
    height: 12px;
  }
`},6893,[6280]);
__d(function(g,r,i,a,m,e,d){"use strict";Object.defineProperty(e,'__esModule',{value:!0}),Object.defineProperty(e,"default",{enumerable:!0,get:function(){return t}});var t=r(d[0]).css`
  :host {
    display: block;
    padding: 0 ${({spacing:t})=>t[5]} ${({spacing:t})=>t[5]};
  }
`},6894,[6277]);
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

  wui-wallet-image {
    width: 56px;
    height: 56px;
  }

  wui-loading-thumbnail {
    position: absolute;
  }

  wui-icon-box {
    position: absolute;
    right: calc(${({spacing:t})=>t[1]} * -1);
    bottom: calc(${({spacing:t})=>t[1]} * -1);
    opacity: 0;
    transform: scale(0.5);
    transition-property: opacity, transform;
    transition-duration: ${({durations:t})=>t.lg};
    transition-timing-function: ${({easings:t})=>t['ease-out-power-2']};
    will-change: opacity, transform;
  }

  wui-text[align='center'] {
    width: 100%;
    padding: 0px ${({spacing:t})=>t[4]};
  }

  [data-error='true'] wui-icon-box {
    opacity: 1;
    transform: scale(1);
  }

  [data-error='true'] > wui-flex:first-child {
    animation: shake 250ms ${({easings:t})=>t['ease-out-power-2']} both;
  }

  [data-retry='false'] wui-link {
    display: none;
  }

  [data-retry='true'] wui-link {
    display: block;
    opacity: 1;
  }

  w3m-mobile-download-links {
    padding: 0px;
    width: 100%;
  }
`},6895,[6277]);
__d(function(g,_r,_i,a,m,e,_d){"use strict";Object.defineProperty(e,'__esModule',{value:!0}),Object.defineProperty(e,"W3mConnectingWcDesktop",{enumerable:!0,get:function(){return i}});var t=_r(_d[0]),n=_r(_d[1]),r=_r(_d[2]),o=this&&this.__decorate||function(t,n,r,o){var i,l=arguments.length,s=l<3?n:null===o?o=Object.getOwnPropertyDescriptor(n,r):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)s=Reflect.decorate(t,n,r,o);else for(var c=t.length-1;c>=0;c--)(i=t[c])&&(s=(l<3?i(s):l>3?i(n,r,s):i(n,r))||s);return l>3&&s&&Object.defineProperty(n,r,s),s};let i=class extends r.W3mConnectingWidget{constructor(){if(super(),!this.wallet)throw new Error('w3m-connecting-wc-desktop: No wallet provided');this.onConnect=this.onConnectProxy.bind(this),this.onRender=this.onRenderProxy.bind(this),t.EventsController.sendEvent({type:'track',event:'SELECT_WALLET',properties:{name:this.wallet.name,platform:'desktop',displayIndex:this.wallet?.display_index,walletRank:this.wallet.order,view:t.RouterController.state.view}})}onRenderProxy(){!this.ready&&this.uri&&(this.ready=!0,this.onConnect?.())}onConnectProxy(){if(this.wallet?.desktop_link&&this.uri)try{this.error=!1;const{desktop_link:n,name:r}=this.wallet,{redirect:o,href:i}=t.CoreHelperUtil.formatNativeUrl(n,this.uri);t.ConnectionController.setWcLinking({name:r,href:i}),t.ConnectionController.setRecentWallet(this.wallet),t.CoreHelperUtil.openHref(o,'_blank')}catch{this.error=!0}}};i=o([(0,n.customElement)('w3m-connecting-wc-desktop')],i)},6896,[6247,6277,6881]);
__d(function(g,_r,_i,a,m,_e,_d){"use strict";Object.defineProperty(_e,'__esModule',{value:!0}),Object.defineProperty(_e,"W3mConnectingWcMobile",{enumerable:!0,get:function(){return o}});var e=_r(_d[0]),t=_r(_d[1]),i=_r(_d[2]),r=_r(_d[3]),n=this&&this.__decorate||function(e,t,i,r){var n,o=arguments.length,s=o<3?t:null===r?r=Object.getOwnPropertyDescriptor(t,i):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)s=Reflect.decorate(e,t,i,r);else for(var l=e.length-1;l>=0;l--)(n=e[l])&&(s=(o<3?n(s):o>3?n(t,i,s):n(t,i))||s);return o>3&&s&&Object.defineProperty(t,i,s),s};let o=class extends r.W3mConnectingWidget{constructor(){if(super(),this.btnLabelTimeout=void 0,this.redirectDeeplink=void 0,this.redirectUniversalLink=void 0,this.target=void 0,this.preferUniversalLinks=t.OptionsController.state.experimental_preferUniversalLinks,this.isLoading=!0,this.onConnect=()=>{if(this.wallet?.mobile_link&&this.uri)try{this.error=!1;const{mobile_link:e,link_mode:i,name:r}=this.wallet,{redirect:n,redirectUniversalLink:o,href:s}=t.CoreHelperUtil.formatNativeUrl(e,this.uri,i);this.redirectDeeplink=n,this.redirectUniversalLink=o,this.target=t.CoreHelperUtil.isIframe()?'_top':'_self',t.ConnectionController.setWcLinking({name:r,href:s}),t.ConnectionController.setRecentWallet(this.wallet),this.preferUniversalLinks&&this.redirectUniversalLink?t.CoreHelperUtil.openHref(this.redirectUniversalLink,this.target):t.CoreHelperUtil.openHref(this.redirectDeeplink,this.target)}catch(e){t.EventsController.sendEvent({type:'track',event:'CONNECT_PROXY_ERROR',properties:{message:e instanceof Error?e.message:'Error parsing the deeplink',uri:this.uri,mobile_link:this.wallet.mobile_link,name:this.wallet.name}}),this.error=!0}},!this.wallet)throw new Error('w3m-connecting-wc-mobile: No wallet provided');this.secondaryBtnLabel='Open',this.secondaryLabel=t.ConstantsUtil.CONNECT_LABELS.MOBILE,this.secondaryBtnIcon='externalLink',this.onHandleURI(),this.unsubscribe.push(t.ConnectionController.subscribeKey('wcUri',()=>{this.onHandleURI()})),t.EventsController.sendEvent({type:'track',event:'SELECT_WALLET',properties:{name:this.wallet.name,platform:'mobile',displayIndex:this.wallet?.display_index,walletRank:this.wallet.order,view:t.RouterController.state.view}})}disconnectedCallback(){super.disconnectedCallback(),clearTimeout(this.btnLabelTimeout)}onHandleURI(){this.isLoading=!this.uri,!this.ready&&this.uri&&(this.ready=!0,this.onConnect?.())}onTryAgain(){t.ConnectionController.setWcError(!1),this.onConnect?.()}};n([(0,e.state)()],o.prototype,"redirectDeeplink",void 0),n([(0,e.state)()],o.prototype,"redirectUniversalLink",void 0),n([(0,e.state)()],o.prototype,"target",void 0),n([(0,e.state)()],o.prototype,"preferUniversalLinks",void 0),n([(0,e.state)()],o.prototype,"isLoading",void 0),o=n([(0,i.customElement)('w3m-connecting-wc-mobile')],o)},6897,[5557,6247,6277,6881]);
__d(function(g,_r,_i,a,m,_e,_d){"use strict";Object.defineProperty(_e,'__esModule',{value:!0}),Object.defineProperty(_e,"W3mConnectingWcQrcode",{enumerable:!0,get:function(){return u}});var e=_r(_d[0]),t=_r(_d[1]),i=_r(_d[2]),r=_r(_d[3]),o=_r(_d[4]);_r(_d[5]),_r(_d[6]),_r(_d[7]),_r(_d[8]),_r(_d[9]),_r(_d[10]),_r(_d[11]);var n=_r(_d[12]);_r(_d[13]);var l,s=_r(_d[14]),c=(l=s)&&l.__esModule?l:{default:l},d=this&&this.__decorate||function(e,t,i,r){var o,n=arguments.length,l=n<3?t:null===r?r=Object.getOwnPropertyDescriptor(t,i):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)l=Reflect.decorate(e,t,i,r);else for(var s=e.length-1;s>=0;s--)(o=e[s])&&(l=(n<3?o(l):n>3?o(t,i,l):o(t,i))||l);return n>3&&l&&Object.defineProperty(t,i,l),l};let u=class extends n.W3mConnectingWidget{constructor(){super(),this.basic=!1,this.forceUpdate=()=>{this.requestUpdate()},window.addEventListener('resize',this.forceUpdate)}firstUpdated(){this.basic||r.EventsController.sendEvent({type:'track',event:'SELECT_WALLET',properties:{name:this.wallet?.name??'WalletConnect',platform:'qrcode',displayIndex:this.wallet?.display_index,walletRank:this.wallet?.order,view:r.RouterController.state.view}})}disconnectedCallback(){super.disconnectedCallback(),this.unsubscribe?.forEach(e=>e()),window.removeEventListener('resize',this.forceUpdate)}render(){return this.onRenderProxy(),e.html`
      <wui-flex
        flexDirection="column"
        alignItems="center"
        .padding=${['0','5','5','5']}
        gap="5"
      >
        <wui-shimmer width="100%"> ${this.qrCodeTemplate()} </wui-shimmer>
        <wui-text variant="lg-medium" color="primary"> Scan this QR Code with your phone </wui-text>
        ${this.copyTemplate()}
      </wui-flex>
      <w3m-mobile-download-links .wallet=${this.wallet}></w3m-mobile-download-links>
    `}onRenderProxy(){!this.ready&&this.uri&&(this.timeout=setTimeout(()=>{this.ready=!0},200))}qrCodeTemplate(){if(!this.uri||!this.ready)return null;const t=this.getBoundingClientRect().width-40,o=this.wallet?this.wallet.name:void 0;r.ConnectionController.setWcLinking(void 0),r.ConnectionController.setRecentWallet(this.wallet);let n=this.uri;if(this.wallet?.mobile_link){const{redirect:e}=r.CoreHelperUtil.formatNativeUrl(this.wallet?.mobile_link,this.uri,null);n=e}return e.html` <wui-qr-code
      size=${t}
      theme=${r.ThemeController.state.themeMode}
      uri=${n}
      imageSrc=${(0,i.ifDefined)(r.AssetUtil.getWalletImage(this.wallet))}
      color=${(0,i.ifDefined)(r.ThemeController.state.themeVariables['--w3m-qr-color'])}
      alt=${(0,i.ifDefined)(o)}
      data-testid="wui-qr-code"
    ></wui-qr-code>`}copyTemplate(){const t=!this.uri||!this.ready;return e.html`<wui-button
      .disabled=${t}
      @click=${this.onCopyUri}
      variant="neutral-secondary"
      size="sm"
      data-testid="copy-wc2-uri"
    >
      Copy link
      <wui-icon size="sm" color="inherit" name="copy" slot="iconRight"></wui-icon>
    </wui-button>`}};u.styles=c.default,d([(0,t.property)({type:Boolean})],u.prototype,"basic",void 0),u=d([(0,o.customElement)('w3m-connecting-wc-qrcode')],u)},6898,[5531,5557,5568,6247,6277,6285,6328,6329,6899,6903,6332,6333,6881,6890,6906]);
__d(function(g,r,i,a,m,e,d){"use strict";Object.defineProperty(e,'__esModule',{value:!0});var t=r(d[0]);Object.keys(t).forEach(function(n){'default'===n||Object.prototype.hasOwnProperty.call(e,n)||Object.defineProperty(e,n,{enumerable:!0,get:function(){return t[n]}})})},6899,[6900]);
__d(function(g,_r,_i,a,m,_e,_d){"use strict";Object.defineProperty(_e,'__esModule',{value:!0}),Object.defineProperty(_e,"WuiQrCode",{enumerable:!0,get:function(){return h}});var e=_r(_d[0]),t=_r(_d[1]);_r(_d[2]),_r(_d[3]),_r(_d[4]);var i,r=_r(_d[5]),o=_r(_d[6]),s=_r(_d[7]),l=_r(_d[8]),n=(i=l)&&i.__esModule?i:{default:i},c=this&&this.__decorate||function(e,t,i,r){var o,s=arguments.length,l=s<3?t:null===r?r=Object.getOwnPropertyDescriptor(t,i):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)l=Reflect.decorate(e,t,i,r);else for(var n=e.length-1;n>=0;n--)(o=e[n])&&(l=(s<3?o(l):s>3?o(t,i,l):o(t,i))||l);return s>3&&l&&Object.defineProperty(t,i,l),l};let h=class extends e.LitElement{constructor(){super(...arguments),this.uri='',this.size=0,this.theme='dark',this.imageSrc=void 0,this.alt=void 0,this.arenaClear=void 0,this.farcaster=void 0}render(){return this.dataset.theme=this.theme,this.dataset.clear=String(this.arenaClear),this.style.cssText=`--local-size: ${this.size}px`,e.html`<wui-flex
      alignItems="center"
      justifyContent="center"
      class="wui-qr-code"
      direction="column"
      gap="4"
      width="100%"
      style="height: 100%"
    >
      ${this.templateVisual()} ${this.templateSvg()}
    </wui-flex>`}templateSvg(){return e.svg`
      <svg height=${this.size} width=${this.size}>
        ${r.QrCodeUtil.generate({uri:this.uri,size:this.size,logoSize:this.arenaClear?0:this.size/4})}
      </svg>
    `}templateVisual(){return this.imageSrc?e.html`<wui-image src=${this.imageSrc} alt=${this.alt??'logo'}></wui-image>`:this.farcaster?e.html`<wui-icon
        class="farcaster"
        size="inherit"
        color="inherit"
        name="farcaster"
      ></wui-icon>`:e.html`<wui-icon size="inherit" color="inherit" name="walletConnect"></wui-icon>`}};h.styles=[o.resetStyles,n.default],c([(0,t.property)()],h.prototype,"uri",void 0),c([(0,t.property)({type:Number})],h.prototype,"size",void 0),c([(0,t.property)()],h.prototype,"theme",void 0),c([(0,t.property)()],h.prototype,"imageSrc",void 0),c([(0,t.property)()],h.prototype,"alt",void 0),c([(0,t.property)({type:Boolean})],h.prototype,"arenaClear",void 0),c([(0,t.property)({type:Boolean})],h.prototype,"farcaster",void 0),h=c([(0,s.customElement)('wui-qr-code')],h)},6900,[5531,5557,6290,6319,6286,6901,6279,6284,6902]);
__d(function(g,r,_i,_a,m,_e,d){"use strict";Object.defineProperty(_e,'__esModule',{value:!0}),Object.defineProperty(_e,"QrCodeUtil",{enumerable:!0,get:function(){return l}});var e,t=r(d[0]),o=(e=t)&&e.__esModule?e:{default:e},n=r(d[1]);function c(e,t,o){if(e===t)return!1;return(e-t<0?t-e:e-t)<=o+.1}function s(e,t){const n=Array.prototype.slice.call(o.default.create(e,{errorCorrectionLevel:t}).modules.data,0),c=Math.sqrt(n.length);return n.reduce((e,t,o)=>(o%c===0?e.push([t]):e[e.length-1].push(t))&&e,[])}const l={generate({uri:e,size:t,logoSize:o,padding:l=8,dotColor:h="var(--apkt-colors-black)"}){const a=[],u=s(e,'Q'),i=(t-2*l)/u.length,f=[{x:0,y:0},{x:1,y:0},{x:0,y:1}];f.forEach(({x:e,y:t})=>{const o=(u.length-7)*i*e+l,c=(u.length-7)*i*t+l,s=.45;for(let e=0;e<f.length;e+=1){const t=i*(7-2*e);a.push(n.svg`
            <rect
              fill=${2===e?'var(--apkt-colors-black)':'var(--apkt-colors-white)'}
              width=${0===e?t-10:t}
              rx= ${0===e?(t-10)*s:t*s}
              ry= ${0===e?(t-10)*s:t*s}
              stroke=${h}
              stroke-width=${0===e?10:0}
              height=${0===e?t-10:t}
              x= ${0===e?c+i*e+5:c+i*e}
              y= ${0===e?o+i*e+5:o+i*e}
            />
          `)}});const p=Math.floor((o+25)/i),$=u.length/2-p/2,y=u.length/2+p/2-1,k=[];u.forEach((e,t)=>{e.forEach((e,o)=>{if(u[t][o]&&!(t<7&&o<7||t>u.length-8&&o<7||t<7&&o>u.length-8||t>$&&t<y&&o>$&&o<y)){const e=t*i+i/2+l,n=o*i+i/2+l;k.push([e,n])}})});const v={};return k.forEach(([e,t])=>{v[e]?v[e]?.push(t):v[e]=[t]}),Object.entries(v).map(([e,t])=>{const o=t.filter(e=>t.every(t=>!c(e,t,i)));return[Number(e),o]}).forEach(([e,t])=>{t.forEach(t=>{a.push(n.svg`<circle cx=${e} cy=${t} fill=${h} r=${i/2.5} />`)})}),Object.entries(v).filter(([e,t])=>t.length>1).map(([e,t])=>{const o=t.filter(e=>t.some(t=>c(e,t,i)));return[Number(e),o]}).map(([e,t])=>{t.sort((e,t)=>e<t?-1:1);const o=[];for(const e of t){const t=o.find(t=>t.some(t=>c(e,t,i)));t?t.push(e):o.push([e])}return[e,o.map(e=>[e[0],e[e.length-1]])]}).forEach(([e,t])=>{t.forEach(([t,o])=>{a.push(n.svg`
              <line
                x1=${e}
                x2=${e}
                y1=${t}
                y2=${o}
                stroke=${h}
                stroke-width=${i/1.25}
                stroke-linecap="round"
              />
            `)})}),a}}},6901,[2465,5531]);
__d(function(g,r,i,a,m,e,d){"use strict";Object.defineProperty(e,'__esModule',{value:!0}),Object.defineProperty(e,"default",{enumerable:!0,get:function(){return t}});var t=r(d[0]).css`
  :host {
    position: relative;
    user-select: none;
    display: block;
    overflow: hidden;
    aspect-ratio: 1 / 1;
    width: 100%;
    height: 100%;
    background-color: ${({colors:t})=>t.white};
    border: 1px solid ${({tokens:t})=>t.theme.borderPrimary};
  }

  :host {
    border-radius: ${({borderRadius:t})=>t[4]};
    display: flex;
    align-items: center;
    justify-content: center;
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
    background-color: ${({tokens:t})=>t.theme.backgroundPrimary};
    box-shadow: inset 0 0 0 4px ${({tokens:t})=>t.theme.backgroundPrimary};
    border-radius: ${({borderRadius:t})=>t[6]};
  }

  wui-image {
    width: 25%;
    height: 25%;
    border-radius: ${({borderRadius:t})=>t[2]};
  }

  wui-icon {
    width: 100%;
    height: 100%;
    color: #3396ff !important;
    transform: translateY(-50%) translateX(-50%) scale(0.25);
  }

  wui-icon > svg {
    width: inherit;
    height: inherit;
  }
`},6902,[6280]);
__d(function(g,r,i,a,m,e,d){"use strict";Object.defineProperty(e,'__esModule',{value:!0});var t=r(d[0]);Object.keys(t).forEach(function(n){'default'===n||Object.prototype.hasOwnProperty.call(e,n)||Object.defineProperty(e,n,{enumerable:!0,get:function(){return t[n]}})})},6903,[6904]);
__d(function(g,_r,_i,a,m,_e,_d){"use strict";Object.defineProperty(_e,'__esModule',{value:!0}),Object.defineProperty(_e,"WuiShimmer",{enumerable:!0,get:function(){return d}});var e,t=_r(_d[0]),r=_r(_d[1]),o=_r(_d[2]),i=_r(_d[3]),n=(e=i)&&e.__esModule?e:{default:e},s=this&&this.__decorate||function(e,t,r,o){var i,n=arguments.length,s=n<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,r):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)s=Reflect.decorate(e,t,r,o);else for(var d=e.length-1;d>=0;d--)(i=e[d])&&(s=(n<3?i(s):n>3?i(t,r,s):i(t,r))||s);return n>3&&s&&Object.defineProperty(t,r,s),s};let d=class extends t.LitElement{constructor(){super(...arguments),this.width='',this.height='',this.variant='default',this.rounded=!1}render(){return this.style.cssText=`\n      width: ${this.width};\n      height: ${this.height};\n    `,this.dataset.rounded=this.rounded?'true':'false',t.html`<slot></slot>`}};d.styles=[n.default],s([(0,r.property)()],d.prototype,"width",void 0),s([(0,r.property)()],d.prototype,"height",void 0),s([(0,r.property)()],d.prototype,"variant",void 0),s([(0,r.property)({type:Boolean})],d.prototype,"rounded",void 0),d=s([(0,o.customElement)('wui-shimmer')],d)},6904,[5531,5557,6284,6905]);
__d(function(g,r,i,a,m,e,d){"use strict";Object.defineProperty(e,'__esModule',{value:!0}),Object.defineProperty(e,"default",{enumerable:!0,get:function(){return o}});var o=r(d[0]).css`
  :host {
    display: block;
    background: linear-gradient(
      90deg,
      ${({tokens:o})=>o.theme.foregroundSecondary} 0%,
      ${({tokens:o})=>o.theme.foregroundTertiary} 50%,
      ${({tokens:o})=>o.theme.foregroundSecondary} 100%
    );
    background-size: 200% 100%;
    animation: shimmer 1s ease-in-out infinite;
    border-radius: ${({borderRadius:o})=>o[2]};
  }

  :host([data-rounded='true']) {
    border-radius: ${({borderRadius:o})=>o[16]};
  }

  @keyframes shimmer {
    0% {
      background-position: 200% 0;
    }
    100% {
      background-position: -200% 0;
    }
  }
`},6905,[6280]);
__d(function(g,r,i,a,m,e,d){"use strict";Object.defineProperty(e,'__esModule',{value:!0}),Object.defineProperty(e,"default",{enumerable:!0,get:function(){return t}});var t=r(d[0]).css`
  wui-shimmer {
    width: 100%;
    aspect-ratio: 1 / 1;
    border-radius: ${({borderRadius:t})=>t[4]};
  }

  wui-qr-code {
    opacity: 0;
    animation-duration: ${({durations:t})=>t.xl};
    animation-timing-function: ${({easings:t})=>t['ease-out-power-2']};
    animation-name: fade-in;
    animation-fill-mode: forwards;
  }

  @keyframes fade-in {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`},6906,[6277]);
__d(function(g,_r,_i,a,m,e,_d){"use strict";Object.defineProperty(e,'__esModule',{value:!0}),Object.defineProperty(e,"W3mConnectingWcUnsupported",{enumerable:!0,get:function(){return o}});var t=_r(_d[0]),l=_r(_d[1]),r=_r(_d[2]),n=_r(_d[3]);_r(_d[4]),_r(_d[5]),_r(_d[6]),_r(_d[7]);var i=this&&this.__decorate||function(t,l,r,n){var i,o=arguments.length,s=o<3?l:null===n?n=Object.getOwnPropertyDescriptor(l,r):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)s=Reflect.decorate(t,l,r,n);else for(var c=t.length-1;c>=0;c--)(i=t[c])&&(s=(o<3?i(s):o>3?i(l,r,s):i(l,r))||s);return o>3&&s&&Object.defineProperty(l,r,s),s};let o=class extends t.LitElement{constructor(){if(super(),this.wallet=r.RouterController.state.data?.wallet,!this.wallet)throw new Error('w3m-connecting-wc-unsupported: No wallet provided');r.EventsController.sendEvent({type:'track',event:'SELECT_WALLET',properties:{name:this.wallet.name,platform:'browser',displayIndex:this.wallet?.display_index,walletRank:this.wallet?.order,view:r.RouterController.state.view}})}render(){return t.html`
      <wui-flex
        flexDirection="column"
        alignItems="center"
        .padding=${['10','5','5','5']}
        gap="5"
      >
        <wui-wallet-image
          size="lg"
          imageSrc=${(0,l.ifDefined)(r.AssetUtil.getWalletImage(this.wallet))}
        ></wui-wallet-image>

        <wui-text variant="md-regular" color="primary">Not Detected</wui-text>
      </wui-flex>

      <w3m-mobile-download-links .wallet=${this.wallet}></w3m-mobile-download-links>
    `}};o=i([(0,n.customElement)('w3m-connecting-wc-unsupported')],o)},6907,[5531,5568,6247,6277,6285,6332,6889,6890]);
__d(function(g,_r,_i,a,m,e,_d){"use strict";Object.defineProperty(e,'__esModule',{value:!0}),Object.defineProperty(e,"W3mConnectingWcWeb",{enumerable:!0,get:function(){return l}});var t=_r(_d[0]),n=_r(_d[1]),r=_r(_d[2]),i=_r(_d[3]),o=this&&this.__decorate||function(t,n,r,i){var o,l=arguments.length,s=l<3?n:null===i?i=Object.getOwnPropertyDescriptor(n,r):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)s=Reflect.decorate(t,n,r,i);else for(var c=t.length-1;c>=0;c--)(o=t[c])&&(s=(l<3?o(s):l>3?o(n,r,s):o(n,r))||s);return l>3&&s&&Object.defineProperty(n,r,s),s};let l=class extends i.W3mConnectingWidget{constructor(){if(super(),this.isLoading=!0,!this.wallet)throw new Error('w3m-connecting-wc-web: No wallet provided');this.onConnect=this.onConnectProxy.bind(this),this.secondaryBtnLabel='Open',this.secondaryLabel=n.ConstantsUtil.CONNECT_LABELS.MOBILE,this.secondaryBtnIcon='externalLink',this.updateLoadingState(),this.unsubscribe.push(n.ConnectionController.subscribeKey('wcUri',()=>{this.updateLoadingState()})),n.EventsController.sendEvent({type:'track',event:'SELECT_WALLET',properties:{name:this.wallet.name,platform:'web',displayIndex:this.wallet?.display_index,walletRank:this.wallet?.order,view:n.RouterController.state.view}})}updateLoadingState(){this.isLoading=!this.uri}onConnectProxy(){if(this.wallet?.webapp_link&&this.uri)try{this.error=!1;const{webapp_link:t,name:r}=this.wallet,{redirect:i,href:o}=n.CoreHelperUtil.formatUniversalUrl(t,this.uri);n.ConnectionController.setWcLinking({name:r,href:o}),n.ConnectionController.setRecentWallet(this.wallet),n.CoreHelperUtil.openHref(i,'_blank')}catch{this.error=!0}}};o([(0,t.state)()],l.prototype,"isLoading",void 0),l=o([(0,r.customElement)('w3m-connecting-wc-web')],l)},6908,[5557,6247,6277,6881]);
__d(function(g,r,i,a,m,e,d){"use strict";Object.defineProperty(e,'__esModule',{value:!0}),Object.defineProperty(e,"default",{enumerable:!0,get:function(){return t}});var t=r(d[0]).css`
  :host([data-mobile-fullscreen='true']) {
    height: 100%;
    display: flex;
    flex-direction: column;
  }

  :host([data-mobile-fullscreen='true']) wui-ux-by-reown {
    margin-top: auto;
  }
`},6909,[6277]);
__d(function(g,_r,_i,a,m,e,_d){"use strict";Object.defineProperty(e,'__esModule',{value:!0}),Object.defineProperty(e,"W3mAllWalletsView",{enumerable:!0,get:function(){return o}});var t=_r(_d[0]),i=_r(_d[1]),n=_r(_d[2]),r=_r(_d[3]);_r(_d[4]),_r(_d[5]),_r(_d[6]),_r(_d[7]),_r(_d[8]),_r(_d[9]);var l=this&&this.__decorate||function(t,i,n,r){var l,o=arguments.length,c=o<3?i:null===r?r=Object.getOwnPropertyDescriptor(i,n):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)c=Reflect.decorate(t,i,n,r);else for(var s=t.length-1;s>=0;s--)(l=t[s])&&(c=(o<3?l(c):o>3?l(i,n,c):l(i,n))||c);return o>3&&c&&Object.defineProperty(i,n,c),c};let o=class extends t.LitElement{constructor(){super(...arguments),this.search='',this.badge=void 0,this.onDebouncedSearch=n.CoreHelperUtil.debounce(t=>{this.search=t})}render(){const i=this.search.length>=2;return t.html`
      <wui-flex .padding=${['1','3','3','3']} gap="2" alignItems="center">
        <wui-search-bar @inputChange=${this.onInputChange.bind(this)}></wui-search-bar>
        <wui-certified-switch
          ?checked=${'certified'===this.badge}
          @certifiedSwitchChange=${this.onCertifiedSwitchChange.bind(this)}
          data-testid="wui-certified-switch"
        ></wui-certified-switch>
        ${this.qrButtonTemplate()}
      </wui-flex>
      ${i||this.badge?t.html`<w3m-all-wallets-search
            query=${this.search}
            .badge=${this.badge}
          ></w3m-all-wallets-search>`:t.html`<w3m-all-wallets-list .badge=${this.badge}></w3m-all-wallets-list>`}
    `}onInputChange(t){this.onDebouncedSearch(t.detail)}onCertifiedSwitchChange(t){t.detail?(this.badge='certified',n.SnackController.showSvg('Only WalletConnect certified',{icon:'walletConnectBrown',iconColor:'accent-100'})):this.badge=void 0}qrButtonTemplate(){return n.CoreHelperUtil.isMobile()?t.html`
        <wui-icon-box
          size="xl"
          iconSize="xl"
          color="accent-primary"
          icon="qrCode"
          border
          borderColor="wui-accent-glass-010"
          @click=${this.onWalletConnectQr.bind(this)}
        ></wui-icon-box>
      `:null}onWalletConnectQr(){n.RouterController.push('ConnectingWalletConnect')}};l([(0,i.state)()],o.prototype,"search",void 0),l([(0,i.state)()],o.prototype,"badge",void 0),o=l([(0,r.customElement)('w3m-all-wallets-view')],o)},6910,[5531,5557,6247,6277,6911,6285,6885,6916,6921,6932]);
__d(function(g,r,i,a,m,e,d){"use strict";Object.defineProperty(e,'__esModule',{value:!0});var t=r(d[0]);Object.keys(t).forEach(function(n){'default'===n||Object.prototype.hasOwnProperty.call(e,n)||Object.defineProperty(e,n,{enumerable:!0,get:function(){return t[n]}})})},6911,[6912]);
__d(function(g,_r,_i,a,m,_e,_d){"use strict";Object.defineProperty(_e,'__esModule',{value:!0}),Object.defineProperty(_e,"WuiCertifiedSwitch",{enumerable:!0,get:function(){return l}});var e=_r(_d[0]),t=_r(_d[1]),i=_r(_d[2]),c=_r(_d[3]);_r(_d[4]);var n,o=_r(_d[5]),r=(n=o)&&n.__esModule?n:{default:n},s=this&&this.__decorate||function(e,t,i,c){var n,o=arguments.length,r=o<3?t:null===c?c=Object.getOwnPropertyDescriptor(t,i):c;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(e,t,i,c);else for(var s=e.length-1;s>=0;s--)(n=e[s])&&(r=(o<3?n(r):o>3?n(t,i,r):n(t,i))||r);return o>3&&r&&Object.defineProperty(t,i,r),r};let l=class extends e.LitElement{constructor(){super(...arguments),this.checked=!1}render(){return e.html`
      <wui-flex>
        <wui-icon size="xl" name="walletConnectBrown"></wui-icon>
        <wui-toggle
          ?checked=${this.checked}
          size="sm"
          @switchChange=${this.handleToggleChange.bind(this)}
        ></wui-toggle>
      </wui-flex>
    `}handleToggleChange(e){e.stopPropagation(),this.checked=e.detail,this.dispatchSwitchEvent()}dispatchSwitchEvent(){this.dispatchEvent(new CustomEvent('certifiedSwitchChange',{detail:this.checked,bubbles:!0,composed:!0}))}};l.styles=[i.resetStyles,i.elementStyles,r.default],s([(0,t.property)({type:Boolean})],l.prototype,"checked",void 0),l=s([(0,c.customElement)('wui-certified-switch')],l)},6912,[5531,5557,6279,6284,6913,6915]);
__d(function(g,_r,_i,a,m,_e,_d){"use strict";Object.defineProperty(_e,'__esModule',{value:!0}),Object.defineProperty(_e,"WuiToggle",{enumerable:!0,get:function(){return d}});var e,t=_r(_d[0]),i=_r(_d[1]),s=_r(_d[2]),n=_r(_d[3]),o=_r(_d[4]),r=_r(_d[5]),l=(e=r)&&e.__esModule?e:{default:e},c=this&&this.__decorate||function(e,t,i,s){var n,o=arguments.length,r=o<3?t:null===s?s=Object.getOwnPropertyDescriptor(t,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(e,t,i,s);else for(var l=e.length-1;l>=0;l--)(n=e[l])&&(r=(o<3?n(r):o>3?n(t,i,r):n(t,i))||r);return o>3&&r&&Object.defineProperty(t,i,r),r};let d=class extends t.LitElement{constructor(){super(...arguments),this.inputElementRef=(0,s.createRef)(),this.checked=!1,this.disabled=!1,this.size='md'}render(){return t.html`
      <label data-size=${this.size}>
        <input
          ${(0,s.ref)(this.inputElementRef)}
          type="checkbox"
          ?checked=${this.checked}
          ?disabled=${this.disabled}
          @change=${this.dispatchChangeEvent.bind(this)}
        />
        <span></span>
      </label>
    `}dispatchChangeEvent(){this.dispatchEvent(new CustomEvent('switchChange',{detail:this.inputElementRef.value?.checked,bubbles:!0,composed:!0}))}};d.styles=[n.resetStyles,n.elementStyles,l.default],c([(0,i.property)({type:Boolean})],d.prototype,"checked",void 0),c([(0,i.property)({type:Boolean})],d.prototype,"disabled",void 0),c([(0,i.property)()],d.prototype,"size",void 0),d=c([(0,o.customElement)('wui-toggle')],d)},6913,[5531,5557,5734,6279,6284,6914]);
__d(function(g,r,i,a,m,e,d){"use strict";Object.defineProperty(e,'__esModule',{value:!0}),Object.defineProperty(e,"default",{enumerable:!0,get:function(){return o}});var o=r(d[0]).css`
  :host {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  label {
    position: relative;
    display: inline-block;
    user-select: none;
    transition:
      background-color ${({durations:o})=>o.lg}
        ${({easings:o})=>o['ease-out-power-2']},
      color ${({durations:o})=>o.lg} ${({easings:o})=>o['ease-out-power-2']},
      border ${({durations:o})=>o.lg} ${({easings:o})=>o['ease-out-power-2']},
      box-shadow ${({durations:o})=>o.lg}
        ${({easings:o})=>o['ease-out-power-2']},
      width ${({durations:o})=>o.lg} ${({easings:o})=>o['ease-out-power-2']},
      height ${({durations:o})=>o.lg} ${({easings:o})=>o['ease-out-power-2']},
      transform ${({durations:o})=>o.lg}
        ${({easings:o})=>o['ease-out-power-2']},
      opacity ${({durations:o})=>o.lg} ${({easings:o})=>o['ease-out-power-2']};
    will-change: background-color, color, border, box-shadow, width, height, transform, opacity;
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
    background-color: ${({colors:o})=>o.neutrals300};
    border-radius: ${({borderRadius:o})=>o.round};
    border: 1px solid transparent;
    will-change: border;
    transition:
      background-color ${({durations:o})=>o.lg}
        ${({easings:o})=>o['ease-out-power-2']},
      color ${({durations:o})=>o.lg} ${({easings:o})=>o['ease-out-power-2']},
      border ${({durations:o})=>o.lg} ${({easings:o})=>o['ease-out-power-2']},
      box-shadow ${({durations:o})=>o.lg}
        ${({easings:o})=>o['ease-out-power-2']},
      width ${({durations:o})=>o.lg} ${({easings:o})=>o['ease-out-power-2']},
      height ${({durations:o})=>o.lg} ${({easings:o})=>o['ease-out-power-2']},
      transform ${({durations:o})=>o.lg}
        ${({easings:o})=>o['ease-out-power-2']},
      opacity ${({durations:o})=>o.lg} ${({easings:o})=>o['ease-out-power-2']};
    will-change: background-color, color, border, box-shadow, width, height, transform, opacity;
  }

  span:before {
    content: '';
    position: absolute;
    background-color: ${({colors:o})=>o.white};
    border-radius: 50%;
  }

  /* -- Sizes --------------------------------------------------------- */
  label[data-size='lg'] {
    width: 48px;
    height: 32px;
  }

  label[data-size='md'] {
    width: 40px;
    height: 28px;
  }

  label[data-size='sm'] {
    width: 32px;
    height: 22px;
  }

  label[data-size='lg'] > span:before {
    height: 24px;
    width: 24px;
    left: 4px;
    top: 3px;
  }

  label[data-size='md'] > span:before {
    height: 20px;
    width: 20px;
    left: 4px;
    top: 3px;
  }

  label[data-size='sm'] > span:before {
    height: 16px;
    width: 16px;
    left: 3px;
    top: 2px;
  }

  /* -- Focus states --------------------------------------------------- */
  input:focus-visible:not(:checked) + span,
  input:focus:not(:checked) + span {
    border: 1px solid ${({tokens:o})=>o.core.iconAccentPrimary};
    background-color: ${({tokens:o})=>o.theme.textTertiary};
    box-shadow: 0px 0px 0px 4px rgba(9, 136, 240, 0.2);
  }

  input:focus-visible:checked + span,
  input:focus:checked + span {
    border: 1px solid ${({tokens:o})=>o.core.iconAccentPrimary};
    box-shadow: 0px 0px 0px 4px rgba(9, 136, 240, 0.2);
  }

  /* -- Checked states --------------------------------------------------- */
  input:checked + span {
    background-color: ${({tokens:o})=>o.core.iconAccentPrimary};
  }

  label[data-size='lg'] > input:checked + span:before {
    transform: translateX(calc(100% - 9px));
  }

  label[data-size='md'] > input:checked + span:before {
    transform: translateX(calc(100% - 9px));
  }

  label[data-size='sm'] > input:checked + span:before {
    transform: translateX(calc(100% - 7px));
  }

  /* -- Hover states ------------------------------------------------------- */
  label:hover > input:not(:checked):not(:disabled) + span {
    background-color: ${({colors:o})=>o.neutrals400};
  }

  label:hover > input:checked:not(:disabled) + span {
    background-color: ${({colors:o})=>o.accent080};
  }

  /* -- Disabled state --------------------------------------------------- */
  label:has(input:disabled) {
    pointer-events: none;
    user-select: none;
  }

  input:not(:checked):disabled + span {
    background-color: ${({colors:o})=>o.neutrals700};
  }

  input:checked:disabled + span {
    background-color: ${({colors:o})=>o.neutrals700};
  }

  input:not(:checked):disabled + span::before {
    background-color: ${({colors:o})=>o.neutrals400};
  }

  input:checked:disabled + span::before {
    background-color: ${({tokens:o})=>o.theme.textTertiary};
  }
`},6914,[6280]);
__d(function(g,r,i,a,m,e,d){"use strict";Object.defineProperty(e,'__esModule',{value:!0}),Object.defineProperty(e,"default",{enumerable:!0,get:function(){return o}});var o=r(d[0]).css`
  :host {
    height: auto;
  }

  :host > wui-flex {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    column-gap: ${({spacing:o})=>o[2]};
    padding: ${({spacing:o})=>o[2]} ${({spacing:o})=>o[3]};
    background-color: ${({tokens:o})=>o.theme.foregroundPrimary};
    border-radius: ${({borderRadius:o})=>o[4]};
    box-shadow: inset 0 0 0 1px ${({tokens:o})=>o.theme.foregroundPrimary};
    transition: background-color ${({durations:o})=>o.lg}
      ${({easings:o})=>o['ease-out-power-2']};
    will-change: background-color;
    cursor: pointer;
  }

  wui-switch {
    pointer-events: none;
  }
`},6915,[6280]);
__d(function(g,r,i,a,m,e,d){"use strict";Object.defineProperty(e,'__esModule',{value:!0});var t=r(d[0]);Object.keys(t).forEach(function(n){'default'===n||Object.prototype.hasOwnProperty.call(e,n)||Object.defineProperty(e,n,{enumerable:!0,get:function(){return t[n]}})})},6916,[6917]);
__d(function(g,_r,_i,a,m,_e,_d){"use strict";Object.defineProperty(_e,'__esModule',{value:!0}),Object.defineProperty(_e,"WuiSearchBar",{enumerable:!0,get:function(){return s}});var e=_r(_d[0]),t=_r(_d[1]),n=_r(_d[2]),i=_r(_d[3]),r=_r(_d[4]);_r(_d[5]);var u,l=_r(_d[6]),o=(u=l)&&u.__esModule?u:{default:u},c=this&&this.__decorate||function(e,t,n,i){var r,u=arguments.length,l=u<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,n):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)l=Reflect.decorate(e,t,n,i);else for(var o=e.length-1;o>=0;o--)(r=e[o])&&(l=(u<3?r(l):u>3?r(t,n,l):r(t,n))||l);return u>3&&l&&Object.defineProperty(t,n,l),l};let s=class extends e.LitElement{constructor(){super(...arguments),this.inputComponentRef=(0,n.createRef)(),this.inputValue=''}render(){return e.html`
      <wui-input-text
        ${(0,n.ref)(this.inputComponentRef)}
        placeholder="Search wallet"
        icon="search"
        type="search"
        enterKeyHint="search"
        size="sm"
        @inputChange=${this.onInputChange}
      >
        ${this.inputValue?e.html`<wui-icon
              @click=${this.clearValue}
              color="inherit"
              size="sm"
              name="close"
            ></wui-icon>`:null}
      </wui-input-text>
    `}onInputChange(e){this.inputValue=e.detail||''}clearValue(){const e=this.inputComponentRef.value,t=e?.inputElementRef.value;t&&(t.value='',this.inputValue='',t.focus(),t.dispatchEvent(new Event('input')))}};s.styles=[i.resetStyles,o.default],c([(0,t.property)()],s.prototype,"inputValue",void 0),s=c([(0,r.customElement)('wui-search-bar')],s)},6917,[5531,5557,5734,6279,6284,6918,6920]);
__d(function(g,_r,_i,a,m,_e,_d){"use strict";Object.defineProperty(_e,'__esModule',{value:!0}),Object.defineProperty(_e,"WuiInputText",{enumerable:!0,get:function(){return d}});var t=_r(_d[0]),e=_r(_d[1]),i=_r(_d[2]),o=_r(_d[3]);_r(_d[4]),_r(_d[5]);var n,r=_r(_d[6]),s=_r(_d[7]),l=_r(_d[8]),p=(n=l)&&n.__esModule?n:{default:n},u=this&&this.__decorate||function(t,e,i,o){var n,r=arguments.length,s=r<3?e:null===o?o=Object.getOwnPropertyDescriptor(e,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)s=Reflect.decorate(t,e,i,o);else for(var l=t.length-1;l>=0;l--)(n=t[l])&&(s=(r<3?n(s):r>3?n(e,i,s):n(e,i))||s);return r>3&&s&&Object.defineProperty(e,i,s),s};let d=class extends t.LitElement{constructor(){super(...arguments),this.inputElementRef=(0,o.createRef)(),this.disabled=!1,this.loading=!1,this.placeholder='',this.type='text',this.value='',this.size='md'}render(){return t.html` <div class="wui-input-text-container">
        ${this.templateLeftIcon()}
        <input
          data-size=${this.size}
          ${(0,o.ref)(this.inputElementRef)}
          data-testid="wui-input-text"
          type=${this.type}
          enterkeyhint=${(0,i.ifDefined)(this.enterKeyHint)}
          ?disabled=${this.disabled}
          placeholder=${this.placeholder}
          @input=${this.dispatchInputChangeEvent.bind(this)}
          @keydown=${this.onKeyDown}
          .value=${this.value||''}
        />
        ${this.templateSubmitButton()}
        <slot class="wui-input-text-slot"></slot>
      </div>
      ${this.templateError()} ${this.templateWarning()}`}templateLeftIcon(){return this.icon?t.html`<wui-icon
        class="wui-input-text-left-icon"
        size="md"
        data-size=${this.size}
        color="inherit"
        name=${this.icon}
      ></wui-icon>`:null}templateSubmitButton(){return this.onSubmit?t.html`<button
        class="wui-input-text-submit-button ${this.loading?'loading':''}"
        @click=${this.onSubmit?.bind(this)}
        ?disabled=${this.disabled||this.loading}
      >
        ${this.loading?t.html`<wui-icon name="spinner" size="md"></wui-icon>`:t.html`<wui-icon name="chevronRight" size="md"></wui-icon>`}
      </button>`:null}templateError(){return this.errorText?t.html`<wui-text variant="sm-regular" color="error">${this.errorText}</wui-text>`:null}templateWarning(){return this.warningText?t.html`<wui-text variant="sm-regular" color="warning">${this.warningText}</wui-text>`:null}dispatchInputChangeEvent(){this.dispatchEvent(new CustomEvent('inputChange',{detail:this.inputElementRef.value?.value,bubbles:!0,composed:!0}))}};d.styles=[r.resetStyles,r.elementStyles,p.default],u([(0,e.property)()],d.prototype,"icon",void 0),u([(0,e.property)({type:Boolean})],d.prototype,"disabled",void 0),u([(0,e.property)({type:Boolean})],d.prototype,"loading",void 0),u([(0,e.property)()],d.prototype,"placeholder",void 0),u([(0,e.property)()],d.prototype,"type",void 0),u([(0,e.property)()],d.prototype,"value",void 0),u([(0,e.property)()],d.prototype,"errorText",void 0),u([(0,e.property)()],d.prototype,"warningText",void 0),u([(0,e.property)()],d.prototype,"onSubmit",void 0),u([(0,e.property)()],d.prototype,"size",void 0),u([(0,e.property)({attribute:!1})],d.prototype,"onKeyDown",void 0),d=u([(0,s.customElement)('wui-input-text')],d)},6918,[5531,5557,5568,5734,6290,6313,6279,6284,6919]);
__d(function(g,r,i,a,m,e,d){"use strict";Object.defineProperty(e,'__esModule',{value:!0}),Object.defineProperty(e,"default",{enumerable:!0,get:function(){return t}});var t=r(d[0]).css`
  :host {
    position: relative;
    width: 100%;
    display: inline-flex;
    flex-direction: column;
    gap: ${({spacing:t})=>t[3]};
    color: ${({tokens:t})=>t.theme.textPrimary};
    caret-color: ${({tokens:t})=>t.core.textAccentPrimary};
  }

  .wui-input-text-container {
    position: relative;
    display: flex;
  }

  input {
    width: 100%;
    border-radius: ${({borderRadius:t})=>t[4]};
    color: inherit;
    background: transparent;
    border: 1px solid ${({tokens:t})=>t.theme.borderPrimary};
    caret-color: ${({tokens:t})=>t.core.textAccentPrimary};
    padding: ${({spacing:t})=>t[3]} ${({spacing:t})=>t[3]}
      ${({spacing:t})=>t[3]} ${({spacing:t})=>t[10]};
    font-size: ${({textSize:t})=>t.large};
    line-height: ${({typography:t})=>t['lg-regular'].lineHeight};
    letter-spacing: ${({typography:t})=>t['lg-regular'].letterSpacing};
    font-weight: ${({fontWeight:t})=>t.regular};
    font-family: ${({fontFamily:t})=>t.regular};
  }

  input[data-size='lg'] {
    padding: ${({spacing:t})=>t[4]} ${({spacing:t})=>t[3]}
      ${({spacing:t})=>t[4]} ${({spacing:t})=>t[10]};
  }

  @media (hover: hover) and (pointer: fine) {
    input:hover:enabled {
      border: 1px solid ${({tokens:t})=>t.theme.borderSecondary};
    }
  }

  input:disabled {
    cursor: unset;
    border: 1px solid ${({tokens:t})=>t.theme.borderPrimary};
  }

  input::placeholder {
    color: ${({tokens:t})=>t.theme.textSecondary};
  }

  input:focus:enabled {
    border: 1px solid ${({tokens:t})=>t.theme.borderSecondary};
    background-color: ${({tokens:t})=>t.theme.foregroundPrimary};
    -webkit-box-shadow: 0px 0px 0px 4px ${({tokens:t})=>t.core.foregroundAccent040};
    -moz-box-shadow: 0px 0px 0px 4px ${({tokens:t})=>t.core.foregroundAccent040};
    box-shadow: 0px 0px 0px 4px ${({tokens:t})=>t.core.foregroundAccent040};
  }

  div.wui-input-text-container:has(input:disabled) {
    opacity: 0.5;
  }

  wui-icon.wui-input-text-left-icon {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    pointer-events: none;
    left: ${({spacing:t})=>t[4]};
    color: ${({tokens:t})=>t.theme.iconDefault};
  }

  button.wui-input-text-submit-button {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: ${({spacing:t})=>t[3]};
    width: 24px;
    height: 24px;
    border: none;
    background: transparent;
    border-radius: ${({borderRadius:t})=>t[2]};
    color: ${({tokens:t})=>t.core.textAccentPrimary};
  }

  button.wui-input-text-submit-button:disabled {
    opacity: 1;
  }

  button.wui-input-text-submit-button.loading wui-icon {
    animation: spin 1s linear infinite;
  }

  button.wui-input-text-submit-button:hover {
    background: ${({tokens:t})=>t.core.foregroundAccent010};
  }

  input:has(+ .wui-input-text-submit-button) {
    padding-right: ${({spacing:t})=>t[12]};
  }

  input[type='number'] {
    -moz-appearance: textfield;
  }

  input[type='search']::-webkit-search-decoration,
  input[type='search']::-webkit-search-cancel-button,
  input[type='search']::-webkit-search-results-button,
  input[type='search']::-webkit-search-results-decoration {
    -webkit-appearance: none;
  }

  /* -- Keyframes --------------------------------------------------- */
  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`},6919,[6280]);
__d(function(g,r,i,a,m,e,d){"use strict";Object.defineProperty(e,'__esModule',{value:!0}),Object.defineProperty(e,"default",{enumerable:!0,get:function(){return o}});var o=r(d[0]).css`
  :host {
    position: relative;
    display: inline-block;
    width: 100%;
  }

  wui-icon {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: ${({spacing:o})=>o[3]};
    color: ${({tokens:o})=>o.theme.iconDefault};
    cursor: pointer;
    padding: ${({spacing:o})=>o[2]};
    background-color: transparent;
    border-radius: ${({borderRadius:o})=>o[4]};
    transition: background-color ${({durations:o})=>o.lg}
      ${({easings:o})=>o['ease-out-power-2']};
  }

  @media (hover: hover) {
    wui-icon:hover {
      background-color: ${({tokens:o})=>o.theme.foregroundSecondary};
    }
  }
`},6920,[6280]);
__d(function(g,_r,_i,a,m,_e,_d){"use strict";Object.defineProperty(_e,'__esModule',{value:!0}),Object.defineProperty(_e,"W3mAllWalletsList",{enumerable:!0,get:function(){return p}});var e=_r(_d[0]),t=_r(_d[1]),l=_r(_d[2]),i=_r(_d[3]),r=_r(_d[4]);_r(_d[5]),_r(_d[6]);var s=_r(_d[7]);_r(_d[8]);var o,n=_r(_d[9]),d=(o=n)&&o.__esModule?o:{default:o},c=this&&this.__decorate||function(e,t,l,i){var r,s=arguments.length,o=s<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,l):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,l,i);else for(var n=e.length-1;n>=0;n--)(r=e[n])&&(o=(s<3?r(o):s>3?r(t,l,o):r(t,l))||o);return s>3&&o&&Object.defineProperty(t,l,o),o};const h='local-paginator';let p=class extends e.LitElement{constructor(){super(),this.unsubscribe=[],this.paginationObserver=void 0,this.loading=!i.ApiController.state.wallets.length,this.wallets=i.ApiController.state.wallets,this.recommended=i.ApiController.state.recommended,this.featured=i.ApiController.state.featured,this.filteredWallets=i.ApiController.state.filteredWallets,this.mobileFullScreen=i.OptionsController.state.enableMobileFullScreen,this.unsubscribe.push(i.ApiController.subscribeKey('wallets',e=>this.wallets=e),i.ApiController.subscribeKey('recommended',e=>this.recommended=e),i.ApiController.subscribeKey('featured',e=>this.featured=e),i.ApiController.subscribeKey('filteredWallets',e=>this.filteredWallets=e))}firstUpdated(){this.initialFetch(),this.createPaginationObserver()}disconnectedCallback(){this.unsubscribe.forEach(e=>e()),this.paginationObserver?.disconnect()}render(){return this.mobileFullScreen&&this.setAttribute('data-mobile-fullscreen','true'),e.html`
      <wui-grid
        data-scroll=${!this.loading}
        .padding=${['0','3','3','3']}
        gap="2"
        justifyContent="space-between"
      >
        ${this.loading?this.shimmerTemplate(16):this.walletsTemplate()}
        ${this.paginationLoaderTemplate()}
      </wui-grid>
    `}async initialFetch(){this.loading=!0;const e=this.shadowRoot?.querySelector('wui-grid');e&&(await i.ApiController.fetchWalletsByPage({page:1}),await e.animate([{opacity:1},{opacity:0}],{duration:200,fill:'forwards',easing:'ease'}).finished,this.loading=!1,e.animate([{opacity:0},{opacity:1}],{duration:200,fill:'forwards',easing:'ease'}))}shimmerTemplate(t,i){return[...Array(t)].map(()=>e.html`
        <wui-card-select-loader type="wallet" id=${(0,l.ifDefined)(i)}></wui-card-select-loader>
      `)}getWallets(){const e=[...this.featured,...this.recommended];this.filteredWallets?.length>0?e.push(...this.filteredWallets):e.push(...this.wallets);const t=i.CoreHelperUtil.uniqueBy(e,'id'),l=s.WalletUtil.markWalletsAsInstalled(t);return s.WalletUtil.markWalletsWithDisplayIndex(l)}walletsTemplate(){return this.getWallets().map((t,l)=>e.html`
        <w3m-all-wallets-list-item
          data-testid="wallet-search-item-${t.id}"
          @click=${()=>this.onConnectWallet(t)}
          .wallet=${t}
          explorerId=${t.id}
          certified=${'certified'===this.badge}
          displayIndex=${l}
        ></w3m-all-wallets-list-item>
      `)}paginationLoaderTemplate(){const{wallets:e,recommended:t,featured:l,count:r,mobileFilteredOutWalletsLength:s}=i.ApiController.state,o=window.innerWidth<352?3:4,n=e.length+t.length;let d=Math.ceil(n/o)*o-n+o;return d-=e.length?l.length%o:0,0===r&&l.length>0?null:0===r||[...l,...e,...t].length<r-(s??0)?this.shimmerTemplate(d,h):null}createPaginationObserver(){const e=this.shadowRoot?.querySelector(`#${h}`);e&&(this.paginationObserver=new IntersectionObserver(([e])=>{if(e?.isIntersecting&&!this.loading){const{page:e,count:t,wallets:l}=i.ApiController.state;l.length<t&&i.ApiController.fetchWalletsByPage({page:e+1})}}),this.paginationObserver.observe(e))}onConnectWallet(e){i.ConnectorController.selectWalletConnector(e)}};p.styles=d.default,c([(0,t.state)()],p.prototype,"loading",void 0),c([(0,t.state)()],p.prototype,"wallets",void 0),c([(0,t.state)()],p.prototype,"recommended",void 0),c([(0,t.state)()],p.prototype,"featured",void 0),c([(0,t.state)()],p.prototype,"filteredWallets",void 0),c([(0,t.state)()],p.prototype,"badge",void 0),c([(0,t.state)()],p.prototype,"mobileFullScreen",void 0),p=c([(0,r.customElement)('w3m-all-wallets-list')],p)},6921,[5531,5557,5568,6247,6277,6922,6926,6275,6929,6931]);
__d(function(g,r,i,a,m,e,d){"use strict";Object.defineProperty(e,'__esModule',{value:!0});var t=r(d[0]);Object.keys(t).forEach(function(n){'default'===n||Object.prototype.hasOwnProperty.call(e,n)||Object.defineProperty(e,n,{enumerable:!0,get:function(){return t[n]}})})},6922,[6923]);
__d(function(g,_r,_i,a,m,_e,_d){"use strict";Object.defineProperty(_e,'__esModule',{value:!0}),Object.defineProperty(_e,"WuiCardSelectLoader",{enumerable:!0,get:function(){return u}});var e=_r(_d[0]),t=_r(_d[1]),r=_r(_d[2]);_r(_d[3]);var i,l=_r(_d[4]),s=_r(_d[5]),o=_r(_d[6]),h=(i=o)&&i.__esModule?i:{default:i},n=this&&this.__decorate||function(e,t,r,i){var l,s=arguments.length,o=s<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,r):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,r,i);else for(var h=e.length-1;h>=0;h--)(l=e[h])&&(o=(s<3?l(o):s>3?l(t,r,o):l(t,r))||o);return s>3&&o&&Object.defineProperty(t,r,o),o};let u=class extends e.LitElement{constructor(){super(...arguments),this.type='wallet'}render(){return e.html`
      ${this.shimmerTemplate()}
      <wui-shimmer width="80px" height="20px"></wui-shimmer>
    `}shimmerTemplate(){return'network'===this.type?e.html` <wui-shimmer data-type=${this.type} width="48px" height="54px"></wui-shimmer>
        ${r.networkSvgMd}`:e.html`<wui-shimmer width="56px" height="56px"></wui-shimmer>`}};u.styles=[l.resetStyles,l.elementStyles,h.default],n([(0,t.property)()],u.prototype,"type",void 0),u=n([(0,s.customElement)('wui-card-select-loader')],u)},6923,[5531,5557,6924,6904,6279,6284,6925]);
__d(function(g,r,i,a,m,e,d){"use strict";Object.defineProperty(e,'__esModule',{value:!0}),Object.defineProperty(e,"networkSvgMd",{enumerable:!0,get:function(){return t}});const t=r(d[0]).svg`<svg  viewBox="0 0 48 54" fill="none">
  <path
    d="M43.4605 10.7248L28.0485 1.61089C25.5438 0.129705 22.4562 0.129705 19.9515 1.61088L4.53951 10.7248C2.03626 12.2051 0.5 14.9365 0.5 17.886V36.1139C0.5 39.0635 2.03626 41.7949 4.53951 43.2752L19.9515 52.3891C22.4562 53.8703 25.5438 53.8703 28.0485 52.3891L43.4605 43.2752C45.9637 41.7949 47.5 39.0635 47.5 36.114V17.8861C47.5 14.9365 45.9637 12.2051 43.4605 10.7248Z"
  />
</svg>`},6924,[5531]);
__d(function(g,r,i,a,m,e,d){"use strict";Object.defineProperty(e,'__esModule',{value:!0}),Object.defineProperty(e,"default",{enumerable:!0,get:function(){return t}});var t=r(d[0]).css`
  :host {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 104px;
    width: 104px;
    row-gap: ${({spacing:t})=>t[2]};
    background-color: ${({tokens:t})=>t.theme.foregroundPrimary};
    border-radius: ${({borderRadius:t})=>t[5]};
    position: relative;
  }

  wui-shimmer[data-type='network'] {
    border: none;
    -webkit-clip-path: var(--apkt-path-network);
    clip-path: var(--apkt-path-network);
  }

  svg {
    position: absolute;
    width: 48px;
    height: 54px;
    z-index: 1;
  }

  svg > path {
    stroke: ${({tokens:t})=>t.theme.foregroundSecondary};
    stroke-width: 1px;
  }

  @media (max-width: 350px) {
    :host {
      width: 100%;
    }
  }
`},6925,[6280]);
__d(function(g,r,i,a,m,e,d){"use strict";Object.defineProperty(e,'__esModule',{value:!0});var t=r(d[0]);Object.keys(t).forEach(function(n){'default'===n||Object.prototype.hasOwnProperty.call(e,n)||Object.defineProperty(e,n,{enumerable:!0,get:function(){return t[n]}})})},6926,[6927]);
__d(function(g,_r,_i,a,m,_e,_d){"use strict";Object.defineProperty(_e,'__esModule',{value:!0}),Object.defineProperty(_e,"WuiGrid",{enumerable:!0,get:function(){return d}});var t,e=_r(_d[0]),i=_r(_d[1]),p=_r(_d[2]),n=_r(_d[3]),r=_r(_d[4]),o=_r(_d[5]),s=(t=o)&&t.__esModule?t:{default:t},l=this&&this.__decorate||function(t,e,i,p){var n,r=arguments.length,o=r<3?e:null===p?p=Object.getOwnPropertyDescriptor(e,i):p;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(t,e,i,p);else for(var s=t.length-1;s>=0;s--)(n=t[s])&&(o=(r<3?n(o):r>3?n(e,i,o):n(e,i))||o);return r>3&&o&&Object.defineProperty(e,i,o),o};let d=class extends e.LitElement{render(){return this.style.cssText=`\n      grid-template-rows: ${this.gridTemplateRows};\n      grid-template-columns: ${this.gridTemplateColumns};\n      justify-items: ${this.justifyItems};\n      align-items: ${this.alignItems};\n      justify-content: ${this.justifyContent};\n      align-content: ${this.alignContent};\n      column-gap: ${this.columnGap&&`var(--apkt-spacing-${this.columnGap})`};\n      row-gap: ${this.rowGap&&`var(--apkt-spacing-${this.rowGap})`};\n      gap: ${this.gap&&`var(--apkt-spacing-${this.gap})`};\n      padding-top: ${this.padding&&n.UiHelperUtil.getSpacingStyles(this.padding,0)};\n      padding-right: ${this.padding&&n.UiHelperUtil.getSpacingStyles(this.padding,1)};\n      padding-bottom: ${this.padding&&n.UiHelperUtil.getSpacingStyles(this.padding,2)};\n      padding-left: ${this.padding&&n.UiHelperUtil.getSpacingStyles(this.padding,3)};\n      margin-top: ${this.margin&&n.UiHelperUtil.getSpacingStyles(this.margin,0)};\n      margin-right: ${this.margin&&n.UiHelperUtil.getSpacingStyles(this.margin,1)};\n      margin-bottom: ${this.margin&&n.UiHelperUtil.getSpacingStyles(this.margin,2)};\n      margin-left: ${this.margin&&n.UiHelperUtil.getSpacingStyles(this.margin,3)};\n    `,e.html`<slot></slot>`}};d.styles=[p.resetStyles,s.default],l([(0,i.property)()],d.prototype,"gridTemplateRows",void 0),l([(0,i.property)()],d.prototype,"gridTemplateColumns",void 0),l([(0,i.property)()],d.prototype,"justifyItems",void 0),l([(0,i.property)()],d.prototype,"alignItems",void 0),l([(0,i.property)()],d.prototype,"justifyContent",void 0),l([(0,i.property)()],d.prototype,"alignContent",void 0),l([(0,i.property)()],d.prototype,"columnGap",void 0),l([(0,i.property)()],d.prototype,"rowGap",void 0),l([(0,i.property)()],d.prototype,"gap",void 0),l([(0,i.property)()],d.prototype,"padding",void 0),l([(0,i.property)()],d.prototype,"margin",void 0),d=l([(0,r.customElement)('wui-grid')],d)},6927,[5531,5557,6279,6282,6284,6928]);
__d(function(g,r,i,a,m,e,d){"use strict";Object.defineProperty(e,'__esModule',{value:!0}),Object.defineProperty(e,"default",{enumerable:!0,get:function(){return t}});var t=r(d[0]).css`
  :host {
    display: grid;
    width: inherit;
    height: inherit;
  }
`},6928,[5531]);
__d(function(g,_r,_i,a,m,_e,_d){"use strict";Object.defineProperty(_e,'__esModule',{value:!0}),Object.defineProperty(_e,"W3mAllWalletsListItem",{enumerable:!0,get:function(){return h}});var e=_r(_d[0]),t=_r(_d[1]),i=_r(_d[2]),s=_r(_d[3]),r=_r(_d[4]);_r(_d[5]),_r(_d[6]),_r(_d[7]),_r(_d[8]),_r(_d[9]);var l,o=_r(_d[10]),n=(l=o)&&l.__esModule?l:{default:l},d=this&&this.__decorate||function(e,t,i,s){var r,l=arguments.length,o=l<3?t:null===s?s=Object.getOwnPropertyDescriptor(t,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,i,s);else for(var n=e.length-1;n>=0;n--)(r=e[n])&&(o=(l<3?r(o):l>3?r(t,i,o):r(t,i))||o);return l>3&&o&&Object.defineProperty(t,i,o),o};let h=class extends e.LitElement{constructor(){super(),this.observer=new IntersectionObserver(()=>{}),this.visible=!1,this.imageSrc=void 0,this.imageLoading=!1,this.isImpressed=!1,this.explorerId='',this.walletQuery='',this.certified=!1,this.displayIndex=0,this.wallet=void 0,this.observer=new IntersectionObserver(e=>{e.forEach(e=>{e.isIntersecting?(this.visible=!0,this.fetchImageSrc(),this.sendImpressionEvent()):this.visible=!1})},{threshold:.01})}firstUpdated(){this.observer.observe(this)}disconnectedCallback(){this.observer.disconnect()}render(){const t='certified'===this.wallet?.badge_type;return e.html`
      <button>
        ${this.imageTemplate()}
        <wui-flex flexDirection="row" alignItems="center" justifyContent="center" gap="1">
          <wui-text
            variant="md-regular"
            color="inherit"
            class=${(0,i.ifDefined)(t?'certified':void 0)}
            >${this.wallet?.name}</wui-text
          >
          ${t?e.html`<wui-icon size="sm" name="walletConnectBrown"></wui-icon>`:null}
        </wui-flex>
      </button>
    `}imageTemplate(){return!this.visible&&!this.imageSrc||this.imageLoading?this.shimmerTemplate():e.html`
      <wui-wallet-image
        size="lg"
        imageSrc=${(0,i.ifDefined)(this.imageSrc)}
        name=${(0,i.ifDefined)(this.wallet?.name)}
        .installed=${this.wallet?.installed??!1}
        badgeSize="sm"
      >
      </wui-wallet-image>
    `}shimmerTemplate(){return e.html`<wui-shimmer width="56px" height="56px"></wui-shimmer>`}async fetchImageSrc(){this.wallet&&(this.imageSrc=s.AssetUtil.getWalletImage(this.wallet),this.imageSrc||(this.imageLoading=!0,this.imageSrc=await s.AssetUtil.fetchWalletImage(this.wallet.image_id),this.imageLoading=!1))}sendImpressionEvent(){this.wallet&&!this.isImpressed&&(this.isImpressed=!0,s.EventsController.sendWalletImpressionEvent({name:this.wallet.name,walletRank:this.wallet.order,explorerId:this.explorerId,view:s.RouterController.state.view,query:this.walletQuery,certified:this.certified,displayIndex:this.displayIndex}))}};h.styles=n.default,d([(0,t.state)()],h.prototype,"visible",void 0),d([(0,t.state)()],h.prototype,"imageSrc",void 0),d([(0,t.state)()],h.prototype,"imageLoading",void 0),d([(0,t.state)()],h.prototype,"isImpressed",void 0),d([(0,t.property)()],h.prototype,"explorerId",void 0),d([(0,t.property)()],h.prototype,"walletQuery",void 0),d([(0,t.property)()],h.prototype,"certified",void 0),d([(0,t.property)()],h.prototype,"displayIndex",void 0),d([(0,t.property)({type:Object})],h.prototype,"wallet",void 0),h=d([(0,r.customElement)('w3m-all-wallets-list-item')],h)},6929,[5531,5557,5568,6247,6277,6285,6328,6903,6332,6889,6930]);
__d(function(g,r,i,a,m,e,d){"use strict";Object.defineProperty(e,'__esModule',{value:!0}),Object.defineProperty(e,"default",{enumerable:!0,get:function(){return o}});var o=r(d[0]).css`
  button {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    width: 104px;
    row-gap: ${({spacing:o})=>o[2]};
    padding: ${({spacing:o})=>o[3]} ${({spacing:o})=>o[0]};
    background-color: ${({tokens:o})=>o.theme.foregroundPrimary};
    border-radius: clamp(0px, ${({borderRadius:o})=>o[4]}, 20px);
    transition:
      color ${({durations:o})=>o.lg} ${({easings:o})=>o['ease-out-power-1']},
      background-color ${({durations:o})=>o.lg}
        ${({easings:o})=>o['ease-out-power-1']},
      border-radius ${({durations:o})=>o.lg}
        ${({easings:o})=>o['ease-out-power-1']};
    will-change: background-color, color, border-radius;
    outline: none;
    border: none;
  }

  button > wui-flex > wui-text {
    color: ${({tokens:o})=>o.theme.textPrimary};
    max-width: 86px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    justify-content: center;
  }

  button > wui-flex > wui-text.certified {
    max-width: 66px;
  }

  @media (hover: hover) and (pointer: fine) {
    button:hover:enabled {
      background-color: ${({tokens:o})=>o.theme.foregroundSecondary};
    }
  }

  button:disabled > wui-flex > wui-text {
    color: ${({tokens:o})=>o.core.glass010};
  }

  [data-selected='true'] {
    background-color: ${({colors:o})=>o.accent020};
  }

  @media (hover: hover) and (pointer: fine) {
    [data-selected='true']:hover:enabled {
      background-color: ${({colors:o})=>o.accent010};
    }
  }

  [data-selected='true']:active:enabled {
    background-color: ${({colors:o})=>o.accent010};
  }

  @media (max-width: 350px) {
    button {
      width: 100%;
    }
  }
`},6930,[6277]);
__d(function(g,r,i,a,m,e,d){"use strict";Object.defineProperty(e,'__esModule',{value:!0}),Object.defineProperty(e,"default",{enumerable:!0,get:function(){return t}});var t=r(d[0]).css`
  wui-grid {
    max-height: clamp(360px, 400px, 80vh);
    overflow: scroll;
    scrollbar-width: none;
    grid-auto-rows: min-content;
    grid-template-columns: repeat(auto-fill, 104px);
  }

  :host([data-mobile-fullscreen='true']) wui-grid {
    max-height: none;
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

  w3m-all-wallets-list-item {
    opacity: 0;
    animation-duration: ${({durations:t})=>t.xl};
    animation-timing-function: ${({easings:t})=>t['ease-inout-power-2']};
    animation-name: fade-in;
    animation-fill-mode: forwards;
  }

  @keyframes fade-in {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  wui-loading-spinner {
    padding-top: ${({spacing:t})=>t[4]};
    padding-bottom: ${({spacing:t})=>t[4]};
    justify-content: center;
    grid-column: 1 / span 4;
  }
`},6931,[6277]);
__d(function(g,_r,_i,a,m,_e,_d){"use strict";Object.defineProperty(_e,'__esModule',{value:!0}),Object.defineProperty(_e,"W3mAllWalletsSearch",{enumerable:!0,get:function(){return c}});var e=_r(_d[0]),t=_r(_d[1]),l=_r(_d[2]),i=_r(_d[3]);_r(_d[4]),_r(_d[5]),_r(_d[6]),_r(_d[7]),_r(_d[8]);var r=_r(_d[9]);_r(_d[10]);var o,n=_r(_d[11]),s=(o=n)&&o.__esModule?o:{default:o},d=this&&this.__decorate||function(e,t,l,i){var r,o=arguments.length,n=o<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,l):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,l,i);else for(var s=e.length-1;s>=0;s--)(r=e[s])&&(n=(o<3?r(n):o>3?r(t,l,n):r(t,l))||n);return o>3&&n&&Object.defineProperty(t,l,n),n};let c=class extends e.LitElement{constructor(){super(...arguments),this.prevQuery='',this.prevBadge=void 0,this.loading=!0,this.mobileFullScreen=l.OptionsController.state.enableMobileFullScreen,this.query=''}render(){return this.mobileFullScreen&&this.setAttribute('data-mobile-fullscreen','true'),this.onSearch(),this.loading?e.html`<wui-loading-spinner color="accent-primary"></wui-loading-spinner>`:this.walletsTemplate()}async onSearch(){this.query.trim()===this.prevQuery.trim()&&this.badge===this.prevBadge||(this.prevQuery=this.query,this.prevBadge=this.badge,this.loading=!0,await l.ApiController.searchWallet({search:this.query,badge:this.badge}),this.loading=!1)}walletsTemplate(){const{search:t}=l.ApiController.state,i=r.WalletUtil.markWalletsAsInstalled(t);return t.length?e.html`
      <wui-grid
        data-testid="wallet-list"
        .padding=${['0','3','3','3']}
        rowGap="4"
        columngap="2"
        justifyContent="space-between"
      >
        ${i.map((t,l)=>e.html`
            <w3m-all-wallets-list-item
              @click=${()=>this.onConnectWallet(t)}
              .wallet=${t}
              data-testid="wallet-search-item-${t.id}"
              explorerId=${t.id}
              certified=${'certified'===this.badge}
              walletQuery=${this.query}
              displayIndex=${l}
            ></w3m-all-wallets-list-item>
          `)}
      </wui-grid>
    `:e.html`
        <wui-flex
          data-testid="no-wallet-found"
          justifyContent="center"
          alignItems="center"
          gap="3"
          flexDirection="column"
        >
          <wui-icon-box size="lg" color="default" icon="wallet"></wui-icon-box>
          <wui-text data-testid="no-wallet-found-text" color="secondary" variant="md-medium">
            No Wallet found
          </wui-text>
        </wui-flex>
      `}onConnectWallet(e){l.ConnectorController.selectWalletConnector(e)}};c.styles=s.default,d([(0,t.state)()],c.prototype,"loading",void 0),d([(0,t.state)()],c.prototype,"mobileFullScreen",void 0),d([(0,t.property)()],c.prototype,"query",void 0),d([(0,t.property)()],c.prototype,"badge",void 0),c=d([(0,i.customElement)('w3m-all-wallets-search')],c)},6932,[5531,5557,6247,6277,6285,6926,6885,6933,6332,6275,6929,6934]);
__d(function(g,r,i,a,m,e,d){"use strict";Object.defineProperty(e,'__esModule',{value:!0});var t=r(d[0]);Object.keys(t).forEach(function(n){'default'===n||Object.prototype.hasOwnProperty.call(e,n)||Object.defineProperty(e,n,{enumerable:!0,get:function(){return t[n]}})})},6933,[6326]);
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

  :host([data-mobile-fullscreen='true']) wui-grid {
    max-height: none;
    height: auto;
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
`},6934,[5531]);
__d(function(g,_r,_i,a,m,e,_d){"use strict";Object.defineProperty(e,'__esModule',{value:!0}),Object.defineProperty(e,"W3mDownloadsView",{enumerable:!0,get:function(){return l}});var t=_r(_d[0]),i=_r(_d[1]),r=_r(_d[2]);_r(_d[3]),_r(_d[4]),_r(_d[5]);var o=this&&this.__decorate||function(t,i,r,o){var l,n=arguments.length,s=n<3?i:null===o?o=Object.getOwnPropertyDescriptor(i,r):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)s=Reflect.decorate(t,i,r,o);else for(var h=t.length-1;h>=0;h--)(l=t[h])&&(s=(n<3?l(s):n>3?l(i,r,s):l(i,r))||s);return n>3&&s&&Object.defineProperty(i,r,s),s};let l=class extends t.LitElement{constructor(){super(...arguments),this.wallet=i.RouterController.state.data?.wallet}render(){if(!this.wallet)throw new Error('w3m-downloads-view');return t.html`
      <wui-flex gap="2" flexDirection="column" .padding=${['3','3','4','3']}>
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
      <wui-text variant="md-medium" color="primary">Chrome Extension</wui-text>
    </wui-list-item>`:null}iosTemplate(){return this.wallet?.app_store?t.html`<wui-list-item
      variant="icon"
      icon="appStore"
      iconVariant="square"
      @click=${this.onAppStore.bind(this)}
      chevron
    >
      <wui-text variant="md-medium" color="primary">iOS App</wui-text>
    </wui-list-item>`:null}androidTemplate(){return this.wallet?.play_store?t.html`<wui-list-item
      variant="icon"
      icon="playStore"
      iconVariant="square"
      @click=${this.onPlayStore.bind(this)}
      chevron
    >
      <wui-text variant="md-medium" color="primary">Android App</wui-text>
    </wui-list-item>`:null}homepageTemplate(){return this.wallet?.homepage?t.html`
      <wui-list-item
        variant="icon"
        icon="browser"
        iconVariant="square-blue"
        @click=${this.onHomePage.bind(this)}
        chevron
      >
        <wui-text variant="md-medium" color="primary">Website</wui-text>
      </wui-list-item>
    `:null}openStore(t){t.href&&this.wallet&&(i.EventsController.sendEvent({type:'track',event:'GET_WALLET',properties:{name:this.wallet.name,walletRank:this.wallet.order,explorerId:this.wallet.id,type:t.type}}),i.CoreHelperUtil.openHref(t.href,'_blank'))}onChromeStore(){this.wallet?.chrome_store&&this.openStore({href:this.wallet.chrome_store,type:'chrome_store'})}onAppStore(){this.wallet?.app_store&&this.openStore({href:this.wallet.app_store,type:'app_store'})}onPlayStore(){this.wallet?.play_store&&this.openStore({href:this.wallet.play_store,type:'play_store'})}onHomePage(){this.wallet?.homepage&&this.openStore({href:this.wallet.homepage,type:'homepage'})}};l=o([(0,r.customElement)('w3m-downloads-view')],l)},6935,[5531,6247,6277,6285,6936,6332]);
__d(function(g,r,i,a,m,e,d){"use strict";Object.defineProperty(e,'__esModule',{value:!0});var t=r(d[0]);Object.keys(t).forEach(function(n){'default'===n||Object.prototype.hasOwnProperty.call(e,n)||Object.defineProperty(e,n,{enumerable:!0,get:function(){return t[n]}})})},6936,[6937]);
__d(function(g,_r,_i,a,m,_e,_d){"use strict";Object.defineProperty(_e,'__esModule',{value:!0}),Object.defineProperty(_e,"WuiListItem",{enumerable:!0,get:function(){return s}});var e=_r(_d[0]),t=_r(_d[1]),o=_r(_d[2]);_r(_d[3]),_r(_d[4]);var i,r=_r(_d[5]),n=_r(_d[6]),l=_r(_d[7]),d=(i=l)&&i.__esModule?i:{default:i},p=this&&this.__decorate||function(e,t,o,i){var r,n=arguments.length,l=n<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,o):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)l=Reflect.decorate(e,t,o,i);else for(var d=e.length-1;d>=0;d--)(r=e[d])&&(l=(n<3?r(l):n>3?r(t,o,l):r(t,o))||l);return n>3&&l&&Object.defineProperty(t,o,l),l};let s=class extends e.LitElement{constructor(){super(...arguments),this.imageSrc='google',this.loading=!1,this.disabled=!1,this.rightIcon=!0,this.rounded=!1,this.fullSize=!1}render(){return this.dataset.rounded=this.rounded?'true':'false',e.html`
      <button
        ?disabled=${!!this.loading||Boolean(this.disabled)}
        data-loading=${this.loading}
        tabindex=${(0,o.ifDefined)(this.tabIdx)}
      >
        <wui-flex gap="2" alignItems="center">
          ${this.templateLeftIcon()}
          <wui-flex gap="1">
            <slot></slot>
          </wui-flex>
        </wui-flex>
        ${this.templateRightIcon()}
      </button>
    `}templateLeftIcon(){return this.icon?e.html`<wui-image
        icon=${this.icon}
        iconColor=${(0,o.ifDefined)(this.iconColor)}
        ?boxed=${!0}
        ?rounded=${this.rounded}
      ></wui-image>`:e.html`<wui-image
      ?boxed=${!0}
      ?rounded=${this.rounded}
      ?fullSize=${this.fullSize}
      src=${this.imageSrc}
    ></wui-image>`}templateRightIcon(){return this.rightIcon?this.loading?e.html`<wui-loading-spinner size="md" color="accent-primary"></wui-loading-spinner>`:e.html`<wui-icon name="chevronRight" size="lg" color="default"></wui-icon>`:null}};s.styles=[r.resetStyles,r.elementStyles,d.default],p([(0,t.property)()],s.prototype,"imageSrc",void 0),p([(0,t.property)()],s.prototype,"icon",void 0),p([(0,t.property)()],s.prototype,"iconColor",void 0),p([(0,t.property)({type:Boolean})],s.prototype,"loading",void 0),p([(0,t.property)()],s.prototype,"tabIdx",void 0),p([(0,t.property)({type:Boolean})],s.prototype,"disabled",void 0),p([(0,t.property)({type:Boolean})],s.prototype,"rightIcon",void 0),p([(0,t.property)({type:Boolean})],s.prototype,"rounded",void 0),p([(0,t.property)({type:Boolean})],s.prototype,"fullSize",void 0),s=p([(0,n.customElement)('wui-list-item')],s)},6937,[5531,5557,5568,6326,6313,6279,6284,6938]);
__d(function(g,r,i,a,m,e,d){"use strict";Object.defineProperty(e,'__esModule',{value:!0}),Object.defineProperty(e,"default",{enumerable:!0,get:function(){return t}});var t=r(d[0]).css`
  :host {
    width: 100%;
  }

  button {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: ${({spacing:t})=>t[3]};
    width: 100%;
    background-color: ${({tokens:t})=>t.theme.backgroundPrimary};
    border-radius: ${({borderRadius:t})=>t[4]};
    transition:
      background-color ${({durations:t})=>t.lg}
        ${({easings:t})=>t['ease-out-power-2']},
      scale ${({durations:t})=>t.lg} ${({easings:t})=>t['ease-out-power-2']};
    will-change: background-color, scale;
  }

  wui-text {
    text-transform: capitalize;
  }

  wui-image {
    color: ${({tokens:t})=>t.theme.textPrimary};
  }

  @media (hover: hover) {
    button:hover:enabled {
      background-color: ${({tokens:t})=>t.theme.foregroundPrimary};
    }
  }

  button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`},6938,[6280]);