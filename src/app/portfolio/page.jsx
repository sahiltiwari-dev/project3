"use client";
import React from "react";
import { useState, useEffect } from "react";

function MainComponent() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeProject, setActiveProject] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("ALL");

  const projects = [
    {
      title: "ETHEREAL DREAMS",
      category: "FASHION",
      year: "2025",
      image:
        "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&q=80",
      description:
        "A ethereal fashion editorial exploring the boundaries between dreams and reality",
    },
    {
      title: "URBAN POETRY",
      category: "STREET",
      year: "2025",
      image:
        "https://images.unsplash.com/photo-1517799094725-e3453440724e?auto=format&fit=crop&q=80",
      description:
        "Capturing the raw essence of city life through a poetic lens",
    },
    {
      title: "NATURAL HARMONY",
      category: "LANDSCAPE",
      year: "2025",
      image:
        "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&q=80",
      description:
        "A visual journey through Earth's most breathtaking landscapes",
    },
    {
      title: "TIMELESS PORTRAITS",
      category: "PORTRAIT",
      year: "2025",
      image:
        "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&q=80",
      description: "Intimate portraits capturing the essence of human emotion",
    },
    {
      title: "MODERN ARCHITECTURE",
      category: "ARCHITECTURE",
      year: "2025",
      image:
        "https://images.unsplash.com/photo-1511818966892-d7d671e672a2?auto=format&fit=crop&q=80",
      description:
        "Exploring the geometry and beauty of contemporary structures",
    },
    {
      title: "ABSTRACT REALITY",
      category: "ABSTRACT",
      year: "2025",
      image:
        "https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&q=80",
      description: "Finding beauty in the abstract forms of everyday life",
    },
  ];

  const categories = [
    "ALL",
    "FASHION",
    "STREET",
    "LANDSCAPE",
    "PORTRAIT",
    "ARCHITECTURE",
    "ABSTRACT",
  ];

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

  const filteredProjects =
    selectedCategory === "ALL"
      ? projects
      : projects.filter((project) => project.category === selectedCategory);

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
          <h1 className="text-white text-7xl font-light mb-16 tracking-wider transform transition-all duration-1000">
            OUR WORK
          </h1>
          <div className="flex flex-wrap justify-center gap-8 mb-16">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`text-sm tracking-[0.2em] py-2 px-6 border ${
                  selectedCategory === category
                    ? "text-black bg-white border-white"
                    : "text-white border-white/20 hover:border-white"
                } transition-all duration-300`}
              >
                {category}
              </button>
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, index) => (
              <div
                key={project.title}
                className="relative group"
                onMouseEnter={() => setActiveProject(index)}
                onMouseLeave={() => setActiveProject(null)}
              >
                <div className="relative h-[60vh] overflow-hidden">
                  <div
                    className="absolute inset-0 transition-all duration-1000"
                    style={{
                      transform:
                        activeProject === index
                          ? `translate3d(${mousePosition.x * 20}px, ${
                              mousePosition.y * 20
                            }px, 0) scale(1.1)`
                          : "translate3d(0, 0, 0) scale(1)",
                    }}
                  >
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/30 mix-blend-multiply" />
                  </div>
                  <div className="absolute inset-0 flex flex-col justify-end p-8 transform translate-y-8 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
                    <h3 className="text-white text-2xl font-light mb-2 tracking-wider">
                      {project.title}
                    </h3>
                    <div className="flex items-center space-x-4 mb-4">
                      <span className="text-white/60 text-sm tracking-wider">
                        {project.category}
                      </span>
                      <div className="w-4 h-[1px] bg-white/30" />
                      <span className="text-white/60 text-sm tracking-wider">
                        {project.year}
                      </span>
                    </div>
                    <p className="text-white/80 tracking-wide">
                      {project.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

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