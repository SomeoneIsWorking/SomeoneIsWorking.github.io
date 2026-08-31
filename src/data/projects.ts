import { featuresFor, type ProjectFeature } from "./project-features.generated";

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
  features: readonly ProjectFeature[];
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
    features: featuresFor("benefactor"),
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
    features: featuresFor("sunbright"),
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
    features: featuresFor("zelda3d"),
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
    features: featuresFor("xmen2-recomp"),
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
    features: featuresFor("lf2-port"),
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
    features: featuresFor("tomba2-engine"),
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
      "Crashball, Battle Mode Crate Crush, and Tournament Mode’s first Crate Crush match are live. Polar Push reaches its arena-entry path, but controllable gameplay and broader native-visual coverage remain partial.",
    features: featuresFor("crash-bash"),
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
      "Gears 1 reaches Act 1 at about 30 completed frames per second, but world output is not yet faithful. Save writing works while loading remains unverified; networking and user/content services are absent.",
    features: featuresFor("gears1"),
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
    features: featuresFor("psxport"),
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
    features: featuresFor("recomp-x86"),
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
    features: featuresFor("lucent"),
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
    features: featuresFor("alchemy"),
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
    features: featuresFor("port-assets"),
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
    features: featuresFor("pinest"),
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
    features: featuresFor("node-gtk-vte"),
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
    features: featuresFor("re-harness"),
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
      "An early native database-workbench prototype; SQL Server has the most developed schema-discovery path, but it is not yet integration-verified.",
    narrative:
      "The interface covers connection management, schema browsing, query work, stored procedures, and persistent tabs. PostgreSQL and MySQL adapters remain incomplete and are not presented as working feature-complete backends.",
    features: featuresFor("wails-dbman"),
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
      "A Vue interface and Go backend combine media discovery, streaming, track and subtitle processing, library management, remote-instance federation, and a companion API with optional token authentication.",
    features: featuresFor("wails-cast"),
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
    features: featuresFor("wails-cast-remote"),
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
    features: featuresFor("fedora-kde-steamdeck"),
    languages: ["Shell", "KDE Plasma", "Wayland", "Gamescope", "Steam"],
    github: "https://github.com/SomeoneIsWorking/fedora-kde-steamdeck",
  },
];

export const featuredProjects = projects.filter((project) => project.featured);

export function findProject(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}
