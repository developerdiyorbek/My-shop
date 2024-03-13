import NotFound from "../not-found";
import CustomImage from "@/components/Images";

const ProductDetailPage = async ({ params: { id } }) => {
  try {
    if (Number(id) > 20 || Number(id) < 0) return NotFound();

    const res = await fetch(`https://fakestoreapi.com/products/${id}`);

    const product = await res.json();

    return (
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-8 px-4 mt-24 pb-10">
        <CustomImage product={product} />

        <div className="space-y-2 pb-8">
          <h1 className="text-2xl md:text-4xl font-bold">{product?.title}</h1>
          <h2 className="text-gray-500 font-bold text-xl md:text-3xl">
            ${product?.price}
          </h2>
          <div className="pt-4">
            <p className="text-xs md:text-sm">{product?.description}</p>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    NotFound();
  }
};

export default ProductDetailPage;
