"use strict";(self["webpackChunkhello"]=self["webpackChunkhello"]||[]).push([[132],{580:function(t,e,a){a.r(e),a.d(e,{default:function(){return f}});var s=function(){var t=this,e=t._self._c;return e("div",{ref:"main",staticClass:"main"},[e("div",{staticClass:"header"},[e("span",{staticClass:"i",on:{click:function(e){return t.$router.back()}}},[e("van-icon",{attrs:{name:"arrow-left"}})],1),e("span",[t._v(t._s(t.$route.params.filmName))]),e("span",[e("van-icon",{attrs:{name:"search",size:"22",color:"black"}})],1)]),t.showCinemas.length?e("van-tabs",{attrs:{swipeable:"","title-active-color":"green"}},t._l(t.dateList,(function(a,s){return e("van-tab",{key:s,attrs:{title:a}},[e("CinemaList",{attrs:{name:a,isInclude:t.showCinemas[s],height:t.getCinemaListHeight()}},[e("div",[e("div",{staticClass:"tab"},[t._v("全城"),e("van-icon",{attrs:{name:"arrow-down",size:"10px"}})],1),e("div",{staticClass:"tab"},[t._v("最近去过"),e("van-icon",{attrs:{name:"arrow-down",size:"10px"}})],1)])])],1)})),1):t._e()],1)},n=[],i=(a(3307),a(1392)),o=(a(2741),a(342)),r=(a(2314),a(7152)),l=a(8430),m=a(3123),c=(a(381),a(1749)),h=a.n(c),u={components:{[r.Z.name]:r.Z,[o.Z.name]:o.Z,[i.Z.name]:i.Z,CinemaList:m.Z},data(){return{showCinemas:[],dateList:[]}},mounted(){(0,l.Z)({url:`/gateway/?filmId=${this.$route.params.myID}&cityId=${this.$store.state.cityId}&k=1035572`,headers:{"X-Host":"mall.film-ticket.cinema.film-show-cinema"}}).then((t=>{this.showCinemas=t.data.data.showCinemas.sort(((t,e)=>t.showDate-e.showDate)),this.dateList=this.Calculation()}))},methods:{getCinemaListHeight(){const t=document.documentElement,e=parseInt(getComputedStyle(t).fontSize);return this.height=window.innerHeight-3.0625*e-2.875*e+"px"},Calculation(){return this.showCinemas.map((t=>h()(1e3*t.showDate,["week","month","day"])))}}},d=u,w=a(1001),C=(0,w.Z)(d,s,n,!1,null,"6322f59c",null),f=C.exports}}]);
//# sourceMappingURL=132.04e584d8.js.map