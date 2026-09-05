import React, { useState, useEffect, useRef } from "react";
import {
  Fingerprint, Mail, Lock, Upload, Check, ChevronRight, ArrowLeft,
  MessageCircle, Activity, Users, TrendingUp, Plus, Mic, Search,
  Settings, User, X, Image as ImageIcon, Globe, Send, MapPin,
  Menu, Sparkles, FileText, Award, Star, Flame, ClipboardList
} from "lucide-react";
import {
  BarChart, Bar, XAxis, YAxis, ResponsiveContainer, CartesianGrid, Cell
} from "recharts";

/* ---------------------------------- tokens ---------------------------------- */
const C = {
  bg: "#F7FBF1",
  card: "#FFFFFF",
  ink: "#2E2A1E",
  inkSoft: "#726B54",
  inkFaint: "#B2AC90",
  sage: "#41A64B",
  sageDark: "#2E7D37",
  sageLight: "#E0F3DF",
  apricot: "#FFC24B",
  apricotDark: "#DE9A1F",
  apricotSoft: "#FFF2D2",
  coral: "#E2694B",
  border: "#E7EEDD",
};

const FONTS = (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Fredoka:wght@500;600;700&family=Inter:wght@400;500;600;700&display=swap');
    .ff-display { font-family: 'Fredoka', sans-serif; }
    .ff-body { font-family: 'Inter', sans-serif; }
    * { box-sizing: border-box; }
    input, textarea, button { font-family: 'Inter', sans-serif; }
    ::placeholder { color: ${C.inkFaint}; }
    .scrollbar-hide::-webkit-scrollbar { display: none; }
    .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
    @keyframes pulseRing { 0% { box-shadow: 0 0 0 0 rgba(255,194,75,0.4); } 100% { box-shadow: 0 0 0 14px rgba(255,194,75,0); } }
    @keyframes dot { 0%, 80%, 100% { transform: scale(0.6); opacity: 0.4; } 40% { transform: scale(1); opacity: 1; } }
    @keyframes spinSlow { from { transform: rotate(0deg);} to { transform: rotate(360deg);} }
    @keyframes fadeUp { from { opacity: 0; transform: translateY(8px);} to { opacity: 1; transform: translateY(0);} }
    @keyframes mascotBounce { 0%, 100% { transform: translateY(0) rotate(0deg); } 25% { transform: translateY(-6px) rotate(-4deg); } 75% { transform: translateY(-2px) rotate(4deg); } }
    @keyframes mascotBlink { 0%, 90%, 100% { transform: scaleY(1); } 95% { transform: scaleY(0.1); } }
    @keyframes wiggle { 0%, 100% { transform: rotate(-8deg); } 50% { transform: rotate(8deg); } }
  `}</style>
);

/* ---------------------------------- mascot ---------------------------------- */
function Mascot({ size = 44, mood = "happy", animate = true }) {
  return (
    <div style={{ width: size, height: size * 1.35, animation: animate ? "mascotBounce 1.1s ease-in-out infinite" : "none" }}>
      <svg viewBox="0 0 100 135" width={size} height={size * 1.35}>
        {/* feet */}
        <ellipse cx="37" cy="125" rx="11" ry="7" fill="#E8934A" />
        <ellipse cx="63" cy="125" rx="11" ry="7" fill="#E8934A" />
        {/* arms */}
        <ellipse cx="21" cy="97" rx="9" ry="15" fill="#F0A868" transform="rotate(-18 21 97)" />
        <ellipse cx="79" cy="97" rx="9" ry="15" fill="#F0A868" transform="rotate(18 79 97)" />
        {/* body */}
        <ellipse cx="50" cy="102" rx="27" ry="24" fill="#F6C89A" />
        <ellipse cx="50" cy="106" rx="18" ry="18" fill="#FFF6EC" />
        {/* head */}
        <ellipse cx="50" cy="60" rx="34" ry="30" fill="#F6C89A" />
        <circle cx="20" cy="34" r="13" fill="#F0A868" />
        <circle cx="80" cy="34" r="13" fill="#F0A868" />
        <circle cx="20" cy="34" r="7" fill="#F8D3B0" />
        <circle cx="80" cy="34" r="7" fill="#F8D3B0" />
        <ellipse cx="50" cy="66" rx="24" ry="20" fill="#FFF6EC" />
        <circle cx="34" cy="55" r="12" fill="#F0A868" opacity="0.9" />
        <circle cx="66" cy="55" r="12" fill="#F0A868" opacity="0.9" />
        <ellipse cx="50" cy="62" rx="22" ry="18" fill="#FFFBF4" />
        <ellipse cx="28" cy="64" rx="7" ry="5" fill="#F6A9C4" opacity="0.8" />
        <ellipse cx="72" cy="64" rx="7" ry="5" fill="#F6A9C4" opacity="0.8" />
        <g style={{ transformOrigin: "38px 52px", animation: animate ? "mascotBlink 3.4s infinite" : "none" }}>
          <circle cx="38" cy="52" r="4.5" fill="#2E2A1E" />
        </g>
        <g style={{ transformOrigin: "62px 52px", animation: animate ? "mascotBlink 3.4s infinite" : "none" }}>
          <circle cx="62" cy="52" r="4.5" fill="#2E2A1E" />
        </g>
        <path d={mood === "happy" ? "M45 68 Q50 72 55 68" : "M45 70 Q50 66 55 70"} stroke="#2E2A1E" strokeWidth="2" fill="none" strokeLinecap="round" />
      </svg>
    </div>
  );
}

function Logo({ mascotSize = 50, wordSize = 25 }) {
  const word = "Autisolve";
  const palette = [C.sageDark, C.apricotDark, C.sage, C.apricotDark, C.sageDark, C.apricot, C.sage, C.apricotDark, C.sageDark];
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
      <Mascot size={mascotSize} animate={false} />
      <div className="ff-display" style={{ display: "flex", fontSize: wordSize, fontWeight: 700, lineHeight: 1, letterSpacing: -0.3 }}>
        {word.split("").map((ch, i) => (
          <span key={i} style={{ color: palette[i % palette.length] }}>{ch}</span>
        ))}
      </div>
    </div>
  );
}

/* ---------------------------------- mock data ---------------------------------- */
const FOCUS_AREAS = ["Communication", "Social skills", "Sensory needs", "Routines & transitions", "Emotional regulation"];
const GENDER_OPTIONS = ["Boy", "Girl", "Prefer not to say"];

const DEFAULT_ACTIVITIES = [
  { id: 1, title: "Speaking Practice", subtitle: "Naming objects & sounds", icon: MessageCircle, done: true, streak: 4 },
  { id: 2, title: "Drawing Time", subtitle: "Free-form or guided", icon: ImageIcon, done: false, streak: 6 },
  { id: 3, title: "Puzzle Play", subtitle: "Shape & pattern matching", icon: ClipboardList, done: false, streak: 2 },
  { id: 4, title: "Eating Independently", subtitle: "Self-feeding at meals", icon: Star, done: true, streak: 9 },
  { id: 5, title: "Eye Contact Games", subtitle: "Peekaboo, mirroring", icon: Sparkles, done: false, streak: 1 },
];

const DOCTORS = [
  { name: "Dr. Alia Mehta", role: "Developmental Pediatrician", distance: "1.8 km", rating: 4.9 },
  { name: "Dr. Rohan Iyer", role: "Child Psychologist", distance: "3.2 km", rating: 4.8 },
  { name: "Dr. Sana Qureshi", role: "Speech Therapist", distance: "4.5 km", rating: 4.7 },
];

const INITIAL_POSTS = [
  {
    id: 1, author: "Dr. Alia Mehta", verified: true, role: "Developmental Pediatrician",
    title: "Three small wins to notice this month",
    body: "Progress isn't always a new word — it's a longer glance, a calmer transition, a shared laugh. Celebrate the quiet ones too.",
    likes: 128, time: "2d ago"
  },
  {
    id: 2, author: "Priya Nair", verified: false, role: "Parent",
    title: "Our mornings finally feel calmer",
    body: "We moved the picture schedule to the fridge at eye-level. Two weeks in, fewer meltdowns before school. Small change, big shift.",
    likes: 64, time: "4d ago"
  },
  {
    id: 3, author: "Dr. Rohan Iyer", verified: true, role: "Child Psychologist",
    title: "When to worry less about eye contact",
    body: "Eye contact is one signal among many. Engagement can look like proximity, shared attention, or simply staying in the room with you.",
    likes: 201, time: "1w ago"
  },
];

const PRACTICE_WORDS = [
  { word: "Mom", emoji: "👩" },
  { word: "Dad", emoji: "👨" },
  { word: "Water", emoji: "💧" },
  { word: "More", emoji: "➕" },
  { word: "Help", emoji: "🙋" },
  { word: "Ball", emoji: "⚽" },
];

// 10-item developmental screening checklist, informed by the standard AQ-10 structure
// (a score of 6+ is the commonly used referral threshold). Written as original,
// parent-facing statements — this is an informal, non-diagnostic checklist, not the
// official clinical AQ-10 instrument.
const SCREENING_QUESTIONS = [
  "My child often notices small sounds, smells, or details that other people miss.",
  "My child finds it easy to join in and make small talk with other kids.",
  "My child likes to do things the same way, and gets upset when the routine changes.",
  "My child can usually tell how a story character is feeling.",
  "My child would rather play alone than with a group of other children.",
  "My child can tell when someone listening to them is getting bored.",
  "My child gets very focused on one topic or object and finds it hard to switch away.",
  "My child finds it easy to guess what someone is thinking or feeling from their face.",
  "My child likes to line things up or organize objects in a particular order.",
  "My child finds it hard to work out what another person's intentions are.",
];

const WEEK = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const WEEK_DATA = [
  { day: "Mon", count: 3 }, { day: "Tue", count: 4 }, { day: "Wed", count: 2 },
  { day: "Thu", count: 5 }, { day: "Fri", count: 3 }, { day: "Sat", count: 4 }, { day: "Sun", count: 1 },
];

/* ---------------------------------- small UI atoms ---------------------------------- */
function PrimaryButton({ children, onClick, disabled, style }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="ff-body"
      style={{
        width: "100%", padding: "14px 20px", borderRadius: 16, border: "none",
        background: disabled ? C.inkFaint : C.sage, color: "#fff", fontWeight: 600, fontSize: 15,
        cursor: disabled ? "not-allowed" : "pointer", display: "flex", alignItems: "center",
        justifyContent: "center", gap: 8, transition: "background 0.15s", ...style,
      }}
    >
      {children}
    </button>
  );
}

function TextField({ icon: Icon, ...props }) {
  return (
    <div style={{
      display: "flex", alignItems: "center", gap: 10, background: "#fff",
      border: `1.5px solid ${C.border}`, borderRadius: 14, padding: "12px 14px",
    }}>
      {Icon && <Icon size={18} color={C.inkFaint} />}
      <input
        {...props}
        className="ff-body"
        style={{ border: "none", outline: "none", flex: 1, fontSize: 14.5, color: C.ink, background: "transparent" }}
      />
    </div>
  );
}

function ScreenShell({ children, footer }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%", padding: "36px 24px 24px" }}>
      <div style={{ flex: 1, overflowY: "auto" }} className="scrollbar-hide">{children}</div>
      {footer && <div style={{ paddingTop: 16 }}>{footer}</div>}
    </div>
  );
}

/* ---------------------------------- LOGIN ---------------------------------- */
function LoginFlow({ onDone }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [scanning, setScanning] = useState(false);
  const [verified, setVerified] = useState(false);

  const canVerify = email.includes("@") && password.length >= 4;

  const startScan = () => {
    if (!canVerify || scanning || verified) return;
    setScanning(true);
    setTimeout(() => {
      setScanning(false);
      setVerified(true);
      setTimeout(onDone, 650);
    }, 1400);
  };

  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column", background: `linear-gradient(180deg, ${C.apricotSoft} 0%, ${C.bg} 55%)` }}>
      <ScreenShell
        footer={
          <PrimaryButton disabled={!verified} onClick={onDone} style={{ background: verified ? C.sage : C.inkFaint }}>
            {verified ? "Enter Autisolve" : "Complete verification above"} <ChevronRight size={16} />
          </PrimaryButton>
        }
      >
        <div style={{ marginBottom: 20 }}>
          <Logo />
        </div>

        <h1 className="ff-display" style={{ fontSize: 25, color: C.ink, margin: "0 0 6px", fontWeight: 600 }}>Welcome back</h1>
        <p className="ff-body" style={{ fontSize: 14, color: C.inkSoft, margin: "0 0 22px", lineHeight: 1.5 }}>
          Sign in to continue supporting your child's journey.
        </p>

        <label className="ff-body" style={{ fontSize: 12.5, color: C.inkSoft, fontWeight: 600, marginBottom: 6, display: "block" }}>Email</label>
        <div style={{ marginBottom: 14 }}>
          <TextField icon={Mail} type="email" placeholder="you@example.com" value={email} onChange={(e) => { setEmail(e.target.value); setVerified(false); }} />
        </div>

        <label className="ff-body" style={{ fontSize: 12.5, color: C.inkSoft, fontWeight: 600, marginBottom: 6, display: "block" }}>Password</label>
        <div style={{ marginBottom: 20 }}>
          <TextField icon={Lock} type="password" placeholder="••••••••" value={password} onChange={(e) => { setPassword(e.target.value); setVerified(false); }} />
        </div>

        <div style={{
          display: "flex", alignItems: "center", gap: 14, background: "#fff",
          border: `1.5px solid ${verified ? C.sage : C.border}`, borderRadius: 16, padding: "14px 16px",
        }}>
          <button
            onClick={startScan}
            disabled={!canVerify || scanning || verified}
            style={{
              width: 52, height: 52, borderRadius: "50%", flexShrink: 0,
              background: verified ? C.sage : canVerify ? C.apricotSoft : C.sageLight,
              border: "none", cursor: canVerify && !verified ? "pointer" : "default",
              display: "flex", alignItems: "center", justifyContent: "center",
              animation: scanning ? "pulseRing 1.1s ease-out infinite" : "none",
              transition: "background 0.3s",
            }}
          >
            {verified ? <Check size={22} color="#fff" /> : <Fingerprint size={22} color={canVerify ? C.apricotDark : C.inkFaint} />}
          </button>
          <div style={{ flex: 1 }}>
            <div className="ff-body" style={{ fontSize: 13.5, fontWeight: 700, color: C.ink }}>
              {verified ? "Verified with biometrics" : "Face / Touch ID"}
            </div>
            <div className="ff-body" style={{ fontSize: 12, color: C.inkSoft }}>
              {verified ? "You're all set — welcome in." : scanning ? "Scanning…" : canVerify ? "Tap to confirm it's you" : "Fill in email & password first"}
            </div>
          </div>
        </div>
        <p className="ff-body" style={{ fontSize: 12, color: C.inkFaint, marginTop: 12, lineHeight: 1.5 }}>
          All three steps keep your family's information private and secure.
        </p>
      </ScreenShell>
    </div>
  );
}

/* ---------------------------------- ONBOARDING ---------------------------------- */
function OnboardingFlow({ onDone }) {
  const [stage, setStage] = useState("upload"); // upload -> questions
  const [fileName, setFileName] = useState(null);
  const [fileSize, setFileSize] = useState(null);
  const [childName, setChildName] = useState("");
  const [childAge, setChildAge] = useState("");
  const [childGender, setChildGender] = useState("");
  const [focus, setFocus] = useState([]);
  const [notes, setNotes] = useState("");

  const toggleFocus = (f) => setFocus((prev) => prev.includes(f) ? prev.filter((x) => x !== f) : [...prev, f]);

  const onPickFile = (e) => {
    const f = e.target.files && e.target.files[0];
    if (!f) return;
    setFileName(f.name);
    setFileSize(f.size > 1024 * 1024 ? `${(f.size / (1024 * 1024)).toFixed(1)} MB` : `${Math.max(1, Math.round(f.size / 1024))} KB`);
  };

  if (stage === "upload") {
    return (
      <ScreenShell
        footer={
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <PrimaryButton onClick={() => setStage("questions")}>Continue <ChevronRight size={16} /></PrimaryButton>
            <button onClick={() => setStage("questions")} className="ff-body" style={{ background: "none", border: "none", color: C.inkSoft, fontSize: 13.5, cursor: "pointer" }}>
              Skip for now
            </button>
          </div>
        }
      >
        <h1 className="ff-display" style={{ fontSize: 23, color: C.ink, margin: "0 0 6px", fontWeight: 600 }}>Let's personalize things</h1>
        <p className="ff-body" style={{ fontSize: 14, color: C.inkSoft, margin: "0 0 26px", lineHeight: 1.5 }}>
          If you have a therapist or evaluation report, upload it — it helps your chatbot understand your child's needs from day one.
        </p>
        <label
          htmlFor="report-upload-input"
          className="ff-body"
          style={{
            width: "100%", border: `2px dashed ${fileName ? C.sage : C.border}`, borderRadius: 18,
            background: fileName ? C.sageLight : "#fff", padding: "34px 20px", display: "flex",
            flexDirection: "column", alignItems: "center", gap: 10, cursor: "pointer", boxSizing: "border-box",
          }}
        >
          <input id="report-upload-input" type="file" accept=".pdf,.doc,.docx,image/*" style={{ display: "none" }} onChange={onPickFile} />
          {fileName ? <Check size={26} color={C.sageDark} /> : <Upload size={26} color={C.inkFaint} />}
          <span style={{ fontSize: 13.5, color: fileName ? C.sageDark : C.inkSoft, fontWeight: 600, textAlign: "center" }}>
            {fileName ? fileName : "Tap to upload a report (PDF, DOC, or image)"}
          </span>
          {fileSize && <span style={{ fontSize: 11.5, color: C.inkSoft }}>{fileSize} · uploaded ✓</span>}
        </label>
        <p className="ff-body" style={{ fontSize: 12, color: C.inkFaint, marginTop: 14, lineHeight: 1.5 }}>
          Your documents stay private and are only used to personalize your experience. If the file picker doesn't open, your browser may be blocking uploads inside this preview — it should work fine once the app is opened on its own.
        </p>
      </ScreenShell>
    );
  }

  return (
    <ScreenShell footer={<PrimaryButton disabled={!childName} onClick={() => onDone({ childName, childAge, childGender, focus, notes })}>Personalize my chatbot <ChevronRight size={16} /></PrimaryButton>}>
      <h1 className="ff-display" style={{ fontSize: 23, color: C.ink, margin: "0 0 6px", fontWeight: 600 }}>Tell us about your child</h1>
      <p className="ff-body" style={{ fontSize: 14, color: C.inkSoft, margin: "0 0 22px", lineHeight: 1.5 }}>
        A few quick questions so responses feel relevant to your family.
      </p>

      <label className="ff-body" style={{ fontSize: 12.5, color: C.inkSoft, fontWeight: 600, marginBottom: 6, display: "block" }}>Child's name</label>
      <div style={{ marginBottom: 16 }}><TextField placeholder="e.g. Aarav" value={childName} onChange={(e) => setChildName(e.target.value)} /></div>

      <label className="ff-body" style={{ fontSize: 12.5, color: C.inkSoft, fontWeight: 600, marginBottom: 6, display: "block" }}>Age</label>
      <div style={{ marginBottom: 18 }}><TextField placeholder="e.g. 5" type="number" value={childAge} onChange={(e) => setChildAge(e.target.value)} /></div>

      <label className="ff-body" style={{ fontSize: 12.5, color: C.inkSoft, fontWeight: 600, marginBottom: 8, display: "block" }}>Gender</label>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 18 }}>
        {GENDER_OPTIONS.map((g) => (
          <button
            key={g}
            onClick={() => setChildGender(g)}
            className="ff-body"
            style={{
              padding: "9px 14px", borderRadius: 999, fontSize: 13, cursor: "pointer",
              border: `1.5px solid ${childGender === g ? C.sage : C.border}`,
              background: childGender === g ? C.sageLight : "#fff",
              color: childGender === g ? C.sageDark : C.inkSoft, fontWeight: 600,
            }}
          >
            {g}
          </button>
        ))}
      </div>

      <label className="ff-body" style={{ fontSize: 12.5, color: C.inkSoft, fontWeight: 600, marginBottom: 8, display: "block" }}>What would you like support with?</label>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 18 }}>
        {FOCUS_AREAS.map((f) => (
          <button
            key={f}
            onClick={() => toggleFocus(f)}
            className="ff-body"
            style={{
              padding: "9px 14px", borderRadius: 999, fontSize: 13, cursor: "pointer",
              border: `1.5px solid ${focus.includes(f) ? C.sage : C.border}`,
              background: focus.includes(f) ? C.sageLight : "#fff",
              color: focus.includes(f) ? C.sageDark : C.inkSoft, fontWeight: 600,
            }}
          >
            {f}
          </button>
        ))}
      </div>

      <label className="ff-body" style={{ fontSize: 12.5, color: C.inkSoft, fontWeight: 600, marginBottom: 6, display: "block" }}>Anything else the chatbot should know?</label>
      <textarea
        value={notes} onChange={(e) => setNotes(e.target.value)}
        placeholder="e.g. gets overwhelmed by loud noises, loves trains…"
        className="ff-body"
        style={{ width: "100%", minHeight: 80, border: `1.5px solid ${C.border}`, borderRadius: 14, padding: 12, fontSize: 14, resize: "none", outline: "none" }}
      />
    </ScreenShell>
  );
}

/* ---------------------------------- PERSONALIZING ---------------------------------- */
function PersonalizingScreen({ childName, onDone }) {
  useEffect(() => {
    const t = setTimeout(onDone, 2000);
    return () => clearTimeout(t);
  }, [onDone]);

  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 18, padding: 24 }}>
      <div style={{ position: "relative", width: 64, height: 64 }}>
        <div style={{
          width: 64, height: 64, borderRadius: "50%", border: `3px solid ${C.sageLight}`,
          borderTopColor: C.sage, animation: "spinSlow 0.9s linear infinite",
        }} />
        <Sparkles size={22} color={C.sageDark} style={{ position: "absolute", top: 21, left: 21 }} />
      </div>
      <p className="ff-display" style={{ fontSize: 16, color: C.ink, fontWeight: 600, textAlign: "center" }}>
        Personalizing your chatbot{childName ? ` for ${childName}` : ""}…
      </p>
    </div>
  );
}

/* ---------------------------------- CHAT TAB ---------------------------------- */
function ChatTab({ profile, sidebarOpen, setSidebarOpen }) {
  const [messages, setMessages] = useState([
    { role: "bot", text: `Hi! I'm here to support you and ${profile.childName || "your child"}${profile.focus?.length ? ` around ${profile.focus[0].toLowerCase()}` : ""}. What's on your mind today?` },
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [searching, setSearching] = useState(false);
  const [plusOpen, setPlusOpen] = useState(false);
  const [webSearchOn, setWebSearchOn] = useState(false);
  const [micStatus, setMicStatus] = useState("idle"); // idle | requesting | listening | error
  const [micError, setMicError] = useState("");
  const [attachedImage, setAttachedImage] = useState(null); // { name, url }
  const [apiError, setApiError] = useState("");
  const [profileOpen, setProfileOpen] = useState(false);
  const endRef = useRef(null);

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages, typing, searching]);

  const send = async (text) => {
    const t = (text ?? input).trim();
    if (!t && !attachedImage) return;
    const imageForApi = attachedImage;
    const useSearch = webSearchOn;
    const nextMessages = [...messages, { role: "user", text: t, image: attachedImage }];
    setMessages(nextMessages);
    setInput("");
    setAttachedImage(null);
    setWebSearchOn(false);
    setApiError("");

    if (useSearch) setSearching(true); else setTyping(true);

    try {
      const content = [];
      if (t) content.push({ type: "text", text: t });
      if (imageForApi && imageForApi.base64) {
        content.push({ type: "image", source: { type: "base64", media_type: imageForApi.mediaType || "image/jpeg", data: imageForApi.base64 } });
      }
      const body = {
        model: "claude-sonnet-4-6",
        max_tokens: 1000,
        system: buildSystemPrompt(profile),
        messages: [...toApiHistory(messages), { role: "user", content: content.length ? content : t }],
      };
      if (useSearch) body.tools = [{ type: "web_search_20250305", name: "web_search" }];

      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = await res.json();
      const replyText = (data.content || [])
        .filter((b) => b.type === "text")
        .map((b) => b.text)
        .join("\n\n")
        .trim();
      setMessages((m) => [...m, { role: "bot", text: replyText || "I'm here — could you tell me a little more about what's going on?" }]);
    } catch (err) {
      setApiError("Couldn't reach Companion right now — check your connection and try again.");
      setMessages((m) => [...m, { role: "bot", text: "Sorry, I'm having trouble connecting right now. Mind trying again in a moment?" }]);
    } finally {
      setTyping(false);
      setSearching(false);
    }
  };

  const onPickImage = (e) => {
    const f = e.target.files && e.target.files[0];
    if (!f) return;
    const url = URL.createObjectURL(f);
    const reader = new FileReader();
    reader.onload = () => {
      const base64 = String(reader.result).split(",")[1];
      setAttachedImage({ name: f.name, url, base64, mediaType: f.type || "image/jpeg" });
    };
    reader.readAsDataURL(f);
    setPlusOpen(false);
  };

  const toggleMic = () => {
    if (micStatus === "listening" || micStatus === "requesting") return;
    setMicError("");
    captureVoice({
      onStatus: (s) => setMicStatus(s),
      onResult: (said) => {
        setMicStatus("idle");
        setInput((prev) => (prev ? `${prev} ${said}` : said));
      },
      onError: (msg) => { setMicStatus("error"); setMicError(msg); setTimeout(() => setMicStatus("idle"), 2600); },
    });
  };

  const history = ["Bedtime routine ideas", "Handling loud environments", "Speech milestones at 5", "School transition tips"];

  return (
    <div style={{ position: "relative", height: "100%", display: "flex", flexDirection: "column" }}>
      {/* header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 18px 10px" }}>
        <button onClick={() => setSidebarOpen(true)} style={{ background: "none", border: "none", cursor: "pointer" }}>
          <Menu size={21} color={C.ink} />
        </button>
        <span className="ff-display" style={{ fontSize: 15, fontWeight: 600, color: C.ink }}>Companion Chat</span>
        <div style={{
          width: 30, height: 30, borderRadius: "50%", background: C.apricotSoft,
          display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12.5, fontWeight: 700, color: C.apricotDark,
        }}>
          {(profile.childName || "A")[0]}
        </div>
      </div>

      {/* messages */}
      <div className="scrollbar-hide" style={{ flex: 1, overflowY: "auto", padding: "6px 18px" }}>
        {messages.map((m, i) => (
          <div key={i} style={{ display: "flex", justifyContent: m.role === "user" ? "flex-end" : "flex-start", marginBottom: 12, animation: "fadeUp 0.25s ease" }}>
            <div className="ff-body" style={{
              maxWidth: "78%", padding: m.image ? 8 : "11px 14px", borderRadius: m.role === "user" ? "16px 16px 4px 16px" : "16px 16px 16px 4px",
              background: m.role === "user" ? C.sage : "#fff", color: m.role === "user" ? "#fff" : C.ink,
              fontSize: 14, lineHeight: 1.5, border: m.role === "user" ? "none" : `1px solid ${C.border}`,
            }}>
              {m.image && <img src={m.image.url} alt={m.image.name} style={{ width: "100%", maxWidth: 200, borderRadius: 10, display: "block", marginBottom: m.text ? 8 : 0 }} />}
              {m.text}
            </div>
          </div>
        ))}
        {searching && (
          <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 14px 8px 8px", background: "#fff", borderRadius: 18, width: "fit-content", border: `1px solid ${C.border}` }}>
            <Mascot size={34} />
            <span className="ff-body" style={{ fontSize: 13, color: C.inkSoft, fontWeight: 600 }}>Searching the web…</span>
          </div>
        )}
        {typing && (
          <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 14px 8px 8px", background: "#fff", borderRadius: 18, width: "fit-content", border: `1px solid ${C.border}` }}>
            <Mascot size={34} />
            <span className="ff-body" style={{ fontSize: 13, color: C.inkSoft, fontWeight: 600 }}>Thinking…</span>
          </div>
        )}
        <div ref={endRef} />
      </div>

      {/* input */}
      <div style={{ padding: "10px 14px 16px" }}>
        {plusOpen && (
          <div style={{ display: "flex", gap: 8, marginBottom: 8, animation: "fadeUp 0.15s ease" }}>
            <label
              htmlFor="chat-image-input"
              className="ff-body"
              style={{ display: "flex", alignItems: "center", gap: 6, padding: "8px 12px", borderRadius: 12, border: `1px solid ${C.border}`, background: "#fff", fontSize: 12.5, color: C.inkSoft, cursor: "pointer" }}
            >
              <input id="chat-image-input" type="file" accept="image/*" style={{ display: "none" }} onChange={onPickImage} />
              <ImageIcon size={14} /> Upload image
            </label>
            <button
              onClick={() => setWebSearchOn((v) => !v)}
              className="ff-body"
              style={{
                display: "flex", alignItems: "center", gap: 6, padding: "8px 12px", borderRadius: 12,
                border: `1px solid ${webSearchOn ? C.sage : C.border}`, background: webSearchOn ? C.sageLight : "#fff",
                fontSize: 12.5, color: webSearchOn ? C.sageDark : C.inkSoft, fontWeight: webSearchOn ? 700 : 400, cursor: "pointer",
              }}
            >
              <Globe size={14} /> Web search {webSearchOn && "✓"}
            </button>
          </div>
        )}

        {attachedImage && (
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8, background: "#fff", border: `1px solid ${C.border}`, borderRadius: 12, padding: 6, width: "fit-content", animation: "fadeUp 0.15s ease" }}>
            <img src={attachedImage.url} alt={attachedImage.name} style={{ width: 34, height: 34, borderRadius: 8, objectFit: "cover" }} />
            <span className="ff-body" style={{ fontSize: 12, color: C.inkSoft, maxWidth: 140, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{attachedImage.name}</span>
            <button onClick={() => setAttachedImage(null)} style={{ background: "none", border: "none", cursor: "pointer", padding: 2 }}>
              <X size={13} color={C.inkFaint} />
            </button>
          </div>
        )}

        {micStatus === "error" && (
          <p className="ff-body" style={{ fontSize: 11.5, color: C.coral, margin: "0 0 6px", lineHeight: 1.4 }}>{micError}</p>
        )}

        {apiError && (
          <p className="ff-body" style={{ fontSize: 11.5, color: C.coral, margin: "0 0 6px", lineHeight: 1.4 }}>{apiError}</p>
        )}

        <div style={{ display: "flex", alignItems: "center", gap: 8, background: "#fff", border: `1.5px solid ${C.border}`, borderRadius: 20, padding: "8px 10px" }}>
          <button onClick={() => setPlusOpen((v) => !v)} style={{ background: plusOpen ? C.sageLight : "transparent", border: "none", borderRadius: "50%", width: 30, height: 30, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
            <Plus size={17} color={C.sageDark} style={{ transform: plusOpen ? "rotate(45deg)" : "none", transition: "transform 0.15s" }} />
          </button>
          <input
            value={input} onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && send()}
            placeholder={micStatus === "listening" ? "Listening…" : "Ask anything about your child…"}
            className="ff-body"
            style={{ flex: 1, border: "none", outline: "none", fontSize: 14, background: "transparent" }}
          />
          <button
            onClick={toggleMic}
            disabled={micStatus === "requesting"}
            style={{
              background: micStatus === "listening" || micStatus === "requesting" ? C.apricot : "transparent",
              border: "none", borderRadius: "50%", width: 30, height: 30, display: "flex", alignItems: "center", justifyContent: "center",
              cursor: "pointer", animation: micStatus === "listening" ? "pulseRing 1s ease-out infinite" : "none",
            }}
          >
            <Mic size={16} color={micStatus === "listening" || micStatus === "requesting" ? "#fff" : C.inkFaint} />
          </button>
          <button onClick={() => send()} disabled={!input.trim() && !attachedImage} style={{ background: (input.trim() || attachedImage) ? C.sage : C.border, border: "none", borderRadius: "50%", width: 32, height: 32, display: "flex", alignItems: "center", justifyContent: "center", cursor: (input.trim() || attachedImage) ? "pointer" : "default" }}>
            <Send size={14} color="#fff" />
          </button>
        </div>
      </div>

      {/* sidebar */}
      {sidebarOpen && (
        <div style={{ position: "absolute", inset: 0, zIndex: 20, display: "flex" }}>
          <div style={{ width: "78%", height: "100%", background: "#fff", borderRight: `1px solid ${C.border}`, display: "flex", flexDirection: "column", animation: "fadeUp 0.18s ease" }}>
            <div style={{ padding: "18px 16px 10px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <span className="ff-display" style={{ fontWeight: 600, fontSize: 15, color: C.ink }}>Chats</span>
              <button onClick={() => setSidebarOpen(false)} style={{ background: "none", border: "none", cursor: "pointer" }}><X size={18} color={C.inkSoft} /></button>
            </div>
            <div style={{ padding: "0 16px 12px" }}>
              <button className="ff-body" style={{ width: "100%", display: "flex", alignItems: "center", gap: 8, padding: "10px 12px", borderRadius: 12, border: "none", background: C.sageLight, color: C.sageDark, fontWeight: 600, fontSize: 13.5, cursor: "pointer" }}>
                <Plus size={15} /> New chat
              </button>
            </div>
            <div style={{ padding: "0 16px 8px", display: "flex", alignItems: "center", gap: 8, color: C.inkFaint }}>
              <Search size={14} />
              <span className="ff-body" style={{ fontSize: 12.5 }}>Search chats</span>
            </div>
            <div style={{ flex: 1, overflowY: "auto", padding: "6px 8px" }} className="scrollbar-hide">
              {history.map((h, i) => (
                <div key={i} className="ff-body" style={{ padding: "10px 12px", fontSize: 13, color: C.ink, borderRadius: 10, cursor: "pointer" }}>
                  {h}
                </div>
              ))}
            </div>
            <button
              onClick={() => { setSidebarOpen(false); setProfileOpen(true); }}
              className="ff-body"
              style={{ padding: 14, borderTop: `1px solid ${C.border}`, display: "flex", alignItems: "center", gap: 10, background: "none", border: "none", borderTopWidth: 1, borderTopStyle: "solid", borderTopColor: C.border, width: "100%", cursor: "pointer", textAlign: "left" }}
            >
              <div style={{ width: 32, height: 32, borderRadius: "50%", background: C.apricotSoft, display: "flex", alignItems: "center", justifyContent: "center", color: C.apricotDark, fontWeight: 700, fontSize: 13 }}>P</div>
              <div style={{ flex: 1 }}>
                <div className="ff-body" style={{ fontSize: 13, fontWeight: 600, color: C.ink }}>Parent account</div>
                <div className="ff-body" style={{ fontSize: 11, color: C.inkFaint }}>Free plan</div>
              </div>
              <Settings size={17} color={C.inkFaint} />
            </button>
          </div>
          <div onClick={() => setSidebarOpen(false)} style={{ flex: 1, background: "rgba(46,42,30,0.25)" }} />
        </div>
      )}

      {/* profile panel */}
      {profileOpen && (
        <div style={{ position: "absolute", inset: 0, zIndex: 30, background: "rgba(46,42,30,0.32)", display: "flex", alignItems: "flex-end" }}>
          <div style={{ width: "100%", background: "#fff", borderRadius: "24px 24px 0 0", padding: 22, animation: "fadeUp 0.2s ease" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 18 }}>
              <span className="ff-display" style={{ fontSize: 16, fontWeight: 600, color: C.ink }}>Your profile</span>
              <button onClick={() => setProfileOpen(false)} style={{ background: "none", border: "none", cursor: "pointer" }}><X size={18} color={C.inkSoft} /></button>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 18 }}>
              <div style={{ width: 48, height: 48, borderRadius: "50%", background: C.apricotSoft, display: "flex", alignItems: "center", justifyContent: "center", color: C.apricotDark, fontWeight: 700, fontSize: 17 }}>P</div>
              <div>
                <div className="ff-body" style={{ fontSize: 15, fontWeight: 700, color: C.ink }}>Parent account</div>
                <div className="ff-body" style={{ fontSize: 12, color: C.inkSoft }}>Free plan</div>
              </div>
            </div>
            <div style={{ background: C.sageLight, borderRadius: 14, padding: 12, display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
              <Mascot size={36} animate={false} />
              <div>
                <div className="ff-body" style={{ fontSize: 13, fontWeight: 700, color: C.sageDark }}>Caring for {profile.childName || "your child"}</div>
                <div className="ff-body" style={{ fontSize: 11.5, color: C.inkSoft }}>{profile.focus?.length ? profile.focus.join(" · ") : "Profile personalized"}</div>
              </div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
              {["Edit profile", "Notifications", "Privacy & data", "Log out"].map((item) => (
                <button key={item} className="ff-body" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "13px 4px", background: "none", border: "none", borderBottom: `1px solid ${C.border}`, fontSize: 13.5, color: item === "Log out" ? C.coral : C.ink, fontWeight: 600, cursor: "pointer" }}>
                  {item} <ChevronRight size={15} color={C.inkFaint} />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ---------------------------------- voice helpers ---------------------------------- */
let voicesWarmed = false;
function warmUpVoices() {
  if (voicesWarmed || typeof window === "undefined" || !window.speechSynthesis) return;
  voicesWarmed = true;
  window.speechSynthesis.getVoices();
  window.speechSynthesis.onvoiceschanged = () => window.speechSynthesis.getVoices();
}

function speakWord(text, { onStart, onEnd, onError } = {}) {
  try {
    if (!window.speechSynthesis) { onError && onError("Text-to-speech isn't supported in this browser."); return; }
    warmUpVoices();
    window.speechSynthesis.cancel();
    setTimeout(() => {
      const utter = new SpeechSynthesisUtterance(text);
      utter.rate = 0.85;
      utter.pitch = 1.1;
      utter.onstart = () => onStart && onStart();
      utter.onend = () => onEnd && onEnd();
      utter.onerror = () => onError && onError("Playback was blocked — check your device isn't on silent/mute.");
      window.speechSynthesis.speak(utter);
    }, 50);
  } catch (e) {
    onError && onError("Couldn't play sound in this browser.");
  }
}

// Shared mic capture: requests mic permission explicitly first (clearer errors),
// then runs SpeechRecognition. Surfaces precise reasons when it can't run —
// preview sandboxes commonly block microphone access at the iframe/permissions level.
function captureVoice({ onStatus, onResult, onError }) {
  const SR = typeof window !== "undefined" && (window.SpeechRecognition || window.webkitSpeechRecognition);
  if (!SR) { onError("Voice recognition isn't supported in this browser — try Chrome on desktop or Android."); return; }
  if (typeof window !== "undefined" && window.isSecureContext === false) {
    onError("Voice input needs a secure (https) connection to work.");
    return;
  }
  onStatus("requesting");
  try {
    const rec = new SR();
    rec.lang = "en-US";
    rec.interimResults = false;
    rec.maxAlternatives = 1;
    let settled = false;
    const finish = (fn) => { if (settled) return; settled = true; clearTimeout(timeoutId); fn(); };
    const timeoutId = setTimeout(() => {
      finish(() => {
        try { rec.stop(); } catch (e) {}
        onError("The microphone didn't respond. This preview may not have mic access enabled — try opening the app in its own browser tab instead of this embedded view.");
      });
    }, 6000);
    rec.onstart = () => onStatus("listening");
    rec.onresult = (e) => finish(() => onResult((e.results?.[0]?.[0]?.transcript || "").trim()));
    rec.onerror = (e) => finish(() => {
      const reason = e.error === "not-allowed" || e.error === "service-not-allowed"
        ? "Microphone access is blocked for this preview. Try opening the app in its own browser tab and allow the mic permission prompt there."
        : e.error === "network" ? "Voice recognition needs an internet connection."
        : e.error === "no-speech" ? "Didn't hear anything — try again a bit louder, closer to the mic."
        : e.error === "audio-capture" ? "No microphone was found on this device."
        : `Voice input didn't work (${e.error || "unknown error"}) — please try again.`;
      onError(reason);
    });
    rec.onend = () => finish(() => onError("No speech detected — try again."));
    rec.start();
  } catch (e) {
    onError("This browser couldn't start voice recognition.");
  }
}
function buildSystemPrompt(profile) {
  const lines = [
    "You are 'Companion', a warm, practical in-app chat assistant inside a parent-support app for children with autism or other developmental differences.",
    profile.childName ? `The parent's child is named ${profile.childName}${profile.childAge ? `, age ${profile.childAge}` : ""}${profile.childGender && profile.childGender !== "Prefer not to say" ? `, gender: ${profile.childGender}` : ""}.` : "",
    profile.focus && profile.focus.length ? `The parent is especially focused on: ${profile.focus.join(", ")}.` : "",
    profile.notes ? `Extra context the parent shared: ${profile.notes}` : "",
    "Keep replies short (roughly 2-5 sentences), specific, and actionable — not generic platitudes. Warm but not saccharine.",
    "You are not a licensed clinician. Never diagnose. For anything medical, urgent, or diagnostic, gently suggest the specialists listed in the app's Community tab.",
  ];
  return lines.filter(Boolean).join("\n");
}

