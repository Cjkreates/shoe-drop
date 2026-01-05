import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PRODUCTS } from "@/lib/products";
import ProductClient from "./ProductClient";

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const product = PRODUCTS.find((p) => p.id === params.id);

  if (!product) {
    return { title: "Product Not Found" };
  }

  const description = `Buy ${product.name} for KES ${product.price}. Limited stock available.`;

  return {
    title: product.name,
    description,
    openGraph: {
      images: product.image,
      title: product.name,
      description,
    },
  };
}

export default function ProductPage({ params }: { params: { id: string } }) {
  const product = PRODUCTS.find((p) => p.id === params.id);

  if (!product) notFound();

  return <ProductClient product={product} />;
}
"use client";

import { useState } from "react";
import { useParams, notFound } from "next/navigation";

import { motion } from "framer-motion";
