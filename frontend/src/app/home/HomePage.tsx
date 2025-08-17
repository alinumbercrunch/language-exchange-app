"use client";

import React from "react";

import { HomeFooter, HomeHeader, HomeHero, HomeMainContent } from "./components";
import { useHomePage } from "./hooks/useHomePage";

/**
 * Main home page component.
 * Coordinates between business logic (hooks) and UI components.
 * Demonstrates separation of concerns architecture.
 */
export function HomePage() {
	const {} = useHomePage();

	return (
		<div className="min-h-screen bg-white">
			<HomeHeader brandName="MeGoodSpeak" />
			<HomeHero />
			<HomeMainContent />
			<HomeFooter />
		</div>
	);
}
