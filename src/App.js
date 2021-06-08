import './App.css';
import * as THREE from 'three';
import { render } from '@testing-library/react';
import { useEffect, useRef } from 'react';

function App() {

  /**
   * the best way to mount the scene in this component is using useRef
   * if I just drop the code inside of functional component, it will
   * cause the scene to be appended multiple time in the component.
   * */
  const mountRef = useRef( null );

  //next, ill use useFfect to mount the scene once
  useEffect(() => {
    //to display anything with theree.js, first you have to create a scene, camera and a renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 100 );
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize( window.innerWidth, window.innerHeight );
    mountRef.current.appendChild( renderer.domElement );  

    //adding a cube
    const geometry = new THREE.BoxGeometry();
    const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 });
    const cube = new THREE.Mesh( geometry, material );
    scene.add( cube );

    camera.position.z = 5;

    //This will create a loop that causes the renderer to draw the scene every time the screen is refreshed
    function animate() {
      requestAnimationFrame( animate );
      //animates it 
      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;
      renderer.render( scene, camera );
    }

    //calls the animation function
    animate();
    
  }, [] );
  

  

  return (
    <div ref={ mountRef }>
    </div>
  );
}

export default App;
