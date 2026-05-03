import { useState } from "react";
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  Plus,
  Edit,
  Trash2,
} from "lucide-react";
import {
  useGetProductsQuery,
  useCreateProductMutation,
  useDeleteProductMutation,
} from "../../store/slices/productsApiSlice";
import { Link } from "react-router-dom";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("products");

  // 1. Fetch live inventory
  const { data: products, isLoading, error } = useGetProductsQuery();

  // 2. Bring in our new Admin actions
  const [createProduct, { isLoading: loadingCreate }] =
    useCreateProductMutation();
  const [deleteProduct, { isLoading: loadingDelete }] =
    useDeleteProductMutation();

  // --- HANDLERS ---
  const createProductHandler = async () => {
    if (window.confirm("Voulez-vous créer un nouveau produit (brouillon) ?")) {
      try {
        await createProduct();
        // The table will auto-refresh thanks to invalidatesTags!
      } catch (err) {
        console.error(err);
        alert("Erreur lors de la création du produit.");
      }
    }
  };

  const deleteHandler = async (id) => {
    if (
      window.confirm(
        "Êtes-vous sûr de vouloir supprimer définitivement ce produit ?",
      )
    ) {
      try {
        await deleteProduct(id);
        // The table will auto-refresh!
      } catch (err) {
        console.error(err);
        alert("Erreur lors de la suppression.");
      }
    }
  };

  const NAV_ITEMS = [
    {
      id: "overview",
      label: "Vue d'ensemble",
      icon: <LayoutDashboard size={20} />,
    },
    { id: "products", label: "Produits", icon: <Package size={20} /> },
    { id: "orders", label: "Commandes", icon: <ShoppingCart size={20} /> },
    { id: "users", label: "Clients", icon: <Users size={20} /> },
  ];

  return (
    <div className="min-h-screen bg-[#FAFAFA] flex flex-col md:flex-row border-t border-gray-200">
      {/* --- ADMIN SIDEBAR --- */}
      <aside className="w-full md:w-64 bg-white border-r border-gray-100 shrink-0 flex flex-col">
        <div className="p-6 border-b border-gray-50">
          <h2 className="font-serif text-xl text-[#333333]">Dashboard</h2>
          <p className="text-xs text-gray-500 uppercase tracking-widest mt-1">
            Espace Administrateur
          </p>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-sm transition-colors text-sm font-medium ${
                activeTab === item.id
                  ? "bg-[#333333] text-white"
                  : "text-gray-600 hover:bg-[#F8C8DC]/20 hover:text-[#333333]"
              }`}
            >
              {item.icon}
              {item.label}
            </button>
          ))}
        </nav>
      </aside>

      {/* --- MAIN CONTENT AREA --- */}
      <main className="flex-1 p-6 md:p-10 overflow-y-auto relative">
        {/* Loading overlays for mutations */}
        {(loadingCreate || loadingDelete) && (
          <div className="absolute inset-0 bg-white/50 backdrop-blur-sm z-10 flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#E5A3B8]"></div>
          </div>
        )}

        {/* PRODUCTS TAB */}
        {activeTab === "products" && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h1 className="text-2xl font-serif text-[#333333]">
                  Gestion des Produits
                </h1>
                <p className="text-sm text-gray-500 mt-1">
                  Gérez votre inventaire, ajoutez ou modifiez des pièces.
                </p>
              </div>
              <button
                onClick={createProductHandler}
                className="flex items-center gap-2 bg-[#E5A3B8] text-[#333333] px-6 py-3 rounded-sm text-sm font-medium hover:bg-[#333333] hover:text-white transition-colors shadow-sm"
              >
                <Plus size={18} /> Ajouter un produit
              </button>
            </div>

            {/* Data Table */}
            <div className="bg-white border border-gray-200 rounded-sm overflow-hidden shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm text-gray-600">
                  <thead className="bg-[#FAFAFA] border-b border-gray-200 text-xs uppercase tracking-widest text-gray-500">
                    <tr>
                      <th className="px-6 py-4 font-medium">Produit</th>
                      <th className="px-6 py-4 font-medium">Prix</th>
                      <th className="px-6 py-4 font-medium">Catégorie</th>
                      <th className="px-6 py-4 font-medium">Stock</th>
                      <th className="px-6 py-4 font-medium text-right">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {isLoading ? (
                      <tr>
                        <td colSpan="5" className="px-6 py-10 text-center">
                          <div className="animate-pulse flex flex-col items-center gap-2 text-gray-400">
                            <Package size={24} /> Chargement de l'inventaire...
                          </div>
                        </td>
                      </tr>
                    ) : error ? (
                      <tr>
                        <td
                          colSpan="5"
                          className="px-6 py-10 text-center text-red-500"
                        >
                          Erreur de chargement.
                        </td>
                      </tr>
                    ) : (
                      products?.map((product) => (
                        <tr
                          key={product._id}
                          className="hover:bg-gray-50 transition-colors"
                        >
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-4">
                              <img
                                src={product.image}
                                alt={product.name}
                                className="w-10 h-10 object-cover rounded-sm bg-gray-100"
                              />
                              <span className="font-medium text-[#333333]">
                                {product.name}
                              </span>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            {product.price.toFixed(2)} €
                          </td>
                          <td className="px-6 py-4 capitalize">
                            {product.category}
                          </td>
                          <td className="px-6 py-4">
                            <span
                              className={`px-2 py-1 text-xs rounded-sm ${product.inStock ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}
                            >
                              {product.inStock ? "En stock" : "Épuisé"}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-right">
                            <div className="flex justify-end gap-3">
                              {/* We will wire this Edit button up next! */}
                              <Link
                                to={`/admin/product/${product._id}/edit`}
                                className="text-gray-400 hover:text-[#333333] transition-colors inline-block"
                                title="Modifier"
                              >
                                <Edit size={18} />
                              </Link>

                              <button
                                onClick={() => deleteHandler(product._id)}
                                className="text-gray-400 hover:text-red-500 transition-colors"
                                title="Supprimer"
                              >
                                <Trash2 size={18} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* PLACEHOLDERS */}
        {activeTab === "overview" && (
          <div className="flex items-center justify-center h-64 border-2 border-dashed border-gray-200 rounded-sm text-gray-400">
            Vue d'ensemble en cours de construction
          </div>
        )}
        {activeTab === "orders" && (
          <div className="flex items-center justify-center h-64 border-2 border-dashed border-gray-200 rounded-sm text-gray-400">
            Gestion des commandes en cours de construction
          </div>
        )}
        {activeTab === "users" && (
          <div className="flex items-center justify-center h-64 border-2 border-dashed border-gray-200 rounded-sm text-gray-400">
            Gestion des clients en cours de construction
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;
