// ==UserScript==
// @name         Facebook Toggle Most Recent / Normal + Fancy White Theme (Standaard breedte geen wijziging)
// @namespace    https://tampermonkey.net/
// @version      1.4
// @description  Wissel tussen normale en meest recente Facebook feed met fancy witte styling zonder vastgezette breedte.
// @match        *://*.facebook.com/*
// @grant        GM_addStyle
// @run-at       document-idle
// ==/UserScript==
(function() {
  'use strict';
  // Voeg fancy white theme CSS toe zonder breedte aanpassing voor feed container
  GM_addStyle(`
    body, #pagelet_composer, #contentArea {
      background-color: #ffffff !important;
      color: #1a1a1a !important;
      scroll-behavior: smooth;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
                Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
    }
    [data-pagelet*="FeedUnit"], .story_body_container, .userContentWrapper, [role="feed"] > * {
      background: rgba(255, 255, 255, 0.7);
      border-radius: 15px;
      box-shadow:
        0 0 15px 2px rgba(100, 149, 237, 0.2),
        inset 0 0 12px 0 rgba(255, 255, 255, 0.9);
      backdrop-filter: saturate(2) blur(10px);
      -webkit-backdrop-filter: saturate(2) blur(10px);
      padding: 16px;
      margin-bottom: 12px;
      transition: box-shadow 0.3s ease, background 0.3s ease;
      color: #222;
    }
    [data-pagelet*="FeedUnit"]:hover, .story_body_container:hover, .userContentWrapper:hover, [role="feed"] > *:hover {
      box-shadow:
        0 0 22px 5px rgba(100, 149, 237, 0.6),
        inset 0 0 18px 0 rgba(100, 149, 237, 0.5);
      background: rgba(245, 250, 255, 0.2);
    }
    button, ._4jy0, ._42ft {
      border-radius: 14px !important;
      box-shadow: 0 0 10px 2px rgba(100, 149, 237, 0.4);
      transition: background-color 0.3s ease;
      color: #333 !important;
    }
    button:hover, ._4jy0:hover, ._42ft:hover {
      background-color: rgba(100, 149, 237, 0.25) !important;
      box-shadow: 0 0 20px 6px rgba(100, 149, 237, 0.7);
    }
    [aria-label="Sponsored"] {
      display: none !important;
    }
    #toggle-feed-btn {
      position: fixed;
      top: 70px;
      right: 15px;
      z-index: 9999999;
      background: #6495ed;
      color: white;
      padding: 8px 14px;
      font-weight: bold;
      border-radius: 10px;
      cursor: pointer;
      user-select: none;
      box-shadow: 0 0 10px rgba(100, 149, 237, 0.7);
      transition: background-color 0.3s ease;
    }
    #toggle-feed-btn:hover {
      background-color: #4178d1;
    }
  `);
  // Voeg knop toe om tussen feeds te wisselen
  function addToggleButton() {
    if (document.getElementById('toggle-feed-btn')) return;
    const btn = document.createElement('button');
    btn.id = 'toggle-feed-btn';
    const urlParams = new URLSearchParams(window.location.search);
    const isMostRecent = urlParams.get('sk') === 'h_chr';
    btn.textContent = isMostRecent ? 'Schakel naar Normale Feed' : 'Schakel naar Meest Recent';
    btn.onclick = () => {
      const baseUrl = window.location.origin + window.location.pathname;
      if (isMostRecent) {
        window.location.href = baseUrl;
      } else {
        window.location.href = baseUrl + '?filter=all&sk=h_chr';
      }
    };
    if (document.body) {
      document.body.appendChild(btn);
    } else {
      new MutationObserver((m, obs) => {
        if (document.body) {
          document.body.appendChild(btn);
          obs.disconnect();
        }
      }).observe(document.documentElement, { childList: true });
    }
  }
  window.addEventListener('load', () => {
    setTimeout(addToggleButton, 2000);
  });
})();
