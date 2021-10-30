import React, { Component } from 'react';
import './App.css';
import * as THREE from 'three';

class App extends Component {
    componentDidMount() {
        //scene
        var scene = new THREE.Scene();

        //camera
        var camera = new THREE.PerspectiveCamera(
            45,
            window.innerWidth / window.innerHeight,
            0.1,
            1000
        );

        //controls NOT WORKING!!!
        //var controls = new THREE.OrbitControls(camera, renderer.domElement);

        //renderer
        var renderer = new THREE.WebGLRenderer();
        renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(renderer.domElement);

        const geometry = new THREE.SphereGeometry(1, 32, 32);
        const material = new THREE.MeshPhongMaterial();
        const sphere = new THREE.Mesh(geometry, material);

        //light
        scene.add(new THREE.AmbientLight(0x333333));
        var light = new THREE.DirectionalLight(0xffffff, 1);
        light.position.set(5, 3, 5);

        scene.add(light);
        scene.add(sphere);
        camera.position.z = 10;
        renderer.render(scene, camera);
    }
    render() {
        return <div />;
    }
}
export default App;
