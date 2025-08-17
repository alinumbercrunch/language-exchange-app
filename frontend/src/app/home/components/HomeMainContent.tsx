import React from "react";

import { FeaturesSection } from "../../../components/FeaturesSection";
import { StatsSection } from "../../../components/StatsSection";

/**
 * Home page main content sections component.
 * Pure UI component containing features and stats sections.
 */
export function HomeMainContent() {
	return (
		<>
			<FeaturesSection />
			<StatsSection />
		</>
	);
}
