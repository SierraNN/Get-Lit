import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

import gsap from 'gsap';

let camera, scene, renderer;
const loader = new GLTFLoader();

export function init() {

	camera = new THREE.PerspectiveCamera( 300, window.innerWidth / window.innerHeight, 0.01, 10 );
	camera.position.z = 9;
    camera.rotation.z = 1;

	scene = new THREE.Scene();
// Lights up the entire scene
    const light = new THREE.AmbientLight( 0xffffff, 2 );
    scene.add( light );


    loader.load("/models/scene.gltf", (gltf) => {
        let model = gltf.scene
        model.scale.set(.01, .01, .01)

        gsap.to(camera.position, {
            z: 10,
            duration: 1,
            ease: "back.out(1.7)"
        })
        gsap.to(camera.rotation, {
            z: 2,
            duration: 1
        })

        gsap.to(model.rotation, {
            x: 2.5,
            duration: 1,
            delay: 1
        })
        gsap.to(model.rotation, {
            y: Math.PI * 3,
            duration: 2,
            delay: 1
        })
        gsap.to(model.scale, {
            delay: 1,
            duration: 1,
            x: .015,
            y: .015,
            z: .015
        })
        gsap.to(model.position, {
            delay: 1,
            duration: 1,
            x: .3,
            y: .3
        })



        scene.add(model)
    })
// Renders image to the page and animates them
	renderer = new THREE.WebGLRenderer( { antialias: true } );
	renderer.setSize( window.innerWidth, window.innerHeight );
	renderer.setAnimationLoop( animation );
    renderer.setClearColor( 0x272727, 1 );
	document.body.appendChild( renderer.domElement );

    window.addEventListener( 'resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize( window.innerWidth, window.innerHeight );
    });
}

function animation() {
	renderer.render( scene, camera );

}