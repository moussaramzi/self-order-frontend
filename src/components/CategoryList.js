'use client';

import { Box, Typography, Tabs, Tab } from '@mui/material';

export default function CategoryList({ categories, selectedCategory, onSelectCategory }) {
  const handleChange = (event, newValue) => {
    const selected = categories.find(cat => cat.id === newValue);
    onSelectCategory(selected);
  };

  return (
    <Box>
      <Typography variant="h5" component="h2" className="mb-4">
        Menu Categories
      </Typography>
      
      <Tabs
        value={selectedCategory?.id || 0}
        onChange={handleChange}
        variant="scrollable"
        scrollButtons="auto"
        aria-label="menu categories"
      >
        {categories.map((category) => (
          <Tab 
            key={category.id} 
            label={category.name} 
            value={category.id} 
            className="font-medium"
          />
        ))}
      </Tabs>
    </Box>
  );
}