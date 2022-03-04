"use strict";  // Operate in Strict mode such that variables must be declared before used!

import engine from "../engine/index.js";
import SceneFileParser from "./util/scene_file_parser.js";
import button from "../engine/buttons.js";
import { eMouseButton } from "../engine/input.js";

class MyGame extends engine.Scene {
    constructor() {
        super();

        // The camera to view the scene
        this.mCamera = null;
        this.mGameCamera = null;

        this.fileParse = null;

        this.mSceneFile = "assets/scene.json";

        this.isRunning = false;

        this.gameObjects = [];

        this.editorSelectObject = null;

        this.myGameObject = null;
    }

    load()
    {
        if(button.getFileName() != null)
        {
            this.mSceneFile =
            button.getData();
        }
        else
        {
            engine.json.load(this.mSceneFile);
        }
    }

    unload()
    {
        if(button.getFileName() == null)
        {
            engine.json.unload(this.mSceneFile);
        }
    }
        
    init() 
    {
        if(button.getFileName() != null)
        {
            this.fileParse = new SceneFileParser(this.mSceneFile);
        }
        else
        {
            this.fileParse = new SceneFileParser(engine.json.get(this.mSceneFile));
        }

        // Step A: set up the cameras
        this.mCamera = new engine.Camera(
            vec2.fromValues(0, 0), // position of the camera
            20,                       // width of camera
            [0, 0, 340, 350]           // viewport (orgX, orgY, width, height)
        );
        this.mGameCamera = new engine.Camera(
            vec2.fromValues(0, 0), // position of the camera
            20,                       // width of camera
            [340, 0, 340, 350]           // viewport (orgX, orgY, width, height)
        );
        this.mCamera.setBackgroundColor([0.8, 0.8, 0.8, 1]);
        this.mGameCamera.setBackgroundColor([0.75, 0.75, 0.75, 1]);

        this.fileParse.parseObjectJSON(this.gameObjects);
        
        //test only
        this.editorSelectObject = this.gameObjects[0];
        console.log(this.editorSelectObject);
    }
    
    // This is the draw function, make sure to setup proper drawing environment, and more
    // importantly, make sure to _NOT_ change any state.
    draw()
    {
        // Step A: clear the canvas
        engine.clearCanvas([0.9, 0.9, 0.9, 1.0]); // clear to light gray
    
        this.mCamera.setViewAndCameraMatrix();

        // Gameobjects for editor cam
        for(let i = 0; i < this.gameObjects.length; i++)
        {
            this.gameObjects[i].draw(this.mCamera);
            this.editorSelectObject.drawAxis(this.mCamera);
        }

        if(this.isRunning == true)
        {
            this.mGameCamera.setViewAndCameraMatrix();
            for(let i = 0; i < this.gameObjects.length; i++)
            {
                this.gameObjects[i].draw(this.mGameCamera);
            }
        }
    }
    
    // The Update function, updates the application state. Make sure to _NOT_ draw
    // anything from this function!
    update ()
    {
        for(let i = 0; i < this.gameObjects.length; i++)
        {
            if(engine.input.isButtonPressed(engine.input.eMouseButton.eLeft) &&
            this.checkMouseBounds(this.gameObjects[i]))
            {
                this.editorSelectObject = this.gameObjects[i];
                this.editorSelectObject.getXform().getPosition();
            }
        }
    }

    checkMouseBounds(gameObject)
    {
        // Check mouse position with object bounds
        if(this.mCamera.mouseWCX() < gameObject.getXform().getXPos() +
            gameObject.getXform().getWidth() /2 && 
            this.mCamera.mouseWCX() > gameObject.getXform().getXPos() -
            gameObject.getXform().getWidth() /2 &&
            this.mCamera.mouseWCY() < gameObject.getXform().getYPos() +
            gameObject.getXform().getHeight() /2 && 
            this.mCamera.mouseWCY() > gameObject.getXform().getYPos() -
            gameObject.getXform().getHeight() /2)
        {
            return true;
        }
        return false;
    }

    restartScene()
    {
        super.next();
        super.start();
        this.gameObjects = [];
    }
}

window.onload = function () {
    engine.init("GLCanvas");

    let myGame = new MyGame();
    myGame.start();

    // Gives reference to the current level
    button.setLevel(myGame);
}
