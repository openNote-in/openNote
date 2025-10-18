import React from 'react';
import { BookOpen, Mail, Linkedin, Github } from 'lucide-react';

const About = () => {
  const team = [
    {
      name: 'Aryan Verma',
      role: 'Founder & Lead Developer',
      description: 'Final year CSE student at AKTU with passion for helping fellow students succeed.',
      image: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
      email: 'aryanchauhan112002@gmail.com',
      linkedin: '#',
      github: '#'
    },
    {
      name: 'Mayank Singh',
      role: 'Content Curator & Designer',
      description: 'IT student specializing in creating high-quality academic resources for AKTU students.',
      image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
      email: 'priya@opennote-aktu.com',
      linkedin: '#',
      github: '#'
    }
  ];

  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-medium mb-8">
            <BookOpen className="w-4 h-4 mr-2" />
            About openNote
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold mb-6">
            Built by Students,
            <span className="block bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
              For Students
            </span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            openNote was created by AKTU students who understand the challenges of finding quality study materials. 
            We're here to bridge that gap and help every B.Tech student excel in their academic journey.
          </p>
        </div>

        {/* Mission Section */}
        <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-2xl p-8 lg:p-12 mb-20">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed">
              To provide every AKTU student with easy access to high-quality study resources, 
              helping them achieve academic excellence and build successful careers in technology.
            </p>
          </div>
        </div>

        {/* Team Section */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Meet Our Team</h2>
            <p className="text-lg text-gray-400">
              The dedicated students behind openNote
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {team.map((member, index) => (
              <div
                key={index}
                className="bg-gray-800/30 border border-gray-700/50 rounded-2xl p-8 text-center hover:bg-gray-800/50 transition-all duration-300 hover:scale-105 group"
              >
                <div className="relative mb-6">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-24 h-24 rounded-full mx-auto object-cover border-4 border-gradient-to-r from-blue-500 to-purple-500 group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full"></div>
                </div>
                
                <h3 className="text-xl font-bold text-white mb-2">{member.name}</h3>
                <p className="text-blue-400 font-medium mb-4">{member.role}</p>
                <p className="text-gray-400 text-sm leading-relaxed mb-6">
                  {member.description}
                </p>
                
                <div className="flex items-center justify-center space-x-4">
                  <a
                    href={`mailto:${member.email}`}
                    className="p-2 bg-gray-700/50 hover:bg-blue-500/20 rounded-lg transition-all duration-300 text-gray-400 hover:text-blue-400"
                  >
                    <Mail className="w-4 h-4" />
                  </a>
                  <a
                    href={member.linkedin}
                    className="p-2 bg-gray-700/50 hover:bg-blue-500/20 rounded-lg transition-all duration-300 text-gray-400 hover:text-blue-400"
                  >
                    <Linkedin className="w-4 h-4" />
                  </a>
                  <a
                    href={member.github}
                    className="p-2 bg-gray-700/50 hover:bg-blue-500/20 rounded-lg transition-all duration-300 text-gray-400 hover:text-blue-400"
                  >
                    <Github className="w-4 h-4" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Values Section */}
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              title: 'Student-First',
              description: 'Every decision we make is centered around what\'s best for AKTU students.',
              icon: BookOpen
            },
            {
              title: 'Quality Content',
              description: 'We ensure all resources are accurate, up-to-date, and exam-focused.',
              icon: BookOpen
            },
            {
              title: 'Affordable Access',
              description: 'Premium content at student-friendly prices with free resources available.',
              icon: BookOpen
            }
          ].map((value, index) => {
            const Icon = value.icon;
            return (
              <div
                key={index}
                className="bg-gray-800/30 border border-gray-700/50 rounded-xl p-6 hover:bg-gray-800/50 transition-all duration-300 hover:scale-105 group"
              >
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center mb-4 group-hover:shadow-lg group-hover:shadow-blue-500/25 transition-all duration-300">
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{value.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{value.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default About;