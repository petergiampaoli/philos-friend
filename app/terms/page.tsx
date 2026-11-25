import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms — Philos-Friend",
  description: "The limits of philosophical advice, acceptable use, and the terms of this deployment.",
};

export default function TermsPage() {
  return (
    <div className="legal-page">
      <p className="eyebrow">The fine print</p>
      <h1>Terms</h1>
      <p className="legal-updated">Last updated: November 24, 2026</p>

      <p>
        Philos-Friend offers philosophical perspectives for reflection. It is not therapy, medical
        care, legal advice, financial advice, or a crisis service. By using the app, you agree to
        these terms.
      </p>

      <h2>What this is</h2>
      <p>
        Answers combine a curated library of thinkers, sourced quotations, and — when enabled — a
        language model that arranges the retrieved material into an argument. The answer is an
        invitation to think, not a diagnosis or a directive.
      </p>

      <h2>No professional relationship</h2>
      <p>
        No therapist, doctor, lawyer, financial adviser, or other professional relationship is
        created by using this app. If you need professional help, seek a qualified professional.
        If you are in immediate danger, contact local emergency services. In the United States, you
        can call or text 988 for the Suicide &amp; Crisis Lifeline.
      </p>

      <h2>Accuracy</h2>
      <p>
        Quotations are rendered from the library by ID and carry their sources. The library is
        curated, not infallible; translations, attributions, and interpretations can be disputed.
        The answer may be incomplete, wrong, or a bad fit for your situation. Check the sources and
        use your judgment.
      </p>

      <h2>Acceptable use</h2>
      <ul>
        <li>Do not use the app for illegal, abusive, harassing, or harmful purposes.</li>
        <li>Do not attempt to extract personal data, break rate limits, or disrupt the service.</li>
        <li>Do not present an answer as professional advice or as the direct instruction of a thinker.</li>
        <li>Do not use the app to impersonate another person or to evade a platform ban.</li>
      </ul>

      <h2>Intellectual property</h2>
      <p>
        The app&apos;s original writing and design belong to its operator. Quoted texts are
        attributed to their authors and translators and are included as short excerpts for
        commentary and education. If you believe a quotation is misattributed or used improperly,
        contact the operator so it can be corrected.
      </p>

      <h2>Availability</h2>
      <p>
        The service is provided as-is, without a guarantee of uptime, accuracy, or fitness for a
        particular purpose. Features may change or disappear. Rate limits and model availability
        may affect answers.
      </p>

      <h2>Limitation of liability</h2>
      <p>
        To the fullest extent permitted by law, the operator is not liable for decisions made on the
        basis of an answer, for interruptions, or for indirect or consequential losses arising from
        use of the app.
      </p>

      <h2>Changes</h2>
      <p>
        These terms may change as the app grows. The date at the top will change when they do.
      </p>

      <Link className="legal-back" href="/">
        ← Back to Philos-Friend
      </Link>
    </div>
  );
}
