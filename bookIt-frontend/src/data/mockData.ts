import { Experience } from '../types';

export const experiences: Experience[] = [
  {
    id: '1',
    title: 'Kayaking',
    location: 'Udupi',
    description: 'Curated small-group experience. Certified guide. Safety first with gear included.',
    image: 'https://images.pexels.com/photos/1666021/pexels-photo-1666021.jpeg?auto=compress&cs=tinysrgb&w=800',
    price: 999,
    slots: [
      {
        id: 's1',
        date: 'Oct 22',
        times: [
          { time: '07:00 am', available: 4, soldOut: false },
          { time: '09:00 am', available: 2, soldOut: false },
          { time: '11:00 am', available: 5, soldOut: false },
          { time: '01:00 pm', available: 0, soldOut: true },
        ],
      },
      {
        id: 's2',
        date: 'Oct 23',
        times: [
          { time: '07:00 am', available: 3, soldOut: false },
          { time: '09:00 am', available: 4, soldOut: false },
          { time: '11:00 am', available: 2, soldOut: false },
          { time: '01:00 pm', available: 1, soldOut: false },
        ],
      },
      {
        id: 's3',
        date: 'Oct 24',
        times: [
          { time: '07:00 am', available: 5, soldOut: false },
          { time: '09:00 am', available: 3, soldOut: false },
          { time: '11:00 am', available: 4, soldOut: false },
          { time: '01:00 pm', available: 2, soldOut: false },
        ],
      },
      {
        id: 's4',
        date: 'Oct 25',
        times: [
          { time: '07:00 am', available: 2, soldOut: false },
          { time: '09:00 am', available: 1, soldOut: false },
          { time: '11:00 am', available: 3, soldOut: false },
          { time: '01:00 pm', available: 4, soldOut: false },
        ],
      },
      {
        id: 's5',
        date: 'Oct 26',
        times: [
          { time: '07:00 am', available: 4, soldOut: false },
          { time: '09:00 am', available: 5, soldOut: false },
          { time: '11:00 am', available: 1, soldOut: false },
          { time: '01:00 pm', available: 3, soldOut: false },
        ],
      },
    ],
  },
  {
    id: '2',
    title: 'Nandi Hills Sunrise',
    location: 'Bangalore',
    description: 'Curated small-group experience. Certified guide. Safety first with gear included.',
    image: 'https://images.pexels.com/photos/1118873/pexels-photo-1118873.jpeg?auto=compress&cs=tinysrgb&w=800',
    price: 899,
    slots: [
      {
        id: 's1',
        date: 'Oct 22',
        times: [
          { time: '07:00 am', available: 4, soldOut: false },
          { time: '09:00 am', available: 2, soldOut: false },
          { time: '11:00 am', available: 5, soldOut: false },
          { time: '01:00 pm', available: 0, soldOut: true },
        ],
      },
      {
        id: 's2',
        date: 'Oct 23',
        times: [
          { time: '07:00 am', available: 3, soldOut: false },
          { time: '09:00 am', available: 4, soldOut: false },
          { time: '11:00 am', available: 2, soldOut: false },
          { time: '01:00 pm', available: 1, soldOut: false },
        ],
      },
      {
        id: 's3',
        date: 'Oct 24',
        times: [
          { time: '07:00 am', available: 5, soldOut: false },
          { time: '09:00 am', available: 3, soldOut: false },
          { time: '11:00 am', available: 4, soldOut: false },
          { time: '01:00 pm', available: 2, soldOut: false },
        ],
      },
      {
        id: 's4',
        date: 'Oct 25',
        times: [
          { time: '07:00 am', available: 2, soldOut: false },
          { time: '09:00 am', available: 1, soldOut: false },
          { time: '11:00 am', available: 3, soldOut: false },
          { time: '01:00 pm', available: 4, soldOut: false },
        ],
      },
      {
        id: 's5',
        date: 'Oct 26',
        times: [
          { time: '07:00 am', available: 4, soldOut: false },
          { time: '09:00 am', available: 5, soldOut: false },
          { time: '11:00 am', available: 1, soldOut: false },
          { time: '01:00 pm', available: 3, soldOut: false },
        ],
      },
    ],
  },
  {
    id: '3',
    title: 'Coffee Trail',
    location: 'Coorg',
    description: 'Curated small-group experience. Certified guide. Safety first with gear included.',
    image: 'https://images.pexels.com/photos/4790268/pexels-photo-4790268.jpeg?auto=compress&cs=tinysrgb&w=800',
    price: 1299,
    slots: [
      {
        id: 's1',
        date: 'Oct 22',
        times: [
          { time: '07:00 am', available: 4, soldOut: false },
          { time: '09:00 am', available: 2, soldOut: false },
          { time: '11:00 am', available: 5, soldOut: false },
          { time: '01:00 pm', available: 0, soldOut: true },
        ],
      },
      {
        id: 's2',
        date: 'Oct 23',
        times: [
          { time: '07:00 am', available: 3, soldOut: false },
          { time: '09:00 am', available: 4, soldOut: false },
          { time: '11:00 am', available: 2, soldOut: false },
          { time: '01:00 pm', available: 1, soldOut: false },
        ],
      },
      {
        id: 's3',
        date: 'Oct 24',
        times: [
          { time: '07:00 am', available: 5, soldOut: false },
          { time: '09:00 am', available: 3, soldOut: false },
          { time: '11:00 am', available: 4, soldOut: false },
          { time: '01:00 pm', available: 2, soldOut: false },
        ],
      },
      {
        id: 's4',
        date: 'Oct 25',
        times: [
          { time: '07:00 am', available: 2, soldOut: false },
          { time: '09:00 am', available: 1, soldOut: false },
          { time: '11:00 am', available: 3, soldOut: false },
          { time: '01:00 pm', available: 4, soldOut: false },
        ],
      },
      {
        id: 's5',
        date: 'Oct 26',
        times: [
          { time: '07:00 am', available: 4, soldOut: false },
          { time: '09:00 am', available: 5, soldOut: false },
          { time: '11:00 am', available: 1, soldOut: false },
          { time: '01:00 pm', available: 3, soldOut: false },
        ],
      },
    ],
  },
  {
    id: '4',
    title: 'Kayaking',
    location: 'Udupi, Karnataka',
    description: 'Curated small-group experience. Certified guide. Safety first with gear included.',
    image: 'https://images.pexels.com/photos/1430672/pexels-photo-1430672.jpeg?auto=compress&cs=tinysrgb&w=800',
    price: 999,
    slots: [
      {
        id: 's1',
        date: 'Oct 22',
        times: [
          { time: '07:00 am', available: 4, soldOut: false },
          { time: '09:00 am', available: 2, soldOut: false },
          { time: '11:00 am', available: 5, soldOut: false },
          { time: '01:00 pm', available: 0, soldOut: true },
        ],
      },
      {
        id: 's2',
        date: 'Oct 23',
        times: [
          { time: '07:00 am', available: 3, soldOut: false },
          { time: '09:00 am', available: 4, soldOut: false },
          { time: '11:00 am', available: 2, soldOut: false },
          { time: '01:00 pm', available: 1, soldOut: false },
        ],
      },
      {
        id: 's3',
        date: 'Oct 24',
        times: [
          { time: '07:00 am', available: 5, soldOut: false },
          { time: '09:00 am', available: 3, soldOut: false },
          { time: '11:00 am', available: 4, soldOut: false },
          { time: '01:00 pm', available: 2, soldOut: false },
        ],
      },
      {
        id: 's4',
        date: 'Oct 25',
        times: [
          { time: '07:00 am', available: 2, soldOut: false },
          { time: '09:00 am', available: 1, soldOut: false },
          { time: '11:00 am', available: 3, soldOut: false },
          { time: '01:00 pm', available: 4, soldOut: false },
        ],
      },
      {
        id: 's5',
        date: 'Oct 26',
        times: [
          { time: '07:00 am', available: 4, soldOut: false },
          { time: '09:00 am', available: 5, soldOut: false },
          { time: '11:00 am', available: 1, soldOut: false },
          { time: '01:00 pm', available: 3, soldOut: false },
        ],
      },
    ],
  },
  {
    id: '5',
    title: 'Nandi Hills Sunrise',
    location: 'Bangalore',
    description: 'Curated small-group experience. Certified guide. Safety first with gear included.',
    image: 'https://images.pexels.com/photos/1118873/pexels-photo-1118873.jpeg?auto=compress&cs=tinysrgb&w=800',
    price: 899,
    slots: [
      {
        id: 's1',
        date: 'Oct 22',
        times: [
          { time: '07:00 am', available: 4, soldOut: false },
          { time: '09:00 am', available: 2, soldOut: false },
          { time: '11:00 am', available: 5, soldOut: false },
          { time: '01:00 pm', available: 0, soldOut: true },
        ],
      },
      {
        id: 's2',
        date: 'Oct 23',
        times: [
          { time: '07:00 am', available: 3, soldOut: false },
          { time: '09:00 am', available: 4, soldOut: false },
          { time: '11:00 am', available: 2, soldOut: false },
          { time: '01:00 pm', available: 1, soldOut: false },
        ],
      },
      {
        id: 's3',
        date: 'Oct 24',
        times: [
          { time: '07:00 am', available: 5, soldOut: false },
          { time: '09:00 am', available: 3, soldOut: false },
          { time: '11:00 am', available: 4, soldOut: false },
          { time: '01:00 pm', available: 2, soldOut: false },
        ],
      },
      {
        id: 's4',
        date: 'Oct 25',
        times: [
          { time: '07:00 am', available: 2, soldOut: false },
          { time: '09:00 am', available: 1, soldOut: false },
          { time: '11:00 am', available: 3, soldOut: false },
          { time: '01:00 pm', available: 4, soldOut: false },
        ],
      },
      {
        id: 's5',
        date: 'Oct 26',
        times: [
          { time: '07:00 am', available: 4, soldOut: false },
          { time: '09:00 am', available: 5, soldOut: false },
          { time: '11:00 am', available: 1, soldOut: false },
          { time: '01:00 pm', available: 3, soldOut: false },
        ],
      },
    ],
  },
  {
    id: '6',
    title: 'Boat Cruise',
    location: 'Sunderban',
    description: 'Curated small-group experience. Certified guide. Safety first with gear included.',
    image: 'https://images.pexels.com/photos/1426718/pexels-photo-1426718.jpeg?auto=compress&cs=tinysrgb&w=800',
    price: 999,
    slots: [
      {
        id: 's1',
        date: 'Oct 22',
        times: [
          { time: '07:00 am', available: 4, soldOut: false },
          { time: '09:00 am', available: 2, soldOut: false },
          { time: '11:00 am', available: 5, soldOut: false },
          { time: '01:00 pm', available: 0, soldOut: true },
        ],
      },
      {
        id: 's2',
        date: 'Oct 23',
        times: [
          { time: '07:00 am', available: 3, soldOut: false },
          { time: '09:00 am', available: 4, soldOut: false },
          { time: '11:00 am', available: 2, soldOut: false },
          { time: '01:00 pm', available: 1, soldOut: false },
        ],
      },
      {
        id: 's3',
        date: 'Oct 24',
        times: [
          { time: '07:00 am', available: 5, soldOut: false },
          { time: '09:00 am', available: 3, soldOut: false },
          { time: '11:00 am', available: 4, soldOut: false },
          { time: '01:00 pm', available: 2, soldOut: false },
        ],
      },
      {
        id: 's4',
        date: 'Oct 25',
        times: [
          { time: '07:00 am', available: 2, soldOut: false },
          { time: '09:00 am', available: 1, soldOut: false },
          { time: '11:00 am', available: 3, soldOut: false },
          { time: '01:00 pm', available: 4, soldOut: false },
        ],
      },
      {
        id: 's5',
        date: 'Oct 26',
        times: [
          { time: '07:00 am', available: 4, soldOut: false },
          { time: '09:00 am', available: 5, soldOut: false },
          { time: '11:00 am', available: 1, soldOut: false },
          { time: '01:00 pm', available: 3, soldOut: false },
        ],
      },
    ],
  },
  {
    id: '7',
    title: 'Bunjee Jumping',
    location: 'Manali',
    description: 'Curated small-group experience. Certified guide. Safety first with gear included.',
    image: 'https://images.pexels.com/photos/2040627/pexels-photo-2040627.jpeg?auto=compress&cs=tinysrgb&w=800',
    price: 999,
    slots: [
      {
        id: 's1',
        date: 'Oct 22',
        times: [
          { time: '07:00 am', available: 4, soldOut: false },
          { time: '09:00 am', available: 2, soldOut: false },
          { time: '11:00 am', available: 5, soldOut: false },
          { time: '01:00 pm', available: 0, soldOut: true },
        ],
      },
      {
        id: 's2',
        date: 'Oct 23',
        times: [
          { time: '07:00 am', available: 3, soldOut: false },
          { time: '09:00 am', available: 4, soldOut: false },
          { time: '11:00 am', available: 2, soldOut: false },
          { time: '01:00 pm', available: 1, soldOut: false },
        ],
      },
      {
        id: 's3',
        date: 'Oct 24',
        times: [
          { time: '07:00 am', available: 5, soldOut: false },
          { time: '09:00 am', available: 3, soldOut: false },
          { time: '11:00 am', available: 4, soldOut: false },
          { time: '01:00 pm', available: 2, soldOut: false },
        ],
      },
      {
        id: 's4',
        date: 'Oct 25',
        times: [
          { time: '07:00 am', available: 2, soldOut: false },
          { time: '09:00 am', available: 1, soldOut: false },
          { time: '11:00 am', available: 3, soldOut: false },
          { time: '01:00 pm', available: 4, soldOut: false },
        ],
      },
      {
        id: 's5',
        date: 'Oct 26',
        times: [
          { time: '07:00 am', available: 4, soldOut: false },
          { time: '09:00 am', available: 5, soldOut: false },
          { time: '11:00 am', available: 1, soldOut: false },
          { time: '01:00 pm', available: 3, soldOut: false },
        ],
      },
    ],
  },
  {
    id: '8',
    title: 'Coffee Trail',
    location: 'Coorg',
    description: 'Curated small-group experience. Certified guide. Safety first with gear included.',
    image: 'https://images.pexels.com/photos/4790268/pexels-photo-4790268.jpeg?auto=compress&cs=tinysrgb&w=800',
    price: 1299,
    slots: [
      {
        id: 's1',
        date: 'Oct 22',
        times: [
          { time: '07:00 am', available: 4, soldOut: false },
          { time: '09:00 am', available: 2, soldOut: false },
          { time: '11:00 am', available: 5, soldOut: false },
          { time: '01:00 pm', available: 0, soldOut: true },
        ],
      },
      {
        id: 's2',
        date: 'Oct 23',
        times: [
          { time: '07:00 am', available: 3, soldOut: false },
          { time: '09:00 am', available: 4, soldOut: false },
          { time: '11:00 am', available: 2, soldOut: false },
          { time: '01:00 pm', available: 1, soldOut: false },
        ],
      },
      {
        id: 's3',
        date: 'Oct 24',
        times: [
          { time: '07:00 am', available: 5, soldOut: false },
          { time: '09:00 am', available: 3, soldOut: false },
          { time: '11:00 am', available: 4, soldOut: false },
          { time: '01:00 pm', available: 2, soldOut: false },
        ],
      },
      {
        id: 's4',
        date: 'Oct 25',
        times: [
          { time: '07:00 am', available: 2, soldOut: false },
          { time: '09:00 am', available: 1, soldOut: false },
          { time: '11:00 am', available: 3, soldOut: false },
          { time: '01:00 pm', available: 4, soldOut: false },
        ],
      },
      {
        id: 's5',
        date: 'Oct 26',
        times: [
          { time: '07:00 am', available: 4, soldOut: false },
          { time: '09:00 am', available: 5, soldOut: false },
          { time: '11:00 am', available: 1, soldOut: false },
          { time: '01:00 pm', available: 3, soldOut: false },
        ],
      },
    ],
  },
];
