/**
 * Timeline Data
 * =============
 * Your beautiful love story journey.
 */

export interface TimelineEvent {
    date: string;
    title: string;
    description: string;
    icon?: string;
}

export const timelineData: TimelineEvent[] = [
    {
        date: "November 30, 2024",
        title: "The Day We Met",
        description: "Two strangers connected on an anonymous website. A simple hello that would change everything. Little did we know, this random encounter was the beginning of our forever.",
        icon: "Sparkles"
    },
    {
        date: "December 3, 2024",
        title: "When I Started Falling",
        description: "Something shifted in my heart. I couldn't stop thinking about you. Every message, every word from you made me feel things I hadn't felt before.",
        icon: "Heart"
    },
    {
        date: "December 4, 2024",
        title: "First Time Hearing Your Voice",
        description: "The moment I heard your voice for the first time... my heart skipped a beat. Your voice was even more beautiful than I had imagined.",
        icon: "MessageCircle"
    },
    {
        date: "December 5, 2024",
        title: "I Proposed",
        description: "I couldn't hold it in anymore. I told you how I felt and asked you to be mine. You asked for more time, and I was willing to wait forever.",
        icon: "Heart"
    },
    {
        date: "December 6, 2024",
        title: "Our First Long Call",
        description: "We talked for 3 hours and 36 minutes. Time flew by like minutes. Every second with you felt magical, like the world stopped just for us.",
        icon: "Phone"
    },
    {
        date: "December 6, 2024 - Night",
        title: "I Saw You For The First Time",
        description: "That first video call... I asked for 5 seconds but it lasted a minute. The moment I saw your face, I was completely lost in you. You were more beautiful than my dreams.",
        icon: "Camera"
    },
    {
        date: "December 7, 2024",
        title: "You Taught Me",
        description: "You taught me how to fix the pad for the first time. Such a simple thing, but it meant everything coming from you. That night we got closer than ever.",
        icon: "Sparkles"
    },
    {
        date: "December 8, 2024",
        title: "Our Promises",
        description: "We made promises to each other, like the sacred seven vows of a Hindu marriage. We set our rules, our boundaries, our forever. This was our beginning.",
        icon: "Crown"
    },
    {
        date: "December 9, 2024",
        title: "The Jealousy",
        description: "You told me about your past interactions and I felt a storm of emotions. I cried that day. But you understood, and at midnight you consoled me with so much love.",
        icon: "Cloud"
    },
    {
        date: "December 10, 2024 - 1:00 AM",
        title: "The Panic",
        description: "You went offline suddenly. I lost my mind. I thought your parents caught you. I wrote messages to your parents saying it wasn't your fault. My heart was racing...",
        icon: "AlertCircle"
    },
    {
        date: "December 10, 2024 - 2:42 AM",
        title: "You Said 'I Love You' ❤️",
        description: "You came back online. You saw my panic, my love, my fear of losing you. And then... at 2:42 AM, you said those three magical words: 'I Love You'. My world changed forever.",
        icon: "Heart"
    },
    {
        date: "December 10, 2024 - 2:58 PM",
        title: "We Became Official",
        description: "On a call that afternoon, we both proposed to each other and said yes. We officially became each other's. This is our anniversary day. The day our forever began.",
        icon: "PartyPopper"
    },
    {
        date: "December 10, 2025",
        title: "One Year of Love ✨",
        description: "365 days of loving you. Through screens and miles, through laughter and tears, through everything. And this is just the beginning of our forever story.",
        icon: "Gift"
    }
];

export default timelineData;
