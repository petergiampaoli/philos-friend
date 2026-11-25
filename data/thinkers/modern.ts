import type { Thinker } from "@/lib/schema";

export const modernThinkers: Thinker[] = [
  {
    id: "petrarch",
    name: "Francesco Petrarch",
    dates: "1304–1374",
    tradition: "Renaissance Humanism",
    era: "Renaissance",
    region: "Italy",
    tags: ["self", "wisdom", "love", "attention", "meaning"],
    oneLine:
      "The first humanist: he climbed a mountain for the view, then opened Augustine and found the view was inward.",
    ideas: [
      {
        title: "The inner life",
        summary:
          "Petrarch's ascent of Mont Ventoux is often read as the birth of modern self-consciousness: the landscape is beautiful, but the real drama is the soul examining its own distractions.",
      },
      {
        title: "Return to the sources",
        summary:
          "He championed the recovery of classical Latin and Greek texts, not as antiquarianism but as a way to think more clearly about the present.",
      },
    ],
    quotes: [],
    keyWorks: ["Secretum", "Letters", "Canzoniere"],
  },
  {
    id: "pico",
    name: "Giovanni Pico della Mirandola",
    dates: "1463–1494",
    tradition: "Renaissance Humanism / Neoplatonism",
    era: "Renaissance",
    region: "Italy",
    tags: ["self", "freedom", "wisdom", "meaning", "excellence"],
    oneLine:
      "He made human dignity consist in not having a fixed nature: we are the animal that can become anything.",
    ideas: [
      {
        title: "The dignity of the chameleon",
        summary:
          "In the Oration on the Dignity of Man, God tells humanity that no fixed form has been assigned. We can descend toward the beasts or rise toward the divine. Dignity is a task, not a possession.",
      },
      {
        title: "Concord of philosophies",
        summary:
          "Pico tried to harmonize Plato, Aristotle, Kabbalah, and Islamic thought. The project is less a system than a wager that truth is larger than any school.",
      },
    ],
    quotes: [],
    keyWorks: ["Oration on the Dignity of Man", "900 Theses"],
  },
  {
    id: "erasmus",
    name: "Desiderius Erasmus",
    dates: "c. 1466–1536",
    tradition: "Renaissance Humanism",
    era: "Renaissance",
    region: "Netherlands / Basel",
    tags: ["wisdom", "education", "freedom", "community", "care"],
    oneLine:
      "The great humanist critic: learned, ironic, and allergic to fanaticism in every camp.",
    ideas: [
      {
        title: "The praise of folly",
        summary:
          "Erasmus uses Folly as a mask to satirize scholars, princes, and clergy. The joke is serious: self-importance is the most common human failing, and laughter is a form of correction.",
      },
      {
        title: "Humanism as education",
        summary:
          "He believed that good letters and good manners could reform people more gently than coercion. Education is the slow cultivation of judgment, not the transmission of slogans.",
      },
    ],
    quotes: [],
    keyWorks: ["In Praise of Folly", "Colloquies", "Handbook of a Christian Knight"],
  },
  {
    id: "machiavelli",
    name: "Niccolò Machiavelli",
    dates: "1469–1527",
    tradition: "Renaissance Political Thought",
    era: "Renaissance",
    region: "Florence",
    tags: ["power", "fate", "status", "freedom", "justice"],
    oneLine:
      "He described politics as it is rather than as it should be, and asked what a ruler must do to keep a state.",
    ideas: [
      {
        title: "Virtù and fortuna",
        summary:
          "Political success depends on virtù — skill, energy, and decisive action — but also on fortuna, the unpredictable current of events. The wise prince builds dikes before the flood.",
      },
      {
        title: "The economy of fear",
        summary:
          "Machiavelli argues that fear is more reliable than love for maintaining power, but that a prince should avoid being hated. The analysis is cold, empirical, and deliberately shocking.",
      },
    ],
    quotes: [
      {
        id: "q_machiavelli_1",
        text: "It is better to be feared than loved, if you cannot be both.",
        work: "The Prince",
        locator: "ch. 17",
        translator: "Ninian Hill Thomson",
        status: "verified",
      },
    ],
    keyWorks: ["The Prince", "Discourses on Livy"],
  },
  {
    id: "montaigne",
    name: "Michel de Montaigne",
    dates: "1533–1592",
    tradition: "Renaissance Skepticism",
    era: "Renaissance",
    region: "France",
    tags: ["wisdom", "self", "death", "habit", "friendship", "anxiety"],
    oneLine:
      "The essayist who asked 'What do I know?' and then wrote honestly about fear, friendship, habit, and dying.",
    ideas: [
      {
        title: "Que sais-je?",
        summary:
          "Montaigne's motto captures a cheerful, livable skepticism. He doubts the grand systems but not the texture of experience: food, friendship, illness, and the ordinary self.",
      },
      {
        title: "Custom is a second nature",
        summary:
          "Much of what feels natural is habit. Montaigne tests his own customs by comparing them with others, not to relativize everything but to loosen the grip of the unquestioned.",
      },
    ],
    quotes: [
      {
        id: "q_montaigne_1",
        text: "Que sais-je?",
        work: "Essays",
        locator: "Book II, ch. 12",
        translator: "John Florio",
        status: "verified",
      },
    ],
    keyWorks: ["Essays"],
  },
  {
    id: "descartes",
    name: "René Descartes",
    dates: "1596–1650",
    tradition: "Rationalism",
    era: "Early Modern",
    region: "France / Netherlands",
    tags: ["wisdom", "self", "anxiety", "control", "attention"],
    oneLine:
      "He doubted everything he could doubt, and found that the doubting itself could not be doubted.",
    ideas: [
      {
        title: "Methodic doubt",
        summary:
          "Descartes suspends belief in anything that can be doubted — the senses, the world, even mathematics. The point is to find a foundation that no skeptic can undermine.",
      },
      {
        title: "Mind and body",
        summary:
          "The thinking self is known more certainly than the body. This dualism creates the modern mind-body problem: how do two different substances interact?",
      },
    ],
    quotes: [
      {
        id: "q_descartes_1",
        text: "I think, therefore I am.",
        work: "Discourse on Method",
        locator: "Part IV",
        translator: "John Veitch",
        status: "verified",
      },
    ],
    keyWorks: ["Discourse on Method", "Meditations on First Philosophy"],
  },
  {
    id: "spinoza",
    name: "Baruch Spinoza",
    dates: "1632–1677",
    tradition: "Rationalism",
    era: "Early Modern",
    region: "Netherlands",
    tags: ["freedom", "joy", "desire", "nature", "wisdom", "self"],
    oneLine:
      "God or Nature is one substance; freedom is understanding necessity, and joy is the increase of our power to act.",
    ideas: [
      {
        title: "Monism",
        summary:
          "There is only one substance, which can be described as God or as Nature. Mind and body are two attributes of the same reality, not two separate things.",
      },
      {
        title: "Conatus and joy",
        summary:
          "Everything strives to persevere in its being. Joy is the feeling of that power increasing; sadness is its decrease. Reason helps us understand what actually increases our power rather than what merely feels good now.",
      },
    ],
    quotes: [
      {
        id: "q_spinoza_1",
        text: "Joy is the passage from a lesser to a greater perfection.",
        work: "Ethics",
        locator: "Part III, Definitions of the Emotions, 2",
        translator: "R. H. M. Elwes",
        status: "verified",
      },
    ],
    keyWorks: ["Ethics", "Theological-Political Treatise"],
  },
  {
    id: "leibniz",
    name: "Gottfried Wilhelm Leibniz",
    dates: "1646–1716",
    tradition: "Rationalism",
    era: "Early Modern",
    region: "Germany",
    tags: ["wisdom", "meaning", "fate", "hope", "self"],
    oneLine:
      "The philosopher of sufficient reason, monads, and the best of all possible worlds.",
    ideas: [
      {
        title: "Monads",
        summary:
          "Reality consists of simple, immaterial substances, each perceiving the universe from its own point of view. There are no truly independent parts; everything expresses the whole.",
      },
      {
        title: "The best of all possible worlds",
        summary:
          "A good God would create the best possible world. Leibniz does not deny suffering; he argues that a world with freedom and growth may be better than a world without them.",
      },
    ],
    quotes: [],
    keyWorks: ["Monadology", "Theodicy", "Discourse on Metaphysics"],
  },
  {
    id: "malebranche",
    name: "Nicolas Malebranche",
    dates: "1638–1715",
    tradition: "Rationalism / Occasionalism",
    era: "Early Modern",
    region: "France",
    tags: ["wisdom", "self", "meaning", "attention", "fate"],
    oneLine:
      "He argued that God is the only true cause, and that we see all things in God.",
    ideas: [
      {
        title: "Occasionalism",
        summary:
          "Created things do not really cause anything; God is the sole efficient cause. When a billiard ball moves another, the collision is only the occasion for divine action.",
      },
      {
        title: "Seeing in God",
        summary:
          "The mind's deepest knowledge is not a picture stored in the brain but a participation in the divine ideas. Attention is a kind of prayer.",
      },
    ],
    quotes: [],
    keyWorks: ["The Search after Truth", "Dialogues on Metaphysics"],
  },
  {
    id: "wolff",
    name: "Christian Wolff",
    dates: "1679–1754",
    tradition: "Rationalism",
    era: "Enlightenment",
    region: "Germany",
    tags: ["wisdom", "meaning", "duty", "hope", "education"],
    oneLine:
      "The systematizer who turned Leibniz's insights into a teachable German philosophy.",
    ideas: [
      {
        title: "Philosophy as a science",
        summary:
          "Wolff organized philosophy into a rigorous system with demonstrated conclusions. His textbooks made philosophy a university subject rather than a gentleman's hobby.",
      },
      {
        title: "Teleology",
        summary:
          "The world is a purposive order, and human beings have a vocation within it. Reason's task is to understand that order and align life with it.",
      },
    ],
    quotes: [],
    keyWorks: ["Reasonable Thoughts on God, the World, and the Soul of Man"],
  },
  {
    id: "bacon",
    name: "Francis Bacon",
    dates: "1561–1626",
    tradition: "Empiricism",
    era: "Early Modern",
    region: "England",
    tags: ["wisdom", "power", "nature", "technology", "education"],
    oneLine:
      "He told us to stop arguing with the ancients and start interrogating nature — and to notice the idols in our own heads.",
    ideas: [
      {
        title: "The idols of the mind",
        summary:
          "Bacon catalogues the biases that distort inquiry: idols of the tribe, the cave, the marketplace, and the theatre. Good method begins with an audit of your own perception.",
      },
      {
        title: "Knowledge as power",
        summary:
          "The point of science is not contemplation for its own sake but the relief of human suffering. Bacon's program joins truth to utility and helped shape the modern research ideal.",
      },
    ],
    quotes: [
      {
        id: "q_bacon_1",
        text: "Knowledge itself is power.",
        work: "Meditationes Sacrae",
        locator: "Of Heresies",
        translator: "James Spedding",
        status: "verified",
      },
    ],
    keyWorks: ["Novum Organum", "The Advancement of Learning", "New Atlantis"],
  },
  {
    id: "locke",
    name: "John Locke",
    dates: "1632–1704",
    tradition: "Empiricism / Liberalism",
    era: "Early Modern",
    region: "England",
    tags: ["freedom", "power", "justice", "education", "self"],
    oneLine:
      "The mind begins as a blank slate, government rests on consent, and property is grounded in labor.",
    ideas: [
      {
        title: "The blank slate",
        summary:
          "There are no innate ideas. Experience writes on the mind through sensation and reflection. This makes education, environment, and habit far more important than inherited status.",
      },
      {
        title: "Consent and property",
        summary:
          "Legitimate government rests on the consent of the governed and exists to protect life, liberty, and estate. When it betrays that trust, resistance is justified.",
      },
    ],
    quotes: [],
    keyWorks: ["An Essay Concerning Human Understanding", "Two Treatises of Government"],
  },
  {
    id: "berkeley",
    name: "George Berkeley",
    dates: "1685–1753",
    tradition: "Empiricism / Idealism",
    era: "Early Modern",
    region: "Ireland",
    tags: ["wisdom", "self", "nature", "attention", "meaning"],
    oneLine:
      "To be is to be perceived: matter is not a hidden substratum, but a useful word for regular ideas.",
    ideas: [
      {
        title: "Immaterialism",
        summary:
          "We never perceive matter, only ideas. A tree exists because it is perceived — by us, or by God when no one is looking. The ordinary world remains; the metaphysical extra is removed.",
      },
      {
        title: "God as the ground of order",
        summary:
          "The regularity of experience is not produced by blind matter but by the mind of God. Berkeley's idealism is meant to defend common sense and religion at once.",
      },
    ],
    quotes: [],
    keyWorks: ["A Treatise Concerning the Principles of Human Knowledge", "Three Dialogues"],
  },
  {
    id: "hume",
    name: "David Hume",
    dates: "1711–1776",
    tradition: "Empiricism / Skepticism",
    era: "Enlightenment",
    region: "Scotland",
    tags: ["wisdom", "habit", "self", "desire", "anxiety", "attention"],
    oneLine:
      "The most genial skeptic in philosophy: causation is habit, the self is a bundle, and reason is the slave of the passions.",
    ideas: [
      {
        title: "The bundle theory of the self",
        summary:
          "When Hume looks inward, he finds perceptions, not a permanent self. The 'I' is a bundle of experiences held together by memory and imagination, not a simple substance.",
      },
      {
        title: "Reason and passion",
        summary:
          "Reason can tell us how to get what we want, but it cannot tell us what to want. Moral and practical motivation comes from sentiment, not from pure logic.",
      },
    ],
    quotes: [
      {
        id: "q_hume_1",
        text: "Reason is, and ought only to be the slave of the passions.",
        work: "A Treatise of Human Nature",
        locator: "Book II, part 3, §3",
        translator: "L. A. Selby-Bigge",
        status: "verified",
      },
    ],
    keyWorks: ["A Treatise of Human Nature", "An Enquiry Concerning Human Understanding"],
  },
  {
    id: "reid",
    name: "Thomas Reid",
    dates: "1710–1796",
    tradition: "Common-Sense Philosophy",
    era: "Enlightenment",
    region: "Scotland",
    tags: ["wisdom", "self", "attention", "habit", "meaning"],
    oneLine:
      "He answered Hume by arguing that common sense is not a prejudice but the foundation of inquiry.",
    ideas: [
      {
        title: "Common sense",
        summary:
          "We cannot prove that the external world exists or that other minds are real, but we are entitled to take these as first principles. Philosophy that denies them has lost its way.",
      },
      {
        title: "Direct perception",
        summary:
          "We perceive objects, not inner copies of objects. Reid rejects the 'way of ideas' that led Hume to skepticism, and restores a more ordinary relation to the world.",
      },
    ],
    quotes: [],
    keyWorks: ["An Inquiry into the Human Mind", "Essays on the Intellectual Powers"],
  },
  {
    id: "hobbes",
    name: "Thomas Hobbes",
    dates: "1588–1679",
    tradition: "Social Contract",
    era: "Early Modern",
    region: "England",
    tags: ["power", "status", "competition", "anxiety", "justice", "community"],
    oneLine:
      "Without a common power, life is a war of every person against every person — and fear is the engine of the state.",
    ideas: [
      {
        title: "The state of nature",
        summary:
          "Hobbes imagines life without government: competition, distrust, and glory-seeking produce a war of all against all. The fear of violent death makes peace rational.",
      },
      {
        title: "The Leviathan",
        summary:
          "To escape the state of nature, people authorize a sovereign to hold power. The sovereign is not a party to the contract; the point is to make coordination possible, not to make rule lovable.",
      },
    ],
    quotes: [
      {
        id: "q_hobbes_1",
        text: "The condition of man is a condition of war of everyone against everyone.",
        work: "Leviathan",
        locator: "ch. 13",
        translator: "A. R. Waller",
        status: "verified",
      },
    ],
    keyWorks: ["Leviathan", "De Cive"],
  },
  {
    id: "rousseau",
    name: "Jean-Jacques Rousseau",
    dates: "1712–1778",
    tradition: "Enlightenment / Social Contract",
    era: "Enlightenment",
    region: "Geneva / France",
    tags: ["freedom", "comparison", "status", "community", "education", "nature"],
    oneLine:
      "He diagnosed the poison of comparison and the dream of a general will that could make us free together.",
    ideas: [
      {
        title: "Amour-propre",
        summary:
          "Rousseau distinguishes self-love from vanity. Amour-propre is the need to be esteemed by others; it makes us dependent on opinions and turns life into a competition for recognition.",
      },
      {
        title: "The general will",
        summary:
          "A legitimate state expresses the general will — what citizens would choose as a body. Obedience to that will can be freedom, but only if no faction captures it.",
      },
    ],
    quotes: [
      {
        id: "q_rousseau_1",
        text: "Man is born free, and everywhere he is in chains.",
        work: "The Social Contract",
        locator: "Book I, ch. 1",
        translator: "G. D. H. Cole",
        status: "verified",
      },
    ],
    keyWorks: ["The Social Contract", "Discourse on Inequality", "Emile"],
  },
  {
    id: "montesquieu",
    name: "Montesquieu",
    dates: "1689–1755",
    tradition: "Enlightenment Political Thought",
    era: "Enlightenment",
    region: "France",
    tags: ["power", "justice", "freedom", "fate", "community"],
    oneLine:
      "He argued that liberty survives only when power is checked by power, and that laws are shaped by climate, custom, and history.",
    ideas: [
      {
        title: "Separation of powers",
        summary:
          "A single sovereign, however benevolent, tends toward tyranny. Dividing legislative, executive, and judicial power creates a system of checks that protects liberty.",
      },
      {
        title: "The spirit of laws",
        summary:
          "Laws are not pure deductions from reason; they are adapted to a people's circumstances. Political philosophy must become comparative and empirical.",
      },
    ],
    quotes: [],
    keyWorks: ["The Spirit of the Laws", "Persian Letters"],
  },
  {
    id: "voltaire",
    name: "Voltaire",
    dates: "1694–1778",
    tradition: "Enlightenment",
    era: "Enlightenment",
    region: "France",
    tags: ["freedom", "justice", "wisdom", "hope", "status"],
    oneLine:
      "The Enlightenment's most famous polemicist: against fanaticism, cruelty, and philosophical optimism.",
    ideas: [
      {
        title: "Toleration",
        summary:
          "Voltaire's campaigns against religious persecution made toleration a public cause. The enemy is not belief but the desire to impose belief by force.",
      },
      {
        title: "Candide's garden",
        summary:
          "After satirizing the claim that this is the best of all possible worlds, Candide concludes that we should cultivate our garden. The ending is less quietism than a call to concrete work.",
      },
    ],
    quotes: [],
    keyWorks: ["Candide", "Letters Concerning the English Nation", "Treatise on Tolerance"],
  },
  {
    id: "kant",
    name: "Immanuel Kant",
    dates: "1724–1804",
    tradition: "German Idealism / Deontology",
    era: "Enlightenment",
    region: "Prussia",
    tags: ["duty", "freedom", "wisdom", "meaning", "love", "art"],
    oneLine:
      "He argued that the mind shapes experience, that morality is grounded in autonomy, and that we must treat persons as ends.",
    ideas: [
      {
        title: "The categorical imperative",
        summary:
          "Act only on maxims you could will as universal law, and treat humanity always as an end, never merely as a means. Morality is binding because it is self-legislated by reason.",
      },
      {
        title: "The Copernican revolution",
        summary:
          "We do not passively receive a ready-made world; the mind imposes space, time, and causality on experience. Metaphysics must examine the conditions of possible knowledge.",
      },
    ],
    quotes: [
      {
        id: "q_kant_1",
        text: "Sapere aude! Have courage to use your own understanding.",
        work: "What Is Enlightenment?",
        locator: "Opening paragraph",
        translator: "Lewis White Beck",
        status: "verified",
      },
    ],
    keyWorks: ["Critique of Pure Reason", "Groundwork of the Metaphysics of Morals", "Critique of Judgment"],
  },
  {
    id: "fichte",
    name: "Johann Gottlieb Fichte",
    dates: "1762–1814",
    tradition: "German Idealism",
    era: "Enlightenment",
    region: "Germany",
    tags: ["self", "freedom", "duty", "community", "excellence"],
    oneLine:
      "He made the self-positing I the foundation of philosophy and turned idealism into a call to action.",
    ideas: [
      {
        title: "The I posits itself",
        summary:
          "The starting point of philosophy is not a thing but an activity: the self posits itself and, in doing so, posits a world that limits it. Reality is a task for freedom.",
      },
      {
        title: "The vocation of man",
        summary:
          "Fichte's popular lectures describe life as an infinite striving toward moral freedom. The world is the material through which duty becomes real.",
      },
    ],
    quotes: [],
    keyWorks: ["Foundations of the Science of Knowledge", "The Vocation of Man"],
  },
  {
    id: "schelling",
    name: "Friedrich Schelling",
    dates: "1775–1854",
    tradition: "German Idealism",
    era: "Romanticism",
    region: "Germany",
    tags: ["nature", "self", "meaning", "art", "freedom"],
    oneLine:
      "He tried to think nature and spirit as one living process, with art as the place where the unity becomes visible.",
    ideas: [
      {
        title: "Nature as visible spirit",
        summary:
          "Nature is not dead matter waiting to be known; it is spirit in the process of becoming. The same creative power appears in the organism and in the mind.",
      },
      {
        title: "Art as the organ of philosophy",
        summary:
          "The absolute cannot be fully captured in concepts. Art expresses the unity of freedom and necessity in a way that philosophy can only approach.",
      },
    ],
    quotes: [],
    keyWorks: ["System of Transcendental Idealism", "Philosophical Investigations into the Essence of Human Freedom"],
  },
  {
    id: "hegel",
    name: "G. W. F. Hegel",
    dates: "1770–1831",
    tradition: "German Idealism",
    era: "19th century",
    region: "Germany",
    tags: ["recognition", "freedom", "meaning", "power", "community", "wisdom"],
    oneLine:
      "History is the story of spirit becoming free, and self-consciousness is born in the struggle to be recognized by another.",
    ideas: [
      {
        title: "The master-slave dialectic",
        summary:
          "Self-consciousness seeks recognition from another self-consciousness. The struggle for recognition produces mastery and bondage — but the slave, through work and transformation of the world, discovers a freedom the master never does.",
      },
      {
        title: "The dialectic",
        summary:
          "Concepts develop through contradiction: a position generates its negation, and the tension is resolved at a higher level. Philosophy's task is to grasp the rationality of the whole, not to apply a formula.",
      },
    ],
    quotes: [
      {
        id: "q_hegel_1",
        text: "The owl of Minerva spreads its wings only with the falling of the dusk.",
        work: "Philosophy of Right",
        locator: "Preface",
        translator: "S. W. Dyde",
        status: "verified",
      },
    ],
    keyWorks: ["Phenomenology of Spirit", "Philosophy of Right", "Logic"],
  },
  {
    id: "herder",
    name: "Johann Gottfried Herder",
    dates: "1744–1803",
    tradition: "Romanticism / Philosophy of Culture",
    era: "Enlightenment",
    region: "Germany",
    tags: ["community", "nature", "wisdom", "language", "meaning"],
    oneLine:
      "He insisted that thought is shaped by language, culture, and history — and that each people has its own center of gravity.",
    ideas: [
      {
        title: "Culture and belonging",
        summary:
          "Herder rejects the idea of a single universal standard of civilization. Each culture has its own values, language, and forms of flourishing; understanding requires entering its point of view.",
      },
      {
        title: "Language as thought",
        summary:
          "We do not first think and then put it into words. Language is the medium in which thought becomes possible, and different languages disclose different worlds.",
      },
    ],
    quotes: [],
    keyWorks: ["Ideas for the Philosophy of History of Humanity", "Treatise on the Origin of Language"],
  },
];
