export type ProjectCategory =
  | "Native game ports"
  | "Port infrastructure"
  | "Developer tools"
  | "Desktop & Linux";

export type ProjectStatus = "Playable" | "In development" | "Framework" | "Tooling" | "Application";

export interface Project {
  slug: string;
  name: string;
  eyebrow: string;
  category: ProjectCategory;
  status: ProjectStatus;
  summary: string;
  narrative: string;
  features: string[];
  languages: string[];
  github: string;
  liveUrl?: string;
  featured?: boolean;
}

export interface CategoryDefinition {
  name: ProjectCategory;
  short: string;
  description: string;
  accent: string;
}

export const categories: CategoryDefinition[] = [
  {
    name: "Native game ports",
    short: "Ports",
    description: "Rebuilt engines, static recompilation, and faithful host-native releases.",
    accent: "#ff6b35",
  },
  {
    name: "Port infrastructure",
    short: "Infrastructure",
    description: "Reusable runtimes, recompilers, assets, and verification machinery.",
    accent: "#8ee3ef",
  },
  {
    name: "Developer tools",
    short: "Tools",
    description: "Utilities for coding, remote work, and evidence-aware development.",
    accent: "#d7f171",
  },
  {
    name: "Desktop & Linux",
    short: "Apps",
    description: "Focused native-backed applications and desktop integrations.",
    accent: "#b8a1ff",
  },
];

export const categoryByName = Object.fromEntries(
  categories.map((category) => [category.name, category]),
) as Record<ProjectCategory, CategoryDefinition>;

