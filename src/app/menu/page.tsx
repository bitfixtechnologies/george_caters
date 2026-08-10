"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

// Category Data definitions mapped from George Foods Caterers (Adat, Thrissur) PDF Menu
const categoryMeta = {
  allDishes: {
    title: "Master Culinary Catalog",
    subtitle: "139+ Authentic Dishes & Live Counter Offerings",
    description: "Browse our complete master inventory of 139+ dishes extracted directly from our catering menu PDF, organized by appetizers, breads, curries, rice, salads, live counters, and desserts.",
    image: "/menu/kerala_feast_spread.png",
    imageAlt: "Complete Master Catering Menu Spread featuring Kerala Dishes and Buffets",
    badge: "139 Items Total"
  },
  breakfast: {
    title: "Breakfast Catering Packages",
    subtitle: "7 Traditional Kerala Morning Set Menus",
    description: "Authentic South Indian & Kerala breakfast setups featuring soft lacy Palappams, steam-fresh Idli, crispy Vadas, aromatic Mutton/Chicken Khorma, and steaming filter coffee.",
    image: "/menu/breakfast_catering.png",
    imageAlt: "Elevated Breakfast Spread featuring Palappam, Fish Molly, Idli, Vada, and Filter Coffee",
    badge: "7 Curated Packages"
  },
  vegFeast: {
    title: "Veg Banquet & Feast",
    titleTag: "100% Pure Vegetarian",
    subtitle: "Comprehensive Royal Vegetarian Spread",
    description: "An exquisite grand vegetarian banquet with fresh juices, hot appetizers, artisanal rotis, Paneer Butter Masala, Navaratna Kuruma, fried rice, salads, and rich traditional desserts.",
    image: "/menu/kerala_feast_spread.png",
    imageAlt: "Authentic Kerala Veg Feast on Banana Leaf with Rice, Curries and Pappadam",
    badge: "Grand Banquet"
  },
  nonVegLunch: {
    title: "Non-Veg Lunch Packages",
    subtitle: "Authentic Kerala Non-Veg Feasts (01, 02, 03)",
    description: "Traditional Kerala lunch banquets with choice of Kerala Rice, Fish Vattichathu, Fish Curry, Chicken 65, Pork Varattiyathu, Beef Coconut Roast, Avial, Chammanthi, Sambar, and desserts.",
    image: "/menu/kerala_feast_spread.png",
    imageAlt: "Kerala Non-Veg Feast with Fish Vattichathu, Chicken 65 and Beef Roast",
    badge: "Popular Feast"
  },
  specialLunch: {
    title: "Grand Special Lunch",
    subtitle: "Premium Multi-Course Event Platters (01, 02, 03)",
    description: "Our signature luxury lunch spread featuring live Mojito bars, Duck Khorma, Mutton Mappas, Chicken Kondattom, Dum/Butter Rice, Butter Chicken, and premium desserts.",
    image: "/menu/dinner_banquet.png",
    imageAlt: "Grand Special Lunch Feast with Multi-Course Curries and Rice Options",
    badge: "Signature Event Special"
  },
  dinnerBanquet: {
    title: "Dinner Banquet Packages",
    subtitle: "Opulent Dinner Packages (01, 02)",
    description: "Savor our luxurious evening banquets featuring Prawns Shashlik, Beef Steak, Cheese Balls, Samosa, Hakka Noodles, Chicken Chettinadu, Mutton Cashew Kuruma, Soups & Jalebi.",
    image: "/menu/dinner_banquet.png",
    imageAlt: "Elevated Gourmet Dinner Food Photography with Skewers, Curries, Naan and Ghee Rice",
    badge: "Grand Dinner"
  },
  highTea: {
    title: "High Tea & Thani Nadan Counters",
    subtitle: "Afternoon & Evening Delights (3:00 PM to 9:00 PM)",
    description: "Live Dosa counter, Kappa & Fish Mulagittathu, Spring Rolls, Nuggets, Parathas, Chettinadu dishes, and live Tea/Coffee & Lemon Tea service.",
    image: "/menu/hightea_delights.png",
    imageAlt: "Kerala High Tea with Crisp Dosa, Kappa Fish Curry, Spring Rolls, and Fresh Mint Lemon Juice",
    badge: "Live Counters Included"
  }
};

type CategoryKey = keyof typeof categoryMeta;

