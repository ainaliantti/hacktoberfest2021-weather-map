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
        1,
        1000
      );
      camera.position.z = 160;

      //renderer
      renderer = new THREE.WebGLRenderer({ antialias: false, alpha: true });
      renderer.setSize(window.innerWidth, window.innerHeight);
      document.body.appendChild(renderer.domElement);

      //orbit control allow the camera to orbit around a target
      controls = new OrbitControls(camera, renderer.domElement);
      controls.enableDamping = true;
      controls.minDistance = 5;
      controls.maxDistance = 100;

      //create the actual sphere
      const geometry = new THREE.SphereGeometry(32, 32, 32);
      const material = new THREE.MeshPhongMaterial();
      sphere = new THREE.Mesh(geometry, material);
      sphere.material.color.setHex(0x132f59);
      scene.add(sphere);

      //light
      const hemiLight = new THREE.HemisphereLight(0xffffff, 0xffffff, 0.6);
      hemiLight.groundColor.setHSL(0.095, 1, 0.75);
      hemiLight.position.set(0, 50, 0);
      scene.add(hemiLight);
      const light = new THREE.AmbientLight(0x404040); // soft white light
      scene.add(light);
      addDots();
    }

    /**
     * Generates dots around the globe
     */
    function addDots() {
      const DOT_COUNT = 30000; // Adjust the number of dots as needed

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
        // Scale each position by the radius of the globe)
        vector.setFromSphericalCoords(32, phi, theta);

        // Create a new dot geometry and mesh for each dot
        const dotGeometry = new THREE.CircleGeometry(0.08, 5);
        dotGeometry.lookAt(vector);

        const dotMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff }); // Customize material as needed

        const dot = new THREE.Mesh(dotGeometry, dotMaterial);
        dot.position.copy(vector); // Set the position of the dot

        // Add the dot to the sphere group
        sphere.add(dot);
      }
    }

    /**
     * Animate the damn thing
     */
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
