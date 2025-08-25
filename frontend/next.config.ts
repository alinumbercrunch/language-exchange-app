import nextBundleAnalyzer from '@next/bundle-analyzer';
import createNextIntlPlugin from 'next-intl/plugin';

const withBundleAnalyzer = nextBundleAnalyzer({
    enabled: process.env.ANALYZE === 'true',
});

const withNextIntl = createNextIntlPlugin();

const nextConfig = {
    // your Next.js configuration
    productionBrowserSourceMaps: true, // Keep source maps for now
};

// Compose the plugins together
export default withNextIntl(withBundleAnalyzer(nextConfig));
