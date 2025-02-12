import React from 'react';
import { Box, Typography, Button, Paper, Divider } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';

export default function TransactionPage() {
    const location = useLocation();
    const navigate = useNavigate();

    const paymentDetails = location.state?.paymentDetails || JSON.parse(localStorage.getItem('paymentDetails'));

    if (!paymentDetails) {
        return (
            <Box sx={{ textAlign: 'center', padding: 5 }}>
                <Typography variant="h5" gutterBottom>
                    No transaction details found.
                </Typography>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => navigate('/')}
                >
                    Go Back to Home
                </Button>
            </Box>
        );
    }

    const { paymentMethod, notes, orderSummary } = paymentDetails;
    const { selectedItems, totalPrice } = orderSummary;

    return (
        <Box sx={{ padding: 3, margin: '20px', backgroundColor: '#f5f5f5' }}>
            {/* Transaction Summary */}
            <Typography variant="h4" sx={{ fontWeight: 'bold', textAlign: 'center', marginBottom: 3 }}>
                Transaction Details
            </Typography>

            {/* Order Summary */}
            <Box sx={{ marginBottom: 3 }}>
                <Typography variant="h6" sx={{ fontWeight: 'bold', textAlign: 'left', marginBottom: 2 }}>Order Summary</Typography>
                <Paper sx={{ padding: 2 }}>
                    {selectedItems.map((item, index) => (
                        <Box key={index} sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: 1, borderBottom: '1px solid #e0e0e0', paddingBottom: 1 }}>
                            <Typography variant="body1">{item.sellProductName || item.name}</Typography>
                            <Typography variant="body1">₱ <strong>{(item.sellProductPrice * item.quantity).toFixed(2)}</strong></Typography>
                        </Box>
                    ))}
                </Paper>
            </Box>

            {/* Payment Details */}
            <Box sx={{ marginBottom: 3 }}>
                <Typography variant="h6" sx={{ fontWeight: 'bold', textAlign: 'left', marginBottom: 2 }}>Payment Details</Typography>
                <Paper sx={{ padding: 2 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: 1 }}>
                        <Typography variant="body1">Payment Method:</Typography>
                        <Typography variant="body1">{paymentMethod}</Typography>
                    </Box>
                    {notes && (
                        <Box sx={{ marginTop: 2 }}>
                            <Typography variant="body2" sx={{ fontStyle: 'italic' }}>
                                <strong>Notes:</strong> {notes}
                            </Typography>
                        </Box>
                    )}
                </Paper>
            </Box>

            {/* Total Price */}
            <Box sx={{ marginBottom: 3 }}>
                <Typography variant="h6" sx={{ fontWeight: 'bold', textAlign: 'left', marginBottom: 2 }}>Total Price</Typography>
                <Paper sx={{ padding: 2 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Typography variant="body1">Total Amount Paid:</Typography>
                        <Typography variant="body1" sx={{ fontWeight: 'bold' }}>₱{totalPrice.toFixed(2)}</Typography>
                    </Box>
                </Paper>
            </Box>

            {/* Navigation Buttons */}
            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
                <Button
                    sx={{
                        color: '#F5F5F5',
                        backgroundColor: 'black',
                        borderRadius: '30px',
                        textTransform: 'capitalize',
                        '&:focus': { outline: 'none' },
                        '&:hover': {
                            backgroundColor: 'white',
                            color: 'black',
                        },
                    }}
                    onClick={() => navigate('/')}
                >
                    Go to Home
                </Button>

                <Button
                    sx={{
                        color: '#F5F5F5',
                        backgroundColor: 'black',
                        borderRadius: '30px',
                        textTransform: 'capitalize',
                        '&:focus': { outline: 'none' },
                        '&:hover': {
                            backgroundColor: 'white',
                            color: 'black',
                        },
                    }}
                    onClick={() => navigate('/order')}
                >
                    View Orders
                </Button>
            </Box>
        </Box>
    );
}