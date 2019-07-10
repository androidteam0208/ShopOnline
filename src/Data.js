// Our product database.
import firebase from 'firebase';
import axios from 'axios';
const firebaseConfig = {
  apiKey: "AIzaSyCxy_rab5TtJqnan1wdhKmBA0MM1XoxsNM",
  authDomain: "shoponline-5fa44.firebaseapp.com",
  databaseURL: "https://shoponline-5fa44.firebaseio.com",
  projectId: "shoponline-5fa44",
  storageBucket: "",
  messagingSenderId: "667882596",
  appId: "1:667882596:web:0c76da45a474e23b"
};
firebase.initializeApp(firebaseConfig);

const defaultState = {
  categoryMenu : []
} 

/*function writeProductData() {
  var data = {
    id: sampleProducts[i].id,
    name: sampleProducts[i].name,
    category: sampleProducts[i].category,
    price: sampleProducts[i].price,
    description: sampleProducts[i].description,
    popular: sampleProducts[i].popular,
    imageUrls: sampleProducts[i].imageUrls
  }
  var updates = {};
  updates['/Product/item' + sampleProducts[i].id] = data;
  firebase.database().ref().update(updates);
  alert("save success !");
} */


const sampleProducts = [
  {
    id: 1,
    name: "Nike Air Presto",
    category: "Clothing and Shoes",
    price: 55,
    description:
      "The Nike Air Presto Women's Shoe delivers the same unrivaled fit and comfort that marked the 2000 debut of the original.",
    popular: true,
    imageUrls: [
      "./../img/nike1.jpg",
      "./../img/nike2.jpg"
    ]
  },
  {
    id: 2,
    name: "Seiko Silvertone Black Dial Solar Calendar Watch",
    category: "Jewelry and Watches",
    price: 200,
    description:
      "* 36 mm stainless steel case with mineral dial window\n" +
      "* Automatic self-wind movement with analog display\n" +
      "* Stainless steel bracelet with fold-over clasp",
    popular: false,
    imageUrls: [
      "./../img/watch1.jpg"
    ]
  },
  {
    id: 3,
    name: "Casio F-91W-1XY",
    category: "Jewelry and Watches",
    price: 101,
    description:
      "Shaped in an iconic casio design, this watch features a digital display, stopwatch and an LED backlight. The watch is housed in a durable resin case. Suitable for everyday styling.",

    popular: false,
    imageUrls: [
      "./../img/watch2.jpg"
    ]
  },

  {
    id: 4,
    name: "Harry Potter",
    category: "Books",
    price: 24,
    description:
      "Harry Potter is an ordinary boy who lives in a cupboard under the stairs at his Aunt Petunia" +
      "and Uncle Vernon's house, which he thinks is normal for someone like him who's parents have been killed in" +
      "a 'car crash'. He is bullied by them and his fat, spoilt cousin Dudley, and lives a very unremarkable life" +
      "with only the odd hiccup (like his hair growing back overnight!) to cause him much to think about. That is" +
      "until an owl turns up with a letter addressed to Harry and all hell breaks loose! He is literally rescued by a world where nothing is as it seems and magic lessons are the order of the day. Read and find out how Harry discovers his true heritage at Hogwarts School of Wizardry and Witchcraft, the reason behind his parents mysterious death, who is out to kill him, and how he uncovers the most amazing secret of all time, the fabled Philosopher's Stone! All this and muggles too. Now, what are they?",

    popular: false,
    imageUrls: [
      "./../img/book1.jpg"
    ]
  },
  {
    id: 5,
    name: "Sam Sung ",
    category: "Computers",
    price: 220,
    description:
      "* Amazing angles: Share consistent high-color fidelity with In-Plane Switching (IPS) technology across a 27-inch diagonal screen. A stunning vantage point for everyone, from almost anywhere\n" +
      "* Distinctively modern and accessible: The contemporary thin profile is enhanced by the modern white and silver colors.The open wedge stand design provides convenient access to VGA and dual HDMI ports",

    popular: true,
    imageUrls: [
      "./../img/phone1.jpg",
      "./../img/phone2.jpg"
    ]
  },

  {
    id: 7,
    name: "Swatch Skin",
    category: "Jewelry and Watches",
    price: 200,
    description: "",
    popular: true,
    imageUrls: [
      "./../img/watch3.jpg"
    ]
  },
  {
    id: 8,
    name: "Converse",
    category: "Clothing and Shoes",
    price: 55,
    description: "",
    popular: true,
    imageUrls: [
      "./../img/sneaker1.jpg"
    ]
  },
  {
    id: 9,
    name: "Keyboard, Vive Comb Rechargeable",
    category: "Computers",
    price: 160,
    description: "",
    popular: true,
    imageUrls: [
      "./../img/keyboard1.jpg"
    ]
  },
  {
    id: 10,
    name: "Swatch Blue Suit Mens Watch YGS747 Wrist Watch",
    category: "Jewelry and Watches",
    price: 120,
    description: "",

    popular: false,
    imageUrls: [
      "./../img/watch4.jpg"
    ]
  },
  {
    id: 11,
    name: "Iphone",
    category: "Computers",
    price: 220,
    description:
      "This Certified Refurbished product is tested and certified to look and work like new. The refurbishing process includes functionality testing, basic cleaning, inspection, and repackaging. The product ships with all relevant accessories, a minimum 90-day warranty, and may arrive in a generic box. Only select sellers who maintain a high performance bar may offer Certified Refurbished products on Amazon.com",
    popular: true,
    imageUrls: [
      "./../img/phone3.jpg"
    ]
  },
  {
    id: 12,
    name: "Invicta Men's Pro Diver Collection Watch -Black",
    category: "Jewelry and Watches",
    price: 130,
    description:
      "Water resistant to 200 m (660 ft): In general, suitable for professional marine activity and serious surface water sports, but not scuba diving",

    popular: true,
    imageUrls: [
      "./../img/watch5.jpg",
      "./../img/watch5_1.jpg"
    ]
  },
  {
    id: 13,
    name: "Harry Potter ",
    category: "Books",
    price: 22,
    description:
      "Harry Potter is an ordinary boy who lives in a cupboard under the stairs at his Aunt Petunia" +
      "and Uncle Vernon's house, which he thinks is normal for someone like him who's parents have been killed in" +
      "a 'car crash'. He is bullied by them and his fat, spoilt cousin Dudley, and lives a very unremarkable life" +
      "with only the odd hiccup (like his hair growing back overnight!) to cause him much to think about. That is" +
      "until an owl turns up with a letter addressed to Harry and all hell breaks loose! He is literally rescued by a world where nothing is as it seems and magic lessons are the order of the day. Read and find out how Harry discovers his true heritage at Hogwarts School of Wizardry and Witchcraft, the reason behind his parents mysterious death, who is out to kill him, and how he uncovers the most amazing secret of all time, the fabled Philosopher's Stone! All this and muggles too. Now, what are they?",

    popular: false,
    imageUrls: [
      "./../img/book2.jpg"
    ]

  },
  {
    id: 14,
    name: "Harry Potter ",
    category: "Books",
    price: 25,
    description:
      "Harry Potter is an ordinary boy who lives in a cupboard under the stairs at his Aunt Petunia" +
      "and Uncle Vernon's house, which he thinks is normal for someone like him who's parents have been killed in" +
      "a 'car crash'. He is bullied by them and his fat, spoilt cousin Dudley, and lives a very unremarkable life" +
      "with only the odd hiccup (like his hair growing back overnight!) to cause him much to think about. That is" +
      "until an owl turns up with a letter addressed to Harry and all hell breaks loose! He is literally rescued by a world where nothing is as it seems and magic lessons are the order of the day. Read and find out how Harry discovers his true heritage at Hogwarts School of Wizardry and Witchcraft, the reason behind his parents mysterious death, who is out to kill him, and how he uncovers the most amazing secret of all time, the fabled Philosopher's Stone! All this and muggles too. Now, what are they?",

    popular: false,
    imageUrls: [
      "./../img/book3.jpg"
    ]

  },
  {
    id: 15,
    name: "Adidas Sneaker ",
    category: "Clothing and Shoes",
    price: 120,
    description:
      "These running shoes combine comfort and high-performance technology for a best-ever-run feeling. They have a stretchy knit upper that adapts to the changing shape of your foot as you run. Responsive midsole cushioning and a flexible outsole deliver a smoo",

    popular: false,
    imageUrls: [
      "./../img/sneaker2.jpg"
    ]

  },
  {
    id: 16,
    name: "Adidas Sandal ",
    category: "Clothing and Shoes",
    price: 80,
    description:
      "These running shoes combine comfort and high-performance technology for a best-ever-run feeling. They have a stretchy knit upper that adapts to the changing shape of your foot as you run. Responsive midsole cushioning and a flexible outsole deliver a smoo",

    popular: false,
    imageUrls: [
      "./../img/sneaker3.jpg"
    ]

  },
  {
    id: 17,
    name: "Adidas T-shirt ",
    category: "Clothing and Shoes",
    price: 120,
    description:
      "This iconic 3-Stripes tee became an instant classic when it debuted in 1973. It's updated for today's streets but keeps true to its adidas archive roots. This t-shirt comes in soft cotton jersey.",

    popular: false,
    imageUrls: [
      "./../img/clothe1.jpg"
    ]

  },
  {
    id: 18,
    name: "NewBalance T-shirt ",
    category: "Clothing and Shoes",
    price: 120,
    description:
      "These running shoes combine comfort and high-performance technology for a best-ever-run feeling. They have a stretchy knit upper that adapts to the changing shape of your foot as you run. Responsive midsole cushioning and a flexible outsole deliver a smoo",

    popular: false,
    imageUrls: [
      "./../img/clothe2.jpg"
    ]

  },
  {
    id: 19,
    name: "NewBalance Sneaker ",
    category: "Clothing and Shoes",
    price: 120,
    description:
      "These running shoes combine comfort and high-performance technology for a best-ever-run feeling. They have a stretchy knit upper that adapts to the changing shape of your foot as you run. Responsive midsole cushioning and a flexible outsole deliver a smoo",

    popular: false,
    imageUrls: [
      "./../img/sneaker4.jpg"
    ]

  },
  {
    id: 20,
    name: "NewBalance Sneaker ",
    category: "Clothing and Shoes",
    price: 120,
    description:
      "These running shoes combine comfort and high-performance technology for a best-ever-run feeling. They have a stretchy knit upper that adapts to the changing shape of your foot as you run. Responsive midsole cushioning and a flexible outsole deliver a smoo",

    popular: false,
    imageUrls: [
      "./../img/sneaker5.jpg"
    ]

  },
  {
    id: 21,
    name: "NewBalance Sneaker ",
    category: "Clothing and Shoes",
    price: 120,
    description:
      "These running shoes combine comfort and high-performance technology for a best-ever-run feeling. They have a stretchy knit upper that adapts to the changing shape of your foot as you run. Responsive midsole cushioning and a flexible outsole deliver a smoo.",

    popular: false,
    imageUrls: [
      "./../img/sneaker6.jpg"
    ]

  },
  {
    id: 22,
    name: "Keyboard, Vive Comb Rechargeable",
    category: "Computers",
    price: 160,
    description: "A computer keyboard is a typewriter-style device which uses an arrangement of buttons or keys to act as mechanical levers or electronic switches.",
    popular: true,
    imageUrls: [
      "./../img/keyboard6.jpg",
      "./../img/keyboard1.jpg",
      "./../img/keyboard4.jpg"
    ]
  },
  {
    id: 23,
    name: "Keyboard, Vive Comb Rechargeable",
    category: "Computers",
    price: 160,
    description: "A computer keyboard is a typewriter-style device which uses an arrangement of buttons or keys to act as mechanical levers or electronic switches.",
    popular: true,
    imageUrls: [
      "./../img/keyboard4.jpg",
      "./../img/keyboard5.jpg"
    ]
  },
  {
    id: 25,
    name: "Keyboard, Vive Comb Rechargeable",
    category: "Computers",
    price: 160,
    description: "A computer keyboard is a typewriter-style device which uses an arrangement of buttons or keys to act as mechanical levers or electronic switches.",
    popular: false,
    imageUrls: [
      "./../img/keyboard5.jpg",
      "./../img/keyboard4.jpg",
    ]
  },

];
// List of item categories.
const categories = [
  {
    name: "All categories",
    icon: "fas fa-list"
  },
  {
    name: "Clothing and Shoes",
    icon: "fas fa-tshirt"
  },
  {
    name: "Jewelry and Watches",
    icon: "far fa-gem"
  },
  {
    name: "Books",
    icon: "fas fa-book"
  },
  {
    name: "Computers",
    icon: "fas fa-desktop"
  }
];

