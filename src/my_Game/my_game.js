"use strict";  // Operate in Strict mode such that variables must be declared before used!

import engine from "../engine/index.js";
import SceneFileParser from "./util/scene_file_parser.js";
import button from "../engine/buttons.js";
import EngineEditor from "./util/engine_edtior.js";

class MyGame extends engine.Scene {
    constructor() {
        super();

        // The camera to view the scene
        this.mCamera = null;
        this.mGameCamera = null;

        this.fileParse = null;

        this.mSceneFile = "assets/scene.json";

        this.gameObjects = [];
        this.myGameObject = null;

        this.editorSelectObject = null;
        this.engineEditor = null;
        this.isScale = false;
        this.isRunning = false;
        this.parsePlace = 0;
    }

    load()
    {
        if(button.getFileName() != null)
        {
            this.mSceneFile = button.getData();
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
        
        //first selected object in array
        this.editorSelectObject = this.gameObjects[0];

        this.engineEditor = new EngineEditor(this.mCamera,  this.fileParse);
        this.engineEditor.setEditorSelectObject(this.editorSelectObject);
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
        if(engine.input.isKeyClicked(engine.input.keys.Ctrl))
        {
            this.isScale = !this.isScale;
        }

        if(this.isRunning == true)
        {
            for(let i = 0; i < this.gameObjects.length; i++)
            {
                if(this.gameObjects[i].getComponents()[0] == "Hero")
                {
                    this.HeroMove(this.gameObjects[i]);
                }
            }
        }

        if(this.isScale == true)
        {
            let change = this.engineEditor.checkAxisScale();
            if(this.isRunning == false && change)
            {
                this.engineEditor.saveObjParse();
            }
        }
        else
        {
            let change = this.engineEditor.checkAxisMovement();
            if(this.isRunning == false && change)
            {
                this.engineEditor.saveObjParse();
            }
        }
        this.mCamera = this.engineEditor.editorCameraMovement();
        for(let i = 0; i < this.gameObjects.length; i++)
        {
            this.gameObjects[i].update();
            // Changing editor object on left mouse
            if(engine.input.isButtonClicked(engine.input.eMouseButton.eLeft) &&
            this.checkMouseBounds(this.gameObjects[i]))
            {
                this.editorSelectObject = this.gameObjects[i];
                this.engineEditor.setEditorSelectObject(this.editorSelectObject);
                this.parsePlace = i;
                
                this.engineEditor.setParsePlace(this.parsePlace);
            }
        }
    }

    HeroMove(gameObj)
    {
        let xform = gameObj.getXform();

        // Move hero object
        if(engine.input.isKeyPressed(engine.input.keys.W))
        {
            xform.setYPos(xform.getYPos() + 0.1);
        }
        if(engine.input.isKeyPressed(engine.input.keys.S))
        {
            xform.setYPos(xform.getYPos() - 0.1);
        }
        if(engine.input.isKeyPressed(engine.input.keys.A))
        {
            xform.setXPos(xform.getXPos() - 0.1);
        }
        if(engine.input.isKeyPressed(engine.input.keys.D))
        {
            xform.setXPos(xform.getXPos() + 0.1);
        }

        for(let i = 0; i < this.gameObjects.length; i++)
        {
            if(i != 2 && gameObj.getBBox().intersectsBound(
                this.gameObjects[i].getBBox()))
            {
                this.restartScene();
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

    reloadScene()
    {
        this.gameObjects = [];
        this.fileParse.parseObjectJSON(this.gameObjects);
        
        //first selected object in array
        this.editorSelectObject = this.gameObjects[0];
        this.engineEditor.setEditorSelectObject(this.editorSelectObject);
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
