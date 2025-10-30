const PromoCode = require('../models/promoCode.model');

// @desc    Validate a promo code
// @route   POST /api/promo/validate
exports.validatePromoCode = async (req, res) => {
  const { code } = req.body;

  if (!code) {
    return res.status(400).json({ success: false, message: 'Promo code is required' });
  }

  try {
    const promo = await PromoCode.findOne({
      code: code.toUpperCase(),
      isActive: true,
      // Check if it's expired
      $or: [
        { expiresAt: null },
        { expiresAt: { $gt: new Date() } }
      ]
    });

    if (!promo) {
      return res.status(404).json({
        success: false,
        isValid: false,
        message: 'Invalid or expired promo code',
      });
    }

    // Return the promo details for the frontend to calculate the discount
    res.status(200).json({
      success: true,
      isValid: true,
      data: {
        code: promo.code,
        discountType: promo.discountType,
        discountValue: promo.discountValue,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};