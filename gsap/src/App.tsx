import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import BrandCarousel from './components/BrandCarousel';
import Acquisitions from './components/Acquisitions';
import { Terminal } from 'lucide-react';


gsap.registerPlugin(ScrollTrigger);

function App() {
  const appRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Top Scroll Progress Bar
    gsap.fromTo('.scroll-progress',
      { scaleX: 0 },
      {
        scaleX: 1,
        transformOrigin: 'left center',
        ease: 'none',
        scrollTrigger: {
          trigger: appRef.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: true,
        }
      }
    );

    // Fade-in animations for section titles and copy
    gsap.utils.toArray('.fade-in-section').forEach((section: any) => {
      gsap.from(section, {
        opacity: 0,
        y: 40,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 85%',
          toggleActions: 'play none none reverse'
        }
      });
    });
  }, { scope: appRef });

  return (
    <div ref={appRef} className="app-wrapper" style={styles.appWrapper}>
      {/* Scroll Progress Indicator */}
      <div className="scroll-progress" style={styles.scrollProgress}></div>

      {/* Navigation Header */}
      <Navbar />

      {/* Hero Animation Section */}
      <Hero />

      {/* Brand Partners Carousel */}
      <BrandCarousel />

      {/* Acquisition Timelines */}
      <Acquisitions />

      {/* About & Studio Stats Section */}
      <section id="about" className="fade-in-section" style={styles.aboutSection}>
        <div className="grid-bg"></div>
        <div style={styles.aboutContainer}>
          <div style={styles.aboutText}>
            <div style={styles.accentBadge}>
              <Terminal size={12} color="var(--accent-color)" />
              <span>THE NAPPTIX STUDIO</span>
            </div>
            <h2 style={styles.aboutTitle}>
              BUILDING THE <br />
              <span style={{ color: 'var(--accent-color)' }}>NEXT ARCHITECTURE</span> OF BRAND MEDIA
            </h2>
            <p style={styles.aboutParagraph}>
              We are a collective of designers, technologists, and storytellers who believe that brand attention is won in active experiences. By bringing esports production, gaming mechanics, and immersive technology to high-end campaigns, we bridge the gap between traditional media and next-gen audiences.
            </p>
          </div>

          <div style={styles.statsGrid}>
            <div style={styles.statCard}>
              <h3 style={styles.statNumber}>120M+</h3>
              <p style={styles.statLabel}>Active Gaming Reach</p>
            </div>
            <div style={styles.statCard}>
              <h3 style={styles.statNumber}>45+</h3>
              <p style={styles.statLabel}>Award Wins</p>
            </div>
            <div style={styles.statCard}>
              <h3 style={styles.statNumber}>3</h3>
              <p style={styles.statLabel}>Global Studios</p>
            </div>
            <div style={styles.statCard}>
              <h3 style={styles.statNumber}>1</h3>
              <p style={styles.statLabel}>Unified Vision</p>
            </div>
          </div>
        </div>
      </section>

      {/* Premium Footer */}
      <footer style={styles.footer}>
        <div style={styles.footerTop}>
          <div style={styles.footerBrand}>
            <h3 style={styles.footerLogoText}>NAPPTIX</h3>
            <p style={styles.footerBrandDesc}>
              A premium digital creative agency and media engine. Redefining interactive entertainment.
            </p>
          </div>

          <div style={styles.footerLinkGroup}>
            <h4 style={styles.footerLinkHeader}>STUDIO</h4>
            <a href="#hero" style={styles.footerLink}>Home</a>
            <a href="#carousel" style={styles.footerLink}>Brands</a>
            <a href="#acquisitions" style={styles.footerLink}>Acquisitions</a>
            <a href="#about" style={styles.footerLink}>About</a>
          </div>

          <div style={styles.footerLinkGroup}>
            <h4 style={styles.footerLinkHeader}>CONNECT</h4>
            <a href="https://twitter.com" target="_blank" rel="noreferrer" style={styles.footerLink}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '8px' }}>
                <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/>
              </svg> Twitter
            </a>
            <a href="https://github.com" target="_blank" rel="noreferrer" style={styles.footerLink}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '8px' }}>
                <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/>
                <path d="M9 18c-4.51 2-5-2-7-2"/>
              </svg> GitHub
            </a>
            <a href="https://youtube.com" target="_blank" rel="noreferrer" style={styles.footerLink}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '8px' }}>
                <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17z"/>
                <polygon points="10 15 15 12 10 9"/>
              </svg> YouTube
            </a>
          </div>
        </div>

        <div style={styles.footerBottom}>
          <p style={styles.copyright}>&copy; 2026 Napptix Media Group. All rights reserved.</p>
          <div style={styles.footerBottomLinks}>
            <a href="#privacy" style={styles.footerBottomLink}>Privacy Policy</a>
            <a href="#terms" style={styles.footerBottomLink}>Terms of Service</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

