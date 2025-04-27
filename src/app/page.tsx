'use client';

import { useState, useEffect } from 'react';
import { Container, Typography, Paper, Box } from '@mui/material';
import Grid from '@mui/material/Grid';
import { fetchCategories } from '@/services/api';
import { CartProvider } from '@/context/CartContext';
import CategoryList from '@/components/CategoryList';
import ItemList from '@/components/ItemList';
import Cart from '@/components/Cart';

interface Category {
  id: string | number;
  name: string;
}

export default function Home() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        setLoading(true);
        const data = await fetchCategories();
        setCategories(data);
        if (data.length > 0) {
          setSelectedCategory(data[0]);
        }
      } catch (err) {
        setError('Failed to load categories');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadCategories();
  }, []);

  return (
    <CartProvider>
      <Container maxWidth="lg" className="py-8">
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
          <Typography variant="h3" component="h1" className="font-bold">
            Self-Checkout
          </Typography>
          <Cart />
        </Box>

        {loading ? (
          <Typography>Loading...</Typography>
        ) : error ? (
          <Typography color="error">{error}</Typography>
        ) : (
          <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
              <Paper elevation={3} className="p-4">
                <CategoryList
                  categories={categories}
                  selectedCategory={selectedCategory}
                  onSelectCategory={setSelectedCategory}
                />
              </Paper>
            </Grid>
            <Grid item xs={12} md={8}>
              <Paper elevation={3} className="p-4">
                <ItemList categoryId={selectedCategory?.id} />
              </Paper>
            </Grid>
          </Grid>
        )}
      </Container>
    </CartProvider>
  );
}