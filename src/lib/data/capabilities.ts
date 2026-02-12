export interface SubCardItem {
  title: string
  items: string[]
}

export interface CapabilityItem {
  id: string
  title: string
  description: string
  icon: string
  detail?: string
  expandSectionTitle?: string
  expandIcon?: string
  subCards?: SubCardItem[]
}

export const capabilities: CapabilityItem[] = [
  {
    id: 'support-24-7',
    title: '24/7 Technical Support',
    description: 'Always available for your sales team.',
    icon: 'pi pi-clock',
    detail:
      'Your team gets instant technical answers at any time. No more waiting for business hours—the AI FAS is there around the clock to resolve product questions, troubleshooting, and escalation paths.',
    expandSectionTitle: 'Always Available, Never Tires',
    expandIcon: '',
    subCards: [
      {
        title: '24/7 Technical Support for Sales Team',
        items: [
          'Your sales team gets instant technical assistance whenever they need it, regardless of time zone or working hours',
          'No more waiting for business hours or scheduling support calls',
          'Immediate answers during critical customer conversations',
        ],
      },
      {
        title: 'Commercial Support for FAS Team',
        items: [
          'Your Field Application Specialists have a dedicated assistant for commercial queries',
          'Reduces workload on technical teams',
          'Enables faster response times to sales inquiries',
        ],
      },
      {
        title: 'Available When You Need It',
        items: [
          'No time limits, no restrictions',
          'Works across all time zones',
          'Always ready for the next conversation',
        ],
      },
    ],
  },
  {
    id: 'real-time-intel',
    title: 'Real-Time Intelligence',
    description: 'Understands and directs conversations as they happen.',
    icon: 'pi pi-bolt',
    detail:
      'Context-aware understanding of live conversations helps guide reps with the right next steps, suggested answers, and escalation triggers—all in real time during customer calls.',
    expandSectionTitle: 'Understands and Directs Conversations in Real-Time',
    expandIcon: '',
    subCards: [
      {
        title: 'Analyzes Conversations as They Happen',
        items: [
          'Listens to live conversations and processes context instantly',
          'Captures key technical terms, protocols, and requirements in real-time',
          'No post-call analysis needed - insights during the conversation',
        ],
      },
      {
        title: 'Automatically Identifies Crucial Questions',
        items: [
          'Detects when critical information is missing',
          'Suggests the right questions to ask at the right moment',
          'Prevents incomplete conversations that lead to errors',
        ],
      },
      {
        title: 'Directs Conversation Toward Closing the Sale',
        items: [
          'Guides sales agents through technical discussions',
          'Prioritizes questions that move deals forward',
          'Reduces sales cycle time by focusing on what matters',
        ],
      },
      {
        title: 'Significantly Reduces Sales Cycle',
        items: [
          'Faster qualification of opportunities',
          'Quicker identification of technical requirements',
          'Accelerated decision-making process',
        ],
      },
    ],
  },
  {
    id: 'document-access',
    title: 'Instant Document Access',
    description: 'Relevant documents suggested in real-time during calls.',
    icon: 'pi pi-file',
    detail:
      'The agent surfaces the right docs, specs, and playbooks at the right moment—so your team can answer with accuracy and close deals faster without leaving the conversation.',
    expandSectionTitle: 'Your Documents, Just When You Need Them',
    expandIcon: 'pi pi-bolt',
    subCards: [
      {
        title: 'Instant Access During Conversations',
        items: [
          'Relevant documents appear automatically as the conversation progresses',
          'No need to search or leave the call',
          "Documents are contextually matched to what's being discussed",
        ],
      },
      {
        title: 'Automatic Suggestions Based on Context',
        items: [
          'Understands conversation context to suggest the right documents',
          'Filters by equipment version, application type, and process phase',
          'Only shows what\'s relevant, reducing information overload',
        ],
      },
      {
        title: 'Verifiable and Versioned Documents',
        items: [
          'All documents are version-controlled',
          "Ensures you're always referencing the latest technical specifications",
          'Prevents errors from outdated documentation',
        ],
      },
      {
        title: 'No Interruptions - Everything in Real-Time',
        items: [
          'Seamless integration into your workflow',
          'Documents appear as suggestions, not interruptions',
          'Maintains conversation flow while providing support',
        ],
      },
    ],
  },
]
