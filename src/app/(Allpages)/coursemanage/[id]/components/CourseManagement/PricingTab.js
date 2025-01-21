// components/CourseManagement/PricingTab.js
"use client";

import { useState } from "react";
import { FaInfoCircle, FaPlusCircle, FaRegTrashAlt } from "react-icons/fa";

export default function PricingTab() {
  const [pricing, setPricing] = useState({
    price: 49.99,
    discount: 0,
    currency: "USD",
    coupons: [],
  });

  const [newCoupon, setNewCoupon] = useState({
    code: "",
    discountType: "percentage",
    value: "",
    expiryDate: "",
  });

  const handlePriceChange = (e) => {
    const value = parseFloat(e.target.value) || 0;
    setPricing((prev) => ({
      ...prev,
      price: value >= 0 ? value : 0,
    }));
  };

  const handleDiscountChange = (e) => {
    const discount = Math.min(
      100,
      Math.max(0, parseFloat(e.target.value) || 0)
    );
    setPricing((prev) => ({
      ...prev,
      discount,
    }));
  };

  const handleAddCoupon = (e) => {
    e.preventDefault();
    if (newCoupon.code && newCoupon.value) {
      setPricing((prev) => ({
        ...prev,
        coupons: [
          ...prev.coupons,
          {
            ...newCoupon,
            value: parseFloat(newCoupon.value),
            id: Date.now(),
          },
        ],
      }));
      setNewCoupon({
        code: "",
        discountType: "percentage",
        value: "",
        expiryDate: "",
      });
    }
  };

  const handleRemoveCoupon = (couponId) => {
    setPricing((prev) => ({
      ...prev,
      coupons: prev.coupons.filter((c) => c.id !== couponponId),
    }));
  };

  const calculateDiscountedPrice = () => {
    const discountAmount = pricing.price * (pricing.discount / 100);
    return pricing.price - discountAmount;
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">
        Pricing Settings
      </h2>

      {/* Base Price Section */}
      <div className="mb-8">
        <div className="flex items-center mb-3">
          <h3 className="text-lg font-medium">Course Price</h3>
          <span
            className="ml-2 text-primary-100"
            title="Base price of your course"
          >
            <FaInfoCircle />
          </span>
        </div>

        <div className="flex gap-4 items-center">
          <select
            value={pricing.currency}
            onChange={(e) =>
              setPricing((prev) => ({ ...prev, currency: e.target.value }))
            }
            className="px-4 py-2 border rounded-lg bg-white"
          >
            <option value="USD">$ USD</option>
            <option value="EUR">€ EUR</option>
            <option value="GBP">£ GBP</option>
          </select>

          <div className="relative flex-1">
            <input
              type="number"
              value={pricing.price}
              onChange={handlePriceChange}
              className="w-full pl-8 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
              step="0.01"
              min="0"
            />
            <span className="absolute left-3 top-2.5 text-gray-500">
              {pricing.currency === "USD"
                ? "$"
                : pricing.currency === "EUR"
                ? "€"
                : "£"}
            </span>
          </div>
        </div>
      </div>

      {/* Discount Section */}
      <div className="mb-8">
        <div className="flex items-center mb-3">
          <h3 className="text-lg font-medium">Discount Settings</h3>
          <span
            className="ml-2 text-primary-100"
            title="Percentage discount for your course"
          >
            <FaInfoCircle />
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="relative">
            <input
              type="number"
              value={pricing.discount}
              onChange={handleDiscountChange}
              className="w-full pr-12 pl-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
              min="0"
              max="100"
            />
            <span className="absolute right-3 top-2.5 text-gray-500">%</span>
          </div>

          <div className="bg-purple-50 p-4 rounded-lg">
            <p className="text-sm text-gray-600">Discounted Price</p>
            <p className="text-xl font-semibold text-primary-100">
              {pricing.currency}
              {calculateDiscountedPrice().toFixed(2)}
            </p>
          </div>
        </div>
      </div>

      {/* Coupons Section */}
      <div>
        <div className="flex items-center mb-3">
          <h3 className="text-lg font-medium">Coupon Codes</h3>
          <span
            className="ml-2 text-primary-100"
            title="Create discount coupons for your course"
          >
            <FaInfoCircle />
          </span>
        </div>

        {/* Add Coupon Form */}
        <form
          onSubmit={handleAddCoupon}
          className="bg-gray-50 p-4 rounded-lg mb-4"
        >
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <input
              type="text"
              placeholder="Coupon code"
              value={newCoupon.code}
              onChange={(e) =>
                setNewCoupon((prev) => ({
                  ...prev,
                  code: e.target.value.toUpperCase(),
                }))
              }
              className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
              required
            />

            <select
              value={newCoupon.discountType}
              onChange={(e) =>
                setNewCoupon((prev) => ({
                  ...prev,
                  discountType: e.target.value,
                }))
              }
              className="px-4 py-2 border rounded-lg bg-white"
            >
              <option value="percentage">Percentage</option>
              <option value="fixed">Fixed Amount</option>
            </select>

            <input
              type="number"
              placeholder="Value"
              value={newCoupon.value}
              onChange={(e) =>
                setNewCoupon((prev) => ({ ...prev, value: e.target.value }))
              }
              className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
              min="0"
              required
            />

            <input
              type="date"
              value={newCoupon.expiryDate}
              onChange={(e) =>
                setNewCoupon((prev) => ({
                  ...prev,
                  expiryDate: e.target.value,
                }))
              }
              className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
            />
          </div>

          <button
            type="submit"
            className="mt-4 px-4 py-2 bg-primary-100 text-white rounded-lg   flex items-center"
          >
            <FaPlusCircle className="mr-2" />
            Add Coupon
          </button>
        </form>

        {/* Coupons List */}
        {pricing.coupons.length > 0 ? (
          <div className="space-y-3">
            {pricing.coupons.map((coupon) => (
              <div
                key={coupon.id}
                className="flex items-center justify-between bg-white p-4 rounded-lg border"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-4">
                    <span className="font-medium">{coupon.code}</span>
                    <span className="text-sm text-primary-100">
                      {coupon.discountType === "percentage"
                        ? `${coupon.value}% OFF`
                        : `${pricing.currency}${coupon.value} OFF`}
                    </span>
                    {coupon.expiryDate && (
                      <span className="text-sm text-gray-500">
                        Expires:{" "}
                        {new Date(coupon.expiryDate).toLocaleDateString()}
                      </span>
                    )}
                  </div>
                </div>
                <button
                  onClick={() => handleRemoveCoupon(coupon.id)}
                  className="text-red-500 hover:text-red-600 p-2"
                >
                  <FaRegTrashAlt />
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-6 text-gray-500">
            No coupons created yet
          </div>
        )}
      </div>
    </div>
  );
}
