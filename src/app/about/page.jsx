"use client";
import React from "react";
import { useState, useEffect } from "react";

function MainComponent() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

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
    setIsLoaded(true);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const navigateToPage = (path) => {
    window.location.href = path;
  };

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
        <div className="max-w-[90%] mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div className="relative overflow-hidden h-[70vh]">
            <div
              className="absolute inset-0 transition-transform duration-1000"
              style={{
                transform: `translate3d(${mousePosition.x * 20}px, ${
                  mousePosition.y * 20
                }px, 0)`,
              }}
            >
              <img
                src="https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&q=80"
                alt="Studio"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/30 mix-blend-multiply" />
            </div>
          </div>
          <div className="relative z-10">
            <h1 className="text-white text-6xl font-light mb-8 tracking-wider transform transition-all duration-1000">
              WHO WE ARE
            </h1>
            <div className="space-y-6">
              <p className="text-white/80 text-lg tracking-wide leading-relaxed">
                We are visual storytellers, dreamers, and creators. Our passion
                lies in capturing the extraordinary in the ordinary,
                transforming fleeting moments into timeless art.
              </p>
              <p className="text-white/80 text-lg tracking-wide leading-relaxed">
                Founded in 2025, our studio has been at the forefront of
                creative photography and visual arts, pushing boundaries and
                setting new standards in the industry.
              </p>
            </div>
          </div>
        </div>
      </div>

      <section className="relative min-h-screen bg-white py-32">
        <div className="max-w-[90%] mx-auto">
          <h2 className="text-black text-5xl font-light mb-16 tracking-wider">
            OUR JOURNEY
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { year: "2025", title: "INCEPTION", desc: "Studio foundation" },
              { year: "2025", title: "EVOLUTION", desc: "Global expansion" },
              { year: "2025", title: "INNOVATION", desc: "Digital revolution" },
            ].map((milestone, index) => (
              <div
                key={index}
                className="group relative overflow-hidden p-8 cursor-pointer"
                style={{
                  transform: `translate3d(${mousePosition.x * 10}px, ${
                    mousePosition.y * 10
                  }px, 0)`,
                }}
              >
                <div className="h-[1px] w-full bg-black/30 mb-8 transform origin-left group-hover:scale-x-150 transition-transform duration-500" />
                <span className="text-black/50 text-sm tracking-[0.2em]">
                  {milestone.year}
                </span>
                <h3 className="text-black text-2xl font-light my-4">
                  {milestone.title}
                </h3>
                <p className="text-black/70">{milestone.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative min-h-screen bg-black py-32">
        <div className="max-w-[90%] mx-auto text-center">
          <h2 className="text-white text-5xl font-light mb-16 tracking-wider">
            OUR TEAM
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
            {[
              { name: "ALEX RIVERA", role: "Creative Director" },
              { name: "SAM CHEN", role: "Lead Photographer" },
              { name: "MARIA COSTA", role: "Art Director" },
            ].map((member, index) => (
              <div
                key={index}
                className="group relative overflow-hidden"
                style={{
                  transform: `translate3d(${mousePosition.x * 10}px, ${
                    mousePosition.y * 10
                  }px, 0)`,
                }}
              >
                <div className="h-[400px] mb-8 overflow-hidden">
                  <img
                    src={`https://images.unsplash.com/photo-${
                      1500000000000 + index
                    }?auto=format&fit=crop&q=80`}
                    alt={member.name}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                  />
                </div>
                <h3 className="text-white text-2xl font-light mb-2">
                  {member.name}
                </h3>
                <p className="text-white/60 tracking-wider">{member.role}</p>
              </div>
            ))}
          </div>
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