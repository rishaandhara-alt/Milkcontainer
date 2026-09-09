import { Canvas } from '@react-three/fiber';
import { OrbitControls, Html } from '@react-three/drei';
import { Suspense, useState } from 'react';
import MilkCarton from './MilkCarton';

function LoadingFallback() {
  return (
    <Html center>
      <div className="text-white text-lg font-semibold animate-pulse">Loading 3D Model...</div>
    </Html>
  );
}

function Scene() {
  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 8, 5]} intensity={1.2} castShadow />
      <directionalLight position={[-3, 4, -5]} intensity={0.4} />
      <pointLight position={[0, 5, 3]} intensity={0.6} color="#ffffff" />
      <pointLight position={[-2, 0, 4]} intensity={0.3} color="#a78bfa" />
      
      {/* Milk Carton */}
      <MilkCarton />

      {/* Ground plane for shadow effect */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2.2, 0]} receiveShadow>
        <planeGeometry args={[20, 20]} />
        <meshStandardMaterial color="#1a1a2e" transparent opacity={0.5} />
      </mesh>

      {/* Controls */}
      <OrbitControls
        enablePan={true}
        enableZoom={true}
        enableRotate={true}
        autoRotate={true}
        autoRotateSpeed={1.5}
        minDistance={3}
        maxDistance={12}
        minPolarAngle={Math.PI / 6}
        maxPolarAngle={Math.PI / 1.5}
      />
    </>
  );
}

