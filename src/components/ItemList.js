import React, { useState, useEffect} from 'react';
import { Box, Typography, Grid, Card, CardContent, Button } from '@mui/material';
import { fetchItemsByCategory, fetchIngredientsByItem } from '@/services/api';
import { useCart } from '@/context/CartContext';
import ItemCustomizationModal from './ItemCustomization';

export default function ItemList({ categoryId }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedItem, setSelectedItem] = useState(null);
  const [ingredients, setIngredients] = useState([]);
  const { addToCart } = useCart();

  useEffect(() => {
    const loadItems = async () => {
      if (!categoryId) return;

      try {
        setLoading(true);
        const data = await fetchItemsByCategory(categoryId);
        setItems(data);
      } catch (err) {
        console.error('Failed to load items:', err);
      } finally {
        setLoading(false);
      }
    };

    loadItems();
  }, [categoryId]);

  const handleCustomizeItem = async (item) => {
    try {
      const { linkedIngredients, availableIngredients } = await fetchIngredientsByItem(item.id);
      setIngredients({ linkedIngredients, availableIngredients });
      setSelectedItem(item);
    } catch (err) {
      console.error('Failed to load ingredients:', err);
    }
  };

  const handleAddToCart = (customizedItem) => {
    addToCart(customizedItem);
    setSelectedItem(null);
  };

  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Box>
      <Typography variant="h5" component="h2" className="mb-4">
        Menu Items
      </Typography>
      <Grid container spacing={2}>
        {items.map((item) => (
          <Grid item key={item.id} xs={12} sm={6} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6">{item.name}</Typography>
                <Typography>${item.price.toFixed(2)}</Typography>
                <Button
                  variant="outlined"
                  onClick={() => handleCustomizeItem(item)}
                >
                  Customize
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      {selectedItem && (
        <ItemCustomizationModal
          open={!!selectedItem}
          onClose={() => setSelectedItem(null)}
          item={selectedItem}
          ingredients={ingredients}
          onAddToCart={handleAddToCart}
        />
      )}
    </Box>
  );
}