/**
 * Phase 2: Search Indexes Setup
 * Creates MongoDB indexes for advanced search and filtering
 *
 * Note: This script outputs MongoDB commands to run manually
 * since direct MongoDB connections may not be available in all environments.
 */

async function setupPhase2SearchIndexes() {
  console.log('🔍 Phase 2 Search Indexes Setup');
  console.log('================================');
  console.log('');
  console.log('⚠️  IMPORTANT: These MongoDB commands must be run manually in your MongoDB shell or MongoDB Compass');
  console.log('   Connect to your MongoDB database and run the following commands:');
  console.log('');

  const mongoCommands = `
use x402-payments;  // or your database name

// =====================================================
// 1. FULL-TEXT SEARCH INDEX
// Enables text search across title, description, tags, and category
// =====================================================

db.prompts.createIndex({
  title: "text",
  description: "text",
  tags: "text",
  category: "text"
}, {
  name: "prompts_search_index",
  weights: {
    title: 10,        // Title matches are most important
    tags: 5,          // Tag matches are very relevant
    description: 3,   // Description matches are relevant
    category: 2       // Category matches are somewhat relevant
  },
  default_language: "english"
});

// =====================================================
// 2. MARKETPLACE FILTERING INDEX
// Compound index for complex marketplace queries
// =====================================================

db.prompts.createIndex({
  isListed: 1,
  listingStatus: 1,
  category: 1,
  priceUsdCents: 1,
  totalSales: -1,     // Descending for popularity sorting
  listedAt: -1,       // Descending for newest sorting
  createdAt: -1       // Descending for fallback sorting
}, {
  name: "marketplace_filter_index"
});

// =====================================================
// 3. CATEGORY INDEX
// Fast category-based queries
// =====================================================

db.prompts.createIndex({
  category: 1,
  isListed: 1,
  listingStatus: 1
}, {
  name: "category_index"
});

// =====================================================
// 4. PRICE RANGE INDEX
// Efficient price filtering
// =====================================================

db.prompts.createIndex({
  priceUsdCents: 1,
  isListed: 1,
  listingStatus: 1
}, {
  name: "price_index"
});

// =====================================================
// 5. POPULARITY INDEX
// Sales and trending-based sorting
// =====================================================

db.prompts.createIndex({
  totalSales: -1,
  totalRevenue: -1,
  listedAt: -1,
  isListed: 1,
  listingStatus: 1
}, {
  name: "popularity_index"
});

// =====================================================
// 6. TAGS INDEX
// Tag-based filtering
// =====================================================

db.prompts.createIndex({
  tags: 1,
  isListed: 1,
  listingStatus: 1
}, {
  name: "tags_index"
});

// =====================================================
// 7. LICENSE INDEX
// License type filtering
// =====================================================

db.prompts.createIndex({
  licenseType: 1,
  isListed: 1,
  listingStatus: 1
}, {
  name: "license_index"
});

// =====================================================
// 8. RATING INDEX
// Quality-based filtering
// =====================================================

db.prompts.createIndex({
  avgRating: -1,
  ratingCount: -1,
  isListed: 1,
  listingStatus: 1
}, {
  name: "rating_index"
});

// =====================================================
// VERIFICATION
// Check that indexes were created
// =====================================================

// List all indexes on prompts collection
db.prompts.getIndexes();

// Expected indexes should include:
// - prompts_search_index
// - marketplace_filter_index
// - category_index
// - price_index
// - popularity_index
// - tags_index
// - license_index
// - rating_index

// =====================================================
// TEST SEARCH FUNCTIONALITY
// =====================================================

// Test full-text search
db.prompts.find({
  isListed: true,
  listingStatus: 'active',
  $text: { $search: 'cyberpunk' }
}).limit(5);

// Test filtered search
db.prompts.find({
  isListed: true,
  listingStatus: 'active',
  category: 'portraits',
  priceUsdCents: { $gte: 100, $lte: 1000 }
}).sort({ totalSales: -1 }).limit(10);
`;

  console.log(mongoCommands);
  console.log('');
  console.log('🎯 After running the MongoDB commands:');
  console.log('');
  console.log('1. ✅ Verify indexes were created: db.prompts.getIndexes()');
  console.log('2. ✅ Test search works: db.prompts.find({$text: {$search: "cyberpunk"}}).limit(1)');
  console.log('3. ⏳ Run: npm run phase2:validate (to test the API endpoints)');
  console.log('4. ⏳ If validation passes, Phase 2 is ready!');
  console.log('');
  console.log('💡 Alternative: Use MongoDB Compass GUI to create these indexes');
  console.log('   - Connect to your database');
  console.log('   - Navigate to prompts collection');
  console.log('   - Go to Indexes tab');
  console.log('   - Create each index with the specifications above');

  return true;
}

