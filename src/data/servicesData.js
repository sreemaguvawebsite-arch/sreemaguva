// Detailed Services Data for Individual Pages

export const detailedServices = {
  'basic-beauty-package': {
    id: 'basic-beauty-package',
    name: 'Basic Beauty Package',
    shortName: 'Basic Package',
    price: '₹999',
    duration: '2-3 Hours',
    image: 'https://images.unsplash.com/photo-1487412912498-0447578fcca8?w=800&q=80',
    description: 'Perfect for everyday beauty maintenance and special occasions. Our basic package includes essential beauty services to enhance your natural glow.',
    
    services: [
      {
        name: 'Facial',
        description: 'Deep cleansing facial with steam and extraction',
        duration: '45 mins'
      },
      {
        name: 'Clean-up',
        description: 'Face clean-up with toning and moisturizing',
        duration: '30 mins'
      },
      {
        name: 'Threading',
        description: 'Eyebrow and upper lip threading',
        duration: '20 mins'
      },
      {
        name: 'Hair Care',
        description: 'Hair wash, conditioning and basic styling',
        duration: '45 mins'
      }
    ],
    
    benefits: [
      'Removes dead skin cells',
      'Improves skin texture',
      'Professional eyebrow shaping',
      'Healthy hair conditioning',
      'Instant glow and freshness'
    ],
    
    suitableFor: [
      'Regular beauty maintenance',
      'Office events and meetings',
      'Casual social gatherings',
      'Monthly self-care routine'
    ],
    
    process: [
      'Consultation and skin analysis',
      'Steam and deep cleansing',
      'Extraction and toning',
      'Threading and shaping',
      'Hair treatment and styling',
      'Final moisturizing and sun protection'
    ],
    
    beforeAfterCare: {
      before: [
        'Remove makeup completely',
        'Avoid harsh scrubbing 24 hours prior',
        'Stay hydrated'
      ],
      after: [
        'Avoid sun exposure for 4-6 hours',
        'Use gentle moisturizer',
        'Avoid touching face frequently'
      ]
    }
  },

  'glow-package': {
    id: 'glow-package',
    name: 'Glow Package',
    shortName: 'Glow Package',
    price: '₹1,999',
    duration: '3-4 Hours',
    popular: true,
    image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=800&q=80',
    description: 'Our most popular package designed to give you a radiant, glowing complexion. Perfect for special occasions and events.',
    
    services: [
      {
        name: 'Premium Facial',
        description: 'Advanced facial with gold/diamond treatment',
        duration: '60 mins'
      },
      {
        name: 'Clean-up',
        description: 'Deep pore cleansing with extraction',
        duration: '30 mins'
      },
      {
        name: 'Threading',
        description: 'Complete facial threading including eyebrows',
        duration: '25 mins'
      },
      {
        name: 'Hair Spa',
        description: 'Deep conditioning hair spa treatment',
        duration: '60 mins'
      },
      {
        name: 'Hair Styling',
        description: 'Professional blow-dry and styling',
        duration: '45 mins'
      }
    ],
    
    benefits: [
      'Instant radiant glow',
      'Deep skin nourishment',
      'Professional hair treatment',
      'Long-lasting results',
      'Complete makeover experience'
    ],
    
    suitableFor: [
      'Parties and celebrations',
      'Wedding functions',
      'Professional photoshoots',
      'Special date nights',
      'Festival occasions'
    ],
    
    process: [
      'Detailed skin and hair consultation',
      'Premium facial treatment with mask',
      'Hair spa with deep conditioning',
      'Professional threading and shaping',
      'Hair styling with blow-dry',
      'Final touch-ups and finishing'
    ],
    
    beforeAfterCare: {
      before: [
        'Book appointment 1 day in advance',
        'Come with clean, makeup-free face',
        'Wash hair with mild shampoo',
        'Avoid chemical treatments 48 hours prior'
      ],
      after: [
        'Avoid washing face for 4 hours',
        'Use recommended skincare products',
        'Avoid heat styling for 24 hours',
        'Stay hydrated and get adequate rest'
      ]
    }
  },

  'bridal-package': {
    id: 'bridal-package',
    name: 'Bridal / Premium Package',
    shortName: 'Bridal Package',
    price: '₹4,999+',
    duration: '4-6 Hours',
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80',
    description: 'Complete bridal transformation package for your special day. Includes premium makeup, styling, and personalized consultation.',
    
    services: [
      {
        name: 'Bridal Makeup',
        description: 'HD bridal makeup with premium products',
        duration: '90 mins'
      },
      {
        name: 'Hair Styling',
        description: 'Bridal hairstyling with accessories',
        duration: '75 mins'
      },
      {
        name: 'Skin Preparation',
        description: 'Pre-bridal facial and skin treatment',
        duration: '60 mins'
      },
      {
        name: 'Draping',
        description: 'Saree/lehenga draping assistance',
        duration: '30 mins'
      },
      {
        name: 'Personalized Consultation',
        description: 'Pre-wedding beauty consultation',
        duration: '30 mins'
      }
    ],
    
    benefits: [
      'Picture-perfect bridal look',
      'Long-lasting makeup (12+ hours)',
      'Professional photography ready',
      'Complete styling service',
      'Personalized beauty consultation'
    ],
    
    suitableFor: [
      'Wedding ceremonies',
      'Engagement ceremonies',
      'Pre-wedding photoshoots',
      'Reception parties',
      'Traditional celebrations'
    ],
    
    process: [
      'Pre-wedding consultation and trial',
      'Skin preparation and priming',
      'Professional bridal makeup application',
      'Hair styling with accessories',
      'Draping and final adjustments',
      'Touch-up kit provision'
    ],
    
    beforeAfterCare: {
      before: [
        'Schedule trial session 1 week prior',
        'Complete skincare routine 1 month before',
        'Avoid new products 1 week before',
        'Get adequate sleep and stay hydrated',
        'Bring reference pictures for desired look'
      ],
      after: [
        'Avoid touching face and hair',
        'Use provided touch-up kit as needed',
        'Remove makeup gently with recommended products',
        'Apply nourishing night cream before sleep'
      ]
    },
    
    packages: [
      {
        name: 'Basic Bridal',
        price: '₹4,999',
        includes: ['Bridal Makeup', 'Hair Styling', 'Basic Draping']
      },
      {
        name: 'Premium Bridal',
        price: '₹7,999',
        includes: ['HD Makeup', 'Hair Styling', 'Draping', 'Pre-bridal Facial', 'Touch-up Kit']
      },
      {
        name: 'Luxury Bridal',
        price: '₹12,999',
        includes: ['Premium HD Makeup', 'Designer Hair Styling', 'Complete Draping', 'Pre-bridal Package', 'On-location Service', 'Assistant for Touch-ups']
      }
    ]
  },

  'hair-styling': {
    id: 'hair-styling',
    name: 'Hair Styling',
    shortName: 'Hair Styling',
    price: '₹599 - ₹1,499',
    duration: '45 mins - 2 Hours',
    image: 'https://images.unsplash.com/photo-1560869713-7d0a29430803?w=800&q=80',
    description: 'Professional hair styling services for all occasions. From everyday looks to special event hairstyles.',
    
    services: [
      {
        name: 'Blow Dry & Styling',
        description: 'Professional blow dry with styling',
        duration: '45 mins',
        price: '₹599'
      },
      {
        name: 'Curling',
        description: 'Soft curls or tight ringlets',
        duration: '60 mins',
        price: '₹799'
      },
      {
        name: 'Straightening',
        description: 'Smooth, sleek straight hair',
        duration: '60 mins',
        price: '₹799'
      },
      {
        name: 'Updos',
        description: 'Elegant updo styles for events',
        duration: '75 mins',
        price: '₹999'
      },
      {
        name: 'Bridal Hair',
        description: 'Special bridal hairstyles',
        duration: '90 mins',
        price: '₹1,499'
      }
    ],
    
    benefits: [
      'Professional styling techniques',
      'Long-lasting results',
      'Suitable for all hair types',
      'Heat protection included',
      'Style maintenance tips'
    ],
    
    suitableFor: [
      'Daily office looks',
      'Party and events',
      'Wedding functions',
      'Professional meetings',
      'Special occasions'
    ],
    
    hairTypes: [
      'Straight Hair',
      'Wavy Hair',
      'Curly Hair',
      'Coily Hair',
      'Fine Hair',
      'Thick Hair'
    ],
    
    process: [
      'Hair consultation and analysis',
      'Hair washing with appropriate shampoo',
      'Heat protection application',
      'Professional styling with tools',
      'Finishing products application',
      'Style setting and final touches'
    ],
    
    beforeAfterCare: {
      before: [
        'Wash hair with mild shampoo',
        'Avoid heavy conditioning',
        'Come with dry or slightly damp hair',
        'Bring reference pictures if needed'
      ],
      after: [
        'Avoid washing for 8-12 hours',
        'Use silk pillowcase while sleeping',
        'Apply recommended hair serums',
        'Avoid excessive heat styling'
      ]
    }
  },

  'facial-treatments': {
    id: 'facial-treatments',
    name: 'Facial Treatments',
    shortName: 'Facials',
    price: '₹799 - ₹2,999',
    duration: '45 mins - 90 mins',
    image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=800&q=80',
    description: 'Customized facial treatments for all skin types. From basic cleansing to advanced anti-aging treatments.',
    
    services: [
      {
        name: 'Basic Facial',
        description: 'Cleansing, steaming, and moisturizing',
        duration: '45 mins',
        price: '₹799'
      },
      {
        name: 'Gold Facial',
        description: 'Anti-aging facial with gold particles',
        duration: '60 mins',
        price: '₹1,299'
      },
      {
        name: 'Diamond Facial',
        description: 'Exfoliating facial with diamond dust',
        duration: '60 mins',
        price: '₹1,499'
      },
      {
        name: 'Hydra Facial',
        description: 'Deep hydration and pore cleansing',
        duration: '75 mins',
        price: '₹1,999'
      },
      {
        name: 'Anti-Aging Facial',
        description: 'Advanced anti-aging treatment',
        duration: '90 mins',
        price: '₹2,999'
      }
    ],
    
    skinTypes: [
      'Normal Skin',
      'Dry Skin',
      'Oily Skin',
      'Combination Skin',
      'Sensitive Skin',
      'Acne-Prone Skin'
    ],
    
    benefits: [
      'Deep pore cleansing',
      'Improved skin texture',
      'Reduced fine lines',
      'Better blood circulation',
      'Natural skin glow'
    ],
    
    suitableFor: [
      'Monthly skincare routine',
      'Special occasion prep',
      'Acne treatment',
      'Anti-aging care',
      'Skin rejuvenation'
    ],
    
    process: [
      'Skin analysis and consultation',
      'Makeup removal and cleansing',
      'Steam and pore opening',
      'Extraction (if needed)',
      'Facial massage and mask application',
      'Toning and moisturizing'
    ],
    
    beforeAfterCare: {
      before: [
        'Remove all makeup',
        'Avoid harsh scrubbing',
        'Inform about any allergies',
        'Stay hydrated'
      ],
      after: [
        'Avoid sun exposure for 6 hours',
        'Use gentle skincare products',
        'Apply sunscreen regularly',
        'Maintain proper hydration'
      ]
    }
  },

  'makeup-services': {
    id: 'makeup-services',
    name: 'Makeup Services',
    shortName: 'Makeup',
    price: '₹1,299 - ₹4,999',
    duration: '60 mins - 2 Hours',
    image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&q=80',
    description: 'Professional makeup services for all occasions. From natural day looks to glamorous evening makeup.',
    
    services: [
      {
        name: 'Party Makeup',
        description: 'Glamorous makeup for parties',
        duration: '60 mins',
        price: '₹1,299'
      },
      {
        name: 'HD Makeup',
        description: 'High-definition makeup for photos',
        duration: '75 mins',
        price: '₹1,799'
      },
      {
        name: 'Airbrush Makeup',
        description: 'Flawless airbrush application',
        duration: '90 mins',
        price: '₹2,499'
      },
      {
        name: 'Bridal Makeup',
        description: 'Complete bridal makeup look',
        duration: '120 mins',
        price: '₹3,999'
      },
      {
        name: 'Engagement Makeup',
        description: 'Perfect engagement ceremony look',
        duration: '90 mins',
        price: '₹2,999'
      }
    ],
    
    occasions: [
      'Wedding Ceremonies',
      'Engagement Functions',
      'Birthday Parties',
      'Anniversary Celebrations',
      'Professional Events',
      'Photoshoots'
    ],
    
    makeupStyles: [
      'Natural & Dewy',
      'Glamorous & Bold',
      'Classic & Elegant',
      'Modern & Trendy',
      'Traditional & Cultural'
    ],
    
    benefits: [
      'Professional application techniques',
      'High-quality branded products',
      'Long-lasting formula',
      'Customized for skin tone',
      'Photo and video ready'
    ],
    
    process: [
      'Skin preparation and priming',
      'Foundation and concealer application',
      'Contouring and highlighting',
      'Eye makeup and eyebrow shaping',
      'Lip color application',
      'Final setting and touch-ups'
    ],
    
    beforeAfterCare: {
      before: [
        'Complete skincare routine night before',
        'Moisturize face properly',
        'Bring reference pictures',
        'Arrive with clean face'
      ],
      after: [
        'Avoid touching face frequently',
        'Use provided touch-up products',
        'Remove makeup gently at night',
        'Apply nourishing night cream'
      ]
    }
  }
}

// Service categories for easy navigation
export const serviceCategories = [
  {
    id: 'packages',
    name: 'Beauty Packages',
    services: ['basic-beauty-package', 'glow-package', 'bridal-package']
  },
  {
    id: 'individual',
    name: 'Individual Services',
    services: ['hair-styling', 'facial-treatments', 'makeup-services']
  }
]