
export default class API {

    static async getProducts(){
        const response = await fetch(`${process.env.REACT_APP_API_URL}/products`);
        const data = await response.json();
        return data;
    }
    static async getProduct(id){
        const response = await fetch(`${process.env.REACT_APP_API_URL}/products/${id}`);
        const data = await response.json();
        return data;
    }
    static async createProduct(product){
        const response = await fetch(`${process.env.REACT_APP_API_URL}/products`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(product)
        });
        const data = await response.json();
        return data;
    }
    static async updateProduct(id, product){
        const response = await fetch(`${process.env.REACT_APP_API_URL}/products/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({...product, id})
        });
        const data = await response.json();
        return data;
    }
    static async deleteProduct(id){
        const response = await fetch(`${process.env.REACT_APP_API_URL}/products/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const data = await response.json();
        return data;
    }

    static async getProviders(){
        const response = await fetch(`${process.env.REACT_APP_API_URL}/providers`);
        const data = await response.json();
        return data;
    }

    static async getCategories(){
        return [{name:"Plantas"},{name:"Frutas"},{name:"Verduras"},{name:"Carnes"},{name:"Lácteos"},{name:"Bebidas"},{name:"Otros"}];
        // const response = await fetch(`${process.env.REACT_APP_API_URL}/categories`);
        // const data = await response.json();
        // return data;
    }

}
