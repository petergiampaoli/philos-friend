import type { Lineage } from "./schema";

export const GENRES: Lineage[] = [
  {
    id: "ancient-medieval",
    kind: "genre",
    name: "Ancient & Medieval",
    blurb:
      "From the first cosmologies to the great medieval syntheses: the long argument about what is real, what is good, and how to live.",
    whyTheseFive:
      "Five load-bearing figures: the two Athenian systematizers, the Christian Platonist and Aristotelian synthesizers, and the Neoplatonist who carried the tradition into the Middle Ages.",
    five: ["plato", "aristotle", "augustine", "aquinas", "plotinus"],
  },
  {
    id: "modern-enlightenment",
    kind: "genre",
    name: "Modern & Enlightenment",
    blurb:
      "The turn to the subject, the experimental method, the social contract, and the first serious attempt to make reason democratic.",
    whyTheseFive:
      "The arc from Cartesian doubt to Hegelian system, with Hume's skepticism and Rousseau's politics as the indispensable objections.",
    five: ["descartes", "hume", "kant", "hegel", "rousseau"],
  },
  {
    id: "nineteenth-twentieth",
    kind: "genre",
    name: "19th & 20th Century",
    blurb:
      "History, suspicion, existence, and language: philosophy after it stopped believing it could hand down a single system.",
    whyTheseFive:
      "Five different revolutions: political economy, genealogy, phenomenology, linguistic analysis, and the ethics of freedom.",
    five: ["marx", "nietzsche", "heidegger", "wittgenstein", "beauvoir"],
  },
  {
    id: "analytic",
    kind: "genre",
    name: "Analytic",
    blurb:
      "The century-long attempt to make philosophy precise: logic, language, mind, knowledge, and science.",
    whyTheseFive:
      "The founders and the critics: Frege's logic, Russell and Moore's revolt, Wittgenstein's two philosophies, and Quine's holism.",
    five: ["frege", "russell", "wittgenstein", "quine", "kripke"],
  },
  {
    id: "ethics-politics",
    kind: "genre",
    name: "Ethics & Politics",
    blurb: "How to live, how to treat each other, and who gets to count.",
    whyTheseFive:
      "The virtue tradition, the duty tradition, the consequence tradition, and two attempts to think justice and freedom politically.",
    five: ["aristotle", "kant", "mill", "rawls", "arendt"],
  },
  {
    id: "africana-global-south",
    kind: "genre",
    name: "Africana & Global South",
    blurb:
      "Philosophy from traditions too often treated as footnotes: African, Caribbean, Latin American, Indigenous, and decolonial thought.",
    whyTheseFive:
      "Five entry points into a vast and internally diverse set of traditions: ancient wisdom, anti-colonial critique, liberation pedagogy, and communitarian personhood.",
    five: ["ptahhotep", "fanon", "dussel", "freire", "gyekye"],
  },
  {
    id: "asian",
    kind: "genre",
    name: "Asian",
    blurb:
      "Chinese, Indian, and Japanese traditions: arguments about self, society, emptiness, and attention that developed on their own terms.",
    whyTheseFive:
      "The two great Chinese schools, the Daoist counter-voice, the Buddhist philosopher of emptiness, and the Vedantin who systematized the Upanishads.",
    five: ["confucius", "laozi", "zhuangzi", "nagarjuna", "shankara"],
  },
  {
    id: "aesthetics-life",
    kind: "genre",
    name: "Aesthetics & Philosophy of Life",
    blurb:
      "Beauty, play, love, work, death — the parts of philosophy that show up in an ordinary Tuesday.",
    whyTheseFive:
      "Kant on taste, Nietzsche on yes-saying, Dewey on experience, and the two theorists who made play a serious philosophical problem.",
    five: ["kant", "nietzsche", "dewey", "suits", "huizinga"],
  },
  {
    id: "religion-environment",
    kind: "genre",
    name: "Religion, Nature & Environment",
    blurb:
      "The oldest questions about transcendence and the newest about how to live on a damaged planet.",
    whyTheseFive:
      "Augustine and Aquinas on the restless heart, Kierkegaard on faith, and Thoreau and Leopold on attention to the living world.",
    five: ["augustine", "aquinas", "kierkegaard", "thoreau", "leopold"],
  },
];

