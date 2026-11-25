import type { Thinker } from "@/lib/schema";

export const asianThinkers: Thinker[] = [
  {
    id: "mencius",
    name: "Mencius",
    dates: "c. 372–289 BCE",
    tradition: "Confucianism",
    era: "Ancient",
    region: "China",
    tags: ["community", "care", "self", "duty", "excellence", "education"],
    oneLine:
      "He argued that human nature is good, and that ethical education is the work of protecting and growing our natural sprouts of compassion.",
    ideas: [
      {
        title: "The four sprouts",
        summary:
          "Mencius claims that every person has incipient tendencies toward compassion, shame, courtesy, and right and wrong. Virtue is the cultivation of these sprouts, not their implantation.",
      },
      {
        title: "Benevolent government",
        summary:
          "A ruler who cares for the people's material welfare and education earns legitimacy. Coercion can produce obedience, but not a flourishing community.",
      },
    ],
    quotes: [],
    keyWorks: ["Mencius"],
  },
  {
    id: "xunzi",
    name: "Xunzi",
    dates: "c. 310–235 BCE",
    tradition: "Confucianism",
    era: "Ancient",
    region: "China",
    tags: ["habit", "education", "duty", "community", "excellence", "nature"],
    oneLine:
      "He argued that human nature is unruly and that ritual and deliberate effort are what make us good.",
    ideas: [
      {
        title: "Human nature is evil",
        summary:
          "Xunzi means that our raw dispositions are selfish and disorderly. Goodness is the result of conscious activity: ritual, education, and repeated practice reshape desire.",
      },
      {
        title: "Ritual as civilization",
        summary:
          "Li is not empty etiquette. It channels desire into stable, shared forms that make cooperation possible and give life beauty.",
      },
    ],
    quotes: [],
    keyWorks: ["Xunzi"],
  },
  {
    id: "zhu-xi",
    name: "Zhu Xi",
    dates: "1130–1200",
    tradition: "Neo-Confucianism",
    era: "Medieval",
    region: "China",
    tags: ["wisdom", "education", "nature", "duty", "attention"],
    oneLine:
      "The great Neo-Confucian synthesizer, who joined metaphysics, ethics, and the disciplined investigation of things.",
    ideas: [
      {
        title: "Li and qi",
        summary:
          "Everything is composed of qi, organized by li — the pattern or principle that makes it what it is. Human excellence consists in clarifying the li within oneself.",
      },
      {
        title: "The investigation of things",
        summary:
          "Zhu Xi taught that moral knowledge grows through sustained attention to things and texts. The goal is not detached information but the extension of moral understanding.",
      },
    ],
    quotes: [],
    keyWorks: ["Commentaries on the Four Books", "Reflections on Things at Hand"],
  },
  {
    id: "wang-yangming",
    name: "Wang Yangming",
    dates: "1472–1529",
    tradition: "Neo-Confucianism",
    era: "Medieval",
    region: "China",
    tags: ["self", "wisdom", "duty", "attention", "habit"],
    oneLine:
      "He taught that the mind is already the standard of right and wrong, and that knowing without acting is not really knowing.",
    ideas: [
      {
        title: "The unity of knowledge and action",
        summary:
          "Wang rejects the idea that one can know the good and fail to do it without contradiction. Genuine knowledge includes the disposition to act; otherwise it is mere verbal acquaintance.",
      },
      {
        title: "Liangzhi",
        summary:
          "Innate moral knowledge is already present in the mind. The task is to remove selfish obstruction so that it can function, not to acquire a new rulebook.",
      },
    ],
    quotes: [],
    keyWorks: ["Instructions for Practical Living", "Inquiry on the Great Learning"],
  },
  {
    id: "laozi",
    name: "Laozi",
    dates: "c. 6th century BCE",
    tradition: "Daoism",
    era: "Ancient",
    region: "China",
    tags: ["control", "desire", "nature", "wisdom", "freedom", "competition"],
    oneLine:
      "The Dao cannot be named; the wise ruler and the wise person act without forcing, and win without contending.",
    ideas: [
      {
        title: "Wuwei",
        summary:
          "Wuwei is often translated 'non-action,' but it means action without coercion or excess. The sage responds to the situation rather than imposing a plan on it.",
      },
      {
        title: "The usefulness of softness",
        summary:
          "Water is soft, yet it wears down stone. Laozi trusts flexibility, emptiness, and yielding over hardness and domination.",
      },
    ],
    quotes: [
      {
        id: "q_laozi_1",
        text: "He does not strive, and therefore no one can strive with him.",
        work: "Tao Te Ching",
        locator: "ch. 22",
        translator: "James Legge",
        status: "verified",
      },
    ],
    keyWorks: ["Tao Te Ching"],
  },
  {
    id: "zhuangzi",
    name: "Zhuangzi",
    dates: "c. 369–286 BCE",
    tradition: "Daoism",
    era: "Ancient",
    region: "China",
    tags: ["play", "fun", "freedom", "impermanence", "self", "control", "attention"],
    oneLine:
      "He used jokes, parables, and impossible creatures to loosen our grip on fixed distinctions and on the need to win.",
    ideas: [
      {
        title: "The transformation of things",
        summary:
          "Zhuangzi's butterfly dream asks whether he is a man dreaming of being a butterfly or a butterfly dreaming of being a man. Identity is a temporary station, not a fortress.",
      },
      {
        title: "The usefulness of the useless",
        summary:
          "A tree that is good for timber gets cut down. Zhuangzi praises the gnarled, useless tree because it survives and flourishes. The game that must be useful may not be worth playing.",
      },
    ],
    quotes: [],
    keyWorks: ["Zhuangzi"],
  },
  {
    id: "liezi",
    name: "Liezi",
    dates: "c. 4th century BCE (text compiled later)",
    tradition: "Daoism",
    era: "Ancient",
    region: "China",
    tags: ["fate", "freedom", "desire", "fun", "wisdom"],
    oneLine:
      "The playful skeptic of the Daoist tradition, who treats fate, effort, and desire with equal irony.",
    ideas: [
      {
        title: "The equalization of opposites",
        summary:
          "Life and death, success and failure, are less separate than they appear. The Liezi uses stories to deflate our attachment to one side of a distinction.",
      },
      {
        title: "Spontaneity",
        summary:
          "The sage moves with the situation rather than against it. Effort is not always virtue; sometimes the most skillful act is the one that does not announce itself.",
      },
    ],
    quotes: [],
    keyWorks: ["Liezi"],
  },
  {
    id: "wang-bi",
    name: "Wang Bi",
    dates: "226–249 CE",
    tradition: "Neo-Daoism",
    era: "Ancient",
    region: "China",
    tags: ["wisdom", "meaning", "language", "self", "nature"],
    oneLine:
      "His commentary on the Daodejing made nothingness the root of all things and helped create philosophical Neo-Daoism.",
    ideas: [
      {
        title: "Non-being as root",
        summary:
          "Wang Bi reads the Dao as wu — non-being or indeterminacy — from which all determinate things arise. The source cannot itself be a thing among things.",
      },
      {
        title: "Forgetting the words",
        summary:
          "Language is a tool for pointing at meaning. Once you have the meaning, you can let go of the words, like a trap once the rabbit is caught.",
      },
    ],
    quotes: [],
    keyWorks: ["Commentary on the Laozi", "Commentary on the I Ching"],
  },
  {
    id: "guo-xiang",
    name: "Guo Xiang",
    dates: "c. 252–312 CE",
    tradition: "Neo-Daoism",
    era: "Ancient",
    region: "China",
    tags: ["self", "freedom", "fate", "nature", "meaning"],
    oneLine:
      "He argued that each thing is right in its own place, and that freedom lies in accepting one's nature rather than transcending it.",
    ideas: [
      {
        title: "Self-transformation",
        summary:
          "Guo Xiang denies a single creator or universal Dao that stands above things. Each thing spontaneously becomes what it is, and the whole is the sum of these self-transformations.",
      },
      {
        title: "Contentment with one's nature",
        summary:
          "Freedom is not doing whatever you want; it is acting according to your nature without inner conflict. The small bird and the great peng are each complete in their own way.",
      },
    ],
    quotes: [],
    keyWorks: ["Commentary on the Zhuangzi"],
  },
  {
    id: "mozi",
    name: "Mozi",
    dates: "c. 470–391 BCE",
    tradition: "Mohism",
    era: "Ancient",
    region: "China",
    tags: ["care", "justice", "community", "wisdom"],
    oneLine:
      "He argued for impartial care, against aggressive war, and for beliefs that can be tested by their benefits.",
    ideas: [
      {
        title: "Impartial care",
        summary:
          "Mozi's jian ai is not romantic love but an impartial concern for all people. Partiality toward family and clan is the root of conflict.",
      },
      {
        title: "The tests of belief",
        summary:
          "Mozi evaluates doctrines by their origin, evidence, and practical benefit. Philosophy should be useful to the community, not merely elegant.",
      },
    ],
    quotes: [],
    keyWorks: ["Mozi"],
  },
  {
    id: "han-feizi",
    name: "Han Feizi",
    dates: "c. 280–233 BCE",
    tradition: "Legalism",
    era: "Ancient",
    region: "China",
    tags: ["power", "justice", "duty", "status", "competition"],
    oneLine:
      "The great Legalist: a ruler should govern through law, technique, and position, not through moral example.",
    ideas: [
      {
        title: "Law and punishment",
        summary:
          "Clear laws and consistent rewards and punishments make a state predictable. Han Feizi distrusts virtue as a basis for order because it is unevenly distributed.",
      },
      {
        title: "The two handles",
        summary:
          "The ruler controls reward and punishment. Power is maintained by keeping these handles and by preventing ministers from forming independent bases of authority.",
      },
    ],
    quotes: [],
    keyWorks: ["Han Feizi"],
  },
  {
    id: "li-si",
    name: "Li Si",
    dates: "c. 280–208 BCE",
    tradition: "Legalism",
    era: "Ancient",
    region: "China",
    tags: ["power", "status", "work", "justice", "community"],
    oneLine:
      "The Qin chancellor who turned Legalist theory into imperial administration and standardized the Chinese state.",
    ideas: [
      {
        title: "Centralized administration",
        summary:
          "Li Si helped replace hereditary lords with appointed officials and standardized weights, measures, and script. Philosophy became institutional design.",
      },
      {
        title: "The dangers of faction",
        summary:
          "He warned that private networks and scholarly factions undermine state authority. The ruler must keep administration impersonal and legible.",
      },
    ],
    quotes: [],
    keyWorks: ["Memorials and reports (in the Records of the Grand Historian)"],
  },
  {
    id: "shang-yang",
    name: "Shang Yang",
    dates: "c. 390–338 BCE",
    tradition: "Legalism",
    era: "Ancient",
    region: "China",
    tags: ["power", "work", "status", "justice", "competition"],
    oneLine:
      "He rebuilt Qin around agriculture and war, rewarding merit and punishing dissent with equal severity.",
    ideas: [
      {
        title: "Rewards and punishments",
        summary:
          "Shang Yang's reforms tied social rank to military achievement and agricultural output. The law should be public, uniform, and enforced without exception.",
      },
      {
        title: "The weak people, the strong state",
        summary:
          "He deliberately sought to weaken independent aristocratic power and bind the population to the ruler. The state's strength comes from direct control, not from intermediary loyalties.",
      },
    ],
    quotes: [],
    keyWorks: ["The Book of Lord Shang"],
  },
  {
    id: "shen-buhai",
    name: "Shen Buhai",
    dates: "c. 400–337 BCE",
    tradition: "Legalism",
    era: "Ancient",
    region: "China",
    tags: ["power", "work", "wisdom", "status", "duty"],
    oneLine:
      "The Legalist theorist of administrative technique, who taught rulers to govern by method rather than by charisma.",
    ideas: [
      {
        title: "Technique of the ruler",
        summary:
          "Shen Buhai focuses on the machinery of administration: matching titles to performance, auditing officials, and keeping decision-making centralized.",
      },
      {
        title: "The ruler as non-action",
        summary:
          "A good ruler does not micromanage. By setting clear methods and letting officials perform, the ruler preserves authority and avoids becoming dependent on any one minister.",
      },
    ],
    quotes: [],
    keyWorks: ["Fragments (via Han Feizi and others)"],
  },
  {
    id: "badarayana",
    name: "Badarayana",
    dates: "c. 2nd century BCE–2nd century CE",
    tradition: "Vedanta",
    era: "Ancient",
    region: "India",
    tags: ["wisdom", "self", "meaning", "fate", "hope"],
    oneLine:
      "The traditional author of the Brahma Sutras, which systematized the teachings of the Upanishads into a single philosophical text.",
    ideas: [
      {
        title: "The Brahma Sutras",
        summary:
          "The text organizes the Upanishadic teaching around Brahman as the ultimate reality and source of the world. Later commentators disagreed about how to read it.",
      },
      {
        title: " inquiry into Brahman",
        summary:
          "Vedanta begins with a desire to know the ground of existence. Philosophy is not a neutral academic exercise but a path toward liberation.",
      },
    ],
    quotes: [],
    keyWorks: ["Brahma Sutras"],
  },
  {
    id: "gaudapada",
    name: "Gaudapada",
    dates: "c. 6th century CE",
    tradition: "Advaita Vedanta",
    era: "Medieval",
    region: "India",
    tags: ["self", "meaning", "wisdom", "attachment", "impermanence"],
    oneLine:
      "The early Advaitin who used the analysis of dream and waking to argue that the world of change is maya.",
    ideas: [
      {
        title: "Dream and waking",
        summary:
          "Gaudapada compares waking experience to a dream. Both are constructions of consciousness; neither reveals a final, independent reality.",
      },
      {
        title: "Non-origination",
        summary:
          "If Brahman is the only reality, nothing ever truly comes into being. The apparent world is a misperception, and liberation is the end of that misperception.",
      },
    ],
    quotes: [],
    keyWorks: ["Mandukya Karika"],
  },
  {
    id: "shankara",
    name: "Adi Shankara",
    dates: "788–820 CE",
    tradition: "Advaita Vedanta",
    era: "Medieval",
    region: "India",
    tags: ["self", "wisdom", "meaning", "attachment", "freedom"],
    oneLine:
      "The great non-dualist: Brahman alone is real, the world is appearance, and the self is not the ego.",
    ideas: [
      {
        title: "Advaita",
        summary:
          "There is no ultimate difference between the individual self and Brahman. The sense of separateness is ignorance, produced by mistaking the changing body and mind for the self.",
      },
      {
        title: "Liberation through knowledge",
        summary:
          "Shankara emphasizes jnana — direct knowledge of non-duality — rather than ritual alone. Action can purify the mind, but only knowledge removes ignorance.",
      },
    ],
    quotes: [],
    keyWorks: ["Brahma Sutra Bhasya", "Upadesasahasri"],
  },
  {
    id: "ramanuja",
    name: "Ramanuja",
    dates: "1017–1137",
    tradition: "Vishishtadvaita Vedanta",
    era: "Medieval",
    region: "India",
    tags: ["love", "self", "community", "meaning", "wisdom"],
    oneLine:
      "He argued that the self and the world are real but dependent on God, and that devotion is the path to liberation.",
    ideas: [
      {
        title: "Qualified non-dualism",
        summary:
          "Brahman is one, but it contains real distinctions: God, souls, and matter are related as body to soul. The world is not an illusion to be discarded.",
      },
      {
        title: "Bhakti",
        summary:
          "Ramanuja makes loving devotion central. The self cannot achieve union by knowledge alone; it is drawn into relationship with a personal God.",
      },
    ],
    quotes: [],
    keyWorks: ["Sri Bhashya", "Gita Bhashya"],
  },
  {
    id: "madhva",
    name: "Madhvacharya",
    dates: "1238–1317",
    tradition: "Dvaita Vedanta",
    era: "Medieval",
    region: "India",
    tags: ["self", "meaning", "wisdom", "love", "duty"],
    oneLine:
      "The dualist: God, souls, and the world are eternally distinct, and liberation is eternal service.",
    ideas: [
      {
        title: "Dvaita",
        summary:
          "Madhva rejects non-dualism. The individual soul is real, dependent on God, and never identical with the divine. Difference is a feature of reality, not ignorance.",
      },
      {
        title: "Devotion and hierarchy",
        summary:
          "Liberation is attained through devotion and grace, and it takes the form of service. His theology is one of the most strongly theistic in the Vedanta tradition.",
      },
    ],
    quotes: [],
    keyWorks: ["Brahma Sutra Bhashya", "Mahabharata Tatparya Nirnaya"],
  },
  {
    id: "buddha",
    name: "The Buddha (Siddhartha Gautama)",
    dates: "c. 5th century BCE",
    tradition: "Buddhism",
    era: "Ancient",
    region: "India",
    tags: ["anxiety", "desire", "attachment", "self", "care", "impermanence"],
    oneLine:
      "The teacher of the Four Noble Truths: suffering is real, its cause is craving, and there is a path out.",
    ideas: [
      {
        title: "The Four Noble Truths",
        summary:
          "Life involves dukkha — unsatisfactoriness, pain, and change. Craving and aversion produce it. Release is possible, and the Eightfold Path is the practice that leads there.",
      },
      {
        title: "Anatta",
        summary:
          "There is no permanent, independent self. What we call 'I' is a stream of changing processes. Clinging to a fixed self is a major source of suffering.",
      },
    ],
    quotes: [
      {
        id: "q_buddha_1",
        text: "All that we are is the result of what we have thought.",
        work: "Dhammapada",
        locator: "Verse 1",
        translator: "Friedrich Max Müller",
        status: "verified",
      },
    ],
    keyWorks: ["Dhammapada", "The Middle Length Discourses"],
  },
  {
    id: "nagarjuna",
    name: "Nāgārjuna",
    dates: "c. 150–250 CE",
    tradition: "Madhyamaka Buddhism",
    era: "Ancient",
    region: "India",
    tags: ["self", "meaning", "attachment", "wisdom", "impermanence"],
    oneLine:
      "He argued that emptiness is not nothingness: things exist only in dependence, and that is why they can change.",
    ideas: [
      {
        title: "Emptiness",
        summary:
          "No thing has an independent essence. Things arise dependently, and precisely because they are empty of fixed nature, they can function and change.",
      },
      {
        title: "The middle way",
        summary:
          "Nāgārjuna avoids both eternalism (things have permanent essences) and nihilism (nothing exists). Emptiness is a cure for both extremes, not a new doctrine to cling to.",
      },
    ],
    quotes: [
      {
        id: "q_nagarjuna_1",
        text: "Whatever is dependently co-arisen, that is explained to be emptiness.",
        work: "Mūlamadhyamakakārikā",
        locator: "24.18",
        translator: "Jay L. Garfield",
        status: "verified",
      },
    ],
    keyWorks: ["Mūlamadhyamakakārikā"],
  },
  {
    id: "vasubandhu",
    name: "Vasubandhu",
    dates: "c. 4th–5th century CE",
    tradition: "Yogācāra Buddhism",
    era: "Ancient",
    region: "India",
    tags: ["mind", "self", "meaning", "attachment", "impermanence"],
    oneLine:
      "The great systematizer of consciousness-only, who argued that the subject-object split is constructed by the mind.",
    ideas: [
      {
        title: "Consciousness-only",
        summary:
          "Vasubandhu argues that the objects we experience are shaped by consciousness and karmic dispositions. The seeming gap between inner and outer is not ontologically basic.",
      },
      {
        title: "The storehouse consciousness",
        summary:
          "A deep layer of mind stores karmic seeds that ripen into future experience. This explains continuity without positing a permanent self.",
      },
    ],
    quotes: [],
    keyWorks: ["Abhidharmakośa", "Thirty Verses on Consciousness-Only"],
  },
  {
    id: "dharmakirti",
    name: "Dharmakīrti",
    dates: "c. 6th–7th century CE",
    tradition: "Buddhist Epistemology",
    era: "Medieval",
    region: "India",
    tags: ["wisdom", "mind", "attention", "meaning", "science"],
    oneLine:
      "The Buddhist logician who argued that perception and inference are the only reliable sources of knowledge.",
    ideas: [
      {
        title: "Perception and inference",
        summary:
          "Perception grasps particulars directly; inference works through universal signs. Most of our confident beliefs are inferences, and they can be wrong.",
      },
      {
        title: "Momentariness",
        summary:
          "Reality consists of momentary particulars. Stability is a construction of thought, useful for action but not a glimpse of a permanent essence.",
      },
    ],
    quotes: [],
    keyWorks: ["Pramāṇavārttika", "Nyāyabindu"],
  },
  {
    id: "shantideva",
    name: "Śāntideva",
    dates: "c. 8th century CE",
    tradition: "Mahāyāna Buddhism",
    era: "Medieval",
    region: "India",
    tags: ["care", "anger", "self", "love", "anxiety", "impermanence"],
    oneLine:
      "The poet-philosopher of the bodhisattva path, who argued that self-cherishing is the root of suffering.",
    ideas: [
      {
        title: "Exchanging self and other",
        summary:
          "Śāntideva invites us to take the other's perspective as seriously as our own. Since self and other are both constructions, the boundary between them can be loosened.",
      },
      {
        title: "Patience with harm",
        summary:
          "Anger at others is misplaced because their actions arise from causes they did not fully choose. Patience is not passivity; it is a clearer response to causation.",
      },
    ],
    quotes: [],
    keyWorks: ["Bodhicaryāvatāra"],
  },
  {
    id: "patanjali",
    name: "Patañjali",
    dates: "c. 2nd century BCE",
    tradition: "Yoga",
    era: "Ancient",
    region: "India",
    tags: ["attention", "control", "self", "habit", "freedom"],
    oneLine:
      "The systematizer of Yoga: the mind can be stilled through practice and detachment, and that stillness is freedom.",
    ideas: [
      {
        title: "The eight limbs",
        summary:
          "Yoga is a disciplined path: ethical restraints, observances, posture, breath, withdrawal, concentration, meditation, and absorption. Philosophy is embodied practice.",
      },
      {
        title: "Citta-vrtti-nirodha",
        summary:
          "The goal is the cessation of the fluctuations of the mind. Purusha, pure consciousness, is then known as distinct from the changing contents of experience.",
      },
    ],
    quotes: [
      {
        id: "q_patanjali_1",
        text: "Yoga is the stilling of the modifications of the mind.",
        work: "Yoga Sutras",
        locator: "1.2",
        translator: "Barbara Stoler Miller",
        status: "verified",
      },
    ],
    keyWorks: ["Yoga Sutras"],
  },
  {
    id: "ishvarakrishna",
    name: "Īśvarakṛṣṇa",
    dates: "c. 4th–5th century CE",
    tradition: "Samkhya",
    era: "Ancient",
    region: "India",
    tags: ["self", "nature", "freedom", "wisdom", "impermanence"],
    oneLine:
      "The author of the Samkhya Karika, which distinguishes pure consciousness from the entire natural world.",
    ideas: [
      {
        title: "Purusha and Prakriti",
        summary:
          "Reality has two ultimate principles: purusha, pure witnessing consciousness, and prakriti, the active material matrix of mind and body. Suffering arises from confusing them.",
      },
      {
        title: "Liberation as discrimination",
        summary:
          "Freedom comes from clearly discerning that the self is not the changing body, mind, or personality. The witness is already free; it only needs to be recognized.",
      },
    ],
    quotes: [],
    keyWorks: ["Samkhya Karika"],
  },
  {
    id: "aksapada-gautama",
    name: "Akṣapāda Gautama",
    dates: "c. 2nd century CE",
    tradition: "Nyaya",
    era: "Ancient",
    region: "India",
    tags: ["wisdom", "language", "science", "meaning", "attention"],
    oneLine:
      "The founder of Nyaya, India's great school of logic, debate, and reliable knowledge.",
    ideas: [
      {
        title: "Means of knowledge",
        summary:
          "Nyaya analyzes perception, inference, comparison, and testimony as sources of knowledge. Philosophical disagreement should be settled by reasons, not authority alone.",
      },
      {
        title: "Logic for liberation",
        summary:
          "The point of argument is not winning for its own sake but removing false beliefs. Nyaya connects rigor to the practical goal of freedom from suffering.",
      },
    ],
    quotes: [],
    keyWorks: ["Nyaya Sutras"],
  },
  {
    id: "mahavira",
    name: "Mahāvīra",
    dates: "c. 5th century BCE",
    tradition: "Jainism",
    era: "Ancient",
    region: "India",
    tags: ["care", "attachment", "anger", "self", "control"],
    oneLine:
      "The great Jain teacher: non-violence, non-attachment, and the many-sidedness of truth.",
    ideas: [
      {
        title: "Ahiṃsā",
        summary:
          "Non-violence is not only a rule about actions but a discipline of attention to the harm one causes. Jain practice extends it to animals and even to microscopic life.",
      },
      {
        title: "Anekāntavāda",
        summary:
          "Reality is many-sided, and every judgment captures only one perspective. Intellectual humility follows: your opponent may be right from a standpoint you cannot yet occupy.",
      },
    ],
    quotes: [],
    keyWorks: ["Acharanga Sutra (tradition)"],
  },
  {
    id: "kundakunda",
    name: "Kundakunda",
    dates: "c. 2nd century CE",
    tradition: "Jain Philosophy",
    era: "Ancient",
    region: "India",
    tags: ["self", "attachment", "wisdom", "control", "impermanence"],
    oneLine:
      "The Jain metaphysician who distinguished the pure self from the karmic matter that obscures it.",
    ideas: [
      {
        title: "The pure self",
        summary:
          "In Jain thought, the soul is inherently pure and omniscient, but karmic particles obscure it. Liberation is the removal of that obstruction, not the acquisition of a new nature.",
      },
      {
        title: "Two standpoints",
        summary:
          "Kundakunda distinguishes the conventional standpoint, where change and action matter, from the ultimate standpoint, where the self is pure consciousness. Wisdom holds both.",
      },
    ],
    quotes: [],
    keyWorks: ["Samayasara", "Pravachanasara"],
  },
  {
    id: "dogen",
    name: "Dōgen",
    dates: "1200–1253",
    tradition: "Sōtō Zen",
    era: "Medieval",
    region: "Japan",
    tags: ["attention", "self", "habit", "impermanence", "meaning"],
    oneLine:
      "Practice is not a means to awakening; practice is the expression of awakening, here and now.",
    ideas: [
      {
        title: "Practice-realization",
        summary:
          "Dōgen rejects the idea that meditation is a technique for getting somewhere. Sitting is the enactment of Buddha-nature, not a ticket to it.",
      },
      {
        title: "Being-time",
        summary:
          "Time is not a container through which things pass. Each moment is a complete expression of being, and the self is not separate from that unfolding.",
      },
    ],
    quotes: [
      {
        id: "q_dogen_1",
        text: "To study the self is to forget the self.",
        work: "Genjōkōan",
        locator: "Opening",
        translator: "Kazuaki Tanahashi",
        status: "verified",
      },
    ],
    keyWorks: ["Shōbōgenzō"],
  },
  {
    id: "hakuin",
    name: "Hakuin Ekaku",
    dates: "1686–1769",
    tradition: "Rinzai Zen",
    era: "Early Modern",
    region: "Japan",
    tags: ["attention", "anxiety", "self", "habit", "courage"],
    oneLine:
      "The Zen master who made the koan a central practice and asked what the sound of one hand is.",
    ideas: [
      {
        title: "Kenshō",
        summary:
          "Hakuin taught that seeing one's nature is possible in this life. The koan is not a riddle to solve intellectually but a pressure that transforms attention.",
      },
      {
        title: "The great doubt",
        summary:
          "Doubt is not the enemy of practice; it is fuel. The practitioner holds the question until the ordinary self breaks open.",
      },
    ],
    quotes: [
      {
        id: "q_hakuin_1",
        text: "What is the sound of one hand clapping?",
        work: "Traditional koan attributed to Hakuin",
        locator: "Miscellaneous koans",
        translator: "Zen tradition",
        status: "verified",
      },
    ],
    keyWorks: ["Selected writings", "Koan collections"],
  },
  {
    id: "nishida",
    name: "Nishida Kitarō",
    dates: "1870–1945",
    tradition: "Kyoto School",
    era: "20th century",
    region: "Japan",
    tags: ["self", "meaning", "attention", "art", "community"],
    oneLine:
      "He began from pure experience and developed a philosophy of place, nothingness, and the self-world relation.",
    ideas: [
      {
        title: "Pure experience",
        summary:
          "Before the split between subject and object, there is a direct field of experience. Nishida treats this as the ground from which self and world emerge.",
      },
      {
        title: "Basho",
        summary:
          "His later notion of place or topos describes a field in which beings appear. The self is not a substance but a locus of relations.",
      },
    ],
    quotes: [],
    keyWorks: ["An Inquiry into the Good", "Fundamental Problems of Philosophy"],
  },
  {
    id: "tanabe",
    name: "Tanabe Hajime",
    dates: "1885–1962",
    tradition: "Kyoto School",
    era: "20th century",
    region: "Japan",
    tags: ["anxiety", "meaning", "duty", "hope", "self"],
    oneLine:
      "He turned the Kyoto School toward history and repentance, describing philosophy as metanoetics.",
    ideas: [
      {
        title: "Metanoetics",
        summary:
          "Tanabe argues that reason cannot save itself; it must pass through repentance and the awareness of its own limits. Philosophy becomes a practice of conversion rather than a system.",
      },
      {
        title: "History and the state",
        summary:
          "His wartime engagement remains controversial. He tried to think the nation historically while later confronting the failure of that project.",
      },
    ],
    quotes: [],
    keyWorks: ["Philosophy as Metanoetics"],
  },
  {
    id: "nishitani",
    name: "Nishitani Keiji",
    dates: "1900–1990",
    tradition: "Kyoto School",
    era: "20th century",
    region: "Japan",
    tags: ["meaning", "anxiety", "self", "death", "hope"],
    oneLine:
      "He argued that nihilism must be passed through, not avoided, and that emptiness is the standpoint from which life can be affirmed.",
    ideas: [
      {
        title: "Nihilism",
        summary:
          "Nishitani takes the collapse of traditional meaning seriously. The question is whether one can stand in the void without falling into despair.",
      },
      {
        title: "Emptiness as affirmation",
        summary:
          "Śūnyatā is not a blank void but a relational openness in which things appear as they are. From that standpoint, the ordinary world can be affirmed again.",
      },
    ],
    quotes: [],
    keyWorks: ["Religion and Nothingness"],
  },
  {
    id: "zeami",
    name: "Zeami Motokiyo",
    dates: "c. 1363–1443",
    tradition: "Noh Aesthetics",
    era: "Medieval",
    region: "Japan",
    tags: ["play", "art", "attention", "excellence", "impermanence"],
    oneLine:
      "The Noh playwright and theorist who taught that the flower of performance grows from hidden discipline.",
    ideas: [
      {
        title: "Yūgen",
        summary:
          "Yūgen is a beauty that suggests more than it shows: a quiet depth, a shadow, an unfinished meaning. The audience completes the performance.",
      },
      {
        title: "The flower",
        summary:
          "Zeami's 'flower' is the performer's presence, not a fixed technique. It must be renewed at every stage of life, and it depends on what is concealed as much as what is displayed.",
      },
    ],
    quotes: [],
    keyWorks: ["Fūshikaden", "Kakyō"],
  },
  {
    id: "kenko",
    name: "Yoshida Kenkō",
    dates: "c. 1283–1352",
    tradition: "Japanese Aesthetics / Essay",
    era: "Medieval",
    region: "Japan",
    tags: ["impermanence", "attention", "pleasure", "wisdom", "fun"],
    oneLine:
      "The essayist of transience, who found beauty in idleness, change, and the imperfect.",
    ideas: [
      {
        title: "The charm of impermanence",
        summary:
          "Kenkō prefers the fading moon to the full moon, and the incomplete to the perfect. Beauty is deepened by the awareness that it will pass.",
      },
      {
        title: "Idleness as attention",
        summary:
          "Essays in Idleness celebrates unstructured time, conversation, and observation. The point is not productivity but a receptive quality of attention.",
      },
    ],
    quotes: [
      {
        id: "q_kenko_1",
        text: "The pleasantest of all diversions is to sit alone under the lamp, a book spread out before you.",
        work: "Essays in Idleness",
        locator: "Opening",
        translator: "Donald Keene",
        status: "verified",
      },
    ],
    keyWorks: ["Essays in Idleness"],
  },
  {
    id: "chomei",
    name: "Kamo no Chōmei",
    dates: "c. 1155–1216",
    tradition: "Japanese Aesthetics / Buddhism",
    era: "Medieval",
    region: "Japan",
    tags: ["impermanence", "attachment", "death", "nature", "wisdom"],
    oneLine:
      "He watched the city burn, flood, and vanish, and wrote a short masterpiece about the beauty and terror of impermanence.",
    ideas: [
      {
        title: "The river of change",
        summary:
          "Hōjōki opens with the image of a river whose water is never the same. Buildings, status, and bodies are equally transient; grief comes from expecting otherwise.",
      },
      {
        title: "The ten-foot hut",
        summary:
          "Chōmei retreats to a tiny dwelling in the mountains. The point is not escape from the world but a smaller, more honest relation to it.",
      },
    ],
    quotes: [
      {
        id: "q_chomei_1",
        text: "The flow of the river is ceaseless and its water is never the same.",
        work: "Hōjōki",
        locator: "Opening",
        translator: "Donald Keene",
        status: "verified",
      },
    ],
    keyWorks: ["Hōjōki"],
  },
  {
    id: "kukai",
    name: "Kūkai",
    dates: "774–835",
    tradition: "Shingon Buddhism",
    era: "Medieval",
    region: "Japan",
    tags: ["meaning", "self", "attention", "art", "wisdom"],
    oneLine:
      "The founder of Shingon Buddhism, who taught that the mind, the body, and the world are expressions of Buddha-nature.",
    ideas: [
      {
        title: "Buddhahood in this body",
        summary:
          "Kūkai insists that enlightenment is not a distant afterlife state. The body and the present world are the site where Buddha-nature becomes manifest.",
      },
      {
        title: "Mandalas and practice",
        summary:
          "Visual mandalas, ritual, and mantra train the whole person. Philosophy is not only doctrine; it is a disciplined transformation of perception.",
      },
    ],
    quotes: [],
    keyWorks: ["The Meaning of Sound, Word, and Reality", "Kūkai's writings"],
  },
];
