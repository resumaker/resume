(window.webpackJsonp=window.webpackJsonp||[]).push([[12],{YAKo:function(e,t,a){"use strict";a.r(t),a.d(t,"query",(function(){return k}));a("0mN4"),a("91GP");var n=a("9eSz"),o=a.n(n),i=a("J66h"),l=a("rCLJ"),r=a("q1tI"),c=a.n(r),s=a("/MKj"),m=a("Kfvu"),d=a("QetY"),u=a("MqQV"),p=a("Pj1C"),g=a("pLir"),f=a("D1pA"),E=a("A0AC"),b=a("6XuX"),h=a("etay"),y=a("qnRQ"),w=a("Kvkj"),v=(a("71TV"),a("dsyl"),a("ym1i"),a("zlg9"),a("yw6X"),a("20M+"),{logoLink:{maxHeight:49},actionsBar:{justifyContent:"space-between"},actionButton:{marginRight:15},headerRightContainer:{flexDirection:"column"},directionButton:{marginRight:15,display:"flex",alignItems:"center",alignSelf:"flex-end"},fixedMobileDesktopLink:{left:0,right:0,zIndex:1,position:"fixed",transition:"bottom 1s",padding:"20px 10px 10px",boxShadow:"0 0 4px #5b4f96",justifyContent:"space-between"},close:{cursor:"pointer",textDecoration:"underline"}}),k="3677535652";t.default=function(e){var t,a=e.data,n=Object(s.b)(),k=Object(s.c)((function(e){return e.global})),C=k.mode,x=k.resume,j=k.touched,P=k.isMobile,D=k.direction,I=k.themeColor,O=Object(r.useState)(!1),L=O[0],N=O[1],z=Object(r.useState)(!1),S=z[0],B=z[1],R=Object(r.useState)(!/^data:image\/(png|gif|webp|jpe?g);base64,/.test(x.profilePicture)),T=R[0],_=R[1],F="ltr"===D,M="edit"===C,H=function(){Object(m.trackCustomEvent)({category:"Edit / Preview Button",action:"Click",label:M?"Edit -> Preview":"Preview -> Edit"}),n({type:"SET_FIELD",payload:{path:"mode",value:M?"preview":"edit"}})};return Object(r.useEffect)((function(){M&&!j&&n({type:"SET_FIELD",payload:{path:"touched",value:!0}})}),[M,j,n]),Object(r.useEffect)((function(){var e=function(){n({type:"SET_FIELD",payload:{path:"isMobile",value:window.innerWidth<767}})};return e(),window.addEventListener("resize",e),function(){window.removeEventListener("resize",e)}}),[]),Object(r.useEffect)((function(){_(!/^data:image\/(png|gif|webp|jpe?g);base64,/.test(x.profilePicture))}),[x.profilePicture]),Object(r.useEffect)((function(){if(P&&j){var e=window.setTimeout((function(){B(!0)}),1e4);return function(){e&&window.clearTimeout(e)}}}),[P,j]),Object(r.useEffect)((function(){document.getElementById("custom-theme-styles").innerHTML="\n      a,.text-primary-500, .text-secondary-500, .section-header, .contact-link, .contact-link:hover, .contact-icon {color: "+I+" !important;}\n      .section-header {border-color: "+I+" !important;}\n      .btn-secondary, .btn-secondary:hover {color: white !important; background: "+I+" !important;}\n      .bg-primary-500, .tag {background: "+I+" !important;}\n    ",Object(m.trackCustomEvent)({category:"Color Widget",action:"Change",label:"Change Color"})}),[I]),Object(r.useEffect)((function(){var e=document.getElementById("custom-direction-styles");e.innerHTML=F?"* {direction: "+D+";}":"\n        * {direction: "+D+";}\n        .section-header {border-left-width: 0 !important; border-right-width: 4px; padding-left: 0; padding-right: 10px;}\n      ",Object(m.trackCustomEvent)({category:"Direction",action:"Change",label:D.toUpperCase()})}),[D]),c.a.createElement(c.a.Fragment,null,c.a.createElement(h.a,{appearInSeconds:50}),c.a.createElement(y.a,null),P&&T&&c.a.createElement("div",{className:"bg-white",style:Object.assign({},v.fixedMobileDesktopLink,{bottom:S?0:-300})},c.a.createElement("p",{className:"mb-4"},"Desktop editing experience is better. Click ",c.a.createElement("strong",null,"Copy")," & paste the link to your pc to gain a better experience while saving the data you have already edited."),c.a.createElement("div",null,c.a.createElement(d.a,{size:"tiny",color:"violet",disabled:L,labelPosition:"right",icon:L?"checkmark":"copy",content:L?"Copied":"Copy",onClick:function(){var e=document.getElementById("copy-desktop-link");e.value=window.location.origin+"?d="+encodeURIComponent(i.Base64.encode(window.localStorage.getItem("resumakerSettings"))),e.focus(),e.select(),document.execCommand("copy"),N(!0),window.setTimeout((function(){return N(!1)}),2e3)}}),c.a.createElement("span",{className:"ml-4",style:v.close,onClick:function(){return B(!1)}},"Close"),c.a.createElement("input",{type:"text",value:"",id:"copy-desktop-link",style:{position:"fixed",bottom:-2e3,left:-1e3}}))),c.a.createElement("div",{style:v.actionsBar,className:"flex container flex-wrap items-center mx-auto bg-white py-5 pl-1"},c.a.createElement("a",{target:"_blank",className:"my-4",title:"Resumaker Logo",style:v.logoLink,rel:"noopener noreferrer",href:"https://resumaker.me"},c.a.createElement(o.a,{fixed:a.logo.childImageSharp.fixed,alt:"Resumaker Logo"})),c.a.createElement("a",{href:"https://www.producthunt.com/posts/resumaker?utm_source=badge-featured&utm_medium=badge&utm_souce=badge-resumaker",target:"_blank",style:{marginBottom:10}},c.a.createElement("img",{src:"https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=221191&theme=light",alt:"Resumaker - Create a professional resume designed by recruitment experts | Product Hunt Embed",style:(t={width:250,height:54},t.width=250,t.height=54,t)})),c.a.createElement("div",{className:"flex flex-wrap",style:v.headerRightContainer},c.a.createElement("div",{className:"flex items-center mb-4 justify-"+(P?"start":"end")},c.a.createElement(u.a,{image:!0,as:"a",circular:!0,color:"violet",style:v.directionButton,onClick:function(){return n({type:"SET_FIELD",payload:{path:"direction",value:"rtl"===D?"ltr":"rtl"}})}},c.a.createElement(l.a,{size:18,className:"ml-1 mr-2"}),"Change Direction",c.a.createElement(u.a.Detail,{style:{paddingRight:15}},D.toUpperCase())),c.a.createElement(p.a,{content:"Clear the whole document. Anything you have edited will be lost.",trigger:c.a.createElement(d.a,{circular:!0,size:"tiny",icon:"refresh",color:"violet",content:"Clear",onClick:function(){window.localStorage.clear(),window.location.reload()},labelPosition:"right"})})),c.a.createElement("div",{className:"flex flex-wrap"},!M&&c.a.createElement(d.a,{icon:"edit",color:"violet",content:"Edit",onClick:H,labelPosition:"right",style:v.actionButton}),M&&c.a.createElement(p.a,{content:"Click to enable Export",trigger:c.a.createElement(d.a,{icon:"eye",color:"violet",content:"Preview",onClick:H,labelPosition:"right",style:v.actionButton})}),c.a.createElement(g.a,{lazyLoad:!0,trigger:c.a.createElement(d.a,{color:"violet",icon:"download",content:"Export",disabled:M,labelPosition:"right",style:v.actionButton})},M?c.a.createElement(c.a.Fragment,null):c.a.createElement(g.a.Menu,null,c.a.createElement(g.a.Header,{content:"Choose Format"}),c.a.createElement(g.a.Divider,null),c.a.createElement(g.a.Item,{onClick:function(){return Object(E.a)("pdf",x.fullname,P)}},c.a.createElement(d.a,{size:"small",color:"violet",content:"PDF",icon:"file pdf",labelPosition:"right"})),c.a.createElement(g.a.Item,{onClick:function(){return Object(E.a)("png",x.fullname,P)}},c.a.createElement(d.a,{size:"small",color:"violet",content:"PNG",icon:"file image",labelPosition:"right"})),c.a.createElement(g.a.Item,null,c.a.createElement(g.a.Item,null,c.a.createElement(g.a,{lazyLoad:!0,floating:!0,trigger:c.a.createElement(d.a,{size:"small",color:"violet",content:"DOCX",icon:"file word",labelPosition:"right"})},c.a.createElement(g.a.Menu,null,c.a.createElement(g.a.Header,{content:"Choose Quality"}),c.a.createElement(g.a.Divider,null),c.a.createElement(g.a.Item,null,c.a.createElement("div",{style:v.actionsBar,className:"flex items-center",onClick:function(){return Object(E.a)("docx",x.fullname,P)}},c.a.createElement("span",null,"Low"),c.a.createElement(p.a,{size:"large",position:"top right",content:"Basic docx using Resumaker's simple algorithm",trigger:c.a.createElement(f.a,{circular:!0,size:"small",name:"question",onClick:function(e){e.preventDefault(),e.stopPropagation()}})}))),c.a.createElement(g.a.Item,null,c.a.createElement("div",{style:v.actionsBar,className:"flex items-center",onClick:function(){Object(E.a)("pdf",x.fullname,P),Object(m.trackCustomEvent)({category:"Affiliate - PDFSimpli",action:"Navigate",label:"PDFSimpli"}),window.open("https://pdfsimpli.com/lp/pdf-to-word?fpr=guy31","_blank")}},c.a.createElement("span",null,"High"),c.a.createElement(p.a,{size:"large",position:"top right",content:"We generate pdf & redirect to a professional pdf-to-docx converter",trigger:c.a.createElement(f.a,{circular:!0,size:"small",name:"question",onClick:function(e){e.preventDefault(),e.stopPropagation()}})}))))))))),c.a.createElement("div",{className:"flex items-center color-picker-container"},c.a.createElement(b.a,{initialColor:I,onChange:function(e){return n({type:"SET_FIELD",payload:{path:"themeColor",value:e}})}}),c.a.createElement(u.a,{basic:!0,color:"violet",pointing:"left"},"Customize Theme Color"))))),c.a.createElement("main",{className:"antialiased text-neutral-900 bg-neutral-100 min-h-screen sm:p-5"},c.a.createElement(w.g,{title:"Resumaker"}),c.a.createElement("div",{id:"resume",className:"container mx-auto shadow bg-white py-5 px-10"},c.a.createElement(w.d,{name:x.fullname,role:x.role,contacts:x.contact}),c.a.createElement(w.i,{data:x.summary}),c.a.createElement("div",{className:"border-b border-neutral-300 pb-2 my-5 lg:flex"},c.a.createElement("div",{className:"lg:w-2/3 lg:p"+(F?"r":"l")+"-8"},c.a.createElement(w.b,null),c.a.createElement(w.f,null)),c.a.createElement("div",{className:"lg:w-1/3 lg:p"+(F?"l":"r")+"-8 lg:border-"+(F?"l":"r")+" lg:border-neutral-300"},c.a.createElement(w.h,null),c.a.createElement(w.a,null),x.sidebar&&x.sidebar.map((function(e){return c.a.createElement(w.e,{key:e.title+"-side",data:e})})))),c.a.createElement(w.c,{social:x.social}))))}}}]);
//# sourceMappingURL=component---src-pages-il-js-fb1be6c98d5fd335ff34.js.map