const styles = {
  appWrapper: {
    backgroundColor: '#050505',
    minHeight: '100vh',
    width: '100%',
    overflowX: 'hidden' as const,
    position: 'relative' as const,
  },
  scrollProgress: {
    position: 'fixed' as const,
    top: 0,
    left: 0,
    height: '4px',
    width: '100%',
    backgroundColor: 'var(--accent-color)',
    zIndex: 999,
    boxShadow: '0 0 10px var(--accent-color)',
  },
  aboutSection: {
    padding: '140px 0',
    backgroundColor: '#07080a',
    position: 'relative' as const,
    borderTop: '1px solid rgba(255, 255, 255, 0.03)',
    borderBottom: '1px solid rgba(255, 255, 255, 0.03)',
    width: '100%',
  },
  aboutContainer: {
    width: '90%',
    maxWidth: '1200px',
    margin: '0 auto',
    display: 'flex',
    flexDirection: 'row' as const,
    flexWrap: 'wrap' as const,
    gap: '60px',
    alignItems: 'center',
    zIndex: 2,
    position: 'relative' as const,
  },
  aboutText: {
    flex: '1 1 500px',
  },
  accentBadge: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    fontFamily: 'var(--font-display)',
    fontSize: '11px',
    color: 'var(--accent-color)',
    letterSpacing: '0.1em',
    marginBottom: '20px',
  },
  aboutTitle: {
    fontSize: '44px',
    lineHeight: '1.1',
    fontWeight: 800,
    color: '#fff',
    fontFamily: 'var(--font-display)',
    marginBottom: '24px',
  },
  aboutParagraph: {
    fontSize: '16px',
    color: 'var(--text-muted)',
    lineHeight: 1.7,
    maxWidth: '560px',
  },
  statsGrid: {
    flex: '1 1 400px',
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '24px',
  },
  statCard: {
    backgroundColor: '#0c0d0f',
    border: '1px solid rgba(255, 255, 255, 0.03)',
    padding: '32px 24px',
    borderRadius: '16px',
    textAlign: 'center' as const,
    transition: 'border-color 0.3s ease',
    '&:hover': {
      borderColor: 'var(--accent-color)',
    }
  },
  statNumber: {
    fontFamily: 'var(--font-display)',
    fontSize: '36px',
    fontWeight: 700,
    color: 'var(--accent-color)',
    marginBottom: '8px',
    textShadow: '0 0 15px var(--accent-glow)',
  },
  statLabel: {
    fontSize: '13px',
    color: 'var(--text-muted)',
    fontWeight: 500,
  },
  footer: {
    backgroundColor: '#050505',
    padding: '80px 5% 40px',
    borderTop: '1px solid rgba(255, 255, 255, 0.03)',
    width: '100%',
  },
  footerTop: {
    width: '100%',
    maxWidth: '1200px',
    margin: '0 auto 60px',
    display: 'flex',
    flexDirection: 'row' as const,
    flexWrap: 'wrap' as const,
    justifyContent: 'space-between',
    gap: '40px',
  },
  footerBrand: {
    maxWidth: '320px',
  },
  footerLogoText: {
    fontFamily: 'var(--font-display)',
    fontSize: '28px',
    fontWeight: 900,
    color: '#fff',
    letterSpacing: '0.05em',
    marginBottom: '16px',
  },
  footerBrandDesc: {
    fontSize: '14px',
    color: 'var(--text-muted)',
    lineHeight: 1.6,
  },
  footerLinkGroup: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '12px',
  },
  footerLinkHeader: {
    fontFamily: 'var(--font-display)',
    fontSize: '12px',
    color: 'var(--accent-color)',
    letterSpacing: '0.1em',
    fontWeight: 700,
    marginBottom: '8px',
  },
  footerLink: {
    fontSize: '14px',
    color: 'var(--text-muted)',
    transition: 'color 0.3s ease',
    display: 'inline-flex',
    alignItems: 'center',
    '&:hover': {
      color: '#fff',
    }
  },
  footerBottom: {
    width: '100%',
    maxWidth: '1200px',
    margin: '0 auto',
    paddingTop: '30px',
    borderTop: '1px solid rgba(255, 255, 255, 0.05)',
    display: 'flex',
    flexDirection: 'row' as const,
    flexWrap: 'wrap' as const,
    justifyContent: 'space-between',
    gap: '20px',
    alignItems: 'center',
  },
  copyright: {
    fontSize: '13px',
    color: '#555',
  },
  footerBottomLinks: {
    display: 'flex',
    gap: '24px',
  },
  footerBottomLink: {
    fontSize: '13px',
    color: '#555',
    transition: 'color 0.3s ease',
    '&:hover': {
      color: 'var(--accent-color)',
    }
  },
};
export default App;
