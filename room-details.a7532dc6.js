function e(e,t,n,r){Object.defineProperty(e,t,{get:n,set:r,enumerable:!0,configurable:!0})}var t="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},n={},r={},i=t.parcelRequire09c4;null==i&&((i=function(e){if(e in n)return n[e].exports;if(e in r){var t=r[e];delete r[e];var i={id:e,exports:{}};return n[e]=i,t.call(i.exports,i,i.exports),i.exports}var o=new Error("Cannot find module '"+e+"'");throw o.code="MODULE_NOT_FOUND",o}).register=function(e,t){r[e]=t},t.parcelRequire09c4=i),i.register("hiS83",(function(e,t){i("5KEDp"),i("giQmR")})),i.register("5KEDp",(function(e,t){})),i.register("giQmR",(function(e,t){var n=i("jQi3L"),r=i("kdk9J"),o=i("8AOl9");const l=e=>{let t=r.findParent(e,"likes");o.changeAppearance(t,"likes_active");let n=r.findElement(e,"likes","likes__counter");o.changeAppearance(n,"likes__counter_active")};n.default(document.querySelectorAll(".likes__btn"),(e=>{let t=r.findParent(e.currentTarget,"likes");l(t);let n=r.findElement(e.currentTarget,"likes","likes__counter"),i=o.getCounterValue(n);e.currentTarget.checked?o.updateCounterValue(n,i+1):o.updateCounterValue(n,i-1)}),"change"),document.querySelectorAll(".likes__btn").forEach((e=>{e.checked&&l(e)}))})),i.register("hfraY",(function(e,t){})),i.register("i04f5",(function(e,t){})),i.register("2ihF2",(function(e,t){var n=i("h8ZSu");i("lb51t");var r=i("8AOl9"),o=i("2tcP0"),l=i("3W93W"),a=i("kdk9J"),c=i("jQi3L");const d=e=>e.slice(6,10)+"-"+e.slice(3,5)+"-"+e.slice(0,2),u=e=>e.length>3?e.slice(0,e.length-3)+" "+e.slice(e.length-3):e,g=e=>e>1?" суток":" сутки",s=()=>{let e=S.querySelectorAll(".counter__display"),t=0;return e.forEach(((e,n)=>{2!==n&&(t+=+e.innerText)})),t},f=()=>{let e=x*m;T.innerText=u(e.toString());let t=e-w+q+D;C.innerText=u(t.toString())};let p={container:".booking-card__date-dropdown",dateFormat:"dd.MM.yyyy",view:"days",range:!0,dynamicRange:!0,multipleDates:2,multipleDatesSeparator:" - ",minDate:new Date,navTitles:{days:"<strong>MMMM yyyy</strong>"},buttons:[{content:"Очистить",onClick(e){let t=a.findParent(e.$datepicker,"date-dropdown"),n=a.findChildren(t,"text-field");r.clearTextFields(n),e.clear()}},{content(e){let t=e.$datepicker;return setTimeout((()=>{let n=a.findChildren(t,"air-datepicker-button")[1];e.selectedDates.length||r.toggleState(n),n.type="button",n.previousElementSibling.type="button"})),"Применить"},onClick(e){2===e.selectedDates.length&&(m=(_.selectedDates[1].getTime()-_.selectedDates[0].getTime())/864e5,h.innerText=m+g(m),f(),e.hide())}}],onSelect({datepicker:e,formattedDate:t}){o.toggleButtonStateApply(e),l.writeDate(e,t)},onHide(e){if(!e){let e=document.querySelector(p.container),t=a.findChild(e,"text-field").nextElementSibling;r.changeAppearance(t,"text-field_active")}}},_=new n.default("#to",p),y=document.querySelector(p.container),k=y.querySelectorAll(".text-field"),b=new Date(d(k[0].value)),m=(new Date(d(k[1].value)).getTime()-b.getTime())/864e5,S=a.findParent(y,"booking-card"),h=S.querySelector(".booking-card__number-of-days");h.innerText=m+g(m);let x=S.querySelector(".basicInfoAboutRoom__price").innerText;x=+x.replace(" ","");let v=x*m,T=S.querySelector(".bookung-card__right > .booking-card__price");T.innerText=u(v.toString());let w=S.querySelector(".booking-card__discount > .booking-card__price").innerText;w=+w.replace(" ","");let q=S.querySelector(".booking-card__serviceCharge > .booking-card__price").innerText;q=+q.replace(" ","");let D=S.querySelector(".booking-card__additionalServiceCharge > .booking-card__price").innerText;D=+D.replace(" ","");let A=v-w+q+D,C=S.querySelector(".booking-card__bottom .booking-card__price");C.innerText=u(A.toString());let E=x/s();c.default([S.querySelector(".dropdown__button-apply")],(function(){if(2!==_.selectedDates.length)return;let e=s();x=E*e,S.querySelector(".basicInfoAboutRoom__price").innerText=x,S.querySelector(".booking-card__formula > .booking-card__price").innerText=x,f()}))})),i.register("3W93W",(function(t,n){e(t.exports,"writeDate",(function(){return d})),e(t.exports,"settings",(function(){return u})),e(t.exports,"makeHandlerOnHide",(function(){return g}));var r=i("h8ZSu"),o=i("jQi3L"),l=i("kdk9J"),a=i("8AOl9"),c=i("2tcP0");i("dVUgJ");const d=(e,t)=>{let n=l.findParent(e.$datepicker,"date-dropdown"),r=l.findChildren(n,"text-field");switch(t.length){case 1:return r[0].value=t[0],void(r[1].value="");case 2:return r[0].value=t[0],void(r[1].value=t[1])}};let u={...c.defaultSettings};u.buttons[0]={content:"Очистить",onClick(e){let t=l.findParent(e.$datepicker,"date-dropdown"),n=l.findChildren(t,"text-field");a.clearTextFields(n),e.clear()}},u.container=".date-dropdown",u.onSelect=({datepicker:e,formattedDate:t})=>{c.toggleButtonStateApply(e),d(e,t)},u.onShow=e=>{if(!e){let e=document.activeElement.nextElementSibling;a.changeAppearance(e,"text-field_active")}};const g=e=>t=>{if(!t){let t=document.querySelector(e),n=l.findChild(t,"text-field").nextElementSibling;a.changeAppearance(n,"text-field_active")}};u.onHide=g(u.container),u.dateFormat="dd.MM.yyyy",new r.default("#to",u);o.default(document.querySelectorAll(".date-dropdown__wrap > .text-field[name=date-to]"),(e=>{e.currentTarget.previousElementSibling.focus()}),"focus")}));