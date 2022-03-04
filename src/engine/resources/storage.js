
"use strict";

import * as map from "../core/resource_map.js";

let has = map.has;
let get = map.get;

function setVar(path, levelVar)
{
    map.loadRequested(path);
    map.set(path, levelVar);
}

function hasVar(path)
{
    return map.has(path);
}

function getVar(path)
{
    return map.get(path);
}

export{has, get, getVar, setVar, hasVar}