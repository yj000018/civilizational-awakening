/**
 * Connect — intention and connection page
 */

import Layout from '@/components/Layout';

export default function Connect() {
  return (
    <Layout>
      <div className="container py-24">
        <div className="max-w-2xl">
          <p
            className="text-xs uppercase tracking-widest mb-8"
            style={{ opacity: 0.35, fontFamily: 'Inter, sans-serif', letterSpacing: '0.12em' }}
          >
            Connect
          </p>

          <h1
            className="mb-8"
            style={{
              fontFamily: 'Cormorant Garamond, Georgia, serif',
              fontSize: 'clamp(2rem, 5vw, 3.5rem)',
              fontWeight: 400,
              lineHeight: 1.1,
            }}
          >
            Who I am looking to meet
          </h1>

          <p
            className="text-xl mb-12"
            style={{
              fontFamily: 'Cormorant Garamond, Georgia, serif',
              fontStyle: 'italic',
              opacity: 0.7,
              lineHeight: 1.7,
            }}
          >
            I am looking to connect with thinkers, builders, artists, researchers and actors of change
            exploring human flourishing, consciousness, AI, collective intelligence and the future of civilization.
          </p>

          <div
            className="border-l-2 pl-6 mb-12 space-y-4"
            style={{ borderColor: 'var(--accent)' }}
          >
            {[
              'Researchers and philosophers of consciousness and mind',
              'Builders working on AI for human flourishing',
              'Artists exploring the intersection of technology and beauty',
              'Architects of new social, educational and civilizational systems',
              'Actors of change working on collective intelligence',
            ].map((item) => (
              <p key={item} className="text-sm" style={{ opacity: 0.65 }}>
                {item}
              </p>
            ))}
          </div>

          <p className="text-sm" style={{ opacity: 0.4, fontFamily: 'Inter, sans-serif' }}>
            Contact form and direct connection coming in Phase 2.
          </p>
        </div>
      </div>
    </Layout>
  );
}
