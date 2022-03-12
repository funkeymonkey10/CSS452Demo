/*
* Desc: Houses functions called by the html button in index.html
* Author: Nathan Miller
*/
"use strict";

import engine from "../engine/index.js";

// The current level being run on the canvas
let curLevel = null;

var curData = null;
var fileName = null;

// Loads new level into current scene
window.loadButton = function()
{
    let userData = document.getElementById("text1").files[0];
    curData = waitPromise(userData).then(str2 => setData(str2));
    
    let userFileName = document.getElementById("text1").files[0].name;

    //console.log(userFileName);

    fileName = userFileName;
}

// Wait on fetching the content of the file.
async function waitPromise(file)
{
    let done = Promise.resolve(file.text());
    let strR = await done;
    return engine.json.parseJSON(strR);
}

// Call the save function from file parser in current scene
window.saveButton = function()
{
    curLevel.fileParse.saveCurrentFile();
}

// Closes or opens a new game viewport in scene
window.runButton = function()
{
    curLevel.isRunning = !curLevel.isRunning;
    if(curLevel.isRunning == false)
    {
        curLevel.reloadScene();
    }
}

// Sets the current level
function setLevel(level)
{
    curLevel = level;
}

// Waits for promise to fullfilled in order to reboot scene
function setData(data)
{
    curData = data;
    curLevel.restartScene();
}
function getData(){ return curData;}
function getFileName() {return fileName;}

export default {setLevel, getData, getFileName}