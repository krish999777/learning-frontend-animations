import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import yazleLogo from '../assets/yazle logos/yazleglobal_logo.jpeg';
import akaiLogo from '../assets/akai logos/akaispace_logo.jpeg';

gsap.registerPlugin(ScrollTrigger);

export default function Acquisitions() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const card1Ref = useRef<HTMLDivElement>(null);
  const card2Ref = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!sectionRef.current || !card1Ref.current || !card2Ref.current) return;

    const scrollTl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top top',
        end: '+=120%',
        scrub: true,
        pin: true,
      }
    });

    // Animate Card 1 out: text slides left/fades, image slides right/fades
    scrollTl.to('.c1-text', {
      x: -150,
      opacity: 0,
      duration: 0.6,
      ease: 'power2.inOut',
    });
    scrollTl.to('.c1-image', {
      x: 150,
      opacity: 0,
      duration: 0.6,
      ease: 'power2.inOut',
    }, '-=0.6');

    // Animate Card 2 in: image slides in from left, text slides in from right
    scrollTl.fromTo('.c2-image', 
      { x: -150, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.6, ease: 'power2.inOut' },
      '-=0.3'
    );
    scrollTl.fromTo('.c2-text', 
      { x: 150, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.6, ease: 'power2.inOut' },
      '-=0.6'
    );

    // Dummy spacer to hold State 2 pinned for a bit before release
    scrollTl.to({}, { duration: 0.3 });

  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} id="acquisitions" style={styles.section}>
      <div className="grid-bg"></div>
      <div className="green-glow" style={{ top: '30%', right: '10%' }}></div>
      <div className="green-glow" style={{ bottom: '20%', left: '10%' }}></div>

      <div ref={containerRef} style={styles.container}>
        {/* Card 1: Yazle (Text Left, Image Right) */}
        <div ref={card1Ref} className="acquisition-card" style={styles.card}>
          <div className="c1-text" style={styles.textColumn}>
            <div style={styles.badge}>M&A ANNOUNCEMENT</div>
            <h2 style={styles.heading}>
              Napptix <br />
              <span style={{ color: 'var(--accent-color)' }}>acquires</span> <br />
              Yazle MENA
            </h2>
            <p style={styles.description}>
              Expanding our digital ecosystem across the Middle East and North Africa. By integrating Yazle's premium gaming advertising networks, we unlock unparalleled reach for tier-1 brands in emerging markets.
            </p>
          </div>
          <div className="c1-image" style={styles.imageColumn}>
            <div style={styles.imageWrapper}>
              <img src={yazleLogo} alt="Yazle MENA Logo" style={styles.logoImage} />
              <div style={styles.borderGlow}></div>
            </div>
          </div>
        </div>

        {/* Card 2: Akai (Image Left, Text Right) - starts hidden */}
        <div ref={card2Ref} className="acquisition-card" style={{ ...styles.card, ...styles.cardOverlay }}>
          <div className="c2-image" style={styles.imageColumn}>
            <div style={styles.imageWrapper}>
              <img src={akaiLogo} alt="Akai Space Logo" style={styles.logoImage} />
              <div style={styles.borderGlow}></div>
            </div>
          </div>
          <div className="c2-text" style={{ ...styles.textColumn, ...styles.textColumnRight }}>
            <div style={styles.badge}>STRATEGIC EXPANSION</div>
            <h2 style={styles.heading}>
              Napptix <br />
              <span style={{ color: 'var(--accent-color)' }}>invests in</span> <br />
              Akai
            </h2>
            <p style={styles.description}>
              Strengthening our technology and esports production capability. The investment in Akai brings award-winning game dev talent and proprietary broadcasting solutions into the Napptix Media Suite.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

const styles = {
  section: {
    height: '100vh',
    backgroundColor: '#050505',
    position: 'relative' as const,
    width: '100%',
    overflow: 'hidden',
  },
  container: {
    height: '100vh',
    width: '90%',
    maxWidth: '1200px',
    margin: '0 auto',
    position: 'relative' as const,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    position: 'absolute' as const,
    inset: 0,
    display: 'flex',
    flexDirection: 'row' as const,
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    height: '100%',
    zIndex: 2,
    gap: '40px',
    padding: '80px 0',
  },
  cardOverlay: {
    zIndex: 1, // Card 2 sits under Card 1 initially, animated to front
  },
  textColumn: {
    flex: '1 1 50%',
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'flex-start',
    zIndex: 3,
  },
  textColumnRight: {
    alignItems: 'flex-start',
  },
  badge: {
    fontFamily: 'var(--font-display)',
    fontSize: '11px',
    fontWeight: 'bold',
    color: 'var(--accent-color)',
    border: '1px solid var(--accent-color)',
    padding: '4px 10px',
    borderRadius: '4px',
    marginBottom: '24px',
    letterSpacing: '0.1em',
  },
  heading: {
    fontSize: '56px',
    lineHeight: '1.05',
    color: '#fff',
    fontWeight: 800,
    marginBottom: '24px',
    fontFamily: 'var(--font-display)',
  },
  description: {
    fontSize: '16px',
    color: 'var(--text-muted)',
    lineHeight: 1.6,
    maxWidth: '460px',
  },
  imageColumn: {
    flex: '1 1 50%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 3,
  },
  imageWrapper: {
    position: 'relative' as const,
    width: '380px',
    height: '380px',
    backgroundColor: '#0c0d0f',
    border: '1px solid rgba(255, 255, 255, 0.05)',
    borderRadius: '24px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '40px',
    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.6)',
    overflow: 'hidden',
  },
  logoImage: {
    maxWidth: '100%',
    maxHeight: '100%',
    objectFit: 'contain' as const,
    borderRadius: '12px',
  },
  borderGlow: {
    position: 'absolute' as const,
    inset: 0,
    borderRadius: '24px',
    border: '1px solid transparent',
    background: 'linear-gradient(45deg, var(--accent-color), transparent) border-box',
    WebkitMask: 'linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0)',
    WebkitMaskComposite: 'xor',
    maskComposite: 'exclude',
    opacity: 0.15,
    pointerEvents: 'none' as const,
  },
};
