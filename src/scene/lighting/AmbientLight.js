/**
 An **AmbientLight** defines an ambient light source of fixed intensity and color that affects all {@link Mesh"}}Meshes{{/crossLink}}
 equally.

 <a href="../../examples/#lights_ambient"><img src="http://i.giphy.com/l0HlGTxXQWMRVOPwk.gif"></img></a>

 ## Overview

 * When {@link Mesh"}}Meshes{{/crossLink}} have {@link PhongMaterial"}}PhongMaterials{{/crossLink}},
 AmbientLight {@link AmbientLight/color:property"}}color{{/crossLink}} is multiplied by
 PhongMaterial {@link PhongMaterial/ambient} at each rendered fragment of the {@link Geometry} surface.
 * When the Meshes have {@link LambertMaterial"}}LambertMaterials{{/crossLink}},
 AmbientLight {@link AmbientLight/color:property"}}color{{/crossLink}} is multiplied by
 LambertMaterial {@link LambertMaterial/ambient} for each rendered triangle of the Geometry surface (ie. flat shaded).
 * {@link AmbientLight}, {@link DirLight},
 {@link SpotLight} and {@link PointLight} instances are registered by ID
 on {@link Scene/lights:property"}}Scene#lights{{/crossLink}} for convenient access.

 ## Examples

 * [Ambient light source](../../examples/#lights_ambient)

 ## Usage

 In the example below we'll customize the default Scene's light sources, defining an AmbientLight and a couple of
 DirLights, then create a Phong-shaded box mesh.

 ````javascript
 new xeokit.AmbientLight({
    color: [0.8, 0.8, 0.8],
    intensity: 0.5
 });

 new xeokit.DirLight({
    dir: [-0.8, -0.4, -0.4],
    color: [0.4, 0.4, 0.5],
    intensity: 0.5,
    space: "view"
 });

 new xeokit.DirLight({
    dir: [0.2, -0.8, 0.8],
    color: [0.8, 0.8, 0.8],
    intensity: 0.5,
    space: "view"
 });
 ````

 @class AmbientLight
 @module xeokit
 @submodule lighting
 @constructor
 @param [owner] {Component} Owner component. When destroyed, the owner will destroy this component as well. Creates this component within the default {@link Scene} when omitted.
 @param [cfg] {*} AmbientLight configuration
 @param [cfg.id] {String} Optional ID, unique among all components in the parent {@link Scene"}}Scene{{/crossLink}}, generated automatically when omitted.
 @param [cfg.meta] {String:Object} Optional map of user-defined metadata to attach to this AmbientLight.
 @param [cfg.color=[0.7, 0.7, 0.8]] {Array(Number)} The color of this AmbientLight.
 @param [cfg.intensity=[1.0]] {Number} The intensity of this AmbientLight, as a factor in range ````[0..1]````.
 @extends Component
 */
import {math} from '../math/math.js';
import {Component} from '../Component.js';

class AmbientLight extends Component {

    /**
     JavaScript class name for this Component.

     For example: "AmbientLight", "MetallicMaterial" etc.

     @property type
     @type String
     @final
     */
    get type() {
        return "AmbientLight";
    }

    init(cfg) {
        super.init(cfg);
        this._state = {
            type: "ambient",
            color: math.vec3([0.7, 0.7, 0.7]),
            intensity: 1.0
        };
        this.color = cfg.color;
        this.intensity = cfg.intensity;
        this.scene._lightCreated(this);
    }

    /**
     The color of this AmbientLight.

     @property color
     @default [0.7, 0.7, 0.8]
     @type Float32Array
     */
    set color(value) {
        this._state.color.set(value || [0.7, 0.7, 0.8]);
        this.glRedraw();
    }

    get color() {
        return this._state.color;
    }

    /**
     The intensity of this AmbientLight.

     @property intensity
     @default 1.0
     @type Number
     */
    set intensity(value) {
        this._state.intensity = value !== undefined ? value : 1.0;
        this.glRedraw();
    }

    get intensity() {
        return this._state.intensity;
    }

    destroy() {
        super.destroy();
    }
}

export {AmbientLight};