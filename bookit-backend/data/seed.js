const mongoose = require('mongoose');
const connectDB = require('../config/db');
const Experience = require('../models/experience.model');
const Slot = require('../models/slot.model');
const PromoCode = require('../models/promoCode.model');

// Load .env vars (database URL, etc.)
require('dotenv').config({ path: '../.env' });

// Connect to MongoDB
connectDB();

// Utility: return a Date at local time with specific hours/minutes on the provided base date
function atTime(baseDate, hours, minutes) {
  const d = new Date(baseDate);
  d.setHours(hours, minutes, 0, 0);
  return d;
}

// Utility: create future dates offset by N days
function daysFromNow(n) {
  const d = new Date();
  d.setDate(d.getDate() + n);
  return d;
}

// Seed data for experiences: update, add, or remove items here as needed
const sampleExperiences = [
  {
    title: 'Sunrise Trekking',
    description: 'Explore the mountains at dawn with an expert guide and safety briefing.',
    location: 'Manali, India',
    duration: '4 hours',
    price: 1800,
    thumbnailUrl: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=1200&auto=format&fit=crop',
    imageUrls: [
      'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1600&auto=format&fit=crop',
    ],
    category: 'Adventure',
    // Slots will be generated below
  },
  {
    title: 'Backwaters Kayaking',
    description: 'Paddle through serene canals with mangroves and birdlife. Safety gear included.',
    location: 'Alleppey, India',
    duration: '2.5 hours',
    price: 1200,
    thumbnailUrl: 'https://images.pexels.com/photos/1666021/pexels-photo-1666021.jpeg?auto=compress&cs=tinysrgb&w=1200',
    imageUrls: [
      'https://images.pexels.com/photos/2404348/pexels-photo-2404348.jpeg?auto=compress&cs=tinysrgb&w=1600',
    ],
    category: 'Adventure',
  },
  {
    title: 'Old City Food Walk',
    description: 'Taste iconic street food with a local expert. Vegetarian options available.',
    location: 'Delhi, India',
    duration: '3 hours',
    price: 1500,
    thumbnailUrl: 'https://images.unsplash.com/photo-1559893088-c0787ebfc084?q=80&w=1200&auto=format&fit=crop',
    imageUrls: [
      'https://images.unsplash.com/photo-1604908812473-4f0f3d1b3a9e?q=80&w=1600&auto=format&fit=crop',
    ],
    category: 'Food & Drink',
  },
  {
    title: 'Coffee Estate Trail',
    description: 'Walk through lush estates, learn roasting basics, and sample fresh brews.',
    location: 'Coorg, India',
    duration: '2 hours',
    price: 1000,
    thumbnailUrl: 'https://images.pexels.com/photos/4790268/pexels-photo-4790268.jpeg?auto=compress&cs=tinysrgb&w=1200',
    imageUrls: [
      'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=80&w=1600&auto=format&fit=crop',
    ],
    category: 'Cultural',
  },
  {
    title: 'Nandi Hills Sunrise',
    description: 'Scenic sunrise views with light snacks and guided storytelling.',
    location: 'Bangalore, India',
    duration: '3 hours',
    price: 899,
    thumbnailUrl: 'https://images.pexels.com/photos/1118873/pexels-photo-1118873.jpeg?auto=compress&cs=tinysrgb&w=1200',
    imageUrls: [
      'https://images.unsplash.com/photo-1491557345352-5929e343eb89?q=80&w=1600&auto=format&fit=crop',
    ],
    category: 'Relaxation',
  },
  {
    title: 'Backwater Houseboat Day Cruise',
    description: 'Glide through tranquil backwaters, with onboard lunch and cultural stops.',
    location: 'Kumarakom, India',
    duration: '6 hours',
    price: 3500,
    thumbnailUrl: 'https://images.pexels.com/photos/1426718/pexels-photo-1426718.jpeg?auto=compress&cs=tinysrgb&w=1200',
    imageUrls: [
      'https://images.unsplash.com/photo-1544551763-7ef5c175e42b?q=80&w=1600&auto=format&fit=crop',
    ],
    category: 'Relaxation',
  },
  {
    title: 'Desert Dune Safari',
    description: 'Experience dune bashing, camel rides, and sunset views over golden sands.',
    location: 'Jaisalmer, India',
    duration: '5 hours',
    price: 2200,
    thumbnailUrl: 'https://images.unsplash.com/photo-1518684079-3c830dcef090?q=80&w=1200&auto=format&fit=crop',
    imageUrls: [
      'https://images.unsplash.com/photo-1516442719524-a603408c90cb?q=80&w=1600&auto=format&fit=crop',
    ],
    category: 'Adventure',
  },
  {
    title: 'Heritage Fort Walk',
    description: 'Guided walk through ancient ramparts, stories of kings, and panoramic views.',
    location: 'Jaipur, India',
    duration: '2.5 hours',
    price: 1300,
    thumbnailUrl: 'https://images.unsplash.com/photo-1603262110263-fb0112e7cc33?q=80&w=1200&auto=format&fit=crop',
    imageUrls: [
      'https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=1600&auto=format&fit=crop',
    ],
    category: 'Cultural',
  },
];

async function importData() {
  try {
    // 1) Clear existing data to avoid duplicates on reseed
    await Slot.deleteMany();
    await Experience.deleteMany();

    // 2) Insert experiences first
    const created = await Experience.insertMany(sampleExperiences);

    // 3) Generate and insert slots for each experience
    //    Adjust capacities/bookedCount here as needed
    const slots = [];
    for (const exp of created) {
      // Create 3 future dates with 2-3 times each
      const d1 = daysFromNow(1);
      const d2 = daysFromNow(2);
      const d3 = daysFromNow(3);

      const template = [
        atTime(d1, 6, 0),
        atTime(d1, 8, 0),
        atTime(d2, 10, 0),
        atTime(d2, 14, 0),
        atTime(d3, 7, 30),
        atTime(d3, 9, 30),
      ];

      template.forEach((startTime, idx) => {
        const totalCapacity = 12 + (idx % 3) * 4; // 12,16,20 rotation
        const bookedCount = Math.max(0, (idx % 4) * 3 - 1); // some variety
        slots.push({
          experience: exp._id,
          startTime,
          totalCapacity,
          bookedCount,
        });
      });
    }

    const createdSlots = await Slot.insertMany(slots);

    // 4) (Optional) Seed promo codes aligned with frontend expectations
    await PromoCode.deleteMany();
    await PromoCode.insertMany([
      { code: 'SAVE10', discountType: 'percentage', discountValue: 10, isActive: true },
      { code: 'FLAT100', discountType: 'fixed', discountValue: 100, isActive: true },
      { code: 'EXPIRED', discountType: 'percentage', discountValue: 50, isActive: false },
    ]);

    // 5) Output a clear summary for quick verification
    console.log('\n=== Seed Complete: Experiences & Slots ===');
    console.table(
      created.map((e) => ({
        title: e.title,
        location: e.location,
        price: e.price,
        duration: e.duration,
      }))
    );
    console.log(`Inserted experiences: ${created.length}`);
    console.log(`Inserted slots: ${createdSlots.length}`);
    console.log('Promo codes refreshed.');

    console.log('\nData imported successfully!');
    process.exit(0);
  } catch (error) {
    console.error(`Error with data import: ${error.message || error}`);
    process.exit(1);
  }
}

// Run the importer
// Usage: from project root -> `npm run seed` or `node data/seed.js` inside backend folder
importData();