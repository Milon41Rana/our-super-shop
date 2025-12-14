export default function Home() {
  // আমাদের কাল্পনিক পণ্যের তালিকা
  const products = [
    { id: 1, name: 'Smart Watch', price: '৳ 1,500', img: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=200&h=200&fit=crop' },
    { id: 2, name: 'Running Shoes', price: '৳ 2,200', img: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=200&h=200&fit=crop' },
    { id: 3, name: 'Leather Bag', price: '৳ 3,500', img: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=200&h=200&fit=crop' },
  ];

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      {/* দোকানের হেডার বা নাম */}
      <header style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h1 style={{ color: '#f85606' }}>My Super Shop 🛒</h1>
        <p>সেরা দামে সেরা পণ্য কিনুন</p>
      </header>

      {/* পণ্যের গ্যালারি (Product Grid) */}
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '20px' }}>
        {products.map((product) => (
          <div key={product.id} style={{ border: '1px solid #ddd', borderRadius: '8px', padding: '15px', width: '200px', textAlign: 'center', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
            <img src={product.img} alt={product.name} style={{ width: '100%', borderRadius: '5px' }} />
            <h3>{product.name}</h3>
            <p style={{ color: '#f85606', fontWeight: 'bold' }}>{product.price}</p>
            <button style={{ background: '#f85606', color: 'white', border: 'none', padding: '8px 15px', borderRadius: '4px', cursor: 'pointer' }}>
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
