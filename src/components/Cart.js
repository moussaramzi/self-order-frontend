'use client';

import { useState } from 'react';
import {
  IconButton,
  Badge,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  List,
  ListItem,
  ListItemText,
  Button,
  Divider,
} from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import DeleteIcon from '@mui/icons-material/Delete';
import { useCart } from '@/context/CartContext';

export default function Cart() {
  const { cart, total, removeFromCart, clearCart } = useCart();
  const [isCartOpen, setIsCartOpen] = useState(false);

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  return (
    <>
      {/* Cart Icon */}
      <IconButton color="primary" onClick={toggleCart}>
        <Badge badgeContent={cart.length} color="secondary">
          <ShoppingCartIcon />
        </Badge>
      </IconButton>

      {/* Cart Popup */}
      <Dialog open={isCartOpen} onClose={toggleCart} fullWidth maxWidth="sm">
        <DialogTitle>Your Cart</DialogTitle>
        <DialogContent>
          {cart.length > 0 ? (
            <>
              <List>
                {cart.map((item, index) => (
                  <div key={`${item.id}-${index}`}>
                    <ListItem
                      secondaryAction={
                        <IconButton
                          edge="end"
                          aria-label="delete"
                          onClick={() => removeFromCart(index)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      }
                    >
                      <ListItemText
                        primary={item.name}
                        secondary={`$${item.price.toFixed(2)}`}
                      />
                    </ListItem>
                    <Divider />
                  </div>
                ))}
              </List>
              <Typography variant="h6" align="right" className="mt-4">
                Total: ${total.toFixed(2)}
              </Typography>
            </>
          ) : (
            <Typography>Your cart is empty.</Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={clearCart} color="secondary" disabled={cart.length === 0}>
            Clear
          </Button>
          <Button onClick={toggleCart} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}