// Generate data for rendering menu on the left.  ------------ start custom firebase data
const dataForRenderingMenu = ((categories) => {
  let menuData = [
    // { type: "item", name: "Home page", url: "/", id: 0, icon: "fas fa-home" },
    { type: "title", name: "Product categories", id: 1 }
  ];

  let initialLength = menuData.length;

  menuData = menuData.concat(
    categories.map((x, i) => {
      return {
        name: x.name,
        url: "/search/?category=" + x.name,
        id: initialLength + i,
        type: "item",
        parentID: 1,
        icon: x.icon
      };
    })
  );

  return menuData;
})(categories)

const dataForRenderingMenuXX = (() => {
  let menuData = [];
  firebase.database().ref('/Categories/').once('value', function (snapshot) {
    snapshot.forEach(function (childSnapshot) {
      menuData = menuData.concat(childSnapshot.val());
    });
    console.log(menuData);
  });

  return menuData;
})(categories)

// const getMenuData = () => {
//   return dispatch => { 
//       axios({
//           url: 'https://shoponline-5fa44.firebaseio.com/Categories.json',
//           method: 'GET'
//       }).then(result => {
//           console.log(result.data);
//           dispatch({
//               type:types.GET_MENU_DATA,
//               categoryMenu:result.data
//           })
//       }).catch(erorr => {
//           console.log(erorr.respone.data);
//       })
//     }
// }


const sampleProductsxx = (() => {
  let products = [];
  firebase.database().ref('/Product/').once('value', function (snapshot) {
    snapshot.forEach(function (item) {
      let childData = item.val();
      products = products.concat(childData);
    });

  });

  return products;
})(categories)


// end custom firebase data
export { sampleProducts, categories, dataForRenderingMenu };
