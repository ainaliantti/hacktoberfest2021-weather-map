import React, { Component } from 'react';
import * as THREE from 'three';

export default class DotGlobe extends Component {
    componentDidMount() {
        let scene, dotSphere;

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
    }
    render() {
        return <div></div>;
    }
}
