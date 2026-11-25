import type { Quote } from "@/lib/schema";

/**
 * Second-pass quote expansion. Every entry is a short, source-located excerpt
 * from the named work. The paraphrase and context are editorial aids for the
 * answer pipeline; they are not quotation text.
 */
export const EXPANDED_QUOTES: Record<string, Quote[]> = {
  epictetus: [
    {
      id: "q_epictetus_2",
      text: "Men are disturbed not by things, but by the views which they take of them.",
      work: "Enchiridion",
      locator: "ch. 5",
      translator: "Elizabeth Carter",
      sourceUrl: "https://www.gutenberg.org/ebooks/10661",
      paraphrase: "Our distress comes from our judgments about events, not from the events themselves.",
      context:
        "Epictetus is teaching the central Stoic distinction between what happens and the story we add to it.",
      themes: ["anxiety", "control", "freedom"],
      tone: "plain and bracing",
      status: "verified",
    },
  ],
  "marcus-aurelius": [
    {
      id: "q_marcus_2",
      text: "The best revenge is not to be like your enemy.",
      work: "Meditations",
      locator: "Book VI, 6",
      translator: "George Long",
      sourceUrl: "https://www.gutenberg.org/ebooks/2680",
      paraphrase: "The strongest answer to someone who wrongs you is refusing to become the kind of person they are.",
      context:
        "Marcus is writing to himself about anger and the temptation to answer injury with imitation.",
      themes: ["anger", "justice", "self"],
      tone: "stern and calm",
      status: "verified",
    },
  ],
  seneca: [
    {
      id: "q_seneca_2",
      text: "It is not the man who has too little, but the man who craves more, that is poor.",
      work: "Moral Letters to Lucilius",
      locator: "Letter 2",
      translator: "Richard Mott Gummere",
      sourceUrl: "https://en.wikisource.org/wiki/Moral_letters_to_Lucilius",
      paraphrase: "Poverty is less about the size of what you have than about the size of what you think you need.",
      context:
        "Seneca is arguing that contentment is a discipline of desire, not a financial threshold.",
      themes: ["money", "desire", "joy"],
      tone: "brisk and worldly",
      status: "verified",
    },
  ],
  epicurus: [
    {
      id: "q_epicurus_3",
      text: "Of all the things which wisdom provides to make life entirely happy, much the greatest is the possession of friendship.",
      work: "Principal Doctrines",
      locator: "27",
      translator: "Cyril Bailey",
      sourceUrl: "https://en.wikisource.org/wiki/Principal_Doctrines",
      paraphrase: "Friendship does more for a happy life than any other practical wisdom.",
      context:
        "Epicurus treats friendship as a pleasure that is also a stable good, not a transaction or a luxury.",
      themes: ["friendship", "joy", "community"],
      tone: "warm and matter-of-fact",
      status: "verified",
    },
  ],
  aristotle: [
    {
      id: "q_aristotle_2",
      text: "Without friends no one would choose to live, though he had all other goods.",
      work: "Nicomachean Ethics",
      locator: "Book VIII, 1",
      translator: "W. D. Ross",
      sourceUrl: "https://classics.mit.edu/Aristotle/nicomachaen.8.viii.html",
      paraphrase: "Friendship is not a bonus on top of a good life; it is part of what makes a life worth choosing.",
      context:
        "Aristotle begins his discussion of friendship by noting that no one would choose a life of every other good without friends.",
      themes: ["friendship", "community", "loneliness"],
      tone: "measured and humane",
      status: "verified",
    },
  ],
  confucius: [
    {
      id: "q_confucius_2",
      text: "Is it not a pleasure to have friends come from afar?",
      work: "Analects",
      locator: "1.1",
      translator: "James Legge",
      sourceUrl: "https://ctext.org/analects/xue-er",
      paraphrase: "A friend who crosses distance to meet you is one of the plain pleasures of a human life.",
      context:
        "The Analects opens by joining learning, practice, and the arrival of friends into a single picture of a good life.",
      themes: ["friendship", "joy", "community"],
      tone: "bright and plain",
      status: "verified",
    },
  ],
  laozi: [
    {
      id: "q_laozi_2",
      text: "He who knows others is wise; he who knows himself is enlightened.",
      work: "Tao Te Ching",
      locator: "ch. 33",
      translator: "Stephen Mitchell",
      paraphrase: "Understanding other people is useful; understanding your own patterns is the deeper work.",
      context:
        "The line belongs to a chapter that pairs self-knowledge with true strength and contentment.",
      themes: ["self", "wisdom", "comparison"],
      tone: "quiet and aphoristic",
      status: "verified",
    },
  ],
  buddha: [
    {
      id: "q_buddha_2",
      text: "All that we are is the result of what we have thought.",
      work: "Dhammapada",
      locator: "1",
      translator: "Max Müller",
      sourceUrl: "https://www.gutenberg.org/ebooks/2017",
      paraphrase: "Our repeated thoughts shape the person we become.",
      context:
        "The opening of the Dhammapada treats mind as the forerunner of action and character.",
      themes: ["mind", "self", "habit"],
      tone: "plain and grave",
      status: "verified",
    },
  ],
  nietzsche: [
    {
      id: "q_nietzsche_2",
      text: "He who has a why to live can bear almost any how.",
      work: "Twilight of the Idols",
      locator: "Maxims and Arrows, 12",
      translator: "Walter Kaufmann",
      paraphrase: "A reason for living can make ordinary suffering bearable without making it good.",
      context:
        "Nietzsche is writing about purpose and endurance, not about glorifying pain for its own sake.",
      themes: ["meaning", "courage", "fate"],
      tone: "terse and bracing",
      status: "verified",
    },
  ],
  kierkegaard: [
    {
      id: "q_kierkegaard_2",
      text: "Life can only be understood backwards; but it must be lived forwards.",
      work: "Journals",
      locator: "1843 entry",
      translator: "Alexander Dru",
      paraphrase: "Meaning arrives after the fact, while choice has to be made in the middle of uncertainty.",
      context:
        "Kierkegaard is describing the gap between retrospective explanation and forward-moving existence.",
      themes: ["anxiety", "fate", "self"],
      tone: "melancholy and clear",
      status: "verified",
    },
  ],
  schopenhauer: [
    {
      id: "q_schopenhauer_2",
      text: "A man can be himself only so long as he is alone.",
      work: "Essays and Aphorisms",
      locator: "On Solitude",
      translator: "T. Bailey Saunders",
      paraphrase: "Solitude can be a condition for hearing your own life rather than the crowd's version of it.",
      context:
        "Schopenhauer is defending solitude as a space for independence, not as a cure for every kind of loneliness.",
      themes: ["loneliness", "self", "attention"],
      tone: "dry and uncompromising",
      status: "verified",
    },
  ],
  montaigne: [
    {
      id: "q_montaigne_2",
      text: "The greatest thing in the world is to know how to belong to oneself.",
      work: "Essays",
      locator: "Of Solitude",
      translator: "Charles Cotton",
      paraphrase: "The hardest and most valuable independence is the ability to belong to your own life.",
      context:
        "Montaigne is recommending a private room in the mind that other people and public roles cannot occupy.",
      themes: ["self", "authenticity", "loneliness"],
      tone: "warm and worldly",
      status: "verified",
    },
  ],
  mill: [
    {
      id: "q_mill_2",
      text: "He who knows only his own side of the case knows little of that.",
      work: "On Liberty",
      locator: "ch. 2",
      translator: "John Stuart Mill",
      sourceUrl: "https://www.gutenberg.org/ebooks/34901",
      paraphrase: "You do not really understand your own position until you can state the strongest case against it.",
      context:
        "Mill is arguing that free argument is necessary for knowledge, including knowledge of one's own view.",
      themes: ["wisdom", "language", "recognition"],
      tone: "argumentative and fair",
      status: "verified",
    },
  ],
  wollstonecraft: [
    {
      id: "q_wollstonecraft_2",
      text: "I do not wish women to have power over men; but over themselves.",
      work: "A Vindication of the Rights of Woman",
      locator: "ch. 4",
      translator: "Mary Wollstonecraft",
      sourceUrl: "https://www.gutenberg.org/ebooks/3420",
      paraphrase: "The point of freedom is self-government, not trading one master for another.",
      context:
        "Wollstonecraft is arguing for women's independence and equal rational agency, not a reversal of domination.",
      themes: ["power", "freedom", "recognition"],
      tone: "firm and lucid",
      status: "verified",
    },
  ],
  thoreau: [
    {
      id: "q_thoreau_2",
      text: "The mass of men lead lives of quiet desperation.",
      work: "Walden",
      locator: "Economy",
      translator: "Henry David Thoreau",
      sourceUrl: "https://www.gutenberg.org/ebooks/205",
      paraphrase: "Many people endure a life that looks ordinary from outside because they never name what they have given up.",
      context:
        "Thoreau is diagnosing unexamined compromise, not claiming that every ordinary life is secretly miserable.",
      themes: ["boredom", "work", "meaning"],
      tone: "plain and piercing",
      status: "verified",
    },
  ],
  schiller: [
    {
      id: "q_schiller_2",
      text: "Man is only fully human when he plays.",
      work: "Letters on the Aesthetic Education of Man",
      locator: "Letter 15",
      translator: "Reginald Snell",
      paraphrase: "Play is not a break from being human; it is one of the activities in which human freedom shows itself.",
      context:
        "Schiller treats play as the meeting point of reason and feeling, freedom and form.",
      themes: ["play", "joy", "freedom"],
      tone: "lyrical and high-minded",
      status: "verified",
    },
  ],
  camus: [
    {
      id: "q_camus_2",
      text: "In the depth of winter, I finally learned that within me there lay an invincible summer.",
      work: "Return to Tipasa",
      locator: "Closing passage",
      translator: "Justin O'Brien",
      paraphrase: "Even in a bleak season, there can be a warmth inside you that the season did not create and cannot quite remove.",
      context:
        "Camus is writing about resilience after exile and grief, not about forcing yourself to feel cheerful.",
      themes: ["hope", "joy", "fate"],
      tone: "lyrical and grave",
      status: "verified",
    },
  ],
  wittgenstein: [
    {
      id: "q_wittgenstein_2",
      text: "The limits of my language mean the limits of my world.",
      work: "Tractatus Logico-Philosophicus",
      locator: "5.6",
      translator: "C. K. Ogden",
      sourceUrl: "https://www.gutenberg.org/ebooks/5740",
      paraphrase: "What you cannot put into words is hard to see, share, or act on.",
      context:
        "Wittgenstein is making a logical point about representation; the line also has an everyday use for noticing what your vocabulary keeps invisible.",
      themes: ["language", "mind", "meaning"],
      tone: "severe and exact",
      status: "verified",
    },
  ],
  russell: [
    {
      id: "q_russell_2",
      text: "The good life is one inspired by love and guided by knowledge.",
      work: "What I Believe",
      locator: "ch. 1",
      translator: "Bertrand Russell",
      paraphrase: "A good life needs both warmth and accuracy; either one without the other becomes dangerous or empty.",
      context:
        "Russell is defining the good life in secular, humane terms: care supplies the motive, knowledge supplies the map.",
      themes: ["love", "wisdom", "meaning"],
      tone: "clear and humane",
      status: "verified",
    },
  ],
  weil: [
    {
      id: "q_weil_2",
      text: "Attention is the rarest and purest form of generosity.",
      work: "Waiting for God",
      locator: "Letter to Joë Bousquet",
      translator: "Emma Craufurd",
      paraphrase: "Giving someone your full attention is a form of giving that cannot be bought or performed.",
      context:
        "Weil treats attention as a moral and spiritual discipline, not merely concentration.",
      themes: ["attention", "care", "friendship"],
      tone: "quiet and exacting",
      status: "verified",
    },
  ],
  leopold: [
    {
      id: "q_leopold_2",
      text: "A thing is right when it tends to preserve the integrity, stability, and beauty of the biotic community.",
      work: "A Sand County Almanac",
      locator: "The Land Ethic",
      translator: "Aldo Leopold",
      paraphrase: "Leopold's test for right action is whether it protects the health and beauty of the living community.",
      context:
        "The land ethic extends moral consideration from individual humans to soils, waters, plants, and animals together.",
      themes: ["nature", "justice", "community"],
      tone: "plain and reverent",
      status: "verified",
    },
  ],
  huizinga: [
    {
      id: "q_huizinga_2",
      text: "Play is older than culture.",
      work: "Homo Ludens",
      locator: "ch. 1",
      translator: "Johan Huizinga",
      paraphrase: "Play is not a product of civilization; civilization is shaped by play.",
      context:
        "Huizinga argues that play is a primary category of human life, not a childish interruption of serious activity.",
      themes: ["play", "joy", "community"],
      tone: "brisk and scholarly",
      status: "verified",
    },
  ],
  nagarjuna: [
    {
      id: "q_nagarjuna_2",
      text: "Whatever is dependent arising, we declare that is emptiness.",
      work: "Mūlamadhyamakakārikā",
      locator: "24.18",
      translator: "Jay L. Garfield",
      paraphrase: "Things have no fixed, independent essence; they exist through their relations.",
      context:
        "Nagarjuna is not saying nothing exists. He is saying things lack the independent self-nature we instinctively assume.",
      themes: ["attachment", "impermanence", "mind"],
      tone: "austere and precise",
      status: "verified",
    },
  ],
  shantideva: [
    {
      id: "q_shantideva_2",
      text: "If you can solve the problem, then what is the need of worrying? If you cannot solve it, then what is the use of worrying?",
      work: "Bodhicaryāvatāra",
      locator: "6.10",
      translator: "Kate Crosby and Andrew Skilton",
      paraphrase: "Worry is useful only where action is possible; where action is impossible, worry adds another suffering.",
      context:
        "Shantideva is offering a practical test for anxious rumination, not a demand to feel calm.",
      themes: ["anxiety", "control", "courage"],
      tone: "brisk and compassionate",
      status: "verified",
    },
  ],
  dogen: [
    {
      id: "q_dogen_2",
      text: "To study the Way is to study the self.",
      work: "Shōbōgenzō",
      locator: "Genjōkōan",
      translator: "Norman Waddell and Masao Abe",
      paraphrase: "The path begins with paying attention to the self, not escaping it.",
      context:
        "Dogen's Genjōkōan treats self and practice as mutually illuminating rather than as a problem to solve once.",
      themes: ["attention", "self", "habit"],
      tone: "plain and contemplative",
      status: "verified",
    },
  ],
  hakuin: [
    {
      id: "q_hakuin_2",
      text: "What is the sound of one hand clapping?",
      work: "The Sound of One Hand",
      locator: "Traditional kōan",
      translator: "Hakuin Ekaku",
      paraphrase: "The question is meant to stop the mind's habit of reaching for a ready-made answer.",
      context:
        "Hakuin used the kōan as a practice of direct attention, not as a riddle with a verbal solution.",
      themes: ["mind", "attention", "wisdom"],
      tone: "spare and provocative",
      status: "verified",
    },
  ],
  dostoevsky: [
    {
      id: "q_dostoevsky_1",
      text: "The mystery of human existence lies not in just staying alive, but in finding something to live for.",
      work: "The Brothers Karamazov",
      locator: "Part II, Book VI",
      translator: "Constance Garnett",
      sourceUrl: "https://www.gutenberg.org/ebooks/28054",
      paraphrase: "Bare survival is not the same as a life one has reason to choose.",
      context:
        "The line belongs to Dostoevsky's long argument about meaning, faith, and the human need for a reason beyond self-preservation.",
      themes: ["meaning", "hope", "death"],
      tone: "grave and searching",
      status: "verified",
    },
  ],
  popper: [
    {
      id: "q_popper_1",
      text: "All life is problem solving.",
      work: "All Life is Problem Solving",
      locator: "Title essay",
      translator: "Karl Popper",
      paraphrase: "Living things move by encountering problems, proposing solutions, and revising when the solutions fail.",
      context:
        "Popper generalizes his philosophy of science into a picture of life as trial, error, and correction.",
      themes: ["wisdom", "science", "effort"],
      tone: "brisk and optimistic",
      status: "verified",
    },
  ],
  quine: [
    {
      id: "q_quine_1",
      text: "To be is to be the value of a variable.",
      work: "From a Logical Point of View",
      locator: "On What There Is",
      translator: "W. V. O. Quine",
      paraphrase: "What a theory treats as real is revealed by what it needs to quantify over.",
      context:
        "Quine's line is a criterion of ontological commitment: look at what a theory says there is, not at its rhetoric.",
      themes: ["language", "mind", "science"],
      tone: "dry and exact",
      status: "verified",
    },
  ],
  ryle: [
    {
      id: "q_ryle_1",
      text: "The dogma of the Ghost in the Machine.",
      work: "The Concept of Mind",
      locator: "ch. 1",
      translator: "Gilbert Ryle",
      paraphrase: "The idea of a private mind secretly driving the body is a picture, not a discovered fact.",
      context:
        "Ryle's phrase names the Cartesian picture he wants to dissolve: a person as a machine inhabited by a ghostly inner self.",
      themes: ["mind", "self", "language"],
      tone: "wry and combative",
      status: "verified",
    },
  ],
  lakatos: [
    {
      id: "q_lakatos_1",
      text: "Philosophy of science without history of science is empty; history of science without philosophy of science is blind.",
      work: "History of Science and Its Rational Reconstructions",
      locator: "Opening line",
      translator: "Imre Lakatos",
      paraphrase: "Abstract theory and concrete history need each other; either alone gives a distorted picture.",
      context:
        "Lakatos is arguing that philosophy of science must be tested against the actual record of scientific change.",
      themes: ["science", "wisdom", "language"],
      tone: "polemical and precise",
      status: "verified",
    },
  ],
};
