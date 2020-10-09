// Our product database.
const sampleProducts = [
  {
    id: 1,
    name: "Pomidor",
    category: "Warzywa",
    price: 4.50,
    description:
      "Pomidor luz.",
    popular: true,
    imageUrls: [
      "https://upload.wikimedia.org/wikipedia/commons/8/89/Tomato_je.jpg",
      "https://www.tomato-academy.pl/files/news/trudnosci-w-uprawie-pomidorow-miesistych.extradena%20(2)%20-%20copy.jpg"
    ]
  },
  {
    id: 7,
    name: "Jabłka champion",
    category: "Owoce",
    price: 3.00,
    description: "",
    popular: false,
    imageUrls: [
      "https://imgusr.tradekey.com/p-8320367-20131001075106/apples-champion-apple-fresh-apples.jpg"
    ]
  },
  {
    id: 8,
    name: "Ogórek",
    category: "Warzywa",
    price: 2.55,
    description: "Gruntowy, świeży",
    popular: false,
    imageUrls: [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRzYXcc6qBJvaR6wJ82IoZ-uwogoWLgvr9f9w&usqp=CAU",
    ]
  },
  {
    id: 9,
    name: "Truskawki",
    category: "Owoce",
    price: 8.00,
    description: "",
    popular: false,
    imageUrls: [
      "https://minnesotagrown.com/wp-content/uploads/2018/12/2018-03-02-Submitted-Miracle-Strawberry-Farm-Strawberries.jpg"
    ]
  }
];

// List of item categories.
const categories = [
  {
    name: "All categories",
    icon: "list"
  },
  {
    name: "Warzywa",
    icon: "group"
  },
  {
    name: "Owoce",
    icon: "watch"
  }
];

// Data for rendering menu.
const dataForTheMenu = [
  { name: "Home page", url: "/", icon: "home", id: 0 },
  {
    name: "Product categories",
    id: 1,
    children: categories.map((x, i) => {
      return {
        name: x.name,
        id: i,
        url: "/?category=" + x.name,
        icon: x.icon
      };
    })
  }
];

export { sampleProducts, categories, dataForTheMenu };
