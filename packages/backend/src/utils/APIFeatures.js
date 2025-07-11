class APIFeatures {
  /**
   * Crée une instance d'APIFeatures.
   * @param {import('mongoose').Query} query - La requête Mongoose (ex: Product.find()).
   * @param {object} queryString - L'objet de querystring de la requête Express (req.query).
   */
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  /**
   * Applique le filtrage à la requête.
   * Gère les opérateurs de comparaison (gte, gt, lte, lt).
   * Ex: ?price[gte]=100&status=active
   */
  filter() {
    // 1A) Créer une copie de l'objet de querystring
    const queryObj = { ...this.queryString };

    // 1B) Exclure les champs spéciaux (pagination, tri, etc.)
    const excludedFields = ['page', 'sort', 'limit', 'fields'];
    excludedFields.forEach((el) => delete queryObj[el]);

    // 1C) Filtrage avancé (opérateurs de comparaison)
    let queryStr = JSON.stringify(queryObj);
    // Ajoute le '$' devant les opérateurs pour que Mongoose les comprenne
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);

    this.query = this.query.find(JSON.parse(queryStr));

    return this; // Permet de chaîner les méthodes
  }

  /**
   * Applique le tri à la requête.
   * Ex: ?sort=-price,name
   */
  sort() {
    if (this.queryString.sort) {
      // Remplace la virgule par un espace pour Mongoose
      const sortBy = this.queryString.sort.split(',').join(' ');
      this.query = this.query.sort(sortBy);
    } else {
      // Tri par défaut (par date de création décroissante)
      this.query = this.query.sort('-createdAt');
    }
    return this;
  }

  /**
   * Applique la sélection de champs (projection).
   * Ex: ?fields=name,price,category
   */
  limitFields() {
    if (this.queryString.fields) {
      const fields = this.queryString.fields.split(',').join(' ');
      this.query = this.query.select(fields);
    } else {
      // Exclure le champ __v par défaut
      this.query = this.query.select('-__v');
    }
    return this;
  }

  /**
   * Applique la pagination à la requête.
   * Ex: ?page=2&limit=10
   */
  paginate() {
    // Convertir en nombre, avec des valeurs par défaut
    const page = parseInt(this.queryString.page, 10) || 1;
    const limit = parseInt(this.queryString.limit, 10) || 100; // Limite par défaut à 100
    const skip = (page - 1) * limit;

    this.query = this.query.skip(skip).limit(limit);

    return this;
  }

  /**
   * Applique la recherche textuelle à la requête si un paramètre 'search' est présent.
   * Doit être appelée AVANT la méthode .filter()
   * Ex: ?search=casque+bluetooth
   */
  search() {
    if (this.queryString.search) {
      this.query = this.query.find(
        { $text: { $search: this.queryString.search } },
        { score: { $meta: 'textScore' } }, // un champ 'score' pour la pertinence
        // { score: { $meta: "textScore" } } est une astuce très puissante : elle demande à MongoDB de créer un champ virtuel score sur chaque résultat, indiquant sa pertinence. Nous pourrons ensuite trier par ce score.
      );
    }
    return this;
  }
}

export { APIFeatures };
