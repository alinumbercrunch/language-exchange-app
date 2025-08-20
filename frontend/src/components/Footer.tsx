import { Facebook, Globe, Instagram, Linkedin, Twitter } from "lucide-react";
import Link from "next/link";
import React from "react";

interface FooterLinkProps {
	href: string;
	children: React.ReactNode;
}

const FooterLink: React.FC<FooterLinkProps> = ({ href, children }) => (
	<Link href={href} className="text-gray-600 hover:text-black transition-colors duration-200">
		{children}
	</Link>
);

interface FooterSectionProps {
	title: string;
	links: Array<{ href: string; label: string }>;
}

const FooterSection: React.FC<FooterSectionProps> = ({ title, links }) => (
	<div className="space-y-4">
		<h3 className="font-semibold text-black">{title}</h3>
		<ul className="space-y-2">
			{links.map(link => (
				<li key={link.href}>
					<FooterLink href={link.href}>{link.label}</FooterLink>
				</li>
			))}
		</ul>
	</div>
);

interface FooterProps {
	brandName?: string;
	description?: string;
	sections?: FooterSectionProps[];
	socialLinks?: Array<{
		href: string;
		icon: React.ReactNode;
		label: string;
	}>;
	copyrightText?: string;
}

export const Footer: React.FC<FooterProps> = ({
	brandName = "LangExchange",
	description = "Connect with native speakers worldwide and master any language through real conversations.",
	sections = [
		{
			title: "Platform",
			links: [
				{ href: "/features", label: "Features" },
				{ href: "/pricing", label: "Pricing" },
				{ href: "/languages", label: "Languages" },
				{ href: "/mobile", label: "Mobile App" }
			]
		},
		{
			title: "Community",
			links: [
				{ href: "/teachers", label: "Find Teachers" },
				{ href: "/students", label: "Find Students" },
				{ href: "/events", label: "Language Events" },
				{ href: "/blog", label: "Blog" }
			]
		},
		{
			title: "Support",
			links: [
				{ href: "/help", label: "Help Center" },
				{ href: "/contact", label: "Contact Us" },
				{ href: "/safety", label: "Safety" },
				{ href: "/guidelines", label: "Community Guidelines" }
			]
		},
		{
			title: "Company",
			links: [
				{ href: "/about", label: "About Us" },
				{ href: "/careers", label: "Careers" },
				{ href: "/press", label: "Press" },
				{ href: "/partners", label: "Partners" }
			]
		}
	],
	socialLinks = [
		{
			href: "https://facebook.com",
			icon: <Facebook className="w-5 h-5" />,
			label: "Facebook"
		},
		{
			href: "https://twitter.com",
			icon: <Twitter className="w-5 h-5" />,
			label: "Twitter"
		},
		{
			href: "https://instagram.com",
			icon: <Instagram className="w-5 h-5" />,
			label: "Instagram"
		},
		{
			href: "https://linkedin.com",
			icon: <Linkedin className="w-5 h-5" />,
			label: "LinkedIn"
		}
	],
	copyrightText = "© 2024 LangExchange. All rights reserved."
}) => {
	return (
		<footer className="px-6 py-16 lg:px-12 lg:py-20 bg-white border-t border-gray-200">
			<div className="max-w-7xl mx-auto">
				{/* Main Footer Content */}
				<div className="grid md:grid-cols-2 lg:grid-cols-6 gap-8 mb-12">
					{/* Brand Section */}
					<div className="lg:col-span-2 space-y-4">
						<div className="flex items-center space-x-2">
							<Globe className="w-8 h-8 text-black" />
							<span className="text-xl font-bold text-black">{brandName}</span>
						</div>
						<p className="text-gray-600 max-w-sm">{description}</p>

						{/* Social Links */}
						<div className="flex space-x-4 pt-4">
							{socialLinks.map(social => (
								<a
									key={social.href}
									href={social.href}
									target="_blank"
									rel="noopener noreferrer"
									aria-label={social.label}
									className="p-2 text-gray-600 hover:text-black transition-colors duration-200"
								>
									{social.icon}
								</a>
							))}
						</div>
					</div>

					{/* Footer Sections */}
					{sections.map(section => (
						<FooterSection key={section.title} title={section.title} links={section.links} />
					))}
				</div>

				{/* Bottom Section */}
				<div className="pt-8 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
					<p className="text-gray-600 text-sm">{copyrightText}</p>

					<div className="flex space-x-6 text-sm">
						<FooterLink href="/privacy">Privacy Policy</FooterLink>
						<FooterLink href="/terms">Terms of Service</FooterLink>
						<FooterLink href="/cookies">Cookie Policy</FooterLink>
					</div>
				</div>
			</div>
		</footer>
	);
};
