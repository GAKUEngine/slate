---
title: GAKU Engine API Reference

language_tabs:
  - shell
  - json
  - ruby
  - cpp

toc_footers:
  - <a href='http://www.gakuengine.com'>GAKU Engine</a>
  - <a href='https://github.com/GAKUEngine/gaku'>GAKU Engine on GitHub</a>
  - <a href='https://github.com/GAKUEngine/manabu'>Manabu Ruby Client on GitHub</a>
  - <a href='https://github.com/GAKUEngine/manabu-desktop'>Manabu-Desktop Ruby + GTK Client on GitHub</a>
  - <a href='https://github.com/lord/slate'>Documentation Powered by Slate</a>

includes:
  - clients
  - authentication
  - roles
  - users
  - students
  - enrollment_statuses
  - contact_types
  - courses
  - course
  - syllabuses
  - errors


search: true
---

:GAKUEngine: Introduction
=========================
The GAKU Engine API comes standard with any install of GAKU Engine, though it may be disabled
by removing the "gaku-api" gem from your Gemfile. All calls to the API other than the 'status'
call require authentication.  
  
There are two official client libraries/modules available from the GAKU Engine team. These are:  
:学君: [Manabu](https://github.com/GAKUEngine/manabu): A pure Ruby implementation that is 
developed in parity with the GAKU Engine API.  
:学君: [libmanabu](https://github.com/GAKUEngine/libmanabu): A portable C++ re-implementation 
of Manabu with several native interfaces to different languages.  

<aside class="notice">A pure JavaScript implementation may be provided in the future if there is enough demand.</aside>

Protocols
---------
The GAKU Engine API can be accessed with either [MessagePack](https://msgpack.org/) or JSON.
We highly recommend you use MessagePack as a lot of data from the API can be quite extensive
and MessagePack does a significantly better job of transporting this data quickly.
