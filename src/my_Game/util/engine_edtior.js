"use strict";

import engine from "../../engine/index.js";

class EngineEditor
{
    constructor(editorCamera, fileParse)
    {
        this.mCamera = editorCamera;
        this.fileParse = fileParse;
        this.editorSelectObject = null;

        this.isHorizontalGrabbed = false;
        this.isVerticalGrabbed = false;
        this.lastMousePos = [0, 0];
        this.parsePlace = 0;
    }

    saveObjParse()
    {
        this.fileParse.saveRenderable(this.editorSelectObject, 
            this.parsePlace);
    }

    checkAxisScale()
    {
        var xform = this.editorSelectObject.getXform();

        //check to see if mouse is close to clicking x axis
        if(engine.input.isButtonPressed(engine.input.eMouseButton.eLeft) &&
        (xform.getXPos() + 5 > this.mCamera.mouseWCX() && 
        xform.getXPos() <= this.mCamera.mouseWCX())
        && (xform.getYPos() + 0.5 > this.mCamera.mouseWCY() && 
        xform.getYPos() - 0.5 <= this.mCamera.mouseWCY()))
        {
            if(this.isHorizontalGrabbed == false)
            {
                this.isHorizontalGrabbed = true;
                this.isVerticalGrabbed = false;
                this.lastMousePos[0] = this.mCamera.mouseWCX();
                this.lastMousePos[1] = this.mCamera.mouseWCY();
            }
            else
            {
                xform.setWidth( xform.getWidth() + (this.mCamera.mouseWCX() - this.lastMousePos[0]));
                this.lastMousePos[0] = this.mCamera.mouseWCX();
                this.lastMousePos[1] = this.mCamera.mouseWCY();
                return true;
            }
        }

        //checks to see if object is already being dragged across x axis
        else if(engine.input.isButtonPressed(engine.input.eMouseButton.eLeft) && 
        this.isHorizontalGrabbed == true)
        {
            xform.setWidth( xform.getWidth() + (this.mCamera.mouseWCX() - this.lastMousePos[0]));
            this.lastMousePos[0] = this.mCamera.mouseWCX();
            this.lastMousePos[1] = this.mCamera.mouseWCY();
            return true;
        }

        //check to see if mouse is close to clicking y axis
        else if(engine.input.isButtonPressed(engine.input.eMouseButton.eLeft) &&
        (xform.getYPos() + 5 > this.mCamera.mouseWCY() && xform.getYPos() <= 
        this.mCamera.mouseWCY())
        && (xform.getXPos() + 0.5 > this.mCamera.mouseWCX() && 
        xform.getXPos() - 0.5 <= this.mCamera.mouseWCX()))
        {
            if(this.isVerticalGrabbed == false)
            {
                this.isHorizontalGrabbed = false;
                this.isVerticalGrabbed = true;
                this.lastMousePos[0] = this.mCamera.mouseWCX();
                this.lastMousePos[1] = this.mCamera.mouseWCY();
            }
            else
            {
                xform.setHeight( xform.getHeight() + (this.mCamera.mouseWCY() - this.lastMousePos[1]));
                this.lastMousePos[0] = this.mCamera.mouseWCX();
                this.lastMousePos[1] = this.mCamera.mouseWCY();
                return true;
            }
        }

        //checks to see if object is already being dragged across y axis
        else if(engine.input.isButtonPressed(engine.input.eMouseButton.eLeft) && 
        this.isVerticalGrabbed == true)
        {
            xform.setHeight( xform.getHeight() + (this.mCamera.mouseWCY() - this.lastMousePos[1]));
            this.lastMousePos[0] = this.mCamera.mouseWCX();
            this.lastMousePos[1] = this.mCamera.mouseWCY();
            return true;
        }
        //nothing being grabbed
        else
        {
            this.isHorizontalGrabbed = false;
            this.isVerticalGrabbed = false;
        }
        return false;
    }

