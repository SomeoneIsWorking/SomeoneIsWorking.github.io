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
  release?: {
    label: string;
    platforms: string;
    url: string;
  };
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
    description: "Runtime-native engines, dynamic translation, and faithful host-native releases.",
    accent: "#ff6b35",
  },
  {
    name: "Port infrastructure",
    short: "Infrastructure",
    description: "Reusable runtimes, engine layers, assets, and verification machinery.",
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
    status: "In development",
    summary:
      "A native PC port of the 1994 Amiga game, combining a hand-written C engine with a maintained 68000 interpreter runtime.",
    narrative:
      "A native renderer and host systems recover the game beyond its original 320-pixel window. The browser package now accepts the player's own disks through first-run setup; browser gameplay remains unqualified.",
    features: featuresFor("benefactor"),
    languages: ["C", "Python", "CMake", "SDL", "GLSL", "Android"],
    github: "https://github.com/SomeoneIsWorking/benefactor",
    release: {
      label: "v0.1.0",
      platforms: "Linux · Android",
      url: "https://github.com/SomeoneIsWorking/benefactor/releases/tag/v0.1.0",
    },
    liveUrl: "/benefactor/",
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
      "A Super Mario Sunshine port targeting runtime PPC dynamic translation with native overrides and Aurora rendering.",
    narrative:
      "The native decomp remains a readable oracle while the shared PC-semantic renderer and future runtime executor are developed as separate, testable owners.",
    features: featuresFor("sunbright"),
    languages: ["C++", "C", "Python", "SDL3", "WebGPU", "RmlUi"],
    github: "https://github.com/SomeoneIsWorking/sunbright",
    featured: true,
    screenshots: [
      {
        src: "/projects/sunbright/delfino-gameplay.png",
        alt: "Delfino Plaza gameplay with Mario, FLUDD, residents, HUD, and dialogue",
        caption:
          "Native rendering evidence from Delfino Plaza; the runtime JIT product is in development.",
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
    slug: "xmen2",
    name: "X-Men Legends II",
    eyebrow: "Native PC runtime JIT",
    category: "Native game ports",
    status: "In development",
    summary:
      "A Wine-free native port of the 2005 PC release using x86port runtime JIT translation and native subsystem replacements.",
    narrative:
      "The port has verified unattended menu-to-gameplay coverage, but representative physical-controller playability and complete renderer fidelity remain unverified. Android publication and performance gates are also open.",
    features: featuresFor("xmen2"),
    languages: ["C", "C++", "Python", "SDL3", "Vulkan", "RmlUi", "x86port JIT"],
    github: "https://github.com/SomeoneIsWorking/xmen2",
    release: {
      label: "v0.2.5",
      platforms: "Linux · macOS · Android",
      url: "https://github.com/SomeoneIsWorking/xmen2/releases/tag/v0.2.5",
    },
    liveUrl: "/xmen2/",
    featured: true,
    screenshots: [
      {
        src: "/projects/xmen2/main-menu.png",
        alt: "X-Men Legends II main menu rendered by the native port",
        caption: "Original main menu at 1280×720.",
      },
      {
        src: "/projects/xmen2/controller-gameplay.png",
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
    status: "In development",
    summary: "A native Linux port of Little Fighter 2 v2.0a using x86port runtime JIT translation.",
    narrative:
      "The macOS renderer needs a user re-test, physical controller hot-plug remains unverified, and the implemented Android path is not yet a qualified release.",
    features: featuresFor("lf2-port"),
    languages: ["C", "C++", "Python", "SDL3", "RmlUi", "SDL GPU", "x86port JIT"],
    github: "https://github.com/SomeoneIsWorking/lf2-port",
    release: {
      label: "v0.1.10 pre-release",
      platforms: "Linux · macOS · Android",
      url: "https://github.com/SomeoneIsWorking/lf2-port/releases/tag/v0.1.10",
    },
    liveUrl: "/lf2-port/",
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
    eyebrow: "Xbox 360 runtime JIT",
    category: "Native game ports",
    status: "In development",
    summary:
      "A PC-native Xbox 360 runtime-JIT port of Gears of War, with the first game as the active target.",
    narrative:
      "Gears 1 is the active title, but no current gameplay executable is claimed until the Xenia-backed x360port runtime executor exists. Native RHI, audio, provisioning, and diagnostics are being prepared around that boundary.",
    features: featuresFor("gears1"),
    languages: ["C++", "Python", "Vulkan", "SDL3", "x360port", "Xenia JIT"],
    github: "https://github.com/SomeoneIsWorking/gears1",
    screenshots: [
      {
        src: "/projects/gears1/act1-current.png",
        alt: "Act 1 world frame from the running Gears of War port with incomplete rendering",
        caption:
          "Pre-migration frame retained as context; the current runtime-JIT product is not yet playable.",
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
      "A reusable dynarec-default native-hybrid framework for turning PlayStation games into native PC ports.",
    narrative:
      "psxport provides the CPU translation, native console services, renderer, extraction tools, and differential harness behind a growing family of ports.",
    features: featuresFor("psxport"),
    languages: ["C++", "C", "Python", "SDL3", "SDL GPU", "Vulkan"],
    github: "https://github.com/SomeoneIsWorking/psxport",
    featured: true,
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
    release: {
      label: "Android v0.1.2",
      platforms: "Android",
      url: "https://github.com/SomeoneIsWorking/pinest/releases/tag/apk-43b3b81daf7d6b6b83313738bab1c3ef62dce292",
    },
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
    release: {
      label: "v1.0.0 preview",
      platforms: "Windows · macOS · Linux",
      url: "https://github.com/SomeoneIsWorking/wails-dbman/releases/tag/v1.0.0",
    },
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
    slug: "prismlauncher",
    name: "Prism Launcher",
    eyebrow: "Minecraft launcher fork",
    category: "Desktop & Linux",
    status: "Application",
    summary:
      "A Prism Launcher fork that discovers Minecraft instances on the local network and imports or updates them directly.",
    narrative:
      "LAN sharing works between running launchers without a sender-side share action. Updating an existing pack replaces its mods and pack configuration while retaining local worlds and player settings. The fork's Flatpak uses Prism's own update prompt for its releases; an optional migration tool copies Flatpak data to a native installation.",
    features: featuresFor("prismlauncher"),
    languages: ["C++20", "Qt 6", "CMake", "Python", "Flatpak"],
    github: "https://github.com/SomeoneIsWorking/PrismLauncher",
    release: {
      label: "12.0.9",
      platforms: "Linux AppImage · Flatpak · macOS arm64",
      url: "https://github.com/SomeoneIsWorking/PrismLauncher/releases/tag/12.0.9",
    },
    screenshots: [
      {
        src: "/projects/prismlauncher/lan-update.png",
        alt: "Prism Launcher LAN page showing a discovered remote pack and an existing local instance ready to update",
        caption: "Import a new LAN copy or update a selected local pack.",
      },
    ],
  },
  {
    slug: "minecraft-supermarket",
    name: "Minecraft Supermarket",
    eyebrow: "Sakura city modpack",
    category: "Desktop & Linux",
    status: "Playable",
    summary:
      "A Minecraft supermarket town set inside a sakura forest, with stocked shelves, raised produce displays, shoppers, checkout, and deliveries.",
    narrative:
      "A fresh world generates the city and places the player at the supermarket. The store has full-height stocked shelves and angled produce bins, while customers shop and queue at the register and orders arrive by truck. A connected southern district, cars, bicycles, and furnished businesses are included but still need full client qualification.",
    features: featuresFor("minecraft-supermarket"),
    languages: ["Java", "Python", "Minecraft", "Fabric"],
    github: "https://github.com/SomeoneIsWorking/minecraft-supermarket",
    release: {
      label: "Sakura city and market milestone",
      platforms: "Minecraft modpack ZIP",
      url: "https://github.com/SomeoneIsWorking/minecraft-supermarket/releases/tag/milestone-sakura-city-market",
    },
    screenshots: [
      {
        src: "/projects/minecraft-supermarket/sakura-forest.png",
        alt: "Supermarket city surrounded by a sakura forest in Minecraft",
        caption: "The city sits within a surrounding sakura forest.",
      },
      {
        src: "/projects/minecraft-supermarket/produce-bins.png",
        alt: "Raised angled produce bins stocked with fruit inside the supermarket",
        caption: "Stocked shelves and raised angled produce displays inside the store.",
      },
    ],
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
