import pandesal from '@/assets/pandesal.webp';
import puto from '@/assets/puto.jpg';
import bibingka from '@/assets/bibingka.jpg';
import turon from '@/assets/turon.png';
import bananaCue from '@/assets/bananaCue.jpg';
import ensaymada from '@/assets/ensaymada.jpg';
import spanishBread from '@/assets/spanishBread.jpg';
import kutsinta from '@/assets/kutsinta.jpg';
import putoBumbong from '@/assets/putoBumbong.webp';
import biko from '@/assets/biko.jpg';
import cassavaCake from '@/assets/cassavaCake.jpg';
import lecheFlan from '@/assets/lecheFlan.webp';
import type { Customer, Order, Product } from '@/types/admin';


// Product category
export const categories = [
	'All',
	'Bread',
	'Fried',
	'Steamed',
	'Rice Cakes',
	'Dessert'
];

/*
export const allProducts = [
	{
		id: 1,
		name: "Malungay Pandesal",
		description: "Classic Filipino bread roll with a light crunchy crumb coating",
		price: 2.00,
		rating: 4.9,
		reviews: 320,
		category: "Bread",
		badge: "Best Seller",
		isNew: false,
		isFavorite: false,
		image: pandesal
	},
	{
		id: 2,
		name: "Ensaymader",
		description: "Soft buttery brioche topped with sugar, butter, and grated cheese",
		price: 5.50,
		rating: 4.9,
		reviews: 260,
		category: "Bread",
		badge: "Top Rated",
		isNew: false,
		isFavorite: false,
		image: ensaymada
	},
	{
		id: 3,
		name: "Pan de Bisakol ",
		description: "Sweet rolled bread filled with buttery sugary crumbs",
		price: 3.25,
		rating: 4.8,
		reviews: 180,
		category: "Bread",
		badge: "Recommended",
		isNew: false,
		isFavorite: false,
		image: spanishBread
	},
	{
	id: 4,
	name: "Banana Shanghai",
	description: "Fried banana spring roll with caramelized sugar and jackfruit",
	price: 3.50,
	rating: 4.8,
	reviews: 210,
	category: "Fried",
	badge: "Best Seller",
	isNew: false,
	isFavorite: false,
	image: turon
	},
	{
	id: 5,
	name: "Banana Qt",
	description: "Deep fried saba bananas coated in caramelized brown sugar",
	price: 2.75,
	rating: 4.7,
	reviews: 150,
	category: "Fried",
	badge: "Street Favorite",
	isNew: false,
	isFavorite: false,
	image: bananaCue
	},
	{
	id: 6,
	name: "Putotoy",
	description: "Soft steamed rice cake commonly paired with butter or cheese",
	price: 2.25,
	rating: 4.8,
	reviews: 170,
	category: "Steamed",
	badge: "Traditional",
	isNew: false,
	isFavorite: false,
	image: puto
	},
	{
	id: 7,
	name: "Puto Kutsinta ",
	description: "Chewy brown rice cake topped with freshly grated coconut",
	price: 2.50,
	rating: 4.7,
	reviews: 160,
	category: "Steamed",
	badge: "Traditional",
	isNew: false,
	isFavorite: false,
	image: kutsinta
	},
	{
	id: 8,
	name: "Bibingka Ni Inday",
	description: "Rice cake baked in banana leaves topped with salted egg and cheese",
	price: 4.50,
	rating: 4.9,
	reviews: 230,
	category: "Rice Cakes",
	badge: "Top Rated",
	isNew: false,
	isFavorite: true,
	image: bibingka
	},
	{
	id: 9,
	name: "Puto ni Bongbong Marcos",
	description: "Purple steamed rice cake topped with coconut, butter, and brown sugar",
	price: 4.75,
	rating: 4.9,
	reviews: 210,
	category: "Rice Cakes",
	badge: "Seasonal",
	isNew: true,
	isFavorite: false,
	image: putoBumbong
	},
	{
	id: 10,
	name: "Bibiko",
	description: "Sticky rice desert cooked with coconut milk and topped with caramel latik",
	price: 3.75,
	rating: 4.8,
	reviews: 200,
	category: "Rice Cakes",
	badge: "Recommended",
	isNew: false,
	isFavorite: false,
	image: biko
	},
	{
	id: 11,
	name: "Balanghoy Cake",
	description: "Rich balanghoy desert topped with creamy custard layer",
	price: 4.25,
	rating: 4.8,
	reviews: 190,
	category: "Dessert",
	badge: "Best Seller",
	isNew: false,
	isFavorite: false,
	image: cassavaCake
	},
	{
	id: 12,
	name: "Letche Flan",
	description: "Rich caramel custard desert with smooth creamy texture",
	price: 4.50,
	rating: 4.9,
	reviews: 240,
	category: "Dessert",
	badge: "Top Rated",
	isNew: false,
	isFavorite: false,
	image: lecheFlan
	}
	];
*/

