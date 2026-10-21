// Cloud Clarity — UI prototype. AI chat and semantic grading need a secure backend.
const CATS = {
  cloud: "Cloud Concepts",
  arch: "Azure Architecture and Services",
  gov: "Azure Management and Governance"
};

const D = [
  {
    id: "shared", cat: "cloud", t: "Shared responsibility model",
    kw: "security responsibility customer microsoft iaas paas saas",
    tr: "In the cloud, security and operations are split between the cloud provider and the customer. Microsoft is responsible for the physical datacenters, hosts and network it runs. You are always responsible for your own data, your accounts and identities, and who can access them. How much else you manage depends on the service type (IaaS, PaaS or SaaS).",
    re: "Renting a shop in a busy market building: the building owner looks after the structure, gate guards and main power. You decide who gets a key to your shop and who may touch your till.",
    dv: ["“Microsoft handles all security.”", "Not accurate. Data, identities and access are the customer’s responsibility in every service type."],
    ap: {
      q: "A clinic keeps patient records in an Azure service. Who is always responsible for deciding who may access those records?",
      o: ["Microsoft alone", "The clinic (the customer), using the tools Microsoft provides", "The patients’ mobile network provider"],
      a: 1,
      why: "Data and access control stay with the customer in every service type. Microsoft secures the underlying infrastructure but cannot decide who in your organisation should see your data."
    }
  },
  {
    id: "capex", cat: "cloud", t: "CapEx vs OpEx",
    kw: "capital operational expenditure cost pay as you go consumption upfront",
    tr: "Capital expenditure (CapEx) is upfront spending on physical assets you own, such as buying servers. Operational expenditure (OpEx) is paying for services as you use them. Cloud services are typically consumption-based, which shifts spending towards OpEx.",
    re: "Buying your own motorbike for deliveries costs a lot at the start. Paying a boda boda per trip costs nothing upfront and you pay only for rides you take.",
    dv: ["CapEx", "Large upfront purchase of assets you own and maintain."],
    dv2: ["OpEx", "Ongoing payment based on what you use, with no big upfront purchase."],
    ap: {
      q: "A startup does not want to buy servers. It prefers to pay monthly for the capacity it uses. Which spending model is this?",
      o: ["CapEx", "OpEx", "Neither; cloud is always free"],
      a: 1,
      why: "Paying for what you consume, with no upfront hardware purchase, is operational expenditure (OpEx)."
    }
  },
  {
    id: "scale", cat: "cloud", t: "Scalability",
    kw: "scale up out load demand capacity elasticity performance",
    tr: "Scalability is the ability to increase or decrease resources to handle changing workload. You can scale vertically (a bigger machine) or horizontally (more instances).",
    re: "A wedding caterer adds more cooks and pots when the guest list doubles, and sends them home after the event.",
    dv: ["Scalability vs high availability", "Scalability is about handling more or less demand. High availability is about staying up when something fails."],
    ap: {
      q: "An online shop slows down every salary day because thousands of shoppers arrive at once. Which concept most directly addresses this?",
      o: ["Scalability", "Resource locks", "Authentication"],
      a: 0,
      why: "The problem is changing demand, so the ability to add capacity when needed (scalability) is the relevant concept."
    }
  },
  {
    id: "ha", cat: "cloud", t: "High availability",
    kw: "uptime downtime failure redundancy sla resilient zones",
    tr: "High availability means designing a workload to stay available with minimal downtime, even if a component fails. A common approach is removing single points of failure, for example by running more than one instance in separate locations.",
    re: "A bus company keeps a spare bus and a standby driver so the route still runs if one bus breaks down.",
    dv: ["High availability vs scalability", "High availability protects against failure. Scalability responds to changing load. A bigger single server does not remove a single point of failure."],
    ap: {
      q: "An app runs on one server and goes offline whenever that server crashes. Which change best improves availability?",
      o: ["Make the single server larger", "Run copies of the app in separate locations", "Turn off monitoring"],
      a: 1,
      why: "Running multiple instances in separate locations removes the single point of failure. A larger single server is still one server."
    }
  },
  {
    id: "zones", cat: "arch", t: "Regions and Availability Zones",
    kw: "region geography datacenter zone redundancy paired disaster",
    tr: "An Azure region is a geographic area containing datacenters. Availability Zones are physically separate locations inside a region, each with independent power, cooling and networking. Regions that support zones have at least three. Zones help protect against a datacenter-level failure within a region.",
    re: "A region is like a city. Zones are separate neighbourhoods with their own power supply, so a blackout in one does not necessarily darken the others.",
    dv: ["Availability Zones vs region pairs", "Zones are separate locations within one region. Paired regions are two regions in the same geography that support wider disaster recovery planning."],
    ap: {
      q: "You want to survive the failure of one datacenter building while keeping your data inside the same region. What fits best?",
      o: ["Availability Zones", "A resource lock", "Azure Policy"],
      a: 0,
      why: "Availability Zones are separate physical locations within a region, so spreading across them protects against a single-location failure."
    }
  },
  {
    id: "blob", cat: "arch", t: "Azure Blob Storage",
    kw: "storage object unstructured images video files backup data lake",
    tr: "Azure Blob Storage is Microsoft’s object storage for large amounts of unstructured data, such as images, videos, documents and backups.",
    re: "A big warehouse of labelled boxes. You fetch a box by its label, rather than walking through office filing cabinets.",
    dv: ["Blob Storage vs Azure Files", "Azure Files provides managed file shares that machines can mount like a shared network drive. Blob Storage stores objects accessed by name or URL."],
    ap: {
      q: "A farmers’ co-op wants to store thousands of crop photos for a web app. Which storage service fits best?",
      o: ["Azure Blob Storage", "Microsoft Entra ID", "Azure Cost Management"],
      a: 0,
      why: "Photos are unstructured data, which Blob Storage is designed to hold. The other two are identity and billing tools, not storage."
    }
  },
  {
    id: "entra", cat: "arch", t: "Microsoft Entra ID",
    kw: "identity authentication authorization sign in mfa azure active directory login",
    tr: "Microsoft Entra ID is Microsoft’s cloud identity and access management service. It verifies who users are (authentication) and supports controlling what they can reach. It was previously called Azure Active Directory.",
    re: "A school gate guard checks your ID card before letting you in. Checking the card is like authentication.",
    dv: ["Authentication vs authorization", "Authentication asks “Who are you?” Authorization asks “What are you allowed to do?”"],
    ap: {
      q: "A staff member proves who they are with a password plus a code approved on their phone. What is this process?",
      o: ["Authentication", "Authorization", "Cost analysis"],
      a: 0,
      why: "Proving identity is authentication. Authorization comes after, deciding what the verified person may do."
    }
  },
  {
    id: "policy", cat: "gov", t: "Azure Policy",
    kw: "governance compliance rules standards audit deny region rbac role access permissions",
    tr: "Azure Policy lets you create and assign rules that resources must follow, evaluates whether resources comply, and can for example audit or deny non-compliant deployments.",
    re: "A company rule that every delivery van must carry the company logo, checked across the whole fleet.",
    dv: ["Azure Policy vs Azure RBAC", "Policy controls which resources and settings are allowed. Role-based access control (RBAC) controls what actions users can perform."],
    ap: {
      q: "An organisation wants to stop anyone from creating resources outside its approved regions. Which service enforces this kind of rule?",
      o: ["Azure Policy", "Azure Blob Storage", "Pricing calculator"],
      a: 0,
      why: "Restricting where resources can be created is a rule about resources, which is what Azure Policy is for."
    }
  },
  {
    id: "lock", cat: "gov", t: "Resource locks",
    kw: "delete accidental protect readonly cannotdelete governance",
    tr: "A resource lock can be applied to a subscription, resource group or resource to prevent accidental deletion or modification. The two lock types are CanNotDelete and ReadOnly. A lock applies regardless of a user’s role permissions.",
    re: "A padlock on the shop’s cash box: even a trusted employee must remove it first before anything is taken out.",
    dv: ["Resource locks vs RBAC", "RBAC decides who may act. A lock restricts the action itself, even for users who have permission."],
    ap: {
      q: "You want to stop anyone deleting a production database by mistake, while still allowing changes to it. Which lock type fits?",
      o: ["ReadOnly", "CanNotDelete", "Neither can do this"],
      a: 1,
      why: "CanNotDelete allows reading and modifying but blocks deletion. ReadOnly would also block changes."
    }
  },
  {
    id: "cost", cat: "gov", t: "Cost Management",
    kw: "budget spending billing pricing calculator alerts cost",
    tr: "Microsoft Cost Management tools help you monitor, analyse and control Azure spending, for example by reviewing usage and setting budgets and alerts. The pricing calculator is different: it estimates costs before you deploy.",
    re: "Watching your data bundle balance and getting a warning before it runs out.",
    dv: ["Pricing calculator vs Cost Management", "Pricing calculator estimates future cost of a planned design. Cost Management analyses actual spending."],
    ap: {
      q: "A team wants to estimate the monthly cost of a solution it has not built yet. Which tool is the best fit?",
      o: ["Cost Management reports", "Pricing calculator", "Resource locks"],
      a: 1,
      why: "Estimating cost before deployment is the pricing calculator’s job. Cost Management analyses spending that has already happened."
    }
  }
];
const P = [
  {
    h: "Scalability vs high availability",
    a: ["Scalability", "Adjusts capacity to match demand, up or down."],
    b: ["High availability", "Keeps the workload running when parts fail."],
    r: "Busy = scalability. Broken = high availability."
  },
  {
    h: "Azure Policy vs Azure RBAC",
    a: ["Azure Policy", "Rules for resources: what is allowed to exist and how it is configured."],
    b: ["Azure RBAC", "Permissions for people: what actions a user can take."],
    r: "Policy governs resources. RBAC governs users."
  },
  {
    h: "Pricing calculator vs Cost Management",
    a: ["Pricing calculator", "Estimates cost before you deploy."],
    b: ["Cost Management", "Analyses and controls actual spending after."],
    r: "Before = calculator. After = Cost Management."
  },
  {
    h: "Blob Storage vs Azure Files",
    a: ["Blob Storage", "Object storage for unstructured data, accessed by name or URL."],
    b: ["Azure Files", "Managed file shares you can mount like a network drive."],
    r: "Objects vs shared drive."
  }
];

