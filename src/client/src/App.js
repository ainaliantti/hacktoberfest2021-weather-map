import React, { Component } from 'react';
import './App.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

class App extends Component {
    componentDidMount() {
        //scene
        var scene = new THREE.Scene();
        scene.background = new THREE.Color(0x0c2e4e);

        // Create 60000 tiny dots and spiral them around the sphere.
        const DOT_COUNT = 60000;

        // A hexagon with a radius of 2 pixels looks like a circle
        const dotGeometry = new THREE.CircleGeometry(2, 5);
        const circleMaterial = new THREE.MeshBasicMaterial({ color: 0xffff00 });

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

        const circle = new THREE.Mesh(dotGeometry, circleMaterial);
        scene.add(circle);

        //camera
        var camera = new THREE.PerspectiveCamera(
            45,
            window.innerWidth / window.innerHeight,
            0.1,
            1000
        );
        camera.position.z = 10;

        //renderer
        var renderer = new THREE.WebGLRenderer();
        renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(renderer.domElement);

        //orbit control allow the camera to orbit around a target
        var controls = new OrbitControls(camera, renderer.domElement);

        const geometry = new THREE.SphereGeometry(1, 32, 32);
        const material = new THREE.MeshPhongMaterial();
        const sphere = new THREE.Mesh(geometry, material);
        sphere.rotation.x += 0.5;
        sphere.material.color.setHex(0x132f59);
        scene.add(sphere);

        //light
        const hemiLight = new THREE.HemisphereLight(0xffffff, 0xffffff, 0.6);
        hemiLight.groundColor.setHSL(0.095, 1, 0.75);
        hemiLight.position.set(0, 50, 0);
        scene.add(hemiLight);
        const dirLight = new THREE.DirectionalLight(0xffffff, 1);
        dirLight.position.set(-1, 1.75, 1);
        dirLight.position.multiplyScalar(30);
        scene.add(dirLight);

        function animate() {
            requestAnimationFrame(animate);
            controls.update();
            sphere.rotation.y += 0.005;
            renderer.render(scene, camera);
        }
        animate();
    }

    render() {
        return <div />;
    }
}
export default App;
