import { useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { Shield, Zap, Swords, Trophy, Activity } from 'lucide-react';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const gameFrameRef = useRef<HTMLDivElement>(null);
  const adContainerRef = useRef<HTMLDivElement>(null);
  const textContentRef = useRef<HTMLDivElement>(null);
  const [activePhase, setActivePhase] = useState<'in-game' | 'on-game' | 'off-game' | 'pro-game'>('in-game');

  useGSAP(() => {
    if (!containerRef.current || !stickyRef.current || !videoRef.current || !gameFrameRef.current || !adContainerRef.current) return;

    // Headline reveal animation on load
    const loadTl = gsap.timeline();
    loadTl.from('.headline-span', {
      y: 100,
      opacity: 0,
      duration: 1.2,
      stagger: 0.15,
      ease: 'power4.out',
    });
    loadTl.from('.hero-sub', {
      opacity: 0,
      y: 20,
      duration: 0.8,
      ease: 'power3.out',
    }, '-=0.6');
    loadTl.from('.hero-cta', {
      opacity: 0,
      y: 20,
      duration: 0.6,
      ease: 'power3.out',
    }, '-=0.4');
    loadTl.from('.hero-game-frame', {
      scale: 0.9,
      opacity: 0,
      duration: 1.2,
      ease: 'power3.out',
    }, '-=0.8');

    // Scroll-driven animation timeline
    const scrollTl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: '+=450%',
        scrub: 1,
        pin: true,
        onUpdate: (self) => {
          const video = videoRef.current;
          if (video && video.duration && !isNaN(video.duration)) {
            const targetTime = self.progress * video.duration;
            if (!video.seeking) {
              video.currentTime = targetTime;
            }
            if (targetTime < 6) {
              setActivePhase('in-game');
            } else if (targetTime < 18) {
              setActivePhase('on-game');
            } else if (targetTime < 27) {
              setActivePhase('off-game');
            } else {
              setActivePhase('pro-game');
            }
          }
        }
      }
    });

    // STAGE 1: Fade out text, slide out HUD, expand video to fill game frame
    scrollTl.to(textContentRef.current, {
      opacity: 0,
      y: -100,
      duration: 0.15,
      ease: 'power2.inOut',
    });

    scrollTl.to('.game-ui-left', {
      x: -350,
      opacity: 0,
      duration: 0.15,
      ease: 'power2.inOut',
    }, '-=0.1');

    scrollTl.to('.game-ui-right', {
      x: 350,
      opacity: 0,
      duration: 0.15,
      ease: 'power2.inOut',
    }, '-=0.15');

    scrollTl.to('.game-ui-top', {
      y: -180,
      opacity: 0,
      duration: 0.15,
      ease: 'power2.inOut',
    }, '-=0.15');

    scrollTl.to('.game-ui-bottom', {
      y: 180,
      opacity: 0,
      duration: 0.15,
      ease: 'power2.inOut',
    }, '-=0.15');

    scrollTl.to('.ad-tag, .crosshair', {
      opacity: 0,
      duration: 0.1,
      ease: 'power2.out',
    }, '-=0.15');

    // Ad slot video expands to cover the internal gameFrame area
    scrollTl.to(adContainerRef.current, {
      width: '100%',
      height: '100%',
      left: '0%',
      top: '0%',
      borderRadius: '16px',
      borderWidth: '0px',
      boxShadow: 'none',
      duration: 0.15,
      ease: 'power2.inOut',
    }, '-=0.15');

    // STAGE 2: Grow the gameFrame itself to full viewport screen size
    scrollTl.to(gameFrameRef.current, {
      width: '100vw',
      height: '100vh',
      maxWidth: '100vw',
      maxHeight: '100vh',
      left: '0px',
      bottom: '0px',
      borderRadius: '0px',
      borderWidth: '0px',
      duration: 0.2,
      ease: 'power2.inOut',
    });

    // Animate ad container border radius to 0px in sync with the game frame
    scrollTl.to(adContainerRef.current, {
      borderRadius: '0px',
      duration: 0.2,
      ease: 'power2.inOut',
    }, '<');

    // STAGE 3: Hold the full screen state for scroll cushion
    scrollTl.to({}, { duration: 2.5 });

  }, { scope: containerRef });

  return (
    <section ref={containerRef} id="hero" style={styles.heroSection}>
      <div ref={stickyRef} style={styles.stickyContainer}>
        <div className="grid-bg"></div>
        <div className="green-glow" style={{ top: '10%', left: '5%' }}></div>
        <div className="green-glow" style={{ bottom: '10%', right: '5%' }}></div>

        {/* Text Content - Positioned responsively via CSS class */}
        <div ref={textContentRef} className="hero-text-content">
          <div className="reveal-wrapper" style={{ marginBottom: '10px' }}>
            <h1 className="headline-span" style={styles.title}>
              REDEFINING
            </h1>
          </div>
          <div className="reveal-wrapper" style={{ marginBottom: '20px' }}>
            <h1 className="headline-span" style={{ ...styles.title, color: 'var(--accent-color)' }}>
              DIGITAL EXPERIENCE
            </h1>
          </div>
          <p className="hero-sub" style={styles.subtitle}>
            Napptix is a premium creative agency bridging esports, gaming, and high-performance brand communication.
          </p>
          <div className="hero-cta" style={styles.ctaWrapper}>
            <button className="btn-primary">
              Explore Projects <Zap size={16} fill="currentColor" />
            </button>
            <button className="btn-secondary">Learn Our Process</button>
          </div>
        </div>

        {/* Game UI / Video Section - Positioned responsively via CSS class */}
        <div ref={gameFrameRef} className="game-frame hero-game-frame">
          {/* Top Panel */}
          <div className="game-ui-top" style={styles.uiTop}>
            <div style={styles.uiGroup}>
              <Trophy size={14} color="var(--accent-color)" />
              <span style={styles.uiText}>LEAGUE CHAMPIONSHIP</span>
            </div>
            <div style={styles.uiCenterClock}>
              <span style={styles.uiTextClock}>MATCH TIME 14:32</span>
            </div>
            <div style={styles.uiGroup}>
              <span style={styles.uiText}>PING: 12MS</span>
              <Activity size={14} color="var(--accent-color)" />
            </div>
          </div>

          {/* Left Panel */}
          <div className="game-ui-left" style={styles.uiLeft}>
            <div style={styles.hudPanel}>
              <h4 style={styles.hudHeader}>MINIMAP</h4>
              <div style={styles.minimap}>
                <div style={styles.minimapRadar}></div>
                <div style={styles.minimapBlip}></div>
              </div>
            </div>
            <div style={styles.hudPanel}>
              <h4 style={styles.hudHeader}>TEAM STATUS</h4>
              <div style={styles.hudRow}><div style={styles.statusDotGreen}></div> <span>NAPPTIX [ALIVE]</span></div>
              <div style={styles.hudRow}><div style={styles.statusDotGreen}></div> <span>YAZLE [ALIVE]</span></div>
              <div style={styles.hudRow}><div style={styles.statusDotGreen}></div> <span>AKAI [ALIVE]</span></div>
            </div>
          </div>

          {/* Center Ad slot (Video) - Absolutely positioned */}
          <div ref={adContainerRef} className="ad-container" style={styles.adContainer}>
            <div className="ad-tag" style={styles.adTag}>SPONSORED AD</div>
            <video
              ref={videoRef}
              src="/napptix-hero.mp4"
              style={styles.video}
              muted
              playsInline
              preload="auto"
              loop
            />
            {/* High-tech Timeline Overlay on the right */}
            <div style={styles.videoLabels}>
              {/* IN-GAME */}
              <div style={{
                ...styles.videoLabelItem,
                color: activePhase === 'in-game' ? '#ffffff' : 'rgba(255, 255, 255, 0.4)',
                transform: activePhase === 'in-game' ? 'translateX(calc(-1 * clamp(6px, 1cqw, 16px))) scale(1.08)' : 'translateX(0) scale(1)',
                textShadow: activePhase === 'in-game' ? '0 0 12px rgba(255, 255, 255, 0.5)' : 'none',
              }}>
                <span style={{ fontWeight: activePhase === 'in-game' ? 700 : 500 }}>IN-GAME</span>
              </div>

              {/* ON-GAME */}
              <div style={{
                ...styles.videoLabelItem,
                color: activePhase === 'on-game' ? '#ffffff' : 'rgba(255, 255, 255, 0.4)',
                transform: activePhase === 'on-game' ? 'translateX(calc(-1 * clamp(6px, 1cqw, 16px))) scale(1.08)' : 'translateX(0) scale(1)',
                textShadow: activePhase === 'on-game' ? '0 0 12px rgba(255, 255, 255, 0.5)' : 'none',
              }}>
                <span style={{ fontWeight: activePhase === 'on-game' ? 700 : 500 }}>ON-GAME</span>
              </div>

              {/* OFF-GAME */}
              <div style={{
                ...styles.videoLabelItem,
                color: activePhase === 'off-game' ? '#ffffff' : 'rgba(255, 255, 255, 0.4)',
                transform: activePhase === 'off-game' ? 'translateX(calc(-1 * clamp(6px, 1cqw, 16px))) scale(1.08)' : 'translateX(0) scale(1)',
                textShadow: activePhase === 'off-game' ? '0 0 12px rgba(255, 255, 255, 0.5)' : 'none',
              }}>
                <span style={{ fontWeight: activePhase === 'off-game' ? 700 : 500 }}>OFF-GAME</span>
              </div>

              {/* PRO-GAME */}
              <div style={{
                ...styles.videoLabelItem,
                color: activePhase === 'pro-game' ? '#ffffff' : 'rgba(255, 255, 255, 0.4)',
                transform: activePhase === 'pro-game' ? 'translateX(calc(-1 * clamp(6px, 1cqw, 16px))) scale(1.08)' : 'translateX(0) scale(1)',
                textShadow: activePhase === 'pro-game' ? '0 0 12px rgba(255, 255, 255, 0.5)' : 'none',
              }}>
                <span style={{ fontWeight: activePhase === 'pro-game' ? 700 : 500 }}>PRO-GAME</span>
              </div>
            </div>

            {/* Center Crosshair Overlay */}
            <div className="crosshair" style={styles.crosshair}>
              <div style={styles.crosshairHorizontal}></div>
              <div style={styles.crosshairVertical}></div>
            </div>
          </div>

          {/* Right Panel */}
          <div className="game-ui-right" style={styles.uiRight}>
            <div style={styles.hudPanel}>
              <h4 style={styles.hudHeader}>LOADOUT</h4>
              <div style={styles.hudRow}><Swords size={14} /> <span>CREATIVE ENGINE v3</span></div>
              <div style={styles.hudRow}><Shield size={14} /> <span>BRAND DEFENSE v1.8</span></div>
            </div>
            <div style={styles.hudPanel}>
              <h4 style={styles.hudHeader}>CHAT FEED</h4>
              <div style={styles.chatFeed}>
                <p style={styles.chatText}><strong style={{color:'var(--accent-color)'}}>Napptix:</strong> server online</p>
                <p style={styles.chatText}><strong>Yazle:</strong> ready for campaign</p>
                <p style={styles.chatText}><strong>Akai:</strong> design initialized</p>
              </div>
            </div>
          </div>

          {/* Bottom Panel */}
          <div className="game-ui-bottom" style={styles.uiBottom}>
            <div style={styles.healthBarContainer}>
              <span style={styles.healthLabel}>HP</span>
              <div style={styles.healthBarOuter}>
                <div style={styles.healthBarInner}></div>
              </div>
              <span style={styles.healthValue}>100 / 100</span>
            </div>
            <div style={styles.ammoContainer}>
              <span style={styles.uiText}>AMMO: INFINITE</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

const styles = {
  heroSection: {
    height: '100vh',
    position: 'relative' as const,
    backgroundColor: 'var(--bg-color)',
    width: '100%',
  },
  stickyContainer: {
    height: '100vh',
    position: 'sticky' as const,
    top: 0,
    left: 0,
    width: '100%',
    overflow: 'hidden',
  },
  title: {
    fontSize: 'clamp(32px, 6.5vh, 70px)',
    fontWeight: 800,
    margin: 0,
    display: 'block',
    lineHeight: 1.0,
    letterSpacing: '-0.03em',
  },
  subtitle: {
    fontSize: 'clamp(14px, 1.8vh, 18px)',
    maxWidth: '550px',
    margin: 'clamp(10px, 2vh, 20px) auto clamp(12px, 2.5vh, 30px)',
    color: 'var(--text-muted)',
    lineHeight: 1.6,
  },
  ctaWrapper: {
    display: 'flex',
    gap: 'clamp(8px, 1.5vh, 16px)',
    justifyContent: 'center',
  },
  videoLabels: {
    position: 'absolute' as const,
    right: 'clamp(20px, 4.5cqw, 80px)',
    top: '50%',
    transform: 'translateY(-50%)',
    display: 'flex',
    flexDirection: 'column' as const,
    gap: 'clamp(16px, 4.5cqw, 64px)',
    zIndex: 10,
    pointerEvents: 'none' as const,
  },
  videoLabelItem: {
    display: 'flex',
    alignItems: 'center',
    fontFamily: 'var(--font-display)',
    fontSize: 'clamp(24px, 4.5cqw, 64px)',
    letterSpacing: '0.05em',
    transition: 'all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)',
  },
  adContainer: {
    position: 'absolute' as const,
    left: '27.5%',
    top: '20%',
    width: '45%',
    height: '60%',
    backgroundColor: '#000',
    border: '2px solid var(--accent-color)',
    borderRadius: '8px',
    overflow: 'hidden',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 4,
    boxShadow: '0 0 30px var(--accent-glow)',
    containerType: 'inline-size' as const,
  },
  adTag: {
    position: 'absolute' as const,
    top: 'clamp(8px, 1.5cqw, 20px)',
    left: 'clamp(8px, 1.5cqw, 20px)',
    backgroundColor: 'rgba(47, 221, 61, 0.9)',
    color: '#000',
    fontSize: 'clamp(8px, 1.3cqw, 16px)',
    fontWeight: 'bold',
    padding: 'clamp(2px, 0.4cqw, 6px) clamp(6px, 1cqw, 16px)',
    borderRadius: 'clamp(4px, 0.6cqw, 8px)',
    letterSpacing: '0.1em',
    zIndex: 10,
    fontFamily: 'var(--font-display)',
  },
  video: {
    width: '100%',
    height: '100%',
    objectFit: 'cover' as const,
  },
  crosshair: {
    position: 'absolute' as const,
    width: '16px',
    height: '16px',
    border: '1px solid rgba(47, 221, 61, 0.7)',
    borderRadius: '50%',
    pointerEvents: 'none' as const,
    zIndex: 9,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  crosshairHorizontal: {
    position: 'absolute' as const,
    width: '24px',
    height: '1px',
    backgroundColor: 'rgba(47, 221, 61, 0.7)',
  },
  crosshairVertical: {
    position: 'absolute' as const,
    width: '1px',
    height: '24px',
    backgroundColor: 'rgba(47, 221, 61, 0.7)',
  },
  uiTop: {
    position: 'absolute' as const,
    top: 0,
    left: 0,
    width: '100%',
    height: '40px',
    backgroundColor: 'rgba(10, 11, 13, 0.9)',
    borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0 20px',
    zIndex: 6,
  },
  uiGroup: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  uiText: {
    fontFamily: 'var(--font-display)',
    fontSize: '10px',
    color: 'var(--text-muted)',
    fontWeight: 500,
    letterSpacing: '0.05em',
  },
  uiCenterClock: {
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    borderInline: '1px solid rgba(255, 255, 255, 0.05)',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    padding: '0 20px',
  },
  uiTextClock: {
    fontFamily: 'var(--font-display)',
    fontSize: '11px',
    color: 'var(--accent-color)',
    fontWeight: 600,
    letterSpacing: '0.05em',
  },
  uiLeft: {
    position: 'absolute' as const,
    left: 0,
    top: '40px',
    width: '180px',
    bottom: '40px',
    padding: '16px',
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '16px',
    borderRight: '1px solid rgba(255, 255, 255, 0.05)',
    backgroundColor: 'rgba(10, 11, 13, 0.7)',
    zIndex: 6,
  },
  hudPanel: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '8px',
  },
  hudHeader: {
    fontFamily: 'var(--font-display)',
    fontSize: '9px',
    color: 'var(--accent-color)',
    letterSpacing: '0.1em',
    fontWeight: 600,
    marginBottom: '2px',
  },
  minimap: {
    width: '100%',
    height: '90px',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    position: 'relative' as const,
    borderRadius: '4px',
    overflow: 'hidden',
  },
  minimapRadar: {
    position: 'absolute' as const,
    top: '-50%',
    left: '-50%',
    width: '200%',
    height: '200%',
    background: 'radial-gradient(circle, transparent 30%, rgba(47, 221, 61, 0.03) 60%, rgba(47, 221, 61, 0.1) 100%)',
    animation: 'spin 4s linear infinite',
  },
  minimapBlip: {
    position: 'absolute' as const,
    top: '40%',
    left: '50%',
    width: '6px',
    height: '6px',
    backgroundColor: 'var(--accent-color)',
    borderRadius: '50%',
    boxShadow: '0 0 8px var(--accent-color)',
  },
  hudRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontSize: '9px',
    fontFamily: 'var(--font-display)',
    color: 'var(--text-color)',
  },
  statusDotGreen: {
    width: '5px',
    height: '5px',
    backgroundColor: 'var(--accent-color)',
    borderRadius: '50%',
  },
  uiRight: {
    position: 'absolute' as const,
    right: 0,
    top: '40px',
    width: '180px',
    bottom: '40px',
    padding: '16px',
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '16px',
    borderLeft: '1px solid rgba(255, 255, 255, 0.05)',
    backgroundColor: 'rgba(10, 11, 13, 0.7)',
    zIndex: 6,
  },
  chatFeed: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '6px',
    maxHeight: '120px',
    overflow: 'hidden',
  },
  chatText: {
    fontSize: '9px',
    lineHeight: '1.2',
    color: '#ccc',
  },
  uiBottom: {
    position: 'absolute' as const,
    bottom: 0,
    left: 0,
    width: '100%',
    height: '40px',
    backgroundColor: 'rgba(10, 11, 13, 0.9)',
    borderTop: '1px solid rgba(255, 255, 255, 0.05)',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0 20px',
    zIndex: 6,
  },
  healthBarContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    flex: 1,
    maxWidth: '300px',
  },
  healthLabel: {
    fontFamily: 'var(--font-display)',
    fontSize: '10px',
    fontWeight: 'bold',
    color: 'var(--accent-color)',
  },
  healthBarOuter: {
    height: '8px',
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: '2px',
    overflow: 'hidden',
  },
  healthBarInner: {
    height: '100%',
    width: '100%',
    backgroundColor: 'var(--accent-color)',
    boxShadow: '0 0 10px var(--accent-color)',
  },
  healthValue: {
    fontSize: '9px',
    fontFamily: 'var(--font-display)',
    color: 'var(--text-color)',
  },
  ammoContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
  },
};
