export interface BlogPostSection {
  heading: string;
  text: string;
  quote?: string;
  bulletPoints?: string[];
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  excerpt: string;
  category: "Wedding Catering" | "Corporate Events" | "Culinary Secrets" | "Party Planning";
  date: string;
  readTime: string;
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  image: string;
  featured?: boolean;
  tags: string[];
  content: {
    introduction: string;
    sections: BlogPostSection[];
    conclusion: string;
  };

  seo?: {
  metaTitle?: string;
  metaDescription?: string;
};
}

export const BLOG_POSTS: BlogPost[] = [
  {
    id: "1",
    slug: "wedding-catering-tips-kerala",
    title: "10 Essential Tips for Planning Perfect Wedding Catering",
    subtitle: "From selecting traditional dishes to managing guest numbers with style and precision.",
    excerpt: "Discover expert secrets to creating a grand wedding banquet that satisfies traditional tastes while delighting modern palates.",
    category: "Wedding Catering",
    date: "October 2, 2026",
    readTime: "6 min read",
    author: {
      name: "Chef George Joseph",
      role: "Executive Culinary Director",
      avatar: "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=150&q=80"
    },
    image: "/blog/wedding-catering-guide.png",
    featured: true,
    tags: ["Weddings", "Menu Planning", "Kerala Cuisine", "Event Design"],
    content: {
      introduction: "A wedding celebration is defined by unforgettable memories—and at the heart of every great memory is an exceptional feast. Choosing the right catering team and menu is one of the most vital decisions you will make during your wedding planning.",
      sections: [
        {
          heading: "1. Calculate Guest Numbers & Dietary Varieties",
          text: "Always allocate a slight buffer when submitting final headcounts. Additionally, modern celebrations often include guests with specific dietary preferences, ranging from traditional vegetarian Sadya lovers to guests who prefer live grill setups.",
          quote: "A well-balanced menu accommodates every age group, ensuring both grand tradition and contemporary luxury."
        },
        {
          heading: "2. The Magic of Live Cooking Counters",
          text: "Incorporating interactive counters—such as live Appam & Stew stations, sizzling tandoori grills, or artisanal dessert bars—adds an element of theatrical entertainment that guests will talk about long after the reception.",
          bulletPoints: [
            "Hot live counters prevent food cooling during long receptions.",
            "Guests love customized toppings and instant cook options.",
            "It creates an inviting, interactive atmosphere."
          ]
        },
        {
          heading: "3. Seamless Service & Professional Staffing",
          text: "Great food requires flawless timing. Ensure your catering team provides experienced uniform staff who handle buffet replenishment, table service, and clearing with warm hospitality."
        }
      ],
      conclusion: "At George Foods & Caters, we specialize in turn-key wedding catering that combines heritage flavors with Michelin-grade hygiene and elegance. Contact our master team to sample our signature wedding menus today!"
    }
  },
  {
    id: "2",
    slug: "gourmet-corporate-events-buffet",
    title: "Elevating Corporate Events with Gourmet Live Food Counters",
    subtitle: "How culinary presentation enhances networking, brand perception, and guest satisfaction.",
    excerpt: "Transform your annual corporate galas and business summits with customized gourmet spreads that impress high-profile clients.",
    category: "Corporate Events",
    date: "September 24, 2026",
    readTime: "5 min read",
    author: {
      name: "Anish Varghese",
      role: "Head of Corporate Hospitality",
      avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=150&q=80"
    },
    image: "/blog/corporate-buffet-setup.png",
    featured: false,
    tags: ["Corporate", "Buffet", "Networking", "Executive Menu"],
    content: {
      introduction: "In business, first impressions extend beyond keynotes and slide decks. The catering experience reflects your organization's commitment to quality and hospitality.",
      sections: [
        {
          heading: "Speed, Style, and Efficiency",
          text: "Corporate lunches often operate under tight time schedules. A dual-sided luxury buffet combined with speed-bite finger foods keeps queues short while giving delegates ample time to network.",
          quote: "Efficiency in catering keeps energy high throughout day-long conferences."
        },
        {
          heading: "Tailored Fusion Menus for International Guests",
          text: "When hosting delegates from different backgrounds, fusion options like roasted spiced lamb, subtle coconut curry broths, and fresh sourdough breads bridges global palates seamlessly.",
          bulletPoints: [
            "Bite-sized canapés for standing cocktail hours.",
            "Zero-spill lunch box solutions for executive workshop sessions.",
            "Premium hot beverage and artisanal mocktail stations."
          ]
        }
      ],
      conclusion: "George Foods & Caters provides corporate catering solutions designed for flawless execution, punctuality, and immaculate presentation."
    }
  },
  {
    id: "3",
    slug: "secret-traditional-spices-fusion",
    title: "The Art of Traditional Spices & Modern Culinary Fusion",
    subtitle: "Behind the curtain of George Foods' signature slow-roasted masala recipes.",
    excerpt: "Explore how our executive chefs blend whole roast cardamom, star anise, and fresh roasted peppers with contemporary cooking techniques.",
    category: "Culinary Secrets",
    date: "September 15, 2026",
    readTime: "4 min read",
    author: {
      name: "Chef George Joseph",
      role: "Executive Culinary Director",
      avatar: "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=150&q=80"
    },
    image: "/blog/spice-secrets-traditional.png",
    featured: false,
    tags: ["Spice Craft", "Culinary Secrets", "Signature Dishes", "Food Science"],
    content: {
      introduction: "The rich culinary heritage of Kerala is world-renowned for its masterly use of aromatic spices. But what elevates a standard curry into a signature dish served at grand celebrations?",
      sections: [
        {
          heading: "Fresh Small-Batch Roasting",
          text: "Unlike commercial spice powders that lose volatile aromatic oils on store shelves, our kitchen hand-selects whole spices directly from high-range plantations and roasts them daily on heavy brass urulis.",
          quote: "True flavor comes from fresh oil release during small-batch pan roasting."
        },
        {
          heading: "Precision Temperature Control",
          text: "Simmering meats and gravies at controlled low temperatures allows natural collagen and rich bone broths to absorb the spice notes gradually without burning gentle herbs like coriander leaves."
        }
      ],
      conclusion: "Experience the difference of authentic, small-batch gourmet cooking when you order from any of our takeaway hubs or book us for your next feast."
    }
  },
  {
    id: "4",
    slug: "home-party-platters-catering-guide",
    title: "How to Choose the Right Catering Menu for Home Parties",
    subtitle: "Stress-free entertaining for birthdays, anniversaries, and housewarming events.",
    excerpt: "Host your family and friends with ease by selecting crowd-pleasing party platters and portion-controlled takeaway hub meals.",
    category: "Party Planning",
    date: "August 28, 2026",
    readTime: "4 min read",
    author: {
      name: "Sophia Thomas",
      role: "Event & Menu Advisor",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80"
    },
    image: "/blog/party-platters-tips.png",
    featured: false,
    tags: ["Home Parties", "Platters", "Takeaway Hubs", "Family Gatherings"],
    content: {
      introduction: "Hosting an intimate house party or family gathering should be joyful, not exhausting. Spending hours in the kitchen away from your guests takes the fun out of celebrating.",
      sections: [
        {
          heading: "Calculate Portions Without Waste",
          text: "For intimate groups of 15 to 50 guests, ordering curated party platters from our local takeaway hubs in Adat, Parappur, or Peramangalam delivers chef-crafted freshness without the hassle.",
          quote: "Pre-portioned party platters ensure every guest enjoys hot, delicious variety with zero cleanup stress."
        },
        {
          heading: "Key Elements of a Crowd-Pleasing Menu",
          text: "Combine 2 crunchy appetizers, 1 rich main roast, 1 delicate aromatic rice or bread selection, and a refreshing dessert to keep your table balanced.",
          bulletPoints: [
            "Crispy fried or grilled starter platters.",
            "Signature Biryani or Malabar Parotta with Roast.",
            "Creamy Payasam or Tender Coconut Soufflé for dessert."
          ]
        }
      ],
      conclusion: "Call your nearest George Foods Takeaway Hut to pre-order hot party trays tailored to your guest headcount!"
    }
  }
];

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((post) => post.slug === slug);
}

export function getRelatedBlogPosts(currentSlug: string, count: number = 3): BlogPost[] {
  return BLOG_POSTS.filter((post) => post.slug !== currentSlug).slice(0, count);
}