export const projects: Project[] = [
  {
    slug: "benefactor",
    name: "Benefactor",
    eyebrow: "Amiga engine port",
    category: "Native game ports",
    status: "Playable",
    summary:
      "A native PC port of the 1994 Amiga game, combining a hand-written C engine with subsystem-by-subsystem M68K recompilation.",
    narrative:
      "A native renderer and host systems recover the game beyond its original 320-pixel window, while a differential PUAE harness keeps the moving-overlay recompiler grounded.",
    features: [
      "True 16:9, 21:9, and live auto-aspect widescreen",
      "Native renderer, blitter, Paula audio mixer, disk loader, and overlay loader",
      "Instant boot and disk loading from player-supplied images",
      "Pause, options, level select, progress tracking, and difficulty selection",
      "Hot-pluggable controllers, rebinding, modern controls, and free camera",
      "Asset-free AppImage and Android first-run setup",
    ],
    languages: ["C", "Python", "CMake", "SDL", "GLSL", "Android"],
    github: "https://github.com/SomeoneIsWorking/benefactor",
    featured: true,
  },
  {
    slug: "sunbright",
    name: "Sunbright",
    eyebrow: "Super Mario Sunshine, native",
    category: "Native game ports",
    status: "In development",
    summary:
      "A PC-native Sunshine port with static-recompilation and decompilation runtimes converging on one semantic renderer.",
    narrative:
      "Sunbright keeps two execution paths diffable while progressively replacing console rendering with a renderer-neutral scene interface and a native host presentation layer.",
    features: [
      "Static-recomp runtime renders all 24 selectable stages through Aurora",
      "Native decomp runtime renders title, file select, and Delfino gameplay flow",
      "Shared renderer-neutral scene interface across both runtimes",
      "Native UI ordering and several J3D material families",
      "Interpolated presentation plus native 60 Hz and match-refresh modes",
      "Graphics census, differential checks, and A/B fallback paths",
    ],
    languages: ["C++", "C", "Python", "SDL3", "WebGPU", "RmlUi"],
    github: "https://github.com/SomeoneIsWorking/sunbright",
    featured: true,
  },
  {
    slug: "adventures-of-mana",
    name: "Adventures of Mana",
    eyebrow: "From-scratch engine port",
    category: "Native game ports",
    status: "Playable",
    summary:
      "A C++20 PC port reconstructed from the shipping Android engine—without emulation or redistributed game assets.",
    narrative:
      "The project rebuilds the game around native room loading, collision, combat, dialogue, scripting, and portable rendering while keeping the original data as the source of truth.",
    features: [
      "Loads all 993 rooms with meshes, textures, collision, objects, and scripts",
      "Movement, floor queries, wall-sliding collision, and bidirectional combat",
      "English and Japanese dialogue with original control codes",
      "All 200 Lua engine command bindings implemented natively",
      "Portable SPIR-V, DXIL, and MSL shaders through SDL3 GPU",
    ],
    languages: ["C++20", "SDL3 GPU", "Lua 5.3", "HLSL", "Python"],
    github: "https://github.com/SomeoneIsWorking/AdventuresOfMana",
    featured: true,
  },
  {
    slug: "dusklight",
    name: "Dusklight",
    eyebrow: "Twilight Princess reimplementation",
    category: "Native game ports",
    status: "Playable",
    summary:
      "A reverse-engineered desktop and mobile reimplementation of The Legend of Zelda: Twilight Princess.",
    narrative:
      "Dusklight treats modern host architecture and runtime modding as first-class responsibilities while retaining support for player-owned GameCube and Wii releases.",
    features: [
      "Supports commercial GameCube and Wii discs except the Korean Wii release",
      "D3D12, Vulkan, and Metal rendering through WebGPU/Aurora",
      "Windows, Linux, macOS, Android, and iOS-oriented support",
      "Runtime-loadable .dusk mods with file and texture overlays",
      "Function hooks and mod UI extensions",
      "Live mod enable, disable, and reload",
    ],
    languages: ["C++", "C", "CMake", "WebGPU", "Aurora"],
    github: "https://github.com/TwilitRealm/dusklight",
    featured: true,
  },
  {
    slug: "zelda3d",
    name: "Zelda3D",
    eyebrow: "3DS-remake asset bridge",
    category: "Native game ports",
    status: "In development",
    summary:
      "Runs the Ocarina of Time and Majora’s Mask PC ports with the 3DS remakes’ assets and presentation.",
    narrative:
      "A unified host bridges the established PC ports with 3DS models, animation, scenes, lighting, cameras, and collision, backed by an embedded reference core.",
    features: [
      "Unified chooser for both 3DS Zelda remakes",
      "Direct CMB, CSAB, ZAR, ZSI, CMAB, and .faceb support",
      "PICA200 combiners, multi-texturing, lighting, and fog",
      "Camera behavior derived from the 3DS games",
      "Embedded Azahar core for measured comparisons",
      "No-terminal AppImage setup with ROM or bounded ZIP selection",
    ],
    languages: ["C", "C++", "Python", "Ship of Harkinian", "Azahar"],
    github: "https://github.com/SomeoneIsWorking/zelda3d",
    featured: true,
  },
  {
    slug: "xmen2-recomp",
    name: "X-Men Legends II",
    eyebrow: "Native PC static recompilation",
    category: "Native game ports",
    status: "Playable",
    summary:
      "A Wine-free native port of the 2005 PC release built with x86-to-C recompilation and native subsystem replacements.",
    narrative:
      "The port lifts the original program into native code, then replaces host-facing responsibilities with portable systems for presentation, input, saves, and UI.",
    features: [
      "Native Linux x86-64 and Apple Silicon execution",
      "Controller hot-plug and persistent player assignment",
      "Xbox/PS2-style defaults with source-aware prompts",
      "Window, aspect-fit, and live presentation controls",
      "Native cutscene skipping",
      "Transactional autosave and direct Continue restore",
    ],
    languages: ["C", "C++", "Python", "SDL3", "Vulkan", "RmlUi"],
    github: "https://github.com/SomeoneIsWorking/xmen2-recomp",
    featured: true,
  },
  {
    slug: "lf2-port",
    name: "LF2 Port",
    eyebrow: "Little Fighter 2, native",
    category: "Native game ports",
    status: "Playable",
    summary:
      "A playable Linux and macOS port of Little Fighter 2 v2.0a produced through static recompilation.",
    narrative:
      "LF2 Port carries the full play loop into a native host and adds the presentation, input, settings, and packaging expected from a desktop release.",
    features: [
      "Menus, character selection, VS, and Stage Mode",
      "Sound effects and WMA background music",
      "True widescreen and ultrawide world views",
      "Two-player controller support with hot-plugging",
      "Remappable keyboard and controller input",
      "In-game settings and a graphical AppImage updater",
    ],
    languages: ["C", "C++", "Python", "SDL3", "RmlUi", "SDL GPU"],
    github: "https://github.com/SomeoneIsWorking/lf2-port",
  },
  {
    slug: "tomba2-engine",
    name: "Tomba Engine",
    eyebrow: "Clean-room PSX engine",
    category: "Native game ports",
    status: "In development",
    summary:
      "A clean C++ reimplementation of the Tomba! 2 engine using the original disc’s content rather than emulation.",
    narrative:
      "The engine owns world, objects, camera, projection, renderer, and UI semantically, while a reference recompilation path stays available for exact comparisons.",
    features: [
      "Native free-roam fields, caves, arenas, menus, and dialogue",
      "Renderer built from semantic game state",
      "Real per-pixel depth instead of ordering-table transcription",
      "Higher internal resolutions and widescreen",
      "Native world, object, camera, projection, and UI ownership",
      "Reference recompilation path for differential comparison",
    ],
    languages: ["C++", "C", "Python", "SDL3", "Vulkan", "psxport"],
    github: "https://github.com/SomeoneIsWorking/Tomba2Engine",
  },
  {
    slug: "crash-bash",
    name: "Crash Bash",
    eyebrow: "Native PlayStation port",
    category: "Native game ports",
    status: "Playable",
    summary:
      "A PC-native PlayStation port with live, controllable Crashball and Crate Crush modes.",
    narrative:
      "Native arena, character, item, ball, briefing, and HUD producers drive a wider host presentation while keeping the authored 4:3 screens intact.",
    features: [
      "Playable Crashball matches",
      "Battle Mode and Tournament Crate Crush matches",
      "Native gameplay and HUD producers",
      "Wider gameplay camera with authored screens preserved",
      "Optional interpolated presentation between game ticks",
      "Fresh-clone provisioning from a player-owned disc",
    ],
    languages: ["C++", "Python", "Java", "SDL3", "Vulkan", "psxport"],
    github: "https://github.com/SomeoneIsWorking/crashbash",
  },
  {
    slug: "gears1",
    name: "GearsUE3",
    eyebrow: "Xbox 360 static recompilation",
    category: "Native game ports",
    status: "In development",
    summary:
      "A PC-native static-recompilation port of Xbox 360 Gears of War, with the first game as the live target.",
    narrative:
      "The project brings a UE3 Xbox 360 title into a controllable native Vulkan host, from startup movies and menus through the first act.",
    features: [
      "Boots through startup movies and the main menu into Act 1",
      "Controller, keyboard, and reproducible scripted input",
      "Renders the game’s menus, HUD, and 3D world",
      "End-to-end XMA audio playback",
      "Stable extended execution at roughly 30 fps",
      "Loopback debug API for input, screenshots, and counters",
    ],
    languages: ["C++", "Python", "Vulkan", "SDL3", "XenonRecomp"],
    github: "https://github.com/SomeoneIsWorking/gears1",
  },
  {
    slug: "psxport",
    name: "psxport",
    eyebrow: "PlayStation porting framework",
    category: "Port infrastructure",
    status: "Framework",
    summary:
      "A reusable static-recompilation and native-hybrid framework for turning PlayStation games into native PC ports.",
    narrative:
      "psxport provides the CPU translation, native console services, renderer, extraction tools, and differential harness behind a growing family of ports.",
    features: [
      "MIPS R3000A-to-C static recompiler",
      "Native GPU, SPU, GTE, MDEC, CD/XA/FMV, and BIOS services",
      "Side-by-side lockstep differential comparison",
      "SDL GPU native renderer",
      "Game-agnostic runtime interface and static library",
      "Disc and CHD extraction tools",
    ],
    languages: ["C++", "C", "Python", "SDL3", "SDL GPU", "Vulkan"],
    github: "https://github.com/SomeoneIsWorking/psxport",
    featured: true,
  },
  {
    slug: "recomp-x86",
    name: "recomp-x86",
    eyebrow: "x86-32 to C translator",
    category: "Port infrastructure",
    status: "Framework",
    summary:
      "A shared x86-32-to-C static recompiler with a Ghidra front end and fail-closed porting checks.",
    narrative:
      "The tool emits generated C and the boundaries around it—dispatch, overrides, exports, thunks, stale-input detection, and impact-ranked gaps.",
    features: [
      "Translates x86-32 functions into generated C",
      "Generates dispatch, override, export, and thunk layers",
      "Ranks unsupported instructions by blocked-function impact",
      "Embeds input hashes to detect stale output",
      "Verifies PE export layout and guest stack balance",
      "Supports hosted DLL-in-Wine analysis mode",
    ],
    languages: ["Python", "Ghidra", "Jython", "Generated C", "PE"],
    github: "https://github.com/SomeoneIsWorking/recomp-x86",
  },
  {
    slug: "lucent",
    name: "Lucent",
    eyebrow: "Portable C++ infrastructure",
    category: "Port infrastructure",
    status: "Framework",
    summary:
      "A C++20 library providing one path for logging, configuration, local control, user data, touch, and safe content installation.",
    narrative:
      "Lucent keeps cross-project runtime responsibilities in one tested owner so individual ports can focus on title-specific behavior.",
    features: [
      "Thread-safe logging with redirectable sinks and named channels",
      "Cached prefix-aware environment configuration",
      "Concurrent loopback-only HTTP control server",
      "Cross-platform application user-data resolution",
      "Touch input and platform lifecycle support",
      "Bounded, failure-atomic ZIP installation",
    ],
    languages: ["C++20", "CMake", "Sockets", "Filesystems", "zlib"],
    github: "https://github.com/SomeoneIsWorking/lucent",
    featured: true,
  },
  {
    slug: "alchemy",
    name: "Alchemy",
    eyebrow: "Shared game-engine layer",
    category: "Port infrastructure",
    status: "Framework",
    summary:
      "A shared layer for Alchemy/Gap games, combining asset readers, controller abstraction, viewers, and RE tools.",
    narrative:
      "Alchemy centralizes the container, mesh, texture, animation, archive, and input work reused across Marvel and X-Men porting projects.",
    features: [
      "IGB container, mesh, texture, raster, and animation readers",
      "Enbaya-compressed animation decoding",
      "Xbox 360 DXT plus PS2 RGBA5551 and CLUT8 images",
      "SDL3 controller abstraction",
      "Mesh, fly-through, and title-specific viewers",
      "ARK, XMLB, WAD, font, and archive inspection tools",
    ],
    languages: ["C", "Python", "CMake", "SDL3", "SDL2"],
    github: "https://github.com/SomeoneIsWorking/alchemy",
  },
  {
    slug: "port-assets",
    name: "Port Assets",
    eyebrow: "Shared input glyph library",
    category: "Port infrastructure",
    status: "Tooling",
    summary:
      "A scalable SVG library of input and device glyphs tested at the small sizes used by game ports.",
    narrative:
      "The collection keeps controller, keyboard, and touch affordances consistent across ports, with generated manifests and rasterized legibility checks.",
    features: [
      "Generic keyboard and gamepad indicators",
      "Complete Xbox 360 control glyph set",
      "Composable keyboard caps for bound labels",
      "Circular touch-control direction buttons",
      "Manifest-to-file consistency checks",
      "Target-size QA over light, dark, and mid-tone backgrounds",
    ],
    languages: ["SVG", "Python", "JSON"],
    github: "https://github.com/SomeoneIsWorking/port-assets",
  },
  {
    slug: "pinest",
    name: "PiNest",
    eyebrow: "Remote coding-agent control",
    category: "Developer tools",
    status: "Application",
    summary:
      "A remote control for coding agents that keeps sessions on a host computer while a Flutter client drives them from phone or browser.",
    narrative:
      "PiNest separates durable host-side coding sessions from the interface used to steer them, with direct real-time transport and lightweight owner discovery.",
    features: [
      "Creates, lists, resumes, renames, and deletes durable sessions",
      "Streams conversations and tool calls in real time",
      "Steering, queued follow-ups, image pasting, and cancellation",
      "Reopens JSONL history after host restarts",
      "Model, context, and compaction controls",
      "Direct WebSocket chat with Google owner pairing",
    ],
    languages: ["TypeScript", "Node.js", "Flutter", "Dart", "WebSockets", "Firebase"],
    github: "https://github.com/SomeoneIsWorking/pinest",
    liveUrl: "https://pinest.web.app",
    featured: true,
  },
  {
    slug: "node-gtk-vte",
    name: "node-gtk-vte",
    eyebrow: "Native Linux UI from TypeScript",
    category: "Developer tools",
    status: "Framework",
    summary:
      "Direct Bun FFI bindings for building native GTK 3 and VTE terminal interfaces in TypeScript.",
    narrative:
      "A deliberately thin bridge exposes the Linux desktop primitives needed for terminal applications without a C++ addon build step.",
    features: [
      "No C++ compilation or native addon build step",
      "Full native VTE terminal display with externally fed bytes",
      "Translated user input through VTE’s commit signal",
      "GTK windows, notebooks, boxes, labels, buttons, and menus",
      "Desktop notifications and AppIndicator tray support",
      "Garbage-collection-safe callback helpers",
    ],
    languages: ["TypeScript", "Bun FFI", "GTK 3", "VTE 2.91", "GObject"],
    github: "https://github.com/SomeoneIsWorking/node-gtk-vte",
  },
  {
    slug: "re-harness",
    name: "Shared Agent Configuration",
    eyebrow: "Evidence-aware dev workflow",
    category: "Developer tools",
    status: "Tooling",
    summary:
      "The portable source of truth for shared agent instructions, reusable skills, and evidence-aware project tools.",
    narrative:
      "The repository converges cross-project operating rules and the tools that keep goals, state, issues, ownership, evidence, and cleanup trustworthy.",
    features: [
      "Global, port, RE, and static-recompiler skill groups",
      "Relative-link installation without duplicate authorities",
      "Evidence claims with stale dependency detection",
      "Goals, state, issues, ownership, and RE frontier registries",
      "Full-history public-release auditing",
      "Scoped cleanup, scratch GC, and exact-PID termination",
    ],
    languages: ["Python", "Markdown", "Git"],
    github: "https://github.com/SomeoneIsWorking/re-harness",
  },
  {
    slug: "wails-dbman",
    name: "Wails DB Manager",
    eyebrow: "Native SQL workbench",
    category: "Developer tools",
    status: "Application",
    summary: "A native multi-database browser and SQL workbench built with Wails and Vue.",
    narrative:
      "One desktop surface brings connection management, schema browsing, query work, stored procedures, and persistent tabs across three database families.",
    features: [
      "PostgreSQL, MySQL, and Microsoft SQL Server adapters",
      "Saved connection creation and testing",
      "Database, table, view, column, and procedure browsing",
      "Monaco SQL editor with completion",
      "Paged query and table data inspection",
      "Metadata caching and persistent tabs",
    ],
    languages: ["Go", "Wails", "Vue 3", "TypeScript", "Monaco", "Pinia"],
    github: "https://github.com/SomeoneIsWorking/wails-dbman",
  },
  {
    slug: "wails-cast",
    name: "Wails Cast",
    eyebrow: "Native-backed media casting",
    category: "Desktop & Linux",
    status: "Application",
    summary:
      "A desktop application for discovering Chromecast devices and streaming local or HLS media.",
    narrative:
      "A Vue interface and Go backend combine local file browsing, media serving, device discovery, and playback control in a focused desktop experience.",
    features: [
      "LAN Chromecast discovery",
      "Local media selection and streaming",
      "Automatic and manual HLS modes",
      "Playback, volume, seek, mute, and stop controls",
      "Real-time device and playback status",
      "LAN remote API for the companion app",
    ],
    languages: ["Go", "Wails", "Vue 3", "TypeScript", "HLS"],
    github: "https://github.com/SomeoneIsWorking/wails-cast",
    featured: true,
  },
  {
    slug: "wails-cast-remote",
    name: "WailsCast Remote",
    eyebrow: "Mobile casting companion",
    category: "Desktop & Linux",
    status: "Application",
    summary: "A Flutter phone companion for controlling Wails Cast over the local network.",
    narrative:
      "The companion discovers the desktop host, selects a playback target, browses its library, and keeps every playback control within reach.",
    features: [
      "mDNS discovery plus manual host and token connection",
      "Local playback or discovered Chromecast selection",
      "Library browsing and arbitrary URL playback",
      "Track, subtitle, and quality selection",
      "Seek, volume, mute, pause, and stop controls",
      "Subtitle translation progress and synchronized settings",
    ],
    languages: ["Flutter", "Dart", "HTTP", "mDNS", "Android", "iOS"],
    github: "https://github.com/SomeoneIsWorking/wails-cast-remote",
  },
  {
    slug: "fedora-kde-steamdeck",
    name: "Fedora KDE Steam Deck",
    eyebrow: "Linux handheld integration",
    category: "Desktop & Linux",
    status: "Tooling",
    summary: "Steam Deck-style switching between KDE Plasma and Steam Gamepad UI on Fedora.",
    narrative:
      "A small integration makes desktop and console-like sessions coexist cleanly on handheld Linux hardware.",
    features: [
      "Per-user Wayland session selection",
      "Steam Gamepad UI inside Gamescope",
      "Composition and cursor-hiding configuration",
      "Plasma launcher for switching into Game Mode",
      "Steam-compatible Switch to Desktop handling",
    ],
    languages: ["Shell", "KDE Plasma", "Wayland", "Gamescope", "Steam"],
    github: "https://github.com/SomeoneIsWorking/fedora-kde-steamdeck",
  },
];

export const featuredProjects = projects.filter((project) => project.featured);

export function findProject(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}
