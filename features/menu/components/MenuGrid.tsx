'use client'

import { useState } from 'react'
import Image from 'next/image'
import type { Dish, DishCategory } from '@/shared/types/database.types'
import { Wine, Leaf } from 'lucide-react'

const CATEGORIES = [
  { value: 'all', label: 'All Courses', labelIt: 'Tutti i Piatti' },
  { value: 'antipasti', label: 'Antipasti', labelIt: 'Antipasti' },
  { value: 'primi', label: 'First Course', labelIt: 'Primi Piatti' },
  { value: 'secondi', label: 'Main Course', labelIt: 'Secondi Piatti' },
  { value: 'dolci', label: 'Desserts', labelIt: 'Dolci' },
  { value: 'bevande', label: 'Beverages', labelIt: 'Bevande' },
]

interface MenuGridProps {
  dishes: Dish[]
}

export function MenuGrid({ dishes }: MenuGridProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all')

  const filteredDishes = selectedCategory === 'all'
    ? dishes
    : dishes.filter(dish => dish.category === selectedCategory)

  return (
    <section id="menu" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-5xl md:text-6xl font-serif font-bold text-primary mb-4">
            Il Nostro Menù
          </h2>
          <p className="text-xl text-primary-light max-w-2xl mx-auto">
            Discover our carefully curated selection of authentic Italian dishes,
            crafted with the finest ingredients and traditional techniques.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {CATEGORIES.map(cat => (
            <button
              key={cat.value}
              onClick={() => setSelectedCategory(cat.value)}
              className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                selectedCategory === cat.value
                  ? 'gold-gradient text-primary shadow-lg scale-105'
                  : 'bg-white text-primary-light hover:bg-secondary/10 border border-secondary/30'
              }`}
            >
              <span className="hidden sm:inline">{cat.labelIt}</span>
              <span className="sm:hidden">{cat.label}</span>
            </button>
          ))}
        </div>

        {/* Dishes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredDishes.map(dish => (
            <DishCard key={dish.id} dish={dish} />
          ))}
        </div>

        {filteredDishes.length === 0 && (
          <div className="text-center py-12">
            <p className="text-xl text-primary-light">
              No dishes found in this category.
            </p>
          </div>
        )}
      </div>
    </section>
  )
}

function DishCard({ dish }: { dish: Dish }) {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 group">
      {/* Image */}
      {dish.image_url && (
        <div className="relative h-64 overflow-hidden">
          <Image
            src={dish.image_url}
            alt={dish.name}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
      )}

      {/* Content */}
      <div className="p-6 space-y-3">
        {/* Name */}
        <div>
          <h3 className="text-xl font-serif font-bold text-primary mb-1">
            {dish.name}
          </h3>
          {dish.name_italian && (
            <p className="text-sm font-italiana text-secondary italic">
              {dish.name_italian}
            </p>
          )}
        </div>

        {/* Description */}
        <p className="text-sm text-primary-light leading-relaxed">
          {dish.description}
        </p>

        {/* Tags */}
        {dish.dietary_tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {dish.dietary_tags.map(tag => (
              <span
                key={tag}
                className="px-2 py-1 bg-secondary/10 text-secondary text-xs rounded-full flex items-center space-x-1"
              >
                <Leaf className="w-3 h-3" />
                <span className="capitalize">{tag}</span>
              </span>
            ))}
          </div>
        )}

        {/* Price */}
        <div className="flex items-center justify-between pt-3 border-t border-secondary/20">
          <span className="text-2xl font-mono font-bold text-secondary">
            ${dish.price.toFixed(2)}
          </span>
          <Wine className="w-5 h-5 text-secondary/50" />
        </div>
      </div>
    </div>
  )
}