function toApiHistory(msgs) {
  return msgs.map((m) => ({
    role: m.role === "user" ? "user" : "assistant",
    content: m.text || (m.image ? "[shared a photo]" : "…"),
  }));
}

/* ---------------------------------- SCREENING CHECKLIST (AQ-10-inspired) ---------------------------------- */
function ScreeningOverlay({ childName, onClose }) {
  const [step, setStep] = useState(0); // 0..9 questions, 10 = result
  const [answers, setAnswers] = useState([]);

  const answer = (val) => {
    const next = [...answers, val];
    setAnswers(next);
    setStep((s) => s + 1);
  };

  const restart = () => { setAnswers([]); setStep(0); };

  const score = answers.reduce((s, v) => s + v, 0);
  const flagged = score >= 6;
  const done = step >= SCREENING_QUESTIONS.length;

  return (
    <div style={{ position: "absolute", inset: 0, zIndex: 30, background: C.bg, display: "flex", flexDirection: "column" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 18px 6px" }}>
        <button onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer" }}><ArrowLeft size={20} color={C.ink} /></button>
        <span className="ff-display" style={{ fontSize: 15, fontWeight: 600, color: C.ink }}>Screening checklist</span>
        <div style={{ width: 20 }} />
      </div>

      {!done ? (
        <div style={{ flex: 1, display: "flex", flexDirection: "column", padding: 24 }}>
          <div style={{ display: "flex", gap: 4, marginBottom: 22 }}>
            {SCREENING_QUESTIONS.map((_, i) => (
              <div key={i} style={{ flex: 1, height: 5, borderRadius: 3, background: i <= step ? C.sage : C.border }} />
            ))}
          </div>
          <span className="ff-body" style={{ fontSize: 12, color: C.inkFaint, fontWeight: 700, marginBottom: 8 }}>
            QUESTION {step + 1} OF {SCREENING_QUESTIONS.length}
          </span>
          <p className="ff-display" style={{ fontSize: 19, color: C.ink, fontWeight: 600, lineHeight: 1.4, margin: "0 0 30px" }}>
            {SCREENING_QUESTIONS[step]}
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: "auto" }}>
            <button onClick={() => answer(1)} className="ff-body" style={{ padding: "14px 18px", borderRadius: 14, border: `1.5px solid ${C.sage}`, background: C.sageLight, color: C.sageDark, fontWeight: 700, fontSize: 14, cursor: "pointer", textAlign: "left" }}>
              Yes, that's often true
            </button>
            <button onClick={() => answer(0)} className="ff-body" style={{ padding: "14px 18px", borderRadius: 14, border: `1.5px solid ${C.border}`, background: "#fff", color: C.inkSoft, fontWeight: 700, fontSize: 14, cursor: "pointer", textAlign: "left" }}>
              No, rarely or not true
            </button>
          </div>
        </div>
      ) : (
        <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 24, gap: 14, textAlign: "center" }}>
          <Mascot size={72} mood="neutral" animate={false} />
          <span className="ff-display" style={{ fontSize: 32, fontWeight: 700, color: C.ink }}>{score}<span style={{ fontSize: 16, color: C.inkFaint, fontWeight: 500 }}> / {SCREENING_QUESTIONS.length}</span></span>
          <p className="ff-body" style={{ fontSize: 14, color: C.inkSoft, lineHeight: 1.6, maxWidth: 280 }}>
            {flagged
              ? `A score of 6 or higher is often used as a cue to look closer. This isn't a diagnosis — it just suggests a full evaluation with a specialist could be worthwhile for ${childName || "your child"}.`
              : `Scores below 6 don't usually prompt further screening on their own — but trust your instincts as a parent. If something still feels off, a specialist visit is always a reasonable next step.`}
          </p>
          <div style={{ background: C.apricotSoft, borderRadius: 12, padding: 12, maxWidth: 280 }}>
            <p className="ff-body" style={{ fontSize: 11.5, color: C.apricotDark, margin: 0, lineHeight: 1.5 }}>
              This is an informal, non-diagnostic checklist inspired by common developmental screening questions — not the official clinical AQ-10 tool, and not a substitute for a professional evaluation.
            </p>
          </div>
          <div style={{ display: "flex", gap: 10, marginTop: 8 }}>
            <button onClick={restart} className="ff-body" style={{ padding: "10px 18px", borderRadius: 999, border: `1.5px solid ${C.border}`, background: "#fff", color: C.inkSoft, fontWeight: 700, fontSize: 13, cursor: "pointer" }}>
              Retake
            </button>
            <button onClick={onClose} className="ff-body" style={{ padding: "10px 18px", borderRadius: 999, border: "none", background: C.sage, color: "#fff", fontWeight: 700, fontSize: 13, cursor: "pointer" }}>
              Done
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function SpeechPracticeOverlay({ onClose }) {
  const [current, setCurrent] = useState(0);
  const [status, setStatus] = useState("idle"); // idle | speaking | requesting | listening | success | retry
  const [stars, setStars] = useState(0);
  const [errorMsg, setErrorMsg] = useState("");
  const word = PRACTICE_WORDS[current];

  useEffect(() => { warmUpVoices(); }, []);

  const speak = () => {
    setErrorMsg("");
    speakWord(word.word, {
      onStart: () => setStatus("speaking"),
      onEnd: () => setStatus((s) => (s === "speaking" ? "idle" : s)),
      onError: (msg) => { setErrorMsg(msg); setStatus("idle"); },
    });
  };

  const handleSuccess = () => {
    setStatus("success");
    setErrorMsg("");
    setStars((s) => s + 1);
    setTimeout(() => {
      setStatus("idle");
      setCurrent((c) => (c + 1) % PRACTICE_WORDS.length);
    }, 1200);
  };

  const listen = () => {
    if (status === "listening" || status === "requesting") return;
    setErrorMsg("");
    captureVoice({
      onStatus: (s) => setStatus(s),
      onResult: (said) => { said.toLowerCase().includes(word.word.toLowerCase()) ? handleSuccess() : setStatus("retry"); },
      onError: (msg) => { setErrorMsg(msg); setStatus("retry"); },
    });
  };

  return (
    <div style={{ position: "absolute", inset: 0, zIndex: 25, background: C.bg, display: "flex", flexDirection: "column" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 18px 6px" }}>
        <button onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer" }}><ArrowLeft size={20} color={C.ink} /></button>
        <span className="ff-display" style={{ fontSize: 15, fontWeight: 600, color: C.ink }}>Say it with me!</span>
        <div className="ff-body" style={{ fontSize: 12.5, fontWeight: 700, color: C.apricotDark }}>★ {stars}</div>
      </div>

      <div style={{ display: "flex", justifyContent: "center", gap: 6, padding: "8px 0 4px" }}>
        {PRACTICE_WORDS.map((w, i) => (
          <div key={w.word} style={{ width: 8, height: 8, borderRadius: "50%", background: i === current ? C.sage : i < current ? C.sageLight : C.border }} />
        ))}
      </div>

      <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 24, gap: 16 }}>
        <div style={{ animation: status === "success" ? "wiggle 0.4s ease 2" : status === "speaking" ? "mascotBounce 0.5s ease-in-out infinite" : "none" }}>
          <Mascot size={84} mood={status === "success" ? "happy" : "neutral"} />
        </div>

        <div style={{
          background: "#fff", border: `2px solid ${status === "speaking" ? C.apricot : C.border}`, borderRadius: 22, padding: "22px 40px",
          display: "flex", flexDirection: "column", alignItems: "center", gap: 6, minWidth: 200, transition: "border-color 0.2s",
        }}>
          <span style={{ fontSize: 40 }}>{word.emoji}</span>
          <span className="ff-display" style={{ fontSize: 24, fontWeight: 600, color: C.ink }}>{word.word}</span>
        </div>

        <button onClick={speak} className="ff-body" style={{
          display: "flex", alignItems: "center", gap: 8, padding: "10px 20px", borderRadius: 999,
          border: `1.5px solid ${C.sage}`, background: status === "speaking" ? C.sage : C.sageLight,
          color: status === "speaking" ? "#fff" : C.sageDark, fontWeight: 700, fontSize: 13.5, cursor: "pointer",
        }}>
          {status === "speaking" ? "🔊 Playing…" : "🔊 Hear it"}
        </button>

        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 10, marginTop: 4 }}>
          <button
            onClick={listen}
            disabled={status === "listening" || status === "requesting"}
            style={{
              width: 76, height: 76, borderRadius: "50%", border: "none",
              cursor: status === "listening" || status === "requesting" ? "default" : "pointer",
              background: status === "success" ? C.sage : (status === "listening" || status === "requesting") ? C.apricot : C.apricotSoft,
              display: "flex", alignItems: "center", justifyContent: "center",
              animation: status === "listening" || status === "requesting" ? "pulseRing 1s ease-out infinite" : "none",
              transition: "background 0.3s",
            }}
          >
            {status === "success" ? <Check size={30} color="#fff" /> : <Mic size={28} color={status === "listening" || status === "requesting" ? "#fff" : C.apricotDark} />}
          </button>
          <span className="ff-body" style={{ fontSize: 13.5, fontWeight: 600, color: status === "retry" ? C.coral : C.inkSoft, textAlign: "center" }}>
            {status === "requesting" ? "Asking for mic access…" : status === "listening" ? "Listening…" : status === "success" ? "Great job! 🎉" : status === "retry" ? "Almost — tap and try again!" : "Tap the mic and say the word"}
          </span>
          {errorMsg && (
            <div style={{ maxWidth: 260, textAlign: "center" }}>
              <p className="ff-body" style={{ fontSize: 11.5, color: C.coral, margin: "0 0 6px", lineHeight: 1.5 }}>{errorMsg}</p>
              <button onClick={handleSuccess} className="ff-body" style={{ fontSize: 12, fontWeight: 700, color: C.sageDark, background: C.sageLight, border: "none", borderRadius: 999, padding: "6px 14px", cursor: "pointer" }}>
                Mark as said it ✓
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ---------------------------------- ACTIVITIES TAB ---------------------------------- */
function ActivitiesTab() {
  const [activities, setActivities] = useState(DEFAULT_ACTIVITIES);
  const [newTitle, setNewTitle] = useState("");
  const [practiceOpen, setPracticeOpen] = useState(false);

  const toggleDone = (id) => setActivities((a) => a.map((x) => x.id === id ? { ...x, done: !x.done, streak: !x.done ? x.streak + 1 : Math.max(0, x.streak - 1) } : x));
  const addActivity = () => {
    if (!newTitle.trim()) return;
    setActivities((a) => [...a, { id: Date.now(), title: newTitle.trim(), subtitle: "Custom activity", icon: Star, done: false, streak: 0 }]);
    setNewTitle("");
  };

  return (
    <div style={{ height: "100%", overflowY: "auto", padding: "18px 18px 24px", position: "relative" }} className="scrollbar-hide">
      <h1 className="ff-display" style={{ fontSize: 19, color: C.ink, fontWeight: 600, margin: "0 0 3px" }}>Today's activities</h1>
      <p className="ff-body" style={{ fontSize: 13, color: C.inkSoft, margin: "0 0 18px" }}>Tap to mark what you got through today.</p>

      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {activities.map((a) => {
          const Icon = a.icon;
          const isPractice = a.id === 1;
          return (
            <div
              key={a.id}
              onClick={() => isPractice && setPracticeOpen(true)}
              style={{
                display: "flex", alignItems: "center", gap: 12, background: "#fff", border: `1px solid ${C.border}`,
                borderRadius: 16, padding: 12, cursor: isPractice ? "pointer" : "default",
              }}
            >
              <div style={{ width: 40, height: 40, borderRadius: 12, background: a.done ? C.sageLight : C.apricotSoft, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <Icon size={18} color={a.done ? C.sageDark : C.apricotDark} />
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div className="ff-body" style={{ fontSize: 14, fontWeight: 600, color: C.ink }}>{a.title}</div>
                <div className="ff-body" style={{ fontSize: 12, color: C.inkSoft, display: "flex", alignItems: "center", gap: 4 }}>
                  {a.subtitle} <span style={{ color: C.inkFaint }}>·</span> <Flame size={11} color={C.apricotDark} /> {a.streak}d streak
                  {isPractice && <span className="ff-body" style={{ color: C.sageDark, fontWeight: 700 }}>· Tap to practice</span>}
                </div>
              </div>
              <button onClick={(e) => { e.stopPropagation(); toggleDone(a.id); }} style={{
                width: 26, height: 26, borderRadius: "50%", border: `1.5px solid ${a.done ? C.sage : C.border}`,
                background: a.done ? C.sage : "#fff", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", flexShrink: 0,
              }}>
                {a.done && <Check size={14} color="#fff" />}
              </button>
            </div>
          );
        })}
      </div>

      {practiceOpen && <SpeechPracticeOverlay onClose={() => setPracticeOpen(false)} />}

      <div style={{ marginTop: 20, display: "flex", gap: 8 }}>
        <div style={{ flex: 1 }}>
          <TextField placeholder="Add your own activity…" value={newTitle} onChange={(e) => setNewTitle(e.target.value)} onKeyDown={(e) => e.key === "Enter" && addActivity()} />
        </div>
        <button onClick={addActivity} style={{ width: 46, borderRadius: 14, border: "none", background: C.sage, color: "#fff", cursor: "pointer" }}>
          <Plus size={18} style={{ margin: "0 auto" }} />
        </button>
      </div>
    </div>
  );
}

/* ---------------------------------- COMMUNITY TAB ---------------------------------- */
function CommunityTab() {
  const [posts, setPosts] = useState(INITIAL_POSTS);
  const [composerOpen, setComposerOpen] = useState(false);
  const [draft, setDraft] = useState("");

  const post = () => {
    if (!draft.trim()) return;
    setPosts((p) => [{ id: Date.now(), author: "You", verified: false, role: "Parent", title: "New post", body: draft.trim(), likes: 0, time: "now" }, ...p]);
    setDraft("");
    setComposerOpen(false);
  };

  return (
    <div style={{ height: "100%", overflowY: "auto", padding: "18px 18px 24px" }} className="scrollbar-hide">
      <h1 className="ff-display" style={{ fontSize: 19, color: C.ink, fontWeight: 600, margin: "0 0 3px" }}>Community</h1>
      <p className="ff-body" style={{ fontSize: 13, color: C.inkSoft, margin: "0 0 16px" }}>Stories and guidance from parents and verified specialists.</p>

      <div className="ff-body" style={{ fontSize: 12.5, fontWeight: 700, color: C.inkSoft, marginBottom: 8 }}>SPECIALISTS NEAR YOU</div>
      <div className="scrollbar-hide" style={{ display: "flex", gap: 10, overflowX: "auto", paddingBottom: 6, marginBottom: 20 }}>
        {DOCTORS.map((d, i) => (
          <div key={i} style={{ minWidth: 160, background: "#fff", border: `1px solid ${C.border}`, borderRadius: 16, padding: 12, flexShrink: 0 }}>
            <div style={{ width: 34, height: 34, borderRadius: "50%", background: C.sageLight, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 8 }}>
              <User size={16} color={C.sageDark} />
            </div>
            <div className="ff-body" style={{ fontSize: 13, fontWeight: 700, color: C.ink }}>{d.name}</div>
            <div className="ff-body" style={{ fontSize: 11.5, color: C.inkSoft, marginBottom: 6 }}>{d.role}</div>
            <div className="ff-body" style={{ fontSize: 11, color: C.inkFaint, display: "flex", alignItems: "center", gap: 4 }}>
              <MapPin size={11} /> {d.distance} <span>·</span> <Star size={11} color={C.apricotDark} /> {d.rating}
            </div>
          </div>
        ))}
      </div>

      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
        <span className="ff-body" style={{ fontSize: 12.5, fontWeight: 700, color: C.inkSoft }}>STORIES & GUIDANCE</span>
        <button onClick={() => setComposerOpen((v) => !v)} className="ff-body" style={{ fontSize: 12, color: C.sageDark, fontWeight: 700, background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: 4 }}>
          <Plus size={13} /> Share
        </button>
      </div>

      {composerOpen && (
        <div style={{ marginBottom: 14, background: "#fff", border: `1px solid ${C.border}`, borderRadius: 14, padding: 10 }}>
          <textarea value={draft} onChange={(e) => setDraft(e.target.value)} placeholder="Share what's working (or what's hard) this week…" className="ff-body" style={{ width: "100%", minHeight: 60, border: "none", outline: "none", fontSize: 13.5, resize: "none" }} />
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <button onClick={post} className="ff-body" style={{ background: C.sage, color: "#fff", border: "none", borderRadius: 10, padding: "6px 14px", fontSize: 12.5, fontWeight: 600, cursor: "pointer" }}>Post</button>
          </div>
        </div>
      )}

      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {posts.map((p) => (
          <div key={p.id} style={{ background: "#fff", border: `1px solid ${C.border}`, borderRadius: 16, padding: 14 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 6 }}>
              <span className="ff-body" style={{ fontSize: 13, fontWeight: 700, color: C.ink }}>{p.author}</span>
              {p.verified && <Award size={13} color={C.sageDark} />}
              <span className="ff-body" style={{ fontSize: 11.5, color: C.inkFaint }}>· {p.role} · {p.time}</span>
            </div>
            <div className="ff-body" style={{ fontSize: 14, fontWeight: 600, color: C.ink, marginBottom: 4 }}>{p.title}</div>
            <p className="ff-body" style={{ fontSize: 13, color: C.inkSoft, lineHeight: 1.5, margin: "0 0 8px" }}>{p.body}</p>
            <div className="ff-body" style={{ fontSize: 12, color: C.inkFaint }}>♥ {p.likes}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------------------------------- PROGRESS TAB ---------------------------------- */
function ProgressTab({ childName }) {
  const [report, setReport] = useState(false);
  const [screeningOpen, setScreeningOpen] = useState(false);
  const totalActivities = WEEK_DATA.reduce((s, d) => s + d.count, 0);
  const bestDay = WEEK_DATA.reduce((a, b) => (b.count > a.count ? b : a));

  return (
    <div style={{ height: "100%", overflowY: "auto", padding: "18px 18px 24px", position: "relative" }} className="scrollbar-hide">
      <h1 className="ff-display" style={{ fontSize: 19, color: C.ink, fontWeight: 600, margin: "0 0 3px" }}>Progress tracker</h1>
      <p className="ff-body" style={{ fontSize: 13, color: C.inkSoft, margin: "0 0 16px" }}>{childName || "This week"}'s activity over the last 7 days.</p>

      <button
        onClick={() => setScreeningOpen(true)}
        className="ff-body"
        style={{
          width: "100%", display: "flex", alignItems: "center", gap: 12, textAlign: "left", cursor: "pointer",
          background: `linear-gradient(135deg, ${C.apricotSoft}, ${C.sageLight})`, border: `1px solid ${C.border}`,
          borderRadius: 16, padding: 14, marginBottom: 16,
        }}
      >
        <div style={{ width: 38, height: 38, borderRadius: 12, background: "#fff", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
          <ClipboardList size={18} color={C.sageDark} />
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 13.5, fontWeight: 700, color: C.ink }}>Not sure where to start?</div>
          <div style={{ fontSize: 11.5, color: C.inkSoft }}>Take a quick 10-question screening checklist</div>
        </div>
        <ChevronRight size={16} color={C.inkFaint} />
      </button>

      <div style={{ background: "#fff", border: `1px solid ${C.border}`, borderRadius: 16, padding: "14px 8px 6px", marginBottom: 16, height: 180 }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={WEEK_DATA} margin={{ top: 0, right: 8, left: -20, bottom: 0 }}>
            <CartesianGrid vertical={false} stroke={C.border} />
            <XAxis dataKey="day" tick={{ fontSize: 11, fill: C.inkSoft }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 11, fill: C.inkSoft }} axisLine={false} tickLine={false} allowDecimals={false} />
            <Bar dataKey="count" radius={[6, 6, 0, 0]}>
              {WEEK_DATA.map((d, i) => (
                <Cell key={i} fill={d.day === bestDay.day ? C.sage : C.apricotSoft} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 18 }}>
        <div style={{ background: C.sageLight, borderRadius: 14, padding: 12 }}>
          <div className="ff-display" style={{ fontSize: 20, fontWeight: 600, color: C.sageDark }}>{totalActivities}</div>
          <div className="ff-body" style={{ fontSize: 11.5, color: C.inkSoft }}>Activities this week</div>
        </div>
        <div style={{ background: C.apricotSoft, borderRadius: 14, padding: 12 }}>
          <div className="ff-display" style={{ fontSize: 20, fontWeight: 600, color: C.apricotDark }}>{bestDay.day}</div>
          <div className="ff-body" style={{ fontSize: 11.5, color: C.inkSoft }}>Most consistent day</div>
        </div>
      </div>

      {!report ? (
        <PrimaryButton onClick={() => setReport(true)} style={{ background: C.ink }}>
          <FileText size={15} /> Generate weekly report
        </PrimaryButton>
      ) : (
        <div style={{ background: "#fff", border: `1px solid ${C.border}`, borderRadius: 16, padding: 16, animation: "fadeUp 0.25s ease" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 8 }}>
            <FileText size={15} color={C.sageDark} />
            <span className="ff-body" style={{ fontSize: 13, fontWeight: 700, color: C.ink }}>Weekly summary</span>
          </div>
          <p className="ff-body" style={{ fontSize: 13, color: C.inkSoft, lineHeight: 1.6, margin: 0 }}>
            {childName || "Your child"} completed {totalActivities} activities this week, with {bestDay.day} being the strongest day.
            Speaking Practice and Eating Independently show the longest streaks — consider keeping their timing consistent next week,
            and gently reintroducing Eye Contact Games on lower-activity days.
          </p>
        </div>
      )}

      {screeningOpen && <ScreeningOverlay childName={childName} onClose={() => setScreeningOpen(false)} />}
    </div>
  );
}
/* ---------------------------------- MAIN APP SHELL ---------------------------------- */
function MainApp({ profile }) {
  const [tab, setTab] = useState("chat");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const tabs = [
    { id: "chat", label: "Chat", icon: MessageCircle },
    { id: "activities", label: "Activities", icon: Activity },
    { id: "community", label: "Community", icon: Users },
    { id: "progress", label: "Progress", icon: TrendingUp },
  ];

  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column", background: C.bg }}>
      <div style={{ flex: 1, minHeight: 0 }}>
        {tab === "chat" && <ChatTab profile={profile} sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />}
        {tab === "activities" && <ActivitiesTab />}
        {tab === "community" && <CommunityTab />}
        {tab === "progress" && <ProgressTab childName={profile.childName} />}
      </div>
      <div style={{ display: "flex", borderTop: `1px solid ${C.border}`, background: "#fff", padding: "8px 6px" }}>
        {tabs.map((t) => {
          const Icon = t.icon;
          const active = tab === t.id;
          return (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 3, padding: "6px 0", background: "none", border: "none", cursor: "pointer" }}
            >
              <Icon size={19} color={active ? C.sageDark : C.inkFaint} strokeWidth={active ? 2.4 : 2} />
              <span className="ff-body" style={{ fontSize: 10.5, fontWeight: active ? 700 : 500, color: active ? C.sageDark : C.inkFaint }}>{t.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* ---------------------------------- ROOT ---------------------------------- */
export default function App() {
  const [phase, setPhase] = useState("login"); // login -> onboarding -> personalizing -> main
  const [profile, setProfile] = useState({ childName: "", childAge: "", childGender: "", focus: [], notes: "" });

  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(160deg, #DCF2DA 0%, #FCEFC8 45%, #DFF3DE 100%)", display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
      {FONTS}
      <div style={{
        width: 390, height: 780, background: C.bg, borderRadius: 40, overflow: "hidden",
        boxShadow: "0 30px 60px rgba(46,42,30,0.2), 0 0 0 10px #2A2A1E",
        position: "relative",
      }}>
        {phase === "login" && <LoginFlow onDone={() => setPhase("onboarding")} />}
        {phase === "onboarding" && <OnboardingFlow onDone={(p) => { setProfile(p); setPhase("personalizing"); }} />}
        {phase === "personalizing" && <PersonalizingScreen childName={profile.childName} onDone={() => setPhase("main")} />}
        {phase === "main" && <MainApp profile={profile} />}
      </div>
    </div>
  );
}
