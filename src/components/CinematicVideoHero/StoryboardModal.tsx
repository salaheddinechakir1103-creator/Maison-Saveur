import React from 'react';
import { X, Film, Camera, Sparkles, Copy, Check, Clapperboard } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const StoryboardModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const [copiedIndex, setCopiedIndex] = React.useState<number | null>(null);

  if (!isOpen) return null;

  const storyboardShots = [
    {
      shot: '01',
      title: 'Le Joyau Gastronomique (Macro Reveal)',
      timecode: '00:00 – 00:04',
      lens: 'Arri Master Prime 85mm T1.3 · Macro 1:1',
      movement: 'Lent travelling avant (slow cinematic push-in) avec profondeur de champ ultra-courte.',
      visual: 'Médaillon de bœuf Black Angus nappé de réduction brillante au romarin, lamelles de truffe noire d\'Ifrane et feuilles d\'or 24 carats scintillantes.',
      lighting: 'Key light chaude directionnelle à 45°, rim light dorée rasante détachant les textures.',
      prompt: 'Cinematic commercial 8k, slow macro push-in on a Michelin 3-star gourmet dish, seared filet medallion with glossy rosemary glaze, black truffle shavings and sparkling 24k gold leaf, dark obsidian ceramic plate, shallow depth of field, anamorphic bokeh, Unreal Engine 5 render.'
    },
    {
      shot: '02',
      title: 'L\'Atelier du Chef (Précision Chirurgicale)',
      timecode: '00:04 – 00:08',
      lens: 'Cooke Anamorphic /i 50mm T2.3',
      movement: 'Travelling latéral fluide & bascule de point (rack focus) de la pince vers le regard concentré du Chef.',
      visual: 'Chef exécutif en tablier noir posant délicatement une pousse de micro-herbe à la pince fine sur la sphère croustillante.',
      lighting: 'Éclairage tamisé de cuisine professionnelle en inox brossé et halo doré au-dessus du passe.',
      prompt: 'Cinematic documentary commercial of a master chef in sleek black minimalist chef uniform artfully garnishing an exquisite culinary creation with tweezers, soft moody studio lighting, steam rising, shallow depth of field, 35mm film aesthetic, photorealistic.'
    },
    {
      shot: '03',
      title: 'Le Grand Salon Impérial (Majesté Architecturale)',
      timecode: '00:08 – 00:12',
      lens: 'Angénieux Optimo Ultra 12x (Grand Angle 24mm)',
      movement: 'Dolly majestueux descendant au ras des tables drapées d\'ivoire vers les hauts lustres.',
      visual: 'Immense salle feutrée avec lustres en cristal champagne, murs d\'obsidienne et d\'or, banquettes en velours et verres en cristal taillé.',
      lighting: 'Candélabres scintillants et lumière dorée diffuse créant une ambiance royale et intimiste.',
      prompt: 'Cinematic slow dolly tracking shot through a luxury Michelin restaurant dining room at night, magnificent crystal chandeliers glowing warm champagne gold, obsidian marble walls, crisp white linen tables, 8k resolution, architectural digest award winning interior.'
    },
    {
      shot: '04',
      title: 'La Terrasse Jardin sous les Étoiles (Féérie Nocturne)',
      timecode: '00:12 – 00:16',
      lens: 'Zeiss Supreme Prime 35mm T1.5',
      movement: 'Mouvement fluide de grue descendant entre les palmiers vers la fontaine en marbre.',
      visual: 'Terrasse d\'apparat à Marrakech avec lanternes marocaines en cuivre ciselé projetant des dentelles d\'ombres et de lumières dorées.',
      lighting: 'Crépuscule bleu nuit contrasté par les flammes chaudes des lanternes et bougies.',
      prompt: 'High-end luxury restaurant garden terrace at twilight in Marrakech, sculpted Moroccan lanterns casting warm golden patterns, candlelit dining tables, lush palm fronds silhouette against deep blue night sky, cinematic camera glide, photorealistic.'
    },
    {
      shot: '05',
      title: 'Haute Pâtisserie & Dôme d\'Or (Climax & Boucle)',
      timecode: '00:16 – 00:20',
      lens: 'Canon Cine-Servo 100mm Macro',
      movement: 'Rotation orbitale 360° ultra-lente avec scintillement de la lumière sur le sucre filé.',
      visual: 'Entremets au chocolat grand cru Guanaja avec cage en sucre doré filé, framboises fraîches et brume aromatique.',
      lighting: 'Contre-jour spectaculaire mettant en valeur la transparence du sucre caramélisé.',
      prompt: 'Slow motion turntable 360 rotation around a sculptural haute couture chocolate dome with spun golden caramel nest, edible 24k gold leaf, glossy chocolate mirror glaze, dramatic rim lighting, luxury commercial, 8k.'
    }
  ];

  const handleCopy = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto p-4 sm:p-6 flex items-center justify-center bg-black/85 backdrop-blur-md">
      <div className="relative w-full max-w-4xl bg-[#121217] border border-[#d4af37]/40 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 my-8 max-h-[90vh] overflow-y-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10 sticky top-0 bg-[#121217] z-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#d4af37]/20 border border-[#d4af37] flex items-center justify-center text-[#d4af37]">
              <Clapperboard className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#d4af37] font-cinzel block">
                Production Cinématographique
              </span>
              <h2 className="text-xl sm:text-2xl font-serif-luxury font-bold text-[#fcfaf6]">
                Storyboard du Film 3D & Prompts de Rendu
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-[#a1a1aa] hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Introduction */}
        <div className="p-4 bg-[#0a0a0e] border border-white/10 rounded-2xl text-xs text-[#d8d3c8] space-y-2">
          <p>
            Ce storyboard détaille les 5 plans clés du film commercial 3D de <strong>Maison Saveur</strong>, encodé en <strong>1920×1080 Full HD (H.264, 60fps)</strong> dans l'emplacement <code>/public/videos/hero.mp4</code>.
          </p>
          <p className="text-[11px] text-[#a1a1aa]">
            Les prompts ci-dessous sont prêts pour l'exportation vers Runway Gen-3, Luma Dream Machine, Sora ou pour le rendu sous Blender / Cinema 4D / Unreal Engine 5.
          </p>
        </div>

        {/* Shots List */}
        <div className="space-y-6">
          {storyboardShots.map((shot, idx) => (
            <div 
              key={shot.shot}
              className="bg-[#0e0e13] border border-white/10 rounded-2xl p-5 space-y-3 hover:border-[#d4af37]/30 transition-colors"
            >
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/5 pb-2">
                <div className="flex items-center gap-2.5">
                  <span className="px-2.5 py-1 bg-[#d4af37] text-[#0a0a0c] font-cinzel font-bold text-xs rounded-lg">
                    Plan {shot.shot}
                  </span>
                  <h3 className="text-sm font-bold text-[#fcfaf6]">{shot.title}</h3>
                </div>
                <span className="text-xs font-mono text-[#d4af37] font-semibold">{shot.timecode}</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div>
                  <span className="text-[#71717a] block text-[11px] uppercase tracking-wider">Optique & Caméra</span>
                  <p className="text-[#f7f4ee] font-medium">{shot.lens}</p>
                  <p className="text-[#a1a1aa] mt-1">{shot.movement}</p>
                </div>
                <div>
                  <span className="text-[#71717a] block text-[11px] uppercase tracking-wider">Éclairage & Matières</span>
                  <p className="text-[#d8d3c8]">{shot.lighting}</p>
                </div>
              </div>

              <div className="p-3 bg-[#08080b] rounded-xl border border-white/5 space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] uppercase tracking-wider text-[#d4af37] font-cinzel">
                    Prompt de Génération 3D / IA
                  </span>
                  <button
                    onClick={() => handleCopy(shot.prompt, idx)}
                    className="text-[11px] text-[#d4af37] hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    {copiedIndex === idx ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                    <span>{copiedIndex === idx ? 'Copié' : 'Copier'}</span>
                  </button>
                </div>
                <p className="text-[11px] font-mono text-[#a1a1aa] leading-relaxed select-all">
                  "{shot.prompt}"
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="pt-2 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2.5 bg-[#d4af37] text-[#0a0a0c] font-bold text-xs uppercase tracking-wider rounded-xl cursor-pointer"
          >
            Fermer le Storyboard
          </button>
        </div>

      </div>
    </div>
  );
};
