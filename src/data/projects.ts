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
  screenshots?: ProjectScreenshot[];
}

export interface ProjectScreenshot {
  src: string;
  alt: string;
  caption?: string;
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
      "Native desktop game loop without an Amiga emulator at runtime",
      "Original 4:3, true 16:9, 21:9, and automatic window-aspect modes",
      "Wider views reveal additional simulated world instead of stretching the frame",
      "Live persistent options and pause menus",
      "Resume, Retry, Exit to Main Menu, and Quit actions",
      "Direct 60-level selector with completion progress, locks, and Unlock All",
      "Restored Easy, Normal, and Hard difficulty selector",
      "Authentic or modern controls independently for keyboard and controller",
      "Dedicated Interact and Drop actions with configurable interaction reach",
      "Fully rebindable keyboard and controller actions with chorded bindings",
      "Hot-pluggable SDL controllers",
      "Detachable free camera with real-time or paused behavior",
      "Normal, Turbo, Hyper, and hold-for-5× fast-forward modes with normal-speed audio",
      "Skip-intro option, fullscreen toggle, and build-bound savestates",
      "Instant boot and near-instant loading from player-supplied disks",
      "AppImage first-run disk-folder selection",
      "Android private disk import and authored touch controls",
      "Physical controllers automatically cancel and hide the touch overlay",
      "Overlay-aware M68K-to-C recompiler plus hand-written native C owners",
      "Native copper renderer, blitter, Paula mixer, disk loader, and ATN decompressor",
      "PUAE side-by-side development comparison harness",
    ],
    languages: ["C", "Python", "CMake", "SDL", "GLSL", "Android"],
    github: "https://github.com/SomeoneIsWorking/benefactor",
    featured: true,
    screenshots: [
      {
        src: "/projects/benefactor/widescreen-16x9.png",
        alt: "Tombs of Egypt gameplay in true 16:9",
        caption: "True 16:9 view showing additional simulated level area.",
      },
      {
        src: "/projects/benefactor/options-menu.png",
        alt: "Benefactor persistent in-game options menu",
        caption: "Live options for aspect ratio, speed, camera, controls, and bindings.",
      },
    ],
  },
  {
    slug: "sunbright",
    name: "Sunbright",
    eyebrow: "Super Mario Sunshine, native",
    category: "Native game ports",
    status: "In development",
    summary:
      "A Super Mario Sunshine port whose default product is a PPC static recompilation with native overrides and Aurora rendering.",
    narrative:
      "A separate native decomp runtime acts as a readable oracle. The shared PC-semantic renderer remains a partial preview and audit path rather than the default renderer.",
    features: [
      "GameCube logo, title, file select, and playable Delfino Plaza",
      "Controlled boot and render sweeps for all 24 selectable stages",
      "Audible music and sound effects",
      "True 16:9 projection with widescreen-aware HUD and full-screen effects",
      "Heat haze, water refraction, dash blur, bath mist, and mirror pre-render paths",
      "Persistent Escape-accessed in-game settings",
      "Vanilla, interpolated 60 FPS, and interpolated Match Refresh cadence",
      "Native 60 FPS and Native Match Refresh modes with documented performance limits",
      "Heat-haze toggle and restart-applied renderer selection",
      "Whole-game PowerPC-to-C++ static recompilation",
      "Separate native decomp runtime used as a behavior oracle",
      "Aurora/WebGPU GameCube platform implementation",
      "Interpolated objects, matrices, billboards, cameras, and indexed arrays",
      "Partial semantic renderer for J2D UI and supported J3D material families",
      "Project-owned SDL3-GPU GX renderer retained for diagnostics",
    ],
    languages: ["C++", "C", "Python", "SDL3", "WebGPU", "RmlUi"],
    github: "https://github.com/SomeoneIsWorking/sunbright",
    featured: true,
    screenshots: [
      {
        src: "/projects/sunbright/delfino-gameplay.png",
        alt: "Delfino Plaza gameplay with Mario, FLUDD, residents, HUD, and dialogue",
        caption: "Running static-recomp and Aurora product in Delfino Plaza.",
      },
    ],
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
      "The N64 PC-port engines remain the game-logic spine. Zelda3D replaces visual, asset, and behavior seams with 3DS-remake data and remains explicitly unfinished.",
    features: [
      "One launcher and chooser for Ocarina of Time 3D and Majora’s Mask 3D",
      "3DS models, animations, scene geometry, collision, cameras, and lighting",
      "N64-content fallback where no 3DS counterpart exists",
      "Content-aware selection of four player-owned ROMs",
      "No-terminal AppImage first-run setup",
      "Direct ROM or safely bounded nested-ZIP selection",
      "Remembered ROM choices in OS user-data storage",
      "CMB, CSAB, ZAR, ZSI, CMAB, and .faceb asset readers",
      "Multi-stage PICA200-style material combiners",
      "Multi-texturing, per-vertex lighting, and scene-authored distance fog",
      "Reverse-engineered Link eye and mouth animation",
      "Camera settings drawn from the 3DS binaries",
      "Embedded Azahar reference execution for measured comparisons",
    ],
    languages: ["C", "C++", "Python", "Ship of Harkinian", "Azahar"],
    github: "https://github.com/SomeoneIsWorking/zelda3d",
    featured: true,
    screenshots: [
      {
        src: "/projects/zelda3d/kokiri.jpg",
        alt: "Kokiri Forest rendered with Ocarina of Time 3D scene assets",
        caption: "Kokiri Forest through the Zelda3D visual layer.",
      },
      {
        src: "/projects/zelda3d/hyrule-night.jpg",
        alt: "Hyrule Field at night with 3DS geometry and lighting",
        caption: "Hyrule Field at night.",
      },
    ],
  },
  {
    slug: "xmen2-recomp",
    name: "X-Men Legends II",
    eyebrow: "Native PC static recompilation",
    category: "Native game ports",
    status: "In development",
    summary:
      "A Wine-free native port of the 2005 PC release built with x86-to-C recompilation and native subsystem replacements.",
    narrative:
      "The port has verified unattended menu-to-gameplay coverage, but representative physical-controller playability and complete renderer fidelity remain unverified. Android publication and performance gates are also open.",
    features: [
      "Native Linux x86-64 and Apple Silicon execution",
      "Verified menu, movie, level-load, gameplay, death, and return-to-menu routes",
      "Native audio mixing and SFD movie playback",
      "Keyboard, mouse, and controller input",
      "Controller assignment, late attach, detach, reconnect, and source switching",
      "Xbox-derived defaults and keyboard/controller-sensitive prompts",
      "Native SVG controller glyphs and keyboard keycaps",
      "Window-mode settings and aspect-fit presentation",
      "Live resolution switching with transactional rollback",
      "Four persistent keyboard profiles",
      "Controller assignment and input-rebinding interface",
      "Native cutscene skipping",
      "Transactional autosave and direct Continue restore after ten manual slots",
      "AppImage setup from an executable, folder, or bounded ZIP",
      "Complete-install validation before replacing a working setup",
      "Android setup shell, safe-area touch zones, camera swipe, touch HUD, and hide-touch setting",
      "x86-to-C translation of the executable and engine modules",
      "Native 64-bit reached paths without machine-code fallback",
      "SDL GPU D3D8 compatibility and native prompt-rendering slice",
      "Native DirectSound boundary and FFmpeg SFD bridge",
      "Apple Silicon 32-bit guest-address arena",
      "Measured reduction of the identified level-load dispatch hotspot",
      "Secondary Xbox recompilation lane without rendering",
    ],
    languages: ["C", "C++", "Python", "SDL3", "Vulkan", "RmlUi"],
    github: "https://github.com/SomeoneIsWorking/xmen2-recomp",
    featured: true,
    screenshots: [
      {
        src: "/projects/xmen2-recomp/main-menu.png",
        alt: "X-Men Legends II main menu rendered by the native port",
        caption: "Original main menu at 1280×720.",
      },
      {
        src: "/projects/xmen2-recomp/controller-gameplay.png",
        alt: "Reached gameplay with party HUD, map, and controller-sensitive prompts",
        caption: "Reached gameplay with native controller prompt art.",
      },
    ],
  },
  {
    slug: "lf2-port",
    name: "LF2 Port",
    eyebrow: "Little Fighter 2, native",
    category: "Native game ports",
    status: "Playable",
    summary:
      "A verified playable Linux port of Little Fighter 2 v2.0a produced through static recompilation.",
    narrative:
      "The macOS renderer needs a user re-test, physical controller hot-plug remains unverified, and the implemented Android path is not yet a qualified release.",
    features: [
      "Original boot flow, menus, character selection, VS, and Stage Mode",
      "Sound effects and WMA background music",
      "Native high-resolution rendering",
      "True widescreen and ultrawide views with additional stage area",
      "Nearest-filtered sprites with full-resolution native composition",
      "Character lighting and silhouette cast shadows",
      "Configurable light angle and height",
      "Borderless, windowed, and fullscreen modes with Alt+Enter",
      "Two-player/two-controller route verified with virtual pads",
      "Up to four attached pad slots, controller detection, and hot-plug logic",
      "Persistent remappable bindings for seven keyboard and controller actions",
      "Controller, keyboard, and mouse navigation of the port menu",
      "HiDPI-aware RmlUi settings",
      "AppImage setup from the original installer, extracted tree, or nested ZIP",
      "Graphical AppImage updater",
      "Implemented Android ARM64 build, setup, touch routing, and updater",
      "x86-to-C static recompilation",
      "Native SDL3 Win32, DirectDraw, DirectSound, GDI, and input replacements",
      "Direct extraction of the original 690-file installer without Windows",
    ],
    languages: ["C", "C++", "Python", "SDL3", "RmlUi", "SDL GPU"],
    github: "https://github.com/SomeoneIsWorking/lf2-port",
    screenshots: [
      {
        src: "/projects/lf2-port/stage-mode-ultrawide.png",
        alt: "Little Fighter 2 Stage Mode at 3440 by 1440",
        caption: "Stage Mode with additional world visible at ultrawide aspect.",
      },
      {
        src: "/projects/lf2-port/controls-menu.png",
        alt: "Little Fighter 2 persistent input binding controls",
        caption: "Keyboard and controller binding interface.",
      },
    ],
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
      "Tomba! 2 reaches title and live free-roam, but native producer, widescreen, interpolation, and full-game coverage remain partial. Tomba! 1 has only an isolated evidence scaffold.",
    features: [
      "Actual product reaches title and live free-roam",
      "Native C++ world, object, camera, projection, and UI owners",
      "Native rendering directly from game-owned scene state",
      "Real per-pixel depth instead of PlayStation ordering-table transcription",
      "Native seaside, lava-cave, night, boss-arena, item-menu, and dialogue scenes",
      "Higher internal resolutions",
      "Live 16:9 gameplay with additional world content",
      "Wide compositor preserving the original central picture",
      "Camera, object, backdrop, and effect interpolation",
      "Input, audio, FMV/CD, save/menu, and transition systems with partial coverage",
      "Player-owned CHD provisioning",
      "Clean native-engine path plus retained static-recompilation reference",
      "Native-renderer path plus retained PSX-renderer reference",
      "Byte-exact comparison mechanisms",
      "Finite frame driver with one presentation fence per field",
    ],
    languages: ["C++", "C", "Python", "SDL3", "Vulkan", "psxport"],
    github: "https://github.com/SomeoneIsWorking/Tomba2Engine",
    screenshots: [
      {
        src: "/projects/tomba2-engine/seaside-field.png",
        alt: "Tomba 2 free-roam on the seaside field through the native engine",
        caption: "Native engine and renderer in live free-roam.",
      },
      {
        src: "/projects/tomba2-engine/dialogue.png",
        alt: "Tomba 2 in-world dialogue rendered by the native engine",
        caption: "In-world dialogue from a native UI producer.",
      },
    ],
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
      "Crashball, Battle Mode Crate Crush, and Tournament Mode’s first Crate Crush match are live. Polar Push reaches selection, options, and loading only; broader mode and native-visual coverage remain partial.",
    features: [
      "Native title and game-mode menu presentation",
      "Live controllable Crashball match",
      "Live controllable Battle Mode Crate Crush match",
      "Live controllable Tournament Mode first Crate Crush match",
      "Objective, controls, and special-items instruction pages",
      "Native arena, player, HUD, portrait, score, crate, ball, item, dimmer, and briefing producers",
      "True wider gameplay camera in the exercised modes",
      "Centered 4:3 authored briefing screens",
      "Optional interpolated midpoint presentation from immutable scene snapshots",
      "Reproducible player-owned USA disc provisioning",
      "Polar Push provisioning and Game Options handoff without gameplay claim",
      "Reproducible 2,956-function MIPS-to-C substrate",
      "Resident executable, BOOT, and six measured nested modules",
      "Native scene-state rendering instead of guest GPU output",
      "Deterministic replay-driven mode coverage",
      "Host-owned finite frame path without guest VSync",
    ],
    languages: ["C++", "Python", "Java", "SDL3", "Vulkan", "psxport"],
    github: "https://github.com/SomeoneIsWorking/crashbash",
    screenshots: [
      {
        src: "/projects/crash-bash/crashball-widescreen.png",
        alt: "Crashball through the verified wider gameplay camera",
        caption: "Live controllable Crashball in 16:9.",
      },
    ],
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
      "Gears 1 reaches Act 1 at about 30 completed frames per second, but world output is not yet faithful. Saves are incomplete; networking and user/content services are absent.",
    features: [
      "Boots the exact supported Gears of War revision",
      "Startup movies, navigable title screen, and main menus",
      "Act 1 campaign gameplay",
      "Keyboard and SDL controller input through the retail X_INPUT_STATE path",
      "Reproducible scripted input",
      "Coherent menu rendering with present but incomplete HUD and world output",
      "End-to-end XMA audio playback",
      "Extended execution around 29.7 to 30 completed frames per second",
      "Loopback input, authoritative screenshot, and live-counter interface",
      "Headless and scripted menu-walk modes",
      "Player-owned ISO provisioning",
      "Content mount and save creation without completed save writes",
      "XEX decryption and decompression to a native PE image",
      "About 49,000 recompiled functions across roughly 176 MB of generated C++",
      "Zero unimplemented instructions in the current emitted title",
      "Guest threads, TLS, stacks, heaps, timing, and kernel imports",
      "Vulkan PM4 command processing",
      "Xenos microcode translation to SPIR-V through Xenia’s translator",
      "Guest-owned geometry, textures, constants, targets, and output state",
      "Partial native semantic RHI capture and comparison",
    ],
    languages: ["C++", "Python", "Vulkan", "SDL3", "XenonRecomp"],
    github: "https://github.com/SomeoneIsWorking/gears1",
    screenshots: [
      {
        src: "/projects/gears1/act1-current.png",
        alt: "Act 1 world frame from the running Gears of War port with incomplete rendering",
        caption: "Act 1 world output; rendering is not yet faithful.",
      },
    ],
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
      "Static recompilation of MIPS R3000A machine code into generated C shards",
      "Native GPU, SPU audio, GTE geometry, MDEC video, CD, XA/FMV, and BIOS/SDK services",
      "Vendored Beetle PSX backend for GTE, MDEC, SPU, and CHD support",
      "Frame-by-frame lockstep comparison of native and recompiled guest state",
      "SDL_GPU rendering for the PSX substrate and consumer-native renderers",
      "Game-independent GameRuntime, GuestProgramImage, and RecompRegistry seams",
      "Static library plus a zero-game-symbol smoke target",
      "Hermetic tests that require no disc, GPU, or window",
      "ABI extraction, native skeleton generation, guest-store checking, and RE tools",
      "CHD and ISO extraction, debug channels, and an interactive control client",
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
      "The tool emits generated C and the boundaries around it—dispatch, exports, thunks, runtime override slots, stale-input detection, and impact-ranked gaps.",
    features: [
      "Translates x86-32 functions into generated C",
      "Emits function bodies, runtime/native dispatch tables, DLL export shims, and thunks",
      "Reports unsupported instructions and ranks them by blocked-function impact",
      "Fails closed on missing data, zero-function exports, and mismatched PE layouts",
      "Detects stale output through input fingerprints independent of runtime overrides",
      "Routes direct calls, tail calls, fall-through, and dispatch through runtime override slots",
      "Adds and removes native overrides without regenerating emitted modules",
      "Provides a hosted DLL-in-Wine execution variant and host-call plumbing",
      "Validates export layouts and guest stack-balance contracts",
      "Seeds relocations, imports, code immediates, data pointers, and import thunks",
      "Includes Ghidra export, repair, split, caller, naming, and vtable tools",
      "Resolves and validates the consuming port from the working directory",
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
      "Thread-safe timestamped logging with levels, sinks, files, and named channels",
      "Low-overhead reusable channel handles for hot paths",
      "Bounded line construction for incremental diagnostics",
      "Cached prefix-aware typed environment configuration",
      "Concurrent loopback-only HTTP control server with bounded requests and clean shutdown",
      "Dependency-free SHA-256 for memory and streamed files",
      "Per-application data directories on Linux, macOS, Windows, and Android",
      "Stable touch-zone routing with capture origin and relative gesture positions",
      "Android SDL Activity contact capture with focus and lifecycle cancellation",
      "Persisted SAF grants, bounded staging, rejection cleanup, and recovery-safe promotion",
      "Safe direct or one-level-nested ZIP discovery and extraction",
      "Path, duplicate, CRC, entry-count, and byte-budget archive validation",
      "Failure-atomic content publication and multithreaded channel reconfiguration",
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
    status: "In development",
    summary:
      "A shared layer for Alchemy/Gap games, combining asset readers, controller abstraction, viewers, and RE tools.",
    narrative:
      "Alchemy centralizes shared container, image, archive, and XMLB work. Mesh, animation, input, ARK, and viewer coverage remain partial; the CPU rasterizer and Raven audio support are offline tools.",
    features: [
      "IGB containers for supplied PS2 v6 and Xbox 360 v8 corpora",
      "One image API for Xbox 360 DXT and MUA PS2 RGBA5551/CLUT8 data",
      "Mesh and scene loading for verified X-Men Legends II assets",
      "Enbaya animation decoder with real-corpus verification still pending",
      "Generic controller snapshots with stable device slots",
      "SDL3 startup enumeration, forwarded hotplug events, snapshots, handles, and rumble",
      "Byte-identical round trips for all 14,348 measured MUA XMLB payload occurrences",
      "Parsing of all 1,087 measured MUA FB packages with duplicate paths retained",
      "Measured PS2, Xbox 360, DLC, and title-update archive traversal without parser failures",
      "Offline Raven audio, ARK, WAD, font, and format-inspection tools",
      "XML2-oriented mesh, fly-through, and title-specific viewers",
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
      "Original MIT-licensed SVGs in a common 72-unit design space",
      "Generic keyboard and gamepad device silhouettes",
      "Complete Xbox 360-style buttons, triggers, d-pad, sticks, Start, Back, and Guide",
      "Three keyboard-cap widths with labels composed by consumers",
      "Four circular cardinal-direction touch buttons",
      "Target-size review at 18 px and larger over light, dark, and mid-tone backgrounds",
      "Distinct silhouette and direction tests",
      "Manifest checks that refuse missing or undeclared glyphs",
      "Deterministic checkout resolution without vendored fallbacks",
      "Authoring checks for palette, stroke, geometry, and generated output",
    ],
    languages: ["SVG", "Python", "JSON"],
    github: "https://github.com/SomeoneIsWorking/port-assets",
    screenshots: [
      {
        src: "/projects/port-assets/gamepad.svg",
        alt: "Generic outlined gamepad device glyph",
        caption: "Scalable device indicator designed for prompt-size legibility.",
      },
      {
        src: "/projects/port-assets/face-a.svg",
        alt: "Xbox 360-style A button glyph",
        caption: "Original SVG controller prompt artwork.",
      },
      {
        src: "/projects/port-assets/dpad-up.svg",
        alt: "Directional pad with the up arm highlighted",
        caption: "Direction-specific small-size-tested glyph.",
      },
      {
        src: "/projects/port-assets/touch-up.svg",
        alt: "Circular touch-control up button",
        caption: "Generic touch overlay control for native game ports.",
      },
    ],
  },
  {
    slug: "pinest",
    name: "PiNest",
    eyebrow: "Remote coding-agent control",
    category: "Developer tools",
    status: "In development",
    summary:
      "A remote control for coding agents that keeps sessions on a host computer while a Flutter client drives them from phone or browser.",
    narrative:
      "PiNest is an active beta. Registry persistence and explicit session handoff are verified; real crash/restart resume, hosted browser sign-in, and physical-phone Android use are not yet verified end to end.",
    features: [
      "Live Flutter web client and an attested Android APK release",
      "Create, list, select, resume, rename, close, and delete durable sessions",
      "Atomic private registry persistence with corrupt, symlink, and owner checks",
      "Real-time assistant text, tool calls, status, model, and context usage",
      "Explicit active-turn steering and queued follow-up modes",
      "Pasted images retained as history thumbnails",
      "Tool cards that preserve surrounding assistant text and executed commands",
      "Lazy older-history paging that survives live refreshes",
      "Queue inspection and clearing",
      "Model, thinking, compaction threshold, compact, and clear controls",
      "Persisted model and thinking settings plus workspace and folder controls",
      "Syntax-gated extension reload with live session adoption",
      "Google/Firebase owner authentication and authenticated host WebSockets",
      "Cloudflared, ngrok, Tailscale Funnel, and no-tunnel modes",
      "Authentication, payload, history, image, and output-buffer limits",
      "Immutable signed, identity-checked, GitHub-attested Android releases",
    ],
    languages: ["TypeScript", "Node.js", "Flutter", "Dart", "WebSockets", "Firebase"],
    github: "https://github.com/SomeoneIsWorking/pinest",
    liveUrl: "https://pinest.web.app",
    featured: true,
    screenshots: [
      {
        src: "/projects/pinest/login.png",
        alt: "PiNest Google sign-in screen",
        caption: "Client sign-in and host pairing.",
      },
      {
        src: "/projects/pinest/session.png",
        alt: "PiNest remote coding-agent session",
        caption: "Agent output, session controls, and message composer.",
      },
    ],
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
      "A Linux-only binding layer exposes terminal and GTK primitives without a C++ addon build. Applications still own the PTY, process, transport, and event-loop policy.",
    features: [
      "Direct bun:ffi bindings to GTK 3, VTE 2.91, and GObject",
      "Native TypeScript terminal UIs without a package build step",
      "External terminal output through vte_terminal_feed",
      "Translated keystrokes through VTE’s commit signal",
      "VT/xterm escapes, 256 colors, cursor, scrollback, selection, and hyperlinks",
      "GTK windows, focus, show, hide, destroy, boxes, notebooks, labels, buttons, and menus",
      "Terminal size, scrollback, hyperlink, and cursor-blink controls",
      "GObject signal connection, disconnection, and reference management",
      "NUL-string and native-callback lifetime helpers",
      "Native notifications through libnotify",
      "Optional AppIndicator tray icons with no-tray fallback",
      "GTK-owned and Bun-polled event-loop integration patterns",
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
      "One versioned source of truth for global agent instructions",
      "Seventeen reusable global, port, RE, and static-recompiler skills",
      "Relative-link installation into Codex, Claude, and generic agent surfaces",
      "Safe replacement and tamper detection that preserves vendor entries",
      "Evidence claims with falsifiers and Git-history staleness detection",
      "Instrument trust records requiring positive and negative discrimination",
      "Separate goals, state, issues, ownership, and RE frontier registries",
      "Full-history public-release auditing for restricted assets and machine paths",
      "Scoped cleanup, scratch garbage collection, and exact-PID termination",
      "Compatibility entry points to one canonical implementation",
      "Positive and negative tests for empty corpora, state graphs, history, and cleanup scope",
    ],
    languages: ["Python", "Markdown", "Git"],
    github: "https://github.com/SomeoneIsWorking/re-harness",
  },
  {
    slug: "wails-dbman",
    name: "Wails DB Manager",
    eyebrow: "Native SQL workbench",
    category: "Developer tools",
    status: "In development",
    summary:
      "An early native database-workbench prototype; SQL Server has the current complete schema-discovery path.",
    narrative:
      "The interface covers connection management, schema browsing, query work, stored procedures, and persistent tabs. PostgreSQL and MySQL adapters remain incomplete and are not presented as working feature-complete backends.",
    features: [
      "Add, edit, delete, and test saved database connections",
      "Resizable database explorer with refresh and hidden-database controls",
      "SQL Server table, view, and stored-procedure discovery",
      "Persistent query, table, view, and procedure tabs",
      "Monaco SQL editor with schema-aware completion and Cmd/Ctrl+Enter execution",
      "Multiple query result sets, row counts, and execution timing",
      "Table paging, page size, sorting, filtering, and resizable columns",
      "Table schema inspection",
      "View data, schema, and definition tabs",
      "Stored-procedure info, definition, and query tabs",
      "Global object search with keyboard navigation",
      "Persistent light and dark themes",
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
      "A desktop media library and Chromecast controller for local files, remote HLS, subtitles, and translated media.",
    narrative:
      "A Vue interface and Go backend combine media discovery, streaming, track and subtitle processing, library management, remote-instance federation, and a token-protected companion API.",
    features: [
      "mDNS Chromecast discovery",
      "Browse, drag and drop, or enter paths and URLs for common video and HLS formats",
      "Playback history with reopen, remove, and clear actions",
      "Local-file probing and remote HLS extraction",
      "Lua-scriptable browser extraction with URL interception and automatic HLS detection",
      "Video and audio track selection",
      "Embedded, nearby, translated, and external subtitle selection",
      "Quality presets and maximum output-width settings",
      "On-demand HLS segment download, transcoding, and cache reuse",
      "Per-track download progress, stop, resume, and removal",
      "Chromecast play, pause, stop, seeking, volume, and mute controls",
      "Live subtitle sizing, per-episode sync, bold, and italic controls",
      "Subtitle burn-in, closed-caption filtering, and embedded-subtitle export",
      "LLM subtitle translation through OpenCode or an OpenAI-compatible endpoint",
      "Model selection, custom prompts, reference tracks, cancellation, and progress",
      "Media-library scanning into show, season, and episode trees",
      "TMDB-backed episode identification",
      "Preview and application of canonical library organization",
      "Single-episode and season-batch translation",
      "Discovery and browsing of other Wails Cast instances",
      "Token-protected configurable Remote API with mDNS advertisement",
      "Remote library, playback, subtitle, translation, identify, organize, and torrent endpoints",
      "qBittorrent magnet submission and progress display",
      "Cache statistics and transcoded or full-video cache clearing",
      "Persisted subtitle, translation, quality, cache, and Remote API settings",
      "Alternate Fyne mobile companion with discovery, library, track, quality, and transport controls",
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
      "The companion requires a running Wails Cast Remote API. It discovers the host, selects a Chromecast, browses the library, and controls playback and subtitle workflows.",
    features: [
      "Automatic LAN discovery through _wailscast._tcp mDNS",
      "Manual host, port, and optional token connection",
      "Persistence of the last connection details",
      "Library browsing and refresh",
      "Arbitrary URL playback",
      "Chromecast target selection",
      "Video, audio, subtitle, and quality selection",
      "Preference for detected nearby or translated subtitles",
      "Per-episode subtitle translation and retranslation",
      "Translation status polling and completion reporting",
      "Now-playing position updates every second",
      "Play, pause, stop, skip, scrubber seek, volume, and mute controls",
      "Synced subtitle, burn-in, closed-caption, quality, and language settings",
      "X-Cast-Token authentication",
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
    summary:
      "A two-script helper for switching a Fedora KDE login between Plasma and Steam Gamepad UI.",
    narrative:
      "The helper assumes Steam, Gamescope, Plasma Wayland, DBus tools, and desktop-database tooling are already installed. It does not provision those dependencies.",
    features: [
      "Installs a Wayland Steam Session Picker entry",
      "Uses a per-user flag to select Steam Gamepad UI for the next login",
      "Launches Steam under fullscreen Gamescope",
      "Configures composition, HDR signalling, SDR gamut, and cursor hiding",
      "Logs the Gamescope session under the per-user state directory",
      "Adds a Plasma shortcut for switching into game mode",
      "Logs out through qdbus-qt6, qdbus, or loginctl",
      "Supplies Steam’s expected command for returning to desktop",
      "Removes installed session files, scripts, flag, and launcher through uninstall.sh",
    ],
    languages: ["Shell", "KDE Plasma", "Wayland", "Gamescope", "Steam"],
    github: "https://github.com/SomeoneIsWorking/fedora-kde-steamdeck",
  },
];

export const featuredProjects = projects.filter((project) => project.featured);

export function findProject(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}
