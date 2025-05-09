import React from 'react';
import './Testimonials.css';

const testimonialData = [
  {
    text: "RT Payroll System has revolutionized how we manage our global workforce. The real-time payment capabilities and cost savings are game-changing.",
    author: "Jane Smith",
    title: "CFO, Tech Innovations Inc."
  },
  {
    text: "The instant salary streaming feature has greatly improved our employee satisfaction. Our team loves the flexibility it provides.",
    author: "Michael Chen",
    title: "HR Director, Global Solutions Ltd."
  },
  {
    text: "Implementing RT Payroll System cut our processing costs by 75%. The blockchain technology makes everything transparent and efficient.",
    author: "Sarah Johnson",
    title: "Operations Manager, StartUp Hub"
  },
  {
    text: "The DeFi integration is brilliant. Our employees can now instantly invest their earnings, creating a culture of financial wellness.",
    author: "David Rodriguez",
    title: "CEO, FinTech Solutions"
  },
  {
    text: "As a global company, RT Payroll System solved our cross-border payment challenges. The compliance automation is a huge plus.",
    author: "Emma Thompson",
    title: "Finance Head, World Trade Co."
  },
  {
    text: "The customer support is exceptional. They helped us transition smoothly from our legacy system with zero disruptions.",
    author: "Robert Kim",
    title: "IT Director, Enterprise Corp"
  }
];

const Testimonials = () => {
  return (
    <div className="testimonials-section" id="testimonials">
      <div className="section-header">
        <h2>Testimonials</h2>
        <p>What our clients say about us</p>
      </div>
      <div className="testimonials-grid">
        {testimonialData.map((testimonial, index) => (
          <div className="testimonial-card" key={index}>
            <p className="testimonial-text">
              "{testimonial.text}"
            </p>
            <div className="testimonial-author">
              <div className="author-name">{testimonial.author}</div>
              <div className="author-title">{testimonial.title}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Testimonials;