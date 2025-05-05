"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Github, Youtube, Mail, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { motion } from "framer-motion"

// Animation variants
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const itemVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3 },
  },
}

export default function Home() {
  const [activeSection, setActiveSection] = useState("home")

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", "about", "skills", "projects", "contact"]

      for (const section of sections) {
        const element = document.getElementById(section)
        if (!element) continue

        const rect = element.getBoundingClientRect()
        if (rect.top <= 100 && rect.bottom >= 100) {
          setActiveSection(section)
          // Close mobile menu when scrolling to a new section
          const mobileMenu = document.getElementById("mobile-menu")
          if (mobileMenu) {
            mobileMenu.classList.add("hidden")
          }
          break
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <main className="min-h-screen bg-gradient-to-b from-purple-950 to-black text-white">
      {/* Navigation */}
      <nav className="container mx-auto py-4 sm:py-6 flex justify-between items-center sticky top-0 z-50 backdrop-blur-md bg-purple-950/70 px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="text-2xl font-bold"
        >
          NK
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, staggerChildren: 0.1, delayChildren: 0.2 }}
          className="hidden md:flex gap-6"
        >
          {[
            { href: "#home", label: "Home" },
            { href: "#about", label: "About" },
            { href: "#skills", label: "Skills" },
            { href: "#projects", label: "Projects" },
            { href: "#contact", label: "Contact" },
          ].map((link) => (
            <motion.a
              key={link.href}
              href={link.href}
              className={`hover:text-purple-400 transition-colors ${
                activeSection === link.href.substring(1) ? "text-purple-400 font-bold" : ""
              }`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              {link.label}
            </motion.a>
          ))}
        </motion.div>
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="md:hidden text-white"
          onClick={() => {
            const mobileMenu = document.getElementById("mobile-menu")
            mobileMenu.classList.toggle("hidden")
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
          </svg>
        </motion.button>
        <motion.div
          id="mobile-menu"
          className="hidden absolute top-full left-0 right-0 bg-purple-950/95 backdrop-blur-md p-4 flex flex-col gap-4 border-b border-purple-800/50 md:hidden"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {[
            { href: "#home", label: "Home" },
            { href: "#about", label: "About" },
            { href: "#skills", label: "Skills" },
            { href: "#projects", label: "Projects" },
            { href: "#contact", label: "Contact" },
          ].map((link) => (
            <motion.a
              key={`mobile-${link.href}`}
              href={link.href}
              className={`hover:text-purple-400 transition-colors ${
                activeSection === link.href.substring(1) ? "text-purple-400 font-bold" : ""
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                document.getElementById("mobile-menu").classList.add("hidden")
              }}
            >
              {link.label}
            </motion.a>
          ))}
        </motion.div>
      </nav>

      {/* Hero Section */}
      <section
        id="home"
        className="container mx-auto py-12 sm:py-16 md:py-20 flex flex-col md:flex-row items-center gap-6 md:gap-10 px-4 sm:px-6"
      >
        <motion.div
          className="w-full md:w-1/2 relative max-w-[300px] md:max-w-none mx-auto"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
        >
          <div className="absolute -inset-1 rounded-full bg-purple-500 blur-xl opacity-30 animate-pulse"></div>
          <div className="relative">
            <Image
              // src="/placeholder.svg?height=400&width=400"
              src={"logo.jpg"}
              alt="Nhanh Kimson"
              width={400}
              height={400}
              className="rounded-full border-4 border-purple-500"
            />
          </div>
        </motion.div>
        <motion.div
          className="w-full md:w-1/2 text-center md:text-left"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            Hello! I am <span className="text-purple-400">Nhanh Kimson</span>
          </h1>
          <h2 className="text-xl sm:text-2xl md:text-3xl mb-4 sm:mb-6">A Software Engineer & Developer</h2>
          <p className="text-gray-300 mb-8">
            Currently a student at Beltei International University and Korea Software HRD Center (13th batch). I
            specialize in full-stack development with experience in Java Spring, PHP Laravel, C#, Python Flask, and
            more.
          </p>
          <div className="flex gap-4 justify-center md:justify-start flex-wrap">
            <Button className="bg-purple-600 hover:bg-purple-700 rounded-2xl" size="lg">
              <a href="#contact" className="flex items-center gap-2">
                Contact Me <Mail size={16} />
              </a>
            </Button>
            <Button
              variant="outline"
              className="border-purple-600 text-purple-400 hover:bg-purple-900/20 rounded-2xl"
              size="lg"
            >
              <a href="#projects" className="flex items-center gap-2">
                View Projects <ExternalLink size={16} />
              </a>
            </Button>
          </div>
        </motion.div>
      </section>

      {/* About Section */}
      <section id="about" className="container mx-auto py-12 sm:py-16 md:py-20 px-4 sm:px-6">
        <motion.h2
          className="text-3xl font-bold mb-10 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          About Me
        </motion.h2>
        <motion.div
          className="bg-purple-950/30 p-8 rounded-2xl border border-purple-800/50 backdrop-blur-sm shadow-lg shadow-purple-900/20"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
        >
          <Tabs defaultValue="background" className="w-full">
            <TabsList className="grid w-full grid-cols-3 bg-purple-900/50 rounded-xl mb-6">
              <TabsTrigger value="background" className="data-[state=active]:bg-purple-700 rounded-xl">
                Background
              </TabsTrigger>
              <TabsTrigger value="education" className="data-[state=active]:bg-purple-700 rounded-xl">
                Education
              </TabsTrigger>
              <TabsTrigger value="interests" className="data-[state=active]:bg-purple-700 rounded-xl">
                Interests
              </TabsTrigger>
            </TabsList>
            <TabsContent value="background" className="space-y-4">
              <p className="text-lg">
                I'm a passionate software engineer and developer with a strong foundation in multiple programming
                languages and frameworks. My journey in programming started with a curiosity about how applications
                work, and it has evolved into a deep passion for creating efficient, user-friendly software solutions.
              </p>
              <p className="text-lg">
                I enjoy tackling complex problems and turning ideas into functional applications. My goal is to create
                software that makes a positive impact on people's lives.
              </p>
            </TabsContent>
            <TabsContent value="education" className="space-y-4">
              <p className="text-lg">
                <strong>Beltei International University</strong>
                <br />
                Currently in Year II, Semester II
                <br />
                Computer Science Major
              </p>
              <p className="text-lg">
                <strong>Korea Software HRD Center</strong>
                <br />
                13th Batch
                <br />
                Specialized training in software development
              </p>
            </TabsContent>
            <TabsContent value="interests" className="space-y-4">
              <p className="text-lg">
                When I'm not coding, I create programming tutorials on my YouTube channel to help others learn and grow
                in the field of software development. I'm passionate about sharing knowledge and contributing to the
                developer community.
              </p>
              <p className="text-lg">
                I also enjoy exploring new technologies, participating in hackathons, and collaborating on open-source
                projects.
              </p>
            </TabsContent>
          </Tabs>
        </motion.div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="container mx-auto py-12 sm:py-16 md:py-20 px-4 sm:px-6">
        <motion.h2
          className="text-3xl font-bold mb-10 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Tech Stack
        </motion.h2>
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {[
            { name: "Java Spring", color: "bg-green-600" },
            { name: "PHP Laravel", color: "bg-red-600" },
            { name: "C#", color: "bg-purple-600" },
            { name: "Python Flask", color: "bg-blue-600" },
            { name: "JavaScript", color: "bg-yellow-600" },
            { name: "TypeScript", color: "bg-blue-500" },
            { name: "HTML5", color: "bg-orange-600" },
            { name: "CSS3", color: "bg-blue-400" },
            { name: "React", color: "bg-cyan-500" },
            { name: "MySQL", color: "bg-blue-700" },
            { name: "SQLite", color: "bg-gray-600" },
            { name: "PostgreSQL", color: "bg-blue-800" },
            { name: "Git", color: "bg-orange-700" },
            { name: "GitHub", color: "bg-gray-800" },
            { name: "C++", color: "bg-blue-600" },
            { name: "Bootstrap", color: "bg-purple-700" },
          ].map((skill, index) => (
            <motion.div
              key={index}
              className={`${skill.color} rounded-2xl p-4 text-center hover:scale-105 transition-transform shadow-lg`}
              variants={itemVariant}
              whileHover={{
                scale: 1.05,
                boxShadow: "0 0 15px rgba(168, 85, 247, 0.5)",
              }}
            >
              <span className="font-semibold">{skill.name}</span>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="container mx-auto py-12 sm:py-16 md:py-20 px-4 sm:px-6">
        <motion.h2
          className="text-3xl font-bold mb-10 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Featured Projects
        </motion.h2>
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {[
            {
              title: "E-Commerce Platform",
              description:
                "A full-stack e-commerce platform with user authentication, product management, and payment integration.",
              tech: ["React", "Node.js", "MongoDB"],
            },
            {
              title: "Task Management App",
              description:
                "A collaborative task management application with real-time updates and team collaboration features.",
              tech: ["Vue.js", "Firebase", "Tailwind CSS"],
            },
            {
              title: "Portfolio Website",
              description: "A responsive portfolio website showcasing projects and skills with a modern UI design.",
              tech: ["Next.js", "Tailwind CSS", "Framer Motion"],
            },
            {
              title: "Weather Forecast App",
              description:
                "A weather forecast application that provides real-time weather data and forecasts for any location.",
              tech: ["React", "OpenWeather API", "Chart.js"],
            },
          ].map((project, index) => (
            <motion.div key={index} variants={itemVariant}>
              <Card className="bg-purple-950/30 border-purple-800/50 overflow-hidden hover:shadow-purple-500/20 hover:shadow-lg transition-all rounded-2xl">
                <div className="h-48 bg-gradient-to-r from-purple-900 to-indigo-900 relative">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-xl font-semibold">Project Screenshot</span>
                  </div>
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                  <p className="text-gray-300 mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech.map((tech, techIndex) => (
                      <Badge key={techIndex} className="bg-purple-700 rounded-xl">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex gap-3">
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-purple-600 text-purple-400 hover:bg-purple-900/20 rounded-xl"
                    >
                      <Github className="mr-2 h-4 w-4" /> View Code
                    </Button>
                    <Button size="sm" className="bg-purple-600 hover:bg-purple-700 rounded-xl">
                      <ExternalLink className="mr-2 h-4 w-4" /> Live Demo
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Social Links */}
      <section className="container mx-auto py-12 sm:py-16 md:py-20 px-4 sm:px-6">
        <motion.h2
          className="text-3xl font-bold mb-10 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Find Me Online
        </motion.h2>
        <motion.div
          className="flex flex-wrap justify-center gap-6"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.a
            href="https://github.com/NHANHKIMSON"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-gray-800 hover:bg-gray-700 p-4 rounded-2xl transition-colors"
            variants={itemVariant}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Github size={24} />
            <span>GitHub</span>
          </motion.a>
          <motion.a
            href="https://www.youtube.com/@sonprogramming"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-red-700 hover:bg-red-600 p-4 rounded-2xl transition-colors"
            variants={itemVariant}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Youtube size={24} />
            <span>YouTube</span>
          </motion.a>
          <motion.a
            href="mailto:contact@example.com"
            className="flex items-center gap-2 bg-blue-700 hover:bg-blue-600 p-4 rounded-2xl transition-colors"
            variants={itemVariant}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Mail size={24} />
            <span>Email</span>
          </motion.a>
        </motion.div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="container mx-auto py-12 sm:py-16 md:py-20 px-4 sm:px-6">
        <motion.h2
          className="text-3xl font-bold mb-10 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Contact Me
        </motion.h2>
        <motion.div
          className="max-w-2xl mx-auto bg-purple-950/30 p-4 sm:p-6 md:p-8 rounded-2xl border border-purple-800/50 backdrop-blur-sm shadow-lg shadow-purple-900/20"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
        >
          <form className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              <div>
                <label htmlFor="name" className="block mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  className="w-full p-3 rounded-xl bg-purple-900/50 border border-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
              <div>
                <label htmlFor="email" className="block mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full p-3 rounded-xl bg-purple-900/50 border border-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
            </div>
            <div>
              <label htmlFor="subject" className="block mb-2">
                Subject
              </label>
              <input
                type="text"
                id="subject"
                className="w-full p-3 rounded-xl bg-purple-900/50 border border-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            <div>
              <label htmlFor="message" className="block mb-2">
                Message
              </label>
              <textarea
                id="message"
                rows={5}
                className="w-full p-3 rounded-xl bg-purple-900/50 border border-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
              ></textarea>
            </div>
            <Button className="w-full bg-purple-600 hover:bg-purple-700 py-6 rounded-xl">Send Message</Button>
          </form>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="bg-purple-950/50 py-10 border-t border-purple-800/30">
        <div className="container mx-auto text-center">
          <p className="mb-4">© {new Date().getFullYear()} Nhanh Kimson. All rights reserved.</p>
          <motion.div
            className="flex justify-center gap-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <motion.a
              href="https://github.com/NHANHKIMSON"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.2, rotate: 5 }}
              whileTap={{ scale: 0.9 }}
            >
              <Github className="h-6 w-6 hover:text-purple-400 transition-colors" />
            </motion.a>
            <motion.a
              href="https://www.youtube.com/@sonprogramming"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.2, rotate: -5 }}
              whileTap={{ scale: 0.9 }}
            >
              <Youtube className="h-6 w-6 hover:text-purple-400 transition-colors" />
            </motion.a>
            <motion.a
              href="mailto:contact@example.com"
              whileHover={{ scale: 1.2, rotate: 5 }}
              whileTap={{ scale: 0.9 }}
            >
              <Mail className="h-6 w-6 hover:text-purple-400 transition-colors" />
            </motion.a>
          </motion.div>
        </div>
      </footer>
    </main>
  )
}
