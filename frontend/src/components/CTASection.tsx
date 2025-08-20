import { ArrowRight } from "lucide-react";
import Link from "next/link";
import React from "react";

interface CTASectionProps {
	title?: string;
	subtitle?: string;
	primaryButtonText?: string;
	primaryButtonHref?: string;
	secondaryButtonText?: string;
	secondaryButtonHref?: string;
	backgroundColor?: string;
	showSecondaryButton?: boolean;
}

export const CTASection: React.FC<CTASectionProps> = ({
	title = "Ready to start your language journey?",
	subtitle = "Join thousands of learners who are already improving their language skills with native speakers.",
	primaryButtonText = "Get Started Free",
	primaryButtonHref = "/register",
	secondaryButtonText = "Learn More",
	secondaryButtonHref = "/about",
	backgroundColor = "bg-black",
	showSecondaryButton = true
}) => {
	return (
		<section className={`px-6 py-16 lg:px-12 lg:py-24 ${backgroundColor}`}>
			<div className="max-w-4xl mx-auto text-center space-y-8">
				<div className="space-y-4">
					<h2 className="text-3xl lg:text-5xl font-medium text-white leading-tight">{title}</h2>
					<p className="text-lg lg:text-xl text-gray-300 max-w-2xl mx-auto">{subtitle}</p>
				</div>

				<div className="flex flex-col sm:flex-row gap-4 justify-center">
					<Link
						href={primaryButtonHref}
						className="inline-flex items-center justify-center px-8 py-4 text-lg font-medium text-black bg-white rounded-md hover:bg-gray-100 transition-colors duration-200 group"
					>
						{primaryButtonText}
						<ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
					</Link>

					{showSecondaryButton && (
						<Link
							href={secondaryButtonHref}
							className="inline-flex items-center justify-center px-8 py-4 text-lg font-medium text-white border border-gray-600 rounded-md hover:border-white transition-colors duration-200"
						>
							{secondaryButtonText}
						</Link>
					)}
				</div>

				<div className="pt-8">
					<p className="text-sm text-gray-400">Free to start • No credit card required • Cancel anytime</p>
				</div>
			</div>
		</section>
	);
};
