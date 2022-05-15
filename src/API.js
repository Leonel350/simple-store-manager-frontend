export default class API {
   static async getProducts() {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/products`);
      const data = await response.json();
      return data;
   }
   static async getProduct(id) {
      const response = await fetch(
         `${process.env.REACT_APP_API_URL}/products/${id}`
      );
      const data = await response.json();
      return data;
   }
   static async createProduct(product) {
      const response = await fetch(
         `${process.env.REACT_APP_API_URL}/products`,
         {
            method: "POST",
            headers: {
               "Content-Type": "application/json",
            },
            body: JSON.stringify(product),
         }
      );
      const data = await response.json();
      return data;
   }
   static async updateProduct(id, product) {
      const response = await fetch(
         `${process.env.REACT_APP_API_URL}/products/${id}`,
         {
            method: "PUT",
            headers: {
               "Content-Type": "application/json",
            },
            body: JSON.stringify({ ...product, id }),
         }
      );
      const data = await response.json();
      return data;
   }
   static async deleteProduct(id) {
      const response = await fetch(
         `${process.env.REACT_APP_API_URL}/products/${id}`,
         {
            method: "DELETE",
            headers: {
               "Content-Type": "application/json",
            },
         }
      );
      const data = await response.json();
      return data;
   }

   static async getProviders() {
      const response = await fetch(
         `${process.env.REACT_APP_API_URL}/providers`
      );
      const data = await response.json();
      return data;
   }

   static async getLastSales() {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/sales/last`);
      const data = await response.json();
      return data;
   }

   static async getProvider(id) {
      const response = await fetch(
         `${process.env.REACT_APP_API_URL}/providers/${id}`
      );
      const data = await response.json();
      return data;
   }

   static async createProvider(provider) {
      const response = await fetch(
         `${process.env.REACT_APP_API_URL}/providers`,
         {
            method: "POST",
            headers: {
               "Content-Type": "application/json",
            },
            body: JSON.stringify(provider),
         }
      );
      const data = await response.json();
      return data;
   }

   static async updateProvider(id, provider) {
      const response = await fetch(
         `${process.env.REACT_APP_API_URL}/providers/${id}`,
         {
            method: "PUT",
            headers: {
               "Content-Type": "application/json",
            },
            body: JSON.stringify({ ...provider, id }),
         }
      );
      const data = await response.json();
      return data;
   }

   static async deleteProvider(id) {
      const response = await fetch(
         `${process.env.REACT_APP_API_URL}/providers/${id}`,
         {
            method: "DELETE",
            headers: {
               "Content-Type": "application/json",
            },
         }
      );
      const data = await response.json();
      return data;
   }

   static async getSales() {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/sales`);
      const data = await response.json();
      return data;
   }

   static async getSale(id) {
      const response = await fetch(
         `${process.env.REACT_APP_API_URL}/sales/${id}`
      );
      const data = await response.json();
      return data;
   }

   static async createSale(sale) {
      const response = await fetch(
         `${process.env.REACT_APP_API_URL}/sales`,
         {
            method: "POST",
            headers: {
               "Content-Type": "application/json",
            },
            body: JSON.stringify(sale),
         }
      );
      const data = await response.json();
      return data;
   }

   static async updateSale(id, sale) {
      const response = await fetch(
         `${process.env.REACT_APP_API_URL}/sales/${id}`,
         {
            method: "PUT",
            headers: {
               "Content-Type": "application/json",
            },
            body: JSON.stringify({ ...sale, id }),
         }
      );
      const data = await response.json();
      return data;
   }

   static async deleteSale(id) {
      const response = await fetch(
         `${process.env.REACT_APP_API_URL}/sales/${id}`,
         {
            method: "DELETE",
            headers: {
               "Content-Type": "application/json",
            },
         }
      );
      const data = await response.json();
      return data;
   }

   static async getCategories() {
      return [
         { name: "Plantas" },
         { name: "Frutas" },
         { name: "Verduras" },
         { name: "Carnes" },
         { name: "Lácteos" },
         { name: "Bebidas" },
         { name: "Otros" },
      ];
      // const response = await fetch(`${process.env.REACT_APP_API_URL}/categories`);
      // const data = await response.json();
      // return data;
   }
}