export const allProducts = [
	{
	id: 1,
	name: "Malungay Pandesal",
	description: "Classic Filipino bread roll with a light crunchy crumb coating",
	price: 2.00,
	rating: 4.9,
	reviews: 320,
	category: "Bread",
	badge: "Best Seller",
	isNew: false,
	isFavorite: false,
	image: pandesal,
	ingredients: [
	"Flour","Yeast","Sugar","Salt","Milk","Butter","Malunggay leaves","Bread crumbs"
	],
	steps: [
	"Mix ingredients until dough behaves",
	"Knead like you're mad at your keyboard",
	"Add malunggay for instant 'health upgrade'",
	"Roll into small balls",
	"Bake until the whole house smells amazing"
	]
	},
	
	{
	id: 2,
	name: "Ensaymader",
	description: "Soft buttery brioche topped with sugar, butter, and grated cheese",
	price: 5.50,
	rating: 4.9,
	reviews: 260,
	category: "Bread",
	badge: "Top Rated",
	isNew: false,
	isFavorite: false,
	image: ensaymada,
	ingredients: [
	"Flour","Yeast","Butter","Sugar","Eggs","Milk","Cheese"
	],
	steps: [
	"Mix dough and let it rest like it's on vacation",
	"Roll dough into spiral shapes",
	"Bake until golden and fluffy",
	"Spread butter generously",
	"Add sugar and cheese like calories don't exist"
	]
	},
	
	{
	id: 3,
	name: "Pan de Bisakol",
	description: "Sweet rolled bread filled with buttery sugary crumbs",
	price: 3.25,
	rating: 4.8,
	reviews: 180,
	category: "Bread",
	badge: "Recommended",
	isNew: false,
	isFavorite: false,
	image: spanishBread,
	ingredients: [
	"Flour","Yeast","Sugar","Butter","Bread crumbs"
	],
	steps: [
	"Prepare soft dough",
	"Add sweet crumb filling",
	"Roll tightly like a burrito",
	"Place on tray nicely",
	"Bake until golden and delicious"
	]
	},
	
	{
	id: 4,
	name: "Banana Shanghai",
	description: "Fried banana spring roll with caramelized sugar and jackfruit",
	price: 3.50,
	rating: 4.8,
	reviews: 210,
	category: "Fried",
	badge: "Best Seller",
	isNew: false,
	isFavorite: false,
	image: turon,
	ingredients: [
	"Saba banana","Brown sugar","Lumpia wrapper","Jackfruit","Cooking oil"
	],
	steps: [
	"Slice bananas like a pro",
	"Roll them in sugar goodness",
	"Wrap with lumpia wrapper tightly",
	"Fry until golden and crispy",
	"Try not to eat them immediately"
	]
	},
	
	{
	id: 5,
	name: "Banana Qt",
	description: "Deep fried saba bananas coated in caramelized brown sugar",
	price: 2.75,
	rating: 4.7,
	reviews: 150,
	category: "Fried",
	badge: "Street Favorite",
	isNew: false,
	isFavorite: false,
	image: bananaCue,
	ingredients: [
	"Saba bananas","Brown sugar","Cooking oil","Bamboo skewers"
	],
	steps: [
	"Fry bananas in hot oil",
	"Add brown sugar for caramel magic",
	"Let sugar coat the bananas",
	"Stick them on skewers",
	"Feel like a street food vendor"
	]
	},
	
	{
	id: 6,
	name: "Putotoy",
	description: "Soft steamed rice cake commonly paired with butter or cheese",
	price: 2.25,
	rating: 4.8,
	reviews: 170,
	category: "Steamed",
	badge: "Traditional",
	isNew: false,
	isFavorite: false,
	image: puto,
	ingredients: [
	"Rice flour","Sugar","Baking powder","Water","Cheese or butter"
	],
	steps: [
	"Mix batter until smooth",
	"Pour into tiny molds",
	"Steam until fluffy",
	"Add cheese on top",
	"Enjoy soft cloud-like puto"
	]
	},
	
	{
	id: 7,
	name: "Puto Kutsinta",
	description: "Chewy brown rice cake topped with freshly grated coconut",
	price: 2.50,
	rating: 4.7,
	reviews: 160,
	category: "Steamed",
	badge: "Traditional",
	isNew: false,
	isFavorite: false,
	image: kutsinta,
	ingredients: [
	"Rice flour","Brown sugar","Lye water","Annatto","Grated coconut"
	],
	steps: [
	"Mix ingredients until smooth",
	"Pour into molds carefully",
	"Steam until chewy magic happens",
	"Top with coconut snow",
	"Eat before others see it"
	]
	},
	
	{
	id: 8,
	name: "Bibingka Ni Inday",
	description: "Rice cake baked in banana leaves topped with salted egg and cheese",
	price: 4.50,
	rating: 4.9,
	reviews: 230,
	category: "Rice Cakes",
	badge: "Top Rated",
	isNew: false,
	isFavorite: true,
	image: bibingka,
	ingredients: [
	"Rice flour","Coconut milk","Eggs","Sugar","Salted egg","Cheese","Banana leaves"
	],
	steps: [
	"Mix batter like pancake royalty",
	"Line pan with banana leaves",
	"Bake until fluffy",
	"Add salted egg and cheese",
	"Serve warm and feel festive"
	]
	},
	
	{
	id: 9,
	name: "Puto ni Bongbong Marcos",
	description: "Purple steamed rice cake topped with coconut, butter, and brown sugar",
	price: 4.75,
	rating: 4.9,
	reviews: 210,
	category: "Rice Cakes",
	badge: "Seasonal",
	isNew: true,
	isFavorite: false,
	image: putoBumbong,
	ingredients: [
	"Purple rice flour","Butter","Brown sugar","Grated coconut"
	],
	steps: [
	"Steam purple rice mixture",
	"Push it out like a purple noodle",
	"Add butter immediately",
	"Sprinkle coconut and sugar",
	"Enjoy Christmas vibes anytime"
	]
	},
	
	{
	id: 10,
	name: "Bibiko",
	description: "Sticky rice desert cooked with coconut milk and topped with caramel latik",
	price: 3.75,
	rating: 4.8,
	reviews: 200,
	category: "Rice Cakes",
	badge: "Recommended",
	isNew: false,
	isFavorite: false,
	image: biko,
	ingredients: [
	"Sticky rice","Coconut milk","Brown sugar","Latik"
	],
	steps: [
	"Cook sticky rice first",
	"Add coconut milk and sugar",
	"Stir until thick and sweet",
	"Spread in tray",
	"Top with latik like a dessert boss"
	]
	},
	
	{
	id: 11,
	name: "Balanghoy Cake",
	description: "Rich balanghoy desert topped with creamy custard layer",
	price: 4.25,
	rating: 4.8,
	reviews: 190,
	category: "Dessert",
	badge: "Best Seller",
	isNew: false,
	isFavorite: false,
	image: cassavaCake,
	ingredients: [
	"Cassava","Coconut milk","Eggs","Sugar","Condensed milk"
	],
	steps: [
	"Mix cassava batter",
	"Bake until firm",
	"Add custard topping",
	"Bake again for creamy goodness",
	"Slice and share (or not)"
	]
	},
	
	{
	id: 12,
	name: "Letche Flan",
	description: "Rich caramel custard desert with smooth creamy texture",
	price: 4.50,
	rating: 4.9,
	reviews: 240,
	category: "Dessert",
	badge: "Top Rated",
	isNew: false,
	isFavorite: false,
	image: lecheFlan,
	ingredients: [
	"Egg yolks","Condensed milk","Evaporated milk","Sugar"
	],
	steps: [
	"Melt sugar until caramel magic",
	"Mix eggs and milk gently",
	"Pour mixture into mold",
	"Steam until silky smooth",
	"Flip carefully like a dessert ninja"
	]
	}
];