const $ = (id) => document.getElementById(id);

const glossary = {
  CDN: {
    full: "Content Delivery Network",
    meaning: "A distributed network of servers that delivers content from locations closer to the user, helping it load faster.",
    example: "Like keeping popular goods in several local shops instead of making everyone travel to one warehouse."
  },
  RBAC: {
    full: "Role-Based Access Control",
    meaning: "A way to grant people permissions based on their role, such as reader, contributor, or administrator.",
    example: "Like giving a school prefect permission to take attendance but not edit the school budget."
  },
  IAM: {
    full: "Identity and Access Management",
    meaning: "The tools and processes used to manage identities and control access to resources.",
    example: "Like a school office checking who someone is and which rooms they are allowed to enter."
  },
  IaaS: {
    full: "Infrastructure as a Service",
    meaning: "A cloud service model where you rent computing infrastructure, such as virtual machines, and manage more of the software stack yourself.",
    example: "Like renting an empty shop space: the structure is provided, but you manage much of what goes inside."
  },
  PaaS: {
    full: "Platform as a Service",
    meaning: "A cloud model where the provider manages the underlying platform so you can focus more on building and running your application.",
    example: "Like renting a fitted kitchen so you can focus on cooking rather than installing every appliance."
  },
  SaaS: {
    full: "Software as a Service",
    meaning: "Software you use over the internet while the provider manages the application and underlying infrastructure.",
    example: "Like using a ready-made online service instead of building and maintaining the software yourself."
  },
  VM: {
    full: "Virtual Machine",
    meaning: "A software-based computer that runs an operating system and applications using virtualised hardware.",
    example: "Like having a separate computer inside a larger physical computer."
  },
  VNet: {
    full: "Virtual Network",
    meaning: "A logically isolated network in Azure where resources can communicate under configured network rules.",
    example: "Like a private road network connecting buildings in a secured campus."
  },
  MFA: {
    full: "Multifactor Authentication",
    meaning: "A sign-in method that requires two or more different kinds of proof of identity.",
    example: "Using a password plus an approval on your phone."
  },
  DNS: {
    full: "Domain Name System",
    meaning: "The system that translates human-readable domain names into information computers use to locate services, commonly IP addresses.",
    example: "Like a contacts list that matches a name to a phone number."
  },
  API: {
    full: "Application Programming Interface",
    meaning: "A defined way for software systems to request data or actions from one another.",
    example: "Like a waiter carrying a request from a customer to a kitchen and returning the result."
  },
  SLA: {
    full: "Service-Level Agreement",
    meaning: "A formal commitment describing expected service levels, such as availability, and what happens if commitments are missed.",
    example: "Like a written service promise with defined expectations."
  },
  CapEx: {
    full: "Capital Expenditure",
    meaning: "Upfront spending on assets you own, such as purchasing physical servers.",
    example: "Buying your own delivery motorbike."
  },
  OpEx: {
    full: "Operational Expenditure",
    meaning: "Ongoing spending for services as you use them, often without a large upfront asset purchase.",
    example: "Paying per delivery trip instead of buying the motorbike."
  },
  Azure: {
    full: "Microsoft Azure",
    meaning: "Microsoft’s cloud computing platform, offering services for computing, storage, networking, identity, analytics, and more.",
    example: "A collection of cloud services you can rent and configure instead of running everything in your own building."
  }
};