// 1. MASTER DISHES CATALOG DATA (139 Dishes grouped by course)
const masterCatalog = [
  {
    category: "🥤 Welcome Drinks & Refreshments",
    isVeg: true,
    dishes: [
      { name: "Fresh Watermelon Juice", desc: "100% natural cold-pressed watermelon" },
      { name: "Fresh Pineapple Juice", desc: "Fresh sweet pineapple extraction" },
      { name: "Mint Lemonade", desc: "Zesty lemon with crushed garden mint" },
      { name: "Fresh Mossambi Juice", desc: "Sweet lime juice served chilled" },
      { name: "Fresh Grape Juice", desc: "Rich dark grape juice" },
      { name: "Fresh Guava Juice", desc: "Pink guava nectar" },
      { name: "Fresh Carrot Juice", desc: "Healthy fresh carrot extraction" },
      { name: "Tender Coconut Punch", desc: "Cooling tender coconut water & pulp" },
      { name: "Live Mojito Bar (Mint, Blueberry, Blue Curacao)", desc: "Handcrafted mocktails mixed live" },
      { name: "Badam Milkshake", desc: "Rich almond milk with saffron & cardamom" },
      { name: "Strawberry Milkshake", desc: "Creamy fresh strawberry shake" },
      { name: "Fresh Fruit Smoothy", desc: "Blended seasonal fruit smoothie" },
      { name: "Hot South Indian Filter Coffee (Live)", desc: "Piping hot traditional brass dabba coffee" },
      { name: "Hot Cardamom Tea & Lemon Tea (Live)", desc: "Freshly brewed live tea service" }
    ]
  },
  {
    category: "🥟 Starters & Appetizers",
    isVeg: false,
    dishes: [
      { name: "Chicken Lollipop with Hot Garlic Sauce", desc: "Crispy fried winglets tossed in garlic glaze" },
      { name: "Prawns Shashlik", desc: "Marinated prawns grilled on bamboo skewers" },
      { name: "Paneer Shashlik", desc: "Spiced paneer cubes with bell peppers" },
      { name: "Beef Steak Bites", desc: "Pan-seared tender beef strips with herbs" },
      { name: "Ceum Fried Chicken", desc: "Crispy Kerala style seasoned fried chicken" },
      { name: "Beef Spring Roll", desc: "Crisp pastry filled with spiced minced beef" },
      { name: "Veg Spring Roll", desc: "Crisp pastry filled with seasoned vegetables" },
      { name: "Veg Nuggets", desc: "Golden fried vegetable bites" },
      { name: "Veg Popcorn with Hot Garlic Sauce", desc: "Bite-sized crunchy veg popcorn" },
      { name: "Baby Corn Crum Fried with Tartar Sauce", desc: "Golden breaded baby corn" },
      { name: "Cheese Balls", desc: "Melted cheese croquettes" },
      { name: "Samoosa", desc: "Crispy fried vegetable samosas" },
      { name: "Crab Claw", desc: "Breaded seasoned crab claw appetizers" },
      { name: "French Fries with Thousand Island Sauce", desc: "Crispy golden potato fries" },
      { name: "Crispy Gobi 65", desc: "Spiced crunchy cauliflower bites" },
      { name: "Chilli Mushroom Dry", desc: "Wok-tossed mushrooms in chilly sauce" },
      { name: "Gobi Manchurian Dry", desc: "Indo-Chinese style coated cauliflower" },
      { name: "Veg Cutlet", desc: "Traditional Kerala spiced potato & veg patty" }
    ]
  },
  {
    category: "🥣 Soups",
    isVeg: false,
    dishes: [
      { name: "Cream of Chicken Soup", desc: "Rich velvet chicken cream soup" },
      { name: "Hot & Sour Chicken Soup", desc: "Spicy & tangy Indo-Chinese chicken soup" },
      { name: "Cream of Tomato Soup", desc: "Roasted tomato cream soup with croutons" },
      { name: "Hot & Sour Mushroom Soup", desc: "Zesty mushroom soup with chili & vinegar" },
      { name: "Sweet Corn Chicken Soup", desc: "Classic sweet corn broth with tender chicken" },
      { name: "Garden Veg Clear Soup", desc: "Light vegetable herb broth" },
      { name: "Chicken Clear Soup", desc: "Delicate chicken essence broth" }
    ]
  },
  {
    category: "🫓 Breads & Kerala Staples",
    isVeg: true,
    dishes: [
      { name: "Soft Lacy Palappam", desc: "Traditional fermented rice & coconut hopper" },
      { name: "Wheat Paratha", desc: "Flaky layered whole wheat paratha" },
      { name: "Thandoori Rotti", desc: "Clay-oven baked whole wheat flatbread" },
      { name: "Garlic Bread", desc: "Toasted artisan bread with garlic butter" },
      { name: "Rumali Rotti", desc: "Ultra-thin soft handkerchief bread" },
      { name: "Layered Chappathi", desc: "Soft multi-layered tawa chappathi" },
      { name: "Mini Paratha", desc: "Bite-sized flaky Malabar parathas" },
      { name: "Nice Pathiri", desc: "Thin steamed rice flour crepes" },
      { name: "Idiyappam", desc: "Steamed string hoppers" },
      { name: "Kameera Bread", desc: "Soft traditional fermented flatbread" },
      { name: "Coconut Pathiri", desc: "Rice flatbread infused with fresh coconut" }
    ]
  },
  {
    category: "🍛 Curries & Main Dishes",
    isVeg: false,
    dishes: [
      { name: "Paneer Butter Masala", desc: "Rich cottage cheese in creamy tomato butter gravy" },
      { name: "Navaratna Kuruma", desc: "Nine-gem vegetable curry in cashew sauce" },
      { name: "Paneer Tikka Masala", desc: "Char-grilled paneer in spiced gravy" },
      { name: "Schezwan Mushroom", desc: "Mushrooms wok-tossed in Schezwan sauce" },
      { name: "Traditional Kerala Fish Curry", desc: "Kodampuli infused red fish curry" },
      { name: "Kerala Fish Vattichathu", desc: "Reduced thick spicy clay-pot fish curry" },
      { name: "Fish Pal Curry", desc: "Fish stewed in coconut milk gravy" },
      { name: "Kerala Fish Molly", desc: "Mild coconut cream fish stew with spices" },
      { name: "Fish Mulagittathu", desc: "Fiery red chili fish curry" },
      { name: "Chicken 65", desc: "Deep-fried marinated chicken chunks" },
      { name: "Chicken Kondattom", desc: "Sun-dried chili coated Kerala chicken fry" },
      { name: "Butter Chicken", desc: "Tandoori chicken in velvet tomato butter sauce" },
      { name: "Kadai Chicken", desc: "Chicken cooked with bell peppers & crushed spices" },
      { name: "Chicken Chettinadu", desc: "Spicy roasted Chettinad pepper chicken" },
      { name: "Foods Special Chicken Roast", desc: "Chef's signature caramelized onion chicken roast" },
      { name: "Chicken Pepper Roast", desc: "Black pepper crushed Kerala chicken roast" },
      { name: "Duck Khorma", desc: "Slow-cooked duck in rich cashew kurma" },
      { name: "Duck Varutharachathu", desc: "Duck cooked in roasted coconut masala" },
      { name: "Duck Shai Kuruma", desc: "Royal mild spiced duck kurma" },
      { name: "Mutton Khorma", desc: "Tender mutton cooked in creamy gravy" },
      { name: "Mutton Mappas", desc: "Mutton stewed in coconut milk & spices" },
      { name: "Mutton Cashew Kuruma", desc: "Rich cashew nut mutton curry" },
      { name: "Mutton Varutharachathu", desc: "Mutton in dark roasted coconut gravy" },
      { name: "Pork Varattiyathu", desc: "Traditional Kerala roasted pork dish" },
      { name: "Chilly Pork Fry", desc: "Spiced pork wok-fried with chili & onions" },
      { name: "Pork Pepperoni", desc: "Dry roasted pork pepperoni bites" },
      { name: "Honey Glazed Pork", desc: "Sweet & sticky glazed pork roast" },
      { name: "Korean Pork / Dragon Pork", desc: "Spicy Korean style glazed pork" },
      { name: "Beef Coconut Roast", desc: "Beef slow-roasted with fried coconut slivers" },
      { name: "Beef Varutharachathu", desc: "Beef in roasted coconut spice reduction" },
      { name: "Beef Ularthiyathu", desc: "Classic Kerala beef fry with curry leaves" },
      { name: "Beef Chukka / Beef Kondattom", desc: "Dry spiced beef chukka roast" },
      { name: "Beef Peralan", desc: "Semi-gravy thick beef roast" },
      { name: "Beef Coconut Fry", desc: "Beef fry packed with crispy coconut slices" },
      { name: "Beef Khorma / Beef Pudding", desc: "Rich beef kurma curry" },
      { name: "Steamed Kappa (Tapioca Masala)", desc: "Boiled mashed tapioca with mustard & chili" },
      { name: "Veg Molly", desc: "Vegetable stew in mild coconut gravy" },
      { name: "Veg Shai Kuruma", desc: "Rich royal vegetable kurma" }
    ]
  },
  {
    category: "🍚 Rice Specialties & Noodles",
    isVeg: true,
    dishes: [
      { name: "Kerala Matta Rice", desc: "Traditional steamed red parboiled rice" },
      { name: "Biriyani Rice", desc: "Aromatic ghee-infused kaima biryani rice" },
      { name: "Chicken Fried Rice", desc: "Indo-Chinese wok fried rice with tender chicken" },
      { name: "Egg Fried Rice", desc: "Wok-tossed rice with scrambled eggs & scallions" },
      { name: "Veg Fried Rice", desc: "Classic vegetable fried rice" },
      { name: "Veg Pulav", desc: "Mild basmati rice cooked with garden vegetables" },
      { name: "Kashmiri Pulav", desc: "Sweet pulav garnished with dry fruits & nuts" },
      { name: "Dum Rice / Dhum Rice", desc: "Slow-cooked dum aromatics rice" },
      { name: "Ghee Rice (Neychoru)", desc: "Basmati rice cooked in pure ghee & spices" },
      { name: "Jeera Rice", desc: "Cumin tempered fragrant basmati rice" },
      { name: "Butter Rice", desc: "Rich butter tossed basmati rice" },
      { name: "Hakka Noodles", desc: "Indo-Chinese wok tossed noodles" },
      { name: "Rava Uppumavu", desc: "Traditional semolina breakfast upma" }
    ]
  },
  {
    category: "🥗 Salad Counter & Authentic Sides",
    isVeg: true,
    dishes: [
      { name: "Garden Green Salad", desc: "Fresh cucumbers, tomatoes, carrots & lettuce" },
      { name: "Veg Mix Salad", desc: "Assorted seasonal garden salad" },
      { name: "Tossed Salad", desc: "Crisp greens tossed with vinaigrette" },
      { name: "Coleslaw Salad", desc: "Creamy shredded cabbage & carrot salad" },
      { name: "Pineapple Mayonnaise Salad", desc: "Sweet pineapple chunks in light dressing" },
      { name: "Creamy Pasta Salad", desc: "Cold pasta tossed in rich herb dressing" },
      { name: "Creamy Macaroni Salad", desc: "Elbow macaroni with mayo & herbs" },
      { name: "Pesto Pasta Salad", desc: "Fusilli pasta tossed in fresh basil pesto" },
      { name: "Spicy Pineapple Salad", desc: "Tangy pineapple with chili lime dust" },
      { name: "Chicken Hawaiian Salad", desc: "Diced chicken & pineapple salad" },
      { name: "Fusili Mayonnaise Salad", desc: "Spiral pasta in creamy mayo dressing" },
      { name: "Chickpea Salad (Black Chana Salad)", desc: "Spiced protein-rich black chickpea salad" },
      { name: "Boondi Raitha", desc: "Crispy boondi in spiced yogurt" },
      { name: "Thai Papaya Salad", desc: "Shredded green papaya with tangy lime juice" },
      { name: "Bean Sprouts Salad", desc: "Fresh crunchy bean sprouts salad" },
      { name: "Raw Mango Salad", desc: "Tangy sliced raw mango salad" },
      { name: "Cheese Cherry Salad", desc: "Cheddar cheese cubes & maraschino cherries" },
      { name: "Pineapple Chat", desc: "Spiced sweet & sour pineapple chaat" },
      { name: "Elbow Pasta with White Pepper", desc: "White pepper seasoned macaroni salad" },
      { name: "Pennai Mayonnaise Salad", desc: "Penne pasta in light mayo dressing" },
      { name: "Authentic Kalan", desc: "Yogurt & raw plantain curry with coconut" },
      { name: "Kerala Avial", desc: "Mixed vegetable curry cooked in coconut oil & cumin" },
      { name: "Mezhukkupurattiyathu", desc: "Traditional Kerala vegetable stir-fry" },
      { name: "Cut Pappadam & Chammanthi", desc: "Fried pappadams & coconut mint chammanthi" },
      { name: "Authentic Sambar & Pickles", desc: "Drumstick sambar & 3 varieties of pickles (Lemon, Date, Gooseberry, Uppilittathu)" }
    ]
  },
  {
    category: "🍡 Live Counters & Thani Nadan",
    isVeg: true,
    dishes: [
      { name: "Live Dosa Station", desc: "Crispy hot Kerala dosas made live on tawa" },
      { name: "Live Kappa & Fish Mulagittathu", desc: "Steamed tapioca & spicy fish curry live station" },
      { name: "Live Mojito & Mocktail Bar", desc: "Custom mixed non-alcoholic cocktails" },
      { name: "Live Tea & Coffee Service", desc: "Continuous live brewing counter" },
      { name: "Sambar, Mint Chutney & Tomato Chutney Station", desc: "Fresh condiments served hot" },
      { name: "Live Fresh Juice Bar", desc: "5 types of live juicing" }
    ]
  },
  {
    category: "🍨 Desserts & Sweet Delights",
    isVeg: true,
    dishes: [
      { name: "Tender Coconut Pudding", desc: "Signature velvety tender coconut pudding" },
      { name: "Vanilla & Butterscotch Ice Cream", desc: "Dual scoop premium ice cream" },
      { name: "Dark Chocolate Ice Cream", desc: "Rich cocoa ice cream" },
      { name: "Strawberry & Pista Ice Cream", desc: "Berry & pistachio ice cream scoops" },
      { name: "Pineapple Pudding", desc: "Chilled pineapple cream pudding" },
      { name: "Fresh Fruit Salad", desc: "Seasonal sliced fresh fruit medley" },
      { name: "Kala Jamun", desc: "Deep fried golden jamuns in dark syrup" },
      { name: "Golden Gulab Jamun", desc: "Soft milk solids in cardamom syrup" },
      { name: "Hot Carrot Halwa", desc: "Grated carrot cooked in ghee & nuts" },
      { name: "Omali Pudding", desc: "Traditional baked pastry & milk pudding" },
      { name: "Royal Kesari", desc: "Saffron semolina sweet garnished with cashews" },
      { name: "Fruit Triffle / Truffle", desc: "Layered sponge cake & custard fruit truffle" },
      { name: "Sweet Bhoondh", desc: "Golden sweet boondi pearls" },
      { name: "Fruits Kheer", desc: "Rich milk & fresh fruit payasam" },
      { name: "Rasagula", desc: "Spongy cottage cheese balls in syrup" },
      { name: "Yellow Jilebi", desc: "Crisp golden jalebi spirals" },
      { name: "Cut Fresh Season Fruits", desc: "Assorted platter of sliced fresh fruits" }
    ]
  }
];

