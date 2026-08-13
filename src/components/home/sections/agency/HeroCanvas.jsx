"use client";

/** WebGL aurora + particle plexus background for the hero — real three.js scene, brand-tinted. */
import { useEffect, useRef } from "react";

const COLORS = [
  [1, 0.157, 0.737], // #ff28bc pink
  [0.557, 0.153, 0.965], // #8e38f8 purple
  [0.012, 0.549, 0.898], // #268de5 blue
  [0.012, 0.047, 0.957], // #030cf4 deep blue
];

export function HeroCanvas() {
  const containerRef = useRef(null);

  useEffect(() => {
    let cleanup = () => {};
    let cancelled = false;

    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return cleanup;

    import("three").then((THREE) => {
      if (cancelled || !containerRef.current) return;
      const container = containerRef.current;

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(55, 1, 0.1, 100);
      camera.position.z = 18;

      const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      container.appendChild(renderer.domElement);

      const COUNT = 180;
      const positions = new Float32Array(COUNT * 3);
      const colors = new Float32Array(COUNT * 3);
      const speeds = new Float32Array(COUNT);

      for (let i = 0; i < COUNT; i++) {
        positions[i * 3] = (Math.random() - 0.5) * 34;
        positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
        positions[i * 3 + 2] = (Math.random() - 0.5) * 14;
        const c = COLORS[i % COLORS.length];
        colors[i * 3] = c[0];
        colors[i * 3 + 1] = c[1];
        colors[i * 3 + 2] = c[2];
        speeds[i] = 0.15 + Math.random() * 0.35;
      }

      const geometry = new THREE.BufferGeometry();
      geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
      geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

      const material = new THREE.PointsMaterial({
        size: 0.16,
        vertexColors: true,
        transparent: true,
        opacity: 0.85,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      });

      const points = new THREE.Points(geometry, material);
      scene.add(points);

      // Soft glow spheres — the "aurora" blobs, drifting slowly.
      const glowGeo = new THREE.SphereGeometry(1, 24, 24);
      const glows = COLORS.map((c, i) => {
        const mat = new THREE.MeshBasicMaterial({
          color: new THREE.Color(c[0], c[1], c[2]),
          transparent: true,
          opacity: 0.06,
        });
        const mesh = new THREE.Mesh(glowGeo, mat);
        mesh.scale.setScalar(7 + i * 1.5);
        mesh.position.set((i - 1.5) * 6, (i % 2 === 0 ? 1 : -1) * 3, -6 - i * 2);
        scene.add(mesh);
        return mesh;
      });

      function resize() {
        const { clientWidth, clientHeight } = container;
        camera.aspect = clientWidth / Math.max(clientHeight, 1);
        camera.updateProjectionMatrix();
        renderer.setSize(clientWidth, clientHeight);
      }
      resize();
      window.addEventListener("resize", resize);

      let raf = 0;
      const startTime = performance.now();
      function animate() {
        const t = (performance.now() - startTime) / 1000;
        const posAttr = geometry.attributes.position;
        for (let i = 0; i < COUNT; i++) {
          posAttr.array[i * 3 + 1] += Math.sin(t * speeds[i] + i) * 0.0015;
          posAttr.array[i * 3] += Math.cos(t * speeds[i] * 0.6 + i) * 0.001;
        }
        posAttr.needsUpdate = true;
        points.rotation.y = t * 0.02;

        glows.forEach((g, i) => {
          g.position.x += Math.sin(t * 0.15 + i) * 0.01;
          g.position.y += Math.cos(t * 0.12 + i) * 0.008;
        });

        renderer.render(scene, camera);
        raf = requestAnimationFrame(animate);
      }
      animate();

      cleanup = () => {
        cancelAnimationFrame(raf);
        window.removeEventListener("resize", resize);
        geometry.dispose();
        material.dispose();
        glowGeo.dispose();
        glows.forEach((g) => g.material.dispose());
        renderer.dispose();
        if (renderer.domElement.parentNode === container) container.removeChild(renderer.domElement);
      };
    });

    return () => {
      cancelled = true;
      cleanup();
    };
  }, []);

  return <div ref={containerRef} className="absolute inset-0" aria-hidden />;
}
