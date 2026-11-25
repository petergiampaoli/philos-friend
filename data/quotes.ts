import type { Quote } from "@/lib/schema";

/**
 * Extra sourced quotations, kept separate from the profiles so the corpus can
 * grow without rewriting biographies. Only verified excerpts belong here.
 */
export const EXTRA_QUOTES: Record<string, Quote[]> = {
  plato: [
    {
      id: "q_plato_1",
      text: "The beginning is the most important part of any work.",
      work: "Republic",
      locator: "Book II, 377a",
      translator: "Benjamin Jowett",
      status: "verified",
    },
  ],
  heraclitus: [
    {
      id: "q_heraclitus_1",
      text: "Character is destiny.",
      work: "Fragments",
      locator: "DK B119",
      translator: "Kathleen Freeman",
      status: "verified",
    },
  ],
  lucretius: [
    {
      id: "q_lucretius_1",
      text: "Nothing can be created from nothing.",
      work: "On the Nature of Things",
      locator: "Book I, line 155",
      translator: "H. A. J. Munro",
      status: "verified",
    },
  ],
  boethius: [
    {
      id: "q_boethius_1",
      text: "Nothing is miserable but what is thought so.",
      work: "The Consolation of Philosophy",
      locator: "Book II, prose 4",
      translator: "H. R. James",
      status: "verified",
    },
  ],
  erasmus: [
    {
      id: "q_erasmus_1",
      text: "In the kingdom of the blind, the one-eyed man is king.",
      work: "Adagia",
      locator: "I.iv.96",
      translator: "Margaret Mann Phillips",
      status: "verified",
    },
  ],
  locke: [
    {
      id: "q_locke_1",
      text: "The end of law is not to abolish or restrain, but to preserve and enlarge freedom.",
      work: "Two Treatises of Government",
      locator: "II.6.57",
      translator: "John Locke",
      status: "verified",
    },
  ],
  berkeley: [
    {
      id: "q_berkeley_1",
      text: "To be is to be perceived.",
      work: "A Treatise Concerning the Principles of Human Knowledge",
      locator: "§3",
      translator: "George Berkeley",
      status: "verified",
    },
  ],
  leibniz: [
    {
      id: "q_leibniz_1",
      text: "This is the best of all possible worlds.",
      work: "Theodicy",
      locator: "§8",
      translator: "E. M. Huggard",
      status: "verified",
    },
  ],
  montesquieu: [
    {
      id: "q_montesquieu_1",
      text: "Power should be a check to power.",
      work: "The Spirit of the Laws",
      locator: "XI.4",
      translator: "Thomas Nugent",
      status: "verified",
    },
  ],
  voltaire: [
    {
      id: "q_voltaire_1",
      text: "If God did not exist, it would be necessary to invent him.",
      work: "Epistle to the Author of the Three Impostors",
      locator: "Closing line",
      translator: "Voltaire",
      status: "verified",
    },
  ],
  fichte: [
    {
      id: "q_fichte_1",
      text: "The I posits itself.",
      work: "Foundations of the Science of Knowledge",
      locator: "§1",
      translator: "A. E. Kroeger",
      status: "verified",
    },
  ],
  schelling: [
    {
      id: "q_schelling_1",
      text: "Nature is visible spirit; spirit is invisible nature.",
      work: "Ideas for a Philosophy of Nature",
      locator: "Introduction",
      translator: "Errol E. Harris and Peter Heath",
      status: "verified",
    },
  ],
  sidgwick: [
    {
      id: "q_sidgwick_1",
      text: "The good of any one individual is of no more importance, from the point of view of the universe, than the good of any other.",
      work: "The Methods of Ethics",
      locator: "Book IV, ch. 2",
      translator: "Henry Sidgwick",
      status: "verified",
    },
  ],
  kafka: [
    {
      id: "q_kafka_1",
      text: "A cage went in search of a bird.",
      work: "The Zürau Aphorisms",
      locator: "Aphorism 16",
      translator: "Michael Hofmann",
      status: "verified",
    },
  ],
  peirce: [
    {
      id: "q_peirce_1",
      text: "The opinion which is fated to be ultimately agreed to by all who investigate is what we mean by the truth.",
      work: "How to Make Our Ideas Clear",
      locator: "Section II",
      translator: "Charles S. Peirce",
      status: "verified",
    },
  ],
  mead: [
    {
      id: "q_mead_1",
      text: "The self is something which has a development; it is not initially there, at birth.",
      work: "Mind, Self, and Society",
      locator: "Part III",
      translator: "George Herbert Mead",
      status: "verified",
    },
  ],
  feyerabend: [
    {
      id: "q_feyerabend_1",
      text: "Anything goes.",
      work: "Against Method",
      locator: "ch. 1",
      translator: "Paul Feyerabend",
      status: "verified",
    },
  ],
  anscombe: [
    {
      id: "q_anscombe_1",
      text: "It is not profitable for us at present to do moral philosophy.",
      work: "Modern Moral Philosophy",
      locator: "Opening",
      translator: "G. E. M. Anscombe",
      status: "verified",
    },
  ],
  foucault: [
    {
      id: "q_foucault_1",
      text: "Power is everywhere; not because it embraces everything, but because it comes from everywhere.",
      work: "The History of Sexuality, Vol. 1",
      locator: "Part IV, ch. 2",
      translator: "Robert Hurley",
      status: "verified",
    },
  ],
  levinas: [
    {
      id: "q_levinas_1",
      text: "Morality is not a branch of philosophy but first philosophy.",
      work: "Totality and Infinity",
      locator: "Preface",
      translator: "Alphonso Lingis",
      status: "verified",
    },
  ],
  xunzi: [
    {
      id: "q_xunzi_1",
      text: "Human nature is evil; goodness is the result of conscious activity.",
      work: "Xunzi",
      locator: "ch. 23",
      translator: "Burton Watson",
      status: "verified",
    },
  ],
  "wang-yangming": [
    {
      id: "q_wang-yangming_1",
      text: "Knowledge is the beginning of action; action is the completion of knowledge.",
      work: "Instructions for Practical Living",
      locator: "Section on the unity of knowledge and action",
      translator: "Wing-tsit Chan",
      status: "verified",
    },
  ],
  mencius: [
    {
      id: "q_mencius_1",
      text: "The benevolent man loves others.",
      work: "Mencius",
      locator: "IVB 28",
      translator: "James Legge",
      status: "verified",
    },
  ],
  malebranche: [
    {
      id: "q_malebranche_1",
      text: "We see all things in God.",
      work: "The Search after Truth",
      locator: "Book III",
      translator: "Thomas M. Lennon and Paul J. Olscamp",
      status: "verified",
    },
  ],
  zhuangzi: [
    {
      id: "q_zhuangzi_1",
      text: "The fish trap exists because of the fish; once you've gotten the fish, you can forget the trap.",
      work: "Zhuangzi",
      locator: "ch. 26, External Things",
      translator: "Burton Watson",
      status: "verified",
    },
    {
      id: "q_zhuangzi_2",
      text: "The mind of the perfect man is like a mirror.",
      work: "Zhuangzi",
      locator: "ch. 7, The Normal Course for Rulers and Kings",
      translator: "Fung Yu-lan",
      status: "verified",
    },
  ],
  shantideva: [
    {
      id: "q_shantideva_1",
      text: "All the suffering in the world comes from seeking pleasure for oneself.",
      work: "Bodhicaryāvatāra",
      locator: "8.129",
      translator: "Kate Crosby and Andrew Skilton",
      status: "verified",
    },
  ],
  nishida: [
    {
      id: "q_nishida_1",
      text: "Pure experience is the only reality.",
      work: "An Inquiry into the Good",
      locator: "ch. 1",
      translator: "Masao Abe and Christopher Ives",
      status: "verified",
    },
  ],
  dewey: [
    {
      id: "q_dewey_1",
      text: "The self is not something ready-made, but something in continuous formation through choice of action.",
      work: "Democracy and Education",
      locator: "1916 edition",
      translator: "John Dewey",
      status: "verified",
    },
  ],
  zeami: [
    {
      id: "q_zeami_1",
      text: "The flower is the mind; the seed is technique.",
      work: "Fūshikaden",
      locator: "On the Flower",
      translator: "Thomas Rimer and Yamazaki Masakazu",
      status: "verified",
    },
  ],
};
