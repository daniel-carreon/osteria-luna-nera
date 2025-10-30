-- Seed Italian menu data for Osteria Luna Nera

-- Antipasti (Appetizers)
INSERT INTO dishes (name, name_italian, description, price, category, image_url, dietary_tags) VALUES
('Burrata & Truffle', 'Burrata e Tartufo', 'Creamy burrata cheese with truffle oil, grilled zucchini, crushed pistachios, and Saba reduction', 28.00, 'antipasti', 'https://images.unsplash.com/photo-1587314168485-3236d6710814?w=800', ARRAY['vegetarian']),
('Beef Carpaccio', 'Carpaccio di Manzo', 'Paper-thin beef carpaccio, arugula, shaved Parmigiano-Reggiano, capers, lemon-EVOO', 32.00, 'antipasti', 'https://images.unsplash.com/photo-1625944230945-1b7dd3b949ab?w=800', ARRAY['gluten-free']),
('Fried Calamari with Lemon', 'Calamari Fritti al Limone', 'Crispy fried calamari, lemon aioli, spicy marinara', 26.00, 'antipasti', 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=800', ARRAY[]::text[]),
('Prosciutto & Melon', 'Prosciutto e Melone', '24-month aged Prosciutto di Parma, cantaloupe, balsamic glaze', 24.00, 'antipasti', 'https://images.unsplash.com/photo-1600891965599-f61ba0e24092?w=800', ARRAY['gluten-free']);

-- Primi Piatti (First Course)
INSERT INTO dishes (name, name_italian, description, price, category, image_url, dietary_tags) VALUES
('Spaghetti Carbonara', 'Spaghetti alla Carbonara', 'Classic Roman carbonara with guanciale, pecorino Romano, farm eggs', 38.00, 'primi', 'https://images.unsplash.com/photo-1612874742237-6526221588e3?w=800', ARRAY[]::text[]),
('Wild Boar Pappardelle', 'Pappardelle al Ragù di Cinghiale', 'Wide ribbon pasta, wild boar ragù, rosemary, Parmigiano', 42.00, 'primi', 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=800', ARRAY[]::text[]),
('Porcini Risotto', 'Risotto ai Funghi Porcini', 'Carnaroli risotto, porcini mushrooms, truffle butter, aged Parmesan', 40.00, 'primi', 'https://images.unsplash.com/photo-1476124369491-42e45aa0c4cb?w=800', ARRAY['vegetarian', 'gluten-free']),
('Gnocchi Sorrentina', 'Gnocchi alla Sorrentina', 'Homemade potato gnocchi, San Marzano tomato, buffalo mozzarella, basil', 36.00, 'primi', 'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=800', ARRAY['vegetarian']);

-- Secondi Piatti (Main Course)
INSERT INTO dishes (name, name_italian, description, price, category, image_url, dietary_tags) VALUES
('Ossobuco Milanese', 'Ossobuco alla Milanese', 'Slow-braised veal shank, saffron risotto, gremolata', 68.00, 'secondi', 'https://images.unsplash.com/photo-1632778149955-e80f8ceca2e7?w=800', ARRAY['gluten-free']),
('Roasted Branzino', 'Branzino al Forno', 'Whole roasted Mediterranean sea bass, lemon, herbs, roasted vegetables', 58.00, 'secondi', 'https://images.unsplash.com/photo-1580959375944-1363cb7c4d72?w=800', ARRAY['gluten-free']),
('Florentine Steak', 'Bistecca alla Fiorentina', '40oz dry-aged Porterhouse, rosemary, garlic, EVOO (serves 2)', 95.00, 'secondi', 'https://images.unsplash.com/photo-1544025162-d76694265947?w=800', ARRAY['gluten-free']),
('Grilled Lamb Rack', 'Agnello Scottadito', 'Grilled rack of lamb, herb crust, mint-pea purée', 62.00, 'secondi', 'https://images.unsplash.com/photo-1529694484892-09c46afd7df2?w=800', ARRAY['gluten-free']);

-- Dolci (Desserts)
INSERT INTO dishes (name, name_italian, description, price, category, image_url, dietary_tags) VALUES
('Classic Tiramisu', 'Tiramisù Classico', 'Ladyfingers, espresso, mascarpone, cocoa', 16.00, 'dolci', 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=800', ARRAY['vegetarian']),
('Panna Cotta with Berries', 'Panna Cotta ai Frutti di Bosco', 'Vanilla panna cotta, berry compote', 14.00, 'dolci', 'https://images.unsplash.com/photo-1488477304112-4944851de03d?w=800', ARRAY['vegetarian', 'gluten-free']),
('Sicilian Cannoli', 'Cannoli Siciliani', 'Crispy shells, sweet ricotta, pistachios, candied orange', 15.00, 'dolci', 'https://images.unsplash.com/photo-1606312619070-d48b4ccc2b99?w=800', ARRAY['vegetarian']);

-- Bevande (Beverages)
INSERT INTO dishes (name, name_italian, description, price, category, image_url, dietary_tags) VALUES
('House Wine', 'Vino della Casa', 'Italian wine selection (red/white/rosé) - bottle', 65.00, 'bevande', NULL, ARRAY[]::text[]),
('Signature Cocktails', 'Cocktail Italiani', 'Classic Italian aperitifs: Negroni, Aperol Spritz, Americano', 18.00, 'bevande', NULL, ARRAY[]::text[]),
('Espresso', 'Espresso', 'Traditional Italian espresso', 6.00, 'bevande', NULL, ARRAY['vegan']),
('Cappuccino', 'Cappuccino', 'Classic cappuccino with steamed milk', 8.00, 'bevande', NULL, ARRAY['vegetarian']),
('Sparkling Water', 'Acqua Frizzante', 'San Pellegrino or Acqua Panna (750ml)', 8.00, 'bevande', NULL, ARRAY['vegan']);
