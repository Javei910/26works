'use client';

import { useRef } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { OrbitControls, Environment } from '@react-three/drei';
import * as THREE from 'three';

interface VinylPreview3DProps {
    frontArtUrl?: string;
    labelArtUrl?: string;
}

/**
 * 3D Vinyl Disc Component
 */
function VinylDisc({ labelArtUrl }: { labelArtUrl?: string }) {
    const meshRef = useRef<THREE.Mesh>(null);

    // Slow rotation animation
    useFrame(() => {
        if (meshRef.current) {
            meshRef.current.rotation.z += 0.002;
        }
    });

    // Load label texture
    const labelTexture = labelArtUrl
        ? useLoader(THREE.TextureLoader, labelArtUrl)
        : null;

    return (
        <mesh ref={meshRef} rotation={[-Math.PI / 2, 0, 0]}>
            {/* Vinyl disc geometry */}
            <cylinderGeometry args={[2.5, 2.5, 0.05, 64]} />

            {/* Black vinyl material */}
            <meshStandardMaterial
                color="#0A0A0A"
                metalness={0.8}
                roughness={0.2}
                envMapIntensity={0.5}
            />

            {/* Center label */}
            {labelTexture && (
                <mesh rotation={[0, 0, 0]} position={[0, 0.026, 0]}>
                    <circleGeometry args={[0.8, 32]} />
                    <meshStandardMaterial
                        map={labelTexture}
                        metalness={0.1}
                        roughness={0.9}
                    />
                </mesh>
            )}

            {/* Center hole */}
            <mesh position={[0, 0.027, 0]}>
                <ringGeometry args={[0.1, 0.15, 32]} />
                <meshStandardMaterial color="#1A1A1A" />
            </mesh>

            {/* Grooves effect (thin circles) */}
            {Array.from({ length: 30 }).map((_, i) => {
                const radius = 0.9 + (i * 0.05);
                return (
                    <mesh key={i} position={[0, 0.0251, 0]} rotation={[0, 0, 0]}>
                        <ringGeometry args={[radius, radius + 0.01, 64]} />
                        <meshBasicMaterial color="#050505" transparent opacity={0.3} />
                    </mesh>
                );
            })}
        </mesh>
    );
}

/**
 * Album Jacket Component
 */
function AlbumJacket({ frontArtUrl }: { frontArtUrl?: string }) {
    const frontTexture = frontArtUrl
        ? useLoader(THREE.TextureLoader, frontArtUrl)
        : null;

    return (
        <group position={[-1.5, 0, 0]} rotation={[0, Math.PI / 6, 0]}>
            {/* Front cover */}
            <mesh position={[0, 0, 0.01]}>
                <planeGeometry args={[2.5, 2.5]} />
                {frontTexture ? (
                    <meshStandardMaterial
                        map={frontTexture}
                        metalness={0.1}
                        roughness={0.8}
                    />
                ) : (
                    <meshStandardMaterial color="#2A2A2A" />
                )}
            </mesh>

            {/* Back cover */}
            <mesh position={[0, 0, -0.01]} rotation={[0, Math.PI, 0]}>
                <planeGeometry args={[2.5, 2.5]} />
                <meshStandardMaterial color="#1A1A1A" />
            </mesh>

            {/* Spine */}
            <mesh position={[-1.25, 0, 0]} rotation={[0, Math.PI / 2, 0]}>
                <planeGeometry args={[0.02, 2.5]} />
                <meshStandardMaterial color="#0A0A0A" />
            </mesh>
        </group>
    );
}

/**
 * Main 3D Preview Component
 */
export default function VinylPreview3D({ frontArtUrl, labelArtUrl }: VinylPreview3DProps) {
    return (
        <div className="w-full h-full min-h-[400px] rounded-xl overflow-hidden glass">
            <Canvas
                camera={{ position: [5, 3, 5], fov: 50 }}
                gl={{ antialias: true, alpha: true }}
            >
                {/* Lighting */}
                <ambientLight intensity={0.4} />
                <directionalLight position={[10, 10, 5]} intensity={1} />
                <spotLight position={[-10, 10, -5]} intensity={0.5} />

                {/* 3D Objects */}
                <VinylDisc labelArtUrl={labelArtUrl} />
                <AlbumJacket frontArtUrl={frontArtUrl} />

                {/* Environment */}
                <Environment preset="studio" />

                {/* Controls */}
                <OrbitControls
                    enablePan={false}
                    enableZoom={true}
                    minDistance={4}
                    maxDistance={10}
                    autoRotate
                    autoRotateSpeed={0.5}
                />
            </Canvas>

            {/* Hint text */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-xs text-vinyl-cream/50 pointer-events-none">
                Drag to rotate • Scroll to zoom
            </div>
        </div>
    );
}
