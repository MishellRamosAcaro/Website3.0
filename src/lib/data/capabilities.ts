export interface CapabilityItem {
  id: string
  title: string
  description: string
  icon: string
  detail?: string
}

export const capabilities: CapabilityItem[] = [
  {
    id: 'support-24-7',
    title: '24/7 Technical Support',
    description: 'Always available for your sales team.',
    icon: 'pi pi-headphones',
    detail:
      'Your team gets instant technical answers at any time. No more waiting for business hours—the AI FAS is there around the clock to resolve product questions, troubleshooting, and escalation paths.',
  },
  {
    id: 'real-time-intel',
    title: 'Real-Time Intelligence',
    description: 'Understands and directs conversations as they happen.',
    icon: 'pi pi-bolt',
    detail:
      'Context-aware understanding of live conversations helps guide reps with the right next steps, suggested answers, and escalation triggers—all in real time during customer calls.',
  },
  {
    id: 'document-access',
    title: 'Instant Document Access',
    description: 'Relevant documents suggested in real-time during calls.',
    icon: 'pi pi-file',
    detail:
      'The agent surfaces the right docs, specs, and playbooks at the right moment—so your team can answer with accuracy and close deals faster without leaving the conversation.',
  },
]