export const popularProducts = [
	{
	id: 1,
	name: "Malungay Pandesal",
	description: "Classic Filipino bread roll with a light crunchy crumb coating",
	price: 2.50,
	rating: 4.9,
	reviews: 320,
	category: "Bread",
	badge: "Best Seller",
	image: pandesal
	},
	{
	id: 2,
	name: "Banana Shanghai",
	description: "Crispy fried banana spring roll with caramelized sugar and jackfruit",
	price: 3.50,
	rating: 4.8,
	reviews: 240,
	category: "Fried Snack",
	badge: "Most Popular",
	image: turon
	},
	{
	id: 3,
	name: "Banana Qt",
	description: "Deep fried saba bananas coated with caramelized brown sugar",
	price: 2.75,
	rating: 4.7,
	reviews: 190,
	category: "Street Food",
	badge: "Street Favorite",
	image: bananaCue
	},
	{
	id: 4,
	name: "Ensaymader",
	description: "Soft buttery Filipino brioche topped with sugar, butter, and cheese",
	price: 5.99,
	rating: 5.0,
	reviews: 210,
	category: "Bread",
	badge: "Top Rated",
	image: ensaymada
	},
	{
	id: 5,
	name: "Putotoy",
	description: "Soft steamed rice cake commonly served with butter or cheese",
	price: 2.50,
	rating: 4.8,
	reviews: 175,
	category: "Steamed Rice Cake",
	badge: "Traditional",
	image: puto
	},
	{
	id: 6,
	name: "Bibingka Ni Inday",
	description: "Filipino rice cake baked in banana leaves topped with salted egg and cheese",
	price: 4.50,
	rating: 4.9,
	reviews: 220,
	category: "Rice Cake",
	badge: "Holiday Favorite",
	image: bibingka
	}
];