export default function App() {
  const [activeTab, setActiveTab] = useState<'overview' | 'nutrition' | 'features'>('overview');

  return (
    <div className="w-full h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex flex-col overflow-hidden">
      {/* Header */}
      <header className="flex-shrink-0 px-6 py-4 flex items-center justify-between bg-black/30 backdrop-blur-sm border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-purple-700 flex items-center justify-center">
            <span className="text-white font-bold text-sm">a2</span>
          </div>
          <div>
            <h1 className="text-white font-bold text-xl">a2 Whole Milk</h1>
            <p className="text-gray-400 text-xs">3D Packaging Diagram</p>
          </div>
        </div>
        <div className="hidden md:flex items-center gap-4 text-sm text-gray-300">
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
            Interactive 3D
          </span>
          <span className="text-gray-500">|</span>
          <span>Drag to rotate • Scroll to zoom</span>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        {/* 3D Canvas */}
        <div className="flex-1 relative">
          <Canvas
            camera={{ position: [4, 2, 5], fov: 45 }}
            shadows
            gl={{ antialias: true }}
          >
            <Suspense fallback={<LoadingFallback />}>
              <Scene />
            </Suspense>
          </Canvas>

          {/* Overlay instructions */}
          <div className="absolute bottom-4 left-4 bg-black/50 backdrop-blur-sm rounded-lg px-4 py-2 text-white/70 text-sm">
            <p>🖱️ Left click + drag to rotate</p>
            <p>🔍 Scroll to zoom in/out</p>
            <p>📱 Touch & drag on mobile</p>
          </div>

          {/* Size indicator */}
          <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-sm rounded-lg px-4 py-3 text-white">
            <p className="text-xs text-gray-400 mb-1">Container Size</p>
            <p className="font-bold text-lg">59 FL OZ</p>
            <p className="text-sm text-gray-300">(1.74 Liters)</p>
          </div>
        </div>

        {/* Info Panel */}
        <div className="w-full lg:w-96 flex-shrink-0 bg-black/40 backdrop-blur-md border-l border-white/10 overflow-y-auto">
          {/* Tab navigation */}
          <div className="flex border-b border-white/10">
            {(['overview', 'nutrition', 'features'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 py-3 px-4 text-sm font-medium capitalize transition-colors ${
                  activeTab === tab
                    ? 'text-white border-b-2 border-purple-500 bg-white/5'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Tab content */}
          <div className="p-5">
            {activeTab === 'overview' && (
              <div className="space-y-4">
                <div className="bg-gradient-to-r from-purple-900/50 to-red-900/50 rounded-xl p-4 border border-purple-500/20">
                  <h3 className="text-white font-bold text-lg mb-2">The a2 Milk® Difference</h3>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    Unlike conventional milk containing both A1 and A2 proteins, a2 Milk® comes from cows 
                    selectively bred to produce only the natural A2 beta-casein protein.
                  </p>
                </div>

                <div className="space-y-3">
                  <h4 className="text-white font-semibold text-sm uppercase tracking-wider">Packaging Details</h4>
                  <div className="grid grid-cols-2 gap-2">
                    <InfoCard label="Format" value="Gable-Top Carton" icon="📦" />
                    <InfoCard label="Color" value="Vibrant Red" icon="🔴" />
                    <InfoCard label="Cap" value="White Screw-Top" icon="⚪" />
                    <InfoCard label="Logo" value="Purple Circle" icon="🟣" />
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="text-white font-semibold text-sm uppercase tracking-wider">Front Panel</h4>
                  <ul className="text-gray-300 text-sm space-y-2">
                    <li className="flex items-start gap-2">
                      <span className="text-purple-400 mt-0.5">•</span>
                      Large "a2" logo in white on purple circle
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-purple-400 mt-0.5">•</span>
                      "THE a2 MILK COMPANY" branding
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-purple-400 mt-0.5">•</span>
                      "FEEL THE DIFFERENCE" tagline
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-purple-400 mt-0.5">•</span>
                      Milk splash graphic around logo
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-purple-400 mt-0.5">•</span>
                      Cow & calf silhouettes at bottom
                    </li>
                  </ul>
                </div>

                <div className="space-y-3">
                  <h4 className="text-white font-semibold text-sm uppercase tracking-wider">Side Panels</h4>
                  <ul className="text-gray-300 text-sm space-y-2">
                    <li className="flex items-start gap-2">
                      <span className="text-red-400 mt-0.5">•</span>
                      <span><strong>Serving suggestions:</strong> Cereal bowl with berries & bananas, latte art</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-400 mt-0.5">•</span>
                      <span><strong>Education:</strong> 4-step infographic explaining A2 protein difference</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-400 mt-0.5">•</span>
                      <span><strong>Back:</strong> Nutrition facts, cow welfare pledge, ingredients</span>
                    </li>
                  </ul>
                </div>
              </div>
            )}

            {activeTab === 'nutrition' && (
              <div className="space-y-4">
                <div className="bg-white rounded-xl p-4 text-black">
                  <h3 className="font-bold text-lg border-b-2 border-black pb-2 mb-3">Nutrition Facts</h3>
                  <p className="text-sm text-gray-600">Serving Size: 1 Cup (240 mL)</p>
                  <p className="text-sm text-gray-600 mb-3">Servings Per Container: About 7</p>
                  
                  <div className="border-t-4 border-black pt-2">
                    <p className="font-bold text-xl">Calories 160</p>
                  </div>
                  
                  <div className="border-t border-black pt-2 mt-2 space-y-1">
                    <NutrientRow name="Total Fat" amount="9g" dv="12%" bold />
                    <NutrientRow name="  Saturated Fat" amount="5g" dv="25%" indent />
                    <NutrientRow name="  Trans Fat" amount="0g" dv="" indent />
                    <NutrientRow name="Cholesterol" amount="35mg" dv="12%" />
                    <NutrientRow name="Sodium" amount="130mg" dv="6%" />
                    <NutrientRow name="Total Carbohydrate" amount="12g" dv="4%" bold />
                    <NutrientRow name="  Dietary Fiber" amount="0g" dv="0%" indent />
                    <NutrientRow name="  Total Sugars" amount="12g" dv="" indent />
                    <NutrientRow name="    Added Sugars" amount="0g" dv="0%" indent2 />
                    <NutrientRow name="Protein" amount="8g" dv="16%" bold />
                  </div>

                  <div className="border-t border-black pt-2 mt-2 space-y-1">
                    <NutrientRow name="Vitamin D" amount="2.5mcg" dv="15%" />
                    <NutrientRow name="Calcium" amount="300mg" dv="25%" />
                    <NutrientRow name="Iron" amount="0mg" dv="0%" />
                    <NutrientRow name="Potassium" amount="400mg" dv="8%" />
                    <NutrientRow name="Vitamin A" amount="114mcg" dv="15%" />
                  </div>
                </div>

                <div className="bg-gradient-to-r from-green-900/50 to-green-800/50 rounded-xl p-4 border border-green-500/20">
                  <h4 className="text-green-300 font-semibold mb-2">Ingredients</h4>
                  <p className="text-gray-300 text-sm">Milk, Vitamin D3</p>
                  <p className="text-gray-400 text-xs mt-2">Contains: Milk</p>
                </div>

                <div className="bg-gradient-to-r from-blue-900/50 to-blue-800/50 rounded-xl p-4 border border-blue-500/20">
                  <h4 className="text-blue-300 font-semibold mb-2">Processing</h4>
                  <p className="text-gray-300 text-sm">Ultra-Pasteurized for extended shelf life and safety</p>
                </div>
              </div>
            )}

            {activeTab === 'features' && (
              <div className="space-y-4">
                <div className="bg-gradient-to-r from-purple-900/50 to-purple-800/50 rounded-xl p-4 border border-purple-500/20">
                  <h4 className="text-purple-300 font-semibold mb-2">🥛 A2 Protein</h4>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    Contains only A2 beta-casein protein. Research suggests the A1 protein found in regular milk 
                    can release BCM-7 during digestion, which may cause discomfort. A2 milk lacks this amino acid sequence.
                  </p>
                </div>

                <div className="bg-gradient-to-r from-green-900/50 to-green-800/50 rounded-xl p-4 border border-green-500/20">
                  <h4 className="text-green-300 font-semibold mb-2">🌿 Easier on Digestion</h4>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    Targets consumers who experience bloating, gas, or stomach discomfort after drinking regular milk 
                    but are not necessarily lactose intolerant.
                  </p>
                </div>

                <div className="bg-gradient-to-r from-yellow-900/50 to-yellow-800/50 rounded-xl p-4 border border-yellow-500/20">
                  <h4 className="text-yellow-300 font-semibold mb-2">🐄 Cow Welfare</h4>
                  <ul className="text-gray-300 text-sm space-y-2">
                    <li className="flex items-start gap-2">
                      <span className="text-yellow-400">✓</span>
                      Not treated with growth hormone rBST
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-yellow-400">✓</span>
                      Validus™ certified for animal welfare
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-yellow-400">✓</span>
                      Cows fed a plant-based diet
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-yellow-400">✓</span>
                      Sourced from family farms in the US
                    </li>
                  </ul>
                </div>

                <div className="bg-gradient-to-r from-blue-900/50 to-blue-800/50 rounded-xl p-4 border border-blue-500/20">
                  <h4 className="text-blue-300 font-semibold mb-2">📋 Certifications</h4>
                  <div className="flex flex-wrap gap-2">
                    <CertBadge text="UD Kosher Dairy" />
                    <CertBadge text="Non-GMO Project Verified" />
                    <CertBadge text="rBST Free" />
                    <CertBadge text="Grade A" />
                    <CertBadge text="Ultra-Pasteurized" />
                    <CertBadge text="Vitamin D Fortified" />
                  </div>
                </div>

                <div className="bg-gradient-to-r from-red-900/50 to-red-800/50 rounded-xl p-4 border border-red-500/20">
                  <h4 className="text-red-300 font-semibold mb-2">🏢 About a2 Milk Company</h4>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    International dairy company originating in New Zealand with significant US operations. 
                    Core mission: genetic selection of cows to ensure milk contains only A2 beta-casein protein, 
                    distinguishing from majority of commercial dairy.
                  </p>
                </div>

                <div className="bg-gradient-to-r from-indigo-900/50 to-indigo-800/50 rounded-xl p-4 border border-indigo-500/20">
                  <h4 className="text-indigo-300 font-semibold mb-2">🎯 Target Audience</h4>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    Health-conscious consumers who experience digestive discomfort with regular milk, 
                    looking for "cleaner" dairy options and willing to pay a premium for digestive comfort.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function InfoCard({ label, value, icon }: { label: string; value: string; icon: string }) {
  return (
    <div className="bg-white/5 rounded-lg p-3 border border-white/10">
      <div className="flex items-center gap-2 mb-1">
        <span className="text-lg">{icon}</span>
        <span className="text-gray-400 text-xs">{label}</span>
      </div>
      <p className="text-white text-sm font-medium">{value}</p>
    </div>
  );
}

function NutrientRow({ name, amount, dv, bold, indent, indent2 }: { 
  name: string; amount: string; dv: string; bold?: boolean; indent?: boolean; indent2?: boolean 
}) {
  return (
    <div className={`flex justify-between text-sm ${bold ? 'font-bold' : ''} ${indent ? 'pl-3' : ''} ${indent2 ? 'pl-6' : ''}`}>
      <span>{name}</span>
      <span>{amount} {dv && <span className="text-gray-500">{dv}</span>}</span>
    </div>
  );
}

function CertBadge({ text }: { text: string }) {
  return (
    <span className="bg-blue-500/20 text-blue-300 text-xs px-2 py-1 rounded-full border border-blue-500/30">
      {text}
    </span>
  );
}