const SUG = [
  "Explain scalability like I’m a beginner",
  "Give me a Kenyan everyday example of Blob Storage",
  "Who is responsible for cloud security?",
  "What is the difference between Azure Policy and RBAC?",
  "Why do Availability Zones matter?",
  "Explain CapEx vs OpEx"
];

const stopWords = new Set(
  "what whats the and does how why vs explain mean azure difference between when should use need for are can you with about plain english tell who which this that from have into is of in to a an it on as".split(" ")
);

let currentView = "home";
let currentConcept = null;
let quizIndex = 0;
let quizScore = 0;
let xp = Number(localStorage.getItem("cc-xp") || 0);
let mastered = new Set(
  JSON.parse(localStorage.getItem("cc-mastered") || "[]")
);
let reviewQueue = new Map(
  JSON.parse(localStorage.getItem("cc-review-queue") || "[]")
    .filter(([id, item]) => D.some(d => d.id === id) && item && Number.isFinite(item.attempts))
    .map(([id, item]) => [id, {
      attempts: item.attempts,
      lastAttempt: Number.isFinite(item.lastAttempt) ? item.lastAttempt : 0
    }])
);

function persistReviewQueue() {
  localStorage.setItem("cc-review-queue", JSON.stringify([...reviewQueue]));
  renderHistory();
}

function recordMissedConcept(conceptId) {
  const existing = reviewQueue.get(conceptId);
  reviewQueue.set(conceptId, {
    attempts: (existing?.attempts || 0) + 1,
    lastAttempt: Date.now()
  });
  persistReviewQueue();
}

function resolveReviewedConcept(conceptId) {
  if (reviewQueue.delete(conceptId)) persistReviewQueue();
}

function nextReviewConcept() {
  const first = [...reviewQueue.entries()]
    .sort((a, b) => a[1].lastAttempt - b[1].lastAttempt)[0];
  return first ? D.find(d => d.id === first[0]) : null;
}

function mountWavingBuddy() {
  const mascot = document.querySelector(".cloud-mascot");
  if (!mascot) return;

  mascot.innerHTML = `
    <svg class="waving-buddy-svg" viewBox="0 0 250 210" role="img" aria-label="Pip the cloud buddy waving hello">
      <ellipse cx="126" cy="186" rx="66" ry="9" fill="#a78bfa" opacity=".16"/>
      <path class="buddy-body" d="M55 151c-15 0-27-12-27-27 0-13 9-24 21-27 2-28 24-49 52-49 20 0 37 11 46 28 5-3 11-5 17-5 20 0 36 16 36 36 0 5-1 9-3 14 10 5 17 15 17 27 0 17-14 31-31 31H55z" fill="#fff" stroke="#a98af5" stroke-width="5" stroke-linejoin="round"/>
      <path d="M83 112c4-6 11-6 15 0M131 112c4-6 11-6 15 0" fill="none" stroke="#59457c" stroke-width="5" stroke-linecap="round"/>
      <path d="M101 128c8 10 19 10 27 0" fill="none" stroke="#59457c" stroke-width="4" stroke-linecap="round"/>
      <circle cx="76" cy="126" r="6" fill="#f4a4c8" opacity=".8"/><circle cx="159" cy="126" r="6" fill="#f4a4c8" opacity=".8"/>
      <g class="buddy-arm">
        <path d="M176 145c10-8 13-20 17-33" fill="none" stroke="#a98af5" stroke-width="12" stroke-linecap="round"/>
        <path d="M190 112c-8-10-7-20-3-25 5-5 11 0 12 8l2-18c1-8 8-9 11-3 2 4 0 13 0 17l5-12c3-7 10-5 11 2 0 5-5 16-8 23-5 12-17 16-30 8z" fill="#fff" stroke="#a98af5" stroke-width="4" stroke-linejoin="round"/>
      </g>
      <path d="M43 52l5 9 10 2-8 6 2 10-9-5-9 5 2-10-8-6 10-2z" fill="#fb923c"/>
      <path d="M198 151l3 6 7 1-5 5 1 7-6-3-6 3 1-7-5-5 7-1z" fill="#f472b6"/>
    </svg>`;
}

