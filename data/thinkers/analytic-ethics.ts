import type { Thinker } from "@/lib/schema";

export const analyticThinkers: Thinker[] = [
  {
    id: "frege",
    name: "Gottlob Frege",
    dates: "1848–1925",
    tradition: "Analytic Philosophy / Logic",
    era: "19th century",
    region: "Germany",
    tags: ["wisdom", "meaning", "language", "self"],
    oneLine:
      "He invented modern logic and asked how language manages to refer to anything at all.",
    ideas: [
      {
        title: "Sense and reference",
        summary:
          "The morning star and the evening star refer to the same object but present it differently. Frege distinguishes reference (what a term picks out) from sense (the way it presents it).",
      },
      {
        title: "Logic before psychology",
        summary:
          "Thoughts are objective and shareable, not private mental images. Logic studies the structure of thoughts, not the psychology of thinkers.",
      },
    ],
    quotes: [],
    keyWorks: ["Begriffsschrift", "The Foundations of Arithmetic", "Sense and Reference"],
  },
  {
    id: "russell",
    name: "Bertrand Russell",
    dates: "1872–1970",
    tradition: "Analytic Philosophy",
    era: "20th century",
    region: "United Kingdom",
    tags: ["wisdom", "justice", "love", "anxiety", "meaning"],
    oneLine:
      "He helped turn philosophy into logical analysis, and spent the rest of his life applying it to war, sex, and happiness.",
    ideas: [
      {
        title: "Logical atomism",
        summary:
          "The world consists of facts, and language ideally mirrors them. Much philosophical confusion comes from grammar that hides logical form.",
      },
      {
        title: "The good life",
        summary:
          "Russell's popular ethics is secular and humane: love and knowledge are the two goods, and fear is the main obstacle to both.",
      },
    ],
    quotes: [
      {
        id: "q_russell_1",
        text: "The good life is one inspired by love and guided by knowledge.",
        work: "What I Believe",
        locator: "Opening",
        translator: "Bertrand Russell",
        status: "verified",
      },
    ],
    keyWorks: ["Principia Mathematica", "The Problems of Philosophy", "A History of Western Philosophy"],
  },
  {
    id: "moore",
    name: "G. E. Moore",
    dates: "1873–1958",
    tradition: "Analytic Philosophy",
    era: "20th century",
    region: "United Kingdom",
    tags: ["wisdom", "meaning", "self", "attention"],
    oneLine:
      "He defended common sense against skepticism and argued that good is a simple, indefinable quality.",
    ideas: [
      {
        title: "The naturalistic fallacy",
        summary:
          "You cannot define 'good' in terms of any natural property, such as pleasure or evolution. If you could, asking whether that property is good would be trivial.",
      },
      {
        title: "A defense of common sense",
        summary:
          "Moore argued that we know the existence of our hands and the world more certainly than we know any philosophical premise that would deny them.",
      },
    ],
    quotes: [],
    keyWorks: ["Principia Ethica", "A Defense of Common Sense"],
  },
  {
    id: "wittgenstein",
    name: "Ludwig Wittgenstein",
    dates: "1889–1951",
    tradition: "Analytic Philosophy / Philosophy of Language",
    era: "20th century",
    region: "Austria / United Kingdom",
    tags: ["wisdom", "language", "meaning", "attention", "self"],
    oneLine:
      "Philosophy is not a body of doctrine but a therapy for the confusions language creates.",
    ideas: [
      {
        title: "The limits of language",
        summary:
          "The early Wittgenstein thought language pictures the world and that ethics and metaphysics lie beyond what can be said. The later Wittgenstein abandoned the picture theory.",
      },
      {
        title: "Language games",
        summary:
          "Meaning is use. Words get their sense from shared practices, not from private mental definitions. Philosophical problems often dissolve when we see the language game that produced them.",
      },
    ],
    quotes: [
      {
        id: "q_wittgenstein_1",
        text: "The limits of my language mean the limits of my world.",
        work: "Tractatus Logico-Philosophicus",
        locator: "5.6",
        translator: "C. K. Ogden",
        status: "verified",
      },
    ],
    keyWorks: ["Tractatus Logico-Philosophicus", "Philosophical Investigations"],
  },
  {
    id: "quine",
    name: "W. V. O. Quine",
    dates: "1908–2000",
    tradition: "Analytic Philosophy",
    era: "20th century",
    region: "United States",
    tags: ["wisdom", "meaning", "science", "self", "language"],
    oneLine:
      "He attacked the analytic-synthetic distinction and argued that belief is a web that meets experience as a whole.",
    ideas: [
      {
        title: "Two dogmas of empiricism",
        summary:
          "Quine denies a sharp line between truths of meaning and truths of fact. All beliefs are revisable in principle, though some are more central than others.",
      },
      {
        title: "Ontological commitment",
        summary:
          "To say what a theory assumes to exist, translate it into canonical logical notation and see what its quantifiers must range over. Metaphysics becomes a matter of bookkeeping.",
      },
    ],
    quotes: [],
    keyWorks: ["Two Dogmas of Empiricism", "Word and Object"],
  },
  {
    id: "austin",
    name: "J. L. Austin",
    dates: "1911–1960",
    tradition: "Ordinary Language Philosophy",
    era: "20th century",
    region: "United Kingdom",
    tags: ["language", "wisdom", "attention", "habit"],
    oneLine:
      "He showed that saying something is often doing something — promising, naming, marrying, apologizing.",
    ideas: [
      {
        title: "Speech acts",
        summary:
          "Language is not only descriptive. Utterances can perform actions, and their success depends on conventions and context. 'I promise' changes the world rather than reporting on it.",
      },
      {
        title: "Ordinary language",
        summary:
          "Austin trusted the distinctions ordinary speakers already make. Careful attention to how we talk can dissolve philosophical pseudo-problems.",
      },
    ],
    quotes: [],
    keyWorks: ["How to Do Things with Words", "Sense and Sensibilia"],
  },
  {
    id: "kripke",
    name: "Saul Kripke",
    dates: "1940–2022",
    tradition: "Analytic Philosophy / Logic",
    era: "Contemporary",
    region: "United States",
    tags: ["language", "wisdom", "self", "meaning"],
    oneLine:
      "He revived essentialism with the necessary a posteriori and changed how philosophers think about names.",
    ideas: [
      {
        title: "Rigid designation",
        summary:
          "Proper names refer to the same object in every possible world in which it exists. 'Aristotle' picks out the man, not whatever description happens to fit him.",
      },
      {
        title: "The necessary a posteriori",
        summary:
          "Some truths are both necessary and discoverable only by experience — for example, that water is H2O. This upset the traditional equation of necessity with the a priori.",
      },
    ],
    quotes: [],
    keyWorks: ["Naming and Necessity", "Wittgenstein on Rules and Private Language"],
  },
  {
    id: "ryle",
    name: "Gilbert Ryle",
    dates: "1900–1976",
    tradition: "Ordinary Language Philosophy",
    era: "20th century",
    region: "United Kingdom",
    tags: ["self", "wisdom", "habit", "attention", "mind"],
    oneLine:
      "He called the mind-body problem a category mistake: the 'ghost in the machine' is a confusion of grammar.",
    ideas: [
      {
        title: "The ghost in the machine",
        summary:
          "Descartes treats mind and body as two things of the same kind. Ryle argues that mental language describes capacities and dispositions, not a hidden substance.",
      },
      {
        title: "Knowing how and knowing that",
        summary:
          "Intelligence is not always inner calculation. Much of it is skillful performance, learned through practice and displayed in action.",
      },
    ],
    quotes: [],
    keyWorks: ["The Concept of Mind", "Dilemmas"],
  },
  {
    id: "putnam",
    name: "Hilary Putnam",
    dates: "1926–2016",
    tradition: "Analytic Philosophy",
    era: "Contemporary",
    region: "United States",
    tags: ["language", "self", "science", "meaning", "technology"],
    oneLine:
      "He argued that meaning is not in the head, then spent decades revising his own position.",
    ideas: [
      {
        title: "Twin Earth",
        summary:
          "A person on Twin Earth has the same mental state as you but their 'water' is XYZ. If their word means something different, meaning depends on the environment, not just the mind.",
      },
      {
        title: "Internal realism",
        summary:
          "Putnam later rejected the idea of a single God's-eye description of reality. Truth is internal to a conceptual scheme, though not arbitrary.",
      },
    ],
    quotes: [
      {
        id: "q_putnam_1",
        text: "Meaning just ain't in the head.",
        work: "Reason, Truth and History",
        locator: "ch. 1",
        translator: "Hilary Putnam",
        status: "verified",
      },
    ],
    keyWorks: ["Reason, Truth and History", "The Many Faces of Realism"],
  },
  {
    id: "davidson",
    name: "Donald Davidson",
    dates: "1917–2003",
    tradition: "Analytic Philosophy",
    era: "20th century",
    region: "United States",
    tags: ["language", "meaning", "self", "wisdom"],
    oneLine:
      "He combined theories of meaning with a radical charity: interpretation requires assuming the other is mostly rational and mostly right.",
    ideas: [
      {
        title: "Radical interpretation",
        summary:
          "To understand another speaker, we must attribute beliefs and desires that make their behavior intelligible. Charity is not politeness; it is a condition of interpretation.",
      },
      {
        title: "Anomalous monism",
        summary:
          "Mental events are identical with physical events, but mental descriptions cannot be reduced to physical laws. Reasons and causes are real without forming a closed scientific system.",
      },
    ],
    quotes: [],
    keyWorks: ["Essays on Actions and Events", "Inquiries into Truth and Interpretation"],
  },
  {
    id: "dennett",
    name: "Daniel Dennett",
    dates: "1942–2024",
    tradition: "Analytic Philosophy / Philosophy of Mind",
    era: "Contemporary",
    region: "United States",
    tags: ["self", "technology", "meaning", "wisdom", "nature"],
    oneLine:
      "He argued that consciousness is not a magical inner theater but a set of cognitive tricks and narratives.",
    ideas: [
      {
        title: "The intentional stance",
        summary:
          "We can predict complex systems by treating them as if they had beliefs and desires. This stance works even when there is no inner ghost doing the believing.",
      },
      {
        title: "Consciousness as a user illusion",
        summary:
          "The sense of a unified self is a useful construction, not a glimpse of a special inner substance. Dennett's work is a sustained attempt to naturalize the mind without losing the phenomena.",
      },
    ],
    quotes: [],
    keyWorks: ["Consciousness Explained", "Darwin's Dangerous Idea", "Freedom Evolves"],
  },
  {
    id: "popper",
    name: "Karl Popper",
    dates: "1902–1994",
    tradition: "Philosophy of Science",
    era: "20th century",
    region: "Austria / United Kingdom",
    tags: ["science", "wisdom", "freedom", "power", "hope"],
    oneLine:
      "Science advances by bold conjectures and refutations, not by accumulating certainties.",
    ideas: [
      {
        title: "Falsifiability",
        summary:
          "A theory is scientific if it makes predictions that could, in principle, be shown false. Confirmation is cheap; vulnerability to refutation is what distinguishes science from dogma.",
      },
      {
        title: "The open society",
        summary:
          "Popper extended fallibilism to politics: institutions should allow the peaceful removal of bad rulers and the correction of error. Certainty is the enemy of freedom.",
      },
    ],
    quotes: [],
    keyWorks: ["The Logic of Scientific Discovery", "The Open Society and Its Enemies"],
  },
  {
    id: "kuhn",
    name: "Thomas Kuhn",
    dates: "1922–1996",
    tradition: "Philosophy of Science",
    era: "20th century",
    region: "United States",
    tags: ["science", "wisdom", "community", "habit", "meaning"],
    oneLine:
      "Normal science works inside a paradigm; revolutions replace the paradigm when anomalies pile up.",
    ideas: [
      {
        title: "Paradigms",
        summary:
          "Scientific work is organized by shared exemplars, methods, and assumptions. A paradigm is not just a theory but a whole way of training attention.",
      },
      {
        title: "Incommensurability",
        summary:
          "Rival paradigms may not share a neutral standard of evaluation. Scientists on different sides can disagree about what counts as a problem, a fact, or even a meaningful term.",
      },
    ],
    quotes: [],
    keyWorks: ["The Structure of Scientific Revolutions"],
  },
  {
    id: "lakatos",
    name: "Imre Lakatos",
    dates: "1922–1974",
    tradition: "Philosophy of Science",
    era: "20th century",
    region: "Hungary / United Kingdom",
    tags: ["science", "wisdom", "community", "power"],
    oneLine:
      "He softened Kuhn's revolutions into research programmes with a protected core and a belt of testable hypotheses.",
    ideas: [
      {
        title: "Research programmes",
        summary:
          "Science is not a sequence of isolated theories but competing programmes. A programme is progressive if it predicts new facts, degenerating if it only patches up failures.",
      },
      {
        title: "Methodology of scientific research programmes",
        summary:
          "Lakatos tries to preserve Popper's rational standards while acknowledging that theory choice is historical and comparative. There is no instant algorithm for rationality.",
      },
    ],
    quotes: [],
    keyWorks: ["The Methodology of Scientific Research Programmes"],
  },
  {
    id: "feyerabend",
    name: "Paul Feyerabend",
    dates: "1924–1994",
    tradition: "Philosophy of Science",
    era: "20th century",
    region: "Austria / United States",
    tags: ["science", "freedom", "power", "wisdom", "community"],
    oneLine:
      "He argued that there is no single scientific method, and that 'anything goes' is closer to the truth than a rulebook.",
    ideas: [
      {
        title: "Against method",
        summary:
          "Feyerabend's historical studies show that great scientists often violate the official rules. A universal method would have blocked Galileo as much as it would block pseudoscience.",
      },
      {
        title: "Science as one tradition among others",
        summary:
          "He challenged the automatic authority of science in liberal society. Science should be protected, but not exempt from democratic scrutiny.",
      },
    ],
    quotes: [],
    keyWorks: ["Against Method", "Science in a Free Society"],
  },
  {
    id: "ross",
    name: "W. D. Ross",
    dates: "1877–1971",
    tradition: "Deontology / Intuitionism",
    era: "20th century",
    region: "United Kingdom",
    tags: ["duty", "wisdom", "justice", "care"],
    oneLine:
      "He argued that morality rests on a plural set of prima facie duties that can conflict without a master rule.",
    ideas: [
      {
        title: "Prima facie duties",
        summary:
          "Fidelity, reparation, gratitude, justice, beneficence, self-improvement, and non-maleficence are real duties. They are not absolute; when they conflict, judgment must weigh them.",
      },
      {
        title: "Moral intuition",
        summary:
          "Our considered judgments about particular cases are data for ethics. Ross trusts the reflective convictions of ordinary moral experience more than grand theory.",
      },
    ],
    quotes: [],
    keyWorks: ["The Right and the Good", "Foundations of Ethics"],
  },
  {
    id: "anscombe",
    name: "G. E. M. Anscombe",
    dates: "1919–2001",
    tradition: "Analytic Ethics / Virtue Ethics",
    era: "20th century",
    region: "United Kingdom",
    tags: ["duty", "wisdom", "care", "justice", "attention"],
    oneLine:
      "She revived virtue ethics and insisted that modern moral philosophy had lost the concept of a law it could no longer believe in.",
    ideas: [
      {
        title: "Modern moral philosophy",
        summary:
          "Anscombe argued that terms like 'morally ought' are empty remnants of a divine law framework. Without a lawgiver, philosophers should return to virtues and human flourishing.",
      },
      {
        title: "Intention",
        summary:
          "Her action theory distinguishes what a person does from what merely happens. Intention is central to responsibility, and descriptions of action are not neutral.",
      },
    ],
    quotes: [],
    keyWorks: ["Modern Moral Philosophy", "Intention"],
  },
  {
    id: "korsgaard",
    name: "Christine Korsgaard",
    dates: "1952–",
    tradition: "Kantian Ethics",
    era: "Contemporary",
    region: "United States",
    tags: ["duty", "self", "freedom", "care", "meaning"],
    oneLine:
      "She grounds ethics in the structure of agency: to act at all is to be governed by norms you give yourself.",
    ideas: [
      {
        title: "Self-constitution",
        summary:
          "We constitute ourselves as agents by adopting principles. A unified life requires commitments that are not simply impulses, because agency is a task of self-government.",
      },
      {
        title: "The sources of normativity",
        summary:
          "Korsgaard asks why moral reasons have authority over us. Her answer turns on reflective endorsement: we cannot escape the question of whether our maxims are justifiable.",
      },
    ],
    quotes: [],
    keyWorks: ["The Sources of Normativity", "Self-Constitution"],
  },
  {
    id: "oneill",
    name: "Onora O'Neill",
    dates: "1941–",
    tradition: "Kantian Ethics",
    era: "Contemporary",
    region: "United Kingdom",
    tags: ["duty", "justice", "care", "community", "wisdom"],
    oneLine:
      "She reads Kant as a philosopher of practical reason and applies him to famine, consent, and trust.",
    ideas: [
      {
        title: "Universalizability",
        summary:
          "O'Neill emphasizes Kant's formula of universal law as a test of whether an action can be willed by everyone affected. It is a standard of public reason, not private purity.",
      },
      {
        title: "Justice and hunger",
        summary:
          "Her work on famine argues that positive duties to aid are not optional supererogation. A world of preventable hunger raises questions of justice, not only charity.",
      },
    ],
    quotes: [],
    keyWorks: ["Acting on Principle", "Bounds of Justice"],
  },
  {
    id: "confucius",
    name: "Confucius",
    dates: "551–479 BCE",
    tradition: "Confucianism",
    era: "Ancient",
    region: "China",
    tags: ["community", "duty", "excellence", "wisdom", "education", "competition"],
    oneLine:
      "The good life is built through ritual, relationship, and the lifelong cultivation of humaneness.",
    ideas: [
      {
        title: "Ren and li",
        summary:
          "Ren is humaneness, the capacity to care for others; li is ritual propriety, the forms through which care becomes visible. Together they make a person fully social and fully oneself.",
      },
      {
        title: "The gentleman's competition",
        summary:
          "Confucius does not forbid competition; he insists it be transformed by courtesy. In archery, the gentleman bows before and after. The contest is a practice of character, not a war.",
      },
    ],
    quotes: [
      {
        id: "q_confucius_1",
        text: "The superior man seeks for what is in himself; the small man seeks for what is in others.",
        work: "Analects",
        locator: "15.21",
        translator: "James Legge",
        status: "verified",
      },
    ],
    keyWorks: ["Analects"],
  },
  {
    id: "foot",
    name: "Philippa Foot",
    dates: "1920–2010",
    tradition: "Virtue Ethics",
    era: "20th century",
    region: "United Kingdom",
    tags: ["excellence", "duty", "wisdom", "care", "nature"],
    oneLine:
      "She argued that virtues are excellences of human beings, as natural for us as good roots are for a plant.",
    ideas: [
      {
        title: "Natural goodness",
        summary:
          "Foot grounds ethics in the idea of a species functioning well. Virtues are the qualities that enable human beings to live and act well, given our form of life.",
      },
      {
        title: "The trolley problem",
        summary:
          "Her thought experiment about the runaway trolley became the most famous puzzle in modern ethics. Its point was to test whether consequences alone explain our judgments about killing and letting die.",
      },
    ],
    quotes: [],
    keyWorks: ["Virtues and Vices", "Natural Goodness"],
  },
  {
    id: "macintyre",
    name: "Alasdair MacIntyre",
    dates: "1929–",
    tradition: "Virtue Ethics / Thomism",
    era: "Contemporary",
    region: "Scotland / United States",
    tags: ["community", "excellence", "duty", "meaning", "wisdom"],
    oneLine:
      "He diagnosed modern ethics as a set of fragments and called for a return to practices and narrative communities.",
    ideas: [
      {
        title: "After virtue",
        summary:
          "Modern moral philosophy is incoherent because it inherited rules without the teleology that made them intelligible. The remedy is a thicker account of human flourishing and the practices that sustain it.",
      },
      {
        title: "Practices and goods",
        summary:
          "A practice is a cooperative activity with internal standards of excellence. Virtues are the qualities that let us pursue those goods and sustain the community that makes them possible.",
      },
    ],
    quotes: [],
    keyWorks: ["After Virtue", "Whose Justice? Which Rationality?"],
  },
  {
    id: "gilligan",
    name: "Carol Gilligan",
    dates: "1936–",
    tradition: "Care Ethics / Feminist Psychology",
    era: "Contemporary",
    region: "United States",
    tags: ["care", "community", "justice", "self", "love"],
    oneLine:
      "She argued that moral development has a voice of care as well as a voice of justice.",
    ideas: [
      {
        title: "A different voice",
        summary:
          "Gilligan criticized Kohlberg's model for treating justice reasoning as the pinnacle of morality. Many people, often women, reason through relationships, responsibility, and context.",
      },
      {
        title: "The ethics of care",
        summary:
          "Care ethics does not deny justice; it insists that abstract rules miss the particularity of need. Moral maturity involves responsiveness to actual people.",
      },
    ],
    quotes: [],
    keyWorks: ["In a Different Voice", "Joining the Resistance"],
  },
  {
    id: "noddings",
    name: "Nel Noddings",
    dates: "1929–2022",
    tradition: "Care Ethics",
    era: "Contemporary",
    region: "United States",
    tags: ["care", "education", "love", "community", "attention"],
    oneLine:
      "Caring is a relation, not a virtue in the carer: it requires receptivity to the one cared for.",
    ideas: [
      {
        title: "Engrossment",
        summary:
          "To care, I must receive the other as they are, not as my project needs them to be. This receptive attention is the core of the ethical relation.",
      },
      {
        title: "Care in education",
        summary:
          "Noddings argues that schools should be organized around caring relations, not only academic competition. Education is a moral practice before it is a delivery system.",
      },
    ],
    quotes: [],
    keyWorks: ["Caring", "The Challenge to Care in Schools"],
  },
  {
    id: "tronto",
    name: "Joan Tronto",
    dates: "1952–",
    tradition: "Care Ethics / Political Theory",
    era: "Contemporary",
    region: "United States",
    tags: ["care", "justice", "community", "power", "work"],
    oneLine:
      "She made care political: a democratic society must ask who does the caring and who bears its costs.",
    ideas: [
      {
        title: "Care as a political practice",
        summary:
          "Care is not a private virtue confined to the home. It is a social activity distributed unequally by gender, race, and class, and therefore a question of justice.",
      },
      {
        title: "The phases of care",
        summary:
          "Tronto analyzes caring about, taking care of, caregiving, and care receiving. Each phase raises different questions of power and responsibility.",
      },
    ],
    quotes: [],
    keyWorks: ["Moral Boundaries", "Caring Democracy"],
  },
  {
    id: "held",
    name: "Virginia Held",
    dates: "1929–",
    tradition: "Care Ethics",
    era: "Contemporary",
    region: "United States",
    tags: ["care", "justice", "community", "love", "duty"],
    oneLine:
      "She argued that care should be treated as a distinct moral framework, not a supplement to justice.",
    ideas: [
      {
        title: "The ethics of care",
        summary:
          "Held contrasts an ethics of care with contractual and rule-based models. Care begins with relationships and responsibilities, not with independent individuals and their rights.",
      },
      {
        title: "Care and society",
        summary:
          "A caring society requires institutions that support dependency and nurture, not just formal equality. The personal is political because care is social infrastructure.",
      },
    ],
    quotes: [],
    keyWorks: ["The Ethics of Care", "Rights and Goods"],
  },
  {
    id: "kittay",
    name: "Eva Feder Kittay",
    dates: "1946–",
    tradition: "Care Ethics / Disability Theory",
    era: "Contemporary",
    region: "United States",
    tags: ["care", "justice", "community", "love", "duty"],
    oneLine:
      "She argues from dependency: a just society must support the people who give care and those who need it.",
    ideas: [
      {
        title: "Dependency work",
        summary:
          "Kittay criticizes political theory that imagines independent citizens. Everyone begins dependent and many remain so; care work is a condition of freedom, not an exception to it.",
      },
      {
        title: "Love's labor",
        summary:
          "Her account of raising a disabled daughter shows how love, labor, and justice intersect. The moral question is not whether care is valuable but who is expected to provide it for free.",
      },
    ],
    quotes: [],
    keyWorks: ["Love's Labor", "Learning from My Daughter"],
  },
  {
    id: "wollstonecraft",
    name: "Mary Wollstonecraft",
    dates: "1759–1797",
    tradition: "Feminist Philosophy / Enlightenment",
    era: "Enlightenment",
    region: "England",
    tags: ["justice", "freedom", "education", "love", "self"],
    oneLine:
      "She argued that women appear inferior only because they are denied the education that would make them free.",
    ideas: [
      {
        title: "A vindication of reason",
        summary:
          "Wollstonecraft applies Enlightenment ideals consistently: if reason is the basis of dignity, women must be educated as rational beings. The failure to do so is a failure of justice, not nature.",
      },
      {
        title: "Independence of mind",
        summary:
          "Her feminism is not only about rights but about character. Women should cultivate judgment and self-respect, not the pleasing manners that make them dependent.",
      },
    ],
    quotes: [
      {
        id: "q_wollstonecraft_1",
        text: "I do not wish women to have power over men; but over themselves.",
        work: "A Vindication of the Rights of Woman",
        locator: "ch. 4",
        translator: "Mary Wollstonecraft",
        status: "verified",
      },
    ],
    keyWorks: ["A Vindication of the Rights of Woman"],
  },
  {
    id: "taylor-mill",
    name: "Harriet Taylor Mill",
    dates: "1807–1858",
    tradition: "Feminist Philosophy / Liberalism",
    era: "19th century",
    region: "England",
    tags: ["freedom", "justice", "love", "education", "self"],
    oneLine:
      "She made the case that women's emancipation is a condition of genuine marriage and a free society.",
    ideas: [
      {
        title: "The enfranchisement of women",
        summary:
          "Taylor Mill argued that women's exclusion from public life distorted both sexes. Marriage should be a partnership of equals, not a legal hierarchy.",
      },
      {
        title: "Liberty within relationship",
        summary:
          "Her collaboration with John Stuart Mill shaped On Liberty, but her own essays insist that freedom is not only individual: it is relational and institutional.",
      },
    ],
    quotes: [],
    keyWorks: ["The Enfranchisement of Women", "On Marriage"],
  },
  {
    id: "lugones",
    name: "María Lugones",
    dates: "1944–2020",
    tradition: "Feminist Philosophy / Decolonial Thought",
    era: "Contemporary",
    region: "Argentina / United States",
    tags: ["play", "fun", "community", "freedom", "care", "self"],
    oneLine:
      "She described playfulness as a way of traveling between worlds without having to conquer them.",
    ideas: [
      {
        title: "Playful world-traveling",
        summary:
          "Lugones asks how we move between different social worlds without reducing the other to our own categories. Playfulness is a mode of openness, improvisation, and mutual recognition.",
      },
      {
        title: "The coloniality of gender",
        summary:
          "She argues that gender as we know it was shaped by colonial power. Decolonizing feminism requires attention to race, class, and the global order.",
      },
    ],
    quotes: [],
    keyWorks: ["Pilgrimages/Peregrinajes", "Toward a Decolonial Feminism"],
  },
  {
    id: "bell-hooks",
    name: "bell hooks",
    dates: "1952–2021",
    tradition: "Black Feminist Thought / Cultural Criticism",
    era: "Contemporary",
    region: "United States",
    tags: ["love", "care", "community", "justice", "education", "power"],
    oneLine:
      "She insisted that love is an action, that patriarchy hurts men too, and that education can be a practice of freedom.",
    ideas: [
      {
        title: "Love as action",
        summary:
          "hooks defines love as the will to extend oneself for the growth of oneself or another. It is not a feeling that happens to you but a practice of care, respect, and accountability.",
      },
      {
        title: "Education as freedom",
        summary:
          "Her engaged pedagogy treats the classroom as a place where students and teachers can name their experience and challenge domination. Theory must be usable in ordinary life.",
      },
    ],
    quotes: [
      {
        id: "q_bell-hooks_1",
        text: "Love is an action, never simply a feeling.",
        work: "All About Love",
        locator: "ch. 1",
        translator: "bell hooks",
        status: "verified",
      },
    ],
    keyWorks: ["All About Love", "Teaching to Transgress", "The Will to Change"],
  },
  {
    id: "rawls",
    name: "John Rawls",
    dates: "1921–2002",
    tradition: "Political Liberalism",
    era: "20th century",
    region: "United States",
    tags: ["justice", "freedom", "community", "duty", "wisdom"],
    oneLine:
      "He asked what principles we would choose if we did not know where we would land in society.",
    ideas: [
      {
        title: "The original position",
        summary:
          "Imagine choosing the basic structure of society behind a veil of ignorance about your talents, class, and identity. The choice would be impartial because you could end up anyone.",
      },
      {
        title: "Justice as fairness",
        summary:
          "Rawls defends equal basic liberties and allows inequalities only if they benefit the least advantaged. The difference principle turns luck into a collective responsibility.",
      },
    ],
    quotes: [
      {
        id: "q_rawls_1",
        text: "Justice is the first virtue of social institutions, as truth is of systems of thought.",
        work: "A Theory of Justice",
        locator: "§1",
        translator: "John Rawls",
        status: "verified",
      },
    ],
    keyWorks: ["A Theory of Justice", "Political Liberalism"],
  },
  {
    id: "arendt",
    name: "Hannah Arendt",
    dates: "1906–1975",
    tradition: "Political Philosophy / Phenomenology",
    era: "20th century",
    region: "Germany / United States",
    tags: ["power", "freedom", "community", "work", "justice", "meaning"],
    oneLine:
      "She distinguished labor, work, and action, and argued that freedom appears only in the space between people.",
    ideas: [
      {
        title: "The human condition",
        summary:
          "Labor sustains life, work builds a durable world, and action begins something new among others. Modern society tends to reduce all three to economic production.",
      },
      {
        title: "The banality of evil",
        summary:
          "Arendt's report on Eichmann argued that great evil can be committed by shallow, thoughtless people. The opposite of thinking is not stupidity but the refusal to imagine from another's standpoint.",
      },
    ],
    quotes: [],
    keyWorks: ["The Human Condition", "Eichmann in Jerusalem", "On Revolution"],
  },
];
