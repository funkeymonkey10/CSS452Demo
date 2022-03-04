"use strict";

class CameraRuntime
{
    constructor()
    {
        this.isDisplaying = false;
    }
    setToGameCam(isGameCam)
    {
        this.isDisplaying = isGameCam;
    }
    getGameCam()
    {
        return this.isDisplaying;
    }
}
export default CameraRuntime;