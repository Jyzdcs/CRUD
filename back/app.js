import express from "express";

const app = express();

app.use(express.json());
const api = [];

app.get("/", (req, res) => {
  res.json(api);
});

app.get("/:id", (req, res) => {
  const { id } = req.params;
  const user = api.find((user) => user.id === parseInt(id));
  res.json(user);
});

app.get("/produits", (req, res) => {
  res.json(produits);
});

app.post("/produits", (req, res) => {
  const { nom, prix } = req.body;

  if (!nom || !prix) {
    return res.status(400).json({ message: "Nom et prix obligatoires !" }); // 400 = Mauvaise requête
  }

  api.push({ id: api.length + 1, nom, prix });
  res.status(201).json(api); // 201 = Créé avec succès
});

app.put("/produits/:id", (req, res) => {
  const { id } = req.params;
  const { nom, prix } = req.body;
  const produit = api.find((produit) => produit.id === parseInt(id));
  if (!produit) {
    return res.status(404).json({ message: "Produit non trouvé !" }); // 404 = Non trouvé
  }
  produit.nom = nom;
  produit.prix = prix;
  res.json(produit);
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
