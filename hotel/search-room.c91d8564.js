var e="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},o={},t={},l=e.parcelRequire09c4;null==l&&((l=function(e){if(e in o)return o[e].exports;if(e in t){var l=t[e];delete t[e];var r={id:e,exports:{}};return o[e]=r,l.call(r.exports,r,r.exports),r.exports}var n=new Error("Cannot find module '"+e+"'");throw n.code="MODULE_NOT_FOUND",n}).register=function(e,o){t[e]=o},e.parcelRequire09c4=l),l("br8rC"),l("aRUAV"),l("lb51t"),l("em40x"),l("dsB7R"),l("5mE0K"),l("fhU2V");var r=l("4zzs5"),n=l("jQi3L");n.default(document.querySelectorAll(".room-cards__button"),(function(e){let o=document.querySelector(".side-bar");if(o.classList.toggle("side-bar_active"),o.classList.contains("side-bar_active")){document.body.style.overflow="hidden";let e=document.createElement("div");e.classList.add("mask","mask_full"),document.querySelector(".page").append(e),n.default(document.querySelectorAll(".mask"),r.handleMaskClick)}else{document.body.style.overflow="auto",document.querySelector(".mask").remove()}})),l("3onEU"),l("bHp7M");