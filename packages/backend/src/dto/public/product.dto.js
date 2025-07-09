/**
 * Data Transfer Object pour un produit destiné au Store Front public.
 * Il transforme un document Mongoose "Product" complet en une structure
 * de données simplifiée et formatée, telle qu'attendue par le client.
 */
class PublicProductDto {
  constructor(product) {
    // Fonction utilitaire pour formater les prix
    const formatPrice = (priceValue) => {
      if (typeof priceValue !== 'number') return null;
      return `$${priceValue.toFixed(2)}`;
    };

    // Mapping des champs
    this.id = product._id;
    this.title = product.name;
    this.image = product.images && product.images.length > 0 ? product.images[0] : null;
    this.brand = product.brand;
    this.review = Math.round(product.averageRating);
    this.price = formatPrice(product.price);
    this.offer_price = formatPrice(product.offerPrice);
    this.campaingn_product = product.isCampaignProduct;
    this.product_type = product.category;

    // Champs statiques requis par le frontend mais non présents dans notre modèle
    this.cam_product_available = null;
    this.cam_product_sale = null;
  }
}

export { PublicProductDto };
