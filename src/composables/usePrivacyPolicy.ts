/**
 * Composable that exposes the Privacy Policy content as HTML for use in views.
 * Use with v-html inside a container that provides layout (e.g. prose, legal-doc).
 */
export function usePrivacyPolicy() {
  const content = `
<div class="legal-doc p-8 max-w-4xl mx-auto text-text-secondary leading-relaxed">

  <h1 class="text-3xl font-bold mb-2 text-text-primary">Privacy Policy — FAS Agent</h1>
  <p class="text-sm text-text-muted mb-1"><strong>Version:</strong> 1.0 — [CUSTOMIZE: effective date]</p>
  <p class="text-sm text-text-muted mb-1"><strong>Governing law:</strong> Belgian law (GDPR + Belgian Data Protection Act 30 July 2018)</p>
  <p class="text-sm text-text-muted mb-6"><strong>Supervisory authority:</strong> Autorité de protection des données / Gegevensbeschermingsautoriteit (GBA) — <a href="https://www.gegevensbeschermingsautoriteit.be" class="text-neon-a underline hover:text-neon-a/90">www.gegevensbeschermingsautoriteit.be</a></p>
  <hr class="border-white/10 mb-8" />

  <section class="mb-10">
    <h2 class="text-xl font-semibold mb-3 text-text-primary">1. Identity and Contact Details of the Data Controller / Data Processor</h2>

    <p class="mb-3 text-sm">
      FAS Agent operates under a <strong>two-tier legal structure</strong> that reflects its two service models. The applicable role depends on how a Field Engineer accesses the platform:
    </p>

    <div class="bg-white/5 border border-white/10 rounded p-4 mb-4 text-sm space-y-3">
      <div>
        <p class="font-semibold text-text-primary">Tier 1 — Solo Engineer (self-registered, no company involvement)</p>
        <p class="text-text-secondary mt-1">
          FAS Agent acts as <strong>Data Controller</strong> (Art. 4(7) GDPR) for all personal data of self-registered Field Engineers. FAS Agent determines the purposes and means of processing and bears the full disclosure and compliance obligations under GDPR directly toward the engineer.
        </p>
      </div>
      <div>
        <p class="font-semibold text-text-primary">Tier 2 — Enterprise Engineer (account provisioned by a client company)</p>
        <p class="text-text-secondary mt-1">
          The client company (the <strong>"Enterprise Controller"</strong>) acts as Data Controller for all Field Engineer personal data. FAS Agent acts as <strong>Data Processor</strong> (Art. 28 GDPR), processing engineer data only on the Enterprise Controller's documented instructions under the terms of a Data Processing Agreement (see Terms of Service §9). The Enterprise Controller is the primary point of contact for enterprise engineers exercising data subject rights.
        </p>
      </div>
      <div>
        <p class="font-semibold text-text-primary">In all cases — Company Administrator data</p>
        <p class="text-text-secondary mt-1">
          FAS Agent acts as <strong>Data Controller</strong> for personal data of Company Administrators (name, email, account credentials, billing information).
        </p>
      </div>
    </div>

    <div class="bg-white/5 border border-white/10 rounded p-4 text-sm space-y-1">
      <p class="font-semibold text-text-primary">Data Controller / Data Processor contact:</p>
      <p>[CUSTOMIZE: Legal company name]</p>
      <p>[CUSTOMIZE: Registered address, Belgium]</p>
      <p>[CUSTOMIZE: Belgian enterprise number (BCE/KBO)]</p>
      <p>Privacy contact: <a href="mailto:privacy@fasagent.com" class="text-neon-a underline hover:text-neon-a/90">[CUSTOMIZE: privacy@fasagent.com]</a></p>
      <p class="font-semibold mt-3 text-text-primary">Data Protection Officer:</p>
      <p>[CUSTOMIZE: DPO name and email, or document basis for DPO non-obligation under Art. 37 GDPR threshold assessment]</p>
    </div>
  </section>

  <section class="mb-10">
    <h2 class="text-xl font-semibold mb-3 text-text-primary">2. Scope and Applicable Law</h2>
    <p class="mb-3 text-sm">This Privacy Policy applies to all processing of personal data carried out by FAS Agent in connection with the platform, including the WhatsApp integration and Progressive Web App (PWA). The following legal instruments govern:</p>
    <ul class="list-disc ml-6 mb-3 space-y-1 text-sm">
      <li><strong>GDPR</strong> — Regulation (EU) 2016/679 of 27 April 2016.</li>
      <li><strong>Belgian Data Protection Act</strong> — Law of 30 July 2018 on the Protection of Natural Persons with Regard to the Processing of Personal Data.</li>
      <li><strong>ePrivacy Directive</strong> — Directive 2002/58/EC as transposed into Belgian law by the Act of 13 June 2005 on electronic communications, governing browser storage and device-side data.</li>
      <li><strong>EU AI Act</strong> — Regulation (EU) 2024/1689, to the extent its transparency and human oversight obligations apply to AI systems operated by FAS Agent.</li>
    </ul>
    <p class="text-sm text-text-secondary">
      Where FAS Agent acts as Processor (enterprise tier), the Enterprise Controller's own privacy notice and Data Processing Agreement supplement this policy and govern the relationship with enterprise engineers.
    </p>
  </section>

  <section class="mb-10">
    <h2 class="text-xl font-semibold mb-3 text-text-primary">3. Categories of Personal Data Collected (Arts. 13 &amp; 14 GDPR)</h2>

    <p class="mb-3 text-sm">
      The table below applies to both service tiers. Column headers indicate where the legal basis or retention period differs between tiers. Where FAS Agent acts as Processor (enterprise tier), the legal basis is established and documented by the Enterprise Controller.
    </p>

    <div class="overflow-x-auto mb-4">
      <table class="w-full text-xs border-collapse border border-white/20">
        <thead class="bg-white/10 font-semibold text-text-primary">
          <tr>
            <td class="border border-white/20 p-2">Data Category</td>
            <td class="border border-white/20 p-2">Source</td>
            <td class="border border-white/20 p-2">Purpose</td>
            <td class="border border-white/20 p-2">Legal Basis — Solo (FAS Agent as Controller)</td>
            <td class="border border-white/20 p-2">Legal Basis — Enterprise (Controller is client company)</td>
            <td class="border border-white/20 p-2">Retention</td>
          </tr>
        </thead>
        <tbody class="text-text-secondary">
          <tr>
            <td class="border border-white/20 p-2">Name, email address (admin)</td>
            <td class="border border-white/20 p-2">Admin registration</td>
            <td class="border border-white/20 p-2">Account management, billing</td>
            <td class="border border-white/20 p-2" colspan="2">Art. 6(1)(b) — contract performance (FAS Agent as Controller in both cases for admin data)</td>
            <td class="border border-white/20 p-2">Contract duration + 7 years (Belgian accounting law)</td>
          </tr>
          <tr class="bg-white/5">
            <td class="border border-white/20 p-2">Phone number (WhatsApp)</td>
            <td class="border border-white/20 p-2">Self-provided by engineer (solo); provisioned by company administrator (enterprise)</td>
            <td class="border border-white/20 p-2">WhatsApp message delivery</td>
            <td class="border border-white/20 p-2">Art. 6(1)(b) — contract performance (FAS Agent as Controller)</td>
            <td class="border border-white/20 p-2">Art. 6(1)(b) — contract performance (Enterprise Controller)</td>
            <td class="border border-white/20 p-2">Duration of account + 30 days post-deletion</td>
          </tr>
          <tr>
            <td class="border border-white/20 p-2">Declared years of experience, company tenure, professional domain</td>
            <td class="border border-white/20 p-2">Engineer self-declaration</td>
            <td class="border border-white/20 p-2">Initial seniority weight calculation for confidence scoring</td>
            <td class="border border-white/20 p-2">Art. 6(1)(b) — contract performance</td>
            <td class="border border-white/20 p-2">Art. 6(1)(b) — contract performance (Enterprise Controller)</td>
            <td class="border border-white/20 p-2">Duration of engineer account</td>
          </tr>
          <tr class="bg-white/5">
            <td class="border border-white/20 p-2">WhatsApp conversation history (questions and AI-generated answers)</td>
            <td class="border border-white/20 p-2">Platform usage</td>
            <td class="border border-white/20 p-2">Answer generation; AI model training (training only with consent — see §5)</td>
            <td class="border border-white/20 p-2">Art. 6(1)(b) for answer generation; Art. 6(1)(a) consent for training. Note: for solo engineers, training consent is functionally necessary for service delivery — see §5.4.</td>
            <td class="border border-white/20 p-2">Art. 6(1)(b) for answer generation; Art. 6(1)(a) consent for training (Enterprise Controller)</td>
            <td class="border border-white/20 p-2">Duration of account; training data retained per §8 unless consent withdrawn</td>
          </tr>
          <tr>
            <td class="border border-white/20 p-2">Voting behavior (peer-validation A/B selections)</td>
            <td class="border border-white/20 p-2">Platform usage</td>
            <td class="border border-white/20 p-2">Confidence score calculation; training data (with consent)</td>
            <td class="border border-white/20 p-2">Art. 6(1)(b) for scoring; Art. 6(1)(a) consent for training</td>
            <td class="border border-white/20 p-2">Art. 6(1)(b) for scoring; Art. 6(1)(a) consent for training (Enterprise Controller)</td>
            <td class="border border-white/20 p-2">Duration of engineer account</td>
          </tr>
          <tr class="bg-white/5">
            <td class="border border-white/20 p-2">Validation accuracy score per domain (computed)</td>
            <td class="border border-white/20 p-2">Computed from voting behavior</td>
            <td class="border border-white/20 p-2">Automated seniority weight adjustment (profiling — see §4)</td>
            <td class="border border-white/20 p-2">Art. 6(1)(b) — contract performance</td>
            <td class="border border-white/20 p-2">Art. 6(1)(b) — contract performance (Enterprise Controller)</td>
            <td class="border border-white/20 p-2">Duration of engineer account</td>
          </tr>
          <tr>
            <td class="border border-white/20 p-2">Weekly quiz responses and response times</td>
            <td class="border border-white/20 p-2">WhatsApp quiz</td>
            <td class="border border-white/20 p-2">Knowledge gap detection; training data (with consent)</td>
            <td class="border border-white/20 p-2">Art. 6(1)(b) for gap detection; Art. 6(1)(a) consent for training</td>
            <td class="border border-white/20 p-2">Art. 6(1)(b) for gap detection; Art. 6(1)(a) consent for training (Enterprise Controller)</td>
            <td class="border border-white/20 p-2">Duration of account; training data per §8</td>
          </tr>
          <tr class="bg-white/5">
            <td class="border border-white/20 p-2">Uploaded technical documents (PDF, DOCX)</td>
            <td class="border border-white/20 p-2">Admin upload</td>
            <td class="border border-white/20 p-2">RAG knowledge base; LLM processing for enrichment. Only technical documents relevant to field operations are permitted — see Terms of Service §4.</td>
            <td class="border border-white/20 p-2">Art. 6(1)(b) — contract performance</td>
            <td class="border border-white/20 p-2">Art. 6(1)(b) — contract performance (Enterprise Controller)</td>
            <td class="border border-white/20 p-2">Duration of contract + 30 days post-termination</td>
          </tr>
          <tr>
            <td class="border border-white/20 p-2">IP address, browser data, PWA usage data</td>
            <td class="border border-white/20 p-2">Device / browser</td>
            <td class="border border-white/20 p-2">Security, fraud prevention, analytics</td>
            <td class="border border-white/20 p-2">Art. 6(1)(f) — legitimate interest (security); Art. 6(1)(a) consent for analytics</td>
            <td class="border border-white/20 p-2">Art. 6(1)(f) — legitimate interest (security); Art. 6(1)(a) consent for analytics</td>
            <td class="border border-white/20 p-2">Security logs: 90 days. Analytics: [CUSTOMIZE]</td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>

  <section class="mb-10">
    <h2 class="text-xl font-semibold mb-3 text-text-primary">4. Automated Profiling and Decision-Making (Art. 22 GDPR)</h2>
    <p class="mb-3 text-sm">
      The platform performs <strong>automated profiling</strong> of Field Engineers within the meaning of Art. 4(4) GDPR. This section constitutes the mandatory disclosure required by Art. 22(3) GDPR and applies to both service tiers.
    </p>

    <h3 class="font-semibold mb-2 text-text-primary">4.1 The Seniority Scoring System</h3>
    <p class="mb-3 text-sm">
      Each Field Engineer is assigned a dynamic <strong>seniority weight</strong> that determines the influence of their validation votes on the platform's confidence scoring formula. It is computed automatically as follows:
    </p>
    <ul class="list-disc ml-6 mb-3 text-sm space-y-1">
      <li><strong>Initial value:</strong> Based on self-declared years of experience and company tenure.</li>
      <li><strong>Ongoing adjustment:</strong> The weight shifts over time toward the engineer's computed <em>validation accuracy score</em> — a measure of how often the engineer selects the answer subsequently confirmed as correct by peers or the knowledge base.</li>
      <li><strong>No human review:</strong> These adjustments occur automatically without individual human review of each adjustment decision.</li>
    </ul>

    <h3 class="font-semibold mb-2 text-text-primary">4.2 Confidence Score Formula</h3>
    <p class="mb-3 text-sm">
      The platform's confidence score for any AI-generated answer is calculated as: <em>vote ratio (×0.5) + seniority weight (×0.3) + time-decay recency (×0.2)</em>. Engineer seniority weights directly influence which answers are consolidated into the knowledge base.
    </p>

    <h3 class="font-semibold mb-2 text-text-primary">4.3 Decisions Influenced by Profiling</h3>
    <p class="mb-3 text-sm">
      The automated seniority weight affects: (a) the relative weight assigned to an engineer's validation votes; (b) which AI answers are consolidated into the knowledge base; (c) training data quality weighting. It does <strong>not</strong> determine employment, pay, or disciplinary outcomes — those remain exclusively within the Enterprise Controller's authority and are outside the scope of this platform.
    </p>

    <h3 class="font-semibold mb-2 text-text-primary">4.4 EU AI Act Transparency</h3>
    <p class="mb-3 text-sm">
      Consistent with the transparency obligations of the EU AI Act (Regulation (EU) 2024/1689), Field Engineers are notified that they are interacting with an AI system. AI-generated answers are clearly labeled as such within the platform interface.
    </p>

    <h3 class="font-semibold mb-2 text-text-primary">4.5 Engineer Rights Regarding Automated Profiling</h3>
    <p class="text-sm">
      Engineers have the right to: (a) <strong>object</strong> to automated profiling at any time (Art. 21 GDPR) by contacting FAS Agent (solo tier) or the Enterprise Controller (enterprise tier) at the address in §1; (b) request <strong>human review</strong> of any seniority weight adjustment believed to be inaccurate — for enterprise engineers, the Enterprise Controller is responsible for providing this review mechanism (Art. 22(3) GDPR); (c) <strong>rectification</strong> of inaccurate profile data (Art. 16 GDPR). Objection to profiling does not affect the engineer's ability to receive AI-generated answers.
    </p>
  </section>

  <section class="mb-10">
    <h2 class="text-xl font-semibold mb-3 text-text-primary">5. Use of Personal Data for AI Model Training</h2>

    <h3 class="font-semibold mb-2 text-text-primary">5.1 What Is Used for Training</h3>
    <p class="mb-3 text-sm">
      Subject to the consent obtained under §5.2, the following data may be used to train and improve the <strong>engineer-specific or company-specific fine-tuned Small Language Model (Qwen2.5-VL-3B)</strong>:
    </p>
    <ul class="list-disc ml-6 mb-3 text-sm space-y-1">
      <li>WhatsApp conversation history (questions and AI-generated answers).</li>
      <li>Peer-validated answers and their associated vote records.</li>
      <li>Weekly quiz responses and response time data.</li>
    </ul>
    <p class="mb-3 text-sm">
      Training data is <strong>strictly isolated</strong>: a solo engineer's data is used only to train their own model; an enterprise company's data is used only to train that company's model. No data crosses these boundaries under any circumstance.
    </p>

    <h3 class="font-semibold mb-2 text-text-primary">5.2 Legal Basis for Training Use</h3>
    <p class="mb-3 text-sm">
      The use of personal data for AI model training relies on <strong>freely given, specific, informed, and unambiguous consent</strong> (Art. 6(1)(a) GDPR; Art. 7 GDPR). Consent is collected through the multilingual Data Consent Agreement (Annex B of the Terms of Service) before any training use commences. For solo engineers, the functional relationship between training consent and service delivery is disclosed at the point of consent collection — see §5.4 below.
    </p>

    <h3 class="font-semibold mb-2 text-text-primary">5.3 Right to Object and Withdraw Consent</h3>
    <p class="mb-3 text-sm">
      Engineers may withdraw consent for training use at any time by: (a) contacting FAS Agent at the address in §1 (solo tier) or the Enterprise Controller (enterprise tier); or (b) using the consent management option in the PWA settings. Withdrawal of consent does not affect the lawfulness of training already carried out before withdrawal.
    </p>

    <h3 class="font-semibold mb-2 text-text-primary">5.4 Effect of Withdrawal on the Model and Service Continuity</h3>
    <p class="mb-3 text-sm">
      Upon withdrawal: (a) no new conversations or quiz responses from the withdrawing engineer will be used in future training cycles; (b) FAS Agent will use commercially reasonable technical efforts to exclude the withdrawing engineer's historical data from the next scheduled model retraining; (c) due to the nature of neural network training, <strong>it is technically impracticable to surgically remove the influence of past data from existing model weights</strong> — this limitation is disclosed at the point of consent collection.
    </p>
    <div class="bg-amber-500/10 border border-amber-500/30 rounded p-4 mb-3 text-sm">
      <p class="font-semibold text-amber-400 mb-2">⚠️ Service continuity notice for Solo Engineers</p>
      <p class="text-text-secondary">
        For self-registered (solo) Field Engineers, the fine-tuned AI model is built exclusively from the individual engineer's own interactions and knowledge contributions. The purpose of FAS Agent — providing a continuously improving, personalised AI technical assistant — <strong>cannot be fully delivered without training data</strong>. If a solo engineer withdraws training consent or refuses it at registration, FAS Agent <strong>cannot guarantee the quality of the AI service</strong> for that account, as the model will be unable to learn or improve from that engineer's usage. The practical availability and usefulness of the service may therefore be significantly limited. This limitation is disclosed at the point of consent collection and at account registration.
      </p>
    </div>
    <p class="mb-3 text-sm text-text-secondary">
      For <strong>enterprise engineers</strong>, training consent withdrawal does not affect service availability. The enterprise model is trained on the collective validated knowledge of the entire engineering team. The withdrawal of one engineer's consent does not prevent the model from functioning or improving, as described in §5.5 below.
    </p>

    <h3 class="font-semibold mb-2 text-text-primary">5.5 Effect of Withdrawal on Answer Quality</h3>
    <div class="bg-white/5 border border-white/10 rounded p-3 mb-3 text-sm space-y-2">
      <p>
        <strong>Enterprise engineers:</strong> Withdrawal of training consent has <strong>no negative effect on answer quality</strong>. The enterprise model is trained on the collective knowledge of the entire engineering team. The quality of AI answers depends on the shared company knowledge base, not on any individual engineer's data contribution.
      </p>
      <p>
        <strong>Solo engineers:</strong> As described in §5.4, the AI model for a solo engineer's account is trained exclusively on that engineer's own data. Withdrawal or refusal of training consent means the model cannot learn or improve, and <strong>answer quality cannot be guaranteed</strong>. The practical usefulness of the service may be significantly limited as a result. See §5.4 for full details.
      </p>
    </div>
  </section>

  <section class="mb-10">
    <h2 class="text-xl font-semibold mb-3 text-text-primary">6. Third-Party Data Processors (Art. 28 GDPR)</h2>
    <p class="mb-4 text-sm">
      FAS Agent engages the following sub-processors. All sub-processors are bound by data processing agreements meeting the requirements of Art. 28(3) GDPR. Controllers (enterprise tier) and engineers (solo tier) are notified of sub-processor changes with adequate advance notice.
    </p>
    <div class="overflow-x-auto">
      <table class="w-full text-xs border-collapse border border-white/20">
        <thead class="bg-white/10 font-semibold text-text-primary">
          <tr>
            <td class="border border-white/20 p-2">Sub-Processor</td>
            <td class="border border-white/20 p-2">Role</td>
            <td class="border border-white/20 p-2">Data Transferred</td>
            <td class="border border-white/20 p-2">Storage Location</td>
            <td class="border border-white/20 p-2">Transfer Mechanism</td>
          </tr>
        </thead>
        <tbody class="text-text-secondary">
          <tr>
            <td class="border border-white/20 p-2"><strong>Google LLC</strong> (Gemini API)</td>
            <td class="border border-white/20 p-2">LLM processing — document enrichment and polishing pipeline (server-side)</td>
            <td class="border border-white/20 p-2">Uploaded technical document content (may incidentally contain personal data if present in documents)</td>
            <td class="border border-white/20 p-2">United States</td>
            <td class="border border-white/20 p-2">Standard Contractual Clauses (SCCs) — EU Commission Decision 2021/914; Google LLC also participates in the EU-U.S. Data Privacy Framework (adequacy decision of 10 July 2023)</td>
          </tr>
          <tr class="bg-white/5">
            <td class="border border-white/20 p-2"><strong>DeepSeek</strong> (DeepSeek API)</td>
            <td class="border border-white/20 p-2">LLM processing — document enrichment pipeline (multi-LLM agent)</td>
            <td class="border border-white/20 p-2">Uploaded technical document content</td>
            <td class="border border-white/20 p-2">[CUSTOMIZE: confirm DeepSeek infrastructure location — note that transfers to the People's Republic of China require enhanced safeguard assessment per EDPB guidance]</td>
            <td class="border border-white/20 p-2">SCCs — EU Commission Decision 2021/914 [CUSTOMIZE: verify current transfer mechanism and consider supplementary measures for China-based processing per EDPB Recommendations 01/2020]</td>
          </tr>
          <tr>
            <td class="border border-white/20 p-2"><strong>Evolution API / WhatsApp Business API provider</strong></td>
            <td class="border border-white/20 p-2">WhatsApp message routing — delivers AI answers, weekly quizzes, and peer-validation broadcasts; receives inbound engineer messages</td>
            <td class="border border-white/20 p-2">Engineer WhatsApp phone numbers; message content (questions, answers, quiz responses)</td>
            <td class="border border-white/20 p-2">[CUSTOMIZE: confirm Evolution API and Meta/WhatsApp infrastructure location]</td>
            <td class="border border-white/20 p-2">SCCs; also subject to Meta Platforms Inc. WhatsApp Business API terms</td>
          </tr>
          <tr class="bg-white/5">
            <td class="border border-white/20 p-2"><strong>[CUSTOMIZE: Cloud hosting provider]</strong></td>
            <td class="border border-white/20 p-2">Primary infrastructure — application servers, databases, document storage, model weights storage</td>
            <td class="border border-white/20 p-2">All platform data at rest and in transit</td>
            <td class="border border-white/20 p-2">[CUSTOMIZE: data center region — EU hosting strongly preferred]</td>
            <td class="border border-white/20 p-2">[CUSTOMIZE: SCCs / adequacy decision / EU hosting (no transfer mechanism required if EEA-based)]</td>
          </tr>
          <tr class="bg-white/5">
            <td class="border border-white/20 p-2"><strong>[CUSTOMIZE: Additional LLM provider]</strong></td>
            <td class="border border-white/20 p-2">LLM processing — [CUSTOMIZE: describe role in pipeline, e.g., answer generation, document classification, or other enrichment task]</td>
            <td class="border border-white/20 p-2">Uploaded technical document content; [CUSTOMIZE: specify if engineer conversation data is also sent to this provider]</td>
            <td class="border border-white/20 p-2">[CUSTOMIZE: confirm infrastructure location and country]</td>
            <td class="border border-white/20 p-2">[CUSTOMIZE: SCCs (EU Commission Decision 2021/914) / adequacy decision / other — confirm with provider DPA]</td>
          </tr>
          <tr>
            <td class="border border-white/20 p-2"><strong>[CUSTOMIZE: Email / notification provider]</strong></td>
            <td class="border border-white/20 p-2">Transactional email delivery (account notifications, admin alerts)</td>
            <td class="border border-white/20 p-2">Administrator email addresses; notification content</td>
            <td class="border border-white/20 p-2">[CUSTOMIZE]</td>
            <td class="border border-white/20 p-2">[CUSTOMIZE: SCCs / adequacy]</td>
          </tr>
        </tbody>
      </table>
    </div>
    <p class="mt-3 text-sm text-text-secondary">
      An up-to-date list of sub-processors is available upon written request to the address in §1. FAS Agent will provide at least 30 days' notice of material changes to this list, during which Enterprise Controllers may object.
    </p>
  </section>

  <section class="mb-10">
    <h2 class="text-xl font-semibold mb-3 text-text-primary">7. Data Retention Periods (Art. 5(1)(e) GDPR)</h2>
    <p class="mb-4 text-sm">Personal data is retained only for as long as necessary for the purposes for which it was collected, or as required by applicable Belgian law.</p>
    <div class="overflow-x-auto">
      <table class="w-full text-xs border-collapse border border-white/20">
        <thead class="bg-white/10 font-semibold text-text-primary">
          <tr>
            <td class="border border-white/20 p-2">Data Category</td>
            <td class="border border-white/20 p-2">Retention Period</td>
            <td class="border border-white/20 p-2">Basis for Duration</td>
          </tr>
        </thead>
        <tbody class="text-text-secondary">
          <tr>
            <td class="border border-white/20 p-2">Company Administrator account data</td>
            <td class="border border-white/20 p-2">Contract duration + 7 years</td>
            <td class="border border-white/20 p-2">Belgian accounting law (Art. III.86 WER/CDE)</td>
          </tr>
          <tr class="bg-white/5">
            <td class="border border-white/20 p-2">Engineer profiles (name, phone, experience declarations)</td>
            <td class="border border-white/20 p-2">Duration of account; deleted within 30 days of account deletion request</td>
            <td class="border border-white/20 p-2">Art. 5(1)(e) GDPR — storage limitation</td>
          </tr>
          <tr>
            <td class="border border-white/20 p-2">WhatsApp conversation history</td>
            <td class="border border-white/20 p-2">Duration of account / contract. If used as training data (with consent): retained for the active model training lifecycle. On account closure or contract termination: deleted within 60 days unless earlier deletion is requested.</td>
            <td class="border border-white/20 p-2">Art. 6(1)(b) for service delivery; Art. 6(1)(a) for training use</td>
          </tr>
          <tr class="bg-white/5">
            <td class="border border-white/20 p-2">Peer-validated answers (knowledge base entries)</td>
            <td class="border border-white/20 p-2">Duration of account / contract + 30 days (available for export)</td>
            <td class="border border-white/20 p-2">Legitimate interest in preserving institutional knowledge during termination window</td>
          </tr>
          <tr>
            <td class="border border-white/20 p-2">Quiz responses and response times</td>
            <td class="border border-white/20 p-2">Duration of account; training data lifecycle per consent terms</td>
            <td class="border border-white/20 p-2">Art. 6(1)(a) consent for training use</td>
          </tr>
          <tr class="bg-white/5">
            <td class="border border-white/20 p-2">Fine-tuned model weights (per-engineer or per-company)</td>
            <td class="border border-white/20 p-2">Duration of account / contract + 30 days (available for export by engineer or Controller). Permanently deleted thereafter.</td>
            <td class="border border-white/20 p-2">[CUSTOMIZE: IP ownership clause — see Terms of Service §6.3]</td>
          </tr>
          <tr>
            <td class="border border-white/20 p-2">Uploaded technical documents (PDF, DOCX)</td>
            <td class="border border-white/20 p-2">Duration of account / contract + 30 days. Deleted on engineer or Controller instruction at any time.</td>
            <td class="border border-white/20 p-2">Art. 6(1)(b) — contract performance</td>
          </tr>
          <tr class="bg-white/5">
            <td class="border border-white/20 p-2">Security logs (IP addresses, access logs)</td>
            <td class="border border-white/20 p-2">90 days</td>
            <td class="border border-white/20 p-2">Art. 6(1)(f) — legitimate interest (security)</td>
          </tr>
          <tr>
            <td class="border border-white/20 p-2">Analytics / usage data</td>
            <td class="border border-white/20 p-2">[CUSTOMIZE: e.g., 12 months]</td>
            <td class="border border-white/20 p-2">Art. 6(1)(a) consent</td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>

  <section class="mb-10">
    <h2 class="text-xl font-semibold mb-3 text-text-primary">8. Data Subject Rights (Arts. 15–22 GDPR)</h2>
    <p class="mb-3 text-sm">
      <strong>Solo engineers</strong> exercise rights directly with FAS Agent at the address in §1. <strong>Enterprise engineers</strong> should direct rights requests to their employer (the Enterprise Controller) in the first instance; FAS Agent cooperates with Enterprise Controllers to facilitate fulfillment.
    </p>
    <ul class="list-none ml-0 mb-4 space-y-3 text-sm">
      <li><strong>Right of access (Art. 15 GDPR):</strong> You may obtain confirmation of whether personal data about you is being processed and receive a copy of that data together with information about the processing.</li>
      <li><strong>Right to rectification (Art. 16 GDPR):</strong> You may have inaccurate personal data corrected, including inaccurate seniority profile data or experience declarations.</li>
      <li><strong>Right to erasure (Art. 17 GDPR):</strong> You may request deletion of your personal data where it is no longer necessary, where consent has been withdrawn, or where there is no overriding legitimate basis. Note: due to the nature of neural network training, erasure of specific data contributions from existing model weights is technically impracticable (see §5.4). Future training cycles will exclude withdrawn data. For solo engineers, erasure of training data means the model cannot learn from that engineer's usage; service quality may be significantly limited as a result (see §5.4).</li>
      <li><strong>Account deactivation:</strong> You may deactivate your account at any time from your profile in the PWA. Deactivation is reversible: it logs you out on all devices and prevents sign-in until the account is reactivated. Your data is retained; only deletion (see above) permanently removes your data. This functionality is supported by the platform (backend) and remains available to users.</li>
      <li><strong>Right to restriction of processing (Art. 18 GDPR):</strong> You may request restriction of processing in circumstances including when the accuracy of data is contested.</li>
      <li><strong>Right to data portability (Art. 20 GDPR):</strong> You may receive personal data you have provided in a structured, commonly used, machine-readable format (JSON), and have that data transmitted to another controller where technically feasible.</li>
      <li><strong>Right to object (Art. 21 GDPR):</strong> You may object to processing based on legitimate interests (Art. 6(1)(f)) at any time. You may object to <strong>automated profiling</strong> (seniority weight calculation) at any time — see §4.5.</li>
      <li><strong>Right to withdraw training consent:</strong> You may withdraw consent for use of your conversation and quiz data for AI model training at any time — see §5.3. For solo engineers, withdrawal implications for service continuity are described in §5.4.</li>
      <li><strong>Rights regarding automated decision-making (Art. 22 GDPR):</strong> You may request human review of automated seniority weight adjustments and contest such decisions — see §4.5.</li>
    </ul>
    <p class="text-sm text-text-secondary">
      Requests are responded to within <strong>one calendar month</strong> (Art. 12(3) GDPR), extendable by two further months where necessary. No fee is charged for reasonable requests.
    </p>
  </section>

  <section class="mb-10">
    <h2 class="text-xl font-semibold mb-3 text-text-primary">9. International Data Transfers (Arts. 44–49 GDPR)</h2>
    <p class="mb-3 text-sm">
      Personal data may be transferred outside the EEA when processed by the sub-processors listed in §6. All such transfers are subject to appropriate safeguards under Chapter V GDPR:
    </p>
    <ul class="list-disc ml-6 mb-3 text-sm space-y-2">
      <li><strong>Standard Contractual Clauses (SCCs)</strong> (EU Commission Implementing Decision 2021/914) — used for transfers to Google (US) and DeepSeek. SCCs are incorporated into all sub-processor agreements.</li>
      <li><strong>EU-U.S. Data Privacy Framework</strong> — Google LLC participates in the EU-U.S. Data Privacy Framework (adequacy decision of 10 July 2023) for transfers to the United States.</li>
      <li><strong>DeepSeek (People's Republic of China):</strong> Transfers to China are subject to enhanced scrutiny per EDPB Recommendations 01/2020 on supplementary measures. FAS Agent has assessed [CUSTOMIZE: document your transfer impact assessment (TIA) conclusion and supplementary measures adopted for DeepSeek processing].</li>
      <li><strong>EU-based hosting preferred:</strong> FAS Agent uses commercially reasonable efforts to host primary data within the EEA. [CUSTOMIZE: confirm hosting region.]</li>
    </ul>
    <p class="text-sm text-text-secondary">Copies of applicable SCCs are available upon written request to the address in §1.</p>
  </section>

  <section class="mb-10">
    <h2 class="text-xl font-semibold mb-3 text-text-primary">10. Security Measures (Art. 32 GDPR)</h2>
    <p class="mb-3 text-sm">FAS Agent implements appropriate technical and organisational measures to ensure security appropriate to the risk, including:</p>
    <ul class="list-disc ml-6 mb-3 text-sm space-y-1">
      <li><strong>Data isolation per account:</strong> Each engineer account (solo) and each client company (enterprise) has logically and technically isolated data partitions. No data crosses account or company boundaries under any circumstance, including documents, conversations, engineer profiles, and model weights.</li>
      <li><strong>Encryption in transit:</strong> All data transmitted between the platform and users is encrypted using TLS 1.2 or higher.</li>
      <li><strong>Encryption at rest:</strong> Data stored server-side is encrypted at rest using AES-256 or equivalent.</li>
      <li><strong>Model isolation:</strong> Each engineer's or company's fine-tuned model is stored and executed in an isolated environment. Model weights are never shared across accounts or companies.</li>
      <li><strong>Access controls:</strong> Role-based access controls (RBAC) limit access to personal data to authorised personnel only. Administrative access requires multi-factor authentication.</li>
      <li><strong>Sub-processor security:</strong> All sub-processors are contractually required to maintain equivalent security standards.</li>
      <li>[CUSTOMIZE: describe penetration testing, vulnerability scanning, or other security review cadence.]</li>
    </ul>
  </section>

  <section class="mb-10">
    <h2 class="text-xl font-semibold mb-3 text-text-primary">11. Cookies and Browser Storage Policy</h2>
    <p class="mb-3 text-sm">The FAS Agent PWA uses the following browser storage:</p>
    <div class="overflow-x-auto mb-3">
      <table class="w-full text-xs border-collapse border border-white/20">
        <thead class="bg-white/10 font-semibold text-text-primary">
          <tr>
            <td class="border border-white/20 p-2">Storage Type / Name</td>
            <td class="border border-white/20 p-2">Purpose</td>
            <td class="border border-white/20 p-2">Category</td>
            <td class="border border-white/20 p-2">Consent Required</td>
            <td class="border border-white/20 p-2">Duration</td>
          </tr>
        </thead>
        <tbody class="text-text-secondary">
          <tr>
            <td class="border border-white/20 p-2">Session authentication token (cookie)</td>
            <td class="border border-white/20 p-2">Maintains authenticated PWA session</td>
            <td class="border border-white/20 p-2">Strictly necessary</td>
            <td class="border border-white/20 p-2">No (ePrivacy essential exemption)</td>
            <td class="border border-white/20 p-2">Session / [CUSTOMIZE]</td>
          </tr>
          <tr class="bg-white/5">
            <td class="border border-white/20 p-2">CSRF protection token (cookie)</td>
            <td class="border border-white/20 p-2">Security — prevents cross-site request forgery</td>
            <td class="border border-white/20 p-2">Strictly necessary</td>
            <td class="border border-white/20 p-2">No</td>
            <td class="border border-white/20 p-2">Session</td>
          </tr>
          <tr>
            <td class="border border-white/20 p-2">Analytics cookie [CUSTOMIZE: name]</td>
            <td class="border border-white/20 p-2">Platform usage analytics</td>
            <td class="border border-white/20 p-2">Analytical (non-essential)</td>
            <td class="border border-white/20 p-2">Yes — consent banner required</td>
            <td class="border border-white/20 p-2">[CUSTOMIZE: e.g., 12 months]</td>
          </tr>
        </tbody>
      </table>
    </div>
    <p class="text-sm text-text-secondary italic">
      Note: Offline functionality via IndexedDB and service worker caching has not yet been finalised as a platform feature. This section will be updated if offline storage is introduced. Engineers will be notified of any new storage types before they are deployed.
    </p>
  </section>

  <section class="mb-10">
    <h2 class="text-xl font-semibold mb-3 text-text-primary">12. Data Breach Notification (Arts. 33 &amp; 34 GDPR)</h2>
    <p class="mb-3 text-sm">In the event of a personal data breach, FAS Agent follows this procedure:</p>
    <ul class="list-disc ml-6 mb-3 text-sm space-y-2">
      <li><strong>Internal detection and assessment:</strong> Immediate containment and assessment of scope, affected data categories, and likely consequences.</li>
      <li><strong>Enterprise Controller notification (Processor role):</strong> FAS Agent will notify the affected Enterprise Controller <strong>without undue delay and within 72 hours</strong> of becoming aware of a breach, providing all available information to enable the Controller to fulfill its Art. 33 GDPR notification obligation to the GBA.</li>
      <li><strong>GBA notification (Controller role — solo engineer data):</strong> For breaches involving solo engineer data or administrator data for which FAS Agent is Controller, FAS Agent will notify the GBA within <strong>72 hours</strong> of becoming aware (Art. 33(1) GDPR). Notification will include: nature of the breach, categories and approximate number of affected persons and records, likely consequences, and measures taken or proposed.</li>
      <li><strong>Data subject notification (Art. 34 GDPR):</strong> Where a breach is likely to result in a high risk to individuals' rights and freedoms, affected data subjects will be notified without undue delay in clear and plain language.</li>
    </ul>
    <p class="text-sm text-text-secondary">GBA breach portal: <a href="https://www.gegevensbeschermingsautoriteit.be" class="text-neon-a underline hover:text-neon-a/90">www.gegevensbeschermingsautoriteit.be</a></p>
  </section>

  <section class="mb-10">
    <h2 class="text-xl font-semibold mb-3 text-text-primary">13. Children</h2>
    <p class="text-sm">
      FAS Agent is a professional platform. It does not knowingly process personal data of persons under the age of 16. If FAS Agent becomes aware that personal data of a person under 16 has been collected, it will take steps to delete that data promptly. Enterprise Controllers are responsible for ensuring engineer accounts are not created for persons under 16.
    </p>
  </section>

  <section class="mb-10">
    <h2 class="text-xl font-semibold mb-3 text-text-primary">14. Changes to This Privacy Policy</h2>
    <p class="mb-3 text-sm">FAS Agent may update this Privacy Policy from time to time. For material changes:</p>
    <ul class="list-disc ml-6 mb-3 text-sm space-y-1">
      <li>Enterprise Controllers are notified by email at least <strong>[CUSTOMIZE: e.g., 30 days]</strong> before the change takes effect.</li>
      <li>Solo engineers are notified via the PWA and/or WhatsApp at least <strong>[CUSTOMIZE: e.g., 30 days]</strong> before the change takes effect.</li>
      <li>Where changes affect consent-based processing, renewed consent is obtained as required by law.</li>
    </ul>
    <p class="text-sm text-text-secondary">Continued use of the platform after the effective date constitutes acceptance of the updated policy, except where renewed consent is legally required.</p>
  </section>

  <section class="mb-10">
    <h2 class="text-xl font-semibold mb-3 text-text-primary">15. Complaints — Supervisory Authority</h2>
    <p class="mb-3 text-sm">If you believe that the processing of your personal data infringes GDPR or Belgian data protection law, you have the right to lodge a complaint with the Belgian supervisory authority:</p>
    <div class="bg-white/5 border border-white/10 rounded p-4 text-sm space-y-1">
      <p class="font-semibold text-text-primary">Autorité de protection des données (APD) / Gegevensbeschermingsautoriteit (GBA)</p>
      <p>Rue de la Presse 35 / Drukpersstraat 35, 1000 Brussels, Belgium</p>
      <p>Telephone: +32 (0)2 274 48 00</p>
      <p>Email: <a href="mailto:contact@apd-gba.be" class="text-neon-a underline hover:text-neon-a/90">contact@apd-gba.be</a></p>
      <p>Website: <a href="https://www.gegevensbeschermingsautoriteit.be" class="text-neon-a underline hover:text-neon-a/90">www.gegevensbeschermingsautoriteit.be</a></p>
    </div>
    <p class="mt-3 text-sm text-text-secondary">We encourage you to contact us first at the address in §1 so that we may attempt to resolve your concern before a supervisory authority complaint is lodged.</p>
  </section>

  <hr class="border-white/10 mt-10 mb-4" />
  <p class="text-xs text-text-muted">FAS Agent Privacy Policy v1.0 — [CUSTOMIZE: effective date] — Governed by Belgian law — Jurisdiction: Brussels</p>
</div>
`.trim();

  return { content };
}
