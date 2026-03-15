/**
 * Composable that exposes the Terms of Service content as HTML for use in views.
 * Use with v-html inside a container that provides layout (e.g. prose, legal-doc).
 */
export function useTermsOfService() {
  const content = `
<div class="legal-doc p-8 max-w-4xl mx-auto text-text-secondary leading-relaxed">

  <h1 class="text-3xl font-bold mb-2 text-text-primary">Terms of Service — FAS Agent</h1>
  <p class="text-sm text-text-muted mb-1"><strong>Version:</strong> 1.0 — [CUSTOMIZE: effective date]</p>
  <p class="text-sm text-text-muted mb-1"><strong>Governing law:</strong> Belgian law | Jurisdiction: Courts of Brussels, Belgium</p>
  <p class="text-sm text-text-muted mb-6"><strong>Languages:</strong> English (authoritative); [CUSTOMIZE: add Dutch / French if applicable]</p>
  <hr class="border-white/10 mb-8" />

  <section class="mb-10">
    <h2 class="text-xl font-semibold mb-3 text-text-primary">1. Acceptance of Terms</h2>
    <p class="mb-3 text-sm">
      These Terms of Service (<strong>"Terms"</strong>) constitute a legally binding agreement between <strong>[CUSTOMIZE: FAS Agent legal entity name]</strong> (<strong>"FAS Agent"</strong>, "we", "us") and the party accessing or using the FAS Agent platform (the <strong>"User"</strong> or <strong>"Client"</strong>).
    </p>
    <p class="mb-3 text-sm">There are two categories of Users, both bound by these Terms:</p>
    <ul class="list-disc ml-6 mb-3 text-sm space-y-2">
      <li>
        <strong>Company Administrators (Enterprise tier):</strong> Representatives of a legal entity (the "Client company") who register the company, upload documents, and manage engineer accounts. By completing registration, the Company Administrator accepts these Terms on behalf of the Client company and warrants they have authority to bind the Client company. The Client company is the Data Controller for all enterprise engineer personal data.
      </li>
      <li>
        <strong>Field Engineers — Solo tier (self-registered):</strong> Individual engineers who register themselves on the platform without company involvement. By completing registration, the solo engineer accepts these Terms personally. FAS Agent is the Data Controller for solo engineer personal data. Solo engineers acknowledge that training consent is necessary for the AI model to learn and improve — without it, FAS Agent cannot guarantee AI service quality. See §5 and Privacy Policy §5.4.
      </li>
      <li>
        <strong>Field Engineers — Enterprise tier (company-provisioned):</strong> Engineers whose accounts are created by a Company Administrator. These engineers are bound by these Terms as a condition of platform access. The Company Administrator is responsible for ensuring enterprise engineers have been informed of and have accepted these Terms and the supplementary consent agreement (Annex B).
      </li>
    </ul>
    <p class="text-sm text-text-secondary italic">These Terms are to be read together with the Privacy Policy, which is incorporated by reference.</p>
  </section>

  <section class="mb-10">
    <h2 class="text-xl font-semibold mb-3 text-text-primary">2. Description of Service</h2>
    <p class="mb-3 text-sm">FAS Agent is an AI-powered technical knowledge assistant for field engineers, delivered via two channels:</p>
    <ul class="list-disc ml-6 mb-3 text-sm space-y-2">
      <li><strong>WhatsApp integration:</strong> Engineers send technical questions via WhatsApp and receive AI-generated answers. The platform also sends automated weekly quizzes and peer-validation broadcasts.</li>
      <li><strong>Progressive Web App (PWA):</strong> A browser-based application providing access to the knowledge base, answer history, engineer profile management, and consent settings.</li>
    </ul>
    <p class="mb-3 text-sm">The core technical architecture includes:</p>
    <ul class="list-disc ml-6 mb-3 text-sm space-y-1">
      <li>A <strong>Retrieval-Augmented Generation (RAG)</strong> system that retrieves relevant sections from uploaded technical documents to generate contextually accurate answers.</li>
      <li>A <strong>per-account fine-tuned Small Language Model (Qwen2.5-VL-3B)</strong> — one isolated model per solo engineer (solo tier) or per client company (enterprise tier) — trained exclusively on that account's validated knowledge and interactions.</li>
      <li>A <strong>confidence scoring system</strong> that weights engineer-validated answers using vote ratio, seniority weight, and recency.</li>
      <li>A <strong>weekly automated quiz</strong> delivered via WhatsApp to identify knowledge gaps and generate training data.</li>
    </ul>
    <p class="text-sm text-text-secondary">FAS Agent reserves the right to modify or update features with reasonable notice. Material changes are governed by §14.</p>
  </section>

  <section class="mb-10">
    <h2 class="text-xl font-semibold mb-3 text-text-primary">3. User Types and Roles</h2>
    <h3 class="font-semibold mb-2 text-text-primary">3.1 Company Administrator (Enterprise tier)</h3>
    <p class="mb-2 text-sm">The Company Administrator is responsible for:</p>
    <ul class="list-disc ml-6 mb-3 text-sm space-y-1">
      <li>Registering the company and managing the enterprise subscription.</li>
      <li>Uploading, maintaining, and removing technical documents from the knowledge base.</li>
      <li>Creating, editing, and deleting enterprise Field Engineer accounts, including provisioning and managing WhatsApp phone numbers on behalf of the company.</li>
      <li>Ensuring engineers have been informed of and have consented to data processing in accordance with GDPR and the Privacy Policy.</li>
      <li>Serving as the Data Controller and primary data subject rights contact for enterprise engineers.</li>
      <li>Ensuring compliance with WhatsApp Business API terms of service and applicable law.</li>
    </ul>
    <h3 class="font-semibold mb-2 text-text-primary">3.2 Field Engineer — Solo tier</h3>
    <p class="mb-2 text-sm">Solo engineers register themselves and are responsible for:</p>
    <ul class="list-disc ml-6 mb-3 text-sm space-y-1">
      <li>Providing their own WhatsApp phone number and maintaining its accuracy.</li>
      <li>Providing accurate self-declared experience and domain information.</li>
      <li>Acknowledging that training consent is necessary for the AI model to function effectively — without it, FAS Agent cannot guarantee the quality of the AI service (see Privacy Policy §5.4).</li>
      <li>Exercising their data subject rights directly with FAS Agent.</li>
    </ul>
    <h3 class="font-semibold mb-2 text-text-primary">3.3 Field Engineer — Enterprise tier</h3>
    <p class="mb-2 text-sm">Enterprise engineers have the right to:</p>
    <ul class="list-disc ml-6 mb-3 text-sm space-y-1">
      <li>Submit technical questions and receive AI-generated answers via WhatsApp and PWA.</li>
      <li>Participate in peer-validation broadcasts and weekly quizzes.</li>
      <li>Manage training consent settings at any time (withdrawal does not affect answer quality — see Privacy Policy §5.5).</li>
      <li>Exercise all GDPR data subject rights through the Company Administrator or directly with FAS Agent.</li>
    </ul>
  </section>

  <section class="mb-10">
    <h2 class="text-xl font-semibold mb-3 text-text-primary">4. Client Obligations</h2>
    <p class="mb-3 text-sm">By using the platform, each User and Client company agrees to the following:</p>
    <ul class="list-disc ml-6 mb-3 text-sm space-y-2">
      <li>
        <strong>Document accuracy and scope:</strong> Upload only technical documents that are directly relevant to field engineering operations — for example: equipment manuals, maintenance procedures, installation guides, safety datasheets, calibration protocols, and technical specifications. <strong>Non-technical documents, HR or employment-related documents, financial documents, legal contracts, and personal data documents must not be uploaded.</strong> The Client acknowledges that the quality of AI-generated answers depends on the quality and relevance of uploaded documents.
      </li>
      <li>
        <strong>Upload rights:</strong> Upload only documents that the Client company has the legal right to upload — either as owner of the intellectual property or as a licensed user with rights to use the content for this purpose.
      </li>
      <li>
        <strong>Phone number management (enterprise):</strong> Maintain accurate and current WhatsApp phone number records for enterprise Field Engineers. Immediately remove phone numbers of engineers who leave the company. The company administrator controls phone number provisioning on behalf of the company.
      </li>
      <li>
        <strong>Phone number accuracy (solo):</strong> Solo engineers are responsible for maintaining an accurate and active WhatsApp phone number. WhatsApp delivery is the primary service channel; provision of an inaccurate or inactive number may result in service suspension.
      </li>
      <li>
        <strong>WhatsApp Business API compliance (enterprise):</strong> Ensure use of the platform complies with Meta Platforms Inc.'s WhatsApp Business API terms of service, including messaging policies and opt-in requirements. The Client company is solely responsible for ensuring engineers have validly opted in to receive WhatsApp messages through the platform.
      </li>
      <li>
        <strong>Profile data accuracy:</strong> Ensure engineer profile data (experience declarations, professional domain) is accurately entered. Inaccurate profile data may affect seniority weight calculations and confidence scoring.
      </li>
      <li>
        <strong>GDPR compliance (enterprise):</strong> The Client company, as Data Controller, must maintain a lawful basis for all engineer data processing, issue appropriate privacy notices to engineers, and facilitate data subject rights requests.
      </li>
      <li>
        <strong>Acceptable use:</strong> Not use the platform for any unlawful purpose, to process special categories of personal data (Art. 9 GDPR) without a valid basis, or to circumvent the data isolation architecture.
      </li>
      <li>
        <strong>Account security:</strong> Maintain the confidentiality of credentials and promptly notify FAS Agent of any unauthorised access.
      </li>
    </ul>
  </section>

  <section class="mb-10">
    <h2 class="text-xl font-semibold mb-3 text-text-primary">5. AI-Generated Answer Disclaimer</h2>
    <div class="bg-amber-500/10 border border-amber-500/30 rounded p-4 mb-4 text-sm">
      <p class="font-semibold text-amber-400 mb-2">⚠️ Important — Read Carefully</p>
      <p class="text-text-secondary">All answers generated by FAS Agent are produced by an artificial intelligence system and are provided for informational and advisory purposes only.</p>
    </div>
    <ul class="list-disc ml-6 mb-3 text-sm space-y-2">
      <li><strong>Advisory only:</strong> AI-generated answers are not certified technical guidance, safety instructions, or professional engineering advice. They do not replace the judgment of a qualified engineer or the requirements of applicable technical standards, regulations, or manufacturer specifications.</li>
      <li><strong>Company responsibility for field safety:</strong> The Client company (enterprise tier) remains solely and fully responsible for all field safety decisions. No AI-generated answer from this platform absolves the Client company or its engineers of their professional, legal, or safety obligations.</li>
      <li><strong>Professional judgment required:</strong> Engineers must apply independent professional judgment to all AI-generated answers before acting on them. Critical technical information must be verified against primary sources before undertaking any safety-critical activity.</li>
      <li><strong>No warranty of accuracy:</strong> FAS Agent does not warrant the accuracy, completeness, fitness for purpose, or currency of any AI-generated answer. The knowledge base is only as current and accurate as the documents uploaded by the Client or the solo engineer.</li>
      <li><strong>AI labeling:</strong> All AI-generated answers are clearly labeled as such within the platform, in compliance with transparency obligations under the EU AI Act (Regulation (EU) 2024/1689).</li>
    </ul>
  </section>

  <section class="mb-10">
    <h2 class="text-xl font-semibold mb-3 text-text-primary">6. Intellectual Property</h2>
    <h3 class="font-semibold mb-2 text-text-primary">6.1 Platform Code and Architecture</h3>
    <p class="mb-3 text-sm">All software, code, architecture, algorithms, user interfaces, and technical infrastructure of FAS Agent are and remain the exclusive intellectual property of FAS Agent (or its licensors). No rights are granted to Users other than a limited, non-exclusive, non-transferable licence to use the platform during the subscription or account period.</p>
    <h3 class="font-semibold mb-2 text-text-primary">6.2 Uploaded Documents</h3>
    <p class="mb-3 text-sm">Uploaded technical documents remain the property of the Client company or solo engineer (or their licensors) at all times. FAS Agent acquires no ownership rights in uploaded documents. The Client or solo engineer grants FAS Agent a limited licence to process uploaded documents for the sole purpose of operating the platform services (RAG indexing, LLM enrichment, embedding generation) during the account or subscription term.</p>
    <h3 class="font-semibold mb-2 text-text-primary">6.3 Fine-Tuned Model Weights</h3>
    <p class="mb-3 text-sm">
      [CUSTOMIZE: Define ownership of per-account fine-tuned model weights. This applies to both solo engineer models and enterprise company models. Options include: (a) "Model weights are owned exclusively by the Client / solo engineer; FAS Agent holds a licence to operate them during the account term and provides a copy on request at termination." (b) "Model weights are owned jointly by FAS Agent and the Client / solo engineer with [CUSTOMIZE: split] and Client receives a copy on termination." (c) "Model weights are owned exclusively by FAS Agent; the Client has a right of exclusive use during the account term and no copy is provided on termination." Legal advice is strongly recommended. Note that for solo engineers, the model is trained entirely on their own personal data, which creates a stronger ownership claim argument in favour of the engineer under Belgian law.]
    </p>
    <h3 class="font-semibold mb-2 text-text-primary">6.4 Validated Knowledge Base Entries</h3>
    <p class="mb-3 text-sm">
      [CUSTOMIZE: Define ownership of validated knowledge base entries (polished JSON documents derived from engineer conversations and peer-validation). Recommended position: "Validated knowledge base entries derived from uploaded technical documents and engineer interactions are treated as confidential assets of the Client company (enterprise) or solo engineer (solo) and are subject to the data deletion obligations in §12."]
    </p>
    <h3 class="font-semibold mb-2 text-text-primary">6.5 Pre-Existing Proprietary Tools</h3>
    <p class="mb-3 text-sm">FAS Agent's pre-existing proprietary tools, pipeline scripts, keyword extraction methodology, embedding generation algorithms, confidence scoring formula, and all related intellectual property remain the exclusive property of FAS Agent regardless of how they are applied to Client or engineer data.</p>
  </section>

  <section class="mb-10">
    <h2 class="text-xl font-semibold mb-3 text-text-primary">7. Pricing and Payment</h2>
    <p class="mb-3 text-sm">FAS Agent is offered on a SaaS subscription basis for enterprise Clients, and on a [CUSTOMIZE: free / paid / freemium] basis for solo engineers.</p>
    <ul class="list-disc ml-6 mb-3 text-sm space-y-2">
      <li><strong>Enterprise subscription fees:</strong> [CUSTOMIZE: Describe pricing tiers — per-company flat fee, per-engineer-seat, tiered by document volume or API calls. Specify billing cycle: monthly / annual.]</li>
      <li><strong>Solo engineer pricing:</strong> [CUSTOMIZE: Free tier / paid tier / usage-based. Specify limits.]</li>
      <li><strong>External infrastructure costs:</strong> LLM API usage (Google Gemini, DeepSeek) and WhatsApp message delivery costs are billed separately at cost plus [CUSTOMIZE: markup] or at a fixed rate in the Order Form. These costs vary with usage volume.</li>
      <li><strong>Payment terms:</strong> Invoices are due within [CUSTOMIZE: e.g., 30 days] of invoice date. Late payment attracts interest at the statutory Belgian rate pursuant to the Act of 2 August 2002 on combating late payment in commercial transactions.</li>
      <li><strong>Taxes:</strong> All prices are exclusive of Belgian VAT (BTW/TVA) where applicable.</li>
      <li><strong>Price changes:</strong> FAS Agent may revise subscription prices with at least [CUSTOMIZE: e.g., 60 days] notice. Continued use after the effective date constitutes acceptance.</li>
    </ul>
  </section>

  <section class="mb-10">
    <h2 class="text-xl font-semibold mb-3 text-text-primary">8. Liability and Disclaimers</h2>
    <h3 class="font-semibold mb-2 text-text-primary">8.1 Limitation of Liability</h3>
    <p class="mb-3 text-sm">
      To the maximum extent permitted by applicable Belgian law, FAS Agent's total aggregate liability arising out of or in connection with these Terms (whether in contract, tort, or otherwise) is limited to the <strong>total fees paid by the Client or solo engineer in the twelve (12) months immediately preceding the event giving rise to the claim</strong>. For free-tier solo engineer accounts, liability is limited to EUR [CUSTOMIZE: e.g., 100].
    </p>
    <h3 class="font-semibold mb-2 text-text-primary">8.2 Exclusion for AI Answer Errors</h3>
    <p class="mb-3 text-sm">FAS Agent expressly excludes all liability for: (a) errors, inaccuracies, or omissions in AI-generated answers; (b) any decision made by an engineer or Client company in reliance on an AI-generated answer; (c) any accident, injury, property damage, or economic loss arising from field activities carried out on the basis of AI-generated answers. The Client company and solo engineer each accept full responsibility for their field safety decisions as set out in §5.</p>
    <h3 class="font-semibold mb-2 text-text-primary">8.3 Third-Party Platform Outages</h3>
    <p class="mb-3 text-sm">FAS Agent is not liable for any service interruption, data loss, or degradation caused by: outages of the WhatsApp Business API or Meta platforms; downtime of LLM API providers (Google Gemini, DeepSeek); failures of cloud hosting infrastructure; or any other third-party service dependency.</p>
    <h3 class="font-semibold mb-2 text-text-primary">8.4 Service Continuity — Solo Engineer Training Consent</h3>
    <p class="mb-3 text-sm">FAS Agent is not liable for any degradation or limitation of service quality resulting from a solo engineer's refusal or withdrawal of AI training consent. As described in Privacy Policy §5.4, training data is necessary for the AI model to learn and improve; without it, FAS Agent cannot guarantee the quality of the AI service for that account.</p>
    <h3 class="font-semibold mb-2 text-text-primary">8.5 Mandatory Protections</h3>
    <p class="text-sm text-text-secondary">Nothing in these Terms excludes or limits liability for death or personal injury caused by negligence, fraud, or any other liability that cannot be excluded under mandatory Belgian law.</p>
  </section>

  <section class="mb-10">
    <h2 class="text-xl font-semibold mb-3 text-text-primary">9. Data Processing Agreement (Art. 28 GDPR) — Enterprise Tier Only</h2>
    <p class="mb-3 text-sm">
      This section constitutes the Data Processing Agreement (<strong>"DPA"</strong>) between FAS Agent (Processor) and the Client company (Controller) for the processing of enterprise Field Engineer personal data. It applies exclusively to the enterprise service tier. For solo engineers, FAS Agent acts as Controller and no DPA is required.
    </p>
    <h3 class="font-semibold mb-2 text-text-primary">9.1 Roles</h3>
    <p class="mb-3 text-sm">The Client company is the <strong>data controller</strong> for all enterprise Field Engineer personal data. FAS Agent is the <strong>data processor</strong> acting on the Controller's documented instructions.</p>
    <h3 class="font-semibold mb-2 text-text-primary">9.2 Subject Matter and Purpose</h3>
    <p class="mb-3 text-sm">FAS Agent processes enterprise Field Engineer personal data for the sole purpose of providing the platform services described in §2, including: AI answer generation, confidence scoring, weekly quiz delivery, and AI model training (subject to engineer consent).</p>
    <h3 class="font-semibold mb-2 text-text-primary">9.3 Categories of Data Subjects and Personal Data</h3>
    <p class="mb-3 text-sm">As set out in Privacy Policy §3.</p>
    <h3 class="font-semibold mb-2 text-text-primary">9.4 Duration</h3>
    <p class="mb-3 text-sm">For the duration of the enterprise subscription term plus applicable retention periods (Privacy Policy §7).</p>
    <h3 class="font-semibold mb-2 text-text-primary">9.5 Processor Obligations (Art. 28(3) GDPR)</h3>
    <p class="mb-1 text-sm">FAS Agent as Processor undertakes to:</p>
    <ul class="list-disc ml-6 mb-3 text-sm space-y-1">
      <li>Process personal data only on documented instructions from the Controller, including with regard to international transfers (Art. 28(3)(a)).</li>
      <li>Ensure authorised personnel are bound by confidentiality obligations (Art. 28(3)(b)).</li>
      <li>Implement appropriate technical and organisational security measures as set out in Privacy Policy §10 (Art. 28(3)(c)).</li>
      <li>Respect the conditions for engaging sub-processors as set out in §9.6 (Art. 28(3)(d)).</li>
      <li>Assist the Controller in fulfilling data subject rights requests (Arts. 15–22 GDPR) (Art. 28(3)(e)).</li>
      <li>Assist the Controller with data breach notifications, DPIAs, and prior consultation obligations (Arts. 33–36 GDPR) (Art. 28(3)(f)).</li>
      <li>Delete or return all personal data at the end of the service relationship — see §12 for timelines (Art. 28(3)(g)).</li>
      <li>Make available information necessary to demonstrate compliance and allow for audits (Art. 28(3)(h)).</li>
    </ul>
    <h3 class="font-semibold mb-2 text-text-primary">9.6 Sub-Processors</h3>
    <p class="mb-3 text-sm">FAS Agent engages the sub-processors listed in Annex A. The Controller provides general written authorisation for these sub-processors. FAS Agent will notify the Controller of any intended changes with at least <strong>[CUSTOMIZE: e.g., 30 days]</strong> advance notice, giving the Controller the opportunity to object (Art. 28(2) GDPR).</p>
    <h3 class="font-semibold mb-2 text-text-primary">9.7 Audit Rights</h3>
    <p class="mb-3 text-sm">The Controller may request an audit of FAS Agent's data processing activities under this DPA no more than once per year. Audits may be conducted by the Controller or a mutually agreed third-party auditor, with at least [CUSTOMIZE: e.g., 30 days] advance notice and subject to confidentiality obligations. Audit costs are borne by the Controller unless the audit reveals material non-compliance.</p>
    <h3 class="font-semibold mb-2 text-text-primary">9.8 Processing Instructions</h3>
    <p class="text-sm text-text-secondary">The processing described in these Terms and the Privacy Policy constitutes the Controller's documented processing instructions. FAS Agent will promptly inform the Controller if any instruction infringes GDPR (Art. 28(3) final sentence).</p>
  </section>

  <section class="mb-10">
    <h2 class="text-xl font-semibold mb-3 text-text-primary">10. Confidentiality</h2>
    <p class="mb-3 text-sm">Each party agrees to keep confidential all Confidential Information of the other party. <strong>"Confidential Information"</strong> means all non-public information disclosed by one party to the other, including: technical documentation, model weights, knowledge base entries, engineer conversation data, pricing, business strategies, and the contents of these Terms.</p>
    <ul class="list-disc ml-6 mb-3 text-sm space-y-2">
      <li><strong>Model weights and knowledge base:</strong> Each Client company's or solo engineer's fine-tuned model weights and validated knowledge base are treated as that party's confidential assets. FAS Agent will not disclose them to any third party except as required to provide the services or as required by law.</li>
      <li><strong>Platform technology:</strong> Clients and engineers will not disclose FAS Agent's platform architecture, confidence scoring formula, or proprietary pipeline details to any competitor or third party without written consent.</li>
      <li><strong>Exclusions:</strong> Confidentiality obligations do not apply to publicly available information, information independently developed, or information that must be disclosed by law (with prompt notice where legally permissible).</li>
      <li><strong>Duration:</strong> Confidentiality obligations survive termination for [CUSTOMIZE: e.g., 5 years] from the date of disclosure.</li>
    </ul>
  </section>

  <section class="mb-10">
    <h2 class="text-xl font-semibold mb-3 text-text-primary">11. Suspension of Service</h2>
    <p class="mb-3 text-sm">FAS Agent may suspend access to the platform in the following circumstances:</p>
    <ul class="list-disc ml-6 mb-3 text-sm space-y-1">
      <li><strong>Non-payment:</strong> Subscription or account fees are overdue by more than [CUSTOMIZE: e.g., 14 days] after written notice.</li>
      <li><strong>Material Terms violation:</strong> A User is in material breach of these Terms and has not remedied the breach within [CUSTOMIZE: e.g., 10 business days] of written notice.</li>
      <li><strong>Training consent withdrawal (solo engineers):</strong> A solo engineer withdraws or refuses AI training consent, meaning FAS Agent can no longer guarantee AI service quality for that account — see Privacy Policy §5.4 and §8.4 of these Terms.</li>
      <li><strong>WhatsApp API suspension:</strong> Meta Platforms suspends WhatsApp API access. FAS Agent will notify the affected User promptly and is not liable for the resulting service disruption.</li>
      <li><strong>Security risk:</strong> FAS Agent reasonably believes an account poses an imminent security risk to the platform or other users; suspension may occur immediately with notice as soon as practicable.</li>
      <li><strong>Legal obligation:</strong> FAS Agent is required by law or a competent authority to suspend access.</li>
    </ul>
    <p class="text-sm text-text-secondary">Suspension does not relieve the Client of payment obligations for the suspension period.</p>
  </section>

  <section class="mb-10">
    <h2 class="text-xl font-semibold mb-3 text-text-primary">12. Termination and Data Deletion</h2>
    <h3 class="font-semibold mb-2 text-text-primary">12.1 Notice Period</h3>
    <p class="mb-3 text-sm">
      <strong>Enterprise Clients</strong> may terminate by providing [CUSTOMIZE: e.g., 30 days] written notice before the end of the current subscription period. <strong>Solo engineers</strong> may close their account at any time through the PWA or by written notice to FAS Agent. Termination for cause (material breach, insolvency, or persistent non-payment) may be immediate upon written notice after any applicable cure period.
    </p>
    <h3 class="font-semibold mb-2 text-text-primary">12.2 Data Export Before Deletion</h3>
    <p class="mb-3 text-sm">From the date notice of termination is given until the termination effective date, the Client company or solo engineer may export the following data in machine-readable format (JSON or CSV):</p>
    <ul class="list-disc ml-6 mb-3 text-sm space-y-1">
      <li>Validated knowledge base entries (polished JSON documents).</li>
      <li>Engineer profile data.</li>
      <li>Conversation history (subject to GDPR data portability rights — Art. 20 GDPR).</li>
      <li>Uploaded technical documents (original files).</li>
      <li>Fine-tuned model weights — [CUSTOMIZE: availability and format subject to IP ownership clause selected in §6.3].</li>
    </ul>
    <h3 class="font-semibold mb-2 text-text-primary">12.3 Post-Termination Deletion Timeline</h3>
    <p class="mb-3 text-sm">Following the termination effective date, FAS Agent will:</p>
    <ul class="list-disc ml-6 mb-3 text-sm space-y-1">
      <li><strong>Within 30 days:</strong> Delete or anonymise uploaded documents, engineer profiles, and conversation history from live systems.</li>
      <li><strong>Within 60 days:</strong> Delete the fine-tuned model weights and knowledge base from all systems, including backups.</li>
      <li><strong>Within 90 days:</strong> Confirm deletion in writing to the Controller or solo engineer (Art. 28(3)(g) GDPR for enterprise tier).</li>
      <li><strong>Retained data:</strong> FAS Agent may retain billing records for 7 years under Belgian accounting law, and anonymised, non-personally-identifiable platform performance metrics.</li>
    </ul>
    <h3 class="font-semibold mb-2 text-text-primary">12.4 Effect on Engineers at Enterprise Termination</h3>
    <p class="text-sm text-text-secondary">On enterprise contract termination, all engineer WhatsApp connections are deactivated and PWA access is revoked. The Client company remains responsible for notifying engineers of the termination and its data implications.</p>
  </section>

  <section class="mb-10">
    <h2 class="text-xl font-semibold mb-3 text-text-primary">13. Applicable Law and Jurisdiction</h2>
    <p class="mb-3 text-sm">These Terms and any dispute arising out of or in connection with them (including non-contractual disputes) are governed exclusively by <strong>Belgian law</strong>, without regard to conflict of law principles.</p>
    <p class="text-sm">The parties submit to the exclusive jurisdiction of the <strong>courts of Brussels, Belgium</strong>. FAS Agent may seek injunctive or other equitable relief in any competent jurisdiction to protect its intellectual property or confidential information.</p>
  </section>

  <section class="mb-10">
    <h2 class="text-xl font-semibold mb-3 text-text-primary">14. Changes to These Terms</h2>
    <p class="mb-3 text-sm">FAS Agent may update these Terms from time to time. For material changes:</p>
    <ul class="list-disc ml-6 mb-3 text-sm space-y-1">
      <li>Enterprise Company Administrators are notified by email at least <strong>[CUSTOMIZE: e.g., 30 days]</strong> before the change takes effect.</li>
      <li>Solo engineers are notified via the PWA and/or WhatsApp at least <strong>[CUSTOMIZE: e.g., 30 days]</strong> before the change takes effect.</li>
      <li>The version number and effective date at the top of this document are updated accordingly.</li>
    </ul>
    <p class="text-sm text-text-secondary">Continued use after the effective date constitutes acceptance. Enterprise Clients who do not accept updated Terms may terminate in accordance with §12.1 before the effective date.</p>
  </section>

  <hr class="border-white/10 my-10" />
  <section class="mb-10">
    <h2 class="text-2xl font-bold mb-4 text-text-primary">Annex A — Data Processing Agreement: Sub-Processor Table</h2>
    <p class="mb-4 text-sm">This table lists all sub-processors engaged by FAS Agent as at the effective date. Changes are subject to §9.6 notice requirements. This table applies to the enterprise tier (DPA). For the solo engineer tier, FAS Agent acts as Controller and these sub-processors operate under FAS Agent's own controller-to-processor agreements.</p>
    <div class="overflow-x-auto">
      <table class="w-full text-xs border-collapse border border-white/20">
        <thead class="bg-white/10 font-semibold text-text-primary">
          <tr>
            <td class="border border-white/20 p-2">Sub-Processor</td>
            <td class="border border-white/20 p-2">Role in Processing</td>
            <td class="border border-white/20 p-2">Data Transferred</td>
            <td class="border border-white/20 p-2">Storage Location</td>
            <td class="border border-white/20 p-2">Transfer Mechanism</td>
          </tr>
        </thead>
        <tbody class="text-text-secondary">
          <tr>
            <td class="border border-white/20 p-2"><strong>Google LLC</strong> — Gemini API</td>
            <td class="border border-white/20 p-2">LLM document enrichment and polishing (server-side pipeline)</td>
            <td class="border border-white/20 p-2">Uploaded technical document text content (may incidentally contain personal data if present in documents)</td>
            <td class="border border-white/20 p-2">United States</td>
            <td class="border border-white/20 p-2">SCCs — EU Commission Decision 2021/914; Google LLC participates in EU-U.S. Data Privacy Framework (adequacy, 10 July 2023)</td>
          </tr>
          <tr class="bg-white/5">
            <td class="border border-white/20 p-2"><strong>DeepSeek</strong> — DeepSeek API</td>
            <td class="border border-white/20 p-2">LLM document enrichment (multi-LLM agent pipeline)</td>
            <td class="border border-white/20 p-2">Uploaded technical document text content</td>
            <td class="border border-white/20 p-2">[CUSTOMIZE: confirm DeepSeek infrastructure location. Note: if China-based, enhanced transfer impact assessment (TIA) required per EDPB Recommendations 01/2020]</td>
            <td class="border border-white/20 p-2">SCCs — EU Commission Decision 2021/914 [CUSTOMIZE: verify current DPA with DeepSeek and document supplementary measures if China-based processing is confirmed]</td>
          </tr>
          <tr>
            <td class="border border-white/20 p-2"><strong>Evolution API / WhatsApp Business API</strong></td>
            <td class="border border-white/20 p-2">WhatsApp message routing — delivers AI answers, quizzes, and validation broadcasts; receives inbound engineer messages</td>
            <td class="border border-white/20 p-2">Engineer WhatsApp phone numbers; message content (questions, answers, quiz responses)</td>
            <td class="border border-white/20 p-2">[CUSTOMIZE: confirm Evolution API and Meta/WhatsApp infrastructure location]</td>
            <td class="border border-white/20 p-2">SCCs; also subject to Meta Platforms Inc. WhatsApp Business API terms [CUSTOMIZE: verify Meta transfer mechanism]</td>
          </tr>
          <tr class="bg-white/5">
            <td class="border border-white/20 p-2"><strong>[CUSTOMIZE: Cloud hosting provider]</strong><br/>e.g., AWS / Azure / GCP / OVHcloud / Scaleway</td>
            <td class="border border-white/20 p-2">Primary infrastructure — application servers, databases, document storage, model weights storage, backup systems</td>
            <td class="border border-white/20 p-2">All platform data at rest and in transit, including all personal data categories in Privacy Policy §3</td>
            <td class="border border-white/20 p-2">[CUSTOMIZE: EU data center region strongly preferred]</td>
            <td class="border border-white/20 p-2">[CUSTOMIZE: SCCs / adequacy / EU hosting (no transfer mechanism required if EEA-based)]</td>
          </tr>
          <tr class="bg-white/5">
            <td class="border border-white/20 p-2"><strong>[CUSTOMIZE: Additional LLM provider]</strong></td>
            <td class="border border-white/20 p-2">LLM processing — [CUSTOMIZE: describe role in pipeline, e.g., answer generation, document classification, or other enrichment task]</td>
            <td class="border border-white/20 p-2">Uploaded technical document content; [CUSTOMIZE: specify if engineer conversation data is also sent to this provider]</td>
            <td class="border border-white/20 p-2">[CUSTOMIZE: confirm infrastructure location and country]</td>
            <td class="border border-white/20 p-2">[CUSTOMIZE: SCCs (EU Commission Decision 2021/914) / adequacy decision / other — confirm with provider DPA]</td>
          </tr>
          <tr>
            <td class="border border-white/20 p-2"><strong>[CUSTOMIZE: Email / notification provider]</strong><br/>e.g., SendGrid / Mailgun / Brevo</td>
            <td class="border border-white/20 p-2">Transactional email delivery (account notifications, admin alerts)</td>
            <td class="border border-white/20 p-2">Administrator email addresses; notification content</td>
            <td class="border border-white/20 p-2">[CUSTOMIZE]</td>
            <td class="border border-white/20 p-2">[CUSTOMIZE: SCCs / adequacy]</td>
          </tr>
        </tbody>
      </table>
    </div>
    <p class="mt-3 text-sm text-text-secondary italic">Current version always available upon written request to [CUSTOMIZE: privacy@fasagent.com].</p>
  </section>

  <hr class="border-white/10 my-10" />
  <section class="mb-10">
    <h2 class="text-2xl font-bold mb-2 text-text-primary">Annex B — Multilingual AI Training Data Consent Agreement</h2>
    <p class="mb-3 text-sm text-text-secondary">
      This consent agreement is presented to Field Engineers before any use of their conversation data or quiz responses for AI model training. It must be presented, agreed to, and its acceptance recorded before training use commences. Consent records (who, when, which version) must be retained for the processing duration plus [CUSTOMIZE: e.g., 3 years] as evidence of compliance with Art. 7(1) GDPR.
    </p>
    <div class="bg-amber-500/10 border border-amber-500/30 rounded p-3 mb-6 text-sm">
      <p class="font-semibold text-amber-400 mb-1">⚠️ Tier-specific notice — must be included at point of consent collection</p>
      <p class="text-text-secondary">
        <strong>Solo engineers:</strong> This consent is necessary for the FAS Agent service to function effectively for your account. The AI model that answers your questions is trained exclusively on your own interactions. Without your training consent, the model cannot learn or improve, and FAS Agent cannot guarantee the quality of the AI service for your account.
      </p>
      <p class="text-text-secondary mt-2">
        <strong>Enterprise engineers:</strong> This consent is voluntary. Your company's AI model is trained on the collective knowledge of your engineering team. Refusing or withdrawing this consent has no effect on the quality of the answers you receive.
      </p>
    </div>

    <div class="border border-white/20 rounded-lg p-6 mb-6 bg-white/5">
      <div class="flex items-center gap-2 mb-4">
        <span class="text-lg font-bold">🇬🇧</span>
        <h3 class="text-lg font-bold text-text-primary">English — AI Training Data Consent Agreement</h3>
      </div>
      <p class="text-xs text-text-muted mb-4">Version 1.0 — [CUSTOMIZE: effective date] | FAS Agent — [CUSTOMIZE: company name]</p>
      <div class="space-y-3 text-sm">
        <p><strong>What this consent is about</strong></p>
        <p>FAS Agent uses an AI model to answer your technical questions. To make this AI model better over time, the platform uses data from your interactions — including your WhatsApp conversations and quiz responses — to train a dedicated AI model for your account or your company.</p>
        <p><strong>What we are asking your consent for</strong></p>
        <p>We are asking for your consent to use the following data to train the AI model assigned to your account or company:</p>
        <ul class="list-disc ml-6 space-y-1">
          <li>Your WhatsApp conversations with the platform (questions you asked and AI-generated answers).</li>
          <li>Your responses to weekly knowledge quizzes and your response times.</li>
          <li>Your peer-validation choices (when you select between two AI-generated answers).</li>
        </ul>
        <p><strong>Important things to know</strong></p>
        <ul class="list-disc ml-6 space-y-1">
          <li>Your data will only ever be used to train the AI model for your own account (solo) or your company (enterprise). It will never be shared with or used to train AI models of other accounts or companies.</li>
          <li>You can withdraw this consent at any time by contacting FAS Agent at [CUSTOMIZE: privacy@fasagent.com] or using the consent settings in the platform.</li>
          <li>Due to the way AI models work, past contributions to model training cannot be completely removed from existing model weights. Your data will be excluded from all future training cycles after withdrawal.</li>
          <li><strong>Enterprise engineers:</strong> Withdrawing consent does not affect the quality of AI answers you receive. The enterprise model is trained on your whole team's knowledge.</li>
          <li><strong>Solo engineers:</strong> The AI model is trained exclusively on your own data. Withdrawing consent means the model cannot learn or improve, and FAS Agent cannot guarantee the quality of the AI service for your account.</li>
          <li>This consent is governed by Belgian law and GDPR. You have the right to access, correct, and request deletion of your personal data. You have the right to lodge a complaint with the Belgian data protection authority (GBA) at <a href="https://www.gegevensbeschermingsautoriteit.be" class="text-neon-a underline hover:text-neon-a/90">www.gegevensbeschermingsautoriteit.be</a>.</li>
        </ul>
        <div class="mt-4 p-3 bg-white/5 border border-white/10 rounded">
          <p class="font-semibold mb-1 text-text-primary">Consent Declaration</p>
          <p>I confirm that I have read and understood this consent agreement. I freely give my consent for my WhatsApp conversation history, quiz responses, and validation choices to be used to train the AI model assigned to my account or company, subject to the conditions described above.</p>
          <p class="mt-2 text-xs text-text-secondary">☐ I consent to the use of my data for AI model training as described above.<br />☐ I do not consent. (I understand the service implications described above.)</p>
          <p class="mt-2 text-xs text-text-muted">Name: __________________ | Date: __________________ | [Recorded electronically]</p>
        </div>
      </div>
    </div>

    <div class="border border-white/20 rounded-lg p-6 mb-6 bg-white/5">
      <div class="flex items-center gap-2 mb-4">
        <span class="text-lg font-bold">🇧🇪</span>
        <h3 class="text-lg font-bold text-text-primary">Nederlands — Toestemmingsovereenkomst voor AI-trainingsdata</h3>
      </div>
      <p class="text-xs text-text-muted mb-4">Versie 1.0 — [AANPASSEN: ingangsdatum] | FAS Agent — [AANPASSEN: bedrijfsnaam]</p>
      <div class="space-y-3 text-sm">
        <p><strong>Waar gaat deze toestemming over?</strong></p>
        <p>FAS Agent maakt gebruik van een AI-model om uw technische vragen te beantwoorden. Om dit model voortdurend te verbeteren, gebruikt het platform gegevens van uw interacties — waaronder uw WhatsApp-gesprekken en quizreacties — voor het trainen van een AI-model dat specifiek is voor uw account of uw bedrijf.</p>
        <p><strong>Waarvoor vragen wij uw toestemming?</strong></p>
        <p>Wij vragen uw toestemming voor het gebruik van de volgende gegevens voor het trainen van het AI-model van uw account of bedrijf:</p>
        <ul class="list-disc ml-6 space-y-1">
          <li>Uw WhatsApp-gesprekken met het platform (gestelde vragen en door AI gegenereerde antwoorden).</li>
          <li>Uw antwoorden op de wekelijkse kennisquizzen en uw responstijden.</li>
          <li>Uw keuzes bij collegavalidatie (wanneer u een keuze maakt tussen twee door AI gegenereerde antwoorden).</li>
        </ul>
        <p><strong>Belangrijke informatie</strong></p>
        <ul class="list-disc ml-6 space-y-1">
          <li>Uw gegevens worden uitsluitend gebruikt voor het trainen van het AI-model van uw eigen account (solo) of uw bedrijf (enterprise). Ze worden nooit gedeeld met andere accounts of bedrijven.</li>
          <li>U kunt deze toestemming op elk moment intrekken via de toestemmingsinstellingen in het platform of via [AANPASSEN: privacy@fasagent.com].</li>
          <li>Vanwege de technische werking van AI-modellen kunnen eerdere bijdragen niet volledig worden verwijderd uit bestaande modelgewichten. Uw gegevens worden uitgesloten van alle toekomstige trainingsronden na intrekking.</li>
          <li><strong>Enterprise-medewerkers:</strong> Het intrekken van uw toestemming heeft geen invloed op de kwaliteit van de antwoorden die u ontvangt.</li>
          <li><strong>Solo-gebruikers:</strong> Het AI-model wordt uitsluitend getraind op uw eigen gegevens. Het intrekken van toestemming betekent dat het model niet meer kan leren en FAS Agent de kwaliteit van de AI-dienst voor uw account niet kan garanderen.</li>
          <li>U heeft het recht een klacht in te dienen bij de GBA via <a href="https://www.gegevensbeschermingsautoriteit.be" class="text-neon-a underline hover:text-neon-a/90">www.gegevensbeschermingsautoriteit.be</a>.</li>
        </ul>
        <div class="mt-4 p-3 bg-white/5 border border-white/10 rounded">
          <p class="font-semibold mb-1 text-text-primary">Toestemmingsverklaring</p>
          <p>Ik bevestig dat ik deze toestemmingsovereenkomst heb gelezen en begrepen. Ik geef vrijwillig mijn toestemming voor het gebruik van mijn gespreksgeschiedenis, quizantwoorden en validatiekeuzes voor het trainen van het AI-model van mijn account of bedrijf, onder de hierboven beschreven voorwaarden.</p>
          <p class="mt-2 text-xs text-text-secondary">☐ Ik geef toestemming voor het gebruik van mijn gegevens voor AI-modeltraining zoals hierboven beschreven.<br />☐ Ik geef geen toestemming. (Ik begrijp de hierboven beschreven gevolgen voor de dienstverlening.)</p>
          <p class="mt-2 text-xs text-text-muted">Naam: __________________ | Datum: __________________ | [Elektronisch geregistreerd]</p>
        </div>
      </div>
    </div>

    <div class="border border-white/20 rounded-lg p-6 mb-6 bg-white/5">
      <div class="flex items-center gap-2 mb-4">
        <span class="text-lg font-bold">🇪🇸</span>
        <h3 class="text-lg font-bold text-text-primary">Español — Acuerdo de Consentimiento para el Uso de Datos en el Entrenamiento de IA</h3>
      </div>
      <p class="text-xs text-text-muted mb-4">Versión 1.0 — [PERSONALIZAR: fecha de entrada en vigor] | FAS Agent — [PERSONALIZAR: nombre de la empresa]</p>
      <div class="space-y-3 text-sm">
        <p><strong>¿De qué trata este consentimiento?</strong></p>
        <p>FAS Agent utiliza un modelo de inteligencia artificial para responder sus preguntas técnicas. Para mejorar continuamente este modelo, la plataforma utiliza datos de sus interacciones — incluyendo sus conversaciones de WhatsApp y sus respuestas a los cuestionarios — para entrenar un modelo de IA dedicado a su cuenta o a su empresa.</p>
        <p><strong>¿Para qué solicitamos su consentimiento?</strong></p>
        <p>Solicitamos su consentimiento para utilizar los siguientes datos en el entrenamiento del modelo de IA de su cuenta o empresa:</p>
        <ul class="list-disc ml-6 space-y-1">
          <li>Sus conversaciones de WhatsApp con la plataforma (preguntas realizadas y respuestas generadas por IA).</li>
          <li>Sus respuestas a los cuestionarios de conocimiento semanales y sus tiempos de respuesta.</li>
          <li>Sus elecciones en la validación entre pares (cuando selecciona entre dos respuestas generadas por IA).</li>
        </ul>
        <p><strong>Información importante</strong></p>
        <ul class="list-disc ml-6 space-y-1">
          <li>Sus datos se utilizarán únicamente para entrenar el modelo de IA de su propia cuenta (solo) o de su empresa (enterprise). Nunca se compartirán con otras cuentas o empresas.</li>
          <li>Puede retirar este consentimiento en cualquier momento a través de la configuración de consentimiento en la plataforma o en [PERSONALIZAR: privacy@fasagent.com].</li>
          <li>Debido a la naturaleza del entrenamiento de modelos de IA, las contribuciones pasadas no pueden eliminarse completamente de los pesos del modelo existente. Sus datos serán excluidos de todos los ciclos de entrenamiento futuros tras la retirada.</li>
          <li><strong>Ingenieros enterprise:</strong> Retirar su consentimiento no afecta la calidad de las respuestas que recibe.</li>
          <li><strong>Usuarios solo:</strong> El modelo de IA se entrena exclusivamente con sus propios datos. Retirar el consentimiento significa que el modelo no puede aprender ni mejorar, y FAS Agent no puede garantizar la calidad del servicio de IA para su cuenta.</li>
          <li>Tiene derecho a presentar una reclamación ante la GBA en <a href="https://www.gegevensbeschermingsautoriteit.be" class="text-neon-a underline hover:text-neon-a/90">www.gegevensbeschermingsautoriteit.be</a>.</li>
        </ul>
        <div class="mt-4 p-3 bg-white/5 border border-white/10 rounded">
          <p class="font-semibold mb-1 text-text-primary">Declaración de Consentimiento</p>
          <p>Confirmo que he leído y comprendido este acuerdo de consentimiento. Doy libremente mi consentimiento para que mi historial de conversaciones de WhatsApp, mis respuestas a los cuestionarios y mis elecciones de validación sean utilizados para entrenar el modelo de IA asignado a mi cuenta o empresa, sujeto a las condiciones descritas anteriormente.</p>
          <p class="mt-2 text-xs text-text-secondary">☐ Consiento el uso de mis datos para el entrenamiento del modelo de IA según lo descrito.<br />☐ No consiento. (Comprendo las implicaciones para el servicio descritas anteriormente.)</p>
          <p class="mt-2 text-xs text-text-muted">Nombre: __________________ | Fecha: __________________ | [Registrado electrónicamente]</p>
        </div>
      </div>
    </div>
  </section>

  <hr class="border-white/10 mt-10 mb-4" />
  <p class="text-xs text-text-muted">FAS Agent Terms of Service v1.0 — [CUSTOMIZE: effective date] — Governed by Belgian law — Jurisdiction: Brussels — Including Annex A (DPA Sub-Processor Table) and Annex B (Multilingual AI Training Consent Agreement)</p>
</div>
`.trim()

  return { content }
}
