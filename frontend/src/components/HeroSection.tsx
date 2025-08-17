import { ArrowRight, Play, Star } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

interface HeroSectionProps {
  title?: React.ReactNode;
  subtitle?: string;
  imageSrc?: string;
  imageAlt?: string;
  stats?: {
    rating: string;
    learners: string;
    languages: string;
  };
}

/**
 * Hero section component that displays the main landing page content with title, subtitle, 
 * featured image, and statistics.
 * 
 * @param title - Main title content (can include JSX elements)
 * @param subtitle - Subtitle text description
 * @param imageSrc - Source URL for the hero image
 * @param imageAlt - Alt text for the hero image
 * @param stats - Object containing rating, learners, and languages statistics
 * @returns Hero section with call-to-action and featured content
 */
export const HeroSection: React.FC<HeroSectionProps> = ({
  title = (
    <>
      Learn new 
      <span className="block text-gray-600">languages,</span>
      <span className="block">make new friends</span>
    </>
  ),
  subtitle = "Connect with native speakers around the world. Practice conversations, improve your skills, and build lasting friendships through language exchange.",
  imageSrc = "/images/People-talking.png",
  imageAlt = "People learning languages together",
  stats = {
    rating: "4.9/5 rating",
    learners: "50k+ active learners",
    languages: "100+ languages"
  }
}) => {
  return (
    <section className="px-6 py-16 lg:px-12 lg:py-24">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-6">
              <h1 className="text-4xl lg:text-6xl font-medium text-black leading-tight">
                {title}
              </h1>
              <p className="text-lg lg:text-xl text-gray-600 leading-relaxed max-w-lg">
                {subtitle}
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Link 
                href="/register"
                className="flex items-center justify-center px-8 py-4 text-lg font-medium text-white bg-black rounded-md hover:bg-gray-800 transition-colors duration-200 group"
              >
                Get Started Free
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
              </Link>
              <button className="flex items-center justify-center px-8 py-4 text-lg font-medium text-black border border-gray-300 rounded-md hover:border-black transition-colors duration-200">
                <Play className="mr-2 w-5 h-5" />
                Watch Demo
              </button>
            </div>

            <div className="flex items-center space-x-8 text-sm text-gray-600">
              <div className="flex items-center space-x-2">
                <Star className="w-5 h-5 text-yellow-500 fill-current" />
                <span>{stats.rating}</span>
              </div>
              <div>{stats.learners}</div>
              <div>{stats.languages}</div>
            </div>
          </div>

          <div className="relative">
            <Image
              src={imageSrc}
              alt={imageAlt}
              width={800}
              height={600}
              className="w-full h-auto rounded-2xl shadow-2xl"
            />
            <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-xl shadow-lg border border-gray-100">
              <div className="flex items-center space-x-3">
                <div className="flex -space-x-2">
                  <div className="w-8 h-8 bg-blue-500 rounded-full border-2 border-white" />
                  <div className="w-8 h-8 bg-green-500 rounded-full border-2 border-white" />
                  <div className="w-8 h-8 bg-purple-500 rounded-full border-2 border-white" />
                </div>
                <div>
                  <div className="text-sm font-medium text-black">Live Session</div>
                  <div className="text-xs text-gray-600">12 people practicing</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
