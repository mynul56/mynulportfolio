import * as THREE from 'https://cdn.skypack.dev/three@0.132.2';
import { OrbitControls } from 'https://cdn.skypack.dev/three@0.132.2/examples/jsm/controls/OrbitControls.js';

// Hero Section 3D Animation
class HeroAnimation {
    constructor() {
        this.container = document.getElementById('home-section');
        this.init();
    }

    init() {
        // Scene setup
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.renderer = new THREE.WebGLRenderer({ alpha: true });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.container.appendChild(this.renderer.domElement);

        // Add floating geometry
        const geometry = new THREE.TorusKnotGeometry(3, 1, 128, 32);
        const material = new THREE.MeshPhongMaterial({
            color: 0x9F7AEA,
            shininess: 60,
            transparent: true,
            opacity: 0.7
        });
        this.mesh = new THREE.Mesh(geometry, material);
        this.scene.add(this.mesh);

        // Lighting
        const light1 = new THREE.DirectionalLight(0xffffff, 1);
        light1.position.set(0, 1, 1);
        this.scene.add(light1);

        const light2 = new THREE.AmbientLight(0x6B46C1, 0.5);
        this.scene.add(light2);

        // Camera position
        this.camera.position.z = 10;

        // Animation
        this.animate();

        // Responsive handling
        window.addEventListener('resize', () => this.onWindowResize());
    }

    animate() {
        requestAnimationFrame(() => this.animate());

        this.mesh.rotation.x += 0.005;
        this.mesh.rotation.y += 0.005;

        this.renderer.render(this.scene, this.camera);
    }

    onWindowResize() {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }
}

// Initialize animations when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Check if WebGL is available
    if (window.WebGLRenderingContext) {
        try {
            new HeroAnimation();
        } catch (e) {
            console.warn('3D animations disabled: WebGL initialization failed');
        }
    } else {
        console.warn('3D animations disabled: WebGL not supported');
    }
});