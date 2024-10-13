import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { MapControls } from "three/addons/controls/MapControls.js";
import map from "@/assets/map.jpg";

const Towers = () => {
  const mountRef = useRef(null);
  const [popupData, setPopupData] = useState(null);
  const [isPopupVisible, setPopupVisible] = useState(false);
  const [popupPosition, setPopupPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    // Scene setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color("#cea974");

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    mountRef.current.appendChild(renderer.domElement);

    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    // camera.position.set(0, 0, 0);
    camera.fov = 150; // Decrease this value to zoom in, increase to zoom out
    camera.updateProjectionMatrix();

    // Controls setup
    const controls = new MapControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.15;
    controls.screenSpacePanning = false;
    controls.minDistance = 80;
    controls.maxDistance = 150;
    controls.enableRotate = false;
    controls.enableZoom = true;
    controls.maxPolarAngle = Math.PI / 2;

    // World setup
    const SphereGeometry = new THREE.SphereGeometry(0.4, 32, 32);
    SphereGeometry.translate(0, 0.5, 0);
    const boxMaterial = new THREE.MeshPhongMaterial({
      color: "#cd3d2c",
      flatShading: true,
    });

    // Create a unified base geometry
    const baseGeometry = new THREE.BoxGeometry(1440 + 500, 1, 720 + 200);

    const texture = new THREE.TextureLoader().load(map.src);
    texture.colorSpace = THREE.SRGBColorSpace;
    const baseMesh = new THREE.Mesh(
      baseGeometry,
      new THREE.MeshBasicMaterial({ map: texture, side: THREE.DoubleSide })
    );

    baseMesh.position.y = -1; // Position the base slightly below the origin
    scene.add(baseMesh); // Add the base to the scene

    const meshes = [];
    const minDistance = 40; // Minimum distance between boxes

    for (let i = 0; i < 100; i++) {
      let position;
      let overlapping;

      do {
        overlapping = false;
        // Generate random position
        position = new THREE.Vector3(
          Math.random() * 1800 - 900,
          0,
          Math.random() * 600 - 300
        );

        // Check for overlaps with existing meshes
        for (const obj of meshes) {
          const distance = position.distanceTo(obj.mesh.position);
          if (distance < minDistance) {
            overlapping = true;
            break;
          }
        }
      } while (overlapping);

      // Create the box mesh
      const boxMesh = new THREE.Mesh(SphereGeometry, boxMaterial);
      boxMesh.position.copy(position);
      boxMesh.scale.x = 20;
      boxMesh.scale.y = Math.random() * 0.5; // Random height
      boxMesh.scale.z = 20;
      boxMesh.updateMatrix();
      boxMesh.matrixAutoUpdate = false;
      scene.add(boxMesh);

      // Store mesh with additional data
      meshes.push({
        mesh: boxMesh,
        text: `Box ${i + 1}`,
      });
    }

    // Click event to show popup
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const onMouseClick = (event) => {
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(meshes.map((m) => m.mesh));

      if (intersects.length > 0) {
        const clickedMesh = intersects[0].object;
        const meshData = meshes.find((m) => m.mesh === clickedMesh);
        if (meshData) {
          setPopupData(meshData);
          setPopupVisible(true);
          const position = intersects[0].point;
          setPopupPosition({ x: position.x, y: position.y + 50 }); // Adjust y position for visibility
        }
      }
    };

    window.addEventListener("click", onMouseClick);

    // Lights setup
    const dirLight1 = new THREE.DirectionalLight(0xffffff, 3);
    dirLight1.position.set(1, 1, 1);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0x002288, 3);
    dirLight2.position.set(-1, -1, -1);
    scene.add(dirLight2);

    const ambientLight = new THREE.AmbientLight(0x555555);
    scene.add(ambientLight);

    // Resize handler
    const onWindowResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", onWindowResize);

    // Animation loop
    const animate = () => {
      controls.update();
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };
    animate();

    // Cleanup on component unmount
    return () => {
      window.removeEventListener("resize", onWindowResize);
      // eslint-disable-next-line react-hooks/exhaustive-deps
      mountRef.current.removeChild(renderer.domElement);
    };
  }, []);

  const closePopup = () => {
    setPopupVisible(false);
    setPopupData(null);
  };

  return (
    <>
      <div ref={mountRef} />
      {isPopupVisible && popupData && (
        <div
          style={{
            position: "absolute",
            top: "0px",
            left: "0px",
            background: "white",
            padding: "8px",
            zIndex: 2,
          }}
        >
          <h3>{popupData.text}</h3>
          <button onClick={closePopup}>Close</button>
        </div>
      )}
    </>
  );
};

export default Towers;
