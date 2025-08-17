import { Award, Calendar, MessageCircle, Users } from 'lucide-react';
import React from 'react';

interface FeatureProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

/**
 * Individual feature card component displaying an icon, title, and description.
 * 
 * @param icon - React node representing the feature icon
 * @param title - Feature title text
 * @param description - Feature description text
 * @returns A centered feature card with icon, title, and description
 */
export const FeatureCard: React.FC<FeatureProps> = ({ icon, title, description }) => {
  return (
    <div className="text-center space-y-4">
      <div className="flex justify-center">
        <div className="p-3 bg-gray-100 rounded-xl">
          {icon}
        </div>
      </div>
      <h3 className="text-xl font-semibold text-black">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

interface FeaturesSectionProps {
  title?: string;
  subtitle?: string;
  features?: FeatureProps[];
}

export const FeaturesSection: React.FC<FeaturesSectionProps> = ({
  title = "Everything you need to succeed",
  subtitle = "Our platform provides all the tools and community support you need to master any language.",
  features = [
    {
      icon: <MessageCircle className="w-8 h-8 text-black" />,
      title: "Real Conversations",
      description: "Practice with native speakers through video calls, voice messages, and text chat."
    },
    {
      icon: <Users className="w-8 h-8 text-black" />,
      title: "Global Community",
      description: "Connect with learners and teachers from over 190 countries worldwide."
    },
    {
      icon: <Calendar className="w-8 h-8 text-black" />,
      title: "Flexible Scheduling",
      description: "Book sessions that fit your schedule with our easy-to-use calendar system."
    },
    {
      icon: <Award className="w-8 h-8 text-black" />,
      title: "Track Progress",
      description: "Monitor your improvement with detailed analytics and achievement badges."
    }
  ]
}) => {
  return (
    <section className="px-6 py-16 lg:px-12 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl lg:text-5xl font-medium text-black">{title}</h2>
          <p className="text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto">
            {subtitle}
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature) => (
            <FeatureCard
              key={feature.title}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
