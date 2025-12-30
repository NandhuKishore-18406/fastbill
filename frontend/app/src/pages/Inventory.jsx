import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Plus, Pencil, Trash2, Search, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface Product {
  id: string;
  name: string;
  category: string;
  stock: number;
  price: number;
  lowStockThreshold: number;
}

// Mock data
const initialProducts: Product[] = [
  { id: "PRD-001", name: "Wireless Mouse", category: "Accessories", stock: 45, price: 29.99, lowStockThreshold: 10 },
  { id: "PRD-002", name: "USB Cable Type-C", category: "Cables", stock: 8, price: 12.99, lowStockThreshold: 15 },
  { id: "PRD-003", name: "Mechanical Keyboard", category: "Accessories", stock: 23, price: 89.99, lowStockThreshold: 5 },
  { id: "PRD-004", name: "Monitor Stand", category: "Furniture", stock: 3, price: 49.99, lowStockThreshold: 5 },
  { id: "PRD-005", name: "HDMI Cable 2m", category: "Cables", stock: 67, price: 14.99, lowStockThreshold: 20 },
  { id: "PRD-006", name: "Webcam HD", category: "Electronics", stock: 12, price: 79.99, lowStockThreshold: 8 },
  { id: "PRD-007", name: "USB Hub 4-Port", category: "Accessories", stock: 5, price: 24.99, lowStockThreshold: 10 },
  { id: "PRD-008", name: "Laptop Stand", category: "Furniture", stock: 18, price: 39.99, lowStockThreshold: 5 },
];

export default function Inventory() {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [searchQuery, setSearchQuery] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    stock: "",
    price: "",
    lowStockThreshold: "",
  });

  const filteredProducts = products.filter(
    (p) =>
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const isLowStock = (product: Product) => product.stock <= product.lowStockThreshold;

  const handleOpenDialog = (product?: Product) => {
    if (product) {
      setEditingProduct(product);
      setFormData({
        name: product.name,
        category: product.category,
        stock: product.stock.toString(),
        price: product.price.toString(),
        lowStockThreshold: product.lowStockThreshold.toString(),
      });
    } else {
      setEditingProduct(null);
      setFormData({ name: "", category: "", stock: "", price: "", lowStockThreshold: "10" });
    }
    setIsDialogOpen(true);
  };

  const handleSave = () => {
    const productCount = products.length + 1;
    const newProduct: Product = {
      id: editingProduct?.id || `PRD-${String(productCount).padStart(3, '0')}`,
      name: formData.name,
      category: formData.category,
      stock: parseInt(formData.stock) || 0,
      price: parseFloat(formData.price) || 0,
      lowStockThreshold: parseInt(formData.lowStockThreshold) || 10,
    };

    if (editingProduct) {
      setProducts(products.map((p) => (p.id === editingProduct.id ? newProduct : p)));
    } else {
      setProducts([...products, newProduct]);
    }
    setIsDialogOpen(false);
  };

  const handleDelete = (id: string) => {
    setProducts(products.filter((p) => p.id !== id));
  };

  return (
    <AppLayout
      title="Inventory"
      action={
        <Button onClick={() => handleOpenDialog()}>
          <Plus className="w-4 h-4 mr-2" />
          Add Product
        </Button>
      }
    >
      {/* Search */}
      <div className="relative mb-6 max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          placeholder="Search products..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Table */}
      <div className="bg-card rounded-md border border-border overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead className="w-[100px]">Product ID</TableHead>
              <TableHead className="w-[250px]">Product Name</TableHead>
              <TableHead>Category</TableHead>
              <TableHead className="text-right">Stock</TableHead>
              <TableHead className="text-right">Price</TableHead>
              <TableHead className="text-right w-[100px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredProducts.map((product) => (
              <TableRow
                key={product.id}
                className={cn(isLowStock(product) && "bg-warning-muted hover:bg-warning-muted/80")}
              >
                <TableCell className="font-mono text-xs text-muted-foreground">
                  {product.id}
                </TableCell>
                <TableCell className="font-medium">
                  <div className="flex items-center gap-2">
                    {isLowStock(product) && (
                      <AlertCircle className="w-4 h-4 text-warning" />
                    )}
                    {product.name}
                  </div>
                </TableCell>
                <TableCell className="text-muted-foreground">{product.category}</TableCell>
                <TableCell className={cn("text-right", isLowStock(product) && "text-warning font-medium")}>
                  {product.stock}
                </TableCell>
                <TableCell className="text-right">${product.price.toFixed(2)}</TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-1">
                    <button
                      onClick={() => handleOpenDialog(product)}
                      className="icon-button"
                    >
                      <Pencil className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(product.id)}
                      className="icon-button-danger"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Add/Edit Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{editingProduct ? "Edit Product" : "Add Product"}</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Product Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Enter product name"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="category">Category</Label>
              <Input
                id="category"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                placeholder="Enter category"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="stock">Stock</Label>
                <Input
                  id="stock"
                  type="number"
                  value={formData.stock}
                  onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                  placeholder="0"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="price">Price ($)</Label>
                <Input
                  id="price"
                  type="number"
                  step="0.01"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  placeholder="0.00"
                />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="threshold">Low Stock Threshold</Label>
              <Input
                id="threshold"
                type="number"
                value={formData.lowStockThreshold}
                onChange={(e) => setFormData({ ...formData, lowStockThreshold: e.target.value })}
                placeholder="10"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSave}>
              {editingProduct ? "Save Changes" : "Add Product"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AppLayout>
  );
}
