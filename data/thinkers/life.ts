import type { Thinker } from "@/lib/schema";

export const lifeThinkers: Thinker[] = [
  {
    id: "schiller",
    name: "Friedrich Schiller",
    dates: "1759–1805",
    tradition: "German Idealism / Aesthetics",
    era: "Enlightenment",
    region: "Germany",
    tags: ["play", "freedom", "art", "meaning", "education"],
    oneLine:
      "He argued that beauty educates freedom, and that we become fully human only when we play.",
    ideas: [
      {
        title: "The play drive",
        summary:
          "Schiller distinguishes a form drive (reason, order) and a sense drive (material, feeling). The play drive reconciles them in aesthetic experience, where we are both determined and free.",
      },
      {
        title: "Aesthetic education",
        summary:
          "Art does not merely decorate life; it trains the capacity for freedom. Beauty gives us practice in harmonizing duty and inclination, reason and sensibility.",
      },
    ],
    quotes: [
      {
        id: "q_schiller_1",
        text: "Man only plays when he is in the fullest sense of the word a human being, and he is only fully a human being when he plays.",
        work: "Letters on the Aesthetic Education of Man",
        locator: "15th letter",
        translator: "Reginald Snell",
        status: "verified",
      },
    ],
    keyWorks: ["Letters on the Aesthetic Education of Man", "On the Sublime"],
  },
  {
    id: "suits",
    name: "Bernard Suits",
    dates: "1925–2014",
    tradition: "Philosophy of Play",
    era: "20th century",
    region: "Canada",
    tags: ["play", "competition", "fun", "winning", "meaning"],
    oneLine:
      "A game is the voluntary attempt to overcome unnecessary obstacles — and that is exactly where the fun lives.",
    ideas: [
      {
        title: "The lusory attitude",
        summary:
          "Players accept rules that forbid the easiest route to a goal. The obstacle is not in the way of the game; it is the game. This voluntary acceptance is the 'lusory attitude.'",
      },
      {
        title: "The grasshopper's utopia",
        summary:
          "Suits imagines a world where all instrumental work is done and asks what remains. His answer: game-playing, because it is activity whose point is internal to the activity itself.",
      },
    ],
    quotes: [
      {
        id: "q_suits_1",
        text: "Playing a game is the voluntary attempt to overcome unnecessary obstacles.",
        work: "The Grasshopper: Games, Life and Utopia",
        locator: "ch. 3",
        translator: "Bernard Suits",
        status: "verified",
      },
    ],
    keyWorks: ["The Grasshopper: Games, Life and Utopia"],
  },
  {
    id: "huizinga",
    name: "Johan Huizinga",
    dates: "1872–1945",
    tradition: "Cultural History / Philosophy of Play",
    era: "20th century",
    region: "Netherlands",
    tags: ["play", "fun", "community", "art", "competition"],
    oneLine:
      "Play is older than culture, and the magic circle of the game is where culture gets its forms.",
    ideas: [
      {
        title: "The magic circle",
        summary:
          "Play sets aside a bounded time and place with its own rules. Inside the circle, ordinary life is suspended, and that suspension is what makes the activity meaningful.",
      },
      {
        title: "The spoil-sport",
        summary:
          "The person who plays only to win, or who refuses the rules, destroys the play-world. Play depends on a shared willingness to be bound by the fiction.",
      },
    ],
    quotes: [
      {
        id: "q_huizinga_1",
        text: "Play is older than culture.",
        work: "Homo Ludens",
        locator: "ch. 1",
        translator: "F. C. Hull",
        status: "verified",
      },
    ],
    keyWorks: ["Homo Ludens"],
  },
  {
    id: "schopenhauer",
    name: "Arthur Schopenhauer",
    dates: "1788–1860",
    tradition: "Pessimism / German Idealism",
    era: "19th century",
    region: "Germany",
    tags: ["desire", "boredom", "anxiety", "art", "care", "death"],
    oneLine:
      "Life swings between pain and boredom because desire is endless; art and compassion offer temporary release.",
    ideas: [
      {
        title: "The will",
        summary:
          "Behind the world of representation is a blind striving will. We never permanently satisfy it; achieving one goal only creates space for the next craving.",
      },
      {
        title: "Aesthetic contemplation",
        summary:
          "In art, especially music, we escape the individual will for a moment and become a pure subject of knowing. The relief is real but temporary.",
      },
    ],
    quotes: [
      {
        id: "q_schopenhauer_1",
        text: "The world is my representation.",
        work: "The World as Will and Representation",
        locator: "§1",
        translator: "R. B. Haldane and J. Kemp",
        status: "verified",
      },
    ],
    keyWorks: ["The World as Will and Representation", "Essays and Aphorisms"],
  },
  {
    id: "weil",
    name: "Simone Weil",
    dates: "1909–1943",
    tradition: "Mysticism / Social Philosophy",
    era: "20th century",
    region: "France",
    tags: ["attention", "work", "care", "meaning", "community"],
    oneLine:
      "Attention is a form of generosity, and affliction is the place where the soul is most in need of it.",
    ideas: [
      {
        title: "Attention",
        summary:
          "Weil treats attention as a moral and spiritual faculty: the capacity to wait on reality without grasping it. Prayer, study, and friendship all depend on this quality.",
      },
      {
        title: "Affliction and rootedness",
        summary:
          "Affliction is not just suffering but social degradation and inner deracination. Justice requires giving people roots in work, community, and place.",
      },
    ],
    quotes: [
      {
        id: "q_weil_1",
        text: "Attention is the rarest and purest form of generosity.",
        work: "Letter to Joë Bousquet",
        locator: "1942",
        translator: "Richard Rees",
        status: "verified",
      },
    ],
    keyWorks: ["Gravity and Grace", "The Need for Roots", "Waiting for God"],
  },
  {
    id: "thoreau",
    name: "Henry David Thoreau",
    dates: "1817–1862",
    tradition: "American Transcendentalism",
    era: "19th century",
    region: "United States",
    tags: ["nature", "freedom", "attention", "work", "meaning"],
    oneLine:
      "He went to the woods to live deliberately, and came back with an argument about attention, economy, and civil disobedience.",
    ideas: [
      {
        title: "Deliberate living",
        summary:
          "Thoreau's experiment at Walden asks what is actually necessary for a good life. Most consumption is a distraction from the question, not an answer to it.",
      },
      {
        title: "Civil disobedience",
        summary:
          "When the state asks you to participate in injustice, the individual conscience has a duty to resist. Majority rule is not the same as right.",
      },
    ],
    quotes: [
      {
        id: "q_thoreau_1",
        text: "I went to the woods because I wished to live deliberately.",
        work: "Walden",
        locator: "ch. 2",
        translator: "Henry David Thoreau",
        status: "verified",
      },
    ],
    keyWorks: ["Walden", "Civil Disobedience"],
  },
  {
    id: "leopold",
    name: "Aldo Leopold",
    dates: "1887–1948",
    tradition: "Environmental Ethics",
    era: "20th century",
    region: "United States",
    tags: ["nature", "community", "care", "justice", "wisdom"],
    oneLine:
      "He proposed a land ethic: the human community should include soils, waters, plants, and animals.",
    ideas: [
      {
        title: "The land ethic",
        summary:
          "Leopold extends ethical standing to the biotic community. An action is right when it preserves the integrity, stability, and beauty of that community.",
      },
      {
        title: "The ecological conscience",
        summary:
          "Conservation is not only a technical problem but a moral one. We need a shift in perception from land-as-property to land-as-community.",
      },
    ],
    quotes: [
      {
        id: "q_leopold_1",
        text: "A thing is right when it tends to preserve the integrity, stability, and beauty of the biotic community.",
        work: "A Sand County Almanac",
        locator: "The Land Ethic",
        translator: "Aldo Leopold",
        status: "verified",
      },
    ],
    keyWorks: ["A Sand County Almanac"],
  },
  {
    id: "naess",
    name: "Arne Næss",
    dates: "1912–2009",
    tradition: "Deep Ecology",
    era: "20th century",
    region: "Norway",
    tags: ["nature", "self", "care", "meaning", "community"],
    oneLine:
      "Deep ecology asks not how to manage nature but how to realize the self through a wider identification with life.",
    ideas: [
      {
        title: "The ecological self",
        summary:
          "Næss argues that mature self-realization expands the self to include other beings and ecosystems. Environmental care is not self-sacrifice; it is a wider identity.",
      },
      {
        title: "Deep versus shallow ecology",
        summary:
          "Shallow ecology treats nature as a resource to be managed; deep ecology questions the consumption and growth assumptions beneath the crisis.",
      },
    ],
    quotes: [],
    keyWorks: ["Ecology, Community and Lifestyle", "The Shallow and the Deep"],
  },
  {
    id: "rolston",
    name: "Holmes Rolston III",
    dates: "1932–",
    tradition: "Environmental Philosophy",
    era: "Contemporary",
    region: "United States",
    tags: ["nature", "meaning", "wisdom", "care", "science"],
    oneLine:
      "He argues that nature has intrinsic value independent of human use, and that biology can inform ethics.",
    ideas: [
      {
        title: "Intrinsic value in nature",
        summary:
          "Rolston contends that ecosystems and species have value in themselves, not merely as resources. Human valuation does not create that value; it discovers it.",
      },
      {
        title: "Nature and culture",
        summary:
          "He resists the idea that nature is only raw material for culture. A mature environmental ethics takes the wild other seriously as a source of value and meaning.",
      },
    ],
    quotes: [],
    keyWorks: ["Environmental Ethics", "Philosophy Gone Wild"],
  },
  {
    id: "plumwood",
    name: "Val Plumwood",
    dates: "1939–2008",
    tradition: "Ecofeminism / Environmental Philosophy",
    era: "Contemporary",
    region: "Australia",
    tags: ["nature", "power", "care", "self", "justice"],
    oneLine:
      "She linked the domination of nature to the master subject of Western reason, and proposed a relational self instead.",
    ideas: [
      {
        title: "The master subject",
        summary:
          "Western philosophy constructs a rational, detached subject over against a feminized and animalized nature. This dualism underwrites both patriarchy and ecological destruction.",
      },
      {
        title: "Relational self",
        summary:
          "Plumwood develops a self constituted through relationships and dependence. Ethical life begins with acknowledging that we are not self-made monads.",
      },
    ],
    quotes: [],
    keyWorks: ["Feminism and the Mastery of Nature", "Environmental Culture"],
  },
];
