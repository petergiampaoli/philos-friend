import type { Thinker } from "@/lib/schema";

export const nineteenthThinkers: Thinker[] = [
  {
    id: "bentham",
    name: "Jeremy Bentham",
    dates: "1748–1832",
    tradition: "Utilitarianism",
    era: "Enlightenment",
    region: "England",
    tags: ["pleasure", "justice", "care", "power", "habit"],
    oneLine:
      "He proposed a moral calculus: right action maximizes the greatest happiness of the greatest number.",
    ideas: [
      {
        title: "The felicific calculus",
        summary:
          "Bentham treats pleasure and pain as the basic motives of human action and proposes to measure them by intensity, duration, certainty, and extent. Morality becomes a calculation rather than a matter of custom.",
      },
      {
        title: "Reform by reason",
        summary:
          "His utilitarianism was aimed at prisons, poor laws, and legal cruelty. The point of philosophy was to make institutions serve human welfare rather than tradition or class interest.",
      },
    ],
    quotes: [
      {
        id: "q_bentham_1",
        text: "It is the greatest happiness of the greatest number that is the measure of right and wrong.",
        work: "A Fragment on Government",
        locator: "Preface",
        translator: "J. H. Burns and H. L. A. Hart",
        status: "verified",
      },
    ],
    keyWorks: ["An Introduction to the Principles of Morals and Legislation", "A Fragment on Government"],
  },
  {
    id: "mill",
    name: "John Stuart Mill",
    dates: "1806–1873",
    tradition: "Utilitarianism / Liberalism",
    era: "19th century",
    region: "England",
    tags: ["freedom", "pleasure", "justice", "excellence", "authenticity"],
    oneLine:
      "He tried to humanize utilitarianism: higher pleasures, individual liberty, and the harm principle.",
    ideas: [
      {
        title: "Higher and lower pleasures",
        summary:
          "Not all pleasures are equal. Those who have experienced both prefer the pleasures of thought, feeling, and imagination. Quality matters as well as quantity.",
      },
      {
        title: "The harm principle",
        summary:
          "The only justified reason to interfere with someone's liberty is to prevent harm to others. Paternalism and moral disapproval are not enough.",
      },
    ],
    quotes: [
      {
        id: "q_mill_1",
        text: "Better to be Socrates dissatisfied than a fool satisfied.",
        work: "Utilitarianism",
        locator: "ch. 2",
        translator: "Mary Warnock",
        status: "verified",
      },
    ],
    keyWorks: ["On Liberty", "Utilitarianism", "The Subjection of Women"],
  },
  {
    id: "sidgwick",
    name: "Henry Sidgwick",
    dates: "1838–1900",
    tradition: "Utilitarianism",
    era: "19th century",
    region: "England",
    tags: ["duty", "pleasure", "wisdom", "justice", "meaning"],
    oneLine:
      "The great systematizer of utilitarianism, who found a deep conflict between self-interest and the general good.",
    ideas: [
      {
        title: "The dualism of practical reason",
        summary:
          "Sidgwick argues that reason supports both egoism and utilitarianism, and cannot fully reconcile them. The honest philosopher must acknowledge the conflict rather than paper over it.",
      },
      {
        title: "The point of view of the universe",
        summary:
          "Ethics requires taking an impartial standpoint, counting every person's happiness equally. This is the enduring utilitarian insight, even if the calculus is impossible.",
      },
    ],
    quotes: [],
    keyWorks: ["The Methods of Ethics"],
  },
  {
    id: "singer",
    name: "Peter Singer",
    dates: "1946–",
    tradition: "Consequentialism / Animal Ethics",
    era: "Contemporary",
    region: "Australia / United States",
    tags: ["care", "justice", "money", "nature", "duty"],
    oneLine:
      "He asks what follows from taking the equal consideration of interests seriously — for animals, and for the global poor.",
    ideas: [
      {
        title: "The expanding circle",
        summary:
          "Moral progress is the gradual extension of concern beyond family and tribe. Reason pushes us to include animals and distant strangers in the circle of equal consideration.",
      },
      {
        title: "The drowning child",
        summary:
          "If you would save a drowning child at little cost to yourself, you should also help distant people who are dying of preventable causes. Distance and nationality are not morally relevant.",
      },
    ],
    quotes: [],
    keyWorks: ["Animal Liberation", "Practical Ethics", "The Life You Can Save"],
  },
  {
    id: "parfit",
    name: "Derek Parfit",
    dates: "1942–2017",
    tradition: "Analytic Ethics",
    era: "Contemporary",
    region: "England",
    tags: ["self", "meaning", "duty", "hope", "wisdom"],
    oneLine:
      "He showed that personal identity may not matter as much as we think, and that future people raise vertiginous ethical questions.",
    ideas: [
      {
        title: "Personal identity as a matter of degree",
        summary:
          "Parfit argues that what matters is psychological continuity, not a further fact of sameness. The self is less like a pearl and more like a river.",
      },
      {
        title: "The repugnant conclusion",
        summary:
          "If welfare is all that matters, a huge population with lives barely worth living could be better than a smaller, happier population. The conclusion is hard to accept, which puts pressure on total utilitarianism.",
      },
    ],
    quotes: [],
    keyWorks: ["Reasons and Persons", "On What Matters"],
  },
  {
    id: "marx",
    name: "Karl Marx",
    dates: "1818–1883",
    tradition: "Marxism",
    era: "19th century",
    region: "Germany / England",
    tags: ["work", "money", "power", "freedom", "community", "justice"],
    oneLine:
      "He argued that capitalism alienates us from our labor and ourselves, and that philosophy must change the world.",
    ideas: [
      {
        title: "Alienation",
        summary:
          "Under capitalism, workers do not own what they produce or control the process of production. Work becomes a means of survival rather than an expression of human creativity.",
      },
      {
        title: "Ideology and critique",
        summary:
          "The dominant ideas of a society tend to serve its ruling class. Critique begins by asking whose interests a belief protects, including the belief that the current order is natural.",
      },
    ],
    quotes: [
      {
        id: "q_marx_1",
        text: "The philosophers have only interpreted the world in various ways; the point is to change it.",
        work: "Theses on Feuerbach",
        locator: "Thesis XI",
        translator: "W. Lough",
        status: "verified",
      },
    ],
    keyWorks: ["Capital", "The German Ideology", "Economic and Philosophic Manuscripts"],
  },
  {
    id: "engels",
    name: "Friedrich Engels",
    dates: "1820–1895",
    tradition: "Marxism",
    era: "19th century",
    region: "Germany / England",
    tags: ["work", "community", "power", "justice", "science"],
    oneLine:
      "Marx's collaborator and popularizer, who applied historical materialism to the family, the state, and nature.",
    ideas: [
      {
        title: "The state as an instrument",
        summary:
          "For Engels, the state arises from class antagonism and tends to serve the dominant class. It is not a neutral referee above society.",
      },
      {
        title: "Dialectics of nature",
        summary:
          "He tried to extend Marxist method to the natural sciences, arguing that nature itself develops through contradiction and change. The project was influential and uneven.",
      },
    ],
    quotes: [],
    keyWorks: ["The Condition of the Working Class in England", "The Origin of the Family, Private Property and the State"],
  },
  {
    id: "gramsci",
    name: "Antonio Gramsci",
    dates: "1891–1937",
    tradition: "Marxism / Critical Theory",
    era: "20th century",
    region: "Italy",
    tags: ["power", "community", "justice", "education", "wisdom"],
    oneLine:
      "He explained why revolutions fail even when conditions are bad: ruling ideas are secured through culture, not only force.",
    ideas: [
      {
        title: "Hegemony",
        summary:
          "Power is maintained not only by coercion but by consent. Schools, media, churches, and everyday assumptions make the existing order feel natural. Counter-hegemony is a cultural struggle.",
      },
      {
        title: "The organic intellectual",
        summary:
          "Every social group produces intellectuals who articulate its experience. Philosophy becomes political when it helps a group understand and change its situation.",
      },
    ],
    quotes: [
      {
        id: "q_gramsci_1",
        text: "The old is dying and the new cannot be born.",
        work: "Prison Notebooks",
        locator: "Notebook 3, §34",
        translator: "Quintin Hoare and Geoffrey Nowell Smith",
        status: "verified",
      },
    ],
    keyWorks: ["Prison Notebooks", "The Modern Prince"],
  },
  {
    id: "adorno",
    name: "Theodor Adorno",
    dates: "1903–1969",
    tradition: "Critical Theory / Frankfurt School",
    era: "20th century",
    region: "Germany",
    tags: ["power", "technology", "meaning", "art", "anxiety", "freedom"],
    oneLine:
      "He diagnosed the culture industry and the administered world, and defended the negative power of art.",
    ideas: [
      {
        title: "The culture industry",
        summary:
          "Mass entertainment does not simply distract us; it trains us to accept a world organized for consumption. Standardization and pseudo-individuality make domination pleasant.",
      },
      {
        title: "Negative dialectics",
        summary:
          "Concepts never fully capture their objects. Philosophy must resist the temptation to close the gap with a tidy system, and stay loyal to the non-identical.",
      },
    ],
    quotes: [
      {
        id: "q_adorno_1",
        text: "To write poetry after Auschwitz is barbaric.",
        work: "Prisms",
        locator: "Cultural Criticism and Society",
        translator: "Samuel and Shierry Weber",
        status: "verified",
      },
    ],
    keyWorks: ["Dialectic of Enlightenment", "Minima Moralia", "Negative Dialectics"],
  },
  {
    id: "marcuse",
    name: "Herbert Marcuse",
    dates: "1898–1979",
    tradition: "Critical Theory / Frankfurt School",
    era: "20th century",
    region: "Germany / United States",
    tags: ["work", "freedom", "technology", "desire", "power", "fun"],
    oneLine:
      "He argued that advanced capitalism produces comfortable unfreedom and represses the desire for a different life.",
    ideas: [
      {
        title: "One-dimensional man",
        summary:
          "When dissent is absorbed into consumer choice, opposition loses its edge. People are free to choose products but not to question the system that offers them.",
      },
      {
        title: "The great refusal",
        summary:
          "Marcuse looked to marginal groups and aesthetic experience as sites of resistance. The point is not to escape pleasure but to liberate it from the economy of consumption.",
      },
    ],
    quotes: [],
    keyWorks: ["One-Dimensional Man", "Eros and Civilization"],
  },
  {
    id: "kierkegaard",
    name: "Søren Kierkegaard",
    dates: "1813–1855",
    tradition: "Existentialism / Christian Thought",
    era: "19th century",
    region: "Denmark",
    tags: ["anxiety", "freedom", "love", "hope", "self", "meaning"],
    oneLine:
      "He described anxiety as the dizziness of freedom and insisted that truth is something a person must exist into.",
    ideas: [
      {
        title: "The stages of existence",
        summary:
          "The aesthetic life pursues novelty; the ethical life commits to duty; the religious life leaps into faith. The stages are not a ladder so much as a series of crises.",
      },
      {
        title: "Anxiety and freedom",
        summary:
          "Anxiety is the feeling of possibility. It is not a disease to be eliminated but a condition of choosing. To avoid anxiety is often to avoid freedom.",
      },
    ],
    quotes: [
      {
        id: "q_kierkegaard_1",
        text: "Life can only be understood backwards; but it must be lived forwards.",
        work: "Journals",
        locator: "1843 entry",
        translator: "Alexander Dru",
        status: "verified",
      },
    ],
    keyWorks: ["Either/Or", "Fear and Trembling", "The Sickness unto Death"],
  },
  {
    id: "nietzsche",
    name: "Friedrich Nietzsche",
    dates: "1844–1900",
    tradition: "Existentialism / Lebensphilosophie",
    era: "19th century",
    region: "Germany",
    tags: ["competition", "status", "joy", "freedom", "meaning", "excellence", "anger"],
    oneLine:
      "He asked what values are worth creating after the death of God, and warned that resentment can masquerade as morality.",
    ideas: [
      {
        title: "Will to power",
        summary:
          "Nietzsche's late concept is not simply domination. It names the tendency of life to expand, overcome resistance, and create form. The question is whether your striving enhances life or merely seeks approval.",
      },
      {
        title: "Self-overcoming",
        summary:
          "A person becomes who they are by disciplining and transforming their drives, not by discovering a fixed essence. The competitive urge can be raw material for this work — or a treadmill of comparison.",
      },
    ],
    quotes: [
      {
        id: "q_nietzsche_1",
        text: "What does not kill me makes me stronger.",
        work: "Twilight of the Idols",
        locator: "Maxims and Arrows, 8",
        translator: "Walter Kaufmann",
        status: "verified",
      },
    ],
    keyWorks: ["Thus Spoke Zarathustra", "Beyond Good and Evil", "On the Genealogy of Morality"],
  },
  {
    id: "heidegger",
    name: "Martin Heidegger",
    dates: "1889–1976",
    tradition: "Phenomenology / Existentialism",
    era: "20th century",
    region: "Germany",
    tags: ["death", "anxiety", "authenticity", "attention", "technology", "meaning"],
    oneLine:
      "He asked what it means to exist at all, and argued that everyday life usually hides us from our own possibilities.",
    ideas: [
      {
        title: "Being-toward-death",
        summary:
          "Death is not an event I can experience; it is the possibility that makes my life mine. Owning finitude can shock us out of the anonymous 'they' and into authentic choice.",
      },
      {
        title: "The clearing",
        summary:
          "Human beings are the place where being shows up. We do not stand outside the world as spectators; we are already immersed in it, and our mood discloses it.",
      },
    ],
    quotes: [
      {
        id: "q_heidegger_1",
        text: "Language is the house of being.",
        work: "Letter on Humanism",
        locator: "Opening",
        translator: "Frank A. Capuzzi",
        status: "verified",
      },
    ],
    keyWorks: ["Being and Time", "Letter on Humanism", "The Question Concerning Technology"],
  },
  {
    id: "sartre",
    name: "Jean-Paul Sartre",
    dates: "1905–1980",
    tradition: "Existentialism / Phenomenology",
    era: "20th century",
    region: "France",
    tags: ["freedom", "authenticity", "anxiety", "self", "recognition", "meaning"],
    oneLine:
      "Existence precedes essence: we are condemned to be free, and bad faith is the attempt to pretend otherwise.",
    ideas: [
      {
        title: "Existence precedes essence",
        summary:
          "There is no fixed human nature that tells us what to be. We make ourselves through choices, and those choices carry the weight of responsibility for everyone.",
      },
      {
        title: "Bad faith",
        summary:
          "Bad faith is lying to oneself about one's freedom — pretending to be a waiter, a victim, or a type rather than a choosing subject. The Look of the other can freeze us into an object.",
      },
    ],
    quotes: [
      {
        id: "q_sartre_1",
        text: "Man is condemned to be free.",
        work: "Existentialism Is a Humanism",
        locator: "Lecture",
        translator: "Carol Macomber",
        status: "verified",
      },
    ],
    keyWorks: ["Being and Nothingness", "Existentialism Is a Humanism", "No Exit"],
  },
  {
    id: "beauvoir",
    name: "Simone de Beauvoir",
    dates: "1908–1986",
    tradition: "Existentialism / Feminist Philosophy",
    era: "20th century",
    region: "France",
    tags: ["freedom", "recognition", "love", "comparison", "status", "authenticity"],
    oneLine:
      "She showed how the self is made through others, and how the desire to be seen can become a cage.",
    ideas: [
      {
        title: "The Other",
        summary:
          "Patriarchy treats man as the human default and woman as the Other. To be the Other is to be defined by someone else's gaze rather than by one's own projects.",
      },
      {
        title: "Ambiguous freedom",
        summary:
          "We are free, but embedded in bodies, relationships, and history. Ethics is the art of living with that ambiguity and willing the freedom of others as well as one's own.",
      },
    ],
    quotes: [
      {
        id: "q_beauvoir_1",
        text: "To will oneself free is also to will others free.",
        work: "The Ethics of Ambiguity",
        locator: "Part II",
        translator: "Bernard Frechtman",
        status: "verified",
      },
    ],
    keyWorks: ["The Second Sex", "The Ethics of Ambiguity"],
  },
  {
    id: "husserl",
    name: "Edmund Husserl",
    dates: "1859–1938",
    tradition: "Phenomenology",
    era: "20th century",
    region: "Germany",
    tags: ["attention", "wisdom", "self", "meaning", "nature"],
    oneLine:
      "He founded phenomenology as a rigorous description of how things appear to consciousness.",
    ideas: [
      {
        title: "Intentionality",
        summary:
          "Consciousness is always consciousness of something. There is no bare awareness; every act has an object, and the structure of that relation can be described.",
      },
      {
        title: "The epoché",
        summary:
          "Suspend the natural assumption that the world simply exists. By bracketing it, we can examine how the world is constituted for consciousness.",
      },
    ],
    quotes: [
      {
        id: "q_husserl_1",
        text: "To the things themselves.",
        work: "Logical Investigations",
        locator: "Introduction",
        translator: "J. N. Findlay",
        status: "verified",
      },
    ],
    keyWorks: ["Logical Investigations", "Ideas Pertaining to a Pure Phenomenology"],
  },
  {
    id: "levinas",
    name: "Emmanuel Levinas",
    dates: "1906–1995",
    tradition: "Phenomenology / Jewish Thought",
    era: "20th century",
    region: "Lithuania / France",
    tags: ["care", "community", "duty", "justice", "self"],
    oneLine:
      "Ethics begins with the face of the other, whose need interrupts my freedom and makes me responsible.",
    ideas: [
      {
        title: "The face",
        summary:
          "The other person is not an object I can comprehend. The face makes an ethical demand that precedes my choice: 'You shall not kill.' Responsibility is asymmetric and inexhaustible.",
      },
      {
        title: "Ethics as first philosophy",
        summary:
          "Levinas reverses the Western priority of theory over ethics. Before I ask what is real, I am already answerable to the other person in front of me.",
      },
    ],
    quotes: [],
    keyWorks: ["Totality and Infinity", "Otherwise than Being"],
  },
  {
    id: "merleau-ponty",
    name: "Maurice Merleau-Ponty",
    dates: "1908–1961",
    tradition: "Phenomenology",
    era: "20th century",
    region: "France",
    tags: ["attention", "self", "nature", "habit", "meaning"],
    oneLine:
      "The body is not an object I possess; it is my way of being in the world.",
    ideas: [
      {
        title: "The lived body",
        summary:
          "Perception is not a mental calculation on sensory data. It is an embodied skill, shaped by habit and situation. The body is the subject of experience, not just its vehicle.",
      },
      {
        title: "The flesh of the world",
        summary:
          "Self and world are intertwined. The same fabric that makes me perceive also makes the world perceptible. Dualisms of mind and matter miss the chiasmic relation.",
      },
    ],
    quotes: [
      {
        id: "q_merleau-ponty_1",
        text: "The world is not what I think, but what I live through.",
        work: "Phenomenology of Perception",
        locator: "Preface",
        translator: "Colin Smith",
        status: "verified",
      },
    ],
    keyWorks: ["Phenomenology of Perception", "The Visible and the Invisible"],
  },
  {
    id: "gadamer",
    name: "Hans-Georg Gadamer",
    dates: "1900–2002",
    tradition: "Hermeneutics",
    era: "20th century",
    region: "Germany",
    tags: ["wisdom", "attention", "play", "meaning", "education"],
    oneLine:
      "Understanding is a conversation with the past in which our prejudices are tested and transformed.",
    ideas: [
      {
        title: "The fusion of horizons",
        summary:
          "When we interpret a text, we do not leave our situation behind. We bring our horizon into contact with another, and understanding is the fusion that changes both.",
      },
      {
        title: "Play as the mode of truth",
        summary:
          "Play is not a subjective activity we control; it has its own structure and draws the players in. Art and conversation disclose truth through this participatory movement.",
      },
    ],
    quotes: [
      {
        id: "q_gadamer_1",
        text: "Being that can be understood is language.",
        work: "Truth and Method",
        locator: "Part III",
        translator: "Joel Weinsheimer and Donald G. Marshall",
        status: "verified",
      },
    ],
    keyWorks: ["Truth and Method", "Philosophical Hermeneutics"],
  },
  {
    id: "camus",
    name: "Albert Camus",
    dates: "1913–1960",
    tradition: "Absurdism",
    era: "20th century",
    region: "Algeria / France",
    tags: ["meaning", "boredom", "anxiety", "freedom", "hope", "death"],
    oneLine:
      "The absurd is the collision between our need for meaning and a silent world; revolt is living without consolation.",
    ideas: [
      {
        title: "The absurd",
        summary:
          "The absurd is not in the world or in the mind alone, but in their confrontation. We demand meaning; the universe offers none. The question is how to live with that tension.",
      },
      {
        title: "Revolt, freedom, passion",
        summary:
          "Camus rejects both suicide and the leap of faith. The absurd person keeps the tension alive, enjoys what is available, and refuses false consolation.",
      },
    ],
    quotes: [
      {
        id: "q_camus_1",
        text: "One must imagine Sisyphus happy.",
        work: "The Myth of Sisyphus",
        locator: "Final line",
        translator: "Justin O'Brien",
        status: "verified",
      },
    ],
    keyWorks: ["The Myth of Sisyphus", "The Stranger", "The Rebel"],
  },
  {
    id: "dostoevsky",
    name: "Fyodor Dostoevsky",
    dates: "1821–1881",
    tradition: "Literary Existentialism",
    era: "19th century",
    region: "Russia",
    tags: ["meaning", "freedom", "anxiety", "hope", "self", "community"],
    oneLine:
      "His novels are laboratories of freedom, guilt, and the human need for meaning at any cost.",
    ideas: [
      {
        title: "The underground man",
        summary:
          "Dostoevsky's narrator prefers suffering to the tyranny of rational systems. He insists that a person is not a piano key to be played by natural law.",
      },
      {
        title: "Responsibility and redemption",
        summary:
          "In his major novels, characters discover that freedom is inseparable from guilt and that no one is truly isolated from the suffering of others.",
      },
    ],
    quotes: [],
    keyWorks: ["Notes from Underground", "Crime and Punishment", "The Brothers Karamazov"],
  },
  {
    id: "kafka",
    name: "Franz Kafka",
    dates: "1883–1924",
    tradition: "Literary Modernism",
    era: "20th century",
    region: "Prague / Austria-Hungary",
    tags: ["anxiety", "meaning", "power", "loneliness", "self", "boredom"],
    oneLine:
      "He made bureaucracy, guilt, and the search for a reason feel like the texture of modern life.",
    ideas: [
      {
        title: "The labyrinth without a center",
        summary:
          "Kafka's protagonists seek justification from systems that never explain themselves. The absence of a final reason is not a puzzle to solve but a condition to endure.",
      },
      {
        title: "Guilt without a crime",
        summary:
          "His characters are often accused by an authority they cannot locate or answer. The result is a precise literary phenomenology of modern anxiety.",
      },
    ],
    quotes: [],
    keyWorks: ["The Trial", "The Castle", "The Metamorphosis"],
  },
  {
    id: "peirce",
    name: "Charles Sanders Peirce",
    dates: "1839–1914",
    tradition: "Pragmatism",
    era: "19th century",
    region: "United States",
    tags: ["wisdom", "meaning", "habit", "community", "science"],
    oneLine:
      "He founded pragmatism as a theory of meaning: a belief is a rule for action, and inquiry is the way we fix belief.",
    ideas: [
      {
        title: "The pragmatic maxim",
        summary:
          "To understand a concept, consider what practical effects its truth would have. Meaning is not a private image; it is a set of consequences for conduct.",
      },
      {
        title: "The community of inquiry",
        summary:
          "Truth is what an unlimited community of inquirers would eventually converge on. Belief is provisional, and doubt is the engine of learning.",
      },
    ],
    quotes: [],
    keyWorks: ["How to Make Our Ideas Clear", "The Fixation of Belief"],
  },
  {
    id: "james",
    name: "William James",
    dates: "1842–1910",
    tradition: "Pragmatism / Psychology",
    era: "20th century",
    region: "United States",
    tags: ["habit", "attention", "hope", "meaning", "anxiety", "fun"],
    oneLine:
      "He treated truth as a live option with practical consequences, and wrote brilliantly about habit, attention, and the will to believe.",
    ideas: [
      {
        title: "The will to believe",
        summary:
          "When a question is live, forced, and momentous, and evidence cannot settle it, we may be entitled to believe what makes life possible. Belief is sometimes a condition of its own verification.",
      },
      {
        title: "Habit as the flywheel",
        summary:
          "James describes habit as the great engine of personal life: it saves effort, but it also locks in direction. The art of living is choosing which habits to automate.",
      },
    ],
    quotes: [
      {
        id: "q_james_1",
        text: "Believe that life is worth living, and your belief will help create the fact.",
        work: "The Will to Believe",
        locator: "Section IX",
        translator: "Fredson Bowers",
        status: "verified",
      },
    ],
    keyWorks: ["The Principles of Psychology", "The Will to Believe", "Varieties of Religious Experience"],
  },
  {
    id: "dewey",
    name: "John Dewey",
    dates: "1859–1952",
    tradition: "Pragmatism / Philosophy of Education",
    era: "20th century",
    region: "United States",
    tags: ["education", "habit", "attention", "play", "community", "work"],
    oneLine:
      "Philosophy should be a tool for reconstructing experience, and education is where democracy becomes a daily practice.",
    ideas: [
      {
        title: "Learning by doing",
        summary:
          "Knowledge is not a spectator's copy of reality; it is a capacity for intelligent action. Education should begin with problems students actually encounter, not with inert facts.",
      },
      {
        title: "Art as experience",
        summary:
          "Aesthetic experience is not confined to museums. Any activity can become art when means and ends are unified in a sustained, meaningful whole — including work and play.",
      },
    ],
    quotes: [],
    keyWorks: ["Democracy and Education", "Art as Experience", "Experience and Nature"],
  },
  {
    id: "mead",
    name: "George Herbert Mead",
    dates: "1863–1931",
    tradition: "Pragmatism / Social Psychology",
    era: "20th century",
    region: "United States",
    tags: ["self", "community", "recognition", "play", "habit"],
    oneLine:
      "The self is not born; it emerges through taking the perspective of others in play and games.",
    ideas: [
      {
        title: "The social self",
        summary:
          "We become selves by internalizing the attitudes of others. The 'I' is the spontaneous response; the 'me' is the organized set of expectations we have absorbed.",
      },
      {
        title: "Play and the game",
        summary:
          "In play, children try on roles. In games, they must hold the perspectives of all players at once. This is how the generalized other — and moral judgment — develops.",
      },
    ],
    quotes: [],
    keyWorks: ["Mind, Self, and Society"],
  },
  {
    id: "rorty",
    name: "Richard Rorty",
    dates: "1931–2007",
    tradition: "Neo-Pragmatism",
    era: "Contemporary",
    region: "United States",
    tags: ["meaning", "community", "hope", "language", "self", "justice"],
    oneLine:
      "He gave up the quest for a final vocabulary and asked what our descriptions are good for.",
    ideas: [
      {
        title: "Contingency",
        summary:
          "Our beliefs, languages, and selves are historical products, not glimpses of a timeless order. Philosophy should stop trying to mirror nature and start helping us cope.",
      },
      {
        title: "Ironism and solidarity",
        summary:
          "Rorty's ironist knows their vocabulary is contingent but still cares about reducing cruelty. Private self-creation and public solidarity can be pursued without a final theory that unites them.",
      },
    ],
    quotes: [
      {
        id: "q_rorty_1",
        text: "Truth is what your contemporaries let you get away with.",
        work: "Contingency, Irony, and Solidarity",
        locator: "ch. 1",
        translator: "Richard Rorty",
        status: "verified",
      },
    ],
    keyWorks: ["Philosophy and the Mirror of Nature", "Contingency, Irony, and Solidarity"],
  },
];
