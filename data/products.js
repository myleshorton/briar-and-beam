export const products = [
  {
    id: 1,
    name: 'The Eloise Table',
    price: 4500,
    image: '/images/eloise/eloise-1.jpg',
    images: [
      '/images/eloise/eloise-1.jpg',
      '/images/eloise/eloise-2.jpg',
      '/images/eloise/eloise-3.jpg',
      '/images/eloise/eloise-4.jpg'
    ],
    category: 'Dining',
    description: 'Built for long dinners and the late mornings that follow. A solid white oak dining table with room for six, a matte hand-rubbed finish, edges softened just enough to invite a hand. Made to hold a family and the stories it gathers, for as long as you\'ll have it.',
    woodOptions: [
      { name: 'White Oak', priceAdjust: 0 },
      { name: 'Walnut', priceAdjust: 200 }
    ],
    details: [
      'Material: Solid White Oak',
      'Dimensions: 60" L x 40" W x 30" H',
      'Seats: 6',
      'Finish: Oil-based Wax',
      'Lead Time: 3-6 weeks'
    ]
  },
  {
    id: 2,
    name: 'The Noémie',
    price: 3200,
    image: '/images/livia/livia-1.jpg',
    images: [
      '/images/livia/livia-1.jpg',
      '/images/livia/livia-2.jpg'
    ],
    category: 'Side Table',
    description: 'A small side table drawn from memory — scalloped edges I once fell in love with and never forgot. The Noémie is a quiet thing, small enough for a bedside and beautiful enough to live in any room of the house. Built in solid walnut to last well past a single lifetime.',
    woodOptions: [
      { name: 'White Oak', priceAdjust: 0 },
      { name: 'Walnut', priceAdjust: 0 }
    ],
    details: [
      'Material: Walnut',
      'Dimensions: 28 1/2" L x 16" W x 26 7/8" H',
      'Finish: Oil-based Wax',
      'Lead Time: 3-6 weeks',
      'Available in custom sizes, woods, and finishes'
    ]
  },
  {
    id: 3,
    name: 'The Alexia',
    price: 2400,
    image: '/images/alexia/alexia-1.jpg',
    images: [
      '/images/alexia/alexia-1.jpg',
      '/images/alexia/alexia-2.jpg',
      '/images/alexia/alexia-3.jpg'
    ],
    category: 'Nesting Tables',
    description: 'Something less predictable than an end table — a pair, because sometimes two is better than one. The Alexia nestles beside a couch or tucks together as a nightstand. Quiet, considered, and a little unexpected.',
    woodOptions: [
      { name: 'White Oak', priceAdjust: 0 },
      { name: 'Walnut', priceAdjust: 200 }
    ],
    details: [
      'Material: Solid White Oak',
      'Dimensions (large): 16 1/2" Diameter x 22" H',
      'Dimensions (small): 13" Diameter x 19" H',
      'Quantity: Pair',
      'Finish: Oil-based Wax',
      'Lead Time: 3-6 weeks',
      'Available in custom sizes and finishes'
    ]
  },
  {
    id: 4,
    name: 'The Jack',
    price: 5600,
    image: '/images/julien/julien-1.jpg',
    images: [
      '/images/julien/julien-1.jpg',
      '/images/julien/julien-2.jpg',
      '/images/julien/julien-3.jpg'
    ],
    category: 'Coffee Table',
    description: 'The Jack began as a margin sketch in an old carpenter\'s notebook — a low, simple table with no ornamentation, only proportion and purpose. Built in solid walnut with traditional joinery, made for a long life of being lived around.',
    woodOptions: [
      { name: 'White Oak', priceAdjust: 0 },
      { name: 'Walnut', priceAdjust: 0 }
    ],
    details: [
      'Material: Walnut',
      'Dimensions: 48" L x 28" W x 18" H',
      'Joinery: Mortise & Tenon',
      'Finish: Oil-based Wax',
      'Lead Time: 3-6 weeks',
      'Available in custom sizes, woods, and finishes'
    ]
  },
  {
    id: 5,
    name: 'The Livia',
    price: 5400,
    image: '/images/jack/jack-hero.jpg',
    images: [
      '/images/jack/jack-hero.jpg',
      '/images/jack/jack-detail.jpg'
    ],
    category: 'Coffee Table',
    description: 'A table that lives at the center of a house. Built to carry the weight of a family — dinners and dance parties, the small thunder of children\'s feet, the slow afternoons that go on too long. Six generous drawers for the things worth keeping. Hand-built in solid oak with the kind of quiet character that only deepens with age.',
    woodOptions: [
      { name: 'White Oak', priceAdjust: 0 },
      { name: 'Walnut', priceAdjust: 0 }
    ],
    details: [
      'Material: Solid White Oak',
      'Dimensions: 66 3/4" L x 41" W x 16" H',
      'Drawers: 6',
      'Lead Time: 3-6 weeks',
      'Available in custom sizes, woods, and finishes'
    ]
  },
  {
    id: 6,
    name: 'The Juniper',
    price: 2600,
    image: '/images/juniper/juniper-1.jpg',
    images: [
      '/images/juniper/juniper-1.jpg',
      '/images/juniper/juniper-2.jpg',
      '/images/juniper/juniper-3.jpg',
      '/images/juniper/juniper-4.jpg'
    ],
    category: 'Side Table',
    description: 'The Juniper is The Noémie\'s little sister — no drawer, no fuss, just as elegant and effortlessly simple. She tucks into an entryway or lines a hallway without saying too much, but you\'ll notice her every time you walk by.',
    woodOptions: [
      { name: 'White Oak', priceAdjust: 0 },
      { name: 'Walnut', priceAdjust: 200 }
    ],
    details: [
      'Material: Walnut',
      'Dimensions: 26" L x 12 1/4" W x 24 3/4" H',
      'Finish: Oil-based Wax',
      'Lead Time: 3-6 weeks',
      'Available in custom sizes and finishes'
    ]
  },
  {
    id: 7,
    name: 'The Kate',
    price: 5400,
    image: '/images/kate/kate-1.jpg',
    images: [
      '/images/kate/kate-1.jpg',
      '/images/kate/kate-2.jpg',
      '/images/kate/kate-3.jpg',
      '/images/kate/kate-4.jpg'
    ],
    category: 'Console',
    description: 'The Kate is for the space you always mean to do something with. That bare wall in the entryway, that stretch of hallway that feels too empty. A console with the kind of quiet presence that makes a room feel like someone thought about it — because you did.',
    woodOptions: [
      { name: 'White Oak', priceAdjust: 0 },
      { name: 'Walnut', priceAdjust: 0 }
    ],
    details: [
      'Material: Solid White Oak',
      'Dimensions: TBD',
      'Finish: Oil-based Wax',
      'Lead Time: 3-6 weeks'
    ]
  },
  {
    id: 8,
    name: 'Cutting Boards',
    price: 95,
    image: '/images/boards/walnut-paddle.jpg',
    images: [
      '/images/boards/walnut-paddle.jpg',
      '/images/boards/oak-walnut-paddle.jpg',
      '/images/boards/white-oak.jpg',
      '/images/boards/leopard-paddle.jpg',
      '/images/boards/leopard-slab.jpg'
    ],
    category: 'Kitchen',
    description: 'Each board is cut, shaped, and finished by hand from a single piece of hardwood — no two alike. Scroll through to find yours, then bring it home. Walnut and leopardwood run a touch dearer for the wood alone; all of them are made for a lifetime of bread, cheese, and slow Sunday mornings.',
    variants: [
      { name: 'Walnut Paddle', wood: 'Black Walnut', price: 145, dims: 'approx. 20" L x 9" W', image: '/images/boards/walnut-paddle.jpg' },
      { name: 'Oak & Walnut Paddle', wood: 'White Oak & Walnut', price: 115, dims: 'approx. 18" L x 9" W', image: '/images/boards/oak-walnut-paddle.jpg' },
      { name: 'White Oak Paddle', wood: 'White Oak', price: 95, dims: 'approx. 16" L x 10" W', image: '/images/boards/white-oak.jpg' },
      { name: 'Leopardwood Paddle', wood: 'Leopardwood', price: 135, dims: 'approx. 18" L x 9" W', image: '/images/boards/leopard-paddle.jpg' },
      { name: 'Leopardwood Slab', wood: 'Leopardwood', price: 105, dims: 'approx. 14" L x 7" W', image: '/images/boards/leopard-slab.jpg' }
    ],
    details: [
      'Finish: Food-safe oil & wax',
      'Care: Hand wash, towel dry, oil periodically',
      'Each piece is one of a kind'
    ]
  }
];