const emojiIconPaths = {
  cloud: '<path d="M7 18h10.5a4.5 4.5 0 0 0 .3-9 6.2 6.2 0 0 0-12-.3A4.7 4.7 0 0 0 7 18Z"/>',
  sparkle: '<path d="m12 2 2.5 7.5L22 12l-7.5 2.5L12 22l-2.5-7.5L2 12l7.5-2.5L12 2Z"/>',
  heart: '<path d="M20.8 8.8c0 5-8.8 11-8.8 11s-8.8-6-8.8-11A4.8 4.8 0 0 1 12 6.1a4.8 4.8 0 0 1 8.8 2.7Z"/>',
  trophy: '<path d="M8 4h8v4a4 4 0 0 1-8 0V4Zm0 2H4v2a4 4 0 0 0 4 4m8-6h4v2a4 4 0 0 1-4 4m-4 0v4m-4 3h8m-7-3h6v3H9z"/>',
  book: '<path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v16H6.5A2.5 2.5 0 0 0 4 21V5.5Zm0 13A2.5 2.5 0 0 1 6.5 16H20"/>',
  globe: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 0 1 0 18m0-18a14 14 0 0 0 0 18"/>',
  bulb: '<path d="M9 18h6m-5 3h4m-5-6a7 7 0 1 1 6 0c-.8.5-1 1.2-1 2H10c0-.8-.2-1.5-1-2Z"/>',
  chat: '<path d="M20 11.5a7.5 7.5 0 0 1-8 7.5 9 9 0 0 1-4-.9L4 20l1.3-3.5A7 7 0 0 1 4 12c0-4.1 3.6-7 8-7s8 2.4 8 6.5Z"/><path d="M8 12h.01M12 12h.01M16 12h.01"/>',
  map: '<path d="m3 6 6-3 6 3 6-3v15l-6 3-6-3-6 3V6Zm6-3v15m6-12v15"/>',
  pencil: '<path d="m4 16.5-.8 4.3 4.3-.8L19 8.5 15.5 5 4 16.5ZM14 6.5l3.5 3.5"/>',
  person: '<circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/>',
  brain: '<path d="M12 5a4 4 0 0 0-7 2 4 4 0 0 0 0 7 4 4 0 0 0 7 2V5Zm0 0a4 4 0 0 1 7 2 4 4 0 0 1 0 7 4 4 0 0 1-7 2M8 9h1m6 0h1m-8 5h1m6 0h1"/>',
  flower: '<path d="M12 12c-4-1-5-6-1-7 2-.5 3 2 1 7Zm0 0c1-4 6-5 7-1 .5 2-2 3-7 1Zm0 0c4 1 5 6 1 7-2 .5-3-2-1-7Zm0 0c-1 4-6 5-7 1-.5-2 2-3 7-1Z"/><circle cx="12" cy="12" r="2"/>',
  home: '<path d="m3 11 9-8 9 8v9h-6v-6H9v6H3z"/>',
  search: '<circle cx="10.8" cy="10.8" r="6.8"/><path d="m16 16 5 5"/>',
  scales: '<path d="M12 4v16m-6 0h12M5 8h14M5 8l-3 6h6L5 8Zm14 0-3 6h6l-3-6Z"/>',
  check: '<path d="m5 12 4 4L19 6"/>'
};

function svgForEmoji(token) {
  const codePoint = token.codePointAt(0);
  const symbols = {
    "⌂": "home", "⌕": "search", "☏": "chat", "✦": "sparkle",
    "✧": "sparkle", "♡": "heart", "☆": "sparkle", "★": "sparkle",
    "⚖": "scales", "✎": "pencil", "✓": "check", "☑": "check"
  };
  const kind = symbols[token] || ({
    0x2601: "cloud", 0x2728: "sparkle", 0x2726: "sparkle", 0x2727: "sparkle",
    0x2606: "sparkle", 0x2661: "heart", 0x1f49c: "heart", 0x1f3c6: "trophy",
    0x1f3c5: "trophy", 0x1f4da: "book", 0x1f524: "book", 0x1f30d: "globe",
    0x1f4a1: "bulb", 0x1f4ac: "chat", 0x1f5fa: "map", 0x1f9ed: "map",
    0x2696: "scales", 0x270e: "pencil", 0x1f58d: "pencil", 0x1f469: "person", 0x1f9e0: "brain",
    0x1f337: "flower", 0x1f331: "flower"
  })[codePoint] || "sparkle";
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("class", "emoji-svg");
  svg.setAttribute("viewBox", "0 0 24 24");
  svg.setAttribute("aria-hidden", "true");
  svg.setAttribute("focusable", "false");
  svg.innerHTML = emojiIconPaths[kind];
  return svg;
}

const emojiPattern = /(?:\p{Extended_Pictographic}(?:\uFE0F|\p{Emoji_Modifier}|\u200D\p{Extended_Pictographic})*|[⌂⌕☏✦✧♡☆★⚖✎✓☑])/gu;

function replaceEmojiInRoot(root) {
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
  const textNodes = [];
  while (walker.nextNode()) {
    if (emojiPattern.test(walker.currentNode.nodeValue)) {
      textNodes.push(walker.currentNode);
    }
    emojiPattern.lastIndex = 0;
  }

  textNodes.forEach(node => {
    const fragment = document.createDocumentFragment();
    let lastIndex = 0;
    node.nodeValue.replace(emojiPattern, (match, offset) => {
      if (offset > lastIndex) {
        fragment.append(document.createTextNode(node.nodeValue.slice(lastIndex, offset)));
      }
      fragment.append(svgForEmoji(match));
      lastIndex = offset + match.length;
      return match;
    });
    if (lastIndex < node.nodeValue.length) {
      fragment.append(document.createTextNode(node.nodeValue.slice(lastIndex)));
    }
    node.replaceWith(fragment);
  });
}

