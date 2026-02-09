import React, { useState, Fragment, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectAllProducts, fetchProductByFilterAsync, selectTotalItems,
  selectCategory, selectBrand, fetchProductByCategoryAsync, fetchProductByBrandAsync
} from '../productSlice';
import { Dialog, Disclosure, Menu, Transition } from '@headlessui/react'
import { XMarkIcon, ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline'
import { ChevronDownIcon, FunnelIcon, MinusIcon, PlusIcon, Squares2X2Icon, StarIcon } from '@heroicons/react/20/solid'
import { Link } from 'react-router-dom';
import { ITEMS_PER_PAGE } from '../../../app/constant';
import { selectLoggedIn } from '../../auth/authSlice';


// const products = [

//   {
//     "id": 1,
//     "name": "iPhone 9",
//     "imageAlt": "An apple mobile which is nothing like apple",
//     "price": 549,
//     "discountPercentage": 12.96,
//     "rating": 4.69,
//     "stock": 94,
//     "brand": "Apple",
//     "category": "smartphones",
//     "thumbnail": "https://i.dummyjson.com/data/products/1/thumbnail.jpg",
//     "images": [
//       "https://i.dummyjson.com/data/products/1/1.jpg",
//       "https://i.dummyjson.com/data/products/1/2.jpg",
//       "https://i.dummyjson.com/data/products/1/3.jpg",
//       "https://i.dummyjson.com/data/products/1/4.jpg",
//       "https://i.dummyjson.com/data/products/1/thumbnail.jpg"
//     ]
//   },
//   {
//     "id": 2,
//     "name": "iPhone X",
//     "imageAlt": "SIM-Free, Model A19211 6.5-inch Super Retina HD display with OLED technology A12 Bionic chip with ...",
//     "price": 899,
//     "discountPercentage": 17.94,
//     "rating": 4.44,
//     "stock": 34,
//     "brand": "Apple",
//     "category": "smartphones",
//     "thumbnail": "https://i.dummyjson.com/data/products/2/thumbnail.jpg",
//     "images": [
//       "https://i.dummyjson.com/data/products/2/1.jpg",
//       "https://i.dummyjson.com/data/products/2/2.jpg",
//       "https://i.dummyjson.com/data/products/2/3.jpg",
//       "https://i.dummyjson.com/data/products/2/thumbnail.jpg"
//     ]
//   },
//   {
//     "id": 3,
//     "name": "Samsung Universe 9",
//     "imageAlt": "Samsung's new variant which goes beyond Galaxy to the Universe",
//     "price": 1249,
//     "discountPercentage": 15.46,
//     "rating": 4.09,
//     "stock": 36,
//     "brand": "Samsung",
//     "category": "smartphones",
//     "thumbnail": "https://i.dummyjson.com/data/products/3/thumbnail.jpg",
//     "images": [
//       "https://i.dummyjson.com/data/products/3/1.jpg"
//     ]
//   },
//   {
//     "id": 4,
//     "name": "OPPOF19",
//     "imageAlt": "OPPO F19 is officially announced on April 2021.",
//     "price": 280,
//     "discountPercentage": 17.91,
//     "rating": 4.3,
//     "stock": 123,
//     "brand": "OPPO",
//     "category": "smartphones",
//     "thumbnail": "https://i.dummyjson.com/data/products/4/thumbnail.jpg",
//     "images": [
//       "https://i.dummyjson.com/data/products/4/1.jpg",
//       "https://i.dummyjson.com/data/products/4/2.jpg",
//       "https://i.dummyjson.com/data/products/4/3.jpg",
//       "https://i.dummyjson.com/data/products/4/4.jpg",
//       "https://i.dummyjson.com/data/products/4/thumbnail.jpg"
//     ]
//   },
//   {
//     "id": 5,
//     "name": "Huawei P30",
//     "imageAlt": "Huawei’s re-badged P30 Pro New Edition was officially unveiled yesterday in Germany and now the device has made its way to the UK.",
//     "price": 499,
//     "discountPercentage": 10.58,
//     "rating": 4.09,
//     "stock": 32,
//     "brand": "Huawei",
//     "category": "smartphones",
//     "thumbnail": "https://i.dummyjson.com/data/products/5/thumbnail.jpg",
//     "images": [
//       "https://i.dummyjson.com/data/products/5/1.jpg",
//       "https://i.dummyjson.com/data/products/5/2.jpg",
//       "https://i.dummyjson.com/data/products/5/3.jpg"
//     ]
//   },
//   {
//     "id": 6,
//     "name": "MacBook Pro",
//     "imageAlt": "MacBook Pro 2021 with mini-LED display may launch between September, November",
//     "price": 1749,
//     "discountPercentage": 11.02,
//     "rating": 4.57,
//     "stock": 83,
//     "brand": "Apple",
//     "category": "laptops",
//     "thumbnail": "https://i.dummyjson.com/data/products/6/thumbnail.png",
//     "images": [
//       "https://i.dummyjson.com/data/products/6/1.png",
//       "https://i.dummyjson.com/data/products/6/2.jpg",
//       "https://i.dummyjson.com/data/products/6/3.png",
//       "https://i.dummyjson.com/data/products/6/4.jpg"
//     ]
//   },
//   {
//     "id": 7,
//     "name": "Samsung Galaxy Book",
//     "imageAlt": "Samsung Galaxy Book S (2020) Laptop With Intel Lakefield Chip, 8GB of RAM Launched",
//     "price": 1499,
//     "discountPercentage": 4.15,
//     "rating": 4.25,
//     "stock": 50,
//     "brand": "Samsung",
//     "category": "laptops",
//     "thumbnail": "https://i.dummyjson.com/data/products/7/thumbnail.jpg",
//     "images": [
//       "https://i.dummyjson.com/data/products/7/1.jpg",
//       "https://i.dummyjson.com/data/products/7/2.jpg",
//       "https://i.dummyjson.com/data/products/7/3.jpg",
//       "https://i.dummyjson.com/data/products/7/thumbnail.jpg"
//     ]
//   },
//   {
//     "id": 8,
//     "name": "Microsoft Surface Laptop 4",
//     "imageAlt": "Style and speed. Stand out on HD video calls backed by Studio Mics. Capture ideas on the vibrant touchscreen.",
//     "price": 1499,
//     "discountPercentage": 10.23,
//     "rating": 4.43,
//     "stock": 68,
//     "brand": "Microsoft Surface",
//     "category": "laptops",
//     "thumbnail": "https://i.dummyjson.com/data/products/8/thumbnail.jpg",
//     "images": [
//       "https://i.dummyjson.com/data/products/8/1.jpg",
//       "https://i.dummyjson.com/data/products/8/2.jpg",
//       "https://i.dummyjson.com/data/products/8/3.jpg",
//       "https://i.dummyjson.com/data/products/8/4.jpg",
//       "https://i.dummyjson.com/data/products/8/thumbnail.jpg"
//     ]
//   },
//   {
//     "id": 9,
//     "name": "Infinix INBOOK",
//     "imageAlt": "Infinix Inbook X1 Ci3 10th 8GB 256GB 14 Win10 Grey – 1 Year Warranty",
//     "price": 1099,
//     "discountPercentage": 11.83,
//     "rating": 4.54,
//     "stock": 96,
//     "brand": "Infinix",
//     "category": "laptops",
//     "thumbnail": "https://i.dummyjson.com/data/products/9/thumbnail.jpg",
//     "images": [
//       "https://i.dummyjson.com/data/products/9/1.jpg",
//       "https://i.dummyjson.com/data/products/9/2.png",
//       "https://i.dummyjson.com/data/products/9/3.png",
//       "https://i.dummyjson.com/data/products/9/4.jpg",
//       "https://i.dummyjson.com/data/products/9/thumbnail.jpg"
//     ]
//   },
//   {
//     "id": 10,
//     "name": "HP Pavilion 15-DK1056WM",
//     "imageAlt": "HP Pavilion 15-DK1056WM Gaming Laptop 10th Gen Core i5, 8GB, 256GB SSD, GTX 1650 4GB, Windows 10",
//     "price": 1099,
//     "discountPercentage": 6.18,
//     "rating": 4.43,
//     "stock": 89,
//     "brand": "HP Pavilion",
//     "category": "laptops",
//     "thumbnail": "https://i.dummyjson.com/data/products/10/thumbnail.jpeg",
//     "images": [
//       "https://i.dummyjson.com/data/products/10/1.jpg",
//       "https://i.dummyjson.com/data/products/10/2.jpg",
//       "https://i.dummyjson.com/data/products/10/3.jpg",
//       "https://i.dummyjson.com/data/products/10/thumbnail.jpeg"
//     ]
//   },
//   {
//     "id": 11,
//     "name": "perfume Oil",
//     "imageAlt": "Mega Discount, Impression of Acqua Di Gio by GiorgioArmani concentrated attar perfume Oil",
//     "price": 13,
//     "discountPercentage": 8.4,
//     "rating": 4.26,
//     "stock": 65,
//     "brand": "Impression of Acqua Di Gio",
//     "category": "fragrances",
//     "thumbnail": "https://i.dummyjson.com/data/products/11/thumbnail.jpg",
//     "images": [
//       "https://i.dummyjson.com/data/products/11/1.jpg",
//       "https://i.dummyjson.com/data/products/11/2.jpg",
//       "https://i.dummyjson.com/data/products/11/3.jpg",
//       "https://i.dummyjson.com/data/products/11/thumbnail.jpg"
//     ]
//   },
//   {
//     "id": 12,
//     "name": "Brown Perfume",
//     "imageAlt": "Royal_Mirage Sport Brown Perfume for Men & Women - 120ml",
//     "price": 40,
//     "discountPercentage": 15.66,
//     "rating": 4,
//     "stock": 52,
//     "brand": "Royal_Mirage",
//     "category": "fragrances",
//     "thumbnail": "https://i.dummyjson.com/data/products/12/thumbnail.jpg",
//     "images": [
//       "https://i.dummyjson.com/data/products/12/1.jpg",
//       "https://i.dummyjson.com/data/products/12/2.jpg",
//       "https://i.dummyjson.com/data/products/12/3.png",
//       "https://i.dummyjson.com/data/products/12/4.jpg",
//       "https://i.dummyjson.com/data/products/12/thumbnail.jpg"
//     ]
//   },
//   {
//     "id": 13,
//     "name": "Fog Scent Xpressio Perfume",
//     "imageAlt": "Product details of Best Fog Scent Xpressio Perfume 100ml For Men cool long lasting perfumes for Men",
//     "price": 13,
//     "discountPercentage": 8.14,
//     "rating": 4.59,
//     "stock": 61,
//     "brand": "Fog Scent Xpressio",
//     "category": "fragrances",
//     "thumbnail": "https://i.dummyjson.com/data/products/13/thumbnail.webp",
//     "images": [
//       "https://i.dummyjson.com/data/products/13/1.jpg",
//       "https://i.dummyjson.com/data/products/13/2.png",
//       "https://i.dummyjson.com/data/products/13/3.jpg",
//       "https://i.dummyjson.com/data/products/13/4.jpg",
//       "https://i.dummyjson.com/data/products/13/thumbnail.webp"
//     ]
//   },
//   {
//     "id": 14,
//     "name": "Non-Alcoholic Concentrated Perfume Oil",
//     "imageAlt": "Original Al Munakh® by Mahal Al Musk | Our Impression of Climate | 6ml Non-Alcoholic Concentrated Perfume Oil",
//     "price": 120,
//     "discountPercentage": 15.6,
//     "rating": 4.21,
//     "stock": 114,
//     "brand": "Al Munakh",
//     "category": "fragrances",
//     "thumbnail": "https://i.dummyjson.com/data/products/14/thumbnail.jpg",
//     "images": [
//       "https://i.dummyjson.com/data/products/14/1.jpg",
//       "https://i.dummyjson.com/data/products/14/2.jpg",
//       "https://i.dummyjson.com/data/products/14/3.jpg",
//       "https://i.dummyjson.com/data/products/14/thumbnail.jpg"
//     ]
//   },
//   {
//     "id": 15,
//     "name": "Eau De Perfume Spray",
//     "imageAlt": "Genuine  Al-Rehab spray perfume from UAE/Saudi Arabia/Yemen High Quality",
//     "price": 30,
//     "discountPercentage": 10.99,
//     "rating": 4.7,
//     "stock": 105,
//     "brand": "Lord - Al-Rehab",
//     "category": "fragrances",
//     "thumbnail": "https://i.dummyjson.com/data/products/15/thumbnail.jpg",
//     "images": [
//       "https://i.dummyjson.com/data/products/15/1.jpg",
//       "https://i.dummyjson.com/data/products/15/2.jpg",
//       "https://i.dummyjson.com/data/products/15/3.jpg",
//       "https://i.dummyjson.com/data/products/15/4.jpg",
//       "https://i.dummyjson.com/data/products/15/thumbnail.jpg"
//     ]
//   },
//   {
//     "id": 16,
//     "name": "Hyaluronic Acid Serum",
//     "imageAlt": "L'OrÃ©al Paris introduces Hyaluron Expert Replumping Serum formulated with 1.5% Hyaluronic Acid",
//     "price": 19,
//     "discountPercentage": 13.31,
//     "rating": 4.83,
//     "stock": 110,
//     "brand": "L'Oreal Paris",
//     "category": "skincare",
//     "thumbnail": "https://i.dummyjson.com/data/products/16/thumbnail.jpg",
//     "images": [
//       "https://i.dummyjson.com/data/products/16/1.png",
//       "https://i.dummyjson.com/data/products/16/2.webp",
//       "https://i.dummyjson.com/data/products/16/3.jpg",
//       "https://i.dummyjson.com/data/products/16/4.jpg",
//       "https://i.dummyjson.com/data/products/16/thumbnail.jpg"
//     ]
//   },
//   {
//     "id": 17,
//     "name": "Tree Oil 30ml",
//     "imageAlt": "Tea tree oil contains a number of compounds, including terpinen-4-ol, that have been shown to kill certain bacteria,",
//     "price": 12,
//     "discountPercentage": 4.09,
//     "rating": 4.52,
//     "stock": 78,
//     "brand": "Hemani Tea",
//     "category": "skincare",
//     "thumbnail": "https://i.dummyjson.com/data/products/17/thumbnail.jpg",
//     "images": [
//       "https://i.dummyjson.com/data/products/17/1.jpg",
//       "https://i.dummyjson.com/data/products/17/2.jpg",
//       "https://i.dummyjson.com/data/products/17/3.jpg",
//       "https://i.dummyjson.com/data/products/17/thumbnail.jpg"
//     ]
//   },
//   {
//     "id": 18,
//     "name": "Oil Free Moisturizer 100ml",
//     "imageAlt": "Dermive Oil Free Moisturizer with SPF 20 is specifically formulated with ceramides, hyaluronic acid & sunscreen.",
//     "price": 40,
//     "discountPercentage": 13.1,
//     "rating": 4.56,
//     "stock": 88,
//     "brand": "Dermive",
//     "category": "skincare",
//     "thumbnail": "https://i.dummyjson.com/data/products/18/thumbnail.jpg",
//     "images": [
//       "https://i.dummyjson.com/data/products/18/1.jpg",
//       "https://i.dummyjson.com/data/products/18/2.jpg",
//       "https://i.dummyjson.com/data/products/18/3.jpg",
//       "https://i.dummyjson.com/data/products/18/4.jpg",
//       "https://i.dummyjson.com/data/products/18/thumbnail.jpg"
//     ]
//   },
//   {
//     "id": 19,
//     "name": "Skin Beauty Serum.",
//     "imageAlt": "Product name: rorec collagen hyaluronic acid white face serum riceNet weight: 15 m",
//     "price": 46,
//     "discountPercentage": 10.68,
//     "rating": 4.42,
//     "stock": 54,
//     "brand": "ROREC White Rice",
//     "category": "skincare",
//     "thumbnail": "https://i.dummyjson.com/data/products/19/thumbnail.jpg",
//     "images": [
//       "https://i.dummyjson.com/data/products/19/1.jpg",
//       "https://i.dummyjson.com/data/products/19/2.jpg",
//       "https://i.dummyjson.com/data/products/19/3.png",
//       "https://i.dummyjson.com/data/products/19/thumbnail.jpg"
//     ]
//   },
//   {
//     "id": 20,
//     "name": "Freckle Treatment Cream- 15gm",
//     "imageAlt": "Fair & Clear is Pakistan's only pure Freckle cream which helpsfade Freckles, Darkspots and pigments. Mercury level is 0%, so there are no side effects.",
//     "price": 70,
//     "discountPercentage": 16.99,
//     "rating": 4.06,
//     "stock": 140,
//     "brand": "Fair & Clear",
//     "category": "skincare",
//     "thumbnail": "https://i.dummyjson.com/data/products/20/thumbnail.jpg",
//     "images": [
//       "https://i.dummyjson.com/data/products/20/1.jpg",
//       "https://i.dummyjson.com/data/products/20/2.jpg",
//       "https://i.dummyjson.com/data/products/20/3.jpg",
//       "https://i.dummyjson.com/data/products/20/4.jpg",
//       "https://i.dummyjson.com/data/products/20/thumbnail.jpg"
//     ]
//   }]
const sortOptions = [
  { name: 'Best Rating', sort: 'rating', order: 'desc', current: false },
  { name: 'Price: Low to High', sort: 'price', order: 'asc', current: false },
  { name: 'Price: High to Low', sort: 'price', order: 'desc', current: false },
]
// const filters = [


//   // {
//   //   id: 'color',
//   //   name: 'Color',
//   //   options: [
//   //     { value: 'white', label: 'White', checked: false },
//   //     { value: 'beige', label: 'Beige', checked: false },
//   //     { value: 'blue', label: 'Blue', checked: true },
//   //     { value: 'brown', label: 'Brown', checked: false },
//   //     { value: 'green', label: 'Green', checked: false },
//   //     { value: 'purple', label: 'Purple', checked: false },
//   //   ],
//   // },
//   {
//     id: 'category',
//     name: 'Category',
//     options: [ { value: 'smartphones', label: 'smartphones', checked: false },
//     { value: 'laptops', label: 'laptops', checked: false },
//     { value: 'fragrances', label: 'fragrances', checked: false },
//     { value: 'skincare', label: 'skincare', checked: false },
//     { value: 'groceries', label: 'groceries', checked: false },
//     { value: 'home-decoration',
//       label: 'home decoration',
//       checked: false },
//     { value: 'furniture', label: 'furniture', checked: false },
//     { value: 'tops', label: 'tops', checked: false },
//     { value: 'womens-dresses',
//       label: 'womens dresses',
//       checked: false },
//     { value: 'womens-shoes', label: 'womens shoes', checked: false },
//     { value: 'mens-shirts', label: 'mens shirts', checked: false },
//     { value: 'mens-shoes', label: 'mens shoes', checked: false },
//     { value: 'mens-watches', label: 'mens watches', checked: false },
//     { value: 'womens-watches',
//       label: 'womens watches',
//       checked: false },
//     { value: 'womens-bags', label: 'womens bags', checked: false },
//     { value: 'womens-jewellery',
//       label: 'womens jewellery',
//       checked: false },
//     { value: 'sunglasses', label: 'sunglasses', checked: false },
//     { value: 'automotive', label: 'automotive', checked: false },
//     { value: 'motorcycle', label: 'motorcycle', checked: false },
//     { value: 'lighting', label: 'lighting', checked: false } ],
//   },
//   {
//     id: 'brand',
//     name: 'Brand',
//     options: [{ value: 'Apple', label: 'Apple', checked: false },
//     { value: 'Samsung', label: 'Samsung', checked: false },
//     { value: 'OPPO', label: 'OPPO', checked: false },
//     { value: 'Huawei', label: 'Huawei', checked: false },
//     { value: 'Microsoft Surface',
//       label: 'Microsoft Surface',
//       checked: false },
//     { value: 'Infinix', label: 'Infinix', checked: false },
//     { value: 'HP Pavilion', label: 'HP Pavilion', checked: false },
//     { value: 'Impression of Acqua Di Gio',
//       label: 'Impression of Acqua Di Gio',
//       checked: false },
//     { value: 'Royal_Mirage', label: 'Royal_Mirage', checked: false },
//     { value: 'Fog Scent Xpressio',
//       label: 'Fog Scent Xpressio',
//       checked: false },
//     { value: 'Al Munakh', label: 'Al Munakh', checked: false },
//     { value: 'Lord - Al-Rehab',
//       label: 'Lord   Al Rehab',
//       checked: false },
//     { value: 'L\'Oreal Paris',
//       label: 'L\'Oreal Paris',
//       checked: false },
//     { value: 'Hemani Tea', label: 'Hemani Tea', checked: false },
//     { value: 'Dermive', label: 'Dermive', checked: false },
//     { value: 'ROREC White Rice',
//       label: 'ROREC White Rice',
//       checked: false },
//     { value: 'Fair & Clear', label: 'Fair & Clear', checked: false },
//     { value: 'Saaf & Khaas', label: 'Saaf & Khaas', checked: false },
//     { value: 'Bake Parlor Big',
//       label: 'Bake Parlor Big',
//       checked: false },
//     { value: 'Baking Food Items',
//       label: 'Baking Food Items',
//       checked: false },
//     { value: 'fauji', label: 'fauji', checked: false },
//     { value: 'Dry Rose', label: 'Dry Rose', checked: false },
//     { value: 'Boho Decor', label: 'Boho Decor', checked: false },
//     { value: 'Flying Wooden',
//       label: 'Flying Wooden',
//       checked: false },
//     { value: 'LED Lights', label: 'LED Lights', checked: false },
//     { value: 'luxury palace',
//       label: 'luxury palace',
//       checked: false },
//     { value: 'Golden', label: 'Golden', checked: false },
//     { value: 'Furniture Bed Set',
//       label: 'Furniture Bed Set',
//       checked: false },
//     { value: 'Ratttan Outdoor',
//       label: 'Ratttan Outdoor',
//       checked: false },
//     { value: 'Kitchen Shelf',
//       label: 'Kitchen Shelf',
//       checked: false },
//     { value: 'Multi Purpose',
//       label: 'Multi Purpose',
//       checked: false },
//     { value: 'AmnaMart', label: 'AmnaMart', checked: false },
//     { value: 'Professional Wear',
//       label: 'Professional Wear',
//       checked: false },
//     { value: 'Soft Cotton', label: 'Soft Cotton', checked: false },
//     { value: 'Top Sweater', label: 'Top Sweater', checked: false },
//     { value: 'RED MICKY MOUSE..',
//       label: 'RED MICKY MOUSE..',
//       checked: false },
//     { value: 'Digital Printed',
//       label: 'Digital Printed',
//       checked: false },
//     { value: 'Ghazi Fabric', label: 'Ghazi Fabric', checked: false },
//     { value: 'IELGY', label: 'IELGY', checked: false },
//     { value: 'IELGY fashion',
//       label: 'IELGY fashion',
//       checked: false },
//     { value: 'Synthetic Leather',
//       label: 'Synthetic Leather',
//       checked: false },
//     { value: 'Sandals Flip Flops',
//       label: 'Sandals Flip Flops',
//       checked: false },
//     { value: 'Maasai Sandals',
//       label: 'Maasai Sandals',
//       checked: false },
//     { value: 'Arrivals Genuine',
//       label: 'Arrivals Genuine',
//       checked: false },
//     { value: 'Vintage Apparel',
//       label: 'Vintage Apparel',
//       checked: false },
//     { value: 'FREE FIRE', label: 'FREE FIRE', checked: false },
//     { value: 'The Warehouse',
//       label: 'The Warehouse',
//       checked: false },
//     { value: 'Sneakers', label: 'Sneakers', checked: false },
//     { value: 'Rubber', label: 'Rubber', checked: false },
//     { value: 'Naviforce', label: 'Naviforce', checked: false },
//     { value: 'SKMEI 9117', label: 'SKMEI 9117', checked: false },
//     { value: 'Strap Skeleton',
//       label: 'Strap Skeleton',
//       checked: false },
//     { value: 'Stainless', label: 'Stainless', checked: false },
//     { value: 'Eastern Watches',
//       label: 'Eastern Watches',
//       checked: false },
//     { value: 'Luxury Digital',
//       label: 'Luxury Digital',
//       checked: false },
//     { value: 'Watch Pearls', label: 'Watch Pearls', checked: false },
//     { value: 'Bracelet', label: 'Bracelet', checked: false },
//     { value: 'LouisWill', label: 'LouisWill', checked: false },
//     { value: 'Copenhagen Luxe',
//       label: 'Copenhagen Luxe',
//       checked: false },
//     { value: 'Steal Frame', label: 'Steal Frame', checked: false },
//     { value: 'Darojay', label: 'Darojay', checked: false },
//     { value: 'Fashion Jewellery',
//       label: 'Fashion Jewellery',
//       checked: false },
//     { value: 'Cuff Butterfly',
//       label: 'Cuff Butterfly',
//       checked: false },
//     { value: 'Designer Sun Glasses',
//       label: 'Designer Sun Glasses',
//       checked: false },
//     { value: 'mastar watch', label: 'mastar watch', checked: false },
//     { value: 'Car Aux', label: 'Car Aux', checked: false },
//     { value: 'W1209 DC12V', label: 'W1209 DC12V', checked: false },
//     { value: 'TC Reusable', label: 'TC Reusable', checked: false },
//     { value: 'Neon LED Light',
//       label: 'Neon LED Light',
//       checked: false },
//     { value: 'METRO 70cc Motorcycle - MR70',
//       label: 'METRO 70cc Motorcycle   MR70',
//       checked: false },
//     { value: 'BRAVE BULL', label: 'BRAVE BULL', checked: false },
//     { value: 'shock absorber',
//       label: 'shock absorber',
//       checked: false },
//     { value: 'JIEPOLLY', label: 'JIEPOLLY', checked: false },
//     { value: 'Xiangle', label: 'Xiangle', checked: false },
//     { value: 'lightingbrilliance',
//       label: 'lightingbrilliance',
//       checked: false },
//     { value: 'Ifei Home', label: 'Ifei Home', checked: false },
//     { value: 'DADAWU', label: 'DADAWU', checked: false },
//     { value: 'YIOSI', label: 'YIOSI', checked: false } ]
//   },
// ]

const items = [


  { id: 1, title: 'Back End Developer', department: 'Engineering', type: 'Full-time', location: 'Remote' },
  { id: 2, title: 'Front End Developer', department: 'Engineering', type: 'Full-time', location: 'Remote' },
  { id: 3, title: 'User Interface Designer', department: 'Design', type: 'Full-time', location: 'Remote' },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export function AdminProduct() {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)
  const products = useSelector(selectAllProducts);
  const totalItem = useSelector(selectTotalItems);
  const category = useSelector(selectCategory);
  const user = useSelector(selectLoggedIn)
  const brand = useSelector(selectBrand);
  const dispatch = useDispatch();

  const [filter, setfilter] = useState({})
  const [sort, setsort] = useState({})
  const [page, setpage] = useState(1)
  const [search, setsearch] = useState('')
  //category and brand
  const filters = [

    {
      id: 'category',
      name: 'Category',
      options: category,
    },
    {
      id: 'brand',
      name: 'Brand',
      options: brand,

    },
  ]
  //fiter 
  const handleFilter = (e, section, option) => {
    const newfilter = { ...filter }
    if (e.target.checked) {
      if (newfilter[section.id]) {
        newfilter[section.id].push(option.value)
      } else {
        newfilter[section.id] = [option.value]
      }

    }
    else {
      const index = newfilter[section.id].findIndex(el => el === option.value)
      newfilter[section.id].splice(index, 1)
    }
    setfilter(newfilter)
    // dispatch(fetchProductByFilterAsync(newfilter))
    console.log(e.target.checked, section.id, option.value)
  }

  //sort
  const handleSort = (e, option) => {
    const sort = { _sort: option.sort, _order: option.order }
    setsort(sort)
    // dispatch(fetchProductByFilterAsync(newfilter))
    console.log(option.sort)
  }
  const handlePage = (e, page) => {

    setpage(page)
    // dispatch(fetchProductByFilterAsync(newfilter))
    console.log(page)
  }

  //call at starting
  useEffect(() => {
    // dispatch(fetchAllProductsAsync())
    const pagination = { _page: page, _limit: ITEMS_PER_PAGE }
    dispatch(fetchProductByFilterAsync({ filter, sort, pagination, search, admin: true }))
  }, [dispatch, filter, sort, page, search]);

  useEffect(() => {
    setpage(1)
  }, [totalItem])

  useEffect(() => {
    dispatch(fetchProductByCategoryAsync())
    dispatch(fetchProductByBrandAsync())
  }, [])


  return (

    <div className="bg-white">
      <div>
        {/* Mobile filter dialog */}
        <Transition.Root show={mobileFiltersOpen} as={Fragment}>
          <Dialog as="div" className="relative z-40 lg:hidden" onClose={setMobileFiltersOpen}>
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-black bg-opacity-25" />
            </Transition.Child>

            <div className="fixed inset-0 z-40 flex">
              <Transition.Child
                as={Fragment}
                enter="transition ease-in-out duration-300 transform"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl">
                  <Link>
                    <div className="flex items-center justify-between px-4">
                      <h2 className="text-lg font-medium text-gray-900">Filters</h2>
                      <button

                        type="button"
                        className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
                        onClick={() => setMobileFiltersOpen(false)}
                      >
                        <span className="sr-only">Close menu</span>
                        <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                      </button>
                    </div>
                  </Link>

                  {/* Filters */}
                  <form className="mt-4 border-t border-gray-200">


                    {filters.map((section) => (
                      <Disclosure as="div" key={section.id} className="border-t border-gray-200 px-4 py-6">
                        {({ open }) => (
                          <>
                            <h3 className="-mx-2 -my-3 flow-root">
                              <Disclosure.Button className="flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500">
                                <span className="font-medium text-gray-900">{section.name}</span>
                                <span className="ml-6 flex items-center">
                                  {open ? (
                                    <MinusIcon className="h-5 w-5" aria-hidden="true" />
                                  ) : (
                                    <PlusIcon className="h-5 w-5" aria-hidden="true" />
                                  )}
                                </span>
                              </Disclosure.Button>
                            </h3>
                            <Disclosure.Panel className="pt-6">
                              <div className="space-y-6">
                                {section.options.map((option, optionIdx) => (
                                  <div key={option.value} className="flex items-center">
                                    <input
                                      id={`filter-mobile-${section.id}-${optionIdx}`}
                                      name={`${section.id}[]`}
                                      defaultValue={option.value}
                                      type="checkbox"
                                      defaultChecked={option.checked}

                                      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                    />
                                    <label
                                      htmlFor={`filter-mobile-${section.id}-${optionIdx}`}
                                      className="ml-3 min-w-0 flex-1 text-gray-500"
                                    >
                                      {option.label}
                                    </label>
                                  </div>
                                ))}
                              </div>
                            </Disclosure.Panel>
                          </>
                        )}
                      </Disclosure>
                    ))}
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition.Root>

        <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-4">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900">All Products</h1>
            <h1 className="text-4xl font-bold tracking-tight text-gray-900">Admin 😎</h1>

            <div className="flex items-center">

              {/* //search */}
              <div className="flex items-center justify-center min-h-0 bg-gray-100">
                <div className="w-full max-w-md pr-2">
                  <div className="relative">
                    <input
                      value={search} // <-- controlled input
                      onChange={(e) => setsearch(e.target.value)}
                      type="text"
                      placeholder="Search products, brands, categories..."
                      className="w-full py-3 pl-4 pr-12 text-gray-700 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />

                    {/* Search icon (always visible) */}
                    <button
                      type="button"
                      className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500 hover:text-blue-600"
                    >
                      🔍
                    </button>

                    {/* Clear icon (only visible when there's text) */}
                    {search && (
                      <button
                        type="button"
                        onClick={() => setsearch('')}
                        className="absolute top-1/2 right-10 transform -translate-y-1/2 text-gray-400 hover:text-red-500"
                      >
                        ✖
                      </button>
                    )}
                  </div>
                </div>
              </div>
              {/* //search */}
              <Menu as="div" className="relative inline-block text-left">
                <div>
                  <Menu.Button className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                    Sort
                    <ChevronDownIcon
                      className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                      aria-hidden="true"
                    />
                  </Menu.Button>
                </div>

                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1">
                      {sortOptions.map((option) => (
                        <Menu.Item key={option.name}>
                          {({ active }) => (
                            <p
                              // href={option.href}
                              onClick={e => handleSort(e, option)}
                              className={classNames(
                                option.current ? 'font-medium text-gray-900' : 'text-gray-500',
                                active ? 'bg-gray-100' : '',
                                'block px-4 py-2 text-sm'
                              )}
                            >
                              {option.name}
                            </p>
                          )}
                        </Menu.Item>
                      ))}
                    </div>
                  </Menu.Items>
                </Transition>
              </Menu>

              <button type="button" className="-m-2 ml-5 p-2 text-gray-400 hover:text-gray-500 sm:ml-7">
                <span className="sr-only">View grid</span>
                <Squares2X2Icon className="h-5 w-5" aria-hidden="true" />
              </button>
              <button
                type="button"
                className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
                onClick={() => setMobileFiltersOpen(true)}
              >
                <span className="sr-only">Filters</span>
                <FunnelIcon className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
          </div>

          <section aria-labelledby="products-heading" className="pb-24 pt-6">
            <h2 id="products-heading" className="sr-only">
              Products
            </h2>

            <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
              {/* Filters */}
              <form className="hidden lg:block">


                {filters.map((section) => (
                  <Disclosure as="div" key={section.id} className="border-b border-gray-200 py-6">
                    {({ open }) => (
                      <>
                        <h3 className="-my-3 flow-root">
                          <Disclosure.Button className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                            <span className="font-medium text-gray-900">{section.name}</span>
                            <span className="ml-6 flex items-center">
                              {open ? (
                                <MinusIcon className="h-5 w-5" aria-hidden="true" />
                              ) : (
                                <PlusIcon className="h-5 w-5" aria-hidden="true" />
                              )}
                            </span>
                          </Disclosure.Button>
                        </h3>
                        <Disclosure.Panel className="pt-6">
                          <div className="space-y-4">
                            {section.options.map((option, optionIdx) => (
                              <div key={option.value} className="flex items-center">
                                <input
                                  id={`filter-${section.id}-${optionIdx}`}
                                  name={`${section.id}[]`}
                                  defaultValue={option.value}
                                  type="checkbox"
                                  // onChange={e=>console.log(e.target.value)}
                                  onChange={e => handleFilter(e, section, option)}
                                  defaultChecked={option.checked}
                                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                />
                                <label
                                  htmlFor={`filter-${section.id}-${optionIdx}`}
                                  className="ml-3 text-sm text-gray-600"
                                >
                                  {option.label}
                                </label>
                              </div>
                            ))}
                          </div>
                        </Disclosure.Panel>
                      </>
                    )}
                  </Disclosure>
                ))}
              </form>

              {/* Product grid */}

              <div className="lg:col-span-3">{
                // this is product list page
                <div>
                  <Link to={'/admin/ProductForm'}>
                    <button className="flex w-auto justify-center rounded-md bg-emerald-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-emerald-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                      Add New Product
                    </button>
                  </Link>
                  <div className="bg-white">
                    <div className="mx-auto max-w-7xl px-4 py-0 sm:px-6 sm:py-   lg:max-w-7xl lg:px-8">
                      {/* <h2 className="text-2xl font-bold tracking-tight text-gray-900">Customers also purchased</h2> */}

                      <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
                        {Array.isArray(products) && products.map((product) => (
                          <div>
                            <Link to={`/ProductDet/${product.id}`}>

                              <div key={product.id} className="group relative">
                                <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-60">
                                  <img
                                    src={product.thumbnail}
                                    alt={product.imageAlt}
                                    className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                                  />
                                </div>
                                <div className="mt-4 flex justify-between">
                                  <div>
                                    <h3 className="text-sm text-gray-700">
                                      <div href={product.href}>
                                        <span aria-hidden="true" className="absolute inset-0" />
                                        {product.title}
                                      </div>
                                    </h3>
                                    <p className="mt-1 text-sm text-gray-500">
                                      <StarIcon className='w-6 h-6 inline'>
                                      </StarIcon>
                                      {product.rating}
                                    </p>
                                  </div>
                                  <div>
                                    <p className="text-sm font-medium text-gray-900">₹ {product.price}</p>
                                    <p className="text-sm font-medium text-gray-900">₹  {Math.round(product.price * (1 - product.discountPercentage / 100))}</p>

                                  </div>

                                </div>
                                {product.delete && <div>
                                  <p className="text-sm font-medium text-red-600">Out of Stock</p>

                                </div>}
                              </div>

                            </Link>
                            <Link to={`/admin/ProductEdit/${product.id}`}>
                              <button className="flex w-12 justify-center my-2 rounded-md bg-emerald-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                                Edit
                              </button>
                            </Link>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

              }
              </div>
            </div>
          </section>

          {/* Pagination  */}
          <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
            <div className="flex flex-1 justify-between sm:hidden">
              <div

                className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
              >

                Previous
              </div>
              <div
                href="#"
                className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                Next
              </div>
            </div>
            <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
              <div>
                <p className="text-sm text-gray-700">
                  Showing <span className="font-medium">{(page - 1) * ITEMS_PER_PAGE + 1}</span> to <span className="font-medium">{page * ITEMS_PER_PAGE > totalItem ? totalItem : ''}</span> of{' '}
                  <span className="font-medium">{totalItem}</span> results
                </p>
              </div>
              <div>
                <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
                  <div
                    onClick={e => handlePage(e, page > 1 ? page - 1 : page + 0)}
                    className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                  >
                    <span className="sr-only">Previous</span>
                    <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
                  </div>
                  {Array.from({ length: Math.ceil(totalItem / ITEMS_PER_PAGE) }).map((el, index) => {
                    return <div
                      onClick={e => handlePage(e, index + 1)}
                      aria-current="page"
                      className={`relative z-10 inline-flex cursor-pointer items-center ${index + 1 === page ? ' bg-indigo-600  text-white' : ''} px-4 py-2 text-sm font-semibold focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-600"`}
                    >
                      {index + 1}
                    </div>
                  })}

                  <div
                    onClick={e => handlePage(e, Math.ceil(totalItem / ITEMS_PER_PAGE) > page ? page + 1 : page + 0)}
                    className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                  >
                    <span className="sr-only">Next</span>
                    <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
                  </div>
                </nav>
              </div>
            </div>
          </div>

          {/* Pagination-end  */}

        </main>
      </div>
    </div>

  );
}
