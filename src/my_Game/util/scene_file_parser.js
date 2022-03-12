/*
 * scene file parsing utils
 */

// Engine utility stuff
import engine from "../../engine/index.js";

class SceneFileParser {
    
    constructor (xml) {
        this.xml = xml
    }

    parseCamera() {
        let camElm = getElm(this.xml, "Camera");
        let cx = Number(camElm[0].getAttribute("CenterX"));
        let cy = Number(camElm[0].getAttribute("CenterY"));
        let w = Number(camElm[0].getAttribute("Width"));
        let viewport = camElm[0].getAttribute("Viewport").split(" ");
        let bgColor = camElm[0].getAttribute("BgColor").split(" ");
        // make sure viewport and color are number
        let j;
        for (j = 0; j < 4; j++) {
            bgColor[j] = Number(bgColor[j]);
            viewport[j] = Number(viewport[j]);
        }

        let cam = new engine.Camera(
            vec2.fromValues(cx, cy),  // position of the camera
            w,                        // width of camera
            viewport                  // viewport (orgX, orgY, width, height)
            );
        cam.setBackgroundColor(bgColor);
        return cam;
    }

    parseSquares(sqSet) {
        let elm = getElm(this.xml, "Square");
        let i, j, x, y, w, h, r, c, sq;
        for (i = 0; i < elm.length; i++) {
            x = Number(elm.item(i).attributes.getNamedItem("PosX").value);
            y = Number(elm.item(i).attributes.getNamedItem("PosY").value);
            w = Number(elm.item(i).attributes.getNamedItem("Width").value);
            h = Number(elm.item(i).attributes.getNamedItem("Height").value);
            r = Number(elm.item(i).attributes.getNamedItem("Rotation").value);
            c = elm.item(i).attributes.getNamedItem("Color").value.split(" ");
            sq = new engine.Renderable();
            // make sure color array contains numbers
            for (j = 0; j < 4; j++) {
                c[j] = Number(c[j]);
            }
            sq.setColor(c);
            sq.getXform().setPosition(x, y);
            sq.getXform().setRotationInDegree(r); // In Degree
            sq.getXform().setSize(w, h);
            sqSet.push(sq);
        }
    }

    parseCameraJSON()
    {
        // A js object, not xml
        let camElm = this.xml.Camera;
        let cx = Number(camElm.Center[0]);
        let cy = Number(camElm.Center[1]);
        let w = Number(camElm.Width);
        let viewport = camElm.Viewport;
        let bgColor = camElm.BgColor;

        let cam = new engine.Camera(
            vec2.fromValues(cx, cy),  // position of the camera
            w,                        // width of camera
            viewport                  // viewport (orgX, orgY, width, height)
            );
        cam.setBackgroundColor(bgColor);
        return cam;
    }

    // Pushes renderables into an array
    parseSquaresJSON(sqSet)
    {
        // An actual js object, not xml
        let elm = this.xml.Square;
        let i, j, x, y, w, h, r, c, sq;
        // Go through and set values for each square
        for (i = 0; i < elm.length; i++) 
        {
            x = Number(elm[i].Pos[0]);
            y = Number(elm[i].Pos[1]);
            w = Number(elm[i].Width);
            h = Number(elm[i].Height);
            r = Number(elm[i].Rotation);
            c = elm[i].Color;

            sq = new engine.Renderable();
            sq.setColor(c);
            sq.getXform().setPosition(x, y);
            sq.getXform().setRotationInDegree(r); // In Degree
            sq.getXform().setSize(w, h);
            sqSet.push(sq);
        }
    }

    // Pushes Game Objects into an array
    parseObjectJSON(obj)
    {
        // An actual js object, not xml
        let elm = this.xml.Square;
        let i, j, x, y, w, h, r, c, sq;
        // Go through and set values for each square
        for (i = 0; i < elm.length; i++) 
        {
            x = Number(elm[i].Pos[0]);
            y = Number(elm[i].Pos[1]);
            w = Number(elm[i].Width);
            h = Number(elm[i].Height);
            r = Number(elm[i].Rotation);
            c = elm[i].Color;

            sq = new engine.Renderable();
            sq.setColor(c);
            sq.getXform().setPosition(x, y);
            sq.getXform().setRotationInDegree(r); // In Degree
            sq.getXform().setSize(w, h);

            var newObj = new engine.GameObject(sq);
            if(elm[i].Components != null)
            {
                newObj.setComponents(elm[i].Components);
            }
            obj.push(newObj);
        }
    }

    // Code found on stack overflow
    // Link: https://stackoverflow.com/questions/13405129/javascript-create-and-save-file
    saveCurrentFile()
    {
        var file = new Blob([JSON.stringify(this.xml, null, 4)], 
        {type : 'application/json'});
        let filename = "sceneDownload";
        if (window.navigator.msSaveOrOpenBlob)
        {
            window.navigator.msSaveOrOpenBlob(file, filename);
        }
        else 
        {
            var a = document.createElement("a"),
                    url = URL.createObjectURL(file);
            a.href = url;
            a.download = filename;
            document.body.appendChild(a);
            a.click();
            setTimeout(function() {
                document.body.removeChild(a);
                window.URL.revokeObjectURL(url);
            }, 0);
        }
    }

    // Saves a game object from scene to level
    saveRenderable(renderable, pos)
    {
        let xForm = renderable.getXform();
        let elm = this.xml.Square;

        // Sets the new changes of the object in file.
        elm[pos].Pos[0] = xForm.getXPos();
        elm[pos].Pos[1] = xForm.getYPos();
        elm[pos].Width = xForm.getWidth();
        elm[pos].Height = xForm.getHeight();
        elm[pos].Rotation = xForm.getRotationInDegree();
        elm[pos].Color = renderable.getRenderable().getColor();
    }
}

function getElm(xmlContent, tagElm) 
{
    let theElm = xmlContent.getElementsByTagName(tagElm);
    if (theElm.length === 0) {
        console.error("Warning: Level element:[" + tagElm + "]: is not found!");
    }
    return theElm;
}

export default SceneFileParser;