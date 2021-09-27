---
title: My Journey in crypto
date: 2021-09-27
excerpt: Bla-bla
slug: my-journey-in-crypto
tags: crypto tech
---

Express is currently, and for many years, the de-facto library in the Node.js ecosystem. When you are looking for any tutorial to learn Node, Express is presented and taught to people.

[In the latest State of JS survey, Express was TOP 1 for all categories.](https://2020.stateofjs.com/en-US/technologies/back-end-frameworks/)

![State of JS 2020 Results](https://dev-to-uploads.s3.amazonaws.com/i/ixbd22gaeo9h00fqp70p.png)

**Despite all of this, Express is not a great technology, and you should have stopped using it since 2015.**

## It is unmaintained

**Express has not been updated for years**, and [its next version has been in alpha for 6 years](https://www.npmjs.com/package/express/v/5.0.0-alpha.2).

People may think it is not updated because the API is stable and does not need change. The reality is: **Express does not know how to handle `async/await`**.

{% twitter 1349459574038921216 %}

If you are using `async/await` code inside your route's handler or middleware, you are prone to `UnhandledPromiseRejectionWarning` exception. Express will not handle those exceptions for you because it does not know them.

There are multiple issues ([#4360](https://github.com/expressjs/express/issues/4360), [#4348](https://github.com/expressjs/express/issues/4348), ...) in Express' repository about people having this problem.

You should know that from Node 15, your application will crash when encountering this exception, and before this version, you will have a memory leak.

When using `async/await`, you should always ensure that the library accepts an `AsyncFunction` as a callback. Here is a great talk named [Broken Promises](https://www.youtube.com/watch?v=e3Nh350b6S4) about that.

## It is a low-scope framework

The word "framework" is a wild term. When you are looking closer, Express is a routing library that supports middleware, but it is still called "a framework".

[Evan You had a great talk](https://www.youtube.com/watch?v=ANtSWq-zI0s) about seeking the balance in a framework design. He said that we should categorize a framework by its scope.

**We can categorize Express as a low-scope framework.**

When you are building an application, you need more features than a routing system.

You need to:

- access a database;
- validate your data;
- create an authentication layer;
- create an authorization system;
- etc.

All of those features are not inside Express and should be glued by yourself.

{% twitter 1303960769982332928 %}

Gluing those modules yourself means taking all the risk to add memory leaks, security holes, and bugs to your application. On top of that, you are only losing time and money because you should not be the one responsible for doing that.

## Alternatives

What are the alternatives? What should we teach to people?

Even if I believe low-scope framework should not be used, there are few people that like this style or need one for learning purposes. In this category, you should look at [fastify](https://www.fastify.io/).

This framework is well maintained, and provides an [official compatibility layer for Express](https://github.com/fastify/fastify-express) to help you migrate your application.

If you prefer to have a high-scope fully-featured framework that lets you focus on your business logic, you can use [AdonisJS](https://adonisjs.com/).

There is no reason to stay with Express, only future pain that you can avoid today.

## Do I hate Express?

The goal of this section is to add a disclaimer to this article. I am not hating Express. I am sharing my perspective to help others make informed decisions and not follow the herd.

Express was one of the first frameworks in the Node.js ecosystem, and it was great for many years! But now, it is time to let it go.

I want to push the Node.js Ecosystem further and help newcomers to learn a technology that will not explode in their hands.
