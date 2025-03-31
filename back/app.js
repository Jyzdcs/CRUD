import express from "express";
import client from "./db.js";

class Product {
  constructor(id, name, price) {
    this.id = id;
    this.name = name;
    this.price = price;
  }
}

class Cart {
  constructor(id, products, totalPrice) {
    this.id = id;
    this.products = products;
    this.totalPrice = totalPrice;
  }

  addProduct(product) {
    this.products.push(product);
  }

  removeProduct(product) {
    this.products = this.products.filter((p) => p !== product);
  }

  printCart() {
    console.log(this.products);
  }
}

class User {
  constructor(id, name, email) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.cart = new Cart(id, [], 0);
  }

  introduce() {
    console.log(`Hello, my name is ${this.name}`);
  }
}

const main = () => {
  const user = new User(1, "John", "john@example.com");
  user.introduce();
  user.cart.addProduct(new Product(1, "Telephone", 100));
  user.cart.printCart();
};

main();

// const app = express();

// app.use(express.json());

// app.get("/users", async (req, res) => {
//   try {
//     const result = await client.query("SELECT * FROM users");
//     res.json(result.rows);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// app.post("/users", async (req, res) => {
//   const { name, email, age } = req.body;
//   console.log(name, email, age);
//   try {
//     const result = await client.query(
//       "INSERT INTO users (name, email, age) VALUES ($1, $2, $3) RETURNING *",
//       [name, email, age]
//     );
//     res.json(result.rows[0]);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// app.put("/users/:id", async (req, res) => {
//   const { id } = req.params;
//   const { name, email, age } = req.body;
//   try {
//     const result = await client.query(
//       "UPDATE users SET name = $1, email = $2, age = $3 WHERE id = $4 RETURNING *",
//       [name, email, age, id]
//     );
//     res.json(result.rows[0]);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// app.listen(3000, () => {
//   console.log("Server is running on port 3000");
// });
