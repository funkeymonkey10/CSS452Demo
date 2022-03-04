"use strict";  // Operate in Strict mode such that variables must be declared before used!

import engine from "../../engine/index.js";

class Brain extends engine.GameObject {
    constructor(spriteTexture, x, y) {
        super(null);
        this.kDeltaDegree = 1;
        this.kDeltaRad = Math.PI * this.kDeltaDegree / 180;
        this.kDeltaSpeed = 0.01;
        this.mRenderComponent =  new engine.SpriteRenderable(spriteTexture);
        this.mRenderComponent.setColor([1, 1, 1, 0]);
        this.mRenderComponent.getXform().setPosition(x, y);
        this.mRenderComponent.getXform().setSize(7.5, 7.5);

        this.setSpeed(0.05);

        this.moveDirX = 0;
        this.moveDirY = 0;
        this.setMoveDir();

        this.lineSeg = [];
    }

    update() 
    {
        let xf = this.getXform();
        xf.setPosition(xf.getXPos() + this.moveDirX, 
        xf.getYPos() + this.moveDirY);
    }

    drawLineBB(aCamera)
    {
        this.setLineSeg();
        for(let i = 0; i < this.lineSeg.length; i++)
        {
            this.lineSeg[i].draw(aCamera);
        }
    }

    setMoveDir()
    {
        this.moveDirX = (Math.random() * 5 + 5) * 
        (this.isPostive(Math.round(Math.random() * -1))) / 60;
        this.moveDirY = (Math.random() * 5 + 5) * 
        (this.isPostive(Math.round(Math.random() * -1))) / 60;
    }

    reflect(wasBot)
    {
        if(wasBot)
        {
            this.moveDirY *= -1;
        }
        else
        {
            this.moveDirX *= -1;
        }
    }

    isPostive(num)
    {
        if(num === 0)
        {
            num = 1;
        }
        return num;
    }

    getXMove(){return this.moveDirX;}
    getYMove(){return this.moveDirY;}

    colWithDyePack(boundingBox)
    {
        if(this.getBBox().intersectsBound(boundingBox))
        {
            return true;
        }
        return false;
    }

    pushBack()
    {
        let xf = this.getXform();
        xf.setXPos((xf.getXPos() + 5));
        return true;
    }

    setLineSeg()
    {
        this.lineSeg = [];
        // Left
        let newLine = new engine.LineRenderable(this.getBBox().minX(), this.getBBox().minY(),
        this.getBBox().minX(), this.getBBox().maxY());
        this.lineSeg.push(newLine);

        // Bottom
        newLine = new engine.LineRenderable(this.getBBox().minX(), this.getBBox().minY(),
        this.getBBox().maxX(), this.getBBox().minY());
        this.lineSeg.push(newLine);

        // Right
        newLine = new engine.LineRenderable(this.getBBox().maxX(), this.getBBox().minY(),
        this.getBBox().maxX(), this.getBBox().maxY());
        this.lineSeg.push(newLine);

        // Top
        newLine = new engine.LineRenderable(this.getBBox().minX(), this.getBBox().maxY(),
        this.getBBox().maxX(), this.getBBox().maxY());
        this.lineSeg.push(newLine);
    }
}

export default Brain;