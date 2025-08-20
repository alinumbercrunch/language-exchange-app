import React from "react";

interface StatItemProps {
	number: string;
	label: string;
	description: string;
}

/**
 * Individual statistics item component displaying a number, label, and description.
 *
 * @param number - The statistic number to display (e.g., "500+")
 * @param label - The statistic label (e.g., "Active Users")
 * @param description - Description text explaining the statistic
 * @returns A centered statistics item with number, label, and description
 */
export const StatItem: React.FC<StatItemProps> = ({ number, label, description }) => {
	return (
		<div className="text-center space-y-2">
			<div className="text-4xl lg:text-5xl font-bold text-black">{number}</div>
			<div className="text-lg font-semibold text-black">{label}</div>
			<div className="text-gray-600">{description}</div>
		</div>
	);
};

interface StatsSectionProps {
	title?: string;
	stats?: StatItemProps[];
	backgroundColor?: string;
}

export const StatsSection: React.FC<StatsSectionProps> = ({
	title = "Trusted by learners worldwide",
	stats = [
		{
			number: "50,000+",
			label: "Active Learners",
			description: "Join our growing community"
		},
		{
			number: "100+",
			label: "Languages",
			description: "From popular to rare languages"
		},
		{
			number: "1M+",
			label: "Conversations",
			description: "Practice sessions completed"
		},
		{
			number: "4.9★",
			label: "User Rating",
			description: "Based on 10,000+ reviews"
		}
	],
	backgroundColor = "bg-gray-50"
}) => {
	return (
		<section className={`px-6 py-16 lg:px-12 lg:py-24 ${backgroundColor}`}>
			<div className="max-w-7xl mx-auto">
				<div className="text-center mb-16">
					<h2 className="text-3xl lg:text-5xl font-medium text-black">{title}</h2>
				</div>

				<div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
					{stats.map(stat => (
						<StatItem key={stat.label} number={stat.number} label={stat.label} description={stat.description} />
					))}
				</div>
			</div>
		</section>
	);
};
