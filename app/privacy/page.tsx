import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy — Philos-Friend",
  description: "What Philos-Friend stores, what it sends to a model provider, and how to request deletion.",
};

export default function PrivacyPage() {
  return (
    <div className="legal-page">
      <p className="eyebrow">The fine print</p>
      <h1>Privacy</h1>
      <p className="legal-updated">Last updated: November 24, 2026</p>

      <p>
        Philos-Friend is a small philosophy advice app. This policy describes the data used to answer a
        question and keep the library working. It is written for this deployment; if you run your
        own copy, replace this page with your own contact and retention details.
      </p>

      <h2>What is stored</h2>
      <ul>
        <li>The question you submit and earlier questions used as conversation context.</li>
        <li>The generated answer, the retrieved thinker packet, and the answer trace.</li>
        <li>Basic technical logs needed to operate and secure the service.</li>
      </ul>
      <p>
        Answers and feedback are stored in the server&apos;s local data directory by default. This
        deployment does not create user accounts and does not use advertising cookies.
      </p>

      <h2>What is sent to a model provider</h2>
      <p>
        When live synthesis is configured, the question, earlier questions in the same thread, and
        the retrieved packet of thinker profiles, ideas, and quotations are sent to the configured
        model provider so it can write the answer. The provider&apos;s own privacy and data-retention
        terms apply. In demo mode, no question is sent to an external model provider.
      </p>

      <h2>Rate limiting</h2>
      <p>
        The service processes a shortened IP address in memory to enforce hourly limits. Those
        counters are not intended as a permanent record and are cleared when the process restarts.
      </p>

      <h2>What is not done</h2>
      <ul>
        <li>No selling of personal data.</li>
        <li>No advertising profiles.</li>
        <li>No account creation, password storage, or payment data in this MVP.</li>
        <li>No training of a model on your questions by this application.</li>
      </ul>

      <h2>Retention and deletion</h2>
      <p>
        Answers and feedback are retained until the operator deletes them or the storage is
        cleared. To request deletion of an answer or feedback, contact the person or organization
        operating this deployment and include the answer link or ID.
      </p>

      <h2>Children and crisis</h2>
      <p>
        The app is intended for people aged 13 and over. It is not a crisis service. If you are in
        immediate danger, contact local emergency services. In the United States, you can call or
        text 988 for the Suicide &amp; Crisis Lifeline.
      </p>

      <h2>Changes</h2>
      <p>
        This policy may change as the app grows. The date at the top will change when it does.
      </p>

      <Link className="legal-back" href="/">
        ← Back to Philos-Friend
      </Link>
    </div>
  );
}
