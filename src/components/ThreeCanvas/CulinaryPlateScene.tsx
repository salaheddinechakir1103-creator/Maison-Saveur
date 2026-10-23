import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import { useLanguage } from '../../context/LanguageContext';
import { SceneCameraView, SceneLighting } from '../../types';
import { 
  Compass, 
  Eye, 
  Sparkles, 
  Sun, 
  Moon, 
  RotateCw, 
  ChevronUp, 
  ChevronDown,
  Layers,
  Flame
} from 'lucide-react';

interface Props {
  className?: string;
  onClocheToggle?: (isLifted: boolean) => void;
}

export const CulinaryPlateScene: React.FC<Props> = ({ className = '', onClocheToggle }) => {
  const { t, language } = useLanguage();
  const canvasMountRef = useRef<HTMLDivElement>(null);

  // UI state for bottom dock
  const [isDockCollapsed, setIsDockCollapsed] = useState(false);
  const [cameraView, setCameraView] = useState<SceneCameraView>('perspective');
  const [lightingPreset, setLightingPreset] = useState<SceneLighting>('studio');
  const [isClocheLifted, setIsClocheLifted] = useState(false);
  const [autoRotate, setAutoRotate] = useState(true);
  const [isWebGLSupported, setIsWebGLSupported] = useState(true);

  // Scene references for animation loop
  const sceneStateRef = useRef<{
    renderer?: THREE.WebGLRenderer;
    scene?: THREE.Scene;
    camera?: THREE.PerspectiveCamera;
    clocheGroup?: THREE.Group;
    targetClocheY: number;
    currentClocheY: number;
    plateGroup?: THREE.Group;
    steamParticles?: THREE.Points;
    goldFlakesGroup?: THREE.Group;
    keyLight?: THREE.DirectionalLight;
    fillLight?: THREE.HemisphereLight;
    rimLight?: THREE.PointLight;
    candleLight?: THREE.PointLight;
    targetCamPos: THREE.Vector3;
    targetLookAt: THREE.Vector3;
    currentLookAt: THREE.Vector3;
    mouseParallax: { x: number; y: number; targetX: number; targetY: number };
    isDragging: boolean;
    previousMousePosition: { x: number; y: number };
    autoRotate: boolean;
    lightingPreset: SceneLighting;
    isSoftwareGl: boolean;
  }>({
    targetClocheY: 0,
    currentClocheY: 0,
    targetCamPos: new THREE.Vector3(0, 3.2, 5.0),
    targetLookAt: new THREE.Vector3(0, 0.4, 0),
    currentLookAt: new THREE.Vector3(0, 0.4, 0),
    mouseParallax: { x: 0, y: 0, targetX: 0, targetY: 0 },
    isDragging: false,
    previousMousePosition: { x: 0, y: 0 },
    autoRotate: true,
    lightingPreset: 'studio',
    isSoftwareGl: false
  });

  // Camera presets
  const applyCameraPreset = useCallback((preset: SceneCameraView) => {
    setCameraView(preset);
    const state = sceneStateRef.current;
    if (!state) return;

    if (preset === 'perspective') {
      state.targetCamPos.set(0, 3.2, 5.0);
      state.targetLookAt.set(0, 0.4, 0);
    } else if (preset === 'top') {
      state.targetCamPos.set(0, 6.2, 0.1);
      state.targetLookAt.set(0, 0, 0);
    } else if (preset === 'macro') {
      state.targetCamPos.set(1.4, 1.3, 2.0);
      state.targetLookAt.set(0, 0.5, 0);
    } else if (preset === 'cloche') {
      state.targetCamPos.set(-2.0, 2.5, 4.2);
      state.targetLookAt.set(0, 0.8, 0);
    }
  }, []);

  const toggleCloche = useCallback(() => {
    setIsClocheLifted(prev => {
      const next = !prev;
      sceneStateRef.current.targetClocheY = next ? 3.2 : 0;
      onClocheToggle?.(next);
      return next;
    });
  }, [onClocheToggle]);

  const applyLightingPreset = useCallback((preset: SceneLighting) => {
    setLightingPreset(preset);
    const state = sceneStateRef.current;
    state.lightingPreset = preset;

    if (!state.keyLight || !state.fillLight || !state.rimLight || !state.candleLight) return;

    if (preset === 'studio') {
      state.keyLight.color.setHex(0xfff3db);
      state.keyLight.intensity = 2.8;
      state.fillLight.color.setHex(0xe8d0b5);
      state.fillLight.intensity = 1.0;
      state.rimLight.color.setHex(0xd4af37);
      state.rimLight.intensity = 2.2;
      state.candleLight.intensity = 0.5;
    } else if (preset === 'candlelight') {
      state.keyLight.color.setHex(0xffaa55);
      state.keyLight.intensity = 1.2;
      state.fillLight.color.setHex(0x553311);
      state.fillLight.intensity = 0.4;
      state.rimLight.color.setHex(0xffcc66);
      state.rimLight.intensity = 3.0;
      state.candleLight.intensity = 4.0;
      state.candleLight.color.setHex(0xff9922);
    } else if (preset === 'midnight') {
      state.keyLight.color.setHex(0x8899cc);
      state.keyLight.intensity = 1.6;
      state.fillLight.color.setHex(0x1a2035);
      state.fillLight.intensity = 0.8;
      state.rimLight.color.setHex(0xd4af37);
      state.rimLight.intensity = 2.5;
      state.candleLight.intensity = 1.2;
      state.candleLight.color.setHex(0xffdd88);
    }
  }, []);

  useEffect(() => {
    sceneStateRef.current.autoRotate = autoRotate;
  }, [autoRotate]);

  useEffect(() => {
    const mount = canvasMountRef.current;
    if (!mount) return;

    // Detect Software WebGL
    let isSoftwareGl = false;
    try {
      const testCanvas = document.createElement('canvas');
      const gl = testCanvas.getContext('webgl2') || testCanvas.getContext('webgl');
      if (!gl) {
        setIsWebGLSupported(false);
        return;
      }
      const ext = gl.getExtension('WEBGL_debug_renderer_info');
      const param = ext ? ext.UNMASKED_RENDERER_WEBGL : gl.RENDERER;
      const gpu = String(gl.getParameter(param));
      isSoftwareGl = /SwiftShader|llvmpipe|softpipe|Software|Basic Render/i.test(gpu);
    } catch {
      isSoftwareGl = true;
    }
    sceneStateRef.current.isSoftwareGl = isSoftwareGl;

    // Dimensions
    const width = mount.clientWidth || window.innerWidth;
    const height = mount.clientHeight || window.innerHeight;

    // 1. Scene
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x0a0a0c, 0.05);
    sceneStateRef.current.scene = scene;

    // 2. Camera
    const camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 100);
    camera.position.set(0, 3.2, 5.0);
    sceneStateRef.current.camera = camera;

    // 3. Renderer with high standard color pipeline
    const renderer = new THREE.WebGLRenderer({
      antialias: !isSoftwareGl,
      alpha: true,
      powerPreference: 'high-performance',
      stencil: false,
      depth: true
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(isSoftwareGl ? 1 : Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    renderer.shadowMap.enabled = !isSoftwareGl;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    mount.appendChild(renderer.domElement);
    sceneStateRef.current.renderer = renderer;

    // 4. PMREM Environment Map
    try {
      const pmremGenerator = new THREE.PMREMGenerator(renderer);
      pmremGenerator.compileEquirectangularShader();
      const roomEnv = new RoomEnvironment();
      scene.environment = pmremGenerator.fromScene(roomEnv, 0.04).texture;
      pmremGenerator.dispose();
    } catch (e) {
      console.warn('RoomEnvironment generation warning', e);
    }

    // 5. Studio Lighting Rig
    const keyLight = new THREE.DirectionalLight(0xfff5e6, 2.8);
    keyLight.position.set(4, 7, 5);
    if (!isSoftwareGl) {
      keyLight.castShadow = true;
      keyLight.shadow.mapSize.width = 1024;
      keyLight.shadow.mapSize.height = 1024;
      keyLight.shadow.camera.near = 1;
      keyLight.shadow.camera.far = 16;
      keyLight.shadow.bias = -0.0005;
      keyLight.shadow.normalBias = 0.02;
      const d = 3;
      keyLight.shadow.camera.left = -d;
      keyLight.shadow.camera.right = d;
      keyLight.shadow.camera.top = d;
      keyLight.shadow.camera.bottom = -d;
    }
    scene.add(keyLight);
    sceneStateRef.current.keyLight = keyLight;

    const fillLight = new THREE.HemisphereLight(0xffeedd, 0x11131a, 1.1);
    scene.add(fillLight);
    sceneStateRef.current.fillLight = fillLight;

    const rimLight = new THREE.PointLight(0xd4af37, 2.5, 12);
    rimLight.position.set(-4, 3, -3);
    scene.add(rimLight);
    sceneStateRef.current.rimLight = rimLight;

    const candleLight = new THREE.PointLight(0xff9933, 0.8, 6);
    candleLight.position.set(0, 1.8, 1.5);
    scene.add(candleLight);
    sceneStateRef.current.candleLight = candleLight;

    // 6. Master Culinary Model Assembly (THREE.Group with 8+ distinct parts)
    const masterPlateGroup = new THREE.Group();
    scene.add(masterPlateGroup);
    sceneStateRef.current.plateGroup = masterPlateGroup;

    // Contact Shadow Plane Grounding
    const shadowGeo = new THREE.PlaneGeometry(5.2, 5.2);
    const shadowCanvas = document.createElement('canvas');
    shadowCanvas.width = 256;
    shadowCanvas.height = 256;
    const shadowCtx = shadowCanvas.getContext('2d');
    if (shadowCtx) {
      const grad = shadowCtx.createRadialGradient(128, 128, 10, 128, 128, 120);
      grad.addColorStop(0, 'rgba(0, 0, 0, 0.65)');
      grad.addColorStop(0.5, 'rgba(0, 0, 0, 0.25)');
      grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      shadowCtx.fillStyle = grad;
      shadowCtx.fillRect(0, 0, 256, 256);
    }
    const shadowTex = new THREE.CanvasTexture(shadowCanvas);
    const shadowMat = new THREE.MeshBasicMaterial({
      map: shadowTex,
      transparent: true,
      depthWrite: false,
      opacity: 0.75
    });
    const shadowMesh = new THREE.Mesh(shadowGeo, shadowMat);
    shadowMesh.rotation.x = -Math.PI / 2;
    shadowMesh.position.y = 0.01;
    masterPlateGroup.add(shadowMesh);

    // Part 1: Obsidian Porcelain Plate with Gold Rim
    // Plate base & dish contour
    const plateProfile: THREE.Vector2[] = [
      new THREE.Vector2(0, 0.05),
      new THREE.Vector2(1.2, 0.05),
      new THREE.Vector2(1.8, 0.12),
      new THREE.Vector2(2.3, 0.30),
      new THREE.Vector2(2.38, 0.32),
      new THREE.Vector2(2.35, 0.25),
      new THREE.Vector2(1.7, 0.08),
      new THREE.Vector2(1.1, 0.02),
      new THREE.Vector2(0, 0.02)
    ];
    const plateGeo = new THREE.LatheGeometry(plateProfile, 64);
    const plateMat = new THREE.MeshPhysicalMaterial({
      color: 0x141418,
      roughness: 0.22,
      metalness: 0.15,
      clearcoat: 0.95,
      clearcoatRoughness: 0.1
    });
    const plateMesh = new THREE.Mesh(plateGeo, plateMat);
    plateMesh.receiveShadow = !isSoftwareGl;
    plateMesh.castShadow = !isSoftwareGl;
    masterPlateGroup.add(plateMesh);

    // Gold Beveled Plate Rim Ring
    const goldRimGeo = new THREE.TorusGeometry(2.34, 0.022, 16, 64);
    const goldMat = new THREE.MeshPhysicalMaterial({
      color: 0xd4af37,
      roughness: 0.18,
      metalness: 0.92,
      clearcoat: 0.6
    });
    const goldRimMesh = new THREE.Mesh(goldRimGeo, goldMat);
    goldRimMesh.rotation.x = Math.PI / 2;
    goldRimMesh.position.y = 0.31;
    masterPlateGroup.add(goldRimMesh);

    // Part 2: Silky Parsnip & Truffle Purée Swirl Quenelle
    const pureeCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(-0.6, 0.12, -0.2),
      new THREE.Vector3(-0.1, 0.14, 0.3),
      new THREE.Vector3(0.5, 0.16, 0.1),
      new THREE.Vector3(0.7, 0.13, -0.4)
    ]);
    const pureeGeo = new THREE.TubeGeometry(pureeCurve, 40, 0.14, 16, false);
    const pureeMat = new THREE.MeshStandardMaterial({
      color: 0xf3ede0,
      roughness: 0.45,
      metalness: 0.05
    });
    const pureeMesh = new THREE.Mesh(pureeGeo, pureeMat);
    pureeMesh.castShadow = !isSoftwareGl;
    pureeMesh.receiveShadow = !isSoftwareGl;
    masterPlateGroup.add(pureeMesh);

    // Part 3: Gourmet Filet Mignon Medallion (Central Star)
    const steakGeo = new THREE.CylinderGeometry(0.68, 0.72, 0.42, 32);
    // Procedural crust bump
    const steakMat = new THREE.MeshPhysicalMaterial({
      color: 0x24140e,
      roughness: 0.4,
      metalness: 0.12,
      clearcoat: 0.7,
      clearcoatRoughness: 0.25
    });
    const steakMesh = new THREE.Mesh(steakGeo, steakMat);
    steakMesh.position.set(-0.1, 0.32, -0.05);
    steakMesh.castShadow = !isSoftwareGl;
    steakMesh.receiveShadow = !isSoftwareGl;
    masterPlateGroup.add(steakMesh);

    // Glossy Rosemary Reduction Glaze on Steak
    const glazeGeo = new THREE.CylinderGeometry(0.62, 0.66, 0.06, 32);
    const glazeMat = new THREE.MeshPhysicalMaterial({
      color: 0x180805,
      roughness: 0.08,
      metalness: 0.2,
      clearcoat: 1.0,
      clearcoatRoughness: 0.05
    });
    const glazeMesh = new THREE.Mesh(glazeGeo, glazeMat);
    glazeMesh.position.set(-0.1, 0.54, -0.05);
    masterPlateGroup.add(glazeMesh);

    // Part 4: Black Truffle Shavings
    const truffleGeo = new THREE.CylinderGeometry(0.18, 0.22, 0.02, 12);
    const truffleMat = new THREE.MeshStandardMaterial({
      color: 0x111114,
      roughness: 0.75,
      metalness: 0.05
    });
    for (let i = 0; i < 4; i++) {
      const truffle = new THREE.Mesh(truffleGeo, truffleMat);
      truffle.position.set(
        -0.25 + Math.cos(i * 1.5) * 0.22,
        0.56 + i * 0.015,
        -0.1 + Math.sin(i * 1.5) * 0.2
      );
      truffle.rotation.set(0.1 * i, 0.5 * i, 0.15 * i);
      masterPlateGroup.add(truffle);
    }

    // Part 5: Glazed Mini Asparagus & Baby Heritage Carrot
    const asparagusMat = new THREE.MeshPhysicalMaterial({
      color: 0x3d6629,
      roughness: 0.3,
      metalness: 0.05,
      clearcoat: 0.8
    });
    for (let i = 0; i < 2; i++) {
      const asparagusGeo = new THREE.CylinderGeometry(0.045, 0.06, 0.9, 12);
      const asparagus = new THREE.Mesh(asparagusGeo, asparagusMat);
      asparagus.position.set(0.4 + i * 0.12, 0.18 + i * 0.04, -0.15 - i * 0.08);
      asparagus.rotation.set(1.4, 0.2 * i, -0.6);
      asparagus.castShadow = !isSoftwareGl;
      masterPlateGroup.add(asparagus);
    }

    // Baby Carrot
    const carrotGeo = new THREE.ConeGeometry(0.07, 0.75, 16);
    const carrotMat = new THREE.MeshPhysicalMaterial({
      color: 0xcc5511,
      roughness: 0.25,
      metalness: 0.05,
      clearcoat: 0.9
    });
    const carrotMesh = new THREE.Mesh(carrotGeo, carrotMat);
    carrotMesh.position.set(0.35, 0.17, 0.25);
    carrotMesh.rotation.set(-1.4, 0.4, 0.8);
    carrotMesh.castShadow = !isSoftwareGl;
    masterPlateGroup.add(carrotMesh);

    // Part 6: Microgreens & Edible Gold Leaf Group
    const goldFlakesGroup = new THREE.Group();
    masterPlateGroup.add(goldFlakesGroup);
    sceneStateRef.current.goldFlakesGroup = goldFlakesGroup;

    const flakeGeo = new THREE.PlaneGeometry(0.06, 0.05);
    const flakeMat = new THREE.MeshPhysicalMaterial({
      color: 0xffd700,
      roughness: 0.1,
      metalness: 0.98,
      clearcoat: 1.0,
      side: THREE.DoubleSide
    });
    for (let i = 0; i < 7; i++) {
      const flake = new THREE.Mesh(flakeGeo, flakeMat);
      flake.position.set(
        -0.18 + (Math.random() - 0.5) * 0.4,
        0.58 + Math.random() * 0.03,
        -0.08 + (Math.random() - 0.5) * 0.4
      );
      flake.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, 0);
      goldFlakesGroup.add(flake);
    }

    // Micro herbs
    const herbGeo = new THREE.SphereGeometry(0.035, 8, 8);
    const herbMat = new THREE.MeshStandardMaterial({
      color: 0x5a9e32,
      roughness: 0.6
    });
    for (let i = 0; i < 6; i++) {
      const herb = new THREE.Mesh(herbGeo, herbMat);
      herb.position.set(
        -0.3 + Math.random() * 0.6,
        0.56 + Math.random() * 0.02,
        -0.2 + Math.random() * 0.5
      );
      masterPlateGroup.add(herb);
    }

    // Part 7: Luxury Ornate Champagne Gold Cloche (Cover Lid)
    const clocheGroup = new THREE.Group();
    scene.add(clocheGroup);
    sceneStateRef.current.clocheGroup = clocheGroup;

    // Cloche Dome
    const clocheProfile: THREE.Vector2[] = [
      new THREE.Vector2(0, 1.8),
      new THREE.Vector2(0.2, 1.78),
      new THREE.Vector2(0.6, 1.7),
      new THREE.Vector2(1.2, 1.45),
      new THREE.Vector2(1.75, 1.0),
      new THREE.Vector2(2.0, 0.5),
      new THREE.Vector2(2.1, 0.18),
      new THREE.Vector2(2.15, 0.08),
      new THREE.Vector2(2.05, 0.08),
      new THREE.Vector2(1.98, 0.2),
      new THREE.Vector2(1.88, 0.5),
      new THREE.Vector2(1.65, 1.0),
      new THREE.Vector2(1.1, 1.4),
      new THREE.Vector2(0.5, 1.65),
      new THREE.Vector2(0, 1.72)
    ];
    const clocheGeo = new THREE.LatheGeometry(clocheProfile, 64);
    const clocheMat = new THREE.MeshPhysicalMaterial({
      color: 0xd9b343,
      roughness: 0.14,
      metalness: 0.94,
      clearcoat: 0.85,
      clearcoatRoughness: 0.12
    });
    const clocheMesh = new THREE.Mesh(clocheGeo, clocheMat);
    clocheMesh.castShadow = !isSoftwareGl;
    clocheMesh.receiveShadow = !isSoftwareGl;
    clocheGroup.add(clocheMesh);

    // Ornate Golden Finial Handle
    const handleBaseGeo = new THREE.CylinderGeometry(0.18, 0.24, 0.12, 24);
    const handleRingGeo = new THREE.TorusGeometry(0.16, 0.04, 16, 32);
    const handleMesh1 = new THREE.Mesh(handleBaseGeo, goldMat);
    handleMesh1.position.y = 1.84;
    const handleMesh2 = new THREE.Mesh(handleRingGeo, goldMat);
    handleMesh2.position.y = 2.05;
    clocheGroup.add(handleMesh1);
    clocheGroup.add(handleMesh2);

    // Part 8: Floating Golden Culinary Steam Particles
    const particleCount = 45;
    const particleGeo = new THREE.BufferGeometry();
    const particlePos = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i += 3) {
      particlePos[i] = (Math.random() - 0.5) * 1.6;
      particlePos[i + 1] = 0.5 + Math.random() * 2.2;
      particlePos[i + 2] = (Math.random() - 0.5) * 1.6;
    }
    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePos, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0xd4af37,
      size: 0.04,
      transparent: true,
      opacity: 0.65,
      blending: THREE.AdditiveBlending
    });
    const steamParticles = new THREE.Points(particleGeo, particleMat);
    scene.add(steamParticles);
    sceneStateRef.current.steamParticles = steamParticles;

    // Mouse Interaction Handlers
    const handlePointerDown = (e: MouseEvent | TouchEvent) => {
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
      sceneStateRef.current.isDragging = true;
      sceneStateRef.current.previousMousePosition = { x: clientX, y: clientY };
    };

    const handlePointerMove = (e: MouseEvent | TouchEvent) => {
      const state = sceneStateRef.current;
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

      // Parallax target
      const rect = mount.getBoundingClientRect();
      const normX = ((clientX - rect.left) / rect.width) * 2 - 1;
      const normY = -(((clientY - rect.top) / rect.height) * 2 - 1);
      state.mouseParallax.targetX = normX * 0.4;
      state.mouseParallax.targetY = normY * 0.25;

      if (!state.isDragging || !state.plateGroup) return;

      const deltaX = clientX - state.previousMousePosition.x;
      const deltaY = clientY - state.previousMousePosition.y;

      state.plateGroup.rotation.y += deltaX * 0.008;
      if (state.clocheGroup) {
        state.clocheGroup.rotation.y += deltaX * 0.008;
      }

      state.previousMousePosition = { x: clientX, y: clientY };
    };

    const handlePointerUp = () => {
      sceneStateRef.current.isDragging = false;
    };

    const domElement = renderer.domElement;
    domElement.addEventListener('mousedown', handlePointerDown);
    domElement.addEventListener('mousemove', handlePointerMove);
    window.addEventListener('mouseup', handlePointerUp);

    domElement.addEventListener('touchstart', handlePointerDown, { passive: true });
    domElement.addEventListener('touchmove', handlePointerMove, { passive: true });
    window.addEventListener('touchend', handlePointerUp);

    // Resize handler
    const handleResize = () => {
      if (!mount || !renderer || !camera) return;
      const newWidth = mount.clientWidth;
      const newHeight = mount.clientHeight;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };
    window.addEventListener('resize', handleResize);

    // Scroll parallax trigger
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const progress = Math.min(scrollY / (window.innerHeight * 0.8), 1);
      if (progress > 0.15 && !sceneStateRef.current.targetClocheY) {
        // Automatically reveal dish if user scrolls down
        sceneStateRef.current.targetClocheY = 3.2;
        setIsClocheLifted(true);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Animation Loop
    let animationFrameId = 0;
    let clock = new THREE.Clock();

    const animate = () => {
      const delta = Math.min(clock.getDelta(), 0.1);
      const state = sceneStateRef.current;

      // 1. Smooth Cloche Physics Lift/Lower
      state.currentClocheY = THREE.MathUtils.damp(state.currentClocheY, state.targetClocheY, 4.0, delta);
      if (state.clocheGroup) {
        state.clocheGroup.position.y = state.currentClocheY;
        // Subtle tilt when lifted
        state.clocheGroup.rotation.z = (state.currentClocheY / 3.2) * 0.08;
      }

      // 2. Auto Rotation if enabled and not dragging
      if (state.autoRotate && !state.isDragging && state.plateGroup) {
        state.plateGroup.rotation.y += 0.25 * delta;
        if (state.clocheGroup) {
          state.clocheGroup.rotation.y += 0.25 * delta;
        }
      }

      // 3. Parallax damping
      state.mouseParallax.x = THREE.MathUtils.damp(state.mouseParallax.x, state.mouseParallax.targetX, 3.0, delta);
      state.mouseParallax.y = THREE.MathUtils.damp(state.mouseParallax.y, state.mouseParallax.targetY, 3.0, delta);

      // 4. Camera target damping
      camera.position.x = THREE.MathUtils.damp(camera.position.x, state.targetCamPos.x + state.mouseParallax.x, 3.5, delta);
      camera.position.y = THREE.MathUtils.damp(camera.position.y, state.targetCamPos.y + state.mouseParallax.y, 3.5, delta);
      camera.position.z = THREE.MathUtils.damp(camera.position.z, state.targetCamPos.z, 3.5, delta);

      state.currentLookAt.x = THREE.MathUtils.damp(state.currentLookAt.x, state.targetLookAt.x, 3.5, delta);
      state.currentLookAt.y = THREE.MathUtils.damp(state.currentLookAt.y, state.targetLookAt.y, 3.5, delta);
      state.currentLookAt.z = THREE.MathUtils.damp(state.currentLookAt.z, state.targetLookAt.z, 3.5, delta);
      camera.lookAt(state.currentLookAt);

      // 5. Steam particles gentle rise and wobble
      if (state.steamParticles) {
        const positions = state.steamParticles.geometry.attributes.position.array as Float32Array;
        for (let i = 1; i < positions.length; i += 3) {
          positions[i] += 0.4 * delta;
          if (positions[i] > 2.8) {
            positions[i] = 0.5;
          }
        }
        state.steamParticles.geometry.attributes.position.needsUpdate = true;
      }

      // 6. Subtle gold leaf shimmer
      if (state.goldFlakesGroup) {
        state.goldFlakesGroup.rotation.y += 0.15 * delta;
      }

      // Candlelight subtle flicker if selected
      if (state.candleLight && state.lightingPreset === 'candlelight') {
        state.candleLight.intensity = 3.6 + Math.sin(clock.getElapsedTime() * 8) * 0.4;
      }

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
      domElement.removeEventListener('mousedown', handlePointerDown);
      domElement.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('mouseup', handlePointerUp);
      domElement.removeEventListener('touchstart', handlePointerDown);
      domElement.removeEventListener('touchmove', handlePointerMove);
      window.removeEventListener('touchend', handlePointerUp);

      if (mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [applyCameraPreset]);

  return (
    <div className={`relative w-full h-full overflow-hidden select-none ${className}`}>
      {/* 3D WebGL Canvas Container */}
      {isWebGLSupported ? (
        <div 
          ref={canvasMountRef} 
          className="w-full h-full cursor-grab active:cursor-grabbing"
          style={{ touchAction: 'none' }}
        />
      ) : (
        /* Static Elegant Fallback if WebGL is unavailable */
        <div className="w-full h-full relative flex items-center justify-center bg-[#0d0d11]">
          <img 
            src="/src/assets/images/dish_truffle_gastronomy_1792754320242.jpg" 
            alt="Maison Saveur Plat d'Or"
            className="w-full h-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0c] via-transparent to-[#0a0a0c]/80" />
          <div className="absolute bottom-16 text-center max-w-md px-4">
            <span className="text-xs uppercase tracking-widest text-[#d4af37] font-cinzel">Haute Gastronomie</span>
            <h3 className="text-2xl font-serif-luxury text-[#fcfaf6] mt-1">Filet Mignon & Truffe de l'Atlas</h3>
          </div>
        </div>
      )}

      {/* Subtle Drag Tip HUD - Non-obstructive */}
      <div className="absolute top-6 left-1/2 -translate-x-1/2 pointer-events-none text-center">
        <span className="text-[11px] uppercase tracking-widest text-[#d4af37]/80 bg-[#0a0a0c]/80 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-[#d4af37]/20 font-medium">
          {t('heroInteractionTip')}
        </span>
      </div>

      {/* Unified Ergonomic Bottom Dock (Three.js Skill Section 5) */}
      <div 
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 w-[94%] max-w-[840px] transition-transform duration-300 ease-out"
        style={{
          transform: `translateX(-50%) translateY(${isDockCollapsed ? 'calc(100% - 38px)' : '0'})`
        }}
      >
        {/* Collapse / Expand Tab attached to top edge */}
        <div className="flex justify-center -mb-px">
          <button
            onClick={() => setIsDockCollapsed(prev => !prev)}
            className="flex items-center gap-1.5 px-4 py-1.5 text-[11px] font-medium uppercase tracking-wider text-[#d4af37] bg-[#121217] border border-b-0 border-[#d4af37]/30 rounded-t-lg hover:bg-[#1a1a22] transition-colors shadow-lg cursor-pointer"
            aria-label="Toggle 3D controls"
          >
            {isDockCollapsed ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
            <span>{isDockCollapsed ? t('show3DControls') : t('hide3DControls')}</span>
          </button>
        </div>

        {/* Dock Controls Bar */}
        <div className="bg-[#121217]/95 border border-[#d4af37]/25 rounded-2xl p-3 shadow-2xl backdrop-blur-md">
          <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
            
            {/* Cloche Lift Action (Primary Star Action) */}
            <button
              onClick={toggleCloche}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium tracking-wide transition-all cursor-pointer ${
                isClocheLifted 
                  ? 'bg-[#d4af37] text-[#0a0a0c] shadow-lg shadow-[#d4af37]/25' 
                  : 'bg-[#1e1e28] text-[#f7f4ee] hover:bg-[#282836] border border-[#d4af37]/30'
              }`}
            >
              <Sparkles className="w-4 h-4 text-inherit" />
              <span>{isClocheLifted ? t('lowerCloche') : t('liftCloche')}</span>
            </button>

            {/* Camera View Angle Selector */}
            <div className="flex items-center gap-1 bg-[#0a0a0e] p-1 rounded-xl border border-white/5">
              <span className="text-[10px] uppercase tracking-wider text-[#9e9aa8] px-2 hidden sm:inline">
                {t('viewPreset')}
              </span>
              <button
                onClick={() => applyCameraPreset('perspective')}
                className={`px-2.5 py-1.5 rounded-lg transition-colors cursor-pointer ${
                  cameraView === 'perspective' ? 'bg-[#d4af37]/20 text-[#d4af37] font-semibold' : 'text-[#a1a1aa] hover:text-white'
                }`}
                title={t('viewPerspective')}
              >
                <Eye className="w-3.5 h-3.5 inline mr-1" />
                <span className="text-[11px]">3D</span>
              </button>
              <button
                onClick={() => applyCameraPreset('top')}
                className={`px-2.5 py-1.5 rounded-lg transition-colors cursor-pointer ${
                  cameraView === 'top' ? 'bg-[#d4af37]/20 text-[#d4af37] font-semibold' : 'text-[#a1a1aa] hover:text-white'
                }`}
                title={t('viewTop')}
              >
                <Compass className="w-3.5 h-3.5 inline mr-1" />
                <span className="text-[11px]">{t('viewTop')}</span>
              </button>
              <button
                onClick={() => applyCameraPreset('macro')}
                className={`px-2.5 py-1.5 rounded-lg transition-colors cursor-pointer ${
                  cameraView === 'macro' ? 'bg-[#d4af37]/20 text-[#d4af37] font-semibold' : 'text-[#a1a1aa] hover:text-white'
                }`}
                title={t('viewMacro')}
              >
                <Layers className="w-3.5 h-3.5 inline mr-1" />
                <span className="text-[11px]">{t('viewMacro')}</span>
              </button>
            </div>

            {/* Lighting Preset Selector */}
            <div className="flex items-center gap-1 bg-[#0a0a0e] p-1 rounded-xl border border-white/5">
              <button
                onClick={() => applyLightingPreset('studio')}
                className={`px-2.5 py-1.5 rounded-lg transition-colors cursor-pointer ${
                  lightingPreset === 'studio' ? 'bg-[#d4af37]/20 text-[#d4af37]' : 'text-[#a1a1aa] hover:text-white'
                }`}
                title={t('lightingStudio')}
              >
                <Sun className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => applyLightingPreset('candlelight')}
                className={`px-2.5 py-1.5 rounded-lg transition-colors cursor-pointer ${
                  lightingPreset === 'candlelight' ? 'bg-[#d4af37]/20 text-[#d4af37]' : 'text-[#a1a1aa] hover:text-white'
                }`}
                title={t('lightingCandle')}
              >
                <Flame className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => applyLightingPreset('midnight')}
                className={`px-2.5 py-1.5 rounded-lg transition-colors cursor-pointer ${
                  lightingPreset === 'midnight' ? 'bg-[#d4af37]/20 text-[#d4af37]' : 'text-[#a1a1aa] hover:text-white'
                }`}
                title={t('lightingMidnight')}
              >
                <Moon className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Auto Rotate Toggle */}
            <button
              onClick={() => setAutoRotate(prev => !prev)}
              className={`p-2 rounded-xl transition-colors cursor-pointer ${
                autoRotate ? 'text-[#d4af37] bg-[#d4af37]/15' : 'text-[#71717a] hover:text-white bg-[#0a0a0e]'
              }`}
              title={t('autoRotate')}
            >
              <RotateCw className="w-4 h-4" />
            </button>

          </div>
        </div>
      </div>
    </div>
  );
};
