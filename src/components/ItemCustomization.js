import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Checkbox,
  FormControlLabel,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

export default function ItemCustomizationModal({
  open,
  onClose,
  item,
  ingredients,
  onAddToCart,
}) {
  const { linkedIngredients, availableIngredients } = ingredients;
  const [remainingIngredients, setRemainingIngredients] = useState(linkedIngredients);
  const [selectedToAdd, setSelectedToAdd] = useState([]);

  const handleRemoveIngredient = (ingredient) => {
    setRemainingIngredients((prev) =>
      prev.filter((i) => i.id !== ingredient.id)
    );
  };

  const handleToggleAdd = (ingredient) => {
    setSelectedToAdd((prev) =>
      prev.includes(ingredient)
        ? prev.filter((i) => i !== ingredient)
        : [...prev, ingredient]
    );
  };

  const calculateTotalPrice = () => {
    const addPrice = selectedToAdd.reduce(
      (sum, ingredient) => sum + ingredient.price,
      0
    );
    return item.price + addPrice;
  };

  const handleAddToCart = () => {
    onAddToCart({
      ...item,
      customizations: {
        remove: linkedIngredients.filter(
          (ingredient) => !remainingIngredients.includes(ingredient)
        ),
        add: selectedToAdd,
      },
      price: calculateTotalPrice(),
    });
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Customize {item.name}</DialogTitle>
      <DialogContent>
        <Typography>Base Price: ${item.price.toFixed(2)}</Typography>

        <Typography className="mt-4">Ingredients:</Typography>
        <List>
          {remainingIngredients.map((ingredient) => (
            <ListItem key={ingredient.id}>
              <ListItemText primary={ingredient.name} />
              <ListItemSecondaryAction>
                <IconButton
                  edge="end"
                  aria-label="delete"
                  onClick={() => handleRemoveIngredient(ingredient)}
                >
                  <DeleteIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>

        <Typography className="mt-4">Ingredients to Add:</Typography>
        {availableIngredients.map((ingredient) => (
          <FormControlLabel
            key={ingredient.id}
            control={
              <Checkbox
                checked={selectedToAdd.includes(ingredient)}
                onChange={() => handleToggleAdd(ingredient)}
              />
            }
            label={`${ingredient.name} (+$${ingredient.price.toFixed(2)})`}
          />
        ))}

        <Typography className="mt-4">
          Total Price: ${calculateTotalPrice().toFixed(2)}
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleAddToCart} variant="contained" color="primary">
          Add to Cart
        </Button>
      </DialogActions>
    </Dialog>
  );
}