function initSvgIcons() {
  const stylesheet = document.createElement("link");
  stylesheet.rel = "stylesheet";
  stylesheet.href = "buddy-enhancements.css";
  document.head.append(stylesheet);

  mountWavingBuddy();
  replaceEmojiInRoot(document.body);
  const observer = new MutationObserver(records => {
    records.forEach(record => record.addedNodes.forEach(node => {
      if (node.nodeType === Node.TEXT_NODE) {
        replaceEmojiInRoot(node.parentElement);
      } else if (node.nodeType === Node.ELEMENT_NODE) {
        replaceEmojiInRoot(node);
      }
    }));
  });
  observer.observe(document.body, { childList: true, subtree: true });
}

function esc(s) {
  return String(s).replace(/[&<>"']/g, c => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
  }[c]));
}

function termify(s) {
  return esc(s).replace(
    /\b(CDN|RBAC|IAM|IaaS|PaaS|SaaS|VM|VNet|MFA|DNS|API|SLA|CapEx|OpEx)\b/gi,
    match => `<button type="button" class="inline-term" data-term="${match}">${match}</button>`
  );
}

function initTermTooltips() {
  const tip = $("global-term-tooltip");

  function show(btn) {
    const key = btn.dataset.term;
    const item = glossary[key] ||
      glossary[Object.keys(glossary).find(
        k => k.toLowerCase() === key.toLowerCase()
      )];

    if (!item) return;

    tip.innerHTML = `<b>${esc(key)} — ${esc(item.full)}</b>
      <p>${esc(item.meaning)}</p>
      <small>${esc(item.example)}</small>`;

    tip.hidden = false;

    const r = btn.getBoundingClientRect();
    tip.style.top = Math.min(
      window.innerHeight - 145,
      Math.max(8, r.bottom + 8)
    ) + "px";

    tip.style.left = Math.max(
      10,
      Math.min(window.innerWidth - 310, r.left)
    ) + "px";
  }

  document.addEventListener("mouseover", e => {
    const btn = e.target.closest("[data-term]");
    if (btn) show(btn);
  });

  document.addEventListener("focusin", e => {
    const btn = e.target.closest("[data-term]");
    if (btn) show(btn);
  });

  document.addEventListener("click", e => {
    const btn = e.target.closest("[data-term]");

    if (btn) {
      e.preventDefault();

      if (tip.dataset.open === btn.dataset.term) {
        tip.hidden = true;
        tip.dataset.open = "";
      } else {
        show(btn);
        tip.dataset.open = btn.dataset.term;
      }
    } else {
      tip.hidden = true;
      tip.dataset.open = "";
    }
  });

  document.addEventListener("mouseout", e => {
    const btn = e.target.closest("[data-term]");

    if (
      btn &&
      !btn.contains(e.relatedTarget) &&
      tip.dataset.open !== btn.dataset.term &&
      document.activeElement !== btn
    ) {
      tip.hidden = true;
    }
  });

  document.addEventListener("focusout", e => {
    if (
      e.target.matches("[data-term]") &&
      tip.dataset.open !== e.target.dataset.term
    ) {
      tip.hidden = true;
    }
  });
}

function go(view) {
  currentView = view;

  document.querySelectorAll("[data-view]").forEach(el => {
    el.hidden = el.dataset.view !== view;
  });

  document.querySelectorAll("[data-nav]").forEach(el => {
    el.classList.toggle("active", el.dataset.nav === view);
  });

  if (view === "glossary") renderGlossary();
  if (view === "explore") renderConcepts();
  if (view === "compare") renderComparisons();
  if (view === "quiz") renderQuiz();
  if (view === "quickfire") renderQuickFire();
  if (view === "history") renderHistory();

  const titles = {
    home: "Let's make cloud concepts click.",
    chat: "A friendly place to ask anything.",
    explore: "Explore the cloud, one level at a time.",
    glossary: "Tech words, decoded.",
    compare: "Let's untangle tricky twins.",
    quickfire: "Your turn to explain.",
    quiz: "A little knowledge check.",
    history: "Your learning, remembered."
  };
  $("page-title").textContent = titles[view] || titles.home;

  window.scrollTo({
    top: 0,
    behavior: matchMedia("(prefers-reduced-motion: reduce)").matches
      ? "auto"
      : "smooth"
  });
}

function updateStats() {
  $("xp").textContent = xp;
  $("mastery").textContent = mastered.size;
  $("progress-fill").style.width =
    Math.min(100, mastered.size / D.length * 100) + "%";
}

function award(points, conceptId) {
  xp += points;
  localStorage.setItem("cc-xp", String(xp));

  if (conceptId) mastered.add(conceptId);

  localStorage.setItem(
    "cc-mastered",
    JSON.stringify([...mastered])
  );

  updateStats();

  const toast = $("reward-toast");
  toast.textContent = `✨ +${points} XP — nice work!`;
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 2100);
}

function chipButton(label, fn, cls = "chip") {
  const b = document.createElement("button");
  b.type = "button";
  b.className = cls;
  b.textContent = label;
  b.addEventListener("click", fn);
  return b;
}

