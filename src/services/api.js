const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export const fetchCategories = async () => {
  const response = await fetch(`${API_URL}/categories`);
  if (!response.ok) {
    throw new Error('Failed to fetch categories');
  }
  return response.json();
};

export const fetchItemsByCategory = async (categoryId) => {
  const response = await fetch(`${API_URL}/items?categoryId=${categoryId}`);
  if (!response.ok) {
    throw new Error('Failed to fetch items');
  }
  return response.json();
};

export const fetchIngredientsByItem = async (itemId) => {
    const [linkedResponse, allResponse] = await Promise.all([
      fetch(`${API_URL}/items/${itemId}/ingredients`),
      fetch(`${API_URL}/ingredients`),
    ]);
  
    if (!linkedResponse.ok || !allResponse.ok) {
      throw new Error('Failed to fetch ingredients');
    }
  
    const linkedIngredients = await linkedResponse.json();
    const allIngredients = await allResponse.json();
  
    const availableIngredients = allIngredients.filter(
      (ingredient) => !linkedIngredients.some((li) => li.id === ingredient.id)
    );
  
    return { linkedIngredients, availableIngredients };
  };

export const fetchMenus = async () => {
  const response = await fetch(`${API_URL}/menus`);
  if (!response.ok) {
    throw new Error('Failed to fetch menus');
  }
  return response.json();
};

export const createOrder = async (orderData) => {
  const response = await fetch(`${API_URL}/orders`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(orderData),
  });
  if (!response.ok) {
    throw new Error('Failed to create order');
  }
  return response.json();
};