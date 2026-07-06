export interface Project {
	slug: string;
	href: string;
	description: string;
}

export const projects: Project[] = [
	{
		slug: "dlbcodes/ui",
		href: "https://ui.dlbcodes.com",
		description:
			"A compound, tokenized Vue 3 component library. Built on Headless UI.",
	},
	{
		slug: "dlbcodes/assistant",
		href: "https://assistant.dlbcodes.com",
		description:
			"Soft, conversational template — a consumer AI-assistant UI.",
	},
	{
		slug: "dlbcodes/console",
		href: "https://console.dlbcodes.com",
		description:
			"Dense, Vercel-style dashboard. Same library, opposite look.",
	},
	{
		slug: "dlbcodes/playground",
		href: "https://playground.dlbcodes.com",
		description:
			"Live customizer — reskin every component by swapping tokens.",
	},
	{
		slug: "dlbcodes/amalia-chat",
		href: "https://amalia.dlbcodes.com",
		description:
			"The assistant UI, wired to AMALIA — Portugal's open-source LLM.",
	},
];