function renderGlossary() {
  const q = $("glossary-search").value.trim().toLowerCase();
  const wrap = $("glossary-list");
  wrap.replaceChildren();

  Object.entries(glossary)
    .filter(([abbr, v]) =>
      (abbr + " " + v.full + " " + v.meaning).toLowerCase().includes(q)
    )
    .forEach(([abbr, v]) => {
      const card = document.createElement("article");
      card.className = "glossary-card";
      card.innerHTML = `
        <div class="term-line">
          <span class="term-pill">${esc(abbr)}</span>
          <span class="term-full">${esc(v.full)}</span>
        </div>
        <p>${esc(v.meaning)}</p>
        <p class="analogy"><b>Everyday connection:</b> ${esc(v.example)}</p>
      `;
      wrap.append(card);
    });

  if (!wrap.children.length) {
    wrap.innerHTML = '<p class="empty-state">No term found yet. Try a shorter search.</p>';
  }
}
function renderConcepts() {
  const q = $("concept-search").value.toLowerCase().trim();
  const list = $("concept-list");
  list.replaceChildren();

  D.filter(d =>
    (d.t + " " + d.kw + " " + d.tr).toLowerCase().includes(q)
  ).forEach((d, i) => {
    const b = chipButton("", () => showConcept(d), "level-card");

    b.innerHTML = `
      <span class="level-number">${String(i + 1).padStart(2, "0")}</span>
      <span class="level-copy">
        <b>${esc(d.t)}</b>
        <small>${esc(CATS[d.cat])}</small>
      </span>
      <span class="level-star">${mastered.has(d.id) ? "🏆" : "☆"}</span>
    `;

    list.append(b);
  });
}

function showConcept(d) {
  currentConcept = d;
  const panel = $("concept-detail");

  panel.innerHTML = `
    <div class="section-kicker">${esc(CATS[d.cat])}</div>
    <h3>${esc(d.t)}</h3>

    <div class="lesson-block">
      <span class="lesson-label">☁️ Translate</span>
      <p>${termify(d.tr)}</p>
    </div>

    <div class="lesson-block pink-block">
      <span class="lesson-label">🌍 Relate · analogy</span>
      <p>${termify(d.re)}</p>
    </div>

    <div class="lesson-block orange-block">
      <span class="lesson-label">🔎 Distinguish</span>
      <p><b>${esc(d.dv[0])}:</b> ${esc(d.dv[1])}</p>
    </div>

    <div class="lesson-block">
      <span class="lesson-label">🧠 Apply</span>
      <p>${esc(d.ap.q)}</p>
      <div class="option-stack" id="concept-options"></div>
      <p id="concept-feedback" class="feedback" aria-live="polite"></p>
    </div>

    <button class="button button-primary" id="practice-this">
      Practise explaining this →
    </button>
  `;

  d.ap.o.forEach((option, i) => {
    const b = chipButton(option, () => {
      const fb = $("concept-feedback");

      document.querySelectorAll("#concept-options button").forEach((x, j) => {
        x.disabled = true;
        if (j === d.ap.a) x.classList.add("correct-option");
      });

      if (i !== d.ap.a) b.classList.add("wrong-option");

      const right = i === d.ap.a;
      fb.className = "feedback " + (right ? "good" : "needs-work");

      fb.innerHTML = `
        <b>${right ? "✓ Red tick! Correct." : "↗ Nearly there!"}</b>
        ${esc(d.ap.why)}
      `;

      if (right) {
        resolveReviewedConcept(d.id);
        award(10, d.id);
      } else {
        recordMissedConcept(d.id);
      }
    });

    b.className = "option-button";
    $("concept-options").append(b);
  });

  $("practice-this").addEventListener("click", () => {
    currentConcept = d;
    go("quickfire");
    renderQuickFire();
  });

  panel.scrollIntoView({ behavior: "smooth", block: "start" });
}

function renderComparisons() {
  const wrap = $("comparison-list");
  wrap.replaceChildren();

  P.forEach(c => {
    const el = document.createElement("article");
    el.className = "comparison-card";

    el.innerHTML = `
      <h3>${esc(c.h)}</h3>
      <div class="compare-columns">
        <div>
          <b>${esc(c.a[0])}</b>
          <p>${esc(c.a[1])}</p>
        </div>
        <div>
          <b>${esc(c.b[0])}</b>
          <p>${esc(c.b[1])}</p>
        </div>
      </div>
      <p class="memory-hook">💡 <b>Memory hook:</b> ${esc(c.r)}</p>
    `;

    wrap.append(el);
  });
}

function findConcept(text) {
  const s = text.toLowerCase();

  return D.map(d => ({
    d,
    score: (d.t + " " + d.kw + " " + d.tr)
      .toLowerCase()
      .split(/[^a-z0-9]+/)
      .filter(w => w.length > 3 && !stopWords.has(w) && s.includes(w))
      .length
  }))
    .sort((a, b) => b.score - a.score)
    .filter(x => x.score > 0)
    .slice(0, 3)
    .map(x => x.d);
}

function addMessage(role, html) {
  const el = document.createElement("div");
  el.className = "chat-message " + role;
  el.innerHTML = html;

  $("chat-log").append(el);
  $("chat-log").scrollTop = $("chat-log").scrollHeight;

  return el;
}

function askBuddy(question) {
  const text = question.trim();
  if (!text) return;

  addMessage("user", `<p>${esc(text)}</p>`);
  $("chat-input").value = "";

  const matches = findConcept(text);
  const d = matches[0] || null;

  let reply = `
    <p>
      I’m still learning this topic in the prototype. Try asking about
      scalability, high availability, Blob Storage, Entra ID, Azure Policy,
      resource locks, costs, or cloud responsibility. You can also search
      the glossary.
    </p>
  `;

  if (d) {
    reply = `
      <div class="buddy-answer-heading">
        <span>☁️</span>
        <div>
          <b>Let’s make ${esc(d.t)} clearer</b>
          <small>Curated study notes · prototype mode</small>
        </div>
      </div>

      <div class="answer-part">
        <b>1. Translate</b>
        <p>${termify(d.tr)}</p>
      </div>

      <div class="answer-part analogy">
        <b>2. Relate</b>
        <p>${termify(d.re)}</p>
      </div>

      <div class="answer-part">
        <b>3. Distinguish</b>
        <p>${termify(d.dv[0])}: ${termify(d.dv[1])}</p>
      </div>

      <div class="answer-part apply">
        <b>4. Apply</b>
        <p>${esc(d.ap.q)}</p>
        <button class="button button-small button-primary"
                data-quickfire="${esc(d.id)}">
          Try this in Quick Fire
        </button>
      </div>
    `;
  }

  const msg = addMessage(
    "buddy",
    `<div class="buddy-avatar">☁️</div><div class="chat-bubble">${reply}</div>`
  );

  const qbtn = msg.querySelector("[data-quickfire]");

  if (qbtn) {
    qbtn.addEventListener("click", () => {
      currentConcept = d;
      go("quickfire");
    });
  }
}

