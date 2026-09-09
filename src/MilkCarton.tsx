import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function createFrontTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 1024;
  const ctx = canvas.getContext('2d')!;

  // Background - vibrant red
  ctx.fillStyle = '#CC0000';
  ctx.fillRect(0, 0, 512, 1024);

  // Gradient overlay for depth
  const gradient = ctx.createLinearGradient(0, 0, 512, 0);
  gradient.addColorStop(0, 'rgba(0,0,0,0.1)');
  gradient.addColorStop(0.5, 'rgba(255,255,255,0.05)');
  gradient.addColorStop(1, 'rgba(0,0,0,0.1)');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 512, 1024);

  // Milk splash effect behind logo
  ctx.save();
  ctx.beginPath();
  ctx.ellipse(256, 420, 160, 100, 0, 0, Math.PI * 2);
  ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
  ctx.fill();
  
  // Splash droplets
  for (let i = 0; i < 8; i++) {
    const angle = (i / 8) * Math.PI * 2;
    const x = 256 + Math.cos(angle) * (140 + Math.random() * 40);
    const y = 420 + Math.sin(angle) * (80 + Math.random() * 30);
    ctx.beginPath();
    ctx.ellipse(x, y, 15 + Math.random() * 10, 10 + Math.random() * 8, angle, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(255, 255, 255, 0.25)';
    ctx.fill();
  }
  ctx.restore();

  // Purple circle logo background
  ctx.beginPath();
  ctx.arc(256, 420, 100, 0, Math.PI * 2);
  ctx.fillStyle = '#4A1A6B';
  ctx.fill();

  // "a2" text in logo
  ctx.fillStyle = '#FFFFFF';
  ctx.font = 'bold 80px Arial, sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('a2', 256, 415);

  // "THE a2 MILK COMPANY" text around circle
  ctx.font = 'bold 14px Arial, sans-serif';
  ctx.fillStyle = '#FFFFFF';
  ctx.fillText('THE a2 MILK COMPANY', 256, 330);

  // "FEEL THE DIFFERENCE" tagline
  ctx.font = 'italic 16px Arial, sans-serif';
  ctx.fillStyle = '#FFFFFF';
  ctx.fillText('FEEL THE DIFFERENCE', 256, 530);

  // "MAY HELP SOME AVOID DISCOMFORT" badge - upper right
  ctx.save();
  ctx.translate(420, 120);
  ctx.beginPath();
  ctx.ellipse(0, 0, 65, 45, 0, 0, Math.PI * 2);
  ctx.fillStyle = '#FFD700';
  ctx.fill();
  ctx.strokeStyle = '#CC8800';
  ctx.lineWidth = 2;
  ctx.stroke();
  ctx.fillStyle = '#333';
  ctx.font = 'bold 10px Arial, sans-serif';
  ctx.fillText('MAY HELP', 0, -15);
  ctx.fillText('SOME AVOID', 0, 0);
  ctx.fillText('DISCOMFORT', 0, 15);
  ctx.restore();

  // "EASIER ON DIGESTION" text
  ctx.font = 'bold 18px Arial, sans-serif';
  ctx.fillStyle = '#FFFFFF';
  ctx.fillText('EASIER ON DIGESTION', 256, 600);

  // "WHOLE MILK" large text
  ctx.font = 'bold 56px Arial, sans-serif';
  ctx.fillStyle = '#FFFFFF';
  ctx.fillText('WHOLE MILK', 256, 700);

  // "GRADE A • VITAMIN D • ULTRA-PASTEURIZED"
  ctx.font = '14px Arial, sans-serif';
  ctx.fillStyle = '#FFFFFF';
  ctx.fillText('GRADE A • VITAMIN D • ULTRA-PASTEURIZED', 256, 740);

  // Cow silhouettes at bottom
  ctx.fillStyle = '#4A1A6B';
  // Adult cow silhouette
  ctx.beginPath();
  ctx.ellipse(180, 870, 50, 30, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.beginPath();
  ctx.ellipse(155, 850, 18, 15, -0.3, 0, Math.PI * 2);
  ctx.fill();
  // Legs
  ctx.fillRect(145, 895, 8, 30);
  ctx.fillRect(165, 895, 8, 30);
  ctx.fillRect(195, 895, 8, 30);
  ctx.fillRect(215, 895, 8, 30);
  // Ears
  ctx.beginPath();
  ctx.ellipse(145, 840, 8, 5, -0.5, 0, Math.PI * 2);
  ctx.fill();
  ctx.beginPath();
  ctx.ellipse(165, 840, 8, 5, 0.5, 0, Math.PI * 2);
  ctx.fill();

  // Calf silhouette
  ctx.beginPath();
  ctx.ellipse(300, 890, 30, 20, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.beginPath();
  ctx.ellipse(280, 875, 12, 10, -0.3, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillRect(278, 905, 6, 20);
  ctx.fillRect(292, 905, 6, 20);
  ctx.fillRect(310, 905, 6, 20);
  ctx.fillRect(322, 905, 6, 20);

  // Pink/red horizon line behind cows
  ctx.fillStyle = 'rgba(255, 150, 150, 0.3)';
  ctx.fillRect(0, 830, 512, 80);

  // 59 FL OZ at very bottom
  ctx.font = 'bold 16px Arial, sans-serif';
  ctx.fillStyle = '#FFFFFF';
  ctx.fillText('59 FL OZ (1.74L)', 256, 970);

  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}

function createBackTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 1024;
  const ctx = canvas.getContext('2d')!;

  // Background - red
  ctx.fillStyle = '#CC0000';
  ctx.fillRect(0, 0, 512, 1024);

  // White info panel background
  ctx.fillStyle = '#FFFFFF';
  ctx.fillRect(30, 50, 452, 400);
  ctx.strokeStyle = '#333';
  ctx.lineWidth = 2;
  ctx.strokeRect(30, 50, 452, 400);

  // "The a2 Milk® Difference" title
  ctx.fillStyle = '#4A1A6B';
  ctx.font = 'bold 22px Arial, sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('The a2 Milk® Difference', 256, 90);

  // 4-step infographic
  const steps = [
    { num: '1', text: 'Cows originally produced milk with only the A2 protein.' },
    { num: '2', text: 'Today, ordinary milk contains A1 and A2 proteins.' },
    { num: '3', text: 'a2 Milk® comes from cows that produce only A2 protein.' },
    { num: '4', text: 'Research suggests a2 Milk® may help avoid discomfort.' },
  ];

  steps.forEach((step, i) => {
    const y = 130 + i * 80;
    // Step circle
    ctx.beginPath();
    ctx.arc(80, y, 22, 0, Math.PI * 2);
    ctx.fillStyle = '#4A1A6B';
    ctx.fill();
    ctx.fillStyle = '#FFFFFF';
    ctx.font = 'bold 20px Arial, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(step.num, 80, y + 7);
    
    // Step text
    ctx.fillStyle = '#333';
    ctx.font = '14px Arial, sans-serif';
    ctx.textAlign = 'left';
    ctx.fillText(step.text, 115, y + 5);

    // Arrow between steps
    if (i < 3) {
      ctx.beginPath();
      ctx.moveTo(80, y + 25);
      ctx.lineTo(80, y + 55);
      ctx.strokeStyle = '#4A1A6B';
      ctx.lineWidth = 2;
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(75, y + 50);
      ctx.lineTo(80, y + 58);
      ctx.lineTo(85, y + 50);
      ctx.fillStyle = '#4A1A6B';
      ctx.fill();
    }
  });

  // Nutrition Facts panel
  ctx.fillStyle = '#FFFFFF';
  ctx.fillRect(30, 480, 452, 350);
  ctx.strokeStyle = '#000';
  ctx.lineWidth = 3;
  ctx.strokeRect(30, 480, 452, 350);

  ctx.fillStyle = '#000';
  ctx.font = 'bold 24px Arial, sans-serif';
  ctx.textAlign = 'left';
  ctx.fillText('Nutrition Facts', 50, 515);

  ctx.font = '13px Arial, sans-serif';
  ctx.fillText('Serving Size: 1 Cup (240 mL)', 50, 545);
  ctx.fillText('Servings Per Container: About 7', 50, 565);

  ctx.strokeStyle = '#000';
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.moveTo(40, 575);
  ctx.lineTo(472, 575);
  ctx.stroke();

  ctx.font = 'bold 14px Arial, sans-serif';
  ctx.fillText('Calories 160', 50, 600);

  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(40, 610);
  ctx.lineTo(472, 610);
  ctx.stroke();

  const nutritionLines = [
    'Total Fat 9g .............. 12%',
    '  Saturated Fat 5g ....... 25%',
    'Cholesterol 35mg ........ 12%',
    'Sodium 130mg ............ 6%',
    'Total Carbs 12g ......... 4%',
    '  Total Sugars 12g',
    '    Added Sugars 0g ..... 0%',
    'Protein 8g .............. 16%',
  ];

  nutritionLines.forEach((line, i) => {
    ctx.font = '13px Arial, sans-serif';
    ctx.fillText(line, 50, 635 + i * 22);
  });

  // Vitamins section
  ctx.font = '12px Arial, sans-serif';
  ctx.fillText('Vitamin D 2.5mcg ....... 15%', 50, 810);
  ctx.fillText('Calcium 300mg .......... 25%', 50, 828);

  // "We love our cows!" section
  ctx.fillStyle = '#FFFFFF';
  ctx.fillRect(30, 860, 452, 130);
  ctx.strokeStyle = '#4A1A6B';
  ctx.lineWidth = 2;
  ctx.strokeRect(30, 860, 452, 130);

  ctx.fillStyle = '#4A1A6B';
  ctx.font = 'bold 18px Arial, sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('We love our cows! 🐄', 256, 895);

  ctx.fillStyle = '#333';
  ctx.font = '13px Arial, sans-serif';
  ctx.fillText('• Not treated with growth hormone rBST', 256, 925);
  ctx.fillText('• Validus™ certified for animal welfare', 256, 950);
  ctx.fillText('• Fed a plant-based diet', 256, 975);

  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}

function createSideTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 384;
  canvas.height = 1024;
  const ctx = canvas.getContext('2d')!;

  // Background - red
  ctx.fillStyle = '#CC0000';
  ctx.fillRect(0, 0, 384, 1024);

  // White panel for serving suggestions
  ctx.fillStyle = '#FFFFFF';
  ctx.fillRect(20, 100, 344, 500);
  ctx.strokeStyle = '#ddd';
  ctx.lineWidth = 1;
  ctx.strokeRect(20, 100, 344, 500);

  // Title
  ctx.fillStyle = '#4A1A6B';
  ctx.font = 'bold 20px Arial, sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('Serving Suggestions', 192, 140);

  // Cereal bowl illustration
  ctx.beginPath();
  ctx.ellipse(192, 280, 80, 50, 0, 0, Math.PI * 2);
  ctx.fillStyle = '#F5F5F5';
  ctx.fill();
  ctx.strokeStyle = '#CCC';
  ctx.lineWidth = 2;
  ctx.stroke();

  // Cereal flakes
  for (let i = 0; i < 12; i++) {
    const x = 150 + Math.random() * 84;
    const y = 260 + Math.random() * 30;
    ctx.beginPath();
    ctx.ellipse(x, y, 8, 5, Math.random() * Math.PI, 0, Math.PI * 2);
    ctx.fillStyle = '#D4A574';
    ctx.fill();
  }

  // Berries
  const berryColors = ['#8B0000', '#4B0082', '#FF6347'];
  for (let i = 0; i < 6; i++) {
    const x = 160 + Math.random() * 64;
    const y = 255 + Math.random() * 25;
    ctx.beginPath();
    ctx.arc(x, y, 6, 0, Math.PI * 2);
    ctx.fillStyle = berryColors[i % 3];
    ctx.fill();
  }

  // Banana slices
  for (let i = 0; i < 3; i++) {
    const x = 170 + i * 25;
    const y = 290;
    ctx.beginPath();
    ctx.ellipse(x, y, 10, 6, 0.3, 0, Math.PI * 2);
    ctx.fillStyle = '#FFE135';
    ctx.fill();
    ctx.strokeStyle = '#DAA520';
    ctx.lineWidth = 1;
    ctx.stroke();
  }

  // Latte cup illustration
  ctx.beginPath();
  ctx.moveTo(152, 420);
  ctx.lineTo(145, 500);
  ctx.lineTo(239, 500);
  ctx.lineTo(232, 420);
  ctx.closePath();
  ctx.fillStyle = '#FFFFFF';
  ctx.fill();
  ctx.strokeStyle = '#CCC';
  ctx.lineWidth = 2;
  ctx.stroke();

  // Latte art (heart shape)
  ctx.beginPath();
  ctx.ellipse(192, 450, 25, 18, 0, 0, Math.PI * 2);
  ctx.fillStyle = '#F5E6D3';
  ctx.fill();
  ctx.beginPath();
  ctx.moveTo(192, 440);
  ctx.bezierCurveTo(182, 430, 170, 440, 192, 460);
  ctx.bezierCurveTo(214, 440, 202, 430, 192, 440);
  ctx.fillStyle = '#8B4513';
  ctx.fill();

  // Handle
  ctx.beginPath();
  ctx.arc(240, 460, 15, -Math.PI / 2, Math.PI / 2);
  ctx.strokeStyle = '#CCC';
  ctx.lineWidth = 3;
  ctx.stroke();

  // "Enjoy with cereal or in your coffee!"
  ctx.fillStyle = '#333';
  ctx.font = '14px Arial, sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('Enjoy with cereal', 192, 540);
  ctx.fillText('or in your coffee!', 192, 560);

  // Ingredients section
  ctx.fillStyle = '#FFFFFF';
  ctx.fillRect(20, 640, 344, 120);
  ctx.strokeStyle = '#ddd';
  ctx.strokeRect(20, 640, 344, 120);

  ctx.fillStyle = '#333';
  ctx.font = 'bold 16px Arial, sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('Ingredients', 192, 670);
  ctx.font = '14px Arial, sans-serif';
  ctx.fillText('Milk, Vitamin D3', 192, 700);
  ctx.fillText('Contains: Milk', 192, 725);

  // rBST Free badge
  ctx.beginPath();
  ctx.arc(192, 850, 55, 0, Math.PI * 2);
  ctx.fillStyle = '#FFFFFF';
  ctx.fill();
  ctx.strokeStyle = '#4A1A6B';
  ctx.lineWidth = 3;
  ctx.stroke();

  ctx.fillStyle = '#4A1A6B';
  ctx.font = 'bold 14px Arial, sans-serif';
  ctx.fillText('rBST', 192, 835);
  ctx.font = 'bold 12px Arial, sans-serif';
  ctx.fillText('FREE', 192, 855);
  ctx.font = '10px Arial, sans-serif';
  ctx.fillText('No artificial', 192, 875);
  ctx.fillText('growth hormones', 192, 890);

  // Kosher symbol
  ctx.beginPath();
  ctx.arc(192, 960, 25, 0, Math.PI * 2);
  ctx.fillStyle = '#FFFFFF';
  ctx.fill();
  ctx.strokeStyle = '#000';
  ctx.lineWidth = 2;
  ctx.stroke();
  ctx.fillStyle = '#000';
  ctx.font = 'bold 20px Arial, sans-serif';
  ctx.fillText('UD', 192, 967);

  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}

function createSideTexture2(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 384;
  canvas.height = 1024;
  const ctx = canvas.getContext('2d')!;

  // Background - red
  ctx.fillStyle = '#CC0000';
  ctx.fillRect(0, 0, 384, 1024);

  // Large "a2" branding
  ctx.fillStyle = '#FFFFFF';
  ctx.font = 'bold 120px Arial, sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('a2', 192, 250);

  // "WHOLE MILK" vertical text
  ctx.save();
  ctx.translate(192, 550);
  ctx.rotate(-Math.PI / 2);
  ctx.font = 'bold 48px Arial, sans-serif';
  ctx.fillStyle = '#FFFFFF';
  ctx.fillText('WHOLE MILK', 0, 0);
  ctx.restore();

  // Barcode area
  ctx.fillStyle = '#FFFFFF';
  ctx.fillRect(92, 750, 200, 150);

  // Barcode lines
  ctx.fillStyle = '#000';
  for (let i = 0; i < 40; i++) {
    const x = 102 + i * 4.5;
    const width = Math.random() > 0.5 ? 3 : 1.5;
    ctx.fillRect(x, 770, width, 100);
  }

  // Barcode number
  ctx.font = '12px monospace';
  ctx.textAlign = 'center';
  ctx.fillText('0 94000 12345 6', 192, 895);

  // Recycling symbol
  ctx.beginPath();
  ctx.arc(192, 960, 25, 0, Math.PI * 2);
  ctx.strokeStyle = '#FFFFFF';
  ctx.lineWidth = 2;
  ctx.stroke();
  ctx.font = '24px Arial, sans-serif';
  ctx.fillStyle = '#FFFFFF';
  ctx.fillText('♻', 192, 968);

  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}

function createTopTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 256;
  const ctx = canvas.getContext('2d')!;

  // Red background
  ctx.fillStyle = '#CC0000';
  ctx.fillRect(0, 0, 256, 256);

  // Gable fold lines
  ctx.strokeStyle = 'rgba(0,0,0,0.2)';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(0, 128);
  ctx.lineTo(256, 128);
  ctx.stroke();

  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}

function createBottomTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 256;
  const ctx = canvas.getContext('2d')!;

  ctx.fillStyle = '#AA0000';
  ctx.fillRect(0, 0, 256, 256);

  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}

export default function MilkCarton() {
  const groupRef = useRef<THREE.Group>(null);

  // Create textures
  const frontTexture = useMemo(() => createFrontTexture(), []);
  const backTexture = useMemo(() => createBackTexture(), []);
  const sideTexture = useMemo(() => createSideTexture(), []);
  const sideTexture2 = useMemo(() => createSideTexture2(), []);
  const topTexture = useMemo(() => createTopTexture(), []);
  const bottomTexture = useMemo(() => createBottomTexture(), []);

  // Gentle floating animation
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.05;
    }
  });

  // Carton dimensions
  const width = 1.8;
  const height = 3.6;
  const depth = 1.2;

  // Materials for each face of the box
  // Order: +x (right), -x (left), +y (top), -y (bottom), +z (front), -z (back)
  const materials = useMemo(() => [
    new THREE.MeshStandardMaterial({ map: sideTexture2 }),   // right
    new THREE.MeshStandardMaterial({ map: sideTexture }),    // left
    new THREE.MeshStandardMaterial({ map: topTexture }),     // top
    new THREE.MeshStandardMaterial({ map: bottomTexture }),  // bottom
    new THREE.MeshStandardMaterial({ map: frontTexture }),   // front
    new THREE.MeshStandardMaterial({ map: backTexture }),    // back
  ], [frontTexture, backTexture, sideTexture, sideTexture2, topTexture, bottomTexture]);

  return (
    <group ref={groupRef}>
      {/* Main carton body */}
      <mesh position={[0, 0, 0]} material={materials}>
        <boxGeometry args={[width, height, depth]} />
      </mesh>

      {/* Gable top - triangular prism shape */}
      <GableTop width={width} depth={depth} />

      {/* White screw cap */}
      <Cap />
    </group>
  );
}

