import { Ingredient } from '../types/cake';

// ============================================================
// CAKE INGREDIENTS DATABASE
// Add new ingredients here without touching any other file.
// Fields: name, category, calories, protein, fat, carbs, sugar,
//         fiber, sodium, moisture (%), defaultAmount (g)
// ============================================================

export const ingredientsDatabase: Ingredient[] = [

  // ─────────────────────────────────────────────────────────────
  // FLOURS & STARCHES
  // ─────────────────────────────────────────────────────────────
  { id:'flour-ap',         name:'All-Purpose Flour',      category:'flour',     calories:364, protein:10.3, fat:1.0,  carbs:76.3, sugar:0.3,  fiber:2.7,  sodium:2,     moisture:12, defaultAmount:250 },
  { id:'flour-cake',       name:'Cake Flour',              category:'flour',     calories:355, protein:7.8,  fat:0.8,  carbs:79.4, sugar:0.2,  fiber:1.9,  sodium:2,     moisture:12, defaultAmount:250 },
  { id:'flour-bread',      name:'Bread Flour',             category:'flour',     calories:361, protein:12.9, fat:1.7,  carbs:72.5, sugar:0.3,  fiber:2.4,  sodium:2,     moisture:12, defaultAmount:250 },
  { id:'flour-ww',         name:'Whole Wheat Flour',       category:'flour',     calories:340, protein:13.2, fat:2.5,  carbs:72.0, sugar:0.4,  fiber:10.7, sodium:2,     moisture:11, defaultAmount:200 },
  { id:'flour-almond',     name:'Almond Flour',            category:'flour',     calories:571, protein:21.4, fat:50.0, carbs:21.4, sugar:4.3,  fiber:10.7, sodium:0,     moisture:3,  defaultAmount:150 },
  { id:'flour-oat',        name:'Oat Flour',               category:'flour',     calories:404, protein:14.7, fat:8.9,  carbs:65.7, sugar:1.5,  fiber:10.3, sodium:2,     moisture:9,  defaultAmount:150 },
  { id:'flour-rice',       name:'Rice Flour',              category:'flour',     calories:366, protein:6.0,  fat:1.4,  carbs:80.1, sugar:0.1,  fiber:2.4,  sodium:0,     moisture:12, defaultAmount:200 },
  { id:'flour-coconut',    name:'Coconut Flour',           category:'flour',     calories:400, protein:18.0, fat:14.0, carbs:57.0, sugar:10.0, fiber:39.0, sodium:32,    moisture:8,  defaultAmount:80  },
  { id:'flour-buckwheat',  name:'Buckwheat Flour',         category:'flour',     calories:335, protein:12.6, fat:3.1,  carbs:70.6, sugar:1.3,  fiber:10.0, sodium:11,    moisture:12, defaultAmount:150 },
  { id:'starch-corn',      name:'Cornstarch',              category:'flour',     calories:381, protein:0.3,  fat:0.1,  carbs:91.3, sugar:0.0,  fiber:0.9,  sodium:9,     moisture:8,  defaultAmount:30  },
  { id:'starch-tapioca',   name:'Tapioca Starch',          category:'flour',     calories:358, protein:0.2,  fat:0.0,  carbs:88.7, sugar:0.0,  fiber:0.9,  sodium:1,     moisture:11, defaultAmount:20  },
  { id:'cocoa-natural',    name:'Cocoa Powder (Natural)',  category:'flour',     calories:228, protein:19.6, fat:13.7, carbs:57.9, sugar:1.7,  fiber:37.0, sodium:21,    moisture:3,  defaultAmount:40  },
  { id:'cocoa-dutch',      name:'Dutch Cocoa Powder',      category:'flour',     calories:220, protein:18.5, fat:12.0, carbs:59.0, sugar:1.5,  fiber:35.0, sodium:100,   moisture:3,  defaultAmount:40  },
  { id:'espresso-powder',  name:'Espresso Powder',         category:'flour',     calories:291, protein:14.6, fat:0.5,  carbs:61.9, sugar:0.0,  fiber:0.0,  sodium:50,    moisture:4,  defaultAmount:5   },
  { id:'matcha-powder',    name:'Matcha Powder',           category:'flour',     calories:324, protein:30.0, fat:5.0,  carbs:38.0, sugar:0.0,  fiber:35.0, sodium:3,     moisture:5,  defaultAmount:10  },

  // ─────────────────────────────────────────────────────────────
  // SUGARS & SWEETENERS
  // ─────────────────────────────────────────────────────────────
  { id:'sugar-white',      name:'Granulated Sugar',        category:'sugar',     calories:387, protein:0.0,  fat:0.0,  carbs:99.8, sugar:99.8, fiber:0.0,  sodium:0,     moisture:0.5,defaultAmount:200 },
  { id:'sugar-brown-lt',   name:'Brown Sugar (Light)',     category:'sugar',     calories:377, protein:0.0,  fat:0.0,  carbs:97.3, sugar:96.2, fiber:0.0,  sodium:28,    moisture:2,  defaultAmount:200 },
  { id:'sugar-brown-dk',   name:'Brown Sugar (Dark)',      category:'sugar',     calories:380, protein:0.2,  fat:0.0,  carbs:98.1, sugar:97.0, fiber:0.0,  sodium:37,    moisture:3,  defaultAmount:200 },
  { id:'sugar-powdered',   name:'Powdered Sugar',          category:'sugar',     calories:389, protein:0.0,  fat:0.0,  carbs:99.7, sugar:97.7, fiber:0.0,  sodium:1,     moisture:0.5,defaultAmount:100 },
  { id:'sugar-raw',        name:'Raw Turbinado Sugar',     category:'sugar',     calories:385, protein:0.0,  fat:0.0,  carbs:99.5, sugar:99.5, fiber:0.0,  sodium:0,     moisture:1,  defaultAmount:150 },
  { id:'sugar-coconut',    name:'Coconut Sugar',           category:'sugar',     calories:375, protein:0.4,  fat:0.0,  carbs:95.0, sugar:90.0, fiber:1.0,  sodium:16,    moisture:2,  defaultAmount:150 },
  { id:'honey',            name:'Honey',                   category:'sugar',     calories:304, protein:0.3,  fat:0.0,  carbs:82.4, sugar:82.1, fiber:0.2,  sodium:4,     moisture:17, defaultAmount:80  },
  { id:'maple-syrup',      name:'Maple Syrup',             category:'sugar',     calories:260, protein:0.0,  fat:0.1,  carbs:67.0, sugar:60.5, fiber:0.0,  sodium:9,     moisture:32, defaultAmount:80  },
  { id:'agave',            name:'Agave Nectar',            category:'sugar',     calories:310, protein:0.1,  fat:0.5,  carbs:76.0, sugar:68.0, fiber:0.2,  sodium:4,     moisture:23, defaultAmount:80  },
  { id:'molasses',         name:'Molasses',                category:'sugar',     calories:290, protein:0.0,  fat:0.1,  carbs:74.7, sugar:74.7, fiber:0.0,  sodium:37,    moisture:22, defaultAmount:50  },
  { id:'monk-fruit',       name:'Monk Fruit Sweetener',    category:'sugar',     calories:0,   protein:0.0,  fat:0.0,  carbs:0.0,  sugar:0.0,  fiber:0.0,  sodium:0,     moisture:0,  defaultAmount:50  },

  // ─────────────────────────────────────────────────────────────
  // FATS & OILS
  // ─────────────────────────────────────────────────────────────
  { id:'butter-unsalted',  name:'Unsalted Butter',         category:'fat',       calories:717, protein:0.9,  fat:81.1, saturatedFat:51.4, transFat:3.3, polyunsaturatedFat:3.0, monounsaturatedFat:21.0, cholesterol:215, carbs:0.1,  sugar:0.1,  fiber:0.0,  sodium:11,    moisture:16, defaultAmount:115 },
  { id:'butter-salted',    name:'Salted Butter',           category:'fat',       calories:714, protein:0.9,  fat:80.5, saturatedFat:51.0, transFat:3.3, polyunsaturatedFat:3.0, monounsaturatedFat:20.9, cholesterol:215, carbs:0.1,  sugar:0.1,  fiber:0.0,  sodium:576,   moisture:16, defaultAmount:115 },
  { id:'butter-brown',     name:'Brown Butter',            category:'fat',       calories:740, protein:1.0,  fat:83.0, saturatedFat:52.0, transFat:3.3, polyunsaturatedFat:3.1, monounsaturatedFat:21.5, cholesterol:220, carbs:0.2,  sugar:0.2,  fiber:0.0,  sodium:10,    moisture:10, defaultAmount:115 },
  { id:'oil-vegetable',    name:'Vegetable Oil',           category:'fat',       calories:884, protein:0.0,  fat:100.0,saturatedFat:14.0, transFat:0.0, polyunsaturatedFat:29.0, monounsaturatedFat:57.0, cholesterol:0,  carbs:0.0,  sugar:0.0,  fiber:0.0,  sodium:0,     moisture:0,  defaultAmount:120 },
  { id:'oil-coconut',      name:'Coconut Oil',             category:'fat',       calories:862, protein:0.0,  fat:100.0,saturatedFat:87.0, transFat:0.0, polyunsaturatedFat:1.8, monounsaturatedFat:6.0,  cholesterol:0,  carbs:0.0,  sugar:0.0,  fiber:0.0,  sodium:0,     moisture:0,  defaultAmount:100 },
  { id:'oil-olive',        name:'Olive Oil',               category:'fat',       calories:884, protein:0.0,  fat:100.0,saturatedFat:14.0, transFat:0.0, polyunsaturatedFat:11.0, monounsaturatedFat:73.0, cholesterol:0,  carbs:0.0,  sugar:0.0,  fiber:0.0,  sodium:0,     moisture:0,  defaultAmount:100 },
  { id:'oil-avocado',      name:'Avocado Oil',             category:'fat',       calories:884, protein:0.0,  fat:100.0,saturatedFat:12.0, transFat:0.0, polyunsaturatedFat:13.0, monounsaturatedFat:74.0, cholesterol:0,  carbs:0.0,  sugar:0.0,  fiber:0.0,  sodium:0,     moisture:0,  defaultAmount:100 },
  { id:'cream-cheese',     name:'Cream Cheese',            category:'fat',       calories:342, protein:6.2,  fat:34.2, saturatedFat:19.3, transFat:1.2, polyunsaturatedFat:1.4, monounsaturatedFat:8.8,  cholesterol:110, carbs:2.9,  sugar:2.7,  fiber:0.0,  sodium:291,   moisture:54, defaultAmount:200 },
  { id:'shortening',       name:'Shortening',              category:'fat',       calories:884, protein:0.0,  fat:100.0,saturatedFat:25.0, transFat:0.5, polyunsaturatedFat:26.0, monounsaturatedFat:45.0, cholesterol:0,  carbs:0.0,  sugar:0.0,  fiber:0.0,  sodium:0,     moisture:0,  defaultAmount:100 },
  { id:'butter-vegan',     name:'Vegan Butter',            category:'fat',       calories:700, protein:0.0,  fat:78.0, saturatedFat:28.0, transFat:0.0, polyunsaturatedFat:18.0, monounsaturatedFat:28.0, cholesterol:0,  carbs:1.0,  sugar:0.0,  fiber:0.0,  sodium:400,   moisture:18, defaultAmount:115 },

  // ─────────────────────────────────────────────────────────────
  // LIQUIDS — dairy milks, plant milks, water, sodas, juices,
  //           coffee/tea, spirits
  // ─────────────────────────────────────────────────────────────
  // Dairy milks
  { id:'milk-whole',       name:'Whole Milk',              category:'liquid',    calories:61,  protein:3.2,  fat:3.3,  carbs:4.8,  sugar:5.1,  fiber:0.0,  sodium:43,    moisture:88, defaultAmount:120 },
  { id:'milk-2pct',        name:'2% Milk',                 category:'liquid',    calories:50,  protein:3.4,  fat:2.0,  carbs:4.9,  sugar:5.1,  fiber:0.0,  sodium:44,    moisture:90, defaultAmount:120 },
  { id:'milk-skim',        name:'Skim Milk',               category:'liquid',    calories:34,  protein:3.4,  fat:0.1,  carbs:5.0,  sugar:5.1,  fiber:0.0,  sodium:45,    moisture:91, defaultAmount:120 },
  { id:'milk-buttermilk',  name:'Buttermilk',              category:'liquid',    calories:40,  protein:3.3,  fat:0.9,  carbs:4.8,  sugar:4.8,  fiber:0.0,  sodium:105,   moisture:90, defaultAmount:120 },
  { id:'milk-half-half',   name:'Half and Half',           category:'liquid',    calories:130, protein:3.0,  fat:11.5, carbs:4.3,  sugar:4.3,  fiber:0.0,  sodium:41,    moisture:80, defaultAmount:120 },
  { id:'cream-heavy',      name:'Heavy Cream',             category:'liquid',    calories:345, protein:2.8,  fat:36.1, carbs:2.8,  sugar:3.3,  fiber:0.0,  sodium:38,    moisture:57, defaultAmount:120 },
  { id:'cream-whipping',   name:'Whipping Cream',          category:'liquid',    calories:292, protein:2.2,  fat:30.9, carbs:2.8,  sugar:3.3,  fiber:0.0,  sodium:38,    moisture:63, defaultAmount:120 },
  // Plant milks
  { id:'milk-oat',         name:'Oat Milk',                category:'liquid',    calories:45,  protein:1.0,  fat:1.5,  carbs:7.5,  sugar:4.0,  fiber:0.5,  sodium:50,    moisture:90, defaultAmount:120 },
  { id:'milk-almond',      name:'Almond Milk',             category:'liquid',    calories:17,  protein:0.6,  fat:1.1,  carbs:1.4,  sugar:0.8,  fiber:0.3,  sodium:72,    moisture:96, defaultAmount:120 },
  { id:'milk-soy',         name:'Soy Milk',                category:'liquid',    calories:54,  protein:3.3,  fat:1.8,  carbs:6.3,  sugar:4.0,  fiber:0.4,  sodium:51,    moisture:90, defaultAmount:120 },
  { id:'milk-coconut-can', name:'Coconut Milk (canned)',   category:'liquid',    calories:197, protein:2.0,  fat:21.3, carbs:2.8,  sugar:2.8,  fiber:0.0,  sodium:13,    moisture:73, defaultAmount:120 },
  { id:'milk-coconut-box', name:'Coconut Milk (carton)',   category:'liquid',    calories:45,  protein:0.5,  fat:4.5,  carbs:1.0,  sugar:0.0,  fiber:0.0,  sodium:15,    moisture:92, defaultAmount:120 },
  { id:'milk-cashew',      name:'Cashew Milk',             category:'liquid',    calories:25,  protein:0.5,  fat:2.0,  carbs:1.0,  sugar:0.0,  fiber:0.0,  sodium:120,   moisture:95, defaultAmount:120 },
  { id:'milk-rice',        name:'Rice Milk',               category:'liquid',    calories:47,  protein:0.3,  fat:1.0,  carbs:9.2,  sugar:3.5,  fiber:0.0,  sodium:62,    moisture:90, defaultAmount:120 },
  { id:'milk-macadamia',   name:'Macadamia Milk',          category:'liquid',    calories:50,  protein:0.5,  fat:5.0,  carbs:1.0,  sugar:0.0,  fiber:0.0,  sodium:90,    moisture:93, defaultAmount:120 },
  // Water & sparkling
  { id:'water',            name:'Water',                   category:'liquid',    calories:0,   protein:0.0,  fat:0.0,  carbs:0.0,  sugar:0.0,  fiber:0.0,  sodium:0,     moisture:100,defaultAmount:120 },
  { id:'water-sparkling',  name:'Sparkling Water',         category:'liquid',    calories:0,   protein:0.0,  fat:0.0,  carbs:0.0,  sugar:0.0,  fiber:0.0,  sodium:5,     moisture:100,defaultAmount:120 },
  { id:'club-soda',        name:'Club Soda',               category:'liquid',    calories:0,   protein:0.0,  fat:0.0,  carbs:0.0,  sugar:0.0,  fiber:0.0,  sodium:75,    moisture:100,defaultAmount:120 },
  // Sodas (used in cakes for leavening & moisture)
  { id:'soda-cola',        name:'Cola (Coca-Cola style)',  category:'liquid',    calories:41,  protein:0.0,  fat:0.0,  carbs:10.6, sugar:10.6, fiber:0.0,  sodium:4,     moisture:89, defaultAmount:120 },
  { id:'soda-rootbeer',    name:'Root Beer',               category:'liquid',    calories:44,  protein:0.0,  fat:0.0,  carbs:11.3, sugar:11.3, fiber:0.0,  sodium:14,    moisture:89, defaultAmount:120 },
  { id:'soda-ginger',      name:'Ginger Ale',              category:'liquid',    calories:34,  protein:0.0,  fat:0.0,  carbs:8.7,  sugar:8.7,  fiber:0.0,  sodium:7,     moisture:91, defaultAmount:120 },
  { id:'soda-lemon-lime',  name:'Lemon-Lime Soda',         category:'liquid',    calories:38,  protein:0.0,  fat:0.0,  carbs:9.7,  sugar:9.7,  fiber:0.0,  sodium:10,    moisture:91, defaultAmount:120 },
  { id:'soda-orange',      name:'Orange Soda',             category:'liquid',    calories:48,  protein:0.0,  fat:0.0,  carbs:12.3, sugar:12.3, fiber:0.0,  sodium:13,    moisture:88, defaultAmount:120 },
  { id:'soda-cream',       name:'Cream Soda',              category:'liquid',    calories:43,  protein:0.0,  fat:0.0,  carbs:11.1, sugar:11.1, fiber:0.0,  sodium:14,    moisture:89, defaultAmount:120 },
  { id:'soda-drpepper',    name:'Dr Pepper (style)',       category:'liquid',    calories:43,  protein:0.0,  fat:0.0,  carbs:11.0, sugar:11.0, fiber:0.0,  sodium:11,    moisture:89, defaultAmount:120 },
  // Juices
  { id:'juice-orange',     name:'Orange Juice',            category:'liquid',    calories:45,  protein:0.7,  fat:0.2,  carbs:10.4, sugar:8.4,  fiber:0.2,  sodium:1,     moisture:89, defaultAmount:80  },
  { id:'juice-apple',      name:'Apple Juice',             category:'liquid',    calories:46,  protein:0.1,  fat:0.1,  carbs:11.4, sugar:9.6,  fiber:0.2,  sodium:4,     moisture:88, defaultAmount:80  },
  { id:'juice-lemon',      name:'Lemon Juice',             category:'liquid',    calories:22,  protein:0.4,  fat:0.2,  carbs:6.9,  sugar:2.5,  fiber:0.3,  sodium:1,     moisture:92, defaultAmount:30  },
  { id:'juice-lime',       name:'Lime Juice',              category:'liquid',    calories:25,  protein:0.4,  fat:0.1,  carbs:8.4,  sugar:1.7,  fiber:0.4,  sodium:1,     moisture:92, defaultAmount:30  },
  { id:'juice-pineapple',  name:'Pineapple Juice',         category:'liquid',    calories:53,  protein:0.4,  fat:0.1,  carbs:12.9, sugar:10.0, fiber:0.2,  sodium:2,     moisture:87, defaultAmount:80  },
  { id:'juice-mango',      name:'Mango Juice',             category:'liquid',    calories:60,  protein:0.4,  fat:0.1,  carbs:15.1, sugar:13.0, fiber:0.4,  sodium:1,     moisture:85, defaultAmount:80  },
  { id:'juice-grape',      name:'Grape Juice',             category:'liquid',    calories:60,  protein:0.4,  fat:0.1,  carbs:14.9, sugar:14.2, fiber:0.2,  sodium:5,     moisture:84, defaultAmount:80  },
  { id:'juice-cranberry',  name:'Cranberry Juice',         category:'liquid',    calories:46,  protein:0.4,  fat:0.1,  carbs:12.2, sugar:12.1, fiber:0.1,  sodium:2,     moisture:87, defaultAmount:80  },
  { id:'juice-cherry',     name:'Cherry Juice',            category:'liquid',    calories:50,  protein:0.5,  fat:0.1,  carbs:12.5, sugar:10.6, fiber:0.3,  sodium:5,     moisture:87, defaultAmount:80  },
  // Coffee & tea
  { id:'coffee-brewed',    name:'Coffee (brewed)',         category:'liquid',    calories:1,   protein:0.3,  fat:0.0,  carbs:0.0,  sugar:0.0,  fiber:0.0,  sodium:2,     moisture:99, defaultAmount:80  },
  { id:'espresso',         name:'Espresso (brewed)',       category:'liquid',    calories:9,   protein:0.6,  fat:0.2,  carbs:1.7,  sugar:0.0,  fiber:0.0,  sodium:14,    moisture:97, defaultAmount:40  },
  { id:'tea-black',        name:'Black Tea (brewed)',      category:'liquid',    calories:1,   protein:0.0,  fat:0.0,  carbs:0.3,  sugar:0.0,  fiber:0.0,  sodium:3,     moisture:99, defaultAmount:80  },
  { id:'tea-chai',         name:'Chai Tea (brewed)',       category:'liquid',    calories:3,   protein:0.2,  fat:0.0,  carbs:0.6,  sugar:0.0,  fiber:0.0,  sodium:3,     moisture:99, defaultAmount:80  },
  { id:'tea-green',        name:'Green Tea (brewed)',      category:'liquid',    calories:1,   protein:0.2,  fat:0.0,  carbs:0.2,  sugar:0.0,  fiber:0.0,  sodium:1,     moisture:99, defaultAmount:80  },
  // Spirits & wines
  { id:'spirit-rum',       name:'Rum',                     category:'liquid',    calories:231, protein:0.0,  fat:0.0,  carbs:0.1,  sugar:0.0,  fiber:0.0,  sodium:1,     moisture:63, defaultAmount:30  },
  { id:'spirit-dark-rum',  name:'Dark Rum',                category:'liquid',    calories:231, protein:0.0,  fat:0.0,  carbs:0.1,  sugar:0.0,  fiber:0.0,  sodium:1,     moisture:63, defaultAmount:30  },
  { id:'liquid-vinegar',   name:'White Vinegar',           category:'liquid',    calories:3,   protein:0.0,  fat:0.0,  carbs:0.1,  sugar:0.0,  fiber:0.0,  sodium:1,     moisture:95, defaultAmount:5   },
  { id:'misc-gelatin',     name:'Gelatin (unflavored)',    category:'leavening', calories:335, protein:85.0, fat:0.0,  carbs:0.0,  sugar:0.0,  fiber:0.0,  sodium:196,   moisture:13, defaultAmount:7   },
  { id:'misc-food-color',  name:'Red Food Coloring',       category:'leavening', calories:0,   protein:0.0,  fat:0.0,  carbs:0.0,  sugar:0.0,  fiber:0.0,  sodium:0,     moisture:0,  defaultAmount:10  },
  { id:'spirit-bourbon',   name:'Bourbon Whiskey',         category:'liquid',    calories:231, protein:0.0,  fat:0.0,  carbs:0.1,  sugar:0.0,  fiber:0.0,  sodium:1,     moisture:63, defaultAmount:30  },
  { id:'spirit-amaretto',  name:'Amaretto',                category:'liquid',    calories:235, protein:0.0,  fat:0.0,  carbs:27.0, sugar:27.0, fiber:0.0,  sodium:1,     moisture:55, defaultAmount:30  },
  { id:'spirit-kahlua',    name:'Kahlua',                  category:'liquid',    calories:327, protein:0.0,  fat:0.1,  carbs:48.0, sugar:47.0, fiber:0.0,  sodium:3,     moisture:42, defaultAmount:30  },
  { id:'spirit-grand-mar', name:'Grand Marnier',           category:'liquid',    calories:265, protein:0.0,  fat:0.0,  carbs:22.0, sugar:22.0, fiber:0.0,  sodium:1,     moisture:50, defaultAmount:30  },
  { id:'wine-red',         name:'Red Wine',                category:'liquid',    calories:85,  protein:0.1,  fat:0.0,  carbs:2.6,  sugar:0.6,  fiber:0.0,  sodium:4,     moisture:87, defaultAmount:60  },
  { id:'spirit-baileys',   name:'Baileys Irish Cream',     category:'liquid',    calories:327, protein:3.8,  fat:14.0, carbs:25.0, sugar:23.0, fiber:0.0,  sodium:55,    moisture:55, defaultAmount:30  },

  // ─────────────────────────────────────────────────────────────
  // EGGS
  // ─────────────────────────────────────────────────────────────
  { id:'egg-whole',        name:'Whole Egg (large)',        category:'egg',       calories:143, protein:12.6, fat:9.5,  saturatedFat:3.1, transFat:0.0, polyunsaturatedFat:1.9, monounsaturatedFat:3.7, cholesterol:372, carbs:0.7,  sugar:0.4,  fiber:0.0,  sodium:142,   moisture:76, defaultAmount:50  },
  { id:'egg-yolk',         name:'Egg Yolk',                 category:'egg',       calories:322, protein:15.9, fat:26.5, saturatedFat:8.2, transFat:0.0, polyunsaturatedFat:3.6, monounsaturatedFat:11.7,cholesterol:1085,carbs:3.6,  sugar:0.6,  fiber:0.0,  sodium:48,    moisture:52, defaultAmount:40  },
  { id:'egg-white',        name:'Egg White',                category:'egg',       calories:52,  protein:10.9, fat:0.2,  saturatedFat:0.0, transFat:0.0, polyunsaturatedFat:0.0, monounsaturatedFat:0.0, cholesterol:0,   carbs:0.7,  sugar:0.7,  fiber:0.0,  sodium:166,   moisture:88, defaultAmount:60  },
  { id:'egg-flax',         name:'Flax Egg (flax+water)',    category:'egg',       calories:37,  protein:2.0,  fat:2.5,  carbs:2.8,  sugar:0.1,  fiber:2.7,  sodium:5,     moisture:80, defaultAmount:45  },

  // ─────────────────────────────────────────────────────────────
  // LEAVENING
  // ─────────────────────────────────────────────────────────────
  { id:'baking-powder',    name:'Baking Powder',            category:'leavening', calories:53,  protein:0.0,  fat:0.0,  carbs:27.7, sugar:0.0,  fiber:0.1,  sodium:10600, moisture:4,  defaultAmount:8   },
  { id:'baking-soda',      name:'Baking Soda',              category:'leavening', calories:0,   protein:0.0,  fat:0.0,  carbs:0.0,  sugar:0.0,  fiber:0.0,  sodium:27360, moisture:0,  defaultAmount:4   },
  { id:'cream-of-tartar',  name:'Cream of Tartar',          category:'leavening', calories:218, protein:0.0,  fat:0.0,  carbs:54.3, sugar:0.0,  fiber:0.0,  sodium:70,    moisture:4,  defaultAmount:3   },
  { id:'yeast-instant',    name:'Instant Yeast',            category:'leavening', calories:325, protein:40.4, fat:7.6,  carbs:40.7, sugar:0.0,  fiber:26.9, sodium:51,    moisture:6,  defaultAmount:7   },

  // ─────────────────────────────────────────────────────────────
  // DAIRY (solid/semi-solid)
  // ─────────────────────────────────────────────────────────────
  { id:'sour-cream',       name:'Sour Cream',               category:'dairy',     calories:198, protein:2.9,  fat:19.4, saturatedFat:12.3, transFat:0.8, polyunsaturatedFat:0.6, monounsaturatedFat:5.0, cholesterol:52,  carbs:4.6,  sugar:4.3,  fiber:0.0,  sodium:53,    moisture:71, defaultAmount:120 },
  { id:'greek-yogurt',     name:'Greek Yogurt',             category:'dairy',     calories:59,  protein:10.2, fat:0.4,  saturatedFat:0.1,  transFat:0.0, polyunsaturatedFat:0.0, monounsaturatedFat:0.1, cholesterol:5,   carbs:3.6,  sugar:3.2,  fiber:0.0,  sodium:36,    moisture:81, defaultAmount:120 },
  { id:'ricotta',          name:'Ricotta Cheese',           category:'dairy',     calories:174, protein:11.3, fat:13.0, saturatedFat:8.3,  transFat:0.5, polyunsaturatedFat:0.4, monounsaturatedFat:3.4, cholesterol:51,  carbs:3.0,  sugar:0.3,  fiber:0.0,  sodium:84,    moisture:72, defaultAmount:120 },
  { id:'mascarpone',       name:'Mascarpone',               category:'dairy',     calories:429, protein:4.8,  fat:44.1, saturatedFat:28.0, transFat:1.5, polyunsaturatedFat:1.3, monounsaturatedFat:11.2,cholesterol:130, carbs:3.6,  sugar:3.2,  fiber:0.0,  sodium:48,    moisture:44, defaultAmount:100 },
  { id:'condensed-milk',   name:'Condensed Milk',           category:'dairy',     calories:321, protein:7.9,  fat:8.7,  saturatedFat:5.5,  transFat:0.4, polyunsaturatedFat:0.3, monounsaturatedFat:2.3, cholesterol:34,  carbs:54.4, sugar:54.4, fiber:0.0,  sodium:127,   moisture:27, defaultAmount:100 },
  { id:'evaporated-milk',  name:'Evaporated Milk',          category:'dairy',     calories:135, protein:6.8,  fat:7.6,  saturatedFat:4.6,  transFat:0.3, polyunsaturatedFat:0.2, monounsaturatedFat:1.9, cholesterol:29,  carbs:10.0, sugar:10.4, fiber:0.0,  sodium:106,   moisture:74, defaultAmount:120 },
  { id:'creme-fraiche',    name:'Creme Fraiche',            category:'dairy',     calories:300, protein:2.4,  fat:30.0, saturatedFat:18.8, transFat:1.0, polyunsaturatedFat:1.1, monounsaturatedFat:7.8, cholesterol:100, carbs:2.8,  sugar:2.8,  fiber:0.0,  sodium:40,    moisture:62, defaultAmount:100 },

  // ─────────────────────────────────────────────────────────────
  // CHOCOLATE & CHIPS
  // ─────────────────────────────────────────────────────────────
  { id:'choc-dark-chips',  name:'Dark Chocolate Chips',     category:'chocolate', calories:546, protein:4.9,  fat:31.3, saturatedFat:18.5, transFat:0.0, polyunsaturatedFat:1.0, monounsaturatedFat:9.5, cholesterol:3,  carbs:59.4, sugar:47.6, fiber:7.0,  sodium:11,    moisture:1,  defaultAmount:150 },
  { id:'choc-milk-chips',  name:'Milk Chocolate Chips',     category:'chocolate', calories:535, protein:7.7,  fat:29.7, saturatedFat:17.8, transFat:0.3, polyunsaturatedFat:1.0, monounsaturatedFat:9.0, cholesterol:23, carbs:59.2, sugar:52.7, fiber:2.0,  sodium:79,    moisture:1,  defaultAmount:150 },
  { id:'choc-white-chips', name:'White Chocolate Chips',    category:'chocolate', calories:539, protein:5.9,  fat:32.1, saturatedFat:19.4, transFat:0.4, polyunsaturatedFat:1.0, monounsaturatedFat:9.8, cholesterol:21, carbs:58.8, sugar:57.1, fiber:0.2,  sodium:90,    moisture:1,  defaultAmount:150 },
  { id:'choc-semi-chips',  name:'Semi-Sweet Chips',         category:'chocolate', calories:480, protein:5.0,  fat:27.0, saturatedFat:16.0, transFat:0.0, polyunsaturatedFat:0.9, monounsaturatedFat:8.2, cholesterol:2,  carbs:63.1, sugar:52.4, fiber:5.9,  sodium:11,    moisture:1,  defaultAmount:150 },
  { id:'cacao-nibs',       name:'Cacao Nibs',               category:'chocolate', calories:480, protein:12.0, fat:38.0, saturatedFat:22.0, transFat:0.0, polyunsaturatedFat:1.2, monounsaturatedFat:12.0,cholesterol:0,  carbs:46.0, sugar:0.0,  fiber:20.0, sodium:0,     moisture:3,  defaultAmount:50  },
  { id:'choc-dark-bar',    name:'Dark Chocolate Bar',       category:'chocolate', calories:546, protein:4.9,  fat:31.3, saturatedFat:18.5, transFat:0.0, polyunsaturatedFat:1.0, monounsaturatedFat:9.5, cholesterol:3,  carbs:59.4, sugar:47.5, fiber:7.0,  sodium:11,    moisture:1,  defaultAmount:100 },
  { id:'choc-milk-bar',    name:'Milk Chocolate Bar',       category:'chocolate', calories:535, protein:7.7,  fat:29.7, saturatedFat:17.8, transFat:0.3, polyunsaturatedFat:1.0, monounsaturatedFat:9.0, cholesterol:23, carbs:59.2, sugar:52.0, fiber:2.4,  sodium:79,    moisture:1,  defaultAmount:100 },
  { id:'nutella',          name:'Nutella',                  category:'chocolate', calories:539, protein:6.3,  fat:30.9, carbs:57.9, sugar:56.3, fiber:3.4,  sodium:58,    moisture:2,  defaultAmount:60  },
  { id:'caramel-chips',    name:'Caramel Chips',            category:'chocolate', calories:500, protein:3.0,  fat:20.0, carbs:75.0, sugar:70.0, fiber:0.0,  sodium:80,    moisture:2,  defaultAmount:100 },
  { id:'butterscotch',     name:'Butterscotch Chips',       category:'chocolate', calories:497, protein:2.5,  fat:20.0, carbs:74.0, sugar:69.0, fiber:0.0,  sodium:100,   moisture:2,  defaultAmount:100 },
  { id:'pb-chips',         name:'Peanut Butter Chips',      category:'chocolate', calories:514, protein:12.0, fat:24.0, carbs:63.0, sugar:55.0, fiber:2.0,  sodium:200,   moisture:1,  defaultAmount:100 },
  { id:'cinnamon-chips',   name:'Cinnamon Chips',           category:'chocolate', calories:490, protein:3.0,  fat:22.0, carbs:70.0, sugar:65.0, fiber:0.5,  sodium:60,    moisture:2,  defaultAmount:100 },

  // ─────────────────────────────────────────────────────────────
  // FRUITS
  // ─────────────────────────────────────────────────────────────
  { id:'fruit-blueberry',  name:'Fresh Blueberries',        category:'fruit',     calories:57,  protein:0.7,  fat:0.3,  carbs:14.5, sugar:9.9,  fiber:2.4,  sodium:1,     moisture:84, defaultAmount:150 },
  { id:'fruit-raspberry',  name:'Fresh Raspberries',        category:'fruit',     calories:52,  protein:1.2,  fat:0.7,  carbs:11.9, sugar:4.4,  fiber:6.5,  sodium:1,     moisture:86, defaultAmount:120 },
  { id:'fruit-strawberry', name:'Fresh Strawberries',       category:'fruit',     calories:32,  protein:0.7,  fat:0.3,  carbs:7.7,  sugar:4.9,  fiber:2.0,  sodium:1,     moisture:91, defaultAmount:150 },
  { id:'fruit-cherry',     name:'Fresh Cherries',           category:'fruit',     calories:63,  protein:1.1,  fat:0.2,  carbs:16.0, sugar:12.8, fiber:2.1,  sodium:0,     moisture:82, defaultAmount:150 },
  { id:'fruit-banana',     name:'Banana (mashed)',          category:'fruit',     calories:89,  protein:1.1,  fat:0.3,  carbs:22.8, sugar:12.2, fiber:2.6,  sodium:1,     moisture:75, defaultAmount:120 },
  { id:'fruit-apple',      name:'Apple (grated)',           category:'fruit',     calories:52,  protein:0.3,  fat:0.2,  carbs:13.8, sugar:10.4, fiber:2.4,  sodium:1,     moisture:86, defaultAmount:100 },
  { id:'fruit-pumpkin',    name:'Pumpkin Puree',            category:'fruit',     calories:26,  protein:1.0,  fat:0.1,  carbs:6.5,  sugar:2.8,  fiber:2.7,  sodium:1,     moisture:91, defaultAmount:120 },
  { id:'fruit-zucchini',   name:'Zucchini (grated)',        category:'fruit',     calories:17,  protein:1.2,  fat:0.3,  carbs:3.1,  sugar:2.5,  fiber:1.0,  sodium:8,     moisture:95, defaultAmount:150 },
  { id:'fruit-carrot',     name:'Carrot (grated)',          category:'fruit',     calories:41,  protein:0.9,  fat:0.2,  carbs:9.6,  sugar:4.7,  fiber:2.8,  sodium:69,    moisture:88, defaultAmount:150 },
  { id:'zest-lemon',       name:'Lemon Zest',               category:'fruit',     calories:47,  protein:1.5,  fat:0.3,  carbs:16.0, sugar:4.2,  fiber:10.6, sodium:3,     moisture:80, defaultAmount:10  },
  { id:'zest-orange',      name:'Orange Zest',              category:'fruit',     calories:97,  protein:1.5,  fat:0.2,  carbs:25.0, sugar:18.9, fiber:10.6, sodium:3,     moisture:72, defaultAmount:10  },
  { id:'fruit-cranberry-d',name:'Dried Cranberries',        category:'fruit',     calories:308, protein:0.1,  fat:1.1,  carbs:82.4, sugar:65.4, fiber:5.3,  sodium:2,     moisture:16, defaultAmount:80  },
  { id:'fruit-raisin',     name:'Raisins',                  category:'fruit',     calories:299, protein:3.1,  fat:0.5,  carbs:79.2, sugar:59.2, fiber:3.7,  sodium:11,    moisture:15, defaultAmount:100 },
  { id:'fruit-currant',    name:'Dried Currants',           category:'fruit',     calories:283, protein:4.0,  fat:0.3,  carbs:73.8, sugar:66.0, fiber:6.8,  sodium:10,    moisture:15, defaultAmount:100 },
  { id:'fruit-citron',     name:'Candied Citron Peel',      category:'fruit',     calories:318, protein:0.2,  fat:0.1,  carbs:82.9, sugar:80.0, fiber:0.8,  sodium:10,    moisture:17, defaultAmount:50  },
  { id:'fruit-apricot-d',  name:'Dried Apricots',           category:'fruit',     calories:241, protein:3.4,  fat:0.5,  carbs:62.6, sugar:53.4, fiber:7.3,  sodium:10,    moisture:31, defaultAmount:80  },
  { id:'fruit-maraschino', name:'Maraschino Cherries',      category:'fruit',     calories:165, protein:0.1,  fat:0.2,  carbs:42.9, sugar:42.0, fiber:1.0,  sodium:9,     moisture:57, defaultAmount:80  },
  { id:'coconut-flakes',   name:'Coconut Flakes',           category:'fruit',     calories:660, protein:6.9,  fat:64.5, carbs:23.7, sugar:17.2, fiber:16.3, sodium:37,    moisture:3,  defaultAmount:80  },
  { id:'coconut-shredded', name:'Shredded Coconut',         category:'fruit',     calories:466, protein:4.3,  fat:46.9, carbs:18.6, sugar:8.9,  fiber:9.0,  sodium:20,    moisture:32, defaultAmount:80  },
  { id:'fruit-mango',      name:'Mango (diced)',            category:'fruit',     calories:60,  protein:0.8,  fat:0.4,  carbs:15.0, sugar:13.7, fiber:1.6,  sodium:1,     moisture:84, defaultAmount:120 },
  { id:'fruit-pineapple',  name:'Pineapple (crushed)',      category:'fruit',     calories:50,  protein:0.5,  fat:0.1,  carbs:13.1, sugar:9.9,  fiber:1.4,  sodium:1,     moisture:87, defaultAmount:100 },
  { id:'fruit-pineapple-rings', name:'Pineapple (canned rings)', category:'fruit',  calories:50,  protein:0.5,  fat:0.1,  carbs:13.1, sugar:9.9,  fiber:1.4,  sodium:1,     moisture:87, defaultAmount:240 },
  { id:'fruit-applesauce', name:'Applesauce',                category:'fruit',     calories:48,  protein:0.2,  fat:0.1,  carbs:12.8, sugar:10.2, fiber:1.3,  sodium:2,     moisture:84, defaultAmount:120 },
  { id:'fruit-dates',      name:'Dates (chopped)',          category:'fruit',     calories:282, protein:2.5,  fat:0.4,  carbs:75.0, sugar:63.4, fiber:8.0,  sodium:2,     moisture:21, defaultAmount:80  },
  { id:'fruit-fig',        name:'Fig (dried, chopped)',     category:'fruit',     calories:249, protein:3.3,  fat:0.9,  carbs:63.9, sugar:47.9, fiber:9.8,  sodium:10,    moisture:30, defaultAmount:80  },
  { id:'fruit-peach',      name:'Peach (diced)',            category:'fruit',     calories:39,  protein:0.9,  fat:0.3,  carbs:9.5,  sugar:8.4,  fiber:1.5,  sodium:0,     moisture:89, defaultAmount:120 },

  // ─────────────────────────────────────────────────────────────
  // NUTS & SEEDS
  // ─────────────────────────────────────────────────────────────
  { id:'nut-walnut',       name:'Walnuts (chopped)',         category:'nuts',      calories:654, protein:15.2, fat:65.2, carbs:13.7, sugar:2.6,  fiber:6.7,  sodium:2,     moisture:4,  defaultAmount:80  },
  { id:'nut-pecan',        name:'Pecans (chopped)',          category:'nuts',      calories:691, protein:9.2,  fat:72.0, carbs:13.9, sugar:3.9,  fiber:9.6,  sodium:0,     moisture:4,  defaultAmount:80  },
  { id:'nut-almond',       name:'Almonds (sliced)',          category:'nuts',      calories:576, protein:21.2, fat:49.9, carbs:21.6, sugar:4.4,  fiber:12.5, sodium:1,     moisture:4,  defaultAmount:80  },
  { id:'nut-hazelnut',     name:'Hazelnuts (chopped)',       category:'nuts',      calories:628, protein:15.0, fat:60.8, carbs:16.7, sugar:4.3,  fiber:9.7,  sodium:0,     moisture:5,  defaultAmount:80  },
  { id:'nut-macadamia',    name:'Macadamia Nuts',            category:'nuts',      calories:718, protein:7.9,  fat:75.8, carbs:13.8, sugar:4.6,  fiber:8.6,  sodium:5,     moisture:2,  defaultAmount:80  },
  { id:'nut-pistachio',    name:'Pistachios (chopped)',      category:'nuts',      calories:562, protein:20.2, fat:45.4, carbs:27.5, sugar:7.7,  fiber:10.3, sodium:1,     moisture:4,  defaultAmount:60  },
  { id:'nut-cashew',       name:'Cashews (chopped)',         category:'nuts',      calories:553, protein:18.2, fat:43.9, carbs:30.2, sugar:5.9,  fiber:3.3,  sodium:12,    moisture:5,  defaultAmount:80  },
  { id:'nut-pine',         name:'Pine Nuts',                 category:'nuts',      calories:673, protein:13.7, fat:68.4, carbs:13.1, sugar:3.6,  fiber:3.7,  sodium:2,     moisture:2,  defaultAmount:50  },
  { id:'nut-peanut',       name:'Peanuts (crushed)',         category:'nuts',      calories:567, protein:25.8, fat:49.2, carbs:16.1, sugar:4.7,  fiber:8.5,  sodium:18,    moisture:4,  defaultAmount:80  },
  { id:'seed-sunflower',   name:'Sunflower Seeds',           category:'nuts',      calories:584, protein:20.8, fat:51.5, carbs:20.0, sugar:2.6,  fiber:8.6,  sodium:9,     moisture:5,  defaultAmount:50  },
  { id:'seed-pumpkin',     name:'Pumpkin Seeds',             category:'nuts',      calories:559, protein:30.2, fat:49.1, carbs:10.7, sugar:1.4,  fiber:6.0,  sodium:7,     moisture:7,  defaultAmount:50  },
  { id:'seed-sesame',      name:'Sesame Seeds',              category:'nuts',      calories:573, protein:17.7, fat:49.7, carbs:23.5, sugar:0.3,  fiber:11.8, sodium:11,    moisture:5,  defaultAmount:30  },
  { id:'seed-chia',        name:'Chia Seeds',                category:'nuts',      calories:486, protein:16.5, fat:30.7, carbs:42.1, sugar:0.0,  fiber:34.4, sodium:16,    moisture:6,  defaultAmount:20  },

  // ─────────────────────────────────────────────────────────────
  // FLAVORINGS & EXTRACTS
  // ─────────────────────────────────────────────────────────────
  { id:'vanilla-extract',  name:'Vanilla Extract',           category:'flavoring', calories:288, protein:0.1,  fat:0.1,  carbs:12.7, sugar:12.7, fiber:0.0,  sodium:9,     moisture:53, defaultAmount:5   },
  { id:'vanilla-paste',    name:'Vanilla Bean Paste',        category:'flavoring', calories:292, protein:0.1,  fat:0.1,  carbs:13.0, sugar:13.0, fiber:0.0,  sodium:9,     moisture:50, defaultAmount:5   },
  { id:'almond-extract',   name:'Almond Extract',            category:'flavoring', calories:263, protein:0.0,  fat:0.1,  carbs:1.0,  sugar:0.0,  fiber:0.0,  sodium:1,     moisture:62, defaultAmount:3   },
  { id:'peppermint-ext',   name:'Peppermint Extract',        category:'flavoring', calories:290, protein:0.0,  fat:0.1,  carbs:0.4,  sugar:0.0,  fiber:0.0,  sodium:2,     moisture:60, defaultAmount:3   },
  { id:'lemon-extract',    name:'Lemon Extract',             category:'flavoring', calories:259, protein:0.0,  fat:0.1,  carbs:0.5,  sugar:0.0,  fiber:0.0,  sodium:1,     moisture:63, defaultAmount:3   },
  { id:'rose-water',       name:'Rose Water',                category:'flavoring', calories:2,   protein:0.0,  fat:0.0,  carbs:0.5,  sugar:0.5,  fiber:0.0,  sodium:1,     moisture:99, defaultAmount:10  },
  { id:'orange-blossom',   name:'Orange Blossom Water',      category:'flavoring', calories:2,   protein:0.0,  fat:0.0,  carbs:0.5,  sugar:0.5,  fiber:0.0,  sodium:1,     moisture:99, defaultAmount:10  },

  // ─────────────────────────────────────────────────────────────
  // SPICES
  // ─────────────────────────────────────────────────────────────
  { id:'spice-cinnamon',   name:'Cinnamon',                  category:'spice',     calories:247, protein:4.0,  fat:1.2,  carbs:80.6, sugar:2.2,  fiber:53.1, sodium:10,    moisture:10, defaultAmount:5   },
  { id:'spice-nutmeg',     name:'Nutmeg',                    category:'spice',     calories:525, protein:5.8,  fat:36.3, carbs:49.3, sugar:2.9,  fiber:20.8, sodium:16,    moisture:7,  defaultAmount:2   },
  { id:'spice-mace',       name:'Mace',                      category:'spice',     calories:475, protein:6.7,  fat:32.4, carbs:50.5, sugar:2.0,  fiber:20.2, sodium:26,    moisture:8,  defaultAmount:2   },
  { id:'spice-cardamom',   name:'Cardamom',                  category:'spice',     calories:311, protein:10.8, fat:6.7,  carbs:68.5, sugar:0.0,  fiber:28.0, sodium:18,    moisture:9,  defaultAmount:2   },
  { id:'spice-ginger',     name:'Ginger (ground)',           category:'spice',     calories:335, protein:8.98, fat:4.2,  carbs:71.6, sugar:3.4,  fiber:14.1, sodium:27,    moisture:10, defaultAmount:3   },
  { id:'spice-cloves',     name:'Cloves',                    category:'spice',     calories:274, protein:6.0,  fat:13.0, carbs:65.5, sugar:2.4,  fiber:33.9, sodium:277,   moisture:9,  defaultAmount:2   },
  { id:'spice-pumpkin-pie',name:'Pumpkin Pie Spice',         category:'spice',     calories:282, protein:5.4,  fat:4.3,  carbs:65.0, sugar:2.0,  fiber:25.0, sodium:26,    moisture:9,  defaultAmount:5   },
  { id:'spice-lavender',   name:'Lavender (culinary)',       category:'spice',     calories:49,  protein:3.0,  fat:0.7,  carbs:8.9,  sugar:0.0,  fiber:5.3,  sodium:9,     moisture:75, defaultAmount:3   },
  { id:'spice-allspice',   name:'Allspice',                  category:'spice',     calories:263, protein:6.1,  fat:8.7,  carbs:72.1, sugar:0.0,  fiber:21.6, sodium:77,    moisture:8,  defaultAmount:2   },

  // ─────────────────────────────────────────────────────────────
  // FILLINGS & SPREADS
  // ─────────────────────────────────────────────────────────────
  { id:'peanut-butter',    name:'Peanut Butter',             category:'filling',   calories:588, protein:25.1, fat:50.4, carbs:19.6, sugar:8.4,  fiber:6.0,  sodium:459,   moisture:1,  defaultAmount:80  },
  { id:'almond-butter',    name:'Almond Butter',             category:'filling',   calories:614, protein:21.2, fat:55.5, carbs:18.8, sugar:5.3,  fiber:12.5, sodium:7,     moisture:2,  defaultAmount:80  },
  { id:'tahini',           name:'Tahini',                    category:'filling',   calories:595, protein:17.0, fat:53.8, carbs:21.2, sugar:0.5,  fiber:9.3,  sodium:115,   moisture:3,  defaultAmount:60  },
  { id:'jam-strawberry',   name:'Strawberry Jam',            category:'filling',   calories:278, protein:0.4,  fat:0.1,  carbs:68.9, sugar:67.4, fiber:1.4,  sodium:32,    moisture:29, defaultAmount:80  },
  { id:'jam-raspberry',    name:'Raspberry Jam',             category:'filling',   calories:278, protein:0.6,  fat:0.1,  carbs:68.9, sugar:66.2, fiber:2.7,  sodium:22,    moisture:29, defaultAmount:80  },
  { id:'lemon-curd',       name:'Lemon Curd',                category:'filling',   calories:236, protein:2.6,  fat:10.6, carbs:34.5, sugar:31.2, fiber:0.3,  sodium:41,    moisture:45, defaultAmount:100 },
  { id:'dulce-de-leche',   name:'Dulce de Leche',            category:'filling',   calories:307, protein:6.8,  fat:7.3,  carbs:55.4, sugar:55.4, fiber:0.0,  sodium:129,   moisture:28, defaultAmount:100 },
  { id:'caramel-sauce',    name:'Caramel Sauce',             category:'filling',   calories:382, protein:2.0,  fat:9.5,  carbs:69.6, sugar:65.0, fiber:0.0,  sodium:176,   moisture:18, defaultAmount:80  },
  { id:'frosting-cc',      name:'Cream Cheese Frosting',     category:'filling',   calories:393, protein:2.4,  fat:25.6, carbs:39.9, sugar:37.0, fiber:0.0,  sodium:202,   moisture:20, defaultAmount:150 },
  { id:'frosting-bc',      name:'Buttercream Frosting',      category:'filling',   calories:431, protein:0.3,  fat:21.5, carbs:62.3, sugar:61.1, fiber:0.0,  sodium:100,   moisture:10, defaultAmount:150 },
  { id:'ganache',          name:'Ganache',                   category:'filling',   calories:426, protein:4.0,  fat:29.0, carbs:40.0, sugar:36.0, fiber:3.0,  sodium:19,    moisture:25, defaultAmount:100 },

  // ─────────────────────────────────────────────────────────────
  // OTHER
  // ─────────────────────────────────────────────────────────────
  { id:'salt',             name:'Salt',                      category:'other',     calories:0,   protein:0.0,  fat:0.0,  carbs:0.0,  sugar:0.0,  fiber:0.0,  sodium:38758, moisture:0,  defaultAmount:3   },
  { id:'corn-syrup',       name:'Corn Syrup',                 category:'other',     calories:286, protein:0.0,  fat:0.0,  carbs:77.6, sugar:32.0, fiber:0.0,  sodium:98,    moisture:22, defaultAmount:30  },
  { id:'sprinkles',        name:'Sprinkles',                 category:'other',     calories:396, protein:0.0,  fat:3.6,  carbs:96.4, sugar:93.0, fiber:0.0,  sodium:20,    moisture:0,  defaultAmount:20  },
  { id:'poppy-seeds',      name:'Poppy Seeds',               category:'other',     calories:525, protein:17.9, fat:41.6, carbs:28.1, sugar:2.8,  fiber:19.5, sodium:26,    moisture:6,  defaultAmount:20  },
  { id:'xanthan-gum',      name:'Xanthan Gum',               category:'other',     calories:333, protein:0.0,  fat:0.0,  carbs:83.3, sugar:0.0,  fiber:83.3, sodium:750,   moisture:8,  defaultAmount:3   },
];
