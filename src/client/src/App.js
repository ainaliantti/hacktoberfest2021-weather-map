import './App.css';
import * as THREE from "three";

function App() {
    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

    var renderer = new THREE.WebGLRenderer();
    renderer.setSize( window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    var geometry = new THREE.SphereGeometry(1, 32, 32);
    var material = new THREE.MeshPhongMaterial({ color: 0xffff00 });
    var earthmesh = new THREE.Mesh(geometry, material);
    scene.add(earthmesh);
    
    camera.position.z = 50;
    renderer.render(scene, camera)
    return(
        <div></div>
    )
}

export default App;