// 2. Breakfast Packages Data (7 Sets)
const breakfastPackages = [
  {
    id: "b1",
    title: "Breakfast Option 01",
    isVeg: true,
    items: [
      { course: "Main Dishes", list: ["Palappam", "Veg. Cashew Khorma", "Butter Banana", "Veg. Cutlet"] },
      { course: "Beverages", list: ["Hot Tea", "Coffee"] }
    ]
  },
  {
    id: "b2",
    title: "Breakfast Option 02",
    isVeg: true,
    badge: "Classic Favourite",
    items: [
      { course: "Main Dishes", list: ["Idly (3 nos)", "Uzhunnu Vada (1 Piece)", "Authentic Sambar", "Coconut Chutney"] },
      { course: "Beverages", list: ["Hot Tea", "Coffee"] }
    ]
  },
  {
    id: "b3",
    title: "Breakfast Option 03",
    isVeg: false,
    badge: "Non-Veg Special",
    items: [
      { course: "Main Dishes", list: ["Palappam", "Rich Mutton Khorma", "Boiled Egg"] },
      { course: "Beverages", list: ["Hot Tea", "Coffee"] }
    ]
  },
  {
    id: "b4",
    title: "Breakfast Option 04",
    isVeg: true,
    items: [
      { course: "Main Dishes", list: ["Idiyappam", "Palappam", "Veg. Molly", "Tapioca Masala (Kappa)"] },
      { course: "Beverages", list: ["Hot Tea", "Coffee"] }
    ]
  },
  {
    id: "b5",
    title: "Breakfast Option 05",
    isVeg: true,
    badge: "Light & Healthy",
    items: [
      { course: "Main Dishes", list: ["Rava Uppumavu", "Sweet Pazham (Banana)"] },
      { course: "Beverages", list: ["Hot Tea", "Coffee"] }
    ]
  },
  {
    id: "b6",
    title: "Breakfast Option 06",
    isVeg: false,
    badge: "Chef Special",
    items: [
      { course: "Main Dishes", list: ["Palappam", "Chicken Khorma OR Beef Khorma", "Crispy Gobi 65"] },
      { course: "Beverages", list: ["Hot Tea", "Coffee"] }
    ]
  },
  {
    id: "b7",
    title: "Breakfast Option 07",
    isVeg: false,
    badge: "Kerala Heritage",
    items: [
      { course: "Main Dishes", list: ["Palappam", "Traditional Fish Molly", "Steamed Banana (Pazham Steamed)"] },
      { course: "Beverages", list: ["Hot Tea", "Coffee"] }
    ]
  }
];

