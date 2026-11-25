import type { Answer, PacketThinker, ThemeId } from "./schema";
import type { Retrieval } from "./retrieve";
import { THEME_QUESTIONS, THEME_PRACTICES, THEME_LABELS, THEME_TRIGGERS } from "./themes";
import { affirmationFor } from "./affirmations";

export function normalizePrompt(prompt: string): string {
  return prompt
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[’']/g, "'")
    .replace(/[^a-z0-9\s?]/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/\?+$/g, "")
    .trim();
}

function family(thinker: PacketThinker): string {
  return thinker.tradition.split("/")[0].trim().toLowerCase();
}

const THESIS: Partial<Record<ThemeId, string>> = {
  competition:
    "You are treating the contest as the price of admission to joy. It usually isn't.",
  winning: "The win may be a permission slip, not a source of joy.",
  play: "The obstacle is not in the way of the fun; it is where the fun lives.",
  fun: "You may not need more fun. You may need permission to take it seriously.",
  recognition: "What looks like a desire to win may be a desire to be seen.",
  status: "You are playing a game whose scoreboard you did not design.",
  desire: "The want is real. The story that its satisfaction will settle you is not.",
  attachment: "What you are holding may be holding you.",
  control: "You are trying to control the result because you do not trust the effort.",
  effort: "The result is not the report card on your effort. It is information.",
  comparison:
    "Comparison is a story that turns another person's life into evidence against yours.",
  validation: "You are waiting for a verdict that no score can finally deliver.",
  meaning: "The question is not whether the game matters, but what you are letting it mean.",
  boredom: "Boredom is often the sound of a desire you have not listened to.",
  anxiety: "The threat is partly imagined; the next action is not.",
  freedom: "You are freer than the role you are performing, and more responsible than you'd like.",
  authenticity: "The mask is not the problem. Forgetting you chose it is.",
  excellence: "Excellence is a practice, not a verdict.",
  community: "You are not a self-made unit. You are a person among people.",
  work: "Work can be a practice, a necessity, or an identity. Confusing them is the trap.",
  money: "Money buys options; status buys a cage with a nicer view.",
  love: "Love is not a prize for being enough. It is a practice of attention.",
  death: "Finitude is not a reason to stop playing; it is a reason to stop playing for the wrong audience.",
  anger: "Anger is often a boundary that has not found its words.",
  envy: "Envy is a clue to a desire, not a verdict on your worth.",
  habit: "You do not need more willpower. You need a different cue.",
  attention: "Your attention is being spent. The question is who is spending it.",
  impermanence: "The game will end. That is what makes it a game.",
  self: "You are not the score, the role, or the story. You are the one who can revise them.",
  duty: "A duty you cannot explain is often someone else's fear wearing your name.",
  pleasure: "Pleasure is not a reward for productivity. It is part of a life.",
  friendship: "You may be waiting for proof that you are wanted before you risk asking.",
  power: "Power is easiest to ignore when you have it.",
  justice: "The norm is not the same as the right.",
  care: "Care is not a feeling. It is a practice of responsiveness.",
  courage: "Courage is not the absence of fear. It is action with fear in the room.",
  wisdom: "The first step is not certainty. It is a better question.",
  fate: "You did not choose the weather. You choose what to do in it.",
  hope: "Hope is not optimism. It is a reason to act.",
  loneliness: "Loneliness is not proof that you are unlovable. It is a signal that connection is needed.",
  education: "Learning is not the accumulation of answers. It is the capacity to be changed.",
  nature: "Nature is not a setting for human drama. It is a community you belong to.",
  technology: "The tool is shaping the hand that holds it.",
  language: "The words you have determine the world you can notice.",
  science: "Science is a discipline of being wrong in public.",
  mind: "The mind is not a thing you have. It is a process you are.",
  art: "Art is not decoration. It is a way of making experience visible.",
  joy: "Joy is not the reward for winning. It is a capacity you can practice.",
};

const APPLICATION: Partial<Record<ThemeId, string>> = {
  competition:
    "The contest is real, but it is not the whole of your situation. Notice what you are asking the win to prove.",
  winning:
    "Ask what the win is supposed to make true about you. If the answer is 'that I am enough,' the scoreboard is doing work it cannot do.",
  play: "Keep the game. Loosen the grip on the verdict.",
  fun: "Let enjoyment be evidence that the activity is worth doing, not a reward for being good at it.",
  recognition:
    "The person you want to be seen by matters more than the number of people who see you.",
  status: "Ask who designed the ranking and whether you actually want the prize at the top.",
  desire: "Separate the want from the promise you have attached to it.",
  attachment: "Practice holding the thing loosely while you still care for it.",
  control: "Put your effort where your agency is, and let the result be information rather than a verdict.",
  effort: "Measure the practice, not the outcome. The outcome is not entirely yours.",
  comparison: "The comparison is not a measurement of your worth. It is a measurement of your attention.",
  validation: "The verdict you are waiting for cannot be earned.",
  meaning: "Ask what the activity is for, not just whether you are winning at it.",
  boredom: "Stay with the boredom long enough to hear what it is asking for.",
  anxiety: "Name the next action. The future is not a task you can complete today.",
  freedom: "Notice the rule you are following. You may not be able to break it, but you can stop pretending it is nature.",
  authenticity: "Find one place where you are performing and try being a little more literal.",
  excellence: "Practice the part you avoid, not the part you already do well.",
  community: "Ask for help on purpose. Let yourself be seen needing something.",
  work: "Ask whether you chose this work or inherited its scoreboard.",
  money: "Write down what money is supposed to buy you. Circle the part that is not status.",
  love: "Ask what the other person needs, not just what they reflect back to you.",
  death: "Let finitude simplify your priorities.",
  anger: "Turn the anger into a sentence about a boundary, not a verdict about a person.",
  envy: "Translate the envy into a want, then take one step toward it.",
  habit: "Change the cue, not the willpower.",
  attention: "Do one thing with your full attention. Notice how quickly you reach for an escape.",
  impermanence: "Name one thing you are treating as permanent. Say goodbye to it a little early.",
  self: "Describe yourself without a role, a ranking, or a relationship. What is left?",
  duty: "Name the obligation you resent. Ask who it is actually for.",
  pleasure: "Savor one pleasure slowly. Stop before it becomes consumption.",
  friendship: "Reach out first to one person you have been waiting to hear from.",
  power: "Notice where you have power and where you are performing powerlessness.",
  justice: "Pick one unfairness you have accepted as normal. Say what it would take to change.",
  care: "Ask what the person in front of you needs before telling them what you think.",
  courage: "Name the fear, then name the smallest brave act that is not a performance.",
  wisdom: "Write down one belief you have not tested. Test it this week.",
  fate: "Separate what happened from the story you tell about what it means.",
  hope: "Act as if the better outcome were possible for one hour. See what changes.",
  loneliness: "Make one bid for connection that could be refused. The bid is the practice.",
  education: "Learn something this week that has no immediate use.",
  nature: "Spend twenty minutes outside without a screen. Let the scale of the world correct you.",
  technology: "Choose one app and remove it for a day. Notice what fills the space.",
  language: "Notice a word you use loosely. Ask what it would mean to use it precisely.",
  science: "Ask what evidence would change your mind. If nothing would, it is not a belief about the world.",
  mind: "Watch one thought arrive and leave without following it.",
  art: "Make something small and bad on purpose. Let it be an experiment, not a verdict.",
  joy: "Notice one thing that is already good and give it thirty seconds of attention.",
};

const SYNTHESIS: Partial<Record<ThemeId, string>> = {
  competition:
    "The contest can be a practice of excellence or a machine for validation. The difference is whether the result is the point or the byproduct.",
  winning:
    "The win can be a byproduct of attention or a substitute for it. The first leaves you freer; the second requires the next win.",
  play: "Play needs stakes, but stakes are not verdicts. Keep the obstacle; drop the verdict.",
  fun: "Fun is not the opposite of seriousness. It is what seriousness feels like when you are not being watched.",
  recognition:
    "Recognition is a human need, but a scoreboard is a poor mirror. The win can be real and still not be the recognition you want.",
  status:
    "Status is a story told by a group. You can enjoy the game without letting the group write the ending.",
  desire:
    "Desire is not the enemy. The enemy is the belief that one more object will make you safe.",
  control:
    "You cannot control the result, but you can control the quality of attention you bring to it. That is not a small thing.",
  meaning:
    "Meaning is not found in the score. It is made in the relationship between what you do and why you do it.",
  anxiety: "The future is not a place you can live in. The next action is.",
  work: "Work can be an expression of freedom or a substitute for it. The difference is whether you chose it.",
  love: "Love is not a reward for being good. It is a practice of showing up for a free person.",
};

const PRIMARY_PRIORITY: ThemeId[] = [
  "work",
  "money",
  "love",
  "friendship",
  "death",
  "competition",
  "winning",
  "status",
  "recognition",
  "comparison",
  "validation",
  "control",
  "desire",
  "attachment",
  "anxiety",
  "courage",
  "freedom",
  "authenticity",
  "self",
  "meaning",
  "boredom",
  "habit",
  "attention",
  "pleasure",
  "joy",
  "fun",
  "play",
  "excellence",
  "community",
  "care",
  "justice",
  "power",
  "wisdom",
  "hope",
  "loneliness",
  "education",
  "nature",
  "technology",
  "language",
  "science",
  "mind",
  "art",
];

function firstSentence(text: string, limit = 230): string {
  const match = text.match(/^.*?[.!?](?:\s|$)/);
  const sentence = (match?.[0] ?? text).trim();
  return sentence.length > limit ? `${sentence.slice(0, limit).trim()}…` : sentence;
}

function chooseTemplateLenses(packet: PacketThinker[], primary: ThemeId): PacketThinker[] {
  const onThemeQuoted = packet.filter(
    (thinker) => thinker.tags.includes(primary) && thinker.quotes.length > 0,
  );
  const onTheme = packet.filter((thinker) => thinker.tags.includes(primary));
  const quoted = packet.filter((thinker) => thinker.quotes.length > 0);

  const ordered: PacketThinker[] = [];
  const seen = new Set<string>();
  for (const thinker of [...onThemeQuoted, ...onTheme, ...quoted, ...packet]) {
    if (seen.has(thinker.id)) continue;
    seen.add(thinker.id);
    ordered.push(thinker);
  }

  const chosen: PacketThinker[] = [];
  for (const thinker of ordered) {
    if (chosen.length === 3) break;
    if (chosen.some((existing) => family(existing) === family(thinker))) continue;
    chosen.push(thinker);
  }
  for (const thinker of ordered) {
    if (chosen.length === 3) break;
    if (!chosen.some((existing) => existing.id === thinker.id)) chosen.push(thinker);
  }
  return chosen;
}

export function composeTemplateAnswer(retrieval: Retrieval, packet: PacketThinker[]): Answer {
  const directThemes = retrieval.themeHits.filter((hit) => hit.direct).map((hit) => hit.id);
  const primary: ThemeId =
    PRIMARY_PRIORITY.find((theme) => directThemes.includes(theme)) ??
    directThemes[0] ??
    retrieval.themes[0] ??
    "meaning";
  const lenses = chooseTemplateLenses(packet, primary).slice(0, 3);

  const built = lenses.map((thinker, index) => {
    const idea = thinker.ideas[0];
    const triggers = THEME_TRIGGERS[primary] ?? [];
    const relatedQuote = thinker.quotes.find((quote) =>
      triggers.some((trigger) => quote.text.toLowerCase().includes(trigger)),
    );
    const application =
      index === 0
        ? (APPLICATION[primary] ??
          `For your question, this lens suggests paying attention to what ${thinker.name} would call the shape of the situation rather than the verdict.`)
        : index === 1
          ? `${thinker.name} would ask what this idea costs you when you ignore it. Name one place in the next week where the cost is already visible.`
          : `The test is not whether this sounds true. It is what you would stop doing if it were. Name that thing, then name the first step.`;

    return {
      thinkerId: thinker.id,
      quoteId: (relatedQuote ?? thinker.quotes[0])?.id ?? null,
      claim: idea.title,
      theory: `${idea.summary} Put simply, ${thinker.oneLine}`,
      application,
      affirmation: affirmationFor(thinker.tags, primary),
    };
  });

  const synthesisIntro = built.map((lens) => firstSentence(lens.theory)).join(" ");

  return {
    thesis: THESIS[primary] ?? "The question is better than the answer, and the answer should change what you do next.",
    lenses: built,
    synthesis: `${synthesisIntro} ${SYNTHESIS[primary] ?? "Each lens sees a different part of the same knot. The point is not to pick the most comforting one, but to let the tension change what you do next."}`,
    practice:
      THEME_PRACTICES[primary] ??
      "Write down one small action that follows from this idea, and do it today.",
    question:
      THEME_QUESTIONS[primary] ??
      "What would change if you took this seriously?",
  };
}

const FIXTURES: Record<string, Answer> = {
  "why do i need to win to have fun": {
    thesis:
      "You don't need to win. You need stakes. Winning is the most legible stake you've found — and the one that gives you permission to enjoy the game.",
    lenses: [
      {
        thinkerId: "suits",
        quoteId: "q_suits_1",
        claim: "Play is the point, not the prize",
        theory:
          "Bernard Suits defines a game as the voluntary attempt to overcome unnecessary obstacles. The obstacle is not what stands between you and the fun; it is the fun. You accept the rules, the difficulty, and the chance of losing because the constrained activity is worth doing for its own sake. That is what he calls the lusory attitude.",
        application:
          "If a game only counts when you win, you have quietly turned play into work with a scoreboard. The question is not how to stop caring about winning. It is how to care about the obstacle enough that the result becomes secondary.",
        affirmation:
          "You are allowed to play before you are good at it. The obstacle is not a debt you owe; it is the shape of the joy.",
      },
      {
        thinkerId: "beauvoir",
        quoteId: "q_beauvoir_1",
        claim: "You may want recognition, not victory",
        theory:
          "Simone de Beauvoir describes the self as constituted through the gaze of others. To be seen only as a winner is to become an object defined by a role. The need to win can be a need to be confirmed as a subject — someone whose effort matters — rather than a need for the trophy itself.",
        application:
          "Ask whose scoreboard you are playing on. If the answer is 'the people who never quite saw me,' the win will not satisfy you for long. The recognition you want has to come from a relationship, not a ranking.",
        affirmation:
          "You are allowed to want to be seen without turning yourself into a scoreboard.",
      },
      {
        thinkerId: "epicurus",
        quoteId: "q_epicurus_2",
        claim: "The desire to win is a desire you can edit",
        theory:
          "Epicurus sorts desires into natural and necessary, natural but unnecessary, and neither. Competitive victory is usually in the second or third category: it can be pleasant, but it is not required for tranquility. The pain comes from treating a preferred extra as a necessity.",
        application:
          "Keep the game. Drop the premise that your peace depends on the result. Play with appetite, but do not hand the scoreboard the keys to your mood.",
        affirmation:
          "You can want more without believing that more is what will finally make you safe.",
      },
    ],
    synthesis:
      "Suits says the obstacle is the fun. Beauvoir says the audience is the trap. Epicurus says the craving is editable. Together they suggest that you do not need to win; you need a stake you can hold lightly. The win can be a byproduct of attention, not the condition of permission.",
    practice:
      "Before the next game, name one win you control — one brave shot, one moment of full attention — and one result you are willing to let be weather. Play for the first. Let the second happen.",
    question: "If no one ever saw the score, what would you still play?",
  },
};

const FIXTURE_ALIASES: Record<string, string[]> = {
  "why do i need to win to have fun": ["win", "fun", "need"],
};

export function getFixture(prompt: string, packet: PacketThinker[]): Answer | null {
  const key = normalizePrompt(prompt);
  let answer = FIXTURES[key];

  if (!answer) {
    for (const [fixtureKey, tokens] of Object.entries(FIXTURE_ALIASES)) {
      if (tokens.every((token) => key.includes(token))) {
        answer = FIXTURES[fixtureKey];
        break;
      }
    }
  }

  if (!answer) return null;

  const thinkerIds = new Set(packet.map((thinker) => thinker.id));
  const quoteIds = new Set(packet.flatMap((thinker) => thinker.quotes.map((quote) => quote.id)));

  for (const lens of answer.lenses) {
    if (!thinkerIds.has(lens.thinkerId)) return null;
    if (lens.quoteId && !quoteIds.has(lens.quoteId)) return null;
  }

  return answer;
}

export function describeTheme(theme: ThemeId | undefined): string {
  if (!theme) return "the question";
  return THEME_LABELS[theme] ?? theme;
}
