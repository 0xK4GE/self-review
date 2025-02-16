import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import {  AnimatePresence } from 'framer-motion';
import PropTypes from 'prop-types';
import {
  Target, Calendar, CheckCircle, ArrowRight, Clock, Boxes,
  BookOpen, Users, Brain, Lightbulb, Flag, Scale, GitBranch,
  ChevronDown, AlertCircle, Trophy, FilePlus, BarChart2,
  Workflow, CheckSquare, AlertTriangle, TrendingUp, FileSearch,
  Shield,Code , Network, Zap, Compass, Tool, LineChart
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';




// Advanced Timeline Component with Progress Tracking

const Timeline = ({ events }) => (
  <div className="relative py-12">
    {/* Central Timeline Line */}
    <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-purple-500 to-blue-500"></div>
    
    {events.map((event, index) => (
      <motion.div
        key={index}
        initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: false, amount: 0.3 }}
        className={`flex items-center mb-16 ${
          index % 2 === 0 ? 'flex-row-reverse' : ''
        }`}
      >
        <div className={`w-1/2 px-8 ${index % 2 === 0 ? 'text-right' : ''}`}>
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-all"
          >
            {/* Title */}
            <h4 className="text-xl font-bold text-purple-600 mb-3">
              {event.title}
            </h4>
            
            {/* Description */}
            <p className="text-gray-600 mb-4">
              {event.description}
            </p>
            
            {/* Tasks Section */}
            <div className="mb-4">
              <h5 className="text-blue-600 font-medium mb-3">Key Tasks:</h5>
              <ul className="space-y-3">
                {event.tasks.map((task, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className={`flex items-start gap-2 ${
                      index % 2 === 0 ? 'flex-row-reverse' : ''
                    }`}
                  >
                    <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0 mt-1" />
                    <span className="text-gray-700">{task}</span>
                  </motion.li>
                ))}
              </ul>
            </div>

            {/* Date and Progress */}
            <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-blue-500" />
                <span className="text-blue-600">{event.date}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-24 h-2 bg-gray-100 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${event.progress}%` }}
                    transition={{ duration: 1 }}
                    className="h-full bg-gradient-to-r from-purple-500 to-blue-500"
                  />
                </div>
                <span className="text-sm font-medium text-purple-600">
                  {event.progress}%
                </span>
              </div>
            </div>
          </motion.div>
        </div>
        
        {/* Center Icon */}
        <motion.div
          whileHover={{ scale: 1.2, rotate: 360 }}
          transition={{ duration: 0.5 }}
          className="absolute left-1/2 transform -translate-x-1/2 w-12 h-12 bg-white rounded-full border-4 border-purple-500 flex items-center justify-center shadow-lg"
        >
          <event.icon className="h-6 w-6 text-purple-500" />
        </motion.div>
      </motion.div>
    ))}
  </div>
);

Timeline.propTypes = {
  events: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      date: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      icon: PropTypes.elementType.isRequired,
      progress: PropTypes.number.isRequired,
      tasks: PropTypes.arrayOf(PropTypes.string).isRequired,
      resources: PropTypes.arrayOf(PropTypes.string).isRequired,
      evidence: PropTypes.arrayOf(PropTypes.string).isRequired,
    })
  ).isRequired,
};


// Enhanced Priority Matrix with 3D Effect
const PriorityMatrix = () => {
  const [hoveredQuadrant, setHoveredQuadrant] = useState(null);
  
  const quadrants = [
   {
      title: "Urgent & Important",
      color: "from-red-500 to-red-600",
      items: [
        { text: "Complete core modules (42 Abu Dhabi)", deadline: "March 2025" },
        { text: "Expand leetSec initiatives", deadline: "April 2025" },
        { text: "Develop AI workshop curriculum", deadline: "May 2025" }
      ]
    },
    {
      title: "Important, Not Urgent",
      color: "from-blue-500 to-blue-600",
      items: [
        { text: "Advanced security certifications", deadline: "July 2025" },
        { text: "Portfolio development", deadline: "August 2025" },
        { text: "Research paper publication", deadline: "September 2025" }
      ]
    },
    {
      title: "Urgent, Not Important",
      color: "from-yellow-500 to-yellow-600",
      items: [
        { text: "Technical documentation", deadline: "March 2025" },
        { text: "Event organization", deadline: "April 2025" },
        { text: "Administrative tasks", deadline: "Ongoing" }
      ]
    },
    {
      title: "Neither Urgent nor Important",
      color: "from-green-500 to-green-600",
      items: [
        { text: "Optional networking events", deadline: "Flexible" },
        { text: "Additional tech exploration", deadline: "Flexible" },
        { text: "Non-critical updates", deadline: "As needed" }
      ]
    }
  ];

  return (
    <div className="grid grid-cols-2 gap-4 p-4">
      {quadrants.map((quadrant, index) => (
        <motion.div
          key={index}
          className="relative transform transition-all duration-300"
          whileHover={{ scale: 1.05, zIndex: 10 }}
          onHoverStart={() => setHoveredQuadrant(index)}
          onHoverEnd={() => setHoveredQuadrant(null)}
        >
          <div className={`
            h-full p-6 rounded-lg shadow-lg
            bg-gradient-to-br ${quadrant.color}
            transform transition-all duration-300
            ${hoveredQuadrant === index ? 'scale-105' : ''}
          `}>
            <h3 className="text-xl font-bold text-white mb-4">{quadrant.title}</h3>
            <ul className="space-y-3">
              {quadrant.items.map((item, itemIndex) => (
                <motion.li
                  key={itemIndex}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: itemIndex * 0.1 }}
                  className="flex items-start space-x-2 text-white"
                >
                  <CheckCircle className="h-5 w-5 mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-medium">{item.text}</p>
                    <p className="text-sm opacity-80">Deadline: {item.deadline}</p>
                  </div>
                </motion.li>
              ))}
            </ul>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

// Progress Monitoring Dashboard
const ProgressDashboard = () => {
  const [progress, setProgress] = useState({
    technical: 65,
    leadership: 78,
    education: 82
  });

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-2xl font-bold text-purple-700 mb-6">Progress Dashboard</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {Object.entries(progress).map(([key, value]) => (
          <div key={key} className="relative">
            <div className="text-center mb-2">
              <h4 className="text-lg font-semibold capitalize">{key}</h4>
              <p className="text-3xl font-bold text-purple-600">{value}%</p>
            </div>
            <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${value}%` }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="h-full bg-gradient-to-r from-purple-500 to-blue-500"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Main Component
const ActionPlan = () => {
  const timelineEvents = [
    {
      title: "Technical Foundation Development",
      date: "March - May 2025",
      description: "Establishing core technical competencies and software development skills at 42 Abu Dhabi",
      icon: Code,
      progress: 75,
      tasks: [
        "Complete core curriculum modules ",
        "Develop full-stack web applications",
        "Master version control and collaborative development",
        "Complete system architecture projects"
      ],
      resources: [
        "42 Abu Dhabi learning platform",
        "Peer learning network",
        "Development tools and environments",
        "Technical documentation"
      ],
      evidence: [
        "Project completion certificates",
        "GitHub portfolio development",
        "Peer evaluations",
        "Technical assessment scores"
      ]
    },
    {
      title: "Cybersecurity Specialization",
      date: "June - August 2025",
      description: "Deepening expertise in cybersecurity and expanding leetSec initiatives",
      icon: Shield,
      progress: 45,
      tasks: [
        "Lead advanced cybersecurity workshops",
        "Organize CTF competitions",
        "Develop security testing frameworks",
        "Create vulnerability assessment tools"
      ],
      resources: [
        "Security testing environments",
        "CTF platform access",
        "Training materials",
        "Cybersecurity tools"
      ],
      evidence: [
        "Workshop attendance records",
        "Competition results",
        "Security certification progress",
        "Tool development documentation"
      ]
    },
    {
      title: "Educational Impact & Leadership",
      date: "September - November 2025",
      description: "Implementing educational initiatives and expanding community impact",
      icon: Brain,
      progress: 30,
      tasks: [
        "Develop AI curriculum modules",
        "Conduct student mentorship programs",
        "Create educational resources",
        "Establish industry partnerships"
      ],
      resources: [
        "ADEK educational platform",
        "Teaching materials",
        "Mentorship guidelines",
        "Industry contacts"
      ],
      evidence: [
        "Student feedback surveys",
        "Curriculum documentation",
        "Mentorship program metrics",
        "Partnership agreements"
      ]
    },
    {
      title: "Professional Integration & Growth",
      date: "December 2025 - February 2026",
      description: "Integrating technical skills with professional development",
      icon: Target,
      progress: 15,
      tasks: [
        "Lead cross-functional projects",
        "Publish technical research",
        "Present at industry conferences",
        "Develop innovative solutions"
      ],
      resources: [
        "Research materials",
        "Conference opportunities",
        "Professional network",
        "Development tools"
      ],
      evidence: [
        "Project portfolios",
        "Published articles",
        "Conference presentations",
        "Innovation metrics"
      ]
    }
  ]; 
return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-br from-gray-50 to-purple-50 p-8"
    >
      <div className="max-w-7xl mx-auto">
       <motion.div
  className="text-center mb-16 relative"
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: 0.8 }}
>
  <motion.h1
    className="text-5xl md:text-6xl font-bold mb-6 relative"
    initial={{ y: -50, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    transition={{ duration: 0.8, delay: 0.2 }}
  >
    <span className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-blue-600 to-purple-600">
      Strategic Professional
    </span>
    <br />
    <span className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
      Development Plan
    </span>
  </motion.h1>

  <motion.p
    className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
    initial={{ y: 20, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    transition={{ duration: 0.8, delay: 0.6 }}
  >
    Comprehensive roadmap for
    <span className="font-semibold text-purple-600 mx-2">
      technical excellence
    </span>
    and
    <span className="font-semibold text-blue-600 mx-2">
      leadership growth
    </span>
  </motion.p>
</motion.div>
        <Alert className="mb-8 bg-gradient-to-r from-purple-50 to-blue-50">
          <AlertTitle className="text-purple-700 flex items-center gap-2">
            <Target className="h-5 w-5" />
            Vision Statement
          </AlertTitle>
          <AlertDescription className="text-gray-700">
            To become a leading expert in cybersecurity and software development while making
            significant contributions to UAE's tech education sector through innovative
            programs and community initiatives.
          </AlertDescription>
        </Alert>

        <div className="space-y-12">
          <Card className="p-6">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-purple-700 flex items-center gap-2">
                <Scale className="h-6 w-6" />
                Priority Matrix
              </CardTitle>
            </CardHeader>
            <CardContent>
              <PriorityMatrix />
            </CardContent>
          </Card>

          <Card className="p-6">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-purple-700 flex items-center gap-2">
                <GitBranch className="h-6 w-6" />
                Development Timeline
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Timeline events={timelineEvents} />
            </CardContent>
          </Card>

          <Card className="p-6">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-purple-700 flex items-center gap-2">
                <BarChart2 className="h-6 w-6" />
                Progress Monitoring
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ProgressDashboard />
            </CardContent>
          </Card>
          {/* Add these sections after your Progress Monitoring card */}

{/* Resources & Requirements Section */}
<Card className="p-6">
  <CardHeader>
    <CardTitle className="text-2xl font-bold text-purple-700 flex items-center gap-2">
      <Boxes className="h-6 w-6" />
      Resources & Requirements
    </CardTitle>
  </CardHeader>
  <CardContent>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {timelineEvents.map((event, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="bg-white p-6 rounded-lg shadow-lg"
        >
          <div className="flex items-center gap-2 mb-4">
            <event.icon className="h-5 w-5 text-purple-600" />
            <h3 className="font-semibold text-purple-700">{event.title}</h3>
          </div>
          <ul className="space-y-2">
            {event.resources.map((resource, i) => (
              <li key={i} className="flex items-start gap-2">
                <ArrowRight className="h-4 w-4 text-blue-500 mt-1" />
                <span className="text-gray-700">{resource}</span>
              </li>
            ))}
          </ul>
        </motion.div>
      ))}
    </div>
  </CardContent>
</Card>

{/* Implementation Schedule Section */}
<Card className="p-6">
  <CardHeader>
    <CardTitle className="text-2xl font-bold text-purple-700 flex items-center gap-2">
      <Clock className="h-6 w-6" />
      Implementation & Review Schedule
    </CardTitle>
  </CardHeader>
  <CardContent>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <motion.div
        whileHover={{ scale: 1.02 }}
        className="p-6 bg-gradient-to-br from-purple-50 to-blue-50 rounded-lg shadow-lg"
      >
        <h3 className="text-lg font-semibold text-purple-700 mb-4">Weekly Reviews</h3>
        <ul className="space-y-3">
          <li className="flex items-center gap-2">
            <CheckCircle className="h-4 w-4 text-green-500" />
            <span>Task completion assessment</span>
          </li>
          <li className="flex items-center gap-2">
            <CheckCircle className="h-4 w-4 text-green-500" />
            <span>Progress tracking updates</span>
          </li>
          <li className="flex items-center gap-2">
            <CheckCircle className="h-4 w-4 text-green-500" />
            <span>Resource allocation review</span>
          </li>
        </ul>
      </motion.div>

      <motion.div
        whileHover={{ scale: 1.02 }}
        className="p-6 bg-gradient-to-br from-purple-50 to-blue-50 rounded-lg shadow-lg"
      >
        <h3 className="text-lg font-semibold text-purple-700 mb-4">Monthly Assessments</h3>
        <ul className="space-y-3">
          <li className="flex items-center gap-2">
            <CheckCircle className="h-4 w-4 text-green-500" />
            <span>Goal alignment verification</span>
          </li>
          <li className="flex items-center gap-2">
            <CheckCircle className="h-4 w-4 text-green-500" />
            <span>Strategy effectiveness review</span>
          </li>
          <li className="flex items-center gap-2">
            <CheckCircle className="h-4 w-4 text-green-500" />
            <span>Milestone completion check</span>
          </li>
        </ul>
      </motion.div>

      <motion.div
        whileHover={{ scale: 1.02 }}
        className="p-6 bg-gradient-to-br from-purple-50 to-blue-50 rounded-lg shadow-lg"
      >
        <h3 className="text-lg font-semibold text-purple-700 mb-4">Quarterly Evaluation</h3>
        <ul className="space-y-3">
          <li className="flex items-center gap-2">
            <CheckCircle className="h-4 w-4 text-green-500" />
            <span>Comprehensive progress review</span>
          </li>
          <li className="flex items-center gap-2">
            <CheckCircle className="h-4 w-4 text-green-500" />
            <span>Strategy adjustment decisions</span>
          </li>
          <li className="flex items-center gap-2">
            <CheckCircle className="h-4 w-4 text-green-500" />
            <span>Long-term goal assessment</span>
          </li>
        </ul>
      </motion.div>
    </div>
  </CardContent>
</Card>
          {/* Add more sections for comprehensive coverage */}
          {/* Evidence Collection Section */}
<Card className="p-6">
  <CardHeader>
    <CardTitle className="text-2xl font-bold text-purple-700 flex items-center gap-2">
      <FileSearch className="h-6 w-6" />
      Evidence Collection
    </CardTitle>
  </CardHeader>
  <CardContent>
    {/* Add your evidence collection content here */}
    <div className="space-y-4">
      {timelineEvents.map((event, index) => (
        <div key={index} className="bg-white p-4 rounded-lg shadow">
          <h3 className="font-semibold text-purple-700 mb-2">{event.title}</h3>
          <ul className="space-y-2">
            {event.evidence.map((item, i) => (
              <li key={i} className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  </CardContent>
</Card>

{/* Review Schedule Section */}
<Card className="p-6">
  <CardHeader>
    <CardTitle className="text-2xl font-bold text-purple-700 flex items-center gap-2">
      <Calendar className="h-6 w-6" />
      Review Schedule
    </CardTitle>
  </CardHeader>
  <CardContent>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="space-y-4">
        <h3 className="font-semibold text-purple-700">Regular Reviews</h3>
        <ul className="space-y-2">
          <li className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-blue-500" />
            <span>Weekly Progress Check-ins</span>
          </li>
          <li className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-blue-500" />
            <span>Monthly Goal Alignment</span>
          </li>
          <li className="flex items-center gap-2">
            <BarChart2 className="h-4 w-4 text-blue-500" />
            <span>Quarterly Performance Assessment</span>
          </li>
        </ul>
      </div>
      <div className="space-y-4">
        <h3 className="font-semibold text-purple-700">Adjustment Protocols</h3>
        <ul className="space-y-2">
          <li className="flex items-center gap-2">
            <AlertCircle className="h-4 w-4 text-orange-500" />
            <span>Strategy Modification Triggers</span>
          </li>
          <li className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-green-500" />
            <span>Performance Improvement Plans</span>
          </li>
          <li className="flex items-center gap-2">
            <Target className="h-4 w-4 text-purple-500" />
            <span>Goal Refinement Process</span>
          </li>
        </ul>
      </div>
    </div>
  </CardContent>
</Card>
        </div>
      </div>
    </motion.div>
  );
};



export default ActionPlan;