// 3. Veg Banquet Data
const vegBanquetPackage = [
  {
    id: "v1",
    title: "Veg Banquet Grand Spread",
    isVeg: true,
    badge: "Full Feast Package",
    items: [
      { course: "Welcome Drink", list: ["Fresh Juice Selection (Watermelon, Pineapple, Mint Lemon, Mossambi, Grape)"] },
      { course: "Starter Counter", list: ["Veg Spring Roll", "Veg Nuggets", "Veg Popcorn with Hot Garlic Sauce"] },
      { course: "Breads & Main Course", list: ["Palappam", "Wheat Paratha", "Thandoori Rotti", "Garlic Bread", "Paneer Butter Masala", "Navaratna Kuruma", "Gobi 65", "Chilli Mushroom Dry"] },
      { course: "Rice Specialties", list: ["Veg Fried Rice OR Veg. Pulav", "Veg. Biriyani OR Jeera Rice"] },
      { course: "Salad & Sides", list: ["Veg. Mix Salad", "Tossed Salad", "Coleslaw Salad", "Pineapple Mayonoise", "Creamy Pasta Salad", "Creamy Macroni Salad", "Pesto Pasta Salad", "Raitha", "Cut Pappadam", "Pickle (3 Types)"] },
      { course: "Desserts & Refreshment", list: ["Vanilla & Butter Scotch Ice Cream", "Tender Coconut Pudding", "Kala Jamun", "Carrot Halwa", "Mineral Water"] }
    ]
  }
];

// 4. Non-Veg Lunch Packages
const nonVegLunchPackages = [
  {
    id: "nv1",
    title: "Non-Veg Lunch Package 01",
    isVeg: false,
    badge: "Base 25 Pax Minimum",
    items: [
      { course: "Welcome Drink", list: ["Fresh Welcome Refreshment"] },
      { course: "Main Spread", list: ["Kerala Rice", "Fish Curry", "Chicken 65", "Pork Varattiyathu", "Kalan", "Mezhukkupurattiyathu", "Raitha", "Chammanthi", "Pickle", "Authentic Sambar"] },
      { course: "Dessert", list: ["Vanilla Ice Cream", "Tender Coconut Pudding", "Cut Fresh Fruits", "Mineral Water"] }
    ]
  },
  {
    id: "nv2",
    title: "Non-Veg Lunch Package 02",
    isVeg: false,
    badge: "5 Live Drinks Included",
    items: [
      { course: "Welcome Drink", list: ["Fresh Live Drinks (5 Types)"] },
      { course: "Main Spread", list: ["Kerala Rice", "Fish Vattichathu", "Chicken 65", "Chilly Pork OR Beef Coconut Roast", "Pineapple Curry", "Kerala Avial", "Raitha", "Chammanthi", "Pickle", "Authentic Sambar"] },
      { course: "Dessert", list: ["Vanilla Ice Cream", "Pineapple Pudding", "Fruit Salad", "Mineral Water"] }
    ]
  },
  {
    id: "nv3",
    title: "Non-Veg Lunch Package 03",
    isVeg: false,
    badge: "Grand Royal Feast",
    items: [
      { course: "Welcome Drink", list: ["Fresh Live Drinks (5 Types)"] },
      { course: "Rice Varieties", list: ["Kerala Rice", "Biriyani Rice"] },
      { course: "Curries & Meats", list: ["Fish Vattichathu", "Mango Curry", "Chicken Roast", "Pork Pepporoni OR Beef Coconut Roast", "Kalan", "Kerala Avial", "Raitha", "Chammanthi", "Dates Pickle", "Authentic Sambar"] },
      { course: "Dessert", list: ["Vanilla Ice Cream", "Chocolate Pudding", "Golden Gulab Jamun", "Mineral Water"] }
    ]
  }
];

// 5. Grand Special Lunch Packages
const specialLunchPackages = [
  {
    id: "sl1",
    title: "Grand Special Lunch 01",
    isVeg: false,
    items: [
      { course: "Welcome Drink", list: ["Fresh Juice (Watermelon, Pineapple, Mint Lemon, Grape)"] },
      { course: "First Course Breads", list: ["Palappam", "Rumal Rotti", "Mini Paratha", "Duck Khorma OR Beef Khorma"] },
      { course: "Main Course", list: ["Kerala Rice", "Fish Vattichathu", "Mango Pal Curry", "Chicken Kondattom", "Pork Varattiyathu", "Kalan", "Mezhukkupuratti", "Chammanthi", "Raitha", "Sambar", "Pickle"] },
      { course: "Dessert", list: ["Vanilla & Strawberry Ice Cream", "Omali Pudding", "Kesari", "Carrot Halwa", "Mineral Water"] }
    ]
  },
  {
    id: "sl2",
    title: "Grand Special Lunch 02",
    isVeg: false,
    badge: "Mutton Special",
    items: [
      { course: "Welcome Drink", list: ["Fresh Juice (Watermelon, Pineapple, Mint Lemon, Grape)"] },
      { course: "First Course Breads", list: ["Idiyappam", "Nice Pathiri", "Kameera", "Mutton Mappas"] },
      { course: "Main Course", list: ["Kerala Rice", "Fish Pal Curry", "Chicken 65", "Chilly Pork Fry", "Pineapple Curry", "Kerala Avial", "Chammanthi", "Raitha", "Sambar", "Pickle"] },
      { course: "Dessert", list: ["Vanilla & Pista Ice Cream", "Butter Scotch Pudding", "Fruit Triffle", "Gulab Jamun", "Mineral Water"] }
    ]
  },
  {
    id: "sl3",
    title: "Grand Special Lunch 03",
    isVeg: false,
    badge: "Ultimate Deluxe Banquet",
    items: [
      { course: "Welcome Drink & Refreshments", list: ["Live Mojito (3 types)", "Fresh Juice (Pineapple, Mossambi)", "Tender Coconut Punch"] },
      { course: "Starters", list: ["Chicken Lollipop", "Beef Spring Roll", "Veg Popcorn", "French Fries with Hot Garlic Sauce"] },
      { course: "First Course Breads", list: ["Palappam", "Kameera", "Coconut Pathiri", "Duck Varutharachathu OR Beef Varutharachathu"] },
      { course: "Main Course & Rice", list: ["Kerala Rice", "Fish Vattichathu", "Mango Pal Curry", "Dum Rice / Butter Rice / Chicken Fried Rice", "Butter Chicken / Chicken Pepper Roast", "Pork Pepperoni / Beef Ularthiyathu"] },
      { course: "Veg Counter & Salads", list: ["Sambar, Kalan, Mezhukkupuratty, Cut Pappadam, Chammanthi, Pickle", "Garden Green Salad, Spicy Pineapple Salad, Chicken Hawaiian Salad, Tossed Salad, Fusily Mayanoise, Pesto Pasta Salad, Chick Pease Salad, Raitha"] },
      { course: "Dessert", list: ["Vanilla & Butter Scotch Ice Cream", "Tender Coconut Pudding", "Fruit Salad", "Sweet Bhoondh", "Mineral Water"] }
    ]
  }
];

