import { Canvas, useLoader, useThree } from '@react-three/fiber';
import { OrbitControls, Stars, Line } from '@react-three/drei';
import * as THREE from 'three';
import { useState, useRef, useEffect, forwardRef, useImperativeHandle } from 'react';


const CameraController = ({ cameraPosition }) => {
    const { camera } = useThree();  // Accessing the camera from the Canvas context

    let animationId;
    useEffect(() => {
        // Helper function to animate camera movement
        const animateCameraMove = (newCameraPosition) => {
            let startPos = camera.position.clone();  // Starting position
            let endPos = new THREE.Vector3(...newCameraPosition);  // Ending position
            let progress = 0;

            function animate() {
                if (progress < 1) {
                    progress += 0.01;  // Adjust speed as needed
                    let currentPos = startPos.lerp(endPos, progress);  // Interpolating the position
                    camera.position.copy(currentPos);  // Setting camera position

                    animationId = requestAnimationFrame(animate);  // Continuously animate until finished
                } else {
                    cancelAnimationFrame(animationId);  // Stop animation once complete
                }
            }
            animate();
        };

        animateCameraMove(cameraPosition);

        // Cleanup to cancel any ongoing animation on component unmount or update
        return () => cancelAnimationFrame(animationId);
    }, [cameraPosition, camera]);  // Run when cameraPosition changes

    return null;
};

const PlanetMesh = ({ planet, onClick }) => {
    const { camera, size } = useThree();
    const meshRef = useRef();

    const texture = useLoader(THREE.TextureLoader, "globes/planet-4.jpg");
    return (
        <mesh
            ref={meshRef}
            position={[planet.x * 50, planet.y * 50, planet.z * 50]}
            onClick={() => onClick(planet)} // Handle clicks to track the planets
        >
            <sphereGeometry args={[window.screen.width <= 768 ? 1.5 : 1, 32, 32]} />
            <meshStandardMaterial
                map={texture}
                color={`hsl(${planet.st_teff}, 100%, 95%)`}
                emissive={`hsl(${planet.st_teff}, 50%, 30%)`}
                emissiveIntensity={0.9}
                metalness={0.1}
                roughness={0.5}
                transparent={true}
                opacity={0.9}
            />
        </mesh>
    );
};

const ScreenCapture = forwardRef((props, ref) => {
    const { gl, scene, camera } = useThree();
    const captureScreenshot = async () => {
        const nameConstellation = window.prompt('Enter the name of the constellation:');
        try {
            const originalSize = gl.getSize(new THREE.Vector2());
            const resolutionMultiplier = 2;
            const newWidth = originalSize.x * resolutionMultiplier;
            const newHeight = originalSize.y * resolutionMultiplier;
            gl.setSize(newWidth, newHeight, false);
            gl.render(scene, camera);
            const screenshotDataUrl = gl.domElement.toDataURL('image/png');
            gl.setSize(originalSize.x, originalSize.y, false);
            const link = document.createElement('a');
            link.href = screenshotDataUrl;
            link.download = `${nameConstellation || 'constellation'}.png`;
            link.click();
        } catch (error) {
            console.log('Error capturing screenshot:', error.message);
        }
    };

    useImperativeHandle(ref, () => ({
        captureScreenshot,
    }));

    return null;
});

