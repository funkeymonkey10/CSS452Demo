/*
 * File: json.js
 *
 * logics for loading an json file into the resource_map
 */
"use strict";

import * as map from "../core/resource_map.js";
// functions from resource_map
let unload = map.unload;
let has = map.has;
let get = map.get;

// Takes promise and decodes into text
function decodeJSON(data) 
{
    //console.log(data);
    return data.text();
}

// Takes text and parses it with JSON
function parseJSON(text)
{
    //console.log(text);
    return JSON.parse(text);
}

// Loads a path 
function load(path)
{
    return map.loadDecodeParse(path, decodeJSON, parseJSON);
}

export{has, get, load, unload, parseJSON}