---
title: Vue.js 基礎觀念與指令介紹
date: 2024-08-07 16:16:41
categories: Vue.js 介紹
tags: "Vue"
---

Vue.js 是一個漸進式的 JavaScript 框架，主要用於構建用戶界面。它的設計理念是讓開發者可以逐步採用 Vue 的功能，從簡單的單一文件元件（Single File Components）開始，到更複雜的應用程序架構。Vue.js 提供了強大的指令（Directives）系統，這些指令能幫助我們高效地綁定數據和 DOM 元素，從而讓開發過程更加便捷和靈活。這篇文章將介紹 Vue.js 的幾個基本指令，幫助你快速上手這個強大的框架。

## v-model

v-model 是 Vue.js 的雙向數據綁定指令，通常用於表單輸入控件(如 input 或 textarea 和 select)。他可以自動更新數據和用戶介面，使開發者能夠更輕鬆的管理數據。

```HTML
    <input v-model="message", placeholder="輸入文字" type="text">
    <p>{{ message }}</p>
```
這樣當輸入框中的值改變時，`message` 的值也會相應改變。

## Mustache 語法: `{{}}`

雙大括號 {{}} 用於插值綁定，可以在模板中顯示數據。這裡可以使用 JavaScript 表達式，但只限於單一表達式，例如變數、運算和三元運算符。不能使用陳述句、函數定義或多個表達式。

```HTML
    <p>{{ message }}</p>
```
在這個例子中，`message` 的值會顯示在 `<p>` 標籤中。

## v-on 

`v-on` 用於綁定事件監聽器到 DOM 元素。可以簡化成 `@`。

```HTML
    <button v-on:click="showAlert">點擊我</button>
    <!-- 簡化語法 -->
    <button @click="showAlert">點擊我</button>
```
```JavaScript
    <script setup>
        const showAlert = () => alert("點了");
    </script>
```

## v-bind

`v-bind` 用於綁定元素的屬性，動態更新屬性值。可以簡化為 `:`

```HTML
    <img v-bind:src="imageUrl">
    <!-- 簡化語法 -->
    <img :src="imageUrl">
```

## v-for

`v-for` 指令用於迭代數據集合，並渲染集合中的每一項。
`v-for` 更像 `for...of` 和 `for...in`，因為它可以用於遍歷數組和對象。然而，`v-for` 主要用於 Vue.js 模板中來進行數據綁定和渲染，而 `for...of` 和 `for...in` 則用於 JavaScript 腳本中進行數據操作。以下是例子比較

v-for
```HTML
```