export const faqs = [
	{
	  question: "What kind of Filipino snacks do you sell?",
	  answer: "We offer a variety of popular Filipino merienda favorites such as pandesal, ensaymada, turon, puto, kutsinta, bibingka, sapin-sapin, and other traditional kakanin. Our goal is to bring the authentic taste of Filipino street snacks and bakery favorites to your home."
	},
	{
	  question: "Are your snacks freshly made?",
	  answer: "Yes! Our Filipino snacks are prepared fresh daily using traditional recipes. Many of our products like pandesal, turon, and kakanin are made the same day to ensure the best taste and quality."
	},
	{
	  question: "Can I order snacks for parties or events?",
	  answer: "Absolutely! You can place bulk or custom orders for birthdays, gatherings, meetings, or special events. We recommend placing your order at least 1–2 days in advance for large quantities."
	},
	{
	  question: "Do you offer delivery or online ordering?",
	  answer: "Yes, you can conveniently order through our website. We offer delivery and pickup options depending on your location and order size."
	},
	{
	  question: "What is the best time to enjoy Filipino merienda snacks?",
	  answer: "Filipino merienda is usually enjoyed in the morning or afternoon as a light snack between meals. Our snacks pair perfectly with coffee, hot chocolate, or soft drinks."
	},
	{
	  question: "How should I store kakanin or Filipino snacks?",
	  answer: "Most kakanin like sapin-sapin, kutsinta, and bibingka are best eaten fresh. If you need to store them, keep them in a sealed container in the refrigerator and reheat lightly before serving."
	},
	{
	  question: "Do you add preservatives to your snacks?",
	  answer: "No. Our products are made using fresh ingredients and traditional preparation methods without artificial preservatives to maintain authentic flavor and quality."
	},
	{
	  question: "What makes your Filipino snacks special?",
	  answer: "Our snacks are inspired by traditional Filipino recipes and classic merienda favorites. We focus on homemade taste, quality ingredients, and bringing nostalgic Filipino flavors to every customer."
	}
];

export const reviews = [
	{
	id: 1,
	name: 'Maria Santos',
	rating: 5,
	date: 'March 1, 2026',
	comment: 'The pandesal here is simply amazing! Soft on the inside with a slight crunch on the outside. I buy it every morning for my family.',
	avatar: 'MS'
	},
	{
	id: 2,
	name: 'Juan Dela Cruz',
	rating: 5,
	date: 'February 28, 2026',
	comment: 'Turon and banana cue are so delicious and perfectly caramelized. The flavors remind me of my childhood street snacks.',
	avatar: 'JD'
	},
	{
	id: 3,
	name: 'Angelica Reyes',
	rating: 4,
	date: 'February 25, 2026',
	comment: 'Bibingka and puto bumbong are fresh and taste authentic! Great for the holiday season or anytime I crave Filipino desserts.',
	avatar: 'AR'
	},
	{
	id: 4,
	name: 'Roberto Lim',
	rating: 5,
	date: 'February 22, 2026',
	comment: 'Ensaymada is fluffy and buttery, just like the ones from my hometown bakery. My kids loved it!',
	avatar: 'RL'
	},
	{
	id: 5,
	name: 'Clarisse Mendoza',
	rating: 5,
	date: 'February 20, 2026',
	comment: 'Biko and cassava cake are rich and perfectly sweet. The textures are spot on, and the latik topping is heavenly!',
	avatar: 'CM'
	},
	{
	id: 6,
	name: 'Mark Villanueva',
	rating: 4,
	date: 'February 18, 2026',
	comment: 'Kutsinta and sapin-sapin are very tasty. Fresh and authentic Filipino flavors—I highly recommend trying them all!',
	avatar: 'MV'
	}
];

