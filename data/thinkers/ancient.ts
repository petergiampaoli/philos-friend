import type { Thinker } from "@/lib/schema";

export const ancientThinkers: Thinker[] = [
  {
    id: "thales",
    name: "Thales of Miletus",
    dates: "c. 624–546 BCE",
    tradition: "Pre-Socratic / Milesian",
    era: "Ancient",
    region: "Greek Ionia",
    tags: ["wisdom", "nature", "self", "fate"],
    oneLine:
      "The first recorded philosopher in the West: he asked what everything is made of, and answered without invoking a god.",
    ideas: [
      {
        title: "Water as arche",
        summary:
          "Thales proposed that water is the underlying substance of all things. The content matters less than the move: explain the world by one principle rather than by a crowd of deities.",
      },
      {
        title: "Philosophy begins with a question",
        summary:
          "His real legacy is the practice of asking for a unified account of nature. That question — what is everything, really? — is the seed of physics and metaphysics alike.",
      },
    ],
    quotes: [],
    keyWorks: ["Fragments and reports (via Aristotle and others)"],
  },
  {
    id: "anaximander",
    name: "Anaximander",
    dates: "c. 610–546 BCE",
    tradition: "Pre-Socratic / Milesian",
    era: "Ancient",
    region: "Greek Ionia",
    tags: ["nature", "justice", "fate", "impermanence"],
    oneLine:
      "He replaced a concrete element with an indefinite source, and imagined the cosmos as a balanced order that pays for its own excess.",
    ideas: [
      {
        title: "The boundless",
        summary:
          "Anaximander called the source of things the apeiron — the indefinite or boundless. A definite element could not explain everything, so the origin must be indeterminate.",
      },
      {
        title: "Cosmic justice",
        summary:
          "Things arise and pass away 'according to necessity,' paying recompense to one another for their injustice. The cosmos is not just a machine; it is a normative order.",
      },
    ],
    quotes: [],
    keyWorks: ["On Nature (fragments)"],
  },
  {
    id: "heraclitus",
    name: "Heraclitus",
    dates: "c. 535–475 BCE",
    tradition: "Pre-Socratic / Ephesian",
    era: "Ancient",
    region: "Ephesus",
    tags: ["impermanence", "self", "attention", "wisdom", "fate"],
    oneLine:
      "Reality is a process, not a shelf of things; the same river is never the same river, and character is destiny.",
    ideas: [
      {
        title: "Universal flux",
        summary:
          "Everything is in motion and tension. Stability is a pattern held by change, not a substance that escapes it. You cannot step twice into the same river — including the river that is you.",
      },
      {
        title: "The logos",
        summary:
          "A rational order runs through the world, but most people live as if they were asleep. Wisdom is learning to see the pattern you are already inside.",
      },
    ],
    quotes: [],
    keyWorks: ["Fragments"],
  },
  {
    id: "parmenides",
    name: "Parmenides",
    dates: "c. 515–450 BCE",
    tradition: "Pre-Socratic / Eleatic",
    era: "Ancient",
    region: "Elea",
    tags: ["wisdom", "self", "fate", "meaning"],
    oneLine:
      "The first hard rationalist: change and plurality are appearances, and only being truly is.",
    ideas: [
      {
        title: "Being is, becoming is not",
        summary:
          "What is, cannot come into being or pass away, because that would require what is not. Reality must be one, unchanging, and complete. The senses tell a different story; reason wins.",
      },
      {
        title: "The limits of appearance",
        summary:
          "Parmenides separates the way of truth from the way of opinion. Later philosophy is largely a series of replies to the question his poem forces: how can change be real?",
      },
    ],
    quotes: [],
    keyWorks: ["On Nature (fragments)"],
  },
  {
    id: "democritus",
    name: "Democritus",
    dates: "c. 460–370 BCE",
    tradition: "Pre-Socratic / Atomism",
    era: "Ancient",
    region: "Abdera",
    tags: ["nature", "self", "pleasure", "fate", "wisdom"],
    oneLine:
      "Everything is atoms and void; the rest — color, sweetness, meaning — is a convention of the senses.",
    ideas: [
      {
        title: "Atoms and void",
        summary:
          "Reality consists of indivisible particles moving through empty space. Compound bodies and their qualities arise from arrangements of atoms, not from purposes or essences.",
      },
      {
        title: "Cheerfulness as the aim",
        summary:
          "Democritus prized euthymia — a steady cheerfulness — over fleeting pleasure. Understanding nature is supposed to free you from fear, especially fear of death.",
      },
    ],
    quotes: [],
    keyWorks: ["Fragments and reports"],
  },
  {
    id: "socrates",
    name: "Socrates",
    dates: "470–399 BCE",
    tradition: "Socratic",
    era: "Ancient",
    region: "Athens",
    tags: ["wisdom", "self", "duty", "courage", "friendship", "meaning"],
    oneLine:
      "He wrote nothing and questioned everything, turning philosophy from cosmology into a way of examining a life.",
    ideas: [
      {
        title: "The examined life",
        summary:
          "The most important question is not what the cosmos is made of but how one should live. Socrates treats moral knowledge as the core of a worthwhile life, and ignorance as something to be exposed rather than hidden.",
      },
      {
        title: "The elenchus",
        summary:
          "His method is disciplined conversation: propose a definition, find the contradiction, revise. The goal is not to win the argument but to become less confused about what you actually believe.",
      },
    ],
    quotes: [
      {
        id: "q_socrates_1",
        text: "The unexamined life is not worth living.",
        work: "Apology",
        locator: "38a",
        translator: "Benjamin Jowett",
        status: "verified",
      },
    ],
    keyWorks: ["Apology (as reported by Plato)", "Early Platonic dialogues"],
  },
  {
    id: "plato",
    name: "Plato",
    dates: "428–348 BCE",
    tradition: "Platonism",
    era: "Ancient",
    region: "Athens",
    tags: ["wisdom", "justice", "love", "meaning", "education", "self"],
    oneLine:
      "He turned Socratic conversation into a system: Forms, the tripartite soul, and a republic built on the question of what is good.",
    ideas: [
      {
        title: "The theory of Forms",
        summary:
          "Particular things are imperfect copies of stable, intelligible Forms. Justice, beauty, and equality are not conventions; they are realities the mind can grasp when it turns from appearances toward what is.",
      },
      {
        title: "The soul and the city",
        summary:
          "The soul has rational, spirited, and appetitive parts; the just soul puts reason in charge. Plato uses the same structure to imagine a just city and to ask who should rule.",
      },
    ],
    quotes: [],
    keyWorks: ["Republic", "Symposium", "Phaedo", "Apology"],
  },
  {
    id: "xenophon",
    name: "Xenophon",
    dates: "c. 430–354 BCE",
    tradition: "Socratic",
    era: "Ancient",
    region: "Athens",
    tags: ["wisdom", "courage", "duty", "friendship", "education"],
    oneLine:
      "A soldier and student of Socrates who gave us a practical, less metaphysical portrait of the examined life.",
    ideas: [
      {
        title: "Leadership as self-command",
        summary:
          "Xenophon's Socrates is a man of practical judgment: he trains the body, manages the household, and leads by example. Philosophy is exercised in conduct, not only in argument.",
      },
      {
        title: "The useful life",
        summary:
          "His writings on horsemanship, hunting, and generalship treat competence as an ethical matter. A good life is one that can actually be lived with others.",
      },
    ],
    quotes: [],
    keyWorks: ["Memorabilia", "Anabasis", "Oeconomicus"],
  },
  {
    id: "plotinus",
    name: "Plotinus",
    dates: "c. 204–270 CE",
    tradition: "Neoplatonism",
    era: "Ancient",
    region: "Roman Egypt",
    tags: ["self", "meaning", "wisdom", "attention", "fate"],
    oneLine:
      "Reality is an emanation from the One; the soul's task is to turn back toward its source.",
    ideas: [
      {
        title: "The One and emanation",
        summary:
          "Everything flows from a single ultimate principle, the One, without the One being diminished. Intellect, soul, and matter are successive levels of that overflow.",
      },
      {
        title: "The inward ascent",
        summary:
          "Plotinus describes philosophy as a turning inward and upward: away from bodily distraction, toward the unity that is already the ground of the self. The goal is union, not information.",
      },
    ],
    quotes: [],
    keyWorks: ["Enneads"],
  },
  {
    id: "proclus",
    name: "Proclus",
    dates: "412–485 CE",
    tradition: "Neoplatonism",
    era: "Ancient",
    region: "Athens",
    tags: ["wisdom", "meaning", "fate", "self"],
    oneLine:
      "The great systematizer of late Neoplatonism, who mapped the levels between the One and the material world.",
    ideas: [
      {
        title: "A hierarchy of causes",
        summary:
          "Proclus organizes reality into a rigorous chain of causes and effects. Every level participates in the level above it, and philosophy is the art of tracing those dependencies.",
      },
      {
        title: "Theurgy",
        summary:
          "Knowledge alone is not enough for union with the divine. Ritual practice, or theurgy, trains the whole person into harmony with the cosmic order.",
      },
    ],
    quotes: [],
    keyWorks: ["Elements of Theology", "Commentary on the Timaeus"],
  },
  {
    id: "aristotle",
    name: "Aristotle",
    dates: "384–322 BCE",
    tradition: "Aristotelianism",
    era: "Ancient",
    region: "Macedonia / Athens",
    tags: ["wisdom", "excellence", "friendship", "duty", "nature", "meaning"],
    oneLine:
      "The first systematic philosopher of everything: logic, biology, ethics, politics, and the grammar of being.",
    ideas: [
      {
        title: "Eudaimonia as activity",
        summary:
          "Happiness is not a feeling but a life of excellent activity in accordance with virtue. It is achieved over a whole life, in a community, with enough external goods to make action possible.",
      },
      {
        title: "Virtue as a mean",
        summary:
          "Courage sits between recklessness and cowardice; generosity between waste and stinginess. Virtue is a stable disposition, trained by habit, to perceive and choose the appropriate response.",
      },
    ],
    quotes: [
      {
        id: "q_aristotle_1",
        text: "One swallow does not make a summer.",
        work: "Nicomachean Ethics",
        locator: "Book I, ch. 7",
        translator: "W. D. Ross",
        status: "verified",
      },
    ],
    keyWorks: ["Nicomachean Ethics", "Politics", "Metaphysics", "De Anima"],
  },
  {
    id: "theophrastus",
    name: "Theophrastus",
    dates: "c. 371–287 BCE",
    tradition: "Peripatetic",
    era: "Ancient",
    region: "Lesbos / Athens",
    tags: ["nature", "wisdom", "excellence", "habit"],
    oneLine:
      "Aristotle's successor, who turned philosophy toward plants, characters, and the texture of ordinary behavior.",
    ideas: [
      {
        title: "Natural history",
        summary:
          "Theophrastus studied plants with the same seriousness Aristotle gave animals. His work is a reminder that philosophy of nature begins with patient observation, not grand system-building.",
      },
      {
        title: "Characters as types",
        summary:
          "In his Characters, he sketches recognizable moral types — the flatterer, the coward, the stingy man. Ethical philosophy becomes a study of how character shows up in daily life.",
      },
    ],
    quotes: [],
    keyWorks: ["Enquiry into Plants", "Characters"],
  },
  {
    id: "alexander-aphrodisias",
    name: "Alexander of Aphrodisias",
    dates: "fl. c. 200 CE",
    tradition: "Aristotelianism",
    era: "Ancient",
    region: "Caria / Athens",
    tags: ["wisdom", "self", "fate", "nature"],
    oneLine:
      "The great ancient commentator on Aristotle, who defended a naturalistic, mortal soul against the Neoplatonists.",
    ideas: [
      {
        title: "The active intellect",
        summary:
          "Alexander reads Aristotle's active intellect as a single, separate principle that makes human thought possible. The individual soul remains mortal; immortality belongs to thought at its highest, impersonal level.",
      },
      {
        title: "Nature and fate",
        summary:
          "He argues for a deterministic natural order while preserving a space for human responsibility. His commentaries set the terms for centuries of later debate.",
      },
    ],
    quotes: [],
    keyWorks: ["On the Soul", "On Fate", "Commentaries on Aristotle"],
  },
  {
    id: "averroes",
    name: "Ibn Rushd (Averroes)",
    dates: "1126–1198",
    tradition: "Islamic Aristotelianism",
    era: "Medieval",
    region: "Al-Andalus / Marrakesh",
    tags: ["wisdom", "fate", "meaning", "self", "education"],
    oneLine:
      "The Commentator: Aristotle's most influential Arabic interpreter, who argued that philosophy and religion can both be true at different levels.",
    ideas: [
      {
        title: "The double truth",
        summary:
          "Averroes holds that philosophy and revelation address different audiences. The philosopher seeks demonstrative truth; religion offers persuasive images for the community. Conflict arises from bad interpretation, not from reality.",
      },
      {
        title: "One intellect",
        summary:
          "His reading of Aristotle's active intellect as a single shared human capacity scandalized later thinkers. It also made him a central figure in the Latin Averroist controversies.",
      },
    ],
    quotes: [],
    keyWorks: ["The Incoherence of the Incoherence", "Commentaries on Aristotle"],
  },
  {
    id: "aquinas",
    name: "Thomas Aquinas",
    dates: "1225–1274",
    tradition: "Scholasticism / Thomism",
    era: "Medieval",
    region: "Italy / Paris",
    tags: ["wisdom", "duty", "meaning", "love", "justice", "hope"],
    oneLine:
      "He fused Aristotle with Christian theology and made reason a genuine partner of faith.",
    ideas: [
      {
        title: "Faith and reason",
        summary:
          "Reason can establish some truths — God's existence, the soul's immortality — while revelation supplies what reason cannot reach. They cannot truly contradict each other because both come from God.",
      },
      {
        title: "Natural law",
        summary:
          "Human beings participate in eternal law through practical reason. The basic goods of life, knowledge, friendship, and worship ground moral norms that human law should reflect.",
      },
    ],
    quotes: [
      {
        id: "q_aquinas_1",
        text: "Grace does not destroy nature, but perfects it.",
        work: "Summa Theologiae",
        locator: "I.1.8, ad 2",
        translator: "Fathers of the English Dominican Province",
        status: "verified",
      },
    ],
    keyWorks: ["Summa Theologiae", "Summa Contra Gentiles"],
  },
  {
    id: "zeno",
    name: "Zeno of Citium",
    dates: "c. 334–262 BCE",
    tradition: "Stoicism",
    era: "Ancient",
    region: "Cyprus / Athens",
    tags: ["control", "duty", "wisdom", "fate", "courage"],
    oneLine:
      "The founder of Stoicism: virtue is the only good, and the cosmos is a rational whole we can learn to live with.",
    ideas: [
      {
        title: "Virtue is sufficient",
        summary:
          "Health, wealth, and reputation are 'preferred indifferents' — reasonable to pursue, but not goods in themselves. Only virtue is genuinely good, and only vice genuinely bad.",
      },
      {
        title: "Living according to nature",
        summary:
          "The Stoic goal is to harmonize your will with the rational order of the cosmos. That means cultivating reason, accepting what is outside your control, and acting for the common good.",
      },
    ],
    quotes: [],
    keyWorks: ["Fragments (via Diogenes Laertius and others)"],
  },
  {
    id: "chrysippus",
    name: "Chrysippus",
    dates: "c. 279–206 BCE",
    tradition: "Stoicism",
    era: "Ancient",
    region: "Cilicia / Athens",
    tags: ["control", "fate", "wisdom", "self", "duty"],
    oneLine:
      "The second founder of Stoicism, who gave the school its logic, physics, and a compatibilist account of fate.",
    ideas: [
      {
        title: "The web of fate",
        summary:
          "Everything is connected by a chain of causes, yet human actions are still ours because they flow from our own rational nature. Freedom is not exemption from causation; it is acting from the right kind of cause.",
      },
      {
        title: "The therapy of the passions",
        summary:
          "Emotions are judgments about what matters. If you revise the judgment — this is not actually a threat to my good — the passion loses its grip.",
      },
    ],
    quotes: [],
    keyWorks: ["Fragments (via later doxographers)"],
  },
  {
    id: "seneca",
    name: "Seneca",
    dates: "4 BCE–65 CE",
    tradition: "Stoicism",
    era: "Roman",
    region: "Rome",
    tags: ["control", "death", "anxiety", "money", "power", "attention"],
    oneLine:
      "A Roman Stoic, statesman, and dramatist who wrote some of the sharpest letters in philosophy about time, fear, and power.",
    ideas: [
      {
        title: "Time as the only possession",
        summary:
          "People guard their money and give away their time, the one thing they cannot recover. Seneca's letters are an extended argument for treating attention as a finite estate.",
      },
      {
        title: "Premeditation of evils",
        summary:
          "Rehearse loss, exile, and death in imagination so that they lose their power to ambush you. This is not pessimism; it is training in gratitude and composure.",
      },
    ],
    quotes: [
      {
        id: "q_seneca_1",
        text: "We suffer more often in imagination than in reality.",
        work: "Letters to Lucilius",
        locator: "Letter 13, §4",
        translator: "Richard Mott Gummere",
        status: "verified",
      },
    ],
    keyWorks: ["Letters to Lucilius", "On the Shortness of Life", "On Anger"],
  },
  {
    id: "epictetus",
    name: "Epictetus",
    dates: "c. 50–135 CE",
    tradition: "Stoicism",
    era: "Roman",
    region: "Phrygia / Rome / Nicopolis",
    tags: ["control", "freedom", "courage", "habit", "duty", "anxiety"],
    oneLine:
      "A former slave who taught that freedom is the correct use of what is up to us — and almost nothing else is.",
    ideas: [
      {
        title: "The dichotomy of control",
        summary:
          "Judgments, intentions, and responses are ours. Outcomes, reputation, other people, and the past are not. Most suffering comes from treating the second category as if it belonged to the first.",
      },
      {
        title: "The discipline of assent",
        summary:
          "Between an impression and your reaction there is a moment of judgment. Epictetus trains students to examine that judgment before consenting to it. Freedom is a practice, not a status.",
      },
    ],
    quotes: [
      {
        id: "q_epictetus_1",
        text: "Some things are in our power and others are not.",
        work: "Enchiridion",
        locator: "ch. 1",
        translator: "Elizabeth Carter",
        status: "verified",
      },
    ],
    keyWorks: ["Enchiridion", "Discourses (recorded by Arrian)"],
  },
  {
    id: "marcus-aurelius",
    name: "Marcus Aurelius",
    dates: "121–180 CE",
    tradition: "Stoicism",
    era: "Roman",
    region: "Rome",
    tags: ["control", "duty", "death", "anger", "attention", "community"],
    oneLine:
      "A Roman emperor writing private notes to himself about how to get through the day without becoming a worse person.",
    ideas: [
      {
        title: "The view from above",
        summary:
          "Widen the frame: your life is brief, the empire is a passing arrangement, and most insults are local weather. This is not nihilism but a way to shrink the drama that hijacks attention.",
      },
      {
        title: "Work as service",
        summary:
          "Marcus treats ruling as an obligation to the common good, not a privilege. The question is not whether the work is pleasant but whether it serves the whole.",
      },
    ],
    quotes: [
      {
        id: "q_marcus_1",
        text: "The soul becomes dyed with the colour of its thoughts.",
        work: "Meditations",
        locator: "Book 5, ch. 16",
        translator: "George Long",
        status: "verified",
      },
    ],
    keyWorks: ["Meditations"],
  },
  {
    id: "epicurus",
    name: "Epicurus",
    dates: "341–270 BCE",
    tradition: "Epicureanism",
    era: "Ancient",
    region: "Samos / Athens",
    tags: ["pleasure", "desire", "death", "friendship", "anxiety", "fun"],
    oneLine:
      "Pleasure is the goal, but the deepest pleasure is tranquility — and the way to it is reducing fear, not maximizing consumption.",
    ideas: [
      {
        title: "The taxonomy of desire",
        summary:
          "Desires are natural and necessary, natural but unnecessary, or neither. Learn the difference and most anxiety dissolves. A simple meal with a friend can be the highest pleasure because it lacks the pain of wanting more.",
      },
      {
        title: "Death is nothing to us",
        summary:
          "Where death is, I am not; where I am, death is not. Fear of death is the fear of a experience no one will have. Philosophy is medicine for that fear.",
      },
    ],
    quotes: [
      {
        id: "q_epicurus_1",
        text: "Death is nothing to us.",
        work: "Letter to Menoeceus",
        locator: "§124",
        translator: "Cyril Bailey",
        status: "verified",
      },
      {
        id: "q_epicurus_2",
        text: "Pleasure is the beginning and the end of the blessed life.",
        work: "Letter to Menoeceus",
        locator: "§128",
        translator: "Cyril Bailey",
        status: "verified",
      },
    ],
    keyWorks: ["Letter to Menoeceus", "Principal Doctrines", "Vatican Sayings"],
  },
  {
    id: "lucretius",
    name: "Lucretius",
    dates: "c. 99–55 BCE",
    tradition: "Epicureanism",
    era: "Roman",
    region: "Rome",
    tags: ["nature", "death", "desire", "anxiety", "wisdom", "fate"],
    oneLine:
      "The poet of Epicureanism, who argued in verse that understanding atoms and mortality can free us from fear.",
    ideas: [
      {
        title: "The poetry of materialism",
        summary:
          "Lucretius presents the world as atoms in motion, with no divine micromanagement. The point is therapeutic: if the gods are not meddling, and death is dissolution, fear has less to work with.",
      },
      {
        title: "The swerve",
        summary:
          "Atoms sometimes swerve unpredictably, creating room for freedom in a material universe. Whether or not the physics works, the image captures a permanent philosophical problem.",
      },
    ],
    quotes: [],
    keyWorks: ["On the Nature of Things"],
  },
  {
    id: "pyrrho",
    name: "Pyrrho of Elis",
    dates: "c. 360–270 BCE",
    tradition: "Skepticism",
    era: "Ancient",
    region: "Elis",
    tags: ["wisdom", "anxiety", "control", "meaning", "attention"],
    oneLine:
      "The founder of Pyrrhonian skepticism: suspend judgment about how things really are, and tranquility follows.",
    ideas: [
      {
        title: "Epoché",
        summary:
          "For every argument there is an equally strong counter-argument. Recognizing this, the skeptic suspends judgment. The result is not paralysis but a strange calm.",
      },
      {
        title: "Living without dogma",
        summary:
          "The skeptic still acts, following appearances, custom, and inclination — but without claiming that any of it is metaphysically final. Philosophy becomes a way of holding beliefs lightly.",
      },
    ],
    quotes: [],
    keyWorks: ["Reports via Sextus Empiricus and Diogenes Laertius"],
  },
  {
    id: "sextus-empiricus",
    name: "Sextus Empiricus",
    dates: "c. 160–210 CE",
    tradition: "Pyrrhonian Skepticism",
    era: "Roman",
    region: "Alexandria / Athens",
    tags: ["wisdom", "anxiety", "control", "meaning", "attention"],
    oneLine:
      "The encyclopedist of ancient skepticism, who assembled the arguments for suspending judgment about everything.",
    ideas: [
      {
        title: "The modes of suspension",
        summary:
          "Perception varies by species, condition, and context; every claim depends on a framework. Sextus catalogues these tensions not to prove skepticism, but to produce the experience of not knowing.",
      },
      {
        title: "Skepticism as therapy",
        summary:
          "The goal is ataraxia: release from the distress of needing the world to be a certain way. Suspension of judgment is a cure for dogmatic anxiety, not a new dogma.",
      },
    ],
    quotes: [],
    keyWorks: ["Outlines of Pyrrhonism", "Against the Mathematicians"],
  },
  {
    id: "arcesilaus",
    name: "Arcesilaus",
    dates: "c. 316–241 BCE",
    tradition: "Academic Skepticism",
    era: "Ancient",
    region: "Athens",
    tags: ["wisdom", "control", "meaning", "attention"],
    oneLine:
      "He turned Plato's Academy toward skepticism, arguing that the wise person should withhold assent.",
    ideas: [
      {
        title: "The skeptical Academy",
        summary:
          "Arcesilaus used Socratic questioning against the Stoic claim that some impressions are certainly true. If no impression is immune to error, assent should be withheld.",
      },
      {
        title: "Living with the probable",
        summary:
          "The Academic skeptic still acts, guided by what seems reasonable. The difference is that practice does not require certainty — a lesson that outlives the school.",
      },
    ],
    quotes: [],
    keyWorks: ["Fragments and reports"],
  },
  {
    id: "porphyry",
    name: "Porphyry",
    dates: "c. 234–305 CE",
    tradition: "Neoplatonism",
    era: "Ancient",
    region: "Tyre / Rome",
    tags: ["wisdom", "self", "meaning", "nature", "attention"],
    oneLine:
      "Plotinus's editor and biographer, who made Neoplatonism teachable and wrote a famous attack on eating animals.",
    ideas: [
      {
        title: "The ladder of virtues",
        summary:
          "Porphyry organizes ethics as a progression: civic virtues, purificatory virtues, and finally contemplative virtues. Moral life is a training in detachment from the body.",
      },
      {
        title: "On abstaining from animal food",
        summary:
          "He argues that justice should extend beyond humans, and that a contemplative life is supported by a diet that does not require violence. The text is one of the earliest sustained arguments for vegetarianism.",
      },
    ],
    quotes: [],
    keyWorks: ["Isagoge", "Life of Plotinus", "On Abstinence from Animal Food"],
  },
  {
    id: "augustine",
    name: "Augustine of Hippo",
    dates: "354–430 CE",
    tradition: "Patristic / Augustinianism",
    era: "Medieval",
    region: "North Africa",
    tags: ["love", "meaning", "self", "duty", "hope", "desire"],
    oneLine:
      "He turned inward and found a restless heart, a divided will, and a God who is closer to us than we are to ourselves.",
    ideas: [
      {
        title: "The restless heart",
        summary:
          "Augustine reads human desire as a longing for rest in God. Everything else — fame, pleasure, even philosophy — is a smaller object that cannot finally satisfy.",
      },
      {
        title: "The divided will",
        summary:
          "His account of sin is psychologically modern: we know the good and still fail to do it. The will is not a single faculty but a battlefield of loves.",
      },
    ],
    quotes: [
      {
        id: "q_augustine_1",
        text: "You have made us for yourself, and our heart is restless until it rests in you.",
        work: "Confessions",
        locator: "Book I, ch. 1",
        translator: "Albert C. Outler",
        status: "verified",
      },
    ],
    keyWorks: ["Confessions", "City of God", "On Free Choice of the Will"],
  },
  {
    id: "pseudo-dionysius",
    name: "Pseudo-Dionysius",
    dates: "c. 5th–6th century CE",
    tradition: "Christian Neoplatonism",
    era: "Medieval",
    region: "Syria / Byzantine Empire",
    tags: ["meaning", "self", "wisdom", "love", "attention"],
    oneLine:
      "An anonymous theologian who described the soul's ascent through darkness, hierarchy, and unknowing.",
    ideas: [
      {
        title: "Apophatic theology",
        summary:
          "God is beyond every name and concept. The closest approach is negative theology: saying what God is not until language falls silent.",
      },
      {
        title: "The hierarchy of light",
        summary:
          "Reality is ordered in ranks that transmit divine illumination downward and prayer upward. Hierarchy is not domination but a shared participation in light.",
      },
    ],
    quotes: [],
    keyWorks: ["The Divine Names", "Mystical Theology", "Celestial Hierarchy"],
  },
  {
    id: "anselm",
    name: "Anselm of Canterbury",
    dates: "1033–1109",
    tradition: "Scholasticism",
    era: "Medieval",
    region: "Italy / England",
    tags: ["wisdom", "meaning", "duty", "hope"],
    oneLine:
      "The monk who invented the ontological argument and insisted that faith is a form of understanding.",
    ideas: [
      {
        title: "The ontological argument",
        summary:
          "God is 'that than which nothing greater can be conceived.' If such a being existed only in the mind, a greater one could be conceived — so it must exist in reality. The argument still provokes defenders and critics.",
      },
      {
        title: "Faith seeking understanding",
        summary:
          "Anselm does not ask you to believe without thinking. He asks you to think inside faith, to let the content of belief become intelligible through rational exploration.",
      },
    ],
    quotes: [
      {
        id: "q_anselm_1",
        text: "I believe in order that I may understand.",
        work: "Proslogion",
        locator: "ch. 1",
        translator: "Sidney Norton Deane",
        status: "verified",
      },
    ],
    keyWorks: ["Proslogion", "Monologion", "Cur Deus Homo"],
  },
  {
    id: "abelard",
    name: "Peter Abelard",
    dates: "1079–1142",
    tradition: "Scholasticism",
    era: "Medieval",
    region: "France",
    tags: ["wisdom", "love", "duty", "self", "education"],
    oneLine:
      "A brilliant, scandalous logician who made doubt a method and intention the heart of ethics.",
    ideas: [
      {
        title: "Doubt as a path to inquiry",
        summary:
          "In Sic et Non, Abelard sets conflicting authorities side by side. The point is not to destroy tradition but to force the reader to reason toward a resolution.",
      },
      {
        title: "Intentions and sin",
        summary:
          "An act is not good or bad merely because of its outward form; what matters is the intention behind it. This makes conscience central to moral judgment, and leaves room for sincere error.",
      },
    ],
    quotes: [],
    keyWorks: ["Sic et Non", "Ethics", "The History of My Calamities"],
  },
  {
    id: "scotus",
    name: "John Duns Scotus",
    dates: "c. 1266–1308",
    tradition: "Scholasticism / Scotism",
    era: "Medieval",
    region: "Scotland / Paris / Cologne",
    tags: ["wisdom", "love", "freedom", "self", "duty"],
    oneLine:
      "The Subtle Doctor, who defended the primacy of will and love against Aquinas's intellectualism.",
    ideas: [
      {
        title: "The univocity of being",
        summary:
          "Being is said in the same sense of God and creatures, even if God's mode of being is infinite. This makes rational talk about God possible without collapsing the difference.",
      },
      {
        title: "Will and love",
        summary:
          "For Scotus, the will is not simply a servant of the intellect. Freedom is the capacity to love something for its own sake, and that freedom is the highest image of God in us.",
      },
    ],
    quotes: [],
    keyWorks: ["Ordinatio", "Quaestiones Quodlibetales"],
  },
  {
    id: "ockham",
    name: "William of Ockham",
    dates: "c. 1287–1347",
    tradition: "Scholasticism / Nominalism",
    era: "Medieval",
    region: "England / Avignon / Munich",
    tags: ["wisdom", "freedom", "power", "self", "duty"],
    oneLine:
      "The nominalist who denied that universal essences are real and helped separate church and state.",
    ideas: [
      {
        title: "Nominalism",
        summary:
          "Only particular things exist; universals are names or concepts in the mind. This cuts away a great deal of metaphysical furniture and makes experience the primary court of appeal.",
      },
      {
        title: "The limits of papal power",
        summary:
          "Ockham argued for a sphere of secular authority and for limits on absolute papal rule. His political thought is an early defense of plural power against a single sovereign.",
      },
    ],
    quotes: [],
    keyWorks: ["Summa Logicae", "Dialogus", "Opus Nonaginta Dierum"],
  },
  {
    id: "al-farabi",
    name: "Al-Farabi",
    dates: "c. 872–950",
    tradition: "Islamic Philosophy / Falsafa",
    era: "Medieval",
    region: "Central Asia / Baghdad",
    tags: ["wisdom", "justice", "meaning", "community", "education"],
    oneLine:
      "The Second Teacher after Aristotle: he brought Greek political philosophy into Islamic thought.",
    ideas: [
      {
        title: "The virtuous city",
        summary:
          "Al-Farabi imagines a city ordered toward the true happiness of its citizens, with a philosopher-ruler who translates metaphysical truth into images the community can live by.",
      },
      {
        title: "Prophecy as philosophy",
        summary:
          "The prophet and the philosopher grasp the same truths, but the prophet communicates them through imagination and symbol. Religion is philosophy for the many, not its enemy.",
      },
    ],
    quotes: [],
    keyWorks: ["The Virtuous City", "The Political Regime", "On the Perfect State"],
  },
  {
    id: "ibn-sina",
    name: "Ibn Sina (Avicenna)",
    dates: "980–1037",
    tradition: "Islamic Philosophy / Falsafa",
    era: "Medieval",
    region: "Persia",
    tags: ["wisdom", "self", "meaning", "attention", "fate"],
    oneLine:
      "The most influential Islamic metaphysician, whose flying man thought experiment still haunts philosophy of mind.",
    ideas: [
      {
        title: "The flying man",
        summary:
          "Imagine a person created fully formed, suspended in air, with no sensory input. Would they know they exist? Avicenna says yes: self-awareness does not depend on the body or the senses.",
      },
      {
        title: "Necessary and contingent being",
        summary:
          "Everything we encounter is possible in itself, but the chain of possible things requires a being necessary in itself. That is God — the one whose existence cannot fail.",
      },
    ],
    quotes: [],
    keyWorks: ["The Healing", "The Book of Salvation", "The Canon of Medicine"],
  },
  {
    id: "al-ghazali",
    name: "Al-Ghazālī",
    dates: "1058–1111",
    tradition: "Islamic Theology / Sufism",
    era: "Medieval",
    region: "Persia",
    tags: ["wisdom", "anxiety", "meaning", "desire", "self"],
    oneLine:
      "He doubted his way through the schools and emerged as a Sufi, arguing that certainty is lived before it is proved.",
    ideas: [
      {
        title: "The deliverance from error",
        summary:
          "Al-Ghazālī describes a crisis of doubt so severe that he lost confidence in the senses and reason. His recovery begins with practical faith and the transformation of the self, not with a knock-down argument.",
      },
      {
        title: "The incoherence of the philosophers",
        summary:
          "He attacks the Islamic Aristotelians on creation, causality, and resurrection. His critique of necessary causation opens a space for divine action and for a more experiential religious knowledge.",
      },
    ],
    quotes: [],
    keyWorks: ["The Deliverance from Error", "The Incoherence of the Philosophers"],
  },
  {
    id: "maimonides",
    name: "Moses Maimonides",
    dates: "1138–1204",
    tradition: "Jewish Philosophy / Aristotelianism",
    era: "Medieval",
    region: "Córdoba / Cairo",
    tags: ["wisdom", "duty", "meaning", "self", "anxiety", "fate"],
    oneLine:
      "The Guide for the Perplexed: a rabbi, physician, and Aristotelian who tried to reconcile revelation with reason.",
    ideas: [
      {
        title: "Negative theology",
        summary:
          "We cannot say what God is, only what God is not. Every positive attribute risks making God into a bigger version of a creature. Silence and action are safer than confident description.",
      },
      {
        title: "The perplexed reader",
        summary:
          "Maimonides writes for a reader torn between philosophy and faith. Some truths must be communicated indirectly, through hints and contradictions, because not every reader can bear them at once.",
      },
    ],
    quotes: [],
    keyWorks: ["The Guide for the Perplexed", "Mishneh Torah"],
  },
];