const Exovision = ({ data }) => {
    const [autoRotate, setAutoRotate] = useState(false);
    const [rotationSpeed, setRotationSpeed] = useState(1);
    const [clickedPlanets, setClickedPlanets] = useState([]); // To track clicked planets
    const [cameraPosition, setCameraPosition] = useState([]);
    const [viewFromPlanet, setViewFromPlanet] = useState(null)
    const [isDrawConstelletion, setIsDrawConstelletion] = useState(false)
    const canvasRef = useRef();
    const screenCaptureRef = useRef();
    const [saving, setSaving] = useState(false)
    const [isHiddenController, setIsHiddenController] = useState(true)

    function resetCameraPosition() {
        setCameraPosition([0, 0, 100])
    }

    useEffect(() => {
        resetCameraPosition();
    }, [])

    // Handle planet click to form constellation points
    const handlePlanetClick = (planet) => {
        const cemeraPos = [planet.x * 50, planet.y * 50, planet.z * 50];
        if (isDrawConstelletion) {
            setClickedPlanets((prev) => [...prev, cemeraPos]);
        } else {
            setViewFromPlanet(planet);
            setCameraPosition(cemeraPos);
        }
    };

    // Handle clearing constellations
    const clearConstellation = () => {
        setClickedPlanets([]);
    };

    const handleDrawConstelletion = (v) => {
        setIsDrawConstelletion(v);
        setAutoRotate(false);
    }

    const handleAutoRotate = (v) => {
        setAutoRotate(v);
        setIsDrawConstelletion(false);
    }

    return (
        <div className="relative h-screen bg-black">
            <Canvas camera={{ position: cameraPosition, fov: window.screen.width <= 768 ? 110 : 90 }} ref={canvasRef}>
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} />

                {/* <CameraAdjust /> */}

                <OrbitControls
                    enableZoom={window.screen.width <= 768 ? true : viewFromPlanet === null}
                    maxZoom={20}
                    zoomToCursor={false}
                    maxDistance={100}
                    minDistance={5}
                    autoRotate={autoRotate}
                    autoRotateSpeed={rotationSpeed}
                />
                <Stars
                    radius={500}
                    depth={50}
                    count={5000}
                    factor={10}
                    saturation={0}
                    fade={false}
                    speed={0}
                />



                {/* Render planets */}
                {data.map((planet, idx) => (
                    <PlanetMesh key={idx} planet={planet} onClick={handlePlanetClick} />
                ))}

                {/* Render lines for constellations */}
                {clickedPlanets.length > 1 && (
                    <Line
                        points={clickedPlanets} // First layer - Neon blue
                        color={`hsl(220, 100%, 70%)`} // Neon blue
                        transparent={true}
                        opacity={0.9}
                        lineWidth={1} // Thicker for outer layer
                    />
                )}

                <CameraController cameraPosition={cameraPosition} />
                <ScreenCapture ref={screenCaptureRef} captureScreenshot={(screenshot) => console.log(screenshot)} />
            </Canvas>

            {/* Controllers */}
            <div className="absolute flex md:flex-col flex-row-reverse gap-2 w-xl text-white w-80" style={{ right: `10px`, bottom: window.screen.width <= 786 ? '100px' : `10px` }}>

                <span className="md:hidden text-right border px-5 pt-2" onClick={() => setIsHiddenController(!isHiddenController)}>{isHiddenController ? 'v' : '^'}</span>
                {
                    isHiddenController && (
                        <div className='flex flex-col'>
                            {viewFromPlanet && (
                                <div className="border border-white p-4 rounded"
                                >
                                    <h3>Sky of the {viewFromPlanet.pl_name}</h3>
                                    <p>Orbital Distance: {viewFromPlanet.pl_orbsmax}</p>
                                    <p>Star Temp: {viewFromPlanet.st_teff} K</p>
                                    <p>Distance: {viewFromPlanet.sy_dist} light-years</p>
                                    <p>Discovery: {viewFromPlanet.disc_year}</p>
                                </div>
                            )}
                            <div className="border border-white p-4 rounded flex flex-col gap-2 w-full">
                                {autoRotate && <div>
                                    <label htmlFor="rotation-speed">Rotation speed</label>
                                    <input id="rotation-speed" type="range" min="1" max="100" value={rotationSpeed} step="5" className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700" onChange={e => setRotationSpeed(e.target.value)} />
                                </div>}
                                <div>
                                    <label className="inline-flex items-center cursor-pointer" htmlFor="rotation">
                                        <input type="checkbox" className="sr-only peer" onChange={e => handleAutoRotate(e.target.checked)} id='rotation' checked={autoRotate} />
                                        <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                                        <span className="ms-3 text-sm font-medium text-white-900 dark:text-white-300">Auto rotation</span>
                                    </label>
                                </div>
                                <div>
                                    <label className="inline-flex items-center cursor-pointer" htmlFor="draw">
                                        <input type="checkbox" className="sr-only peer" onChange={e => handleDrawConstelletion(e.target.checked)} id='draw' checked={isDrawConstelletion} />
                                        <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                                        <span className="ms-3 text-sm font-medium text-white-900 dark:text-white-300">Draw Constelletion</span>
                                    </label>
                                </div>
                                {cameraPosition[0] !== 0 && cameraPosition[1] !== 0 && cameraPosition[2] !== 100 && <button onClick={() => { resetCameraPosition(); setViewFromPlanet(null) }} className="p-2 rounded border border-white hover:bg-white hover:text-black">Exit View</button>}
                                {clickedPlanets.length > 0 && (
                                    <>
                                        <button onClick={() => setClickedPlanets(prev => prev.slice(0, -2))} className="p-2 rounded border border-white hover:bg-white hover:text-black">Undo</button>
                                        <button onClick={clearConstellation} className="p-2 rounded border border-white hover:bg-white hover:text-black">Clear Drawing</button>
                                        <button onClick={() => {
                                            if (screenCaptureRef.current) {
                                                setSaving(true)
                                                screenCaptureRef.current.captureScreenshot().finally(() => setSaving(false)); // Call the exposed method
                                            }
                                        }} className="p-2 rounded border border-white hover:bg-white hover:text-black">Save Constellation</button>
                                    </>
                                )}
                            </div>
                        </div>
                    )
                }
            </div>
        </div>
    );
};

export default Exovision;
