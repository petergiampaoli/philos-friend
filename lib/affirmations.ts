import type { ThemeId } from "./schema";

/**
 * Warm, permission-giving lines used in demo mode and whenever a stored answer
 * predates the affirmation field. Live synthesis writes a bespoke line.
 */
export const AFFIRMATIONS: Partial<Record<ThemeId, string>> = {
  competition:
    "You are allowed to play without turning the score into a verdict on your worth.",
  winning:
    "You are allowed to want the win without making it the price of your own permission.",
  play:
    "You are allowed to enjoy the game before you have earned the ending.",
  fun:
    "You are allowed to have a good time without justifying it with a result.",
  recognition:
    "You are allowed to want to be seen without auditioning for it.",
  status:
    "You are allowed to be a person, not a ranking.",
  desire:
    "You can want more without believing that more is what will finally make you safe.",
  attachment:
    "You are allowed to hold what you love without gripping it into a test.",
  control:
    "You are allowed to put down what was never yours to carry.",
  effort:
    "You are allowed to measure the attempt, not only the outcome.",
  comparison:
    "You are allowed to be a person, not a measuring stick.",
  validation:
    "You are allowed to stop waiting for a verdict that no score can deliver.",
  meaning:
    "You are allowed to make meaning in small, ordinary ways.",
  boredom:
    "You are allowed to be still long enough to hear what you actually want.",
  anxiety:
    "You are allowed to act before the fear goes away.",
  freedom:
    "You are allowed to choose a life that does not fit the sentence you were handed.",
  authenticity:
    "You are allowed to be the person you are when no one is grading you.",
  excellence:
    "You are allowed to practice without turning every attempt into a final exam.",
  community:
    "You are allowed to need people. That is not a failure of independence.",
  work:
    "You are allowed to work without letting work become your whole name.",
  money:
    "You are allowed to want enough without letting enough become a moving target.",
  love:
    "You are allowed to love without turning the other person into proof of your worth.",
  death:
    "You are allowed to let finitude make your life more tender, not smaller.",
  anger:
    "You are allowed to turn anger into a boundary instead of a verdict.",
  envy:
    "You are allowed to let envy point at a want instead of a sentence about your worth.",
  habit:
    "You are allowed to change the cue instead of declaring war on yourself.",
  attention:
    "You are allowed to give one thing your whole attention.",
  impermanence:
    "You are allowed to let things pass without calling their passing a failure.",
  self:
    "You are allowed to be more than the story you have been telling about yourself.",
  duty:
    "You are allowed to ask who an obligation is really for.",
  pleasure:
    "You are allowed to enjoy something without earning it first.",
  friendship:
    "You are allowed to reach first and let yourself be found.",
  power:
    "You are allowed to notice the power you have and use it gently.",
  justice:
    "You are allowed to name what is unfair without waiting to be certain.",
  care:
    "You are allowed to care for someone without disappearing into the care.",
  courage:
    "You are allowed to be afraid and still take the next step.",
  wisdom:
    "You are allowed to change your mind. That is what thinking is for.",
  fate:
    "You are allowed to grieve what happened and still choose what comes next.",
  hope:
    "You are allowed to act as if the better thing were possible.",
  loneliness:
    "You are allowed to make the bid for connection that scares you.",
  education:
    "You are allowed to learn something that has no immediate use.",
  nature:
    "You are allowed to let the world be larger than your current problem.",
  technology:
    "You are allowed to put the tool down and come back to your own attention.",
  language:
    "You are allowed to say the thing more plainly.",
  science:
    "You are allowed to be wrong in public and call it learning.",
  mind:
    "You are allowed to notice a thought without becoming it.",
  art:
    "You are allowed to make something before it is good.",
  joy:
    "You are allowed to notice what is already good without waiting for the other shoe.",
};

const DEFAULT_AFFIRMATION =
  "You are allowed to take what helps and leave the rest. A quote is a companion, not a verdict.";

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