function GableTop({ width, depth }: { width: number; depth: number }) {
  const gableHeight = 0.6;

  const geometry = useMemo(() => {
    const shape = new THREE.Shape();
    const hw = width / 2;
    
    // Create the gable cross-section shape
    shape.moveTo(-hw, 0);
    shape.lineTo(-hw, 0);
    shape.lineTo(0, gableHeight);
    shape.lineTo(hw, 0);
    shape.lineTo(-hw, 0);

    const extrudeSettings = {
      steps: 1,
      depth: depth,
      bevelEnabled: false,
    };

    return new THREE.ExtrudeGeometry(shape, extrudeSettings);
  }, [width, depth, gableHeight]);

  return (
    <group position={[0, 1.8, -depth / 2]}>
      <mesh geometry={geometry}>
        <meshStandardMaterial color="#CC0000" />
      </mesh>
      {/* Front slope */}
      <mesh position={[0, gableHeight / 2, depth / 2]} rotation={[0.55, 0, 0]}>
        <planeGeometry args={[width * 0.98, 0.72]} />
        <meshStandardMaterial color="#BB0000" />
      </mesh>
      {/* Back slope */}
      <mesh position={[0, gableHeight / 2, -depth / 2 + depth]} rotation={[-0.55, Math.PI, 0]}>
        <planeGeometry args={[width * 0.98, 0.72]} />
        <meshStandardMaterial color="#BB0000" />
      </mesh>
    </group>
  );
}

function Cap() {
  return (
    <group position={[0, 2.35, 0]}>
      {/* Cap base */}
      <mesh>
        <cylinderGeometry args={[0.22, 0.24, 0.15, 32]} />
        <meshStandardMaterial color="#F5F5F5" roughness={0.3} />
      </mesh>
      {/* Cap top */}
      <mesh position={[0, 0.1, 0]}>
        <cylinderGeometry args={[0.2, 0.22, 0.12, 32]} />
        <meshStandardMaterial color="#FFFFFF" roughness={0.2} metalness={0.1} />
      </mesh>
      {/* Cap ridges */}
      {Array.from({ length: 24 }).map((_, i) => {
        const angle = (i / 24) * Math.PI * 2;
        const x = Math.cos(angle) * 0.23;
        const z = Math.sin(angle) * 0.23;
        return (
          <mesh key={i} position={[x, 0.05, z]} rotation={[0, -angle, 0]}>
            <boxGeometry args={[0.015, 0.12, 0.02]} />
            <meshStandardMaterial color="#E8E8E8" />
          </mesh>
        );
      })}
    </group>
  );
}