    checkAxisMovement()
    {
        var xform = this.editorSelectObject.getXform();

        //check to see if mouse is close to clicking x axis
        if(engine.input.isButtonPressed(engine.input.eMouseButton.eLeft) &&
        (xform.getXPos() + 5 > this.mCamera.mouseWCX() && 
        xform.getXPos() <= this.mCamera.mouseWCX())
        && (xform.getYPos() + 0.5 > this.mCamera.mouseWCY() && 
        xform.getYPos() - 0.5 <= this.mCamera.mouseWCY()))
        {
            if(this.isHorizontalGrabbed == false)
            {
                this.isHorizontalGrabbed = true;
                this.isVerticalGrabbed = false;
                this.lastMousePos[0] = this.mCamera.mouseWCX();
                this.lastMousePos[1] = this.mCamera.mouseWCY();
            }
            else
            {
                xform.setXPos(xform.getXPos() + (this.mCamera.mouseWCX() - 
                this.lastMousePos[0]));
                this.lastMousePos[0] = this.mCamera.mouseWCX();
                this.lastMousePos[1] = this.mCamera.mouseWCY();
                return true;
            }
        }

        //checks to see if object is already being dragged across x axis
        else if(engine.input.isButtonPressed(engine.input.eMouseButton.eLeft) && 
        this.isHorizontalGrabbed == true)
        {
            xform.setXPos(xform.getXPos() + (this.mCamera.mouseWCX() - this.lastMousePos[0]));
            this.lastMousePos[0] = this.mCamera.mouseWCX();
            this.lastMousePos[1] = this.mCamera.mouseWCY();
            return true;
        }

        //check to see if mouse is close to clicking y axis
        else if(engine.input.isButtonPressed(engine.input.eMouseButton.eLeft) &&
        (xform.getYPos() + 5 > this.mCamera.mouseWCY() && xform.getYPos() <= 
        this.mCamera.mouseWCY())
        && (xform.getXPos() + 0.5 > this.mCamera.mouseWCX() && 
        xform.getXPos() - 0.5 <= this.mCamera.mouseWCX()))
        {
            if(this.isVerticalGrabbed == false)
            {
                this.isHorizontalGrabbed = false;
                this.isVerticalGrabbed = true;
                this.lastMousePos[0] = this.mCamera.mouseWCX();
                this.lastMousePos[1] = this.mCamera.mouseWCY();
            }
            else
            {
                xform.setYPos(xform.getYPos() + (this.mCamera.mouseWCY() - this.lastMousePos[1]));
                this.lastMousePos[0] = this.mCamera.mouseWCX();
                this.lastMousePos[1] = this.mCamera.mouseWCY();
                return true;
            }
        }

        //checks to see if object is already being dragged across y axis
        else if(engine.input.isButtonPressed(engine.input.eMouseButton.eLeft) && 
        this.isVerticalGrabbed == true)
        {
            xform.setYPos(xform.getYPos() + (this.mCamera.mouseWCY() - 
            this.lastMousePos[1]));
            this.lastMousePos[0] = this.mCamera.mouseWCX();
            this.lastMousePos[1] = this.mCamera.mouseWCY();
            return true;
        }
        
        //nothing being grabbed
        else
        {
            this.isHorizontalGrabbed = false;
            this.isVerticalGrabbed = false;
        }
        return false;
    }

    editorCameraMovement()
    {
        let speed = 0.3;
        if(engine.input.isKeyPressed(engine.input.keys.Left))
        {
            this.mCamera = new engine.Camera(
                vec2.fromValues(this.mCamera.getWCCenter()[0] - speed, 
                this.mCamera.getWCCenter()[1]), // position of the camera
                20,                       // width of camera
                [0, 0, 340, 350]           // viewport (orgX, orgY, width, height)
            );
        }
        if(engine.input.isKeyPressed(engine.input.keys.Right))
        {
            this.mCamera = new engine.Camera(
                vec2.fromValues(this.mCamera.getWCCenter()[0] + speed, 
                this.mCamera.getWCCenter()[1]), // position of the camera
                20,                       // width of camera
                [0, 0, 340, 350]           // viewport (orgX, orgY, width, height)
            );
        }
        if(engine.input.isKeyPressed(engine.input.keys.Up))
        {
            this.mCamera = new engine.Camera(
                vec2.fromValues(this.mCamera.getWCCenter()[0], 
                this.mCamera.getWCCenter()[1] + speed), // position of the camera
                20,                       // width of camera
                [0, 0, 340, 350]           // viewport (orgX, orgY, width, height)
            );
        }
        if(engine.input.isKeyPressed(engine.input.keys.Down))
        {
            this.mCamera = new engine.Camera(
                vec2.fromValues(this.mCamera.getWCCenter()[0], 
                this.mCamera.getWCCenter()[1] - speed), // position of the camera
                20,                       // width of camera
                [0, 0, 340, 350]           // viewport (orgX, orgY, width, height)
            );
        }
        if(engine.input.isButtonClicked(engine.input.eMouseButton.eMiddle))
        {
            this.mCamera = new engine.Camera(
                vec2.fromValues(0, 0), // position of the camera
                20,                       // width of camera
                [0, 0, 340, 350]           // viewport (orgX, orgY, width, height)
            );
        }
        return this.mCamera;
    }

    setEditorSelectObject(obj)
    {
        this.editorSelectObject = obj;
    }
    getEditorSelectObject()
    {
        return this.editorSelectObject;
    }
    setParsePlace(place)
    {
        this.parsePlace = place;
    }
}
export default EngineEditor;