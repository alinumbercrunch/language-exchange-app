import React from "react";

import { Navigation } from "../../../components/Navigation";

interface HomeHeaderProps {
	brandName?: string;
}

/**
 * Home page header component with navigation.
 * Pure UI component for page header.
 *
 * @param brandName - Brand name to display in navigation
 */
export function HomeHeader({ brandName = "MeGoodSpeak" }: HomeHeaderProps) {
	return <Navigation brandName={brandName} />;
}
