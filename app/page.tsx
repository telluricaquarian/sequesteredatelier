"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X } from "lucide-react"
import Image from "next/image"

const artworks = [
  {
    id: 1,
    title: "Telluricaquarian",
    src: "/artworks/sequestered-knowledge.png",
    description: "The brand Telluricaquarian — a brand focused on technology, design, and water.",
  },
  {
    id: 2,
    title: "Electrochemical Medical Device",
    src: "/artworks/sequestered-knowledge-wt.png",
    description: "Schematics and EDU material on medical-grade electrolytic devices and electrochemical systems.",
  },
  {
    id: 3,
    title: "Primordial Originating Substance",
    src: "/artworks/sequestered-knowledge-ursz.png",
    description: "Ursubstanz (German). Pronounced: OOR-soob-stahnts. Meaning: \"primordial substance\" / original matter.",
  },
  {
    id: 4,
    title: "Bezier Glyph",
    src: "/artworks/bezier-glyph.svg",
    description: "Curved bezier path artwork",
  },
  {
    id: 5,
    title: "Scattered",
    src: "/artworks/scattered.svg",
    description: "Abstract scattered composition",
  },
]

export default function Gallery() {
  const [selectedArtwork, setSelectedArtwork] = useState<(typeof artworks)[0] | null>(null)
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const cursorRef = useRef<HTMLDivElement>(null)
  const glowRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setCursorPosition({ x: e.clientX, y: e.clientY })
      setMousePosition({ x: e.clientX, y: e.clientY })

      if (cursorRef.current) {
        cursorRef.current.style.left = `${e.clientX}px`
        cursorRef.current.style.top = `${e.clientY}px`
      }

      if (glowRef.current) {
        glowRef.current.style.left = `${e.clientX}px`
        glowRef.current.style.top = `${e.clientY}px`
      }
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  return (
    <div className="min-h-screen bg-background custom-cursor overflow-hidden">
      {/* Custom cursor */}
      <div ref={cursorRef} className={`cursor-dot ${isHovering ? "hover" : ""}`} />

      {/* Mouse glow effect */}
      <div ref={glowRef} className="mouse-glow" />

      {/* Header */}
      <header className="relative z-10 px-6 py-8 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-7xl mx-auto"
        >
          <h1 className="text-4xl md:text-5xl font-light tracking-tight text-foreground">
            Sequestered<span className="text-accent">Atelier</span>
          </h1>
          <p className="mt-2 text-muted-foreground text-sm md:text-base">Resources and educational material offered and presented through graphic design, made, created, and curated by Llewellyn.</p>
        </motion.div>
      </header>

      {/* Gallery Grid */}
      <main className="relative z-10 px-6 py-12 md:px-12">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            initial="hidden"
            animate="visible"
            variants={{
              visible: {
                transition: {
                  staggerChildren: 0.1,
                },
              },
            }}
          >
            {artworks.map((artwork) => (
              <motion.div
                key={artwork.id}
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  visible: { opacity: 1, y: 0 },
                }}
                transition={{ duration: 0.5 }}
                className="group relative"
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
              >
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="relative aspect-square bg-card rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl hover:shadow-accent/20 transition-shadow duration-300"
                  onClick={() => setSelectedArtwork(artwork)}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  <div className="relative w-full h-full p-8 flex items-center justify-center">
                    <Image
                      src={artwork.src || "/placeholder.svg"}
                      alt={artwork.title}
                      width={400}
                      height={400}
                      className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-110"
                    />
                  </div>

                  {/* Tooltip */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileHover={{ opacity: 1, y: 0 }}
                    className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-background/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  >
                    <h3 className="text-lg font-medium text-foreground">{artwork.title}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{artwork.description}</p>
                  </motion.div>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </main>

      {/* Modal/Lightbox */}
      <AnimatePresence>
        {selectedArtwork && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/95 backdrop-blur-xl"
            onClick={() => setSelectedArtwork(null)}
          >
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ delay: 0.1 }}
              className="absolute top-6 right-6 p-3 rounded-full bg-card hover:bg-accent hover:text-accent-foreground transition-colors duration-200 z-10"
              onClick={() => setSelectedArtwork(null)}
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
            >
              <X className="w-6 h-6" />
            </motion.button>

            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="relative max-w-5xl w-full max-h-[90vh] bg-card rounded-3xl shadow-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative w-full h-full p-12 flex flex-col items-center justify-center">
                <div className="relative w-full max-w-3xl aspect-square flex items-center justify-center">
                  <Image
                    src={selectedArtwork.src || "/placeholder.svg"}
                    alt={selectedArtwork.title}
                    width={800}
                    height={800}
                    className="w-full h-full object-contain"
                  />
                </div>

                <div className="mt-8 text-center">
                  <h2 className="text-3xl font-light text-foreground">{selectedArtwork.title}</h2>
                  <p className="mt-2 text-muted-foreground">{selectedArtwork.description}</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