function initChat() {
  const quick = $("suggested-prompts");

  SUG.forEach(s => {
    quick.append(chipButton(s, () => askBuddy(s), "prompt-chip"));
  });

  $("chat-form").addEventListener("submit", e => {
    e.preventDefault();
    askBuddy($("chat-input").value);
  });
}

function currentQuickFire() {
  return currentConcept || nextReviewConcept() || D[0];
}

function renderQuickFire() {
  const d = currentQuickFire();

  $("quickfire-term").textContent = d.t;
  $("quickfire-category").textContent = CATS[d.cat];

  $("quickfire-prompt").textContent =
    `Explain “${d.t}” in your own words, as if you were helping a friend who has never studied Azure.`;

  $("quickfire-answer").value = "";
  $("quickfire-result").hidden = true;
  $("quickfire-submit").disabled = false;

  $("quickfire-tip").textContent =
    "Try to explain what it does and when it is useful. You do not need to use textbook wording.";
}

function markQuickFire() {
  const d = currentQuickFire();
  const answer = $("quickfire-answer").value.trim();

  if (answer.length < 12) {
    $("quickfire-tip").textContent =
      "Add a little more detail first. One or two sentences is a good start.";
    return;
  }

  const words = answer.toLowerCase().match(/[a-z0-9]+/g) || [];
  const concepts = (d.t + " " + d.kw + " " + d.tr)
    .toLowerCase()
    .match(/[a-z0-9]+/g) || [];

  const important = [...new Set(
    concepts.filter(w => w.length >= 5 && !stopWords.has(w))
  )];

  const hits = important.filter(w => words.includes(w));

  const hasExplain =
    /(because|so that|which|helps|allows|lets|means|used|when|by|is a|are a|keeps|prevents|controls|provides|stores|manages|delivers|protects)/i
      .test(answer);

  const good = hits.length >= 2 && hasExplain;
  const partial = hits.length >= 1 || hasExplain;

  if (good) {
    resolveReviewedConcept(d.id);
  } else {
    recordMissedConcept(d.id);
  }

  const box = $("quickfire-result");
  box.hidden = false;
  box.className = "marking-paper " +
    (good ? "marked-good" : partial ? "marked-partial" : "marked-retry");

  const heading = good
    ? "✓ Well explained!"
    : partial
      ? "↗ You’re getting there!"
      : "↻ Let’s try another pass";

  const feedback = good
    ? `You have included some of the key ideas for ${d.t}. Your own wording is welcome — understanding matters more than memorising a definition.`
    : partial
      ? "There is a useful start here, but one or two important details may be missing. Compare your answer with the key idea below and have another go."
      : "I can’t confidently match this answer to the key idea yet. That doesn’t mean you can’t learn it — revisit the explanation and try again.";

  box.innerHTML = `
    <div class="red-pen-heading">
      <span class="red-tick">${good ? "✓" : partial ? "↗" : "↻"}</span>
      <div>
        <span class="teacher-label">PIP’S RED-PEN FEEDBACK</span>
        <h3>${heading}</h3>
      </div>
    </div>

    <p>${feedback}</p>

    <div class="teacher-note">
      <b>Teacher’s note</b>
      <p>${termify(d.tr)}</p>
    </div>

    <p class="marking-disclaimer">
      Prototype marking: this version uses a simple local check, not AI understanding.
      It may miss a correct answer written with different words.
      Real semantic feedback will be connected through a secure backend.
    </p>

    <div class="mark-actions">
      <button class="button button-secondary" id="try-again">Try again</button>
      <button class="button button-primary" id="got-it">
        ${good ? "Claim +20 XP" : "Practise this concept again"}
      </button>
    </div>
  `;

  $("quickfire-submit").disabled = true;

  $("try-again").addEventListener("click", () => {
    box.hidden = true;
    $("quickfire-submit").disabled = false;
    $("quickfire-answer").focus();
  });

  $("got-it").addEventListener("click", () => {
    if (!good) {
      currentConcept = d;
      renderQuickFire();
      $("quickfire-answer").focus();
      return;
    }
    award(20, d.id);
    box.querySelector(".mark-actions").innerHTML =
      '<span class="success-note">Progress saved. Keep going!</span>';
  });
}

