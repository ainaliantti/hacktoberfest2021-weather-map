import React, { Component } from 'react';
import './App.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

class App extends Component {
    componentDidMount() {
        let scene, camera, renderer, sphere, dotSphere, controls;
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

        function initDotSphere() {
            // Create 60000 tiny dots and spiral them around the sphere.
            const DOT_COUNT = 60000;

            // A hexagon with a radius of 2 pixels looks like a circle
            const dotGeometry = new THREE.CircleGeometry(2, 5);

            // The XYZ coordinate of each dot
            const positions = [];

            // A random identifier for each dot
            const rndId = [];

            // The country border each dot falls within
            const countryIds = [];

            const vector = new THREE.Vector3();

            for (let i = DOT_COUNT; i >= 0; i--) {
                const phi = Math.acos(-1 + (2 * i) / DOT_COUNT);
                const theta = Math.sqrt(DOT_COUNT * Math.PI) * phi;

                // Pass the angle between this dot an the Y-axis (phi)
                // Pass this dot’s angle around the y axis (theta)
                // Scale each position by 600 (the radius of the globe)
                vector.setFromSphericalCoords(600, phi, theta);
                dotGeometry.lookAt(vector);

                // Move the dot to the newly calculated position
                dotGeometry.translate(vector.x, vector.y, vector.z);
            }
            const geometry = new THREE.SphereGeometry(1.25, 32, 32);
            const material = new THREE.MeshPhongMaterial();
            dotSphere = new THREE.Mesh(geometry, material);
            dotSphere.material.transparent = true;
            dotSphere.material.opacity = 0.5;
            dotSphere.material.color.setHex(0x536e96);
            scene.add(dotSphere);
        }

        function animate() {
            requestAnimationFrame(animate);
            controls.update();
            renderer.render(scene, camera);
        }
        initInnerSphere();
        initDotSphere();
        animate();
    }

    render() {
        return <div />;
    }
}
export default App;
