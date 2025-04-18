"use client";
import React from "react";
import { useState, useEffect } from "react";

function MainComponent() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeText, setActiveText] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  const images = [
    "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1426604966848-d7adac402bff?auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80",
  ];

  const texts = [
    { main: "VISUAL", sub: "POETRY" },
    { main: "TIMELESS", sub: "MOMENTS" },
    { main: "CAPTURED", sub: "STORIES" },
    { main: "ETERNAL", sub: "BEAUTY" },
  ];

  const navigateToPage = (path) => {
    window.location.href = path;
  };

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: e.clientX / window.innerWidth - 0.5,
        y: e.clientY / window.innerHeight - 0.5,
      });
    };

    const interval = setInterval(() => {
      setActiveIndex((current) => (current + 1) % images.length);
      setActiveText((current) => (current + 1) % texts.length);
    }, 6000);

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("scroll", handleScroll);
    setIsLoaded(true);

    return () => {
      clearInterval(interval);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

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

      <div className="relative h-screen">
        <div className="absolute inset-0 perspective-[2000px]">
          {images.map((img, index) => (
            <div
              key={img}
              className="absolute inset-0 transition-all duration-[2s] ease-[cubic-bezier(0.7,0,0.3,1)]"
              style={{
                opacity: index === activeIndex ? 1 : 0,
                transform: `
                  translate3d(${mousePosition.x * 20}px, ${
                  mousePosition.y * 20
                }px, 0)
                  scale(${index === activeIndex ? 1 : 1.2})
                  rotate3d(${mousePosition.y * 2}, ${mousePosition.x * 2}, 0, ${
                  Math.sqrt(
                    Math.pow(mousePosition.x, 2) + Math.pow(mousePosition.y, 2)
                  ) * 5
                }deg)
                `,
              }}
            >
              <div className="absolute inset-0 bg-black/30 mix-blend-multiply" />
              <img
                src={img}
                alt="Landscape"
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>

        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative text-center">
            {texts.map((text, index) => (
              <div
                key={index}
                className="absolute w-full transition-all duration-[1.5s]"
                style={{
                  opacity: index === activeText ? 1 : 0,
                  transform: `
                    translate3d(${
                      index === activeText ? 0 : index < activeText ? -100 : 100
                    }px, 0, 0)
                    scale(${index === activeText ? 1 : 0.8})
                  `,
                }}
              >
                <h1 className="text-[12vw] leading-none font-light text-white mix-blend-difference tracking-[-0.02em]">
                  {text.main}
                </h1>
                <h2 className="text-[6vw] leading-none text-white/80 font-light tracking-[0.2em] mt-4">
                  {text.sub}
                </h2>
              </div>
            ))}
          </div>
        </div>

        <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 flex space-x-32">
          <div className="group">
            <button
              onClick={() => navigateToPage("/portfolio")}
              className="relative text-white text-sm tracking-[0.3em] overflow-hidden py-4 px-8 border border-white/20 backdrop-blur-sm hover:backdrop-blur-lg transition-all duration-500"
            >
              <span className="relative z-10">EXPLORE WORK</span>
              <div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-all duration-500" />
            </button>
          </div>
          <div className="group">
            <button
              onClick={() => navigateToPage("/contact")}
              className="relative text-white text-sm tracking-[0.3em] overflow-hidden py-4 px-8 border border-white/20 backdrop-blur-sm hover:backdrop-blur-lg transition-all duration-500"
            >
              <span className="relative z-10">START PROJECT</span>
              <div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-all duration-500" />
            </button>
          </div>
        </div>
      </div>

      <section className="min-h-screen bg-black py-32 relative overflow-hidden">
        <div className="max-w-[90%] mx-auto">
          <h2 className="text-white text-6xl font-light tracking-wider mb-16">
            FEATURED WORKS
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[1, 2, 3, 4].map((item) => (
              <div
                key={item}
                className="group relative h-[60vh] overflow-hidden cursor-pointer"
                onClick={() => navigateToPage("/portfolio")}
              >
                <div className="absolute inset-0 bg-black/50 z-10 group-hover:bg-black/20 transition-all duration-500" />
                <img
                  src={images[item - 1]}
                  alt={`Featured work ${item}`}
                  className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute bottom-8 left-8 z-20 transform group-hover:translate-y-[-20px] transition-transform duration-500">
                  <h3 className="text-white text-3xl font-light mb-2">
                    Project {item}
                  </h3>
                  <p className="text-white/80 tracking-wider">
                    Photography / Art Direction
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="min-h-screen bg-white py-32 relative overflow-hidden">
        <div className="max-w-[90%] mx-auto">
          <h2 className="text-black text-6xl font-light tracking-wider mb-16">
            OUR EXPERTISE
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
            {[
              {
                title: "PHOTOGRAPHY",
                desc: "Capturing moments in their purest form",
              },
              { title: "DIRECTION", desc: "Guiding your vision to reality" },
              {
                title: "PRODUCTION",
                desc: "Full-scale creative production services",
              },
            ].map((service, index) => (
              <div
                key={service.title}
                className="group cursor-pointer"
                onClick={() => navigateToPage("/services")}
              >
                <div className="h-[1px] w-full bg-black/30 mb-8 transform origin-left group-hover:scale-x-150 transition-transform duration-500" />
                <h3 className="text-black text-2xl font-light mb-4 tracking-wider">
                  {service.title}
                </h3>
                <p className="text-black/70 tracking-wide">{service.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="min-h-[70vh] bg-black py-32 relative overflow-hidden">
        <div className="max-w-[90%] mx-auto text-center">
          <h2 className="text-white text-8xl font-light tracking-wider mb-8">
            LET'S CREATE
          </h2>
          <p className="text-white/80 text-xl tracking-wider mb-12">
            Transform your vision into reality
          </p>
          <button
            onClick={() => navigateToPage("/contact")}
            className="text-white text-lg tracking-[0.3em] py-6 px-12 border border-white/20 backdrop-blur-sm hover:backdrop-blur-lg transition-all duration-500 relative overflow-hidden group"
          >
            <span className="relative z-10">START A PROJECT</span>
            <div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-all duration-500" />
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

        .perspective-[2000px] {
          perspective: 2000px;
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