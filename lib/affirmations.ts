import type { ThemeId } from "./schema";

/**
 * Theme-level fallbacks used in demo mode and when a stored answer predates
 * the affirmation field. Live synthesis writes a quote-specific line.
 */
export const AFFIRMATIONS: Partial<Record<ThemeId, string>> = {
  competition: "The contest can be real without becoming the final word on what you are worth.",
  winning: "Wanting the win is human; making it the price of your own permission is the trap.",
  play: "The game is worth playing before you are good at it, and before it proves anything.",
  fun: "Enjoyment is evidence enough that something is worth doing.",
  recognition: "Being seen is a need, not a performance review.",
  status: "A ranking can describe a race; it cannot describe a person.",
  desire: "Wanting more is not the problem; the promise you attach to more is.",
  attachment: "Hold what you love firmly enough to care, loosely enough to breathe.",
  control: "You can put down what was never yours to carry.",
  effort: "Measure the attempt with the same care you give the outcome.",
  comparison: "A measuring stick can tell you about a race, not about a person.",
  validation: "The verdict you are waiting for cannot be earned from a scoreboard.",
  meaning: "Meaning is often made in small, ordinary acts rather than grand conclusions.",
  boredom: "Stillness is not emptiness; it is where you can hear what you actually want.",
  anxiety: "The next step can be taken before the fear has finished arguing.",
  freedom: "A life can be chosen, not only inherited.",
  authenticity: "The person you are when no one is grading you is still you.",
  excellence: "Practice can be a place to learn, not a final exam you keep failing.",
  community: "Needing people is not a failure of independence.",
  work: "Work can be important without becoming your whole name.",
  money: "Enough is a number you can define before it defines you.",
  love: "Love can be real without turning another person into proof of your worth.",
  death: "Finitude can make life more tender, not smaller.",
  anger: "Anger can become a boundary without becoming a verdict.",
  envy: "Envy can point at a want without becoming a sentence about your worth.",
  habit: "A habit can be changed at the cue, without declaring war on yourself.",
  attention: "One thing, given your whole attention, is a way back to the world.",
  impermanence: "Things can pass without their passing being a failure.",
  self: "You are more than the story you have been telling about yourself.",
  duty: "An obligation can be examined without making you a bad person.",
  pleasure: "Pleasure does not have to be earned before it is enjoyed.",
  friendship: "A first reach can be an act of courage, not a debt.",
  power: "Power can be noticed and used gently.",
  justice: "An unfairness can be named without waiting to be certain about everything.",
  care: "Care can hold someone without disappearing into the holding.",
  courage: "Fear can be present while the next step is still taken.",
  wisdom: "Changing your mind is what thinking is for.",
  fate: "What happened can be grieved while what comes next is still chosen.",
  hope: "The better thing can be acted toward before it is guaranteed.",
  loneliness: "The bid for connection that scares you is still worth making.",
  education: "Learning something with no immediate use can still change you.",
  nature: "The world can be larger than the problem currently filling your view.",
  technology: "The tool can be put down while you come back to your own attention.",
  language: "The plain sentence is often the brave one.",
  science: "Being wrong in public can be a form of learning.",
  mind: "A thought can be noticed without becoming the whole of you.",
  art: "Something can be made before it is good.",
  joy: "What is already good can be noticed without waiting for the other shoe.",
};

const DEFAULT_AFFIRMATION = "A quote can be a companion, not a verdict.";

export function affirmationFor(
  tags: readonly ThemeId[],
  fallback: ThemeId = "meaning",
): string {
  for (const tag of tags) {
    const line = AFFIRMATIONS[tag];
    if (line) return line;
  }
  return AFFIRMATIONS[fallback] ?? DEFAULT_AFFIRMATION;
}
