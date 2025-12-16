import Navbar from './components/Navbar';
import { sql } from '@vercel/postgres';

// ডাটাবেস থেকে পণ্য আনার ফাংশন (No Cache - যাতে সাথে সাথে আপডেট হয়)
async function getProducts() {
  const { rows } = await sql`SELECT * FROM products ORDER BY id DESC`;
  return rows;
}

export default async function Home() {
  // ডাটাবেস থেকে পণ্যগুলো আনা হচ্ছে
  const products = await getProducts();

  return (
    <div className="bg-gray-50 min-h-screen font-sans">
      <Navbar cartCount={0} />

      {/* হিরো সেকশন */}
      <div className="bg-orange-500 text-white text-center py-12">
        <h1 className="text-4xl font-bold mb-2">আমাদের সুপার শপে স্বাগতম! 🛍️</h1>
        <p className="text-lg">সবচেয়ে কম দামে সেরা পণ্য কিনুন</p>
      </div>

      {/* পণ্যের তালিকা (যা ডাটাবেস থেকে এসেছে) */}
      <div className="max-w-6xl mx-auto p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b-2 border-orange-500 inline-block">
          🔥 নতুন কালেকশন ({products.length})
        </h2>

        {products.length === 0 ? (
          <p className="text-center text-gray-500 mt-10">এখনো কোনো পণ্য আপলোড করা হয়নি। এডমিন প্যানেল থেকে পণ্য যোগ করুন।</p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {products.map((product) => (
              <div key={product.id} className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow border border-gray-100">
                <div className="h-48 bg-gray-100 rounded mb-4 overflow-hidden">
                  <img 
                    src={product.image_url || "https://via.placeholder.com/300"} 
                    alt={product.name} 
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <h3 className="font-bold text-lg text-gray-800 mb-1">{product.name}</h3>
                <p className="text-orange-600 font-bold text-xl mb-2">{product.price}</p>
                
                <button className="w-full bg-gray-900 text-white py-2 rounded hover:bg-orange-600 transition-colors">
                  Add to Cart 🛒
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
        }
