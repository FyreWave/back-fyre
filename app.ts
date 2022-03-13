
import instance = require("./backend/instance");

const $ = instance();

$.initializeTypescript(__filename);

$.on.expressInit((next) => {
    const express = require("express");
    const folder = $.path.storage();

    $.app!.use("", express.static(folder));
    next();
});
$.boot();

// END File
