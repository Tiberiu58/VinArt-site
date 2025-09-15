import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { gsap } from 'gsap';

interface WineBottle3DProps {
  className?: string;
}

const WineBottle3D: React.FC<WineBottle3DProps> = ({ className = "" }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene>();
  const rendererRef = useRef<THREE.WebGLRenderer>();
  const bottleRef = useRef<THREE.Group>();
  const animationRef = useRef<number>();

  useEffect(() => {
    if (!mountRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      75,
      mountRef.current.clientWidth / mountRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, 0, 5);

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ 
      alpha: true, 
      antialias: true,
      powerPreference: "high-performance"
    });
    renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    rendererRef.current = renderer;
    mountRef.current.appendChild(renderer.domElement);

    // Lighting setup
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(10, 10, 5);
    directionalLight.castShadow = true;
    directionalLight.shadow.mapSize.width = 2048;
    directionalLight.shadow.mapSize.height = 2048;
    scene.add(directionalLight);

    const pointLight = new THREE.PointLight(0xD4AF37, 0.5, 100);
    pointLight.position.set(-5, 5, 5);
    scene.add(pointLight);

    // Create wine bottle group
    const bottleGroup = new THREE.Group();
    bottleRef.current = bottleGroup;
    scene.add(bottleGroup);

    // Bottle body geometry
    const bottleGeometry = new THREE.CylinderGeometry(0.8, 0.9, 4, 32);
    const bottleMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x1a4d1a,
      transparent: true,
      opacity: 0.85,
      roughness: 0.1,
      metalness: 0.1,
      clearcoat: 1.0,
      clearcoatRoughness: 0.1,
      transmission: 0.1,
      thickness: 0.5,
    });
    const bottleBody = new THREE.Mesh(bottleGeometry, bottleMaterial);
    bottleBody.position.y = 0;
    bottleBody.castShadow = true;
    bottleBody.receiveShadow = true;
    bottleGroup.add(bottleBody);

    // Bottle neck
    const neckGeometry = new THREE.CylinderGeometry(0.25, 0.35, 1.5, 16);
    const neckMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x1a4d1a,
      transparent: true,
      opacity: 0.85,
      roughness: 0.1,
      metalness: 0.1,
      clearcoat: 1.0,
      clearcoatRoughness: 0.1,
    });
    const bottleNeck = new THREE.Mesh(neckGeometry, neckMaterial);
    bottleNeck.position.y = 2.75;
    bottleNeck.castShadow = true;
    bottleGroup.add(bottleNeck);

    // Bottle cap
    const capGeometry = new THREE.CylinderGeometry(0.3, 0.3, 0.3, 16);
    const capMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xD4AF37,
      roughness: 0.2,
      metalness: 0.8,
      clearcoat: 1.0,
    });
    const bottleCap = new THREE.Mesh(capGeometry, capMaterial);
    bottleCap.position.y = 3.65;
    bottleCap.castShadow = true;
    bottleGroup.add(bottleCap);

    // Wine liquid inside
    const wineGeometry = new THREE.CylinderGeometry(0.75, 0.85, 3, 32);
    const wineMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x722F37,
      transparent: true,
      opacity: 0.8,
      roughness: 0.0,
      metalness: 0.0,
      transmission: 0.2,
    });
    const wine = new THREE.Mesh(wineGeometry, wineMaterial);
    wine.position.y = -0.5;
    bottleGroup.add(wine);

    // Label
    const labelGeometry = new THREE.CylinderGeometry(0.81, 0.86, 1.6, 32, 1, true);
    const labelMaterial = new THREE.MeshLambertMaterial({
      color: 0xf8f8f8,
      transparent: true,
      opacity: 0.9,
      side: THREE.DoubleSide,
    });
    const label = new THREE.Mesh(labelGeometry, labelMaterial);
    label.position.set(0, 0.5, 0);
    bottleGroup.add(label);

    // Add artistic pattern to label
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext('2d')!;
    
    // Create gradient background
    const gradient = ctx.createLinearGradient(0, 0, 512, 512);
    gradient.addColorStop(0, '#FFD700');
    gradient.addColorStop(0.5, '#FF6B6B');
    gradient.addColorStop(1, '#4ECDC4');
    
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 512, 512);
    
    // Add some artistic elements
    ctx.globalAlpha = 0.3;
    ctx.fillStyle = '#ffffff';
    for (let i = 0; i < 30; i++) {
      ctx.beginPath();
      ctx.arc(
        Math.random() * 512,
        Math.random() * 512,
        Math.random() * 20 + 5,
        0,
        Math.PI * 2
      );
      ctx.fill();
    }
    
    // Add VinArt text
    ctx.globalAlpha = 0.8;
    ctx.fillStyle = '#000000';
    ctx.font = 'bold 48px serif';
    ctx.textAlign = 'center';
    ctx.fillText('VinArt', 256, 200);
    
    ctx.font = '24px serif';
    ctx.fillText('Premium Collection', 256, 240);

    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    const patternMaterial = new THREE.MeshLambertMaterial({
      map: texture,
      transparent: true,
      opacity: 0.7,
      side: THREE.DoubleSide,
    });
    const patternGeometry = new THREE.CylinderGeometry(0.82, 0.87, 1.6, 32, 1, true);
    const pattern = new THREE.Mesh(patternGeometry, patternMaterial);
    pattern.position.set(0, 0.5, 0);
    bottleGroup.add(pattern);

    // Position the bottle group
    bottleGroup.position.set(0, -0.5, 0);
    bottleGroup.rotation.x = 0.1;
    bottleGroup.scale.set(0.8, 0.8, 0.8);

    // GSAP Animation
    gsap.to(bottleGroup.rotation, {
      y: Math.PI * 2,
      duration: 20,
      ease: "none",
      repeat: -1,
    });

    // Floating animation
    gsap.to(bottleGroup.position, {
      y: 0.3,
      duration: 3,
      ease: "power2.inOut",
      yoyo: true,
      repeat: -1,
    });

    // Subtle scale animation
    gsap.to(bottleGroup.scale, {
      x: 1.05,
      y: 1.05,
      z: 1.05,
      duration: 4,
      ease: "power2.inOut",
      yoyo: true,
      repeat: -1,
    });

    // Animation loop
    const animate = () => {
      animationRef.current = requestAnimationFrame(animate);
      renderer.render(scene, camera);
    };
    animate();

    // Handle resize
    const handleResize = () => {
      if (!mountRef.current) return;
      
      camera.aspect = mountRef.current.clientWidth / mountRef.current.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    };

    window.addEventListener('resize', handleResize);

    // Mouse interaction
    const handleMouseMove = (event: MouseEvent) => {
      if (!mountRef.current || !bottleRef.current) return;
      
      const rect = mountRef.current.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
      
      gsap.to(bottleRef.current.rotation, {
        x: y * 0.1 + 0.1,
        z: x * 0.1,
        duration: 1,
        ease: "power2.out",
      });
    };

    mountRef.current.addEventListener('mousemove', handleMouseMove);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      if (mountRef.current) {
        mountRef.current.removeEventListener('mousemove', handleMouseMove);
      }
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      if (rendererRef.current && mountRef.current) {
        mountRef.current.removeChild(rendererRef.current.domElement);
        rendererRef.current.dispose();
      }
      
      // Dispose of geometries and materials
      scene.traverse((object) => {
        if (object instanceof THREE.Mesh) {
          object.geometry.dispose();
          if (Array.isArray(object.material)) {
            object.material.forEach(material => material.dispose());
          } else {
            object.material.dispose();
          }
        }
      });
    };
  }, []);

  return (
    <div 
      ref={mountRef} 
      className={`w-full h-full ${className}`}
      style={{ minHeight: '100vh' }}
    />
  );
};

export default WineBottle3D;