// 6. Dinner Banquet Packages
const dinnerPackages = [
  {
    id: "d1",
    title: "Dinner Package 01",
    isVeg: false,
    badge: "Seafood & Grill Special",
    items: [
      { course: "Welcome Drink", list: ["Tender Coconut Punch", "Fresh Mosambi", "Fresh Guava", "Fresh Smoothy"] },
      { course: "Starters", list: ["Beef Steak", "Ceum Fried Chicken", "Prawns Shashlik", "Paneer Shashlik", "Baby Corn Crum Fried with Tartar Sauce"] },
      { course: "Soups", list: ["Cream of Chicken / Hot & Sour Chicken", "Cream of Tomato / Hot & Sour Mushroom"] },
      { course: "First Course Breads", list: ["Rumali", "Layered Chappathi", "Palappam", "Duck Kuruma / Beef Pudding / Fish Molly", "Veg. Shai Kuruma / Veg. Molly"] },
      { course: "Main Course", list: ["Chicken Fried Rice / Butter Rice", "Jeera Rice / Ghee Rice", "Butter Chicken / Kadai Chicken", "Korean Pork / Dragon Pork", "Beef Chukka / Beef Kondattom", "Paneer Tikka Masala / Schezwan Mushroom"] },
      { course: "Salad Counter", list: ["Veg. Salad, Thai Pappai Salad, Beans Sprout, Chicken Hawaiian Salad, Raw Mango Salad, Fusily Mayanoise, Pesto Pasta Salad, Chick Pease Salad, Boondi Raitha, Pickles"] },
      { course: "Dessert", list: ["Vanilla & Chocolate Ice Cream", "Butter Scotch Pudding", "Fruit Truffle", "Mineral Water"] }
    ]
  },
  {
    id: "d2",
    title: "Dinner Package 02",
    isVeg: false,
    badge: "Royal Gala Dinner",
    items: [
      { course: "Welcome Drink & Shakes", list: ["Mojito (Mint, Blueberry, Blue Curacao)", "Badam Milkshake", "Strawberry Milkshake", "Fresh Carrot / Pineapple Juice"] },
      { course: "Starters", list: ["Chicken Lollipop", "Cheese Balls", "Samoosa", "Crab Claw", "French Fries with Thousand Island Sauce"] },
      { course: "Soups", list: ["Sweet Corn Chicken", "Veg Soup", "Chicken Clear Soup"] },
      { course: "First Course Breads", list: ["Idiyappam / Palappam / Pathiri", "Garlic Bread", "Mini Paratha / Rumal Rotti", "Mutton Cashew Kuruma / Mutton Varutharachathu", "Paneer Butter Masala / Navarathna Kuruma"] },
      { course: "Main Course", list: ["Veg Pulav / Kashmiri Pulav / Dhum Rice / Hakka Noodles", "Foods Special Chicken Roast", "Beef Peralan", "Chicken Chettinadu", "Pork Pepperoni / Honey Glazed Pork", "Beef Coconut Fry", "Garlic Gobi", "Baby Corn Manchurian"] },
      { course: "Salads & Pickles", list: ["Green Salad, Cheese Cherry Salad, Pineapple Chat, Coleslaw, Elbow White Pepper, Pennai Mayanoise, Black Channa Salad, Raitha, Cut Pappad, Frymes Pickles"] },
      { course: "Dessert Bar", list: ["Ice Cream", "Fruits Kheer", "Rasagula", "Yellow Jilebi", "Mineral Water"] }
    ]
  }
];

// 7. High Tea Packages
const highTeaPackages = [
  {
    id: "ht1",
    title: "High Tea Option 01",
    isVeg: false,
    badge: "3:00 PM to 9:00 PM Service",
    items: [
      { course: "Welcome Drink", list: ["Fresh Juice Selection (5 types)"] },
      { course: "Main Snacks & Dishes", list: ["Palappam", "Rumal Rotti", "Mini Paratha", "Veg Kuruma", "Paneer Butter Masala", "Veg. Pulav", "Biriyani Rice", "Chicken Roast", "Pork Pepperoni"] },
      { course: "Salad Counter & Tea", list: ["Tossed Veg Salad, Raw Mango Salad, Garden Green Salad, Pasta Salad, Macaroni Salad, Raitha, Pickles, Live Tea / Coffee"] },
      { course: "Dessert", list: ["Vanilla Ice Cream", "Tender Coconut Pudding", "Cut Fruits", "Gulab Jamun", "Mineral Water"] }
    ]
  },
  {
    id: "ht2",
    title: "High Tea Option 02 (with Thani Nadan Counter)",
    isVeg: false,
    badge: "Live Dosa & Kappa Counter",
    items: [
      { course: "Welcome Drink", list: ["Fresh Juice Selection (5 types)"] },
      { course: "Main Course Breads & Rice", list: ["Rumal Rotti / Kameera", "Palappam", "Duck Kuruma / Beef Kuruma OR Veg. Shahi Kuruma", "Paneer Butter Masala", "Kashmiri Pulav", "Ghee Rice", "Chicken Chettinadu", "Honey Glazed Pork"] },
      { course: "Thani Nadan Live Counter", list: ["Live Dosa Station", "Steamed Kappa with Spicy Fish Mulagittathu", "Sambar, Mint Chutney & Tomato Chutney", "Live Tea, Coffee & Lemon Tea"] },
      { course: "Salad & Desserts", list: ["Green Salad, Coleslaw, Cheese Cherry Salad, Chenna Salad, Vanilla & Pista Ice Cream, Butterscotch Pudding, Carrot Halwa, Mineral Water"] }
    ]
  },
  {
    id: "ht3",
    title: "High Tea Option 03",
    isVeg: false,
    badge: "Finger Foods & Live Bar",
    items: [
      { course: "Welcome Drink", list: ["Fresh Juice Selection (5 types)"] },
      { course: "Starters & First Course", list: ["Chicken Spring Roll", "Beef Roll", "Veg. Nuggets with Hot Garlic Sauce", "Rumal Rotti", "Mini Paratha / Pathiri", "Duck Shai Kuruma", "Veg. Shai Kuruma"] },
      { course: "Main Course", list: ["Egg Fried Rice", "Dum Rice", "Chicken Chettinadu", "Chilly Pork / Beef Coconut Fry", "Gobi Manchurian Dry"] },
      { course: "Live Beverages & Desserts", list: ["Salad Counter, Live Tea / Coffee, Vanilla & Strawberry Ice Cream, Fruits Kheer, Omali Pudding, Mineral Water"] }
    ]
  }
];