export const SUBGENRES: Lineage[] = [
  {
    id: "pre-socratics",
    kind: "subgenre",
    name: "Pre-Socratics",
    parent: "ancient-medieval",
    blurb:
      "The first attempts to explain the world without appealing to myth: water, the boundless, flux, being, and atoms.",
    whyTheseFive:
      "Five different bets on what reality is made of — and the first recorded arguments about whether change is real.",
    five: ["thales", "anaximander", "heraclitus", "parmenides", "democritus"],
  },
  {
    id: "socrates-plato",
    kind: "subgenre",
    name: "Socrates & Plato",
    parent: "ancient-medieval",
    blurb:
      "The examined life and the theory of Forms, plus the students and successors who turned a conversation into a school.",
    whyTheseFive:
      "Socrates is the method, Plato the system, Xenophon the witness, and Plotinus and Proclus the later Platonists who kept the project alive.",
    five: ["socrates", "plato", "xenophon", "plotinus", "proclus"],
  },
  {
    id: "aristotelianism",
    kind: "subgenre",
    name: "Aristotelianism",
    parent: "ancient-medieval",
    blurb:
      "Aristotle's biology, logic, ethics, and metaphysics, and the commentators who made him the teacher of the medieval world.",
    whyTheseFive:
      "Five stages of a single tradition: the founder, his first successor, the Greek commentator, the Islamic commentator, and the Christian synthesizer.",
    five: ["aristotle", "theophrastus", "alexander-aphrodisias", "averroes", "aquinas"],
  },
  {
    id: "stoicism",
    kind: "subgenre",
    name: "Stoicism",
    parent: "ancient-medieval",
    blurb:
      "The claim that virtue is the only good, and that most of what upsets us is a judgment we can revise.",
    whyTheseFive:
      "The school's founder, its great systematizer, and the three Roman writers through whom Stoicism became a practical discipline.",
    five: ["zeno", "chrysippus", "seneca", "epictetus", "marcus-aurelius"],
  },
  {
    id: "epicureanism-skepticism",
    kind: "subgenre",
    name: "Epicureanism & Skepticism",
    parent: "ancient-medieval",
    blurb:
      "Two therapies for anxiety: reduce desire to what is natural and necessary, or suspend judgment about everything else.",
    whyTheseFive:
      "The two great Hellenistic alternatives to Stoic certainty: pleasure rightly understood, and the disciplined refusal to claim knowledge.",
    five: ["epicurus", "lucretius", "pyrrho", "sextus-empiricus", "arcesilaus"],
  },
  {
    id: "neoplatonism-patristics",
    kind: "subgenre",
    name: "Neoplatonism & Patristics",
    parent: "ancient-medieval",
    blurb:
      "The One, the soul's ascent, and the Christian transformation of Platonic metaphysics.",
    whyTheseFive:
      "The philosophical bridge from Athens to the medieval West: Plotinus's system, its late antique elaborations, and its Christian reception.",
    five: ["plotinus", "porphyry", "proclus", "augustine", "pseudo-dionysius"],
  },
  {
    id: "scholasticism",
    kind: "subgenre",
    name: "Scholasticism",
    parent: "ancient-medieval",
    blurb:
      "Faith seeking understanding, conducted with astonishing logical discipline.",
    whyTheseFive:
      "Five masters of the medieval university: the ontological argument, the method of doubt, the great synthesis, and the two critics who pulled it apart.",
    five: ["anselm", "abelard", "aquinas", "scotus", "ockham"],
  },
  {
    id: "islamic-jewish",
    kind: "subgenre",
    name: "Islamic & Jewish Philosophy",
    parent: "ancient-medieval",
    blurb:
      "Aristotle in Arabic and Hebrew: prophecy, creation, reason, and the limits of philosophy.",
    whyTheseFive:
      "The major voices of the medieval Abrahamic encounter with Greek philosophy, from Alfarabi's political philosophy to Maimonides' guide for the perplexed.",
    five: ["al-farabi", "ibn-sina", "al-ghazali", "averroes", "maimonides"],
  },
  {
    id: "renaissance-humanism",
    kind: "subgenre",
    name: "Renaissance Humanism",
    parent: "modern-enlightenment",
    blurb:
      "The recovery of ancient texts and the invention of the modern individual — plus a hard look at power.",
    whyTheseFive:
      "Five humanists who made the self, the state, and the essay into philosophical problems.",
    five: ["petrarch", "pico", "erasmus", "machiavelli", "montaigne"],
  },
  {
    id: "rationalism",
    kind: "subgenre",
    name: "Rationalism",
    parent: "modern-enlightenment",
    blurb:
      "Reason as the royal road to reality: clear ideas, geometric order, and the best of all possible worlds.",
    whyTheseFive:
      "The canonical rationalist line, from the cogito to the systematizing that Kant would wake from dogmatic slumber.",
    five: ["descartes", "spinoza", "leibniz", "malebranche", "wolff"],
  },
  {
    id: "empiricism",
    kind: "subgenre",
    name: "Empiricism",
    parent: "modern-enlightenment",
    blurb:
      "The mind as a sheet of paper, experience as the only teacher, and the uncomfortable conclusions that follow.",
    whyTheseFive:
      "Five British empiricists: the method, the politics, the idealism, the skepticism, and the common-sense reply.",
    five: ["bacon", "locke", "berkeley", "hume", "reid"],
  },
  {
    id: "social-contract",
    kind: "subgenre",
    name: "Social Contract & Enlightenment",
    parent: "modern-enlightenment",
    blurb:
      "Political authority as an agreement, and the Enlightenment as a public use of reason.",
    whyTheseFive:
      "The modern state's founding arguments, from the war of all against all to the general will and the separation of powers.",
    five: ["hobbes", "locke", "rousseau", "montesquieu", "voltaire"],
  },
  {
    id: "german-idealism",
    kind: "subgenre",
    name: "German Idealism",
    parent: "modern-enlightenment",
    blurb: "Kant's Copernican revolution and the systems that tried to finish it.",
    whyTheseFive:
      "The arc from critique to absolute idealism, with Herder as the counter-voice insisting on culture and history.",
    five: ["kant", "fichte", "schelling", "hegel", "herder"],
  },
  {
    id: "utilitarianism",
    kind: "subgenre",
    name: "Utilitarianism & Consequentialism",
    parent: "nineteenth-twentieth",
    blurb:
      "The greatest good, the impartial standpoint, and the strange demands of counting everyone equally.",
    whyTheseFive:
      "Five stages of the consequentialist argument, from Bentham's calculus to Parfit's repopulation paradoxes.",
    five: ["bentham", "mill", "sidgwick", "singer", "parfit"],
  },
  {
    id: "marxism-critical-theory",
    kind: "subgenre",
    name: "Marxism & Critical Theory",
    parent: "nineteenth-twentieth",
    blurb:
      "Philosophy as critique: alienation, ideology, and the question of who owns the world.",
    whyTheseFive:
      "The founding critique, its codification, and three twentieth-century attempts to explain why capitalism did not simply collapse.",
    five: ["marx", "engels", "gramsci", "adorno", "marcuse"],
  },
  {
    id: "existentialism",
    kind: "subgenre",
    name: "Existentialism",
    parent: "nineteenth-twentieth",
    blurb:
      "Existence before essence: anxiety, freedom, bad faith, and the burden of choosing.",
    whyTheseFive:
      "The lineage from the first existentialist to the French writers who made it a public philosophy.",
    five: ["kierkegaard", "nietzsche", "heidegger", "sartre", "beauvoir"],
  },
  {
    id: "phenomenology-hermeneutics",
    kind: "subgenre",
    name: "Phenomenology & Hermeneutics",
    parent: "nineteenth-twentieth",
    blurb:
      "Back to the things themselves — then to the body, the Other, and the interpreter.",
    whyTheseFive:
      "Five attempts to describe experience before explaining it, and to ask what it means to understand at all.",
    five: ["husserl", "heidegger", "levinas", "merleau-ponty", "gadamer"],
  },
  {
    id: "absurdism",
    kind: "subgenre",
    name: "Absurdism",
    parent: "nineteenth-twentieth",
    blurb:
      "The collision between the human demand for meaning and a silent universe.",
    whyTheseFive:
      "Two philosophers and three literary witnesses to the absurd — because the absurd is easier to dramatize than to define.",
    five: ["camus", "kierkegaard", "nietzsche", "dostoevsky", "kafka"],
  },
  {
    id: "pragmatism",
    kind: "subgenre",
    name: "Pragmatism",
    parent: "nineteenth-twentieth",
    blurb: "Truth as what works in inquiry, and philosophy as a tool for living.",
    whyTheseFive:
      "The classical pragmatists plus Rorty, the neo-pragmatist who made the tradition controversial again.",
    five: ["peirce", "james", "dewey", "mead", "rorty"],
  },
  {
    id: "analytic",
    kind: "subgenre",
    name: "Analytic Philosophy",
    parent: "analytic",
    blurb:
      "Clarity as a philosophical virtue: logic, reference, and the limits of language.",
    whyTheseFive:
      "The founders and the critics: Frege's logic, Russell and Moore's revolt, Wittgenstein's two philosophies, and Quine's holism.",
    five: ["frege", "russell", "moore", "wittgenstein", "quine"],
  },
  {
    id: "language",
    kind: "subgenre",
    name: "Philosophy of Language",
    parent: "analytic",
    blurb: "Meaning, reference, speech acts, and the strange life of names.",
    whyTheseFive:
      "Five turns in the study of how words hook onto the world.",
    five: ["frege", "russell", "wittgenstein", "austin", "kripke"],
  },
  {
    id: "mind",
    kind: "subgenre",
    name: "Philosophy of Mind",
    parent: "analytic",
    blurb:
      "The mind-body problem, behaviorism, functionalism, and the puzzle of consciousness.",
    whyTheseFive:
      "The canonical arc from substance dualism to the computational and embodied pictures.",
    five: ["descartes", "ryle", "putnam", "davidson", "dennett"],
  },
  {
    id: "epistemology-metaphysics",
    kind: "subgenre",
    name: "Epistemology & Metaphysics",
    parent: "analytic",
    blurb: "What is real, what can we know, and what are the limits of the answer?",
    whyTheseFive: "The five names almost every later theory is arguing with.",
    five: ["plato", "aristotle", "descartes", "hume", "kant"],
  },
  {
    id: "science",
    kind: "subgenre",
    name: "Philosophy of Science",
    parent: "analytic",
    blurb:
      "Induction, falsification, paradigms, and the question of whether science has a method.",
    whyTheseFive:
      "The debate from the New Organon to the anarchist theory of knowledge.",
    five: ["bacon", "popper", "kuhn", "lakatos", "feyerabend"],
  },
  {
    id: "deontology",
    kind: "subgenre",
    name: "Deontology",
    parent: "ethics-politics",
    blurb:
      "Duties, principles, and the refusal to treat a person as a means.",
    whyTheseFive:
      "Kant's foundational theory and four modern attempts to make duty livable in a complex world.",
    five: ["kant", "ross", "anscombe", "korsgaard", "oneill"],
  },
  {
    id: "virtue-ethics",
    kind: "subgenre",
    name: "Virtue Ethics",
    parent: "ethics-politics",
    blurb: "Not 'what should I do?' but 'who should I become?'",
    whyTheseFive:
      "The Greek, Confucian, and Stoic roots of character ethics, plus the two twentieth-century revivals.",
    five: ["aristotle", "confucius", "epictetus", "foot", "macintyre"],
  },
  {
    id: "care-ethics",
    kind: "subgenre",
    name: "Care Ethics",
    parent: "ethics-politics",
    blurb:
      "Morality as responsiveness to particular people rather than the application of a rule.",
    whyTheseFive:
      "The feminist tradition that moved dependence, care work, and relationship to the center of ethics.",
    five: ["gilligan", "noddings", "tronto", "held", "kittay"],
  },
  {
    id: "feminist",
    kind: "subgenre",
    name: "Feminist Philosophy",
    parent: "ethics-politics",
    blurb:
      "The critique of gendered power and the reconstruction of freedom, love, and knowledge.",
    whyTheseFive:
      "Five voices across three centuries, from the first systematic case for women's reason to intersectional and decolonial feminism.",
    five: ["wollstonecraft", "taylor-mill", "beauvoir", "lugones", "bell-hooks"],
  },
  {
    id: "political",
    kind: "subgenre",
    name: "Political Philosophy",
    parent: "ethics-politics",
    blurb: "Justice, authority, freedom, and the conditions of collective life.",
    whyTheseFive:
      "The republic, the Leviathan, the general will, the original position, and the human condition.",
    five: ["plato", "hobbes", "rousseau", "rawls", "arendt"],
  },
  {
    id: "africana",
    kind: "subgenre",
    name: "Africana Philosophy",
    parent: "africana-global-south",
    blurb:
      "African and African diasporic thought on wisdom, reason, race, and personhood.",
    whyTheseFive:
      "From ancient Egyptian instruction to the critique of colonial recognition and the communitarian self.",
    five: ["ptahhotep", "zera-yacob", "amo", "fanon", "gyekye"],
  },
  {
    id: "ubuntu",
    kind: "subgenre",
    name: "Ubuntu & Communalism",
    parent: "africana-global-south",
    blurb: "Personhood as something we achieve with and through others.",
    whyTheseFive:
      "The debate over how strongly to read the communitarian claim, from Mbiti's famous formula to Gyekye's moderate middle.",
    five: ["mbiti", "menkiti", "ramose", "gyekye", "tutu"],
  },
  {
    id: "latin-american-decolonial",
    kind: "subgenre",
    name: "Latin American & Decolonial",
    parent: "africana-global-south",
    blurb:
      "Liberation, dependency, borderlands, and the coloniality of knowledge.",
    whyTheseFive:
      "Five thinkers who turned philosophy toward the periphery and asked who gets to speak.",
    five: ["dussel", "freire", "mariategui", "anzaldua", "mignolo"],
  },
  {
    id: "indigenous",
    kind: "subgenre",
    name: "Indigenous Philosophies",
    parent: "africana-global-south",
    blurb:
      "Relational ontologies, land, and the politics of knowledge — from specific Indigenous nations, not a generic 'indigenous perspective.'",
    whyTheseFive:
      "Five distinct voices; we name them rather than flatten them into one tradition.",
    five: ["deloria", "tuhiwai-smith", "simpson", "ermine", "alfred"],
  },
  {
    id: "confucianism",
    kind: "subgenre",
    name: "Confucianism",
    parent: "asian",
    blurb: "Ritual, relationship, and the lifelong work of becoming humane.",
    whyTheseFive:
      "The classical debate over human nature and the two great Neo-Confucian syntheses.",
    five: ["confucius", "mencius", "xunzi", "zhu-xi", "wang-yangming"],
  },
  {
    id: "daoism",
    kind: "subgenre",
    name: "Daoism",
    parent: "asian",
    blurb:
      "The way that cannot be named, the usefulness of the useless, and the art of not forcing.",
    whyTheseFive:
      "The foundational texts and the commentators who made the tradition metaphysically ambitious.",
    five: ["laozi", "zhuangzi", "liezi", "wang-bi", "guo-xiang"],
  },
  {
    id: "mohism-legalism",
    kind: "subgenre",
    name: "Mohism & Legalism",
    parent: "asian",
    blurb:
      "Impartial care and universal love on one side; law, punishment, and statecraft on the other.",
    whyTheseFive:
      "The two great rivals to Confucianism in the Warring States period.",
    five: ["mozi", "han-feizi", "li-si", "shang-yang", "shen-buhai"],
  },
  {
    id: "vedanta",
    kind: "subgenre",
    name: "Vedanta",
    parent: "asian",
    blurb:
      "The Upanishads systematized: non-dualism, qualified non-dualism, and dualism.",
    whyTheseFive:
      "The Brahma Sutras and the four great commentators who disagreed about the relation between self and Brahman.",
    five: ["badarayana", "gaudapada", "shankara", "ramanuja", "madhva"],
  },
  {
    id: "buddhist",
    kind: "subgenre",
    name: "Buddhist Philosophy",
    parent: "asian",
    blurb: "Suffering, no-self, emptiness, and the ethics of awakening.",
    whyTheseFive:
      "The founder, the two great Indian systematizers, the epistemologist, and the poet of the bodhisattva path.",
    five: ["buddha", "nagarjuna", "vasubandhu", "dharmakirti", "shantideva"],
  },
  {
    id: "nyaya-yoga-jainism",
    kind: "subgenre",
    name: "Nyaya, Yoga & Jainism",
    parent: "asian",
    blurb:
      "Logic, meditative practice, and radical non-violence: three Indian paths often left out of the Buddhism-and-Vedanta story.",
    whyTheseFive:
      "Five foundational voices from traditions that deserve their own shelf.",
    five: ["patanjali", "ishvarakrishna", "aksapada-gautama", "mahavira", "kundakunda"],
  },
  {
    id: "zen-kyoto",
    kind: "subgenre",
    name: "Zen & Kyoto School",
    parent: "asian",
    blurb:
      "Practice-realization, koans, and the twentieth-century encounter between Zen and Western metaphysics.",
    whyTheseFive:
      "Two classical Zen masters and the three Kyoto School philosophers who brought Buddhism into dialogue with Heidegger and Hegel.",
    five: ["dogen", "hakuin", "nishida", "tanabe", "nishitani"],
  },
  {
    id: "japanese-aesthetics",
    kind: "subgenre",
    name: "Japanese Aesthetics",
    parent: "asian",
    blurb:
      "The beauty of impermanence, the flower of performance, and the poetics of idleness.",
    whyTheseFive:
      "Five theorists of attention and transience, from Noh drama to the Kyoto School.",
    five: ["zeami", "kenko", "chomei", "kukai", "nishida"],
  },
  {
    id: "aesthetics",
    kind: "subgenre",
    name: "Aesthetics",
    parent: "aesthetics-life",
    blurb:
      "Beauty, the sublime, art's purpose, and the experience of meaning in form.",
    whyTheseFive:
      "The canonical debate from disinterested pleasure to art as experience and play.",
    five: ["kant", "hegel", "schiller", "dewey", "gadamer"],
  },
  {
    id: "play",
    kind: "subgenre",
    name: "Philosophy of Play",
    parent: "aesthetics-life",
    blurb:
      "Why voluntary obstacles, useless activity, and performance can be the most serious things we do.",
    whyTheseFive:
      "The modern theory of play, plus Dewey's experience and Zeami's Noh — because play is older than the philosophy of play.",
    five: ["suits", "huizinga", "gadamer", "dewey", "zeami"],
  },
  {
    id: "competition-status",
    kind: "subgenre",
    name: "Competition & Status",
    parent: "aesthetics-life",
    blurb:
      "Why we need to win, be seen, and rank above others — and what that need costs.",
    whyTheseFive:
      "Five diagnoses of the desire for recognition, from the war of all against all to the second sex.",
    five: ["nietzsche", "hegel", "rousseau", "hobbes", "beauvoir"],
  },
  {
    id: "joy-pleasure",
    kind: "subgenre",
    name: "Joy & Pleasure",
    parent: "aesthetics-life",
    blurb:
      "What pleasure is, what it isn't, and how to enjoy without being owned by it.",
    whyTheseFive:
      "The ancient therapy of desire, Spinoza's ethics of joy, Nietzsche's yes-saying, Dewey's experience, and Lugones' playfulness.",
    five: ["epicurus", "spinoza", "nietzsche", "dewey", "lugones"],
  },
  {
    id: "death",
    kind: "subgenre",
    name: "Death",
    parent: "aesthetics-life",
    blurb: "The one event we all face and none of us can report on.",
    whyTheseFive:
      "Five attempts to think finitude without flinching: denial, preparation, custom, pessimism, and being-toward-death.",
    five: ["epicurus", "seneca", "montaigne", "schopenhauer", "heidegger"],
  },
  {
    id: "love",
    kind: "subgenre",
    name: "Love",
    parent: "aesthetics-life",
    blurb:
      "Eros, friendship, covenant, and the ethics of loving another free person.",
    whyTheseFive:
      "Five accounts of love from the symposium to the modern claim that love is an action.",
    five: ["plato", "aristotle", "kierkegaard", "beauvoir", "bell-hooks"],
  },
  {
    id: "work",
    kind: "subgenre",
    name: "Work",
    parent: "aesthetics-life",
    blurb: "Alienation, labor, attention, and the question of what work is for.",
    whyTheseFive:
      "Five diagnoses of work under modern conditions, from Marx's estrangement to Weil's attention and Marcuse's critique of comfortable unfreedom.",
    five: ["marx", "arendt", "weil", "dewey", "marcuse"],
  },
  {
    id: "religion",
    kind: "subgenre",
    name: "Philosophy of Religion",
    parent: "religion-environment",
    blurb: "Faith, reason, the problem of evil, and the death of God.",
    whyTheseFive:
      "The arc from Augustinian restlessness to Nietzsche's critique, with Kant and Kierkegaard as the hinge.",
    five: ["augustine", "aquinas", "kant", "kierkegaard", "nietzsche"],
  },
  {
    id: "environment",
    kind: "subgenre",
    name: "Environmental Philosophy",
    parent: "religion-environment",
    blurb:
      "Nature as resource, community, self, or victim — and the ethics that follow.",
    whyTheseFive:
      "Five landmarks in the argument over whether nature has value beyond its use to us.",
    five: ["thoreau", "leopold", "naess", "rolston", "plumwood"],
  },
];

export const LINEAGES: Lineage[] = [...GENRES, ...SUBGENRES];

const byId = new Map(LINEAGES.map((lineage) => [lineage.id, lineage]));

export function getLineage(id: string): Lineage | undefined {
  return byId.get(id);
}

export function subgenresOf(genreId: string): Lineage[] {
  return SUBGENRES.filter((subgenre) => subgenre.parent === genreId);
}

export function lineagesForThinker(thinkerId: string): Lineage[] {
  return LINEAGES.filter((lineage) => lineage.five.includes(thinkerId));
}
