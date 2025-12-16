import Navbar from './components/Navbar';
import { sql } from '@vercel/postgres';

// এই লাইনটি পেজকে ডাইনামিক করবে (পুরানো ক্যাশ ধরে রাখবে না)
export const dynamic = 'force-dynamic';

export default async function Home() {
  let products: any[] = [];

  try {
    // ডাটাবেস থেকে পণ্য আনার চেষ্টা
    const result = await sql`SELECT * FROM products ORDER BY id DESC`;
    products = result.rows;
  } catch (error) {
    console.error('Database Error:', error);
  }

  return (
    <div className="bg-gray-50 min-h-screen font-sans">
      <Navbar cartCount={0} />

      {/* হিরো সেকশন - টাইটেল পরিবর্তন করা হয়েছে আপডেট বোঝার জন্য */}
      <div className="bg-orange-500 text-white text-center py-12">
        <h1 className="text-4xl font-bold mb-2">আমাদের সুপার শপ (Live) 🛍️</h1>
        <p className="text-lg">সবচেয়ে কম দামে সেরা পণ্য কিনুন</p>
      </div>

      {/* পণ্যের তালিকা */}
      <div className="max-w-6xl mx-auto p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b-2 border-orange-500 inline-block">
          🔥 নতুন কালেকশন ({products.length})
        </h2>

        {products.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-lg shadow">
            <h3 className="text-xl text-gray-600 font-bold">এখনো কোনো পণ্য নেই!</h3>
            <p className="text-gray-400 mt-2">এডমিন প্যানেল থেকে পণ্য আপলোড করুন।</p>
            <a href="/admin" className="inline-block mt-4 text-orange-500 underline">
              এডমিন প্যানেলে যান &rarr;
            </a>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {products.map((product: any) => (
              <div key={product.id} className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow border border-gray-100">
                <div className="h-48 bg-gray-100 rounded mb-4 overflow-hidden relative">
                  <img 
                    src={product.image_url || "https://via.placeholder.com/300"} 
                    alt={product.name} 
                    className="w-full h-full object-cover"
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