// Setup category data
async function setupCategories() {
  console.log('📂 Setting up category system...');
  console.log('');

  const categoryInsertCommands = `
// =====================================================
// CATEGORY DATA SETUP
// Insert predefined categories into MongoDB
// =====================================================

use x402-payments;  // or your database name

// Insert categories (this will upsert - insert if not exists)
db.categories.insertMany([
  {
    id: "portraits",
    name: "Portraits",
    description: "Human portraits and character designs",
    icon: "user",
    promptCount: 0,
    featured: true,
    order: 1
  },
  {
    id: "landscapes",
    name: "Landscapes",
    description: "Natural scenery and environments",
    icon: "mountain",
    promptCount: 0,
    featured: true,
    order: 2
  },
  {
    id: "abstract",
    name: "Abstract Art",
    description: "Abstract and contemporary art styles",
    icon: "palette",
    promptCount: 0,
    featured: true,
    order: 3
  },
  {
    id: "fantasy",
    name: "Fantasy",
    description: "Magical and fantastical scenes",
    icon: "sparkles",
    promptCount: 0,
    featured: true,
    order: 4
  },
  {
    id: "cyberpunk",
    name: "Cyberpunk",
    description: "Futuristic and high-tech aesthetics",
    icon: "cpu",
    promptCount: 0,
    featured: true,
    order: 5
  },
  {
    id: "architecture",
    name: "Architecture",
    description: "Buildings, structures, and urban scenes",
    icon: "building",
    promptCount: 0,
    featured: false,
    order: 6
  },
  {
    id: "nature",
    name: "Nature",
    description: "Plants, animals, and natural elements",
    icon: "leaf",
    promptCount: 0,
    featured: false,
    order: 7
  },
  {
    id: "vehicles",
    name: "Vehicles",
    description: "Cars, motorcycles, and transportation",
    icon: "car",
    promptCount: 0,
    featured: false,
    order: 8
  },
  {
    id: "food",
    name: "Food & Drink",
    description: "Culinary and beverage photography",
    icon: "utensils",
    promptCount: 0,
    featured: false,
    order: 9
  },
  {
    id: "product",
    name: "Product Photography",
    description: "Commercial product and still life",
    icon: "package",
    promptCount: 0,
    featured: false,
    order: 10
  }
], { ordered: false });

// Create indexes for categories
db.categories.createIndex({ featured: 1, order: 1 }, { name: "featured_order_index" });
db.categories.createIndex({ id: 1 }, { name: "id_index", unique: true });

// Verify categories were inserted
db.categories.find().sort({ order: 1 });
`;

  console.log('📋 Run these MongoDB commands to set up categories:');
  console.log('');
  console.log(categoryInsertCommands);

  return true;
}

// Update category counts based on existing prompts
async function updateCategoryCounts() {
  console.log('🔄 Updating category prompt counts...');

  const db = getDb();
  if (!db) {
    console.error('❌ MongoDB connection not available');
    return false;
  }

  try {
    const promptsCollection = db.collection('prompts');
    const categoriesCollection = db.collection('categories');

    // Get category counts from prompts
    const categoryCounts = await promptsCollection.aggregate([
      {
        $match: {
          isListed: true,
          listingStatus: 'active'
        }
      },
      {
        $group: {
          _id: '$category',
          count: { $sum: 1 }
        }
      }
    ]).toArray();

    // Update category counts
    for (const categoryCount of categoryCounts) {
      if (categoryCount._id) {
        await categoriesCollection.updateOne(
          { id: categoryCount._id },
          { $set: { promptCount: categoryCount.count } }
        );
      }
    }

    console.log(`✅ Updated prompt counts for ${categoryCounts.length} categories`);
    return true;

  } catch (error) {
    console.error('❌ Error updating category counts:', error);
    return false;
  }
}

// Main setup function
async function setupPhase2Indexes() {
  console.log('🚀 Phase 2 Search Infrastructure Setup');
  console.log('=====================================');

  const results = await Promise.all([
    setupPhase2SearchIndexes(),
    setupCategories(),
    updateCategoryCounts()
  ]);

  const success = results.every(result => result === true);

  if (success) {
    console.log('');
    console.log('🎉 Phase 2 search infrastructure setup complete!');
    console.log('');
    console.log('📊 What was created:');
    console.log('  ✅ 8 MongoDB indexes for fast search and filtering');
    console.log('  ✅ 10 predefined categories with metadata');
    console.log('  ✅ Category prompt counts updated');
    console.log('');
    console.log('🚀 Ready for advanced search implementation!');
  } else {
    console.log('');
    console.log('❌ Phase 2 setup failed. Check errors above.');
  }

  return success;
}

// Run setup if this script is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  setupPhase2Indexes()
    .then((success) => {
      process.exit(success ? 0 : 1);
    })
    .catch((error) => {
      console.error('💥 Setup error:', error);
      process.exit(1);
    });
}

export { setupPhase2Indexes, setupPhase2SearchIndexes, setupCategories, updateCategoryCounts };