function renderQuiz() {
  const wrap = $("quiz-content");
  const d = D[quizIndex % D.length];

  wrap.innerHTML = `
    <div class="quiz-topline">
      <span>QUESTION ${quizIndex + 1} OF ${D.length}</span>
      <span>🏅 ${quizScore} correct</span>
    </div>

    <div class="quiz-progress">
      <span style="width:${(quizIndex + 1) / D.length * 100}%"></span>
    </div>

    <h3>${esc(d.ap.q)}</h3>
    <div id="quiz-options" class="option-stack"></div>
    <div id="quiz-feedback" class="feedback" aria-live="polite"></div>

    <button class="button button-primary" id="quiz-next" hidden>
      ${quizIndex === D.length - 1 ? "See my results" : "Next question →"}
    </button>
  `;

  d.ap.o.forEach((opt, i) => {
    const b = chipButton(opt, () => {
      const right = i === d.ap.a;
      if (right) quizScore++;
      else recordMissedConcept(d.id);

      document.querySelectorAll("#quiz-options button").forEach((x, j) => {
        x.disabled = true;
        if (j === d.ap.a) x.classList.add("correct-option");
      });

      if (!right) b.classList.add("wrong-option");

      $("quiz-feedback").className =
        "feedback " + (right ? "good" : "needs-work");

      $("quiz-feedback").innerHTML = `
        <b>${right ? "✓ Correct!" : "↗ Not quite yet."}</b>
        ${esc(d.ap.why)}
      `;

      $("quiz-next").hidden = false;
    });

    b.className = "option-button";
    $("quiz-options").append(b);
  });

  $("quiz-next").addEventListener("click", () => {
    if (quizIndex === D.length - 1) {
      wrap.innerHTML = `
        <div class="results-trophy">🏆</div>
        <h3>You finished the check!</h3>
        <p>
          You answered ${quizScore} out of ${D.length} correctly.
          ${quizScore >= 8
            ? "Brilliant progress — try Quick Fire to explain a term without answer choices."
            : "Every attempt teaches you something. Revisit a concept, then give Quick Fire a try."}
        </p>
        <button class="button button-primary" id="quiz-restart">Play again</button>
        <button class="button button-secondary" id="quiz-fire">Try Quick Fire</button>
      `;

      $("quiz-restart").addEventListener("click", () => {
        quizIndex = 0;
        quizScore = 0;
        renderQuiz();
      });

      $("quiz-fire").addEventListener("click", () => go("quickfire"));
    } else {
      quizIndex++;
      renderQuiz();
    }
  });
}

function mountHistory() {
  const quickFireNav = document.querySelector('[data-nav="quickfire"]');
  const quickFireView = document.querySelector('[data-view="quickfire"]');
  if (!quickFireNav || !quickFireView) return;

  const navButton = document.createElement("button");
  navButton.dataset.nav = "history";
  navButton.innerHTML = `
    <span class="history-nav-icon" aria-hidden="true">
      <svg viewBox="0 0 24 24"><path d="M4 7h16M4 12h11M4 17h7M18 14v6m-3-3h6"/></svg>
    </span>
    History
    <span id="history-count" class="history-count" hidden></span>
  `;
  quickFireNav.before(navButton);

  const section = document.createElement("section");
  section.dataset.view = "history";
  section.className = "view";
  section.hidden = true;
  section.innerHTML = `
    <div class="page-intro">
      <span class="section-icon purple-icon" aria-hidden="true">
        <svg viewBox="0 0 24 24"><path d="M4 7h16M4 12h11M4 17h7M18 14v6m-3-3h6"/></svg>
      </span>
      <div>
        <p class="eyebrow">A KIND LITTLE REMINDER</p>
        <h2>Concepts worth another look</h2>
        <p>Pip keeps track of ideas that felt tricky, so you can practise them again at your own pace. A clear Quick Fire answer clears a concept from this list.</p>
      </div>
    </div>
    <div id="history-summary" class="history-summary" aria-live="polite"></div>
    <div id="history-list" class="history-list"></div>
  `;
  quickFireView.before(section);
}

function renderHistory() {
  const list = $("history-list");
  if (!list) return;

  const items = [...reviewQueue.entries()]
    .sort((a, b) => a[1].lastAttempt - b[1].lastAttempt);
  const count = $("history-count");
  count.hidden = items.length === 0;
  count.textContent = items.length;
  $("history-summary").textContent = items.length
    ? `${items.length} concept${items.length === 1 ? "" : "s"} waiting for another try.`
    : "";

  list.replaceChildren();
  if (!items.length) {
    list.innerHTML = `
      <article class="history-empty">
        <span class="history-empty-icon" aria-hidden="true">
          <svg viewBox="0 0 24 24"><path d="M4 7h16M4 12h11M4 17h7M18 14v6m-3-3h6"/></svg>
        </span>
        <h3>Nothing to revisit just yet</h3>
        <p>If a concept feels tricky in Quick Fire or a quiz, Pip will save it here for a friendly retry.</p>
      </article>
    `;
    return;
  }

  items.forEach(([id, progress]) => {
    const concept = D.find(d => d.id === id);
    if (!concept) return;
    const card = document.createElement("article");
    card.className = "history-card";
    card.innerHTML = `
      <div class="history-card-copy">
        <span class="history-status">READY FOR ANOTHER TRY</span>
        <h3>${esc(concept.t)}</h3>
        <p>${esc(CATS[concept.cat])} · Pip has saved ${progress.attempts} missed attempt${progress.attempts === 1 ? "" : "s"}.</p>
      </div>
      <button class="button button-primary" type="button" data-review="${esc(id)}">Practise with Pip</button>
    `;
    card.querySelector("[data-review]").addEventListener("click", () => {
      currentConcept = concept;
      go("quickfire");
    });
    list.append(card);
  });
}

function renderAll() {
  updateStats();
  renderGlossary();
  renderConcepts();
  renderComparisons();
  renderQuiz();
  renderQuickFire();
  renderHistory();
}

// Navigation and event listeners
mountHistory();
initSvgIcons();
document.querySelectorAll("[data-nav]").forEach(b => {
  b.addEventListener("click", () => go(b.dataset.nav));
});

document.querySelectorAll("[data-go]").forEach(b => {
  b.addEventListener("click", () => go(b.dataset.go));
});

$("concept-search").addEventListener("input", renderConcepts);
$("glossary-search").addEventListener("input", renderGlossary);
$("quickfire-submit").addEventListener("click", markQuickFire);

$("quickfire-next").addEventListener("click", () => {
  const active = currentQuickFire();
  const review = reviewQueue.has(active.id) ? active : nextReviewConcept();
  currentConcept = review ||
    D[(D.findIndex(x => x.id === active.id) + 1) % D.length];
  renderQuickFire();
});

$("hero-form").addEventListener("submit", e => {
  e.preventDefault();
  const q = $("hero-question").value;
  go("chat");
  askBuddy(q);
});

initChat();
initTermTooltips();
renderAll();
go("home");