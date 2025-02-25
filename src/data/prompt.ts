export enum WALLPAPERS_TYPE {
  FUTURISTIC = "Cyberpunk City",
  MYSTICAL = "Enchanted Forest",
  MINIMALIST_ABSTRACT_ART = "Abstract Minimalism",
  TROPICAL_ISLAND_PARADISE = "Island Paradise",
  GALACTIC_SPACE_NEBULA = "Space Nebula",
  VINTAGE_BOTANICAL_ILLUSTRATION = "Botanical Vintage",
  // FUTURISTIC = "Futuristic Cyberpunk Cityscape",
  // MYSTICAL = "Mystical Enchanted Forest",
  // MINIMALIST_ABSTRACT_ART = "Minimalist Abstract Art",
  // TROPICAL_ISLAND_PARADISE = "Tropical Island Paradise",
  // GALACTIC_SPACE_NEBULA = "Galactic Space Nebula",
  // VINTAGE_BOTANICAL_ILLUSTRATION = "Vintage Botanical Illustration",
}

export const WALLPAPERS_PROMPT: Record<
  WALLPAPERS_TYPE,
  (addedPrompt: string) => string
> = {
  [WALLPAPERS_TYPE.FUTURISTIC]: (addedPrompt = "flying cars") =>
    `An ultra-detailed, 8K cyberpunk cityscape at night, with neon-lit skyscrapers, glowing holograms, and vibrant signage reflecting off rain-soaked streets. The scene is ultra-realistic, with atmospheric fog and a sense of motion as futuristic vehicles pass by. Customize the scene with ${addedPrompt} to create an immersive experience.`,
  [WALLPAPERS_TYPE.MYSTICAL]: (addedPrompt = "dragon") =>
    `A high-definition, ultra-realistic enchanted forest at dawn, captured in 8K resolution. Sunlight filters through a misty canopy of ancient trees, casting magical beams of light on glowing plants and mushrooms. The scene feels serene and alive, with intricate textures on each leaf and bark. Add ${addedPrompt} to enhance the magical atmosphere.`,
  [WALLPAPERS_TYPE.MINIMALIST_ABSTRACT_ART]: (addedPrompt = "matte") =>
    `A minimalist 8K abstract wallpaper featuring clean lines, geometric shapes, and a modern color palette. The design balances bold color blocks with subtle gradients for a sophisticated, timeless look that adapts well to desktop and mobile screens. Enhance the look with ${addedPrompt} for a more customized style.`,
  [WALLPAPERS_TYPE.TROPICAL_ISLAND_PARADISE]: (addedPrompt = "birds") =>
    `A vibrant, photo-realistic 8K tropical island scene, with turquoise water gently lapping against golden sands. Palm trees sway in a light breeze under a glowing sunset sky in pink and orange hues. The scene captures the beauty of paradise with detailed textures in the water and sand. Add ${addedPrompt} for an even more immersive feel.`,
  [WALLPAPERS_TYPE.GALACTIC_SPACE_NEBULA]: (addedPrompt = "asteroids") =>
    `An ultra-HD, 8K cosmic wallpaper featuring a stunning galactic nebula with colorful clouds of interstellar dust, stars of varying brightness, and planets in the distance. The nebula’s intricate details give depth and a sense of endless wonder. Adjust with ${addedPrompt} to create a personalized view of the cosmos.`,
  [WALLPAPERS_TYPE.VINTAGE_BOTANICAL_ILLUSTRATION]: (
    addedPrompt = "rose flowers",
  ) =>
    `An 8K resolution vintage botanical illustration of various plants and flowers, captured with highly realistic textures and detailed linework. The muted, pastel color palette is inspired by antique botanical art, giving it a classical, timeless look that adapts beautifully to desktop and mobile. Add ${addedPrompt} for a unique, tailored touch.`,
};
