(this["webpackJsonpmy-app"]=this["webpackJsonpmy-app"]||[]).push([[0],{138:function(e,t,n){e.exports=n(277)},143:function(e,t,n){},144:function(e,t,n){},277:function(e,t,n){"use strict";n.r(t);var a=n(0),o=n.n(a),r=n(6),c=n.n(r),l=(n(143),n(144),n(8)),i=n(17),u=n(18),s=n(20),m=n(19),y=n(26),p=n(119),d=n.n(p).a.create({withCredentials:!0}),h=function(e){return e.data},f={query:function(e){var t="";e&&(t="?"+Object.keys(e).map((function(t){return t+"="+e[t]})).join("&"));return d.get("".concat("/api/toy").concat(t)).then(h)},getById:function(e){return d.get("".concat("/api/toy","/").concat(e)).then(h)},remove:function(e){return d.delete("".concat("/api/toy","/").concat(e))},save:function(e){if(e._id)return d.put("".concat("/api/toy","/").concat(e._id),e);var t={_id:b(),price:56,name:e,type:"Funny",createdAt:new Date,inStock:!0};return d.post("/api/toy",t).then(h)}};function b(){for(var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:5,t="",n="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",a=0;a<e;a++)t+=n.charAt(Math.floor(Math.random()*n.length));return t}function v(e){return function(t){f.query(e).then((function(e){t({type:"SET_TOYS",toys:e})}))}}function E(e){return function(t){f.remove(e._id).then((function(){t({type:"REMOVE_TOY",toy:e})}))}}var g=n(32);function O(e){var t=e.toy;return o.a.createElement("div",{className:"toy-preview"},o.a.createElement("h3",null,t.name),o.a.createElement("h4",null,t.price,"$"),o.a.createElement("h5",null,"Category: ",t.type),t.inStock&&"This toy is on stock!",!t.inStock&&"Out of stock",o.a.createElement("div",null,o.a.createElement(g.b,{to:"/toy/".concat(t._id)},"Check It Out!")),o.a.createElement("div",null,o.a.createElement(g.b,{to:"/toy/edit/".concat(t._id)},"Edit")))}function j(e){var t=e.toys;return o.a.createElement("div",{className:"toy-list"},t.map((function(e){return o.a.createElement(O,{toy:e,key:e._id})})))}var k=n(45),T=n(12),S=n(312),C=n(278),A=n(315),w=n(317),D=n(314),F=function(e){Object(s.a)(n,e);var t=Object(m.a)(n);function n(){var e;Object(i.a)(this,n);for(var a=arguments.length,o=new Array(a),r=0;r<a;r++)o[r]=arguments[r];return(e=t.call.apply(t,[this].concat(o))).state={filter:{filterText:"",inStock:"all",sortBy:""}},e.handleChange=function(t){var n=t.target;console.log(n.value,"@TARGET");var a=n.name,o=n.value;e.setState((function(e){return{filter:Object(T.a)(Object(T.a)({},e.filter),{},Object(k.a)({},a,o))}}),(function(){e.props.onSetFilter(e.state.filter),console.log(e.state)}))},e.submitForm=function(t){t.preventDefault(),e.props.onSetFilter(e.state.filter)},e.setSort=function(t){e.setState({filter:Object(T.a)(Object(T.a)({},e.state.filter),{},{sortBy:t})},(function(){return e.props.onSetFilter(e.state.filter)}))},e}return Object(u.a)(n,[{key:"componentDidMount",value:function(){}},{key:"render",value:function(){var e=this;return o.a.createElement("div",{className:"toy-filter"},o.a.createElement("form",{onSubmit:this.submitForm},o.a.createElement(A.a,{onChange:this.handleChange,type:"text",name:"filterText",placeholder:"Search toy...",id:"outlined-basic",label:"SEARCH",variant:"outlined"}),o.a.createElement(D.a,{name:"inStock",value:this.state.filter.inStock,labelId:"demo-simple-select-label",id:"demo-simple-select",onChange:this.handleChange},o.a.createElement(w.a,{value:"all"},"All"),o.a.createElement(w.a,{value:"yes"},"In stock"),o.a.createElement(w.a,{value:"no"},"Out of stock"))),o.a.createElement(S.a,{color:"primary",variant:"contained","aria-label":"contained primary button group"},o.a.createElement(C.a,{onClick:function(){return e.setSort("price")}},"Sort By Price"),o.a.createElement(C.a,{className:"special-btn",onClick:function(){return e.setSort("name")}},"Sort By Name")))}}]),n}(a.Component),_=n(313),M=n(125),B=n.n(M),N=n(87),I=function(e){Object(s.a)(n,e);var t=Object(m.a)(n);function n(){var e;Object(i.a)(this,n);for(var a=arguments.length,o=new Array(a),r=0;r<a;r++)o[r]=arguments[r];return(e=t.call.apply(t,[this].concat(o))).handleChange=function(t){var n=t.target.value;e.setState({toyName:n})},e.submitForm=function(t){t.preventDefault(),e.props.onAddToy(e.state.toyName)},e}return Object(u.a)(n,[{key:"render",value:function(){var e=this;return o.a.createElement("section",null,o.a.createElement(N.b,{initialValues:{text:""},onSubmit:function(e,t){var n=t.setSubmitting;setTimeout((function(){alert(JSON.stringify(e,null,2)),n(!1)}),400)}},(function(t){var n=t.isSubmitting;return o.a.createElement(N.a,null,o.a.createElement(A.a,{name:"text",onChange:e.handleChange,type:"text",placeholder:"Add Toy...",id:"outlined-basic",label:"New Toy",variant:"outlined"}),o.a.createElement(_.a,{color:"primary","aria-label":"add"},o.a.createElement(B.a,{onClick:e.submitForm,type:"submit",disabled:n})))})))}}]),n}(a.Component),P=function(e){Object(s.a)(n,e);var t=Object(m.a)(n);function n(){var e;Object(i.a)(this,n);for(var a=arguments.length,o=new Array(a),r=0;r<a;r++)o[r]=arguments[r];return(e=t.call.apply(t,[this].concat(o))).state={filterBy:null},e.onSetFilter=function(t){e.setState({filterBy:t},(function(){return e.props.loadToys(e.state.filterBy)}))},e.onAddToy=function(t){e.props.addToy(t)},e}return Object(u.a)(n,[{key:"componentDidMount",value:function(){this.props.loadToys()}},{key:"render",value:function(){var e=this.props.toys;return e?o.a.createElement("div",{className:"toy-app"},o.a.createElement("h1",null,"Toy App"),o.a.createElement(I,{onAddToy:this.onAddToy}),o.a.createElement(F,{onSetFilter:this.onSetFilter,onSortName:this.onSortName,onSortPrice:this.onSortPrice}),o.a.createElement(j,{toys:e})):o.a.createElement("div",null,"Loading...")}}]),n}(a.Component),R={loadToys:v,addToy:function(e){return function(t){f.save(e).then((function(e){t({type:"ADD_TOY",newToy:e})}))}}},x=Object(y.b)((function(e){return{toys:e.toyReducer.toys}}),R)(P),Y=function(e){Object(s.a)(n,e);var t=Object(m.a)(n);function n(){var e;Object(i.a)(this,n);for(var a=arguments.length,o=new Array(a),r=0;r<a;r++)o[r]=arguments[r];return(e=t.call.apply(t,[this].concat(o))).state={toy:null},e.onDeleteToy=function(){e.props.removeToy(e.state.toy),setTimeout((function(){return e.props.history.push("/toy")}),500)},e}return Object(u.a)(n,[{key:"componentDidMount",value:function(){var e=this;f.getById(this.props.match.params.id).then((function(t){e.setState({toy:t})}))}},{key:"render",value:function(){var e=this.state.toy;return e?o.a.createElement("div",null,o.a.createElement("h3",null,e.name),o.a.createElement("h4",null,e.price,"$"),o.a.createElement("h5",null,"Category: ",e.type),e.inStock?"This toy is on stock!":"Out of stock",o.a.createElement("h5",null,"Created At ",e.createdAt),o.a.createElement("button",{onClick:this.onDeleteToy},"Delete Toy")):o.a.createElement("span",null,"Loading...")}}]),n}(a.Component),U={removeToy:E},V=Object(y.b)((function(e){return{toys:e.toyReducer.toys}}),U)(Y);function W(){return o.a.createElement("div",{className:"nav-container"},o.a.createElement(g.b,{className:"navlink",to:"/"}," Toy App")," ",o.a.createElement("br",null),o.a.createElement(g.b,{className:"navlink",to:"/about"}," About"),o.a.createElement("br",null),o.a.createElement(g.b,{className:"navlink",to:"/dashboard"}," Dashboard"))}var L=function(e){Object(s.a)(n,e);var t=Object(m.a)(n);function n(){var e;Object(i.a)(this,n);for(var a=arguments.length,o=new Array(a),r=0;r<a;r++)o[r]=arguments[r];return(e=t.call.apply(t,[this].concat(o))).state={toy:null},e.handleInput=function(t){var n=t.target,a=n.name,o="number"===n.type?+n.value:n.value;e.setState((function(e){return{toy:Object(T.a)(Object(T.a)({},e.toy),{},Object(k.a)({},a,o))}}),(function(){return console.log(e.state,"@@@***")}))},e.onSaveToy=function(t){t.preventDefault(),e.props.saveToy(e.state.toy),setTimeout((function(){return e.props.history.push("/toy")}),400)},e}return Object(u.a)(n,[{key:"componentDidMount",value:function(){var e=this;f.getById(this.props.match.params.id).then((function(t){e.setState({toy:t})}))}},{key:"render",value:function(){var e=this.state.toy;return e?o.a.createElement("div",{className:"edit-container"},o.a.createElement("h3",null,"Want to edit your toy info? This is the right place!"),o.a.createElement("form",{onSubmit:this.onSaveToy},o.a.createElement("input",{onChange:this.handleInput,type:"text",name:"name",defaultValue:e.name}),o.a.createElement("input",{onChange:this.handleInput,type:"text",name:"type",defaultValue:e.type}),o.a.createElement("input",{onChange:this.handleInput,type:"number",name:"price",defaultValue:e.price}),o.a.createElement("button",null,"SAVE"))):o.a.createElement("div",null,"Loading...")}}]),n}(a.Component),q={removeToy:E,saveToy:function(e){return function(t){f.save(e).then((function(){t({type:"UPDATE_TOY",toyToSave:e})}))}}},H=Object(y.b)((function(e){return{toys:e.toyReducer.toys}}),q)(L),J=n(86),X=function(e){Object(s.a)(n,e);var t=Object(m.a)(n);function n(){var e;Object(i.a)(this,n);for(var a=arguments.length,o=new Array(a),r=0;r<a;r++)o[r]=arguments[r];return(e=t.call.apply(t,[this].concat(o))).getObjectMap=function(){return e.props.toys.reduce((function(e,t){return e[t.type]||(e[t.type]=0),e[t.type]+=t.price,e}),{})},e.getCounterMap=function(){return e.props.toys.reduce((function(e,t){return e[t.type]||(e[t.type]=0),e[t.type]++,e}),{})},e.getBarData=function(){var t=Object.keys(e.getObjectMap()),n=Object.values(e.getObjectMap()),a=Object.values(e.getCounterMap());return{labels:t,datasets:[{label:"Average price",backgroundColor:"rgba(255,99,132,0.2)",borderColor:"rgba(255,99,132,1)",borderWidth:2,hoverBackgroundColor:"rgba(255,99,132,0.4)",hoverBorderColor:"#ff6384",data:n.map((function(e,t){return+(e/a[t]).toFixed(0)}))}]}},e.getPieData=function(){var t=e.props.toys.reduce((function(e,t){var n=t.createdAt.substring(0,4);return e[n]||(e[+n]=0),e[n]++,e}),{});return{labels:Object.keys(t),datasets:[{data:Object.values(t),backgroundColor:["#FF6384","#36A2EB","#FFCE56","#FFEE11","#40434E","#52154E","#C17817","#3F784C","#B20D30","#F0E2E7","#3F84E5","#af73e1"],hoverBackgroundColor:["#FF6384","#36A2EB","#FFCE56","#FFEE11","#40434E","#52154E","#C17817","#3F784C","#B20D30","#F0E2E7","#3F84E5","#af73e1"]}]}},e}return Object(u.a)(n,[{key:"componentDidMount",value:function(){this.props.loadToys()}},{key:"render",value:function(){return this.props.toys.length?o.a.createElement("section",{className:"dashboard-container"},o.a.createElement("h1",null,"Dashboard"),o.a.createElement("h2",null,"Average price per Toy category/type"),o.a.createElement(J.Bar,{data:this.getBarData(),width:5,height:1,options:{maintainAspectRatio:!0,scales:{yAxes:[{ticks:{beginAtZero:!0,min:0}}]}}}),o.a.createElement("h2",null,"Toys per year"),o.a.createElement(J.Pie,{width:3,height:1,data:this.getPieData()})):o.a.createElement("div",null,"Loading")}}]),n}(a.Component),z={loadToys:v},G=Object(y.b)((function(e){return{toys:e.toyReducer.toys}}),z)(X),K=n(44),Z=function(e){Object(s.a)(n,e);var t=Object(m.a)(n);function n(){var e;Object(i.a)(this,n);for(var a=arguments.length,o=new Array(a),r=0;r<a;r++)o[r]=arguments[r];return(e=t.call.apply(t,[this].concat(o))).state={lat:32.0853,lng:34.7818},e.onMarkerClick=function(e){console.log(e)},e.onInfoWindowClose=function(e){console.log(e)},e.onMapClicked=function(t,n,a){e.setState({lat:a.latLng.lat(),lng:a.latLng.lng()})},e.changePos=function(t){var n={lat:"",lng:""};switch(t){case"haifa":n.lat=32.794044,n.lng=34.989571;break;case"bat-yam":n.lat=32.017136,n.lng=34.745441;break;case"eilat":n.lat=29.55805,n.lng=34.94821;break;default:n.lat=32.017136,n.lng=34.745441}e.setState(n)},e}return Object(u.a)(n,[{key:"render",value:function(){var e=this;return o.a.createElement("section",null,o.a.createElement("h1",null,"About Page"),o.a.createElement(S.a,{color:"primary",variant:"contained","aria-label":"contained primary button group"},o.a.createElement(C.a,{onClick:function(){return e.changePos("haifa")}},"Haifa"),o.a.createElement(C.a,{onClick:function(){return e.changePos("batyam")}},"Bat-Yam"),o.a.createElement(C.a,{onClick:function(){return e.changePos("eilat")}},"Eilat")),o.a.createElement(K.Map,{initialCenter:this.state,center:this.state,google:this.props.google,zoom:10,onClick:this.onMapClicked},o.a.createElement(K.Marker,{onClick:this.onMarkerClick,name:"Current location"}),o.a.createElement(K.Marker,{position:{lat:32.2953,lng:34.8822}}),o.a.createElement(K.Marker,{position:{lat:32.3803,lng:35.0822}}),o.a.createElement(K.InfoWindow,{onClose:this.onInfoWindowClose},o.a.createElement("div",null,o.a.createElement("h1",null,"InfoWindow")))))}}]),n}(a.Component),$=Object(K.GoogleApiWrapper)({apiKey:"AIzaSyDV3aMtXNZ4Q87UKlasdj0gHhEP2xEEqFY"})(Z);var Q=function(){return o.a.createElement("div",{className:"App"},o.a.createElement(W,null),o.a.createElement(l.c,null,o.a.createElement(l.a,{component:H,path:"/toy/edit/:id"}),o.a.createElement(l.a,{component:V,path:"/toy/:id"}),o.a.createElement(l.a,{component:G,path:"/dashboard"}),o.a.createElement(l.a,{component:$,path:"/about"}),o.a.createElement(l.a,{component:x,path:"/"})))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));var ee=n(43),te=n(126),ne=n(127),ae={toys:[]};var oe={users:[],loggedinUser:null};var re=Object(ee.c)({toyReducer:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:ae,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"SET_TOYS":return Object(T.a)(Object(T.a)({},e),{},{toys:t.toys});case"REMOVE_TOY":return Object(T.a)(Object(T.a)({},e),{},{toys:e.toys.filter((function(e){return e._id!==t.toy._id}))});case"ADD_TOY":return Object(T.a)(Object(T.a)({},e),{},{toys:[t.newToy].concat(Object(ne.a)(e.toys))});case"UPDATE_TOY":case"UPDATE_TODO":return Object(T.a)(Object(T.a)({},e),{},{toys:e.toys.map((function(e){return e._id===t.toyToSave._id?t.toyToSave:e}))});default:return e}},userReducer:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:oe,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"SET_USER":return Object(T.a)(Object(T.a)({},e),{},{cars:t.cars});case"SET_USERS:":return Object(T.a)(Object(T.a)({},e),{},{loggedinUser:t.user});default:return e}}}),ce=window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__||ee.d,le=Object(ee.e)(re,ce(Object(ee.a)(te.a)));c.a.render(o.a.createElement(y.a,{store:le},o.a.createElement(g.a,null,o.a.createElement(Q,null))),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[138,1,2]]]);
//# sourceMappingURL=main.60f3188d.chunk.js.map