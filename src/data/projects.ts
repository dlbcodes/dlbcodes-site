export interface Project {
	slug: string;
	href: string;
	repo?: string;
	description: string;
	images?: string[];
}

export const projects: Project[] = [
	{
		slug: "dlbcodes/ui",
		href: "https://ui.dlbcodes.com",
		repo: "https://github.com/dlbcodes/dlbcodes-ui",
		description:
			"A compound, tokenized Vue 3 component library. Built on Headless UI.",

	},
	{
		slug: "dlbcodes/assistant",
		href: "https://assistant.dlbcodes.com",
		repo: "https://github.com/dlbcodes/dlbcodes-assistant",
		description:
			"Soft, conversational template — a consumer AI-assistant UI.",
		images: [
			"/images/assistant/Home.png",
			"/images/assistant/ComposerWithFiles.png",
			"/images/assistant/ComposerFilesDropdown.png",
			"/images/assistant/UserMenu.png",
		],
	},
	{
		slug: "dlbcodes/console",
		href: "https://console.dlbcodes.com",
		repo: "https://github.com/dlbcodes/dlbcodes-console",
		description:
			"Dense, Vercel-style dashboard. Same library, opposite look.",
		images: [
			"/images/console/Home.png",
			"/images/console/Team.png",
			"/images/console/WorkspaceSwitcher.png",
		],
	},
	{
		slug: "dlbcodes/playground",
		href: "https://playground.dlbcodes.com",
		repo: "https://github.com/dlbcodes/dlbcodes-playground",
		description:
			"Live customizer — reskin every component by swapping tokens.",
		images: [
			"/images/assistant/Home.png",
			"/images/assistant/ComposerWithFiles.png",
			"/images/assistant/ComposerFilesDropdown.png",
			// "/images/assistant/UserMenu.png",
		],
	},
	{
		slug: "dlbcodes/amalia-chat",
		href: "https://amalia.dlbcodes.com",
		repo: "https://github.com/dlbcodes/dlbcodes-amalia-chat",
		description:
			"The assistant UI, wired to AMALIA — Portugal's open-source LLM.",
	},
];