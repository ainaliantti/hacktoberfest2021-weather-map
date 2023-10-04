import React, { Component } from 'react';
import './App.css';
import * as THREE from 'three';
import InnerGlobe from './InnerGlobe.js';
import DotGlobe from './DotGlobe.js';

class App extends Component {
  componentDidMount() {}

  render() {
    return (
      <div>
        <InnerGlobe></InnerGlobe>
      </div>
    );
  }
}
export default App;
