// ==UserScript==
// @name         Fuck Redirect Review
// @namespace    http://tampermonkey.net/
// @version      1.0
// @create       2023-09-21
// @update       2023-09-21
// @description  Redirect some links to non-original URLs, decode the target parameters, and automatically redirect to the destination link.
// @author       QuentinHsu
// @match        *://link.juejin.cn/*
// @match        *://c.pc.qq.com/*
// @match        *://afdian.net/*
// ==/UserScript==
;(function () {
  'use strict'

  const { hostname, search } = window.location
  const targets = {
    'link.juejin.cn': 'target',
    'c.pc.qq.com': 'pfurl',
    'afdian.net': 'target',
  }

  const urlParams = new URLSearchParams(search)
  const target = urlParams.get(targets[hostname])

  if (target) {
    window.location.href = decodeURIComponent(target)
  }
})()
