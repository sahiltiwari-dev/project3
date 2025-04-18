"use client";
import React from "react";
import { useState, useEffect } from "react";

function MainComponent() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeService, setActiveService] = useState(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: e.clientX / window.innerWidth - 0.5,
        y: e.clientY / window.innerHeight - 0.5,
      });
    };

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const navigateToPage = (path) => {
    window.location.href = path;
  };

  const services = [
    {
      title: "PHOTOGRAPHY",
      description: "Capturing life's precious moments with artistic vision",
      details: [
        "Portrait Photography",
        "Commercial Photography",
        "Event Coverage",
        "Fashion Photography",
      ],
      image:
        "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&q=80",
    },
    {
      title: "CREATIVE DIRECTION",
      description: "Guiding your vision from concept to creation",
      details: [
        "Brand Identity",
        "Visual Storytelling",
        "Art Direction",
        "Content Strategy",
      ],
      image:
        "https://images.unsplash.com/photo-1504384764586-bb4cdc1707b0?auto=format&fit=crop&q=80",
    },
    {
      title: "POST-PRODUCTION",
      description: "Enhancing imagery to achieve perfection",
      details: [
        "Color Grading",
        "Retouching",
        "Digital Manipulation",
        "Print Preparation",
      ],
      image:
        "https://images.unsplash.com/photo-1542744094-3a31f272c490?auto=format&fit=crop&q=80",
    },
  ];

  return (
    <div className="relative min-h-screen bg-black overflow-x-hidden">
      <nav
        className={`fixed w-full z-50 mix-blend-difference ${
          isScrolled ? "py-4" : "py-6"
        }`}
      >
        <div className="max-w-[90%] mx-auto">
          <div className="flex items-center justify-between">
            <div
              onClick={() => navigateToPage("/")}
              className="text-white text-2xl font-light tracking-[0.3em] relative overflow-hidden cursor-pointer"
            >
              <span className="inline-block transform hover:translate-y-[-100%] transition-transform duration-500">
                LENS
              </span>
              <span className="inline-block ml-2 transform hover:translate-y-[-100%] transition-transform duration-500 delay-100">
                STUDIO
              </span>
            </div>
            <div className="hidden md:flex space-x-16">
              {[
                { text: "WORK", path: "/portfolio" },
                { text: "ABOUT", path: "/about" },
                { text: "SERVICES", path: "/services" },
                { text: "CONTACT", path: "/contact" },
              ].map((item) => (
                <button
                  key={item.text}
                  onClick={() => navigateToPage(item.path)}
                  className="group relative text-white text-sm tracking-[0.2em] overflow-hidden py-2"
                >
                  <span className="inline-block transform group-hover:translate-y-[-100%] transition-transform duration-500">
                    {item.text}
                  </span>
                  <span className="absolute top-full left-0 transform group-hover:translate-y-[-100%] transition-transform duration-500">
                    {item.text}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </nav>

      <div className="relative min-h-screen flex items-center justify-center py-32">
        <div className="max-w-[90%] mx-auto text-center">
          <h1 className="text-white text-7xl font-light mb-8 tracking-wider transform transition-all duration-1000">
            OUR SERVICES
          </h1>
          <p className="text-white/80 text-xl tracking-wide max-w-2xl mx-auto">
            Elevating visual storytelling through innovative techniques and
            creative excellence
          </p>
        </div>
      </div>

      <section className="relative min-h-screen bg-black py-32">
        <div className="max-w-[90%] mx-auto">
          {services.map((service, index) => (
            <div
              key={service.title}
              className={`relative min-h-screen flex items-center ${
                index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
              } flex-col gap-16 mb-32`}
              onMouseEnter={() => setActiveService(index)}
              onMouseLeave={() => setActiveService(null)}
            >
              <div className="flex-1 relative overflow-hidden h-[60vh]">
                <div
                  className="absolute inset-0 transition-all duration-1000"
                  style={{
                    transform:
                      activeService === index
                        ? `translate3d(${mousePosition.x * 20}px, ${
                            mousePosition.y * 20
                          }px, 0) scale(1.1)`
                        : "translate3d(0, 0, 0) scale(1)",
                  }}
                >
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/30 mix-blend-multiply" />
                </div>
              </div>
              <div className="flex-1 relative z-10">
                <h2 className="text-white text-5xl font-light mb-8 tracking-wider">
                  {service.title}
                </h2>
                <p className="text-white/80 text-lg mb-12 tracking-wide">
                  {service.description}
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {service.details.map((detail, i) => (
                    <div
                      key={i}
                      className="group cursor-pointer"
                      style={{
                        transform: `translate3d(${mousePosition.x * 10}px, ${
                          mousePosition.y * 10
                        }px, 0)`,
                      }}
                    >
                      <div className="h-[1px] w-full bg-white/30 mb-4 transform origin-left group-hover:scale-x-150 transition-transform duration-500" />
                      <p className="text-white/60 tracking-wider">{detail}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="relative min-h-[70vh] bg-white py-32">
        <div className="max-w-[90%] mx-auto text-center">
          <h2 className="text-black text-5xl font-light mb-8 tracking-wider">
            START YOUR PROJECT
          </h2>
          <p className="text-black/70 text-xl tracking-wide mb-12 max-w-2xl mx-auto">
            Let's create something extraordinary together
          </p>
          <button
            onClick={() => navigateToPage("/contact")}
            className="text-black text-lg tracking-[0.3em] py-6 px-12 border border-black/20 transition-all duration-500 relative overflow-hidden group"
          >
            <span className="relative z-10">CONTACT US</span>
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-all duration-500" />
          </button>
        </div>
      </section>

      <div
        className="fixed w-12 h-12 pointer-events-none z-50 mix-blend-difference transition-transform duration-100"
        style={{
          transform: `translate(${
            mousePosition.x * window.innerWidth + window.innerWidth / 2 - 24
          }px, ${
            mousePosition.y * window.innerHeight + window.innerHeight / 2 - 24
          }px)`,
        }}
      >
        <div className="absolute inset-0 border-2 border-white rounded-full animate-pulse-slow" />
      </div>

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Syncopate:wght@400;700&display=swap');

        body {
          font-family: 'Syncopate', sans-serif;
          background: black;
        }

        @keyframes pulse-slow {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.5); opacity: 0.5; }
        }

        .animate-pulse-slow {
          animation: pulse-slow 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }

        html {
          scroll-behavior: smooth;
        }

        ::-webkit-scrollbar {
          display: none;
        }

        ::selection {
          background: white;
          color: black;
        }
      `}</style>
    </div>
  );
}

export default MainComponent;