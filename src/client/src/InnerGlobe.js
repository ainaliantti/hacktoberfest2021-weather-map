import React, { Component } from 'react';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import * as THREE from 'three';

export default class InnerGlobe extends Component {
    componentDidMount() {
        let sphere, scene, camera, renderer, controls;

        /**
         * Init scene, camera, renderer and orbit controls
         */
        function initInnerSphere() {
            //scene
            scene = new THREE.Scene();
            scene.background = new THREE.Color(0x0c2e4e);

            //camera
            camera = new THREE.PerspectiveCamera(
                45,
                window.innerWidth / window.innerHeight,
                0.1,
                1000
            );
            camera.position.z = 10;

            //renderer
            renderer = new THREE.WebGLRenderer();
            renderer.setSize(window.innerWidth, window.innerHeight);
            document.body.appendChild(renderer.domElement);

            //orbit control allow the camera to orbit around a target
            controls = new OrbitControls(camera, renderer.domElement);
            controls.enableDamping = true;
            controls.minDistance = 5;
            controls.maxDistance = 100;

            //create the actual sphere
            const geometry = new THREE.SphereGeometry(1, 32, 32);
            const material = new THREE.MeshPhongMaterial();
            sphere = new THREE.Mesh(geometry, material);
            sphere.material.color.setHex(0x132f59);
            scene.add(sphere);

            //light
            const hemiLight = new THREE.HemisphereLight(
                0xffffff,
                0xffffff,
                0.6
            );
            hemiLight.groundColor.setHSL(0.095, 1, 0.75);
            hemiLight.position.set(0, 50, 0);
            scene.add(hemiLight);
            const dirLight = new THREE.DirectionalLight(0xffffff, 1);
            dirLight.position.set(-1, 1.75, 1);
            dirLight.position.multiplyScalar(30);
            scene.add(dirLight);
        }
        function animate() {
            requestAnimationFrame(animate);
            controls.update();
            renderer.render(scene, camera);
        }
        initInnerSphere();
        animate();
    }

    render() {
        return <div></div>;
    }
}
