(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{33:function(e,t,a){e.exports=a(68)},44:function(e,t,a){},66:function(e,t,a){},68:function(e,t,a){"use strict";a.r(t);var n,r=a(0),o=a.n(r),s=a(24),i=a.n(s),c=a(30),l=a(5),u=a(31),m=a(15),h={bookmarkLists:[]},d=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:h,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"ADD_BOOKMARK":return Object(m.a)({},e,{bookmarkLists:Object(u.a)(e.bookmarkLists).concat([t.payload])});case"DELETE_BOOKMARK":return Object(m.a)({},e,{bookmarkLists:e.bookmarkLists.filter(function(e){return e.id!==t.payload.id})});default:return e}},E=Object(l.b)(d),y=(a(44),a(32)),k=a(7),b=a(8),S=a(11),v=a(9),p=a(10),f=a(1),O=a(14),w=a.n(O),g=a(4),j=a(28),K=a.n(j),T=a(29),B=a.n(T),L=(a(66),"ytrash"),U={NONE:function(e){return e},ID:function(e){return Object(g.sortBy)(e,"id")},AUTHOR:function(e){return Object(g.sortBy)(e,"by")},TYPE:function(e){return Object(g.sortBy)(e,"type")},TIME:function(e){return Object(g.sortBy)(e,"time")},TITLE:function(e){return Object(g.sortBy)(e,"title")},TEXT:function(e){return Object(g.sortBy)(e,"text")},SCORE:function(e){return Object(g.sortBy)(e,"score")},URL:function(e){return Object(g.sortBy)(e,"url")}},N=function(e){function t(e){var a;return Object(k.a)(this,t),(a=Object(S.a)(this,Object(v.a)(t).call(this,e)))._isMounted=!1,a.state={results:[],usernameSearch:L,username:L,totalBookmarks:0,error:null,isLoading:!1,sortKey:"NONE",isSortReverse:!1},a.needsToGetUserData=a.needsToGetUserData.bind(Object(f.a)(Object(f.a)(a))),a.setUserPost=a.setUserPost.bind(Object(f.a)(Object(f.a)(a))),a.fetchUserData=a.fetchUserData.bind(Object(f.a)(Object(f.a)(a))),a.fetchUserPost=a.fetchUserPost.bind(Object(f.a)(Object(f.a)(a))),a.onSearchChange=a.onSearchChange.bind(Object(f.a)(Object(f.a)(a))),a.onSearchSubmit=a.onSearchSubmit.bind(Object(f.a)(Object(f.a)(a))),a.addBookmark=a.addBookmark.bind(Object(f.a)(Object(f.a)(a))),a.deleteBookmark=a.deleteBookmark.bind(Object(f.a)(Object(f.a)(a))),a}return Object(p.a)(t,e),Object(b.a)(t,[{key:"needsToGetUserData",value:function(e){return this.state.usernameSearch!==e}},{key:"setUserPost",value:function(e){var t=this;e.submitted.map(function(e){return t.fetchUserPost(e)})}},{key:"fetchUserData",value:function(e){var t=this;this.setState({isLoading:!0}),this.setState({results:[]}),w()("https://hacker-news.firebaseio.com/v0/user/".concat(e,".json")).then(function(e){return t.setUserPost(e.data)}).catch(function(e){return t._isMounted&&t.setState({error:e})})}},{key:"fetchUserPost",value:function(e){var t=this;this.setState({isLoading:!0}),this.setState({error:null}),w()("https://hacker-news.firebaseio.com/v0/item/".concat(e,".json")).then(function(e){void 0===e.data.deleted&&t.setState({results:t.state.results.concat(e.data),isLoading:!1})}).catch(function(e){return t._isMounted&&t.setState({error:e})})}},{key:"countBookmarks",value:function(e){this.setState({totalBookmarks:e.bookmarkLists.length})}},{key:"componentDidMount",value:function(){this._isMounted=!0;var e=this.state.username;this.countBookmarks(E.getState()),this.fetchUserData(e)}},{key:"componentWillUnmount",value:function(){this._isMounted=!1}},{key:"onSearchChange",value:function(e){this.setState({username:e.target.value})}},{key:"onSearchSubmit",value:function(e){var t=this.state.username;this.needsToGetUserData(t)&&(this.setState({usernameSearch:t}),this.fetchUserData(t)),e.preventDefault()}},{key:"addBookmark",value:function(e){E.getState().bookmarkLists.filter(function(t){return t.id===e.id}).length>0?alert("This data has already been added in Bookmark list!"):(E.dispatch({type:"ADD_BOOKMARK",payload:e}),this.setState({totalBookmarks:this.state.totalBookmarks+1}))}},{key:"deleteBookmark",value:function(e){window.confirm("Are you sure to delete this data?")&&(E.dispatch(function(e){return{type:"DELETE_BOOKMARK",payload:e}}(e)),this.setState({totalBookmarks:this.state.totalBookmarks-1}))}},{key:"backToTop",value:function(){window.scroll({top:0,left:0,behavior:"smooth"})}},{key:"render",value:function(){var e=this.state,t=e.username,a=e.results,n=e.totalBookmarks,r=e.error,s=e.isLoading,i=a||[];return o.a.createElement("div",{className:"page"},o.a.createElement("h1",null,o.a.createElement("span",{className:"header-title"},"HackerNews Bookmark")," ",o.a.createElement("span",{className:"right-header"},n," Bookmarks")),o.a.createElement(C,{deleteBookmark:this.deleteBookmark}),o.a.createElement("div",{className:"interactions"},o.a.createElement("h2",null,o.a.createElement("u",null,"User Posts"))),o.a.createElement("div",{className:"interactions"},o.a.createElement(D,{value:t,onChange:this.onSearchChange,onSubmit:this.onSearchSubmit},"Submit")),r?o.a.createElement("div",{className:"interactions"},o.a.createElement("p",null,"Something went wrong !")):o.a.createElement(R,{list:i,addBookmark:this.addBookmark}),o.a.createElement("div",{className:"interactions"},o.a.createElement(P,{isLoading:s,onClick:this.backToTop},"Back to Top"),o.a.createElement("br",null),o.a.createElement("br",null),o.a.createElement("span",null,"\xa9 2018 ",o.a.createElement("a",{href:"https://www.linkedin.com/in/aditio-agung-nugroho-9805297b/"},"Aditio Agung Nugroho"))))}}]),t}(r.Component),D=function(e){var t=e.value,a=e.onChange,n=e.onSubmit,r=e.children;return o.a.createElement("form",{onSubmit:n},"Input HackerNews Username :",o.a.createElement("input",{type:"text",placeholder:"HackerNews username",value:t,onChange:a}),o.a.createElement("button",{type:"submit"},r))},R=function(e){function t(e){var a;return Object(k.a)(this,t),(a=Object(S.a)(this,Object(v.a)(t).call(this,e))).state={sortKey:"TITLE",isSortReverse:!1},a.onSort=a.onSort.bind(Object(f.a)(Object(f.a)(a))),a}return Object(p.a)(t,e),Object(b.a)(t,[{key:"onSort",value:function(e){var t=this.state.sortKey===e&&!this.state.isSortReverse;this.setState({sortKey:e,isSortReverse:t})}},{key:"render",value:function(){var e=this.props,t=e.list,a=e.addBookmark,n=this.state,r=n.sortKey,s=n.isSortReverse,i=U[r](t),c=s?i.reverse():i;return o.a.createElement("div",{className:"table"},o.a.createElement("div",{className:"table-header"},o.a.createElement("span",{style:{width:"5%"}},o.a.createElement(I,{sortKey:"ID",onSort:this.onSort,activeSortKey:r},o.a.createElement("strong",null,"ID"))),o.a.createElement("span",{style:{width:"5%"}},o.a.createElement(I,{sortKey:"TYPE",onSort:this.onSort,activeSortKey:r},o.a.createElement("strong",null,"Type"))),o.a.createElement("span",{style:{width:"10%"}},o.a.createElement(I,{sortKey:"TIME",onSort:this.onSort,activeSortKey:r},o.a.createElement("strong",null,"Time"))),o.a.createElement("span",{style:{width:"18%"}},o.a.createElement(I,{sortKey:"TITLE",onSort:this.onSort,activeSortKey:r},o.a.createElement("strong",null,"Title"))),o.a.createElement("span",{style:{width:"25%"}},o.a.createElement(I,{sortKey:"TEXT",onSort:this.onSort,activeSortKey:r},o.a.createElement("strong",null,"Text"))),o.a.createElement("span",{style:{width:"5%"}},o.a.createElement(I,{sortKey:"SCORE",onSort:this.onSort,activeSortKey:r},o.a.createElement("strong",null,"Score"))),o.a.createElement("span",{style:{width:"25%"}},o.a.createElement(I,{sortKey:"URL",onSort:this.onSort,activeSortKey:r},o.a.createElement("strong",null,"URL"))),o.a.createElement("span",{style:{width:"7%"}},o.a.createElement("strong",null,"Bookmarks"))),c.map(function(e){return o.a.createElement("div",{key:e.id,className:"table-row"},o.a.createElement("span",{style:{width:"5%"}},e.id),o.a.createElement("span",{style:{width:"5%"}},e.type),o.a.createElement("span",{style:{width:"10%"}},o.a.createElement(B.a,{unix:!0},e.time)),o.a.createElement("span",{style:{width:"18%"}},o.a.createElement("a",{href:e.url},e.title)),o.a.createElement("span",{style:{width:"25%"}},e.text),o.a.createElement("span",{style:{width:"5%"}},e.score),o.a.createElement("span",{style:{width:"25%"}},e.url),o.a.createElement("span",{style:{width:"7%"}},o.a.createElement(A,{className:"button-info",onClick:function(){return a(e)}},"Add")))}))}}]),t}(r.Component),C=function(e){function t(e){var a;return Object(k.a)(this,t),(a=Object(S.a)(this,Object(v.a)(t).call(this,e))).state={sortKey:"TITLE",isSortReverse:!1},a.onSort=a.onSort.bind(Object(f.a)(Object(f.a)(a))),a}return Object(p.a)(t,e),Object(b.a)(t,[{key:"onSort",value:function(e){var t=this.state.sortKey===e&&!this.state.isSortReverse;this.setState({sortKey:e,isSortReverse:t})}},{key:"render",value:function(){var e=this.props.deleteBookmark,t=this.state,a=t.sortKey,n=t.isSortReverse,r=E.getState(),s=U[a](r.bookmarkLists),i=n?s.reverse():s;return o.a.createElement("div",{className:"table"},o.a.createElement("div",{className:"table-header"},o.a.createElement("span",{style:{width:"10%"}},o.a.createElement(I,{sortKey:"ID",onSort:this.onSort,activeSortKey:a},o.a.createElement("strong",null,"ID"))),o.a.createElement("span",{style:{width:"10%"}},o.a.createElement(I,{sortKey:"TYPE",onSort:this.onSort,activeSortKey:a},o.a.createElement("strong",null,"Type"))),o.a.createElement("span",{style:{width:"30%"}},o.a.createElement(I,{sortKey:"TITLE",onSort:this.onSort,activeSortKey:a},o.a.createElement("strong",null,"Title"))),o.a.createElement("span",{style:{width:"10%"}},o.a.createElement(I,{sortKey:"AUTHOR",onSort:this.onSort,activeSortKey:a},o.a.createElement("strong",null,"AUTHOR"))),o.a.createElement("span",{style:{width:"35%"}},o.a.createElement(I,{sortKey:"URL",onSort:this.onSort,activeSortKey:a},o.a.createElement("strong",null,"URL"))),o.a.createElement("span",{style:{width:"5%"}},o.a.createElement("strong",null,"ACTION"))),i.map(function(t){return o.a.createElement("div",{key:t.id,className:"table-row"},o.a.createElement("span",{style:{width:"10%"}},t.id),o.a.createElement("span",{style:{width:"10%"}},t.type),o.a.createElement("span",{style:{width:"30%"}},o.a.createElement("a",{href:t.url},t.title)),o.a.createElement("span",{style:{width:"10%"}},t.by),o.a.createElement("span",{style:{width:"35%"}},t.url),o.a.createElement("span",{style:{width:"5%"}},o.a.createElement(A,{className:"button-danger",onClick:function(){return e(t)}},"Delete")))}))}}]),t}(r.Component),I=function(e){var t=e.sortKey,a=e.activeSortKey,n=e.onSort,r=e.children,s=K()("button-inline",{"button-active":t===a});return o.a.createElement(A,{onClick:function(){return n(t)},className:s},r)},A=function(e){var t=e.onClick,a=e.className,n=void 0===a?"":a,r=e.children;return o.a.createElement("button",{onClick:t,className:n,type:"button"},r)},M=function(){return o.a.createElement("div",null,"Loading ...")},P=(n=A,function(e){var t=e.isLoading,a=Object(y.a)(e,["isLoading"]);return t?o.a.createElement(M,null):o.a.createElement(n,a)}),_=N;Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));i.a.render(o.a.createElement(c.a,{store:E},o.a.createElement(_,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}},[[33,2,1]]]);
//# sourceMappingURL=main.0d9576fb.chunk.js.map