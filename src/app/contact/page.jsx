"use client";
import React from "react";
import { useState, useEffect } from "react";

function MainComponent() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isScrolled, setIsScrolled] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    project: "",
    message: "",
  });
  const [status, setStatus] = useState({ type: "", message: "" });

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ type: "loading", message: "Sending..." });

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to send message");
      }

      setStatus({ type: "success", message: "Message sent successfully!" });
      setFormData({ name: "", email: "", project: "", message: "" });
    } catch (error) {
      console.error(error);
      setStatus({
        type: "error",
        message: "Failed to send message. Please try again.",
      });
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
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
          <div className="relative z-10">
            <h1 className="text-white text-6xl font-light mb-8 tracking-wider transform transition-all duration-1000">
              GET IN TOUCH
            </h1>
            <div className="space-y-8">
              <p className="text-white/80 text-lg tracking-wide leading-relaxed">
                Let's discuss your vision and create something extraordinary
                together.
              </p>
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="w-8 h-[1px] bg-white/30" />
                  <p className="text-white/60 tracking-wider">
                    Los Angeles, CA
                  </p>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-8 h-[1px] bg-white/30" />
                  <p className="text-white/60 tracking-wider">
                    studio@lensstudio.com
                  </p>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-8 h-[1px] bg-white/30" />
                  <p className="text-white/60 tracking-wider">
                    +1 (323) 000-0000
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="relative">
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="relative group">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full bg-transparent border-b border-white/20 py-4 text-white focus:outline-none focus:border-white/40 transition-colors duration-300"
                  placeholder="YOUR NAME"
                />
                <div className="absolute bottom-0 left-0 w-0 h-[1px] bg-white group-hover:w-full transition-all duration-500" />
              </div>
              <div className="relative group">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full bg-transparent border-b border-white/20 py-4 text-white focus:outline-none focus:border-white/40 transition-colors duration-300"
                  placeholder="YOUR EMAIL"
                />
                <div className="absolute bottom-0 left-0 w-0 h-[1px] bg-white group-hover:w-full transition-all duration-500" />
              </div>
              <div className="relative group">
                <input
                  type="text"
                  name="project"
                  value={formData.project}
                  onChange={handleChange}
                  required
                  className="w-full bg-transparent border-b border-white/20 py-4 text-white focus:outline-none focus:border-white/40 transition-colors duration-300"
                  placeholder="PROJECT TYPE"
                />
                <div className="absolute bottom-0 left-0 w-0 h-[1px] bg-white group-hover:w-full transition-all duration-500" />
              </div>
              <div className="relative group">
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="4"
                  className="w-full bg-transparent border-b border-white/20 py-4 text-white focus:outline-none focus:border-white/40 transition-colors duration-300 resize-none"
                  placeholder="YOUR MESSAGE"
                />
                <div className="absolute bottom-0 left-0 w-0 h-[1px] bg-white group-hover:w-full transition-all duration-500" />
              </div>
              <button
                type="submit"
                className="w-full text-white text-lg tracking-[0.3em] py-6 px-12 border border-white/20 backdrop-blur-sm hover:backdrop-blur-lg transition-all duration-500 relative overflow-hidden group"
                disabled={status.type === "loading"}
              >
                <span className="relative z-10">
                  {status.type === "loading" ? "SENDING..." : "SEND MESSAGE"}
                </span>
                <div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-all duration-500" />
              </button>
              {status.message && (
                <p
                  className={`text-center tracking-wider ${
                    status.type === "success"
                      ? "text-green-400"
                      : "text-red-400"
                  }`}
                >
                  {status.message}
                </p>
              )}
            </form>
          </div>
        </div>
      </div>

      <section className="relative min-h-[70vh] bg-white py-32">
        <div className="max-w-[90%] mx-auto text-center">
          <h2 className="text-black text-5xl font-light mb-8 tracking-wider">
            FOLLOW OUR JOURNEY
          </h2>
          <div className="flex justify-center space-x-16">
            {["INSTAGRAM", "TWITTER", "FACEBOOK"].map((social) => (
              <a
                key={social}
                href="#"
                className="group relative text-black text-lg tracking-[0.2em] overflow-hidden py-2"
              >
                <span className="inline-block transform group-hover:translate-y-[-100%] transition-transform duration-500">
                  {social}
                </span>
                <span className="absolute top-full left-0 transform group-hover:translate-y-[-100%] transition-transform duration-500">
                  {social}
                </span>
              </a>
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

        input::placeholder,
        textarea::placeholder {
          color: rgba(255, 255, 255, 0.4);
        }
      `}</style>
    </div>
  );
}

export default MainComponent;