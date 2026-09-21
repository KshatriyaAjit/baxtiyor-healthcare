/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  async redirects() {
    return [
      {
        source: '/kidney-transplant',
        destination: '/en/treatments/kidney-transplant-india',
        permanent: true,
      },
      {
        source: '/liver-transplant',
        destination: '/en/treatments/liver-transplant-india',
        permanent: true,
      },
      {
        source: '/cardiac-surgery',
        destination: '/en/treatments/heart-surgery-india',
        permanent: true,
      },
      {
        source: '/knee-replacement',
        destination: '/en/treatments/knee-replacement-india',
        permanent: true,
      },
      {
        source: '/hip-replacement',
        destination: '/en/treatments/hip-replacement-india',
        permanent: true,
      },
      {
        source: '/cost-estimate',
        destination: '/en/treatment-cost',
        permanent: true,
      },
      {
        source: '/hospitals-in-india',
        destination: '/en/hospitals',
        permanent: true,
      },
      {
        source: '/fortis-hospital',
        destination: '/en/hospitals/fortis-memorial-research-institute',
        permanent: true,
      },
      {
        source: '/artemis-hospital',
        destination: '/en/hospitals/artemis-hospital-gurgaon',
        permanent: true,
      },
      {
        source: '/sanar-hospital',
        destination: '/en/hospitals/shalby-sanar-international',
        permanent: true,
      },
      {
        source: '/marengo-hospital',
        destination: '/en/hospitals/marengo-asia-international',
        permanent: true,
      },
      {
        source: '/patient-reviews',
        destination: '/en/patient-stories',
        permanent: true,
      },
    ];
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload',
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;