export const overallStats = {
	averageRating: 4.8,
	totalReviews: 542,
	breakdown: [
		{ stars: 5, percentage: 78 },
		{ stars: 4, percentage: 16 },
		{ stars: 3, percentage: 4 },
		{ stars: 2, percentage: 1 },
		{ stars: 1, percentage: 1 }
	]
};

export const journey = [
	{
	year: '2015',
	title: 'Humble Beginnings',
	description: 'The owner started Pinoy Bites in a small kitchen, making classic Filipino snacks like pandesal, puto, and turon for friends and family.'
	},
	{
	year: '2017',
	title: 'Growing Popularity',
	description: 'Word spread in the community, and Pinoy Bites became known for authentic flavors and freshly made kakanin.'
	},
	{
	year: '2019',
	title: 'Celebrating Tradition',
	description: 'Expanded the menu to include more traditional snacks like bibingka, biko, and puto bumbong, keeping recipes true to Filipino heritage.'
	},
	{
	year: '2021',
	title: 'Community Recognition',
	description: 'Featured in local food blogs and praised for preserving authentic Filipino merienda while innovating with unique flavors.'
	},
	{
	year: '2024',
	title: 'Online & Expansion',
	description: 'Launched online ordering and delivery, making it easier for snack lovers nationwide to enjoy authentic Filipino treats.'
	},
	{
	year: '2026',
	title: 'Today',
	description: 'Serving hundreds of happy customers daily with over 50 types of Filipino snacks and kakanin, all crafted with love, care, and tradition.'
	}
];


export const mockProducts: Product[] = [
	{ id: 1, name: 'Classic Pandesal', price: 50, stock: 120, category: 'Bread', sold: 450 },
	{ id: 2, name: 'Ube Pandesal', price: 70, stock: 80, category: 'Bread', sold: 280 },
	{ id: 3, name: 'Cheese Pandesal', price: 65, stock: 95, category: 'Bread', sold: 320 },
	{ id: 4, name: 'Spanish Bread', price: 60, stock: 110, category: 'Pastry', sold: 390 },
	{ id: 5, name: 'Ensaymada', price: 80, stock: 60, category: 'Pastry', sold: 210 },
	{ id: 6, name: 'Monay', price: 55, stock: 100, category: 'Bread', sold: 340 },
];

export const mockOrders: Order[] = [
  {
    id: 'ORD-001',
    customer: 'Juan Dela Cruz',
    phone: '+63 917 123 4567',
    items: 'Classic Pandesal (2x), Ube Pandesal (1x)',
    total: 170,
    status: 'pending',
    date: '2026-03-08',
    time: '06:00',
    address: '123 Main St, Quezon City',
    location: { lat: 14.6760, lng: 121.0437, address: '123 Main St, Quezon City' }
  },
  {
    id: 'ORD-002',
    customer: 'Maria Santos',
    phone: '+63 918 234 5678',
    items: 'Ensaymada (1x), Spanish Bread (1x)',
    total: 140,
    status: 'confirmed',
    date: '2026-03-08',
    time: '08:00',
    address: '456 Oak Ave, Manila',
    location: { lat: 14.5995, lng: 120.9842, address: '456 Oak Ave, Manila' }
  },
  {
    id: 'ORD-003',
    customer: 'Pedro Garcia',
    phone: '+63 919 345 6789',
    items: 'Cheese Pandesal (3x)',
    total: 195,
    status: 'delivered',
    date: '2026-03-07',
    time: '06:00',
    address: '789 Pine Rd, Makati',
    location: { lat: 14.5547, lng: 121.0244, address: '789 Pine Rd, Makati' }
  },
  {
    id: 'ORD-004',
    customer: 'Ana Reyes',
    phone: '+63 920 456 7890',
    items: 'Monay (2x), Classic Pandesal (1x)',
    total: 160,
    status: 'cancelled',
    date: '2026-03-07',
    time: '14:00',
    address: '321 Elm St, Pasig',
    location: { lat: 14.5764, lng: 121.0851, address: '321 Elm St, Pasig' }
  },
];

export const mockCustomers: Customer[] = [
	{ id: 1, name: 'Juan Dela Cruz', email: 'juan@example.com', phone: '+63 917 123 4567', orders: 12, totalSpent: 2400 },
	{ id: 2, name: 'Maria Santos', email: 'maria@example.com', phone: '+63 918 234 5678', orders: 8, totalSpent: 1600 },
	{ id: 3, name: 'Pedro Garcia', email: 'pedro@example.com', phone: '+63 919 345 6789', orders: 15, totalSpent: 3200 },
	{ id: 4, name: 'Ana Reyes', email: 'ana@example.com', phone: '+63 920 456 7890', orders: 5, totalSpent: 980 },
];
