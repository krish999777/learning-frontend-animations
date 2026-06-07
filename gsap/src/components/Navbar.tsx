import { useState, useRef } from 'react';
import { Menu, X } from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import logoImg from '../assets/napptix logos/napptix_white_logo.png';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Initial entrance animation
    const tl = gsap.timeline();
    tl.from('.nav-logo-wrapper', {
      y: -20,
      opacity: 0,
      duration: 0.8,
      ease: 'power4.out',
    });
    tl.from('.nav-link', {
      y: -20,
      opacity: 0,
      duration: 0.8,
      stagger: 0.1,
      ease: 'power4.out',
    }, '-=0.6');
    tl.from('.cta-container', {
      scale: 0.8,
      opacity: 0,
      duration: 0.6,
      ease: 'back.out(1.7)',
    }, '-=0.4');
  }, { scope: navRef });

  const toggleMenu = () => {
    if (!isOpen) {
      setIsOpen(true);
      // Open animation
      gsap.fromTo(menuRef.current, 
        { y: -100, opacity: 0 }, 
        { y: 0, opacity: 1, duration: 0.4, ease: 'power3.out' }
      );
    } else {
      // Close animation
      gsap.to(menuRef.current, {
        y: -100,
        opacity: 0,
        duration: 0.3,
        ease: 'power3.in',
        onComplete: () => setIsOpen(false)
      });
    }
  };

  return (
    <nav ref={navRef} className="navbar">
      <div className="nav-container">
        {/* Logo */}
        <div className="nav-logo-wrapper">
          <img src={logoImg} alt="Napptix" className="nav-logo-img" />
        </div>

        {/* Desktop Navigation */}
        <div className="desktop-links">
          <a href="#hero" className="nav-link">Home</a>
          <a href="#carousel" className="nav-link">Brands</a>
          <a href="#acquisitions" className="nav-link">Acquisitions</a>
          <a href="#about" className="nav-link">About</a>
        </div>

        {/* CTA Button */}
        <div className="cta-container">
          <button className="btn-primary" style={{ padding: '8px 20px', fontSize: '14px' }}>
            Get in Touch
          </button>
        </div>

        {/* Mobile Toggle */}
        <button className="mobile-toggle" onClick={toggleMenu}>
          {isOpen ? <X size={24} color="#fff" /> : <Menu size={24} color="#fff" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div ref={menuRef} className="mobile-menu">
          <a href="#hero" onClick={toggleMenu} className="mobile-link">Home</a>
          <a href="#carousel" onClick={toggleMenu} className="mobile-link">Brands</a>
          <a href="#acquisitions" onClick={toggleMenu} className="mobile-link">Acquisitions</a>
          <a href="#about" onClick={toggleMenu} className="mobile-link">About</a>
          <button className="btn-primary" style={{ marginTop: '10px', width: '100%', justifyContent: 'center' }}>
            Get in Touch
          </button>
        </div>
      )}
    </nav>
  );
}
