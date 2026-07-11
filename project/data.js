// Shared content for ThriveClip pages. Plain data module — no JSX/UI here.

export const PAGES = {
  home: 'Home.dc.html',
  services: 'Services.dc.html',
  portfolio: 'Portfolio.dc.html',
  about: 'About.dc.html'
};

export const NAV_LINKS = [
  { label: 'Home', href: PAGES.home, key: 'home' },
  { label: 'Services', href: PAGES.services, key: 'services' },
  { label: 'Portfolio', href: PAGES.portfolio, key: 'portfolio' },
  { label: 'About', href: PAGES.about, key: 'about' },
  { label: 'Contact', href: PAGES.home + '#contact', key: 'contact' }
];

export const LOGO_ROW = ['LUMEN', 'Vertex', 'Northwind', 'Halcyon', 'BloomKit', 'Orbit Media', 'Cascade', 'Everline', 'Nomad&Co', 'Studio Ora', 'Kindred', 'Aperture'];

const ic = (p) => ({ __html: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#E0A65A" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">${p}</svg>` });
const sc = (p) => ({ __html: `<svg width="18" height="18" viewBox="0 0 24 24" fill="rgba(244,239,231,.8)">${p}</svg>` });

export const SERVICES = [
  { num: '01', title: 'Social Media Content', desc: 'Scroll-stopping posts, stories, and campaigns engineered for reach and saves.', bullets: ['Platform-native post design', 'Story & carousel systems', 'Monthly content calendar'], icon: ic('<rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="3.5"/><circle cx="17" cy="7" r="1"/>'), delay: 0 },
  { num: '02', title: 'Meta & Facebook Ads', desc: 'Full-funnel paid social that turns attention into pipeline and revenue.', bullets: ['Funnel & audience strategy', 'Creative testing at scale', 'Weekly spend optimization'], icon: ic('<path d="M3 17l5-5 4 3 6-8"/><path d="M18 7h3v3"/>'), delay: 70 },
  { num: '03', title: 'Reels & Short-Form Editing', desc: 'Punchy vertical edits tuned for retention, shares, and follower growth.', bullets: ['Hook-first pacing', 'Caption & sound design', 'A/B thumbnail variants'], icon: ic('<rect x="6" y="2.5" width="12" height="19" rx="3"/><path d="M10 9l5 3-5 3z" fill="#E0A65A" stroke="none"/>'), delay: 140 },
  { num: '04', title: 'YouTube Video Editing', desc: 'Long-form storytelling and pacing that keeps viewers watching to the end.', bullets: ['Narrative structure & pacing', 'Color grade & sound mix', 'Chapter markers & SEO copy'], icon: ic('<rect x="2" y="5" width="20" height="14" rx="4"/><path d="M10 9l5 3-5 3z" fill="#E0A65A" stroke="none"/>'), delay: 0 },
  { num: '05', title: 'Thumbnails, Subtitles & Motion', desc: 'Click-worthy packaging and kinetic graphics that lift every metric.', bullets: ['Custom thumbnail design', 'Animated captions', 'Kinetic typography & lower-thirds'], icon: ic('<rect x="3" y="4" width="18" height="12" rx="2.5"/><path d="M7 20h10"/><path d="M7 8h5"/>'), delay: 70 },
  { num: '06', title: 'Ad Campaign Management', desc: 'Testing, scaling, and optimizing spend for the best possible ROAS.', bullets: ['Cross-platform media buying', 'Creative + copy testing', 'Reporting & ROAS reviews'], icon: ic('<path d="M12 3v18"/><path d="M5 8l7-5 7 5"/><circle cx="12" cy="15" r="3.5"/>'), delay: 140 }
];

export const FILTER_LIST = ['All', 'Short Form', 'YouTube', 'Commercial Ads', 'Motion Graphics', 'Social Campaigns'];
const g = (a, b) => `linear-gradient(160deg,${a},${b})`;
export const WORK = [
  { title: 'Founder Reels Series', cat: 'Short Form', client: 'BloomKit', metric: '+412%', metricLabel: 'reach', bg: g('#3a2d55', '#1a1526'), h: 300 },
  { title: 'SaaS Launch Ad', cat: 'Commercial Ads', client: 'Vertex', metric: '3.8x', metricLabel: 'ROAS', bg: g('#5a3a2a', '#231712'), h: 230 },
  { title: 'Channel Rebuild', cat: 'YouTube', client: 'Northwind', metric: '+60k', metricLabel: 'subs', bg: g('#26414a', '#111d22'), h: 340 },
  { title: 'Kinetic Brand Loop', cat: 'Motion Graphics', client: 'Halcyon', metric: '2.1M', metricLabel: 'plays', bg: g('#4a2f45', '#1e1420'), h: 250 },
  { title: 'DTC Campaign Q4', cat: 'Social Campaigns', client: 'Cascade', metric: '+28%', metricLabel: 'CVR', bg: g('#42472a', '#1c1e12'), h: 310 },
  { title: 'Podcast Clips Engine', cat: 'Short Form', client: 'Kindred', metric: '9.4M', metricLabel: 'views', bg: g('#2c3b55', '#131a26'), h: 230 },
  { title: 'Product Film', cat: 'Commercial Ads', client: 'Everline', metric: '+190%', metricLabel: 'CTR', bg: g('#553a2c', '#241813'), h: 330 },
  { title: 'Explainer Motion Set', cat: 'Motion Graphics', client: 'Aperture', metric: '1.6M', metricLabel: 'reach', bg: g('#354a3d', '#151f19'), h: 250 },
  { title: 'Creator Growth Sprint', cat: 'Social Campaigns', client: 'Studio Ora', metric: '+85%', metricLabel: 'engagement', bg: g('#453055', '#1c1524'), h: 290 }
];

export const PROCESS = [
  { num: '01', title: 'Discovery Call', desc: 'We learn your goals, audience, and voice — then map where video can move the needle.', icon: ic('<path d="M4 5a2 2 0 012-2h2l2 4-2 1a11 11 0 005 5l1-2 4 2v2a2 2 0 01-2 2A16 16 0 014 5z"/>'), delay: 0 },
  { num: '02', title: 'Content Strategy', desc: 'A tailored content system: formats, hooks, cadence, and a 30-day production plan.', icon: ic('<path d="M4 6h16M4 12h10M4 18h7"/><circle cx="18" cy="15" r="3"/>'), delay: 90 },
  { num: '03', title: 'Production & Editing', desc: 'Our team produces and edits premium video — thumbnails, captions, and motion included.', icon: ic('<rect x="2" y="5" width="20" height="14" rx="3"/><path d="M9 9l5 3-5 3z" fill="#E0A65A" stroke="none"/>'), delay: 180 },
  { num: '04', title: 'Growth & Optimization', desc: 'We track performance and iterate on what works — compounding your results every month.', icon: ic('<path d="M3 17l5-5 4 3 6-8"/><path d="M18 7h3v3"/>'), delay: 270 }
];

export const VALUES = ['Premium quality', 'On-time, always', 'Data-driven', 'Creator-first'];

export const STATS = [
  { value: 500, suffix: '+', decimals: 0, label: 'Videos delivered', delay: 0 },
  { value: 120, suffix: 'M+', decimals: 0, label: 'Views generated', delay: 90 },
  { value: 60, suffix: '+', decimals: 0, label: 'Brands scaled', delay: 180 },
  { value: 4.9, suffix: '', decimals: 1, label: 'Avg client rating', delay: 270 }
];

export const TEAM = [
  { name: 'Rohan Vashisht', role: 'Founder & Creative Director', initials: 'RV', color: g('#E0A65A', '#8a6a2f') },
  { name: 'Simran Kaur', role: 'Head of Production', initials: 'SK', color: g('#6a5acd', '#2a2350') },
  { name: 'Aditya Rathore', role: 'Paid Media Lead', initials: 'AR', color: g('#3aa88a', '#155040') },
  { name: 'Meher Chawla', role: 'Motion Design Lead', initials: 'MC', color: g('#c85a6a', '#5a2030') }
];

export const TESTIMONIALS = [
  { quote: 'They turned our founder into a recognizable voice — leads now come in warm.', name: 'Aria Mehta', role: 'CEO, BloomKit', result: '+412%', resultLabel: 'reach', avatar: g('#E0A65A', '#8a6a2f') },
  { quote: 'The most reliable creative partner we\u2019ve had. Premium output, zero babysitting.', name: 'Daniel Cole', role: 'Head of Growth, Vertex', result: '3.8x', resultLabel: 'ROAS', avatar: g('#6a5acd', '#2a2350') },
  { quote: 'We shipped 4x more content in half the time. Our channel finally took off.', name: 'Priya Rao', role: 'Creator, 480k subs', result: '+60k', resultLabel: 'subs', avatar: g('#3aa88a', '#155040') },
  { quote: 'Every deliverable felt handcrafted. The motion graphics are next level.', name: 'Marcus Lang', role: 'CMO, Northwind', result: '2.1M', resultLabel: 'plays', avatar: g('#c85a6a', '#5a2030') }
];

export const BOOKING_PERKS = ['Free 30-minute strategy session', 'A custom content growth roadmap', 'No pressure, no obligation'];
export const BOOKING_DAYS = [{ dow: 'MON', date: '07' }, { dow: 'TUE', date: '08' }, { dow: 'WED', date: '09' }, { dow: 'THU', date: '10' }];
export const BOOKING_SLOTS = ['9:00 AM', '10:30 AM', '12:00 PM', '2:00 PM', '3:30 PM', '5:00 PM'];

export const SOCIALS = [
  { name: 'Instagram', href: '#', icon: sc('<path d="M12 2c2.7 0 3 0 4.1.1 1 0 1.7.2 2.3.5.6.2 1 .5 1.5 1s.8.9 1 1.5c.3.6.4 1.3.5 2.3.1 1.1.1 1.4.1 4.1s0 3-.1 4.1c0 1-.2 1.7-.5 2.3a4 4 0 01-1 1.5 4 4 0 01-1.5 1c-.6.3-1.3.4-2.3.5-1.1.1-1.4.1-4.1.1s-3 0-4.1-.1c-1 0-1.7-.2-2.3-.5a4 4 0 01-1.5-1 4 4 0 01-1-1.5c-.3-.6-.4-1.3-.5-2.3C2 15 2 14.7 2 12s0-3 .1-4.1c0-1 .2-1.7.5-2.3a4 4 0 011-1.5 4 4 0 011.5-1c.6-.3 1.3-.4 2.3-.5C9 2 9.3 2 12 2zm0 5a5 5 0 100 10 5 5 0 000-10zm0 2a3 3 0 110 6 3 3 0 010-6zm5.5-2.8a1.2 1.2 0 100 2.4 1.2 1.2 0 000-2.4z"/>') },
  { name: 'YouTube', href: '#', icon: sc('<path d="M23 12s0-3.3-.4-4.8a2.5 2.5 0 00-1.8-1.8C19.3 5 12 5 12 5s-7.3 0-8.8.4A2.5 2.5 0 001.4 7.2C1 8.7 1 12 1 12s0 3.3.4 4.8a2.5 2.5 0 001.8 1.8C4.7 19 12 19 12 19s7.3 0 8.8-.4a2.5 2.5 0 001.8-1.8C23 15.3 23 12 23 12zM10 15V9l5 3z"/>') },
  { name: 'LinkedIn', href: '#', icon: sc('<path d="M4.98 3.5a2.5 2.5 0 11-.02 5 2.5 2.5 0 01.02-5zM3 9h4v12H3zM10 9h3.8v1.7h.05c.53-1 1.8-2 3.7-2 4 0 4.7 2.6 4.7 6V21h-4v-5.3c0-1.3 0-3-1.8-3s-2.1 1.4-2.1 2.9V21h-4z"/>') }
];
