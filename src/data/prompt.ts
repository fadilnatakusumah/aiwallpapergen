export enum WALLPAPERS_TYPE {
  FUTURISTIC = "Cyberpunk City",
  GALACTIC_SPACE_NEBULA = "Space Nebula",
  MINIMALIST_ABSTRACT_ART = "Abstract Minimalism",
  MYSTICAL = "Enchanted Forest",
  TROPICAL_ISLAND_PARADISE = "Island Paradise",
  VINTAGE_BOTANICAL_ILLUSTRATION = "Botanical Vintage",
}

export const WALLPAPERS_PROMPT: Record<
  WALLPAPERS_TYPE,
  (addedPrompt: string) => string
> = {
  [WALLPAPERS_TYPE.FUTURISTIC]: (addedPrompt = "flying cars") =>
    `A cyberpunk cityscape at night with neon lights and rain-soaked streets. Add ${addedPrompt} for a unique touch.`,
  [WALLPAPERS_TYPE.MYSTICAL]: (addedPrompt = "dragon") =>
    `An enchanted forest at dawn with glowing plants and misty light. Add ${addedPrompt} for more magic.`,
  [WALLPAPERS_TYPE.MINIMALIST_ABSTRACT_ART]: (addedPrompt = "matte") =>
    `A minimalist abstract design with clean lines and modern colors. Enhance it with ${addedPrompt}.`,
  [WALLPAPERS_TYPE.TROPICAL_ISLAND_PARADISE]: (addedPrompt = "birds") =>
    `A tropical island with turquoise water and golden sands under a sunset sky. Add ${addedPrompt} for more ambiance.`,
  [WALLPAPERS_TYPE.GALACTIC_SPACE_NEBULA]: (addedPrompt = "asteroids") =>
    `A colorful galactic nebula with stars and distant planets. Adjust it with ${addedPrompt} for a personal touch.`,
  [WALLPAPERS_TYPE.VINTAGE_BOTANICAL_ILLUSTRATION]: (
    addedPrompt = "rose flowers",
  ) =>
    `A vintage botanical illustration with detailed plants and pastel colors. Add ${addedPrompt} for a tailored style.`,
};

export const SUGGESTION_TYPE_URL = [
  "futuristic",
  "galactic",
  "minimalist",
  "mystical",
  "tropical",
  "vintage",
];