export default function MenuPage() {
  const [activeTab, setActiveTab] = useState<CategoryKey>("allDishes");
  const [searchQuery, setSearchQuery] = useState("");
  const [dietaryFilter, setDietaryFilter] = useState<"all" | "veg" | "non-veg">("all");

  // Get active packages dataset or master catalog
  const activePackages = useMemo(() => {
    if (activeTab === "allDishes") {
      return [];
    }

    let dataset: any[] = [];
    switch (activeTab) {
      case "breakfast":
        dataset = breakfastPackages;
        break;
      case "vegFeast":
        dataset = vegBanquetPackage;
        break;
      case "nonVegLunch":
        dataset = nonVegLunchPackages;
        break;
      case "specialLunch":
        dataset = specialLunchPackages;
        break;
      case "dinnerBanquet":
        dataset = dinnerPackages;
        break;
      case "highTea":
        dataset = highTeaPackages;
        break;
      default:
        dataset = [];
    }

    // Apply dietary filter
    if (dietaryFilter === "veg") {
      dataset = dataset.filter((pkg) => pkg.isVeg);
    } else if (dietaryFilter === "non-veg") {
      dataset = dataset.filter((pkg) => !pkg.isVeg);
    }

    // Apply search filter
    if (searchQuery.trim() !== "") {
      const q = searchQuery.toLowerCase();
      dataset = dataset.filter(
        (pkg) =>
          pkg.title.toLowerCase().includes(q) ||
          pkg.items.some((group: { course: string; list: string[] }) =>
            group.list.some((item: string) => item.toLowerCase().includes(q))
          )
      );
    }

    return dataset;
  }, [activeTab, dietaryFilter, searchQuery]);

  // Master Catalog Filtered View
  const filteredMasterCatalog = useMemo(() => {
    if (activeTab !== "allDishes") return [];

    const q = searchQuery.toLowerCase().trim();

    return masterCatalog
      .map((cat) => {
        let filteredDishes = cat.dishes;

        if (dietaryFilter === "veg") {
          filteredDishes = filteredDishes.filter(
            (d) =>
              !d.name.toLowerCase().includes("chicken") &&
              !d.name.toLowerCase().includes("beef") &&
              !d.name.toLowerCase().includes("mutton") &&
              !d.name.toLowerCase().includes("pork") &&
              !d.name.toLowerCase().includes("fish") &&
              !d.name.toLowerCase().includes("prawn") &&
              !d.name.toLowerCase().includes("crab") &&
              !d.name.toLowerCase().includes("duck") &&
              !d.name.toLowerCase().includes("egg")
          );
        } else if (dietaryFilter === "non-veg") {
          filteredDishes = filteredDishes.filter(
            (d) =>
              d.name.toLowerCase().includes("chicken") ||
              d.name.toLowerCase().includes("beef") ||
              d.name.toLowerCase().includes("mutton") ||
              d.name.toLowerCase().includes("pork") ||
              d.name.toLowerCase().includes("fish") ||
              d.name.toLowerCase().includes("prawn") ||
              d.name.toLowerCase().includes("crab") ||
              d.name.toLowerCase().includes("duck") ||
              d.name.toLowerCase().includes("egg")
          );
        }

        if (q !== "") {
          filteredDishes = filteredDishes.filter(
            (d) => d.name.toLowerCase().includes(q) || d.desc.toLowerCase().includes(q)
          );
        }

        return {
          ...cat,
          dishes: filteredDishes
        };
      })
      .filter((cat) => cat.dishes.length > 0);
  }, [activeTab, dietaryFilter, searchQuery]);

  const activeMeta = categoryMeta[activeTab];

  return (
    <>
      <Header />

      {/* Inner Hero Section */}
      <section
        className="section"
        style={{
          paddingTop: "160px",
          paddingBottom: "60px",
          background: "linear-gradient(180deg, var(--color-white) 0%, var(--color-light-bg-alt) 100%)",
          borderBottom: "1px solid var(--color-border)"
        }}
      >
        <div className="container">
          <div className="text-center" style={{ maxWidth: "850px", margin: "0 auto" }}>
            <span
              className="section-tag"
              style={{
                marginBottom: "1rem",
                display: "inline-block",
                padding: "0.4rem 1.2rem",
                background: "rgba(255, 215, 0, 0.2)",
                color: "var(--color-purple-dark)",
                borderRadius: "50px",
                fontWeight: "700",
                fontSize: "0.85rem",
                letterSpacing: "0.08em"
              }}
            >
              GEORGE FOODS CATERERS • ADAT, THRISSUR
            </span>
            <h1 className="hero-title" style={{ fontSize: "3.2rem", marginBottom: "1.25rem", color: "var(--color-purple-dark)" }}>
              Complete Culinary Menu <span>& Event Packages</span>
            </h1>
            <p className="hero-description" style={{ fontSize: "1.15rem", color: "var(--color-text-muted)", lineHeight: "1.7" }}>
              Explore our full digitised master catalog of <strong>139+ authentic dishes</strong> and <strong>18 event catering packages</strong> for weddings, receptions, corporate galas, and venue buffets.
            </p>

            {/* Quick Stats Bar */}
            <div
              style={{
                marginTop: "1.75rem",
                display: "inline-flex",
                gap: "1.5rem",
                background: "var(--color-white)",
                padding: "0.75rem 1.5rem",
                borderRadius: "50px",
                border: "1px solid var(--color-border)",
                boxShadow: "0 4px 15px rgba(36, 14, 76, 0.05)",
                flexWrap: "wrap",
                justifyContent: "center"
              }}
            >
              <span style={{ fontSize: "0.9rem", fontWeight: "700", color: "var(--color-purple-dark)" }}>
                ✨ 139+ Dishes Digitized
              </span>
              <span style={{ color: "var(--color-border)" }}>|</span>
              <span style={{ fontSize: "0.9rem", fontWeight: "700", color: "var(--color-purple-dark)" }}>
                🍱 18 Set Packages
              </span>
              <span style={{ color: "var(--color-border)" }}>|</span>
              <span style={{ fontSize: "0.9rem", fontWeight: "700", color: "var(--color-purple-dark)" }}>
                👨‍🍳 6 Live Counters
              </span>
            </div>

            <div style={{ marginTop: "2rem", display: "flex", justifyContent: "center", gap: "1rem", flexWrap: "wrap" }}>
              <a
                href="/contact"
                className="btn btn-primary"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  padding: "0.8rem 1.6rem",
                  borderRadius: "50px",
                  fontWeight: "600"
                }}
              >
                Inquire & Book Event
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Main Menu Navigation Tabs */}
      <section className="section" style={{ paddingTop: "50px", paddingBottom: "90px" }}>
        <div className="container">
          {/* Category Tabs */}
          <div className="menu-nav-tabs">
            <button
              className={`menu-nav-btn ${activeTab === "allDishes" ? "active" : ""}`}
              onClick={() => setActiveTab("allDishes")}
            >
              📋 Master Catalog (139 Dishes)
            </button>
            <button
              className={`menu-nav-btn ${activeTab === "breakfast" ? "active" : ""}`}
              onClick={() => setActiveTab("breakfast")}
            >
              🌅 Breakfast (7 Sets)
            </button>
            <button
              className={`menu-nav-btn ${activeTab === "vegFeast" ? "active" : ""}`}
              onClick={() => setActiveTab("vegFeast")}
            >
              🥗 Veg Banquet
            </button>
            <button
              className={`menu-nav-btn ${activeTab === "nonVegLunch" ? "active" : ""}`}
              onClick={() => setActiveTab("nonVegLunch")}
            >
              🍗 Non-Veg Lunch
            </button>
            <button
              className={`menu-nav-btn ${activeTab === "specialLunch" ? "active" : ""}`}
              onClick={() => setActiveTab("specialLunch")}
            >
              ⭐ Grand Special Lunch
            </button>
            <button
              className={`menu-nav-btn ${activeTab === "dinnerBanquet" ? "active" : ""}`}
              onClick={() => setActiveTab("dinnerBanquet")}
            >
              🍷 Dinner Banquet
            </button>
            <button
              className={`menu-nav-btn ${activeTab === "highTea" ? "active" : ""}`}
              onClick={() => setActiveTab("highTea")}
            >
              ☕ High Tea & Live Counters
            </button>
          </div>

          {/* Active Category Showcase Banner */}
          <div
            style={{
              background: "var(--color-white)",
              borderRadius: "24px",
              border: "1px solid var(--color-border)",
              padding: "2.5rem",
              marginBottom: "3.5rem",
              boxShadow: "0 15px 35px rgba(36, 14, 76, 0.06)",
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
              gap: "2.5rem",
              alignItems: "center"
            }}
          >
            <div>
              <span
                style={{
                  background: "rgba(255, 215, 0, 0.25)",
                  color: "var(--color-purple-dark)",
                  padding: "0.3rem 0.9rem",
                  borderRadius: "50px",
                  fontSize: "0.8rem",
                  fontWeight: "700",
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                  marginBottom: "1rem",
                  display: "inline-block"
                }}
              >
                {activeMeta.badge}
              </span>
              <h2 style={{ fontSize: "2.2rem", color: "var(--color-purple-dark)", marginBottom: "0.5rem", fontFamily: "var(--font-serif)" }}>
                {activeMeta.title}
              </h2>
              <h4 style={{ fontSize: "1.1rem", color: "var(--color-gold)", fontWeight: "600", marginBottom: "1rem" }}>
                {activeMeta.subtitle}
              </h4>
              <p style={{ color: "var(--color-text-muted)", fontSize: "1rem", lineHeight: "1.7", marginBottom: "1.5rem" }}>
                {activeMeta.description}
              </p>

              {/* Search & Dietary Controls */}
              <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", alignItems: "center" }}>
                <div style={{ flex: "1 1 220px", position: "relative" }}>
                  <input
                    type="text"
                    placeholder="Search dish, starter, or curry..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    style={{
                      width: "100%",
                      padding: "0.75rem 1rem 0.75rem 2.5rem",
                      borderRadius: "50px",
                      border: "1px solid var(--color-border)",
                      outline: "none",
                      fontSize: "0.9rem"
                    }}
                  />
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    style={{ position: "absolute", left: "1rem", top: "50%", transform: "translateY(-50%)", opacity: 0.5 }}
                  >
                    <circle cx="11" cy="11" r="8" />
                    <line x1="21" y1="21" x2="16.65" y2="16.65" />
                  </svg>
                </div>

                <div style={{ display: "flex", gap: "0.3rem", background: "var(--color-light-bg-alt)", padding: "0.25rem", borderRadius: "50px", border: "1px solid var(--color-border)" }}>
                  <button
                    onClick={() => setDietaryFilter("all")}
                    style={{
                      padding: "0.4rem 0.9rem",
                      borderRadius: "50px",
                      border: "none",
                      background: dietaryFilter === "all" ? "var(--color-purple-dark)" : "transparent",
                      color: dietaryFilter === "all" ? "var(--color-gold)" : "var(--color-purple-dark)",
                      fontSize: "0.8rem",
                      fontWeight: "600",
                      cursor: "pointer"
                    }}
                  >
                    All
                  </button>
                  <button
                    onClick={() => setDietaryFilter("veg")}
                    style={{
                      padding: "0.4rem 0.9rem",
                      borderRadius: "50px",
                      border: "none",
                      background: dietaryFilter === "veg" ? "#2e7d32" : "transparent",
                      color: dietaryFilter === "veg" ? "#ffffff" : "var(--color-purple-dark)",
                      fontSize: "0.8rem",
                      fontWeight: "600",
                      cursor: "pointer"
                    }}
                  >
                    🥬 Veg
                  </button>
                  <button
                    onClick={() => setDietaryFilter("non-veg")}
                    style={{
                      padding: "0.4rem 0.9rem",
                      borderRadius: "50px",
                      border: "none",
                      background: dietaryFilter === "non-veg" ? "#c62828" : "transparent",
                      color: dietaryFilter === "non-veg" ? "#ffffff" : "var(--color-purple-dark)",
                      fontSize: "0.8rem",
                      fontWeight: "600",
                      cursor: "pointer"
                    }}
                  >
                    🍗 Non-Veg
                  </button>
                </div>
              </div>
            </div>

            {/* Elevated Food Image Photography */}
            <div className="food-image-showcase">
              <Image
                src={activeMeta.image}
                alt={activeMeta.imageAlt}
                width={700}
                height={460}
                style={{ width: "100%", height: "300px", objectFit: "cover" }}
                priority
              />
              <div
                style={{
                  position: "absolute",
                  bottom: "0",
                  left: "0",
                  right: "0",
                  background: "linear-gradient(0deg, rgba(36,14,76,0.85) 0%, transparent 100%)",
                  padding: "1rem 1.25rem",
                  color: "#ffffff",
                  fontSize: "0.85rem",
                  fontWeight: "500"
                }}
              >
                📸 Authentic Food Photography • {activeMeta.title}
              </div>
            </div>
          </div>

          {/* VIEW MODE 1: MASTER DISHES CATALOG (139 Dishes) */}
          {activeTab === "allDishes" && (
            <div>
              {filteredMasterCatalog.length === 0 ? (
                <div
                  style={{
                    textAlign: "center",
                    padding: "4rem 2rem",
                    background: "var(--color-white)",
                    borderRadius: "20px",
                    border: "1px dashed var(--color-border)"
                  }}
                >
                  <h3 style={{ fontSize: "1.4rem", color: "var(--color-purple-dark)", marginBottom: "0.5rem" }}>
                    No matching dishes found
                  </h3>
                  <p style={{ color: "var(--color-text-muted)" }}>
                    Try searching for another dish or clear dietary filters.
                  </p>
                </div>
              ) : (
                <div style={{ display: "flex", flexDirection: "column", gap: "3rem" }}>
                  {filteredMasterCatalog.map((group, idx) => (
                    <div
                      key={idx}
                      style={{
                        background: "var(--color-white)",
                        borderRadius: "20px",
                        border: "1px solid var(--color-border)",
                        padding: "2.25rem",
                        boxShadow: "0 10px 30px rgba(36, 14, 76, 0.05)"
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          marginBottom: "1.75rem",
                          paddingBottom: "0.85rem",
                          borderBottom: "2px solid var(--color-border)"
                        }}
                      >
                        <h3
                          style={{
                            fontSize: "1.5rem",
                            fontFamily: "var(--font-serif)",
                            color: "var(--color-purple-dark)",
                            fontWeight: "700"
                          }}
                        >
                          {group.category}
                        </h3>
                        <span
                          style={{
                            background: "rgba(255, 215, 0, 0.2)",
                            color: "var(--color-purple-dark)",
                            padding: "0.25rem 0.8rem",
                            borderRadius: "50px",
                            fontSize: "0.85rem",
                            fontWeight: "700"
                          }}
                        >
                          {group.dishes.length} Items
                        </span>
                      </div>

                      <div
                        style={{
                          display: "grid",
                          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                          gap: "1.25rem"
                        }}
                      >
                        {group.dishes.map((dish, dIdx) => (
                          <div
                            key={dIdx}
                            style={{
                              background: "var(--color-light-bg-alt)",
                              borderRadius: "14px",
                              padding: "1rem 1.25rem",
                              border: "1px solid var(--color-border)",
                              transition: "transform 0.2s ease, border-color 0.2s ease"
                            }}
                          >
                            <h4
                              style={{
                                fontSize: "1.05rem",
                                fontWeight: "700",
                                color: "var(--color-purple-dark)",
                                marginBottom: "0.25rem",
                                display: "flex",
                                alignItems: "center",
                                gap: "0.4rem"
                              }}
                            >
                              <span style={{ color: "var(--color-gold)" }}>❖</span>
                              {dish.name}
                            </h4>
                            <p style={{ fontSize: "0.85rem", color: "var(--color-text-muted)", lineHeight: "1.4" }}>
                              {dish.desc}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* VIEW MODE 2: SET PACKAGES GRID */}
          {activeTab !== "allDishes" && (
            <div>
              {activePackages.length === 0 ? (
                <div
                  style={{
                    textAlign: "center",
                    padding: "4rem 2rem",
                    background: "var(--color-white)",
                    borderRadius: "20px",
                    border: "1px dashed var(--color-border)"
                  }}
                >
                  <h3 style={{ fontSize: "1.4rem", color: "var(--color-purple-dark)", marginBottom: "0.5rem" }}>
                    No matching packages found
                  </h3>
                  <p style={{ color: "var(--color-text-muted)" }}>
                    Try adjusting your search query or switching dietary filters.
                  </p>
                </div>
              ) : (
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(360px, 1fr))",
                    gap: "2.25rem"
                  }}
                >
                  {activePackages.map((pkg) => (
                    <div key={pkg.id} className="menu-package-card">
                      {/* Card Header */}
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "flex-start",
                          marginBottom: "1.25rem",
                          paddingBottom: "1rem",
                          borderBottom: "1px solid var(--color-border)"
                        }}
                      >
                        <div>
                          <span
                            style={{
                              display: "inline-block",
                              fontSize: "0.75rem",
                              fontWeight: "700",
                              color: pkg.isVeg ? "#2e7d32" : "#c62828",
                              background: pkg.isVeg ? "rgba(46, 125, 50, 0.1)" : "rgba(198, 40, 40, 0.1)",
                              padding: "0.2rem 0.6rem",
                              borderRadius: "4px",
                              marginBottom: "0.4rem",
                              textTransform: "uppercase"
                            }}
                          >
                            {pkg.isVeg ? "🥬 100% Vegetarian" : "🍗 Non-Veg Feast"}
                          </span>
                          <h3
                            style={{
                              fontSize: "1.4rem",
                              fontWeight: "700",
                              fontFamily: "var(--font-serif)",
                              color: "var(--color-purple-dark)"
                            }}
                          >
                            {pkg.title}
                          </h3>
                        </div>

                        {"badge" in pkg && pkg.badge && (
                          <span
                            style={{
                              background: "rgba(255, 215, 0, 0.2)",
                              color: "var(--color-purple-dark)",
                              padding: "0.25rem 0.7rem",
                              fontSize: "0.7rem",
                              fontWeight: "700",
                              borderRadius: "50px",
                              textTransform: "uppercase",
                              letterSpacing: "0.05em",
                              whiteSpace: "nowrap"
                            }}
                          >
                            {pkg.badge}
                          </span>
                        )}
                      </div>

                      {/* Course Items List */}
                      <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                        {pkg.items.map((group: any, idx: number) => (
                          <div key={idx} className="menu-course-group">
                            <span className="course-badge gold">{group.course}</span>
                            <ul
                              style={{
                                listStyle: "none",
                                padding: 0,
                                margin: 0,
                                display: "grid",
                                gridTemplateColumns: "1fr",
                                gap: "0.35rem"
                              }}
                            >
                              {group.list.map((dish: string, dIdx: number) => (
                                <li
                                  key={dIdx}
                                  style={{
                                    color: "var(--color-purple-dark)",
                                    fontSize: "0.95rem",
                                    fontWeight: "500",
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "0.5rem"
                                  }}
                                >
                                  <span style={{ color: "var(--color-gold)", fontSize: "0.75rem" }}>◆</span>
                                  {dish}
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>

                      {/* Card Action Footer */}
                      <div
                        style={{
                          marginTop: "1.75rem",
                          paddingTop: "1rem",
                          borderTop: "1px dashed var(--color-border)",
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center"
                        }}
                      >
                        <span style={{ fontSize: "0.8rem", color: "var(--color-text-muted)" }}>
                          Customizable per PAX
                        </span>
                        <a
                          href="/contact"
                          style={{
                            color: "var(--color-purple-dark)",
                            fontWeight: "700",
                            fontSize: "0.85rem",
                            textDecoration: "none",
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "0.3rem"
                          }}
                        >
                          Request Quote →
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Custom Event Order Callout Banner */}
      <section
        className="section"
        style={{
          background: "linear-gradient(135deg, var(--color-purple-dark) 0%, #170933 100%)",
          color: "#ffffff",
          padding: "80px 0"
        }}
      >
        <div className="container">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: "3rem",
              alignItems: "center"
            }}
          >
            <div>
              <span
                style={{
                  background: "rgba(255, 215, 0, 0.2)",
                  color: "var(--color-gold)",
                  padding: "0.3rem 1rem",
                  borderRadius: "50px",
                  fontSize: "0.8rem",
                  fontWeight: "700",
                  letterSpacing: "0.08em",
                  display: "inline-block",
                  marginBottom: "1rem"
                }}
              >
                BESPOKE CATERING
              </span>
              <h2 style={{ fontSize: "2.5rem", color: "#ffffff", marginBottom: "1rem", fontFamily: "var(--font-serif)" }}>
                Need a Customized Event Menu?
              </h2>
              <p style={{ fontSize: "1.05rem", color: "rgba(255, 255, 255, 0.8)", lineHeight: "1.7", marginBottom: "1.5rem" }}>
                Whether planning an intimate family gathering or a 2,000+ guest wedding reception in Thrissur, our executive chef creates tailored live counters, fusion courses, and dietary choices.
              </p>

              <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
                <a
                  href="/contact"
                  className="btn btn-secondary"
                  style={{
                    padding: "0.85rem 1.8rem",
                    borderRadius: "50px",
                    fontWeight: "700"
                  }}
                >
                  Contact Catering Manager
                </a>
                <a
                  href="tel:+919876543210"
                  className="btn"
                  style={{
                    padding: "0.85rem 1.8rem",
                    borderRadius: "50px",
                    fontWeight: "600",
                    background: "rgba(255, 255, 255, 0.1)",
                    color: "#ffffff",
                    border: "1px solid rgba(255, 255, 255, 0.2)"
                  }}
                >
                  Call Directly
                </a>
              </div>
            </div>

            <div className="food-image-showcase">
              <Image
                src="/menu/gourmet_desserts.png"
                alt="Kerala Catering Desserts & Live Refreshments"
                width={600}
                height={400}
                style={{ width: "100%", height: "280px", objectFit: "cover" }}
              />
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
