import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const TOP_BRANDS = [
  'SONY', 'PLAYSTATION', 'XBOX', 'NINTENDO', 
  'STEAM', 'EPIC GAMES', 'EA SPORTS', 'UBISOFT',
  'RIOT GAMES', 'ACTIVISION', 'BLIZZARD', 'SEGA'
];

const BOTTOM_BRANDS = [
  'RAZER', 'LOGITECH G', 'CORSAIR', 'ASUS ROG', 
  'MSI GAMING', 'NVIDIA', 'AMD', 'INTEL CORE',
  'HYPERX', 'STEELSERIES', 'GIGABYTE', 'ALIENWARE'
];

export default function BrandCarousel() {
  const containerRef = useRef<HTMLDivElement>(null);
  const rowTopRef = useRef<HTMLDivElement>(null);
  const rowBottomRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!rowTopRef.current || !rowBottomRef.current) return;

    // Top Row: Scroll Left to Right (animating xPercent: -50 to 0)
    const topTween = gsap.fromTo(rowTopRef.current,
      { xPercent: -50 },
      {
        xPercent: 0,
        ease: 'none',
        duration: 25,
        repeat: -1,
      }
    );

    // Bottom Row: Scroll Right to Left (animating xPercent: 0 to -50)
    const bottomTween = gsap.fromTo(rowBottomRef.current,
      { xPercent: 0 },
      {
        xPercent: -50,
        ease: 'none',
        duration: 25,
        repeat: -1,
      }
    );

    // Pause on hover
    const topContainer = rowTopRef.current.parentElement;
    const bottomContainer = rowBottomRef.current.parentElement;

    if (topContainer) {
      topContainer.addEventListener('mouseenter', () => gsap.to(topTween, { timeScale: 0.1, duration: 0.5 }));
      topContainer.addEventListener('mouseleave', () => gsap.to(topTween, { timeScale: 1, duration: 0.5 }));
    }

    if (bottomContainer) {
      bottomContainer.addEventListener('mouseenter', () => gsap.to(bottomTween, { timeScale: 0.1, duration: 0.5 }));
      bottomContainer.addEventListener('mouseleave', () => gsap.to(bottomTween, { timeScale: 1, duration: 0.5 }));
    }

  }, { scope: containerRef });

  // Double the list of brands to make a seamless infinite scroll loop
  const topBrandsDoubled = [...TOP_BRANDS, ...TOP_BRANDS];
  const bottomBrandsDoubled = [...BOTTOM_BRANDS, ...BOTTOM_BRANDS];

  return (
    <section ref={containerRef} id="carousel" style={styles.section}>
      <div style={styles.header}>
        <h2 style={styles.title}>TRUSTED BY GLOBAL LEAGUE BRANDS</h2>
        <p style={styles.subtitle}>We power campaigns and digital ecosystems for the industry's heaviest players.</p>
      </div>

      <div style={styles.carouselWrapper}>
        {/* Row 1: Left to Right */}
        <div style={styles.marqueeContainer}>
          <div ref={rowTopRef} style={styles.marqueeRow}>
            {topBrandsDoubled.map((brand, i) => (
              <div key={`top-${brand}-${i}`} className="brand-card">
                <div className="card-glow"></div>
                <span className="brand-text">{brand}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Row 2: Right to Left */}
        <div style={styles.marqueeContainer}>
          <div ref={rowBottomRef} style={styles.marqueeRow}>
            {bottomBrandsDoubled.map((brand, i) => (
              <div key={`bottom-${brand}-${i}`} className="brand-card">
                <div className="card-glow"></div>
                <span className="brand-text">{brand}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

const styles = {
  section: {
    padding: '120px 0',
    backgroundColor: '#050505',
    width: '100%',
    overflow: 'hidden',
    position: 'relative' as const,
    borderTop: '1px solid rgba(255, 255, 255, 0.02)',
    borderBottom: '1px solid rgba(255, 255, 255, 0.02)',
  },
  header: {
    textAlign: 'center' as const,
    maxWidth: '650px',
    margin: '0 auto 60px',
    padding: '0 20px',
  },
  title: {
    fontSize: '32px',
    fontWeight: 700,
    letterSpacing: '-0.02em',
    color: '#fff',
    marginBottom: '16px',
    fontFamily: 'var(--font-display)',
  },
  subtitle: {
    fontSize: '16px',
    color: 'var(--text-muted)',
    lineHeight: 1.6,
  },
  carouselWrapper: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '24px',
    width: '100%',
  },
  marqueeContainer: {
    width: '100%',
    overflow: 'hidden',
    display: 'flex',
    cursor: 'pointer',
  },
  marqueeRow: {
    display: 'flex',
    gap: '24px',
    whiteSpace: 'nowrap' as const,
    willChange: 'transform',
  },
};
